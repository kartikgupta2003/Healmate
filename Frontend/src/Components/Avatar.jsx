import React from "react";
import { Avatar } from '@chakra-ui/react';
import { useUser } from "../Context/useUser";

const AvatarComp = () => {
    const { user } = useUser();


    console.log("user hai ", user);

    let arr = user?.name.split(" ");
    let name="";

    if(arr){
        arr= arr.map((ele)=>{
        return ele[0];
    })
    name = arr.join("");
    }

    
    return (
        

        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{name}</span>
        </div>

    )
}

export default AvatarComp;