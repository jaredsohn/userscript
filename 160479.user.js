// ==UserScript==
// @name           eRepublik Misslie Control
// @namespace      eRepublikMissileControl
// @version        1.1
// @author         ZordaN
// @include        http://www.erepublik.com/*/economy/inventory
// @downloadURL	   http://userscripts.org/scripts/source/160479.user.js
// @updateURL	   http://userscripts.org/scripts/source/160479.meta.js
// ==/UserScript==

function GM_wait(){if(typeof unsafeWindow.jQuery=='undefined'){window.setTimeout(GM_wait,100);}else{$=unsafeWindow.jQuery;letsJQuery();}}
GM_wait();function letsJQuery(){var BRState=localStorage.getItem('BRonoff');var BBState=localStorage.getItem('BBonoff');var BBazState=localStorage.getItem('BBazonoff');$('head').append('<style>.ActiveStateOn{font-weight:bolder;text-shadow:0px 0px 10px green;}.ActiveStateOff{font-weight:bolder;text-shadow:0px 0px 15px red;}</style>');$('div.collection_list').eq(0).before('<h5><center><div id="BBazStateContainer">Build bazookas '+'<button id="SetBBazOn">On</button> <button id="SetBBazOff">Off</button></div><center></h5>');$('div.collection_list.rocket_build').before('<h5><center><div id="BBRBStateContainer">Build rocket '+'<button id="SetBROn">On</button> <button id="SetBROff">Off</button><span style="padding-left:70px"> Build booster '+'<button id="SetBBOn">On</button> <button id="SetBBOff">Off</button></div><center></h5>');$('button#SetBROn').click(function(){localStorage.setItem('BRonoff','on');$('button#SetBROn').addClass('selected');location.href=location.href;});$('button#SetBROff').click(function(){localStorage.setItem('BRonoff','off');location.href=location.href;});if(BRState==='on'){$('button#SetBROn').addClass('ActiveStateOn');}
else{$('a#build_rocket').remove();$('button#SetBROff').addClass('ActiveStateOff');}
$('button#SetBBOn').click(function(){localStorage.setItem('BBonoff','on');$('button#SetBBOn').addClass('selected');location.href=location.href;});$('button#SetBBOff').click(function(){localStorage.setItem('BBonoff','off');location.href=location.href;});if(BBState==='on'){$('button#SetBBOn').addClass('ActiveStateOn');}
else{$('a#build_damage_booster').remove();$('button#SetBBOff').addClass('ActiveStateOff');}
$('button#SetBBazOn').click(function(){localStorage.setItem('BBazonoff','on');$('button#SetBBazOn').addClass('selected');location.href=location.href;});$('button#SetBBazOff').click(function(){localStorage.setItem('BBazonoff','off');location.href=location.href;});if(BBazState==='on'){$('button#SetBBazOn').addClass('ActiveStateOn');}
else{$('a.assemble').eq(0).remove();$('ul.b_parts').append('<span style="padding-left:145px">');$('button#SetBBazOff').addClass('ActiveStateOff');}}