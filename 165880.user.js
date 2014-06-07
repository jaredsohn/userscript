// ==UserScript==
// @name		Moe-FM Fav-Songs Random Play
// @version		1.3
// @author		864907600cc
// @description		随机播放萌否电台中收藏的音乐的小脚本(￣▽￣")……
// @include		http://moe.fm/home/*
// @include		http://moe.fm/listen*
// @exclude		http://moe.fm/listen/playlist*
// @icon		http://nyan.moefou.org/avatar_group/00/00/000074.jpg
// @grant		none
// @updateURL		https://userscripts.org/scripts/source/165880.meta.js
// @downloadURL		https://userscripts.org/scripts/source/165880.user.js
// ==/UserScript==

if(!window.localStorage.getItem('rp-setting'))window.localStorage.setItem('rp-setting','{"s1":1,"s2":0,"s3":50,"s4":0}');
var rps=JSON.parse(window.localStorage.getItem('rp-setting'));
if(rps.s4==null||rps.s4==undefined)rps.s4=1;
if(/moe.fm\/listen/.test(window.location.href)){
	if(window.sessionStorage.length>0)window.sessionStorage.clear();
	var clickb=document.createElement('li'),
		issetting=0;
	clickb.innerHTML='<style>.random-play .random-play-setting{position:absolute;right:10px;display:none}.random-play:hover .random-play-setting{display:inline;color:#0069D6;}.random-play .random-play-setting:hover{color:#444}</style><a class="radio-menu-fav-song random-play" style="cursor:pointer">随机播放收藏曲目<span class="random-play-setting">设置</span></a>';
	clickb.className='b-b';
	document.getElementsByClassName('radio-menu-container')[0].getElementsByTagName('ul')[0].appendChild(clickb);
	clickb.getElementsByTagName('span')[0].onclick=function(event){
		issetting=1;
		setting();
	}
	clickb.onclick=function(event){
		if(issetting!=1){
			if(!window.localStorage.getItem('rp-favsong-data')){
				window.sessionStorage.setItem('rp-fetch','true');
				/*rps.s4==0?*/getting()/*:getting_xml()*/;
			}
			else if(rps.s1==1){
				if(rps.s2==1)window.localStorage.removeItem('rp-favsong-data');
				window.sessionStorage.setItem('rp-fetch','true');
				/*rps.s4==0?*/getting()/*:getting_xml()*/;
			}
			else run();
		}
	}
}
if(window.sessionStorage.getItem('rp-fetch'))getting();
function getting(){
	var user=document.getElementsByClassName('navi-panel-content')[0].getElementsByTagName('a')[0].href.split('moe.fm/home/')[1],
		src='http://moe.fm/home/'+user+'/songs';
	if(!window.sessionStorage.getItem('rp-page')){
		window.sessionStorage.setItem('rp-page','1');
		window.location.href=src;
	}
	else{
		if(!window.sessionStorage.getItem('rp-lastpage')){
			var page_a=document.getElementsByClassName('pages')[0].getElementsByTagName('a');
			var lastpage=page_a[page_a.length-1].href.split('page/')[1];
			window.sessionStorage.setItem('rp-lastpage',lastpage);
		}
		var _=document.createElement('div');
		_.id='rp_tips';
		document.body.appendChild(_);
		_.innerHTML='<style>#rp_tips{width:100%;text-align:center;color:white;font-size:32px;top:50%;margin-top:-59px;vertical-align:middle;position:fixed;z-index:99999;-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none;pointer-events:none;font-family:"微软雅黑","Microsoft Yahei Font","微軟細黑"}#rp_tips p{background:rgba(255,119,119,.5);padding-top:50px;padding-bottom:50px;text-shadow:red 0 0 5px,red 0 0 5px,red 0 0 7px,red 0 0 7px,red 0 0 10px,red 0 0 10px,red 0 0 15px,red 0 0 15px;}</style><p id="rp_tips_t">正在获取第 '+window.sessionStorage.getItem('rp-page')+' 页数据，共 '+window.sessionStorage.getItem('rp-lastpage')+' 页，请稍候......</p>';
		if(!window.localStorage.getItem('rp-favsong-data'))window.localStorage.setItem('rp-favsong-data','');
		var button=document.getElementsByClassName('fav-song');
		for(var i=0;i<button.length-1;i++){
			var data=button[i].href.split('song/')[1].split('?')[0];
			if(!RegExp(data).test(window.localStorage.getItem('rp-favsong-data'))){
				result=1;
				window.localStorage.setItem('rp-favsong-data',data+'|'+window.localStorage.getItem('rp-favsong-data'));
			}
			else{
				result=2;
				//break;
			}
		}
		if(result==1){
			window.sessionStorage.setItem('rp-page',parseInt(window.sessionStorage.getItem('rp-page'),10)+1);
			var page=parseInt(window.sessionStorage.getItem('rp-page'),10),
				lastpage=parseInt(window.sessionStorage.getItem('rp-lastpage'),10);
			if(page<=lastpage)window.location.href=src+'/page/'+page;
			else redir();
		}
		else if(result==2)redir();

	}
}
function getting_xml(){
	var str='http://moe.fm/listen/playlist?api=json&api_key=2cbd62a82755d15d054525b1646af0b30517cafd2&fav=song&perpage=30&page=',xhr=new XMLHttpRequest(),p=1,_=document.createElement('div'),l,result;
	if(!window.localStorage.getItem('rp-favsong-data'))window.localStorage.setItem('rp-favsong-data','');
	_.id='rp_tips';
	document.body.appendChild(_);
	_.innerHTML='<style>#rp_tips{width:100%;text-align:center;color:white;font-size:32px;bottom:0;vertical-align:middle;position:fixed;z-index:99999;-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none;pointer-events:none;font-family:"微软雅黑","Microsoft Yahei Font","微軟細黑"}#rp_tips p{background:rgba(255,119,119,.5);padding-top:50px;padding-bottom:50px;text-shadow:red 0 0 5px,red 0 0 5px,red 0 0 7px,red 0 0 7px,red 0 0 10px,red 0 0 10px,red 0 0 15px,red 0 0 15px;}</style><p id="rp_tips_t">正在获取第 <span id="rp_tips_t_n">1</span> 页数据，请稍候......</p>';
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			l=JSON.parse(xhr.responseText).response;
			if(l){
				var ls=l.playlist;
				for(var i=0;i<ls.length;i++){
					if(window.localStorage.getItem('rp-favsong-data').indexOf(ls[i].sub_id)<0){
						window.localStorage.setItem('rp-favsong-data',ls[i].sub_id+'|'+window.localStorage.getItem('rp-favsong-data'));
						result=1;
					}
					else{
						//break;
						result=2;
					}
				}
				if(l.information.may_have_next==true)p++;
				else result=2;
				console.log(p)
				if(result==1){
					document.getElementById('rp_tips_t_n').innerHTML=p;
					xhr.open('GET',str+p);
					xhr.send();
				}
				else redir();
			}
			else{
				alert('通过 API 获取数据失败，尝试使用默认方式获取收藏曲目数据……');
				getting();
			}
		}
	}
	xhr.open('GET',str+p);
	xhr.send();
}
function redir(){
	document.getElementById('rp_tips_t').innerHTML='数据更新完毕! 正在跳转至播放页......';
	window.sessionStorage.removeItem('rp-fetch');
	window.sessionStorage.removeItem('rp-page');
	window.sessionStorage.removeItem('rp-lastpage');
	window.sessionStorage.removeItem('rp-getdata');
	run();
}
function run(){
	var data=window.localStorage.getItem('rp-favsong-data').split('|'),playlist='';
	for(var i=0;i<rps.s3;i++){
		var num=parseInt(Math.random()*(data.length-2));
		playlist+=data[num]+',';
	}
	window.location.href='http://moe.fm/listen?song='+playlist;
}
function setting(){
	var s_bg=document.createElement('div');
	s_bg.style.cssText='position:fixed;width:100%;height:100%;z-index:99990;top:0;left:0';
	document.body.appendChild(s_bg);
	var s_container=document.createElement('div');
	s_container.style.cssText='position:fixed;top:50%;margin-top:-150px;width:750px;height:300px;outline:10000px solid rgba(0,0,0,.5);left:50%;margin-left:-375px;z-index:100000;font-size:14px;line-height:32px;background:rgba(255,255,255,.75);font-family:"微软雅黑","Microsoft Yahei Font","微軟細黑"';
    s_container.innerHTML='<div style="margin:25px"><h2 align="center">随机播放设置</h2><hr><p><input id="abc1" type="checkbox" name="abc1"><label for="abc1">每次播放前都更新收藏曲目数据</label><span style="color:gray">（推荐，其实也占用不了多少时间← ←）</span></p><p><input id="abc2" type="checkbox" name="abc2"><label for="abc2">更新收藏曲目数据时清除历史缓存</label><span style="color:gray">（不推荐，除非你取消了某些音乐或者出现了 bug ← ←）</span></p><p style="opacity:0.75;pointer-events:none"><input id="abc4" type="checkbox" name="abc4"><label for="abc4">通过 XMLHttpRequest 方式调用萌否 API 获取收藏曲目数据</label><del style="color:gray">（实验性功能，默认开启 ← ← 【喂！）</del></p><p><label for="abc3">开启随机播放时随机播放<input id="abc3" type="number" name="abc3" style="width:100px">首音乐</label><span style="color:gray">（默认 50 ，由于 $_GET 限制不宜设置过大← ←）</span></p><p align="center"><span id="abcb1" style="color:#f66;cursor:pointer">立即清除历史缓存</span> <span id="abcb2" style="color:#6f6;cursor:pointer">立即更新收藏曲目</span></p><p align="center"><input id="abcs" type="button" value="保存" style="width:75px;height:35px;font-family:\'微软雅黑\',\'Microsoft Yahei Font\',\'微軟細黑\'"></p><p align="center" style="color:gray;font-size:0.75em">有疑问、 bug 反馈？告诉我吧~~( ´ ▽ ` )ﾉ 我在萌否<a href="http://moefou.org/home/864907600cc" target="_blank">@864907600cc</a> 贴吧<a href="http://www.baidu.com/p/864907600cc" target="_blank">@864907600cc</a> (常驻 chrome 吧)，感谢支持~~&gt; &lt;</p></div>';
	document.body.appendChild(s_container);
	if(rps.s1==1)document.getElementById('abc1').setAttribute('checked','checked');
	if(rps.s2==1)document.getElementById('abc2').setAttribute('checked','checked');
	if(rps.s3)document.getElementById('abc3').setAttribute('value',rps.s3);
	//if(rps.s4==1)document.getElementById('abc4').setAttribute('checked','checked');
	document.getElementById('abcb1').onclick=function(event){
		window.localStorage.removeItem('rp-favsong-data');
		alert('数据已清除...在下次随机播放时会重新获取并储存收藏曲目数据...');
	}
	document.getElementById('abcb2').onclick=function(event){
		if(rps.s2==1)window.localStorage.removeItem('rp-favsong-data');
		window.sessionStorage.setItem('rp-fetch','true');
		rps.s4==0?getting():getting_xml();
	}
	document.getElementById('abcs').onclick=function(event){
		var abc=new Object();
		if(document.getElementById('abc1').checked)abc.s1=1;else abc.s1=0;
		if(document.getElementById('abc2').checked)abc.s2=1;else abc.s2=0;
		if(document.getElementById('abc3').value)abc.s3=document.getElementById('abc3').value;
		else{
			abc.s3=50;
			alert('随机播放音乐数设置有误...已设置为默认值...');
		}
		//if(document.getElementById('abc4').checked)abc.s4=1;else abc.s4=0;
		window.localStorage.setItem('rp-setting',JSON.stringify(abc));
		issetting=0;
		s_container.outerHTML='';
		s_bg.outerHTML='';
		rps=JSON.parse(window.localStorage.getItem('rp-setting'));
	}
}
if(!window.localStorage.getItem('rp_version')||window.localStorage.getItem('rp_version')!='1.3'){
	if(!window.localStorage.getItem('rp_version'))var l_version='1.0';
	else var l_version=window.localStorage.getItem('rp_version');
	var tips=document.createElement('script');
	tips.src='http://ext.ccloli.com/moe-fm/rp-update-tips?version='+l_version;
	document.body.appendChild(tips);
	window.localStorage.setItem('rp_version','1.3');
}