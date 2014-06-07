// ==UserScript==
// @name           ifs-naver
// @namespace      ifly2sky
// @include        http://*naver.com/*
// @require           http://userscripts.org/scripts/source/121755.user.js
// ==/UserScript==


//if you need delete some sections of naver main page, use this.... for this function need 121755.user.js
function del_useless_section() 
{
	deID("shop_cast");
	deID("today_cast");
	deID("theme_cast");
	deID("open_cast");
	deID("news_cast");
	deID("ad_top");
	deID("svcmore");
	deID("ad_branding_hide");
	deID("ad_branding");
	deID("time_square");
	deID("marketing_v2");
	deID("f280240");
	deID("footer");
}
//del_useless_section()


//show naver news's memo
//<iframe src="http://memo.news.naver.com/listMain.nhn?gno=news001,0005457907&amp;gdid=880000D8_000000000000000005457907" name="ifrMemo" id="ifrMemo" style="height: 85px;"></iframe>
function show_newsmemo() 
{
	if(/memo.news.naver.com/.test(document.location.href)){
		document.getElementById("opinion_list").style.display = "";
		document.getElementById("opinion_desc").style.display = "none";
		document.getElementById("memo_onoff_btn").style.display = "";
	}
}
show_newsmemo();






