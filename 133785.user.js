<script language = "javascript">

// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           pirates_photos_conversor
// @author         Renato Cordeiro e Ricardo Morita
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// ==/UserScript==


var piratePhotos = new Array("http://img406.imageshack.us/img406/2343/youareapirate.jpg","http://img269.imageshack.us/img269/9189/tumblrli944dx0rl1qfeor7.png", "http://img221.imageshack.us/img221/3107/stockvectorpiratetigerv.jpg", "http://img824.imageshack.us/img824/1175/stockillustration135765.jpg", "http://img827.imageshack.us/img827/1422/stockillustration419108.jpg","http://img43.imageshack.us/img43/739/pirate3ltnb.png", "http://img31.imageshack.us/img31/339/pirate2tnb.png","http://img502.imageshack.us/img502/2802/pirateb.jpg", "http://img546.imageshack.us/img546/8885/pirateq.gif","http://img215.imageshack.us/img215/9555/pirateparrot.jpg", "http://img827.imageshack.us/img827/2543/piratemonkeywithpalmtre.jpg","http://img12.imageshack.us/img12/9118/piratetweet.jpg", "http://img542.imageshack.us/img542/5489/piratemaskimagerdax65.jpg","http://img593.imageshack.us/img593/306/cartoonpiratepostcardp2.jpg", "http://img256.imageshack.us/img256/2228/c05650950f64231522a1962.png","http://img839.imageshack.us/img839/5536/3494299380237illustrati.jpg", "http://img338.imageshack.us/img338/2277/13401301445cartoonchara.jpg","http://img607.imageshack.us/img607/9213/0511081027014056femalep.png", "http://img513.imageshack.us/img513/5201/0511080909133802piratec.png");
// Links to photos that will substitute the user's one.


var photos = document.getElementsByClassName('uiProfilePhoto')
// These array from PHP receives all the photos from the page

var adresses = new Array(photos.length);
var auxiliar = new Array(photos.length);


for(var i=0; i < photos.length; i++)           // Setting array photos with users' adresses.
	adresses[i] = photos[i].parentNode.href;

for(var k=0; k < auxiliar.length; k++)         // Setting an auxiliar array.
	auxiliar[k] = false;


for(var j=0; j < adresses.length; j++) {
	if(auxiliar[j] == false) {
		photos[j].src = piratePhotos[Math.floor(Math.random()*piratePhotos.length)];
		auxiliar[j] = true;
		for(var l = j; l < adresses.length; l++) {
			if(adresses[l] == adresses[j]) {
				photos[l].src = photos[j].src;
				auxiliar[l] = true;
			}
		}
	}
} // function defPiratePhotos



// --------------------------------------------------------------------
// This Javascript code is "Browse like a Pirate" by Scott Reynen. 
// ("http://userscripts.org/scripts/show/5625"). Above, you can also
// find the transcription of its legal distribution.
//
// 
// Browse Like a Pirate
// version 1.0
// 2006-09-17
// Copyright 2006, Scott Reynen
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details:
// <http://www.gnu.org/licenses/gpl.txt>
//
// Revision history:
// 1.0  2006-09-17 initial version, based on:
//      http://diveintogreasemonkey.org/download/dumbquotes.user.js
// --------------------------------------------------------------------

var replacements, regex, key, textnodes, node, s , openings;

replacements = {
	" about([ ,.?!])": " 'bout$1",
	" am([ ,\.\?!])": " be$1",
	" and([ ,\.\?!])": " an'$1",
	" around([ ,\.\?!])": " 'round$1",
	" arrest([ ,\.\?!])": " keelhaul$1",
	
	" bad([ ,\.\?!])": " scurvy$1",
	" beer([ ,\.\?!])": " grog$1",
	" between([ ,\.\?!])": " 'tween$1",
	" boy([ ,\.\?!])": " lad$1",
	
	" cheat([ ,\.\?!])": " hornswaggle$1",
	" child([ ,\.\?!])": " wee one$1",
	" children([ ,\.\?!])": " wee ones$1",
	" coffee([ ,\.\?!])": " grog$1",
	" condemn([ ,\.\?!])": " keelhaul$1",
	" conference([ ,\.\?!])": " parlay$1",
	" conservative([ ,\.\?!])": " scallywag$1",
	" crazy([ ,\.\?!])": " addled$1",
	
	" dead([ ,\.\?!])": " in Davy Jones' Locker$1",
	" Democrat([ ,\.\?!])": " Buccaneer$1",
	" Democrats([ ,\.\?!])": " Buccaneers$1",
	" doesn't([ ,\.\?!])": " don't$1",
	" drive([ ,\.\?!])": " sail$1",
	
	" fly([ ,\.\?!])": " sail$1",
	" foolish([ ,\.\?!])": " addled$1",
	" for([ ,\.\?!])": " fer$1",
	" friend([ ,\.\?!])": " matey$1",
	" friends([ ,\.\?!])": " hearties$1",
	
	" girl([ ,\.\?!])": " lass$1",
	" government([ ,\.\?!])": " plundering$1",
	
	" he([ ,\.\?!])": " the bilge rat$1",
	" hello([ ,\.\?!])": " ahoy$1",
	" her ": " the proud beauty's ",
	" hey([ ,\.\?!])": " avast!$1",
	" hi([ ,\.\?!])": " ahoy$1",
	" his([ ,\.\?!])": " the powder monkey's$1",
	
	"ing([ ,\.\?!])": "in'$1",
	" in([ ,\.\?!])": " 'n$1",
	" is([ ,\.\?!])": " be$1",
	" it's([ ,\.\?!])": " 'tis$1",
	
	" kid([ ,\.\?!])": " wee one$1",
	" kids([ ,\.\?!])": " wee ones$1",
	" kill([ ,\.\?!])": " keelhaul$1",
	
	" left([ ,\.\?!])": " port$1",
	" liberal([ ,\.\?!])": " buccaneer$1",
	
	" money([ ,\.\?!])": " booty$1",
	" my([ ,\.\?!])": " me$1",
	
	" new([ ,\.\?!])": " tender$1",
	
	" odd([ ,\.\?!])": " addled$1",
	" of([ ,\.\?!])": " o'$1",
	" oh my god([ ,\.\?!])": " begad$1",
	
	" prosecute([ ,\.\?!])": " keelhaul$1",
	
	" quick([ ,\.\?!])": " smart$1",
	" quickly([ ,\.\?!])": " smartly$1",
	
	" Republican([ ,\.\?!])": " Scallywag$1",
	" Republicans([ ,\.\?!])": " Scallywags$1",
	" right([ ,\.\?!])": " starboard$1",
	
	" silly([ ,\.\?!])": " addled$1",
	" she([ ,\.\?!])": " the lass$1",
	" speech([ ,\.\?!])": " parlance$1",
	" suck([ ,\.\?!])": " suck bilge$1",
	" sucks([ ,\.\?!])": " sucks bilge$1",
	" steal([ ,\.\?!])": " hornswaggle$1",
	
	" telescope([ ,\.\?!])": " spyglass$1",
	" terrorist([ ,\.\?!])": " scourge of the seven seas$1",
	" terrorists([ ,\.\?!])": " landlubbers$1",
	"tion([ ,\.\?!])": "tin'$1",
	"tions([ ,\.\?!])": "tin's$1",
	" to([ ,\.\?!])": " t'$1",
	" tomorrow([ ,\.\?!])": " the morrow$1",
	
	" wasn't([ ,\.\?!])": " weren't$1",
	" woman([ ,\.\?!])": " buxom beauty$1",
	" women([ ,\.\?!])": " wenches$1",
	" wine([ ,\.\?!])": " grog$1",
	
	" yes([ ,\.\?!])": " aye$1",
	" you([ ,\.\?!])": " ye$1",
	" your([ ,\.\?!])": " yer'$1"	
};


openings = [
	'Avast! ' , 'Yarrr! ' , 'Blimey! ' ,'Ahoy! ' , 'Harrr! ' , 'Aye aye! ' , 
	'Shiver me timbers! ' , 'Arrrr! '
];

var openingNumber = 0;

regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
	
	node = textnodes.snapshotItem(i);
	s = node.data;
	
	for (key in replacements) {
		s = s.replace(regex[key], replacements[key]);
	}

	node.data = s;

}

var paragraphs = document.getElementsByTagName( 'p' );

for ( var i = 0; i < paragraphs.length; i++ )
{

	var paragraph = paragraphs[i];
	paragraph.innerHTML = openings[openingNumber] + paragraph.innerHTML;
	openingNumber++;
	if ( openingNumber == openings.length ) openingNumber = 0;

} // for
</script>