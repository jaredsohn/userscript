// ==UserScript==
// @name           CnC: Tiberium Alliances Login Shortcuts (KSX-Mod)
// @author         ksx
// @description    Easy login to many accounts on C&C Tiberium Alliances
// @description    by pressing Alt+1, Alt+2, ..... Alt+9 (1st..9th account)
// @description    Alt+0 - Logout
// @include        *alliances.commandandconquer.com*
// @include        *www.tiberiumalliances.com*
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        http*://prodgame*.tiberiumalliances.com/*/index.aspx*
// -require        http://sizzlemctwizzle.com/updater.php?id=146989&days=2
// @version        1.2.1
// ==/UserScript==

// -author         MrHIDEn

// Place your accounts details here. Maximum of accounts is 9.
var loginData = [ //"email","password" table
     "youremail@goeshere.com","yourextracomplicatedpasswordgoeshere",
	 "email 2", "password 2",
	 "email 3", "password 3",
	 "email 4", "password 4",
	 "email 5", "password 5",
	 "email 6", "password 6",
	 "email 7", "password 7",
	 "email 8", "password 8",
	 "email 9", "password 9"
	];
var lang = "en";

function Ini() {
	GM_log("CnC: Tiberium Alliances Login Shortcuts (KSX-Mod) has been loaded.");
};

function login(id) {
	GM_log("Login("+id+")");
	if (loginData.length == 0) return;
	if ((id * 2) > loginData.length) return;
	if (!/(\/..)?\/login\/auth/.test(window.location.pathname)) {
//		window.location.assign("https://alliances.commandandconquer.com/" + lang + "/game/world");
		window.location.assign("https://www.tiberiumalliances.com/" + lang + "/game/world");
		return;
	}
	var em = loginData[2 * id - 2];
	var pw = loginData[2 * id - 1];

	document.getElementById("username").value = em;
	document.getElementById("password").value = pw;
	var inputs = document.getElementsByTagName("INPUT");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type != "submit") continue;
		inputs[i].click();
	}
};

function atKeyUp(e) {
	//console.log("Key");	
	var s = String.fromCharCode(e.keyCode);
	// ALT+Ctrl
	if (e.altKey && !e.ctrlKey && !e.altGraphKey && !e.shiftKey) {
		//console.log("Alt+"+s);	
		switch (s) {
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			login(s);
			break;
		case "0":
//			window.location.assign("https://alliances.commandandconquer.com/logout");
			window.location.assign("https://www.tiberiumalliances.com/logout");
			break;
		default:
			// other letters
		}
	}
};

// Events
document.addEventListener("keyup", atKeyUp, false);
Ini();