// ==UserScript==
// @name           Gamefaqs LUE rename
// @description    Renames people.
// @include        http://www.gamefaqs.com/*
// @include        http://boards.gamefaqs.com/gfaqs/*
// ==/UserScript==

// DISCLAIMER: 
// This is not affiliated or endorsed by GameFAQs in any way. 
// I cannot be held responsible for what you use this for as 
// any sort of ToS breaking function would be on your own accord.

// USE:
// To use this, just fill out the users list
// in the form:
// 'current name': 'new name',
// comma is important
// k
(function () {

users = {
'SBallen': 'CJayC',
'warutrid': 'Warutrid',
'Critical Toast': 'Critical Toast!',
'AngelusLA': 'Angelus',
'KirbySage': 'Hershey',
'y2k deft colin': 'deft0k',
'jimmycopulos': 'jcopulos',
'lue': 'LUE',
'ASHNOD': 'Ashnod',
'Shiriay Shokan': 'Honky Tonk Spiderman',
'Thelordofyouall': 'TLOYA',
'mario2000': 'Kaiser Mozoku',
'qwertyman2002': 'qwertyman',
'RaidenEqualsLoser': 'TheKonamiMan',
'lbiggy': 'Little Biggy',
'DARTH PENGUIN': 'Squin',
'Lonewolfkrit': 'Kris von Wolf',
'SSJBinky': 'Mr Bink',
'overduegalaxy': 'Past Due',
'FreezeMaster': 'Kyrenika',
'LightElf': 'xxVegetaSSJxxSephirothxxGokuSSJ4xxLegolasxx',
'Nash Highwind': 'The Nash Fucking Highwind',
'luc good': 'Luc Good',
'Killerlampshade': 'Manic Lampshade',
'OmegaGundamXP': 'OmegaXP',
'fatmatt': 'Fatmatt',
'TheOgreMartin': 'OgreMartin',
'XyendorAlmighty': 'XA',
'spanky1': 'Spanky',
'C Sharp': 'D Flat',
'Birozombie81': 'BiroZombie',
'Gyarados Scotty': 'Scott',
'Super Feezy': 'Yung Feezel Washington',
'Jondalar is Dead': 'Jondy',
'championxxx': 'champion',
'UltiMaxius': 'UserMaxius',
'kazzus': 'Kazzus',
'Kapoop': 'Sir Kapoop Poopenstein IV',

'inuyashafan24': 'Bumblebee',
'GigaShadow555': 'Giganscudo',
'gundam babe': 'Awesome Babe',
'squirreiboy': 'Gyromatic',
'TeeBot111': 'Nate River',
'mustang93': 'Gargamel',
'Sk8r4life': 'Aumakua',
'THE GREAT SHIN AKUMA': 'Dream Maker Zero',
'Instrumental': 'AJgametoo',
'sephirothff': 'Syndor',
'Black Ace': 'Wall Screamer',
'onewingangel86': 'Clod',
'Ragent14': 'Phileo',
'g979': 'Hobbs',
'Inmate 922335': 'Dying Danny Downerson'
}

// DO NOT EDIT BELOW THIS LINE!

// Check for username in topic list
var selectedTopicsUser =
document.evaluate("//table[@class='board topics']//tr/td/span/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedTopicsUser.snapshotLength; ++i ) {
  var item = selectedTopicsUser.snapshotItem(i);
  for ( var userKey in users ) {
    if ( item.nodeValue.match( new RegExp("\\b" + userKey + "\\b", "i") ) ) {
	item.nodeValue = users[userKey];
    }
  }
}

// Check for username in message list
var selectedMessagesUser =
document.evaluate("//table[@class='board message']//tr/td//a/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Check for replacements
for ( var i = 0; i < selectedMessagesUser.snapshotLength; ++i ) {
  var item = selectedMessagesUser.snapshotItem(i);
  for ( var userKey in users ) {
    if ( item.nodeValue.match( new RegExp("\\b" + userKey + "\\b", "i") ) )
       item.nodeValue = users[userKey];
  }
}
})();