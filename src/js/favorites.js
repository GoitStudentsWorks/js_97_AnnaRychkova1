import axios from "axios";

import { hide, show } from "./services/visibility";
import { refs } from "./templates/refs.js";
import isiToast from './services/isiToast.js';


// //  Quote of Day if it is not part of favorites

const LS_KEY_QUOTE = "quoteResponse";
const quoteFromLS = JSON.parse(localStorage.getItem(LS_KEY_QUOTE));
console.log(quoteFromLS);


function displayQuoteOnPage(quoteData) {
 const quoteText = document.querySelector('.quote-text');
 const quoteAuthor = document.querySelector('.quote-author');
 quoteText.textContent = quoteData.quote;
 quoteAuthor.textContent = quoteData.author;
}

/// Create Favorites page

// const LS_KEY_FAVORITES = 'exerciseFavorites';

async function createGalleryFromLS(LS_KEY_FAVORITES, createMarkupFavorites) {
 try {
   const itemsFromLS = JSON.parse(localStorage.getItem('exersiseFavorites'));
console.log(itemsFromLS);



   if (!itemsFromLS || !Array.isArray(itemsFromLS) ||
itemsFromLS.length === 0) {
     console.log('No items found in local storage or data is invalid.');
     apiIsiToastError();
     return;
   }

   refs.favoritesGallery.innerHTML = '';
   refs.favoritesGallery.appendChild(refs.galleryItem);

 } catch (error) {
   console.error('Error creating gallery from local storage:', error);
 } finally {
   console.log();
refreshGallery();
 }
}


// Refresh the gallery by updating the displayed items
async function refreshGallery() {
   try {
     const itemsFromLS = JSON.parse(localStorage.getItem('exersiseFavorites'));
     console.log(itemsFromLS)

       if (!Array.isArray(itemsFromLS) || itemsFromLS.length === 0) {
         console.log('Array in local storage is empty or does not exist.');
         apiIsiToastError();
           return;
       }

       refs.favoritesGallery.innerHTML = '';

       itemsFromLS.forEach(item => {
       const markup = createMarkupFavorites(item);

       refs.favoritesGallery.insertAdjacentHTML('afterbegin', markup);
       });

       console.log('Gallery refreshed successfully.');
   } catch (error) {
     console.error('Error refreshing gallery:', error);
     apiIsiToastError();
   }
}

// Remove an exersise from an array stored in local storage

// refs.onRemoveBtn.addEventListener('click', removeObjectFromLocalStorage);

async function removeObjectFromLocalStorage(idToRemove) {
   try {
       let itemsFromLS = JSON.parse(localStorage.getItem('exersiseFavorites'));

       if (!Array.isArray(itemsFromLS) || itemsFromLS.length === 0) {
           console.log('Array in local storage is empty or does not exist.');
           return;
       }
       itemsFromLS = itemsFromLS.filter(item => item._id !== idToRemove);
       localStorage.setItem('exersiseFavorites', JSON.stringify(itemsFromLS));
       console.log(`Object with ID ${idToRemove} removed from local storage.`);
       await refreshGallery();
   } catch (error) {
       console.error('Error removing object from local storage:', error);
   }
}



// refs.onStartBtn.addEventListener('click', handleStartButtonClick)

function handleStartButtonClick(evt) {
   if (!evt.target.dataset.id) {
       return
   }
   // showLoader(refs.loaderModal);
   const exerciseId = evt.target.dataset.id;
 hide(refs.favoritesGallery);
   createModalMenu(exerciseId);
}

// Creating a plug when the LS is empty

const markupMessageBlock =
 `<div class="favorites-message-block">
     <div class="plug-icon">
       <img class="favorites-box-img" src="./img/icons/dumbbell.png"
alt="dumbbell" />
     </div >
     <div class="favorites-box-paragraf">
         It appears that you have not added any exercises to your
favorites yet.To get started, you can add exercises that you like to
your favorites for easier access in the future.
     </div>
   </div>`;


function showMessageBlock() {
 refs.messageBlock.innerHTML = markupMessageBlock;
}


function createMarkupFavorites(itemsFromLS) {
 markupArray.innerHTML = itemsFromLS
   .map(
     ({ _id, bodyPart, name, target, burnedCalories, time }) => {
       return `
       <li class="favorites-gallery-item" data-id="${_id}" id="card-${_id}">
          <div class="favorites-item">
             <div class="favorites-item-wrapper">
               <span class="workout">Workout</span>
               <button type="button" data-id=${_id}
data-favorites-remove class="favorites-remove-btn"></button>
                 <svg class="favorites-remove-icon" width="12" height="13">
                   <use href="./img/icons/symbol-defs.svg#icon-basket"></use>
                 </svg>
               </button>
               <button class="favorites-start" type="submit"
data-id="${_id} data-modal-open>
                 <span>Start</span>
                 <svg class="favorites-start-icon" width="14" height="14">
                   <use
href="./img/icons/symbol-defs.svg#icon-arrow-top-right"></use>
                 </svg>
               </button>
             </div>
             <div class="favorites-item-info">
               <div class="favorites-man-icon">
                 <svg class="icon-Man" width="14" height="14">
                   <use href="./img/icons/symbol-defs.svg#icon-Man""></use>
                 </svg>
                 <h3
class="favorites-item-title">${name.charAt(0).toUpperCase() +
name.slice(1)}</h3>
               </div>
             </div>
             <div class="favorites-item-info-wrapper">
               <ul class="favorites-gallery-info">
                 <li class="favorites-gallery-info-item">Burned
calories: <span class="favorites-item-value">${burnedCalories} /
${time} min</span></li>
                 <li class="favorites-gallery-info-item">Body part:
<span class="favorites-item-value">${bodyPart.charAt(0).toUpperCase()
+ bodyPart.slice(1)}</span></li>
                 <li class="favorites-gallery-info-item">Target:
<span class="favorites-item-value">${target.charAt(0).toUpperCase() +
target.slice(1)}</span></li>
               </ul>
             </div>
          </div>
       </li>`})
   .join('');
 refs.messageBlock.innerHTML = '';
 refs.messageBlock.prepend(markupArray);
}

//  Scroll for favorites-gallery

function showScroll() {
const scrollElement = document.getElementById('.favorites-gallery');
element.scrollIntoView({
 behavior: 'smooth',
 block: 'start',
 inline: 'start'
});
 if (storedArray.length > 8)
   refs.favoritesGallery.scrollTo({
     top: refs.favoritesGallery.scrollHeight,
     behavior: 'smooth',
   }
)}
function hideScroll() {
        favoritesGallery.classList.remove('scroll-on');
        favoritesGallery.classList.remove('favorites-scroll');
        document.querySelector('.favorites-gallery').classList.remove('favorites-scroll');
}










// import axios from 'axios';
// import { refs } from './templates/refs.js';
// // import { handleClickOnCardStart } from './exercises-details.js';
// // import { onClickCardContent } from './modal-menu.js';


// // Getting items from the LS
// const LS_KEY_FAVORITES = 'favorites';
// const itemsFromLS = JSON.parse(localStorage.getItem(LS_KEY_FAVORITES));

// // Creating a plug when the LS is empty
// const markupMessageBlock =
//   '<div class="favorites-message-block"></div> <div class="plug-icon"><img class="favorites-box-img" src="./img/icons/dumbbell.png" alt="dumbbell"/></div><div class="favorites-box-paragraf"></div>It appears that you have not added any exercises to your  favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.</div></div>';

// function showMessageBlock() {
//   refs.messageBlock.innerHTML = markupMessageBlock;
// }


// const test = document.querySelector('.favorites-btn');      

// test.addEventListener('click', handleClickOnCardStart);
// console.log(test);
// console.log(handleClickOnCardStart());


// // Creating gallery of favorite exersises

// if (!itemsFromLS) {
//   showMessageBlock();

// } else if (!itemsFromLS || !Array.isArray(itemsFromLS) || itemsFromLS.length === 0) {
//   showMessageBlock();
//   console.log('No items found in local storage or data is invalid.');

// } else if (itemsFromLS.length > 0) {
//   createGalleryFromLS(itemsFromLS);
  
//   refs.onRemoveBtn.forEach(button => {button.addEventListener('click', removeFromLS)});      
//   //  chooseButtonForModal();
//   // addRemoveScroll();
// }
    
 
// function createMarkupFavorites(data) {
//   markupArray.innerHTML = data
//     .map(
//       ({ _id, bodyPart, name, target, burnedCalories, time }) => {
//         return `
//         <li class="favorites-gallery-item" data-id="${_id}" id="card-${_id}">
//            <div class="favorites-item">
//               <div class="favorites-item-wrapper">
//                 <span class="workout">WORKOUT</span>
//                 <button type="button" data-id=${_id} data-favorites-remove class="favorites-remove-btn"></button>
//                   <svg class="favorites-remove-icon" width="12" height="13">
//                     <use href="../img/icons/symbole-defs.svg#icon-basket"></use>
//                   </svg>
//                 </button>
//                 <a href="/src/partials/modal-menu.html" class="favorites-start" data-id="${_id} data-modal-open"></a> 
//                   <span>Start</span>
//                   <svg class="favorites-start-icon" width="14" height="14">
//                     <use href="../img/icons/symbole-defs.svg#icon-line"></use>
//                   </svg>
//                 </a>
//               </div>
//               <div class="favorites-item-info">
//                 <div class="favorites-man-icon">
//                   <svg class="icon-Man" width="14" height="14">
//                     <use href="../img/icons/symbol-defs.svg#icon-Man""></use>
//                   </svg>
//                   <h3 class="favorites-item-title">${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
//                 </div>
//               </div>
//               <div class="favorites-item-info-wrapper">
//                 <ul class="favorites-gallery-info">
//                   <li class="favorites-gallery-info-item">Burned calories: <span class="favorites-item-value">${burnedCalories} / ${time} min</span></li>
//                   <li class="favorites-gallery-info-item">Body part: <span class="favorites-item-value">${bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}</span></li>
//                   <li class="favorites-gallery-info-item">Target: <span class="favorites-item-value">${target.charAt(0).toUpperCase() + target.slice(1)}</span></li>
//                 </ul>
//               </div>
//            </div>
//         </li>`})
//     .join('');
//   refs.messageBlock.innerHTML = '';
//   refs.messageBlock.prepend(markupArray);
// }
  

// // Removing an exersise from the array stored in LS

// async function removeObjectFromLocalStorage(idToRemove) {
//   try {
//     const itemsFromLS = await JSON.parse(localStorage.getItem(LS_KEY_FAVORITES));

//         if (!Array.isArray(itemsFromLS) || itemsFromLS.length === 0) {
//           console.log('Array in local storage is empty or does not exist.');
//           return;
//         }
    
//         itemsFromLS = itemsFromLS.filter(item => item._id !== idToRemove);
       
//         localStorage.setItem(LS_KEY_FAVORITES, JSON.stringify(itemsFromLS));
//         console.log(`Object with ID ${idToRemove} removed from local storage.`);
        
//         refs.onRemoveBtn.removeEventListener('click', removeObjectFromLocalStorage);      
             
//         await refreshGallery();
    
//     storedArray = storedArray.filter(item => item._id !== idToRemove);
//     localStorage.setItem(LS_KEY_FAVORITES, JSON.stringify(storedArray));
//     console.log(`Object with ID ${idToRemove} removed from local storage.`);
//     await refreshGallery();
//   } catch (error) {
//     console.error('Error removing object from local storage:', error);
//   }
// }






// // Scroll an element into view
// // function showScroll() {
// // const scrollElement = document.getElementById('targetElementId');
// // element.scrollIntoView({
// //   behavior: 'smooth', // Optional: 'auto' or 'smooth'
// //   block: 'start',     // Optional: 'start', 'center', 'end', or 'nearest'
// //   inline: 'start'     // Optional: 'start', 'center', 'end', or 'nearest'
// // });
// //   if ()
// //     refs.favoritesGallery.scrollTo({
// //       top: refs.favoritesGallery.scrollHeight,
// //       behavior: 'smooth',
// //     }
// // }
// // function hideScrollForFavorites() {
// //   favoritesGallery.classList.remove('scroll-on');
// //   favoritesGallery.classList.remove('padding-for-scroll-list');
// //   document
// //     .querySelector('.favor-wrapper')
// //     .classList.remove('padding-for-scroll-container');
// // }
  
// /// Create the Favorites page



// async function createGalleryFromLS(event) {
//   event.preventDefault();
  
//   refs.favoritesGallery.innerHTML = '';
//   refs.favoritesMessage.style.display = 'none';
  
//   try {
//     const itemsFromLS = await JSON.parse(localStorage.getItem(LS_KEY_FAVORITES));
    

//     refs.favoritesGallery.insertAdjacentHTML("afterbegin", createMarkupFavorites(itemsFromLS));
    
//     if (itemsFromLS > 9) {
//       scrollBy(); 
//     }
//     refs.onRemoveBtn.forEach.addEventListener('click', removeObjectFromLocalStorage);      
//     refs.onStartBtn.forEach.addEventListener('click', handleStartButtonClick);

//     } catch (error) {
//       console.error('Error creating gallery from local storage:', error);
//     } finally {
//       console.log();
//       await refreshGallery();
//     }
//   }


//     // Refresh the gallery by updating the displayed items
// async function refreshGallery() {
//   refs.favoritesMessage.style.display = 'none';
    
//   try {
//     const itemsFromLS = await JSON.parse(localStorage.getItem(LS_KEY_FAVORITES));
        
//     if (!Array.isArray(itemsFromLS) || itemsFromLS.length === 0) {
//       console.log('Array in local storage is empty or does not exist.');
//       refs.favoritesMessage.style.display = 'block';

//     }
       
//     refs.favoritesGallery.innerHTML = '';

//     itemsFromLS.forEach(itemsFromLS => {
//       refs.favoritesGallery.insertAdjacentHTML('afterbegin', createMarkupFavorites(itemsFromLS));
        
//       refs.onRemoveBtn.forEach.addEventListener('click', removeObjectFromLocalStorage);
//       refs.onStartBtn.forEach.addEventListener('click', handleStartButtonClick);
//     });
//    } catch (error) {
//       console.error('Error creating gallery from local storage:', error);
//     } finally {
//       console.log();
//       await refreshGallery();
//     }
// }
//   //====================================
// // const LS_KEY_QUOTE = 'quoteResponse';
// // const quoteFromLS = JSON.parse(localStorage.getItem(LS_KEY_QUOTE));
// // console.log(quoteFromLS);

// // function displayQuoteOnPage(quoteData) {
// //   const quoteText = document.querySelector('.quote-text');
// //   const quoteAuthor = document.querySelector('.quote-author');
// //   quoteText.textContent = quoteData.quote;
// //   quoteAuthor.textContent = quoteData.author;
// // }

// // // Favorites gallery

// // const BASE_URL_FAVORITES = 'https://energyflow.b.goit.study/api/exersises/';

// // async function searchExerciseByID({ id}) {
// //   const response = await axios.get(
// //     `${BASE_URL_FAVORITES}`,
// //     {
// //       params: {
// //         _id: id,
// //       },
// //     }
// //   );
// //   return response.data;
// // }


// // /// Create the Favorites page

// // const LS_KEY_FAVORITES = 'favorites';


// // async function createGalleryFromLS(event) {
// //   event.preventDefault();
  
// //   refs.favoritesGallery.innerHTML = '';
// //   refs.favoritesMessage.style.display = 'none';
  
// //   try {
// //     const itemsFromLS = await JSON.parse(localStorage.getItem(LS_KEY_FAVORITES));
// //     if (
// //       !itemsFromLS ||
// //       !Array.isArray(itemsFromLS) ||
// //       itemsFromLS.length === 0
// //     ) {
// //       console.log('No items found in local storage or data is invalid.');
// //       refs.favoritesMessage.style.display = 'block';
// //     }

// //     refs.favoritesGallery.insertAdjacentHTML("afterbegin", createMarkupFavorites(itemsFromLS));
    
// //     if (itemsFromLS > 9) {
// //       scrollBy();
// //     }
// //     refs.onRemoveBtn.forEach.addEventListener('click', removeObjectFromLocalStorage);
// //     refs.onStartBtn.forEach.addEventListener('click', handleStartButtonClick);

// //     } catch (error) {
// //       console.error('Error creating gallery from local storage:', error);
// //     } finally {
// //       console.log();
// //       await refreshGallery();
// //     }
// //   }


// //     // Refresh the gallery by updating the displayed items
// //   async function refreshGallery() {
// //     refs.favoritesMessage.style.display = 'none';
    
// //       try {
// //         const itemsFromLS = await JSON.parse(localStorage.getItem(LS_KEY_FAVORITES));
        
// //         if (!Array.isArray(itemsFromLS) || itemsFromLS.length === 0) {
// //           console.log('Array in local storage is empty or does not exist.');
// //           refs.favoritesMessage.style.display = 'block';
// //       }
       
// //       refs.favoritesGallery.innerHTML = '';

// //       itemsFromLS.forEach(itemsFromLS => {
// //         refs.favoritesGallery.insertAdjacentHTML('afterbegin', createMarkupFavorites(itemsFromLS));
        
// //         refs.onRemoveBtn.forEach.addEventListener('click', removeObjectFromLocalStorage);
// //         refs.onStartBtn.forEach.addEventListener('click', handleStartButtonClick);
// //       });

// //       console.log('Gallery refreshed successfully.');
// //     } catch (error) {
// //       console.error('Error refreshing gallery:', error);
// //     }
// //   }

// //     // Scroll for container favorites-gallery for desktop and tablet
// //     function scrollBy() {
// //       refs.favoritesGallery.scrollTo({
// //         top: refs.favoritesGallery.scrollHeight,
// //         behavior: 'smooth',
// //       });
// //     }
  

// // // Remove an exersise from an array stored in local storage

// // async function removeObjectFromLocalStorage(idToRemove) {
// //   try {
// //     const itemsFromLS = await JSON.parse(localStorage.getItem(LS_KEY_FAVORITES));

// //         if (!Array.isArray(itemsFromLS) || itemsFromLS.length === 0) {
// //           console.log('Array in local storage is empty or does not exist.');
// //           return;
// //         }
    
// //         itemsFromLS = itemsFromLS.filter(item => item._id !== idToRemove);
       
// //         localStorage.setItem(LS_KEY_FAVORITES, JSON.stringify(itemsFromLS));
// //         console.log(`Object with ID ${idToRemove} removed from local storage.`);
        
// //         refs.onRemoveBtn.removeEventListener('click', removeObjectFromLocalStorage);
             
// //         await refreshGallery();
    
// //     storedArray = storedArray.filter(item => item._id !== idToRemove);
// //     localStorage.setItem(LS_KEY_FAVORITES, JSON.stringify(storedArray));
// //     console.log(`Object with ID ${idToRemove} removed from local storage.`);
// //     await refreshGallery();
// //   } catch (error) {
// //     console.error('Error removing object from local storage:', error);
// //   }
// // }


// //===================================================================================

// // Add to Favorites after click on button 'Add to Favotites' at Modal

// //  refs.addToFavoritesBtn.addEventListener('click', addItemToFavorites);

// //   async function addItemToFavorites(event) {
// //     event.preventDefault();

// //     const element = event.target.closest(".ex-add-btn");
// //     const elementId = element.dataset.id;
// //       try {
// //         const exercise = await searchExerciseByID(elementId);
// //         let favorites = JSON.parse(localStorage.getItem(LS_KEY_FAVORITES)) || [];
// //         const isDuplicate = favorites.some(favorite => favorite._id === exercise._id);

// //         if (!isDuplicate) {
// //            favorites.push(exercise);
// //            localStorage.setItem(LS_KEY_FAVORITES, JSON.stringify(favorites));
// //            await refreshGallery();
// //            console.log("Exercise added to favorites:", exercise);
// //         } else {
// //            console.log("Exercise is already in favorites.");
// //         }
// //     } catch (error) {
// //       console.error("Error adding exercise to favorites:", error);
// //       apiIsiToastError();
// //     }
// // }



// // After click  "Start" arrow
// // function handleStartButtonClick(event) {
// //   event.preventDefault();
// //   // Open the modal
// //   // onClickCardContent();
        
// //   refs.onStartBtn.removeEventListener('click', handleStartButtonClick);
// // }

// // function createMarkupFavorites({ _id, bodyPart, name, target, burnedCalories, time }) {
// //       let isAdded = false;
// //       const favorites = localStorage.getItem(LS_KEY_FAVORITES);

// //       if (favorites) {
// //         const favoritesFromLS = JSON.parse(favorites);
// //         isAdded = favoritesFromLS.some(item => item._id === _id);
// //       }
// //       return `
// //         <li class="favorites-gallery-item">
// //             <span class="workout">workout</span>
// //             <a class="favorites-remove" href="#">
// //                 <button class="favorites-remove-btn" type="button">
// //                     <img class="favorites-remove-icon" src="../img/icons/symbole-defs.svg#icon-basket" alt="icon-basket"/>
// //                 </button>
// //             </a>
// //             <a class="favorites-start" href="#">
// //                 <button class="favorites-start-btn" type="button">Start
// //                     <img class="favorites-start-icon" src="../img/icons/symbole-defs.svg#icon-line" alt="start-icon"/>
// //                 </button>
// //             </a>
// //             <img class="favorites-man-icon" src="../img/icons/symbol-defs.svg#icon-Man" alt="man-icon"/>
// //             <h3 class="favorites-item-title">${name}</h3>
// //             <ul class="favorites-gallery-info">
// //                 <li class="favorites-gallery-info-item">Burned calories: <span class="descr-span">${burnedCalories} / ${time} min</span></li>
// //                 <li class="favorites-gallery-info-item">Body part: <span class="descr-span">${bodyPart}</span></li>
// //                 <li class="favorites-gallery-info-item">Target: <span class="descr-span">${target}</span></li>
// //             </ul>
// //         </li>`;
// //     }

// // function createMarkupFavorites(data) {
// //   const markup = data.map(
// //     ({ _id, bodyPart, name, target, burnedCalories, time }) => `
// //         <li class="favorites-gallery-item" data-id="${_id}" id="card-${_id}">
// //            <div class="favorites-item">
// //               <div class="favorites-item-wrapper">
// //                 <span class="workout">WORKOUT</span>
// //                 <button class="favorites-remove-btn">
// //                   <svg class="favorites-remove-icon" width="12" height="13">
// //                     <use href="../img/icons/symbole-defs.svg#icon-basket"></use>
// //                   </svg>
// //                 </button>
// //                 <a class="favorites-start" href="" data-id="${_id}">
// //                   <span>Start</span>
// //                   <svg class="favorites-start-icon" width="14" height="14">
// //                     <use href="../img/icons/symbole-defs.svg#icon-line"></use>
// //                   </svg>
// //                 </a>
// //               </div>
// //               <div class="favorites-item-info">
// //                 <div class="favorites-man-icon">
// //                   <svg class="icon-Man" width="14" height="14">
// //                     <use href="../img/icons/symbol-defs.svg#icon-Man""></use>
// //                   </svg>
        //          // <h3 class="favorites-item-title">${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
// //                 </div>
// //               </div>
// //               <div class="favorites-item-info-wrapper">
// //                 <ul class="favorites-gallery-info">
// //                   <li class="favorites-gallery-info-item">Burned calories: <span class="descr-span">${burnedCalories} / ${time} min</span></li>
// //                   <li class="favorites-gallery-info-item">Body part: <span class="descr-span">${bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}</span></li>
// //                   <li class="favorites-gallery-info-item">Target: <span class="descr-span">${target.charAt(0).toUpperCase() + target.slice(1)}</span></li>
// //                 </ul>
// //               </div>
// //            </div>
// //         </li>`)
// //     .join('');
// //   }


  
