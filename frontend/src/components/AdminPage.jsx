import React, { useState } from "react";
import useRegisterOrganization from "../hooks/useRegisterOrganization";
import useAddStakeholder from "../hooks/useAddStakeholder";
import useWhitelistStakeholder from "../hooks/useWhitelistStakeholder";
import useGetStakeholder from "../hooks/useGetStakeholder";

const AdminPage = () => {
  const [orgName, setOrgName] = useState("");
  const [address, setAddress] = useState("");
  const [stakeType, setStakeType] = useState("");
  const [vestingPeriod, setVestingPeriod] = useState("");
  const [stakeholderAddress, setStakeholderAddress] = useState("");
  const [stakeholderAddressInfo, setStakeholderAddressInfo] = useState("");
  const [orgOwner, setOrgOwner] = useState("");

  const registerOrganization = useRegisterOrganization(orgName);
  const addStakeholder = useAddStakeholder(address, stakeType, vestingPeriod);
  const whitelistStakeholder = useWhitelistStakeholder(address);
  const { stakeTypeInfo, vestingPeriodInfo, whitelistedInfo, fetchStakeholder } = useGetStakeholder(orgOwner, stakeholderAddressInfo);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Page</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Register Organization</h2>
          <input
            type="text"
            placeholder="Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={registerOrganization}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add Stakeholder</h2>
          <input
            type="text"
            placeholder="Stakeholder Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Stake Type"
            value={stakeType}
            onChange={(e) => setStakeType(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Vesting Period (in seconds)"
            value={vestingPeriod}
            onChange={(e) => setVestingPeriod(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addStakeholder}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Stakeholder
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Whitelist Stakeholder</h2>
          <input
            type="text"
            placeholder="Stakeholder Address"
            value={stakeholderAddress}
            onChange={(e) => setStakeholderAddress(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={whitelistStakeholder}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Whitelist
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Get Stakeholder Info</h2>
          <input
            type="text"
            placeholder="Stakeholder Address"
            value={stakeholderAddressInfo}
            onChange={(e) => setStakeholderAddressInfo(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={orgOwner}
            onChange={(e) => setOrgOwner(e.target.value)}
            placeholder="Enter Organization Owner Address"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchStakeholder}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Get Info
          </button>
          {stakeTypeInfo && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="mb-2"><strong>Stake Type:</strong> {stakeTypeInfo}</p>
              <p className="mb-2"><strong>Timelock Address:</strong> {vestingPeriodInfo}</p>
              <p><strong>Whitelisted:</strong> {whitelistedInfo ? "Yes" : "No"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
