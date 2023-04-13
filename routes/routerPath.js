const express=require("express");
const { savefn, getfn,updatefn ,deletefn,paginationgetfn, sendgmailfn, profileDetailsfn, profileselectivedatafn, searchfn} = require('../controllers/tableDataController');
const {loginfn,registrationfn,getalluserfn,deleteuserfn,logincheck}= require('../controllers/loginController')
const bycriptfn=require('../middlewares/bycript');
const jwtfn = require("../middlewares/jwtauthcode");
const router=express.Router()

router.get('/view',getfn)
router.post('/save',savefn)
router.post('/update',updatefn)
router.post('/delete',deletefn)
router.get('/viewpage',paginationgetfn)
router.post("/sendmail",sendgmailfn)
router.post("/profileDetails",jwtfn,profileDetailsfn)
router.get("/viewdata",profileselectivedatafn)
router.post("/search",searchfn)

router.post('/register',bycriptfn,registrationfn)
router.get('/getalluser',getalluserfn)
router.post('/deleteuser',deleteuserfn)
router.post('/login',loginfn)
router.get("/users/:id/verify/:token",logincheck)




module.exports=router;