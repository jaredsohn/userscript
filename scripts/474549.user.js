// ==UserScript==
// @name           hwm_forge
// @namespace      admirer
// @description    HWM mod - show price for smith based on rates. Based on Demin script hwm_shop
// @version        0.1
// @include        http://*heroeswm.ru/art_info.php?id=*
// @include        http://178.248.235.15/art_info.php?id=*
// @include        http://209.200.152.144/art_info.php?id=*
// @include        http://*lordswm.com/art_info.php?id=*
// ==/UserScript==

// (c) 2010-2014, admirer (http://www.heroeswm.ru/pl_info.php?id=303690) based on (c) demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 ) 

(function() {

var version = '0.1';


if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';

if ( url.match('lordswm') ) {

var sum = /Amount in stock:<\/b> (\d+)/;
var sear = "Required level:";
var searc = /Artifact cost per battle.+<td>(\d+)<\/td>/;
var seard = "Cost:";
var shop = "market";
var text1 = '<b>Cost per battle:</b> ';
var text2 = '&nbsp;&nbsp;Overpay: per battle ';
var text3 = ' all durability ';

var s_text1 = 'Hide artifacts';
var s_text2 = 'Change sections';
var s_author = 'Script writer';
var s_text_menu1 = 'lease';
var s_text_menu2 = 'mod';

var oa_text = 'AP';

} else {

var sum = /\u0434\u043B\u044F \u043F\u0440\u043E\u0434\u0430\u0436\u0438:<\/b> (\d+)/;
var sear = "\u0422\u0440\u0435\u0431\u0443\u0435\u043C\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C:";
var searc = /\u0426\u0435\u043D\u0430 \u0430\u0440\u0435\u043D\u0434\u044B \u043D\u0430 1 \u0431\u043E\u0439.+<td>(\d+)<\/td>/;
var seard = "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C:";
var shop = "\u0440\u044b\u043d\u043e\u043a";
var text1 = '<b>\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C 1 \u0431\u043E\u044F:</b> ';
var text2 = '&nbsp;&nbsp;\u041F\u0435\u0440\u0435\u043F\u043B\u0430\u0442\u0430: \u0437\u0430 \u0431\u043E\u0439 ';
var text3 = ' \u0437\u0430 \u0432\u0441\u044E \u043F\u0440\u043E\u0447\u043A\u0443 ';

var s_text1 = '\u0421\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B';
var s_text2 = '\u0418\u0437\u043C\u0435\u043D\u044F\u0442\u044C \u0440\u0430\u0437\u0434\u0435\u043B\u044B';
var s_author = '\u0410\u0432\u0442\u043E\u0440 \u0441\u043A\u0440\u0438\u043F\u0442\u0430';
var s_text_menu1 = '\u0430\u0440\u0435\u043d\u0434\u0430';
var s_text_menu2 = '\u043c\u043e\u0434';

var oa_text = 'OA';

}


var arts_id_array = document.querySelectorAll("img[src*='/artifacts/'][src$='.jpg']");
if ( arts_id_array.length == 0) {
	arts_id_array = document.querySelectorAll("table[background*='/artifacts/'][background$='.jpg']");
}

for ( var i=0; i<arts_id_array.length; i++ ) {
	var ai = arts_id_array[i].parentNode;
	while ( ai.tagName.toLowerCase()!='tr' ) { ai = ai.parentNode; }
	if ( ai.innerHTML.indexOf(sear)!=-1 ) {
		var ai_pn = ai.parentNode.firstChild.firstChild;
		if ( ai_pn.className == 'wbwhite' ) {
			var arts_id = /id=(\w+)/.exec(url_cur)[1];
            var aj = ai.querySelectorAll("img[src$='/gold.gif']");
            if ( aj[1] != null ) {
            	var arts_rem = /(\d+),(\d+)/.exec(aj[1].parentNode.nextSibling.innerHTML);
                if ( arts_rem ) {
					arts_rem = Number(arts_rem[1])*1000 + Number(arts_rem[2]);
				} else {
					arts_rem = /(\d+)/.exec(aj[1].parentNode.nextSibling.innerHTML);
					arts_rem = Number(arts_rem[1]);
				}
                var bt = document.createElement('td');
				bt.innerHTML = '&nbsp;&nbsp;&nbsp;80%&nbsp;-&nbsp;'+(Math.floor(arts_rem * 0.8))+'&nbsp;&nbsp;&nbsp;&nbsp;75%&nbsp;-&nbsp;'+(Math.floor(arts_rem * 0.75));
				aj[1].parentNode.parentNode.appendChild(bt);
			} else {
            	var arts_rem = /(\d+),(\d+)/.exec(aj[0].parentNode.nextSibling.innerHTML);
    			if ( arts_rem ) {
					arts_rem = Number(arts_rem[1])*1000 + Number(arts_rem[2]);
				} else {
					arts_rem = /(\d+)/.exec(aj[0].parentNode.nextSibling.innerHTML);
					arts_rem = Number(arts_rem[1]);
				}
    			var bt = document.createElement('td');
				bt.innerHTML = '&nbsp;&nbsp;&nbsp;80%&nbsp;-&nbsp;'+(Math.floor(arts_rem * 0.8))+'&nbsp;&nbsp;&nbsp;&nbsp;75%&nbsp;-&nbsp;'+(Math.floor(arts_rem * 0.75));
				aj[0].parentNode.parentNode.appendChild(bt);
			}
		}
	}
}  
})();