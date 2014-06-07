// ==UserScript==
// @name       		Roberts Space Industries (Star Citizen) Forum - Hide Sigs
// @version    		0.1
// @description  	Removes signatures on the forum
// @match      		*://forums.robertsspaceindustries.com/*
// ==/UserScript==

GM_addStyle([
'.UserSignature{display: none;}'
].join(''));
