// ==UserScript==
// @name          switch text color
// @description	  switch that stupid text color
// @namespace     
// @include       http://whatisthematrix.warnerbros.com*

//by Stuart Cleaver
//
// ==/UserScript==


(function() {

document.body.style.background = "white";

var p = document.getElementsByTagName("P");

for (var i=0; i<p.length; i++) {
    if (p[i].className == "largeregular") {
        p[i].style.background = "white";
        p[i].style.color = "black";
    }
}

})();