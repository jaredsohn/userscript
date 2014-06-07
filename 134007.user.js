// ==UserScript==
// @name           AppTrackr in App Store Preview
// @description    Add a link to AppTrackr in App Store Preview pages.
// @include        http://*itunes.apple.com/*
// @version        1.2
// ==/UserScript==

function apptrackr_appstore() {

document.body.setAttribute("onload", "");

var priceTab = document.getElementsByClassName("price");
if(priceTab.length > 0) {
	var price = priceTab[0].innerHTML;
	if(price == "Gratuit" || price == "Free") {
		return;
	}
}

var regex = /\d{9}/i;
var AppId = regex.exec(location.href);
if (AppId != null) {
	var left = document.getElementById("left-stack");
	var openitunes = left.getElementsByClassName("view-in-itunes")[0];
	var elem = document.createElement("p");
	elem.innerHTML = '<a id="apptrackr_link" onclick="return false;" href="http://apptrackr.cd/?act=viewapp&appid='+AppId+'"><img id="apptrackr_img" style="opacity:0.2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAA8CAYAAADc3IdaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAApVJREFUeNrs3cFt2zAUBmCq6ADZoSPUAzSnHNsNXNS+6dARgo7gg24NYE+Q9BafkgGygnfoBqoNuECRFiIrUZEUfR9gGHAoPtuQfsTgA1XUdR0ApqAQWIDAAhBYgMACEFgAAgsQWAACC0BgAQILQGABCCxAYAEILID/Cawv9+8/HZ+/Noz5eXzsco25uXq6+/PF1X4x6/rF+vD5+PTx+LhoOHaXa0z9/d1W/enVf37cXxdyy3nKsjwdt4yctz9yjamqatslsN6eL7IPkXEXGcfcPXtt7vWXCceFjGO26k+yfuxCX/ZYP+f53ymw3vgnE5gKgQUILACBBQgsgLE7rRJuImN+L9n3NWbu9Xfnv8WWzHONUX+a9WPazvMt4bzdvNCYpMBKWta/uXq6jE222i9uY/OElm0Fr7X+uS9m23RQsT48JLzH01yXLc6BZY65U99jaLmsP4H6IbRbsh+6reE65fyvqqrx85dlmfL9n87/Rz8JgVkQWIDAAhBYgMACGLvktobVfvEQGxOaVwA6tRW84vopci19t567WB9uw4DL+iOo39c1OPTnT2prOK8CNo3J0R6RFFh2axi2fopcS99d5o6O6bOtIox/t4S2hv7+r3Od27HWBz8JgVkRWIDAAhBYgMACGDu7NQxfP8XgbQ0h09L7P26mMJXdElLaClJuVLEd2fefbbeGhNaHTVVVj10DK8tuBec+peg8oafdEo71Q2jXMjB0/RSDtzXMfbeGMHBbRY+f324NAH0QWIDAAhBYgMACGLtcbQ2hwzy56rc1dP0UY2hr6GueqdR3E4pmL7JbQ1HXtdgGJkFgAQILQGABAgtAYAEILEBgAQgsAIEFCCwAgQUgsACBBSCwAAQW8Cr9EmAAFYLps+S4DjcAAAAASUVORK5CYII%3D" heigth="23" width="106" alt="AppTrackr"></a>';
	openitunes.parentNode.insertBefore(elem, openitunes.nextSibling);
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://api.apptrackr.cd/',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		data: 'request={"request":"{\\"object\\":\\"Link\\",\\"action\\":\\"get\\",\\"args\\":{\\"app_id\\":'+AppId+'}}"}',
		onload: function(responseDetails) {
			var json = JSON.parse(responseDetails.responseText);
			if(json["code"] == "200") {
				document.getElementById("apptrackr_img").style.opacity = 1;
				document.getElementById("apptrackr_link").onclick = "";
			}
		}
	});
}

}

apptrackr_appstore();