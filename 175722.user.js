// ==UserScript==
// @name       百度音乐下载助手
// @namespace  http://duoluohua.com/
// @version    1.0.1
// @description  Chrome上的百度音乐下载助手,让您突破百度会员限制畅享高品质音乐
// @match      http://music.baidu.com/
// @include http://music.baidu.com/*
// @copyright  有一份田
// ==/UserScript==
/**************************************************************
 *@ musicdownload.js
 *@作者: 有一份田
 *@日期:2013.08.12
 *@Email:youyifentian@gmail.com
 *@地址:http://git.oschina.net/youyifentian/
 *@转载重用请保留此信息.
 *@version:1.0.1
 *@最后修改时间:2013.08.14
 *
 ***************************************************************/
//
//一点说明-----写在前面
//
//修改相应的注释可以启用不同的源,这对数据目前来讲在内容上无影响,
//但在速度上可有影响,V1.0目前仍有效,V2.0主要用于当1失效时启用
//

var version="1.0.1";
querySong(getSongInfo());
function getSongInfo(id,title,artist){
	var path=window.location.pathname,arr=path.split("/");
	var id=arr[2] || id,p=arr[3];
	return {
		"id":"song"==arr[1].toLowerCase() ? id : "",
		"type": p && "download"==p.toLowerCase(),
		"title":title || "",
		"artist":artist || ""
	};
}
function setDownLink(node,opt){
	var filesInfo=getDownInfo(opt),
	    html=makeHtml(filesInfo.files);
	node.innerHTML=html;
	checkUpdate();	
}
function querySong(opt){
	if(!opt.id) return;
	var node=document.createElement("div");
	node.innerHTML=makeHtml([],'<font color="#A1CBE4"><strong>数据赶来中...</strong></font>');
	node.style.display="block";
	var o=null,obj=null;
	if(opt.type){
		o=document.forms["form"];
		if(!o)return;
		obj=o.firstChild.nextSibling;
		obj.appendChild(node);
	}else{
		o=document.getElementsByClassName("info-holder clearfix");
		if(!o)return;
		obj=o[0];
		obj.insertBefore(node,obj.firstChild);
	}
	checkUpdate();
	var id=opt.id,title=opt.title,artist=opt.artist,
	    //************************************V1.0版
	    //url="http://qianqianmini.baidu.com/app/link/getLinks.php?linkType=1&isLogin=1&isHq=1&clientVer=7.0.4&isCloud=0&hasMV=1&songId="+id+"&songTitle="+title+"&songArtist="+artist,
	    //************************************V2.0版
	    url="http://musicmini.baidu.com/app/link/getLinks.php?linkType=1&isLogin=1&clientVer=8.1.0.8&isHq=1&songAppend=&isCloud=0&hasMV=1&songId="+id+"&songTitle="+title+"&songArtist="+artist,
	    xhr=new XMLHttpRequest();
	xhr.open("GET",url,true);
	xhr.onreadystatechange=function(){
		if(4==xhr.readyState){
			setDownLink(node,JSON.parse(xhr.responseText));
		}
	}
	xhr.send();
}
function getDownInfo(opt){
	/************************************V1.0版
	var o=opt[0],id=o.songID,lyric="";
	    artist=o.artist,title=o.song_title,
	    fileslist=o.fileslist,files=[];
	************************************V1.0版
	*/

	// *************************************V2.0版
	var o=opt[0],id=o.song_id,lyric=o.lyric_url
	    artist=o.song_artist,title=o.title,
	    fileslist=o.file_list,files=[];
	// *************************************V2.0版
	
	for(var i=0;i<fileslist.length;i++){
		files.push(getFileInfo(fileslist[i],lyric));
	}
	return {
		"id":id,
		"title":title,
		"artist":artist,
		"lyric":lyric,
		"files":files
	}
}
function getFileInfo(file,lyric){
	/************************************V1.0版
	var url=file.songLink,
	    format=file.format.toLowerCase(),
	    size=file.size,rate=file.rate,
	    lyric=lyric || file.lrcLink,
	    ratetitle="",index=0;
	************************************V1.0版
	*/
	 //*************************************V2.0版
	var url=file.url,
	    format=file.format.toLowerCase(),
	    size=file.size,rate=file.kbps,
	    ratetitle="",index=0;
	 //*************************************V2.0版
	if(rate>320 && format!="mp3"){
		ratetitle="无 损";
	}else if(rate>256 && rate<=320){
		ratetitle="超 高";
		index=1;
	}else if(rate>128 && rate<=256){
		ratetitle="高 质";
		index=2;
	}else if(rate>64 && rate<=128){
		ratetitle="标 准";
		index=3;
	}else if(rate<=64){
		ratetitle="低 质";
		index=4;
	}
	size=Math.round(size/1048576*10)/10+"M";
	return {
		"index":index,
		"lyric":lyric,
		"format":format,
		"rate":rate,
		"ratetitle":ratetitle,
		"size":size,
		"url":url
	};
}
function makeHtml(files,text){
	var html="";
	html+='<div style="border:2px solid #A1CBE4;width:560px;padding-left:20px;margin:5px 0px 10px 0px;line-height:25px;">';
	html+='<div>';
	html+='<a href="http://duoluohua.com/myapp/chrome/baidumusic/?fromid=baidu_music_extension" style="float:right;" target="_blank"><img id="updateimg" title="有一份田" style="border:none;display:none;"/></a>';
	html+=text || "";
	for(var i=0;i<files.length;i++){
		var file=files[i];
		var url="http://music.baidu.com/data/music/file?link="+file.url;
		html+='<span style="display:inline-block;margin-left:5px;min-width:190px;"><a href="'+url+'">'+file.ratetitle+'</a><span><strong>&nbsp;&nbsp;&nbsp;'+file.size+'</strong></span><span style="color:#999999;">&nbsp;&nbsp;&nbsp;'+file.format+'&nbsp;&nbsp;'+file.rate+'kbps</span></span>';
		if(i==1 || i==3)html+='</div><div>';
	}
	html+='</div></div>';
	html+='<script type="text/javascript">alert(0);</script>';
	return html;
}
chrome.extension.sendRequest({"cmd":"analytics"},function(response){});
function checkUpdate(){
	var js='var info=document.getElementById("updateimg");';
	js+='info.src="http://duoluohua.com/myapp/update?system=chrome&appname=baidumusic&apppot=contentjs&frompot=songweb&type=1&version='+version+'&t="+Math.random();';
	js+='info.onload=function(){';
	js+='info.style.display="inline-block";';
	js+='}';
	var oHead=document.getElementsByTagName('HEAD')[0],
	    oScript= document.createElement("script"); 
	oScript.type = "text/javascript"; 
	oScript.text =js;
	oHead.appendChild( oScript); 
}