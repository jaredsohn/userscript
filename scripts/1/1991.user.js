// ==UserScript==
// @name          yourMovies Imdb Rating
// @namespace     JohnnyBravo/GreaseMonkey
// @description   add imdb ratings to Your Movies list
// @include       http://www.yourmovies.com.au/session/index.cfm*
// @include       http://yourmovies.com.au/session/index.cfm*
// @version       0.10.1
// ==/UserScript==

function $xu(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
function $ec(t, a){
	var n = document.createElement(t);
	for (var b in a) if (a.hasOwnProperty(b)){
		n.setAttribute(b, a[b]);
	}
	return n;
}
function $t(s) {
	return document.createTextNode(s);
}
function $ea(newNode, node) {
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}
function $eb(newNode, node) {
	return node.parentNode.insertBefore(newNode, node);
}
function $el(newNode, par) {
	return par.appendChild(newNode);
}

var sorted=true;
var goldStar=[
	"data:image/png;base64,",
	"iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAMAAABsDg4iAAAAwFBMVEX9/PTTvDvJ",
	"szfm0D/17bT27KzDtG3Yy4rn2HfPt0PaxDy6p1Tm26rErDjbxEOmkC/38c3izEu6",
	"pTXy7dbp5Mvl0l3jzUSpkzHs2lbl0VO3ojP04U3q1UqynTbp1lmtmTHfyT3p1lX9",
	"+/P69dXu45vizFDx4FzfyUP47pn17b/Zy3bv3FqjkC746G328+b59d7gz3bu3GjX",
	"v03axE3t6tfdyE7QxpbXwzq8qTT5+PL+/fTe17D06Zzv20r8+NX////OfXVdAAAA",
	"AXRSTlMAQObYZgAAAK5JREFUeNp90OcOgjAQAGBL2VBkCwUsBBwoLtwRfP/HEgyR",
	"Jqj36+7LjeRGo7+x+WJc8ByiFywHlsN6PkAR1mu2L3WdzSoxhqF3qDhOT9MWVwwD",
	"rnIMYZhMm0i4d6uAbwyQY9c1fN938m7Bg+BWF4Yxc3aftafIbFTTziJ9W4kQA4B2",
	"zCi7F8REDZd7Cu2CYBNjJJUUXsYkEiw+QpLVIz/ht+2AglTqjt0lqvD7tS8YygzS",
	"WKDPswAAAABJRU5ErkJggg=="
].join('');
var greyStar=[
	"data:image/png;base64,",
	"iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAMAAABsDg4iAAAAM1BMVEX8/Pzl5eXW",
	"1tbc3NzPz8/f39/19fXs7Ozp6env7+/i4uLS0tLZ2dn5+fny8vLMzMz///+QLYhj",
	"AAAAAXRSTlMAQObYZgAAAGVJREFUeNp90FkOgCAMBFCLEDbTuf9tRQQdAtq/vpQu",
	"bNtvmIUF6IwZbrIIYMK9oLypqhe5DNaJRNVew3HXJybrWwNPRmNss+EA03BYFYtK",
	"fXoSSklT3U35nKM+yAg0pxcE9/21J0vIBmAAPEZ7AAAAAElFTkSuQmCC"
].join('');
var style=[
	"div.greyStar {background:transparent url('",
	greyStar,
	"') repeat-x; width:200px; height:18px;margin:0; padding:0; float:left;}",
	"div.goldStar {background:transparent url('",
	goldStar,
	"') repeat-x; height:18px;margin:0; padding:0;}"
].join("");
GM_addStyle(style);
var toGo=0;
var rows=[];

function sortMovies() {
	if(sorted && rows.length) {
		rows.sort(function(a, b) {return a.rate - b.rate});
		rows.forEach(function(r) { $eb(r.rowEl, r.rowEl.parentNode.childNodes[1]) });
	}
}
	
function FindImdbStars(imdbId, lnk) {
	var href="http://imdb.com/title/tt"+imdbId+"/ratings";
	GM_xmlhttpRequest( {
		method:"GET",
		url:href,
		headers: {
			"User-Agent":window.navigator.userAgent,
			"Accept":"text/html,text/xml,text/plain"
		},
		onload: function(resp) {
			if(resp.status=="200") {
				var txt=resp.responseText;
				var start=txt.indexOf('weighted average</a> vote of <a href="/search/title?user_rating=');
				if(start>-1) {
					var end=txt.indexOf('</a> / 10</p>', start);
					if(end>-1) {
						var vote=txt.indexOf('">', start+52);
						if(vote>-1 && vote<end) {
							vote+=2;
							newDIV = $ec('A', {
								'class' : 'imdbRating', href : href, target : '_blank', style: 'font-weight:bold;'
							});
							var rating=txt.substring(vote, end);
							var rate=(parseFloat(rating))*10;
							var findBR=lnk.nextSibling;
							if(lnk.parentNode.className=="company") {
								findBR=null;
							} else {
								while(findBR && findBR.nodeName != "BR")
									findBR=findBR.nextSibling;
								if(findBR && findBR.nextSibling)
									findBR=findBR.nextSibling;
							}
							$el($ec('DIV', { 'class' : 'goldStar', style: 'width:'+rate+'%;' }), 
								$el($ec('DIV', { 'class' : 'greyStar' }), newDIV));
							$el($t('['+rating+']'), $el($ec('SPAN'), newDIV));
							$el($ec('BR', { style : 'clear:both;'}), newDIV);
							lnk.parentNode.insertBefore(newDIV,findBR);
							rows.push({rowEl:lnk.parentNode.parentNode, rate:rate});
						}
					}
				}	
			}
			toGo--;
			if(toGo == 0) {
				sortMovies();
			}
		}
	});
}
function yourMoviesInfoPage(lnk) {
	GM_xmlhttpRequest( {
		method:"GET",
		url:lnk.href,
		headers: {
		"User-Agent":window.navigator.userAgent,
		"Accept":"text/html,text/xml,text/plain"
		},
		onload: function(resp) {
			var subFromTogo = true;
			if(resp.status=="200") {
				var txt=resp.responseText;
				var start=txt.indexOf("http://www.imdb.com/Title?"); //26
				if(start>-1) {
					var end=txt.indexOf('"', start);
					if(end>-1) {
						subFromTogo = false;
						FindImdbStars(txt.substring(start+26,end), lnk);
					}
				}
			}
			if(subFromTogo) {
				toGo --;
				if(toGo == 0)
					sortMovies();
			}
		}
	});
}
function FindImdb(lnk) {
	if(lnk.href.indexOf("action=movie_info")<0) {
		toGo--;
		if(toGo == 0)
			sortMovies();
		return; // not a movie
	}
	if(lnk.href.indexOf("imdb_id=")<0) {
		yourMoviesInfoPage(lnk);
	} else {
		var split1=lnk.href.split("?");
		var split2=split1[1].split("&");
		for(var i=0; i < split2.length; i++) {
			if(split2[i].indexOf("imdb_id=")==0) {
				FindImdbStars(split2[i].substr(8), lnk);
				break;
			}
		}
	}
}
var links=$xu('//TD[@class="sessions"]/A[1] | //TD[@class="company"]/A');
toGo=links.length;
links.forEach(function(l) { FindImdb(l); });
