// ==UserScript==
// @name           secondaryInfoUnitPower
// @namespace      wargames2
// @description    Show unit powers against unit amounts
// @include        http://www.wargames2.net/SubMenus/SecondaryInfo.aspx
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function showPower(type,node, pwr) {
    var el = document.getElementById("lbl" + node);
    if (el) {
        var elP = document.createElement('p');
        var pwrTxt = Math.round(el.firstChild.nodeValue.replace(",","") * pwr );
        var elPtxt = document.createTextNode("(" + pwrTxt + ")");
        elP.appendChild(elPtxt);
        elP.setAttribute("class","pwr");
        el.parentNode.insertBefore(elP, el.nextSibling);
    }
    if (type=="a") {aTot+=pwrTxt; dTot+=pwrTxt;}
    if (type=="d") dTot+=pwrTxt;
    if (type=="s") sTot+=pwrTxt;
}


var aTot=0;
var dTot=0;
var sTot=0;

addGlobalStyle('td {font-size:70%; !important}');
addGlobalStyle('.pwrC {text-align:center;color:yellow;}');
addGlobalStyle('.pwr {margin-left:10px;color:yellow;display:inline;font-size:80%;margin-top:-5px;}');

showPower("a","RegularTanks",0.37);
showPower("a","HeavyTanks",0.82);
showPower("a","MobileAAs",0.56);
showPower("a","Artilleries",0.88);
showPower("a","RegularJets",0.38);
showPower("a","SupersonicJets",0.58);
showPower("a","Bomber",0.56);
showPower("a","TankDestroyers",0.69);
showPower("a","RegularTroops",0.22);
showPower("a","Flamethrowers",0.51);
showPower("a","NavySeals",0.46);
showPower("a","RPGTroops",0.38);
showPower("a","RegularShips",0.41);
showPower("a","MissileBoats",0.56);
showPower("a","Battleships",0.66);
showPower("a","Submarines",0.62);
showPower("d","RegularTurret",0.32);
showPower("d","CoastalGuns",0.49);
showPower("d","AAGun",0.49);
showPower("d","HeavyCannons",0.47);
showPower("s","RegularSpies",0.1);
showPower("s","HomelandSecurity",0.3);
showPower("s","Ghosts",0.3);
showPower("s","IntelAgents",0.3);

// put the totals text at the end of the page
body = document.getElementsByTagName('body')[0]; if (!body){ return; }

p = document.createElement('p');
p.innerHTML = "<table align=center style='border:1px solid white;color:yellow'>"
             +"<tr><td>Attacking Power</td><td> "+aTot+"</td></tr>"
             +"<tr><td>Defensive Power</td><td> "+dTot+"</td></tr>"
             +"<tr><td>Spy Power</td><td> "+sTot+"</td></tr>"
             +"<tr><td><h4>Total Military Power </h4></td><td><h4> "+(dTot+sTot)+"</h4></td></tr>"
             +"</table>";
body.appendChild(p);
