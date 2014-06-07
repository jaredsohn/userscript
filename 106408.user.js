// ==UserScript==
// @name           Netflix No Hover Play link & Show Ratings
// @description    Movie posters now link to info page instead the player. Also, ratings are now shown underneath each poster (except on Instant home page).
// @namespace      psl
// @include        http://movies.netflix.com/Wi*
// @exclude        http://movies.netflix.com/WiMovie*
// ==/UserScript==

var chkHome = document.location.href;

var links = document.evaluate('//a[contains(@href,"WiPlayer")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < links.snapshotLength; i++){
	links.snapshotItem(i).style.cssText = 'background-image:url("");';
	var url = links.snapshotItem(i).href;
	url = url.replace(/WiPlayer\?movieid=/i, "WiMovie/");
	url = url.replace(/\&/i, "?");
	links.snapshotItem(i).href = url;

	if(chkHome.indexOf('WiHome') < 0){ //If Instant Watch home page, don't show ratings

		var d = document.evaluate('//span[contains(@class,"hoverPlay")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var x = d.snapshotItem(i).parentNode.getElementsByTagName('span');
		//x[1].setAttribute('style', 'font-size: 9px;');

		getRate(url, x);
	} 
}

function getRate(u, r){
	GM_xmlhttpRequest({
			method: 'GET',
			url: u,
			onload: function(responseDetails) {
      			var srch = 'span class="rating"';
			var match = responseDetails.responseText.search(srch);
			var responseHTML = responseDetails.responseText;
      			var rating = responseDetails.responseText.substring(match + srch.length + 1, match + srch.length + 4);
			rating = rating.replace('s', '')
			r[1].innerHTML = '<span style="font-size:9px;">Rating: </span><span style="color:#970002;">' + rating + ' stars</span>';
			}
	});
}



