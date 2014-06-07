// ==UserScript==
// @name           FRIENDLINE FLOODER
// @namespace      Nandu
// @description    floods messages
// @include        http://www.friendlane.com/*
// ==/UserScript==

var message="hi how are u";
var name="nandu";
if(document.location=="http://www.friendlane.com/") {

document.forms[1].elements[1].value=message;
document.forms[1].elements[2].value=name;
document.forms[1].elements[3].click();
}

if(document.location.split("?")[0] == "http://www.friendlane.com/express-gem.php")
{

document.location="http://www.friendlane.com/"

}