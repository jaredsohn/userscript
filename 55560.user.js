// ==UserScript==
// @name           Photobomb NSFW
// @author         0nce
// @version        1.0
// @namespace      http://userscripts.org/users/83254
// @description    Replace the "NSFW image" warning with the real image in thisisphotobomb.com
// @include        http://thisisphotobomb.com/*
// ==/UserScript==


var linksList = document.links;
for(var i = 0; i < linksList.length; i++) {
    if(linksList[i].innerHTML.indexOf("http://thisisphotobomb.com/wp-content/uploads/") >-1)
    {
      linksList[i].innerHTML = '<img src="'+linksList[i].href+'" alt="NSFW">';
    }
}
