// ==UserScript==
// @name           Techtarget Crap Remover
// @namespace      http://userscripts.org/scripts/show/?
// @description    Remove Crap on Techtarget pages
// @version        Version 0.1
// @include        http://search*techtarget.com/*
// @include        search*techtarget.com/*
// ==/UserScript==

//Remove annoying Divs
var divList = new Array;
divList = ["inlineRegistration", "adPsl", "footerNavigation", "footerCopyright"];

for (var i=0; i<divList.length; i++)
{
    var temp = document.getElementById(divList[i]);
    if (temp != null)
    {
        temp.parentNode.removeChild(temp);
    }
}

//Block images
var image, blacklist = new Array(
"/rms/ux/digitalguide/images/spacer.gif",
"http://cdn.ttgtmedia.com/rms/ux/digitalguide/images/spacer.gif"
);

for(var i=document.images.length-1; i>=0; i--) {
    image = document.images[i];
    for(var x=blacklist.length-1; x>=0; x--) {
        if(image.src.indexOf(blacklist[x])!=-1) image.parentNode.removeChild(image);
    }
}
