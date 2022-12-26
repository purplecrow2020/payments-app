const UserModel = require('../../../models/mongo/user');
const Bl = require('./user.bl');

const { ObjectId } = require('mongodb'); 

async function register(req, res, next) {
    try {
        const {
            email_id: emailId,
            username,
            password,
        } = req.body;

        const exists = await Bl.doesEmailIdExists(emailId);
        if (exists) {
            throw new Error("email id already registered, please login");
        }

        const user = await UserModel._create({ 
            username, 
            email_id: emailId, 
            password,
        });
        console.log(user);
        next({ 
            data: {
                user, 
                token: Bl.createToken({id: user._id}),
            }
        });
    } catch (e) {
        console.error(e);
        next({ err: e, });
    }
    
}

async function getUser(req, res, next) {
    try {
        const {
            id,
        } = req.body;

        const user = await UserModel._get({ _id: ObjectId(id), });
        next({ data: user[0] });
    } catch (e) {
        console.error(e);
        next({ err: e, });
    }
}

async function updateUser(req, res, next) {
    try {
        const id = req.body.id;
        const {
            id: Id,
        } = req.user;

        if (id != Id) {
            throw new Error("cannot perform operation");
        }
        const obj = {};
        const {
            username,
            password,
        }  = req.body;

        if (typeof username !== 'undefined') {
            obj.username = username;
        }

        if (typeof password !== 'undefined') {
            obj.password = password;
        }

        const updateResponse = await UserModel._update( ObjectId(id), { ...obj, });
        next({ data: updateResponse, });
    } catch (e) {
        console.error(e);
        next({ err: e, });
    }
}

async function deleteUser(req, res, next) {
    try {
        const id = req.body.id;
        const {
            id: Id,
        } = req.user;

        if (id != Id) {
            throw new Error("cannot perform operation");
        }

        const response = await UserModel._update(ObjectId(id), { is_deleted: true, })
        next({ data: response, })
    } catch (e) {
        console.error(e);
        next({ err: e, });
    }
}


async function login(req, res, next) {
    try {
        const {
            email_id: emailId,
            password,
        } = req.body;

        const user = await UserModel._getUserByEmailAndPassword(emailId, password);
        if (!user.length) {
            throw new Error('no user exists');
        }
        const details = user[0];
        next({ 
            data: {
                user: details, 
                token: Bl.createToken({id: details._id}),
            }
        });
    } catch (e) {
        console.error(e);
        next({ err: e, });
    }
}

module.exports = {
    register,
    getUser,
    deleteUser,
    updateUser,
    login,
};