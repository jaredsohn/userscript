// ==UserScript==
// @name                Bubblews - Balance In Navigation Bar
// @version        		1.16
// @description	        Shows balance and redemption button in the navigation bar.
// @include				http://bubblews.com/*
// @include				http://www.bubblews.com/*
// @downloadURL			http://userscripts.org/scripts/source/176713.user.js
// @updateURL			http://userscripts.org/scripts/source/176713.user.js
// ==/UserScript==

GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.bubblews.com/account/bank/",
  onload: function(response) {
	var balance = response.responseText.match("\"total_cash\">......");
	show_balance(String(balance));
  }
});

function show_balance(bal) {
	total = document.createElement('text');
	total.id = 'total_balance';
    total.style.fontFamily = "tahoma";
    total.style.fontSize = "15";
    total.style.position = "relative"
    total.style.bottom ="32px"
    total.style.right = "55px"
    
    var space = 100;
    
    var cash = bal.replace("\"total_cash\">", "");
    cash = cash.replace(/[$|l<\/]/g,'');
    cash = cash.trim();
    total.innerHTML = '<br>' + '$ ' + cash;
    
    redeem = document.createElement('text');
	redeem.id = 'redeem_button';
    redeem.style.fontFamily = "tahoma";
    redeem.style.fontSize = "15";
    redeem.style.position = "relative"
    redeem.style.top ="4px"
    redeem.innerHTML = '<br><a href=\'http://www.bubblews.com/redemption/\'>Redeem</a>';
    
    var nav = document.getElementById('user_nav');
	nav.appendChild(total);
    total.appendChild(redeem);
}
