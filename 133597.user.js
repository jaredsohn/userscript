// ==UserScript==
// @name           Terrii's Box!
// @namespace      Terrii_Box_Set
// @description    Terrii's Box Set!
// @author         Matthew Terrii Allen
// @include        htt*://www.facebook.com/*
// @icon           https://s-static.ak.facebook.com/rsrc.php/yi/r/q9U99v3_saj.ico
// @version        1.5
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*connect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	       htt*://www.facebook.com/advertising/*
// @exclude	       htt*://www.facebook.com/ads/*
// @exclude	       htt*://www.facebook.com/sharer/*
// @exclude	       htt*://www.facebook.com/send/*
// @exclude	       htt*://www.facebook.com/mobile/*
// @exclude	       htt*://www.facebook.com/settings/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==============
$('#groupsNav').remove();
$('.moreSectionsLink').remove();
body = document.body;
if(body != null) {
	div = document.createElement("div");
    div.setAttribute('style', 'width: 100px; position: fixed; bottom: 120px; left: 8px; background-color: #D8DFEA; border: 1px solid #94a3c4; display: block; padding: 2px; text-align: center; font-weight:bold;color:#333333; border-top-left-radius: 20px; border-top-right-radius: 20px;');
	div.innerHTML = "<a>Terrii's Box!</a>"

    body.appendChild(div);
}
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
    div.setAttribute('style', 'width: 100px; position: fixed; bottom: 100px; left: 8px; background-color: #D8DFEA; border: 1px solid #94a3c4; display: block; padding: 2px; text-align: center; font-weight:bold;color:#333333;');
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"javascript:AutoLike()\"><img class=\"emote_img\" src=\"https://s-static.ak.facebook.com/images/blank.gif\" style=\"background-position: -336px 0px; margin-top: -2px; margin-right: 3px;\">Like All Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
    div.setAttribute('style', 'width: 100px; position: fixed; bottom: 80px; left: 8px; background-color: #D8DFEA; border: 1px solid #94a3c4; display: block; padding: 2px; text-align: center; font-weight:bold;color:#333333;');
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\"><img src=\"http://www.socialmediahome.com/wp-content/themes/persuasion/lib/scripts/timthumb/thumb.php?src=http://www.socialmediahome.com/wp-content/uploads/2012/05/facebook-thumbs-down-dislike-600-275x171.jpg&w=50&h=50&zc=1&q=100\" style=\"width: 13px; height: 13px; margin-top: -2px; margin-left: -2px; margin-right: 2px;\">Unlike Status's</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		
		}
		
	};
}
// ==Pokes==
body = document.body;
if(body != null) {
	div = document.createElement("div");
    div.setAttribute('style', 'width: 100px; position: fixed; bottom: 60px; left: 8px; background-color: #D8DFEA; border: 1px solid #94a3c4; display: block; padding: 2px; text-align: center; font-weight:bold;color:#333333;');
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://facebook.com/pokes/\"><img src=\"https://s-static.ak.facebook.com/rsrc.php/v2/y2/r/W8TFwFc9d1E.gif\" style=\"margin-bottom: -4px; margin-right: 3px;\">Poke's</a><span class=\"count uiSideNavCount\">&nbsp;<span class=\"countValue fss\"></span></span>"
	
	body.appendChild(div);
}
// ==/UserScript==
body = document.body;
if(body != null) {
	div = document.createElement("div");
    div.setAttribute('style', 'width: 100px; position: fixed; bottom: 40px; left: 8px; background-color: #D8DFEA; border: 1px solid #94a3c4; display: block; padding: 2px; text-align: center; font-weight:bold;color:#333333;');
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" onclick=\"Chat.toggleSidebar();\">Toggle Chatbar!</a>"
	
	body.appendChild(div);
}
// ==============
if (top.location!=location || typeof document.body=='undefined') {return;}
var box = document.createElement('div');
              box.setAttribute('style', 'width: 100px; position: fixed; bottom: 20px; left: 8px; background-color: #D8DFEA; border: 1px solid #94a3c4; display: block; padding: 2px; text-align: center; font-weight:bold;color:#333333; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;');
document.body.insertBefore(box, document.body.firstChild);
document.body.appendChild(box);

function tick()
{
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
    var s = d.getSeconds();
	
	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    if (h > 12) { h = h - 12; }
                     
	box.innerHTML = h + ":" + m + ":" + s;
    
}
tick();
setInterval(tick, 1000);