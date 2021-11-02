// Define localstorage
const localStorage = window.localStorage;
if(localStorage.getItem('mylist')){
    const myList = localStorage.getItem('mylist');
    console.log('From localstorage: ', JSON.parse(myList));
}else{
    console.log('You have nothing on localStorage');
}

// User wants to clear storage:
function clearStorage(){
    localStorage.clear();
    console.log("You have clear your localstorage");
    clearBody();
    selectUser();
}

// Clear body child elements to update
function clearBody(){
    document.body.innerHTML = "";
}

// Get random users via API
function getRandUserList(fetchUrl){
    clearBody();
    async function getList() {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        localStorage.setItem('mylist', JSON.stringify(data));
        const mylist = localStorage.getItem('mylist');
        console.log('From localstorage: ', JSON.parse(mylist));
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

    const clearStorageBtn = document.createElement('BUTTON');
    clearStorageBtn.innerHTML = "Clear storageButton";
    clearStorageBtn.addEventListener('click', clearStorage);

    // Create button container and append the select user buttons
    const buttonContainer = document.createElement('DIV');
    buttonContainer.classList.add('selectUserContainer');
    buttonContainer.append(searchFemalesBtn, searchMalesBtn, searchBoth, clearStorageBtn);

    // Append the select user buttons

    document.body.append(buttonContainer);
}

// This is probably a refresh of the page, run select user function:
selectUser();
