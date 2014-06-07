// ==UserScript==
// @name              Battlelog Server Password bypass.
// @namespace         
// @description       Battlelog server password bypass.
// @author            meeekus
// @version           1
// @include           *battlelog.battlefield.com/*
// @include           http://*.battlefield.com/*
// @include           http://*.battlefield.*/*
// @include           *://*.battlefield.com/*
// ==/UserScript==

launcher.verifyPassword = function(game, gameServerGuid, plaintextPassword, callback) { callback(true); }