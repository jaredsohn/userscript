// ==UserScript==
// @name           MangaToshokan show uploaded chapters views
// @namespace      local
// @description    MangaToshokan show uploaded chapters views
// @include        http://www.mangatoshokan.com/uploader?user=*
// @include        http://www.doujintoshokan.com/uploader?user=*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// @version        1.1
// ==/UserScript==

try{

	$("td[valign='top']:first").parent().after(
		"<p class=\"operations\">"+
		"<a id=\"show_stats\">Check number of views</a>"+
		"</p>");

	$("a#show_stats").click(function() {
		var href = new Array();
		$('a[href*="/edit?rid="]').each(function(i){
			href[i]= 'http://' + window.location.host + $(this).addClass("view_nr").attr("href");
		});

		for(var q = 0; q < href.length; q++) {
			var chObj;
			chObj = $('.view_nr:eq('+ q +')');
			// console.log(q, chObj, href[q]);
			get_vc(chObj, href[q]);
		}
		return false;
	});
	
	// FUNCTIONS
	
	// get manga statistic (AJAX)
	function get_vc(chObj, URL) {
		GM_xmlhttpRequest({ method: 'GET', url: URL, onload: function(response) {
			var views = new Array();
			page = response.responseText;
			page = page.replace(/\n/gm, "");
			views = /Views:.*<b>(\d+,?\d*,?\d*,?\d*,?\d*)<\/b>/i.exec(page);
			// console.log(views);
			chObj.before('<strong>' + views[1] + '</strong> ');
			
			$(chObj).fadeIn();
		}});
	}
	
	// global function to set CSS
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	// CSS
	addGlobalStyle(""
		+"strong { color: black; font-weight: normal;}"
		+"p.operations { text-align: right; cursor:pointer; margin: -15px 0px 0px;}"
	);

}catch(e){
	console.log("error "+e.description);
}