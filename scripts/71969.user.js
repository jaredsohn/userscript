// ==UserScript==
// @name         HWM Arts Combat Cost
// @description  Arts Combat Cost shows how much Arts will cost for one combat
// @version      0.57
// @author       VBob  
// @namespace 	 HWMVBob
// @source       http://userscripts.org/scripts/show/71969
// @identifier   http://userscripts.org/scripts/show/71969.user.js
// @include      http://www.heroeswm.ru/inventory.php
// @include      http://www.heroeswm.ru/home.php
// @include      http://www.heroeswm.ru/pl_info.php*
// @include      http://www.lordswm.com/inventory.php
// @include      http://www.lordswm.com/home.php
// @include      http://www.lordswm.com/pl_info.php*
// ==/UserScript==

var url_hostname = location.hostname;
var url_cur = location.href;
var lang_regexp = /^.+\.(\w+)/;
var lang_hostname = url_hostname.replace( lang_regexp, '$1'  ) ;
var phrase = "";

switch( lang_hostname ) {
	case "ru":
		phrase = "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u043E\u0432 \u0437\u0430 \u0431\u043E\u0439"; //  escape("Стоимость артефактов за бой")
		ph_title = "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043D\u044B\u0445 \u0430\u0440\u0442\u043E\u0432 \u0431\u0435\u0437 \u0443\u0447\u0435\u0442\u0430 \u043A\u0440\u0430\u0444\u0442\u0430!";
		break;
	case "com":
		phrase = "Cost of artifacts for combat";
		break;
	default:
		phrase = "Cost of artifacts for combat";
}

var arts_shop_arr = [
	/* Головные уборы */
	"leatherhat", 15, "leatherhelmet", 23, "magehat", 49, "chaincoif", 42, "knowlengehat", 82, "steel_helmet", 57, "mage_helm", 122, "mif_lhelmet", 79, "mif_hhelmet", 95, "zxhelmet13", 96, "mhelmetzh13", 96, "myhelmet15", 99, "xymhelmet15", 99,	
	/* Предметы на шею */
	"braverymedal", 24, "lucknecklace", 41, "power_pendant", 129, "warrior_pendant", 169, "magic_amulet", 176, "wzzamulet13", 176, "mmzamulet13", 175, "bafamulet15", 175, "mmzamulet16", 178, "wzzamulet16", 178, 	
	/* Броня */	
	"leathershield", 15, "leatherplate", 48, "chainarmor", 62, "ciras", 69, "mif_light", 94, "mage_armor", 197, "full_plate", 130, "mage_robes", 141, "miff_plate", 138, "robewz15", 140, "armor15", 140,
	/* Плащи */
	"cloack", 16, "soulcape", 48, "antiair_cape", 53, "powercape", 223, "antimagic_cape", 94, "wiz_cape", 153, "cloackwz15", 156,
	/* Оружие */
	"woodensword", 20, "onehandaxe", 15, "steelsword", 19, "dagger", 33, "def_sword", 34, "shortbow", 18, "requitalsword", 69, "staff", 82, "broadsword", 85,
	"long_bow", 133, "power_sword", 134, "sor_staff", 305, "mif_staff", 246, "mif_sword", 255, "energy_scroll", 136, "composite_bow", 158,
	"mm_staff", 256, "mm_sword", 259, "bow14", 161, "ffstaff15", 266, "firsword15", 266,
	/* Щиты */
	"roundshield", 15, "s_shield", 19, "protectshield", 31, "dragon_shield", 137, "large_shield", 147, "shield13", 153, "shield16", 155,
	/* Обувь */
	"leatherboots", 15, "hunterboots", 33, "boots2", 31, "initboots", 65, "steel_boots", 90, "mif_lboots", 137, "mif_hboots", 125, "wiz_boots", 130, 
	"boots13", 128, "mboots14", 133, "boots15", 129, 
	/* Кольца */
	"i_ring", 18, "eaglering", 95, "necroring", 172, "hastering", 69, "circ_ring", 143, "powerring", 179, "warriorring", 202, "darkring", 176,
	"magring13", 180, "warring13", 181, "bring14", 182, "mmmring16", 182, "wwwring16", 182
	];

var arts_combat_cost = 0;
var a_els = document.getElementsByTagName( 'a' );
var table_els = document.getElementsByTagName( 'table' );
var item_image_name_regexp = /^.+\/(.+)_s\..+/ ;
var item_name = "";
var el = '';

//===========================
// "pl_info" page processing... 

if( url_cur.match( /pl_info\.php\?/ )) {	

	for( var i = 0; i < a_els.length; i++ ) {		
		el = a_els[i];
		if( el.href.match(/art_info.php\?/) && el.firstChild.getAttribute( 'width' ) == 50 ) {
			item_name = el.firstChild.src.replace( item_image_name_regexp, '$1' );			
			for( var idx=0; idx<arts_shop_arr.length; idx++ ) {
				if( arts_shop_arr[idx] == item_name ) {
					arts_combat_cost += arts_shop_arr[idx+1];
				}		
				idx++;
			}
		}
    }

	for( var tbl = 0; tbl < table_els.length; tbl++ ) {		
		el = table_els[tbl];
		if( el.getAttribute( 'background' ) && el.innerHTML.match(/art_info.php\?/)  && (el.getAttribute( 'background' ).match( /artifacts/)  )) 	{			
			item_name = el.getAttribute( 'background' ).replace( item_image_name_regexp, '$1' );
			for( var idx=0; idx<arts_shop_arr.length; idx++ ) {
				if( arts_shop_arr[idx] == item_name ) {
					arts_combat_cost += arts_shop_arr[idx+1];
				}		
				idx++;
			}
		}
    }
	
	for( var t = 0; t < table_els.length; t++ ) {
		el = table_els[t];
		if( (el.width == 230) && (el.getAttribute( 'background' ).match( /i\/kukla/ ))) {
			d = document.createElement( 'div' );
			d.innerHTML = phrase + ": " + arts_combat_cost ;
			d.title = ph_title;
			d.style.textAlign = 'center';
			d.style.fontWeight = 'bold';			
			d.style.borderTop = '1px solid #592c08'; 
			el.parentNode.appendChild( d ) ;
		}			
	}
}

//===========================
// "inventory" page processing... 

if( url_cur == 'http://' + url_hostname + '/inventory.php' ) {	

	for( var i = 0; i < a_els.length; i++ ) {		
		el = a_els[i];
		if( el.attributes[0].firstChild.data.match( /try_undress/ )) {
			item_name = el.firstChild.src.replace( item_image_name_regexp, '$1' );			
			for( var idx=0; idx<arts_shop_arr.length; idx++ ) {
				if( arts_shop_arr[idx] == item_name ) {
					arts_combat_cost += arts_shop_arr[idx+1];
				}		
				idx++;
			}
		}
    }
	
	for( var tbl = 0; tbl < table_els.length; tbl++ ) {		
		el = table_els[tbl];
		if( el.getAttribute( 'background' ) && el.innerHTML.match(/pull_off=/)  && (el.getAttribute( 'background' ).match( /artifacts/)  )) 	{			
			item_name = el.getAttribute( 'background' ).replace( item_image_name_regexp, '$1' );
			for( var idx=0; idx<arts_shop_arr.length; idx++ ) {
				if( arts_shop_arr[idx] == item_name ) {
					arts_combat_cost += arts_shop_arr[idx+1];
				}		
				idx++;
			}
		}
    }
	
	for( var t = 0; t < a_els.length; t++ ) {
		el = a_els[t];				
		if( el.href.match( /all_off=100/ )) {
			d = document.createElement( 'div' );
			d.innerHTML = phrase + ": " + arts_combat_cost ;
			d.title = ph_title;
			d.style.textAlign = 'center';
			d.style.fontWeight = 'bold';			
			d.style.borderTop = '1px solid #592c08'; 
			el.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( d ) ;
		}		
	}
}

//===========================
// "home" page processing... 

if( url_cur == 'http://' + url_hostname + '/home.php' ) {	

	for( var ih = 0; ih < a_els.length; ih++ ) {		
		el = a_els[ih];
		if( el.href.match(/art_info.php/) && el.firstChild.getAttribute( 'width' ) == 50 ) {
			item_name = el.firstChild.src.replace( item_image_name_regexp, '$1' );			
			for( var idxh=0; idxh<arts_shop_arr.length; idxh++ ) {
				if( arts_shop_arr[idxh] == item_name ) {
					arts_combat_cost += arts_shop_arr[idxh+1];
				}		
				idxh++;
			}
		}
    }
	
	for( var tbl = 0; tbl < table_els.length; tbl++ ) {		
		el = table_els[tbl];
		if( el.getAttribute( 'background' ) && el.innerHTML.match(/art_info/)  && (el.getAttribute( 'background' ).match( /artifacts/)  )) {			
			item_name = el.getAttribute( 'background' ).replace( item_image_name_regexp, '$1' );
			for( var idx=0; idx<arts_shop_arr.length; idx++ ) {
				if( arts_shop_arr[idx] == item_name ) {
					arts_combat_cost += arts_shop_arr[idx+1];
				}		
				idx++;
			}
		}
    }	
	
	var showarmy_el = document.getElementById( 'showarmy' );
	
	if( showarmy_el ) {
		d = document.createElement( 'div' );
		d.innerHTML = phrase + ": " + arts_combat_cost;
		d.title = ph_title;
		d.style.textAlign = 'center';
		d.style.fontWeight = 'bold';
		showarmy_el.parentNode.appendChild( d ) ;
	}
	
}
