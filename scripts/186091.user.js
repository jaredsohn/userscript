// ==UserScript==
// @name			Xerotic's Enhanced SYT
// @namespace		xerotic/esyt
// @description		Let's you search anyone's threads instead of your own for SYT button.
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include			*hackforums.net/forumdisplay.php*
// @version			1.0
// ==/UserScript==

$("input[name='author']").clone().attr({"class": "textbox", "id": "author", "type": "text"}).insertAfter('input[name=author]').prev().remove();