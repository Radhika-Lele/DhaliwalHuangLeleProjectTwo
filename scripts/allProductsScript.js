// initialize firebase
import app from "./firebase.js";
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// initialize database content
const database = getDatabase(app)
const dbRef = ref(database);

// Next, we create a reference to point to our database:
const inventoryRef = ref(database, '/inventory');

const ulElement = document.querySelector("#productContainer");

onValue(inventoryRef, (firebaseData) => {
    const productData = firebaseData.val();
    for (let key in productData) {
        const imgUrl = productData[key].url;
        const imgAlt = productData[key].title;
        const productTitle = productData[key].title
        const productPrice = productData[key].price
        
        const listItem = document.createElement("li");
        listItem.id = key
        
        const titleElement = document.createElement("h4")
        titleElement.innerText = productTitle
        
        const imageElement = document.createElement("img")
        imageElement.src = imgUrl
        imageElement.alt = imgAlt
        
        const priceElement = document.createElement("p")
        priceElement.innerText = productPrice
        
        listItem.append(imageElement, titleElement, priceElement);
        ulElement.append(listItem); 
    }

    const productElements = document.querySelectorAll("#productContainer li")
    const searchInput = document.querySelector("[data-search]");
    
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();
        productElements.forEach((product) => {
            const title = product.querySelector("h4").innerText.toLowerCase();
            if (title.includes(searchValue)) {
                product.style.display = "flex";
            } else {
                product.style.display = "none";
         }
        });
    });
});


