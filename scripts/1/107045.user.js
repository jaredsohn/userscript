// ==UserScript==
// @name           Divinity Auto-Vote
// @namespace      auto-vote
// @description    Automatically fill in information for divinity vote.
// @include        http://divinity-x.net/vote/
// ==/UserScript==

////////////////////////
//////SCRIPT FLAGS//////
////////////////////////
var FLAG_RESET = false;
////////////////////////
////////////////////////
////////////////////////


if (FLAG_RESET == true) {
	GM_deleteValue("nick");
	GM_deleteValue("pass");
}

window.setTimeout(main, 1000)

function main() {
	if (!GM_getValue("nick") || !GM_getValue("pass")) {
		alert("It appears your auto-fill information is incomplete. This alert will no longer appear once you've filled in your information.");
		GM_setValue("nick", prompt("Name", "Please enter your account name."));
		GM_setValue("pass", prompt("Password", "Please enter your account password."));
		alert("This information is stored on your local computer only. To delete or reset it, simply uninstall this script.");
	}

	else {
		document.getElementsByName("name")[0].value=GM_getValue("nick");
		document.getElementsByName("pass")[0].value=GM_getValue("pass");
		document.forms[0].submit();
	}
}