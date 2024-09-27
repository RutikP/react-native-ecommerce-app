import axios from "axios";

const API_KEY = 'AIzaSyB1QBjlGlPwpbUiQSPhH1-U1APFjRH4eTQ';

async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
    },
    {
        headers:{
            "Content-Type": "application/json"
        },
    }
);

const token = response.data.idToken;
// console.log(token);
return token;
}



export function createUser(email, password) {
        return authenticate("signUp", email, password)
}

export function login(email, password) {
    return authenticate("signInWithPassword", email, password);
  }