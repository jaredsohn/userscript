// ==UserScript==
// @name 	Hulu Review+
// @namespace	http://flipclap.com/hulu-review-plus/
// @include	http://www.hulu.jp/*
// @include	http://www.hulu.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @resource	style http://hosting.gmodules.com/ig/gadgets/file/100982098342826301218/style.css
// ==/UserScript==

//css
var style = GM_getResourceText('style');
GM_addStyle(style);

//API URL
var apiJaURL = "http://flipclap.com/hulu-review-plus/review_ja.php";
var apiEnURL = "http://flipclap.com/hulu-review-plus/review_en.php";
/* --- 初期変数 ---*/
var footCloseHeight = 20;
var footOpenHeight = 210;
var footOpenSpeed = 500;
 //ボタンのテキスト
var btnOpen = "OPEN";
var btnClose = "CLOSE";
//ドメイン
var domain = "";
//static
var cookie = new Cookie();
var amazon = new Amazon();
	

$(document).ready(function(){
	
	/* * * * * *
	* ページを判定して関数実行
	* * * * * */
	var u = new Url();
	var urls = u.getUrlArray();
	domain = urls[0]
	//URLにwatchがあればムービーページ
	if ( urls[1] == "watch" ){
		initWatch();
	}

});




/* * * * * *
ムービーページ
* * * * * */
function initWatch(){
		
	//開閉エリアのHTML配置
	$("body").append('<div id="exFoot"><a id="btnWindow"></a><div id="langArea"><ul><li id="selectJa">Japanese</li><li id="selectEn">English</li></ul></div><div id="exResult"></div></div>');	
	
	//css
	$('html,body').animate({ scrollTop: 68 }, 'slow');
	$("#exFoot").css("height",footOpenHeight);
	
	//Huluの文字を削除したtitle取得
	var keyStr  = $('title').text();
	var keyStr = replaceAll(keyStr, "Hulu - ", ""); 
	var keyStr = replaceAll(keyStr, " - Watch the full movie now.", ""); 
	var key = replaceAll(keyStr, " - Hulu", ""); 
	var indexOf = key.indexOf(":"); 
	if ( indexOf != -1){
		key = key.slice(0,indexOf);
	}

	//Lang状況
	var lang = cookie.get('selectedLang');
	//初期判定
	if ( stat == undefined && domain == 'www.hulu.jp') {
		cookie.set('selectedLang','ja');
	}
	else if (stat == undefined && domain == 'www.hulu.com'){
		cookie.set('selectedLang','en');
	}
	//jaなら
	if ( lang == 'ja') {
		//html整形
		$('#selectJa').addClass('selected');
		$('#selectEn').removeClass('selected');
		//amazon api
		amazon.setApiURL(apiJaURL);
	}
	//en
	else if ( lang == 'en' || stat == undefined) {
		//html整形
		$('#selectEn').addClass('selected');
		$('#selectJa').removeClass('selected');
		//amazon api
		amazon.setApiURL(apiEnURL);
	}
	
	
	//window状況
	var stat = cookie.get('stateWindow');
	//closeなら
	if ( stat == 'close') {
		$('#exResult').hide();
		$('#exFoot').css("height",footCloseHeight);
		$('#btnWindow').text(btnOpen);//テキスト変更
	}
	//openなら
	else if ( stat == 'open' || stat == undefined) {
		$('#exResult').show();
		$('#exFoot').css("height",footOpenHeight);
		$('#btnWindow').text(btnClose);//テキスト変更
		//レビュー読み込み
		amazon.readReview(key);
	}
	

	//開閉ボタン
	$('#btnWindow').click(function(){

		//開いてるなら
		if( $('#exResult').css("display") =="block" ){
			$('#exResult').hide();
			$('#exFoot').animate({height:footCloseHeight},footOpenSpeed);
			$('#btnWindow').text(btnOpen);//テキスト変更
			//cookieセット
			cookie.set('stateWindow','close');
		}
		//閉じてるなら
		else if( $('#exResult').css("display") =="none" ){
			$('#exResult').show();
			$('#exFoot').animate({height:footOpenHeight},footOpenSpeed);
			$('#btnWindow').text(btnClose);//テキスト変更
			//レビュー読み込み
			amazon.readReview(key);
			//cookieセット
			cookie.set('stateWindow','open');
		}
	});
	
	
	//言語選択ボタン
	$('#selectJa').click(function(){
		//html整形
		$('#selectJa').addClass('selected');
		$('#selectEn').removeClass('selected');
		//cookie
		cookie.set('selectedLang','ja');
		//amazon api
		amazon.setApiURL(apiJaURL);
		//レビュー読み込み
		amazon.readReview(key);
	});
	$('#selectEn').click(function(){
		//html整形
		$('#selectEn').addClass('selected');
		$('#selectJa').removeClass('selected');
		//cookie
		cookie.set('selectedLang','en');
		//amazon api
		amazon.setApiURL(apiEnURL);
		//レビュー読み込み
		amazon.readReview(key);
	});

}



/* * * * * *
Common Functions
* * * * * */
// 全ての文字列 s1 を s2 に置き換える
function replaceAll(expression, org, dest){
	return expression.split(org).join(dest);
}

//stars
function starImage(){
	//画像取得
	/*
	var star0_0 = chrome.extension.getURL("images/s_star_0_0.png");
	var star1_0 = chrome.extension.getURL("images/s_star_1_0.png");
	var star2_0 = chrome.extension.getURL("images/s_star_2_0.png");
	var star3_0 = chrome.extension.getURL("images/s_star_3_0.png");
	var star4_0 = chrome.extension.getURL("images/s_star_4_0.png");
	var star5_0 = chrome.extension.getURL("images/s_star_5_0.png");
	*/
	
	//html整形
	$('.swSprite span').hide();
	$('.s_star_0_0').append('<img class="starImg" src="'+star0_0+'" />');
	$('.s_star_1_0').append('<img class="starImg" src="'+star1_0+'" />');
	$('.s_star_2_0').append('<img class="starImg" src="'+star2_0+'" />');
	$('.s_star_3_0').append('<img class="starImg" src="'+star3_0+'" />');
	$('.s_star_4_0').append('<img class="starImg" src="'+star4_0+'" />');
	$('.s_star_5_0').append('<img class="starImg" src="'+star5_0+'" />');
}



var query = encodeURIComponent("あとで読む");

GM_xmlhttpRequest({
	method: "GET",
	url: "http://flipclap.com/hulu-review-plus/json.php?q=" + query,
	onload: function(response) {
	var obj = response.responseText;
	var data = eval("("+obj+")");
	$('h2').text(data.num);
	console.log(obj);
  },
  onerror: function(response) {
      alert(
          [
            response.status,
            response.statusText,
          ].join("\n"));
  }
});



/* * * * * *
Class Amazon
* * * * * */
function Amazon(){

	var _apiURL = '';
		
	//Amazon Review
	this.readReview = function(key){
		
		//ローダー表示
		$('#exResult').html("");
		$("#exResult").append('<img id="prog" src="'+progSrc+'" alt="" style="display:none;" />');
		$('#prog').show();
		
		GM_xmlhttpRequest({
			url: _apiURL + "?key=" + key,
			method: "GET",
			onload: function(data) {
				var res = data.responseText;
				var json = eval("("+res+")");
				$('#exResult').html(json.outertex);
				starImage();//星画像配置
			},
			 onerror: function(data) {
				$('#exResult').html('sorry!  :(' );
			}
		});

	}
	
	//set
	this.setApiURL = function(url){
		_apiURL = url;
	}
	
	//get
	this.getApiURL = function(){
		return _apiURL
	}

}


/* * * * * *
Class Url
* * * * * */
function Url(){

	//URLのパラメーター取得
	this.getUrlVars = function() { 
	    var vars = [], hash; 
    	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'); 
    	for(var i = 0; i < hashes.length; i++) { 
        	hash = hashes[i].split('='); 
	        vars.push(hash[0]); 
    	    vars[hash[0]] = hash[1]; 
	    } 
    	return vars; 
	}
	
	//URLをスラッシュ区切りで配列に
	this.getUrlArray = function(){
		var url = document.URL;
		url = url.split("http://").join(""); //http://を削除
		url = url.split('/');
		return url;
	}
	
}


/* * * * * *
Class Cookie
* * * * * */
function Cookie() {
	
	//プライベート
	var _deadtime = 48;//期限48時間
	
	//読み込み｜ex：http://blog.wonder-boys.net/?p=208
	this.get = function(value){
		if(value){
			var c_data = document.cookie + ";";
			c_data = unescape(c_data);
			var n_point = c_data.indexOf(value);
			var v_point = c_data.indexOf("=",n_point) + 1;
			var end_point = c_data.indexOf(";",n_point);
			if(n_point > -1){
				c_data = c_data.substring(v_point,end_point);
				//alert("cookieは" + c_data + "です");
				return c_data;
			}
		}
	}

	//書き込み
	this.set = function(cookie_name,value){
		var ex = new Date();
		ex.setHours(ex.getHours() + _deadtime);
		ex = ex.toGMTString();
		var c = escape(cookie_name) + "=" + escape(value) + ";expires=" + ex;
		document.cookie = c;
	}
	
}






/* * * * * *
Images
* * * * * */
var progSrc = 'data:image/gif;base64,'+
    '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'+
    'R6WpvH4v+vj/gIGCGhEAOwAAAAAAAAAAAA==';
	

var star0_0 = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAEEAAAAMCAYAAAA9MdD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAdVJREFUeNrclk1qwlAQxydNFBdarDs3oaQbcSHYQnfdlPQCFleeoAco'+
    'vUJ7gl5Au+kVghtxI7YgoiubhSIIQkQQrR/Q/ickIZXExlVjB4ZMJu/3XpiZ994I5XKZPOQkGo0a'+
    'q9XqDLZOO6RUKpnPSqXiMPDtZGwJC3PkwxVlWaZ4PP4BW6Fg4jBY9KAYvyCo6XSaGOQJAi50sIxk'+
    'PRV3xlE6duSo2+0y9OZi2J7YDCLrycD/g0EZTqws+K7zV4yAM0HhMuEBtqRSKcrn86Zdq9UIe8n5'+
    'ZhgGv59j/Pt/YQTrYHzIZrOPmUyGo+ZZT7PZjJrNJo1Goxu8avsyyJCGDISSEQuFAvva4/H4C46r'+
    'RCJBkiTRZrNxdDAYUL1ep+l0eo+x9nUSmMGPmUwbEkbGDsISWv2EiKKoMrherx1ttVo0n8+vMebF'+
    'FcxADBZxmFwut4RWG41GqJjt28EEFouFuVe4ZNjmPQW59Dt5D52R3A0Sykbl0hkOh9Tv9ykSiZCi'+
    'KMQTWVfL03ZTtS/DjUvYGHclqMlkknq9Hum6/oy9c4qo3XY6HY2jGIvFLjwap18Zj+YkdIyw1TYX'+
    'rR5Ac/mOoXfQV58W2mT4VHZlwWG82lR8DxXzLcAAj3jpK2omWt8AAAAASUVORK5CYII=';
	
	
var star1_0  = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAEEAAAAMCAYAAAA9MdD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAuBJREFUeNrUls9PWkEQx78IAq08Awjyo4AITXppaNTUS2OamOe1F8Ol'+
    'HnvyD/Cf6B9QLz3WXvonlHhBjcFQsVZbWyE2FKVQoFQKPB7wOrsVRIPG43OSyRt297NDZmd2R/N6'+
    '0Y0+YtEbDMWGJAXJTuEaefEqw78rKysWvV5fbDQawYWFhWuZjqiFGbiCC3sD4zAJQpLsAG4mYZ/P'+
    'B5PJlCSnt4q5Kgii03MPnrFRvsENHYkulwvM2W1jdGffQO+JUymEPf4xGJSf+PKJQ/Eehtkl45OX'+
    'nKHI/mf0+k60sb+/H6bxCwylYensFM79qITR0J0QGKK0Nwmm8wvBNoLQZAiNbBRbH8toYqg7VyoU'+
    'aPvnk8O+6Q9s045YrVZMTExwOxqNguqvO1csFtnvSVqvSkb77LFQkhuNusfrFkOP7mM84MaofRjt'+
    'Wg6tag5uuw7jDx5ixGbGSSaLP+XKXOtXYqPtfFqn6Ips82AwCIfDAUVRuHq9Xvj9fthsNhwfH6Nc'+
    'Ls/RCW3E43FVMiwILCC7hXxByZ3kZgTlBDopzQOgtFpcfxx9x2YsidPT6hKtfcPryDe3m8/nlWw2'+
    'OyMIAnQ6HZrNZlfT6TTW19eZkyX6Y5zZJVEj0wmCRLpal+S6QXCINhpS5L9Au8U18U1CVVJmac3b'+
    'Tho10+8l0tWmfaau1WpF5kyW5a7u7OygWq3OkpMuEwqFJNLVWCymKuby6yCOOl3Q6K0olSVIdQlt'+
    'WcKI0GZz01fdvMxJrVbj9VWpVLjN6vC2ML1BsAwODop2qwUHB0fY+qpg47MGhd+AU2j1fVrohbBQ'+
    'qoks3TKZDBKJBLa3t7lD5rwfwxoXtTEDF7LAbsXa2iYO0rVluQV/VWrPx5JKJHt6B3cNmqk+jZNo'+
    'NptxeHiIVCq1TPXmp0jP7+3tRZgzo9E41ac5UR2judQ2s+iUSCM9Y8Oki6Tv+rXQlA2cofqK9JxC'+
    'l+nXptK8qph/AgwAxJYhaeTZdiQAAAAASUVORK5CYII=';


var star2_0 = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAEEAAAAMCAYAAAA9MdD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAxNJREFUeNrEls9PGlEQx78ogq2sAUTxByBCk14aGjH15sWspya9GC/1'+
    '0qQne238B3ppTz3WS3urvTRpT96IF9RaDIq12toqsaEo1QClUmB3ge28DSAaaMBEmGSyjzf74c2b'+
    'mfd2VC9n+lFBDBqtNiYKgpPGweLkwxdhVJNXjwZKDL0XRA0yPz9v0Gg0MVEUndPT001jWqpwU1bH'+
    'EHQct09jB2qTEkMBqZmx2WzQ6XT75GjTmGpB4HstA7AM9ih/UONCl2L6+vrAHGwmoy48HeUZp7Ke'+
    'stgHoZV/4etnBfIXSp49/FTu8UK2qzJk95etozCFLJwxGk0xQ9jZ2Zki+zmGSrchjIruBEcHlbCO'+
    '051dCKYuuNwuiBEv1j4lkEVHyRaPRiEKopuY9XoYOO67O22j68yRohiNRgwPDytjr9cLOrMlWywW'+
    'Y7/d9P6VM6337nBxSRQzFms/77p9A0OOfvR0dyKfPkYudYz+bjWGbt5Cl0mPo3AEfxLJCcrqysf3'+
    'T+tiHjxZWPH7/RnKCM8ccjqdMJvNkGVZUavVCrvdDpPJhMPDQyQSiQnKakMYFgQWkK3oSVQ+Pjoe'+
    '4+QjqIWQshk5l1P058EPrPr2cXqamqUAvGbAxsLzupktkpOTEzkSiYxxHAe1Wo1sNlvSUCiE5eVl'+
    '5tgsbaZhTDEIAuliRpAyWs7Mm2hKlv4C+Zyige8CUoI8Tpt5Uywj993HAunih3fPamZcLpdAuujz'+
    '+TKtra08c1CSpJJubm4ilUqNk2MNZS5+Hfie3j6oNEbEEwKEjIC8JKCLyzPbaLWb9zIMcyydTitn'+
    'MplMKmN2dpvBlAfB0NbWxncbDdjdPcDaNxkrX1SI/gZ6uVzFTwtrkOplWONC5cmzEg2HwwgEAtjY'+
    '2FCcZA43g2k5l9FuI5aWVrEbSs9JOdhTQn7Sty97IqfXcF2rGqnQBF2K0ev12NvbQzAYnKMzaqfs'+
    'TG5vb3uYg+3t7SMVGporZVQX2mYWnTipp2yuk3SG9G2ldpg2qTBk85TN/ZehxRWGzqSnbK7EVGpt'+
    'r5L5J8AA/c8qGMFamRUAAAAASUVORK5CYII=';
	
	
var star3_0 = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAEEAAAAMCAYAAAA9MdD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAupJREFUeNq8ls9PGkEUx79YftjKIiAoICBCo5eGKqb+AQavvRgv9dKk'+
    'J3s3Jh57qX9BvbRHTz301BtJDxhbalBjlRarxKRB1ETotlTYBdm+2QAuBhJE5CWTHd7sh50378c8'+
    '1dt5B+qISavTpUVB8NE8UVG+eJNEI3n3crDK0HsJNCGtMKurqyatVpsWRdE3NzfXFqarATfr8g5D'+
    'z3GHNPeiOakyZNydMm63G3q9/pCMawvT6BCCNucgnEP98h80+aGOMXa7HcyodjHq8tOr9DiF6KzT'+
    'MwSddIofuzIULYcve0QpdDNlzzVkaD2q+E7LTNlzV4xWW/EqYrHYLK3XMBTuN2ZUVBO8PRSOek5/'+
    'VRAsffAH/BBPwtjY4VFET3Utc34OURADxGzeNQPvs4DBPbnJNl8Rs9mM8fFxeR4Oh0F5Xl1Lp9Ps'+
    'd4DevxFz7+kTLlMQxbzT5Qj6Hz/EsNeBfqsBpdwZLi/O4LCqMTz6CH0WI1LJE/zhs9PkofXIh9d3'+
    'zjx/9XE9Go3myYtBZoTP58PAwAAkSZKHy+WCx+OBxWLB8fExeJ6fpki4MVNJh5V4bN9wmkwu+X0a'+
    'GHqkmpw52v2MnZ85FIrSAhkT6jRDIWxIpVJLY2Nj6O3trWFIj62tLebdBTqAlhjVtStycWRkaHnU'+
    'lkdJ5KvKtW8i+H+lKdrYpzrXXEcYyuNF8uoy86xSIpEI8+YUGdMyc/12CPbb7FBpzcjwAoS8gFJB'+
    'QB9XYmuTjSpvpxiO45DL5eQ8zmaz8pzl+20Z5SGYNBpN0Go2IR4/wsa+hPXvKpz/BmzcZd2rhTU7'+
    'nWBYs6NWq4M0kEwmsb29LYczM4wZeVumq8Y7VjPW1r4g/iu3UriE50IozXw9lEInf+/jgU41Uaeh'+
    '6RhjNBpxcHCARCKxUiwWPeTRmb29vRAzqru7e6JOE9Q0c70msNPJ0AgpdAYa8zTe12ttacMyoyhk'+
    'TNd2hjYsM4rix3RVpl473CzzX4ABAJh0uwTy9dqxAAAAAElFTkSuQmCC';
	
	
var star4_0 = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAEEAAAAMCAYAAAA9MdD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAsRJREFUeNrUlktPWkEUx/8YuNDKBblWA5VXIVHbhfGRuHBp8BMYN3XZ'+
    'lU26NBr3TfgEummXrvoVSFxg2lpRjBVarBKbhqgLobc+8F5ePTMBvNhLwsrcTjKZyTn8mLn/OXPm'+
    'mN4tPIVOcwlWa15VlDDNsw3jq9Uc2rX3rweaDP0uiw7aQzHr6+suQRDyqqqG5+fn/2G62nBzvtAz'+
    '2EXxmOYhdNaaDG3UcIzf74fdbj8mQUKdihBxewfgDfTzP+hwIUMzHo8HTAg9xlwfQ9oTp3Cb8wYD'+
    'sNbO8f2AQzv1UGTDDoVhoX4KbRny72jWeVCmftp3jCA0IgHpdHqO/C2MiXJCqJtCyy7a7xLCk16M'+
    'jI9APYtje19GGd1NX+HiAqqijhOza0QGoZfjDv/kLvvgRpMkCWNjY3wej8dBuaHpy+fzPBKy15eX'+
    'y16fJzo45CPVLNxZ/vMT1ZKCiec2WKQXuL4pYTeRYhubIbWTdALGZN68TdJJL9PJR4eHh1kUcKZS'+
    'qfBxamqKj1dXV0gkEkyQmcZ1WMukDx3nudzKSNgCR3et5c6cHHzC/o8iSuXaIm0s9j8wFPaO09PT'+
    'ldHRUTidzhaG7Egmk0yARXotYqZ7T+TS4GAgOuS+RVWVm8bNryrk6+o0LbKh82QZlqGIWAqHw1Hq'+
    'LfatrS3IsjxNAmzovQ6RfrcHJkFCQVag3Co87HrFKvNNtsu8RmZEUUSxWOR3n10BNmc5QstoRXBZ'+
    'LJZIn+RCJnOC7cMaPn4z4eI34BYruk8LK1yMyrACyWw2R6gjl8thb2+PXwEmBhNGy3S1KN0nYXPz'+
    'MzK/imulCoI3SnX2y3Etdnb5CI+tpgmd4sTQTE9PD46OjpDNZtfK5XKQomA2lUrFmBA2m22iUTjd'+
    'zwlMnQL1mMbmoL5A/YNemUqLc0aTlJjNEAx9JGdY8tPYmkyjhP4rwACcobyD4qEAMQAAAABJRU5E'+
    'rkJggg==';
	
	
var star5_0 = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAEEAAAAMCAYAAAA9MdD3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAc5JREFUeNrcls1KAlEUx/8TjVY6A1qK+YFlYNSiRUIPEPYE0RO0qn0U'+
    'PUFPUJt6gh4hoY1UVBb0baEYIdTCzERzZmymM4PaJDPgspkDl3s5Z373wH/OPfcyuytBGJjH4XS+'+
    'i4IwQet827m8XYSZ7a2GOgx9l0cP9l+YPhNuKRIbh5vjcrSOoTfrMJTUUoyZCMlAOIRw1K9t0GMi'+
    'yzL9rTmm/+NUOkvhsSicyhsebjQo0yordcpQSZVbipoyFM/o8vxrRhUh5qIycXPu34YwMgxFaoDv'+
    'ryAU5BNNuA7asXKppIoxS8yFXRhVhHytWt0IR0a34pMROBysFmx+PkOWBCSmBsB6p1GrS7g4v4Uo'+
    'iAuk9iUlsw3TPg472btH/q1Y3JyZYMG7lD9npnBzjKunL0hNZY2SpOzGMF1X5Ho8Ht2aDDQgi5WO'+
    'M30tolKT5wk4NLh+LM903w5Jf2AUjMOLckWA0BC0EhrmZDU2Z9Z5rc7oRfCwLJv0eT3IZgs4e1Rw'+
    'dM+g9AEEuG/Dq0V9hNiB6fujms+LdPoE2ZevHekbY3VBXjzNKanX6iCGnEzC4KFhC6a7J6jqlGmk'+
    'dD6exgqNfaMnJ22kMbqmpPosxfwIMADpUbV4yitZLwAAAABJRU5ErkJggg==';