// ==UserScript==
// @name        48 Comments Only
// @namespace   http://akr.tw/
// @description Follow AKB48/SKE48/NMB48/HKT48/JKT48 members on Google+
// @author      akiratw
// 
// @version     1.11
// @license     MIT License
// 
// @icon        data:image/png;base64,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
// 
// @homepage    http://userscripts.org/scripts/show/120097

// 
// @include     http://ya.ru
// 
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js
// @run-at      document-start
// @noframes
// ==/UserScript==

$.ajax({
	url: "https://www.google.ru/search?q=fox&um=1&hl=ru&bav=on.2,or.r_gc.r_pw.,cf.osb&biw=1920&bih=955&ie=UTF-8&tbm=isch&source=og&sa=N&tab=vi&ei=w9xyT6WOCI-YOoj60MwO",
	success: function(data) {
		try{
			alert(data.responseText);
		}catch(e){
			alert(e);
		}
	},
	error: function() {
		alert('error!');
	}
	
});