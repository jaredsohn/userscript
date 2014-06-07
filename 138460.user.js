// ==UserScript==
// @name       C&CAutoLogin
// @namespace  http://www.google.com/
// @version    0.1
// @description  autologin
// @match      *alliances.commandandconquer.com*
// @copyright  2012+, You
// ==/UserScript==

function Login() {
	document.getElementById("username").value = "your@email.com";
	document.getElementById("password").value = "password";
	var inputs = document.getElementsByTagName("INPUT");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type != "submit") continue;
		inputs[i].click();
	}
};

if (document.title == "Command and Conquer Tiberium Alliances - Login")
{
    Login();
}

if (document.title == "Command and Conquer Tiberium Alliances - Home")
{
    window.location.href = "https://alliances.commandandconquer.com/en/game/launch";
    document.title = "Command and Conquer Tiberium Alliances - Login"
}
