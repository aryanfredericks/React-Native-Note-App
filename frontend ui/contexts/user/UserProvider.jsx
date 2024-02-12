
import React, { useState } from 'react'
import UserContext from './UserContext'
const UserProvider = ({ children }) => {
    const [userLoginData, setUserLoginData] = useState({
        email : '',
        password : '',
    });
    const [userSignUpData, setUserSignUpData] = useState({
        name : '',
        email : '',
        password : '',
        confirmPassword : '',
    });
    return (
        <UserContext.Provider
            value={{ userLoginData, setUserLoginData , userSignUpData, setUserSignUpData }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider