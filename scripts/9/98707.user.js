// ==UserScript==
// @name           Megavideo 2 PopStream
// @description    Remove limit megavideo using PopStream
// @author         Popeen
// @website		   http://www.MrPopeen.com
// @include        *megavideo.com/?*
// @version        3.0
// ==/UserScript==
var link = document.location.href;
var button = document.createElement("div");
button.innerHTML = 
	'<div style="width: 0px; height:0px;">' +
		'<form id="foo" method="post" action="http://www.popstream.tk/index.php"> ' +
			'<input type="hidden" name="mvId" value="'+link+'">' +
			'<input type="hidden" name="server" value="8">' +
			'<input type="submit" name="submit" value="Remove limit" style="margin-top:15px;">' +
		'</form>' +
		'<iframe width="0" height="0" src="http://www.popstream.tk/index.php?gm3update=true"></iframe>' +
	'</div>';
document.body.insertBefore(button, document.body.firstChild);
