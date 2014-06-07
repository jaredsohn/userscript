// ==UserScript==
// @name WME ShowHide Waze Sidebar
// @description This script allows you to select from a pre-determined list of map services to display your WME permalink.
// @namespace http://www.leafcreations.org
// @grant none
// @version 0.0.1
// @include https://*.waze.com/editor/*
// @include https://*.waze.com/map-editor/*
// @include https://descartes.waze.com/beta/*
// @include https://descartesw.waze.com/beta/*
// ==/UserScript==

// How To Use:
// 1) Install this script:
//      A) Compatible with Greasemonkey (Firefox) and Tampermonkey (Chrome)
//      B) Chrome > Tools > Extensions
// 2) Refresh Waze (if open)
// 3) Click Button to Show/Hide Side Bar

WMEShowHide = {
    name: 'Show Hide Bar',
    version: '0.0.1'
}

// ******************************************************************************
// INITIATES THE USER SCRIPT - CALLED AT LIST LINE OF SCRIPT
// ******************************************************************************
WMEShowHide.bootstrap = function () {
    var bGreasemonkeyServiceDefined = false;

    try {
        bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
    }
    catch (err) { /* Ignore */ }

    if (typeof unsafeWindow === "undefined" || !bGreasemonkeyServiceDefined) {
        unsafeWindow = (function () {
            var dummyElem = document.createElement('p');
            dummyElem.setAttribute('onclick', 'return window;');
            return dummyElem.onclick();
        })();
    }

    /* begin running the code! */
    setTimeout(WMEShowHide.initialize, 500);
}

// ******************************************************************************
// HELPER FUNCTIONS
// ******************************************************************************
WMEShowHide.helper = {};
WMEShowHide.helper.getId = function (node) {
    return document.getElementById(node);
}

// ******************************************************************************
// HTML HELPER FUNCTIONS
// ******************************************************************************
WMEShowHide.html = {};
WMEShowHide.html.createButton = function (name, text) {
    var item = document.createElement('button');
    item.id = 'showhide';
    item.name = name;
    item.innerHTML = text;
    item.onclick = function () { WMEShowHide.events.showHide() };

    return item
}

// ******************************************************************************
// EVENT HELPER FUNCTIONS
// ******************************************************************************
WMEShowHide.events = {};
WMEShowHide.events.showHide = function () {

    var btn = WMEShowHide.helper.getId('showhide');

    var sidebar = document.getElementsByClassName('pull-left')[0];
    var map = document.getElementsByClassName('fluid-fixed')[0];

    switch (btn.name) {
        case 'Hide':
            sidebar.style.float = 'none';
            sidebar.style.display = 'none';
            map.style.marginLeft = 0;

            btn.name = 'Show';
            btn.innerHTML = '>';
            break;
        case 'Show':
            sidebar.style.float = 'left';
            sidebar.style.display = 'block';
            map.style.marginLeft = '320px';

            btn.name = 'Hide';
            btn.innerHTML = '<';
            break;
    }
    
    WMEShowHide.events.UpdateMap();
    wazeMap.render();

}

WMEShowHide.events.UpdateMap = function () {
    wazeMap.updateSize();    
}

// ******************************************************************************
// BUILDS THE BUTTON
// ******************************************************************************
WMEShowHide.initialize = function () {

    // access the bits of WME we need
    Waze = unsafeWindow.Waze;
    wazeMap = unsafeWindow.wazeMap;
    wazeModel = unsafeWindow.wazeModel;
    loginManager = unsafeWindow.loginManager;
    selectionManager = unsafeWindow.selectionManager;

    var toolbar = WMEShowHide.helper.getId('toolbar');    
    var btn = WMEShowHide.html.createButton('Hide', '<');    
    toolbar.appendChild(btn);    

    var pan = document.getElementsByClassName('olControlPanZoomBar')[0];    
    pan.style.left = '10px';


    wazeMap.events.register("click", null, WMEShowHide.events.UpdateMap);
    wazeMap.events.register("moveend", null, WMEShowHide.events.UpdateMap);
}

WMEShowHide.bootstrap();