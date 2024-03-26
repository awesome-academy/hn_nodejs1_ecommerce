import express from 'express';
const router = express.Router();
import * as manageUserController from '../controllers/admin.user.controller';
import * as userController from '../controllers/user.controller';


// user
router.post('/changePass',userController.postPasswordValidation, userController.postChangePass)
router.get('/changePass', userController.getChangePass);
router.post('/edit', userController.handleUpload, userController.postRegisterValidation, userController.editDetailUser)
router.get('/detail', userController.getDetailUser);

// admin
router.get('/search', manageUserController.searchUser)
router.delete('/delete/:id', manageUserController.deleteUser);
router.post(
  '/create',
  manageUserController.handleUpload,
  manageUserController.postRegisterValidation,
  manageUserController.postCreateUser,
);

router.put(
  '/create',
  manageUserController.handleUpload,
  manageUserController.postRegisterValidation,
  manageUserController.editUser,
);

router.get('/list', manageUserController.getListUser);

export default router;
