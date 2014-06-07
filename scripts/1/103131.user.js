// ==UserScript==
// @name		eRepublik Battle Timeout Killer
// @namespace   http://userscripts.org/users/331285
// @description	Removes the annoying message that pops up on battles when doing nothing.
// @version     0.01
// @include		http://www.erepublik.com/en/military/battlefield/*
// ==/UserScript==

function battle_timeout_killer()
{
    // This script is really symple. We'll jus replace globalTick()

    new_globalTick = document.createElement("script");
    new_globalTick.setAttribute("type", "text/javascript");
    new_globalTick.innerHTML =
    'function globalTick() {\
        if (globalSleepTick > 0) {\
            globalSleepTick--;\
        }\
        else {\
            if (!sleepPopupShown) {\
                globalSleepTick = globalSleepTimeout;\
            }\
        }\
    }';

    document.getElementsByTagName("head")[0].appendChild(new_globalTick);
}

// Let's make sure we aren't on a frame for some reason
if (window == top)
{
	battle_timeout_killer();
}