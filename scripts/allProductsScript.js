// initialize firebase
import app from "./firebase.js";

import {getDatabase, ref, onValue, get, update, push, remove} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// initialize database content
const database = getDatabase(app)
// const dbRef = ref(database);

// Next, we create a reference to point to our database:
const inventoryRef = ref(database, '/inventory');

const favRef = ref(database, '/favorites');

const ulElement = document.querySelector("#productContainer");

onValue(inventoryRef, (firebaseData) => {
    ulElement.innerHTML = '';
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

        const favButton = document.createElement('button');
        favButton.innerText = "♥";
        
        listItem.append(favButton, imageElement, titleElement, priceElement);

        ulElement.append(listItem); 

        // console.log(productData[key]);

        if (productData[key].favorited) {
            favButton.setAttribute('disabled', '');
            
            // updateToDo()
        }
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

// WISH LIST

ulElement.addEventListener('click', (event) => {

    if (event.target.tagName === 'BUTTON') {
    //   console.log(event.target);
      
      addFavorite(event.target.parentElement.id);
    }
  })



const addFavorite = (selectedProduct) => {
    // console.log(selectedProduct);
    
    const selectedRef = ref(database, `/inventory/${selectedProduct}`)
    // console.log(selectedRef);

    get(selectedRef)
      .then((snapshot) => {
        // console.log(snapshot.val());
  
        const productData = snapshot.val()
        // console.log(productData);
  
        const favProduct = {
          title: productData.title,
          imgUrl: productData.url,
          alt: productData.title,
          price: productData.price,
          id: productData.id,
          name: selectedProduct
        }
  
        const favState = {
          favorited: true
        };
        
        update(selectedRef, favState);
  
        push(favRef, favProduct)
      })
}

onValue(favRef, (firebaseData) => {
    const ulElement = document.querySelector('#favContainer');

    ulElement.innerHTML = '';

    const favData = firebaseData.val();

    for (let key in favData) {
        // console.log(favData[key]);

        const listItem = document.createElement("li");
        // listItem.id = key
        
        const titleElement = document.createElement("h4")
        titleElement.innerText = favData[key].title
        
        const imageElement = document.createElement("img")
        imageElement.src = favData[key].imgUrl;
        imageElement.alt = favData[key].alt;
        
        const priceElement = document.createElement("p")
        priceElement.innerText = favData[key].price

        const removeButton = document.createElement('button');
        removeButton.innerText = "✖";
        
        listItem.append(removeButton, imageElement, titleElement, priceElement);
        
        ulElement.append(listItem); 

        removeButton.id = key
    }
});

const favContainer = document.querySelector('#favContainer')

favContainer.addEventListener('click', (e) => {
    
    if (e.target.tagName === "BUTTON") {
    
    // console.log(e.target);
    
    const buttonId = e.target.id;
  
      get(favRef)
      .then(snapshot => {
          const favObject = snapshot.val();
          
          const originalProductId = favObject[buttonId].name
          
        //   console.log(originalProductId);
  
          const itemToRemove = ref(database, `favorites/${buttonId}`)
          remove(itemToRemove)
  
          const productToUpdate = ref(database, `inventory/${originalProductId}`)
  
          const favState = {
          favorited: false
          }
  
        update(productToUpdate, favState)
      })
    }
  })
