// ==UserScript==
// @name           Professor Layton eRepublik Advisor Script.
// @author	   Levski.
// @namespace      www.google.co.il
// @description    Only th emost gentlemanly of professors to guide you through eRepublik.
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

//resetting track variable...
//based on day variable
//save day variable
//if new day variable > old day
//reset track variable

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
// on forum seperate saying
// on profile check bread
// on army page check if battle hero

// default direction to forums
MySaying = "Nothing important seems to be at hand, try looking around the forums, kind sir.";

// start of tracking variable

var track = 0;
	track = GM_getValue("track","0") * 1;

//mysaying based on track code...
		if (track==0){
			MySaying = "It seems that the time has come for physical labour.";
			}
		if (track==1){
			MySaying = "A truly patriotic gentleman trains for his country. You may do so now!";
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
	MySaying = "I say, well done, you've managed to achieve quite the spectacular rank.";
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
	MySaying = "It appears that your supply of nourishment is dwindling. Purchase some, and enjoy! ";
	}
}
}


// forums
	var isForum = url.match("/forum");

	if (isForum){
		MySaying = "You seem to be in the correct place. Give yourself a pat on the back, have a nice cup of tea.";
	}

var navbar, newElement;
navbar = document.getElementById('hinfo');
if (navbar) {

newElement = document.createElement('div');


newElement.innerHTML = '<div style="background-image:url(http://img96.imageshack.us/img96/9333/laytonadvisor.png);" id="advisor" class="big"><div id="advContent"><div class="skip_btn" style="background: transparent none repeat scroll 0% 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;"></div><p><strong></strong>' + MySaying + '</p></div><div id="advHead"></div></div></div>';

navbar.parentNode.insertBefore(newElement, navbar.nextSibling);

}

var stuff = document.getElementById('advisor_ajax');
if (stuff) {
    stuff.parentNode.removeChild(stuff);

}