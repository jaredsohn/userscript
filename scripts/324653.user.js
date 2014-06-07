// ==UserScript==
// @name        ishotmyself
// @namespace   http://userscripts.org/scripts/show/324653
// @include     http://www.ishotmyself.nl/account-home.php
// @version     4
// @grant       none
// ==/UserScript==

var favorieten = document.querySelector("#myfavmmrs")
    .parentNode
    .previousElementSibling
    .querySelector("h2");

var toggle = document.createElement("a");
toggle.textContent="Verberg offline";
toggle.style.paddingLeft="100px";
toggle.showAll = true;

function foreachProfile(theFunction){
    var elements = document.querySelectorAll("#myfavmmrs > li > div > b.offline");
    
    for(var i = 0; i < elements.length; i++) {
       theFunction(elements[i].parentNode.parentNode);
    }
}

function setVisibility() {
    if(localStorage.offlineHidden == "true") {
        toggle.textContent="Verberg offline";
        foreachProfile(function(el) { el.style.display = ""; });
    } else {
        toggle.textContent="Toon offline";
        foreachProfile(function(el) { el.style.display = "none"; });
    }
}

setVisibility();

toggle.addEventListener("click", function(){
    if(localStorage.offlineHidden != "true") {
        localStorage.offlineHidden = "true";
    } else {
        localStorage.offlineHidden = "false";
    }
    setVisibility();
});

favorieten.appendChild(toggle);

