// ==UserScript==
// @name          Display Magic cards sans popup
// @namespace     http://lieschke.net/projects/greasemonkey/
// @description	  Displays Magic cards from wizards.com sans popup window. Clicking on the card displays the original popup.
// @include       http://www.wizards.com/*
// ==/UserScript==

var cardAnchor = null;
cardAnchor = document.createElement('a');
cardAnchor.setAttribute('border', 0);
cardAnchor.setAttribute('style', 'display: none; position: fixed; top: 0px; right: 0px; border-width: 0 0 1px 1px; border-color: black; border-style: solid; padding: 7px 7px 3px 3px; background-color: white; z-index: 100');

var s = '<table cellpadding="0" cellspacing="0" border="0">';
s += '<tr><td><img src="/magic/images/console/cardborder_nw.jpg" width="19" height="13" border="0" alt=""></td><td bgcolor="black"><img src="/images/spacer_1_1.gif" border="0" alt="" height="1" width="1"></td><td><img src="/magic/images/console/cardborder_ne.jpg" width="13" height="13" border="0" alt=""></td></tr>';
s += '<tr><td><img src="/magic/images/console/cardborder_w.jpg" width="19" height="285" border="0" alt=""></td><td bgcolor="black"><img id="TheCard" border="0" width="200" height="285"></td><td bgcolor="black"><img src="/images/spacer_1_1.gif" border="0" alt="" height="1" width="1"></td></tr>';
s += '<tr><td><img src="/magic/images/console/cardborder_sw.jpg" width="19" height="22" border="0" alt=""></td><td><img src="/magic/images/console/cardborder_s.jpg" width="200" height="22" border="0" alt=""></td><td><img src="/magic/images/console/cardborder_se.jpg" width="13" height="22" border="0" alt=""></td></tr>';
s += '</table>';

cardAnchor.innerHTML = s;
document.body.appendChild(cardAnchor);

(function() {
	var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < links.snapshotLength; i++) {
		var link = links.snapshotItem(i);
		if (link.href.indexOf('autoCardWindow') != -1 && link.firstChild && link.firstChild.tagName != 'IMG') {
			link.href = "javascript:void('" + link.href.split("'")[1] + "')";
			link.addEventListener('click', function(e) {
				e.stopPropagation();
				var cardName = this.href.split("'")[1];
				var lookupUrl = 'http://gatherer.wizards.com/gathererlookup.asp?name=' + cardName;
				GM_xmlhttpRequest({
					method: 'GET',
					url: lookupUrl,
					onload: function(details) {
						document.getElementById('TheCard').setAttribute('src', details.responseText.match(/http:\/\/resources\.wizards\.com\/Magic\/Cards\/\w+\/en-us\/\w+\.jpg/));
						cardAnchor.setAttribute('href', "javascript:autoCardWindow('" + cardName + "')");
						cardAnchor.style.display = 'block';
					}
				});
			}, true);
		}
	}
})();