// ==UserScript==
// @name           Arrow Keys
// @namespace      http://azarask.in/weardrobe
// @description    Enables up and down key support for weardrobe.
// @include        http://weardrobe.com/
// @include        http://weardrobe.com/wstylebook
// ==/UserScript==

var fz_sc;
var jQuery = null;

function init() {
	if (unsafeWindow.jQuery == null) {  
		if (fz_sc == null) {
			fz_sc = document.createElement("script");
			fz_sc.src = "http://code.jquery.com/jquery-latest.js";
			document.getElementsByTagName("head")[0].appendChild(fz_sc);
		}
		setTimeout(init, 500);
	} else {	
		eval("unsafeWindow.jQuery.noConflict()");
		jQuery = unsafeWindow.jQuery;
		goNext();
	}
}
init();

function goNext(){

var featured = jQuery("#allfeatures > div");

function findCurrentPhoto(){
  var scrollY = window.scrollY;
  var currentPhoto = null;
  
  for( var i=0; i<featured.length; i++){
    var theTop = jQuery(featured.get(i)).position().top;
    if( theTop > scrollY+10 ){
      if( i==0 ) i=1;
      currentPhoto = featured.get(i-1);
      break;
    }
  }
  
  console.log( currentPhoto );
  return currentPhoto;
}

function scrollNext(){
  var curr = findCurrentPhoto();
  var next = jQuery(curr).next();

  jQuery('html,body').animate({scrollTop: next.position().top}, 500);  
}

function scrollPrev(){
  var curr = findCurrentPhoto();
  var next = jQuery(curr).prev();

  jQuery('html,body').animate({scrollTop: next.position().top}, 500);  
}

jQuery(document).keydown(function(event){
  if( event.keyCode == 40){
    scrollNext();
    
    if( window.scrollY == window.scrollMaxY){
      unsafeWindow.location.assign("http://weardrobe.com/wstylebook");
    }
    event.preventDefault();
  }
  
  if( event.keyCode == 38){
    scrollPrev();
    event.preventDefault();
  }
});


}
