// ==UserScript==
// @name           hwm_shop
// @namespace      Demin
// @description    HWM mod - Otobrazhaet stoimost' boja i OA v magazine i infe arta, pereplaty za pokupku i arendu. Dobavljaet bystrye ssylki na rynok (by Demin)
// @homepage       http://userscripts.org/scripts/show/92569
// @version        7.0
// @include        http://*heroeswm.ru/shop.php*
// @include        http://178.248.235.15/shop.php*
// @include        http://209.200.152.144/shop.php*
// @include        http://*lordswm.com/shop.php*
// @include        http://*heroeswm.ru/art_info.php?id=*
// @include        http://178.248.235.15/art_info.php?id=*
// @include        http://209.200.152.144/art_info.php?id=*
// @include        http://*lordswm.com/art_info.php?id=*
// ==/UserScript==

// (c) 2010-2014, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

(function() {

var version = '7.0';


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


var script_num = 92569;
var script_name = "HWM mod - Otobrazhaet stoimost' boja i OA v magazine i infe arta, pereplaty za pokupku i arendu. Dobavljaet bystrye ssylki na rynok (by Demin)";
update_n(version,script_num,script_name);

var url_cur = location.href;
var url = 'http://'+location.hostname+'/';


if ( document.querySelector("body") ) {


var array_arts;
add_array_arts();


var shop_hide_arts = GM_getValue( "shop_hide_arts" , '1' );
var shop_change_sections = GM_getValue( "shop_change_sections" , '1' );


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


if ( location.pathname=='/shop.php' ) {
	var arts_id_array = document.querySelectorAll("a[href^='art_info.php?id=']");
} else {
	var arts_id_array = document.querySelectorAll("img[src*='/artifacts/'][src$='.jpg']");
}


for ( var i=0; i<arts_id_array.length; i++ ) {
var ai = arts_id_array[i].parentNode;
while ( ai.tagName.toLowerCase()!='tr' ) { ai = ai.parentNode; }
if ( ai.innerHTML.indexOf(sear)!=-1 ) {
var ai_pn = ai.parentNode.firstChild.firstChild;
if ( ai_pn.className == 'wbwhite' ) {

// event on click
if ( location.pathname=='/shop.php' ) {
	ai_pn.id = 's' + i;
	addEvent(ai_pn, "click", show_id);
	ai.id = 'hide_s' + i;
}

if ( location.pathname=='/shop.php' ) {
	var arts_id = /id=(\w+)/.exec(arts_id_array[i])[1];
} else {
	var arts_id = /id=(\w+)/.exec(url_cur)[1];
}

if ( array_arts[arts_id] ) {

var now_art = array_arts[arts_id];

if ( now_art[5] == 0 ) {
	var arts_cost_proch = ( Math.floor( now_art[4] * 0.97 ) / now_art[3] ).toFixed(2);
} else {
	var arts_cost_proch = now_art[5].toFixed(2);
}


// price arenda
if ( location.pathname=='/shop.php' ) {
	if ( searc.exec(ai.innerHTML) ) {
		shop_price = Number(searc.exec(ai.innerHTML)[1]);
		var bt = document.createElement('span');
		bt.innerHTML = text1+arts_cost_proch+text2+(shop_price-Number(arts_cost_proch)).toFixed(2)+
			' <font color="gray">('+((shop_price-Number(arts_cost_proch))/Number(arts_cost_proch)*100).toFixed(0)+'%)</font>'+
			text3+Math.round((shop_price-Number(arts_cost_proch))*now_art[3])+'<br>';
		var aj = ai.lastChild.firstChild;
		aj.parentNode.insertBefore(bt, aj.nextSibling);
	}
}


// price one battle
if ( ai.innerHTML.indexOf(seard)!=-1 ) {
	var plus_cost = '';
	if ( now_art[5] == 0 ) {
		plus_cost = '&nbsp;&nbsp;<font color="gray">(+'+(now_art[4]/now_art[3]-Number(arts_cost_proch)).toFixed(2)+')</font>';
	}
	var bt = document.createElement('span');
	bt.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+text1+arts_cost_proch+
	plus_cost+
	'&nbsp;&nbsp;<font color="gray">('+oa_text+': '+(Number(arts_cost_proch)/now_art[6]).toFixed(2)+')</font>';

	var j = 2;
	var aj = ai.lastChild.childNodes[j];
	while ( aj.tagName.toLowerCase()!='b' ) { j++; aj = ai.lastChild.childNodes[j]; }
	if ( /<font color=.?red.?>/.exec(ai.innerHTML) ) { var aj = ai.lastChild.childNodes[j+2]; } else { var aj = ai.lastChild.childNodes[j+1]; }
	aj.parentNode.insertBefore(bt, aj.nextSibling);
}


// price summ
if ( ai.innerHTML.indexOf(seard)!=-1 ) {
	var aj = ai.querySelector("img[src$='/gold.gif']");

	if ( aj.parentNode.nextSibling.innerHTML.match('&nbsp;') ) {
		var bt = document.createElement('td');
		bt.innerHTML = '&nbsp;&nbsp;=&nbsp;&nbsp;';
		aj.parentNode.parentNode.appendChild(bt);

		var bt = aj.parentNode.cloneNode();
		aj.parentNode.parentNode.appendChild(bt);

		var bt = document.createElement('td');
		bt.innerHTML = now_art[4];
		aj.parentNode.parentNode.appendChild(bt);
	}

	// pereplata
	if ( now_art[5] == 0 ) {
		var bt = document.createElement('td');
		bt.innerHTML = '&nbsp;&nbsp;<font color="gray">(-'+(now_art[4]-Math.floor( now_art[4] * 0.97 ))+')</font>';
		aj.parentNode.parentNode.appendChild(bt);
	}
}


// link to market
if ( now_art[1]!='gift' ) {
	var bt = document.createElement('span');
	bt.innerHTML = '&nbsp;&nbsp;<i><font color="gray">[<a href="'+url+'auction.php?cat='+now_art[1]+'&amp;art_type='+arts_id+'"><font color="gray">'+shop+'</font></a>]</font></i>';
	var aj = ai.lastChild.lastChild;
	aj.parentNode.insertBefore(bt, aj.nextSibling);
}


}
}
}
}


if ( location.pathname=='/shop.php' ) {
shop_hide_f();


// nastrojki
var link_transport = document.querySelector("a[href$='shop.php?cat=transport']");
if ( link_transport ) {
var bt = document.createElement('br');
link_transport.parentNode.insertBefore(bt, link_transport.nextSibling);

var bt = document.createElement('li');
bt.innerHTML = '&nbsp;'+s_author+': <a href="pl_info.php?id=15091">Demin</a> <a href="#" onClick="javascript: return (false);" id="open_transfer_id">?</a><br>';
link_transport.parentNode.parentNode.insertBefore(bt, link_transport.parentNode.nextSibling);
addEvent($("open_transfer_id"), "click", open_transfer_f);

var bt = document.createElement('li');
bt.innerHTML = '&nbsp;'+s_text2+': <input type=checkbox '+(shop_change_sections=="1"?"checked":"")+' id=shop_change_sections_id title=""><br>';
link_transport.parentNode.parentNode.insertBefore(bt, link_transport.parentNode.nextSibling);
addEvent($("shop_change_sections_id"), "click", shop_change_sections_f);

var bt = document.createElement('li');
bt.innerHTML = '&nbsp;'+s_text1+': <input type=checkbox '+(shop_hide_arts=="1"?"checked":"")+' id=shop_hide_arts_id title=""><br>';
link_transport.parentNode.parentNode.insertBefore(bt, link_transport.parentNode.nextSibling);
addEvent($("shop_hide_arts_id"), "click", shop_hide_arts_f);
}


// menu
if ( shop_change_sections == '1' ) {
var link_help = document.querySelector("li > a[href*='shop.php?cat=helm']");
if ( !link_help ) { var link_help = document.querySelector("li > a[href*='shop.php?cat=weapon']"); }
var all_a = link_help.parentNode.parentNode.querySelectorAll("a[href*='shop.php?cat=']");
for ( var i=0; i<all_a.length; i++ ) {
var a_i = all_a[i];
if ( a_i.href.indexOf('transport')==-1 && a_i.href.indexOf('gift')==-1 && a_i.href.indexOf('potions')==-1 ) {
a_i.href = a_i.href.split('&rent')[0];

if ( a_i.innerHTML.indexOf("\u0413\u043E\u043B\u043E\u0432\u043D\u044B\u0435 \u0443\u0431\u043E\u0440\u044B")!=-1 ) { a_i.innerHTML = "\u0428\u043B\u0435\u043C\u044B" }
if ( a_i.innerHTML.indexOf("\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B \u043D\u0430 \u0448\u0435\u044E")!=-1 ) { a_i.innerHTML = "\u0410\u043C\u0443\u043B\u0435\u0442\u044B" }

var bt = document.createElement('span');
bt.innerHTML = '&nbsp;<i><font color="gray">[<a href="'+a_i.href+'&amp;rent=1"><font color="gray">'+s_text_menu1+'</font></a>]&nbsp;[<a href="'+a_i.href+'&amp;rent=2"><font color="gray">'+s_text_menu2+'</font></a>]</font></i>';
a_i.parentNode.insertBefore(bt, a_i.nextSibling);
}
}
}


// !========================================
// proverka massiva

var flash_heart = document.querySelector("object > param[value*='heart.swf']");
if ( flash_heart ) flash_heart = flash_heart.parentNode.querySelector("param[name='FlashVars']");
if ( flash_heart ) {
	flash_heart = flash_heart.value.split('|');
	if ( flash_heart[3] ) { var nick = flash_heart[3]; }
}

if ( nick && nick == 'demin' ) {

var arts_id_array = document.querySelectorAll("a[href^='art_info.php?id=']");

if ( url.match('lordswm') ) {
	var proch_regexp = /Durability:<\/b> (\d+)/;
	var uroven_regexp = /Required level:<\/b> (\d+)/;
	var uroven_regexp2 = /Required level:<\/b> <font color=.?red.?><b>(\d+)/;
	var oa_regexp = /Ammunition points:<\/b> (\d+)/;
} else {
	var proch_regexp = /\u041F\u0440\u043E\u0447\u043D\u043E\u0441\u0442\u044C:<\/b> (\d+)/;
	var uroven_regexp = /\u0422\u0440\u0435\u0431\u0443\u0435\u043C\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C:<\/b> (\d+)/;
	var uroven_regexp2 = /\u0422\u0440\u0435\u0431\u0443\u0435\u043C\u044B\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C:<\/b> <font color=.?red.?><b>(\d+)/;
	var oa_regexp = /\u041E\u0447\u043A\u0438 \u0430\u043C\u0443\u043D\u0438\u0446\u0438\u0438:<\/b> (\d+)/;
}

for ( var i=0; i<arts_id_array.length; i++ ) {
	var arts_id = /id=(\w+)/.exec(arts_id_array[i])[1];

	var temp_node = arts_id_array[i].parentNode;
	while ( temp_node.tagName.toLowerCase()!='tr' ) { temp_node = temp_node.parentNode; }

if ( searc.exec(temp_node.innerHTML) ) { break; }

	var arts_proch = proch_regexp.exec(temp_node.innerHTML);
	if ( !arts_proch ) { continue; }
	arts_proch = Number(arts_proch[1]);
	if ( arts_proch == 1 ) { continue; }

if ( !array_arts[arts_id] ) { alert("hwm_shop: needs to be updated! :1, "+arts_id); break; }
var now_art = array_arts[arts_id];

if ( arts_proch != now_art[3] ) { alert("hwm_shop: needs to be updated! :2, "+arts_id); break; }

	var arts_oa = Number(oa_regexp.exec(temp_node.innerHTML)[1]);

if ( arts_oa != now_art[6] ) { alert("hwm_shop: needs to be updated! :3, "+arts_id); break; }

	var arts_res = temp_node.querySelector("img[src$='/gold.gif']").parentNode.nextSibling.innerHTML;
	var arts_gold = /(\d+),(\d+)/.exec(arts_res);
	if ( arts_gold ) {
		arts_gold = Number(arts_gold[1])*1000 + Number(arts_gold[2]);
	} else {
		arts_gold = /(\d+)/.exec(arts_res);
		arts_gold = Number(arts_gold[1]);
	}

	arts_res = temp_node.querySelector("img[src$='/wood.gif']");
	if ( arts_res ) {
		arts_gold += Number(/(\d+)/.exec(arts_res.parentNode.nextSibling.innerHTML)[1]) * 180;
	}

	arts_res = temp_node.querySelector("img[src$='/ore.gif']");
	if ( arts_res ) {
		arts_gold += Number(/(\d+)/.exec(arts_res.parentNode.nextSibling.innerHTML)[1]) * 180;
	}

	arts_res = temp_node.querySelector("img[src$='/mercury.gif']");
	if ( arts_res ) {
		arts_gold += Number(/(\d+)/.exec(arts_res.parentNode.nextSibling.innerHTML)[1]) * 360;
	}

	arts_res = temp_node.querySelector("img[src$='/sulfur.gif']");
	if ( arts_res ) {
		arts_gold += Number(/(\d+)/.exec(arts_res.parentNode.nextSibling.innerHTML)[1]) * 360;
	}

	arts_res = temp_node.querySelector("img[src$='/crystal.gif']");
	if ( arts_res ) {
		arts_gold += Number(/(\d+)/.exec(arts_res.parentNode.nextSibling.innerHTML)[1]) * 360;
	}

	arts_res = temp_node.querySelector("img[src$='/gem.gif']");
	if ( arts_res ) {
		arts_gold += Number(/(\d+)/.exec(arts_res.parentNode.nextSibling.innerHTML)[1]) * 360;
	}

if ( arts_gold != now_art[4] ) { alert("hwm_shop: needs to be updated! :4, "+arts_id); break; }

	var is_shop = temp_node.querySelector("a[href^='ecostat_details.php']");
	if ( is_shop ) {
		var arts_cost_proch = 0;
	} else {
		var arts_cost_proch = (arts_gold / arts_proch).toFixed(2);
	}

if ( arts_cost_proch != now_art[5] ) { alert("hwm_shop: needs to be updated! :5, "+arts_id); break; }

}

}

// !========================================


}


}


function show_id(event)
{
event = event || window.event;
event.preventDefault ? event.preventDefault() : (event.returnValue=false);
var id = event.target || event.srcElement;
id = id.id || id.parentNode.id;
if (id) {
	id = 'hide_'+id;
	if ( $(id).style.display == '' ) { $(id).style.display = 'none'; } else { $(id).style.display = ''; }
}
}

function shop_hide_arts_f()
{
if ( $('shop_hide_arts_id').checked==true ) shop_hide_arts='1'; else shop_hide_arts='0';
GM_setValue( "shop_hide_arts" , shop_hide_arts );
shop_hide_f();
}

function shop_change_sections_f()
{
if ( $('shop_change_sections_id').checked==true ) shop_change_sections='1'; else shop_change_sections='0';
GM_setValue( "shop_change_sections" , shop_change_sections );
}

function shop_hide_f()
{
var arts_id_array = document.querySelectorAll("a[href^='art_info.php?id=']");
	for ( var k=0; k<arts_id_array.length; k++ ) {
		var ai = arts_id_array[k].parentNode.parentNode.parentNode;
		if ( shop_hide_arts == '1' ) {
		var sum_i = sum.exec( ai.innerHTML );
			if ( sum_i && sum_i[1] == 0 ) {
				ai.style.display = 'none';
			}
		} else if ( ai.style.display == 'none' ) {
			ai.style.display = '';
		}
	}
}

function open_transfer_f()
{
	if ( location.href.match('lordswm') )
	{
		window.location = "transfer.php?nick=demin&shortcomment=Transferred 10000 Gold 5 Diamonds";
	} else {
		window.location = "transfer.php?nick=demin&shortcomment=%CF%E5%F0%E5%E4%E0%ED%EE%2010000%20%C7%EE%EB%EE%F2%EE%205%20%C1%F0%E8%EB%EB%E8%E0%ED%F2%FB";
	}
}

function add_array_arts()
{
array_arts = {'id arta':['naimenovanie, ssylka na kategoriyu, ssylka na izobrazenie, prochnost, stoimost pokupki v magazine, stoimost prochnosti (esli art prodaetsya tolko v magazine), oa, uroven'],'Generated by Demin script hwm_shop_get_array':['please save copyright'],'wood_sword':['Деревянный меч', 'weapon', 'woodensword', 7, 140, 20.00, 1, 1],'gnome_hammer':['Легкий топорик', 'weapon', 'onehandaxe', 25, 310, 0, 2, 2],'steel_blade':['Стальной клинок', 'weapon', 'steelsword', 30, 490, 0, 2, 3],'dagger':['Кинжал мести', 'weapon', 'dagger', 30, 960, 32.00, 1, 3],'def_sword':['Меч расправы', 'weapon', 'def_sword', 40, 1360, 0, 3, 3],'shortbow':['Короткий лук', 'weapon', 'shortbow', 20, 360, 0, 1, 4],'staff':['Боевой посох ', 'weapon', 'staff', 40, 2660, 0, 6, 5],'requital_sword':['Меч возмездия', 'weapon', 'requitalsword', 40, 2660, 0, 5, 5],'broad_sword':['Меч равновесия', 'weapon', 'broadsword', 60, 4970, 0, 6, 6],'long_bow':['Длинный лук', 'weapon', 'long_bow', 50, 6650, 0, 4, 6],'sor_staff':['Посох могущества', 'weapon', 'sor_staff', 50, 6440, 0, 8, 7],'power_sword':['Меч власти', 'weapon', 'power_sword', 80, 10290, 0, 8, 7],'mstaff8':['Посох весны', 'weapon', 'mstaff8', 30, 3040, 0, 8, 8],'ssword8':['Меч жесткости', 'weapon', 'ssword8', 40, 4040, 0, 8, 8],'mif_staff':['Мифриловый посох', 'weapon', 'mif_staff', 70, 17250, 0, 9, 9],'mif_sword':['Мифриловый меч', 'weapon', 'mif_sword', 70, 17850, 0, 9, 9],'mstaff10':['Посох теней', 'weapon', 'mstaff10', 35, 3980, 113.71, 9, 10],'ssword10':['Меч отваги', 'weapon', 'ssword10', 45, 5110, 0, 9, 10],'energy_scroll':['Свиток энергии', 'weapon', 'energy_scroll', 70, 9520, 0, 6, 10],'composite_bow':['Составной лук', 'weapon', 'composite_bow', 55, 8680, 0, 5, 11],'mm_staff':['Рубиновый посох', 'weapon', 'mm_staff', 70, 17880, 0, 10, 12],'mm_sword':['Рубиновый меч', 'weapon', 'mm_sword', 70, 18100, 0, 10, 12],'mstaff13':['Обсидиановый посох', 'weapon', 'mstaff13', 40, 5050, 0, 10, 13],'ssword13':['Обсидиановый меч', 'weapon', 'ssword13', 50, 6300, 0, 10, 13],'bow14':['Лук полуночи', 'weapon', 'bow14', 65, 10470, 0, 6, 14],'ffstaff15':['Посох повелителя огня', 'weapon', 'ffstaff15', 70, 18610, 0, 11, 15],'firsword15':['Меч возрождения', 'weapon', 'firsword15', 70, 18600, 0, 11, 15],'smstaff16':['Посох забвения', 'weapon', 'ssmstaff16', 37, 5140, 0, 11, 16],'ssword16':['Меч гармонии', 'weapon', 'szzsword16', 46, 6370, 0, 11, 16],'bow17':['Лук рассвета', 'weapon', 'bbobow17', 65, 10640, 163.69, 7, 17],'staff18':['Посох затмения', 'weapon', 'smmstaff18', 70, 18680, 266.86, 12, 18],'scroll18':['Манускрипт концентрации', 'weapon', 'shhscroll18', 70, 10850, 155.00, 9, 18],'sword18':['Гладий предвестия', 'weapon', 'smasword18', 70, 18690, 267.00, 12, 18],'leatherhat':['Кожаная шляпа', 'helm', 'leatherhat', 12, 180, 15.00, 1, 1],'leather_helm':['Кожаный шлем', 'helm', 'leatherhelmet', 30, 660, 0, 1, 3],'knowledge_hat':['Шляпа знаний', 'helm', 'knowlengehat', 25, 1030, 0, 2, 5],'chain_coif':['Кольчужный шлем', 'helm', 'chaincoif', 40, 1620, 0, 2, 5],'wizard_cap':['Колпак мага', 'helm', 'magehat', 35, 1680, 0, 2, 5],'mage_helm':['Шлем мага', 'helm', 'mage_helm', 50, 3450, 0, 4, 7],'steel_helmet':['Стальной шлем', 'helm', 'steel_helmet', 70, 3870, 0, 3, 7],'shelm8':['Шлем отваги', 'helm', 'shelm8', 30, 1260, 0, 3, 8],'mif_lhelmet':['Лёгкий мифриловый шлем', 'helm', 'mif_lhelmet', 70, 5520, 0, 5, 9],'mif_hhelmet':['Тяжёлый мифриловый шлем', 'helm', 'mif_hhelmet', 70, 6630, 0, 5, 11],'shelm12':['Рубиновый шлем', 'helm', 'shelm12', 40, 2800, 0, 5, 12],'mhelmetzh13':['Корона чернокнижника', 'helm', 'mhelmetzh13', 70, 6720, 0, 6, 13],'zxhelmet13':['Обсидиановый шлем', 'helm', 'zxhelmet13', 70, 6720, 0, 6, 13],'myhelmet15':['Шлем пламени', 'helm', 'myhelmet15', 70, 6930, 0, 7, 15],'xymhelmet15':['Корона пламенного чародея', 'helm', 'xymhelmet15', 70, 6960, 0, 7, 15],'shelm16':['Шлем благородства', 'helm', 'umshelm16', 40, 2920, 0, 7, 16],'helmet17':['Шлем рассвета', 'helm', 'hwmhelmet17', 70, 7620, 108.86, 8, 17],'mhelmet17':['Шлем сумерек', 'helm', 'miqmhelmet17', 70, 7620, 108.86, 8, 17],'bravery_medal':['Медаль отваги', 'necklace', 'braverymedal', 25, 590, 0, 2, 2],'amulet_of_luck':['Амулет удачи', 'necklace', 'lucknecklace', 25, 1010, 0, 2, 3],'power_pendant':['Кулон отчаяния', 'necklace', 'power_pendant', 60, 7770, 0, 7, 7],'samul8':['Счастливая подкова', 'necklace', 'samul81', 30, 3570, 0, 7, 8],'warrior_pendant':['Кулон воина', 'necklace', 'warrior_pendant', 50, 8470, 0, 8, 10],'magic_amulet':['Магический амулет', 'necklace', 'magic_amulet', 50, 8820, 0, 7, 10],'wzzamulet13':['Амулет ярости', 'necklace', 'wzzamulet13', 60, 10500, 0, 9, 13],'mmzamulet13':['Мистический амулет', 'necklace', 'mmzamulet13', 60, 10500, 0, 9, 13],'smamul14':['Осколок тьмы', 'necklace', 'smamul14', 30, 4600, 0, 9, 14],'samul14':['Амулет фортуны', 'necklace', 'samul141', 30, 4600, 0, 9, 14],'bafamulet15':['Амулет трёх стихий', 'necklace', 'bafamulet15', 65, 11380, 0, 9, 15],'mmzamulet16':['Амулет духа', 'necklace', 'mmzamulet16', 65, 11550, 0, 10, 16],'wzzamulet16':['Амулет битвы', 'necklace', 'wzzamulet16', 65, 11550, 0, 10, 16],'samul17':['Оскал дракона', 'necklace', 'warsamul17', 30, 4620, 154.00, 10, 17],'smamul17':['Амулет единения', 'necklace', 'sekmamul17', 30, 4620, 154.00, 10, 17],'mamulet19':['Кулон непостижимости', 'necklace', 'megmamulet19', 65, 11620, 178.77, 11, 19],'amulet19':['Кулон рвения', 'necklace', 'nwamulet19', 65, 11620, 178.77, 11, 19],'leather_shiled':['Кожаная броня', 'cuirass', 'leathershield', 18, 280, 0, 1, 1],'leatherplate':['Кожаные доспехи', 'cuirass', 'leatherplate', 30, 1430, 0, 2, 3],'hauberk':['Боевая кольчуга', 'cuirass', 'chainarmor', 40, 2410, 0, 3, 5],'ciras':['Стальная кираса', 'cuirass', 'ciras', 70, 4690, 0, 4, 7],'mage_armor':['Одеяние мага', 'cuirass', 'mage_armor', 50, 4700, 0, 5, 8],'mif_light':['Лёгкая мифриловая кираса', 'cuirass', 'mif_light', 70, 6580, 0, 5, 8],'sarmor9':['Мифриловая кольчуга', 'cuirass', 'sarmor9', 40, 2610, 0, 5, 9],'full_plate':['Стальные доспехи', 'cuirass', 'full_plate', 75, 9730, 0, 6, 10],'wiz_robe':['Роба чародея', 'cuirass', 'mage_robes', 70, 9870, 0, 7, 11],'miff_plate':['Мифриловые доспехи', 'cuirass', 'miff_plate', 75, 10360, 0, 7, 12],'sarmor13':['Обсидиановая броня', 'cuirass', 'sarmor13', 50, 4550, 0, 7, 13],'robewz15':['Роба пламенного чародея', 'cuirass', 'robewz15', 70, 9800, 0, 8, 15],'armor15':['Доспех пламени', 'cuirass', 'armor15', 70, 9800, 0, 8, 15],'sarmor16':['Кираса благородства', 'cuirass', 'brsarmor16', 44, 4580, 0, 8, 16],'marmor17':['Доспехи сумерек', 'cuirass', 'mammarmor17', 70, 9800, 140.00, 9, 17],'armor17':['Кираса рассвета', 'cuirass', 'anwarmor17', 70, 9990, 142.71, 9, 17],'scoutcloack':['Плащ разведчика', 'cloack', 'cloack', 20, 320, 0, 1, 4],'soul_cape':['Накидка духов', 'cloack', 'soulcape', 30, 1260, 0, 2, 5],'antiair_cape':['Халат ветров', 'cloack', 'antiair_cape', 60, 3080, 0, 3, 6],'powercape':['Плащ магической силы', 'cloack', 'powercape', 40, 5620, 0, 4, 8],'scloack8':['Маскировочный плащ', 'cloack', 'scloack8', 30, 2160, 0, 4, 8],'antimagic_cape':['Халат магической защиты', 'cloack', 'antimagic_cape', 50, 5210, 0, 5, 8],'wiz_cape':['Накидка чародея', 'cloack', 'wiz_cape', 60, 9170, 0, 7, 12],'cloackwz15':['Мантия пламенного чародея', 'cloack', 'cloackwz15', 65, 10120, 0, 8, 15],'scloack16':['Плащ драконьего покрова', 'cloack', 'mascloack16', 30, 3360, 0, 8, 16],'cloack17':['Мантия вечности', 'cloack', 'clscloack17', 65, 10500, 161.54, 9, 17],'round_shiled':['Круглый щит', 'shield', 'roundshield', 7, 110, 15.71, 1, 1],'s_shield':['Стальной щит', 'shield', 's_shield', 15, 280, 0, 2, 2],'defender_shield':['Щит хранителя', 'shield', 'protectshield', 40, 1190, 0, 3, 4],'sshield5':['Щит славы', 'shield', 'sshield5', 40, 3040, 0, 4, 5],'dragon_shield':['Щит драконов', 'shield', 'dragon_shield', 70, 9240, 0, 5, 7],'large_shield':['Башенный щит', 'shield', 'large_shield', 70, 10080, 0, 6, 10],'sshield11':['Щит сокола', 'shield', 'sshield11', 40, 4080, 0, 6, 11],'shield13':['Обсидиановый щит', 'shield', 'shield13', 70, 10710, 0, 7, 13],'sshield14':['Щит чешуи дракона', 'shield', 'zpsshield14', 38, 4130, 0, 7, 14],'shield16':['Щит пламени', 'shield', 'shield16', 70, 10840, 0, 8, 16],'sshield17':['Щит подавления', 'shield', 'esshield17', 35, 4230, 120.86, 8, 17],'shield19':['Щит рассвета', 'shield', 'sioshield19', 70, 11020, 157.43, 9, 19],'leatherboots':['Кожаные ботинки', 'boots', 'leatherboots', 14, 210, 0, 1, 1],'hunter_boots':['Кожаные сапоги', 'boots', 'hunterboots', 30, 960, 0, 1, 4],'boots2':['Боевые сапоги', 'boots', 'boots2', 35, 1080, 0, 2, 5],'shoe_of_initiative':['Туфли стремления', 'boots', 'initboots', 40, 2510, 0, 3, 5],'steel_boots':['Стальные сапоги', 'boots', 'steel_boots', 70, 6090, 0, 4, 7],'mif_lboots':['Лёгкие мифриловые сапоги', 'boots', 'mif_lboots', 55, 7530, 0, 6, 8],'sboots9':['Солдатские сапоги ', 'boots', 'sboots9', 30, 2250, 0, 5, 9],'mif_hboots':['Тяжёлые мифриловые сапоги', 'boots', 'mif_hboots', 65, 8160, 0, 6, 11],'sboots12':['Рубиновые сапоги', 'boots', 'sboots12', 35, 3150, 0, 6, 12],'wiz_boots':['Туфли чародея', 'boots', 'wiz_boots', 65, 8430, 0, 6, 12],'boots13':['Обсидиановые сапоги', 'boots', 'boots13', 70, 8950, 0, 7, 13],'mboots14':['Сапоги чернокнижника', 'boots', 'mboots14', 70, 9290, 0, 8, 14],'boots15':['Сапоги пламени', 'boots', 'boots15', 70, 9010, 0, 8, 15],'sboots16':['Сапоги благородства', 'boots', 'nmsboots16', 30, 3410, 0, 8, 16],'boots17':['Сапоги рассвета', 'boots', 'bzbboots17', 70, 9140, 130.57, 9, 17],'mboots17':['Сапоги сумерек', 'boots', 'macmboots17', 70, 9140, 130.57, 9, 17],'i_ring':['Кольцо ловкости', 'ring', 'i_ring', 10, 180, 0, 1, 2],'sring4':['Кольцо силы', 'ring', 'sring4', 15, 610, 0, 2, 4],'doubt_ring':['Кольцо сомнений', 'ring', 'necroring', 12, 1120, 0, 2, 4],'verve_ring':['Перстень вдохновения', 'ring', 'eaglering', 18, 1660, 0, 2, 4],'rashness_ring':['Кольцо стремительности', 'ring', 'hastering', 30, 2030, 0, 2, 5],'circ_ring':['Кольцо отречения', 'ring', 'circ_ring', 50, 6850, 0, 4, 6],'powerring':['Кольцо пророка', 'ring', 'powerring', 40, 5460, 0, 4, 7],'smring10':['Кольцо молнии', 'ring', 'smring10', 30, 3010, 100.33, 5, 10],'sring10':['Терновое кольцо', 'ring', 'sring10', 30, 3010, 0, 5, 10],'warriorring':['Кольцо воина', 'ring', 'warriorring', 40, 7050, 0, 5, 10],'darkring':['Кольцо теней', 'ring', 'darkring', 50, 8820, 0, 5, 10],'magring13':['Печать заклинателя', 'ring', 'magring13', 60, 10820, 0, 6, 13],'warring13':['Глаз дракона', 'ring', 'warring13', 60, 10820, 0, 6, 13],'bring14':['Кольцо противоречий', 'ring', 'bring14', 60, 10920, 0, 6, 14],'wwwring16':['Кольцо боли', 'ring', 'wwwring16', 65, 11830, 0, 6, 16],'mmmring16':['Кольцо звёзд', 'ring', 'mmmring16', 65, 11830, 0, 6, 16],'smring17':['Печать единения', 'ring', 'masmring17', 30, 3060, 102.00, 6, 17],'sring17':['Кольцо хватки дракона', 'ring', 'fgsring17', 30, 3060, 0, 6, 17],'ring19':['Кольцо бесстрашия', 'ring', 'rarring19', 65, 11900, 183.08, 7, 19],'mring19':['Кольцо непрестанности', 'ring', 'meqmring19', 65, 11990, 184.46, 7, 19],'flowers1':['Букет Восторг', 'gift', 'gifts/flowers1', 10, 350, 35.00, 1, 3],'flowers2':['Букет Женское счастье', 'gift', 'gifts/flowers2', 10, 350, 35.00, 1, 3],'venok':['Девичий венок', 'gift', 'gifts/venok', 10, 350, 35.00, 2, 3],'defender_dagger':['Кинжал защитника', 'gift', 'gifts/defender_dagger', 15, 1400, 93.33, 2, 3],'flower_heart':['Сердце из роз', 'gift', 'gifts/flower_heart', 20, 1750, 87.50, 3, 3],'flowers3':['Букет Аромат весны', 'gift', 'gifts/flowers3', 15, 3500, 233.33, 4, 3],'half_heart_m':['Вторая половинка (M)', 'gift', 'gifts/half_heart_m', 25, 5250, 210.00, 2, 3],'half_heart_w':['Вторая половинка (Ж)', 'gift', 'gifts/half_heart_w', 25, 5250, 210.00, 2, 3],'bril_pendant':['Бриллиантовый кулон', 'gift', 'gifts/bril_pendant', 50, 24500, 490.00, 6, 3],'bril_ring':['Кольцо с бриллиантом', 'gift', 'gifts/bril_ring', 40, 35000, 875.00, 5, 4],'d_spray':['Аромат страсти', 'gift', 'gifts/d_spray', 15, 3500, 233.33, 5, 5],'flowers4':['Букет Для любимой', 'gift', 'gifts/buk2', 25, 5250, 210.00, 5, 5],'flowers5':['Букет Роскошный', 'gift', 'gifts/buk1', 25, 5250, 210.00, 5, 5],'protazan':['Серебряный протазан', 'gift', 'gifts/protazan', 40, 8750, 218.75, 2, 5],'wboots':['Сапожки искусительницы', 'gift', 'gifts/wboots', 50, 17500, 350.00, 6, 5],'roses':['Букет Очарование', 'gift', 'gifts/roses', 40, 8750, 218.75, 9, 7],'goldciras':['Кираса защитника', 'gift', 'gifts/goldciras', 50, 14000, 280.00, 4, 7],'warmor':['Броня изящества', 'gift', 'gifts/warmor', 50, 17500, 350.00, 6, 7],'whelmet':['Шляпка соблазна', 'gift', 'gifts/whelmet', 50, 17500, 350.00, 6, 9],'shpaga':['Шпага защитника', 'gift', 'shpaga', 60, 28000, 466.67, 10, 9],'bfly':['Бабочка богини', 'gift', 'gifts/bfly', 50, 52500, 1050.00, 5, 9],'koltsou':['Кольцо предводителя', 'gift', 'koltsou', 40, 24500, 612.50, 6, 10]};
}

function $(id) { return document.querySelector("#"+id); }

function addEvent(elem, evType, fn) {
	if (elem.addEventListener) {
		elem.addEventListener(evType, fn, false);
	}
	else if (elem.attachEvent) {
		elem.attachEvent("on" + evType, fn);
	}
	else {
		elem["on" + evType] = fn;
	}
}

function update_n(a,b,c,d,e){if(e){e++}else{e=1;d=(Number(GM_getValue('last_update_script','0'))||0)}if(e>3){return}var f=new Date().getTime();var g=$('update_demin_script');if(g){if((d+86400000<f)||(d>f)){g=g.innerHTML;if(/100000=1.1/.exec(g)){var h=new RegExp(b+'=(\\d+\\.\\d+)').exec(g);if(a&&h){if(Number(h[1])>Number(a))setTimeout(function(){if(confirm('\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u043A\u0440\u0438\u043F\u0442\u0430: "'+c+'".\n\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u0441\u0435\u0439\u0447\u0430\u0441?\n\nThere is an update available for the script: "'+c+'".\nWould you like install the script now?')){if(typeof GM_openInTab=='function'){GM_openInTab('http://userscripts.org/scripts/show/'+b)}else{window.open('http://userscripts.org/scripts/show/'+b,'_blank')}window.location='http://userscripts.org/scripts/source/'+b+'.user.js'}},500)}GM_setValue('last_update_script',''+f)}else{setTimeout(function(){update_n(a,b,c,d,e)},1000)}}}else{var i=document.querySelector('body');if(i){var j=GM_getValue('array_update_script');if(e==1&&((d+86400000<f)||(d>f)||!j)){if(j){GM_deleteValue('array_update_script')}setTimeout(function(){update_n(a,b,c,d,e)},1000);return}var k=document.createElement('div');k.id='update_demin_script';k.setAttribute('style','position: absolute; width: 0px; height: 0px; top: 0px; left: 0px; display: none;');k.innerHTML='';i.appendChild(k);if((d+86400000<f)||(d>f)||!j){var l=new XMLHttpRequest();l.open('GET','photo_pl_photos.php?aid=1777'+'&rand='+(Math.random()*100),true);l.onreadystatechange=function(){update(l,a,b,c,d,e)};l.send(null)}else{$('update_demin_script').innerHTML=j;setTimeout(function(){update_n(a,b,c,d,e)},10)}}}}function update(a,b,c,d,e,f){if(a.readyState==4&&a.status==200){a=a.responseText;var g=/(\d+=\d+\.\d+)/g;var h='';var i;while((i=g.exec(a))!=null){if(h.indexOf(i[1])==-1){h+=i[1]+' '}};GM_setValue('array_update_script',''+h);var j=$('update_demin_script');if(j){j.innerHTML=h;setTimeout(function(){update_n(b,c,d,e,f)},10)}}}

})();
