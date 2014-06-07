// ==UserScript==
// @name           MW Remove Email Sign Up
// @namespace      del_annoying_email_sign
// @description    Delete the annoying MW email sign up pop up box
// @author         junwafu
// @version        1.1
// @include        http://facebook.mafiawars.com/mwfb/remote/html_server.php*
// ==/UserScript==

var bodytag = document.body;
var popup1 = bodytag.childNodes[0]; 
var popup2 = bodytag.childNodes[1]; 

var throwawayNode1 = bodytag.removeChild(popup1);
var throwawayNode2 = bodytag.removeChild(popup2);
