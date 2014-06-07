// ==UserScript==
// @name       WN-INT Login
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include     https://securelogin.arubanetworks.com/cgi-bin/login*
// @match      http://stackoverflow.com/questions/17255303/using-jquery-in-tampermonkey
// @copyright  2012+, You
// ==/UserScript==
 
// netwerk inlogger
 
 console.log(0);
 
function login() {
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
      console.log(1);
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {console.log(2);
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
 console.log(3);
       var newURL = get('url');
        console.log(newURL);
  window.location.replace(newURL);
    }
  }
xmlhttp.open("POST","login",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("user=present&password=exsa6330&cmd=authenticate");
console.log(4);}
 
function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))  
      return decodeURIComponent(name[1]);
}
 
 login();