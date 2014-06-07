// ==UserScript==
// @name           Bo's Easter Egg Helper
// @namespace      Bo
// @description    Visual aid to finding easter eggs in TornCity
// @include        http://*.torn.com/*
// @exclude        http://*.torn.com/competitioneaster.php?step=eggfind*
// ==/UserScript==


// var decarations

var eggFound = false;
searchForEggs();

/* ---------------------------------------------------------------- */
/* Check for easter eggs:                                           */
/* The egg is a .png image and a hyperlink, pointing to ./eggfind/..*/
/* ---------------------------------------------------------------- */

function searchForEggs() {
// GM_log("finding eggs started"); // --------------------------------------------------------------------- Debugging

eggFound = false;
var arrayOfAllHyperlinks = document.getElementsByTagName("a");
	for(i=0; i<arrayOfAllHyperlinks.length; i++) {
		var target=arrayOfAllHyperlinks[i].href;
		if(target.indexOf('eggfind')>=0) {
			eggFound = true;
			wootEggFound();
		}
	}
	if(!eggFound) {
		noEggFound();
	}
}

// Function to be called when egg present
function wootEggFound() {

	// create button - yes egg found - this button gives possibility to set border
	makeButton('Woot woot !!! --- Egg found on this page --- Now click this button to get help in finding it','boButtonYes', true);
	// is it a real egg? - if not message to inform user
        // counter eggs found by script
}

// if no egg present
function noEggFound() {

	// GM_log("in noEggFound function"); // --- Debugging
	makeButton('Bo\'s Easter Egg Helper is running','boButtonNo', false);
}

// create button
function makeButton (btnTxt, btnID) {

var boDiv = document.createElement ('div');

	boDiv.innerHTML = '<button id="'+ btnID +'" type="button">' + btnTxt + '</button>';
	boDiv.setAttribute ('id', 'boContainer');
	document.body.appendChild (boDiv);

	document.getElementById (btnID).addEventListener ("click", btnClickAction, false); //--- Activate the newly added button.
}

// Button action - border image
function btnClickAction (zEvent) {

	//GM_log(eggFound); // ---------------------------------------------------------------------- Debugging
	//if (eggFound) {
		outlineImages ();
	//}
	//else {
	//}
}

// extra functions

function outlineImages () {
	//--- First find all images
	var allImgs,thisImg;

	allImgs = document.evaluate('//img[@src]', 
				    document, 
				    null,
				    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				    null);
							
	//---do something with images
	for (var i=0;i<allImgs.snapshotLength;i++) {
		var thisImg = allImgs.snapshotItem(i);
		var src = thisImg.src;
		thisImg.style.border="2px solid #FF0000";
	}
}

//--- Style our newly added elements using CSS.
GM_addStyle ( (<><![CDATA[
    #boContainer {
        position:               absolute;
        top:                    3;
        left:                   200;
        font-size:              20px;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    #boButtonYes {
        cursor:                 pointer;
	color:			white;
	background-color:	green;
	border:			1px solid white;
	font-size:              16px;
    }
    #boButtonNo {
        cursor:                 pointer;
	color:			white;
	background-color:	red;
	border:			1px solid white;
	font-size:              16px;
    }
    #boContainer p {
        color:                  red;
        background:             white;
    }
]]></>).toString () );
