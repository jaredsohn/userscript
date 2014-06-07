// ==UserScript==
// @name Ignore Chat User
// @namespace help
// @description ignore a user in chat
// @include http://help.com/chat
// ==/UserScript==

var usernumber = "0";
usernumber = prompt("Ignore Script is running - Enter the User Number or User Name to Ignore","0");
setInterval(function(){
var z = document.getElementsByTagName("a");
var username = usernumber;
for(var y = 0; y < z.length; y++){
if(z[y].getAttribute("href").substring(0,6+usernumber.length) == ("/user/" + usernumber)){
username = z[y].childNodes[1].firstChild.nodeValue;
username= username.toLowerCase();
}
}
var x = document.getElementsByTagName("em");
for(var y = 0; y < x.length; y++){
if(x[y].firstChild.nodeValue.toLowerCase() == username && x[y].parentNode.getAttribute("class") =="chat-user"){
x[y].parentNode.parentNode.parentNode.removeChild(x[y].parentNode.parentNode);
}
}
}, 250); 