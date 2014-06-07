// Google Redux Script 2.0
// 2006-03-19
// Copyright (c) 2006, Tristan Dunn
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Implementation of Google Redux by Tristan Dunn
// (http://buckymatters.com/), design originally by Andy Rutledge.
// (http://andyrutledge.com/google-redux.php)
//
// Thanks to everyone for their comments and suggestions!
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey:http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Redux 2.0", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Redux Script 2.0
// @namespace     http://grs.buckymatters.com/
// @description   Implementation of Google Redux by Tristan Dunn, design concept originally by Andy Rutledge.
// @include       http://google.tld/
// @include       http://google.tld/#*
// @include       http://www.google.tld/
// @include       http://www.google.tld/#*
// @include       http://google.tld/webhp
// @include       http://google.tld/webhp#*
// @include       http://www.google.tld/webhp
// @include       http://www.google.tld/webhp#*
// ==/UserScript==

window.addEventListener("load", function(e) {
	document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('style')[0]);
	
	var logo = (document.getElementsByTagName('img')[1].src.indexOf('images/hp0.gif') != -1 || document.getElementsByTagName('img')[1].src.indexOf('images/hp1.gif') != -1 ? 'http://www.google.com/intl/en/images/logo.gif' : document.getElementsByTagName('img')[1].src);
	
	var logo_html = '<h1>Google</h1>';
	if (document.body.innerHTML.indexOf('images/hp0.gif') != -1) {
		logo_html = '<table cellpadding="0" cellspacing="0" border="0">' + document.getElementsByTagName('table')[0].innerHTML + '</table>';
	}
	
	var in_or_account = '<a href="https://www.google.com/accounts/Login">Sign in</a>';
	var out = '';
	if (document.body.innerHTML.indexOf('Sign out') != -1) {
		in_or_account = '<a href="https://www.google.com/accounts/ManageAccount" title="' + document.getElementsByTagName('b')[0].innerHTML.replace(/<(.|\n)*?>/g, '') + '">' + (1 == 1 ? document.getElementsByTagName('b')[0].innerHTML.replace(/<(.|\n)*?>/g, '') : 'My Account') + '</a>';
		out = '<a href="http://www.google.com/accounts/Logout?continue=http://www.google.com/">Sign out</a>';
	}
	
	var checkbox = '';
	if (document.getElementById('cty')) {
		checkbox = '<input type="checkbox" name="meta" id="meta" value="' + document.getElementById('cty').value + '" /><label for="meta">' + document.getElementsByTagName('label')[1].innerHTML + '</label>';
	}
	
	document.body.innerHTML = '<table border="0" cellspacing="0" width="100%"><tr><td width="100%" align="center">!logo_html!<div id="search"><table border="0" cellspacing="0"><tr><td class="tab"><a href="http://www.google.com/search" id="web" class="active">Web</a></td><td class="tab"><a href="http://blogsearch.google.com/blogsearch" id="blogs">Blogs</a></td><td class="tab"><a href="http://groups.google.com/" id="groups">Groups</a></td><td class="tab"><a href="http://images.google.com/images" id="images">Images</a></td><td class="tab"><a href="http://news.google.com/news" id="news">News</a></td><td class="tab"><a href="http://video.google.com/videosearch" id="video">Video</a></td></tr></table><form action="/search" method="get" name="f"><input type="hidden" name="complete" value="1" /><input type="hidden" name="hl" value="en" /><div class="query"><input autocomplete="off" maxlength="2048" size="55" id="q" name="q" value="" /></div><div class="submit"><input value="Google Search" name="btnG" id="btnG" type="submit" class="button" /><input value="I\'m Feeling Lucky" name="btnI" id="lucky" type="submit" class="button" /></div><div class="checkbox">!checkbox!</div></form></div><table border="0" cellspacing="0" id="misc"><tr><td><a href="/options/">More Services</a></td><td><a href="/advanced_search">Advanced Search</a></td><td><a href="/preferences">Preferences</a></td><td><a href="/language_tools">Language Tools</a></td></tr></table><div id="bottom"><table border="0" cellspacing="0"><tr><td><a href="http://darshil.deviantart.com">darshil on deviantART</a></td><td class="second"><a href="/ig">Personalized Home</a></td></tr><tr><td><a href="http://www.digg.com">digg</a></td><td class="second">!in_or_account!</td></tr><tr><td><a href="http://www.myspace.com">myspace</a></td><td class="second">!out!</td></tr></table></div></td></tr></table>';
	document.body.innerHTML = document.body.innerHTML.replace(/\!in_or_account\!/, in_or_account);
	document.body.innerHTML = document.body.innerHTML.replace(/\!out\!/, out);
	document.body.innerHTML = document.body.innerHTML.replace(/\!checkbox\!/, checkbox);
	document.body.innerHTML = document.body.innerHTML.replace(/\!logo_html\!/, logo_html);
	if (document.getElementsByTagName('h1')[0]) {
		document.getElementsByTagName('h1')[0].style.backgroundImage ='url(' + logo + ')';
	}
	
	var css = document.createTextNode('*, html {margin: 0;padding: 0;}body{background-color: #2E5FC5;background-image: url(data:image/png;base64,R0lGODlhAQC8AuYAABI+lhE9lS1exClZvS1ewxRBmixdwhM/mCBPriFQrxE9lBpIpC5fxRZDnShYuydXuSRTtCJRsRVCmxdEnitbwBlHoytcwBhGoRhFoClavhxKpyZWuCpavipbvylZvCxcwR5Mqx9NqyZVtx5MqhM/lx1LqB9NrB9OrRdEnx1LqStcwRtJpSxdwyVUtS1dwxI/lxVCnBA8lCVVtxxJpidWuRlGoSdXuhtJphlGoihXuhRBmyBOrSFQsCNSsiFRsBNAmCJRsiNTsxE+lRNAmSRUtSNRsiVUtiNSsxRAmSVVthtIpRlHohVBmxZDnBdFnytbvxdFoB1Kpy1dwiRTsxRBmR9OrB5MqRZEniRTtShYvBZDni1fxBtIpBA9lCdWuBxKphE+lhI+lR1KqCJSsiBPrx1MqhZCnChYuihZvCNTtB5Nqy5exCxcwhxJpxpHoyZWtxA8k////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABALwCAAf/gHCCg4SFhoeFcYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKPiHAxXTEKqqoBra5gQgFCYQC1trUvJC+5JAe+vz8/SENDSFQFyMk6OkxMEs8SMDBmTTBNDdgNWg1XE94TKChOTihQUBjoGBfrNTUXODhLSxX0FW4L+PhcSkor/jczAH5po6GghihiSihMwdDKiDIjRoCYqCaERRMYq5zYuGMHgo8fE5BJQDIBDx4+fERYGQEIkCJFxvToceRIkCBT0kDYCYEIFiItghpJMlSGDBFI32xYusHLAxo0Hkh9YCOHjTM5HGjVmgWNh68DworNQDYDh7McOqh90uEJhbcWJyhYsKCC7ocPKj4YMMBm714pLliwcBGYgOHDAhIL2JJ4jQAGkCEHAgA7);background-position: top;background-repeat: repeat-x;color: #000;width: 600px;margin: 0 auto;padding: 60px 0 0 0;}h1 {background-color: #FFF;background-position: top;background-repeat: no-repeat;width: 376px;height: 110px;margin: 0 auto;text-indent: -99999px;}#search {background-color: #ECF3F9;color: #000;width: 438px;margin: 20px auto 0 auto;padding: 15px;text-align: left;}#search a {background-color: #ECF3F9;color: #009;padding: 6px 8px;border-top: 1px solid #ECF3F9;font-family: Verdana, Arial, Sans-serif;font-size: 11px;font-weight: bold;text-decoration: none;display: block;}#search a.active {background-color: #FFF;color: #000;border-top: 1px solid #F00;}#search div.query {background-color: #FFF;color: #000;width: 432px;padding: 3px;}#search div.submit {text-align: center;}#search div.checkbox {padding: 10px 0 0 0;font-family: Verdana, Arial, Sans-serif;font-size: 11px;text-align: center;}#search div.checkbox label {padding: 0 0 0 4px;}#q {width: 432px;padding: 4px;border: 1px solid #BDD6EA;font-family: Verdana, Arial, Sans-serif;font-size: 12px;}input.button {background-color: #FAFAFA;margin: 6px 0 0 4px;padding: 2px 10px;border: 2px solid #96B1E6;font-family: Verdana, Arial, Sans-serif;font-size: 12px;-moz-border-radius: 6px;}#misc {width: 375px;margin: 32px auto 50px auto;list-style: none;}#misc a {background-color: #FFF;color: #009;font-family: Helvetica, Arial, Sans-serif;font-size: 12px;text-decoration: none;}#misc a:hover {border-bottom: 1px solid #009;}#misc td {text-align: center;}#bottom {background-color: #1244A7;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURf///wAAAFXC034AAAAMSURBVHjaYmAACDAAAAIAAU9tWeEAAAAASUVORK5CYII=);background-position: 50% 0%;background-repeat: repeat-y;color: #FFF;width: 418px;margin: 0 auto;padding: 0 20px;border-top: 10px solid #1244A7;border-bottom: 10px solid #1244A7;font-family: Helvetica, Arial, Sans-serif;}#bottom td {width: 180px;}#bottom td.second {background-color: transparent !important;padding: 0 0 0 40px;}#bottom a {background-color: #1244A7;color: #FFF;width: 180px;padding: 5px;font-size: 12px;text-decoration: none !important;display: block;}#bottom a:hover {background-color: #2555B7;color: #FFF;}');
	var style = document.createElement("style");
	style.type = "text/css";
	style.appendChild(css);
	document.getElementsByTagName('head')[0].appendChild(style);
	
	if (checkbox != '') {
		document.getElementById('misc').style.margin = '24px auto 45px auto;';
	}
	var js = document.createElement("script");
	js.setAttribute("src", "http://www.google.com/ac.js");
	document.body.appendChild(js);
	
	js.addEventListener("load", function() {
		var f = unsafeWindow.document.f;
		unsafeWindow.InstallAC(f, f.q, f.btnG,"search","en");
	}, false);
		
	var current = 'web';
	if (current != 'web') { document.getElementById('lucky').style.display = 'none'; }
	document.getElementById(current).className = 'active';
	addEvent(document.getElementById('blogs'), 'click', activate);
	addEvent(document.getElementById('groups'), 'click', activate);
	addEvent(document.getElementById('images'), 'click', activate);
	addEvent(document.getElementById('news'), 'click', activate);
	addEvent(document.getElementById('video'), 'click', activate);
	addEvent(document.getElementById('web'), 'click', activate);
		
	function activate(e) {
		document.getElementById(current).className = '';
		current = this.id;
		document.getElementsByTagName('form')[0].action = this.href;
		document.getElementById(current).className = 'active';
		document.getElementById('q').focus();
		if (current != 'web') { document.getElementById('lucky').style.display = 'none'; }
		else { document.getElementById('lucky').style.display = 'inline'; }
		e.preventDefault();
		return false;
	}
	
	// By John Resig -- http://ejohn.org/projects/flexible-javascript-events/
	function addEvent(obj,type,fn){if(obj.attachEvent){obj['e'+type+fn]=fn;obj[type+fn]=function(){obj['e'+type+fn](window.event);};obj.attachEvent('on'+type,obj[type+fn]);}else obj.addEventListener(type,fn,false);}
	
	document.getElementById('q').focus();
}, false);