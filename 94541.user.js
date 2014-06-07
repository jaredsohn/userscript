// ==UserScript==
// @name           cnbeta read model
// @namespace      cnbeta_read
// @description    让只关注cnbeta新闻内容的人有个好视界
// @include        http://www.cnbeta.com/*
// @version        1.02
// ==/UserScript==
//添加jQuery
function addJQuery(callback){
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load',function(){
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	},false);
	document.body.appendChild(script);
};

function reader(){
	styles = "<style type='text/css'>" + "#newsmenu{margin-top:10px !important;}#main #sideBar{margin-top:-61px !important;position:relative;}" + "</style>"
	$('head').append(styles);
	$('#AdForward').remove();
	$('#c_ad').remove();
	$('#logo script').remove();
	$('#google_ads_div_cnBeta_index_B468_ad_container').remove();
	$('#userInfo').remove();
	$('#fm_r').remove();
	$('#wrapper>center').remove();
	$('#google_ads_div_cnBeta_index_right_ad_container').remove();
	$('#sideBar>div').eq(4).remove();
	$('#sideBar>div').eq(8).remove();
	$('.newslist>dl>.detail>em').remove();
	$('#google_ads_div_cnBeta_article_top_ad_container').remove();
	$('#feedback>center').remove();
	$('#googleAd_afc').remove();
	$('#news_content').nextUntil('p#news_foot').remove();
	$('#comad>a').remove();
	var _align = $('#wrapper>div[align]');
	if(!_align){return false;}
	if(_align.attr('align') == 'center'){
		_align.remove();
	} else {
		return false;
	}
}

addJQuery(reader);