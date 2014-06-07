// ==UserScript==
// @name           BasilMarket Sig
// @namespace      BM
// @include        http://www.basilmarket.com/*
// ==/UserScript==

//GM_setValue('VuCounter', NewCount);

function changeSig(){
  GM_setValue('Sig', prompt("Your current sig is \""+GM_getValue('Sig')+"\"",GM_getValue('Sig')));
}

GM_registerMenuCommand( "Change sig", changeSig );

if (!GM_getValue('Sig')) {
	GM_setValue('Sig', 'Vusys\' sig script. Right click the Greasemonkey icon open \'User Script Commands\' and click \'Change Sig\' to change your sig.');
}

document.getElementById('mainTextarea').value = document.getElementById('mainTextarea').value + '\n\n---\n' + GM_getValue('Sig');