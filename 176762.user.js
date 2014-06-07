// ==UserScript==
// @name        tvgry PLUS
// @author kaszanka9
// @namespace   http://tvgry.pl/
// @include     http://tvgry.pl/
// @version     1.0
// ==/UserScript==


var s = '\
* { transition:none !important;}\
body { position:relative; overflow-y:scroll;}\
#doladuj-cnt { margin: 0 50px; text-align:center; }\
#doladuj-cnt .container { width: 280px; background:none;}\
#doladuj-cnt div[id^="movie-cnt-o"] .container {  padding-top: 110px; }\
.big-moviebox {width: 260px; min-height: 264px; background:rgba(0, 0, 0, 0.78); border: 5px solid transparent; border-radius: 6px; padding:6px; }\
.big-moviebox > img { width: 260px; height:auto;}\
.big-moviebox:hover { background:rgba(0, 0, 0, 0.88); box-shadow: 1px 1px 10px 3px #000000; }\
.big-moviebox .desc-box .description { width:270px; opacity:1; overflow: visible; padding: 10px 0 0 0; background:none;}\
#doladuj-cnt > div[id^="movie-cnt-"] {  display: inline-block; margin: 5px; text-align:left; }\
.big-moviebox .hover-layer { height: 150px;  width: 260px;}\
.big-moviebox .desc-box { left:0; top:135px; bottom: 0;}\
.big-moviebox > .rating-min { left: -15px; top: -15px;  padding: 0 10px 10px;height:auto; background #000; border-radius: 6px;}\
.big-moviebox .player { display:none;}\
.big-moviebox .desc-box h2 { background:#000; font-size:16px; padding: 5px;}\
.big-moviebox .desc-box p.lead { background: #000; font-size:16px; line-height: inherit; max-height: inherit; max-width: inherit; padding: 0 6px 4px; \
transition:none; margin:0; }\
.fb-like-box { display:none !important;}\
.big-moviebox .desc-box h2 a { color: #FFC000 !important;}\
.description p.short-desc { display:none;}\
.description p { position:absolute; bottom:0; margin-bottom: auto;}\
p.topics {display: none;}\
div.description p span.left {  float:none !important; display:block;}\
div.description p span.right { float:none !important; display:block; margin-left:0 !important;}\
.big-moviebox:hover .desc-box { left:0; top:135px; bottom: 0; }\
.active-movie { position:fixed !important; left:0; right:0; bottom:0; top:0; z-index:99999; overflow-y: scroll; background: rgba(0, 0, 0, 0.62) !important; margin:0 !important;}\
#doladuj-cnt .active-movie .container { width: 980px;}\
.ad-place { display:none;}\
.big-moviebox:hover .desc-box .description, .big-moviebox.active .desc-box .description { padding:inherit;}\
.move2 { background:#000;}\
.big-moviebox .movie-link {background: url("../images/icons/movie_link.png") no-repeat 0 -20px transparent;bottom: 2px;height: 20px;margin: 0;\
opacity: 1;padding: 0;position: absolute; right: 0px;width: 20px;z-index: 8; }\
.big-moviebox:hover .movie-link { bottom:2px;right:0px}\
.close-moviebox, .close-moviebox-2 { top:110px; background:#295CA2;}\
.big-moviebox:hover .hover-layer { background-size: 50%;}\
.active-movie .description p { position:inherit; bottom: auto; margin-bottom: 10px;}\
.active-movie p.topics { display:block;}\
.active-movie div.description p span.left {  float:left !important; display:inline;}\
.active-movie div.description p span.right { float:right !important; display:inline; margin-left:50px !important;}\
.active-movie .description p.short-desc { display:block;}\
';

var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = s;
head.appendChild(style);

var inject = function () {

var b = document.getElementsByTagName('body')[0];
$(".hover-layer").live("click", function() { b.style.overflowY = "hidden";});
$(".close-moviebox-2").live("click", function() { b.style.overflowY = "scroll"; });

};

var sts = function() {

var _wau = _wau || []; _wau.push(["small", "pc4z8zeplpxr", "2ra"]);
var sa=document.createElement("script"); sa.async=true;
sa.src="http://widgets.amung.us/small.js";
document.getElementsByTagName("head")[0].appendChild(sa);

};

var script = document.createElement('script');
script.type = "text/javascript";
script.charset = "utf-8";
script.textContent = '(' + inject.toString() + ')();';
head.appendChild(script);

var scriptstat = document.createElement('script');
scriptstat.id = "_wau2ra";
scriptstat.type = "text/javascript";
scriptstat.textContent = '(' + sts.toString() + ')();';
head.appendChild(scriptstat);
