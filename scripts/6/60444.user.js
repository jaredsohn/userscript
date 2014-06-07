// ==UserScript==
// @name           Funorb Game Adblock
// @description    Removes the ad bar at the top of game pages on FunOrb.
// @include       http://funorb.com/*
// @include       https://funorb.com/*
// @include       http://*.funorb.com/*
// @include       https://*.funorb.com/*
// @namespace      http://www.wurbo.com/*
// @author        KnifeySpooney
// @homepage      http://www.spogg.com/KnifeySpooney
// ==/UserScript==

var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

// Define your CSS here
addStyle("#gameContainer .lft { background-position: 0px -98px !important; height: 38px !important; }");
addStyle("#gameContainer .rght { background-position: 1px -370px !important; height: 38px !important; }");
addStyle("#gameContainer #navigation { background-position: 0px -234px !important; height: 38px !important; }");
addStyle("#gameContainer #banner { display: none; }");
addStyle("#gameContainer #banner, #gameContainer #theGameScreen > p { display: none; }");
addStyle("#game #bodyTheme { padding-top: 0; }");

// Writes CSS to the document
writeStyle(css);
