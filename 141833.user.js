// ==UserScript==
// @name          LWM Hunt reward
// @description   LWM mod - hunt reward expectations
// @homepage      
// @version       1.1.0
// @include       http://www.lordswm.com/home.php
// @include       http://www.lordswm.com/map.php*
// @include       http://www.heroeswm.ru/home.php
// @include       http://www.heroeswm.ru/map.php*
// ==/UserScript==




if (top != self) return; // Don't run on iframes.
var forceLanguage = 'en'; // [empty string]/ru/en
var language = forceLanguage;
if (typeof LORDSWM == 'undefined') { // Own sandbox check.
  var LORDSWM = {};
}
if (typeof LORDSWM.getValue == 'undefined') {
  LORDSWM.getValue = function (key, defaultValue, alertIfFail) {
    if (typeof GM_getValue == 'undefined'|| (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {
      if (localStorage) {
        return localStorage[key] || defaultValue;
      } else {
        if (alertIfFail) {
          alert('Saved Greasemonkey values are not available.');
	}
        return defaultValue || '';
      }
    } else {
      return GM_getValue(key, defaultValue);
    }
  };
}
if (typeof LORDSWM.setValue == 'undefined') {
  LORDSWM.setValue = function (key, value, alertIfFail) {
    if (typeof GM_setValue == 'undefined'|| (GM_setValue.toString && GM_setValue.toString().indexOf("not supported")>-1)) {
      if (localStorage) {
        return localStorage[key] = value;
      } else {
        if (alertIfFail) {
          alert('Saving Greasemonkey values is not available.');
        }
      }
      return undefined;
    } else {
      return GM_setValue(key, value);
    }
  };
}
if (typeof LORDSWM.ownName == 'undefined') {
  LORDSWM.ownName = 'unknown';
  (function () {
    var i,
        params = document.getElementsByTagName('param'),
        numParams = params.length;
    for (i = 0; i < numParams; i++) {
      if (params[i].name == 'FlashVars') {
        LORDSWM.ownName = params[i].value.split('|')[3];
        break;
      }
    }
  }());
}
if (typeof LORDSWM.site == 'undefined') {
  if (window.location.href.indexOf('lordswm.com') > -1) {
    LORDSWM.site = 'com';
  } else {
    LORDSWM.site = 'ru';
  }
}
LORDSWM.huntReward = {};

LORDSWM.huntReward.init = (function () {
  if (location.href.indexOf('home.php') > -1) {
    var els = document.getElementsByTagName('a'),
        len = els.length,
        i;
    for (i = 0; i < len; i++) {
      if (els[i].href.indexOf('pl_hunter_stat.php') > -1 && els[i].title) {
        LORDSWM.setValue('lwm_hunt_reward_' + LORDSWM.site + '_' + LORDSWM.ownName, parseInt(els[i].innerHTML, 10));
        break;
      }
    }
  }
  if (location.href.indexOf('map.php') > -1) {
    var regEx = {},
	resource = {};
    if (LORDSWM.site == 'com') {
      if (!forceLanguage) {
        language = 'en';
      }
      regEx.creatures = /\((\d+)\)/;
      regEx.gold = /(\d+) gold/;
      regEx.wood = /(\d+) wood/;
      regEx.ore = /(\d+) ore/;
      resource = {
	'wood' : 180,
	'ore' : 180 };
	           
    } else {
      if (!forceLanguage) {
        language = 'ru';
      }
      regEx.creatures = /\((\d+) \u0448\u0442.\)/;
      regEx.gold = /(\d+) \u0437\u043E\u043B\u043E\u0442\u0430/;
      regEx.wood = /(\d+) \u0434\u0440\u0435\u0432\u0435\u0441\u0438\u043D\u044B/;
      regEx.ore = /(\d+) \u0440\u0443\u0434\u044B/;
      resource = {
	'wood' : 180,
	'ore' : 180 };
    }
    if (language == 'en') {
      var textString = { 'Experience': 'Experience',
			 'Income' : 'Income' };
    } else {
      var textString = { 'Experience': '\u041E\u043F\u044B\u0442',
			 'Income' : '\u041F\u0440\u0438\u0445\u043E\u0434' };
    }
    var creatureData = {
	// HG 0
	'archer' : { 'count' : 10, 'exp' : 3 },
	'peasant' : { 'count' : 25, 'exp' : 1 },
	'conscript' : { 'count' : 25, 'exp' : 1.4 },
	'brute' : { 'count' : 10, 'exp' : 1.6 },
	'skeleton' : { 'count' : 20, 'exp' : 1.2 },
	'sceletonwar' : { 'count' : 15, 'exp' : 2 },
	'stone_gargoyle' : { 'count' : 10, 'exp' : 3.2 },
	'gremlin' : { 'count' : 15, 'exp' : 1 },
	'elgargoly' : { 'count' : 12, 'exp' : 5 },
	'goblin' : { 'count' : 25, 'exp' : 1 },
	'hobgoblin' : { 'count' : 25, 'exp' : 1.8 },
	'scout' : { 'count' : 12, 'exp' : 4 },
	'imp' : { 'count' : 25, 'exp' : 1.2 },
	// HG 1
	'griffon' : { 'count' : 6, 'exp' : 11.8 },
	'footman' : { 'count' : 10, 'exp' : 3.4 },
	'ghost' : { 'count' : 10, 'exp' : 5.2 },
	'iron_golem' : { 'count' : 10, 'exp' : 6.6 },
	'mastergremlin' : { 'count' : 15, 'exp' : 1.8 },
	'saboteurgremlin' : { 'count' : 30, 'exp' : 1.8 },
	'pixel' : { 'count' : 25, 'exp' : 2.4 },
	'dryad' : { 'count' : 25, 'exp' : 4 },
	'horneddemon' : { 'count' : 30, 'exp' : 2.8 },
	'defender' : { 'count' : 30, 'exp' : 1.4 },
	'smalllizard' : { 'count' : 15, 'exp' : 2.6 },
	'bear' : { 'count' : 15, 'exp' : 4.6 },
	'spider' : { 'count' : 25, 'exp' : 3 },
	'skmarksman' : { 'count' : 40, 'exp' : 2.4 },
	// HG 2
	'angel' : { 'count' : 2, 'exp' : 66 },
	'zombie' : { 'count' : 30, 'exp' : 2.2 },
	'vampire' : { 'count' : 8, 'exp' : 13.6 },
	'rotzombie' : { 'count' : 30, 'exp' : 3.4 },
	'mage' : { 'count' : 5, 'exp' : 12.6 },
	'dancer' : { 'count' : 25, 'exp' : 4 },
	'goblinarcher' : { 'count' : 80, 'exp' : 2 },
	'wolfrider' : { 'count' : 30, 'exp' : 4 },
	'maiden' : { 'count' : 20, 'exp' : 6 },
	'assassin' : { 'count' : 30, 'exp' : 6.6 },
	'hornedoverseer' : { 'count' : 30, 'exp' : 4.6 },
	'familiar' : { 'count' : 40, 'exp' : 2 },
	'vermin' : { 'count' : 30, 'exp' : 2.6 },
	'jdemon' : { 'count' : 33, 'exp' : 3.2 },
	'shieldguard' : { 'count' : 70, 'exp' : 2.4 },
	'spearwielder' : { 'count' : 40, 'exp' : 2.2 },
	'bearrider' : { 'count' : 30, 'exp' : 4.8 },
	'spiderpois' : { 'count' : 40, 'exp' : 6 },
	'harpy' : { 'count' : 30, 'exp' : 5.8 },
	'kamneed' : { 'count' : 30, 'exp' : 11.2 },
	// HG 3
	'skeletonarcher' : { 'count' : 80, 'exp' : 2 },
	'plaguezombie' : { 'count' : 100, 'exp' : 3 },
	'elf' : { 'count' : 16, 'exp' : 7.6 },
	'druid' : { 'count' : 12, 'exp' : 14.8 },
	'sprite' : { 'count' : 25, 'exp' : 4 },
	'wardancer' : { 'count' : 50, 'exp' : 6.6 },
	'arcaneelf' : { 'count' : 27, 'exp' : 8.4 },
	'orc' : { 'count' : 20, 'exp' : 5.8 },
	'ogre' : { 'count' : 8, 'exp' : 12 },
	'fury' : { 'count' : 40, 'exp' : 9.8 },
	'bloodsister' : { 'count' : 50, 'exp' : 9.8 },
	'minotaur' : { 'count' : 40, 'exp' : 7.8 },
	'taskmaster' : { 'count' : 45, 'exp' : 11.2 },
	'shadowdragon' : { 'count' : 2, 'exp' : 70 },
	'hellhound' : { 'count' : 80, 'exp' : 6.6 },
	'succubus' : { 'count' : 20, 'exp' : 12.2 },
	'brawler' : { 'count' : 45, 'exp' : 5.4 },
	'skirmesher' : { 'count' : 80, 'exp' : 3.4 },
	'blackbearrider' : { 'count' : 50, 'exp' : 7.2 },
	'berserker' : { 'count' : 40, 'exp' : 8.4 },
	'mercarcher' : { 'count' : 20, 'exp' : 3 },
	'mercfootman' : { 'count' : 15, 'exp' : 5 },
	'swolf' : { 'count' : 20, 'exp' : 4 },
	'thiefarcher' : { 'count' : 30, 'exp' : 7 },
	'harpyhag' : { 'count' : 50, 'exp' : 9 },
	'kamnegryz' : { 'count' : 55, 'exp' : 13.4 },
	'blackknight' : { 'count' : 7, 'exp' : 32 },
	'gogachi' : { 'count' : 45, 'exp' : 2.6 },
	// HG 4
	'priest' : { 'count' : 12, 'exp' : 20.2 },
	'marksman' : { 'count' : 50, 'exp' : 3.8 },
	'squire' : { 'count' : 40, 'exp' : 4.2 },
	'impergriffin' : { 'count' : 40, 'exp' : 12.4 },
	'inquisitor' : { 'count' : 9, 'exp' : 24.2 },
	'lich' : { 'count' : 8, 'exp' : 17.2 },
	'spectre' : { 'count' : 35, 'exp' : 5.4 },
	'archlich' : { 'count' : 7, 'exp' : 22 },
	'djinn' : { 'count' : 16, 'exp' : 20.6 },
	'obsgargoyle' : { 'count' : 50, 'exp' : 5.2 },
	'steelgolem' : { 'count' : 45, 'exp' : 10.8 },
	'archmage' : { 'count' : 10, 'exp' : 14 },
	'unicorn' : { 'count' : 14, 'exp' : 24.8 },
	'greendragon' : { 'count' : 5, 'exp' : 70 },
	'rocbird' : { 'count' : 8, 'exp' : 20.8 },
	'wolfraider' : { 'count' : 50, 'exp' : 6.2 },
	'boarrider' : { 'count' : 100, 'exp' : 6.2 },
	'ogremagi' : { 'count' : 60, 'exp' : 14.8 },
	'darkrider' : { 'count' : 60, 'exp' : 13 },
	'briskrider' : { 'count' : 70, 'exp' : 18.8 },
	'cerberus' : { 'count' : 80, 'exp' : 8.2 },
	'runepriest' : { 'count' : 30, 'exp' : 11.8 },
	'runepatriarch' : { 'count' : 30, 'exp' : 20 },
	'enforcer' : { 'count' : 500, 'exp' : 2 },
	'battlegriffin' : { 'count' : 40, 'exp' : 9 },
	'lizard' : { 'count' : 80, 'exp' : 5 },
	'thiefwarrior' : { 'count' : 40, 'exp' : 7 },
	'troll' : { 'count' : 12, 'exp' : 30 },
	'beholder' : { 'count' : 44, 'exp' : 6.6 },
	'efreeti' : { 'count' : 4, 'exp' : 40 },
	'rapukk' : { 'count' : 5, 'exp' : 40 },
	// HG 5
	'wight' : { 'count' : 25, 'exp' : 33 },
	'bonedragon' : { 'count' : 12, 'exp' : 56 },
	'rakshasa_rani' : { 'count' : 20, 'exp' : 31 },
	'djinn_sultan' : { 'count' : 20, 'exp' : 22 },
	'masterhunter' : { 'count' : 50, 'exp' : 8.4 },
	'treant' : { 'count' : 30, 'exp' : 37.4 },
	'wdancer' : { 'count' : 42, 'exp' : 6.6 },
	'orcchief' : { 'count' : 50, 'exp' : 7.6 },
	'cyclop' : { 'count' : 20, 'exp' : 34.4 },
	'behemoth' : { 'count' : 8, 'exp' : 70 },
	'thunderbird' : { 'count' : 15, 'exp' : 23 },
	'cyclopking' : { 'count' : 18, 'exp' : 36.4 },
	'hydra' : { 'count' : 50, 'exp' : 21.6 },
	'minotaurguard' : { 'count' : 50, 'exp' : 11.2 },
	'grimrider' : { 'count' : 80, 'exp' : 18.8 },
	'deephydra' : { 'count' : 30, 'exp' : 23 },
	'hellcharger' : { 'count' : 40, 'exp' : 27.2 },
	'pitfiend' : { 'count' : 10, 'exp' : 31.4 },
	'succubusmis' : { 'count' : 70, 'exp' : 13.4 },
	'nightmare' : { 'count' : 35, 'exp' : 29 },
	'thane' : { 'count' : 40, 'exp' : 26.2 },
	'thunderlord' : { 'count' : 35, 'exp' : 32.4 },
	'mountaingr' : { 'count' : 150, 'exp' : 2.4 },
	'redlizard' : { 'count' : 100, 'exp' : 6 },
	'thiefmage' : { 'count' : 50, 'exp' : 7 },
	'air' : { 'count' : 10, 'exp' : 11.8 },
	'earth' : { 'count' : 10, 'exp' : 12.6 },
	'fire' : { 'count' : 10, 'exp' : 12 },
	'water' : { 'count' : 10, 'exp' : 11.4 },
	'blacktroll' : { 'count' : 16, 'exp' : 36 },
	'evileye' : { 'count' : 55, 'exp' : 6.6 },
	'siren' : { 'count' : 60, 'exp' : 12 },
	'upsiren' : { 'count' : 60, 'exp' : 14 },
	'seamonster' : { 'count' : 40, 'exp' : 24 },
	'mummy' : { 'count' : 30, 'exp' : 23 },
	'efreetisultan' : { 'count' : 8, 'exp' : 50 },
	'megogachi' : { 'count' : 70, 'exp' : 3.2 },
	// HG 6
	'cavalier' : { 'count' : 30, 'exp' : 46.4 },
	'crossman' : { 'count' : 70, 'exp' : 3.8 },
	'vampirelord' : { 'count' : 80, 'exp' : 14 },
	'wraith' : { 'count' : 26, 'exp' : 41 },
	'masterlich' : { 'count' : 40, 'exp' : 20 },
	'colossus' : { 'count' : 6, 'exp' : 70 },
	'rakshasa_raja' : { 'count' : 20, 'exp' : 32 },
	'emeralddragon' : { 'count' : 6, 'exp' : 80 },
	'druideld' : { 'count' : 80, 'exp' : 20.2 },
	'silverunicorn' : { 'count' : 30, 'exp' : 27 },
	'ancienent' : { 'count' : 35, 'exp' : 42 },
	'shadow_witch' : { 'count' : 25, 'exp' : 31.4 },
	'devil' : { 'count' : 12, 'exp' : 49 },
	'pitlord' : { 'count' : 20, 'exp' : 39 },
	'hotdog' : { 'count' : 45, 'exp' : 6 },
	'firedragon' : { 'count' : 15, 'exp' : 51 },
	'mercwizard' : { 'count' : 60, 'exp' : 7 },
	'upseamonster' : { 'count' : 60, 'exp' : 28 },
	'leviathan' : { 'count' : 15, 'exp' : 50 },
	'zhryak' : { 'count' : 13, 'exp' : 50 },
	// HG 7
	'paladin' : { 'count' : 40, 'exp' : 52.4 },
	'vindicator' : { 'count' : 65, 'exp' : 4 },
	'titan' : { 'count' : 8, 'exp' : 80 },
	'magneticgolem' : { 'count' : 80, 'exp' : 11.4 },
	'blackdragon' : { 'count' : 7, 'exp' : 80 },
	'matriarch' : { 'count' : 33, 'exp' : 37 },
	'hellkon' : { 'count' : 25, 'exp' : 20.2 },
	'pity' : { 'count' : 20, 'exp' : 31.4 },
	'magmadragon' : { 'count' : 16, 'exp' : 65.8 },
	'upleviathan' : { 'count' : 25, 'exp' : 60 },
	'pharaoh' : { 'count' : 30, 'exp' : 27 },
	'deadknight' : { 'count' : 20, 'exp' : 38 },
	// HG 8
	'archangel' : { 'count' : 27, 'exp' : 78 },
	'spectraldragon' : { 'count' : 30, 'exp' : 62 },
	'ancientbehemoth' : { 'count' : 13, 'exp' : 78 },
	'archdevil' : { 'count' : 8, 'exp' : 62.2 },
	'archdemon' : { 'count' : 8, 'exp' : 62.4 },
	// HG ?
	};
    var hgLevel = parseInt(LORDSWM.getValue('lwm_hunt_reward_' + LORDSWM.site + '_' + LORDSWM.ownName), 10),
        els = document.getElementsByTagName('a'),
        len = els.length,
        i,
        found = 0,
	pos,
	creature,
	str,
	el,
	match,
	reward = {},
	income = {
	'min' : 0,
	'avg' : 0,
	'max' : 0,
	'offered' : 0,
	'percent' : 0 },
	img,
	div;
    for (i = 0; i < len; i++) {
      el = els[i];
      if (el.href.indexOf('army_info.php') > -1) {
	found++;
	creature = el.href.substr(el.href.indexOf('=') + 1);
	if (creatureData[creature] && creatureData[creature].count) {
	  str = el.nextSibling.nodeValue;
	  reward = { 'gold' : 0, 'wood' : 0, 'ore' : 0 };
	  if (match = regEx.creatures.exec(str)) {
	    reward.creatures = parseInt(match[1], 10);
  	  }
	  if (match = regEx.gold.exec(str)) {
	    reward.gold = parseInt(match[1], 10);
  	  }
	  if (match = regEx.wood.exec(str)) {
	    reward.wood = parseInt(match[1], 10);
 	  }
	  if (match = regEx.ore.exec(str)) {
	    reward.ore = parseInt(match[1], 10);
	  }
	  income.offered = reward.gold + reward.wood * resource.wood + reward.ore * resource.ore;
	  /*
	   * These calculations are just rough estimates of the real values, and does in no way represent the real formulae.
	   * It's based on a limited amount of empirical data.
	   */
	  income.avg = 59 * Math.pow(1.1, hgLevel) * Math.pow(1.082, Math.log(reward.creatures / creatureData[creature].count) / Math.log(1.3));
	  income.min = Math.floor(income.avg * 3 / 4);
	  income.max = Math.ceil(income.avg * 4 / 3);
	  income.avg = Math.round(income.avg);
	  if (found == 1) {
            GM_addStyle(".table_progress {width:100px; height:3px; padding: 0px; margin-left: 9px; margin-top: 0px; margin-bottom: 0px; border: 1px solid black; display: inline-block;}");
	  }
	  if (income.offered < income.min) {
	    percent = 0;
	  } else if (income.offered > income.max) {
	    percent = 100;
	  } else if (income.offered < income.avg) {
	    percent = Math.round(50 * (income.offered - income.min) / (income.avg - income.min));
	  } else {
	    percent = 50 + Math.round(50 * (income.offered - income.avg) / (income.max - income.avg));
	  }
	  img = document.createElement('img');
	  img.src = 'i/top/logot.jpg';
	  img.height = 3;
	  img.width = percent;
	  img.title = percent + '%';
	  img.alt = percent + '%';
	  div = document.createElement('div');
	  div.className = 'table_progress';
	  div.title = percent + '%';
	  div.appendChild(img);
	  el.parentNode.appendChild(document.createElement('br'));
	  el.parentNode.appendChild(document.createTextNode(textString['Experience'] + ': ' + Math.round(reward.creatures * creatureData[creature].exp) + ', ' + textString['Income'] + ': ' + income.offered));
	  el.parentNode.appendChild(div);
/*
 * Just for testing.
	  el.parentNode.appendChild(document.createElement('br'));
	  el.parentNode.appendChild(document.createElement('br'));
	  el.parentNode.appendChild(document.createTextNode(income.min + ' ' + income.avg + ' ' + income.max + ' (' + income.offered + ')'));
*/
	} else {
	  // Unknown creature.
	}
        if (found >= 2 || LORDSWM.hgLevel < 6) {
          break;
	}
      }
    }
  }
}());
