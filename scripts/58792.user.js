// ==UserScript==
// @name           Lockerz Auto-Signup
// @namespace      http://userscripts.org/scripts/show/58792
// @description    What the name says..
// @include        http://www.lockerz.com/signup/*
// ==/UserScript==

/*
Written by WCDC.. if anyone could verify that annoying 
captcha, that'd be awesome.. :]
*/


/*
Feel free to mess with these variables.
*/

var fname = "Wilson";
var lname = "Chandlerson";
var zipcode = "02341";
var pass = "chandler";

/*
You might want to be a little more advanced to edit these variables..
*/

var timezone = "0";
var month = 1 + Math.floor(Math.random()*12);
var day = Math.floor(Math.random()*30) + 1;
var year = 1970 + Math.floor(Math.random()*11);

/*
Change according to gender.. :]
*/
var gender = "female";

/*
The works..
*/
document.getElementById("fName").value = fname;
document.getElementById("lName").value = lname;
document.getElementById("zipID").value = zipcode;
document.getElementById("pass1").value = pass;
document.getElementById("pass2").value = pass;
document.getElementById("timezone").value = timezone;
document.getElementById("month").value = month;
document.getElementById("day").value = day;
document.getElementById("year").value = year;

/*
Simple conditional statements..
*/

if(gender == "male")
{
document.getElementById("male").checked = true;
}

else
{
	document.getElementById("female").checked = true;
}

/*
Lastly, the alert.. :]
*/

// alert("Forms have been filled. Please fill in the captcha.");