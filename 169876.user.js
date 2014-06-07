// ==UserScript==
// @name       Diaspora Wide
// @namespace  https://joindiaspora.com/u/alienhunter3010
// @version    0.1
// @description  Enlarge post area on diaspora
// @match      https://joindiaspora.com/*
// @copyright  2013, ACe
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

function enlarge(c, w) {
	$(c).css('width', w);
}

setInterval(function(){
    enlarge('.container', '100%');
    enlarge('.span-24', '95%');
    enlarge('.span-18', '60%');
    enlarge('.span-13', '60%');
}, 10000);