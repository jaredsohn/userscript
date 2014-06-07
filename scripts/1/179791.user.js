// ==UserScript==
// @name       CookieClicker Bot
// @version    0.3
// @description  Plays coockie clicker in the most efficient way without clicking on golden/red cookies or the cookie
// @match    http://orteil.dashnet.org/cookieclicker/
// @copyright  2013+, Samuel Martins
// ==/UserScript==
/*This script uses functions and parts of functions from the game, Those are not copyrighted by this script in any way*/
//TODO Create Fixed Timer for next buy
//Implement Achievments

//Calculates Cps Increase from adding clickers
function getClickerCpsIncrease(increase, non_clickers) {
    if (!non_clickers)
        non_clickers = 0;
    var add=0;
    if (Game.Has('Thousand fingers'))
        add+=0.1;
    if (Game.Has('Million fingers'))
        add+=0.5;
    if (Game.Has('Billion fingers'))
        add+=2;
    if (Game.Has('Trillion fingers'))
        add+=10;
    if (Game.Has('Quadrillion fingers'))
        add+=20;
    if (Game.Has('Quintillion fingers'))
        add+=100;
    if (Game.Has('Sextillion fingers'))
        add+=100;
    var num = 0;
    for (var i in Game.Objects) {
        if (Game.Objects[i].name != 'Cursor')
            num += Game.Objects[i].amount + non_clickers;
        }
    add=add*num;
    var cps = Game.ComputeCps(0.1, Game.Has('Reinforced index finger') * 0.1, Game.Has('Carpal tunnel prevention cream') + Game.Has('Ambidextrous'), add);
    return (Game.Objects["Cursor"].amount + increase) * cps - Game.Objects["Cursor"].cps;
}

//Calculates Cps Increase from adding Grandmas
function getGrandmaCpsIncrease(increase, portals) {
    if (!portals)
        portals = 0;
    var mult=0;
    if (Game.Has('Farmer grandmas'))
        mult++;
    if (Game.Has('Worker grandmas'))
        mult++;
    if (Game.Has('Miner grandmas'))
        mult++;
    if (Game.Has('Cosmic grandmas'))
        mult++;
    if (Game.Has('Transmuted grandmas'))
        mult++;
    if (Game.Has('Altered grandmas'))
        mult++;
    if (Game.Has('Grandmas\' grandmas'))
        mult++;
    if (Game.Has('Antigrandmas'))
        mult++;
    if (Game.Has('Bingo center/Research facility'))
        mult+=2;
    if (Game.Has('Ritual rolling pins'))
        mult++;
    if (Game.Has('Steel-plated rolling pins'))
        mult++;
    if (Game.Has('Lubricated dentures'))
        mult++;
    if (Game.Has('Prune juice'))
        mult++;
    if (Game.Has('Double-thick glasses'))
        mult++;
    var add = 0;
    if (Game.Has('One mind'))
        add += (Game.Objects["Grandma"].amount + increase) * 0.02;
    if (Game.Has('Communal brainsweep'))
        add += (Game.Objects["Grandma"].amount + increase) * 0.02;
    if (Game.Has('Elder Pact'))
        add += (Game.Objects['Portal'].amount + portals) * 0.05;
    var cps = Game.ComputeCps(0.5, Game.Has('Forwards from grandma') * 0.3 + add, mult);
    return (Game.Objects["Grandma"].amount + increase) * cps - Game.Objects["Grandma"].cps;
    
}

//Calculates payback and time taken to get of something
function getPaybackAjustedValue(total_cost, cps_increase) {
    var CPS = Game.cookiesPs;
    var Multiplier = Game.globalCpsMult;
    return (total_cost/(Multiplier*cps_increase) + total_cost/CPS)
}

//Gets total price to get needed Buildings plus base upgrade cost
function getTotalPrice(needed, Building, Upgrade) {
    var total_price = 0;
    var price = Building.price;
    var owned = Building.amount;
    if (Upgrade)
        total_price = Upgrade.basePrice;
    if (needed > owned)
        total_price += ((price*(1-Math.pow(1.15,needed-owned)))/-.15);
    return total_price;
}

//Calculates CPS gained from getting a achievment
function getAchievmentCpsIncrease() {
    var mult = 1;
    var kitten_mult = 0;
    var base_cps = Game.cookiesPs/Game.globalCpsMult;
    if (Game.Has('Kitten helpers')) mult *= ( 1 + Game.milkProgress * 0.05);
    if (Game.Has('Kitten workers')) mult *= ( 1 + Game.milkProgress * 0.1);
    if (Game.Has('Kitten engineers')) mult *= ( 1 + Game.milkProgress * 0.2);
    if (Game.Has('Kitten overseers')) mult *= ( 1 + Game.milkProgress * 0.2);
    mult = Game.globalCpsMult/mult;
    milk = Game.milkProgress + 0.04
    kitten_mult = 1;
    if (Game.Has('Kitten helpers')) kitten_mult *= ( 1 + milk * 0.05);
    if (Game.Has('Kitten workers')) kitten_mult *= ( 1 + milk * 0.1);
    if (Game.Has('Kitten engineers')) kitten_mult *= ( 1 + milk * 0.2);
    if (Game.Has('Kitten overseers')) kitten_mult *= ( 1 + milk * 0.2);
    mult = mult * kitten_mult;
    return (base_cps * mult) - Game.cookiesPs;
}

//Calculates payback and time taken to get of an Upgrade
function getUpgradePaybackAjustedValue(name, needed, Building, type, achievment, amount) {
    //TODO Calculate CPS from getting "needed" "Building"s and add to cps_increase
    //TODO Remove cost from return
    var Upgrade = Game.Upgrades[name];
    if (Upgrade == undefined || Building == undefined)
        window.alert("Upgrade/Building named: " + name + " doesn't exist!");
    else {
        var upgrade_cps_increase = 0;
        if (!Game.Has(Upgrade.name)){
            var Object; //Object to return, either an upgrade or a Building
            if (needed > Building.amount)
                Object = Building;
            else
                Object = Upgrade
            if (/grandma/.test(name) == true)
                Building = Game.Objects["Grandma"];
            if (type == "B") //Calculates CPS increase from upgrade types that increase base cps values
                upgrade_cps_increase = Building.amount * amount;
            if (type == "M") {
                if (!amount)
                    amount = 2;
                upgrade_cps_increase = Building.storedTotalCps * amount;
            }
            if (achievment)
                upgrade_cps_increase += getAchievmentCpsIncrease();
            var total_price = getTotalPrice(needed, Building, Upgrade);
            if (needed > Building.amount) {
                var cps_increase;
                needed -= Building.amount;
                if (Building.name == "Cursor")
                    cps_increase = getClickerCpsIncrease(needed);
                else if (Building.name == "Grandma")
                    cps_increase = getGrandmaCpsIncrease(needed);
                else
                    cps_increase = Building.storedCps * needed;
            }
            return [getPaybackAjustedValue(total_price, upgrade_cps_increase), Object];
        }
    }
    return [0, null];
}

//Calculates payback and time taken to get of a Cookie Upgrade
function getCookieUpgradePaybackAjustedValue(name) {
    //TODO Remove cost from return
    var Cookie = Game.Upgrades[name];
    var base_cps = Game.cookiesPs/Game.globalCpsMult;
    if (Cookie == undefined)
        window.alert("Upgrade named: " + name + " doesn't exist!");
    else if (!Game.Has(Cookie.name)) {
        var kitten_mult = 1;
        if (Game.Has('Kitten helpers')) kitten_mult *= ( 1 + Game.milkProgress * 0.05);
        if (Game.Has('Kitten workers')) kitten_mult *= ( 1 + Game.milkProgress * 0.1);
        if (Game.Has('Kitten engineers')) kitten_mult *= ( 1 + Game.milkProgress * 0.2);
        if (Game.Has('Kitten overseers')) kitten_mult *= ( 1 + Game.milkProgress * 0.2);
        var mult = Game.globalCpsMult/kitten_mult;
        mult = (mult + (Cookie.power/100)) * kitten_mult;
        return [getPaybackAjustedValue(Cookie.basePrice, (base_cps * mult) - Game.cookiesPs), Cookie];
    }
    return [0, null];
}

//Calculates payback and time taken to get of a Kitten Upgrade
function getKittenUpgradePaybackAjustedValue(name) {
    //TODO Remove cost from return
    var Kitten = Game.Upgrades[name];
    var base_cps = Game.cookiesPs/Game.globalCpsMult;
    if (Kitten == undefined)
        window.alert("Upgrade named: " + name + " doesn't exist!");
    else if (!Game.Has(Kitten.name)) {
        var kitten_mult = 1;
        if (Game.Has('Kitten helpers')) kitten_mult *= (1 + Game.milkProgress * 0.05);
        if (Game.Has('Kitten workers')) kitten_mult *= (1 + Game.milkProgress * 0.1);
        if (Game.Has('Kitten engineers')) kitten_mult *= (1 + Game.milkProgress * 0.2);
        if (Game.Has('Kitten overseers')) kitten_mult *= (1 + Game.milkProgress * 0.2);
        var mult = Game.globalCpsMult / kitten_mult;
        if (name == "Kitten helpers" && !Game.Has('Kitten helpers')) kitten_mult *= (1 + Game.milkProgress * 0.05);
        if (name == "Kitten workers" && !Game.Has('Kitten workers')) kitten_mult *= (1 + Game.milkProgress * 0.1);
        if (name == "Kitten engineers" && !Game.Has('Kitten engineers')) kitten_mult *= (1 + Game.milkProgress * 0.2);
        if (name == "Kitten overseers" && !Game.Has('Kitten overseers')) kitten_mult *= (1 + Game.milkProgress * 0.2);
        mult = Game.globalCpsMult * kitten_mult;
        return [getPaybackAjustedValue(Kitten.basePrice, (base_cps * mult) - Game.cookiesPs), Kitten];
    }
    return [0, null];
}

//Calculates Best Building to buy.
function getBestBuilding() {
    //TODO Remove cost from return
    var min = Infinity;
    var payback;
    var Building;
    for (i in Game.Objects)
        if ((payback = getPaybackAjustedValue(Game.Objects[i].price, Game.Objects[i].storedCps)) < min) {
            min = payback;
            Building = Game.Objects[i];
        }
    if (min == Infinity && Building == undefined) //This happens when game is new and there are no buildings
        return [1, Game.Objects["Cursor"]];
    return [min, Building];
}

//Calculates Best Upgrade to buy.
function getBestUpgrade() {
    //TODO Remove cost from return
    //TODO Add Bingo Center upgrades
    //Initialize array
    var i;
    var payback_ajusted_value = [];
    for (i = 0; i < Game.UpgradesN; i++) 
        payback_ajusted_value[i] = [];
    //Reset value of i
    i = 0;
    {//payback_ajusted_value functions
    //Cursors
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Reinforced index finger", 1, Game.Objects["Cursor"], "B", Game.HasAchiev["Click"], 0.1);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Carpal tunnel prevention cream", 1, Game.Objects["Cursor"], "M", Game.HasAchiev["Click"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Ambidextrous", 10, Game.Objects["Cursor"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Thousand fingers", 20, Game.Objects["Cursor"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Million fingers", 40, Game.Objects["Cursor"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Billion fingers", 80, Game.Objects["Cursor"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Trillion fingers", 120, Game.Objects["Cursor"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Quadrillion fingers", 160, Game.Objects["Cursor"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Quintillion fingers", 200, Game.Objects["Cursor"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Sextillion fingers", 240, Game.Objects["Cursor"], "M");
    //Grandmas
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Forwards from grandma", 1, Game.Objects["Grandma"], "B", Game.HasAchiev["Grandma's cookies"], 0.3);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Steel-plated rolling pins", 1, Game.Objects["Grandma"], "M", Game.HasAchiev["Grandma's cookies"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Lubricated dentures", 10, Game.Objects["Grandma"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Prune juice", 50, Game.Objects["Grandma"], "M", Game.HasAchiev["Sloppy kisses"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Double-thick glasses", 100, Game.Objects["Grandma"], "M", Game.HasAchiev["Retirement home"]);
    //Needs fixing
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Farmer grandmas", 15, Game.Objects["Farm"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Worker grandmas", 15, Game.Objects["Factory"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Miner grandmas", 15, Game.Objects["Mine"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Cosmic grandmas", 15, Game.Objects["Shipment"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Transmuted grandmas", 15, Game.Objects["Alchemy lab"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Altered grandmas", 15, Game.Objects["Portal"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Grandmas' grandmas", 15, Game.Objects["Time machine"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Antigrandmas", 15, Game.Objects["Antimatter condenser"], "M");
    //Farm
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Cheap hoes", 1, Game.Objects["Farm"], "B", Game.HasAchiev["My first farm"], 1);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Fertilizer", 1, Game.Objects["Farm"], "M", Game.HasAchiev["My first farm"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Cookie trees", 10, Game.Objects["Farm"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Genetically-modified cookies", 50, Game.Objects["Farm"], "M", Game.HasAchiev["Reap what you sow"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Gingerbread scarecrows", 100, Game.Objects["Farm"], "M", Game.HasAchiev["Farm ill"]);
    //Factory
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Sturdier conveyor belts", 1, Game.Objects["Factory"], "B", Game.HasAchiev["Production chain"], 4);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Child labor", 1, Game.Objects["Factory"], "M", Game.HasAchiev["Production chain"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Sweatshop", 10, Game.Objects["Factory"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Radium reactors", 50, Game.Objects["Factory"], "M", Game.HasAchiev["Industrial revolution"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Recombobulators", 100, Game.Objects["Factory"], "M", Game.HasAchiev["Global warming"]);
    //Mine
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Sugar gas", 1, Game.Objects["Mine"], "B", Game.HasAchiev["You know the drill"], 10);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Megadrill", 1, Game.Objects["Mine"], "M", Game.HasAchiev["You know the drill"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Ultradrill", 10, Game.Objects["Mine"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Ultimadrill", 50, Game.Objects["Mine"], "M", Game.HasAchiev["Excavation site"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("H-bomb mining", 100, Game.Objects["Mine"], "M", Game.HasAchiev["Hollow the planet"]);
    //Shipment
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Vanilla nebulae", 1, Game.Objects["Shipment"], "B", Game.HasAchiev["Expedition"], 30);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Wormholes", 1, Game.Objects["Shipment"], "M", Game.HasAchiev["Expedition"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Frequent flyer", 10, Game.Objects["Shipment"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Warp drive", 50, Game.Objects["Shipment"], "M", Game.HasAchiev["Galactic highway"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Chocolate monoliths", 100, Game.Objects["Shipment"], "M", Game.HasAchiev["Far far away"]);
    //Alchemy lab
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Antimony", 1, Game.Objects["Alchemy lab"], "B", Game.HasAchiev["Transmutation"], 100);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Essence of dough", 1, Game.Objects["Alchemy lab"], "M", Game.HasAchiev["Transmutation"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("True chocolate", 10, Game.Objects["Alchemy lab"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Ambrosia", 50, Game.Objects["Alchemy lab"], "M", Game.HasAchiev["Transmogrification"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Aqua crustulae", 100, Game.Objects["Alchemy lab"], "M", Game.HasAchiev["Gold member"]);
    //Portal
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Ancient tablet", 1, Game.Objects["Portal"], "B", Game.HasAchiev["A whole new world"], 1666);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Insane oatling workers", 1, Game.Objects["Portal"], "M", Game.HasAchiev["A whole new world"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Soul bond", 10, Game.Objects["Portal"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Sanity dance", 50, Game.Objects["Portal"], "M", Game.HasAchiev["Now you're thinking"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Brane transplant", 100, Game.Objects["Portal"], "M", Game.HasAchiev["Dimensional shift"]);
    //Time machine
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Flux capacitors", 1, Game.Objects["Time machine"], "B", Game.HasAchiev["Time warp"], 9876);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Time paradox resolver", 1, Game.Objects["Time machine"], "M", Game.HasAchiev["Time warp"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Quantum conundrum", 10, Game.Objects["Time machine"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Causality enforcer", 50, Game.Objects["Time machine"], "M", Game.HasAchiev["Alternate timeline"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Yestermorrow comparators", 100, Game.Objects["Time machine"], "M", Game.HasAchiev["Rewriting history"]);
    //Antimatter condensers
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Sugar bosons", 1, Game.Objects["Antimatter condenser"], "B", Game.HasAchiev["Antibatter"], 99999);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("String theory", 1, Game.Objects["Antimatter condenser"], "M", Game.HasAchiev["Antibatter"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Large macaron collider", 10, Game.Objects["Antimatter condenser"], "M");
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Big bang bake", 50, Game.Objects["Antimatter condenser"], "M", Game.HasAchiev["Quirky quarks"]);
    payback_ajusted_value[i++] = getUpgradePaybackAjustedValue("Reverse cyclotrons", 100, Game.Objects["Antimatter condenser"], "M", Game.HasAchiev["It does matter!"]);
    //Cookies
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Oatmeal raisin cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Peanut butter cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Plain cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Sugar cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Coconut cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("White chocolate cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Macadamia nut cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Double-chip cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("White chocolate macadamia nut cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("All-chocolate cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Dark chocolate-coated cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("White chocolate-coated cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Eclipse cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Zebra cookies");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Snickerdoodles");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Stroopwafels");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Macaroons");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Empire biscuits");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("British tea biscuits");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Chocolate british tea biscuits");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Round british tea biscuits");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Round chocolate british tea biscuits");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Round british tea biscuits with heart motif");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Round chocolate british tea biscuits with heart motif");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Madeleines");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Palets");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Palmiers");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue(Game.UpgradesById[107].name);
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Caramoas");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Sagalongs");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Shortfoils");
    payback_ajusted_value[i++] = getCookieUpgradePaybackAjustedValue("Win mints");
    //Kitten
    payback_ajusted_value[i++] = getKittenUpgradePaybackAjustedValue("Kitten helpers");
    payback_ajusted_value[i++] = getKittenUpgradePaybackAjustedValue("Kitten workers");
    payback_ajusted_value[i++] = getKittenUpgradePaybackAjustedValue("Kitten engineers");
    payback_ajusted_value[i++] = getKittenUpgradePaybackAjustedValue("Kitten overseers");
    }
    //Calculate Best
    i = 0;
    var min = Infinity;
    var Upgrade;
    var price;
    for (i in payback_ajusted_value) {
        if (payback_ajusted_value[i][0] < min && payback_ajusted_value[i][0] > 0) {
            min = payback_ajusted_value[i][0];
            Upgrade = payback_ajusted_value[i][1];
        }
    }
    return [min, Upgrade];
}

function showTimePopup(item, seconds) {
    var showString = 'Buying ' + item + ' in ';
    var remainingSeconds = seconds;
    var days = Math.floor(remainingSeconds / (24 * 60 * 60));        
    if (days > 0) {
        showString += days + "days ";
        remainingSeconds -= days * 24 * 60 * 60;
    }
            
    var hours =  Math.floor(remainingSeconds / (60 * 60));
    if (hours > 0) {
        showString += hours + "h ";
        remainingSeconds -= hours * 60 * 60;
    }
    
    var minutes = Math.floor(remainingSeconds / 60);
    if (minutes > 0) {
        showString += minutes + "m ";
        remainingSeconds -= minutes * 60;
    }
    
    if (remainingSeconds > 0)
        showString += remainingSeconds + "s ";
    if (seconds > 5)
        Game.Popup(showString);
}

var timeoutMiliseconds = 5000;
var timeout = setTimeout(main, timeoutMiliseconds);
/*var load = 0;

function loadBot() {
    if (!load)
        Game.Popup("Cookie Clicker Bot loaded");
    load = 1;
    timeout = setTimeout(main, 2000);
}*/

function main() {
    var best_buy;
    var bought = 0;
    var best_building = getBestBuilding();
    var best_upgrade = getBestUpgrade();
    if (best_building[0] != Infinity || best_upgrade[0] != Infinity) {
        if (best_building[0] < best_upgrade[0])
            best_buy = best_building;
        else 
            best_buy = best_upgrade;
        
    }
    var price = best_buy[1].price;
    if (best_buy) {
        if (best_buy[1].price == undefined) //Upgrade costs
            price = best_buy[1].basePrice;
        if (price <= Game.cookies) {
            best_buy[1].buy();
            Game.Popup('Just bought ' + best_buy[1].name + '.');
            timeoutMiliseconds = 1000/Game.fps;
            bought = 1;
        } else if (bought == 0) {
            bought = 0;
            timeoutMiliseconds = (((price - Game.cookies) / (Game.cookiesPs / Game.fps)) * 1000 + 60) / Game.fps;
            showTimePopup(best_buy[1].name, Math.round((price - Game.cookies) / Game.cookiesPs));
        }
    }
    if (timeoutMiliseconds > 3000)
        timeoutMiliseconds = 3000;
    clearTimeout(timeout);
    timeout = setTimeout(main, timeoutMiliseconds);
}


/*Achievments might come in a later version
//Calculates payback and time taken to get of an Achievement
function getAchievementPaybackAjustedValue(name, Building, needed) {
    var Achievement = Game.Achievements[name];
    if (Achievement == undefined || Building == undefined)
        window.alert("Achievement/Building named: " + name + " doesn't exist!");
    else if (!Achievement.won) {
        var total_price = getTotalPrice(needed, Building);
        return [Building, getPaybackAjustedValue(getTotalPrice(needed, Building), getAchievmentCpsIncrease()), needed-Building.amount];
    }
    return[Building, 0, 0]
}

//Calculates the first n cheapest buildings needed to get the achievment with name "name" and calculates payback ajusted Value
function getCheapestBuildingsPaybackAjustedValue(name) {
    var needed;
    if (!Game.HasAchiev("name")) {
        if (name = "Builder")
            needed = 100;
        if (name = "Architect")
            needed = 400;
        if (name = "Engineer")
            needed = 800;
        
    }
    
}

//Calculates Best Upgrade to get.
function getBestAchievement() {
/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Achievements included in upgrades here not included!!
Passive achievements not included either!
(ie: achievements that require to bake n cookies per second)
Building related achievments not included
(ie own 100, 400, 800 buildings)
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Game.Objects["Cursor"]
Game.Objects["Grandma"]
Game.Objects["Farm"]
Game.Objects["Factory"]
Game.Objects["Mine"]
Game.Objects["Shipment"]
Game.Objects["Alchemy lab"]
Game.Objects["Portal"]
Game.Objects["Time machine"]
Game.Objects["Antimatter condenser"]
//insert end comment here if uncommenting function.

    //Initialize array
    var i;
    var payback_ajusted_value = [];
    for (i = 0; i < Game.UpgradesN; i++) 
        payback_ajusted_value[i] = [];
    //Reset value of i
    i = 0;
    //Cursors
    payback_ajusted_value[i] = getAchievementPaybackAjustedValue("Double-click", Game.Objects["Cursor"], 2);
    payback_ajusted_value[++] = getAchievementPaybackAjustedValue("Mouse wheel", Game.Objects["Cursor"], 50);
    payback_ajusted_value[++] = getAchievementPaybackAjustedValue("Of Mice and Men", Game.Objects["Cursor"], 100);
    payback_ajusted_value[++] = getAchievementPaybackAjustedValue("The Digital", Game.Objects["Cursor"], 200);
    //Grandmas
    payback_ajusted_value[++] = getAchievementPaybackAjustedValue("Friend of the ancients", Game.Objects["Grandma"], 150);
    payback_ajusted_value[++] = getAchievementPaybackAjustedValue("Ruler of the ancients", Game.Objects["Grandma"], 200);
    //Buildings
}*/