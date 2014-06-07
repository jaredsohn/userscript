// ==UserScript==
// @name           GLB Player Navigation for Season 7
// @namespace      KHMI - Greasemonkey
// @description    Adds a dropdown menu to a player page to aid in navigation, the menu is based on the players found on the user home page.
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @include        http://goallineblitz.com/game/player_awards.pl?player_id=*
// @include        http://goallineblitz.com/game/equipment.pl?player_id=*
// @include        http://goallineblitz.com/game/player_tactics.pl?player_id=*
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// @include        http://goallineblitz.com/game/offers.pl?player_id=*
// @version        09.10.18
// ==/UserScript==

/*
 * 
 * written by peteb @ userscripts.org
 * 
 * modified by pabst 12/23/08+
 */

var timeout = 0;

window.setTimeout( function() {
    var url = window.location.href;

    if (url == "http://goallineblitz.com/game/home.pl") {
        // collect a list of my players from the home page and save them
        var players = [];
        var p = document.getElementsByClassName("playerhead");
        for (var i=0; i<p.length; i++) {
            var a = p[i].getElementsByTagName("a");
            var name = a[0].innerHTML;
            var id = a[0].href.toString();
            id = id.slice(id.indexOf("_id=")+4);
            players.push(id);
            players.push(name);
        }
        if (players.length == 0) {
            var names = document.getElementsByClassName("list_name");
            for (var i=0; i<names.length; i++) {
                var a = names[i].firstChild;
                players.push(a.href.slice(a.href.indexOf("=")+1));
                players.push(a.innerHTML);
            }
        }
        GM_setValue("myPlayers", players.join());
    }
    else {
        // on all the other @include pages show the player navigation
        var savedPlayers = GM_getValue("myPlayers", null);
        var myPlayers= new Array();
        if(savedPlayers != null){
            var players = savedPlayers.split(",");
            for(var i=0;i<players.length;i=i+2){
                myPlayers[players[i]] = players[i+1];
            }
         
            addNavigation(myPlayers);
        }
    }
},timeout);

function addNavigation(playerInfo){
    var url = window.location.href;
    var currentId = url.substring(window.location.href.indexOf('_id=')+4, url.length);
    var currentPage = url.substring(0, url.indexOf('_id=')+4);
   
    if(playerInfo[currentId] && playerInfo.length > 1){
        var html = '<ul class="nav"><li style="font-weight:700;"><span style="margin-right:5px;">' + playerInfo[currentId] + '</span><ul>';
        for (var key in playerInfo){
            if(key != currentId){
                html = html + '<li><a href="' + currentPage + key + '">' + playerInfo[key] + '</a></li>';
            }
        }
        html = html + '</ul></li></ul>';
      
        var players = getElements("*", "class", "big_head subhead_head");
        players[0].innerHTML = html;
      
        // inject the CSS
        var css = 'ul.nav, .nav ul{ background-color:#FBFBF8;margin: 0; padding: 0; cursor: default; list-style-type: none; display: inline;} ' +
        'ul.nav{ display: table;} ' +
        'ul.block{ width: 100%; table-layout: fixed;} ' +
        'ul.nav>li{display: table-cell;position: relative;padding: 2px 6px;background-position:right;background-repeat: no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAaCAIAAAF7nxqgAAAAB3RJTUUH2AYbDS8ZRE4SIgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAABsSURBVHjaY/z9+wcDAwMTAxigUgxAOSYoF4QZIWqBgAWIlzoqooghWDDt6Cx0HdjUIWSxSBInBLGGaLOoYCOJQojQg4Do/feZIBScT3t3YTGeKH1DQxELMgc5rBmQwhmUvtHQAhtJNJEhG04ALZNRuimStFYAAAAASUVORK5CYII=)} ' +
        'ul.nav li:hover{background-position:right;background-repeat: no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAaCAIAAAF7nxqgAAAAB3RJTUUH2AYbDS8nhS8PiQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAABpSURBVHjaY1xgI8nAwMDEAAaoFANQjgnKBWFGiFogYAHi6P33UcQQLJh2dBa6DmzqELJYJIkTglhDtFlUsJFEIUToQcBSR0UmCAXn095dWIwnSt/QUMSCzEEOawakcMYSBEClcOkhHk4AyZAdx5IhKz0AAAAASUVORK5CYII=)} ' +
        'ul.nav li>ul{display: none;position: absolute;max-width: 40ex;margin-left: -6px;margin-top: 2px;} ' +
        'ul.nav li:hover>ul{display : block;z-index:1000;} ' +
        '.nav ul li a{display: block;padding: 2px 10px;} ' +
        '/*Menu styles*/ ' +
        'ul.nav,.nav ul,.nav ul li a{background-color:#FBFBF8;color: #a03c19;} ' +
        'ul.nav li:hover,.nav ul li a:hover{background-color: #a03c19;color: #fff;} ' +
        'ul.nav li:active,.nav ul li a:active{background-color: #036;color: #fff;} ' +
        'ul.nav,.nav ul{border: 1px solid #fbdacf;} ' +
        '.nav a{text-decoration: none;} ';
        addGlobalStyle(css);
    }
}

function getElements(element, classname, value){      
    var elements = [];
    var xpathExp = "//" + element;
   
    if(classname != undefined)
        if(value != undefined)
            xpathExp = xpathExp + "[@" + classname + "='" + value + "']";
        else
            xpathExp = xpathExp + "[@" + classname + "]";
         
    var allElements = document.evaluate(xpathExp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allElements.snapshotLength; i++)
        elements.push(allElements.snapshotItem(i))
      
    return elements;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { 
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
