// ==UserScript==
// @name       ElevPresens Fixer
// @namespace  http://ylar.se/
// @version    1.0.0
// @description  This thing makes some fixes to ElevPresens.
// @match      http://elevpresens.se/
// @match      http://www.elevpresens.se/
// @copyright  2014, Dennis Yrlish
// ==/UserScript==

window.onload = function(){
    document.getElementsByTagName("frameset")[1].cols = "200,*";
}
