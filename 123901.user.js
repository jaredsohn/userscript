// ==UserScript==
// @name           search.baidu PLUS!
// @namespace      http://userscripts.org/users/302257
// @version 1.0.0.0
// @description 搜索加強
// @author SoIN
// @create 2012-01-24
// @lastmodified 2012-01-24
// @include        http://*.baidu.com/baidu?*
// @include        http://*.baidu.com/s?*
// @update			http://userscripts.org/scripts/source/123901.user.js
// @run-at document-end
// ==/UserScript==


function funcionPrincipal_Load(e){
	(function(){
		var css="@namespace url(http://www.w3.org/1999/xhtml);";
			css+='	.tbt {font-size: 13px;line-height: 1.2;margin-bottom: 28px;margin-left: 8px;}';
			css+='	.tbou a {font-weight: normal;color: #222222;}';
			css+='	.tbos a {font-weight: bold;color: #D14836;}';
			css+='	#cLinkContent {margin:0px;padding:0px;border:1px solid #000;box-shadow:-2px 2px 5px 1px #000000;background-color:rgba(255,255,255,.7) !important;}';
		if(typeof GM_addStyle!="undefined"){GM_addStyle(css);}
		else if(typeof addStyle!="undefined"){addStyle(css);}
		else{
			var heads=document.getElementsByTagName("head");
			if(heads.length>0){
				var node=document.createElement("style");
					node.type="text/css";
					node.appendChild(document.createTextNode(css));
				heads[0].appendChild(node);
			}
		}
	})();


	if(location.href.search(/http:\/\/www.baidu.com\/baidu?.*/i)!=-1){
		var cl=getLinkSearch("cl")||"";
		var tn=getLinkSearch("tn")||"";
		var fr=getLinkSearch("fr")||"";
		var wd=getLinkSearch("wd")||"";
		var rsv_spt=getLinkSearch("rsv_spt")||"";
		var issp=getLinkSearch("issp")||"";
	}
	if(location.href.search(/http:\/\/www.baidu.com\/s?.*/i)!=-1){
		var q1=getLinkSearch("q1")||getLinkSearch("wd")||"";
		var q2=getLinkSearch("q2")||"";
		var q3=getLinkSearch("q3")||"";
		var q4=getLinkSearch("q4")||"";
		var rn=getLinkSearch("rn")||"";
		var lm=getLinkSearch("lm")||"";
		var ct=getLinkSearch("ct")||"";
		var ft=getLinkSearch("ft")||"";
		var q5=getLinkSearch("q5")||"";
		var q6=getLinkSearch("q6")||"";
		var tn=getLinkSearch("tn")||"";
	}
	function getLinkSearch(array1){
		var url=window.location.toString();
		var str=""; 
		if(url.indexOf("?")!=-1){
			var ary=url.split("?")[1].split("&");
			for(var i in ary){
				str=ary[i].split("=")[0];
				if (str == array1){
					return ary[i].split("=")[1];
				}
			}
		}
	}

	var lr_='tbou';var lr_lang_1zhCN='tbou';var lr_lang_1zhTW='tbou';
	if		(ct==1)	{lr_lang_1zhCN='tbos';}
	else if	(ct==2)	{lr_lang_1zhTW='tbos';}
	else				{lr_='tbos';}

	var qdr_='tbou';var qdr_d='tbou';var qdr_d3='tbou';var qdr_w='tbou';var qdr_m='tbou';var qdr_y='tbou';
	if		(lm==1)	{qdr_d='tbos';}
	else if	(lm==3)	{qdr_d3='tbos';}
	else if	(lm==7)	{qdr_w='tbos';}
	else if	(lm==30)	{qdr_m='tbos';}
	else if	(lm==360)	{qdr_y='tbos';}
	else				{qdr_='tbos';}

	var num_='tbou';var num_20='tbou';var num_50='tbou';var num_100='tbou';
	if		(rn==20)	{num_20='tbos';}
	else if	(rn==50)	{num_50='tbos';}
	else if	(rn==100)	{num_100='tbos';}
	else				{num_='tbos';}


	var node=document.createElement("div");
		node.id="cLinkContent";
		node.setAttribute('style', "position:fixed;bottom:50px;right:0px;width:132px;z-index:999;");
		node.innerHTML=
			'<div style="clear:both;overflow:hidden">'+
			'	<h2 class="hd">搜索选项</h2>'+
			'	<ul class="med" id="tbd">'+
			'		<li>'+
			'			<ul class="tbt tbpd">'+
			'				<li id="lr_" class="'+lr_+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn='+rn+'&lm='+lm+'&ct=&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs">全部语言</a></li>'+
			'				<li id="lr_lang_1zh-CN" class="'+lr_lang_1zhCN+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn='+rn+'&lm='+lm+'&ct=1&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs">简体中文网页</a></li>'+
			'				<li id="lr_lang_1zh-TW" class="'+lr_lang_1zhTW+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn='+rn+'&lm='+lm+'&ct=2&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs">繁体中文网页</a></li>'+
			'			</ul>'+
			'		</li>'+
			'		<li>'+
			'			<ul class="tbt">'+
			'				<li id="qdr_" class="'+qdr_+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn='+rn+'&lm=&ct='+ct+'&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs"> 不限时间</a></li>'+
			'				<li id="qdr_d" class="'+qdr_d+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn='+rn+'&lm=1&ct='+ct+'&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs"> 过去 24 小时</a></li>'+
			'				<li id="qdr_d3" class="'+qdr_d3+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn='+rn+'&lm=3&ct='+ct+'&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs"> 过去 3 天</a></li>'+
			'				<li id="qdr_w" class="'+qdr_w+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn='+rn+'&lm=7&ct='+ct+'&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs"> 过去 1 周</a></li>'+
			'				<li id="qdr_m" class="'+qdr_m+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn='+rn+'&lm=30&ct='+ct+'&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs"> 过去 1 个月</a></li>'+
			'				<li id="qdr_y" class="'+qdr_y+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn='+rn+'&lm=360&ct='+ct+'&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs"> 过去 1 年</a></li>'+
			'			</ul>'+
			'		</li>'+
			'		<li>'+
			'			<ul class="tbt">'+
			'				<li id="num_" class="'+num_+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn=&lm='+lm+'&ct='+ct+'&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs"> 每页显示10条</a></li>'+
			'				<li id="num_20" class="'+num_20+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn=20&lm='+lm+'&ct='+ct+'&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs"> 每页显示20条</a></li>'+
			'				<li id="num_50" class="'+num_50+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn=50&lm='+lm+'&ct='+ct+'&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs"> 每页显示50条</a></li>'+
			'				<li id="num_100" class="'+num_100+'"><a href="/s?q1='+q1+'&q2='+q2+'&q3='+q3+'&q4='+q4+'&rn=100&lm='+lm+'&ct='+ct+'&ft='+ft+'&q5='+q5+'&q6='+q6+'&tn='+tn+'" class="q qs"> 每页显示100条</a></li>'+
			'			</ul>'+
			'		</li>'+
			'		<li style="display:none" class="jsb"><ul class="tbt"></ul></li>'+
			'	</ul>'+
			'</div>'+
		'';

	var bodys=document.getElementsByTagName("body");
	if(bodys.length>0){
		bodys[0].appendChild(node);
	}
};
window.addEventListener('DOMContentLoaded', funcionPrincipal_Load, false);
