// ==UserScript==
// @name			Pardus Teamchat
// @version			v2
// @namespace		marnick.leau@skynet.be
// @description		Allows you to integrate extra chats under the Chat tab.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://*.pardus.at/chat.php*
// @include			http*://*.pardus.at/options.php
// @grant			GM_setValue
// @grant			GM_getValue
// @grant           GM_deleteValue
// ==/UserScript==

// <!-- User variables -->

// <!-- End of user variables -->

// <!-- Standard variables -->

var scriptname = "Pardus Teamchat";
var scriptversion = 1;
var imghost = "http://s1135.photobucket.com/albums/m626/TheRealFaziri/";
var datahost = "http://dl.dropbox.com/u/3357590/GM%20Scripts/";
var imgpath = scriptname.replace(/Pardus /g,"Pardus/").replace(/ /g,"%20") + "/";
var datapath = scriptname.replace(/ /g,"_").toLowerCase() + "/";

// <!-- End of standard variables -->

var invalid = "Possibly invalid input or cancellation!";
var emptyRoom = "title (none);URL (none)";

if (location.href.indexOf(".pardus.at/options.php") !== -1) {

	// name to be displayed on the panel, followed by " Preferences" automatically
	// will also be assigned as the ID attribute of the panel
	var simpleName = "Teamchat";
	
	// HTML to go into the panel, repeat the linebreak as often as needed to avoid a mess
	function writeHTML() {
		panel.innerHTML = "<table><tbody><tr><td>"
		+ "Go to one of the sites below to make a new chatroom if you don't have one yet. Only these hosts are supported and they are all free.<br>"
		+ "If you have a chatroom from one of these hosts, you will need to copy its URL (the \"link\" to it). To check whether you got the correct thing, compare it to the templates or ask a savvy friend to help you. That same savvy friend may be able to find other chats compatible with Teamchat so be sure to ask him/her!"
		+ "</td></tr><tr><td>"
		+ "<a target='blank' href='http://anologue.com/'>Anologue</a> (sorta laggy but usable nonetheless):<br>"
		+ "<font color='yellow'>http://*anologue.com/*</font>"
		+ "</td></tr><tr><td>"
		+ "<a target='blank' href='http://www.forumotion.com/en/create-forum/make-free-message-board-phpbb2.htm'>Forumotion</a> (accounts, chat integrated but may be disabled in settings):<br>"
		+ "<font color='yellow'>http://*.foru*motion.com/chatbox/*</font>"
		+ "<br>(there is a spin-off, forum<b>m</b>otion, which works fine too)"
		+ "</td></tr><tr><td>"
		+ "<a target='blank' href='http://tinychat.com/'>TinyChat</a> (mic & cam supported):<br>"
		+ "<font color='yellow'>http://*tinychat.com/*</font>"
		+ "</td></tr><tr><td>"
		+ "* = anything including nothing</td></tr>"
		+ "<tr><td valign='top' align='right'><input type='button' style='width: 120px;' value='Create' onclick='newRoom();'></td></tr>"
		+ "<tr><td valign='top' align='right'><input type='button' style='width: 120px;' value='Edit' onclick='edit();'></td></tr>"
		+ "<tr><td valign='top' align='left'>Note: maximum 2 lines of up to 12 characters per line can be used for the title! Spaces will serve as linebreakers where necessary.</td></tr>"
		+ "<tr><td valign='top' align='right'><input type='button' style='width: 120px;' value='Switch places' onclick='reorder();'></td></tr>"
		+ "<tr><td valign='top' align='right'><input type='button' style='width: 120px;' value='Delete' onclick='erase();'></td></tr>"
		+ "<tr><td valign='top' align='left'>If you want to cancel any of the above operations, you can always do so by clicking \"Cancel\" when possible or by entering \"cancel\" when asked for input.<br>Using quote marks ( \" ) or abbrevation marks ( ' ) when asked for input is neither needed nor allowed.</tbody></table>";
	}
	
	// optional function to build your HTML via JS. The "return;" only serves to make it blank
	function buildHTML() {
		return;
	}
	
	// variables to be used in the panel
	unsafeWindow.yourVariable = "";
	
	// function that may be called by elements in the panel, copy as often as needed to add more (you must change the name, of course). The "return;" only serves to make it blank
	// the function is defined, called and executed locally (on the page itself) but somehow also has access to the GM_value commands of the script that makes the unsafeWindow call
	// try to give these functions names associated to your script to prevent interference with other elements calling a different function with the same name
	unsafeWindow.newRoom = function() {
		setTimeout(function() {
			var title = prompt("Which text do you want to have displayed on the tab?\nThe following symbols are not allowed for technical reasons:\n;\n\"\n'\nYou can apply HTML formatting.","e.g. \"Command Post\"");
			if (title.match(/;|'|"|cancel/) || title === false || title.replace("<br>"," ").length > 25) {
				alert(invalid);
				return;
			}
			
			var url = prompt("What's the URL of the chatroom you want to use for \"" + title + "\"?","e.g. \"http://anologue.com/CPChat\"");
			if (url.match(/'|"|cancel/) || url === false) {
				alert(invalid);
				return;
			}
			
				for (var i = 0;i < 10;i++) {
				if (GM_getValue("chat" + i,emptyRoom) === emptyRoom) {
					GM_setValue("chat" + i,title + ";" + url);
					alert("Saved room " + (i + 1) + "!");
					break;
				}
			}
		},1);
	}
	
	unsafeWindow.edit = function() {
		setTimeout(function() {
			var text = "This is a list of all your chatrooms. Remember the number of the one you want to edit.";
			var room = "";
			for (var i = 0;i < 10;i++) {
				room = GM_getValue("chat" + i,emptyRoom);
				if (room !== emptyRoom) {
					text += "\nRoom " + (i + 1) + ":\t" + room.split(';')[0] + " @ " + room.split(';')[1];
				}
			}
			alert(text);
			
			var number = prompt("Which room do you want to edit?","e.g. \"2\"");
			if (number.match(/[^\d+]|cancel/) || number === false) {
				alert(invalid);
				return;
			}
			else {
				number = parseInt(number) - 1;
			}
				
			var title = prompt("Which text do you want to have displayed on the tab instead of \"" + GM_getValue("chat" + number).split(';')[0] + "\"?\nThe following symbols are not allowed for technical reasons:\n;\n\"\n'\nYou can apply HTML formatting.","e.g. \"Command Post\"");
		if (title.match(/;|'|"|cancel/) || title === false || title.replace("<br>"," ").length > 25) {
					alert(invalid);
				return;
		}
				
			var url = prompt("What's the URL of the chatroom you want to use for \"" + title + "\"?","e.g. \"http://anologue.com/CPChat\"");
			if (url.match(/'|"|cancel/) || url === false) {
				alert(invalid);
				return;
			}
			
			GM_setValue("chat" + number,title + ";" + url);
			alert("Edited and saved room " + (number + 1) + "!");
		},1);
	}
	
	unsafeWindow.reorder = function() {
		setTimeout(function() {
			var text = "This is a list of all your chatrooms. Remember the numbers of the two you want to switch around.";
			var room = "";
			for (var i = 0;i < 10;i++) {
				room = GM_getValue("chat" + i,emptyRoom);
				if (room !== emptyRoom) {
					text += "\nRoom " + (i + 1) + ":\t" + room.split(';')[0] + " @ " + room.split(';')[1];
				}
			}
			alert(text);
			
			var numbers = prompt("What are the numbers of the rooms you want to switch?","e.g. \"2,3\"");
			if (numbers.match(/\d+\,\d+/) === null || numbers.match(/[^\d+,]/) || numbers === false) {
				alert(invalid);
				return;
			}
			else {
				numbers = numbers.split(',');
				
				var num0 = (parseInt(numbers[0]) - 1);
				var num1 = (parseInt(numbers[1]) - 1);
				var room0 = GM_getValue("chat" + num0);
				var room1 = GM_getValue("chat" + num1);
				
				GM_setValue("chat" + num0,room1);
				GM_setValue("chat" + num1,room0);
				
				alert("Switched rooms " + (num0 + 1) + " and " + (num1 + 1) + "!");
			}
		},1);
	}
	
	unsafeWindow.erase = function() {
	setTimeout(function() {
			var text = "This is a list of all your chatrooms. Remember the number of the one you want to delete.";
			var room = "";
			for (var i = 0;i < 10;i++) {
				room = GM_getValue("chat" + i,emptyRoom);
				if (room !== emptyRoom) {
				text += "\nRoom " + (i + 1) + ":\t" + room.split(';')[0] + " @ " + room.split(';')[1];
				}
			}
			alert(text);
			
			var number = prompt("What's the number of the room you want to delete?","e.g. \"3\"");
			if (number.match(/[^\d+]/)) {
				alert(invalid);
				return;
			}
			else {
				GM_deleteValue("chat" + (parseInt(number) - 1));
				alert("deleted room " + number + "!");
			}
		},1);
	}
	
	/*	var count = 1;
	for (var i = 0;i < 10;i++) {
		while (GM_getValue("chat" + i,emptyRoom) === emptyRoom) {
			GM_setValue("chat" + i,GM_getValue("chat" + (i + count),emptyRoom));
			GM_deleteValue("chat" + (i + count));
			count++;
		}	// endless loop <_<
		count = 1;
	}	*/
	
	// do not touch unless horrendously badly needed, uniformity is a must
	
	if (document.getElementById('empty') !== null) {
		var container = document.getElementById('empty');
		var title = container.getElementsByTagName('th')[0];
		var panel = container.getElementsByTagName('td')[0];
		
		container.removeAttribute('id');
	}
	else {
		var emptyTitle = "Empty Slot";
		var emptyPanel = "Other scripts will add their control panels here and on next lines.";
		
		var parent = document.getElementsByTagName('tbody')[3];
		parent.innerHTML +=   "<br><br><tr><td id='container' width='450' valign='top'><table width='100%' cellpadding='3' align='center'><tbody><tr><th id='title'></th></tr><tr><td id='panel'valign='top' align='left'></td></tr></tbody></table></td>"
				+ "<td width='40'>"
				+ "<td id='empty' width='450' valign='top'><table width='100%' cellpadding='3' align='center'><tbody><tr><th>" + emptyTitle + "</th></tr><tr><td valign='top' align='left'>" + emptyPanel + "</td></tr></tbody></table></td></tr>";
		
		var container = document.getElementById('container');
		var title = document.getElementById('title');
		var panel = document.getElementById('panel');
		
		container.firstChild.setAttribute('style',parent.getElementsByTagName('table')[0].getAttribute('style'));
		document.getElementById('empty').getElementsByTagName('tbody')[0].setAttribute('style',parent.getElementsByTagName('table')[0].getAttribute('style'));
		
		container.removeAttribute('id');
		title.removeAttribute('id');
		panel.removeAttribute('id');
	}
	
	title.innerHTML = simpleName + " Preferences";
	container.setAttribute('id',simpleName);
	writeHTML();
	buildHTML();
}

if (location.href.indexOf(".pardus.at/chat.php") !== -1) {
	function swapRoom(num) { // open a custom chatroom
		GM_setValue('room',num);
		
		if (document.getElementById('chatmsg_color') !== null) {
			frame.parentNode.removeChild(document.getElementById('chatmsg_color').parentNode.previousSibling.previousSibling);
			frame.parentNode.removeChild(document.getElementById('chatmsg_color').parentNode);
			frame.setAttribute('height',parseInt(frame.getAttribute('height')) + 58); // glitchy
			
			buttons[active].style.background = buttons[inactive].style.background;
			buttons[active].setAttribute('onmouseover',buttons[inactive].getAttribute('onmouseover'));
			buttons[active].setAttribute('onmouseout',buttons[inactive].getAttribute('onmouseout'));
		}
		
		buttons = document.getElementsByClassName('tabcontent');
		buttons[(buttons.length - data.length) + num].style.background = buttons[inactive].style.background.replace("tab.png","tabactive.png");
		for (i = 0;i < data.length;i++) {
			if (i !== num) {
				buttons[i + (buttons.length - data.length)].style.background = buttons[inactive].style.background;
			}
		}
		buttons[(buttons.length - data.length) + num].removeAttribute('onmouseout');
		
		frame.setAttribute('src',data[num][1]);
		document.getElementsByTagName('h1')[0].innerHTML = buttons[(buttons.length - data.length) + num].innerHTML;
	}
	unsafeWindow.swapRoom = function(num) {
		setTimeout(function() {
			swapRoom(num);
		},1);
	}
	
	function resetRoom() {
		GM_deleteValue('room');
	}
	unsafeWindow.resetRoom = function() {
		setTimeout(function() {
			resetRoom();
		},1);
	}
	
	unsafeWindow.tabFunc = function(name) {
		setTimeout(function() {
			resetRoom();
			document.location.href = "/chat.php?channel=" + name;
		},1);
	}
	
	function translate(inner) {
		var channels = ["general","rpg","trade","help","ally","mod"];
		var matchers = ["General<br>Chat","IC<br>Chat","Trading<br>Chat","Help<br>Chat","Alliance<br>Chat","Mod<br>Chat"];
		for (var ii = 0;ii < channels.length;ii++) {
			if (inner.indexOf(matchers[ii]) !== -1) {
				return channels[ii];
			}
		}
	}
	
	var frame = document.getElementById('ChatFrame');
	var buttons = document.getElementsByClassName('tabcontent');
	var text = "";
	var counter = 0;
	var data = [];
	
	for (var i = 0;i < 10;i++) { // create chatroom data
		text = GM_getValue("chat" + i,emptyRoom);
		if (text !== emptyRoom) {
			data[i - counter] = text.split(';');
		}
		else {
			counter++;
		}
	}
	
	for (i = 0;i < buttons.length;i++) { // determine the active tab of the normal 4 and add tab memory eraser
		if (buttons[i].getAttribute('onmousedown') === null) {
			var active = i;
		}
		buttons[i].setAttribute('onmousedown',"tabFunc(\"" + translate(buttons[i].innerHTML) + "\");");
	}
	
	if (active !== 0) { // make the normal 4 open themselves when they are clicked and determine an inactive tab
		var button = buttons[0];
		var inactive = active - 1;
	}
	else {
		var button = buttons[1];
		var inactive = 1;
	}
	
	for (i = 0;i < data.length;i++) { // use the chatroom data to add the new tabs
		var bt = button.cloneNode(true);
		bt.innerHTML = data[i][0];
		bt.setAttribute('onmousedown','swapRoom(' + i + ');');
		bt.removeAttribute('onclick');
		buttons[0].parentNode.appendChild(bt);
		buttons[0].parentNode.parentNode.parentNode.setAttribute('width',parseInt(buttons[0].parentNode.parentNode.parentNode.getAttribute('width')) + 96);
	}
	counter = GM_getValue('room');
	if (counter !== undefined && data.length !== 0 && counter < data.length) { // tab memory
		swapRoom(counter);
	}
}