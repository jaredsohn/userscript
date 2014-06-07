// ==UserScript==
// @name           motorcycle madness helper multi-bikes finder
// @namespace      http://apps.facebook.com/motorcycle_madness/friend.php?mode=higher
// @version        0.3
// @date           2008-01-08
// @creator        Emre Burhan
// @description    Find an opponent that has multi-bikes AND less powerfull bike then mine
// @include        http://apps.facebook.com/motorcycle_madness/friend.php?mode=higher
// ==/UserScript==

/////////////////////////////////////////////////
//SETTINGS

//Show at most this amount of stronger bikes than me
var Threshold = 20;

//SETTINGS
/////////////////////////////////////////////////

var curLocation = window.location;
var Foundmulti = 0; 
var allTextareas, thisTextarea;
var opponentbikeElement; 
var oppID;		//ex: "friend=639005139&amp;mode=higher"
var multiracelink = "http://apps.facebook.com/motorcycle_madness/mchallenge.php?";

allTextareas = document.getElementsByTagName('p'); 

function addbanner(str){
	var navbar;
	navbar = document.getElementById('app7954212899_friend_page_tabs');
	if (navbar) {
		var logo = document.createElement("p");
		logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
			'border-bottom: 1px solid #000000; margin-bottom: 3px; ' +
			'font-size: small; background-color: #FF9999; ' +
			'color: #000000;"><p style="margin: 2px 0 1px 0;"> ' +
			str +
			'</p></div>';
		navbar.parentNode.insertBefore(logo, navbar);
	}
}

addbanner("&nbsp;Auto Multi -bikes search by -eymre-<br>&nbsp;Processing...");

// find multi-bikes opponent
for (var i = 1; i < allTextareas.length; i++) { 
	opponentbikeElement = allTextareas[i-1]; 
	thisTextarea = allTextareas[i]; 
	if(-1 != thisTextarea.innerHTML.toLowerCase().search('multi-bikes')) { 
		//extract opponent ID
		atext = thisTextarea.innerHTML;
		oppID = atext.substr(atext.search('friend='));
		oppID = oppID.substring(0,oppID.search('" class='));
		Foundmulti = -1; 
		break;
	} 
}
	
if(Foundmulti==0) { // can not find multi-bikes on this page
	// reload page
	window.location=curLocation;
} 
else if(Foundmulti==-1){ // found multi-bikes, compare bikes
	// read MY bike-------------------
	var mybike, mybikeelements;
	mybikeelements = document.evaluate(
		"//LI[@class='right the_last']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	mybike = mybikeelements.snapshotItem(0).innerHTML;
	/* parse something like this:
				Power: 257
				Traction: 235
				Aerodynamics: 170
			*/
	mybike = mybike.replace("Power:","");
	mybike = mybike.replace("Traction:","");
	mybike = mybike.replace("Aerodynamics:","");
	var tokens = mybike.split(" ");
	var mybiketotal = parseInt(tokens[1])+parseInt(tokens[2])+parseInt(tokens[3]);
	
	// read OPPONENT bike-------------------
	/* parse something like this:
		var opponentbike = 
		'<b>Suzuki Biplane "Lion"</b><br>\
		Power: 690<br>\
		Traction: 270<br>\
		Aerodynamics: 275<br>\
		Total fans: 16<br>'
	*/
	var opponentbike = opponentbikeElement.innerHTML;
	opponentbike.replace(" ", "");
	var tokens = opponentbike.split("<br>");
	opponentbiketotal = eval(tokens[1].split(":")[1]) + eval(tokens[2].split(":")[1]) + eval(tokens[3].split(":")[1]);
	
	var MyBikeBetter = (mybiketotal+Threshold >= opponentbiketotal);

	// Just compare SUM of properties (which turns out to be the way game uses)
	if (!MyBikeBetter)// my bike is less powerful, reolad page
		window.location=curLocation;
	else	// my bike is more powerful, alert user and stop.
	{
		addbanner("&nbsp;My bike is <b>" + (mybiketotal-opponentbiketotal) + "</b> better");
		opponentbikeElement.innerHTML = "<p style='background-color: #FF9999;'" + opponentbikeElement.innerHTML + "</p>";
		window.location = multiracelink+oppID;
	}
}
