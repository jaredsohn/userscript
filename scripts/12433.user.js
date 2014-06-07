// ==UserScript==
// @name           Enlarge facebook profile images
// @namespace      MattiasBlom
// @description    Shows the full sized profile picture when you hover over profile images, in search results or thumbnails on profiles or walls.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// ==/UserScript==

/*

Almost everything stolen from FB_PIC by Michael Coyne.
Different strategy, attach mouseover to all images at 
cdn-servers eg. "profile.ak.facebook.com", forget links.

FB_PIC = http://userscripts.org/scripts/show/11446

Version: 1.1 -  Added hack to get around the asynchronous loading of friendslist.
                Click in the "search" textbox in the menubar and hovering should become enabled.

Version; 1.1b - More of the same hack, reset pictures can now be performed by pressing CTRL+ALT+R

version: 1.2 -  Adapting to the new facebook layout. (we are borg)
version: 1.21 - Adapt: recalibrate shields.
version: 1.22 - Faster setup when updating for partially loaded content.
version: 1.23 - Additional support for Mac, Ctrl+Meta+R for reloading.
version: 1.24 - Adapting, parentnode can be divs now, pls?
version: 1.25 - Profile images are now stored at the CDN.

version: 1.3 - Going back to the roots, no more hooking up event on (parent) divs. Adding support for "q at the end".
version: 1.31 - https-support (different cdn-hostname and new include rules). @match-rules for Chrome.
version: 1.32 - Mouseout on the floating div hides the div. Because of the partial page load sometimes leaving the picture hanging.

*/

function keyHandler(e) {
  
  
  
  
  // If you don't like CTRL+ALT+R, this is where you change it
  var keyToReloadFor = 'r';

  // You can replace: (e.altKey||e.metaKey) && e.ctrlKey
  // 
  // eg: e.altKey && e.shiftKey  => ALT+SHIFT
  // or: e.ctrlKey && e.shiftKey && e.altKey  => CTRL+ALT+SHIFT
  // or: e.altKey   =>
  //
  //     etc
  // the (e.altKey||e.metaKey)-part is mac-special which results in both CTRL+ALT and META+CTRL working at the same time. oh well.

  if(e.which==keyToReloadFor.charCodeAt(0) && (e.altKey||e.metaKey) && e.ctrlKey ){
    init();
  }
}



function init() {

  if (!document.getElementById("FB_PIC_EVO")) {
    var pic = document.createElement('div');
    pic.setAttribute('id', 'FB_PIC_EVO');
    pic.style.position = 'absolute';
    pic.style.zIndex = 10000;
    pic.style.visibility = 'hidden';
    pic.addEventListener('mouseout', function(){hideDiv();}, true);
    document.body.appendChild(pic);
  }
  var imgs = document.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; i++) {
    var imagesrc = imgs[i].src;
    if (imagesrc.include('profile.ak.facebook.com') || imagesrc.include('profile.ak.fbcdn.net') || imagesrc.include('fbcdn-profile-a.akamaihd.net')) {
      if (imagesrc.substr(imagesrc.lastIndexOf('\/')+1,1) == 'q'
          ||
          imagesrc.substr(imagesrc.lastIndexOf('\/')+1,1) == 't'
          ||
          imagesrc.substr(imagesrc.lastIndexOf('.')-1,1) == 'q'
          ||
          imagesrc.substr(imagesrc.lastIndexOf('.')-1,1) == 't'
          ){
        if (!gotEvent(imgs[i])){
        /* old haxxor no longer needed march 10 */ 
          imgs[i].setAttribute('hoversrc', imagesrc);
          imgs[i].addEventListener('mouseover', find, true);
          imgs[i].addEventListener('mousemove', function(ev) {
            wait(
              function() { return ($ge('FB_PIC_EVO').clientHeight > 0 && $ge('FB_PIC_EVO').clientWidth > 0 && ev.clientX > 0); },
              function() { show(ev.clientX, ev.clientY, $ge('FB_PIC_EVO').clientHeight, $ge('FB_PIC_EVO').clientWidth); } 
            );
          }, true);
          imgs[i].addEventListener('mouseout', function(){hideDiv();}, true); 
        }
      }
    }
  }
}

function gotEvent(element) {
  if(element.hasAttribute('hoversrc'))
    return true;
  else if(element.parentNode.hasAttribute('hoversrc')) 
    return true;
  else if(element.parentNode.parentNode.hasAttribute('hoversrc'))
    return true;
  else
    return false;
}

function find(ev) {

  var srcelem = ev.target;
  
  var pic = srcelem.getAttribute('hoversrc');
  
  if (pic) {
  
    //format 1, /[qt]id_12_.jpg
    if (pic.substr(pic.lastIndexOf('\/')+1,1) == 'q' || pic.substr(pic.lastIndexOf('\/')+1,1) == 't' )
    {
      pic = pic.substr(0,pic.lastIndexOf('\/')+1)+'n'+pic.substr(pic.lastIndexOf('\/')+2);    
    }
    // format 2, xxx[qt].jpg
    if ( pic.substr(pic.lastIndexOf('.')-1,1) == 'q' || pic.substr(pic.lastIndexOf('.')-1,1) == 't' )
    {
      pic = pic.substr(0,pic.lastIndexOf('.')-1)+'n'+pic.substr(pic.lastIndexOf('.'));    
    }
  
    $ge('FB_PIC_EVO').innerHTML = '<img src="'+pic+'"/>';
  }
} 


function show(x, y, h, w) {
	$ge('FB_PIC_EVO').style.top = window.scrollY+y-(.5*h)+'px';
	while (parseInt($ge('FB_PIC_EVO').style.top,10)+h >= window.innerHeight+window.scrollY)
		$ge('FB_PIC_EVO').style.top = parseInt($ge('FB_PIC_EVO').style.top,10)-30+'px';	

	while (parseInt($ge('FB_PIC_EVO').style.top,10) <= window.scrollY)
		$ge('FB_PIC_EVO').style.top = 30+parseInt($ge('FB_PIC_EVO').style.top,10)+'px'; 
		
	if (window.innerWidth-15 <= window.scrollX+x+w+25)
		$ge('FB_PIC_EVO').style.left = x-w-25+window.scrollX+'px';	
	else
		$ge('FB_PIC_EVO').style.left = (window.scrollX+x+25)+'px';

	$ge('FB_PIC_EVO').style.visibility = 'visible';
}

function hideDiv() {
	$ge('FB_PIC_EVO').innerHTML = '';$ge('FB_PIC_EVO').style.visibility='hidden';
}


// *********************
//
// Utility Functions 
//
// *********************
function wait(c,f){	if (c()) f(); else window.setTimeout(function (){wait(c,f)},300,false);}
function $ge(e) { return document.getElementById(e); }

String.prototype.include = function(pattern){ return this.indexOf(pattern) > -1 }

init();
if(document.getElementById("q")){
  document.getElementById("q").addEventListener("click", init, false);
}

document.addEventListener('keypress', keyHandler, true);