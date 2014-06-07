// ==UserScript==
// @name           NICOMMENT-MYLIST,RATE
// @description    GINZAwatchページに再生数に対してのコメント率、マイリスト率を表示します。
// @include        http://www.nicovideo.jp/watch/*
// @version        2.0
// @downloadURL    http://kww21.endless-world.net/script/NICOMMENT-MYLIST,RATE.user.js
// @updateURL      http://kww21.endless-world.net/script/NICOMMENT-MYLIST,RATE.user.js
// ==/UserScript==

(function(){
// 再コマをそれぞれ取得してコンマを取り除く
	var v = document.getElementsByClassName('viewCount')[0].innerHTML.replace(/,/g,"");
	var c = document.getElementsByClassName('commentCount')[0].innerHTML.replace(/,/g,"");
	var m = document.getElementsByClassName('mylistCount')[0].innerHTML.replace(/,/g,"");

// 数値の調整
// 再生数
	var v = v-(-1);
// マイリスト率
	if (v < 100){
		var m_rate = '---';
	}else if (m/v*100 >= 10){
		var m_rate = (m/v*100).toFixed(0);
	}else{
		var m_rate = (m/v*100).toFixed(1);
	}
// コメント率
	if (v < 100){
		var c_rate = '---';
	}else if (c/v*100 >= 10){
		var c_rate = (c/v*100).toFixed(0);
	}else{
		var c_rate = (c/v*100).toFixed(1);
	}

// 割合に応じて文字装飾を変える
// マイリスト
	if (m_rate >= 30){
		var m_color = 'color:#FF0000; text-shadow:0px -1px 10px #FF0000,1px 0px 10px #FF0000,0px 1px 10px #FF0000,-1px 0px 10px #FF0000;';
	}else if(m_rate >= 20){
		var m_color = 'color:#FF0000;';
	}else if(m_rate >= 15){
		var m_color = 'color:#FF8C00; text-shadow:0px -1px 10px #FF8C00,1px 0px 10px #FF8C00,0px 1px 10px #FF8C00,-1px 0px 10px #FF8C00;';
	}else if(m_rate >= 10){
		var m_color = 'color:#FF8C00;';
	}else if(m_rate <= 1){
		var m_color = 'color:#00BFFF;';
	}else{
		var m_color = 'color:#FFFFFF;';
	}
	var cm = '<span style="'+m_color+'">'+m_rate+'%</span>';
// コメント
	if (c_rate >= 50){
		var c_color = 'color:#FF0000; text-shadow:0px -1px 10px #FF0000,1px 0px 10px #FF0000,0px 1px 10px #FF0000,-1px 0px 10px #FF0000;';
	}else if(c_rate >= 30){
		var c_color = 'color:#FF0000;';
	}else if(c_rate >= 20){
		var c_color = 'color:#FF8C00;';
	}else if(c_rate <= 1){
		var c_color = 'color:#00BFFF;';
	}else{
		var c_color = 'color:#FFFFFF;';
	}
	var cc = '<span style="'+c_color+'">'+c_rate+'%</span>';

// その他の情報の取得と置換え等
	var date = document.getElementsByClassName('videoPostedAt')[0].innerHTML.replace(/年|月/g,"-").replace(/時/,":").replace(/日|分/g,"");
	var yestrank = document.getElementsByClassName('yesterdayRank')[0].textContent.replace(/圏外/,"");
	if (yestrank == '位'){
		var yestrank = '圏外';
	}
	var bestrank = document.getElementsByClassName('bestRank')[0].textContent.replace(/\(|過去最高:|圏外|\)/g,"");
	if (bestrank == '位'){
		var bestrank = '圏外';
	}
	var cate = document.getElementsByClassName('categoryName')[0].innerHTML;
	if (cate == ''){
		var cate = 'カテゴリなし';
		var yestrank = '---';
		var bestrank = '---';
	}
	var videoid = location.pathname;

// マウスオーバー時の吹き出し
	var tab = '&#x9;';
	var br = '&#10;';
	var sp = '&nbsp;';
	var alt = '再生:'+tab+tab+v+br+'コメント:'+tab+c+br+'マイリスト:'+tab+m+br+'['+cate+']'+br+'前日:'+sp+yestrank+sp+'(最高:'+sp+bestrank+')'+br+date+sp+'投稿';

// id="siteHeaderLeftMenu"に追加
	var widthLeft = document.getElementById('siteHeaderLeftMenu');
	if (widthLeft) {
		var status = document.createElement('li');
		status.innerHTML = '<a href="http://www.nicochart.jp'+videoid+'" target="_blank" title="'+alt+'"><span style="border-left:#666 solid 1px; border-right:none; color:#FFFFFF;">コ'+cc+'マ'+cm+'</span></a>';
		widthLeft.parentNode.appendChild(status);
	}
})();
