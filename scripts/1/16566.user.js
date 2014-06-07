// ==UserScript==
// @name           BitSoup.org - Add Movie IMDB Ratings, Improve Interface
// @namespace      Manix
// @include        http://www.bitsoup.org/*
// ==/UserScript==

// Settings:
var FadeOutTime = 0; // (0 = instantaneous)
var LevenshteinDistanceMatch = 60; // ("American Pie Presents Beta House 2007" fails with 62%)
var Debug = 0;

var $, _g = 'http://www.google.com/search?q=intitle:[', g_ = ']+site:imdb.com/title+"Register+or+login+to+rate+this+title."+"User+Rating"+10';
var ScriptsByPage = {
	'': function($) {
		$('td.navigation>A[href$=paypal_donate.php]').parent().css('height', '31px');
		$('body>div[align="center"], td.main>br').slideUp(FadeOutTime);
		$('td.navigation>A[href$=paypal_donate.php]').hide(FadeOutTime);
		$('td.main').css('padding', '0px');
	},
	'^http://www.bitsoup.org/browse.php': function($) {
		// Add L/S column
		var c = $('table.koptekst tr:eq(0)>td').length, p = $('td:eq('+(c-3)+'), td:eq('+(c-2)+')', $('table.koptekst tr'));
		for (var i=0; i<p.length; i+=2) {
			var s=p[i],l=p[i+1],r,t,e=(i? elem('td.rowhead', r=Math.round(parseInt(l.textContent)/parseInt(s.textContent)*100)/100, {align:'center'}) :
										  elem('td.menubar', 'L/S', {align:'center'}));
			if(r<1) {
				var t=Math.round(Math.sqrt(1-r)*155);
				e.style.color='rgb('+t+','+t+','+t+')';
			} else if(r>5) {
				e.style.fontWeight='bold';
				var t=Math.round(Math.sqrt(Math.min(r-5,95)/95)*255);
				e.style.color='rgb('+t+',0,0)';
			}
			l.parentNode.insertBefore(e, l.nextSibling);
		}
		
		// Add IMDB Ratings
		GM_addStyle('td.main {background:#99BBD5}');
		GM_addStyle('td.rowhead .imdb {font-size:8px; color:#999; cursor:default}');
		GM_addStyle('td.rowhead .imdb .title {text-decoration:none; font-size:10px; color:#48C; cursor:pointer}');
		GM_addStyle('td.rowhead .imdb .stars, td.rowhead .imdb .stars div {float:right; width:100px; height:10px; '+
					'background:url(http://img4.glowfoto.com/images/2007/12/18-0813321909T.png)}');
		GM_addStyle('td.rowhead .imdb .stars div {float:none; background-position:0px 10px}');
		$.each($('img[alt="Movies/XviD"], img[alt="Movies/DVD-R"]'), function(id, val) {
			var titleBox = $('td:eq(1)', val.parentNode.parentNode.parentNode)[0], title = $('A', titleBox)[0].textContent;
			// Retreive relevant name of the movie by filtering scene keywords
			var keywords = ('CAM|DVDRIP|XviD|DivX|DVDSCR|DVDR?|NTSC|PAL|HLS|STV|TC|TS|FS|NL|V2|R[1-5]|SCREENER|NEW SOURCE|PROPER|LIMITED'+
				'|CUSTOM|UNRATED|FINAL|Razor1911|DiAMOND').toLowerCase().split('|'), end = 999, m, i;
			for (i=0; i<keywords.length; i++) {
				m = RegExp('\\b'+keywords[i]+'\\b').exec(title.toLowerCase());
				if(m && m.index) end = Math.min(end, m.index);
			}
			title = title.substr(0, end).replace(/[.,;]/g, ' ').replace(/^ +| +$/g, '');
			// Numbers are in some cases represented in the roman system (ex: "Saw IV" instead of "Saw 4")
			// Some words are shorthands without the "'"
			var searchTitle = title
				.replace(/\b1\b/g, '1|I').replace(/\b2\b/g, '2|II').replace(/\b3\b/g, '3|III').replace(/\b4\b/g, '4|IV')
				.replace(/\b5\b/g, '5|V').replace(/\b6\b/g, '6|VI').replace(/\b7\b/g, '7|VII').replace(/\b8\b/g, '8|VIII')
				.replace(/\b9\b/g, '9|IX').replace(/\b10\b/g, '10|X').replace(/\b11\b/g, '11|XI').replace(/\b12\b/g, '12|XII')
				.replace(/\bIm\b/g, "Im|I'm");
			if(Debug) console.info(id+': '+searchTitle);
			
			// Check for cached version
			var c = GM_getValue('cache_'+searchTitle);
			if (c) {
				c = c.split(',');
				AddIMDBRating(titleBox, c[0], c[1], c[2], c[3], searchTitle);
				return;
			}
			
			var g=_g+searchTitle+g_;
			GM_xmlhttpRequest({
				method: 'get',
				headers: {'User-Agent':'Mozilla/4.0 (compatible) Greasemonkey', 'Content-Type':'application/x-www-form-urlencoded'},
				url: g,
				onload: function(result) {
					var res = result.responseText, m, f;
					m=RegExp('<a href="([^"]+)" class=l[^>]*>(.+?)</a>(?:.|\\n|\\r){0,300}<b>User Rating</b>: (\\d+(?:\\.\\d+))/<b>10</b>').exec(res);
					if(m) var it = m[2].replace(/<\/?b>/g, ''), h = m[1], lev = LevDistTitles(it, title), r = parseFloat(m[3]);
					if(m && lev<=LevenshteinDistanceMatch) AddIMDBRating(titleBox, it, r, lev, h, searchTitle);
					else {
						var n=RegExp('<a href="([^"]+)" class=l[^>]*>(.+?)</a>').exec(res);
						if(!n) { if(Debug)console.info('['+title+']- No Google results!'); return }
						// The "m" matched the first item which already failed the LD test:
						if(m && n[1]==h) { if(Debug)console.info('['+title+']- Failed LD Check!'); return }
						it = n[2].replace(/<\/?b>/g, ''), h = n[1], lev = LevDistTitles(it, title);
						console.info('lev: '+lev);
						if(lev<=LevenshteinDistanceMatch) GM_xmlhttpRequest({
							method: 'get',
							headers: {'User-Agent':'Mozilla/4.0 (compatible) Greasemonkey', 'Content-Type':'application/x-www-form-urlencoded'},
							url: h,
							onload: function(result) {
								var p=RegExp('<b>User Rating:</b>\\s*<b>(\\d+(?:\\.\\d+))/10</b>').exec(result.responseText);
								AddIMDBRating(titleBox, it, parseFloat(p[1]), lev, h, searchTitle);
							}
						});
					}
				}
			});
		});
	}
}


function AddIMDBRating(titleBox, it, r, lev, h, searchTitle) {
	$(titleBox).append(elem('DIV.imdb', '', {innerHTML: '<a href=\''+_g+searchTitle+g_+'\' class=stars title='+r+'/10><div style=width:'+
		(r*10)+'px></div></a><a class=title href='+h+'>'+it+'</a> on IMDB'}));
	GM_setValue('cache_'+searchTitle, it+','+r+','+lev+','+h);
	if(Debug) console.info(CleanTitle(it)+': '+r+' [LD:'+lev+'%] ('+h+')');
}
function LevDistTitles(it, title) { // shows the mismatch level (%)
	var cit = CleanTitle(it), lev = LevenshteinDistance(cit, CleanTitle(title)), r = lev/title.length;
	return Math.round(r<1 ? r*100 : 100/r);
}
function CleanTitle(t) {
	return t.replace(/ *\(?(19|20)\d\d\)?( *(V))?$/, '').replace(/&#39;/g, "'");
}

function LevenshteinDistance(s, t) {
	var d = new Array(), n = s.length, m = t.length, i, j, s_i, t_j, cost; // cost

	if (n == 0) return m;
	if (m == 0) return n;
	for(i=0; i<=n; i++) d[i] = [];
	for (i=0; i<=n; i++) d[i][0] = i;
	for (j=0; j<=m; j++) d[0][j] = j;
	for (i=1; i<=n; i++) {
		s_i = s.charAt(i-1);
		for (j=1; j<=m; j++) {
			t_j = t.charAt(j-1);
			cost = (s_i == t_j ? 0 : 1);
			d[i][j] = Math.min(d[i-1][j]+1, Math.min(d[i][j-1]+1, d[i-1][j-1] + cost));
		}
	}
	return d[n][m];
}

elem = function(n,t,a) {
	var f=/(\w+)?(?:#(\w+))?((?:\.\w+)*)/.exec(n), e=document.createElement(f[1]||'DIV');
	if(f[2]) e.id=f[2];
	if(f[3]) e.className=f[3].substr(1).replace(/\./g,' ');
	if(a) for(var k in a)
		if(k!='style') e[k]=a[k];
		else for(var s in a.style) e.style[s]=a.style[s];
	e.appendChild(document.createTextNode(t));
	return e;
}

var D=document,j;function r(){$=unsafeWindow.jQuery;if(!$){if(!j){
j=D.createElement('script');j.src='http://code.jquery.com/jquery-latest.pack.js';D.getElementsByTagName('head')[0].appendChild(j);
}setTimeout(r,10);}else for(k in ScriptsByPage)if(RegExp(k).test(D.location.href))ScriptsByPage[k]($);}r();
