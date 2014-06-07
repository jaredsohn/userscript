// ==UserScript==
// @name           Zombie Apocalypse
// @namespace      Zombie Apocalypse
// @description    Replaces swine flu with zombie doom.
// @include        http://*
// @exclude        https://*
// ==/UserScript==


(function () {

  var replacements, regex, key, textnodes, node, s;

// Custom Words
// To do: Isolate certain words for full-word match only. Very crappy. It doesn't matter! Zombies!

replacements = {
  "swine flu": "zombie plague",
  "Swine Flu": "Zombie Plague",
  "swine influenza": "zombie plague",
  "Swine Influenza": "Zombie Plague",
  "influenza": "plague",
  "Influenza": "Plague",
  "flu": "plague",
  "Flu": "Plague",
  "H1N1": "T-JCCC203",
  "h1n1": "t-jccc203",
  "victim": "walking corpse",
  "Victim": "Walking Corpse",
  "sufferer": "shambling horror",
  "pig": "undead creature",
  "swine": "voodoo",
  "Swine": "Voodoo",
  "pandemic": "apocalypse",
  "Pandemic": "Apocalypse",
  "transmission": "bite",
  "strain": "mutation",
  "hog": "ghoul",
  "Hog": "Ghoul",
  "animal": "horror",
  "infected": "doomed",
  "killed": "reanimated",
  "died": "reanimated",
  "die": "reanimate",
  "death": "transformation",
  "meat": "brains",
  "Meat": "Brains",
  "skin": "human flesh",
  "weakness": "hunger",
  "illnesses": "cravings",
  "illness": "craving",
  "pigs": "living dead",
  "Pigs": "Living Dead",
  "humans": "the living",
  "coughing": "biting",
  "sneezing": "feeding",
  "herd": "horde",
  "person": "survivor",
  "people": "survivors",
  "population": "graveyard",
  "barn": "graveyard",
  "farm": "burial ground",
  "livestock": "cadavers",
  "disease": "curse",
  "vaccinate": "decapitate",
  "Vaccinate": "Decapitate",
  "vaccinating": "decapitating",
  "Vaccinating": "Decapitating",
  "vaccination": "decapitation",
  "Vaccination": "Decapitation",
  "vaccine": "weapon",
  "fever": "craving for brains",
  "ache": "wound",
  "cough": "rigor mortis",
  "facility": "stronghold",
  "facilities": "strongholds",
  "hospitals": "fortresses", 
  "hospital": "fortress", 
  "Hospitals": "Fortresses", 
  "Hospital": "Fortress", 
  "getting sick": "spreading plague", 
  "healthy": "living", 
  "seasonal": "monthly", 
  "season": "month", 
  "washing": "amputating", 
  "wash": "amputate", 
  };
regex = {};
for ( key in replacements ) {
  regex[key] = new RegExp(key, 'g');
}

var regextitle = new RegExp( "swine flu", "i" );


if ( document.title.match( regextitle ) ) {

	//alert( "Match!" );


	textnodes = document.evaluate( "//text()" , document , null , XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null );
	for ( var i=0 ; i<textnodes.snapshotLength ; i++ ) {
	  node = textnodes.snapshotItem(i);
	  s = node.data;
	  for ( key in replacements ) {
	    s = s.replace( regex[key] , replacements[key] );
	  }
	  node.data = s;
	}

} else {
	//alert( "Nothing found?!" );
}

})();