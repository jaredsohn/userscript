// ==UserScript==                                                                
// @name          Neoquest                                                       
// @namespace     http://4chan.org/neoquest                                      
// @description   Stuff for Neoquest 2 
// @include       http://www.neopets.com/games/nq2/*                             
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require       http://userscripts.org/scripts/source/54389.user.js
// @require       http://userscripts.org/scripts/source/54987.user.js
// @resource      winConfigCss http://pastebin.com/download.php?i=rHDg6Nyt
// ==/UserScript==                                                               

var name = 'Neoquest-';
var disableOnKeyDown = false;
var debug = false;
                                              
var settings = { 
    "name": "Neoquest",
	"title": "Neoquest 2: Configuration",
	"size":  ["550px",0],
	"description": "<br />",
   	"sessions": {
		"default": {
			"fields": fillOtherSettings(fillDirectionSettings())
        }
    },
    "positiveCallback": function(w, e) {
        var keymap = getKeyMap();
        for (var key in keymap) {
          del(key);
        }
        w.Save();
        getKeyMap(true);
        w.FadeOut(0);
        disableOnKeyDown = false;
    },
    "negativeCallback": function(w, e) {
        w.FadeOut(0);
        disableOnKeyDown = false;
    }
};

/**
 * Libray functions. Shorthand to make my life easier.
 */
function log(val) {
  if (debug) GM_log(JSON.stringify(val));
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

function del(n) {
  GM_deleteValue(name + n);
};

function setIfNotSet(n, v) {
  if (GM_getValue(name + n))
    return;
  GM_setValue(name + n, v);
};

function appendValue(dict, key, value) {
  var list = dict[key]
  if (!list) {
    dict[key] = list = [];
  }
  list.push(value);
}

function addMulti(dict, keys, value) {
  for (var i = 0; i < keys.length; i++) {
    appendValue(dict, keys[i], value);
  }
};

/**
 * Settings configuration.
 */
function fillOtherSettings(settings) {
  var settings = settings || {};
  settings['Memory'] = {
      "label": "Remeber cursor location",
      "type": "boolean",
      "default": false
  };
  settings['AutoTarget'] = {
      "label": "Target leftmost monster when none selected",
      "type": "boolean",
      "default": false
  }
  return settings;
};

function fillDirectionSettings(settings) {
  var settings = settings || {};
  var directions = {
      'North':     'W',
      'South':     'S',
      'East':      'D',
      'West':      'A',
      'NorthEast': 'E',
      'NorthWest': 'Q',
      'SouthEast': 'C',
      'SouthWest': 'Z',
      'Action':    'L',
      'Normal':    'N',
      'Hunting':   'H',
      'Flee':      'F',
      'Inventory': 'I',
      'Pause':     'P'
  }
  for (var i in directions) {
    settings[i] = {
      'label': i,
      'type': 'string',
      'default': directions[i],
    }
    setIfNotSet(i, directions[i]);
  }
  return settings;
};

/**
 * Key mappering functions.
 */
var directions = ['North', 'South', 'East', 'West', 'NorthEast', 'NorthWest',
    'SouthEast', 'SouthWest'];
var keyedItems = directions.concat(['Action', 'Normal', 'Hunting', 'Flee', 'Inventory', 'Pause']);
var keymap;
function getKeyMap(refresh) {
  if (!keymap || refresh) {
    keymap = {};
    for (var i = 0; i < keyedItems.length; i++) {
      var key = get(keyedItems[i]);
      keymap[key] = keyedItems[i];
    }
  }
  return keymap;
};

// Now let's do some real work. Just kidding; more tables.
var funcMap;
function getFuncMap() {
  if (!funcMap) {
    funcMap = {};
    addMulti(funcMap, directions, maybeMove);
    appendValue(funcMap, 'Action', attack);
    appendValue(funcMap, 'Action', toMap);
    appendValue(funcMap, 'Action', rest);
    appendValue(funcMap, 'Action', trade);
    appendValue(funcMap, 'Action', talk);
    appendValue(funcMap, 'Action', cont);
    appendValue(funcMap, 'Normal', normal);
    appendValue(funcMap, 'Hunting', hunting);
    appendValue(funcMap, 'North', menuDir);
    appendValue(funcMap, 'South', menuDir);
    appendValue(funcMap, 'West', select);
    appendValue(funcMap, 'East', select);
    appendValue(funcMap, 'Flee', flee);
    appendValue(funcMap, 'Flee', toMap);
    appendValue(funcMap, 'Inventory', inv);
    appendValue(funcMap, 'Inventory', toMap);
    appendValue(funcMap, 'Pause', pause);
  }
  return funcMap
};

function onKeyDown(e) {
  if (disableOnKeyDown)
    return;
  var key = String.fromCharCode(e.which).toUpperCase();
  log('KEY: ' + key);
  var keyMap = getKeyMap();
  var action = keyMap[key];
  log('ACTION: ' + action);
  if (action) {
    var funcMap = getFuncMap();
    var funcList = funcMap[action];
    if (funcList) {
      for (var i = 0; i < funcList.length; i++) {
        disableOnKeyDown = true;
        if(funcList[i](action)) {
          break;
        }
        disableOnKeyDown = false;
      }
    }
  }
};

/**
 *Dom traversal functions.
 */
function getImage(img) {
  var images = $('img[src$="' + img +'"]');
  return images.length && images[0];
};

function getActiveMonsters() {
  var monsters = $('img[src^="http://images.neopets.com/nq2/m/"]').parent().parent();
  if (!monsters.length)
    return false;
  var dead = /http:\/\/images.neopets.com\/nq2\/m\/.*x_.*/g;
  return monsters.filter(function(i) {
    return !$(this).find('img').attr('src').match(dead);
  });
};

function getSelectedMonster(monsters) {
  var monsters = monsters || getActiveMonsters();
  for (var i = 0; i < monsters.length; i++) {
    if (monsters[i].innerHTML.search('hidden') == -1) {
      return monsters[i];
    }
  }
  return null;
}

function getField() {
  if (!getImage('http://images.neopets.com/nq2/x/com_atk.gif'))
    return false;
  var grr =$('table[cellpadding="2"][width="100%"]').children().children()
      .children();
  var field = grr[grr.length - 1];
  return field;
};

/**
 * NQ2 API code.
 */
function maybeMove(directionName) {
  var directionMapping = {
      'North': 1,
      'South': 2,
      'East':  4,
      'West':  3,
      'NorthEast': 7,
      'NorthWest': 5,
      'SouthEast': 8,
      'SouthWest': 6
  };

  if (!getImage('http://images.neopets.com/nq2/x/nav.gif'))
    return false;

  var dir = directionMapping[directionName];
  log('MOVED: ' + dir);
  if (dir) {
    unsafeWindow.dosub(dir);
  }
  return true;
};

function skipUselessPages() {
  var uselessImages = [
      'http://images.neopets.com/nq2/x/com_begin.gif',
      'http://images.neopets.com/nq2/x/com_next.gif',
      'http://images.neopets.com/nq2/x/com_end.gif'];
  for (var i = 0; i < uselessImages.length; i++) {
    var value = uselessImages[i];
    var image = getImage(value);
    if (image) {
      log('SKIPPED: ' + value);
      image.click();
      disableOnKeyDown = true;
      return true;
    }
  }
  var uselessStrings = [
      'You have fled from the fight!',
      'You won the fight!'
  ];
  for (var i = 0; i < uselessStrings.length; i++) {
    var value = uselessStrings[i];
    if (window.document.body.innerHTML.search(value) != -1) {
      log('SKIPPED: ' + value);
      var image = getImage('http://images.neopets.com/nq2/x/tomap.gif');
      image.click();
      disableOnKeyDown = true;
      return true;
    }
  }
  return false;
};

function printXp() {
  var xpTable = ['0', '1,000', '2,100', '3,300', '4,600', '6,000', '7,500',
      '9,100', '10,800', '12,600', '14,500', '16,500', '18,600', '20,800',
      '23,100', '25,500', '28,000', '30,600', '33,300', '36,100', '39,000',
      '42,000', '45,100', '48,300', '51,600', '55,000', '58,500', '62,100',
      '65,800', '69,600', '73,500', '77,500', '81,600', '85,800', '90,100',
      '94,500', '99,000', '103,600', '108,300', '113,100', '118,000',
      '123,000', '128,100', '133,300', '138,600', '144,000', '149,500',
      '155,100', '160,800', '166,600', '172,500', '178,500', '184,600',
      '190,800', '197,100', '204,400', '210,000', '216,600', '223,300',
      '230,100'];
  if (getImage('http://images.neopets.com/nq2/x/tomap.gif'))
    return;
  var players = $('a[href^="nq2.phtml?act=skills&show_char="]')
  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    var level = $(player).parent().prev()[0].innerHTML;
    $($(player).parent().siblings()[5]).append('/' + xpTable[level]);
  }
};

function ifImageClick(imgName) {
  return function(val) {
    log('IMAGE: ' + imgName);
    var img = getImage(imgName);
    if (img) {
      img.click();
      return true;
    }
    return false;
  };
};

function ifLinkClick(linkName, op) {
  op = op || '';
  return function(val) {
    log('LINK: ' + linkName);
    var links = $('a[href' + op + '="' + linkName + '"]');
    if (links.length) {
      links[0].click();
      return true;
    }
    return false;
  };
};

function select(val) {
  var table = {
    West: {step: -1, default: -1},
    East: {step:  1, default: 0}
  };
  var dir = table[val];
  var monsters = getActiveMonsters();
  if (!monsters) {
    return false;
  };
  var selected = monsters.index(getSelectedMonster(monsters));
  log('SELECTED: ' + selected);
  var step = dir.step;
  if (selected == -1) {
    selected = dir.default;
    step = 0;
  }
  var index = (selected + step + monsters.length) % monsters.length;
  log('MINDEX: ' + index);
  $(monsters[index]).find('img[src^="http://images.neopets.com/nq2/m/m"]')[0].click()
  disableOnKeyDown = false;
  return true;
};

var toMap = ifImageClick('http://images.neopets.com/nq2/x/tomap.gif');
var cont = ifImageClick('http://images.neopets.com/nq2/x/cont.gif')
var rest = ifLinkClick('say=rest', '*');
var trade = ifLinkClick('nq2.phtml?act=merch', '^');
var talk = ifLinkClick('nq2.phtml?act=talk', '^');
var normal = ifLinkClick('nq2.phtml?act=travel&mode=1');
var hunting = ifLinkClick('nq2.phtml?act=travel&mode=2');
var flee = ifImageClick('http://images.neopets.com/nq2/x/com_flee.gif');
var inv = ifLinkClick('nq2.phtml?act=inv');

function fixBattleSpace() {
  var field = getField();
  if (!field)
      return;
  field.innerHTML = field.innerHTML.replace(/&gt;/g, "");

  var jField = $(field);
  jField.prepend('<a onclick="setaction(3); document.ff.submit();'
      + 'return false;;" href="javascript:;">Attack (Attack 1)</a><br>');
  jField.find('a').each(function(i,e) {
    e=$(e);
    var action = (e.attr('onclick')+'').match(/setaction\((\d+)\)/)[1];
    $(e).before('<span action="' + action + '">&gt; </span>');
  });
  var action = getAttack();
  var defaultAction = jField.find('span[action=' + action + ']');
  log(defaultAction.length + ' ' + action);
  if (defaultAction.length == 0) {
    defaultAction = jField.find('span[action=3]')[0];
  }
  setAttackProps($(defaultAction));
};

function getChar() {
  return $('img[src="http://images.neopets.com/nq2/x/com_atk.gif"]').parent()
      .prev().prev().html();
};

function getAttack() {
  var char = getChar();
  log('CHAR: ' + char);
  log('MEM: ' + get('Memory'));
  log('VAL: ' + get('Mem-' + char));
  return (get('Memory') && get('Mem-' + char)) || '3';
};

function setAttack(attack) {
  if (get('Memory') && changedAttack) {
    var char = getChar();
    set('Mem-' + char, attack);
  }
};

var changedAttack = false;
function menuDir(val) {
  var table = {
      North: -1,
      South: 1
  };
  var dir = table[val];
  var field = $(getField());
  if (!field) {
    return false;
  }
  var spans = field.find('span');
  var index = spans.index($(field).find('span[active="yes"]'));;
  log('Index: ' + index);
  var next = (index + spans.length + dir) % spans.length;
  log('Next: ' + next);
  setAttackProps($(spans[index]), true);
  setAttackProps($(spans[next]));
  disableOnKeyDown = false;
  changedAttack = true;
  return true;
};

function setAttackProps(activeAttack, unset) {
  var font = unset ? '' : 'bold';
  var active = unset ? '' : 'yes';
  activeAttack.css('font-weight', font);
  activeAttack.next().css('font-weight', font);
  activeAttack.attr('active', active);
};

function getIsSelected() {
  var monsters = getActiveMonsters();
  var selectedMonster = getSelectedMonster(monsters);
  var monsterIsSelected = (monsters.length == 1) ||
      (monsters.length > 1 && selectedMonster != null);
  if (!monsterIsSelected && get('AutoTarget')) {
    select('East');
    return true;
  }
  return monsterIsSelected;
};

function attack(val) {
  var table = {
      3: 'monster',
      9103: 'self',
      9105: 'self',
      9201: 'monster',
      9202: 'self',
      9203: 'self',
      9204: 'monster',
      9205: 'self',
      9302: 'self',
      9401: 'ally',
      9402: 'self',
      9403: 'self',
      9404: 'monster',
      9405: 'monster'
  };
  var messageTable = {
    monster: '<font color="red">You must select a target to attack! <br></font> <br>',
    ally: '<font color="red">You must select a target to SOMETHING! <br></font> <br>'
    
  };
  var field = getField();
  if (!field) {
    return false;
  }
  var attackSpan = $(field).find('span[active="yes"]');
  var attack = attackSpan.attr('action');
  var attackType = table[attack];
  var monsterIsSelected = attackType == 'self' || getIsSelected();
  
  if ((attackType == 'monster' && !monsterIsSelected) ||
      (attackType == 'ally' && false)) {
    var messageSpace = $('div[style="margin-left: 3px"]');
    if (!messageSpace.find('font[color="red"]').length)
        messageSpace.prepend(messageTable[attackType]);
    return false;
  }
  setAttack(attack);
  attackSpan.next()[0].click();
};

function getCharStatus() {
  var ret = {};
  var hps = $('td[width="10"]').parent().find(':contains(Rohane)').parent()
      .find('td[align="center"]').each(function(i, e) {
    var font = $(e).find('font');
    if (font.length == 1) {
      var char = e.innerHTML.match('^[^<]*')[0];
      var hpPair = font[0].innerHTML.split('/');
    } else if (font.length == 2) {
      var char = font.find('b')[0].innerHTML;
      var hpPair = font[1].innerHTML.split('/');
        ret['active']  = char;
      }
      ret[char] = {hp: hpPair[0], max: hpPair[1]};
  });
  return ret;
};

/**
 * App specific functions.
 */
function showConfig() {
  disableOnKeyDown = true;
  configPage.Open().FadeIn(0);
  set('Config', true);
};

function main() {
  WinConfig.loadDefaultCss();
  GM_addStyle('.winconfig { z-index:200; }');
  configPage = WinConfig.init(settings)
  GM_registerMenuCommand('Neoquest 2 Configuration', showConfig);
  if (!get('Config')) {
    showConfig();
  }
  if(skipUselessPages()) return;
  printXp();
  fixBattleSpace();
//  go();
  window.addEventListener('keydown', onKeyDown, true);
};

main();

function pause() { };
