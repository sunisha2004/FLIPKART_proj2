// import { Router } from "express"
// import Auth from './authentication/auth.js'

// import * as rh from './reqhandler.js'

// const router=Router()

// router.route('/adduser').post(rh.addUser)
// router.route('/addAddress').post(Auth,rh.addAddress)
// router.route('/login').post(rh.login)
// router.route('/verifyEmail').post(rh.verifyEmail)
// // router.route('/getuser').get(Auth,rh.getUser)
// router.route('/getuserData').get(Auth,rh.getUserData)
// router.route('/updateUser').put(Auth,rh.updateUserData)
// router.route('/updatePassword').put(rh.updatePassword)
// router.route('/getUserAddresses').get(Auth, rh.getUserAddresses);
// router.route('/getCompany').get(Auth, rh.getCompany);
// router.route('/addCompany').post(Auth, rh.addCompany);
// router.route('/addProduct').post(Auth, rh.addProduct);
// router.route('/editCompany').post(Auth, rh.editCompany);
// router.route('/getProducts').get(Auth, rh.getProducts);
// router.route('/getProductsByCategory/:category').get(Auth, rh.getProductsByCategory);
// router.route('/getProduct/:productId').get(Auth, rh.getProductById);
// router.route('/getAllOtherProducts').get(Auth, rh.getAllOtherProducts);
// router.route('/getProduct/:productId').get(Auth, rh.getProductById);

// export default router

import { Router } from "express"
import Auth from './authentication/auth.js'

import * as rh from './reqhandler.js'

const router=Router()

router.route('/adduser').post(rh.addUser)
router.route('/addAddress').post(Auth,rh.addAddress)
router.route('/login').post(rh.login)
router.route('/verifyEmail').post(rh.verifyEmail)
router.route('/verifyRegister').post(rh.verifyRegister)
// router.route('/getuser').get(Auth,rh.getUser)
router.route('/getuserData').get(Auth,rh.getUserData)
router.route('/updateUser').put(Auth,rh.updateUserData)
router.route('/updatePassword').put(rh.updatePassword)
router.route('/getUserAddresses').get(Auth, rh.getUserAddresses);
router.route('/getCompany').get(Auth, rh.getCompany);
router.route('/addCompany').post(Auth, rh.addCompany);
router.route('/addProduct').post(Auth, rh.addProduct);
router.route('/editCompany').post(Auth, rh.editCompany);
router.route('/getProducts').get(Auth, rh.getProducts);
router.route('/getProductsByCategory/:category').get(Auth, rh.getProductsByCategory);
router.route('/getProduct/:productId').get(Auth, rh.getProductById);
router.route('/getAllOtherProducts').get(Auth, rh.getAllOtherProducts);
router.route('/getProduct/:productId').get(Auth, rh.getProductById);
router.route('/getAllProducts').get(rh.getAllProducts);
router.route('/addCart').post(Auth, rh.addCart);
router.route('/findOnCart/:productId').get(Auth, rh.findOnCart);
router.route('/getCart').get(Auth, rh.getCart);
router.route('/deleteCartItem/:productId').delete(Auth, rh.delCartItem);
router.route('/incrementCartQuantity/:productId').put(Auth, rh.incrementCartQuantity);
router.route('/decrementCartQuantity/:productId').put(Auth, rh.decrementCartQuantity);
router.route('/placeOrder').post(Auth, rh.placeOrder);
router.route('/getBuyerOrder').get(Auth, rh.getBuyerOrder);
router.route('/getSellerOrders').get(Auth, rh.getSellerOrders);
router.route('/confirmOrder/:productId').put(Auth, rh.confirmOrder);
router.route('/checkWishlist/:productId').get(Auth, rh.checkWishlist);
router.route('/getWishList').get(Auth, rh.getWishList);
router.route('/addToWishlist/:productId').post(Auth, rh.addToWishlist);
router.route('/removeFromWishlist/:productId').post(Auth, rh.removeFromWishlist);

export default router