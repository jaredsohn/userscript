// ==UserScript==
// @name           GM Test
// @namespace      Kambfhase
// @include        file:///C:/Users/Fabian/Projekte/jQuery/GM.htm
// @require http://kampfhase2005.ka.funpic.de/uploads/GM_jquery.js
// ==/UserScript==

var $=unsafeWindow.jQuery,
    cl = unsafeWindow.console.log;
    
$('img').click(function(e){
    cl($(this).prev().click());
});