// ==UserScript==
// @name         elance.com.show.balance.user.js
// @description  modify elance.com to show balance directly
// @include      http*://www.elance.com/*
// ==/UserScript==

// Available Balance
var table = document.querySelectorAll(".withdrawTable td");
if (table.length > 0) {
	var tds = [table[1].innerHTML, table[2].innerHTML];
	document.querySelector("#nav-account-menu a").innerHTML += " (" + tds.join(" ") + ")";
} else if (document.querySelector("#nav-account-menu a")) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/php/account/main/withdraw.php", true);
	xhr.onreadystatechange = function () {
		if (this.status == 200 && this.readyState == 4) {
			var tds = this.responseText.split(/withdrawTable/)[1].split(/<\/tr>/)[0].split(/<\/td>/);
			tds.shift();
			tds.pop();
			tds.map(function (td) {
				return td.split(/<td>/)[1];
			});
			document.querySelector("#nav-account-menu a").innerHTML += " (" + tds.join(" ").replace(/^\s+/g, "") + ")";
		}
	};
	xhr.send();
}
