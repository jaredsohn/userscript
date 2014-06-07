// ==UserScript==
// @name           MySpace - Move message buttons.
// @description    This will move the message buttons above the message and not below it.
// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.readmessage*
// @Version/Date	2.01/1-20-2009
// ==/UserScript==

var readButtons = document.getElementById("read-buttons");
var userLink = document.getElementById("userUrl");

userLink.innerHTML = userLink.innerHTML + 
                     '<p align=left> ' + 
                     readButtons.innerHTML + '</p>';
                     
readButtons.innerHTML = "";


