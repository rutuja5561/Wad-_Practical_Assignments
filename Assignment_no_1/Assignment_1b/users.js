$(document).ready(function(){
    let users= JSON.parse(localStorage.getItem('users')||'[]');
    let userList=$("#userlist");

    if(users.length===0){
        alert("NO USER FOUND");
    }
    else{
        users.forEach( user => {
            userList.append(`<li> name:${user.name} email:${user.email}`);
        });
    }

    $("#deleteUsers").click(function(){
        if(confirm("Are you sure you want to delete all users?")){
            localStorage.removeItem('users');
            userList.empty();
            alert("All users deleted successfully!")
        }
    })

    
})