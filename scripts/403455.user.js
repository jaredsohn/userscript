// ==UserScript==
// @name 		百度云盘SHA1码转磁力链
// @author		极品ΦωΦ小猫
// @include		http://pan.baidu.com/*
// @namespace		http://bbs.maxthon.cn/thread-868189-1-1.html
// @version		0.1
// @description		对百度磁力链下载功能增加SHA1码转换成磁力链的功能，另外增加磁力链的BT种子下载，能从网络中的BT种子服务器中下载BT种子文件（如果服务器不存在该种子将无法下载）。
// @updata			
// ==/UserScript==

var offlineValue;
var SHA1;
document.getElementById("barCmdOffline").addEventListener("click",function(){
	var int=setInterval(Q,100);
	
	function Q(){
		if(document.getElementById("_disk_id_21")){
			clearInterval(int);
			offlineValue=document.getElementById("share-offline-link");
			//document.getElementById("_disk_id_21").addEventListener("click",CheckUrl);
			//document.getElementById("_disk_id_21").addEventListener("submit",CheckUrl);
			offlineValue.addEventListener("change",CheckUrl);
			offlineValue.addEventListener("mouseout",CheckUrl);
			offlineValue.addEventListener("mouseover",CheckUrl);
		}
		
		var BTLink=document.createElement('div');
			BTLink.id="BTLink";
			BTLink.style="font-size:14px;";
			BTLink.innerHTML='种子下载：<a id="zoink" target="_blank">【zoink】</a>  <a id="torrage" target="_blank">【torrage】</a>  <a id="n0808" target="_blank">【n0808】</a>  <a id="TorrentKitty" target="_blank">【TorrentKitty】</a>  <a id="lengziyuan" target="_blank">【冷资源】</a>  <a id="xunlei" target="_blank">【迅雷】</a>  <a id="btspread" target="_blank">【btspread】</a>'  ;
		if(!document.getElementById('BTLink')){
			document.getElementById("share-offline-link").parentNode.parentNode.appendChild(BTLink);
			//document.getElementById("share-offline-link").parentNode.parentNode.insertBefore(BTLink,document.getElementById("share-offline-link"));
		}
	}
	function CheckUrl(){
		offlineValue.value=offlineValue.value.replace(/^[ \s\t]*|[ \s\t]*$/igm,"");
		if(/^\w{40}$/ig.test(offlineValue.value)){
			SHA1=offlineValue.value;
			offlineValue.value="magnet:?xt=urn:btih:"+offlineValue.value;
		}
		if(/^magnet:\?xt=urn:btih:/i.test(offlineValue.value)){
			SHA1=offlineValue.value.match(/magnet:\?xt=urn:btih:(\w{40})/i)[1];
		}
			document.getElementById('zoink').href="http://zoink.it/torrent/"+SHA1+".torrent";
			document.getElementById('torrage').href="http://torrage.com/torrent/"+SHA1+".torrent";
			document.getElementById('n0808').href="http://bt.box.n0808.com/"+SHA1.substr(0,2)+"/"+SHA1.substr(SHA1.length-2)+"/"+SHA1+".torrent";
			document.getElementById('TorrentKitty').href="http://d1.torrentkittycn.com/?infohash="+SHA1;
			document.getElementById('lengziyuan').href="http://d1.lengziyuan.com/?infohash="+SHA1;
			document.getElementById('xunlei').href="http://dynamic.cloud.vip.xunlei.com/interface/get_torrent?userid=95847549&infoid="+SHA1;
			document.getElementById('btspread').href="http://www.btspread.com/torrent/detail/hash/"+SHA1;
	}
});