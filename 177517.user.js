// ==UserScript==
// @name       		Roberts Space Industries (Star Citizen) Forum - Full width
// @version    		0.0.2
// @description  	Removes max width restrictions on the forum
// @match      		*://forums.robertsspaceindustries.com/*
// ==/UserScript==

GM_addStyle([
'#Body .wrapper, #Body .Wrapper .content-block4, #Content, body.Profile #Content{max-width: none;}'
].join(''));