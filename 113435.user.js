// ==UserScript==
// @name           		malacka.ws+
// @version        		0.9.8.20111006
// @namespace      	http://www.pdstudio.hu/
// @description    		A malacka.ws torrent oldal felületét alakítja át, egyszerűbbé és használhatóbbá teszi.
// @include        			http://*malacka.ws/*
// ==/UserScript==

if ( unsafeWindow.themedir != "http://malacka.ws/include/templates/default/" ) { 
	var url = window.location.href.toLowerCase();
	var onThePage = url.match(/http\:\/\/malacka\.ws\/usercp\.php\?act\=edit_theme_language/);
	if (onThePage) {  }
	else {
		GM_addStyle((<><![CDATA[
		div#warnline {width:500px; height: 80px; border-radius: 5px; padding: 17px 8px 8px 8px; background: #e21919; position: fixed; z-index: 9001; color: #ffffff; left: 50%; margin: 0 0 0 -251px; bottom: 50%; box-shadow: 0 0 0px 14px rgba(0,0,0,0.7); border-radius: 3px;}
		]]></>).toString());
		var targett = document.getElementById("top");
		targett = targett.children[targett.children.length - 1];
		var warn = document.createElement("div");
		warn.id='warnline';
		warn.innerHTML = "<div style=\"letter-spacing: 1px; text-transform: uppercase; font-weight: bold; width: 99%; background: #b10c0c; border-bottom: 1px solid #da3939; padding: 3px;\">malacka.ws figyelmeztetés</div><div style=\"margin-top: 10px;\">Jelenleg nem a \'default\' sablon van beállítva. <br />A malacka.ws+ szkript csak a \'default\' sablonnal működik amit a Profil beállítások menüpont alatt változtathatsz meg. <a style=\"color: #ffffff; font-weight: bold;\" target=\"_self\" href=\"http://malacka.ws/usercp.php?act=edit_theme_language\">(link)</a></div>";
		targett.parentNode.insertBefore(warn, targett);
	}
}
else {
	GM_addStyle((<><![CDATA[
	body {background: #231f20 url('http://www.pdstudio.hu/malacka/bg.png') no-repeat 0px 0px !important;}
	a {color: #f15caa !important;}
	a:hover {text-decoration: none !important; }
	table {background: #0b0b0b !important;}
	#top {background: #0A0809 !important;}
	#top div.padding {padding: 2px 20px 0 24px !important; float: left !important;}
	#top div.padding a img {position: relative !important; top: 4px !important;}
	#top {position: relative !important; top: 229px !important;}
	#header { background: url("http://www.pdstudio.hu/malacka/header.png") no-repeat scroll center top transparent !important; height: 160px !important; margin: 0 !important; width: 956px !important}
	a.toFrontpage {position: relative; text-indent: -9999px;height: 100%; display:block; width: 490px; background: none !important;}
	#menu {background: #141213 !important; width: 100% !important; padding-left: 0px !important; height: 41px !important; margin: -117px 0 32px 0px !important;}
	#menu ul.TSSEMenu {margin: 5px 5px !important;}
	#menu ul li.TSSEMenui {padding-left: 17px !important;}
	ul.TSSEMenu, ul.TSSEMenu ul {background: none !important; border: none !important;}
	ul.TSSEMenu a {padding: 4px 11px !important; text-transform: uppercase !important; color: #fff !important; font-style: italic !important;}
	ul.TSSEMenu a, ul.TSSEMenu li.dis a:hover, ul.TSSEMenu li.sep a:hover {background: #141213 !important; border-top: 1px solid #413c3d !important; border-left: 1px solid #413c3d !important; border-right: 1px solid #0b0a0a !important; border-bottom: 1px solid #0b0a0a !important;}
	li.TSSEMenui ul.TSSEMenum {background: #141213 !important; position: absolute !important; top: 28px !important; padding: 5px 17px 17px 0 !important; color: #fff !important; font-style: italic !important;}
	li.TSSEMenui ul.TSSEMenum a {text-transform: lowercase !important;}
	ul.TSSEMenu a:hover {background: #d60070 !important; border-top: 1px solid #8a1150 !important; border-left: 1px solid #8a1150 !important; border-right: 1px solid #f56cb4 !important; border-bottom: 1px solid #f56cb4 !important;}
	ul.TSSEMenu li.TSSEMenui ul.TSSEMenum li.TSSEMenui ul.TSSEMenum { top: -3px !important; padding: 2px 17px 17px 0 !important; margin-left: 4px !important;}
	.content { margin: -20px auto 0 !important; }
	#main .left_side {background: #141213 !important;}
	#main .left_side div.notification-border-n {background: #0b0b0b !important; color: #e7e7e7 !important; border: 1px solid #352b2e !important;}
	table.notification-th-n {background: #050505 !important; height: 30px !important;}
	span.notification-title-n { padding-left: 4px !important; text-transform: uppercase !important; letter-spacing: 2px !important; font-weight: bold !important;}
	table.notification-th-n img.hand {padding-right: 6px !important;}
	td.text, td {border: 1px solid #352B2E !important; background: #0b0b0b !important;}
	table.notification-th-n td {border: none !important; background: #050505 !important;}
	td.thead {border-top:1px solid #352b2e !important; border-left: 1px solid #352b2e !important; border-right: 1px solid #352b2e !important; border-bottom: none !important; background: #050505 !important; text-transform: uppercase !important; letter-spacing: 2px !important; font-weight: bold !important; color: #fff !important;}
	td.none {border: none !important;}
	td {color: #fbc2df !important;}
	div[id*="news"] span {color: #FBC2DF !important; font-size: 110% !important; font-weight: bold !important; text-align: left !important; font-family: "Arial" !important; line-height: 150% !important;}
	div[id*="news"] {position:relative !important; top: 7px !important; padding-bottom: 15px !important; line-height: 150% !important;}
	div[id*="news"] span strong em span span {line-height: 150% !important; }
	div[id*="news"] h1 span strong {font-size: small !important; line-height: 10% !important;}
	#sortabletable tbody tr td[align="left"] div span[style="float: right;"] {position: relative !important; top: -3px !important; right: 2px !important;}
	tr.highlight td {background: #1d0b14 !important;}
	.highlight, .sticky, .highlight a, .sticky a {background: none !important;}
	.tooltip-content {background: #0b0b0b !important; box-shadow: 0 0 0px 14px rgba(0,0,0,0.7) !important; border-radius: 3px !important;}
	.tooltip-content img {max-width: 340px !important; max-height: 226px !important;}
	ul.yui-nav {margin: 10px 0 !important; text-transform: uppercase !important;}
	.yui-nav a em {font-style: italic !important; color: #fff !important;}
	.yui-skin-sam .yui-navset .yui-content {background: #0b0b0b !important;}
	.yui-skin-sam .yui-navset .yui-content, .yui-skin-sam .yui-navset .yui-navset-top .yui-content {border: 1px solid #352b2e !important; padding: 0.5em !important;}
	.yui-skin-sam .yui-navset .yui-nav, .yui-skin-sam .yui-navset .yui-navset-top .yui-nav {border-color: #352b2e !important; border-width: 0px 0px 0px 0px !important;}
	.yui-skin-sam .yui-navset .yui-nav a, .yui-skin-sam .yui-navset .yui-navset-top .yui-nav a {border: none !important; background: #141213 !important;}
	.yui-skin-sam .yui-navset .yui-nav a em, .yui-skin-sam .yui-navset .yui-navset-top .yui-nav a em {border-top: 1px solid #413c3d !important; border-left: 1px solid #413c3d !important; border-right: 1px solid #0b0a0a !important; border-bottom: 1px solid #0b0a0a !important; padding: 0.5em 2.55em !important;}
	.yui-skin-sam .yui-navset .yui-nav .selected a em {padding: 0.5em 2.55em !important; background: #d60070 !important; border-top: 1px solid #8a1150 !important; border-left: 1px solid #8a1150 !important; border-right: 1px solid #f56cb4 !important; border-bottom: 1px solid #f56cb4 !important;}
	.yui-skin-sam .yui-navset .yui-nav a em:hover {padding: 0.5em 2.55em !important; background: #d60070 !important; border-top: 1px solid #8a1150 !important; border-left: 1px solid #8a1150 !important; border-right: 1px solid #f56cb4 !important; border-bottom: 1px solid #f56cb4 !important;}
	tbody#collapseobj_content1s tr td div[style="float: right;"] img:first-child {padding-right:4px !important;}
	tbody#collapseobj_content1s tr td div[style="float: right;"] img {padding-bottom: 4px !important;}
	#navcontainer_f ul li {margin: 5px 0 5px 5px !important; width:60px !important; border-top: 1px solid #413c3d !important; border-left: 1px solid #413c3d !important; border-right: 1px solid #000 !important; border-bottom: 1px solid #000 !important;}
	#navcontainer_f li.current, #navcontainer_f li:hover {background: #d60070 !important; border-top: 1px solid #8a1150 !important; border-left: 1px solid #8a1150 !important; border-right: 1px solid #f56cb4 !important; border-bottom: 1px solid #f56cb4 !important; color: #fff !important;}
	#navcontainer_f a.current {background: #d60070 !important; color: #fff !important;}
	#navcontainer_f ul li a {background: none !important; color: #fff !important;}
	.borderit img { border: 1px solid #FFFFFF !important; border-radius: 2px 2px 2px 2px !important; opacity: 1 !important; background: none repeat scroll 0 0 #FFFFFF !important;}
	.borderit:hover img { border: 1px solid #FFFFFF !important; border-radius: 2px 2px 2px 2px !important; opacity: 1 !important; background: none repeat scroll 0 0 #FFFFFF !important;}
	a[onclick^="TSIncreaseTextarea"] {position: relative !important; top: 2px !important;}
	.quote { background: url("http://www.pdstudio.hu/malacka/quote.png") no-repeat scroll 0 0 transparent !important ;}
	blockquote.bq { border-color: #EABAD2 !important;  border-style: dotted dotted dotted solid !important; border-width: 1px 1px 1px 3px !important; margin: 5px !important;}
	div#donation>div {background: none repeat scroll 0 0 #980A89 !important; border: 1px solid white !important; border-radius: 4px 4px 4px 4px !important; height: 20px !important; margin-top: 4px !important; text-align: left !important; width: 135px !important;}
	div#donation div div {background: none repeat scroll 0 0 #D00CC2 !important; border: 0 solid black !important;  border-radius: 3px 3px 3px 3px !important; color: white !important;  margin-top: 0px !important; font-size: 8pt !important;  font-weight: bold !important; height: 20px !important;  line-height: 20px !important; padding-left: 0 !important;}
	fieldset { border: 1px solid #CCCCCC !important; padding: 0.6em 1em 1em !important; margin-top: 12px;}
	legend, legend font b {color: #F15CAA !important; padding: 0 10px; text-transform: uppercase;}
	#topbar {display: none !important;}
	.tooltip-content {z-index: 1000 !important;}
	.infiniteCarousel .arrow {background: url("http://www.pdstudio.hu/malacka/carousel-btn.png") no-repeat scroll 0 0 transparent !important;}
	.infiniteCarousel .back { background-position: 0 -72px !important; left: 0 !important;}
	.infiniteCarousel .back:hover { background-position: 0 -108px !important; left: 0 !important;}
	.infiniteCarousel .forward { background-position: 0 0 !important; right: 0 !important;}
	.infiniteCarousel .forward:hover { background-position: 0 -36px !important; right: 0 !important;}
	#footer {background: #141213 !important; font-size: 80% !important; margin-top: 5px !important;  height: 45px !important;}
	#footer div:first-child {padding-top: 6px;}
	.top_text  {display: none !important;}
	#top div.padding a[href="http://malacka.ws/messages.php"] {padding-left: 10px !important;}
	div#ts_search_form {display: inline !important;}
	.quicksearch {top: 0px; right: 0px; position: relative; height: 117px; width: 442px; background: transparent url('http://www.pdstudio.hu/malacka/quicksearch_bg.png') 0 0 no-repeat; top: -137px; left: 514px;}
	.quicksearch select#search_type, .quicksearch select#categories, .quicksearch select#deadorno {display: none;}
	.quicksearch input#tsstac {position: relative; top: 57px; font: 16px arial,helvetica,sans-serif !important; height: 31px; left: 24px; width: 273px !important; border: 1px solid #fff !important; color: #0b0b0b !important;}
	.quicksearch input#submitsearchbtn {cursor: pointer; text-indent: -9999px; border: 0 !important; background: transparent url('http://www.pdstudio.hu/malacka/quicksearch_btn.png') 0 0 no-repeat !important; height: 40px; width: 100px; position: relative; top: 57px; left: 45px;}
	.quicksearch input#submitsearchbtn:hover {background: transparent url('http://www.pdstudio.hu/malacka/quicksearch_btn.png') 0 -40px no-repeat !important;}
	img#dhtmlpointer {display: none !important;}
	div#dhtmltooltip{background-color: #0b0b0b !important; border: 1px solid #cccccc !important; padding: 10px !important; border-radius: 4px;}
	img[src="http://www.pdstudio.hu/malacka/star.png"], img[src="http://www.pdstudio.hu/malacka/warned.png"] {padding-left:2px; top:-1px; position: relative;}
	*[style*="color:maroon"], *[style*="color: #a0120c"], *[color="red"], *[style*="color: #6e0501"] {color: #df3232 !important;}
	div#shouts>div:nth-child(2n) {background: #1d1d1d !important;}
	u, ins {text-decoration: none !important;}
	div#shouts span[id*="shout"] img {position: relative !important; top: 4px !important; padding: 0 3px !important;}
	]]></>).toString());

	var favicon_link_html = document.createElement('link');
	favicon_link_html.rel = 'icon';
	favicon_link_html.href = 'http://www.pdstudio.hu/malacka/favicon.ico';
	favicon_link_html.type = 'image/x-icon';

	try { 
	  document.getElementsByTagName('head')[0].appendChild( favicon_link_html ); 
	}
	catch(e) { }

	var i, str;
	var imgBinding = {
	"http://malacka.ws/include/templates/default/images/torrent_flags/download.png":"http://www.pdstudio.hu/malacka/letoltes.png",
	"http://malacka.ws/include/templates/default/images/notification_close.gif":"http://www.pdstudio.hu/malacka/note_cl.png",
	"http://malacka.ws/images/friends/offline.png":"http://www.pdstudio.hu/malacka/offline.png",
	"http://malacka.ws/images/friends/online.png":"http://www.pdstudio.hu/malacka/online.png",
	"http://malacka.ws/images/friends/Male.png":"http://www.pdstudio.hu/malacka/ferfi.png",
	"http://malacka.ws/images/friends/Female.png":"http://www.pdstudio.hu/malacka/no.png",
	"http://malacka.ws/include/templates/default/images/torrent_flags/freedownload.gif":"http://www.pdstudio.hu/malacka/free_li.png",
	"http://malacka.ws/include/templates/default/images/torrent_flags/x2.gif":"http://www.pdstudio.hu/malacka/dupla_li.png",
	"http://malacka.ws/include/templates/default/images/torrent_flags/webseeder.png":"http://www.pdstudio.hu/malacka/speed_li.png",
	"http://malacka.ws/include/templates/default/images/torrent_flags/dl.png":"http://www.pdstudio.hu/malacka/letoltes_li.png",
	"http://malacka.ws/include/templates/default/images/torrent_flags/newtorrent.gif":"http://www.pdstudio.hu/malacka/new_li.png",
	"http://malacka.ws/include/templates/default/images/torrent_flags/isnuked.gif":"http://www.pdstudio.hu/malacka/nuked_li.png",
	"http://malacka.ws/images/report2.gif":"http://www.pdstudio.hu/malacka/report.png",
	"http://malacka.ws/images/codebuttons/bold.gif":"http://www.pdstudio.hu/malacka/felkover.png",
	"http://malacka.ws/images/codebuttons/italic.gif":"http://www.pdstudio.hu/malacka/dolt.png",
	"http://malacka.ws/images/codebuttons/underline.gif":"http://www.pdstudio.hu/malacka/alahuzott.png",
	"http://malacka.ws/images/codebuttons/align_left.gif":"http://www.pdstudio.hu/malacka/balra.png",
	"http://malacka.ws/images/codebuttons/align_center.gif":"http://www.pdstudio.hu/malacka/kozepre.png",
	"http://malacka.ws/images/codebuttons/align_right.gif":"http://www.pdstudio.hu/malacka/jobbra.png",
	"http://malacka.ws/images/codebuttons/align_justify.gif":"http://www.pdstudio.hu/malacka/sorkizart.png",
	"http://malacka.ws/images/codebuttons/quote.gif":"http://www.pdstudio.hu/malacka/idezet.png",
	"http://malacka.ws/images/codebuttons/code.gif":"http://www.pdstudio.hu/malacka/kod.png",
	"http://malacka.ws/images/codebuttons/php.gif":"http://www.pdstudio.hu/malacka/phpkod.png",
	"http://malacka.ws/images/codebuttons/sql.gif":"http://www.pdstudio.hu/malacka/sqlkod.png",
	"http://malacka.ws/images/codebuttons/color.gif":"http://www.pdstudio.hu/malacka/betuszin.png",
	"http://malacka.ws/images/codebuttons/link.gif":"http://www.pdstudio.hu/malacka/link.png",
	"http://malacka.ws/images/codebuttons/image.gif":"http://www.pdstudio.hu/malacka/kep.png",
	"http://malacka.ws/images/codebuttons/email.gif":"http://www.pdstudio.hu/malacka/email.png",
	"http://malacka.ws/images/codebuttons/smilies.gif":"http://www.pdstudio.hu/malacka/smiley.png",
	"http://malacka.ws/images/categories/afro.jpg":"http://www.pdstudio.hu/malacka/kateg/afro.png",
	"http://malacka.ws/images/categories/animal.jpg":"http://www.pdstudio.hu/malacka/kateg/animal.png",
	"http://malacka.ws/images/categories/bigb_woman.jpg":"http://www.pdstudio.hu/malacka/kateg/bigblackwoman.png",
	"http://malacka.ws/images/categories/celeb.jpg":"http://www.pdstudio.hu/malacka/kateg/celeb.png",
	"http://malacka.ws/images/categories/dvd.jpg":"http://www.pdstudio.hu/malacka/kateg/dvd.png",
	"http://malacka.ws/images/categories/gangbang.jpg":"http://www.pdstudio.hu/malacka/kateg/gangbang.png",
	"http://malacka.ws/images/categories/hardcore.jpg":"http://www.pdstudio.hu/malacka/kateg/hardcore.png",
	"http://malacka.ws/images/categories/inter.jpg":"http://www.pdstudio.hu/malacka/kateg/interracial.png",
	"http://malacka.ws/images/categories/latin.jpg":"http://www.pdstudio.hu/malacka/kateg/latin.png",
	"http://malacka.ws/images/categories/mature.jpg":"http://www.pdstudio.hu/malacka/kateg/mature.png",
	"http://malacka.ws/images/categories/oral.jpg":"http://www.pdstudio.hu/malacka/kateg/oral.png",
	"http://malacka.ws/images/categories/piss-puke-scat.jpg":"http://www.pdstudio.hu/malacka/kateg/pisspukescat.png",
	"http://malacka.ws/images/categories/PRDVDHUN.jpg":"http://www.pdstudio.hu/malacka/kateg/predvdhun.png",
	"http://malacka.ws/images/categories/shemale.jpg":"http://www.pdstudio.hu/malacka/kateg/shemale.png",
	"http://malacka.ws/images/categories/squirt.jpg":"http://www.pdstudio.hu/malacka/kateg/squirt.png",
	"http://malacka.ws/images/categories/toy.jpg":"http://www.pdstudio.hu/malacka/kateg/toy.png",
	"http://malacka.ws/images/categories/amator.jpg":"http://www.pdstudio.hu/malacka/kateg/amator.png",
	"http://malacka.ws/images/categories/aprilis.jpg":"http://www.pdstudio.hu/malacka/kateg/apr1.png",
	"http://malacka.ws/images/categories/bisex-man.jpg":"http://www.pdstudio.hu/malacka/kateg/bisexmen.png",
	"http://malacka.ws/images/categories/collection.jpg":"http://www.pdstudio.hu/malacka/kateg/collection.png",
	"http://malacka.ws/images/categories/extreme.jpg":"http://www.pdstudio.hu/malacka/kateg/extrem.png",
	"http://malacka.ws/images/categories/GAY.jpg":"http://www.pdstudio.hu/malacka/kateg/gay.png",
	"http://malacka.ws/images/categories/HD.jpg":"http://www.pdstudio.hu/malacka/kateg/hd.png",
	"http://malacka.ws/images/categories/kepek.jpg":"http://www.pdstudio.hu/malacka/kateg/kepsorozat.png",
	"http://malacka.ws/images/categories/leszbi.jpg":"http://www.pdstudio.hu/malacka/kateg/leszbi.png",
	"http://malacka.ws/images/categories/milf.jpg":"http://www.pdstudio.hu/malacka/kateg/milf.png",
	"http://malacka.ws/images/categories/orgia.jpg":"http://www.pdstudio.hu/malacka/kateg/orgia.png",
	"http://malacka.ws/images/categories/pregnant.jpg":"http://www.pdstudio.hu/malacka/kateg/pregnant.png",
	"http://malacka.ws/images/categories/PRXVIDENG.jpg":"http://www.pdstudio.hu/malacka/kateg/prexvideng.png",
	"http://malacka.ws/images/categories/siterip.jpg":"http://www.pdstudio.hu/malacka/kateg/siterip.png",
	"http://malacka.ws/images/categories/szadomazo.jpg":"http://www.pdstudio.hu/malacka/kateg/szadomazo.png",
	"http://malacka.ws/images/categories/anal.jpg":"http://www.pdstudio.hu/malacka/kateg/anal.png",
	"http://malacka.ws/images/categories/azsiai.jpg":"http://www.pdstudio.hu/malacka/kateg/azsiai.png",
	"http://malacka.ws/images/categories/bizarr.jpg":"http://www.pdstudio.hu/malacka/kateg/bizarr.png",
	"http://malacka.ws/images/categories/double_p.jpg":"http://www.pdstudio.hu/malacka/kateg/doublepre.png",
	"http://malacka.ws/images/categories/Games.jpg":"http://www.pdstudio.hu/malacka/kateg/xxxgame.png",
	"http://malacka.ws/images/categories/gruppen.jpg":"http://www.pdstudio.hu/malacka/kateg/gruppen.png",
	"http://malacka.ws/images/categories/hentai.jpg":"http://www.pdstudio.hu/malacka/kateg/hentai.png",
	"http://malacka.ws/images/categories/klassz.jpg":"http://www.pdstudio.hu/malacka/kateg/klasszikus.png",
	"http://malacka.ws/images/categories/maszti.jpg":"http://www.pdstudio.hu/malacka/kateg/maszti.png",
	"http://malacka.ws/images/categories/nagymellek.jpg":"http://www.pdstudio.hu/malacka/kateg/nagymellek.png",
	"http://malacka.ws/images/categories/pack.jpg":"http://www.pdstudio.hu/malacka/kateg/pack.png",
	"http://malacka.ws/images/categories/premier-dvd-eng.jpg":"http://www.pdstudio.hu/malacka/kateg/predvdeng.png",
	"http://malacka.ws/images/categories/PRXVIDHUN.jpg":"http://www.pdstudio.hu/malacka/kateg/prexvidhun.png",
	"http://malacka.ws/images/categories/softcore.jpg":"http://www.pdstudio.hu/malacka/kateg/softcore.png",
	"http://malacka.ws/images/categories/tini01.jpg":"http://www.pdstudio.hu/malacka/kateg/tini.png",
	"http://malacka.ws/images/verified.gif":"http://www.pdstudio.hu/malacka/verified.png",
	"http://malacka.ws/include/templates/default/images/torrent_flags/silverdownload.gif":"http://www.pdstudio.hu/malacka/silver_li.png",
	"http://malacka.ws/include/templates/default/images/torrent_flags/isrequest.gif":"http://www.pdstudio.hu/malacka/req_li.png",
	"http://malacka.ws/tsf_forums/images/on.gif":"http://www.pdstudio.hu/malacka/newcomment.png",
	"http://malacka.ws/tsf_forums/images/off.gif":"http://www.pdstudio.hu/malacka/nonewcomment.png",
	"http://malacka.ws/tsf_forums/images/offlock.gif":"http://www.pdstudio.hu/malacka/lockedcomments.png",
	"http://malacka.ws/tsf_forums/images/dot.gif":"http://www.pdstudio.hu/malacka/commented.png",
	"http://malacka.ws/tsf_forums/images/lastpost.gif":"http://www.pdstudio.hu/malacka/go.png",
	"http://malacka.ws/tsf_forums/images/announcement.png":"http://www.pdstudio.hu/malacka/announcement.png",
	"http://malacka.ws/include/templates/default/images/unreadpm.gif":"http://www.pdstudio.hu/malacka/unreadpm.png",
	"http://malacka.ws/include/templates/default/images/readpm.gif":"http://www.pdstudio.hu/malacka/readpm.png",
	"http://malacka.ws/images/warned.gif":"http://www.pdstudio.hu/malacka/warned.png",
	"http://malacka.ws/images/star.gif":"http://www.pdstudio.hu/malacka/star.png",
	"http://malacka.ws/ts_shoutbox/images/donor.gif":"http://www.pdstudio.hu/malacka/star.png",
	"http://malacka.ws/images/input_error.gif":"http://www.pdstudio.hu/malacka/offline.png",
	"http://malacka.ws/images/input_true.gif":"http://www.pdstudio.hu/malacka/online.png"
	};

	var objs = document.getElementsByTagName("img");
	for (i = 0; i < objs.length; i++){
	  str = objs[i].src;
	  if (imgBinding[str]){
		 objs[i].src = imgBinding[str];
	  }
	}

	var quickSearch = "<div class=\"quicksearch\"><form id=\"searchtorrent\" name=\"searchtorrent\" action=\"/browse.php\" method=\"post\"><input type=\"hidden\" value=\"search\" name=\"do\"><span class=\"ac_holder\"><input type=\"text\" style=\"width: 250px;\" autocomplete=\"off\" onfocus=\"javascript:var options = {script: function (input) { return ('scripts/autocomplete/query.php?input='+input); },callback: function (obj) { window.location = 'details.php?id='+obj.id; }};var xml=new AutoComplete('tsstac',options);return true;\" value=\"\" id=\"tsstac\" name=\"keywords\"></span><select id=\"search_type\" name=\"search_type\"><option selected=\"selected\" value=\"t_both\">Név &amp; leírás</option></select><select id=\"categories\" name=\"category\"><option style=\"color: gray;\" value=\"0\" selected=\"selected\">(Összes kategória)</option>	</select><select id=\"deadorno\" name=\"include_dead_torrents\"><option value=\"yes\" selected=\"selected\">Halott torrentek: Igen</option></select><input id=\"submitsearchbtn\" type=\"submit\" value=\"Keresés\"></form></div>";

	function addElementAfter(node,tag,id,htm)
		  {
			var ne = document.createElement(tag);
			if(id) ne.id = id;
			if(htm) ne.innerHTML = htm;
			node.parentNode.insertBefore(ne,node.nextSibling);
		  }

	addElementAfter(document.getElementById("header"),'div','',quickSearch); 

	var target = document.getElementById("footer");
	target = target.children[target.children.length - 1];

	var aDiv = document.createElement("div");
	aDiv.innerHTML = "A témát készítette: <a class=\"copy\" target=\"_blank\" href=\"http://www.pdstudio.hu\">pdstudio.hu</a>";
	target.parentNode.insertBefore(aDiv, target);

	var headerContent = "<a class=\"toFrontpage\" href=\"index.php\" title=\"Főoldal\" alt=\"Főoldal\">Malacka Torrent</a>";
	window.document.getElementById("header").innerHTML = headerContent;		

	var url = window.location.href.toLowerCase();
	var onBonusPage = url.match(/http\:\/\/malacka\.ws\/mybonus\.php/);
	var onDetailsPage = url.match(/^http\:\/\/malacka\.ws\/details\.php/);

	if(onBonusPage) {
		addStyle('\
		.subheader { background: none repeat scroll 0 0 #FBC2DF !important; color: #0B0B0B !important; font-weight: bold; height: 30px; padding: 0 10px;}\
		tbody[id\^="collapseobj_subtitle"] tr td div {padding: 10px;} \
		');
	}
	  
	if(onDetailsPage) {
		addStyle('\
		td[width="430"] div {display: none !important;}\
		');
	}

	document.getElementById('shout_submit').value = "Küldés";
}