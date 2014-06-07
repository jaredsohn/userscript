// ==UserScript==
// @name            Dumpert crap cleaner
// @namespace       http://lalalalalallalal

// @description     Blokkeert videoadvertenties en ads op http://dumpert.nl. testje ziet, mm might need some extra work
// @match           *://dumpert.nl/mediabase/*
// @match           *://www.dumpert.nl/mediabase/*
// @match           *://www.dumpert.nl/*
// @match           *://www.dumpert.nl/toppers/*
// @match           *://www.dumpert.nl/filmpjes/*
// @version         1
// @grant           none
// ==/UserScript==

/**
* schaamteloos gejat en gecombineert+wat eigen toevoegingen, credits naar de scripts onder me
* http://userscripts.org/scripts/review/93369
* http://userscripts.org/scripts/review/119255

*-------------------------------------------verplichte melding---------------------------------------------- 
 * Blocks advertisements on Dumpert videos.
 *
 * Copyright (c) 2011 Reinier Kip
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *----------------------------------------------------------------------------------------------------------
 **/

var tryFor   = 5000, // Try for (approx.) five seconds
	tryEvery = 50,   // Try every 50 milliseconds
	triedFor = 0;    // Have already tried for (ms)

function blockVideoAd() {
	var item = document.querySelector('#item1_wrapper');
	if(item) {
		item.innerHTML = item.innerHTML.replace(/&amp;plugins=ova\-h/, '') + '<small style="float:right;font-size:8px;color:gray">AD BLOCKED</small>';
		return true;
	} else {
		return false;
	}
}

function tryLoop() {
	var success;
	
	triedFor += tryEvery;
	success = blockVideoAd();

	if(!success && triedFor < tryFor)
		window.setTimeout(tryLoop, tryEvery);
}

tryLoop();



(function() {
 // Remove some frame cluttering stuff
 $('#maincontainer').css('background', 'none');
 $('#maincol').css('width', '1193px');
 $('#div-gpt-ad-1352202712466-0').remove();
 $('#footcontainer').remove();
 $('#dumphole').remove();
 $('#topbarcontainer').remove();
 
 
 $('#side').remove();
 $('#filmcontainer').css('top', '50px');
 $('#fotocontainer').css('top', '50px');
 $('#audiocontainer').css('top', '50px');
 $('#top5container').css('top', '50px');
 // Leave some space for the title.
 $('#iteminfo').css('top', '90px');
 $('#playercontainer').css('top', '90px');
  $('#tagcontainer').css('top', '50px');
 //remove bottom
 $('#uploadcontainer').remove();
 $('div:last').remove();
}) ();