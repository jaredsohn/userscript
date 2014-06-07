// ==UserScript==
// @name          Steam DRM & 3rd party service Alerts
// @namespace     https://github.com/rpherbig/steam-drm-alert
// @description   Highlights and warns the user about DRM and 3rd party services on the Steam store
// @include       http://store.steampowered.com/*
// @include       https://store.steampowered.com/*
// @version       1.1
// ==/UserScript==
var drmWords = [
// Each entry must be surrounded by parens so that the back-reference (e.g. $1) replacement will work below
        /(3rd-party DRM)/gi
        ,/(SecuROM)/gi
        ,/(\bTAGES)/gi
        ,/(Solidshield)/gi
        ,/(Starforce)/gi
        ,/(Uniloc)/gi
        ,/(FrontLine ProActive)/gi
        ,/(Games For Windows LIVE)/gi
        ,/(Games For Windows – Live)/gi
        ,/(Games For Windows - Live)/gi
        ,/(Online play requires log-in)/gi
        ,/(www\.gamesforwindows\.com)/gi
        ,/(activate\.ea\.com(\/deauthorize)?)/gi
        ,/(EA Access)/gi
        ,/(Microsoft SSA)/gi
        ,/(Ubisoft’?s? Online Services?( Platform)?)/gi
        ,/((permanent |persistent )(high speed )?Internet( connection| access)?)/gi
        ,/(CREATION OF( A| AN)? UBISOFT ACCOUNT)/gi
        ,/(([0-9]+ |unlimited )?(per (week|month|year) |total )?(machines? )?activations?( limit)?)/gi
        ,/(UPlay)/gi
    ];
var drmFound = [];
function check(el, regex) 
{
    var drm = el.innerHTML.match(regex);
    if (!drm) 
    {
        return;
    }
    el.innerHTML = el.innerHTML.replace(regex, "<span style='color:#000;background-color:#f00'>$1</span>");
    for (var i = 0; i < drm.length; i++) 
    {
        // Prevent duplication
        if(drmFound.indexOf(drm[i]) == -1)
        {
            drmFound.push(drm[i]);
        }
    }
}
for(var i=0 ; i < drmWords.length ; i++)
{
    check(document.body, drmWords[i]);
}
function showWarning() 
{
    var first = document.getElementsByClassName("game_area_purchase_game_wrapper")[0];
    var container = document.getElementById("game_area_purchase");
    var warning = document.createElement("div");
    warning.className = "game_area_purchase_game_wrapper";
    warning.style.backgroundColor = "#FF0000";
    warning.style.color = "#000000";
    warning.innerHTML = "<b>Warning! This product may have DRM or require a 3rd party service: " + drmFound.join(", ") + "</b>";
    container.insertBefore(warning, first);
}
if (drmFound.length !== 0) 
{
    showWarning();
}
for(var i=0 ; i < drmWords.length ; i++)
{
    document.body.match(drmWords[i])
}