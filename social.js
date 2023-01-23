// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {}; // {1:{id:1,name:'Joe'}, 2:{id:2,name:'Jane'},... }
    this.follows = {}; // {1:{Set(2,3,4,5...}, 2:{Set(1,4,6)}, ...}
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
    let followersSet = new Set()
    let netFollowsArr = Object.entries(this.follows) // to array for iteration
    for (const [iterID, followsSet] of netFollowsArr) {
      if (followsSet.has(userID)) followersSet.add(Number(iterID)); 
    };
    return followersSet;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    //node = userID, node neighbours = Array.from(this.follows[userID]) (user follows) 
    
    // Create a queue and enqueue a path to the next chain user. Starting user=zero length path
    const queue = [[userID]]; // we can also make start from user follows list
    // Create a set to store visited users, 1st already
    const visited = new Set([userID]);

    const recommended = [] // store results here;
    // search the whole area of neigbours/folows of follows:
    while (queue.length > 0) {
      // Dequeu path
      let path = queue.shift();
      // add last user in the path to the recommended array 
        //if path length is within degrees. path length has to be more then
        // 2 (user and his folowers) and pass-2 less-equal degrees (user-fol-fol = degrees 1)
      let currentUser = path[path.length - 1]
      // path length = nodes-count -1
      if (2 < path.length && path.length - 2 <= degrees) recommended.push(currentUser)
      
      // add non-visited neighbours to the end of path end queue
      let nbors = Array.from(this.follows[currentUser])
      for (const nbor of nbors) {
        if (!visited.has(nbor)) {
          visited.add(nbor);
          queue.push(path.concat(nbor))
        }
      }
    }
    
    return recommended;
  }
}

module.exports = SocialNetwork;