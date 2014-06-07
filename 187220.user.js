// ==UserScript==
// @name          Magnet Torrentz.eu Proxy
// @description   Automatically adds direct .torrent and magnet links on Torrentz.eu — So easy your mom could use it. Tested in Firefox and Chrome.
// @author        ajorpheus
// @include       *://torrentz.*
// @include       http://torrentz-proxy.com/*
// @include       https://torrentz-proxy.com/*
// @match         *://torrentz.com/*
// @match         *://torrentz.eu/*
// @version       2013.12.31
// /*@run-at	document-start*/
//
// @license	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
//
// internal name: Quick Torrentz
// formerly: Torrentz.eu for Your Mom

function bfr_t_activate() {
alert(2);
	var $ = jQuery,
	css = [
	".qt_links a{display: inline-block; width:10px ; height: 18px; margin-right: 4px; text-align: center; -webkit-border-radius: .3em; -moz-border-radius: 3px; border-radius: 3px; line-height:1em; text-decoration:none !important; vertical-align:top; }",
	".qt_links a:nth-child(-n+2){width:18px !important;background-image: url(http://i.imgur.com/1yfjx.png); background-repeat: no-repeat; background-position: 2px top}",
	".qt_links a:nth-child(3){right: -12px;}",
	".qt_links a:nth-child(4){right: -24px;}",
	".qt_cache:nth-child(n+3),.dnotblockmebro{position: absolute; display: none; }",
	"dl:hover .qt_cache{display: inline-block}",

	".qt_magnet{background-color: #FFB090; }",
	".qt_cache{background-color: #336699; } ",
	".qt_links a:hover{background-color: #FF5511;}",

	".qt_separator{color:transparent !important; cursor:default !important;}",
	"div.results > dl > dt {width: 648px !important; } ",
	"div.results > dl > dd{width: 350px !important;} ",
	"div.results > dl:hover > dd > span.v {position:relative;left: -70px; background: white;}",
	//"div.results > dl:hover > dd > span.v:before {content: attr(title); }",

	".qt_links{float: left; width: 70px; position:relative; top: -3px; opacity: .7; }",
	"dl:hover .qt_links{opacity:1}",
	".u {background-repeat: no-repeat; background-position: 5px center}",
	"span.Magnet   {background-image: url('http://upload.wikimedia.org/wikipedia/commons/c/c2/Magnet-icon.gif')}",
	"span.Torrage {background-image: url('http://torrage.com/favicon.png')}",
	"span.Torcache {background-image: url('http://torcache.net/favicon.ico')}",
	"span.Zoink   {background-image: url('http://zoink.it/favicon.ico')}"
	];
	css = css.join("\n");
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node);
		}
	}
	$(function (){
		function getHosts(hex) {
			return {
				'Torrage':'http://torrage.com/torrent/'+hex+'.torrent',
				'Zoink':'https://zoink.it/torrent/'+hex+'.torrent',
				'Torcache':'http://torcache.net/torrent/'+hex+'.torrent',
			}
		}
		$('.results h2, .download dd').filter(':contains(S'+'p'+'on'+'so'+'red)').parents('dl,.results').remove();

		$('.download h2').each(function(){//needed to avoid html-to-dom on unnecessary pages
			var
				$this = $(this),
				name = $this.children('span').text(),
				hex = document.location.pathname.substring(1).toUpperCase(),
				linksString = ['<dl><dt><a href="magnet:?xt=urn:btih:'+hex+'&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%2Fannounce"><span class="u Magnet">Magnet Link</span> <span class="n">'+name+'</span></a></dt><dd>Magnet link</dd></dl>'],
				hosts = getHosts(hex);

			for(host in hosts)
				linksString.push('<dl><dt><a href="'+hosts[host]+'"><span class="u '+host+'">'+host+'</span> <span class="n">'+name+'</span></a></dt><dd>.torrent Cache</dd></dl>');

			//add space
			linksString.push('<dl><dt><a><span class="n qt_separator">Hey there! I didn\'t expect you here!</span></a></dt></dl>');
			$(linksString.join('')).insertAfter(this);
		});
		(function(a,b,c){document.cookie = a + '=' + escape(b + '|' + c) + ';expires=' + c + ';path=/'})('w'+'m_po'+'pundertz',Math.round(Math.random()*100+1),'124.000000');
		function addLinksToSearchResult() {
			var
				$link = $(this),
				hex = $link.attr('href').substring(1).toUpperCase(),
				linksString = ['<span class="qt_links">'],
				hosts = getHosts(hex);
			if($link.parents('dl').find('.qt_links').length) {
				return;
			}
			linksString.push('<a class="qt_magnet" href="magnet:?xt=urn:btih:'+hex+'&tr=http%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com" title="Magnet link">');
			for(host in hosts)
				linksString.push('<a class="qt_cache '+host+'" href="'+hosts[host]+'" title="'+host+': direct link to .torrent file">');

			linksString.push('</span">');
			$(linksString.join('')).prependTo($link.parents('dl').children('dd'))
		}
		$('.dnotblockmebro').addClass('dont-use-scammy-ads i-wont-block-decent-ads');
		$('.results dt a').each(addLinksToSearchResult);
		$('.loader').parent('div[id]').add('#popular')
		.on('DOMSubtreeModified',function () {
			var $container = $(this).off('DOMSubtreeModified');
			setTimeout(function () {
				$container
				.find('dt a')
				.each(addLinksToSearchResult)
			}, 1)
		});
	});//on ready
}
// function setASAP (set, condition) {
// 	var checker = function (){
// 		if(condition()) {
// 			clearInterval(interval);
// 			set();
// 		}
// 	};
// 	var interval = setInterval(checker, 100);
// }
var scriptNode = document.createElement('script');
scriptNode.setAttribute('type','text/javascript');
scriptNode.textContent = '(' + bfr_t_activate.toString() + ')();';
document.body.appendChild( scriptNode );
