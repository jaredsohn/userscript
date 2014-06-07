// Neoquest2 Improvements
// version 0.5 BETA!
// 2005-12-26
// Copyright (c) 2005, Tom Friday
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Neoquest2 Improvements", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Neoquest2 Improvements
// @namespace     http://actionhour.net
// @description   1 Gets rid of ad banner and neoquest banner  // 2 Combat page bypasses. I hate those things. Take me to the action! //    Just watch your hit points and you'll be ok. 3 records the direction you last pressed in the compass
// @include       http://www.neopets.com/games/nq2/*


// ==/UserScript==

// 1 Gets rid of ad banner and neoquest banner
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#ban { display: none ! important; visibility: hidden ! important;} .hdr { display: none ! important; visibility: hidden ! important;}');




// 2 Combat page bypasses. I hate those things. Take me to the action!
//    Just watch your hit points and you'll be ok.

var allInput, thisInput, allForm, thisForm, allImg, thisImg;
allImg = document.evaluate(
    '//img[@src]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImg.snapshotLength; i++) {
    thisImg = allImg.snapshotItem(i);
	//GM_log(thisImg.src);
    switch (thisImg.src) {
        case 'http://images.neopets.com/nq2/x/com_begin.gif':

			document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?start=1";
            break;

        case 'http://images.neopets.com/nq2/x/tomap.gif':

			//document.location.href="http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
            break;

        case 'http://images.neopets.com/nq2/x/com_next.gif':

			allForm = document.evaluate(
			    '//FORM[@name="ff"]',
 			   document,
  			  null,
  			  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  			  null);

			for (var x = 0; x < allForm.snapshotLength; x++) {
 		   		thisForm = allForm.snapshotItem(x);
				allInput = document.evaluate(
		   		 '//INPUT[@name="fact"]',
 		 		  document,
  				  null,
  				  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  				  null);

				for (var w = 0; w < allInput.snapshotLength; w++) {
 		  			 thisInput = allInput.snapshotItem(w);

					thisInput.value = 1;
					thisForm.submit();
				}
			}
         	break;								

        case 'http://images.neopets.com/nq2/x/com_end.gif':
			allForm = document.evaluate(
		    	'//FORM[@name="ff"]',
 		   		document,
  				null,
  		  		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  		  		null);

			for (var y = 0; y < allForm.snapshotLength; y++) {
 		   		thisForm = allForm.snapshotItem(y);
				allInput = document.evaluate(
		   	 		'//INPUT[@name="fact"]',
 		 	  		document,
  			  		null,
  			  		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  			  		null);

				for (var z = 0; z < allInput.snapshotLength; z++) {
 		  	 		thisInput = allInput.snapshotItem(z);
					thisInput.value = 2;
					thisForm.submit();
				}
			}
         	break;								


        case 'http://images.neopets.com/nq2/x/nav.gif':

// 3 This section records the direction you last pressed in the compass
//    and presses it a second after the page loads. (Time enough to hit party commands and heal if need be.)

			var allMap, thisMap;

			allMap = document.evaluate(
		   		 '//MAP[@name="navmap"]',
 		  		 document,
  				  null,
  				  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  				  null);

			for (var y = 0; y < allMap.snapshotLength; y++) {
 		 		thisMap = allMap.snapshotItem(y);
// Set ID tags on the area tags, so we can trap the click.
				thisMap.innerHTML = '<AREA SHAPE="poly" COORDS="60,0,82,22,82,26,36,26,36,21,59,0" HREF="javascript:;" ALT="North" ID="North" onClick="dosub(1); return false;"><AREA SHAPE="poly" COORDS="0,59,21,38,26,38,26,83,21,83,0,61" HREF="javascript:;" ALT="West" ID="West" onClick="dosub(3); return false;"><AREA SHAPE="poly" COORDS="119,61,99,83,93,83,93,37,98,37,119,57" HREF="javascript:;" ALT="East" ID="East" onClick="dosub(4); return false;"><AREA SHAPE="poly" COORDS="59,119,37,98,37,93,83,93,83,97,61,119" HREF="javascript:;" ALT="South" ID="South" onClick="dosub(2); return false;"><AREA SHAPE="poly" COORDS="6,6,39,6,39,11,11,39,6,39" HREF="javascript:;" ALT="Northwest" ID="Northwest" onClick="dosub(5); return false;"><AREA SHAPE="poly" COORDS="112,7,112,39,107,39,79,11,79,7" HREF="javascript:;" ALT="Northeast" ID="Northeast" onClick="dosub(7); return false;"><AREA SHAPE="poly" COORDS="6,113,6,80,11,80,39,108,39,113" HREF="javascript:;" ALT="Southwest" ID="Southwest" onClick="dosub(6); return false;"><AREA SHAPE="poly" COORDS="113,113,80,113,80,109,107,81,113,81" HREF="javascript:;" ALT="Southeast" ID="Southeast" onClick="dosub(8); return false;">';

			}


function clickHandler(event) {
//GM_log(event.target.id);

	switch (event.target.id) {

		case 'North' :
			GM_setValue("lastDirection", "1");
			break;
		case 'South' :
			GM_setValue("lastDirection", "2");
			break;
		case 'West' :
			GM_setValue("lastDirection", "3");
			break;
		case 'East' :
			GM_setValue("lastDirection", "4");
			break;
		case 'Northwest' :
			GM_setValue("lastDirection", "5");
			break;
		case 'Southwest' :
			GM_setValue("lastDirection", "6");
			break;
		case 'Northeast' :
			GM_setValue("lastDirection", "7");
			break;
		case 'Southeast' :
			GM_setValue("lastDirection", "8");
			break;
       default:
	};
}


window.setTimeout(function() {
			var dir = GM_getValue("lastDirection", "nope");
			GM_log('direction:' + dir);

			if (dir != 'nope') {

				allForm = document.evaluate(
		   		 	'//FORM[@name="ff"]',
 		  	 		document,
  					null,
  		  			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  		 	 		null);

					for (var y = 0; y < allForm.snapshotLength; y++) {
 		 		  		thisForm = allForm.snapshotItem(y);

						allInput = document.evaluate(
		  		 		 '//INPUT[@name="act"]',
 				 		  document,
  						  null,
  						  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  						  null);

						for (var w = 0; w < allInput.snapshotLength; w++) {
 				  			thisInput = allInput.snapshotItem(w);
							thisInput.value = 'move';
						}

						allInput = document.evaluate(
		  		 		 '//INPUT[@name="dir"]',
 				 		  document,
  						  null,
  						  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  						  null);

						for (var w = 0; w < allInput.snapshotLength; w++) {
 				  			thisInput = allInput.snapshotItem(w);
							thisInput.value = dir;
						}

						thisForm.submit();
					}
			}
}, 5000);


// On click, call function to handle click
			document.addEventListener('click', clickHandler, false);
			//GM_log('direction:' + test);

			break;
        default:
            // do something with other kinds of HTML elements
    }
								

}







