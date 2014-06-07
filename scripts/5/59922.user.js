// ==UserScript==
// @name		  Tagged No Bullshit Cleanup
// @namespace	  http://userscripts.org/scripts/show/59922
// @description   Removes unwanted Tagged blocks, gold adverts, and more. Also adds awesome floating menu.
// @require   http://usocheckup.dune.net/59922.js?maxage=5
// @include	  http://www.tagged.com/*
// @include	*tagged.com*
// @include http://wvvw.tagged.com/*
// @include	  http://tagged.poker.zynga.com/poker/www2/*/*
// @exclude	   
// @version       0.9.3
// ==/UserScript==

//   Release Notes
//	 Version 0.9.3
//	-Added new include link for any cross-domain issues
//	 Version 0.9.2
//	-Fixed overlay issue with red "Contact Me" div on Meet Me and navbar.
//	 Version 0.9.1
//	-Fixed cross-compatibility issue with Google Chrome 
//	 Version 0.9.0
//	-Major code re-write.
//	-Function tests were run for optimal execution speed
//	 Version 0.8.9
//	-more code cleanup
//	-Removed "Gold" text under user picture.
//	 Version 0.8.8
//	-Removed 'Update Script' link on navbar
//	-Removed an item before Gifts links on navbar
//	 Version 0.8.7
//	-Minor fix: on navbar
//	 Version 0.8.6
//	-Decided to remove the filler link in navbar
//	-Fixed minor bug: float declaration drop error
//	-Code cleanup on removeElement function arguments
//	-Added title info on script button link
//	 Version 0.8.5
//	-Minor fix: forgot to include an argument for removeElement function
//	 Version 0.8.4
//	-Major code cleanup. Expect minor script speed-ups.
////////////////////////////////////////////////////////
//			SEE SCRIPT HOMEPAGE FOR                  
//			       FULL RELEASE NOTES                          
//  VISIT @ http://userscripts.org/scripts/show/59922                      
////////////////////////////////////////////////////////
// End Release Notes
// Start floating navbar
// add class to element for floating css
var getDivId = document.getElementById("navheader").setAttribute("class", "menu_cell");
//create empty table to push content down the page
var table = document.createElement("table");
table.setAttribute("height", "65px");
// place empty table above the reference element
var spacerRef = document.getElementById("inner_container");
spacerRef.parentNode.insertBefore(table, spacerRef);
// Find element and create css for it. Thanks for the help JoeSimmons.
(function() {
	var css = ".menu_cell { float;width: 100%;z-index: 100;padding-bottom: 3px;position: fixed;}";
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
// End floating navbar

// Create removeElement function
// Will remove any element with an attribute
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
// End removeElement function

// Remove elements of interest
removeElement('li', 'type', 'gifts');
removeElement('a', 'href', '/vip/subscribe.html?ll=home_overview');
removeElement('div', 'class', 'icon gold_small');
removeElement('a', 'href', '/gold.html?ll=header_getgold#t=tearn_gold');
removeElement('a', 'href', '/gold.html?ll=home_overview_getmore');
removeElement('class', 'name', 'png gold_img');

var listIds = [
['popularvideos_box'],
['bulletins_box_container'],
['tags'],
['online_users_tab'],
['videos'],
['viewers_tab'],
['home_announcements'],
['pets_instructions'],
['report_flag'],
['game_instructions'],
['convertbanner'],
['send_gift_select_box'],
['send_gift_info'],
['header_gold'],
['overviewGoldBal'],
['no_gold_err'],
['ad_unit_0_div'],
['ad_unit_1_div'],
['ad_unit_2_div'],
['link_header_css'],
['link_css'],
['link_custom_css']
];
var listClass = [
['ad'],
['convertbanner7']
];
for(var i=0,l=listIds.length,item; i<l; i++) {
item = listIds[i];
var x = document.getElementById(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9], item[10], item[11], item[12], item[14], item[15], item[16], item[17], item[18], item[19], item[20], item[21]);
if ( x && x.parentNode && x.parentNode.removeChild ) {
		x.style.display = 'none';
		x.parentNode.removeChild(x);
	}
}
for(var i=0,l=listClass.length,item; i<l; i++) {
item = listClass[i];
var y = document.getElementsByClassName(item[0], item[1]);
if ( y && y.parentNode && y.parentNode.removeChild ) {
		y.style.display = 'none';
		y.parentNode.removeChild(y);
	}
}
// End remove elements of interest

// Remove an item before Gifts in navbar
var getPath = document.evaluate(
  ".//*[@id='sub_nav_container']/li[2]/span",
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);

var node;
for (var i = 0; node = getPath.snapshotItem(i); i++)
  node.parentNode.removeChild(node);

var getPath = document.evaluate(
  ".//*[@id='basic_info']/ul/li[4]",
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);

var node;
for (var i = 0; node = getPath.snapshotItem(i); i++)
  node.parentNode.removeChild(node);


// End Remove Content
// Create button on Tagged home page for Script page
if(window.location.href == "http://www.tagged.com/home.html") {
	var newDiv = document.createElement('table');
	newDiv.setAttribute('border', '1');
	newDiv.innerHTML = "<a href='http://userscripts.org/scripts/show/59922' target='_blank' title='Visit Script Homepage'>Running Tagged NBS Cleanup <b>0.9.3</b></a>";
	var getDiv = document.getElementById('friends_box').parentNode.insertBefore(newDiv, getDiv);
	};
// End button
