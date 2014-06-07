// ==UserScript==
// @name           kjclub admin expand main edit area
// @namespace      org.positrium.gm
// @include        http://*kjclub.com/*/club/introModify.html?tname=*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.3
// ==/UserScript==
(function(){
	var result = x('/html/body/table[3]/tbody/tr/td[3]/table[2]/tbody/tr/td[2]/textarea');
	var container = result.snapshotItem(0);
	container.setAttribute('style','width:100%;');
	container.setAttribute('rows',40);
	
	
// ========== add from snippet ================
function x(path, d){
	if(!d) d=unsafeWindow;//document; // document is self.
	return document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

	// ========== add from snippet ================
	new UpdateChecker({
				script_name : 'kjclub admin expand main edit area'
				,
				script_url : 'http://userscripts.org/scripts/source/44451.user.js' // required
				,
				current_version : '0.0.3' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/44451' // optional
			});
})();