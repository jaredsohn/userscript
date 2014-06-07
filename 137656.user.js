// ==UserScript==
// @name        Americanize
// @namespace   http://www.mage.net
// @description Switches commas and periods in numbers
// @include     http://www.settlersonlinetools.com/en/index.php*
// @version     1.2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    $('#ressources td').contents().filter(function(){return this.nodeType==3;}).parent().text(function(i,t){
        return t.replace(/,/g,'BZ').replace(/\./g,',').replace(/BZ/g,'.');
    });
});