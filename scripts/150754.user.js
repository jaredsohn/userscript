// ==UserScript==
// @name       Hide New Header Block on SMF
// @namespace  http://SKelemen.com/
// @version    0.3
// @description  Intended for Iam-Clan.com
// @match      http://*/*
// @copyright  2012+, Samuel Kelemen
// ==/UserScript==

var div = document.getElementById("tptopbarHeader");
var div2 = document.getElementById("footer_section");
//now also hides footer text

if (div) {
    div.style.display = "none"; // Hides it
    
    // Or
    // div.parentNode.removeChild(div); // Removes it entirely
}

if (div2) {
    div2.style.display = "none"; // Hides it
    
    // Or
    // div.parentNode.removeChild(div); // Removes it entirely
}
