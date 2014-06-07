// ==UserScript==
// @name       Sandcastle Builder - Multi tool
// @match      http://castle.chirpingmustard.com/castle.html
// ==/UserScript==

//-----***** SETTINGS *****-----
var settings = [];
//-----***** SETTINGS *****-----
//settings are defined with hotkeys
//keycodes are here: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

//Settings are set like this:
//settings["nameOfTheSetting"] = value
//where value can be either a direct value, or an array composed like this:
//
// [value,shortcutKeyCode,isDisplayedInOptionsPanel]
//
// where isDisplayedInOptionsPanel is a boolean (true/false), see autoNinja for example

// or:
//
// [value,shortcutKeyCode,isDisplayedInOptionsPanel,otherPossibleValues]
//
// where otherPossibleValues is an array of values or value/description pairs, see autoClick for example

settings.autoClick = [2, 67, true, [[0, "never"], [1, "once"], [2, "continuous"]]]; //Auto Click the beach (will never click when NPBs are active regardless of setting)
//Default shortcut: c

settings.autoNinja = [true, 78, true]; //Auto ninja NPBs, default shortcut: n

settings.autoLogicat = [true, 0, false]; //solve logicats
settings.autoKitty = [true, 0, false];   //click redundakitties
settings.autoCaged = [true, 0, false];   //solve caged logicats
settings.autoRift = [false, 0, false];   //activate all temporal rifts
settings.autoSnap = [1, 0, false, [[0, "never"], [1, "all NP"], [2, "guaranteed discoveries"]]]; //auto use the camera
settings.autoMoulds = [true, 0, true];  //requires all mold-making boosts
//continually makes/fills moulds up to Glass
settings.autoBuyCaged = [2, 96, true, [[0, "never"], [1, "always"], [2, "renew glass lightning"]]]; //unlock caged logicats when available, default shortcut: 0
settings.autoCagedMin = 0; //minimum glass blocks to keep in storage. 0 to ignore
settings.autoMonty = [true, 0, false]; //picks the goat every time, it seems
settings.autoCrush = [true, 0, false]; //use Castle Crusher if Castles are infinite and Sand is not.

settings.autoPantherRush = [true, 0, true]

settings.autoBuy = [true, 66, false]; //turn on autobuy feature, default shortcut: b
var autoBuyItems = []; //don't touch this line
autoBuyItems.push("Crate Key");
autoBuyItems.push("Locked Crate");
autoBuyItems.push("MHP");
autoBuyItems.push("Locked Vault");
autoBuyItems.push("Vault Key");
autoBuyItems.push("Castle Crusher");
//some of these require Aliases, not full names

settings.GLTimer = [true, 0, true];     //show Glass Lightning power and countdown in the title
settings.kittyTimer = [true, 0, true];  //show kitty countdown in title
settings.ashfTimer = [false, 0, true];  //show ashf countdown in title when active
settings.temporTimer = [true, 0, true]; //show temporal dip countdown in title when active

var loopdelay = 5; //number of times to delay the loop before running more functions

var speed = 1; //Controls how fast the script runs. Lower is faster. Minimum 1.
//Increase this if Sandcastle starts lagging when you load the script
//this directly affects click speed
var displaySpeed = true;
//-----***** END SETTINGS *****-----

//Changelog

//1.7.4.2 - Re-corrected auto moulding so it works when you are in minus world
//1.7.4.1 - Corrected auto moulding to do minus world discoveries
//1.7.4 - Added auto panther rush ability
//
//1.7.3.1 - Corrected auto click (a 0 was in place of a 1, silly me...)
//1.7.3 - Added toggleable options in the game's Options menu
//      - Changed the way settings are declared
//      - Settings with multiple values now cycle through them
//1.7.2 - Added auto ninja, corrected autoClick function so it still clicks when NPBs are ninja'd
//1.7.1 - Corrected autobuy logicat
//      Added:
//          - Keyboard-arrows-time-traveling (left and right for -1 and +1 NP);
//          - Three settings on caged logicat buying (never/always/only renew Glass Lightning (and not push it to 500mNP countdown))
//          - Usable in script addons such as Tampermonkey with use of timed out start
//          - Toggling autoclick between 0 and 2 (never/always) with 'c'
//          - Speed management with + and - on the numpad (+ decreases speed as it increases the time out between loops)
//          - Glass Lightning power/timer in title
//1.7.0 - Added Hotkey recognition - redid variable declaration as a result
//1.6.7 - Reorganized variables/functions
//1.6.6 - Added auto Castle Crush
//1.6.5 - Added Monty Haul door picking
//1.6.4 - Added alias recognition for autobuy
//  - aliases may be REQUIRED for boosts in the shop that have them. Further testing needed
//1.6.3 - Moved autobuyitems into an array to let you buy different things
//1.6.2 - Realized my looping was stupid, moved non-time-sensitive stuff into a single delay
//1.6.1 - Fixed ASHF Countdown
//1.6.0 - Added full Mould Making activities
//1.5.0 - Added title notifications for ASHF and Rifts
//1.4.3 - Removed loop delay for a more useful version. No longer user configurable
//  - Caged logicat & crate key open/solve/buy is now in the proper order to maximize keys
//  - small delay added to above functions so Sandcastle can catch up
//1.4.2 - Added Loop delay for non-clicking functions
//  - moved AutoBuy in front of AutoCaged for more reliable Crate Key purchases
//1.4.1 - Bugfix for Sandcastle 3.189 ('Glass Block Storage' -> 'GlassBlocks')
//1.4.0 - Added autoBuy, auto caged logicat
//1.3.0 - Added automatic Camera
//1.2.2 - Removed typo-fixer function as this is now built into SCB
//1.2.1 - Added notification of settings upon load
//1.2.0 - Added Caged Logicat solving
//1.1.1 - bugfix
//1.1.0 - Added Temporal Rift option
//1.0.0 - Public Release


//Todo/Requested
//Time Travel forwards after Rift
//Countdown timer for Rift


// -- ** DON'T TOUCH ** --
var ver = "1.7.4.2";
var clickedBeach = false;
var lastPicture = Molpy.newpixNumber;
var loop = 0;
var originalTitle = document.title;

function refreshOptions() {
    var speedOption, possibilities, i, j, option, html, value, caption;
    for (i in settings) {
        if (settings[i][2]) {
            option = $('#' + i + 'description');
            if (option.length > 0) {
                html = '<br/>';
                if (settings[i][0] === true) {
                    html += "Yes";
                } else if (settings[i][0] === false) {
                    html += "No";
                } else {
                    possibilities = settings[i][3];
                    for (j = 0; j < possibilities.length; j++) {
                        if (possibilities[j].length > 1) {
                            value = possibilities[j][0];
                            caption = possibilities[j][1];
                        } else {
                            value = possibilities[j];
                            caption = possibilities[j];
                        }
                        if (value === settings[i][0]) {
                            html += caption;
                            break;
                        }
                    }
                }
                option.html(html);
            }
        }
    }
    if (displaySpeed) {
        speedOption = $('#speeddescription');
        if (speedOption.length > 0) {
            html = '<br/>' + speed + '<br/><a onclick="speed(\'up\')">Up!</a>&nbsp;<a onclick="speed(\'down\')">Down!</a></div></div>';
            speedOption.html(html);
        }
    }
}

unsafeWindow.toggleSunnyBeachOption = function (name) {
    var i, possibilities, value, caption;
    if (settings[name][0] === true || settings[name][0] === false) {
        settings[name][0] = !settings[name][0];
    } else {
        if (settings[name].length > 3) {
            possibilities = settings[name][3];
            for (i = 0; i < possibilities.length; i++) {
                if (possibilities[i].length > 1) {
                    value = possibilities[i][0];
                    caption = possibilities[i][1];
                } else {
                    value = possibilities[i];
                    caption = possibilities[3][i];
                }
                if (value === settings[name][0]) {
                    if (possibilities[(i + 1) % possibilities.length].length > 1) {
                        value = possibilities[(i + 1) % possibilities.length][0];
                        caption = possibilities[(i + 1) % possibilities.length][1];
                    } else {
                        value = possibilities[(i + 1) % possibilities.length];
                        caption = possibilities[(i + 1) % possibilities.length];
                    }
                    settings[name][0] = value;
                    Molpy.Notify("SB: Toggled " + name + " to " + caption);
                    break;
                }
            }
        } else {
            Molpy.Notify("SB: Could not toggled " + name);
        }
    }
    refreshOptions();
}

unsafeWindow.speed = function (direction) {
    if (direction !== 'up' && direction !== 'down') {
        return;
    }
    if (direction === 'up') {
        speed += 10;
    }
    if (direction === 'down') {
        speed -= 10;
    }
    Molpy.Notify("SB: speed at " + speed);
    refreshOptions();
}

document.addEventListener('keydown', function (event) {
    var i;
    if (event.keyCode === 107) {
        speed('up');
    } else if (event.keyCode === 109) {
        speed('down');
    } else if (event.keyCode === 39) {
        Molpy.TimeTravel(1);
    } else if (event.keyCode === 37) {
        Molpy.TimeTravel(-1);
    } else {
        for (i in settings) {
            if (event.keyCode === settings[i][1]) {
                toggleSunnyBeachOption(i);
            }
        }
    }
});

function getShortcutDisplay(i) {
    var sd;
    if (settings[i][1] === 0) {
        return '';
    }
    sd = ' [';
    if (settings[i][1] < 96) {
        sd += String.fromCharCode(settings[i][1]);
    } else if (settings[i][1] >= 96 && settings[i][1] <= 105) {
        sd += settings[i][1] - 96;
    } else {
        sd += '<i>' + settings[i][1] + '</i>';
    }
    sd += ']';
    return sd;
}

function addOptions() {
    var optionsBox = $('#optionsItems'), i, j, option, possibilities, value, caption, speedOption;
    if (optionsBox.length > 0) {
        for (i in settings) {
            if (settings[i].length > 2 && settings[i][2]) {
                option = '<div id="optionsFor' + i + '" class="minifloatbox"><a onclick="toggleSunnyBeachOption(\'' + i + '\')">' + i + getShortcutDisplay(i) + '</a><div id="' + i + 'description"><br/>';
                if (settings[i][0] === true) {
                    option += "Yes";
                } else if (settings[i][0] === false) {
                    option += "No";
                } else {
                    possibilities = settings[i][3];
                    for (j = 0; j < possibilities.length; j++) {
                        if (possibilities[j].length > 1) {
                            value = possibilities[j][0];
                            caption = possibilities[j][1];
                        } else {
                            value = possibilities[j];
                            caption = possibilities[j];
                        }
                        if (value === settings[i][0]) {
                            option += caption;
                            break;
                        }
                    }
                }
                option += '</div></div>';
                optionsBox.append(option);
            }
        }
        if (displaySpeed) {
            speedOption = '<div id="optionsForSpeed" class="minifloatbox"><u>Interval between loops (in ms)</u><div id="speeddescription"><br/>' + speed + '<br/><a onclick="speed(\'up\')">Up!</a>&nbsp;<a onclick="speed(\'down\')">Down!</a></div></div>';
            optionsBox.append(speedOption);
        }
    }
}

function mainLoop() {
    if(settings["autoClick"][0] > 0||(settings["autoRift"][0]&&Molpy.Got('Temporal Rift'))){doAutoClick();}
    if(settings["kittyTimer"][0]||settings["ashfTimer"][0]||settings["temporTimer"][0]){doTimers();}
    
    if(settings["autoLogicat"][0]&&Molpy.redactedVisible>0){doAutoLogicat();}
    if(settings["autoKitty"][0]&&Molpy.redactedVisible>0){doAutoKitty();}
    
    if(settings["autoBuy"][0]){doAutoBuy();}
    
    if(settings["autoMonty"][0]){doAutoMonty();}
    
    if(settings["autoCrush"][0]){doAutoCrush();}
    
    if(settings["autoNinja"][0]){doAutoNinja();}
    
    if (settings.autoPantherRush[0]) {
        doAutoPantherRush();
    }
    
    if(loop >= loopdelay){
        if(settings["autoBuyCaged"][0] > 0){doAutoBuyCaged();}
        if(settings["autoCaged"][0]&&Molpy.cagedPuzzleTarget!=undefined){doAutoCaged();}
        if(settings["autoSnap"][0]>0){doAutoSnap();}
        if(settings["autoMoulds"][0]){doAutoMoulds();}
        loop = 0;
    }
    loop+=speed;
    setTimeout(mainLoop, speed);
}
setTimeout(function() { Molpy.Notify("SunnyBeach v"+ver+" loaded",1); addOptions(); mainLoop(); }, 1000);

function doAutoPantherRush() {
    if (Molpy.Boosts['Panther Rush'].unlocked && Molpy.Boosts['Panther Rush'].isAffordable()) {
        Molpy.Boosts['Panther Rush'].buy();
    }
    if (Molpy.Boosts['Panther Rush'].bought) {
        var pr = Molpy.Boosts['Panther Rush'];
        var levels = Molpy.CalcRushCost();
        if(Molpy.Has('Logicat',levels+5))
        {                                
            if(Molpy.Spend('Logicat',levels))
                pr.Add(1);
            levels = Molpy.CalcRushCost();                
            Molpy.LockBoost(pr.alias);
            if(Molpy.Has('Logicat',levels+5))Molpy.UnlockBoost(pr.alias);                
        }
    }
}

function doAutoNinja(){
    if (Molpy.ninjad==0&&Molpy.npbONG==0)
    {
        Molpy.ClickBeach();
    }
}

function doAutoCrush(){
    if(Molpy.castles == 'Infinity' && Molpy.sand != 'Infinity' && Molpy.Got('Castle Crusher')){
        Molpy.CastleCrush();
    }
}

function doAutoMonty(){
    if(Molpy.Boosts['MHP'].bought){
        Molpy.Monty();
    }
}

function doAutoMoulds(){
    var d = ""
    var sandmaker = Molpy.Boosts['SMM'];
    var sandfiller = Molpy.Boosts['SMF'];
    var glassmaker = Molpy.Boosts['GMM'];
    var glassfiller = Molpy.Boosts['GMF'];
    if(Molpy.Got('SMM')&&Molpy.Got('SMF')&&Molpy.Got('GMM')&&Molpy.Got('GMF')){
        for(var i = -Math.abs(Molpy.highestNPvisited);i <= Math.abs(Molpy.highestNPvisited); i++){
            d = 'discov'+i;
            if(Molpy.Badges[d] != undefined && Molpy.Earned(d)){
                sandname = "monums"+i;
                glassname = "monumg"+i;
                if(Molpy.Earned(sandname)==0){
                    if(sandmaker.power == 0&&sandfiller.bought!=i){
                        Molpy.Notify("SB: Making sand mould "+i);
                        Molpy.MakeSandMould(i);
                    }
                }
                if(Molpy.Earned(glassname)==0){
                    if(glassmaker.power == 0&&glassfiller.bought!=i){
                        Molpy.Notify("SB: Making glass mould "+i);
                        Molpy.MakeGlassMould(i);
                    }
                }
                if(sandmaker.power > 100){
                    Molpy.Notify("SB: Filling sand mould "+sandmaker.bought);
                    Molpy.FillSandMould(sandmaker.bought);
                }
                if(glassmaker.power > 400){
                    Molpy.Notify("SB: Filling glass mould "+glassmaker.bought);
                    Molpy.FillGlassMould(glassmaker.bought);
                }
            }
        }
    }
}


function doAutoBuy(){
    for(var i=0;i<Molpy.BoostsInShop.length;i++){
        for(var j = 0;j<autoBuyItems.length;j++){
            if(Molpy.BoostsInShop[i].name == autoBuyItems[j] || Molpy.BoostsInShop[i].alias == autoBuyItems[j]){
                Molpy.Boosts[autoBuyItems[j]].buy();
            }
        }
    }
}

function doTimers(){
    var string = ""
    var countdown = 0;
    if(settings["temporTimer"][0]&&Molpy.Got('Temporal Rift')){
        string = string + "(Rift)";
    }
    if(settings["ashfTimer"][0]&&Molpy.Got('ASHF')){
        string = string + "(ASHF: " + Molpy.Boosts['ASHF'].countdown + ")";
    }
    if(settings["GLTimer"][0]&&Molpy.Boosts['GL'].bought)
    {
        string = string + "(GL: " + Molpify(Molpy.Boosts['GL'].power, 1) + " | " + Molpy.Boosts['GL'].countdown + ")";
    }
    if(settings["kittyTimer"][0]){
        if(Molpy.redactedVisible > 0){
            string = string + "(Kitten)"
        } else {
            countdown = Molpy.redactedToggle - Molpy.redactedCountup;
            string = string + "(RK: " + countdown+ ")";
        }
    }
    if(string!=""){
        document.title = string;
    } else {
        document.title = originalTitle;
    }
}

function doAutoBuyCaged(){
    var mycost=100+Molpy.LogiMult(25);
    if(((settings["autoBuyCaged"][0] == 2&&Molpy.Boosts['GL'].bought==0) || settings["autoBuyCaged"][0] == 1) &&Molpy.Boosts['LogiQuestion'].bought>1 &&Molpy.Boosts['GlassBlocks'].power >= settings["autoCagedMin"]){
        Molpy.MakeCagedPuzzle(mycost);
    }
}

function doAutoSnap(){
    if(Molpy.Got('Camera')){
        if(Molpy.newpixNumber != lastPicture){
            lastPicture = Molpy.newpixNumber;
            if(settings["autoSnap"][0] == 1){
                Molpy.Shutter();
            } else {
                var d = 'discov'+Molpy.newpixNumber;
                if(Molpy.Badges[d] != undefined && !Molpy.Earned(d)){
                    Molpy.Shutter();
                } else if(!Molpy.Badges[d]){
                    Molpy.Notify("No Discovery here",1);
                }
                    }
        }
    }
}

function doAutoClick(){
    if(settings["autoRift"][0]&&Molpy.Got('Temporal Rift')){
        Molpy.ClickBeach();
        return;
    }
    if((Molpy.ninjad==1 || Molpy.npbONG==1) &&!Molpy.Got('Temporal Rift')){
        if(settings["autoClick"][0] == 1){
            if(clickedBeach == false){
                Molpy.ClickBeach();
                clickedBeach = true;
            }
        } else {
            Molpy.ClickBeach();
        }
    } else {
        clickedBeach = false;
    }
}

function doAutoKitty(){
    var highestL = Molpy.redactedDrawType.length - 1;
    if(highestL > 5){
        highestL = 5;
    }
    if(Molpy.redactedPuzzleTarget == undefined){
        Molpy.ClickRedacted(highestL);
    }
}

function doAutoLogicat(){
    var prawda=false;
    if(Molpy.redactedPuzzleTarget != undefined){
        var znak = 65;
        while(prawda == false){
            var litera = String.fromCharCode(znak);
            if(Molpy.redactedSGen.StatementValue(litera) == Molpy.redactedPuzzleTarget){
                Molpy.ClickRedactedPuzzle(litera);
                prawda = true;
                Molpy.redactedPuzzleTarget = undefined;
            } else {
                znak++;
            }
        }
    }
}

function doAutoCaged(){
    if(Molpy.cagedPuzzleValue.charAt(0) == "C"){
        for(var i = 65;i<=90;i++){
            if(Molpy.cagedSGen.StatementValue(String.fromCharCode(i)) == Molpy.cagedPuzzleTarget){
                Molpy.ClickCagedPuzzle(String.fromCharCode(i));
                return;
            }
        }
    }
}