import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';


export function signin(email, password) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
            dispatch({type: "SIGN_IN", user: data})
            Actions.main();
        }).catch((err) => {
            alert(err.message);
        })
    };
}

export function signup(name, email, password) {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => 
        {
            // firebase.auth().currentUser.updateProfile({name : name})

            dispatch({type: "SIGN_UP", user: data})
            Actions.signin();
            firebase.database().ref("users/").child(data.uid).set({
                name : name,
                email : email,
                password : password,
            })
        }).catch((err) => {
            alert(err.message);
        })
    };
}

export default function reducer(state = {
    name: '',
    email: '',
    password: '',
}, action) {

    switch (action.type) {
        case "SIGN_IN":
            return {
               user : action.user
            };
            break;

        case "SIGN_UP":
            return {
                user: action.user
            };
            break;

        default:
            return state;
    }
}

// function sendLoginRequest(email, password) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (email === 'admin@gmail.com' && password === 'admin') {
//                 return resolve(true);
//             }
//             else {
//                 return reject(new Error('Invalid email or password'));
//             }    
//         }, 1000);
//     });
// }