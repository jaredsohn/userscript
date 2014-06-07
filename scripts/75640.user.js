// ==UserScript==
// @name           dcinside_lite
// @namespace      http://gallog.dcinside.com/hkyuwon
// @source         http://userscripts.org/scripts/show/
// @version        1.5.0 beta5
// @date           2009-12-06
// @author         축
// @description    dcinside의 광고 및 상하단의 불필요한 레이아웃을 제거하고 다양한 편의적 기능을 제공합니다.
// @include        http://gall.dcinside.com/list.php*
// @include        http://gall.dcinside.com/article_write.php*
// @run-at document-start
// ==/UserScript==

var P = {
version : "1.5.0",

filter : 1,
blockNotice : 1,
blockNA : 1,
blockNB : 1,
blockAN : "",
allowAN : "",
blockAT : "",
allowAT : "",
blockCN : "",
allowCN : "",
blockCT : "",
allowCT : "",

header : 0,
column : 0,
listWidth : 900,
articleWidth : 900,
imageWidth : 900,
listNumber : 1,
listDate : 1,
listCount : 1,
listComment : 1,
top : 1,
topBtn : "",
side : 1,
sideBtn : "login/set/gallog/gallery/header/side/page/column/reload/album",
best : 1,
sideMini : 0,
link : 0,
linkSide : 0,
linkList : "",

title : 0,
listTitle : "{G} - {P} 페이지",
articleTitle : "{T} ({W}) - {G}",
page : 0,
pageLength : 3,
previewImage : 1,
previewText : 1,
previewComment : 1,
previewSingle : 1,
previewResize : 1,
previewHeight : 0,
imageOption : "160/120/5/25",
hide : 1,
hideImg : 0,
hideMedia : 0,
hideMediaABP : 0,
hideZB : 1,

autoLink : 1,
autoForm : 0,
autoName : "",
autoPassword : "",
myTag : ""
};

// 기본 함수 및 상수, 변수
var BROWSER = {}; // 브라우저 ; 현재 Firefox,Chrome,Opera
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

var addStyle = BROWSER.opera ?
	function(css) {
		var parent = document.getElementsByTagName("head")[0];
		if (!parent) {
			parent = document.documentElement;
		}
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
		try {
			//cannot do cross domain
			xmlhttp.open(details.method, details.url);
		} catch(e) {
			if( details.onerror ) {
				//simulate a real error
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
		xmlhttp.send((typeof(details.data)!=="undefined")?details.data:null);
	}
	: GM_xmlhttpRequest;

var setValue = BROWSER.firefox ?
	function(name,value) {
		P[name] = value;
		GM_setValue(name,value);
	}
	: function(name,value) {
		if(typeof value === "string") {
			value = value.replace(/\r/g,""); // opera에서 textarea 줄바꿈시 \r\n 이 삽입되는 것을 제거
		}
		if(typeof value === "boolean") {
			value = value?1:0;
		}
		P[name] = value;
		var cookie = [];
		for(var i in P) {
			if(P.hasOwnProperty(i)) {
				cookie.push(i,P[i]);
			}
		}

		cookie = escape(cookie.join("\b"));
		if(cookie.length > 4083) {
			alert("저장할 수 있는 값의 길이를 " + (cookie.length - 4083) + "자 초과하였습니다.");
			return;
		}
		document.cookie = "dcinside_lite=" + cookie + ";expires=" + (new Date((new Date()).getTime() + 31536000000)).toGMTString() + ";path=/;"; // 세팅 메뉴에서 저장할 시에는 값마다 쿠키를 저장하게 되는데... 일단 놔두자
	};

var removeEvent = BROWSER.firefox ?
	function(elem,type) { // firefox 에서는 removeAttribute로만 삭제 가능, elem.onclick = null 은 에러 발생
		elem.removeAttribute(type);
	}
	: function(elem,type) { // opera 에서는 removeAttribute로는 삭제 불가, chrome 는 둘다 가능
		elem[type] = null;
	};

var addDomEvent = BROWSER.chrome ?
	function(func) {
		document.addEventListener("DOMContentLoaded",func,false);
	}
	: function(func) {
		func();
	};

var contentWindow = BROWSER.firefox ? unsafeWindow : window;

var MODE = {};
if(location.pathname === "/article_write.php") {
	MODE.write = true;
} else if((/[?&]view_comment=1/).test(location.search)) {
	MODE.comment = true;
} else if((/[?&]no=\w+/).test(location.search)) {
	MODE.article = true;
} else if(location.pathname === "/list.php") {
	MODE.list = true;
} else {
	alert("dcinside_lite 초기화 과정에서 예외가 발생했습니다.");
}
if(/[?&]keyword=[^&]/.test(location.search)) {
	MODE.search = true;
}

var _ID = (/[?&]id=(\w+)/).exec(location.search)[1]; // 갤러리 id
var _GID; // 유저 id ; dom load 시 값입력
var PAGE = Number((/[?&]page=(\d+)/).exec(location.search+"&page=1")[1]);
var scrollBody; // document.documentElement || document.body

function $id(id) {return document.getElementById(id);}
function getOffset(elem) {return elem ? elem.offsetTop + getOffset(elem.offsetParent) : 0;}
function createElement(tag,insert,property,func) {
	var element = document.createElement(tag);
	if(insert) {
		var parent;
		var before = null;
		if(insert.constructor === Array) {
			if(typeof insert[1] === "number") {
				parent = insert[0];
				before = insert[0].childNodes[insert[1]];
			} else {
				parent = insert[1].parentNode;
				before = insert[1];
				if(insert[0] === 1) {
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
function returnFalse(e) {
	e.stopPropagation();
	e.preventDefault();
}
function searchClass(elem,search) {
	return (new RegExp("(?:^|\\s+)"+search+"(?:\\s+|$)","")).test(elem.className);
}
function addClass(elem,add) { // 다중 추가는 안함
	if(!searchClass(elem,add)) {
		elem.className += " " + add;
	}
}
function removeClass(elem,remove) {
	elem.className = elem.className.replace((new RegExp("(?:^|\\s+)"+remove+"(?:\\s+|$)","g"))," ");
}
function switchClass(elem,remove,add) {
	removeClass(elem,remove);
	addClass(elem,add);
}
function toggleClass(elem,toggle) {
	if(searchClass(elem,toggle)) {
		removeClass(elem,toggle);
	} else {
		addClass(elem,toggle);
	}
}
function windowValue(name) {
	var value;
	if(BROWSER.firefox || BROWSER.opera) {
		value = contentWindow[name];
	} else if(BROWSER.chrome){
		var div = document.createElement("div");
		div.style.cssText = "width:0 ; height:0 ; position:absolute ; overflow:hidden";
		div.innerHTML = "<input onfocus='this.value="+name+";' />";
		var input = div.firstChild;
		document.body.appendChild(div);
		input.focus();
		value = input.value;
		document.body.removeChild(div);
	}
	return value;
}

// 환경 설정
var PREFERENCES = {
	init : function() {
		addStyle("div#DCL_preferences {position:absolute ; width:570px ; border:5px solid #ccc ; -moz-border-radius:20px ; -webkit-border-radius:20px ; padding:10px ; background-color:#f9f9f9 ; z-index:1003}div#DCL_preferences * {margin:0 ; padding:0 ; font:9pt/1.6em 돋움 ; vertical-align:middle}div#DCL_preferences h2 {margin:5px ; padding:5px 10px ; font-weight:bold ; font-size:12pt ; color:#fff ; background-color:#666}div#DCL_preferences > fieldset:after {content:'-' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}div#DCL_preferences fieldset {float:left ; padding:5px ; margin:5px 3px ; border:1px solid #666 ; -moz-border-radius:5px ; -webkit-border-radius:5px}div#DCL_preferences legend {padding:0 5px ; font-weight:bold}div#DCL_preferences input + * {padding-left:3px}div#DCL_preferences input[type='text'] {margin-left:5px ; border:1px solid #999}div#DCL_preferences textarea {display:block}div#DCL_preferences hr {border-width:1px 0 0 ; margin:3px}div#DCL_preferences input.DCL_typeNum {text-align:right}div#DCL_preferences .DCL_prefIndent {margin-left:15px !important}div#DCL_preferences p#DCL_prefBtn {clear:both ; padding:10px ; text-align:center}div#DCL_preferences p#DCL_prefBtn > * {margin:10px ; padding:7px 10px ; font-weight:bold ; background-color:#666 ; color:#fff}div#DCL_preferences p.DCL_tooltip {display:none ; position:absolute ; padding:5px 10px ; border:1px solid #999 ; -moz-border-radius:5px ; -webkit-border-radius:5px ; background-color:#fff}div#DCL_preferences *:hover + p.DCL_tooltip {display:block}div#DCL_preferences span.DCL_myTag {border:1px solid #bbb ; -moz-border-radius:3px ; -webkit-border-radius:3px ; padding:2px 7px 3px ; font:8pt 'courier new' ; background-color:#f9f9f9}");
		var html = "<h2>dcinside_lite version 1.5.0 beta5 (2009-12-06)<input type='hidden' id='DCL_version' /></h2><fieldset><legend>게시물 및 덧글 필터링</legend><input type='checkbox' id='DCL_filter' /><label for='DCL_filter'>필터링 기능 사용</label><p class='DCL_tooltip'>게시물을 차단 또는 강조합니다.<br />(체크 해제시 하위 설정 미작동)<br /><br />- 작성자 필터링 : 전체 일치 / 와일드카드 ＊(ㅁ한자3) 사용 가능<br />- 제목 필터링 : 부분 일치</p><br /><input type='checkbox' id='DCL_blockNotice' /><label for='DCL_blockNotice'>공지 차단</label><p class='DCL_tooltip'>첫 페이지 상단의 공지를 차단합니다.</p><input type='checkbox' id='DCL_blockNA' class='DCL_prefIndent' /><label for='DCL_blockNA'>운영자 공지만 차단</label><p class='DCL_tooltip'>운영자가 작성한 공지만 차단합니다.</p> (<input type='text' id='DCL_blockNB' size='2' class='DCL_typeNum' /><label for='DCL_blockNB'>일 이내 운영자 공지는 표시</label>)<p class='DCL_tooltip'>최근의 운영자 공지는 차단하지 않습니다.</p><br /><fieldset><legend>게시물 작성자</legend><label for='DCL_blockAN'>차단</label><textarea id='DCL_blockAN' rows='4' cols='15' wrap='off'></textarea><label for='DCL_allowAN'>강조</label><textarea id='DCL_allowAN' rows='3' cols='15' wrap='off'></textarea></fieldset><fieldset><legend>게시물 제목</legend><label for='DCL_blockAT'>차단</label><textarea id='DCL_blockAT' rows='4' cols='15' wrap='off'></textarea><label for='DCL_allowAT'>강조</label><textarea id='DCL_allowAT' rows='3' cols='15' wrap='off'></textarea></fieldset><fieldset><legend>덧글 작성자</legend><label for='DCL_blockCN'>차단</label><textarea id='DCL_blockCN' rows='4' cols='15' wrap='off'></textarea><label for='DCL_allowCN'>강조</label><textarea id='DCL_allowCN' rows='3' cols='15' wrap='off'></textarea></fieldset><fieldset><legend>덧글 내용</legend><label for='DCL_blockCT'>차단</label><textarea id='DCL_blockCT' rows='4' cols='15' wrap='off'></textarea><label for='DCL_allowCT'>강조</label><textarea id='DCL_allowCT' rows='3' cols='15' wrap='off'></textarea></fieldset></fieldset><fieldset><legend>레이아웃</legend><input type='checkbox' id='DCL_header' /><label for='DCL_header'>상단 메뉴 표시</label><p class='DCL_tooltip'>기본 상단 메뉴를 표시합니다.</p><br /><input type='checkbox' id='DCL_column' /><label for='DCL_column'>목록/본문 2단 레이아웃</label><p class='DCL_tooltip'>게시물 보기시 본문의 내용을 목록 오른쪽에 표시합니다.<br />(가로 해상도 1920 이상의 와이드 화면 권장)</p><br /><input type='checkbox' checked='checked' disabled='disabled' /><label>너비 설정</label><br /><label for='DCL_listWidth' class='DCL_prefIndent'>목록</label><p class='DCL_tooltip'>목록의 너비를 조정합니다.<br />(기본 너비 900)</p><input type='text' id='DCL_listWidth' size='4' class='DCL_typeNum' /><label for='DCL_articleWidth' class='DCL_prefIndent'>본문</label><p class='DCL_tooltip'>게시물 본문의 너비를 조정합니다.<br />(기본 너비 900)</p><input type='text' id='DCL_articleWidth' size='4' class='DCL_typeNum' /><label for='DCL_imageWidth' class='DCL_prefIndent'>이미지</label><p class='DCL_tooltip'>본문의 이미지 크기를 지정한 수치(px)에 맞게 조정합니다.<br />본문 너비보다 클 경우 본문 너비를 무시하고 확대되며 빈값이면 원본 크기로 표시합니다.<br />(2단 레이아웃시에는 미적용)</p><input type='text' id='DCL_imageWidth' size='4' class='DCL_typeNum' /><br /><input type='checkbox' checked='checked' disabled='disabled' /><label>목록 표시 설정</label><br /><input type='checkbox' id='DCL_listNumber' class='DCL_prefIndent' /><label for='DCL_listNumber'>번호</label><input type='checkbox' id='DCL_listDate' class='DCL_prefIndent' /><label for='DCL_listDate'>날짜</label><input type='checkbox' id='DCL_listCount' class='DCL_prefIndent' /><label for='DCL_listCount'>조회수</label><input type='checkbox' id='DCL_listComment' class='DCL_prefIndent' /><label for='DCL_listComment'>덧글 [0]</label><p class='DCL_tooltip'>덧글 수가 0 인 경우에도 덧글 링크를 표시합니다.</p><hr /><input type='checkbox' id='DCL_top' /><label for='DCL_top'>Top Menu 사용</label><p class='DCL_tooltip'>상단 메뉴를 표시합니다. (/ 로 구분)<br /><br />login : 로그인/로그아웃 버튼<br />gallery : 갤러리 메뉴 버튼<br />gallog : 갤로그 버튼<br />header : 상단 기본 메뉴 버튼<br />top : Top Menu 버튼<br />side : Side Menu 버튼<br />page : 다중 목록 버튼<br />column : 목록/본문 2단 보기 버튼<br />album : 이미지 모아보기 버튼<br />reload : 목록 새로고침 버튼<br />set : 스크립트 설정 버튼</p><br /><input type='text' id='DCL_topBtn' size='39' class='DCL_prefIndent' /><br /><input type='checkbox' id='DCL_side' /><label for='DCL_side'>Side Menu 사용</label><p class='DCL_tooltip'>오른쪽 메뉴를 표시합니다.(스크롤)</p><br /><input type='checkbox' id='DCL_best' class='DCL_prefIndent' /><label for='DCL_best'>일간 베스트</label><p class='DCL_tooltip'>Side Menu 에 일간 베스트 목록을 표시합니다.</p><input type='checkbox' id='DCL_sideMini' class='DCL_prefIndent' /><label for='DCL_sideMini'>크기 축소</label><p class='DCL_tooltip'>일간 베스트를 사용하지 않을 때 크기 축소 옵션을 사용하면 Side Menu 의 크기가 작아집니다.</p><br /><input type='text' id='DCL_sideBtn' size='39' class='DCL_prefIndent' /><br /><input type='checkbox' id='DCL_link' /><label for='DCL_link'>즐겨찾기 링크 사용</label><p class='DCL_tooltip'>자주가는 갤러리를 등록하여 링크 메뉴를 생성합니다.<br />표시 이름@갤러리 주소<br />표시 이름@http 주소<br />* @ 대신 @@ 를 사용하면 새 창으로 열림<br />예)<br />힛갤@hit<br />구글@http://www.google.co.kr/<br />신고@@http://gall.dcinside.com/article_write.php?id=singo</p><br /><input type='checkbox' id='DCL_linkSide' class='DCL_prefIndent' /><label for='DCL_linkSide'>Side Menu 에 넣기</label><p class='DCL_tooltip'>즐겨찾기 링크 목록을 Side Menu에 위치시킵니다.<br />(기본 위치 : 상단 메뉴)</p><textarea id='DCL_linkList' rows='5' cols='38' wrap='off'></textarea></fieldset><fieldset><legend>기능</legend><input type='checkbox' id='DCL_title' /><label for='DCL_title'>Title 수정</label><p class='DCL_tooltip'>브라우저의 타이틀을 수정합니다.</p><br /><label for='DCL_listTitle' class='DCL_prefIndent'>목록</label><p class='DCL_tooltip'>{G} : 갤러리 이름<br />{P} : 페이지</p><input type='text' id='DCL_listTitle' size='13' /><label for='DCL_articleTitle' class='DCL_prefIndent' >본문</label><p class='DCL_tooltip'>{G} : 갤러리 이름<br />{T} : 게시물 제목<br />{W} : 작성자</p><input type='text' id='DCL_articleTitle' size='13' /><br /><input type='checkbox' id='DCL_page' /><label for='DCL_page'>다중 목록</label><p class='DCL_tooltip'>현재 페이지 이전의 목록을 구성합니다.</p><input type='text' id='DCL_pageLength' size='2' class='DCL_typeNum' /><br /><input type='checkbox' checked='checked' disabled='disabled' /><label>미리보기 설정</label><p class='DCL_tooltip'>목록 앞 아이콘을 클릭하면 해당 게시물의 내용을 표시합니다.</p><br /><input type='checkbox' id='DCL_previewImage' class='DCL_prefIndent' /><label for='DCL_previewImage'>이미지</label><input type='checkbox' id='DCL_previewText' class='DCL_prefIndent' /><label for='DCL_previewText'>본문</label><input type='checkbox' id='DCL_previewComment' class='DCL_prefIndent' /><label for='DCL_previewComment'>덧글</label><br /><input type='checkbox' id='DCL_previewSingle' class='DCL_prefIndent' /><label for='DCL_previewSingle'>단독 레이어 사용</label><p class='DCL_tooltip'>한번에 하나의 미리보기만 사용합니다.</p><input type='checkbox' id='DCL_previewResize' class='DCL_prefIndent' /><label for='DCL_previewResize'>높이 조절</label><p class='DCL_tooltip'>미리보기의 높이를 제한합니다.<br />값이 0이면 화면 높이에 맞추어 조절됩니다.</p><input type='text' id='DCL_previewHeight' class='DCL_typeNum' size='4' /><hr /><input type='checkbox' checked='checked' disabled='disabled' /><label for='DCL_imageOption'>이미지 뷰어 옵션</label><p class='DCL_tooltip'>이미지 뷰어의 리스팅 옵션을 지정합니다.<br />섬네일 가로길이/섬네일 세로길이/목록 가로개수/목록 총개수<br /><br />- 마우스 드래그 : 이미지 이동<br />- 마우스 휠 or ↑/↓ : 이전/다음 이미지<br />- PageUp/PageDown : +5/-5 이미지<br />- Home/End : 처음/마지막 이미지<br />- 클릭 + 마우스 휠 or Alt + 마우스 휠 or +/- 키 : 배율 조정<br />- 배경 마우스 우클릭 : 100% 사이즈<br />- 마우스 좌클릭 or Back space : 이미지 뷰어 해제</p><input type='text' id='DCL_imageOption' size='13' /><br /><input type='checkbox' id='DCL_hide' /><label for='DCL_hide'>이미지/미디어 차단 사용</label><p class='DCL_tooltip'>이미지 및 동영상, 플래시, 음악 등을 차단/차단해제 하는 기능입니다.<br />Delete/Esc : 전체 차단<br />Insert/~ : 전체 차단해제</p><br /><input type='checkbox' id='DCL_hideImg' class='DCL_prefIndent' /><label for='DCL_hideImg'>이미지 미리 차단</label><p class='DCL_tooltip'>페이지 로딩시 이미지를 미리 차단합니다.</p><input type='checkbox' id='DCL_hideMedia' class='DCL_prefIndent' /><label for='DCL_hideMedia'>미디어 미리 차단</label><p class='DCL_tooltip'>페이지 로딩시 동영상, 플래시, 음악 등을 미리 차단합니다.</p><br /><input type='checkbox' id='DCL_hideMediaABP' class='DCL_prefIndent' /><label for='DCL_hideMediaABP'>Adblock Plus와 호환</label><p class='DCL_tooltip'>Adblock Plus 의 [플래쉬와 자바를 탭으로 보이기] 옵션을 사용하는 경우 체크합니다.<br />Adblock Plus를 사용하더라도 차단 탭 옵션을 사용하지 않으면 해제하세요.</p><br /><input type='checkbox' id='DCL_hideZB' /><label for='DCL_hideZB'>기본 이미지(짤방) 감춤</label><p class='DCL_tooltip'>게시판의 기본 이미지를 차단합니다.</p><br /><input type='checkbox' id='DCL_autoLink' /><label for='DCL_autoLink'>자동 링크 사용</label><p class='DCL_tooltip'>본문 내용의 링크되지 않은 http 주소를 링크로 만듭니다.</p><hr /><input type='checkbox' id='DCL_autoForm' /><label for='DCL_autoForm'>이름/비밀번호 자동 입력 사용</label><p class='DCL_tooltip'>비로그인 상태에서 게시물/코멘트 작성란의<br />이름과 비밀번호를 자동으로 채웁니다.</p><br /><label for='DCL_autoName' class='DCL_prefIndent'>이름</label><input type='text' id='DCL_autoName' size='12' /><label for='DCL_autoPassword' class='DCL_prefIndent'>비밀번호</label><input type='text' id='DCL_autoPassword' size='10' /><br /><input type='checkbox' checked='checked' disabled='disabled' /><label for='DCL_myTag'>my Tag 내용</label><p class='DCL_tooltip'>게시물 작성시 에디터 버튼의<br /><span class='DCL_myTag'>my Tag</span> 를 클릭하면 지정한 태그가 본문 앞에 삽입됩니다.</p><textarea id='DCL_myTag' rows='4' cols='40'></textarea></fieldset><p id='DCL_prefBtn'></p>";
		createElement("div",document.body,{id:"DCL_preferences",innerHTML:html});

		var prefBtn = $id("DCL_prefBtn");
		createElement("span",prefBtn,"저장",PREFERENCES.save);
		createElement("span",prefBtn,"취소",PREFERENCES.close);
		createElement("span",prefBtn,"Tip",PREFERENCES.tip);
	},
	call : function() {
		if(!$id("DCL_preferences")) {
			PREFERENCES.init();
		}
		var div = $id("DCL_preferences");
		div.style.display = "block";
		div.style.top = scrollBody.scrollTop + Math.max(0,document.documentElement.clientHeight-div.clientHeight)/2 + "px";
		div.style.left = scrollBody.scrollLeft + Math.max(0,document.documentElement.clientWidth-div.clientWidth)/2 + "px";

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
		var i,l,version;
		if(BROWSER.firefox) {
			if(GM_getValue("version") === P.version) {
				version = true;
			}
			var listValues = GM_listValues();
			for(i=0,l=listValues.length ; i<l ; i+=1) {
				if(P.hasOwnProperty(listValues[i])) {
					P[listValues[i]] = GM_getValue(listValues[i]);
				} else {
					GM_deleteValue(listValues[i]);
				}
			}
			GM_registerMenuCommand("dcinside_lite Preferences",PREFERENCES.call);
		} else {
			var cookie = /(?:^|; )dcinside_lite=([^;]*);/.exec(document.cookie);
			if(cookie) {
				cookie = unescape(cookie[1]).split("\b");
				for(i=0,l=cookie.length ; i<l ; i+=2) {
					if(cookie[i] === "version" && cookie[i+1] === P.version) {
						version = true;
					}
					P[cookie[i]] = cookie[i+1];
				}
				var typeNum = ["filter","blockNotice","blockNA","blockNB","header","column","listWidth","articleWidth","imageWidth","listNumber","listDate","listCount","listComment","top","side","best","sideMini","link","linkSide","title","page","pageLength","previewImage","previewText","previewComment","previewSingle","previewResize","previewHeight","hide","hideImg","hideMedia","hideMediaABP","hideZB","autoLink","autoForm"]; // boolean 이나 number 을 형변환
				for(i=0,l=typeNum.length ; i<l ; i+=1) {
					P[typeNum[i]] = Number(P[typeNum[i]]);
				}
			}
		}
		if(!version) {
			setTimeout(function(){addDomEvent(PREFERENCES.call);},100);
			setTimeout(function(){addDomEvent(PREFERENCES.tip);},100);
		}
	},
	save : function() {
		var input;
		for(var i in P) {
			if(P.hasOwnProperty(i)) {
				input = $id("DCL_" + i);
				if(input.type === "checkbox") {
					setValue(i,input.checked);
				} else if(input.tagName === "INPUT" || input.id === "DCL_myTag") {
					if(searchClass(input,"DCL_typeNum")) {
						setValue(i,Number(input.value));
					} else {
						setValue(i,input.value);
					}
				} else {
					setValue(i,input.value.replace(/^\s+|\s+$|\n\s*(?=\n)/g,""));
				}
			}
		}

		PREFERENCES.close();
		location.reload();
	},
	close : function() {
		alert("이 설정은\n\n1) [Set] 버튼\n\n2) Greasemonkey 메뉴\n→ [유저 스크립트 명령]\n→ [dcinside_lite Preferences]\n\n에서 다시 할 수 있습니다.");
		$id("DCL_preferences").style.display = "none";
	},
	tip : function() {
		var div = $id("DCL_prefTip");
		if(div) {
			div.style.display = "block";
		} else {
			addStyle(
				"div#DCL_prefTip {position:absolute ; width:570px ; top:-5px ; left:-5px ; border:5px solid #666 ; padding:10px ; font:9pt Arial ; background-color:#fff ; z-index:1004}" +
				"div#DCL_prefTip h3 {margin-bottom:10px ; font-weight:bold}" +
				"div#DCL_prefTip h4 {color:#039 ; font-weight:bold}" +
				"div#DCL_prefTip a {margin:1em ; color:#69f}" +
				"div#DCL_prefTip p {margin:5px}" +
				"div#DCL_prefTip code {display:block ; white-space:pre ; width:478px ; overflow:auto ; margin-bottom:10px ; border:1px solid #999 ; padding:10px ; background-color:#f0f0f0 ; font:10pt 'courier new'}"
			);
			var html = 
			"<h3># 이 설정은 메뉴의 [Set] 버튼 또는 Greasemonkey 메뉴의 [dcinside_lite Preferences] 를 통해서 다시 할 수 있습니다.</h3><h3># Firefox 사용자는 Adblock Plus 와 Stylish 의 사용을 강력히 권장합니다. 스크립트의 적용 딜레이가 크게 줄어듭니다.</h3><h4>Adblock Plus</h4><a href='https://addons.mozilla.org/en-US/firefox/addon/1865' target='_blank'>https://addons.mozilla.org/en-US/firefox/addon/1865</a><p>광고를 비롯한 쓸모없는 이미지나 페이지의 로딩 자체를 차단하여 사이트 로딩시간을 단축시키는 부가기능입니다. 아래 주소를 차단 목록에 추가하면 dcinside_lite 의 적용 딜레이가 크게 줄어듭니다.<br />이 외에도 갤러리별로 광고의 종류가 다양하므로 자주 가는 갤러리의 광고관련 주소를 직접 추가하는 것이 좋습니다.</p><code>http://ad.dcinside.com\nhttp://*.dcinside.com/dc_ad\nhttp://*.googlesyndication.com/\nhttp://*.targetbanner.co.kr/\nhttp://210.127.209.138/\nhttp://gall.dcinside.com/hcnt.php\nhttp://www.google.com/afsonline/show_afs_ads.js\nhttp://wstatic.dcinside.com/gallery/top/ad_top/\nrealclick\n*.google-analytics.com/</code><h4>Stylish</h4><a href='https://addons.mozilla.org/en-US/firefox/addon/2108' target='_blank'>https://addons.mozilla.org/en-US/firefox/addon/2108</a><p>개별 사이트마다 css 를 적용할 수 있는 부가기능으로 페이지 로딩 이전에 적용되기 때문에 화면 전환 딜레이가 없습니다. 아래 코드를 새로운 규칙에 추가하세요. (Write new style -> Blank style)<br />광고 삭제 이외의 다른 기능이 필요없다면 dcinside_lite 스크립트를 사용하지 않고 Stylish 만 사용해도 됩니다.</p><code>@namespace url(http://www.w3.org/1999/xhtml);\n@-moz-document domain(\"gall.dcinside.com\") {\n\t#header, #footer, #copyright, #TB>tbody>tr>td+td, #MinFixWidth, .topAd, #gbar_ad, #adBookmark, #adBookmark5, #dc_advertisement, .submenu_ad, #topfloating, #topAlbaAd, #mx, #popLayer, #BtnClose, a[href^='http://ad.dcinside.com'] {display:none}\n\tbody {position:relative ; margin:0 auto !important ; word-wrap:break-word}\n\t#reply1 {width:auto !important}\n\t#gallery_title, #gallery_title_no {height:40px !important}\n\t#gallery_title_no {background:none !important ; border-bottom:2px solid #6585da}\n\t#quick_m, #quick_m_no {top:18px !important ; right:0 !important}\n\t#list_table > * > tr > td:first-child,#list_table > * > tr > td:last-child {width:5px}\n\tdiv#bgRelaBig {word-wrap:break-word}\n\tdiv#bgRelaBig > span div[id^='dc_imgFree_'] {display:none !important}\n\tbody, #dcMainAll {overflow:visible !important}\n}</code><h3>#4. Link</h3><p><a href='http://userscripts.org/scripts/show/' target='_blank'>userscripts.org</a> <a href='http://gallog.dcinside.com/hkyuwon' target='_blank'>제작자 갤로그</a></p><hr /><span onclick='this.parentNode.style.display=\"none\"'>닫기</span>";
			div = createElement("div",$id("DCL_preferences"),{id:"DCL_prefTip",innerHTML:html});
		}
	}
};

// 작업 시작
function defaultFunc() {
	if(P.header) {
		addClass(document.documentElement,"DCL_headerOn");
	}
	if(P.column) {
		addClass(document.documentElement,"DCL_columnOn");
	}

	addStyle( // 기본 스타일 추가
		"html.DCL_headerOn > body #header {display:block ; overflow:hidden}" +
		(P.hideZB?"#test, ":"") + "#header, #footer, #copyright, #TB>tbody>tr>td+td, #MinFixWidth, .topAd, #gbar_ad, #adBookmark, #adBookmark5, #dc_advertisement, .submenu_ad, #topfloating, #topAlbaAd, #mx, #popLayer, #BtnClose, a[href^='http://ad.dcinside.com'] {display:none}" +// 불필요한 부분 및 각종 광고 삭제
		"body {position:relative ; margin:0 auto !important}" +

		"#list_table > tbody > tr:nth-of-type(2n+4) > td:nth-child(2) {background:url('http://wstatic.dcinside.com/gallery/skin/skin_new/list_line.gif') repeat-x bottom left}" +
		"#reply1 {width:auto !important}" +
		"table.comment-table > colgroup {display:none}" +
		"table.comment-table td.com_name {width:120px}" +
		"table.comment-table td.com_text {width:auto}" +
		"table.comment-table td.com_chat {width:10px}" +
		"table.comment-table td.com_ip {width:90px ; font:8pt Arial}" +
		"table.comment-table td.com_btn {width:12px}" +
		"td.com_text > div {display:inline}" +

		"#gallery_title, #gallery_title_no {height:40px !important}" +
		"#gallery_title_no {background:none !important ; border-bottom:2px solid #6585da}" +
		"#quick_m, #quick_m_no {top:18px !important ; right:0 !important}" +
		"#list_table > * > tr > td:first-child,#list_table > * > tr > td:last-child {width:5px}" +
		"div#bgRelaBig {word-wrap:break-word}" +
		"div#bgRelaBig > span div[id^='dc_imgFree_'] {display:none !important}" +

		"#header, #top_div, .table_link, #gallery_title, #gallery_title_no, #gallSearchMenu+table, body>table {width:" + (MODE.list?P.listWidth:P.articleWidth) + "px !important}" +
		"#testDiv > table {width:"+P.listWidth+"px}" +
		"#writeForm * {max-width:"+P.articleWidth+"px !important}" +

		".DCL_viewerImg {cursor:pointer}"
	);

	if(MODE.list) {
		addStyle(
			"html.DCL_columnOn > body {padding-right:"+P.articleWidth+"px}" +
			"html.DCL_columnOn.DCL_sideOn > body {padding-right:" + (P.articleWidth+(!P.best&&P.sideMini?45:85)) + "px}" +
			"html.DCL_columnOn.DCL_sideOn.DCL_previewOn div#DCL_sideDiv {padding-left:" + (P.articleWidth+P.listWidth) + "px}"
		);
	} else if(MODE.article || MODE.comment) {
		addStyle(
			"html.DCL_columnOn > body {padding-left:"+P.listWidth+"px}" +
			"html.DCL_columnOn #testDiv {position:absolute ; margin-left:-"+P.listWidth+"px ; top:0}" +
			"html.DCL_columnOn #bgRelaBig * {max-width:"+P.articleWidth+"px !important}" +
			"body > table:nth-of-type(2) > tbody > tr > td > table:nth-of-type(3) > tbody > tr:nth-of-type(2) > td > table {width:"+P.articleWidth+"px !important}" // 본문하단 광고 (2009.11.23)
		);
	}

	addStyle( // filter
		"tr.DCL_blockArticle, tr.DCL_blockArticle + tr {display:none}" +
		"tr.DCL_blockArticle td.DCL_nameMatch, tr.DCL_blockArticle span.DCL_titleMatch {color:#c00}" +
		"tbody.DCL_showArticle > tr.DCL_blockArticle {display:table-row ; background-color:#eee}" +
		"tbody.DCL_showArticle > tr.DCL_blockArticle+tr {display:table-row}" +
		"tr.DCL_allowArticle td.DCL_nameMatch, tr.DCL_allowArticle span.DCL_titleMatch {color:#36c}" +
		"p.DCL_blockArticleP {float:right}" +
		"p.DCL_blockArticleP > span {margin:3px ; font:8pt 돋움 ; color:#333}" +
		"p.DCL_blockArticleP > span:last-child {font-weight:bold ; font-size:9pt ; cursor:pointer}" +

		"tr.DCL_blockComment {display:none}" +
		"tr.DCL_blockComment td.DCL_nameMatch, tr.DCL_blockComment span.DCL_titleMatch {color:#c00 !important}" +
		"table.DCL_showComment tr.DCL_blockComment {display:table-row ; background-color:#f0f0f0}" +
		"tr.DCL_allowComment td.DCL_nameMatch, tr.DCL_allowComment span.DCL_titleMatch {color:#36c}" +
		"p.DCL_blockCommentP {margin:5px 0 ; padding:3px ; ; background-color:#e9e9e9 ; text-align:right}" +
		"p.DCL_blockCommentP > span {margin-right:10px ; font-size:9pt}" +
		"p.DCL_blockCommentP > span:first-child {margin-right:15px ; font-weight:bold ; color:#333 ; cursor:pointer}"
	);

	addStyle( // hideFunc
		"span.DCL_hideImgBtn, span.DCL_hideMediaBtn {position:absolute ; width:22px ; height:11px ; margin:0 ; padding:2px 3px ; font:normal normal normal 11px/11px Arial ; text-align:center ; color:#000 ; background-color:#fff ; border:1px solid #000 ; -moz-border-radius:2px ; -webkit-border-radius:2px ; cursor:pointer ; opacity:0.7 ; z-index:1000}" +
		"span.DCL_hideImgBtn:hover, span.DCL_hideMediaBtn:hover {opacity:1 !important}" +
		"span.DCL_hideOn {color:#fff ; background-color:#666 ; border-color:#666}" +

		"span.DCL_hideImgBtn {visibility:hidden ; margin-left:-30px}" +
		".DCL_hideImg:hover + span.DCL_hideImgBtn {visibility:visible}" +
		"span.DCL_hideImgBtn:hover {visibility:visible}" +
		".DCL_hideImg.DCL_hideOn {visibility:hidden}" +
		"span.DCL_hideImgBtn.DCL_hideOn {visibility:visible}" +

		"span.DCL_hideMediaBtn {opacity:0.2 ; margin:-17px 0 0 -"+(P.hideMediaABP?64:30)+"px}" +
		".DCL_hideMedia:hover + span.DCL_hideMediaBtn {opacity:0.7}" +
		".DCL_hideMedia:hover + a + a + span.DCL_hideMediaBtn {opacity:0.7}" +
		".DCL_hideMedia.DCL_hideOn {display:none}" +
		"span.DCL_hideMediaBtn.DCL_hideOn {opacity:0.7 ; position:relative ; display:block ; margin:0}" +

		"p.DCL_hideToggle {padding-bottom:10px}" +
		"p.DCL_hideToggle > span {margin:5px ; font:bold 11px Tahoma ; text-decoration:underline ; color:#999 ; cursor:pointer}" +
		"p.DCL_hideToggle > span:hover {color:#000}"
	);
}

// 게시물 차단
var blockArticleFunc = function(tbody) {
	var blockNotice = P.blockNotice;
	var blockNA = P.blockNA;
	var blockNB = P.blockNB;
	var blockAN = P.blockAN;
	var blockAT = P.blockAT;
	var allowAN = P.allowAN;
	var allowAT = P.allowAT;
	if(!blockNotice && !blockAN && !blockAT && !allowAN && !allowAT) {
		return;
	}

	var rows = tbody.rows;
	var noticeCnt = 0;
	var articleCnt = 0;
	var titleCnt = 0;
	var blockCnt = {};

	var i=2,l=rows.length-2;
	if(blockNotice) {
		var date;
		if(blockNB) { // 매번 Date 개체를 만드느니 기준 날짜를 문자화시켜서 비교하자
			date = new Date();
			date.setDate(date.getDate()-blockNB);
			date = date.getFullYear() + "/" + (100+date.getMonth()+1).toString(10).substr(1) + "/" + (100+date.getDate()).toString(10).substr(1);
		}
		for( ; rows[i].cells[1].textContent.indexOf("공지") !== -1 ; i+=2) {
			if(
				(!blockNB || rows[i].cells[4].textContent.replace(/^\s+|\s+$/g,"") <= date) &&
				(!blockNA || rows[i].cells[3].textContent.replace(/^\s+|\s+$/g,"") === "운영자")
			) {
				addClass(rows[i],"DCL_blockArticle");
				noticeCnt += 1;
			}
		}
	}

	if(blockAN || blockAT || allowAN || allowAT) {
		var bAN = new RegExp("^("+blockAN.replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|").replace(/＊/g,".*")+")$");
		var bAT = new RegExp(("("+blockAT.replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|")+")").replace(/</g,"&lt;").replace(/>/g,"&gt;"),"g");
		var aAN = new RegExp("^("+allowAN.replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|").replace(/＊/g,".*")+")$");
		var aAT = new RegExp(("("+allowAT.replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|")+")").replace(/</g,"&lt;").replace(/>/g,"&gt;"),"g");
		var cells,name,title,titleC;

		for( ; i<l ; i+=2) {
			cells = rows[i].cells;
			name = cells[3].textContent.replace(/^\s+|\s+$/g,"");
			title = cells[2].childNodes[3];
			titleC = title.innerHTML;

			if(allowAN && aAN.test(name)) {
				addClass(rows[i],"DCL_allowArticle");
				addClass(cells[3],"DCL_nameMatch");
			} else if(allowAT && aAT.test(titleC)) {
				addClass(rows[i],"DCL_allowArticle");
				title.innerHTML = titleC.replace(aAT,"<span class='DCL_titleMatch'>$1</span>");
			} else if(blockAN && bAN.test(name)) {
				addClass(rows[i],"DCL_blockArticle");
				addClass(cells[3],"DCL_nameMatch");
				articleCnt += 1;
				if(blockCnt[name]) {
					blockCnt[name] += 1;
				} else {
					blockCnt[name] = 1;
				}
			} else if(blockAT && bAT.test(titleC)) {
				addClass(rows[i],"DCL_blockArticle");
				title.innerHTML = titleC.replace(bAT,"<span class='DCL_titleMatch'>$1</span>");
				articleCnt += 1;
				titleCnt += 1;
			}
		}
	}

	if(noticeCnt || articleCnt) {
		var p = createElement("p",rows[0].cells[0],{className:"DCL_blockArticleP"});

		if(noticeCnt) {
			createElement("span",p,"공지("+noticeCnt+")");
		}
		if(articleCnt) {
			for(i in blockCnt) {
				if(blockCnt.hasOwnProperty(i)) {
					createElement("span",p,i+"("+blockCnt[i]+")");
				}
			}
		}
		if(titleCnt) {
			createElement("span",p,"제목("+titleCnt+")");
		}

		createElement("span",p,"전체["+(noticeCnt+articleCnt)+"]",function(){toggleClass(tbody,"DCL_showArticle");});
	}
};

// 덧글 차단
var blockCommentFunc = function(table) {
	var blockCN = P.blockCN;
	var blockCT = P.blockCT;
	var allowCN = P.allowCN;
	var allowCT = P.allowCT;
	if(!blockCN && !blockCT && !allowCN && !allowCT) {
		return;
	}

	var rows = table.rows;
	var commentCnt = 0;
	var titleCnt = 0;
	var blockCnt = {};

	var bCN = new RegExp("^("+blockCN.replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|").replace(/＊/g,".*")+")$");
	var bCT = new RegExp(("("+blockCT.replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|")+")").replace(/</g,"&lt;").replace(/>/g,"&gt;"),"g");
	var aCN = new RegExp("^("+allowCN.replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|").replace(/＊/g,".*")+")$");
	var aCT = new RegExp(("("+allowCT.replace(/([\/\\()\[\]{}?*+.|$\^])/g,"\\$1").replace(/\n/g,"|")+")").replace(/</g,"&lt;").replace(/>/g,"&gt;"),"g");

	var cells,name,title,titleC;
	for(var i=0,l=rows.length ; i<l ; i+=1) {
		cells = rows[i].cells;
		name = cells[0].textContent.replace(/^\s+|\s+$/g,"");
		title = cells[1].childNodes[1];
		titleC = title.firstChild.textContent.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		if(allowCN && aCN.test(name)) {
			addClass(rows[i],"DCL_allowComment");
			addClass(cells[0],"DCL_nameMatch");
		} else if(allowCT && aCT.test(titleC)) {
			addClass(rows[i],"DCL_allowComment");
			title.removeChild(title.firstChild);
			createElement("span",[title,0],{innerHTML:titleC.replace(aCT,"<span class='DCL_titleMatch'>$1</span>")});
		} else if(blockCN && bCN.test(name)) {
			addClass(rows[i],"DCL_blockComment");
			addClass(cells[0],"DCL_nameMatch");
			commentCnt += 1;
			if(blockCnt[name]) {
				blockCnt[name] += 1;
			} else {
				blockCnt[name] = 1;
			}
		} else if(blockCT && bCT.test(titleC)) {
			addClass(rows[i],"DCL_blockComment");
			title.removeChild(title.firstChild);
			createElement("span",[title,0],{innerHTML:titleC.replace(bCT,"<span class='DCL_titleMatch'>$1</span>")});
			commentCnt += 1;
			titleCnt += 1;
		}
	}

	if(commentCnt) {
		var tr = createElement("tr",table.tBodies[0]);
		var td = createElement("td",tr,{colSpan:5});
		var p = createElement("p",td,{className:"DCL_blockCommentP"});

		createElement("span",p,"전체["+commentCnt+"]",function(){toggleClass(table,"DCL_showComment");});
		for(i in blockCnt) {
			if(blockCnt.hasOwnProperty(i)) {
				createElement("span",p,i+"("+blockCnt[i]+")");
			}
		}
		if(titleCnt) {
			createElement("span",p,"내용("+titleCnt+")");
		}
	}
};

// 기능 사용 버튼 추가
function menuFunc() {
	var btnCreate = function(flag,parent) {
		if(flag === "login") {
			createElement("li",parent,"Log"+(_GID?"out":"in"),function(){location.href="http://dcid.dcinside.com/join/log"+(_GID?"out":"in")+".php?s_url="+encodeURIComponent(location.href);});
		} else if(flag === "gallog") {
			createElement("li",parent,"Gallog",function(){window.open("http://gallog.dcinside.com/"+_GID);});
		} else if(flag === "gallery") {
			createElement("li",parent,"Gallery",function(){window.open("http://gall.dcinside.com/");});
		} else if(flag === "header") {
			createElement("li",parent,{textContent:"Header",className:"DCL_headerBtn"},
				function(){
					setValue("header",!P.header);
					toggleClass(document.documentElement,"DCL_headerOn");
					sideScroll();
				}
			);
		} else if(flag === "top") {
			createElement("li",parent,{textContent:"Top",className:"DCL_topBtn"},
				function(){
					setValue("top",!P.top);
					toggleClass(document.documentElement,"DCL_topOn");
					if($id("DCL_topDiv")) {
						document.body.removeChild($id("DCL_topDiv"));
					}
					topCreate();
				}
			);
		} else if(flag === "side") {
			createElement("li",parent,{textContent:"Side",className:"DCL_sideBtn"},
				function(){
					setValue("side",!P.side);
					toggleClass(document.documentElement,"DCL_sideOn");
					if(P.side) {
						if(!$id("DCL_sideDiv")) {
							sideCreate();
						} else {
							$id("DCL_sideDiv").style.display = "block";
						}
					} else {
						$id("DCL_sideDiv").style.display = "none";
					}
				}
			);
		} else if(flag === "page") {
			createElement("li",parent,{textContent:"Page",className:"DCL_pageBtn"},
				function(){
					setValue("page",!P.page);
					toggleClass(document.documentElement,"DCL_pageOn");
					var list_table = $id("list_table");
					var tbody = list_table.tBodies;
					if(P.page) {
						pageFunc();
					} else {
						for(var l=tbody.length-1 ; 0<l ; l-=1) {
							previewToggle(l,false);
							list_table.removeChild(tbody[l]);
						}
					}
				}
			);
		} else if(flag === "column") {
			createElement("li",parent,{textContent:"Column",className:"DCL_columnBtn"},
				function(){
					setValue("column",!P.column);
					toggleClass(document.documentElement,"DCL_columnOn");
				}
			);
		} else if(flag === "album") {
			createElement("li",parent,"Album",function(){imageAlbumFunc(0);});
		} else if(flag === "reload") {
			createElement("li",parent,"Reload",
				function(){
					for(var i=0,l=P.page?P.pageLength:1 ; i<l ; i+=1) {
						pageLoad(i);
					}
				}
			);
		} else if(flag === "set") {
			createElement("li",parent,"Set",PREFERENCES.call);
		}
	};

	// 즐겨찾기 링크 추가
	var linkCreate = function(parent) {
		var linkList = P.linkList;
		if(!linkList) {
			return;
		}

		var ul = createElement("ul",parent);
		if(P.linkSide) {
			ul.id = "DCL_linkSideUl";
			addStyle(
				"ul#DCL_linkSideUl {margin-top:5px}" +
				"ul#DCL_linkSideUl a {display:block ; overflow:hidden ; text-align:center ; color:#666 ; background-color:#f9f9f9 ; border-width:1px 1px 0 1px ; border-style:solid ; border-color:#999 ; -moz-border-radius:2px 5px 5px 2px ; -webkit-border-radius:2px 5px 5px 2px ; text-decoration:none}" +
				"ul#DCL_linkSideUl > li:last-child > a {border-bottom-width:1px}" +
				"ul#DCL_linkSideUl > li > a:hover {color:#fff ; background-color:#333 ; border-color:#333}" +
				"ul#DCL_linkSideUl a.DCL_linkThis {color:#fff ; background-color:#666 ; border-color:#666}"
			);
			if(!P.best && P.sideMini) {
				addStyle("ul#DCL_linkSideUl a {width:12px ; padding:8px ; font:12px/1.2em 돋움}");
			} else {
				addStyle("ul#DCL_linkSideUl a {width:78px ; padding:5px 0px ; font:12px/12px 돋움}");
			}
		} else {
			ul.id = "DCL_linkUl";
			addStyle(
				"ul#DCL_linkUl > li {display:inline}" +
				"ul#DCL_linkUl a {padding:4px 10px ; color:#666 ; background-color:#f9f9f9 ; border-width:0 0 1px 1px ; border-style:solid ; border-color:#ccc ; -moz-border-radius:0 0 5px 5px ; -webkit-border-radius:0 0 5px 5px}" +
				"ul#DCL_linkUl > li:last-child > a {border-right-width:1px}" +
				"ul#DCL_linkUl a.DCL_thisLink {color:#fff ; background-color:#666 ; border-color:#666 ; font-weight:bold}" +
				"ul#DCL_linkUl a:hover {color:#fff ; background-color:#999 ; border-color:#999 ; text-decoration:none}"
			);
		}

		var regexp = /([^@]+)(@{1,2})((http:\/\/)?.+)/ig;
		var exec,href,className,li,a;
		while((exec=regexp.exec(linkList))) {
			if(exec[4]) {
				href = exec[3];
				className = "DCL_linkHttp";
			} else {
				href = "http://gall.dcinside.com/list.php?id=" + exec[3];
				className = "DCL_linkGall" + (exec[3]===_ID?" DCL_linkThis":"");
			}
			li = createElement("li",ul);
			a = createElement("a",li,{href:href,className:className,textContent:exec[1]});
			if(exec[2].length === 2) {
				a.target = "_blank";
			}
		}
	};

	var topCreate = function() {
		addStyle(
			"div#DCL_topDiv {position:relative ; width:"+(MODE.list?P.listWidth:P.articleWidth)+"px ; margin:0 auto ; z-index:1000}" +
			"ul#DCL_topBtnUl {position:absolute ; right:0 ; top:3px}" +
			"ul#DCL_topBtnUl > li {display:inline ; margin-left:5px ; font:bold 10px/10px Arial ; color:#888 ; cursor:pointer}" +
			"ul#DCL_topBtnUl > li:hover {color:#000}" +
			"html.DCL_headerOn li.DCL_headerBtn, html.DCL_topOn li.DCL_topBtn, html.DCL_sideOn li.DCL_sideBtn, html.DCL_pageOn li.DCL_pageBtn, html.DCL_columnOn li.DCL_columnBtn {color:#000 !important}"
		);
		addClass(document.documentElement,"DCL_topOn");

		var topDiv = createElement("div",[document.body,0],{id:"DCL_topDiv"});
		var topBtnUl = createElement("ul",topDiv,{id:"DCL_topBtnUl"});
		if(P.top) {
			var topBtn = P.topBtn.split("/");
			for(var i=0,l=topBtn.length ; i<l ; i+=1) {
				btnCreate(topBtn[i],topBtnUl);
			}
		}
		if( (!P.top || P.topBtn.indexOf("set")===-1) && (!P.side || P.sideBtn.indexOf("set")===-1 )) {
			btnCreate("set",topBtnUl);
		}

		if(P.link && !P.linkSide) {
			linkCreate(topDiv);
		}
	};
	topCreate();

	var sideScroll = function() {
		var sideWrap = $id("DCL_sideWrap");
		if(sideWrap) {
			sideWrap.style.marginLeft = "-" + scrollBody.scrollLeft + "px";
		}
	};
	var sideCreate = function() {
		var parent  = MODE.article?"bgRelaBig" : MODE.comment?"reply1" : MODE.write?"top_div" : MODE.list?"testDiv" : null;
		var width = !P.best && P.sideMini ? 45 : 85;
		addStyle(
			"html.DCL_sideOn > body {padding-right:" + width + "px}" +
			"#"+parent+" {position:relative}" +
			"div#DCL_sideDiv {position:absolute ; top:0 ; width:" + width + "px ; height:1px ; padding-left:100%}" +
			"div#DCL_sideWrap {position:fixed ; overflow:hidden ; width:"+width+"px}" +
			"div#DCL_sideWrap > * {position:relative ; margin-left:5px}" +

			"ul#DCL_sideBtnUl {background-color:#f5f5f5 ; -moz-border-radius:3px ; -webkit-border-radius:3px}" +
			"ul#DCL_sideBtnUl:after {content:'-' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}" +
			"ul#DCL_sideBtnUl > li {float:left ; display:block ; width:40px ; height:11px ; padding:3px 0 ; font:11px/11px Tahoma ; text-align:center ; color:#888 ; cursor:pointer ; -moz-border-radius:3px ; -webkit-border-radius:3px}" +
			"ul#DCL_sideBtnUl > li:first-letter {font-weight:bold}" +
			"ul#DCL_sideBtnUl > li:hover {color:#fff !important ; background-color:#666}"
		);
		addClass(document.documentElement,"DCL_sideOn");

		var sideDiv = createElement("div",$id(parent),{id:"DCL_sideDiv"});
		sideScroll();
		window.addEventListener("scroll",sideScroll,false);

		var sideWrap = createElement("div",sideDiv,{id:"DCL_sideWrap"});

		var sideBtnUl = createElement("ul",sideWrap,{id:"DCL_sideBtnUl"});
		var sideBtn = P.sideBtn.split("/");
		for(var i=0,l=sideBtn.length ; i<l ; i+=1) {
			btnCreate(sideBtn[i],sideBtnUl);
		}

		if(P.link && P.linkSide) {
			linkCreate(sideWrap);
		}

		if(P.best && !MODE.write) { // 글쓰기 모드가 아닌 경우만 베스트 목록 생성
			addStyle(
				"ul#DCL_bestUl {margin-top:5px ; padding:0 3px ; border:1px solid #ccc ; -moz-border-radius:4px ; -webkit-border-radius:4px}" +
				"ul#DCL_bestUl > li {padding:5px 0 ; line-height:13px ; border-bottom:1px dotted #ccc }" +
				"ul#DCL_bestUl > li:last-child {border-width:0}" +
				"ul#DCL_bestUl a {font:11px/13px 돋움}" +
				"ul#DCL_bestUl a:visited {color:#999}"
			);

			var html = $id("right_div").getElementsByTagName("table")[1].innerHTML;
			var ul = createElement("ul",sideWrap,{id:"DCL_bestUl"});
			var regexp = /<a class="ad" href="(.*)">(.*?)(?:\.\.\.)? <\/a>/ig;
			var exec,li;
			while((exec = regexp.exec(html))) {
				li = createElement("li",ul);
				createElement("a",li,{href:exec[1].replace(/&amp;/g,"&"),textContent:exec[2].replace(/&lt;/g,"<").replace(/&gt;/g,">")});
			}
		}
	};
	if(P.side) {
		sideCreate();
	}
}

// 목록 기본 함수
function listDefault() {
	addStyle(
		"td.DCL_tbodyTitle {padding:3px ; background-color:#f5f5f5 ; border-bottom:1px dashed #ccc ; border-top:1px solid #ccc}" +
		"td.DCL_tbodyTitle > p:after {content:'-' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}" +
		"p.DCL_tbodyBtn {float:left}" +
		"p.DCL_tbodyBtn > span {font:9pt Verdana ; color:#333 ; margin:5px ; cursor:pointer}" +
		"#list_table > tbody > tr:last-child > td {height:5px}" +
		"a.DCL_pageLink {color:#fa0 !important}" +
		"span.DCL_tbodyLoad {margin:5px ; font:9pt Verdana}" +

		"#list_table {width:"+P.listWidth+"px ; table-layout:fixed}" +
		"#list_table > * > tr > td {overflow:hidden}" +
		"#list_table > * > tr > td:nth-child(2) {width:"+(P.listNumber?65:0)+"px}" +
		"#list_table > * > tr > td:nth-child(3) {width:"+(P.listWidth-(P.listNumber?65:0)-(P.listDate?85:0)-(P.listCount?55:0)-130)+"px}" +
		"#list_table > * > tr > td:nth-child(4) {width:120px}" +
		"#list_table > * > tr > td:nth-child(5) {width:"+(P.listDate?85:0)+"px}" +
		"#list_table > * > tr > td:nth-child(6) {width:"+(P.listCount?55:0)+"px}" +

		".DCL_comment1 {font-size:8pt !important ; color:#999 !important}" +
		".DCL_comment2 {font-size:8pt !important}" +
		".DCL_comment3 {font-size:8pt !important ; font-weight:bold}" +
		".DCL_comment4 {font-size:10pt !important ; font-weight:bold}" +

		".DCL_view1 {font-size:8pt !important ; color:#999 !important}" +
		".DCL_view2 {font-size:8pt !important}" +
		".DCL_view3 {font-size:8pt !important ; font-weight:bold}" +
		".DCL_view4 {font-size:10pt !important ; font-weight:bold}"
	);
	if(P.listComment) {
		addStyle(".DCL_comment1:empty:after {content:'[0]' ; font-size:7pt ; color:#ccc}");
	}

	var list_table = $id("list_table");
	var thead = createElement("thead",[list_table,0]);
	var tbody = list_table.tBodies[0];
	thead.appendChild(tbody.rows[0]);
	var tr = createElement("tr",[tbody,0]);
	createElement("td",tr,{className:"DCL_tbodyTitle",colSpan:"7"});
	listFunc(0);
}

function listFunc(p) {
	var tbody = $id("list_table").tBodies[p];
	var rows = tbody.rows;
	var row,a,a1,td;
	var regexp = /[^\d]/g;

	tbody.setAttribute("DCL_tbodyIndex",p);
	td = rows[0].cells[0];
	var tbodyBtn = createElement("p",td,{className:"DCL_tbodyBtn"});
	createElement("span",tbodyBtn,{textContent:"Page "+(p+PAGE)},function(){pageLoad(p);});
	if(!P.previewSingle) {
		createElement("span",tbodyBtn,{textContent:"↕"},function(){previewToggle(p,true);});
		createElement("span",tbodyBtn,{textContent:"↔"},function(){previewToggle(p,false);});
	}

	for(var i=2,l=rows.length-2 ; i<l ; i+=2) {
		row = rows[i];
		a = row.cells[2].getElementsByTagName("a");
		a[0].href = a[0].href.replace(/([?&]page=)\d+/,"$1"+PAGE);

		if((a1 = a[1])) { // 전체 공지에는 코멘트 링크가 존재하지 않음
			a1.href = a1.href.replace(/([?&]page=)\d+/,"$1"+PAGE);
			c = Number(a1.textContent.replace(regexp,""));
			c = c<5?1 : c<20?2 : c<50?3 : 4;
			addClass(a1.firstChild,"DCL_comment"+c);
		}

		td = row.cells[5];
		c = Number(td.textContent);
		c = c<30?1 : c<100?2 : c<300?3 : 4;
		addClass(td.firstChild,"DCL_view"+c);
	}
}

// 다중 목록
function pageFunc() {
	addClass(document.documentElement,"DCL_pageOn");
	if( P.pageLength < 2 || MODE.search) { // 검색모드에서는 그냥 리턴
		return;
	}

	var list = $id("testDiv").firstChild;
	while(list.className !== "pageing") {
		list = list.nextSibling;
	}
	list = list.rows[0].cells[1].getElementsByTagName("strong")[0].nextSibling;
	var tbody;
	for(var i=1,l=P.pageLength ; i<l ; i+=1) {
		if(list) { // 페이징 목록에 다중 목록 스타일 추가
			if(list.textContent.indexOf("..") !== -1 || list.childNodes.length > 1) {
				list = null;
			} else {
				addClass(list,"DCL_pageLink");
				list = list.nextSibling;
			}
		}
		tbody = createElement("tbody",$id("list_table"));
		pageLoad(i);
	}
}

function pageLoad(p) {
	previewToggle(p,false);
	var tbody = $id("list_table").tBodies[p];
	tbody.innerHTML = "<tr><td colspan='7' class='DCL_tbodyTitle'><span class='DCL_tbodyLoad'>Loading... (Page " + (p+PAGE) + ")</span></td></tr>";

	xmlhttpRequest({
		method:"GET",
		url:"http://gall.dcinside.com/list.php?id="+_ID+"&page="+(p+PAGE),
		headers:{"Accept":"text/html"},
		onload:function(response) { // 전체 html을 직접 DOM으로 넣고 list_table을 찾는 것이 간단하겠지만 로딩이 길어지므로 목록 부분만 잘라서 직접 html로 집어넣음
			var text = response.responseText;
			var html = text.substring(text.indexOf("<tr onMouseOver=this.style.backgroundColor='#F2F0F9' onMouseOut=this.style.backgroundColor=''>"),text.indexOf("<td width=5 colspan=7 height=5></td>"));
			var rows,cell;
			if(html) {
				tbody.innerHTML = "<tr><td colspan='7' class='DCL_tbodyTitle'></td></tr><tr><td colspan='7'></td></tr>" +
					html + 
					"<td colspan='7'></td></tr>";
				rows = tbody.rows;
				cell = rows[0].cells[0];

				listFunc(p);
				if(P.filter) {
					blockArticleFunc(tbody);
				}
				previewFunc(p);
			} else {
				cell = tbody.rows[0].cells[0];
				cell.innerHTML = "";
				createElement("span",cell,{textContent:"Loading failed (Page "+(p+PAGE)+")",className:"DCL_tbodyLoad"},function(){pageLoad(p);});
			}
		}
	});
}

// 게시물 미리보기
var previewToggle;
var previewFunc = function(t) {
	var option = P.imageOption.split("/");
	var width = Number(option[0]);
	var height = Number(option[1]);

	var td_s = P.listNumber?2 : 3;
	var td_e = P.listCount?2 : P.listDate?3 : 4;

	addStyle(
		"#list_table > tbody > tr > td:nth-child(3) > img {cursor:pointer}" +

		"tr.DCL_previewTr > td:nth-child(n+"+td_s+"):nth-last-child(n+"+td_e+") {border-width:2px 0 1px ; border-style:solid ; border-color:#999 ; padding-top:2px}" +
		"tr.DCL_previewTr > td:nth-child("+td_s+") {border-left-width:2px !important ; -moz-border-radius:5px 0 0 0 ; -webkit-border-radius:5px 0 0 0}" +
		"tr.DCL_previewTr > td:nth-last-child("+td_e+") {border-right-width:2px !important ; -moz-border-radius:0 5px 0 0 ; -webkit-border-radius:0 5px 0 0}" +

		"div.DCL_previewDiv {position:relative ; width:"+(P.listWidth-30)+"px ; " + (P.previewResize?"max-height:"+((P.previewHeight||document.documentElement.clientHeight)-28)+"px ; ":"") + "overflow:auto ; border-width:0 2px 2px ; border-style:solid ; border-color:#999 ; -moz-border-radius:0 0 5px 5px ; -webkit-border-radius:0 0 5px 5px ; padding:0 8px ; margin-bottom:10px ; word-wrap:break-word}" +

		"p.DCL_previewBtn > span {font-size:8pt ; font-family:Arial ; margin:3px ; cursor:pointer}" +
		"span.DCL_previewLoad {font-style:italic ; font-weight:bold ; margin-left:5px}" +
		"p.DCL_previewBtn > span:hover {color:#999}" +

		"ul.DCL_previewImgs {position:relative}" +
		"ul.DCL_previewImgs > li {float:left ; width:" + width + "px ; height:" + height + "px ; margin:4px ; background-color:#eee ; border:1px solid #999"+(BROWSER.opera?"":" ; text-align:center")+"}" + // opera 버그
		"ul.DCL_previewImgs img {max-width:" + width + "px ; max-height:" + height + "px ; background-color:#fff}" +
		"ul.DCL_previewImgs:after {content:'-' ; display:block ; clear:both ; width:0 ; height:0 ; overflow:hidden}" +

		"div.DCL_previewFlash > div {border:1px solid #ccc ; margin-bottom:10px}" +
		"div.DCL_previewFlash > div > span:first-child {margin-left:5px ; font:8pt/1.5em Arial ; color:#666}" +

		"div.DCL_previewText {clear:both ; border:1px solid #999 ; margin:5px 0 ; padding:9px}" +
		"div.DCL_previewText * {max-width:"+(P.listWidth-70)+"px}" + // div padding

		"table.DCL_previewComment {width:100% ; border-collapse:collapse ; table-layout:fixed}" +
		"table.DCL_previewComment tr {border-bottom:1px solid #ccc}" +
		"table.DCL_previewComment tr:hover {background-color:#f0f0f0}" +
		"table.DCL_previewComment td.com_name {width:120px}" +
		"table.DCL_previewComment td.com_text {width:auto}" +
		"table.DCL_previewComment td.com_chat {width:10px}" +
		"table.DCL_previewComment td.com_ip {width:90px ; font:8pt Arial}" +
		"table.DCL_previewComment td.com_btn {width:12px}" +
		"table.DCL_previewComment span.line {display:none}" +
		"table.DCL_previewComment span.num2 {margin-left:1em ; font:8pt Arial ; color:#999}" +

		"div.DCL_replyDiv {position:relative ; margin:5px 0 ; padding:"+(_GID?"0 45px 0 0":"0 120px 0 105px")+"}" +
		"p.DCL_replyP {position:absolute ; top:0 ; left:0 ; width:100% ; height:100% ; background-color:#000 ; color:#fff ; opacity:0.7 ; font:bold 9pt/1.5 돋움 ; text-align:center ; display:none}" +
		"div.DCL_replyDiv > input {border:1px solid #666}" +
		"input.DCL_replyName {position:absolute ; top:0 ; left:0 ; width:100px}" +
		"input.DCL_replyMemo {position:relative ; width:100%}" +
		"input.DCL_replyPassword {position:absolute ; top:0 ; right:40px ; width:75px}" +
		"input.DCL_replySubmit {position:absolute ; top:0 ; right:0 ; width:35px ; font-size:8pt ; color:#fff ; background-color:#666}" +

		"div#DCL_delComment {position:absolute ; width:140px ; height:16px ; margin-top:-18px ; margin-left:-142px ; background-color:#fff ; border:1px solid #666}" +
		"input#DCL_delPassword {width:110px ; height:100%}" +
		"input#DCL_delBtn {width:30px ; height:100% ; font-size:8pt ; background-color:#666 ; color:#fff}" +

		"tr.DCL_previewActive > td {border-color:#333 !important}" +
		"div.DCL_previewActive {border-color:#333 !important}" +

		"tr.DCL_previewRemoved,tr.DCL_previewRemoved+tr {display:none}"
	);

	if(MODE.list) {
		addStyle(
			"html.DCL_columnOn tr.DCL_previewActive > td {height:"+(BROWSER.chrome?44:50)+"px ; border-width:2px 0 !important ; border-style:solid ; -moz-border-radius:0 ; -webkit-border-radius:0 ; background-color:#f5f5f5}" +
			"html.DCL_columnOn tr.DCL_previewActive > td:first-child {border-left-width:2px !important ; -moz-border-radius:5px 0 0 5px ; -webkit-border-radius:5px 0 0 5px}" +
			"html.DCL_columnOn tr.DCL_previewActive + tr > td {padding-bottom:10px}"+
			"html.DCL_columnOn div.DCL_previewActive {position:absolute ; margin-top:-50px ; width:"+(P.articleWidth-20)+"px ; margin-left:"+(P.listWidth-5)+"px ; min-height:50px ; border-top-width:2px ; -moz-border-radius:0 5px 5px 5px ; -webkit-border-radius:0 5px 5px 5px}" +
			"html.DCL_columnOn div.DCL_previewActive {" + (P.previewResize?"max-height:"+((P.previewHeight||document.documentElement.clientHeight)-4)+"px":"") + "}" +
			"html.DCL_columnOn div.DCL_previewActive div.DCL_previewText * {max-width:"+(P.articleWidth-40)+"px}"
		);
	}

	var activeObj = null;
	var list = {};

	var execute = function(t) {
		if(!list[t]) {
			list[t] = {};
		}
		var rows = $id("list_table").tBodies[t].rows;
		var img;
		for(var i=2,l=rows.length-2 ; i<l ; i+=2) {
			img = rows[i].cells[2].childNodes[1];
			img.addEventListener("click",receive,false);
		}
	};
	var receive = function(e) {
		var row = e.target.parentNode.parentNode;
		var r = row.sectionRowIndex;
		var t = row.parentNode.getAttribute("DCL_tbodyIndex");
		if(list[t][r]) {
			list[t][r].close();
		} else {
			load(t,r);
		}
	};
	var load = function(t,r) {
		var preview = list[t][r];
		if(preview) {
			preview.call();
		} else {
			preview = new instance(t,r);
		}
		return preview;
	};
	var instance = function(t,r) {
		list[t][r] = this;
		var that = this;
		var row,cell,div,viewer,no;

		var call = function() {
			if(!row) {
				var tbody = $id("list_table").tBodies[t];
				row = tbody.rows[r];
				addClass(row,"DCL_previewTr");
				cell = tbody.rows[r+1].cells[1];
				cell.removeAttribute("background");
				div = createElement("div",cell,{className:"DCL_previewDiv"});
				viewer = imageViewer();
				no = /no=(\d+)/.exec(row.cells[2].childNodes[3].href)[1];
			}

			div.innerHTML = "";
			var btns = createElement("p",div,{className:"DCL_previewBtn"});
			createElement("span",btns,"CLOSE",close);
			createElement("span",btns,"RELOAD",call);
			var loadSpan = createElement("span",btns,{className:"DCL_previewLoad",textContent:"Loading..."});

			if(activeObj && activeObj !== that) {
				var offset = getOffset(row) - scrollBody.scrollTop;
				if(P.previewSingle) {
					activeObj.close();
				} else {
					activeObj.blur();
				}
				scrollBody.scrollTop = getOffset(row) - offset;
			}
			addClass(row,"DCL_previewActive");
			addClass(div,"DCL_previewActive");
			addClass(document.documentElement,"DCL_previewOn");
			activeObj = that;

			xmlhttpRequest({
				method:"GET",
				url:"http://gall.dcinside.com/list.php?id="+_ID+"&no="+no,
				headers:{"Accept":"text/html"},
				onload:function(response) {
					if(!list[t][r]) {
						return;
					}
					var regexp,exec,i,l;
					var text = response.responseText;
					if(text.substr(0,9) === "<!DOCTYPE") {
						var imgHTML = text.substring(text.indexOf("<div id='bgRelaBig'"),text.indexOf("<div id='bgRela'"));
						if(!imgHTML) { // 삭제된 게시물
							loadSpan.textContent = "Removed article";
							setTimeout(function(){close();addClass(row,"DCL_previewRemoved");},2000);
							return;
						}
						viewer.clear();
						div.innerHTML = "";
						var topBtn = createElement("p",div,{className:"DCL_previewBtn"});
						createElement("span",topBtn,"CLOSE",close);
						createElement("span",topBtn,"RELOAD",call);
						createElement("span",topBtn,"REPLY",function(){focus();div.scrollTop=div.scrollHeight;replyMemo.focus();});

						if(P.previewImage) {
							var imgUl = createElement("ul",null,{className:"DCL_previewImgs"});
							var imgReg = /src='(http:\/\/\w+\.dcinside\.com\/viewimage\.php[^']+)|src="(http:\/\/uccfs\.paran\.com[^"]+)/g;
							var imgI = 0;
							var img,src,li;
							regexp = /^(http:\/\/uccfs\.paran\.com\/.+\/)IMG(\/.+)(_.\.\w+)$/;
							while((exec = imgReg.exec(imgHTML))) {
								imgI += 1;
								src = exec[1] || exec[2];
								li = createElement("li",imgUl);
								img = createElement("img",li,{src:src.replace(regexp,"$1THUMB$2_thumb1$3"),alt:"Image #"+imgI});
								viewer.add(src,img);
							}
							if(imgI) {
								div.appendChild(imgUl);
							}

							var flashDiv = createElement("div",null,{className:"DCL_previewFlash"});
							var flashReg = /src='(http:\/\/mediafile\.dcinside\.com[^']+)|insertFlash\("(http:\/\/flvs\.daum\.net[^"]+)", (\d+), (\d+)/g;
							var flashI = 0;
							var wrap;
							while((exec = flashReg.exec(imgHTML))) {
								flashI += 1;
								wrap = createElement("div",flashDiv);
								wrap.style.width = (exec[3]||400) + "px";
								createElement("span",wrap,{textContent:"Movie #"+flashI});
								createElement("object",wrap,{type:"application/x-shockwave-flash",data:exec[1]||exec[2],width:exec[3]||400,height:exec[4]||300});
							}
							if(flashI) {
								div.appendChild(flashDiv);
							}
						}

						if(P.previewText) {
							var textDiv = createElement("div",div,{className:"DCL_previewText",innerHTML:text.substring(text.indexOf("<!-- google_ad_section_start -->")+32,text.indexOf("<!-- google_ad_section_end -->"))});
							var textImgs = textDiv.getElementsByTagName("img");
							var textImg;
							for(i=0,l=textImgs.length ; i<l ; i+=1) {
								textImg = textImgs[i];
								textImg.removeAttribute("width");
								textImg.removeAttribute("height");
								viewer.add(textImg.src,textImg);
							}
							if(P.autoLink) {
								autoLinkFunc(textDiv);
							}
						}

						if(P.hide) {
							hideFunc(div,topBtn);
						}

						if(P.previewComment) {
							var commentIndex = text.indexOf("<table class=\"comment-table\"");
							var commentSI = text.indexOf("<tr>",commentIndex);
							var commentEI = text.indexOf("</table>",commentIndex);
							var commentHTML = commentSI > -1 && commentEI > -1 && commentSI < commentEI ? text.substring(commentSI,commentEI) : "";

							if(commentHTML) {
								var commentTable = createElement("table",div,{className:"DCL_previewComment",innerHTML:commentHTML});

								var deleteCall = function(e) {
									var btn = e.target;
									var delDiv = $id("DCL_delComment");
									var delBtn = $id("DCL_delBtn");
									if(!delDiv) {
										delDiv = createElement("div",document.body,{id:"DCL_delComment"});
										createElement("input",delDiv,{type:"password",id:"DCL_delPassword"});
										delBtn = createElement("input",delDiv,{type:"button",id:"DCL_delBtn",value:"삭제"},deleteExec);
									}
									if(btn.getAttribute("DCL_del_c_no") === delBtn.getAttribute("DCL_del_c_no")) {
										delDiv.style.display = "none";
										delBtn.removeAttribute("DCL_del_no");
										delBtn.removeAttribute("DCL_del_c_no");
									} else {
										btn.parentNode.appendChild(delDiv);
										delBtn.setAttribute("DCL_del_no",btn.getAttribute("DCL_del_no"));
										delBtn.setAttribute("DCL_del_c_no",btn.getAttribute("DCL_del_c_no"));
										delDiv.style.display = "block";
									}
								};
								var deleteExec = function(e) {
									if(!confirm("덧글을 삭제하겠습니까?")) {
										return;
									}
									var btn = e.target;

									xmlhttpRequest({
										method:"GET",
										url:"http://gall.dcinside.com/delcomment_ok.php?id=" + _ID + "&no=" + btn.getAttribute("DCL_del_no") + "&c_no=" + btn.getAttribute("DCL_del_c_no") + ($id("DCL_delPassword") ? "&password="+$id("DCL_delPassword").value : ""),
										onload:function(response) {
											var res = /<DELCOMMENTOK RESULT = "(\w+)"  ALERT="(.*)"  \/>/.exec(response.responseText);
											if(!res) {
												alert("덧글 삭제 중 오류가 발생했습니다.\n\n#code\n"+response.responseText);
												return;
											}
											if(res[1] === "1") {
												call();
											} else {
												alert(res[2]);
											}
										}
									});
								};

								var rows = commentTable.rows;
								var btn,onclick;
								var reg1 = /show_delbox\((\d+),\d+\)/;
								var reg2 = /new_delComment\d*\('\w+',\d+,(\d+)\)/;
								for(i=0,l=rows.length ; i<l ; i+=1) {
									btn = commentTable.rows[i].cells[4].getElementsByTagName("img")[0];
									if(btn && (onclick=btn.getAttribute("onclick"))) {
										removeEvent(btn,"onclick");
										if((exec=reg1.exec(onclick))) {
											btn.addEventListener("click",deleteCall,false);
										} else if((exec=reg2.exec(onclick))) {
											btn.addEventListener("click",deleteExec,false);
										} else {
											return;
										}
										btn.setAttribute("DCL_del_no",no);
										btn.setAttribute("DCL_del_c_no",exec[1]);
									}
								}

								if(P.filter) {
									blockCommentFunc(commentTable);
								}
							}

							var replyDiv = createElement("div",div,{className:"DCL_replyDiv"});
							var submit = function(){
								var memo = replyMemo.value;
								if(!memo) {
									alert("덧글 내용을 입력하세요.");
									replyMemo.focus();
									return;
								}
								var data = "id="+_ID+"&no="+no+"&memo="+encodeURIComponent(memo);
								if(!_GID) {
									if(!replyName.value) {
										alert("이름을 입력하세요.");
										replyName.focus();
										return;
									}
									if(!replyPassword.value) {
										alert("비밀번호를 입력하세요.");
										replyPassword.focus();
										return;
									}
									data += "&name="+encodeURIComponent(replyName.value)+"&password="+encodeURIComponent(replyPassword.value);
								}
								replyP.textContent = "덧글 등록 중...";
								replyP.style.display = "block";

								xmlhttpRequest({
									method:"POST",
									url:"http://gall.dcinside.com/comment_ok.php",
									data:data,
									headers:{"Accept":"text/html","Content-Type":"application/x-www-form-urlencoded"},
									onload:function(response) {
										var res = /<COMMENTOK RESULT = "(\w+)" ALERT="(.*)" \/>/.exec(response.responseText);
										if(!res) {
											alert("덧글 등록 중 오류가 발생했습니다.\n\n#code\n"+response.responseText);
											return;
										}
										if(res[1] === "1") {
											call();
										} else {
											alert(res[2]);
										}
										replyP.textContent = "";
										replyP.style.display = "none";
									}
								});
							};
							var replyMemo = createElement("input",replyDiv,{type:"text",className:"DCL_replyMemo"});
							replyMemo.addEventListener("keypress",function(e){if(e.keyCode===13){submit();}},false);
							if(!_GID) {
								var replyName = createElement("input",[replyDiv,0],{type:"text",className:"DCL_replyName"}); // name
								var replyPassword = createElement("input",replyDiv,{type:"password",className:"DCL_replyPassword"}); // password
								replyPassword.addEventListener("keypress",function(e){if(e.keyCode===13){submit();}},false);
								if(P.autoForm) {
									replyName.value = P.autoName;
									replyPassword.value = P.autoPassword;
								}
							}
							createElement("input",replyDiv,{type:"button",className:"DCL_replySubmit",value:"확인"},submit);
							var replyP = createElement("p",replyDiv,{className:"DCL_replyP"});
						}

						var bottomBtn = createElement("p",div,{className:"DCL_previewBtn"});
						createElement("span",bottomBtn,"CLOSE",close);
						createElement("span",bottomBtn,"RELOAD",call);
						createElement("span",bottomBtn,"UP",function(){focus();div.scrollTop=0;});
					} else { // 로드 에러
						loadSpan.textContent = "Loading failed.";
					}

					if(activeObj === that) {
						focus();
					}
				}
			});
		};
		var focus = function() {
			var scroll = scrollBody.scrollTop;
			var offset = getOffset(row);
			var gap = document.documentElement.clientHeight - div.offsetHeight - (activeObj===that?0:row.offsetHeight);
			if(scroll > offset) { // preview 의 top 이 현재 화면 영역 위로 올라간 경우
				scrollBody.scrollTop = offset;
			} else if(offset - scroll > gap) { // preview 의 bottom 이 현재 화면 영역 아래로 내려간 경우
				scrollBody.scrollTop = offset - (gap>0?gap:0);
			}
		};
		var blur = function() {
			if(activeObj !== that) {
				return;
			}
			removeClass(row,"DCL_previewActive");
			removeClass(div,"DCL_previewActive");
			activeObj = null;
			removeClass(document.documentElement,"DCL_previewOn");
		};
		var close = function() {
			blur();
			removeClass(row,"DCL_previewTr");
			cell.removeChild(div);
			delete list[t][r];
		};
		this.call = call;
		this.blur = blur;
		this.close = close;
		call();
	};

	previewToggle = function(p,flag) {
		var rows = $id("list_table").tBodies[p].rows;
		if(flag) {
			var preview;
			for(var i=2,l=rows.length-2 ; i<l ; i+=2) {
				if(rows[i].cells[1].textContent.indexOf("공지") === -1) {
					preview = load(p,i);
				}
			}
			if(preview) {
				preview.blur();
			}
		} else {
			for(var i in list[p]) {
				if(list[p].hasOwnProperty(i)) {
					list[p][i].close();
				}
			}
		}
	};

	execute(t);
	previewFunc = execute;
};

// 타이틀 수정
function titleFunc() {
	var newTitle,g="",p="",t="",w="";
	if(MODE.write) {
		newTitle = P.listTitle;
		g = document.title;
		p = "글쓰기";
	} else if(MODE.list) {
		newTitle = P.listTitle;
		g = $id("share_name").value;
		p = PAGE;
	} else {
		newTitle = P.articleTitle;
		g = $id("share_name").value;
		t = $id("titleShare").textContent.replace(/^\s+|\s+$/g,"");
		w = $id("titleShare").parentNode.parentNode.rows[0].cells[2].textContent.replace(/^\s+|\s+$/g,"");
	}
	document.title = newTitle.replace(/\{G\}/g,g).replace(/\{P\}/g,p).replace(/\{T\}/g,t).replace(/\{W\}/g,w);
}

// 이미지 뷰어
var imageViewer = function() {
	var box,dragImg,ratioSpan,indexSpan,list,index,height,width,x,y,ratio,moved,downed,wheeled;
	var init = function() {
		addStyle(
			"div#DCL_viewerDiv {position:fixed ; overflow:hidden ; top:0 ; left:0 ; width:100% ; height:100% ; z-index:1002 ; display:none}" +
			"div#DCL_viewerBack {position:fixed ; top:0 ; left:0 ; width:100% ; height:100% ; background-color:#000 ; opacity:0.8}" +
			"img#DCL_dragImg {position:absolute ; border:2px solid #000 ; background-color:#fff ; cursor:pointer ; cursor:-moz-grab}" +
			"img#DCL_dragImg:active {cursor:-moz-grabbing}" +
			"div#DCL_viewerBtn {position:absolute ; top:0 ; right:0 ; padding:2px 0}" +
			"div#DCL_viewerBtn > span {font:10pt Arial ; -moz-border-radius:6px ; -webkit-border-radius:6px ; padding:2px 4px ; margin-right:2px ; background-color:#eee ; cursor:pointer}" +
			"html.DCL_hideMediaAll object, html.DCL_hideMediaAll embed {visibility:hidden}" // 이미지 뷰어 사용시 object 가 가리는 것 방지 (일일이 wmode 를 부여할 수는 없음)
		);
		box = createElement("div",document.body,{id:"DCL_viewerDiv"});
		box.addEventListener("mousedown",down,false);
		box.addEventListener("mouseup",up,false);
		box.addEventListener("DOMMouseScroll",wheel,false);
		box.addEventListener("mousewheel",wheel,false);
		box.addEventListener("contextmenu",contextmenu,false);
		box.addEventListener("click",returnFalse,false);

		createElement("div",box,{id:"DCL_viewerBack"});

		dragImg = createElement("img",box,{id:"DCL_dragImg"});
		dragImg.addEventListener("load",load,false);
		dragImg.addEventListener("dragstart",returnFalse,false);

		var btn = createElement("div",box,{id:"DCL_viewerBtn"});
		btn.addEventListener("mousedown",returnFalse,false); // drag 방지
		btn.addEventListener("mouseup",returnFalse,false); // 닫기 방지

		ratioSpan = createElement("span",btn,"100%");
		createElement("span",btn,"<",function(){open(index-1);});
		indexSpan = createElement("span",btn,"0/0");
		createElement("span",btn,">",function(){open(index+1);});
		createElement("span",btn,"F",fit);
		createElement("span",btn,"2x",function(){zoom(2);});
		createElement("span",btn,"1.5x",function(){zoom(1.5);});
		createElement("span",btn,"1x",function(){zoom(1);});
		createElement("span",btn,"0.5x",function(){zoom(0.5);});
		createElement("span",btn,"0.2x",function(){zoom(0.2);});
		createElement("span",btn,"CLOSE",close);
	};
	var run = function(i) {
		if(!box) {
			init();
		}
		document.addEventListener("keydown",key,false);
		addClass(document.documentElement,"DCL_hideMediaAll");
		box.style.display = "block";
		open(i);
	};
	var open = function(i) {
		if(i < 0) {
			i = 0;
		} else if(i > list.length-1) {
			i = list.length - 1;
		}
		if(i === index) {
			return;
		}
		index = i;
		indexSpan.textContent = (index+1) + "/" + (list.length);
		height=width=x=y=ratio=0;
		dragImg.style.visibility = "hidden";
		dragImg.removeAttribute("width");
		dragImg.removeAttribute("height");
		dragImg.src = list[i];
		box.style.cursor = "progress";
	};
	var load = function() {
		height = dragImg.height;
		width = dragImg.width;
		fit();
		dragImg.style.visibility = "visible";
		box.style.cursor = "crosshair";
	};
	var close = function() {
		box.style.display = "none";
		dragImg.src = "";
		list = null;
		index = null;
		moved = false;
		downed = false;
		wheeled = false;
		document.removeEventListener("keydown",key,false);
		removeClass(document.documentElement,"DCL_hideMediaAll");
		remove();
	};
	var down = function(e) {
		if(e.button !== 0) {
			return;
		}
		moved = false;
		downed = true;
		wheeled = false;
		if(e.target.id === "DCL_dragImg") {
			x = e.clientX - dragImg.offsetLeft;
			y = e.clientY - dragImg.offsetTop;
			document.addEventListener("mousemove",move,false);
			document.addEventListener("mouseout",remove,false);
		}
		returnFalse(e);
	};
	var up = function(e) {
		if(e.button === 2 && e.target.id !== "DCL_dragImg") {
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
	var contextmenu = function(e) {
		if(e.target.id !== "DCL_dragImg") {
			returnFalse(e);
		}
	};
	var move = function(e) {
		dragImg.style.left = e.clientX - x + "px";
		dragImg.style.top = e.clientY - y + "px";
		moved = true;
	};
	var remove = function() {
		document.removeEventListener("mousemove",move,false);
		document.removeEventListener("mouseout",remove,false);
	};
	var wheel = function(e) {
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
		returnFalse(e);
	};
	var key = function(e) {
		var code = e.keyCode;
		if(code === 38) { // up
			open(index-1);
		} else if(code === 40) { // down
			open(index+1);
		} else if(code === 33) { // pageup
			open(index-5);
		} else if(code === 34) { // pagedown
			open(index+5);
		} else if(code === 36) { // home
			open(0);
		} else if(code === 35) { // end
			open(list.length-1);
		} else if(code === 107 || code === 187) { // +
			zoom((Math.floor(ratio*10)+1)/10);
		} else if(code === 109 || code === 189) { // -
			zoom((Math.ceil(ratio*10)-1)/10);
		} else if(code === 8) { // back space
			close();
		} else {
			return;
		}
		returnFalse(e);
	};
	var fit = function() {
		var cH = document.documentElement.clientHeight;
		var cW = document.documentElement.clientWidth;
		var r = Math.min(1,cH/height,cW/width);
		zoom(r);
		dragImg.style.top = Math.max((cH-height*ratio)/2,0) -2 + "px"; // border 2
		dragImg.style.left = Math.max((cW-width*ratio)/2,0) -2 + "px";
	};
	var zoom = function(r) {
		if(r < 0.2) {
			r = 0.2;
		} else if(r > 2) {
			r = 2;
		}
		if(r === ratio) {
			return;
		}
		ratio = r;
		dragImg.style.top = dragImg.offsetTop + dragImg.height/2 - height*ratio/2 + "px";
		dragImg.style.left = dragImg.offsetLeft + dragImg.width/2 - width*ratio/2 + "px";
		dragImg.height = height * ratio;
		dragImg.width = width * ratio;
		ratioSpan.textContent = Math.round(ratio*100) + "%";
	};
	var instance = function() {
		var thislist = [];
		this.add = function(src,obj) {
			var i = thislist.length;
			thislist[i] = src;
			addClass(obj,"DCL_viewerImg");
			obj.addEventListener("click",function(){list=thislist;run(i);},false);
		};
		this.clear = function() {
			thislist.length = 0;
		};
	};
	imageViewer = function() {
		return (new instance());
	};
	return (imageViewer());
};

// 이미지 관련 작업용 : 본문 이미지
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

// 본문 이미지 뷰어
function articleViewerFunc(imgs) {
	var viewer = imageViewer();
	var img;
	for(var i=0,l=imgs.length ; i<l ; i+=1) {
		img = imgs[i];
		if(img.id.indexOf("dc_image_elm_") === 0) {
			img.parentNode.removeAttribute("href");
		}
		removeEvent(img,"onclick");
		viewer.add(img.src,img);
	}
}

// 이미지 모아보기
var imageAlbumFunc = function(e) {
	var option = P.imageOption.split("/");
	var width = Number(option[0]) || 160;
	var height = Number(option[1]) || 120;
	var cols = Number(option[2]) || 5;
	var per = Number(option[3]) || 25;
	var network = 5; // 최대 연결 개수

	var page,on,sno,ino,render;
	var retryData = {}; // 재시도 내역 개체
	var listData = {}; // 게시물 정보 개체
	var serialData = []; // 이미지 일렬화
	var loaded = 0; // 총 로딩 이미지 개수
	var target; // 로드해야 할 전체 이미지 개수
	var conn = 0; // 현재 연결 개수

	var receive = function(p) {
		on = true;
		render = false;
		page = p;
		target = (page+1) * per;
		document.body.style.overflow = "hidden";
		addClass(document.documentElement,"DCL_hideMediaAll");
		div.style.display = "block";
		loadSpan.textContent = "Loading...";
		for(var i=0 ; i<20 ; i+=1) {
			dataSpan.childNodes[i].className = i===page ? "DCL_albumNow" : "";
		}
		ul.innerHTML = "";

		if(serialData.length < target) {
			for(i=conn ; i<network ; i+=1) { //while 은 무한 루프 가능 ; 작업도중 i와 중복 방지
				call(sno);
				sno -= 1;
				conn += 1;
			}
		} else {
			execute();
		}
	};
	var call = function(no) {
		var called = setTimeout(function(){listData[no]=true;serialize(no);},10000); // 10초간 응답없을 경우 채우고 serialize
		xmlhttpRequest({
			method:"GET",
			url:"http://gall.dcinside.com/list.php?id="+_ID+"&no="+no,
			headers:{"Accept":"text/html"},
			onload:function(response) {
				clearTimeout(called); // 미응답 timeout 제거
				var text = response.responseText;
				if(text.substr(0,9) === "<!DOCTYPE") {
					var imgHTML = text.substring(text.indexOf("<div id='bgRelaBig'"),text.indexOf("<div id='bgRela'"));
					if(imgHTML) {
						var imgs = [];
						var regexp = /src=['"]((?:http:\/\/\w+.dcinside.com\/viewimage\.php\?|http:\/\/uccfs.paran.com)[^'"]+)/g;
						var exec;
						while((exec = regexp.exec(imgHTML))) {
							imgs.push(exec[1]);
						}
						if(imgs.length) {
							listData[no] = {
								no : no,
								name : /<strong>(?:갤로거|이 름)<\/strong>(?:\n|.)*?>([^<]+)<\/span>/.exec(text)[1],
								title : /<strong>제 목<\/strong>(?:\n|.)*?> ([^<]+) <\/td>/.exec(text)[1],
								imgs : imgs
							};
							loaded += imgs.length;
							serialize(no); // data가 있을 경우 바로 serialize 호출 (리턴)
							return;
						}
					}
				} else { // 응답을 못받았을 경우(과다 사용자)
					retryData[no] = (retryData[no] || 0) + 1;
					if(retryData[no] < 3) {
						call(no); // 2번 이내의 경우 재호출(리턴)
						return;
					}
				}
				listData[no] = true; // 이도저도 아닌 경우 data를 채우고 serialize 호출
				serialize(no);
			}
		});
	};
	var serialize = function(no) {
		delete retryData[no];

		if(ino === no) {
			while(listData[ino]) {
				var obj = listData[ino];
				if(obj.imgs) {
					for(var i=0,l=obj.imgs.length ; i<l ; i+=1) {
						serialData.push({no:obj.no,name:obj.name,title:obj.title,img:obj.imgs[i]});
					}
				}
				delete listData[ino];
				ino -= 1;
			}
		}

		var length = serialData.length;
		if(length < target) {
			loadSpan.textContent = "Loading... " + (Math.floor(length/per)+1) + "page " + length%per + "/" + per + " (Total " + loaded + "/" + target + ")";
			if(loaded < target) {
				call(sno);
				sno -= 1;
			} else {
				conn -= 1;
			}
		} else {
			conn -= 1;
			execute();
		}
	};
	var execute = function() {
		if(render || !on) {
			return;
		}
		render = true;
		loadSpan.textContent = "Rendering...";
		viewer.clear();
		var data,li,img,p;
		var regexp = /^(http:\/\/uccfs\.paran\.com\/.+\/)IMG(\/.+)(_.\.\w+)$/;
		for(var i=0 ; i<per ; i+=1) {
			data = serialData[page*per+i];
			li = createElement("li",ul);
			img = createElement("img",li,{alt:"Image #" + (page*per+i+1) + " (" + data.title + ")",src:data.img.replace(regexp,"$1THUMB$2_thumb1$3")});
			viewer.add(data.img,img);
			p = createElement("p",li);
			createElement("span",p,data.name);
			createElement("a",p,{href:"http://gall.dcinside.com/list.php?id="+_ID+"&no="+data.no,target:"_blank",textContent:data.title});
		}
		loadSpan.textContent = "";
	};
	var close = function() {
		div.style.display = "none";
		loadSpan.textContent = "";
		ul.innerHTML = "";
		target = 0;
		on = false;
		removeClass(document.documentElement,"DCL_hideMediaAll");
		document.body.style.overflow = "auto";
	};

	addStyle(
		"div#DCL_albumDiv {position:fixed ; overflow:hidden ; top:0 ; left:0 ; width:100% ; height:100% ; z-index:1001}" +
		"div#DCL_albumBack {position:absolute ; top:0 ; width:100% ; height:100% ; background-color:#000 ; opacity:0.6}" +
		"div#DCL_albumWrap {position:absolute ; top:0 ; width:100% ; height:100% ; overflow:auto}" +
		"p#DCL_albumP {overflow:hidden ; padding:5px 0 ; font-family:Arial ; color:#fff ; background-color:#333}" +
		"p#DCL_albumP > span:first-child {font-size:16pt ; margin:10px ; cursor:pointer}" +
		"span#DCL_albumSpan > span {font-size:10pt ; margin:5px ; cursor:pointer}" +
		"span#DCL_albumSpan > span.DCL_albumNow {font-size:16pt}" +
		"span#DCL_loadSpan {margin-left:2em ; font-size:12pt ; color:#ccc}" +
		"ul#DCL_albumUl {position:relative ; overflow:auto ; width:" + (width+20)*cols + "px ; margin:10px auto}" +
		"ul#DCL_albumUl > li {float:left ; position:relative ; width:" + width + "px ; height:" + (height+40) + "px ; margin:5px ; border:5px solid #999 ; background-color:#ccc ; text-align:center}" +
		"ul#DCL_albumUl > li:nth-child(" + cols + "n+1) {clear:both}" +
		"ul#DCL_albumUl img {max-width:" + width + "px ; max-height:" + height + "px ; background-color:#fff}" +
		"ul#DCL_albumUl p {position:absolute ; overflow:hidden ; top:125px ; left:5px ; width:" + (width-10) + "px ; height:30px ; line-height:15px}" +
		"ul#DCL_albumUl span {font-weight:bold ; color:#333 ; margin-right:0.5em}" +
		"ul#DCL_albumUl a:visited {color:#999}"
	);

	var div = createElement("div",document.body,{id:"DCL_albumDiv"});
	createElement("div",div,{id:"DCL_albumBack"});
	var wrap = createElement("div",div,{id:"DCL_albumWrap"});
	var dataP = createElement("p",wrap,{id:"DCL_albumP"});
	createElement("span",dataP,"CLOSE",close);
	var dataSpan = createElement("span",dataP,{id:"DCL_albumSpan"});
	for(var i=0 ; i<20 ; i+=1) {
		createElement("span",dataSpan,i+1,function(i){return function(){receive(i);};}(i));
	}
	var loadSpan = createElement("span",dataP,{id:"DCL_loadSpan"});
	var ul = createElement("ul",wrap,{id:"DCL_albumUl"});
	var viewer = imageViewer();

	xmlhttpRequest({
		method:"GET",
		url:"http://gall.dcinside.com/list.php?id="+_ID,
		headers:{"Accept":"text/html"},
		onload:function(response) {
			sno = ino = />\d+<\/span><\/td>\n.+<a href="\/list\.php\?id=\w+&no=(\d+)/.exec(response.responseText)[1];
			receive(e);
		}
	});
	imageAlbumFunc = receive;
};

// 이미지 & 미디어 차단
var hideFunc = function(elem,parent) {
	var receive = function(e) {
		var btn = e.target;
		execute(btn,btn.textContent === "ON");
	};
	var execute = function(btn,flag) {
		if(flag === (btn.textContent === "OFF")) {
			return;
		}
		var obj = btn.previousSibling;
		if(obj.nodeName==="A" && getComputedStyle(obj,null).getPropertyValue("-moz-binding").indexOf("url(chrome://adblockplus/") === 0) { // Firefox 에서 Adblock Plus 차단 버튼(탭)을 사용하는 경우
			obj = obj.previousSibling.previousSibling;
		}
		if(flag) {
			switchClass(obj,"DCL_hideOn","DCL_hideOff");
			switchClass(btn,"DCL_hideOn","DCL_hideOff");
			btn.textContent = "OFF";
		} else {
			switchClass(obj,"DCL_hideOff","DCL_hideOn");
			switchClass(btn,"DCL_hideOff","DCL_hideOn");
			btn.textContent = "ON";
		}
	};
	var all = function(flag) {
		var i,l;
		for(i=0,l=imgBtns.length ; i<l ; i+=1) {
			execute(imgBtns[i],flag);
		}
		for(i=0,l=mediaBtns.length ; i<l ; i+=1) {
			execute(mediaBtns[i],flag);
		}
	};
	var key = function(e) {
		var tag = e.target.tagName;
		if(tag === "INPUT" || tag === "TEXTAREA") {
			return;
		}
		var code = e.keyCode;
		if(code === 45 || code === 192) { // insert || `(~)
			all(true);
		} else if(code === 46 || code === 27) { // delete || esc
			all(false);
		} else {
			return;
		}
		returnFalse(e);
	};
	document.addEventListener("keydown",key,false);

	var imgBtns = [];
	var mediaBtns = [];
	var mediaList = [];
	var i,l,btn;

	var imgs = getImgs(elem);
	if(imgs.length) {
		var img;
		for(i=0,l=imgs.length ; i<l ; i+=1) {
			img = imgs[i];
			addClass(img,"DCL_hideImg DCL_hideOff");
			btn = createElement("span",[1,img],{className:"DCL_hideImgBtn DCL_hideOff",textContent:"OFF"},receive);
			imgBtns.push(btn);
		}
	}

	var objects = elem.getElementsByTagName("object");
	for(i=0,l=objects.length ; i<l ; i+=1) {
		if(objects[i].id !== "mx") { // 기본 플래쉬 광고 예외
			mediaList.push(objects[i]);
		}
	}
	var embeds = elem.getElementsByTagName("embed");
	for(i=0,l=embeds.length ; i<l ; i+=1) {
		if(embeds[i].parentNode.tagName !== "OBJECT") {
			mediaList.push(embeds[i]);
		}
	}
	if(mediaList.length) {
		var media,next;
		for(i=0,l=mediaList.length ; i<l ; i+=1) {
			media = mediaList[i];
			addClass(media,"DCL_hideMedia DCL_hideOff");
			btn = createElement("span",null,{className:"DCL_hideMediaBtn DCL_hideOff",textContent:"OFF"},receive);
			mediaBtns.push(btn);

			next = media.nextSibling;
			if(next && next.nodeName==="A" && getComputedStyle(next,null).getPropertyValue("-moz-binding").indexOf("url(chrome://adblockplus/") === 0) { // Firefox 에서 Adblock Plus 차단 버튼(탭)을 사용하는 경우
				next = next.nextSibling.nextSibling;
			}
			media.parentNode.insertBefore(btn,next);
		}
	}

	if(imgBtns.length || mediaBtns.length) { // 버튼 넣기
		if(P.hideImg) {
			for(i=0,l=imgBtns.length ; i<l ; i+=1) {
				execute(imgBtns[i],false);
			}
		}
		if(P.hideMedia) {
			for(i=0,l=mediaBtns.length ; i<l ; i+=1) {
				execute(mediaBtns[i],false);
			}
		}
		createElement("span",parent,"IMAGES ON",function(){all(true);});
		createElement("span",parent,"IMAGES OFF",function(){all(false);});
	}
};

// 이미지 크기 고정 ; dc에서 리사이징 작업으로 width 를 지정하는 것을 제거
function imageResizeFunc(imgs) {
	addStyle("#bgRelaBig div[id^='dc_image_'] {top:auto !important; left:3px !important; bottom:25px}");
	if(BROWSER.firefox || BROWSER.opera) {
		contentWindow.ParanImgBorderResize = function(){return;};
	}
	var img;
	for(var i=0,l=imgs.length ; i<l ; i+=1) {
		img = imgs[i];
		removeEvent(img,"onload");
		img.removeAttribute("width");
		img.removeAttribute("height");
	}
	var width = Number(P.imageWidth);
	if(width > 0) {
		addStyle("#bgRelaBig * {max-width:" + width + "px}"); // 이미지 크기 고정이 아닌 경우 max-width 를 지정
	}
}

// 본문 http:// 텍스트 자동 링크
function autoLinkFunc(o) {
	if(!o) {
		return;
	}
	var next = o.nextSibling;
	if(o.nodeType === 3) {
		var parent = o.parentNode;
		var value = o.nodeValue;
		var regexp = /http[s]?:\/\/[^\s'"]+/ig;
		var index = 0;
		var exec;
		while((exec = regexp.exec(value))) {
			if(index !== exec.index) {
				parent.insertBefore(document.createTextNode(value.substring(index,exec.index)),o);
			}
			createElement("a",[0,o],{href:exec,target:"_blank",textContent:exec});
			index = regexp.lastIndex;
		}
		if(index !== 0) {
			if(index !== value.length) {
				parent.insertBefore(document.createTextNode(value.substr(index)),o);
			}
			parent.removeChild(o);
		}
	} else if(o.nodeType === 1 && o.nodeName !== "A") {
		autoLinkFunc(o.firstChild);
	}
	autoLinkFunc(next);
}

// 비로그인 name / password
function autoFormFunc() {
	var name = $id("name");
	var password = $id("password");
	var memo = $id("memo");
	if(name) {
		name.value = P.autoName;
		name.style.background = "";
	}
	if(password) {
		password.value = P.autoPassword;
		password.style.background = "";
	}
	if(memo && memo.type === "text") {
		memo.value = "";
	}
}

// 글쓰기 관련 작업 ; 링크(a) 삽입, 전용 이미지(짤방) 자동 링크 삽입
function writeBtnFunc() {
	addStyle(
		"p#DCL_writeBtn {float:left ; padding-top:3px}" +
		"p#DCL_writeBtn > span {border:1px solid #bbb ; -moz-border-radius:3px ; -webkit-border-radius:3px ; padding:2px 7px 3px ; font:8pt 'courier new' ; background-color:#f9f9f9 ; cursor:pointer}"
	);
	var p = createElement("p",$id("edit_buts").parentNode.parentNode.cells[4],{id:"DCL_writeBtn"});
	var editVisual = $id("editVisual");
	var editNomal = $id("editNomal");
	createElement("span",p,"<a>",
		function() {
			var href = prompt("삽입할 링크 주소를 입력하세요.","");
			if(!href) {
				return;
			}
			href = "<a href='" + href + "'>" + href.replace(/&/g,"&amp;") + "</a>";
			if(editNomal.style.display === "block") {
				editNomal.value = editNomal.value + href;
			} else {
				var body = editVisual.contentDocument.body;
				body.innerHTML = body.innerHTML + href;
			}
		}
	);
	createElement("span",p,"my Tag",
		function() {
			var html = P.myTag;
			if(editNomal.style.display === "block") {
				editNomal.value = html + editNomal.value;
			} else {
				var body = editVisual.contentDocument.body;
				body.innerHTML = html + body.innerHTML;
			}
		}
	);
}

/********************
***** 이하 실행 *****
********************/
function dcinside_lite() {
	_GID = windowValue("_GID");
	scrollBody = BROWSER.firefox || BROWSER.opera ? document.documentElement : document.body;

	menuFunc();
	if(P.title) {
		titleFunc();
	}
	if(MODE.write) { // 글쓰기 모드
		writeBtnFunc();
		$id("subject").removeAttribute("maxLength"); // 글제목 길이 제한 없애기
		if(P.autoForm) { // 자동입력
			autoFormFunc();
		}
	} else { // 게시물 리스트 출력시 (글쓰기 이외의 모드)
		listDefault();
		if(P.filter) {
			blockArticleFunc($id("list_table").tBodies[0]);
		}
		previewFunc(0);
		if(P.page) {
			pageFunc();
		}

		if(MODE.article) { // 본문보기 모드
			var bgRelaBig = $id("bgRelaBig");
			bgRelaBig.parentNode.style.padding = "10px 0";
			var imgs = getImgs(bgRelaBig);
			if(imgs.length) {
				articleViewerFunc(imgs);
				imageResizeFunc(imgs);
			}
			if(P.hide) {
				hideFunc(bgRelaBig,createElement("p",[bgRelaBig,0],{className:"DCL_hideToggle"}));
			}
			if(P.autoLink) {
				autoLinkFunc(bgRelaBig);
			}
		}
		if(MODE.article || MODE.comment) { // 코멘트가 있는 경우
			if(P.filter) {
				blockCommentFunc($id("com_tab_"+(/[?&]no=(\d+)/).exec(location.search)[1]));
			}
			if(P.autoForm) {
				autoFormFunc();
			}
		}
	}
}

if(BROWSER && window === window.top) { // 미지원 브라우저, 내부 iframe 에서는 실행 안함
	PREFERENCES.load(); // 세팅 로드
	defaultFunc(); // 기본 스타일
	addDomEvent(dcinside_lite);
}