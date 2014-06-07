// Skill sorter by Johnny Treehugger (#1427059)
//
// ==UserScript==
// @name           Skill sorter
// @namespace      http://kol.coldfront.net/thekolwiki/index.php/User:Johnny_Treehugger
// @description    Version 1.3 - Sorts skills by group
// @include        http://*kingdomofloathing.com/skills.php*
// @include        http://*127.0.0.1:*/skills.php*
// @include        http://*localhost:*/skills.php*
// ==/UserScript==

/*
Sorts the skills in the KoL skill list into groups.  To change the order of skills within a group, change the order of the skill names or IDs in the various arrays.  To change the relative order of groups, change the order of the arrays in the var "groups".  To change the maximum length of skill names, change skillNameMaxLength.
*/

// Version 0.0	09/17/2012	IT BEGINS!
// Version 1.0	09/17/2012	Basics done
// Version 1.1	09/17/2012	Can specify skills by name or ID, can limit length of skill names
// Version 1.2	09/23/2012	Reselect selected element
// Version 1.3	02/12/2014	More skills!
// Version X.Y	The future	A way of putting a skill in multiple groups (I just need to use Node.cloneNode(), probably )


var familiar = ["Jingle Bells", "Curiosity of Br'er Tarrypin", "Leash of Linguini", "Empathy of the Newt", "Chorale of Companionship", "Song of Accompaniment"];

var combatRate = ["Musk of the Moose", "Carlweather's Cantata of Confrontation", "Song of Battle", "Smooth Movement", "The Sonata of Sneakiness", "Song of Solitude"];

var heals = ["Miyagi Massage", "Tongue of the Otter", "Tongue of the Walrus", "Hibernate", "Spirit Vacation", "Lasagna Bandages", "Antibiotic Saucesphere", "Cannelloni Cocoon", "Disco Nap", "Disco Power Nap", "Cringle's Curative Carol", "Laugh it Off"];

var mprest = ["Salamander Kata", "Transcendent Al Dente", "Simmer", "Soul Food"];

var trivial = ["Seal Clubbing Frenzy", "Patience of the Tortoise", "Manicotti Meditation", "Sauce Contemplation", "Disco Aerobics", "Moxie of the Mariachi"];

var stats = ["Song of Bravado", "Blubber Up", "Rage of the Reindeer", "Blood Sugar Sauce Magic", "Disco Fever", "Disco Smirk", "The Moxious Madrigal", "The Magical Mojomuscular Melody", "The Power Ballad of the Arrowsmith", "Stevedave's Shanty of Superiority"];

var statGain = ["Drescher's Annoying Noise", "Pride of the Puffin", "Patient Smile", "Wry Smile", "Knowing Smile", "Aloysius' Antiphon of Aptitude", "Ur-Kel's Aria of Annoyance", "Pep Talk", "Song of Cockiness"];

var damage = ["Vent Rage Gland", "Worldpunch", "Deep Dark Visions", "Song of the North", "Song of Sauce", "Snarl of the Timberwolf", "Scowl of the Auk", "Tenacity of the Snapper", "Spiky Shell", "Arched Eyebrow of the Archmage", "Wizard Squint", "Icy Glare", "Sauce Monocle", "Jackasses' Symphony of Destruction", "Dirge of Dreadfulness", "Benetton's Medley of Diversity", "Elron's Explosive Etude", "Prelude of Precision", "Summon Boner Battalion", "Frigidalmatian", "Soul Funk"];

var resist = ["Song of Starch", "Holiday Weight Gain", "Reptilian Fortitude", "Ghostly Shell", "Astral Shell", "Stiff Upper Lip", "Shield of the Pastalord", "Elemental Saucesphere", "Scarysauce", "Brawnee's Anthem of Absorption"];

var init = ["Walberg's Dim Bulb", "Song of Slowness", "Springy Fusilli", "Cletus's Canticle of Celerity", "Suspicious Gaze", "Soul Rotation"];

var turnGen = ["Canticle of Carboloading", "The Ode to Booze", "Inigo's Incantation of Inspiration", "Song of the Glorious Lunch"];

var farming = ["Singer's Faithful Ocelot", "Disco Leer", "The Polka of Plenty", "Fat Leon's Phat Loot Lyric", "The Ballad of Richie Thingfinder", "Donho's Bubbly Ballad", "Song of Fortune"];

var blessing = ["Blessing of the War Snapper", "Blessing of She-Who-Was", "Blessing of the Storm Tortoise", "Spirit Boon", "Turtle Power"];

var pasta = ["Bind Vampieroghi", "Bind Vermincelli", "Bind Angel Hair Wisp", "Bind Undead Elbow Macaroni", "Bind Penne Dreadful", "Bind Lasagmbie", "Bind Spice Ghost", "Bind Spaghetti Elemental", "Dismiss Pasta Thrall"];

var miscBuff = ["Iron Palm Technique", "Jalapeno Saucesphere", "Jabanero Saucesphere"];

var summons = ["Request Sandwich", "Summon Crimbo Candy", "Lunch Break", "Grab a Cold One", "Spaghetti Breakfast", "Summon Annoyance", "Pastamastery", "Advanced Saucecrafting", "That's Not a Knife", "Advanced Cocktailcrafting", "Rainbow Gravitation", "Demand Sandwich"];

var tomes = ["Summon Snowcones", "Summon Stickers", "Summon Sugar Sheets", "Summon Clip Art", "Summon Rad Libs", "Summon Smithsness"];

var librams = ["Summon Candy Heart", "Summon Party Favor", "Summon Love Song", "Summon BRICKOs", "Summon Dice", "Summon Resolutions", "Summon Taffy"];

var grims = ["Summon Hilarious Objects", "Summon Tasteful Items", "Summon Alice's Army Cards", "Summon Geeky Gifts"];

var heart = ["The Smile of Mr. A.", "Arse Shoot", "Managerial Manipulation", "Psychokinetic Hug"];

var flavor = ["Spirit of Cayenne", "Spirit of Peppermint", "Spirit of Garlic", "Spirit of Wormwood", "Spirit of Bacon Grease", "Spirit of Nothing"];


var groups = [
	      [familiar, 'Familiar Buffs'],
	      [combatRate, 'Combat Rate Modifiers'],
	      [heals, 'HP Restorers'], 
	      [mprest, 'MP Restorers'],
	      [trivial, 'Trivial Stat Boosts'],
	      [stats, 'Stat Boosts'],
	      [statGain, 'Stat Gain Buffs'],
	      [damage, 'Damage Buffs'], 
	      [resist, 'Resistance Buffs'],
	      [init, 'Initiative Buffs'], 
	      [turnGen, 'Turn Gen/Savings'],
	      [farming, 'Farming Buffs'],
	      [flavor, 'Flavour of Magic'],
	      [heart, 'Heart-y Buffs'],
	      [blessing, 'Turtle Blessings'],
	      [pasta, 'Pasta Thralls'],
	      [miscBuff, 'Miscellaneous'],
	      [summons, 'Summons'], 
	      [tomes, 'Tomes'],
	      [librams, 'Librams'], 
	      [grims, 'Grimoires']
	     ];

function doSkills(skillTrans) {
  var skillNameMaxLength = 21;

  var selectList = document.getElementsByName('whichskill');
  var selectElement = selectList[0];
  var optionList = selectElement.childNodes;
  var optionArray = new Array();
  var selectedOpt = null;

  for (var i=0; i<optionList.length; i++) {
    var opt = optionList[i]
    if (opt.tagName=='OPTION') {
      optionArray[opt.value] = opt;
      if (opt.selected) selectedOpt = opt;
    } else if (opt.tagName=='OPTGROUP') {
      var groupList = opt.childNodes;
      for (var j=0; j<groupList.length; j++) {
	var gOpt = groupList[j];
	if (gOpt.tagName=='OPTION') {
	  optionArray[gOpt.value] = gOpt;
	  if (gOpt.selected) selectedOpt = gOpt;
	} else {
	  alert("Huh? " + gOpt);
	}
      }
    } else {
      alert("Huh? " + opt);
    }
  }

  for (optId in optionArray) {
    var opt = optionArray[optId];
    var optText = opt.text;
    if (optText.indexOf("(")>skillNameMaxLength) {
      opt.text = optText.substring(0, skillNameMaxLength-4) + "... " + optText.substring(optText.indexOf("("));
    }
  }

  var newSelect = document.createElement("SELECT");
  if (optionArray[999]!=null) {
    newSelect.appendChild(optionArray[999]);
    optionArray[999] = null;
  }

  for (var i=0; i<groups.length; i++) {
    var newGroup = document.createElement("OPTGROUP");
    newGroup.label = groups[i][1];
    skillList = groups[i][0];
    var skillsFound = 0;
    for (var j=0; j<skillList.length; j++) {
      var skillId = skillList[j];
      if (optionArray[skillId]==null) skillId = skillTrans[skillId];
      if (optionArray[skillId]!=null) {
	newGroup.appendChild(optionArray[skillId]);
	optionArray[skillId] = null;
	skillsFound++;
      } 
    }
    //alert("Group " + groups[i][1] + " got " + skillsFound);
    if (skillsFound>0) {
      newSelect.appendChild(newGroup);
    }
  }

  //  var toRet = "";
  for (skillId in optionArray) {
    if (optionArray[skillId]!=null) newSelect.appendChild(optionArray[skillId]);
    //if (optionArray[skillId]!=null) toRet = toRet + skillId + ": " + optionArray[skillId].text + "\n";
  }
  //alert(toRet);

  while (selectElement.hasChildNodes && selectElement.firstChild!=null) {
    selectElement.removeChild(selectElement.firstChild);
  }

  while (newSelect.hasChildNodes && newSelect.lastChild!=null) {
    selectElement.insertBefore(newSelect.lastChild, selectElement.firstChild);
  }

  if (selectedOpt!=null) {
//    alert("Reselecting " + selectedOpt.value);
    selectedOpt.selected = true;
  }

  //selectElement.parentNode.replaceChild(newSelect, selectElement);
}

function loadSkills() {
  var skillTrans = [
    ["The Smile of Mr. A.", 3], 
    ["Arse Shoot", 4], 
    ["Rainbow Gravitation", 44], 
    ["Vent Rage Gland", 45], 
    ["Summon Crimbo Candy", 53], 
    ["Lunch Break", 60], 
    ["Managerial Manipulation", 62], 
    ["Miyagi Massage", 64], 
    ["Salamander Kata", 65], 
    ["Worldpunch", 72], 
    ["Summon Boner Battalion", 75], 
    ["Request Sandwich", 82], 
    ["Frigidalmatian", 83], 
    ["Walberg's Dim Bulb", 87], 
    ["Singer's Faithful Ocelot", 88], 
    ["Drescher's Annoying Noise", 89], 
    ["Deep Dark Visions", 90], 
    ["Grab a Cold One", 95], 
    ["Song of the North", 96], 
    ["Song of Slowness", 100], 
    ["Spaghetti Breakfast", 101], 
    ["Song of Starch", 103], 
    ["Song of Sauce", 105], 
    ["Song of Bravado", 106], 
    ["Summon Annoyance", 107], 
    ["Psychokinetic Hug", 111], 
    ["Seal Clubbing Frenzy", 1000], 
    ["Blubber Up", 1007], 
    ["Tongue of the Walrus", 1010], 
    ["Rage of the Reindeer", 1015], 
    ["Musk of the Moose", 1019], 
    ["Snarl of the Timberwolf", 1020], 
    ["Holiday Weight Gain", 1024], 
    ["Iron Palm Technique", 1025], 
    ["Hibernate", 1027], 
    ["Scowl of the Auk", 1031], 
    ["Pride of the Puffin", 1040], 
    ["Patience of the Tortoise", 2000], 
    ["Ghostly Shell", 2007], 
    ["Reptilian Fortitude", 2008], 
    ["Empathy of the Newt", 2009], 
    ["Tenacity of the Snapper", 2010], 
    ["Astral Shell", 2012], 
    ["Jingle Bells", 2025], 
    ["Curiosity of Br'er Tarrypin", 2026], 
    ["Spirit Vacation", 2027], 
    ["Stiff Upper Lip", 2029], 
    ["Blessing of the War Snapper", 2030], 
    ["Spiky Shell", 2031], 
    ["Blessing of She-Who-Was", 2033], 
    ["Blessing of the Storm Tortoise", 2037], 
    ["Spirit Boon", 2039], 
    ["Patient Smile", 2040], 
    ["Turtle Power", 2041], 
    ["Manicotti Meditation", 3000], 
    ["Pastamastery", 3006], 
    ["Lasagna Bandages", 3009], 
    ["Leash of Linguini", 3010], 
    ["Cannelloni Cocoon", 3012], 
    ["Springy Fusilli", 3015], 
    ["Canticle of Carboloading", 3024], 
    ["Transcendent Al Dente", 3026], 
    ["Bind Vampieroghi", 3027], 
    ["Arched Eyebrow of the Archmage", 3028], 
    ["Bind Vermincelli", 3029], 
    ["Bind Angel Hair Wisp", 3031], 
    ["Shield of the Pastalord", 3032], 
    ["Bind Undead Elbow Macaroni", 3033], 
    ["Bind Penne Dreadful", 3035], 
    ["Bind Lasagmbie", 3037], 
    ["Wizard Squint", 3038], 
    ["Bind Spice Ghost", 3039], 
    ["Bind Spaghetti Elemental", 3041], 
    ["Sauce Contemplation", 4000], 
    ["Advanced Saucecrafting", 4006], 
    ["Elemental Saucesphere", 4007], 
    ["Jalapeno Saucesphere", 4008], 
    ["Scarysauce", 4019], 
    ["Simmer", 4025], 
    ["Icy Glare", 4026], 
    ["Antibiotic Saucesphere", 4033], 
    ["Wry Smile", 4035], 
    ["Sauce Monocle", 4037], 
    ["Blood Sugar Sauce Magic", 4038], 
    ["Disco Aerobics", 5000], 
    ["Disco Nap", 5007], 
    ["Disco Fever", 5009], 
    ["Advanced Cocktailcrafting", 5014], 
    ["Smooth Movement", 5017], 
    ["That's Not a Knife", 5028], 
    ["Disco Smirk", 5031], 
    ["Disco Leer", 5039], 
    ["Moxie of the Mariachi", 6000], 
    ["Aloysius' Antiphon of Aptitude", 6003], 
    ["The Moxious Madrigal", 6004], 
    ["Cletus's Canticle of Celerity", 6005], 
    ["The Polka of Plenty", 6006], 
    ["The Magical Mojomuscular Melody", 6007], 
    ["The Power Ballad of the Arrowsmith", 6008], 
    ["Brawnee's Anthem of Absorption", 6009], 
    ["Fat Leon's Phat Loot Lyric", 6010], 
    ["The Psalm of Pointiness", 6011], 
    ["Jackasses' Symphony of Destruction", 6012], 
    ["Stevedave's Shanty of Superiority", 6013], 
    ["The Ode to Booze", 6014], 
    ["The Sonata of Sneakiness", 6015], 
    ["Carlweather's Cantata of Confrontation", 6016], 
    ["Ur-Kel's Aria of Annoyance", 6017], 
    ["Dirge of Dreadfulness", 6018], 
    ["Gemelli's March of Testery", 6019], 
    ["The Ballad of Richie Thingfinder", 6020], 
    ["Benetton's Medley of Diversity", 6021], 
    ["Elron's Explosive Etude", 6022], 
    ["Chorale of Companionship", 6023], 
    ["Prelude of Precision", 6024], 
    ["Donho's Bubbly Ballad", 6026], 
    ["Cringle's Curative Carol", 6027], 
    ["Inigo's Incantation of Inspiration", 6028], 
    ["Suspicious Gaze", 6036], 
    ["Knowing Smile", 6042], 
    ["Spirit of Cayenne", 7176], 
    ["Spirit of Peppermint", 7177], 
    ["Spirit of Garlic", 7178], 
    ["Spirit of Wormwood", 7179], 
    ["Spirit of Bacon Grease", 7180], 
    ["Spirit of Nothing", 7181], 
    ["Soul Food", 7185], 
    ["Soul Rotation", 7186], 
    ["Soul Funk", 7187], 
    ["Dismiss Pasta Thrall", 7188], 
    ["Summon Snowcones", 8000], 
    ["Summon Stickers", 8001], 
    ["Summon Sugar Sheets", 8002], 
    ["Summon Clip Art", 8003], 
    ["Summon Rad Libs", 8004], 
    ["Summon Smithsness", 8005], 
    ["Summon Candy Heart", 8100], 
    ["Summon Party Favor", 8101], 
    ["Summon Love Song", 8102], 
    ["Summon BRICKOs", 8103], 
    ["Summon Dice", 8104], 
    ["Summon Resolutions", 8105], 
    ["Summon Taffy", 8106], 
    ["Summon Hilarious Objects", 8200], 
    ["Summon Tasteful Items", 8201], 
    ["Summon Alice's Army Cards", 8202], 
    ["Summon Geeky Gifts", 8203], 
    ["Pep Talk", 11005], 
    ["Song of Cockiness", 11008], 
    ["Song of Accompaniment", 11013], 
    ["Song of Solitude", 11015], 
    ["Song of Fortune", 11017], 
    ["Song of Battle", 11019], 
    ["Demand Sandwich", 11021], 
    ["Song of the Glorious Lunch", 11023], 
    ["Laugh it Off", 11031], 
    ["Bite Minion", 12001], 
    ["Lure Minions", 12002], 
    ["Summon Minion", 12021], 
    ["Zombie Chow", 12022], 
    ["Scavenge", 12024], 
    ["Summon Horde", 12026], 
    ["Ag-grave-ation", 12028], 
    ["Disquiet Riot", 12029], 
    ["Recruit Zombie", 12031], 
    ["Conjure Eggs", 14001], 
    ["Conjure Dough", 14002], 
    ["Egg Man", 14005], 
    ["Coffeesphere", 14008], 
    ["Conjure Vegetables", 14011], 
    ["Conjure Cheese", 14012], 
    ["Radish Horse", 14015], 
    ["Oilsphere", 14018], 
    ["Conjure Meat Product", 14021], 
    ["Conjure Potato", 14022], 
    ["Hippotatomous", 14025], 
    ["Gristlesphere", 14028], 
    ["Conjure Cream", 14031], 
    ["Conjure Fruit", 14032], 
    ["Cream Puff", 14035], 
    ["Chocolatesphere", 14038] 
  ];

  var skArray = new Array();
  for (var q=0; q<skillTrans.length; q++) {
    skArray[skillTrans[q][0]] = skillTrans[q][1];
  }

//  alert(skArray["Summon Snowcones"]);
  return skArray;
}

var skillTrans = loadSkills();
doSkills(skillTrans);
