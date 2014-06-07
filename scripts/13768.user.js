// ==UserScript==
// @name           Make Images Big
// @namespace      pvam.pvam
// @description    Make Images Big
// @include        http://www.facebook.com/friends.php?*
// ==/UserScript==

var img = document.getElementsByTagName("img");

for(var i=0;i<img.length;i++)
{
    if(img[i].src.match("profile"))
    {
        //img[i].src= "http://www.google.com/ig/images/igoogle_logo_sm.gif";
		var myarray=img[i].src.split("/");
		var hehe = myarray[6].substring(1,myarray[6].length);
		img[i].src = myarray[0]+"/"+myarray[1]+"/"+myarray[2]+"/"+myarray[3]+"/"+myarray[4]+"/"+myarray[5]+"/"+"n"+hehe;
    }

} 