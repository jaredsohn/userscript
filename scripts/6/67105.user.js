// ==UserScript==
// @name			线上活动活相册图片收集器
// @namespace		http://www.douban.com/people/33455349/
// @description     收集线上活动相册的链接，打印到页面上。
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require        	http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @include			http://www.douban.com/online/*
// @version        	1.1
/* @reason
增加一个记录点功能，相册有新增图片的时候，可以选择只收集增量的链接。
@end*/
// ==/UserScript==

var thisScript = {
    name: "线上活动活相册图片收集器",
    id: "67105",
    version: "1.1"
}
var updater = new Updater(thisScript);
updater.check();

var href = location.href.substring(0,38);
var savepoint = GM_getValue(href, '');

// 屏蔽谷歌广告
$('#google_ads_slot_group_topic_new_top_right').remove();

if ($('#photo_album').length !== 0 ) {
	$('.aside').prepend("<h2>活动图片链接收集&nbsp; &middot;&nbsp; &middot;&nbsp; &middot;&nbsp; &middot;&nbsp; &middot;&nbsp; &middot;<h2>")
	$('.aside h2:first').append("<br><input id =\"downloadalbum\" type =\"button\" value =\"开始收集\"/>")
	$('#downloadalbum').click(function(){
		get(getNextPage($('body'),'#photo_album a'),false);
	})

	if(savepoint !== '' && savepoint !== $('.pic:first img').attr('src').match(/p\d*.jpg/)[0]){
		// 加入按鈕
		$('.aside h2:first').append("<input id =\"downloadalbum2\" type =\"button\" value =\"从保存点收集\"/>")
		$('#downloadalbum2').click(function(){
				get(getNextPage($('body'),'#photo_album a'),true);
		})
	}

	$('.aside h2:first').append("<br><span id =\"downloadalbuminfo\"></span>")
	$('.aside h2:first').append("<br><span id =\"downloadalbuminfo2\"></span>")
}

function get(url,flg){
    if (url !== "") {
        $.ajax({
            url: url,
            success: function(h){
				$('#downloadalbuminfo').text(url);
				var next_url = getNextPage($(h), '.next a')
				var checkflg = true;
				$(h).find('.photo_wrap img').each(function(){
					var jpg = $(this).attr('src').match(/p\d*.jpg/)[0];
					if (flg && jpg === savepoint) {
						checkflg = false;
						next_url = '';
					}
					else {
						var pu = "http://t.douban.com/view/photo/photo/public/" + jpg;
						if (checkflg) {
							$('#downloadalbuminfo2').prepend("<a href = '" + pu + "' >" + pu + "</a><br>");
						}
					}
				})
				get(next_url, flg)
				
			}
        })
        
    }else{
		GM_setValue(href, $('.pic:first img').attr('src').match(/p\d*.jpg/)[0]);
		$('#downloadalbuminfo').text('当前相册收集结束，保存点已存储');
	}
}

function getNextPage($h, cond){
    var href = $h.find(cond).attr("href")
    if (typeof href == "undefined") {
        return  "";
    }
    return  "http://www.douban.com" + href;
}
