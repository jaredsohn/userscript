// ==UserScript==
// @name downloadhelp
// @version 1.1.3
// @lastmod 2010.6.25
// @author bbs.operachina.com (伪娘.小福.somh.NLF....)
// @description 让下载变的简单..(support opera 10.1+ chrome 5+ firefox 3.5+)
// @include http://www.rayfile.com/*/files/*
// @include http://d.namipan.com/d/*
// @include http://down.gougou.com/down*
// @include http://www.brsbox.com/filebox/down/fc/*
// @include http://*songtaste.com/song/*
// ==/UserScript==

(function(){
	//封装 evaluate()方法
	function matchNodes(xpath,root){
		if(root){
			xpath=xpath.indexOf('.')==0? xpath : '.'+xpath;
		}else{
			root=document;
		};
		return document.evaluate(xpath, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};

	function matchSingleNode(xpath,root){
		if(root){
			xpath=xpath.indexOf('.')==0? xpath : '.'+xpath;
		}else{
			root=document;
		};
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
				a.innerHTML='直接下载';
				a.style.cssText="margin-right:30px;color:red;";
				links[i].parentNode.insertBefore(a,links[i]);
				break;
			};
		};
	};

	//rayfile直接下载.进入下一页
	function rayfile(){
		var fi_div=document.createElement("div");
		(function(){
			var nxtLink =matchSingleNode("//div[contains(@class, 'btn_indown_')]/a");
			if(!nxtLink)return;
			var fileinfo = matchNodes("//div[@id='divinfo_1']/div[@class='ndFileinfo_list'][position()<=3]");
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
			var oDivDownNow=document.getElementById("divdownnow");
			if(!oDivDownNow)return;
			var fileinfo=getCookie('fileinfo');
			//alert(fileinfo);
			if(fileinfo){
				fi_div.innerHTML=fileinfo;
				var oFragment = document.createDocumentFragment();
				for (var i=0,ii=fi_div.childNodes.length;i<ii; i++){
					oFragment.appendChild(fi_div.childNodes[0]);
				};
				oDivDownNow.parentNode.insertBefore(oFragment, oDivDownNow);
				var oDiv_ndFileinfo = document.getElementById("ndFileinfo");
				if(oDiv_ndFileinfo){
					oDiv_ndFileinfo.style.height ='auto';
				};
				var oDiv_nD_fileinfo = document.getElementById("nD_fileinfo");
				if(oDiv_nD_fileinfo){
					var c_div=document.createElement('div');
					c_div.style.cssText='\
						clear:both!important;\
						display:hidden;';
					oDiv_nD_fileinfo.appendChild(c_div);
					oDiv_nD_fileinfo.style.height ='auto';
				};
			};

			//直接下载:
			oDivDownNow_2=document.createElement('a');
			oDivDownNow_2.id='N_download';
			oDivDownNow_2.style.cssText='\
				display:block!important;\
				border:1px solid #CCD5EE;\
				background-color:#ECF0F9;\
				width:89px!important;\
				border-radius:3px;\
				-moz-border-radius:3px;\
				padding:3px 0;\
				text-align:center;\
				box-shadow:;\
				text-shadow:1px 1px 1px white;';
			oDivDownNow_2.textContent="直接下载";
			oDivDownNow.parentNode.replaceChild(oDivDownNow_2,oDivDownNow);
			location.href="javascript:document.getElementById('N_download').href=downloads_url[0];setKey();void(0);";
		})();
	};

	//brsbox进入下一页
	function brsbox(){
		var nxtLink =matchSingleNode("//div[@id='down_area_0']/a[div[contains(text(),'下载页')]]");
		if(nxtLink){
			location.href = nxtLink.href;
		};
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
			-moz-box-shadow:1px 1px 3px #ccc;'
		a.innerHTML='下载歌曲';
		var insertP=document.getElementsByClassName('song_left')[0].getElementsByClassName('mid_tit')[0];
		insertP.appendChild(a);
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
	};

})();