// ==UserScript==
// @name           Show Danbooru favourites
// @namespace      http://mathrick.org/userscripts/danbooru-showfavs
// @description    Automatically unhide favourites list upon post loads
// @version        0.5
// @grant          none
// @match          http://*.danbooru.donmai.us/posts/*
// @match          http://danbooru.donmai.us/posts/*
// ==/UserScript==


function unhide ()
{
    var show = document.querySelector("#show-favlist-link");
    show.click();
}

function fixup ()
{
    var list = document.querySelector("#favlist");
    list.style.marginLeft = "0";
    list.style.fontSize = "x-small";
}

(function ()
 {
     fixup();
     // Timeout lets us run after danbooru's init, which'd otherwise
     // hide the list again
     setTimeout(unhide, 0);

})()
