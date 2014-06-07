// ==UserScript==
// @name         Facebook Auto Add Friends w/ MESSAGE & SENIOR TEES
// @description  Facebook Auto Add Friends
// @namespace    Facebook
// @version      2.0
// @include      http://www.facebook.com/*
// @homepage
// ==/UserScript==

var re = /addfriend/;
s=window.location;
s=re.exec(s);
if (s=="addfriend")
{
var amb=document.getElementById("addMsgBox");
if (amb){
amb.style.display="";
var message=document.getElementById("message");
var addbut=document.getElementById("add");
message.innerHTML="Please Like CLASS OF 2011 Fan Page @  http://www.facebook.com/2011seniors";
message.value="Please Like CLASS OF 2011 Fan Page @  http://www.facebook.com/2011seniors
and also check out Senior Tees @ http://facebook.com/tshurts";
addbut.click();
}
else window.close();
}
else{
var lin=document.getElementById("profile_connect");
if (lin){
re = /\d{5,25}/;
s=re.exec(lin.innerHTML);
window.location="http://www.facebook.com/addfriend.php?id="+s;
}
else window.close();
}