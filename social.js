// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    
    this.users[this.currentID + 1] = {
      "id": this.currentID + 1,
      "name": name 
    }
    this.follows[this.currentID + 1] = new Set()
     
    this.currentID++
    return this.currentID
  }

  getUser(userID) {
    // Your code here
    if (this.users[userID]) return this.users[userID];
    else return null;
  }

  follow(userID1, userID2) {
    // Your code here
    if (this.follows[userID1] && this.users[userID2]) {
      this.follows[userID1].add(userID2)
    } else return false;
    if (this.follows[userID1].has(userID2)) return true;

  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID]
  }

  getFollowers(userID) {
    // Your code here
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
  }
}
let socialNetwork = new SocialNetwork();
socialNetwork.addUser("User 1")

module.exports = SocialNetwork;