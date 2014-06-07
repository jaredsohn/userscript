// ==UserScript==
// @name            Douban Player
// @description     key "m" and to show player
// @source          http://userscripts.org/scripts/show/52010
// @identifier      http://userscripts.org/scripts/source/52010.user.js
// @date            2009-07-25
// @author          LajiCF
// @namespace       http://blog.suflanker.com
// @include         http://www.douban.com/subject/*
// @require http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version         0.2
/* @reason
	V0.2修正了一些错误，增加自动更新功能
	注意：经测试与NoScript 1.9.6.9不兼容
	@end*/
// @exclude         
// ==/UserScript==
var thisScript = {
name: "Douban_Player", 
id: "52010",
version:"0.2"
}
var updater = new Updater(thisScript); 
updater.check(); 

document.addEventListener('keypress', KeyPress, false); 
var albumInfo = {
    album: ""
}
var mp3player;
var mp3Container;
function hide(elm) {if (elm) elm.style.display='none'}	//隐藏元素
function show(elm) {if (elm) elm.style.display='block'} //显示元素 
function KeyPress(e) {   
	if (e.charCode==109) { //'m'键显示本地mp3	    
		if (mp3Container == null) {
			getAlbumInfo();
			getlocalmp3(albumInfo);	
			return
		}
		if(mp3Container.style.display=='block') {  //'m'键切换显示
			hide(mp3Container);
			return
		}else {
			show(mp3Container);	
			return
		}  	
    }
}
function getAlbumInfo(){	//解析网页，获取专辑信息
	var wrapper = document.getElementById('wrapper');	
	var album = wrapper.children[1].innerHTML;
	albumInfo.album = album;
	
}
function getlocalmp3(Info){	//使用Everything搜索专辑的本地地址 ,解析HTML字符暂用DOM，太水了...
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://127.0.0.1:801/?s='+albumInfo.album,
	// http://127.0.0.1:801/  为Everything Http服务器地址
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(res) {		
		var doc = document.createElement('div');
		doc.setAttribute('id', 'albumDetail');
		doc.setAttribute('style', 'display:none;');
        doc.innerHTML = res.responseText;
		document.body.appendChild(doc);	
		//解析返回的HTML，提取专辑地址，用第一项		
		var a = document.getElementById('albumDetail').children[6].children[1].children[0].children[1].children[0].children[0];
		var albumurl = 'http://127.0.0.1:801/'+ a.href.substr(a.href.indexOf("G"),a.href.length);
		// http://127.0.0.1:801/  为Everything Http服务器地址
		doc.parentNode.removeChild(doc);
		showmp3(albumurl)	
	}
	});	
}
function showmp3(url){	//搜索专辑的所有歌曲并显示，使用Everything
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(res) {		
		var doc = document.createElement('div');
		doc.setAttribute('id', 'mp3Detail');
		doc.setAttribute('style', 'display:none;');
        doc.innerHTML = res.responseText;
		document.body.appendChild(doc);		
		var arInputs  = document.getElementById('mp3Detail').children[7].children[0];				
		for (var i = 1; i <arInputs.childNodes.length - 1; i++) {
			var elmInput;
			elmInput = arInputs.children[i].children[0].children[1].href;			
			var len = elmInput.length-3;			
			if(elmInput.indexOf("mp3") == len){	//只做了MP3的添加，Flash播放器不支持FLAC，APE					
				var trackurl = 'http://127.0.0.1:801/'+ elmInput.substr(elmInput.indexOf("G"),elmInput.length);
				//返回的文件链接中有“file://G...”,需处理			
				var title = arInputs.children[i].children[0].children[1].text;
				title = title.substring(0,title.length-4);			
				addmp3(trackurl,title,200,400+i*18);
			}			
		}
		doc.parentNode.removeChild(doc);//删除节点
	}
	});	
}
 
function addmp3(audioUrl,audiotitle,leftx,topx){
 	if (audioUrl == null) return;
	if (mp3Container == null){
		mp3Container = document.createElement("div");
		mp3Container.setAttribute('id', 'mp3Container');
		mp3Container.setAttribute('style', 'display:block;');
		var related_info = document.getElementById('content').children[0].children[0].children[0];
		related_info.appendChild(mp3Container);	
	}
	mp3player = document.createElement("div");
	
	with(mp3player.style) {
		height = "33px";
		width = "600px"
    }	
	//Google 版播放器 需要修改 var height = 27 height = "30px";
	var url = "https://www.google.com/reader/ui/3247397568-audio-player.swf?audioUrl="+audioUrl	
	//WNYC 版播放器 需要修改 var height = 20 height = "25px";
	//var url = "http://www.wnyc.org/flashplayer/mp3player.swf?&file="+audioUrl+"&song_title="+audiotitle
	//WordPress 版播放器 var height = 20 height = "25px";
	//var url = "http://img510.imageshack.us/img510/4659/playerqo9.swf?&amp;bg=0xCDDFF3&amp;leftbg=0x357DCE&amp;lefticon=0xF2F2F2&amp;rightbg=0xF06A51&amp;rightbghover=0xAF2910&amp;righticon=0xF2F2F2&amp;righticonhover=0xFFFFFF&amp;text=0x357DCE&amp;slider=0x357DCE&amp;track=0xFFFFFF&amp;border=0xFFFFFF&amp;loader=0xAF2910&amp;soundFile="+audioUrl
	//JW version	 var height = 20 height = "25px";
	//var url = "http://img84.imageshack.us/img84/3928/mediaplayertz5.swf?&file="+audioUrl+"&song_title="+audiotitle
	//Consilium Version var height = 20	 height = "25px";
	//var url = "http://img211.imageshack.us/img211/8810/mediaplayerqw6.swf?&file="+audioUrl+"&song_title="+audiotitle
	var width = 350
	var height = 26
	code_str = "  " + audiotitle +"<div style=\"float: right;\">"
	code_str += " <object type=\"application/x-shockwave-flash\"\n"
	code_str += "data=\""+url+"\" \n"
	code_str += "width=\""+width+"\" height=\""+height+"\">\n"
	code_str += "<param name=\"quality\" \n"
	code_str +=	"value=\"best\" />\n"
	code_str += "<param name=\"allowScriptAccess\" \n"
	code_str +=	"value=\"never\" />\n"
	code_str += "<param name=\"allowFullScreen\" \n"
	code_str +=	"value=\"true\" />\n"
	code_str += "<param name=\"wmode\" \n"
	code_str +=	"value=\"transparent\" />\n"
	code_str += "<param name=\"movie\" \n"
	code_str += "value=\""+url+"\" />\n"
	code_str += "</object>\n"
	code_str += "</div>"
	mp3player.innerHTML = code_str
	mp3Container.appendChild(mp3player);
	return mp3player;
}
