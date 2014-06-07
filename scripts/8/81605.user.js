// ==UserScript==
// @name           AllyIrcLink
// @namespace      Alliance IRC Link
// @description    Add WebIrc link to embassy.
// @include        http://*.ikariam.*/index.php?view=embassy*
// @include        http://*.ikariam.*/index.php?view=diplomacyAdvisorAlly*
// @exclude        http://board.*.ikariam.*/*
// @exclude        http://support.*.ikariam.*/*

// ==/UserScript==

// Irc-channel
var channel_private = ""
// IRC-channel's password
var channel_private_pass = ""

// Script language: (fi or en)
var lang = "fi"




// ====== Languages ======================================================================================================

var languages = {
	"en": {
		"allyIrcChan"	: "Alliance's WebIrc",
		"description"	: "Open Alliance's WebIrc to new window.",
		"open"	: "Open WebIrc",
		"chanPass"	: "Password:",
		"chanName"	: "Channel:",
		"nickName"	: "Nickname:"

	},
	"fi": {
		"allyIrcChan"	: "Liittouman WebIrc",
		"description"	: "Avaa liittouman WebIrc uuteen ikkunaan.",
		"open"	: "Avaa WebIrc",
		"chanPass"	: "Salasana:",
		"chanName"	: "Kanava:",
		"nickName"	: "Nimimerkki:"

	}
};

var language = languages[lang]



// ------ Create box ------------------------------------------------------------------------------------------------------

function boxTo(element) {

var element = document.getElementById(element);

var box = document.createElement('div');
var innerHTML = '<div class="dynamic" id="allyirc">';
innerHTML += '<h3 class="header">'+language["allyIrcChan"]+'</h3>';
innerHTML += '<div class="content">';
innerHTML += '<script type="text/javascript">';
innerHTML += 'function openIrc()';
innerHTML += '{';
innerHTML += 'var nick = document.getElementById("nickform").value;';
innerHTML += 'var channel_private = document.getElementById("chanform").value;';
innerHTML += 'var channel_private_pass = document.getElementById("passform").value;';
innerHTML += 'window.open("http://webchat.quakenet.org/?nick="+nick+"&channels="+channel_private+"%20"+channel_private_pass+"&uio=MTE9NTE3a","_blank","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=647, height=400");';
innerHTML += '}';
innerHTML += '</script>';
innerHTML += '<center>'+language["description"]+'<br><br>';
innerHTML += ''+language["nickName"]+'<br><input type="text" size="12" id="nickform"><br><br>';
innerHTML += ''+language["chanName"]+'<br><input value="'+channel_private+'" type="text" size="12" id="chanform"><br>';
innerHTML += ''+language["chanPass"]+'<br><input value="'+channel_private_pass+'" type="text" size="12" id="passform"></center><br>';
innerHTML += '<center><a class="button" onclick="openIrc()">'+language["open"]+'</a></center><br>';
innerHTML += '</div><div class="footer"></div></div>';

box.innerHTML = innerHTML;
element.parentNode.insertBefore(box, element.nextSibling);

}

// ------ Wich wiew ------------------------------------------------------------------------------------------------------

function main() {
	
	var	view = document.getElementsByTagName("body")[0].id;
	switch (view) {


	case "embassy":
		boxTo('embassyMenu');
		break;

	case "diplomacyAdvisorAlly":
		boxTo('viewDiplomacyImperium');
		break;
	}
}

main();