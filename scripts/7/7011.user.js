// Liberal To Conservative
// version 0.3 BETA!
// 2008-09-05
// Copyright (c) 2008, Jon Almada http://www.ayeladdy.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script to use with Firefox. To install it, you need
// Greasemonkey (latest version): http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Liberal to Conservative Translator", and click Uninstall.
//
// -------------------------------------------------------------------

// ==UserScript==

// @name           Keep Republicans laughing
// @namespace http://www.ayeladdy.com
// @description  A template to provide some laugh relief for Republicans.
// @include        *
// Add excludes here as needed for websites you don't wish this script to translate.
// ==/UserScript==

var replacements, regex, key, textnodes, node, s;

replacements = {

"Nancy Pelosi": "Queen of the Tax Hiking Liberals",
"Pelosi": "Her Nibbs",
"Reid": "Dr. No",
"110th Congress": "Republicans being hostage-held Congress",
"congress": "Do-Nothing Congress",
"Moveon.org": "That looney left-wing propaganda arm of the DNC",
"AARP": "Retired Persons unknowingly supporting liberalism",
"troop withdrawal": "cut and run",
"surge": "surge. You know. That thing that worked despite howls of democrats saying we should surrender.",
"Democratic Party": "Socialist Party",
"democratic agenda": "agenda for increased taxes",
"taxes": "taxation without representation",
"Democrats": "Socialists",
"Democrat": "Socialist",
"war protester": "uninformed person hiding behind the protection of our military",
"Anarchist": "Anarchist usually plotting some nefarious trouble",
"Social Security": "Socialist Security",
"Cindy Sheehan": "That nutball protester",
"Sheehan": "Dipstick and American disgrace - Cindy Sheehan",
"CodePink": "Static and Noise Generators",
"Hillary": "Billary",
"Henry Waxman": "Axeman",
"Leftists": "Communists",
"Liberalism": "Communism",
"MoveOn": "Traitors",
"John Kerry": "Lurch",
"Obama": "Osama",
"Barrack": "Balrock",
"Tax Hike": "Tax Hike imposed on hard-working Americans",
"small business": "small business, the ATM machine for the left",
"University": "Clubhouse for left-leaning professors",
"Jimmy Carter": "Mr Peanut",
"Michael Moore": "The Jackal",
"Ted Kennedy": "I don't know what the hell is going on Kennedy",
"liberal": "uninformed problem generator",
"Al Gore": "ALGORE",
"Biden": "Billy Bob Byden",
"affordable and quality health care": "Canadian health care nightmare",
"DNC": "Do Nothing arm of the Congress",
"Harry Reid": "Belzebub"};

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
