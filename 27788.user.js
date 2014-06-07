
// YS168 net storage hacking user script
// version 0.9final
// 2008-5-5
// Copyright (c) 2008, Second Stranger
// Released under the GPL license version 3
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "yshack", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          yshack
// @namespace     ex@palx.org
// @description   hacking ys168 for operating in browsers other than IE
// @include       http://*.ys168.com/*
// @exclude       http://www.ys168.com/*
// ==/UserScript==

if (!GM_xmlhttpRequest) {
    alert('require latest Greasemonkey.');
    return;
}

//main frame
var baseURL=location.href.match(/[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*/g).toString();
var IE6uagent='Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)';

//common functions
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function last_child(node){
	var nn=node.lastChild;
	  while(nn && nn.nodeType!=1)
		nn=nn.previousSibling;
	  return nn;
}
function create_script(value){
	var script_tag=document.createElement('script');
	script_tag.setAttribute('Language','JavaScript');
	script_tag.innerHTML = value;
	document.getElementsByTagName('body')[0].appendChild(script_tag);
}
function xmlhttpget(path,prev_func,post_func){
	GM_xmlhttpRequest({
	method: 'GET',
	url: baseURL+path,
	headers: {
	'User-agent': IE6uagent,
	'Accept': 'text/JavaScript, text/html, application/xml, text/xml, */*',
	},
	overrideMimeType : "text/html; charset=gb2312",
	onload: function(responseDetails) {
		var baseHTML = prev_func(responseDetails.responseText);
		document.documentElement.innerHTML='';
		
		var HTML_tag=document.getElementsByTagName('html')[0];
		var HEAD_tag=document.createElement('head');
		var BODY_tag=document.createElement('body');
		HEAD_tag.innerHTML=baseHTML.match(/<head[^>]*>([\s\S]*)<\/head>/gim)[0].replace(/<head[^>]*>([\s\S]*)<\/head>/gim,'$1');
		BODY_tag.innerHTML=baseHTML.match(/<body[^>]*>([\s\S]*)<\/body>/gim)[0].replace(/<body[^>]*>([\s\S]*)<\/body>/gim,'$1');
		HTML_tag.appendChild(HEAD_tag);
		HTML_tag.appendChild(BODY_tag);
		document.title=document.getElementsByTagName('title')[0].innerHTML;
		if(post_func)
			post_func();
	}
	});
}

switch(location.pathname){
	case '/'://主页面，似乎有少许机会被捕捉到
		//发现好多辅页面都是/的……
		if(location.search)
			break;
	case '/infile/errcl.htm'://发现不是IE的出错页面，改造为主页面
		//clear the error report
		document.documentElement.innerHTML = '';
		GM_xmlhttpRequest({
			method: 'GET',
			url: baseURL,
			headers: {
			'User-agent': IE6uagent ,
			'Accept': 'text/html,application/xhtml+xml,text/xml,application/xml',
			},
			overrideMimeType : "text/html; charset=gb2312",
			onload: function(responseDetails) {
				var baseHTML = responseDetails.responseText;
				//all the adjustments that should be performed in the source
				//rebase all the relative paths to /
				baseHTML = baseHTML.replace(/("|')(\w*?\.(?=aspx|htm))/gim,'$1/$2')
				                   .replace(/upfile/gim,'/upfile')
				                   //getElementById to name? so great, IE
				                   .replace(/<IFRAME name="frazx"/gim,'<IFRAME name="frazx" id="frazx"')
				                   .replace(/<IFRAME id="frafileup_1"/gim,'<IFRAME id="frafileup_1" id="frafileup_1"')
				                   .replace(/<LABEL id="zxrsts(\d*)"/gim,'<LABEL id="zxrsts$1"')
				                   //gecko 1.8 not accept those IE syntax
						   .replace(/href="javascript:"/gim,'href=""')
						   .replace(/window\.event\.keyCode/gim,'event.which');
				
				//JS & etc
				var jspath=baseHTML.match(/[\w\/]*\.js/gim);
				GM_xmlhttpRequest({
					method: 'GET',
					url: baseURL+jspath,
					headers: {
					'User-agent': IE6uagent,
					'Accept': 'text/JavaScript, text/html, application/xml, text/xml, */*',
					},
					//overrideMimeType : "text/html; charset=gb2312",
					onload: function(responseDetails) {
						var includedScript = responseDetails.responseText;
						//XMLDOM replacement
						includedScript = includedScript.replace(
							/var source = new ActiveXObject\("Microsoft\.XMLDOM"\);source\.async=true;source\.onreadystatechange = sjjkcx2;/gim,
							'var source=document.implementation.createDocument("","",null);'
							+'var xmlhttp=new XMLHttpRequest();\n'
							+'xmlhttp.onload = function (){\n'
							+'                   var dp = new DOMParser();\n'
							+'                   var xmltext=xmlhttp.responseText.replace(/[\\r\\n]*<\\?xml/gim,"<?xml");\n'
							+'                   xmltext=xmltext.replace(/ \\?>/gim,"?>");\n'
							+'                   window.source = dp.parseFromString(xmltext,"text/xml");\n'
							+'                   window.source.async=true;\n'
							+'                   window.source.readyState=4;\n'
							+'                   sjjkcx2();\n'
							+'};\n'
						).replace(
							/try\{source\.load\(sURL\);\}/gim,
							'try{\n'
							+'xmlhttp.open("GET",sURL,true);\n'
							+'xmlhttp.send(null);\n'
							+'}'
						).replace(
							/jk(\d)=source\.documentElement\.childNodes\.item\((\d)\)\.text;/gim,
							'jk$1=source.documentElement.childNodes.item($2*2+1).textContent;'
						).replace(//form detection replace
							/document\.forms\[0\]/gim,
							'document.getElementsByTagName(\'form\')[0]'
						).replace(
							/fralyb\./gim,
							'fralyb2.'
						).replace(//lastChild different between trident/gecko DOM
							/([\w\.\[\]]*)\.lastChild/gim,
							'last_child($1)'
						).replace(//hack, ugly hack
							/S\(semlxz\.value\)last_child\(\.parentNode\)/gim,
							'last_child(S(semlxz.value).parentNode)'
						).replace(
							/(function\svreplace)/gim,
							last_child.toString()+'\n$1'
						).replace(
							/(dobj = last_child)/gim,
							'try{$1'
						).replace(
							/break;\}\}\}/gim,
							'break;}}}catch(ex){}finally{};}'
						).replace(//2 try
							/(\t*)(dobj = objml\.childNodes\[j\];)/gim,
							'$1try{$2'
						).replace(//1 catch
							/(innerHTML;\t\}\r\n\t\t\t\})/gim,
							'$1}catch(ex){}'
						).replace(//2 catch
							/\r\n\t\t\t\}\r\n\t\t\}\r\n\t\}/gim,
							'\r\n\t\t\t}\r\n\t\t}}catch(ex){}\r\n\t}'
						).replace(/zdqdq\(\)/gim,'modified_zdqdq()')//zdqdq modification #1
						.replace(/dobj=frxcx\.document\.forms\[0\]\.Yz0/gim,'dobj=frxcx.document.forms[0].Yz1')
						.replace(/'javascript:'/gim,'\'\'')
						//.replace(/"<u>"\+Qdhrs\+"<\/u>"/gim,'"<u>"+Qdhrs.replace(/(\\d*)/gim,"\\$1")+"</u>"')
						//upload
						.replace(/F0\.document/gim,'F0.contentDocument')
						.replace(/"\.document/gim,'".contentDocument')
						.replace(/\.upF/gim,'.contentWindow.modified_upF')
						.replace(/sa_/gim,'Sa_')
						.replace(/eval\("frazx\./gim,'frazx.document.getElementById("')
						.replace(/(last_child\(dfml\))/gim,'$1==null || $1')
						.replace(/Snr=vreplace\(Snr,"<BR>","\\n"\);/gim,'Snr=vreplace(Snr,"<br>","");')
						.replace(/"upfile/gim,'"/upfile')
						.replace(/width='100%'/gim,'width=\'93%\'');
						//尚有创建文件夹失败，貌似只要提交xzml就直接驱逐下线，连隐藏文件夹都不许读了。
						//更新:只要后台启动允许匿名创建即可。没弄清怎么处理的，可能是服务器端有记录？
						
						//flatten
						baseHTML = baseHTML.replace(/<script language="JavaScript" src="([\w\/.]*)"><\/script>/gim,'<script language="JavaScript">'+includedScript+'</script>');
						//skip
						baseHTML = baseHTML.replace(/<\/{0,1}html>/gim,'')
							           .replace(/\bheight:\s*(\d+)[^\d%]/gim,'min-height:$1');
							           
						var HTML_tag=document.getElementsByTagName('html')[0];
						var HEAD_tag=document.createElement('head');
						var BODY_tag=document.createElement('body');
						HEAD_tag.innerHTML=baseHTML.match(/<head>([\s\S]*)<\/head>/gim)[0].replace(/<head>([\s\S]*)<\/head>/gim,'$1')+baseHTML.match(/<script[\s\w"\(\);=]*>([\s\S]*)<\/script>/gim);
						BODY_tag.innerHTML=baseHTML.match(/<body[^>]*>([\s\S]*)<\/body>/gim)[0].replace(/<body[^>]*>([\s\S]*)<\/body>/gim,'$1');
						BODY_tag.style.overflow='hidden';
						HTML_tag.appendChild(HEAD_tag);
						HTML_tag.appendChild(BODY_tag);
						create_script(xpath.toString()
						              +'var semlxz=xpath("//select[@name=\'semlxz\']").snapshotItem(0);'
						              +'var kjz2=xpath(\'//label[@id="kjz2"]\').snapshotItem(0);'
						);
						document.title=document.getElementsByTagName('title')[0].innerHTML;
						window.addEventListener('unload',function(){
								//emulate fexit();
								location='/exit.aspx?dlmc='+unsafeWindow.ddlmc+"&fs=1";
							},false);
						GM_addStyle('.wjlxxz {width:87%;}\n'
						           +'div.ysm0 a {display:table;height:auto;}\n'
						           +'div.ysm1 a {display:table;height:auto;}\n'
						           +'div.ysm0 {margin-left:2;}\n'
						           +'div.ysm1 {margin-left:1;margin-right:1;}\n'
						           +'div.ystop a:hover,div.ysm0 a:hover,div.ysm1 a:hover{color: red;}\n'
						           +'#ysmenu1 {min-height:122px;height:auto;\n}'
						);
						document.getElementById('frafileup_1').width='93%';
					}
				});
			}
		});
		break;
	case '/body.htm'://文档区
		unsafeWindow.onload=null;
		window.reserved_text=unsafeWindow.zdqdq.toString()+unsafeWindow.Fcr.toString()+unsafeWindow.mid.toString()+unsafeWindow.tp_cc.toString();
		xmlhttpget(location.pathname+location.search,
			function(HTML){
				var minimize='&#x25b1;'
				var maximize='&#x25a1;'
				HTML = HTML
					.replace(/'javascript:'/gim,'\'\'')
					.replace(/document\.createStyleSheet\("\/infile\/st_1\.aspx\?"\+sar\[0\]\);/gim,'')
					.replace(/parent\.JL_mlsj/gim,'parent.JL_mlsj.replace(/href=\'javascript:\'/gim,"href=\'\'")'
					                                           +'.replace(/height:([\\s\\d]*)/gim,"min-height:\$1")')
					.replace(/zdqdq\(\)/gim,'modified_zdqdq()')//zdqdq modification #2
					.replace(/(<\/script>)/gi,window.reserved_text
						.replace(/zdqdq\(\) \{/gim,'modified_zdqdq(){')//zdqdq modification #3
						.replace(/([\w\.\[\]]*)\.lastChild/gim,'last_child($1)')
						.replace(/if \(last_child\(dfml\)/gim,'if (last_child(dfml) && last_child(dfml)')
						.replace(/var y = last_child\(dfml\)\.childNodes\.length;/gim,'var y = last_child(dfml);')
						.replace(/if \(y == 0\) \{/gim,'if(y==null || y.childNodes==null || y.childNodes.length==0){')
							//modify Fcr
						.replace(/Fcr/gim,'modified_Fcr')//fake webdings...
						.replace(/2<\/label>/gim,maximize+'</label>')
							//modify mid
						.replace(/mid/gim,'modified_mid')
						.replace(/= "1"/gim,'="'+minimize+'"')
						.replace(/= "2"/gim,'="'+maximize+'"')
							//modify tp_cc
						.replace(/tp_cc/gim,'modified_tp_cc')
						.replace(/Yimg\.attachEvent\("onreadystatechange", dqq\);/gim,'Yimg.addEventListener("readystatechange",dqq,false);')
					        +last_child.toString()+'$1');
				return HTML;
			},
			function(){
				var head_tag=document.getElementsByTagName('head')[0];
					var link=document.createElement('link');
					link.setAttribute('rel','stylesheet');
					link.setAttribute('href',"/infile/st_1.aspx?5");
					link.setAttribute('type','text/css');
				head_tag.appendChild(link);
				document.getElementsByTagName('body')[0].style.backgroundColor='#fff';
				GM_addStyle('ul{margin:0;padding:0;}\n'//链接栏
				           +'.z_bt{min-height:20px;height:auto}\n'
				           +'.z_bo{min-height:15px;height:auto}\n'
				);
				//编辑图标
				setTimeout(function(){
					var imgs=xpath('//img');
					for(var i=0;i<imgs.snapshotLength;i++)
						imgs.snapshotItem(i).style.cursor='pointer';
					var uls=xpath('//ul[@class="menu"]');
					for(var i=0;i<uls.snapshotLength;i++){
						uls.snapshotItem(i).style.minHeight=uls.snapshotItem(i).style.height;
						uls.snapshotItem(i).style.height='auto';
					}
					setTimeout(arguments.callee,500);
					},500);
				unsafeWindow.init();
			}
		);
		break;
	case '/lyb.aspx'://留言板
		//编辑图标
		GM_addStyle('div.cslyb p {line-height:158%;}');
		var imgs=xpath('//img');
		for(var i=0;i<imgs.snapshotLength;i++)
			imgs.snapshotItem(i).style.cursor='pointer';
		setTimeout(function(){
			var editors=xpath('//a[@class="yybj"]');
			for(var i=0;i<editors.snapshotLength;i++)
				editors.snapshotItem(i).setAttribute('href','');
			setTimeout(arguments.callee,500);
			},500);
		break;
	case '/upfile/up.htm'://上传页
		create_script(unsafeWindow.upF.toString()
			.replace(/upF\(\)/gim,'modified_upF()')
			.replace(/ShowProgress/gim,'modified_showprogress')
			+unsafeWindow.ShowProgress.toString()
			.replace(/ShowProgress/gim,'modified_showprogress')
			.replace(/window\.showModelessDialog\("([\w.]*)", window, "dialogWidth:(\w*); dialogHeight:(\w*);center:yes;status:no;scroll:auto"\);/gim,
				 'window.open("/upfile/$1", "_blank", "width=$2,height=$3,status=no");')
		);
		document.getElementsByName('FILE1')[0].style.height='auto';
		break;
	case '/upfile/upfile_fr.htm'://上传进度页
		xmlhttpget(location.pathname,function(text){
			text = text.replace(/window\.dialogArguments/gim,'window.opener')
			           .replace(/<IFRAME name=jdzt/gim,'<iframe name="jdzt" id="jdzt"')
			           .replace(/onload =function\(\)\{/,'function display(){')
			           .replace(/\b4\b/gim,'&#x25b6;')
			           .replace(/ffts\./,'document.getElementById("ffts").')
			           .replace(/dbd\./,'document.getElementsByTagName("body")[0].');
			script = text.match(/<script[^>]*>([\s\S]*)<\/script>/gim);
			text = text.replace(/(<\/head>)/gim,script+'$1');
			return text;
			},
			function(){
				document.title=unsafeWindow.tszf+unsafeWindow.opener.Qc2+" ……                                ";
				unsafeWindow.display();
			}
		);
		break;
	case '/netup/u_bar3.asp'://服务器进度条……orz。
		create_script('if(xpath(\'//td[@bgcolor="#000080"]\').snapshotLength==0) parent.window.close();\n'
			+xpath.toString());
		break;
	case '/upfile/tz.htm'://上传溢出……
		break;
	case '/Ccenter.aspx'://参数传递辅助
		break;
	case '/kh_zxlb.aspx'://在线列表
		break;
	case '/khxzjl.aspx'://下载记录
		break;
	case '/upfile/mlmmpd.htm'://目录认证
		break;
	case '/infile/show_sp.aspx'://在线播放
		document.getElementsByTagName('embed')[0].scale='tofit';
		break;
	case '/infile/show_tp.htm'://在线查看
		break;
	case '/kh_gg.aspx'://启动弹出
		break;
	case '/exit.aspx'://退出页面
		break;
	default:
		//debug release
		if(baseURL!='http://www.ys168.com')
			alert(location.pathname);
};
