import { createContext, useContext, useReducer } from "react";
// import pic from "../../public/eyes-2.jpg";
const FAKE_USER = {
  name: "Aliya",
  email: "aliya@example.com",
  password: "qwerty",
  // avatar: "https://i.pravatar.cc/100?u=zz",
  avatar: "../../public/eyes-2.jpg",
};

const AuthContext = createContext();
const initialState = {
  isLogged: false,
  user: null,
  errMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loggedIn":
      return { ...state, isLogged: true, user: action.payload };
    case "loggedOut":
      // return initialState;
      return initialState;
    case "rejected":
      return { ...state, errMessage: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}

function AuthProvider({ children }) {
  const [{ isLogged, user, errMessage }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function checkUserDetails(useremail, userpass) {
    if (useremail === FAKE_USER.email && userpass === FAKE_USER.password) {
      dispatch({ type: "loggedIn", payload: FAKE_USER });
    } else {
      dispatch({ type: "rejected", payload: "Email or Password wrong!" });
    }
  }

  function userLogout() {
    // if (useremail === FAKE_USER.email && userpass === FAKE_USER.password) {
    // }
    dispatch({ type: "loggedOut" });
  }
  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        errMessage,
        checkUserDetails,
        userLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext is used outside Provider!");
  return context;
}

export { AuthProvider, useAuthContext };
