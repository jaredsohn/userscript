// ==UserScript==
// @name		Synchtube Plus
// @namespace	synchtube.com
// @version		1.0
// @description	Detects leader changes on Synchtube
// @include		http://www.synchtube.com/r/*
// @include		http://synchtube.com/r/*
// ==/UserScript==

var leader = false;
var newLeader = false;
var chatWindow = document.getElementById("window");
var test = document.getElementById("st-users");
var children = test.children;

window.addEventListener ("load", LocalMain, false);

function LocalMain() {
    window.setInterval("checkLeaderChange()", 1000);
    alert("Script active.");
}

function checkLeaderChange() {
	test = document.getElementById("st-users");
	children = test.children;
	for (i = 0;i<children.length;i++) {
		var child = children[i];
		if (child.innerText != "") {
			if (child.getElementsByClassName("star")[0].style.display == "inline") {
				newLeader = child.getElementsByClassName("user_id")[0].innerText;
				if (leader == false || newLeader != leader) {
					var b = '<div class="0-chatid userchat useremote" style="color:red;"><span class="chatfirstmsg chatusername mechat">'+newLeader+' ['+i+']</span><span> is now leader</span></div>';
					leader = newLeader;
					chat.writeRawMessage(b);
					return true;
				}
			}
		}
	}
	return false;
}