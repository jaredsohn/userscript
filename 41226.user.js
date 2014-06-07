// ==UserScript==
// @name           Automatic Login
// @author      someguynamedpie
// @description    It logs you in to newgrounds automaticly, edit the js file! 1 automatic login per day! (soon to fix)
// @include         *newgrounds*
// ==/UserScript==
document.getElementById("lb_username").value = "username";
document.getElementById("lb_userpass").value = "password";
document.getElementById("store").innerHTML='<a href="http://www.newgrounds.com/store/">Logout</a>';


checkCookie();
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 ;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return ""
}
function checkCookie()
{
username=getCookie('loggedin');
if (username!=null && username!="")
  {
  
  }
else 
  {
  
    setCookie('loggedin',1,1);
    setTimeout('AttemptLogin()',1000);
    
  }
}
function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : "; expires="+exdate.toGMTString());
}
