// ==UserScript==
// @name           Shartak Flavorizer
// @namespace      http://www.philosoph.us/
// @description    Adds flavorful descriptions to common locations.
// @include        http://www.shartak.com/game.cgi
// ==/UserScript==

// Shartak Flavorizer
// Version: 1.0 (2006-06-11)


var beach=new Array("The sand is hot but the ocean breeze is cool.", "A beautiful seashell catches your eye.", "You see crab marks in the sand.", "The sound of the waves soothes you.", "You breathe deeply in the open air.", "An empty bottle lies partially buried by the sand.", "Your eyes trace the smooth line where the ocean meets the sky.", "The sand shifts slightly beneath your feet.", "The peaks of distant waves glisten in the sunlight.");

var grassland=new Array("You see a snake's shed skin on the ground.", "The field sways and whispers in the wind.", "The weeds brush your hands as you move.", "Sunlight streams down from the clear sky.", "A large grasshopper jumps across your path.", "An insect flies by and lands on a nearby blade of grass.", "The weeds around you buzz with the noises of insects.");

var jungle=new Array("The undergrowth rustles beneath your feet.", "You hear the loud chirping of nearby insects.", "A colorful spider on the ground freezes as you move.", "You see a large ant colony busily rebuilding their hive.", "A large moth lands softly on your arm.", "A partial skeleton lies a short distance away.", "A dragonfly alights on a nearby rock.");

var nativeVillage=new Array("The smell of drying herbs greets your nostrils.", "Smoke rises from a nearby fire.", "A bundle of feathers hangs from a nearby hut.");

var outsiderVillage=new Array("The smell of gunpowder greets your nostrils.", "Smoke rises from a nearby fire.", "An animal pelt hangs from a nearby hut.");

var swamp=new Array("Your feet stick in the mire.", "The smell of rotten flesh floats through the stagnant breeze.", "You slap a large mosquito on your arm.", "The water leaves rings of filth on your legs as you wade.", "The swamp is eerily silent compared to the noise of the jungle.");

var tunnel=new Array("Noises echo softly off the walls.", "You find it difficult to see in such little light.", "You step on an old bone and break it.", "You run your hand along the grimy wall to guide your steps.", "You narrowly avoid hitting your head on a low-hanging rock.", "You hear water dripping in the distance.");

var water=new Array("The water beneath the surface is cool and refreshing.", "A patch of dead plants floats nearby.", "A rotten log a short distance away moves up and down with the water.", "The water glistens in the sun.");


var h3 = document.evaluate("//h3", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (h3.snapshotLength>0 && document.evaluate("//input[@value='Contact Home Shaman']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength==0) { // Only show flavor text if the player is alive, since some text wouldn't fit with a spirit player
	switch (h3.snapshotItem(0).textContent) { // Chooses the appropriate flavor array
		case "Beach": var flavor=beach; break;
		case "Dalpok": var flavor=nativeVillage; break;
		case "Derby": var flavor=outsiderVillage; break;
		case "Durham": var flavor=outsiderVillage; break;
		case "Grassland": var flavor=grassland; break;
		case "Jungle": var flavor=jungle; break;
		case "Raktam": var flavor=nativeVillage; break;
		case "Swamp": var flavor=swamp; break;
		case "Tunnel": var flavor=tunnel; break;
		case "Water": var flavor=water; break;
		case "Wiksik": var flavor=nativeVillage; break;
		case "York": var flavor=outsiderVillage; break;
	}
	flavor.push('', '', ''); // Adds three empty values so the player doesn't get flavor text all the time.
	document.evaluate("//td[@class='area']//p", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).textContent += " " + flavor[Math.floor(Math.random()*flavor.length)];
}


