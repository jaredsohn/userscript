// ==UserScript==
// @name        GatherFollowers AutoPromoter
// @namespace   GatherFollowers AutoPromoter
// @description Automatically clicks the "Promote Blog" button every 5 minutes
// @include     *gatherfollowers.com*
// @version     1
// @grant       none
// ==/UserScript==

//https://raw.github.com/noahsaso/GatherFollowersScript/master/script.js

//Working code
function getScript(url) {
    e = document.createElement('script');
    e.src = url;
    document.body.appendChild(e);
}
getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
getScript('https://raw.github.com/noahsaso/GatherFollowersScript/master/script.js');