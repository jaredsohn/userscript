// ==UserScript==
// @name           minicoliv
// @include        http://live.nicovideo.jp/watch/*
// @description    minimize nicolive 2013/12/03 17:28
// ==/UserScript==

var d=document;

// style
var s=d.createElement('style');
s.type='text/css';
s.textContent=' '
	+'body>*:not([id$="_cover"])'
	+'	,#page>*:not(#watch_title_box):not(#watch_player_top_box):not(#slider_container):not(#watch_tab_box)'
	+'	,#watch_title_box>div.box_inner>div.niconikoukoku,#description_tab_view>.user_recommend,#wall_canvas'
	+'	,#utility_link,#wall_chip_area,[id^="netduetto"],#livetags>li>img.category,#side_area'
	+'	,#watch_info_box>div.box_inner>div.mail_area,#chipWallList,.slider_area>.slider_item:last-child,.smooth_scroll'
	+'	,img[src$="003.png"],#livetags>li>.npit,#livetags>.open,#livetag_token+h2.tag_title,#tab_title_area'
	+'	,#livetags>li:not([id]):not(:first-child):nth-last-child(2)'
	+'		{display:none!important}'
	+'body{pointer-events:none}body>*{pointer-events:auto}'
	+'#watch_title_box span.name{font:0/20px "";float:left}'
	+'#watch_title_box strong.nicopedia_nushi{font-size:15px;line-height:15px;float:right}'
	+'#watch_title_box a.commu_name{margin-left:1ex}'
	+'div,body{padding:0!important}'
	+'#watch_tab_box{background-image:none!important;padding-bottom:40px!important;text-align:center}'
	+'#watch_tab_box div.view>div{display:block!important;width:50%!important}'
	+'#watch_tab_box div.view>div *{width:auto!important;font:.8rem/1rem ""!important}'
	+'#commu_info>h3{background:none!important}'
	+'#commu_info *{color:#444!important}'
	+'#livetag_token~div.cover{height:auto!important}'
	+'#livetags{min-height:1em;padding:.5em!important}'
	+'#livetags>.hide{display:inline-block!important}'
	+'#livetags>li>a{margin:0!important}'
	+'#livetags>li:not([id]):last-child{position:absolute;right:14px;top:60px}'
	+'#livetags>li[id]>a[title]{float:left}'
	+'div{max-width:1000px;overflow-x:hidden}'
	+'#rdbtn{position:absolute;top:0;right:0;font:12px/12px ""}'
	+''; // style-end
d.head.appendChild(s);

// redisplay-player
var b=d.createElement('a');
b.href='javascript:var p=document.getElementById("flvplayer_container");'
	+'p.style.display="none";setInterval(function(){p.style.display="";},500);';
b.innerHTML='[\u66F4\u65B0]';
b.title='\u30D7\u30EC\u30A4\u30E4\u30FC\u3092\u5F37\u5236\u66F4\u65B0\u3059\u308B';
b.id='rdbtn';
d.getElementById('watch_title_box').appendChild(b);

// kill-error
d.body.removeChild(d.getElementById('footer_ads'));
d.getElementById('live_header').removeChild(d.getElementById('ad_bnr'));
var des=d.getElementsByTagName('script');
for (var i=0,il=des.length;i<il;i++){des[i].removeAttribute('src');}

// info
var w=d.getElementById('watch_tab_box');
w.innerHTML=w.innerHTML.replace(/(?:<br>|[\s\u3000])+(<br>|$)/g,'$1');
var c=d.getElementById('community_info_tab_view');
c.innerHTML=c.innerHTML.replace(/[\s\u3000]+/g,' '
	).replace(/((?:sm|mylist\/)\d+)/g,'<a href="http://nico.ms/$1" target="_blank">$1</a>');

// end
