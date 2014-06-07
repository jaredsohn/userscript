// ==UserScript==
// @name       SoccerLine Comments Filter
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @namespace  http://www.soccerline.co.kr/
// @version    0.1
// @description  SoccerLine Comments Filtering by Nickname
// @match      http://www.soccerline.co.kr/slboard/view.php*
// @run-at document-start
// @copyright  2014.02, tmfflqj
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
// last update 2014.02.21

// Block List Array
var blockList = ['운영자','오즈온'];

document.addEventListener('DOMContentLoaded', hideContent(), false);

function hideContent() {
    var p = document.getElementsByTagName("p")[1];
    if(typeof(p) != "undefined") {
        var tables = p.getElementsByTagName("table");
        for(var i = 0; i < tables.length; i++) {
            for(var j = 0; j < blockList.length; j++) {
                var tbody = tables[i].getElementsByTagName("tbody")[0];
                //var tr = $(tbody).children();
                //var td = tr[3].children();
                //td[0].getElementsByTagName("
                var b = tbody.getElementsByTagName("b")[0];
                if($(b).text() == blockList[j]) {
                    $(tables[i]).hide();
                }
            }
        }
        return;
    }
    else {
        setTimeout(arguments.callee, 0);
    }
}
