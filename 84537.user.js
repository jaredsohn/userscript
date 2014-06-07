// ==UserScript==
// @name           BvS - AP Bar Generator
// @namespace      Thosha
// @description    This script renders a AP progres bar for the DGNT stats
// @include        http://*animecubed.com/billy/bvs/pages/main.html
// @include        http://*animecubed.com/billy/bvs/missions/mission1.html
// @include        http://*animecubed.com/billy/bvs/quest*
// @include        http://*animecubed.com/billy/bvs/arena.html
// @include        http://*animecubed.com/billy/bvs/villagespy*
// @include        http://*animecubed.com/billy/bvs/villageattack*
// @include        http://*animecubed.com/billy/bvs/bingo*
// @version	   1.7.2
// @history        1.7.1 Small fix regarding Level Cap (North)
// @history        1.7 Level Cap for you and your opponent; fixes (North)
// @history        1.6 Script now shows if you have reached level cap! (Thosha)
// @history        1.5.2 Added Spy and Bingo pages (Thosha)
// @history        1.5.1.3 Chrome now has auto update (Thosha)
// @history        1.5 New colours (North)
// @history        0.4 Removed redundant code, Added Percentage tooltip (North)
// @history        0.3 Cross-browser compatibility, Style enhancement (North)
// @history        0.2 Initial release (Thosha)
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2010, Thosha
// ==/UserScript==

// Function to add additonal styles
function addStyle(css){
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    head.appendChild(style);
}

// Insert styles for the bars
addStyle([
    ".apBar { background: #B5B5B5 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAIAAAD6sKMdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJklEQVR42gXBsQ0AMAzDsEL/36vYyJCS7+7YXdqSBBWVmUElCW0/SkgdMub8sZ8AAAAASUVORK5CYII=) repeat-x left top; width: 90%; border: 1px solid black; text-align: left; color: white;}",
    ".apBarDou { background: #4a4a07 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAIAAAD6sKMdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAALklEQVR42gXBQQoAIAhFQX3Q/U8ZhvDFTbuiZuy9wd5ON1SB5ETAnM5aRuZFOh+K0BSu6v8ibAAAAABJRU5ErkJggg==) repeat-x left top; text-align: center;}",
    ".apBarTai { background: #071e4a url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAIAAAD6sKMdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR42gXBiQoAEBBAQfvKj/tXkXKkHFvEjLHuIWNAbVAL0jPMgKjHaOSuxNn5A21aFILfIZVwAAAAAElFTkSuQmCC) repeat-x left top; text-align: center;}",
    ".apBarNin { background: #4a0707 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAIAAAD6sKMdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAALUlEQVR42gXBQQoAIAhFQf8D73/KKAKjTTslZ+y78yQucICQmMCQWGbsKiKzAdgHDWs7Xvp7AAAAAElFTkSuQmCC) repeat-x left top; text-align: center;}",
    ".apBarGen { background: #124a07 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAIAAAD6sKMdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVR42gXBQQ4AEAwAwXYT7/H/BwmREBcH0qoZyZGIrcSCN+ENxSt4UawJtztn2Ad2ABR2S9mVngAAAABJRU5ErkJggg==) repeat-x left top; text-align: center;}"
    ].join("\n"));

function ProgressBar(){
    var playerName;
    var updateLevelCap = function(){
        var items = document.evaluate("//div[@id='pitem']/span/span/font/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var levelCapBonus = 0;
        for (var i = 0; i < items.snapshotLength; i++)
            if(items.snapshotItem(i).innerHTML == 'Knightmare Frame' || items.snapshotItem(i).innerHTML == 'Knightmare Mark 86')
                levelCapBonus += 5;

        if(items.snapshotLength > 0)
            localStorage.setItem(playerName + "_LCB", levelCapBonus);
    }

    var getBarClass = function(color){
        var testColor;
        if(color[0] == '#')
            testColor = color.slice(1);
        else
            testColor = color;

        switch(testColor.toUpperCase()){
            case "4B4B08": case "444400":
                return "apBarDou";
                break;
            case "0B1B98": case "000084":
                return "apBarTai";
                break;
            case "860C1A": case "840000":
                return "apBarNin";
                break;
            case "18750B": case "008400":
                return "apBarGen";
                break;
        }
    }

    var addApBars = function(){
        var main_page, double_page, snap, node, nodeContent;
        var apLine, apHave, apNeed, apWidth, apColor;

        main_page = (location.pathname == '/billy/bvs/pages/main.html') ? true : false;
        snap = document.evaluate("//td[contains(text(),'jutsu:')]/font[position() > 1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        var levelCapBonus =localStorage.getItem(playerName + "_LCB");
        var opponentLevelCapBonus = 0;
        var opponentSeason, season, opponentHasDou;
        if (snap.snapshotLength > 4){
            try{
                var itemList = snap.snapshotItem(0).parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[6].textContent;
                if(/Knightmare.Frame/.test(itemList))
                    opponentLevelCapBonus += 5;
                if(/Knightmare.Mark.86/.test(itemList))
                    opponentLevelCapBonus += 5;
            }catch(e){}

            if(levelCapBonus == null || levelCapBonus < 10){
                itemList = snap.snapshotItem(4).parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[6].textContent;
                levelCapBonus = 0;
                if(/Knightmare.Frame/.test(itemList))
                    levelCapBonus += 5;
                if(/Knightmare.Mark.86/.test(itemList))
                    levelCapBonus += 5;

                localStorage.setItem(playerName + "_LCB", levelCapBonus);
            }

            opponentSeason = snap.snapshotItem(0).parentNode.parentNode.parentNode.textContent.match(/Season \d{1,3}/);
            opponentSeason = (opponentSeason.length > 0) ? opponentSeason[0].match(/\d{1,3}/) : 1;

            opponentHasDou = /Doujutsu/.test(snap.snapshotItem(3).previousSibling.previousSibling.textContent);

            season = snap.snapshotItem(4).parentNode.parentNode.parentNode.textContent.match(/Season \d{1,3}/);
            season = (season.length > 0) ? season[0].match(/\d{1,3}/) : 1;

            double_page = true;
        } else{
            season = document.evaluate("//font/b/i[contains(text(),'Season ')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            season = (season.snapshotLength > 0) ? season.snapshotItem(0).innerHTML.match(/\b\d{1,3}\b/) : 1;

            levelCapBonus = (levelCapBonus == null) ? 0 : parseInt(levelCapBonus);

            double_page = false;
        }

        var levelCap = 18 + 2*season + levelCapBonus;
        if (levelCap > 75)
            levelCap = 75;

        var opponentLevelCap = 18 + 2*opponentSeason + opponentLevelCapBonus;
        if (opponentLevelCap > 75)
            opponentLevelCap = 75;

        for (var i = 0; i < snap.snapshotLength; i++) {
            node = snap.snapshotItem(i);
            nodeContent = node.innerHTML;
            var levelCapped = node.parentNode.childNodes[1].childNodes[0].innerHTML.match(/\b\d{1,2}\b/) == ((double_page && i<(opponentHasDou ? 4 : 3)) ? opponentLevelCap : levelCap);

            apLine = nodeContent.slice(nodeContent.search(/\(/i), nodeContent.search(/\)/i)+1);
            apHave = apLine.slice(apLine.search(/\(/i)+1, apLine.search(/\//i));
            apNeed = apLine.slice(apLine.search(/\//i)+1, apLine.search(/\)/i)-3);
            apWidth = apHave/apNeed*100;
            apColor = node.previousSibling.color;

            var newitem = document.createElement('div');
            newitem.className = 'apBar';
            newitem.style.height = main_page ? "10px" :"8px";
            newitem.style.fontSize = main_page ? "8" :"7";
            newitem.title = 'header=[AP Percentage] body=['+(levelCapped ? 'Level Cap reached' : apWidth.toFixed(2) + '%')+'] thin=[1]';
            newitem.innerHTML = '<DIV class="'+getBarClass(apColor)+'" style="width:'+(levelCapped ? '100' : apWidth)+'%; height: '+newitem.style.height+';">'+(levelCapped ? '<b>MAXED</b>' : '')+'</DIV>';

            if(node.childNodes[node.childNodes.length-1].data.indexOf("AP)") != -1) {
                node.insertBefore(newitem, node.childNodes[node.childNodes.length-1]);
            }
            else {
                node.insertBefore(newitem, node.childNodes[node.childNodes.length-3]);
            }
        }
    }

    return{
        init:function(){
            playerName = document.getElementsByName('player');
            if(playerName.length > 0){
                playerName = playerName[0].value;
                if(location.pathname == '/billy/bvs/pages/main.html')
                    updateLevelCap();

                addApBars();
            }
        }
    }
}

ProgressBar().init();