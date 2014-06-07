// ==UserScript==
// @name	Ikariam Build with Ambrosia
// @version	0.0
// @namespace	BuildAmbro
// @description	Ressource Change from Building will add Button for needed Ressources
// @include	http://*.ikariam.com/index.php?view=*&position=*
// @include	http://*.ikariam.com/index.php?view=premiumTrader*
// @exclude	http://*.support*

// ==/UserScript==
//-----------------------------------------------------------------------------

function extractBuildingInfo(element) {
	var div = element.getElementsByTagName("div");
	for (var i=0; i<div.length ; i++) {
		if (div[i].className == "premiumExchange") {
			var building=document.getElementById("mainview").getElementsByTagName("h1")[0].innerHTML;
			var lvl = /(\d+)/.exec(element.getElementsByTagName("h4")[0].innerHTML)[1];
			var li = element.getElementsByTagName("li");
			var ressourceArray = [];
			// reset old Infos
			ressourceArray["wood"] = "0";
			ressourceArray["wine"] = "0";
			ressourceArray["marble"] = "0";
			ressourceArray["glass"] = "0";
			ressourceArray["sulfur"] = "0";
			for (var j=0; j<li.length ; j++) {
				var resName = li[j].className.split(" ")[0];
				if (resName=='time') {
					GM_setValue("build", building + ' (' + lvl + ')');
					for (var res in ressourceArray)
					{ GM_setValue(res, ressourceArray[res]); };
					break;
				}
				else {	var count = /(\d+)/.exec(li[j].innerHTML.replace(/\D/g,""))[1];
					ressourceArray[resName]=count;
				}
			};
		};
	}
}

function setNeededRessources() {
	var element = document.getElementById("premiumResourceAssign");
	var li = element.getElementsByTagName("li");
	for (var i=1; i<li.length; i++) {
		var value = GM_getValue(li[i].className, "");
		if (!value=="") { 
			var input = li[i].getElementsByTagName("input")[0];
			input.value="0"; 
			var evt = document.createEvent("KeyEvents");
			evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
			input.dispatchEvent(evt);
		};
	};
	for (var i=1; i<li.length; i++) {
		var value = GM_getValue(li[i].className, "");
		if (!value=="") { 
			var input = li[i].getElementsByTagName("input")[0];
			input.value=""+value; 
			var evt = document.createEvent("KeyEvents");
			evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
			input.dispatchEvent(evt);
		};
	};
}

function addButton() {
	var element = document.getElementById("premiumResourceAssign");
	var button = document.createElement('a');
	button.className = 'button';
	button.innerHTML=GM_getValue("build", "");
	element.appendChild(button);
	button.addEventListener("click", setNeededRessources, true);
}

var buildingUpgrade = document.getElementById("buildingUpgrade");
if (buildingUpgrade) { extractBuildingInfo(buildingUpgrade) };
var premiumResourceAssign = document.getElementById("premiumResourceAssign");
if (premiumResourceAssign) { addButton() };