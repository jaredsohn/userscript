// GCal Event Color Codes
// This scripts allows you to activate and alternate set of color codes
// for events in your Google Calendars. Define a category name starting with !
// and give the colors you want for the background and border of the event.
// The color coding is enabled and disabled by clicking on the little calendar icon
// added to the corner of the main calendar frame. Any questions can be directed to
// mjeffryes+userscripts@gmail.com. Enjoy!
// ==UserScript==
// @name        GCal Event Color Codes - modified
// @namespace   http://www.hmc.edu/~mjeffryes
// @description Color codes GCal events using tags
// @include     http://www.google.com/calendar/*
// @include     https://www.google.com/calendar/*
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////////////////
//color-tag lookup:
//["tag",		"border color"		"fill color"]	
colors = [
["travel",		"rgb(108,148,118)",	"rgb(148,188,158)"],
["sleep",		"rgb(0,32,113)",	"rgb(50,82,168)"],
["uni",		"rgb(0,32,113)",	"rgb(50,82,168)"],
["fun",			"rgb(51,163,163)",	"rgb(92,217,217)"],
["party",			"rgb(51,163,163)",	"rgb(92,217,217)"],
["quiet",		"rgb(79,118,54)",	"rgb(119,158,94)"],
["people",		"rgb(153,72,153)",	"rgb(197,120,197)"],
["hw",			"rgb(103,51,0)",	"rgb(143,86,40)"],
["food",		"rgb(0,170,0)",		"rgb(46,216,42)"],
["sport",		"rgb(0,170,0)",		"rgb(46,216,42)"],
["admin",		"rgb(185,20,20)",	"rgb(225,53,53)"],
["event",		"rgb(185,20,20)",	"rgb(225,53,53)"],
["class",		"rgb(36,106,136)",	"rgb(76,146,176)"],
["maint",		"rgb(185,114,83)",	"rgb(225,154,123)"],
["church",		"rgb(165,165,0)",	"rgb(205,205,0)"],
["projects",	"rgb(0,90,5)",		"rgb(16,136,32)"],
["work",		"rgb(50,50,59)",	"rgb(90,90,90)"],
["service",		"rgb(110,40,70)",	"rgb(150,80,110)"],
["none",		"rgb(0,0,0)",		"rgb(0,0,0)"]] //special tag, do not remove


///////////////////////////////////////////////////////////////////////////////////////////

//Helper code snippit for adding menu toggle items (http://wiki.greasespot.net/Code_snippets)
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}

//Another helper for embedding items in the page (http://wiki.greasespot.net/Code_snippets)
function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

///////////////////////////////////////////////////////////////////////////////////////////

//function to apply color codes
function color(){
  	var colors = window.colors;
    var regex = new RegExp( tag_pfx + "[a-z]+","i");
    var eventowner = document.getElementById("eventowner");
    if (eventowner != null) {
		var chips = eventowner.childNodes;
		for(var i = 0; i<chips.length;i++){
	    	var elmts = chips[i].childNodes;
			var match = elmts[2].innerHTML.match(regex);
			if(match){ 
				elmts[0].style.backgroundColor=colors[match][0];
				elmts[1].style.backgroundColor=colors[match][0];
				elmts[2].style.backgroundColor=colors[match][1];
				elmts[2].childNodes[0].childNodes[0].style.backgroundColor=colors[match][0];
				elmts[2].childNodes[0].style.borderColor=colors[match][0];
				elmts[3].style.backgroundColor=colors[match][1];
				elmts[3].style.borderColor=colors[match][0];
				elmts[4].style.backgroundColor=colors[match][0];
			}
		}
	}
	var eventowner = document.getElementById("alldayeventowner");
    if (eventowner != null) {
		var chips = eventowner.childNodes;
		for(var i = 0; i<chips.length;i++){
	    	var elmts = chips[i].childNodes;
			var match = elmts[1].innerHTML.match(regex);
			if(match){ 
				elmts[0].style.backgroundColor=colors[match][0];
				elmts[1].style.backgroundColor=colors[match][0];
				elmts[2].style.backgroundColor=colors[match][1];
				//elmts[2].childNodes[0].childNodes[0].style.backgroundColor=colors[match][0];
				//elmts[2].childNodes[0].style.borderColor=colors[match][0];
				//elmts[3].style.backgroundColor=colors[match][1];
				//elmts[3].style.borderColor=colors[match][0];
				//elmts[4].style.backgroundColor=colors[match][0];
			}
		}
	}
  }

//insert color function into soft refresh
function insert() {
  	oldhc = hc;
	hc = function(a){oldhc(a);color();};
	var button = document.getElementById("color_code_toggle");
	button.childNodes[1].src = "images/icon_success.gif";
	button.onclick = uninsert;
	_EH_nav(1);_EH_nav(-1);
}

//uninsert color function into soft refresh
function uninsert() {
  	hc = oldhc;
	var button = document.getElementById("color_code_toggle");
	button.childNodes[1].src = "images/icon_r_no.gif";
	button.onclick = insert;
	_EH_nav(1);_EH_nav(-1);
}

//////////////////////////////////////////////////////////////////////////////

//insert runtime funtions into the page
embedFunction(color);
embedFunction(insert);
embedFunction(uninsert);

//////////////////////////////////////////////////////////////////////////////

//Tag prefix options
makeMenuToggle("Gcal_tag_sym", true, "Use '#'", "Use '!'", "Gcal tag prefix");
if (Gcal_tag_sym){
	tag_pfx = "#";
}else{
	tag_pfx = "!";
}

//insert color and tag_pfx options to page
unsafeWindow.colors = new Array(colors.length + 1);
for(var i = 0; i<colors.length;i++){
	unsafeWindow.colors[tag_pfx+colors[i][0]] = [colors[i][1],colors[i][2]];
}
unsafeWindow.tag_pfx = tag_pfx;


//insert a toggle button
var cal_list_head = document.getElementById("nt_0");
var button = document.createElement('div');
button.innerHTML='CC:<img src="images/icon_r_no.gif"/>';
button.setAttribute('id','color_code_toggle');
button.setAttribute('style','margin: 0.3em 0pt 0pt 0.3em;float:left;');
button.setAttribute('onclick','insert()');
cal_list_head.insertBefore(button, cal_list_head.childNodes[cal_list_head.childNodes.length]);

var bodyid = document.getElementsByTagName("body")[0];         
bodyid.setAttribute('onload','insert()');
