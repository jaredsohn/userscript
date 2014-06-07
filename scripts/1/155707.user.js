// ==UserScript==
// @name                专用链破解
// @namespace           Special Links Converter
// @description         可以把迅雷、旋风、快车的专用下载链接破解为真实地址
// @name  s896221565
// @name      s896221565
// @auther		http://896221565.qzone.qq.com
// @version	 0.0.1
// @description   s896221565
// @Modified from  http://userscripts.org/users/sunbaokang
// @include        *
// ==/UserScript==
// ==/UserScript==

//预告：
//添加自助破解框，可自行破解任何被加密的字符
//多行划词破解
//discuz 7论坛的批量下载工具



// var t1 = new Date();
unsafeWindow.__\u0064one__=window.__\u0064one__=!GM_getValue('_donate', false);
typeof(Updater)!='undefined' && new Updater({name:'专用链破解',id:'66985',version:'4.0'}).check();


(function(){

	function xpath(query, context){
		return document.evaluate(context?(query.indexOf('.')==0?query:'.' + query):query, context || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
	function $(q){
		return document.querySelector(q);
	};
	
	// 万能显式连接破解 
	var linkSelect = xpath('//a[@thunderhref or starts-with(@href,"thunder") or contains(@onclick,"thunder:") or @qhref or starts-with(@href,"qqdl")\
		or contains(@onclick,"flashget:") or contains(@onclick,"Flashget") or starts-with(@onclick,"convertFgURL") or starts-with(@href,"flashget") or starts-with(@href,"Flashget")]');
	for (var i=0,j=linkSelect.snapshotLength; i<j; i++){
		linkSelect.snapshotItem(i).addEventListener('mouseover', function(){
			var linkCode = /#|;/.test(this.href) // 是否空href
				? (this.getAttribute('thunderhref') || this.getAttribute('qhref') || this.getAttribute('onclick').match(/(?:thunder|flashget|http):[^'"]+/i)[0])
				: this.href;
			this.href = /http:|ftp:/i.test(linkCode)
				? linkCode
				: atob(linkCode.replace(/(?:thunder|flashget|qqdl):\/\/|&.*|\/$/ig, '')).replace(/^AA|ZZ$|\[FLASHGET\]/g, '');
			/^thunder|^flashget|^qqdl/i.test(this.innerHTML) && (this.innerHTML = this.href); // 更换链接文本为URL
			/(?:迅雷|旋风|快车)*/.test(this.title) && (this.title = '专用链接破解成功：'+this.href); // 更换链接title
			this.innerHTML = this.innerHTML.replace(/迅雷|旋风|快车/, '直接').replace(/专用|用户/g, ''); // 更换专用链接文本
			this.removeAttribute('onclick');
			this.removeAttribute('oncontextmenu');
			this.style.outline = '3px dotted #f00';
		}, false);
	};

	// 隐式快车链接，如：skycn
	linkSelect = xpath('//a[starts-with(@onclick,"convertFgURL")]');
	for (var i=0,j=linkSelect.snapshotLength; i<j; i++){
		linkSelect.snapshotItem(i).addEventListener('mouseover', function(){
			this.href = xpath('//script[contains(.,"var fUrl")]').snapshotItem(0).innerHTML.match(/var fUrl[=\s]+['"]([^'"]+)/i)[1];
			this.innerHTML = this.innerHTML.replace(/快车|flashget/i, '直接').replace(/专用|用户/g, '');
			this.removeAttribute('onclick');
			this.removeAttribute('oncontextmenu');
			(this.title == '') && (this.title = '专用链接破解成功：'+this.href);
			this.style.outline = '3px dotted #f00';
		}, false);
	};

	// 隐式迅雷弹出链接，如：piaodown
	linkSelect = xpath('//script[starts-with(.,"OnDownloadClick")]');
	if(!document.title && linkSelect.snapshotLength > 0){
		var linkCode = atob(linkSelect.snapshotItem(0).innerHTML.match(/thunder:\/\/([^'"]+)/i)[1]).replace(/^AA|ZZ$/g, '');
		document.body.innerHTML = '<a href="'+ linkCode +'" title="by专用链破解 Special Links Converter">专用链接破解成功：'+linkCode +'</a>';
		window.clearInterval(2);
		top.location.href = linkCode;
	};
	
	// 隐式迅雷链接, gougou
	if(/down\.gougou\.com\/down\?/i.test(location.href)){
		// location.href='javascript:$("#bt_down").attr("href",g_downUrl);void(0);';
		eval(String(xpath('//script[contains(.,"g_downUrl")]').snapshotItem(0).innerHTML.match(/var\s*g_downUrl\s*=.*/)));
		var link = document.getElementById('bt_down');
		link.href = /thunder:/i.test(g_downUrl)?atob(g_downUrl.replace('thunder://', '')).replace(/^AA|ZZ$/g, ''):g_downUrl;
		link.title = '点击直接下载  by专用链破解 Special Links Converter';
		link.style.outline = '3px dotted #f00';
		link.removeAttribute('onclick');
		link.removeAttribute('onmouseover');
		link.removeAttribute('oncontextmenu');
	};

	// 划词破解
	GM_getValue('_selecLink',true) && document.addEventListener('mouseup', function(e){
		var selection = window.getSelection().toString(), r = /(?:thunder|flashget|qqdl|fs2you):\/\/([^'"\s]*)/i;
		if (e.button == 0 && r.test(selection)){
			var linkCode = atob(selection.match(r)[1].replace(/&.*|\/$/g, '')).replace(/^AA|ZZ$|\[FLASHGET\]|\|\d+$/g, '');
			!/^http|^ftp/i.test(linkCode) && (linkCode = 'http://' + linkCode);
			e.target.innerHTML = e.target.innerHTML.replace(/amp;/g, '').replace(selection.match(r)[0], linkCode.link(linkCode));
		}
	}, false);

	// 破解纳米盘下载链接
	if(GM_getValue('_namipan',true)){
		if(/d\.namipan\.com\/downfile\//i.test(location.href)){
			var n = document.getElementById('not_windows');
			n.style.cssText = 'display:block;outline:3px dotted #f00;';
			n.title = 'by专用链破解 Special Links Converter';
		}
		if(/d\.namipan\.com\/d\//i.test(location.href)){
			var l = xpath('//span[@id="win_os"]/a[last()]').snapshotItem(0), a = document.createElement('a');
			a.href = decodeURIComponent(l.href.match(/^javascript:addLink\('(.*)'\)/i)[1]);
			a.innerHTML = '直接下载';
			a.title = 'by专用链破解 Special Links Converter';
			a.style.cssText = 'margin-right:30px;outline:3px dotted #f00;';
			l.parentNode.insertBefore(a, l);
			var o = document.getElementById('other_os');
			o.style.cssText = 'display:block;outline:3px dotted #f00;';
			o.title = 'by专用链破解 Special Links Converter';
		}
	};
	
	// 破解rayfile下载链接
	if(GM_getValue('_rayfile',true) && /\.rayfile\.com\/.*\/files\//i.test(location.href)){
		var d = document.getElementById('downloadlink');
		if(d){
			d.innerHTML = '<a href="" id="_Special" title="直接下载 by专用链破解 Special Links Converter"></a>';
			d.className = 'btn_downNow_zh-cn';
			document.getElementById('txtnotedisable').id = '';
			document.getElementById('txtnotelight').innerHTML = '<span style="color:#f00;">链接破解成功</span>';
			document.getElementById('txtnotelight').id = '';
			location.href = 'javascript:setKey();document.getElementById("_Special").href=downloads_url[0];void(0);';
		}
		xpath('//*[@id="main1"]/ul/dl/dt/a').snapshotItem(0).style.cssText = 'outline:3px dotted #f00;';
	};
	
	// 去除brsbox下载等待时间
	if(GM_getValue('_brsbox',true) && /www\.brsbox\.com\/filebox\/down\/fc/i.test(location.href)){
		location.href='javascript:Tout();void(0);';
		var a = xpath('//*[@id="down_area_0"]/a[2]'), d = xpath('//*[@id="truedownid"]');
		a.snapshotLength>0 && (a.snapshotItem(0).style.cssText = 'outline:3px dotted #f00;');
		d.snapshotLength>0 && (d.snapshotItem(0).title = 'by专用链破解 Special Links Converter');
	};
	
	// 去除论坛附件下载等待时间
	// linkSelect = xpath('//a[contains(text(),"3")]');
	if(GM_getValue('_BBStime',true) && /forum\.php\?mod=misc&action=attachcredit/i.test(location.href)){
		linkSelect = xpath('//a[contains(.,"秒后下载仍未开始") or contains(.,"秒後下載仍未開始")]');
		if(linkSelect.snapshotLength > 0){
			window.clearTimeout(2);
			location.href = linkSelect.snapshotItem(0).href;
		}
	};

	// 设置菜单
	function config(){
		if(!$('#set_Div')){
			GM_addStyle('\
			#set_Div {\
				font-size: 12px;\
				left: 40%;\
				opacity: 1;\
				padding: 10px;\
				position: fixed;\
				top: 30%;\
				width: 280px;\
				background: #000;\
				background: -webkit-gradient(linear,left top,left bottom,from(rgba(66,69,72,.9)),to(rgba(51,55,59,.9)),color-stop(0.9,rgba(26,28,30,.9)));\
				background: -moz-linear-gradient(top,rgba(66,69,72,.9),rgba(26,28,30,.9) 90%,rgba(51,55,59,.9));\
				background: linear-gradient(top,rgba(66,69,72,.9),rgba(26,28,30,.9) 90%,rgba(51,55,59,.9));\
				border: 1px solid rgba(0,0,0,.2);\
				opacity: 1;\
				-webkit-box-shadow: 0 0 1px rgba(255,255,255,.2) inset,0 1px 3px rgba(0,0,0,.8);\
				-moz-box-shadow: 0 0 1px rgba(255,255,255,.2) inset,0 1px 3px rgba(0,0,0,.8);\
				box-shadow: 0 0 1px rgba(255,255,255,.2) inset,0 1px 3px rgba(0,0,0,.8);\
				z-index: 999;\
				color: #EEE;\
				-webkit-border-radius: 5px;\
				-moz-border-radius: 5px;\
				border-radius: 5px;\
				text-align: left;\
			}\
			#set_Div label:hover {\
				cursor: pointer;\
				color: #fff;\
				font-weight: bold;\
			}\
			#set_Div span {\
				text-align: center;\
				display: block;\
			}\
			');
			var setDiv = document.createElement('div');
			setDiv.id = 'set_Div';
			setDiv.innerHTML = '\
				<div>\
					专用链破解 Special Links Converter 首选项\
					<hr>\
					<a title="点击 GreaseMonkey 的图标 > 用户脚本命令 > [首选项]专用链破解" style="bottom:14px;color:#EEE;position:absolute;left:10px;" href=#>[打开方式]</a>\
					<a title="点击进入脚本主页" style="bottom:14px;color:#EEE;position:absolute;right:10px;" href="http://userscripts.org/scripts/show/66985" target="_blank">[HomePage]</a>\
					<label title="是的，您不需要花费一分钱，只需要同意捐献并在卓越当当上购物，即可支持作者，非常感谢您的支持。">\
					<input type="checkbox" id="_donate">开启捐献，通过在卓越当当买书支持作者</label>\
					<hr>\
					<label title="勾选此项可自动去除brsbox下载等待时间"><input type="checkbox" id="_brsbox">去除brsbox下载等待时间</label>\
					<hr>\
					<label title="勾选此项可自动破解纳米盘下载链接"><input type="checkbox" id="_namipan">破解纳米盘下载链接</label>\
					<hr>\
					<label title="勾选此项可自动破解rayfile下载链接"><input type="checkbox" id="_rayfile">破解rayfile下载链接</label>\
					<hr>\
					<label title="该功能为测试版，欢迎反馈无法破解等待时间的论坛"><input type="checkbox" id="_BBStime">去除论坛附件下载等待时间</label>\
					<hr>\
					<label title="在网页选中迅雷旋风等专用链字符即可自动生成链接"><input type="checkbox" id="_selecLink">开启划词破解</label>\
					<hr>\
				</div>\
				<span>\
					<input type="button" title="部分选项需要刷新页面才能生效" id="setDiv_yes" value="√ 确认">\
					<input type="button" title="取消本次设定，所有选项还原" id="setDiv_no" value="X 取消">\
				</span>\
			';
			$('body').appendChild(setDiv);
			
			setRead('_donate',false);
			setRead('_brsbox',true);
			setRead('_namipan',true);
			setRead('_rayfile',true);
			setRead('_BBStime',true);
			setRead('_selecLink',true);
			
			$('#setDiv_yes').addEventListener('click', function(){
				setWrite('_donate');
				setWrite('_brsbox');
				setWrite('_namipan');
				setWrite('_rayfile');
				setWrite('_BBStime');
				setWrite('_selecLink');
				$('#set_Div').parentNode.removeChild($('#set_Div'));
			}, false);
			
			$('#setDiv_no').addEventListener('click', function(){
				$('#set_Div').parentNode.removeChild($('#set_Div'));
			}, false);

		}
	};
	
	function setRead(id,value){$('#'+id).checked = GM_getValue(id, value);};
	function setWrite(id){GM_setValue(id, $('#'+id).checked);};
	GM_registerMenuCommand('[首选项]专用链破解', config);
	
	
})();
	// 自助破解框，开发中...
	// var mouseup = document.createElement('div');
	// mouseup.style.cssText = 'position:fixed;bottom:0;border:2px solid #ccc;z-index:100;padding:5px;width:99%;';
	// document.body.appendChild(mouseup);
	
	// document.addEventListener('click', function(ev){
		// ev = ev || window.event; // 事件    
		// var target = ev.target || ev.srcElement; // 获得事件源
		// alert(target.innerHTML);
	// }, false);

// alert("耗时：" + (new Date() - t1) + " 毫秒");

