// ==UserScript==
// @name           ifs-torrentrg
// @namespace      ifly2sky
// @description    something for www.torrentrg.com
// @include        http://*torrentrg.com/*
// @require           http://userscripts.org/scripts/source/121755.user.js
// ==/UserScript==

/*
★ 버전: 1.1
토렌트다운로드 링크에 단축키설정:
차례대로 Alt+Q, Alt+W, Alt+A

★ 버전: 1.0

메인페이지
- 최신게시판에서 영화 드라마 블록을 위로

왼쪽메뉴
- 토렌트메뉴를 상단으로
- 성인자료실 링크 삭제

게시판
- 카테고리탭 메뉴 한줄에 보이게
- 토렌트 파일들 눈에 띄게
- 자잘한 광고들 안보이게

갤러리
- 갤러리 이미지들을 한 페이지에서 보여주기
(이미지 로딩에 시간이 걸리니 주의하세요.
 이것이 부담스럽다면 옵션의 주의사항을 참조하세요.

*/

var url = document.location.href;
var host = window.location.host;
function deID(strID) {if (document.getElementById(strID)){var obj = document.getElementById(strID);obj.parentNode.removeChild(obj);	return true;} else {return false;}}
function get_xpath(xpath_expr, xpath_document, context_node){var nodes = [];var ssnodes = xpath_document.evaluate(xpath_expr, context_node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);  for (var i = 0 ; i < ssnodes.snapshotLength; i++)  {  nodes.push(ssnodes.snapshotItem(i));  }  return nodes;}
function get_xpath2(xpath_expr){var nodes = [];var ssnodes = document.evaluate(xpath_expr, document, null, 7, null);  for (var i = 0 ; i < ssnodes.snapshotLength; i++){ nodes.push(ssnodes.snapshotItem(i));}  return nodes;}
function parseText(text){var iframe=document.createElement('iframe');iframe.style.visibility='hidden';iframe.style.width="0";iframe.style.height="0";document.documentElement.appendChild(iframe);var doc=iframe.contentDocument;document.documentElement.removeChild(iframe);doc.documentElement.innerHTML=text;return doc;}

/////////// 옵션 //////////////////////////////

//갤러리의 이미지 다이렉트로 보기가 부담스러우면 ..... false를 풀고 true줄의 앞에 //을 설정하세요.
var blnViewGalley = true;
//var blnViewGalley = false;

///////////////////////////////////////////////

//xpath 이용하여 이미지추출, 썸네일로 보여주기 - 
function get_dataImage() {

	//토런트알지 <img align="absmiddle" src="../data/file/gallery/thumbnail/53498">

	var aImg, tImg, pa;
	aImg = document.evaluate('//img[contains(@src, "data")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var s = '<hr>';
	for (var i = 0; i < aImg.snapshotLength; i++) {
			tImg = aImg.snapshotItem(i);
			pa = tImg.parentNode;
			if(pa.nodeName == 'DIV') {
				
				tImg.removeAttribute('onclick');
				tImg.removeAttribute('title');
				tImg.removeAttribute('name');
				tImg.removeAttribute('style');
				tImg.removeAttribute('width');
				tImg.removeAttribute('height');
				
			} else 
			{
				//<a href=pa><img src=tImg.src width=50></a> 
				//파폭에서 지원해주는 Ctrl+마우스끌기를 이용하여 한번에 열기 위하여 이미지사이즈를 줄인다.
				s += '<a href="'+ pa.href +'"><img src="'+ tImg.src + '" width="40"></a>';
			}
	}

	var p= document.createElement('p');  
	p.innerHTML = s;
	document.body.appendChild(p);

}

//갤러리의 이미지들을 다이렉트로 보기.............
function get_dataImage_direct() {

	//이미지담을 그릇 미리 준비
	var xdiv = document.createElement('div');
	xdiv.id = 'dview';
	document.body.appendChild(xdiv);
	
	//페이지마지막에 만들 스크롤버튼을 위해서 아이디지정
	var odiv = get_xpath2('//*[@id="mw_basic"]/table[@cellspacing="0"]');
	odiv[0].setAttribute('id', 'scrollhere');

	//xhr로 이미지 가져오기
	var alist= get_xpath2('//td/div/a/img');
	for (var i = 0; i < alist.length; i++) 
	{
		GM_xmlhttpRequest({
			method: 'GET',
			url: alist[i].parentNode.href, //이미지를 자식노드로 하는 a 태그의 주소
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'application/atom+xml,application/xml,text/xml',},
			onload: function(resp) {
					var xdoc = parseText(resp.responseText);
					var xa = xdoc.getElementById('view_content').getElementsByTagName('img');
					for (var j = 0; j < xa.length; j++) 
					{
					    document.getElementById('dview').innerHTML += '<img src='+xa[j].src+'><br>';
					}//for
			}//onload
		});//xhr
	}//for

	//스크롤버튼만들고, 이벤트 설정
	var xscr = document.getElementById('scrollhere');
	var xbtn = document.createElement('input');
	xbtn.type = 'button';
	xbtn.value='클릭';
	xbtn.addEventListener('click', function(){xscr.scrollIntoView(true);}, false); 
	document.body.appendChild(xbtn);
	
	console.log('끝');
}


//여러 페이지에 걸쳐 리맵한다.
function rg_remap() 
{

	//★ 1. 전체페이지 : 

	//드라마 예능메뉴를 위로
	var r = get_xpath2('//div/div/a[@onclick]');
	var xtd = r[0].parentNode.parentNode.parentNode;
	xtd.insertBefore(r[0].parentNode, xtd.firstChild);

	//무료성인자료실1(19)
	var w = get_xpath2('//div/font/a/font');
	w[0].parentNode.removeChild(w[0]);

	var x = get_xpath2('//a/font/b');
	for (var i=0; i < x.length; i++) {
		if(/성인/.test(x[i].textContent)){ 
        x[i].textContent='토렌트';
		}
	} 

	//★ 2.게시판
    if(/board.php/.test(url)) {

		//카테고리탭-  전체  한국영화  액션/무협 ---  다큐  기타
		var u = get_xpath2('//div[@class="category_tab"]/ul/li');
		for (var ui = 0; ui < u.length; ui++) {u[ui].style.cssText = 'padding:0 3px ! important;';}

		//★ 3. 게시판글을 읽는 경우
		if(/wr_id/.test(url)) {
			
			deID('commentContents');
			deID('mw_basic_comment_write');

			//토렌트파일 링크, 보통한개이지만 여러개일수도 있으니...
			var t = get_xpath2('//td[@class="mw_basic_view_file"]/a');
			for (var ti = 0; ti < t.length; ti++) {
				t[ti].style.cssText = 'font-size:16px;font-weight:bold;color:white;background-color: blue ! important;';
				t[ti].setAttribute('id', 'down'+ti);//단축키설정을 위해서 아이디설정 
				}
			
			//sns
			var v = get_xpath2('//div[@class="sns"]');
			v[0].parentNode.removeChild(v[0]);
			
			//[토렌트 설치사용방법] [토렌트 업로드 방법] [토렌트 다운로드 방법]
			var y = get_xpath2('//table[@width="100%"]/tbody/tr/td[@height="55"]');
			y[0].parentNode.parentNode.removeChild(y[0].parentNode);
			
			//무료성인자료 다운로드 무료다운로드자료 무료다운로드자료2 
			var x = get_xpath('//tr/td/a[@onclick]', document, document);
			x[0].parentNode.parentNode.removeChild(x[0].parentNode);

			window.scrollTo(200,300);

		} else //★ 4. 게시판 목록페이지 일 경우
		{
			//if(/bo_table=gallery/.test(url)){get_dataImage();} 
			if(/bo_table=gallery/.test(url)){
				if (blnViewGalley == true) //게시판 이미지 다이렉트로 보기가 설정되었을경우
				{
					get_dataImage_direct();    
				}
			} 
			window.scrollTo(200,180);
		}
	} else //★5. 메인페이지인 경우
	{
		//최신게시판에서 영화 드라마 블록을 위로 올린다.
	    var dlb = get_xpath2('//div[@class="latest-block"]');
		dlb[2].parentNode.insertBefore(dlb[2],dlb[0])
	}
	
}

unsafeWindow.file_download = function file_download(link, file, no) 
{
	//console.log('■'+ link + '★' + file + + '★' + no); 
	document.location.href=link;
}

document.body.onkeydown=function(e){
	e = e || window.event;
	var ak= e.altKey;
	var ek = e.keyCode;

	if (ak && ek == 81) {capture('down0');}// alt+Q
	else if (ak && ek == 87) {capture('down1');}// alt+W
	else if (ak && ek == 65) {capture('down2');}// alt+A
    
	function capture(id) {
		var btn  = document.getElementById(id);
		var ce = document.createEvent('MouseEvents'); 
		ce.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var canceled = !btn.dispatchEvent(ce);
    }
};
//////////////RUN ///////////////////////////////////////////////////////////////////////

de_iframe();
rg_remap();
