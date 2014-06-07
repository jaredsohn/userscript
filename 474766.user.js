// ==UserScript==
// @name           Wawedit
// @namespace      http://localhost
// @description    allows you to change the words on certain pages
// @include        http://wawgame.eu/*
// ==/UserScript==
// var strongElems = document.getElementsByTagName('td');
// var buttonElems = document.getElementsByTagName('input');
// var wantToHide  = false;
// 
// for (var i=0; i<strongElems.length; i++)
// {
// 	var thisElem = strongElems[i];
//   	if (i === 0) {
//     thisElem.textContent = "Demand Tribute from Gauls"; // change it
//     }
//     if (i === 1) {
//     thisElem.textContent = "If you demand tribute from gauls, you have a decent chance of getting more growth. Only capitalists may do this.";
//     }
//     if (i === 5) {
//     thisElem.textContent = "Slave Centers";
//     }
//     if (i === 6) {
//     thisElem.textContent = "Slavers will sell you gladiators if you set up slave centers. These gladiators may lead to growth through tourism and can also increase your trade capital!";
//     }
// 	if (i === 10) {
//     thisElem.textContent = "Distribute Gaul farms amongst your veterans";
//     }
//     if (i === 11) {
//     thisElem.textContent = "Your veterans are likely to work hard in the fields, providing food and thus growth for Rome!";
//     }
//     if (i === 6) {
//     thisElem.textContent = "Slavers will sell you gladiators if you set up slave centers. These gladiators may lead to growth through tourism and can also increase your trade capital";
//     }
//     if (i === 6) {
//     thisElem.textContent = "Slavers will sell you gladiators if you set up slave centers. These gladiators may lead to growth through tourism and can also increase your trade capital";
//     }
// 
// 
// 
// 
// 
// 
// }
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /GEU/gi;
var replace = 'Reichsmarks';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /fuel/g;
var replace = 'coal';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Fuel/g;
var replace = 'Coal';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /shipyard(?!s)/gi;
var replace = 'Werft';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /shipyards/gi;
var replace = 'Werften';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Regions
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /system/gi;
var replace = 'state';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /amyntas/gi;
var replace = 'Anhalt';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /bion/gi;
var replace = 'Bavaria';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /cleon/gi;
var replace = 'Coburg';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /draco/gi;
var replace = 'Danzig';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Resources
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /duranium/gi;
var replace = 'Wood';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /tritanium/gi;
var replace = 'Iron';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Adamantium/gi;
var replace = 'Steel';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Training
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = new RegExp('Finely-honed','gi');
var replace = 'Warriors of the Vaterland';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /ragtag/gi;
var replace = 'Frenchie';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /disorganized/gi;
var replace = 'British';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /coordinated/gi;
var replace = 'Danish';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /well-trained/gi;
var replace = 'Austrian';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}

//Ship types
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Fighter(?!s)/gi;
var replace = 'Ironclad';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Fighters/gi;
var replace = 'Ironclads';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /corvette(?!s)/gi;
var replace = 'Kronprinz';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /corvettes/gi;
var replace = 'Kronprinzen';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /light cruiser(?!s)/gi;
var replace = 'Königsberg';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /light cruisers/gi;
var replace = 'Königsbergen';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /destroyer(?!s)/gi;
var replace = 'Bayern';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /destroyers/gi;
var replace = 'Bayernen';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /frigate(?!s)/gi;
var replace = 'König';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /frigates/gi;
var replace = 'Königen';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /heavy cruiser(?!s)/gi;
var replace = 'Deutchland';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /heavy cruisers/gi;
var replace = 'Deutchlanden';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /battlecruiser(?!s)/gi;
var replace = 'Kaiser Friedrich III';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /battlecruisers/gi;
var replace = 'Kaisern Friedrich III';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /battleship(?!s)/gi;
var replace = 'Brandenburg';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /battleships/gi;
var replace = 'Brandenburgen';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /dreadnaught(?!s)/gi;
var replace = 'Fürst Bismarck';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /dreadnaughts/gi;
var replace = 'Fürst Bismarck';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Policy titles
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /economic policies/gi;
var replace = 'Anti-Socialist Laws';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /domestic policies/gi;
var replace = 'The Filth Crown';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /diplomatic policies/gi;
var replace = 'Foreigners';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /military policies/gi;
var replace = 'Militaria';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Policy tabs
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Economics/g;
var replace = 'Anti-Socialist Laws';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Domestic/g;
var replace = 'The Filth Crown';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Diplomacy/g;
var replace = 'Foreigners';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Military/g;
var replace = 'Militaria';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Economic/g;
var replace = 'Anti-Socialism';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Anti-Socialism state/g;
var replace = 'Form of Anti-Socialism';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Rebels
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /rebels/g;
var replace = 'socialists and democrats';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Rebels/g;
var replace = 'Socialists and Democrats';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /fleet/g;
var replace = 'militaria';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Fleet/g;
var replace = 'Militaria';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Specific policies
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Round Up Dissenters/g;
var replace = 'Shoot the Socialists';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Stability will rise slightly and your government will become more authoritarian, but people will be unhappy./g;
var replace = 'Your chancellor urges you to provoke the rebels into armed rebellion so you can kill them in the streets. This will raise stability, but the bleeding-heart leftists will disapprove.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Your government will become more democratic if you free those who criticise you, but stability will drop slightly and your prisoners might even join the/g;
var replace = 'Makes your world more constitutional, but lowers stability and may increase ';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Martial Law(?!.)/g;
var replace = 'Massacre of the Innocents';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Declare Martial Law. This can only be done when your world is in a state of war. The Militaria Admiralty will take control and you will gain military units. Stability will greatly increase but you will lose the people's approval./g;
var replace = 'You are at war! Time to take those rich college kids out of school and put them in the army. I am sure it will work perfectly.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /You can set up a free worldwide literacy program for your people, and their quality of life will increase as a result./g;
var replace = "It's not the eighteenth century anymore! Reading is an essential in this modern world, and teaching it will improve lives.";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Healthcare Program/g;
var replace = 'Modern Medicine';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Put free healthcare provisions in place for your people and their quality of life will increase tremendously. /g;
var replace = "It's not the eighteenth century anymore; leeches and humorism have been disproven. Put your modern scientists to work on vaccines and antibiotics and quality of life will improve dramatically.";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Encourage Entrepreneurship/g;
var replace = 'Encourage Industry';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /If you set up schemes to encourage new businesses, then growth might increase. Only available to Free Markets./g;
var replace = 'With the right incentives, captains of industry may expand their factories, improving growth. Only Free Markets can do this';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Trade Centres/g;
var replace = 'Foreign Trade';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Traders might be attracted to your world if you improve and expand upon your trade centres. /g;
var replace = 'If you improve your space docks, more trader ships will dock in them, increasing trade capital and maybe growth. ';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Production Drive/g;
var replace = 'Raise Colonial Taxes';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Your economic machine must be improved! A high chance of increasing growth. Only available to Central Planning worlds./g;
var replace = "Your Africans and New Guineans aren't paying enough taxes! This has a high chance of increasing growth. Only available to Mercantilist worlds.";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /You can set your dissidents to work, with a high chance of increasing growth, but the rest of the population will not be happy. Only available to autocracies./g;
var replace = "Your colonial subjects aren't working hard enough! Enslave them and see if that helps. Very high chance of improving growth, but bleeding heart leftists will disapprove. Only available to Absolute Monarchies.";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Loan Sharks/g;
var replace = 'Schutzjuden';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /In desperate need of cash? There are plenty of... less than reputable people out there willing to lend, but their repayments will be taxing./g;
var replace = 'In desperate need of Reichsmarks? Your schutzjuden are happy to give you a loan. With interest, of course.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Nationalise Businesses/g;
var replace = 'Interfere With Business';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /You can assume direct control of many businesses and run them yourself for the benefit of the people. This will add half of your trade capital to your budget and make the poor happier, but traders will be put off./g;
var replace = 'Interfere with business to aggrandize the state! Seize half of your trade capital for your budget and move closer to Mercantilism.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Privatise Services/g;
var replace = 'Privatise the Pickelhaube Industry';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Your government-owned services are too bureaucratic and inefficient! Selling them off will encourage competition \(and net you a tidy sum\) but the populace will be very unhappy./g;
var replace = "Sell private firms the right to make your military's spiked helmets. You'll earn some Reichsmarks and move closer to Free Market, but your citizens will disapprove.";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Refinery/g;
var replace = 'Mine';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /refinery/g;
var replace = 'mine';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /absorb the solar wind and provide you with a clean source of energy./g;
var replace = 'improve your grain production.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /ship hulls. Set up a mining expedition in your principate, and if you find a Leather-rich asteroid you can set up an extractor on it./g;
var replace = "armor. If you make more of it, you'll be able to train more lower-tier soldiers.";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Prospect for/g;
var replace = 'Make more';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /high-performance hulls, but is rarer than Leather. Set up a deeper mining expedition in your principate, and if you find a Bronze-rich asteroid you can set up an extractor on it./g;
var replace = "middle-tier armors. If you make more of it, you'll be able to train more of your better soldiers.";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /ships will have Iron-reinforced hulls. Set up a mining expedition into the deepest reaches of your principate, and if you should find an Iron-rich asteroid you can set up an extractor on it./g;
var replace = "legions will have Iron armor. If you make more of it, you'll be able to train more of your best soldiers.";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /World News/g;
var replace = 'The Königsberg Press';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Communique/g;
var replace = 'Zimmerman Note';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Comms/g;
var replace = 'Telegraph';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Galaxy/g;
var replace = 'German Empire';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Galactic/g;
var replace = 'Imperial';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Technically Democratic/g;
var replace = 'Constitutionally Monarchical';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /President/g;
var replace = 'Kaiser';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Totalitarian Democracy/g;
var replace = 'Constitutional Monarchy';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /The Democratic World of/g;
var replace = 'The Free World of';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Prime Minister/g;
var replace = 'Chancellor';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Liberal Democracy/g;
var replace = 'Free State';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Central Planning/g;
var replace = 'Mercantilism';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /The People's World of/g;
var replace = 'The Grand Duchy of';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /General Secretary/g;
var replace = 'Grand Duke';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Single-party Rule/g;
var replace = 'Grand Duchy';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Supremely Grand Democratic People's World/g;
var replace = 'Kindgdom';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Beloved Leader/g;
var replace = 'König';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Autocracy/g;
var replace = 'Absolute Monarchy';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Lord Admiral/g;
var replace = 'Soldier King';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Militaria Admiralty/g;
var replace = 'Army With a Country';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /grain/g;
var replace = 'coal';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Grain/g;
var replace = 'Coal';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /leather/g;
var replace = 'wood';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Leather/g;
var replace = 'Wood';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /durranium/g;
var replace = 'woood';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Durranium/g;
var replace = 'Woood';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Denarii/g;
var replace = 'Reichsmarks';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}





















