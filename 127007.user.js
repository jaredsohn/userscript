// ==UserScript==
// @name          ReplyGirlBlocker
// @namespace     D-
// @description	  Die reply girls die !
// @match       http://www.youtube.com/watch*
// ==/UserScript==
// Maker : DarkVcious
(function() {
var storage = 'none';
try {
		GM_setValue('testkey', 'testvalue');
		if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
} catch(x) {}
if (storage=='none') { 
if(typeof(localStorage) == 'undefined') storage='cookies'; 
else storage = 'localstorage';
}

function addIgnore(value) {
	if(replyGirls != "") { replyGirls += "|"; }
	replyGirls += "("+value+")";
	switch (storage) {
		case 'greasemonkey':
			GM_setValue("replyGirls", replyGirls);
			break;

		case 'localstorage':
			localStorage.setItem('replyGirls', replyGirls);
			break;
		case 'cookies':
			var date = new Date();
			date.setTime(date.getTime()+(31536000000));
			var expires = "; expires="+date.toGMTString();
			document.cookie = "replyGirls"+"="+replyGirls+expires+"; path=/";
			break;
	}
	deleteVideos();
	deleteMoreVideos();
};

function getReplyGirls() {
	switch (storage) {
		case 'greasemonkey':
			return GM_getValue("replyGirls", "");
			break;

		case 'localstorage':
			var val = localStorage.getItem('replyGirls');
			if(val) return val;
			else return "";
			break;
		case 'cookies':
			var nameEQ = "replyGirls" + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return "";
			break;
	}
};

function deleteList() {
	replyGirls = "";
	switch(storage) {
		case 'greasemonkey':
			GM_deleteValue("replyGirls");
			break;
		case 'localstorage':
			localStorage.removeItem('replyGirls');
			break;
		case 'cookies':
			var date = new Date();
			date.setTime(date.getTime()-86400000);
			var expires = "; expires="+date.toGMTString();
			document.cookie = "replyGirls"+"="+expires+"; path=/";
			break;
	}
};

function addMenu(event) {
	var related = event.target.parentNode.parentNode.parentNode;
	var ytname2 = related.getElementsByTagName("span")[10].innerHTML;
	setTimeout(function() {
	document.getElementById("shared-addto-menu").style.height = "204px";
	var menu = document.getElementById("addto-list-panel");
	var menubutton = document.createElement("span");
	menubutton.setAttribute('class','yt-uix-button-menu-item yt-uix-tooltip create-playlist');
	var menuButtonText = document.createTextNode("Block "+ytname2);
	menubutton.appendChild(menuButtonText);
	menu.appendChild(menubutton);
	menubutton.addEventListener("click", function() { if(confirm("Block "+ytname2+" ?")) addIgnore(ytname2); }, true);
	}, 1000);
}

function deleteVideos() {
	var related = document.getElementById("watch-related").getElementsByTagName("li")[0];
	var ytname = null;
	var expression = new RegExp(replyGirls,"i");
	var button;
	var i;
		for(i=0;related != null;i++){
			related = document.getElementById("watch-related").getElementsByTagName("li")[i];
			ytname = related.getElementsByTagName("span")[10].innerHTML;
			button = document.getElementById("watch-related").getElementsByTagName("li")[i].getElementsByTagName("button")[0];
			if(button != null) {
				button.addEventListener('click', addMenu, false);
			}
			if(expression.test(ytname) && replyGirls != "") {
				document.getElementById("watch-related").removeChild(related);
				i--;
			}
		}
};

function deleteMoreVideos() {
	var related = document.getElementById("watch-more-related").getElementsByTagName("li")[0];
	var ytname = null;
	var expression = new RegExp(replyGirls,"i");
	var i;
		for(i=0;related != null;i++){
			related = document.getElementById("watch-more-related").getElementsByTagName("li")[i];
			ytname = related.getElementsByTagName("span")[10].innerHTML;
			button = document.getElementById("watch-more-related").getElementsByTagName("li")[i].getElementsByTagName("button")[0];
			if(button != null) {
				button.addEventListener('click', addMenu, false);
			}
			if(expression.test(ytname) && replyGirls != "") {
				document.getElementById("watch-more-related").removeChild(related);
				i--;
			}
		}
};

var replyGirls = getReplyGirls();

var button = document.createElement("a");
var buttonText = document.createTextNode("[ReplyGirls]");
button.setAttribute("id",'ListReplyGirls');
button.appendChild(buttonText);
document.getElementById("masthead-nav").appendChild(button);
document.getElementById('ListReplyGirls').addEventListener('click', function() {
	replyGirls = getReplyGirls();
	if (replyGirls == "") alert("The list is empty");
	else 
	{
		alert(replyGirls);
		deleteVideos();
		deleteMoreVideos();
	}
}, true);

button = document.createElement("a");
buttonText = document.createTextNode("[+]");
button.setAttribute("id",'AddReplyGirl');
button.appendChild(buttonText);
document.getElementById("masthead-nav").appendChild(button);
document.getElementById('AddReplyGirl').addEventListener('click', function() {
	replyGirls = getReplyGirls();
	var value = prompt('Input a Youtube User name to ignore :','TheReplyGirl');
	if (value != null) addIgnore(value);
}, true);

button = document.createElement("a");
buttonText = document.createTextNode("[X]");
button.setAttribute("id",'DelReplyGirls');
button.appendChild(buttonText);
document.getElementById("masthead-nav").appendChild(button);
document.getElementById('DelReplyGirls').addEventListener('click', function() {
	replyGirls = getReplyGirls();
	if(confirm('Do you want to delete your ignore list ?')) deleteList();
}, true);

document.getElementById('watch-more-related-button').addEventListener('click', function() {
	setTimeout(function() { deleteMoreVideos(); },100);
	setTimeout(function() { deleteMoreVideos(); },500);
	setTimeout(function() { deleteMoreVideos(); },1000);
	setTimeout(function() { deleteMoreVideos(); },5000);
}, true);

deleteVideos();
setTimeout(function() { deleteVideos(); },5000);
})();
