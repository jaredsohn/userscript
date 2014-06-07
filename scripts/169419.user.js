// ==UserScript==
// @basedon        http://userscripts.org/scripts/show/66948
// @name           iTunes AppAddict.org Loading Page Integration
// @description    Changes the iTunes loading page into a optional launch page that can either forward you to AppAddict or the iTunes Store
// @include        https://ax.itunes.apple.com/*
// @include        https://itunes.apple.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version        1.1
// ==/UserScript==

function main() {

document.body.setAttribute("onload", "");

var iTunesURLID = /\d{9}/i;
var iTunesFoundID = iTunesURLID.exec(location.href);
if (iTunesFoundID != null) {
	var appTrackrID = iTunesFoundID+'';
	var appTrackrURL = "http://www.appaddict.org/view.php?trackid="+appTrackrID.substr(0,9);

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.appaddict.org/view.php?trackid='+appTrackrID,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'X-Requested-With': 'XMLHttpRequest',
		},
		onload: function(responseDetails) {
			var checkIfCracked = responseDetails.responseText;
			if (checkIfCracked.match(/No Content/i)) {
				var linkStart = '<a href="'+appTrackrURL+'"><img style="opacity:0.25; margin-bottom: 12px"';
				var linkEnd = '</a>';
			} else {
				var linkStart = '<a href="'+appTrackrURL+'"><img style="margin-bottom: 12px"';
				var linkEnd = "</a>";
			}
			var img = ' src="data:image/png;base64,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" heigth="23" width="106">';
			$('div#left-stack > div').first().find('a.view-in-itunes').after(linkStart+img+linkEnd);
		}
	});

}

var iTunesNFURLID = /Software\?id=\d*/i;
var iTunesNFFoundID = iTunesNFURLID.exec(document.body.innerHTML);
if (iTunesNFFoundID != null) {
  document.body.innerHTML= document.body.innerHTML.replace("We are unable to find iTunes on your computer.","Look For App Using...");
  document.body.innerHTML= document.body.innerHTML.replace("I have iTunes","iTunes");
  document.body.innerHTML= document.body.innerHTML.replace("Download iTunes","AppAddict");
  var appTrackrID = iTunesNFFoundID+'';
  var appTrackrURL = "http://www.appaddict.org/view.php?trackid="+appTrackrID.substr(12)+"\" class=\"";
	document.body.innerHTML= document.body.innerHTML.replace(/http:\/\/www\.apple\.com\/itunes\/affiliates\/download\//i,appTrackrURL);
  document.getElementById('userOverridePanel').style.display='block';
}

}

main();