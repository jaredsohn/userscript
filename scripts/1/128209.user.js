// ==UserScript==
// @name          HF Script - Toggle UserCP Email
// @namespace     xerotic/hideusercpemail
// @description   Toggles email in UserCP to hidden or not. Default is hidden.
// @include       http://hackforums.net/usercp.php
// @include       http://www.hackforums.net/usercp.php
// @version 1.0
// ==/UserScript==


var regex = /Email\:<\/strong>(.*?)</
var replace = "Email: </strong> <a onclick='document.getElementById(\"xeroemail\").style.display=\"none\";' href='javascript:void(0);'>Hide</a> | <a onclick='document.getElementById(\"xeroemail\").style.display=\"inline-block\";' href='javascript:void(0);'>Show</a> : <span style='display:none;' id='xeroemail'>$1</span><";

document.body.innerHTML = document.body.innerHTML.replace(regex, replace);
