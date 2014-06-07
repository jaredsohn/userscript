// ==UserScript==
// @name        South Park Studios Fullscreen  
// @description To view every next episode in fullscreen mode without getting out of bed to click the fullscreen button. To turn it on go to about:config and type "full-screen-api.allow-trusted-requests-only" and toggle it to 'false'. That's it.
// @include     http://www.southparkstudios.com/full-episodes/
// @include     https://*.southparkstudios.com/full-episodes/*
// @include     https://*.southparkstudios.com/full-episodes/*/*
// @include     http://*.southparkstudios.com/full-episodes/*
// @include     http://*.southparkstudios.com/full-episodes/*/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require 	http://brandonaaron.net/javascripts/plugins/mousewheel.js
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

function addStyleSheet(style){
	var getHead = document.getElementsByTagName("HEAD")[0];
	var cssNode = window.document.createElement("style");
	var elementStyle = getHead.appendChild(cssNode)
	elementStyle.innerHTML = style;
	return elementStyle;
}


addStyleSheet('@import url("https://googledrive.com/host/0B74PWHf7Odr6dmJ2MDZQamRHZEE/");');


var mdiv = document.createElement("div");
mdiv.id = "mdiv";
var i = null;
$("#flashcontent").mousemove(function() {
    clearTimeout(i);
    $(mdiv).fadeIn(200);
    i = setTimeout('$(mdiv).fadeOut(200);', 3000);
	}).mouseleave(function() {
    clearTimeout(i);
    $(mdiv).fadeOut(200); 
});

document.getElementById("flashcontent").appendChild(mdiv);

var wrap = document.createElement("ul");
wrap.id = "navwrap";
document.getElementById("mdiv").appendChild(wrap);

var wrapsl = document.createElement("div");
wrapsl.id = "wrapsl";
wrapsl.className = "nano";
wrapsl.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
function MouseWheelHandler(e) {
	var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	
	val = $(wrapsl).scrollTop() - (delta * 200);
	jQuery(wrapsl).stop().animate({
		scrollTop: val
	}, 500);
	return false;
};
document.getElementById("mdiv").appendChild(wrapsl);

var wrapep = document.createElement("ul");
wrapep.id = "wrapep";
wrapep.className = "content";
document.getElementById("wrapsl").appendChild(wrapep);

window.onload=fullscreen();


document.addEventListener("keyup", function(e) {
	if (e.keyCode == 13) {
    	if (document.mozFullScreen){
			return exitfullscr();
			
			} else {
			return fullscreen();
		}
	}
}, true);

document.addEventListener("mozfullscreenchange", function () {
	if (document.mozFullScreen) {
		if ($("#header").is(":visible") || $(".fullepisodeplayer").is(":visible")) {
			$(".fullepisodeplayer").hide();
			$("#header").hide();
			var nav = document.getElementById("rightbtn");
			nav.style.display = "none";
		}
		} else {
		if ($("#header").is(":hidden") || $(".fullepisodeplayer").is(":hidden")) {
			$(".fullepisodeplayer").show();
			$("#header").show();
			var nav = document.getElementById("rightbtn");
			nav.style.display = "block";
		}
	}
}, false);

function fullscreen() {

	var elem = document.getElementById("flashcontent");
	req =  elem.mozRequestFullScreen;
	req.call(elem);
	
}



var btn=document.createElement("BUTTON");
btn.type="button";
btn.textContent = "Full Screen"
btn.className = "fullscr";

btn.onclick = function() {
	if (document.mozFullScreen){
		return exitfullscr();
		
		} else {
		return fullscreen();
	}
}

function exitfullscr() {
	
	document.mozCancelFullScreen();
}

function addCss(cssString) { 
	var head = document.getElementsByTagName('head')[0];
	var newCss = document.createElement('style'); 
	newCss.type = "text/css"; 
	newCss.innerHTML = cssString; 
	head.appendChild(newCss); 
}


function LoadElement() {
	document.getElementById("flashcontent").appendChild(btn);
	
	addCss ( 
	'\
	.fullscr {   background: none repeat scroll 0 0 rgba(0, 0, 0, 0);   border: medium none;    bottom: 0;    color: #B5B5B5;    display: block;    font-size: 0;   height: 37px;    padding: 7px; position: absolute; right: 7px; width: 33px;}\
	:-webkit-full-screen .fullscr {background: #ccc;} \
	\
	'
	);
} 

$(document).ready(function () {
	LoadElement();
	
});


function getSeasons() {
	
	var parent = $("#content_epfinder_title").parent();
	if (parent.length > 0) {
		
		var olem = parent.find('ol').eq(0);
		var liem = olem.children("li");
		
		$(liem).each(function( index ) {
			var liel = document.createElement("li");
			liel.innerHTML = index + 1;
			liel.onclick = function (event) {
				return GetSeEp(event);
			}
			document.getElementById("navwrap").appendChild(liel)
		});
	}
}

function GetSeEp(e) {
	var clel = e.target;
	var season = clel.innerHTML;
	var promoId = $("nav.content_epfinder").attr("data-promoId");
	var feed = "http://www.southparkstudios.com/feeds/full-episode/carousel/" + season + "/" + promoId;
	
	var req = GM_xmlhttpRequest({
		method: "GET",
		url: feed,
		onload: function (data) {
			var json = sanitize(data);
			generateMarkup(json);
			req = null;
		}
	});
	
}
function sanitize (json) {
	json = eval("(" + json.responseText + ")");
	return json;
}

function generateMarkup(json) {
	document.getElementById("wrapep").innerHTML = '';
	$.each(json.season.episode, function (index, episode) {
		
		var epli =  document.createElement("li");
		document.getElementById("wrapep").appendChild(epli);
		var se = episode.episodenumber.substring(0,2);
		var ep = episode.episodenumber.substring(2,4);
		
		var linkcont = document.createElement("a");
		linkcont.onclick = function () {
			var epid = episode.id; 
			var flobj = document.getElementById("mtvnPlayer");
			flobj.setAttribute("data", "http://media.mtvnservices.com/mgid:arc:episode:southparkstudios.com:" + epid); 
		}
		linkcont.innerHTML ="<img src='"+ episode.thumbnail +"'>" + episode.title + "<span>" + se + "x" + ep + "</span><p>" + episode.airdate + "</p>";
		epli.appendChild(linkcont);
		
	});
}

window.onresize = displayWindowSize;
window.onload = displayWindowSize;
function displayWindowSize() {
	vpw = $('#flashcontent').width(); 
	vph = $('#flashcontent').height(); 
	$('#wrapsl').css("height", (vph - 140) + "px" );
};


getSeasons();