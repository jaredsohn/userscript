// ==UserScript==
// @name           SmashHits auto-download
// @namespace      #avg
// @description    Auto-downloads SmashHits Videos
// @include        http://*smashits.com/video/player/v_player_frame.cfm?pl=*
// @version        0.1
// ==/UserScript==
GM_xmlhttpRequest({
method:'GET',
url: "http://"+document.domain+document.evaluate("//param[@name='src']",document,null,9,null).singleNodeValue.value,
onload: function(a) {

try {
	location.href=/http:\/\/ww\.smashits\.com\/video\/player\/v_clip\.asp[^"]+/.exec(a.responseText)[0]
}
catch(e) {
	alert(e)
}

}
})