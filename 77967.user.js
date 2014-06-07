// ==UserScript==
// @name          Challenge Notification Remover for Kongregate Chat
// @namespace     ventero.de
// @include       http://www.kongregate.com/games/*
// @description   This script removes the challenge notification in Kongregate's Chat
// @author        Ventero
// @version       1.0.2
// @date          13.03.2011
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero)
// This script is in the public domain

var script = document.createElement("script");
script.innerHTML = "ChatWindow.prototype.showChatNag = function(){};"
document.body.appendChild(script);
setTimeout(function(){document.body.removeChild(script);}, 100);
