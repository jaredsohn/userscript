// ==UserScript==
// @name        Todays PPC script
// @namespace   http://gh4ck3r.com
// @description Ad remover for Todays PPC site
// @include     http://www.todaysppc.com/*
// @require	http://code.jquery.com/jquery-1.10.1.min.js
// @version     5
// @grant       none
// ==/UserScript==

$(document).ready(function(){
	var ads = $();
	ads.add('iframe[src^="http://www.todaysppc.com/mbzine/bbs/skin/nzeo_bbs1/google_each3.php"]')
		.add('iframe[src^="http://61.100.186.155/mbzine/bbs/google_top.php"]')
		.add('iframe[src^="/mbzine/bbs/google_sky"]')
		.add($('iframe#aswift_0').parent().parent().parent().parent().parent().parent())
		.add($('img[src="http://www.todaysppc.com/imge/todaysppc_logo.gif"]').parent())
		.add($('img[src="http://www.todaysppc.com/imge/2012_08_02_070player_01.jpg"]').parent())
		.add($('img[src="http://www.todaysppc.com/imge/partner_banner.jpg"]').parent())
		.add($('img[src="/imge/MK802.jpg"]').parent())
		.add($('img[src="http://www.todaysppc.com/userfiles/image/lumia_banner_1.gif"]').parent())
		.add($('img[src="http://www.todaysppc.com/userfiles/image/banner_greenphone_800_1_1.gif"]').parent())
		.add($('img[src="http://www.todaysppc.com/imge/tpc_andoird_app.jpg"]').parent().parent().parent())
		.add('ins.adsbygoogle')
		.add($('a[href^="http://www.todaysppc.com/gong/"]').parent().parent().parent().parent())
		.remove();

	$('iframe#work')
		.attr('onload',null)
		.bind('load', function(){
			$(this).height(this.contentDocument.body.offsetHeight);
		});


	var communityMenuTitle = $('img[src="/imge/m_comm.jpg"]').parent().parent();
	var communityMenu = communityMenuTitle.next('tr');
	makeSlideMenu(communityMenuTitle, communityMenu);
	
	var userGroupMenuTitle = $('img[src="/imge/m_user.jpg"]').parent().parent();
	var userGroupMenu = userGroupMenuTitle.next('tr');
	makeSlideMenu(userGroupMenuTitle, userGroupMenu);

	var userGroupMenuContainer = userGroupMenuTitle.parent().parent();
	var rightMenus = $('img[src="http://www.todaysppc.com/imge/recentcomment.jpg"]').parent().parent().parent().parent().parent().parent();
	rightMenus.children().insertAfter(userGroupMenuContainer);
	rightMenus.remove();

	$('body>div>center>table').width('100%');
   
	$('div[id^="layer"]').css('top', $("td[background='/img/topmn_bg.gif']").height());
});

function makeSlideMenu(title, contents)
{
	contents.hide();
	title.mouseenter(function(){
		contents.slideDown('slow');
	}).parent().parent().mouseleave(function(e){
		contents.slideUp('slow');
	});
}
