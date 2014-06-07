// ==UserScript==
// @name           YouTube Animated Thumbnails & Preview Videos
// @namespace      http://userscripts.org/users/23652
// @description    Makes thumbnails cycle though the 3 previews. Additional feature to view all thumbnails on mouse hover, and move off to hide them.
// @include        http*://*.youtube.com/*
// @include        http*://youtube.com/*
// @exclude        http*://*youtube.com/my_videos_edit*
// @exclude        http*://*youtube.com/my_subscribers*
// @copyright      JoeSimmons
// @version        1.0.85
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=40324
// @require        http://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==

GM_config.init("YouTube Animated Thumbnails Options", {
	hoverimages : {
		label : "Enable Hover Images?",
		type : "checkbox",
		"default" : true,
		title : "Hovering over a thumbnail shows 3 preview images."
	},
	animatedthumbnails : {
		label : "Enable Animated Thumbnails?",
		type : "checkbox",
		"default" : true,
		title : "Thumbnails cycle through the 3 images."
	}
});


// OPTIONS SECTION
var execution_delay = 1; // (seconds) // When to run the script after page load
var switch_interval = 0.5; // (seconds) Interval at when to switch the image to the next
var enable_hover_images = GM_config.get("hoverimages") === true; // Hover over video thumbnails to see the rest of the thumbnails
var enable_animated_thumbnails = GM_config.get("animatedthumbnails") === true; // true=animated thumbnails, false=none
var show_delay = .45; // (seconds) How long to wait before show the thumbnail on hover
var elmCount = 0;

GM_registerMenuCommand("YouTube Animated Thumbnails Options", GM_config.open);



//NO EDITING BELOW HERE-///////////////////////////////////

var show_d, hide_d, next_img_intv,
	vi=/vi\/([^\/]+)\/.*\.jpg/,
	ytimg_url=/http:\/\/(.+\.)?ytimg\.com\/vi\//;

	// Make the 3 image preview not exceed the width of the browser
	var css = '.hover_img {position:fixed; top:0; right:0; z-index:9999; text-align:right;} .hover_img img { max-width:'+Math.floor(window.innerWidth/3-6)+'px;}';
	if(typeof GM_addStyle=='function') GM_addStyle(css);
	else {
    var style = document.createElement('style').setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].appendChild(style).innerHTML=css;
	}

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	var ret=document.createElement(a.toLowerCase());
	if(!b) return ret;
	for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for each(var child in c) ret.appendChild(child);
	return ret;
}

function nextimg() {
var imgs = document.evaluate("//img[@animate='true']",document,null,6,null), ddef=/(\d|default)\.jpg/;
//for(var i=0,img; (img=imgs.snapshotItem(i)); i++) {
var img;
if (!imgs.snapshotItem(elmCount)) {elmCount = 0;}
for (elmCount; (imgs.snapshotItem(elmCount).getBoundingClientRect ().bottom<1 || imgs.snapshotItem(elmCount).getBoundingClientRect ().top>document.body.clientHeight+10); elmCount++) {if (!imgs.snapshotItem(elmCount)) {elmCount = 0;}};
img = imgs.snapshotItem(elmCount);
	switch(img.src.match(ddef)[0]) {
		case 'default.jpg':img.src=img.src.replace('default.jpg', '1.jpg');break;
		case '1.jpg':img.src=img.src.replace('1.jpg', '2.jpg');break;
		case '2.jpg':img.src=img.src.replace('2.jpg', '3.jpg');break;
		case '3.jpg':img.src=img.src.replace('3.jpg', 'default.jpg');break;
		}
//	console.log(img);
//	console.log(img.getBoundingClientRect ().top);
//	console.log(img.getBoundingClientRect ().bottom);
//	console.log(document.body.clientHeight);
elmCount ++;
//	}
}

// Get ID
function $(ID) {return document.getElementById(ID);}

function getID(str) {
var id=str.match(vi);
return (id && id.length>1)?id[1]:null;
}

function show(e) {
e = e.target;
if(e.getAttribute("atchd") === "true" && e.className != "hover_img_thumb") {
window.clearTimeout(hide_d); hideall();
show_d = window.setTimeout(function(d){
if($("movie_player")) $("movie_player").style.visibility="hidden";
if(d) d.style.display = '';
}, show_delay*1000, $('hover_'+getID(e.src)));
}
}

function hide(e) {
var e = e.target;
window.clearTimeout(show_d);
if(e.getAttribute("atchd") != "true" && e.className != "hover_img_thumb") {
	hideall();
	if($("movie_player")) $("movie_player").style.visibility="visible";
}
}

function hideall() {
window.clearTimeout(show_d);
if($("movie_player")) $("movie_player").style.visibility="visible";
var divs = document.evaluate("//div[starts-with(@id, 'hover_') and @class='hover_img' and not(contains(@style,'none'))]",document,null,6,null);
for(var i=0,div; (div=divs.snapshotItem(i)); i++) div.style.display = 'none';
}

function hoverset() {
var imgs = document.evaluate("//img[contains(@src, 'ytimg.com/vi')]",document,null,6,null);
for(var i=0,img; (img=imgs.snapshotItem(i)); i++) {
var ID = getID(img.src);
if(ID && img.getAttribute("atchd") !== "true") {
//img.addEventListener('mouseover', function(e){show(e.currentTarget);}, false);
//img.addEventListener('mouseout', function(e){hide(e.currentTarget);}, false);
img.setAttribute("atchd", "true");
}
if(ID && !$('hover_'+ID)) {
var url = (img.src.match(ytimg_url)||'')[0];
document.body.appendChild(create('div', {className:'hover_img',style:'display:none;',id:'hover_'+ID,innerHTML:"<img class=\"hover_img_thumb\" src=\""+url+ID+"/1.jpg\"><img class=\"hover_img_thumb\" src=\""+url+ID+"/2.jpg\"><img class=\"hover_img_thumb\" src=\""+url+ID+"/3.jpg\">"}));

// pre-load images
for(var imgI = 1; imgI <= 3; imgI++) new Image().src = url + ID + "/" + imgI + ".jpg";

}
}
}

// hover images initiation
if(enable_hover_images) window.setTimeout(function(){ hoverset(); window.setInterval(hoverset, 3000); }, execution_delay * 1000);
window.addEventListener("mouseover", show, false);
window.addEventListener("mouseout", hide, false);

// animated thumbnails initiation
if(enable_animated_thumbnails) window.setTimeout(function(){
var array=document.evaluate("//img[contains(@src, 'ytimg.com/vi')]",document,null,6,null);
for(var i=0,item; (item=array.snapshotItem(i)); i++) {
if (item.getAttribute("class", 0) != "hover_img_thumb") {
//if (!item.getAttribute("data-thumb", 0)) {
item.setAttribute('animate', 'true');
//}
}
}
next_img_intv = window.setInterval(nextimg, switch_interval*1000);
}, execution_delay * 1000);

window.addEventListener('click', hideall, false);