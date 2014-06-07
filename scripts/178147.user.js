// ==UserScript==
// @name 네이버 영화 랭킹 제작년도 보기   
// @namespace  http://atom.pe.kr
// @version 0.1
// @description  
// @match http://movie.naver.com/movie/sdb/rank/*
// @copyright  2013
// ==/UserScript==

var objectToArray = function(object){
	return Array.prototype.slice.call(object);
};

var createAjax = function(url){
	var oAjax = new $Ajax(url, {
		type : 'xhr',
		method : 'get',     // GET 방식으로 통신
		onload : function(res){ // 요청이 완료되면 실행될 콜백 함수
			embedYearDB(res);
		},
		timeout : 60,      // 3초 이내에 요청이 완료되지 않으면 ontimeout 실행 (생략 시 0)
		ontimeout : function(){ // 타임 아웃이 발생하면 실행될 콜백 함수, 생략 시 타임 아웃이 되면 아무 처리도 하지 않음
			alert("Timeout!");
		},
		async : true      // 비동기로 호출하는 경우, 생략하면 true
	});
	oAjax.request();
};

var movieLink;
var rankLink = objectToArray(document.querySelectorAll('td[class="title"] a'));

var embedYearDB = function(result){
		try
		{
			if(result){
				var isMovePage = result.text().match('<strong class="h_mo.([^>]+)');
				var yearText;

				if(isMovePage){
					var tempYearText = isMovePage[0].match(/title=\".([^\"])+/ig)[0];
					yearText = tempYearText.substr(tempYearText.length-4, 4);
				} else {
					yearText = "19금";
				}

				var yearElement = document.createElement("span");
				yearElement.innerHTML = yearText+" ";

				movieLink.insertBefore(yearElement, movieLink.firstChild);
			}
			if(rankLink.length){
				movieLink = rankLink.shift();
				createAjax(movieLink.getAttribute("href"));
			}
		} catch(e) {
			console.log(e);
		}
};

embedYearDB();