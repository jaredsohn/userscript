// ==UserScript==
// @name           Techpowerup image enlarge
// @namespace      maeki.org
// @description    Show large images by hovering over thumbnails
// @include        http://www.techpowerup.com/*
// ==/UserScript==

// A lot of code borrowed from FB_PIC http://userscripts.org/scripts/review/11446

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

function wait(c,f){	if (c()) f(); else window.setTimeout(function (){wait(c,f)},300,false);}
function $(e) { return document.getElementById(e); }

function find(ev) {
  if (ev.target.tagName == 'IMG') {
    var pic = ev.target.src;
  } 		
  if (pic) {
    pic = pic.replace('_thm', '');
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


var news = document.getElementsByClassName('newstext');
for (var i=0;i<news.length;i++) {
  var newsimgs = news[i].getElementsByTagName('img');
  for (var j=0;j<newsimgs.length;j++) {
    var t = newsimgs[j];
    if(t && t.src.match('_thm')) {
      bindEvents(newsimgs[j]);
    }
  }
 }
// Add Pic Element
var pic = document.createElement('div');
pic.setAttribute('id', 'FB_PIC');
pic.style.position = 'absolute';
pic.style.zIndex = 10000;
pic.style.visibility = 'hidden';
document.body.appendChild(pic);
  
