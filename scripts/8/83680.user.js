// ==UserScript==
// @name			Tibia Fansite Links (Promoted Only)
// @namespace		http://www.tibia.com
// @description		This will display all Promoted Tibia Fansite Icons and let you click on them to go to their Site
// @version			1.0
// @author			Jiwe a.k.a (Raydramon)
// @include			http://*.tibia.com/*
// @include			https://*.tibia.com/*
// ==/UserScript==
//
// Browser Compatibility
// 		- Firefox

// Check if variable exists if not then create one
if((get = GM_getValue('option')) == null)
{
	GM_setValue('option', 'Hide');
}


/*       Global Variables       \/ */


var Browser				=	'';

var Promoted			=	['http://portaltibia.com.br/', 'http://www.tibia-stats.com/', 'http://www.tibia-wiki.net/',
							'http://tibia.wikia.com/', 'http://www.tibiabr.com/', 'http://www.tibiahispano.com/',
							'http://en.tibiaml.com/', 'http://www.tibiamx.com.mx/', 'http://www.tibiarp.com/',
							'http://tibiaspy.com/', 'http://www.tibiavenezuela.com/', 'http://tibiopedia.pl/'];

var Wrapper				=	document.createElement('DIV');

var Option				=	document.createElement('DIV');

var Links				=	new Array();

var Imgs				=	new Array();


/*       Create Elements       \/ */


for(i=1; i<=11; i++)
{
Links[i] 				=	document.createElement('A');
Imgs[i]					=	document.createElement('IMG');
}


/*      Elements Attributes       \/ */


for(i=1; i<=11; i++)
{
	Links[i].setAttribute('href', Promoted[i]);
	Links[i].setAttribute('target', '_blank');
	
	if(Promoted[i] == 'http://www.tibiabr.com/')
	{
		Imgs[i].setAttribute('src', 'http://images.tibiabr.com/Imgs/favicon.ico');
	}
	
	else if(Promoted[i] == 'http://en.tibiaml.com/')
	{
		Imgs[i].setAttribute('src', 'http://www.tibiaml.com/images/favicon/www.ico');
	}
	
	else
	{
		Imgs[i].setAttribute('src', Promoted[i] + 'favicon.ico');
	}
	
	// Take out border and put some padding
	Imgs[i].setAttribute('style', 'border: 0px; top: 2px; padding: 1px;');
	
	// Resize Images
	Imgs[i].setAttribute('height', '23');
	Imgs[i].setAttribute('width', '23');
}


/*       Append Elements       \/ */


for(i=1; i<=11; i++)
{
	// Add Images to Links
	Links[i].appendChild(Imgs[i]);
	
	// Wrap Links
	Wrapper.appendChild(Links[i]);
}


/*       Hide/Show Button       \/ */


// Add current saved Option
Option.innerHTML = GM_getValue('option');	

// Add Styles
Option.style.position			=	'fixed';
Option.style.top				=	window.innerHeight-50 + 'px';
Option.style.left				=	'5px';
Option.style.width				=	'20px';
Option.style.textAlign			=	'center';
Option.style.color				=	'white';
Option.style.cursor				=	'pointer';

Wrapper.style.position			=	'fixed';
Wrapper.style.top				=	window.innerHeight-30 + 'px';
Wrapper.style.left				=	'2px';
Wrapper.style.height			=	'25px';
Wrapper.style.textAlign			=	'center';
Wrapper.style.background		=	'white';
Wrapper.style.MozBorderRadius	=	'5px';

// Add Button & Wrapper
document.body.appendChild(Option);
document.body.appendChild(Wrapper);

// Create onClick Event
Option.addEventListener('click',Hide_Show,true);

// Check saved option
if(Option.innerHTML == 'Hide')
{
	Wrapper.style.display = 'block';
}

else
{
	Wrapper.style.display = 'none';
}


/*       Hide/Show Function       \/ */


function Hide_Show()
{
	if(Option.innerHTML == 'Hide')
	{
		GM_setValue('option', 'Show');
		
		Option.innerHTML = 'Show';
		
		Wrapper.style.display = 'none';
	}
	
	else
	{
		GM_setValue('option', 'Hide');
		
		Option.innerHTML = 'Hide';
		
		Wrapper.style.display = 'block';
	}
}