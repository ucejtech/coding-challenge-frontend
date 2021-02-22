import { Response } from 'express'

class Respond {
    res !: Response

    constructor(res: Response) {
        this.res = res
    }

    /**
     * Error Response
     * @param status
     * @param {String} [type] - The type of error being generated i.e RouteNotFound,
     * @param {String} [message] - A short message to be display to user
     * @param {Object} [err] - The error object
     */
    error(status: number, type: string, message: string, err: object = {}) {
        this.res.status(status).json({
            error: true,
            type,
            message,
            err
        })
    }
    
    /**
     * Success Response
     * @param {string} message - A short message to be display to user
     * @param {object} data - The return object containing information for the user.
     * @param {number} status (optional) - The status code of the response i.e 200, 201 etc. Defaults to 200.
     */
    success(message: string, data: object | null, status: number = 200) {
        this.res.status(status).json({
            error: false,
            message,
            data
        })
    }
}

export default (res: Response) => new Respond(res)