// ==UserScript==
// @name           Google+(baidu bing youdao)
// @namespace      http://userscripts.org/users/86496
// @description    Show results from Baidu, Bing and Youdao in Google web search. | 在Google网页搜索显示百度、有道和必应的搜索结果。
// @include        http://www.google.tld/search?*
// @include        https://www.google.tld/search?*
// @include        http*://www.google.*/*&q=* 
// @version        1.3.3
// ==/UserScript==

(function() {

// only shown in normal search page
if (document.location.href.indexOf('&tbs=') != -1 || document.location.href.indexOf('&tbm=') != -1) return; 

//  ===Config START | 设置开始===

	// Show external results only on the first page? 0-no, 1-yes | 设置是否只在第一页显示？0-否，1-是
var onlyPageOne = 1;

	// **The following two lines are not for config, do not modify. | **以下两行并非设置项，请勿修改！
	var _q = document.location.search || document.location.href.substring(document.location.href.indexOf('&')-1);
	if (onlyPageOne && _q.indexOf('&start=')>=0 && _q.indexOf('&start=0')<0) return;

	// Show how many top results | 设置显示头几个搜索结果。
var resultNumber = 3;

var A_xSearch = new Array();

	// Select which engines' results will be obtained from | 设置外部搜索引擎。
    // Structure: A_xSearch[x] = new Array([0],[1],[2],[3],[4],[5]);
	// Rules: A_xSearch[x][0] - the name of the engine | 搜索引擎的名字。
	//		  A_xSearch[x][1] - switch, 1-on, 0-off. | 开关，1－启用，0－禁用。
	//		  A_xSearch[x][2] - the id of the box to contain results | 结果框的 ID。
	//		  A_xSearch[x][3] - the query Url of the engine | 搜索引擎的搜索 Url。
	//		  A_xSearch[x][4] - the xpath to find a result | 搜索结果的 xpath。
	//		  A_xSearch[x][5] - the highlight pattern (selector) | 高亮部分的格式（选择器）。
	//		  x - the displaying order. | 显示顺序号。	

	A_xSearch[0] = new Array('Baidu',	1,	"baiduResult",	'http://www.baidu.com/s?wd=--keyword--&ie=utf-8',	'//*[@id="--i--"]',					'em');
	A_xSearch[1] = new Array('Youdao',	1,	"youdaoResult",	'http://www.youdao.com/search?q=--keyword--',		'//ol[@id="results"]/li[--i--]' ,	'span.hl');
	A_xSearch[2] = new Array('Bing',	1,	"bingResult",	'http://www.bing.com/search?q=--keyword--&mkt=zh-CN',			'//div[@id="results"]/ul/li[--i--]', 'strong');
	A_xSearch[3] = new Array('GoogleCN', 0, "gcnResult",	'http://www.google.com.hk/search?q=--keyword--',	'//div[@id="ires"]/ol/li[--i--]',	'em');
	A_xSearch[4] = new Array('Weibo', 1, "weiboResult",	'http://www.baidu.com/s?tn=baiduwb&rtt=2&cl=3&ie=utf-8&wd=--keyword--',	'//ol[@id="weibo"]/li[--i--]',	'em');

//  ===Config END | 设置结束===

setTimeout(go, 1000);

function go(){
var _ID = 'resultPlus';
var _xID = '#'+_ID;

var b;

// Prepare frame 0
var gcnt = document.evaluate('//div[@id="cnt"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
var googlecol = document.evaluate('//div[@id="center_col"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
var gdivs = document.evaluate('//div[@class="s"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
contentwidth = (!!gdivs) ? gdivs.offsetWidth : 500;
var b_width = Math.min(504, gcnt.offsetWidth - (googlecol.offsetLeft + contentwidth + 32 + 30));
googlecol.setAttribute('style', 'margin-right: '+ (b_width + 15) +'px !important;');

// Style sheets
var bstyle = 'position:absolute;top:0;right:18px;background:white;z-index:10;width:' + b_width + 'px;';
var cstyle = 'border-top:1px solid #7799cc;background:#aaccff;';
var close_style = _xID + ' .close{float:right;padding:0 10px;}' + _xID + ' .close:hover{outline:1px solid #731616;outline-offset:-1px;background-color:#F28E8E!important;color:#731616!important;}';
var glo_style = _xID + ' p, ' + _xID + ' ul {margin: 0; padding:0;}' + _xID + ' a{color:#2626A8;}' + _xID + ' li{list-style:none outside none;}' + _xID + '{line-height: 130%;border-bottom:1px solid #AACCFF;border-left:1px dotted #C9D7F1;}' + _xID + '>div[id] *{position:relative!important;}' + _xID + '>div[id],' + _xID + ' .resultMore>div[id], .GoogleSpecial>div{max-height:120px;background:white;overflow:hidden;transition:all 0.2s ease 0.3s;}' + _xID + ' .resultMore{max-height:none!important;}' + _xID + '>div[id] h3{font-size:12pt!important;background:white;transition:all 0.5s linear 0.3s;margin-bottom:2px;}' + _xID + '>div[id]:hover,' + _xID + ' .resultMore>div[id]:hover, .GoogleSpecial>div:hover{max-height: 1000px;transition:all 0.2s ease 0.3s;}' + _xID + '>div[id]:hover h3{background:#DDF2FF;transition:all 0.5s linear 0.3s;}' + _xID + '>div>*{height: auto!important;}._hilire{background:#ffd!important;background:-moz-linear-gradient(top, #ffd, white)!important;background:-webkit-gradient(linear, 0 0, 0 100%, from(#ffd), to(white))!important;}' + _xID + ' ._re_hide>div,' + _xID + ' ._no_result{display:none;}' + _xID + ' ._re_more{display:block;height:20px;width:100%;text-align:center;background:#ddd;}' + _xID + ' ._re_hide ._re_more{background:none!important;}';
var ex_style = '._external {color: black!important;} ._external:after {content:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP///////8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC");}';
var tablestyle = _xID + ' td{padding: 5px 0 5px 13px !important;color:#000!important;}' + _xID + ' tr+tr>td{padding: 0px 0 8px 13px !important;}' + _xID + ' td>h3{margin-left:-8px;line-height:1.3em;}';
var li_style = _xID + ' div[id]>li {padding: 5px 0 8px 13px !important;background-image:none;}' + _xID + ' li h3>a:first-child,' + _xID + ' li h3>em {font-size: 13pt !important;margin-left: -8px;}' + _xID + ' li>div, ' + _xID + ' li>p {font-size: small;}';
var mat_style = _xID + ' div._match {background: #eee; background:-moz-linear-gradient(top, #eee, white); background:-webkit-gradient(linear, 0 0, 0 100%, from(#eee), to(white)); max-height:1em;}' + _xID + ' div._match:hover{max-height: 1000px;}';
var re_style = _xID + ' div.result+div.result,' + _xID + ' .resultMore {border-top: 1px solid #aaccff;}' + _xID + ' div.result,.GoogleSpecial>div{margin-bottom:5px !important;}' + _xID + ' .GoogleSpecial a {margin-left:0px;}';// + _xID + ':hover{width:400px !important;border-left: 2px solid #7799cc;}';
var gs_style = /*Google Special*/'.GoogleSpecial div.newsimg>a>div{position:relative!important;}';
var bd_style = /*Baidu link BG img*/'div[id^="baiduResult"]>div{padding: 5px 0 8px 13px !important;} div[id^="baiduResult"]>div>h3{margin-left:-8px;line-height:1.3em;} div[id^="baiduResult"] .favurl{background-position: left center;background-repeat: no-repeat; padding-left: 16px;} div[id^="baiduResult"] div.c-row div.c-span6, div[id^="baiduResult"] div[id^="tools_"].c-tools{display:none!important;}';
var bg_style = /*Bing style*/'div[id^="bingResult"] .crch, div[id^="bingResult"] .sb_tsuf{display:none!important;} h2{margin:5px 0;}';
var yd_style = /*Youdao style*/'div[id^="youdaoResult"] .imgbox, div[id^="youdaoResult"] div.play-icon, div[id^="youdaoResult"] div.play-bk{display:none!important;} div[id^="youdaoResult"] .info .details{margin-left:0px!important;} div[id^="youdaoResult"] div.intro-des{background:white;}';
var wb_style = /*Weibo style*/'div[id^="weiboResult"] div.weibo_face img{max-height:50px;} div[id^="weiboResult"] div.weibo_img_small img{max-height:120px;} div[id^="weiboResult"] div.weibo_img_small{margin: 3px;} div[id^="weiboResult"] div.weibo_face{float:left;margin:7px;} div[id^="weiboResult"] div.weibo_info{float:right;}';

// Get keyword
_q = _q.slice(1);
if (_q.length > 0) {
	var qspairs = _q.split('&');
	for (k = 0; k < qspairs.length; k++) {
		if (qspairs[k].indexOf('q=') == 0) {var googlekeyword = qspairs[k].substring(2); break;}
	}
}

// Prepare frame 1
var googleframe = document.evaluate('//div[@id="rcnt"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	googleframe.style.position = 'relative';
var googlestyle = '#res>h2+div,#res>div.e,div#navcnt,div.clr{max-width: 840px !important;}#res{max-width:1400px!important;}#iur{height:auto!important;}span.bl{display:none!important;}span.gl{white-space:normal!important;}#nyc{z-index:11!important;}.ds{z-index:9!important;}.mw{max-width:95%;}';
	
var A_xSearch_l = A_xSearch.length;
var A_hili_s = new Array();
var A_xS_box = new Array();

for (var a=0;a<A_xSearch_l;a++) {
	A_xS_box[a] = new Array();
	A_xSearch[a][3] = A_xSearch[a][3].replace('--keyword--', googlekeyword);
	A_hili_s[a] = _xID + ' ' + A_xSearch[a][5];
}

//highlight keyword style
var hili_style = A_hili_s.join(',') + '{color: #CC0033 !important;}';

//fix google onebox result
var gm_style = /*Google Onebox right-sided result*/ 'div#rhscol {min-width:0px!important;} div#rhs {position:absolute!important;margin-left:0px!important;min-width:100px!important;width:450px!important;max-width:auto!important;transition:transform 0.2s ease 0.3s;transform:scale(0.3);transform-origin:0 0;-webkit-transition:transform 0.2s ease 0.3s;-webkit-transform:scale(0.3);-webkit-transform-origin:0 0;z-index: 30000;} #rhs .rhsvw{width:450px!important;margin-top:0!important;border-bottom:1px solid #d7d7d7!important;} #rhs #rhs_block{width:auto!important;} #rhs, #rhs .rhsvw {background:white;} #rhs #rhs_block li>div{margin-bottom:0!important;} div#lu_pinned_rhs{overflow:visible!important;} #rhs div#lu_pinned_rhs .rhsvw{width:366px!important;padding:0!important;}#rhs div#lu_pinned_rhs .rhsvw>div{margin:0!important;}div#rhs:hover {max-width:500px!important;width:auto!important;height:auto!important;} #rhs_block{width:auto!important;height:auto!important;} div#rhs:hover {transform:scale(1);}';


// Insert CSS
var headID = document.getElementsByTagName("head")[0];         
var cssNode = creaElemIn('style', headID);
cssNode.type = 'text/css';
cssNode.innerHTML = close_style + glo_style + ex_style + tablestyle + li_style + hili_style + googlestyle + mat_style + re_style + gs_style + bd_style + bg_style + yd_style + wb_style + gm_style;

// Prepare links
var lis =  document.evaluate('//li[@class="g"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var gooRes = [], gooRelnkh = [], gooResNo = 0;
var speIDs = /imagebox_bigimages|imagebox|newsbox|videobox|blogbox/;
for (h=0;h<lis.snapshotLength;h++) {
	if (speIDs.test(lis.snapshotItem(h).id)) continue;
	gooRes.push(lis.snapshotItem(h));
	gooResNo++;
	lis.snapshotItem(h).title = '第 ' + gooResNo + ' 结果';
	var lnks = lis.snapshotItem(h).getElementsByTagName('a');
	gooRelnkh.push((lnks[0].href)? lnks[0].href.toLowerCase() : lnks[1].href.toLowerCase()); //deal with my Google Link Preview [hzhbest mod]
}

// Prepare frame 2
resultbox(googleframe, A_xSearch_l);
moveGoogleSpecialResult();

// Add results
for (var l=0;l<A_xSearch_l;l++) {
	if (!A_xSearch[l][1])continue;
	addresult(A_xSearch[l], A_xS_box[l]); 
}


// FUNCTIONS
// Send a request
function addresult(A_x, A_elem) {
	var timeout = function(){for (i=0;i<resultNumber;i++) {set(A_elem[i], (i==0)?'-Timeout!-':'');}};
	var errortimer = setTimeout(timeout, 30000);

	var option = {
	method: "GET",
	url: A_x[3],
	onload: function(_h){
		clearTimeout(errortimer);
		var _Node = document.createElement('div');//			if(A_x[0]=='Youdao'){console.log(_h.responseText);}
		_Node.innerHTML = _h.responseText;
		initresult(A_x[4], _Node, A_elem, A_x[0]);
		}
	}
	GM_xmlhttpRequest(option);
}

// Initialize results
function initresult(_xpath, _Node, A_elem, sname) {
	var _result = [], _resultLink, _resultLinkHref;
	for (i=0;i<10;i++) {_result[i] = (i==0)?'-No-Result-':'';} //if(sname == 'Weibo')alert(_Node.innerHTML);
	
	for (i=0,j=0;i<12;i++) { //i for actual results, j for accepted results that go to containers
		var i_xpath = _xpath.replace('--i--', (i+1));
		var _h_re = document.evaluate(i_xpath,_Node,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		//log(sname+" i "+i);
		if (_h_re == null) { //log(sname+" j "+j);
			if (j <= resultNumber && resultNumber != 10) A_elem[resultNumber].parentNode.className = '_no_result';
			break;
		} else {  //log(sname+" j "+j);
			//Weibo snapshot fix
			if(sname == 'Weibo') fixweibo(_h_re);

			//Youdao snapshot fix
			if(sname == 'Youdao') fixyoudao(_h_re);

			//GCN url fix
			if(sname == 'GoogleCN') fixgcn(_h_re);

			//Bing img url fix
			if(sname == 'Bing') {
				fixbmg(_h_re);
				if (!_h_re.firstChild || (!_h_re.firstChild.firstChild && !_h_re.firstChild.nextSibling) || (_h_re.firstChild.localName == 'script' && !_h_re.firstChild.nextSibling)) continue;
			}
			
			//Baidu result filter
			//if (sname == 'Baidu' && _h_re.className == 'result-op') continue;
			if (sname == 'Baidu' && _h_re.getAttribute('mu') && _h_re.getAttribute('mu').indexOf('app.baidu.com/') != -1) continue;
			
			_result[j] = getoutterHTML(_h_re);
					
			// check link
			_resultLinks = _h_re.getElementsByTagName('a');
			var _resultLink = (_resultLinks[0].href)? _resultLinks[0] : _resultLinks[1]; //deal with my Google Link Preview [hzhbest mod]
			if (_resultLink) {
				_resultLinkHref = _resultLink.href.toLowerCase();
				for (p in gooRelnkh) {
					if (_resultLinkHref == gooRelnkh[p] || (sname == 'Bing' && _resultLinkHref + '/' == gooRelnkh[p])) {  //deal with bing's result url
						A_elem[j].className = '_match';
						// A_elem[i].title = 'Google Result #' + (Number(p)+1);
						_result[j] = '同 Google 第 <b>' + (Number(p) + 1) + '</b> 结果' + _result[j];
						if (gooRes[p].className.indexOf('_hilire') == -1) {
							gooRes[p].className += ' _hilire';
							gooRes[p].title += '；同时为 ' + sname + ' 第 ' + (j + 1) + ' 结果';
						} else {
							gooRes[p].title += '及 ' + sname + ' 第 ' + (j + 1) + ' 结果';
						}
					}
				}
			}
			j++;
			//if (j == resultNumber) break;
			if (j == 10) break;
		}
		
	}
	for (i=0;i<10;i++) {
		set(A_elem[i], _result[i]);
		if (_result[i]) A_elem[i].className += ' result';
	}
}

// Construct result boxes
function resultbox(dest, _l) {
	b = creaElemIn('div', dest);
		b.id = _ID;
		b.setAttribute("style", bstyle);
	
	var c_first = true;
	for (var j=0;j<_l;j++) {
		if (!A_xSearch[j][1]) continue;
		c = creaElemIn('div', b);
		c.setAttribute('style', cstyle);
		c.id = A_xSearch[j][2];
		d = creaElemIn('a', c);
		addtext(d, A_xSearch[j][0] + ' ');
		d.href = A_xSearch[j][3];
		d.className = '_external';
		if (c_first) {
			close = creaElemIn('a', c);
			close.href = '#';
			close.className = 'close';
			close.addEventListener('click', command_close, false);
			close.innerHTML = 'X';
			close.title = '关闭';
			c_first = false;
		}
		
		for (var k=0;k<resultNumber;k++) {
			A_xS_box[j][k] = creaElemIn('div', b);
			A_xS_box[j][k].id = A_xSearch[j][2] + (k+1);
			A_xS_box[j][k].innerHTML = (k==0)?'Loading...':'...';
		}
		
		if (resultNumber == 10) continue;
		e = creaElemIn('div', b);
		e.className = 'resultMore _re_hide';
		e.id = A_xSearch[j][2] + 'More';
		for (var k=resultNumber;k<10;k++) {
			A_xS_box[j][k] = creaElemIn('div', e);
			A_xS_box[j][k].id = A_xSearch[j][2] + (k+1);
		}
		f = creaElemIn('a', e);
		f.className = '_re_more';
		f.innerHTML = '↓展开↓';
		f.title = '展开更多结果';
		f.href = '#' + A_xSearch[j][2];
		f.addEventListener('click', function(ev) {
			//ev.preventDefault();
			s = (this.parentNode.className == 'resultMore _re_hide')? true : false;
			this.parentNode.className = (s)? 'resultMore ' : 'resultMore _re_hide';
			this.innerHTML = (s)? '↑收起↑' : '↓展开↓';
			this.title = (s)? '收起更多结果' : '展开更多结果';
			//this.scrollIntoView();
		}, false);
	}
}

// Close result boxes
function command_close() {
	headID.removeChild(cssNode);
	googleframe.removeChild(b);
}

// Set content
function set(elem, htmlNode) {
	elem.innerHTML = htmlNode;
}

// Get full HTML nodes in string
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

// Add text node
function addtext(obj, text) {
    var content = document.createTextNode(text);
    obj.appendChild(content);
}

// 修复微博图片
function fixweibo(_resultcontent) {
	var Imgs = _resultcontent.getElementsByTagName('img');
	if (!!Imgs[0]) {
		for(_i = 0; _i < Imgs.length; _i++) {
			Imgs[_i].removeAttribute('onerror');
			var imgA = creaElemIn('a', Imgs[_i].parentNode);
			imgA.href = Imgs[_i].src;
			imgA.target = '_blank';
			imgA.appendChild(Imgs[_i]);
		}
	}
}

// 修复有道链接和图片
function fixyoudao(_resultcontent) {
	var Links = _resultcontent.getElementsByTagName('a'), Imgs = _resultcontent.getElementsByTagName('img');
	if (!!Links[0]) {
		for(_i = 0; _i < Links.length; _i++) {
			if (Links[_i].className == 'yl') {
				Links[_i].parentNode.parentNode.removeChild(Links[_i].parentNode);
				break;
			}
			var lin = Links[_i].getAttribute('href');
			if (lin.indexOf('http://') != 0) {
				if (lin.indexOf('/') == 0) lin = lin.slice(1);
				Links[_i].href = 'http://www.youdao.com/' + lin;
			}
		}
	}
	if (!!Imgs[0]) {
		for(_i = 0; _i < Imgs.length; _i++) {
			if (/oimagea\d\.youdao\.com\/image\?/.test(Imgs[_i].src)) {
				Imgs[_i].removeAttribute('onerror');
				var imgA = document.createElement('a');
				imgA.href = Imgs[_i].src;
				var _sc = imgA.search;
				if (_sc.length > 0) {
					var qpairs = _sc.split('&');
					for (_k = 0; _k < qpairs.length; _k++) {console.log(qpairs[_k]);
						if (qpairs[_k].indexOf('durl=') == 0) {Imgs[_i].src = qpairs[_k].substring(5); break;}
					}
				}
			} else if (!!Imgs[_i].getAttribute('data-img')) {
				Imgs[_i].src = Imgs[_i].getAttribute('data-img');
			}
		}
	}
}

// "修复"GoogleCN链接
function fixgcn(_resultcontent) {  
	var Links = _resultcontent.getElementsByTagName('a');
	if (!Links[0]) return;
	for(_i = 0; _i < Links.length; _i++) {
		if (Links[_i].href && Links[_i].href.match(/^http:\/\/www\.google\..*\/url\?q=/i))
		Links[_i].href = Links[_i].href.replace(/^http:\/\/www\.google\..*\/url\?q=(.*?)&.*/i,"$1");
	}
}

// 修复Bing图片地址
function fixbmg(_resultcontent) {  
	var Imgs = _resultcontent.getElementsByTagName('img');
	if (!Imgs[0]) return;
	for(_i = 0; _i < Imgs.length; _i++) {
		if (Imgs[_i].src && Imgs[_i].src.indexOf('http://') != 0)
		Imgs[_i].src = 'http://www.bing.com' + Imgs[_i].src;
	}
}

// Move Google special results right
function moveGoogleSpecialResult() {
	var sb = b.insertBefore(document.createElement('div'), b.firstChild);
	sb.className = 'GoogleSpecial';
	var spReIDs = ['imagebox_bigimages', 'imagebox', 'newsbox', 'videobox', 'blogbox']; //lclbox, 
	for (i=0;i<spReIDs.length;i++) {
		var sr = document.getElementById(spReIDs[i]);
		if (sr) {
			if (!!sr.previousSibling && sr.previousSibling.className == 'head') sr.insertBefore(sr.previousSibling, sr.firstChild);
			if (sr.id == 'imagebox_bigimages') {
				var ire = document.evaluate('//div[@id="iur"]/div',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
				ire.style.height = 'auto';
				var bots = document.getElementById('botstuff');
				sr.appendChild(bots);
			}
			if (sr.id == 'videobox') {
				var vre = document.evaluate('//div[@class="vresult"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				for (j=0;j<vre.snapshotLength;j++) {
					sr.appendChild(vre.snapshotItem(j));
				}
			}
			var sri = creaElemIn('div', sb);
			sri.appendChild(sr);
		}
	}
}

// Create and insert an element
function creaElemIn(tagname, destin) {
	var theElem = destin.appendChild(document.createElement(tagname));
	return theElem;
}
}

function log(message) {
    if (typeof console == 'object') {
        console.log(message)
    }
    else {
        GM_log(message)
    }
}
})();