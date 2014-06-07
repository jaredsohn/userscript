// ==UserScript==
// @name downloadhelp
// @version 1.1.1
// @lastmod 2010.5.23
// @author bbs.operachina.com
// @include http://www.rayfile.com/*/files/*
// @include http://www.namipan.com/d/*
// @include http://d.namipan.com/d/*
// @include http://down.gougou.com/down?cid*
// @include http://www.brsbox.com/filebox/down/fc/*
// @include http://*songtaste.com/song/*
// @include http://*songtaste.com/search*
// ==/UserScript==

(function(){
	//封装 evaluate()方法
	function DH_matchNode(xpath, root){
			return document.evaluate(xpath, root || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};

	//挂载事件.
	function addevent(fn){
		if(window.opera){
			document.addEventListener('DOMContentLoaded',fn,false);
		}else{
			fn();
		};
	};

	//迅雷狗狗,右键直接下载;
	function gougou(){
		function gougou_a(){
			if(furlArr.length>0){
				for(var i=0;i<furlArr.length;i++){
					var aid=document.getElementById('id'+i);
					var aidtext=aid.innerHTML.replace(/.*?：(.*)/,'$1');
					var a=document.createElement('a');
					a.setAttribute('href',furlArr[i]);
					a.innerHTML='右键直接下载'+(i+1)+' : '+aidtext;
					aid.parentNode.replaceChild(a,aid);
					var addr=document.getElementById('addr'+(i+1));
					addr.innerHTML='<a style=\"color:red;\" href='+furlArr[i]+'>'+furlArr[i]+'</a>';
				};
			};
		};
		//用地址栏执行.这样可以访问到全局变量.
		//location.href="javascript:" + gougou_a.toString() + "gougou_a();void(0);"
		var tj_block2=document.getElementById('tj_block2');
		if(tj_block2){
			var a=document.createElement('a');
			a.id='zjxz';
			//a.href=g_downUrl;
			a.textContent="直接下载"
			a.style.cssText='\
				display:inline-block;\
				padding:5px 10px;\
				background-color:#7AB3FF;\
				border-radius:3px;\
				-moz-border-radius:3px;\
				box-shadow:inset 0 0px 2px white,inset 0px 5px 20px rgba(255,255,255,0.5),1px 1px 5px #BCBCBC;\
				-webkit-box-shadow:inset 0 0 5px white,inset 0 5px 20px white,1px 1px 3px #F0F0F0;\
				-moz-box-shadow:inset 0 0 5px white,inset 0 5px 20px white,1px 1px 3px #F0F0F0;\
				color:white;\
				text-shadow:0 0 2px black;\
				border:1px solid #3E86E0;\
				';
			tj_block2.appendChild(a);
			location.href="javascript:document.getElementById('zjxz').href=g_downUrl;void(0);"
		};
	};
	if(/down\.gougou\.com\/down\?/i.test(location.href)){addevent(gougou)};

	//纳米盘,显示直接下载
	function namipan(){
		var links=document.links;
		for (var i=0;i<links.length;i++){
			if(links[i].href.toLowerCase().indexOf("javascript:addlink(")==0){
				var ahref=links[i].href.replace(/^javascript:addLink\('(.*)'\);?/i,'$1');
				ahref=decodeURIComponent(ahref);
				var a=document.createElement("a");
				a.href=ahref;
				a.innerHTML='直接下载';
				a.style.cssText="margin-right:30px;color:red;";
				links[i].parentNode.insertBefore(a,links[i]);
				return;
			};
		};
	};
	if(/d\.namipan\.com\/d/i.test(location.href)){addevent(namipan)};

	//rayfile直接下载.进入下一页
	function rayfile(){
		var bAddFileInfo = true ; // 是否添加文件信息
		(function(){
			var oDownloadPageLink =DH_matchNode("//div[contains(@class, 'btn_indown_')]/a").snapshotItem(0);
			if (!oDownloadPageLink) {
				return;
			};
			if(bAddFileInfo) {
				var oFileInfo = DH_matchNode("//div[@id = 'divinfo_1']/div[@class='ndFileinfo_list'][position()<=3]");
				//alert(oFileInfo.snapshotLength)
				if (!oFileInfo) {
					return;
				};
				var oDiv = document.createElement("div");
				for (var i = 0, sFileInfo ='', iLength = oFileInfo.snapshotLength; i < iLength; i++) {
					oDiv.appendChild(oFileInfo.snapshotItem(i).cloneNode(true));
				};
				document.cookie = "ujs_FileInfo=" + encodeURIComponent(oDiv.innerHTML) + "; max-age=" + 60;
			};
			location.href = oDownloadPageLink.href;
		})();

		//读取 cookie 里的文件信息，添加到下载页面的底部
		if(bAddFileInfo){
			(function(){
				var oDivDownNow = document.getElementById("divdownnow");
				if (!oDivDownNow){
					return;
				};
				var sFileInfo = document.cookie.match(/(?:;)?ujs_FileInfo=([^;]*);?/);
				//alert(sFileInfo);
				if(!sFileInfo) {
					return;
				};
				sFileInfo = decodeURIComponent(sFileInfo[1]);
				var oDiv = document.createElement("div");
				oDiv.innerHTML = sFileInfo;
				var oFragment = document.createDocumentFragment();
				for (var i=0,ol=oDiv.childNodes.length; i<ol; i++){
					oFragment.appendChild(oDiv.childNodes[0]);
				};
				oDivDownNow.parentNode.insertBefore(oFragment, oDivDownNow);
				var oDiv_nD_fileinfo = document.getElementById("nD_fileinfo");
				var oDiv_ndFileinfo = document.getElementById("ndFileinfo");
				if (!oDiv_nD_fileinfo || !oDiv_ndFileinfo) {
					return;
				};
				oDiv_nD_fileinfo.style.height='auto';
				oDiv_ndFileinfo.style.height ='auto';
			})();
		}
	};
	if(/www\.rayfile\.com\/.*\/files\//i.test(location.href)){
		addevent(rayfile);

		//破解直接下载文件大小限制
		if(window.opera){
			window.opera.addEventListener("BeforeScript",
				function(e){
					e.element.text = e.element.text.replace(/if\(filesize <= 20000000\)/i,'if(filesize <= 1000000000000)');
				}
			,false);
		};
	};

	//brsbox进入下一页
	function brsbox(){
		var oDownloadPageLink =DH_matchNode("//div[@id='down_area_0']/a[div[contains(text(),'下载页')]]").snapshotItem(0);
		if (!oDownloadPageLink){
			return;
		};
		location.href = oDownloadPageLink.href;
	};
	if(/www\.brsbox\.com\/filebox\/down\/fc/i.test(location.href)){addevent(brsbox)};

	//songtaste直接下载
	function songtaste_down(){
		function GetSongType(md5code){
			switch(md5code){
				case "7d99bb4c7bd4602c342e2bb826ee8777":
					return ".wma";
					break;
				case "25e4f07f5123910814d9b8f3958385ba":
					return ".Wma";
					break;
				case "51bbd020689d1ce1c845a484995c0cce":
					return ".WMA";
					break;
				case "b3a7a4e64bcd8aabe4cabe0e55b57af5":
					return ".mp3";
					break;
				case "d82029f73bcaf052be8930f6f4247184":
					return ".MP3";
					break;
				case "5fd91d90d9618feca4740ac1f2e7948f":
					return ".Mp3";
					break;
			}
		};
		var div=document.getElementById("playicon");
		var str=div.getElementsByTagName("a")[0].href;
		var matchtxt = str.match(/\'[^,]+\'/g);
		var strURL=(matchtxt[6]+matchtxt[2]+GetSongType(matchtxt[5].replace(/\'/g,""))).replace(/\'/g,"");
		//var songname=DH_matchNode('//div[@class="song_left"]/child::p[@class="mid_tit"]').snapshotItem(0);
		//if(songname){};
		var a=document.createElement('a');
		a.href=strURL;
		a.style.cssText='\
			margin:10px auto 0;\
			color:#D01F3C;\
			display:block;\
			background-color:#F5F5F5;\
			border:1px solid white;\
			text-align:center;\
			padding:0;\
			font-size:13px;\
			border-radius:5px;\
			line-height:25px;\
			width:75px;\
			text-shadow:0px 1px white;\
			box-shadow:1px 1px 3px #ccc;\
			-webkit-box-shadow:1px 1px 3px #ccc;\
			-moz-box-shadow:1px 1px 3px #ccc;\
			'
		a.innerHTML='下载歌曲';
		//alert(a);
		var insertP=document.getElementsByClassName('song_left')[0].getElementsByClassName('mid_tit')[0];
		insertP.appendChild(a);
		//document.getElementById('player').nextSibling.appendChild(a);
	};
	if(/songtaste\.com\/song/i.test(location.href)){addevent(songtaste_down)};

	//songtaste搜索栏位置修复
	function songtaste_sfix(){
		var searchArea = DH_matchNode('//div[@id="search_form"]/form/div').snapshotItem(0);
		searchArea.style.cssText='';
	};
	if(/songtaste\.com\/search\.php/i.test(location.href)){addevent(songtaste_sfix)};

})();