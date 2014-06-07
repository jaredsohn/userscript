// ==UserScript==
// @name           Pardus Chat Utility
// @version        1.5
// @namespace      coawyn@gmail.com
// @description    Adds features to chat such as ignore, important, and custom smilies.
// @homepage       http://unique.hobby-site.com/
// @include        http://chat.pardus.at/chattext.php*
// ==/UserScript==
// Clickable hyperlinks thanks to Ratchetfreak!
var hijack = function(){

	var namesImportant = new Array();
	namesImportant.push("Arkoan");

	var namesToIgnore = new Array();
	var removeLinesOfThoseIgnored = false;
//	namesToIgnore.push("Persons Name");

	var idToRename = new Array();
	var nameRenamed = new Array();
	idToRename.push(10101);
	nameRenamed.push("Binary Dude");


	var chatWnd = document.getElementById("ChatWnd");
	var chatDivCount = 1;

	var originalDecodeString = window.decodeString;
	window.decodeString = function(str){
		str = str.replace(/(?!")(\bhttp:\/\/[\w%&=?#.+/;]*\b)(?=\s)/g, '<a href="$1" target="_blank">$1</a>');
		str = str.replace(/:facepalm:/g, "<img src='http://unique.hobby-site.com/Facepalm.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:gripe:/g, "<img src='http://unique.hobby-site.com/Gripe.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:rant:/g, "<img src='http://unique.hobby-site.com/Rant.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:wall:/g, "<img src='http://unique.hobby-site.com/Wall.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:welt:/g, "<img src='http://unique.hobby-site.com/Welt.jpg' style='vertical-align:middle' alt=''>");
		str = str.replace(/\bFHA\b/g, "<img src='http://unique.hobby-site.com/FHA-Smiley.png' style='vertical-align:middle' alt='FHA'>");
		str = str.replace(/\bIG\b/g, "<img src='http://unique.hobby-site.com/IG-Smiley.png' style='vertical-align:middle' alt='IG'>");
		str = str.replace(/\bTCP\b/g, "<img src='http://unique.hobby-site.com/TCP-Smiley.png' style='vertical-align:middle' alt='TCP'>");
		str = str.replace(/(FSCv\d\.\d\|([\w ]*)(\|\d*)+)/,'<a href="http://pardus.rukh.de/pshipcalc.htm?$1" target="_blank">FSC $2</a>');
		return originalDecodeString(str);
	};



	Array.prototype.indexOf = function(obj) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == obj) return i;
		}
		return -1;
	}



	function processChat() {
		var chatDivs = chatWnd.childNodes;
		var chatDivsToDelete = new Array();
		for (; chatDivCount < chatDivs.length; chatDivCount = chatDivCount + 2) {
			var lineDiv = chatDivs[chatDivCount];
			var start = lineDiv.innerHTML.indexOf("profile.php?id=");
			var crop = lineDiv.innerHTML.substring(start+15);
			var profileId = crop.substring(0,crop.indexOf(" ")-1);
			start = crop.indexOf("javascript:sendmsg('");
			crop = crop.substring(start+20);
			var name = crop.substring(0,crop.indexOf("')"));
			if (namesToIgnore.indexOf(name) > -1) {
				if (removeLinesOfThoseIgnored) {
					chatDivsToDelete.push(lineDiv);
				} else {
					lineDiv.getElementsByTagName("span")[1].style.color = "#151040";
				}
			} else {
				if (namesImportant.indexOf(name) > -1) {
					lineDiv.getElementsByTagName("span")[1].style.backgroundColor = "#000000";
				}
				if (idToRename.indexOf(profileId) > -1) {
					lineDiv.getElementsByTagName("b")[0].innerHTML = nameRenamed[idToRename.indexOf(profileId)] + "<small> (" + lineDiv.getElementsByTagName("b")[0].innerHTML + ")</small>";
				}
			}
		}
		for(var i = 0; i < chatDivsToDelete.length; i++) {
			chat.removeChild(chatDivsToDelete[i]);
		}
	}



	processChat();

	var originalAjaxCallback = window.ajaxCallback;
	window.ajaxCallback = function(result, errors) {
		originalAjaxCallback(result, errors);
		processChat();
	}

};
var script = document.createElement("script");
script.textContent = "(" + hijack.toString() + ")()";
document.body.appendChild(script);