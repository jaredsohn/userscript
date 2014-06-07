// ==UserScript==
// @name       Sandcastle Builder - Script Compilation
// @version    1.0
// @description  Kitten timer + autoclicker, ninja streak keepalive, keyboard multi-clicker
// @match      http://castle.chirpingmustard.com/castle.html
// ==/UserScript==

var kfa = 1;                            // Script startup status (0 = disabled, 1 = enabled)
var kittyTimer = 1;                     // Kitty timer startup status
var kittyChance = 100;                  // Default kitty auto-clicker chance
var npbMaintain = 0;                    // Ninja streak maintainer startup status
var keyboardClicking = 1;               // Keyboard clicking startup status
var clickerKey = 'z';                   // Default key for keyboard clicking
var clickerMethod = 0;                  // Default # of clicks per keypress (0 = 1, 1 = 10, 2 = 100, 3 = 1000)
var kfaMenuActive = 0;
var bindKey = 0;
var keyClicks = Math.pow(10,clickerMethod);
var clickNotify = ' click ';
var triedclick = 0;
var rand;
var key = '';
var firstKey = '';
var originalTitle = document.title;

var kittyFunctions = function() {
    if (Molpy.redactedVisible > 0) {
        if (kittyTimer == 1) { document.title = "! kitten !"; }
        if (triedclick != 1) {
            rand = Math.floor((Math.random()*100)+1);
            if (rand <= kittyChance) {
                Molpy.ClickRedacted();
                triedclick = 0;
            } else { triedclick = 1; }
        }
    } else {
        if (kittyTimer == 1) { document.title = Molpy.redactedToggle-Molpy.redactedCountup; }
        if (triedclick != 0) { triedclick = 0; }
    }
}

var streakMaintainer = function() { if (Molpy.ninjad == 0 && Molpy.npbONG == 1) { Molpy.ClickBeach(); } }

var scriptStatus = function(int) {
    var scriptIsCurrently = '';
    if (int >= 1) { scriptIsCurrently = 'ENABLED';
    } else if (int == 0) { scriptIsCurrently = 'DISABLED';
    }
    return scriptIsCurrently;
}

var reportScriptStatus = function() {
    if (kfa == 0) { Molpy.Notify('Scripts are currently ' + scriptStatus(kfa)); Molpy.Notify('Type \"id\" to enable');
    } else if (kfa == 1) {
        Molpy.Notify('Ninja streak maintainer = ' + scriptStatus(npbMaintain));
        Molpy.Notify('Keyboard clicking = ' + scriptStatus(keyboardClicking) + ' (' + clickerKey + ' = ' + keyClicks + ' clicks)');
        Molpy.Notify('Kitty Timer = ' + scriptStatus(kittyTimer));
        Molpy.Notify('Kitty clicker = ' + scriptStatus(kittyChance) + ' (' + kittyChance + '%)');
    }
}

if (kfa==1) {
    setInterval(kittyFunctions, 1000);
    setInterval(streakMaintainer, 300000);
}

window.setTimeout(function() {
    Molpy.Notify('Scripts are currently ' + scriptStatus(kfa));
    Molpy.Notify('Type \"id\" to toggle scripts');
    Molpy.Notify('Press \"0\" (zero) for script status');
}, 5000)

Molpy.UserScripts=function(k) {
    key = String.fromCharCode(k.keyCode||k.charCode).toLowerCase();
    if (key == 'd' && firstKey == 'i') {
        if (kfa == 1) {
            kfa = 0;
            clearInterval(kittyFunctions);
            clearInterval(streakMaintainer);
            Molpy.Notify('Scripts DISABLED - id to re-enable');
        } else if (kfa == 0) {
            kfa = 1;
            setInterval(kittyFunctions, 1000);
            setInterval(streakMaintainer, 300000);
            Molpy.Notify('Scripts ENABLED - Press + for menu');
        }
    }
    if (key == '0' && clickerKey != '0') { reportScriptStatus(); }
    if (kfa==0) {
        if (key == '+' || key == clickerKey) {
        Molpy.Notify('Scripts are currently DISABLED');
        Molpy.Notify('Type \"id\" to enable'); }
    } else if (kfa == 1) {
        if (keyboardClicking==1) {
            if (key == clickerKey && Molpy.npbONG == 1) {
                if (clickerMethod == 0) { Molpy.ClickBeach();
                } else if (clickerMethod > 0) {
                    var i = 0;
                    while(i<keyClicks) { Molpy.ClickBeach(); i++; }
                }
            }
            if (clickerKey != '') {
                if (key == 't') {
                    clickerMethod++;
                    clickNotify = ' clicks ';
                    if (clickerMethod > 3) { clickerMethod = 0; clickNotify = ' click '; }
                    keyClicks = Math.pow(10,clickerMethod);
                    Molpy.Notify(keyClicks + clickNotify + 'per keypress');
                }
            } else if (bindKey == 1 && key == firstKey && clickerKey == '') {
                clickerKey = key;
                if (clickerKey=='t'||clickerKey=='+'||clickerKey=='0'||clickerKey=='1'||clickerKey=='2'||clickerKey=='3'||clickerKey=='4') {
                    clickerKey = '';
                    Molpy.Notify('Please choose a different key');
                } else {
                    Molpy.Notify('Clicking key bound to ' + clickerKey);
                    Molpy.Notify(keyClicks + clickNotify + 'per keypress');
                    Molpy.Notify('Press T to toggle number of clicks');
                    bindKey = 0;
                }
            }
        }
        if (key=='+') {
            Molpy.Notify('Choose from the following:');
            Molpy.Notify('(1) Toggle ninja streak maintainer');
            Molpy.Notify('(2) Toggle keyboard multi-clicker');
            Molpy.Notify('(3) Toggle kitty timer');
            Molpy.Notify('(4) Adjust kitty autoclicker');
            Molpy.Notify('(0) See script status');
            kfaMenuActive = 1;
        } else if (kfaMenuActive == 1) {
            if (key == '1') {
                if (npbMaintain == 0) {
                    setInterval(streakMaintainer, 300000);
                    npbMaintain = 1;
                    Molpy.Notify('Ninja streak maintainer ENABLED');
                } else if (npbMaintain == 1) {
                    clearInterval(streakMaintainer);
                    npbMaintain = 0;
                    Molpy.Notify('Ninja streak maintainer DISABLED');
                }
                kfaMenuActive = 0;
            } else if (key == '2') {
                if (keyboardClicking == 0) {
                    Molpy.Notify('Keyboard clicking ENABLED');
                    Molpy.Notify('Press key twice to bind clicking key');
                    bindKey = 1;
                    firstKey = '';
                    clickerKey = '';
                    keyboardClicking = 1;
                } else if (keyboardClicking == 1) {
                    keyboardClicking = 0;
                    clickerKey = '';
                    clickerMethod = 0;
                    keyClicks = 1; 
                    Molpy.Notify('Keyboard clicking DISABLED');
                }
                kfaMenuActive = 0;
            } else if (key == '3') {
                if (kittyTimer == 0) {
                    kittyTimer = 1;
                    Molpy.Notify('Kitty Timer ENABLED');
                } else if (kittyTimer == 1) {
                    kittyTimer = 0;
                    Molpy.Notify('Kitty Timer DISABLED');
                    document.title = originalTitle;
                }
                kfaMenuActive = 0;
            } else if (key == '4') {
                kfaMenuActive = 0;
                var chance = prompt("Percent chance of redundakitty auto-click? (1-100)","33");
            }
        }
    }
    firstKey = key;
}

window.onkeypress = Molpy.UserScripts;