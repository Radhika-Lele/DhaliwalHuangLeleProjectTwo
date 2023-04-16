
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCMf7c7lSpwaXADTvPUIU0xRW4SfaA8Zhk",
    authDomain: "pair-project-two.firebaseapp.com",
    databaseURL: "https://pair-project-two-default-rtdb.firebaseio.com",
    projectId: "pair-project-two",
    storageBucket: "pair-project-two.appspot.com",
    messagingSenderId: "304867664852",
    appId: "1:304867664852:web:320d51439be9dcafba2c41"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
export default app;