// ==UserScript==
// @name        Cyberoam Multiple Continuous Login
// @namespace   CyberoamArrayLikeMultipleLogins
// @description Add multiple ids, and have them auto login
// @include     *192.168.1.1:8090*
// @version     1
// @grant       none
// ==/UserScript==




//variables storing the username and password
var username=["username1", "username2"];
var password=["passwordOF1", "passwordOF2"];


//variable containing the  success note
var noteSuccessLogIn = "You have successfully logged in";


//initial count of the array
var count=0;


//initial login
document.querySelector('input[name=username]').value = username[count];
document.querySelector('input[name= password]').value = password[count];
document.getElementById('logincaption').click();


//starting the interval loop (that 2000 is miliseconds i.e. 2 seconds)
//so, you can alter the time between rechecks here
var scriptInterval=setInterval(function(){multipleScript()},2000);



//function for interval loop
function multipleScript()
{
    //getting the note after login
    var noteCurrent = document.getElementById("msgDiv").textContent;
    

    //main stuff happens here
    if(noteCurrent.trim() != noteSuccessLogIn)
    {
        count++;
        if(count==username.length)
        {
            clearInterval(scriptInterval);
            
          //reloading the page to start it all over again if anything interrupted the connection
            location.reload();

          // just comment out the reload and use alert if you don't want automatic reloads
        //  alert("All your IDs have been cycled through once.\nIf you think not, just reload the page!");
            return 0;
        }
        document.querySelector('input[name=username]').value = username[count];
        document.querySelector('input[name= password]').value = password[count];
        document.getElementById('logincaption').click();
    }
}