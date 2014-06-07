// ==UserScript==
// @name          네이버 만화의 40자평에서 "이어쓰기 소설"을 무시하는 스크립트(Naver Webtoon-Ignore viewer comments of "Relay Stories")
// @namespace     http://userscripts.org/scripts/show/14979
// @description   이어쓰기 소설의 특징 중 하나인 "숫자로 시작한다."라는 점을 이용한, 40자평 중에서 숫자로 시작하는 모든 글들을 잘 안 보이는 색깔로 바꾸는 스크립트입니다. (Change font color all viewer comments of Relay Stories for low visiblity.)
// @include       http://comicmall.naver.com/*
// @exclude       
// ==/UserScript==

//현재 페이지에 있는 모든 td(테이블 레이아웃의 최소 단위)들을 td_array라는 이름의 배열에 저장한다.
td_array = document.getElementsByTagName("td")
//start_number라는 이름의 정규표현식을 만든다. 정규표현식의 값은 "숫자로 시작하는.."으로 설정한다.
start_number = new RegExp("^[0-9]")
//for문법을 사용해서 td_array에 저장되어 있는 td들을 하나씩 검사한다.
for (i = 0; i < td_array.length; i++) {
	//네이버 만화에서 40자평 부분에 있는 td에는 "gray03"이라는 이름의 CSS 클래스가 설정되어 있다. 그러므로, td_array에 저장되어 있는 td들 중에서, 클래스의 이름이 "gray03"인 td를 발견하면, 다음 단계의 명령을 실행한다.
	if (td_array[i].className == "gray03") {
		//클래스의 이름이 "gray03"인 td들 중에서, td안에 들어있는 글자가 아까 준비해 둔 start_number정규표현식과 일치하는 td를 발견하면, 마지막 명령을 실행한다.
		if (start_number.test(td_array[i].innerHTML) == true) {
			//현재 td안에 들어있는 글자의 색을 "밝은 회색"으로 설정한다.
			td_array[i].style.color = "lightgray"
		}
	}
}
