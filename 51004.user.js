// ==UserScript==
// @author          nerdism
// @namespace       http://userscripts.org/users/93999
// @homepage        http://userscripts.org/scripts/show/51004
// @description     Removes ads
// @description     Wykop.pl Cleaner - Usuwanie reklam 
// @copyright       2009 nerdism
// @version         0.6
// @name            Wykop.pl Cleaner - Usuwanie reklam   
// @include         http*://*wykop.pl/*
// ==/UserScript==

//var plugin = PRO_plugin(@name);

(
function() {  

obj=document.getElementsByTagName("div");

for(i=0;i<obj.length;i++)
{
if(obj[i].id == "bottom"|| obj[i].id == "szerlokb"|| obj[i].id == "apraca"  || obj[i].id == "footer" || obj[i].id == "side-sponsor-box" || obj[i].id == "side-fruli-box" || obj[i].id == "side-otopraca-box" || obj[i].id == "ads-side" || obj[i].className == "helpDiv" || obj[i].id == "side-ibood-box"  || obj[i].id == "cover-item" || obj[i].id == "cover-in-recommend"  || obj[i].className == "polecamyContainer" || obj[i].innerHTML.indexOf("dodawane i oceniane") != -1 && obj[i].innerHTML.indexOf("wykop-vote") == -1)
 {
  obj[i].style.display= "none";
 }
}

obj=document.getElementsByTagName("iframe");

for(i=0;i<obj.length;i++)
{
 obj[i].style.display= "none";

}

obj=document.getElementsByTagName("html");

for(i=0;i<obj.length;i++)
{
 obj[i].style.background= "none";
}

obj=document.getElementsByTagName("a");

for(i=0;i<obj.length;i++)
{ 
 if(obj[i].className == "praca")
 {
  obj[i].style.display= "none";
 }
}

})()