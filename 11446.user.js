// ==UserScript==
// @name           FB_PIC
// @namespace      fb
// @description    Shows the full sized profile picture when you mouseover profile links
// @include        http://*.facebook.com/*
// ==/UserScript==

var myID = null;
function init() {
	if (!document.body)
		window.setTimeout(function(){init();}, 300);
	
	wait(
		function() { return document.getElementsByTagName('li')[0] && !isNaN(document.getElementsByTagName('li')[0].childNodes[0].href.getID()) },
		function() { myID = document.getElementsByTagName('li')[0].childNodes[0].href.getID(); }
	);

	var a = document.getElementsByTagName('a');
	for (var i = 0; i < a.length; i++) {
		if (a[i].href.getID() == myID) continue;
		if (a[i].href.include('profile.php?id=') || a[i].href.include('s.php?k=')) {
			bindEvents(a[i]);
		} else if (a[i].getAttribute("onclick")) {
			if (a[i].getAttribute("onclick").include("show_search_profile"))
				bindEvents(a[i]);
		}
	}
	// Add Pic Element
	var pic = document.createElement('div');
	pic.setAttribute('id', 'FB_PIC');
	pic.style.position = 'absolute';
	pic.style.zIndex = 10000;
	pic.style.visibility = 'hidden';
	document.body.appendChild(pic);
}

function bindEvents(a) {
	a.addEventListener('mouseover', find, true);
	a.addEventListener('mousemove', function(ev) {
		wait(
			function() { return ($('FB_PIC').clientHeight > 0 && $('FB_PIC').clientWidth > 0 && ev.clientX > 0); },
			function() { show(ev.clientX, ev.clientY, $('FB_PIC').clientHeight, $('FB_PIC').clientWidth); } 
		);
	}, true);
	a.addEventListener('mouseout', function(){$('FB_PIC').innerHTML = '';$('FB_PIC').style.visibility='hidden';}, true); 	
}

function find(ev) {
	if (ev.target.tagName == 'IMG') {
		var id = ev.target.parentNode.href.getID() || ev.target.parentNode.getAttribute('onclick').getSearchProfileID();
		var pic = ev.target.src;
	} else if (ev.target.tagName == 'A') {
		if (ev.target.href.include('#')) return;
		var id = ev.target.href.getID() || ev.target.getAttribute('onclick').getSearchProfileID();
		var imgs = document.getElementsByTagName('img');
		
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].src.include(id) && !imgs[i].src.include('photos')) {
				var pic = imgs[i].src;
				break;
			}
		}
	}
	if (pic) {
		pic = pic.substr(0,pic.indexOf(id)-1)+'n'+pic.substr(pic.indexOf(id));
		$('FB_PIC').innerHTML = '<img src="'+pic+'"/>';
	}
} 
function show(x, y, h, w) {
	$('FB_PIC').style.top = window.scrollY+y-(.5*h)+'px';
	while (parseInt($('FB_PIC').style.top,10)+h >= window.innerHeight+window.scrollY)
		$('FB_PIC').style.top = parseInt($('FB_PIC').style.top,10)-30+'px';	

	while (parseInt($('FB_PIC').style.top,10) <= window.scrollY)
		$('FB_PIC').style.top = 30+parseInt($('FB_PIC').style.top,10)+'px'; 
		
	if (window.innerWidth-15 <= window.scrollX+x+w+25)
		$('FB_PIC').style.left = x-w-25+window.scrollX+'px';	
	else
		$('FB_PIC').style.left = (window.scrollX+x+25)+'px';

	$('FB_PIC').style.visibility = 'visible';
}

// *********************
//
// Utility Functions 
//
// *********************
function wait(c,f){	if (c()) f(); else window.setTimeout(function (){wait(c,f)},300,false);}
function $(e) { return document.getElementById(e); }

String.prototype.getID = function(){ return parseInt(this.substr(this.indexOf('id=')+3)); }
String.prototype.getSearchProfileID = function() { return parseInt(this.substr(this.indexOf('(')+1)); }
String.prototype.include = function(pattern){ return this.indexOf(pattern) > -1 }


init();
