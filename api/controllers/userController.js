'use strict';

import { PrismaClient } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    prisma;
    constructor({ }) {
        this.prisma = new PrismaClient();
    };

    async signInUser(req, res) {
        const user = await this.searchUser(req.body.email);

        if (!user) return res.json({ message: 'User Not Found, Please Sign Up or use a different account.', payload: 0 });

        const comparePassword = compareSync(req.body.password, user.password);

        if (!comparePassword) return res.json({ message: 'Incorrect Credentials.', payload: 0 });

        const token = jwt.sign({ email: user.email, date: Date.now() }, process.env.JWT_SECRET_KEY);

        return res.json({
            message: 'User Logged Successfully',
            payload: token
        });

    };

    async signUpUser(req, res) {

        const user = await this.searchUser(req.body.email);

        if (user) return res.json({ message: 'User Founded, Please Sign In or use a different email.', payload: 0 });

        const createUser = await this.prisma.users.create({
            data: {
                email: req.body.email,
                password: hashSync(req.body.password, 10)
            }
        })

        return res.json({
            message: 'User Created Successfully',
            payload: createUser.id
        });
        //const user = this.database.getUser(req.params.id);
        // res.json(user);
    }

    async searchUser(email) {
        return await this.prisma.users.findUnique({
            where: {
                email: email
            }
        });
    }
}

export default UserController;
