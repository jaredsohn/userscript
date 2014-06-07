// ==UserScript==
// @name        Show Unplayed Heroes [dotabuff]
// @description Adds a button to show a table containing heroes vs. number of wins
// @namespace   Rissole
// @include     http://dotabuff.com/players/*/heroes?metric=winning*
// @version     1
// @grant       none
// @require http://userscripts.org/scripts/source/68059.user.js
// ==/UserScript==

var HEROES = ["Anti-Mage","Axe","Bane","Bloodseeker","Crystal Maiden","Drow Ranger","Earthshaker","Juggernaut","Mirana","Shadow Fiend","Morphling","Phantom Lancer","Puck","Pudge","Razor","Sand King","Storm Spirit","Sven","Tiny","Vengeful Spirit","Windrunner","Zeus","Kunkka","Lina","Lich","Lion","Shadow Shaman","Slardar","Tidehunter","Witch Doctor","Riki","Enigma","Tinker","Sniper","Necrolyte","Warlock","Beastmaster","Queen of Pain","Venomancer","Faceless Void","Skeleton King","Death Prophet","Phantom Assassin","Pugna","Templar Assassin","Viper","Luna","Dragon Knight","Dazzle","Clockwerk","Leshrac","Nature's Prophet","Lifestealer","Dark Seer","Clinkz","Omniknight","Enchantress","Huskar","Night Stalker","Broodmother","Bounty Hunter","Weaver","Jakiro","Batrider","Chen","Spectre","Doom","Ancient Apparition","Ursa","Spirit Breaker","Gyrocopter","Alchemist","Invoker","Silencer","Outworld Devourer","Lycanthrope","Brewmaster","Shadow Demon","Lone Druid","Chaos Knight","Meepo","Treant Protector","Ogre Magi","Undying","Rubick","Disruptor","Nyx Assassin","Naga Siren","Keeper of the Light","Io","Visage","Slark","Medusa","Troll Warlord","Centaur Warrunner","Magnus","Timbersaw","Bristleback","Tusk","Skywrath Mage","Abaddon","Elder Titan"];

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

var generateWins = function() {
    var played = [];
    $("tbody:first > tr:not(.tableAd)").each(function(i,row) {
        row = $(row);
        var name = row.find("td:nth-child(2)").text();
        var win_rate = Number(row.find("td:nth-child(3)").text().slice(0,-1)) / 100.0;
        var matches = Number(row.find("td:nth-child(4)").text());
        var wins = Math.round(win_rate * matches);
        played.push([name,wins,matches]);
    });

    var playedNames = $.map(played, function(r) { return r[0] });

    $.each(HEROES, function(i, name) {
        if (playedNames.indexOf(name) === -1) {
            //console.log("You haven't played '"+name+"'");
            played.push([name,0,0]);
        }
    });
    
    played.sort(function(a,b) {
        if (a[1] > b[1]) {
            return 1;
        }
        if (a[1] < b[1]) {
            return -1;
        }
        if (a[1] == b[1]) {
            if (a[2] > b[2]) {
                return 1;
            }
            if (a[2] < b[2]) {
                return -1;
            }
            return 0;
        }
    });
    return played;
};

$(function() {
    // if we are on the win rates page, add the view unplayed heroes button
    if (endsWith(document.URL, "?metric=winning")) {
        $('div.filter nav ul').append('<li><a href="'+document.URL+'&rissole=1">Hero Wins</a></li>');
    }
    else if (endsWith(document.URL, "&rissole=1")) {
        $('div.filter nav ul').find('.active').attr('class', '').find('a').attr('href', document.URL.substring(0, document.URL.length-"&rissole=1".length));
        $('div.filter nav ul').append('<li class="active"><a href="'+document.URL+'">Hero Wins</a></li>');
        var theTable = $('#page-content table:first');
        theTable.find('thead > tr').html('<th class="header" colspan="2">Hero</th><th class="header">Wins</th><th class="header">Matches</th>');
        var theTBody = theTable.find('tbody:first');
        var wins = generateWins();
        theTBody.html('');
        $.each(wins, function(i, data) {
            var name = data[0];
            var wins = data[1];
            var matches = data[2];
            var row = '<tr>';
            row += '<td class="cell-icon"><div class="image-container image-container-icon image-container-hero"><a href="/heroes/%l"><img aria-describedby="ui-tooltip-1" oldtitle="%s" alt="%s" class="image-icon image-hero" data-tooltip-url="/heroes/%l/tooltip" rel="tooltip-remote" src="/assets/heroes/%l.png"></a></div></td><td class="cell-xlarge"><a href="/heroes/%l" class="hero-link">%s</a></td>'.replace(/%s/g, name).replace(/%l/g, name.toLowerCase().replace(/ /g, '-').replace(/'/g, ''));
            row += '<td><div>'+wins+'</div></td><td><div>'+matches+'</div></td>';
            row += '</tr>';
            theTBody.append(row);
        });
    }
});