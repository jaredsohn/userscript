// Neopets - Games Fixmeup
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - Gameroom Fixmeup
// @namespace      http://userscripts.org/users/22349
// @description    V 1.05 - Provides many fixes and needed additions to the Neopets games and gameroom.
// @include        http://www.neopets.com/*
// @include        http://neopets.com/*
// @exclude        *neopets.com/neoboards/*
// @version        1.05
// @updated        2009.05.28 
// ==/UserScript==
//
// ==Features==
// ==1.0==
// Grumpy Old King - Chooses a randomized question and answer.  Changes results page to
//   return you to the King again since you can do it twice a day.  Button doesn't 
//   change the second time if you had pressed it to return to the King the first time.
// Wise Old King - Chooses a randomized "Words of Wisdom"
// Neopian Lottery - Chooses random numbers.
// Symole Hole - Chooses a random action.
// Cheeseroller - Gives you all the cheese options.
// Multi Player Competition Lobby - Links usernames to their lookup.
// Miscellaneous - Adds the stock market and multiplayer links back into the gameroom.
//   Shows you the score needed to get the maximum NP.
// ==1.1==
// Random Contest Winners - Links usernames to their lookup.
// Caption Competition - Links usernames to their lookup.
// Fixed an NP ratio
// ==1.2==
// Changed to work with the new site layout.
// Added new cheeses to cheeseroller.
// ==1.3==
// The Grumpy Old King asks the avatar question with a random answer.
//   You can also have him give the set answer of 'You offering a tin of what what what.'
//   by commenting out the first 'selections' array and uncommenting the second. (Add the
//   double / to the front of the first line that starts with 'selections' and remove them
//   from the second.)
// ==1.4==
// Cheeseroller - Fixed the broken images of the last cheeses that were released.
//   Skips the confirm page.  Remembers your last selected cheese.
// 1000 np - Shows the information on the game page too.
// Games - Cleans up game area, resizes game pop up.
// Scratchcards - Selects the first scratchcard at the kiosk.
// ==1.05==
// Max NP changed to work better with adblock.  Updated for the layout change.
// Brain Tree - Saves the Esophagor answers for the Brain Tree Quest.
// ==/Features==
//
// If you like this script, post a comment on userscripts.org or tell a friend about it.
// If you'd like to see a feature added, post a comment on userscripts.org or send me an email.
//
(function(){

var loc = document.location.href;
var bih = document.body.innerHTML;
var ctt = document.getElementById('content');

// // // // The Brain Tree
if (loc.match('neopets.com/halloween/braintree.phtml')){
  if (document.getElementsByName('answer_2')[0]){
    document.getElementsByName('answer_1')[0].value = GM_getValue('btyear', '');
    document.getElementsByName('answer_2')[0].value = GM_getValue('btplace', '');
  }
  else {
    GM_setValue('btyear', '');
    GM_setValue('btplace', '');
  }
  return;
}
if (loc.match('neopets.com/halloween/esophagor2.phtml')){
  var btyear = bih.match(/<i><u>(\d+)<\/u><\/i> BN/);
  if (btyear){GM_log('year: '+btyear[1])}
  if (btyear){GM_setValue('btyear', btyear[1])}
  var btplace = bih.match(/iinn <i><u>([\D\s]+)<\/u><\/i><\/b>'/);
  if (btplace){GM_log('place: '+btplace[1])}
  if (btplace){GM_setValue('btplace', btplace[1])}
  return;
}

// // // // The Wise King
if (loc.match('neopets.com/medieval/wiseking.phtml')){
  for (var x = 0, thisForm; thisForm = document.forms[x]; x++){
    if (thisForm.action.match('process_wiseking.phtml')){
      for (var y = 0, thisElement; thisElement = thisForm.elements[y]; y++) {
        if (thisElement.name){
          thisElement.options.selectedIndex = Math.ceil(Math.random()*(thisElement.options.length - 1));
        }
      }
    }
  }
  return;
}

// // // // The Grumpy King
if (loc.match('neopets.com/medieval/grumpyking.phtml')){
  for (var x = 0, thisForm; thisForm = document.forms[x]; x++){
    if (thisForm.action.match('grumpyking2.phtml')){
      selections = new Array('What', 'do', 'you do if', '', 'fierce', 'Peophins', '', 'has eaten too much', '', 'tin of olives')
//      selections = new Array('What', 'do', 'you do if', '', 'fierce', 'Peophins', '', 'has eaten too much', '', 'tin of olives', 'You', 'offering', 'a', 'tin of', '', 'what what what', '', '')
      for (var y = 0; y < 18; y++){
        for (var z = 0; z < thisForm.elements[y].options.length; z++){
          if (thisForm.elements[y].options[z].value == selections[y]){
            thisForm.elements[y].options.selectedIndex = z;
            break;
          }
          else {
            var thisChoice = Math.ceil(Math.random()*(thisForm.elements[y].options.length - 1));
            thisForm.elements[y].options.selectedIndex = thisChoice;
          }
        }
      }
    }
  }
  return;
}
 
if (loc.match('neopets.com/medieval/grumpyking2.phtml') && !document.referrer.match(/\?/)){
  for (var x = 0, thisForm; thisForm = document.forms[x]; x++){
    if (thisForm.action.match('index_castle.phtml') || thisForm.action.match('explore.phtml')){
      thisForm.action = 'grumpyking.phtml';
      thisForm.elements[0].value = 'Back to the Grumpy Old King!';
      break;
    }
  }
  return;
}

// // // // Symol Hole 
if (loc.match('neopets.com/medieval/symolhole.phtml')){
  var goin = document.getElementsByName('goin')[0];
  if (goin){
    goin.options.selectedIndex = Math.floor(Math.random()*5);
  }
  return;
}

// // // // Meteors of Kreludor 
if (loc.match('neopets.com/moon/meteor.phtml')){
  var pickstep = document.getElementsByName('pickstep')[0];
  if (pickstep){
    pickstep.options.selectedIndex = 1;
  }
  return;
}

// // // // The Neopian Lottery
if (loc.match('neopets.com/games/lottery.phtml')){
  allForms = document.evaluate('//form[@action="process_lottery.phtml"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var x = 0, thisForm; thisForm = allForms.snapshotItem(x); x++){
    var pick, pickArray = new Array(0,0,0,0,0,0);

    for (var y = 0; y < 6; y++) {
      while (pickArray[y] == 0) {
        pick = Math.ceil(Math.random()*30);
        for (var z = 0; z < y; z++) {
          if (pick == pickArray[z]) {pick = 0}            
        }
        pickArray[y] = pick;
      }
    }
    function sortNumber(a,b){
      return a - b;
    }
    pickArray = pickArray.sort(sortNumber);

    for (var y = 0; y < 6; y++) {
      thisForm.elements[y].value = pickArray[y];
    }
    return;
  }
}
if (loc.match('neopets.com/games/process_lottery.phtml')){
  if (bih.match('check back tomorrow')){
    document.links[0].href = 'http://www.neopets.com/games/lottery.phtml';
  }
  return;
}

// // // // Scratchcards
if (loc.match('winter/kiosk.phtml') || loc.match('halloween/scratch.phtml')){
  var card_id = document.getElementsByName('card_id')[0];
  if (card_id){card_id.selectedIndex = 1;}
  return;
}
if (loc.match('winter/kiosk2.phtml')){
  for (var x = 0, thisForm; thisForm = document.forms[x]; x++) {
    if (thisForm.action.match('icecaves.phtml')){
      thisForm.action = 'kiosk.phtml';
      thisForm.elements[0].value = 'Back to Scratchcard Kiosk';
    }
  }
  return;
}
if (loc.match('halloween/scratch2.phtml')){
  for (var x = 0, thisForm; thisForm = document.forms[x]; x++) {
    if (thisForm.action.match('index_fair.phtml')){
      thisForm.action = 'scratch.phtml';
      thisForm.elements[0].value = 'Back to the Deserted Fairground Scratchcards';
    }
  }
  return;
}


// // // // Potato Counter
if (loc.match('neopets.com/medieval/potatocounter.phtml')){
  for (var x = 0, thisForm; thisForm = document.forms[x]; x++) {
    if (thisForm.elements[0].value.match('Meridell')){
      thisForm.action = 'index_farm.phtml';
      thisForm.elements[0].value = 'Back to Meri Acres Farm';
    }
  }
  if (bih.match('potato2.gif')){
    var pcount = 0;
    for (var x = 0; x < document.images.length; x++) {
      if (document.images[x].src.match(/potato\d\.gif/)){pcount++}
    }
    document.getElementsByName('guess')[0].value = pcount;
  }
  return;
}

// // // // Guess the Weight
if (loc.match('neopets.com/medieval/guessmarrow.phtml')){
  for (var x = 0, thisForm; thisForm = document.forms[x]; x++) {
    if (thisForm.action.match('gameroom.phtml')){
      thisForm.action = 'index_farm.phtml';
      thisForm.elements[0].value = 'Back to Meri Acres Farm';
    }
  }
  return;
}

// // // // Pick Your Own
if (loc.match('neopets.com/medieval/pickyourown')){
  for (var x = 0, thisForm; thisForm = document.forms[x]; x++) {
    if (thisForm.elements[0].value.match('Meridell')){
      thisForm.action = 'index_farm.phtml';
      thisForm.elements[0].value = 'Back to Meri Acres Farm';
    }
  }
  return;
}

// // // // Cheeseroller
if (loc.match('neopets.com/medieval/cheeseroller.phtml')){
  var cheese_name = document.getElementsByName('cheese_name')[0];
  if (cheese_name){
    cheese_name.parentNode.innerHTML = '<p></p>\
<select name="cheese_name" style="font-size: 12px;">\
<option value="Spicy Juppie">Spicy Juppie Cheese - 150np</option>\
<option value="Smoked Snorkle">Smoked Snorkle Cheese - 300np</option>\
<option value="Triple Mustard">Triple Mustard Cheese - 450np</option>\
<option value="Honey">Honey Cheese - 600np</option>\
<option value="Big Beefy">Big Beefy Cheese - 750np</option>\
<option value="Purple Spotted">Purple Spotted Cheese - 900np</option>\
<option value="Brain">Brain Cheese - 1050np</option>\
<option value="Alkenore">Alkenore Cheese - 1200np</option>\
<option value="Mutated">Mutated Cheese - 1350np</option>\
<option value="Bubbling Blueberry">Bubbling Blueberry Cheese - 1500np</option>\
<option value="Tyrannian Dung">Tyrannian Dung Cheese - 1650np</option>\
<option value="Quadruple Fudge">Quadruple Fudge Cheese - 1800np</option>\
<option value="Brick">Brick Cheese - 1950np</option>\
<option value="Gooey Snot">Gooey Snot Cheese - 2100np</option>\
<option value="Peppermint">Peppermint Cheese - 2250np</option>\
<option value="Overgrown">Overgrown Cheese - 2400np</option>\
<option value="Heavy Bark">Heavy Bark Cheese - 2550np</option>\
<option value="Warty Blue">Warty Blue Cheese - 2700np</option>\
<option value="Fragrant Ummagcheese">Fragrant Ummagcheese - 2850np</option>\
<option value="Furry Chocomint">Furry Chocomint Cheese - 3000np</option>\
<option value="Mummified">Mummified Cheese - 3150np</option>\
<option value="Nimmo Tube">Nimmo Tube Cheese - 3300np</option>\
<option value="Space">Space Cheese - 3450np</option>\
<option value="Angelpuss">Angelpuss Cheese - 3600np</option>\
<option value="Meaty Cheese">Meaty Cheese - 3750np</option>\
<option value="Potato Cheese">Potato Cheese - 3900np</option>\
<option value="Very Stinky Cheese">Very Stinky Cheese - 4050np</option>\
<option value="Fishy Cheese">Fishy Cheese - 4200np</option>\
<option value="Shiny Golden Cheese">Shiny Golden Cheese - 4350np</option>\
</select> <input name="type" value="buy" type="hidden"> <input value="Submit" type="submit">';

    var mycheese = GM_getValue('cheese', '0');
    cheese_name = document.getElementsByName('cheese_name')[0];
    cheese_name.selectedIndex = mycheese;
    
    cheese_name.addEventListener('change',function(){
      GM_setValue('cheese', cheese_name.selectedIndex);
    }, false);
  }
  function changeImg(item){
    thisImg.src = 'http://images.neopets.com/items/'+item+'.gif';
  }    
  allImgs = document.evaluate('//img[@width="80"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var x = 0, thisImg; thisImg = allImgs.snapshotItem(x); x++){
    if (thisImg.src.match('med_cheese_24')){changeImg('mfo_head_cheese');}
    else if (thisImg.src.match('med_cheese_25')){changeImg('mfo_cheese_potato');}
    else if (thisImg.src.match('med_cheese_26')){changeImg('mfo_cheese_limburger');}
    else if (thisImg.src.match('med_cheese_27')){changeImg('mfo_cheese_fishy');}
    else if (thisImg.src.match('med_cheese_28')){changeImg('mfo_cheese_golden');}
  }
  return;
}

// // // // Gameroom Fixes

// // remove game info box from flash game area
if (loc.match('neopets.com/games/play_flash.phtml')){
  gi = document.getElementById('game-info');
  if (gi){gi.parentNode.removeChild(gi);}
  bb = document.getElementById('ban_bottom');
  if (bb){bb.parentNode.parentNode.removeChild(bb.parentNode);}
  gp = document.getElementById('game_preloader_msg');
  if (gp){gp.parentNode.removeChild(gp);}
  gc = document.getElementById('game_container');
  if (gc){
    winwidth = parseInt(gc.style.width, 10) + 10;
    winheight = parseInt(gc.style.height, 10) + 53;
    window.resizeTo(winwidth, winheight);
  }
  return;
}

// // remove game info box from shockwave game area
if (loc.match('neopets.com/games/dgs/play_shockwave.phtml')){
  bb = document.getElementById('ban_bottom');
  if (bb){bb.parentNode.parentNode.removeChild(bb.parentNode);}
  gc = document.getElementById('game_container');
  if (gc){
    winwidth = parseInt(gc.style.width, 10) + 10;
    winheight = parseInt(gc.style.height, 10) + 53;
    gc.setAttribute('style', 'width: '+gc.style.width+'; height:'+gc.style.height+';');
    window.resizeTo(winwidth, winheight);
  }
  return;
}

if (loc.match(/neopets\.com\/games\/play\.phtml\?game_id=/)){

// // remove special game advertisements
  for (var x = 0, thisDiv; thisDiv = document.getElementsByTagName('div')[x]; x++){
    if (thisDiv.getAttribute('style') && thisDiv.getAttribute('style').match('32px')){
      thisDiv.parentNode.removeChild(thisDiv);
      break;
    }
  }

// // shows the score needed to get 1000 np
  function setScoreModule(d, n){
    for (var m = 0, thisDiv; thisDiv = document.getElementsByTagName('div')[m]; m++){
      thisDiv = document.getElementsByTagName('div')[m];
      if (thisDiv.getAttribute('class') == 'ad_wrapper_fixed'){
        scoremod = document.createElement('div');
        scoremod.setAttribute('style', 'padding-bottom: 4px;');
        scoremod.innerHTML = '<div class="rcModuleWrapper gamesRoomDarkModule youMayAlsoLike"> \
<div class="rcModuleHeader"><div class="rcModuleTopLeft"></div><div class="rcModuleTopRight"></div> \
<div class="rcModuleHeaderBg"></div><div class="rcModuleHeaderOuter"><div class="rcModuleHeaderContent"> \
'+ d +' NP Score</div></div></div><div class="rcModuleContentOuter"><div class="rcModuleContent"> \
<div class="rcModuleContentInner"><br><div class="stats_title">'+ n +'</div><br></div></div></div> \
<div class="rcModuleBottom"><div class="rcModuleBottomLeft"></div><div class="rcModuleBottomRight"> \
</div></div></div>';

        thisDiv.parentNode.insertBefore(scoremod, thisDiv);
        thisDiv.parentNode.removeChild(thisDiv.nextSibling);
        thisDiv.parentNode.removeChild(thisDiv);
        break;
      }
    }
  }

  if (bih.match('NP Ratio:')){
    var npratio = bih.match(/<b>NP Ratio:<\/b> ([0-9,\.]+) /)[1].replace(',', '');

    if (npratio < 50) {npratio = Math.ceil(1000/npratio)}
    else {npratio = Math.ceil(1000*npratio)}

    if (bih.match('Double NP! Featured Game!')){double = '2000'}
    else {double = '1000'}

    var npdata = GM_getValue('npratio', '').split(',');
    var gameid = loc.match(/game_id=(\d+)/)[1];
    for (x in npdata){
      if (npdata[x].split('_')[0] == gameid){
        npdata.splice(x,x+1);
        break;
      }
    }
    npdata.unshift(gameid+'_'+npratio+'_'+double);
    if (npdata.length > 20){npdata = npdata.slice(0,20);}  //don't let it get too big
    GM_setValue('npratio', npdata.toString());

    setScoreModule(double, npratio);
  }
  else if (!bih.match('this game is not available')){
    if (loc.match('size')){
      gf = document.getElementById('game_frame');
      if (gf){gf.height = gf.height-96;}
      var npdata = GM_getValue('npratio', '').split(',');
      var gameid = loc.match(/game_id=(\d+)/)[1];
      for (x in npdata){
        if (npdata[x].split('_')[0] == gameid){
          var lastgameinfo = npdata[x];
          break;
        }
      }
      if (lastgameinfo){
        setScoreModule(lastgameinfo.split('_')[2], lastgameinfo.split('_')[1]);
      }
      else {
        setScoreModule('Max', 'Error:<br><span class="medText" style="font-weight: normal;">Return to game front page to get score data.</span>');
      }
    }
    else {
      for (var x = 0, thisDiv; thisDiv = document.getElementsByTagName('div')[x]; x++){
        if (thisDiv.getAttribute('class') == 'ad_wrapper_fixed'){
          thisDiv.parentNode.removeChild(thisDiv.nextSibling);
          thisDiv.parentNode.removeChild(thisDiv);
          break;
        }
      }
    }
    if (bih.match('/star_fade.png') && bih.match('>High Scores<')){
      for (var x = 0; thisDiv = document.getElementsByTagName('div')[x]; x++){
        if (thisDiv.getAttribute('class') == 'play_rel_link_icon_container' && thisDiv.innerHTML.match('star_fade')){
          thisDiv.innerHTML = '<a href="/gamescores.phtml?game_id='+loc.match(/game_id=(\w+)$/)[1]+'" class="info">\
<img src="http://images.neopets.com/games/arcade/nav_buttons/star.png" alt="" title="" style="cursor: pointer;" \
border="0" height="45" width="45"><span class="rel_link_tooltip">High Scores</span></a>';
          break;
        }
      }
    }
    if (bih.match('/neofriend_fade.png')){
      for (var x = 0; thisDiv = document.getElementsByTagName('div')[x]; x++){
        if (thisDiv.getAttribute('class') == 'play_rel_link_icon_container' && thisDiv.innerHTML.match('neofriend_fade')){
          thisDiv.innerHTML = '<a href="/mygamescores.phtml" class="info"><img \
src="http://images.neopets.com/games/arcade/nav_buttons/neofriend.png" alt="" title="" \
style="cursor: pointer;" border="0" height="45" width="45"><span class="rel_link_tooltip">My Hiscores</span></a>';
          break;
        }
      }
    }
  }
  return;
}

// // // // Multi Player Lobby - Turn username(s) into links
if (loc.match('neopets.com/games/lobby/mp_comp.phtml')){
  for (var x = 0, thisForm; thisForm = document.getElementsByName('compete')[x]; x++){
    replaceThis = thisForm.parentNode.parentNode.getElementsByTagName('b')[0];
    username = replaceThis.textContent;
    replaceThis.innerHTML = '<a href=/userlookup.phtml?user='+ username +'>'+ username +'</a>';
  }
  return;
}
if (loc.match('neopets.com/games/kacheekers/checkers1.phtml')){
  thisElement = document.getElementsByName('your_move')[0].getElementsByTagName('p')[2];
  thisElement.innerHTML = thisElement.innerHTML.replace(/"(\w+)"/, '"<a href=/userlookup.phtml?user=$1><b>$1</b></a>"');
  return;
}
if (loc.match('neopets.com/games/geos/geos1.phtml')){
  thisElement = document.getElementsByName('your_move')[0].getElementsByTagName('p')[2];
  thisElement.innerHTML = thisElement.innerHTML.replace(/(\w+)<br><br>$/, '<a href=/userlookup.phtml?user=$1><b>$1</b></a><br><br>');
  return;
}
if (loc.match('neopets.com/games/armada/armada1.phtml')){
  thisElement = document.getElementsByName('your_move')[0].getElementsByTagName('table')[0];
  thisElement.innerHTML = thisElement.innerHTML.replace(/<font color="Red"><b>(\w+)<br>/, '<b><a href=/userlookup.phtml?user=$1><font color="Red">$1</a><br>');
  thisElement.innerHTML = thisElement.innerHTML.replace(/<font color="Black"><b>(\w+)<br>/, '<b><a href=/userlookup.phtml?user=$1><font color="Black">$1</a><br>');
  return;
}

// // // // Random Contest Winners - Turn username(s) into links
if (loc.match('neopets.com/random_contest.phtml')){
  ctt.innerHTML = ctt.innerHTML.replace(/<\/b><\/i><br>\s*by\s?<b>(\w+)<\/b>/g, '</b></i><br>by <a href=/userlookup.phtml?user=$1><b>$1</b></a>');
  ctt.innerHTML = ctt.innerHTML.replace(/<\/b><\/i> by <b>(\w+)<\/b>/g, '</b></i> by <a href=/userlookup.phtml?user=$1><b>$1</b></a>');
  return;
}

// // // // Caption Competition - Turn username(s) into links
if (loc.match('neopets.com/games/caption_browse.phtml')){
  ctt.innerHTML = ctt.innerHTML.replace(/<b>By (\w+):<\/b>/g, '<b>By <a href=/userlookup.phtml?user=$1>$1</a>:</b>');
  return;
}
if (loc.match('neopets.com/games/caption/caption_archive.phtml')){
  ctt.innerHTML = ctt.innerHTML.replace(/<b><i>By (\w+)<\/i><\/b>/g, '<b><i>By <a href=/userlookup.phtml?user=$1>$1</a></i></b>');
  return;
}
})();
