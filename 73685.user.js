// ==UserScript==
// @name           StackStockBooks Mumbles Lookup from MediaMarker
// @namespace      http://mediamarker.net/
// @include        http://mediamarker.net/u/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.2.6.js
// ==/UserScript==
$(function(){
	var url = "http://stack.nayutaya.jp/api/book/isbn13/"
	var isbn13 = "";

	var header = document.getElementsByClassName('med_belong');
	$.each(header, function(i, val){
		if ( val ) {
			makeButton(url, val, i);
		}
	});

/**
 * 各書籍詳細につぶやき検索ボタンを表示する。
 */
	function makeButton(url, header, i){
		var searchBtn = document.createElement( 'div' );
		searchBtn.setAttribute( 'id', "StackStockBools" );
		searchBtn.innerHTML = 
		  	'<form>' +
		  		'<input type="button" id="getSssMumbles' + i + '"  value="\u3064\u3076\u3084\u304D\u691C\u7D22" />' +
		  	'</form>';

		if (header != null){
			header.parentNode.insertBefore( searchBtn, header.nextSibling );
		};

		$("#getSssMumbles" + i).click(function(){
			isbn = getIsbn13(header);
			checkMumbles( url, isbn, header, i);
		});
	}

/**
 * StackStockBooksAPIを呼び出し、つぶやきを取得する。
 */
	function checkMumbles(url, isbn13, header,i ){
		GM_xmlhttpRequest({
			method: "GET",
			headers : {
						'User-Agent'  : 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-type': 'application/x-www-form-urlencoded'
			},
			url: url + isbn13 + "/mumbles.json",
			onload: function(data){
				var json = eval('('+data.responseText+')');
				makelink(json, isbn13, header,i);
			},
			onerror: function(){
				console.log("error");
			}
		});
	}
	
/**
 * 各書籍詳細につぶやきを表示する。
 */
	function makelink(json, isbn13, header,i){
		console.log("start makelink");

		if (document.getElementById(isbn + "sss")){
			spl_link = document.getElementById(isbn13 + "sss");
		}else {
			var spl_link = document.createElement( 'div' );
			spl_link.setAttribute( 'id', isbn13 + "sss" );
		};
		if (json.success) {
			if (json.response.mumbles.length != 0) {
				spl_link.innerHTML = '';
				$.each(json.response.mumbles, function(index, val){
					spl_link.innerHTML += val.body
										+ '<font color="green">' + val.time + '</font><br />';
				});
			}else {
				spl_link.innerHTML = 'None';
			}
		}else {
			spl_link.innerHTML = json.message;
		}
		header.parentNode.insertBefore( spl_link, header.nextSibling );

	}

/**
 * 各書籍詳細からISBN番号を取得する。
 */
	function getIsbn13(header){
		header.textContent.match( /(978\d{9}[\dX])/ );
		isbn13 = RegExp.$1;

		return isbn13;
	}

});
