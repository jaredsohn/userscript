// ==UserScript==
// @name                Armory2Forums
// @description         Improves the American and European WoW forums seamlessly with information from WoWArmory.com and WoWProgress.com.
// @namespace           http://www.armory2forums.com/
// @include             http*://forums.worldofwarcraft.com/thread.html*
// @include             http*://forums.wow-europe.com/thread.html*
// @version             1.1.0

// @homepage            http://www.armory2forums.com/
// @author              Armory2Forums.com
// @tab                 General
// @enabledbydefault    true
// ==/UserScript==

/*

Copyright 2010, Armory2Forums.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

http://www.gnu.org/licenses/gpl.html

*/

(function() {
    if (window !== window.top || document.title.indexOf('World of Warcraft: Cataclysm Beta') == 0) {
        return;
    }

    var region = 'us';

    if (location.hostname.indexOf('wow-europe.com') != -1) {
        region = 'eu';
    }

    var _browser = {
        "Chrome": navigator.userAgent.indexOf('Chrome') != -1,
        "Safari": navigator.userAgent.indexOf('Safari') != -1
    };

    var _A2F = {
        "delayArmory": 5000, // Less than 5 seconds is unsafe!
        "cacheExpire": 86400000, // 24 hour cache
        "retry": 300000, // 5 minute retry delay
        "timeout": 5000, // 5 second timeout on requests
        "ns": "A2F_",
        "minLevelArmory": 10,
        "ratings": [
            {"value": 3000, "color": "#E6CC80"},
            {"value": 2700, "color": "#FF8000"},
            {"value": 2200, "color": "#A335EE"},
            {"value": 1500, "color": "#0070DD"},
            {"value": 750, "color": "#1EFF00"},
            {"value": 0, "color": "#FFF"}
        ],
        "rankings": [
            {"value": 201, "color": "#FFF"},
            {"value": 101, "color": "#AE8861"},
            {"value": 11, "color": "#C0C0C0"},
            {"value": 2, "color": "#FFD700"},
            {"value": 1, "color": "#EF0E0E"},
            {"value": 0, "color": "#FFF"}
        ],
        "scores": [
            {"value": 6500, "color": "#E6CC80"},
            {"value": 6000, "color": "#FF8000"},
            {"value": 5000, "color": "#A335EE"},
            {"value": 4000, "color": "#0070DD"},
            {"value": 3000, "color": "#1EFF00"},
            {"value": 0, "color": "#FFF"}
        ],
        "points": [
            {"value": 11000, "color": "#E6CC80"},
            {"value": 9001, "color": "#FF8000"},
            {"value": 6000, "color": "#A335EE"},
            {"value": 3000, "color": "#0070DD"},
            {"value": 1500, "color": "#1EFF00"},
            {"value": 0, "color": "#FFF"}
        ],
        "hks": [
            {"value": 200000, "color": "#E6CC80"},
            {"value": 100000, "color": "#FF8000"},
            {"value": 60000, "color": "#A335EE"},
            {"value": 30000, "color": "#0070DD"},
            {"value": 10000, "color": "#1EFF00"},
            {"value": 0, "color": "#CCC"}
        ],
        "skills": [
            {"value": 450, "color": "#A335EE"},
            {"value": 400, "color": "#0070DD"},
            {"value": 350, "color": "#1EFF00"},
            {"value": 0, "color": "#CCC"}
        ],
        "progress": [
            {"value": 3001, "color": "#FFF"},
            {"value": 1001, "color": "#1EFF00"},
            {"value": 151, "color": "#0070DD"},
            {"value": 51, "color": "#A335EE"},
            {"value": 11, "color": "#FF8000"},
            {"value": 2, "color": "#E6CC80"},
            {"value": 1, "color": "#EF0E0E"},
            {"value": 0, "color": "#FFF"}
        ],
        "kills": [
            {"value": 50, "color": "#EF0E0E"},
            {"value": 30, "color": "#E6CC80"},
            {"value": 15, "color": "#FF8000"},
            {"value": 5, "color": "#A335EE"},
            {"value": 1, "color": "#FFF"}
        ],
        "ilvls": [
            {"value": 277, "color": "#E6CC80"},
            {"value": 251, "color": "#FF8000"},
            {"value": 232, "color": "#A335EE"},
            {"value": 200, "color": "#0070DD"},
            {"value": 187, "color": "#1EFF00"},
            {"value": 0, "color": "#FFF"},
        ],
        "classes": {
            "Death Knight": "#C41F3B",
            "Druid": "#FF7D0A",
            "Hunter": "#ABD473",
            "Mage": "#69CCF0",
            "Paladin": "#F58CBA",
            "Priest": "#FFF",
            "Rogue": "#FFF569",
            "Shaman": "#2459FF",
            "Warlock": "#9482C9",
            "Warrior": "#C79C6E",
        },
        "talents": {
            "Assassination": "Mutilate",
            "Beast Mastery": "BM",
            "Demonology": "Demo",
            "Enhancement": "Enhance",
            "Feral Combat": "Feral",
            "Marksmanship": "MM",
            "Restoration": "Resto",
        },
        "slots": {
            "0": "Head", "1": "Neck", "2": "Shoulder", "3": "Shirt",
            "4": "Chest", "5": "Waist", "6": "Legs", "7": "Feet",
            "8": "Wrist", "9": "Hands", "10": "Finger", "11": "Finger",
            "12": "Trinket", "13": "Trinket", "14": "Back", "15": "Main Hand",
            "16": "Off Hand", "17": "Ranged/Relic", "18": "Tabard", "-1": "Ammo"
        },
        "quality": {
            "0": "#9D9D9D", "1": "#FFF", "2": "#1EFF00", "3": "#0070DD",
            "4": "#A335EE", "5": "#FF8000", "6": "#E6CC80", "7": "#E6CC80"
        },
        "itemTypes": {
            "INVTYPE_RELIC": {"mod": .3164, "enchantable": false},
            "INVTYPE_TRINKET": {"mod": .5625, "enchantable": false},
            "INVTYPE_2HWEAPON": {"mod": 2, "enchantable": true},
            "INVTYPE_WEAPONMAINHAND": {"mod": 1, "enchantable": true},
            "INVTYPE_WEAPONOFFHAND": {"mod": 1, "enchantable": true},
            "INVTYPE_RANGED": {"mod": .3164, "enchantable": false},
            "INVTYPE_THROWN": {"mod": .3164, "enchantable": false},
            "INVTYPE_RANGEDRIGHT": {"mod": .3164, "enchantable": false},
            "INVTYPE_SHIELD": {"mod": 1, "enchantable": true},
            "INVTYPE_WEAPON": {"mod": 1, "enchantable": true},
            "INVTYPE_HOLDABLE": {"mod": 1, "enchantable": false},
            "INVTYPE_HEAD": {"mod": 1, "enchantable": true},
            "INVTYPE_NECK": {"mod": .5625, "enchantable": false},
            "INVTYPE_SHOULDER": {"mod": .75, "enchantable": true},
            "INVTYPE_CHEST": {"mod": 1, "enchantable": true},
            "INVTYPE_ROBE": {"mod": 1, "enchantable": true},
            "INVTYPE_WAIST": {"mod": .75, "enchantable": false},
            "INVTYPE_LEGS": {"mod": 1, "enchantable": true},
            "INVTYPE_FEET": {"mod": .75, "enchantable": true},
            "INVTYPE_WRIST": {"mod": .5625, "enchantable": true},
            "INVTYPE_HAND": {"mod": .75, "enchantable": true},
            "INVTYPE_FINGER": {"mod": .5625, "enchantable": false},
            "INVTYPE_CLOAK": {"mod": .5625, "enchantable": true}
        },
        "formula": {
            "a": {
                "4": {"a": 91.45, "b": .65},
                "3": {"a": 81.375, "b": .8125},
                "2": {"a": 73, "b": 1}
           },
            "b": {
                "4": {"a": 26, "b": 1.2},
                "3": {"a": .75, "b": 1.8},
                "2": {"a": 8, "b": 2},
                "1": {"a": 0, "b": 2.25}
           }
        },
        "slot2ItemType": {
            "-1": "INVTYPE_AMMO",
            "0": "INVTYPE_HEAD",
            "1": "INVTYPE_NECK",
            "2": "INVTYPE_SHOULDER",
            "3": "INVTYPE_BODY",
            "4": "INVTYPE_CHEST",
            "5": "INVTYPE_WAIST",
            "6": "INVTYPE_LEGS",
            "7": "INVTYPE_FEET",
            "8": "INVTYPE_WRIST",
            "9": "INVTYPE_HAND",
            "10": "INVTYPE_FINGER",
            "11": "INVTYPE_FINGER",
            "12": "INVTYPE_TRINKET",
            "13": "INVTYPE_TRINKET",
            "14": "INVTYPE_CLOAK",
            "18": "INVTYPE_TABARD"
        },
        "dur2ItemType": {
            "15": {
                "0": {"85": "INVTYPE_2HWEAPON", "75": "INVTYPE_WEAPONMAINHAND", "55": "INVTYPE_WEAPONMAINHAND"},
                "1": {"85": "INVTYPE_2HWEAPON", "75": "INVTYPE_WEAPONMAINHAND", "55": "INVTYPE_WEAPONMAINHAND"},
                "2": {"85": "INVTYPE_2HWEAPON", "75": "INVTYPE_WEAPONMAINHAND", "55": "INVTYPE_WEAPONMAINHAND"},
                "3": {"100": "INVTYPE_2HWEAPON", "90": "INVTYPE_WEAPONMAINHAND", "65": "INVTYPE_WEAPONMAINHAND"},
                "4": {"120": "INVTYPE_2HWEAPON", "105": "INVTYPE_WEAPONMAINHAND", "75": "INVTYPE_WEAPONMAINHAND"},
                "5": {"145": "INVTYPE_2HWEAPON", "125": "INVTYPE_WEAPONMAINHAND"}
            },
            "16": {
                "0": {"0": "INVTYPE_HOLDABLE", "85": "INVTYPE_2HWEAPON", "75": "INVTYPE_WEAPONOFFHAND", "55": "INVTYPE_WEAPONOFFHAND"},
                "1": {"0": "INVTYPE_HOLDABLE", "85": "INVTYPE_2HWEAPON", "75": "INVTYPE_WEAPONOFFHAND", "55": "INVTYPE_WEAPONOFFHAND"},
                "2": {"0": "INVTYPE_HOLDABLE", "85": "INVTYPE_2HWEAPON", "75": "INVTYPE_WEAPONOFFHAND", "55": "INVTYPE_WEAPONOFFHAND"},
                "3": {"0": "INVTYPE_HOLDABLE", "100": "INVTYPE_2HWEAPON", "90": "INVTYPE_WEAPONOFFHAND", "65": "INVTYPE_WEAPONOFFHAND"},
                "4": {"0": "INVTYPE_HOLDABLE", "120": "INVTYPE_2HWEAPON", "105": "INVTYPE_WEAPONOFFHAND", "75": "INVTYPE_WEAPONOFFHAND"},
                "5": {"0": "INVTYPE_HOLDABLE", "145": "INVTYPE_2HWEAPON", "125": "INVTYPE_WEAPONOFFHAND"}
            },
            "17": {
                "0": {"0": "INVTYPE_RELIC", "65": "INVTYPE_RANGEDRIGHT", "55": "INVTYPE_RANGEDRIGHT"},
                "1": {"0": "INVTYPE_RELIC", "65": "INVTYPE_RANGEDRIGHT", "55": "INVTYPE_RANGEDRIGHT"},
                "2": {"0": "INVTYPE_RELIC", "65": "INVTYPE_RANGEDRIGHT", "55": "INVTYPE_RANGEDRIGHT"},
                "3": {"0": "INVTYPE_RELIC", "75": "INVTYPE_RANGEDRIGHT", "65": "INVTYPE_RANGEDRIGHT"},
                "4": {"0": "INVTYPE_RELIC", "90": "INVTYPE_RANGEDRIGHT", "75": "INVTYPE_RANGEDRIGHT"},
                "5": {"0": "INVTYPE_RELIC", "110": "INVTYPE_RANGEDRIGHT"}
            }
        }
    };

    function local(key, value) {
        key = _A2F.ns + key;

        if (value == null) {
            return localStorage.getItem(key);
        } else {
            value = JSON.stringify(value);

            try {
                localStorage.setItem(key, value);
            } catch (error) {
                localStorage.clear();
                localStorage.setItem(key, value);
            }
        }
    }

    function rank(rank) {
        if (rank <= 0 || rank > 8000) {
            return '--';
        } else {
            var suffixes = ['th', 'st', 'nd', 'rd'];
            var i = rank % 100;

            return rank + (suffixes[(i - 20) % 10] || suffixes[i] || suffixes[0]);
        }
    }

    function comma(number) {
        if (number < 1000) {
            return number;
        }

        var x = number.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        return x1 + x2;
    }

    function xpath(path, root) {
        return document.evaluate(path, root, null, XPathResult.ANY_TYPE, null);
    }

    function cached(url) {
        var cache = local(url);
        var json = cache ? JSON.parse(cache) : false;

        if (json && new Date().getTime() < json.expire) {
            return json;
        }
    }

    function delay(url) {
        var cache = local(url);
        var json = cache ? JSON.parse(cache) : false;

        if (!json || !json.delay || (json.delay && !cached(url))) {
            local(url, {"delay": true, "expire": new Date().getTime() + _A2F.retry});
        }
    }

    function responseHandle(responseText, url, callback, type) {
        if (responseText) {
            local(url, {"responseText": responseText, "expire": new Date().getTime() + _A2F.cacheExpire});
            responseParse(responseText, callback, type);
        } else {
            callback();
        }
    }

    function responseParse(responseText, callback, type) {
        if (!type) {
            callback(responseText);
        } else if (type == 'xml') {
            callback(new DOMParser().parseFromString(responseText, 'text/xml'));
        } else if (type == 'json') {
            callback(JSON.parse(responseText));
        }
    }

    function request(url, callback, type) {
        var cache = cached(url);

        if (cache) {
            if (!cache.responseText) {
                callback();
            } else {
                responseParse(cache.responseText, callback, type);
            }
        } else {
            if (_browser.Chrome) {
                chrome.extension.sendRequest({"action": "xhr", "url": url, "timeout": _A2F.timeout}, function(responseText) { responseHandle(responseText, url, callback, type); });
            } else if (_browser.Safari) {
                var listener = function(xhr) {
                    safari.self.removeEventListener('message', listener, false);

                    if (xhr.name == 'response') {
                        if (xhr.message) {
                            responseHandle(xhr.message, url, callback, type);
                        } else {
                            callback();
                        }
                    }
                }

                safari.self.addEventListener('message', listener, false);
                safari.self.tab.dispatchMessage('xhr', {"url": url, "timeout": _A2F.timeout});
            } else {
                var timeoutId;

                var request = GM_xmlhttpRequest({
                    "method": "GET",
                    "url": url,
                    "onload": function(response) { clearTimeout(timeoutId); responseHandle(response.responseText, url, callback, type); }
                });

                timeoutId = setTimeout(function() {
                    request.abort();
                    callback();
                }, _A2F.timeout);
            }
        }
    }

    var _paused = false;
    var _timer = false;

    var _posts = xpath('//div[@class="postdisplay"]', document);
    var posts = [];

    var queue = function() {
        if (posts[0]) {
            posts[0]._name.setAttribute('class', 'A2F_Loading');
            _timer = setTimeout(function() { process(0); }, _A2F.delayArmory);
        }
    }

    var process = function(position, isCached) {
        if (!posts[position]) {
            return;
        }

        var post = posts[position];
        posts.splice(position, 1);

        var _armory_ = 'http://' + region + '.wowarmory.com';

        var _content = xpath('.//div[@class="pinfobottom"]/..', post).iterateNext();
        var _guild = xpath('.//li[@class="icon-guild"]/small/b/a', post, null,XPathResult.ANY_TYPE, null).iterateNext();

        if (_guild) {
            var guild = decodeURIComponent(_guild.href.match(/(\?|&)n=(.*?)(&|$)/)[2]);
        }

        var addArmory = function(__armory) {
            if (__armory) {
                var player = __armory.getElementsByTagName('character')[0];
                var characterTab = __armory.getElementsByTagName('characterTab')[0];
            }

            var nextPost = function() {
                post._name.setAttribute('class', '');

                var i = 0;

                while (posts[i]) {
                    if (cached(posts[i]._armory_)) {
                        process(i, true);
                    } else {
                        i++;
                    }
                }

                if (_paused) {
                    return;
                }

                queue();
            }

            if (!player || !characterTab) {
                delay(post._armory_);

                post._name.innerHTML += ' *';
                return !isCached ? nextPost() : '';
            }

            if (!isCached) {
                post._name.setAttribute('class', 'A2F_Loading_Armory');
            }

            var _class = player.getAttribute('class');
            var _ach_ = _armory_ + '/character-feed.atom?r=' + post.realm + '&cn=' + post.name + '&filters=ACHIEVEMENT,RESPEC&achCategories=81&locale=en_US';

            if (guild) {
                var wp_region = region.replace(/'/g, '-').replace(/\s/g, '+').toLowerCase();
                var wp_realm = unescape(decodeURIComponent(post.realm)).replace(/'|\s/g, '-').toLowerCase();
                var wp_guild = unescape(guild).replace(/'|\s/g, '+');

                var _wp_ = 'http://www.wowprogress.com/guild/' + wp_region + '/' + wp_realm + '/' + wp_guild;
                var _wp_json_ = _wp_ + '/json_rank';
            }

            var addArena = function() {
                var unfiltered = __armory.getElementsByTagName('arenaTeam');

                if (unfiltered[0]) {
                    var teams = [];

                    for (var i = 0, numTeams = unfiltered.length; i < numTeams; i++) {
                        var team = unfiltered[i], members = team.getElementsByTagName('character');

                        for (var z = 0, numMembers = members.length; z < numMembers; z++) {
                            var member = members[z];

                            if (member.getAttribute('name') == post.charName && member.getAttribute('contribution') > 0) {
                                team.setAttribute('ratingPlayer', member.getAttribute('contribution'));
                                teams.push(team);

                                break;
                            }
                        }
                    }

                    if (teams[0]) {
                        var battleGroup = teams[0].getAttribute('battleGroup');
                        var _battleGroup_ = _armory_ + '/arena-ladder.xml?ts=3&b=' + battleGroup;
                        var html_arena = ['<div class="A2F_Arena"><a target="_blank" href="' + _battleGroup_ + '">' + battleGroup + '</a></div><div class="A2F_Arena_Teams">'];
                        var unique = {};

                        for (var i = 0, numTeams = teams.length; i < numTeams; i++) {
                            var team = teams[i], size = team.getAttribute('size') + 'v' + team.getAttribute('size');

                            if (!unique[size]) {
                                unique[size] = true;
                                var numRatings = _A2F.ratings.length;

                                for (var z = 0; z < numRatings; z++) {
                                    if (team.getAttribute('ratingPlayer') >= _A2F.ratings[z].value) {
                                        var color_ratingPlayer = _A2F.ratings[z].color;
                                        break;
                                    }
                                }

                                for (var z = 0; z < numRatings; z++) {
                                    if (team.getAttribute('rating') >= _A2F.ratings[z].value) {
                                        var color_ratingTeam = _A2F.ratings[z].color;
                                        break;
                                    }
                                }

                                for (var z = 0, numRankings = _A2F.rankings.length; z < numRankings; z++) {
                                    if (team.getAttribute('ranking') >= _A2F.rankings[z].value) {
                                        var color_ranking = _A2F.rankings[z].color;
                                        break;
                                    }
                                }

                                var _team_ = _armory_ + '/team-info.xml?' + team.getAttribute('teamUrl');

                                html_arena = html_arena.concat(['<div><div class="A2F_Arena_TeamSize">',
                                '<a target="_blank" href="' + _team_ + '">' + size + '</a>',
                                '<div class="A2F_Tooltip">',
                                '<div>' + team.getAttribute('name') + '</div><table><tr><td>Season Games Played</td><td>' + comma(team.getAttribute('seasonGamesPlayed')) + '</td></tr>',
                                '<tr><td>Win/Loss</td><td>' + comma(team.getAttribute('seasonGamesWon')) + '/' + comma(team.getAttribute('seasonGamesPlayed') - team.getAttribute('seasonGamesWon')) + ' (',
                                Math.round(team.getAttribute('seasonGamesWon') / team.getAttribute('seasonGamesPlayed') * 100) + '%)</td></tr>',
                                '<tr><td>Team Rating</td><td style="color: ' + color_ratingTeam + '">' + team.getAttribute('rating') + '</td></tr></table><table>']);

                                var members = team.getElementsByTagName('character');

                                for (var z = 0, numMembers = members.length; z < numMembers; z++) {
                                    var member = members[z];

                                    for (var x = 0; x < numRatings; x++) {
                                        if (member.getAttribute('contribution') >= _A2F.ratings[x].value) {
                                            var color_ratingMember = _A2F.ratings[x].color;
                                            break;
                                        }
                                    }

                                    html_arena.push('<tr><td style="color: ' + _A2F.classes[member.getAttribute('class')] + '">' + member.getAttribute('name') + '</td>');
                                    html_arena.push('<td>' + Math.round(member.getAttribute('seasonGamesPlayed') / team.getAttribute('seasonGamesPlayed') * 100) + '%</td>');
                                    html_arena.push('<td style="color: ' + color_ratingMember + '">' + member.getAttribute('contribution') + '</td></tr>');
                                }

                                html_arena.push('</table></div></div><div style="color: ' + color_ratingPlayer + '">' + team.getAttribute('ratingPlayer') + '</div>');
                                html_arena.push('<div style="color: ' + color_ranking + '">' + rank(team.getAttribute('ranking')) + '</div></div>');
                            }
                        }

                        var _arena = document.createElement('div');
                        _arena.setAttribute('class', 'A2F_Arena_Frame');
                        _arena.innerHTML = html_arena.join('');
                        _content.appendChild(_arena);
                    }
                }

                if (!isCached) {
                    nextPost();
                }
            }

            var addGlad = function(__ach) {
                if (__ach) {
                    var achs = __ach.getElementsByTagName('title');

                    if (achs[1]) {
                        var hasValidAch = false;
                        var seasons = [];
                        var valid = [];

                        for (var i = 1, numAch = achs.length; i < numAch; i++) {
                            var ach = achs[i].firstChild.nodeValue;
                            var season = 0;
                            var tag = '';

                            if (ach.indexOf('Swift Nether Drake') != -1) {
                                season = 1;
                            } else if (ach.indexOf('Merciless') != -1) {
                                tag = 'Merciless';
                                season = 2;
                            } else if (ach.indexOf('Vengeful') != -1) {
                                tag = 'Vengeful';
                                season = 3;
                            } else if (ach.indexOf('Brutal') != -1) {
                                tag = 'Brutal';
                                season = 4;
                            } else if (ach.indexOf('Deadly') != -1) {
                                tag = 'Deadly';
                                season = 5;
                            } else if (ach.indexOf('Furious') != -1) {
                                tag = 'Furious';
                                season = 6;
                            } else if (ach.indexOf('Relentless') != -1) {
                                tag = 'Relentless';
                                season = 7;
                            } else if (ach.indexOf('Wrathful') != -1) {
                                tag = 'Wrathful';
                                season = 8;
                            }

                            if (season) {
                                hasValidAch = true;

                                if (/Nether Drake|Frostwyrm/.test(ach)) {
                                    if (!seasons[season]) {
                                        seasons[season] = '<span style="border-color: ' + _A2F.rankings[2].color + '; color: ' + _A2F.rankings[2].color + '" title="Gladiator (S' + season + (tag ? ' - ' + tag : '') + ')">' + season + '</span>';
                                    }
                                } else {
                                    seasons[season] = '<span style="border-color: ' + _A2F.rankings[4].color + '; color: ' + _A2F.rankings[4].color + '" title="' + tag + ' Gladiator (S' + season + ')">' + season + '</span>';
                                }

                                valid[season] = season;
                            }
                        }

                        if (hasValidAch) {
                            var html_ach = '';
                            valid.sort();

                            for (var i in valid) {
                                html_ach += seasons[valid[i]];
                            }

                            var _glad = document.createElement('div');
                            _glad.setAttribute('class', 'A2F_Glad');
                            _glad.innerHTML = html_ach;

                            var _char = xpath('.//div[@class="pinfobackground"]/div[2]', post).iterateNext();
                            _char.appendChild(_glad);
                        }
                    }
                }

                addArena();
            }

            var addProgress = function(__wp, __ach) {
                if (!__wp) {
                    delay(_wp_json_);
                } else {
                    for (var i = 0, numProgress = _A2F.progress.length; i < numProgress; i++) {
                        if (__wp.world_rank >= _A2F.progress[i].value) {
                            var color_worldRank = _A2F.progress[i].color;
                            break;
                        }
                    }

                    var html_wp = ['<div class="A2F_Progress"><div>',
                    '<div class="A2F_Progress_Column">Region</div>',
                    '<div class="A2F_Progress_Column">World</div>',
                    '<div class="A2F_Progress_Column">Realm</div></div>',
                    '<div><div class="A2F_Progress_Cell">' + rank(__wp.area_rank) + '</div>',
                    '<a href="' + _wp_ + '" target="_blank" class="A2F_Progress_Cell" style="color: ' + color_worldRank + '">' + rank(__wp.world_rank) + '</a>',
                    '<div class="A2F_Tooltip"></div><div class="A2F_Progress_Cell">' + rank(__wp.realm_rank) + '</div></div></div>'];

                    var _wp = document.createElement('div');
                    _wp.setAttribute('class', 'A2F_Progress_Frame');
                    _wp.innerHTML = html_wp.join('');

                    var anchor = _wp.getElementsByTagName('a')[0];

                    anchor.addEventListener('mouseover', function() {
                        anchor.hovered = true;
                        var tooltip = anchor.nextSibling;

                        if (tooltip.innerHTML) {
                            tooltip.style.visibility = 'visible';
                            return;
                        }

                        var _boss_ = _armory_ + '/character-feed.atom?r=' + post.realm + '&cn=' + post.name + '&filters=BOSSKILL,RESPEC&locale=en_US';

                        request(_boss_, function(__boss) {
                            if (__boss) {
                                var kills = __boss.getElementsByTagName('entry');

                                if (kills[0]) {
                                    var html_boss = ['<div>Latest Boss Kills</div><table>'];

                                    for (var i = 0, num = 0, numKills = kills.length; i < numKills && num < 15; i++) {
                                        var kill = kills[i];
                                        var bossInfo = kill.getElementsByTagName('title')[0].firstChild.nodeValue.match(/\[(.*)\] (.*) times/);
                                        var raidSize = bossInfo[1].match(/10|25/);
                                        var color_boss = '#0070dd';

                                        if (raidSize) {
                                            if (bossInfo[1].indexOf('Heroic') != -1) {
                                                if (raidSize == 25) {
                                                    color_boss = '#E6CC80';
                                                } else {
                                                    color_boss = '#FF8000';
                                                }
                                            } else if (raidSize == 25) {
                                                color_boss = '#A335EE';
                                            }
                                        } else {
                                            continue;
                                        }

                                        var time = Date.parse(kill.getElementsByTagName('updated')[0].firstChild.nodeValue.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)\+(\d{2}):(\d{2})/, '$1/$2/$3 $4 +$5$6'));
                                        var difference = new Date().getTime() - time;

                                        var oneMinute = 1000 * 60;
                                        var oneHour = oneMinute * 60;
                                        var oneDay = oneHour * 24;

                                        for (var z = 0, numDone = _A2F.kills.length; z < numDone; z++) {
                                            if (bossInfo[2] >= _A2F.kills[z].value) {
                                                var color_kills = _A2F.kills[z].color;
                                                break;
                                            }
                                        }

                                        html_boss.push('<tr><td style="color: ' + color_boss + '"">[' + bossInfo[1] + ']</td><td style="color: ' + color_kills + '">' + bossInfo[2] + ' kill' + (bossInfo[2] != 1 ? 's' : '') + '</td><td>');

                                        if (difference >= oneDay) {
                                            var count = Math.ceil(difference / oneDay);
                                            html_boss.push(count + ' day');
                                        } else if (difference >= oneHour) {
                                            var count = Math.ceil(difference / oneHour);
                                            html_boss.push(count + ' hour');
                                        } else {
                                            var count = Math.ceil(difference / oneMinute);
                                            html_boss.push(count + ' minute');
                                        }

                                        html_boss.push((count != 1 ? 's' : '') + '</td></tr>');
                                        num++;
                                    }

                                    if (html_boss.length > 1) {
                                        html_boss.push('</table>');
                                        tooltip.innerHTML = html_boss.join('');

                                        if (anchor.hovered) {
                                            tooltip.style.visibility = 'visible';
                                        }
                                    }
                                }
                            }
                        }, 'xml');
                    }, true);

                    anchor.addEventListener('mouseout', function() {
                        anchor.hovered = false;
                        anchor.nextSibling.style.visibility = 'hidden';
                    }, true);

                    _content.appendChild(_wp);
                }

                addGlad(__ach);
            }

            var addScores = function(__ach) {
                var ap = player.getAttribute('points');

                for (var i = 0, numPoints = _A2F.points.length; i < numPoints; i++) {
                    if (ap >= _A2F.points[i].value) {
                        var color_ap = _A2F.points[i].color;
                        break;
                    }
                }

                var html_scores = ['<div>Ach:&nbsp; <span class="A2F_AP" style="color: ' + color_ap + '">' + ap + '</span>'];

                if (__ach) {
                    var achs = __ach.getElementsByTagName('title');

                    if (achs[1] && achs[1].firstChild.nodeValue.indexOf('There are no entries') == -1) {
                        html_scores.push('<div class="A2F_Tooltip"><div>Feats of Strength (' + (achs.length - 1) + ')</div>');

                        var sortedAchs = [];

                        for (var i = 1, numAch = achs.length; i < numAch; i++) {
                            var ach = achs[i].firstChild.nodeValue.match(/\[(.*)\]/);

                            if (ach) {
                                sortedAchs.push(ach[1]);
                            }
                        }

                        sortedAchs.sort();

                        var count = 0;

                        for (var i = 0, numAch = sortedAchs.length; i < numAch; i++) {
                            var ach = sortedAchs[i];

                            if (ach) {
                                var color_ach = '#A335EE';

                                if (ach.indexOf('Realm First') != -1) {
                                    color_ach = '#FF8000';
                                }

                                if (!count) {
                                    html_scores.push('<div>');
                                }

                                html_scores.push('<span style="color: ' + color_ach + '">[' + ach + ']</span>&nbsp;&nbsp;');

                                if (count++ > 1 || i == numAch - 1) {
                                    html_scores.push('</div>');
                                    count = 0;
                                }
                            }
                        }

                        html_scores.push('</div>');
                    }
                }

                var gs = 0;
                var gsPos = html_scores.length;
                var items = characterTab.getElementsByTagName('item');

                if (items[0]) {
                    html_scores.push('<div class="A2F_Tooltip"><table>');

                    var ilvlSum = 0;
                    var numSum = 0;
                    var numilvls = _A2F.ilvls.length;

                    var scale = 1.8618;
                    var offHand = false;

                    for (var i = items.length; i--;) {
                        var item = items[i];

                        var slot = item.getAttribute('slot');
                        var checkItem = slot != 18 && slot != 3 && slot != -1;
                        var ilvl = parseInt(item.getAttribute('level'));
                        var enchanted = true;

                        if (checkItem) {
                            var qualityScale = 1;
                            var rarity = item.getAttribute('rarity');

                            var itemType = _A2F.slot2ItemType[slot];

                            if (!itemType && _A2F.dur2ItemType[slot]) {
                                if (_A2F.dur2ItemType[slot][rarity]) {
                                    var durability = item.getAttribute('maxDurability');

                                    if (_A2F.dur2ItemType[slot][rarity][durability]) {
                                        var icon = item.getAttribute('icon');

                                        if (slot == 16 && icon.indexOf('inv_shield') != -1) {
                                            itemType = 'INVTYPE_SHIELD';
                                        } else if (slot == 17 && icon.indexOf('weapon_bow') != -1) {
                                            itemType = 'INVTYPE_RANGED';
                                        } else {
                                            itemType = _A2F.dur2ItemType[slot][rarity][durability];
                                        }
                                    }
                                }
                            }

                            if (!itemType) {
                                itemType = 'INVTYPE_HOLDABLE';
                            }

                            if (rarity == 5) {
                                qualityScale = 1.3;
                                rarity = 4;
                            } else if (rarity <= 1) {
                                qualityScale = .005;
                                rarity = 2;
                            } else if (rarity == 7) {
                                ilvl = 187;
                                rarity = 3;
                            }

                            if (_A2F.itemTypes[itemType]) {
                                var itemTypeData = _A2F.itemTypes[itemType];
                                var table = _A2F.formula.a;

                                if (ilvl <= 120) {
                                    var table = _A2F.formula.b;
                                }

                                if (rarity >= 2 && rarity <= 4) {
                                    var ts = Math.floor(((ilvl - table[rarity].a) / table[rarity].b) * itemTypeData.mod * scale * qualityScale);

                                    if ((itemTypeData.enchantable || (_class == 'Hunter' && (itemType == 'INVTYPE_RANGED' || itemType == 'INVTYPE_RANGEDRIGHT'))) && !item.getAttribute('permanentEnchantIcon')) {
                                        enchanted = false;
                                    }

                                    if (_class == 'Hunter') {
                                        if (slot == 15 || slot == 16) {
                                            ts *= .3164;
                                        } else if (slot == 17) {
                                            ts *= 5.3224;
                                        }

                                        ts = Math.floor(ts);
                                    }

                                    if (slot == 16) {
                                        offHand = true;
                                    }

                                    if ((slot == 16 && itemType == 'INVTYPE_2HWEAPON') || (slot == 15 && itemType == 'INVTYPE_2HWEAPON' && offHand)) {
                                        ts = Math.floor(ts * .5);
                                    }

                                    gs += ts;
                                }
                            }

                            numSum++;
                            ilvlSum += ilvl;
                        }

                        for (var z = 0; z < numilvls; z++) {
                            if (ilvl >= _A2F.ilvls[z].value) {
                                var color_ilvl = _A2F.ilvls[z].color;
                                break;
                            }
                        }

                        html_scores.push('<tr><td style="color: ' + _A2F.quality[item.getAttribute('rarity')] + '">[' + item.getAttribute('name') + ']</td>');
                        html_scores.push('<td' + (!enchanted ? ' class="A2F_Red"' : '') + '>' + _A2F.slots[slot] + '</td>');
                        html_scores.push('<td' + (checkItem ? ' style="color: ' + color_ilvl + '"' : '') + '>' + ilvl + '</td></tr>');
                    }

                    var ilvlAvg = Math.floor(ilvlSum / numSum);

                    for (var z = 0; z < numilvls; z++) {
                        if (ilvlAvg >= _A2F.ilvls[z].value) {
                            var color_sumilvl = _A2F.ilvls[z].color;
                            break;
                        }
                    }

                    html_scores.push('</table><table><tr><td>Average ilvl</td><td style="color: ' + color_sumilvl + '">' + ilvlAvg + '</td></tr></table></div>');
                }

                html_scores.push('</div>');

                gs = Math.floor(gs);

                if (gs < 0) {
                    gs = 0;
                }

                for (var i = 0, numScores = _A2F.scores.length; i < numScores; i++) {
                    if (gs >= _A2F.scores[i].value) {
                        var color_gs = _A2F.scores[i].color;
                        break;
                    }
                }

                html_scores.splice(gsPos, 0, '</div><div>GS:&nbsp; <span class="A2F_GS" style="color: ' + color_gs + '">' + gs + '</span>');

                var _scores = document.createElement('div');
                _scores.setAttribute('class', 'A2F_Scores');
                _scores.innerHTML = html_scores.join('');
                _content.appendChild(_scores);

                if (guild) {
                    request(_wp_json_, function(__wp) {
                        addProgress(__wp, __ach);
                    }, 'json');
                } else {
                    addGlad(__ach);
                }
            }

            var addChar = function() {
                var forumName = '';

                if (player.getAttribute('prefix')) {
                    forumName = '<span class="A2F_Title">' + player.getAttribute('prefix') + '</span>' + post.charName;
                } else if (player.getAttribute('suffix')) {
                    forumName = post.charName + '<span class="A2F_Title">' + player.getAttribute('suffix') + '</span>';
                }

                if (forumName) {
                    post._name.innerHTML = forumName;
                }

                var kills = characterTab.getElementsByTagName('lifetimehonorablekills')[0].getAttribute('value');

                for (var i = 0, numKills = _A2F.hks.length; i < numKills; i++) {
                    if (kills >= _A2F.hks[i].value) {
                        var color_kills = _A2F.hks[i].color;
                        break;
                    }
                }

                var html_char = ['<table><tr><td>Honorable Kills</td><td style="color: ' + color_kills + '">' + comma(kills)  + '</td></tr></table>'];
                var profs = characterTab.getElementsByTagName('skill');

                if (profs[0]) {
                    html_char.push('<table>');

                    for (var i = 0, numProfs = profs.length; i < numProfs; i++) {
                        for (var z = 0, numSkills = _A2F.skills.length; z < numSkills; z++) {
                            if (profs[i].getAttribute('value') >= _A2F.skills[z].value) {
                                var color_prof = _A2F.skills[z].color;
                                break;
                            }
                        }

                        html_char.push('<tr><td>' + profs[i].getAttribute('name') + '</td><td style="color: ' + color_prof + '">' + profs[i].getAttribute('value') + '</td></tr>');
                    }

                    html_char.push('</table>');
                }

                var _tooltip = document.createElement('div');
                _tooltip.setAttribute('class', 'A2F_Tooltip');
                _tooltip.innerHTML = html_char.join('');
                post._name.parentNode.parentNode.appendChild(_tooltip);

                var mana = __armory.getElementsByTagName('secondBar')[0];
                var width = '100%';

                if (mana.getAttribute('type') == 'm') {
                    width = '50%'
                }

                var html_stats = ['<div class="A2F_Health" style="width: ' + width + '; background-color: #207001">' + comma(__armory.getElementsByTagName('health')[0].getAttribute('effective')) + '</div>'];

                var stats = characterTab.getElementsByTagName('baseStats')[0];
                var stats_strength = stats.getElementsByTagName('strength')[0];
                var stats_stamina = stats.getElementsByTagName('stamina')[0];
                var stats_agility = stats.getElementsByTagName('agility')[0];
                var stats_armor = stats.getElementsByTagName('armor')[0];

                html_stats.push('<div class="A2F_Tooltip"><table>');
                html_stats.push('<tr><td>Strength</td><td>' + stats_strength.getAttribute('effective') + '</td></tr>');
                html_stats.push('<tr><td>Agility</td><td>' + stats_agility.getAttribute('effective') + '</td></tr>');
                html_stats.push('<tr><td>Stamina</td><td>' + stats_stamina.getAttribute('effective') + '</td></tr>');
                html_stats.push('<tr><td>Armor</td><td>' + stats_armor.getAttribute('effective') + '</td></tr></table>');

                if (_class == 'Hunter') {
                    var stats_ranged = characterTab.getElementsByTagName('ranged')[0];
                    var stats_ap = stats_ranged.getElementsByTagName('power')[0];
                    var stats_hit = stats_ranged.getElementsByTagName('hitRating')[0];
                    var stats_crit = stats_ranged.getElementsByTagName('critChance')[0];

                    html_stats.push('<table><tr><td>Attack Power</td><td>' + stats_ap.getAttribute('effective') + '</td></tr>');
                    html_stats.push('<tr><td>Hit Rating</td><td>' + stats_hit.getAttribute('value') + '</td></tr>');
                    html_stats.push('<tr><td>ArP</td><td>' + stats_hit.getAttribute('penetration') + '</td></tr>');
                    html_stats.push('<tr><td>Crit</td><td>' + stats_crit.getAttribute('percent') + '%</td></tr>');
                } else {
                    var stats_melee = characterTab.getElementsByTagName('melee')[0];
                    var stats_ap = stats_melee.getElementsByTagName('power')[0];
                    var stats_hit = stats_melee.getElementsByTagName('hitRating')[0];
                    var stats_crit = stats_melee.getElementsByTagName('critChance')[0];
                    var stats_expertise = stats_melee.getElementsByTagName('expertise')[0];

                    html_stats.push('<table><tr><td>Attack Power</td><td>' + stats_ap.getAttribute('effective') + '</td></tr>');
                    html_stats.push('<tr><td>Hit Rating</td><td>' + stats_hit.getAttribute('value') + '</td></tr>');
                    html_stats.push('<tr><td>ArP</td><td>' + stats_hit.getAttribute('penetration') + '</td></tr>');
                    html_stats.push('<tr><td>Crit</td><td>' + stats_crit.getAttribute('percent') + '%</td></tr>');
                    html_stats.push('<tr><td>Expertise</td><td>' + stats_expertise.getAttribute('value') + '</td></tr>');
                }

                var stats_haste = characterTab.getElementsByTagName('hasteRating')[0];
                html_stats.push('<tr><td>Haste Rating</td><td>' + stats_haste.getAttribute('hasteRating') + '</td></tr>');

                var stats_defenses = characterTab.getElementsByTagName('defenses')[0];
                var stats_defense = stats_defenses.getElementsByTagName('defense')[0];
                var stats_dodge = stats_defenses.getElementsByTagName('dodge')[0];
                var stats_parry = stats_defenses.getElementsByTagName('parry')[0];
                var stats_block = stats_defenses.getElementsByTagName('block')[0];
                var stats_resilience = stats_defenses.getElementsByTagName('resilience')[0];

                html_stats.push('</table><table><tr><td>Defense</td><td>' + (parseInt(stats_defense.getAttribute('value')) + parseInt(stats_defense.getAttribute('plusDefense'))) + '</td></tr>');
                html_stats.push('<tr><td>Dodge</td><td>' + stats_dodge.getAttribute('percent') + '%</td></tr>');
                html_stats.push('<tr><td>Parry</td><td>' + stats_parry.getAttribute('percent') + '%</td></tr>');
                html_stats.push('<tr><td>Block</td><td>' + stats_block.getAttribute('percent') + '%</td></tr>');
                html_stats.push('<tr><td>Resilience</td><td>' + parseInt(stats_resilience.getAttribute('value')) + '</td></tr>');

                html_stats.push('</table></div>');

                if (mana.getAttribute('type') == 'm') {
                    html_stats.push('<div class="A2F_Mana" style="width: ' + width + '; background-color: #174A89">' + comma(mana.getAttribute('effective')) + '</div>');

                    var stats_intellect = stats.getElementsByTagName('intellect')[0];
                    var stats_spirit = stats.getElementsByTagName('spirit')[0];

                    html_stats.push('<div class="A2F_Tooltip"><table>');
                    html_stats.push('<tr><td>Intellect</td><td>' + stats_intellect.getAttribute('effective') + '</td></tr>');
                    html_stats.push('<tr><td>Spirit</td><td>' + stats_spirit.getAttribute('effective') + '</td></tr></table>');

                    var stats_caster = characterTab.getElementsByTagName('spell')[0];

                    html_stats.push('<table>');

                    if (/Paladin|Priest|Shaman|Druid/.test(_class)) {
                        var stats_healing = stats_caster.getElementsByTagName('bonusHealing')[0];

                        html_stats.push('<tr><td>Bonus Healing</td><td>' + stats_healing.getAttribute('value') + '</td></tr>');
                    }

                    var damageTypes = stats_caster.getElementsByTagName('bonusDamage')[0].childNodes;
                    var stats_spellPower = 0;

                    for (var i = 0, numTypes = damageTypes.length; i < numTypes; i++) {
                        if (damageTypes[i].nodeType == 1 && damageTypes[i].getAttribute('value') && damageTypes[i].getAttribute('value') >= stats_spellPower) {
                            stats_spellPower = damageTypes[i].getAttribute('value');
                        }
                    }

                    var critTypes = stats_caster.getElementsByTagName('critChance')[0].childNodes;
                    var stats_spellCrit = 0;

                    for (var i = 0, numTypes = critTypes.length; i < numTypes; i++) {
                        if (critTypes[i].nodeType == 1 && critTypes[i].getAttribute('percent') >= stats_spellCrit) {
                            stats_spellCrit = critTypes[i].getAttribute('percent');
                        }
                    }

                    html_stats.push('<tr><td>Bonus Damage</td><td>' + stats_spellPower + '</td></tr>');
                    html_stats.push('<tr><td>Crit</td><td>' + stats_spellCrit + '%</td></tr>');

                    var stats_pen= stats_caster.getElementsByTagName('penetration')[0];
                    var stats_hit = stats_caster.getElementsByTagName('hitRating')[0];
                    var stats_regen = stats_caster.getElementsByTagName('manaRegen')[0];

                    html_stats.push('</table><table><tr><td>Hit Rating</td><td>' + stats_hit.getAttribute('value') + '</td></tr>');
                    html_stats.push('<tr><td>Haste Rating</td><td>' + stats_haste.getAttribute('hasteRating') + '</td></tr>');
                    html_stats.push('<tr><td>Penetration</td><td>' + stats_pen.getAttribute('value') + '</td></tr>');
                    html_stats.push('<tr><td>Mp5</td><td>' + parseInt(stats_regen.getAttribute('notCasting')) + '</td></tr></table></div>');
                }

                var _stats = document.createElement('div');
                _stats.setAttribute('class', 'A2F_Stats');
                _stats.innerHTML = html_stats.join('');
                _content.appendChild(_stats);

                var talents = __armory.getElementsByTagName('talentSpec');

                if (talents[0]) {
                    var html_talents = [];

                    for (var i = talents.length; i--;) {
                        var talent = talents[i];
                        var _talents_ = _armory_ + '/character-talents.xml?r=' + post.realm + '&cn=' + post.name + '&group=' + talent.getAttribute('group');
                        var specName = _A2F.talents[talent.getAttribute('prim')] ? _A2F.talents[talent.getAttribute('prim')] : talent.getAttribute('prim');

                        if (!specName) {
                            specName = '--';
                        }

                        html_talents.push('<a target="_blank" href="' + _talents_ + '" style="' + (talent.getAttribute('active') ? 'color: #1EFF00' : 'color: #FFF') + '">' + specName + '<br />' + talent.getAttribute('treeOne') + '/' + talent.getAttribute('treeTwo') + '/' + talent.getAttribute('treeThree') + '</a>');

                        if (talent.getAttribute('active')) {
                            var glyphs = characterTab.getElementsByTagName('glyph');

                            if (glyphs[0]) {
                                html_talents.push('<div class="A2F_Tooltip"><table>');

                                for (var z = 0, numGlyphs = glyphs.length; z < numGlyphs; z++) {
                                    var glyph = glyphs[z];

                                    html_talents.push('<tr><td>[' + glyph.getAttribute('name') + ']</td>');
                                    html_talents.push('<td style="color: ' + (glyph.getAttribute('type') == 'major' ? '#0070DD' : '#1EFF00') + '">' + (glyph.getAttribute('type') == 'major' ? 'Major' : 'Minor') + '</td></tr>');
                                }

                                html_talents.push('</table></div>');
                            }
                        }
                    }

                    var _talents = document.createElement('div');
                    _talents.setAttribute('class', 'A2F_Talents');
                    _talents.innerHTML = html_talents.join('');
                    _content.appendChild(_talents);
                }

                request(_ach_, addScores, 'xml');
            }

            addChar();
        }

        request(post._armory_, addArmory, 'xml');
    }

    while (post = _posts.iterateNext()) {
        post._name = xpath('.//div[@class="chardata"]/span/b/a', post).iterateNext();

        if (post._name) {
            var _level = xpath('.//div[@class="iconPosition"]/b/small', post).iterateNext();
            post.level = parseInt(_level.innerHTML);

            if (_level) {
                posts.push(post);
            }
        }
    }

    if (!posts[0]) {
        return;
    }

    var css = [
        '.A2F_Arena a, .A2F_Arena_TeamSize a, .A2F_Scores a, .A2F_Talents a, a.A2F_Progress_Cell { color: #fff; text-decoration: none; }',
        '.A2F_Arena a:hover, .A2F_Arena_TeamSize a:hover, .A2F_Scores a:hover, .A2F_Talents a:hover, a.A2F_Progress_Cell:hover { text-decoration: underline; }',
        '.A2F_Arena { -webkit-border-radius: 4px 4px 0 0; -moz-border-radius: 4px 4px 0 0; padding: 4px; }',
        '.A2F_Arena, .A2F_Arena_Teams, .A2F_Progress, .A2F_Scores, .A2F_Stats, .A2F_Talents { background-color: #080808; border: 1px solid #4C5153; }',
        '.A2F_Arena_Frame, .A2F_Glad, .A2F_Progress_Frame, .A2F_Scores, .A2F_Stats, .A2F_Talents { color: #fff; font: bold 10px verdana, arial, helvetica; margin: 6px auto 0 auto; }',
        '.A2F_Arena_Frame, .A2F_Progress_Frame { width: 169px; }',
        '.A2F_Arena_TeamSize { background-color: #2F2F2F; padding: 1px 0 3px 0; }',
        '.A2F_Arena_Teams > div > div { width: 33%; display: inline-block; }',
        '.A2F_Arena_Teams > div:first-child .A2F_Arena_TeamSize { -webkit-border-top-left-radius: 3px; -webkit-border-top-right-radius: 3px; -moz-border-radius-topleft: 3px; -moz-border-radius-topright: 3px; }',
        '.A2F_Arena_Teams > div:last-child .A2F_Arena_TeamSize { -webkit-border-bottom-left-radius: 3px; -webkit-border-bottom-right-radius: 3px; -moz-border-radius-bottomleft: 3px; -moz-border-radius-bottomright: 3px; }',
        '.A2F_Arena_Teams { padding: 4px; -webkit-border-radius: 0 0 4px 4px; -moz-border-radius: 0 0 4px 4px; border-top: 0; margin-bottom: 5px; }',
        '.A2F_Glad span { -webkit-border-radius: 5px; -moz-border-radius: 5px; margin: 0 2px; padding: 2px 3px; border: 1px outset; }',
        '.A2F_Glad span, .A2F_AP, .A2F_GS { cursor: default; }',
        '.A2F_Glad { margin-top: 0; padding: 13px 0 7px 0; }',
        '.A2F_Glad, .A2F_Scores, .A2F_Talents { width: 167px; }',
        '.A2F_Health { margin-top: 0; background-color: #207001; }',
        '.A2F_Health, .A2F_Mana { padding-bottom: 1px; display: inline-block; }',
        '.A2F_Loading, .A2F_Red { color: #FF0000 !important; }',
        '.A2F_Loading_Armory { color: #00FF00 !important; }',
        '.A2F_Mana { background-color: #174A89; }',
        '.A2F_Portrait button { width: 50px; margin-left: 50%; left: -25px; padding: 2px 0; position: absolute; font: bold 12px verdana, arial, helvetica; }',
        '.A2F_Portrait iframe { border: 0; width: 321px; height: 444px; }',
        '.A2F_Portrait { border: 1px solid #000; position: absolute; width: 321px; height: 444px; }',
        '.A2F_Progress .A2F_Progress_Column:first-child { -webkit-border-radius: 3px 0 0 3px; -moz-border-radius: 3px 0 0 3px; }',
        '.A2F_Progress .A2F_Progress_Column:last-child { -webkit-border-radius: 0 3px 3px 0; -moz-border-radius: 0 3px 3px 0; }',
        '.A2F_Progress { padding: 4px; margin-bottom: 5px; }',
        '.A2F_Progress_Cell { width: 33%; display: inline-block; }',
        '.A2F_Progress_Column { margin-bottom: 4px; padding: 1px 0 3px 0; background-color: #2F2F2F; width: 33%; display: inline-block; }',
        '.A2F_Scores > div { display: inline-block; width: 50%; }',
        '.A2F_Scores { padding: 4px 0; }',
        '.A2F_Stats .A2F_Tooltip { margin-left: -25%; }',
        '.A2F_Stats { cursor: default; padding: 4px; width: 159px; }',
        '.A2F_Talents .A2F_Tooltip { margin-left: -10px; }',
        '.A2F_Talents a { display: inline-block; width: 50%; }',
        '.A2F_Talents br { margin-bottom: 4px; }',
        '.A2F_Talents { padding: 4px 0; }',
        '.A2F_Title { color: inherit; font-style: italic; }',
        '.A2F_Tooltip div { padding-bottom: 4px; }',
        '.A2F_Tooltip div:first-child { margin-bottom: 18px; padding-bottom: 0 !important; font-size: 12px; }',
        '.A2F_Tooltip div:last-child, .A2F_Tooltip table tr:last-child td { padding-bottom: 0 !important; }',
        '.A2F_Tooltip table { width: 100%; margin-bottom: 16px; border-collapse: collapse; }',
        '.A2F_Tooltip table:last-child { margin-bottom: 0 !important; }',
        '.A2F_Tooltip td + td + td { padding-left: 16px !important; }',
        '.A2F_Tooltip td + td { width: 1px; color: #ccc; padding-left: 40px !important; text-align: right !important; }',
        '.A2F_Tooltip td { padding: 0 0 4px 0 !important; text-align: left; }',
        '.A2F_Tooltip { font: bold 11px verdana, arial, helvetica; color: #fff; display: inline; white-space: nowrap; visibility: hidden; z-index: 500; text-align: left; position: absolute; margin: 15px 20px 0 0; padding: 6px; border: 1px solid #4C5153; background-color: rgba(8, 8, 8, .9); }',
        '.A2F_Tooltip, .A2F_Progress, .A2F_Scores, .A2F_Stats, .A2F_Talents { -webkit-border-radius: 4px; -moz-border-radius: 4px; }',
        '.chardata + div { padding-bottom: 8px; }',
        '.chardata b:hover + .A2F_Tooltip, .A2F_Arena_TeamSize a:hover + .A2F_Tooltip, .A2F_AP:hover + .A2F_Tooltip, .A2F_Talents a:hover + .A2F_Tooltip, .A2F_GS:hover + .A2F_Tooltip, .A2F_Health:hover + .A2F_Tooltip, .A2F_Mana:hover + .A2F_Tooltip { visibility: visible !important; }',
        '.pinfobottom { display: none; }',
        'td.tools11, td.tools21 { height: 1px !important; }'
    ];

    var _style = document.createElement('style');
    _style.setAttribute('type', 'text/css');
    _style.innerHTML = css.join('');

    var _head = document.getElementsByTagName('head')[0];
    _head.appendChild(_style);

    var i = 0;

    while (posts[i]) {
        (function() {
            var post = posts[i];

            if (post.level < _A2F.minLevelArmory) {
                posts.splice(i, 1);
                return;
            }

            post.charName = post._name.innerHTML;
            post.name = post._name.href.match(/(\?|&)n=(.*?)(&|$)/)[2];
            post.realm = post._name.href.match(/(\?|&)r=(.*?)(&|$)/)[2];
            post._armory_ = post._name.href + '&rhtml=1';

            var _icon = xpath('.//div[@class="player-icons-race"]', post).iterateNext();
            _icon.style.cursor = 'pointer';

            var mouseoverText = _icon.getAttribute('onmouseover');
            var mouseoverTextPortrait = mouseoverText.replace('</b>', '</b><br /><i>Click to View 3D Portrait</i>');
            _icon.setAttribute('onmouseover', mouseoverTextPortrait);

            _icon.addEventListener('click', function() {
                if (this.getAttribute('onmouseover') != mouseoverText) {
                    _icon.setAttribute('onmouseover', mouseoverText);

                    var _subject = xpath('.//span[@class="white"]/../../..', post).iterateNext();
                    var _portrait = document.createElement('div');
                    _portrait.setAttribute('class', 'A2F_Portrait');
                    _portrait.innerHTML += '<iframe scrolling="no" src="http://' + region + '.wowarmory.com/character-model-embed.xml?r=' + post.realm + '&cn=' + post.name + '"></iframe>';

                    var _button = document.createElement('button');
                    _button.innerHTML = 'Close';
                    _button.addEventListener('click', function() { _subject.removeChild(_portrait); _icon.setAttribute('onmouseover', mouseoverTextPortrait); }, true);
                    _portrait.insertBefore(_button, _portrait.firstChild);

                    _subject.insertBefore(_portrait, _subject.firstChild);
                }
            }, true);

            if (cached(post._armory_)) {
                process(i, true);
            } else {
                i++;
            }
        })();
    }

    if (!posts[0]) {
        return;
    }

    // The following ensures only the active window/tab is processed.
    // Do not circumvent this or you may accidentally ban yourself from WoWArmory.com.

    if (_browser.Chrome) {
        // Chrome does focus/blur strangely:

        var onFocus = function() {
            window.removeEventListener('focus', onFocus, false);

            setTimeout(function() {
                window.addEventListener('blur', onBlur, false);
            }, 50);

            _paused = false;
            queue();
        }

        var onBlur = function() {
            window.removeEventListener('blur', onBlur, false);

            setTimeout(function() {
                window.addEventListener('focus', onFocus, false);
            }, 50);

            if (_timer) {
                clearTimeout(_timer);

                if (posts[0]) {
                    posts[0]._name.setAttribute('class', '');
                }
            }

            _paused = true;
        }

        var makeFocus = function() {
            window.removeEventListener('keypress', makeFocus, false);
            window.removeEventListener('scroll', makeFocus, false);
            window.removeEventListener('mouseover', makeFocus, false);

            window.focus();
        }

        window.addEventListener('keypress', makeFocus, false);
        window.addEventListener('scroll', makeFocus, false);
        window.addEventListener('mouseover', makeFocus, false);
        window.addEventListener('focus', onFocus, false);

        chrome.extension.sendRequest({"action": "tab"}, function(selected) {
            if (selected) {
                onFocus();
            }
        });
    } else {
        // Firefox and Safari work logically:

        var onFocus = function() {
            window.removeEventListener('mouseover', onFocus, false);
            window.removeEventListener('keypress', onFocus, false);
            window.removeEventListener('scroll', onFocus, false);
            window.removeEventListener('focus', onFocus, false);
            window.addEventListener('blur', onBlur, false);

            _paused = false;
            queue();
        }

        var onBlur = function() {
            window.removeEventListener('blur', onBlur, false);
            window.addEventListener('focus', onFocus, false);

            if (_timer) {
                clearTimeout(_timer);

                if (posts[0]) {
                    posts[0]._name.setAttribute('class', '');
                }
            }

            _paused = true;
        }

        window.addEventListener('mouseover', onFocus, false);
        window.addEventListener('keypress', onFocus, false);
        window.addEventListener('scroll', onFocus, false);
        window.addEventListener('focus', onFocus, false);
    }
})();