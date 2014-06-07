// ==UserScript==
// @name Steam Community Market Fast Buy
// @match http://steamcommunity.com/market/*
// @description Automatically check the 'agree with terms of service' box when buying on steam marketplace
// ==/UserScript==
     
document.getElementById('market_buynow_dialog_accept_ssa').checked = true;
