// ==UserScript==
// @name          Mininova Plus
// @namespace     http://www.stryksta.com/gm
// @description   Fixes Annoyances on Mininova
// @include       http://www.mininova.org/*
// @exclude
// @version       2.0.0
// ==/UserScript==//

var nav = document.getElementById("navigation");
var list = document.getElementsByTagName('ul')[0];

(function() {

//Find All Premium Torrents
var all_pt, thisDiv;
		all_pt = document.evaluate(
			"//a[@href='/faq/#pt']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var i = 0; i < all_pt.snapshotLength; i++) {
			//allDivs.snapshotItem(i).parentNode.parentNode.style.display = 'none';
			var el = all_pt.snapshotItem(i).parentNode.parentNode;
				el.style.display = 'none';
		}

		////////////////////////////////////////

		//Create Link To Switch Hide/Show Premium Torrents

			var showhide = document.createElement("li");
			var a = document.createElement('a');
			a.appendChild(document.createTextNode("Show/Hide " + all_pt.snapshotLength + " Premium"));
			a.style.cursor = "pointer";
			a.addEventListener('click', function() {
					
					var allDivs, thisDiv;
					allDivs = document.evaluate(
						"//a[@href='/faq/#pt']",
						document,
						null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
						null);
					for (var i = 0; i < allDivs.snapshotLength; i++) {
						//allDivs.snapshotItem(i).parentNode.parentNode.style.display = 'none';
						var el = allDivs.snapshotItem(i).parentNode.parentNode;
						if ( el.style.display != 'none' ) {
							el.style.display = 'none';
						} else {
							el.style.display = '';
							//el.style.border = '2px solid #FF9900';
							//el.style.border = '2px solid #FFAB2D';
							el.style.backgroundColor  = '#FFAB2D';
							el.style.fontWeight  = 'bold';
						}
					}
				}
				, true);
			
			showhide.appendChild(a);
			list.appendChild(showhide);

		////////////////////////////////////////

//START REMOVING ADS****************************************************************************************

var AdToRemove = document.getElementById("adspot-a");
    AdToRemove.parentNode.removeChild(AdToRemove);

var AdToRemove1 = document.getElementById("adspot-b");
    AdToRemove1.parentNode.removeChild(AdToRemove1);   

var AdToRemove2 = document.getElementById("sidebar");
    AdToRemove2.parentNode.removeChild(AdToRemove2); 

//STOP REMOVING ADS****************************************************************************************

}) ();


document.getElementById("content").style.width = '100%';


//FIND TORRENTS WITH 0 SEEDS AND HIDE THEM

//Find All Premium Torrents
var all_pt, thisDiv;
		all_pt = document.evaluate(
			"//span[@class='r']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var i = 0; i < all_pt.snapshotLength; i++) {
			//allDivs.snapshotItem(i).parentNode.parentNode.style.display = 'none';
			var el = all_pt.snapshotItem(i).parentNode.parentNode;
				el.style.display = 'none';
		}

		////////////////////////////////////////

		//Create Link To Switch Hide/Show Premium Torrents

			var showhide = document.createElement("li");
			var a = document.createElement('a');
			a.appendChild(document.createTextNode("Show/Hide " + all_pt.snapshotLength + " Zero Seeds"));
			a.style.cursor = "pointer";
			a.addEventListener('click', function() {
					
					var allDivs, thisDiv;
					allDivs = document.evaluate(
						"//span[@class='r']",
						document,
						null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
						null);
					for (var i = 0; i < allDivs.snapshotLength; i++) {
						//allDivs.snapshotItem(i).parentNode.parentNode.style.display = 'none';
						var el = allDivs.snapshotItem(i).parentNode.parentNode;
						if ( el.style.display != 'none' ) {
							el.style.display = 'none';
						} else {
							el.style.display = '';
							//el.style.border = '2px solid #FF9900';
							//el.style.border = '2px solid #FFAB2D';
							el.style.backgroundColor  = '#FFAB2D';
							el.style.fontWeight  = 'bold';
						}
					}
				}
				, true);
			
			showhide.appendChild(a);
			list.appendChild(showhide);

		////////////////////////////////////////