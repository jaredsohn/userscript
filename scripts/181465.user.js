// ==UserScript==
// @id             MAL_autorelogin
// @name           MAL_autorelogin
// @version        0.2
// @author         aliasn3t
// @include        http://myanimelist.net/*
// ==/UserScript==

var userLogin = "LOGIN"
var userPassword = "PASSWORD"

function sendRequest(){
var postd=new XMLHttpRequest();
postd.onreadystatechange=function(){
   if (postd.readyState==4 && postd.status==200)
  location.reload();
   }
postd.open('POST','http://myanimelist.net/login.php',true);
postd.setRequestHeader('Content-type','application/x-www-form-urlencoded');
var userData='username='+userLogin+'&password='+userPassword+'&cookie=1&sublogin=Login';
postd.send(userData);
} 

if(document.body.innerHTML.contains("clear your cookies")) {
	sendRequest();
}
