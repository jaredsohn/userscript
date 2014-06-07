// ==UserScript==
// @name       Watch2Gether Mystery Video
// @namespace  http://userscripts.org/scripts/show/170199
// @version    1.0.4
// @description  Add a Mystery Video to the playlist!
// @match      http://*.watch2gether.com/*
// @match      https://*.watch2gether.com/*
// @copyright  2013+, Andrew Silver
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.$jQ$=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function() {
	$jQ$('#playlist-header-title').append('<button id="mystery-vid" style="width:135px;margin-left:20px;padding:2px 0px">Add Mystery Video</button>');
	$jQ$('#mystery-vid').click(function() {
		var vid=prompt("Please put in video url/code:","");
		if (vid!=null && vid!="") {
			vid=vid.replace(/^https?:\/\/(?:www\.)?youtube\.com\/.*[\?\&]v=(\S{11}).*/i,"$1").replace(/^https?:\/\/(?:www\.)youtu\.be\/(\S{11})/i,"$1");
			pageHandler.addToPlaylist(vid, 'Mystery Video ID '+new Date().getMinutes()*60+new Date().getSeconds(), 'http://25.media.tumblr.com/tumblr_m44wcmJjHO1rpdrxxo1_400.gif')
		}
	});
});