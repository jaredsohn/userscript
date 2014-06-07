// ==UserScript==
// @name        Remove ads from google search
// @namespace   http://userscripts.org/users/529924
// @include     *://*google.com*/search?*
// @include     *://*google.com*/#fp=*
// @include     *://*google.com*/webhp?tab=*
// @include     *://*google.com*/?gws_rd*
// @include     *://*google.com*/#newwindow*
// @grant       none
// @author      Thales M. G.
// @version     1.3.5
// ==/UserScript==

// Uses the new MutationObserver listener, instead of the deprecated addEventListener

//Runs once, so you don't even see the ads flashing.
var vitimas = document.getElementsByClassName("ads-container");
for (var ii = 0; ii < vitimas.length; ii++) {
     // Hide each one of them. Could be replaced with
     // vitimas[ii].parentNode.removeChild(vitimas[ii]);
     vitimas[ii].style.display="none";
};
var vitimas4 = document.getElementsByClassName("ads-container-list");
for (var ii = 0; ii < vitimas4.length; ii++) {
     vitimas4[ii].style.display="none";
};

// Sometimes, Google changes the class name to something too generic
// So, try to destroy directly the ads
// Uses try/catch because sometimes the pages has not created those elements yet
// Which would generate an error and terminate the script
var vitimas2 = document.getElementById("tads");
var vitimas3 = document.getElementById("tadsb");
var vitimas5 = document.getElementById("mbEnd");
try { vitimas2.style.display = "none"; } catch(e) {};
try { vitimas3.style.display = "none"; } catch(e) {};
try { vitimas5.style.display = "none"; } catch(e) {};


var observador = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        // Find all ads, contained in class "ads-container"
        var vitimas = document.getElementsByClassName("ads-container");
        for (var ii = 0; ii < vitimas.length; ii++) {
            // Hide each one of them. Could be replaced with
            // vitimas[ii].parentNode.removeChild(vitimas[ii]);
            vitimas[ii].style.display="none";
        };
        
        var vitimas2 = document.getElementById("tads");
        var vitimas3 = document.getElementById("tadsb");
        var vitimas5 = document.getElementById("mbEnd");
        try { vitimas2.style.display = "none"; } catch(e) {};
        try { vitimas3.style.display = "none"; } catch(e) {};
        try { vitimas5.style.display = "none"; } catch(e) {};
        
        var vitimas4 = document.getElementsByClassName("ads-container-list");
        for (var ii = 0; ii < vitimas4.length; ii++) {
            vitimas4[ii].style.display="none";
        };
    });
});

var config = { childList: true, subtree: true };

observador.observe(document, config);
