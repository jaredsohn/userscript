// ==UserScript==
// @name        Autologin for Google accounts (Any; Youtube, Gmail etc.)
// @namespace   Allos' Google
// @include     https://accounts.google.com/*
// @version     1
// ==/UserScript==

var settingDone = true;

if (location.search == "?setAutologinSettings") {
	var setALDiv = document.createElement("DIV");
	setALDiv.innerHTML = "<span style = 'display: inline-block;'><strong>Set Autologin Details:   </strong></span><br><div style = 'margin-top: 10px; margin-bottom: 5px; display: inline-block;'><span><strong>Email: </strong></span><input style = 'width: 200px' id = emailAL type = 'email' spellcheck = 'false'></input></div><br><div style = 'display:inline-block; margin-right: 5px;'><span><strong> Password: </strong></span><input id = passwdAL type = 'password'></input></div><div onmouseover = 'document.getElementById(\"setBtn contents\").style.color = \"#585858\"; this.style.backgroundColor = \"#58ACFA\"' onmouseout = 'document.getElementById(\"setBtn contents\").style.color = \"#2E2E2E\"; this.style.backgroundColor = \"#2E64FE\"' style = 'background-color:#2E64FE; text-shadow:1px 1px #848484; width:30px; border:2px solid; border-radius:5px; border-color:#424242; text-align:center; display:inline-block; cursor:pointer' id = setBtn onclick = 'localStorage.YTALEmail = document.getElementById(\"emailAL\").value; localStorage.YTALPasswd = document.getElementById(\"passwdAL\").value; location.href = \"https://accounts.google.com/Login\"'><span id = 'setBtn contents' style = 'color:#2E2E2E;'>Set</span></div>";
	setALDiv.style.width = '257px';
	setALDiv.style.marginRight = 'auto';
	setALDiv.style.marginLeft = 'auto';
	setALDiv.style.marginTop = '15%';
	setALDiv.style.padding = '20px 20px 20px 20px';
	setALDiv.style.border = '2px solid';
	setALDiv.style.borderColor = '#585858';
	setALDiv.style.borderRadius = '10px';
	setALDiv.style.backgroundColor = '#F2F2F2';
	settingDone = false;
	var deleteChildren = document.body.children;
	for (var child = 0; child < deleteChildren.length; child++) {
		document.body.removeChild(deleteChildren[child]);
	}
	deleteChildren = document.head.children;
	for (var child = 0; child < deleteChildren.length; child++) {
		document.head.removeChild(deleteChildren[child]);
	}
	document.body.appendChild(setALDiv);
}
if (settingDone) {
	var children = document.forms["gaia_loginform"].children;
	var successEmail = false;
	var successPasswd = false;

	for (var i = 0; i < children.length; i++) {
		if (children[i].className == "email-div" && localStorage.YTALEmail != "undefined" && localStorage.YTALEmail != "") {
			children[i].children[1].value = localStorage.YTALEmail;
			successEmail = true;
		}
		if (children[i].className == "passwd-div" && localStorage.YTALPasswd != "undefined" && localStorage.YTALPasswd != "") {
			children[i].children[1].value = localStorage.YTALPasswd;
			successPasswd = true;
		}
	}

	if (localStorage.YTALEmail == "undefined" || localStorage.YTALEmail == "") {
		successEmail = false;
	}
	if (localStorage.YTALPasswd == "undefined" || localStorage.YTALPasswd == "") {
		successPasswd = false;
	}
	
	if (!successEmail || !successPasswd) {
		alert("No settings detected; Redirecting to auto log-in page...");
		location.href = "https://accounts.google.com/Login?setAutologinSettings";
	}

	if (successEmail && successPasswd) {
		document.forms["gaia_loginform"].submit();
	}
}