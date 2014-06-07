// ==UserScript==
// @name           Google+ Lite(baidu bing)
// @namespace      http://userscripts.org/users/86496
// @description    Show results from Baidu, Bing and Youdao in Google web search. | 在Google网页搜索显示百度、有道和必应的搜索结果。
// @include        http://www.google.tld/search?*
// @version        1.0.4
// ==/UserScript==

(function() {

//  ===Config===

	// Show external results only on the first page? 0-no, 1-yes| 设置是否只在第一页显示？0-否，1-是
var onlyPageOne = 1;

	// How many top results will be obtained | 设置获取头几个搜索结果。
var resultNumber = 3;

var A_xSearch = new Array();

	// Select which engines' results will be obtained from | 设置外部搜索引擎。
	// Rules: A_xSearch[x][0] - the name of the engine | 搜索引擎的名字。
	//		  A_xSearch[x][1] - switch, 1-on, 0-off. | 开关，1－启用，0－禁用。
	//		  A_xSearch[x][2] - the id of the box to contain results | 结果框的 ID。
	//		  A_xSearch[x][3] - the query Url of the engine | 搜索引擎的搜索 Url。
	//		  A_xSearch[x][4] - the xpath to find a result | 搜索结果的 xpath。
	//		  A_xSearch[x][5] - the highlight pattern (selector) | 高亮部分的格式（选择器）。
	//		  x - the sequence. | 序号	

	A_xSearch[0] = new Array('Baidu', 1, "baiduResult", 'http://www.baidu.com/s?wd=--keyword--&ie=utf-8', '//*[@id="--i--"]', 'em');
	A_xSearch[1] = new Array('Bing', 1, "bingResult", 'http://www.bing.com/search?q=--keyword--', '//div[@id="results"]/ul/li[--i--]', 'strong');

//  ===Config===

var _q = document.location.search;
if (onlyPageOne && _q.indexOf('&start=')>=0 && _q.indexOf('&start=0')<0) return;

var _ID = 'resultPlus';
var _xID = '#'+_ID;

var b;
var b_width = (window.innerWidth > 1400)?(504+'px'):(36+'%');
var bstyle = 'position:absolute;top:0;right:18px;background:white;width:' + b_width + ';';
var cstyle = 'border-top:1px solid #7799cc;background:#aaccff';
var glo_style = _xID + ' div[id]+div[id] {border-top: 1px solid #aaccff;}' + _xID + ' p, ' + _xID + ' ul {margin: 0; padding:0;}' + _xID + ' li{list-style:none outside none;}' + _xID + '{line-height: 115%;}' + _xID + ' *{background-image:none!important;position:relative!important;}' + _xID + '>div[id]{max-height: 120px;background:white;overflow:hidden;}' + _xID + '>div[id]:hover{max-height: none;}' + _xID + '>div>*{height: auto!important;}';
var ex_style = '._external {color: black!important;} ._external:after {content:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP///////8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC");}';
var tablestyle = _xID + ' td.f{padding: 5px 0 5px 13px !important;color:#000!important;}' + _xID + ' tr+tr>td.f{padding: 0px 0 8px 13px !important;}' + _xID + ' td.f>a{font-size: 13pt !important;margin-left: -8px;}';
var li_style = _xID + ' div[id]>li {padding: 5px 0 8px 13px !important;}' + _xID + ' li h3>a {font-size: 13pt !important;margin-left: -8px;}' + _xID + ' li>div, ' + _xID + ' li>p {font-size: small;}';

var googlekeyword = document.getElementsByName('q')[0].value;
var googleframe = document.getElementById('res');
	googleframe.style.position = 'relative';
var googlestyle = '#res>h2+div,#res>div.e,div#navcnt,div.clr{width: 60% !important;max-width: 840px !important;}#res{max-width:1400px!important;}';
	
var A_xSearch_l = A_xSearch.length;
var A_hili_s = new Array();
var A_xS_box = new Array();

	for (var a=0;a<A_xSearch_l;a++) {
		A_xS_box[a] = new Array();
		A_xSearch[a][3] = A_xSearch[a][3].replace('--keyword--', googlekeyword);
		A_hili_s[a] = _xID + ' ' + A_xSearch[a][5];
	}

var hili_style = A_hili_s.join(',') + '{color: #CC0033 !important;}';

// Insert CSS
var headID = document.getElementsByTagName("head")[0];         
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML = glo_style + ex_style + tablestyle + li_style + hili_style + googlestyle;
headID.appendChild(cssNode);

var gooLink = googleframe.getElementsByTagName('a'), gooResultLink = new Array();
for (gl_ind in gooLink) {
	if (gooLink[gl_ind].className == 'l') gooResultLink.push(gooLink[gl_ind]);
}

resultbox(googleframe, A_xSearch_l);

for (var l=0;l<A_xSearch_l;l++) {
	if (!A_xSearch[l][1])continue;
	addresult(A_xSearch[l], A_xS_box[l]);
}

function addresult(A_x, A_elem) {
	var timeout = function(){for (i=0;i<resultNumber;i++) {setcontent(A_elem[i], (i==0)?'-Timeout!-':'');}};
	var errortimer = setTimeout(timeout, 10000);

	var option = {
	method: "GET",
	url: A_x[3],
	onload: function(_h){
		clearTimeout(errortimer);
		var _Node = document.createElement('div');
		_Node.innerHTML = _h.responseText;
		initresult(A_x[4], _Node, A_elem);
		}
	}
	GM_xmlhttpRequest(option);
}

function initresult(_xpath, _Node, A_elem) {
	var _result = [];
	for (i=0;i<resultNumber;i++) {_result[i] = (i==0)?'-No-Result-':'';}
	
	for (i=0;i<resultNumber;i++) {
		i_xpath = _xpath.replace('--i--', (i+1));
		var _h_re = document.evaluate(i_xpath,_Node,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		
		if (_h_re == null) {break;}
		else {_result[i] = getoutterHTML(_h_re);}
		
		// check link
		var _resLink = _h_re.getElementsByTagName('a');
		for (p in gooResultLink) {
			if (gooResultLink[p].href == _resLink[0].href) {
				A_elem[i].style.backgroundColor = '#eee';
				A_elem[i].title = 'Google Result #' + (Number(p)+1);
			}
		}

	}
	for (i=0;i<resultNumber;i++) {setcontent(A_elem[i], _result[i]);}
}

function resultbox(dest, _l) {
	b = document.createElement('div');
	b.setAttribute("id", _ID);
	b.setAttribute("style", bstyle);
	dest.appendChild(b);
	
	for (var j=0;j<_l;j++) {
		if (!A_xSearch[j][1])continue;
		c = document.createElement('div');
		d = document.createElement('a');
		addtext(d, A_xSearch[j][0]);
		d.setAttribute("href", A_xSearch[j][3]);
		d.setAttribute("class", '_external');
		c.setAttribute("style", cstyle);
		c.appendChild(d);
		b.appendChild(c);
		for (var k=0;k<resultNumber;k++) {
			A_xS_box[j][k] = document.createElement('div');
			A_xS_box[j][k].setAttribute("id", A_xSearch[j][2] + (k+1));
			A_xS_box[j][k].innerHTML = 'Loading...';
			b.appendChild(A_xS_box[j][k]);
		}
	}
}

function setcontent(elem, htmlNode) {
	elem.innerHTML = htmlNode;
}

function getoutterHTML(elem) { 
    var a=elem.attributes, str="<"+elem.tagName, i=0;for(;i<a.length;i++) 
    if(a[i].specified) 
        str+=" "+a[i].name+'="'+a[i].value+'"'; 
    if(!canHaveChildren(elem)) 
        return str+" />"; 
    return str+">"+elem.innerHTML+"</"+elem.tagName+">"; 
}

function canHaveChildren(elem) { 
    return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/.test(elem.tagName.toLowerCase()); 
} 

function addtext(obj, text) {
    var content = document.createTextNode(text);
    obj.appendChild(content);
}

})();