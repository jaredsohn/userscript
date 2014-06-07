// ==UserScript==
// @name           ifly2sky_daum_search_remap
// @namespace      ifly2sky
// @description    daum search result remapper - twitter socialweb liveseach image from bottom to utmost
// @include        http://search.daum.net/*
// ==/UserScript==


/*대한민국의 대표포털 중의 하나인 다음은 통합검색할 때 
아직까지 실시간검색이나 소셜웹검색을 제일 먼저 보여주진 않고, 뉴스를 먼저 보여준다.
뉴스를 먼저 보여주는 것은 그렇다 쳐도, 실시간검색과 소셜웹검색 결과가 거의 제일 마지막에 나온다.
이 스크립트는 실시간검색, 소셜웹, 이미지, 동영상, 뉴스 순으로 정렬해준다.

다음 통합웹검색의 주소는 다음과 같은 형식이다.
http://search.daum.net/search?w=tot


다음 통합웹검색에 나타나는 섹션들과 div id는 대개 다음과 같다. 

	fusionColl, 통합웹
	socialwebColl, 소셜웹
	liveSearchColl, 실시간검색
	newsColl, 뉴스
	blogColl, 블로그
	cafeColl, 카페
	boardColl, 게시판
	webdocColl, 웹문서
	siteColl, 사이트
	imgColl, 이미지
	vclipColl, 동영상
	appColl, 스마트폰 응용프로그램
	bookColl, 책
	splinkColl,
	sponColl,
	premColl,
	shopHowColl, 쇼핑하우
	comColl, 실시간 증권정보
	knowColl, 지식
	refColl, 전문자료
	dicColl, 백과사전
	dictionaryColl, 어학사전
	musicColl, 뮤직
	movieEColl, 영화
	perforColl, 공연
	profColl, 인물
	dirtColl, 바로가기
*/

//3
function insBefore(idnew, idold) 
{
	//만약 뉴스섹션이 없거나, 교체하려는 섹션이 없으면 중지한다.	
	var chold = document.getElementById(idold);
	if(!chold) return false;
	var chnew = document.getElementById(idnew)
	if(!chnew) return false;

	var chpa = chold.parentNode;
	chpa.insertBefore(chnew, chold); 
}

//2
function daum_searchremap() 
{
	//다른 것들은 유동적인데, 뉴스는 거의 있다. 전문적인 단어를 검색한 경우 뉴스섹션이 없을 수도 있다.
	//★ 만약 정렬시키지 않고 싶은 부분이 있으면 앞에 //로 주석표시를 해주면 된다.
	insBefore('socialwebColl', 'newsColl'); //소셜검색
	insBefore('liveSearchColl', 'newsColl');//실시간검색
	insBefore('imgColl', 'newsColl');//이미지
	insBefore('vclipColl', 'newsColl');//동영상
}

//1
daum_searchremap();



