// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ToDoList {
  uint256 public _idUser;
  address public ownerOfContract;

  address[] public creators;
  string[] public messages;
  uint256[] public messageIds;

  struct ToDoListApp {
    address account;
    uint256 userId;
    string message;
    bool completed;
  }

  event ToDoEvent(
    address indexed account,
    uint256 indexed userId,
    string message,
    bool completed
  );

  mapping (address => ToDoListApp) public toDoListApps;

  constructor() {
    ownerOfContract = msg.sender;
  }

  function inc() internal {
    _idUser++;
  }

  function createList(string calldata _message) external {
    inc();

    uint256 idNumber = _idUser;
    ToDoListApp storage toDo = toDoListApps[msg.sender];

    toDo.account = msg.sender;
    toDo.message = _message;
    toDo.completed = false;
    toDo.userId = idNumber;

    creators.push(msg.sender);
    messages.push(_message);
    messageIds.push(idNumber);

    emit ToDoEvent(msg.sender, toDo.userId, toDo.message, toDo.completed);
  }

  function getCreatorData(address _address) public view returns (address, uint256, string memory, bool) {
    ToDoListApp memory singleUserData = toDoListApps[_address];

    return (
      singleUserData.account,
      singleUserData.userId,
      singleUserData.message,
      singleUserData.completed
    );
  }

  function getAddress() external view returns (address[] memory) {
    return creators;
  }

  function getMessages() external view returns (string[] memory) {
    return messages;
  }

  function toggle(address _creator) public {
    ToDoListApp storage singleUserData = toDoListApps[_creator];
    singleUserData.completed = !singleUserData.completed;
  }
}
