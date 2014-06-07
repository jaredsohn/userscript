// ==UserScript==
// @name           FlickrPicMonkey
// @namespace      vispillo
// @description    Adds an "Edit in PicMonkey link to the Action menu"
// @require        http://userscripts.org/scripts/source/78952.user.js
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

jQuery.noConflict();
function getJSVariable (regex) {
  // Credit for this function goes to Alesa Dam
  // Some slight modifications for use with jQuery
  var retval;
  jQuery('script').each( function (i,script) {
    if (retval != undefined) {
      return;
    }
    var html = script.innerHTML;
    try {
      retval = html.match(regex)[1];
    } catch (e) {
    }
  });
  return retval
}	
  
var hash = getJSVariable(/\"?auth_hash\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/)
var key = getJSVariable(/\"?api_key\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
var photoid = document.location.href.split('/')[5];
var url = 'http://www.flickr.com/services/rest/?method=flickr.photos.getSizes&photo_id='+photoid+'&format=json&nojsoncallback=1&auth_hash='+hash+'&api_key='+key;  
var lsize,osize;
jQuery.getJSON(url,function ( data ) {
	jQuery.each(data.sizes.size,function (i,val) {
		if (val.label == "Original") {
			osize = val.source;
		}
		if (val.label == "Large") {
			lsize = val.source;
		}
	});
	var target_url = "http://www.picmonkey.com/service/?_import=";
	if (osize != undefined) {
		target_url = target_url + osize;
	}
	else if (lsize != undefined) {
		target_url = target_url + lsize;
	}
  target_url = target_url + '&originalid=' + photoid + '&_imageid='+photoid+'&_exclude=in&_apikey=9b77de321b42e628d72a56b7b129d214&_export=http://vispillo.org:3000/replace&_export_agent=browser&_export_method=GET';

  if (jQuery('a.option-replace').length > 0) {
    target_url = target_url + '&_replace=ask';
  }
  else {
    target_url = target_url + '&_replace=no';    
  }
  target_url = target_url + '&_close_target='+document.location.href;
	jQuery('#options-menu > ul > li:has(a[data-ywa-name="Edit photos"])').after(jQuery('<li><a tabindex="99" data-ywa-name="Edit photos-Picmonkey" class="ywa-track" href="'+ target_url +'"><span style="background:url(http://www.picmonkey.com/favicon.ico) no-repeat !important"></span>Edit photo in PicMonkey</a></li>'));
});
