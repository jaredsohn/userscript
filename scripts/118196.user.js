scr_meta=<><![CDATA[
// ==UserScript==
// @version        3.0
// @name           Syrnia Minor Tweaks Updated
// @include        http://www.syrnia.com/*
// ==/UserScript==
]]></>.toString()
 var isTamper = false;
try{
    var i=GM_installScript;
    isTamper=true;
}catch(e){
    isTamper=false;
        }
var sVer = /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, '');
var sName = /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1];
var sId = 118196;
 
var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];
 function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
var myOptions = [
/*['Inventory', 'Inventory enhancements'],
['HPCombat', 'HP tooltip (combat)'],*/
['AutoUpdate','Automatically checks when the script is updated, and (via popup) prompts the player to update'],
['TotalInventory', 'Summarize total numbers<BR> in the inventory'],
['PlyrListChanges', 'Add a few features to the player list'],
['ForumMultiPopup', 'Allows the forum/clan pages to be opened multiple times'],
['ForumMessages', 'Add message and clan links to the forum pages'],
['MoreStats', 'Enhance stats page with bars and percentages'],
['Quest', 'Quest links to TLGrounds guide'],
['VoteGifts', 'Mark voting pages that (may) give green gifts (in green and blue)'],
['DWFactors', 'Compute the level and XP factors on clan score (DWHQ)'],
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
'\u21d0', //Arrow3
'\u21d2', //Arrow4
'\u25BA', // Right Arrow
'\u25C4', // Left Arrow
'\u263A', // Smiley face 1
'\u263B', // Smiley face 2
'\u266A', // Musical 1
'\u266B', // Musical 2
'\u2665', // Heart
'\u2666' // Diamond

];
 
var Quests = [
['Squid of the Deep', '22'],
['Mighty Warrior', '21'],
['Huge problems', '10'],
['Protect the ancient woods', '13'],
['The kidnapped lunchbox', '11'],
['Damsel in more distress or really clueless', '16'],
['Earning the family respect', '9'],
['Valera Knight', '3'],
['Thieving guild trail', '6'],
['Slaying the monster', '5'],
['The abandoned shopping list', '8'],
['Damsel in distress or just clueless', '15'],
['Frogs and Monkeys', '14'],
['Monster training', '4'],
['Hidden forest', '19'],
['Clearing the Tomb', '18'],
['Repair the smokehouse', '20'],
['Lonely bard', '17'],
['Sick fisher or sick of fishing', '12'],
['Got to love locks', '7'],
['Witch Bluebell', '2'],
['Witch Bluebell 2', '1']
];
 
var imageMes = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZtJREFUeNqkk9tKAlEUhv/ZjqN5zoSgJL0QykC0wsfwtkeIeoveIug1eoUOFxESdOFVRBdhluMoZOLs0da/yaCLji7YzMxa//fvtQ9jTadTzBMKc4a9e3jYkOfKP/kHOwiC1b1G46i+sYFsKvUryh0McNlq4fjk5EAFWls7Al/c3KDjedCTybeDGmrJkFVaa5VOJLC1vo7z62t0er2vYalRQy0Zskr7vgrkJFKS2C6XcdZsouO60EHwaTDHGjXUkiFrDOjuiyhJk81NnF5d4bHbNTkOvjPHGjXMma6EtX0aiNtYa7NB4UgE+XweZwLUq1WTu5S2i8Wiqc10lm3DNwbjsQreOxj7Pp77feSXl7EoM12ICaNeqyEej6Mty8il03DCYdhkhP3o4GU0Qld2eCmTgaUUEskkapWKMeA7gxvXluVQE45GPzoIvQrcfnpCLpuFCoXM+hjJ93sx+2YtLWbURmggrO25rnN7d4dioQDHcX68RAuxmBlkyFrxUmlfxWJr/7nHk+Hw3pInp83wv/gjz+PwrHl/5zcBBgDDTxI9ebiiBQAAAABJRU5ErkJggg=='
var imageWhi = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAW0lEQVR42u2SyxIAEAhF9eXVl6NFxiNkWLo7ck7NCMJl4JmAiKIXym+hEQiMiO6uzFwkcAr3ki94IZDD1TfqpS6SJRKgzrBIXbGZpu5mxSyoZAdPBSrZwUuBNwmQvVURlZIAMAAAAABJRU5ErkJggg==';
var imageT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjhJREFUeNqUk89rE0EUx7+7abKbxNZCNcFFSSi4Hipo/IW5RelBaUA0leYsRdD+CbYHUY/eRKWKJ4WI4CFILRKxXkIPUdEq0Q2KQUxjNaUUdzeaNOt72426MRcffJiZ9+P7ZmZnBZBtEgT48McEIE3DSbjtngVk2oufxDfLgqBQcRd7mBwdPRIOh9FoNFCtVvEom50l/9HOxJ4Wulrf+PEh7FS32IvX2iJms9m+bonUfrDTlyCeDA+7/bncBx4OEXOuHVxPfnQlPtD6Jwic3gtMP1v38TyXA5LqygThFrA62o+oK2+1mlyj4oGxxA7bNz33DupAvcaxznzhyoj4z7laFm6dODuV9kl+v33jP0zz/tULGVHAqc5cz0zJAlNaBvplYKME0Ncx64Z+ILR1MLTWbOL50xlt+UvlMgm/57w7r4DbL9fretpKpRqJ1H4LL1xqFFYt/2Z78eZFYfXcY2uh21cQu/iSxA09GI3ujsXA6IFolH1OzH2Ev+Z7iPNEOpVKJQxL7j12eBf4GjLzX3u3D8XUYrGoUnw/8ZlYdN6BbWOBQGBSUZSQqqohr9eLVquFcrlsByORCAR6sU26D03TliqVypJhGBcpdLctMB+Px/eJoujx+XzwU9dgMGiPFt+oaULXddTrdftpk/haPp8vUN1BvsQAociy7CEBSJJkF/Iu2sZz9vEuOIdE+egK1/IOYsQ4cYYwie8OhvPTsUlOow1EkOD3cY24yQLcapsz/o81iE+/BBgATsHHEgeV8UIAAAAASUVORK5CYII='

 
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
		function chatAppendText(text) {\
			var chatMsg = document.getElementById(\'chatMessage\');\
			chatMsg.value = chatMsg.value + text;\
			chatMsg.focus();\
		}\
		";
		body.appendChild(script_chat);
		body.removeChild(script_chat);

		if (GM_getValue('AutoUpdate',true)) {
			CheckForUpdates(sName,sVer,sId);
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
var newstr = "";
		if (totals > 0) {
			Total.textContent = 'Total of ' + totals + ' Items';
			Total.parentNode.style.display = '';
		} else {
			Total.parentNode.style.display = 'none';
		}
		if (numBurnts > 0) {
						Brns.parentNode.style.display = 'none';
		}
		if (numCooked > 0) {
						Cked.parentNode.style.display = 'none';
                    newstr = "HP: " + addCommas(totalHP);
		}
                if (numRaw > 0) {
		Raws.parentNode.style.display = 'none';
                    newstr = newstr + "  Raw: "  + addCommas(totalRawHP);  
		}
            try{
               document.getElementById("inventoryStats").innerHTML = '<div id="inventoryStats" style="color: white; text-align: center;">'+newstr+'</div>'
            }catch(err){}
		inv.addEventListener('DOMSubtreeModified',inventoryTotalsDelay,false);
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
				whispNode.setAttribute('onclick',"QuickWhisper('" + players[i].textContent + "');return false;");
                            whispNode.setAttribute('title', 'Whisper player');
				var msgNode = document.createElement('img');
				msgNode.src = imageMes;
				msgNode.setAttribute('onclick','enterWindow=window.open(\'http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=' + players[i].textContent + '&topic=\',\'Messages\',\'width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes\'); return false;');
			msgNode.setAttribute('title', 'Message player');
                            var tNode = document.createElement('img');
				tNode.src = imageT;
				tNode.setAttribute('onclick',"thieving('player','" + players[i].textContent + "','');return false;");
                            tNode.setAttribute('title', 'Thieve player');
				plyrList.insertBefore(msgNode,players[i].nextSibling);
                            	plyrList.insertBefore(tNode,players[i].nextSibling);
				plyrList.insertBefore(whispNode,players[i].nextSibling);
				plyrList.insertBefore(t,players[i].nextSibling);
				plyrList.insertBefore(msgNode,players[i].nextSibling);
				plyrList.insertBefore(tNode,players[i].nextSibling);
				plyrList.insertBefore(whispNode,players[i].nextSibling);
				plyrList.insertBefore(t,players[i].nextSibling);
				var clanNode = document.createElement('span');
				clanNode.textContent = players[i].previousSibling.textContent;
				clanName = players[i].previousSibling.textContent.substring(1,players[i].previousSibling.textContent.length-2);
				clanNode.setAttribute('onclick',"enterWindow=window.open('http://tlgrounds.com/showclan.php?tag="+clanName+"','','width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes'); return false;");
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
				whispNode.setAttribute('onclick',"QuickWhisper('" + e.target.textContent + "');return false;");
						whispNode.src = imageWhi;
                                             whispNode.setAttribute('title', 'Whisper player');
                                            var tNode = document.createElement('img');
                                            tNode.src = imageT;
                                            tNode.setAttribute('onclick',"thieving('player','"+e.target.textContent+"','');return false;");
                                            tNode.setAttribute('title', 'Thieve player');
						var msgNode = document.createElement('img');
						msgNode.src = imageMes;
						msgNode.setAttribute('onclick','enterWindow=window.open(\'http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=' + e.target.textContent + '&topic=\',\'Messages\',\'width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes\'); return false;');
msgNode.setAttribute('title', 'Message player');
						e.target.parentNode.insertBefore(msgNode,e.target.nextSibling);
                                            e.target.parentNode.insertBefore(tNode,e.target.nextSibling);
						e.target.parentNode.insertBefore(whispNode,e.target.nextSibling);
						e.target.parentNode.insertBefore(t,e.target.nextSibling);

						var clanNode = document.createElement('span');
						clanNode.textContent = e.target.previousSibling.textContent;
						clanName = e.target.previousSibling.textContent.substring(1,e.target.previousSibling.textContent.length-2);
						clanNode.setAttribute('onclick',"enterWindow=window.open('http://tlgrounds.com/showclan.php?tag="+clanName+"','Clan','width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes'); return false;");
						e.target.parentNode.replaceChild(clanNode,e.target.previousSibling);
					}
				}
			}
		},false);
	}catch(e){
		window.setTimeout(PlyrListChanges,1000);
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
                             	      link.innerHTML = "<B>List of Quests</B>";
                                   	link.href = "http://tlgrounds.com/index.php?p=quests";
                                    link.target = "_blank";
     	                             // myObject.parentNode.insertBefore(link,myObject);
     	                             myObject.parentNode.replaceChild(link,myObject);
     	                               
     	                              
           	                    }  //for
           	                    
                 	            for (j=0; j<Quests.length; j++) {
                       	            if (myObject.innerHTML.toLowerCase().indexOf(Quests[j][0].toLowerCase()) > -1) {
                             	            var link = document.createElement("a");
                                   	      link.innerHTML = "<B>Info on:</B>";
                                         	link.href = "http://tlgrounds.com/index.php?p=quest&id=" + Quests[j][1];
                                          link.target = "_blank";
     	                                    myObject.parentNode.insertBefore(link, myObject);
           	                              break;
                 	            }  //if
                       	      	    }  //for
                       	    }  //if
                  }  //for  mycollection
           }  //if my collection
     	}  //if mycollection
}  //function

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
            CLTD1.innerHTML = "<I><B>Combat Level</B></I>";
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
	SkillsTD1.innerHTML = "<B>Total Level</B>";
	SkillsTD2 = document.createElement("td");
	SkillsTD2.innerHTML = "<B>"+addCommas(myLevels.toString())+"</B>";
	SkillsTD3 = document.createElement("td");
	SkillsTD3.innerHTML = "<B>"+addCommas(myXPs.toString())+"</B>";
	SkillsTD4 = document.createElement("td");
	SkillsTD4.innerHTML = "<B>"+addCommas((myXPs/myLevels).toFixed(2))+"<BR>(XP/Level)</B>";
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
      HousesTD1.innerHTML = "<B>Total</B>";
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
      ShopsTD1.innerHTML = "<B>Total</B>";
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
            myNXspan.innerHTML = "<B>"+myNXratio+" Hours Per Day.</B><BR>"
            myX.insertBefore(myNXspan, myBRs[3]);
 
            myKspan = document.createElement('span');
            myKspan.innerHTML = "<BR><B>Kill Ratio: "+myKratio+" Creatures Per Day.</B><BR>"
            myX.insertBefore(myKspan, myBRs[7]);
 
            rTR = document.createElement("tr");
            rTD1 = document.createElement("td");
            rTD1.innerHTML = "<B>Time Stats</B>";
            rTD2 = document.createElement("td");
            rTD2.innerHTML = "<B>"+addCommas((myLevels/myDays).toFixed(2).toString())+"<BR>(Levels/Day)</B>";
            rTD3 = document.createElement("td");
            rTD3.innerHTML = "<B>"+addCommas((myXPs/myTime).toFixed(2).toString())+"<BR>(XP/Hour)</B>";
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
	var trs = tbl.getElementsByTagName('tr');
	for (i=0;i<trs.length;i++) {
            try{
                 var plyr = trs[i].firstChild.firstChild;
		if (plyr.nextSibling.nextSibling.textContent.substr(1,1) == '[') {
			var clan = plyr.nextSibling.nextSibling;
			var clanName = clan.textContent.substr(2,clan.textContent.length-3);
			var clanNode = document.createElement('A');
			clanNode.textContent = clan.textContent;
			clanNode.setAttribute('onclick',"enterWindow=window.open('http://tlgrounds.com/showclan.php?tag="+clanName+"','','width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes'); return false;");
			clanNode.href = 'http://tlgrounds.com/showclan.php?tag='+clanName;
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
			msgNode.href="http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=" + plyr.textContent;
			msgNode.setAttribute('onclick','enterWindow=window.open(\'http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name=' + plyr.textContent + '\',\'Messages\',\'width=600,height=600,top=5,left=5,scrollbars=yes,resizable=yes\'); return false;');
			msgNode.target="_blank";
			msgNode.appendChild(image);
			plyr.parentNode.insertBefore(msgNode,plyr.nextSibling);
			plyr.parentNode.insertBefore(t,plyr.nextSibling);
               }
            }catch(err){}
	}
}

function chOptions() {
	if (myTable = document.getElementsByTagName('table')[2]) {
		mySep = document.createElement('hr');
		mySep.setAttribute('width', '90%');
		mySepTD = document.createElement('td');
		mySepTD.innerHTML = '<CENTER><B>Extra Chat Options</B></CENTER><SMALL><I><CENTER>These settings require refresh</CENTER></I></SMALL>';
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
    popTitle = document.getElementById('popupTitle');
    popMsg = document.getElementById('popupMessage');
    var indo = -1;
    try{
    	indo = popBox.getAttribute('style').indexOf("visibility: visible");
  }catch(err){}
    if (indo > -1) {
        popTitle.innerHTML = "<b>Multi-Message Popup</b>";
        popMsg.innerHTML = popMsg.innerHTML + "<br /><br /><hr><br />" + messageHTML;
    }else{
			   popBox.setAttribute('style','visibility: visible;');
	 		   popTitle.innerHTML = titleHTML;
			   popMsg.innerHTML = messageHTML;
    }
         if(isTamper) {
          modifyUserScriptLinks();
         }
}

var CSS = '.block { background-color: red; color:white; cursor:pointer;}'
		+ '.unblock { background-color: green; color:white; cursor:pointer;}'
		+ '#toggleblocked { display: block; cursor:pointer;}';
var blockedShops = GM_getValue('blockedShops','').split(',');
var shopTRXPath = '/html/body/table/tbody/tr/td[3]/table/tbody/tr/td/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td[2]/table/tbody/tr/td[2]/center/table/tbody/tr';
var shopIDRegexp = /\('shops', 'viewShop', '(.+)'\)/;
var resultIDRegexp = /\('shops', 'viewShop', '(.+)', 'back',/;

GM_addStyle(CSS);

var blockShops = function( ){
	
	var center = document.getElementById('LocationContent').firstChild;
	
	if ( document.getElementById('toggleblocked') || !center.firstChild || center.firstChild.innerHTML !== 'Shops'){
		return;
	}
	
	var shops = document.evaluate(shopTRXPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var toggleBlockedLink = document.createElement('a');
	toggleBlockedLink.innerHTML = 'Toggle Blocked Shops';
	toggleBlockedLink.id = 'toggleblocked';
	toggleBlockedLink.addEventListener("click", function( ){
		unsafeWindow.$$('.blocked').invoke('toggle');
	}, false);
	
	var shop;
	
	for ( i=1; i < shops.snapshotLength; i++ ) {
	
		shop = shops.snapshotItem(i);
		if (!shop){
			break;
		}
		
		if ( document.getElementById('shopSearchQ') ) {	
			renderSearchResult(shop);
		}
		else {
			renderShop(shop);
		}
	}
	
	center.insertBefore(toggleBlockedLink, center.childNodes[5]);
	unsafeWindow.$$('.blocked').invoke('hide');
};

var renderShop = function( shop ){
	var shopID = shop.firstChild.innerHTML.match(shopIDRegexp);
	
	if (!shopID){
		return;
	}
	
	var link = document.createElement('a');
	
	if (blockedShops.indexOf(shopID[1]) !== -1) {
		link.innerHTML = '[--]';
		link.className = 'unblock';
		link.addEventListener("click", function( ){
			unBlockShop(shopID[1]);
			renderShop(shop);
			shop.style.display = 'auto';
		}, false);

		shop.className = 'blocked';
		if (shop.firstChild.firstChild.className) {
			shop.firstChild.removeChild(shop.firstChild.firstChild);
		}
		shop.firstChild.insertBefore(link, shop.firstChild.firstChild);
	}
	else {
		link.innerHTML = '[X]';
		link.className = 'block';
		link.addEventListener("click", function( ){
			blockShop(shopID[1]);
			renderShop(shop);
			shop.style.display = 'none';
		}, false);
	
		shop.className = 'unblocked';
		if (shop.firstChild.firstChild.className) {
			shop.firstChild.removeChild(shop.firstChild.firstChild);
		}
		shop.firstChild.insertBefore(link, shop.firstChild.firstChild);
	}
}

var renderSearchResult = function( shop ){
	var shopID = shop.lastChild.innerHTML.match(resultIDRegexp);
	
	if (!shopID){
		return;
	}
	
	if (blockedShops.indexOf(shopID[1]) !== -1) {
		shop.className = 'blocked';
	}
	else {
		shop.className = 'unblocked';
	}
}

var blockShop = function( shopID ){
	blockedShops.push(shopID);
	GM_setValue('blockedShops',blockedShops.join(','));
};

var unBlockShop = function( shopID ){
	blockedShops.splice(blockedShops.indexOf(shopID), 1);
	GM_setValue('blockedShops',blockedShops.join(','));
};

unsafeWindow.setInterval(blockShops,1000);


(function() {
var css = "/* // ==UserStyle== // @name Syrnia Item Info [Food Only] // @author Veridis // @description Adds hp to food in combat and inventory only. // @license Creative Commons Attribution License // @version 1.0 // @released 2009-01-30 // @updated 2009-01-30 // ==/UserStyle== */ @namespace url(http://www.w3.org/1999/xhtml); /*default items*/ [title]:after { color:red; border-left: 1px solid white; margin-left: 3px; padding-left: 3px; } /* // Colours */ /*Food is cyan*/ [title~=\"Cooked\"]:after, [title=\"Beet\"]:after, [title=\"Cabbage\"]:after, [title=\"Corn\"]:after, [title=\"Cucumber\"]:after, [title=\"Eggplant\"]:after, [title=\"Green pepper\"]:after, [title=\"Onion\"]:after, [title=\"Radishes\"]:after, [title=\"Spinach\"]:after, [title=\"Strawberry\"]:after, [title=\"Tomato\"]:after, [title=\"Beer\"]:after, [title=\"Bread\"]:after, [title=\"Carrots\"]:after, [title=\"Elven Cocktail\"]:after, [title=\"Keg of Rum\"]:after , [title=\"Pumpkin\"]:after { color:cyan; } /* // Info */ /*Uncooked but edible food*/ [title=\"Beet\"]:after { content: '1'; } [title=\"Cabbage\"]:after { content: '3'; } [title=\"Corn\"]:after { content: '6'; } [title=\"Cucumber\"]:after { content: '11'; } [title=\"Eggplant\"]:after { content: '10'; } [title=\"Green pepper\"]:after { content: '8'; } [title=\"Onion\"]:after { content: '4'; } [title=\"Radishes\"]:after { content: '1'; } [title=\"Spinach\"]:after { content: '9'; } [title=\"Strawberry\"]:after { content: '7'; } [title=\"Tomato\"]:after { content: '5'; } [title=\"Beer\"]:after { content: '0'; } [title=\"Bread\"]:after { content: '3'; } [title=\"Carrots\"]:after { content: '2'; } [title=\"Elven Cocktail\"]:after { content: '1'; } [title=\"Keg of Rum\"]:after { content: '0'; } [title=\"Pumpkin\"]:after { content: '12'; } /*Cooked Food*/ [title=\"Cooked Bass\"]:after { content: '13'; } [title=\"Cooked Catfish\"]:after { content: '5'; } [title=\"Cooked Cod\"]:after { content: '7'; } [title=\"Cooked Frog\"]:after { content: '2'; } [title=\"Cooked Giant catfish\"]:after { content: '10'; } [title=\"Cooked Herring\"]:after { content: '5'; } [title=\"Cooked Lobster\"]:after { content: '12'; } [title=\"Cooked Mackerel\"]:after { content: '6'; } [title=\"Cooked Pike\"]:after { content: '8'; } [title=\"Cooked Piranha\"]:after { content: '3'; } [title=\"Cooked Salmon\"]:after { content: '9'; } [title=\"Cooked Sardine\"]:after { content: '4'; } [title=\"Cooked Saurus meat\"]:after { content: '16'; } [title=\"Cooked Shark\"]:after { content: '15'; } [title=\"Cooked Shrimps\"]:after { content: '2'; } [title=\"Cooked Swordfish\"]:after { content: '14'; } [title=\"Cooked Trouts\"]:after { content: '7'; } [title=\"Cooked Tuna\"]:after { content: '10'; } [title=\"Cooked Queen spider meat\"]:after { content: '6'; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

//Remove google search on main page
if (location.href.search(/game.php/) != -1) {
	document.getElementById('googleSearchContainer').style.display='none';
}

tables = document.getElementsByTagName('table');
for(i = 0, l = tables.length; i<l; i++)
{
	if (window.location.pathname == "/theGame/includes2/clan.php") //Apply styles for clan
	{
		if (tables[i].parentNode.tagName == 'FORM')
		{
			tables[i].style.width = '100%';
		}
	}
	else if (window.location.pathname == "/theGame/mainincludes/forum.php") //Apply styles for forum
	{
		if (tables[i].parentNode.tagName == 'FORM')
		{
			tables[i].style.width = '100%'; //make inner table fill the outer table
		}
		else
			tables[i].style.width = '100%'; //make inner table the width that we want 
	}
	else if (window.location.pathname == "/theGame/includes2/messages.php") //Apply styles for messages
	{
		if (tables[i].bgColor == '#cdbfa1')
		{
			tables[i].style.width = '100%'; //Make the send message table the width we want
		}
	}
}

textareas = document.getElementsByTagName('textarea');
for(i = 0, l = textareas.length; i<l; i++)
{
	textareas[i].style.width = '100%'; //Makes all textarea's fill the width of the table
}

parent = document.getElementById("moveMap").parentNode;
parent.innerHTML = "<a href=\"http://www.syrnia.com/index.php?page=logout\" id=playerlogout><CENTER><b>Logout</b></a>" + parent.innerHTML;
$('playerlogout').style.backgroundColor = "black";
$('playerlogout').style.color="#e7c720";

// UPDATE SCRIPTS
function CheckForUpdates(name,version,id) {
	var titleHTML = '<b>Update Available</b>';
	var msgHTML =  'Do you want to update the ' + name + ' script? <br><a onclick="$(\'messagePopup\').style.visibility=\'hidden\';return false;" href=\'http://userscripts.org/scripts/source/'+id+'.user.js\'>Install the updated script!</a>'
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
var userscript = ".user.js";
var visible = 'position:relative; top: 2px; left: -3px; height: 16px; width: 16px;';
var cvisible = 'position:relative; top: 2px; left: 3px; height: 16px; width: 16px;';
var invisible = 'display: none';        
var tamperScriptClickHandler = function(url, nat, delem, ielem, celem) {
    if (nat) {
        GM_notification("Open script to install as Chrome extension :(", null, "", null, 5000);
        window.location = url;
    } else {
        var cb = function(resp) {
            var msg = '';
            if (resp.found) {
                if (resp.installed) {
                    msg = "Script loaded and installed";
                } else {
                    msg = "Script loaded but not installed :(";
                    if (ielem) ielem.setAttribute('style', visible);
                    if (celem) celem.setAttribute('style', cvisible);
                }
            } else {
                msg = "Error loading script :(";
            }
            GM_notification(msg, null, "", null, 5000);
            if (delem) delem.setAttribute('style', invisible);
        };
        GM_notification("Fetching script...", "TamperScript", "", null, 5000);
        GM_installScript(url, cb);
    }
};

var modifyUserScriptLinks = function() {
   try{
 var aarr = document.getElementsByTagName('a');
    for (var k=0; k<aarr.length; k++) {
        var a = aarr[k];
        if (a.href && a.href.search(userscript) != -1) {
            var d = document.createElement('img');
            d.src = TM_getResourceURL('down');
            d.setAttribute('style', invisible);
            d.setAttribute('id', 'TM_download_' + k);
            var i = document.createElement('img');
            i.src = TM_getResourceURL('icon');
            i.setAttribute('style', visible);
            i.setAttribute('id', 'TM_install_' + k);
            var c = document.createElement('img');
            c.src = 'http://www.google.com/images/icons/product/chrome-16.png';
            c.setAttribute('style', cvisible);
            c.setAttribute('id', 'TM_chrome_' + k);

            var install = function () {
                var d = document.getElementById('TM_download_' + this.idx);
                var i = document.getElementById('TM_install_' + this.idx);
                var c = document.getElementById('TM_chrome_' + this.idx);
                d.setAttribute('style', visible);
                if (i) i.setAttribute('style', invisible);
                if (c) c.setAttribute('style', invisible);
                tamperScriptClickHandler(this.tamper, null, d, i, c);
            };
            var narf = function () {
                tamperScriptClickHandler(this.tamper, true);
            };

            var prepareNode = function(idx, n, fn, comment) {
                if (comment == undefined) comment = 'Tampermonkey! :)';
                n.addEventListener('click', fn);
                n.tamper = a.href;
                n.idx = idx;
                n.title = comment;
            };

            if ((window.location.host == 'userscripts.org' ||
                 window.location.host == 'webcache.googleusercontent.com') &&
                a.getAttribute('class') == 'userjs') {
                var v = document.createElement('span');
                var cn = a.childNodes[0];
                prepareNode(k, v, install, null);
                prepareNode(k, i, install);
                prepareNode(k, c, narf, 'Native Extension :(');
                a.appendChild(d);
                a.appendChild(i);
                a.appendChild(v);
                a.appendChild(c);
                a.removeChild(cn);
                v.appendChild(cn);
            } else {
                prepareNode(k, a, install);
                a.insertBefore(d, a.childNodes[0]);
                a.title = 'Tampermonkey! :)';
            }
            a.href = 'javascript://nop/';
        }
    }
}catch(err){alert(err);}
}