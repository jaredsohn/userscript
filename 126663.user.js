// ==UserScript==
// @name			Google Custom Top Menu v1.3
// @namespace		www.vertigofx.com
// @description		Customizes Google search's top menu.
// @include			https://*.google.com/*
// @include			http://*.google.com/*

// ==/UserScript==

function MenuMod() {
	CustomMenu = 

	// CUSTOMIZE MENU ITEMS BELOW

		Gmail+
		Search+
		Images+
		Videos+
		Shopping+
		Maps+
		YouTube+
		MoreDropDown+


	// CUSTOMIZE MENU ITEMS ABOVE.  PUT EACH ITEM ON A NEW LINE.  END ALL ITEMS WITH +
	// ALL ITEMS ARE CASE SENSITIVE
	
	// AVAILABLE GOOGLE MENU ITEMS ARE:		GPname, Search, Images, Videos, YouTube, Gmail,
	//										Maps, News, Shopping, Sites, Blogs, Translate, Scholar,
	// 										Finance, Books, Calendar, Photos, Documents, Groups, Reader
	
	// EXTRA MENU ITEMS ARE AS FOLLOWS:		br			=	INSERTS A LINE BREAK (STARTS A NEW ROW *unfinished feature*)
	//										Facebook	=	INSERTS A LINK TO FACEBOOK 
	//										Twitter		=	TWITTER LINK
	//										deviantART	=	DEVIANTART LINK
	//										WordPress	=	WORDPRESS LINK
	//										
	
	
	// DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING //
	
	'&nbsp;';

	
	document.getElementById('gbz').innerHTML = '<span class="gbtcb"></span><ol class="gbtc">'+CustomMenu+'</ol>';
	

	
}


var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
	//alert($); // check if the dollar (jquery) function works
	//alert($().jquery); // check jQuery version
	
	Facebook = '<li class="gbt"><a onclick="gbar.logger.il(1,{t:38});" class="gbzt" href="http://www.facebook.com"><span class="gbtb2"></span><span class="gbts">Facebook</span></a></li>';
	Twitter = '<li class="gbt"><a onclick="gbar.logger.il(1,{t:38});" class="gbzt" href="http://www.twitter.com"><span class="gbtb2"></span><span class="gbts">Twitter</span></a></li>';
	deviantART = '<li class="gbt"><a onclick="gbar.logger.il(1,{t:38});" class="gbzt" href="http://www.deviantart.com"><span class="gbtb2"></span><span class="gbts">deviantART</span></a></li>';
	WordPress = '<li class="gbt"><a onclick="gbar.logger.il(1,{t:38});" class="gbzt" href="http://www.wordpress.com"><span class="gbtb2"></span><span class="gbts">WordPress</span></a></li>';
	
	//<img src="http://www.vertigofx.com/userscripts/GoogleTopMenuMod/fb-icon.png" style="position:relative;top:3px;margin-right:2px;">
	
	MoreDropDown = '<li class="gbt">' + $('a#gbztm').parent().html() + '</li>';
	
	GPname = '<li class="gbt">' + $('a#gb_119').parent().html() + '</li>';
	Search14 = $('a#gb_14').parent().html();
	Search1 = $('a#gb_1').parent().html();
	Search = Search14 || Search1;
	if (Search) {
		Search = '<li class="gbt">' + Search + '</li>';
	} else {
		Search = "";
	}
	Images = '<li class="gbt">' + $('a#gb_2').parent().html() + '</li>';
	Videos = '<li class="gbt">' + $('a#gb_12').parent().html() + '</li>';
	Maps = '<li class="gbt">' + $('a#gb_8').parent().html() + '</li>';
	News = '<li class="gbt">' + $('a#gb_5').parent().html() + '</li>';
	
	Sites = '<li class="gbt"><a onclick="gbar.logger.il(1,{t:38});" class="gbmt" id="gb_38" href="https://sites.google.com/?tab=w3">Sites</a></li>';
	
		$('a#gb_38.gbmt').html('<span class="gbtb2"></span><span class="gbts">Sites</span>');
		$('a#gb_38.gbmt').attr('class', 'gbzt');
	Shopping = '<li class="gbt">' + $('a#gb_6').parent().html() + '</li>';
	
	Gmail = '<li class="gbt">' + $('a#gb_23').parent().html() + '</li>';
	
		$('a#gb_2.gbmt').html('<span class="gbtb2"></span><span class="gbts">Images</span>');
		$('a#gb_2.gbmt').attr('class', 'gbzt');
	Images = '<li class="gbt">' + $('a#gb_2.gbzt').parent().html() + '</li>';
	
		$('a#gb_12.gbmt').html('<span class="gbtb2"></span><span class="gbts">Videos</span>');
		$('a#gb_12.gbmt').attr('class', 'gbzt');
	Videos = '<li class="gbt">' + $('a#gb_12.gbzt').parent().html() + '</li>';
	
		$('a#gb_8.gbmt').html('<span class="gbtb2"></span><span class="gbts">Maps</span>');
		$('a#gb_8.gbmt').attr('class', 'gbzt');
	Maps = '<li class="gbt">' + $('a#gb_8.gbzt').parent().html() + '</li>';
			
		$('a#gb_6.gbmt').html('<span class="gbtb2"></span><span class="gbts">Shopping</span>');
		$('a#gb_6.gbmt').attr('class', 'gbzt');
	Shopping = '<li class="gbt">' + $('a#gb_6.gbzt').parent().html() + '</li>';
			
		$('a#gb_5.gbmt').html('<span class="gbtb2"></span><span class="gbts">News</span>');
		$('a#gb_5.gbmt').attr('class', 'gbzt');
	News = '<li class="gbt">' + $('a#gb_5.gbzt').parent().html() + '</li>';
		
		$('a#gb_51.gbmt').html('<span class="gbtb2"></span><span class="gbts">Translate</span>');
		$('a#gb_51.gbmt').attr('class', 'gbzt');
	Translate = '<li class="gbt">' + $('a#gb_51.gbzt').parent().html() + '</li>';
	
		$('a#gb_10.gbmt').html('<span class="gbtb2"></span><span class="gbts">Books</span>');
		$('a#gb_10.gbmt').attr('class', 'gbzt');
	Books = '<li class="gbt">' + $('a#gb_10.gbzt').parent().html() + '</li>';
	
		$('a#gb_27.gbmt').html('<span class="gbtb2"></span><span class="gbts">Finance</span>');
		$('a#gb_27.gbmt').attr('class', 'gbzt');
	Finance = '<li class="gbt">' + $('a#gb_27.gbzt').parent().html() + '</li>';
	
	Scholar = '<li class="gbt"><a href="http://scholar.google.com/schhp?hl=en&amp;tab=ss" class="gbzt" id="gb_9" onclick="gbar.logger.il(1,{t:9});"><span class="gbtb2"></span><span class="gbts">Scholar</span></a></li>';
	
	Blogs = '<li class="gbt"><a href="http://www.google.com/blogsearch?hl=en&tab=wb" class="gbzt" id="gb_13" onclick="gbar.logger.il(1,{t:13});"><span class="gbtb2"></span><span class="gbts">Blogs</span></a></li>';

		$('a#gb_36.gbmt').html('<span class="gbtb2"></span><span class="gbts">YouTube</span>');
		$('a#gb_36.gbmt').attr('class', 'gbzt');
	YouTube = '<li class="gbt">' + $('a#gb_36.gbzt').parent().html() + '</li>';
	
		$('a#gb_24.gbmt').html('<span class="gbtb2"></span><span class="gbts">Calendar</span>');
		$('a#gb_24.gbmt').attr('class', 'gbzt');
	Calendar = '<li class="gbt">' + $('a#gb_24.gbzt').parent().html() + '</li>';
	
		$('a#gb_31.gbmt').html('<span class="gbtb2"></span><span class="gbts">Photos</span>');
		$('a#gb_31.gbmt').attr('class', 'gbzt');
	Photos = '<li class="gbt">' + $('a#gb_31.gbzt').parent().html() + '</li>';
	
		$('a#gb_25.gbmt').html('<span class="gbtb2"></span><span class="gbts">Documents</span>');
		$('a#gb_25.gbmt').attr('class', 'gbzt');
	Documents = '<li class="gbt">' + $('a#gb_25.gbzt').parent().html() + '</li>';
	
	Sites = '<li class="gbt"><a href="https://sites.google.com/?tab=w3" class="gbzt" id="gb_38" onclick="gbar.logger.il(1,{t:38});"><span class="gbtb2"></span><span class="gbts">Sites</span></a></li>';

	Groups = '<li class="gbt"><a href="http://groups.google.com/grphp?hl=en&tab=wg" class="gbzt" id="gb_3" onclick="gbar.logger.il(1,{t:3});"><span class="gbtb2"></span><span class="gbts">Groups</span></a></li>';

		$('a#gb_32.gbmt').html('<span class="gbtb2"></span><span class="gbts">Reader</span>');
		$('a#gb_32.gbmt').attr('class', 'gbzt');
	Reader = '<li class="gbt">' + $('a#gb_32.gbzt').parent().html() + '</li>';
	
	br = '<br>';
	//alert(Reader);
	MenuMod();
	
	menuHeight = $('.gbtc').outerHeight();
	//$('#gb').height(menuHeight);
	//$('#gbx3').height(menuHeight);
	//$('#gbx4').height(menuHeight);
	
	
}
