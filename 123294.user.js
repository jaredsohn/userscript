// ==UserScript==
// @name			Whirlpool Plus Mobile
// @namespace		WhirlpoolPlusMobile
// @description		Mobile version of Whirlpool Plus
// @version			0.0.1
// @include			http://forums.whirlpool.net.au/*
// @include			http://whirlpool.net.au/*
// @include			http://bc.whirlpool.net.au/*
// ==/UserScript==
// ==Changes==
/***************
 changes - 0.0.l - Inital Version
 ***************/
// ==/Changes==

try {
	//bring opera up to speed....
	if(typeof unsafeWindow == 'undefined'){
		//DO NOT put var in front. Otherwise greasemonkey wil play silly buggers
		unsafeWindow = window;
	}
	if(typeof GM_addStyle == 'undefined'){
		function GM_addStyle(css) {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
			  var node = document.createElement("style");
			  node.type = "text/css";
			  node.appendChild(document.createTextNode(css));
			  heads[0].appendChild(node); 
			}
		}
	}

	$ = unsafeWindow.jQuery;
	
	function noMobileUrl(url){
		if(url.match(/nomobile/) != null){
			return url;
		}
		if(url.indexOf('?') != -1){
			return url.replace(/\?/,'?nomobile&');
		}else{
			if(url.indexOf('#') != -1){
				return url.replace(/\#/,'?nomobile#');
			}else{
				return url + '?mobile=nomobile';
			}
		}
	}
	
	function mobileUrl(url){
		return url.replace(/nomobile/,'');	
	}
	
	if(document.location.toString().match(/nomobile/) == null){
		$('head').append('<meta name="viewport" content="width=device-width">');
		
		GM_addStyle('#threads thead, #root #content .shim-swoosh, #rules0, #logo, #logosub, #content #replies #top_pagination li, #content #replies #foot_pagination li, #footer,.tools[id^="short"],td.reps,td.reads,tr.deleted td[colspan="2"]:not(.title):not(.newest), tr.pointer td[colspan="2"]:not(.title):not(.newest), col.reps, col.reads, td.oldest, col.oldest, td.bodypost, col.c3, td.bodyuser, col.c1 {display:none;}' +
		'.bodypost_moved { font: 10px \'Lucida Grande\',Verdana,Arial,Helvetica,sans-serif; text-align:right; }' +
		'.bodypost_moved * { display: inline; }' +
		'#replies tr td div.bodypost_moved div.date { margin-bottom: 0; }' +
		'.bodyuser_moved { font: 10px \'Lucida Grande\',Verdana,Arial,Helvetica,sans-serif; text-align:left; }' +
		'.bodyuser_moved * { display: inline; }' +
		'.bodyuser_moved .userstats, .bodyuser_moved .voteblock { float: right; }' +
		'#replies .search_mini { float: none; }' +
		'#replies { margin-top: 10px; }' +
		'#replies > table > tbody > tr:nth-of-type(even) > td { background-color: #ddd !important; background-image: none !important; }' +
		'#content { padding: 25px 0 0 0; margin:0; }' +
		'#content ul#breadcrumb li { font-size: 1.5em; }' +
		'#replies .buttons a.breply span { display: inline; }' +
		'#replies .buttons a.breply { background: none; height: auto; width: auto; background-color: #3A437B; color: white; font: bold 13px Arial,sans-serif; margin: 6px 0 0 2px; padding: 0.3em 0.6em; }' +
		'#root #content ul.pagination li { border: none; }' +
		'#root #content #top_pagination.tabby li a { padding-bottom: 4px; }' +
		'#root #content #foot_pagination.tabby li a { border-radius: 4px !important; padding-top: 1px; }' +
		'#content ul#breadcrumb { position: relative; top: -1.2em; left: auto; right: auto; }' +
		//general stuff
		'#root { margin: 40px 0 0 0; max-width: none !important;  width: 100% !important; }' +
		'#content, #left { width: 100% !important; }' +
		'#content { margin-left: 0px; overflow: hidden; border-radius: 0; }' +
		'#root #replies .topbar, #root #replies .footbar { border-radius: 0; }' +
		'body, html { min-width: 220px; margin: 0; padding: 0; width: 100%; }' +
		'.bodytext, .bodytext * { width: auto!important; } ' +
		'#root #content #replies .bodytext { border-top: none; padding-top: 5px !important; } ' +
		'#index .column { float: none !important; width: auto !important; } ' +
		'#index h3 { border-radius: 0; } ' +
		'#threads { margin-top: 10px; } ' +
		'#profile #dataentry { width: auto; padding: 1px; } ' +
		'#profile #dataentry table th { background: none; } ' +
		//top menu
		'#root #left { position: absolute; top: -40px; left: 0; width: 100%; height: 40px; border:none;}' +
		'#root #left * { float: left !important; }' +
		'#root #left dl, #root #left #menu .shim1 { display: none; }' +
		'#root #left #menu li ul { display: none; }' +
		'#root #left #menu { border-bottom: 1px solid #fff; border-radius: 0; padding-bottom: 2px; }' +
		'#left ul#menu > li > a span { padding: 0; }' +
		'#left ul#menu { background-color: #414B8B; width: 100%; display: inline-block; box-shadow: none; margin: 0; }' +
		'#root #left #menu li { width: 20%; margin-top: 2px; text-align:center; }' +
		'#root #left #menu li * { width: 100%; }' +
		'#root #left #menu * { overflow: visible; background: none !important; font-size: 1em !important; letter-spacing: 0; color:#D3DEFF; text-shadow: none; }'+
		'#root #left dl.userinfo { width: 100%; margin: 0; display: inline-block; }' +
		'#root #left dl.userinfo > * { width: 20%; text-align: center; font-size: 1em; border:0; margin:0;padding:0; margin-top: 2px; }' +
		'#left dl dd a { border: none; font: 1em Georgia,Cambria,Charter,\'Century Schoolbook\',serif;}' +
		'#root #left dl.userinfo dt { font-weight: bold; }' +
		'#root #left dl.userinfo dt *, #root #left dl.userinfo dd * { width: 100%; }' +
		'#root #left dl.userinfo dd:first-of-type { display: none; }' +
		//user page
		'#threads table tbody tr.section td { padding: 0.7em 0 !important; }' +
		'#userprofile div {float: none !important; width: 80% !important; margin:0 auto !important;}' +
		'#userprofile > h2 {width: 80% !important; margin: 15px auto 15px auto;}' +
		'#userprofile div:nth-of-type(2) table tr td:nth-of-type(1) { display: none; }');
		
		$('.pointer .title, .deleted .title').prop('colspan','');
		
		$('#menu_news a span').text('News');
		$('#menu_bc a span').text('BC');
		$('#menu_forum a span').text('Forum');
		$('#menu_wiki a span').text('Wiki');
		$('#menu_industry a span').text('Jobs');
		$('.userinfo a[href$="/whim/"]').text('Whims');
		$('.userinfo a[href$="/profile/"]').text('Profile');
		
		$('#sign_in').before('<dl class="userinfo"><dt><a href="http://whirlpool.net.au/profile/"><span>Sign In</span></a></dt></dl>');
		$('.userinfo').append('<dd><a href="#" onclick="window.location = \'' + noMobileUrl(window.location.href) + '\';return false;">Desktop</a></dd>');
		
		if(document.location.toString().match(/forum-replies/)){
			$('.bodyuser').each(function(){
				var row = $(this);
				row.next().prepend('<div class="bodyuser_moved">' + row.html().replace(/<div>/g,'<div class="userstats">').replace(/<div style="color:#555">(.*?)<\/div>/g,'<br /><div style="color:#555">$1<\/div>') + '</div><hr style="clear:both; margin-bottom: 2px; margin-top: 10px;">');
				row.next().append('<hr style="clear:both; margin-bottom: 2px; margin-top: 10px;"><div class="bodypost_moved">' + 
					row.next().next().html().replace(/Reply to this post/g,'Reply').replace(/Send whim/g,'Whim') + '</div>');
			});
			
			$('#replies table tr:not([id^="r"])').each(function(){
				var cols = $(this).children();
				$(cols[0]).append($(cols[1]).hide().html()).append($(cols[2]).hide().html());
			});
			
			$('.topbar').prepend('<p style="text-align: center; padding: 8px 0 0 10px; margin:0; font-size: 0.8em;"><a href="javascript:void(0)" onclick="$(\'#content #replies #top_pagination li\').css(\'display\',\'inline\');$(this).hide();return false;" style="color: white;">Show All</a></p>');
			$('.footbar').prepend('<p style="text-align: center; padding: 10px 0 0 10px; margin:0; font-size: 0.8em;"><a href="javascript:void(0)" onclick="$(\'#content #replies #foot_pagination li\').css(\'display\',\'inline\');$(this).hide();return false;" style="color: white;">Show All</a></p>');
			
			$('.current').next(':not(.last)').css('display','inline');
			$('.current').css('display','inline');
			$('.current').prev(':not(.first)').css('display','inline');
		}
	}else{
		$('#menu_industry').after('<li id="menu_mobile" class="even "><a class="xx" href="#" onclick="window.location = \'' + mobileUrl(window.location.href) + '\';return false;"><span id="mobileVersion">WP+ Mobile</span></a><span class="shim1"></span></li>');
	}
	
}catch(e){
	if(e == 'TypeError: $ is not a function'){
		//caused by incomplete page loads
	}else{
		alert(e);
	}
}