import React,{useState,useEffect} from "react";
import axios from "axios";
import '../styles/UserProfile.css'
function UserProfile({setProfileUpdate})
{
    const [editData,setEditData]=useState({
        name:'',
        email:'',
        address:'',
        phone:'',
        gender:'',
        age:''
    })
    useEffect(()=>{
        const fetch=async()=>{
            const response=await axios.get("https://ecommerce-web-app-in-mern-1.onrender.com/api/product/userprofile",{withCredentials:true})
            console.log(response.data)
            setEditData({
                name:response.data.name || '',
                email:response.data.email || '',
                address:response.data.address || '',
                phone:response.data.phone || '',
                gender:response.data.gender || '',
                age:response.data.age || ''
            })
        }
        fetch()
        window.scrollTo(0,0)
    },[])
    function InputHandler(e){
        const {name,value}=e.target
        setEditData((prevState)=>({
            ...prevState,
            [name]:value,
        }))
    }
    const submit=async()=>{
        const response=await axios.post("https://ecommerce-web-app-in-mern-1.onrender.com/api/product/updateprofile",editData,{withCredentials:true})
        console.log(response.data)
        setEditData({
            name:response.data.name || '',
            email:response.data.email || '',
            address:response.data.address || '',
            phone:response.data.phone || '',
            gender:response.data.gender || '',
            age:response.data.age || ''
        })
        setProfileUpdate(true)
    }
    return(
        <div className="Allcontainer">
        <div className="userprofile">
            <h1 className="headertitle">User Profile</h1>
            <img src="blank-profile.png" className="profileimage"/>
            <div className="borderline">
                <label>Name:</label>
                <input type="text" name="name" value={editData.name} onChange={InputHandler}/>
            </div>
            <div className="borderline">
                <label>Email:</label>
                <input type="text" name="email" value={editData.email} onChange={InputHandler} disabled/>
            </div>
            <div className="borderline">
                <label>Address:</label>
                <input type="text" name="address" value={editData.address} onChange={InputHandler}/>
            </div>
            <div className="borderline">
                <label>Phone No:</label>
                <input type="text" name="phone" value={editData.phone} onChange={InputHandler}/>
            </div>
            <div className="borderline">
                <label>Gender:</label>
                <input type="text" name="gender" value={editData.gender} onChange={InputHandler}/>
            </div>
            <div className="borderline">
                <label>Age:</label>
                <input type="text" name="age" value={editData.age} onChange={InputHandler}/>
            </div>
            <button onClick={()=>submit()} className="savedetails">Submit</button>
        </div>
        </div>
    )
}

export default UserProfile