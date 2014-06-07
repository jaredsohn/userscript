// ==UserScript==
// @name        Tumblr extra blog buttons
// @namespace   http://www.tumblr.com
// @version     0.1.3
// @description add extra buttons to tumblr blogs
// @author      Nickel
// @copyright   2014, Nickel
// @grant	GM_addStyle
// @include     *://*.tumblr.com/*
// @exclude     *://*.tumblr.com/archive*
// @exclude     *://*.tumblr.com/image*
// @exclude     *://www.tumblr.com/*
// @downloadURL https://userscripts.org/scripts/source/293021.user.js
// @updateURL   https://userscripts.org/scripts/source/293021.meta.js
// ==/UserScript==
/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/

(function(){

// don't run in frames
if( frameElement ){ return; }

// don't run without tumblr elements
if( ! document.getElementById('tumblr_controls') ){ return; }

// fallback (Chrome lacks GM functions)
if( typeof GM_addStyle != 'function' ) {
	function GM_addStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if( !head ){ return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}

// origin
var origin = document.createElement("div");
origin.id = "userscript-extra-buttons";
document.body.appendChild(origin);

GM_addStyle("#userscript-extra-buttons {position:fixed; width:160px; height:20px; top:4px; left:5px; z-index:2147483647;}");
GM_addStyle("#userscript-extra-buttons a {display:block; float:left; margin-right:3px; width:21px; height:100%; border-radius:2px; outline:0;}");

var splitUrl=window.location.href.split("/");
var blogname = window.location.host.split(".")[0];

// add dash button (TODO: check if following/own blog)
if ( splitUrl[3] == "post" ) {
	var pid = splitUrl[4];
	pid = Number(pid)+1;

	var elm = document.createElement("a");
	elm.style = "background:url(http://assets.tumblr.com/images/posts/nipple.png) repeat-x #222; width:28px;";
	elm.href = "http://www.tumblr.com/dashboard/1000/" + pid + "?lite";
	elm.title = "Locate on Dashboard";

	origin.appendChild( elm );
}

// add liked-by button	(TODO: check if main blog)
var elm = document.createElement("a");
elm.style = "background:url(http://assets.tumblr.com/images/iframe_like_alpha.png) no-repeat #222;";
elm.href = "http://www.tumblr.com/liked/by/" + blogname;
elm.title = "Liked by " + blogname;
origin.appendChild( elm );

// add archive button
var elm = document.createElement("a");
elm.style = "background:url(http://assets.tumblr.com/themes/redux/button-archive.png) no-repeat #222;";
elm.href = "http://" + blogname + ".tumblr.com/archive";
elm.title = "Blog Archive";
origin.appendChild( elm );

// add Home Button
var elm = document.createElement("a");
elm.style = "background:url(http://assets.tumblr.com/images/iframe_dashboard_alpha.png) no-repeat #222;";
elm.href = "http://" + blogname + ".tumblr.com";
elm.title = "Blog Home";
origin.appendChild( elm );

// add prev/next page buttons
var page = -1;
var lastPage = 1000;	// TODO

if( splitUrl[splitUrl.length-2] == "page" ){
	page = Number(splitUrl[splitUrl.length-1]);
}
else if( splitUrl[3] == "" || splitUrl[3] == "tagged" || splitUrl[3] == "search" ){
	page = 1;
}

if( page > 1 ){
	var elm = document.createElement("a");
	elm.style = "background:url(http://assets.tumblr.com/images/dashboard_controls_arrow_left.png) 50% no-repeat #222; filter:grayscale(100%);";
	elm.href = window.location.href.replace( /\/$/, "" ).replace( /\/page\/[0-9]+$/, "" ) + "/page/" + (page-1);
	elm.title = "prev page";
	origin.appendChild( elm );
}

if( page > -1 && page < lastPage ){
	var elm = document.createElement("a");
	elm.style = "background:url(http://assets.tumblr.com/images/dashboard_controls_arrow_right.png) 50% no-repeat #222; filter:grayscale(100%);";
	elm.href = window.location.href.replace( /\/$/, "" ).replace( /\/page\/[0-9]+$/, "" ) + "/page/" + (page+1);
	elm.title = "next page";
	origin.appendChild( elm );
// TODO: replace this with lastPage instead
	var elm = document.createElement("a");
	elm.style = "background:url(http://assets.tumblr.com/images/dashboard_controls_arrow_first_page.png) 50% no-repeat #222; width:24px; transform:scaleX(-1); filter:grayscale(100%);";
	elm.href = window.location.href.replace( /\/$/, "" ).replace( /\/page\/[0-9]+$/, "" ) + "/page/" + (page+10);
	elm.title = "jump ahead 10 pages";
	origin.appendChild( elm );
}

})();