// ==UserScript==
// @name         Facebook Auto Add Friends
// @description  Facebook Auto Add Friends - 'like' us at facebook.com/ViralMarketingGuru
// @namespace    Facebook
// @version      3.0
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
message.innerHTML="Selam, beni eklersen sevinirim :)";
message.value="Selam, beni eklersen sevinirim :)";
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