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
        string stakeType; // community, investor, founder, etc.
        Timelock timelock;
        bool whitelisted;
    }

    modifier onlyOwner(address _orgOwner) {
        require(
            msg.sender == _orgOwner,
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

    function registerOrganization(string memory _name) public {
        require(bytes(_name).length > 0, "Organization name cannot be empty");
        require(
            organizations[msg.sender].owner == address(0),
            "Organization already exists for this owner"
        );

        // Create a new organization and ERC20 token
        ERC20Token token = new ERC20Token(_name, 18);

        // Initialize the Organization struct without the stakeholders mapping
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
    ) public onlyOwner(organizations[msg.sender].owner) {
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

        // Create a new timelock contract for the stakeholder
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

    function whitelistStakeholder(
        address _stakeholder
    ) public onlyOwner(organizations[msg.sender].owner) {
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

    function withdraw(
        uint256 _amount
    ) public onlyOwner(organizations[msg.sender].owner) {
        require(_amount > 0, "Amount must be greater than zero");
        Organization storage org = organizations[msg.sender];
        require(
            org.token.balanceOf(address(this)) >= _amount,
            "Insufficient balance in contract"
        );

        org.token.transfer(org.owner, _amount);
    }
}
