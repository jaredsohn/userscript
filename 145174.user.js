// ==UserScript==
// @name        FlickrDateAdded
// @description Shows when a photo was added to a group pool
// @namespace   http://vispillo.org
// @require        http://vispillo.org/78952.user.js
// @include     http://www.flickr.com/groups/*/pool/*
// @include     http://www.flickr.com/groups/*
// @grant       GM_addStyle
// @version     1
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


function formatDate(seconds) {
	var now = new Date();
	now = now.getTime()+now.getTimezoneOffset() * 60*1000;
	var when = (now/1000) - seconds;
	var days = parseInt(when/(3600*24));
	if(days > 10) {
		var date = new Date(seconds*1000);
		return date.toLocaleDateString();
	} else {
		var ret = '';
		if(days > 0)
			ret = days + ' day'+((days>1)?'s':'');
		var rest = when - days*3600*24;
		if(when%(3600*24) > 0) {
			if(rest/3600 > 1) {
				if(ret) ret += ', ';
				ret += parseInt(rest/3600)+' h';
			} else if(days < 1)
				ret = "less than an hour";
		} else if(days < 1)
				ret = "less than an hour";
		return ret +' ago';
	}
}

function getPage (page) {
	jQuery.getJSON('http://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&group_id='+gid+'&api_key='+key+'&per_page='+perpage+'&page='+page+'&format=json&nojsoncallback=1&auth_hash='+authhash,function (data) {
    jQuery.each(data.photos.photo,function(i,item) {
	  jQuery('#photo_'+item.id+' > div > span.photo_container').before('<div class="dateoverlay">'+formatDate(item.dateadded)+'</div>');
    });
  });
}

GM_addStyle("div.dateoverlay {color:white;font-size:10px;display: block; height: 14px; left: 5px; position: absolute; top: 8px; width: 40px; text-shadow: 1px 1px 0 black; z-index:9000}");

var key = getJSVariable(/\"?api_key\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
var mode = jQuery('#thumb-options ul li a.selected').text();
var gid = getJSVariable(/\"?group\"?\,\"?id\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
var authhash = getJSVariable(/\"?auth_hash\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);

var page = 1;
var perpage = 72;
var str = '<br />';
if (document.location.href.indexOf('/pool/') == -1) {
  perpage = 72;
  str = '';
}
else if (document.location.href.indexOf('pool/page') != -1 ) {
  var newpage = document.location.href.match(/pool\/page(\d+)/)[1];
  if (newpage) {
    page = (newpage-1)*6;
  }
}

getPage(page);
jQuery(document).bind("DOMNodeInserted", function(e) {
	if (jQuery(e.target).is('div.photo-display-item.page-break')) {
		var pagenum = jQuery(e.target).attr('data-page-num');
		getPage(pagenum);
	}    
});
