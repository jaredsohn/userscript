// ==UserScript==
// @name           The West Auto Log In
// @namespace      addictivity
// @include        http://www.the-west.org/
// @copyright      -underTaker-
// ==/UserScript==

// This is a variation of the script i made called Tribal Wars Auto Login All servers supported
// In order to make it work on any other server copy its homepage (where u log in and paste it 
// in the upper section of the script copy @include        http://www.the-west.org/ and replace 
// the url with the homepage of the server.
// Edit these options :
name="";
pass="";
server="";

// Server Examples:
// World 1 ==> Enter 1
// World 2 ==> Enter 2
// and so on

// Do not touch these
document.getElementById('name').value=name;         		 // Write username
document.getElementById('password').value=pass;    		 // Write password
unsafeWindow.check_login();					 // Log in
unsafeWindow.setTimeout("do_login("+server+");",1000);