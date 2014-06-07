// ==UserScript==
// @name 	  iGoogle Auto Login
// @autho	  Speed
// @namespace	
// @include		http://google.*/ig*

// @include		http*://www.google.*
// @include		https://www.google.com/*
// @include 		http://www.google.*/ig*
// @description   Auto sign in for iGoogle. 
// ==/UserScript==

var user = document.getElementById('guser').getElementsByTagName('a').firstChild.data;

//loop through the links
for (var i = 0; i < user.length; i++)
{ 
      alert(user[i]);

      //check if the link is a "Sign in" one

	if (user[i] == "Sign in")
	{       //go to the sign in page
		window.location = "https://www.google.com/accounts/ServiceLogin?continue=http://www.google.com/ig&followup=http://www.google.com/ig&service=ig&passive=true&cd=US&hl=en&nui=1&ltmpl=default";
	}
}

//if the email and password fields aren't empty...
if (document.getElementById("Email").data !== "" && document.getElementById("Passwd").data !== ""){

        //...and there isn't an error message displayed
	if (!document.getElementById("errormsg_0_Email")){
                //tick the "remember me" box
		document.getElementById("PersistentCookie").checked = true;
                //click "Sign in"!
		document.getElementsByName('signIn')[0].click();
	}
}