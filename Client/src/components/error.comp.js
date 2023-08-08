import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'



function Error(error) {

    const dispatch = useDispatch();
    const [errornew,seterror]=useState()

    useEffect(() => {

        seterror(error.error.errors[0].msg)
        setTimeout(()=>{dispatch({type:'USER_LOGIN_FAILED',payload:''})},8000)

    }, [error,dispatch])

   

    return (<>

       {errornew && <div>
              <div>
                  <h3 style={{color: "red", fontSize:'20px'}}>{errornew}</h3>
               </div>

        </div>}

       

        </>

    )

}



export default Error