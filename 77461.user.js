// ==UserScript==
// @name           man mobile's PuzzleIndicator
// @description    Shows the current step in powder grinding in the character pane
// @include        http://www.metroplexity.com/character.php
// @include        http://www.metroplexity.com/location.php
// ==/UserScript==

function getCharName() {
	var charName="";

	var upNods = document.evaluate(
			'.//a[@target="main" and @href="charsheet.php"]',
			document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null
	);
	var j;

	for ( j = 0; j < upNods.snapshotLength; j++ ) {
		var pNod        = upNods.snapshotItem(j);
		return (pNod.innerHTML);
	};
	return "default";
}

var charName = GM_getValue("currentCharName", "default");
if ((window.location.href) == "http://www.metroplexity.com/character.php") {
    charName = getCharName();
    GM_setValue("currentCharName", charName);
}


var current = new Array();
current[0]="Add powder";
current[1]="Turn into rod";
current[2]="Grind powder";
current[3]="Turn into box";
current[4]="Claim dust";
current[5]="Position unsure";

var currentForm = new Array();
currentForm[0]="Box*"; // box
currentForm[1]="Box*"; // box
currentForm[2]="Rod*"; // rod
currentForm[3]="Rod*"; // rod
currentForm[4]="Box*"; // box
currentForm[5]=""; 
currentForm[6]="Box"; 
currentForm[7]="Tablet"; 
currentForm[8]="Pyramid"; 
currentForm[9]="Rod"; 

var currentGo = new Array();
currentGo[0]="use-650"; // box
currentGo[1]="use-650"; // box
currentGo[2]="use-651"; // rod
currentGo[3]="use-651"; // rod
currentGo[4]="use-650"; // box
currentGo[5]="";
currentGo[6]="use-650";
currentGo[7]="use-652";
currentGo[8]="use-653";
currentGo[9]="use-651";

var mesg = new Array();
mesg["staring at you like a baleful red eye"] = 8;
mesg["it folds down into a strange prism or rod"] = 9;
mesg["it hinges open and folds out into a tablet"] = 7;
mesg["turn the pyramid back into its original form"] = 6;
mesg["methodically folding the pyramid into a long prism"] = 9;
mesg["creating a flat tablet"] = 7;
mesg["it collapses back into its original shape"] = 6;
mesg["you find a gem hidden among the many moving pieces"] = 8;
mesg["letting you roll the prism out into a strange tablet"] = 7;
mesg["returning the box to its original shape"] = 6;
mesg["you fold in the rest of the pyramid underneath it"] = 8;
mesg["you realize the tablet has segmented enough to roll it into a prism"] = 9;


var cur = GM_getValue(charName + ".currentStep", 5);
var curForm = GM_getValue(charName + ".currentForm", currentForm[cur]);
var curFormId = GM_getValue(charName + ".currentFormId", currentGo[cur]);

function setStep(step) {
    GM_setValue(charName + ".currentStep", step)
}
function setForm(form) {
    GM_setValue(charName + ".currentForm", form)
}
function setFormId(formId) {
    GM_setValue(charName + ".currentFormId", formId)
}


function curClick(){
    cur++;
    if(cur > 4) cur = 0;
    curForm=currentForm[cur];
    curFormId=currentGo[cur];
    setStep(cur);
    setForm(curForm);
    setFormId(curFormId);
    document.getElementById("curbutton").innerHTML = current[cur];
    document.getElementById("currentGoName").name = curFormId;
    document.getElementById("currentGoButton").value = curForm;
}

if ((window.location.href) == "http://www.metroplexity.com/character.php") {
	foo = document.createElement("span");
	foo.innerHTML=
	      '</br> <b> Current step: </b> '
	    + '<form method="post" action="inventory.php" target="main">'
	    + '<button type="button" id="curbutton"> '+current[cur]+' </button> '
	    + '<input id="currentGoName" type="hidden" '
	    + 'value="use" name="' + curFormId + '"/>'
	    + '<input id="currentGoButton" type="submit" value="' + curForm + '"/>'
	    + '</form> </br> ';
    document.getElementsByTagName("center")[0].parentNode.insertBefore(foo, document.getElementsByTagName("center")[0].nextSibling);

    document.getElementById('curbutton').addEventListener('click', curClick, false);
}

if ((window.location.href) == "http://www.metroplexity.com/location.php") {
    var pic = document.getElementsByTagName("img")
    if(pic[0]) {
	var dbi = document.body.innerHTML;
	var ps = pic[0].src;
	var isBox = ps.indexOf("Puzzle-Box-100.jpg") != -1;
	var isTablet = ps.indexOf("Puzzle-Tablet.jpg") != -1;
	var isPyramid = ps.indexOf("Gemmed-Puzzle-Box.jpg") != -1;
	var isRod = ps.indexOf("Puzzle-Rod.jpg") != -1;
	if(isBox || isTablet || isPyramid || isRod ) {
		var ih = document.body.innerHTML;
		for (asdf in mesg) {
			var curIdx = mesg[asdf];
			if (ih.indexOf(asdf) != -1) {
				setForm(currentForm[curIdx]);
				setFormId(currentGo[curIdx]);
			}
		}
		if (
				dbi.indexOf("You pour")				!= -1
			||	dbi.indexOf("You gingerly pour")		!= -1
			||	dbi.indexOf("You drop")				!= -1
			||	dbi.indexOf("You carefully pack")		!= -1
			||	dbi.indexOf("squid eyes in")			!= -1
			||	dbi.indexOf("The squid eyes")			!= -1
			||	dbi.indexOf("Soaking unnatural squid eyes")	!= -1
			||	dbi.indexOf("stream of red syrupy red fluid")	!= -1
			||	dbi.indexOf("red flakes slide")			!= -1
		) {
			cur = 1;
		}
		else if(dbi.indexOf("it folds down into a strange prism")	!= -1) cur = 2;
		else if(dbi.indexOf("grinding")					!= -1) cur = 3;
		else if(dbi.indexOf("collapses back into its original shape")	!= -1) cur = 4;
		else if(dbi.indexOf("chamber empties itself")			!= -1) cur = 0;
		setStep(cur);
	}
    }
}

