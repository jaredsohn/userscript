// TV Catchup - change tv guide
// version 1.1 BETA!
//
// --------------------------------------------------------------------
//
// Please note, XPath hasn't been used, and a javascript function available in Firefox has been defined here; this is because this script has been optimised for Chrome.
// ==UserScript==
// @name          TV Catchup
// @namespace     http://www.tvcatchup.com/
// @description   make TV catchup use TV guide UK
// @include       http://www.tvcatchup.com/*
// @include       http://*.tvcatchup.com/*
// @include       http://tvcatchup.com/*
// @include       http://www.tvguide.co.uk/*
// @include       http://tvguide.co.uk/*
// @include       http://*.tvguide.co.uk/*
// ==/UserScript==

(function() {
    changeURL();
})();


function changeURL() {
	var mydomain=window.location.href.match(/:\/\/(.[^/]+)/)[1];
	if (mydomain=="www.tvcatchup.com"||mydomain=="tvcatchup.com") {
		changeGURL();
	} else {
		addCSS();
		logoMe();
		changeChannel();
	}
	if (document.location.href=="http://www.tvcatchup.com/guide.html") {
		window.location.href = "http://www.tvguide.co.uk/";
	}
}

function changeGURL() {
	var links = document.getElementsByTagName('a');
	for (i=0; i<links.length; i++) {
		if (links[i].getAttribute('href')=="guide.html") {
			links[i].setAttribute('href','http://www.tvguide.co.uk/');
		}
	}
}

function logoMe() {
	var logo = document.createElement("div");
	logo.innerHTML = '<script type="text/javascript" src="http://inskin.vo.llnwd.net/o21/isfe/4.1/js/base/api/pageskin.js"></script>         <script type="text/javascript">         </script> <div style="width:100%;background: #252525 url(http://static.tvcatchup.com/images/themes/grey/theme_background.png) repeat-x top;"><div id="tvcatchup"> <div id="header" class="centre"> <a href="/" class="logo no-text">TVCatchup - Watch Live TV On Computer or iphone</a><ul><li id="t-home"><a href="http://www.tvcatchup.com/" title="Home">Home</a></li>			<li id="t-channels"><a href="http://www.tvcatchup.com/channels.html" title="Channels">Channels</a></li>			<li id="t-guide"><a href="http://www.tvguide.co.uk/" title="TV Guide" class="active">TV Guide</a></li>			<li id="t-iphone"><a href="http://www.tvcatchup.com/iphone.html" title="iPhone">iPhone</a></li>			<li id="t-ipad"><a href="http://www.tvcatchup.com/ipad.html" title="iPad">iPad</a></li>			<li id="t-forums"><a href="http://forums.tvcatchup.com" title="Forums">Forums</a></li></ul> <div></div></div>';
	document.body.insertBefore(logo, document.body.firstChild);
}
function includeCSS(p_file) {
	var v_css  = document.createElement('link');
	v_css.rel = 'stylesheet';
	v_css.type = 'text/css';
	v_css.href = p_file;
	document.getElementsByTagName('head')[0].appendChild(v_css);
}
function addCSS() {
	// Unfortunately, the CSS mucks up the page
	//includeCSS("http://static.tvcatchup.com/new_style.css");
	//includeCSS("http://www.tvcatchup.com/tvcatchup.css");
	//includeCSS("http://inskin.vo.llnwd.net/o21/isfe/4.1/css/base.css");
}

function changeChannel() {
	var chans=getElementsByClass('gridchannel','window.document','td');
	for (i=0; i<chans.length; i++) {
		chans[i].setAttribute('onclick','window.location.href = "http://www.tvcatchup.com/channels.html";');
	}
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = document.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}