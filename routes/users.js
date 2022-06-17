const express=require('express');
const userController=require('../controllers/userController');
const mailController=require('../controllers/mailController');
const Router=express.Router();

Router.get('/',userController.getUsers);
Router.post('/',userController.addUser);
Router.get('/:id',userController.getUser);
Router.put('/:id',userController.updateUser);
Router.delete('/:id',userController.deleteUser);
Router.post('/send',mailController);

module.exports=Router;