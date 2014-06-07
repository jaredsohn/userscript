// ==UserScript==
// @id             6423
// @name           Ad.cx (AdCraft) and Adf.ly Bypass
// @version        1.2
// @namespace      http://www.jeopardize.at/
// @author         Jeopardize
// @description    bypasses those annoying ads - works with noscript
// @include        https://adcraft.co/*
// @include        http://adf.ly/*
// @run-at         document-end
// ==/UserScript==

function fr() {
	alert('Failed to retrieve url. Look at userscripts.org if there\'s an update.');
	throw 'Failed to retrieve url.';
}
if (String(document.location).indexOf('adf.ly') !== -1) {
	if (String(document.location).indexOf('market') !== -1)
		return;
	var s = document.getElementsByTagName('script')[0];
	var p = s.innerHTML.indexOf('var url = \'');
	var pe = s.innerHTML.indexOf('\';', p + 11);
	if (p === -1 || pe === -1)
		fr();
	var url = s.innerHTML.substring(p + 11, pe);
	document.location.href = url;
} else {
	var v = document.getElementsByTagName('script');
	for (var i = 0; i < v.length; i++) {
		var c = v[i].innerHTML.indexOf('if(count == 0){');
		if (c !== -1) {
			var p = v[i].innerHTML.indexOf('https://adcraft.co/go/', 0);
			var pe = v[i].innerHTML.indexOf('">', p);
			if (p === -1 || pe === -1)
				fr();
			var url = v[i].innerHTML.substring(p, pe);
			document.body.innerHTML = "<p>&nbsp;</p><h2><a href=\"" + url + "\">&gt;&gt; " + url + " &lt;&lt;</a></h2>";
		}
	}
}