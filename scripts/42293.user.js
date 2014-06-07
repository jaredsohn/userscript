// ==UserScript==
// @name           Vishnu's YouTube Googler
// @author         Vishnu from Sri SaiNagar, Thuraipakkam, Chennai, India!
// @namespace      Vishnu's yOu tuBe
// @include        http://youtube.com/w*
// @include	   http://*.youtube.com/w*
// ==/UserScript==

var youtube_googler = function() {
 //********************
 //* Useful Functions *
 //********************
 
 var log = function() {
 	unsafeWindow.console.log.apply(unsafeWindow.console, arguments);
 };

 var $c = function(name, attributes, textContent) {
     var ele = document.createElement(name);

     if (attributes instanceof Object) {
	 var aname;
	 for (aname in attributes) {
	     if (attributes.hasOwnProperty(aname)) {
		 ele.setAttribute(aname, attributes[aname]);
	     }
	 }
     }

     if (typeof textContent != 'undefined') {
	 ele.textContent = textContent;
     }

     return ele;
 }

 var $ = function(id) { return document.getElementById(id); };

 var $x = function(xpath, context) {
		if (!context) context = document;
        var snapshot = document.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		var ar = [];

        for (var i = 0; i < snapshot.snapshotLength; i++) {
                ar.push(snapshot.snapshotItem(i));
        }

        return ar;
 }

 var $s = function(s) {
 	if (!(s instanceof Array)) {
		s = [s];
	}

	var a = [];

	for (var i = 0, slen = s.length; i < slen; i++) {
		var t = (s[i][0] == '#' ? $(s[i].substr(1)) : $x(s[i]));

		if (!t) continue;
		if (t instanceof Array) {
			for (var n = 0, tlen = t.length; n < tlen; n++) {
				a.push(t[n]);
			}
		} else {
			a.push(t);
		}
	}

	return a;

 }

 var appendChildren = function (parent, children) {
	 for (var i = 0, len = children.length; i < len; i++) {
		 if (children[i]) {
		 	parent.appendChild(children[i]);
		 }
	 }
 }

 var nselector = function(selector) {
    return selector[0] == '!' ? selector.substr(1) : selector;
 };


 //Opera stuff
 var opera = (window.opera) ? true : false;

 var GMO_setValue = function(name, value) {
	 if (opera) {
		 return opera_GM_setValue(name, value);
	 } else {
		 return GM_setValue(name, value);
	 }
 }

 var GMO_getValue = function(name, defaultValue) {
	 if (opera) {
		 return opera_GM_getValue(name, defaultValue);
	 } else {
		 return GM_getValue(name, defaultValue);
	 }
 }

 var GMO_addStyle = function(css) {
	 if (opera) {
		 return opera_GM_addStyle(css);
	 } else {
		 return GM_addStyle(css);
	 }
 }


 var opera_GM_setValue = function( cookieName, cookieValue, lifeTime ) {
	if( !cookieName ) { return; }
	if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
	document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) +
		";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
 }

 var opera_GM_getValue = function( cookieName, oDefault ) {
	var cookieJar = document.cookie.split( "; " );
	for( var x = 0; x < cookieJar.length; x++ ) {
		var oneCookie = cookieJar[x].split( "=" );
		if( oneCookie[0] == escape( cookieName ) ) {
			try {
				eval('var footm = '+unescape( oneCookie[1] ));
			} catch(e) { return oDefault; }
			return footm;
		}
	}
	return oDefault;
 }

 var opera_GM_addStyle = function(css) {
	var style = document.createElement('style');
	style.appendChild(document.createTextNode(css));

	document.getElementsByTagName('head')[0].appendChild(style);
 }


 //Settings
 var defaults = {
     splitSize: 400,
     preventAutoplay: 1,
     invertVideoResizeAxis: false,
     vidSize: 100,
     videoQuality: 1,
     //videoTitle: 1,
     sideElements: '#non-logo-masthead, #masthead, !#watch-vid-title, #watch-channel-vids-div, #watch-video-quality-setting, #watch-ratings-views, #watch-channel-videos-panel, #quicklistDiv, #watch-related-videos-panel, #watch-actions-area, #watch-comments-stats'
 }

 var settings = {};
 var sname;

 for (sname in defaults) {
     if (!defaults.hasOwnProperty(sname)) continue;
     settings[sname] = GMO_getValue(sname, defaults[sname]);
 }

 /*var settings = {
     splitSize: GMO_getValue('splitSize', 400),
     preventAutoplay: GMO_getValue('preventAutoplay', false),
     invertVideoResizeAxis: GMO_getValue('invertVideoResizeAxis', false),
     vidSize: GMO_getValue('vidSize', 100),
     videoQuality: GMO_getValue('videoQuality', 1),
     //videoTitle: GMO_getValue('videoTitle', 1),
     sideElements: GMO_getValue('sideElements', '#non-logo-masthead, #masthead, !#watch-vid-title, #watch-channel-vids-div, #watch-video-quality-setting, #watch-ratings-views, #watch-channel-videos-panel, #quicklistDiv, #watch-related-videos-panel, #watch-actions-area, #watch-comments-stats')
 }*/

 var updateSetting = function(name, value) {
     GMO_setValue(name, value);
     settings[name] = value;
 }

 /*var setVideoTitle = function(o) {
    o = parseInt(o);
    var title = $('watch-vid-title');
    switch(o) {
	case 1:
	    title.style.display = "none";
	    break;
	case 2:
	    if (title.parentNode != $('ovSide')) {
		$('ovSide').insertBefore(title, $('watch-channel-vids-div'));
	    }
	    title.style.display = "block";
	    break;
	case 3:
	    if (title.parentNode != $('ovVid')) {
		$('ovVid').insertBefore(title, $('ovVid').firstChild);
	    }
	    title.style.display = "block";
	    centerVid();
	    break;
    }
};*/


 /*var splitSize = GMO_getValue('splitSize', 400);
 var preventAutoplay = GMO_getValue('preventAutoplay', false);
 var invertVideoResizeAxis = GMO_getValue('invertVideoResizeAxis', false);*/



 //**********
 //* Styles *
 //**********
 //GM_addStyle(<><![CDATA[
 GMO_addStyle("\
	 body {\
	     overflow: hidden !important;\
	 }\
	 div#ovMain {\
	 	height: 300px;\
		position: relative;\
	 }\
\
	 div#ovVid {\
	 	background: black;\
		margin-right:"+settings.splitSize+"px;\
		height: 100%; \
		border-right: solid 1px #000;\
		text-align: center;\
	 }\
\
	 embed {\
		position: relative;\
	 }\
\
	 div#ovSide {\
		width:"+settings.splitSize+"px;\
	    height: 100%;\
		position: absolute;\
		right: 0;\
		top: 0;\
	  	overflow: auto;\
	 }\
\
	 table.watch-tabs {\
		width: 100%;\
	 }\
\
	#watch-rating-div {\
		width: 250px;\
	}\
\
	#watch-views-div {\
		width: 120px;\
	}\
\
	#movie-player {\
		width: 100%;\
		height: 100%;\
        }\
\
	#old-masthead .logo,	\
	#old-masthead .bar .leftcap,	\
	#old-masthead .bar .rightcap	{\
		display: none !important;\
	}\
\
	#old-masthead, \
	#tab-wrapper,\
	#old-masthead .bar,\
	#old-masthead .search-bar,\
	#old-masthead .nav-item .content,\
	#watch-video-responses-children,\
	#top-margin-links-wrapper,\
	#lang-locale-picker-links-wrapper,\
        #search-advanced-form .search-advanced-main,\
	#watch-channel-stats,\
	#search-advanced-form .search-subsection	{\
		width: auto !important;\
	}\
\
	#old-masthead #tab-wrapper,\
	#top-margin-links-wrapper,\
	#old-masthead .search-bar,\
	#search-form,\
	#old-masthead .search-settings-link {\
		float: none;\
	}\
\
	#old-masthead #search-form {\
		padding-left: 5px !important;\
	}\
\
	div#old-masthead #tab-wrapper {\
		padding: 0;\
		position: relative;\
		top: -0px;\
		width: 291px !important;\
		margin-right: auto;\
		margin-left: auto;\
	}\
\
	.watch-tabs td {\
		font-size: inherit;\
	}\
\
	#old-masthead #search-term {\
		width: 140px;\
	}\
\
	#watch-ratings-views,\
	#watch-channel-vids-div,\
	#watch-actions-area,\
	#watch-comments-stats {\
		border-left: none;\
		border-right: none;\
	}\
\
	form#comment_formmain_comment textarea {\
		width: 100%;\
	}\
\
	#search-advanced-form .search-subsection {\
		float: none;\
	}\
\
	input#embed_code {\
		width: 100%;\
        }\
	div.watch-comment-action {\
		 clear: both;\
	}\
\
	#old-masthead .bar,\
	#old-masthead div#search-form,\
	#old-masthead .search-bar {\
		height: auto;\
	}\
\
#old-masthead .search-bar {\
	background: #E5E6E5;\
	border: solid 1px #d5d5d5;\
	border-left: none;\
	border-right: none;\
}\
#old-masthead #search-form {\
float: none;\
}\
\
.search-settings-link {\
	right: 2px;\
	line-height: inherit;\
	padding-bottom: 0;\
	margin: 0;\
	display: inline !important;\
}\
#old-masthead div#search-form {\
	padding-bottom: .5em;\
}\
\
#old-masthead form div.bar {\
	width: 100% !important;\
}\
\
div#ovSide > div {\
	position: relative;\
	border-top: solid 1px #ccc;\
	border-bottom: solid 1px #ccc;\
	margin-bottom: .5em;\
}\
\
div#old-masthead {\
	border-top: none !important;\
	border-bottom: none !important;\
	padding-bottom: 0 !important;\
	margin-bottom: .5em !important;\
}\
\
div.inline-search-wrapper {\
    margin-top: -17px;\
}\
\
div#inline-search-body iframe {\
	display: none;\
	width: 100%;\
	border: none;\
	border-top: solid 1px #ccc;\
	min-height: 500px;\
}\
\
div#inline-search-panel {\
	position: relative;\
}\
\
div#inline-search-panel a.orig-search-link {\
	position: absolute;\
	top: .3em;\
	right: .3em;\
	font-size: .8em;\
}\
\
input#embed_code {\
	width: auto !important;\
}\
\
div#watch-channel-brand-cap {\
    overflow: hidden;\
}\
div#ovSide span#settings-button {\
    position: absolute;\
    top: 0;\
    right: 0;\
    border: solid 1px #000;\
    border-top-color: #ddd;\
    border-left-color: #ddd;\
    background-color: #999;\
    width: 9px;\
    height: 9px;\
    line-height: .6em;\
    padding-left: .2em;\
    color: #333;\
    cursor: pointer;\
	z-index: 10000;\
}\
div#ovSide span#settings-button:hover {\
    background-color: #aaa;\
}\
div#ovSide span#settings-button:active {\
    border-color: #000 #ddd #ddd #000;\
}\
span#settings-div {\
    background-color: #eee;\
	margin-bottom: .5em;\
    border: none !important;\
    display: none;\
	/*position: fixed;\
	z-index: 9999;\
	width: "+(settings.splitSize-16)+"px;\
	overflow: hidden;\
	opacity: .9;\*/\
	overflow: hidden;\
}\
span#settings-div p, span#settings-div h3 {\
    background-color: #bbb;\
    padding: 0;\
    margin: 0;\
    border: solid 1px #333;\
    border-top-color: #fff;\
    border-left-color: #fff;\
    white-space: nowrap;\
	position: relative;\
}\
span#settings-div h3 {\
    background-color: #ddd;\
}\
span#settings-div p div.rdiv {\
    background-color: #ddd;\
    border-left: solid 1px #999;\
    margin-left: 147px;\
}\
span#settings-div label {\
    float: left;\
    width: 140px;\
    font-weight: bold;\
    text-align: right;\
    margin-right: 10px;\
    background-color: #bbb;\
    padding-top: .2em;\
    padding-bottom: .1em;\
    padding-right: .5em;\
}\
span#settings-div h3 {\
    margin: 0;\
    padding-left: 1em;\
}\
span#settings-div input[type=text] {\
    border: inset 1px #aaa;\
    width: 40px;\
    text-align: right;\
    height: 1.1em;\
}\
span#settings-div input#vidSize {\
    text-align: right;\
}\
div#watch-vid-title {\
    text-align: center;\
}\
div#ovVid div#watch-vid-title h1 {\
    color: #fff !important;\
    margin: 0;\
}\
div#ovVid div#watch-vid-title {\
    margin: 0;\
}\
div#non-logo-masthead {\
    border: none !important;\
    margin-bottom: .3em !important;\
}\
span.mclear {\
    clear: both;\
    display: block;\
    border: none !important;\
    background: transparent !important;\
}\
div#non-logo-masthead span {\
    border: solid 1px #ccc;\
    background: #eee;\
    border-top: none;\
    border-left: none;\
    margin: 0;\
    padding: 0 .5em;\
    padding-bottom: 1px;\
}\
div#non-logo-masthead span a {\
    text-decoration: none;\
    border: none;\
}\
div#non-logo-masthead span span {\
    border: none;\
}\
div#masthead a.logo {\
    display: none;\
}\
div#masthead div.bar, div#masthead {\
    width: auto;\
}\
div#masthead {\
    border: none !important;\
    margin-bottom: .1em !important;\
}\
div#masthead div.bar form {\
}\
div#upload-wrapper {\
    display: none;\
}\
div#masthead form {\
    float: none !important;\
}\
div#masthead form input#masthead-search-term {\
    width: 100%;\
    border: none;\
}\
div#masthead div.input-container {\
    overflow: hidden;\
    margin-right: 80px;\
    border: solid 1px #999;\
}\
div#masthead form div.search-wrapper {\
    margin-right: 0 !important;\
    position: relative;\
    padding-left: 2px;\
}\
div#masthead-search-container {\
    position: absolute;\
    right: 0;\
    top: 0;\
}\
span#settings-div p#sidebarList div.rdiv {\
    height: 100%;\
}\
span#settings-div p#sidebarList div.rdiv a#sids {\
    margin-left: .8em;\
}\
ul#sidebarList {\
    overflow: auto;\
    height: 87%;\
    background: #fff;\
    border: inset 1px #ccc;\
    padding-left: 0;\
    margin-top: 0;\
    margin-bottom: 0;\
}\
ul#sidebarList li {\
    clear: both;\
    border-bottom: solid 1px #ccc;\
    white-space: nowrap;\
    overflow: hidden;\
    position: relative;\
}\
ul#sidebarList li span.updown {\
    position: absolute;\
    top: 1px;\
    right: 1px;\
	padding: 0 1px;\
	height: .7em;\
	font-size: 1.7em;\
    background-color: #ddd;\
    border: solid 1px #aaa;\
    z-index: 999;\
    display: none;\
}\
ul#sidebarList li span.updown b {\
    height: 15px;\
    padding: 0;\
    cursor: default;\
    font-weight: normal;\
}\
ul#sidebarList li span.updown b:hover {\
    font-weight: bold;\
	margin-left: -1px;\
}\
ul#sidebarList li, ul#sidebarList li label {\
    float: none;\
    list-style-type: none;\
    background: transparent;\
    display: block;\
    width: auto;\
    font-weight: normal;\
    text-align: left;\
}\
ul#sidebarList li label {\
    display: inline;\
    border: none;\
    position: relative;\
    bottom: 2px;\
}\
ul#sidebarList li input[type=checkbox] {\
}\
span#settings-div p#sidebarList {\
    height: 140px;\
}\
span#settings-div p#sidebarList > label {\
}\
span#settings-div p#sidebarList input#sids {\
}\
div#ovSide > div > span.sid-label {\
    position: absolute;\
    top: 0;\
    right: 0;\
    background: #ff9;\
    color: #000;\
    opacity: .9;\
    font-size: 10px;\
    font-weight: normal;\
}\
p#sidebarList ul li.invalid label {\
    color: #ccc;\
}\
 ");

 //************
 //* Template *
 //************
 
 var template = {
	player: '#movie_player',
	side: settings.sideElements.split(/\s*,\s*/)
	//side: ['#non-logo-masthead', '#masthead', '#watch-vid-title', '#watch-channel-vids-div', '#watch-video-quality-setting', '#watch-ratings-views', '#watch-channel-videos-panel', '#quicklistDiv', '#watch-related-videos-panel',  '#watch-actions-area', '#watch-comments-stats' ]
 };

// log(settings.sideElements);

 //******************
 //* Create Overlay *
 //******************
 

 $('baseDiv').style.display = "none";

 var overlayhtml = '<div id="ovVid"></div><div id="ovSide"></div>'

 var overlay = document.createElement('div');
 overlay.id = 'ovMain';
 overlay.innerHTML = overlayhtml;

 document.body.appendChild(overlay);

 var centerVid = function() {
	var ovvid = $('ovVid');
	/*var cur = ovvid.firstChild;
	var top = 0;
	do {
	    if (cur && cur.offsetHeight) top += cur.offsetHeight;
	} while (cur && (cur = cur.nextSibling) && cur.tagName != 'EMBED'); 
	log(top);

	if (!cur) return false;
	p = cur;*/
	var p = ovvid.getElementsByTagName('embed');
	if (!p.length) return false;
	p = p[0];
	//log(top);
	var nt = (((window.innerHeight) / 2) - (p.offsetHeight / 2));
	$('ovVid').style.paddingTop = nt + 'px';
 }
	


 var overlayHeight = function() {
	$('ovMain').style.height = window.innerHeight + 'px';
	centerVid();
 }	

 overlayHeight();

 window.addEventListener('resize', overlayHeight, false);



 //********************
 //* Populate Overlay *
 //********************

 var setVidSize = function(size) {
     var pl = $s(template.player)[0];
     pl.setAttribute('height', size + '%');
     pl.setAttribute('width', size + '%');
 }
 
 var ovVid = $('ovVid');
 var ovSide = $('ovSide');

 //appendChildren(ovSide, $s(template.side.map(nselector)));

 //Populate Sidebar
 template.side.forEach(function(e) {
	 var ele = $s(nselector(e));
	 if (ele.length) {
			 var appended = ovSide.appendChild(ele[0]);
	 		 if (e[0] == '!') appended.style.display = "none";
	 }
 });


 var player = $s(template.player)[0];
 
 player.setAttribute('bgcolor', '#000000');

 var fvars = player.getAttribute('flashvars');

 if (settings.preventAutoplay == 2) {
     if (fvars.indexOf('autoplay=1') != -1) {
	 fvars = fvars.replace('autoplay=1', 'autoplay=0');
     } else if (fvars.indexOf('autoplay=') == -1) {
	 fvars += '&autoplay=0';
     }

     player.setAttribute('flashvars', fvars);
 } else if (settings.preventAutoplay == 3) {
     /*unsafeWindow.pausevid = function() {
	 document.getElementById('movie_player').pauseVideo();
     }

     setTimeout(function() { log(unsafeWindow.p.pauseVideo); unsafeWindow.p.pauseVideo(); }, 2000);

     setTimeout(function() {
	     var mp = document.getElementById('movie_player');
	     log(mp, mp.pauseVideo);
	     if (mp.pauseVideo) {
		 log('yes');
		 mp.pauseVideo();
	     } else {
		 log('no');
		 setTimeout(arguments.callee, 1000);
	     }
     }, 1000);*/
    unsafeWindow.onYouTubePlayerReady_old = unsafeWindow.onYouTubePlayerReady; 
    unsafeWindow.onYouTubePlayerReady = function() { 
	unsafeWindow.document.getElementById('movie_player').pauseVideo(); 
	unsafeWindow.onYouTubePlayerReady_old();
    };
 }


 setVidSize(settings.vidSize);
 //player.setAttribute('height', settings.vidSize + '%');
 //player.setAttribute('width', settings.vidSize + '%');
 ovVid.appendChild(player);
 //player.setAttribute('src', player.getAttribute('src')+'?enablejsapi=1');
 //unsafeWindow.g_YouTubePlayerIsReady = true;
 
 centerVid();

 //setVideoTitle(settings.videoTitle);

 var mouseclick = false;
 var doresize = false;
 //var dovidresize = false;
 //var dovidresize_swidth = null;
 var clickpos = false;
 var lastpos = false;
 var objover = false;



 var resizeSplit = function(pos) {
	 if (pos <= 0) { 
		 pos = 0;
		 ovVid.style.borderRight = "solid 4px #666";
	 } else {
		 ovVid.style.borderRight = '';
	 }
	 ovVid.style.marginRight = pos + 'px';
	 ovSide.style.width = pos + 'px';
	 //$('settings-div').style.width = (pos-16) + 'px';

	 $('splitSize').value = pos;
 }

 var resizeVid = function(change) {
	//var per = change / window.innerHeight;
	var emb = $('ovVid').getElementsByTagName('embed')[0];
	var curper = parseInt(emb.getAttribute('height').match(/^(\d+)%/)[1]);
	//var inp = $('masthead-search-term');
	//var newper = curper * per;
	var m = (change - lastpos[1]) / 4;

	if (m > 0) m = Math.ceil(m);
	else m = Math.floor(m);

	var newval = m * (settings.invertVideoResizeAxis ? -1 : 1) + curper;

	//inp.value = per + ', ' + curper + ', ' + newper;
	if (newval < 10) newval = 10;
	else if (newval > 100) newval = 100;

	$('vidSize').value = newval;
	setVidSize(newval);
	//emb.setAttribute('width', newval + '%');
	//emb.setAttribute('height', newval + '%');
	centerVid();
 }

 var inResizeArea = function(x) {
	 var w = 5;
	 return (x < ovVid.offsetWidth + w && x > ovVid.offsetWidth - w);
 }

 window.addEventListener('mousemove', function(ev) {
		 if (doresize) {
		 	ovSide.style.MozUserSelect = 'none';
		 	var nw = (window.innerWidth - ev.clientX);
			if (!ev.shiftKey) {
				resizeSplit(nw);
			}

			if (!ev.ctrlKey) {
				resizeVid(ev.clientY);
			}
		 /*} else if (dovidresize) {
			var np = (ev.clientX / dovidresize_swidth);
			resizeVid(np);*/
		 } else if (inResizeArea(ev.clientX)) {
		 	document.body.style.cursor = 'e-resize';
		 } else {
		 	document.body.style.cursor = '';
		 }
 		 lastpos = [ev.clientX, ev.clientY];

		 	
		 

 }, false);

var rfalse = function() { return false; };

 window.addEventListener('mousedown', function(ev) {
		 mouseclick = ev.button;
		 if (ev.button === 0 && inResizeArea(ev.clientX)) {
		 	doresize = true;
		 /*} else if (ev.button === 2 && inResizeArea(ev.clientX)) {
			dovidresize = true;

			var p = $('ovVid').getElementsByTagName('embed')[0];
			dovidresize_swidth = ev.clientX + ((p.offsetWidth / ev.clientX) * ev.clientX);*/
		 }
		 clickpos = [ev.clientX, ev.clientY];
		 lastpos = [ev.clientX, ev.clientY];
 }, false);

 window.addEventListener('mouseup', function(ev) {
		 if (doresize && ev.clientX == clickpos[0] && ev.clientY == clickpos[1]) {
		 	if (ovSide.offsetWidth == 0) {
				resizeSplit(settings.splitSize);
			} else {
		 		resizeSplit(0);
			}
		 } else if (doresize) {
			updateSetting('splitSize', ovSide.offsetWidth)
		 	//settings.splitSize = ovSide.offsetWidth;
		 	//GMO_setValue('splitSize', splitSize);
			updateSetting('vidSize', $('ovVid').getElementsByTagName('embed')[0].getAttribute('width').match(/^(\d+)%/)[1]);
		 }

		 mouseclick = false;
		 doresize = false;
		 //dovidresize = false;
		 //dovidresize_siwdth = null;
		 clickpos = false;
		 ovSide.style.MozUserSelect = '';
 }, false);


//Inline search stuff
/*if (GMO_getValue('inlineSearch', true) && false) { //Disabled because inline search is not complete
	var searchform = $x('ancestor::form[1]', $('search-for'));

	var submitinline = function(ev) {
		ev.preventDefault();

		var qstring = this.action + '?';

		var len = this.elements.length;
		for (var i = 0; i < len; i++) {
			var ele = this.elements[i];
			if (ele.name && ele.value) {
				qstring += ele.name + '=' + ele.value + '&';
			}
		}

		qstring = qstring.substr(0, qstring.length-1);

		if (!$('inline-search-panel')) {

		var sboxhtml = '<div id="inline-search-panel" class="expand-panel expanded">\
							<a class="expand-header" onclick="togglePanel(this.parentNode);" href="#"><img class="arrow" alt="" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif"/>Search Results</a><a class="orig-search-link" href="'+qstring+'">Normal Search</a>\
							<div id="inline-search-body" class="expand-content"></div>\
						</div>';

		var pdiv = document.createElement('div');
		pdiv.className = 'inline-search-wrapper';
		pdiv.innerHTML = sboxhtml;

		$('ovSide').insertBefore(pdiv, $('old-masthead').nextSibling);

		}

		var sbody = $('inline-search-body');

		sbody.innerHTML = '<div id="isearchloading" style="text-align: center;">Loading...</div>';

		var iframe = document.createElement('iframe');
		sbody.appendChild(iframe);
		iframe.addEventListener('load', function() {
			var idoc = iframe.contentDocument;
			var style = idoc.createElement('style');
			style.innerHTML = '\
				body > *, div#baseDiv > *, div.vlfacets, div.vldupe, div.searchFresh, div.badges-thumb-box, td.search-type-selected, td.search-type-not-selected, td.search-settings, div#search-section-header, div#search-related-terms, div.vlepisode {\
					display: none !important;\
				}\
				div.vlentry {\
					min-height: 70px;\
					padding-bottom: 5px !important;\
					padding-top: 5px !important;\
				}\
				div.vlentry * {\
					float: none !important;\
				}\
				div.v120WideEntry {\
					float: left !important;\
					margin-right: 5px;\
				}\
				body > div#baseDiv, table#search-options-container, div#mainContent, div.searchFooterBox {\
					display: block !important\
				}\
				div#baseDiv, div#search-section-header, div.search-related-items, div#mainContent, .vlcontainer, div.v120WrapperOuter, div.v120WrapperInner {\
					width: auto !important;\
				}\
				table#search-options-container, div.v120WrapperInner {\
					height: auto !important;\
				}\
				div.vldescbox {\
					width: auto !important;\
					padding-left: 4px;\
				}\
				.vimg120 {\
					width: 90px;\
					height: 70px;\
				}\
				\
				div#search-options-container .sort-by {\
				    margin: -4px;\
				}\
			';

			idoc.getElementsByTagName('head')[0].appendChild(style);
			var isload = $('isearchloading'); isload.parentNode.removeChild(isload);
			iframe.style.display = "block";
		}, false);
		iframe.src = qstring;


	};

	searchform[0].addEventListener('submit', submitinline, false);
}*/

//***********
//** EXTRA **
//***********

(function() {
    var mhead = $('masthead');
    var sform = mhead.getElementsByTagName('form')[0];
    mhead.appendChild(sform);

    var s = document.createElement('span');
    s.className = "mclear";
    mhead.appendChild(s);

    var dc = document.createElement('div');
    dc.className = 'input-container';
    dc.appendChild(sform.getElementsByTagName('input')[0]);
    $x('div[@class="search-wrapper"]', sform)[0].insertBefore(dc, $('masthead-search-container'));

    var s2 = document.createElement('span');
    s2.className = "mclear";
    $('non-logo-masthead').appendChild(s2);
    /*$('top-margin-links-wrapper').appendChild(s);

    var l = $x('//div[@id="old-masthead"]//div[@class="search-settings-link"]')[0];
    $('search-form').appendChild(l);*/
})();




//Settings stuff
var sbut = document.createElement('span');
sbut.id = "settings-button";
sbut.textContent = 's';
sbut.addEventListener('click', function() {
	var sbox = $('settings-div');
	if (sbox.style.display) {
	    sbox.style.display = "";
	} else {
	    sbox.style.display = "block";
	}
}, false);
ovSide.insertBefore(sbut, ovSide.firstChild);


var scontainer = document.createElement('span');
scontainer.id = "settings-div";

scontainer.innerHTML = '<h3>Settings</h3>';
ovSide.insertBefore(scontainer, sbut.nextSibling);

var registerSetting = function(label, id, changeFunc, eleName, attributes, innerHTML, after, pid) {
    var sbox = $('settings-div');

    var pele = document.createElement("p");

    if (pid) pele.id = pid;

    var lele = document.createElement("label");
    lele.setAttribute('for', id);
    lele.textContent = label;

    var rdiv = document.createElement('div');
    rdiv.className = 'rdiv';

    var iele = document.createElement(eleName);
    iele.id = id;

    if (attributes instanceof Object) {
	for (n in attributes) {
	    if (n.substr(0,2) == 'on' && n.length > 2 && attributes[n] instanceof Function) {
		iele.addEventListener(n.substr(2), attributes[n], false);
	    }
	    iele.setAttribute(n, attributes[n]);
	}
    }

    if (innerHTML) {
	if (!(innerHTML instanceof Array)) innerHTML = [innerHTML]; 

	innerHTML.forEach(function(e) {
	    if (e.ownerDocument && e.ownerDocument == document) {
		iele.appendChild(e);
	    } else if (innerHTML) {
		iele.innerHTML += e;
	    }
	});
    }

    iele.addEventListener('change', changeFunc, false);

    pele.appendChild(lele);
    rdiv.appendChild(iele);
    if (after && after.ownerDocument && after.ownerDocument == document) {
	rdiv.appendChild(after);
    } else if (after) {
	var sele = document.createElement('span');
	sele.textContent = after;
	rdiv.appendChild(sele);
    }

    pele.appendChild(rdiv);

    sbox.appendChild(pele);
}

var registerSettingCheckbox = function(label, id, changeFunc, checked) {
    var attrs = { type: 'checkbox' }
    if (checked) {
	attrs.checked = 'yes';
    }

    registerSetting(label, id, changeFunc, 'input', attrs);
}

var registerSettingText = function(label, id, changeFunc, value, after) {
    registerSetting(label, id, changeFunc, 'input', { type: 'text', value: value }, null, after);
}

var registerSettingSelect = function(label, id, changeFunc, value, options) {
    if (options instanceof Object) {
	var opts = [];
	for (var o in options) {
	    var oele = document.createElement('option');
	    oele.setAttribute('value', options[o]);
	    oele.textContent = o;
	    if (value == options[o]) oele.setAttribute('selected', 'yes');
	    opts.push(oele);
	}
    }

    registerSetting(label, id, changeFunc, 'select', null, opts);
}



/*registerSettingCheckbox('Prevent autoplay', 'preventAutoplay', function() {
	updateSetting('preventAutoplay', this.checked ? true : false);
    }, settings.preventAutoplay);*/


registerSettingCheckbox('Invert video resize axis', 'invertVideoResizeAxis', function() {
	updateSetting('invertVideoResizeAxis', this.checked ? true : false);
    }, settings.invertVideoResizeAxis);
/*
registerSettingCheckbox('Display video title', 'videoTitle', function() {
	var value = this.checked ? 2 : 1;
	//log(value);
	setVideoTitle(value);
	updateSetting('videoTitle', value);
    }, settings.videoTitle == 2 ? true : false);*/

/*registerSettingSelect('Video quality', 'videoQuality', function() {
	updateSetting('videoQuality', this.value);
    }, settings.videoQuality, { "Low": 1, "High": 2 });*/

/*registerSettingSelect('Video title', 'videoTitle', function() {
	setVideoTitle(this.value);
	updateSetting('videoTitle', this.value);
    }, settings.videoTitle, { "None": 1, "In sidebar": 2, "Above video": 3 });*/
registerSettingSelect('Prevent autoplay', 'preventAutoplay', function() {
	updateSetting('preventAutoplay', this.value);
    }, settings.preventAutoplay, { "No": 1, "Yes": 2, "Yes, buffer": 3 });

registerSettingText('Sidebar width', 'splitSize', function() {
	resizeSplit(this.value);
	updateSetting('splitSize', this.value);
    }, settings.splitSize);

registerSettingText('Video size', 'vidSize', function() {
	setVidSize(this.value);
	centerVid();
	updateSetting('vidSize', this.value);
    }, settings.vidSize, '%');

registerSetting('Sidebar', 'sidebarList', function() {
    }, 'ul', null, (function() {
	var list = [];
	template.side.forEach(function(e, i) {
		var li = document.createElement('li');
		var cb = document.createElement('input');
		var cbid = '_c'+i;
		cb.id = cbid;
		cb.setAttribute('type', 'checkbox');
		if (!$s(nselector(e)).length) {
		    cb.checked = false
		    cb.disabled = true;
		    li.className = "invalid";
		} else {
		    if (e[0] == '!') {
			cb.checked = false;
			e = nselector(e);
		    } else {
			cb.checked = true;
		    }
		    cb.addEventListener('change', function() {
			    var selector = $x('following-sibling::label', this)[0].textContent;
			    var index;
			    var slen = template.side.length;
			    var reg = new RegExp('^!?'+selector+'$');
			    for (var i=0; i<slen; i++) {
				if (reg.test(template.side[i])) {
				    index = i;
				    break;
				}
			    }
				
			    var s = $s(selector)[0];
			    if (this.checked) {
				s.style.display = "";
				template.side[index] = selector;
			    } else {
				s.style.display = "none";
				template.side[index] = '!'+selector;
			    }

			    updateSetting('sideElements', template.side.join(', '));
		    }, false);
		    var updown = $c('span', { class: 'updown' });

		    var up = $c('b', { class: 'up' }, "\u02c4");
		    var down = $c('b', { class: 'down' }, "\u02c5");

			var swap = function() {
					var li = this.parentNode.parentNode;
					var ident = li.getElementsByTagName('label')[0].textContent;
					var ul = li.parentNode;
					ul.setAttribute('supress', 1);

					var idex;
					var selen = template.side.length;
					for (idex=0; idex<selen; idex++) {
							var sid = template.side[idex];
							if (sid[0] == '!') sid = sid.substr(1);

							if (sid == ident) break;
					}

					//li.style.backgroundColor = '';
					var xpcond = '[not(@id = "settings-div") and not(@id = "settings-button")]';
					if (/\bup\b/.test(this.className)) {
							var swapfunc = function(ele) {
									var before = $x('preceding-sibling::*'+xpcond+'[1]', ele);
									if (!before.length) {
											//$x('following-sibling::li[1]', li)[0].setAttribute('supress', 1);
											ele.parentNode.appendChild(ele);
									} else {
											//before[0].setAttribute('supress', 1);
											ele.parentNode.insertBefore(ele, before[0]);
									}
							};

							var swapwith = idex - 1;

					} else if (/\bdown\b/.test(this.className)) {
							var swapfunc = function(ele) {
									var before = $x('following-sibling::*'+xpcond+'[2]', ele);
									if (!before.length && $x('following-sibling::*'+xpcond+'[1]', ele).length) {
											ele.parentNode.appendChild(ele);
									} else if (!before.length) {
											ele.parentNode.insertBefore(ele, $x('*'+xpcond+'[1]', ele.parentNode)[0]);
									} else {
											ele.parentNode.insertBefore(ele, before[0]);
									}
							};

							var swapwith = idex + 1;
					}

					swapfunc(li);
					swapfunc($s(ident)[0]);

					if (swapwith < 0) swapwith = selen - 1;
					else if (swapwith > selen - 1) swapwith = 0;

					var tmp = template.side[idex];
					template.side[idex] = template.side[swapwith];
					template.side[swapwith] = tmp;

					updateSetting('sideElements', template.side.join(', '));




					if (ul.scrollTop > li.offsetTop) {
							ul.scrollTop = li.offsetTop;
					} else if (ul.scrollTop + ul.offsetHeight < li.offsetTop + li.offsetHeight) {
							ul.scrollTop = (li.offsetTop+li.offsetHeight) - ul.offsetHeight;
					}

					/*
					//Animate
					setTimeout(function() {
							if (!li.style.backgroundColor) {
									var nb = 175;
									li.style.backgroundColor = 'rgb('+nb+','+nb+',255)';
							} else {
									var parts = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(li.style.backgroundColor);

									var nb = parseInt(parts[1]) + 10;

									li.style.backgroundColor = 'rgb('+nb+','+nb+','+parts[3]+')';

							 }

							if (nb < 255) {
									setTimeout(arguments.callee, 25);
							}
						}, 25);*/

			};



			up.addEventListener('click', swap, false);
			down.addEventListener('click', swap, false);

		    updown.appendChild(up); updown.appendChild(down);	    

		    li.appendChild(updown);

		    li.addEventListener('mouseover', function() {
			    if (!this.parentNode.hasAttribute('supress')) {
						this.getElementsByTagName('span')[0].style.display = "block";
						/*$x('../li', this).forEach(function(e) {
								var span = e.getElementsByTagName('span')[0];
								if (e != this) span.style.display = "";
								else span.style.display = "block";
						}, this);*/
				}
		    }, false);

		    li.addEventListener('mouseout', function() {
				this.parentNode.removeAttribute('supress');
				$x('../li', this).forEach(function(e) {
						var span = e.getElementsByTagName('span');
						if (span.length) span[0].style.display = "";
				});
				//this.getElementsByTagName('span')[0].style.display = "";
		    }, false);
		}
		cb.selector = e;
		var la = document.createElement('label');
		la.setAttribute('for', cbid);
		la.textContent = e;
		

		li.appendChild(cb); li.appendChild(la);

		list.push(li);
	});

	return list;
    })(), (function() {
	    var sids = document.createElement('a');
	    sids.id = 'sids';
	    sids.setAttribute('href', '#');
	    sids.textContent = 'Show Element Ids';

	    sids.addEventListener('click', function(e) {
		    e.preventDefault();
		    if (!this.flipped) {
			this.textContent = 'Hide Element Ids';
			this.flipped = true;
		    } else {
			this.textContent = 'Show Element Ids';
			this.flipped = false;
		    }

		    $x('*', $('ovSide')).forEach(function(e) {
			    if (e.id.substr(0, 8) == 'settings') return;
			    var span = $x('span[@class="sid-label"]', e);
			    if (!span.length) {
				var span = document.createElement('span');
				span.className = 'sid-label';
				span.textContent = '#'+e.id;
				e.appendChild(span);
			    } else {
				e.removeChild(span[0]);
			    }
		    });
	    }, false);

	    return sids;
	})(), 'sidebarList');

registerSetting('Restore defaults', 'restoreDefaults', function() {}, 'input', { type: 'button', value: 'Restore Default Settings', onclick: function() {
	    if (confirm("Restoring default settings will refresh the page, continue?")) {
		var sname;
		for (sname in defaults) {
		    if (!defaults.hasOwnProperty(sname)) continue;
		    GMO_setValue(sname, defaults[sname]);
		}

		window.location.reload();
	    }
} });



};


if (window.opera) {
	window.addEventListener('load', youtube_googler, false);
} else {
	youtube_googler();
}


