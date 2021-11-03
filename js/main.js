// Define localstorage
const localStorage = window.localStorage;
if(localStorage.getItem('images')){
    // Run if there is images on localstorage
    showLocal();
    createClearStorageButton();
}else{
    selectUser();
    console.log('You have nothing on localStorage');
}
// Create clear storage button
function createClearStorageButton(){
    //Clear the storage button
    const clearStorageBtn = document.createElement('BUTTON');
    clearStorageBtn.innerHTML = "Clear storage";
    clearStorageBtn.addEventListener('click', clearStorage);

    // Create container and append to body
    const containerDiv = document.createElement('DIV');
    containerDiv.classList.add('container');
    containerDiv.append(clearStorageBtn);

    document.body.append(containerDiv);
}

// Show localStorage:
function showLocal(){
    console.log(localStorage);
}

// User wants to clear storage:
function clearStorage(){
    localStorage.clear();

    console.clear();
    console.log("You have clear your localstorage");
    clearBody();
    selectUser();
}

// Clear body child elements
function clearBody(){
    document.body.innerHTML = "";
}

// Get random users via API
function getRandUserList(fetchUrl){
    clearBody();
    async function getList() {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        localStorage.setItem('images', JSON.stringify(data.results));
        const images = localStorage.getItem('images');
        console.log('From localstorage: ', JSON.parse(images));
    };
    // Call the actual function
    getList();
}

// When which userprofile has been choosen
function selectedUser(selectedUser){
    // functions to run on which user has been choosen
    let fetchUrl = "";
    switch(selectedUser) {
        case 'females':
            console.log("You have choosen search females");
            fetchUrl = "https://randomuser.me/api/?gender=female&nat=DK&results=24&inc=name,picture";
            break;
        case 'males':
            fetchUrl = "https://randomuser.me/api/?gender=male&nat=DK&results=24&inc=name,picture";
            console.log("You have choosen search males");
            break;
        case 'both':
        fetchUrl = "https://randomuser.me/api/?nat=DK&results=24&inc=name,picture";
            console.log("You have choosen search both");
            break;
        default:
            console.log("Select default has been triggered, this shouldn't be possible");
            break;
    }

    getRandUserList(fetchUrl);
    createClearStorageButton();
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
