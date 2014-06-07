// ==UserScript==
// @name 		Lovefilm Lights Out
// @version             0.4
// @description		Licht aus für Lovefilm
// @grant               none
// @homepage	        http://userscripts.org/scripts/show/158827
// @updateURL	        https://userscripts.org/scripts/source/158827.meta.js
// @downloadURL	        https://userscripts.org/scripts/source/158827.user.js
// @include		http://www.lovefilm.de/film/*
// @include		http://www.lovefilm.de/tv/*
// @include		https://www.lovefilm.de/film/*
// @include		https://www.lovefilm.de/tv/*
// ==/UserScript==

var buttonparent = document.getElementById("product-summary");
var buttonlist = buttonparent.childNodes;

for(var i = 0; i < buttonlist.length; i++){
    if(buttonlist[i].className == "cta-buttons cf"){
        var tmp = document.createElement('div');
        tmp.innerHTML = '<li><a id="nsvb-lights-out" title="Licht aus" style="cursor: pointer;" class="add-to-watchlist">Licht aus</a></li>';
        var button = tmp.childNodes[0];
        button.addEventListener("click", function(){
            var tmp2 = document.createElement('div');
            tmp2.innerHTML = '<div id="nsvb-background" style="background-color: rgba(5, 5, 5, 0.90); position: fixed; width: 100%; height: 100%; z-index: 2;"><span id="nsvb-close-button" style="color: white; font-size: 20px; padding: 10px; cursor: pointer;">&times;</span></div>';
            var background = tmp2.childNodes[0];
            document.body.insertBefore(background, document.body.firstChild);            
            var button2 = document.getElementById("nsvb-close-button");
            button2.addEventListener("click", function(){
                var background2 = document.getElementById("nsvb-background");
                document.body.removeChild(background2);
            }, false);
        }, false);
        buttonlist[i].appendChild(button);
    }
}

