// ==UserScript==
// @name           iTunes AppTrackr Loading Page Integration
// @description    Changes the iTunes loading page into a optional launch page that can either forward you to AppTrackr or the iTunes Store
// @include        https://ax.itunes.apple.com/*
// @include        https://itunes.apple.com/*
// @require        http://usocheckup.redirectme.net/66948.js?method=update&maxage=7
// @version        1.5.2
// ==/UserScript==

function main() {

document.body.setAttribute("onload", "");

var iTunesURLID = /\d{9}/i;
var iTunesFoundID = iTunesURLID.exec(location.href);
if (iTunesFoundID != null) {
	var appTrackrID = iTunesFoundID+'';
	var appTrackrURL = "http://apptrackr.cd/?act=viewapp&appid="+appTrackrID.substr(0,9);

	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://apptrackr.cd/ajax.php?act=viewapp',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'X-Requested-With': 'XMLHttpRequest',
		},
		data: 'appid='+appTrackrID,
		onload: function(responseDetails) {
			var checkIfCracked = responseDetails.responseText;
			if (checkIfCracked.match(/Application Unavailable/i)) {
				var linkStart = '<img style="opacity:0.25;"';
				var linkEnd = '';
			} else {
				var linkStart = '<a href="'+appTrackrURL+'"><img';
				var linkEnd = "</a>";
			}
			document.body.innerHTML= document.body.innerHTML.replace(/<div class="price">/g,linkStart+' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAA8CAYAAADc3IdaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAApVJREFUeNrs3cFt2zAUBmCq6ADZoSPUAzSnHNsNXNS+6dARgo7gg24NYE+Q9BafkgGygnfoBqoNuECRFiIrUZEUfR9gGHAoPtuQfsTgA1XUdR0ApqAQWIDAAhBYgMACEFgAAgsQWAACC0BgAQILQGABCCxAYAEILID/Cawv9+8/HZ+/Noz5eXzsco25uXq6+/PF1X4x6/rF+vD5+PTx+LhoOHaXa0z9/d1W/enVf37cXxdyy3nKsjwdt4yctz9yjamqatslsN6eL7IPkXEXGcfcPXtt7vWXCceFjGO26k+yfuxCX/ZYP+f53ymw3vgnE5gKgQUILACBBQgsgLE7rRJuImN+L9n3NWbu9Xfnv8WWzHONUX+a9WPazvMt4bzdvNCYpMBKWta/uXq6jE222i9uY/OElm0Fr7X+uS9m23RQsT48JLzH01yXLc6BZY65U99jaLmsP4H6IbRbsh+6reE65fyvqqrx85dlmfL9n87/Rz8JgVkQWIDAAhBYgMACGLvktobVfvEQGxOaVwA6tRW84vopci19t567WB9uw4DL+iOo39c1OPTnT2prOK8CNo3J0R6RFFh2axi2fopcS99d5o6O6bOtIox/t4S2hv7+r3Od27HWBz8JgVkRWIDAAhBYgMACGDu7NQxfP8XgbQ0h09L7P26mMJXdElLaClJuVLEd2fefbbeGhNaHTVVVj10DK8tuBec+peg8oafdEo71Q2jXMjB0/RSDtzXMfbeGMHBbRY+f324NAH0QWIDAAhBYgMACGLtcbQ2hwzy56rc1dP0UY2hr6GueqdR3E4pmL7JbQ1HXtdgGJkFgAQILQGABAgtAYAEILEBgAQgsAIEFCCwAgQUgsACBBSCwAAQW8Cr9EmAAFYLps+S4DjcAAAAASUVORK5CYII%3D" heigth="23" width="106">'+linkEnd+'<BR \/><div class="price">');
		}
	});

}

var iTunesNFURLID = /Software\?id=\d*/i;
var iTunesNFFoundID = iTunesNFURLID.exec(document.body.innerHTML);
if (iTunesNFFoundID != null) {
  document.body.innerHTML= document.body.innerHTML.replace("We are unable to find iTunes on your computer.","Look For App Using...");
  document.body.innerHTML= document.body.innerHTML.replace("I have iTunes","iTunes");
  document.body.innerHTML= document.body.innerHTML.replace("Download iTunes","AppTrackr");
  var appTrackrID = iTunesNFFoundID+'';
  var appTrackrURL = "http://apptrackr.cd/?act=viewapp&appid="+appTrackrID.substr(12)+"\" class=\"";
	document.body.innerHTML= document.body.innerHTML.replace(/http:\/\/www\.apple\.com\/itunes\/affiliates\/download\//i,appTrackrURL);
  document.getElementById('userOverridePanel').style.display='block';
}

}

main();