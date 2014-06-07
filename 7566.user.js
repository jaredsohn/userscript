// ---*GNU*---
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// http://www.gnu.org/copyleft/gpl.html
// ---*---

// Revised by Andrew Pennebaker
// 16 Feb 2007
// Replaced include/exclude lists from ... google.tld ... with ... google.com ...
// Replaced broken image link with 07designs logo

// ==UserScript==
// @name			Google Dark 2
// @namespace		http://userscripts.org/scripts/show/7566
// @description		An extension of the original Google Dark, found at http://www.07designs.com/gdark/
// @include			http://google.com/
// @include			http://www.google.com/
// @include			http://images.google.com/*
// @include			http://*.google.com/webhp*
// @include			http://*.google.com/imghp*
// @include			http://*.google.com/search*
// @include			http://*.google.com/images*
// @exclude			http://*.google.com/options/*
// @exclude			http://*.google.com/advanced_search*
// @exclude			http://*.google.com/preferences*
// @exclude			http://*.google.com/language_tools*
// @version			1.2
// ==/UserScript==

if (window.location.search=="" || window.location.pathname=="/webhp" || window.location.pathname=="/imghp") {
	var aQuery=window.location.search.split("&");
	var sQuery="";

	for (i=0; i<aQuery.length; i++) {
		result=aQuery[i].indexOf("q=");
		if (result!=-1) {
			sQuery=aQuery[i].substr(2);
		}
	}

	function qs(el) {
		if (window.RegExp && window.encodeURIComponent) {
			var ue=el.href;
			var qe=encodeURIComponent(document.f.q.value);

			if(ue.indexOf("q=")!=-1) {
				el.href=ue.replace(new RegExp("q=[^&$]*"), "q="+qe);
			}
			else {
				el.href=ue+"&q="+qe;
			}
		}

		return 1;
	}

	sQuery=sQuery.replace('%20', ' ');

	// original google dark script
	// created by Jarques "Retro_X" Pretorius
	// first released at http://www.07designs.com/gdark/
	window.addEventListener("load", function(e) {
		document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('style')[0]);

		var logo=(document.getElementsByTagName('img')[1].src.indexOf('images/hp0.gif')!=-1 || document.getElementsByTagName('img')[1].src.indexOf('images/hp1.gif')!=-1 ? 'http://www.google.com/intl/en/images/logo.gif' : document.getElementsByTagName('img')[1].src);

		var logo_html='<h1>Google</h1>';
		if (document.body.innerHTML.indexOf('images/hp0.gif')!=-1) {
			logo_html='<table cellpadding="0" cellspacing="0" border="0">' + document.getElementsByTagName('table')[0].innerHTML + '</table>';
		}

		var in_or_account='<a href="https://www.google.com/accounts/Login">Sign in</a>';
		var out='';
		if (document.body.innerHTML.indexOf('Sign out')!=-1) {
			in_or_account='<a href="https://www.google.com/accounts/ManageAccount" title="' + document.getElementsByTagName('b')[0].innerHTML.replace(/<(.|\n)*?>/g, '') + '">' + (0 == 1 ? document.getElementsByTagName('b')[0].innerHTML.replace(/<(.|\n)*?>/g, '') : 'My Account') + '</a>';
			out='<a href="http://www.google.com/accounts/Logout?continue=http://www.google.com/">Sign out</a>';
		}

		var checkbox='';
		if (document.getElementById('cty')) {
			checkbox='<input type="checkbox" name="meta" id="meta" value="' + document.getElementById('cty').value + '" /><label for="meta">' + document.getElementsByTagName('label')[1].innerHTML + '</label>';
		}

		if (window.location.hostname=="images.google.com") {
			document.body.innerHTML='<table border="0" cellspacing="0" width="100%"><tr><td width="100%" align="center"><img src="http://07designs.com/GDark/img/logo.jpg"/><div id="search"><table border="0" cellspacing="0"><tr><td class="tab"><a href="http://www.google.com/webhp?hl=en&tab=iw" id="web" onClick="return qs(this);">Web</a></td><td class="tab"><a href="/imghp?hl=en&tab=wi" id="images" class="active" onClick="return qs(this);">Images</a></td><td class="tab"><a href="http://groups.google.com/grphp?hl=en&tab=wg" id="groups" onClick="return qs(this);">Groups</a></td><td class="tab"><a href="http://news.google.com/nwshp?hl=en&tab=wn" id="news" onClick="return qs(this);">News</a></td><td class="tab"><a href="http://froogle.google.com/frghp?hl=en&tab=wf" id="froogle" onClick="return qs(this);">Froogle</a></td><td class="tab"><a href="http://local.google.com/local?hl=en&tab=wl" id="local" onClick="return qs(this);">Local</a></td></tr></table><form action="/images" method="get" name="f"><div class="query"><input maxlength="2048" size="55" id="q" name="q" value="' + sQuery + '" /></div><div class="submit"><input value="Search" name="btnG" id="btnG" type="submit" class="button" /></div><div class="checkbox" style="display:none">!checkbox!</div></form></div><table border="0" cellspacing="0" id="misc"><tr><td><a href="/options/">More Services</a></td><td><a href="/advanced_search">Advanced Search</a></td><td><a href="/preferences">Preferences</a></td><td><a href="/language_tools">Language Tools</a></td></tr></table><div id="bottom"><table border="0" cellspacing="0"><tr><td><div align="right"><a href="http://www.google.com/ads/">Advertising Programs</a></div></td><td class="second"><a href="/ig">Personalized Home</a></td></tr><tr><td><div align="right"><a href="http://www.google.com/services/">Business Solutions</a></div></td><td class="second">!in_or_account!</td></tr><tr><td><div align="right"><a href="http://www.google.com/about.html">About Google</a></div></td><td class="second">!out!</td></tr></table></div></td></tr></table>';
		}
		else {
			document.body.innerHTML='<table border="0" cellspacing="0" width="100%"><tr><td width="100%" align="center"><img src="http://07designs.com/GDark/img/logo.jpg"/><div id="search"><table border="0" cellspacing="0"><tr><td class="tab"><a href="http://www.google.com/webhp?hl=en&tab=iw" id="web" class="active" onClick="return qs(this);">Web</a></td><td class="tab"><a href="/imghp?hl=en&tab=wi" id="images" onClick="return qs(this);">Images</a></td><td class="tab"><a href="http://groups.google.com/grphp?hl=en&tab=wg" id="groups" onClick="return qs(this);">Groups</a></td><td class="tab"><a href="http://news.google.com/nwshp?hl=en&tab=wn" id="news" onClick="return qs(this);">News</a></td><td class="tab"><a href="http://froogle.google.com/frghp?hl=en&tab=wf" id="froogle" onClick="return qs(this);">Froogle</a></td><td class="tab"><a href="http://local.google.com/local?hl=en&tab=wl" id="local" onClick="return qs(this);">Local</a></td></tr></table><form action="/search" method="get" name="f"><div class="query"><input maxlength="2048" size="55" id="q" name="q" value="' + sQuery + '" /></div><div class="submit"><input value="Search" name="btnG" id="btnG" type="submit" class="button" /></div><div class="checkbox" style="display:none">!checkbox!</div></form></div><table border="0" cellspacing="0" id="misc"><tr><td><a href="/options/">More Services</a></td><td><a href="/advanced_search">Advanced Search</a></td><td><a href="/preferences">Preferences</a></td><td><a href="/language_tools">Language Tools</a></td></tr></table><div id="bottom"><table border="0" cellspacing="0"><tr><td><div align="right"><a href="http://www.google.com/ads/">Advertising Programs</a></div></td><td class="second"><a href="/ig">Personalized Home</a></td></tr><tr><td><div align="right"><a href="http://www.google.com/services/">Business Solutions</a></div></td><td class="second">!in_or_account!</td></tr><tr><td><div align="right"><a href="http://www.google.com/about.html">About Google</a></div></td><td class="second">!out!</td></tr></table></div></td></tr></table>';
		}

		document.body.innerHTML=document.body.innerHTML.replace(/\!in_or_account\!/, in_or_account);
		document.body.innerHTML=document.body.innerHTML.replace(/\!out\!/, out);
		document.body.innerHTML=document.body.innerHTML.replace(/\!checkbox\!/, checkbox);
		document.body.innerHTML=document.body.innerHTML.replace(/\!logo_html\!/, logo_html);
		if (document.getElementsByTagName('h1')[0]) {
			document.getElementsByTagName('h1')[0].style.backgroundImage ='url(' + logo + ')';
		}

		var css=document.createTextNode('*, html {margin: 0;padding: 0;}body{background: #000;color: #000;width: 600px;margin: 0 auto;padding: 60px 0 0 0;}h1 {background-color: #000;width: 276px;height: 110px;margin: 0 auto;text-indent: -99999px;}#search {background-color: #0E1116;color: #000;width: 438px;margin: 20px auto 0 auto;padding-bottom: 5px;}#search a {background-color: #0E1116;color: #494E52;padding: 6px 8px;font-family: Tahoma, Verdana, Arial, Sans-serif;font-size: 14px;text-decoration: none;display: block;}#search a.active {background-color: #22252A;color: #1D9ADA;}#search div.query {background: #24292F url(http://userscripts.corhol.com/google-dark/bg.gif) no-repeat left bottom;color: #7A8187;width: 308px;padding: 20px 65px 55px 65px;}#search div.submit {text-align: right; margin-right:70px; margin-top:-48px;}#search div.checkbox {font-family: Verdana, Arial, Sans-serif;font-size: 11px;text-align: center;}#search div.checkbox {padding: 10px 0 0 0;}#search div.checkbox label {padding: 0 0 0 4px;}#q {width: 300px;padding: 5px;border: 1px solid #000;font-family: Verdana, Arial, Sans-serif;font-size: 24px;color:#7B828A;}input.button {background-color: #101A26;margin: 6px 0 0 4px;padding: 2px 10px;border: 1px solid #000;font-family: Verdana, Arial, Sans-serif;font-size: 16px;color:#fff;font-weight:bold;}#misc {width: 375px;margin: 32px auto 50px auto;list-style: none;}#misc a {color: #FF00CC;font-family: Helvetica, Arial, Sans-serif;font-size: 12px;text-decoration: none;}#misc a:hover {border-bottom: 1px solid #FF00CC;}#misc td {text-align: center;}#bottom {color: #2399E3;width: 418px;margin: 0 auto;padding: 0 20px;font-family: Helvetica, Arial, Sans-serif;}#bottom td {width: 180px;}#bottom td.second {background-color: transparent !important;padding: 0 0 0 40px;}#bottom a {color: #2399E3;width: 180px;padding: 5px;font-size: 12px;text-decoration: none !important;display: block;}#bottom a:hover {color: #036;}')
		var style=document.createElement("style");
		style.type="text/css";
		style.appendChild(css);
		document.getElementsByTagName('head')[0].appendChild(style);

		if (checkbox!='') {
			document.getElementById('misc').style.margin='24px auto 45px auto;';
		}

		document.getElementById('q').focus();

		function activate(e) {
			document.getElementById(current).className='';
			current=this.id;
			document.getElementsByTagName('form')[0].action=this.href;
			document.getElementById(current).className='active';
			document.getElementById('q').focus();

			if (current!='web') {
				document.getElementById('lucky').style.display='none';
			}
			else {
				document.getElementById('lucky').style.display='inline';
			}
			e.preventDefault();

			return false;
		}

		function addEvent(obj, type, fn) {
			if (obj.attachEvent) {
				obj['e'+type+fn]=fn;
				obj[type+fn]=function() {
					obj['e'+type+fn](window.event);
				};

				obj.attachEvent('on'+type, obj[type+fn]);
			}
			else obj.addEventListener(type, fn, false);
		}
	},
	false);
}

if (window.location.pathname=="/search") {
	for (i=1; i<document.getElementsByTagName('input').length; i++) {
		if (document.getElementsByTagName('input')[i].title=='Search') {
			vQuery=document.getElementsByTagName('input')[i].value;
		}
	}

	// function for appending CSS to document
	function addGlobalStyle(css) {
		var head, style;
		head=document.getElementsByTagName('head')[0];
		if (!head) {
			return;
		}

		style=document.createElement('style');
		style.type='text/css';
		style.innerHTML=css;
		head.appendChild(style);
	}

	// removes default CSS from page
	document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('style')[0]);

	// adds CSS to page
	addGlobalStyle('body { background: #000000; color: #9A9E9F; font-family: Arial, sans-serif; margin: auto 20px auto 10px; } #tpa1, #tpa2, .ch { display: none; } font.p { font-size: 12px; } a { font-size: 12px; color: #1D9ADA; text-decoration: none; } a:hover { text-decoration: underline; } p div { margin-top: 20px; } .info { background: #22252A; padding: 7px; border-top: 1px solid #3366CC; } .search { width: 40px; height: 35px; margin: 5px 10px 5px 10px; } p.g { background: #12171D; padding: 10px; } .g b { font-weight: normal; } .g .l { font-family: Verdana, Arial, sans-serif, serif; font-size: 18px; line-height: 28px; color: #1D9ADA; text-decoration: none; } .g .l:hover { color: #003366; } .g .l:visited { color: #336699; } .g .j { width: 650px; color: #9A9E9F; } .g .j a, .g .fl { font-family: Arial, sans-serif; font-size: 12px; color: #FF00CC; text-decoration: none; } .g .j a:hover, .g .fl:hover { text-decoration: underline; } .g .sm { display: block; margin: 10px 0 0 25px; } .g font { font-family: Arial, sans-serif; font-size: 12px; line-height: 20px; } .tab { padding: 0; } .tab a { background-color: #0E1116;color: #494E52;padding: 6px 8px;font-family: Tahoma, Verdana, Arial, Sans-serif;font-size: 14px;text-decoration: none;display: block; } .tab a.active { background-color: #22252A;color: #1D9ADA; } .query { background: #24292F url(http://userscripts.corhol.com/google-dark/bg.gif) no-repeat left bottom;color: #7A8187;width: 308px;padding: 20px 65px 55px 65px; } #q { width: 300px;padding: 5px;border: 1px solid #000;font-family: Verdana, Arial, Sans-serif;font-size: 24px;color:#7B828A; } input.button {background-color: #101A26;margin: 6px 0 0 4px;padding: 2px 10px;border: 1px solid #000;font-family: Verdana, Arial, Sans-serif;font-size: 16px;color:#fff;font-weight:bold;} div.submit { width: 365px; text-align: right; margin-right:70px; margin-top:-48px;} #misc {width: 375px; margin: 5px 0 9px 0; text-align: center; } #misc a { font-family: Arial, sans-serif; font-size: 12px; color: #FF00CC; text-decoration: none; } #misc a:hover { text-decoration: underline; } .logo { margin: 40px 20px 0 0; }');

	// swaps out the Google logo
	document.getElementsByTagName('img')[1].width='148';
	document.getElementsByTagName('img')[1].height='59';
	document.getElementsByTagName('img')[1].className='logo';
	document.getElementsByTagName('img')[1].src='http://07designs.com/GDark/img/logo.jpg';
	document.getElementsByTagName('img')[1].parentNode.href='http://google.com/';

	// creates the top-most search area
	document.getElementsByTagName('td')[4].innerHTML='<table border="0" cellspacing="0" style="margin-left: 200px;"><div id="search"><table border="0" cellspacing="0"><tr><td class="tab"><a href="/webhp?hl=en&tab=iw&q=' + vQuery + '" id="web" class="active">Web</a></td><td class="tab"><a href="/imghp?hl=en&tab=wi&q=' + vQuery + '" id="images">Images</a></td><td class="tab"><a href="http://groups.google.com/" id="groups">Groups</a></td><td class="tab"><a href="http://news.google.com/news" id="news">News</a></td><td class="tab"><a href="http://froogle.google.com/froogle" id="froogle">Froogle</a></td><td class="tab"><a href="http://maps.google.com/maphp?hl=en&tab=wl&q=" id="maps">Maps</a></td><td class="tab"><a href="http://www.google.com/intl/en/options/" id="more">more &raquo;</a></td></tr></table><form action="/search" method="get" name="f"><div class="query"><input maxlength="2048" size="55" id="q" name="q" value="" /></div><div class="submit"><input value="Search" name="btnG" id="btnG" type="submit" class="button" /></div><div class="checkbox" style="display:none">!checkbox!</div></form></div><table border="0" cellspacing="0" id="misc"><tr><td><a href="/advanced_search">Advanced Search</a></td><td><a href="/preferences">Preferences</a></td></tr></table>';
	document.getElementsByTagName('table')[5].innerHTML='';

	// replaces various default images
	for (i=1; i<document.getElementsByTagName('img').length; i++) {
		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/images/smh_icon.gif" ) {
			document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/search.gif';
			document.getElementsByTagName('img')[i].className='search';
		}

		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_previous.gif") {
			document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/g_back.gif';
		}

		if ( document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_first.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/g.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_current.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/o.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_page.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/oo.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_next.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/gle_forward.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_last.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/gle.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://www.google.com/images/promo_right.gif" ) { document.getElementsByTagName('img')[i].width = '0'; document.getElementsByTagName('img')[i].height = '0'; }
		if ( document.getElementsByTagName('img')[i].src=="http://www.google.com/images/promo_left.gif" ) { document.getElementsByTagName('img')[i].width = '0'; document.getElementsByTagName('img')[i].height = '0'; }
		if ( document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/images/smh_icon.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/search.gif'; document.getElementsByTagName('img')[i].className = 'search'; }
		if ( document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_previous.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/g_back.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_first.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/g.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_current.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/o.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_page.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/oo.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_next.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/gle_forward.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_last.gif" ) { document.getElementsByTagName('img')[i].src = 'http://userscripts.corhol.com/google-dark/gle.gif'; }
		if ( document.getElementsByTagName('img')[i].src=="http://images.google.com/images/promo_right.gif" ) { document.getElementsByTagName('img')[i].width = '0'; document.getElementsByTagName('img')[i].height = '0'; }
		if ( document.getElementsByTagName('img')[i].src=="http://images.google.com/images/promo_left.gif" ) { document.getElementsByTagName('img')[i].width = '0'; document.getElementsByTagName('img')[i].height = '0'; }
	}

	// alters various misc areas
	for (i=1; i<document.getElementsByTagName('td').length; i++) { if ( document.getElementsByTagName('td')[i].bgColor=='#e5ecf9') { document.getElementsByTagName('td')[i].className='info'; } }
	for (i=1; i<document.getElementsByTagName('td').length; i++) { if ( document.getElementsByTagName('td')[i].bgColor=='#3366cc') { document.getElementsByTagName('td')[i].bgColor='#000000'; } }

	// shows original search string in top search box
	document.getElementById('q').value = vQuery;

	// removes the annoying sponsored links
	for (i=1; i<document.getElementsByTagName('table').length; i++) {
		if (document.getElementsByTagName('table')[i].bgColor=='#ffffff') {
			document.getElementsByTagName('table')[i].innerHTML='';
		}
	}
}

if (window.location.pathname=="/images") {
	for (i=1; i<document.getElementsByTagName('input').length; i++) {
		if (document.getElementsByTagName('input')[i].title=='Search') {
			vQuery=document.getElementsByTagName('input')[i].value;
		}
	}

	// function for appending CSS to document
	function addGlobalStyle(css) {
		var head, style;
		head=document.getElementsByTagName('head')[0];
		if (!head) {
			return;
		}

		style=document.createElement('style');
		style.type='text/css';
		style.innerHTML=css;
		head.appendChild(style);
	}

	// removes default CSS from page
	document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('style')[0]);
	
	// adds CSS to page
	addGlobalStyle('body { background: #000000; color: #9A9E9F; font-family: Arial, sans-serif; margin: auto 20px auto 10px; } img { border: 0px; } #tpa1, #tpa2, .ch { display: none; } font.p { font-size: 12px; } a { font-size: 12px; color: #1D9ADA; text-decoration: none; } a:hover { text-decoration: underline; } p div { margin-top: 20px; } .info { border-top: 1px solid #3366CC; } .info td { background: #22252A; padding: 7px; } .search { width: 40px; height: 35px; margin: 5px 10px 5px 10px; } p.g { background: #12171D; padding: 10px; } .g b { font-weight: normal; } .g .l { font-family: Verdana, Arial, sans-serif, serif; font-size: 18px; line-height: 28px; color: #1D9ADA; text-decoration: none; } .g .l:hover { color: #003366; } .g .j { width: 650px; color: #9A9E9F; } .g .j a, .g .fl { font-family: Arial, sans-serif; font-size: 12px; color: #FF00CC; text-decoration: none; } .g .j a:hover, .g .fl:hover { text-decoration: underline; } .g .sm { display: block; margin: 10px 0 0 25px; } .g font { font-family: Arial, sans-serif; font-size: 12px; line-height: 20px; } .tab { padding: 0; } .tab a { background-color: #0E1116;color: #494E52;padding: 6px 8px;font-family: Tahoma, Verdana, Arial, Sans-serif;font-size: 14px;text-decoration: none;display: block; } .tab a.active { background-color: #22252A;color: #1D9ADA; } .query { background: #24292F url(http://userscripts.corhol.com/google-dark/bg.gif) no-repeat left bottom;color: #7A8187;width: 308px;padding: 20px 65px 55px 65px; } #q { width: 300px;padding: 5px;border: 1px solid #000;font-family: Verdana, Arial, Sans-serif;font-size: 24px;color:#7B828A; } input.button {background-color: #101A26;margin: 6px 0 0 4px;padding: 2px 10px;border: 1px solid #000;font-family: Verdana, Arial, Sans-serif;font-size: 16px;color:#fff;font-weight:bold;} div.submit { width: 365px; text-align: right; margin-right:70px; margin-top:-48px;} #misc {width: 375px; margin: 5px 0 9px 0; text-align: center; } #misc a { font-family: Arial, sans-serif; font-size: 12px; color: #FF00CC; text-decoration: none; } #misc a:hover { text-decoration: underline; } .logo { margin: 40px 20px 0 0; }');
	
	// swaps out the Google logo
	document.getElementsByTagName('img')[1].width='148';
	document.getElementsByTagName('img')[1].height='59';
	document.getElementsByTagName('img')[1].className='logo';
	document.getElementsByTagName('img')[1].src='http://07designs.com/GDark/img/logo.jpg';
	document.getElementsByTagName('img')[1].parentNode.href = 'http://google.com/';
	
	// creates the top-most search area
	document.getElementsByTagName('td')[4].innerHTML='<table border="0" cellspacing="0" style="margin-left: 200px;"><div id="search"><table border="0" cellspacing="0"><tr><td class="tab"><a href="/webhp?hl=en&tab=iw&q=' + vQuery + '" id="web">Web</a></td><td class="tab"><a href="/imghp?hl=en&tab=wi&q=' + vQuery + '" id="images" class="active">Images</a></td><td class="tab"><a href="http://groups.google.com/" id="groups">Groups</a></td><td class="tab"><a href="http://news.google.com/news" id="news">News</a></td><td class="tab"><a href="http://froogle.google.com/froogle" id="froogle">Froogle</a></td><td class="tab"><a href="http://maps.google.com/maphp?hl=en&tab=wl&q=" id="maps">Maps</a></td><td class="tab"><a href="http://www.google.com/intl/en/options/" id="more">more &raquo;</a></td></tr></table><form action="/images" method="get" name="f"><div class="query"><input maxlength="2048" size="55" id="q" name="q" value="" /></div><div class="submit"><input value="Search" name="btnG" id="btnG" type="submit" class="button" /></div><div class="checkbox" style="display:none">!checkbox!</div></form></div><table border="0" cellspacing="0" id="misc"><tr><td><a href="/advanced_search">Advanced Search</a></td><td><a href="/preferences">Preferences</a></td></tr></table>';
	document.getElementsByTagName('table')[5].innerHTML='';

	// replaces various default images
	for (i=1; i<document.getElementsByTagName('img').length; i++) {
		if (document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/images/smh_icon.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/search.gif'; document.getElementsByTagName('img')[i].className='search'; }
		if (document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_previous.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/g_back.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_first.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/g.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_current.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/o.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_page.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/oo.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_next.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/gle_forward.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://images.google.com/intl/en/nav_last.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/gle.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://images.google.com/images/promo_right.gif" ) { document.getElementsByTagName('img')[i].width='0'; document.getElementsByTagName('img')[i].height = '0'; }
		if (document.getElementsByTagName('img')[i].src=="http://images.google.com/images/promo_left.gif" ) { document.getElementsByTagName('img')[i].width='0'; document.getElementsByTagName('img')[i].height = '0'; }
		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/images/smh_icon.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/search.gif'; document.getElementsByTagName('img')[i].className='search'; }
		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_previous.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/g_back.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_first.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/g.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_current.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/o.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_page.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/oo.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_next.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/gle_forward.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/intl/en/nav_last.gif" ) { document.getElementsByTagName('img')[i].src='http://userscripts.corhol.com/google-dark/gle.gif'; }
		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/images/promo_right.gif" ) { document.getElementsByTagName('img')[i].width='0'; document.getElementsByTagName('img')[i].height='0'; }
		if (document.getElementsByTagName('img')[i].src=="http://www.google.com/images/promo_left.gif" ) { document.getElementsByTagName('img')[i].width='0'; document.getElementsByTagName('img')[i].height='0'; }
	}

	// alters various misc areas
	for (i=1; i<document.getElementsByTagName('td').length; i++) { if (document.getElementsByTagName('td')[i].bgColor=='#bbcced') { vParent=document.getElementsByTagName('td')[i].parentNode; vParent2=vParent.parentNode; vParent2.parentNode.className='info'; } }
	for (i=1; i<document.getElementsByTagName('td').length; i++) { if (document.getElementsByTagName('td')[i].bgColor=='#3366cc') { document.getElementsByTagName('td')[i].bgColor='#000000'; } }

	// shows original search string in top search box
	document.getElementById('q').value=vQuery;

	// removes the annoying sponsored links
	for( i = 1; i < document.getElementsByTagName('table').length; i++) { if (document.getElementsByTagName('table')[i].bgColor=='#ffffff') { document.getElementsByTagName('table')[i].innerHTML=''; } }
}