// ==UserScript==
// @name       	GoDaddy Affiliate Welcome Message grammar fixer
// @namespace  	http://k0bi.tk
// @version    	1.0.2
// @description  There are a couple of missing commas on the GoDaddy Affiliate Manager. This fixes that.
// @match      	https://affiliate.godaddy.com/
// @require		http://code.jquery.com/jquery-1.9.1.min.js
// @copyright  	2013, Kobi Tate
// ==/UserScript==

$("#main div:nth-child(2):first").addClass("welcomefix");
var message = $(".welcomefix").html();
var newMsg = new String();

newMsg = message.substring(0,41) + ","+ message.substring(41,message.length);
$(".welcomefix").html(newMsg);

message = $("#welcome").html();
msgEnd = message.indexOf("me")+2;

newMsg = message.substring(0,msgEnd) + "," + message.substring(msgEnd,message.length);
$("#welcome").html(newMsg);