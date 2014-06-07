// ==UserScript==
// @name downloadhelper
// @version 1.2.2.0
// @lastmod 2010.9.12
// @author bbs.operachina.com (小福.somh.fenghn888)(NLF苦力整合)
// @description 让下载变的简单..(support opera 10.1+ chrome 5+ firefox 3.5+)
// @namespace  http://userscripts.org/users/NLF
// @include http*
// ==/UserScript==

/*
***功能****
*狗狗直接下载
*纳米盘去除文件大小限制直接下载(作者:somh)
*rayfile自动进入下一页并去除文件大小限制
*brsbox自动进入下载页面并去除等待下载前的等待时间
*songtaste 歌曲直接下载(作者:小福)
*115网盘繁忙时段也可以直接下载(作者:fenghn888)
*去除迅6下载前的等待时间..
*/

(function(){
	//封装 evaluate()方法
	function matchNodes(xpath,root){
		root=root || document;
		return document.evaluate(xpath, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};

	function matchSingleNode(xpath,root){
		root=root || document;
		return document.evaluate(xpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	};

	//写cookie函数
	function setCookie(c_name,c_value,keepday,c_path,c_domain,c_secure){
		var scookie=c_name+'='+encodeURIComponent(c_value);
		if (keepday){
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+Number(keepday));
			scookie+=';expires='+exdate.toGMTString();
		};
		if (c_path){
			scookie+=';path='+c_path;
		};
		if (c_domain){
			scookie+=';domain='+c_domain;
		};
		if (c_secure){
			scookie+=';secure='+c_secure;
		};
		//alert(scookie)
		document.cookie=scookie;
	};

	//取cookie函数
	function getCookie(c_name){
		var sre="(?:;)?"+c_name+"=([^;]*);?"
		var ore=new RegExp(sre);
		if(ore.test(document.cookie)){
			return decodeURIComponent(RegExp['$1']);
		}else{
			return '';
		}
	};

	//挂载事件.
	function addevent(fn){
		if(window.opera){
			document.addEventListener('DOMContentLoaded',fn,false);
		}else{
			fn();
		};
	};

	//迅雷,快车,旋风.专用链.解码..
	function decoder(){
		
	};
	addevent(decoder);

	//迅雷狗狗,右键直接下载;
	function gougou(){
		//用地址栏执行.这样可以访问到全局变量.
		var tj_block2=document.getElementById('tj_block2');
		if(tj_block2){
			var a=document.createElement('a');
			a.id='zjxz';
			//a.href=g_downUrl;
			a.textContent="直接下载"
			a.style.cssText='\
				color:white;\
				display:inline-block;\
				text-shadow:1px 1px 2px black;\
				border:1px solid #3E86E0;\
				padding:5px 20px;\
				background-color:#7AB3FF;\
				border-radius:3px;\
				-moz-border-radius:3px;\
				box-shadow: inset 0 1px 3px #F5F5F5, inset 0 15px 3px rgba(255,255,255,0.2),1px 1px 5px #E8E8E8;\
				-moz-box-shadow: inset 0 1px 3px #F5F5F5, inset 0 15px 3px rgba(255,255,255,0.2),1px 1px 5px #E8E8E8;\
				-webkit-box-shadow: inset 0 1px 3px #F5F5F5, inset 0 15px 3px rgba(255,255,255,0.2),1px 1px 5px #E8E8E8;';
			tj_block2.appendChild(a);
			location.href="javascript:document.getElementById('zjxz').href=g_downUrl;void(0);"
		};
	};

	//纳米盘,显示直接下载
	function namipan(){
		var links=document.links;
		for (var i=0,ii=links.length;i<ii;i++){
			if(links[i].href.toLowerCase().indexOf("javascript:addlink(")==0){
				var ahref=links[i].href.replace(/^javascript:addLink\('(.*)'\);?/i,'$1');
				ahref=decodeURIComponent(ahref);
				var a=document.createElement("a");
				a.href=ahref;
				a.textContent='直接下载';
				a.style.cssText="\
					margin-right:30px;\
					color:red;\
				";
				links[i].parentNode.insertBefore(a,links[i]);
				break;
			};
		};
	};

	//rayfile直接下载.进入下一页
	function rayfile(){
		var test;
		var fi_div=document.createElement("div");
		(function(){
			var nxtLink =matchSingleNode("//a[contains(text(), '进入下载页')]");
			//alert(nxtLink);
			if(!nxtLink)return;
			test=true;
			var fileinfo = matchNodes("//div[@id='main1']/ul[1]/li[position()<=4]");
			//alert(fileinfo.snapshotLength);
			if(fileinfo.snapshotLength==0)return;
			for(var i=0,ii=fileinfo.snapshotLength;i<ii;i++){
				fi_div.appendChild(fileinfo.snapshotItem(i).cloneNode(true));
			};
			setCookie('fileinfo',fi_div.innerHTML,1,'/','www.rayfile.com');
			location.href = nxtLink.href;
		})();

		//读取 cookie 里的文件信息，添加到下载页面
		(function(){
			if(test)return;
			var fileinfo=getCookie('fileinfo');
			//alert(fileinfo);
			if(fileinfo){
				fi_div.innerHTML=fileinfo;
				var main1=document.getElementById("main1");
				if(main1){
					main1.insertBefore(fi_div,main1.firstChild);
				};
			};

			//直接下载:
			var d_link=document.createElement('a');
			d_link.id='N_download';
			d_link.style.cssText='\
				color:red;\
				display:block!important;\
				border:1px solid #CCD5EE;\
				background-color:#ECF0F9;\
				width:89px!important;\
				border-radius:3px;\
				-moz-border-radius:3px;\
				padding:0px 0;\
				text-align:center;\
				text-shadow:1px 1px 1px white;';
			d_link.textContent="直接下载";
			var o_d_link=document.getElementById('divdownnow');
			o_d_link.parentNode.replaceChild(d_link,o_d_link);
			location.href="javascript:document.getElementById('N_download').href=downloads_url[0];setKey();void(0);";
		})();
	};

	//brsbox进入下一页
	function brsbox(){
		var nxtLink =matchSingleNode("//div[@id='down_area_0']/a[div[contains(text(),'下载页')]]");
		if(nxtLink){
			location.href = nxtLink.href;
		};
		var truedownid=document.getElementById('truedownid');
		if(!truedownid)return;
		location.href='javascript:Tout();void(0);';
	};

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
			};
		};
		var div=document.getElementById("playicon");
		var str=div.getElementsByTagName("a")[0].href;
		var matchtxt = str.match(/\'[^,]+\'/g);
		var strURL=(matchtxt[6]+matchtxt[2]+GetSongType(matchtxt[5].replace(/\'/g,""))).replace(/\'/g,"");
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
		';
		a.innerHTML='下载歌曲';
		var insertP=document.getElementsByClassName('song_left')[0].getElementsByClassName('mid_tit')[0];
		insertP.appendChild(a);
	};

	//去除115网盘文件大小限制,作者:fenghn888
	function cL115(){
		var fns=function(){
			var busy_remain=document.getElementById('busy_remain');
			if(!busy_remain)return;
			var url="http://u.115.com/?ct=upload_api&ac=get_pick_code_info&pickcode=" + file_id + "&version=3";
			var xhr=new XMLHttpRequest();
			xhr.open('GET', url, false);
			/*xhr.overrideMimeType('text/html');*/
			/*xhr.setRequestHeader("UserAgent", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; en)");*/
			xhr.send(null);
			/*alert(xhr.responseText);*/
			var json=eval('('+xhr.responseText+')');
			/*alert(json.DownloadUrl.length);*/
			if(!json.State)return;
			var urltel = json.DownloadUrl[0].Url,
						urlcnc = json.DownloadUrl[1].Url,
						urlbak = json.DownloadUrl[2].Url;
			busy_remain.className = "clearfix";
			busy_remain.innerHTML = "<a class='normal-down' href='" + urltel + "'>电信1下载</a><a class='normal-down' href='" + urlcnc + "'>网通1下载</a><a class='normal-down' href='" + urlbak + "'>备份下载</a>";
		}.toString();
		//alert(fns);
		location.href='javascript:('+fns+')();void(0);'
	};

	//去除迅6下载前的等待时间..
	function xun6(){
		location.href='javascript:timeout=0;countdown();void(0);'
	};
//////////////////////////////////////////////////////////////
	var url=location.href;

	if(/down\.gougou\.com\/down/i.test(url)){
		addevent(gougou);
	}else if(/songtaste\.com\/song/i.test(url)){
		addevent(songtaste_down);
	}else if(/www\.brsbox\.com\/filebox\/down\/fc/i.test(url)){
		addevent(brsbox);
	}else if(/www\.rayfile\.com\/.*\/files\//i.test(url)){
		addevent(rayfile);
	}else if(/d\.namipan\.com\/d\//i.test(url)){
		addevent(namipan);
	}else if(/u\.115\.com\/file\/\w+/i.test(url)){
		addevent(cL115);
	}else if(/www\.xun6\.net\/file\/.+/i.test(url)){
		addevent(xun6)
	};

})();

//自动更新模块
(function(){
	//only for firefox
	if(window.opera || window.chrome)return;

	var prefs={
		id:'85969'											,//上传在 userscript上的脚本 编号.. 如地址 http://userscripts.org/scripts/show/84937 id为 84937
		curVersion:'1.2.2.0'						,//当前的版本号
		userJSName:'downloadhelper'		,//用户脚本的名字
	};

	var id=prefs.id,
				curVersion=prefs.curVersion,
				userJSName=prefs.userJSName;

	var checking;

	function checkUpdate(manual){
		if(checking)return;
		checking=true;
		GM_xmlhttpRequest({
			method: "GET",
			url:'http://userscripts.org/scripts/source/'+id+'.meta.js',
			onload: function(rsp){
				function finish(){
					GM_setValue(id+'_lastCT',String(curT));
					checking=false;
				};
				if(rsp.status!=200){
					finish();
					if(manual){
						alert('网络故障,检查失败,请稍后再试试!')
					};
					return;
				};
				var txt=rsp.responseText;
				//alert(txt);
				var latestVersion=txt.match(/@\s*version\s*([\d\.]+)\s*/i);
				if(latestVersion){
					latestVersion=latestVersion[1];
				}else{
					finish();
					if(manual)alert('检查失败,版本号不符合要求(版本号必须由 数字 和 . 组成),并且递增.');
					return;
				};
				//alert(latestVersion);

				var description=txt.match(/@\s*description\s*(.+)/i);
				if(description){
					description=description[1];
				};
				//alert(description);

				var author=txt.match(/@\s*author\s*(.+)\s*/i);
				if(author){
					author=author[1];
				};

				var timestamp=txt.match(/@\s*uso:timestamp\s*(.+)\s*/i);
				if(timestamp){
					timestamp=timestamp[1];
				};
				//alert(timestamp);

				//对比版本号
				var needUpdate;
				var xlatestVersion=latestVersion;
				var latestVersion=latestVersion.split('.');
				var lVLength=latestVersion.length;
				var currentVersion=curVersion.split('.');
				var cVLength=currentVersion.length;
				var lV_x;
				var cV_x;
				for(var i=0;i<lVLength;i++){
					lV_x=Number(latestVersion[i]);
					cV_x=(i>=cVLength)? 0 : Number(currentVersion[i]);
					if(lV_x>cV_x){
						needUpdate=true;
						break;
					}else if(lV_x<cV_x){
						break;
					};
				};
				finish();
				if(needUpdate){
					var ok=confirm('找到了一个更新!'+'\n\nJS名字: '+userJSName+(author? ('\n作者: '+author) : '')+'\n描述: '+(description? description : '无')+'\n\n当前版本号: '+curVersion+'\n最新版本号: '+xlatestVersion+(timestamp? ('\n\n更新时间: '+timestamp):'')+'\n\n你是否要升级到最新呢?');
					if(ok){
						location.href='http://userscripts.org/scripts/source/'+id+'.user.js';
					};
				}else{
					//手动更新才提示这个..
					if(manual){
						alert('已经是最新的了!'+'\n\nJS名字: '+userJSName+(author? ('\n作者: '+author) : '')+'\n描述: '+(description? description : '无')+'\n\n当前版本号: '+curVersion+'\n');
					};
				};
			}
		});
	};
	//checkUpdate();


	var registerMenuCommand=GM_getValue(id+'_registerMenuCommand',null);
	if(registerMenuCommand===null){
		registerMenuCommand=true;
		GM_setValue(id+'_registerMenuCommand',registerMenuCommand);
	};
	if(registerMenuCommand){
		GM_registerMenuCommand('检查 '+userJSName+' 更新',function(){checkUpdate(true)});
	};

	var autoUpdate=GM_getValue(id+'_autoUpdate',null);
	if(autoUpdate===null){
		autoUpdate=true;
		GM_setValue(id+'_autoUpdate',autoUpdate);
	};
	if(!autoUpdate)return;

	var interval=GM_getValue(id+'_interval',null);
	if(interval===null){
		interval='7';
		GM_setValue(id+'_interval',interval);
	};
	interval=Number(interval);


	var needCheck;
	var curT=new Date().getTime();
	//alert(typeof curT);

	var lastCT=GM_getValue(id+'_lastCT',null);
	//alert(lastCT);

	if(lastCT===null){
		needCheck=true;
	}else{
		var oneDay=86400000;//毫秒
		lastCT=Number(lastCT);
		needCheck=(((curT-lastCT)/oneDay)>=interval);
	};

	if(needCheck)checkUpdate();
})();
