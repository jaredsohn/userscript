// ==UserScript==
// @name         phpBB Count Posts
// @namespace    https://userscripts.org/people/5587
// @description  Shows number of post in phpbb-thread.
// @downloadURL  https://userscripts.org/scripts/source/162076.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @include      */viewtopic.php*
// @updateURL    https://userscripts.org/scripts/source/162076.meta.js
// @version      1.0.3
// @date         2013-03-18
// @creator      Arne Dieckmann (aka "Mithrandir")
// ==/UserScript==

(function() {
	var nodes = document.evaluate(
		"//p[@class='author']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var numberspanposition = GM_getValue("counterposition", -1);
	if (numberspanposition === -1) {
		GM_setValue("counterposition", 0);
		numberspanposition = 0;
	}
	var startingpost = parseInt(get_url_param('start','0'))+1;
	if (startingpost === 1) {
		var lnks = document.evaluate("//h2/a[contains(@href,'&start=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
		if (lnks.snapshotItem(0) != null) startingpost = parseInt(get_url_param('start',lnks.snapshotItem(0).href))+1;
	}
	for(var i=0; i<nodes.snapshotLength; i++) {
		var authornode = nodes.snapshotItem(i);
		var numberspan = document.createElement("span");
		numberspan.setAttribute("class","gmphpbb_CP_numberspan");
		switch (numberspanposition) {
			case 1:
				numberspan.appendChild(document.createTextNode(" #"+(i+startingpost)));
				authornode.appendChild(numberspan);
				break;
			default:
				numberspan.appendChild(document.createTextNode("#"+(i+startingpost)+" "));
				authornode.insertBefore(numberspan,authornode.firstChild.nextSibling);
				break;
		}
	}
})();

function get_url_param( name, searchtype)
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	if (searchtype == "0") {
		var results = regex.exec( window.location.href );
	} else {
		var results = regex.exec( searchtype );
	}

	if ( results == null )
		return "0";
	else
		return results[1];
}