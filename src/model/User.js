var users = [];
var selectedUserID = "";
var selectedToID = "";

export default class User {
  constructor(id, name, image) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
  save() {
    users.push(this);
  }
  static fetchAll() {
    return users;
  }
  static removeAll() {
    users = [];
  }
  static assignSelectedUserID(id) {
    selectedUserID = id;
    console.log(selectedUserID);
  }
  static getSelectedUserID() {
    return selectedUserID;
  }
  static assignSelectedToID(id) {
    selectedToID = id;
    console.log(selectedToID);
  }
  static getSelectedToID() {
    return selectedToID;
  }
}
