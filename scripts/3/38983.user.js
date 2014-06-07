// ==UserScript==
// @version        1.1.4
// @name           Syrnia Minor Tweaks
// @namespace      Syrnia
// @author         Ciaran
// @description    Minor Tweaks for Syrnia
// @include        http://www.syrnia.com/*
// @include        http://www.dw-hq.com/*
// ==/UserScript==
 
// Thanks to NebuneX for much of his code

var sVer = '1.1.4';
var sName = 'Syrnia Minor Tweaks';
var sId = 38983;
 
var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];
 
var myOptions = [
/*['Inventory', 'Inventory enhancements'],
['HPCombat', 'HP tooltip (combat)'],*/
['AutoUpdate','Automatically checks when the script is updated, and (via popup) prompts the player to update'],
['TravelItems', 'Travel items summary'],
['TotalInventory', 'Summarize total numbers<BR> in the inventory'],
['PlyrListChanges', 'Add a few features to the player list'],
['ForumMultiPopup', 'Allows the forum/clan pages to be opened multiple times'],
['ForumMessages', 'Add message and clan links to the forum pages'],
['MoreStats', 'Enhance stats page with bars and percentages'],
['Quest', 'Quest links to DW-HQ guide'],
['VoteGifts', 'Mark voting pages that (may) give green gifts (in green and blue)'],
['MassMessages', 'Mass message of clan members from clan member page'],
['DWFactors', 'Compute the level and XP factors on clan score (DWHQ)'],
['DWMessages', 'Message players directly from on DWHQ'],
['TravelMap', 'Travel map tooltip']
];

var chatOptions = [
['ClickWhisper', 'Click on name in chat to whisper'],
['ClickChangeChat', 'Click on chat number to change channel'],
['AddChatButtons', 'Buttons to insert symbols into chat'],
['NoSendButton', 'Remove the send button'],
['MoveLinks', 'Move the Manual and Rules links'],
['MoveMoreLinks', '<I>&nbsp;&nbsp;&nbsp;&nbsp;Move all links</I>'],
['LargeInput', 'Make the chat text input area larger']
];

var unicodeSymbols = [ // for adding symbols to chat
'\u263A', // Smiley face 1
'\u263B', // Smiley face 2
'\u266A', // Musical 1
'\u266B', // Musical 2
'\u2660', // Spade
'\u2663', // Club
'\u2665', // Heart
'\u2666' // Diamond
];
 
var Quests = [
['Damsel in distress or just clueless?', '16'],
['Damsel in more distress or really clueless?', '17'],
['Earning the family respect', '8'],
['Frogs and Monkeys', '14'],
['Got to love locks', '10'],
['Huge problems', '2'],
['Lonely bard', '15'],
['Monster training', '1'],
['Protect the ancient woods', '12'],
['Sick fisher or sick of fishing?', '13'],
['Slaying the monster', '3'],
['The abandoned Shopping list', '11'],
['The kidnapped lunchbox', '9'],
['Thieving guild trail', '5'],
['Valera Knight', '7'],
['Witch Bluebell 2', '6'],
['Witch Bluebell', '4']
];
 
var imageMes = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAKAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIRAAAgICAQQDAAAAAAAAAAAAAQIDBAURIQAGEjETFJH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAGBEAAgMAAAAAAAAAAAAAAAAAAAECERL/2gAMAwEAAhEDEQA/ANxRxtyx9u4zZPICxetIkaZaauKxWeRFHDgfFpRvQLKfQcHS2O0IJ6Ry9OxdsXDXvBVknkZyA0ELlV8iSFBY6BJIHsk7JZP21gZ5pJp8JjJJZGLO71IyzMeSSSOSemUMfSxsJhx1OvViZvIpBEqKW4G9Ae+B+dPNPNgQa1R//9k%3D'
var protoMsg = "&nbsp;<img src='" + imageMes + "' style='margin: 0px; display: inline; vertical-align: middle;' title='Send message' border=0>";

var imageWhi = 'data:image/jpeg;base64,' +
		'/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwg' +
		'JC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIy' +
		'MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAwDASIAAhEBAxEB/8QA' +
		'HwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIh' +
		'MUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVW' +
		'V1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXG' +
		'x8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQF' +
		'BgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAV' +
		'YnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOE' +
		'hYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq' +
		'8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0OOPTpb29XxLfazZ34uLl/MN/eWlqYFd2i2OjrCSIArEKd2Fc' +
		'tyHI3PCfn/Zb/P27+z/tf/Ev+3+b53k+VHu3eb+9/wBb52N/OMY+XbUfiiCG51jwkk8UcqDWC4V1DAMt' +
		'pcsp57hgCD2IBrpKAP/Z';
var protoWhi = "&nbsp;<img src='" + imageWhi + "' style='margin: 0px; display: inline; vertical-align: middle;' title='Whisper player' border=0>";

 
var XPs = [0, 1, 12, 48, 130, 283, 537, 922, 1472, 2225, 3219, 4497, 6101, 8079, 10477, 13346, 16736, 20701, 25297, 30580, 36608, 43440, 51140, 59769, 69392, 80074, 91884, 104890, 119161, 134769, 151787, 170288, 190348, 212043, 235451, 260651, 287722, 316746, 347806, 380984, 416365, 454036, 494082, 536592, 581655, 629361, 679800, 733066, 789250, 848448, 910754, 976264, 1045077, 1117288, 1192999, 1272308, 1355317, 1442127, 1532842, 1627565, 1726400, 1829454, 1936832, 2048643, 2164993, 2285993, 2411752, 2542381, 2677992, 2818698, 2964611, 3115845, 3272517, 3434741, 3602635, 3776316, 3955902, 4141512, 4333266, 4531285, 4735691, 4946606, 5164152, 5388453, 5619635, 5857822, 6103141, 6355719, 6615682, 6883160, 7158281, 7441176, 7731975, 8030809, 8337811, 8653112, 8976848, 9309151, 9650156, 10000000, 10358819, 10726750, 11103929, 11490497, 11886591, 12292352, 12707921, 13133437, 13569044, 14014884, 14471099, 14937834, 15415233, 15903442, 16402605, 16912871, 17434385, 17967296, 18511752, 19067903, 19635897, 20215886, 20808019, 21412450, 22029330, 22658812, 23301050, 23956198, 24624410, 25305843, 26000651, 26708992, 27431023, 28166902, 28916787, 29680837, 30459213, 31252073, 32059580, 32881895, 33719179, 34571595, 35439308, 36322479, 37221275, 38135859, 39066398, 40013058, 40976005, 41955407, 42951432];
 
var Foods = [
['Beet','1'],
['Radishes','1'],//
['Elven Cocktail','1'],
['Keg of Rum','1'],
['Cooked Shrimps','2'],//
['Carrots','2'],//
['Cooked Frog','2'], //
['Cabbage','3'], //
['Bread','3'],
['Cooked Piranha','3'],//
['Onion','4'],//
['Cooked Sardine','4'],//
['Tomato','5'],
['Halloween pumpkin','5'],//
['Cooked Catfish','5'],
['Cooked Herring','5'],//
['Red Easter Egg','5'],//
['Corn','6'],//
['Cooked Mackerel','6'],//
['Cooked Queen spider meat','6'],//
['Strawberry','7'],//
['Cooked Cod','7'],//
['Cooked Trouts','7'],//
['Green pepper','8'],//
['Cooked Pike','8'],//
['Spinach','9'],//
['Cooked Salmon','9'],//
['Green easter egg','9'], //
['Eggplant','10'],//
['Cooked Tuna','10'],//
['Cooked Giant catfish','10'], //
['Cucumber','11'],//
['Cooked Lobster','12'], //
['Pumpkin','12'],//
['Cooked Bass','13'],//
['Blue easter egg','13'],//
['Apple','13'],
['Cooked Swordfish','14'],//
['Pear','14'],
['Broccoli','15'],
['Cooked Saurus meat', '16'],//
['Yellow easter egg', '17'],//
['Pink easter egg','20'],//
['Black Easter Egg','20'],//
['White Easter Egg','20'],//
['Cooked Shark','20'],//
['Orange easter egg','23'],//
['Purple easter egg','26'] //
];

var Cookables = [
['Frog','2'],
['Shrimps','2'],
['Grain','3'],
['Piranha','3'],
['Sardine','4'],
['Catfish','5'],
['Herring','5'],
['Mackerel','6'],
['Queen spider meat','6'],
['Cod','7'],
['Trouts','7'],
['Pike','8'],
['Salmon','9'],
['Giant catfish','10'],
['Tuna','10'],
['Lobster','12'],
['Bass','13'],
['Swordfish','14'],
['Saurus meat','16'],
['Shark','20']
]; 
 
function start() {
	if(location=='http://www.syrnia.com/game.php') {
		//Functions to insert text into the chat text box
		//Create a javascript element and attach it to the body of the website
		var head = document.getElementsByTagName('head')[0];
		var body = document.getElementsByTagName('body')[0];
		var script_chat = document.createElement('script');
		script_chat.innerHTML = "\
		function chatReplaceText(text) {\
			var chatMsg = document.getElementById(\'chatMessage\');\
			chatMsg.value = text;\
			chatMsg.focus();\
		}\
		\
		function chatAppendText(text) {\
			var chatMsg = document.getElementById(\'chatMessage\');\
			chatMsg.value = chatMsg.value + text;\
			chatMsg.focus();\
		}\
		\
		function changeChatChannel(ch) {\
			var chan = document.getElementById(\'chatChannel\');\
			chan.value = ch;\
			document.getElementById(\'chatMessage\').focus();\
		}\
		";
		body.appendChild(script_chat);
		body.removeChild(script_chat);

		if (GM_getValue('AutoUpdate',true)) {
			CheckForUpdates(sName,sVer,sId);
		}
		if (GM_getValue('TravelItems',true)) {
			TravelItems();
		}
		if (GM_getValue('TotalInventory',true)) {
			TotalInventory();
		}
		if (GM_getValue('TravelMap',true)) {
			TravelMap();
		}
		if (GM_getValue('ForumMultiPopup',true)) {
      		ForumMultiPopup();
		}
		if (GM_getValue('PlyrListChanges',true)) {
			PlyrListChanges();
		}
		if (GM_getValue('MoreStats',true)) {
			ChangeStatsLinks();
		}

		if (GM_getValue('ClickWhisper', true) || GM_getValue('ClickChangeChat', true)){
			clickChat();
		}
		if (GM_getValue('AddChatButtons', true)){
			addChatButtons();
		}
		if (GM_getValue('NoSendButton',true)) {
			removeSendButton();
		}
		if (GM_getValue('MoveLinks',true)) {
			moveLinks();
		}		
		if (GM_getValue('LargeInput',true)) {
			increaseChatInputSize();
		}
	} else if (location.href.indexOf('action=viewtopic')>-1) { //viewing forum :)
		if (GM_getValue('ForumMessages',true)) {
			ForumMessages();
		}
	} else if (location == 'http://www.syrnia.com/theGame/includes2/clan.php?p=members'){
		if (GM_getValue('MassMessages',true)) {
	    		MassMessages();
		}
	} else if (location == 'http://www.syrnia.com/theGame/includes2/support.php?action=vote') {
		if (GM_getValue('VoteGifts',true)) {
      		VoteGifts();
		}
	} else if (location == 'http://www.syrnia.com/theGame/includes2/quests.php') {
		if (GM_getValue('Quest',true)) {
		      Quest();
		}
	} else if (location == 'http://www.syrnia.com/theGame/includes2/stats.php?showstats=1' || location == 'http://www.syrnia.com/theGame/includes2/stats.php') {
		if (GM_getValue('MoreStats',true)) {
		      MoreStats();
		}
	} else if (location.href.indexOf('http://www.dw-hq.com/') > -1) {
		if (GM_getValue('DWMessages',true)) {
		      DWMessages();
		}
	} else if (location.href.indexOf('http://www.dw-hq.com/clanstats.php') > -1 && location.href.indexOf('clan=') > -1) {
	      if (GM_getValue('DWFactors',true)) {
			DWFactors();
		}
	} else if (location=='http://www.syrnia.com/theGame/includes2/options.php') {
		Options();
	} else if (location=='http://www.syrnia.com/theGame/includes2/options.php?hideMenu=1&p=chat' | location=='http://www.syrnia.com/theGame/includes2/options.php?p=chat') {
		chOptions();
	}

	//Mass message stuff. part closes the message window to save memory.
	if (location=='http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1') {
		if(window.opener.location=='http://www.syrnia.com/theGame/includes2/clan.php?p=members') {
			window.close();
		}
	}
}
if (document.body) start();
else window.addEventListener('DOMContentLoaded', start, false);



function clickChat() {
	try{
		chatBox = document.getElementById('chatContent');
		if (GM_getValue('ClickWhisper', true)) {
			chatBox.addEventListener('DOMNodeInserted',clickWhisper,false);
		}

		if (GM_getValue('ClickChangeChat', true)) {
			chatBox.addEventListener('DOMNodeInserted',clickChangeChat,false);
		}
	}catch(e){
		setTimeout('clickChat();',5000);
	}

	function clickWhisper() {
		if(lastChatLine = chatBox.lastChild.previousSibling) {
			chtMsg = document.getElementById('chatMessage');
			plyrEl = lastChatLine.getElementsByTagName('STRONG');
			if(plyrEl.length > 0) {
				plyr = plyrEl[0].firstChild;
				if (plyr.tagName == 'EM') {
					plyr = plyr.nextSibling;
				}
				textInsert = 'chatReplaceText(\''+plyr.textContent+'@\');return false;';
				plyrEl[0].setAttribute('onclick',textInsert);
			}
		}
	}

	function clickChangeChat() {
		if(lastChatLine = chatBox.lastChild.previousSibling) {
			if (chT = lastChatLine.firstChild) {
				ch = chT.textContent[1];
				if((ch=='1'|ch=='2'|ch=='3'|ch=='4'|ch=='5'|ch=='6')&chT.tagName != 'SPAN') {
					chStr = chT.textContent.substring(0,3);
					chT.textContent = chT.textContent.substr(3,chT.textContent.length);
					var t = document.createElement('span');
					t.setAttribute('onclick','changeChatChannel(\'' + ch + '\');return false;');
					t.innerHTML = chStr;
					lastChatLine.insertBefore(t,chT);
				}
			}
		}
	}
}

function addChatButtons() {
	DisCht = document.getElementById('chatDisable');
	for (i=0;i<unicodeSymbols.length;i++) {
		var insSymLnk = document.createElement('a');
		insSymLnk.setAttribute('onclick','chatAppendText(\'' + unicodeSymbols[i] + '\'); return false;');
		insSymLnk.setAttribute('href','#');
		insSymLnk.innerHTML = unicodeSymbols[i];
		DisCht.parentNode.insertBefore(insSymLnk,DisCht.previousSibling);
	}
}

function removeSendButton() {
	btn = document.getElementById('chatMessage').nextSibling.nextSibling;
	btn.style.display = 'none';
}

function moveLinks() {
	man = document.getElementById('chatDisable').nextSibling.nextSibling;
	rul = man.nextSibling.nextSibling;

	ep = document.createElement('center');
	eb = document.createElement('b');

	man.parentNode.removeChild(man.nextSibling);
	man.parentNode.removeChild(man);
	rul.parentNode.removeChild(rul.nextSibling);
	rul.parentNode.removeChild(rul);

	if (GM_getValue('MoveMoreLinks',true)) {
		dis = document.getElementById('chatDisable');
		opt = dis.nextSibling.nextSibling;
		his = opt.nextSibling.nextSibling;
		rep = his.nextSibling.nextSibling;

		dis.parentNode.removeChild(dis.nextSibling);
		dis.parentNode.removeChild(dis);
		opt.parentNode.removeChild(opt.nextSibling);
		opt.parentNode.removeChild(opt);
		his.parentNode.removeChild(his.nextSibling);
		his.parentNode.removeChild(his);
		rep.parentNode.removeChild(rep);
		

		eb.appendChild(document.createElement('br'));
		eb.appendChild(dis);
		eb.appendChild(document.createElement('br'));
		eb.appendChild(opt);
		opt.innerHTML = 'Chat Options';
		eb.appendChild(document.createElement('br'));
		eb.appendChild(his);
		his.innerHTML = 'Chat History';
		eb.appendChild(document.createElement('br'));
		eb.appendChild(rep);
		rep.innerHTML = 'Chat Report';
		eb.appendChild(document.createElement('br'));
	}

	eb.appendChild(document.createElement('br'));
	eb.appendChild(man);
	eb.appendChild(document.createElement('br'));
	eb.appendChild(rul);	

	ep.appendChild(eb);
	rightPane = document.getElementById('moveMap').parentNode;
	rightPane.appendChild(ep);
}

function increaseChatInputSize() {
	chtIn = document.getElementById('chatMessage');
	chtIn.size = 90;
}

function ForumMultiPopup() {	
	var lnks = document.getElementsByTagName('A');
      for (i=0;i<lnks.length;i=i+1) {
            if (lnks[i].href == 'http://www.syrnia.com/theGame/mainincludes/forum.php?pop=yes') {
                 lnks[i].setAttribute('onclick', 'enterWindow=window.open("http://www.syrnia.com/theGame/mainincludes/forum.php?pop=yes","",                "width=750,height=500,top=5,left=5,scrollbars=yes,resizable=yes"); return false');
            } else if (lnks[i].href == 'http://www.syrnia.com/theGame/includes2/clan.php') {
		     lnks[i].setAttribute('onclick','enterWindow=window.open("http://www.syrnia.com/theGame/includes2/clan.php","",                "width=750,height=550,top=5,left=5,scrollbars=yes,resizable=yes"); return false');
		}
      }
}

function TravelMap() {
	try{
		td_map = document.getElementById('moveMap');
		td_map.addEventListener('DOMNodeInserted',addMapTooltips,false);
		addMapTooltips();
	}catch(e){
		window.setTimeout(TravelMap,5000);
	}

	function addMapTooltips() {
		if (locations = td_map.getElementsByTagName('area')) {
			for (i=0; i<locations.length; i++) {
				ind1 = locations[i].getAttribute('onclick').indexOf(', \'') + 3;
				ind2 = locations[i].getAttribute('onclick').indexOf('\');');
				locations[i].title = locations[i].getAttribute('onclick').substring(ind1,ind2);
			}
		}
	}
}

function TotalInventory() {
	var Brns;
	var Raws;
	var Cked;
	var Total;

	// create the table to hold the totals
	var myTable = document.createElement('table');
	myTable.setAttribute('cellspacing','0');
	myTable.setAttribute('cellpading','0');
	myTable.setAttribute('border','0');
	myTable.style.backgroundColor = 'black';
	myTable.style.textAlign = 'center';

	var myTR1 = document.createElement('tr');
	Cked = document.createElement('td');
	Cked.setAttribute('width', '200');
	Cked.style.color = 'cyan';
	myTR1.appendChild(Cked);
	myTable.appendChild(myTR1);

	var myTR2 = document.createElement('tr');
	Raws = document.createElement('td');
	Raws.setAttribute('width', '200');
	Raws.style.color = 'yellow';
	myTR2.appendChild(Raws);
	myTable.appendChild(myTR2);

	var myTR3 = document.createElement('tr');
	Brns = document.createElement('td');
	Brns.setAttribute('width', '200');
	Brns.style.color = 'grey';
	myTR3.appendChild(Brns);
	myTable.appendChild(myTR3);

	var myTR4 = document.createElement('tr');
	Total = document.createElement('td');
	Total.setAttribute('width', '200');
	Total.style.color = 'white';
	myTR4.appendChild(Total);
	myTable.appendChild(myTR4);


	// set a watch on the inventory
	try {
		inv = document.getElementById('playerInventory');
		inv.addEventListener('DOMSubtreeModified',inventoryTotalsDelay,false);
	} catch(e) {
		window.setTimeout(TotalInventory(),1000);
	}
	inv.setAttribute('width','200');

	if (inv.tagName == 'TD') { // then we are in a table, and thus in drag&drop
		invTable = inv.parentNode.parentNode;
		ttlTr = document.createElement('tr');
		ttlTd = document.createElement('td');
		ttlTd.appendChild(myTable);
		ttlTr.appendChild(ttlTd);
		invTable.appendChild(ttlTr);
	} else { // in normal inventory mode
		inv.parentNode.insertBefore(myTable,inv.nextSibling);
		myTable.setAttribute('width','200');
	}


	// run a first cut of the totalling function
	inventoryTotalsDelay();

	function inventoryTotalsDelay() {
		inv.removeEventListener('DOMSubtreeModified',inventoryTotalsDelay,false);
		window.setTimeout(inventoryTotals,1000);
	}

	// This function only runs on the DOMSubTree modified event of the inv
	// (except the first run)
	function inventoryTotals() {
		var totalHP = 0;
		var numCooked = 0;
		var totalRawHP = 0;
		var numRaw = 0;
		var numBurnts = 0;
		var totals = 0;

		var myDivs = inv.getElementsByTagName('div');

		if(myDivs) {	
			for (i=0;i<myDivs.length;i++) {
				totals += parseInt(myDivs[i].textContent);

				for (j=0;j<Foods.length;j++) {
					if (myDivs[i].title == Foods[j][0]) {
						totalHP += parseInt(myDivs[i].textContent)*Foods[j][1];
						numCooked += parseInt(myDivs[i].textContent);
					}
				}

				for (j=0;j<Cookables.length;j++) {
					if (myDivs[i].title == Cookables[j][0]) {
						totalRawHP += parseInt(myDivs[i].textContent)*Cookables[j][1];
						numRaw += parseInt(myDivs[i].textContent);
					}
				}

				if (myDivs[i].title.indexOf('Burnt') > -1) {
					numBurnts += parseInt(myDivs[i].textContent);
				}
			}
		}

		if (totals > 0) {
			Total.textContent = 'Total of ' + totals + ' items';
			Total.parentNode.style.display = '';
		} else {
			Total.parentNode.style.display = 'none';
		}
		if (numBurnts > 0) {
			Brns.textContent = 'Dragging ' + numBurnts + ' burnt food';
			Brns.parentNode.style.display = '';
		} else {
			Brns.parentNode.style.display = 'none';
		}
		if (numRaw > 0) {
			Raws.textContent = '' + numRaw + ' raw food (' + totalRawHP + ' hp)';
			Raws.parentNode.style.display = '';
		} else {
			Raws.parentNode.style.display = 'none';
		}
		if (numCooked > 0) {
			Cked.textContent = '' + numCooked + ' cooked food (' + totalHP + ' hp)';
			Cked.parentNode.style.display = '';
		} else {
			Cked.parentNode.style.display = 'none';
		}
		inv.addEventListener('DOMSubtreeModified',inventoryTotalsDelay,false);
	}
}

function TravelItems() {
	var enchTb = document.getElementById('displayPower').parentNode.parentNode;
	var myTR = document.createElement('TR');
	var myTD1 = document.createElement('TD');
	myTD1.innerHTML = '<b>TT:</b>';
	myTR.appendChild(myTD1);
	var myTD2 = document.createElement('TD');
	myTR.appendChild(myTD2);
	enchTb.appendChild(myTR);

	try {
		wearing = document.getElementById('wearDisplayTD').firstChild.nextSibling;
		wearing.addEventListener('DOMNodeInserted',TravelItemTotals,false);
	} catch(e) {
		window.setTimeout(TravelItems(),1000);
	}
	TravelItemTotals();

	function TravelItemTotals() {
		var items = wearing.getElementsByTagName('TD');
		var myTT = 0;
		for (i=0;i<items.length;i++) {
			titleText = items[i].title;
			if(titleText) {
				var ind = titleText.indexOf('Travel time');
				if (ind > -1) {
					myTT += parseInt(titleText.substr(ind-2,1));
				}
			}
		}
		myTD2.innerHTML = '-' + myTT + ' secs';
	}
}

var centCon;
function PlyrListChanges() {	
	try{
		var plyrList = document.getElementById('centerPlayerList');
		var players = plyrList.getElementsByTagName('a');
	
		if(players.length>0) {
			for (i=0;i<players.length;i++) {
				var t = document.createTextNode(' ');
				var whispNode = document.createElement('img');
				whispNode.src = imageWhi;
				whispNode.setAttribute('onclick','chatReplaceText(\''+players[i].textContent+'@\');return false;');

				var msgNode = document.createElement('img');
				msgNode.src = imageMes;
				msgNode.setAttribute('onclick','enterWindow=window.open(\'http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=' + players[i].textContent + '&topic=\',\'Messages\',\'width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes\'); return false;');
				
				plyrList.insertBefore(msgNode,players[i].nextSibling);
				plyrList.insertBefore(whispNode,players[i].nextSibling);
				plyrList.insertBefore(t,players[i].nextSibling);

				plyrList.insertBefore(msgNode,players[i].nextSibling);
				plyrList.insertBefore(whispNode,players[i].nextSibling);
				plyrList.insertBefore(t,players[i].nextSibling);

				var clanNode = document.createElement('span');
				clanNode.textContent = players[i].previousSibling.textContent;
				clanName = players[i].previousSibling.textContent.substring(1,players[i].previousSibling.textContent.length-2);
				clanNode.setAttribute('onclick',"enterWindow=window.open('http://www.DW-HQ.com/clanstats.php?clan="+clanName+"','','width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes'); return false;");
				plyrList.replaceChild(clanNode,players[i].previousSibling);

			}
		}

		centCon = document.getElementById('centerContent');
		centCon.addEventListener('DOMNodeInserted',function (e) {
			if (e.target.parentNode.id == 'centerPlayerList') {
				if (e.target.tagName == 'A'  && e.target.firstChild.tagName == 'B') {
					locTitle = document.getElementById('locationTitle');
					
					if (locTitle.textContent.indexOf('The Outlands') == -1) {
						var t = document.createTextNode(' ');

						var whispNode = document.createElement('img');
						whispNode.setAttribute('onclick','chatReplaceText(\''+e.target.textContent+'@\'); return false;');
						whispNode.src = imageWhi;

						var msgNode = document.createElement('img');
						msgNode.src = imageMes;
						msgNode.setAttribute('onclick','enterWindow=window.open(\'http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=' + e.target.textContent + '&topic=\',\'Messages\',\'width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes\'); return false;');

						e.target.parentNode.insertBefore(msgNode,e.target.nextSibling);
						e.target.parentNode.insertBefore(whispNode,e.target.nextSibling);
						e.target.parentNode.insertBefore(t,e.target.nextSibling);

						var clanNode = document.createElement('span');
						clanNode.textContent = e.target.previousSibling.textContent;
						clanName = e.target.previousSibling.textContent.substring(1,e.target.previousSibling.textContent.length-2);
						clanNode.setAttribute('onclick',"enterWindow=window.open('http://www.DW-HQ.com/clanstats.php?clan="+clanName+"','Messages','width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes'); return false;");
						e.target.parentNode.replaceChild(clanNode,e.target.previousSibling);
					}
				}
			}
		},false);
	}catch(e){
		window.setTimeout(PlyrListChanges,1000);
	}
}

function MassMessages() {//Direct message (clan members)
	myCollection = document.getElementsByTagName("tr");
      if (myCollection) {
            if (myCollection.length > 0) {
                  for (i=0; i<myCollection.length; i++) {
                        myObject = myCollection[i].getElementsByTagName("td")[1].getElementsByTagName("font")[0];
                        if (myObject) {
                              u = myObject.innerHTML.substring(1);
                              if (u!=undefined) {
                                    var link = document.createElement("a");
                                    link.innerHTML = protoMsg;
                                    link.href="http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=" + u;
						link.setAttribute('onclick','enterWindow=window.open(\'http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=' + u + '\',\'Messages\',\'width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes\'); return false;');
						link.style.textDecoration = 'none';
                                    link.target="_blank";
                                    myObject.parentNode.insertBefore(link, myObject.nextSibling);
 
                                    //Mass box
                                    var box = document.createElement("input");
                                    box.type = "checkbox";
                                    box.style.verticalAlign = 'middle';
                                    box.title = 'Queue for mass message';
                                    box.id = u;
                                    myObject.parentNode.insertBefore(box, myObject);
                                    }
                              }
                        }
                  }
            }


      //Mass message
      var Mform = document.createElement("center");
 
      var Mbody = document.createElement("textarea");
      Mbody.rows = "10";
      Mbody.cols = "30";
      Mbody.id = 'Mbody';
 
      var Msubject = document.createElement("input");
      Msubject.id = 'Msubject';
      Msubject.size = "40"
      Msubject.maxlength = "20"
      Msubject.value = "[Mass]"
 
      var Mtitle = document.createElement("center");
      Mtitle.innerHTML = '<b>Mass Message Clan Members</b><BR>Do not abuse this feature. It is annoying to get lots of spam!';
 
      var Mbutton = document.createElement("input");
      Mbutton.type = 'button';
      Mbutton.id = 'Mbutton';
      Mbutton.addEventListener("click", goMass, false);
      Mbutton.value = "Go mass"
 
      var Mbox = document.createElement("input");
      Mbox.type = 'checkbox';
      Mbox.id = 'Mbox';
      Mbox.addEventListener("click", goCheck, false);
 
      var Mlabel = document.createElement("label");
      Mlabel.innerHTML = '(un)Check all';
      Mlabel.htmlFor = "Mbox";
 
      myObject = document.body;
      myObject.appendChild(document.createElement("hr"));
      myObject.appendChild(Mtitle);
      myObject.appendChild(Mform);
      Mform.appendChild(Msubject);
      Mform.appendChild(document.createElement("br"));
      Mform.appendChild(Mbody);
      Mform.appendChild(document.createElement("br"));
      Mform.appendChild(Mbox);
      Mform.appendChild(Mlabel);
      Mform.appendChild(document.createElement("br"));
      Mform.appendChild(Mbutton);
 
      myForm = document.createElement("form");
      myForm.action = 'http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1';
      myForm.target = '_blank';
      myForm.method = 'post';
      myForm.id = 'frm';
      myForm.style.display = 'none';
 
      myHidden = document.createElement("input");
      myHidden.type = 'hidden';
      myHidden.value = 'yess';
      myHidden.name = 'submit';
 
      myText1 = document.createElement("input");
      myText1.type = 'text';
      myText1.name = 'sendto';
      myText1.id = 'sendto';
 
      myText2 = document.createElement("input");
      myText2.type = 'text';
      myText2.name = 'topic';
      myText2.id = 'topic';
 
      myText3 = document.createElement("textarea");
      myText3.name = 'tekst';
      myText3.id = 'tekst';
 
      mySubmit = document.createElement("input");
      mySubmit.type = 'submit';
      mySubmit.value = 'Send';
 
      myForm.appendChild(myHidden);
      myForm.appendChild(myText1);
      myForm.appendChild(myText2);
      myForm.appendChild(myText3);
      myForm.appendChild(mySubmit);
 
      myObject.appendChild(myForm);
}

function goMass()
{
myBody = document.body;
myCollection = document.getElementsByTagName("input");
s = document.getElementById("Msubject").value;
b = document.getElementById("Mbody").value;
if (b == '')
      {
      alert ('Please enter a message body');
      document.getElementById("Mbody").focus();

     return;

     }
 

if (myCollection)
      {
      if (myCollection.length > 0)
            {
            mySpan = document.createElement("span");
            myBody.appendChild(mySpan);
            document.getElementById("topic").value = s;
            document.getElementById("tekst").value = b;
            for (i=0; i<myCollection.length; i++)
                  {
			if (myCollection[i].checked && myCollection[i].id!='Mbox' && myCollection[i].name!='changenews' && myCollection[i].name!='changeranks' && myCollection[i].name!='changeforum')
                        {
				document.getElementById("sendto").value = myCollection[i].id;
				myForm.submit();
				alert(myCollection[i].id);//added this both as a confirmation and due to the fact that the windows did not have the time to open when running with no delay (the user is usually taking enough time to allow the window to open :D)
				mySpan.innerHTML += myCollection[i].id + '<BR>';
                        }
                  }
                  mySpan.innerHTML += '<font color="#0033FF">Please check the opened window for success</font><BR>';
			window.open('http://www.syrnia.com/theGame/includes2/messages.php?p=messages&checksend=1');
            }
      }
}
 

function goCheck()
{
myCollection = document.getElementsByTagName("input");
myObject = document.getElementById("Mbox");

if (myCollection && myObject)
      {
      if (myCollection.length > 0)
            {
            for (i=0; i<myCollection.length; i++)
                  {
                  if (myCollection[i].type == "checkbox" && myCollection[i].type != "Mbox" && myCollection[i].name!='changenews' && myCollection[i].name!='changeranks' && myCollection[i].name!='changeforum')
                        {
                        myCollection[i].checked = myObject.checked;
                        }
                  }
            }
      }
}

 
function VoteGifts() {//Mark gift votes
     	myAs = document.getElementsByTagName('a');
     	for (i=0; i<myAs.length; i++) {
           	if (myAs[i].href.indexOf('http://www.topwebgames.com/in.asp') > -1 || myAs[i].href.indexOf('http://www.toprpgames.com/vote.php') > -1 || myAs[i].href.indexOf('http://www.sweetonlinegames.com') > -1) {
                 	myAs[i].innerHTML += '&nbsp;!';
                 	myAs[i].style.color = 'green';
           	}
           	if (myAs[i].href.indexOf('http://www.gamesites100.net/in.php') > -1) {
                 	myAs[i].innerHTML += '&nbsp;?';
                 	myAs[i].style.color = 'navy';
           	}
     	}
}
 
function Quest() {//Quests
      myCollection = document.getElementsByTagName("tr");
     	if (myCollection) {
            if (myCollection.length > 0) {
                  for (i=0; i<myCollection.length; i++) {
     	                  myObject = myCollection[i].getElementsByTagName("td")[0].getElementsByTagName("b")[0].getElementsByTagName("font")[0];
           	            if (myObject) {
                 	            if (myObject.innerHTML.indexOf('Quests') > -1) {
                       	            var link = document.createElement("a");
                             	      link.innerHTML = "<B>?</B>";
                                   	link.href = "http://www.dw-hq.com/index.php?page=quests";
                                    link.target = "_blank";
     	                              myObject.parentNode.insertBefore(link, myObject);
           	                  }
                 	            for (j=0; j<Quests.length; j++) {
                       	            if (myObject.innerHTML.indexOf(Quests[j][0]) > -1) {
                             	            var link = document.createElement("a");
                                   	      link.innerHTML = "<B>?</B>";
                                         	link.href = "http://www.dw-hq.com/index.php?page=questshow&id=" + Quests[j][1];
                                          link.target = "_blank";
     	                                    myObject.parentNode.insertBefore(link, myObject);
           	                              break;
                 	                  }
                       	      }
                       	}
                 	}
           	}
     	}
}

function ChangeStatsLinks() {
	var lnks = document.getElementsByTagName('A');
      for(i=0;i<lnks.length;i=i+1) {
            if (lnks[i].href == 'http://www.syrnia.com/theGame/includes2/stats.php') {
                  lnks[i].setAttribute('onclick', onclick='enterWindow=window.open("http://www.syrnia.com/theGame/includes2/stats.php","",                "width=400,height=450,top=5,left=5,scrollbars=yes,resizable=yes"); return false');
            }
      }
}

function MoreStats() {//Totals and ratios
      var myLevels = 0;
      var myXPs = 0;
      var myCLXP = 0;
      myTables = document.getElementsByTagName("table");
      myStats = myTables[0];
      myTRs = myStats.getElementsByTagName("tr");
      myProgressH = document.createElement("td");
      myProgressH.setAttribute('width', '100');;
      myProgressH.innerHTML = "<B>Progress</B>";
      myTRs[0].appendChild(myProgressH);
      for (i=1; i<myTRs.length; i++) {
		if (myTRs[i].firstChild.textContent == 'Total') {
			myTRs[i].style.display='none'; //don't display the old totals
		} else {
            	myTDs = myTRs[i].getElementsByTagName("td");
            	myLevels+=parseInt(myTDs[1].innerHTML);
            	myXPs+=parseInt(myTDs[2].innerHTML);
			
 	
	            //Level percentage
            	var myProgress = document.createElement("td");
      	      var myProgressS = document.createElement("hr");
	            var myProgressX = document.createElement("hr");
            	myProgressN = parseFloat(((1 - parseFloat(myTDs[3].innerHTML) / (XPs[parseInt(myTDs[1].innerHTML) + 1] - XPs[parseInt(myTDs[1].innerHTML)])) * 100).toFixed(2));
      	      myProgressS.style.backgroundColor = 'lime';
	            myProgressS.style.width = myProgressN.toFixed(0)+'%';
            	myProgressS.style.height = '5px';
      	      myProgressS.style.marginLeft = '0px';
	            myProgressX.style.backgroundColor = 'red';
            	myProgressX.style.width = 100 - myProgressN.toFixed(0)+'%';
      	      myProgressX.style.height = '5px';
	            myProgressX.style.marginRight = '0px';
            	myProgress.align = 'center';
      	      myProgress.innerHTML = addCommas(myProgressN)+'%<BR>';
	            if (GM_getValue('PRogressBarStats', true)) {
            	      myProgress.appendChild(myProgressS);
      	      }
	            myTRs[i].appendChild(myProgress);
 
            	//CLXP
      	      if (myTDs[0].innerHTML == 'Strength') {
	                  myCLTR = i;
            	      myCLXP+=parseInt(myTDs[2].innerHTML);
      	      }
	            if (myTDs[0].innerHTML == 'Health') {
            	      myCLXP+=parseInt(myTDs[2].innerHTML);
      	      }
	            if (myTDs[0].innerHTML == 'Defence') {
            	      myCLXP+=parseInt(myTDs[2].innerHTML);
      	      }
	            if (myTDs[0].innerHTML == 'Attack') {
                  	myCLXP+=parseInt(myTDs[2].innerHTML);
            	}
            	myTDs[3].innerHTML = addCommas(parseInt(myTDs[3].innerHTML));
            	myTDs[2].innerHTML = addCommas(parseInt(myTDs[2].innerHTML));
		}
      }
      //CL
      if (window.opener) {
            myImgz = window.opener.document.getElementsByTagName('img');
            if (myImgz) {
                  for (i=0; i<myImgz.length; i++) {
                        if (myImgz[i].src == 'http://www.syrnia.com/images/level.gif') {
                              myCL = myImgz[i].parentNode.previousSibling.getElementsByTagName('font')[0].innerHTML;
                        }
                  }
            }
            CLTR = document.createElement("tr");
            CLTD1 = document.createElement("td");
            CLTD1.innerHTML = "<I><B>CL</B></I>";
            CLTD2 = document.createElement("td");
            CLTD2.innerHTML = "<I><B>"+addCommas(myCL.toString())+"</B></I>";
            CLTD3 = document.createElement("td");
            CLTD3.innerHTML = "<I><B>"+addCommas(myCLXP.toString())+"</B></I>";
            CLTD4 = document.createElement("td");
            CLTD4.setAttribute('colspan', '2');
            CLTD4.innerHTML = "<CENTER><I><B title='Sorry, I don`t know the formula'>?</B></I></CENTER>";
            CLTR.appendChild(CLTD1);
            CLTR.appendChild(CLTD2);
            CLTR.appendChild(CLTD3);
            CLTR.appendChild(CLTD4);
            myTRs[myCLTR].parentNode.insertBefore(CLTR, myTRs[myCLTR]);
      } else {
            CLTR = document.createElement("tr");
            CLTD1 = document.createElement("td");
            CLTD1.innerHTML = "<I><B>CL</B></I>";
            CLTD2 = document.createElement("td");
            CLTD2.setAttribute('colspan', '4');
            CLTD2.innerHTML = "<CENTER><I><B>Connection lost</B><BR>Please click again on `Stats` in main window</I></CENTER>";
            CLTR.appendChild(CLTD1);
            CLTR.appendChild(CLTD2);
            myTRs[myCLTR].parentNode.insertBefore(CLTR, myTRs[myCLTR]);
      }
 
      SkillsTR = document.createElement("tr");
	SkillsTD1 = document.createElement("td");
	SkillsTD1.innerHTML = "<B>TOTAL</B>";
	SkillsTD2 = document.createElement("td");
	SkillsTD2.innerHTML = "<B>"+addCommas(myLevels.toString())+"</B>";
	SkillsTD3 = document.createElement("td");
	SkillsTD3.innerHTML = "<B>"+addCommas(myXPs.toString())+"</B>";
	SkillsTD4 = document.createElement("td");
	SkillsTD4.innerHTML = "<B>"+addCommas((myXPs/myLevels).toFixed(2))+"<BR>(XP/Lvl)</B>";
	SkillsTR.appendChild(SkillsTD1);
	SkillsTR.appendChild(SkillsTD2);
	SkillsTR.appendChild(SkillsTD3);
	SkillsTR.appendChild(SkillsTD4);
	myStats.appendChild(SkillsTR);
 
      var mySlots = 0;
      var myFarms = 0;
      myHouses = myTables[2];
      myTRs = myHouses.getElementsByTagName("tr");
      for (i=1; i<myTRs.length; i++) {
            myTDs = myTRs[i].getElementsByTagName("td");
            mySlots += parseInt(myTDs[1].innerHTML);
            myTDs[1].innerHTML = addCommas(myTDs[1].innerHTML);
            myFarms += parseInt(myTDs[2].innerHTML);
      }
      HousesTR = document.createElement("tr");
      HousesTD1 = document.createElement("td");
      HousesTD1.innerHTML = "<B>TOTAL</B>";
      HousesTD2 = document.createElement("td");
      HousesTD2.innerHTML = "<B>"+addCommas(mySlots.toString())+"</B>";
      HousesTD3 = document.createElement("td");
      HousesTD3.innerHTML = "<B>"+addCommas(myFarms.toString())+"</B>";
      HousesTR.appendChild(HousesTD1);
      HousesTR.appendChild(HousesTD2);
      HousesTR.appendChild(HousesTD3);
      myHouses.appendChild(HousesTR);
 
      var myShopSlots = 0;
      myShops = myTables[4];
      myTRs = myShops.getElementsByTagName("tr");
      for (i=1; i<myTRs.length; i++) {
            myTDs = myTRs[i].getElementsByTagName("td");
            myShopSlots += parseInt(myTDs[1].innerHTML);
            myTDs[1].innerHTML = addCommas(myTDs[1].innerHTML);
      }
      ShopsTR = document.createElement("tr");
      ShopsTD1 = document.createElement("td");
      ShopsTD1.innerHTML = "<B>TOTAL</B>";
      ShopsTD2 = document.createElement("td");
      ShopsTD2.innerHTML = "<B>"+addCommas(myShopSlots.toString())+"</B>";
      ShopsTR.appendChild(ShopsTD1);
      ShopsTR.appendChild(ShopsTD2);
      myShops.appendChild(ShopsTR);
 
      var myNXratio = 0;
      myX = myTables[5].getElementsByTagName("tr")[0].getElementsByTagName("td")[0];
      myA = myX.getElementsByTagName("a");
      if (myA.length==0) {
            myTxt = myX.innerHTML;
            myHours0 = myTxt.substring(0, myTxt.indexOf(' hours')).split(' ');
            myHours = parseInt(myHours0[myHours0.length-1]);
 
            myMinutes0 = myTxt.substring(0, myTxt.indexOf(' minutes')).split(' ');
            myMinutes = parseInt(myMinutes0[myMinutes0.length-1]);
            myTime = myHours + myMinutes/60;
 
            myDays0 = myTxt.substring(0, myTxt.indexOf(' days')).split(' ');
            myDays = parseInt(myDays0[myDays0.length-1]);
            myNXratio = addCommas((myTime / myDays).toFixed(2));
 
            myKills0 = myTxt.substring(0, myTxt.indexOf(' monsters')).split(' ');
            myKills = parseInt(myKills0[myKills0.length-1]);
            myKratio = addCommas((myKills / myDays).toFixed(2));
 
            myBRs = myX.getElementsByTagName("br");
            myNXspan = document.createElement('span');
            myNXspan.innerHTML = "<B>NebuneX ratio: "+myNXratio+" hours/day.</B><BR>"
            myX.insertBefore(myNXspan, myBRs[3]);
 
            myKspan = document.createElement('span');
            myKspan.innerHTML = "<BR><B>K ratio: "+myKratio+" creatures/day.</B><BR>"
            myX.insertBefore(myKspan, myBRs[7]);
 
            rTR = document.createElement("tr");
            rTD1 = document.createElement("td");
            rTD1.innerHTML = "<B>Time stats</B>";
            rTD2 = document.createElement("td");
            rTD2.innerHTML = "<B>"+addCommas((myLevels/myDays).toFixed(2).toString())+"<BR>(Lvl/day)</B>";
            rTD3 = document.createElement("td");
            rTD3.innerHTML = "<B>"+addCommas((myXPs/myTime).toFixed(2).toString())+"<BR>(XP/hour)</B>";
            rTD4 = document.createElement("td");
            rTD4.innerHTML = "<B>&nbsp;</B>";
            rTR.appendChild(rTD1);
            rTR.appendChild(rTD2);
            rTR.appendChild(rTD3);
            rTR.appendChild(rTD4);
            myStats.appendChild(rTR);
      }
}
 
function DWMessages() {//Direct message (DWHQ)
	myCollection = document.getElementsByTagName("a");
	if (myCollection) {
      	if (myCollection.length > 0) {
	            for (i=0; i<myCollection.length; i++) {
            	      if (myCollection[i].href.indexOf('playerstats') > -1) {
      	                  u = myCollection[i].href.split('p=')[1].replace(/\\/, "").replace(/'/, "").replace(/\)/,"");
	                        if (u!=undefined) {
                        	      var link = document.createElement("a");
                  	            link.innerHTML = protoMsg;
            	                  link.href="http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=" + u + "&topic=";
						link.setAttribute('onclick','enterWindow=window.open(\'http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=' + u + '\',\'Messages\',\'width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes\'); return false;');
						link.style.textDecoration = 'none';
      	                        link.target="_blank";
                              	myCollection[i].parentNode.insertBefore(link, myCollection[i].nextSibling);
                        	}
                  	}
            	}
      	}
	}
}

function DWFactors() {//Compute the level factor
      if (myTables = document.getElementsByTagName('table')) {
            MyBy = 0;
            myTable = myTables[2];
            MyMembers = parseInt(myTable.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML.split(': ')[1].split('<')[0]);
            MyLevels = parseInt(myTable.getElementsByTagName('tr')[0].getElementsByTagName('td')[2].innerHTML.split(': ')[1].split('<')[0]);
            MyXPs = parseInt(myTable.getElementsByTagName('tr')[0].getElementsByTagName('td')[4].innerHTML.split(': ')[1].split('<')[0]);
            MyBy = MyLevels / MyMembers
            MyByX = Math.sqrt(MyXPs) / Math.pow(MyMembers, 2);
            if (isNaN(MyBy)) {
                  MyBy = 300;
            }
            myTable = myTables[0];
            myRows = myTable.getElementsByTagName('tr');
            for (i=4; i<myRows.length-2; i++) {
                  myCells = myRows[i].getElementsByTagName('td');
                  if (myCells[2] && myCells[3] && myCells[4]) {
                        myLevels = myCells[2].innerHTML.split('>')[2].split('<')[0];
                        myXPs = myCells[4].innerHTML.split('>')[2].split('<')[0];
                        myGains = myCells[3].innerHTML.split('>')[2].split('<')[0].substring(1);
                        myGainsX = myCells[5].innerHTML.split('>')[2].split('<')[0].substring(1);
                        myNr = myCells[0].innerHTML.split('>')[2].split('<')[0];
                        if (isNaN(myNr) || myNr == '') {
                              //nothing here
                        } else {
                              myFactor = (parseInt(myLevels) * parseInt(myGains) / MyBy);
                              myFactorX = (parseInt(myGainsX) / parseInt(myXPs)) * MyByX;
                              if (isNaN(myFactorX)) {
                                    myFactorX = 0;
                              }
                              if (isNaN(myFactor)) {
                                    myFactor = 0;
                              }
                              myCells[3].innerHTML += '<BR><FONT COLOR="magenta"><B>' + addCommas(myFactor.toFixed(2)) + '</B></FONT>'
                              myCells[5].innerHTML += '<BR><FONT COLOR="magenta"><B>' + addCommas(myFactorX.toFixed(2)) + '</B></FONT>'
                        }
                  } else {
                        //nothing here
                  }
            }
      }
}

function ForumMessages() {
	var tbls = document.getElementsByTagName('TABLE');
	var tbl = tbls[tbls.length-1];

	var trs = tbl.getElementsByTagName('TR');
	
	for (i=0;i<trs.length;i++) {
		var plyr = trs[i].firstChild.firstChild;

		if (plyr.nextSibling.nextSibling.textContent.substr(1,1) == '[') {
			var clan = plyr.nextSibling.nextSibling;
			var clanName = clan.textContent.substr(2,clan.textContent.length-3);

			var clanNode = document.createElement('A');
			clanNode.textContent = clan.textContent;
			clanNode.setAttribute('onclick',"enterWindow=window.open('http://www.DW-HQ.com/clanstats.php?clan="+clanName+"','','width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes'); return false;");
			clanNode.href = 'http://www.DW-HQ.com/clanstats.php?clan='+clanName;
			clanNode.style.color = 'black';
			clanNode.style.textDecoration = 'none';
			plyr.parentNode.replaceChild(clanNode,clan);
		}
		
		if (plyr.textContent != 'Mr. Addy') {
			var t = document.createTextNode(' ');
			var msgNode = document.createElement('a');
			var image = document.createElement('img');
			image.src = imageMes;
			image.border = 0;
			msgNode.href="http://www.syrnia.com/includes2/messages.m2h?p=messages&stuur=1&name=" + plyr.textContent;
			msgNode.setAttribute('onclick','enterWindow=window.open(\'http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=' + plyr.textContent + '\',\'Messages\',\'width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes\'); return false;');
			msgNode.target="_blank";
			msgNode.appendChild(image);

			plyr.parentNode.insertBefore(msgNode,plyr.nextSibling);
			plyr.parentNode.insertBefore(t,plyr.nextSibling);
		}
	}
}

function chOptions() {
	if (myTable = document.getElementsByTagName('table')[2]) {
		mySep = document.createElement('hr');
		mySep.setAttribute('width', '90%');
		mySepTD = document.createElement('td');
		mySepTD.innerHTML = '<CENTER><B>Extra chat options</B></CENTER><SMALL><I><CENTER>These settings require refresh</CENTER></I></SMALL>';
		mySepTD.setAttribute('colspan', '2');
		mySepBR = mySepTD.getElementsByTagName('br')[0];
		mySepTD.insertBefore(mySep, mySepBR);
		mySepTR = document.createElement('tr');
		mySepTR.setAttribute('bgcolor', '#E2D3B2');
		mySepTR.appendChild(mySepTD);
		myTable.appendChild(mySepTR);

		myHeadTD1 = document.createElement('td');
		myHeadTD1.innerHTML = '<B>Setting</B>';
		myHeadTD2 = document.createElement('td');
		myHeadTD2.innerHTML = '<B>Enabled?</B>';
		myHeadTR = document.createElement('tr');
		myHeadTR.setAttribute('bgcolor', '#E2D3B2');
		myHeadTR.appendChild(myHeadTD1);
		myHeadTR.appendChild(myHeadTD2);
		myTable.appendChild(myHeadTR);

		for(i=0;i<chatOptions.length;i++) {
			var checkboxTD1 = document.createElement('td');
			var checkboxLbl = document.createElement('label');
			checkboxLbl.innerHTML = chatOptions[i][1];
			checkboxLbl.setAttribute('for', chatOptions[i][0]);
			checkboxTD1.appendChild(checkboxLbl);
			var checkboxChk = document.createElement('input');
			checkboxChk.type = 'checkbox';
			checkboxChk.addEventListener('click', setOption, false);
			checkboxChk.setAttribute('id', chatOptions[i][0]);
			checkboxChk.checked = GM_getValue(checkboxChk.id, true);
			var checkboxTD2 = document.createElement('td');
			checkboxTD2.appendChild(checkboxChk);
			var checkboxTR = document.createElement('tr');
			checkboxTR.setAttribute('bgcolor', '#E2D3B2');
			checkboxTR.appendChild(checkboxTD1);
			checkboxTR.appendChild(checkboxTD2);
			myTable.appendChild(checkboxTR);
		}
	}
}

function Options() {
      if (myTable = document.getElementsByTagName('table')[1]){
            mySep = document.createElement('hr');
            mySep.setAttribute('width', '90%');
            mySepTD = document.createElement('td');
            mySepTD.innerHTML = '<BR><CENTER><B><font face = "Monotype Corsiva, Bookman Old Style, verdana" color = "#cc0000" size = 40>Monkey Business</font></B></CENTER>';
            mySepTD.setAttribute('colspan', '3');
            mySepBR = mySepTD.getElementsByTagName('br')[0];
            mySepTD.insertBefore(mySep, mySepBR);
            mySepTR = document.createElement('tr');
            mySepTR.setAttribute('bgcolor', '#E2D3B2');
            mySepTR.appendChild(mySepTD);
            myTable.appendChild(mySepTR);
 
            myHeadTD1 = document.createElement('td');
            myHeadTD1.innerHTML = '<B>Setting</B>';
            myHeadTD2 = document.createElement('td');
            myHeadTD2.innerHTML = '<B>Enabled? / Value</B>';
            myHeadTR = document.createElement('tr');
            myHeadTR.setAttribute('bgcolor', '#E2D3B2');
            myHeadTR.appendChild(myHeadTD1);

           myHeadTR.appendChild(myHeadTD2);
            myTable.appendChild(myHeadTR);
 
            for (i=0; i<myOptions.length; i++) {
                  var myOptionTD1 = document.createElement('td');
                  var myOptionLbl = document.createElement('label');
                  myOptionLbl.innerHTML = myOptions[i][1];
                  myOptionLbl.setAttribute('for', myOptions[i][0]);
                  myOptionTD1.appendChild(myOptionLbl);
                  var myOptionChk = document.createElement('input');
                  myOptionChk.type = 'checkbox';
                  myOptionChk.addEventListener('click', setOption, false);
                  myOptionChk.setAttribute('id', myOptions[i][0]);
                  myOptionChk.checked = GM_getValue(myOptionChk.id, true);
                  var myOptionTD2 = document.createElement('td');
                  myOptionTD2.appendChild(myOptionChk);
                  var myOptionTR = document.createElement('tr');
                  myOptionTR.setAttribute('bgcolor', '#E2D3B2');
                  myOptionTR.appendChild(myOptionTD1);
                  myOptionTR.appendChild(myOptionTD2);
                  myTable.appendChild(myOptionTR);
 
                  if (myOptions[i][0] == 'MoreStats') {
                        //Progress bar
                        myProgressTD1 = document.createElement('td');
                        myProgressLbl = document.createElement('label');
                        myProgressLbl.innerHTML = '<I>&nbsp;progressbar on stats page</I>';
                        myProgressLbl.setAttribute('for', 'PRogressBarStats');
                        myProgressTD1.appendChild(myProgressLbl);
                        myProgressChk = document.createElement('input');
                        myProgressChk.type = 'checkbox';
                        myProgressChk.addEventListener('click', setOption, false);
                        myProgressChk.setAttribute('id', 'PRogressBarStats');
                        myProgressChk.checked = GM_getValue(myProgressChk.id, true);
                        myProgressTD2 = document.createElement('td');
                        myProgressTD2.appendChild(myProgressChk);
                        myProgressTR = document.createElement('tr');
                        myProgressTR.setAttribute('bgcolor', '#E2D3B2');
                        myProgressTR.appendChild(myProgressTD1);
                        myProgressTR.appendChild(myProgressTD2);
                        myTable.appendChild(myProgressTR);
                  }
            }
      }
}


function setOption() {
      Var = this.id;
      Val = this.checked;
      GM_setValue(Var, Val);
}
 
 
function addCommas(nStr)
{
sep = ',';
dec = '.';
nStr += '';
x = nStr.split('.');
x1 = x[0];
x2 = x.length > 1 ? dec + x[1] : '';
var rgx = /(\d+)(\d{3})/;
while (rgx.test(x1))
      {
      x1 = x1.replace(rgx, '$1' + sep + '$2');
      }
return x1 + x2;
}



// POPUP

function usePopUp(titleHTML,messageHTML) {
	popBox = document.getElementById('messagePopup');
	popBox.setAttribute('style','visibility: visible; z-index: 999; left: 250px; top: 51px;');
	popTitle = document.getElementById('popupTitle');
	popTitle.innerHTML = titleHTML;
	popMsg = document.getElementById('popupMessage');
	popMsg.innerHTML = messageHTML;
}

// UPDATE SCRIPTS
function CheckForUpdates(name,version,id) {
	var titleHTML = '<b>Update for script available</b>';
	var msgHTML = 'Do you want to update the ' + name + ' script? <br><a onclick="window.open(\'http://userscripts.org/scripts/source/'+id+'.user.js\');$(\'messagePopup\').style.visibility=\'hidden\';return false;" href=\'http://userscripts.org/scripts/source/'+id+'.user.js\'>Install the updated script!</a>'

	var uurl = 'http://userscripts.org/scripts/review/'+id+'?format=txt';

	this.check = function()
	{
		GM_xmlhttpRequest({method:"GET",url:uurl,onreadystatechange:this.doupdate});
	}

	this.doupdate = function(o) {
		if(o.readyState == 4)
		{
			indVer = o.responseText.indexOf('@version');
			checkver = o.responseText.substr(indVer,indVer+50);
			checkver = checkver.split('@version')[1];
			checkver = parseInt(checkver.replace(/\./g,''))+100;
			thisver = parseInt(version.replace(/\./g,''))+100;
			if(checkver>thisver)
			{
				usePopUp(titleHTML,msgHTML);
			}
			
		}
	}

this.check();
}



/*
This script started out as a remake of NebuneX's script for Syrnia.com (thanks NebuneX). 
I have added several other features, probably most significantly the changes to the chat
system.

People who have previously installed my chat script will probably need to remove that
(don't worry, all the chat features are in this script as well).

Version history:
<ul>v1.1.4 (2009-01-05)
	<li>Numerous bug fixes :S
</ul>

<ul>v1.1.3 (2009-01-04)
	<li>Finally fixed the problem with inventory totals when using drag&drop
	<li>Made the code more efficient
	<li>Fixed a few other small bugs and features
</ul>

<ul>v1.1.2 (2008-12-31)
	<li>error in calculating the hp totals fixed
	<li>errors when using "no images" layout options fixed
</ul>

<ul>v1.1.1 (2008-12-31)
	<li>error in the inventory totals fixed (hopefully)
</ul>

<ul>v1.1.0 (2008-12-30)
	<li>Added a feature to inform the user when the script has been update. Thus they won't need to continually check for updates at the website. Rather, the script will inform them through Syrnia pop-ups that the scrip has been updated.
	<li>Inventory food, raw and burnt totals have been added, as per popular request
	<li>Forum message and clan links
	<li>Total the TT items you are wearing
</ul>

<ul>v1.0.2 (2008-12-27)
	<li>Fixed a few more bugs
		<ul><li>Mass messaging improved. It no longer opens irrelevent windows, and it closes the windows when done.
		<li>Problems on the stats pages have been fixed :) 
		<li>Clan pages can be opened multiple times</ul>
</ul>
		
<ul>v1.0.1 (2008-12-22)
	<li>Fixed a few bugs
		<ul><li>Going to Options on the left hand side and the chat options gives you the chat options as well. Previously it only worked if you clicked the chat options button down near chat.
		<li>Several problems with the chat functions had been mentioned to me. I think they are fixed.
		<li>The issue with the totals in the stats page has been fixed
		<li>Fixed the sites that give green gifts
		<li>Fixed it so the whisper/message links don't appear in the Outlands</ul>
	<li>Bugs currently being worked on
		<ul><li>Am working on the mass message function, so that it doesn't open huge amounts of tabs in firefox.
		</ul>

</ul>

<ul>v1.0 (2008-12-20). The features currently implemented:
	<li>Chat options:
		<ul><li>Click on player name in chat to enter whisper command
		<li>Click on chat number to change chat channel
		<li>Buttons to insert symbols into chat
		<li>Option to remove the send button (useful for those who don't use it)
		<li>Option to move the chat links (useful for those with small screen resolutions)
		<li>Option to make the chat input box larger</ul>
	<li>Changes to the player list on the town screen
		<ul><li>Button to start whisper with player
		<li>Button to message player
		<li>Click on clan tag to open DW-HQ.com clan window</ul>
	<li>Allows the forum/clan pages to be opened multiple times
	<li>Enhance stats page with bars and percentages
	<li>Quest links to DW-HQ guide
	<li>Mark voting pages that (may) give green gifts (in green and blue)
	<li>Mass message of clan members from clan member page
	<li>Compute the level and XP factors on clan score (DWHQ)
	<li>Message players directly from on DWHQ
	<li>Travel map tooltip
		<ul><li>On mouse over text telling town name</ul>
</ul>
*/