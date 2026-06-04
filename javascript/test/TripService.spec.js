"use strict"

import {describe, it, expect} from 'bun:test';
import TripService from '../src/TripService.js'
import TripDAO from '../src/TripDAO.js'
import User from '../src/User.js'

class TestableTripService extends TripService {
    constructor(loggedUser) {
        super()
        this.loggedUser = loggedUser
    }

    getLoggedUser() {
        return this.loggedUser
    }
}

describe('TripService', () => {

    it('should throw an error when user is not logged in', () => {
        const tripService = new TestableTripService(null)
        expect(() => tripService.getTripsByUser({})).toThrow('User not logged in.')
    })

    it('should return no trips when user is logged in but stranger has no friends', () => {
        const loggedUser = new User()
        const stranger = new User()
        const tripService = new TestableTripService(loggedUser)
        expect(tripService.getTripsByUser(stranger)).toEqual([])
    })

    it('should return no trips when the logged user is not a friend', () => {
        const loggedUser = new User()
        const stranger = new User([new User()])
        const tripService = new TestableTripService(loggedUser)
        expect(tripService.getTripsByUser(stranger)).toEqual([])
    })

    it('should return the friend trips when the logged user is a friend', () => {
        const loggedUser = new User()
        const trips = [{}, {}]
        const friend = new User([new User(), loggedUser])
        const originalFindTripsByUser = TripDAO.findTripsByUser
        TripDAO.findTripsByUser = () => trips
        try {
            const tripService = new TestableTripService(loggedUser)
            expect(tripService.getTripsByUser(friend)).toEqual(trips)
        } finally {
            TripDAO.findTripsByUser = originalFindTripsByUser
        }
    })

})
