// ==UserScript==
// @name	Article Tools for Instapaper Threestyled
// @version	1.25
// @description Adds a floating palette of buttons to articles which allows you to go back, archive and return
// @description to read later, delete, toggle auto-scroll, or star an article.
// @include     http://www.instapaper.com/text?u=*
// @copyright 	2009+, ElasticThreads (http://elasticthreads.tumblr.com/)
// @license	(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==
var hist = document.referrer,
	ecDiv = document.getElementById('editing_controls'),
	ecIH = ecDiv.innerHTML,
	aPos = ecIH.indexOf('/skip/'),
	aPos = aPos + 6,
	bPos = ecIH.indexOf('">Archive'),
	artID = ecIH.substring(aPos,bPos);
	skipStr = 'http://www.instapaper.com/skip/' + artID,
	starStr = 'http://www.instapaper.com/star_toggle/' + artID,
	delStr = 'http://www.instapaper.com/delete/' + artID;
	if (hist.indexOf('http')==-1){
		hist = 'http://www.instapaper.com/u';
	}
	var archtools = document.createElement("div");
	archtools.id = "readTbarr";
	archtools.innerHTML = "\
	<div><a href=" + hist + " title='go back' id='return-now'> &#8592;</a>\
		<a href=" + skipStr + " title='archive and return to read later' id='archive-return'>&#8599;</a>\
		<a href=" + starStr + " title='star this article' id='star-this'>&#65290;</a>\
		<a href=" + delStr + " title='delete this article and return to read later' id='del-this'>&#8709;</a>\
		<a href='javascript:togglescrolling()' title='toggle auto-scroll' id='scroll-tog'>&#8711;</a><\div>";
	var str = document.getElementById('story'); 
	str.parentNode.insertBefore(archtools, str);
	var heads = document.getElementsByTagName("head");
	var cssnode = document.createElement("style");
	var css ="*{}div#story{padding-left:100px !important;}#readTbarr{position:fixed !important;z-index:100 !important;top:132px !important;left:5px !important;}#readTbarr a{opacity:.35;text-indent:0px !important;line-height:28px;font-family:serif !important;font-style: normal;font-weight: normal;font-size:22px;text-decoration:none;}#readTbarr a:visited{display:none;}#archive-return{background:#afafaf !important;margin-bottom:10px !important;font-weight:bold !important;-webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style: solid;-moz-border-radius:4px;color:#FFFFFF !important;display:block !important;padding:0 !important;width:26px !important;height:26px;text-align:center;font-size:19px !important;}#del-this{background:#afafaf !important;margin-bottom:10px !important;font-weight:bold !important;-webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style: solid;-moz-border-radius:4px;color:#FFFFFF !important;display:block;padding:0 !important;width:26px !important;height:26px;text-align:center;-webkit-transform: rotate(90deg);-moz-transform: rotate(90deg);}#star-this{background:#afafaf !important;margin-bottom:10px !important;font-weight:bold !important;-webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style: solid;-moz-border-radius:4px;color:#FFFFFF !important;display:block;padding:0 !important;width:26px !important;height:26px;text-align:center;}#return-now{background:#afafaf !important;margin-bottom:10px !important;font-weight:bold !important;-webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style:solid;-moz-border-radius:4px;color:#FFFFFF !important;display:block !important;padding:0 !important;width:26px !important;height:26px;text-align:center;opacity:.35 !important;line-height:24px !important;}#scroll-tog{background:#afafaf !important;margin-bottom:10px !important; font-weight:bold !important;-webkit-border-radius:4px;border-color:#4e4e4e;border-width:.07em;border-style:solid;-moz-border-radius:4px;color:#FFFFFF !important;display:block !important;padding:0 !important;width:26px !important;height:26px;text-align:center;line-height:24px !important;opacity:.35 !important;}#readTbarr a:hover{opacity:1 !important;}";
		cssnode.type = "text/css";
		cssnode.appendChild(document.createTextNode(css));
		heads[0].appendChild(cssnode);
		var jsnode = document.createElement("SCRIPT");
		var scrolljs = "\
			var goscrolling = false;\
			var lastoffset = pageYOffset;\
			var aktiv = window.setInterval(scroll,150);\
			function scroll() {\
				if (goscrolling == true) {lastoffset = pageYOffset; window.scrollBy(0,1);}\
				if (lastoffset == pageYOffset) {goscrolling = false;}\
				}\
			function togglescrolling() {\
				document.getElementsByTagName('body')[0].focus();\
				if (goscrolling == false) { goscrolling = true;}\
				else {goscrolling = false;}\
		}";
		scrolljs.id = "togscroll";
		jsnode.type = "text/javascript";
		jsnode.appendChild(document.createTextNode(scrolljs));
		heads[0].appendChild(jsnode);
