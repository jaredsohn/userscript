// ==UserScript==
// @name         odesk.com.show.balance.user.js
// @description  modify oDesk.com to show balance directly
// @include      http*://www.odesk.com/*
// ==/UserScript==

// Available Balance
var username = document.querySelector("#simpleCompanySelector .oDropdownValue");
if (username) {
	var balance = document.querySelector(".oPos");
	if (balance) {
		username.innerHTML += " (" + balance.innerHTML.replace(/^\s+|\s+$/g, "") + ")";
	} else {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/disbursement-methods", true);
		xhr.onreadystatechange = function () {
			if (this.status == 200 && this.readyState == 4) {
				this.responseText.replace(/[\r\n]/g, "").replace(/<span class="oPos">(.*?)<\/span>/, function (p, m1) {
					username.innerHTML += " (" + m1.replace(/^\s+|\s+$/g, "") + ")";
				});
			}
		};
		xhr.send();
	}
}
