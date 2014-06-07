// ==UserScript==
// @name            Wheel Mission Farmer (Based on scripts by Garyzx and Razithel)
// @namespace       BvS-Aleksandyr
// @include         http://www.animecubed.com/billy/bvs/missions/mission*
// @include         http://animecubed.com/billy/bvs/missions/mission*
// @include         http://www.animecubed.com/billy/bvs/missionstart.html
// @include         http://animecubed.com/billy/bvs/missionstart.html
// ==/UserScript==
function process_event(event) {
    var JUTSU_ESCAPE = 374;
    var JUTSU_ADVANCED_REDEYE = 500;
    var JUTSU_I_NEED_THIS = 497;

    //e
    if (event.keyCode == 69) {
        if (document.forms.namedItem("attempt")) {
            //Smoke bomb current mission
            selectJutsu(JUTSU_ESCAPE);
            attemptMission();
        }
        else {
            //New mission
            document.forms.namedItem("domission").wrappedJSObject.submit();
        }
    }

    //w
    if (event.keyCode == 87) {
        if (document.forms.namedItem("attempt")) {
            selectShift();
            selectJutsu(JUTSU_I_NEED_THIS);
            attemptMission();
        }
        else if (document.forms.namedItem("misformtaa") != null) {
            document.forms.namedItem("misformtaa").wrappedJSObject.submit();
        }
        else {
            document.forms.namedItem("backmission").wrappedJSObject.submit();
        }
    }
    
    //r
    if (event.keyCode == 82) {
        if (document.forms.namedItem("attempt")) {
            selectDrift();
            selectJutsu(JUTSU_ADVANCED_REDEYE);
            attemptMission();
        }
        else if (document.forms.namedItem("misformnjn") != null) {
            document.forms.namedItem("misformnjn").wrappedJSObject.submit();
        }
        else {
            document.forms.namedItem("backmission").wrappedJSObject.submit();
        }
    }

    //c
    if (event.keyCode == 67)
        document.forms.namedItem("chakra").wrappedJSObject.submit();
}

function selectShift() {
    var shifters = document.getElementsByName("shifter");
    var shiftersLength = shifters.length;
    for (var i = 0; i < shiftersLength; i++) {
        if (shifters[i].getAttribute("value") == 1) {
            shifters[i].wrappedJSObject.click();
        }
    }
}

function selectDrift() {
    var shifters = document.getElementsByName("shifter");
    var shiftersLength = shifters.length;
    for (var i = 0; i < shiftersLength; i++) {
        if (shifters[i].getAttribute("value") == 3) {
            shifters[i].wrappedJSObject.click();
        }
    }
}

function attemptMission() {
    document.forms.namedItem("attempt").wrappedJSObject.submit();
}

function selectJutsu(jnumber) {
    var jutsu = document.forms.namedItem("attempt").elements;
    for (var i = 0; i < jutsu.length; i++)
    if (jutsu[i].value == jnumber)
    jutsu[i].wrappedJSObject.click();
}

window.addEventListener("keydown", process_event, false);
