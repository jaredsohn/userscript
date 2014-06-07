// ==UserScript==
// @name        DOTABUFF  
// @namespace   projects.scripts.dotabuff
// @description Adds link to steam profile, unplayed heroes and more.
// @updateURL   https?://userscripts.org/scripts/source/145318.meta.js
// @include     http*://dotabuff.com*
// @version     1.5.25
// ==/UserScript==
/*
    Can:
    * add steam link to profile
    * add numbers to heroes (disabled by default)
    * add not yet played heroes 
    * add number of games untill all heroes 4 games
    * change highlight for performance on heroes grid page

changes:
    1.5.25: terrorblade, phoenix
    1.5.24: fixed necro, lycan names
    1.5.23: legion
    1.5.22: ember, eart spirit
    1.5.21: fixed doom, OD,wisp/io
    1.5.20: added abaddon
    1.5.19: fixed lack of jquery, and chrome stuff
    1.4.19: added elder titan
    1.4.18: added skywrath
    1.4.17: added bristleback, changed unplayed to 4 since thats how dota2 counts now
    1.4.16: added tusk
    1.4.15: fixed http/s issues
    1.4.13: added troll
    1.4.12: added medusa, fixed magnus/anti-mage
    1.4.11: bugfix
    1.4.10: added timbersaw
    1.4.9 : added slark and number of games untill all 5 (so you would get performance bar in profile)
    1.4.8 : added cent
    1.4.7 : added magnataur
    1.4.6 : added meepo
    1.4.5 : addnumbers activated on dotabuff.com/heroes
    1.4   : added not yet played
*/


/// jquery fix

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// main

function callback() {
var currentURL = (document.location+'');

console.log("a?")
//enabled features

if (currentURL .match(/https?:\/\/dotabuff\.com\/players\/[0-9]*/)) 
{
    addSteamLink();
}
if (currentURL .match(/https?:\/\/dotabuff\.com\/players\/[0-9]*\/heroes/)) {
    addNumbers();
    notPlayedHeroes();
} 
if (currentURL .match(/https?:\/\/dotabuff\.com\/heroes\/.?/)) {
    addNumbers();
}
if (currentURL .match(/https?:\/\/dotabuff\.com\/heroes/)) {
    changeHeroes();
}



///////// STEAM ID

function toSteamID(account)
{
    return '7656119' + (7960265728+(account*1)).toString() ;
}

function addSteamLink()
{

    var accountid = location.pathname.split('/')[2];
    var a = 'http://steamcommunity.com/profiles/'+toSteamID(accountid)+ '/';
    var s = 'http://store.steampowered.com/favicon.ico';
    var style = 'display: inline-block; padding-left: 5px;';

    var d = '<div style="'+style+'"> <a href="'+a+'" target="_blank"> <img src="'+s+'"></a></div>';
    
    $('.content-header-title').children().first().append(d);
}


///////// HERO NUMBER (for easy counting)

function addNumbers()
{
    var i = 1;
    $('.cell-icon').parent().prepend(function(a,b){ return '<td>' + i++ +'</td>';} );
    $('th').parent().prepend('<td style="width: 25px" ></th>');
}

///////// UNPLAYED HEROES

function notPlayedHeroes()
{
    var unplayed = 'abaddon alchemist ancient-apparition anti-mage axe bane batrider beastmaster bloodseeker bounty-hunter brewmaster bristleback broodmother centaur-warrunner chaos-knight chen clinkz clockwerk crystal-maiden dark-seer dazzle death-prophet disruptor doom dragon-knight drow-ranger earth-spirit earthshaker elder-titan ember-spirit enchantress enigma faceless-void gyrocopter huskar invoker io jakiro juggernaut keeper-of-the-light kunkka legion-commander leshrac lich lifestealer lina lion lone-druid luna lycan magnus medusa meepo mirana morphling naga-siren natures-prophet necrophos night-stalker nyx-assassin ogre-magi omniknight outworld-devourer phantom-assassin phantom-lancer phoenix puck pudge pugna queen-of-pain razor riki rubick sand-king shadow-demon shadow-fiend shadow-shaman silencer skywrath-mage slardar slark sniper spectre spirit-breaker storm-spirit sven templar-assassin terrorblade tidehunter timbersaw tinker tiny treant-protector troll-warlord tusk undying ursa vengeful-spirit venomancer viper visage warlock weaver windranger witch-doctor wraith-king zeus ';


    $('.hero-link').each( function(i,a)
    {
        name =  a.href.split('/')[4]+' ';
    
        unplayed= unplayed.replace(name,'');
    });
    //console.log(unplayed);

    var s='';
    notempty = unplayed.split(' ').filter(function(a){return a!=""});
    amount = notempty.length;
    notempty = notempty.join(', ');

    if ( amount >0)
    {
        unplayed = notempty.replace(/-/g,' '); 
        unplayed = unplayed.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

        s = '<div>Not played yet heroes: ' +unplayed + '</div>';
    }

    {  // this part adds number of games until You got visible perf. bar for each hero

        var more = 0;
        $('.hero-link').each(function(a,b){
            v = $(this).parent().next()[0].textContent ;
            
            more += Math.max(0, 4-(v*1)); // for number of games under 5
        });    
        more +=     amount*4;
        if (more>0)
            s+='<div> Matches before all heroes played 4 times: '+more+'</div>';
    }

    $('#page-content').append(s);  

}





//////// TRANSPARENT PNG
// semi transparent png is faster then css "opacity: 0.2;" 
// move very fast on dotabuff.com/heroes page to see difference 
// (highlighting speed)

function addCss(cssString) { 
    var head = document. 
    getElementsByTagName('head')[0]; 
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss); 
} 

function changeHeroes()
{
    // non opacity version
    addCss ( 
        '.tile-container .decorative-backdrop { opacity: 1.0 ; '
        +'background: url("http://i.imgur.com/q7iK0.png") repeat scroll 0 0 transparent; }'
    );
}

}


addJQuery(callback);