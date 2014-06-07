// ==UserScript==
// @name		  Kings of Chaos Multi-Script
// @namespace	  http://userscripts.org/scripts/show/58824
// @description   Removes KoC Header table, moves the menu to create a floating sidebar, and unsuspends Battle Results. Also removes a few unsightly elements.
// @version       1.1.4
// @require       http://usocheckup.dune.net/58824.js?maxage=15
// @include       http://kingsofchaos.com/*
// @include       https://kingsofchaos.com/*
// @include       http://*.kingsofchaos.com/*
// @include       https://*.kingsofchaos.com/*
// @include	  http://www.kingsofchaos.com/detail.php?attack_id=*&suspense=1
// @exclude	   
// ==/UserScript==

//	-=- Release Notes -=-
//	Version 1.1.4
//	-Major code cleanup. Expect speedups
//	Version 1.1.3
//	-Modified sidebar script to be more efficient
//	-Removed bulky script updater
//	-Edited USO Updater require
//	-Removed useless include
//	Version 1.1.1
//	-Added USO Updater require. Hopefully this solves the updating issue.
//	Version 1.1
//	-Added Instant Battle Results
//	Version 1.0.5
//	-Added *untested* Script Updater
//	Version 1.0
//	-Fixed the kingsofchaosheadremover script
//	-Added floating sidebar created by Shinmai
//	-Removed the Bored? text advert.
//	-Removed Get Firefox button advert.

function removeElement(el, attribs, attribValue) {
	// Get element tag
	var div = document.getElementsByTagName(el);
	var myAttribs = "";
		for (var i = div.length - 1; i >= 0; i--) {
			// Get attribute
			myAttribs = div[i].getAttribute(attribs);
			// Get attribute value
			if(myAttribs == attribValue){
				div[i].parentNode.removeChild(div[i]);
			}
		}
	};
removeElement('table', 'background', '/images/main/small_repeater.jpg');
removeElement('span', 'class', 'textad');
removeElement('img', 'src', '/images/safer.gif');
removeElement('table', 'background', '/images/main/small_repeater.jpg');
// Begin Floating Sidebar script
(function() {
	var css = ".menu_cell { float: right;position: fixed;right: 5px;top: 25px; }";
	if(typeof GM_addStyle!="undefined") var addStyle=GM_addStyle;
      	else if(typeof PRO_addStyle!="undefined") var addStyle=PRO_addStyle;
      	else if(typeof addStyle=="undefined") var addStyle=function(css) {
      		var head = document.getElementsByTagName("head")[0],
              	style = document.createElement("style");
      		style.type = "text/css";
      	try {style.innerHTML = css} catch(x) {style.innerText = css
	}
      head.appendChild(style);
   };
      if(addStyle) addStyle(css);
})();
// End Floating Sidebar script
// Begin Instant Battle Reports
// Undo the in-line script's hide()
var script = document.body.appendChild(document.createElement('script'));
script.type = 'text/javascript';
script.textContent =
    '$(function () {' +
    '  $("table.battle tr:last td > *").show();' +
    '});';

// Rename table "battle" to "battle2" so the in-line script can't find it
// Note: this is dependent on the order that the classes are specified in the
// class attribute...
var table = document.getElementsByClassName('battle')[0];
table.className = table.className + '2';

// Inject a dummy table element so document.body.scrollTop doesn't get clamped
// to 0 while the script is still running.
var dummyTable = document.body.appendChild(document.createElement('table'));
dummyTable.className = 'battle';
dummyTable.style.display = 'none';
dummyTable.style.height = document.body.scrollTop;
window.addEventListener(
    'scroll',
    function () {
      dummyTable.style.height = document.body.scrollTop;
    },
    false);
// End Instant Battle Reports
// kingsofchaosmultiscript.user.js