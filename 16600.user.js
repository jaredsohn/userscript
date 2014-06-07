// ==UserScript==
// @name          MoneyControl Re-Titler
// @namespace     http://www.madhusudhan.info/userscripts
// @description   Sets the window title to be the change in value of the portfolio
// @include       http://www.moneycontrol.com/india/bestportfoliomanager/*/stock_cons
// ==/UserScript==

/*
  Author: Madhusudhan Rao - http://www.madhusudhan.info/
*/

(function() {	
	function setTitleOfWindow() {
		var newTitle;
		newTitle = document.evaluate("/html/body/div/div/div[6]/table[4]/tbody/tr[2]/td/table/tbody/tr[2]/td/table/tbody/tr[2]/td/table/tbody/tr/td[3]/div/div[2]/div[3]/div/table/tbody/tr[2]/td[4]/font/b", document, null, XPathResult.STRING_TYPE,null).stringValue;
		newTitle += " (";
		newTitle += document.evaluate("/html/body/div/div/div[6]/table[4]/tbody/tr[2]/td/table/tbody/tr[2]/td/table/tbody/tr[2]/td/table/tbody/tr/td[3]/div/div[2]/div[3]/div/table/tbody/tr[2]/td[6]/b", document, null, XPathResult.STRING_TYPE, null).stringValue;
		newTitle += ")";
		document.title = newTitle;
	}

	setInterval(setTitleOfWindow, 5000);
})();