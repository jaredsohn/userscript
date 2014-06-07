// ==UserScript==
// @name            HackForums Hide Email
// @namespace       tableflipper/hideemail
// @description     Show/Hide for your email
// @include         http://www.hackforums.net/usercp.php
// @include         http://hackforums.net/newreply.php
// @include         hackforums.net/newreply.php
// @version         1.0
// ==/UserScript==
var elements = document.getElementsByTagName('strong');
alert(document.getElementById("panel").innerText);
/*
for(var j=0;j<elements.length;j++){
if (elements[j].innerText == "Email:"){
alert(elements[j].innerText);
}
}
*/