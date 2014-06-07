// ==UserScript==
// @name           HypeCloud
// @namespace      http://www.w3.org/1999/xhtml
// @description    HypeMachine dressed in black & decluttered. More soon.
// @include        https://hypem.com/*
// @include        https://hypem.com
// @include        http://hypem.com/* 
// @include        http://hypem.com
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @exclude        http://hypem.com/fast-forward/*
// @require	   http://userscripts.org/scripts/source/40050.user.js
// ==/UserScript==

(function() { 
var css = "html,body,div,h1,h2,h3,h4,h5,h6,p,em,span {font-family: Helvetica, Arial, sans-serif!important;color:#666666!important;}\n\na {color:#666666!important}\n\n\nbody {background-image:none!important;background-color:#666666!important}\n\n\#content-left{background-color: #666666!important;}\n#recently-posted{top:100px!important;}\n#message {margin-top:0!important}\n#your-site{display:none!important}\n#message{display:none!important}\n#header, #header-inner {background-color:#292929}\n\n\n#header {background-color:#666666!Â shadimportant;border-bottom:1px solid #ddd!important}\n\n\n#header .menu {background-color:#333!important;border-bottom:3px solid #666!important}\n#header .menu li a {border-color:#333!important;font-size:11px!important;important;padding:0 8px!important;}\n#header .menu li.active a {background:#333!important;color:#666!important}\n#header .menu a:hover {background:#355173!important}\n#header .menu li.user-menu, #header .menu li.user-menu a.user {background:none!important}\n#header .menu .user-menu ul {border:3px solid #666!important;border-top:none!important;width:auto!important}\n#message-intro{display:none!important}\n#news.section{display:none!important}\n#header .menu .user-menu ul li {background:#fff!important;width:auto!important}\n\n\n#search {background:none!important; bottom:0!important; padding:1px!important;margin-bottom:25px!important;width:auto!important;}\n\n\n#header #search input {border:1px solid #999!important;padding:6px!important;width:260px!important;}\n#header #search input[type=\"submit\"] {border:1px solid #999!important;padding:3px!important;width:100px!important;}\n\n\n#box {border-color:#666!important}\n#box h3 {background-color:#eef4fb!important}\n\n\n#content-wrapper {padding-top:40px!important;background: #292929!important}\n\n\n#container {padding-bottom:30px!important}\n\n\nh2 {background:#333!important;border-bottom-color:#666!important;color:#f8f8f8!important}\nh2 a#tooltip {background:#444!important}\n\n\n#player-container {height:32px!important; background-color: #000!important; background-image:none!important; border-top-color:#666!important; border-top-width:0px;}\n\n\n#player-links .store {background-color:#111!important;width: 50px!important;}\n#player-links a.twit {width:27px!important;}\n#player-links a.fbk {width:29px!important;}\n\n\n#player-nowplaying {height30px!important; ™£2-size:11px!important; border-right-width: 0!important;}\n\n\n#player-page {background-color:#000!important}\n#player-container a {padding-bottom: 0pt!important}\n#player-page a:hover {border-bottom-width:0!important;}\n\n\n#footer, .buy, #hypem-events, #copyright, .read, .itunes, .emusic {display:none!important}\n\n\n#ad-leaderboard, #ad_report_leaderboard, #ad-rectangle, #ad_report_rectangle, {display:none!important}\n\n\na.gmlink:hover {background-color:#fffimportant;}\n#browse-genres.section{display:none!important}\n#twitter-board{border:0px!important;}\n#fav-blogs{border:0px!important;}\n#fav_searches{border:0px!important;}\n#search{background-color:#666666!important;}\n#share-links{displayvi:none!important;}\n#logo{background:url(http://jedunnigan.com/fast_forward_horizontal.png)!important; width:180px!important;top:0px!important;height:38px!important;}\n#twitter-board li span{border:0px!important;}\n#ad-rectangle1{display:none!important}\n#ad-rectangle21{display:none!important}\n#latest{background:display:none!important}\n#active-users{border:none!important}\n#active-users li span{border:none!important;}\n#container{width:1200px!important;margin:none!important;}\n#recently-posted{background:#666666!important}\n#recently-played>div{background-color:#000!important}\n#content-right{width:400px!important}"
if (typeof GM_addStyle != "undefined" )  
{
	GM_addStyle(css);
	document.getElementById("logo").setAttribute("href","http://hypem.com/fast-forward/launch.php");
} 

else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else 
	{
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
	}
}

if (window.top != window.self)  //-- Don't run on frames or iframes.
    return;


function OnLoadWidgets() {
	var tempSC = document.createElement("div");                                        
		tempSC.id = "SCWidget";
		tempSC.innerHTML = ""
		+ "<iframe style=\"width:300px;height:450px;border:none\" frameborder=\"0\" src=\"http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Fusers%2F858485/favorites&show_artwork=true" + "\">"
		+ "</iframe>";  
	document.getElementById("content-right").appendChild(tempSC);

	var tempMC = document.createElement("div");                                        
		tempMC.id = "MCWidget";
		tempMC.innerHTML = ""
		+ "<iframe style=\"padding-top:50px;width:300px;height:250px;border:none\" frameborder=\"0\" src=\"http://www.mixcloud.com/media/swf/player/mixcloudLoader.swf?feed=http%3A%2F%2Fwww.mixcloud.com%2Fjedunnigan%2Ffavorites%2F&embed_uuid=b6952910-9c88-4fbd-b6d7-6ddf047cc0e0&stylecolor=&embed_type=widget_standard" + "\">"
		+ "</iframe>";  
	document.getElementById("content-right").appendChild(tempMC);
}				

unsafeWindow.jQuery (document).ajaxComplete ( function () {
    var existingSCPlayer = document.getElementById ("SCWidget");
    var existingMCPlayer = document.getElementById ("MCWidget");
    if ( ! existingSCPlayer  &&  ! existingMCPlayer) {
        OnLoadWidgets();
    }
} );

})();