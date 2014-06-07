// ==UserScript==
// @id             1235000
// @name           SimManiaChatAutologin
// @version        1.1
// @namespace      
// @author         meister1235
// @description    
// @include        http://hardwiredgoogle.com/1000sub/sm/chat/
// @include        http://hardwiredgoogle.com/1000sub/sm/chat/index.php
// @exclude        http://hardwiredgoogle.com/1000sub/sm/chat/?logout=true
// @run-at         document-end
// ==/UserScript==

//Disclaimer: user at your own risk

//Enter your username here,
var username = "hans";
//and your password here
var password = "";
//and more you don't need to do


//checks if there is a error container which says that the username is already in use
var childs = document.getElementById("errorContainer").getElementsByTagName("div")
var numberchilds = childs.length;
if(numberchilds>=2)
{
	if((childs[0].innerHTML.indexOf("Username") != -1)&(childs[0].innerHTML.indexOf("in use") != -1))
	{
		// var oldusername = username;
		// username = prompt("Error, most likely the name is already in use, please choose a different one");
		
		// if(username == "" | username == oldusername)
		// {
			// //if no other Username is entered, add 2 random numbers
			username += (Math.random()*100).toFixed(0) ;
//resetting the password, because the pass would be wrong with a differnet username
password = "";
		// }
	}
}

document.getElementById("userNameField").value=username;
document.getElementById("passwordField").value=password;
document.getElementById('loginButton').click();