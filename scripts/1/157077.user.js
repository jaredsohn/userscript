// ==UserScript==
// @name       OCUK make threads with new content bold
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Changes threads with new content bold
// @match      http://forums.overclockers.co.uk/*
// @copyright  2012+, You
// ==/UserScript==
for(var images=document.getElementsByTagName("IMG"),i=0;images.length>i;i++)console.log(images[i].src),"http://forums.overclockers.co.uk/images/buttons/firstnew.gif"==images[i].src&&(images[i].parentNode.nextSibling.nextSibling.style.fontWeight="bold")
