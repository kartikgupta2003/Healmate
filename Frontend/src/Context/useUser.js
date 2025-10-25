import {userContext} from "./provider";
import React , {useContext} from "react";

export const useUser = ()=>{
    return useContext(userContext);
}