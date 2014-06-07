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
var replace = 'Denarii';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /fuel/g;
var replace = 'grain';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Fuel/g;
var replace = 'Grain';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /shipyard(?!s)/gi;
var replace = 'Barracks';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /shipyards/gi;
var replace = 'Barracks';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Regions
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /system/gi;
var replace = 'principate';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /amyntas/gi;
var replace = 'Achaea';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /bion/gi;
var replace = 'Britannia';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /cleon/gi;
var replace = 'Cappadocia';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /draco/gi;
var replace = 'Dacia';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Resources
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /duranium/gi;
var replace = 'Leather';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /tritanium/gi;
var replace = 'Bronze';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Adamantium/gi;
var replace = 'Iron';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Training
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = new RegExp('Finely-honed','gi');
var replace = 'Roman-tier';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /ragtag/gi;
var replace = 'Gaul tier';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /disorganized/gi;
var replace = 'Germanian-tier';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /coordinated/gi;
var replace = 'Celt-tier';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /well-trained/gi;
var replace = 'Greek-tier';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}

//Ship types
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Fighter(?!s)/gi;
var replace = 'Hastatus';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Fighters/gi;
var replace = 'Hastati';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /corvette(?!s)/gi;
var replace = 'Princeps';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /corvettes/gi;
var replace = 'Principes';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /light cruiser(?!s)/gi;
var replace = 'Triarius';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /light cruisers/gi;
var replace = 'Triarii';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /destroyer(?!s)/gi;
var replace = 'Praetorian';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /destroyers/gi;
var replace = 'Praetoriae';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /frigate(?!s)/gi;
var replace = 'Equite';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /frigates/gi;
var replace = 'Equitae';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /heavy cruiser(?!s)/gi;
var replace = 'Centurion';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /heavy cruisers/gi;
var replace = 'Centuriae';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /battlecruiser(?!s)/gi;
var replace = 'Cohors Urbana';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /battlecruisers/gi;
var replace = 'Cohortes Urbanae';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /battleship(?!s)/gi;
var replace = 'Legionary';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /battleships/gi;
var replace = 'Legionaries';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /dreadnaught(?!s)/gi;
var replace = 'Alaris';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /dreadnaughts/gi;
var replace = 'Alae';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Policy titles
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /economic policies/gi;
var replace = 'Edicts';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /domestic policies/gi;
var replace = 'Pleb Relations';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /diplomatic policies/gi;
var replace = 'Tourist Industry';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /military policies/gi;
var replace = 'Marius Reforms';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Policy tabs
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Economics/g;
var replace = 'Edicts';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Domestic/g;
var replace = 'Pleb Relations';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Diplomacy/g;
var replace = 'Tourist Industry';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Military/g;
var replace = 'Marius Reforms';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Economic(?!s)/g;
var replace = 'Edicts';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Rebels
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /rebels/g;
var replace = 'gauls';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Rebels/g;
var replace = 'Gauls';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /fleet/g;
var replace = 'legions';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Fleet/g;
var replace = 'Legions';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
//Specific policies
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Round Up Dissenters/g;
var replace = 'Round Up Gauls';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Stability will rise slightly and your government will become more authoritarian, but people will be unhappy./g;
var replace = 'Stability will rise slightly due to the lack of rebel gaul scum, and your government moves closer to an Empire. Some barbarians will be unhappy with you about this.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Free Political Prisoners/g;
var replace = 'Release Some Gauls';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Your government will become more democratic if you free those who criticise you, but stability will drop slightly and your prisoners might even join the/g;
var replace = 'Your government moves towards a republic, but stability will drop due to all those voting';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Martial Law(?!.)/g;
var replace = 'Declare Triumvirate';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Declare Martial Law. This can only be done when your world is in a state of war. The Legions Admiralty will take control and you will gain military units. Stability will greatly increase but you will lose the people's approval./g;
var replace = 'When in a state of war, this will work to cause your Triumvirate to take control. You will get some of your best legions and stability will rise, but some people will dislike the loss of freedom.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Citybuilding Program/g;
var replace = 'Build Colosseums';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /If you build cities for your people to live in, they will be happier and their quality of life might increase. Cost varies with growth and economic principate./g;
var replace = "People love Colosseums! You build one and they'll be happier. They might even get so happy their quality of life improves.";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Literacy Program/g;
var replace = 'Public Baths';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /You can set up a free worldwide literacy program for your people, and their quality of life will increase as a result./g;
var replace = 'If you build public baths, your people will smell less and their quality of life will increase somewhat.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Healthcare Program/g;
var replace = 'Aqueducts';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Put free healthcare provisions in place for your people and their quality of life will increase tremendously. /g;
var replace = "Build some aqueducts and your people will have fresh water to drink and won't die of thirst. Quality of life will greatly increase";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Encourage Entrepreneurship/g;
var replace = 'Distribute Gallic land amongst your veterans';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /If you set up schemes to encourage new businesses, then growth might increase. Only available to Free Markets./g;
var replace = 'If you give out land to your veterans, they just might start working it allowing the city to grow. Only Free Markets may do this.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Trade Centres/g;
var replace = 'Slave Centers';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Traders might be attracted to your world if you improve and expand upon your trade centres. /g;
var replace = 'Slavers will sell you gladiators if you set up slave centers. These gladiators may lead to growth through tourism and can also increase your trade capital. ';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Production Drive/g;
var replace = 'Demand tribute from the Gauls!';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Your economic machine must be improved! A high chance of increasing growth. Only available to Central Planning worlds./g;
var replace = 'Render unto Caesar what is Caesars! This has a high chance of increasing growth. Only available to Central Planning worlds.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Forced Labor/g;
var replace = 'Enslave your own people';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /You can set your dissidents to work, with a high chance of increasing growth, but the rest of the population will not be happy. Only available to autocracies./g;
var replace = 'You can enslave even Roman Citizens, which will almost certainly increase growth, but this is evil and the plebs will hate you. Only Imperators could even consider such an action.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Loan Sharks/g;
var replace = 'Borrow against the Treasury';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /In desperate need of cash? There are plenty of... less than reputable people out there willing to lend, but their repayments will be taxing. You gain 100 Denarii from this./g;
var replace = "You can mortgage Rome for cash if you need a quick buck, but it'll slow down your ability to grow dramatically.";
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Nationalise Businesses/g;
var replace = 'Seize the Colosseum Revenues';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /You can assume direct control of many businesses and run them yourself for the benefit of the people. This will add half of your trade capital to your budget and make the poor happier, but traders will be put off./g;
var replace = 'You can nationalize the Colosseum and claim its revenues for your own. The poor will love you for it and you add half your trade capital to your budget.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Privatise Services/g;
var replace = 'Privatise the Colosseum';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Your government-owned services are too bureaucratic and inefficient! Selling them off will encourage competition \(and net you a tidy sum\) but the populace will be very unhappy./g;
var replace = 'You can auction off your Colosseums to the highest bidder. Selling them does make you some money but the plebs will think of you as a sell-out.';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Refinery/g;
var replace = 'Farm';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /refinery/g;
var replace = 'farm';
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
var replace = 'Town Crier';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Communique/g;
var replace = 'Couriered message';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Comms/g;
var replace = 'Courier';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Intel Agency/g;
var replace = 'Tourism Agency';
for (var i=0;i<textNodes.snapshotLength;i++) {
var node = textNodes.snapshotItem(i);
node.data = node.data.replace(searchRE, replace);
}
textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = /Galaxy/g;
var replace = 'Empire';
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















