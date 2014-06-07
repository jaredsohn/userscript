// ==UserScript==
// @name           bjdvd
// @namespace      bjdvd
// @include        http://www.bjdvd.org/*
// ==/UserScript==

//屏蔽模式
//0：彻底屏蔽，完全不显示，容易出现无主贴的断头贴。
//1：显示帖子，不显示标题、内容和发帖人信息。
//2：显示帖子，不显示标题和内容，显示发帖人信息
var shieldMode = 2;

//屏蔽列表 id从网页上复制，务必保证一致，中间用半角逗号间隔，最后一个id不加逗号
//例子：var shieldList = "卷儿他爸,有怨念的龙翔,都不太容易";
var shieldList = "";

if (typeof unsafeWindow.jQuery == 'undefined') {
	window.setTimeout(GM_wait, 100);
} else {
	letsJQuery(unsafeWindow.jQuery);
}

function letsJQuery($) {
    $(function(){
		if( shieldList.length > 0 ) {
			shieldList = shieldList + ",";
			$.grep($("span.author"), function(e, i){
				if ( shieldList.indexOf( $(e).find("a").text().trim() + "," ) != -1 ) {
					if( shieldMode === 0 ) {
						var li = $(e).parents("li")[0];
						$(li).hide();
					} else {
						var facet = $(e).parents("div.post-facet")[0];
						var subject = $(facet).prev("div.post-subject")[0];
						var emoticon = $(subject).prev("img.emoticon")[0];
						subject.innerHTML = "你已屏蔽此人发言";
						emoticon.src = "/assets/images/avatars/default.40x40.png";
						if( shieldMode === 1 ) {
							facet.innerHTML = "2222年2月22日 22:22 By 被你屏蔽的人 2字 2次杵击 2回复";
						}
						var body = $(facet).next("div.post-body")[0];
						if( body ) {
							$(body).hide();
						}
					}
				}
			});
		}
    });
}
