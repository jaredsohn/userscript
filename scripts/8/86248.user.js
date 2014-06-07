// ==UserScript==
// @name           dcinside_lite
// @namespace      http://gallog.dcinside.com/hkyuwon
// @version        1.5.5 fix2
// @date           2010-04-10
// @author         축
// @include        http://gall.dcinside.com/list.php*
// @include        http://gall.dcinside.com/article_write.php*
// ==/UserScript==

var VERSION = "1.5.5 fix2";
var P = {
version : "",

filter : 1,
blockN : 1,
blockNA : 1,
blockNR : 0,
allowStyle : 1,
blockAN : "",
allowAN : "",
blockAT : "",
allowAT : "",
blockCN : "",
allowCN : "",
blockCT : "",
allowCT : "",

modTitle : 0,
listTitle : "{G} - {P} 페이지",
articleTitle : "{T} ({W}) - {G}",
header : 0,
title : 1,
pageWidth : 900,
wide : 0,
wideWidth : 900,
listNumber : 0,
listDate : 0,
listCount : 1,
listComment : 0,
menu : 1,
menuList : "로그인/설정/갤로그/갤러리/목록/와이드/베스트/이미지",
menuPos : "left",
menuFix : 1,
best : 1,
link : 0,
linkList : "",

page : 0,
pageCount : 5,
layerImage : 1,
layerText : 1,
layerComment : 1,
layerThumb : 1,
layerLink : 1,
layerReply : 1,
layerSingle : 1,
layerResize : 1,
albumDC : 1,
albumParan : 1,
albumLink : 0,
thumbWidth : 160,
thumbHeight : 120,
hide : 1,
hideImg : 0,
hideMov : 0,
hideZB : 1,
autoForm : 0,
autoName : "",
autoPassword : "",
myTag : ""
};

// 기본 함수 및 상수, 변수
var BROWSER = {};
if(navigator.userAgent.indexOf("Firefox") !== -1) {
	BROWSER.firefox = true;
} else if(navigator.userAgent.indexOf("Chrome") !== -1) {
	BROWSER.chrome = true;
} else if(navigator.userAgent.indexOf("Opera") !== -1) {
	BROWSER.opera = true;
} else {
	BROWSER = false;
	alert("dcinside_lite 가 지원하지 않는 브라우저 입니다. (Firefox, Chrome, Opera");
}

var MODE = {};
if(location.pathname === "/article_write.php") {
	MODE.write = true;
} else if(parseQuery(location.search).view_comment) {
	MODE.comment = true;
} else if(parseQuery(location.search).no) {
	MODE.article = true;
} else if(location.pathname === "/list.php") {
	MODE.list = true;
} else {
	MODE = false;
	alert("dcinside_lite 초기화 과정에서 예외가 발생했습니다.");
}
if(parseQuery(location.search).keyword) {
	MODE.search = true;
}

var WINDOW = BROWSER.firefox ? unsafeWindow : window;
var SCROLL = BROWSER.firefox || BROWSER.opera ? document.documentElement : document.body;
var _ID = parseQuery(location.search).id; // 갤러리 id
var _GID = getScript("_GID"); // 유저 id
var GALLERY = MODE.write?document.title.replace(/ 갤러리$/,""):$id("share_name").value; // 갤러리(한글)
var PAGE = Number(parseQuery(location.search).page) || 1;

var addStyle = BROWSER.opera ?
	function(css) {
		var parent = document.getElementsByTagName("head")[0] || document.documentElement;
		var style = document.createElement("style");
		style.type = "text/css";
		var textNode = document.createTextNode(css);
		style.appendChild(textNode);
		parent.appendChild(style);
	}
	: GM_addStyle;

var xmlhttpRequest = BROWSER.opera ?
	function(details) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			var responseState = {
				responseXML:(xmlhttp.readyState===4 ? xmlhttp.responseXML : ""),
				responseText:(xmlhttp.readyState===4 ? xmlhttp.responseText : ""),
				readyState:xmlhttp.readyState,
				responseHeaders:(xmlhttp.readyState===4 ? xmlhttp.getAllResponseHeaders() : ""),
				status:(xmlhttp.readyState===4 ? xmlhttp.status : 0),
				statusText:(xmlhttp.readyState===4 ? xmlhttp.statusText : "")
			};
			if(details.onreadystatechange) {
				details.onreadystatechange(responseState);
			}
			if(xmlhttp.readyState===4) {
				if(details.onload && xmlhttp.status>=200 && xmlhttp.status<300) {
					details.onload(responseState);
				}
				if(details.onerror && (xmlhttp.status<200 || xmlhttp.status>=300)) {
					details.onerror(responseState);
				}
			}
		};
		try { //cannot do cross domain
			xmlhttp.open(details.method, details.url);
		} catch(e) {
			if( details.onerror ) { //simulate a real error
				details.onerror({responseXML:"",responseText:"",readyState:4,responseHeaders:"",status:403,statusText:"Forbidden"});
			}
			return;
		}
		if(details.headers) {
			for(var prop in details.headers) {
				if(details.headers.hasOwnProperty(prop)) {
					xmlhttp.setRequestHeader(prop, details.headers[prop]);
				}
			}
		}
		xmlhttp.send( (typeof(details.data)!=="undefined")?details.data:null );
	}
	: GM_xmlhttpRequest;

var setValue = BROWSER.firefox ?
	function(name,value) {
		P[name] = value;
		GM_setValue(name,value);
	}
	: function(name,value) {
		if(typeof value === "boolean") {
			value = Number(value);
		}
		P[name] = value;

		var cookie = [];
		for(var i in P) {
			if(P.hasOwnProperty(i)) {
				cookie.push(i+"\b"+P[i]);
			}
		}
		cookie = escape(cookie.join("\b"));
		if(cookie.length > 4083) {
			alert("저장할 수 있는 값의 길이를 " + (cookie.length - 4083) + "자 초과하였습니다.");
			return;
		}
		document.cookie = "dcinside_lite=" + cookie + ";expires=" + (new Date((new Date()).getTime() + 31536000000)).toGMTString() + ";path=/;";
	};

var eRemove = BROWSER.firefox ?
	function(elem,type) { // firefox 에서는 removeAttribute로만 삭제 가능, elem.onclick = null 은 에러 발생
		elem.removeAttribute(type);
	}
	: function(elem,type) { // opera 에서는 removeAttribute로는 삭제 불가, chrome 는 둘다 가능
		elem[type] = null;
	};

function $id(id) {return document.getElementById(id);}
function cElement(tag,insert,property,func) {
	var element = document.createElement(tag);
	if(insert) {
		var parent;
		var before = null;
		if(insert.constructor === Array) {
			var target = insert[1];
			if(typeof target === "number") {
				parent = insert[0];
				before = parent.childNodes[target];
			} else {
				before = insert[0];
				parent = before.parentNode;
				if(target === "next") {
					before = before.nextSibling;
				}
			}
		} else {
			parent = insert;
		}
		parent.insertBefore(element,before);
	}
	if(property) {
		if(typeof property === "object") {
			for(var i in property) {
				if(property.hasOwnProperty(i)) {
					element[i] = property[i];
				}
			}
		} else {
			element.textContent = property;
		}
	}
	if(func) {
		element.addEventListener("click",func,false);
	}
	return element;
}
function simpleRequest(url,callback,method,headers,data) {
	var details = {method:method?method:"GET",url:url};
	if(callback) {
		details.onload = function(response){callback(response);};
	}
	if(headers) {
		details.headers = headers;
	}
	if(data) {
		details.data = data;
	}
	xmlhttpRequest(details);
}
function ePrevent(e) {
	e.stopPropagation();
	e.preventDefault();
}
function cSearch(elem,search) {
	return (new RegExp("(?:^|\\s+)"+search+"(?:\\s+|$)","")).test(elem.className);
}
function cAdd(elem,add) { // 다중 추가는 안함
	if(!cSearch(elem,add)) {
		elem.className += " " + add;
	}
}
function cRemove(elem,remove) {
	elem.className = elem.className.replace((new RegExp("(?:^|\\s+)"+remove+"(?:\\s+|$)","g"))," ");
}
function cSwitch(elem,remove,add) {
	cRemove(elem,remove);
	cAdd(elem,add);
}
function cToggle(elem,toggle) {
	if(cSearch(elem,toggle)) {
		cRemove(elem,toggle);
	} else {
		cAdd(elem,toggle);
	}
}
function parseQuery(str) {
	str = str.substr(str.indexOf("?")+1);
	str = str.split("&");
	var query = {};
	var split;
	for(var i=0,l=str.length ; i<l ; i+=1) {
		split = str[i].split("=");
		query[split[0]] = split[1];
	}
	return query;
}
function getScript(name) {
	var value;
	if(BROWSER.firefox || BROWSER.opera) {
		value = WINDOW[name];
	} else if(BROWSER.chrome){
		var div = document.createElement("div");
		div.style.cssText = "width:0 ; height:0 ; position:absolute ; overflow:hidden ; top:"+document.body.scrollTop+"px";
		div.innerHTML = "<input onfocus='this.value="+name+";' />";
		var input = div.firstChild;
		document.body.appendChild(div);
		input.focus();
		value = input.value;
		document.body.removeChild(div);
	}
	return value;
}
function getImgs(elem) {
	var preImgs = elem.getElementsByTagName("img");
	var imgs = [];
	var img;
	for(var i=0,l=preImgs.length ; i<l ; i+=1) {
		img = preImgs[i];
		if(img.src.indexOf("http://zzbang.dcinside.com/")===-1 && img.src.indexOf("http://wstatic.dcinside.com/")===-1) {
			imgs.push(img);
		}
	}
	return imgs;
}
function autoLink(o) {
	if(!o) {
		return;
	}
	var next = o.nextSibling;
	if(o.nodeType === 3) {
		var parent = o.parentNode;
		var value = o.nodeValue;
		var regexp = /(?:http|https|ftp|magnet):[^\s'"]+/ig;
		var index = 0;
		var exec;
		while( (exec=regexp.exec(value)) ) {
			if(index !== exec.index) {
				parent.insertBefore(document.createTextNode(value.substring(index,exec.index)),o);
			}
			cElement("a",[o,"prev"],{href:exec,target:"_blank",textContent:exec});
			index = regexp.lastIndex;
		}
		if(index !== 0) {
			if(index !== value.length) {
				parent.insertBefore(document.createTextNode(value.substr(index)),o);
			}
			parent.removeChild(o);
		}
	} else if(o.nodeType === 1 && o.nodeName !== "A") {
		autoLink(o.firstChild);
	}
	autoLink(next);
}

var BASE64 = { // base64 (data:image/png;base64,)
	hideImg : "iVBORw0KGgoAAAANSUhEUgAAABkAAAAOCAYAAADaOrdAAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMi8wNC8xMB87UF8AAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAAAeUlEQVQ4jdWUQQrAMAgE19K36pviZ9uTEESTluqhe8wio2sSAoAxxoUmiQhRJ8B0ZAYzg5lLIGdmqGoJIITM3c+gaCrzVx4QxKWq6RR27uFWE/khpEPpTt4oi7gUsrsky8Vb3jv5xfuaz4/RNxI19o+dPImTgP4P8gZSi0Fd9LSJoQAAAABJRU5ErkJggg==",
	hideMov : "iVBORw0KGgoAAAANSUhEUgAAABkAAAAOCAYAAADaOrdAAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMi8wNC8xMB87UF8AAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAAAa0lEQVQ4je2UXQrAIAyDv46d1Z5JL7s9FYq2sME6GCwgaH9IY1AB6L0fFEFVRSoJDFs1wWsk+xxorS1FY4wl52O2j86QKLGiqNlWNEyGb3jiVUVX9QjJFSzGZ5h98BNbLlIB8D/GWxCo/yBPUnI0t18AzcEAAAAASUVORK5CYII=",
	hideOff : "iVBORw0KGgoAAAANSUhEUgAAABkAAAAOCAYAAADaOrdAAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMi8wNC8xMB87UF8AAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAAAwUlEQVQ4jb2Uyw2DQAxEnxcoCdEENXDEtORC4EBngIRzIiKQ8Akk77Q7lj0jr7QCUJaliwi/wMwkVlUvioI0TUmS5Lbh4zjSNA2AB4Asy241AAghkOc5ALGIEEXR4WZVfZ7NbFcHiM+kU9XVgC1902Qr1TesTJap5obzu5m91Ob6rsk7psZlgE/6knDE5Cp/MVmta7nrOx6eqqr8V/R976rqwd1p25ZhGK4nntF1HXVdAyAAqupTcfoo3f1d72nMTB7e0azZRgjcWAAAAABJRU5ErkJggg==",
	viewAll : "iVBORw0KGgoAAAANSUhEUgAAAB4AAAARCAYAAADKZhx3AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDIvMDUvMTCnhzc6AAAA6klEQVRIib2VQQqEMAxFU/FGTXpSV+48godwl+uICsKfxaDUErU6Og8EU2yTfPPVERF57+Gco3+hqo5EBG3bYpomvM08z6jrGswMF0JA13VUluVaETOTqm7ipOLddWtvHBMRhRCoBLBJeiCPeUga51Lc2hXBzOuVrh9hthp3Z3WZPmsVc8a5xjfYm4GYXanTbpdDLEktqeMCTETkdRuliAiyhytneHLe7UJW4njQnuJnO72WOB6wJ7vOstOTEl9KvPfdju8t71p2GoZh3YymaTCO4+s26vseVVV9/07eeyqKAteEug8AUlX3AQ6usNTFNBFLAAAAAElFTkSuQmCC",
	hideAll : "iVBORw0KGgoAAAANSUhEUgAAAB4AAAARCAYAAADKZhx3AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDIvMDUvMTCnhzc6AAAA5UlEQVRIicWVMQ6DMAxFnSg3ip2TMrFxBA7B5usgQEL6HVoQRKEkLbRviozg2992MERE3nsYY+hXqKohEUHbtpimCXczzzPqugYzw4QQ0HUdOefWjJiZVHV3ZuZtxuuzd7FtfEsIgRyAnegbe3YJpQSXc0os5lAxzryElBPZwkfW5ZBTsS3+6kWcN/fFUnnc5yWeisXxHSJy+xrFiAiyrY57nep9yTxkCad2+Vv+NlynwvHFcFXVWVN9pcVFwkerknt/bxmGYX0ZTdNgHMfb16jve1RV9fw7ee/JWosyoz4HAKmqeQBQB60uBTy2vgAAAABJRU5ErkJggg==",
	bestIcon : "iVBORw0KGgoAAAANSUhEUgAAAAIAAAADAQMAAACDJEzCAAAAA3NCSVQICAjb4U/gAAAABlBMVEUAAAD///+l2Z/dAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADA0LzA4LzEwNj3a3QAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNAay06AAAAAOSURBVAiZY3BgaGBwAAADBgEB/Jz9DgAAAABJRU5ErkJggg=="
};

// 환경 설정
var SET = {

call : function() {
	if(!$id("DCL_set")) {
		addStyle("div#DCL_set {position:absolute ; width:550px ; border:5px solid #ccc ; -moz-border-radius:20px ; border-radius:20px ; padding:10px ; background-color:#f9f9f9 ; z-index:103}div#DCL_set * {margin:0 ; padding:0 ; font-size:9pt ; line-height:1.6em ; font-family:Tahoma,돋움 ; vertical-align:middle}div#DCL_set h2 {margin:5px ; padding:5px 10px ; font-weight:bold ; font-size:12pt ; color:#fff ; background-color:#666}div#DCL_set > fieldset:after {content:'' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}div#DCL_set fieldset {float:left ; padding:5px ; margin:5px 3px ; border:1px solid #666 ; -moz-border-radius:5px ; border-radius:5px}div#DCL_set legend {padding:0 5px ; font-weight:bold}div#DCL_set input + * {padding-left:3px}div#DCL_set input[type='text'] {margin-left:5px ; border:1px solid #999}div#DCL_set textarea {display:block}div#DCL_set textarea[cols='11'] {width:110px}div#DCL_set textarea[cols='25'] {width:250px}div#DCL_set input[size='2'] {width:20px}div#DCL_set input[size='4'] {width:40px}div#DCL_set input[size='6'] {width:60px}div#DCL_set input[size='12'] {width:120px}div#DCL_set input[size='23'] {width:230px}div#DCL_set hr {border-width:1px 0 0 ; margin:3px}div#DCL_set input.DCL_number {text-align:right}div#DCL_set .DCL_indent {margin-left:15px !important}div#DCL_set p#DCL_prefBtn {clear:both ; padding:10px ; text-align:center}div#DCL_set p#DCL_prefBtn > span {margin:10px ; padding:7px 10px ; font-weight:bold ; background-color:#666 ; color:#fff ; cursor:pointer}div#DCL_set p.DCL_tooltip {display:none ; position:absolute ; padding:5px 10px ; border:1px solid #999 ; -moz-border-radius:5px ; border-radius:5px ; background-color:#fff}div#DCL_set *:hover + p.DCL_tooltip {display:block}");
		cElement("div",document.body,{id:"DCL_set",innerHTML:"<h2>dcinside_lite version "+VERSION+"<input type='hidden' id='DCL_version' /></h2><fieldset><legend><input type='checkbox' id='DCL_filter' /><label for='DCL_filter'>필터</label><p class='DCL_tooltip'>1) 작성자 필터<br />- 기본적으로 전체 일치하는 경우에 차단<br />- 와일드카드 ＊(ㅁ한자3)를 사용하여 부분 일치 차단<br />- #차단id 형식으로 닉네임이 아닌 dcinside id로 차단<br /><br />2) 제목 필터<br />- 차단 단어가 제목에 포함되어 있으면 차단 (부분 일치)<br /><br />3) 예외 목록에 있는 경우 다른 차단 목록에 있어도 무시</p></legend><input type='checkbox' id='DCL_blockN' /><label for='DCL_blockN'>공지 차단</label><br /><input type='checkbox' id='DCL_blockNA' class='DCL_indent' /><label for='DCL_blockNA'>운영자 공지만 차단</label><input type='text' id='DCL_blockNR' size='2' class='DCL_number DCL_indent' /><label for='DCL_blockNR'>일 이내 공지 표시</label><br /><input type='checkbox' id='DCL_allowStyle' /><label for='DCL_allowStyle'>예외 단어 강조</label><br /><fieldset><legend>게시물 작성자</legend><label for='DCL_blockAN'>차단</label><textarea id='DCL_blockAN' rows='4' cols='11' wrap='off'></textarea><label for='DCL_allowAN'>예외</label><textarea id='DCL_allowAN' rows='3' cols='11' wrap='off'></textarea></fieldset><fieldset><legend>게시물 제목</legend><label for='DCL_blockAT'>차단</label><textarea id='DCL_blockAT' rows='4' cols='11' wrap='off'></textarea><label for='DCL_allowAT'>예외</label><textarea id='DCL_allowAT' rows='3' cols='11' wrap='off'></textarea></fieldset><fieldset><legend>덧글 작성자</legend><label for='DCL_blockCN'>차단</label><textarea id='DCL_blockCN' rows='4' cols='11' wrap='off'></textarea><label for='DCL_allowCN'>예외</label><textarea id='DCL_allowCN' rows='3' cols='11' wrap='off'></textarea></fieldset><fieldset><legend>덧글 내용</legend><label for='DCL_blockCT'>차단</label><textarea id='DCL_blockCT' rows='4' cols='11' wrap='off'></textarea><label for='DCL_allowCT'>예외</label><textarea id='DCL_allowCT' rows='3' cols='11' wrap='off'></textarea></fieldset></fieldset><fieldset><legend>레이아웃</legend><input type='checkbox' id='DCL_modTitle' /><label for='DCL_modTitle'>브라우저 타이틀 수정</label><br /><label for='DCL_listTitle' class='DCL_indent'>목록</label><p class='DCL_tooltip'>{G} : 갤러리 이름<br />{P} : 페이지</p><input type='text' id='DCL_listTitle' size='12' /><br /><label for='DCL_articleTitle' class='DCL_indent' >본문</label><p class='DCL_tooltip'>{G} : 갤러리 이름<br />{T} : 게시물 제목<br />{W} : 작성자</p><input type='text' id='DCL_articleTitle' size='12' /><hr /><input type='checkbox' id='DCL_header' /><label for='DCL_header'>상단 메뉴 표시</label><p class='DCL_tooltip'>DCINSIDE의 기본 상단 메뉴를 표시합니다.</p><br /><input type='checkbox' id='DCL_title' /><label for='DCL_title'>갤러리 타이틀 표시</label><p class='DCL_tooltip'>갤러리 타이틀과 관련 메뉴를 표시합니다.</p><br /><input type='checkbox' checked='checked' disabled='disabled' /><label for='DCL_pageWidth'>페이지 너비</label><p class='DCL_tooltip'>페이지의 너비를 설정합니다.</p><input type='text' id='DCL_pageWidth' size='4' class='DCL_number' /><br /><input type='checkbox' id='DCL_wide' /><label for='DCL_wide'>와이드 레이아웃</label><p class='DCL_tooltip'>본문 영역을 오른쪽에 표시하여 화면을 가로로 길게 사용합니다.<br />(가로 해상도 1920 이상의 와이드 모니터에서 권장)</p> (<label for='DCL_wideWidth'>본문 너비</label><p class='DCL_tooltip'>와이드 레이아웃 모드에서의 본문 영역 너비</p><input type='text' id='DCL_wideWidth' size='4' class='DCL_number' />)<br /><input type='checkbox' checked='checked' disabled='disabled' /><label>목록 표시 설정</label><p class='DCL_tooltip'>목록에 표시할 항목을 설정합니다.</p><br /><input type='checkbox' id='DCL_listNumber' class='DCL_indent' /><label for='DCL_listNumber'>번호</label><input type='checkbox' id='DCL_listDate' class='DCL_indent' /><label for='DCL_listDate'>날짜</label><input type='checkbox' id='DCL_listCount' class='DCL_indent' /><label for='DCL_listCount'>조회수</label><input type='checkbox' id='DCL_listComment' class='DCL_indent' /><label for='DCL_listComment'>덧글 [0]</label><p class='DCL_tooltip'>덧글 수가 0 인 경우에도 덧글 링크를 표시합니다.</p><hr /><input type='checkbox' id='DCL_menu' /><label for='DCL_menu'>메뉴 사용</label><p class='DCL_tooltip'>기능 메뉴를 사용합니다.(/ 로 구분)<br /><br />설정 : 스크립트 설정 버튼<br />로그인 : 로그인/아웃 버튼<br />갤로그 : 갤로그 버튼<br />갤러리 : 갤러리 메뉴 버튼<br />목록 : 다중 목록 버튼<br />와이드 : 와이드 모드 버튼<br />상단 : 상단 기본 메뉴 버튼<br />타이틀 : 갤러리 타이틀 버튼<br />베스트 : 일간 베스트 버튼<br />이미지 : 이미지 모아보기 버튼</p><br /><input type='text' id='DCL_menuList' size='23' class='DCL_indent' /><br /><select id='DCL_menuPos' class='DCL_indent'><option value='top'>위쪽</option><option value='left'>왼쪽</option></select><p class='DCL_tooltip'>메뉴의 위치를 설정합니다.</p><input type='checkbox' id='DCL_menuFix' class='DCL_indent' /><label for='DCL_menuFix'>화면 고정</label><p class='DCL_tooltip'>메뉴를 화면에 고정시킵니다. (스크롤 따라 이동)</p><input type='checkbox' id='DCL_best' class='DCL_indent' /><label for='DCL_best'>일간 베스트</label><br /><input type='checkbox' id='DCL_link' /><label for='DCL_link'>즐겨찾기 링크 사용</label><p class='DCL_tooltip'>자주가는 갤러리나 웹사이트를 등록하여 링크 메뉴를 생성합니다.<br />표시 이름@갤러리 주소 or http:// 주소<br />표시 이름@@갤러리 주소 or http:// 주소 (새창에 열기)<br /><br />예)<br />힛갤@hit<br />구글@http://www.google.co.kr/<br />신고@@http://gall.dcinside.com/article_write.php?id=singo</p><textarea id='DCL_linkList' rows='4' cols='25' wrap='off'></textarea></fieldset><fieldset><legend>기능</legend><input type='checkbox' id='DCL_page' /><label for='DCL_page'>멀티 페이지</label><p class='DCL_tooltip'>한번에 여러 페이지를 보여줍니다.</p> (<label for='DCL_pageCount'>표시할 페이지 수</label><input type='text' id='DCL_pageCount' size='2' class='DCL_number' />)<br /><input type='checkbox' checked='checked' disabled='disabled' /><label>바로보기 설정</label><p class='DCL_tooltip'>게시물의 내용을 페이지 이동 없이 보여줍니다.<br />바로보기에서 표시할 항목을 설정합니다.</p><br /><input type='checkbox' id='DCL_layerImage' class='DCL_indent' /><label for='DCL_layerImage'>이미지</label><input type='checkbox' id='DCL_layerText' class='DCL_indent' /><label for='DCL_layerText'>본문</label><input type='checkbox' id='DCL_layerComment' class='DCL_indent' /><label for='DCL_layerComment'>덧글</label><input type='checkbox' id='DCL_layerThumb' class='DCL_indent' /><label for='DCL_layerThumb'>썸네일화</label><p class='DCL_tooltip'>바로보기의 이미지를 썸네일로 작게 보여줍니다.</p><br /><input type='checkbox' id='DCL_layerLink' class='DCL_indent' /><label for='DCL_layerLink'>링크 모드</label><p class='DCL_tooltip'>사용시<br />- 목록앞 아이콘 클릭 : 게시물 링크<br />- 제목 클릭 : 바로가기 모드<br /><br />해제시<br />- 목록앞 아이콘 클릭 : 바로가기 모드<br />- 제목 클릭 : 게시물 링크</p><input type='checkbox' id='DCL_layerReply' class='DCL_indent' /><label for='DCL_layerReply'>덧글 모드</label><p class='DCL_tooltip'>목록의 덧글 링크를 덧글 바로가기 모드로 사용합니다.</p><br /><input type='checkbox' id='DCL_layerSingle' class='DCL_indent' /><label for='DCL_layerSingle'>단독 레이어 사용</label><p class='DCL_tooltip'>한번에 하나의 바로보기만 사용합니다.</p><input type='checkbox' id='DCL_layerResize' class='DCL_indent' /><label for='DCL_layerResize'>높이 조절</label><p class='DCL_tooltip'>바로보기의 높이를 화면에 맞추어 제한합니다.</p><br /><input type='checkbox' checked='checked' disabled='disabled' /><label>이미지 모아보기 설정</label><p class='DCL_tooltip'>이미지 모아보기의 동작 및 썸네일 가로/세로 길이를 설정합니다.</p><br /><input type='checkbox' id='DCL_albumDC' class='DCL_indent' /><label for='DCL_albumDC'>일반</label><p class='DCL_tooltip'>일반 첨부 이미지를 포함합니다.<br />* 목록에서 검은색 테두리</p><input type='checkbox' id='DCL_albumParan' class='DCL_indent' /><label for='DCL_albumParan'>파란</label><p class='DCL_tooltip'>파란 대용량 첨부 이미지를 포함합니다.<br />* 목록에서 파란색 테두리</p><input type='checkbox' id='DCL_albumLink' class='DCL_indent' /><label for='DCL_albumLink'>링크</label><p class='DCL_tooltip'>본문에 링크된 이미지를 포함합니다.<br />* 목록에서 회색 테두리<br />** 모든 글에서 링크된 이미지를 확인하므로 검색이 느립니다.</p><br /><span class='DCL_indent'>썸네일</span> <label for='DCL_thumbWidth'>가로</label><input type='text' id='DCL_thumbWidth' size='4' class='DCL_number' /> /<label for='DCL_thumbHeight'>세로</label><input type='text' id='DCL_thumbHeight' size='4' class='DCL_number' /><hr /><input type='checkbox' id='DCL_hide' /><label for='DCL_hide'>이미지/동영상 차단 사용</label><p class='DCL_tooltip'>이미지 및 동영상, 플래시, 음악 등을 차단/차단해제 하는 기능입니다.<br /><br />Delete/Esc : 전체 차단<br />Insert/~ : 전체 차단해제</p><br /><input type='checkbox' id='DCL_hideImg' class='DCL_indent' /><label for='DCL_hideImg'>이미지 미리 차단</label><p class='DCL_tooltip'>페이지 로딩시 이미지를 미리 차단합니다.</p><input type='checkbox' id='DCL_hideMov' class='DCL_indent' /><label for='DCL_hideMov'>동영상 미리 차단</label><p class='DCL_tooltip'>페이지 로딩시 동영상, 플래시, 음악 등을 미리 차단합니다.</p><br /><input type='checkbox' id='DCL_hideZB' /><label for='DCL_hideZB'>기본 이미지(짤방) 감춤</label><hr /><input type='checkbox' id='DCL_autoForm' /><label for='DCL_autoForm'>이름/비밀번호 자동 입력 사용</label><p class='DCL_tooltip'>비로그인 상태에서 게시물/코멘트 작성란의<br />이름과 비밀번호를 자동으로 설정합니다.</p><br /><label for='DCL_autoName' class='DCL_indent'>이름</label><input type='text' id='DCL_autoName' size='6' /><label for='DCL_autoPassword' class='DCL_indent'>비밀번호</label><input type='text' id='DCL_autoPassword' size='6' /><br /><input type='checkbox' checked='checked' disabled='disabled' /><label for='DCL_myTag'>my Tag 내용</label><p class='DCL_tooltip'>게시물 작성시 에디터 버튼의 [my Tag] 를 클릭하면 지정한 태그가 본문 앞에 삽입됩니다.</p><textarea id='DCL_myTag' rows='3' cols='25'></textarea></fieldset><p id='DCL_prefBtn'></p>"});

		var prefBtn = $id("DCL_prefBtn");
		cElement("span",prefBtn,"저장",SET.save);
		cElement("span",prefBtn,"취소",SET.close);
		cElement("span",prefBtn,"초기화",SET.reset);
		cElement("span",prefBtn,"제작자 갤로그",function(){window.open("http://gallog.dcinside.com/hkyuwon");});
	}
	var div = $id("DCL_set");
	div.style.display = "block";
	div.style.top = SCROLL.scrollTop + Math.max(0,document.documentElement.clientHeight-div.clientHeight)/2 + "px";
	div.style.left = SCROLL.scrollLeft + Math.max(0,document.documentElement.clientWidth-div.clientWidth)/2 + "px";

	var input,value;
	for(var i in P) {
		if(P.hasOwnProperty(i)) {
			input = $id("DCL_" + i);
			value = P[i];
			if(input.type === "checkbox") {
				input.checked = value;
			} else {
				input.value = value;
			}
		}
	}
},
load : function() {
	if(BROWSER.firefox) {
		var listValues = GM_listValues();
		for(var i=0,l=listValues.length ; i<l ; i+=1) {
			if(P.hasOwnProperty(listValues[i])) {
				P[listValues[i]] = GM_getValue(listValues[i]);
			}
		}
		GM_registerMenuCommand("dcinside_lite Preferences",SET.call);
		GM_registerMenuCommand("dcinside_lite Reset",SET.reset);
	} else {
		var cookie = /(?:^|; )dcinside_lite=([^;]*)/.exec(document.cookie);
		if(cookie) {
			cookie = unescape(cookie[1]).split("\b");
			for(var i=0,l=cookie.length ; i<l ; i+=2) {
				if(P.hasOwnProperty(cookie[i])) {
					P[cookie[i]] = cookie[i+1];
				}
			}
			var num = ["filter","blockN","blockNA","blockNR","allowStyle","modTitle","header","title","pageWidth","wide","wideWidth","listNumber","listDate","listCount","listComment","menu","menuFix","best","link","page","pageCount","layerImage","layerText","layerComment","layerThumb","layerLink","layerReply","layerSingle","layerResize","albumDC","albumParan","albumLink","thumbWidth","thumbHeight","hide","hideImg","hideMov","hideZB","autoForm"]; // boolean 이나 number 을 형변환
			for(i=0,l=num.length ; i<l ; i+=1) {
				P[num[i]] = Number(P[num[i]]);
			}
		}

		if(!P.menu || !/(^|\/)설정(\/|$)/.test(P.menuList)) { // 설정 버튼
			addStyle(
				"div#DCL_setCall {opacity:0 ; width:10px ; height:10px ; position:absolute ; top:0 ; right:0 ; background-color:#666 ; cursor:pointer}" +
				"div#DCL_setCall:hover {opacity:1}"
			);
			cElement("div",document.body,{id:"DCL_setCall"},SET.call);
		}
	}
	if(P.version !== VERSION) {
		alert("처음 사용하거나 새 버전을 설치하였습니다.\n\n메뉴의 [설정] 버튼을 눌러 설정을 확인하세요.\n\n설정을 완료하면 이 알림창은 나타나지 않습니다.");
		addStyle("li#DCL_setBtn {color:#c00 !important ; font-weight:bold !important ; text-decoration:blink}");
		if(BROWSER.firefox) {
			alert("Firefox 를 사용하고 있습니다.\n\n갤로그의 안내글에 따라 Adblock Plus 를 반드시 사용하세요.");
		} else {
			alert("Chrome 이나 Opera 를 사용하고 있습니다.\n\n업데이트 후 정상적으로 동작하지 않는다면 브라우저 쿠키를 삭제하여 설정을 초기화하세요.");
		}
	}
},
save : function() {
	if(!confirm("값을 저장하겠습니까?")) {
		return;
	}
	var input;
	for(var i in P) {
		if(P.hasOwnProperty(i)) {
			input = $id("DCL_" + i);
			if(input.nodeName === "INPUT") {
				if(input.type === "checkbox") {
					setValue(i,input.checked);
				} else if(cSearch(input,"DCL_number")) {
					setValue(i,Number(input.value));
				} else {
					setValue(i,input.value);
				}
			} else if(input.nodeName === "SELECT") {
				setValue(i,input.value);
			} else if(input.nodeName === "TEXTAREA") {
				setValue(i,input.value.replace(/^(?:\r?\n)+|(?:\r?\n)+$|(?:\r?\n)+(?=\r?\n)|\r/g,""));
			}
		}
	}
	setValue("version",VERSION);
	location.reload();
},
reset : function() {
	if(!confirm("설정을 초기화하겠습니까?")) {
		return;
	}
	if(BROWSER.firefox) {
		var listValues = GM_listValues();
		for(var i=0,l=listValues.length ; i<l ; i+=1) {
			GM_deleteValue(listValues[i]);
		}
	} else {
		document.cookie = "dcinside_lite=;path=/;";
	}
	location.reload();
},
close : function() {
	$id("DCL_set").style.display = "none";
}

};

// 기능 사용 버튼 추가
function menuFunc() {
	var css =
		"div#DCL_menuDiv {position:relative ; width:"+P.pageWidth+"px ; margin:0 auto ; z-index:100}" +
		"div#DCL_menuWrap {position:" + (P.menuFix?"fixed":"absolute") + " ; background-color:#fff ; z-index:100}" +
		"li.DCL_menuOn {color:#000 !important}";

	if(P.menuPos === "top") {
		css +=
			"div#DCL_menuDiv {height:22px}" +
			"div#DCL_menuWrap {width:"+P.pageWidth+"px ; height:21px ; border-bottom:1px solid #ccc ; background-image:-moz-linear-gradient(#fff,#eee) ; background-image:-webkit-gradient(linear, 0 top, 0 bottom, from(#fff),to(#eee))}" +
			"h2#DCL_menuTitle {float:left ; margin:0 5px ; padding:0 5px ; font:bold 10pt/21px Tahoma,돋움 ; cursor:pointer}" +
			"ul#DCL_menuUl {float:left ; margin-top:4px}" +
			"ul#DCL_menuUl:after {content:'' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}" +
			"ul#DCL_menuUl > li {display:inline ; margin-left:5px ; font:9pt Tahoma,돋움 ; color:#888 ; cursor:pointer}" +
			"ul#DCL_menuUl > li:hover {text-decoration:underline ; color:#000}";
	} else {
		css +=
			"html > body {padding-left:85px}" +
			"div#DCL_menuDiv {height:0 ; top:5px ; left:-85px}" +
			"div#DCL_menuWrap {width:80px}" +
			"h2#DCL_menuTitle {margin-bottom:5px ; padding:1px 0 ; text-align:center ; font:10pt Tahoma,돋움 ; color:#666 ; background-image:-moz-linear-gradient(#fff,#eee) ; background-image:-webkit-gradient(linear, 0 top, 0 bottom, from(#fff),to(#eee)) ; border:1px solid #ccc ; -moz-border-radius:3px ; border-radius:3px ; cursor:pointer}" +
			"ul#DCL_menuUl {color:#999 ; border:1px solid #999 ; -moz-border-radius:3px ; border-radius:3px}" +
			"ul#DCL_menuUl:after {content:'' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}" +
			"ul#DCL_menuUl > li {float:left ; display:block ; width:39px ; height:11px ; padding:3px 0 ; font:11px/11px Tahoma,돋움 ; text-align:center ; color:#888 ; cursor:pointer ; white-space:nowrap}" +
			"ul#DCL_menuUl > li:hover {text-decoration:underline ; color:#000}";
	}
	addStyle(css);

	var menuDiv = cElement("div",[document.body,0],{id:"DCL_menuDiv"});
	var menuWrap = cElement("div",menuDiv,{id:"DCL_menuWrap"});

	cElement("h2",menuWrap,{id:"DCL_menuTitle",textContent:GALLERY+(P.menuPos==="top"?" 갤러리":"")},
		function() {
			if(MODE.list && PAGE === 1 && !MODE.search) {
				SCROLL.scrollTop = 0;
				for(var i=0,l=P.page?P.pageCount:1;i<l;i+=1) {
					pageLoad(i);
				}
			} else {
				location.href = "http://gall.dcinside.com/list.php?id="+_ID;
			}
		}
	);

	var menuUl = cElement("ul",menuWrap,{id:"DCL_menuUl"});
	var menuList = P.menuList.split("/");
	var funcList = {
		login : function(){location.href="http://dcid.dcinside.com/join/log"+(_GID?"out":"in")+".php?s_url="+encodeURIComponent(location.href);},
		gallog : function() {
					if(_GID) {
						window.open("http://gallog.dcinside.com/"+_GID);
					} else if(confirm("로그인을 하지 않은 상태입니다.\n로그인 하시겠습니까?")) {
						location.href = "http://dcid.dcinside.com/join/login.php?s_url="+encodeURIComponent(location.href);
					}
				},
		gallery : function(){window.open("http://gall.dcinside.com/");},
		page : function() {
					setValue("page",!P.page);
					cToggle(this,"DCL_menuOn");
					var list_table = $id("list_table");
					var tbody = list_table.tBodies;
					if(P.page) {
						pageFunc();
					} else {
						for(var i=tbody.length-1 ; i>0 ; i-=1) {
							Layer.close(i);
							list_table.removeChild(tbody[i]);
						}
					}
				},
		wide : function() {
					setValue("wide",!P.wide);
					cToggle(this,"DCL_menuOn");
					wideFunc();
				},
		header : function() {
					setValue("header",!P.header);
					cToggle(this,"DCL_menuOn");
					$id("header").style.display = P.header?"block":"none";
				},
		title : function() {
					setValue("title",!P.title);
					cToggle(this,"DCL_menuOn");
					document.querySelector(".table_link").style.display = P.title?"table":"none";
				},
		best : function() {
					setValue("best",!P.best);
					cToggle(this,"DCL_menuOn");
					bestFunc($id("right_div").getElementsByTagName("table")[1].innerHTML);
				},
		album : function(){Album(PAGE);}
	};
	for(var i=0,l=menuList.length ; i<l ; i+=1) {
		var flag = menuList[i];
		if(flag === "설정") {
			cElement("li",menuUl,{textContent:"설정",id:"DCL_setBtn"},SET.call);
		} else if(flag === "로그인") {
			cElement("li",menuUl,{textContent:_GID?"로그아웃":"로그인",className:"DCL_menuOn"},funcList.login);
		} else if(flag === "갤로그") {
			cElement("li",menuUl,"갤로그",funcList.gallog);
		} else if(flag === "갤러리") {
			cElement("li",menuUl,"갤러리",funcList.gallery);
		} else if(flag === "목록") {
			cElement("li",menuUl,{textContent:"목록",className:P.page?"DCL_menuOn":""},funcList.page);
		} else if(flag === "와이드") {
			cElement("li",menuUl,{textContent:"와이드",className:P.wide?"DCL_menuOn":""},funcList.wide);
		} else if(flag === "상단") {
			cElement("li",menuUl,{textContent:"상단",className:P.header?"DCL_menuOn":""},funcList.header);
		} else if(flag === "타이틀") {
			cElement("li",menuUl,{textContent:"타이틀",className:P.title?"DCL_menuOn":""},funcList.title);
		} else if(flag === "베스트") {
			cElement("li",menuUl,{textContent:"베스트",className:P.best?"DCL_menuOn":""},funcList.best);
		} else if(flag === "이미지") {
			cElement("li",menuUl,"이미지",funcList.album);
		} else {
			cElement("li",menuUl);
		}
	}

	if(P.menuFix) {
		window.addEventListener("scroll",function(){menuWrap.style.marginLeft = "-"+SCROLL.scrollLeft+"px";},false);
	}

	// 즐겨찾기 링크 추가
	if(P.link && P.linkList) {
		var linkUl = cElement("ul",menuWrap,{id:"DCL_linkUl"});

		if(P.menuPos === "top") {
			addStyle(
				"ul#DCL_linkUl {float:right ; margin-top:4px}" +
				"ul#DCL_linkUl:after {content:'' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}" +
				"ul#DCL_linkUl > li {display:inline ; margin:0 5px ; font:10pt 돋움}" +
				"ul#DCL_linkUl a {color:#666 ; text-decoration:none}" +
				"ul#DCL_linkUl > li.DCL_linkThis {font-weight:bold}"
			);
		} else {
			addStyle(
				"ul#DCL_linkUl {margin-top:5px ; padding-top:1px}" +
				"ul#DCL_linkUl > li {width:78px ; margin-top:-1px ; border:1px solid #ccc ; -moz-border-radius:3px ; border-radius:3px ; padding:2px 0 ; font:10pt 돋움 ; text-align:center}" +
				"ul#DCL_linkUl a {color:#666 ; text-decoration:none}" +
				"ul#DCL_linkUl > li.DCL_linkThis {background-image:-moz-linear-gradient(#fff,#eee) ; background-image:-webkit-gradient(linear, 0 top, 0 bottom, from(#fff),to(#eee))}"
			);
		}

		var linkList = P.linkList;
		var regexp = /([^@]+)(@{1,2})((http:\/\/)?.+)(?:\n|$)/ig;
		var exec,href,className,li,a;
		while( (exec=regexp.exec(linkList)) ) {
			if(exec[4]) {
				href = exec[3];
				className = "DCL_linkHttp";
			} else {
				href = "http://gall.dcinside.com/list.php?id=" + exec[3];
				className = exec[3]===_ID?" DCL_linkThis":"";
			}
			li = cElement("li",linkUl,{className:className});
			a = cElement("a",li,{href:href,textContent:exec[1]});
			if(exec[2].length === 2) {
				a.target = "_blank";
			}
		}
	}

	if(P.best) {
		bestFunc();
	}
}

// 일간 베스트 생성
function bestFunc() {
	if(MODE.write) { // 글쓰기 모드가 아닌 경우만 베스트 목록 생성
		return;
	}
	if(P.best) {
		if(P.menuPos === "top") {
			addStyle(
				"div#DCL_menuDiv.DCL_bestOn {height:44px ; border-bottom:1px solid #999}" +
				"ul#DCL_bestUl {position:absolute ; top:22px ; padding-top:6px}" +
				"ul#DCL_bestUl:after {content:'' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}" +
				"ul#DCL_bestUl > li {float:left ; max-width:"+Math.floor((P.pageWidth-70)/5)+"px ; margin:0 4px ; font:8pt 돋움 ; white-space:nowrap ; overflow:hidden}" +
				"ul#DCL_bestUl > li:before {float:left ; content:'' ; display:block ; width:2px ; height:3px ; margin:4px ; background-image:url('data:image/png;base64,"+BASE64.bestIcon+"')}" +
				"ul#DCL_bestUl a:visited {color:#999}"
			);
		} else {
			addStyle(
				"ul#DCL_bestUl {width:72px ; margin-top:5px ; border:1px solid #ccc ; -moz-border-radius:4px ; border-radius:4px ; padding:0 3px}" +
				"ul#DCL_bestUl > li {padding:5px 0 ; border-bottom:1px dotted #ccc ; font:8pt 돋움 ; overflow:hidden}" +
				"ul#DCL_bestUl > li:last-child {border-bottom-width:0}" +
				"ul#DCL_bestUl a:visited {color:#999}"
			);
		}

		var html = $id("right_div").getElementsByTagName("table")[1].innerHTML;
		var bestUl = cElement("ul",P.menuPos==="top"?$id("DCL_menuDiv"):$id("DCL_menuWrap"),{id:"DCL_bestUl"});
		var regexp = /<a class="ad" href="(.*)">(.*?) <\/a>/ig;
		var exec,li;
		while( (exec=regexp.exec(html)) ) {
			li = cElement("li",bestUl);
			cElement("a",li,{href:exec[1].replace(/&amp;/g,"&"),textContent:exec[2].replace(/&lt;/g,"<").replace(/&gt;/g,">")});
		}
	} else {
		$id("DCL_bestUl").parentNode.removeChild($id("DCL_bestUl"));
	}
	cToggle($id("DCL_menuDiv"),"DCL_bestOn");
}

function wideFunc() {
	cToggle(document.body,"DCL_wideOn");
	if(MODE.write) {
		return;
	} else if(!wideFunc.init) {
		wideFunc.init = true;
		addStyle("body.DCL_wideOn {padding-right:"+P.wideWidth+"px}");

		if(MODE.article || MODE.comment) {
			addStyle(
				"div#DCL_wideDiv {width:"+P.pageWidth+"px ; margin:0 auto}" +
				"div#DCL_wideDiv > table, div#DCL_wideDiv > table:nth-of-type(2)>tbody>tr>td>table:nth-of-type(3)>tbody>tr:nth-of-type(2)>td>table {width:"+P.pageWidth+"px !important}" +
				"body.DCL_wideOn > div#DCL_wideDiv {height:0}" +
				"body.DCL_wideOn > div#DCL_wideDiv > table {margin-left:"+P.pageWidth+"px ; width:"+P.wideWidth+"px !important}" +
				"body.DCL_wideOn > div#DCL_wideDiv #bgRelaBig * {max-width:"+P.wideWidth+"px !important}" +
				"body.DCL_wideOn > div#DCL_wideDiv > table:nth-of-type(2)>tbody>tr>td>table:nth-of-type(3)>tbody>tr:nth-of-type(2)>td>table {width:"+P.wideWidth+"px !important}" +
				"body.DCL_wideOn > br {display:none}"
			);

			var table = document.querySelectorAll("body > table:not(#TB)");
			var div = cElement("div",[table[0],"prev"],{id:"DCL_wideDiv"});
			for(var i=0,l=table.length ; i<l ; i+=1) {
				div.appendChild(table[i]);
			}
		}
	}
}

// 목록에 적용
function listFunc(p) {
	var tbody = $id("list_table").tBodies[p];
	var rows = tbody.rows;

	tbody.setAttribute("DCL_tbody",p);
	var tbodyBtn = cElement("p",rows[0].cells[0],{className:"DCL_tbodyBtn"});
	cElement("span",tbodyBtn,(p+PAGE)+" 페이지",function(){pageLoad(p);});
	cElement("span",tbodyBtn,"글닫기",function(){Layer.close(p);});

	var a = tbody.querySelectorAll("tr > td:nth-of-type(3) a");
	for(var i=0,l=a.length ; i<l ; i+=1) {
		a[i].href = a[i].href.replace(/([?&]page=)\d+/,"$1"+PAGE);
	}
}

// 다중 목록
function pageFunc() {
	if( P.pageCount < 2 || MODE.search) { // 검색모드에서는 그냥 리턴
		return;
	}

	var list = $id("testDiv").getElementsByClassName("defaule_page")[0].parentNode.nextElementSibling;
	for(var i=1,l=P.pageCount ; i<l ; i+=1) { // 페이징 목록에 다중 목록 스타일 추가
		if(list.textContent.indexOf("..") === -1) {
			cAdd(list,"DCL_pageLink");
			list = list.nextElementSibling;
		}
		cElement("tbody",$id("list_table"),{innerHTML:"<tr><td colspan='7' class='DCL_tbodyTitle'></td></tr>"});
		pageLoad(i);
	}
}

// 목록 데이터 로드
function pageLoad(p) {
	Layer.close(p);
	var tbody = $id("list_table").tBodies[p];
	var cell = tbody.rows[0].cells[0];
	cell.innerHTML = "<span class='DCL_tbodyLoad'>읽는 중... ("+(p+PAGE)+" 페이지)</span>";

	simpleRequest(
		"http://gall.dcinside.com/list.php?id="+_ID+"&page="+(p+PAGE),
		function(response) { // 전체 html을 직접 DOM으로 넣고 list_table을 찾는 것이 간단하겠지만 로딩이 길어지므로 목록 부분만 잘라서 직접 html로 집어넣음
			var text = response.responseText;
			var html = text.substring(text.indexOf("<tr onMouseOver=this.style.backgroundColor='#F2F0F9' onMouseOut=this.style.backgroundColor=''>"),text.indexOf("<td width=5 colspan=7 height=5></td>"));
			if(html) {
				tbody.innerHTML = "<tr><td colspan='7' class='DCL_tbodyTitle'></td></tr><tr><td colspan='7'></td></tr>" +
					html + 
					"<td colspan='7'></td></tr>";

				listFunc(p);
				if(P.filter) {
					Filter.article(tbody);
				}
				Layer.add(p);
			} else {
				cell.innerHTML = "";
				cElement("span",cell,{textContent:"읽기 실패 ("+(p+PAGE)+" 페이지)",className:"DCL_tbodyLoad"},function(){pageLoad(p);});
			}
		}
	);
}

// 필터 ; 차단 or 강조
var Filter = {

init : function() {
	Filter.inited = true;

	var bN = P.blockN;
	var bAN = P.blockAN;
	var bAT = P.blockAT;
	var aAN = P.allowAN;
	var aAT = P.allowAT;
	var bA = bAN || bAT || aAN || aAT;
	Filter.bN = bN;
	Filter.bA = bA;

	if(bN || bA) {
		addStyle(
			"tr.DCL_blockArticle, tr.DCL_blockArticle + tr {display:none}" +
			"tr.DCL_blockArticle td.DCL_nameMatch, tr.DCL_blockArticle span.DCL_titleMatch {color:#c00}" +
			"tbody.DCL_showArticle > tr.DCL_blockArticle {display:table-row ; background-color:#eee}" +
			"tbody.DCL_showArticle > tr.DCL_blockArticle+tr {display:table-row}" +
			"p.DCL_blockArticleP {float:right}" +
			"p.DCL_blockArticleP > span {margin-right:10px ; font:8pt 돋움}" +
			"p.DCL_blockArticleP > span.DCL_blockTotal {font-weight:bold ; font-size:9pt ; cursor:pointer}"
		);
		if(P.allowStyle) {
			addStyle("tr.DCL_allowArticle td.DCL_nameMatch, tr.DCL_allowArticle span.DCL_titleMatch {font-weight:bold !important ; color:#36c !important");
		}

		Filter.bNA = P.blockNA;
		if(P.blockNR) {
			var date = new Date();
			date.setDate(date.getDate()-P.blockNR);
			Filter.bNR = date.getFullYear() + "/" + (100+date.getMonth()+1).toString(10).substr(1) + "/" + (100+date.getDate()).toString(10).substr(1);
		} else {
			Filter.bNR = false;
		}
		bAN = Filter.name(bAN);
		Filter.bAN = bAN[0];
		Filter.bANid = bAN[1];
		Filter.bAT = Filter.title(bAT);
		aAN = Filter.name(aAN);
		Filter.aAN = aAN[0];
		Filter.aANid = aAN[1];
		Filter.aAT = Filter.title(aAT);
	}

	var bCN = P.blockCN;
	var bCT = P.blockCT;
	var aCN = P.allowCN;
	var aCT = P.allowCT;
	var bC = bCN || bCT || aCN || aCT;
	Filter.bC = bC;

	if(bC) {
		addStyle(
			"tr.DCL_blockComment {display:none}" +
			"tr.DCL_blockComment td.DCL_nameMatch, tr.DCL_blockComment span.DCL_titleMatch {color:#c00 !important}" +
			"table.DCL_showComment tr.DCL_blockComment {display:table-row ; background-color:#f0f0f0}" +
			"p.DCL_blockCommentP {margin:5px 0 ; padding:3px ; ; background-color:#e9e9e9 ; text-align:right}" +
			"p.DCL_blockCommentP > span {margin-right:10px ; font:8pt 돋움}" +
			"p.DCL_blockCommentP > span.DCL_blockTotal {font-weight:bold ; font-size:9pt ; cursor:pointer}" +
			".comment-table > tr:empty {display:none}"
		);
		if(P.allowStyle) {
			addStyle("tr.DCL_allowComment td.DCL_nameMatch, tr.DCL_allowComment span.DCL_titleMatch {font-weight:bold !important ; color:#36c !important");
		}

		bCN = Filter.name(bCN);
		Filter.bCN = bCN[0];
		Filter.bCNid = bCN[1];
		Filter.bCT = Filter.title(bCT);
		aCN = Filter.name(aCN);
		Filter.aCN = aCN[0];
		Filter.aCNid = aCN[1];
		Filter.aCT = Filter.title(aCT);
	}
},
name : function(value) {
	value = value.split("\n");
	var normal = [];
	var id = [];
	var name;
	for(var i=0,l=value.length ; i<l ; i+=1) {
		name = value[i];
		if(name !== "") {
			if(name.charAt(0) === "#") {
				id.push(name);
			} else {
				normal.push(name);
			}
		}
	}
	normal = normal.length ? (new RegExp("^("+normal.join("\n").replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|").replace(/＊/g,".*")+")$")) : null;
	id = id.length ? (new RegExp("^("+id.join("\n").replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|").replace(/＊/g,".*")+")$")) : null;
	return [normal,id];
},
title : function(value) {
	return value ? (new RegExp(("("+value.replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|")+")").replace(/</g,"&lt;").replace(/>/g,"&gt;"),"g")) : null;
},
article : function(tbody) {
	if(!Filter.inited) {
		Filter.init();
	}
	if(!Filter.bN && !Filter.bA) {
		return;
	}

	var rows = tbody.rows;
	var noticeCnt = 0;
	var articleCnt = 0;
	var titleCnt = 0;
	var blockCnt = {};

	var i=2,l=rows.length-2;
	if(Filter.bN) {
		var bNA = Filter.bNA;
		var bNR = Filter.bNR;
		for( ; rows[i].cells[1].textContent.indexOf("공지") !== -1 ; i+=2) {
			if( (!bNR || rows[i].cells[4].textContent.replace(/^\s+|\s+$/g,"") <= bNR) && (!bNA || rows[i].cells[3].textContent.replace(/^\s+|\s+$/g,"") === "운영자") ) {
				cAdd(rows[i],"DCL_blockArticle");
				noticeCnt += 1;
			}
		}
	}

	if(Filter.bA) {
		var bAN = Filter.bAN;
		var bANid = Filter.bANid;
		var bAT = Filter.bAT;
		var aAN = Filter.aAN;
		var aANid = Filter.aANid;
		var aAT = Filter.aAT;
		var cells,name,idC,title,titleC;
		var idCreg = /window\.open\('http:\/\/gallog\.dcinside\.com\/(\w+)'\)/;
		for( ; i<l ; i+=2) {
			cells = rows[i].cells;
			name = cells[3].textContent.replace(/^\s+|\s+$/g,"");
			idC = idCreg.test(cells[3].innerHTML) ? ("#" + RegExp.$1) : null;
			title = cells[2].children[1];
			titleC = title.innerHTML;

			if(aAN && aAN.test(name) || aANid && idC && aANid.test(idC)) {
				cAdd(rows[i],"DCL_allowArticle");
				cAdd(cells[3],"DCL_nameMatch");
			} else if(aAT && aAT.test(titleC)) {
				cAdd(rows[i],"DCL_allowArticle");
				title.innerHTML = titleC.replace(aAT,"<span class='DCL_titleMatch'>$1</span>");
			} else if(bAN && bAN.test(name) || bANid && idC && bANid.test(idC)) {
				cAdd(rows[i],"DCL_blockArticle");
				cAdd(cells[3],"DCL_nameMatch");
				articleCnt += 1;
				if(blockCnt[name]) {
					blockCnt[name] += 1;
				} else {
					blockCnt[name] = 1;
				}
			} else if(bAT && bAT.test(titleC)) {
				cAdd(rows[i],"DCL_blockArticle");
				title.innerHTML = titleC.replace(bAT,"<span class='DCL_titleMatch'>$1</span>");
				articleCnt += 1;
				titleCnt += 1;
			}
		}
	}

	if(noticeCnt || articleCnt) {
		var p = cElement("p",rows[0].cells[0],{className:"DCL_blockArticleP"});

		if(noticeCnt) {
			cElement("span",p,"공지("+noticeCnt+")");
		}
		if(articleCnt) {
			for(i in blockCnt) {
				if(blockCnt.hasOwnProperty(i)) {
					cElement("span",p,i+"("+blockCnt[i]+")");
				}
			}
		}
		if(titleCnt) {
			cElement("span",p,"제목("+titleCnt+")");
		}

		cElement("span",p,{className:"DCL_blockTotal",textContent:"전체["+(noticeCnt+articleCnt)+"]"},function(){cToggle(tbody,"DCL_showArticle");});
	}
},
comment : function(table) {
	if(!Filter.inited) {
		Filter.init();
	}
	if(!Filter.bC) {
		return;
	}

	var bCN = Filter.bCN;
	var bCNid = Filter.bCNid;
	var bCT = Filter.bCT;
	var aCN = Filter.aCN;
	var aCNid = Filter.aCNid;
	var aCT = Filter.aCT;

	var rows = table.rows;
	var commentCnt = 0;
	var titleCnt = 0;
	var blockCnt = {};

	var cells,name,idC,title,titleC;
	var idCreg = /window\.open\('http:\/\/gallog\.dcinside\.com\/(\w+)'\)/;
	for(var i=0,l=rows.length ; i<l ; i+=1) {
		cells = rows[i].cells;
		name = cells[0].textContent.replace(/^\s+|\s+$/g,"");
		idC = idCreg.test(cells[0].innerHTML) ? ("#" + RegExp.$1) : null;
		title = cells[1].getElementsByTagName("div")[0] || cells[1];
		titleC = title.firstChild.textContent.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		if(aCN && aCN.test(name) || aCNid && idC && aCNid.test(idC)) {
			cAdd(rows[i],"DCL_allowComment");
			cAdd(cells[0],"DCL_nameMatch");
		} else if(aCT && aCT.test(titleC)) {
			cAdd(rows[i],"DCL_allowComment");
			title.removeChild(title.firstChild);
			cElement("span",[title,0],{innerHTML:titleC.replace(aCT,"<span class='DCL_titleMatch'>$1</span>")});
		} else if(bCN && bCN.test(name) || bCNid && idC && bCNid.test(idC)) {
			cAdd(rows[i],"DCL_blockComment");
			cAdd(cells[0],"DCL_nameMatch");
			commentCnt += 1;
			if(blockCnt[name]) {
				blockCnt[name] += 1;
			} else {
				blockCnt[name] = 1;
			}
		} else if(bCT && bCT.test(titleC)) {
			cAdd(rows[i],"DCL_blockComment");
			title.removeChild(title.firstChild);
			cElement("span",[title,0],{innerHTML:titleC.replace(bCT,"<span class='DCL_titleMatch'>$1</span>")});
			commentCnt += 1;
			titleCnt += 1;
		}
	}

	var p = table.nextElementSibling;
	if(p && cSearch(p,"DCL_blockCommentP")) {
		p.parentNode.removeChild(p);
	}
	if(commentCnt) {
		p = cElement("p",[table,"next"],{className:"DCL_blockCommentP"});

		for(i in blockCnt) {
			if(blockCnt.hasOwnProperty(i)) {
				cElement("span",p,i+"("+blockCnt[i]+")");
			}
		}
		if(titleCnt) {
			cElement("span",p,"내용("+titleCnt+")");
		}

		cElement("span",p,{className:"DCL_blockTotal",textContent:"전체["+commentCnt+"]"},function(){cToggle(table,"DCL_showComment");});
	}
}
};

// 게시물 바로보기
function Layer(t,r,mode) {
	if(!Layer.inited) {
		Layer.init();
		Layer.inited = true;
	}

	var tbody = $id("list_table").tBodies[t];
	this.row = tbody.rows[r];
	cAdd(this.row,"DCL_layerTr");
	this.div = cElement("div",tbody.rows[r+1].cells[1],{className:"DCL_layerDiv"});

	this.mode = mode?mode:"normal";
	this.t = t;
	this.r = r;
	this.no = parseQuery(this.row.cells[2].children[1].href).no;
	this.viewer = new Viewer();

	this.call();
}
Layer.init = function() {
	var width = P.pageWidth;
	var css =
		"tr.DCL_layerTr > td {border-width:2px 0 1px ; border-style:solid ; border-color:#999}" +
		"tr.DCL_layerTr > td:first-child {width:3px ; border-left-width:2px ; -moz-border-radius:5px 0 0 0 ; border-radius:5px 0 0 0}" +
		"tr.DCL_layerTr > td:last-child {width:3px ; border-right-width:2px ; -moz-border-radius:0 5px 0 0 ; border-radius:0 5px 0 0}" +
		"tr.DCL_layerTr+tr > td {border:0 solid #999 ; background:none}" +
		"tr.DCL_layerTr+tr > td:first-child {border-width:0 0 2px 2px ; -moz-border-radius:0 0 0 5px ; border-radius:0 0 0 5px}" +
		"tr.DCL_layerTr+tr > td:last-child {border-width:0 2px 2px 0 ; -moz-border-radius:0 0 5px 0 ; border-radius:0 0 5px 0}" +

		"div.DCL_layerDiv {position:relative ; width:"+(width-20)+"px ; padding:3px 5px ; border-bottom:2px solid #999 ; word-wrap:break-word ; overflow:auto}" +

		"p.DCL_layerTop {font:8pt Tahoma,돋움 ; color:#666}" +
		"p.DCL_layerTop:not(:only-child) {border-bottom:1px solid #666 ; padding-bottom:2px}" +
		"p.DCL_layerBottom {border-top:1px solid #666 ; padding-top:2px ; font:8pt Tahoma,돋움 ; color:#666}" +
		"span.DCL_layerBtn {margin-right:5px ; cursor:pointer}" +
		"span.DCL_layerBtn:hover {color:#000}" +
		"span.DCL_layerLoad {color:#999 ; text-decoration:blink}" +
		"span.DCL_layerData {margin-left:5px ; color:#333}" +
		"span.DCL_layerFile {margin-left:5px ; color:#333}" +
		"span.DCL_layerFile > a {display:none ; margin-left:5px ; color:#999 ; text-decoration:underline}" +
		"span.DCL_layerFile:hover > a {display:inline}" +
		"span.DCL_layerFile > a:hover {color:#000}" +

		"div.DCL_layerContent {margin:5px 0}" +
		"ul.DCL_layerImage {margin-bottom:5px}" +
		"ul.DCL_layerFlash > li {margin-bottom:5px}" +
		"div.DCL_layerText * {max-width:"+(width-40)+"px}" + // scroll20 + td10 + layerDiv10

		"table.DCL_layerComment {width:100% ; margin-top:5px ; border-collapse:collapse ; table-layout:fixed}" +
		"table.DCL_layerComment > caption {border-top:1px solid #999 ; border-bottom:1px solid #999 ; padding:2px 5px ; font:10pt 돋움 ; background-color:#eee ; text-align:left}" +
		"table.DCL_layerComment tr:hover {background-color:#f0f0f0}" +
		"table.DCL_layerComment td {border-bottom:1px solid #ccc}" +
		"table.DCL_layerComment td.com_name {width:120px}" +
		"table.DCL_layerComment td.com_text {width:auto}" +
		"table.DCL_layerComment td.com_chat {width:10px}" +
		"table.DCL_layerComment td.com_ip {width:90px ; font:8pt Tahoma}" +
		"table.DCL_layerComment td.com_btn {width:12px}" +
		"table.DCL_layerComment td.com_btn > img {cursor:pointer}" +
		"table.DCL_layerComment span.line {display:none}" +
		"table.DCL_layerComment span.num2 {margin-left:1em ; font:8pt Tahoma ; color:#999}" +

		"div.DCL_layerContent + p.DCL_replyP {border-top:1px solid #666 ; padding-top:5px}" +
		"p.DCL_replyP {position:relative ; margin:5px 0 ; padding:"+(_GID?"0 45px 0 0":"0 122px 0 105px")+"}" +
		"p.DCL_replyP > input {height:16px ; border:1px solid #999}" +
		"p.DCL_replyP > input:focus {background-color:#f5f5f5 ; border:1px solid #666}" +
		"input.DCL_replyName {position:absolute ; bottom:0 ; left:0 ; width:100px}" +
		"input.DCL_replyMemo {position:relative ; width:100%}" +
		"input.DCL_replyPassword {position:absolute ; bottom:0 ; right:40px ; width:75px}" +
		"input.DCL_replySubmit {position:absolute ; bottom:0 ; right:0 ; width:35px ; height:18px !important ; font:8pt 돋움}" +

		"div.DCL_layerActive, tr.DCL_layerActive > td, tr.DCL_layerActive+tr > td {border-color:#333 !important}";

	if(P.layerThumb) {
		var tw = P.thumbWidth;
		var th = P.thumbHeight;
		css +=
			"div.DCL_layerContent img {max-width:" + tw + "px !important ; max-height:" + th + "px}" +
			"ul.DCL_layerImage > li {float:left ; width:" + tw + "px ; height:" + th + "px ; margin:5px ; background-color:#f5f5f5 ; border:1px solid #999"+(BROWSER.opera?"":" ; text-align:center")+"}" + // opera 버그
			"ul.DCL_layerImage > li > img {background-color:#fff}" +
			"ul.DCL_layerImage:after {content:'' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}";
	} else {
		css +=
			"ul.DCL_layerImage > li {margin-bottom:10px}" +
			"ul.DCL_layerImage > li > img {max-width:"+(width-42)+"px ; border:1px solid #999}"; // scroll20 + td10 + layerDiv10 + border2
	}

	if(MODE.list) {
		css +=
			"body.DCL_wideOn tr.DCL_layerActive > td {height:"+(BROWSER.chrome?44:50)+"px ; border-width:2px 0 ; border-style:solid ; -moz-border-radius:0 ; border-radius:0 ; background-color:#f5f5f5}" +
			"body.DCL_wideOn tr.DCL_layerActive > td:first-child {border-left-width:2px ; -moz-border-radius:5px 0 0 5px ; border-radius:5px 0 0 5px}" +
			"body.DCL_wideOn tr.DCL_layerActive + tr > td {border-width:0 ; height:0}"+
			"body.DCL_wideOn div.DCL_layerActive {position:absolute ; margin:-50px 0 0 "+(width-5)+"px ; width:"+(P.wideWidth-20)+"px ; min-height:50px ; "+(P.layerResize?"max-height:"+(document.documentElement.clientHeight-10)+"px ; ":"") + "padding:3px 8px ; border:2px solid #333 ; -moz-border-radius:0 5px 5px 5px ; border-radius:0 5px 5px 5px}" +
			"body.DCL_wideOn div.DCL_layerActive ul.DCL_layerImage > li > img {max-width:"+(P.wideWidth-42)+"px}" + // scroll20 + layerDiv20 + border2
			"body.DCL_wideOn div.DCL_layerActive div.DCL_layerText * {max-width:"+(P.wideWidth-40)+"px}"; // scroll20 + layerDiv20
	}

	if(P.layerResize) {
		var resize = document.documentElement.clientHeight-(P.menuPos==="top"&&P.menuFix?22:0);
		css += "div.DCL_layerDiv {max-height:"+(resize-34)+"px}";
		if(MODE.list) {
			css += "body.DCL_wideOn div.DCL_layerActive {max-height:"+(resize-10)+"px}";
		}
	}
	addStyle(css);
};

Layer.list = {};
Layer.add = function(t) {
	if(!Layer.list[t]) {
		Layer.list[t] = {};
	}
	var rows = $id("list_table").tBodies[t].rows;
	var img,a,link;
	for(var i=2,l=rows.length-2 ; i<l ; i+=2) {
		img = rows[i].cells[2].children[0];
		a = rows[i].cells[2].children[1];
		if(P.layerLink) {
			img.addEventListener("click",Layer.link,false);
			a.addEventListener("click",Layer.toggle,false);
		} else {
			img.addEventListener("click",Layer.toggle,false);
		}
		if(P.layerReply && (link=rows[i].cells[2].getElementsByTagName("a")[1])) {
			link.addEventListener("click",Layer.toggle,false);
		}
	}
};
Layer.toggle = function(e) {
	ePrevent(e);

	var target = e.currentTarget;
	var row = target.parentNode.parentNode;
	var mode;
	if(row.nodeName === "TR") {
		mode = "normal";
	} else {
		row = row.parentNode;
		mode = "comment";
	}

	var t = row.parentNode.getAttribute("DCL_tbody");
	var r = row.sectionRowIndex;
	var layer = Layer.list[t][r];
	if(layer) {
		if(layer.mode === mode) {
			layer.close();
		} else {
			layer.close();
			Layer.create(t,r,mode);
		}
	} else {
		Layer.create(t,r,mode);
	}
};
Layer.link = function(e) {
	location.href = e.target.nextElementSibling.href;
};
Layer.create = function(t,r,mode) {
	Layer.list[t][r] = new Layer(t,r,mode);
};
Layer.close = function(t) {
	var layers = Layer.list[t];
	for(var i in layers) {
		if(layers.hasOwnProperty(i)) {
			layers[i].close();
		}
	}
};

Layer.prototype.call = function() {
	var layer = this;
	var div = this.div;
	var row = this.row;
	var viewer = this.viewer;
	viewer.clear();

	div.innerHTML = "";
	var btns = cElement("p",div,{className:"DCL_layerTop"});
	cElement("span",btns,{textContent:"닫기",className:"DCL_layerBtn"},function(){layer.close();});
	var loadSpan = cElement("span",btns,{className:"DCL_layerLoad",textContent:"읽는 중..."});

	var now = Layer.now;
	if(now && now !== this) {
		var offset = row.getBoundingClientRect().top;
		if(P.layerSingle) {
			now.close();
		} else {
			now.blur();
		}
		SCROLL.scrollTop += row.getBoundingClientRect().top - offset;
	}
	cAdd(row,"DCL_layerActive");
	cAdd(div,"DCL_layerActive");
	cAdd(document.body,"DCL_layerOn");
	Layer.now = this;

	simpleRequest(
		"http://gall.dcinside.com/list.php?id="+_ID+"&no="+this.no,
		function(response) {
			if(!Layer.list[layer.t][layer.r]) {
				return;
			}
			var text = response.responseText;
			if(text.substr(0,9) === "<!DOCTYPE") {
				text = text.substring(text.indexOf("<script>document.domain='dcinside.com';"),text.lastIndexOf("<!-- 페이징 -->"));

				var imgHTML = text.substring(text.indexOf("<div id='bgRelaBig'"),text.indexOf("<div id='bgRela'"));
				if(!imgHTML) { // 삭제된 게시물
					loadSpan.textContent = "삭제된 글입니다.";
					return;
				}

				div.innerHTML = "";
				var fragment = document.createDocumentFragment();

				var topBtn = cElement("p",fragment,{className:"DCL_layerTop"});
				cElement("span",topBtn,{textContent:"닫기",className:"DCL_layerBtn"},function(){layer.close();});
				cElement("span",topBtn,{textContent:"새로고침",className:"DCL_layerBtn"},function(){layer.call();});

				if(layer.mode === "normal" && (P.layerText || P.layerImage)) {
					var contentDiv = cElement("div",fragment,{className:"DCL_layerContent"});

					if(P.layerImage) {
						var imgReg = /src='(http:\/\/\w+\.dcinside\.com\/viewimage\.php[^']+)|src="(http:\/\/uccfs\.paran\.com[^"]+)/g;
						var imgExec = imgReg.exec(imgHTML);
						if(imgExec) {
							var imgUl = cElement("ul",contentDiv,{className:"DCL_layerImage"});
							var imgLi;
							var img,src;
							do {
								src = imgExec[1] || imgExec[2];
								imgLi = cElement("li",imgUl);
								img = cElement("img",imgLi,{src:src});
								viewer.add(src,img);
							} while( (imgExec=imgReg.exec(imgHTML)) );

						}

						var flashReg = /src='(http:\/\/mediafile\.dcinside\.com[^']+)|insertFlash\("(http:\/\/flvs\.daum\.net[^"]+)", (\d+), (\d+)/g;
						var flashExec = flashReg.exec(imgHTML);
						if(flashExec) {
							var flashUl = cElement("ul",contentDiv,{className:"DCL_layerFlash"});
							var flashLi;
							do {
								flashLi = cElement("li",flashUl);
								cElement("object",flashLi,{type:"application/x-shockwave-flash",data:flashExec[1]||flashExec[2],width:flashExec[3]||400,height:flashExec[4]||300});
							} while( (flashExec=flashReg.exec(imgHTML)) );
						}
					}

					if(P.layerText) {
						var textDiv = cElement("div",contentDiv,{className:"DCL_layerText",innerHTML:text.substring(text.indexOf("<!-- google_ad_section_start -->")+32,text.lastIndexOf("<!-- google_ad_section_end -->"))});
						var textImgs = getImgs(textDiv);
						var textImg;
						for(var i=0,l=textImgs.length ; i<l ; i+=1) {
							textImg = textImgs[i];
							textImg.removeAttribute("width");
							textImg.removeAttribute("height");
							viewer.add(textImg.src,textImg);
						}
						autoLink(textDiv);
					}

					if(P.hide) {
						Hide.apply(contentDiv);
					}
				}

				if(P.layerComment || layer.mode === "comment") {
					var ci = text.lastIndexOf("<table class=\"comment-table\"");
					var si = text.indexOf("<tr>",ci);
					var ei = text.indexOf("</table>",ci);

					if(si > -1 && ei > -1 && si < ei) {
						var commentTable = cElement("table",fragment,{className:"DCL_layerComment",innerHTML:text.substring(si,ei)});
						var caption = cElement("caption",commentTable);
						var rows = commentTable.rows;
						var lc = rows[0].cells.length-1;
						var btn,onclick;
						var name,cc=0;
						var reg1 = /show_delbox\((\d+),\d+\)/;
						var reg2 = /new_delComment\d*\('\w+',\d+,(\d+)\)/;
						var delExec;
						for(var i=0,l=rows.length ; i<l ; i+=1) {
							if( (btn=rows[i].cells[lc].children[0]) && (onclick=btn.getAttribute("onclick")) ) {
								eRemove(btn,"onclick");
								if( (delExec=reg1.exec(onclick)) ) {
									btn.setAttribute("DCL_del_password","1");
								} else if( !(delExec=reg2.exec(onclick)) ) {
									return;
								}
								btn.addEventListener("click",function(e){layer.delComment(e);},false);
								btn.setAttribute("DCL_del_no",layer.no);
								btn.setAttribute("DCL_del_c_no",delExec[1]);
							}
							name = rows[i].cells[0].children[0];
							if(name.nodeName === "STRONG" && name.textContent === "댓글돌이") {
								cc += 1;
							}
						}
						if(P.filter) {
							Filter.comment(commentTable);
						}
						caption.textContent = "[덧글 " + (l-cc) + "개]";
						layer.row.cells[2].children[2].children[0].textContent = "["+(l-cc)+"]";
					} else {
						layer.row.cells[2].children[2].children[0].textContent = "";
					}

					var replyP = cElement("p",fragment,{className:"DCL_replyP"});
					var rMemo = cElement("input",replyP,{type:"text",className:"DCL_replyMemo"});
					rMemo.addEventListener("keypress",function(e){if(e.keyCode===13){layer.reply();}},false);
					layer.rMemo = rMemo;
					if(!_GID) {
						var rName = cElement("input",[replyP,0],{type:"text",className:"DCL_replyName"}); // name
						var rPassword = cElement("input",replyP,{type:"password",className:"DCL_replyPassword"}); // password
						rPassword.addEventListener("keypress",function(e){if(e.keyCode===13){layer.reply();}},false);
						if(P.autoForm) {
							rName.value = P.autoName;
							rPassword.value = P.autoPassword;
						}
					}
					cElement("input",replyP,{type:"button",className:"DCL_replySubmit",value:"확인"},function(){layer.reply();});
					cElement("span",topBtn,{textContent:"덧글",className:"DCL_layerBtn"},function(){rMemo.focus();});
				}

				var ipReg = /(?:IP Address : (\d+\.\d+\.\*\*\*\.\*\*\*))?<br \/>(\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}) <br \/>/g;
				var ipExec,ip,time;
				while( (ipExec=ipReg.exec(text)) ) {
					ip = ipExec[1];
					time = ipExec[2];
				}

				cElement("span",topBtn,{textContent:"[시간 "+time+(ip?" / IP "+ip:"")+"]",className:"DCL_layerData"});

				var fileReg = /\t<td align="right" colspan="3" style="font\-size:12px;" nowrap><font color=aaaaaa><B>.+<\/B><\/td>\n/;
				var file = fileReg.exec(text);
				if(file) {
					file = file[0].split("<br/>");
					fileReg = /<a class='txt03' href='(.+)' >(.+)<\/a>/;
					var fileExec;
					var fileHTML = "";
					for(var i=0,l=file.length-1 ; i<l ; i+=1) {
						fileExec = fileReg.exec(file[i]);
						fileHTML += "<a href='"+fileExec[1]+"'>"+fileExec[2]+"</a>";
					}
					cElement("span",topBtn,{className:"DCL_layerFile",innerHTML:"첨부파일("+l+")"+fileHTML});
				}

				var bottomBtn = cElement("p",fragment,{className:"DCL_layerBottom"});
				cElement("span",bottomBtn,{textContent:"닫기",className:"DCL_layerBtn"},function(){layer.close();});
				cElement("span",bottomBtn,{textContent:"새로고침",className:"DCL_layerBtn"},function(){layer.call();});
				cElement("span",bottomBtn,{className:"DCL_layerLoad"});

				div.appendChild(fragment);
			} else { // 로드 에러
				cElement("span",[btns,1],{textContent:"새로고침",className:"DCL_layerBtn"},function(){layer.call();});
				loadSpan.textContent = "읽기 실패";
			}

			if(Layer.now === layer) {
				layer.focus();
			}
		}
	);
};
Layer.prototype.focus = function() {
	var top = this.row.getBoundingClientRect().top - (P.menuPos==="top"&&P.menuFix?22:0);
	var bottom = this.div.getBoundingClientRect().bottom;
	var height = document.documentElement.clientHeight;
	if(top<0 || bottom-top>height) { // layer 의 top 이 현재 화면 영역 위로 올라간 경우
		SCROLL.scrollTop += top;
	} else if(bottom > height) { // layer 의 bottom 이 현재 화면 영역 아래로 내려간 경우
		SCROLL.scrollTop += bottom - height;
	}
};
Layer.prototype.blur = function() {
	if(Layer.now !== this) {
		return;
	}
	cRemove(this.row,"DCL_layerActive");
	cRemove(this.div,"DCL_layerActive");
	Layer.now = null;
	cRemove(document.body,"DCL_layerOn");
};
Layer.prototype.close = function() {
	this.blur();
	cRemove(this.row,"DCL_layerTr");
	this.div.parentNode.removeChild(this.div);
	delete Layer.list[this.t][this.r];
};
Layer.prototype.reply = function(){
	var memo = this.rMemo;
	if(!memo.value) {
		alert("덧글 내용을 입력하세요.");
		memo.focus();
		return;
	}
	var data = "id="+_ID+"&no="+this.no+"&memo="+encodeURIComponent(memo.value);
	if(!_GID) {
		var rName = memo.previousSibling;
		var rPassword = memo.nextSibling;
		if(!rName.value) {
			alert("이름을 입력하세요.");
			rName.focus();
			return;
		}
		if(!rPassword.value) {
			alert("비밀번호를 입력하세요.");
			rPassword.focus();
			return;
		}
		data += "&name="+encodeURIComponent(rName.value)+"&password="+encodeURIComponent(rPassword.value);
	}

	this.div.lastChild.lastChild.textContent = "덧글 등록 중...";
	var layer = this;

	simpleRequest(
		"http://gall.dcinside.com/comment_ok.php",
		function(response) {
			layer.div.lastChild.lastChild.textContent = "";
			var res = /<COMMENTOK RESULT = "(\w+)" ALERT="(.*)" \/>/.exec(response.responseText);
			if(!res) {
				alert("덧글 등록 중 오류가 발생했습니다.\n\n#code\n"+response.responseText);
				return;
			}
			if(res[1] === "1") {
				layer.call();
			} else {
				alert(res[2]);
			}
		},
		"POST",
		{"Accept":"text/html","Content-Type":"application/x-www-form-urlencoded"},
		data
	);
};
Layer.prototype.delComment = function(e) {
	var btn = e.target;
	var password;
	if(btn.getAttribute("DCL_del_password")) {
		password = prompt("비밀번호를 입력하세요.","");
		if(!password) {
			return;
		}
	}
	if(!confirm("덧글을 삭제하겠습니까?")) {
		return;
	}

	this.div.lastChild.lastChild.textContent = "덧글 삭제 중...";
	var layer = this;

	simpleRequest(
		"http://gall.dcinside.com/delcomment_ok.php?id=" + _ID + "&no=" + btn.getAttribute("DCL_del_no") + "&c_no=" + btn.getAttribute("DCL_del_c_no") + (password?"&password="+password:""),
		function(response) {
			layer.div.lastChild.lastChild.textContent = "";
			var res = /<DELCOMMENTOK RESULT = "(\w+)"  ALERT="(.*)"  \/>/.exec(response.responseText);
			if(!res) {
				alert("덧글 삭제 중 오류가 발생했습니다.\n\n#code\n"+response.responseText);
				return;
			}
			if(res[1] === "1") {
				layer.call();
			} else {
				alert(res[2]);
			}
		}
	);
};

// 이미지 뷰어
function Viewer() {
	this.list = [];
}
Viewer.init = function() {
	var box,img,btn,indexSpan,ratioSpan;
	var index,height,width,x,y,ratio,moved,downed,wheeled;
	var open,load,error,close,down,up,contextmenu,move,remove,key,wheel,fit,zoom,position;

	open = function(i) {
		var list = Viewer.list;
		if(i < 0) {
			i = 0;
		} else if(i > list.length-1) {
			i = list.length - 1;
		}
		if(i === index) {
			return;
		}
		Viewer.on = true;
		index = i;
		indexSpan.textContent = (index+1) + "/" + (list.length) + " (읽는 중)";
		height=width=x=y=ratio=0;
		box.style.display = "block";
		img.style.visibility = "hidden";
		img.removeAttribute("width");
		img.removeAttribute("height");
		img.src = list[i];
		box.style.cursor = "progress";
	};
	load = function() {
		height = img.height;
		width = img.width;
		indexSpan.textContent = (index+1) + "/" + (Viewer.list.length) + " (" + width + "*" + height + ")";
		fit();
		img.style.visibility = "visible";
		box.style.cursor = "crosshair";
	};
	error = function() {
		indexSpan.textContent = (index+1) + "/" + (Viewer.list.length) + " (읽기 실패)";
		box.style.cursor = "not-allowed";
	};
	close = function() {
		box.style.display = "none";
		img.src = "";
		index = null;
		moved = false;
		downed = false;
		wheeled = false;
		Viewer.on = false;
		cRemove(document.body,"DCL_hideMovAll");
		remove();
	};
	down = function(e) {
		if(e.button !== 0) {
			return;
		}
		moved = false;
		downed = true;
		wheeled = false;
		if(e.target.id === "DCL_viewerImg") {
			x = e.clientX;
			y = e.clientY;
			document.addEventListener("mousemove",move,false);
			document.addEventListener("mouseout",remove,false);
		}
		ePrevent(e);
	};
	up = function(e) {
		if(e.button === 2 && e.target.id !== "DCL_viewerImg") {
			zoom(1);
		}
		if(e.button === 0 && !moved && !wheeled) {
			close();
		}
		moved = false;
		downed = false;
		wheeled = false;
		remove();
	};
	contextmenu = function(e) {
		if(e.target.id !== "DCL_viewerImg") {
			ePrevent(e);
		}
	};
	move = function(e) {
		position(img.getBoundingClientRect().left+e.clientX-x,img.getBoundingClientRect().top+e.clientY-y);
		x = e.clientX;
		y = e.clientY;
		moved = true;
	};
	remove = function() {
		document.removeEventListener("mousemove",move,false);
		document.removeEventListener("mouseout",remove,false);
	};
	key = function(e) {
		if(!Viewer.on) {
			return;
		}
		var code = e.keyCode;
		var rect = img.getBoundingClientRect();
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		if(code === 37) { // left
			if(rect.left < 0) {
				position(rect.left+100,false);
			}
		} else if(code === 38) { // up
			if(rect.top < 0) {
				position(false,rect.top+100);
			}
		} else if(code === 39) { // right
			if(rect.right > width) {
				position(rect.left-100,false);
			}
		} else if(code === 40) { // down
			if(rect.bottom > height) {
				position(false,rect.top-100);
			}
		} else if(code === 33) { // pageup
			if(rect.top < 0) {
				position(false,rect.top+height-100);
			}
		} else if(code === 34) { // pagedown
			if(rect.bottom > height) {
				position(false,rect.top-height+100);
			}
		} else if(code === 36) { // home
			if(rect.top < 0) {
				position(false,0);
			}
		} else if(code === 35) { // end
			if(rect.bottom > height) {
				position(false,height-img.height);
			}
		} else if(code === 8) { // backspace
			open(index-1);
		} else if(code === 13) { // enter
			open(index+1);
		} else if(code === 107 || code === 187) { // +
			zoom("+");
		} else if(code === 109 || code === 189) { // -
			zoom("-");
		} else if(code === 27) { // esc
			close();
		} else {
			return;
		}
		ePrevent(e);
	};
	wheel = function(e) {
		wheeled = true;
		var up = e.detail<0 || e.wheelDelta>0; // FF&Opera<0,Chrome>0

		if(e.altKey || downed) {
			var r = ratio;
			if(up) {
				r = (Math.floor(ratio*10)+1)/10;
			} else {
				r = (Math.ceil(ratio*10)-1)/10;
			}
			zoom(r);
			remove();
		} else {
			if(up) {
				open(index-1);
			} else {
				open(index+1);
			}
		}
		ePrevent(e);
	};
	fit = function() {
		var ch = document.documentElement.clientHeight;
		var cw = document.documentElement.clientWidth;
		zoom(Math.min(1,ch/height,cw/width));
		position((cw-width*ratio)/2,(ch-height*ratio)/2);
	};
	zoom = function(r) {
		if(r === "+") {
			r = (Math.floor(ratio*10)+1)/10;
		} else if(r === "-") {
			r = (Math.ceil(ratio*10)-1)/10;
		}
		if(r < 0.1) {
			r = 0.1;
		} else if(r > 3) {
			r = 3;
		}
		if(r === ratio) {
			return;
		}
		ratio = r;

		var rect = img.getBoundingClientRect();
		var x_ = rect.left + img.width/2 - width*ratio/2;
		var y_ = rect.top + img.height/2 - height*ratio/2;
		img.height = Math.round(height*ratio);
		img.width = Math.round(width*ratio);
		ratioSpan.textContent = Math.round(ratio*100) + "%";
		position(x_,y_);
	};
	position = function(x_,y_) {
		if(x_ !== false) {
			var mw = document.documentElement.clientWidth - img.width;
			if(0 > mw) {
				if(x_ < mw) {
					x_ = mw;
				} else if(x_ > 0) {
					x_ = 0;
				}
			} else {
				if(x_ > mw) {
					x_ = mw;
				} else if(x_ < 0) {
					x_ = 0;
				}
			}
			img.style.left = Math.round(x_) + "px";
		}

		if(y_ !== false) {
			var mh = document.documentElement.clientHeight - img.height;
			if(0 > mh) {
				if(y_ < mh) {
					y_ = mh;
				} else if(y_ > 0) {
					y_ = 0;
				}
			} else {
				if(y_ > mh) {
					y_ = mh;
				} else if(y_ < 0) {
					y_ = 0;
				}
			}
			img.style.top = Math.round(y_) + "px";
		}
	};

	addStyle(
		"div#DCL_viewerDiv {position:fixed ; overflow:hidden ; top:0 ; left:0 ; width:100% ; height:100% ; z-index:102 ; display:none}" +
		"div#DCL_viewerBack {position:fixed ; top:0 ; left:0 ; width:100% ; height:100% ; background-color:#000 ; opacity:0.8}" +
		"img#DCL_viewerImg {position:absolute ; background-color:#fff ; cursor:all-scroll ; cursor:-moz-grab}" +
		"div#DCL_viewerBtn {position:absolute ; top:2px ; right:0}" +
		"div#DCL_viewerBtn > span {font:10pt 돋움 ; -moz-border-radius:4px ; border-radius:4px ; padding:2px 3px ; margin-right:1px ; color:#fff ; background-color:#333 ; opacity:0.8 ; cursor:pointer}" +
		"body.DCL_hideMovAll object, body.DCL_hideMovAll embed {visibility:hidden}" // 이미지 뷰어 사용시 object 가 가리는 것 방지 (일일이 wmode 를 부여할 수는 없음)
	);

	document.addEventListener("keydown",key,false);

	box = cElement("div",document.body,{id:"DCL_viewerDiv"});
	box.addEventListener("mousedown",down,false);
	box.addEventListener("mouseup",up,false);
	box.addEventListener("DOMMouseScroll",wheel,false);
	box.addEventListener("mousewheel",wheel,false);
	box.addEventListener("contextmenu",contextmenu,false);
	box.addEventListener("click",ePrevent,false);

	cElement("div",box,{id:"DCL_viewerBack"});

	img = cElement("img",box,{id:"DCL_viewerImg"});
	img.addEventListener("load",load,false);
	img.addEventListener("error",error,false);
	img.addEventListener("dragstart",ePrevent,false);

	btn = cElement("div",box,{id:"DCL_viewerBtn"});
	btn.addEventListener("mousedown",ePrevent,false); // drag 방지
	btn.addEventListener("mouseup",ePrevent,false); // 닫기 방지

	ratioSpan = cElement("span",btn,"100%");
	indexSpan = cElement("span",btn,"0/0");
	cElement("span",btn,"이전",function(){open(index-1);});
	cElement("span",btn,"다음",function(){open(index+1);});
	cElement("span",btn,"축소",function(){zoom("-");});
	cElement("span",btn,"확대",function(){zoom("+");});
	cElement("span",btn,"원본",function(){zoom(1);});
	cElement("span",btn,"창맞춤",fit);
	cElement("span",btn,"닫기",close);

	Viewer.open = open;
	Viewer.inited = true;
};
Viewer.prototype.add = function(src,obj) {
	var i = this.list.length;
	this.list[i] = src;
	cAdd(obj,"DCL_viewerItem");
	obj.addEventListener("click",function(instance){return function(){instance.run(i);};}(this),false);
};
Viewer.prototype.run = function(i) {
	if(!Viewer.inited) {
		Viewer.init();
	}
	cAdd(document.body,"DCL_hideMovAll");
	Viewer.on = true;
	Viewer.list = this.list;
	Viewer.open(i);
};
Viewer.prototype.clear = function() {
	this.list.length = 0;
};

// 이미지 모아보기
function Album(page) {
	if(!Album.inited) {
		if(!(P.albumDC || P.albumParan || P.albumLink)) {
			alert("모아보기 기능을 사용하지 않고 있습니다.\n설정을 확인하세요.");
			return;
		}
		Album.init();
	}

	Album.on = true;
	Album.complete = false;
	Album.page = page;
	document.body.style.overflow = "hidden";
	cAdd(document.body,"DCL_hideMovAll");
	$id("DCL_albumDiv").style.display = "block";
	$id("DCL_albumLoad").textContent = "읽는 중...";
	$id("DCL_albumUl").innerHTML = "";

	var albumPage = $id("DCL_albumPage");
	albumPage.innerHTML = "";
	var p = (Math.ceil(page/10)-1)*10+1;
	if(p>10) {
		cElement("span",albumPage,"다음",function(i){return function(){Album(i);};}(p-1));
	}
	for(var l=p+10 ; p<l ; p+=1) {
		cElement("span",albumPage,{textContent:p,className:(p===page?"DCL_albumNow":"")},function(i){return function(){Album(i);};}(p));
	}
	cElement("span",albumPage,"이전",function(i){return function(){Album(i);};}(p));

	Album.display();
}
Album.init = function() {
	var width = P.thumbWidth;
	var height = P.thumbHeight;
	var cols = Math.floor(document.documentElement.clientWidth/(width+20));

	addStyle(
		"div#DCL_albumDiv {position:fixed ; overflow:hidden ; top:0 ; left:0 ; width:100% ; height:100% ; z-index:101}" +
		"div#DCL_albumBack {position:absolute ; top:0 ; width:100% ; height:100% ; background-color:#000 ; opacity:0.6}" +
		"div#DCL_albumWrap {position:absolute ; top:0 ; width:100% ; height:100% ; overflow:auto}" +
		"p#DCL_albumP {overflow:hidden ; height:30px ; font:11pt Tahoma,돋움 ; color:#fff ; background-color:#333}" +
		"span.DCL_albumBtn {margin-left:10px ; cursor:pointer}" +
		"span#DCL_albumPage {margin-left:15px}" +
		"span#DCL_albumPage > span {margin:5px ; cursor:pointer}" +
		"span#DCL_albumPage > span.DCL_albumNow {font-size:16pt}" +
		"span#DCL_albumLoad {margin-left:20px}" +
		"ul#DCL_albumUl {position:relative ; overflow:auto ; width:" + (width+20)*cols + "px ; margin:10px auto}" +
		"ul#DCL_albumUl > li {float:left ; position:relative ; width:" + width + "px ; height:" + (height+40) + "px ; margin:5px ; border-width:5px ; border-style:solid ; background-color:#f5f5f5 ; text-align:center}" +
		"ul#DCL_albumUl > li.DCL_albumDC {border-color:#000}" +
		"ul#DCL_albumUl > li.DCL_albumParan {border-color:#039}" +
		"ul#DCL_albumUl > li.DCL_albumLink {border-color:#999}" +
		"ul#DCL_albumUl img {max-width:" + width + "px ; max-height:" + height + "px ; background-color:#fff}" +
		"ul#DCL_albumUl p {position:absolute ; overflow:hidden ; bottom:0 ; padding:10px 5px 0 ; width:" + (width-10) + "px ; height:30px ; line-height:15px ; background-color:#ddd}" +
		"ul#DCL_albumUl > li:hover p {background-color:#fff}" +
		"ul#DCL_albumUl span {font-weight:bold ; color:#333 ; margin-right:0.5em}" +
		"ul#DCL_albumUl a:visited {color:#666}"
	);

	Album.on = false; // 앨범 상태 여부
	Album.complete = false; // 렌더링 여부 ; 연결이 여러개이므로 다른 연결에 의해 렌더링(display)이 시작되었는지 체크
	Album.page = 0; // 현재 페이지

	Album.pData = {}; // 페이지별 이미지가 포함된 글의 번호
	Album.aData = {}; // 글의 데이터
	Album.rData = {}; // 재시도 내역

	Album.viewer = new Viewer();
	Album.inited = true;

	var div = cElement("div",document.body,{id:"DCL_albumDiv"});
	cElement("div",div,{id:"DCL_albumBack"});
	var wrap = cElement("div",div,{id:"DCL_albumWrap"});
	var albumP = cElement("p",wrap,{id:"DCL_albumP"});
	cElement("span",albumP,{textContent:"닫기",className:"DCL_albumBtn"},Album.close);
	cElement("span",albumP,{textContent:"새로고침",className:"DCL_albumBtn"},Album.reload);
	cElement("span",albumP,{id:"DCL_albumPage"});
	cElement("span",albumP,{id:"DCL_albumLoad"});
	cElement("ul",wrap,{id:"DCL_albumUl"});
};
Album.display = function() {
	if(!Album.on || Album.complete) {
		return;
	}

	var albumLoad = $id("DCL_albumLoad");
	var pData = Album.pData[Album.page];
	if(pData) {
		var no;
		var load = 0;
		for(var i=0,l=pData.length ; i<l ; i+=1) {
			no = pData[i];
			if(Album.aData.hasOwnProperty(no) && Album.aData[no].status) {
				load += 1;
			} else {
				Album.aCall(no);
			}
		}
		albumLoad.textContent = "글 읽는 중... (" + Math.floor(load*100/l) + "%)";
		if(load < l) {
			return;
		}
	} else {
		albumLoad.textContent = "목록 읽는 중...";
		Album.pCall(Album.page);
		return;
	}

	Album.complete = true;
	Album.viewer.clear();
	albumLoad.textContent = "읽기 완료...";

	var fragment = document.createDocumentFragment();
	var data,imgs,li,img,p;
	var regexp = /^(http:\/\/uccfs\.paran\.com\/.+\/)IMG(\/.+)(_.\.\w+)$/;
	var count = 0;
	for(var i=0,l=pData.length ; i<l ; i+=1) {
		data = Album.aData[pData[i]];
		imgs = data.imgs;
		for(var j=imgs.length ; j-- ; ) {
			count += 1;
			li = cElement("li",fragment,{className:"DCL_album"+imgs[j][1]});
			img = cElement("img",li,{alt:data.title+" ("+(j+1)+")",src:imgs[j][0].replace(regexp,"$1THUMB$2_thumb1$3")});
			Album.viewer.add(imgs[j][0],img);
			p = cElement("p",li);
			cElement("span",p,data.name);
			cElement("a",p,{href:"http://gall.dcinside.com/list.php?id="+_ID+"&no="+data.no,target:"_blank",textContent:data.title});
		}
	}
	$id("DCL_albumUl").appendChild(fragment);
	albumLoad.textContent = "전체 이미지 " + count + " 개";
};
Album.pCall = function(page) {
	if(Album.pData.hasOwnProperty(page)) {
		return;
	}

	simpleRequest(
		"http://gall.dcinside.com/list.php?id="+_ID+"&page="+page,
		function(response) {
			var text = response.responseText;
			if(text.substr(0,9) === "<!DOCTYPE") {
				var regexp = new RegExp("<img src='http://wstatic\.dcinside\.com/gallery/skin/skin_new/(?:"+("|img_icon\.jpg"+"|movie_icon\.gif"+"|new_head\.gif").substr(1)+")' ?/>\\s*<a href=\"/list\.php\\?id="+_ID+"&no=(\\d+)","g");
				var exec;
				Album.pData[page] = [];
				while( (exec=regexp.exec(text)) ) {
					var no = exec[1];
					Album.pData[page].push(no);
					if(!Album.aData.hasOwnProperty(no)) {
						Album.aCall(no);
					}
				}
				Album.display();
			} else { // 응답을 못받았을 경우(과다 사용자)
				$id("DCL_albumLoad").textContent = "읽기 실패";
			}
		}
	);
};
Album.aCall = function(no) {
	if(Album.aData.hasOwnProperty(no)) {
		return;
	}
	Album.aData[no] = {status:false};

	simpleRequest(
		"http://gall.dcinside.com/list.php?id="+_ID+"&no="+no,
		function(response) {
			var text = response.responseText;
			if(text.substr(0,9) === "<!DOCTYPE") {
				var data = Album.aData[no];
				data.no = no;
				data.name = /<strong>(?:갤로거|이 름)<\/strong>(?:\n|.)*?>([^<]+)<\/span>/.exec(text)[1];
				data.title = /<strong>제 목<\/strong>(?:\n|.)*?> ([^<]+) <\/td>/.exec(text)[1];
				data.imgs = [];
				data.status = true;
				delete Album.rData[no];

				var html,regexp,exec;
				if( (P.albumDC || P.albumParan) && (html=text.substring(text.indexOf("<div id='bgRelaBig'"),text.indexOf("<div id='bgRela'"))) ) {
					if(P.albumDC) {
						regexp = /src='(http:\/\/\w+.dcinside.com\/viewimage\.php\?[^']+)/g;
						while( (exec=regexp.exec(html)) ) {
							data.imgs.push([exec[1],"DC"]);
						}
					}
					if(P.albumParan) {
						regexp = /src="(http:\/\/uccfs.paran.com[^"]+)/g;
						while( (exec=regexp.exec(html)) ) {
							data.imgs.push([exec[1],"Paran"]);
						}
					}
				}

				if( P.albumLink && (html=text.substring(text.indexOf("<!-- google_ad_section_start -->")+32,text.lastIndexOf("<!-- google_ad_section_end -->"))) ) {
					regexp = /<img [^>]*src=['"]?([^'" ]+)/ig;
					while( (exec=regexp.exec(html)) ) {
						if(!(/wstatic\.dcinside\.com|images\/g_fix\.gif|dc2\.dcinside\.com/.test(exec[1]))) {
							data.imgs.push([exec[1].replace(/&amp;/g,"&"),"Link"]);
						}
					}
				}
			} else { // 응답을 못받았을 경우
				Album.rData[no] = (Album.rData[no] || 0) + 1;
				if(Album.rData[no] < 3) {
					Album.aCall(no); // 2번 이내의 경우 재호출(리턴)
					return;
				} else {
					delete Album.rData[no];
					Album.aData[no].status = true; // 3번째는 뛰어넘기
				}
			}

			Album.display();
		}
	);
};
Album.reload = function() {
	Album.pData = {};
	Album.aData = {};
	Album.rData = {};
	Album(Album.page);
};
Album.close = function() {
	$id("DCL_albumDiv").style.display = "none";
	$id("DCL_albumLoad").textContent = "";
	$id("DCL_albumUl").innerHTML = "";
	Album.on = false;
	cRemove(document.body,"DCL_hideMovAll");
	document.body.style.overflow = "auto";
};

// 이미지 & 동영상 차단
var Hide = {

apply : function(obj) {
	if(!Hide.init) {
		addStyle(
			"span.DCL_hideImgBtn, span.DCL_hideMovBtn {position:absolute ; width:25px ; height:14px ; cursor:pointer ; opacity:0.8 ; z-index:100}" +
			"span.DCL_hideImgBtn:hover, span.DCL_hideMovBtn:hover {opacity:1 !important}" +
			"span.DCL_hideImgBtn {background-image:url('data:image/png;base64,"+BASE64.hideImg+"')}" +
			"span.DCL_hideMovBtn {background-image:url('data:image/png;base64,"+BASE64.hideMov+"')}" +
			"span.DCL_hideOff {background-image:url('data:image/png;base64,"+BASE64.hideOff+"')}" +

			"span.DCL_hideImgBtn {visibility:hidden ; margin-left:-25px}" +
			".DCL_hideImg:hover + span.DCL_hideImgBtn {visibility:visible}" +
			"span.DCL_hideImgBtn:hover {visibility:visible}" +
			".DCL_hideImg.DCL_hideOn {visibility:hidden}" +
			"span.DCL_hideImgBtn.DCL_hideOn {visibility:visible}" +

			"span.DCL_hideMovBtn {opacity:0.5 ; margin:-14px 0 0 -25px}" +
			"a + span.DCL_hideMovBtn.DCL_hideOff {margin-left:-60px}" +
			".DCL_hideMov:hover + span.DCL_hideMovBtn {opacity:0.8}" +
			".DCL_hideMov:hover + a + a + span.DCL_hideMovBtn {opacity:0.8}" +
			".DCL_hideMov.DCL_hideOn {display:none}" +
			"span.DCL_hideMovBtn.DCL_hideOn {opacity:0.8 ; position:relative ; display:block ; margin:0}" +

			"p.DCL_hideBtns {margin-bottom:10px}" +
			"p.DCL_hideBtns > span {display:inline-block ; width:30px ; height:17px ; margin:3px ; cursor:pointer ; opacity:0.5}" +
			"span.DCL_viewAll {background-image:url('data:image/png;base64,"+BASE64.viewAll+"')}" +
			"span.DCL_hideAll {background-image:url('data:image/png;base64,"+BASE64.hideAll+"')}" +
			"p.DCL_hideBtns > span:hover {opacity:1}"
		);
		document.addEventListener("keydown",Hide.keydown,false);
		Hide.init = true;
	}

	var btns = [];
	var index = Hide.list.length;
	Hide.list[index] = btns;
	var i,l,btn,className;

	var imgs = getImgs(obj);
	if(imgs.length) {
		if(P.hideImg) {
			className = "DCL_hideOn";
		} else {
			className = "DCL_hideOff";
		}
		var img;
		for(i=0,l=imgs.length ; i<l ; i+=1) {
			img = imgs[i];
			cAdd(img,"DCL_hideImg "+className);
			btn = cElement("span",[img,"next"],{className:"DCL_hideImgBtn "+className},Hide.receive);
			btns.push(btn);
		}
	}

	var movies = [];
	var objects = obj.getElementsByTagName("object");
	for(i=0,l=objects.length ; i<l ; i+=1) {
		if(objects[i].id !== "mx") { // 기본 플래쉬 광고 예외
			movies.push(objects[i]);
		}
	}
	var embeds = obj.getElementsByTagName("embed");
	for(i=0,l=embeds.length ; i<l ; i+=1) {
		if(embeds[i].parentNode.nodeName !== "OBJECT") {
			movies.push(embeds[i]);
		}
	}
	if(movies.length) {
		if(P.hideMov) {
			className = "DCL_hideOn";
		} else {
			className = "DCL_hideOff";
		}
		var movie,next;
		for(i=0,l=movies.length ; i<l ; i+=1) {
			movie = movies[i];
			cAdd(movie,"DCL_hideMov "+className);
			btn = cElement("span",null,{className:"DCL_hideMovBtn "+className},Hide.receive);
			btns.push(btn);

			next = movie.nextSibling;
			while(next && next.nodeName==="A" && getComputedStyle(next,null).getPropertyValue("-moz-binding").indexOf("chrome://adblockplus/") !== -1) { // Firefox 에서 Adblock Plus 차단 버튼(탭)을 사용하는 경우
				next = next.nextSibling;
			}
			movie.parentNode.insertBefore(btn,next);
		}
	}

	if(btns.length) { // 버튼 넣기
		var allP = cElement("p",[obj,0],{className:"DCL_hideBtns"});
		cElement("span",allP,{className:"DCL_viewAll"},function(){Hide.all(index,true);});
		cElement("span",allP,{className:"DCL_hideAll"},function(){Hide.all(index,false);});
	}
},
list : [],
keydown : function(e) {
	var tag = e.target.nodeName;
	if(tag === "INPUT" || tag === "TEXTAREA" || Viewer.on || Album.on) {
		return;
	}
	var code = e.keyCode;
	var flag = (code===45||code===192)?true : (code===46||code===27)?false : null;
	if(flag !== null) {
		for(var i=0,l=Hide.list.length ; i<l ; i+=1) {
			Hide.all(i,flag);
		}
		ePrevent(e);
	}
},
all : function(index,flag) {
	var btns = Hide.list[index];
	for(var i=0,l=btns.length ; i<l ; i+=1) {
		Hide.toggle(btns[i],flag);
	}
},
receive : function(e) {
	ePrevent(e);
	var btn = e.target;
	Hide.toggle(btn,cSearch(btn,"DCL_hideOn"));
},
toggle : function(btn,flag) {
	if(flag === cSearch(btn,"DCL_hideOff")) {
		return;
	}
	var obj = btn.previousSibling;
	while(obj && obj.nodeName==="A" && getComputedStyle(obj,null).getPropertyValue("-moz-binding").indexOf("chrome://adblockplus/") !== -1) {
		obj = obj.previousSibling;
	}

	if(flag) {
		cSwitch(obj,"DCL_hideOn","DCL_hideOff");
		cSwitch(btn,"DCL_hideOn","DCL_hideOff");
	} else {
		cSwitch(obj,"DCL_hideOff","DCL_hideOn");
		cSwitch(btn,"DCL_hideOff","DCL_hideOn");
	}
}

};

// 실제 실행
function DCINSIDE_LITE() {

	addStyle(
		"#header {overflow:hidden}" +
		"#footer, #copyright, #TB>tbody>tr>td+td, #MinFixWidth, .topAd, #gbar_ad, #adBookmark, #adBookmark5, #dc_advertisement, .submenu_ad, #topfloating, #topAlbaAd, .real_ad, #ad_t_box, #mx, #popLayer, #BtnClose {display:none !important}" +

		"#gallery_title_no {height:42px !important ; background:none !important ; border-bottom:2px solid #6585da}" +
		"#quick_m, #quick_m_no {top:18px !important ; right:0 !important}" +

		"#header, #top_div, .table_link, #gallery_title, #gallery_title_no, body>table, #TB>tbody>tr>td>table, #testDiv>table, body>table:nth-of-type(2)>tbody>tr>td>table:nth-of-type(3)>tbody>tr:nth-of-type(2)>td>table, iframe[src^='http://wstatic.dcinside.com/gallery/top/'], #writeForm {width:"+P.pageWidth+"px !important}" +
		"#bgRelaBig *, #writeForm * {max-width:"+P.pageWidth+"px !important}" +
		"#writeForm {margin:0 auto}" +

		"#bgRelaBig {word-wrap:break-word}" +
		"#bgRelaBig > span div[id^='dc_imgFree_']"+(P.hideZB?", #bgRelaBig>span>img[src^='http://zzbang.dcinside.com/']":"")+" {display:none !important}" +
		"#bgRelaBig div[id^='dc_image_'] {top:auto !important; left:3px !important; bottom:25px}" +
		"#bgRelaBig img[id^='paranimg_m_'] {border:none !important}" +

		"#list_table {table-layout:fixed}" +
		"#list_table > * > tr > td {overflow:hidden}" +
		"#list_table > * > tr > td:first-child, #list_table > * > tr > td:last-child {width:5px}" +
		"#list_table > * > tr > td:nth-child(2) {width:"+(P.listNumber?65:0)+"px}" +
		"#list_table > * > tr > td:nth-child(3) {width:"+(P.pageWidth-(P.listNumber?65:0)-(P.listDate?85:0)-(P.listCount?55:0)-130)+"px}" +
		"#list_table > * > tr > td:nth-child(4) {width:120px}" +
		"#list_table > * > tr > td:nth-child(5) {width:"+(P.listDate?85:0)+"px}" +
		"#list_table > * > tr > td:nth-child(6) {width:"+(P.listCount?55:0)+"px}" +
		"#list_table > tbody > tr:last-child > td {height:5px}" +
		"#list_table > tbody > tr > td:nth-child(3) > img {cursor:pointer}" +
		"#list_table > tbody > tr > td:nth-child(3) > font {cursor:pointer}" +

		"td.DCL_tbodyTitle {padding:3px ; background-color:#eee ; border-bottom:1px dashed #ccc ; border-top:1px solid #ccc}" +
		"td.DCL_tbodyTitle > p:after {content:'' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}" +
		"p.DCL_tbodyBtn {float:left}" +
		"p.DCL_tbodyBtn > span {font:9pt Tahoma,돋움 ; color:#333 ; margin:5px ; cursor:pointer}" +
		"a.DCL_pageLink {color:#fa0 !important}" +
		"span.DCL_tbodyLoad {margin:5px ; font:9pt Tahoma,돋움}" +

		"#reply1 {width:auto !important}" +
		"table.comment-table {table-layout:fixed}" +
		"table.comment-table > colgroup {display:none}" +
		"table.comment-table td.com_name {width:120px}" +
		"table.comment-table td.com_text {width:auto}" +
		"table.comment-table td.com_chat {width:10px}" +
		"table.comment-table td.com_ip {width:90px ; font:8pt Tahoma}" +
		"table.comment-table td.com_btn {width:12px}" +
		"td.com_text > div {display:inline}" +

		"p#DCL_writeBtn {text-align:left}" +
		"p#DCL_writeBtn > span {border:1px solid #bbb ; -moz-border-radius:3px ; border-radius:3px ; padding:2px 7px 3px ; font:8pt Tahoma,돋움 ; background-color:#f9f9f9 ; cursor:pointer}" +

		".DCL_viewerItem {cursor:pointer}" +

		// 로딩 오류시
		"#testDiv {width:"+P.pageWidth+"px ; margin:0 auto}" +
		"#testDiv > table[width='200'], #right_div {display:none}"
	);

	if(P.listComment) {
		addStyle("#list_table > tbody > tr > td:nth-of-type(3) > font > a:empty:after {content:'[0]'}");
	}

	// body에 클래스 추가
	if(!P.header) {
		$id("header").style.display = "none";
	}
	if(!P.title) {
		document.querySelector(".table_link").style.display = "none";
	}
	if(P.wide) {
		wideFunc();
	}

	// 브라우저 타이틀 변경
	if(P.modTitle) {
		var title,titleP,titleT,titleW;
		if(MODE.write) {
			title = P.listTitle;
			titleP = "글쓰기";
			titleT = "";
			titleW = "";
		} else if(MODE.list) {
			title = P.listTitle;
			titleP = PAGE + (P.page&&P.pageCount>1?"~"+P.pageCount:"");
			titleT = "";
			titleW = "";
		} else {
			title = P.articleTitle;
			titleP = "";
			titleT = $id("titleShare").textContent.replace(/^\s+|\s+$/g,"");
			titleW = $id("titleShare").parentNode.parentNode.rows[MODE.article?0:2].cells[2].textContent.replace(/^\s+|\s+$/g,"");
		}
		document.title = title.replace(/\{G\}/g,GALLERY).replace(/\{P\}/g,titleP).replace(/\{T\}/g,titleT).replace(/\{W\}/g,titleW);
	}

	// 메뉴 생성
	if(P.menu) {
		menuFunc();
	}

	// 글쓰기 모드
	if(MODE.write) {
		var editTd = $id("edit_buts").parentNode.parentNode.lastElementChild;
		editTd.innerHTML = "";
		var editP = cElement("p",editTd,{id:"DCL_writeBtn"});
		var editVisual = $id("editVisual");
		var editNomal = $id("editNomal");

		cElement("span",editP,"a 링크",
			function() {
				var href = prompt("삽입할 링크 주소를 입력하세요.","");
				if(!href) {
					return;
				}
				href = "<a href='" + href + "'>" + href.replace(/&(?!amp;)/g,"&amp;") + "</a>";
				if(editNomal.style.display === "block") {
					editNomal.value += href;
				} else {
					editVisual.contentDocument.body.innerHTML += href;
				}
			}
		);
		cElement("span",editP,"swf 링크",
			function() {
				var href = prompt("삽입할 링크 주소를 입력하세요.","");
				if(!href) {
					return;
				}
				var size = prompt("크기를 입력하세요.","가로/세로");
				if(size && (size=size.match(/^(\d+)\/(\d+)$/))) {
					size = " width='" + size[1] + "' height='" + size[2] + "'";
				} else {
					size = "";
				}
				href = "<embed src='"+href.replace(/&(?!amp;)/g,"&amp;")+"'"+size+" type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' allowscriptaccess='always' bgcolor='#ffffff' quality='high' />";
				if(editNomal.style.display === "block") {
					editNomal.value += href;
				} else {
					editVisual.contentDocument.body.innerHTML += href;
				}
			}
		);
		cElement("span",editP,"wmp 링크",
			function() {
				var href = prompt("삽입할 링크 주소를 입력하세요.","");
				if(!href) {
					return;
				}
				var size = prompt("크기를 입력하세요.","가로/세로");
				if(size && (size=size.match(/^(\d+)\/(\d+)$/))) {
					size = " width='" + size[1] + "' height='" + size[2] + "'";
				} else {
					size = "";
				}
				href = "<embed src='"+href.replace(/&(?!amp;)/g,"&amp;")+"'"+size+" type='application/x-mplayer2' pluginspage='http://www.microsoft.com/windows/mediaplayer/' />";
				if(editNomal.style.display === "block") {
					editNomal.value += href;
				} else {
					editVisual.contentDocument.body.innerHTML += href;
				}
			}
		);
		cElement("span",editP,"my Tag",
			function() {
				if(editNomal.style.display === "block") {
					editNomal.value += P.myTag;
				} else {
					editVisual.contentDocument.body.innerHTML += P.myTag;
				}
			}
		);

		// 자동입력
		if(P.autoForm) {
			var autoName = $id("name");
			var autoPassword = $id("password");
			if(autoName) {
				autoName.value = P.autoName;
				autoName.style.background = "";
			}
			if(autoPassword) {
				autoPassword.value = P.autoPassword;
				autoPassword.style.background = "";
			}
		}

		// 글제목 길이 제한 없애기
		$id("subject").removeAttribute("maxLength");

		// 페이지를 벗어날 때 확인
		window.addEventListener("beforeunload",
			function(e) {
				if($id("zb_waiting").style.visibility !== "visible") {
					ePrevent(e);
					return "현재 페이지에서 나가시겠습니까?";
				}
			},
		false);

	} else {
		// 글쓰기 이외 모드

		// 본문보기 모드
		if(MODE.article) {
			var bgRelaBig = $id("bgRelaBig");

			// 본문 내용에 작업할 id 가 포함되어 있는 경우 제거
			var check = bgRelaBig.querySelectorAll("#list_table, #right_div, #testDiv, #share_name, #titleShare, #reply1, #rep_page, #name, #password, #memo");
			for(var i=0,l=check.length ; i<l ; i+=1) {
				check[i].removeAttribute("id");
			}

			bgRelaBig.parentNode.style.padding = "10px 0";

			// 본문 내 이미지 작업
			var articleImgs = getImgs(bgRelaBig);
			if(articleImgs.length) {
				var viewer = new Viewer();
				var img;
				for(var i=0,l=articleImgs.length ; i<l ; i+=1) {
					img = articleImgs[i];
					if(img.id.indexOf("dc_image_elm_") === 0) {
						img.parentNode.removeAttribute("href");
					}
					eRemove(img,"onclick");
					eRemove(img,"onload");
					img.removeAttribute("width");
					img.removeAttribute("height");
					viewer.add(img.src,img);
				}
			}

			if(P.hide) {
				Hide.apply(bgRelaBig);
			}
			autoLink(bgRelaBig);
		}

		// 코멘트가 있는 경우
		if(MODE.article || MODE.comment) {
			if(P.autoForm) {
				var autoName = $id("name");
				var autoPassword = $id("password");
				var autoMemo = $id("memo");
				if(autoName) {
					autoName.value = P.autoName;
					autoName.style.background = "";
				}
				if(autoPassword) {
					autoPassword.value = P.autoPassword;
					autoPassword.style.background = "";
				}
				if(autoMemo) {
					autoMemo.value = "";
					autoMemo.style.background = "";
				}
			}
		}

		var list_table = $id("list_table");
		var thead = cElement("thead",[list_table,0]);
		var tbody = list_table.tBodies[0];
		thead.appendChild(tbody.rows[0]);
		var tr = cElement("tr",[tbody,0]);
		cElement("td",tr,{className:"DCL_tbodyTitle",colSpan:"7"});

		listFunc(0);
		Layer.add(0);

		if(P.page) {
			pageFunc();
		}

		// 필터
		if(P.filter) {
			Filter.article($id("list_table").tBodies[0]);
			if(MODE.article || MODE.comment) {
				var com_tab = $id("com_tab_"+parseQuery(location.search).no);
				Filter.comment(com_tab);
				var com_tab_timer;
				com_tab.addEventListener("DOMNodeInserted",function(){clearTimeout(com_tab_timer);com_tab_timer=setTimeout(function(){Filter.comment(com_tab);},100);},false);
			}
		}
	}

}

// 실행 ; 미지원 브라우저, 알 수 없는 상태, 내부 iframe 에서는 실행 안함
if(BROWSER && MODE && window === window.top) {
	SET.load();
	DCINSIDE_LITE();
}