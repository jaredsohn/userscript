// ==UserScript==
// @name		  Hentaiverse Equipment Comparison
// @namespace	  http://luna.lordoftime.info/hv_equip_compare.user.js
// @description	  可以让你查看装备基础值。Allows to compare pieces of equipment.
// @match		  http://hentaiverse.org/?s=Bazaar&ss=es*
// @match		  http://hentaiverse.org/?s=Character&ss=eq*
// @match		  http://hentaiverse.org/pages/showequip.php?eid=*&key=*
// @match		  http://hentaiverse.org/?s=Bazaar&ss=fr*
// @match		  http://hentaiverse.org/?s=Battle&ss=iw*
// @match		  http://hentaiverse.org/?s=Character&ss=in
// @match		  http://ehwiki.org/wiki/Equipment_Ranges?where=*
// @match	      http://ehwiki.org/wiki/Equipment_Ranges_*
// @version	      EX0.6.2.5r
// @run-at		  document-end
// ==/UserScript==
// Updated: Kite Shield, Force Shield, Cotton Armor, Staff Edb, Longsword, Katana, Mace Accuracy, Godlike->Leg+?

var Parser, Cruncher, Formatter, Controller, Wiki;

//Add function to compute the star result;
function GetStarResult(equipData, baseData, multiplier, offset) {
	function CompareWithBaseData(equipData, baseData, multiplier, offset) {
		resultStr = '';
		if (offset == undefined)offset = 0;
		for (var i = 0; i < 4; i++ )	{ 
			temp=((equipData - baseData[i + offset])/multiplier).toFixed(0)
			if (temp>0)	continue;
			switch (i)
			{
			case 0:
			resultStr='Sup';
			break;
			case 1:
			resultStr='Ex';
			break;
			case 2:
			resultStr='Mag';
			break;
			case 3:
			resultStr='Leg';
			break;
			default:
			resultStr='Error';
			break;
			}
				equipResult = ((baseData[i + offset] - equipData) / multiplier).toFixed(0);
				if (equipResult != 0)	resultStr+= '-' + equipResult;
				break;
		}
		if (resultStr == '')	
        {
        equipResult = ((equipData - baseData[3 + offset]) / multiplier).toFixed(0);
		if (equipResult != 0)	resultStr+= 'Leg+' + equipResult;
        }
        return resultStr;
	}
	resultStr = '';
	if (!equipData)resultStr = '※※※';
	else if (typeof(equipData) == 'number')
		resultStr = CompareWithBaseData(equipData, baseData, multiplier, offset);
	else {
		for (var y in equipData) {
			resultStr += CompareWithBaseData(equipData[y], baseData, multiplier, offset)+' ';
		}
	}
	return resultStr;
}

/* * * * * * * * * * * * * * * * * * * * * * * */
Parser = {

  parse: function(source) {

    // decorator for _parseObject

    if (source != null && source.constructor == String) {
      var tokens = source.match(/'.+?'/g), temp = document.createElement('div');
      temp.innerHTML = tokens[2].slice(1,tokens[2].length-1);
      var result = Parser._parseObject(temp.firstElementChild);
      result.Info.Name = tokens[1].slice(1,tokens[1].length-1);
      return result;
    }

    if (document.getElementById('equipment')) {
	
      var result = Parser._parseObject(document.querySelector('#equipment > div:first-child'));
	    var nameList = document.getElementsByClassName("fd4");
            var fullName = "";
            if (nameList.length != 0){
                for (var i = 0; i < nameList.length; i++){
                    fullName = fullName + " " + nameList[i].textContent;
                }
                 result.Info.Name = fullName.replace(/^\s+|\s+$/g, "") ;
            }
      else result.Info.Name = document.querySelector('.fd4').textContent;
 
      return result;
    }

    var popup = document.getElementById('popup_box');
    if (popup.childElementCount) {
      var result = Parser._parseObject(document.querySelector('#popup_box > div + div > div'));
      result.Info.Name = document.querySelector('#popup_box > div').textContent;
      return result;
    }

  },

  _parseObject: function(source) {

    function hasChildren(x) {
      for (var y in x) return true;
      return false;
    }

    if (source.constructor == String) {
      var temp = document.createElement('div');
      temp.innerHTML = source;
      return parseObject(temp);
    }

    var res = { Info: { } }, n = source.childNodes.length;
    var section = null, sectionContents = { };
    for (var i=0;i<n;i++) {
 if(i==0){ 
      var child = source.childNodes[i];
	child.innerHTML=' <strong>'+child.innerHTML+'</strong>'
 }
	
     else var child = source.childNodes[i];
      // check for equipment procs & info
      if (child.firstElementChild.nodeName == 'STRONG') {

       if (child.textContent.indexOf('Level') != -1) {
          // type, level and EXP
          var tokens = child.textContent.match(/^(.+?)\s+Level (\d+)\s+(.+)$/);
          res.Info.Type = tokens[1];
          res.Info.Level = parseInt(tokens[2],10);
          res.Info.EXP = tokens[3];
        }

        else if (child.textContent.indexOf('turn') != -1) {
          // proc type, chance, duration and damage
          var tokens = child.textContent.match(/^(.+): (\d+)%.+(\d+) turns?(?:.+?(\d+)% DOT)?/);
          res.Proc = { Type: tokens[1], Chance: parseInt(tokens[2],10), Duration: parseInt(tokens[3],10) };
          if (tokens[4]) res.Proc.Damage = parseInt(tokens[4],10);
        }

        else if (child.textContent.indexOf('points') != -1) {
          // siphon type, chance and damage
          var tokens = child.textContent.match(/^Siphon (.+): (\d+)%.+ ([\d\.]+) points/)
          res.Siphon = { Type: tokens[1], Chance: parseInt(tokens[2],10), Damage: parseFloat(tokens[3]) };
        }

        else if (child.textContent.indexOf('Damage') != -1) {
          // weapon damage and damage type
          var tokens = child.textContent.match(/^\+(\d+) (.+) Damage/);
          res.Damage = { Damage: parseInt(tokens[1],10), Type: tokens[2] };
        }

        else if (child.textContent.indexOf('Strike') != -1) {
          // elemental strike
          res.Info.Element = child.textContent.match(/^(.+) Strike/)[1];
        }
        continue;
      }
	  

      // check for section name
      if (!child.firstElementChild.childElementCount && child.textContent.trim().length) {

	
        if (hasChildren(sectionContents)) // previous section or stats
          res[section||'Stats'] = sectionContents; // clone

        section = child.firstElementChild.textContent;
        sectionContents = { };
      }

      // retrieve section contents
      var targets = child.getElementsByTagName('div'), target = null, attributeName = null, attributeValue = null;

      for (var j=0;j<targets.length;j++) {
        target = targets[j];
        if (target.firstElementChild && target.firstElementChild.nodeName == 'DIV') continue;
        if (target.textContent.length == 0) continue;
        if (target.textContent.trim()[0] == '%') continue;
        target = target.textContent.split('+')
        if (target.length > 1 && target[0].length > 0 && target[1].length > 0) {
          attributeName = target[0].trim();
          attributeValue = target[1].trim();
          sectionContents[attributeName] = parseFloat(attributeValue);
        } else {
          if (target.length == 1 || target[0].length > 0) // attribute name
            attributeName = target[0];
          else { // attribute value
            attributeValue = target[1];
            sectionContents[attributeName] = parseFloat(attributeValue);
          }
        }
      }
    }

    if (hasChildren(sectionContents)) // last section
      res[section||'Stats'] = sectionContents; // clone

    return res;

  }

};

/* * * * * * * * * * * * * * * * * * * * * * * */

Cruncher = {

  scalingFactors : {
    'Stats': {
      'Attack Damage': 16+2/3, 'Magic Damage': 22+3/4, 'Attack Accuracy': 5000, 'Magic Accuracy': 5000,
      'Attack Crit Chance': 2000, 'Magic Crit Chance': 2000, 'Block Chance': 2000, 'Evade Chance': 2000,
      'Parry Chance': 2000, 'Resist Chance': 2000,  'Physical Mitigation': 2000, 'Magical Mitigation': 2000,
      'Burden': Infinity, 'Interference': Infinity, 'Mana Conservation': Infinity, 'Attack Speed': Infinity
    },
    'Damage': 16+2/3,
    'Damage Mitigations': { 'Crushing': Infinity, 'Slashing': Infinity, 'Piercing': Infinity, 'default': Infinity },
    'Proficiency': 35+5/7,
    'Spell Damage': 200,
    'Primary Attributes': 35+5/7,
    'Proc': { 'Duration': 200, 'Damage': Infinity, 'Chance': Infinity },
    'Siphon': { 'Damage': 25, 'Chance': Infinity }
  },

  compare: function(a,b) {

    // returns a-b (b = equipped item)
    var result = { };

    for (var x in a) {
      result[x] = { };
      for (var y in a[x]) {
        if (x == 'Info' && y != 'Level')
          result[x][y] = a[x][y];
        else if (!b.hasOwnProperty(x) || !b[x].hasOwnProperty(y)) {
          if (a[x][y].constructor == Number)
            result[x][y] = a[x][y];
          else
            result[x][y] = '!' + a[x][y];
        }
        else if (b[x][y].constructor == Number)
          result[x][y] = a[x][y] - b[x][y];
        else
          result[x][y] = a[x][y] == b[x][y] ? a[x][y] : '!' + a[x][y];
      }
    }

    for (var x in b) {
      if (!result.hasOwnProperty(x)) result[x] = { };
      for (var y in b[x]) {
        if (result.hasOwnProperty(x) && result[x].hasOwnProperty(y)) continue;
        if (b[x][y].constructor == Number)
          result[x][y] = -b[x][y];
        else
          result[x][y] = '!' + b[x][y];
      }
    }

    return result;

  },

  scale: function(source) {

    if (!Controller.Level) return source;
    var result = { };
    for (var x in source) {
      result[x] = { };
      var factor = Cruncher.scalingFactors[x] || Infinity, effectiveFactor;
      for (var y in source[x]) {
        if (source[x][y].constructor != Number) {
          result[x][y] = source[x][y];
          continue;
        }
        if (factor.constructor == Number) effectiveFactor = factor;
        else if (factor.hasOwnProperty(y)) effectiveFactor = factor[y];
        else if (factor.hasOwnProperty('default')) effectiveFactor = factor.default;
        else effectiveFactor = Infinity;
        result[x][y] = (source[x][y] / (1 + Controller.Level / effectiveFactor))			
      }
	}return result;
 },


	compareBaseData: function(source,result){
		weaponInfo=''
		if (!result['Primary Attributes'])result['Primary Attributes']=''
		if (weaponT=source.Info.Name.match(/Axe|Club|Estoc|Mace|Scythe|Longsword|Katana/)){//双手武器以及斧子棍棒
			/Slaughter/.test(source.Info.Name)?weaponD=0:weaponD=4
			damageData ={	'Axe':		[59.66,64.00,66.60,71.77,	39.17,41.79,43.55,47.01],
							'Club':		[53.69,57.17,59.77,64.94,	34.90,36.67,38.42,41.88],
							'Estoc':	[64.79,69.12,72.58,78.61,	44.29,46.92,49.52,53.84],
							'Mace':		[64.79,69.12,71.73,77.75,	43.44,46.06,47.82,52.13],
							'Katana':	[63.93,68.27,70.87,76.9,	43.44,46.06,47.82,52.13],
							'Longsword':[75.04,79.37,82.83,90.56,	51.98,54.60,57.21,62.38],
							'Scythe':	[75.04,79.37,82.83,90.56,	51.98,54.60,57.21,62.38]
			}
			accuracyData ={	'Axe':		[9.63,10.28,10.92,11.56,	9.63,10.28,10.92,11.56],
							'Club':		[22.98,24.85,26.09,28.55,	10.24,10.89,11.53,12.77],
							'Estoc':	[19.95,21.21,22.45,24.3,		7.81,8.46,9.1,9.74],
							'Mace':		[23.59,25.45,26.7,28.55,	 9.63,10.28,10.92,11.56],
							'Katana':	[41.79,44.27,46.73,50.4,	21.77,23.03,24.27,26.12],
							'Longsword':[22.98,24.85,26.09,27.94,	 9.63,10.28,10.92,11.56],
							'Scythe':	[18.13,19.38,20.02,21.88,		6.59,7.25,7.28,7.92]
			}
			critData ={		'Axe':		[4.29,4.51,4.72,5.15,			4.29,4.51,4.72,5.15],
							'Club':		[8.18,8.6,9.03,9.87,			4.29,4.51,4.72,5.15],
							'Estoc':	[10.8,11.44,11.97,13.02,		6.39,6.71,7.03,7.67],
							'Mace':		[10.7,11.33,11.86,12.92,		6.5,6.92,7.24,7.88],
							'Katana':	[10.8,11.44,11.97,13.02,		6.39,6.71,7.03,7.67],
							'Longsword':[10.8,11.44,11.97,13.02,		6.39,6.71,7.03,7.67],
							'Scythe':	[10.7,11.33,11.86,12.92,		6.39,6.71,7.03,7.67]
			}
			strData ={		'Axe':		[4.76,5.08,5.4,5.71,			4.76,5.08,5.4,5.71],
							'Club':		[4.76,5.08,5.4,5.71,			4.76,5.08,5.4,5.71],
							'Estoc':	[9.26,9.88,10.2,11.11,			9.26,9.88,10.2,11.11],
							'Mace':		[9.26,9.88,10.2,11.11,			9.26,9.88,10.2,11.11],
							'Katana':	[9.26,9.88,10.2,11.11,			9.26,9.88,10.2,11.11],
							'Longsword':[9.26,9.88,10.2,11.11,			9.26,9.88,10.2,11.11],
							'Scythe':	[9.26,9.88,10.2,11.11,			9.26,9.88,10.2,11.11]
			}
			weaponInfo += 'WD:' + GetStarResult(result['Damage']['Damage'], damageData[weaponT], 0.854, weaponD) + '<br>';
			/Balance/.test(source.Info.Name)?weaponD=0:weaponD=4
			weaponInfo += 'Crit:' + GetStarResult(result['Stats']['Attack Crit Chance'], critData[weaponT], 0.105, weaponD) + '<br>';
			weaponInfo += 'Acc:' + GetStarResult(result['Stats']['Attack Accuracy'], accuracyData[weaponT], 0.6069, weaponD) + '<br>';
			weaponInfo += 'STR:' + GetStarResult(result['Primary Attributes']['Strength'], strData[weaponT], 0.3, weaponD) + '<br>';
		}
		else if (weaponT=source.Info.Name.match(/Dagger|Wakizashi/)){//匕首肋差
			/Slaughter/.test(source.Info.Name)?weaponD=0:weaponD=4
			damageData ={	'Dagger':	[35.75,38.38,40.13,43.59,	21.23,23.01,23.90,25.66],
							'Wakizashi':[34.90,37.52,39.28,42.74,	21.23,23.01,23.90,25.66]
						}
			accuracyData ={	'Dagger':	[38.76,41.23,43.69,47.37,	19.95,21.21,22.45,24.3],
							'Wakizashi':[37.55,40.02,41.87,45.54,	19.95,21.21,22.45,24.3]
						}
			critData ={		'Dagger':	[8.07,8.5,8.92,9.779,		4.29,4.51,4.72,5.15],
							'Wakizashi':[7.97,8.39,8.82,9.56,		4.29,4.51,4.72,5.15]
						}
			speedData ={	'Dagger':	[11.96,12.96,13.46,14.45,	7.63,8.15,8.65,9.16],
							'Wakizashi':[14.85,14.88,14.91,14.93,	10.04,10.07,10.1,10.12]
						}
			parryData ={	'Dagger':	[22.23,24.08,25.02,27.75,	16.87,17.83,18.77,20.6],
							'Wakizashi':[22.23,24.08,25.02,27.75,	16.87,17.83,18.77,20.6]
						}

			weaponInfo += 'WD:' + GetStarResult(result['Damage']['Damage'], damageData[weaponT], 0.854, weaponD) + '<br>';
			/Balance/.test(source.Info.Name)?weaponD=0:weaponD=4
			weaponInfo += 'Crit:' + GetStarResult(result['Stats']['Attack Crit Chance'], critData[weaponT], 0.105, weaponD) + '<br>';
			weaponInfo += 'Acc:' + GetStarResult(result['Stats']['Attack Accuracy'], accuracyData[weaponT], 0.6069, weaponD) + '<br>';
			/Swiftness/.test(source.Info.Name)?weaponD=0:weaponD=4
			weaponInfo += 'Spd:' + GetStarResult(result['Stats']['Attack Speed'], speedData[weaponT], 0.481, weaponD) + '<br>';
			/Nimble/.test(source.Info.Name)?weaponD=0:weaponD=4
			weaponInfo += 'Parry:' + GetStarResult(result['Stats']['Parry Chance'], parryData[weaponT], 0.894, weaponD) + '<br>';
		}
		else if (weaponT=source.Info.Name.match(/Rapier/)){//西洋剑
			/Slaughter/.test(source.Info.Name)?weaponD=0:weaponD=4
			damageData ={	'Rapier':	[39.17,41.79,43.55,47.86,	24.65,26.42,27.32,29.93]
						}
			accuracyData ={	'Rapier':	[33.3,35.77,37.01,40.69,	17.52,18.78,19.41,21.27]
						}
			critData={		'Rapier':	[8.07,8.5,8.92,9.77,		4.29,4.51,4.72,5.15]
						}
			parryData ={	'Rapier':	[21.34,23.19,24.13,26.86,	15.08,16.04,16.98,18.81]
						}

			weaponInfo += 'WD:' + GetStarResult(result['Damage']['Damage'], damageData[weaponT], 0.854, weaponD) + '<br>';
			/Balance/.test(source.Info.Name)?weaponD=0:weaponD=4
			weaponInfo += 'Crit:' + GetStarResult(result['Stats']['Attack Crit Chance'], critData[weaponT], 0.105, weaponD) + '<br>';
			weaponInfo += 'Acc:' + GetStarResult(result['Stats']['Attack Accuracy'], accuracyData[weaponT], 0.6069, weaponD) + '<br>';
			/Nimble/.test(source.Info.Name)?weaponD=0:weaponD=4
			weaponInfo += 'Parry:' + GetStarResult(result['Stats']['Parry Chance'], parryData[weaponT], 0.894, weaponD) + '<br>';
		}
		else if (weaponT=source.Info.Name.match(/Buckler|Kite|Tower|Force/)){//盾牌
			/Barrier/.test(source.Info.Name)?weaponD=0:weaponD=4
			blockData ={	'Buckler':	[25.81,27.88,28.93,30.98,	20.82,21.9,22.94,24.99],
							'Kite':		[28.81,31.88,32.92,34.97,	25.81,27.88,28.93,30.98],
							'Tower':	[31.8,34.87,35.92,38.97,	27.81,29.88,30.93,33.98],
                            'Force':	[30.8,32.87,33.92,36.97,	30.8,32.87,33.92,36.97]
						}
			weaponInfo += 'Block:' + GetStarResult(result['Stats']['Block Chance'], blockData[weaponT], 0.998, weaponD) + '<br>';
		}
		else if (weaponT=source.Info.Name.match(/Phase Robe|Phase Cap|Phase Gloves|Phase Pants|Phase Shoes/)){//相位装备
			edbData ={	'Phase Cap':	[12.76,13.62,14.46,15.31],
						'Phase Robe':	[15.17,16.03,16.88,18.53],
						'Phase Gloves':	[11.95,12.82,13.66,14.51],
						'Phase Pants':	[14.36,15.23,16.07,17.72],
						'Phase Shoes':	[10.34,11.21,12.05,12.90]
			}
			pabData ={	'Phase Cap': 	{'Intelligence':[5.66,5.98,6.3,6.91], 'Wisdom':[5.66,5.98,6.3,6.91], 'Agility':[4.76,5.08,5.4,5.71]},
						'Phase Robe':	{'Intelligence':[6.86,7.48,7.8,8.41], 'Wisdom':[6.86,7.48,7.8,8.41], 'Agility':[5.66,5.98,6.3,6.91]},
						'Phase Gloves':	{'Intelligence':[5.06,5.38,5.7,6.31], 'Wisdom':[5.06,5.38,5.7,6.31], 'Agility':[4.46,4.78,5.1,5.41]},
						'Phase Pants':	{'Intelligence':[6.26,6.58,6.9,7.51], 'Wisdom':[6.26,6.58,6.9,7.51], 'Agility':[5.36,5.68,6,6.61]},
						'Phase Shoes':	{'Intelligence':[4.46,4.78,5.1,5.41], 'Wisdom':[4.46,4.78,5.1,5.41], 'Agility':[3.86,4.18,4.5,4.81]},
			}
			evdData ={	'Phase Cap':	[4.22,4.49,4.75,5.26],
						'Phase Robe':	[4.97,5.24,5.50,6.01],
						'Phase Gloves':	[3.72,3.99,4.25,4.51],
						'Phase Pants':	[4.72,4.99,5.25,5.76],
						'Phase Shoes':	[3.47,3.74,4.00,4.26]
			}
			weaponInfo += 'EDB:' + GetStarResult(result['Spell Damage'], edbData[weaponT], 0.804) + '<br>';
			weaponInfo += 'EVD:' + GetStarResult(result['Stats']['Evade Chance'], evdData[weaponT], 0.25) + '<br>';
			weaponInfo += 'AGI:' + GetStarResult(result['Primary Attributes']['Agility'], pabData[weaponT]['Agility'], 0.3) + '<br>';
			weaponInfo += 'INT:' + GetStarResult(result['Primary Attributes']['Intelligence'], pabData[weaponT]['Intelligence'], 0.3) + '<br>';
			weaponInfo += 'WIS:' + GetStarResult(result['Primary Attributes']['Wisdom'], pabData[weaponT]['Wisdom'], 0.3) + '<br>';
		}
		else if (weaponT=source.Info.Name.match(/Cotton Robe|Cotton Cap|Cotton Gloves|Cotton Pants|Cotton Shoes/)){//熟练装备
			profData ={	'Cotton Cap':	[6.38,6.71,7.03,7.66],
						'Cotton Robe':	[7.61,8.24,8.56,9.19],
						'Cotton Gloves':[5.77,6.10,6.42,7.05],
						'Cotton Pants':	[7.00,7.63,7.95,8.58],
						'Cotton Shoes':	[5.16,5.49,5.81,6.44]
			}
			pabData	={	'Cotton Cap':	{'Intelligence':[4.76,5.08,5.4,5.71],'Wisdom':[4.76,5.08,5.4,5.71], 'Agility':[3.86, 4.18, 4.5, 4.81]},
						'Cotton Robe':	{'Intelligence':[5.66,5.98,6.3,6.91],'Wisdom':[5.66,5.98,6.3,6.91], 'Agility':[4.46, 4.78, 5.1, 5.41]},
						'Cotton Gloves':{'Intelligence':[4.46,4.78,5.1,5.41],'Wisdom':[4.46,4.78,5.1,5.41], 'Agility':[3.56, 3.88, 4.2, 4.51]},
						'Cotton Pants':	{'Intelligence':[5.36,5.68,6.0,6.61],'Wisdom':[5.36,5.68,6.0,6.61], 'Agility':[4.16, 4.48, 4.8, 5.11]},
						'Cotton Shoes':	{'Intelligence':[3.86,4.18,4.5,4.81],'Wisdom':[3.86,4.18,4.5,4.81], 'Agility':[3.26, 3.58, 3.6, 3.91]},
			}
			evdData ={	'Cotton Cap':	[3.22,3.49,3.75,4.01],
						'Cotton Robe':	[3.72,3.99,4.25,4.51],
						'Cotton Gloves':[2.97,3.24,3.50,3.76],
						'Cotton Pants':	[3.47,3.74,4.00,4.26],
						'Cotton Shoes':	[2.72,2.99,3.00,3.26]
			}
			weaponInfo += 'Prof:' + GetStarResult(result['Proficiency'], profData[weaponT], 0.306) + '<br>';
			weaponInfo += 'EVD:' + GetStarResult(result['Stats']['Evade Chance'], evdData[weaponT], 0.25) + '<br>';
			weaponInfo += 'AGI:' + GetStarResult(result['Primary Attributes']['Agility'], pabData[weaponT]['Wisdom'], 0.3) + '<br>';
			weaponInfo += 'INT:' + GetStarResult(result['Primary Attributes']['Intelligence'], pabData[weaponT]['Intelligence'], 0.3) + '<br>';
			weaponInfo += 'WIS:' + GetStarResult(result['Primary Attributes']['Wisdom'], pabData[weaponT]['Wisdom'], 0.3) + '<br>';
		}
		else if (weaponT=source.Info.Name.match(/Gossamer Robe|Gossamer Cap|Gossamer Gloves|Gossamer Pants|Gossamer Shoes/)){//熟练装备
			profData ={	'Gossamer Cap':		[6.38,6.71,7.03,7.66],
						'Gossamer Robe':	[7.61,8.24,8.56,9.19],
						'Gossamer Gloves':	[5.77,6.10,6.42,7.05],
						'Gossamer Pants':	[7.00,7.63,7.95,8.58],
						'Gossamer Shoes':	[5.16,5.49,5.81,6.44]
			}
			pabData	={	'Gossamer Cap':		{'Intelligence':[4.76,5.08,5.4,5.71],'Wisdom':[4.76,5.08,5.4,5.71], 'Agility':[3.86, 4.18, 4.5, 4.81]},
						'Gossamer Robe':	{'Intelligence':[5.66,5.98,6.3,6.91],'Wisdom':[5.66,5.98,6.3,6.91], 'Agility':[4.46, 4.78, 5.1, 5.41]},
						'Gossamer Gloves':	{'Intelligence':[4.46,4.78,5.1,5.41],'Wisdom':[4.46,4.78,5.1,5.41], 'Agility':[3.56, 3.88, 4.2, 4.51]},
						'Gossamer Pants':	{'Intelligence':[5.36,5.68,6.0,6.61],'Wisdom':[5.36,5.68,6.0,6.61], 'Agility':[4.16, 4.48, 4.8, 5.11]},
						'Gossamer Shoes':	{'Intelligence':[3.86,4.18,4.5,4.81],'Wisdom':[3.86,4.18,4.5,4.81], 'Agility':[3.26, 3.58, 3.6, 3.91]},
			}
			evdData ={	'Gossamer Cap':		[3.22,3.49,3.75,4.01],
						'Gossamer Robe':	[3.72,3.99,4.25,4.51],
						'Gossamer Gloves':	[2.97,3.24,3.50,3.76],
						'Gossamer Pants':	[3.47,3.74,4.00,4.26],
						'Gossamer Shoes':	[2.72,2.99,3.00,3.26]
			}
			weaponInfo += 'Prof:' + GetStarResult(result['Proficiency'], profData[weaponT], 0.306) + '<br>';
			weaponInfo += 'EVD:' + GetStarResult(result['Stats']['Evade Chance'], evdData[weaponT], 0.25) + '<br>';
			weaponInfo += 'AGI:' + GetStarResult(result['Primary Attributes']['Agility'], pabData[weaponT]['Wisdom'], 0.3) + '<br>';
			weaponInfo += 'INT:' + GetStarResult(result['Primary Attributes']['Intelligence'], pabData[weaponT]['Intelligence'], 0.3) + '<br>';
			weaponInfo += 'WIS:' + GetStarResult(result['Primary Attributes']['Wisdom'], pabData[weaponT]['Wisdom'], 0.3) + '<br>';
		}
		else if (weaponT=source.Info.Name.match(/Katalox|Oak|Redwood|Willow/)){//法杖
			/Destruction/.test(source.Info.Name)?weaponD=4:weaponD=0;        
			mdamageData ={	'Katalox':	[25.61,27.33,28.20,30.74,   41.37,43.92,45.62,49.82],
							'Oak':		[21.46,23.18,24.05,25.76],//[23.95,25.67,26.54,29.08], 
							'Redwood':	[23.95,25.67,26.54,29.08,	36.39,38.95,40.65,44.01],//[23.95,25.67,26.54,29.08,   38.88,41.43,43.14,47.33],
							'Willow':	[21.46,23.18,24.05,25.76,	36.39,38.95,40.65,44.01]//[23.95,25.67,26.54,29.08,   38.88,41.43,43.14,47.33] 
			}
			edbData      ={	'Katalox':	[8.74,9.6,9.64,10.49,	    16.78,17.64,17.68,18.53,    8.74,8.8,8.84,8.88,         28.84,30.5,31.35,33,        20.8,22.46,23.31,24.96],
							'Oak':		[12.76,13.62,14.46,15.31,   20.8,21.66,22.5,23.35,      15.17,16.03,16.07,16.92,    32.86,34.52,36.17,37.82,    24.82,26.48,28.13,29.78],
							'Redwood':	[8.74,9.6,9.64,10.49,       8.74,8.8,8.84,8.88,         16.78,17.64,17.68,18.53,     27.23,28.9,29.74,31.39 ,   19.19,20.86,21.7,23.35],
							'Willow':	[12.76,13.62,14.46,15.31,   20.8,22.46,23.31,24.96,     15.17,16.84,16.88,18.53]
			}
			pabData ={	'Katalox':	{'Intelligence':[5.66,5.98,6.3,6.91],'Wisdom':[3.86,4.18,4.5,4.81]},
						'Oak':		{'Intelligence':[3.86,4.18,4.5,4.81],'Wisdom':[5.66,5.98,6.3,6.91]},
						'Redwood':	{'Intelligence':[4.76,5.08,5.4,5.71],'Wisdom':[4.76,5.08,5.4,5.71]},
						'Willow':	{'Intelligence':[3.86,4.18,4.5,4.81],'Wisdom':[5.66,5.98,6.3,6.91]}			
			}
            weaponE=0;edbT='';
            if(/Heimdall/.test(source.Info.Name)) {weaponE=16;edbT='Holy';if(/Hallowed/.test(source.Info.Name))weaponE=12;}
            else if(/Fenrir/.test(source.Info.Name)) {weaponE=16;edbT='Dark';if(/Demonic/.test(source.Info.Name))weaponE=12;}
            else if(/Mjolnir/.test(source.Info.Name)) {weaponE=16;edbT='Elec';if(/Shocking/.test(source.Info.Name))weaponE=12;}
            else if(/Niflheim/.test(source.Info.Name)) {weaponE=16;edbT='Cold';if(/Arctic/.test(source.Info.Name))weaponE=12;}
            else if(/Surtr/.test(source.Info.Name)) {weaponE=16;edbT='Fire';if(/Fiery/.test(source.Info.Name))weaponE=12;}
            else if(/Freyr/.test(source.Info.Name)) {weaponE=16;edbT='Wind';if(/Tempestuous/.test(source.Info.Name))weaponE=12;}
            else if(/Heaven-sent/.test(source.Info.Name)) {edbT='Holy';}
            else if(/Demon-fiend/.test(source.Info.Name)) {edbT='Dark';}
            if(weaponE==0)
            {
            if(/Hallowed/.test(source.Info.Name)){edbT='Holy';weaponE=4;}
            else if(/Demonic/.test(source.Info.Name)){edbT='Dark';weaponE=4;}
            else if(/Fiery/.test(source.Info.Name)){edbT='Fire';weaponE=8;}
            else if(/Shocking/.test(source.Info.Name)){edbT='Elec';weaponE=8;}
            else if(/Tempestuous/.test(source.Info.Name)){edbT='Wind';weaponE=8;}
            else if(/Arctic/.test(source.Info.Name)){edbT='Cold';weaponE=8;}
            }
			if(edbT=='')
            {
            edbmax=0;equipData=result['Spell Damage'];
            for (var y in equipData) {if (equipData[y]>edbmax){edbmax=equipData[y];edbT=y;}}
            }
            weaponInfo += edbT+':' + GetStarResult(result['Spell Damage'][edbT], edbData[weaponT], 0.804, weaponE) + '<br>';
			weaponInfo += 'MD:' + GetStarResult(result['Stats']['Magic Damage'], mdamageData[weaponT], 0.82969, weaponD) + '<br>';
			weaponInfo += 'INT:' + GetStarResult(result['Primary Attributes']['Intelligence'], pabData[weaponT]['Intelligence'], 0.3) + '<br>';
			weaponInfo += 'WIS:' + GetStarResult(result['Primary Attributes']['Wisdom'], pabData[weaponT]['Wisdom'], 0.3) + '<br>';
		}
		else if (weaponT=source.Info.Name.match(/Power \w+/)){//动力
			weaponT=weaponT[0].match(/Power (\w+)/)[1];
			/Slaughter/.test(source.Info.Name)?weaponD=0:weaponD=4;
			adbData ={	'Helmet':	[20.38,22.15,23.05,24.80,	 9.28,10.20,10.24,11.14],
						'Armor':	[24.65,26.42,28.17,30.78,	10.99,11.90,12.80,13.70],
						'Gauntlets':[18.67,20.44,21.34,23.10,	 8.42, 9.34, 9.39,10.29],
						'Leggings':	[22.09,23.86,25.61,27.37,	10.13,11.05,11.95,12.85],
						'Boots':	[16.11,17.88,17.93,19.68,	 7.57, 8.49, 8.53, 9.43]
			}
			pmiData ={	'Helmet':	[ 9.00, 9.65,10.08,10.93,	6.69,7.13,7.56,8.2],
						'Armor':	[10.68,11.33,11.97,13.03,	7.95,8.39,8.82,9.67],
						'Gauntlets':[ 8.16, 8.81, 9.24,10.09,	6.06,6.5,6.72,7.36],
						'Leggings':	[ 9.84,10.49,11.13,11.98,	7.32,7.76,8.19,8.83],
						'Boots':	[ 7.32, 7.97, 8.19, 8.83,	5.43,5.87,6.09,6.52]
			}
			pabData ={	'Helmet':	{'Strength':[5.66,5.98,6.3,6.91],'Endurance':[3.86,4.18,4.5,4.81]},
						'Armor':	{'Strength':[6.86,7.48,7.8,8.41],'Endurance':[4.46,4.78,5.1,5.41]},
						'Gauntlets':{'Strength':[5.06,5.38,5.7,6.31],'Endurance':[3.56,3.88,4.2,4.51]},
						'Leggings':	{'Strength':[6.26,6.58,6.9,7.51],'Endurance':[4.16,4.48,4.8,5.11]},
						'Boots':	{'Strength':[4.46,4.78,5.1,5.41],'Endurance':[3.26,3.58,3.6,3.91]}			
			}
			critData={	'Helmet':	[ 4.5,4.82,5.04,5.46,	1.14,1.25,1.26,1.37],
						'Armor':	[5.34,5.66,5.98,6.51,	1.35,1.46,1.57,1.68],
						'Gauntlets':[ 4.08,4.4,4.51,4.94,	1.04,1.15,1.15,1.26],
						'Leggings':	[4.92,5.24,5.56,5.99,	1.25,1.36,1.47,1.58],
						'Boots':	[3.66,3.98,4.09,4.52,	0.93,1.04,1.05,1.16]
			}
			weaponInfo += 'ADB:' + GetStarResult(result['Stats']['Attack Damage'], adbData[weaponT], 0.854, weaponD) + '<br>';
			/Protection/.test(source.Info.Name)?weaponD=0:weaponD=4;
			weaponInfo += 'PMI:' + GetStarResult(result['Stats']['Physical Mitigation'], pmiData[weaponT], 0.21, weaponD) + '<br>';
			weaponInfo += 'STR:' + GetStarResult(result['Primary Attributes']['Strength'], pabData[weaponT]['Strength'], 0.3) + '<br>';
			weaponInfo += 'END:' + GetStarResult(result['Primary Attributes']['Endurance'], pabData[weaponT]['Endurance'], 0.3) + '<br>';
			/Balance/.test(source.Info.Name)?weaponD=0:weaponD=4;
			weaponInfo += 'Crit:' + GetStarResult(result['Stats']['Attack Crit Chance'], critData[weaponT], 0.105, weaponD) + '<br>';
		}
		else if (weaponT=source.Info.Name.match(/Plate Helmet|Plate Cuirass|Plate Gauntlets|Plate Greaves|Plate Sabatons/)){//板甲装备
			/Protection/.test(source.Info.Name)?weaponD=0:weaponD=4;
			pmiData ={	'Plate Helmet':		[11.52,12.17,12.81,13.87,	8.58,9.02,9.45,10.3],
						'Plate Cuirass':	[13.83,14.69,15.33,16.81,	10.26,10.91,11.34,12.4],
						'Plate Gauntlets':	[10.47,11.12,11.76,12.82,	7.74,8.18,8.61,9.46],
						'Plate Greaves':	[12.57,13.43,14.07,15.13,	9.42,10.07,10.5,11.35],
						'Plate Sabatons':	[ 9.21, 9.86,10.50,11.35,	6.9,7.34,7.77,8.41]
			}
			pabData ={	'Plate Helmet':		{'Strength':[3.86,4.18,4.5,4.81],'Endurance':[4.76,5.08,5.4,5.71]},
						'Plate Cuirass':	{'Strength':[4.46,4.78,5.1,5.41],'Endurance':[5.66,5.98,6.3,6.91]},
						'Plate Gauntlets':	{'Strength':[3.56,3.88,4.2,4.51],'Endurance':[4.46,4.78,5.1,5.41]},
						'Plate Greaves':	{'Strength':[4.16,4.48,4.8,5.11],'Endurance':[5.36,5.68,6.0,6.61]},
						'Plate Sabatons':	{'Strength':[3.26,3.58,3.6,3.91],'Endurance':[3.86,4.18,4.5,4.81]}
			}
			weaponInfo += 'PMI:' + GetStarResult(result['Stats']['Physical Mitigation'], pmiData[weaponT], 0.21, weaponD) + '<br>';
			weaponInfo += 'STR:' + GetStarResult(result['Primary Attributes']['Strength'], pabData[weaponT]['Strength'], 0.3) + '<br>';
			weaponInfo += 'END:' + GetStarResult(result['Primary Attributes']['Endurance'], pabData[weaponT]['Endurance'], 0.3) + '<br>';
			
		}
		else if (weaponT=source.Info.Name.match(/Shade \w+/)){//影甲
			weaponT=weaponT[0].match(/Shade (\w+)/)[1]
			adbData ={	'Helmet':		[6.72,7.63,7.68,8.58],
						'Breastplate':	[7.57,8.49,8.53,9.43],
						'Gauntlets':	[5.86,6.78,6.82,7.72],
						'Leggings':		[7.57,8.49,8.53,9.43],
						'Boots':		[5.86,6.78,6.82,7.72]
			}
			evdData ={	'Helmet':		[3.47,3.74,4.00,4.26,	4.97,5.49,5.75,6.26,	5.22,5.74,6.00,6.51],
						'Breastplate':	[4.22,4.49,4.75,5.26,	5.97,6.49,6.75,7.51,	6.22,6.74,7.00,7.76],
						'Gauntlets':	[3.22,3.49,3.75,4.01,	4.47,4.99,5.25,5.51,	4.72,5.24,5.50,6.01],
						'Leggings':		[3.72,3.99,4.25,4.51,	5.47,5.99,6.25,6.76,	5.72,6.24,6.50,7.01],
						'Boots':		[2.72,2.99,3.00,3.26,	3.97,4.49,4.50,4.76,	4.22,4.74,4.75,5.26]
			}
			pmiData ={	'Helmet':		[5.43,5.87,6.09,6.52],
						'Breastplate':	[6.48,6.92,7.14,7.78],
						'Gauntlets':	[5.01,5.45,5.67,6.10],
						'Leggings':		[6.06,6.50,6.72,7.36],
						'Boots':		[4.38,4.61,4.83,5.26]
			}
			pabData ={	'Helmet':		{'Strength':[3.26,3.58,3.6,3.91],'Agility':[3.86,4.18,4.5,4.81]},
						'Breastplate':	{'Strength':[3.86,4.18,4.5,4.81],'Agility':[4.46,4.78,5.1,5.41]},
						'Gauntlets':	{'Strength':[2.96,3.28,3.3,3.61],'Agility':[3.56,3.88,4.2,4.51]},
						'Leggings':		{'Strength':[3.56,3.88,4.2,4.51],'Agility':[4.16,4.48,4.8,5.11]},
						'Boots':		{'Strength':[2.66,2.98,3.0,3.31],'Agility':[3.26,3.58,3.6,3.91]}
			}
			weaponInfo += 'ADB:' + GetStarResult(result['Stats']['Attack Damage'], adbData[weaponT], 0.854) + '<br>';
			weaponInfo += 'PMI:' + GetStarResult(result['Stats']['Physical Mitigation'], pmiData[weaponT], 0.21) + '<br>';
			/Fleet/.test(source.Info.Name)?weaponD=8:/Shadowdancer/.test(source.Info.Name)?weaponD=4:weaponD=0
			weaponInfo += 'EVD:' + GetStarResult(result['Stats']['Evade Chance'], evdData[weaponT], 0.25, weaponD) + '<br>';
			weaponInfo += 'STR:' + GetStarResult(result['Primary Attributes']['Strength'], pabData[weaponT]['Strength'], 0.3) + '<br>';
			weaponInfo += 'AGI:' + GetStarResult(result['Primary Attributes']['Agility'], pabData[weaponT]['Agility'], 0.3) + '<br>';
		}

		temp= document.createElement('div');
		temp.style.cssText = "font-size:15px;color:black; ";
		temp.innerHTML=weaponInfo
	}

};

/* * * * * * * * * * * * * * * * * * * * * * * */

Formatter = {

  _sectionOrder: ['Info','Stats','Spell Damage','Damage Mitigations','Proficiency','Primary Attributes'],

  _format: function(string) {
    var parameters = arguments;
    return string.replace(/{(\d+)}/g,function(match,number) {
      return parameters.length > +number+1 ? parameters[+number+1] : match;
    });
  },

  _formatInfo: function(source) {

    var result = '';

    result += Formatter._format(
      '<div style="margin:3px auto; font-size:110%; text-align:center">' +
        '<b>{0}</b> &nbsp; &nbsp; <b>Level</b> <strong>{1}</strong> &nbsp; &nbsp; <b>{2}</b></div>',
      source.Info.Type,source.Info.Level,source.Info.EXP
    );

    if (source.hasOwnProperty('Proc')) {
      result += Formatter._format(
        '<div style="text-align:center; margin:3px auto"><b>{0}</b>: ' +
          '<strong>{1}%</strong> chance - <strong>{2}</strong> turns{3}</div>',
        source.Proc.Type,source.Proc.Chance,source.Proc.Duration.toFixed(2),
        !source.Proc.hasOwnProperty('Damage') ?
          '' :
          Formatter._format(' / <strong>{0}%</strong> DOT',source.Proc.Damage)
      );
    }

    if (source.hasOwnProperty('Siphon')) {
      result += Formatter._format(
        '<div style="text-align:center; margin:3px auto"><b>Siphon</b> <b>{0}</b>: ' +
          '<strong>{1}%</strong> chance - <strong>{2}</strong> points</div>',
        source.Siphon.Type,source.Siphon.Chance,source.Siphon.Damage.toFixed(1)
      );
    }

    if (source.hasOwnProperty('Damage')) {
      result += Formatter._format(
        '<div style="text-align:center; margin:3px auto">+<strong>{0}</strong> <b>{1}</b> <b>Damage</b> </div>',
        source.Damage.Damage.toFixed(2),source.Damage.Type
      );
    }

    if (source.Info.hasOwnProperty('Element')) {
      result += Formatter._format(
        '<div style="text-align:center; margin:3px auto"><strong>{0}</strong> <b>Strike</b></div>',
        source.Info.Element
      );
    }

    // removes contradicting signs
    result = result.replace(/\+<strong>-/g,'<strong>-');

    return result;

  },

  _formatSection: function(name,source) {

    var result = '', attributes = '', stats = (name == 'Stats'), attributeCount = 0;
    var newLine = [];

    for (var x in source) {

      var temp =
        Formatter._format('<div style="float:left; width:{0}px; text-align:right;">',stats ? '155' : '100') +
          Formatter._format('<div style="float:left; {0}">{1}</div>',stats ? 'width:99px; padding:2px' : 'width:65px',x) +
          Formatter._format(
            '<div style="float:left; width:35px; {0}">+<strong>{1}</strong></div>',
            stats ? 'padding:2px 0 2px 2px' : '',
            source[x].toFixed(2)
          ) +
          // additional div needed for stats (containing the percent sign)
          (!stats ? '' : Formatter._format(
            '<div style="float:left; width:6px; text-align:left; padding:2px 2px 2px 1px">{0}</div>',
            stats && !/Damage|Interference|Burden/.test(x) ? ' %' : '' // exclude damage, burden and interference
          )) +
          '<div style="clear:both"></div></div>';

      // added later on a new line
      if (stats && (x == 'Burden' || x == 'Interference')) newLine.push(temp);
      else attributes += temp;

      attributeCount++; // needed later to center the floating div(s)

    }

    if (newLine.length) {
      attributes += newLine[0].replace(/">/,'clear: left;">');
      if (newLine[1]) attributes += newLine[1];
    }

    if (stats)
      result = Formatter._format(
        '<div style="border-top:1px solid #A47C78; margin:5px auto 2px; padding-top:2px">{0}<div style="clear:both"></div></div>',
        attributes
      );

    else
      result = Formatter._format(
        '<div style="margin:7px auto 2px"><div style="font-weight:bold; text-align:center">{0}</div>' +
          '<div style="padding-right:20px"><div style="margin:5px auto; width:{1}00px">{2}</div></div><div style="clear:both"></div></div>',
        name,Math.min(3,attributeCount),attributes
      );

    // add color to Burden and Interference
    result = result.replace(/((?:Burden|Interference).+?)">/g,'$1;color:#BF0000">');

    // removes contradicting signs
    result = result.replace(/\+<strong>-/g,'<strong>-');

    return result;

  },

  addColors: function(source, comparison) {

    // source must be a node
    // comparison = true > red/green
    // comparison = false > purple (base values)

    var targets = source.querySelectorAll('div[style^="float"] strong');
    for (var i=targets.length-1;i>=0;i--) {
      if (comparison) {
        if (Math.abs(parseFloat(targets[i].textContent)) <= 0.01) targets[i].parentNode.style.color = 'dodgerblue';
        else {
          var reverse = /Burden|Interference/.test(targets[i].parentNode.previousElementSibling.textContent);
          if (targets[i].parentNode.textContent[0] != '-') targets[i].parentNode.style.color = !reverse ? 'darkgreen' : 'red';
          else targets[i].parentNode.style.color = !reverse ? 'red' : 'darkgreen';
        }
      } else targets[i].parentNode.style.color = 'darkorchid';
    }

    // info & procs
    var targets = source.querySelectorAll('div:not([style^="float"]) > div > strong');
    for (var i=targets.length-1;i>=0;i--) {
      if (comparison) {
        if (!/[-\+\d]/.test(targets[i].textContent[0]) || Math.abs(parseFloat(targets[i].textContent)) <= 0.01)
          targets[i].style.color = 'dodgerblue';
        else {
          if (targets[i].textContent[0] != '-') {
            targets[i].style.color = 'darkgreen';
            if (targets[i].parentNode.textContent[0] != '+')
              targets[i].textContent = '+' + targets[i].textContent;
          }
          else targets[i].style.color = 'red';
        }
      } else if (/\d/.test(targets[i].textContent[0])) targets[i].style.color = 'darkorchid';
    }

    // highlight different strings
    var targets = source.querySelectorAll('strong, b');
    for (var i=targets.length-1;i>=0;i--) {
      if (targets[i].textContent[0] != '!' || targets[i].childElementCount) continue;
      targets[i].textContent = targets[i].textContent.slice(1);
      targets[i].style.color = 'dodgerblue';
    }

  },

  toHTML: function(source) {

    var result = '';

    Formatter._sectionOrder.forEach(function(section) {
      if (section == 'Info') result += Formatter._formatInfo(source);
      else if (source.hasOwnProperty(section))
        result += Formatter._formatSection(section,source[section]);
    });

    return result;

  }

};

/* * * * * * * * * * * * * * * * * * * * * * * */

Controller = {

  toText: function(node) {

    if (!Controller.toText.map)
      Controller.toText.map = '0123456789.,!?%+-=/\'":;()[]-            abcdefghijklmnopqrstuvwxyz';

    var targets = node.querySelectorAll('.f10rb, .f12rb'), n = targets.length, result = '';
    if (n == 0) result = node.textContent;
    else {
      while (n --> 0) {
        var offset = parseInt(targets[n].style.backgroundPosition.match(/(\d+)px$/)[1],10);
        var height = targets[n].className.indexOf('10') == -1 ? 12 : 10;
        result += Controller.toText.map[offset/height];
      }
    }

    return result.replace(/^(.)|\s(.)/g,function(c) { return c.toUpperCase(); });

  },

  saveData: function() {

    var result = /slot/.test(window.location.href) ? JSON.parse(localStorage.getItem('HVEquipment')) : { };
    var targets = document.querySelectorAll('.eqde');

    for (var i=targets.length-1;i>=0;i--) {
      var data = Parser.parse(targets[i].getAttribute('onmouseover'));
      var slot = Controller.toText(targets[i].parentNode.firstElementChild);
      result[slot] = data;
    }

    localStorage.setItem('HVEquipment',JSON.stringify(result));
    var level = document.querySelector('.fd4');
    if (level.textContent.indexOf('Level') != -1||level.textContent.indexOf('等级') != -1) level = level.textContent;
    else level = Controller.toText(level);
    if (level.indexOf('Level') != -1) localStorage.setItem('HVLevel',level.match(/(\d+)/)[1]);

  },

  loadData: function() {

    var level = parseInt(localStorage.getItem('HVLevel'));
    if (level) Controller.Level = level;

    var equipment = JSON.parse(localStorage.getItem('HVEquipment'));
    if (!equipment) return;
    for (var x in equipment)
      this[x] = equipment[x];

  },

  hasData: function() {
    return localStorage.hasOwnProperty('HVEquipment') && localStorage.hasOwnProperty('HVLevel');
  },

  getTarget: function() {
    return document.querySelector('#popup_box > div + div > div, #equipment > div');
  },

  _extractSlot: function(name,slot) {
    if (/Weapon|Staff/i.test(slot)) return 'Main Hand';
    if (/Shield/i.test(slot)) return 'Off Hand';
    if (/Cap|Helm|Coif/i.test(name)) return 'Helmet'
    if (/Robe|Armor|Breastplate|Cuirass|Hauberk/i.test(name)) return 'Body';
    if (/Gloves|Gauntlets|Mitons/i.test(name)) return 'Hands';
    if (/Pants|Leggings|Greaves|Chausses/i.test(name)) return 'Legs';
    return 'Feet';
  },

  keyEvent: function(e) {
	if (document.getElementById('offhand'))document.body.removeChild(document.getElementById('offhand'))
    var key = String.fromCharCode(e.keyCode).toLowerCase();
    if (!/[qwerf]/.test(key) || !Controller.popup.childElementCount || !Controller.hasData()) return;
    if (!Controller.loaded) {
      Controller.loadData();
      Controller.laded = true;
    }

    var name = document.querySelector('#popup_box > div') || document.querySelector('body > div > div > div > .fd4 > div');
    name.textContent = name.textContent.replace(/\s\(.+\)/,'');
    var source = Parser.parse(), slot = Controller._extractSlot(source.Info.Name,source.Info.Type), result;

    if (key == 'f') {temp=prompt("Forum Url Link:",'[url\='+document.location.href+']'+source.Info.Name+'[/url]')}

    if (key == 'r') {	
	if (source.Info.Type.match(/Cloth/)) window.open('http://ehwiki.org/wiki/Equipment_Ranges_Clothes?where=' + source.Info.Name.replace(/\s/g,'+'));
   else if (source.Info.Type.match(/Heavy/))window.open('http://ehwiki.org/wiki/Equipment_Ranges_Heavy?where=' + source.Info.Name.replace(/\s/g,'+'));
   else if (source.Info.Type.match(/Light/))window.open('http://ehwiki.org/wiki/Equipment_Ranges_Light?where=' + source.Info.Name.replace(/\s/g,'+'));
	else window.open('http://ehwiki.org/wiki/Equipment_Ranges?where=' + source.Info.Name.replace(/\s/g,'+'));return;}

    var switchSlot = ((key == 'q' || key == 'e') && Controller.lastEquip == source.Info.Name && Controller.lastSlot != 'Off Hand' &&
      source.Info.Type.match(/One/)=='One' && document.getElementById('Equipment') != null);

    if (document.getElementById('Equipment') != null) {
      Controller.lastResult.parentNode.removeChild(Controller.lastResult);
      if (Controller.lastKey == key && !switchSlot) {
        Controller.getTarget().style.display = null;
        return;
      }
    }

    if (Controller.lastKey == key && switchSlot)
      slot = (Controller.lastSlot == 'Main Hand' ? 'Off Hand' : 'Main Hand');

	if (slot=='Off Hand')
		{
		cmp=document.createElement('div')
		cmp.id='offhand'
		cmp.innerHTML='(Off hand)'
		cmp.style.cssText = "position:relative;top:-385px;left:100px;color:red"
		document.body.appendChild(cmp);
		}
    if (source.Info.Type == 'One-handed Weapon' && (key == 'q' || key == 'e')) name.textContent += ' (' + slot + ')';

    if (key == 'q' || key == 'e') {
      if (!Controller.Level) Controller.loadData();
      result = Cruncher.compare(source,Controller[slot] || { });
    } else result = source;
    if (key == 'w' || key == 'e'){
      result = Cruncher.scale(result);
	  Cruncher.compareBaseData(source,result)	
    }
    var div = document.createElement('div');
    div.id = 'Equipment';
    div.innerHTML = Formatter.toHTML(result);
    Formatter.addColors(div,key == 'q' || key == 'e');

    var target = Controller.getTarget();
    target.parentNode.insertBefore(div,target.nextSibling);
    target.style.display = 'none';

    Controller.lastKey = key;
    Controller.lastResult = div;
    Controller.lastSlot = slot;
    Controller.lastEquip = source.Info.Name;
	if (key == 'w')div.appendChild(temp);
  }

};

/* * * * * * * * * * * * * * * * * * * * * * * */

Wiki = {

  _evaluate: function(query) {
    return document.evaluate(query,document,null,9,null).singleNodeValue;
  },

  check: function() {

    var equip = window.location.href.match(/where=([^#&]+)/)[1].replace(/\+/g,' '), temp, target;

    if (temp = equip.match(/(Cotton|Gossamer|Phase|Leather|Kevlar|Shade|Plate|Shield (?!of)|Power)/)) { // armor
        type=temp[1].trim()+Controller._extractSlot(equip,'').replace(/Helmet/,'Head');
        target = Wiki._evaluate('.//h4[./span[starts-with(text(),"' + type + '")]]/following-sibling::table');
    } else { // other
      var type = equip.replace(/Flimsy|Crude|Fair|Average|Fine|Superior|Exquisite|Magnificent|Legendary|Ethereal/g,'');
      type = type.replace(/Shocking|Arctic|Tempestuous|Fiery|Astral|Quintessential|Demonic|Hallowed/g,'');
      type = type.match(/([^\s]+)/)[1].trim();
      target = Wiki._evaluate('.//h3[./span[starts-with(text(),"' + type + '")]]/following-sibling::table');
    }

    Wiki._highlightTable(target,equip);

  },

  _highlightTable: function(target,equip) {

    if (!target) return;

    if (/collapsibleTable/.test(target.id)) {
      if (unsafeWindow && unsafeWindow.collapseTable) unsafeWindow.collapseTable(target.id.match(/(\d+)$/)[1]); // firefox
      else window.location.href = 'javascript:collapseTable(' + target.id.match(/(\d+)$/)[1] + ')'; //chrome
    }

    target.scrollIntoView();
    var offset = (/Exquisite/.test(equip)?1:/Magnificent/.test(equip)?2:/Legendary/.test(equip)?3:0);

    // highlight relevant rows

    function isFirst(x) {
      return !x.firstElementChild.hasAttribute('scope');
    }

    function checkSuffix(td,suffix) {
      return td.indexOf(suffix) == 0 ||
        (/Mjolnir|Surtr|Niflheim|Freyr/.test(suffix) && /×★/i.test(td)) ||
        (/Heimdall|Fenrir/.test(suffix) && /×√/i.test(td)) ||
        (/Heaven-sent|Demon-fiend|Elementalist|Curse-weaver|Priestess|Earth-walker/.test(suffix) && /Prof/i.test(td)) ||
        (/Fox|Owl|Cheetah|Raccoon|Turtle|Ox/.test(suffix) && /PAB/i.test(td)) ||
        (/Dampening|Stone|Deflection|Warding|eater|born|child|waker|blessed|ward/.test(suffix) && /Mitigation/i.test(td));
    }


    function checkPreffix(td,preffix) {
      return td.indexOf(preffix) == 0 ||
		(/Fiery|Shocking|Tempestuous|Arctic/.test(preffix) && /★×/i.test(td))||
		(/Demonic|Hallowed/.test(preffix) && /√×/i.test(td))||
        (/Shielding/.test(preffix) && /Shielding/i.test(td))||
        (/Charged/.test(suffix) && /Charged/i.test(td)) ||
        (/Frugal/.test(suffix) && /Frugal/i.test(td)) ||
        (/Mithril/.test(preffix) && /Mithril Prefix/i.test(td))
    }



    function highlightRow(row) {
      var n = row.cells.length-5+offset;
      if (row.cells[n].textContent.trim() == 0) return;
      for (var i=n;i>=0;i--) highlightCell(row.cells[i]);
      highlightCell(row.cells[n],true);
      if (isFirst(row)) {
        temp = Wiki._evaluate('preceding-sibling::tr[./th[1][@scope]][1]/th[1]',row);
        if (temp) highlightCell(temp);
      }
    }

    function highlightCell(cell,text) {
      if (!cell) return;
      cell.style.cssText = 'background-color: bisque;' + (text?'color: firebrick; font-weight: bold; text-decoration: underline;':'');
    }

    var rows = Array.prototype.slice.call(target.rows,0).slice(3), n = rows.length;
    var suffix = equip.match(/([^\s]+)$/)[1].trim()+' '+equip.match(/\S+ (\S+)/)[1].trim()
    for (var i=0;i<n;i++) {
      var rowspan = rows[i].firstElementChild.getAttribute('rowspan')||1, temp = false, temp2 = null;temp3=false; premarch = false;
      for (var j=0;j<rowspan;j++, i++) {
        if (temp) continue; //如果判断后缀,就停止了
        var suffixTD = isFirst(rows[i])?rows[i].firstElementChild:rows[i].firstElementChild.nextElementSibling, suffixTDtext = suffixTD.textContent.trim();//判断是不是一个项目的
       // alert(suffix)
		if ((/Heimdall Hallowed|Demonic Fenrir/.test(suffix) && /√√/i.test(suffixTDtext))||(/Surtr Fiery|Mjolnir Shocking|Freyr Tempestuous|Niflheim Arctic/.test(suffix)&& /★★/i.test(suffixTDtext)))//前后缀都符合
		{temp3 = true;
		 highlightRow(rows[i]);
		 }
		if (checkSuffix(suffixTDtext,suffix.match(/\S+/))&&!temp3) { //匹配第二个与最后一个词组,用来判断前缀
			temp=true;

          highlightRow(rows[i]);
        } 
		else if (/^$|Others?|Prof. Suffix|^EDB Suffix|All/.test(suffixTDtext) || (!temp2 && !suffixTD.nextElementSibling.textContent.trim().length)) temp2 = rows[i];
    
	  if (!temp && temp2) highlightRow(temp2);

	if (checkPreffix(suffixTDtext,suffix)&&!temp3) {
          highlightRow(rows[i]);
        } 
      }
      i--;
    }
  }
};
/* * * * * * * * * * * * * * * * * * * * * * * */
try
{
	
if (window.location.host == 'hentaiverse.org') {
  if (/&ss=eq/.test(window.location.href)) Controller.saveData();
  Controller.popup = document.querySelector('#popup_box, #equipment');
  Controller.loaded = false;
  window.addEventListener('keyup',Controller.keyEvent,false);
  var level = document.evaluate('.//div[starts-with(text(),"Level")]',document,null,9,null).singleNodeValue;
  if (level) Controller.Level = parseInt(level.textContent.match(/(\d+)/)[1],10)
} else if (window.location.host == 'ehwiki.org') {
  window.addEventListener('load',Wiki.check,false);
}

}
catch (e)
{alert(e)
}