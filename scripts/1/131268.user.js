// ==UserScript==
// @author         D.Ryu
// @name           Ghost Trappers Companion Companion
// @description    A simple, minimalistic script that adds useful information to the Ghost Trappers companion page.
// @version        1.49
// @changes        +updated known gift values, up to Chinchilla
// @namespace      Ryu/GTCC
// @include        http://www.ghost-trappers.com/fb/setup.php?type=companion*
// @include        http://gt-1.diviad.com/fb/setup.php?type=companion*
// @include        https://www.ghost-trappers.com/fb/setup.php?type=companion*
// @include        https://gt-1.diviad.com/fb/setup.php?type=companion*
// ==/UserScript==
VERSION = 1.49;

var startTime = new Date().getTime();
checkForUpdate(startTime);


getGiftResult();
annotateXpBar();
annotateLoveBar();
sortPresents();


var endTime = new Date().getTime();
GM_log('execution time: '+(endTime-startTime)+' ms');


// add info above XP bar, if applicable
function annotateXpBar() {
	// nothing needed if max level
	var lv = getPetLevel();
	if (lv == 5) return;
	
	// read companion XP info
	var xp = getXpBar();
	var pt = getPetTrainer();
	
	// generate detailed companion XP info
	var hunts = [500,500,1500,2500];
	// remaining hunts for current level
	var remHunts = Math.round(hunts[lv-1]*(1-xp));
	// remaining hunts until level 5
	var totalHunts = remHunts;
	for (var i = lv; i < 4; i++) {
		totalHunts += hunts[i];
	}
	var message = "Current progress: " + round(xp*100,2) + "% = " +
					remHunts + " hunts remaining to level "+(lv+1)+"." + 
					(pt == 0 ? "" : "<br>Expected ~" +
					Math.ceil(remHunts/(1+pt/100)) +
					" with current pet trainer ("+pt+"%).") +
					(lv == 4 ? "<br><br>" : "<br><br>" + totalHunts + " until level 5." +
					(pt == 0 ? "" : " ~" + Math.ceil(totalHunts/(1+pt/100)) +
					" with current pet trainer."));
	
	// insert info after companion image
	var messageEl = document.createElement('div');
	messageEl.innerHTML = "<center>"+message+"</center>";
	insertAfter(messageEl,document.getElementsByClassName('bigImage')[0]);
	messageEl = null;
}

// add info to love bar, if applicable
function annotateLoveBar() {
	// nothing needed if not level 5
	if (getPetLevel() < 5) return;
	
	// read love bar info
	var love = getLoveBar();
	if (love == 1) return;
	// generate detailed love info
	var message = "<center>"+round(love*100,2) +"% = "+Math.round(3000*(1-love))+" points remaining</center>";
	// insert under progress bar
	document.getElementsByClassName('companionEmptyLikeBar')[0].innerHTML += message;
}

// sort presents by value
function sortPresents() {
	// no presents if not level 5
	if (getPetLevel() < 5) return;
	// do nothing if love bar full
	if (getLoveBar() == 1) return;
	
	// get companion id
	var cID = getCompanion();
	// array of 36 presents' values, 0-based
	var valueArray = getGiftValues(cID);
	
	// find presents
	var giftEl = [];
	// iterate over gifts
	for (var i = 0; (el = document.getElementsByClassName('smallPresentInput')[i]); i++) {
		// parse gift ID
		var gID = /value="(\d+)"/.exec(el.innerHTML);
		// parse quantity + name
		var info = /^(\d+)x ([\w\s]+)/.exec(document.getElementsByClassName('smallPresentText')[i].innerHTML);
		// associate gID with name
		var knownId = getGiftId(info[2]);
		var readId = parseInt(gID[1],10);
		if (knownId == null || knownId != readId) recordGiftInfo(readId,info[2],"","");
		// value of this present
		var value = (valueArray.length >= readId ? valueArray[readId-1] : -1);
		// append value to gift name, (?) if unknown
		document.getElementsByClassName('smallPresentText')[i].innerHTML += 
			(value > -1 ? " ("+value+")" : " <b>(?)</b>");
		// build array for sorting; unknown before known 0s
		giftEl.push({el:document.getElementsByClassName('smallPresent')[i],
						value:(value == -1 ? 1 : value), quantity:parseInt(info[1],10), order:i});
		// fade image of disliked presents
		if (value == 0)
			document.getElementsByClassName('smallPresentImage')[i].className += " inactiveStats";
	}
	
	// sort by value, descending, if helpful
	if (giftEl.length > 1) {
		// get present list
		var parentNode = document.getElementById('companionPresentsList');
		var formNode = parentNode.firstChild;
		while (formNode.nodeType != 1) { formNode = formNode.nextSibling };
		// edit offline
		parentNode.removeChild(formNode);
		
		// sort gifts, first by value, then by quantity
		giftEl.sort(function(a,b){return 100*(a.value-b.value)+(b.order-a.order)});
		
		// insert gift elements in new order
		var n;
		while (n = giftEl.pop()) {
			formNode.appendChild(n.el);
		}
		
		// move "give presents" button from bottom right to top left
		var giveEl = formNode.getElementsByTagName('input')[3];
		if (giveEl != null) {
			giveEl.style.cssFloat = "left";
			giveEl.style.marginRight = "350px";
			giveEl = null;
		}
		
		// return online
		parentNode.appendChild(formNode);
		anchorEl = null; formNode = null; parentNode = null;
	}
	giftEl = null;
	
	// make present image boxes slightly taller space for extra text
	GM_addStyle(".smallPresent { height: 135px!important; }"); 
}

// return xp progress bar
function getXpBar() {
	return getBarProgress('companionFullBar');
}

// returns love progress bar
function getLoveBar() {
	// bar full?
	var full = document.getElementsByClassName('companionLikesYou')[0];
	if (full) return 1;
	
	return getBarProgress('companionLikeFullBar');
}

// returns fraction of given progress bar (0-1)
function getBarProgress(barName) {
	// get bar element
	var el = document.getElementsByClassName(barName)[0];
	if (el == null) return 0;
	// parse float
	var match = /[-+]?([0-9]*\.[0-9]+|[0-9]+)/.exec(el.outerHTML);
	el = null;
	if (match == null) return null;
	
	// ensure float for calculation
	var f = parseFloat(match[0]);
	return (f == 200 ? 1 : (f-4)/192);
}

// returns current pet trainer percentage
function getPetTrainer() {
	var el = document.getElementById('petRightContainer');
	if (el == null) return 0;
	
	// match text
	var match = /Your companion will level (\d+)\% faster/.exec(el.innerHTML);
	el = null;
	return (match == null ? 0 : parseInt(match[1],10));
}

// returns current pet level
function getPetLevel() {
	var el = document.getElementsByClassName('companionHeadLine')[0];
	if (el == null) return 0;
	
	var match = /level_(\d).jpg/.exec(el.innerHTML);
	el = null;
	return parseInt(match[1],10);
}

// returns currently-armed companion
function getCompanion() {
	// get id off rename textbox
	var el = document.getElementsByClassName('newNameInput')[0];
	if (el == null) return 0;
	
	var match = /name="companion_id" value="(\d+)"/.exec(el.innerHTML);
	el = null;
	return parseInt(match[1],10);
}

// returns array of companion ids, in current order
function getCompanions() {
	var list = [];
	var el, match, i=0;
	var regex = /companion_id=(\d+)/;
	// loop is faster than global regex search over parent container
	while (el = document.getElementsByClassName('switchButton')[i]) {
		match = regex.exec(el.innerHTML);
		list.push(parseInt(match[1],10));
		i++;
	}
	return list;
}

// checks for gift given result
function getGiftResult() {
	var el = document.getElementsByClassName('companionPresentMessage')[0];
	if (el == null) return;
	
	// ex: Your companion liked xx. xx points were added to the love bar. (xx points from Love boost.)
	var regex = /Your companion (?:liked|didn't like) ([\w\s]+)\.(?: )?(\d+)?/;
	var bonus = /(\d+) points from Love boost/;
	var message = el.innerHTML;
	var match = regex.exec(message);
	// no gift given
	if (match == null) return;
	var bMatch = bonus.exec(message);
	
	// companion ID
	var cID = getCompanion();
	
	// determine base points
	var points = (match[2] == null ? 0 : parseInt(match[2],10));
	var bonus = (bMatch == null ? 0 : parseInt(bMatch[1],10));
	recordGiftInfo("",match[1],cID,points-bonus);
}

// maps gift name to gift id
function getGiftId(name) {
	// switch faster than associative array
	switch (name) {
		case 'Ruby':			return 2;
		case 'Sapphire':		return 3;
		case 'Emerald':			return 4;
		case 'Diamond':			return 5;
		case 'Beryll':			return 6;
		case 'Opal':			return 7;
		case 'Earrings':		return 8;
		case 'Bracelet':		return 9;
		case 'Tie':				return 10;
		case 'Watch':			return 11;
		case 'Necklace':		return 12;
		case 'Scarf':			return 13;
		case 'Cupcake':			return 14;
		case 'Chocolate':		return 15;
		case 'Jelly beans':		return 16;
		case 'Lollipop':		return 17;
		case 'Bubblegum':		return 18;
		case 'Donut':			return 19;
		case 'Ball':			return 20;
		case 'Tin soldier':		return 21;
		case 'Puzzle':			return 22;
		case 'Bricks':			return 23;
		case 'Stuffed animal':	return 24;
		case 'Toy Car':			return 25;
		case 'Roses':			return 26;
		case 'Lavender':		return 27;
		case 'Tulips':			return 28;
		case 'Daisy':			return 29;
		case 'Carnation':		return 30;
		case 'Violet':			return 31;
		case 'Chypre':			return 32;
		case 'Fougere':			return 33;
		case 'Oriental':		return 34;
		case 'Sport fragrance':	return 35;
		case 'Gourmand':		return 36;
		case 'Aquatic':			return 37;
		default:				return null;
	}
}

// return array of gift values for a given companion
function getGiftValues(cID) {
	// switch faster than defining / indexing full matrix
	switch (cID) {
		case 1:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,15,25,5,30,10,20,50,55,35,40,60,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 2:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,15,25,5,30,10,20,50,55,35,40,60,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 3:
			return [-1,0,0,0,0,0,0,25,20,10,5,15,30,0,0,0,0,0,0,60,40,35,55,50,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 4:
			return [-1,0,0,0,0,0,0,25,20,10,5,15,30,0,0,0,0,0,0,60,40,35,55,50,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 5:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,25,15,30,5,20,10,0,0,0,0,0,0,40,35,55,60,45,50,0,0,0,0,0,0];
		case 6:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,25,15,30,5,20,10,0,0,0,0,0,0,40,35,55,60,45,50,0,0,0,0,0,0];
		case 7:
			return [-1,45,40,55,50,60,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,15,30,5,25,20,0,0,0,0,0,0];
		case 8:
			return [-1,45,40,55,50,60,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,15,30,5,25,20,0,0,0,0,0,0];
		case 9:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,60,55,35,40,45,50,0,0,0,0,0,0,15,25,5,30,10,20,0,0,0,0,0,0];
		case 10:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,60,55,35,40,45,50,0,0,0,0,0,0,15,25,5,30,10,20,0,0,0,0,0,0];
		case 11:
			return [-1,0,0,0,0,0,0,20,25,5,10,30,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,40,35,50,45,55];
		case 12:
			return [-1,0,0,0,0,0,0,20,25,5,10,30,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,40,35,50,45,55];
		case 13:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,40,60,55,45,35,50,0,0,0,0,0,0,25,5,20,10,15,30,0,0,0,0,0,0];
		case 14:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,40,60,55,45,35,50,0,0,0,0,0,0,25,5,20,10,15,30,0,0,0,0,0,0];
		case 15:
			return [-1,35,55,40,60,45,50,5,10,20,15,25,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 16:
			return [-1,35,55,40,60,45,50,5,10,20,15,25,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 17:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,55,60,50,40,45,0,0,0,0,0,0,25,5,20,30,10,15];
		case 18:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,55,60,50,40,45,0,0,0,0,0,0,25,5,20,30,10,15];
		case 19:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,15,5,10,30,20,50,45,40,55,60,35,0,0,0,0,0,0];
		case 20:
			return [-1,60,35,50,55,45,40,0,0,0,0,0,0,30,5,25,15,20,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 21:
			return [-1,0,0,0,0,0,0,25,20,10,5,15,30,0,0,0,0,0,0,0,0,0,0,0,0,45,50,40,35,60,55,0,0,0,0,0,0];
		case 23:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,5,15,25,20,30,10,35,40,55,50,45,60,0,0,0,0,0,0,0,0,0,0,0,0];
		case 24:
			return [-1,0,0,0,0,0,0,10,5,30,20,15,25,0,0,0,0,0,0,0,0,0,0,0,0,40,55,35,60,50,45,0,0,0,0,0,0];
		case 25:
			return [-1,0,0,0,0,0,0,5,20,10,15,25,30,0,0,0,0,0,0,0,0,0,0,0,0,40,35,60,55,45,50,0,0,0,0,0,0];
		case 26:
			return [-1,35,40,60,50,55,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,5,25,10,15,30];
		case 27:
			return [-1,0,0,0,0,0,0,10,15,30,20,25,5,0,0,0,0,0,0,60,45,35,40,55,50,0,0,0,0,0,0,0,0,0,0,0,0];
		case 28:
			return [-1,60,35,45,55,40,50,30,25,10,15,20,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 29:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,15,20,5,10,25,40,45,35,50,60,55];
		case 30:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,15,5,10,20,25,50,40,35,60,55,45,0,0,0,0,0,0];
		case 31:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,10,5,25,15,20,30,60,40,35,55,45,50,0,0,0,0,0,0,0,0,0,0,0,0];
		case 32:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,35,40,55,50,45,10,15,5,20,25,30,0,0,0,0,0,0];
		case 33:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,50,45,60,40,35,55,30,15,20,10,25,5,0,0,0,0,0,0,0,0,0,0,0,0];
		case 34:
			return [-1,40,45,35,55,50,60,15,10,20,5,25,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 35:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,60,55,45,50,40,30,15,5,20,10,25];
		case 36:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,10,5,25,20,15,0,0,0,0,0,0,55,50,35,45,40,60];
		case 37:
			return [-1,5,20,30,15,10,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,50,45,60,40,55,35,0,0,0,0,0,0];
		case 38:
			return [-1,50,55,45,40,60,35,0,0,0,0,0,0,0,0,0,0,0,0,20,15,10,5,25,30,0,0,0,0,0,0,0,0,0,0,0,0];
		case 39:
			return [-1,60,35,45,55,40,50,0,0,0,0,0,0,5,10,15,30,25,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 40:
			return [-1,60,50,40,55,35,45,5,25,15,30,10,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 41:
			return [-1,30,5,10,25,15,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,45,60,50,40,35];
		case 42:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,55,60,40,35,50,45,0,0,0,0,0,0,5,10,30,20,15,25,0,0,0,0,0,0];
		case 43:
			return [-1,20,10,15,25,5,30,40,45,55,60,50,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 44:
			return [-1,0,0,0,0,0,0,25,20,10,5,15,30,0,0,0,0,0,0,60,40,35,55,50,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 45:
			return [-1,0,0,0,0,0,0,45,40,55,50,60,35,0,0,0,0,0,0,0,0,0,0,0,0,20,10,15,5,25,30,0,0,0,0,0,0];
		case 46:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,25,15,30,5,20,10,0,0,0,0,0,0,40,35,55,60,45,50,0,0,0,0,0,0];
		case 47:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,60,50,35,45,40,55,0,0,0,0,0,0,0,0,0,0,0,0,10,25,30,15,20,5];
		case 48:
			return [-1,0,0,0,0,0,0,30,25,-1,-1,20,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,45,60,55,50,35];
		case 49:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,10,30,5,25,20,15,0,0,0,0,0,0,0,0,0,0,0,0,40,55,45,50,60,35];
		case 50:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,35,50,40,55,60,30,20,25,5,10,15];
		case 51:
			return [-1,45,50,35,60,40,55,20,5,30,10,15,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 52:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,50,60,55,40,35,45,0,0,0,0,0,0,25,15,20,5,10,30,0,0,0,0,0,0];
		case 53:
			return [-1,0,0,0,0,0,0,30,5,15,20,25,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,45,55,40,50,35];
		case 54:
			return [-1,55,40,50,45,60,35,0,0,0,0,0,0,25,10,20,5,30,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 55:
			return [-1,45,50,40,60,35,55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,15,5,10,30,20];
		case 56:
			return [-1,5,10,20,25,15,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,50,40,60,55,45,0,0,0,0,0,0];
		case 57:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,15,25,5,30,10,20,50,55,35,40,60,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 58:
			return [-1,55,40,50,60,35,45,0,0,0,0,0,0,0,0,0,0,0,0,5,20,10,15,30,25,0,0,0,0,0,0,0,0,0,0,0,0];
		case 59:
			return [-1,0,0,0,0,0,0,35,50,55,40,45,60,15,20,5,10,25,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 60:
			return [-1,0,0,0,0,0,0,5,10,30,25,15,20,0,0,0,0,0,0,40,35,60,45,50,55,0,0,0,0,0,0,0,0,0,0,0,0];
		case 61:
			return [-1,5,20,10,30,15,25,0,0,0,0,0,0,0,0,0,0,0,0,60,35,50,55,40,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 62:
			return [-1,15,10,30,20,5,25,0,0,0,0,0,0,35,40,45,50,55,60,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 63:
			return [-1,0,0,0,0,0,0,20,25,10,5,30,15,50,55,60,35,40,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 64:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,40,45,50,55,60,35,0,0,0,0,0,0,5,15,10,25,30,20,0,0,0,0,0,0];
		case 65:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,45,50,55,60,35,40,0,0,0,0,0,0,0,0,0,0,0,0,25,30,20,5,15,10];
		case 66:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,55,60,35,40,45,50,20,10,5,25,30,15,0,0,0,0,0,0,0,0,0,0,0,0];
		case 67:
			return [-1,0,0,0,0,0,0,5,10,30,25,15,20,0,0,0,0,0,0,40,35,60,45,50,55,0,0,0,0,0,0,0,0,0,0,0,0];
		case 68:
			return [-1,5,10,30,15,20,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,50,45,60,40,55,35,0,0,0,0,0,0];
		case 69:
			return [-1,60,55,40,35,50,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,10,20,5,30,15];
		case 70:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,50,45,55,40,60,35,25,20,15,5,10,30,0,0,0,0,0,0,0,0,0,0,0,0];
		case 72:
			return [-1,35,55,45,40,50,60,0,0,0,0,0,0,0,0,0,0,0,0,30,25,15,10,20,5,0,0,0,0,0,0,0,0,0,0,0,0];
		case 73:
			return [-1,5,20,10,30,15,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,35,45,60,50,40];
		case 74:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,25,15,5,10,20,60,55,40,50,45,35];
		case 75:
			return [-1,0,0,0,0,0,0,30,25,10,15,20,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,40,50,55,35,60];
		case 76:
			return [-1,50,45,55,60,35,40,0,0,0,0,0,0,5,15,25,20,30,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 77:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,15,25,5,30,10,20,50,55,35,40,60,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 79:
			return [-1,30,10,5,15,25,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,60,50,40,55,35,45];
		case 80:
			return [-1,0,0,0,0,0,0,5,25,15,10,30,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,50,40,55,35,45,60];
		case 81:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,15,5,25,20,30,55,35,45,60,50,40];
		case 82:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,30,20,5,10,25,40,55,35,45,60,50];
		case 83:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,50,60,55,40,35,45,0,0,0,0,0,0,25,15,20,5,10,30,0,0,0,0,0,0];
		case 85:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,50,60,55,40,35,45,0,0,0,0,0,0,25,15,20,5,10,30,0,0,0,0,0,0];
		case 86:
			return [-1,35,40,55,50,60,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,10,25,20,15,30,0,0,0,0,0,0];
		case 87:
			return [-1,40,60,55,50,45,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,25,5,10,30,15,0,0,0,0,0,0];
		case 88:
			return [-1,30,5,10,20,25,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,45,60,50,40,55];
		case 89:
			return [-1,55,35,40,45,60,50,10,25,5,30,15,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 90:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,10,5,25,20,15,60,40,45,55,50,35,0,0,0,0,0,0];
		case 91:
			return [-1,35,40,55,50,60,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,10,25,20,15,30,0,0,0,0,0,0];
		case 92:
			return [-1,0,0,0,0,0,0,25,20,10,5,15,30,0,0,0,0,0,0,60,40,35,55,50,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 93:
			return [-1,5,10,15,20,25,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,55,60,35,50,40,0,0,0,0,0,0];
		case 96:
			return [-1,50,35,45,40,55,60,25,10,15,20,5,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 97:
			return [-1,25,30,20,5,15,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,50,35,55,40,60,0,0,0,0,0,0];
		case 98:
			return [-1,0,0,0,0,0,0,35,45,40,60,55,50,20,25,10,15,5,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 99:
			return [-1,45,60,50,35,40,55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,5,20,30,10,15];
		case 100:
			return [-1,40,55,50,60,45,35,0,0,0,0,0,0,0,0,0,0,0,0,10,20,30,25,5,15,0,0,0,0,0,0,0,0,0,0,0,0];
		case 101:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,20,10,15,30,25,0,0,0,0,0,0,45,60,50,40,55,35];
		case 102:
			return [-1,0,0,0,0,0,0,5,15,25,20,10,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,50,40,45,60,55];
		case 103:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,5,30,20,15,25,10,60,45,50,35,40,55,0,0,0,0,0,0,0,0,0,0,0,0];
		case 104:
			return [-1,60,50,35,55,45,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,20,15,30,25,10];
		case 105:
			return [-1,40,45,60,35,55,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,20,15,5,10,25,0,0,0,0,0,0];
		case 106:
			return [-1,0,0,0,0,0,0,5,15,25,20,10,30,0,0,0,0,0,0,50,55,35,40,60,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 107:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,30,25,20,15,5,10,0,0,0,0,0,0,0,0,0,0,0,0,60,50,40,55,35,45];
		case 108:
			return [-1,35,45,50,60,40,55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,20,5,10,15,30];
		case 109:
			return [-1,0,0,0,0,0,0,25,20,10,5,15,30,0,0,0,0,0,0,60,40,35,55,50,45,0,0,0,0,0,0,0,0,0,0,0,0];
		case 110:
			return [-1,35,30,20,5,40,60,55,50,25,45,15,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 111:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,30,15,20,10,60,40,25,50,55,5,45,35,0,0,0,0,0,0,0,0,0,0,0,0];
		case 112:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,15,20,50,25,55,40,45,35,10,60,5];
		case 113:
			return [-1,55,30,20,50,60,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,45,35,10,25,5,0,0,0,0,0,0];
		case 114:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,20,45,5,15,60,55,40,35,25,30,50,10,0,0,0,0,0,0,0,0,0,0,0,0];
		case 115:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,15,20,50,25,55,40,45,35,10,60,5];
		case 116:
			return [-1,0,0,0,0,0,0,10,30,5,60,35,45,0,0,0,0,0,0,50,15,20,40,25,60,0,0,0,0,0,0,0,0,0,0,0,0];
		case 117:
			return [-1,0,0,0,0,0,0,45,60,55,35,50,40,0,0,0,0,0,0,10,30,5,25,15,20,0,0,0,0,0,0,0,0,0,0,0,0];
		case 118:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,60,50,40,35,45,55,0,0,0,0,0,0,0,0,0,0,0,0,5,15,20,10,25,30];
		case 119:
			return [-1,0,0,0,0,0,0,30,10,25,5,15,20,0,0,0,0,0,0,35,55,50,60,45,40,0,0,0,0,0,0,0,0,0,0,0,0];
		case 120:
			return [-1,30,10,20,5,15,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,50,55,35,45,40,60,0,0,0,0,0,0];
		case 121:
			return [-1,0,0,0,0,0,0,60,40,50,35,45,55,30,5,25,15,10,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 122:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,55,40,60,45,50,35,30,10,25,5,15,20,0,0,0,0,0,0,0,0,0,0,0,0];
		case 123:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,15,30,10,25,20,50,40,60,35,55,45];
		case 124:
			return [-1,60,55,40,35,45,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,10,15,5,20,30];
		case 125:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,10,25,5,20,30,45,35,55,50,40,60];
		case 126:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,60,35,20,25,55,30,0,0,0,0,0,0,10,5,15,40,45,50,0,0,0,0,0,0];
		case 127:
			return [-1,15,35,55,45,20,5,25,40,30,10,60,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 128:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,20,60,10,-1,40,55,50,30,-1,25,15];
		case 129:
			return [-1,25,60,5,45,30,15,0,0,0,0,0,0,0,0,0,0,0,0,55,35,50,40,10,20,0,0,0,0,0,0,0,0,0,0,0,0];
		case 130:
			return [-1,0,0,0,0,0,0,40,60,5,25,20,55,35,15,30,10,50,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 131:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,45,30,35,50,10,5,40,55,15,25,60,20,0,0,0,0,0,0,0,0,0,0,0,0];
		case 132:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,35,40,60,30,5,15,10,50,20,25,45];
		case 133:
			return [-1,0,0,0,0,0,0,20,55,10,25,40,60,45,50,30,35,5,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 134:
			return [-1,50,30,35,25,20,60,0,0,0,0,0,0,0,0,0,0,0,0,5,10,45,15,55,40,0,0,0,0,0,0,0,0,0,0,0,0];
		case 135:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,45,40,60,55,25,10,5,50,20,35,30];
		case 136:
			return [-1,55,30,20,25,60,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,40,15,50,35,45];
		case 137:
			return [-1,40,5,50,45,15,60,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,30,55,35,25,10,0,0,0,0,0,0];
		case 138:
			return [-1,0,0,0,0,0,0,10,40,5,20,35,60,0,0,0,0,0,0,15,30,55,25,45,50,0,0,0,0,0,0,0,0,0,0,0,0];
		case 139:
			return [-1,0,0,0,0,0,0,50,40,55,5,20,60,0,0,0,0,0,0,10,15,35,45,30,25,0,0,0,0,0,0,0,0,0,0,0,0];
		case 140:
			return [-1,50,40,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,5,55,35,60,45];
		case 141:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,10,45,30,50,20,15,25,35,60,55,40,5,0,0,0,0,0,0,0,0,0,0,0,0];
		case 142:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,25,50,45,10,20,55,60,5,15,35,40,30];
		case 143:
			return [-1,25,45,15,10,5,35,0,0,0,0,0,0,60,55,50,30,20,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 144:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,40,35,55,25,30,0,0,0,0,0,0,45,10,50,60,5,20];
		case 145:
			return [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,35,15,20,50,30,60,55,10,40,25,45,0,0,0,0,0,0];
		case 146:
			return [-1,0,0,0,0,0,0,35,5,45,40,10,50,0,0,0,0,0,0,30,60,25,20,15,55,0,0,0,0,0,0,0,0,0,0,0,0];
		case 147:
			return [-1,20,40,25,35,55,10,5,45,30,60,15,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		case 148:
			return [-1,30,50,15,60,5,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,20,35,55,40,45];
		case 150:
			return [-1,0,0,0,0,0,0,60,40,30,55,20,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,45,5,50,10,35];
		case 151:
			return [-1,55,50,40,25,30,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,60,-1,15];
		case 152:
			return [-1,5,30,25,60,40,45,55,50,35,10,15,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		default:
			return [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	}
}

// records unknown/incorrect gift info for future updates
function recordGiftInfo(gID,name,cID,love) {
	// gID + name (only): new gift type?
	if (gID>0) {
		// if gift name known, do nothing
		if (getGiftId(name) == gID) return;
	// name + cID + love: gifting result
	} else {
		gID = getGiftId(name);
	}
	
	if (gID != null && cID > 0) {
		var values = getGiftValues(cID);
		// if known value is consistent, do nothing
		if (values.length >= gID && values[gID-1] == love) return;
	}
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'https://docs.google.com/spreadsheet/formResponse',
		data: "formkey=dHVrUGV0c1h3aFg4Y0gwUzdmRGJwS2c6MQ&entry.2.single="+gID+"&entry.0.single="+name+"&entry.1.single="+love+"&entry.3.single="+cID,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
}



// simple rounding function
function round(number,count) {
	count = (typeof count !== 'undefined' ? count : 0);
	if (count == 0) return Math.round(number);
	return Math.round(number*Math.pow(10,count))/Math.pow(10,count);
}

// analogous to parentNode.insertBefore
function insertAfter(newNode,targetNode) {
	// insert before next sibling, if exists
	if(targetNode.nextSibling) {
		targetNode.parentNode.insertBefore(newNode,targetNode.nextSibling);
	// insert at end
	} else {
		targetNode.parentNode.appendChild(newNode);
	}
}

// set up update check
function checkForUpdate(unixTime) {
	// don't check for update more than once a day
	if ((unixTime - parseInt(GM_getValue('lastUpdateCheck','-1'),10)) >= 86400000)
		setTimeout(function(){update(); GM_setValue('lastUpdateCheck',unixTime.toString());},1000);
}

// check userscripts page for new version, prompt for update
function update() {
    GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://userscripts.org/scripts/source/131268.meta.js',
		onload: function(response) {
			//if (response.status != 200) return;
			var match = /@version\s+([\d\.]+)/.exec(response.responseText);
			var newVersion = (match ? parseFloat(match[1]) : -1);
			GM_log('new version: '+newVersion+' / old version: '+VERSION);
			if (newVersion > VERSION) {
				var cMatch = /@changes\s+(.+)/.exec(response.responseText);
				var changes = (cMatch ? cMatch[1] : "");
				var message = 'Version ' + match[1] + ' is available! You are running ' + VERSION + 
								'\n\nChanges:\n' + changes + '\n\nDo you want to upgrade?\n';
				if (window.confirm(message)) {
					window.location.href = "https://userscripts.org/scripts/source/131268.user.js";
				}
			}
		}
	});
}