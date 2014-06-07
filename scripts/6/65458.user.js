// ==UserScript==
// @name           btjunkie - healthy torrents only
// @namespace      http://www.userscripts.org
// @include        http://btjunkie.org/search?*
// @include        http://www.btjunkie.org/search?*
// ==/UserScript==

(function(d) {
	function main() {
		var tables = d.getElementsByTagName('table');
		var rows = []
		for (var i=0;i<tables.length;i++)
			if (tables[i].className == 'tab_results') {
				rows = tables[i].getElementsByTagName('tr');
				i = tables.length;
			}
		for (var i=0;i<rows.length;i++) {
			if (rows[i].className != undefined && rows[i].className != null && rows[i].className == '' && rows[i].getAttribute('onmouseout') != null) {
				var seed = rows[i].getElementsByTagName('th')[6].getElementsByTagName('font')[0].innerHTML.replace(/^\s*(.+?)\s*$/, '$1');
				var leech = rows[i].getElementsByTagName('th')[7].getElementsByTagName('font')[0].innerHTML.replace(/^\s*(.+?)\s*$/, '$1');
				if (1*seed < 1*leech) {
					rows[i].style.display = 'none';
					rows[i-1].style.display = 'none';
					for (var j=1;j<6;i++) {
						if (rows[i+j].getAttribute('bgcolor') != null) {
							rows[i+j].style.display = 'none';
							j = 6;
						}
					}
				}
			}
		}
	}
	main();
})(document);