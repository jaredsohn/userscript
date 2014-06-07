// ==UserScript==
// @name          LWM Resources
// @description   LWM mod - Resources images
// @homepage      
// @version       0.0.1
// @include       http://www.lordswm.com/pl_info.php*
// @include       http://www.heroeswm.ru/pl_info.php*
// ==/UserScript==

// Written by Antviolence

if (top != self) return; // Don't run on iframes.
if (typeof LORDSWM == 'undefined') { // Own sandbox check.
  var LORDSWM = {};
}
if (typeof LORDSWM.site == 'undefined') {
  if (window.location.href.indexOf('lordswm.com') > -1) {
    LORDSWM.site = 'com';
  } else {
    LORDSWM.site = 'ru';
  }
}
LORDSWM.resources = {};

LORDSWM.resources.init = (function () {
  var params = document.getElementsByTagName('param'),
      numParams = params.length,
      bs = document.getElementsByTagName('b'),
      resourcesContent,
      arrResources,
      numResources,
      content1 = '',
      content2 = '',
      i,
      j,
      img;
  for (i = 0; i < numParams; i++) {
    if (params[i].name == 'FlashVars') {
      playerName = params[i].value.split('|')[3];
      break;
    } 
  }
  LORDSWM.forceLanguage = ''; // [empty string]/ru/en
  LORDSWM.language = LORDSWM.forceLanguage;
  if (LORDSWM.site == 'com') {
    LORDSWM.searchString = { 'Resources': 'Resources',
                             'Leather': 'Leather',
			     'Nickel': 'Nickel',
			     'Magic powder' : 'Magic powder',
			     'Steel' : 'Steel',
			     'Abrasive' : 'Abrasive',
			     'Fern flower' : 'Fern flower',
			     'Fire crystal' : 'Fire crystal',
			     'Ice crystal' : 'Ice crystal',
			     'Meteorite shard' : 'Meteorite shard',
			     'Moonstone' : 'Moonstone',
			     'Tiger`s claw' : 'Tiger`s claw',
			     'Toadstool' : 'Toadstool',
			     'Viper venom' : 'Viper venom',
			     'Windflower' : 'Windflower',
			     'Witch bloom' : 'Witch bloom' };
    LORDSWM.imageUrl = { 'Abrasive': 'http://www.lordswm.com/i/abrasive.gif',
                         'Fern flower': 'http://www.lordswm.com/i/fern_flower.gif',
                         'Fire crystal': 'http://www.lordswm.com/i/fire_crystal.gif',
                         'Ice crystal': 'http://www.lordswm.com/i/ice_crystal.gif',
                         'Meteorite shard': 'http://www.lordswm.com/i/meteorit.gif',
                         'Moonstone': 'http://www.lordswm.com/i/moon_stone.gif',
                         'Tiger`s claw': 'http://www.lordswm.com/i/tiger_tusk.gif',
                         'Toadstool': 'http://www.lordswm.com/i/badgrib.gif',
                         'Viper venom': 'http://www.lordswm.com/i/snake_poison.gif',
                         'Windflower': 'http://www.lordswm.com/i/wind_flower.gif',
                         'Witch bloom': 'http://www.lordswm.com/i/witch_flower.gif'};
    if (!LORDSWM.forceLanguage) {
      LORDSWM.language = 'en';
    }
  } else {
    LORDSWM.searchString = { 'Resources': '\u0420\u0435\u0441\u0443\u0440\u0441\u044B',
                             'Leather': '\u041A\u043E\u0436\u0430',
			     'Nickel': '\u041D\u0438\u043A\u0435\u043B\u044C',
			     'Magic powder' : '\u0412\u043E\u043B\u0448\u0435\u0431\u043D\u044B\u0439 \u043F\u043E\u0440\u043E\u0448\u043E\u043A',
			     'Steel' : '\u0421\u0442\u0430\u043B\u044C',
			     'Abrasive' : '\u0430\u0431\u0440\u0430\u0437\u0438\u0432',
			     'Fern flower' : '\u0446\u0432\u0435\u0442\u043E\u043A \u043F\u0430\u043F\u043E\u0440\u043E\u0442\u043D\u0438\u043A\u0430',
			     'Fire crystal' : '\u043E\u0433\u043D\u0435\u043D\u043D\u044B\u0439 \u043A\u0440\u0438\u0441\u0442\u0430\u043B\u043B',
			     'Ice crystal' : '\u043B\u0435\u0434\u044F\u043D\u043E\u0439 \u043A\u0440\u0438\u0441\u0442\u0430\u043B\u043B',
			     'Meteorite shard' : '\u043E\u0441\u043A\u043E\u043B\u043E\u043A \u043C\u0435\u0442\u0435\u043E\u0440\u0438\u0442\u0430',
			     'Moonstone' : '\u043B\u0443\u043D\u043D\u044B\u0439 \u043A\u0430\u043C\u0435\u043D\u044C',
			     'Tiger`s claw' : '\u043A\u043B\u044B\u043A \u0442\u0438\u0433\u0440\u0430',
			     'Toadstool' : '\u044F\u0434\u043E\u0432\u0438\u0442\u044B\u0439 \u0433\u0440\u0438\u0431',
			     'Viper venom' : '\u0437\u043C\u0435\u0438\u043D\u044B\u0439 \u044F\u0434',
			     'Windflower' : '\u0446\u0432\u0435\u0442\u043E\u043A \u0432\u0435\u0442\u0440\u043E\u0432',
			     'Witch bloom' : '\u0446\u0432\u0435\u0442\u043E\u043A \u0432\u0435\u0434\u044C\u043C' };
    LORDSWM.imageUrl = { 'Abrasive': 'http://im.heroeswm.ru/i/abrasive.gif',
                         'Fern flower': 'http://im.heroeswm.ru/i/fern_flower.gif',
                         'Fire crystal': 'http://im.heroeswm.ru/i/fire_crystal.gif',
                         'Ice crystal': 'http://im.heroeswm.ru/i/ice_crystal.gif',
                         'Meteorite shard': 'http://im.heroeswm.ru/i/meteorit.gif',
                         'Moonstone': 'http://im.heroeswm.ru/i/moon_stone.gif',
                         'Tiger`s claw': 'http://im.heroeswm.ru/i/tiger_tusk.gif',
                         'Toadstool': 'http://im.heroeswm.ru/i/badgrib.gif',
                         'Viper venom': 'http://im.heroeswm.ru/i/snake_poison.gif',
                         'Windflower': 'http://im.heroeswm.ru/i/wind_flower.gif',
                         'Witch bloom': 'http://im.heroeswm.ru/i/witch_flower.gif'};
    if (!LORDSWM.forceLanguage) {
      LORDSWM.language = 'ru';
    }
  }
  if (LORDSWM.language == 'en') {
    LORDSWM.textString = { 'Elements': 'Elements' };
  } else {
    LORDSWM.textString = { 'Elements': '\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u044B' };
  }

  for (i = 0; i < bs.length; i++) {
    el = bs[i];
    if(el.innerHTML.indexOf(LORDSWM.searchString['Resources']) > -1) {
      resourcesContent = el.parentNode.parentNode.nextSibling.firstChild;
      arrResources = resourcesContent.innerHTML.split('<br>');
      numResources = arrResources.length;
      for (j = 0; j < numResources; j++) {
        img = '';
	if (arrResources[j].indexOf(LORDSWM.searchString['Leather']) > -1 || arrResources[j].indexOf(LORDSWM.searchString['Nickel']) > -1 || arrResources[j].indexOf(LORDSWM.searchString['Magic powder']) > -1 || arrResources[j].indexOf(LORDSWM.searchString['Steel']) > -1) {
	  content1 += arrResources[j] + '<br />';
        } else if (arrResources[j].indexOf(LORDSWM.searchString['Abrasive']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Abrasive'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
        } else if (arrResources[j].indexOf(LORDSWM.searchString['Fern flower']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Fern flower'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
        } else if (arrResources[j].indexOf(LORDSWM.searchString['Fire crystal']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Fire crystal'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
         } else if (arrResources[j].indexOf(LORDSWM.searchString['Ice crystal']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Ice crystal'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
        } else if (arrResources[j].indexOf(LORDSWM.searchString['Meteorite shard']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Meteorite shard'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
        } else if (arrResources[j].indexOf(LORDSWM.searchString['Moonstone']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Moonstone'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
        } else if (arrResources[j].indexOf(LORDSWM.searchString['Tiger`s claw']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Tiger`s claw'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
        } else if (arrResources[j].indexOf(LORDSWM.searchString['Toadstool']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Toadstool'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
        } else if (arrResources[j].indexOf(LORDSWM.searchString['Viper venom']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Viper venom'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
        } else if (arrResources[j].indexOf(LORDSWM.searchString['Windflower']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Windflower'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
       } else if (arrResources[j].indexOf(LORDSWM.searchString['Witch bloom']) > -1) {
	  img = '<img src="' + LORDSWM.imageUrl['Witch bloom'] + '" style="height:16px; width:16px; border:0; vertical-align:bottom;" />';
        }
        if (img) {
	  content2 += img + arrResources[j].substring(18) + '<br />';
        }
      }
      if (!content1) {
	content1 = '<center>------</center>';
      }
      if (!content2) {
	content2 = '<center>------</center>';
      }

      resourcesContent.innerHTML = content1 + '<hr /><center><b>' + LORDSWM.textString['Elements'] + '</b></center><hr />' + content2;
    }
  }
}());
