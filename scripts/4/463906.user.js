// ==UserScript==
// @name        CookieClicker AutoScript (WIP)
// @namespace   
// @version     0.1
// @author      Rattle22
// @include 	
// @description Ultimate Cookieclicker automation Script, WIP
// ==/UserScript==

//automatic reoccuring stuff

setInterval(function () {Game.ClickCookie(); }, 100);

setInterval(function () {if (Game.goldenCookie.life > 0) { Game.goldenCookie.click(); } }, 100);

setInterval(function () {if (Game.seasonPopup.life > 0) { Game.seasonPopup.click(); } }, 100);

var //variables
//general
    me,
    x,
    i,
//script-only related
    interval = 250,
    txtOn = true,
    keepForGolden = true,
    keepForGoldenTxt = "on",
//chosen Item related
    name,
    price,
    cpsItem,
//Item Choosing related
    disallowedUpgrades = [64, 71, 73, 74, 84, 85, 181, 183, 184, 185],
    mustBuyUpgrades = [52, 53, 64, 68, 75, 76, 77, 78, 86, 119, 141, 152, 157, 159, 160, 161, 163, 164, 168, 181, 182, 190, 191],
    currentCps = Game.cookiesPs,
    selected = 0,
    cpc = Number.MAX_VALUE,
    cps1,
    cps2,
    sel,
    myCps,
    cpsUpgrade,
    cpsBuilding,
//Emulation related
    //Copying
    Upgrades = Game.Upgrades,
    UpgradesById = Game.UpgradesById,
    UpgradesInStore = Game.UpgradesInStore,
    Objects = Game.Objects,
    ObjectsById = Game.ObjectsById,
    //Calculating
    cookiesPs = 0,
    mult = 1,
    heavenlyMult,
    milkMult,
    globalCpsMult,
    rawCookiesPs;

//help-functions

function inArray(value, array) {
    var count = array.length,
        i;
    for (i = 0; i < count; i = i + 1) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

var HasAchiev = function (what) {
    return (Game.Achievements[what] ? Game.Achievements[what].won : 0);
};

var Has = function (what) {
    return (Game.Upgrades[what] ? Game.Upgrades[what].bought : 0);
};

//Automatic Wrinklers

function allWrinklers() {
    var wrinkler,
        i;
    for (i in Game.wrinklers) {
        wrinkler = Game.wrinklers[i];
        if (wrinkler.phase !== 2) {
            return false;
        }
    }
    return true;
}

function bestWrinkler() {
    var wrinklerValue = 1,
        wrinkler,
        i = 0;

    for (i in Game.wrinklers) {
        wrinkler = Game.wrinklers[i];
        if (wrinkler.sucked > wrinklerValue) {
            wrinklerValue = wrinkler.sucked;
        }
    }

    for (i in Game.wrinklers) {
        wrinkler = Game.wrinklers[i];
        if (wrinkler.sucked >= wrinklerValue) {
            return i;
        }
    }
}

function wrinklerWorthTxt() {
var wrinklerPosition,
        wrinklerId,
        text = "<br>";
    if (bestWrinkler() !== undefined) {
        wrinklerId = bestWrinkler();
        switch (wrinklerId) {
        case "5":
            wrinklerPosition = "1";
            break;
        case "4":
            wrinklerPosition = "2";
            break;
        case "3":
            wrinklerPosition = "3";
            break;
        case "2":
            wrinklerPosition = "4";
            break;
        case "1":
            wrinklerPosition = "5";
            break;
        case "0":
            wrinklerPosition = "6";
            break;
        case "9":
            wrinklerPosition = "7";
            break;
        case "8":
            wrinklerPosition = "8";
            break;
        case "7":
            wrinklerPosition = "9";
            break;
        case "6":
            wrinklerPosition = "10";
            break;
        }
        if (!allWrinklers()) {
            text += "Not 10 Wrinklers yet!<br>";
        }
        text += "Best wrinkler is Nr." + wrinklerPosition + "(" + Beautify(Game.wrinklers[bestWrinkler()].sucked) + ")";
        return text;
    }
    return "<br>No Wrinklers yet!";
}

//Fun Part: automated buying (dependant on wrinkler stuff)

function copyStuff() {
    Upgrades = Game.Upgrades;
    UpgradesById = Game.UpgradesById;
    UpgradesInStore = Game.UpgradesInStore;
    Objects = Game.Objects;
    ObjectsById = Game.ObjectsById;
}

function CalculateGains() {
    cookiesPs = 0;
    mult = 1;
    for (i in Upgrades) {
        me = Upgrades[i];
        if (me.bought > 0) {
            if (me.type === 'cookie' && Has(me.name)) {
                mult += me.power * 0.01;
            }
        }
    }
    mult += Has('Specialized chocolate chips') * 0.01;
    mult += Has('Designer cocoa beans') * 0.02;
    mult += Has('Underworld ovens') * 0.03;
    mult += Has('Exotic nuts') * 0.04;
    mult += Has('Arcane sugar') * 0.05;

    if (Has('Increased merriness')) {
        mult += 0.15;
    }
    if (Has('Improved jolliness')) {
        mult += 0.15;
    }
    if (Has('A lump of coal')) {
        mult += 0.01;
    }
    if (Has('An itchy sweater')) {
        mult += 0.01;
    }
    if (Has('Santa\'s dominion')) {
        mult += 0.5;
    }

    if (Has('Santa\'s legacy')) {
        mult += (Game.santaLevel + 1) * 0.1;
    }
    if (!Game.prestige.ready) {
        Game.CalculatePrestige();
    }
    heavenlyMult = 0;
    if (Has('Heavenly chip secret')) {
        heavenlyMult += 0.05;
    }
    if (Has('Heavenly cookie stand')) {
        heavenlyMult += 0.20;
    }
    if (Has('Heavenly bakery')) {
        heavenlyMult += 0.25;
    }
    if (Has('Heavenly confectionery')) {
        heavenlyMult += 0.25;
    }
    if (Has('Heavenly key')) {
        heavenlyMult += 0.25;
    }
    mult += parseFloat(Game.prestige['Heavenly chips']) * 0.02 * heavenlyMult;

    for (i in Objects)
            {
            me = Objects[i];
            me.storedCps = (typeof (me.cps) === 'function' ? me.cps() : me.cps);
            me.storedTotalCps = me.amount * me.storedCps;
            cookiesPs += me.storedTotalCps;
        }

    milkMult = Has('Santa\'s milk and cookies') ? 1.05 : 1;
    if (Has('Kitten helpers')) {
        mult *= (1 + Game.milkProgress * 0.05 * milkMult);
    }
    if (Has('Kitten workers')) {
        mult *= (1 + Game.milkProgress * 0.1 * milkMult);
    }
    if (Has('Kitten engineers')) {
        mult *= (1 + Game.milkProgress * 0.2 * milkMult);
    }
    if (Has('Kitten overseers')) {
        mult *= (1 + Game.milkProgress * 0.2 * milkMult);
    }
    if (Has('Kitten managers')) {
        mult *= (1 + Game.milkProgress * 0.2 * milkMult);
    }

    rawCookiesPs = cookiesPs * mult;

    if (Game.frenzy > 0) {
        mult *= Game.frenzyPower;
    }

    if (Has('Elder Covenant')) {
        mult *= 0.95;
    }
    if (Has('Golden switch')) {
        mult *= 1.25;
    }

    globalCpsMult = mult;
    return cookiesPs *= globalCpsMult;
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 65) {
        txtOn = !txtOn;
    } else if (event.keyCode === 71) {
        keepForGolden = !keepForGolden;
        keepForGoldenTxt = keepForGolden ? "on" : "off";
    }
});

//calculates the best item

function OptimalItem() {
    copyStuff();
    for (i = UpgradesInStore.length - 1; i >= 0; i = i - 1) {
        cps1 = 0;
        me = UpgradesInStore[i];
        x = UpgradesInStore[i].id;
        if (inArray(x, mustBuyUpgrades) && me.getPrice() < Game.cookies) {
            sel = me;
            name = me.name;
            price = Math.round(me.basePrice);
            selected = 1;
            return sel;
        }
        if (!inArray(x, disallowedUpgrades)) {
            UpgradesById[x].toggle();
            CalculateGains();
            for (j = ObjectsById.length - 1; j >= 0; j = j - 1) {
                cps1 += ObjectsById[j].cps() * ObjectsById[j].amount;
            }
            cps2 = cps1 * globalCpsMult;
            UpgradesById[x].toggle();
            CalculateGains();
            myCps = cps2 - currentCps;
            cpsUpgrade = me.basePrice * (cookiesPs + myCps) / myCps;
            if (cpsUpgrade < cpc && myCps >= 0.1) {
                cpc = cpsUpgrade;
                sel = me;
                cpsItem = myCps;
                name = me.name;
                price = Math.round(me.basePrice);
            }
        }
    }
    for (i = ObjectsById.length - 1; i >= 0; i = i - 1) {
        cps1 = 0;
        me = ObjectsById[i];
        me.amount = me.amount + 1;
        CalculateGains();
        for (j = ObjectsById.length - 1; j >= 0; j = j - 1) {
            cps1 += ObjectsById[j].cps() * ObjectsById[j].amount;
        }
        cps2 = cps1 * globalCpsMult;
        me.amount = me.amount - 1;
        CalculateGains();
        myCps = cps2 - currentCps;
        cpsBuilding = me.price * (cookiesPs + myCps) / myCps;
        if (cpsBuilding < cpc && myCps >= 0.1) {
            cpc = cpsBuilding;
            sel = me;
            cpsItem = myCps;
            name = me.name;
            price = Math.round(me.price);
        }
    }
    currentCps = cookiesPs;
    selected = 1;

    return sel;
}

function Display() {
var mult, numb, time, wrinklerWorth;
    wrinklerWorth = wrinklerWorthTxt();
    if (txtOn) {
        mult = 1;
        if (Game.frenzy > 0) {
            mult = Game.frenzyPower;
        }

        if (!keepForGolden) {
            time = (price - Game.cookies) / Game.cookiesPs;
        } else if (Game.UpgradesById[86].bought) {
            time = 84000 / mult + (price - Game.cookies) / Game.cookiesPs;
        } else {
            time = 12000 / mult + (price - Game.cookies) / Game.cookiesPs;
        }
        time = time < 0 ? 0 : time;

        numb = (Math.abs(Game.computedMouseCps / Game.cookiesPs));
        numb = numb.toFixed(3);

        Game.Ticker = "Buying " + name + " for " + Beautify(price) + "! <br>ETA : " + Beautify(Math.round(time)) + " w/o clicking" + wrinklerWorth + "<br>Each click saves " + numb + " seconds." + "<br>A: Toggle Text, G: Toggle GC max: " + keepForGoldenTxt;
        Game.TickerAge = interval;
    }
}

var cookieBot = setInterval(function () {
    var mult = 1;
    if (Game.frenzy > 0) {
        mult = Game.frenzyPower;
    }
    OptimalItem();
    if (allWrinklers() && selected === 1 && !keepForGolden && Game.cookies + (Game.wrinklers[bestWrinkler()].sucked * 1.1) >= price) {
        Game.wrinklers[bestWrinkler()].hp = -5;
        OptimalItem().buy();
        selected = 0;
    } else if (allWrinklers() && selected === 1 && keepForGolden && Game.UpgradesById[86].bought && Game.cookies + (Game.wrinklers[bestWrinkler()].sucked * 1.1) >= (price + Game.cookiesPs * 84000 / mult)) {
        Game.wrinklers[bestWrinkler()].hp = -5;
        OptimalItem().buy();
        selected = 0;
    } else if (allWrinklers() && selected === 1 && keepForGolden && !Game.UpgradesById[86].bought && Game.cookies + (Game.wrinklers[bestWrinkler()].sucked * 1.1) >= (price + Game.cookiesPs * 12000 / mult)) {
        Game.wrinklers[bestWrinkler()].hp = -5;
        OptimalItem().buy();
        selected = 0;
    } else if (!allWrinklers() && selected === 1 && !keepForGolden && Game.cookies >= price) {
        OptimalItem().buy();
        selected = 0;
    } else if (!allWrinklers() && selected === 1 && keepForGolden && Game.UpgradesById[86].bought && Game.cookies >= (price + Game.cookiesPs * 84000 / mult)) {
        OptimalItem().buy();
        selected = 0;
    } else if (!allWrinklers() && selected === 1 && keepForGolden && !Game.UpgradesById[86].bought && Game.cookies >= (price + Game.cookiesPs * 12000 / mult)) {
        OptimalItem().buy();
        selected = 0;
    } else if (Game.santaLevel !== 14 && Math.pow(Game.santaLevel + 1, Game.santaLevel + 1) < Game.cookies && Game.UpgradesById[152].bought !== 0) {
        Game.Spend(Math.pow(Game.santaLevel + 1, Game.santaLevel + 1));
        Game.santaLevel = (Game.santaLevel + 1) % 15;
    } else if (selected === 0 || currentCps !== Game.cookiesPs) {
        OptimalItem();
    }
    Display();
}, interval);