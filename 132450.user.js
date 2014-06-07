// ==UserScript==                                                                
// @name          Foodclub Better                                           
// @namespace     http://4chan.org/neoquest                                      
// @description   Foodclub Better
// @include       http://www.neopets.com/pirates/foodclub.phtml*
// @include       http://www.neopets.com/~*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require       http://userscripts.org/scripts/source/54389.user.js
// @require       http://userscripts.org/scripts/source/54987.user.js
// @resource      winConfigCss http://pastebin.com/download.php?i=rHDg6Nyt
// ==/UserScript==  

var debug = false;
var name = 'FoodClub-';
var BETS_URL = 'http://www.neopets.com/pirates/foodclub.phtml?type=current_bets';
var PLACE_URL = 'http://www.neopets.com/pirates/foodclub.phtml?type=bet';
var TOP_URL = 'http://www.neopets.com/pirates/foodclub.phtml';
var globalBets = null;

var settings = { 
  type: 'question',
  description: 'Would you like to place the bets on this page?',
  size:  ['300px', 0],
  positiveCallback: function(w, e) {
      w.FadeOut(0);
      set('BetList', JSON.stringify(globalBets));
      window.location = PLACE_URL;
  }
};

var pirateTable = {
    'Scurvy Dan the Blade': 1,
    'Young Sproggie': 2,
    'Orvinn the First Mate': 3,
    'Lucky McKyriggan': 4,
    'Sir Edmund Ogletree': 5,
    'Peg Leg Percival': 6,
    'Bonnie Pip Culliford': 7,
    'Puffo the Waister': 8,
    'Stuff-A-Roo': 9,
    'Squire Venable': 10,
    'Captain Crossblades': 11,
    'Ol\' Stripey': 12,
    'Ned the Skipper': 13,
    'Fairfax the Deckhand': 14,
    'Gooblah the Grarrl':15,
    'Franchisco Corvallio':16,
    'Federismo Corvallio':17,
    'Admiral Blackbeard':18,
    'Buck Cutlass':19,
    'The Tailhook Kid':20
};

function log(val) {
  if (debug)
    GM_log(JSON.stringify(val));
};

function get(n) {
  return GM_getValue(name + n);
};

function set(n, v) {
  if (debug) {
    log('SET: ' + n + ' ' + typeof(n) + ' ' + v + ' ' + typeof(v));
  }
  GM_setValue(name + n, v); 
};

function onError(val) {
  WinConfig.loadDefaultCss();
  WinConfig.init({
    type: 'error',
    size:  ['400px', 0],
    description: val.replace('\n', '<br>'),
  }).Open().FadeIn(0);
};

function parseBets(page) {
  if (!page) {
    return onError('That betting page looks kinda blank.');
  }
  var bets = page.match(/<td>\s+<b>.*<\/b>: .*<br>\s+<\/td>/g)
  if (!bets) {
    return onError('Betting page contains no bets.');
  }
  bets = bets.slice(0, 10);
  var betList = [];
  for (var i = 0; i < bets.length; i++) {
    var bet = bets[i].match(/<b>([^<]*)<\/b>: ([^<]*)<br>/g);
    if (!bet) {
      return onError('One of the bets didn\'t parse');
    }
    var betObject = {}
    for (var j = 0; j < bet.length; j++) {
      var parts = bet[j].match(/<b>([^<]*)<\/b>: ([^<]*)<br>/);
      if (!parts) {
        return onError('One of the venue:eater pairs didn\'t parse');
      }
      betObject[parts[1]] = parts[2];
    }
    betList.push(betObject);
  }
  return betList;
};

function verifyBets(bets) {
  var arenas = ['Shipwreck', 'Lagoon', 'Treasure Island',
      'Hidden Cove', 'Harpoon Harry\'s'];
  var arenaMap = {};
  for (var i = 0; i < arenas.length; i++) {
    var arena = arenas[i];
    var node = $('b:contains("' + arena + '")').parent().parent();
    var pirateSet = {};
    node.find('option').each(function(i, e) {
        pirateSet[$(e).attr('value')] = true;
    });
    arenaMap[arena] = pirateSet;
  }
  for (var i = 0; i < bets.length; i++) {
    var bet = bets[i];
    for (var arena in bet) {
      var pirate = pirateTable[bet[arena]];
      if (!arenaMap[arena][pirate]) {
      log(arenaMap);
      log(arena + ':' + pirate);
          return false;
      }
    }
  }
  return true;
};

function verifyCash(betValue) {
  var npStr = $('a[id="npanchor"][href="/inventory.phtml"]').text();
  return betValue < parseInt(npStr.replace(/,/g, ''), 10);
};

function placeBet(bets, bet) {
  $('input[name="bet_amount"]').val(bet).blur();
  for (var arena in bets) {
    var pirate = bets[arena];
    var val = pirateTable[pirate];
    var node = $('b:contains("' + arena + '")').parent().parent();
    node.find('input').attr('checked', 'true').change();
    node.find('select').val(val).change();
  }
  var winnings = $('input[name="winnings"]').val();
  if (winnings == '1000000') {
    var mult = $('input[name="total_odds"]').val().split(':')[0];
    bet = Math.ceil(1000000 / mult);
    $('input[name="bet_amount"]').val(bet).blur();
  }
  wait(function() {
      $('input[value="Place this bet!"]').click()
  });
};

function dispatch(url, betList) {
  if (url == BETS_URL) {
    wait(function() {
        $('a[href="foodclub.phtml?type=bet"]')[0].click();
    });
  } else if (url == PLACE_URL) {
    var bet = $($('p:contains("You can only place up to")').find('b')[0]).text();
    if (!verifyBets(betList)) {
      set('BetList', JSON.stringify([]));
      return onError('At least one of the bets was invalid.\n' +
          'Check if they\'ve posted today\'s bets.');
    } else if (!verifyCash(bet * betList.length)) {
      return onError('You don\'t have enough cash on hand to place these bets.\n' + 
          'Go to the bank, get some dosh and refresh this page.');
    }
    placeBet(betList.pop(), bet);
    set('BetList', JSON.stringify(betList));
  }
};

function wait(func) {
  window.setTimeout(func, 1000 + (500 * Math.random()));
};

function main() {
  WinConfig.loadDefaultCss();
  GM_addStyle('.winconfig { z-index:200; }');
  var configPage = WinConfig.init(settings);
  var betListStr = get('BetList');
  var betList = (betListStr && JSON.parse(betListStr)) || [];
  var url = window.location;
  if (betList.length) {
    dispatch(url, betList);
  }
  if (url.pathname.match(/^\/~/)) {
    onError = function() {};
    var bets = parseBets(document.body.innerHTML);
    if (bets) {
      wait(function() {
        globalBets = bets;
        configPage.Open().FadeIn();
      });
    }
  }
};

main();
