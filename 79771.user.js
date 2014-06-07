// ==UserScript==
// @name Super_preloader
// @author NLF
// @description  预读+翻页..全加速你的浏览体验...#^_^#...(支持Opera 10.1+ ,Fx3.6+ ,Chrome5.0+)
// @create 2010-4-30
// @lastmodified 2010-6-8
// @version 1.7.3
// @include http*
// ==/UserScript==

var N_pre_LD={
	loaded:true					,//在页面完全加载完成后.加载脚本..如果你想更快的加载脚本..请设置为false..那么将在DOM加载完后..立即加载脚本..
};

function N_SuperPre(){
	//测试性能..
	//var time1=new Date();
/////////////////////设置//////////////////////
	var prefs={
		debug:false																,//调试高级规则..(一般用户..请无视.)
		dnextI:false																,//显示所有预读内容到页面的最下方...(预读模式下..)..
		linkalert:true															,//给预读中的链接加一个外边框..(预读模式下..)..
				allalert:true														,//在所有通往下一页的链接上显示红边框..否则只显示第一个;
				alertstyle:['1px','solid','red']				,//边框样式..
		keymatch:true																,//给没有规则的网站使用..关键字匹配模式寻找下一页..
				cases:false														,//关键字区分大小写....
				prefix:2																,//允许关键字前的字符..例如 "下一页" 要匹配 "[下一页"     那么prefix要设置为1...
				subfix:3																,//允许关键字后的字符..例如 "下一页" 要匹配 "下一页 >>"   那么subfix要设置为3...
				maxlink:6666														,//最多允许遍历多少个链接..默认6666个 只要花费50毫秒左右.一般网站只有 200 300个左右啦...
		GDAuto:false																,//全局禁用自动翻页...(如果禁用的话,那么此JS,就变成了完完全全的预读JS了..)..
		DISF:true																		,//禁止在 Iframe 和框架集网页上加载..提升性能..(建议开启)..
		transition:false														,//自动翻页时.下一页的内容淡入..;
		floatWindow:true														,//显示悬浮窗,提供.切换模式..启用禁用功能..非常滴方便;
				FW_autoD:true														,//自动显示悬浮窗(此开关只在chrome上无效.).....否则通过此命令调用: javascript:N_pre_DFW();
				FW_sr:true															,//点击悬浮窗上的保存按钮..立即刷新页面;
				GPJ:false															,//默认在无高级规则的网站上开启 强制拼接;
				GIP:false															,//默认在无高级规则的网站上使用 iframe预读;
		SSTOP:true																	,//快速停止自动翻页...快捷键..按住shift 双击页面..;
	};

	if(prefs.DISF){
		if(window.parent!=window || !document.body){return;};
	}else{
		if(window.name=='N_preiframe'){return;};
	};

//////////////////////////---------------规则-------////////////////

	//高级规则的一些默认设置..如果你不知道是什么..请务必不要修改它.此修改会影响到所有高级规则...
	var SITEINFO_D={
		enable:true						,//启用
		useiframe:false			,//(预读)是否使用iframe..
		autopager:{
			enable:true						,//启用自动翻页...
			useiframe:false			,//(翻页)是否使用iframe..
			remain:1							,//剩余页面的高度..是显示高度的 remain 倍开始翻页..
			maxpage:99						,//最多翻多少页..
			separator:true				//显示翻页导航..(推荐显示.)
		}
	};

	//高优先级规则
	var SITEINFO=[
		{siteName:'google图片'																																,//站点名字...
			enable:true																																					,//启用.(总开关)..
			url:/^https?:\/\/\w{3,7}\.google(?:\.\w{1,4}){1,2}\/images/i										,//站点正则...
			siteExample:'http://images.google.com'																							,//站点实例....
			useiframe:false																																		,//是否用iframe预读...
			nextLink:'//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]'						,//下一页链接 xpath..或者..函数返回一个可用链接..
			autopager:{
				enable:true																	,//启用(自动翻页);
				useiframe:true															,//使用iframe翻页
				pageElement:'//div[@id="res"]/div'					,//主体内容xpath;
				remain:1.1																	,//剩余页面的高度..是显示高度的 remain 倍开始翻页;
				maxpage:10																	,//最多翻页数量;
				separator:true															,//是否显示翻页导航;
				replaceE:'//div[@id="navcnt"]'							,//需要替换的部分..一般是翻页导航(可选);
				HT_insert:['//div[@id="res"]',2]						//插入方式此项为一个数组: [节点xpath,插入方式(1：插入到给定节点之前;2：附加到给定节点的里面)](可选);
			}
		},
		{siteName:'google搜索',
			url:/^https?:\/\/\w{3,7}\.google(?:\.\w{1,4}){1,2}\/search/i,
			siteExample:'http://www.google.com',
			useiframe:true,
			nextLink:'//table[@id="nav"]/descendant::a[last()][parent::td[@class="b"]]',
			autopager:{
				pageElement:'//div[@id="ires"]',
				remain:1/3,
				replaceE:'//div[@id="navcnt"]',
				HT_insert:['//div[@id="res"]',2]
			}
		},
		{siteName:'百度搜索',
			url:/^https?:\/\/www\.baidu\.com\/(?:s|baidu)\?/i,
			siteExample:'http://www.baidu.com',
			useiframe:true,
			nextLink:'//div[@class="p"]/a[font[text()="下一页"]]',
			autopager:{
				pageElement:'//div[@id="wrapper"]/table[@id] | //div[@id="wrapper"]/table[@id]/following-sibling::br[1] | //div[@class="p"]',
				remain:1/3,
				HT_insert:['//div[@id="wrapper"]/table[last()]',1]
			}
		},
		{siteName:'百度图片',
			url:/^http:\/\/image\.baidu\.com\/i/i,
			siteExample:'http://image.baidu.com/i',
			nextLink:'//div[@id="pgw"]/child::*[last()][@href]',
			autopager:{
				enable:false,
				pageElement:'//div[@id="imgid"]',
			}
		},
		{siteName:'万卷书库小说阅读页',
			url:/^http:\/\/www\.wanjuan\.net\/article\/.+html/i,
			useiframe:true,
			nextLink:'//div[@id="gotopage"]/descendant::a[text()="下一页"]',
			autopager:{
				useiframe:true,
				pageElement:'//div[@id="contentleft"]'
			}
		},
		{siteName:'万卷书屋小说阅读页',
			url:/^http:\/\/www\.wjxsw\.com\/html\/.+html/i,
			useiframe:true,
			nextLink:'//div[@id="LinkMenu"]/descendant::a[last()]',
			autopager:{
				useiframe:true,
				pageElement:'//div[@id="TextTitle"] | //div[@id="BookText"]'
			}
		},
		{siteName:'起点小说阅读页',
			url:/^http:\/\/www\.qidian\.com\/BookReader\/\d+,\d+/i,
			siteExample:'http://www.qidian.com/BookReader/1545376,27301383.aspx',
			useiframe:true,
			nextLink:'//a[@id="NextLink"]',
			autopager:{
				useiframe:true,
				pageElement:'//div[@id="maincontent"]/div[@class="booktitle"] | //div[@id="maincontent"]/div[@id="content"]'
			}
		},
		{siteName:'冰地小说阅读页',
			url:/^http:\/\/www\.bingdi\.com\/html\/book\/.+/i,
			siteExample:'http://www.bingdi.com/html/book/130/153935/4201826.shtm',
			useiframe:true,
			nextLink:'//div[@id="LinkMenu"]/descendant::a[last()][text()="翻下页"]',
			autopager:{
				useiframe:true,
				pageElement:'//div[@id="Content"]'
			}
		},
		{siteName:'opera官方网站帖子页面',
			url:/^http:\/\/bbs\.operachina\.com\/viewtopic/i,
			siteExample:'http://bbs.operachina.com/viewtopic',
			nextLink:'//div[@id="paginationbottom"]/descendant::a[last()][text()="下一页"]',
			autopager:{
				pageElement:'//div[@id="page-body"]/div[starts-with(@class,"post")] |//div[@class="buttons"]  | //div[@id="paginationbottom"] | //div[@id="quick_reply"]',
				remain:1/2,
				replaceE:'//div[@id="paginationbottom"]'
			}
		},
		{siteName:'深度论坛帖子页面',
			url:/http:\/\/bbs\.deepin\.org\/thread/i,
			siteExample:'http://bbs.deepin.org/thread',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'卡饭论坛帖子页面',
			url:/http:\/\/bbs\.kafan\.cn\/thread/i,
			siteExample:'http://bbs.kafan.cn/thread',
			nextLink:'//div[@class="pg"]/descendant::a[@class="nxt"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'远景论坛帖子页面',
			url:/http:\/\/bbs\.pcbeta\.com\/thread/i,
			siteExample:'http://bbs.pcbeta.com/thread',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'思源论坛帖子页面',
			url:/missyuan\.com\/thread-\d+-\d+-\d+\.htm/i,
			siteExample:'http://www.missyuan.com/thread-431242-1-1.html',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//form[@name="modactions"]'
			}
		},
		{siteName:'极点五笔帖子页面',
			url:/www\.wbfans\.com\/bbs\/viewthread\.php/i,
			siteExample:'http://www.wbfans.com/bbs/viewthread.php?tid=49308&extra=page%3D1',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]',
				remain:1/2
			}
		},
		{siteName:'天极动漫频道新闻',
			url:/http:\/\/comic\.yesky\.com\/\d+\/.+\.shtml/i,
			siteExample:'http://comic.yesky.com/249/11335749_5.shtml',
			nextLink:'//div[@id="numpage"]/descendant::a[contains(text(),"下一页")]',
			autopager:{
				pageElement:'//div[@class="ArticleCnt"]',
				remain:1.4,
				replaceE:'//div[@id="numpage"]',
			}
		},
		{siteName:'赢政天下论坛帖子页面',
			url:/http:\/\/bbs\.winzheng\.com\/viewthread/i,
			siteExample:'http://bbs.winzheng.com/viewthread.php?tid=',
			nextLink:'//div[@class="forumcontrol"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'soso网页搜索',
			url:/http:\/\/www\.soso\.com\/q/i,
			siteExample:'http://www.soso.com/q',
			nextLink:'//div[@id="page"]/descendant::a[last()][@class="next"]',
			autopager:{
				pageElement:'//div[@id="s_main"]/table[1]',
				remain:1/2,
				maxpage:5,
				replaceE:'//div[@id="page"]',
			}
		},
		{siteName:'bing网页搜索',
			url:/bing\.com\/search\?q=/i,
			siteExample:'bing.com/search?q=',
			nextLink:'//div[@id="results_container"]/descendant::a[last()][@class="sb_pagN"]',
			autopager:{
				pageElement:'//div[@id="results"] | //div[@id="results_container"]/div[@class="sb_pag"]',
				remain:1/3,
				maxpage:5
			}
		},
		{siteName:'有道网页搜索',
			url:/http:\/\/www\.youdao\.com\/search\?/i,
			siteExample:'http://www.youdao.com/search?',
			useiframe:true,
			nextLink:'//div[@id="pagination"]/descendant::a[last()][@class="next-page"]',
			autopager:{
				pageElement:'//ul[@id="results"] | //div[@id="pagination"]',
				maxpage:5,
				HT_insert:['//form[@id="bs"]',1]
			}
		},
		{siteName:'爱漫画',
			url:/^http:\/\/www\.imanhua\.com\/comic\/.+/i,
			siteExample:'http://www.imanhua.com/comic/55/list_39448.html',
			useiframe:true,
			nextLink:function(D,W){
				D=D || document;
				W=W || window;
				var s2=D.getElementById('s2');
				if(s2){
					var s2os=s2.options
					var s2osl=s2os.length;
					//alert(s2.selectedIndex);
					if(s2.selectedIndex==s2osl-1)return;
				};
				var url=W.location.href;
				return url.replace(/(.*html)(.*)/i,function(a,b,c){
					if(!c){
						return b+'?p=2';
					}else{
						return (b+ c.replace(/(.*)(\d+)/i,function(a,b,c){return b+(Number(c)+1)}));
					}
				})
			},
			autopager:{
				useiframe:true,
				pageElement:'//body/table[@class="tbCenter"][1]',
				remain:1/2
			}
		},
		{siteName:'煎蛋首页',
			url:/http:\/\/jandan\.net\/(?:page)?/i,
			siteExample:'http://jandan.net/',
			useiframe:true,
			nextLink:'//div[@class="wp-pagenavi"]/child::a[not(@title)]',
			autopager:{
				pageElement:'//div[@id="body"]'
			}
		},
		{siteName:'中国教程网论坛帖子页面',
			url:/http:\/\/bbs\.jcwcn\.com\/thread/i,
			siteExample:'http://bbs.jcwcn.com/thread',
			nextLink:'//div[@class="pages"]/descendant::a[@class="next"]',
			autopager:{
				pageElement:'//div[@id="postlist"]'
			}
		},
		{siteName:'kuku动漫',
			url:/http:\/\/comic\.kukudm\.com\/comiclist\/\d+\/\d+.*\.htm/i,
			siteExample:'http://comic.kukudm.com/comiclist/4/17099/3.htm',
			useiframe:true,
			nextLink:'//a[img[contains(@src,"images/d.gif")]]',
			autopager:{
				useiframe:true,
				pageElement:'//body/table[2]'
			}
		},
		{siteName:'EZ游戏社区',
			url:/http:\/\/bbs\.emu-zone\.org\/newbbs\/thread/i,
			siteExample:'http://bbs.emu-zone.org/newbbs/thread',
			nextLink:'//div[@class="p_bar"]/a[contains(text(),"››")]',
			autopager:{
				pageElement:'//form[@name="delpost"]'
			}
		},
	];

	//兼容 oautopager的规则放在这里.
	var SITEINFO2=[
	
	];

	//统配规则;为什么分开写??因为这样启用.禁用比较方便..可控制性好..
	var TPrules=[
		['所有符合条件的discuz论坛帖子内容页面',true,/^http.*(?:(?:thread-\d+-\d+-\d+.html?)|(?:viewthread\.php))/i,'//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"]'],
		['所有符合条件的discuz论坛帖子列表页面',true,/^http.*(?:(?:forum-\d+-\d+.html?)|(?:forumdisplay\.php))/i,'//div[@class="pages" or @class="pg"]/descendant::a[@class="next" or @class="nxt"]'],
	];

	//在以下网站用iframe预读.. 3个项.分别是:名字,启用,网站正则..
	var UseIframe=[
		['站点名字',false,/example\.com/i]
	];
	//黑名单,在此网页上禁止加载..和上面一样的规则..也可以使用@exclude排除
	var blackList=[
		['站点名字',false,/example\.com/i]
	];

	//强制拼接的一些默认设置...如果你不知道是什么..请务必不要修改它..
	var SITEINFO_F_D={
		remain:1					,//剩余多少翻页...
		maxpage:99				,//最多翻多少页..
		separator:true		,//显示翻页导航..
	};

	//下一页关键字,允许部分容差..例如 '下一页' 可以匹配 '下一页>' '下一页>>' '下一页 >>'等..字符串长度容差为3(默认) 
	var nextPageKey=[
			'下一页',
			'下一頁',
			'下页',
			'下頁',
			'翻页',
			'翻頁',
			'翻下頁',
			'翻下页',
			'下一张',
			'下一張',
			'下一幅',
			'下一章',
			'下一节',
			'下一節',
			'下一篇',
			'后一页',
			'後一頁',
			'前进',
			'下篇',
			'后页',
			'往后',
			'»',
			'››',
			'Next',
			'Next Page',
			'次へ'
	];

////////////////////////////////////////////////////////////////////////////////////////////////
	function matchNodes(xpath,doc,root){
		doc=doc||document;
		if(root){xpath=xpath.indexOf('.')==0? xpath : '.'+xpath;};
		root=root||doc;
		return doc.evaluate(xpath, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};

	function matchSingleNode(xpath,doc,root){
		doc=doc||document;
		if(root){xpath=xpath.indexOf('.')==0? xpath : '.'+xpath;};
		root=root||doc;
		return doc.evaluate(xpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	};

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

	function getCookie(c_name){
		var sre="(?:;)?"+c_name+"=([^;]*);?"
		var ore=new RegExp(sre);
		if(ore.test(document.cookie)){
			return decodeURIComponent(RegExp['$1']);
		}else{
			return '';
		}
	};

	function TwindowV(VN,VV){
		window.location.href='javascript:'+VN+'="'+VV+'";void(0);';
	};

	function GetNextLink(getlink,D,W){
		return ((typeof getlink)=='string')? matchSingleNode(getlink,D) : getlink(D,W);
	};

	function debugF(x,y){
		switch(x){
			case 'link':{
				alert('url: '+siteEXPo+'\nnextLink: '+y+'\n\n无法获取下一页链接');
			}break;
			case 'content':{
				alert('url: '+siteEXPo+'\npageElement: '+y+'\n\n无法获取下一页内容');
			}break;
			default:break;
		};
	}

	function CdnextIdiv(){
		var ddiv=document.createElement('div');
		ddiv.style.cssText='\
			padding:8px;';
		var span=document.createElement('span');
		span.style.cssText='\
			text-align:left!important;\
			color:red;\
			font-size:13px;\
			text-shadow:2px 2px 5px #ccc;';
		var hr=document.createElement('hr');
		hr.style.cssText='\
			display:block!important;\
			border:1px solid!important;';
		ddiv.appendChild(hr);
		ddiv.appendChild(span);
		ddiv.appendChild(hr.cloneNode(true));
		document.body.appendChild(ddiv);
		return {ddiv:ddiv,span:span};
	};

	function Csepdiv(ahref){
		var sepdiv=document.createElement('div');
		sepdiv.style.cssText='\
			opacity:0;\
			text-align:center;\
			font-size:13px;\
			display:block;\
			padding:10px 5px;\
			clear:both!important;';
		if(prefs.transition){
			sepdiv.style.cssText+='\
				;-o-transition:opacity 0.7s ease-in-out;\
				-webkit-transition:opacity 1s ease-in-out;\
				-moz-transition:opacity 1s ease-in-out;'
		};
		var a=document.createElement('a');
		a.href=ahref;
		a.style.cssText='text-shadow:2px 2px 5px #ccc';
		var hr=document.createElement('hr');
		hr.style.cssText='\
			display:block!important;\
			border:1px solid!important;';
		sepdiv.appendChild(hr);
		sepdiv.appendChild(a);
		sepdiv.appendChild(hr.cloneNode(true));
		a.innerHTML='<b><span style="color:red">'+a_pged+':</span>Preloader: </b>'+ahref;
		return sepdiv
	};

	function createHTMLDocumentByString(str){ //来自oAutoPagerize;
		if (document.documentElement.nodeName.toLowerCase() != 'html') {
			return new DOMParser().parseFromString(str, 'application/xhtml+xml');
		};
		var source = String(str);// Thx! jAutoPagerize#HTMLResource.createDocumentFromString http://svn.coderepos.org/share/lang/javascript/userscripts/jautopagerize.user.js
		//source = source.replace(/<script(?:[ \t\r\n][^>]*)?>[\S\s]*?<\/script[ \t\r\n]*>|<\/?(?:i?frame|html|script|object)(?:[ \t\r\n][^<>]*)?>/gi, ' ');

		var doc;
		if (document.implementation.createHTMLDocument) {
			doc = document.implementation.createHTMLDocument('N_Super_preloader');
		} else {
			doc = document.cloneNode(false);
			if (doc) {
				doc.appendChild(doc.importNode(document.documentElement, false));
			} else {
				doc = document.implementation.createDocument(null, 'title', null);
			}
		};

		//alert(source.replace(/\n/ig,'').match(/.*/i)[0]);
		//alert(source.replace(/\n/ig,'').match(/<body[^>]*>(.*)(?:<\/body[^>]*>)/i)[1]);
		//alert(doc.documentElement.innerHTML)

		var range = document.createRange();
		range.selectNodeContents(document.documentElement);
		var fragment = range.createContextualFragment(source);

		var headChildNames = {
			title: true,
			meta: true,
			link: true,
			script: true,
			style: true,
			base: true
		};

		var head = doc.getElementsByTagName('head')[0] || doc.createElement('head');
		var body = doc.getElementsByTagName('body')[0] || doc.createElement('body'); 
		var child;
		while ((child = fragment.firstChild)) {
			//alert(child)
			if(
					(child.nodeType === doc.ELEMENT_NODE && !(child.nodeName.toLowerCase() in headChildNames)) ||
					(child.nodeType === doc.TEXT_NODE &&/\S/.test(child.nodeValue))
				){
				break;
			};
			head.appendChild(child);
		};
		body.appendChild(fragment);
		doc.documentElement.appendChild(head);
		doc.documentElement.appendChild(body);
		//alert(source);
		//alert(doc.documentElement.outerHTML);
		return doc;
	};

	//XHR请求..
	var HTMLdoc;
	function XHR_loadover(hr,ahref){
		if(hr.readyState == 4){
			var str=hr.responseText;
			//alert(str);
			if(F_fy){
				HTMLdoc=createHTMLDocumentByString(str);
				a_loadover=true;
				if(a_autoPF){
					a_autoPF=false;
					StartAutoPG();
				};
			}else{
				var images=str.replace(/\n/ig,'').match(/<\s*img.*?src\s*=\s*"[^"]*"/ig);
				if(!images)return;
				var i=0,ii=images.length,src,img,dimages=[],isexist,ddiv,span;
				for(i,ii;i<ii;i++){
					src=images[i].match(/src\s*=\s*"([^"]*)"/i)[1];
					//跳过src一样的图片...
					for(var j=0;j<dimages.length;j++){
						if(src==dimages[j]){isexist=true;};
					};
					if(isexist){
						isexist=false;
						continue;
					};
					img=new Image();
					img.src=src;
					//alert(src)
					dimages.push(src);
					if(prefs.dnextI){
						if(!ddiv){
							var debug=CdnextIdiv();
							ddiv=debug.ddiv;
							span=debug.span;
						};
						ddiv.appendChild(img);
					};
				};
				if(span){span.innerHTML='预读取图片张数: '+'<b>' +dimages.length+ '</b>'+'<br />'+'预读网址: '+'<b>'+ahref +'</b>';}
			};
		};
	};

	function xhttpRequest(ahref){
		var hr=new XMLHttpRequest();
		hr.onreadystatechange=function(){XHR_loadover(hr,ahref)};
		hr.open("GET",ahref,true);
		//解决乱码
		hr.overrideMimeType('text/html; charset=' + document.characterSet);
		//hr.setRequestHeader("Content-Type", "text/html;charset="+document.characterSet);
		hr.send(null);
	};

	//Iframe请求..
	var N_preiframe;
	function iframeRequest(ahref){
		N_preiframe=document.createElement('iframe');
		setTimeout(function(){N_preiframe.src=ahref},0);
		N_preiframe.name='N_preiframe';
		N_preiframe.width='100%';
		if(prefs.dnextI && !F_fy){
			var debug=CdnextIdiv();
			var ddiv=debug.ddiv;
			var span=debug.span;
			span.innerHTML='iframe全预读: '+'<br />'+'预读网址: '+'<b>'+ahref +'</b>';
			N_preiframe.height='300px';
			ddiv.appendChild(N_preiframe);
		}else{
			N_preiframe.height=0;
			N_preiframe.style.cssText+='\
				margin:0;\
				padding:0;\
				opacity:0;\
				height:0;\
				display:hidden;';
			document.body.appendChild(N_preiframe);
		};
		N_preiframe.addEventListener('load',function(){
			if(F_fy){
				a_loadover=true;
				if(a_autoPF){
					a_autoPF=false;
					StartAutoPG();
				};
			};
		},false);
	};

	//修复operaiframe便当bug;
	function OIBF(Xcontent){
		var bugfixed=document.implementation.createHTMLDocument('fixed_opera_bug');
		//bugfixed.documentElement.innerHTML=Xcontent.outerHTML;
		bugfixed.body.innerHTML=Xcontent.outerHTML;
		if(Xcontent.nodeName.toLowerCase()!=='body'){
			return bugfixed.body.firstChild;
		}else{
			return bugfixed.body;
		};
	};

	var WCFixDIV;
	function insertContent(doc,win){
		//if(SSTOP)return;
		a_pged+=1;
		a_loadover=false;
		var ahref=GetNextLink(a_linkx,doc,win||doc);
		//chrome bugfixed;
		if(window.chrome && ahref.tagName){
			ahref=doc.importNode(ahref,true);
			if(!WCFixDIV){
				WCFixDIV=document.createElement('div');
				document.body.appendChild(WCFixDIV);
				WCFixDIV.style.display='none';
			};
			var WCFixDIVF=WCFixDIV.firstChild;
			if(WCFixDIVF){
				WCFixDIV.replaceChild(ahref,WCFixDIVF);
			}else{
				WCFixDIV.appendChild(ahref);
			};
			ahref=WCFixDIV.firstChild.href;
		};

		var fragment=document.createDocumentFragment();
		if(a_separator){
			var sepdiv=Csepdiv(a_Fnextlink);
			fragment.appendChild(sepdiv);
			setTimeout(function(){sepdiv.style.opacity=1;},0);
		};

		var content=matchNodes(a_pageElement,doc);
		var contentL=content.snapshotLength
		if(contentL!=0){
			for(var i=0;i<contentL;i++){
				var Xcontent=content.snapshotItem(i);
				if(window.chrome)Xcontent=doc.importNode(Xcontent,true);
				//修复...opera iframe翻页模式下的便当问题..
				if(window.opera && a_iframepre)Xcontent=OIBF(Xcontent);
				if(Xcontent.tagName.toLowerCase()=='script'){
					Xcontent.removeAttribute('src');
					Xcontent.innerHTML='';
				};
				var scipts=Xcontent.getElementsByTagName('script');
				for(var j=0,jj=scipts.length;j<jj;j++){
					scipts[0].parentNode.removeChild(scipts[0]);
				};
				if(prefs.transition){
					Xcontent.style.cssText+='\
						;opacity:0.1;\
						position:relative;\
						top:30px;\
						-o-transition:opacity 0.5s ease-in-out,top 0.5s ease-in-out;\
						-moz-transition:opacity 0.5s ease-in-out,top 0.5s ease-in-out;\
						-webkit-transition:opacity 0.5s ease-in-out,top 0.5s ease-in-out;';
					setTimeout((function(XC){return function(){XC.style.opacity=1;XC.style.top=0;}})(Xcontent),0);
				};
				fragment.appendChild(Xcontent);
			};
		}else{
			if(prefs.debug){
				debugF('content',a_pageElement);
			};
		};

		if(!a_insertP){
			if(a_Iposition){
				a_insertP=matchSingleNode(a_Iposition);
			}else{
				var ocontent=matchNodes(a_pageElement);
				ocontent=ocontent.snapshotItem(ocontent.snapshotLength-1);
				a_insertP=ocontent.nextSibling? ocontent.nextSibling : ocontent.parentNode.appendChild(document.createTextNode(' '));
			};
		};

		if(a_IMethod==2){
			a_insertP.parentNode.appendChild(fragment);
		}else{
			a_insertP.parentNode.insertBefore(fragment,a_insertP);
		};

		if(a_replaceE){
			var oldnav=matchNodes(a_replaceE);
			//alert(oldnav.snapshotLength);
			if(oldnav.snapshotLength===1){
				oldnav=oldnav.snapshotItem(0);
				var newnav=matchSingleNode(a_replaceE,doc);
				if(newnav){
					if(window.chrome)newnav=doc.importNode(newnav,true);
					if(window.opera && a_iframepre)newnav=OIBF(newnav);
					oldnav.parentNode.replaceChild(newnav,oldnav);
				};
			};
		};

		a_Fnextlink=ahref;
		TwindowV('N_PreNextLink',ahref);
		return ahref;
	};

	function getRemain(){
		var TH=document.body.scrollHeight;
		var scrolly=window.scrollY;
		var WI=window.innerHeight;
		var SY=TH-scrolly-WI;
		return SY/WI;
	};

	function StartAutoPG(){
		if(a_loadover && !working && getRemain()<= a_remain && a_pged<a_maxpage && !SSTOP){
			working=true;
			var ahref;
			if(a_iframepre){
				ahref=insertContent(N_preiframe.contentDocument,N_preiframe.contentWindow);
				if(ahref){
					if(prefs.transition){
						setTimeout(function(){N_preiframe.src=ahref},666);
					}else{
						N_preiframe.src=ahref;
					};
				};
			}else{
				ahref=insertContent(HTMLdoc);
				if(ahref)xhttpRequest(ahref);
			};
			if(!ahref || a_pged===a_maxpage){
				window.removeEventListener('scroll',autoPG,false);
			};
			working=false;
		};
	};

	var scrolltime,working,a_loadover,a_insertP,a_pged=0;
	function autoPG(){
		clearTimeout(scrolltime);
		scrolltime=setTimeout(StartAutoPG,100);
	};

	function toRegExp(obj){
		if(!(obj instanceof RegExp)){
			return (obj instanceof Array)? (new RegExp(obj[0],obj[1])) : (new RegExp(obj));
		}else{
			return obj;
		};
	};

	//悬浮窗
	var FW_Created;
	function floatWinodw(C_enable){
		if(!prefs.floatWindow)return;
		if(FW_Created)return;
		var style=document.createElement('style');
		style.innerHTML='\
			#N_pre_FW {\
				position:absolute!important;\
				z-index:9999;\
			}\
			#N_pre_FW *{\
				float:none!important;\
			}\
			#N_pre_FW input{\
				margin:0!important;\
			}\
			#N_pre_FWC, #N_pre_FWKG {\
				border:1px solid #FFF;\
				box-shadow:0 0 5px black;\
				-webkit-box-shadow:0 0 5px black;\
				-moz-box-shadow:0 0 5px black;\
				border-radius:3px;\
			}\
			#N_pre_FWC {\
				display:none;\
				font-size:12px;\
				-moz-border-radius:3px;\
				background-color:#E8E8E8;\
				padding:3px!important;\
				text-align:center!important;\
			}\
			#N_pre_FWKG {\
				width:10px;\
				height:10px;\
				padding:0;\
				margin:0;\
				-moz-border-radius:3px;\
				background-color:black;\
				opacity:0.5;\
				float:right;\
			}\
			#N_pre_FW:hover #N_pre_FWC {\
				display:block;\
			}\
			#N_pre_FW:hover #N_pre_FWKG {\
				display:none;\
			}\
			#N_pre_FW_mode_yd_sel,#N_pre_FW_mode_fy_sel{\
				font-size:12px;\
			}';
		document.getElementsByTagName('head')[0].appendChild(style);
		var div=document.createElement('div');
		div.id="N_pre_FW";
		div.style.top='20px';
		div.style.right='20px';
		div.innerHTML='\
			<div id="N_pre_FWKG">\
			</div>\
			<div id="N_pre_FWC">\
				<input id="N_pre_FW_mode_yd"  type="radio" name="N_pre_FW_mode" />\
				预读模式\
				<select id="N_pre_FW_mode_yd_sel">\
					<option id="N_pre_FW_mode_yd_X" value="false" >XHR预读</option>\
					<option id="N_pre_FW_mode_yd_I" value="true" >Iframe预读</option>\
				</select>\
				<br />\
				<input id="N_pre_FW_mode_fy" type="radio" name="N_pre_FW_mode" />\
				翻页模式\
				<select id="N_pre_FW_mode_fy_sel" >\
					<option id="N_pre_FW_mode_fy_X" >XHR翻页</option>\
					<option id="N_pre_FW_mode_fy_I" >Iframe翻页</option>\
				</select>\
				<div style="padding-top:3px;">\
					<input id="N_pre_FWenable" type="checkbox" title="启用JS" />启用\
					<input id="N_pre_FW_yd_F_fy" type="checkbox" title="强制将下一页的内容的Body部分拼接上来" />拼接\
					<input id="N_pre_FWdebug" type="checkbox" title="将预读的内容放在页面的底部(预读模式下生效)" />查看\
					<input id="N_pre_FWsave" type="button" value="保存" title="保存设置到cookie里面" />\
				</div>\
			</div>'
		document.body.appendChild(div);

		function GE(id){
			return document.getElementById(id)
		};

		var mode_yd_sel=GE('N_pre_FW_mode_yd_sel');
		var mode_yd=GE('N_pre_FW_mode_yd');
		var mode_yd_X=GE('N_pre_FW_mode_yd_X');
		var mode_yd_I=GE('N_pre_FW_mode_yd_I');

		var mode_fy_sel=GE('N_pre_FW_mode_fy_sel');
		var mode_fy=GE('N_pre_FW_mode_fy');
		var mode_fy_X=GE('N_pre_FW_mode_fy_X');
		var mode_fy_I=GE('N_pre_FW_mode_fy_I');
		var FW_mode_yd_f_fy=GE('N_pre_FW_mode_yd_f_fy');

		var FWenable=GE('N_pre_FWenable');
		var FWKG=GE('N_pre_FWKG');
		var FWsave=GE('N_pre_FWsave');
		var FWdebug=GE('N_pre_FWdebug');
		var FW_yd_F_fy=GE('N_pre_FW_yd_F_fy');
		var floatdvi=document.getElementById('N_pre_FW');

	function SaveToC(value){
		if(siteEXP){
			setCookie('N_pre_HC',value,365,'/',location.hostname);
		}else{
			setCookie('N_pre_NC',value,365,'/',location.hostname);
		};
	};

		FWsave.addEventListener('click',function (){
			//高级模式...
			var C_value,C_enable=FWenable.checked,C_view=FWdebug.checked,C_yd_iframepre=mode_yd_sel.selectedIndex==0? false : true,C_yd_F_fy=FW_yd_F_fy.checked;
			if(siteEXP){
				var C_a_iframepre=mode_fy_sel.selectedIndex==0? false : true;
				var C_a_enable=mode_fy.checked;
				C_value='['+siteEXP+','+C_enable+','+C_a_iframepre+','+C_yd_iframepre+','+C_a_enable+','+C_view+','+C_yd_F_fy+']';
				var C_setValue=getCookie('N_pre_HC');
				//alert(C_value);
				var findit;
				//alert(C_setValue);
				if(C_setValue){
					C_setValue=eval(C_setValue);
					for(var i=0,ii=C_setValue.length;i<ii;i++){
						var xset=C_setValue[i];
						C_setValue[i]='['+C_setValue[i]+']';
						if(String(xset[0])==String(siteEXP)){
							findit=i+1;
						};
					};
				};

				if(findit){
					//替换;
					C_setValue[findit-1]=C_value;
					SaveToC('['+C_setValue+']');
				}else if(C_setValue){
					//追加;
					C_setValue.push(C_value);
					SaveToC('['+C_setValue+']');
				}else{
					//第一次;
					SaveToC('['+C_value+']');
				};
			}else{
				C_value='['+C_enable+','+C_yd_iframepre+','+C_view+','+C_yd_F_fy+']';
				SaveToC(C_value);
			};
			if(prefs.FW_sr){location.reload()};
		},false);

		if(siteEXP){
			if(a_enable){
				mode_fy.checked=true;
				FWdebug.disabled=true;
				if(C_enable)FWKG.style.backgroundColor='#891F31';
			}else{
				FW_yd_F_fy.disabled=true;
			};
			if(a_iframepre){
				mode_fy_I.selected=true;
			}else{
				mode_fy_X.selected=true;
			};

			mode_yd.addEventListener('change',function(){
				if(this.checked){
					FWdebug.disabled=false;
					FW_yd_F_fy.disabled=true;
				};
			},false);

			mode_fy.addEventListener('change',function(){
				if(this.checked){
					FWdebug.disabled=true;
					FW_yd_F_fy.disabled=false;
				};
			},false);


		}else{
			FW_yd_F_fy.addEventListener('change',function(){
				FWdebug.disabled=this.checked;
			},false);

			if(F_fy){
				FWdebug.disabled=yd_F_enable;
			};
		};

		if(!a_enable){
			mode_yd.checked=true;
			if(C_enable)FWKG.style.backgroundColor='#5564AF';
		};

		if(a_enable===undefined){
			mode_fy.disabled=true;
			mode_fy_sel.disabled=true;
		};

		if(yd_iframepre){
			mode_yd_I.selected=true;
		}else{
			mode_yd_X.selected=true;
		};

		if(prefs.GDAuto){
			FW_yd_F_fy.disabled=true;
		};

		FW_yd_F_fy.checked=yd_F_enable;
		FWenable.checked=C_enable;
		FWdebug.checked=prefs.dnextI;

		var timeout;
		var ot=parseFloat(floatdvi.style.top);
		var or=parseFloat(floatdvi.style.right);
		function gs(){
			if (timeout){clearTimeout(timeout)};
			timeout=setTimeout(gss,200);
		};
		function gss(){
			var scrolly=window.scrollY;
			var scrollx=window.scrollX;
			floatdvi.style.top=scrolly+ot+'px';
			floatdvi.style.right=-scrollx+or+'px';
		};
		gss();
		window.addEventListener('scroll',gs,false);
		FW_Created=true;
	};

	//获取下一页的链接
	var a_enable,a_pageElement,a_iframepre,a_remain,a_maxpage,a_separator,a_replaceE,a_Iposition,a_IMethod,a_linkx,a_Fnextlink,a_autoPF;
	var yd_iframepre,siteEXP,siteEXPo,yd_F_enable,F_fy,SSTOP;
	function findlink(){
		var URL=location.href;
		var C_enable=true,C_setValue,C_yd_F_enable;

		//黑名单..
		for(var i=0,ii=blackList.length;i<ii;i++){
			if(blackList[i][1] && (toRegExp(blackList[i][2])).test(URL))return;
		};

		//第一阶段..分析高级模式..
		var nextlink,getcf,TSP,SII;
		SITEINFO=SITEINFO.concat(SITEINFO2);
		for(var i=0,ii=SITEINFO.length;i<ii;i++){
			SII=SITEINFO[i];
			TSP=SII.url || SII.siteExp;
			siteEXPo=TSP;
			TSP=toRegExp(TSP);
			if(TSP.test(URL)){
				if(SII.enable===undefined)SII.enable=SITEINFO_D.enable;
				if(!SII.enable)return;
				var getlinkm=SII.nextLink || SII.getNPL;
				nextlink= GetNextLink(getlinkm);
				//alert(nextlink);
				if(nextlink){
					siteEXP=TSP;
					//alert(siteEXP);
					if(prefs.floatWindow){
						C_setValue=getCookie('N_pre_HC');
						if(C_setValue){
							C_setValue=eval(C_setValue);
							for(var j=0,jj=C_setValue.length;j<jj;j++){
								var xset=C_setValue[j];
								if(String(xset[0])==String(siteEXP)){
									C_enable=xset[1];
									var C_a_iframepre=xset[2];
									//alert(C_a_iframepre);
									var C_yd_iframepre=xset[3];
									//alert(C_yd_iframepre);
									var C_a_enable=xset[4];
									//alert(C_a_enable);
									prefs.dnextI=xset[5];
									C_yd_F_enable=xset[6];
									//alert(C_yd_F_enable);
									getcf=true;
									break;
								};
							};
						};
					};
					yd_iframepre=SII.useiframe;
					if(yd_iframepre===undefined)yd_iframepre=SITEINFO_D.useiframe;
					if(getcf){yd_iframepre=C_yd_iframepre};
					if(SII.pageElement){
						//alert('Oautopager的规则.');
						if(!SII.autopager)SII.autopager={};
						SII.autopager.pageElement=SII.pageElement;
						if(SII.insertBefore)SII.autopager.HT_insert=[SII.insertBefore,1];
					};
					if(SII.autopager instanceof Object){
						a_enable=SII.autopager.enable;
						if(a_enable===undefined)a_enable=SITEINFO_D.autopager.enable;
						if(getcf){a_enable=C_a_enable};
						a_iframepre=SII.autopager.useiframe;
						if(a_iframepre===undefined)a_iframepre=SITEINFO_D.autopager.useiframe;
						if(getcf){a_iframepre=C_a_iframepre};
						a_pageElement=SII.autopager.pageElement;
						a_remain=SII.autopager.remain;
						if(a_remain===undefined)a_remain=SITEINFO_D.autopager.remain;
						a_maxpage=SII.autopager.maxpage;
						if(a_maxpage===undefined)a_maxpage=SITEINFO_D.autopager.maxpage;
						a_separator=SII.autopager.separator;
						if(a_separator===undefined)a_separator=SITEINFO_D.autopager.separator;
						a_replaceE=SII.autopager.replaceE;
						if(SII.autopager.HT_insert instanceof Array){
							a_Iposition=SII.autopager.HT_insert[0];
							a_IMethod=SII.autopager.HT_insert[1];
						};
						a_linkx=getlinkm;
						a_Fnextlink=nextlink;
					};
				}else{
					if(prefs.debug){
						debugF('link',getlinkm);
					};
					//不能用return...否则会给菜鸟们添加很多麻烦..
					//return;
				};
				break;
			};
		};

		//第二阶段..分析统配规则..
		var TPgetlinkT;
		if(!nextlink){
			for(var i=0,ii=TPrules.length;i<ii;i++){
				if(TPrules[i][1] && (toRegExp(TPrules[i][2])).test(URL)){
					var TPgetlink=TPrules[i][3];
					nextlink= GetNextLink(TPgetlink);
					//alert(nextlink);
					if(nextlink)TPgetlinkT=TPgetlink;
					break;
				};
			}
		};

		//第三阶段.核对关键字..
		var KWgetlinkT;
		var alllinks,alllinksl;
		if(!nextlink && prefs.keymatch){
			var domain=location.hostname;
			alllinks=document.links;
			alllinksl=alllinks.length;
			//alert('全部锚数量: '+ alllinksl);
			find:
			for(var i=0,ii=alllinksl;i<ii;i++){
				if(i>prefs.maxlink){break;};
				var tempa=alllinks[i];
				var linktext=tempa.textContent || tempa.title;
				if(!linktext){continue;};
				linktext=(!prefs.cases)? linktext.toLowerCase() : linktext;
				for(var j=0,jj=nextPageKey.length;j<jj;j++){
					var keytext=(!prefs.cases)? nextPageKey[j].toLowerCase() : nextPageKey[j];
					var indexof=linktext.indexOf(keytext);
					if(indexof>=0 && indexof<=prefs.prefix && (indexof+keytext.length+prefs.subfix)>=linktext.length){
						var tempahref=tempa.href;
						//alert(tempahref);
						//alert(domain);
						if(tempahref.search(/^https?/i)==0 && tempahref.match(/^https?:\/\/[^\/]*/i)[0].indexOf(domain)!=-1){
							if(!/^#/i.test(tempahref.replace(URL,''))){
							//if(tempahref.replace(/https?:\/\//i,'').match(/[^\/]+\//ig).length==URL.replace(/https?:\/\//,'').match(/[^\/]+\//ig).length){
								//alert(linktext);
								//alert(keytext);
								nextlink=tempa;
								var Atext=nextlink.textContent || nextlink.title;
								KWgetlinkT='//a[text()="'+Atext+'" or @title="'+Atext+'"]';
								break find;
							//};
							};
						};
					};
				};
			};
		};

		//alert(nextlink);
		//alert(new Date()-time1+'毫秒');//高级规则模式:耗时 20毫秒..
		if(nextlink){

			if(!siteEXP){
				if(prefs.floatWindow){
					yd_iframepre=prefs.GIP? true:false;
					yd_F_enable=prefs.GPJ? true:false;
					C_setValue=getCookie('N_pre_NC');
					if(C_setValue){
						C_setValue=eval(C_setValue);
						//alert(C_setValue);
						C_enable=C_setValue[0];
						yd_iframepre=C_setValue[1];
						prefs.dnextI=C_setValue[2];
						C_yd_F_enable=C_setValue[3];
						getcf=true;
					};
				};
				if(!yd_iframepre){
					//alert(yd_iframepre);
					for(var i=0,ii=UseIframe.length;i<ii;i++){
						if(UseIframe[i][1] && (toRegExp(UseIframe[i][2])).test(URL)){
							yd_iframepre=true;
							break;
						};
					};
				};
			};

			if(prefs.GDAuto)a_enable=undefined;
			//alert(a_iframepre);
			var F_iframepre=siteEXP? (a_enable? a_iframepre :yd_iframepre) : yd_iframepre;

			if(prefs.floatWindow){
				if(getcf)yd_F_enable=C_yd_F_enable;
				if(yd_F_enable && (!siteEXP || (siteEXP && a_enable))){
					a_linkx=a_linkx || TPgetlinkT || KWgetlinkT;
					//alert(a_linkx);
					a_pageElement='//body[1]/child::*';
					a_iframepre=F_iframepre;
					a_remain=SITEINFO_F_D.remain;
					a_maxpage=SITEINFO_F_D.maxpage;
					a_separator=SITEINFO_F_D.separator;
					a_Fnextlink=nextlink;
					a_replaceE=a_Iposition=a_IMethod=null;
				};
			};

			F_fy=siteEXP? a_enable : yd_F_enable;
			if(prefs.GDAuto)F_fy=false;
			if(F_fy){
				if(getRemain()<=0)a_autoPF=true;
				window.addEventListener('scroll',autoPG,false);
				if(prefs.SSTOP){
					document.addEventListener('dblclick',function(e){
						if(e.shiftKey){
							SSTOP=true;
						};
					},false);
				};
			};

			(prefs.FW_autoD || window.chrome)? floatWinodw(C_enable) : (unsafeWindow || window).N_pre_DFW=function (){floatWinodw(C_enable)};

			if(!C_enable)return;

			var ahref=nextlink.href || nextlink;
			//alert('下页链接 ' + ahref);

			if(prefs.linkalert && !F_fy && typeof nextlink!='string'){
				if(prefs.allalert){
					alllinks=alllinks || document.links;
					alllinksl=alllinksl || document.links.length;
					for(var i=0,ii=alllinksl;i<ii;i++){
						var hla=alllinks[i];
						if(hla.href==ahref){
							hla.style.outline=prefs.alertstyle.join(' ');
							hla.title+=F_iframepre? ' 此页面所有内容,使用Iframe预读...' : ' 此页面所有图片,使用XHR预读...';
						};
					};
				}else{
					nextlink.style.outline=prefs.alertstyle.join(' ');
					nextlink.title+=F_iframepre? ' 此页面所有内容,使用Iframe预读...' : ' 此页面所有图片,使用XHR预读...';
				};
			};

			if(!window.chrome){
				TwindowV('N_PreNextLink',ahref);
			};

			F_iframepre? iframeRequest(ahref) : xhttpRequest(ahref);
		};
	};

	findlink();
};

//因为chrome有时不会触发 load 事件.所以只能这么做..
if(window.chrome){
	N_SuperPre();
}else{
	if(!N_pre_LD.loaded){
		if(window.opera){
			document.addEventListener('DOMContentLoaded',N_SuperPre,false);
		}else{
			N_SuperPre();
		};
	}else{
		window.addEventListener('load',N_SuperPre,false);
	};
};