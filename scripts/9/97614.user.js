// ==UserScript==
// @name           SV Fun Script
// @namespace      School Vandals Fun Script
// @description    Change somethings to do with SV
// @include        http://apps.facebook.com/schoolvandals*
// ==/UserScript==

var appID = 'app65748335077_';

var spotTagged = xpath("//a[contains(@title,'Claim')]/..");

var replacements, regex, key, textnodes, node, s;

replacements = {
    "Weekend Rehab for the Vodka Queens": "The Cheating Mo Fo School Of Cheats",
    "WEEKEND REHAB FOR THE VODKA QUEENS": "The Cheating Mo Fo School Of Cheats",
    "Colin Godden": "Colin (I Suck Cocks) Godden",
    "Joanne Lorenc Flack": "Joanne (Lots of Fakes) Flack",
    "Tina Walsh": "Tina (Im Real Honest) Walsh",
    "Sue Greenwood": "Sue (Plank Face) Greenwood",
    "Jennie Harris": "Jennie (Takes It Up The) Harris",
    "Mary Crooks": "Mary (I Dont Wash) Crooks",
    "Jem Jennings": "Jem (No Tits) Jennings",
    "AmyLouise Iseminger Carpenter": "AmyLouise (Gobshite) Carpenter",
    "Cazz Beaupierre": "Cazz (Im A Moose) Beaupierre",
    "Tracy Colley": "Tracy (Cheesy Muff) Colley",
    "Freida Reece Cameron": "Egg Freida Rice Cameron",
    "Theresa Billau": "Theresa Pillau of Rice",
    "Hanne Pohja": "Fanne Bahji",
    "Anthony Hicklin": "Anthony Friggin Hicklin",
    "Jennifer Carpenter Eckert": "Jennifer Carpet Chuff Eckert",
    "Theresa Billau": "Theresa Pillau of Rice",
    "Bobby Carpenter": "Bobby (Fake) Davro",
    "Brian Jagielski": "Brian Juggs Like A Woman",
    "James Russell": "Smelly Jack Russell",
    "Debbie Slaney": "Debbie Slag Pants",
    "Gayle Forbes": "Gayle Force Arse Wind",
    "Kevin Walsh": "Kevin (The Homo Teenager) Walsh",
    "Jay Michael Hunt": "Jay Hichael Munter",
    "Debbie Slaney": "Debbie Slag Pants",
    "School": "SkOoL"};
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

if ( spotTagged.snapshotLength > 0 ) {
  document.location = document.location + '&slot_id=' + spotTagged.snapshotItem(0).id.split('slot_')[1];
}

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}