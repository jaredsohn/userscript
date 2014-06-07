// ==UserScript==
// @name           Sulekha's Hack
// @namespace      PHONE_NUMBER_VIEWER
// @include        http://classifieds.sulekha.com/*/adlistings.aspx?*
// ==/UserScript==

var GM_DEBUG = false;

if(!GM_DEBUG) {
   var GM_log = function(){};
} else {
	if(unsafeWindow.console){
	   var GM_log = unsafeWindow.console.log;
	}
}

var adParasRefs = document.evaluate("//div[@class='ads_list']/div[@class='dety']/p[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0; i<adParasRefs.snapshotLength; i++) {
	var idElem = document.evaluate('./b[1]', adParasRefs.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var adId = idElem.innerHTML.trim().match(/\d+/)[0];
	GM_log('adId = '+adId);
	var contactNoSpan = window.document.createElement( 'span' );
	// contactNoSpan.setAttribute('style', "float:right; background-color: #FFF6CF; border: 1px solid #F7941D; padding: 2px;");
	contactNoSpan.setAttribute('style', "float:right; background-color: #888888; padding: 2px; color: #FFF; border: 1px solid #000000;");
	contactNoSpan.setAttribute('id', "contact_no_"+adId);
	adParasRefs.snapshotItem(i).appendChild(contactNoSpan);
	makeAjaxHTTPRequest("http://classifieds.sulekha.com/loadlistingsmetatags.aspx?nrb=1&rb=1&c={@cid}&tn=ListingsOthers&cn=vn&ctc={@ph}&cid="+adId, 'GET', contactNoSpan);
}

function makeAjaxHTTPRequest(url, method, elemRef) {
	GM_log('Entering makeAjaxHTTPRequest(url, method)');
	GM_log('requestURL='+url);
	GM_xmlhttpRequest({method: method,
		url: url,
		onload: function(result) {
			try {
				GM_log('responseText is '+ result.responseText);
				var xmlDoc;
				if (window.DOMParser) {
					xmlDoc=new DOMParser().parseFromString(result.responseText,"text/xml");
				}
				var phNo = xmlDoc.evaluate('//div[@class="right_newlogic"]', xmlDoc,  null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).firstChild.textContent.trim();
				elemRef.innerHTML = 'Phone no: <b>'+phNo+'</b>';
				GM_log(phNo);
			} catch (e) {
				GM_log('Unable to get Availabilty; exception: ' + e);
				respText =  'Try Again!';
			}
		}
	});
}

/*var idList = document.evaluate("//div[@class='scr_la']//input[contains(@id,'_City')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i<idList.snapshotLength; i++) {
	var idInputElem = idList.snapshotItem(i);
	var adId = idInputElem.getAttributeNode('id').value.trim().match(/\d+/)[0];
	var contactNoSpan = window.document.createElement( 'span' );
	contactNoSpan.setAttribute('style', "float:right;");
	contactNoSpan.setAttribute('id', "contact_no_"+adId);
	makeAjaxHTTPRequest("http://classifieds.sulekha.com/loadlistingsmetatags.aspx?nrb=1&rb=1&c={@cid}&tn=ListingsOthers&cn=vn&ctc={@ph}&cid="+adId, 'GET', contactNoSpan);
}*/
