// ==UserScript==
// @name           ifs-daum
// @namespace      ifly2sky
// @description    대한민국포털인 www.daum.net의 검색, 광고, 메뉴, 스타일들 리맵
// @include        http://*daum.net/*
// @version       1.0
// ==/UserScript==

/*
다음의 광고들 관리
다음 최상단에 미니메뉴들 추가
다음사전 스타일들 약간 손봄
다음 검색에서 실시간검색, 소셜웹검색을 위로 올림
다음 메인화면 약간 리맵
*/


/////////////////////////// 공통 /////////////////////////////////////////////////////////
var url = document.location.href;
var host = window.location.host;

function deID(strID) {
//ID개체를 삭제한다
	if (document.getElementById(strID))
	{
		var obj = document.getElementById(strID);
		//obj.parentNode.removeChild(obj);
		obj.style.display = 'none';
		return true;
	} else {return false;}
}

//xpath ----------표현식, 문서, 루트노드 - 스냅샷순서
function get_xpath(xpath_expr, xpath_document, context_node)
{
	var nodes = [];
	var ssnodes = xpath_document.evaluate(xpath_expr, context_node, null, 7, null);  
	for (var i = 0 ; i < ssnodes.snapshotLength; i++){ nodes.push(ssnodes.snapshotItem(i));}  
	return nodes;
}

//다음의 광고들 관리
function remap_daumads() 
{
	var ads = [
	'//*[@class="bnr_ad"]',
	'//*[@class="banner"]',
	'//*[@id="banner250"]',
	'//*[@id="SponsorBarWrap"]',
	'//*[@id="RIGHT_SPACE_BANNER"]',
	'//*[@id="EXTENSIBLE_WRAP"]',
	'//*[@id="ad_top"]',
	'//*[@id="shoppingboxWrap"]',
	'//*[@id="premiumAD"]',
	'//*[@id="rBanner"]'
	]

	for (var i = 0; i < ads.length; i++) 
	{
		var x = get_xpath(ads[i], document, document);
		//if(x) console.log(x.length);    
		for (var j = 0; j < x.length; j++) 
		{
			//console.log(x[j]);
			x[j].style.cssText='display:none';
		}
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//최상단 미니다음리스트에 여러가지메뉴를 추가한다.
function add_minidaumlist() 
{
	var mdladd ='<a  class="DaumUI__minidaum_a2" href="http://local.daum.net/map/index.jsp?target=car&t__nil_site=road" target="_top">길찾기</a>' + 
	'<a class="DaumUI__minidaum_a2"  href="http://cloud.daum.net/?t__nil_site=cloud">클드</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://blog.daum.net/?t__nil_site=blog">블로</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://weather.media.daum.net/?t__nil_site=weather">날씨</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://media.daum.net/entertain?t__nil_site=enter">연예</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://local.daum.net/map/index.jsp?target=traffic&opt=2&nil_profile=g&t__nil_site=busmap" target="_top">버스</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://movie.daum.net/?t__nil_site=movie" target="_top">영화</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://music.daum.net/?t__nil_site=music" target="_top">뮤직</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://tvpot.daum.net/Top.do?t__nil_site=tvpot" target="_top">tv팟</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://agora.media.daum.net/?t__nil_site=agora" target="_top">아고라</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://kids.daum.net/?t__nil_site=kids" target="_top">키즈짱</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://dic.daum.net/index.do?dic=eng&t__nil_site=engdic" target="_top">영사전</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://dic.daum.net/index.do?dic=jp&t__nil_site=jPdic" target="_top">日사전</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://dic.daum.net/index.do?dic=ch&t__nil_site=chdic" target="_top">中사전</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://dic.daum.net/index.do?dic=hanja&t__nil_site=handic" target="_top">漢사전</a>' + 
	'<a  class="DaumUI__minidaum_a2" href="http://file.daum.net/?t__nil_site=file" target="_top">자료</a>'
	
	//기존메뉴의 뒤에 추가한다.
	document.getElementById('DaumUI__minidaum_list').innerHTML += mdladd;

	//더보기 메뉴를 제일 마지막으로 보내준다.
	var dmore = document.getElementById('DaumUI__minidaum_moreBtn');
	dmore.parentNode.insertBefore(dmore, dmore.lastChild.nextSibling);
}

/////////////////////// 다음 사전 /////////////////////////////////////////////

//다음사전들 첫 페이지의 상단 페딩이 너무 커서 불편하다. 줄인다.
function dicdaum_delete_paddingtop() 
{
	if(/index\.do/.test(url)) {
		var chead = document.getElementsByClassName('head_inner')[0];
		chead.style.cssText = 'padding-top: 60px ! important';
	}
}

//사전 - 필기도구
function dicdaum_handwrite() 
{
	if(/hanja|jp|ch/.test(url)) {
		var xhw = get_xpath('//div[@id="layerHandWrite"]', document, document);
		xhw[0].style.cssText='left:430px;top:190px !important';
	}
}

//////////////////////// 미디어다음 ///////////////////////////////////////////
/*대한민국의 대표포털 중의 하나인 다음은 통합검색할 때 
아직까지 실시간검색이나 소셜웹검색을 제일 먼저 보여주진 않고, 뉴스를 먼저 보여준다.
뉴스를 먼저 보여주는 것은 그렇다 쳐도, 실시간검색과 소셜웹검색 결과가 거의 제일 마지막에 나온다.
이 스크립트는 실시간검색, 소셜웹, 이미지, 동영상, 뉴스 순으로 정렬해준다.

다음 통합웹검색의 주소는 다음과 같은 형식이다.
http://search.daum.net/search?w=tot
*/

//기사읽기 페이지에선 댓글많은, 많이본뉴스가 밑에 있다. 위로 올린다.
function mynews_up_innewsviewpages() 
{
	var wc = document.getElementsByClassName('wing_cmtnews')[0]; //댓글많은
	var wr = document.getElementsByClassName('wing_readnews')[0]; //많이 본
	var wp = document.getElementsByClassName('wing_todayphoto')[0];//오늘의 사진
	
	//오늘의 사진 위로 배치한다.
	if(wp) {
		if(wc) {wp.parentNode.insertBefore(wc, wp);}
		if(wr){wp.parentNode.insertBefore(wr, wp);}
	}
}

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


//////////////////// 다음메인 //////////////////////////////////////////////////////////////////////////////

function remap_wwwdaum() 
{
	//메인-왼쪽광고를 없애고 '실시간검색 1일전 2일전' 탭을 위로 올려준다.
	var xadbs = get_xpath('//div[@id="adBrandingStation"]', document, document);
	xadbs[0].style.cssText='display:none';
	var xleft = get_xpath('//div[@id="left"]', document, document);
	xleft[0].style.cssText='top:225px';

	//메인-가운데광고를 없애고 '뉴스-자동차' 탭을 올려준다.
	var xadmain = get_xpath('//div[@id="adMain"]', document, document);
	xadmain[0].style.cssText='display:none';
	var xcenter = get_xpath('//div[@id="center"]', document, document);
	xcenter[0].style.cssText='top:0px';

	//메인 - 탑 오른쪽 광고를 없앤다.
	var xbs = get_xpath('//div[@id="brandingSpecial"]', document, document);
	xbs[0].style.cssText='display:none';
}


///////////////////////////// RUN //////////////////////////////////////////////////////////////////////////

remap_daumads();

//다음메인페이지 리맵
if (host == 'www.daum.net') 
{
    remap_wwwdaum();
}

//검색페이지 리맵
if (host == 'search.daum.net') 
{
    daum_searchremap();
}

//뉴스보기페이지에서 관심있는 뉴스리맵
if(/newsview?/.test(url) || /view.html?/.test(url)) {
	mynews_up_innewsviewpages(); 
}

//사전페이지에서 스타일변경
if(host == 'dic.daum.net') {
	dicdaum_delete_paddingtop();
	dicdaum_handwrite(); 
}

//사전페이지말곤, 미니다음리스트를 추가한다.
if (host !='dic.daum.net') 
{
	add_minidaumlist();     
}

