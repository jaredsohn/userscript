// ==UserScript==
// @name		tws Cookie Clicker Helper
// @namespace		http://tws.nu/
// @version		0.87
// @description		Adds several help and automation functions to Coockie Clicker
// @match		http://orteil.dashnet.org/cookieclicker/*
// @copyright		Flo Sidler, 2013
// ==/UserScript==


/*
 * CONFIG
 * */

// Show CCH at start
showCCHatStart = true;

// How often should auto-buy (if enabled) try to buy the best deal? (in milliseconds)
autoBuyTimeout = 2000;

// If auto-buy can't buy the best deal (not enough cookies) how long should it wait until it tries again? (in milliseconds)
autoBuyImpossibleTimeout = 10000;

// How often should the big cookie be auto clicked (if enabled)? (in milliseconds)
autoBigClickTimeout = 10;

// Have Auto-GoldenCookie-Clicks turned on by default (true / false)
goldenClicksByDefault = true;

// Automatically open the Stats window on start (true / false)
autoOpenStats = true;


/*
 * CODE - Don't touch unless you know what you're doing
 * */
var helperDiv = document.createElement('div');
helperDiv.setAttribute('style', 'color: #FFFFFF; font-family: tahoma; font-size: 10px; vertical-align: bottom; position: absolute; bottom: 35px; left: 1px; z-index: 1000000; border: 1px solid #AAAAAA; padding: 6px; display: none;');
helperDiv.setAttribute('id', 'helperDiv');
document.getElementById('game').appendChild(helperDiv);

var helperHiddenDiv = document.createElement('div');
helperHiddenDiv.setAttribute('style', 'color: #FFFFFF; font-family: tahoma; font-size: 10px; vertical-align: bottom; position: absolute; bottom: 35px; left: 1px; z-index: 1000000; border: 1px solid #AAAAAA; padding: 6px;');
helperHiddenDiv.setAttribute('id', 'helperHiddenDiv');

buildingAmnt = 10; // Amount of buildings there are, for 'for'-loops. REMEMBER: Update functions first. REMEMBER: Starts at 0
helperOpen = false;
autoBuy = false;
autoBuyTimer = false;
autoBuyDeficitWarning = true;
autoBigClick = false;
autoBigClickTimer = false;
researchTimer = false;
autoGoldenClick = false;
if (goldenClicksByDefault) { autoGoldenClick = true; }

twsCCHversion = '0.83';

function numberThousands(nr) {
    return nr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function cpsDisplay(nr) {
    nr = Math.round(nr);
    nr = numberThousands(nr);
    return nr;
}

function priceDisplay(nr) {
    if (nr < 1000000) { return '<1M'; }
    nr = nr / 1000000;
    nr = Math.round(nr);
    nr = numberThousands(nr);
    nr = nr + 'M';
    return nr;
}
function gpcDisplay(nr) {
    if (nr < 0.0001) {
        nr = nr * 1000000;
        nr = Math.round(nr);
        nr = nr / 1000000;
    } else if (nr < 0.1) {
        nr = nr * 10000;
        nr = Math.round(nr);
        nr = nr / 10000;
    } else if (nr < 100) {
        nr = nr * 100;
        nr = Math.round(nr);
        nr = nr / 100;
    } else if (nr < 10000) {
        nr = Math.round(nr);
        nr = numberThousands(nr);
    } else {
        nr = nr / 1000;
        nr = nr * 10;
        nr = Math.round(nr);
        nr = nr / 10;
        nr = nr + 'k';
    }
    return nr;
}

getNames = function() {
    var Names = new Array();
    Names[0]  = 'Crsr';
    Names[1]  = 'GrMa';
    Names[2]  = 'Farm';
    Names[3]  = 'Fcty';
    Names[4]  = 'Mine';
    Names[5]  = 'Shpt';
    Names[6]  = 'Lab';
    Names[7]  = 'Prtl';
    Names[8]  = 'TM';
    Names[9]  = 'AC';
    Names[10] = 'Prsm';
    return Names;
}
getFullNames = function() {
    var Names = new Array();
    Names[0]  = 'Cursor';
    Names[1]  = 'Grandma';
    Names[2]  = 'Farm';
    Names[3]  = 'Factory';
    Names[4]  = 'Mine';
    Names[5]  = 'Shipment';
    Names[6]  = 'Alchemy Lab';
    Names[7]  = 'Portal';
    Names[8]  = 'Time Machine';
    Names[9]  = 'Antimatter Condenser';
    Names[10] = 'Prism';
    return Names;
}
getAmounts = function() {
    var Amounts = new Array();
    Amounts[0]  = Game.Objects['Cursor'].amount;
    Amounts[1]  = Game.Objects['Grandma'].amount;
    Amounts[2]  = Game.Objects['Farm'].amount;
    Amounts[3]  = Game.Objects['Factory'].amount;
    Amounts[4]  = Game.Objects['Mine'].amount;
    Amounts[5]  = Game.Objects['Shipment'].amount;
    Amounts[6]  = Game.Objects['Alchemy lab'].amount;
    Amounts[7]  = Game.Objects['Portal'].amount;
    Amounts[8]  = Game.Objects['Time machine'].amount;
    Amounts[9]  = Game.Objects['Antimatter condenser'].amount;
    Amounts[10] = Game.Objects['Prism'].amount;
    return Amounts;
}
getPrices = function() {
    var Prices = new Array();
    Prices[0]  = Game.Objects['Cursor'].price;
    Prices[1]  = Game.Objects['Grandma'].price;
    Prices[2]  = Game.Objects['Farm'].price;
    Prices[3]  = Game.Objects['Factory'].price;
    Prices[4]  = Game.Objects['Mine'].price;
    Prices[5]  = Game.Objects['Shipment'].price;
    Prices[6]  = Game.Objects['Alchemy lab'].price;
    Prices[7]  = Game.Objects['Portal'].price;
    Prices[8]  = Game.Objects['Time machine'].price;
    Prices[9]  = Game.Objects['Antimatter condenser'].price;
    Prices[10] = Game.Objects['Prism'].price;
	return Prices;
}
getCpsPer = function() {
    var CpsPer = new Array();
    CpsPer[0]  = Game.Objects['Cursor'].cps();
    CpsPer[1]  = Game.Objects['Grandma'].cps();
    CpsPer[2]  = Game.Objects['Farm'].cps();
    CpsPer[3]  = Game.Objects['Factory'].cps();
    CpsPer[4]  = Game.Objects['Mine'].cps();
    CpsPer[5]  = Game.Objects['Shipment'].cps();
    CpsPer[6]  = Game.Objects['Alchemy lab'].cps();
    CpsPer[7]  = Game.Objects['Portal'].cps();
    CpsPer[8]  = Game.Objects['Time machine'].cps();
    CpsPer[9]  = Game.Objects['Antimatter condenser'].cps();
    CpsPer[10] = Game.Objects['Prism'].cps();
    return CpsPer;
}
getGpC = function() {
    var CpsPer = getCpsPer();
    var Prices = getPrices();
    var GpC = new Array();
    GpC[0]  = CpsPer[0] /  Prices[0] *  1000000000;
    GpC[1]  = CpsPer[1] /  Prices[1] *  1000000000;
    GpC[2]  = CpsPer[2] /  Prices[2] *  1000000000;
    GpC[3]  = CpsPer[3] /  Prices[3] *  1000000000;
    GpC[4]  = CpsPer[4] /  Prices[4] *  1000000000;
    GpC[5]  = CpsPer[5] /  Prices[5] *  1000000000;
    GpC[6]  = CpsPer[6] /  Prices[6] *  1000000000;
    GpC[7]  = CpsPer[7] /  Prices[7] *  1000000000;
    GpC[8]  = CpsPer[8] /  Prices[8] *  1000000000;
    GpC[9]  = CpsPer[9] /  Prices[9] *  1000000000;
    GpC[10] = CpsPer[10] / Prices[10] * 1000000000;
    return GpC;
}
translateTime = function(tm) {
    var tm = tm / 30;
    tm = Math.round(tm);
    var tmM = 0;
    var tmS = 0;
    if (tm < 60) {
        tmM = '00';
        tmS = tm;
    } else {
        tmM = Math.floor(tm/60);
        tmS = tm - (tmM * 60);
    }
    if (tmM <= 9 && tmM != 0) { tmM = '0' + tmM; }
    if (tmS <= 9) { tmS = '0' + tmS; }
    return tmM + ':' + tmS;
}

refreshHelper = function() {
    helperOpen = true;
    var newInnerHTML = '';
    // newInnerHTML = newInnerHTML + '';
    
    //
    // Calculations
    
    var Names = getNames();
    var Amounts = getAmounts();
    var Prices = getPrices();
    var CpsPer = getCpsPer();
    var GpC = getGpC();
    
    var bestDealCheck = 0;
    var bestDeal = false;
    var secondBestDeal = false;
    var thirdBestDeal = false;
    for (var i=0; i<=buildingAmnt; i++) { if (GpC[i] > bestDealCheck) { bestDealCheck = GpC[i]; bestDeal = i; } }
    bestDealCheck = 0;
    for (var i=0; i<=buildingAmnt; i++) { if (GpC[i] > bestDealCheck && i != bestDeal) { bestDealCheck = GpC[i]; secondBestDeal = i; } }
    bestDealCheck = 0;
    for (var i=0; i<=buildingAmnt; i++) { if (GpC[i] > bestDealCheck && i != bestDeal && i != secondBestDeal) { bestDealCheck = GpC[i]; thirdBestDeal = i; } }

    
    //
    // Table head
    newInnerHTML = newInnerHTML + '<table border="0">';
    	newInnerHTML = newInnerHTML + '<tr>';
    		newInnerHTML = newInnerHTML + '<td style="padding: 1px 3px; font-weight: bold;">Bldng</td>';
    		newInnerHTML = newInnerHTML + '<td style="padding: 1px 3px; font-weight: bold;">Amnt</td>';
    		newInnerHTML = newInnerHTML + '<td style="padding: 1px 3px; font-weight: bold;">CpS/ea</td>';
    		newInnerHTML = newInnerHTML + '<td style="padding: 1px 3px; font-weight: bold;">Price</td>';
    		newInnerHTML = newInnerHTML + '<td style="padding: 1px 3px; font-weight: bold;">CpS/1bC</td>';
    	newInnerHTML = newInnerHTML + '</tr>';
    newInnerHTML = newInnerHTML + '<tr><td colspan="5"><hr style="height: 1px; border: 0; color: #FFFFFF; background-color: #FFFFFF;"/></td></tr>';
    
    //
    // Rows
    for (var i=0; i<=buildingAmnt; i++) {
        newInnerHTML = newInnerHTML + '<tr';
        if (i == bestDeal) {
            newInnerHTML = newInnerHTML + ' style="background-color: #009116;"';
        } else if (i == secondBestDeal) {
            newInnerHTML = newInnerHTML + ' style="background-color: #839100;"';
        } else if (i == thirdBestDeal) {
            newInnerHTML = newInnerHTML + ' style="background-color: #910000;"';
        }
        newInnerHTML = newInnerHTML + '>';
        newInnerHTML = newInnerHTML + '<td style="padding: 1px 3px; font-weight: bold;">' + Names[i] + '</td>';
        newInnerHTML = newInnerHTML + '<td style="padding: 1px 3px; text-align: right;">' + Amounts[i] + '</td>';
        newInnerHTML = newInnerHTML + '<td style="padding: 1px 3px; text-align: right;">' + cpsDisplay(CpsPer[i]) + '</td>';
        newInnerHTML = newInnerHTML + '<td style="padding: 1px 3px; text-align: right;">' + priceDisplay(Prices[i]) + '</td>';
        newInnerHTML = newInnerHTML + '<td style="padding: 1px 3px; text-align: right;">' + gpcDisplay(GpC[i]) + '</td>';
        newInnerHTML = newInnerHTML + '</tr>';
    }
    
    //
    // Table end
    newInnerHTML = newInnerHTML + '</table>';

    //
    // Refresh link
    newInnerHTML = newInnerHTML + '<hr style="height: 1px; border: 0; color: #FFFFFF; background-color: #FFFFFF; margin-top: 6px;"/>';
    var totalBuildings = 0;
    for (var i = 0; i<=buildingAmnt; i++) {
        totalBuildings = totalBuildings + Amounts[i];
    }
    newInnerHTML = newInnerHTML + 'Total buildings: ' + totalBuildings;
    if (Game.researchT > 0) {
        newInnerHTML = newInnerHTML + '<br/><span>Research: ' + translateTime(Game.researchT) + '</span>';
    }
    if (Game.pledgeT > 0) {
        newInnerHTML = newInnerHTML + '<br/><span>Pledge: ' + translateTime(Game.pledgeT) + ' (' + Game.pledges + ')</span>';
    }
    if (Game.frenzy > 0) {
        newInnerHTML = newInnerHTML + '<br/><span style="font-weight: bold; color: #D1D12A;">FRENZY: ' + translateTime(Game.frenzy) + '</span>';
    }
    if (Game.clickFrenzy > 0) {
        newInnerHTML = newInnerHTML + '<br/><span style="font-weight: bold; color: #D1D12A;">CLICK: ' + translateTime(Game.clickFrenzy) + '</span>';
    }
    newInnerHTML = newInnerHTML + '<hr style="height: 1px; border: 0; color: #FFFFFF; background-color: #FFFFFF; margin-top: 6px;"/>';
    newInnerHTML = newInnerHTML + '<div>';
    newInnerHTML = newInnerHTML + 'Auto-Click: ';
    if (autoBigClick) {
        newInnerHTML = newInnerHTML + '<a href="javascript:autoBigClickOff()" style="color: #FFFFFF;">BigCookie ON</a>';
    } else {
        newInnerHTML = newInnerHTML + '<a href="javascript:autoBigClickOn()" style="color: #FFFFFF;">BigCookie OFF</a>';
    }
    newInnerHTML = newInnerHTML + ' &ndash; ';
    if (autoGoldenClick) {
        if (document.getElementById('goldenCookie').style.display == 'block') {
            var cookieStyle = document.getElementById('goldenCookie').getAttribute('style');
            if (cookieStyle.match(/(goldCookie|hearts)/g)) {
                document.getElementById('goldenCookie').click();
            }
        }
        if (document.getElementById('seasonPopup').style.display == 'block') {
            document.getElementById('seasonPopup').click();
        }
        for (x=0;Game.wrinklers[x];x++) {
            if (Game.wrinklers[x].sucked > 100000) {
                Game.wrinklers[x].hp = 0;
            }
        }
        Game.UpdateWrinklers();
        newInnerHTML = newInnerHTML + '<a href="javascript:autoGoldenClickOff()" style="color: #FFFFFF;">Golden ON</a>';
    } else {
        newInnerHTML = newInnerHTML + '<a href="javascript:autoGoldenClickOn()" style="color: #FFFFFF;">Golden OFF</a>';
    }
    newInnerHTML = newInnerHTML + '</div>';
    newInnerHTML = newInnerHTML + '<div style="margin-top: 3px;">';
        newInnerHTML = newInnerHTML + '<a href="javascript:buyBest(true)" style="color: #FFFFFF;">buy best</a>';
        newInnerHTML = newInnerHTML + ' (<a href="javascript:buyBest(false)" style="color: #FFFFFF;">possible</a>)';
        newInnerHTML = newInnerHTML + ' &ndash; ';
        if (autoBuy) {
            newInnerHTML = newInnerHTML + '<a href="javascript:autoBuyOff()" style="color: #FFFFFF;">auto-buy is ON</a>';
        } else {
            newInnerHTML = newInnerHTML + '<a href="javascript:autoBuyOn()" style="color: #FFFFFF;">auto-buy is OFF</a>';
        }
    newInnerHTML = newInnerHTML + '</div>';
    newInnerHTML = newInnerHTML + '<div style="margin-top: 3px;">';
        newInnerHTML = newInnerHTML + '<span style="font-weight: bold;">tws CCH v' + twsCCHversion + '</b>';
        newInnerHTML = newInnerHTML + ' &ndash; ';
        newInnerHTML = newInnerHTML + '<a href="javascript:hideHelper()" style="color: #FFFFFF;">hide</a>';
    newInnerHTML = newInnerHTML + '<a href="javascript:showHelp()" style="color: #FFFFFF; float: right;">help</a>';
    newInnerHTML = newInnerHTML + '</div>';
    helperDiv.innerHTML = newInnerHTML;
    setTimeout("refreshHelper()", 1000);
}

hideHelper = function() {
    document.getElementById('helperDiv').style.display = 'none';
    document.getElementById('helperHiddenDiv').style.display = 'block';
    helperOpen = false;
    Game.Popup('tws CookieClicker Helper is now closed. Press "show" to show again.');
}
showHelper = function() {
    document.getElementById('helperDiv').style.display = 'block';
    document.getElementById('helperHiddenDiv').style.display = 'none';
    helperOpen = true;
}

buyBest = function(bestOnly) {
    Names = getFullNames();
    GpC = getGpC();
    var bestDealCheck = 0;
    var bestDeal = false;
    var secondBestDeal = false;
    var thirdBestDeal = false;
    for (var i=0; i<=buildingAmnt; i++) { if (GpC[i] > bestDealCheck) { bestDealCheck = GpC[i]; bestDeal = i; } }
    bestDealCheck = 0;
    for (var i=0; i<=buildingAmnt; i++) { if (GpC[i] > bestDealCheck && i != bestDeal) { bestDealCheck = GpC[i]; secondBestDeal = i; } }
    bestDealCheck = 0;
    for (var i=0; i<=buildingAmnt; i++) { if (GpC[i] > bestDealCheck && i != bestDeal && i != secondBestDeal) { bestDealCheck = GpC[i]; thirdBestDeal = i; } }
    var deal1 = document.getElementById('product'+bestDeal);
    if (deal1.getAttribute('class').match(/enabled/g)) {
        deal1.click();
        Game.Popup('Bought ' + Names[bestDeal] + '! (best deal)');
    } else {
        if (!bestOnly) {
            var deal2 = document.getElementById('product'+secondBestDeal);
            if (deal2.getAttribute('class').match(/enabled/g)) {
                deal2.click();
                Game.Popup('Bought ' + Names[secondBestDeal] + '! (second-best deal)');
            } else {
                var deal3 = document.getElementById('product'+thirdBestDeal);
                if (deal3.getAttribute('class').match(/enabled/g)) {
                    deal3.click();
                    Game.Popup('Bought ' + Names[thirdBestDeal] + '! (third-best deal)');
                } else {
                    Game.Popup('Not enough cookies to buy best/second-best/third-best deal.');
                }
            }
        } else {
            Game.Popup('Not enough cookies to buy best deal.');
        }
    }
}

autoBuyDo = function() {
    if (autoBuy) {
        GpC = getGpC();
        Names = getFullNames();
        var bestDealCheck = 0;
        var bestDeal = false;
        for (var i=0; i<=buildingAmnt; i++) { if (GpC[i] > bestDealCheck) { bestDealCheck = GpC[i]; bestDeal = i; } }
        var deal1 = document.getElementById('product'+bestDeal);
        if (deal1.getAttribute('class').match(/enabled/g)) {
            deal1.click();
            refreshHelper();
            Game.Popup('Auto-Bought a ' + Names[bestDeal] + '!');
            autoBuyDeficitWarning = true;
            autoBuyTimer = setTimeout("autoBuyDo()", autoBuyTimeout);
        } else {
            if (autoBuyDeficitWarning) { Game.Popup('Not enough cookies to auto-buy ' + Names[bestDeal] + '.'); }
            autoBuyDeficitWarning = false;
            autoBuyTimer = setTimeout("autoBuyDo()", autoBuyImpossibleTimeout);
        }
    }
}
autoBigClickDo = function() {
    document.getElementById('bigCookie').click();
    autoBigClickTimer = setTimeout("autoBigClickDo()", autoBigClickTimeout);
}

autoBuyOff = function() {
    autoBuy = false;
    clearTimeout(autoBuyTimer);
    Game.Popup('Auto-buy turned OFF!');
    refreshHelper();
}
autoBuyOn = function() {
    autoBuy = true;
    autoBuyTimer = setTimeout("autoBuyDo()", autoBuyTimeout);
    Game.Popup('Auto-buy turned ON!');
    refreshHelper();
}
autoBigClickOn = function () {
    autoBigClick = true;
    autoBigClickTimer = setTimeout("autoBigClickDo()", autoBigClickTimeout);
    Game.Popup('Auto-BigCookie-Click turned ON!');
    refreshHelper();
}
autoBigClickOff = function() {
    autoBigClick = false;
    clearTimeout(autoBigClickTimer);
    Game.Popup('Auto-BigCookie-Click turned OFF!');
    refreshHelper();
}
autoGoldenClickOn = function () {
    autoGoldenClick = true;
    Game.Popup('Auto-GoldenCookie-Click turned ON!');
    refreshHelper();
}
autoGoldenClickOff = function () {
    autoGoldenClick = false;
    Game.Popup('Auto-GoldenCookie-Click turned OFF!');
    refreshHelper();
}


document.getElementById('sectionRight').onclick = function() { if (helperOpen) { refreshHelper(); } }

helperHiddenDiv.innerHTML = '<span style="font-weight: bold;">tws Cookie Clicker Helper v' + twsCCHversion + '</span> &ndash; <a href="javascript:showHelper()" style="color: #FFFFFF;">show</a>';
document.getElementById('game').appendChild(helperHiddenDiv);

//
// Intercept key presses for shortcuts
document.onkeypress = function(e) {
    if (e.which == 42) {
        autoBuyOn();
    } else if (e.which == 43) {
        autoBigClickOn();
	} else if (e.which == 45) {
        autoBigClickOff();
    } else if (e.which == 47) {
        autoBuyOff();
    } else if (e.which == 13) {
        buyBest(true);
    } else if (e.which == 46) {
        buyBest(false);
    } else if (e.which == 48) {
        Game.WriteSave();
    }
}

//
// Help
var helperHelpDiv = document.createElement('div');
helperHelpDiv.setAttribute('style', 'color: #FFFFFF; font-family: tahoma; font-size: 10px; position: absolute; top: 40px; left: 1px; z-index: 1000000; border: 1px solid #AAAAAA; padding: 6px; background-color: #000000; display: none;');
helperHelpDiv.setAttribute('id', 'helperhelp');
helpInnerHTML = '';
helpInnerHTML = helpInnerHTML + '<div style="font-weight: bold; text-decoration: underline;">Hotkeys</div>';
helpInnerHTML = helpInnerHTML + '<table border="0" style="margin-bottom: 12px; margin-top: 3px;">';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">NUMPAD -</td><td style="padding: 1px 3px 1px 6px;">Auto-BigCookie-Click ON</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">NUMPAD +</td><td style="padding: 1px 3px 1px 6px;">Auto-BigCookie-Click OFF</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">NUMPAD /</td><td style="padding: 1px 3px 1px 6px;">Auto-Buy ON</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">NUMPAD *</td><td style="padding: 1px 3px 1px 6px;">Auto-Buy OFF</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">NUMPAD Enter</td><td style="padding: 1px 3px 1px 6px;">Buy Best Deal</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">NUMPAD .</td><td style="padding: 1px 3px 1px 6px;">Buy Best/2nd Best/3rd Best Deal</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">NUMPAD 0</td><td style="padding: 1px 3px 1px 6px;">Save Game</td></tr>';
helpInnerHTML = helpInnerHTML + '</table>';
helpInnerHTML = helpInnerHTML + '<div style="font-weight: bold; text-decoration: underline;">Abbreviations</div>';
helpInnerHTML = helpInnerHTML + '<table border="0" style="margin-bottom: 12px; margin-top: 3px;">';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">CpS</td><td style="padding: 1px 3px 1px 6px;">Cookies per Second</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">Bldng</td><td style="padding: 1px 3px 1px 6px;">Short name of the building</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">Amnt</td><td style="padding: 1px 3px 1px 6px;">Amount owned</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">CpS/ea</td><td style="padding: 1px 3px 1px 6px;">CpS you get from 1 of that building</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;">CpS/1bC</td><td style="padding: 1px 3px 1px 6px;">CpS you\'d get for spending<br/>1 billion cookies on that building</td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;"></td><td style="padding: 1px 3px 1px 6px;"></td></tr>';
    helpInnerHTML = helpInnerHTML + '<tr><td style="padding: 1px 6px 1px 3px;"></td><td style="padding: 1px 3px 1px 6px;"></td></tr>';
helpInnerHTML = helpInnerHTML + '</table>';
helpInnerHTML = helpInnerHTML + '<a href="javascript:hideHelp();">close</a>';
helperHelpDiv.innerHTML = helpInnerHTML;
document.getElementById('game').appendChild(helperHelpDiv);
showHelp = function() { document.getElementById('helperhelp').style.display = 'block'; }
hideHelp = function() { document.getElementById('helperhelp').style.display = 'none'; }

//
// Start the whole thing
setTimeout("refreshHelper()", 1000);
if (showCCHatStart) { setTimeout("showHelper()", 3000); }
if (autoOpenStats) { setTimeout("document.getElementById('statsButton').click()", 1000); }
