// ==UserScript==
// @name	百度音乐助手
// @author	有一份田
// @description	百度音乐下载助手,突破百度音乐会员限制,带您自由畅享高品质音乐
// @namespace	http://userscripts.org/scripts/show/175746
// @updateURL	https://userscripts.org/scripts/source/175746.meta.js
// @downloadURL	https://userscripts.org/scripts/source/175746.user.js
// @icon	http://duoluohua.com/myapp/chrome/baidumusic/images/icon_48.png
// @license	GPL version 3
// @encoding	utf-8
// @include	http://music.baidu.com/song/*
// @grant       GM_xmlhttpRequest
// @run-at	document-end
// @version	1.2.2
// ==/UserScript==





/*
 * === 说明 ===
 *@作者:有一份田
 *@官网:http://duoluohua.com/download/
 *@Email:youyifentian@gmail.com
 *@Git:http://git.oschina.net/youyifentian
 *@转载重用请保留此信息
 *@最后修改时间:2013.09.24
 *
 * */


var APPNAME='\u767e\u5ea6\u97f3\u4e50\u52a9\u624b';
var VERSION='1.2.2';
var t=Math.random();
querySong(getSongInfo());
function querySong(opt){
	if(!opt.id) return;
	var box=document.getElementsByClassName(opt['boxCss']);
	if(!box.length)return;
	var node=document.createElement('div'),o=box[0];
	node.style.display='block';
	o[opt['addNodeFun']](node,o[opt['child']]);
	try{
		o.parentNode.parentNode.parentNode.style.minWidth=opt['boxWidth'];
	}catch(err){}
	if(!GM_xmlhttpRequest){
		showDownHtml(node,'',4);
		return;
	}
	showDownHtml(node,'',1);
	var id=opt.id,title=opt.title,artist=opt.artist,
	    url='http://musicmini.baidu.com/app/link/getLinks.php?linkType=1&isLogin=1&clientVer=8.2.0.9&isHq=1&songAppend=&isCloud=0&hasMV=1&songId='+id+'&songTitle='+title+'&songArtist='+artist;
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			showDownHtml(node,JSON.parse(response.responseText),0);
		},
		onerror: function(response) {
			showDownHtml(node,'',2);
		},
		ontimeout: function(response) {
			showDownHtml(node,'',3);
		}
	});
}
function getSongInfo(id,title,artist){
	var path=window.location.pathname,arr=path.split('/'),id=arr[2] || id,p=arr[3],
	    type=p && "download"==p.toLowerCase();
	return {
		"id":"song"==arr[1].toLowerCase() ? id : "",
		"title":title || "",
		"artist":artist || "",
		"boxCss": type ? "ul" : "info-holder",
		"addNodeFun":type ?  "appendChild" : "insertBefore",
		"child": type ? "lastChild" : "firstChild",
		"boxWidth": type ? "670px" : ""
	};
}
function setSongsInfo(opt){
	var o=opt[0],id=o.song_id,lyric=o.lyric_url,albumImg=o.album_image_url,
	    artist=o.song_artist,title=o.title,fileslist=o.file_list,files=[];
	for(var i=0;i<fileslist.length;i++){
		files.push(formatSongInfo(fileslist[i],lyric));
	}
	return {
		"id":id,
		"title":title,
		"artist":artist,
		"albumImg":albumImg,
		"lyric":lyric,
		"files":files
	};
}
function formatSongInfo(file){
	var url=file.url,format=file.format.toLowerCase(),
	    size=file.size,rate=file.kbps,i=0,
	    ratetitle=['\u65e0 \u635f','\u8d85 \u9ad8','\u9ad8 \u8d28','\u6807 \u51c6','\u4f4e \u8d28','\u5176 \u4ed6'];
	if(rate>320 && format!="mp3"){
		i=0;
	}else if(rate>256 && rate<=320){
		i=1;
	}else if(rate>128 && rate<=256){
		i=2;
	}else if(rate>64 && rate<=128){
		i=3;
	}else if(rate<=64){
		i=4;
	}else{
		i=5;
	}
	size=Math.round(size/1048576*10)/10+'M';
	return {
		"index":i,
		"format":format,
		"rate":rate,
		"ratetitle":ratetitle[i],
		"size":size,
		"url":url
	};
}
function showDownHtml(node,opt,index){
	var msg=[
		'',
	    	'\u6570\u636e\u8d76\u6765\u4e2d',
		'\u8bf7\u6c42\u51fa\u9519,\u8bf7\u91cd\u8bd5\u6216\u68c0\u67e5\u662f\u5426\u4e3a\u6700\u65b0\u7248\u672c',
		'\u8bf7\u6c42\u8d85\u65f6,\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5',
		'\u60a8\u7684\u6cb9\u7334\u5b50\u6269\u5c55\u6682\u65f6\u4e0d\u652f\u6301\u8be5\u811a\u672c,\u8bf7\u66f4\u65b0\u6269\u5c55\u6216\u811a\u672c\u5230\u6700\u65b0\u7248\u672c'
	],filesInfo=opt ? setSongsInfo(opt) : {},text=msg[index],
	html=makeHtml(filesInfo,text,index-1);
	node.innerHTML=html;
	node.title=APPNAME;
	checkUpdate();
}
function makeHtml(filesInfo,text,type){
	var files=filesInfo.files || [],html='',file='',url='',albumImg=filesInfo.albumImg,lyric=filesInfo.lyric;
	html+='<div style="border:2px solid #A1CBE4;width:560px;padding-left:25px;margin:5px 0px 10px 0px;line-height:25px;">';
	html+='<div>';
	html+='<a href="'+getUpdateUrl('getnewversion',1)+'" style="float:right;" target="_blank">';
	html+='<img id="updateimg" title="\u6709\u4e00\u4efd\u7530" style="border:none;display:none;"/></a>';
	html+=text ? '<font color="'+(type ? '#FF0000' : '#A1CBE4')+'"><b>'+text+'...</b></font>' : '';
	for(var i=0;i<files.length;i++){
		file=files[i];
		url="http://music.baidu.com/data/music/file?link="+file.url;
		html+='<span style="display:inline-block;min-width:200px;">';
		html+='<a style="text-decoration:underline;" href="'+url+'" title="'+file.ratetitle+'"><b>'+file.ratetitle+'</b></a>';
		html+='<span><b>&nbsp;&nbsp;&nbsp;'+file.size+'</b></span>';
		html+='<span style="color:#999999;">&nbsp;&nbsp;&nbsp;'+file.format+'&nbsp;&nbsp;'+file.rate+'kbps</span>';
		html+='</span>';
		if(i%2==1)html+='</div><div>';
	}
	html+='</div><div>';
	html+=albumImg ? '<span style="margin-right:100px;"><a style="text-decoration:underline;" target="_blank" href="'+albumImg+'" title="\u4e13\u8f91\u5c01\u9762">\u4e13\u8f91\u5c01\u9762</a></span>' : '';
	html+=lyric ? '<span><a style="text-decoration:underline;" href="'+lyric+'" title="\u4e0b\u8f7d\u6b4c\u8bcd">LRC\u6b4c\u8bcd</a></span>' : '';
	html+='</div></div>';
	return html;
}
function checkUpdate(){
	var js='var upinfo=document.getElementById("updateimg");';
	js+='upinfo.src="'+getUpdateUrl('checkupdate',1)+'";';
	js+='upinfo.onload=function(){';
	js+='upinfo.style.display="inline-block";';
	js+='}';
	loadJs(js);
}
function getUpdateUrl(action,type){
	return 'http://app.duoluohua.com/update?action='+action+'&system=script&appname=baidumusicscript&apppot=scriptjs&frompot=songweb&type='+type+'&version='+VERSION+'&t='+t;
}
function loadJs(js){
	var oHead=document.getElementsByTagName('HEAD')[0],
	    oScript= document.createElement("script"); 
	oScript.type = "text/javascript"; 
	oScript.text =js;
	oHead.appendChild( oScript); 	
}
function googleAnalytics(){
	var js="var _gaq = _gaq || [];";
	js+="_gaq.push(['_setAccount', 'UA-43134902-1']);";
	js+="_gaq.push(['_trackPageview']);";
	js+="function googleAnalytics(){";
	js+="	var ga = document.createElement('script');ga.type = 'text/javascript';";
	js+="	ga.async = true;ga.src = 'https://ssl.google-analytics.com/ga.js';";
	js+="	var s = document.getElementsByTagName('script')[0];";
	js+="	s.parentNode.insertBefore(ga, s)";
	js+="}";
	js+="googleAnalytics();";
	js+="_gaq.push(['_trackEvent','query_gm',String(new Date().getTime())]);";
	loadJs(js);
}
googleAnalytics();
