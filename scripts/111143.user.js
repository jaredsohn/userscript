// ==UserScript==
// @id             valiant
// @name           Valiant
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    Saves your selection of ordering, pet, and food on the Link Exchange pages so you don't have to click through every time.
// @version        3.41
// @include        http://www.valenth.com/linkexchange*
// @include        http://valenth.com/linkexchange*
// @run-at         document-end
// ==/UserScript==


/*global console: true, document, unsafeWindow, GM_getValue, GM_setValue, window */

//var AdoptsInExchange, Buttons, cat, Centres, CustomLink, CustomURL, DocLoc, Dub, EnterLE, exdata, Food, greedyregchange, hitIt, i, Linkies, Llength, moveOnPlease, NextPrince, NextPrinceButton, order, orderorder, peiji, Prince, regaqui, regcat, regchange, regdomain, regmanage, regnoredirect, regorder, regpagechange, regpeiji, regstair, Saviour, Seccion, stage, stair, z;



/* The part where we set a bunch of variables */

//sparrowcat = unsafeWindow.console; // for debug purposes
var DocLoc = document.URL,
Linkies = document.links,
Llength = Linkies.length,
Centres = document.getElementsByTagName('center'),

Account = false,

regdomain = /(http:\/\/)?(www.)?valenth.com/,
regmanage = /act=manage/,
regnoredirect = /act=(?!change)/,
regpagechange = /\/linkexchange.php\?(page=([0-9]+))?&?(order=(name|id|level|type))?&?(order_type=(ASC|asc|DESC|desc))?&?(cat=([0-9]+))?/,
greedyregchange = /\/linkexchange.php(\?(page=([0-9]+))?&?(order=(name|id|level|type))?&?(order_type=(ASC|asc|DESC|desc))?&?(cat=([0-9]+))?)?/,

Dub = DocLoc.replace(greedyregchange, ''), // has to be here so greedyregchange can be defined first... XD
stage = false;

GM_addStyle('br + h1 { margin-top: 25px; }');



checkFirefoxspulse();


function checkFirefoxspulse() {
	// As awesome as Firefox is in general, it can be just plain stupid sometimes, so we have to make sure it's not asleep at the wheel before starting the script. I dunno why.
	
	if (document.getElementById('menu') != null) {
		actuallydostuff();
	}
	
	else {
		window.setTimeout(checkFirefoxspulse, 50);
	}
}

function actuallydostuff() {
	// The old LE distinguised different pages with the URL, but the new one no longer does, so a little detective work is in order.
	if (document.getElementsByTagName('h1')[1] != undefined && document.getElementsByTagName('h1')[1].innerHTML  == 'Choose your Adoptable') {
		stage = 'idle';
	}
	
	else if (document.getElementsByTagName('h1')[0] != undefined && document.getElementsByTagName('h1')[0].innerHTML == 'Welcome!') {
		stage = 'gateway';
	}
	
	else if (Linkies[28].innerHTML == 'Change Adoptables') {
		stage = 'clicking';
	}
	
	Account = document.getElementsByTagName('h4')[0].childNodes[2].innerHTML;
	
	
	/* Script starts doing stuff here */
	
	if (stage == 'gateway') {
		regaqui = /Click\s[Hh]ere/;
	
		for (z = 0; z < Llength; z++) {
			if (regaqui.test(Linkies[z].innerHTML)) {
				window.location = Linkies[z].href;
			}
		}
	}
	
	else if (stage == 'clicking') {
		
	}
	
	else if (stage == 'idle') {
		// All your saved parameters.
		peiji = (GM_getValue(Account + '_peiji', false) == false ? GM_getValue('peiji', false) : GM_getValue(Account + '_peiji', false));
		
		order = (GM_getValue(Account + '_order', false) == false ? GM_getValue('order', false) : GM_getValue(Account + '_order', false));
		
		stair = (GM_getValue(Account + '_stair', false) == false ? GM_getValue('stair', false) : GM_getValue(Account + '_stair', false));
		
		cat = (GM_getValue(Account + '_cat', false) == false ? GM_getValue('cat', false) : GM_getValue(Account + '_cat', false));
	
		
		// Make a relative URL out of the parameters.
		CustomURL = '/linkexchange.php?' + (peiji != false ? 'page=' + peiji : '') + (order != false ? '&order=' + order : '') + (stair != false ? '&order_type=' + stair : '') + (cat != false ? '&cat=' + cat : '');
	
		// Translated: If this is not the ?act=change page where there should be no redirects and both the parameters do not match your CustomURL and either the page is not one or the order is not id or the stair-stepping order is not ascending, then it's okay to redirect.
		
		if (regnoredirect.test(DocLoc) == false && DocLoc.replace(regdomain, '') != CustomURL && (peiji != 1 || order != 'id' || (stair != 'asc' && stair != 'ASC'))) {
			window.location = Dub + CustomURL;
		}
	
		regpeiji = /(.*)page=([0-9]+)(.*)/;
		regorder = /(.*)order=(name|id|level|type)(.*)/;
		regstair = /(.*)order_type=([Aa][Ss][Cc]|[Dd][Ee][Ss][cC])(.*)/;
		regcat = /(.*)cat=([0-9]+)(.*)/;
	
		// ^ Look, ma, it's an entire evolution chain!
		// Oh, what's that? You say not all random portmanteaus are Pokémon names? Aww.
	
		for (z = 0; z < Llength; z++) {
			if (regpagechange.test(Linkies[z].href)) {
				hitIt(z);
			}
		}
	
		
		// Go through the maze of different adopts and bubbles to find the one that's selected ("Prince") and save it. Do the same with the food.
		
		Prince = 0;
		Buttons = document.getElementsByTagName('input');
	
		if (Buttons[Buttons.length - 1] != undefined) {
			EnterLE = Buttons[Buttons.length - 1];
			EnterLE.addEventListener('click', Saviour, false);
	
			if (GM_getValue(Account + '_prince', 0) != 0 || GM_getValue('prince', 0) != 0) {
				
				Prince = (GM_getValue(Account + '_prince', 0) == 0 ? GM_getValue('prince') : GM_getValue(Account + '_prince'));
				
				Food = (GM_getValue(Account + '_food', 0) == 0 ? GM_getValue('food') : GM_getValue(Account + '_food'));
	
				for (i = 0; i < Buttons.length; i++) {
					if ((Buttons[i].name == 'adoptable' && Buttons[i].value == Prince) || (Food != 0 && Buttons[i].name == 'food' && Buttons[i].value == Food)) {
						Buttons[i].checked = true;
					}
				}
			}
		}
		
		
		// Now add an "easy button" which automatically skips to the next prince.
		
		NextPrinceButton = document.createElement('input');
		NextPrinceButton.type = 'submit';
		NextPrinceButton.value = 'Next pet  >';
		NextPrinceButton.style.cssText = 'width: 35%; display: inline-block !important;';
		
		NextPrinceButton.addEventListener('click', next, false);
		
		
		PrevPrinceButton = document.createElement('input');
		PrevPrinceButton.type = 'submit';
		PrevPrinceButton.value = '<  Previous pet';
		PrevPrinceButton.style.cssText = 'width: 35%; display: inline-block !important;';
		
		PrevPrinceButton.addEventListener('click', previous, false);
		
			
		Centres[1].insertBefore(document.createElement('br'), Centres[1].childNodes[0]);
		Centres[1].insertBefore(document.createElement('br'), Centres[1].childNodes[0]);
		Centres[1].insertBefore(NextPrinceButton, Centres[1].childNodes[0]);
		Centres[1].insertBefore(PrevPrinceButton, NextPrinceButton);	
	}
	
	//sparrowcat.debug('script finished');
}



/* Various functions */

function hitIt(z) {
	// This is a wrapper for orderorder, because you can't simply add event listeners in a loop outside of a wrapper for some reason. Weird, huh?
	Linkies[z].addEventListener('click', orderorder, false);
}

function orderorder() {
	// function orderorder: saves ordering parameters for your CustomURL.
	var thref = this.href;

	if (regpeiji.test(thref)) {
		GM_setValue(Account + '_peiji', thref.replace(regpeiji, '$2'));
	}

	if (regorder.test(thref)) {
		GM_setValue(Account + '_order', thref.replace(regorder, '$2'));
	}

	if (regstair.test(thref)) {
		GM_setValue(Account + '_stair', thref.replace(regstair, '$2'));
	}

	
	if (regcat.test(thref)) {
		GM_setValue(Account + '_cat', thref.replace(regcat, '$2'));
	} 
	
	else {
		GM_setValue(Account + '_cat', '0');
	}
}

function Saviour() {
	// Why is it called Saviour? Because it saves your id and food, of course.
	
	for (i = 0; i < Buttons.length; i++) {
		if (Buttons[i] != undefined && Buttons[i].name == 'adoptable' && Buttons[i].checked == true) {
			Prince = Buttons[i].value;
		}

		if (Buttons[i] != undefined && Buttons[i].name == 'food' && Buttons[i].checked == true) {
			Food = Buttons[i].value;
		}
	}

	if (Prince != 0) {
		GM_setValue(Account + '_prince', Prince);
	}

	if (Food == undefined) {
		Food = 0;
	}
	
	GM_setValue(Account + '_food', Food);
}

function previous() {
	moveOnPlease(-1);
}

function next() {
	moveOnPlease();
}

function moveOnPlease(moveback) {
	// The guts of the easy button
	var increment = 1;
	
	if (moveback != undefined) {
		increment = -1;
	}
	
	if (Prince == 0) {
		Buttons[2].checked = true;
	}
	
	else {
		for (i = 0; i < Buttons.length; i++) {
			if (Buttons[i] != undefined && Buttons[i].name == 'adoptable' && Buttons[i].value == Prince) {
				Buttons[i + increment].checked = true;
			}
		}
	}
	
	Saviour();
	
	document.forms[0].submit();
}
