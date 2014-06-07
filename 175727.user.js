// ==UserScript==
// @name        贴吧_按发帖时间查看
// @namespace   yuxingyc
// @description 默认最旧的3个帖子加标记
// @include     http://tieba.baidu.com/f*
// @exclude     http://tieba.baidu.com/f?ct=*
// @exclude     http://tieba.baidu.com/f/*
// @downloadURL https://userscripts.org/scripts/source/175727.user.js
// @updateURL https://userscripts.org/scripts/source/175727.meta.js 
// @version     1.0
// ==/UserScript==

var btm=3;//设置最旧帖子加标记数量
var n=0,s=[];
var hrefEl=$("a.j_th_tit");
hrefEl.each(function(){
	if(!$(this).next().find("img[alt='置顶']")[0]){
		var a=parseInt(this.href.substr(25))*1000+ n +100000000000000;
		s.push(a);
	}
	n++;
});
var list=$("li.j_thread_list");
var w=function(f,d,t){
	var pos=list[d];
	for(var i=0;i<f;i++){
		try{
		var r=parseInt(String(s[i]).substr(12));
		var p=list[r];
		$(p).find("div.threadlist_detail").hide();
		if(!t)$(hrefEl[r]).after("☢");
		else if(p!=pos)$(pos).after(p);		
		}catch(e){};
	}
};
s.sort();
w(btm,n-1,false);
$(".card_infoNum").after("<a href='javascript:;' id='aqwer2_2013814'>按发帖时间查看</a>");
$("#aqwer2_2013814").click(function(){w(n,0,true)});