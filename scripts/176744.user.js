// ==UserScript==
// @name        KDS filter
// @namespace   http://club.pchome.net
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include     http://*.pchome.net/*
// @version     1.7
// ==/UserScript==

function KDS_filter() {
	$("div#top-nav").remove(); //移除上部导航
	$("div#scroll").remove(); //移除上部滚动
	//$("div#top-logo").remove(); //移除logo
	//$("div#top_content").remove(); //移除logo
	//$("div#side").remove();//移除侧边栏
	//$("div#content").width(950);
	//$("span.n3").width(400);
	$("div.o_info>:not(:last-child)").remove(); //移除本站推荐
	$("[src='http://jscss.kdslife.com/club/html/img/minihome.gif']").parent("a").parent("div").remove(); //移除minihome
	//$("div#sign").remove(); //移除用户签名
	$("div.relate_tag").remove(); //移除下部文字链接
	$("iframe[width='760']").remove(); //移除下部图片链接
	$("div#fixbar02").remove(); //移除右侧固定图片链接
	$("dl#eMeng").remove(); //移除PM小窗

	var block_ids = ['89','1728798','548782003','548721863','3361','705266','548901169','547283851','775618','453507','547070615','548996558','547384946']; //你不希望看到的用户ID
	$.each(block_ids, function (n, value) {
		$("a[bm_user_id=" + value + "]:not('.n7')").each(function (i) {
			$(this).parent('li.i2').remove();
			$(this).parents('div.item').remove();
			//alert(value);
		});
	});

	var block_nick = ['QICQ']; //你不希望看到的用户名
	$.each(block_nick, function (n, value) {
		$("a.bind_hover_card.n5:contains(" + value + ")").each(function (i) {
			$(this).parents('li.i2').remove();
		});
	});

	var block_kws = ['妹子','VPN','vpn','Vpn','GMAIL','gmail','Gmail','雅培']; //你不希望看到的主题关键字
	$.each(block_kws, function (n, value) {
		$("a[title*=" + value + "]").each(function (i) {
			$(this).parents('li.i2').remove();
		});
	});
	
	$("span.hp").each(function (i) {
		if($(this).text() < 5) //屏蔽HP小于5的ID的回帖
		{$(this).parents('div.item').remove();}
	});
	
	$("div[id^='__Message_']").each(function (i) {
		var tmptext = $(this).text().split(" -==");
		if(tmptext[0].length < 4) //屏蔽纯表情回帖
		{$(this).parents('div.item').remove();}
	});
}
KDS_filter();
