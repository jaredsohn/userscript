// ==UserScript==
// @name         Fix BMXBOARD
// @namespace    BMXBOARDFixer
// @match		 http://*.bmxboard.com/*
// @include      http://*.bmxboard.com/*
// @author       Jim Wright
// @description  Fix bmxboard
// ==/UserScript==

// Add jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();
  var form = '<form id="SearchForm" method="POST" action="http://www.bmxboard.com/cgi-bin/ubbcgi/search.cgi"><input name="ForumChoice" id="ForumChoice" type="hidden"/><input name="SearchIn" value="ALL" type="hidden"/><input name="SearchDate" value="5" type="hidden"/><input type="hidden" value="simplesearch" name="action"/></form>';
  jQuery('body').prepend(form);
  var links = jQuery('a[href*="forumdisplay.cgi"]');
  var forum;
  var startLink;
  for(var i = 0; i < links.length ; i++){
	  startLink = jQuery(links[i]).attr('href');
	  forum = getURLParam(startLink,'number');
	  jQuery(links[i]).attr('id','forum'+forum);
	  jQuery(links[i]).click(function(e){
		  e.preventDefault();
		  jQuery('#ForumChoice').val(jQuery(this).attr('id').replace('forum',''));
		  jQuery('#SearchForm').submit();
	   });
  }
}, false);

function getURLParam(url, name) {
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    return results[1] || 0;
}
