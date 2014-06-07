// ==UserScript==

// @name           LolWhuut's Custom Post Counter

// @namespace      BM

// @description    Made by LolWhuuts of BasilMarket.com

// @include        http://www.basilmarket.com/*

// ==/UserScript==


window.addEventListener('submit', newsubmit, true);


if (!GM_getValue('VuCounter')) {

	GM_setValue('VuCounter', 58928);

}


var username = readCookie("name").toLowerCase();
if (document.URL.toLowerCase().match(username)) {
	document.title= readCookie("name") + "'s BasilID - Don't you just love this Post Counter? Your frggin awsome post count is: " + GM_getValue('VuCounter');
}




function newsubmit(event) {

	var target = event ? event.target : this;

		if (target.action.match("func-submit_forum.php")){

		var addfive = new Number(GM_getValue('VuCounter'));

		addfive += 5;

		GM_setValue('VuCounter', addfive);

	}

    this._submit();

}





function readCookie(name) {

	var nameEQ = name + "=";

	var ca = document.cookie.split(';');

	for(var i=0;i < ca.length;i++) {

		var c = ca[i];

		while (c.charAt(0)==' ') c = c.substring(1,c.length);

		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);

	}



	return null;

}