// ==UserScript==
// @name       VisualCool
// @namespace  d.nachev.88@gmail.com
// @version    0.1
// @description  Change Visualisation
// @include        http://*erepublik.com*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// @copyright  2012+, Like A Bo0s
// ==/UserScript==
//Accept Donates from all in this link: http://www.erepublik.com/en/citizen/profile/6080968
//Thanks!!! :)

//remove Like_Facbook button
$(".facebook_like").remove();

//newspaper visual
$(".post").css({ "box-shadow": "1px 1px 14px rgba(0, 0, 0, 0.3), -2px -2px 15px rgba(217, 212, 201, 0.4) inset, 2px 50px 150px rgba(217, 212, 201, 0.4) inset"});
$(".post_info").css('margin-top','5px');
$(".largepadded").remove()
$(".goleft").css("height", "40px");


