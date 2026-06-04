"use strict"

import UserSession from './UserSession.js'
import TripDAO from './TripDAO.js'
import User from './User.js'

class TripService {
    getTripsByUser(user) {
        let loggedUser = this.getLoggedUser()
        if (loggedUser != null) {
            let isFriend = user.hasFriend(loggedUser);
            if (isFriend) {
                return this.getTripList(user)
            }
            return []
        } else {
            throw new Error('User not logged in.')
        }
    }

    getTripList(user) {
        return TripDAO.findTripsByUser(user);
    }

    getLoggedUser() {
        return UserSession.getLoggedUser();
    }
}

export default TripService
