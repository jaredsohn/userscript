// ==UserScript==
// @name           Suginami Library Search by Amazon ver 081228
// @namespace      http://yakumosora.blog116.fc2.com/
// @include       http://www.amazon.co.jp/*
// ==/UserScript==


// HTMLでなければ終了
if(document.contentType != 'text/html') return;

// ASINを見つけるよ
document.body.parentNode.innerHTML.match(/name=\"ASIN\" value=\"([0-9A-Z]{10})([\/\-_a-zA-Z0-9]*)/i);

// ASINが見つからなければ終了
if (RegExp.$1 == '')	return;

// asinを変数に代入
var asin = RegExp.$1;

// パネルの設定
var GM_infoPanel = document.createElement('div')

with(GM_infoPanel.style) {
	bottom = 0;
	right = 0;
	padding = '2px';
	opacity = 0.8;
	fontsize = 'x-small';
		color = '#000000';
		backgroundColor = '#EEEEEE';
		border = '1px solid #C0C0C0';
		zIndex = 100;
		position = 'fixed';
}

GM_infoPanel.innerHTML = "Library Searching..."; 

var data;
GM_xmlhttpRequest({
	method : "GET",
	url    : 'https://www.library.city.suginami.tokyo.jp/TOSHOW/asp/WwKensaku.aspx',
	headers: {'User-Agent': 'Mozilla/4.0 (compatible)',
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'},
	onload : function(response){
		var str1 = String(response.responseText.match(/value="[^"]*/));
		var str2 = str1.replace("value=\"","");
		data = str2.replace(/\+/g,"%2B");




	GM_xmlhttpRequest({
		method : "POST",
		url    : "https://www.library.city.suginami.tokyo.jp/TOSHOW/asp/WwKensaku.aspx",
		data   : "__VIEWSTATE=" + data + "&txtISBN="+ asin + "&btnSearch=",
		headers: {'User-Agent': 'Mozilla/4.0 (compatible)',
				'Content-type': 'application/x-www-form-urlencoded',
				'Host': 'www.library.city.suginami.tokyo.jp'},
		onload : function(response){
			var result=response.responseText.match(/FCode=[^"]*\">.*<\/td>/g);
			if ( result ) {
				var own = response.responseText.match(/>\u672A\u6240\u8535<\/td>|>\u6240\u8535<\/td>/g);
				j = 1;
				for( i=1 ; i<=own.length ; i++ ) {
					if(own[i] == '>\u6240\u8535<\/td>'){
						comment = '"https://www.library.city.suginami.tokyo.jp/TOSHOW/asp/WwShousai.aspx?' + result[i-1];
						GM_infoPanel.innerHTML += '<br>Suginami Library : ' + j + '   <a href=' + comment;
						j++;
					}
				}
			}
			else{
				GM_infoPanel.innerHTML += '<br>Suginami Library :  Not Found';
			}
			if(j==1){
				GM_infoPanel.innerHTML += '<br>Suginami Library :  Not Found';
			}
		}
	});

	}
});




// パネルの表示
document.body.appendChild(GM_infoPanel);

