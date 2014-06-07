
// ==UserScript==
// @name           Clien 단축키
// @name_en        Clien
// @namespace      http://clien.career.co.kr/
// @description    Clien 단축키
// @description_en 
// @include        http://clien.career.co.kr/*
// ==/UserScript==


var key = new Array();
key['0'] = "/zboard/zboard.php?id=notice";	//공지
key['f'] = "/zboard/zboard.php?id=free";	//자유게시판
key['q'] = "/zboard/zboard.php?id=qna"; 	//질문게시판
key['a'] = "/zboard/zboard.php?id=kin";	//아무거나 질문
key['l'] = "/zboard/zboard.php?id=lecture";	//강좌게시판
key['r'] = "/zboard/zboard.php?id=use";	//추천사용기
key['n'] = "/zboard/zboard.php?id=news";	//새소식
key['u'] = "/zboard/zboard.php?id=useful";	//유용한사이트
key['p'] = "/zboard/zboard.php?id=pds";	//자료실
key['i'] = "/zboard/zboard.php?id=image";	//사진게시판
key['1'] = "/zboard/zboard.php?id=100mun";	//100문
key['b'] = "/zboard/zboard.php?id=jirum";	//구매정보
key['c'] = "/zboard/zboard.php?id=test09"; // 직접홍보
key['s'] = "/zboard/zboard.php?id=sold";	//장터
key['w'] = "/zboard/zboard.php?id=wish";	//개정요구
key['j'] = "/zboard/buy.php";	//알뜰구매
key['m'] = "/zboard/cm_header2.php";	//소모임
key['H'] = "/zboard/zboard.php?id=cm_mac2";	//커뮤니티(맥당)
key['x'] = "/zboard/zboard.php?id=broad";	//임시 시국 
key['h'] = "/";

document.wrappedJSObject.onkeypress = null;
document.wrappedJSObject.onkeypress = function(e) {
	var isIE = !!(window.attachEvent && !window.opera);
	var tagName = '';
	if (isIE) {
			tagName = event.srcElement.tagName;
	} else {
			tagName = e.target.tagName;
	}

	if ( (tagName != 'INPUT') && (tagName != 'TEXTAREA') ) {
			var eventChooser = isIE ? event.keyCode:e.which;
			var which = String.fromCharCode(eventChooser);
				for (var i in key)
				if (which == i) window.location = key[i];
	}
};