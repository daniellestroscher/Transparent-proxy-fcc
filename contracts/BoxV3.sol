// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract BoxV3 {
  uint256 internal value; //storage slot 0

  event ValueChanged(uint256 newValue);

  function store(uint256 newValue) public {
    value = newValue;
    emit ValueChanged(newValue);
  }

  function retrieve() public view returns (uint256) {
    return value;
  }

  function version() public pure returns (uint256) {
    return 3;
  }

  function increment() public {
    value = value + 3;
    emit ValueChanged(value);
  }
}
