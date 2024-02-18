import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null, 
  message:null
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
  .addCase("LoadUserRequest", (state) => {
    state.loading = true;
  })
  .addCase("LoadUserSuccess", (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  })
  .addCase("LoadUserfailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  })

  
    .addCase("LoginRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoginSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("Loginfailure", (state, action) => {
      state.loading = false;
      state.error = action.payload; 
      state.isAuthenticated = false;
    })

   
    .addCase("LogoutUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LogoutUserSuccess", (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase("LogoutUserfailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    })

  
      .addCase("RegisterRequest", (state) => {
        state.loading = true;
      })
      .addCase("RegisterSuccess", (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase("Registerfailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

 .addCase("resetPasswordRequest", (state) => {
  state.loading = true;
})
.addCase("resetPasswordSuccess", (state, action) => {
  state.loading = false;
  state.message = action.payload;
})
.addCase("resetPasswordFailure", (state, action) => {
  state.loading = false;
  state.error = action.payload;
})


.addCase("forgotPasswordRequest", (state) => {
  state.loading = true;
})

.addCase("forgotPasswordSuccess", (state, action) => {
  state.loading = false;
  state.message = action.payload;
})
.addCase("forgotPasswordFailure", (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

 

.addCase("myUrlRequest", (state) => {
  state.loading = true;
})

.addCase("myUrlSuccess", (state, action) => {
  state.loading = false;
  state.url = action.payload;
})
 

.addCase("myUrlFailure", (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase("clearMessage", (state) => {
  state.message = null;
})

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});




