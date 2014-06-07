// ==UserScript==
// @name		  Hentaiverse Equipment Comparison
// @namespace	  HVEquipCompare
// @description	  Allows to compare pieces of equipment.
// @match		  http://hentaiverse.org/?s=Bazaar&ss=es*
// @match		  http://hentaiverse.org/?s=Character&ss=eq*
// @match		  http://hentaiverse.org/pages/showequip.php?eid=*&key=*
// @match		  http://hentaiverse.org/?s=Bazaar&ss=fr*
// @match		  http://hentaiverse.org/?s=Battle&ss=iw*
// @match		  http://hentaiverse.org/?s=Bazaar&ss=lt*
// @match		  http://hentaiverse.org/?s=Character&ss=in
// @match		  http://ehwiki.org/wiki/Equipment_Ranges?where=*
// @match	      http://ehwiki.org/wiki/Equipment_Ranges_*
// @version	      0.6.2.9
// @run-at		  document-end
// ==/UserScript==

// Added Lottery page (data for Leg+ may be inaccurate due to their rarity)
// Fixed Forge Upgrades and Enchantments pages; Fixed old (Main Hand)/(Off Hand) label; Added Specific Damage Mitigation

var Parser, Cruncher, Formatter, Controller, Wiki,

    useMultiplier = false; // true/false

/* * * * * * * * * * * * * * * * * * * * * * * */
Parser = {

    parse: function(source) {

        // decorator for _parseObject
        var result;
        if (source != null && source.constructor == String) {
            var tokens = source.match(/'.+?'/g), temp = document.createElement('div');
            temp.innerHTML = tokens[2].slice(1,tokens[2].length-1);
            result = Parser._parseObject(temp.firstElementChild);
            result.Info.Name = tokens[1].slice(1,tokens[1].length-1);
            return result;
        }

        if (document.getElementById('equipment')) {

            result = Parser._parseObject(document.querySelector('#equipment > div:first-child'));
            if (document.location.search.indexOf('s=Bazaar&ss=lt') >= 0) result.Info.Name = document.querySelector('#leftpane > div:nth-child(2)').textContent;
            else {
                var nameList, fullName = "";
                if (document.location.search.indexOf('s=Bazaar&ss=fr') >= 0) nameList = document.getElementById('leftpane').children[1].getElementsByClassName('fd4');
                else nameList = document.getElementsByClassName('fd4');
                if (nameList.length != 0) {
                    for (var i = 0; i < nameList.length; i++) fullName = fullName + " " + nameList[i].textContent;
                    result.Info.Name = fullName.replace(/^\s+|\s+$/g,"");
                }
                else result.Info.Name = document.querySelector('.fd4').textContent;
            }

            return result;
        }

        var popup = document.getElementById('popup_box');
        if (popup.childElementCount) {
            result = Parser._parseObject(document.querySelector('#popup_box > div + div > div'));
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
        var section = null, sectionContents = { }, child;
        for (var i = 0; i < n; i++) {
            if (i == 0) {
                child = source.childNodes[0];
                child.innerHTML = ' <strong>' + child.innerHTML + '</strong>'
            }
            else child = source.childNodes[i];
            // check for equipment procs & info
            if (child.firstElementChild.nodeName == 'STRONG') {
                var tokens;
                if (child.textContent.indexOf('Level') != -1) {
                    // type, level and EXP
                    tokens = child.textContent.match(/^(.+?)\s+Level (\d+)\s+(.+)$/);
                    res.Info.Type = tokens[1].trim();
                    res.Info.Level = parseInt(tokens[2],10);
                    res.Info.EXP = tokens[3];
                }

                else if (child.textContent.indexOf('turn') != -1) {
                    // proc type, chance, duration and damage
                    tokens = child.textContent.match(/^(.+): (\d+)%.+(\d+) turns?(?:.+?(\d+)% DOT)?/);
                    res.Proc = { Type: tokens[1], Chance: parseInt(tokens[2],10), Duration: parseInt(tokens[3],10) };
                    if (tokens[4]) res.Proc.Damage = parseInt(tokens[4],10);
                }

                else if (child.textContent.indexOf('points') != -1) {
                    // siphon type, chance and damage
                    tokens = child.textContent.match(/^Siphon (.+): (\d+)%.+ ([\d\.]+) points/);
                    res.Siphon = { Type: tokens[1], Chance: parseInt(tokens[2],10), Damage: parseFloat(tokens[3]) };
                }

                else if (child.textContent.indexOf('Damage') != -1) {
                    // weapon damage and damage type
                    tokens = child.textContent.match(/^\+(\d+) (.+) Damage/);
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

            for (var j = 0; j < targets.length; j++) {
                target = targets[j];
                if (target.firstElementChild && target.firstElementChild.nodeName == 'DIV') continue;
                if (target.textContent.length == 0) continue;
                if (target.textContent.trim()[0] == '%') continue;
                target = target.textContent.split('+');
                if (target.length > 1 && target[0].length > 0 && target[1].length > 0) {
                    attributeName = target[0].trim();
                    attributeValue = target[1].trim();
                    sectionContents[attributeName] = parseFloat(attributeValue);
                }
                else {
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
            'Attack Crit Chance': 2000, 'Attack Crit Damage': Infinity, 'Magic Crit Chance': 2000, 'Block Chance': 2000,
            'Evade Chance': 2000, 'Parry Chance': 2000, 'Resist Chance': 2000,  'Physical Mitigation': 2000, 'Magical Mitigation': 2000,
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
        var result = { }, x, y;

        for (x in a) {
            result[x] = { };
            for (y in a[x]) {
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

        for (x in b) {
            if (!result.hasOwnProperty(x)) result[x] = { };
            for (y in b[x]) {
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
                result[x][y] = (source[x][y] / (1 + Controller.Level / effectiveFactor));
            }
        }
        return result;
    },

    compareBaseData: function(result){
        var data = {
            "Attack Damage":{
                "Dagger":[21.23,23.01,23.9,25.66,25.66,35.75,38.38,40.13,43.59,43.59],
                "Scythe":[51.98,54.6,57.21,62.38,62.38,75.04,79.37,82.83,90.56,90.56],
                "Axe":[39.17,41.79,43.55,47.01,49.64,59.66,64,66.6,71.77,75.26],
                "Club":[34.9,36.67,38.42,41.88,43.66,53.69,57.17,59.77,64.94,67.57],
                "Rapier":[24.65,26.42,27.32,29.93,30.85,40.02,42.65,44.4,48.72,50.49],
                "Shortsword":[30.63,32.4,34.15,36.76,38.54,47.71,50.33,52.94,57.26,59.89],
                "Wakizashi":[21.23,23.01,23.9,25.66,26.58,35.75,38.38,40.13,43.59,45.37],
                "Estoc":[43.44,46.06,47.82,52.13,54.76,63.93,68.27,70.87,76.9,80.38],
                "Longsword":[51.98,54.6,57.21,62.38,65.01,75.04,79.37,82.83,90.56,94.05],
                "Mace":[43.44,46.06,47.82,52.13,54.76,64.79,69.12,71.73,77.75,81.22],
                "Katana":[43.44,46.06,47.82,52.13,54.76,64.79,69.12,71.73,77.75,81.22],
                "Katalox":[22.09,23.86,24.76,26.51,28.29],
                "Oak":[22.09,23.86,24.76,26.51,28.29],
                "Redwood":[22.09,23.86,24.76,26.51,28.29],
                "Willow":[22.09,23.86,24.76,26.51,28.29],
                "Shade Helmet":[6.72,7.63,7.68,8.58,8.65],
                "Shade Breastplate":[7.57,8.49,8.53,9.43,9.5],
                "Shade Gauntlets":[5.86,6.78,6.82,7.72,7.79],
                "Shade Leggings":[7.57,8.49,8.53,9.43,9.5],
                "Shade Boots":[5.86,6.78,6.82,7.72,7.79],
                "Power Helmet":[9.28,10.2,10.24,11.14,12.06,19.53,21.3,22.2,23.95,24.87],
                "Power Armor":[10.99,11.9,12.8,13.7,13.77,22.94,24.71,26.47,28.22,29.14],
                "Power Gauntlets":[8.42,9.34,9.39,10.29,11.21,17.82,19.59,20.49,22.24,23.16],
                "Power Leggings":[10.13,11.05,11.95,12.85,12.92,21.23,23.01,24.76,26.51,27.43],
                "Power Boots":[7.57,8.49,8.53,9.43,9.5,16.11,17.88,17.93,19.68,20.6]},
            "Attack Accuracy":{
                "Dagger":[19.95,21.21,22.45,24.3,24.33,8.76,41.23,43.69,47.37,47.37],
                "Scythe":[6.59,7.25,7.28,7.92,7.92,18.13,19.38,20.02,21.88,21.88],
                "Axe":[9.63,10.28,10.92,11.56,12.21],
                "Club":[10.24,10.89,11.53,12.77,12.82,24.19,26.06,27.3,29.77,30.42],
                "Rapier":[17.52,18.78,19.41,21.27,21.92,35.12,37.59,38.84,42.51,44.38],
                "Shortsword":[21.77,23.03,24.27,26.12,27.39,41.19,43.66,46.12,49.79,51.66],
                "Wakizashi":[19.95,21.21,22.45,24.3,24.96,38.15,40.63,42.48,46.15,48.02],
                "Estoc":[7.81,8.46,9.1,9.74,9.79,20.55,22.42,23.66,25.52,26.17],
                "Longsword":[9.63,10.28,10.92,11.56,12.21,22.98,24.85,26.09,27.94,29.21],
                "Mace":[9.63,10.28,10.92,11.56,12.21,23.59,25.45,26.7,28.55,29.81],
                "Katana":[21.77,23.03,24.27,26.12,27.39,41.79,44.27,46.73,50.4,52.27],
                "Cotton Cap":[3.56,4.21,4.24,4.28,4.93],
                "Cotton Robe":[4.17,4.82,4.85,5.49,5.54],
                "Cotton Gloves":[3.56,4.21,4.24,4.28,4.93],
                "Cotton Pants":[4.17,4.82,4.85,5.49,5.54],
                "Cotton Shoes":[2.95,3.6,3.64,3.67,3.72],
                "Phase Cap":[3.56,4.21,4.24,4.28,4.93],
                "Phase Robe":[4.17,4.82,4.85,5.49,5.54],
                "Phase Gloves":[3.56,4.21,4.24,4.28,4.93],
                "Phase Pants":[4.17,4.82,4.85,5.49,5.54],
                "Phase Shoes":[2.95,3.6,3.64,3.67,3.72],
                "Shade Helmet":[5.38,6.03,6.06,6.7,6.75],
                "Shade Breastplate":[6.59,7.25,7.28,7.92,8.57],
                "Shade Gauntlets":[4.77,5.43,5.46,6.1,6.14],
                "Shade Leggings":[5.99,6.64,6.67,7.31,7.97],
                "Shade Boots":[4.17,4.82,4.85,5.49,5.54],
                "Power Helmet":[4.77,5.43,5.46,6.1,6.14,16.3,17.56,18.2,20.06,20.71],
                "Power Armor":[5.38,6.03,6.06,6.7,6.75,19.34,21.21,21.84,23.7,24.35],
                "Power Gauntlets":[4.17,4.82,4.85,5.49,5.54,14.48,15.74,16.38,18.23,18.89],
                "Power Leggings":[5.38,6.03,6.06,6.7,6.75,18.13,19.99,20.63,22.48,23.14],
                "Power Boots":[4.17,4.82,4.85,5.49,5.54,13.27,14.53,15.17,16.41,17.07]},
            "Attack Crit Chance":{
                "Dagger":[4.29,4.51,4.72,5.15,5.15,8.07,8.5,8.92,9.779,9.779],
                "Scythe":[6.39,6.71,7.03,7.67,7.67,10.7,11.33,11.86,12.92,12.92],
                "Axe":[4.29,4.51,4.72,5.15,5.37],
                "Club":[4.29,4.51,4.72,5.15,5.37,8.18,8.6,9.03,9.87,10.3],
                "Rapier":[4.29,4.51,4.72,5.15,5.37,8.28,8.71,9.13,9.98,10.41],
                "Shortsword":[4.29,4.51,4.72,5.15,5.37,8.28,8.71,9.13,9.98,10.41],
                "Wakizashi":[4.29,4.51,4.72,5.15,5.37,8.18,8.6,9.03,9.87,10.3],
                "Estoc":[6.39,6.71,7.03,7.67,7.99,10.59,11.12,11.65,12.71,13.24],
                "Longsword":[6.39,6.71,7.03,7.67,7.99,10.8,11.44,11.97,13.02,13.56],
                "Mace":[6.39,6.71,7.03,7.67,7.99,10.8,11.44,11.97,13.02,13.56],
                "Katana":[6.39,6.71,7.03,7.67,7.99,10.8,11.44,11.97,13.02,13.56],
                "Shade Helmet":[2.19,2.3,2.41,2.63,2.74],
                "Shade Breastplate":[2.61,2.83,2.94,3.15,3.27],
                "Shade Gauntlets":[1.98,2.09,2.2,2.42,2.53],
                "Shade Leggings":[2.4,2.62,2.73,2.94,3.06],
                "Shade Boots":[1.77,1.88,1.99,2.21,2.22],
                "Power Helmet":[1.14,1.25,1.26,1.37,1.48,4.4,4.72,4.93,5.36,5.58],
                "Power Armor":[1.35,1.46,1.57,1.68,1.69,5.24,5.56,5.88,6.41,6.63],
                "Power Gauntlets":[1.04,1.15,1.15,1.26,1.38,3.98,4.3,4.41,4.83,5.05],
                "Power Leggings":[1.25,1.36,1.47,1.58,1.59,4.82,5.14,5.46,5.88,6.1],
                "Power Boots":[0.93,1.04,1.05,1.16,1.17,3.56,3.88,3.99,4.31,4.53]},
            "Attack Speed":{
                "Dagger":[7.63,8.15,8.65,9.16,9.16,9.16,11.96,12.96,13.46,14.45,14.45],
                "Shortsword":[5.23,5.26,5.29,5.31,5.35],
                "Wakizashi":[10.04,10.07,10.1,10.12,10.16,13.88,13.92,13.94,13.97,14.01],
                "Buckler":[1.86,1.9,1.92,1.95,1.98],
                "Kite":[2.34,2.38,2.4,2.43,2.47],
                "Force":[0.42,0.45,0.48,0.5,0.54],
                "Leather Helmet":[2.82,2.86,2.88,2.91,2.95],
                "Leather Breastplate":[3.3,3.34,3.36,3.39,3.43],
                "Leather Gauntlets":[2.82,2.86,2.88,2.91,2.95],
                "Leather Leggings":[3.3,3.34,3.36,3.39,3.43],
                "Leather Boots":[2.34,2.38,2.4,2.43,2.47],
                "Shade Helmet":[2.82,2.86,2.88,2.91,2.95],
                "Shade Breastplate":[3.3,3.34,3.36,3.39,3.43],
                "Shade Gauntlets":[2.82,2.86,2.88,2.91,2.95],
                "Shade Leggings":[3.3,3.34,3.36,3.39,3.43],
                "Shade Boots":[2.34,2.38,2.4,2.43,2.47]},
            "Casting Speed":{
                "Cotton Cap":[0.42,0.46,0.48,0.51,0.55],
                "Cotton Robe":[0.42,0.46,0.48,0.51,0.55],
                "Cotton Gloves":[0.42,0.46,0.48,0.51,0.55],
                "Cotton Pants":[0.42,0.46,0.48,0.51,0.55],
                "Cotton Shoes":[0.42,0.46,0.48,0.51,0.55],
                "Phase Cap":[1.4,1.44,1.46,1.49,1.53],
                "Phase Robe":[1.4,1.44,1.46,1.49,1.53],
                "Phase Gloves":[1.4,1.44,1.46,1.49,1.53],
                "Phase Pants":[1.4,1.44,1.46,1.49,1.53],
                "Phase Shoes":[1.4,1.44,1.46,1.49,1.53]},
            "Magic Damage":{
                "Katalox":[25.61,27.33,28.2,30.74,32.46,41.37,43.92,45.62,49.82,52.37],
                "Oak":[23.95,25.67,26.54,29.08,29.97],
                "Redwood":[23.95,25.67,26.54,29.08,29.97,38.88,41.43,43.14,47.33,49.06],
                "Willow":[23.95,25.67,26.54,29.08,29.97,38.88,41.43,43.14,47.33,49.06],
                "Cotton Cap":[0.72,0.78,0.82,0.87,0.93],
                "Cotton Robe":[0.72,0.78,0.82,0.87,0.93],
                "Cotton Gloves":[0.72,0.78,0.82,0.87,0.93],
                "Cotton Pants":[0.72,0.78,0.82,0.87,0.93],
                "Cotton Shoes":[0.72,0.78,0.82,0.87,0.93],
                "Phase Cap":[3.21,3.27,3.31,3.36,3.42],
                "Phase Robe":[4.04,4.1,4.14,4.19,4.25],
                "Phase Gloves":[3.21,3.27,3.31,3.36,3.42],
                "Phase Pants":[3.21,3.27,3.31,3.36,3.42],
                "Phase Shoes":[2.38,2.44,2.48,2.53,2.59]},
            "Magic Accuracy":{
                "Dagger":[4.84,5.37,5.4,5.91,5.91],
                "Gossamer Cap":[3.37,3.9,3.92,4.44,4.44],
                "Gossamer Robe":[3.86,4.39,4.41,4.93,4.93],
                "Gossamer Gloves":[2.88,3.41,3.43,3.46,3.46],
                "Gossamer Pants":[3.86,4.39,4.41,4.93,4.93],
                "Gossamer Shoes":[2.88,3.41,3.43,3.46,3.46],
                "Club":[4.84,5.37,5.4,5.91,6.44],
                "Rapier":[4.84,5.37,5.4,5.91,6.44],
                "Shortsword":[4.84,5.37,5.4,5.91,6.44],
                "Wakizashi":[4.84,5.37,5.4,5.91,6.44],
                "Estoc":[7.79,8.32,8.83,9.35,9.88],
                "Longsword":[7.79,8.32,8.83,9.35,9.88],
                "Mace":[7.79,8.32,8.83,9.35,9.88],
                "Katalox":[15.15,16.17,16.69,18.19,19.21,29.39,31.39,32.4,35.37,37.38],
                "Oak":[14.17,15.19,15.71,17.21,17.74,28.41,30.41,31.42,34.39,35.9],
                "Redwood":[14.17,15.19,15.71,17.21,17.74,27.92,29.92,30.93,33.9,34.92],
                "Willow":[14.17,15.19,15.71,17.21,17.74,27.92,29.92,30.93,33.9,34.92],
                "Buckler":[7.79,8.32,8.83,9.35,9.88],
                "Cotton Cap":[3.37,3.9,3.92,4.44,4.48],
                "Cotton Robe":[3.86,4.39,4.41,4.93,4.97],
                "Cotton Gloves":[2.88,3.41,3.43,3.46,3.99],
                "Cotton Pants":[3.86,4.39,4.41,4.93,4.97],
                "Cotton Shoes":[2.88,3.41,3.43,3.46,3.99],
                "Phase Cap":[4.35,4.88,4.91,5.42,5.46],
                "Phase Robe":[5.33,5.86,5.89,6.41,6.94],
                "Phase Gloves":[3.86,4.39,4.41,4.93,4.97],
                "Phase Pants":[4.84,5.37,5.4,5.91,6.44],
                "Phase Shoes":[3.37,3.9,3.92,4.44,4.48],
                "Shade Helmet":[5.33,5.86,5.89,6.41,6.94],
                "Shade Breastplate":[6.32,6.84,7.36,7.88,7.92],
                "Shade Gauntlets":[4.84,5.37,5.4,5.91,6.44],
                "Shade Leggings":[5.83,6.35,6.87,7.39,7.43],
                "Shade Boots":[4.35,4.88,4.91,5.42,5.46]},
            "Magic Crit Chance":{
                "Katalox":[5.8,6.15,6.38,6.96,7.31,9.56,10.14,10.6,11.52,12.1],
                "Oak":[4.66,4.9,5.13,5.59,5.83,8.42,8.89,9.35,10.15,10.62],
                "Redwood":[4.66,4.9,5.13,5.59,5.83,8.42,8.89,9.35,10.15,10.62],
                "Willow":[4.66,4.9,5.13,5.59,5.83,8.31,8.77,9.23,10.04,10.39]},
            "Physical Mitigation":{
                "Tower":[2.7,2.93,3.15,3.37,3.37,4.17,4.61,4.83,5.26,5.26],
                "Gossamer Cap":[2.7,2.93,3.15,3.37,3.37],
                "Gossamer Robe":[3.12,3.35,3.57,3.79,3.79],
                "Gossamer Gloves":[2.49,2.72,2.94,3.16,3.16],
                "Gossamer Pants":[2.91,3.14,3.36,3.58,3.58],
                "Gossamer Shoes":[2.28,2.51,2.52,2.74,2.74],
                "Buckler":[1.86,2.09,2.1,2.32,2.34,3.33,3.77,3.78,4.21,4.23],
                "Kite":[2.7,2.93,3.15,3.37,3.39,4.17,4.61,4.83,5.26,5.28],
                "Force":[2.7,2.93,3.15,3.37,3.39,3.96,4.4,4.62,5.05,5.07],
                "Cotton Cap":[3.54,3.77,3.99,4.42,4.44,5.43,5.87,6.09,6.73,6.96],
                "Cotton Robe":[4.17,4.4,4.62,5.05,5.28,6.48,6.92,7.35,7.99,8.22],
                "Cotton Gloves":[3.12,3.35,3.57,3.79,4.02,4.8,5.24,5.46,5.89,6.12],
                "Cotton Pants":[3.96,4.19,4.41,4.84,5.07,6.06,6.5,6.72,7.36,7.8],
                "Cotton Shoes":[2.91,3.14,3.36,3.58,3.81,4.38,4.82,5.04,5.47,5.7],
                "Phase Cap":[2.7,2.93,3.15,3.37,3.39],
                "Phase Robe":[3.12,3.35,3.57,3.79,4.02],
                "Phase Gloves":[2.49,2.72,2.94,3.16,3.18],
                "Phase Pants":[2.91,3.14,3.36,3.58,3.81],
                "Phase Shoes":[2.28,2.51,2.52,2.74,2.97],
                "Leather Helmet":[6.48,6.92,7.14,7.78,8.22,9,9.65,10.08,10.93,11.37],
                "Leather Breastplate":[7.74,8.18,8.61,9.46,9.69,10.68,11.33,11.97,13.03,13.47],
                "Leather Gauntlets":[5.85,6.29,6.51,7.15,7.38,8.16,8.81,9.24,10.09,10.32],
                "Leather Leggings":[7.11,7.55,7.98,8.62,9.06,9.84,10.49,11.13,11.98,12.63],
                "Leather Boots":[5.22,5.66,5.88,6.31,6.54,7.32,7.97,8.19,8.83,9.27],
                "Shade Helmet":[5.43,5.87,6.09,6.52,6.96],
                "Shade Breastplate":[6.48,6.92,7.14,7.78,8.22],
                "Shade Gauntlets":[5.01,5.45,5.67,6.1,6.33],
                "Shade Leggings":[6.06,6.5,6.72,7.36,7.59],
                "Shade Boots":[4.38,4.61,4.83,5.26,5.49],
                "Plate Helmet":[8.58,9.02,9.45,10.3,10.74,11.52,12.17,12.81,13.87,14.52],
                "Plate Cuirass":[10.26,10.91,11.34,12.4,12.84,13.83,14.69,15.33,16.81,17.46],
                "Plate Gauntlets":[7.74,8.18,8.61,9.46,9.69,10.47,11.12,11.76,12.82,13.26],
                "Plate Greaves":[9.42,10.07,10.5,11.35,11.79,12.57,13.43,14.07,15.13,15.78],
                "Plate Sabatons":[6.9,7.34,7.77,8.41,8.64,9.21,9.86,10.5,11.35,11.58],
                "Power Helmet":[6.69,7.13,7.56,8.2,8.43,9,9.65,10.29,11.14,11.37],
                "Power Armor":[7.95,8.39,8.82,9.67,10.11,10.68,11.33,11.97,13.03,13.68],
                "Power Gauntlets":[6.06,6.5,6.72,7.36,7.59,8.16,8.81,9.03,9.88,10.32],
                "Power Leggings":[7.32,7.76,8.19,8.83,9.27,9.84,10.49,11.13,11.98,12.42],
                "Power Boots":[5.43,5.87,6.09,6.52,6.96,7.32,7.97,8.19,8.83,9.48]},
            "Magical Mitigation":{
                "Tower":[2.59,2.8,3.01,3.23,3.23,3.23,3.59,4.01,4.22,4.43,4.43],
                "Gossamer Cap":[3.39,3.61,3.82,4.23,4.23],
                "Gossamer Robe":[3.99,4.21,4.42,4.83,4.83],
                "Gossamer Gloves":[2.99,3.2,3.41,3.63,3.63],
                "Gossamer Pants":[3.79,4.01,4.22,4.63,4.63],
                "Gossamer Shoes":[2.79,3,3.21,3.43,3.43],
                "Buckler":[1.78,2,2.01,2.22,2.24,5.2,5.62,5.83,6.44,6.66],
                "Kite":[2.59,2.8,3.01,3.23,3.24,6,6.42,6.83,7.45,7.66],
                "Force":[2.59,2.8,3.01,3.23,3.24,6,6.42,6.83,7.45,7.66],
                "Cotton Cap":[3.39,3.61,3.82,4.23,4.25,7.21,7.63,8.04,8.85,9.07],
                "Cotton Robe":[3.99,4.21,4.42,4.83,5.05,8.62,9.23,9.65,10.46,10.88],
                "Cotton Gloves":[2.99,3.2,3.41,3.63,3.84,6.4,6.82,7.23,7.85,8.27],
                "Cotton Pants":[3.79,4.01,4.22,4.63,4.85,8.01,8.63,9.04,9.86,10.28],
                "Cotton Shoes":[2.79,3,3.21,3.43,3.64,5.8,6.22,6.63,7.04,7.46],
                "Phase Cap":[3.39,3.61,3.82,4.23,4.25],
                "Phase Robe":[3.99,4.21,4.42,4.83,5.05],
                "Phase Gloves":[2.99,3.2,3.41,3.63,3.84],
                "Phase Pants":[3.79,4.01,4.22,4.63,4.85],
                "Phase Shoes":[2.79,3,3.21,3.43,3.64],
                "Leather Helmet":[5.2,5.62,5.83,6.24,6.66,9.42,10.24,10.65,11.47,12.09],
                "Leather Breastplate":[6.2,6.62,6.83,7.45,7.86,11.23,12.05,12.46,13.48,14.3],
                "Leather Gauntlets":[4.8,5.21,5.42,5.84,6.06,8.62,9.23,9.65,10.46,10.88],
                "Leather Leggings":[5.8,6.22,6.43,7.04,7.26,10.42,11.24,11.66,12.67,13.09],
                "Leather Boots":[4.19,4.41,4.62,5.03,5.25,7.61,8.03,8.44,9.26,9.67],
                "Shade Helmet":[4.19,4.41,4.62,5.03,5.25],
                "Shade Breastplate":[5,5.41,5.63,6.04,6.26],
                "Shade Gauntlets":[3.79,4.01,4.22,4.63,4.85],
                "Shade Leggings":[4.6,5.01,5.22,5.64,5.85],
                "Shade Boots":[3.39,3.61,3.82,4.23,4.25],
                "Plate Helmet":[6.2,6.62,6.83,7.45,7.86,10.42,11.24,11.66,12.67,13.29],
                "Plate Cuirass":[7.41,7.83,8.24,9.05,9.27,12.43,13.25,13.87,15.08,15.7],
                "Plate Gauntlets":[5.6,6.02,6.23,6.84,7.06,9.42,10.04,10.45,11.47,11.88],
                "Plate Greaves":[6.81,7.22,7.64,8.25,8.67,11.43,12.25,12.86,13.88,14.5],
                "Plate Sabatons":[5,5.41,5.63,6.04,6.26,8.41,9.03,9.44,10.26,10.68],
                "Power Helmet":[5.2,5.62,5.83,6.24,6.66,9.42,10.24,10.65,11.47,12.09],
                "Power Armor":[6.2,6.62,6.83,7.45,7.86,11.23,12.05,12.46,13.48,14.3],
                "Power Gauntlets":[4.8,5.21,5.42,5.84,6.06,8.62,9.23,9.65,10.46,10.88],
                "Power Leggings":[5.8,6.22,6.43,7.04,7.26,10.42,11.24,11.66,12.67,13.09],
                "Power Boots":[4.19,4.41,4.62,5.03,5.25,7.61,8.03,8.44,9.26,9.67]},
            "Damage Mitigations":{
                "Tower":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1.06,1.23,1.24,1.4,1.4,2.12,2.28,2.44,2.61,2.61,1.78,1.94,2.1,2.26,2.26],
                "Gossamer Cap":[16.87,17.94,18.99,21.05,21.05],
                "Gossamer Robe":[19.87,20.94,21.99,24.05,24.05],//data on wika are corrupted (taken from head)
                "Gossamer Gloves":[14.87,15.94,16.99,18.05,18.05],
                "Gossamer Pants":[18.87,19.94,20.99,23.05,23.05],
                "Gossamer Shoes":[13.87,14.94,15.99,17.05,17.05],
                "Buckler":[0,0,0,0,0,1.22,1.38,1.39,1.56,1.57,1.2,1.37,1.37,1.54,1.55,1.18,1.34,1.35,1.51,1.52,2.15,2.31,2.32,2.49,2.5,3.04,3.2,3.21,3.37,3.38,2.98,3.14,3.15,3.3,3.32],
                "Kite":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5.56,5.88,6.19,6.67,6.99,5.48,5.8,6.11,6.58,6.9,5.38,5.69,5.99,6.45,6.76],
                "Force":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5.56,5.88,6.19,6.67,6.99,5.48,5.8,6.11,6.58,6.9,5.38,5.69,5.99,6.45,6.76],
                "Cotton Cap":[20.87,20.94,20.99,21.05,21.13],
                "Cotton Robe":[24.87,24.94,24.99,25.05,25.13],
                "Cotton Gloves":[18.87,18.94,18.99,19.05,19.13],
                "Cotton Pants":[22.87,22.94,22.99,23.05,23.13],
                "Cotton Shoes":[16.87,16.94,16.99,17.05,17.13],
                "Phase Cap":[20.87,20.94,20.99,21.05,21.13],
                "Phase Robe":[24.87,24.94,24.99,25.05,25.13],
                "Phase Gloves":[18.87,18.94,18.99,19.05,19.13],
                "Phase Pants":[22.87,22.94,22.99,23.05,23.13],
                "Phase Shoes":[16.87,16.94,16.99,17.05,17.13],
                "Leather Helmet":[20.87,20.94,20.99,21.05,21.13,6.33,6.65,6.97,7.6,7.92,6.25,6.57,6.88,7.5,7.82,3.13,3.29,3.45,3.75,3.92,11.6,12.23,12.86,13.95,14.58,11.6,12.22,12.84,13.92,14.54,8.37,8.84,9.29,10.05,10.51,7.26,7.58,7.9,8.53,8.85,8.08,8.4,8.71,9.33,9.65,4.93,5.09,5.25,5.55,5.71,12.53,13.16,13.78,14.88,15.51,13.43,14.06,14.68,15.76,16.38,10.17,10.63,11.09,11.85,12.31],
                "Leather Breastplate":[24.87,24.94,24.99,25.05,25.13,7.57,8.05,8.36,9.15,9.47,7.47,7.94,8.26,9.03,9.35,3.73,4.04,4.2,4.5,4.67,13.92,14.86,15.49,16.89,17.52,13.89,14.82,15.44,16.83,17.45,10.02,10.78,11.24,12.15,12.61,8.65,9.13,9.45,10.23,10.55,9.61,10.08,10.4,11.17,11.49,5.83,6.14,6.29,6.6,6.76,15,15.95,16.57,17.98,18.61,16.03,16.96,17.58,18.97,19.59,12.12,12.88,13.34,14.25,14.71],
                "Leather Gauntlets":[18.87,18.94,18.99,19.05,19.13,5.71,6.03,6.35,6.98,7.14,5.64,5.95,6.27,6.89,7.05,2.83,2.99,3.15,3.45,3.62,10.51,11.14,11.77,12.86,13.19,10.53,11.15,11.77,12.85,13.17,7.62,8.09,8.54,9.3,9.61,6.48,6.81,7.12,7.75,7.92,7.32,7.64,7.95,8.57,8.73,4.48,4.64,4.8,5.1,5.27,11.29,11.92,12.55,13.64,13.96,12.21,12.83,13.45,14.53,14.85,9.27,9.73,10.19,10.95,11.26],
                "Leather Leggings":[22.87,22.94,22.99,23.05,23.13,6.95,7.43,7.74,8.37,8.69,6.86,7.33,7.64,8.26,8.58,3.43,3.74,3.9,4.2,4.37,12.68,13.47,14.09,15.34,15.97,12.82,13.6,14.22,15.45,16.07,9.27,9.88,10.34,11.25,11.71,8.03,8.51,8.83,9.46,9.78,8.85,9.32,9.63,10.25,10.57,5.38,5.69,5.84,6.15,6.31,13.77,14.55,15.18,16.43,17.06,14.81,15.59,16.21,17.44,18.06,11.22,11.83,12.29,13.2,13.66],
                "Leather Boots":[16.87,16.94,16.99,17.05,17.13,5.09,5.41,5.73,6.2,6.37,5.03,5.34,5.66,6.12,6.29,2.53,2.69,2.85,3.15,3.17,9.27,9.9,10.38,11.31,11.64,9.31,9.93,10.4,11.32,11.64,6.73,7.19,7.49,8.25,8.41,5.87,6.19,6.5,6.98,7.14,6.55,6.87,7.18,7.65,7.82,4.03,4.19,4.35,4.65,4.67,10.05,10.68,11.15,12.09,12.41,10.84,11.46,11.92,12.85,13.17,8.22,8.69,8.99,9.75,9.91],
                "Shade Helmet":[20.87,20.94,20.99,21.05,21.13,4.78,5.1,5.27,5.74,6.06,4.72,5.04,5.2,5.66,5.98],
                "Shade Breastplate":[24.87,24.94,24.99,25.05,25.13,5.71,6.03,6.35,6.98,7.14,5.64,5.95,6.27,6.89,7.05],
                "Shade Gauntlets":[18.87,18.94,18.99,19.05,19.13,4.32,4.64,4.8,5.27,5.44,4.26,4.58,4.74,5.21,5.37],
                "Shade Leggings":[22.87,22.94,22.99,23.05,23.13,5.25,5.57,5.88,6.36,6.68,5.18,5.5,5.81,6.28,6.59],
                "Shade Boots":[16.87,16.94,16.99,17.05,17.13,3.85,4.17,4.34,4.65,4.82,3.8,4.12,4.28,4.59,4.76],
                "Plate Helmet":[20.87,20.94,20.99,21.05,21.13,4.78,5.1,5.27,5.74,6.06,7.78,8.25,8.56,9.33,9.8,7.62,8.09,8.39,9.15,9.61,10.2,10.83,11.31,12.24,12.88,13.13,13.9,14.52,15.76,16.53,12.87,13.63,14.24,15.45,16.21],
                "Plate Cuirass":[24.87,24.94,24.99,25.05,25.13,5.71,6.03,6.35,6.98,7.14,9.31,9.78,10.24,11.17,11.64,9.12,9.58,10.04,10.95,11.41,12.22,13,13.63,14.88,15.35,15.73,16.66,17.43,18.97,19.74,15.42,16.33,17.09,18.59,19.36],
                "Plate Gauntlets":[18.87,18.94,18.99,19.05,19.13,4.32,4.64,4.8,5.27,5.44,7.01,7.48,7.8,8.42,8.89,6.88,7.34,7.64,8.25,8.71,9.27,9.9,10.38,11.31,11.64,11.91,12.68,13.3,14.38,15,11.67,12.43,13.04,14.1,14.71],
                "Plate Greaves":[22.87,22.94,22.99,23.05,23.13,5.25,5.57,5.88,6.36,6.68,8.54,9.01,9.48,10.25,10.72,8.37,8.84,9.29,10.05,10.51,11.29,11.92,12.55,13.64,14.27,14.5,15.28,16.05,17.44,18.21,14.22,14.98,15.74,17.1,17.86],
                "Plate Sabatons":[16.87,16.94,16.99,17.05,17.13,3.85,4.17,4.34,4.65,4.82,6.25,6.57,6.88,7.5,7.82,6.13,6.44,6.74,7.35,7.66,8.19,8.82,9.14,9.92,10.24,10.53,11.15,11.62,12.7,13.17,10.32,10.93,11.39,12.45,12.91],
                "Power Helmet":[20.87,20.94,20.99,21.05,21.13,4.01,4.33,4.49,4.81,5.13,6.25,6.57,6.88,7.5,7.82,6.13,6.44,6.74,7.35,7.66],
                "Power Armor":[24.87,24.94,24.99,25.05,25.13,4.78,5.1,5.27,5.74,6.06,7.47,7.94,8.26,9.03,9.35,7.32,7.79,8.09,8.85,9.16],
                "Power Gauntlets":[18.87,18.94,18.99,19.05,19.13,3.7,4.02,4.18,4.5,4.67,5.64,5.95,6.27,6.89,7.05,5.53,5.84,6.14,6.75,6.91],
                "Power Leggings":[22.87,22.94,22.99,23.05,23.13,4.47,4.79,4.96,5.43,5.6,6.86,7.33,7.64,8.26,8.58,6.73,7.19,7.49,8.1,8.41],
                "Power Boots":[16.87,16.94,16.99,17.05,17.13,3.23,3.4,3.56,3.88,4.05,5.03,5.34,5.66,6.12,6.29,4.93,5.24,5.54,6,6.16]},
            "Evade Chance":{
                "Gossamer Cap":[3.22,3.49,3.75,4.01,4.01],
                "Gossamer Robe":[3.72,3.99,4.25,4.51,4.51],
                "Gossamer Gloves":[2.97,3.24,3.5,3.76,3.76],
                "Gossamer Pants":[3.47,3.74,4,4.26,4.26],
                "Gossamer Shoes":[2.72,2.99,3,3.26,3.26],
                "Cotton Cap":[3.22,3.49,3.75,4.01,4.03],
                "Cotton Robe":[3.72,3.99,4.25,4.51,4.78],
                "Cotton Gloves":[2.97,3.24,3.5,3.76,3.78],
                "Cotton Pants":[3.47,3.74,4,4.26,4.53],
                "Cotton Shoes":[2.72,2.99,3,3.26,3.53],
                "Phase Cap":[4.22,4.49,4.75,5.26,5.28],
                "Phase Robe":[4.97,5.24,5.5,6.01,6.28],
                "Phase Gloves":[3.72,3.99,4.25,4.51,4.78],
                "Phase Pants":[4.72,4.99,5.25,5.76,6.03],
                "Phase Shoes":[3.47,3.74,4,4.26,4.53],
                "Leather Helmet":[1.97,2.24,2.25,2.51,2.53],
                "Leather Breastplate":[2.22,2.49,2.5,2.76,2.78],
                "Leather Gauntlets":[1.72,1.99,2,2.26,2.28],
                "Leather Leggings":[2.22,2.49,2.5,2.76,2.78],
                "Leather Boots":[1.72,1.99,2,2.26,2.28],
                "Shade Helmet":[3.47,3.74,4,4.26,4.53,5.22,5.74,6,6.51,6.78],
                "Shade Breastplate":[4.22,4.49,4.75,5.26,5.28,6.22,6.74,7,7.76,7.78],
                "Shade Gauntlets":[3.22,3.49,3.75,4.01,4.03,4.72,5.24,5.5,6.01,6.03],
                "Shade Leggings":[3.72,3.99,4.25,4.51,4.78,5.72,6.24,6.5,7.01,7.28],
                "Shade Boots":[2.72,2.99,3,3.26,3.53,4.22,4.74,4.75,5.26,5.53]},
            "Resist Chance":{
                "Cotton Cap":[4.72,5.58,5.62,5.66,6.53],
                "Cotton Robe":[5.52,6.38,6.42,7.27,7.34],
                "Cotton Gloves":[4.72,5.58,5.62,5.66,6.53],
                "Cotton Pants":[5.52,6.38,6.42,7.27,7.34],
                "Cotton Shoes":[3.91,4.78,4.82,4.86,4.92],
                "Phase Cap":[4.72,5.58,5.62,5.66,6.53],
                "Phase Robe":[5.52,6.38,6.42,7.27,7.34],
                "Phase Gloves":[4.72,5.58,5.62,5.66,6.53],
                "Phase Pants":[5.52,6.38,6.42,7.27,7.34],
                "Phase Shoes":[3.91,4.78,4.82,4.86,4.92],
                "Leather Helmet":[7.93,8.8,8.84,9.68,10.55],
                "Leather Breastplate":[9.54,10.4,11.25,12.1,12.16],
                "Leather Gauntlets":[7.13,7.99,8.03,8.88,8.94],
                "Leather Leggings":[8.74,9.6,9.64,10.49,11.36],
                "Leather Boots":[6.32,7.19,7.23,8.08,8.14],
                "Shade Helmet":[11.15,12.01,12.86,13.7,14.57,16.78,18.44,19.29,20.94,21.81],
                "Shade Breastplate":[13.56,14.42,15.27,16.92,16.98,19.99,21.66,22.5,24.96,25.02],
                "Shade Gauntlets":[10.34,11.21,12.05,12.9,12.96,15.17,16.84,17.68,19.33,19.4],
                "Shade Leggings":[11.95,12.82,13.66,14.51,15.38,18.38,20.05,20.9,22.55,23.42],
                "Shade Boots":[8.74,9.6,9.64,10.49,11.36,13.56,15.23,15.27,16.92,17.79]},
            "Parry Chance":{
                "Dagger":[16.87,17.83,18.77,20.6,20.6,22.23,24.08,25.02,27.75,27.75],
                "Club":[7.03,7.99,8.04,8.98,9.05],
                "Rapier":[15.08,16.04,16.98,18.81,18.89,21.34,23.19,24.13,26.86,26.93],
                "Shortsword":[14.18,15.14,16.08,17.03,17.99],
                "Wakizashi":[16.87,17.83,18.77,20.6,21.57,23.12,24.98,25.92,28.65,29.61],
                "Buckler":[7.03,7.99,8.04,8.98,9.05]},
            "Block Chance":{
                "Tower":[27.81,29.88,30.93,33.98,33.98,31.8,34.87,35.92,38.97,38.97],
                "Buckler":[20.82,21.9,22.94,24.99,26.07,25.81,27.88,28.93,30.98,33.06],
                "Kite":[25.81,27.88,28.93,30.98,33.06,28.81,31.88,32.92,34.97,34.97],
                "Force":[30.8,32.87,33.92,36.97,39.05],
                "Plate Helmet":[4.86,4.93,4.98,5.03,5.11],
                "Plate Cuirass":[5.85,5.93,5.98,6.03,6.11],
                "Plate Gauntlets":[4.86,4.93,4.98,5.03,5.11],
                "Plate Greaves":[4.86,4.93,4.98,5.03,5.11],
                "Plate Sabatons":[3.86,3.93,3.98,4.04,4.12],
                "Power Helmet":[4.86,4.93,4.98,5.03,5.11],
                "Power Armor":[5.85,5.93,5.98,6.03,6.11],
                "Power Gauntlets":[4.86,4.93,4.98,5.03,5.11],
                "Power Leggings":[4.86,4.93,4.98,5.03,5.11],
                "Power Boots":[3.86,3.93,3.98,4.04,4.12]},
            "Burden":{
                "Dagger":[2.8,5.6],
                "Scythe":[21,35],
                "Tower":[13.3,20.3,10.5,16.1],
                "Axe":[14,17.5],
                "Club":[9.8,15.4],
                "Rapier":[6.3,12.6],
                "Shortsword":[5.6,10.5],
                "Wakizashi":[2.8,5.6],
                "Estoc":[14,27.3],
                "Longsword":[21,35],
                "Mace":[14,28],
                "Katana":[14,28],
                "Katalox":[7,13.3],
                "Oak":[4.9,10.5],
                "Redwood":[4.9,10.5],
                "Willow":[4.9,10.5],
                "Buckler":[2.8,5.6,2.1,4.2],
                "Kite":[10.5,17.5,7.88,13.13],
                "Force":[2.8,7,2.1,5.25],
                "Leather Helmet":[3.5,7],
                "Leather Breastplate":[4.2,8.4],
                "Leather Gauntlets":[3.5,6.3],
                "Leather Leggings":[4.2,7.7],
                "Leather Boots":[2.8,5.6],
                "Plate Helmet":[14,21,10.5,15.4],
                "Plate Cuirass":[16.8,25.2,12.6,18.2],
                "Plate Gauntlets":[12.6,18.9,9.1,14],
                "Plate Greaves":[15.4,23.1,11.2,16.8],
                "Plate Sabatons":[11.2,16.8,8.4,12.6],
                "Power Helmet":[10.5,17.5,7.7,13.3],
                "Power Armor":[12.6,21,9.1,16.1],
                "Power Gauntlets":[9.8,16.1,7,12.6],
                "Power Leggings":[11.9,19.6,9.1,14.7],
                "Power Boots":[8.4,14,6.3,10.5]},
            "Interference":{
                "Dagger":[3.5,8.4],
                "Scythe":[7,20.3],
                "Tower":[14,19.6],
                "Axe":[3.5,10.5],
                "Club":[3.5,10.5],
                "Rapier":[3.5,9.8],
                "Shortsword":[3.5,10.5],
                "Wakizashi":[3.5,7.7],
                "Estoc":[7,13.3],
                "Longsword":[10.5,21],
                "Mace":[7,14],
                "Katana":[7,14],
                "Buckler":[1.4,4.9],
                "Kite":[10.5,17.5],
                "Force":[28,42],
                "Leather Helmet":[7,12.6],
                "Leather Breastplate":[8.4,15.4],
                "Leather Gauntlets":[6.3,11.2],
                "Leather Leggings":[7.7,14],
                "Leather Boots":[5.6,9.8],
                "Shade Helmet":[8.4,14,2.1,3.5],
                "Shade Breastplate":[9.8,16.8,2.1,4.2],
                "Shade Gauntlets":[7.7,12.6,2.1,3.5],
                "Shade Leggings":[9.1,15.4,2.1,3.5],
                "Shade Boots":[7,11.2,2.1,2.8],
                "Plate Helmet":[14,21],
                "Plate Cuirass":[16.8,25.2],
                "Plate Gauntlets":[12.6,18.9],
                "Plate Greaves":[15.4,23.1],
                "Plate Sabatons":[11.2,16.8],
                "Power Helmet":[17.5,23.8],
                "Power Armor":[21,28.7],
                "Power Gauntlets":[16.1,21.7],
                "Power Leggings":[19.6,25.9],
                "Power Boots":[14,18.9]},
            "Spell Damage":{
                "Dagger":[8.74,9.6,9.64,10.49,10.49],
                "Scythe":[8.74,9.6,9.64,10.49,10.49],
                "Axe":[8.74,8.8,8.84,8.88,8.94],
                "Club":[8.74,8.8,8.84,8.88,8.94],
                "Rapier":[8.74,8.8,8.84,8.88,8.94],
                "Shortsword":[8.74,8.8,8.84,8.88,8.94],
                "Wakizashi":[8.74,8.8,8.84,8.88,8.94],
                "Estoc":[8.74,8.8,8.84,8.88,8.94],
                "Longsword":[8.74,8.8,8.84,8.88,8.94],
                "Mace":[8.74,8.8,8.84,8.88,8.94],
                "Katana":[8.74,8.8,8.84,8.88,8.94],
                "Katalox":[8.74,9.6,9.64,10.49,11.36,16.78,17.64,17.68,18.53,19.4,8.74,8.8,8.84,8.88,8.94,28.84,30.5,31.35,33,34.67,20.8,22.46,23.31,24.96,26.63],
                "Oak":[12.76,13.62,14.46,15.31,16.18,20.8,21.66,22.5,23.35,24.22,8.74,8.8,8.84,8.88,8.94,32.86,34.52,36.17,37.82,39.5,24.82,26.48,28.13,29.78,31.46,14.36,15.23,15.27,16.12,16.18,6.32,7.19,7.23,8.08,8.14],
                "Redwood":[8.74,9.6,9.64,10.49,11.36,16.78,17.64,17.68,18.53,19.4,8.74,8.8,8.84,8.88,8.94,28.84,30.5,31.35,33,34.67,20.8,22.46,23.31,24.96,26.63],
                "Willow":[12.76,13.62,14.46,15.31,15.31,20.8,22.46,23.31,24.96,24.96,8.74,9.6,9.64,10.49,10.49,15.17,16.84,16.88,18.53,18.53,7.13,7.99,8.03,8.88,8.88],
                "Phase Cap":[12.76,13.62,14.46,15.31,16.18],
                "Phase Robe":[15.17,16.03,16.88,18.53,19.4],
                "Phase Gloves":[11.95,12.82,13.66,14.51,15.38],
                "Phase Pants":[14.36,15.23,16.07,17.72,18.59],
                "Phase Shoes":[10.34,11.21,12.05,12.9,12.96]},
            "Proficiency":{
                "Gossamer Cap":[6.38,6.71,7.03,7.66,7.66],
                "Gossamer Robe":[7.61,8.24,8.56,9.19,9.19],
                "Gossamer Gloves":[5.77,6.1,6.42,7.05,7.05],
                "Gossamer Pants":[7,7.63,7.95,8.58,8.58],
                "Gossamer Shoes":[5.16,5.49,5.81,6.44,6.44],
                "Katalox":[6.38,6.71,7.03,7.66,7.99,12.5,13.14,13.77,15.01,15.64,4.85,5.18,5.5,5.83,6.16],
                "Oak":[9.44,10.08,10.4,11.34,11.97,15.56,16.51,17.13,18.68,19.62,4.85,5.18,5.5,5.83,6.16],
                "Redwood":[6.38,6.71,7.03,7.66,7.99,12.2,12.83,13.46,14.7,15.34,3.32,3.65,3.67,3.99,4.32],
                "Willow":[9.44,10.08,10.4,11.34,11.97,15.56,16.51,17.13,18.68,19.62,4.85,5.18,5.5,5.83,6.16],
                "Cotton Cap":[6.38,6.71,7.03,7.66,7.99],
                "Cotton Robe":[7.61,8.24,8.56,9.19,9.52],
                "Cotton Gloves":[5.77,6.1,6.42,7.05,7.38],
                "Cotton Pants":[7,7.63,7.95,8.58,8.91],
                "Cotton Shoes":[5.16,5.49,5.81,6.44,6.46]},
            "Primary Attributes":{
                "Strength":{
                    "Dagger":[2.66,2.98,3,3.31,3.31],
                    "Scythe":[9.26,9.88,10.2,11.11,11.11],
                    "Tower":[3.56,3.88,4.2,4.51,4.51],
                    "Axe":[4.76,5.08,5.4,5.71,6.04],
                    "Club":[4.76,5.08,5.4,5.71,6.04],
                    "Rapier":[3.26,3.58,3.6,3.91,4.24],
                    "Shortsword":[4.76,5.08,5.4,5.71,6.04],
                    "Wakizashi":[2.66,2.98,3,3.31,3.34],
                    "Estoc":[9.26,9.88,10.2,11.11,11.74],
                    "Longsword":[9.26,9.88,10.2,11.11,11.74],
                    "Mace":[9.26,9.88,10.2,11.11,11.74],
                    "Katana":[9.26,9.88,10.2,11.11,11.74],
                    "Buckler":[4.76,5.08,5.4,5.71,6.04],
                    "Kite":[4.76,5.08,5.4,5.71,6.04],
                    "Force":[4.76,5.08,5.4,5.71,6.04],
                    "Leather Helmet":[3.86,4.18,4.5,4.81,4.84],
                    "Leather Breastplate":[4.46,4.78,5.1,5.41,5.74],
                    "Leather Gauntlets":[3.56,3.88,4.2,4.51,4.54],
                    "Leather Leggings":[4.16,4.48,4.8,5.11,5.44],
                    "Leather Boots":[3.26,3.58,3.6,3.91,4.24],
                    "Shade Helmet":[3.26,3.58,3.6,3.91,4.24],
                    "Shade Breastplate":[3.86,4.18,4.5,4.81,4.84],
                    "Shade Gauntlets":[2.96,3.28,3.3,3.61,3.94],
                    "Shade Leggings":[3.56,3.88,4.2,4.51,4.54],
                    "Shade Boots":[2.66,2.98,3,3.31,3.34],
                    "Plate Helmet":[3.86,4.18,4.5,4.81,4.84],
                    "Plate Cuirass":[4.46,4.78,5.1,5.41,5.74],
                    "Plate Gauntlets":[3.56,3.88,4.2,4.51,4.54],
                    "Plate Greaves":[4.16,4.48,4.8,5.11,5.44],
                    "Plate Sabatons":[3.26,3.58,3.6,3.91,4.24],
                    "Power Helmet":[5.66,5.98,6.3,6.91,7.24],
                    "Power Armor":[6.86,7.48,7.8,8.41,8.74],
                    "Power Gauntlets":[5.06,5.38,5.7,6.31,6.34],
                    "Power Leggings":[6.26,6.58,6.9,7.51,7.84],
                    "Power Boots":[4.46,4.78,5.1,5.41,5.74]},
                "Dexterity":{
                    "Dagger":[4.76,5.08,5.4,5.71,5.71],
                    "Scythe":[4.76,5.08,5.4,5.71,5.71],
                    "Tower":[3.56,3.88,4.2,4.51,4.51],
                    "Gossamer Cap":[3.86,4.18,4.5,4.81,4.81],
                    "Gossamer Robe":[4.46,4.78,5.1,5.41,5.41],
                    "Gossamer Gloves":[3.56,3.88,4.2,4.51,4.51],
                    "Gossamer Pants":[4.16,4.48,4.8,5.11,5.11],
                    "Gossamer Shoes":[3.26,3.58,3.6,3.91,3.91],
                    "Axe":[3.26,3.58,3.6,3.91,4.24],
                    "Club":[3.26,3.58,3.6,3.91,4.24],
                    "Rapier":[4.76,5.08,5.4,5.71,6.04],
                    "Shortsword":[4.76,5.08,5.4,5.71,6.04],
                    "Wakizashi":[6.26,6.58,6.9,7.51,7.84],
                    "Estoc":[4.76,5.08,5.4,5.71,6.04],
                    "Longsword":[7.76,8.38,8.7,9.31,9.94],
                    "Mace":[6.26,6.58,6.9,7.51,7.84],
                    "Katana":[7.76,8.38,8.7,9.31,9.94],
                    "Buckler":[4.76,5.08,5.4,5.71,6.04],
                    "Kite":[4.76,5.08,5.4,5.71,6.04],
                    "Force":[4.76,5.08,5.4,5.71,6.04],
                    "Leather Helmet":[3.86,4.18,4.5,4.81,4.84],
                    "Leather Breastplate":[4.46,4.78,5.1,5.41,5.74],
                    "Leather Gauntlets":[3.56,3.88,4.2,4.51,4.54],
                    "Leather Leggings":[4.16,4.48,4.8,5.11,5.44],
                    "Leather Boots":[3.26,3.58,3.6,3.91,4.24],
                    "Shade Helmet":[3.86,4.18,4.5,4.81,4.84],
                    "Shade Breastplate":[4.46,4.78,5.1,5.41,5.74],
                    "Shade Gauntlets":[3.56,3.88,4.2,4.51,4.54],
                    "Shade Leggings":[4.16,4.48,4.8,5.11,5.44],
                    "Shade Boots":[3.26,3.58,3.6,3.91,4.24],
                    "Plate Helmet":[3.86,4.18,4.5,4.81,4.84],
                    "Plate Cuirass":[4.46,4.78,5.1,5.41,5.74],
                    "Plate Gauntlets":[3.56,3.88,4.2,4.51,4.54],
                    "Plate Greaves":[4.16,4.48,4.8,5.11,5.44],
                    "Plate Sabatons":[3.26,3.58,3.6,3.91,4.24],
                    "Power Helmet":[4.76,5.08,5.4,5.71,6.04],
                    "Power Armor":[5.66,5.98,6.3,6.91,7.24],
                    "Power Gauntlets":[4.46,4.78,5.1,5.41,5.74],
                    "Power Leggings":[5.36,5.68,6,6.61,6.94],
                    "Power Boots":[3.86,4.18,4.5,4.81,4.84]},
                "Agility":{
                    "Dagger":[6.26,6.58,6.9,7.51,7.51],
                    "Scythe":[2.66,2.98,3,3.31,3.31],
                    "Tower":[2.36,2.68,2.7,3.01,3.01],
                    "Gossamer Cap":[3.86,4.18,4.5,4.81,4.81],
                    "Gossamer Robe":[4.46,4.78,5.1,5.41,5.41],
                    "Gossamer Gloves":[3.56,3.88,4.2,4.51,4.51],
                    "Gossamer Pants":[4.16,4.48,4.8,5.11,5.11],
                    "Gossamer Shoes":[3.26,3.58,3.6,3.91,3.91],
                    "Axe":[2.66,2.98,3,3.31,3.34],
                    "Club":[3.26,3.58,3.6,3.91,4.24],
                    "Rapier":[3.26,3.58,3.6,3.91,4.24],
                    "Shortsword":[4.76,5.08,5.4,5.71,6.04],
                    "Wakizashi":[6.26,6.58,6.9,7.51,7.84],
                    "Estoc":[2.66,2.98,3,3.31,3.34],
                    "Longsword":[3.26,3.58,3.6,3.91,4.24],
                    "Mace":[3.26,3.58,3.6,3.91,4.24],
                    "Katana":[3.26,3.58,3.6,3.91,4.24],
                    "Cotton Cap":[3.86,4.18,4.5,4.81,4.84],
                    "Cotton Robe":[4.46,4.78,5.1,5.41,5.74],
                    "Cotton Gloves":[3.56,3.88,4.2,4.51,4.54],
                    "Cotton Pants":[4.16,4.48,4.8,5.11,5.44],
                    "Cotton Shoes":[3.26,3.58,3.6,3.91,4.24],
                    "Phase Cap":[4.76,5.08,5.4,5.71,6.04],
                    "Phase Robe":[5.66,5.98,6.3,6.91,7.24],
                    "Phase Gloves":[4.46,4.78,5.1,5.41,5.74],
                    "Phase Pants":[5.36,5.68,6,6.61,6.94],
                    "Phase Shoes":[3.86,4.18,4.5,4.81,4.84],
                    "Leather Helmet":[3.26,3.58,3.6,3.91,4.24],
                    "Leather Breastplate":[3.86,4.18,4.5,4.81,4.84],
                    "Leather Gauntlets":[2.96,3.28,3.3,3.61,3.94],
                    "Leather Leggings":[3.56,3.88,4.2,4.51,4.54],
                    "Leather Boots":[2.66,2.98,3,3.31,3.34],
                    "Shade Helmet":[3.86,4.18,4.5,4.81,4.84],
                    "Shade Breastplate":[4.46,4.78,5.1,5.41,5.74],
                    "Shade Gauntlets":[3.56,3.88,4.2,4.51,4.54],
                    "Shade Leggings":[4.16,4.48,4.8,5.11,5.44],
                    "Shade Boots":[3.26,3.58,3.6,3.91,4.24]},
                "Endurance":{
                    "Tower":[3.26,3.58,3.6,3.91,3.91],
                    "Buckler":[4.76,5.08,5.4,5.71,6.04],
                    "Kite":[4.76,5.08,5.4,5.71,6.04],
                    "Force":[4.76,5.08,5.4,5.71,6.04],
                    "Leather Helmet":[3.26,3.58,3.6,3.91,4.24],
                    "Leather Breastplate":[3.86,4.18,4.5,4.81,4.84],
                    "Leather Gauntlets":[2.96,3.28,3.3,3.61,3.94],
                    "Leather Leggings":[3.56,3.88,4.2,4.51,4.54],
                    "Leather Boots":[2.66,2.98,3,3.31,3.34],
                    "Shade Helmet":[3.26,3.58,3.6,3.91,4.24],
                    "Shade Breastplate":[3.86,4.18,4.5,4.81,4.84],
                    "Shade Gauntlets":[2.96,3.28,3.3,3.61,3.94],
                    "Shade Leggings":[3.56,3.88,4.2,4.51,4.54],
                    "Shade Boots":[2.66,2.98,3,3.31,3.34],
                    "Plate Helmet":[4.76,5.08,5.4,5.71,6.04],
                    "Plate Cuirass":[5.66,5.98,6.3,6.91,7.24],
                    "Plate Gauntlets":[4.46,4.78,5.1,5.41,5.74],
                    "Plate Greaves":[5.36,5.68,6,6.61,6.94],
                    "Plate Sabatons":[3.86,4.18,4.5,4.81,4.84],
                    "Power Helmet":[3.86,4.18,4.5,4.81,4.84],
                    "Power Armor":[4.46,4.78,5.1,5.41,5.74],
                    "Power Gauntlets":[3.56,3.88,4.2,4.51,4.54],
                    "Power Leggings":[4.16,4.48,4.8,5.11,5.44],
                    "Power Boots":[3.26,3.58,3.6,3.91,4.24]},
                "Intelligence":{
                    "Gossamer Cap":[4.76,5.08,5.4,5.71,5.71],
                    "Gossamer Robe":[5.66,5.98,6.3,6.91,6.91],
                    "Gossamer Gloves":[4.46,4.78,5.1,5.41,5.41],
                    "Gossamer Pants":[5.36,5.68,6,6.61,6.61],
                    "Gossamer Shoes":[3.86,4.18,4.5,4.81,4.81],
                    "Katalox":[5.66,5.98,6.3,6.91,7.24],
                    "Oak":[3.86,4.18,4.5,4.81,4.84],
                    "Redwood":[4.76,5.08,5.4,5.71,6.04],
                    "Willow":[3.86,4.18,4.5,4.81,4.84],
                    "Cotton Cap":[4.76,5.08,5.4,5.71,6.04],
                    "Cotton Robe":[5.66,5.98,6.3,6.91,7.24],
                    "Cotton Gloves":[4.46,4.78,5.1,5.41,5.74],
                    "Cotton Pants":[5.36,5.68,6,6.61,6.94],
                    "Cotton Shoes":[3.86,4.18,4.5,4.81,4.84],
                    "Phase Cap":[5.66,5.98,6.3,6.91,7.24],
                    "Phase Robe":[6.86,7.48,7.8,8.41,8.74],
                    "Phase Gloves":[5.06,5.38,5.7,6.31,6.34],
                    "Phase Pants":[6.26,6.58,6.9,7.51,7.84],
                    "Phase Shoes":[4.46,4.78,5.1,5.41,5.74]},
                "Wisdom":{
                    "Dagger":[2.66,2.98,3,3.31,3.31],
                    "Gossamer Cap":[4.76,5.08,5.4,5.71,5.71],
                    "Gossamer Robe":[5.66,5.98,6.3,6.91,6.91],
                    "Gossamer Gloves":[4.46,4.78,5.1,5.41,5.41],
                    "Gossamer Pants":[5.36,5.68,6,6.61,6.61],
                    "Gossamer Shoes":[3.86,4.18,4.5,4.81,4.81],
                    "Katalox":[3.86,4.18,4.5,4.81,4.84],
                    "Oak":[5.66,5.98,6.3,6.91,7.24],
                    "Redwood":[4.76,5.08,5.4,5.71,6.04],
                    "Willow":[5.66,5.98,6.3,6.91,7.24],
                    "Cotton Cap":[4.76,5.08,5.4,5.71,6.04],
                    "Cotton Robe":[5.66,5.98,6.3,6.91,7.24],
                    "Cotton Gloves":[4.46,4.78,5.1,5.41,5.74],
                    "Cotton Pants":[5.36,5.68,6,6.61,6.94],
                    "Cotton Shoes":[3.86,4.18,4.5,4.81,4.84],
                    "Phase Cap":[5.66,5.98,6.3,6.91,7.24],
                    "Phase Robe":[6.86,7.48,7.8,8.41,8.74],
                    "Phase Gloves":[5.06,5.38,5.7,6.31,6.34],
                    "Phase Pants":[6.26,6.58,6.9,7.51,7.84],
                    "Phase Shoes":[4.46,4.78,5.1,5.41,5.74]}
            }};
        var weaponT, weaponD, x, y, edbT, pref, suff;
        weaponT = result.Info.Name.match(/Axe|Club|Wakizashi|Dagger|Rapier|Shortsword|Estoc|Mace|Longsword|Katana|Scythe|Katalox|Oak|Redwood|Willow|Buckler|Kite|Force|Tower/);
        if (!weaponT) weaponT = result.Info.Name.match(/Cotton \w+ |Gossamer \w+ |Phase \w+ |Leather \w+ |Shade \w+ |Plate \w+ |Power \w+ /);
        if (weaponT) weaponT = weaponT[0].trim();
        else return false;

        function CompareWithBaseData(equipData, baseData, multiplier, offset) {
            var resultStr = '', equipResult = '', secondStr = '';
            if (offset === undefined) offset = 0;
            if (!baseData) return equipData.toFixed(2);
            for (var i = 0; i < 5; i++ ) {
                var temp = (equipData - baseData[i + offset]).toFixed(2);
                if (useMultiplier) equipResult = ((baseData[i + offset] - equipData) / multiplier).toFixed(1);
                else equipResult = (baseData[i + offset] - equipData).toFixed(2);
                if (temp > 0.01) {//±0.01 margin
                    if (i == 4 && baseData[3 + offset] == baseData[4 + offset]) i = 5;//Eq that can't have Peerless, but are Leg+
                    else continue;
                }
                resultStr = ['S','E','M','L','P','R'][i];
                if (equipResult > 0.01) {//±0.01 margin
                    resultStr += '-' + equipResult;
                    for (var j = 0; j < 5; j++) {
                        temp = (equipData - baseData[j + offset]).toFixed(2);
                        if (temp > 0) continue;
                        secondStr = ['','S','E','M','L'][i];
                        if (secondStr != '' && temp < 0) {
                            if (useMultiplier) equipResult = ((equipData - baseData[j - 1 + offset]) / multiplier).toFixed(1);
                            else equipResult = (equipData - baseData[j - 1 + offset]).toFixed(2);
                            if (equipResult > 0) secondStr += '+' + equipResult;
                            break;
                        }
                    }
                }
                break;
            }
            if (secondStr != '' && secondStr != resultStr && secondStr != 'Sup') resultStr = resultStr + ' ' + secondStr;
            if (resultStr == 'R') resultStr='L+' + equipResult*-1;
            else if (resultStr == '') resultStr='P+' + equipResult*-1;
            return resultStr;
        }

        function GetStarResult(equipData, baseData, multiplier, offset) {
            var resultStr = '';
            if (typeof(equipData) == 'number') resultStr = CompareWithBaseData(equipData, baseData, multiplier, offset);
            else for (var y in equipData) resultStr += CompareWithBaseData(equipData[y], baseData, multiplier) + ' ';
            return resultStr;
        }

        for (x in result) {
            if (x == 'Info') continue;
            for (y in result[x]) {
                if (x == "Damage") {
                    if (y == "Damage") {
                        weaponD = /Slaughter/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data["Attack Damage"][weaponT],0.854,weaponD);
                    }
                }
                else if (x == "Primary Attributes") result[x][y] = GetStarResult(result[x][y],data[x][y][weaponT],0.3);
                else if (x == "Stats") {
                    if (y == "Attack Damage") {
                        weaponD = /Slaughter/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.854,weaponD);
                    }
                    else if (y == "Attack Accuracy" || y == "Attack Crit Chance") {
                        weaponD = /Balance/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.6069,weaponD);
                    }
                    else if (y == "Magic Damage") {
                        weaponD = /Destruction/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.82969,weaponD);
                    }
                    else if (y == "Magic Accuracy" || y == "Magic Crit Chance") {
                        weaponD = /Focus/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.491,weaponD);
                    }
                    else if (y == "Physical Mitigation") {
                        weaponD = /Protection/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.21,weaponD);
                    }
                    else if (y == "Magical Mitigation") {
                        weaponD = /Warding/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.201,weaponD);
                    }
                    else if (y == "Evade Chance") {
                        weaponD = /Fleet|Shadowdancer/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.25,weaponD);
                    }
                    else if (y == "Resist Chance") {
                        weaponD = /Arcanist|Negation/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.804,weaponD);
                    }
                    else if (y == "Parry Chance") {
                        weaponD = /(Rapier|Wakizashi|Dagger) of the Nimble/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.894,weaponD);
                    }
                    else if (y == "Block Chance") {
                        weaponD = /Barrier/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.998,weaponD);
                    }
                    else if (y == "Attack Speed" && data[y][weaponT]) {
                        weaponD = /(Wakizashi|Dagger) of Swiftness/.test(result.Info.Name) ? 5 : 0;
                        result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.481,weaponD);
                    }
                    else if (y == "Casting Speed" && data[y][weaponT]) result[x][y] = GetStarResult(result[x][y],data[y][weaponT],0.489);
                    else if (y == "Burden") {
                        weaponD = /Mithril/.test(result.Info.Name) ? 2 : 0;
                        pref = data[y][weaponT][weaponD];//min
                        suff = data[y][weaponT][weaponD+1];//max
                        result[x][y] = ((result[x][y] - pref)/(suff-pref)*100).toFixed(0) + '%' ;
                    }
                    else if (y == "Interference") {
                        weaponD = /Battlecaster|Arcanist/.test(result.Info.Name) ? 2 : 0;
                        pref = data[y][weaponT][weaponD];//min
                        suff = data[y][weaponT][weaponD+1];//max
                        result[x][y] = ((result[x][y] - pref)/(suff-pref)*100).toFixed(0) + '%' ;
                    }
                }
                else if (x == "Proficiency") {
                    if (/Katalox|Oak|Redwood|Willow/.test(result.Info.Name) &&
                        ((y == "Elemental" && /Elementalist/.test(result.Info.Name)) || (y == "Divine" && /Heaven-sent/.test(result.Info.Name)) ||
                            (y == "Forbidden" && /Demon-fiend/.test(result.Info.Name)) || (y == "Supportive" && /Earth-walker/.test(result.Info.Name)) ||
                            (y == "Deprecating" && /Curse-weaver/.test(result.Info.Name)))) weaponD = 5;
                    else if ((y != "Divine" && y != "Forbidden" && weaponT == 'Katalox') || (y != "Elemental" && weaponT == 'Redwood') ||
                        (y != "Supportive" && weaponT == 'Oak') || (y != "Deprecating" && weaponT == 'Willow')) weaponD = 10;
                    else weaponD = 0;
                    result[x][y] = GetStarResult(result[x][y],data[x][weaponT],0.306,weaponD);
                }
                else if (x == "Spell Damage") {
                    if (/Katalox|Oak|Redwood|Willow/.test(result.Info.Name)) {
                        weaponD = 0;
                        edbT = ['Holy','Dark','Fire','Cold','Wind','Elec'].indexOf(y);
                        suff = result.Info.Name.indexOf(['Heimdall','Fenrir','Surtr','Niflheim','Freyr','Mjolnir'][edbT]) >= 0;//has maching suffix
                        pref = result.Info.Name.indexOf(['Hallowed','Demonic','Fiery','Arctic','Tempestuous','Shocking'][edbT]) >= 0;//has maching prefix
                        //Katalox|Oak|Redwood:[0: without Prefix + non Suffix; 5: with Prefix + non Suffix; 10: Prefix not matching to staff (ex. Hallowed Redwood);
                        //15: with Prefix + Matching Suffix; 20: without Prefix + Matching Suffix; 25: Cold/Fire (with Prefix) only Oak; 30: Cold/Fire (without Prefix) only Oak]
                        //Willow:[0: Dark (Without Prefix); 5: Dark (With Prefix); 10: Cold/Fire/Holy (With Prefix); 15: Elec/Wind (With Prefix); 20: Elec/Wind (Without Prefix)]
                        if (suff) {
                            if (pref) weaponD = 15;
                            else weaponD = 20;
                        }
                        else {
                            if (weaponT == "Katalox") {
                                if (edbT > 1) weaponD = 10;//elem (only with prefix)
                                else if (pref) weaponD = 5;//else weaponD = 0;
                            }
                            else if (weaponT == "Redwood") {
                                if (edbT < 2) weaponD = 10;//holy|dark (only with prefix)
                                else if (pref) weaponD = 5;//else weaponD = 0;
                            }
                            else if (weaponT == "Oak") {
                                if (edbT == 0) {
                                    if (pref) weaponD = 5;//else weaponD = 0;
                                }
                                else if (edbT == 1 || edbT == 4 || edbT == 5) weaponD = 10;//(only with prefix)
                                else if (pref) weaponD = 25;//Cold|Fire
                                else weaponD = 30;
                            }
                            else if (weaponT == "Willow") {
                                if (edbT == 1) {
                                    if (pref) weaponD = 5;//else weaponD = 0;
                                }
                                else if (edbT == 0 || edbT == 2 || edbT == 3) weaponD = 10;//(only with prefix)
                                else if (pref) weaponD = 15;//Wind|Elec
                                else weaponD = 20;
                            }
                        }
                        result[x][y] = GetStarResult(result[x][y],data[x][weaponT],0.804,weaponD);
                    }
                    else result[x][y] = GetStarResult(result[x][y],data[x][weaponT],0.804);
                }
                else if (x == "Damage Mitigations") {
                    if (/Fire|Cold|Elec|Wind|Holy|Dark/.test(y)) {
                        edbT = 1;
                        if ((y == "Fire" && /Ruby/.test(result.Info.Name)) || (y == "Cold" && /Cobalt/.test(result.Info.Name)) ||
                            (y == "Elec" && /Amber/.test(result.Info.Name)) || (y == "Wind" && /Jade/.test(result.Info.Name)) ||
                            (y == "Holy" && /Zircon/.test(result.Info.Name)) || (y == "Dark" && /Onyx/.test(result.Info.Name))) weaponD = 0;
                        else continue;
                    }
                    else if (y == 'Crushing') {
                        edbT = 0.1549;
                        weaponD = /Dampening/.test(result.Info.Name) ? 20 : 5;
                    }
                    else if (y == 'Slashing') {
                        edbT = 0.1529;
                        weaponD = /Stoneskin/.test(result.Info.Name) ? 25 : 10;
                    }
                    else if (y == 'Piercing') {
                        edbT = 0.1499;
                        weaponD = /Deflection/.test(result.Info.Name) ? 30 : 15;
                    }
                    if (/Reinforced/.test(result.Info.Name)) weaponD += weaponT.indexOf('Leather') >= 0 ? 30 : 15; //Leather : Buckler
                    result[x][y] = GetStarResult(result[x][y],data[x][weaponT],edbT,weaponD);
                }
            }
        }
        if (!result['Primary Attributes']) result['Primary Attributes'] = {};
        for (y in data["Primary Attributes"]) {
            if (data["Primary Attributes"][y][weaponT] && !result['Primary Attributes'][y]) result['Primary Attributes'][y] = '※※※';
        }
        return result;
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

    _formatInfo: function(source,wiki) {

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
                '<div style="text-align:center; margin:3px auto">'+ (wiki? '':'+') +'<strong>{0}</strong> <b>{1}</b> <b>Damage</b> </div>',
                wiki ? source.Damage.Damage:source.Damage.Damage.toFixed(2),source.Damage.Type
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

    _formatSection: function(name,source,wiki) {

        var result = '', attributes = '', stats = (name == 'Stats'), attributeCount = 0, temp;
        var newLine = [];

        for (var x in source) {
            if (wiki) temp =
                Formatter._format('<div style="float:left; width:{0}px; text-align:right; {1}">', stats ? '155' : '106',
                    attributeCount > 1 && x != 'Burden'&& x != 'Interference' && ((stats && attributeCount % 2 == 0) || (!stats && attributeCount % 3 == 0)) ? 'clear:left;' : '') +
                (!stats ? x + '' : Formatter._format('<div style="float:left; {0}">{1}</div>',stats ? 'width:99px; padding:2px' : 'width:65px',x)) +
                Formatter._format('<div style="float:' + (stats ? 'left' : 'right') + '; width:45px; {0}"><strong>{1}</strong></div>','padding:0 3px 0 0', source[x]) +
                    '<div style="clear:both"></div></div>';

            else temp =
                Formatter._format('<div style="float:left; width:{0}px; text-align:right;">',stats ? '155' : '100') +
                Formatter._format('<div style="float:left; {0}">{1}</div>',stats ? 'width:99px; padding:2px' : 'width:65px',x) +
                Formatter._format('<div style="float:left; width:35px; {0}">+<strong>{1}</strong></div>', stats ? 'padding:2px 0 2px 2px' : '', source[x].toFixed(2)) +
                // additional div needed for stats (containing the percent sign)
                (!stats ? '' : Formatter._format(
                    '<div style="float:left; width:6px; text-align:left; padding:2px 2px 2px 1px">{0}</div>',
                    (stats && !/Attack Damage|Magic Damage|Interference|Burden/.test(x) ? ' %' : '') // exclude damage, burden and interference. Not 'Attack Crit Damage'
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
                    '<div style="padding-right:20px"><div style="margin:5px auto; width:{1}20px">{2}</div></div><div style="clear:both"></div></div>',
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
            }
            else targets[i].parentNode.style.color = 'darkorchid';
        }

        // info & procs
        targets = source.querySelectorAll('div:not([style^="float"]) > div > strong');
        for (i=targets.length-1;i>=0;i--) {
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
            }
            else if (/\d/.test(targets[i].textContent)) targets[i].style.color = 'darkorchid';
        }

        // highlight different strings
        targets = source.querySelectorAll('strong, b');
        for (i=targets.length-1;i>=0;i--) {
            if (targets[i].textContent[0] != '!' || targets[i].childElementCount) continue;
            targets[i].textContent = targets[i].textContent.slice(1);
            targets[i].style.color = 'dodgerblue';
        }

    },

    toHTML: function(source,w) {

        var result = '';

        Formatter._sectionOrder.forEach(function(section) {
            if (section == 'Info') result += Formatter._formatInfo(source,w);
            else if (source.hasOwnProperty(section))
                result += Formatter._formatSection(section,source[section],w);
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
        if (/Cap|Helm|Coif/i.test(name)) return 'Helmet';
        if (/Robe|Armor|Breastplate|Cuirass|Hauberk/i.test(name)) return 'Body';
        if (/Gloves|Gauntlets|Mitons/i.test(name)) return 'Hands';
        if (/Pants|Leggings|Greaves|Chausses/i.test(name)) return 'Legs';
        return 'Feet';
    },

    keyEvent: function(e) {
        var key = String.fromCharCode(e.keyCode).toLowerCase();
        if (!/[qwerbf]/.test(key) || !Controller.popup.childElementCount || !Controller.hasData()) return;
        if (!Controller.loaded) {
            Controller.loadData();
            Controller.laded = true;
        }
        var name = document.querySelector('#popup_box > div');
        if (document.location.search.indexOf('s=Bazaar&ss=lt') >= 0) name = document.querySelector('#leftpane > div:nth-child(2)');//Lottery
        if (!name) {
            if (document.location.search.indexOf('s=Bazaar&ss=fr') >= 0) name = document.getElementById('leftpane').getElementsByClassName('fd4');
            else name = document.getElementsByClassName('fd4');
            name = name[name.length - 1].getElementsByTagName('div')[0];
        }
        name.textContent = name.textContent.replace(/\s\(.+\)/,'');//Delete (Main Hand)/(Off Hand)
        var source = Parser.parse(), slot = Controller._extractSlot(source.Info.Name,source.Info.Type), result, isWiki;
        if (key == 'f') prompt("Forum Url Link:",'[url\='+document.location.href+']'+source.Info.Name+'[/url]');

        if (key == 'r') {
            if (!/Ebony|Chucks|Scythe|Dagger|Tower|Gossamer|Silk|Kevlar|Dragon Hide|Shield (?!of)|Chainmail|Coif|Hauberk|Mitons|Chausses/.test(source.Info.Name)) {
                if (source.Info.Type.match(/Cloth/)) window.open('http://ehwiki.org/wiki/Equipment_Ranges_Clothes?where=' + source.Info.Name.replace(/\s/g,'+'));
                else if (source.Info.Type.match(/Heavy/)) window.open('http://ehwiki.org/wiki/Equipment_Ranges_Heavy?where=' + source.Info.Name.replace(/\s/g,'+'));
                else if (source.Info.Type.match(/Light/)) window.open('http://ehwiki.org/wiki/Equipment_Ranges_Light?where=' + source.Info.Name.replace(/\s/g,'+'));
                else window.open('http://ehwiki.org/wiki/Equipment_Ranges?where=' + source.Info.Name.replace(/\s/g,'+'));
            }
            return;
        }

        var switchSlot = ((key == 'q' || key == 'e') && Controller.lastEquip == source.Info.Name && Controller.lastSlot != 'Off Hand' &&
            source.Info.Type.match(/One/)=='One' && document.getElementById('Equipment') != null);

        if (document.getElementById('Equipment') != null) {
            Controller.lastResult.parentNode.removeChild(Controller.lastResult);
            if (Controller.lastKey == key && !switchSlot) {
                Controller.getTarget().style.display = null;
                return;
            }
        }

        if (Controller.lastKey == key && switchSlot) slot = (Controller.lastSlot == 'Main Hand' ? 'Off Hand' : 'Main Hand');

        if (key == 'q' || key == 'e') {
            if (source.Info.Type == 'One-handed Weapon') name.textContent += ' (' + slot + ')';
            if (source.Info.Type == 'Shield') name.textContent += ' (Off Hand)';
            if (!Controller.Level) Controller.loadData();
            result = Cruncher.compare(source,Controller[slot] || { });
        }
        else result = source;

        if (key == 'w' || key == 'e' || key == 'b') result = Cruncher.scale(result);
        if (key == 'w') {
            isWiki = Cruncher.compareBaseData(result);
            if (isWiki) result = isWiki;
        }

        var div = document.createElement('div');
        div.id = 'Equipment';
        div.innerHTML = Formatter.toHTML(result,!!isWiki);
        Formatter.addColors(div,key == 'q' || key == 'e');

        var target = Controller.getTarget();
        target.parentNode.insertBefore(div,target.nextSibling);
        target.style.display = 'none';

        Controller.lastKey = key;
        Controller.lastResult = div;
        Controller.lastSlot = slot;
        Controller.lastEquip = source.Info.Name;
    }
};

/* * * * * * * * * * * * * * * * * * * * * * * */

Wiki = {

    _evaluate: function(query,x) {
        if(!x) x = document;
        return document.evaluate(query,x,null,9,null).singleNodeValue;
    },

    check: function() {

        var equip = window.location.href.match(/where=([^#&]+)/)[1].replace(/\+/g,' '), temp, target;

        if (temp = equip.match(/(Cotton|Gossamer|Phase|Leather|Kevlar|Shade|Plate|Shield (?!of)|Power)/)) { // armor
            type=temp[1].trim()+Controller._extractSlot(equip,'').replace(/Helmet/,'Head');
            target = Wiki._evaluate('.//h4[./span[starts-with(text(),"' + type + '")]]/following-sibling::table');
        }
        else { // other
            var type = equip.replace(/Flimsy|Crude|Fair|Average|Fine|Superior|Exquisite|Magnificent|Legendary|Peerless|Ethereal/g,'');
            type = type.replace(/Shocking|Arctic|Tempestuous|Fiery|Astral|Quintessential|Demonic|Hallowed|Agile|Reinforced|Mithril/g,'');
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
        var offset = (/Exquisite/.test(equip)?1:/Magnificent/.test(equip)?2:/Legendary/.test(equip)?3:/Peerless/.test(equip)?4:0);

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
                //(/Fiery|Shocking|Tempestuous|Arctic/.test(preffix) && /★×/i.test(td))||
                (/Fiery/.test(preffix) && /Fire.*?★×/i.test(td))||
                (/Shocking/.test(preffix) && /Elec.*?★×/i.test(td))||
                (/Tempestuous/.test(preffix) && /Wind.*?★×/i.test(td))||
                (/Arctic/.test(preffix) && /Cold.*?★×/i.test(td))||
                (/Demonic|Hallowed/.test(preffix) && /√×/i.test(td))||
                (/Shielding/.test(preffix) && /Shielding/i.test(td))||
                (/Charged/.test(preffix) && /Charged/i.test(td)) ||
                (/Frugal/.test(preffix) && /Frugal/i.test(td)) ||
                (/Agile/.test(preffix) && /Agile/i.test(td)) ||
                (/Mithril/.test(preffix) && /Mithril/i.test(td));
        }

        function highlightRow(row) {
            var n = row.cells.length-5+offset;
            if (row.cells[n].textContent.trim() == 0) return;
            for (var i=n;i>=0;i--) highlightCell(row.cells[i]);
            highlightCell(row.cells[n],true);
            if (isFirst(row)) {
                var temp = Wiki._evaluate('preceding-sibling::tr[./th[1][@scope]][1]/th[1]',row);
                if (temp) highlightCell(temp);
            }
        }

        function highlightCell(cell,text) {
            if (!cell) return;
            cell.style.cssText = 'background-color: bisque;' + (text?'color: firebrick; font-weight: bold; text-decoration: underline;':'');
        }

        var rows = Array.prototype.slice.call(target.rows,0).slice(3), n = rows.length;
        var suffix = equip.match(/([^\s]+)$/)[1].trim()+' '+equip.match(/\S+ (\S+)/)[1].trim();
        for (var i = 0; i < n; i++) {
            var rowspan = rows[i].firstElementChild.getAttribute('rowspan') || 1, temp = false, temp2 = null, temp3 = false;
            for (var j = 0; j < rowspan; j++, i++) {
                if (temp) continue;
                var suffixTD = isFirst(rows[i])?rows[i].firstElementChild:rows[i].firstElementChild.nextElementSibling, suffixTDtext = suffixTD.textContent.trim();
                // alert(suffix)
                if ((/Heimdall Hallowed|Demonic Fenrir/.test(suffix) && /√√/i.test(suffixTDtext)) ||
                    (/Surtr Fiery|Mjolnir Shocking|Freyr Tempestuous|Niflheim Arctic/.test(suffix) && /★★/i.test(suffixTDtext))) {
                    temp3 = true;
                    highlightRow(rows[i]);
                }
                if (!temp3 && checkSuffix(suffixTDtext,suffix.match(/\S+/))) {
                    temp = true;
                    temp3 = true;
                    highlightRow(rows[i]);
                }
                else if (/^$|Others|Prof. Suffix|^EDB Suffix/.test(suffixTDtext) || (!temp2 && !suffixTD.nextElementSibling.textContent.trim().length)) temp2 = rows[i];

                if (!temp && temp2) highlightRow(temp2);

                if (!temp3) {
                    if (checkPreffix(suffixTDtext,suffix)) {
                        highlightRow(rows[i]);
                        temp3 = true;
                    }
                    else if (equip.indexOf('Fiery Oak') < 0 && equip.indexOf('Arctic Oak') < 0 && equip.indexOf('Tempestuous Willow') < 0
                        && equip.indexOf('Shocking Willow') < 0 && !checkSuffix(suffixTDtext,suffix.match(/\S+/)) && /\)$/i.test(suffixTDtext)) {
                        temp3 = true;
                        highlightRow(rows[i]);
                    }
                }
            }
            i--;
        }
    }
};
/* * * * * * * * * * * * * * * * * * * * * * * */

if (window.location.host == 'hentaiverse.org') {
    if (/&ss=eq/.test(window.location.href)) Controller.saveData();
    var tmp = document.getElementById('equipment');
    if (!tmp) tmp = document.getElementById('popup_box');
    Controller.popup = tmp;
    Controller.loaded = false;
    window.addEventListener('keyup',Controller.keyEvent,false);
    var level = document.evaluate('.//div[starts-with(text(),"Level")]',document,null,9,null).singleNodeValue;
    if (level) Controller.Level = parseInt(level.textContent.match(/(\d+)/)[1],10)
}
else if (window.location.host == 'ehwiki.org' && window.location.search.indexOf('where=') >= 0) window.addEventListener('load',Wiki.check,false);