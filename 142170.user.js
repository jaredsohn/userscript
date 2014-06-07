// ==UserScript==
// @name       MLG Live popout url.
// @namespace  http://SaucyExt/MLGPopout/url/
// @version    0.2
// @description  add's www.majorleaguegaming.com/live/popout to give the possibility for a popout window! Use the hash tag for specific stream.
// @include    http://www.majorleaguegaming.com/live/popout*
// @exclude    http://www.majorleaguegaming.com/live/popout/*
// @copyright  2012+, Ezekiel "Saucy" Warren
// ==/UserScript==

var html = document.getElementsByTagName('html')[0],
	body = document.body;

html.style.width = body.style.width = "100%";
html.style.height = body.style.height = "100%";
html.style.padding = body.style.padding = 0;
html.style.margin = body.style.margin = 0;

document.head.innerHTML = "";
document.body.innerHTML = "";
var playerHTML = ''
+'<object width="100%" height=100%" id="player-0_api" name="player-0_api" data="//liveplayer.majorleaguegaming.com/static/player.swf?dancemasterphreak" type="application/x-shockwave-flash">'
+	'<param name="allowfullscreen" value="true">'
+	'<param name="allowscriptaccess" value="always">'
+	'<param name="quality" value="high">'
+	'<param name="bgcolor" value="#000000">'
+	'<param name="wmode" value="opaque">'
+	'<param name="flashvars" value="config={&quot;advertVolume&quot;:&quot;0.8&quot;,&quot;plugins&quot;:{&quot;controls&quot;:{&quot;streams&quot;:&quot;'+window.location.hash.substr(1)+'&quot;,&quot;autoplay&quot;:true,&quot;autoHide&quot;:{&quot;fullscreenOnly&quot;:false,&quot;mouseOutDelay&quot;:2000,&quot;hideDelay&quot;:2000,&quot;hideDuration&quot;:0,&quot;hideStyle&quot;:&quot;fade&quot;}}},&quot;playerId&quot;:&quot;player-2&quot;,&quot;clip&quot;:{},&quot;playlist&quot;:[{}]}">'
+'</object>';
document.body.innerHTML = playerHTML;