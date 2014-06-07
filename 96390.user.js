// ==UserScript==
// @name           JHunz's Absinthe Minder
// @namespace      hunsley@gmail.com
// @description    Kingdom of Loathing script to reduce Green Pixie micromanagement.
// @version        15
// @include        *www*kingdomofloathing.com/*
// @include        http://127.0.0.1:60*/*
// @exclude        *kingdomofloathing.com/chatlaunch.php*
// @exclude        *kingdomofloathing.com/*chat.php*
// @exclude        *kingdomofloathing.com/login.php*
// @exclude        *kingdomofloathing.com/loggedout.php*
// @exclude        *kingdomofloathing.com/topmenu.php*
// @exclude        *kingdomofloathing.com/*.html
// @exclude        http://127.0.0.1:60*/chatlaunch.php*
// @exclude        http://127.0.0.1:60*/*chat.php*
// @exclude        http://127.0.0.1:60*/login.php*
// @exclude        http://127.0.0.1:60*/loggedout.php*
// @exclude        http://127.0.0.1:60*/topmenu.php*
// @exclude        http://127.0.0.1:60*/*.html
// ==/UserScript==
// 
// Version 1.0	12/08/2007	First release!
// Version 1.1 	01/03/2008	A fix to make mode 1 work for more people and play nicer with other scripts.
//					Also a minor change so that you will no longer have a worm wood nag link on the page after the last choice adventure.
// Version 1.2	01/05/2008	A fix for the stupid bug I introduced in 1.1
// Version 1.3	03/14/2008	Update to account for a change in the choice adventure page syntax, and the combat bars interface upgrade.
// Version 1.4	03/31/2008  Update for Firefox 3 beta compatibility
// Version 1.5	04/12/2008	Improved compatibility with KOLMafia's relay browser.
//
// Official forum thread: http://forums.kingdomofloathing.com:8080/vb/showthread.php?t=144797
//

const VERSION=15;

var i,j,k,curAbsinthe,mode,areaNumber,choiceNumber,optionNumber,step,received9,received5,targetItem,needAlert='false',modeTwoElement,needInlineElement='false',charPaneLinkNode,compactOrFull='unknown';

CheckForUpdates();

//Grab the character name from the character pane
if (window.location.pathname == "/charpane.php") {
	// Get the current name
	var charName = document.getElementsByTagName("b")[0].textContent;
	GM_setValue('curCharName',charName);
}
else {
	var charName = GM_getValue('curCharName','UNDEFINED');
}

//Check if the script has been run before.  If not, set all preferences to defaults.
var targetItem = GM_getValue(charName + '.targetItem',0);
if (targetItem == 0) {
	//if the character name isn't known, exit and wait for the script to run first in the charpane
	if (charName == 'UNDEFINED') {
		return false;
	}

	targetItem = 2;
	GM_setValue(charName + '.targetItem',2);
	GM_setValue(charName + '.mode',3);
	GM_setValue(charName + '.prevAdventure','barrel.php');
	GM_setValue(charName + '.prevAdventureText','The Barrel Full of Barrels');
	GM_setValue(charName + '.prevAdventureParent','barrel.php');
	GM_setValue(charName + '.received9','false');
	GM_setValue(charName + '.received5','false');
}

mode = GM_getValue(charName + '.mode');
//If we're on the character pane, go back and grab the number of absinthe adventures remaining
//Also find and possibly save the last adventure link node if mode 1 is on
if (window.location.pathname == "/charpane.php") {
	// While we're here, also grab the current number of absinthe adventures
	var imgnodes = document.getElementsByTagName("img");
	var found = 'false';
	var prevAbsinthe;
	for (i=0;i < imgnodes.length; i++) {
		if (imgnodes[i].getAttribute('onclick') == 'eff("ebaff6fa82fe65630faccf2d1177b7cc");') {
			//absinthe found, store how many adventures of it we have
			var textnode = imgnodes[i].parentNode.nextSibling.firstChild;
			if (!textnode.hasChildNodes()) {
				//compact mode
				curAbsinthe=parseInt(imgnodes[i].parentNode.nextSibling.firstChild.nodeValue.split("(")[1].split(")")[0]);
				compactOrFull = 'compact';
			}
			else {
				//full mode
				curAbsinthe=parseInt(imgnodes[i].parentNode.nextSibling.firstChild.textContent.split("Absinthe-Minded (")[1].split(")")[0]);
				compactOrFull = 'full';
			}
			var prevAbsinthe = GM_getValue(charName + '.curAbsinthe');
			GM_setValue(charName + '.curAbsinthe',curAbsinthe);
			found = 'true';

		}
	}
	//set it to zero if the effect wasn't found on the character pane
	if (found == 'false') {
		curAbsinthe = 0;
		GM_setValue(charName + '.curAbsinthe',0);
	}
	//fix for the bug I introduced in 1.1
	if ((curAbsinthe == 1) && (prevAbsinthe == 0)) {
		curAbsinthe = 0;
		GM_setValue(charName + '.curAbsinthe',curAbsinthe);
	} 
	//set the choice adventure received info back to false when appropriate
	if ((found == 'false') || (curAbsinthe == 10)) {
		GM_setValue(charName + '.received9','false');
		GM_setValue(charName + '.received5','false');
	}

	//If mode 1 is active, find the last adventure link node now so that we can save, replace, or restore it later on.
	if ((mode==1)||(mode==3)||(mode==5)||(mode==7)) {
		//First, find the link with the text "Last Adventure" because it has a distinct class to search for
		var lastAdvParentLink = document.evaluate('//a[@class="nounder" and @target="mainpane"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		var lastAdvParentLinkNode = lastAdvParentLink.singleNodeValue;

		//Now make sure this is the right node.  If not, we'll assume compact mode and search that way.
		if ((!(lastAdvParentLink.singleNodeValue))||(lastAdvParentLink.singleNodeValue.textContent != "Last Adventure:")) {
			//Let's try compact mode 
			compactLinkNode = document.evaluate('//a[contains(@title,"Last Adventure:")]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
			if(compactLinkNode) {
				charPaneLinkNode = compactLinkNode.singleNodeValue;
				compactOrFull = 'compact';
			}
			else {
				//Alternate slower way of finding it, in case the first doesn't find the right node for some reason
				var node,s;
				var textNodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				for (var i=0;i<textNodes.snapshotLength;i++) {
					node = textNodes.snapshotItem(i);
					s=node.data;
					if(s.match("^Last Adventure:$")) {
						lastAdvParentLinkNode = node.parentNode;
						charPaneLinkNode = lastAdvParentLinkNode.parentNode.parentNode.nextSibling.nextSibling.getElementsByTagName("a")[0];
						compactOrFull = 'full';
					}
				}	
			}			
		}
		else {
			//First search found the right node, set the charPaneLinkNode accordingly
			charPaneLinkNode = lastAdvParentLinkNode.parentNode.parentNode.nextSibling.nextSibling.getElementsByTagName("a")[0];
			compactOrFull = 'full';
		}
	}

	if ((prevAbsinthe != curAbsinthe) && ((curAbsinthe == 9) || (curAbsinthe == 5) || (curAbsinthe == 1))) {

		//if functionality mode 3 is activated, and absinthe adventures are at 9,5,1, and not previously warned about this, then we need an alert.  But don't trigger it here because that causes problems.
		if ((mode >= 4) && (mode <= 7) && (prevAbsinthe != curAbsinthe) && ((curAbsinthe == 9) || (curAbsinthe == 5) || (curAbsinthe == 1))) {
			needAlert='true';
		}

		//if mode 1 is active, we need to find and save the current last adventure link so that we can replace it safely
		if ((mode==1)||(mode==3)||(mode==5)||(mode==7)) {

			var linkText;
			var linkLocation = charPaneLinkNode.href;	
			if(compactOrFull == 'full') {
				linkText = charPaneLinkNode.textContent;
			}
			else {
				linkText = charPaneLinkNode.title.split("Last Adventure: ")[1];
			}
			
			//strip off the important part, and save the result
			var relativeLink;
			if (linkLocation.match(".kingdomofloathing.com/")) {
				relativeLink = linkLocation.split(".kingdomofloathing.com/")[1];
			}
			else if (linkLocation.match(/127\.0\.0\.1:\d+\//)) {
				relativeLink = linkLocation.split(/127\.0\.0\.1:\d+\//)[1];
				GM_log("relativeLink: "+relativeLink);
			}
			GM_setValue(charName + '.prevAdventure',relativeLink);
			GM_setValue(charName + '.prevAdventureText',linkText);

			//If we're in full mode, also save the parent.
			if(compactOrFull == 'full') {
				var parentLinkLocation = '' + lastAdvParentLink.singleNodeValue.href;
				parentLinkLocation = parentLinkLocation.split(".kingdomofloathing.com/")[1];
				GM_setValue(charName + '.prevAdventureParent',parentLinkLocation);
			}
		}
	}
}

//Figure out which area should be linked to, what choice adventure we're looking for, and which option to choose if found
curAbsinthe = GM_getValue(charName + '.curAbsinthe');
received9 = GM_getValue(charName + '.received9');
received5 = GM_getValue(charName + '.received5');
targetItem = GM_getValue(charName + '.targetItem');

if ((curAbsinthe <= 9) && (curAbsinthe >= 7) && (received9 == 'false')) {
	//9-7 adventures and haven't gotten the first choice adventure
	step = 9;
	switch(targetItem) {
		case 1: areaNumber=151; choiceNumber=164; optionNumber=2; break;
		case 2: areaNumber=151; choiceNumber=164; optionNumber=2; break;
		case 3: areaNumber=152; choiceNumber=167; optionNumber=3; break;
		case 4: areaNumber=152; choiceNumber=167; optionNumber=3; break;
		case 5: areaNumber=153; choiceNumber=170; optionNumber=1; break;
		case 6: areaNumber=153; choiceNumber=170; optionNumber=1; break;
		case 7: areaNumber=153; choiceNumber=170; optionNumber=3; break;
		case 8: areaNumber=151; choiceNumber=164; optionNumber=1; break;
		case 9: areaNumber=152; choiceNumber=167; optionNumber=2; break;
	}
}
else if ((curAbsinthe <= 5) && (curAbsinthe >= 4) && (received5 == 'false')) {
	//5-4 adventures and haven't gotten the second choice adventure
	step = 5;
	switch(targetItem) {
		case 1: areaNumber=153; choiceNumber=171; optionNumber=3; break;
		case 2: areaNumber=152; choiceNumber=168; optionNumber=2; break;
		case 3: areaNumber=151; choiceNumber=165; optionNumber=2; break;
		case 4: areaNumber=153; choiceNumber=171; optionNumber=1; break;
		case 5: areaNumber=152; choiceNumber=168; optionNumber=3; break;
		case 6: areaNumber=151; choiceNumber=165; optionNumber=1; break;
		case 7: areaNumber=152; choiceNumber=168; optionNumber=1; break;
		case 8: areaNumber=153; choiceNumber=171; optionNumber=2; break;
		case 9: areaNumber=151; choiceNumber=165; optionNumber=3; break;
	}
} 
else if (curAbsinthe == 1) {
	//1 adventure left
	step = 1;
	switch(targetItem) {
		case 1: areaNumber=152; choiceNumber=169; optionNumber=3; break;
		case 2: areaNumber=153; choiceNumber=172; optionNumber=2; break;
		case 3: areaNumber=153; choiceNumber=172; optionNumber=1; break;
		case 4: areaNumber=151; choiceNumber=166; optionNumber=1; break;
		case 5: areaNumber=151; choiceNumber=166; optionNumber=3; break;
		case 6: areaNumber=152; choiceNumber=169; optionNumber=1; break;
		case 7: areaNumber=151; choiceNumber=166; optionNumber=2; break;
		case 8: areaNumber=152; choiceNumber=169; optionNumber=2; break;
		case 9: areaNumber=153; choiceNumber=172; optionNumber=3; break;
	}
}
else {
	step = 0;
}

//Create the page element for functionality mode 2.  Add it to the page if necessary.
if ((step>0)&&((mode == 2)||(mode==3)||(mode==6)||(mode==7))) {
	modeTwoElement = document.createElement('tr');
	var message = '<tr><td><div name="modetwodiv" style="font-family:arial;font-size: 100%;width: 100%;text-align:left;float:left">Absinthe Minder: <a href="adventure.php?snarfblat=' +areaNumber+ '">';
	switch(areaNumber) {
		case 151: message += 'The Stately Pleasure Dome';break;
		case 152: message += 'The Mouldering Mansion';break;
		case 153: message += 'The Rogue Windmill';break;
	}
	message += '</a></div></td></tr>';
	modeTwoElement.innerHTML = message;

	//This is a check to make sure it doesn't get inserted multiple times (by a charpane refresh, for example)
	var m2DivExists = top.frames[2].document.evaluate('//div[@name="modetwodiv"]',top.frames[2].document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(!(m2DivExists.singleNodeValue)) {
		AddToTop(modeTwoElement,top.frames[2].document);
		//var element = top.frames[2].document.getElementsByTagName("tr")[0];
		//element.parentNode.insertBefore(modeTwoElement,element);
	}
}

//If mode 1 is active, we may need to replace the last adventure link
//Here is where we do that
//The variables charPaneLinkNode and (possibly) lastAdvParentLink were set in the previous charpane section above and are still valid
if ((window.location.pathname == "/charpane.php") && ((mode==1)||(mode==3)||(mode==5)||(mode==7))) {
	if (step > 0) {
		var areaName;
		switch(areaNumber) {
			case 151: areaName = 'The Stately Pleasure Dome'; break;
			case 152: areaName = 'The Mouldering Mansion'; break;
			case 153: areaName = 'The Rogue Windmill'; break;
		}

		//Replace the current link with a worm wood link
		charPaneLinkNode.href = "adventure.php?snarfblat=" + areaNumber;

		//Also replace "Last Adventure" with "Next Adventure" and fix the area name so people know their links have been messed with
		//And, if we're in full mode, replace the parent area link as well
		if(compactOrFull == 'compact') {
			charPaneLinkNode.title = "Next Adventure: " + areaName;
		}
		else {
			charPaneLinkNode.textContent = areaName;
			lastAdvParentLink.singleNodeValue.textContent = 'Next Adventure:';

			lastAdvParentLink.singleNodeValue.href = 'wormwood.php';
		}		
	}
	else if (((curAbsinthe == 0) || ((step == 0) && (curAbsinthe > 0)))) {
		linkLocation = ''+charPaneLinkNode.href;
		if (((linkLocation.match("snarfblat=151"))||(linkLocation.match("snarfblat=152"))||(linkLocation.match("snarfblat=153")))) {
			//Replace the worm wood link with the saved link

			var prevLinkLocation = GM_getValue(charName + '.prevAdventure');
			var prevLinkText = GM_getValue(charName + '.prevAdventureText');
			var prevLinkParent = GM_getValue(charName + '.prevAdventureParent');

			//Replace the link
			charPaneLinkNode.href = prevLinkLocation;

			//Fix the area name back to what it was, and (in full mode) replace the parent area link as well
			if (compactOrFull == 'compact') {
				charPaneLinkNode.title = "Last Adventure: " + prevLinkText;
			}
			else {
				charPaneLinkNode.textContent = prevLinkText;
				lastAdvParentLink.singleNodeValue.href = prevLinkParent;
			}
		}
	}
}

//automatic choice adventure picking in the worm wood
if (window.location.pathname == "/choice.php") {
	//Attempt to find the desired choice on the page.  If not found, do nothing here
	var theForm = document.evaluate('//form[contains(@name,"choiceform") and input[@name="whichchoice" and @value='+choiceNumber+'] and input[@name="option" and  @value='+optionNumber+']]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if (theForm.singleNodeValue) {
		if((step == 5) || (step == 9)) {
			GM_setValue(charName + '.received' + step,'true');	
		}
		//manually set curAbsinthe to zero so it doesn't nag you with a link after receiving this last choice adventure
		if(step==1) {
			GM_setValue(charName + '.curAbsinthe',0);
		}
		theForm.singleNodeValue.submit();
	}
}

//This long long section adds a nice little options menu to the account options page
if (window.location.pathname == "/account.php") 
{
	buildPrefs()
}

//Actually trigger the functionality mode 3 alert
if (needAlert == 'true') {
	alert("Warning: " + curAbsinthe + " adventures of Absinthe-Minded remaining.");
}

//insert an element at the top of the page, but under the combat bar if present
function AddToTop(newElement,refDocument) {
	var fightElement = refDocument.evaluate('//b[contains(.,"Combat") and contains(.,"!")]/ancestor::tr[1]',refDocument,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (fightElement) {
		fightElement.parentNode.insertBefore(newElement,fightElement);
	}
	else {
		var element = refDocument.getElementsByTagName("tr")[0];
		element.parentNode.insertBefore(newElement,element);
	}
}

function CheckForUpdates() {
	var scriptUrl = 'http://userscripts.org/scripts/source/96390.meta.js';

	var lastUpdateCheck = GM_getValue('lastUpdateCheck','NEVER');
	var curTime = new Date().getTime();
	//if ((lastUpdateCheck == 'NEVER') || (parseInt(lastUpdateCheck) < (curTime - 86400000))) {
	if ((lastUpdateCheck == 'NEVER') || (parseInt(lastUpdateCheck) < (curTime - 345600000))) {
		GM_setValue('lastUpdateCheck',''+curTime);
		GM_xmlhttpRequest({method: 'GET',url: scriptUrl,
					onload: function(responseDetails) {
						var bodyText = responseDetails.responseText;
						//var matches = bodyText.match(/const VERSION=([\d\.]+);(\s+const RELEASECOMMENT='(.*)';)?/);
						var matches = bodyText.match(/\/\/@version\s+(\d+)/);
						var curVersionNum = parseFloat(matches[1]);

						/*if (matches[3] && matches[3] != '') {
							GM_setValue('releaseComment',matches[3]);
						}
						else {
							GM_setValue('releaseComment','');
						}*/
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
	if((outOfDate == 'true') && (window.location.pathname != "/charpane.php") && (window.location.pathname != "/login.php")) {
		var releaseComment = GM_getValue('releaseComment','');
		var newElement = document.createElement('center');
		newElement.innerHTML = '<table style="border: 1px solid red; margin-bottom: 4px; color: red; font-size:85%" width=95% cellpadding=1 cellspacing=0><tr><td bgcolor=red style="color:white;">A new version of Absinthe Minder is available!</td></tr><tr style="color:red;"><td><a href="'+scriptUrl+'" target="_blank">Update</a>&nbsp;&nbsp;<a href="http://forums.kingdomofloathing.com:8080/vb/showthread.php?t=144797">Forum thread</a>&nbsp;&nbsp;' + ((releaseComment!='')?('Release notes:&nbsp;'+releaseComment):'') + '</td></tr></table>';

		//insert the counter at the top of the page
		AddToTop(newElement,document);
	}
}

function buildPrefs()
{
	if (!document.querySelector('#privacy'))
		return
	var scriptID = 'JH_AM'
	var scriptName = 'Absinthe Minder'
	if (!document.querySelector('#scripts'))
	{
		//scripts tab is not built, do it here
		var scripts = document.querySelector('ul').appendChild(document.createElement('li'))
		scripts.id = 'scripts'
		var a = scripts.appendChild(document.createElement('a'))
		a.href = '#'
		var img = a.appendChild(document.createElement('img'))
		img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif'
		img.align = 'absmiddle'
		img.border = '0'
		img.style.paddingRight = '10px'
		a.appendChild(document.createTextNode('Scripts'))
		a.addEventListener('click', function (e)
		{
			//make our new tab active when clicked, clear out the #guts div and add our settings to it
			e.stopPropagation()
			document.querySelector('.active').className = ''
			document.querySelector('#scripts').className = 'active'
			document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>'
			document.querySelector('#guts').appendChild(getSettings())
		}, false)
	}
	else
	{
		//script tab already exists
		document.querySelector('#scripts').firstChild.addEventListener('click', function (e)
		{
			//some other script is doing the activation work, just add our settings
			e.stopPropagation()
			document.querySelector('#guts').appendChild(getSettings())
		}, false)
	}
	
	function getSettings()
	{
		//build our settings and return them for appending
		var contents = document.body.appendChild(document.createElement('div'))
		contents.id = scriptID
		var fieldset = contents.appendChild(document.createElement('fieldset'))
		fieldset.setAttribute('style', 'width:33%; margin-top:20px')
		var legend = fieldset.appendChild(document.createElement('legend'))
		legend.className = 'subhead'
		legend.textContent = scriptName
		var section = fieldset.appendChild(document.createElement('div'))
		section.className = 'indent'
		section.appendChild(buildSettings())
		return contents
	}

	function buildSettings()
	{
		//title bar
		/*var titleBar = document.createElement('div');
		with (titleBar) {
			appendChild(document.createTextNode('Absinthe Minder'));
			style.padding = "1px 0 1px 0";
			style.textAlign = "center";
			style.color = "white";
			style.backgroundColor = "blue";
			style.fontWeight = "bold";
		}
		*/
		var optionsForm = document.createElement('form');
		//optionsForm.style.textAlign = 'right';

		//Select box to choose the worm wood target item or stat
		var targetSelect = document.createElement('select');
		var options = ['','Fancy Ball Mask (Mox hat)', 'Not-a-pipe (Spleen)', 'Can-Can Skirt (Musc pants)', 'S.T.L.T. (Food)', 'Albatross Necklace (Myst Acc.)', 'Flask of Amontillado (Booze)', 'Moxie substats', 'Muscle substats', 'Mysticality substats']
		for (var n=1;n<10;n++)
		{
			var option = targetSelect.appendChild(document.createElement('option'))
			option.value = n
			option.textContent = options[n]
			if (targetItem == n)
				option.selected = 'true'
		}

		targetSelect.addEventListener('change', function(event) {
			event.preventDefault()
			event.stopPropagation()
			var newTarget = this.selectedIndex;
			if((newTarget >= 0) && (newTarget <= 8)) {
				GM_setValue(charName + '.targetItem',newTarget+1);
			}
		},false);
		//Div wrapper to hold the select box
		var targetDiv = document.createElement('div');
		with(targetDiv) {
			appendChild(document.createTextNode('Choose target item or stat: '));
			appendChild(targetSelect);
		}
		optionsForm.appendChild(targetDiv);

		//Checkbox to turn on/off mode one
		var modeOneCheckbox = document.createElement('input');
		with(modeOneCheckbox) {
			type = 'checkbox';

			if((mode==1)||(mode==3)||(mode==5)||(mode==7)) {
				checked = 'true';
			}

			addEventListener('click',function(event) {
				if((mode==1)||(mode==3)||(mode==5)||(mode==7)) {
					mode--;
					GM_setValue(charName + '.mode',mode);
				}
				else {
					mode++;
					GM_setValue(charName + '.mode',mode);
				}
			},true);
		}
	
		//Text and wrapper for the checkbox
		var modeOneDiv = document.createElement('div');
		with(modeOneDiv) {
			//style.textAlignment = "right";
			appendChild(document.createTextNode('Replace Last Adventure links'));
			appendChild(modeOneCheckbox);
		}
		optionsForm.appendChild(modeOneDiv);

		//Checkbox to turn on/off mode two
		var modeTwoCheckbox = document.createElement('input');
		with(modeTwoCheckbox) {
			type = 'checkbox';

			if((mode==2)||(mode==3)||(mode==6)||(mode==7)) {
				checked = 'true';
			}

			addEventListener('click',function(event) {
				if((mode==2)||(mode==3)||(mode==6)||(mode==7)) {
					mode -= 2;
					GM_setValue(charName + '.mode',mode);
				}
				else {
					mode += 2;
					GM_setValue(charName + '.mode',mode);
				}
			},true);
		}
		//Text and wrapper for the checkbox	
		var modeTwoDiv = document.createElement('div');
		with(modeTwoDiv) {
			//style.textAlignment = "right";
			appendChild(document.createTextNode('Add Worm Wood link above page'));
			appendChild(modeTwoCheckbox);
		}
		optionsForm.appendChild(modeTwoDiv);

		//Checkbox to turn on/off mode three
		var modeThreeCheckbox = document.createElement('input');
		with(modeThreeCheckbox) {
			type = 'checkbox';
			//style.textAlign = "right";
	
			if((mode>=4)&&(mode<=7)) {
				checked = 'true';
			}

			addEventListener('click',function(event) {
				if((mode>=4)&&(mode<=7)) {
					mode -= 4;
					GM_setValue(charName + '.mode',mode);
				}
				else {
					mode += 4;
					GM_setValue(charName + '.mode',mode);
				}
			},true);
		}

		//Text and wrapper for the checkbox	
		var modeThreeDiv = document.createElement('div');
		with(modeThreeDiv) {
			//style.textAlign = "right";
			//style.float = "left";
			appendChild(document.createTextNode('Alert at 9/5/1 adventures'));
			appendChild(modeThreeCheckbox);
		}
		optionsForm.appendChild(modeThreeDiv);

		//wrapper = document.createElement('div');
		//with(wrapper) {
			//style.width = '95%';
			//style.border = 'thin solid blue';
			//appendChild(titleBar);
			//appendChild(optionsForm);
		//}


		//var loc = document.getElementsByTagName('center')[2];
		//if(loc.lastChild.textContent.indexOf("This account will") != 0)var loc = document.getElementsByTagName('center')[3];
		//loc.insertBefore(wrapper,loc.lastChild);
		return optionsForm
	}
}
