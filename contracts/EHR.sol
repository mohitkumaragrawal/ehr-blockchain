// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Roles.sol";

contract EHR {
  using Roles for Roles.Role;

  Roles.Role private admin;
  Roles.Role private doctor;

  struct Doctor {
    string drHash;
    mapping(address => bool) userPermissions;
  }

  struct User {
    string userHash;
    mapping(address => bool) doctorPermissions;
    address[] pendingDoctors;
  }

  mapping(address => Doctor) Doctors;
  mapping(address => User) Users;

  address[] public DrIDs;

  constructor() {
    admin.add(msg.sender);
  }

  function isAdmin() public view returns (bool) {
    return admin.has(msg.sender);
  }

  function addDrInfo(address dr_id, string memory _drInfo_hash) public {
    require(admin.has(msg.sender), "Only For Admin");

    Doctor storage drInfo = Doctors[dr_id];
    drInfo.drHash = _drInfo_hash;
    DrIDs.push(dr_id);

    doctor.add(dr_id);
  }

  function getAllDrs() public view returns (address[] memory) {
    return DrIDs;
  }

  function getDr(address _id) public view returns (string memory) {
    return Doctors[_id].drHash;
  }

  function isDr(address id) public view returns (bool) {
    return doctor.has(id);
  }

  function grantPermission(address doctorAddress) public {
    require(isDr(doctorAddress), "Doctor not registered");
    Users[msg.sender].doctorPermissions[doctorAddress] = true;

    // Remove doctor from pending list
    for (uint256 i = 0; i < Users[msg.sender].pendingDoctors.length; i++) {
      if (Users[msg.sender].pendingDoctors[i] == doctorAddress) {
        delete Users[msg.sender].pendingDoctors[i];
        break;
      }
    }
  }

  function revokePermission(address doctorAddress) public {
    require(isDr(doctorAddress), "Doctor not registered");
    Users[msg.sender].doctorPermissions[doctorAddress] = false;
  }

  function hasPermission(address userAddress, address doctorAddress) public view returns (bool) {
    return Users[userAddress].doctorPermissions[doctorAddress];
  }

  function setUserHash(string memory _userHash) public {
    Users[msg.sender].userHash = _userHash;
  }

  function getUserHash() public view returns (string memory) {
    return Users[msg.sender].userHash;
  }

  // Function for doctors to access user's hash if they have permission
  function getAuthorizedUserHash(address userAddress) public view returns (string memory) {
    require(isDr(msg.sender), "Only for doctors");
    require(hasPermission(userAddress, msg.sender), "No permission granted");
    return Users[userAddress].userHash;
  }

  function requestPermission(address userAddress) public {
    require(isDr(msg.sender), "Only for doctors");
    Users[userAddress].pendingDoctors.push(msg.sender);
  }

  function getPendingDoctors() public view returns (address[] memory) {
    return Users[msg.sender].pendingDoctors;
  }
}
