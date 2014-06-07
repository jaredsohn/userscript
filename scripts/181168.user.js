// ==UserScript==
// @name       ulu chutu ultra reconnect0rz
// @namespace  http://uluchutu
// @version    0.2
// @description nothing usefull
// @match      http://battlelog.battlefield.com/bf4/*
// @copyright  2013+, ulu chutu
// ==/UserScript==

base.showReceipt("Hax0red by ulu chutu !");

var hResetModel = BL.backbone.get({view: {name: "ugm_main"}}).reset_model;
var hConnectCancelled = false;
var hReconnectTimer;

BL.backbone.get({view: {name: "ugm_main"}}).reset_model = function()
{
    hConnectCancelled = true;
    try
    {
        hResetModel();
    } catch (e) { };
};


launcher.registerForEvent("error.generic", function(event, game, personaId, errorType, errorCode, errorString) {
    
    
    var timeOut = 1000;
    var reconnect = false;
    switch (errorType)
    {
        case launcher.ALERT.ERR_TOO_MANY_ATTEMPTS:
            reconnect = true;
            timeOut = 5000;
            break;
        case launcher.ALERT.ERR_SERVERCONNECT_FULL:
        case launcher.ALERT.ERR_DISCONNECT_GAME_SERVERFULL:
        case launcher.ALERT.ERR_SERVERCONNECT_SERVERFULL:
            reconnect = true;
            timeOut = 1000;
            break;
    }
    
    
    if (reconnect)
    {
        clearTimeout(hReconnectTimer);
        if (hConnectCancelled)
        {
            hConnectCancelled  = false;
            return;
        }
        
        hReconnectTimer = setTimeout
        ( function() { 
            if (hConnectCancelled) return;
            BL.backbone.get({view: {name: "ugm_main"}}).reconnect();
        }, timeOut);
        console.debug('auto reconnecting..');
    }
    
});
