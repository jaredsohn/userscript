// ==UserScript==
// @name           Semi-Rare Dropdown
// @namespace      hunsley@gmail.com
// @description    Creates a dropdown list of semi-rares on the character pane, with a button to go to the selected adventure.
// @include        *kingdomofloathing.com/charpane.php*
// @include        *kingdomofloathing.com/main.php*
// ==/UserScript==
const VERSION=1.0;
const RELEASECOMMENT='';

CheckForUpdates();
if (window.location.pathname != "/charpane.php") {
	return false;
}

var snarfblatString,snarfblats;
if (GM_getValue('snarfblatString','UNDEFINED')=='UNDEFINED') {
	snarfblatString = '{"Most Useful":{"members":[{"name":"pet snacks","snarfblat":"52","areatitle":"Menagerie 2","style":""},{"name":"KGE outfit","snarfblat":"40","style":"","areatitle":"CN Kitchens"},{"name":"Inhaler","snarfblat":"82","areatitle":"Castle","style":""},{"name":"ASCII","snarfblat":"80","areatitle":"Valley","style":""}]},"Consumables":{"members":[{"name":"lunchbox","snarfblat":"114","areatitle":"CN Outskirts","style":""},{"name":"3 tarts","snarfblat":"113","areatitle":"Pantry","style":""},{"name":"3 wine","snarfblat":"112","areatitle":"Back Alley","style":""}]},"100 Stat":{"members":[{"name":"Mox","snarfblat":"66","areatitle":"Pirate Cove","style":""},{"name":"Myst","snarfblat":"26","areatitle":"Hippy Camp","style":""},{"name":"Musc","snarfblat":"27","areatitle":"Frat House","style":""}]},"Damage":{"members":[{"name":"50 Hot","snarfblat":"73","style":"color:red;","areatitle":"Pixels"},{"name":"50 Cold","snarfblat":"102","style":"color:blue;","areatitle":"Haunted Kitchen"},{"name":"50 Sleaze","snarfblat":"100","style":"color:blueviolet;","areatitle":"Whiteys Grove"},{"name":"50 Stench","snarfblat":"31","style":"color:green;","areatitle":"Guano Junction"},{"name":"50 Spooky","snarfblat":"15","style":"color:gray;","areatitle":"Spooky Forest"},{"name":"30 Melee","snarfblat":"60","areatitle":"Goatlet","style":""}]},"Resist":{"members":[{"name":"Hot","snarfblat":"79","style":"color:red;","areatitle":"Friars"},{"name":"Cold","snarfblat":"62","style":"color:blue;","areatitle":"Ninja Snowmen"},{"name":"Sleaze","snarfblat":"45","style":"color:blueviolet;","areatitle":"SotB"},{"name":"Stench","snarfblat":"32","style":"color:green;","areatitle":"Batrats/Ratbats"},{"name":"Spooky","snarfblat":"104","style":"color:gray;","areatitle":"Haunted Library","style":""}]},"Misc":{"members":[{"name":"cyclops eyedrops","snarfblat":"19","areatitle":"Limerick Dungeon","style":""},{"name":"shrinking powder","snarfblat":"118","areatitle":"Hidden City","style":""},{"name":"3 massage oil","snarfblat":"42","areatitle":"CN Harem","style":""},{"name":"6 new Cloaca-Cola","snarfblat":"85","areatitle":"A Battlefield","style":""},{"name":"mystic shell","snarfblat":"50","areatitle":"CN Laboratory","style":""},{"name":"poltergeist","snarfblat":"21","areatitle":"Cemetary","style":""},{"name":"3-4 meat stacks","snarfblat":"41","areatitle":"Treasury","style":""}]}}';
	GM_setValue('snarfblatString',snarfblatString);
	snarfblats = eval('('+snarfblatString+')');
}
else {
	snarfblats = eval('('+GM_getValue('snarfblatString')+')');
}

htmlString = '<select id="semirares"><option style="font-weight:bolder;">Semi-Rares</option>';
for (var category in snarfblats) {
	htmlString += '<option style="font-weight:bold;">&nbsp;' + category + '</option>';
	//GM_log("snarfblats["+category+"].members.length: "+snarfblats[category].members.length);
	for (var i=0;i<snarfblats[category].members.length;i++) {
		member = snarfblats[category].members[i];
		htmlString += '<option style="font-weight:normal;' + ((member.style != '')?(member.style):(' ')) + '" value="' + member.snarfblat + '">&nbsp;&nbsp;&nbsp;'+member.name+'</option>';
	}
}
htmlString += '</select><br>';
//GM_log(htmlString);

var selectElement = document.createElement("font");
var elements = document.getElementsByTagName( "FONT" );
for ( var i = 0; i < elements.length; ++i ){
	if ( elements[i].innerHTML.indexOf( " Adventure" ) != -1 ){
		// insert a font node before this one
           	selectElement.innerHTML = htmlString;
           	elements[i].parentNode.insertBefore(selectElement,elements[i]);
                
		break;
	}
}

selectElement = document.getElementById('semirares');
selectElement.addEventListener("change",function(event) {
	var newTarget = this.selectedIndex;
	if (this.options[newTarget].value) {
		var newSnarfblat = this.options[newTarget].value;
		var curMember = findBySnarfblat(newSnarfblat);
		if (curMember) {
			var goForm = document.getElementById('semirareGo');
			var needsInsert = false;
			if (!goForm) {
				goForm = document.createElement('form');
				goForm.setAttribute('id','semirareGo');
				needsInsert = true;
			}
			goForm.innerHTML = '<input type="text" readonly="readonly" size="' + curMember.areatitle.length + '" maxlength="' + curMember.areatitle.length + '" value="' + curMember.areatitle + '"/>&nbsp;<input class="button" type="button" value="Go" id="semirareGoButton"/>';
			//GM_log("goForm.innerHTML: "+goForm.innerHTML);
			if (needsInsert) {
				selectElement.parentNode.insertBefore(goForm,selectElement.nextSibling);
				goForm.parentNode.removeChild(goForm.nextSibling);
			}
			goButton = document.getElementById('semirareGoButton');
			if (goButton) {
				goButton.addEventListener('click',function(event) {
					var selectElement = document.getElementById('semirares');
					var href = 'http://' + document.location.host + '/adventure.php?snarfblat=' + selectElement.options[selectElement.selectedIndex].value;
					top.frames[2].location.href = href;
				},false);
			}
		}
		else {
			var goForm = document.getElementById('semirareGo');
			if (goForm) {
				var brElement = document.createElement('br');
				goForm.parentNode.insertBefore(brElement,goForm);
				goForm.parentNode.removeChild(goForm);
			}	
		}
	}
	else {
		var goForm = document.getElementById('semirareGo');
		if (goForm) {
			var brElement = document.createElement('br');
			goForm.parentNode.insertBefore(brElement,goForm);
			goForm.parentNode.removeChild(goForm);
		}
	}


},false);


function findBySnarfblat (snarf) {
	var target;
	for (var category in snarfblats) {
		for(var i=0;i<snarfblats[category].members.length;i++) {
			if (snarfblats[category].members[i].snarfblat == snarf) {
				target = snarfblats[category].members[i];
				break;
			}
		}
	}
	if (target) {
		return target;
	}
	else {
		return null;
	}
}

//auto-update checking code
function CheckForUpdates() {
	var scriptUrl = 'http://userscripts.org/scripts/source/26280.user.js';

	var lastUpdateCheck = GM_getValue('lastUpdateCheck','NEVER');
	var curTime = new Date().getTime();
	if ((lastUpdateCheck == 'NEVER') || (parseInt(lastUpdateCheck,10) < (curTime - 86400000))) {
		GM_setValue('lastUpdateCheck',''+curTime);
		GM_xmlhttpRequest({method: 'GET',url: scriptUrl,
					onload: function(responseDetails) {
						var bodyText = responseDetails.responseText;
						var matches = bodyText.match(/const VERSION=([\d\.]+);(\s+const RELEASECOMMENT='(.*)';)?/);
						var curVersionNum = parseFloat(matches[1]);
						//GM_log('fetched script version: '+curVersionNum);
						if (matches[3] && matches[3] != '') {
							GM_setValue('releaseComment',matches[3]);
						}
						else {
							GM_setValue('releaseComment','');
						}
						//if (curVersionNum > VERSION) {
						if ((curVersionNum > VERSION) && (curVersionNum != 28)) {
							GM_setValue('outOfDate','true');
						}
						else {
							GM_setValue('outOfDate','false');
						}
					}
				});
	}
	var curVersion = GM_getValue('curVersion','0');
	if (parseFloat(curVersion) != VERSION) {
		GM_setValue('curVersion',''+VERSION);
		GM_setValue('outOfDate','false');
	}
	//Nag user with update link if the script is out of date
	var outOfDate = GM_getValue('outOfDate');
	if((outOfDate == 'true') && (window.location.pathname != "/charpane.php") && (window.location.pathname != "/login.php") && (window.location.pathname != "/topmenu.php") && (window.location.pathname != "/compactmenu.php") ) {
		var releaseComment = GM_getValue('releaseComment','');
		var newElement = document.createElement('center');
		newElement.innerHTML = '<table style="border: 1px solid red; margin-bottom: 4px; color: red; font-size:85%" width=95% cellpadding=1 cellspacing=0><tr><td bgcolor=red style="color:white;">A new version of the Semi-Rare dropdown is available!</td></tr><tr style="color:red;"><td><a href="'+scriptUrl+'" target="_blank">Update</a>&nbsp;&nbsp;&nbsp;&nbsp;' + ((releaseComment!='')?('Release notes:&nbsp;'+releaseComment):'') + '</td></tr></table>';

		//insert the counter at the top of the page
		AddToTop(newElement,document);
	}
}

function AddToTop(newElement,refDocument) {
	var fightElement = refDocument.evaluate('//b[contains(.,"Combat") and contains(.,"!")]/ancestor::tr[1]',refDocument,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (fightElement) {
		fightElement.parentNode.insertBefore(newElement,fightElement);
	}
	else {
		var element = refDocument.getElementsByTagName("tr")[0];
		if (element && element.parentNode) {
			element.parentNode.insertBefore(newElement,element);
		}
	}
}
