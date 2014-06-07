// ==UserScript==
// @name           Pardus PM Protector
// @namespace      marnick.leau@skynet.be
// @description    Asks for a confirmation when you are about to delete all your messages.
// @include        http*://*.pardus.at/messages.php*
// ==/UserScript==

unsafeWindow.confirm = function() {
	var deleteAll = confirm("Are you sure you want to delete all your PMs?");
	if (deleteAll === true) {
		location.href = "messages_private.php?del=all";
	}
}

for (var i = document.links.length - 1;i > 0 - 1;i--) {
	if (document.links[i].innerHTML === "All Messages") {
		document.links[i].setAttribute('href','javascript: confirm();');
		break;
	}
}