// ==UserScript==
// @name			MagicRoomTooltip
// @version			1.0.1.2
// @author			Assada
// @copyright		(C)2014, Assada
// @description		Enable tooltips on MagicRoom Forum
// @run-at			document-end
// @include			http://magicroom.kiev.ua/forum/*
// ==/UserScript==

function appendScript(pathToScript){var head=document.getElementsByTagName("head")[0];var js=document.createElement("script");js.type="text/javascript";js.src=pathToScript;head.appendChild(js);return true;}
if(appendScript("http://deckbox.org/assets/external/tooltip.js"))console.log('Tooltips: Enable');else console.log('Tooltips: Error');