// ==UserScript==
// @name           HWM Unit Exp
// @namespace      HWM
// @include        http://www.heroeswm.ru/army_info.php?name=*
// @author        HAPblB
// @version       0.1
// ==/UserScript==

var emb=document.getElementsByTagName('embed')[2];
var pattern=/(param=)[0-9]{1}\|(M[0-9]{3}):([0-9]{9})([0-9]{3})([0-9]+)([0-9]{5})([0-9]{1})(\w.)/;
emb.getAttribute('FlashVars').match(pattern);
var unit_lvl=RegExp.$7;
var unit_game_id=RegExp.$4;
//alert(unit_game_id);
var unit_exp=RegExp.$6.replace(/^0+/, '');
div = document.createElement('DIV');
div.setAttribute('style', ' z-Index: 999;  background: #F5F3EA; border: #222 solid 2px; margin: 2px; color: #592C08; font-size: 12px; padding: 2px; width: 660px');
div.innerHTML = "Unit_game_id:  "+unit_game_id+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u041E\u043F\u044B\u0442 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0430:  "+unit_exp+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0430:  "+unit_lvl;
emb.parentNode.insertBefore(div,emb);
	
