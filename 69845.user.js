// ==UserScript==
// @name           A. Holst advisor script
// @author	   A. Holst
// @namespace      http://www.erepublik.com/en/citizen/profile/211372
// @description    The great dane A. Holst as erepublik advisor
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

//resetting track variable...
//based on day variable
//save day variable
//if new day variable > old day
//reset track variable

var advisor = document.getElementById('advisor');
if (advisor) {
    advisor.parentNode.removeChild(advisor);
}

var day = 0;
day = GM_getValue("day","0") * 1;


var DayVar = document.getElementsByClassName('eday');
DayVar = DayVar[0].innerHTML.replace("Day <strong>", '');
DayVar = DayVar.replace("</strong> of the New World", '');
DayVar = DayVar * 1;

if (DayVar > day){
day = DayVar;
// save the day
	GM_setValue("day", day);
// reset tracking variable
	GM_setValue("track", "0");
}

// default -- forum
// work, train -- track var based
// on forum separate saying
// on profile check bread
// on army page check if battle hero

// default direction to forums
MySaying = "Dont check the forums, its borring, use erepublik.dk or newspapers insted.";

// start of tracking variable

var track = 0;
	track = GM_getValue("track","0") * 1;

//mysaying based on track code...
		if (track==0){
			MySaying = "Got to work... You can allways sleep under your desk.";
			}
		if (track==1){
			MySaying = "Time to go to Lana's place... Remember, your just training buddies.";
			}


var url = document.location.href;

var isCompany = url.match("/company/");

	if (isCompany){
// myCompany = document.getElementsByClassName('vround-red-core');
		if (track==0){
			track = 1;
			}
	}

// army ie. battle hero check

	var isArmy = url.match("/army");

	if (isArmy){

if (track==1){
track = 2;
}

var strength = document.getElementsByClassName('display-strenght-core tooltip');

b = strength[0].innerHTML % 5;
if (b==0){
	MySaying = "You are now a supersoldier... Another shitty trophy... And 5 gold, yay!";
}
	}

// save track var
	GM_setValue("track", track);


// profile ie. bread check
// note: checks profile page, then checks for inventory, then finally does the bread check 
 	var isProfile = url.match("/profile/");
	var a = 0;

 	if (isProfile){
	var own = document.getElementById("owninv");
	if (own){

var afood = document.getElementsByClassName('tooltip');
for(var i=0; i < afood.length; i++) {
// alert(afood[i].alt);
	if(afood[i].alt == "Food"){
a = 1;
	}
}

if (a==0){
	MySaying = "Buy food, Danish if possible.";
	}
}
}


// forums
	var isForum = url.match("/forum");

	if (isForum){
		MySaying = "You are at the wrong place at all times";
	}

var navbar, newElement;
navbar = document.getElementById('hinfo');
if (navbar) {

newElement = document.createElement('div');


newElement.innerHTML = '<div style="background-image:url(http://lh6.ggpht.com/_MMTdpnraofE/S4V_mUJXzkI/AAAAAAAAAQ8/GoisUL-YWV4/s800/holstadvice.png);" id="advisor" class="big"><div id="advContent"><div class="skip_btn" style="background: transparent none repeat scroll 0% 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;"></div><p><strong></strong>' + MySaying + '</p></div><div id="advHead"></div></div></div>';

navbar.parentNode.insertBefore(newElement, navbar.nextSibling);

}

var stuff = document.getElementById('advisor_ajax');
if (stuff) {
    stuff.parentNode.removeChild(stuff);

}