import "./App.css";
import app from "./firebase.init";
import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };

  return (
    <div className="App" style={{ marginTop: "50px" }}>
      {user.uid ? (
        <button onClick={handleSignOut}>Google Sign Out</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>
            <FontAwesomeIcon icon={faGoogle} color="blue" size="xl" />
          </button>
          <button onClick={handleGithubSignIn}>
            <FontAwesomeIcon icon={faGithub} color="blue" size="xl" />
          </button>
          <button onClick={handleFacebookSignIn}>
            <FontAwesomeIcon icon={faFacebook} color="blue" size="xl" />
          </button>
        </>
      )}
      <h2>Name:{user.displayName}</h2>
      <p>I Know your email address: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
