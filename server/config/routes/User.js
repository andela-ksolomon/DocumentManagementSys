import express from 'express';
import User from '../../app/controllers/User';
import Auth from '../middlewares/Authentication';

const UserRouter = express.Router();

UserRouter.route('/')
  .get(Auth.isLoggedIn, Auth.checkAdmin, User.fetchAll)
  .post(Auth.validateInput, User.create);

UserRouter.route('/:id')
  .get(Auth.isLoggedIn, Auth.checkAdmin, User.fetchOne)
  .put(Auth.isLoggedIn, Auth.validateUpdate, User.updateUserData)
  .delete(Auth.isLoggedIn,
    Auth.checkAdmin, Auth.validateDelete, User.deleteUser);
UserRouter.route('/verify/:identifier')
  .get(User.fetchDetails);

UserRouter.route('/logout')
  .post(Auth.isLoggedIn, User.logout);

UserRouter.route('/login')
  .post(Auth.authenticate, User.login);

export default UserRouter;
