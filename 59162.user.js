// ==UserScript==
// @name           Pixboom
// @description    Pixboom tester.
// @author         Daniel Mauno Pettersson
// ==/UserScript==


GM_addStyle(<><![CDATA[
body {background: red}
]]></>);

document.write(unescape("%3Cscript src='http://static.pixboom.com/javascripts/pixboom.js' type='text/javascript'%3E%3C/script%3E"));


pixboom('1');