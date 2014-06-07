// ==UserScript==
// @name           Search Word Toss V 1.0
// @namespace      http://userscripts.org/users/wschoe
// @description    The script allows between the large search sites(Naver, Google, Daum) to pass search queries
// @copyright      2013+, wschoe (http://userscripts.org/users/wschoe)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/2.0/kr/
// @version        201302191517; Tue Feb 19 2013 15:17:00 GMT+0900
// @injectframes   1
// @include         *search.naver.com/*
// @include         *search.daum.net/*
// @include         *google.co.kr/search?*
// @include         *google.com/search?*
// @include         *google.co.kr*&q=*
// @enable          true
// ==/UserScript==
//KeyDown Event
if (location.href.indexOf("google") > 0) {
    //KeyDown Event Handling Method
    function keydown(e) {
        if (!e) e = event;
        if (e.keyCode == 113) {
            document.getElementsByName('q')[0].select();
            document.getElementsByName('q')[0].focus();
        }
    }
    //KeyDown Event Handler
    if (document.addEventListener) {
        document.addEventListener("keydown", keydown, false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onkeydown", keydown);
    }
    else {
        document.onkeydown = keydown;
    }
}
// X축 위치구하기
function findPosX(obj)
{
    var curleft = 0;
    if(obj.offsetParent)
        while(1)
        {
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.x)
        curleft += obj.x;
    return curleft;
}
// Y축 위치구하기
function findPosY(obj)
{
    var curtop = 0;
    if(obj.offsetParent)
        while(1)
        {
          //alert(obj.offsetParent.tagName);
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
}
//Keyword Toss
var floater = document.createElement("div");
document.body.appendChild(floater);
floater.ID = "floater";
floater.style.pixelLeft = "100";
floater.style.pixelTop = "100";
floater.style.width = "300px";
floater.style.height = "13px";
floater.style.position = "absolute";
floater.style.visibility = "visible";
floater.innerHTML += "<a href=\"javascript:baby('aa');\"><B>↑ TOP</B></a>";
var Xpos = 0;
var Ypos = 0;
var Ygravity = 0.80;  //반동효과 정도 (숫자가 크면 클수록 반동이 심함)
var scrollPos = 0;
var oldScrollPos = 0;
function FloatMenu() {
	docWidth = document.body.clientWidth;   
	docHeight = document.body.clientHeight; 
	oldScrollPos = scrollPos;
	scrollPos = document.body.scrollTop; 
	Xpos = document.body.clientWidth - 100;   //좌측여백
	Yboundary = ((scrollPos + docHeight) - floater.offsetHeight) - 300; //하단여백
        //document.body.scrollTop = 1000;
//alert(document.getElementById("side_section").scrollTop);
//alert(docHeight +" / "+ document.body.scrollTop +" / "+ findPosY(floater) +" / "+ Yboundary);
if (findPosY(floater) < Yboundary - 4) 
	Ypos += 20;
if (findPosY(floater) > Yboundary + 4) 
	Ypos -= 10;
	Ypos *= Ygravity; 
	floater.style.pixelLeft = Xpos;
	floater.style.pixelTop += Ypos;
}
window.setInterval("FloatMenu()", 2000);
function temp() {
	alert(docHeight);
}
//Keyword Toss
(	
function () {
	function keywordToss() {
	if ( location.href.indexOf("naver") >= 0 && document.getElementById("nx_query") )
	{
		var checkQuery = document.getElementById("nx_query");
		if( typeof(checkQuery) == "undefined" )
		{
			alert("No checkQuery");
		}
		var wschoe_div = document.createElement("div");
		document.body.appendChild(wschoe_div);
		wschoe_div.style.position = "absolute";
		wschoe_div.style.zIndex = 2147483647;
		wschoe_div.style.pixelLeft = 130+findPosX(document.getElementById("nx_query"))+document.getElementById("nx_query").offsetWidth;
		wschoe_div.style.pixelTop = findPosY(document.getElementById("nx_query"))-7;
		document.getElementById("nx_body").appendChild(wschoe_div);
		wschoe_div.style.width = 300;
		wschoe_div.innerHTML += "<input type=\"button\"	 \
		style=\"border:3px solid #646FF2;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Daum 검색\" name=\"query_search\"	\
		id=\"nx_query_daum\" value=\"Daum 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://search.daum.net/search?q='	\
		+ encodeURI(document.getElementById('nx_query').value));baby('aa');\"  >"
		+ "<input type=\"button\"	 \
		style=\"border:3px solid #9AC1C6;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Google 검색\" name=\"query_search\"	\
		id=\"nx_query_google\" value=\"Google 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://www.google.co.kr/search?complete=1&hl=ko&q='	\
		+ document.getElementById('nx_query').value);baby('aa');\"  >";
                //alert(document.getElementById("nx_query").offsetTop+","+findPosX(document.getElementById("nx_query")));
        var wschoe_div2 = document.createElement("div");
		document.body.appendChild(wschoe_div2);
		wschoe_div2.style.position = "absolute";
		wschoe_div2.style.zIndex = 2147483647;
		wschoe_div2.style.pixelLeft = findPosX(document.getElementsByName("query")[document.getElementsByName("query").length-1])
                    + 80 + document.getElementsByName("query")[document.getElementsByName("query").length-1].offsetWidth;
		//wschoe_div.style.pixelTop = 60;
        wschoe_div2.style.pixelTop = findPosY(document.getElementsByName("query")[document.getElementsByName("query").length-1]) - 6;
		wschoe_div2.style.width = 300;
		wschoe_div2.innerHTML += "<input type=\"button\"	 \
		style=\"border:3px solid #646FF2;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Daum 검색\" name=\"query_search\"	\
		id=\"nx_query_daum\" value=\"Daum 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://search.daum.net/search?q='	\
		+ encodeURI(document.getElementsByName('query')[document.getElementsByName('query').length-1].value));baby('aa');\"  >"
		+ "<input type=\"button\"	 \
		style=\"border:3px solid #9AC1C6;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Google 검색\" name=\"query_search\"	\
		id=\"nx_query_google\" value=\"Google 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://www.google.co.kr/search?complete=1&hl=ko&q='	\
		+ document.getElementsByName('query')[document.getElementsByName('query').length-1].value);baby('aa');\"  >";
        var wschoe_div3 = document.createElement("div");
		//document.body.appendChild(wschoe_div3);
		wschoe_div3.style.position = "absolute";
		wschoe_div3.style.zIndex = 2147483647;
		wschoe_div3.style.pixelLeft = findPosX(document.getElementById("nx_query"))+80+document.getElementById("nx_query").offsetWidth;
		//wschoe_div.style.pixelTop = 60;
		wschoe_div3.style.pixelTop = 100;
        //wschoe_div3.style.pixelTop = findPosY(document.getElementsByName("query")[document.getElementsByName("query").length-1]) - 600;
		wschoe_div3.style.width = 300;
		wschoe_div3.innerHTML += "<input type=\"button\"	 \
		style=\"border:3px solid #646FF2;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Daum 검색\" name=\"query_search\"	\
		id=\"nx_query_daum\" value=\"Daum 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://search.daum.net/search?q='	\
		+ encodeURI(document.getElementsByName('query')[document.getElementsByName('query').length-1].value));baby('aa');\"  >"
		+ "<input type=\"button\"	 \
		style=\"border:3px solid #9AC1C6;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Google 검색\" name=\"query_search\"	\
		id=\"nx_query_google\" value=\"Google 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://www.google.co.kr/search?complete=1&hl=ko&q='	\
		+ document.getElementsByName('query')[document.getElementsByName('query').length-1].value);baby('aa');\"  >";
	}
	//if ( location.href.indexOf("search.daum.net/search") >= 0 && document.getElementById('q') ) //"ie5,ie6,ie7,ie8
	if ( document.URL.indexOf("search.daum.net") >= 0 && document.getElementById('q') ) //"ie5,ie6,ie7,ie8
	{
		var wschoe_div = document.createElement("div");
		document.body.appendChild(wschoe_div);
		wschoe_div.style.position = "absolute";
		wschoe_div.style.zIndex = 2147483647;
		//wschoe_div.style.pixelLeft = 600;
        wschoe_div.style.pixelLeft = findPosX(document.getElementById('q')) + 155 + document.getElementById('q').offsetWidth;
		//wschoe_div.style.pixelTop = 23;
        wschoe_div.style.pixelTop = findPosY(document.getElementById('q').offsetParent);
		wschoe_div.style.width = 300;
		wschoe_div.innerHTML += "<input type=\"button\"	 \
		style=\"border:3px solid #48B614;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Naver 검색\" name=\"query_search\"	\
		id=\"nx_query_naver\" value=\"Naver 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://search.naver.com/search.naver?query='	\
		+ escape(document.getElementById('q').value));baby('aa');\"  >"
		+ "<input type=\"button\"	 \
		style=\"border:3px solid #9AC1C6;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Google 검색\" name=\"query_search\"	\
		id=\"nx_query_google\" value=\"Google 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://www.google.co.kr/search?q='	\
		+ document.getElementById('q').value);baby('aa');\"  >";
                var wschoe_div2 = document.createElement("div");
		document.body.appendChild(wschoe_div2);
		wschoe_div2.style.position = "absolute";
		wschoe_div2.style.pixelLeft = findPosX(document.getElementById('q1')) + 70 + document.getElementById('q1').offsetWidth;
		//wschoe_div.style.pixelTop = 60;
                wschoe_div2.style.pixelTop = findPosY(document.getElementById('q1')) - 4;
		wschoe_div2.style.width = 300;
		wschoe_div2.innerHTML += "<input type=\"button\"	 \
		style=\"border:3px solid #48B614;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Naver 검색\" name=\"query_search\"	\
		id=\"nx_query_naver\" value=\"Naver 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://search.naver.com/search.naver?query='	\
		+ escape(document.getElementById('q1').value));baby('aa');\"  >"
		+ "<input type=\"button\"	 \
		style=\"border:3px solid #9AC1C6;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Google 검색\" name=\"query_search\"	\
		id=\"nx_query_google\" value=\"Google 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://www.google.co.kr/search?q='	\
		+ document.getElementById('q1').value);baby('aa');\"  >";
	}
	if ( location.href.indexOf("google") >= 0 && document.getElementsByName('q') )
	{
		var wschoe_div = document.createElement("div");
		document.body.appendChild(wschoe_div);
		wschoe_div.style.position = "absolute";
		wschoe_div.style.zIndex = 2147483647;
		wschoe_div.style.pixelLeft =  findPosX(document.getElementsByName('q')[0]) + 120 + document.getElementsByName('q')[0].offsetWidth;
		//alert(wschoe_div.style.pixelLeft);
		//alert(findPosX(document.getElementsByName('q')[0]));
		//wschoe_div.style.pixelTop = 60;
		wschoe_div.style.pixelTop = findPosY(document.getElementsByName('q')[0])-6;
		wschoe_div.style.width = 300;
		wschoe_div.innerHTML += "<input type=\"button\"	 \
		style=\"border:3px solid #48B614;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Naver 검색\" name=\"query_search\"	\
		id=\"nx_query_naver\" value=\"Naver 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://search.naver.com/search.naver?sm=tab_hty&where=nexearch&query='	\
		+ escape(document.getElementsByName('q')[0].value));baby('aa');\"  >"
		+ "<input type=\"button\"	 \
		style=\"border:3px solid #9AC1C6;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Daum 검색\" name=\"query_search\"	\
		id=\"nx_query_daum\" value=\"Daum 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://search.daum.net/search?w=tot&t__nil_searchbox=btn&q='	\
		+ encodeURI(document.getElementsByName('q')[0].value));baby('aa');\"  >";
                var wschoe_div2 = document.createElement("div");
		document.body.appendChild(wschoe_div2);
		wschoe_div2.style.position = "absolute";
		wschoe_div2.style.pixelLeft = findPosX(document.getElementsByName('q')[1]) + 60 + document.getElementsByName('q')[1].offsetWidth;
		//wschoe_div.style.pixelTop = 60;
                wschoe_div2.style.pixelTop = findPosY(document.getElementsByName('q')[1]) - 4;
		wschoe_div2.style.width = 300;
		wschoe_div2.innerHTML += "<input type=\"button\"	 \
		style=\"border:3px solid #48B614;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Naver 검색\" name=\"query_search\"	\
		id=\"nx_query_naver\" value=\"Naver 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://search.naver.com/search.naver?sm=tab_hty&where=nexearch&query='	\
		+ escape(document.getElementsByName('q')[1].value));baby('aa');\"  >"
		+ "<input type=\"button\"	 \
		style=\"border:3px solid #9AC1C6;	\
		height:33px; padding:3; background:transparent; cursor:pointer;	\
		*overflow:visible;\" title=\"Daum 검색\" name=\"query_search\"	\
		id=\"nx_query_daum\" value=\"Daum 검색\"	 \
		class=\"box_window\" accesskey=\"s\"	\
		onclick=\"window.open('http://search.daum.net/search?w=tot&t__nil_searchbox=btn&q='	\
		+ encodeURI(document.getElementsByName('q')[1].value));baby('aa');\"  >";
	}
	}
	var readyStateGo = function() {
		if(document.readyState == "complete")
			{
				keywordToss();
			}
		document.onreadystatechange = function(){
			if(document.readyState == "complete")
			{
				keywordToss();
			}
		}
	}
	setTimeout(readyStateGo,100);
})();
	function baby(aa) {
		//alert(aa);
	}