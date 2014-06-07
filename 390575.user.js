// ==UserScript==
// @name       consoleAlert
// @namespace  http://consoleAlert/
// @version    1.0
// @description  add sites which you didn't want it alert in the match list
// @match      http://link
// @copyright  2014.02.18, JMNSY
// ==/UserScript==
unsafeWindow.alert = function(str){
    console.log(str);
}