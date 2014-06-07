// ==UserScript==
// @name           infocenter_pirate_speak
// @namespace      devlance.com/piratespeak
// @description    Make your documentation talk like a pirate!
// @include        http://publib.boulder.ibm.com/infocenter/*
// @exclude        */advanced/*
// ==/UserScript==

/*
 * This script is intended to be entirelly satirical and might change the 
 * function and meaning of the text you read. No warranties are made for the
 * accuracy of the information you read when using this script. You are entirely
 * on your own. This is purely intended for getting a laugh when reading 
 * often times boring documentation within the IBM infocenters. 
 *     
 *
 *  Sources for this script: 
 * Part of this script were borrowed from various places including
 * Scott Reynen's "Browse like a pirate script" 
 * http://userscripts.org/scripts/review/5625 
 * 
 * and Andreas Gohr's talk like a pirate plugin for DocuWiki
 * http://www.dokuwiki.org/plugin:pirate   
*/

(function() {
  var replacements, regex, key, textnodes, node, s; 

replacements = {
	" about([ ,.?!])": " 'bout$1",
	" am([ ,\.\?!])": " be$1",
	" and([ ,\.\?!])": " an'$1",
	" around([ ,\.\?!])": " 'round$1",
	" arrest([ ,\.\?!])": " keelhaul$1",
	
	" bad([ ,\.\?!])": " scurvy$1",
	" beer([ ,\.\?!])": " grog$1",
	" between([ ,\.\?!])": " betwixt$1",
	" boy([ ,\.\?!])": " lad$1",
	
	" cents([ ,\.\?!])" : " shillings$1",
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
	" dollars([ ,\.\?!])" : " piece of eight$1",
	" did'nt know([ ,\.\?!])": " did nay know$1",
  " did'nt([ ,\.\?!])": " di'nae$1",
  " doesn't([ ,\.\?!])": " dern't$1",
	" don't([ ,\.\?!])": " dern't$1",
	" do not([ ,\.\?!])": " dern't$1",
	" drive([ ,\.\?!])": " sail$1",
	
	" earlier([ ,\.\?!])" : " afore$1",
	" ever([ ,\.\?!])": " e'er$1",
	
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
	
	" manager([ ,\.\?!])": " admiral$1",
	" money([ ,\.\?!])": " booty$1",
	" my([ ,\.\?!])": " me$1",
	
	
	" never([ ,\.\?!])": " ne'er$1",
	" new([ ,\.\?!])": " tender$1",
	
	" odd([ ,\.\?!])": " addled$1",
	" of([ ,\.\?!])": " o'$1",
	" oh my god([ ,\.\?!])": " begad$1",
	" over([ ,\.\?!])": " o'er$1",
	
	" person([ ,\.\?!])": " scallywag$1",
	" people([ ,\.\?!])": " scallywags$1",
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
	
	" understand([ ,\.\?!])" : " reckon$1",
	
  " was([ ,\.\?!])" : " were bein$1",
	" wasn't([ ,\.\?!])": " weren't$1",
	" woman([ ,\.\?!])": " buxom beauty$1",
	" women([ ,\.\?!])": " wenches$1",
	" wine([ ,\.\?!])": " grog$1",
	
	" yes([ ,\.\?!])": " aye$1",
	" you([ ,\.\?!])": " ye$1",
	" your([ ,\.\?!])": " yer'$1"	
};




regex = {}; 
for (key in replacements) { 
    regex[key] = new RegExp(key, 'g'); 
} 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 
    s = node.data; 
    for (key in replacements) { 
        s = s.replace(regex[key], replacements[key]); 
    } 
    node.data = s; 
} 

})();
