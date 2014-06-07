// ==UserScript==
// @name          Customizable Tabs
// @namespace     Daniel Houtsma
// @description   Allows you to edit tabs on neopets.com
// @include       http://www.neopets.com/*
// @include       http://neopets.com/*
// ==/UserScript==

(function(){

var quicklinks = new Array(
    ['Advent Calendar','http://neopets.com/winter/adventcalendar.phtml'],
    ['Adver-Video','http://www.neopets.com/games/play.phtml?game_id=683'],
    ['Altador Plot Daily','http://www.neopets.com/altador/council.phtml'],
    ['Buried Treasure','http://www.neopets.com/pirates/buriedtreasure/index.phtml'],
    ['Deadly Dice','http://neopets.com/worlds/deadlydice.phtml'],
    ['Deserted Tomb','http://www.neopets.com/worlds/geraptiku/tomb.phtml'],
    ['Fruit Machine','http://www.neopets.com/desert/fruitmachine.phtml'],
    ['Giant Jelly','http://www.neopets.com/jelly/jelly.phtml'],
    ['Grumpy Old King','http://www.neopets.com/medieval/grumpyking.phtml'],
    ['Healing Springs','http://www.neopets.com/faerieland/springs.phtml'],
    ['Haunted Kiosk','http://www.neopets.com/halloween/scratch.phtml'],
    ['Kiosk','http://www.neopets.com/winter/kiosk.phtml'],
    ['Laboratory Ray','http://www.neopets.com/lab.phtml'],
    ['Lever of Doom','http://www.neopets.com/space/strangelever.phtml'],
    ['Lost Desert Scratchcards','http://www.neopets.com/desert/sc/kiosk.phtml'],
    ['Lunar Temple','http://www.neopets.com/shenkuu/lunar/?show=puzzle'],
    ['Marrow Guess','http://www.neopets.com/medieval/guessmarrow.phtml'],
    ['Mysterious Symol Hole','http://www.neopets.com/medieval/symolhole.phtml'],
    ['Meteor Crash Site 725-XZ','http://www.neopets.com/moon/meteor.phtml'],
    ['Omelette','http://www.neopets.com/prehistoric/omelette.phtml'],
    ['Pick Your Own','http://www.neopets.com/medieval/pickyourown_index.phtml'],
    ['Qasalan Expellibox','http://www.neopets.com/games/play.phtml?game_id=905'],
    ['Shop Of Offers','http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes'],
    ['Shrine','http://www.neopets.com/desert/shrine.phtml'],
    ['Snowager','http://www.neopets.com/winter/snowager.phtml'],
    ['Test Your Strength','http://www.neopets.com/halloween/strtest/index.phtml'],
    ['The Petpet Laboratory','http://www.neopets.com/petpetlab.phtml'],
    ['Tombola','http://www.neopets.com/island/tombola.phtml'],
    ['Turmaculus','http://neopets.com/medieval/turmaculus.phtml'],
    ['Wheel of Excitement','http://www.neopets.com/faerieland/wheel.phtml'],
    ['Wheel of Knowledge','http://www.neopets.com/medieval/knowledge.phtml'],
    ['Wheel of Mediocrity','http://www.neopets.com/prehistoric/mediocrity.phtml'],
    ['Wheel of Misfortune','http://www.neopets.com/halloween/wheel/index.phtml'],
    ['Wheel of Monotony','http://www.neopets.com/prehistoric/monotony/monotony.phtml'],
    ['Wheel of Slime','http://www.neopets.com/games/play.phtml?game_id=807'],
    ['Underwater Fishing','http://www.neopets.com/water/fishing.phtml'],
    ['Wise Old King','http://www.neopets.com/medieval/wiseking.phtml']
);

  videoDiv = document.evaluate('//td[@id="navigation"]//li[@class="nav_image"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(7);
  if (!videoDiv){return;}
  videoDiv.innerHTML = '<table border="0" height="38" width="64"><tobdy><tr><td valign="middle" align="center" style="font: bold 14px Verdana; color:#ffffff;">dailies</div><ul class="dropdown"></ul>';
  ddDiv = videoDiv.getElementsByTagName('ul')[0];
    for (x in quicklinks) {
        newLink = document.createElement('li');
        newLink.innerHTML = '<a href="'+quicklinks[x][1]+'">» '+quicklinks[x][0]+'</a>';
        ddDiv.appendChild(newLink);
  }
})();  