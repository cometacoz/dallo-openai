'use strict';

class UserController {
    constructor({ database }) {
        this.database = database;
    }

    getUser(req, res) {
        const user = this.database.getUser(req.params.id);
        res.json(user);
    }
}

export default UserController;
