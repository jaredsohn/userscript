// ==UserScript==
// @name           MoreNews
// @namespace      com.erepublik.morenews
// @description    MoreNews
// @include        http://www.erepublik.com/*
// @exclude        http://www.erepublik.com/*/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var $ 				= jQuery.noConflict();
var url 			= location.href.split('/');
var dmn 			= url[2].split('.');
jQuery(document).ready(function() {
	if( dmn[0] == "www" && dmn[1] == "erepublik" )
	{
		if(typeof url[4] == 'undefined' && $('#loginbox').length  == 0 )
		{
			//s
			 var oflk = $('#articles > div').html();
			//c
			 $('#articles > div').html('');
			//g
			 $('#articles > div').append('<a class="mbutton" href="/'+url[3]+'/news/rated/1"><img alt="" src="http://www.erepublik.com/images/parts/icon_media_toprated.gif" width="16px"><span>Top News</span></a>');
			 $('#articles > div').append('<a class="mbutton" href="/'+url[3]+'/news/latest/1"><img alt="" src="http://www.erepublik.com/images/parts/icon_media_latest.gif" width="16px"><span>Last News</span></a>');
			 $('#articles > div').append('<a class="mbutton" href="/'+url[3]+'/news/international"><img alt="" src="http://www.erepublik.com/images/parts/icon_media_international.gif" width="16px"><span>Top News International</span></a>');
			 $('#articles > div').append(oflk);
		}
	}
});