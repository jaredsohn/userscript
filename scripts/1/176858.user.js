// ==UserScript==
// @name         guru.com.show.balance.user.js
// @description  modify guru.com to show balance directly
// @include      http*://www.guru.com/*
// ==/UserScript==

// Available Balance
var username = document.querySelector(".headerScreenName");
if (username) {
	document.querySelector(".sn.alertHover").innerHTML = username.innerHTML;

	var balance = document.querySelector("#ctl00_guB_lblBalanceAvailable");
	if (balance) {
		document.querySelector(".sn.alertHover").innerHTML += " (" + balance.innerHTML + ")";
	} else {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/pro/payments.aspx", true);
		xhr.onreadystatechange = function () {
			if (this.status == 200 && this.readyState == 4) {
				this.responseText.replace(/<span id="ctl00_guB_lblBalanceAvailable">(.*)<\/span>/, function (p, m1) {
					document.querySelector(".sn.alertHover").innerHTML += " (" + m1 + ")";
				});
			}
		};
		xhr.send();
	}
}
