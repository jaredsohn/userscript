// MixxingBowl Forums Link
// Copyright (c) 2008, MikeonTV
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name	Mixx Forums
// @namespace	http://twitter.com/mikeontv
// @description Adds MixxingBowl Forum and Breaking News links to navigation bar at Mixx.com. Happy to make any changes.
// @version        0.0.01
// @date           2008-03-27
// @creator        Honest Ape, based on MikeonTV's original script
// @include *mixx.com/*


// ==/UserScript==

var theImage, altText;
var altText = document.createElement("span");
altText.innerHTML = '		<ul id=nav-util> ' +
'<li><a href=http://www.mixxingbowl.com/forums/index.php>Forums ' +
'</a></li><li><a href=http://www.mixx.com/categories/breaking>Breaking ' +
'</a></li></ul>'
;  
theImage = document.getElementById('nav-util');
if (theImage) {    
                
        theImage.parentNode.insertBefore(altText, theImage);
}
