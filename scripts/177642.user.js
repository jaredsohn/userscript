// ==UserScript==
// @name       SoccerLine Contents Filter
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @namespace  http://www.soccerline.co.kr/
// @version    0.3
// @description  SoccerLine Contents Filtering by Nickname
// @match      http://www.soccerline.co.kr/slboard/*
// @run-at document-start
// @copyright  2013.09, tmfflqj
// ==/UserScript==

// ############ 싸줄 게시판 닉네임 블락 스크립트입니다 #############
// 목록에서 숨기고 싶은 닉네임을 아래와 같이 따옴표로 묶어 추가 작성
// ex) "가나다"라는 사용자 닉네임을 추가하고 싶으면 다음과 같이 수정
// --> var blockList = ['운영자','오즈온','가나다'];
// #################################################################

// #################################################################
// 최상단 사커라인 로고, 탑메뉴 테이블을 숨기고 싶으면 ★34번★ 라인
// hideTopTable(); 앞의 // 를 삭제 후 저장
// 최상단 바로 아래 광고 테이블을 숨기고 싶으면 ★35번★ 라인
// hideTopAdTable(); 앞의 // 를 삭제 후 저장
// 왼쪽 인기클럽 바로가기 테이블을 숨기고 싶으면 ★39번★ 라인
// hideLeftClubLinkTable(); 앞의 // 를 삭제 후 저장
// #################################################################
// last update 2014.03.12

// Block List Array
var blockList = ['운영자','오즈온'];

document.addEventListener('DOMContentLoaded', hideContent(), false);

function hideContent() {
    hideTopTable();		// 최상단 사커라인 로고, 탑메뉴 테이블 숨김(로그인창 포함)
    hideTopAdTable();	// 최상단 바로 아래 광고 테이블 숨김
    var table = document.getElementsByTagName("table")[37];	// 게시판 메인 테이블
    if(typeof(table) != "undefined") {
        //console.log("[SLCF] table successfully loaded!");
        hideLeftClubLinkTable();	// 왼쪽 게시판 링크 하단 인기클럽 바로가기 테이블 숨김
        var contents = table.getElementsByTagName("tbody")[0];
        var children = $(contents).children();
        for(var i = 0; i < children.length; i++) {
            for(var j = 0; j < blockList.length; j++) {
                if($(children[i].cells[2]).text() == blockList[j]) {
                    // hide matching <tr> tag
                    $(children[i]).hide();
                }
            }
        }
        hideAutoScrollAd();
        return;
    }
    else {
        //console.log("[SLCF] table undefined!");
        setTimeout(arguments.callee, 0);
    }
}

function hideTopTable() {
    var topTable = document.getElementsByTagName("table")[0];
    $(topTable).hide();
}

function hideTopAdTable() {
    var topAdTable = document.getElementsByTagName("table")[4];
    $(topAdTable).hide();
}

function hideLeftClubLinkTable() {
    var leftClubLinkTable = document.getElementsByTagName("table")[11];
    $(leftClubLinkTable).hide();
}

function hideAutoScrollAd() {
    var autoScrollTag = document.getElementsByTagName("center")[3];
    $(autoScrollTag).remove();
    //$(autoScrollTag).hide();
    
}
