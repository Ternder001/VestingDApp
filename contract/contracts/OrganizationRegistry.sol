// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token.sol";
import "./Timelock.sol";

contract OrganizationRegistry {
    mapping(address => Organization) public organizations;

    struct Organization {
        address owner;
        string name;
        ERC20Token token;
        mapping(address => Stakeholder) stakeholders;
    }

    struct Stakeholder {
        string stakeType;
        Timelock timelock;
        bool whitelisted;
    }

    modifier onlyOwner() {
        require(
            msg.sender == organizations[msg.sender].owner,
            "Only the organization owner can perform this action"
        );
        _;
    }

    event OrganizationRegistered(
        address indexed owner,
        string name,
        address token
    );
    event StakeholderAdded(
        address indexed organization,
        address indexed stakeholder,
        string stakeType,
        address timelock
    );
    event StakeholderWhitelisted(
        address indexed organization,
        address indexed stakeholder
    );
    event Withdrawal(address indexed organization, uint256 amount);

    function registerOrganization(string memory _name) public {
        require(bytes(_name).length > 0, "Organization name cannot be empty");
        require(
            organizations[msg.sender].owner == address(0),
            "Organization already exists for this owner"
        );

        ERC20Token token = new ERC20Token(_name, 18);

        Organization storage org = organizations[msg.sender];
        org.owner = msg.sender;
        org.name = _name;
        org.token = token;

        emit OrganizationRegistered(msg.sender, _name, address(token));
    }

    function addStakeholder(
        address _stakeholder,
        string memory _type,
        uint256 _vestingPeriod
    ) public onlyOwner {
        require(
            _stakeholder != address(0),
            "Stakeholder address cannot be zero"
        );
        require(bytes(_type).length > 0, "Stakeholder type cannot be empty");

        Organization storage org = organizations[msg.sender];
        require(
            address(org.stakeholders[_stakeholder].timelock) == address(0),
            "Stakeholder already added"
        );

        Timelock timelock = new Timelock(
            org.token,
            _stakeholder,
            _vestingPeriod
        );

        org.stakeholders[_stakeholder] = Stakeholder(_type, timelock, false);

        emit StakeholderAdded(
            msg.sender,
            _stakeholder,
            _type,
            address(timelock)
        );
    }

    function whitelistStakeholder(address _stakeholder) public onlyOwner {
        require(
            _stakeholder != address(0),
            "Stakeholder address cannot be zero"
        );

        Organization storage org = organizations[msg.sender];
        require(
            address(org.stakeholders[_stakeholder].timelock) != address(0),
            "Stakeholder not found"
        );

        org.stakeholders[_stakeholder].whitelisted = true;

        emit StakeholderWhitelisted(msg.sender, _stakeholder);
    }

    function getStakeholder(
        address _orgOwner,
        address _stakeholder
    ) public view returns (string memory, address, bool) {
        require(
            organizations[_orgOwner].owner != address(0),
            "Organization not found"
        );
        Stakeholder storage stakeholder = organizations[_orgOwner].stakeholders[
            _stakeholder
        ];
        require(
            address(stakeholder.timelock) != address(0),
            "Stakeholder not found"
        );
        return (
            stakeholder.stakeType,
            address(stakeholder.timelock),
            stakeholder.whitelisted
        );
    }

    function balanceOf(address _orgOwner) public view returns (uint256) {
        require(
            organizations[_orgOwner].owner != address(0),
            "Organization not found"
        );
        return organizations[_orgOwner].token.balanceOf(_orgOwner);
    }

    function withdraw(uint256 _amount) public onlyOwner {
        require(_amount > 0, "Amount must be greater than zero");
        Organization storage org = organizations[msg.sender];
        require(
            org.token.balanceOf(address(this)) >= _amount,
            "Insufficient balance in contract"
        );

        org.token.transfer(org.owner, _amount);

        emit Withdrawal(msg.sender, _amount);
    }

    function claimTokens(address _orgOwner) public {
        Organization storage org = organizations[_orgOwner];
        require(org.owner != address(0), "Organization not found");
        Stakeholder storage stakeholder = org.stakeholders[msg.sender];
        require(
            address(stakeholder.timelock) != address(0),
            "Stakeholder not found"
        );
        require(stakeholder.whitelisted, "Stakeholder not whitelisted");

        stakeholder.timelock.release();
    }
}
