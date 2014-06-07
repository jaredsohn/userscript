// ==UserScript==
// @name           	shoutboxit
// @description    	chatinshoutbox
// ==/UserScript==
var z = 1;
aa=setInterval ("doSomething()", 20000 );  

function doSomething () 
{   
    document.getElementById("mChatMessage").value = "[color=blue]ควย[/color]";
mChat.add();
    if(z == 500) clearInterval(aa);
z++;
}