// ==UserScript==
// @name Dazheguai
// @author revassez
// @include http://www.taobao.com/go/act/sale/summer2012-yr.php
// ==/UserScript==

(function(){
	 window.setInterval(function(){
		document.getElementById("award_btn").click();
		setTimeout('window.reSetAward()',100);
	 }, 900);
})();