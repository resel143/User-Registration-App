// global variables 
// input 
const form = document.getElementById('userInput');
const firstName = document.querySelector('#first_name');
const lastName = document.querySelector('#last_name');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const deleteUserBtn = document.querySelector('#deleteUsers');
// user output List 

const userList = document.querySelector('#userList');
const searchUser = document.querySelector('#searchUser');
loadEventListners();
function loadEventListners(){
    // Load Users from local storage 
    document.addEventListener('DOMContentLoaded',getUsers);
    // Add user event 
    form.addEventListener('submit',addUser);
    // delete user event 
    userList.addEventListener('click',deleteUser);
    // delete all user event 
    deleteUserBtn.addEventListener('click',deleteAllUsers);
    // filter users event 
    searchUser.addEventListener('keyup',filterUser);
}
// get user from local storage and display 

function getUsers(){
    let Users;
    if(localStorage.getItem('Users')===null){
        Users=[];
    }else{
        Users = JSON.parse(localStorage.getItem('Users'));
    }

    Users.forEach(function(user) {
        // create list item element 
        const li = document.createElement('li');
        // add a clss to the li 
        li.className = 'collection-item avatar';
        li.setAttribute('id','new-user');
        // console.log(li);
        // create text content 
        const userIcon = document.createElement('i');
        userIcon.className = 'medium material-icons circle green';

        userIcon.innerHTML = 'account_circle';

        li.appendChild(userIcon);
        
        // user infor 
        const userInfo = document.createElement('ul');
        // add class to ul 
        userInfo.className = 'user-info';
        li.appendChild(userInfo);

        // user id 
        const userId = document.createElement('li');
        // addclass
        userId.className = 'user-id';
        // add text to li(user-id)
        userId.innerHTML = 'User Id';
        // append li (user id) element to li element 
        userInfo.appendChild(userId);
// add full name
        const userFullName = document.createElement('li');

        
         
        let fullName = `${user[0].firstName} ${user[0].lastName}`;

        userFullName.appendChild(document.createTextNode(`${fullName}`));
        userInfo.appendChild(userFullName);
        
        
        // add emial to userInfo

        const userEMail = document.createElement('li');

        
         
        // userEMail = `${firstName.value} ${email.value}`;

        userEMail.appendChild(document.createTextNode(`${user[0].email}`));


        userInfo.appendChild(userEMail);
        
        //delete icon 

        // create icon 

        // create a new link element 
        const link = document.createElement('a');

        link.className = 'secondary-content btn-floating btn-small waves-effect waves-light red delete-user';

        link.innerHTML= '<i class="material-icons">remove</i>';

        // append the link item to the li 

        li.appendChild(link);
        
        
        
        console.log(li);

        userList.appendChild(li);
    });
}

// add user
function addUser(e){
    // prevent default behaviour of the form 
    e.preventDefault(); // this does not reload page
    // condition usr storage 
    if(firstName.value===''|| lastName.value ===''){
        alert('Insert FirstName and LastName');
    }else if(password.value ===''){
        alert('Insert Password!');
    }else if(email.value===''){
        alert('Add Email!');
    }else{
        alert('User Successfully added!!');
        // create list item element 
        const li = document.createElement('li');
        // add a clss to the li 
        li.className = 'collection-item avatar';
        li.setAttribute('id','new-user');
        // console.log(li);
        // create text content 
        const userIcon = document.createElement('i');
        userIcon.className = 'medium material-icons circle green';

        userIcon.innerHTML = 'account_circle';

        li.appendChild(userIcon);
        
        // user infor 
        const userInfo = document.createElement('ul');
        // add class to ul 
        userInfo.className = 'user-info';
        li.appendChild(userInfo);

        // user id 
        const userId = document.createElement('li');
        // addclass
        userId.className = 'user-id';
        // add text to li(user-id)
        userId.innerHTML = 'User Id';
        // append li (user id) element to li element 
        userInfo.appendChild(userId);
// add full name
        const userFullName = document.createElement('li');

        
         
        let fullName = `${firstName.value} ${lastName.value}`;

        userFullName.appendChild(document.createTextNode(`${fullName}`));
        userInfo.appendChild(userFullName);
        
        
        // add emial to userInfo

        const userEMail = document.createElement('li');

        
         
        // userEMail = `${firstName.value} ${email.value}`;

        userEMail.appendChild(document.createTextNode(`${email.value}`));


        userInfo.appendChild(userEMail);
        
        //delete icon 

        // create icon 

        // create a new link element 
        const link = document.createElement('a');

        link.className = 'secondary-content btn-floating btn-small waves-effect waves-light red delete-user';

        link.innerHTML= '<i class="material-icons">remove</i>';

        // append the link item to the li 

        li.appendChild(link);
        
        
        
        console.log(li);

        userList.appendChild(li);
    }
// store user infor 
    const storeUserInfo=[
        {
            firstName: firstName.value,
            lastName: lastName.value,
            password:password.value,
            eMail: email.value,
        }
    ];
    storeUsersInLocalStorage(storeUserInfo);


    // // clearing values 
    //  firstName.value ="";
    //  lastName.value="";
    //  password.value="";
    //  email.value="";

    //  second method for clearing values 

    const clearInputs={
        inp_1:firstName,
        inp_2: lastName,
        inp_3: password,
        inp_4: email,  
    };

    for(let inp in clearInputs){
        clearInputs[inp].value ="";
    }

}


function removeUserLocalStorage(storedUser){
    console.log(storedUser);
    let Users;
    if(localStorage.getItem('Users')===null){
        Users=[];
    }else{
        Users=JSON.parse(localStorage.getItem('Users'));
    }
    Users.forEach(function(user,index) {
        let fullName = user[0].firstName + " "+ user[0].lastName;
        console.log(fullName);

        if(storedUser.children[1].children[1].textContent===fullName){
            Users.splice(index,1);
        }
    });

    localStorage.setItem('Users',JSON.stringify(Users));
}


// delete user 

function deleteUser(e){
   if(e.target.parentElement.classList.contains('delete-user')){
    //    console.log(e.target);
    if(confirm('Delete User'))
    e.target.parentElement.parentElement.remove();
    // delete user from local storage 
    removeUserLocalStorage(e.target.parentElement.parentElement);
   }
}

// delete all users 

function deleteAllUsers(){
    if(confirm('Delete All Users?')){
        while(userList.firstChild){
            userList.removeChild(userList.firstChild);
        }
    // Delete all user from Local Storage 
    deleteAllUserFromLocalStorage();
    }
}

function deleteAllUserFromLocalStorage(){
    localStorage.clear();
}


// Store users Info into Local Storage 

function storeUsersInLocalStorage(user){
    let Users;
    if(localStorage.getItem('Users')===null){
        Users =[];
    }else{
        Users=JSON.parse(localStorage.getItem('Users'));
    }

    Users.push(user);

    localStorage.setItem('Users', JSON.stringify(Users));
}


// filter Users

function filterUser(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(user){
        const item = user.children[1].textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            user.style.display = 'block';
        }else{
            user.style.display = 'none';
        }
    })
}