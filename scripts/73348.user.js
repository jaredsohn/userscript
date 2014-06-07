// ==UserScript==
// @name           Link Metacritic to Torrent Sites
// @namespace      http://www.metacritic.com/music/artists/*
// @include        http://www.metacritic.com/music/artists/*
// @include        http://metacritic.com/music/artists/*
// @include        http://www.metacritic.com/video/titles/*
// @include        http://metacritic.com/video/titles/*
// ==/UserScript==

// Currently works for albums and DVD relases, pointing to 
// The Pirate Bay, Demonoid and BT Monster.

var removeTerms = /\b(by)\b/ig;

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		$.extend({URLEncode:function(c){var o='';var x=0;c=c.toString();var r=/(^[a-zA-Z0-9_.]*)/;
  while(x<c.length){var m=r.exec(c.substr(x));
    if(m!=null && m.length>1 && m[1]!=''){o+=m[1];x+=m[1].length;
    }else{if(c[x]==' ')o+='+';else{var d=c.charCodeAt(x);var h=d.toString(16);
    o+='%'+(h.length<2?'0':'')+h.toUpperCase();}x++;}}return o;},
URLDecode:function(s){var o=s;var binVal,t;var r=/(%[^%]{2})/;
  while((m=r.exec(o))!=null && m.length>1 && m[1]!=''){b=parseInt(m[1].substr(1),16);
  t=String.fromCharCode(b);o=o.replace(m[1],t);}return o;}
		});


		$('p.entity A').remove();
		if( document.location.href.match(/\/music\/artists/i) ) {
			var name = $('DIV#center H1').text();
			name += ' ' + $('p.entity').text();
			createLinks(name, 'music');
		} else if( document.location.href.match(/\/video\/titles/i) ) {
			var name = $('DIV#center H1').text();
			createLinks(name, 'movie');
		}
    }

function createLinks(name, type) {
	name = $.URLEncode(name.replace(removeTerms,'').replace(/\[.+?\]/g, ''));
	var demonoidCat = 2;
	if( type == 'movie' ) { demonoidCat = 1; }
	$('<div class="torrentLink"><a style="color: black" href="http://www.demonoid.com/files/?category='+demonoidCat+'&subcategory=All&quality=All&seeded=0&external=2&uid=0&sort=S&query='+name+'">Demonoid</a></div>')
		.css('top', 40)
		.appendTo('body');

	var tpbCat = 100;
	if( type == 'movie' ) { tpbCat = 200; }
	$('<div class="torrentLink"><a style="color: black" href="http://thepiratebay.org/search/'+name+'/0/7/'+tpbCat+'">Pirate Bay</a></div>')
		.css('top', 70)
		.appendTo('body');

	var btCat = 'Audio';
	if( type == 'movie' ) { btCat = 'Video'; }
	$('<div class="torrentLink"><a style="color: black" href="http://www.btmon.com/query?'+btCat+'=on&type_search=0&matchmode=0&name='+name+'&order_by=SEEDERS">BT Monster</a></div>')
		.css('top', 100)
		.appendTo('body');

	$('.torrentLink')
		.attr('target', '_blank')
		.css('position','absolute')
		.css('left', 20)
		.css('z-Index',10000)
		.css('width',100)
		.css('height', 16)
		.css('font-weight', 'bold')
		.css('text-align', 'center')
		.css('padding', '0')
		.css('background-color', 'yellow');

	$('.torrentLink A')
		.css('height', 16)
		.css('display', 'block');
}


