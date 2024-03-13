import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
var data;
  try {
    dispatch({
      type: "LoginRequest",
    });
 
     data  = await axios.post("https://urlshortapp.onrender.com/api/v1/login", { email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      }
  );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "Loginfailure",
      payload: error.response.data.message,
    });
  }


};



export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("https://urlshortapp.onrender.com/api/v1/me");
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserfailure",
      payload: error.response.data.message,
    });
  }
};



export const getMyUrl = ()=> async(dispatch)=>{
  try {    
    dispatch({
        type:"myUrlRequest",
    });


    const {data} = await axios.get("https://urlshortapp.onrender.com/api/v1/my/urls", 
                                  
                                  headers: {
          "Content-Type": "application/json",
        },
                                );

    dispatch({
      type:"myUrlSuccess",
      payload:data,
  });
    

  } catch (error) {
    dispatch({
      type: "myUrlFailure",
      payload: error.response.data.message,
    });
  }
}






export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

  await axios.get("https://urlshortapp.onrender.com/api/v1/logout")
    dispatch({
      type: "LogoutUserSuccess", 
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserfailure",
      payload: error.response.data.message,
    });
  }
};



export const registerUser =
  (name, email,password) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(
        "https://urlshortapp.onrender.com/api/v1/register",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "Registerfailure",
        payload: error.response.data.message,
      });
    }
  };




  export const updateProfile =
  (name, email, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });

      const { data } = await axios.put(
        "https://urlshortapp.onrender.com/api/v1/update/profile",
        { name, email, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProfileFailure",
        payload: error.response.data.message,
      });
    }
  };




  export const resetPassword = (token, password) => async (dispatch) => {
    try {
      dispatch({
        type: "resetPasswordRequest",
      });
  
      const { data } = await axios.put(
        `https://urlshortapp.onrender.com/api/v1/password/reset/${token}`,
        {
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "resetPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "resetPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

  
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({
        type: "forgotPasswordRequest",
      });
  
      const { data } = await axios.post(
        "https://urlshortapp.onrender.com/api/v1/forgot/password",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "forgotPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "forgotPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };
  


  export const deleteMyProfile =
  () => async (dispatch) => {
    try {
      
      dispatch({
        type: "deleteProfileRequest",
      });

      const { data } = await axios.delete("https://urlshortapp.onrender.com/api/v1/delete/me")

      dispatch({
        type: "deleteProfileSuccess",
        payload: data.message,
      });


    } catch (error) {
      dispatch({
        type: "deleteProfileFailure",
        payload: error.response.data.message,
      });
    }
  };


 

 
