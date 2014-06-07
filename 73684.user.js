// ==UserScript==
// @name           Saitama City Library Lookup from MediaMarker
// @namespace      http://mediamarker.net/
// @include        http://mediamarker.net/u/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.2.6.js
// ==/UserScript==

$(function(){
	console.log("start");

	var isbn13 = '*';

	var api = 'https://www2.lib.city.saitama.jp/licsxp-opac/WOpacTifSchCmpdExecAction.do?hash=&returnid=&gamenid=tiles.WTifSchCmpd&chkflg=check&loccodschkflg=check&langcodschkflg=nocheck&condition1=0&condition1Text=&range1=0&mixing1=0&condition2=1&condition2Text=&range2=0&mixing2=0&condition3=6&condition3Text=';
	var title = '&#x3055;&#x3044;&#x305F;&#x307e;&#x5e02;&#x56F3;&#x66F8;&#x9928;';
	var anchor = 'https://www2.lib.city.saitama.jp/licsxp-opac/WOpacMsgNewListToTifTilDetailAction.do?tilcod=';
	
	libsearch(api, title, anchor);

	function libsearch( api, title, anchor ) {
		var header = document.getElementsByClassName('med_belong');
		$.each(header, function(i, val){
			if ( val ) {
				isbn = getIsbn13(val);
				checkLibrary( api, title, isbn, val, anchor, i );
				makeButton( api, title, isbn, val, anchor, i );
			}
		}); 
	}

	function makeButton( api, title, isbn, header, anchor, i ){
		var searchBtn = document.createElement( 'div' );
		searchBtn.setAttribute( 'id', "saitama");
		searchBtn.innerHTML = 
		  	'<form>' +
		  		'<input type="button" id="search_submit' + i + '"  value="\u3055\u3044\u305F\u307E\u5E02\u56F3\u66F8\u9928\u691C\u7D22" />' +
		  	'</form>';
		if (header != null){
			header.parentNode.insertBefore( searchBtn, header.nextSibling );
		}

		$("#search_submit" + i).click(function(){
			isbn = getIsbn13(header);
			checkLibrary( api, title, isbn, header, anchor, i );
		});
	}

	function checkLibrary( api, title, isbn, header, anchor, i ) {
	var count = 2;
		GM_xmlhttpRequest(
	    {
	      method  : "GET",
	      url     : api + isbn,
	      headers : {
	                  'User-Agent'  : 'Mozilla/4.0 (compatible) Greasemonkey',
	                  'Content-type': 'application/x-www-form-urlencoded'
	                },
	      onload  : function( response ) {
						if ( count > 0 ) {
							count = count - 1;
							response.responseText.match(/tilcod=(\d{13})/);
							aaa = RegExp.$1;
							makelink( api, title, header, anchor, aaa, isbn, i );
						} else {
							makelink( api, title, header, anchor, "", isbn, i );
						}
	                },
	      onerror : function(){
	      	  			console.log("xmlhttpRequest error");
	      			}
	    }
	  );
	  return 1;
	}

	function makelink( api, title, header, anchor, foungflg, isbn, i ) {
	  var msg = ( foungflg ) ? '<b>&#x8535;&#x66f8;&#x3042;&#x308A;&#x3002;</b>' : '<b>&#x8535;&#x66F8;&#x4E0D;&#x660E;&#x3002;</b>';
	  if (document.getElementById(isbn)){
	  	  spl_link = document.getElementById(isbn);
	  }else {
		  var spl_link = document.createElement( 'div' );
		  spl_link.setAttribute( 'id', isbn );
	  }
	  spl_link.innerHTML = '<span class=\"spl\" style=\"color:#ff0000;\">' + msg + '</span>&nbsp;';
	  if ( foungflg ) {
	    spl_link.innerHTML += '<a href=\"' + anchor + foungflg + '\" target=\"_blank\" title=\"' + title + '\">' + title + '</a>&#x3067;&#x8868;&#x793A;&nbsp;'
	                        + '</div>';
	  } else {
	    spl_link.innerHTML += '<a href=\"' + api + isbn + '\" target=\"_blank\" title=\"' + title + '\">' + title + '</a>&#x3067;&#x691C;&#x7D22;&#x3002;';
	  }
	  header.parentNode.insertBefore( spl_link, header.nextSibling );
	}


	function getIsbn13(header){
		header.textContent.match( /(978\d{9}[\dX])/ );
		if ( RegExp.$1!='*' ) {
			isbn13 = RegExp.$1;
		}
		return isbn13;
	}
});
