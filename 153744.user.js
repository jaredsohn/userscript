// ==UserScript==
// @name                专用链破解 Special Links Converter Ex
// @namespace           Special Links Converter Ex
// @description         可以把迅雷、旋风、快车的专用下载链接破解为真实地址(Xunlei Thunder QQDownload FlashGet qqdl)
// @include             *
// @version             1.0
// ==/UserScript==

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
document.addEventListener('mouseup', function(e){
	var selection = window.getSelection().toString(), r = /(?:thunder|flashget|qqdl|fs2you):\/\/([^'"\s]*)/i;
	if (e.button == 0 && r.test(selection)){
		var linkCode = atob(selection.match(r)[1].replace(/&.*|\/$/g, '')).replace(/^AA|ZZ$|\[FLASHGET\]|\|\d+$/g, '');
		!/^http|^ftp/i.test(linkCode) && (linkCode = 'http://' + linkCode);
		e.target.innerHTML = e.target.innerHTML.replace(/amp;/g, '').replace(selection.match(r)[0], linkCode.link(linkCode));
	}
}, false);

// 破解纳米盘下载链接
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
};

// 破解rayfile下载链接
if(/\.rayfile\.com\/.*\/files\//i.test(location.href)){
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
if(/www\.brsbox\.com\/filebox\/down\/fc/i.test(location.href)){
	location.href='javascript:Tout();void(0);';
	var a = xpath('//*[@id="down_area_0"]/a[2]'), d = xpath('//*[@id="truedownid"]');
	a.snapshotLength>0 && (a.snapshotItem(0).style.cssText = 'outline:3px dotted #f00;');
	d.snapshotLength>0 && (d.snapshotItem(0).title = 'by专用链破解 Special Links Converter');
};

// 去除论坛附件下载等待时间
// linkSelect = xpath('//a[contains(text(),"3")]');
if(/forum\.php\?mod=misc&action=attachcredit/i.test(location.href)){
	linkSelect = xpath('//a[contains(.,"秒后下载仍未开始") or contains(.,"秒后下载仍未开始")]');
	if(linkSelect.snapshotLength > 0){
		window.clearTimeout(2);
		location.href = linkSelect.snapshotItem(0).href;
	}
};
})();