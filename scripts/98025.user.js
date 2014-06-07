// ==UserScript==
// @name           MangaToshokan helper for MangaUpdates - show allowed releases
// @namespace      mangatoshokan_helpers
// @description    MangaToshokan helper for MangaUpdates - show allowed releases on groups and authors pages and releases list
// @include        http://www.mangaupdates.com/releases.html*
// @exclude        http://www.mangaupdates.com/releases.html*stype=series*
// @include        http://www.mangaupdates.com/groups.html?id=*
// @include        http://www.mangaupdates.com/authors.html?id=*
// @include        http://www.mangaupdates.com/publishers.html?id=*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        http://usocheckup.dune.net/98025.js?maxage=7
// @version        1.3
// ==/UserScript==

try{
	
    show_MT = 1;
    show_DT = 1;
    
	var pathname = window.location.pathname;
	
	if (pathname == '/releases.html' || pathname == '/authors.html') {
		$('#main_content tr[valign="middle"]:eq(0) td.specialtext').parent().after(
			"<p class=\"operations\">"+
			"<a id=\"show_stats\">Check Releases</a>"+
			"</p>");
	}
	
	if (pathname == '/publishers.html') {
		$('#main_content > table > tbody > tr[valign="top"]:eq(0)').before(
			"<p class=\"operations\">"+
			"<a id=\"show_stats\">Check Releases</a>"+
			"</p>");
	}
	
	if (pathname == '/groups.html' || pathname == '/publishers.html') {
		$('#main_content > table > tbody > tr[valign="top"]:eq(0)').after(
			"<p class=\"operations\">"+
			"<a id=\"show_stats\">Check Releases</a>"+
			"</p>");
	}
	
	if (pathname == '/groups.html' || pathname == '/authors.html') {
		$('#main_content > table > tbody > tr[valign="top"]:eq(1)').after(
			"<p class=\"operations\">"+
			"<a id=\"show_stats\">Check Releases</a>"+
			"</p>");
	}
	
	$("a#show_stats").click(function() {
		var href = new Array();
		$('a[href*="series.html?id="]').each(function(i){
			href[i]=$(this).addClass("series_link").attr("href");
		});
		// console.log(href);
		for(var q = 0; q < href.length; q++) {;

			var chObj;
			chObj = $('.series_link:eq('+ q +')');
			// console.log(chObj);
			chObj.toggleClass('status', true);
			
			get_vc(chObj, href[q]);
		}
		return false;
	});
	
	
	// FUNCTIONS
	
	// get manga statistic (AJAX)
	function get_vc(chObj, URL) {
		GM_xmlhttpRequest({ method: 'GET', url: URL, onload: function(response) {
			var v = new Array();
			var c = new Array();
			page = response.responseText;
			page = page.replace(/\n/gm, "");
			v = /v.<i>([^<]+)/im.exec(page);
			c = /c.<i>([^<]+)/im.exec(page);
			by = /Search for all releases of this series/im.exec(page);
			
			pub = /publishers.html\?id=(8|9|113|25|290|56|61|423|62|63|66|75|80|82|86|94|97|100|168|249|112|119|121|116|140|144|147|149|151|163|55|173|251|175|234|351|235|279|573|167|563|564)?'.title='Publisher Info/im.exec(page);
			// group = /groups.html\?id=(81)?'.title='Group Info/im.exec(page);
			group = null;
			
			genre = /genre=(Doujinshi|Hentai|Yaoi)./im.exec(page);
			genre_type = />(Doujinshi)\s*<\/div>/i.exec(page);
			
			var genre_text = '';
			var genre_text_long;
			
			exclude_type = />(Novel|Drama CD)\s*<\/div>/i.exec(page);
			
			// console.log(URL, by);
			if(genre == null && genre_type == null){
				genre_text = 'MT';
				genre_text_long = 'MangaToshokan';
			}else{
				genre_text = 'DT';
				genre_text_long = 'DoujinToshokan';
			};
			
			// lots to read!! 
			if((pub == null && exclude_type == null && URL != null)){
				$(chObj).toggleClass('good', true);
				
				if((v == null) && (c == null) && (by == null))
				{	
					$(chObj).parent().css({'background-color': 'DarkOrange'});
					// chObj.innerHTML = (pub == null) ? "No releases, " + genre_text : "";
					// chObj.text(genre_text);
					chObj.attr('title', 'No releases. Allowed on '+ genre_text_long);
				}
				else if (group != null){
					$(chObj).parent().css({'background-color': '#FFFF66'});
					// chObj.innerHTML = (pub == null) ? "Check mirror policy, " + genre_text : "";
					// chObj.text(genre_text);
					chObj.attr('title', 'Check mirror policy. Allowed on '+ genre_text_long);
				}
				else{
					if (genre_text == 'MT')
						$(chObj).parent().css({'background-color': 'LightGreen'});
					else
						$(chObj).parent().css({'background-color': 'LightPink'});
					// chObj.innerHTML = (pub == null) ? "Allowed, " + genre_text : "";
					// chObj.text(genre_text);
					chObj.attr('title', 'Allowed on '+ genre_text_long);
				}	
                
                if (show_MT == 1 && genre_text == 'MT')
                    $(chObj).parent().parent().show();
                else if (show_DT == 1 && genre_text == 'DT')
                    $(chObj).parent().parent().show();
                else 
                    $(chObj).parent().parent().remove();
			}
			else{
				$(chObj).toggleClass('good', false);
				$(chObj).parent().parent().remove();
			}
			// console.log(chObj.innerHTML);
			$(chObj).fadeIn('fast');
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
		+".r1 { opacity: 0.5; }"
		+".centered { text-align: center;}"
		+".status { display:none; color:blue;}"
		+".good { color:blue; font-weight: bolder;}"
		+"p.operations { text-align: center; margin-top:10px; font-size:16px; cursor:pointer; color:#52667C;}"
		+"p.operations a { font-weight: bolder; font-size:16px;}"
		+"#main_content > table > tbody > tr > td p+p+p > table a:visited { color: #999; }"
	);

}catch(e){
	console.log("error "+e.description);
}