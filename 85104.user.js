// ==UserScript==
// @name           ELR NoobBot
// @namespace      js
// @include        http://www.elitelinerider.com/theshoutbox.php*
// ==/UserScript==

function getSBmsg() {
	var divArray = document.getElementsByTagName("div");
	for (var i = 0; i<divArray.length; i++){
		if (divArray[i].class="sbmessage")
			return divArray[i].innerHTML;
	}
}

if (getSBmsg() == "test") {
	document.getElementById('shouttype').value = "test";
	document.forms["shoutform"].submit();
}