// Define consts on first run
const localStorage = window.localStorage;

// Number of images we want to retrive  :
const numberOfImages = 6;

// incase refresh page
if(localStorage.getItem('currentImage')){
    console.log('Current image is ' + localStorage.getItem('currentImage'));
}else{
    localStorage.setItem('currentImage', 0);
}
// First time run or refreshed page
if(localStorage.getItem('images')){
    // Run if there is images on localstorage
    showImage();
}else{
    // Run this if the user hasnt choosen mockup user
    selectUser();
    console.log('You have nothing on localStorage');
}

// Like the image functions
function likeTheImage(){
    // get currentImage number:
    const currentImage = parseInt(localStorage.getItem('currentImage'));

    // Code to save the image to local storage and update currentImage
    if(localStorage.getItem('likedImages')){
        // get the list from localstorage:
        const likedImages = JSON.parse(localStorage.getItem('likedImages'));
        // Put liked image into likedImages:
        likedImages.push(currentImage);
        // Update liked images list on localstorage
        localStorage.setItem('likedImages', JSON.stringify(likedImages));

        console.log(likedImages);
    }else{
        const likedImages = [];
        likedImages.push(currentImage);
        // Update liked images list on localstorage
        localStorage.setItem('likedImages', JSON.stringify(likedImages));
        console.log('There is no LikedImages');
        console.log(localStorage.getItem('likedImages'));
    };
    skipTheImage();
    console.log('You have pushed like button');
}


// Function to skip the image to local storage and update currentImage
function skipTheImage(){
    // Get currentimage and add 1 to it
    currentImage = parseInt(localStorage.getItem('currentImage'));
    currentImage ++;

    // Save the current to localStorage
    localStorage.setItem('currentImage', currentImage);

    // Show the next image:
    showImage();
}

// Rest currentNumber to 0;
function resetCurrentImage(){
    localStorage.setItem("currentImage", 0);
    console.log("Resetted current image to 0");
}

// Create like & skip button
function createLikeButton(){
    // Create the like button element
    const likeButton = document.createElement("BUTTON");
    likeButton.classList.add('likeButton');
    likeButton.addEventListener('click', likeTheImage);
    likeButton.innerHTML = "Like";

    // Create the skip button element
    const skipButton = document.createElement("BUTTON");
    skipButton.classList.add('skipButton');
    skipButton.addEventListener('click', skipTheImage);
    skipButton.innerHTML = "Skip";

    // append the button to button container
    const buttonContainer = document.querySelector(".buttonContainer");
    buttonContainer.append(likeButton, skipButton);

}

// Create container for like and skip button
function createButtonContainer(){
    // Create element
    const buttonContainer = document.createElement("DIV");
    buttonContainer.classList.add('buttonContainer');

    // get the main container and append button container
    const containerDiv = document.querySelector('.container');
    containerDiv.append(buttonContainer);
}

// This function shows the actual image
function showImage(){

    // Refresh page and build from scratch:
    clearBody();

    // Get Current image number
    let currentImage = parseInt(localStorage.getItem('currentImage'));


    // retrive the images from localStorage
    const images = JSON.parse(localStorage.images);

    // if current image number is the last image, reset to 0
    let maxNumber = images.length;
    if(currentImage < maxNumber){
        console.log('Current image is smaller than length(number) of images');
    }else{
        resetCurrentImage();
        currentImage = parseInt(localStorage.getItem('currentImage'));
    }

    // Create the imageElement and assign class
    const image = document.createElement('img');
    image.classList.add('image');

    // Set the source
    image.src = images[currentImage].picture.large;

    // Create containerDiv
    const containerDiv = document.createElement('DIV');
    containerDiv.classList.add('container');

    // Create name element
    const nameTag = document.createElement('p');
    nameTag.classList.add('nameTag');
    nameTag.innerHTML = images[currentImage].name.first + ' ' + images[currentImage].name.last;

    // Append the image and name tag
    containerDiv.append(image,nameTag);

    // Append the container to body
    document.body.append(containerDiv);

    // Create a like button and skip button code comes here
    createButtonContainer();
    createLikeButton();


    // Create a clear storage button and append
    createClearStorageButton();
}


// Create clear storage button
function createClearStorageButton(){
    //Clear the storage button
    const clearStorageBtn = document.createElement('BUTTON');
    clearStorageBtn.innerHTML = "Clear storage";
    clearStorageBtn.addEventListener('click', clearStorage);

    // Create container and append to body
    const containerDiv = document.querySelector('.container');
    containerDiv.append(clearStorageBtn);
}

// Show localStorage to check:
function showLocal(){
    console.log(JSON.parse(localStorage.images));
}

// User wants to clear storage:
function clearStorage(){

    // Clear the actual localStorage
    localStorage.clear();

    // Clear the console
    console.clear();

    // Console log notice
    console.log("You have cleared your localstorage");

    // Clear the body child elements
    clearBody();

    // Display the select mockup user from start
    selectUser();
}

// Clear body child elements
function clearBody(){
    document.body.innerHTML = "";
}

// Get random users via API
function getRandUserList(fetchUrl){
    // Get the list. This will only run on select user function
    async function getList() {
        // Fetch data from API
        const response = await fetch(fetchUrl);
        // Make the response to Json
        const data = await response.json();
        // Stringify the the fetched data results and save to localStorage
        localStorage.setItem('images', JSON.stringify(data.results));
        // Show the image
        showImage();
        // Console log the localStorage
        showLocal();
    };
    // Call the actual function
    getList();
}

// When which userprofile has been choosen
function selectedUser(selectedUser){

    // Decide which url to run on which user has been choosen
    let fetchUrl = "";
    switch(selectedUser) {
        case 'females':
            console.log("You have choosen search females");
            fetchUrl = 'https://randomuser.me/api/?gender=female&nat=DK&results=' + numberOfImages+ '&inc=name,picture';
            break;
        case 'males':
            fetchUrl = 'https://randomuser.me/api/?gender=male&nat=DK&results=' + numberOfImages+ '&inc=name,picture';
            console.log("You have choosen search males");
            break;
        case 'both':
        fetchUrl = 'https://randomuser.me/api/?nat=DK&results=' + numberOfImages+ '&inc=name,picture';
            console.log("You have choosen search both");
            break;
        default:
            console.log("Select default has been triggered, this shouldn't be possible");
            break;
    }
    // Run the actual fetch function
    getRandUserList(fetchUrl);
}
// First run, create and append select user profile buttons
function selectUser(){

    // Create select userprofile buttons and addeventlisteners
    const searchFemalesBtn = document.createElement('BUTTON');
    searchFemalesBtn.innerHTML = "User searching females";
    searchFemalesBtn.addEventListener('click', function(){ selectedUser('females'); });

    const searchMalesBtn = document.createElement('BUTTON');
    searchMalesBtn.innerHTML = "User searching males";
    searchMalesBtn.addEventListener('click', function(){ selectedUser('males'); });

    const searchBoth = document.createElement('BUTTON');
    searchBoth.innerHTML = "User searching both";
    searchBoth.addEventListener('click', function(){ selectedUser('both'); });


    // Create button container and append the user and clear buttons
    const containerDiv = document.createElement('DIV');
    containerDiv.classList.add('container');
    containerDiv.append(searchFemalesBtn, searchMalesBtn, searchBoth);

    // Append the button container
    document.body.append(containerDiv);
}
