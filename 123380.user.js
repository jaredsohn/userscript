// ==UserScript==
// @name         Tokopedia Auto Add Friends
// @description  Tokopedia Auto Add Friends - 'like' 
// @namespace    Tokopedia
// @version      3.0
// @include      http://www.tokopedia.com/*
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
window.location="http://www.tokopedia.com/addfriend.pl?id="+s;
}
else window.close();
}