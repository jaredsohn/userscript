// ==UserScript==
// @name           kjclub admin dead-title link fix
// @namespace      org.positrium.gm
// @description    admin dead-title link fix
// @include        http://*kjclub.com/*/club/*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.4
// ==/UserScript==
(function(){
	var result = x('/html/body/table[2]/tbody/tr/td/table/tbody/tr[2]/td');
	var container = result.snapshotItem(0);
	var child = container.childNodes;
	var link = child[0];
	var str = link.childNodes;
	var prefix = str[0].textContent.split('\n')[0];
	var suffix = str[0].textContent.split('\n')[1];
	
	var src = new String(window.location);
	var tname = src.split('?')[1];
	src = src.substr(0, suffix.indexOf('introModify'))+'clubMain.html?'+tname;
//	GM_log(suffix);
	
	var newlink = document.createElement('A');
	newlink.href = src;
	var newbold = document.createElement('B');
	newlink.appendChild(newbold);
	
	var newtext = document.createTextNode(prefix)
	var newbr = document.createElement('BR');
	var newaddr = document.createTextNode(suffix);
	newbold.appendChild(newtext);
	newbold.appendChild(newbr);
	newbold.appendChild(newaddr);
	
	container.replaceChild(newlink,link);
	
	
	// ========== add from snippet ================
	function x(path, d){
		if(!d) d=unsafeWindow;//document; // document is self.
		return document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	
	// ========== add from snippet ================
	new UpdateChecker({
				script_name : 'kjclub admin dead-title link fix'
				,
				script_url : 'http://userscripts.org/scripts/source/44450.user.js' // required
				,
				current_version : '0.0.4' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/44450' // optional
			});
})();