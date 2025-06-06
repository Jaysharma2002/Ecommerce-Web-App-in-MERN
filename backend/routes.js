import express from "express"
import {fetch,create,update,delete1,payment,alluser,signin,order,getorder,updateorder,getuserorder,cancelorder,userprofile,updateprofile,updateaddress,getaddress,logout,saverating,savecomment} from "./Controller.js"

const route=new express.Router()
route.post("/create",create)
route.get("/fetch",fetch)
route.put("/update/:id",update)
route.delete("/delete/:id",delete1)
route.post("/payment",payment)
route.post('/createuser',alluser)
route.post('/signin',signin)
route.post('/order',order)
route.get('/getorder',getorder)
route.put('/updatestatus',updateorder)
route.get('/getuserorder',getuserorder)
route.put('/cancelorder',cancelorder)
route.get('/userprofile',userprofile)
route.post('/updateprofile', updateprofile);
route.put('/updateaddress',updateaddress)
route.post('/getaddress',getaddress)
route.post('/logout',logout)
route.put('/saverating',saverating)
route.put('/savecomment',savecomment)
export default route