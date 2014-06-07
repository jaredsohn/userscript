// Neopets - Dropdown Dailies
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - Dropdown Dailies
// @namespace      http://userscripts.org/users/22349
// @description    V 1.02 - Adds daily quicklinks to the navigation menu where the video dropdown is located.
// @include        http://neopets.com/*
// @include        http://www.neopets.com/*
// @include        http://ncmall.neopets.com/*
// @version        1.02
// @updated        2009.07.28 
// ==/UserScript==//
(function(){
// Used the script "Neopets Sidebar Quicklinks" (http://userscripts.org/scripts/show/29918)
// and moved the links from the sidebar to the neopets menu.

// Change the value below to the color of the other menu images.
var menu_color = 'black';  // 'white' or 'black'

// Move around, add, edit or remove the links as needed.
var mylinks = new Array(
//  ['&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;.-=^=-.',''],// an example of a separator
//  ['',''],                                                                     // another example of a separator
  ['Advent Calendar','http://neopets.com/winter/adventcalendar.phtml'],
  ['Adver-Video','http://www.neopets.com/games/play.phtml?game_id=683'],
  ['Altador Plot Daily','http://www.neopets.com/altador/council.phtml'],
  ['Buried Treasure','http://www.neopets.com/pirates/buriedtreasure/index.phtml'],
//  ['-=-=-=-=-=-=-',''],                                                        // another example of a separator
  ['Coltzan\'s Shrine','http://www.neopets.com/desert/shrine.phtml'],
  ['Deadly Dice','http://neopets.com/worlds/deadlydice.phtml'],
  ['Deserted Tomb','http://www.neopets.com/worlds/geraptiku/tomb.phtml'],
  ['Fruit Machine','http://www.neopets.com/desert/fruitmachine.phtml'],
  ['Giant Jelly','http://www.neopets.com/jelly/jelly.phtml'],
  ['Grumpy Old King','http://www.neopets.com/medieval/grumpyking.phtml'],
  ['Healing Springs','http://www.neopets.com/faerieland/springs.phtml'],
  ['Haunted Kiosk','http://www.neopets.com/halloween/scratch.phtml'],
  ['Kiosk','http://www.neopets.com/winter/kiosk.phtml'],
  ['Laboratory Ray','http://www.neopets.com/lab2.phtml'],
  ['Lever of Doom','http://www.neopets.com/space/strangelever.phtml'],
  ['Lost Desert Scratchcards','http://www.neopets.com/desert/sc/kiosk.phtml'],
  ['Lunar Temple','http://www.neopets.com/shenkuu/lunar/?show=puzzle'],
  ['Marrow Guess','http://www.neopets.com/medieval/guessmarrow.phtml'],
  ['Mysterious Symol Hole','http://www.neopets.com/medieval/symolhole.phtml'],
  ['Meteor Crash Site 725-XZ','http://www.neopets.com/moon/meteor.phtml'],
  ['Omelette','http://www.neopets.com/prehistoric/omelette.phtml'],
  ['Pick Your Own','http://www.neopets.com/medieval/pickyourown_index.phtml'],
  ['Qasalan Expellibox','http://ncmall.neopets.com/mall/shop.phtml?page=giveaway'],
  ['Shop Of Offers','http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes'],
  ['Snowager','http://www.neopets.com/winter/snowager.phtml'],
  ['Test Your Strength','http://www.neopets.com/halloween/strtest/index.phtml'],
  ['The Petpet Laboratory','http://www.neopets.com/petpetlab.phtml'],
  ['Tombola','http://www.neopets.com/island/tombola.phtml'],
  ['Turmaculus','http://neopets.com/medieval/turmaculus.phtml'],
  ['Weltrude\'s ToyChest','http://www.neopets.com/petpetpark/daily.phtml'],
  ['Wheel of Excitement','http://www.neopets.com/faerieland/wheel.phtml'],
  ['Wheel of Knowledge','http://www.neopets.com/medieval/knowledge.phtml'],
  ['Wheel of Mediocrity','http://www.neopets.com/prehistoric/mediocrity.phtml'],
  ['Wheel of Misfortune','http://www.neopets.com/halloween/wheel/index.phtml'],
  ['Wheel of Monotony','http://www.neopets.com/prehistoric/monotony/monotony.phtml'],
  ['Wheel of Slime','http://www.neopets.com/games/play.phtml?game_id=807'],
  ['Underwater Fishing','http://www.neopets.com/water/fishing.phtml'],
  ['Wise Old King','http://www.neopets.com/medieval/wiseking.phtml']
);

if (menu_color == 'white'){
  var dailiesImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%40%00%00%00%26%0\
8%06%00%00%00t%C4%9D%99%00%00%00%07tIME%07%D9%07%13%01%045%3At%A86%00%00%00%09pHYs%00%00%1E%C1%\
00%00%1E%C1%01%C3iTS%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%02%08IDATx%DA%EDW%C1Q%C3%40%0C\
%3C34%10JpJ%C8%D0%00CJ%08_~a%A8%C0%94%E0%94%40%3E%FC%93%12L%09%A4%05%97%80%3F%FCx%18m%22%81%7C%\
B1c%DFe%92%3C%D0%CEh%7C%3E%9Do%25Y%D2%D9%CE%19%0C%06%83%C1%600%18%0CG%A1%AE%EB%C9%C0u%23%92%0C%\
EB1%E6%B99I%EA%EB%2F%ED%D3P%C7%05%C5%C0%F5%1F%EA%99g%927u%7F%EF%E9O%1E%84%AB%0B%C4%ACR%D7%AF%1E\
%7D5h%C7%23p%7Dn%EF%93%24%99%E2M%D3%B0%24I%0F%E9i%5C%9E%DA%9E%E8%0C%E0%1AN%3Bt%A3C%CF%F10%8D%D1\
_%1C%DC%A4%8Az%1F%85Z%93%F1%DC'%C9%0AMN%E9%0A%AF%E6%FD%1E%F0%ABW%7C%2B%CD%A3%9A%A74%CC%C6%9E!%F\
E%C4%94%C0%8Ad(%09%0C%9DA%60%2C%A5%F4%22%82%0F%81%95%AC%A8%98%3B'y%0A%B4%A5%15A%25%C0)%2F%84%2F\
%24%E3%B6up%94%24%A1%E1TM%07%1B%CA%E5%20%CE%3F%B0%D3%C0%DC%B3%A5d%AE%1B%A2%7D%3FY%00%5C%B3.7%5D\
M%8AS%F9%D5%ED%DEP%1F%BE%0F%E8%F41%98z%FC%13v%5Cts%17%81%D0%12%E8%3D%97%D9q1F%0C%1C%F5%3D%D7%01\
%FD%5C%EE%E9%E04%B2%A2p%7F%A5%96%12%FF%94%5E%CC%E0%E334%03%F4%C6%5D%C1%10%E7Q%06(%91M%A4%F3%80%\
CE0%94%1C%D2%7C%9C%EC%80%FD%B178%96%CA%A6%A0L%08%0D%80v%06i%3E%EB%08%CE%F6%9E%F5%C7%7C%CD5%F8%C\
4I%3E%15%B6%FB%F2%DB%8Ei%AE%5B%04%95%00%22N%C4%EFl%8C%88o%AC%E8%F3%90%BD%3B%F8J%E2%83sY%0B_%C9'\
e%EE%CD%07%7D%3D%C6%7C%08%A1%EE%D6L%B4f%C7%2BO%2F%C1X%AB%B1%DF0%FBJc%C3A%40%EA%2F%14%07%E6e%AE%\
F4%9CGY%2C%DD9%40%D1%BF%E5%EB%1D%C9%A3%DC%B7%E8%1B_%8C%18%B7%AC%C5O%D1%8Cu%7Bz%D9%AF%83'%E3%BF%\
C9%D8Fk0%18%0C%06%83%C1%600%18%0C%FF%0F%3F%089%A7Q%A3%978%CC%00%00%00%00IEND%AEB%60%82";
}
else {
  var dailiesImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%40%00%00%00%26%0\
8%06%00%00%00t%C4%9D%99%00%00%00%07tIME%07%D9%07%13%01%05%0D%0Bm!%E9%00%00%00%09pHYs%00%00%1E%C\
1%00%00%1E%C1%01%C3iTS%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%02%0FIDATx%DA%ED%97%D1M%C30%\
10%86%1D%C4%02Y%C1%8C%10u%01%D4%8E%10%5Ey%2Bb%822B%3A%02%7D%E1%3D%1D%A1%2B%D0%11%C8%08%E4%857%1\
E%CA%FD%8DM%0F%13%C7%B1!EB%F7I%A7%D8%3E%DB%E7%B3%CFgE)A%10%04A%10%04A%08r8%1C%BCB%14Cz%D6%2F'Y%\
A1%3F%CA%A6mI%A2%5D%FD%98%F9%3C6%CE%B7%01h6%B2%1B%B9%B8g6%E6%9E%E4%89%D5%E7%8E%3Ei%13b%B8%98%3A\
jzh%D9%F7-%A0oG%CD%F8%03.%CF%ED%3D%9D%D0%22%CB2%9CtC%A2%87%F4Tn%A6%5EOr%04%D0%22%0B%12%ED%D1%E5\
C%E3LQ%A7%E8%FF%14%96%A4v%EAtO%BF%E5%00%D5%251%14%5EIj%92%25%D3%F1%B18i7%07%7C%EA%99%BD%9A%DBQ%\
A7%E4i%13%A6%3B%E7hR%AE%40%1Da%04%0B%2C!%88%0AZ%F4%3A%C1%1E%9C%B3Q%D1%1A%DB%15%C9%5D%E4Z~%05%84\
%A5%DD%E9%95S%DF%F5d%E3%B9%ABW%11%11%60%1C%B7%E5%D2%88%ADs%DB%2Ffl%3E%F5%2B%C0%EF%E5%DE%97%A4%9\
0%C4H%1EUwB!%DE%07t%05%2Bk%C7%3Et%0D%D3-%23%7D9%12%7B%05%8AP%07%E3%B8%5D%8C%5D%60%1E%1A%E7%81%8\
F%AB%1C%1D%9C%BEQ%26'%A8.%3A4%D9_%A8%88%E736%02%F8%C4%BE%CD%B0%CE%AF)B%AE%E8%BBOt%1E%F0%08%7B%2\
0%81sW4o%86%7CB%82%B9ac%C3%D6%14%15%09%B1%1B%C0%9DA%98%97%9E%CD9%D6%8D%3E%185c%EDY'i%DE%DA%3E%9\
7%B4%09%B0%9B%92%5C%E3%E9Ib%5CV%01%BD%2F%09n%D4%F03Xy%E6%AB%CC%E6%BA%F6%26%8D%00%80%7B%B7U%DD%8\
9o%CD)%B5%8E%DE%9E%DC%96%95%DD%84%19%BA%1A%7B%B3%E9%08%FD5%B3%81v%DB%D6%A8%AF%CF%20%AE%C5FM%85%\
F3%C4%CD%CC%F7%9A%E4%D6%D6%7B%F48%25%CD%DAuO_%FC%14%95%EA%94%E9g%3DO%EA%CCc%07%CF1N%3D%9F%FCoP%\
10%04A%10%04A%10%04%E1%BF%F0%01%10z%E8M%AF%97y%0A%00%00%00%00IEND%AEB%60%82";
}

videoDiv = document.evaluate('//td[@id="navigation"]//li[@class="nav_image"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(7);
if (!videoDiv){return;}
videoDiv.innerHTML = '<img src="'+dailiesImg+'" height="38" width="64"><ul class="dropdown"></ul>';
for (x in mylinks) {
  newLink = document.createElement('li');
  if (mylinks[x][1] == ''){newLink.innerHTML = mylinks[x][0]+'&nbsp;';}
  else {newLink.innerHTML = '<a href="'+mylinks[x][1]+'">» '+mylinks[x][0]+'</a>';}
  videoDiv.getElementsByTagName('ul')[0].appendChild(newLink);
}
})();