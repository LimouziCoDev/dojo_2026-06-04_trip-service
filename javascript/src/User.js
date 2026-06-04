"use strict"

export default class User {
    constructor(friends = []) {
        this.friends = friends
    }

    getFriends() {
        return this.friends
    }

    hasFriend(loggedUser) {
        let friends = this.getFriends();
        return friends.includes(loggedUser);
    }
}