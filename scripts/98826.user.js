// ==UserScript==
// @name           Przybronik by Darius II EN
// @namespace      www.gotowe-esklepy.pl
// @description    Toolbox - The script helps match inventory to specific tasks, work, etc. version supports pants and belts.
// @version        EN_3.2.9
// @include        *.the-west.net/*
// @include        http://userscripts.org/scripts/source/98826.meta.js
// @exclude        www.the-west.*
// @exclude        forum.the-west.pl/*
// @require        http://userscripts.org/scripts/source/74144.user.js
//
// @history        EN_3.2.9 add new products
// @history        EN_3.2.9 correction items in version 1.32
// @history        EN_3.2.8 add new products
// @history        EN_3.2.7 corrections in the names
// @history        EN_3.2.6 corrections eq in sets
// @history        EN_3.2.5 corrections in the names
// @history        EN_3.2.4 corrections in the names
// @history        EN_3.2.3 corrections in the names, added recipes ver 1.31 TW
// @history        EN_3.2.2 corrections in the names
// @history        EN_3.2.1 corrections in the names
// ==/UserScript==

function GM_getValue(key,defaultVal) { 
var retValue = localStorage.getItem(key);
if ( !retValue ) {
return defaultVal;
}
return retValue;
}

function GM_setValue(key,value) { 
localStorage.setItem(key, value);
}

var PrzVer = "EN_3.2.9";

try {
	ScriptUpdater.check(98826, PrzVer);
} catch(e) { }; // sprawdzenie aktualizacji

var ext_szafa_enabled = false; // false/true

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
} // style

function addFooterIcon(mylink,idname, title) {
	var head, style;
	footer_menu_left = document.getElementById('footer_minimap_icon');
	if (footer_menu_left) footer_menu_left = footer_menu_left.parentNode;
	if (footer_menu_left) footer_menu_left = footer_menu_left.parentNode;
	if (!footer_menu_left) {return false;}
	var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.setAttribute('title','<b>Przybornik</b>');
	iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
	footer_menu_left.appendChild(iconlink);
	addPop(idname,'<b>'+title+'</b>');
	return true;
};

function addPop (id,title){
	if ($(id))
		setTimeout(function() {$(id).addMousePopup(title)},2500)
}

aWindow = (unsafeWindow) ? unsafeWindow : window;
var $=aWindow.$;

Str = 'http://code.google.com/p/pl-the-west/wiki/Przybornik_braki_En';
przy_link = '&nbsp;<a href=\"'+Str+'\" style=\"color:yellow\" target=\"_blank\">Darius II</a>';

//====================================== TOOLBOX ====================================

// utworzenie przycisku przybornika
addFooterIcon('javascript:pk2_show_panel();','footer_building_BEST_ITEMS','Przybornik');
addGlobalStyle('#footer_menu_left #footer_building_BEST_ITEMS {background-image:url(http://i757.photobucket.com/albums/xx211/Darius_II/tw/small_przybornik.png);}');
addGlobalStyle('#footer_building_BEST_ITEMS {background-position:0px 0;}');
addGlobalStyle('#workbar_left {margin-top:25px;}');
addGlobalStyle('#workbar_right {margin-top:75px;}');

// === menu "Przybornik" ===
  var pk2_link2 = document.createElement("div");
  pk2_link2.id="pk2_link2";
  pk2_link2.innerHTML = '<a id=\"TWF_pk2_link2\" title=\"Kliknij przycisk, aby rozpocząć poszukiwania przydatnych przedmiotów\" href=\"javascript:pk2_show_panel();void(0);\"></a>';
  addGlobalStyle('#pk2_link2 { background:url(http://i757.photobucket.com/albums/xx211/Darius_II/tw/przybornik.png); }');
  var menu_inventory = document.getElementById('menu_inventory');
  if (menu_inventory) {
    menu_inventory.parentNode.insertBefore(pk2_link2, menu_inventory.nextSibling);
  }
  // dodanie "szafy"
  if (ext_szafa_enabled) {
	var pk2_link2_szafa = document.createElement("div");
	pk2_link2_szafa.id="pk2_link2_szafa";
	pk2_link2_szafa.innerHTML = '<a id=\"TWF_pk2_link2_szafa\" title=\"Kliknij przycisk, aby rozpocząć poszukiwania przydatnych przedmiotów\" href=\"javascript:pk2_odev_spam_option();void(0);\"></a>';
	addGlobalStyle('#pk2_link2_szafa { background:url(http://i757.photobucket.com/albums/xx211/Darius_II/tw/przybornik.png); }');
	var menu_forts = document.getElementById('menu_forts');
	if (menu_forts) {
	   menu_forts.parentNode.insertBefore(pk2_link2_szafa, menu_forts.nextSibling);
	}
  }
// === /menu "Przybornik" ===

// szerokość okien
aWindow.pk2_w0=450;		// szer. okna
aWindow.pk2_w1=900;		// szer. wyników

//
aWindow.pk2_l0 = (window.innerWidth) ? (window.innerWidth-aWindow.pk2_w0)/2 : (1024-aWindow.pk2_w0) /2 ;
aWindow.pk2_t0=5;
aWindow.pk2_l1 = (window.innerWidth) ? (window.innerWidth-aWindow.pk2_w1)/2 : (1024-aWindow.pk2_w1) /2 ;
aWindow.pk2_t1=50;

//wysokość okien
aWindow.pk2_title_h_min=25;							// wys. okna min
aWindow.pk2_title_h_mid=70;							// wys. okna po otwarciu
aWindow.pk2_title_h_max=375;						// wys. okna max
aWindow.pk2_window_h_min=25;						// wys. okna wyników min
aWindow.pk2_window_h_max= (window.innerHeight-220);	// wys. okna wyników
aWindow.pk2_tlink=' style=\"color:white; display:block; width:20px; height:20px; float:left;\" ';
aWindow.pk2_vblock=' style=\"border:1px solid black; padding:10x; marging:1px;\" ';
aWindow.pk2_title_flag=0;
aWindow.pk2_title_flag2=1;
aWindow.pk2_window_flag2=1;
aWindow.pk2_odevalo4ka = true;

pk2_code='';
pk2_code += "\
pk2_zaschitato=1;\
pk2_import=false;\
pk2_khlam=false;\
ezda=false;\
zaschita=null;\
pk2_millioner=false;\
pk2_process=false;\
pk2_zdorov=0;\
pk2_count_inv=0;\
pk2_odev_count=0;\
pk2_odev_id=0;\
pk2_odev_type=0;\
pk2_odev_time=500;\
pk2_odev_rep=20;\
pk2_odev_var='n';\
pk2_odev_rab=0;\
pk2_odev_item=0;\
pk2_odev_list={};\
pk2_odev_stat=true;\
\
einfo='';\
winfo='';\
\
pk2_types=['right_arm', 'left_arm', 'head', 'body', 'belt', 'pants', 'foot', 'neck', 'animal', 'yield'];\
nabory=['set_farmer', 'set_mexican', 'set_indian', 'set_quackery', 'set_pilgrim_male', 'set_pilgrim_female', 'set_gentleman', 'set_dancer', 'fireworker_set', 'gold_set', 'greenhorn_set'];\
\
pk2_predmetov = {};\
pk2_uchet=[];\
pk2_aktiv=[];\
pk2_nenuzhnoe=[];\
irabota=0;\
pk2_inv_imported=false;\
pk2_slots={};\
pk2_equipment={};\
for (ii=0;ii<pk2_types.length;++ii) {pk2_equipment[pk2_types[ii]]=0};\
";

pk2_code += "\
items=[];\
\
items[0] = {item_id:0, nshort:'nothing', name:'Losowy', type:'yield', level:0, price:0, image:'images/items/unknown.png?1', image_mini:'images/items/unknown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};\
\
items[1] = {item_id:1, nshort:'clayjug', name:'Broken clay jug', type:'right_arm', level:1, price:16, image:'images/items/right_arm/clayjug.png?1', image_mini:'images/items/right_arm/mini/clayjug.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[2] = {item_id:2, nshort:'winebottle', name:'Broken wine bottle', type:'right_arm', level:5, price:26, image:'images/items/right_arm/winebottle.png?1', image_mini:'images/items/right_arm/mini/winebottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[3] = {item_id:3, nshort:'whiskeybottle', name:'Broken whiskey bottle', type:'right_arm', level:7, price:40, image:'images/items/right_arm/whiskeybottle.png?1', image_mini:'images/items/right_arm/mini/whiskeybottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[4] = {item_id:4, nshort:'rotty_club', name:'Rotten club', type:'right_arm', level:7, price:26, image:'images/items/right_arm/rotty_club.png?1', image_mini:'images/items/right_arm/mini/rotty_club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[5] = {item_id:5, nshort:'club', name:'Club', type:'right_arm', level:10, price:63, image:'images/items/right_arm/club.png?1', image_mini:'images/items/right_arm/mini/club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[6] = {item_id:6, nshort:'nail_club', name:'Club with nail', type:'right_arm', level:13, price:125, image:'images/items/right_arm/nail_club.png?1', image_mini:'images/items/right_arm/mini/nail_club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[7] = {item_id:7, nshort:'rusty_razor', name:'Rusty Razor blade', type:'right_arm', level:12, price:64, image:'images/items/right_arm/rusty_razor.png?1', image_mini:'images/items/right_arm/mini/rusty_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[8] = {item_id:8, nshort:'razor', name:'Razor', type:'right_arm', level:15, price:146, image:'images/items/right_arm/razor.png?1', image_mini:'images/items/right_arm/mini/razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[9] = {item_id:9, nshort:'sharp_razor', name:'Sharp Razor blade', type:'right_arm', level:18, price:354, image:'images/items/right_arm/sharp_razor.png?1', image_mini:'images/items/right_arm/mini/sharp_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10] = {item_id:10, nshort:'figaros_razor', name:'Figaro\\'s Razor blade', type:'right_arm', level:25, price:1740, image:'images/items/right_arm/figaros_razor.png?1', image_mini:'images/items/right_arm/mini/figaros_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, aim:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[11] = {item_id:11, nshort:'rusty_skewer', name:'Rusty dagger', type:'right_arm', level:17, price:122, image:'images/items/right_arm/rusty_skewer.png?1', image_mini:'images/items/right_arm/mini/rusty_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[12] = {item_id:12, nshort:'skewer', name:'Push dagger', type:'right_arm', level:20, price:384, image:'images/items/right_arm/skewer.png?1', image_mini:'images/items/right_arm/mini/skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[13] = {item_id:13, nshort:'sharp_skewer', name:'Sharp dagger', type:'right_arm', level:23, price:554, image:'images/items/right_arm/sharp_skewer.png?1', image_mini:'images/items/right_arm/mini/sharp_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[14] = {item_id:14, nshort:'codys_skewer', name:'Cody\\'s dagger', type:'right_arm', level:30, price:2600, image:'images/items/right_arm/codys_skewer.png?1', image_mini:'images/items/right_arm/mini/codys_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:4, punch:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[15] = {item_id:15, nshort:'rusty_bowie', name:'Rusty bowie knife', type:'right_arm', level:27, price:450, image:'images/items/right_arm/rusty_bowie.png?1', image_mini:'images/items/right_arm/mini/rusty_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[16] = {item_id:16, nshort:'bowie', name:'Bowie knife', type:'right_arm', level:30, price:850, image:'images/items/right_arm/bowie.png?1', image_mini:'images/items/right_arm/mini/bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[17] = {item_id:17, nshort:'sharp_bowie', name:'Sharp bowie knife', type:'right_arm', level:33, price:1220, image:'images/items/right_arm/sharp_bowie.png?1', image_mini:'images/items/right_arm/mini/sharp_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[18] = {item_id:18, nshort:'bowies_knife', name:'Bowie\\'s knife', type:'right_arm', level:40, price:4600, image:'images/items/right_arm/bowies_knife.png?1', image_mini:'images/items/right_arm/mini/bowies_knife.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[19] = {item_id:19, nshort:'rusty_foil', name:'Rusty foil', type:'right_arm', level:32, price:730, image:'images/items/right_arm/rusty_foil.png?1', image_mini:'images/items/right_arm/mini/rusty_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20] = {item_id:20, nshort:'foil', name:'Foil', type:'right_arm', level:35, price:1134, image:'images/items/right_arm/foil.png?1', image_mini:'images/items/right_arm/mini/foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[21] = {item_id:21, nshort:'sharp_foil', name:'Sharp foil', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/sharp_foil.png?1', image_mini:'images/items/right_arm/mini/sharp_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[22] = {item_id:22, nshort:'athos_foil', name:'Athos\\' foil', type:'right_arm', level:45, price:5775, image:'images/items/right_arm/athos_foil.png?1', image_mini:'images/items/right_arm/mini/athos_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:5, endurance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[23] = {item_id:23, nshort:'rusty_machete', name:'Rusty machete', type:'right_arm', level:37, price:940, image:'images/items/right_arm/rusty_machete.png?1', image_mini:'images/items/right_arm/mini/rusty_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[24] = {item_id:24, nshort:'machete', name:'Machete', type:'right_arm', level:40, price:1560, image:'images/items/right_arm/machete.png?1', image_mini:'images/items/right_arm/mini/machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[25] = {item_id:25, nshort:'sharp_machete', name:'Sharp machete', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/sharp_machete.png?1', image_mini:'images/items/right_arm/mini/sharp_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[26] = {item_id:26, nshort:'nats_machete', name:'Nat\\'s machete', type:'right_arm', level:50, price:6750, image:'images/items/right_arm/nats_machete.png?1', image_mini:'images/items/right_arm/mini/nats_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, leadership:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[27] = {item_id:27, nshort:'rusty_conquistador', name:'Rusty conquistador sword', type:'right_arm', level:47, price:1710, image:'images/items/right_arm/rusty_conquistador.png?1', image_mini:'images/items/right_arm/mini/rusty_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[28] = {item_id:28, nshort:'conquistador', name:'Conquistador sword', type:'right_arm', level:50, price:2560, image:'images/items/right_arm/conquistador.png?1', image_mini:'images/items/right_arm/mini/conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[29] = {item_id:29, nshort:'sharp_conquistador', name:'Sharp conquistador sword', type:'right_arm', level:53, price:3370, image:'images/items/right_arm/sharp_conquistador.png?1', image_mini:'images/items/right_arm/mini/sharp_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[30] = {item_id:30, nshort:'henandos_conquistador', name:'Hernando\\'s sword', type:'right_arm', level:50, price:8700, image:'images/items/right_arm/henandos_conquistador.png?1', image_mini:'images/items/right_arm/mini/henandos_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[31] = {item_id:31, nshort:'rusty_tomahawk', name:'Rusty Tomahawk', type:'right_arm', level:57, price:2900, image:'images/items/right_arm/rusty_tomahawk.png?1', image_mini:'images/items/right_arm/mini/rusty_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[32] = {item_id:32, nshort:'tomahawk', name:'Tomahawk', type:'right_arm', level:60, price:3800, image:'images/items/right_arm/tomahawk.png?1', image_mini:'images/items/right_arm/mini/tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[33] = {item_id:33, nshort:'sharp_tomahawk', name:'Sharp Tomahawk', type:'right_arm', level:63, price:4900, image:'images/items/right_arm/sharp_tomahawk.png?1', image_mini:'images/items/right_arm/mini/sharp_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[34] = {item_id:34, nshort:'taschunkas_tomahawk', name:'Tashunka\\'s Tomahawk', type:'right_arm', level:70, price:10100, image:'images/items/right_arm/taschunkas_tomahawk.png?1', image_mini:'images/items/right_arm/mini/taschunkas_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5, hide:3, swim:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[35] = {item_id:35, nshort:'rusty_axe', name:'Rusty lumberjack axe', type:'right_arm', level:62, price:3400, image:'images/items/right_arm/rusty_axe.png?1', image_mini:'images/items/right_arm/mini/rusty_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[36] = {item_id:36, nshort:'axe', name:'Lumberjack axe', type:'right_arm', level:65, price:4400, image:'images/items/right_arm/axe.png?1', image_mini:'images/items/right_arm/mini/axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[37] = {item_id:37, nshort:'sharp_axe', name:'Sharp lumberjack axe', type:'right_arm', level:68, price:5600, image:'images/items/right_arm/sharp_axe.png?1', image_mini:'images/items/right_arm/mini/sharp_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[38] = {item_id:38, nshort:'boones_axe', name:'Siekiera Boone', type:'right_arm', level:75, price:10200, image:'images/items/right_arm/boones_axe.png?1', image_mini:'images/items/right_arm/mini/boones_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, build:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[39] = {item_id:39, nshort:'rusty_sabre', name:'Rusty cavalry sabre', type:'right_arm', level:67, price:4200, image:'images/items/right_arm/rusty_sabre.png?1', image_mini:'images/items/right_arm/mini/rusty_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[40] = {item_id:40, nshort:'sabre', name:'Cavalry sabre', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/sabre.png?1', image_mini:'images/items/right_arm/mini/sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[41] = {item_id:41, nshort:'sharp_sabre', name:'Sharp cavalry sabre', type:'right_arm', level:73, price:6350, image:'images/items/right_arm/sharp_sabre.png?1', image_mini:'images/items/right_arm/mini/sharp_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[42] = {item_id:42, nshort:'grants_sabre', name:'Szabla Generała Granta', type:'right_arm', level:80, price:10800, image:'images/items/right_arm/grants_sabre.png?1', image_mini:'images/items/right_arm/mini/grants_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:9}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[43] = {item_id:43, nshort:'screwdriver', name:'Śrubokręt', type:'right_arm', level:10, price:114, image:'images/items/right_arm/screwdriver.png?1', image_mini:'images/items/right_arm/mini/screwdriver.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[44] = {item_id:44, nshort:'spanner', name:'Klucz płaski', type:'right_arm', level:21, price:628, image:'images/items/right_arm/spanner.png?1', image_mini:'images/items/right_arm/mini/spanner.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{build:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[45] = {item_id:45, nshort:'crowbar', name:'Łom', type:'right_arm', level:36, price:1594, image:'images/items/right_arm/crowbar.png?1', image_mini:'images/items/right_arm/mini/crowbar.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[46] = {item_id:46, nshort:'whips', name:'Bicz', type:'right_arm', level:30, price:594, image:'images/items/right_arm/whips.png?1', image_mini:'images/items/right_arm/mini/whips.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[47] = {item_id:47, nshort:'pillow', name:'Pillow', type:'right_arm', level:45, price:450, image:'images/items/right_arm/pillow.png?1', image_mini:'images/items/right_arm/mini/pillow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Sleepyhead'}, shop:'drop'};\
\
items[50] = {item_id:50, nshort:'goldensable', name:'Złota szabla', type:'right_arm', level:70, price:22500, image:'images/items/right_arm/goldensable.png?1', image_mini:'images/items/right_arm/mini/goldensable.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, punch:8}, attributes:{}}, set:{key:'gold_set', name:'Golden set'}, shop:'drop'};\
items[51] = {item_id:51, nshort:'fakegoldensable', name:'Podrobiona złota szabla', type:'right_arm', level:80, price:10500, image:'images/items/right_arm/fakegoldensable.png?1', image_mini:'images/items/right_arm/mini/fakegoldensable.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:2, punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[52] = {item_id:52, nshort:'greenhorn_axe', name:'Topór skauta', type:'right_arm', level:6, price:550, image:'images/items/right_arm/greenhorn_axe.png?1', image_mini:'images/items/right_arm/mini/greenhorn_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:'greenhorn_set', name:'Greenhorn set'}, shop:'shop'};\
items[53] = {item_id:53, nshort:'xmas_rod', name:'Rózga', type:'right_arm', level:null, price:250, image:'images/items/right_arm/xmas_rod.png?1', image_mini:'images/items/right_arm/mini/xmas_rod.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:-2, aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[55] = {item_id:55, nshort:'bouquet', name:'Bukiet kwiatów', type:'right_arm', level:1, price:22, image:'images/items/right_arm/bouquet.png?1', image_mini:'images/items/right_arm/mini/bouquet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[101] = {item_id:101, nshort:'bow_rusty', name:'Brittle bow', type:'left_arm', level:5, price:400, image:'images/items/left_arm/bow_rusty.png?1', image_mini:'images/items/left_arm/mini/bow_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[102] = {item_id:102, nshort:'bow_normal', name:'Bow', type:'left_arm', level:10, price:650, image:'images/items/left_arm/bow_normal.png?1', image_mini:'images/items/left_arm/mini/bow_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[103] = {item_id:103, nshort:'bow_best', name:'Precise bow', type:'left_arm', level:13, price:1275, image:'images/items/left_arm/bow_best.png?1', image_mini:'images/items/left_arm/mini/bow_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[104] = {item_id:104, nshort:'crossbow_rusty', name:'Brittle crossbow', type:'left_arm', level:10, price:520, image:'images/items/left_arm/crossbow_rusty.png?1', image_mini:'images/items/left_arm/mini/crossbow_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[105] = {item_id:105, nshort:'crossbow_normal', name:'Crossbow', type:'left_arm', level:20, price:755, image:'images/items/left_arm/crossbow_normal.png?1', image_mini:'images/items/left_arm/mini/crossbow_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[106] = {item_id:106, nshort:'crossbow_best', name:'Precise crossbow', type:'left_arm', level:23, price:1600, image:'images/items/left_arm/crossbow_best.png?1', image_mini:'images/items/left_arm/mini/crossbow_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[107] = {item_id:107, nshort:'arkebuse_rusty', name:'Rusty harquebus', type:'left_arm', level:18, price:684, image:'images/items/left_arm/arkebuse_rusty.png?1', image_mini:'images/items/left_arm/mini/arkebuse_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[108] = {item_id:108, nshort:'arkebuse_normal', name:'Harquebus', type:'left_arm', level:30, price:1070, image:'images/items/left_arm/arkebuse_normal.png?1', image_mini:'images/items/left_arm/mini/arkebuse_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[109] = {item_id:109, nshort:'arkebuse_best', name:'Precise harquebus', type:'left_arm', level:33, price:2444, image:'images/items/left_arm/arkebuse_best.png?1', image_mini:'images/items/left_arm/mini/arkebuse_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[110] = {item_id:110, nshort:'blunderbuss_rusty', name:'Rusty rifle', type:'left_arm', level:20, price:775, image:'images/items/left_arm/blunderbuss_rusty.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[111] = {item_id:111, nshort:'blunderbuss_normal', name:'Rifle', type:'left_arm', level:35, price:1300, image:'images/items/left_arm/blunderbuss_normal.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[112] = {item_id:112, nshort:'blunderbuss_best', name:'Precise rifle', type:'left_arm', level:38, price:2950, image:'images/items/left_arm/blunderbuss_best.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[113] = {item_id:113, nshort:'musket_rusty', name:'Rusty musket', type:'left_arm', level:25, price:920, image:'images/items/left_arm/musket_rusty.png?1', image_mini:'images/items/left_arm/mini/musket_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[114] = {item_id:114, nshort:'musket_normal', name:'Musket', type:'left_arm', level:40, price:1580, image:'images/items/left_arm/musket_normal.png?1', image_mini:'images/items/left_arm/mini/musket_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[115] = {item_id:115, nshort:'musket_best', name:'Precise musket', type:'left_arm', level:43, price:3850, image:'images/items/left_arm/musket_best.png?1', image_mini:'images/items/left_arm/mini/musket_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[116] = {item_id:116, nshort:'flint_rusty', name:'Rusty coach gun', type:'left_arm', level:35, price:1350, image:'images/items/left_arm/flint_rusty.png?1', image_mini:'images/items/left_arm/mini/flint_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[117] = {item_id:117, nshort:'flint_normal', name:'Coach gun', type:'left_arm', level:50, price:2440, image:'images/items/left_arm/flint_normal.png?1', image_mini:'images/items/left_arm/mini/flint_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[118] = {item_id:118, nshort:'flint_best', name:'Precise coach gun', type:'left_arm', level:53, price:6300, image:'images/items/left_arm/flint_best.png?1', image_mini:'images/items/left_arm/mini/flint_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[119] = {item_id:119, nshort:'shotgun_rusty', name:'Rusty pepper gun', type:'left_arm', level:40, price:1600, image:'images/items/left_arm/shotgun_rusty.png?1', image_mini:'images/items/left_arm/mini/shotgun_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[120] = {item_id:120, nshort:'shotgun_normal', name:'Pepper gun', type:'left_arm', level:55, price:3000, image:'images/items/left_arm/shotgun_normal.png?1', image_mini:'images/items/left_arm/mini/shotgun_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[121] = {item_id:121, nshort:'shotgun_best', name:'Precise pepper gun', type:'left_arm', level:58, price:7000, image:'images/items/left_arm/shotgun_best.png?1', image_mini:'images/items/left_arm/mini/shotgun_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[122] = {item_id:122, nshort:'percussion_rusty', name:'Rusty percussion rifle', type:'left_arm', level:45, price:2000, image:'images/items/left_arm/percussion_rusty.png?1', image_mini:'images/items/left_arm/mini/percussion_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[123] = {item_id:123, nshort:'percussion_normal', name:'Percussion rifle', type:'left_arm', level:60, price:3800, image:'images/items/left_arm/percussion_normal.png?1', image_mini:'images/items/left_arm/mini/percussion_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[124] = {item_id:124, nshort:'percussion_best', name:'Precise percussion rifle', type:'left_arm', level:63, price:8800, image:'images/items/left_arm/percussion_best.png?1', image_mini:'images/items/left_arm/mini/percussion_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[125] = {item_id:125, nshort:'breechloader_rusty', name:'Rusty breech-loader', type:'left_arm', level:55, price:3150, image:'images/items/left_arm/breechloader_rusty.png?1', image_mini:'images/items/left_arm/mini/breechloader_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[126] = {item_id:126, nshort:'breechloader_normal', name:'Breech-loader', type:'left_arm', level:70, price:6000, image:'images/items/left_arm/breechloader_normal.png?1', image_mini:'images/items/left_arm/mini/breechloader_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[127] = {item_id:127, nshort:'breechloader_best', name:'Precise breech-loader', type:'left_arm', level:73, price:12600, image:'images/items/left_arm/breechloader_best.png?1', image_mini:'images/items/left_arm/mini/breechloader_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[128] = {item_id:128, nshort:'winchester_rusty', name:'Rusty Winchester', type:'left_arm', level:60, price:3900, image:'images/items/left_arm/winchester_rusty.png?1', image_mini:'images/items/left_arm/mini/winchester_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[129] = {item_id:129, nshort:'winchester_normal', name:'Winchester', type:'left_arm', level:75, price:7600, image:'images/items/left_arm/winchester_normal.png?1', image_mini:'images/items/left_arm/mini/winchester_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[130] = {item_id:130, nshort:'winchester_best', name:'Precise Winchester', type:'left_arm', level:78, price:15400, image:'images/items/left_arm/winchester_best.png?1', image_mini:'images/items/left_arm/mini/winchester_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[132] = {item_id:132, nshort:'bear', name:'Bear', type:'left_arm', level:45, price:2600, image:'images/items/left_arm/bear.png?1', image_mini:'images/items/left_arm/mini/bear.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Sleepyhead'}, shop:'drop'};\
items[133] = {item_id:133, nshort:'muzzleloader_bowie', name:'Bowie\\'s Muzzle-loader', type:'left_arm', level:30, price:1480, image:'images/items/left_arm/muzzleloader_bowie.png?1', image_mini:'images/items/left_arm/mini/muzzleloader_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[135] = {item_id:135, nshort:'elephantgun', name:'Strzelba na słonie', type:'left_arm', level:40, price:12480, image:'images/items/left_arm/elephantgun.png?1', image_mini:'images/items/left_arm/mini/elephantgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[136] = {item_id:136, nshort:'golden_rifle', name:'Golden Gun', type:'left_arm', level:75, price:65480, image:'images/items/left_arm/golden_rifle.png?1', image_mini:'images/items/left_arm/mini/golden_rifle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'gold_set', name:'Golden set'}, shop:'quest'};\
items[137] = {item_id:137, nshort:'deathsythe', name:'Death\\'s scythe', type:'left_arm', level:50, price:17400, image:'images/items/left_arm/deathsythe.png?1', image_mini:'images/items/left_arm/mini/deathsythe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:'season_set', name:'Holiday set'}, shop:'quest'};\
\
items[200] = {item_id:200, nshort:'band_red', name:'Red headband', type:'head', level:1, price:4, image:'images/items/head/band_red.png?1', image_mini:'images/items/head/mini/band_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[201] = {item_id:201, nshort:'band_green', name:'Green headband', type:'head', level:2, price:4, image:'images/items/head/band_green.png?1', image_mini:'images/items/head/mini/band_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, dodge:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[202] = {item_id:202, nshort:'band_blue', name:'Blue headband', type:'head', level:2, price:4, image:'images/items/head/band_blue.png?1', image_mini:'images/items/head/mini/band_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[203] = {item_id:203, nshort:'band_yellow', name:'Yellow headband', type:'head', level:2, price:4, image:'images/items/head/band_yellow.png?1', image_mini:'images/items/head/mini/band_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[204] = {item_id:204, nshort:'band_brown', name:'Brown headband', type:'head', level:3, price:18, image:'images/items/head/band_brown.png?1', image_mini:'images/items/head/mini/band_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, health:2, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[205] = {item_id:205, nshort:'band_black', name:'Black headband', type:'head', level:3, price:18, image:'images/items/head/band_black.png?1', image_mini:'images/items/head/mini/band_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2, repair:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[206] = {item_id:206, nshort:'slouch_cap_grey', name:'Grey cap', type:'head', level:3, price:46, image:'images/items/head/slouch_cap_grey.png?1', image_mini:'images/items/head/mini/slouch_cap_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[207] = {item_id:207, nshort:'slouch_cap_brown', name:'Brown cap', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_brown.png?1', image_mini:'images/items/head/mini/slouch_cap_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[208] = {item_id:208, nshort:'slouch_cap_black', name:'Black cap', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_black.png?1', image_mini:'images/items/head/mini/slouch_cap_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3, pitfall:3, leadership:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[209] = {item_id:209, nshort:'slouch_cap_fine', name:'Fancy cap', type:'head', level:6, price:520, image:'images/items/head/slouch_cap_fine.png?1', image_mini:'images/items/head/mini/slouch_cap_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, aim:4, tactic:4, reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[210] = {item_id:210, nshort:'cap_grey', name:'Grey woolly hat', type:'head', level:4, price:90, image:'images/items/head/cap_grey.png?1', image_mini:'images/items/head/mini/cap_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[211] = {item_id:211, nshort:'cap_red', name:'Red woolly hat', type:'head', level:5, price:175, image:'images/items/head/cap_red.png?1', image_mini:'images/items/head/mini/cap_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[212] = {item_id:212, nshort:'cap_green', name:'Green woolly hat', type:'head', level:5, price:175, image:'images/items/head/cap_green.png?1', image_mini:'images/items/head/mini/cap_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[213] = {item_id:213, nshort:'cap_blue', name:'Blue woolly hat', type:'head', level:5, price:175, image:'images/items/head/cap_blue.png?1', image_mini:'images/items/head/mini/cap_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[214] = {item_id:214, nshort:'cap_yellow', name:'Yellow woolly hat', type:'head', level:5, price:175, image:'images/items/head/cap_yellow.png?1', image_mini:'images/items/head/mini/cap_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[215] = {item_id:215, nshort:'cap_brown', name:'Brown woolly hat', type:'head', level:6, price:300, image:'images/items/head/cap_brown.png?1', image_mini:'images/items/head/mini/cap_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[216] = {item_id:216, nshort:'cap_black', name:'Black woolly hat', type:'head', level:6, price:300, image:'images/items/head/cap_black.png?1', image_mini:'images/items/head/mini/cap_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, tactic:4, finger_dexterity:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[217] = {item_id:217, nshort:'cap_fine', name:'Fancy woolly hat', type:'head', level:8, price:1100, image:'images/items/head/cap_fine.png?1', image_mini:'images/items/head/mini/cap_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, shot:5, animal:5, tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[218] = {item_id:218, nshort:'slouch_hat_grey', name:'Grey slouch hat', type:'head', level:7, price:220, image:'images/items/head/slouch_hat_grey.png?1', image_mini:'images/items/head/mini/slouch_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[219] = {item_id:219, nshort:'slouch_hat_brown', name:'Brown slouch hat', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_brown.png?1', image_mini:'images/items/head/mini/slouch_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, punch:5, dodge:4}, attributes:{}}, set:{key:'set_farmer', name:'Farmer\\'s set'}, shop:'shop'};\
items[220] = {item_id:220, nshort:'slouch_hat_black', name:'Black slouch hat', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_black.png?1', image_mini:'images/items/head/mini/slouch_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, tactic:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[221] = {item_id:221, nshort:'slouch_hat_fine', name:'Fancy slouch hat', type:'head', level:12, price:1920, image:'images/items/head/slouch_hat_fine.png?1', image_mini:'images/items/head/mini/slouch_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, endurance:6, leadership:6, reflex:6}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[222] = {item_id:222, nshort:'bowler_grey', name:'Grey bowler hat', type:'head', level:10, price:420, image:'images/items/head/bowler_grey.png?1', image_mini:'images/items/head/mini/bowler_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[223] = {item_id:223, nshort:'bowler_brown', name:'Brown bowler hat', type:'head', level:12, price:808, image:'images/items/head/bowler_brown.png?1', image_mini:'images/items/head/mini/bowler_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, build:6, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[224] = {item_id:224, nshort:'bowler_black', name:'Black bowler hat', type:'head', level:12, price:808, image:'images/items/head/bowler_black.png?1', image_mini:'images/items/head/mini/bowler_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, shot:6}, attributes:{charisma:1}}, set:{key:'set_quackery', name:'Charlatan\\'s set'}, shop:'shop'};\
items[225] = {item_id:225, nshort:'bowler_fine', name:'Fancy bowler hat', type:'head', level:15, price:1850, image:'images/items/head/bowler_fine.png?1', image_mini:'images/items/head/mini/bowler_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, tough:6, repair:5, ride:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[226] = {item_id:226, nshort:'cloth_hat_grey', name:'Grey felt hat', type:'head', level:14, price:655, image:'images/items/head/cloth_hat_grey.png?1', image_mini:'images/items/head/mini/cloth_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:10, aim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[227] = {item_id:227, nshort:'cloth_hat_brown', name:'Brown felt hat', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_brown.png?1', image_mini:'images/items/head/mini/cloth_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:13, aim:7, swim:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[228] = {item_id:228, nshort:'cloth_hat_black', name:'Black felt hat', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_black.png?1', image_mini:'images/items/head/mini/cloth_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:7, aim:13, appearance:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[229] = {item_id:229, nshort:'cloth_hat_fine', name:'Fancy felt hat', type:'head', level:22, price:3900, image:'images/items/head/cloth_hat_fine.png?1', image_mini:'images/items/head/mini/cloth_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:9, aim:9, dodge:8, tactic:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[230] = {item_id:230, nshort:'cylinder_grey', name:'Grey top hat', type:'head', level:18, price:1270, image:'images/items/head/cylinder_grey.png?1', image_mini:'images/items/head/mini/cylinder_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:14, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[231] = {item_id:231, nshort:'cylinder_red', name:'Red top hat', type:'head', level:24, price:1900, image:'images/items/head/cylinder_red.png?1', image_mini:'images/items/head/mini/cylinder_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, leadership:10, finger_dexterity:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[232] = {item_id:232, nshort:'cylinder_green', name:'Green top hat', type:'head', level:24, price:1900, image:'images/items/head/cylinder_green.png?1', image_mini:'images/items/head/mini/cylinder_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, leadership:10, finger_dexterity:9}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[233] = {item_id:233, nshort:'cylinder_blue', name:'Blue top hat', type:'head', level:24, price:1900, image:'images/items/head/cylinder_blue.png?1', image_mini:'images/items/head/mini/cylinder_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[234] = {item_id:234, nshort:'cylinder_yellow', name:'Yellow top hat', type:'head', level:24, price:1900, image:'images/items/head/cylinder_yellow.png?1', image_mini:'images/items/head/mini/cylinder_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:9}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[235] = {item_id:235, nshort:'cylinder_brown', name:'Brown top hat', type:'head', level:25, price:2700, image:'images/items/head/cylinder_brown.png?1', image_mini:'images/items/head/mini/cylinder_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:9, ride:9, health:8}, attributes:{}}, set:{key:'set_gentleman', name:'Gentleman\\'s set'}, shop:'shop'};\
items[236] = {item_id:236, nshort:'cylinder_black', name:'Black top hat', type:'head', level:25, price:2700, image:'images/items/head/cylinder_black.png?1', image_mini:'images/items/head/mini/cylinder_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[237] = {item_id:237, nshort:'cylinder_fine', name:'Lincoln\\'s top hat', type:'head', level:27, price:5400, image:'images/items/head/cylinder_fine.png?1', image_mini:'images/items/head/mini/cylinder_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:12, build:9, ride:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[238] = {item_id:238, nshort:'leather_hat_grey', name:'Grey leather hat', type:'head', level:24, price:2000, image:'images/items/head/leather_hat_grey.png?1', image_mini:'images/items/head/mini/leather_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[239] = {item_id:239, nshort:'leather_hat_brown', name:'Brown leather hat', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_brown.png?1', image_mini:'images/items/head/mini/leather_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, punch:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[240] = {item_id:240, nshort:'leather_hat_black', name:'Black leather hat', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_black.png?1', image_mini:'images/items/head/mini/leather_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, repair:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[241] = {item_id:241, nshort:'leather_hat_fine', name:'Fancy leather hat', type:'head', level:30, price:4100, image:'images/items/head/leather_hat_fine.png?1', image_mini:'images/items/head/mini/leather_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:15, animal:14, tough:9, aim:8}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[242] = {item_id:242, nshort:'stetson_grey', name:'Grey Stetson', type:'head', level:30, price:2555, image:'images/items/head/stetson_grey.png?1', image_mini:'images/items/head/mini/stetson_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, health:13}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[243] = {item_id:243, nshort:'stetson_brown', name:'Brown Stetson', type:'head', level:33, price:4500, image:'images/items/head/stetson_brown.png?1', image_mini:'images/items/head/mini/stetson_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, dodge:12}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[244] = {item_id:244, nshort:'stetson_black', name:'Black Stetson', type:'head', level:33, price:4500, image:'images/items/head/stetson_black.png?1', image_mini:'images/items/head/mini/stetson_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, leadership:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[245] = {item_id:245, nshort:'stetson_fine', name:'Fancy Stetson', type:'head', level:36, price:7100, image:'images/items/head/stetson_fine.png?1', image_mini:'images/items/head/mini/stetson_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:16, health:16, trade:9, swim:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[246] = {item_id:246, nshort:'xmas_hat', name:'Christmas hat', type:'head', level:1, price:50, image:'images/items/head/xmas_hat.png?1', image_mini:'images/items/head/mini/xmas_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[247] = {item_id:247, nshort:'southcap', name:'Army hat', type:'head', level:20, price:800, image:'images/items/head/southcap.png?1', image_mini:'images/items/head/mini/southcap.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{punch:11, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[248] = {item_id:248, nshort:'adventurerhat', name:'Kapelusz poszukiwacza przygód', type:'head', level:22, price:2980, image:'images/items/head/adventurerhat.png?1', image_mini:'images/items/head/mini/adventurerhat.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:6, ride:8, tough:10}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'quest'};\
items[249] = {item_id:249, nshort:'fedora_black', name:'Fancy black felt hat', type:'head', level:22, price:1700, image:'images/items/head/fedora_black.png?1', image_mini:'images/items/head/mini/fedora_black.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:10, aim:6}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\
items[250] = {item_id:250, nshort:'feather_hat_brown', name:'Brązowy Kapelusz z piór', type:'head', level:18, price:1460, image:'images/items/head/feather_hat_brown.png?1', image_mini:'images/items/head/mini/feather_hat_brown.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4, endurance:3, tough:2}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'quest'};\
\
\
items[253] = {item_id:253, nshort:'indian_hat', name:'Indian feather hat', type:'head', level:51, price:3200, image:'images/items/head/indian_hat.png?1', image_mini:'images/items/head/mini/indian_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, appearance:11}, attributes:{charisma:2}}, set:{key:'set_indian', name:'Indian\\'s set'}, shop:'shop'};\
items[254] = {item_id:254, nshort:'mexican_sombrero', name:'Sombrero', type:'head', level:30, price:1270, image:'images/items/head/mexican_sombrero.png?1', image_mini:'images/items/head/mini/mexican_sombrero.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, health:6, shot:6}, attributes:{}}, set:{key:'set_mexican', name:'Mexican\\'s set'}, shop:'shop'};\
\
items[256] = {item_id:256, nshort:'pilger_cap', name:'Pilgrim\\'s woolly hat', type:'head', level:37, price:1270, image:'images/items/head/pilger_cap.png?1', image_mini:'images/items/head/mini/pilger_cap.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:10, leadership:6, repair:6}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Pilgrim\\'s dress set'}, shop:'shop'};\
items[257] = {item_id:257, nshort:'pilger_hat', name:'Pilgrim\\'s hat', type:'head', level:37, price:1270, image:'images/items/head/pilger_hat.png?1', image_mini:'images/items/head/mini/pilger_hat.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{trade:6, repair:6, health:10}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Pilgrim\\'s set'}, shop:'shop'};\
items[258] = {item_id:258, nshort:'cylinder_xmas', name:'Snowman\\'s hat', type:'head', level:30, price:2412, image:'images/items/head/cylinder_xmas.png?1', image_mini:'images/items/head/mini/cylinder_xmas.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Holiday set'}, shop:'quest'};\
items[259] = {item_id:259, nshort:'dancer_hat', name:'Hair feather', type:'head', level:42, price:2500, image:'images/items/head/dancer_hat.png?1', image_mini:'images/items/head/mini/dancer_hat.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{pitfall:8, tactic:10, aim:9}, attributes:{flexibility:1}}, set:{key:'set_dancer', name:'Dancer\\'s set'}, shop:'shop'};\
\
items[261] = {item_id:261, nshort:'sleep_cap', name:'Night cap', type:'head', level:45, price:1200, image:'images/items/head/sleep_cap.png?1', image_mini:'images/items/head/mini/sleep_cap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Sleepyhead'}, shop:'quest'};\
items[262] = {item_id:262, nshort:'greenhorn_hat', name:'Znaleziony kapelusz', type:'head', level:4, price:515, image:'images/items/head/greenhorn_hat.png?1', image_mini:'images/items/head/mini/greenhorn_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:3, tactic:3, pitfall:2}, attributes:{flexibility:1}}, set:{key:'greenhorn_set', name:'Greenhorn set'}, shop:'shop'};\
\
\
items[299] = {item_id:299, nshort:'band_grey', name:'Grey headband', type:'head', level:1, price:2, image:'images/items/head/band_grey.png?1', image_mini:'images/items/head/mini/band_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[300] = {item_id:300, nshort:'tatter_grey', name:'Grey rags', type:'body', level:1, price:2, image:'images/items/body/tatter_grey.png?1', image_mini:'images/items/body/mini/tatter_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[301] = {item_id:301, nshort:'tatter_red', name:'Red rags', type:'body', level:1, price:12, image:'images/items/body/tatter_red.png?1', image_mini:'images/items/body/mini/tatter_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, build:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[302] = {item_id:302, nshort:'tatter_green', name:'Zielona koszula', type:'body', level:1, price:12, image:'images/items/body/tatter_green.png?1', image_mini:'images/items/body/mini/tatter_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[303] = {item_id:303, nshort:'tatter_blue', name:'Blue rags', type:'body', level:1, price:12, image:'images/items/body/tatter_blue.png?1', image_mini:'images/items/body/mini/tatter_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[304] = {item_id:304, nshort:'tatter_yellow', name:'Yellow rags', type:'body', level:1, price:12, image:'images/items/body/tatter_yellow.png?1', image_mini:'images/items/body/mini/tatter_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, leadership:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[305] = {item_id:305, nshort:'tatter_brown', name:'Brown rags', type:'body', level:2, price:38, image:'images/items/body/tatter_brown.png?1', image_mini:'images/items/body/mini/tatter_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, reflex:2, punch:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[306] = {item_id:306, nshort:'tatter_black', name:'Black rags', type:'body', level:2, price:38, image:'images/items/body/tatter_black.png?1', image_mini:'images/items/body/mini/tatter_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3, tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[307] = {item_id:307, nshort:'poncho_grey', name:'Grey Poncho', type:'body', level:3, price:38, image:'images/items/body/poncho_grey.png?1', image_mini:'images/items/body/mini/poncho_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[308] = {item_id:308, nshort:'poncho_red', name:'Red Poncho', type:'body', level:4, price:80, image:'images/items/body/poncho_red.png?1', image_mini:'images/items/body/mini/poncho_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[309] = {item_id:309, nshort:'poncho_green', name:'Green Poncho', type:'body', level:4, price:80, image:'images/items/body/poncho_green.png?1', image_mini:'images/items/body/mini/poncho_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[310] = {item_id:310, nshort:'poncho_blue', name:'Blue Poncho', type:'body', level:4, price:80, image:'images/items/body/poncho_blue.png?1', image_mini:'images/items/body/mini/poncho_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, aim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[311] = {item_id:311, nshort:'poncho_yellow', name:'Yellow Poncho', type:'body', level:4, price:80, image:'images/items/body/poncho_yellow.png?1', image_mini:'images/items/body/mini/poncho_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[312] = {item_id:312, nshort:'poncho_brown', name:'Brown Poncho', type:'body', level:5, price:174, image:'images/items/body/poncho_brown.png?1', image_mini:'images/items/body/mini/poncho_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:6, endurance:4}, attributes:{}}, set:{key:'set_mexican', name:'Mexican\\'s set'}, shop:'shop'};\
items[313] = {item_id:313, nshort:'poncho_black', name:'Black Poncho', type:'body', level:5, price:174, image:'images/items/body/poncho_black.png?1', image_mini:'images/items/body/mini/poncho_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, animal:4, shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[314] = {item_id:314, nshort:'poncho_fine', name:'Clint\\'s Poncho', type:'body', level:6, price:800, image:'images/items/body/poncho_fine.png?1', image_mini:'images/items/body/mini/poncho_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7, build:5, pitfall:4, appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[315] = {item_id:315, nshort:'clothes_grey', name:'Grey clothing', type:'body', level:7, price:138, image:'images/items/body/clothes_grey.png?1', image_mini:'images/items/body/mini/clothes_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[316] = {item_id:316, nshort:'clothes_red', name:'Red clothing', type:'body', level:8, price:260, image:'images/items/body/clothes_red.png?1', image_mini:'images/items/body/mini/clothes_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[317] = {item_id:317, nshort:'clothes_green', name:'Green clothing', type:'body', level:14, price:260, image:'images/items/body/clothes_green.png?1', image_mini:'images/items/body/mini/clothes_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, hide:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[318] = {item_id:318, nshort:'clothes_blue', name:'Blue clothing', type:'body', level:8, price:260, image:'images/items/body/clothes_blue.png?1', image_mini:'images/items/body/mini/clothes_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, finger_dexterity:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[319] = {item_id:319, nshort:'clothes_yellow', name:'Yellow clothing', type:'body', level:8, price:260, image:'images/items/body/clothes_yellow.png?1', image_mini:'images/items/body/mini/clothes_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[320] = {item_id:320, nshort:'clothes_brown', name:'Brown clothing', type:'body', level:8, price:425, image:'images/items/body/clothes_brown.png?1', image_mini:'images/items/body/mini/clothes_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, swim:5, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[321] = {item_id:321, nshort:'clothes_black', name:'Black clothing', type:'body', level:8, price:425, image:'images/items/body/clothes_black.png?1', image_mini:'images/items/body/mini/clothes_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:5}, attributes:{}}, set:{key:'set_farmer', name:'Farmer\\'s set'}, shop:'shop'};\
items[322] = {item_id:322, nshort:'clothes_fine', name:'Sunday clothing', type:'body', level:10, price:1650, image:'images/items/body/clothes_fine.png?1', image_mini:'images/items/body/mini/clothes_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, endurance:6, reflex:6, finger_dexterity:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[323] = {item_id:323, nshort:'shirt_grey', name:'Grey shirt', type:'body', level:12, price:310, image:'images/items/body/shirt_grey.png?1', image_mini:'images/items/body/mini/shirt_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[324] = {item_id:324, nshort:'shirt_red', name:'Red shirt', type:'body', level:13, price:560, image:'images/items/body/shirt_red.png?1', image_mini:'images/items/body/mini/shirt_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[325] = {item_id:325, nshort:'shirt_green', name:'Green shirt', type:'body', level:13, price:560, image:'images/items/body/shirt_green.png?1', image_mini:'images/items/body/mini/shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, ride:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[326] = {item_id:326, nshort:'shirt_blue', name:'Blue shirt', type:'body', level:13, price:560, image:'images/items/body/shirt_blue.png?1', image_mini:'images/items/body/mini/shirt_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, aim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[327] = {item_id:327, nshort:'shirt_yellow', name:'Yellow shirt', type:'body', level:13, price:560, image:'images/items/body/shirt_yellow.png?1', image_mini:'images/items/body/mini/shirt_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[328] = {item_id:328, nshort:'shirt_brown', name:'Brown shirt', type:'body', level:14, price:800, image:'images/items/body/shirt_brown.png?1', image_mini:'images/items/body/mini/shirt_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, reflex:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[329] = {item_id:329, nshort:'shirt_black', name:'Black shirt', type:'body', level:14, price:800, image:'images/items/body/shirt_black.png?1', image_mini:'images/items/body/mini/shirt_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, pitfall:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[330] = {item_id:330, nshort:'shirt_fine', name:'Fancy shirt', type:'body', level:15, price:1305, image:'images/items/body/shirt_fine.png?1', image_mini:'images/items/body/mini/shirt_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:7, ride:7, punch:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[331] = {item_id:331, nshort:'plaid_shirt_grey', name:'Grey checkered shirt', type:'body', level:15, price:560, image:'images/items/body/plaid_shirt_grey.png?1', image_mini:'images/items/body/mini/plaid_shirt_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[332] = {item_id:332, nshort:'plaid_shirt_red', name:'Red checkered shirt', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_red.png?1', image_mini:'images/items/body/mini/plaid_shirt_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[333] = {item_id:333, nshort:'plaid_shirt_green', name:'Green checkered shirt', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_green.png?1', image_mini:'images/items/body/mini/plaid_shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, swim:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[334] = {item_id:334, nshort:'plaid_shirt_blue', name:'Blue checkered shirt', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_blue.png?1', image_mini:'images/items/body/mini/plaid_shirt_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[335] = {item_id:335, nshort:'plaid_shirt_yellow', name:'Yellow checkered shirt', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_yellow.png?1', image_mini:'images/items/body/mini/plaid_shirt_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[336] = {item_id:336, nshort:'plaid_shirt_brown', name:'Brown checkered shirt', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_brown.png?1', image_mini:'images/items/body/mini/plaid_shirt_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12, ride:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[337] = {item_id:337, nshort:'plaid_shirt_black', name:'Black checkered shirt', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_black.png?1', image_mini:'images/items/body/mini/plaid_shirt_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:7, repair:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[338] = {item_id:338, nshort:'plaid_shirt_fine', name:'Flannel shirt', type:'body', level:19, price:3900, image:'images/items/body/plaid_shirt_fine.png?1', image_mini:'images/items/body/mini/plaid_shirt_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:13, animal:8, hide:8, pitfall:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[339] = {item_id:339, nshort:'vest_grey', name:'Grey waistcoat', type:'body', level:16, price:900, image:'images/items/body/vest_grey.png?1', image_mini:'images/items/body/mini/vest_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:11, shot:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[340] = {item_id:340, nshort:'vest_brown', name:'Brown waistcoat', type:'body', level:20, price:1800, image:'images/items/body/vest_brown.png?1', image_mini:'images/items/body/mini/vest_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:9, shot:7, health:8}, attributes:{flexibility:1}}, set:{key:'set_quackery', name:'Charlatan\\'s set'}, shop:'shop'};\
items[341] = {item_id:341, nshort:'vest_black', name:'Black waistcoat', type:'body', level:20, price:1800, image:'images/items/body/vest_black.png?1', image_mini:'images/items/body/mini/vest_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7, shot:9, leadership:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[342] = {item_id:342, nshort:'vest_fine', name:'Fancy waistcoat', type:'body', level:20, price:5200, image:'images/items/body/vest_fine.png?1', image_mini:'images/items/body/mini/vest_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:10, shot:10, endurance:9, trade:8}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[343] = {item_id:343, nshort:'coat_grey', name:'Grey cotton jacket', type:'body', level:20, price:1300, image:'images/items/body/coat_grey.png?1', image_mini:'images/items/body/mini/coat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13, pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[344] = {item_id:344, nshort:'coat_red', name:'Red cotton jacket', type:'body', level:20, price:2000, image:'images/items/body/coat_red.png?1', image_mini:'images/items/body/mini/coat_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[345] = {item_id:345, nshort:'coat_green', name:'Green cotton jacket', type:'body', level:20, price:2000, image:'images/items/body/coat_green.png?1', image_mini:'images/items/body/mini/coat_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, hide:8}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[346] = {item_id:346, nshort:'coat_blue', name:'Blue cotton jacket', type:'body', level:20, price:2000, image:'images/items/body/coat_blue.png?1', image_mini:'images/items/body/mini/coat_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[347] = {item_id:347, nshort:'coat_yellow', name:'Yellow cotton jacket', type:'body', level:20, price:2000, image:'images/items/body/coat_yellow.png?1', image_mini:'images/items/body/mini/coat_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, leadership:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[348] = {item_id:348, nshort:'coat_brown', name:'Brown cotton jacket', type:'body', level:21, price:2500, image:'images/items/body/coat_brown.png?1', image_mini:'images/items/body/mini/coat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8, swim:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[349] = {item_id:349, nshort:'coat_black', name:'Black cotton jacket', type:'body', level:21, price:2500, image:'images/items/body/coat_black.png?1', image_mini:'images/items/body/mini/coat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11, animal:9}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[350] = {item_id:350, nshort:'coat_fine', name:'Fancy cotton jacket', type:'body', level:22, price:6300, image:'images/items/body/coat_fine.png?1', image_mini:'images/items/body/mini/coat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:11, appearance:9, dodge:9}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[351] = {item_id:351, nshort:'jacket_grey', name:'Grey dress coat', type:'body', level:20, price:1850, image:'images/items/body/jacket_grey.png?1', image_mini:'images/items/body/mini/jacket_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[352] = {item_id:352, nshort:'jacket_brown', name:'Brown dress coat', type:'body', level:25, price:3500, image:'images/items/body/jacket_brown.png?1', image_mini:'images/items/body/mini/jacket_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, tough:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[353] = {item_id:353, nshort:'jacket_black', name:'Black dress coat', type:'body', level:25, price:3500, image:'images/items/body/jacket_black.png?1', image_mini:'images/items/body/mini/jacket_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, aim:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[354] = {item_id:354, nshort:'jacket_fine', name:'Fancy dress coat', type:'body', level:27, price:7200, image:'images/items/body/jacket_fine.png?1', image_mini:'images/items/body/mini/jacket_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:13, reflex:13, punch:9, aim:9}, attributes:{charisma:1, flexibility:1}}, set:{key:'set_gentleman', name:'Gentleman\\'s set'}, shop:'shop'};\
items[355] = {item_id:355, nshort:'leather_coat_grey', name:'Grey leather jacket', type:'body', level:25, price:2700, image:'images/items/body/leather_coat_grey.png?1', image_mini:'images/items/body/mini/leather_coat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:12}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[356] = {item_id:356, nshort:'leather_coat_brown', name:'Brown leather jacket', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_brown.png?1', image_mini:'images/items/body/mini/leather_coat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:13}, attributes:{strength:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[357] = {item_id:357, nshort:'leather_coat_black', name:'Black leather jacket', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_black.png?1', image_mini:'images/items/body/mini/leather_coat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:12, hide:11, repair:12, leadership:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[358] = {item_id:358, nshort:'leather_coat_fine', name:'Fancy leather jacket', type:'body', level:30, price:9000, image:'images/items/body/leather_coat_fine.png?1', image_mini:'images/items/body/mini/leather_coat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:16, hide:15, finger_dexterity:9, appearance:10}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[359] = {item_id:359, nshort:'greatcoat_grey', name:'Grey coat', type:'body', level:33, price:3500, image:'images/items/body/greatcoat_grey.png?1', image_mini:'images/items/body/mini/greatcoat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:14}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[360] = {item_id:360, nshort:'greatcoat_brown', name:'Brown coat', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_brown.png?1', image_mini:'images/items/body/mini/greatcoat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:13, shot:13, ride:13, health:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[361] = {item_id:361, nshort:'greatcoat_fine', name:'Fancy coat', type:'body', level:45, price:9500, image:'images/items/body/greatcoat_fine.png?1', image_mini:'images/items/body/mini/greatcoat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, shot:16, endurance:9, ride:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[362] = {item_id:362, nshort:'uniform', name:'Uniform', type:'body', level:20, price:800, image:'images/items/body/uniform.png?1', image_mini:'images/items/body/mini/uniform.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{hide:4, appearance:2}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\
items[363] = {item_id:363, nshort:'uniform_burned', name:'Burned uniform', type:'body', level:20, price:80, image:'images/items/body/uniform_burned.png?1', image_mini:'images/items/body/mini/uniform_burned.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:-2, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\
items[364] = {item_id:364, nshort:'greatcoat_black', name:'Black coat', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_black.png?1', image_mini:'images/items/body/mini/greatcoat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:16, shot:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[365] = {item_id:365, nshort:'adventurerjacket', name:'Kurtka poszukiwacza przygód', type:'body', level:40, price:1100, image:'images/items/body/adventurerjacket.png?1', image_mini:'images/items/body/mini/adventurerjacket.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:4, ride:10, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[366] = {item_id:366, nshort:'vest_leather_brown', name:'Brown leather vest', type:'body', level:14, price:800, image:'images/items/body/vest_leather_brown.png?1', image_mini:'images/items/body/mini/vest_leather_brown.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{dodge:8, reflex:7, punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[367] = {item_id:367, nshort:'shirt_canvas', name:'Lniana koszula', type:'body', level:8, price:425, image:'images/items/body/shirt_canvas.png?1', image_mini:'images/items/body/mini/shirt_canvas.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{animal:3, dodge:2}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\
items[368] = {item_id:368, nshort:'dancer_dress', name:'Dancer\\'s dress', type:'body', level:45, price:7500, image:'images/items/body/dancer_dress.png?1', image_mini:'images/items/body/mini/dancer_dress.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:8, shot:8, finger_dexterity:11, animal:10}, attributes:{charisma:2}}, set:{key:'set_dancer', name:'Dancer\\'s set'}, shop:'shop'};\
items[369] = {item_id:369, nshort:'indian_jacket', name:'Indian clothing', type:'body', level:55, price:7500, image:'images/items/body/indian_jacket.png?1', image_mini:'images/items/body/mini/indian_jacket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, hide:9, pitfall:8}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_indian', name:'Indian\\'s set'}, shop:'shop'};\
\
items[372] = {item_id:372, nshort:'pilger_dress', name:'Pilgrim\\'s gown', type:'body', level:38, price:2500, image:'images/items/body/pilger_dress.png?1', image_mini:'images/items/body/mini/pilger_dress.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{dodge:10, build:8}, attributes:{strength:2}}, set:{key:'set_pilgrim_female', name:'Pilgrim\\'s dress set'}, shop:'shop'};\
items[373] = {item_id:373, nshort:'pilger_jacket', name:'Pilgrim\\'s shirt', type:'body', level:38, price:2500, image:'images/items/body/pilger_jacket.png?1', image_mini:'images/items/body/mini/pilger_jacket.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{hide:10, build:8}, attributes:{dexterity:2}}, set:{key:'set_pilgrim_male', name:'Pilgrim\\'s set'}, shop:'shop'};\
\
items[375] = {item_id:375, nshort:'night_shirt', name:'Night gown', type:'body', level:45, price:1500, image:'images/items/body/night_shirt.png?1', image_mini:'images/items/body/mini/night_shirt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Sleepyhead'}, shop:'drop'};\
\
\
items[400] = {item_id:400, nshort:'ripped_shoes_grey', name:'Grey ragged shoes', type:'foot', level:1, price:4, image:'images/items/foot/ripped_shoes_grey.png?1', image_mini:'images/items/foot/mini/ripped_shoes_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[401] = {item_id:401, nshort:'ripped_shoes_brown', name:'Brown ragged shoes', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_brown.png?1', image_mini:'images/items/foot/mini/ripped_shoes_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[402] = {item_id:402, nshort:'ripped_shoes_black', name:'Black ragged shoes', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_black.png?1', image_mini:'images/items/foot/mini/ripped_shoes_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, leadership:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[403] = {item_id:403, nshort:'light_grey', name:'Grey cotton shoes', type:'foot', level:5, price:70, image:'images/items/foot/light_grey.png?1', image_mini:'images/items/foot/mini/light_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[404] = {item_id:404, nshort:'light_brown', name:'Brown cotton shoes', type:'foot', level:9, price:170, image:'images/items/foot/light_brown.png?1', image_mini:'images/items/foot/mini/light_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, hide:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[405] = {item_id:405, nshort:'light_black', name:'Black cotton shoes', type:'foot', level:9, price:170, image:'images/items/foot/light_black.png?1', image_mini:'images/items/foot/mini/light_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, trade:5, shot:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[406] = {item_id:406, nshort:'light_fine', name:'Fancy cotton shoes', type:'foot', level:11, price:1500, image:'images/items/foot/light_fine.png?1', image_mini:'images/items/foot/mini/light_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:4, appearance:6, reflex:6, pitfall:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[407] = {item_id:407, nshort:'working_grey', name:'Grey work shoes', type:'foot', level:9, price:660, image:'images/items/foot/working_grey.png?1', image_mini:'images/items/foot/mini/working_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[408] = {item_id:408, nshort:'working_brown', name:'Brown work shoes', type:'foot', level:13, price:1200, image:'images/items/foot/working_brown.png?1', image_mini:'images/items/foot/mini/working_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, endurance:7, ride:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[409] = {item_id:409, nshort:'working_black', name:'Black work shoes', type:'foot', level:13, price:1200, image:'images/items/foot/working_black.png?1', image_mini:'images/items/foot/mini/working_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, tactic:7}, attributes:{dexterity:1}}, set:{key:'set_farmer', name:'Farmer\\'s set'}, shop:'shop'};\
items[410] = {item_id:410, nshort:'working_fine', name:'Fancy work shoes', type:'foot', level:15, price:4300, image:'images/items/foot/working_fine.png?1', image_mini:'images/items/foot/mini/working_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:11, trade:8, dodge:8, punch:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[411] = {item_id:411, nshort:'spur_grey', name:'Grey spiked shoes', type:'foot', level:14, price:1400, image:'images/items/foot/spur_grey.png?1', image_mini:'images/items/foot/mini/spur_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:7}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[412] = {item_id:412, nshort:'spur_brown', name:'Brown spiked shoes', type:'foot', level:17, price:2450, image:'images/items/foot/spur_brown.png?1', image_mini:'images/items/foot/mini/spur_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:6, reflex:9, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[413] = {item_id:413, nshort:'spur_black', name:'Black spiked shoes', type:'foot', level:17, price:2450, image:'images/items/foot/spur_black.png?1', image_mini:'images/items/foot/mini/spur_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, shot:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[414] = {item_id:414, nshort:'spur_fine', name:'Fancy spiked shoes', type:'foot', level:20, price:6230, image:'images/items/foot/spur_fine.png?1', image_mini:'images/items/foot/mini/spur_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:11, shot:10, health:8, swim:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[415] = {item_id:415, nshort:'boots_grey', name:'Grey boots', type:'foot', level:16, price:3000, image:'images/items/foot/boots_grey.png?1', image_mini:'images/items/foot/mini/boots_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[416] = {item_id:416, nshort:'boots_brown', name:'Brown boots', type:'foot', level:20, price:5100, image:'images/items/foot/boots_brown.png?1', image_mini:'images/items/foot/mini/boots_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, tough:12, dodge:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[417] = {item_id:417, nshort:'boots_black', name:'Black boots', type:'foot', level:20, price:5100, image:'images/items/foot/boots_black.png?1', image_mini:'images/items/foot/mini/boots_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:11}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[418] = {item_id:418, nshort:'boots_fine', name:'Fancy boots', type:'foot', level:22, price:8870, image:'images/items/foot/boots_fine.png?1', image_mini:'images/items/foot/mini/boots_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, endurance:8, hide:8}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[419] = {item_id:419, nshort:'rider_grey', name:'Grey riding boots', type:'foot', level:30, price:2600, image:'images/items/foot/rider_grey.png?1', image_mini:'images/items/foot/mini/rider_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:14}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[420] = {item_id:420, nshort:'rider_brown', name:'Brown riding boots', type:'foot', level:33, price:6200, image:'images/items/foot/rider_brown.png?1', image_mini:'images/items/foot/mini/rider_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:14, punch:13}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[421] = {item_id:421, nshort:'rider_black', name:'Black riding boots', type:'foot', level:33, price:6200, image:'images/items/foot/rider_black.png?1', image_mini:'images/items/foot/mini/rider_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:13, animal:14}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[422] = {item_id:422, nshort:'rider_fine', name:'Fancy riding boots', type:'foot', level:35, price:9500, image:'images/items/foot/rider_fine.png?1', image_mini:'images/items/foot/mini/rider_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:11, punch:10, appearance:8, aim:8}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[423] = {item_id:423, nshort:'soldier_boots', name:'Buty żołnierskie', type:'foot', level:30, price:5500, image:'images/items/foot/soldier_boots.png?1', image_mini:'images/items/foot/mini/soldier_boots.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:12, health:12, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[425] = {item_id:425, nshort:'lace-up_shoes_brown', name:'Brown lace-up shoes', type:'foot', level:13, price:1290, image:'images/items/foot/lace-up_shoes_brown.png?1', image_mini:'images/items/foot/mini/lace-up_shoes_brown.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:4, shot:4, aim:5}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'quest'};\
items[426] = {item_id:426, nshort:'pilgrim_shoes_brown', name:'Brązowe buty pielgrzyma', type:'foot', level:15, price:1530, image:'images/items/foot/pilgrim_shoes_brown.png?1', image_mini:'images/items/foot/mini/pilgrim_shoes_brown.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:6, punch:6, build:4}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\
items[427] = {item_id:427, nshort:'gentleman_shoes', name:'Fancy shoes', type:'foot', level:45, price:5600, image:'images/items/foot/gentleman_shoes.png?1', image_mini:'images/items/foot/mini/gentleman_shoes.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{appearance:8, reflex:9}, attributes:{dexterity:2, strength:2}}, set:{key:'set_gentleman', name:'Gentleman\\'s set'}, shop:'shop'};\
items[428] = {item_id:428, nshort:'mexican_shoes', name:'Sandals', type:'foot', level:28, price:2650, image:'images/items/foot/mexican_shoes.png?1', image_mini:'images/items/foot/mini/mexican_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, aim:6, dodge:8, health:8}, attributes:{}}, set:{key:'set_mexican', name:'Mexican\\'s set'}, shop:'shop'};\
items[429] = {item_id:429, nshort:'mokassins', name:'Moccasins', type:'foot', level:45, price:5600, image:'images/items/foot/mokassins.png?1', image_mini:'images/items/foot/mini/mokassins.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, endurance:9, hide:9}, attributes:{flexibility:2}}, set:{key:'set_indian', name:'Indian\\'s set'}, shop:'shop'};\
\
items[431] = {item_id:431, nshort:'pilger_boots', name:'Pilgrim\\'s dress shoes', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_boots.png?1', image_mini:'images/items/foot/mini/pilger_boots.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{build:7, hide:6, finger_dexterity:8, shot:8}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Pilgrim\\'s dress set'}, shop:'shop'};\
items[432] = {item_id:432, nshort:'pilger_shoes', name:'Pilgrim\\'s shoes', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_shoes.png?1', image_mini:'images/items/foot/mini/pilger_shoes.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{build:7, tough:6, leadership:8, reflex:8}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Pilgrim\\'s set'}, shop:'shop'};\
items[433] = {item_id:433, nshort:'dancer_boots', name:'High heels', type:'foot', level:41, price:4000, image:'images/items/foot/dancer_boots.png?1', image_mini:'images/items/foot/mini/dancer_boots.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{repair:8, aim:9}, attributes:{charisma:1, dexterity:2}}, set:{key:'set_dancer', name:'Dancer\\'s set'}, shop:'shop'};\
\
items[435] = {item_id:435, nshort:'quackery_shoes', name:'Charlatan\\'s shoes', type:'foot', level:45, price:5600, image:'images/items/foot/quackery_shoes.png?1', image_mini:'images/items/foot/mini/quackery_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:9, swim:9, ride:9}, attributes:{flexibility:2}}, set:{key:'set_quackery', name:'Charlatan\\'s set'}, shop:'shop'};\
items[436] = {item_id:436, nshort:'slippers', name:'Slippers', type:'foot', level:45, price:2000, image:'images/items/foot/slippers.png?1', image_mini:'images/items/foot/mini/slippers.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Sleepyhead'}, shop:'shop'};\
items[437] = {item_id:437, nshort:'thanksgiving_boots', name:'Thanksgiving boots', type:'foot', level:30, price:4600, image:'images/items/foot/thanksgiving_boots.png?1', image_mini:'images/items/foot/mini/thanksgiving_boots.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:6, tough:12}, attributes:{dexterity:2}}, set:{key:'season_set', name:'Holiday set'}, shop:'quest'};\
items[438] = {item_id:438, nshort:'greenhorn_shoes', name:'Greenhorn shoes', type:'foot', level:6, price:460, image:'images/items/foot/greenhorn_shoes.png?1', image_mini:'images/items/foot/mini/greenhorn_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, reflex:6}, attributes:{dexterity:1}}, set:{key:'greenhorn_set', name:'Greenhorn set'}, shop:'shop'};\
\
items[500] = {item_id:500, nshort:'neckband_grey', name:'Grey bandana', type:'neck', level:null, price:10, image:'images/items/neck/neckband_grey.png?1', image_mini:'images/items/neck/neckband_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[501] = {item_id:501, nshort:'neckband_red', name:'Red bandana', type:'neck', level:null, price:14, image:'images/items/neck/neckband_red.png?1', image_mini:'images/items/neck/neckband_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[502] = {item_id:502, nshort:'neckband_green', name:'Green bandana', type:'neck', level:null, price:14, image:'images/items/neck/neckband_green.png?1', image_mini:'images/items/neck/neckband_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[503] = {item_id:503, nshort:'neckband_blue', name:'Blue bandana', type:'neck', level:null, price:14, image:'images/items/neck/neckband_blue.png?1', image_mini:'images/items/neck/neckband_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[504] = {item_id:504, nshort:'neckband_yellow', name:'Yellow bandana', type:'neck', level:null, price:14, image:'images/items/neck/neckband_yellow.png?1', image_mini:'images/items/neck/neckband_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[505] = {item_id:505, nshort:'neckband_brown', name:'Brown bandana', type:'neck', level:null, price:20, image:'images/items/neck/neckband_brown.png?1', image_mini:'images/items/neck/neckband_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[506] = {item_id:506, nshort:'neckband_black', name:'Black bandana', type:'neck', level:null, price:20, image:'images/items/neck/neckband_black.png?1', image_mini:'images/items/neck/neckband_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, tactic:1, shot:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[507] = {item_id:507, nshort:'indian_chain_grey', name:'Grey Indian necklace', type:'neck', level:null, price:35, image:'images/items/neck/indian_chain_grey.png?1', image_mini:'images/items/neck/indian_chain_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[508] = {item_id:508, nshort:'indian_chain_red', name:'Red Indian necklace', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_red.png?1', image_mini:'images/items/neck/indian_chain_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, endurance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[509] = {item_id:509, nshort:'indian_chain_green', name:'Green Indian necklace', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_green.png?1', image_mini:'images/items/neck/indian_chain_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[510] = {item_id:510, nshort:'indian_chain_blue', name:'Blue Indian necklace', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_blue.png?1', image_mini:'images/items/neck/indian_chain_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, finger_dexterity:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[511] = {item_id:511, nshort:'indian_chain_yellow', name:'Yellow Indian necklace', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_yellow.png?1', image_mini:'images/items/neck/indian_chain_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[512] = {item_id:512, nshort:'indian_chain_fine', name:'Golden Indian necklace', type:'neck', level:null, price:660, image:'images/items/neck/indian_chain_fine.png?1', image_mini:'images/items/neck/indian_chain_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, hide:4, punch:4, pitfall:3}, attributes:{}}, set:{key:'set_indian', name:'Indian\\'s set'}, shop:'shop'};\
items[513] = {item_id:513, nshort:'loop_grey', name:'Grey bow', type:'neck', level:null, price:125, image:'images/items/neck/loop_grey.png?1', image_mini:'images/items/neck/loop_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[514] = {item_id:514, nshort:'loop_red', name:'Red bow', type:'neck', level:null, price:240, image:'images/items/neck/loop_red.png?1', image_mini:'images/items/neck/loop_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[515] = {item_id:515, nshort:'loop_green', name:'Green bow', type:'neck', level:null, price:240, image:'images/items/neck/loop_green.png?1', image_mini:'images/items/neck/loop_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[516] = {item_id:516, nshort:'loop_blue', name:'Blue bow', type:'neck', level:null, price:240, image:'images/items/neck/loop_blue.png?1', image_mini:'images/items/neck/loop_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[517] = {item_id:517, nshort:'loop_yellow', name:'Yellow bow', type:'neck', level:null, price:240, image:'images/items/neck/loop_yellow.png?1', image_mini:'images/items/neck/loop_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[518] = {item_id:518, nshort:'loop_brown', name:'Brown bow', type:'neck', level:null, price:385, image:'images/items/neck/loop_brown.png?1', image_mini:'images/items/neck/loop_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, dodge:4, endurance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[519] = {item_id:519, nshort:'loop_black', name:'Black bow', type:'neck', level:null, price:385, image:'images/items/neck/loop_black.png?1', image_mini:'images/items/neck/loop_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, appearance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[520] = {item_id:520, nshort:'fly_grey', name:'Grey bow tie', type:'neck', level:null, price:282, image:'images/items/neck/fly_grey.png?1', image_mini:'images/items/neck/fly_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[521] = {item_id:521, nshort:'fly_red', name:'Red bow tie', type:'neck', level:null, price:446, image:'images/items/neck/fly_red.png?1', image_mini:'images/items/neck/fly_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[522] = {item_id:522, nshort:'fly_green', name:'Green bow tie', type:'neck', level:null, price:446, image:'images/items/neck/fly_green.png?1', image_mini:'images/items/neck/fly_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[523] = {item_id:523, nshort:'fly_blue', name:'Blue bow tie', type:'neck', level:null, price:446, image:'images/items/neck/fly_blue.png?1', image_mini:'images/items/neck/fly_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, aim:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[524] = {item_id:524, nshort:'fly_yellow', name:'Yellow bow tie', type:'neck', level:null, price:446, image:'images/items/neck/fly_yellow.png?1', image_mini:'images/items/neck/fly_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, animal:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[525] = {item_id:525, nshort:'fly_brown', name:'Brown bow tie', type:'neck', level:null, price:650, image:'images/items/neck/fly_brown.png?1', image_mini:'images/items/neck/fly_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:10, hide:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[526] = {item_id:526, nshort:'fly_black', name:'Black bow tie', type:'neck', level:null, price:650, image:'images/items/neck/fly_black.png?1', image_mini:'images/items/neck/fly_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, trade:4, pitfall:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[527] = {item_id:527, nshort:'fly_fine', name:'Fancy bow tie', type:'neck', level:null, price:2200, image:'images/items/neck/fly_fine.png?1', image_mini:'images/items/neck/fly_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, repair:6, dodge:6, tactic:5}, attributes:{strength:1}}, set:{key:'set_quackery', name:'Charlatan\\'s set'}, shop:'shop'};\
items[528] = {item_id:528, nshort:'cross_bronze', name:'Plain iron cross', type:'neck', level:null, price:730, image:'images/items/neck/cross_bronze.png?1', image_mini:'images/items/neck/cross_bronze.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:1, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_female', name:'Pilgrim\\'s dress set'}, shop:'shop'};\
items[529] = {item_id:529, nshort:'cross_silver', name:'Silver cross', type:'neck', level:null, price:1200, image:'images/items/neck/cross_silver.png?1', image_mini:'images/items/neck/cross_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:2, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_male', name:'Pilgrim\\'s set'}, shop:'shop'};\
items[530] = {item_id:530, nshort:'cross_gold', name:'Golden cross', type:'neck', level:null, price:3400, image:'images/items/neck/cross_gold.png?1', image_mini:'images/items/neck/cross_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[531] = {item_id:531, nshort:'cravat_grey', name:'Grey tie', type:'neck', level:null, price:820, image:'images/items/neck/cravat_grey.png?1', image_mini:'images/items/neck/cravat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:11, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[532] = {item_id:532, nshort:'cravat_red', name:'Red tie', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_red.png?1', image_mini:'images/items/neck/cravat_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:7}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[533] = {item_id:533, nshort:'cravat_green', name:'Green tie', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_green.png?1', image_mini:'images/items/neck/cravat_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, reflex:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[534] = {item_id:534, nshort:'cravat_blue', name:'Blue tie', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_blue.png?1', image_mini:'images/items/neck/cravat_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[535] = {item_id:535, nshort:'cravat_yellow', name:'Yellow tie', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_yellow.png?1', image_mini:'images/items/neck/cravat_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[536] = {item_id:536, nshort:'cravat_brown', name:'Brown tie', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_brown.png?1', image_mini:'images/items/neck/cravat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:9, dodge:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[537] = {item_id:537, nshort:'cravat_black', name:'Black tie', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_black.png?1', image_mini:'images/items/neck/cravat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9, health:8, finger_dexterity:6}, attributes:{charisma:1}}, set:{key:'set_gentleman', name:'Gentleman\\'s set'}, shop:'shop'};\
items[538] = {item_id:538, nshort:'cravat_fine', name:'Fancy tie', type:'neck', level:null, price:4400, image:'images/items/neck/cravat_fine.png?1', image_mini:'images/items/neck/cravat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, health:10, swim:8, pitfall:7}, attributes:{strength:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[539] = {item_id:539, nshort:'bullet_metal', name:'Lead bullet', type:'neck', level:null, price:1800, image:'images/items/neck/bullet_metal.png?1', image_mini:'images/items/neck/bullet_metal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[540] = {item_id:540, nshort:'bullet_silver', name:'Silver bullet', type:'neck', level:null, price:3350, image:'images/items/neck/bullet_silver.png?1', image_mini:'images/items/neck/bullet_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[541] = {item_id:541, nshort:'bullet_gold', name:'Golden bullet', type:'neck', level:null, price:6750, image:'images/items/neck/bullet_gold.png?1', image_mini:'images/items/neck/bullet_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[542] = {item_id:542, nshort:'kerchief_grey', name:'Grey shawl', type:'neck', level:null, price:2500, image:'images/items/neck/kerchief_grey.png?1', image_mini:'images/items/neck/kerchief_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[543] = {item_id:543, nshort:'kerchief_red', name:'Red shawl', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_red.png?1', image_mini:'images/items/neck/kerchief_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, build:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[544] = {item_id:544, nshort:'kerchief_green', name:'Green shawl', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_green.png?1', image_mini:'images/items/neck/kerchief_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, ride:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[545] = {item_id:545, nshort:'kerchief_blue', name:'Blue shawl', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_blue.png?1', image_mini:'images/items/neck/kerchief_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, appearance:13}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'shop'};\
items[546] = {item_id:546, nshort:'kerchief_yellow', name:'Yellow shawl', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_yellow.png?1', image_mini:'images/items/neck/kerchief_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[547] = {item_id:547, nshort:'kerchief_brown', name:'Brown shawl', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_brown.png?1', image_mini:'images/items/neck/kerchief_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, punch:10, hide:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[548] = {item_id:548, nshort:'kerchief_black', name:'Black shawl', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_black.png?1', image_mini:'images/items/neck/kerchief_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[549] = {item_id:549, nshort:'bullchain_metal', name:'Metal buffalo', type:'neck', level:null, price:2400, image:'images/items/neck/bullchain_metal.png?1', image_mini:'images/items/neck/bullchain_metal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[550] = {item_id:550, nshort:'bullchain_silver', name:'Silver buffalo', type:'neck', level:null, price:4490, image:'images/items/neck/bullchain_silver.png?1', image_mini:'images/items/neck/bullchain_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[551] = {item_id:551, nshort:'bullchain_gold', name:'Golden buffalo', type:'neck', level:null, price:8300, image:'images/items/neck/bullchain_gold.png?1', image_mini:'images/items/neck/bullchain_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[552] = {item_id:552, nshort:'talisman', name:'Talisman', type:'neck', level:null, price:1000, image:'images/items/neck/talisman.png?1', image_mini:'images/items/neck/talisman.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'unk'};\
items[553] = {item_id:553, nshort:'stonechain', name:'Stone chain', type:'neck', level:null, price:1000, image:'images/items/neck/stonechain.png?1', image_mini:'images/items/neck/stonechain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[554] = {item_id:554, nshort:'southcross', name:'Silver Star Medal', type:'neck', level:null, price:650, image:'images/items/neck/southcross.png?1', image_mini:'images/items/neck/southcross.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:8, appearance:7, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[555] = {item_id:555, nshort:'aztecchains', name:'Naszyjnik Azteków', type:'neck', level:null, price:1200, image:'images/items/neck/aztecchains.png?1', image_mini:'images/items/neck/aztecchains.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:9, ride:10, tough:8}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[556] = {item_id:556, nshort:'arrowhead', name:'Arrow head', type:'neck', level:null, price:1150, image:'images/items/neck/arrowhead.png?1', image_mini:'images/items/neck/arrowhead.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:7, aim:7}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[557] = {item_id:557, nshort:'bone_necklace', name:'Naszyjnik z kości', type:'neck', level:null, price:1700, image:'images/items/neck/bone_necklace.png?1', image_mini:'images/items/neck/bone_necklace.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{appearance:3}, attributes:{strength:5}}, set:{key:null, name:null}, shop:'quest'};\
\
items[561] = {item_id:561, nshort:'mexican_neck', name:'Mexican bandana', type:'neck', level:28, price:600, image:'images/items/neck/mexican_neck.png?1', image_mini:'images/items/neck/mexican_neck.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:17}, attributes:{}}, set:{key:'set_mexican', name:'Mexican\\'s set'}, shop:'shop'};\
items[566] = {item_id:566, nshort:'dancer_chain', name:'Pearl choker', type:'neck', level:43, price:1800, image:'images/items/neck/dancer_chain.png?1', image_mini:'images/items/neck/dancer_chain.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:9, leadership:8, pitfall:6}, attributes:{charisma:1}}, set:{key:'set_dancer', name:'Dancer\\'s set'}, shop:'drop'};\
items[567] = {item_id:567, nshort:'amulett', name:'Necklace of endearment', type:'neck', level:30, price:2412, image:'images/items/neck/amulett.png?1', image_mini:'images/items/neck/amulett.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, animal:15, trade:15, leadership:15}, attributes:{}}, set:{key:'season_set', name:'Holiday set'}, shop:'quest'};\
items[568] = {item_id:568, nshort:'teethchain', name:'Holy talisman', type:'neck', level:40, price:2012, image:'images/items/neck/teethchain.png?1', image_mini:'images/items/neck/teethchain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:4, leadership:8, hide:4}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\
items[569] = {item_id:569, nshort:'greenhorn_neck', name:'Dust rag', type:'neck', level:1, price:350, image:'images/items/neck/greenhorn_neck.png?1', image_mini:'images/items/neck/greenhorn_neck.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:1, endurance:2}, attributes:{}}, set:{key:'greenhorn_set', name:'Greenhorn set'}, shop:'shop'};\
items[570] = {item_id:570, nshort:'xmas_schal', name:'Szalik zimowy', type:'neck', level:1, price:2010, image:'images/items/neck/xmas_schal.png?1', image_mini:'images/items/neck/xmas_schal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'quest'};\
\
\
items[600] = {item_id:600, nshort:'donkey', name:'Donkey', type:'animal', level:1, price:250, image:'images/items/animal/donkey.png?1', image_mini:'images/items/animal/mini/donkey.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Mexican\\'s set'}, shop:'shop'};\
items[601] = {item_id:601, nshort:'pony', name:'Pony', type:'animal', level:1, price:500, image:'images/items/animal/pony.png?1', image_mini:'images/items/animal/mini/pony.png?1', characterClass:null, characterSex:null, speed:0.666, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[602] = {item_id:602, nshort:'mustang', name:'Mustang', type:'animal', level:1, price:850, image:'images/items/animal/mustang.png?1', image_mini:'images/items/animal/mini/mustang.png?1', characterClass:null, characterSex:null, speed:0.571, bonus:{skills:{}, attributes:{}}, set:{key:'set_indian', name:'Indian\\'s set'}, shop:'shop'};\
items[603] = {item_id:603, nshort:'berber', name:'White horse', type:'animal', level:1, price:1250, image:'images/items/animal/berber.png?1', image_mini:'images/items/animal/mini/berber.png?1', characterClass:null, characterSex:null, speed:0.5, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[604] = {item_id:604, nshort:'araber', name:'Arabian ', type:'animal', level:1, price:2000, image:'images/items/animal/araber.png?1', image_mini:'images/items/animal/mini/araber.png?1', characterClass:null, characterSex:null, speed:0.444, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[605] = {item_id:605, nshort:'quarter', name:'Quarter Horse', type:'animal', level:1, price:2800, image:'images/items/animal/quarter.png?1', image_mini:'images/items/animal/mini/quarter.png?1', characterClass:null, characterSex:null, speed:0.4, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[606] = {item_id:606, nshort:'charriot', name:'Wóz do zaprzężenia woła', type:'animal', level:1, price:1500, image:'images/items/animal/charriot.png?1', image_mini:'images/items/animal/mini/charriot.png?1', characterClass:null, characterSex:null, speed:0.909, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[607] = {item_id:607, nshort:'young_stallion', name:'Young stallion', type:'animal', level:1, price:250, image:'images/items/animal/young_stallion.png?1', image_mini:'images/items/animal/mini/young_stallion.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'greenhorn_set', name:'Greenhorn set'}, shop:'shop'};\
items[608] = {item_id:608, nshort:'xmas_rudolph', name:'Rudolf', type:'animal', level:1, price:250, image:'images/items/animal/xmas_rudolph.png?1', image_mini:'images/items/animal/mini/xmas_rudolph.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[609] = {item_id:609, nshort:'xmas_slide', name:'Bożonarodzeniowe sanie', type:'animal', level:1, price:550, image:'images/items/animal/xmas_slide.png?1', image_mini:'images/items/animal/mini/xmas_slide.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'season_set', name:'Holiday set'}, shop:'drop'};\
items[700] = {item_id:700, nshort:'ham', name:'Ham', type:'yield', level:null, price:10, image:'images/items/yield/ham.png?1', image_mini:'images/items/yield/ham.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[701] = {item_id:701, nshort:'cereals', name:'Grain', type:'yield', level:null, price:3, image:'images/items/yield/cereals.png?1', image_mini:'images/items/yield/cereals.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[702] = {item_id:702, nshort:'tabacco', name:'Tobacco', type:'yield', level:null, price:5, image:'images/items/yield/tabacco.png?1', image_mini:'images/items/yield/tabacco.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[703] = {item_id:703, nshort:'sugar', name:'Sugar', type:'yield', level:null, price:8, image:'images/items/yield/sugar.png?1', image_mini:'images/items/yield/sugar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[704] = {item_id:704, nshort:'cotton', name:'Cotton', type:'yield', level:null, price:6, image:'images/items/yield/cotton.png?1', image_mini:'images/items/yield/cotton.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[705] = {item_id:705, nshort:'trout', name:'Trout', type:'yield', level:null, price:4, image:'images/items/yield/trout.png?1', image_mini:'images/items/yield/trout.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[706] = {item_id:706, nshort:'berrys', name:'Berries', type:'yield', level:null, price:4, image:'images/items/yield/berrys.png?1', image_mini:'images/items/yield/berrys.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[707] = {item_id:707, nshort:'shearings', name:'Wool', type:'yield', level:null, price:8, image:'images/items/yield/shearings.png?1', image_mini:'images/items/yield/shearings.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[708] = {item_id:708, nshort:'copper_pyrites', name:'Fool\\'s gold', type:'yield', level:null, price:16, image:'images/items/yield/copper_pyrites.png?1', image_mini:'images/items/yield/copper_pyrites.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[709] = {item_id:709, nshort:'turkey', name:'Turkey', type:'yield', level:null, price:14, image:'images/items/yield/turkey.png?1', image_mini:'images/items/yield/turkey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[710] = {item_id:710, nshort:'beef', name:'T-Bone-Steak', type:'yield', level:null, price:24, image:'images/items/yield/beef.png?1', image_mini:'images/items/yield/beef.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[711] = {item_id:711, nshort:'planks', name:'Wood', type:'yield', level:null, price:16, image:'images/items/yield/planks.png?1', image_mini:'images/items/yield/planks.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[712] = {item_id:712, nshort:'leather', name:'Leather', type:'yield', level:null, price:16, image:'images/items/yield/leather.png?1', image_mini:'images/items/yield/leather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[714] = {item_id:714, nshort:'beaver', name:'Beaver skin', type:'yield', level:null, price:36, image:'images/items/yield/beaver.png?1', image_mini:'images/items/yield/beaver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[715] = {item_id:715, nshort:'fabric', name:'Roll of cloth', type:'yield', level:null, price:22, image:'images/items/yield/fabric.png?1', image_mini:'images/items/yield/fabric.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[716] = {item_id:716, nshort:'stone', name:'Granite blocks', type:'yield', level:null, price:10, image:'images/items/yield/stone.png?1', image_mini:'images/items/yield/stone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[717] = {item_id:717, nshort:'grund', name:'Salmon', type:'yield', level:null, price:14, image:'images/items/yield/grund.png?1', image_mini:'images/items/yield/grund.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[718] = {item_id:718, nshort:'coyote', name:'Coyote tooth', type:'yield', level:null, price:42, image:'images/items/yield/coyote.png?1', image_mini:'images/items/yield/coyote.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[719] = {item_id:719, nshort:'cigar', name:'Cigars', type:'yield', level:null, price:24, image:'images/items/yield/cigar.png?1', image_mini:'images/items/yield/cigar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[720] = {item_id:720, nshort:'gems', name:'Semi-precious stones', type:'yield', level:null, price:70, image:'images/items/yield/gems.png?1', image_mini:'images/items/yield/gems.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[721] = {item_id:721, nshort:'coal', name:'Coal', type:'yield', level:null, price:20, image:'images/items/yield/coal.png?1', image_mini:'images/items/yield/coal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[722] = {item_id:722, nshort:'meal', name:'Warm meal', type:'yield', level:null, price:14, image:'images/items/yield/meal.png?1', image_mini:'images/items/yield/meal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[723] = {item_id:723, nshort:'ring', name:'Ring', type:'yield', level:null, price:160, image:'images/items/yield/ring.png?1', image_mini:'images/items/yield/ring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Pilgrim\\'s dress set'}, shop:'drop'};\
items[724] = {item_id:724, nshort:'buffalo', name:'Buffalo skin', type:'yield', level:null, price:40, image:'images/items/yield/buffalo.png?1', image_mini:'images/items/yield/buffalo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[725] = {item_id:725, nshort:'silver', name:'Silver', type:'yield', level:null, price:200, image:'images/items/yield/silver.png?1', image_mini:'images/items/yield/silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[726] = {item_id:726, nshort:'indiangold', name:'Aztec gold', type:'yield', level:null, price:290, image:'images/items/yield/indiangold.png?1', image_mini:'images/items/yield/indiangold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[727] = {item_id:727, nshort:'medal', name:'Medal of honor', type:'yield', level:null, price:500, image:'images/items/yield/medal.png?1', image_mini:'images/items/yield/medal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[728] = {item_id:728, nshort:'watch', name:'Pocket watch', type:'yield', level:null, price:210, image:'images/items/yield/watch.png?1', image_mini:'images/items/yield/watch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[729] = {item_id:729, nshort:'stolen_goods', name:'Smuggled goods', type:'yield', level:null, price:110, image:'images/items/yield/stolen_goods.png?1', image_mini:'images/items/yield/stolen_goods.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[730] = {item_id:730, nshort:'necklet', name:'Fancy jewelry', type:'yield', level:null, price:230, image:'images/items/yield/necklet.png?1', image_mini:'images/items/yield/necklet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[731] = {item_id:731, nshort:'grizzly', name:'Trophy', type:'yield', level:null, price:150, image:'images/items/yield/grizzly.png?1', image_mini:'images/items/yield/grizzly.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[733] = {item_id:733, nshort:'packet', name:'Parcel', type:'yield', level:null, price:32, image:'images/items/yield/packet.png?1', image_mini:'images/items/yield/packet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[734] = {item_id:734, nshort:'slicer', name:'Planer', type:'yield', level:null, price:44, image:'images/items/yield/slicer.png?1', image_mini:'images/items/yield/slicer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[736] = {item_id:736, nshort:'spade', name:'Spade', type:'yield', level:null, price:40, image:'images/items/yield/spade.png?1', image_mini:'images/items/yield/spade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[737] = {item_id:737, nshort:'dynamite', name:'Dynamite', type:'yield', level:null, price:80, image:'images/items/yield/dynamite.png?1', image_mini:'images/items/yield/dynamite.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[739] = {item_id:739, nshort:'fence', name:'Barbed wire', type:'yield', level:null, price:36, image:'images/items/yield/fence.png?1', image_mini:'images/items/yield/fence.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[740] = {item_id:740, nshort:'horn', name:'Horn of a cow', type:'yield', level:null, price:78, image:'images/items/yield/horn.png?1', image_mini:'images/items/yield/horn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[741] = {item_id:741, nshort:'pitcher', name:'Jug', type:'yield', level:null, price:24, image:'images/items/yield/pitcher.png?1', image_mini:'images/items/yield/pitcher.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[742] = {item_id:742, nshort:'saw', name:'Saw', type:'yield', level:null, price:40, image:'images/items/yield/saw.png?1', image_mini:'images/items/yield/saw.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[743] = {item_id:743, nshort:'poster', name:'Poster', type:'yield', level:null, price:4, image:'images/items/yield/poster.png?1', image_mini:'images/items/yield/poster.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[744] = {item_id:744, nshort:'newspaper', name:'Newspaper *The Western Star*', type:'yield', level:null, price:6, image:'images/items/yield/newspaper.png?1', image_mini:'images/items/yield/newspaper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[745] = {item_id:745, nshort:'flour', name:'Flour', type:'yield', level:null, price:5, image:'images/items/yield/flour.png?1', image_mini:'images/items/yield/flour.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[746] = {item_id:746, nshort:'beans', name:'Beans', type:'yield', level:null, price:6, image:'images/items/yield/beans.png?1', image_mini:'images/items/yield/beans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[747] = {item_id:747, nshort:'hammer', name:'Hammer', type:'yield', level:null, price:22, image:'images/items/yield/hammer.png?1', image_mini:'images/items/yield/hammer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[748] = {item_id:748, nshort:'corn', name:'Corn', type:'yield', level:null, price:4, image:'images/items/yield/corn.png?1', image_mini:'images/items/yield/corn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[749] = {item_id:749, nshort:'rope', name:'Lasso', type:'yield', level:null, price:32, image:'images/items/yield/rope.png?1', image_mini:'images/items/yield/rope.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[750] = {item_id:750, nshort:'nippers', name:'Handcuffs', type:'yield', level:null, price:58, image:'images/items/yield/nippers.png?1', image_mini:'images/items/yield/nippers.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[751] = {item_id:751, nshort:'pipe', name:'Calumet', type:'yield', level:null, price:72, image:'images/items/yield/pipe.png?1', image_mini:'images/items/yield/pipe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[752] = {item_id:752, nshort:'oil', name:'Oil', type:'yield', level:null, price:76, image:'images/items/yield/oil.png?1', image_mini:'images/items/yield/oil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[753] = {item_id:753, nshort:'pick', name:'Pickaxe', type:'yield', level:null, price:44, image:'images/items/yield/pick.png?1', image_mini:'images/items/yield/pick.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[754] = {item_id:754, nshort:'horseshoe', name:'Horseshoe', type:'yield', level:null, price:30, image:'images/items/yield/horseshoe.png?1', image_mini:'images/items/yield/horseshoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[755] = {item_id:755, nshort:'flag', name:'Flag', type:'yield', level:null, price:32, image:'images/items/yield/flag.png?1', image_mini:'images/items/yield/flag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[756] = {item_id:756, nshort:'toolbox', name:'Tool box', type:'yield', level:null, price:110, image:'images/items/yield/toolbox.png?1', image_mini:'images/items/yield/toolbox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[757] = {item_id:757, nshort:'feather', name:'Raven feather', type:'yield', level:null, price:8, image:'images/items/yield/feather.png?1', image_mini:'images/items/yield/feather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[758] = {item_id:758, nshort:'flag_north', name:'Union flag', type:'yield', level:null, price:86, image:'images/items/yield/flag_north.png?1', image_mini:'images/items/yield/flag_north.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[759] = {item_id:759, nshort:'ticket', name:'Train ticket', type:'yield', level:null, price:34, image:'images/items/yield/ticket.png?1', image_mini:'images/items/yield/ticket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[760] = {item_id:760, nshort:'map', name:'Map', type:'yield', level:null, price:32, image:'images/items/yield/map.png?1', image_mini:'images/items/yield/map.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[761] = {item_id:761, nshort:'sledgehammer', name:'Sledge hammer', type:'yield', level:null, price:52, image:'images/items/yield/sledgehammer.png?1', image_mini:'images/items/yield/sledgehammer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[762] = {item_id:762, nshort:'flag_south', name:'Confederate flag', type:'yield', level:null, price:86, image:'images/items/yield/flag_south.png?1', image_mini:'images/items/yield/flag_south.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[763] = {item_id:763, nshort:'wolf', name:'Tooth bracelet', type:'yield', level:null, price:44, image:'images/items/yield/wolf.png?1', image_mini:'images/items/yield/wolf.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[764] = {item_id:764, nshort:'shackle', name:'Shackle', type:'yield', level:null, price:62, image:'images/items/yield/shackle.png?1', image_mini:'images/items/yield/shackle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[765] = {item_id:765, nshort:'sickle', name:'Sickle', type:'yield', level:null, price:44, image:'images/items/yield/sickle.png?1', image_mini:'images/items/yield/sickle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[766] = {item_id:766, nshort:'water', name:'Glass of water', type:'yield', level:null, price:6, image:'images/items/yield/water.png?1', image_mini:'images/items/yield/water.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[767] = {item_id:767, nshort:'string', name:'Roll with wire', type:'yield', level:null, price:34, image:'images/items/yield/string.png?1', image_mini:'images/items/yield/string.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[768] = {item_id:768, nshort:'hymnal', name:'Song book', type:'yield', level:null, price:48, image:'images/items/yield/hymnal.png?1', image_mini:'images/items/yield/hymnal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Pilgrim\\'s set'}, shop:'drop'};\
items[769] = {item_id:769, nshort:'empty_bottle', name:'Pusta butelka', type:'yield', level:null, price:2, image:'images/items/yield/empty_bottle.png?1', image_mini:'images/items/yield/empty_bottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[770] = {item_id:770, nshort:'beer', name:'Beer', type:'yield', level:null, price:0, image:'images/items/yield/beer.png?1', image_mini:'images/items/yield/beer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[771] = {item_id:771, nshort:'trap', name:'Beaver trap', type:'yield', level:null, price:50, image:'images/items/yield/trap.png?1', image_mini:'images/items/yield/trap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[772] = {item_id:772, nshort:'falcon', name:'Złoty Sokół', type:'yield', level:null, price:0, image:'images/items/yield/falcon.png?1', image_mini:'images/items/yield/falcon.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[773] = {item_id:773, nshort:'paper1', name:'Piece of a note (Part 1)', type:'yield', level:null, price:1400, image:'images/items/yield/paper1.png?1', image_mini:'images/items/yield/paper1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[774] = {item_id:774, nshort:'paper2', name:'Piece of a note (Part 2)', type:'yield', level:null, price:590, image:'images/items/yield/paper2.png?1', image_mini:'images/items/yield/paper2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[775] = {item_id:775, nshort:'paper3', name:'Piece of a note (Part 3)', type:'yield', level:null, price:590, image:'images/items/yield/paper3.png?1', image_mini:'images/items/yield/paper3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[776] = {item_id:776, nshort:'kates_ring', name:'Pierścień Kate', type:'yield', level:null, price:1000, image:'images/items/yield/kates_ring.png?1', image_mini:'images/items/yield/kates_ring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[778] = {item_id:778, nshort:'cooking_pot', name:'Cooking pot', type:'yield', level:null, price:22, image:'images/items/yield/cooking_pot.png?1', image_mini:'images/items/yield/cooking_pot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[779] = {item_id:779, nshort:'post_horn', name:'Post horn', type:'yield', level:null, price:60, image:'images/items/yield/post_horn.png?1', image_mini:'images/items/yield/post_horn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[780] = {item_id:780, nshort:'rounds', name:'Rounds', type:'yield', level:null, price:50, image:'images/items/yield/rounds.png?1', image_mini:'images/items/yield/rounds.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[781] = {item_id:781, nshort:'documents', name:'Documents', type:'yield', level:null, price:120, image:'images/items/yield/documents.png?1', image_mini:'images/items/yield/documents.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[782] = {item_id:782, nshort:'angle', name:'Fishing rod', type:'yield', level:null, price:42, image:'images/items/yield/angle.png?1', image_mini:'images/items/yield/angle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[783] = {item_id:783, nshort:'gold_sculpture', name:'Golden figurine', type:'yield', level:null, price:144, image:'images/items/yield/gold_sculpture.png?1', image_mini:'images/items/yield/gold_sculpture.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[784] = {item_id:784, nshort:'nails', name:'Nails', type:'yield', level:null, price:8, image:'images/items/yield/nails.png?1', image_mini:'images/items/yield/nails.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[786] = {item_id:786, nshort:'picture', name:'Canvas', type:'yield', level:null, price:340, image:'images/items/yield/picture.png?1', image_mini:'images/items/yield/picture.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[787] = {item_id:787, nshort:'saddle', name:'Saddle', type:'yield', level:null, price:80, image:'images/items/yield/saddle.png?1', image_mini:'images/items/yield/saddle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[788] = {item_id:788, nshort:'bell', name:'Ship\\'s bell', type:'yield', level:null, price:130, image:'images/items/yield/bell.png?1', image_mini:'images/items/yield/bell.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[789] = {item_id:789, nshort:'coin', name:'Quarter', type:'yield', level:null, price:2, image:'images/items/yield/coin.png?1', image_mini:'images/items/yield/coin.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[790] = {item_id:790, nshort:'iron', name:'Iron rod', type:'yield', level:null, price:36, image:'images/items/yield/iron.png?1', image_mini:'images/items/yield/iron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[791] = {item_id:791, nshort:'orange', name:'Oranges', type:'yield', level:null, price:8, image:'images/items/yield/orange.png?1', image_mini:'images/items/yield/orange.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[792] = {item_id:792, nshort:'tequila', name:'Tequila', type:'yield', level:null, price:24, image:'images/items/yield/tequila.png?1', image_mini:'images/items/yield/tequila.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Mexican\\'s set'}, shop:'drop'};\
items[793] = {item_id:793, nshort:'tomato', name:'Tomato', type:'yield', level:null, price:6, image:'images/items/yield/tomato.png?1', image_mini:'images/items/yield/tomato.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[794] = {item_id:794, nshort:'potion', name:'Elixir', type:'yield', level:null, price:360, image:'images/items/yield/potion.png?1', image_mini:'images/items/yield/potion.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_quackery', name:'Charlatan\\'s set'}, shop:'drop'};\
items[795] = {item_id:795, nshort:'peg', name:'Spike', type:'yield', level:null, price:15, image:'images/items/yield/peg.png?1', image_mini:'images/items/yield/peg.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[796] = {item_id:796, nshort:'brush_shoe', name:'Szczotka do butów', type:'yield', level:null, price:14, image:'images/items/yield/brush_shoe.png?1', image_mini:'images/items/yield/brush_shoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[797] = {item_id:797, nshort:'pitchfork', name:'Pitchfork', type:'yield', level:null, price:32, image:'images/items/yield/pitchfork.png?1', image_mini:'images/items/yield/pitchfork.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_farmer', name:'Farmer\\'s set'}, shop:'drop'};\
\
\
items[800] = {item_id:800, nshort:'stone_pebble', name:'Pebble', type:'right_arm', level:2, price:15, image:'images/items/right_arm/stone_pebble.png?1', image_mini:'images/items/right_arm/mini/stone_pebble.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[801] = {item_id:801, nshort:'stone_flint', name:'Fire stone', type:'right_arm', level:5, price:26, image:'images/items/right_arm/stone_flint.png?1', image_mini:'images/items/right_arm/mini/stone_flint.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[802] = {item_id:802, nshort:'stone_granite', name:'Granite', type:'right_arm', level:8, price:46, image:'images/items/right_arm/stone_granite.png?1', image_mini:'images/items/right_arm/mini/stone_granite.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[803] = {item_id:803, nshort:'crutch_rusty', name:'Wytarta proca', type:'right_arm', level:7, price:26, image:'images/items/right_arm/crutch_rusty.png?1', image_mini:'images/items/right_arm/mini/crutch_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[804] = {item_id:804, nshort:'crutch', name:'Slingshot', type:'right_arm', level:10, price:63, image:'images/items/right_arm/crutch.png?1', image_mini:'images/items/right_arm/mini/crutch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[805] = {item_id:805, nshort:'crutch_accurate', name:'Precise slingshot', type:'right_arm', level:13, price:148, image:'images/items/right_arm/crutch_accurate.png?1', image_mini:'images/items/right_arm/mini/crutch_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[806] = {item_id:806, nshort:'crutch_huckeberry', name:'Huckleberry\\'s Slingshot', type:'right_arm', level:20, price:1360, image:'images/items/right_arm/crutch_huckeberry.png?1', image_mini:'images/items/right_arm/mini/crutch_huckeberry.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[807] = {item_id:807, nshort:'leadshot_rusty', name:'Rusty shotgun', type:'right_arm', level:17, price:124, image:'images/items/right_arm/leadshot_rusty.png?1', image_mini:'images/items/right_arm/mini/leadshot_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[808] = {item_id:808, nshort:'leadshot', name:'Shotgun', type:'right_arm', level:20, price:384, image:'images/items/right_arm/leadshot.png?1', image_mini:'images/items/right_arm/mini/leadshot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[809] = {item_id:809, nshort:'leadshot_accurate', name:'Precise shotgun', type:'right_arm', level:23, price:550, image:'images/items/right_arm/leadshot_accurate.png?1', image_mini:'images/items/right_arm/mini/leadshot_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[810] = {item_id:810, nshort:'leadshot_granmonts', name:'Granmont\\'s Pistol', type:'right_arm', level:30, price:2680, image:'images/items/right_arm/leadshot_granmonts.png?1', image_mini:'images/items/right_arm/mini/leadshot_granmonts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:4, tough:3}, attributes:{}}, set:{key:null, name:null}, drop:'drop'};\
items[811] = {item_id:811, nshort:'muzzleloader_rusty', name:'Rusty Muzzle-loader', type:'right_arm', level:22, price:326, image:'images/items/right_arm/muzzleloader_rusty.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[812] = {item_id:812, nshort:'muzzleloader', name:'Muzzle-loader', type:'right_arm', level:25, price:545, image:'images/items/right_arm/muzzleloader.png?1', image_mini:'images/items/right_arm/mini/muzzleloader.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[813] = {item_id:813, nshort:'muzzleloader_accurate', name:'Precise Muzzle-loader', type:'right_arm', level:28, price:940, image:'images/items/right_arm/muzzleloader_accurate.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[814] = {item_id:814, nshort:'muzzleloader_drake', name:'Drake\\'s Muzzle-loader', type:'right_arm', level:35, price:3580, image:'images/items/right_arm/muzzleloader_drake.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_drake.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[815] = {item_id:815, nshort:'deringer_rusty', name:'Rusty Deringer', type:'right_arm', level:32, price:730, image:'images/items/right_arm/deringer_rusty.png?1', image_mini:'images/items/right_arm/mini/deringer_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[816] = {item_id:816, nshort:'deringer', name:'Deringer', type:'right_arm', level:35, price:1280, image:'images/items/right_arm/deringer.png?1', image_mini:'images/items/right_arm/mini/deringer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[817] = {item_id:817, nshort:'deringer_accurate', name:'Precise Deringer', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/deringer_accurate.png?1', image_mini:'images/items/right_arm/mini/deringer_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[818] = {item_id:818, nshort:'deringer_bellestar', name:'Belle Starr\\'s Deringer', type:'right_arm', level:45, price:5500, image:'images/items/right_arm/deringer_bellestar.png?1', image_mini:'images/items/right_arm/mini/deringer_bellestar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:4, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[819] = {item_id:819, nshort:'pepperbox_rusty', name:'Rusty pepperbox revolver', type:'right_arm', level:37, price:940, image:'images/items/right_arm/pepperbox_rusty.png?1', image_mini:'images/items/right_arm/mini/pepperbox_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[820] = {item_id:820, nshort:'pepperbox', name:'Pepperbox revolver', type:'right_arm', level:40, price:1440, image:'images/items/right_arm/pepperbox.png?1', image_mini:'images/items/right_arm/mini/pepperbox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[821] = {item_id:821, nshort:'pepperbox_accurate', name:'Precise pepperbox revolver', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/pepperbox_accurate.png?1', image_mini:'images/items/right_arm/mini/pepperbox_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[822] = {item_id:822, nshort:'pepperbox_allen', name:'Allen\\'s pepperbox revolver', type:'right_arm', level:50, price:6850, image:'images/items/right_arm/pepperbox_allen.png?1', image_mini:'images/items/right_arm/mini/pepperbox_allen.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, aim:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[823] = {item_id:823, nshort:'smith_rusty', name:'Rusty revolver No 1', type:'right_arm', level:47, price:1650, image:'images/items/right_arm/smith_rusty.png?1', image_mini:'images/items/right_arm/mini/smith_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[824] = {item_id:824, nshort:'smith', name:'Revolver No 1', type:'right_arm', level:50, price:2350, image:'images/items/right_arm/smith.png?1', image_mini:'images/items/right_arm/mini/smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[825] = {item_id:825, nshort:'smith_accurate', name:'Precise revolver No 1', type:'right_arm', level:53, price:3180, image:'images/items/right_arm/smith_accurate.png?1', image_mini:'images/items/right_arm/mini/smith_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[826] = {item_id:826, nshort:'smith_younger', name:'Revolver Youngers', type:'right_arm', level:60, price:8700, image:'images/items/right_arm/smith_younger.png?1', image_mini:'images/items/right_arm/mini/smith_younger.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:6, pitfall:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[827] = {item_id:827, nshort:'remington_rusty', name:'Rusty army revolver', type:'right_arm', level:52, price:2150, image:'images/items/right_arm/remington_rusty.png?1', image_mini:'images/items/right_arm/mini/remington_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[828] = {item_id:828, nshort:'remington', name:'Army revolver', type:'right_arm', level:55, price:2950, image:'images/items/right_arm/remington.png?1', image_mini:'images/items/right_arm/mini/remington.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[829] = {item_id:829, nshort:'remington_accurate', name:'Precise army revolver', type:'right_arm', level:58, price:3940, image:'images/items/right_arm/remington_accurate.png?1', image_mini:'images/items/right_arm/mini/remington_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[830] = {item_id:830, nshort:'remington_ike', name:'Rewolwer Ike\\'a', type:'right_arm', level:65, price:9400, image:'images/items/right_arm/remington_ike.png?1', image_mini:'images/items/right_arm/mini/remington_ike.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:7, endurance:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[831] = {item_id:831, nshort:'peacemaker_rusty', name:'Rusty Peacemaker', type:'right_arm', level:62, price:3380, image:'images/items/right_arm/peacemaker_rusty.png?1', image_mini:'images/items/right_arm/mini/peacemaker_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[832] = {item_id:832, nshort:'peacemaker', name:'Peacemaker', type:'right_arm', level:65, price:4570, image:'images/items/right_arm/peacemaker.png?1', image_mini:'images/items/right_arm/mini/peacemaker.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[833] = {item_id:833, nshort:'peacemaker_accurate', name:'Precise Peacemaker', type:'right_arm', level:68, price:5400, image:'images/items/right_arm/peacemaker_accurate.png?1', image_mini:'images/items/right_arm/mini/peacemaker_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[834] = {item_id:834, nshort:'peacemaker_billy', name:'Colt Peacemaker Billa', type:'right_arm', level:75, price:10300, image:'images/items/right_arm/peacemaker_billy.png?1', image_mini:'images/items/right_arm/mini/peacemaker_billy.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[835] = {item_id:835, nshort:'schofield_rusty', name:'Rusty Schofield', type:'right_arm', level:67, price:4250, image:'images/items/right_arm/schofield_rusty.png?1', image_mini:'images/items/right_arm/mini/schofield_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[836] = {item_id:836, nshort:'schofield', name:'Schofield', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/schofield.png?1', image_mini:'images/items/right_arm/mini/schofield.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[837] = {item_id:837, nshort:'schofield_accurate', name:'Precise Schofield', type:'right_arm', level:73, price:6400, image:'images/items/right_arm/schofield_accurate.png?1', image_mini:'images/items/right_arm/mini/schofield_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[838] = {item_id:838, nshort:'schofield_jessejames', name:'Smith & Wesson Schofield Jesseiego James\\'a', type:'right_arm', level:80, price:10600, image:'images/items/right_arm/schofield_jessejames.png?1', image_mini:'images/items/right_arm/mini/schofield_jessejames.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:8, trade:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[839] = {item_id:839, nshort:'buntline_rusty', name:'Rusty Colt Buntline', type:'right_arm', level:72, price:5375, image:'images/items/right_arm/buntline_rusty.png?1', image_mini:'images/items/right_arm/mini/buntline_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[840] = {item_id:840, nshort:'buntline', name:'Colt Buntline', type:'right_arm', level:75, price:6250, image:'images/items/right_arm/buntline.png?1', image_mini:'images/items/right_arm/mini/buntline.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[841] = {item_id:841, nshort:'buntline_accurate', name:'Precise Buntline', type:'right_arm', level:78, price:7250, image:'images/items/right_arm/buntline_accurate.png?1', image_mini:'images/items/right_arm/mini/buntline_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[842] = {item_id:842, nshort:'buntline_wyattearp', name:'Wyatt Earp\\'s Colt Buntline', type:'right_arm', level:85, price:11200, image:'images/items/right_arm/buntline_wyattearp.png?1', image_mini:'images/items/right_arm/mini/buntline_wyattearp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, aim:4, reflex:4, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[843] = {item_id:843, nshort:'boomerang', name:'Boomerang', type:'right_arm', level:8, price:126, image:'images/items/right_arm/boomerang.png?1', image_mini:'images/items/right_arm/mini/boomerang.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{reflex:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[844] = {item_id:844, nshort:'throwing_knives', name:'Throwing knives', type:'right_arm', level:33, price:1152, image:'images/items/right_arm/throwing_knives.png?1', image_mini:'images/items/right_arm/mini/throwing_knives.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[845] = {item_id:845, nshort:'sawed_off', name:'Sawed-off shotgun', type:'right_arm', level:51, price:2940, image:'images/items/right_arm/sawed_off.png?1', image_mini:'images/items/right_arm/mini/sawed_off.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:3, shot:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[846] = {item_id:846, nshort:'trompet', name:'Trąba', type:'right_arm', level:20, price:1200, image:'images/items/right_arm/trompet.png?1', image_mini:'images/items/right_arm/mini/trompet.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6}}, set:{key:null, name:null}, shop:'quest'};\
\
items[854] = {item_id:854, nshort:'elixier', name:'Corrosive acid', type:'right_arm', level:42, price:1500, image:'images/items/right_arm/elixier.png?1', image_mini:'images/items/right_arm/mini/elixier.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:'set_quackery', name:'Charlatan\\'s set'}, shop:'shop'};\
\
items[856] = {item_id:856, nshort:'smells_like_eggspirit', name:'Rotten eggs', type:'right_arm', level:45, price:2500, image:'images/items/right_arm/smells_like_eggspirit.png?1', image_mini:'images/items/right_arm/mini/smells_like_eggspirit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'season_set', name:'Holiday set'}, shop:'quest'};\
\
items[858] = {item_id:858, nshort:'golden_gun', name:'Golden Colt', type:'right_arm', level:70, price:22500, image:'images/items/right_arm/golden_gun.png?1', image_mini:'images/items/right_arm/mini/golden_gun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, aim:4}, attributes:{}}, set:{key:'gold_set', name:'Golden set'}, shop:'quest'};\
items[859] = {item_id:859, nshort:'greenhorn_gun', name:'Greenhorn slingshot', type:'right_arm', level:6, price:550, image:'images/items/right_arm/greenhorn_gun.png?1', image_mini:'images/items/right_arm/mini/greenhorn_gun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:1}, attributes:{}}, set:{key:'greenhorn_set', name:'Greenhorn set'}, shop:'shop'};\
\
items[1364] = {item_id:1364, nshort:'uniform_perfect', name:'Mundur', type:'body', level:20, price:800, image:'images/items/body/uniform_perfect.png?1', image_mini:'images/items/body/mini/uniform_perfect.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:3, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1702] = {item_id:1702, nshort:'compass', name:'Kompas', type:'yield', level:null, price:380, image:'images/items/yield/compass.png?1', image_mini:'images/items/yield/compass.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1703] = {item_id:1703, nshort:'lamp', name:'Lampa', type:'yield', level:null, price:80, image:'images/items/yield/lamp.png?1', image_mini:'images/items/yield/lamp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1706] = {item_id:1706, nshort:'letter', name:'List', type:'yield', level:null, price:1, image:'images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1708] = {item_id:1708, nshort:'whiskey', name:'Whiskey', type:'yield', level:null, price:10, image:'images/items/yield/whiskey.png?1', image_mini:'images/items/yield/whiskey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1709] = {item_id:1709, nshort:'gold', name:'Skarb Indian', type:'yield', level:null, price:26000, image:'images/items/yield/gold.png?1', image_mini:'images/items/yield/gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1710] = {item_id:1710, nshort:'key1', name:'1. Key', type:'yield', level:null, price:42, image:'images/items/yield/key1.png?1', image_mini:'images/items/yield/key1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1711] = {item_id:1711, nshort:'key2', name:'2. Key', type:'yield', level:null, price:46, image:'images/items/yield/key2.png?1', image_mini:'images/items/yield/key2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1712] = {item_id:1712, nshort:'key3', name:'3. Key', type:'yield', level:null, price:7500, image:'images/items/yield/key3.png?1', image_mini:'images/items/yield/key3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1713] = {item_id:1713, nshort:'easteregg', name:'Easter egg', type:'yield', level:null, price:20, image:'images/items/yield/easteregg.png?1', image_mini:'images/items/yield/easteregg.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1715] = {item_id:1715, nshort:'cane', name:'Walking stick', type:'yield', level:42, price:2800, image:'images/items/yield/cane.png?1', image_mini:'images/items/yield/cane.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{}, attributes:{charisma:2}}, set:{key:'set_gentleman', name:'Gentleman\\'s set'}, shop:'quest'};\
items[1716] = {item_id:1716, nshort:'letter', name:'Personal profile ', type:'yield', level:null, price:2, image:'images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1717] = {item_id:1717, nshort:'chamber_pot', name:'Chamber pot', type:'yield', level:null, price:750, image:'images/items/yield/chamber_pot.png?1', image_mini:'images/items/yield/chamber_pot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Sleepyhead'}, shop:'drop'};\
items[1733] = {item_id:1733, nshort:'henrys_packet', name:'Polecenie Henrego', type:'yield', level:null, price:32, image:'images/items/yield/henrys_packet.png?1', image_mini:'images/items/yield/henrys_packet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1740] = {item_id:1740, nshort:'dice', name:'Kości', type:'yield', level:null, price:66, image:'images/items/yield/dice.png?1', image_mini:'images/items/yield/dice.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1750] = {item_id:1750, nshort:'ponytail', name:'Warkocz', type:'yield', level:null, price:66, image:'images/items/yield/ponytail.png?1', image_mini:'images/items/yield/ponytail.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1751] = {item_id:1751, nshort:'ruby', name:'Rubin', type:'yield', level:null, price:66, image:'images/items/yield/ruby.png?1', image_mini:'images/items/yield/ruby.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1752] = {item_id:1752, nshort:'egg1', name:'1. Easter egg', type:'yield', level:null, price:4, image:'images/items/yield/egg1.png?1', image_mini:'images/items/yield/egg1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1753] = {item_id:1753, nshort:'egg2', name:'2. Easter egg', type:'yield', level:null, price:4, image:'images/items/yield/egg2.png?1', image_mini:'images/items/yield/egg2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1754] = {item_id:1754, nshort:'egg3', name:'3. Easter egg', type:'yield', level:null, price:4, image:'images/items/yield/egg3.png?1', image_mini:'images/items/yield/egg3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1755] = {item_id:1755, nshort:'bag', name:'Bag of loot', type:'yield', level:null, price:2000, image:'images/items/yield/bag.png?1', image_mini:'images/items/yield/bag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1756] = {item_id:1756, nshort:'mask', name:'Mask', type:'yield', level:null, price:200, image:'images/items/yield/mask.png?1', image_mini:'images/items/yield/mask.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1757] = {item_id:1757, nshort:'dfprocket1', name:'Prototype', type:'yield', level:null, price:1, image:'images/items/yield/dfprocket1.png?1', image_mini:'images/items/yield/dfprocket1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'guest'};\
items[1758] = {item_id:1758, nshort:'hgfrocket2', name:'Dud', type:'yield', level:null, price:1, image:'images/items/yield/hgfrocket2.png?1', image_mini:'images/items/yield/hgfrocket2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1759] = {item_id:1759, nshort:'dfgrocket1a', name:'Fireworks rocket', type:'yield', level:null, price:2700, image:'images/items/yield/dfgrocket1a.png?1', image_mini:'images/items/yield/dfgrocket1a.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Holiday set'}, shop:'shop'};\
items[1760] = {item_id:1760, nshort:'bucket', name:'Puste wiadro', type:'yield', level:null, price:20, image:'images/items/yield/bucket.png?1', image_mini:'images/items/yield/bucket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1761] = {item_id:1761, nshort:'bucket_full', name:'Pełne wiadro', type:'yield', level:null, price:21, image:'images/items/yield/bucket_full.png?1', image_mini:'images/items/yield/bucket_full.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1762] = {item_id:1762, nshort:'bucket_fire', name:'Fire-extinguishing bucket', type:'yield', level:null, price:25, image:'images/items/yield/bucket_fire.png?1', image_mini:'images/items/yield/bucket_fire.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'fireworker_set', name:'Firefighter set'}, shop:'quest'};\
items[1763] = {item_id:1763, nshort:'threekeynote', name:'A slip of paper with three keys...', type:'yield', level:null, price:2, image:'images/items/yield/threekeynote.png?1', image_mini:'images/items/yield/threekeynote.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1764] = {item_id:1764, nshort:'treasuremap', name:'A treasure map!', type:'yield', level:null, price:5543, image:'images/items/yield/treasuremap.png?1', image_mini:'images/items/yield/treasuremap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1765] = {item_id:1765, nshort:'treasurebox', name:'The treasure chest', type:'yield', level:null, price:23402, image:'images/items/yield/treasurebox.png?1', image_mini:'images/items/yield/treasurebox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1766] = {item_id:1766, nshort:'mudball', name:'A strange lump of dirt', type:'yield', level:null, price:1, image:'images/items/yield/mudball.png?1', image_mini:'images/items/yield/mudball.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1767] = {item_id:1767, nshort:'muditem', name:'Zabrudzony przedmiot', type:'yield', level:null, price:10, image:'images/items/yield/muditem.png?1', image_mini:'images/items/yield/muditem.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1768] = {item_id:1768, nshort:'dustgun', name:'Zakurzony rewolwer', type:'yield', level:null, price:100, image:'images/items/yield/dustgun.png?1', image_mini:'images/items/yield/dustgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1769] = {item_id:1769, nshort:'goldgun', name:'Złoty rewolwer', type:'yield', level:null, price:100, image:'images/items/yield/goldgun.png?1', image_mini:'images/items/yield/goldgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1770] = {item_id:1770, nshort:'bloodycloth', name:'A piece of bloody fabric', type:'yield', level:null, price:1, image:'images/items/yield/bloodycloth.png?1', image_mini:'images/items/yield/bloodycloth.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1771] = {item_id:1771, nshort:'photo', name:'Old photo', type:'yield', level:null, price:1, image:'images/items/yield/photo.png?1', image_mini:'images/items/yield/photo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'guest'};\
items[1772] = {item_id:1772, nshort:'umbrella', name:'Kudram\\'s parasol', type:'yield', level:42, price:2800, image:'images/items/yield/umbrella.png?1', image_mini:'images/items/yield/umbrella.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:8, finger_dexterity:6, endurance:10}, attributes:{strength:1}}, set:{key:'set_dancer', name:'Dancer\\'s set'}, shop:'guest'};\
items[1773] = {item_id:1773, nshort:'testament', name:'Will', type:'yield', level:null, price:1, image:'images/items/yield/testament.png?1', image_mini:'images/items/yield/testament.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1774] = {item_id:1774, nshort:'engagementring', name:'Engagement ring', type:'yield', level:null, price:1, image:'images/items/yield/engagementring.png?1', image_mini:'images/items/yield/engagementring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1775] = {item_id:1775, nshort:'birthcertificate', name:'Birth certificate', type:'yield', level:null, price:1, image:'images/items/yield/birthcertificate.png?1', image_mini:'images/items/yield/birthcertificate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1776] = {item_id:1776, nshort:'darkplans', name:'Sinister plans', type:'yield', level:null, price:1, image:'images/items/yield/darkplans.png?1', image_mini:'images/items/yield/darkplans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1777] = {item_id:1777, nshort:'docreport', name:'A doctor\\'s report', type:'yield', level:null, price:1, image:'images/items/yield/docreport.png?1', image_mini:'images/items/yield/docreport.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1778] = {item_id:1778, nshort:'brandingiron', name:'A bent branding iron', type:'yield', level:null, price:1, image:'images/items/yield/brandingiron.png?1', image_mini:'images/items/yield/brandingiron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1779] = {item_id:1779, nshort:'cardpiece1', name:'1st piece of a map', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece1.png?1', image_mini:'images/items/yield/cardpiece1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1780] = {item_id:1780, nshort:'cardpiece2', name:'2nd piece of a map', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece2.png?1', image_mini:'images/items/yield/cardpiece2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1781] = {item_id:1781, nshort:'cardpiece3', name:'3rd piece of a map', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece3.png?1', image_mini:'images/items/yield/cardpiece3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1782] = {item_id:1782, nshort:'cardpiece4', name:'4th piece of a map', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece4.png?1', image_mini:'images/items/yield/cardpiece4.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1783] = {item_id:1783, nshort:'cardcomplete', name:'The completed map', type:'yield', level:null, price:1, image:'images/items/yield/cardcomplete.png?1', image_mini:'images/items/yield/cardcomplete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1784] = {item_id:1784, nshort:'itemlist', name:'Item list', type:'yield', level:null, price:1, image:'images/items/yield/itemlist.png?1', image_mini:'images/items/yield/itemlist.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1785] = {item_id:1785, nshort:'torch', name:'Pochodnia', type:'yield', level:null, price:1, image:'images/items/yield/torch.png?1', image_mini:'images/items/yield/torch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1786] = {item_id:1786, nshort:'bagpack', name:'Plecak', type:'yield', level:null, price:1, image:'images/items/yield/bagpack.png?1', image_mini:'images/items/yield/bagpack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1787] = {item_id:1787, nshort:'ashes', name:'Ash', type:'yield', level:null, price:1, image:'images/items/yield/ashes.png?1', image_mini:'images/items/yield/ashes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1788] = {item_id:1788, nshort:'gravel', name:'Pebbles', type:'yield', level:null, price:10, image:'images/items/yield/gravel.png?1', image_mini:'images/items/yield/gravel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1789] = {item_id:1789, nshort:'brokenshovel', name:'Broken spade', type:'yield', level:null, price:50, image:'images/items/yield/brokenshovel.png?1', image_mini:'images/items/yield/brokenshovel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1790] = {item_id:1790, nshort:'treeboat', name:'Wydrążony pień drzewa', type:'yield', level:null, price:50, image:'images/items/yield/treeboat.png?1', image_mini:'images/items/yield/treeboat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1791] = {item_id:1791, nshort:'golddust', name:'Gold dust', type:'yield', level:null, price:100, image:'images/items/yield/golddust.png?1', image_mini:'images/items/yield/golddust.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1792] = {item_id:1792, nshort:'goldnugget', name:'Piece of Gold', type:'yield', level:null, price:5000, image:'images/items/yield/goldnugget.png?1', image_mini:'images/items/yield/goldnugget.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1793] = {item_id:1793, nshort:'bendmetall', name:'A dirty, bent piece of metal', type:'yield', level:null, price:1, image:'images/items/yield/bendmetall.png?1', image_mini:'images/items/yield/bendmetall.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1794] = {item_id:1794, nshort:'dirtymetall', name:'Zabrudzony kawał metalu', type:'yield', level:null, price:10, image:'images/items/yield/dirtymetall.png?1', image_mini:'images/items/yield/dirtymetall.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1795] = {item_id:1795, nshort:'goldblade', name:'Czyste złote ostrze', type:'yield', level:null, price:100, image:'images/items/yield/goldblade.png?1', image_mini:'images/items/yield/goldblade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1796] = {item_id:1796, nshort:'sharpgoldblade', name:'Ostre złote ostrze', type:'yield', level:null, price:100, image:'images/items/yield/sharpgoldblade.png?1', image_mini:'images/items/yield/sharpgoldblade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1797] = {item_id:1797, nshort:'sheriffpaper', name:'Raport szeryfa', type:'yield', level:null, price:10, image:'images/items/yield/sheriffpaper.png?1', image_mini:'images/items/yield/sheriffpaper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1799] = {item_id:1799, nshort:'crystallball', name:'Kryształowa kula', type:'yield', level:null, price:10000, image:'images/items/yield/crystallball.png?1', image_mini:'images/items/yield/crystallball.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1800] = {item_id:1800, nshort:'toadblood', name:'Krew ropuchy', type:'yield', level:null, price:10, image:'images/items/yield/toadblood.png?1', image_mini:'images/items/yield/toadblood.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1801] = {item_id:1801, nshort:'coyoteheart', name:'Serce kojota', type:'yield', level:null, price:10, image:'images/items/yield/coyoteheart.png?1', image_mini:'images/items/yield/coyoteheart.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1802] = {item_id:1802, nshort:'phantomdrawing', name:'Portret pamięciowy', type:'yield', level:null, price:10, image:'images/items/yield/phantomdrawing.png?1', image_mini:'images/items/yield/phantomdrawing.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1803] = {item_id:1803, nshort:'candyorange', name:'Kandyzowana pomarańcza', type:'yield', level:null, price:10, image:'images/items/yield/candyorange.png?1', image_mini:'images/items/yield/candyorange.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1804] = {item_id:1804, nshort:'smellingfish', name:'Śmierdząca ryba', type:'yield', level:null, price:10, image:'images/items/yield/smellingfish.png?1', image_mini:'images/items/yield/smellingfish.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1805] = {item_id:1805, nshort:'needleandthreat', name:'Needle and thread', type:'yield', level:null, price:5, image:'images/items/yield/needleandthreat.png?1', image_mini:'images/items/yield/needleandthreat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1806] = {item_id:1806, nshort:'cottonbale', name:'Bale of cotton', type:'yield', level:null, price:15, image:'images/items/yield/cottonbale.png?1', image_mini:'images/items/yield/cottonbale.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1807] = {item_id:1807, nshort:'sock', name:'Sock', type:'yield', level:null, price:0, image:'images/items/yield/sock.png?1', image_mini:'images/items/yield/sock.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1808] = {item_id:1808, nshort:'potatoe', name:'Potato', type:'yield', level:null, price:5, image:'images/items/yield/potatoe.png?1', image_mini:'images/items/yield/potatoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1809] = {item_id:1809, nshort:'hay', name:'Hay', type:'yield', level:null, price:5, image:'images/items/yield/hay.png?1', image_mini:'images/items/yield/hay.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1810] = {item_id:1810, nshort:'pumpkin', name:'Pumpkin', type:'yield', level:null, price:25, image:'images/items/yield/pumpkin.png?1', image_mini:'images/items/yield/pumpkin.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1811] = {item_id:1811, nshort:'blueberries', name:'Blueberries', type:'yield', level:null, price:15, image:'images/items/yield/blueberries.png?1', image_mini:'images/items/yield/blueberries.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1812] = {item_id:1812, nshort:'pit', name:'Seeds', type:'yield', level:null, price:1, image:'images/items/yield/pit.png?1', image_mini:'images/items/yield/pit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1813] = {item_id:1813, nshort:'eagle_feather', name:'Eagle feather', type:'yield', level:null, price:35, image:'images/items/yield/eagle_feather.png?1', image_mini:'images/items/yield/eagle_feather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1814] = {item_id:1814, nshort:'lotus', name:'Lotus blossom', type:'yield', level:null, price:45, image:'images/items/yield/lotus.png?1', image_mini:'images/items/yield/lotus.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1815] = {item_id:1815, nshort:'crabmeat', name:'Crab meat', type:'yield', level:null, price:12, image:'images/items/yield/crabmeat.png?1', image_mini:'images/items/yield/crabmeat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1816] = {item_id:1816, nshort:'chalk', name:'Chalk', type:'yield', level:null, price:2, image:'images/items/yield/chalk.png?1', image_mini:'images/items/yield/chalk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1817] = {item_id:1817, nshort:'sheriffstar', name:'Sheriff\\'s star', type:'yield', level:null, price:50, image:'images/items/yield/sheriffstar.png?1', image_mini:'images/items/yield/sheriffstar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1818] = {item_id:1818, nshort:'sulfurstone', name:'Sulfuric rock', type:'yield', level:null, price:25, image:'images/items/yield/sulfurstone.png?1', image_mini:'images/items/yield/sulfurstone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1819] = {item_id:1819, nshort:'pokergame', name:'Poker cards', type:'yield', level:null, price:150, image:'images/items/yield/pokergame.png?1', image_mini:'images/items/yield/pokergame.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1820] = {item_id:1820, nshort:'snakehide', name:'Snake skin', type:'yield', level:null, price:27, image:'images/items/yield/snakehide.png?1', image_mini:'images/items/yield/snakehide.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1821] = {item_id:1821, nshort:'salpetersalt', name:'Saltpeter', type:'yield', level:null, price:13, image:'images/items/yield/salpetersalt.png?1', image_mini:'images/items/yield/salpetersalt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1822] = {item_id:1822, nshort:'cigaretts', name:'Cigarettes', type:'yield', level:null, price:3, image:'images/items/yield/cigaretts.png?1', image_mini:'images/items/yield/cigaretts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1823] = {item_id:1823, nshort:'rodeo_trophy', name:'Rodeo trophy', type:'yield', level:null, price:75, image:'images/items/yield/rodeo_trophy.png?1', image_mini:'images/items/yield/rodeo_trophy.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1824] = {item_id:1824, nshort:'cougar_hide', name:'Puma skin', type:'yield', level:null, price:55, image:'images/items/yield/cougar_hide.png?1', image_mini:'images/items/yield/cougar_hide.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1825] = {item_id:1825, nshort:'indigo', name:'Indigo', type:'yield', level:null, price:65, image:'images/items/yield/indigo.png?1', image_mini:'images/items/yield/indigo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1826] = {item_id:1826, nshort:'rum', name:'Rum', type:'yield', level:null, price:7, image:'images/items/yield/rum.png?1', image_mini:'images/items/yield/rum.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1827] = {item_id:1827, nshort:'lead', name:'Lead', type:'yield', level:null, price:27, image:'images/items/yield/lead.png?1', image_mini:'images/items/yield/lead.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1828] = {item_id:1828, nshort:'uncut_ruby', name:'Uncut ruby', type:'yield', level:null, price:75, image:'images/items/yield/uncut_ruby.png?1', image_mini:'images/items/yield/uncut_ruby.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1829] = {item_id:1829, nshort:'uncut_emerald', name:'Uncut emerald', type:'yield', level:null, price:55, image:'images/items/yield/uncut_emerald.png?1', image_mini:'images/items/yield/uncut_emerald.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1830] = {item_id:1830, nshort:'uncut_diamond', name:'Uncut diamond', type:'yield', level:null, price:100, image:'images/items/yield/uncut_diamond.png?1', image_mini:'images/items/yield/uncut_diamond.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1831] = {item_id:1831, nshort:'woodcross', name:'Wooden cross', type:'yield', level:null, price:3, image:'images/items/yield/woodcross.png?1', image_mini:'images/items/yield/woodcross.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1832] = {item_id:1832, nshort:'metall_chip', name:'Metal chip', type:'yield', level:null, price:50, image:'images/items/yield/metall_chip.png?1', image_mini:'images/items/yield/metall_chip.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1833] = {item_id:1833, nshort:'death_warrant', name:'Death sentence', type:'yield', level:null, price:5, image:'images/items/yield/death_warrant.png?1', image_mini:'images/items/yield/death_warrant.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1834] = {item_id:1834, nshort:'peaceflower', name:'Peace flower', type:'yield', level:null, price:1, image:'images/items/yield/peaceflower.png?1', image_mini:'images/items/yield/peaceflower.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1835] = {item_id:1835, nshort:'rose', name:'Rose', type:'yield', level:null, price:10, image:'images/items/yield/rose.png?1', image_mini:'images/items/yield/rose.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1836] = {item_id:1836, nshort:'marriage_certificate', name:'Marriage certificate', type:'yield', level:null, price:2, image:'images/items/yield/marriage_certificate.png?1', image_mini:'images/items/yield/marriage_certificate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1837] = {item_id:1837, nshort:'printing_plate', name:'Printing plate', type:'yield', level:null, price:150, image:'images/items/yield/printing_plate.png?1', image_mini:'images/items/yield/printing_plate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1838] = {item_id:1838, nshort:'wolf_geislein', name:'Wolf mit dickem Bauch', type:'yield', level:null, price:3, image:'images/items/yield/wolf_geislein.png?1', image_mini:'images/items/yield/wolf_geislein.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1839] = {item_id:1839, nshort:'geislein', name:'Little Kid', type:'yield', level:null, price:75, image:'images/items/yield/geislein.png?1', image_mini:'images/items/yield/geislein.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1840] = {item_id:1840, nshort:'bunny', name:'Rabbit', type:'yield', level:null, price:75, image:'images/items/yield/bunny.png?1', image_mini:'images/items/yield/bunny.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1841] = {item_id:1841, nshort:'elefant', name:'Elephant', type:'yield', level:null, price:75, image:'images/items/yield/elefant.png?1', image_mini:'images/items/yield/elefant.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1842] = {item_id:1842, nshort:'lion', name:'Lion', type:'yield', level:null, price:75, image:'images/items/yield/lion.png?1', image_mini:'images/items/yield/lion.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1844] = {item_id:1844, nshort:'wolf2', name:'Wolf', type:'yield', level:null, price:25, image:'images/items/yield/wolf2.png?1', image_mini:'images/items/yield/wolf2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1845] = {item_id:1845, nshort:'snake', name:'Snake', type:'yield', level:null, price:10, image:'images/items/yield/snake.png?1', image_mini:'images/items/yield/snake.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1846] = {item_id:1846, nshort:'dwarfpony', name:'Small pony', type:'yield', level:null, price:35, image:'images/items/yield/dwarfpony.png?1', image_mini:'images/items/yield/dwarfpony.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1849] = {item_id:1849, nshort:'sheriff_helper', name:'Sheriff\\'s star', type:'yield', level:null, price:1, image:'images/items/yield/sheriff_helper.png?1', image_mini:'images/items/yield/sheriff_helper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1851] = {item_id:1851, nshort:'elixir_bear', name:'The potion of the Bear', type:'yield', level:null, price:1, image:'images/items/yield/elixir_bear.png?1', image_mini:'images/items/yield/elixir_bear.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1854] = {item_id:1854, nshort:'elixir_snake', name:'The potion of the Snake', type:'yield', level:null, price:1, image:'images/items/yield/elixir_snake.png?1', image_mini:'images/items/yield/elixir_snake.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1855] = {item_id:1855, nshort:'charcoal', name:'Charcoal', type:'yield', level:null, price:100, image:'images/items/yield/charcoal.png?1', image_mini:'images/items/yield/charcoal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1856] = {item_id:1856, nshort:'waterjar', name:'Jug of water', type:'yield', level:null, price:100, image:'images/items/yield/waterjar.png?1', image_mini:'images/items/yield/waterjar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1857] = {item_id:1857, nshort:'fieldbottle', name:'Feldflasche', type:'yield', level:null, price:100, image:'images/items/yield/fieldbottle.png?1', image_mini:'images/items/yield/fieldbottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1858] = {item_id:1858, nshort:'workingknife', name:'Knife', type:'yield', level:null, price:100, image:'images/items/yield/workingknife.png?1', image_mini:'images/items/yield/workingknife.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1859] = {item_id:1859, nshort:'cookingpan', name:'Pan', type:'yield', level:null, price:100, image:'images/items/yield/cookingpan.png?1', image_mini:'images/items/yield/cookingpan.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1860] = {item_id:1860, nshort:'cuttingwood', name:'Schneidebrett', type:'yield', level:null, price:100, image:'images/items/yield/cuttingwood.png?1', image_mini:'images/items/yield/cuttingwood.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1861] = {item_id:1861, nshort:'flint', name:'Tinderbox', type:'yield', level:null, price:32, image:'images/items/yield/flint.png?1', image_mini:'images/items/yield/flint.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1863] = {item_id:1863, nshort:'beansandbacon', name:'Baked beans', type:'yield', level:null, price:100, image:'images/items/yield/beansandbacon.png?1', image_mini:'images/items/yield/beansandbacon.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1864] = {item_id:1864, nshort:'marmelade', name:'Jam', type:'yield', level:null, price:100, image:'images/items/yield/marmelade.png?1', image_mini:'images/items/yield/marmelade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1880] = {item_id:1880, nshort:'gum', name:'Resin', type:'yield', level:null, price:64, image:'images/items/yield/gum.png?1', image_mini:'images/items/yield/gum.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1881] = {item_id:1881, nshort:'sulfur', name:'Sulfur', type:'yield', level:null, price:47, image:'images/items/yield/sulfur.png?1', image_mini:'images/items/yield/sulfur.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1882] = {item_id:1882, nshort:'pipecleaner', name:'Pipe Brush', type:'yield', level:null, price:190, image:'images/items/yield/pipecleaner.png?1', image_mini:'images/items/yield/pipecleaner.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1883] = {item_id:1883, nshort:'stomach', name:'Stomach Medicine', type:'yield', level:null, price:48, image:'images/items/yield/stomach.png?1', image_mini:'images/items/yield/stomach.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1898] = {item_id:1898, nshort:'rosewater', name:'Rose Water', type:'yield', level:null, price:100, image:'images/items/yield/rosewater.png?1', image_mini:'images/items/yield/rosewater.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1900] = {item_id:1900, nshort:'bajonett', name:'Bayonet', type:'yield', level:null, price:100, image:'images/items/yield/bajonett.png?1', image_mini:'images/items/yield/bajonett.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1901] = {item_id:1901, nshort:'weightstone', name:'Weightstone', type:'yield', level:null, price:100, image:'images/items/yield/weightstone.png?1', image_mini:'images/items/yield/weightstone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1909] = {item_id:1909, nshort:'coolingpackage', name:'Cooling Cloth', type:'yield', level:null, price:100, image:'images/items/yield/coolingpackage.png?1', image_mini:'images/items/yield/coolingpackage.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1910] = {item_id:1910, nshort:'weaponchain', name:'Weapon Chain', type:'yield', level:null, price:100, image:'images/items/yield/weaponchain.png?1', image_mini:'images/items/yield/weaponchain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1918] = {item_id:1918, nshort:'horseshoe_equip', name:'Shoed hooves', type:'yield', level:null, price:100, image:'images/items/yield/horseshoe_equip.png?1', image_mini:'images/items/yield/horseshoe_equip.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1919] = {item_id:1919, nshort:'powerfood', name:'Concentrate', type:'yield', level:null, price:100, image:'images/items/yield/powerfood.png?1', image_mini:'images/items/yield/powerfood.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1927] = {item_id:1927, nshort:'harnish', name:'Bridle', type:'yield', level:null, price:100, image:'images/items/yield/harnish.png?1', image_mini:'images/items/yield/harnish.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1928] = {item_id:1928, nshort:'fieldcamp', name:'Sleeping Bag', type:'yield', level:null, price:100, image:'images/items/yield/fieldcamp.png?1', image_mini:'images/items/yield/fieldcamp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[1937] = {item_id:1937, nshort:'travelbag', name:'Travel bag', type:'yield', level:null, price:100, image:'images/items/yield/travelbag.png?1', image_mini:'images/items/yield/travelbag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1938] = {item_id:1938, nshort:'sharpweapon', name:'Sharpened weapon', type:'yield', level:null, price:16, image:'images/items/yield/sharpweapon.png?1', image_mini:'images/items/yield/sharpweapon.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1939] = {item_id:1939, nshort:'filtercigaretts', name:'Cigarette', type:'yield', level:null, price:29, image:'images/items/yield/filtercigaretts.png?1', image_mini:'images/items/yield/filtercigaretts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1940] = {item_id:1940, nshort:'cake_piece', name:'Slice of cake', type:'yield', level:null, price:100, image:'images/items/yield/cake_piece.png?1', image_mini:'images/items/yield/cake_piece.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10000] = {item_id:10000, nshort:'shredded_grey', name:'Torn grey pants', type:'pants', level:1, price:40, image:'images/items/pants/shredded_grey.png?1', image_mini:'images/items/pants/mini/shredded_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10001] = {item_id:10001, nshort:'shredded_yellow', name:'Torn yellow pants', type:'pants', level:1, price:35, image:'images/items/pants/shredded_yellow.png?1', image_mini:'images/items/pants/mini/shredded_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:1, leadership:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10002] = {item_id:10002, nshort:'shredded_blue', name:'Torn blue pants', type:'pants', level:2, price:55, image:'images/items/pants/shredded_blue.png?1', image_mini:'images/items/pants/mini/shredded_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:2, ride:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10003] = {item_id:10003, nshort:'shredded_green', name:'Torn green pants', type:'pants', level:2, price:65, image:'images/items/pants/shredded_green.png?1', image_mini:'images/items/pants/mini/shredded_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:1, punch:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10004] = {item_id:10004, nshort:'shredded_brown', name:'Torn brown pants', type:'pants', level:3, price:95, image:'images/items/pants/shredded_brown.png?1', image_mini:'images/items/pants/mini/shredded_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1, leadership:1}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10005] = {item_id:10005, nshort:'shredded_black', name:'Torn black pants', type:'pants', level:3, price:95, image:'images/items/pants/shredded_black.png?1', image_mini:'images/items/pants/mini/shredded_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, endurance:1}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10006] = {item_id:10006, nshort:'shredded_p1', name:'Fancy torn pants', type:'pants', level:4, price:290, image:'images/items/pants/shredded_p1.png?1', image_mini:'images/items/pants/mini/shredded_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:1, reflex:1, ride:3}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10007] = {item_id:10007, nshort:'shredded_fine', name:'Jim\\'s torn pants', type:'pants', level:6, price:420, image:'images/items/pants/shredded_fine.png?1', image_mini:'images/items/pants/mini/shredded_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:3, finger_dexterity:3, endurance:3, build:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10010] = {item_id:10010, nshort:'shorts_grey', name:'Grey shorts', type:'pants', level:7, price:232, image:'images/items/pants/shorts_grey.png?1', image_mini:'images/items/pants/mini/shorts_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3, swim:3, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10011] = {item_id:10011, nshort:'shorts_yellow', name:'Yellow shorts', type:'pants', level:8, price:430, image:'images/items/pants/shorts_yellow.png?1', image_mini:'images/items/pants/mini/shorts_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:5, hide:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10012] = {item_id:10012, nshort:'shorts_blue', name:'Blue shorts', type:'pants', level:8, price:430, image:'images/items/pants/shorts_blue.png?1', image_mini:'images/items/pants/mini/shorts_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:6, trade:2, ride:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10013] = {item_id:10013, nshort:'shorts_green', name:'Green shorts', type:'pants', level:8, price:430, image:'images/items/pants/shorts_green.png?1', image_mini:'images/items/pants/mini/shorts_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:5, punch:4, build:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10014] = {item_id:10014, nshort:'shorts_brown', name:'Brown shorts', type:'pants', level:9, price:470, image:'images/items/pants/shorts_brown.png?1', image_mini:'images/items/pants/mini/shorts_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, shot:3, endurance:3}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10015] = {item_id:10015, nshort:'shorts_black', name:'Black shorts', type:'pants', level:9, price:480, image:'images/items/pants/shorts_black.png?1', image_mini:'images/items/pants/mini/shorts_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:4, leadership:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10016] = {item_id:10016, nshort:'shorts_p1', name:'Fancy shorts', type:'pants', level:10, price:1280, image:'images/items/pants/shorts_p1.png?1', image_mini:'images/items/pants/mini/shorts_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6, finger_dexterity:8, reflex:5, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10017] = {item_id:10017, nshort:'shorts_fine', name:'Frank Butler\\'s Shorts', type:'pants', level:12, price:1460, image:'images/items/pants/shorts_fine.png?1', image_mini:'images/items/pants/mini/shorts_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, aim:7, dodge:7, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10020] = {item_id:10020, nshort:'puritan_grey', name:'Plain grey pants', type:'pants', level:12, price:360, image:'images/items/pants/puritan_grey.png?1', image_mini:'images/items/pants/mini/puritan_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:2, ride:5, punch:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10021] = {item_id:10021, nshort:'puritan_yellow', name:'Plain yellow pants', type:'pants', level:13, price:600, image:'images/items/pants/puritan_yellow.png?1', image_mini:'images/items/pants/mini/puritan_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:6, reflex:5}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10022] = {item_id:10022, nshort:'puritan_blue', name:'Plain blue pants', type:'pants', level:13, price:640, image:'images/items/pants/puritan_blue.png?1', image_mini:'images/items/pants/mini/puritan_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:4, swim:10}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10023] = {item_id:10023, nshort:'puritan_green', name:'Plain green pants', type:'pants', level:13, price:630, image:'images/items/pants/puritan_green.png?1', image_mini:'images/items/pants/mini/puritan_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, endurance:5, build:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10024] = {item_id:10024, nshort:'puritan_brown', name:'Plain brown pants', type:'pants', level:14, price:650, image:'images/items/pants/puritan_brown.png?1', image_mini:'images/items/pants/mini/puritan_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:8, finger_dexterity:7, tough:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10025] = {item_id:10025, nshort:'puritan_black', name:'Plain black pants', type:'pants', level:14, price:670, image:'images/items/pants/puritan_black.png?1', image_mini:'images/items/pants/mini/puritan_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:9, trade:5, shot:7}, attributes:{}}, set:{key:'set_farmer', name:'Farmer\\'s set'}, shop:'shop'};\
items[10026] = {item_id:10026, nshort:'puritan_p1', name:'Fancy plain pants', type:'pants', level:15, price:1680, image:'images/items/pants/puritan_p1.png?1', image_mini:'images/items/pants/mini/puritan_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, reflex:9}, attributes:{dexterity:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10027] = {item_id:10027, nshort:'puritan_fine', name:'Huckleberry\\'s plain pants', type:'pants', level:16, price:1800, image:'images/items/pants/puritan_fine.png?1', image_mini:'images/items/pants/mini/puritan_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:6, finger_dexterity:6, swim:8, build:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10030] = {item_id:10030, nshort:'shortscheck_grey', name:'Grey knickerbockers', type:'pants', level:16, price:610, image:'images/items/pants/shortscheck_grey.png?1', image_mini:'images/items/pants/mini/shortscheck_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:10, punch:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10031] = {item_id:10031, nshort:'shortscheck_yellow', name:'Yellow knickerbockers', type:'pants', level:17, price:1520, image:'images/items/pants/shortscheck_yellow.png?1', image_mini:'images/items/pants/mini/shortscheck_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, pitfall:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10032] = {item_id:10032, nshort:'shortscheck_blue', name:'Blue knickerbockers', type:'pants', level:17, price:1560, image:'images/items/pants/shortscheck_blue.png?1', image_mini:'images/items/pants/mini/shortscheck_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10033] = {item_id:10033, nshort:'shortscheck_green', name:'Green knickerbockers', type:'pants', level:17, price:1520, image:'images/items/pants/shortscheck_green.png?1', image_mini:'images/items/pants/mini/shortscheck_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:10, tough:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10034] = {item_id:10034, nshort:'shortscheck_brown', name:'Brown knickerbockers', type:'pants', level:18, price:1620, image:'images/items/pants/shortscheck_brown.png?1', image_mini:'images/items/pants/mini/shortscheck_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:10, aim:7, dodge:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10035] = {item_id:10035, nshort:'shortscheck_black', name:'Black knickerbockers', type:'pants', level:18, price:1660, image:'images/items/pants/shortscheck_black.png?1', image_mini:'images/items/pants/mini/shortscheck_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, trade:10, tactic:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10036] = {item_id:10036, nshort:'shortscheck_p1', name:'Fancy knickerbockers', type:'pants', level:19, price:2880, image:'images/items/pants/shortscheck_p1.png?1', image_mini:'images/items/pants/mini/shortscheck_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, finger_dexterity:10, pitfall:9, shot:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10037] = {item_id:10037, nshort:'shortscheck_fine', name:'Washington Irving\\'s knickerbockers', type:'pants', level:20, price:3120, image:'images/items/pants/shortscheck_fine.png?1', image_mini:'images/items/pants/mini/shortscheck_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, swim:10, reflex:9, ride:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10040] = {item_id:10040, nshort:'check_grey', name:'Grey plaid pants', type:'pants', level:20, price:690, image:'images/items/pants/check_grey.png?1', image_mini:'images/items/pants/mini/check_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, reflex:5, endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10041] = {item_id:10041, nshort:'check_yellow', name:'Yellow plaid pants', type:'pants', level:21, price:1720, image:'images/items/pants/check_yellow.png?1', image_mini:'images/items/pants/mini/check_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:7, punch:8}, attributes:{dexterity:2, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10042] = {item_id:10042, nshort:'check_blue', name:'Blue plaid pants', type:'pants', level:21, price:1760, image:'images/items/pants/check_blue.png?1', image_mini:'images/items/pants/mini/check_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, swim:6, build:10}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10043] = {item_id:10043, nshort:'check_green', name:'Green plaid pants', type:'pants', level:21, price:1780, image:'images/items/pants/check_green.png?1', image_mini:'images/items/pants/mini/check_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, health:8, punch:6}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10044] = {item_id:10044, nshort:'check_brown', name:'Brown plaid pants', type:'pants', level:22, price:1840, image:'images/items/pants/check_brown.png?1', image_mini:'images/items/pants/mini/check_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, hide:6, ride:8}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10045] = {item_id:10045, nshort:'check_black', name:'Black plaid pants', type:'pants', level:22, price:1880, image:'images/items/pants/check_black.png?1', image_mini:'images/items/pants/mini/check_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, finger_dexterity:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10046] = {item_id:10046, nshort:'check_p1', name:'Fancy plaid pants', type:'pants', level:24, price:3540, image:'images/items/pants/check_p1.png?1', image_mini:'images/items/pants/mini/check_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:12, animal:10, trade:12, tactic:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10047] = {item_id:10047, nshort:'check_fine', name:'Annie Oakley\\'s plaid pants', type:'pants', level:25, price:3630, image:'images/items/pants/check_fine.png?1', image_mini:'images/items/pants/mini/check_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12, aim:14, dodge:10, health:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10050] = {item_id:10050, nshort:'fur_grey', name:'Grey fur pants', type:'pants', level:25, price:1230, image:'images/items/pants/fur_grey.png?1', image_mini:'images/items/pants/mini/fur_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:7, hide:8, reflex:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10051] = {item_id:10051, nshort:'fur_yellow', name:'Yellow fur pants', type:'pants', level:26, price:3000, image:'images/items/pants/fur_yellow.png?1', image_mini:'images/items/pants/mini/fur_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:8, punch:8, build:9}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10052] = {item_id:10052, nshort:'fur_blue', name:'Blue fur pants', type:'pants', level:26, price:3060, image:'images/items/pants/fur_blue.png?1', image_mini:'images/items/pants/mini/fur_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, pitfall:14, hide:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10053] = {item_id:10053, nshort:'fur_green', name:'Green fur pants', type:'pants', level:26, price:3000, image:'images/items/pants/fur_green.png?1', image_mini:'images/items/pants/mini/fur_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:16}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10054] = {item_id:10054, nshort:'fur_brown', name:'Brown fur pants', type:'pants', level:27, price:3090, image:'images/items/pants/fur_brown.png?1', image_mini:'images/items/pants/mini/fur_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:14, leadership:11, finger_dexterity:7}, attributes:{}}, set:{key:'set_mexican', name:'Mexican\\'s set'}, shop:'shop'};\
items[10055] = {item_id:10055, nshort:'fur_black', name:'Black fur pants', type:'pants', level:27, price:3120, image:'images/items/pants/fur_black.png?1', image_mini:'images/items/pants/mini/fur_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:17, endurance:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10056] = {item_id:10056, nshort:'fur_p1', name:'Fancy fur pants', type:'pants', level:30, price:4725, image:'images/items/pants/fur_p1.png?1', image_mini:'images/items/pants/mini/fur_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, swim:15, ride:15, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10057] = {item_id:10057, nshort:'fur_fine', name:'Cheyenne\\'s fur pants', type:'pants', level:32, price:5075, image:'images/items/pants/fur_fine.png?1', image_mini:'images/items/pants/mini/fur_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:19, dodge:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10060] = {item_id:10060, nshort:'dungarees_grey', name:'Grey overalls', type:'pants', level:31, price:1395, image:'images/items/pants/dungarees_grey.png?1', image_mini:'images/items/pants/mini/dungarees_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15}, attributes:{dexterity:2, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10061] = {item_id:10061, nshort:'dungarees_yellow', name:'Yellow overalls', type:'pants', level:32, price:3360, image:'images/items/pants/dungarees_yellow.png?1', image_mini:'images/items/pants/mini/dungarees_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:12, finger_dexterity:10, reflex:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10062] = {item_id:10062, nshort:'dungarees_blue', name:'Blue overalls', type:'pants', level:32, price:3420, image:'images/items/pants/dungarees_blue.png?1', image_mini:'images/items/pants/mini/dungarees_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:9, build:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10063] = {item_id:10063, nshort:'dungarees_green', name:'Green overalls', type:'pants', level:32, price:3420, image:'images/items/pants/dungarees_green.png?1', image_mini:'images/items/pants/mini/dungarees_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:14, endurance:12, tough:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10064] = {item_id:10064, nshort:'dungarees_brown', name:'Brown overalls', type:'pants', level:33, price:3510, image:'images/items/pants/dungarees_brown.png?1', image_mini:'images/items/pants/mini/dungarees_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:15, hide:15}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10065] = {item_id:10065, nshort:'dungarees_black', name:'Black overalls', type:'pants', level:33, price:3540, image:'images/items/pants/dungarees_black.png?1', image_mini:'images/items/pants/mini/dungarees_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:14, tactic:10, leadership:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10066] = {item_id:10066, nshort:'dungarees_p1', name:'Fancy overalls', type:'pants', level:35, price:5250, image:'images/items/pants/dungarees_p1.png?1', image_mini:'images/items/pants/mini/dungarees_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, animal:15}, attributes:{charisma:3, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10067] = {item_id:10067, nshort:'dungarees_fine', name:'Bob Builder\\'s overalls', type:'pants', level:38, price:5775, image:'images/items/pants/dungarees_fine.png?1', image_mini:'images/items/pants/mini/dungarees_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:17, punch:17, build:17}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10070] = {item_id:10070, nshort:'fine_grey', name:'Grey linen pants', type:'pants', level:37, price:1470, image:'images/items/pants/fine_grey.png?1', image_mini:'images/items/pants/mini/fine_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, leadership:11}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10071] = {item_id:10071, nshort:'fine_yellow', name:'Yellow linen pants', type:'pants', level:38, price:3600, image:'images/items/pants/fine_yellow.png?1', image_mini:'images/items/pants/mini/fine_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:19, pitfall:7, ride:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10072] = {item_id:10072, nshort:'fine_blue', name:'Blue linen pants', type:'pants', level:38, price:3570, image:'images/items/pants/fine_blue.png?1', image_mini:'images/items/pants/mini/fine_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:7, swim:15, hide:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10073] = {item_id:10073, nshort:'fine_green', name:'Green linen pants', type:'pants', level:38, price:3570, image:'images/items/pants/fine_green.png?1', image_mini:'images/items/pants/mini/fine_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:17, tactic:17}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10074] = {item_id:10074, nshort:'fine_brown', name:'Brown linen pants', type:'pants', level:40, price:3630, image:'images/items/pants/fine_brown.png?1', image_mini:'images/items/pants/mini/fine_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:19}, attributes:{dexterity:3, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10075] = {item_id:10075, nshort:'fine_black', name:'Black linen pants', type:'pants', level:40, price:3450, image:'images/items/pants/fine_black.png?1', image_mini:'images/items/pants/mini/fine_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:9, health:8, endurance:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10076] = {item_id:10076, nshort:'fine_p1', name:'Fancy linen pants', type:'pants', level:45, price:5775, image:'images/items/pants/fine_p1.png?1', image_mini:'images/items/pants/mini/fine_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, shot:12, tough:15, punch:12}, attributes:{dexterity:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10080] = {item_id:10080, nshort:'breeches_grey', name:'Grey knee-breeches', type:'pants', level:41, price:2020, image:'images/items/pants/breeches_grey.png?1', image_mini:'images/items/pants/mini/breeches_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:7, pitfall:14}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10081] = {item_id:10081, nshort:'breeches_yellow', name:'Yellow knee-breeches', type:'pants', level:42, price:5000, image:'images/items/pants/breeches_yellow.png?1', image_mini:'images/items/pants/mini/breeches_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, repair:17}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10082] = {item_id:10082, nshort:'breeches_blue', name:'Blue knee-breeches', type:'pants', level:42, price:5040, image:'images/items/pants/breeches_blue.png?1', image_mini:'images/items/pants/mini/breeches_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, trade:12, tactic:12}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10083] = {item_id:10083, nshort:'breeches_green', name:'Green knee-breeches', type:'pants', level:42, price:5040, image:'images/items/pants/breeches_green.png?1', image_mini:'images/items/pants/mini/breeches_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:11, tough:6, punch:12}, attributes:{charisma:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10084] = {item_id:10084, nshort:'breeches_brown', name:'Brown knee-breeches', type:'pants', level:44, price:5240, image:'images/items/pants/breeches_brown.png?1', image_mini:'images/items/pants/mini/breeches_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:14, finger_dexterity:6, shot:10}, attributes:{dexterity:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10085] = {item_id:10085, nshort:'breeches_black', name:'Black knee-breeches', type:'pants', level:44, price:5240, image:'images/items/pants/breeches_black.png?1', image_mini:'images/items/pants/mini/breeches_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:14, reflex:14}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_quackery', name:'Charlatan\\'s set'}, shop:'shop'};\
items[10086] = {item_id:10086, nshort:'breeches_p1', name:'Fancy knee-breeches', type:'pants', level:50, price:7965, image:'images/items/pants/breeches_p1.png?1', image_mini:'images/items/pants/mini/breeches_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, ride:15, build:15}, attributes:{charisma:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10090] = {item_id:10090, nshort:'indian_grey', name:'Grey Indian pants', type:'pants', level:51, price:3330, image:'images/items/pants/indian_grey.png?1', image_mini:'images/items/pants/mini/indian_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5, build:15}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10091] = {item_id:10091, nshort:'indian_yellow', name:'Yellow Indian pants', type:'pants', level:52, price:28000, image:'images/items/pants/indian_yellow.png?1', image_mini:'images/items/pants/mini/indian_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:14, punch:14}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10092] = {item_id:10092, nshort:'indian_blue', name:'Blue Indian pants', type:'pants', level:52, price:7000, image:'images/items/pants/indian_blue.png?1', image_mini:'images/items/pants/mini/indian_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:12, finger_dexterity:14, pitfall:12}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10093] = {item_id:10093, nshort:'indian_green', name:'Green Indian pants', type:'pants', level:52, price:7000, image:'images/items/pants/indian_green.png?1', image_mini:'images/items/pants/mini/indian_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:20, hide:12, reflex:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10094] = {item_id:10094, nshort:'indian_brown', name:'Brown Indian pants', type:'pants', level:55, price:7150, image:'images/items/pants/indian_brown.png?1', image_mini:'images/items/pants/mini/indian_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:15, dodge:10, health:10}, attributes:{dexterity:2, flexibility:1}}, set:{key:'set_indian', name:'Indian\\'s set'}, shop:'shop'};\
items[10095] = {item_id:10095, nshort:'indian_black', name:'Black Indian pants', type:'pants', level:55, price:7300, image:'images/items/pants/indian_black.png?1', image_mini:'images/items/pants/mini/indian_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, tactic:14, ride:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10096] = {item_id:10096, nshort:'indian_p1', name:'Fancy Indian pants', type:'pants', level:60, price:11100, image:'images/items/pants/indian_p1.png?1', image_mini:'images/items/pants/mini/indian_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:17, trade:15, leadership:17}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10100] = {item_id:10100, nshort:'chapsrough_grey', name:'Grey leg guards', type:'pants', level:54, price:4095, image:'images/items/pants/chapsrough_grey.png?1', image_mini:'images/items/pants/mini/chapsrough_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:15, punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10101] = {item_id:10101, nshort:'chapsrough_yellow', name:'Yellow leg guards', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_yellow.png?1', image_mini:'images/items/pants/mini/chapsrough_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:15, health:18, punch:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10102] = {item_id:10102, nshort:'chapsrough_blue', name:'Blue leg guards', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_blue.png?1', image_mini:'images/items/pants/mini/chapsrough_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:17, endurance:14, build:17}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10103] = {item_id:10103, nshort:'chapsrough_green', name:'Green leg guards', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_green.png?1', image_mini:'images/items/pants/mini/chapsrough_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, pitfall:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10104] = {item_id:10104, nshort:'chapsrough_brown', name:'Brown leg guards', type:'pants', level:59, price:8470, image:'images/items/pants/chapsrough_brown.png?1', image_mini:'images/items/pants/mini/chapsrough_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, hide:14, ride:15}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10105] = {item_id:10105, nshort:'chapsrough_black', name:'Black leg guards', type:'pants', level:59, price:8470, image:'images/items/pants/chapsrough_black.png?1', image_mini:'images/items/pants/mini/chapsrough_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:14, trade:14, shot:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10106] = {item_id:10106, nshort:'chapsrough_p1', name:'Fancy leg guards', type:'pants', level:65, price:12610, image:'images/items/pants/chapsrough_p1.png?1', image_mini:'images/items/pants/mini/chapsrough_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, leadership:17, swim:13, reflex:13}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10107] = {item_id:10107, nshort:'chapsrough_fine', name:'Czapsy Billy`ego Kida', type:'pants', level:66, price:13194, image:'images/items/pants/chapsrough_fine.png?1', image_mini:'images/items/pants/mini/chapsrough_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:20, dodge:20}, attributes:{charisma:3, dexterity:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10110] = {item_id:10110, nshort:'cavalry_grey', name:'Grey army pants', type:'pants', level:61, price:5160, image:'images/items/pants/cavalry_grey.png?1', image_mini:'images/items/pants/mini/cavalry_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, swim:12, reflex:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10111] = {item_id:10111, nshort:'cavalry_yellow', name:'Yellow army pants', type:'pants', level:63, price:9660, image:'images/items/pants/cavalry_yellow.png?1', image_mini:'images/items/pants/mini/cavalry_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:19, ride:20}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10112] = {item_id:10112, nshort:'cavalry_blue', name:'Blue army pants', type:'pants', level:63, price:9600, image:'images/items/pants/cavalry_blue.png?1', image_mini:'images/items/pants/mini/cavalry_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:17, hide:18, endurance:18}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10113] = {item_id:10113, nshort:'cavalry_green', name:'Green army pants', type:'pants', level:63, price:9540, image:'images/items/pants/cavalry_green.png?1', image_mini:'images/items/pants/mini/cavalry_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:15, leadership:15, finger_dexterity:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10114] = {item_id:10114, nshort:'cavalry_brown', name:'Brown army pants', type:'pants', level:65, price:9720, image:'images/items/pants/cavalry_brown.png?1', image_mini:'images/items/pants/mini/cavalry_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:18, punch:18}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10115] = {item_id:10115, nshort:'cavalry_black', name:'Black army pants', type:'pants', level:65, price:10020, image:'images/items/pants/cavalry_black.png?1', image_mini:'images/items/pants/mini/cavalry_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, build:17}, attributes:{dexterity:2, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10116] = {item_id:10116, nshort:'cavalry_p1', name:'Fancy army pants', type:'pants', level:75, price:15120, image:'images/items/pants/cavalry_p1.png?1', image_mini:'images/items/pants/mini/cavalry_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, aim:15, dodge:15}, attributes:{charisma:3, dexterity:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10117] = {item_id:10117, nshort:'cavalry_fine', name:'Spodnie George\\'a Crooka', type:'pants', level:85, price:16100, image:'images/items/pants/cavalry_fine.png?1', image_mini:'images/items/pants/mini/cavalry_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:23, reflex:15, health:15}, attributes:{charisma:3, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10120] = {item_id:10120, nshort:'jeans_grey', name:'Grey jeans', type:'pants', level:71, price:7590, image:'images/items/pants/jeans_grey.png?1', image_mini:'images/items/pants/mini/jeans_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:15}, attributes:{charisma:2, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10121] = {item_id:10121, nshort:'jeans_yellow', name:'Yellow jeans', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_yellow.png?1', image_mini:'images/items/pants/mini/jeans_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:16, endurance:17, punch:16}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10122] = {item_id:10122, nshort:'jeans_blue', name:'Blue jeans', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_blue.png?1', image_mini:'images/items/pants/mini/jeans_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:16, tough:16, build:17}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10123] = {item_id:10123, nshort:'jeans_green', name:'Green jeans', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_green.png?1', image_mini:'images/items/pants/mini/jeans_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:16, ride:17, health:16}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10124] = {item_id:10124, nshort:'jeans_brown', name:'Brown jeans', type:'pants', level:79, price:12350, image:'images/items/pants/jeans_brown.png?1', image_mini:'images/items/pants/mini/jeans_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:16, aim:17, dodge:16}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10125] = {item_id:10125, nshort:'jeans_black', name:'Black jeans', type:'pants', level:79, price:12350, image:'images/items/pants/jeans_black.png?1', image_mini:'images/items/pants/mini/jeans_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, leadership:16, finger_dexterity:16}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10126] = {item_id:10126, nshort:'jeans_p1', name:'Fancy jeans', type:'pants', level:90, price:18900, image:'images/items/pants/jeans_p1.png?1', image_mini:'images/items/pants/mini/jeans_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:20, animal:18, trade:20, hide:20}, attributes:{charisma:3, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10130] = {item_id:10130, nshort:'leather_grey', name:'Grey leather pants', type:'pants', level:76, price:8880, image:'images/items/pants/leather_grey.png?1', image_mini:'images/items/pants/mini/leather_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:28}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10131] = {item_id:10131, nshort:'leather_yellow', name:'Yellow leather pants', type:'pants', level:80, price:13650, image:'images/items/pants/leather_yellow.png?1', image_mini:'images/items/pants/mini/leather_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:18, tough:20}, attributes:{strength:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10132] = {item_id:10132, nshort:'leather_blue', name:'Blue leather pants', type:'pants', level:80, price:13650, image:'images/items/pants/leather_blue.png?1', image_mini:'images/items/pants/mini/leather_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:18, swim:20}, attributes:{flexibility:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10133] = {item_id:10133, nshort:'leather_green', name:'Green leather pants', type:'pants', level:80, price:13650, image:'images/items/pants/leather_green.png?1', image_mini:'images/items/pants/mini/leather_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:18, build:20}, attributes:{dexterity:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10134] = {item_id:10134, nshort:'leather_brown', name:'Brown leather pants', type:'pants', level:85, price:14625, image:'images/items/pants/leather_brown.png?1', image_mini:'images/items/pants/mini/leather_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:17, dodge:17, punch:17}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10135] = {item_id:10135, nshort:'leather_black', name:'Black leather pants', type:'pants', level:85, price:14625, image:'images/items/pants/leather_black.png?1', image_mini:'images/items/pants/mini/leather_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:17, hide:17, endurance:17}, attributes:{dexterity:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10136] = {item_id:10136, nshort:'leather_p1', name:'Fancy leather pants', type:'pants', level:95, price:81600, image:'images/items/pants/leather_p1.png?1', image_mini:'images/items/pants/mini/leather_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:20, tactic:20, repair:20}, attributes:{flexibility:4, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10140] = {item_id:10140, nshort:'chapsfine_grey', name:'Grey soft leg guards', type:'pants', level:84, price:11625, image:'images/items/pants/chapsfine_grey.png?1', image_mini:'images/items/pants/mini/chapsfine_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:17, reflex:17}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10141] = {item_id:10141, nshort:'chapsfine_yellow', name:'Yellow soft leg guards', type:'pants', level:88, price:16660, image:'images/items/pants/chapsfine_yellow.png?1', image_mini:'images/items/pants/mini/chapsfine_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:20, swim:24, tough:20}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10142] = {item_id:10142, nshort:'chapsfine_blue', name:'Blue soft leg guards', type:'pants', level:88, price:17000, image:'images/items/pants/chapsfine_blue.png?1', image_mini:'images/items/pants/mini/chapsfine_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:26, health:20}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10143] = {item_id:10143, nshort:'chapsfine_green', name:'Green soft leg guards', type:'pants', level:88, price:17000, image:'images/items/pants/chapsfine_green.png?1', image_mini:'images/items/pants/mini/chapsfine_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:19, trade:20}, attributes:{charisma:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10144] = {item_id:10144, nshort:'chapsfine_brown', name:'Brown soft leg guards', type:'pants', level:94, price:18105, image:'images/items/pants/chapsfine_brown.png?1', image_mini:'images/items/pants/mini/chapsfine_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:11, punch:20, build:20}, attributes:{charisma:1, flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10145] = {item_id:10145, nshort:'chapsfine_black', name:'Black soft leg guards', type:'pants', level:94, price:18360, image:'images/items/pants/chapsfine_black.png?1', image_mini:'images/items/pants/mini/chapsfine_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:15, finger_dexterity:20, swim:13, tough:20}, attributes:{charisma:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10146] = {item_id:10146, nshort:'chapsfine_p1', name:'Fancy soft leg guards', type:'pants', level:99, price:23310, image:'images/items/pants/chapsfine_p1.png?1', image_mini:'images/items/pants/mini/chapsfine_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:25, aim:20, dodge:20, health:20}, attributes:{charisma:1, dexterity:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10147] = {item_id:10147, nshort:'chapsfine_fine', name:'Spodnie Buffalo Billa', type:'pants', level:110, price:25920, image:'images/items/pants/chapsfine_fine.png?1', image_mini:'images/items/pants/mini/chapsfine_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:18, reflex:20, endurance:20, tough:20}, attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10148] = {item_id:10148, nshort:'greenhorn_pants', name:'Wool pants', type:'pants', level:1, price:259, image:'images/items/pants/greenhorn_pants.png?1', image_mini:'images/items/pants/mini/greenhorn_pants.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Greenhorn set'}, shop:'shop'};\
\
items[11000] = {item_id:11000, nshort:'cotton_grey', name:'Grey wool belt', type:'belt', level:1, price:10, image:'images/items/belt/cotton_grey.png?1', image_mini:'images/items/belt/mini/cotton_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11001] = {item_id:11001, nshort:'cotton_yellow', name:'Yellow wool belt', type:'belt', level:2, price:35, image:'images/items/belt/cotton_yellow.png?1', image_mini:'images/items/belt/mini/cotton_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11002] = {item_id:11002, nshort:'cotton_blue', name:'Blue wool belt', type:'belt', level:3, price:45, image:'images/items/belt/cotton_blue.png?1', image_mini:'images/items/belt/mini/cotton_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:1, ride:1, punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11003] = {item_id:11003, nshort:'cotton_green', name:'Green wool belt', type:'belt', level:3, price:45, image:'images/items/belt/cotton_green.png?1', image_mini:'images/items/belt/mini/cotton_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1, tough:1, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11004] = {item_id:11004, nshort:'cotton_brown', name:'Brown wool belt', type:'belt', level:4, price:60, image:'images/items/belt/cotton_brown.png?1', image_mini:'images/items/belt/mini/cotton_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11005] = {item_id:11005, nshort:'cotton_black', name:'Black wool belt', type:'belt', level:4, price:60, image:'images/items/belt/cotton_black.png?1', image_mini:'images/items/belt/mini/cotton_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{dexterity:1}}, set:{key:'set_farmer', name:'Farmer\\'s set'}, shop:'shop'};\
items[11006] = {item_id:11006, nshort:'cotton_p1', name:'Fancy wool belt', type:'belt', level:5, price:250, image:'images/items/belt/cotton_p1.png?1', image_mini:'images/items/belt/mini/cotton_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1, aim:1, dodge:2}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11007] = {item_id:11007, nshort:'cotton_fine', name:'John Butterfield\\'s wool belt', type:'belt', level:8, price:390, image:'images/items/belt/cotton_fine.png?1', image_mini:'images/items/belt/mini/cotton_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:2, build:3}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11010] = {item_id:11010, nshort:'check_grey_belt', name:'Grey plaid belt', type:'belt', level:7, price:142, image:'images/items/belt/check_grey_belt.png?1', image_mini:'images/items/belt/mini/check_grey_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:1, health:1}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11011] = {item_id:11011, nshort:'check_yellow_belt', name:'Yellow plaid belt', type:'belt', level:8, price:290, image:'images/items/belt/check_yellow_belt.png?1', image_mini:'images/items/belt/mini/check_yellow_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, hide:1, reflex:1}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11012] = {item_id:11012, nshort:'check_blue_belt', name:'Blue plaid belt', type:'belt', level:9, price:310, image:'images/items/belt/check_blue_belt.png?1', image_mini:'images/items/belt/mini/check_blue_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:4, swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11013] = {item_id:11013, nshort:'check_green_belt', name:'Green plaid belt', type:'belt', level:10, price:370, image:'images/items/belt/check_green_belt.png?1', image_mini:'images/items/belt/mini/check_green_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, trade:4}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11014] = {item_id:11014, nshort:'check_brown_belt', name:'Brown plaid belt', type:'belt', level:11, price:390, image:'images/items/belt/check_brown_belt.png?1', image_mini:'images/items/belt/mini/check_brown_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5, leadership:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11015] = {item_id:11015, nshort:'check_black_belt', name:'Black plaid belt', type:'belt', level:11, price:390, image:'images/items/belt/check_black_belt.png?1', image_mini:'images/items/belt/mini/check_black_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:6, hide:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11016] = {item_id:11016, nshort:'check_p1_belt', name:'Fancy plaid belt', type:'belt', level:12, price:1160, image:'images/items/belt/check_p1_belt.png?1', image_mini:'images/items/belt/mini/check_p1_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:6, punch:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11017] = {item_id:11017, nshort:'check_fine_belt', name:'Ned Buntline\\'s plaid belt', type:'belt', level:15, price:1280, image:'images/items/belt/check_fine_belt.png?1', image_mini:'images/items/belt/mini/check_fine_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, shot:7, aim:6}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11020] = {item_id:11020, nshort:'fine_grey_belt', name:'Fine grey belt', type:'belt', level:12, price:210, image:'images/items/belt/fine_grey_belt.png?1', image_mini:'images/items/belt/mini/fine_grey_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11021] = {item_id:11021, nshort:'fine_yellow_belt', name:'Fine yellow belt', type:'belt', level:14, price:450, image:'images/items/belt/fine_yellow_belt.png?1', image_mini:'images/items/belt/mini/fine_yellow_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:5, endurance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11022] = {item_id:11022, nshort:'fine_blue_belt', name:'Fine blue belt', type:'belt', level:14, price:440, image:'images/items/belt/fine_blue_belt.png?1', image_mini:'images/items/belt/mini/fine_blue_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11023] = {item_id:11023, nshort:'fine_green_belt', name:'Fine green belt', type:'belt', level:15, price:480, image:'images/items/belt/fine_green_belt.png?1', image_mini:'images/items/belt/mini/fine_green_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, leadership:4}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11024] = {item_id:11024, nshort:'fine_brown_belt', name:'Fine brown belt', type:'belt', level:15, price:480, image:'images/items/belt/fine_brown_belt.png?1', image_mini:'images/items/belt/mini/fine_brown_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:4, shot:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11025] = {item_id:11025, nshort:'fine_black_belt', name:'Fine black belt', type:'belt', level:17, price:540, image:'images/items/belt/fine_black_belt.png?1', image_mini:'images/items/belt/mini/fine_black_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:6, tactic:6, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11026] = {item_id:11026, nshort:'fine_p1_belt', name:'Fancy fine belt', type:'belt', level:17, price:1300, image:'images/items/belt/fine_p1_belt.png?1', image_mini:'images/items/belt/mini/fine_p1_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6, leadership:7, punch:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11027] = {item_id:11027, nshort:'fine_fine_belt', name:'Thomas Hart Benton\\'s fine belt', type:'belt', level:20, price:1620, image:'images/items/belt/fine_fine_belt.png?1', image_mini:'images/items/belt/mini/fine_fine_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:8, build:9}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11030] = {item_id:11030, nshort:'buckle_grey', name:'Grey buckled belt', type:'belt', level:18, price:420, image:'images/items/belt/buckle_grey.png?1', image_mini:'images/items/belt/mini/buckle_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{dexterity:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11031] = {item_id:11031, nshort:'buckle_yellow', name:'Yellow buckled belt', type:'belt', level:20, price:1160, image:'images/items/belt/buckle_yellow.png?1', image_mini:'images/items/belt/mini/buckle_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:7, endurance:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11032] = {item_id:11032, nshort:'buckle_blue', name:'Blue buckled belt', type:'belt', level:20, price:1140, image:'images/items/belt/buckle_blue.png?1', image_mini:'images/items/belt/mini/buckle_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11033] = {item_id:11033, nshort:'buckle_green', name:'Green buckled belt', type:'belt', level:22, price:1340, image:'images/items/belt/buckle_green.png?1', image_mini:'images/items/belt/mini/buckle_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9, dodge:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11034] = {item_id:11034, nshort:'buckle_brown', name:'Brown buckled belt', type:'belt', level:22, price:1340, image:'images/items/belt/buckle_brown.png?1', image_mini:'images/items/belt/mini/buckle_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:9, punch:10}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Pilgrim\\'s set'}, shop:'shop'};\
items[11035] = {item_id:11035, nshort:'buckle_black', name:'Black buckled belt', type:'belt', level:24, price:1520, image:'images/items/belt/buckle_black.png?1', image_mini:'images/items/belt/mini/buckle_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, finger_dexterity:10}, attributes:{flexibility:2}}, set:{key:'set_pilgrim_female', name:'Pilgrim\\'s dress set'}, shop:'shop'};\
items[11036] = {item_id:11036, nshort:'buckle_p1', name:'Fancy buckled belt', type:'belt', level:25, price:2700, image:'images/items/belt/buckle_p1.png?1', image_mini:'images/items/belt/mini/buckle_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, tactic:10, reflex:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11037] = {item_id:11037, nshort:'buckle_fine', name:'Charles Goodnight\\'s buckled belt', type:'belt', level:27, price:3000, image:'images/items/belt/buckle_fine.png?1', image_mini:'images/items/belt/mini/buckle_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, leadership:10, tough:10, build:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11040] = {item_id:11040, nshort:'bull_grey', name:'Grey buffalo belt', type:'belt', level:23, price:490, image:'images/items/belt/bull_grey.png?1', image_mini:'images/items/belt/mini/bull_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:7, endurance:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11041] = {item_id:11041, nshort:'bull_yellow', name:'Yellow buffalo belt', type:'belt', level:24, price:1360, image:'images/items/belt/bull_yellow.png?1', image_mini:'images/items/belt/mini/bull_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:14}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11042] = {item_id:11042, nshort:'bull_blue', name:'Blue buffalo belt', type:'belt', level:24, price:1320, image:'images/items/belt/bull_blue.png?1', image_mini:'images/items/belt/mini/bull_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:2, build:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11043] = {item_id:11043, nshort:'bull_green', name:'Green buffalo belt', type:'belt', level:26, price:1400, image:'images/items/belt/bull_green.png?1', image_mini:'images/items/belt/mini/bull_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, animal:8, repair:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11044] = {item_id:11044, nshort:'bull_brown', name:'Brown buffalo belt', type:'belt', level:27, price:1500, image:'images/items/belt/bull_brown.png?1', image_mini:'images/items/belt/mini/bull_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:7, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11045] = {item_id:11045, nshort:'bull_black', name:'Black buffalo belt', type:'belt', level:27, price:1540, image:'images/items/belt/bull_black.png?1', image_mini:'images/items/belt/mini/bull_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, shot:8}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11046] = {item_id:11046, nshort:'bull_p1', name:'Fancy buffalo belt', type:'belt', level:28, price:2940, image:'images/items/belt/bull_p1.png?1', image_mini:'images/items/belt/mini/bull_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:8, trade:8}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11047] = {item_id:11047, nshort:'bull_fine', name:'Bill Hickok\\'s buffalo belt', type:'belt', level:30, price:3210, image:'images/items/belt/bull_fine.png?1', image_mini:'images/items/belt/mini/bull_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, swim:10, hide:10, ride:10}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11050] = {item_id:11050, nshort:'studs_grey', name:'Grey studded belt', type:'belt', level:27, price:780, image:'images/items/belt/studs_grey.png?1', image_mini:'images/items/belt/mini/studs_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11051] = {item_id:11051, nshort:'studs_yellow', name:'Yellow studded belt', type:'belt', level:28, price:2220, image:'images/items/belt/studs_yellow.png?1', image_mini:'images/items/belt/mini/studs_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:11, swim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11052] = {item_id:11052, nshort:'studs_blue', name:'Blue studded belt', type:'belt', level:28, price:2100, image:'images/items/belt/studs_blue.png?1', image_mini:'images/items/belt/mini/studs_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:7, dodge:7}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11053] = {item_id:11053, nshort:'studs_green', name:'Green studded belt', type:'belt', level:30, price:2280, image:'images/items/belt/studs_green.png?1', image_mini:'images/items/belt/mini/studs_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:19}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11054] = {item_id:11054, nshort:'studs_brown', name:'Brown studded belt', type:'belt', level:30, price:2340, image:'images/items/belt/studs_brown.png?1', image_mini:'images/items/belt/mini/studs_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, punch:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11055] = {item_id:11055, nshort:'studs_black', name:'Black studded belt', type:'belt', level:31, price:2430, image:'images/items/belt/studs_black.png?1', image_mini:'images/items/belt/mini/studs_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, ride:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11056] = {item_id:11056, nshort:'studs_p1', name:'Fancy studded belt', type:'belt', level:32, price:3640, image:'images/items/belt/studs_p1.png?1', image_mini:'images/items/belt/mini/studs_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:12, pitfall:12, hide:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11057] = {item_id:11057, nshort:'studs_fine', name:'Sam Houston\\'s studded belt', type:'belt', level:35, price:3990, image:'images/items/belt/studs_fine.png?1', image_mini:'images/items/belt/mini/studs_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, aim:11, ride:12, punch:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11060] = {item_id:11060, nshort:'horse_grey', name:'Grey horse belt', type:'belt', level:31, price:840, image:'images/items/belt/horse_grey.png?1', image_mini:'images/items/belt/mini/horse_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:8}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11061] = {item_id:11061, nshort:'horse_yellow', name:'Yellow horse belt', type:'belt', level:33, price:2430, image:'images/items/belt/horse_yellow.png?1', image_mini:'images/items/belt/mini/horse_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:2, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11062] = {item_id:11062, nshort:'horse_blue', name:'Blue horse belt', type:'belt', level:33, price:2370, image:'images/items/belt/horse_blue.png?1', image_mini:'images/items/belt/mini/horse_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4}, attributes:{charisma:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11063] = {item_id:11063, nshort:'horse_green', name:'Green horse belt', type:'belt', level:35, price:2520, image:'images/items/belt/horse_green.png?1', image_mini:'images/items/belt/mini/horse_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:9, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11064] = {item_id:11064, nshort:'horse_brown', name:'Brown horse belt', type:'belt', level:35, price:2520, image:'images/items/belt/horse_brown.png?1', image_mini:'images/items/belt/mini/horse_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, hide:6}, attributes:{flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11065] = {item_id:11065, nshort:'horse_black', name:'Black horse belt', type:'belt', level:36, price:2640, image:'images/items/belt/horse_black.png?1', image_mini:'images/items/belt/mini/horse_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, swim:9}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11066] = {item_id:11066, nshort:'horse_p1', name:'Fancy horse belt', type:'belt', level:37, price:3395, image:'images/items/belt/horse_p1.png?1', image_mini:'images/items/belt/mini/horse_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5, leadership:6, tough:12}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11067] = {item_id:11067, nshort:'horse_fine', name:'Seth Bullock\\'s horse belt', type:'belt', level:40, price:4130, image:'images/items/belt/horse_fine.png?1', image_mini:'images/items/belt/mini/horse_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:8, reflex:8, health:9}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11070] = {item_id:11070, nshort:'eagle_grey', name:'Grey eagle belt', type:'belt', level:37, price:885, image:'images/items/belt/eagle_grey.png?1', image_mini:'images/items/belt/mini/eagle_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, pitfall:7, build:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11071] = {item_id:11071, nshort:'eagle_yellow', name:'Yellow eagle belt', type:'belt', level:38, price:2310, image:'images/items/belt/eagle_yellow.png?1', image_mini:'images/items/belt/mini/eagle_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:11, endurance:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11072] = {item_id:11072, nshort:'eagle_blue', name:'Blue eagle belt', type:'belt', level:38, price:2460, image:'images/items/belt/eagle_blue.png?1', image_mini:'images/items/belt/mini/eagle_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11073] = {item_id:11073, nshort:'eagle_green', name:'Green eagle belt', type:'belt', level:42, price:2730, image:'images/items/belt/eagle_green.png?1', image_mini:'images/items/belt/mini/eagle_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:10}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11074] = {item_id:11074, nshort:'eagle_brown', name:'Brown eagle belt', type:'belt', level:42, price:2730, image:'images/items/belt/eagle_brown.png?1', image_mini:'images/items/belt/mini/eagle_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, swim:10}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11075] = {item_id:11075, nshort:'eagle_black', name:'Black eagle belt', type:'belt', level:45, price:2940, image:'images/items/belt/eagle_black.png?1', image_mini:'images/items/belt/mini/eagle_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13, trade:12, build:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11076] = {item_id:11076, nshort:'eagle_p1', name:'Fancy eagle belt', type:'belt', level:45, price:4200, image:'images/items/belt/eagle_p1.png?1', image_mini:'images/items/belt/mini/eagle_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:10, dodge:10, reflex:10}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11077] = {item_id:11077, nshort:'eagle_fine', name:'Al Swearengen\\'s eagle belt', type:'belt', level:48, price:4235, image:'images/items/belt/eagle_fine.png?1', image_mini:'images/items/belt/mini/eagle_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15, shot:8, ride:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11080] = {item_id:11080, nshort:'ammo_grey', name:'Grey cartridge belt', type:'belt', level:44, price:1300, image:'images/items/belt/ammo_grey.png?1', image_mini:'images/items/belt/mini/ammo_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11081] = {item_id:11081, nshort:'ammo_yellow', name:'Yellow cartridge belt', type:'belt', level:47, price:3600, image:'images/items/belt/ammo_yellow.png?1', image_mini:'images/items/belt/mini/ammo_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, tough:10, build:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11082] = {item_id:11082, nshort:'ammo_blue', name:'Blue cartridge belt', type:'belt', level:47, price:3600, image:'images/items/belt/ammo_blue.png?1', image_mini:'images/items/belt/mini/ammo_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:10, endurance:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11083] = {item_id:11083, nshort:'ammo_green', name:'Green cartridge belt', type:'belt', level:48, price:3600, image:'images/items/belt/ammo_green.png?1', image_mini:'images/items/belt/mini/ammo_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, trade:10, tactic:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11084] = {item_id:11084, nshort:'ammo_brown', name:'Brown cartridge belt', type:'belt', level:49, price:4000, image:'images/items/belt/ammo_brown.png?1', image_mini:'images/items/belt/mini/ammo_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:10, hide:10, reflex:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11085] = {item_id:11085, nshort:'ammo_black', name:'Black cartridge belt', type:'belt', level:49, price:4120, image:'images/items/belt/ammo_black.png?1', image_mini:'images/items/belt/mini/ammo_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, health:10}, attributes:{dexterity:1, strength:2}}, set:{key:'set_quackery', name:'Charlatan\\'s set'}, shop:'shop'};\
items[11086] = {item_id:11086, nshort:'ammo_p1', name:'Fancy cartridge belt', type:'belt', level:52, price:5805, image:'images/items/belt/ammo_p1.png?1', image_mini:'images/items/belt/mini/ammo_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:15}, attributes:{charisma:3, dexterity:1, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11087] = {item_id:11087, nshort:'ammo_fine', name:'Calamity Jane\\'s cartridge belt', type:'belt', level:57, price:6750, image:'images/items/belt/ammo_fine.png?1', image_mini:'images/items/belt/mini/ammo_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:10, health:10, punch:10}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11102] = {item_id:11102, nshort:'skull_grey', name:'Grey skull belt', type:'belt', level:57, price:4875, image:'images/items/belt/skull_grey.png?1', image_mini:'images/items/belt/mini/skull_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5, build:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11103] = {item_id:11103, nshort:'skull_yellow', name:'Yellow skull belt', type:'belt', level:60, price:6825, image:'images/items/belt/skull_yellow.png?1', image_mini:'images/items/belt/mini/skull_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, tough:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11104] = {item_id:11104, nshort:'skull_blue', name:'Blue skull belt', type:'belt', level:60, price:4200, image:'images/items/belt/skull_blue.png?1', image_mini:'images/items/belt/mini/skull_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15, endurance:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11105] = {item_id:11105, nshort:'skull_green', name:'Green skull belt', type:'belt', level:65, price:7020, image:'images/items/belt/skull_green.png?1', image_mini:'images/items/belt/mini/skull_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, finger_dexterity:15}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11106] = {item_id:11106, nshort:'skull_brown', name:'Brown skull belt', type:'belt', level:65, price:7020, image:'images/items/belt/skull_brown.png?1', image_mini:'images/items/belt/mini/skull_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, health:15}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11107] = {item_id:11107, nshort:'skull_black', name:'Black skull belt', type:'belt', level:70, price:7560, image:'images/items/belt/skull_black.png?1', image_mini:'images/items/belt/mini/skull_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, trade:15}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11108] = {item_id:11108, nshort:'skull_p1', name:'Fancy skull belt', type:'belt', level:70, price:9900, image:'images/items/belt/skull_p1.png?1', image_mini:'images/items/belt/mini/skull_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:15, shot:15, ride:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11110] = {item_id:11110, nshort:'pistols_grey', name:'Grey pistol belt', type:'belt', level:75, price:7350, image:'images/items/belt/pistols_grey.png?1', image_mini:'images/items/belt/mini/pistols_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:15, reflex:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11111] = {item_id:11111, nshort:'pistols_yellow', name:'Yellow pistol belt', type:'belt', level:85, price:9870, image:'images/items/belt/pistols_yellow.png?1', image_mini:'images/items/belt/mini/pistols_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:4, dexterity:5, flexibility:4, strength:5}}, set:{key:null, name:null}, shop:'shop'};\
items[11112] = {item_id:11112, nshort:'pistols_blue', name:'Blue pistol belt', type:'belt', level:90, price:7975, image:'images/items/belt/pistols_blue.png?1', image_mini:'images/items/belt/mini/pistols_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:15, dodge:25}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11113] = {item_id:11113, nshort:'pistols_green', name:'Green pistol belt', type:'belt', level:95, price:11115, image:'images/items/belt/pistols_green.png?1', image_mini:'images/items/belt/mini/pistols_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6, dexterity:5, flexibility:6, strength:5}}, set:{key:null, name:null}, shop:'shop'};\
items[11114] = {item_id:11114, nshort:'pistols_brown', name:'Brown pistol belt', type:'belt', level:100, price:10725, image:'images/items/belt/pistols_brown.png?1', image_mini:'images/items/belt/mini/pistols_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, finger_dexterity:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11115] = {item_id:11115, nshort:'pistols_black', name:'Black pistol belt', type:'belt', level:105, price:11700, image:'images/items/belt/pistols_black.png?1', image_mini:'images/items/belt/mini/pistols_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, shot:15, reflex:15, punch:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11116] = {item_id:11116, nshort:'pistols_p1', name:'Fancy pistol belt', type:'belt', level:110, price:15600, image:'images/items/belt/pistols_p1.png?1', image_mini:'images/items/belt/mini/pistols_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, leadership:15, endurance:15, build:15}, attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11118] = {item_id:11118, nshort:'greenhorn_belt', name:'Leather belt', type:'belt', level:4, price:375, image:'images/items/belt/greenhorn_belt.png?1', image_mini:'images/items/belt/mini/greenhorn_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:2, shot:3, build:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Greenhorn set'}, shop:'shop'};\
\
\
items[12700] = {item_id:12700, nshort:'adventcal', name:'Kalendarz Adwentowy', type:'yield', level:null, price:10, image:'images/items/yield/adventcal.png?1', image_mini:'images/items/yield/adventcal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12701] = {item_id:12701, nshort:'xmas_licorice', name:'Liquorice', type:'yield', level:null, price:15, image:'images/items/yield/xmas_licorice.png?1', image_mini:'images/items/yield/xmas_licorice.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[12702] = {item_id:12702, nshort:'xmas_oat', name:'Oat', type:'yield', level:null, price:32, image:'images/items/yield/xmas_oat.png?1', image_mini:'images/items/yield/xmas_oat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[12703] = {item_id:12703, nshort:'xmas_cracker', name:'Christmas cracker', type:'yield', level:null, price:27, image:'images/items/yield/xmas_cracker.png?1', image_mini:'images/items/yield/xmas_cracker.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[12704] = {item_id:12704, nshort:'xmas_lebkuchen', name:'Gingerbread', type:'yield', level:null, price:31, image:'images/items/yield/xmas_lebkuchen.png?1', image_mini:'images/items/yield/xmas_lebkuchen.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[12705] = {item_id:12705, nshort:'xmas_cookie', name:'Chocolate cookie', type:'yield', level:null, price:29, image:'images/items/yield/xmas_cookie.png?1', image_mini:'images/items/yield/xmas_cookie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[12706] = {item_id:12706, nshort:'xmas_potato', name:'Marzipan potato', type:'yield', level:null, price:39, image:'images/items/yield/xmas_potato.png?1', image_mini:'images/items/yield/xmas_potato.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[12707] = {item_id:12707, nshort:'xmas_coal', name:'A piece of coal', type:'yield', level:null, price:2, image:'images/items/yield/xmas_coal.png?1', image_mini:'images/items/yield/xmas_coal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12708] = {item_id:12708, nshort:'xmas_sphere', name:'Glass marble', type:'yield', level:null, price:35, image:'images/items/yield/xmas_sphere.png?1', image_mini:'images/items/yield/xmas_sphere.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[12710] = {item_id:12710, nshort:'xmas_present_mid', name:'Fajny prezent', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present_mid.png?1', image_mini:'images/items/yield/xmas_present_mid.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12711] = {item_id:12711, nshort:'xmas_present_high', name:'Ekskluzywny prezent', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present_high.png?1', image_mini:'images/items/yield/xmas_present_high.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[12713] = {item_id:12713, nshort:'xmas_bag', name:'Bag of marbles', type:'yield', level:null, price:330, image:'images/items/yield/xmas_bag.png?1', image_mini:'images/items/yield/xmas_bag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[16100] = {item_id:16100, nshort:'fb_aidkit', name:'Doctor\\'s bag', type:'yield', level:null, price:590, image:'images/items/yield/fb_aidkit.png?1', image_mini:'images/items/yield/fb_aidkit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[17000] = {item_id:17000, nshort:'fb_chest_wooden', name:'Wooden box', type:'yield', level:null, price:1204, image:'images/items/yield/fb_chest_wooden.png?1', image_mini:'images/items/yield/fb_chest_wooden.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[17001] = {item_id:17001, nshort:'fb_chest_iron', name:'Iron-clad box', type:'yield', level:null, price:6584, image:'images/items/yield/fb_chest_iron.png?1', image_mini:'images/items/yield/fb_chest_iron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[17002] = {item_id:17002, nshort:'fb_chest_steel', name:'Steel lined box', type:'yield', level:null, price:11490, image:'images/items/yield/fb_chest_steel.png?1', image_mini:'images/items/yield/fb_chest_steel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[20003] = {item_id:20003, nshort:'beansandbacon_recipe', name:'Instructions: Cook baked beans', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20004] = {item_id:20004, nshort:'marmelade_recipe', name:'Instructions: Cook jam', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20005] = {item_id:20005, nshort:'mash_recipe', name:'Instructions: Prepare mash', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20006] = {item_id:20006, nshort:'dough_recipe', name:'Instructions: Dough', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20007] = {item_id:20007, nshort:'steakseasoning_recipe', name:'Instructions: Marinate a steak', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20008] = {item_id:20008, nshort:'licor_recipe', name:'Instructions: Brew liquor', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20009] = {item_id:20009, nshort:'cake_recipe', name:'Instructions: Bake a cake', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20010] = {item_id:20010, nshort:'fishfond_recipe', name:'Instructions: Brew a fish stock', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20011] = {item_id:20011, nshort:'turkey_recipe', name:'Instructions: Prepare a roast turkey', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20012] = {item_id:20012, nshort:'fishsoup_recipe', name:'Instructions: Cook fish soup', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20013] = {item_id:20013, nshort:'veggiepun_recipe', name:'Instructions: Cook vegetable dumplings', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20014] = {item_id:20014, nshort:'meatloaf_recipe', name:'Instructions: Prepare mince', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20015] = {item_id:20015, nshort:'fishonastick_recipe', name:'Instructions: Prepare dried cod', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20016] = {item_id:20016, nshort:'parfumsmoke_recipe', name:'Instructions: Produce incense', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20017] = {item_id:20017, nshort:'sauce_recipe', name:'Instructions: Prepare sauce', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20018] = {item_id:20018, nshort:'paperfish_recipe', name:'Instructions: A fish wrapped in newspaper', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20018] = {item_id:20018, nshort:'paperfish_recipe', name:'Instructions: A fish wrapped in newspaper', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20019] = {item_id:20019, nshort:'gentlemen_recipe', name:'Instructions: Cook gentleman\\'s dinner', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[20023] = {item_id:20023, nshort:'pipecleaner_recipe', name:'Instructions: Produce pipe brush', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20024] = {item_id:20024, nshort:'stomach_recipe', name:'Instructions: Prepare stomach medicine', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20025] = {item_id:20025, nshort:'sulfuracid_recipe', name:'Instructions: Produce sulfuric acid', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20026] = {item_id:20026, nshort:'ink_recipe', name:'Instructions: Prepare ink', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20027] = {item_id:20027, nshort:'petroleum_recipe', name:'Instructions: Prepare petroleum', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20028] = {item_id:20028, nshort:'fetish_recipe', name:'Instructions: Prepare voodoo doll', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20029] = {item_id:20029, nshort:'destillate_recipe', name:'Instructions: Prepare various distillates', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20030] = {item_id:20030, nshort:'firewater_recipe', name:'Instructions: Prepare moonshine', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20031] = {item_id:20031, nshort:'tea_recipe', name:'Instructions: Tea blend', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20032] = {item_id:20032, nshort:'chewtabaco_recipe', name:'Instructions: Mix chewing tobacco', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20033] = {item_id:20033, nshort:'fruitlicor_recipe', name:'Instructions: Brew fruit liqueur', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20034] = {item_id:20034, nshort:'battery_recipe', name:'Instructions: Create battery', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20035] = {item_id:20035, nshort:'lye_recipe', name:'Instructions: Prepare lye', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20036] = {item_id:20036, nshort:'herbbrew_recipe', name:'Instructions: Brew herbal brew', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20037] = {item_id:20037, nshort:'paper_recipe', name:'Instructions: Recycle paper', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20038] = {item_id:20038, nshort:'mathdraw_recipe', name:'Instructions: Construct a pair of compasses', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20039] = {item_id:20039, nshort:'rosewater_recipe', name:'Instructions: Prepare rose water', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[20043] = {item_id:20043, nshort:'bajonett_recipe', name:'Instructions: Create a bayonet ', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20044] = {item_id:20044, nshort:'weightstone_recipe', name:'Instructions: Prepare a weightstone', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20045] = {item_id:20045, nshort:'steel_recipe', name:'Instructions: Cast steel', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20046] = {item_id:20046, nshort:'liquid_lead_recipe', name:'Instructions: Melt lead', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20047] = {item_id:20047, nshort:'forge_recipe', name:'Instructions: Create an anvil', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20048] = {item_id:20048, nshort:'leadfigure_recipe', name:'Instructions: Create lead figurine', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20049] = {item_id:20049, nshort:'marble_recipe', name:'Instructions: Cast a marble', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20050] = {item_id:20050, nshort:'rivets_recipe', name:'Instructions: Produce rivets', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20051] = {item_id:20051, nshort:'gripprotection_recipe', name:'Instructions: Create a hilt', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20052] = {item_id:20052, nshort:'coolingpackage_recipe', name:'Instructions: Create a cooling cloth', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20053] = {item_id:20053, nshort:'weaponchain_recipe', name:'Instructions: Create a weapon chain', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20054] = {item_id:20054, nshort:'handle_recipe', name:'Instructions: Create a handle', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20055] = {item_id:20055, nshort:'revolverform_recipe', name:'Instructions: Create a revolver mould', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20056] = {item_id:20056, nshort:'steelblade_recipe', name:'Instructions: Cast a steel blade', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20057] = {item_id:20057, nshort:'customize_recipe', name:'Instructions: Make an ornament', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[20063] = {item_id:20063, nshort:'horseshoe_recipe', name:'Instructions: Shoe a hoof', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20064] = {item_id:20064, nshort:'energyfood_recipe', name:'Instructions: Prepare concentrate', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20065] = {item_id:20065, nshort:'naked_saddle_recipe', name:'Instructions: Strip the covering from a saddle', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20066] = {item_id:20066, nshort:'fillmaterial_recipe', name:'Instructions: Prepare filling', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20067] = {item_id:20067, nshort:'leatherskin_recipe', name:'Instructions: Prepare leather cover', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20068] = {item_id:20068, nshort:'brandingiron_recipe', name:'Instructions: Branding Iron', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20069] = {item_id:20069, nshort:'notworking_compass_recipe', name:'Instructions: Produce a compass frame', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20070] = {item_id:20070, nshort:'ironstep_recipe', name:'Instructions: Construct a stirrup', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20071] = {item_id:20071, nshort:'spores_recipe', name:'Instructions: Construct a spur', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20072] = {item_id:20072, nshort:'harnish_recipe', name:'Instructions: Construct a bridle', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20073] = {item_id:20073, nshort:'fieldcamp_recipe', name:'Instructions: Sew sleeping bag', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20074] = {item_id:20074, nshort:'horse_cloth_recipe', name:'Instructions: Sew horse blanket', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20075] = {item_id:20075, nshort:'custom_leather_recipe', name:'Instructions: Ornamentation of leather products', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20076] = {item_id:20076, nshort:'charriotpiece_recipe', name:'Instructions: Construct a wagon part', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20077] = {item_id:20077, nshort:'wagonwheel_recipe', name:'Instructions: Construct a wagon wheel', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[40000] = {item_id:40000, nshort:'greenhorn_poncho', name:'Wool poncho', type:'body', level:1, price:125, image:'images/items/body/greenhorn_poncho.png?1', image_mini:'images/items/body/mini/greenhorn_poncho.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, tough:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Greenhorn set'}, shop:'shop'};\
\
";

pk2_code += "\
raboty = [];\
raboty[1] = {rus_name:'Pilnowanie świń', name:'swine', malus:1, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:1, vezenie:0, boom:1, produkty:{700:20}}};\
raboty[2] = {rus_name:'Scare birds off the field', name:'scarecrow', malus:0, navyki:{build:1,shot:1,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:1, opyt:3, vezenie:2, boom:20, produkty:{757:20}}};\
raboty[3] = {rus_name:'Putting up posters', name:'wanted', malus:0, navyki:{endurance:1,ride:1,hide:1,finger_dexterity:1,pitfall:1}, resultaty:{dengi:2, opyt:3, vezenie:0, boom:10, produkty:{743:40}}};\
raboty[4] = {rus_name:'Picking tobacco', name:'tabacco', malus:0, navyki:{tough:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:2, produkty:{702:100}}};\
raboty[5] = {rus_name:'Zbiór bawełny', name:'cotton', malus:1, navyki:{tough:1,endurance:1,finger_dexterity:1,leadership:1,trade:1}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:3, produkty:{704:50}}};\
raboty[6] = {rus_name:'Zrywanie trzciny cukrowej', name:'sugar', malus:3, navyki:{punch:1,tough:1,finger_dexterity:1,repair:1,trade:1}, resultaty:{dengi:5, opyt:2, vezenie:4, boom:1, produkty:{703:100}}};\
raboty[7] = {rus_name:'Wędkowanie', name:'angle', malus:2, navyki:{hide:1,swim:3,repair:1}, resultaty:{dengi:1, opyt:0, vezenie:6, boom:2, produkty:{705:60, 782:3}}};\
raboty[8] = {rus_name:'Zbieranie zboża', name:'cereal', malus:10, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:2, opyt:6, vezenie:2, boom:4, produkty:{701:55}}};\
raboty[9] = {rus_name:'Picking berries', name:'berry', malus:15, navyki:{tough:2,hide:1,finger_dexterity:2}, resultaty:{dengi:2, opyt:6, vezenie:5, boom:6, produkty:{706:45}}};\
raboty[10] = {rus_name:'Wypasanie owiec', name:'sheeps', malus:11, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:5, vezenie:0, boom:2, produkty:{707:25}}};\
raboty[11] = {rus_name:'Sprzedaż gazet', name:'newspaper', malus:9, navyki:{ride:2,trade:2,appearance:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:1, produkty:{744:60}}};\
raboty[12] = {rus_name:'Koszenie pastwiska', name:'cut', malus:22, navyki:{punch:1,ride:1,finger_dexterity:1,animal:2}, resultaty:{dengi:5, opyt:7, vezenie:3, boom:3, produkty:{765:5}}};\
raboty[13] = {rus_name:'Milling grains', name:'grinding', malus:25, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:11, opyt:7, vezenie:0, boom:5, produkty:{745:40}}};\
raboty[14] = {rus_name:'Zbieranie kukurydzy', name:'corn', malus:23, navyki:{finger_dexterity:1,tactic:1,trade:1,animal:1,appearance:1}, resultaty:{dengi:4, opyt:7, vezenie:8, boom:5, produkty:{748:25}}};\
raboty[15] = {rus_name:'Zbieranie fasoli', name:'beans', malus:23, navyki:{endurance:1,finger_dexterity:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:9, opyt:7, vezenie:4, boom:5, produkty:{746:40}}};\
raboty[16] = {rus_name:'Guarding the fort', name:'fort_guard', malus:25, navyki:{reflex:1,shot:1,leadership:1,appearance:2}, resultaty:{dengi:3, opyt:9, vezenie:2, boom:7, produkty:{758:2}}};\
raboty[17] = {rus_name:'Garbowanie', name:'tanning', malus:40, navyki:{tough:1,endurance:1,swim:1,finger_dexterity:1,trade:1}, resultaty:{dengi:12, opyt:15, vezenie:5, boom:18, produkty:{712:15}}};\
raboty[18] = {rus_name:'Wydobycie złota', name:'digging', malus:31, navyki:{tough:1,reflex:1,swim:1,trade:2}, resultaty:{dengi:11, opyt:3, vezenie:5, boom:7, produkty:{708:17, 1791:1}}};\
raboty[19] = {rus_name:'Kopanie grobów', name:'grave', malus:76, navyki:{build:1,punch:1,tough:1,endurance:1,ride:1}, resultaty:{dengi:16, opyt:12, vezenie:22, boom:9, produkty:{736:8}}};\
raboty[20] = {rus_name:'Polowanie na indyki', name:'turkey', malus:43, navyki:{reflex:1,hide:2,shot:1,pitfall:1}, resultaty:{dengi:3, opyt:14, vezenie:7, boom:21, produkty:{709:13}}};\
raboty[21] = {rus_name:'Rozkładanie torów', name:'rail', malus:44, navyki:{build:2,endurance:1,repair:1,leadership:1}, resultaty:{dengi:10, opyt:18, vezenie:5, boom:10, produkty:{766:25}}};\
raboty[22] = {rus_name:'Hodowla krów', name:'cow', malus:39, navyki:{ride:2,reflex:1,tactic:1,animal:1}, resultaty:{dengi:5, opyt:17, vezenie:0, boom:11, produkty:{710:15}}};\
raboty[23] = {rus_name:'Naprawianie płotów', name:'fence', malus:36, navyki:{finger_dexterity:1,repair:2,animal:2}, resultaty:{dengi:7, opyt:11, vezenie:5, boom:6, produkty:{747:11}}};\
raboty[24] = {rus_name:'Sawing wood', name:'saw', malus:64, navyki:{reflex:2,finger_dexterity:2,trade:1}, resultaty:{dengi:23, opyt:12, vezenie:6, boom:32, produkty:{742:10}}};\
raboty[25] = {rus_name:'Kamieniołom', name:'stone', malus:53, navyki:{punch:3,endurance:1,reflex:1}, resultaty:{dengi:17, opyt:8, vezenie:9, boom:33, produkty:{716:22}}};\
raboty[26] = {rus_name:'Wyrównywanie koryta rzeki', name:'straighten', malus:85, navyki:{build:1,swim:3,tactic:1}, resultaty:{dengi:8, opyt:22, vezenie:15, boom:12, produkty:{795:5}}};\
raboty[27] = {rus_name:'Wycinka drzew', name:'wood', malus:48, navyki:{punch:2,endurance:1,reflex:1,appearance:1}, resultaty:{dengi:18, opyt:5, vezenie:2, boom:21, produkty:{711:25}}};\
raboty[28] = {rus_name:'Budowa urządzeń nawadniających', name:'irrigation', malus:45, navyki:{build:1,ride:1,repair:1,leadership:1,tactic:1}, resultaty:{dengi:7, opyt:13, vezenie:15, boom:6, produkty:{736:6}}};\
raboty[29] = {rus_name:'Branding cattle', name:'brand', malus:50, navyki:{ride:1,reflex:1,pitfall:1,animal:2}, resultaty:{dengi:8, opyt:25, vezenie:0, boom:35, produkty:{740:13}}};\
raboty[30] = {rus_name:'Zakładanie ogrodzenia z drutu kolczastego', name:'wire', malus:58, navyki:{build:1,finger_dexterity:2,pitfall:1,animal:1}, resultaty:{dengi:17, opyt:13, vezenie:6, boom:0, produkty:{739:10}}};\
raboty[31] = {rus_name:'Burzenie tamy', name:'dam', malus:54, navyki:{swim:2,tactic:2,animal:1}, resultaty:{dengi:4, opyt:18, vezenie:9, boom:41, produkty:{714:5}}};\
raboty[32] = {rus_name:'Poszukiwanie kamieni szlachetnych', name:'gems', malus:75, navyki:{swim:2,finger_dexterity:1,trade:2}, resultaty:{dengi:25, opyt:7, vezenie:8, boom:4, produkty:{720:8}}};\
raboty[33] = {rus_name:'Ustanowienie prawa własności', name:'claim', malus:57, navyki:{build:1,endurance:1,swim:1,trade:1,appearance:1}, resultaty:{dengi:31, opyt:4, vezenie:4, boom:29, produkty:{755:25}}};\
raboty[34] = {rus_name:'Naprawa wozów osadników', name:'chuck_wagon', malus:134, navyki:{ride:1,repair:2,leadership:1,trade:1}, resultaty:{dengi:5, opyt:23, vezenie:42, boom:11, produkty:{722:15}}};\
raboty[35] = {rus_name:'Ujeżdżanie koni', name:'break_in', malus:72, navyki:{ride:2,reflex:1,pitfall:1,animal:1}, resultaty:{dengi:13, opyt:32, vezenie:10, boom:52, produkty:{787:5}}};\
raboty[36] = {rus_name:'Handel', name:'trade', malus:85, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:15, opyt:3, vezenie:25, boom:12, produkty:{715:13, 774:1}}};\
raboty[37] = {rus_name:'Stawianie masztów telegraficznych', name:'mast', malus:75, navyki:{build:2,punch:1,swim:1,repair:1}, resultaty:{dengi:21, opyt:25, vezenie:3, boom:14, produkty:{767:14}}};\
raboty[38] = {rus_name:'Well drilling', name:'spring', malus:103, navyki:{build:1,endurance:1,swim:1,leadership:1,tactic:1}, resultaty:{dengi:9, opyt:33, vezenie:23, boom:19, produkty:{741:10}}};\
raboty[39] = {rus_name:'Polowanie na bobry', name:'beaver', malus:120, navyki:{hide:2,pitfall:3}, resultaty:{dengi:32, opyt:17, vezenie:6, boom:21, produkty:{714:17, 771:13}}};\
raboty[40] = {rus_name:'Wydobycie węgla', name:'coal', malus:86, navyki:{punch:2,reflex:1,finger_dexterity:1,trade:1}, resultaty:{dengi:30, opyt:14, vezenie:0, boom:13, produkty:{721:37}}};\
raboty[41] = {rus_name:'Drukowanie gazet', name:'print', malus:83, navyki:{tough:1,endurance:1,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:30, opyt:20, vezenie:5, boom:7, produkty:{744:40}}};\
raboty[42] = {rus_name:'Połów ryb', name:'fishing', malus:91, navyki:{swim:2,pitfall:2,leadership:1}, resultaty:{dengi:6, opyt:23, vezenie:23, boom:38, produkty:{717:15, 705:5}}};\
raboty[43] = {rus_name:'Budowa stacji kolejowej', name:'trainstation', malus:113, navyki:{build:2,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:12, opyt:47, vezenie:7, boom:15, produkty:{759:7}}};\
raboty[44] = {rus_name:'Budowa wiatraków', name:'windmeel', malus:164, navyki:{build:1,endurance:1,ride:1,leadership:1,tactic:1}, resultaty:{dengi:42, opyt:43, vezenie:6, boom:18, produkty:{756:5}}};\
raboty[45] = {rus_name:'Eksploracja kontynentu', name:'explore', malus:112, navyki:{endurance:1,shot:1,ride:1,swim:1,leadership:1}, resultaty:{dengi:1, opyt:45, vezenie:22, boom:37, produkty:{760:15}}};\
raboty[46] = {rus_name:'Spław drewna', name:'float', malus:138, navyki:{reflex:1,swim:3,tactic:1}, resultaty:{dengi:23, opyt:45, vezenie:0, boom:52, produkty:{711:30}}};\
raboty[47] = {rus_name:'Budowa mostów', name:'bridge', malus:108, navyki:{build:1,endurance:1,swim:2,repair:1}, resultaty:{dengi:17, opyt:33, vezenie:18, boom:53, produkty:{761:8}}};\
raboty[48] = {rus_name:'Łapanie koni', name:'springe', malus:135, navyki:{endurance:1,ride:2,animal:2}, resultaty:{dengi:29, opyt:45, vezenie:0, boom:42, produkty:{749:22}}};\
raboty[49] = {rus_name:'Budowa trumien', name:'coffin', malus:119, navyki:{build:1,reflex:1,repair:2,appearance:1}, resultaty:{dengi:42, opyt:8, vezenie:15, boom:20, produkty:{734:25}}};\
raboty[50] = {rus_name:'Transportowanie amunicji', name:'dynamite', malus:145, navyki:{ride:1,reflex:1,shot:1,finger_dexterity:1,appearance:1}, resultaty:{dengi:23, opyt:12, vezenie:64, boom:93, produkty:{737:5}}};\
raboty[51] = {rus_name:'Polowanie na kojoty', name:'coyote', malus:141, navyki:{endurance:2,shot:1,pitfall:1,hide:1}, resultaty:{dengi:15, opyt:43, vezenie:26, boom:45, produkty:{718:6}}};\
raboty[52] = {rus_name:'Polowanie na bizony', name:'buffalo', malus:179, navyki:{ride:1,pitfall:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:24, opyt:62, vezenie:0, boom:72, produkty:{724:14}}};\
raboty[53] = {rus_name:'Budowa posiadłości', name:'fort', malus:225, navyki:{build:1,pitfall:1,repair:1,leadership:2}, resultaty:{dengi:33, opyt:71, vezenie:17, boom:35, produkty:{762:3}}};\
raboty[54] = {rus_name:'Handlowanie z Indianami', name:'indians', malus:224, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:11, opyt:14, vezenie:63, boom:34, produkty:{719:13}}};\
raboty[55] = {rus_name:'Karczowanie lasu', name:'clearing', malus:179, navyki:{punch:2,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:62, opyt:8, vezenie:9, boom:16, produkty:{711:65}}};\
raboty[56] = {rus_name:'Silver mining', name:'silver', malus:194, navyki:{punch:1,tough:1,finger_dexterity:1,trade:2}, resultaty:{dengi:76, opyt:8, vezenie:0, boom:32, produkty:{725:17}}};\
raboty[57] = {rus_name:'Ochrona powozu pocztowego', name:'diligence_guard', malus:404, navyki:{ride:1,shot:1,repair:1,leadership:2}, resultaty:{dengi:34, opyt:77, vezenie:45, boom:43, produkty:{780:12}}};\
raboty[58] = {rus_name:'Hunting wolves', name:'wolf', malus:208, navyki:{hide:2,pitfall:2,animal:1}, resultaty:{dengi:21, opyt:63, vezenie:15, boom:67, produkty:{763:11}}};\
raboty[59] = {rus_name:'Ochrona wozu osadników', name:'track', malus:213, navyki:{hide:2,leadership:2,tactic:1}, resultaty:{dengi:10, opyt:60, vezenie:30, boom:33, produkty:{778:12}}};\
raboty[60] = {rus_name:'Stealing Horses', name:'ox', malus:238, navyki:{reflex:1,hide:1,pitfall:2,animal:1}, resultaty:{dengi:64, opyt:34, vezenie:18, boom:43, produkty:{787:13}}};\
raboty[61] = {rus_name:'Strażnik więzienia', name:'guard', malus:222, navyki:{punch:1,reflex:1,shot:1,appearance:2}, resultaty:{dengi:25, opyt:35, vezenie:38, boom:4, produkty:{750:1}}};\
raboty[62] = {rus_name:'Misjonarze', name:'bible', malus:236, navyki:{tough:1,ride:1,trade:1,appearance:2}, resultaty:{dengi:5, opyt:61, vezenie:52, boom:77, produkty:{768:1}}};\
raboty[63] = {rus_name:'Pony-Express', name:'ponyexpress', malus:226, navyki:{endurance:1,ride:2,shot:1,animal:1}, resultaty:{dengi:15, opyt:45, vezenie:51, boom:44, produkty:{779:5}}};\
raboty[64] = {rus_name:'Sprzedaż broni Indianom', name:'weapons', malus:258, navyki:{hide:1,shot:1,repair:1,trade:2}, resultaty:{dengi:15, opyt:35, vezenie:72, boom:82, produkty:{783:4}}};\
raboty[65] = {rus_name:'Plądrowanie zwłok', name:'dead', malus:266, navyki:{tough:1,hide:1,finger_dexterity:2,repair:1}, resultaty:{dengi:14, opyt:14, vezenie:90, boom:34, produkty:{774:1,723:1}}};\
raboty[66] = {rus_name:'Polowanie na Grizzly', name:'grizzly', malus:281, navyki:{hide:1,shot:1,pitfall:2,animal:1}, resultaty:{dengi:25, opyt:78, vezenie:35, boom:71, produkty:{731:3}}};\
raboty[67] = {rus_name:'Wydobycie ropy', name:'oil', malus:295, navyki:{build:1,tough:1,endurance:1,leadership:1,trade:1}, resultaty:{dengi:83, opyt:25, vezenie:20, boom:7, produkty:{752:25}}};\
raboty[68] = {rus_name:'Poszukiwanie skarbu', name:'treasure_hunting', malus:294, navyki:{hide:2,repair:2,tactic:1}, resultaty:{dengi:20, opyt:20, vezenie:83, boom:24, produkty:{726:1}}};\
raboty[69] = {rus_name:'Służba w armii', name:'army', malus:299, navyki:{endurance:1,swim:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:55, opyt:76, vezenie:17, boom:35, produkty:{727:2}}};\
raboty[70] = {rus_name:'Okradanie ludzi', name:'steal', malus:372, navyki:{reflex:1,hide:1,shot:1,pitfall:1,finger_dexterity:1}, resultaty:{dengi:48, opyt:50, vezenie:74, boom:66, produkty:{728:4}}};\
raboty[71] = {rus_name:'Pracuj jako żołdak', name:'mercenary', malus:332, navyki:{tough:1,swim:1,shot:1,repair:1,appearance:1}, resultaty:{dengi:92, opyt:52, vezenie:23, boom:65, produkty:{1708:85}}};\
raboty[72] = {rus_name:'Ściganie bandytów', name:'bandits', malus:385, navyki:{tough:1,endurance:1,hide:1,leadership:1,tactic:1}, resultaty:{dengi:28, opyt:75, vezenie:85, boom:83, produkty:{729:5}}};\
raboty[73] = {rus_name:'Ambush', name:'aggression', malus:422, navyki:{hide:2,pitfall:1,tactic:1,appearance:1}, resultaty:{dengi:78, opyt:27, vezenie:78, boom:86, produkty:{730:13,774:1}}};\
raboty[74] = {rus_name:'Ambush stagecoach', name:'diligence_aggression', malus:476, navyki:{shot:1,pitfall:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:43, opyt:73, vezenie:95, boom:67, produkty:{733:15}}};\
raboty[75] = {rus_name:'Bounty hunter', name:'bounty', malus:426, navyki:{punch:1,endurance:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:92, opyt:32, vezenie:79, boom:72, produkty:{1756:25}}};\
raboty[76] = {rus_name:'Transport więźniów', name:'captured', malus:438, navyki:{endurance:1,reflex:1,hide:1,tactic:2}, resultaty:{dengi:23, opyt:69, vezenie:85, boom:44, produkty:{764:4}}};\
raboty[77] = {rus_name:'Napad na pociąg', name:'train', malus:506, navyki:{endurance:1,hide:1,shot:1,pitfall:1,trade:1}, resultaty:{dengi:67, opyt:87, vezenie:92, boom:96, produkty:{1755:1}}};\
raboty[78] = {rus_name:'Włamanie', name:'burglary', malus:518, navyki:{endurance:1,hide:2,tactic:1,trade:1}, resultaty:{dengi:80, opyt:34, vezenie:81, boom:26, produkty:{786:12}}};\
raboty[79] = {rus_name:'Pracuj jako konował', name:'quackery', malus:316, navyki:{hide:1,shot:1,pitfall:1,trade:1,appearance:1}, resultaty:{dengi:65, opyt:50, vezenie:52, boom:67, produkty:{794:9}}};\
raboty[80] = {rus_name:'Peace negotiations', name:'peace', malus:367, navyki:{endurance:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:33, opyt:68, vezenie:76, boom:44, produkty:{751:8}}};\
raboty[82] = {rus_name:'Pilotowanie Parowców Kołowych', name:'ship', malus:348, navyki:{punch:1,swim:2,leadership:2}, resultaty:{dengi:82, opyt:35, vezenie:15, boom:14, produkty:{788:12}}};\
raboty[83] = {rus_name:'Przemyt', name:'smuggle', malus:411, navyki:{hide:1,swim:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:62, opyt:45, vezenie:83, boom:56, produkty:{729:22}}};\
raboty[84] = {rus_name:'Budowa Rancza', name:'ranch', malus:221, navyki:{build:2,endurance:1,ride:1,animal:1}, resultaty:{dengi:28, opyt:61, vezenie:17, boom:24, produkty:{784:45}}};\
raboty[85] = {rus_name:'Wydobycie żelaza', name:'iron', malus:177, navyki:{build:1,punch:1,reflex:1,finger_dexterity:1,repair:1}, resultaty:{dengi:52, opyt:32, vezenie:15, boom:29, produkty:{790:38, 753:2}}};\
raboty[86] = {rus_name:'Zbieranie Agawy', name:'agave', malus:153, navyki:{punch:1,tough:2,endurance:1,finger_dexterity:1}, resultaty:{dengi:25, opyt:42, vezenie:12, boom:27, produkty:{792:12}}};\
raboty[87] = {rus_name:'Zbieranie pomidorów', name:'tomato', malus:43, navyki:{ride:1,finger_dexterity:1,leadership:1,tactic:1,trade:1}, resultaty:{dengi:13, opyt:12, vezenie:7, boom:11, produkty:{793:33}}};\
raboty[88] = {rus_name:'Podkuwanie koni', name:'horseshoe', malus:93, navyki:{punch:1,ride:2,animal:2}, resultaty:{dengi:14, opyt:28, vezenie:9, boom:23, produkty:{754:22}}};\
raboty[90] = {rus_name:'Gaszenie pożaru', name:'fire', malus:229, navyki:{build:1,tough:1,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:15, opyt:41, vezenie:65, boom:45, produkty:{781:2}}};\
raboty[91] = {rus_name:'Zbieranie pomarańczy', name:'orange', malus:67, navyki:{endurance:1,reflex:1,pitfall:1,repair:1,tactic:1}, resultaty:{dengi:14, opyt:25, vezenie:10, boom:21, produkty:{791:25}}};\
raboty[92] = {rus_name:'Sprzątanie stajni', name:'muck_out', malus:8, navyki:{tough:1,ride:1,repair:1,animal:2}, resultaty:{dengi:4, opyt:5, vezenie:2, boom:6, produkty:{797:5}}};\
raboty[93] = {rus_name:'Czyszczenie butów', name:'shoes', malus:1, navyki:{hide:1,pitfall:1,finger_dexterity:1,trade:1,appearance:1}, resultaty:{dengi:3, opyt:2, vezenie:3, boom:2, produkty:{789:35}}};\
\
raboty[94] = {rus_name:'Darn socks', name:'socks_darn', malus:1, navyki:{tough:2,endurance:1,finger_dexterity:2}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:2, produkty:{1807:75}}};\
raboty[95] = {rus_name:'Wykopki', name:'potatoe', malus:113, navyki:{tough:2,endurance:2,finger_dexterity:1}, resultaty:{dengi:8, opyt:53, vezenie:5, boom:5, produkty:{1808:75}}};\
raboty[96] = {rus_name:'Feed the animals', name:'feed_animal', malus:147, navyki:{punch:1,tough:1,leadership:1,animal:2}, resultaty:{dengi:17, opyt:60, vezenie:10, boom:20, produkty:{1809:50}}};\
raboty[97] = {rus_name:'Zbieranie dyń', name:'pumpkin', malus:175, navyki:{punch:2,tough:1,endurance:1,tactic:1}, resultaty:{dengi:45, opyt:45, vezenie:10, boom:10, produkty:{1810:60}}};\
raboty[98] = {rus_name:'Zbieranie borówek', name:'blueberries', malus:200, navyki:{punch:1,tough:1,ride:2,finger_dexterity:1}, resultaty:{dengi:52, opyt:35, vezenie:35, boom:15, produkty:{1811:65}}};\
raboty[99] = {rus_name:'Sadzenie drzew', name:'plant_trees', malus:226, navyki:{build:2,ride:1,finger_dexterity:1,tactic:1}, resultaty:{dengi:34, opyt:25, vezenie:54, boom:25, produkty:{1812:30}}};\
raboty[100] = {rus_name:'Zbieranie orlich piór', name:'gather_feathers', malus:276, navyki:{finger_dexterity:1, repair:2,tactic:1,trade:1}, resultaty:{dengi:47, opyt:23, vezenie:60, boom:15, produkty:{1813:20}}};\
raboty[101] = {rus_name:'Zbieranie kwiatów lotosu', name:'lotus_gathering', malus:351, navyki:{tough:1,swim:2,finger_dexterity:1,repair:1}, resultaty:{dengi:54, opyt:45, vezenie:35, boom:20, produkty:{1814:15}}};\
raboty[102] = {rus_name:'Połów krabów', name:'crab_hunting', malus:376, navyki:{tough:1,reflex:1,swim:2,finger_dexterity:1}, resultaty:{dengi:67, opyt:56, vezenie:35, boom:12, produkty:{1815:10}}};\
raboty[103] = {rus_name:'Teach', name:'teaching', malus:401, navyki:{endurance:1,pitfall:1,leadership:1,appearance:2}, resultaty:{dengi:54, opyt:79, vezenie:5, boom:23, produkty:{1816:25}}};\
raboty[104] = {rus_name:'Pracuj jako szeryf', name:'sheriff_work', malus:411, navyki:{reflex:1,shot:2,leadership:1,appearance:1}, resultaty:{dengi:67, opyt:76, vezenie:56, boom:45, produkty:{1817:50}}};\
raboty[105] = {rus_name:'Wydobycie siarki', name:'sulfur_gathering', malus:421, navyki:{punch:2,reflex:2,repair:1}, resultaty:{dengi:76, opyt:34, vezenie:78, boom:32, produkty:{1818:10}}};\
raboty[106] = {rus_name:'Spław rwącą rzeką', name:'wildwater', malus:426, navyki:{reflex:2,swim:2,tactic:1}, resultaty:{dengi:84, opyt:74, vezenie:30, boom:57, produkty:{0:25}}};\
raboty[107] = {rus_name:'Hazardzista w trasie', name:'gambler', malus:431, navyki:{reflex:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:67, opyt:57, vezenie:69, boom:63, produkty:{1819:25}}};\
raboty[108] = {rus_name:'Polowanie na grzechotniki', name:'rattlesnake', malus:441, navyki:{reflex:2,hide:1,pitfall:1,animal:1}, resultaty:{dengi:72, opyt:46, vezenie:71, boom:73, produkty:{1820:15}}};\
raboty[109] = {rus_name:'Kopanie saletry', name:'salpeter_gathering', malus:451, navyki:{tough:2,endurance:1,finger_dexterity:1,repair:1}, resultaty:{dengi:62, opyt:53, vezenie:58, boom:27, produkty:{1821:35}}};\
raboty[110] = {rus_name:'Transport koni', name:'horse_transport', malus:451, navyki:{ride:2,leadership:1,animal:2}, resultaty:{dengi:66, opyt:82, vezenie:69, boom:48, produkty:{1822:10}}};\
raboty[111] = {rus_name:'Rodeo', name:'rodeo', malus:500, navyki:{endurance:1,ride:2,pitfall:1,animal:1}, resultaty:{dengi:76, opyt:56, vezenie:69, boom:78, produkty:{0:5}}};\
raboty[112] = {rus_name:'Wędrowny handlarz', name:'travelling_salesman', malus:501, navyki:{tough:1,pitfall:1,trade:2,appearance:1}, resultaty:{dengi:59, opyt:46, vezenie:97, boom:67, produkty:{0:7}}};\
raboty[113] = {rus_name:'Oszust matrymonialny', name:'con_artist', malus:520, navyki:{endurance:1,pitfall:1,tactic:1,trade:1,appearance:1}, resultaty:{dengi:78, opyt:89, vezenie:35, boom:83, produkty:{1836:2}}};\
raboty[114] = {rus_name:'Polowanie na pumy', name:'cougar', malus:541, navyki:{shot:2,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:46, opyt:89, vezenie:39, boom:93, produkty:{1824:20}}};\
raboty[115] = {rus_name:'Transport alkoholu', name:'alcohol', malus:601, navyki:{ride:1,hide:2,shot:1,leadership:1}, resultaty:{dengi:74, opyt:91, vezenie:34, boom:56, produkty:{1826:50}}};\
raboty[116] = {rus_name:'Wydobycie ołowiu', name:'lead_gathering', malus:621, navyki:{punch:1,finger_dexterity:1,repair:2,leadership:1}, resultaty:{dengi:89, opyt:72, vezenie:22, boom:72, produkty:{1827:30}}};\
raboty[117] = {rus_name:'Poszukiwanie rzadkich kamieni', name:'gem_gathering', malus:641, navyki:{punch:2,endurance:1,shot:1,repair:1}, resultaty:{dengi:91, opyt:78, vezenie:23, boom:77, produkty:{1828:20,1829:20,1830:20}}};\
raboty[118] = {rus_name:'Budowa domu misyjnego', name:'mission', malus:571, navyki:{build:2,punch:1,endurance:1,repair:1}, resultaty:{dengi:92, opyt:82, vezenie:54, boom:38, produkty:{1831:3}}};\
raboty[119] = {rus_name:'Budowa kasyna', name:'casino', malus:651, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:78, opyt:92, vezenie:23, boom:45, produkty:{1832:10}}};\
raboty[120] = {rus_name:'Pracuj jako Marshall', name:'marshall', malus:701, navyki:{ride:1,shot:2,pitfall:1,appearance:1}, resultaty:{dengi:87, opyt:90, vezenie:60, boom:94, produkty:{1833:1}}};\
raboty[121] = {rus_name:'Break up gangs', name:'shatter_gang', malus:726, navyki:{endurance:1,hide:2,pitfall:1,tactic:1}, resultaty:{dengi:84, opyt:70, vezenie:89, boom:99, produkty:{0:10}}};\
raboty[122] = {rus_name:'Napad na bank', name:'bankrobbery', malus:741, navyki:{hide:2,pitfall:1,leadership:1,trade:1}, resultaty:{dengi:93, opyt:84, vezenie:30, boom:89, produkty:{1837:1}}};\
raboty[123] = {rus_name:'Uwalnianie niewolników', name:'free_slaves', malus:751, navyki:{swim:1,shot:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:84, opyt:93, vezenie:28, boom:92, produkty:{1834:5}}};\
raboty[124] = {rus_name:'Występ z Buffalo Billem', name:'buffelo_bill', malus:801, navyki:{ride:1,shot:1,animal:1,appearance:2}, resultaty:{dengi:92, opyt:94, vezenie:65, boom:70, produkty:{1835:5}}};\
raboty[125] = {rus_name:'Zbiór indygo', name:'indigo_gathering', malus:591, navyki:{reflex:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:87, opyt:73, vezenie:29, boom:69, produkty:{1825:6}}};\
\
raboty[130] = {rus_name:'Health Points', name:'health', malus:0, navyki:{health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[131] = {rus_name:'Rozbudowa miasta/fortu', name:'build', malus:0, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[133] = {rus_name:'Atak na fort', name:'attack', malus:0, navyki:{aim:.5,dodge:.5,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[134] = {rus_name:'Atak na fort (celność)', name:'attack', malus:0, navyki:{aim:1,dodge:.001,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[135] = {rus_name:'Atak na fort (unik)', name:'attack', malus:0, navyki:{aim:.001,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[136] = {rus_name:'Obrona fortu', name:'defend', malus:0, navyki:{aim:.5,dodge:.5,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[137] = {rus_name:'Obrona fortu (celność)', name:'defend', malus:0, navyki:{aim:1,dodge:.001,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[138] = {rus_name:'Obrona fortu (unik)', name:'defend', malus:0, navyki:{aim:.001,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
\
raboty[140] = {rus_name:'\u25B7 \u25B7 \u25B7 \u25B7 \u25B7 ', name:'energy', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
raboty[141] = {rus_name:'Przemieszczanie się', name:'moving', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
/*\
raboty[151] = {rus_name:'strzelec vs strzelec z/u', name:'sh_vs_sh_at1', malus:0, navyki:{aim:0.5,dodge:1,shot:0.5,reflex:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[152] = {rus_name:'strzelec vs strzelec r/o', name:'sh_vs_sh_at2', malus:0, navyki:{aim:0.5,dodge:0.5,shot:1,reflex:1,appearance:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[153] = {rus_name:'strzelec vs siepacz z/u', name:'sh_vs_me_at1', malus:0, navyki:{aim:0.5,dodge:1,shot:0.5,tough:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[154] = {rus_name:'strzelec vs siepacz r/o', name:'sh_vs_me_at2', malus:0, navyki:{aim:0.5,dodge:0.5,shot:1,tough:1,appearance:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[155] = {rus_name:'strzelec vs dowolny z/u', name:'sh_vs_al_at1', malus:0, navyki:{aim:0.5,dodge:1,shot:0.5,reflex:0.5,tough:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[156] = {rus_name:'strzelec vs dowolny r/o', name:'sh_vs_al_at2', malus:0, navyki:{aim:0.5,dodge:0.5,shot:1,reflex:1,tough:1,appearance:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[157] = {rus_name:'strzelec obrona strzelec z/u', name:'sh_vs_sh_de1', malus:0, navyki:{aim:0.5,dodge:1,shot:0.5,reflex:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[158] = {rus_name:'strzelec obrona strzelec r/o', name:'sh_vs_sh_de2', malus:0, navyki:{aim:0.5,dodge:0.5,shot:1,reflex:1,tactic:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[159] = {rus_name:'strzelec obrona siepacz z/u', name:'sh_vs_me_de1', malus:0, navyki:{aim:0.5,dodge:1,shot:0.5,tough:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[160] = {rus_name:'strzelec obrona siepacz r/o', name:'sh_vs_me_de2', malus:0, navyki:{aim:0.5,dodge:0.5,shot:1,tough:1,tactic:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[161] = {rus_name:'strzelec obrona dowolny z/u', name:'sh_vs_al_de1', malus:0, navyki:{aim:0.5,dodge:1,shot:0.5,reflex:0.5,tough:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[162] = {rus_name:'strzelec obrona dowolny r/o', name:'sh_vs_al_de2', malus:0, navyki:{aim:0.5,dodge:0.5,shot:1,reflex:1,tough:1,tactic:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
\
strzelec vs strzelec z/u + pż\
strzelec vs strzelec r/o + pż\
strzelec vs siepacz z/u + pż\
strzelec vs siepacz r/o + pż\
strzelec vs dowolny z/u + pż\
strzelec vs dowolny r/o + pż\
strzelec obrona strzelec z/u + pż\
strzelec obrona strzelec r/o + pż\
strzelec obrona siepacz z/u + pż\
strzelec obrona siepacz r/o + pż\
strzelec obrona dowolny z/u + pż\
strzelec obrona dowolny r/o + pż\
\
siepacz vs strzelec z/u\
siepacz vs strzelec r/o\
siepacz vs siepacz z/u\
siepacz vs siepacz r/o\
siepacz vs dowolny z/u\
siepacz vs dowolny r/o\
siepacz obrona strzelec z/u\
siepacz obrona strzelec r/o\
siepacz obrona siepacz z/u\
siepacz obrona siepacz r/o\
siepacz obrona dowolny z/u\
siepacz obrona dowolny r/o\
siepacz vs strzelec z/u + pż\
siepacz vs strzelec r/o + pż\
siepacz vs siepacz z/u + pż\
siepacz vs siepacz r/o + pż\
siepacz vs dowolny z/u + pż\
siepacz vs dowolny r/o + pż\
siepacz obrona strzelec z/u + pż\
siepacz obrona strzelec r/o + pż\
siepacz obrona siepacz z/u + pż\
siepacz obrona siepacz r/o + pż\
siepacz obrona dowolny z/u + pż\
siepacz obrona dowolny r/o + pż\
*/\
raboty[151] = {rus_name:'Strzelec atakuje strzelca', name:'sh_vs_sh_at', malus:0, navyki:{aim:0.5,dodge:1,shot:1,reflex:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[152] = {rus_name:'Siepacz atakuje strzelca', name:'me_vs_sh_at', malus:0, navyki:{aim:0.5,dodge:1,punch:1,reflex:1,appearance:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[153] = {rus_name:'Strzelec ochrona przed strzelcem', name:'sh_vs_sh_de', malus:0, navyki:{aim:0.5,dodge:1,shot:1,reflex:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[154] = {rus_name:'Siepacz ochrona przed strzelcem', name:'me_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[155] = {rus_name:'Strzelec atakuje siepacza', name:'sh_vs_me_at', malus:0, navyki:{aim:0.5,dodge:1,shot:1,tough:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[156] = {rus_name:'Siepacz atakuje siepacza', name:'me_vs_me_at', malus:0, navyki:{aim:0.5,dodge:1,punch:1,tough:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[157] = {rus_name:'Strzelec ochrona przed Siepaczem', name:'sh_vs_me_de', malus:0, navyki:{aim:0.5,dodge:1,shot:1,tough:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[158] = {rus_name:'Siepacz ochrona przed siepaczem', name:'me_vs_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[159] = {rus_name:'Strzelec ochrona przed każdym', name:'sh_vs_al_de', malus:0, navyki:{aim:0.5,dodge:1,shot:1,tough:1,reflex:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[160] = {rus_name:'Siepacz ochrona przed każdym', name:'me_vs_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.75,reflex:0.75,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[161] = {rus_name:'Strzelec atakuje strzelca + PŻ', name:'sh_vs2_sh_at', malus:0, navyki:{aim:0.5,dodge:1,shot:1,reflex:1,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[162] = {rus_name:'Siepacz atakuje strzelca + PŻ', name:'me_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[163] = {rus_name:'Strzelec ochrona przed strzelcem + PŻ', name:'sh_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[164] = {rus_name:'Siepacz ochrona przed strzelcem + PŻ', name:'me_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[165] = {rus_name:'Strzelec atakuje siepacza + PŻ', name:'sh_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[166] = {rus_name:'Siepacz atakuje siepacza + PŻ', name:'me_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[167] = {rus_name:'Strzelec ochrona przed Siepaczem + PŻ', name:'sh_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[168] = {rus_name:'Siepacz ochrona przed siepaczem + PŻ', name:'me_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[169] = {rus_name:'Strzelec ochrona przed każdym + PŻ', name:'sh_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:0.75,reflex:0.75,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[170] = {rus_name:'Siepacz ochrona przed każdym + PŻ', name:'me_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.75,reflex:0.75,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
\
raboty[201] = {rus_name:'Atak na Fort bon', name:'attack', malus:0, navyki:{aim:1,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[202] = {rus_name:'Atak na Fort bon hp', name:'attack', malus:0, navyki:{aim:1,dodge:1,endurance:1,leadership:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[203] = {rus_name:'Atak na Fort celność', name:'attack', malus:0, navyki:{aim:1,dodge:0.1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[204] = {rus_name:'Atak na Fort celność hp', name:'attack', malus:0, navyki:{aim:1,dodge:0.1,endurance:1,leadership:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[205] = {rus_name:'Atak na Fort unik', name:'attack', malus:0, navyki:{aim:0.1,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[206] = {rus_name:'Atak na Fort unik hp', name:'attack', malus:0, navyki:{aim:0.1,dodge:1,endurance:1,leadership:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[207] = {rus_name:'Atak na Fort hp', name:'attack', malus:0, navyki:{aim:0.1,dodge:0.1,endurance:0.1,leadership:0.1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
\
raboty[211] = {rus_name:'Obrona fortu bon', name:'defend', malus:0, navyki:{aim:1,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[212] = {rus_name:'Obrona fortu bon hp', name:'defend', malus:0, navyki:{aim:1,dodge:1,hide:1,leadership:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[213] = {rus_name:'Obrona fortu celność', name:'defend', malus:0, navyki:{aim:1,dodge:0.1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[214] = {rus_name:'Obrona fortu celność hp', name:'defend', malus:0, navyki:{aim:1,dodge:0.1,hide:1,leadership:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[215] = {rus_name:'Obrona fortu unik', name:'defend', malus:0, navyki:{aim:0.1,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[216] = {rus_name:'Obrona fortu unik hp', name:'defend', malus:0, navyki:{aim:0.1,dodge:1,hide:1,leadership:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[217] = {rus_name:'Obrona fortu hp', name:'defend', malus:0, navyki:{aim:0.1,dodge:0.1,hide:0.1,leadership:0.1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
";

// zestawy
pk2_code += "\
komplekty={};\
\
komplekty.set_farmer=[];\
komplekty.set_farmer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2] = {bonus:{attributes:{flexibility:1, strength:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2].raboty[8]=10;komplekty.set_farmer[2].raboty[12]=10;komplekty.set_farmer[2].raboty[13]=10;\
komplekty.set_farmer[3] = {bonus:{attributes:{flexibility:1, strength:1, dexterity:1, charisma:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[3].raboty[8]=10;komplekty.set_farmer[3].raboty[12]=10;komplekty.set_farmer[3].raboty[13]=10;\
komplekty.set_farmer[3].raboty[88]=20;komplekty.set_farmer[3].raboty[30]=20;komplekty.set_farmer[3].raboty[22]=20;\
komplekty.set_farmer[4] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[4].raboty[8]=10;komplekty.set_farmer[4].raboty[12]=10;komplekty.set_farmer[4].raboty[13]=10;\
komplekty.set_farmer[4].raboty[88]=20;komplekty.set_farmer[4].raboty[30]=20;komplekty.set_farmer[4].raboty[22]=20;\
komplekty.set_farmer[4].raboty[48]=40;komplekty.set_farmer[4].raboty[84]=40;komplekty.set_farmer[4].raboty[44]=40;\
komplekty.set_farmer[5] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[5].raboty[8]=10;komplekty.set_farmer[5].raboty[12]=10;komplekty.set_farmer[5].raboty[13]=10;\
komplekty.set_farmer[5].raboty[88]=20;komplekty.set_farmer[5].raboty[30]=20;komplekty.set_farmer[5].raboty[22]=20;\
komplekty.set_farmer[5].raboty[48]=40;komplekty.set_farmer[5].raboty[84]=40;komplekty.set_farmer[5].raboty[44]=40;\
komplekty.set_farmer[5].raboty[95]=40;\
komplekty.set_farmer[6] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[6].raboty[8]=10;komplekty.set_farmer[6].raboty[12]=10;komplekty.set_farmer[6].raboty[13]=10;\
komplekty.set_farmer[6].raboty[88]=20;komplekty.set_farmer[6].raboty[30]=20;komplekty.set_farmer[6].raboty[22]=20;\
komplekty.set_farmer[6].raboty[48]=40;komplekty.set_farmer[6].raboty[84]=40;komplekty.set_farmer[6].raboty[44]=40;\
komplekty.set_farmer[6].raboty[95]=40;komplekty.set_farmer[6].raboty[96]=40;\
komplekty.set_farmer[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_indian=[];\
komplekty.set_indian[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[2] = {bonus:{attributes:{flexibility:2}, skills:{hide:8}}, speed:0.8696, raboty:[]};\
komplekty.set_indian[2].raboty[51]=30;\
komplekty.set_indian[3] = {bonus:{attributes:{flexibility:5}, skills:{hide:8, swim:8}}, speed:0.7692, raboty:[]};\
komplekty.set_indian[3].raboty[51]=30;komplekty.set_indian[3].raboty[52]=40;\
komplekty.set_indian[4] = {bonus:{attributes:{flexibility:8}, skills:{hide:8, swim:8, pitfall:8}}, speed:0.6944, raboty:[]};\
komplekty.set_indian[4].raboty[51]=30;komplekty.set_indian[4].raboty[52]=40;komplekty.set_indian[4].raboty[58]=50;\
komplekty.set_indian[5] = {bonus:{attributes:{flexibility:12}, skills:{hide:8, swim:8, pitfall:8, animal:8}}, speed:0.625, raboty:[]};\
komplekty.set_indian[5].raboty[51]=30;komplekty.set_indian[5].raboty[52]=40;komplekty.set_indian[5].raboty[58]=50;komplekty.set_indian[5].raboty[66]=60;\
komplekty.set_indian[6] = {bonus:{attributes:{flexibility:16}, skills:{hide:8, swim:8, pitfall:8, animal:8, shot:8}}, speed:0.571, raboty:[]};\
komplekty.set_indian[6].raboty[51]=30;komplekty.set_indian[6].raboty[52]=40;komplekty.set_indian[6].raboty[58]=50;komplekty.set_indian[6].raboty[66]=60;komplekty.set_indian[6].raboty[114]=70;\
komplekty.set_indian[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_mexican=[];\
komplekty.set_mexican[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_mexican[2] = {bonus:{attributes:{strength:1}, skills:{}}, speed:0.8929, raboty:[]};\
komplekty.set_mexican[3] = {bonus:{attributes:{strength:2}, skills:{}}, speed:0.8065, raboty:[]};\
komplekty.set_mexican[3].raboty[86]=60;\
komplekty.set_mexican[4] = {bonus:{attributes:{strength:4}, skills:{}}, speed:0.7353, raboty:[]};\
komplekty.set_mexican[4].raboty[86]=60;komplekty.set_mexican[4].raboty[67]=70;\
komplekty.set_mexican[5] = {bonus:{attributes:{strength:6}, skills:{}}, speed:0.6757, raboty:[]};\
komplekty.set_mexican[5].raboty[86]=60;komplekty.set_mexican[5].raboty[67]=70;komplekty.set_mexican[5].raboty[83]=80;\
komplekty.set_mexican[6] = {bonus:{attributes:{strength:9}, skills:{}}, speed:0.625, raboty:[]};\
komplekty.set_mexican[6].raboty[86]=60;komplekty.set_mexican[6].raboty[67]=70;komplekty.set_mexican[6].raboty[83]=80;komplekty.set_mexican[6].raboty[50]=90;\
komplekty.set_mexican[7] = {bonus:{attributes:{strength:12}, skills:{}}, speed:0.625, raboty:[]};\
komplekty.set_mexican[7].raboty[86]=60;komplekty.set_mexican[7].raboty[67]=70;komplekty.set_mexican[7].raboty[83]=80;komplekty.set_mexican[7].raboty[50]=90;komplekty.set_mexican[7].raboty[115]=100;\
komplekty.set_mexican[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_quackery=[];\
komplekty.set_quackery[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_quackery[2] = {bonus:{attributes:{dexterity:1}, skills:{endurance:5, trade:5}}, speed:null, raboty:[]};\
komplekty.set_quackery[2].raboty[79]=30;\
komplekty.set_quackery[3] = {bonus:{attributes:{dexterity:2}, skills:{endurance:10, trade:10}}, speed:null, raboty:[]};\
komplekty.set_quackery[3].raboty[79]=60;\
komplekty.set_quackery[4] = {bonus:{attributes:{dexterity:4}, skills:{endurance:15, trade:15}}, speed:null, raboty:[]};\
komplekty.set_quackery[4].raboty[79]=90;\
komplekty.set_quackery[5] = {bonus:{attributes:{dexterity:6}, skills:{endurance:20, trade:20}}, speed:null, raboty:[]};\
komplekty.set_quackery[5].raboty[79]=120;\
komplekty.set_quackery[6] = {bonus:{attributes:{dexterity:9}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18}}, speed:null, raboty:[]};\
komplekty.set_quackery[6].raboty[79]=120;\
komplekty.set_quackery[7] = {bonus:{attributes:{dexterity:12}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18, tactic:18, dodge:18, appearance:18}}, speed:null, raboty:[]};\
komplekty.set_quackery[7].raboty[79]=120;komplekty.set_quackery[7].raboty[113]=50;\
komplekty.set_quackery[8] = {bonus:{attributes:{dexterity:16}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18, tactic:18, dodge:18, appearance:18}}, speed:0.666, raboty:[]};\
komplekty.set_quackery[8].raboty[79]=120;komplekty.set_quackery[8].raboty[113]=100;\
\
komplekty.set_pilgrim_male=[];\
komplekty.set_pilgrim_male[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2].raboty[131]=5;\
komplekty.set_pilgrim_male[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[3].raboty[131]=15;\
komplekty.set_pilgrim_male[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[4].raboty[131]=30;\
komplekty.set_pilgrim_male[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[5].raboty[131]=50;komplekty.set_pilgrim_male[5].raboty[62]=150;\
komplekty.set_pilgrim_male[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_pilgrim_female=[];\
komplekty.set_pilgrim_female[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2].raboty[131]=5;\
komplekty.set_pilgrim_female[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[3].raboty[131]=15;\
komplekty.set_pilgrim_female[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[4].raboty[131]=30;\
komplekty.set_pilgrim_female[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[5].raboty[131]=50;komplekty.set_pilgrim_female[5].raboty[62]=150;\
komplekty.set_pilgrim_female[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_gentleman=[];\
komplekty.set_gentleman[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[2] = {bonus:{attributes:{charisma:1}, skills:{appearance:8}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_gentleman[2].raboty[i]=5};komplekty.set_gentleman[2].raboty[131]=5;\
komplekty.set_gentleman[3] = {bonus:{attributes:{charisma:3}, skills:{appearance:8, leadership:8}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_gentleman[3].raboty[i]=15};komplekty.set_gentleman[3].raboty[131]=15;\
komplekty.set_gentleman[4] = {bonus:{attributes:{charisma:6}, skills:{appearance:8, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_gentleman[4].raboty[i]=30};komplekty.set_gentleman[4].raboty[131]=30;\
komplekty.set_gentleman[5] = {bonus:{attributes:{charisma:10}, skills:{appearance:16, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_gentleman[5].raboty[i]=50};komplekty.set_gentleman[5].raboty[131]=50;\
komplekty.set_gentleman[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_dancer=[];\
komplekty.set_dancer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[2] = {bonus:{attributes:{charisma:2}, skills:{appearance:10}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_dancer[2].raboty[i]=5};komplekty.set_dancer[2].raboty[131]=5;\
komplekty.set_dancer[3] = {bonus:{attributes:{charisma:5}, skills:{appearance:10, animal:10}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_dancer[3].raboty[i]=15};komplekty.set_dancer[3].raboty[131]=15;\
komplekty.set_dancer[4] = {bonus:{attributes:{charisma:9}, skills:{appearance:10, animal:10, finger_dexterity:12}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_dancer[4].raboty[i]=30};komplekty.set_dancer[4].raboty[131]=30;\
komplekty.set_dancer[5] = {bonus:{attributes:{charisma:11},skills:{endurance :6, appearance:16, animal:10, finger_dexterity:12}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_dancer[5].raboty[i]=50};komplekty.set_dancer[5].raboty[131]=50;\
komplekty.set_dancer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.fireworker_set=[];\
komplekty.fireworker_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[1].raboty[90]=15;\
komplekty.fireworker_set[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.gold_set=[];\
komplekty.gold_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[2] = {bonus:{attributes:{}, skills:{health:8}}, speed:0.8333, raboty:[]};\
for (i=1;i<126;++i) {komplekty.gold_set[2].raboty[i]=25};komplekty.gold_set[2].raboty[131]=25;\
komplekty.gold_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.greenhorn_set=[];\
komplekty.greenhorn_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[2].raboty[6]=10;\
komplekty.greenhorn_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[3].raboty[6]=10;komplekty.greenhorn_set[3].raboty[27]=20;\
komplekty.greenhorn_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[4].raboty[6]=10;komplekty.greenhorn_set[4].raboty[27]=20;komplekty.greenhorn_set[4].raboty[17]=20;\
komplekty.greenhorn_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[5].raboty[6]=10;komplekty.greenhorn_set[5].raboty[27]=20;komplekty.greenhorn_set[5].raboty[17]=20;komplekty.greenhorn_set[5].raboty[20]=20;\
komplekty.greenhorn_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[6].raboty[6]=10;komplekty.greenhorn_set[6].raboty[27]=20;komplekty.greenhorn_set[6].raboty[17]=20;komplekty.greenhorn_set[6].raboty[20]=20;komplekty.greenhorn_set[6].raboty[22]=20;\
komplekty.greenhorn_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[7].raboty[6]=10;komplekty.greenhorn_set[7].raboty[27]=20;komplekty.greenhorn_set[7].raboty[17]=20;komplekty.greenhorn_set[7].raboty[20]=20;komplekty.greenhorn_set[7].raboty[22]=20;\
for (i=1;i<126;++i) {komplekty.greenhorn_set[7].raboty[i]=5};komplekty.greenhorn_set[7].raboty[130]=5;\
komplekty.greenhorn_set[8] = {bonus:{attributes:{strength:1, charisma:1}, skills:{}}, speed:0.8333, raboty:[]};\
komplekty.greenhorn_set[8].raboty[6]=10;komplekty.greenhorn_set[8].raboty[27]=20;komplekty.greenhorn_set[8].raboty[17]=20;komplekty.greenhorn_set[8].raboty[20]=20;komplekty.greenhorn_set[8].raboty[22]=20;\
for (i=1;i<126;++i) {komplekty.greenhorn_set[8].raboty[i]=15};komplekty.greenhorn_set[8].raboty[130]=15;\
";

// umiejętności
pk2_code += "\
pk2_vse_navyki=['build' ,'punch' ,'tough' ,'endurance' ,'health' ,'ride' ,'reflex' ,'dodge' ,'hide' ,'swim' ,'aim' ,'shot' ,'pitfall' ,'finger_dexterity' ,'repair' ,'leadership' ,'tactic' ,'trade' ,'animal' ,'appearance'];\
pk2_vse_kharakteristiki=['strength', 'flexibility', 'dexterity', 'charisma'];\
";

// ================== funkcje ==================

aWindow.assign_citem = function (tid, obj){
	aWindow.items[tid] = {item_id:tid, nshort:obj.short, name:obj.name, type:obj.type, level:obj.level, price:obj.price, image:obj.image, image_mini:obj.image_mini, characterClass:obj.characterClass, characterSex:obj.characterSex, speed:obj.speed, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};
    for (zz = aWindow.pk2_vse_navyki.length-1;zz >=0;--zz){
        ss = aWindow.pk2_vse_navyki[zz];
	    if (obj.bonus.skills[ss])
	        aWindow.items[tid].bonus.skills[ss]=obj.bonus.skills[ss];
	}
    for (zz = aWindow.pk2_vse_kharakteristiki.length-1;zz >=0;--zz){
        aa = aWindow.pk2_vse_kharakteristiki[zz];
        if (obj.bonus.attributes[aa])
	        aWindow.items[tid].bonus.attributes[aa]=obj.bonus.attributes[aa];
	}
	if (obj.set){
	    aWindow.items[tid].set.key = obj.set.key;
	    aWindow.items[tid].set.name = obj.set.name;
	}
}

aWindow.compare_citem = function (tid, item){
	soft = true;
	hard = true;
	if (aWindow.items[tid].item_id!=item.item_id) return;
	if (aWindow.items[tid].nshort!=item.short){hard=false;aWindow.items[tid].nshort=item.short};
	if (aWindow.items[tid].name!=item.name){soft=false;aWindow.items[tid].name=item.name};
	if (aWindow.items[tid].type!=item.type){hard=false;aWindow.items[tid].type=item.type}
	if (aWindow.items[tid].level!=item.level){hard=false;aWindow.items[tid].level=item.level}
	if (aWindow.items[tid].price!=item.price){hard=false;aWindow.items[tid].price=item.price}
	if (aWindow.items[tid].image!=item.image){hard=false;aWindow.items[tid].image=item.image}
	if (aWindow.items[tid].image_mini!=item.image_mini){hard=false;aWindow.items[tid].image_mini=item.image_mini}
	if (aWindow.items[tid].characterClass!=item.characterClass){hard=false;aWindow.items[tid].characterClass=item.characterClass}
	if (aWindow.items[tid].characterSex!=item.characterSex){hard=false;aWindow.items[tid].characterSex=item.characterSex}
	if (aWindow.items[tid].speed!=item.speed){hard=false;aWindow.items[tid].speed=item.speed}
    
    for (zz = aWindow.pk2_vse_navyki.length-1;zz >=0;--zz){
        num_index = aWindow.pk2_vse_navyki[zz];
        if (item.bonus.skills[num_index]&&aWindow.items[tid].bonus.skills[num_index]){
            if (item.bonus.skills[num_index]!=aWindow.items[tid].bonus.skills[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.skills[num_index]||aWindow.items[tid].bonus.skills[num_index]){
            hard=false;
            break;
        }
    }    
    for (zz = aWindow.pk2_vse_kharakteristiki.length-1;zz >=0;--zz){
        num_index = aWindow.pk2_vse_kharakteristiki[zz];
        if (item.bonus.attributes[num_index]&&aWindow.items[tid].bonus.attributes[num_index]){
            if (item.bonus.attributes[num_index]!=aWindow.items[tid].bonus.attributes[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.attributes[num_index]||aWindow.items[tid].bonus.attributes[num_index]){
            hard=false;
            break;
        }
    }    
    
	if (!item.set){
	    if (aWindow.items[tid].set.key){ hard=false;}
	}
	else{
	    if (item.set.key!=aWindow.items[tid].set.key){
	        hard=false;
	    }
	    if (item.set.name!=aWindow.items[tid].set.name){
	        soft=false;
	    }
	}
	res={h:hard,s:soft};
	return res;
}

aWindow.print_citem = function (tid){
	result='';
	result += 'items[' + aWindow.items[tid].item_id + '] = {item_id:' + aWindow.items[tid].item_id + ', nshort:\'' + aWindow.items[tid].nshort;
	result += '\', name:\'' + aWindow.items[tid].name + '\', type:\'' + aWindow.items[tid].type + '\', level:' + aWindow.items[tid].level;
	result += ', price:' + aWindow.items[tid].price + ', image:\'' + aWindow.items[tid].image + '\', image_mini:\'' + aWindow.items[tid].image_mini + '\', characterClass:';
	cc = aWindow.items[tid].characterClass ? '\'' + aWindow.items[tid].characterClass + '\'' : null;
	result += cc + ', characterSex:';
	cs = aWindow.items[tid].characterSex ? '\'' + aWindow.items[tid].characterSex + '\'' : null;
	result += cs + ', speed:' + aWindow.items[tid].speed;
	if (aWindow.items[tid].bonus) {
		result += ', bonus:{skills:';
		ww = false;
		for (zz = aWindow.pk2_vse_navyki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.skills[aWindow.pk2_vse_navyki[zz]]) {
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.pk2_vse_navyki[zz] + ':' + aWindow.items[tid].bonus.skills[aWindow.pk2_vse_navyki[zz]];
			}
		}
		if (ww){
   			result += '}, '
		}
		else {
			result += '{}, ';
		}
		result += 'attributes:';
		ww = false;
		for (zz = aWindow.pk2_vse_kharakteristiki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.attributes[aWindow.pk2_vse_kharakteristiki[zz]]){
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.pk2_vse_kharakteristiki[zz] + ':' + aWindow.items[tid].bonus.attributes[aWindow.pk2_vse_kharakteristiki[zz]];
			}
		}
		if (ww){
		    result += '}'
		}
		else {
			result += '{}';
		}
		result += '}, ';
	}
	else {
		result += '{skills:{}, attributes:{}}, '
	}
	if (aWindow.items[tid].set.key) {
		result += 'set:{key:\'' + aWindow.items[tid].set.key + '\', name:\'' + aWindow.items[tid].set.name + '\'}'
	}
	else {
		result += 'set:{key:null, name:null}'
	}
	result += ', shop:\''+aWindow.items[tid].shop+'\'};';
	return result;
}

pk2_code += "\
komp_rab = {};\
komp_zas = {};\
komp_skor = {};\
komp_fort = {};\
for (i=0;i < nabory.length;++i){\
	komp_rab[nabory[i]] = [];\
	komp_zas[nabory[i]] = [];\
	komp_skor[nabory[i]]= [];\
	komp_fort[nabory[i]]= [];\
};\
\
vyborka={};\
vyborka_z={};\
vyborka_r={};\
prosto_veschi=[];\
prosto_veschi_max=8;\
for (ii = pk2_types.length; ii >= 0; --ii) {\
	vyborka[pk2_types[ii]] = {};\
	vyborka[pk2_types[ii]].simple = {};\
	vyborka[pk2_types[ii]].simple.spisok = [];\
	vyborka_z[pk2_types[ii]] = {};\
	vyborka_z[pk2_types[ii]].simple = {};\
	vyborka_z[pk2_types[ii]].simple.spisok = [];\
	vyborka_r[pk2_types[ii]] = {};\
	vyborka_r[pk2_types[ii]].simple = {};\
	vyborka_r[pk2_types[ii]].simple.spisok = [];\
	prosto_veschi[pk2_types[ii]]={};\
};\
\
resultaty=[];\
resultaty_z=[];\
resultaty_r=[];\
zaschita=null;\
ezda = false;\
rabnavyki=[];\
rabnavyki_z=[];\
rabnavyki_r=[];\
\
pk2_htmlrab=[];\
pk2_sortrab=[];\
pk2_hiderab=[];\
pk2_bezto=0;\
\
pk2_predmetov = {};\
pk2_khochuka = [];\
pk2_uchet=[];\
pk2_aktiv=[];\
porabotaj=[];\
pk2_slots={};\
for (i=0;i<pk2_types.length;++i){\
	pk2_slots[pk2_types[i]]=true;\
};\
irabota=0;\
samoe_ono={};\
deneg_ushlo = 0;\
bablo = 0;\
\
i_slot_max=[];\
i_slot=[];\
\
ic_obj = [];\
ic_objr = [];\
ic_objr = [];\
ii_rekur=0;\
rekurs_delay = 100;\
rekurs_step = 0;\
rekurs_time = 25000;\
rekurs_up = true;\
pk2_to=0;\
pk2_zas=0;\
pk2_ride=0; \
pers={};\
pk2_speed=1.0;\
ezda=false;\
pk2_onesk_rabot = false;\
chislo_rabot = 0;\
chislo_rabot_to = 0;\
khoroshi = [];\
khoroshi_to = [];\
";



aWindow.pk2_iimport = function(){
	bagazh=aWindow.Bag.getInstance();
	odezhda=aWindow.Wear.wear;
	for(vv in bagazh.items){
	aWindow.pk2_inv_imported=true;
		cobj = bagazh.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.pk2_uchet[tid]){
			aWindow.pk2_uchet[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Błędne dane o przedmiocie: wersja skryptu:'+PrzVer+'\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\\\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Brak tłumaczenia: wersja skryptu:'+PrzVer+'\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\\\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Zaślepka', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Brak przedmiotu: wersja skryptu:'+PrzVer+'\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\\\n';
			}
		}
	}
	for(vv in aWindow.Wear.wear){
		if (!aWindow.Wear.wear[vv])
			continue;
		cobj = aWindow.Wear.wear[vv].obj;
		tid = cobj.item_id;
		aWindow.pk2_equipment[vv]=tid;
		if (!aWindow.pk2_uchet[tid]){
			aWindow.pk2_uchet[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Błędne dane o przedmiocie: wersja skryptu:'+PrzVer+'\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\\\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Brak tłumaczenia: wersja skryptu:'+PrzVer+'\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\\\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Nakrycie głowy', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Brak tłumaczenia: wersja skryptu:'+PrzVer+'\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\\\n';
			}
		}
	}
}

aWindow.pk2_mimport = function(){
	magaz=aWindow.TraderInventory.getInstance('pk2',0);
	if (!magaz) return;
	for(vv in magaz.items){
		cobj = magaz.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.pk2_khochuka[tid]){
		    if (!aWindow.pk2_uchet[tid]){
		        aWindow.pk2_khochuka[tid]=true;
		    }
	    	if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				/*
				if (!cres.h)	{
					aWindow.einfo+='Часть данных о предмете неверна:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				
				else*/ if(!cres.s){
					aWindow.winfo+='Nieprawidłowa nazwa przedmiotu: wersja skryptu:'+PrzVer+'\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\\\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Zaślepka', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Błędna nazwa przedmiotu: wersja skryptu:'+PrzVer+'\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\\\n';
			}
		}
    }
}


aWindow.pk2_podschet = function  (vse_veschi, iz_magazinov, plus_level, pers){
	aWindow.pk2_aktiv=null;
	aWindow.pk2_aktiv=[];
	for (vv in aWindow.items){
		if (isNaN(vv)) continue;
		vesch=aWindow.items[vv];
		check=true;
		if (vesch.characterSex&&(vesch.characterSex!=pers.characterSex)) check=false;
		if (vesch.characterClass&&(vesch.characterClass!=pers.characterClass)) check=false;
		if (!aWindow.pk2_uchet[vesch.item_id]&&!aWindow.pk2_khochuka[vesch.item_id])
		{
			if (!vse_veschi){
				if (!iz_magazinov)
					check=false;
				else{
					if(vesch.shop!='shop')
						check=false;
				}
			}
			if ((vesch.shop=='shop')&&(vesch.price > aWindow.bablo)) check=false;
		}

	 if ((vesch.level != null)&&(vesch.level>(pers.level+plus_level))) check=false; // błąd przy liczeniu lvl

		lit = pers.level+ plus_level+parseInt(pers.itemLevelRequirementDecrease[vesch.type],10)+pers.itemLevelRequirementDecrease.all;
		if (vesch.level > lit) check=false;
		if (aWindow.pk2_slots && aWindow.pk2_slots[vesch.type]&&!(aWindow.pk2_equipment[vesch.type]==vv)) check=false;
		if (check) aWindow.pk2_aktiv.push(vesch.item_id);
	}
}

aWindow.pk2_ocenka_khlama = function(){
    aWindow.pk2_nenuzhnoe=[];
    if (!aWindow.pk2_khlam)
        return;
    ispolz=[];
    for (irab=200; irab>0;irab--){
        if (aWindow.raboty[irab]){
            if (aWindow.resultaty[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_z[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty_z[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_r[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty_r[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
        }
    }
//    
    for (tid in aWindow.pk2_uchet){
        if ((tid < 600)&&(tid >=200)&&(!ispolz[tid])){
            aWindow.pk2_nenuzhnoe[tid]=true;
        }
    }
// sprawdzenie czy id jest nizsze od
// =====
    for (tid in aWindow.pk2_uchet){
        if ((tid < 12700)&&(tid >=10000)&&(!ispolz[tid])){
            aWindow.pk2_nenuzhnoe[tid]=true;
        }
    }
// =====
}

aWindow.pk2_sortir = function (tip, minto){
    ind_arr = 0;
    aWindow.pk2_sortrab = [];
    for (irab in aWindow.pk2_htmlrab){
        if (aWindow.pk2_vse_raboty&&(aWindow.resultaty[irab].to <= -minto))
            continue;
        aWindow.pk2_sortrab[ind_arr] = {};
        aWindow.pk2_sortrab[ind_arr].index = irab;
        switch (tip){
        case 'd0': // zarobek
            aWindow.pk2_sortrab[ind_arr].ves = -aWindow.raboty[irab].resultaty.dengi;
            break;
        case 'o0': // doświadczenie
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'v0': // szczęście
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'boom': // niebezpieczeństwo
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.boom;
            break;
        case 'name': // nazwa
            aWindow.pk2_sortrab[ind_arr].ves= (irab > 130) ? 'я ' : '';
            aWindow.pk2_sortrab[ind_arr].ves += aWindow.raboty[irab].rus_name;
            break;
        case 'malus': // trudność
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].malus;
            break;
        case 'to': // punkty pracy
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.resultaty[irab].to;
            break;
        case 'do': // zarobek + doświadczenie
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dt':
		dt = aWindow.resultaty[irab].to;
		if (dt){
			tmp = (1-.5/dt) * (1+dt/256);
			aWindow.pk2_sortrab[ind_arr].ves = 0 - aWindow.raboty[irab].resultaty.dengi*tmp;
		}
		else
			aWindow.pk2_sortrab[ind_arr].ves = 0;
		for (cid in aWindow.raboty[irab].resultaty.produkty){
			pr = aWindow.raboty[irab].resultaty.produkty[cid];
			aWindow.pk2_sortrab[ind_arr].ves -= aWindow.items[cid].price * pr * 0.005;
		}
            break;
        case 'dv': // zarobek + szczęscie
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'ov': // szczęście + doświadczenie
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dov': // zarobek + szczęście + doświadczenie
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt - aWindow.raboty[irab].resultaty.vezenie;
            break;
        default:
            aWindow.pk2_sortrab[ind_arr].ves = irab;
        }
        ++ind_arr;
    }
    aWindow.qsort(aWindow.pk2_sortrab,0,ind_arr);
    aWindow.pk2_reporter2();
}

//aWindow.pk2_setbezto = function(checked){
    //aWindow.pk2_bezto = !checked;
//}

aWindow.pk2_vesch_polezna = function(value){
    for (kh in aWindow.pk2_khochuka)
        aWindow.pk2_khochuka[kh] = false;
    if (value > 0)
        aWindow.pk2_khochuka[value] = true;
    aWindow.pk2_hideraboty(value);
}

aWindow.pk2_vreporter = function () {
    aWindow.pk2_show_window();
    vrvr = '<table>';
    for (count_rab in aWindow.porabotaj){
        if (!aWindow.prosto_veschi[count_rab])
            continue;
        vrvr += '<tr>';
        rabota = aWindow.raboty[count_rab];
        vrvr += '<td rowspan=\"2\">';
        vrvr += '<table><tbody><tr><th>'+rabota.rus_name+'</th></tr>';
        if ((count_rab > 150)&&(count_rab <= 170)){
            vrvr += '<tr><td><a href=\"javascript:pk2_show_shmot('+ count_rab +');\" >';
            vrvr += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
        }
        else if ((count_rab > 132)&&(count_rab <= 150)){
            
        }
        else{
            vrvr += '<tr><td><a href=\"javascript:pk2_show_shmot2('+ count_rab +');\" >';
            vrvr += '<img style=\"float:left;\" src=\"';
            if (count_rab<=131){
                vrvr += 'images/jobs/';
            }
            vrvr +=rabota.name+'.png\" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        };

        rres = rabota.resultaty;
        for (ri in rres.produkty){
            vrvr+='<div style=\"display:inline; float:left; margin: 8px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
            vrvr+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
            vrvr+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_pk2\">'+rres.produkty[ri]+'%</div>';
            vrvr+='</div>';
        }
        vrvr += '</td></tr>';
        vrvr += '<tr><td>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/dollar.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.dengi*3/2)+'px;"></div><div class="bar_perc">'+rres.dengi+'%</div></div>';
        vrvr += '<span>Zarobek:'+rres.dengi+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/experience.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.opyt*3/2)+'px;"></div><div class="bar_perc">'+rres.opyt+'%</div></div>';
        vrvr += '<span>Szczęscie:'+rres.opyt+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/luck.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*3/2)+'px;"></div><div class="bar_perc">'+rres.vezenie+'%</div></div>';
        vrvr += '<span>Doświadczenie:'+rres.vezenie+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/danger.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_brown" style="width: '+Math.round(rres.boom*3/2)+'px;"></div><div class="bar_perc">'+rres.boom+'%</div></div>';
        vrvr += '<span>Niebezpieczeństwo:'+rres.boom+'</span></td></tr></table></a>';
        vrvr += '</td></tr></tbody></table>';

        vrvr += '</td><td>';

        if (count_rab!=141){
            vrvr += '<span title=\"Punkty umiejętności\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value" style="text-align:center;">';
		    vrvr += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
            vrvr += '<span title=\"Punkty z zestawów\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
		    vrvr += '<span title=\"Trudność\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
    		vrvr += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
	    	vrvr += '<span title=\"Punkty pracy\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    vrvr += '<span class="skill_box_value" style="text-align:center; color:';
    		vrvr += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
	    	vrvr += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
	    }
        vrvr += '</td><td>';

        brbr = 0;
        vrvr += '<table><tbody><tr>';
        for (jj in aWindow.rabnavyki[count_rab]){
            for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                if (++brbr==8) {vrvr+='</tr><tr>'; brbr=1};
                vrvr += '<td><a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                vrvr += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                vrvr += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                vrvr += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                vrvr += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                vrvr += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                vrvr += '</a></td>';
            }
        }
        vrvr += '</tr></tbody></table>';
        vrvr += '</td></tr><tr><td colspan=\"2\"><table>';
        
        for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
            ctype = aWindow.pk2_types[ee];
            vrvr += '<tr><td>';
            for (vv = aWindow.prosto_veschi[count_rab][ctype].length-1; vv >= 0;  --vv){
                sid = aWindow.prosto_veschi[count_rab][ctype][vv].tid;
                vrvr+='<div style=\"display:inline; float:left;\">';
                vesch = aWindow.items[sid];
                vrvr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.prosto_veschi[count_rab][ctype][vv].bon;
                if (vesch.set.key){
                    vrvr += '<br /><em>'+vesch.set.name+'</em>';
                }
                for (ind in vesch.bonus.attributes){
                    vrvr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                }
                for (ind in vesch.bonus.skills){
                    vrvr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                }
                vrvr += '</span>'
                vrvr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                vrvr+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.prosto_veschi[count_rab][ctype][vv].bon+'</p></div></div>'
                vrvr+='</a>'
                if (aWindow.prosto_veschi[count_rab][ctype][vv].price > 0){
                    vrvr+='<br />';
                    vrvr +='<span style=\"text-align:center;\">'+aWindow.prosto_veschi[count_rab][ctype][vv].price+'&nbsp;$</span>';
                }
                vrvr +='</div>';
            }
            vrvr += '</td></tr>'
        }
        vrvr += '</table></td></tr>';
        
    }
    vrvr += '</table>';
    document.getElementById('pk2_window_content').innerHTML=vrvr;
}

aWindow.pk2_reporter = function () {
//    new aWindow.HumanMessage('Rozpoczynam pobieranie danych ...', {type: 'success'});
    grgr='';
    aWindow.pk2_ocenka_khlama();
    count_rab=0;
    aWindow.pk2_show_window();
    aWindow.pk2_res2html();
    
    if (aWindow.pk2_khochuka.length > 0){
        aWindow.chislo_rabot = 0;
        aWindow.chislo_rabot_to = 0;
        aWindow.khoroshi = [];
        aWindow.khoroshi_to = [];
        for (kh in aWindow.pk2_khochuka){
            aWindow.khoroshi[kh] = 0;
            aWindow.khoroshi_to[kh] = 0;
            aWindow.pk2_khochuka[kh]=false;
        }
        aWindow.pk2_khochuka[kh]=true; // last item;
        for (rr in aWindow.porabotaj){
            if(aWindow.resultaty[rr]){
                ++aWindow.chislo_rabot;
                if (aWindow.resultaty[rr].to > 0) ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            if (aWindow.resultaty[rr].to > 0) aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(aWindow.resultaty_z[rr]){
                ++aWindow.chislo_rabot;
                ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty_z[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(aWindow.resultaty_r[rr]){
                ++aWindow.chislo_rabot;
                ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty_r[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
        }
    }
    aWindow.pk2_process=false;
    aWindow.pk2_sortir('name', aWindow.pk2_bezto);
}


pk2_code += "\
pk2_s2a =\
{build:'strength', punch:'strength', tough:'strength', endurance:'strength', health:'strength',\
ride:'flexibility', reflex:'flexibility', dodge:'flexibility', hide:'flexibility', swim:'flexibility',\
aim:'dexterity', shot:'dexterity', pitfall:'dexterity', finger_dexterity:'dexterity', repair:'dexterity',\
leadership:'charisma', tactic:'charisma', trade:'charisma', animal:'charisma', appearance:'charisma'};\
";

pk2_code += "\
pk2_s2px =\
{build:0, punch:220, tough:165, endurance:110, health:55,\
ride:0, reflex:220, dodge:165, hide:110, swim:55,\
aim:0, shot:220, pitfall:165, finger_dexterity:110, repair:55,\
leadership:0, tactic:220, trade:165, animal:110, appearance:55};\
";

pk2_code += "\
pk2_s2f_bonus2 = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1;\
    if (value < 10) return 2;\
    if (value < 23) return 3;\
    if (value < 43) return 4;\
    if (value < 71) return 5;\
    if (value < 108) return 6;\
    if (value < 155) return 7;\
    if (value < 211) return 8;\
    return 9;\
};\
";

pk2_code += "\
pk2_s2f_bonus = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1+(value-1)/2;\
    if (value < 10) return 2+(value-3)/7;\
    if (value < 23) return 3+(value-10)/13;\
    if (value < 43) return 4+(value-23)/20;\
    if (value < 71) return 5+(value-43)/28;\
    if (value < 108) return 6+(value-71)/37;\
    if (value < 155) return 7+(value-108)/47;\
    if (value < 211) return 8+(value-155)/56;\
    return 9;\
};\
";


aWindow.pk2_hideraboty = function(tid){
    aWindow.pk2_hiderab=[];
    vtype = aWindow.items[tid].type;
    kk = 0;
    for (; vtype != aWindow.pk2_types[kk]; ++kk) {};
    for (irab in aWindow.porabotaj){
        nea = true;
        if (aWindow.resultaty[irab]&&(aWindow.resultaty[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (aWindow.resultaty_z[irab]&&(aWindow.resultaty_z[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (aWindow.resultaty_r[irab]&&(aWindow.resultaty_r[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (nea){
            aWindow.pk2_hiderab[irab]=true;
        }
    }
    aWindow.pk2_reporter2();
}


aWindow.pk2_s_print = function(nav, val){
    /*
    kha = aWindow.pk2_s2a[nav];
    result = '<div style=\"background-color:'
    if (kha == 'strength') {result += '#c33; '}
    else if (kha == 'flexibility') {result += '#7e7; '}
    else if (kha == 'dexterity') {result += '#78e; '}
    else if (kha == 'charisma') {result += '#ea3; '}
    else {result += 'white; '}
    result+='\" >'+aWindow.pers.skill_titles[nav]+':'+val+'</div>';
    */
    result='<div>'+aWindow.pers.skill_titles[nav]+':'+val+'</div>';
    return result;
}
aWindow.pk2_a_print = function(kha, val){
/*
    result = '<div style=\"font-weight:bold; background-color:'
    if (kha == 'strength') {result += '#f44; '}
    else if (kha == 'flexibility') {result += '#7e7; '}
    else if (kha == 'dexterity') {result += '#78e; '}
    else if (kha == 'charisma') {result += '#ea3; '}
    else {result += 'white; '}
*/
    result = '<div style=\"font-weight:bold;\" >'+aWindow.pers.attribute_titles[kha]+':'+val+'</div>';
    return result;
}

pk2_code += "\
qsort = function (ar, li, ri){\
	if ((li+1)>=ri) return;\
	var tmp;\
	if (ri-li<10){\
		for (ii=li;ii<ri-1;++ii)\
			for (jj=ii+1;jj<ri;++jj)\
				if(ar[ii].ves>ar[jj].ves){\
					tmp=ar[ii];\
					ar[ii]=ar[jj];\
					ar[jj]=tmp;\
				}\
	}\
	else{\
		mi=parseInt((li+ri)/2,10);\
		if (ar[li].ves>ar[ri-1].ves){\
			tmp=ar[li];\
			ar[li]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		if (ar[li].ves>ar[mi].ves){\
			tmp=ar[li];\
			ar[li]=ar[mi];\
			ar[mi]=tmp;\
		}\
		if (ar[mi].ves>ar[ri-1].ves){\
			tmp=ar[mi];\
			ar[mi]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		em=ar[mi].ves;\
		cl=li;\
		cr=ri-1;\
		while(cl<cr){\
			while((cl<ri)&&(ar[cl].ves<=em)) ++cl;\
			while((cr>li)&&(ar[cr].ves>=em)) --cr;\
			if (cl<cr){\
				tmp=ar[cl];\
				ar[cl]=ar[cr];\
				ar[cr]=tmp;\
			}\
		}\
		if (cr < ri -1)\
		    qsort(ar,li,cr+1);\
		qsort(ar,cl,ri);\
	}\
};\
";


pk2_code += "\
summa_ochkov = function (bonus, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(bonus.skills[num_index]){\
			och+=bonus.skills[num_index]*nuzhnye_navyki[num_index];\
		}\
		if(bonus.attributes[pk2_s2a[num_index]]){\
			och+=bonus.attributes[pk2_s2a[num_index]]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

pk2_code += "\
summa_ochkov2 = function (skills, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(skills[num_index]){\
			och+=skills[num_index]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

pk2_code += "\
summa_ochkov3 = function (bonus, ind_navyk){\
	och=0;\
	if(bonus.skills[ind_navyk]){\
		och+=bonus.skills[ind_navyk];\
	}\
	if(bonus.attributes[pk2_s2a[ind_navyk]]){\
		och+=bonus.attributes[pk2_s2a[ind_navyk]];\
	}\
	return och;\
};\
";


pk2_code += "\
pk2_vybvesch = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		prosto_veschi[irabota]={};\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			prosto_veschi[irabota][pk2_types[ii]]=[];\
		}\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (pk2_uchet[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
    		if (ochki > 0){\
				mv = -1;\
    			for (kk = 0; kk < prosto_veschi[irabota][ctype].length; ++kk) {\
    			    if ((prosto_veschi[irabota][ctype][kk].bon < ochki)||((prosto_veschi[irabota][ctype][kk].bon === ochki)&&(prosto_veschi[irabota][ctype][kk].price > tsena))){\
    			        mv = kk;\
    			    }\
    			    else{\
    			        break;\
    			    }\
    			}\
    			if (prosto_veschi[irabota][ctype].length < prosto_veschi_max){\
    			    for (kk = prosto_veschi[irabota][ctype].length-1; kk > mv; --kk){\
    			        prosto_veschi[irabota][ctype][kk+1]={bon:prosto_veschi[irabota][ctype][kk].bon, price:prosto_veschi[irabota][ctype][kk].price, tid:prosto_veschi[irabota][ctype][kk].tid}\
    			    }\
    			    prosto_veschi[irabota][ctype][mv+1]={bon:ochki, price:tsena, tid:cid};\
    			}\
    			else{\
    			    for (kk = 0; kk < mv; ++kk){\
    			        prosto_veschi[irabota][ctype][kk]={bon:prosto_veschi[irabota][ctype][kk+1].bon, price:prosto_veschi[irabota][ctype][kk+1].price, tid:prosto_veschi[irabota][ctype][kk+1].tid}\
    			    }\
    			    prosto_veschi[irabota][ctype][mv]={bon:ochki, price:tsena, tid:cid};\
    			}\
			}\
		}\
		resultaty[irabota] = {};\
		resultaty[irabota].to = summa_ochkov2(pers.skills, rabota.navyki)-raboty[irabota].malus;\
		resultaty[irabota].ton = 0;\
		raboty[irabota].resultaty.to = resultaty[irabota].to;\
        rabnavyki[irabota]={};\
        for (num_index in raboty[irabota].navyki){\
            temp_n = {};\
            temp_n[num_index]=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            rabnavyki[irabota][num_index]={};\
            rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
            rabnavyki[irabota][num_index].znach = val;\
            rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index] ? raboty[irabota].navyki[num_index] : 0;\
        }\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
	pk2_vreporter();\
};\
";




pk2_code += "\
pk2_vybzap_f = function () {\
	for (irabota in porabotaj) {\
		if ((irabota <= 132)||(irabota > 140))\
		    continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka[pk2_types[ii]].simple.n = 1;\
			vyborka[pk2_types[ii]].simple.spisok[0] = {price:0, tid:0, navyki:{}, health:0};\
			for (oo in rabota.navyki){\
			    vyborka[pk2_types[ii]].simple.spisok[0].navyki[oo] = 0;\
			}\
		}\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = 0;\
			cnavyki = {};\
			for (oo in rabota.navyki){\
			    cnavyki[oo] = summa_ochkov3(vesch.bonus, oo);\
			    ochki += cnavyki[oo];\
			}\
			chealth = summa_ochkov3(vesch.bonus, 'health');\
			ochki += chealth;\
			tsena = (pk2_uchet[cid]|| pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={navyki:{}, price:tsena, tid:cid, health:chealth};\
    			for (oo in rabota.navyki){\
	    		    vyborka[ctype][vesch.set.key].navyki[oo] = cnavyki[oo];\
			    }\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	for (oo in rabota.navyki){\
    			    	if (vyborka[ctype].simple.spisok[kk].navyki[oo] < cnavyki[oo]) {ib++}\
	    			    else {if (vyborka[ctype].simple.spisok[kk].navyki[oo] > cnavyki[oo]) {im++}};\
			    	}\
			    	if (vyborka[ctype].simple.spisok[kk].health < chealth) {ib++}\
    			    else {if (vyborka[ctype].simple.spisok[kk].health > chealth) {im++}};\
    			    \
				    if (!pk2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].health = chealth;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka[ctype].simple.spisok[nn].navyki={};\
		    		for (oo in rabota.navyki){\
		    		    vyborka[ctype].simple.spisok[nn].navyki[oo] = cnavyki[oo];\
		    		}\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].health = vyborka[ctype].simple.spisok[kk+1].health;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
				            	vyborka[ctype].simple.spisok[kk].navyki={};\
            		    		for (oo in rabota.navyki){\
		                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = vyborka[ctype].simple.spisok[kk+1].navyki[oo];\
		                		}\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].health = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
           		    		for (oo in rabota.navyki){\
	                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = null;\
	                		}\
	    		    	    vyborka[ctype].simple.spisok[kk].navyki = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[pk2_types[ii]][nabory[jj]]){\
					dvazhdy = -1;\
					sid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[pk2_types[ii]].simple.n;\
						vyborka[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka[pk2_types[ii]].simple.spisok[nn].health = vyborka[pk2_types[ii]][nabory[jj]].health;\
						vyborka[pk2_types[ii]].simple.spisok[nn].price = vyborka[pk2_types[ii]][nabory[jj]].price;\
						vyborka[pk2_types[ii]].simple.spisok[nn].tid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
						vyborka[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[pk2_types[ii]].simple.spisok[nn].navyki = {};\
       		    		for (oo in rabota.navyki){\
                		    vyborka[pk2_types[ii]].simple.spisok[nn].navyki[oo] = vyborka[pk2_types[ii]][nabory[jj]].navyki[oo];\
                 		}\
						vyborka[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[pk2_types[ii]].simple.n;\
        }\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii)\
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_tonavyki = {};\
		for (oo in rabota.navyki){\
			pk2_tonavyki[oo] = pers.skills[oo];\
		}\
		pk2_tohealth = pers.skills.health;\
		samoe_ono.to = 0;\
		samoe_ono.price=-1;\
		samoe_ono.health = 0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				komp_fort[nabory[ii]][jj] = {};\
				komp_fort[nabory[ii]][jj].navyki={};\
				for (oo in rabota.navyki){\
				    komp_fort[nabory[ii]][jj].navyki[oo] = summa_ochkov3(t_nab.bonus, oo);\
				}\
				komp_fort[nabory[ii]][jj].health = summa_ochkov3(t_nab.bonus, 'health');\
			}\
		}\
		rekurs_time-=500;\
		ii_rekur=0;\
		window.setTimeout(pk2_rekurs_f, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false)\
			porabotaj[irabota] = true;\
	}\
    pk2_reporter();\
};\
";



pk2_code += "\
pk2_rekurs_f = function (){\
    if (rekurs_time>15000) rekurs_time=10000;\
    nn = pk2_types.length;\
    rabota=raboty[irabota];\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 20000;\
            ++rekurs_step;\
           	new HumanMessage('Trwa pobieranie ekwipunku, poz '+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_f, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            pk2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                pk2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[pk2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			pk2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
 		    pk2_tohealth += ic_obj[ii].health;\
       		for (oo in rabota.navyki){\
	            pk2_tonavyki[oo] += ic_obj[ii].navyki[oo];\
	        }\
		    if (++ii == nn){\
    			ton = {};\
    			ton.navyki={};\
    			ton.health=0;\
    			for (oo in rabota.navyki){\
    			    ton.navyki[oo]=0;\
    			}\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton.health += komp_fort[nabory[inabor]][pk2_predmetov[nabory[inabor]]].health;\
			    		for (oo in rabota.navyki){\
			    		    ton.navyki[oo] += komp_fort[nabory[inabor]][pk2_predmetov[nabory[inabor]]].navyki[oo];\
			    		}\
				    }\
    			\
    			pk2_tohealth += ton.health;\
    			for (oo in rabota.navyki){\
    			    pk2_tonavyki[oo] += ton.navyki[oo]\
    			}\
    			cto = 0;\
    			for (oo in rabota.navyki){\
    			    cto += pk2_s2f_bonus(pk2_tonavyki[oo])*rabota.navyki[oo];\
    			}\
			if (pk2_tohealth >= pk2_zdorov)\
	    		if ((samoe_ono.to < cto)||((samoe_ono.to == cto)&&(samoe_ono.health<pk2_tohealth))) {\
		    		samoe_ono.to = cto;\
				    samoe_ono.price=deneg_ushlo;\
				    samoe_ono.health = pk2_tohealth;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			\
    			pk2_tohealth -= ton.health;\
    			for (oo in rabota.navyki){\
    			    pk2_tonavyki[oo] -= ton.navyki[oo]\
    			}\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            pk2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                pk2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
		resultaty[irabota] = {};\
		samoe_ono.to=Math.round(samoe_ono.to*10)/10;\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = 0;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
		for (i = 0; i < pk2_types.length; ++i) {\
		if (samoe_ono.price >= 0) {\
			vvv = vyborka[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
		}else{vvv = 0};\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
            rabnavyki[irabota]={};\
		resultaty[irabota].to=0;\
		resultaty[irabota].ton=0;\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
		vvv = pk2_s2f_bonus(val);\
		if (num_index!='aim') {resultaty[irabota].ton+=vvv};\
		if (num_index!='dodge') {resultaty[irabota].to+=vvv};\
            }\
		resultaty[irabota].ton = Math.round(resultaty[irabota].ton*10)/10;\
		resultaty[irabota].to = Math.round(resultaty[irabota].to*10+resultaty[irabota].ton*10)/10;\
            temp_n = {};\
            temp_n.health=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            temp_u = {};\
            for (ee = pk2_types.length-1;ee>=0;--ee){\
                sid = resultaty[irabota].items[ee].tid;\
                if (sid > 0){\
                    val+=summa_ochkov(items[sid].bonus,temp_n);\
                    temp_k = items[sid].set.key;\
                    if (temp_k){\
                        if (temp_u[temp_k])\
                            temp_u[temp_k]+=1;\
                        else\
                            temp_u[temp_k]=1;\
                    }\
                }\
            } \
            for (uu = nabory.length - 1; uu>=0; --uu){\
                if (temp_u[nabory[uu]]>1){\
                    bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                    val+=summa_ochkov(bn,temp_n);\
                }\
            }\
            rabnavyki[irabota].health={};\
            rabnavyki[irabota].health.name=pers.skill_titles.health;\
            rabnavyki[irabota].health.znach = val;\
            rabnavyki[irabota].health.mul = 1;\
    pk2_vybzap_f();\
};\
";


pk2_code += "\
pk2_vybzap = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka[pk2_types[ii]].simple.n = 1;\
			vyborka[pk2_types[ii]].simple.spisok[0] = {bon:0, price:0, tid:0};\
		}\
		\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={bon:ochki, price:tsena, tid:cid};\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka[ctype].simple.spisok[kk].bon > ochki) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if ((im==0)&&(ib==0)){\
						v2=items[vyborka[ctype].simple.spisok[kk].tid];\
						def2=summa_ochkov(v2.bonus, all_def.navyki);\
						def1=summa_ochkov(vesch.bonus, all_def.navyki);\
						if (def1>def2) ++ib;\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].bon = vyborka[ctype].simple.spisok[kk+1].bon;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].bon = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[pk2_types[ii]].simple.n;\
						vyborka[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka[pk2_types[ii]].simple.spisok[nn].bon = vyborka[pk2_types[ii]][nabory[jj]].bon;\
						vyborka[pk2_types[ii]].simple.spisok[nn].price = vyborka[pk2_types[ii]][nabory[jj]].price;\
						vyborka[pk2_types[ii]].simple.spisok[nn].tid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
						vyborka[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		psk = summa_ochkov2(pers.skills, rabota.navyki);\
		if (isNaN(psk)) psk=0;\
		pk2_to= psk - rabota.malus;\
		samoe_ono.to= pk2_to;\
		samoe_ono.ton=0;\
		samoe_ono.price=-1;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_z();\
};\
";


pk2_code += "\
pk2_vybzap_z = function () {\
	for (irabota in porabotaj) {\
	    if (!zaschita)  continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		if (!resultaty[irabota]){\
		    resultaty_z[irabota]=null;\
		    continue;\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_z[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_z[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_z[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka_z[pk2_types[ii]].simple.n = 1;\
			vyborka_z[pk2_types[ii]].simple.spisok[0] = {bon:0, zas:0, price:0, tid:0};\
		}\
		if (resultaty[irabota].to >= zaschita.to){\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			zas = summa_ochkov(vesch.bonus, zaschita.navyki);\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_z[ctype][vesch.set.key]={bon:ochki, zas:zas, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(zas > 0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_z[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_z[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_z[ctype].simple.spisok[kk].zas < zas) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].zas > zas) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka_z[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_z[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_z[ctype].simple.n;\
					vyborka_z[ctype].simple.spisok[nn] = {};\
    				vyborka_z[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_z[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_z[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_z[ctype].simple.spisok[nn].zas = zas;\
					vyborka_z[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_z[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_z[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_z[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_z[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_z[ctype].simple.spisok[kk].bon = vyborka_z[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_z[ctype].simple.spisok[kk].price = vyborka_z[ctype].simple.spisok[kk+1].price;\
				            	vyborka_z[ctype].simple.spisok[kk].tid = vyborka_z[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_z[ctype].simple.spisok[kk].zas = vyborka_z[ctype].simple.spisok[kk+1].zas;\
	        			    }\
			        		kk = vyborka_z[ctype].simple.n - 1;\
        					vyborka_z[ctype].simple.spisok[kk].bon = null;\
                			vyborka_z[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].zas = null;\
	        		    	vyborka_z[ctype].simple.spisok[kk] = null;\
			        	    vyborka_z[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_z[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_z[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_z[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_z[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_z[pk2_types[ii]].simple.n;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].bon = vyborka_z[pk2_types[ii]][nabory[jj]].bon;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].price = vyborka_z[pk2_types[ii]][nabory[jj]].price;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].tid = vyborka_z[pk2_types[ii]][nabory[jj]].tid;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].zas = vyborka_z[pk2_types[ii]][nabory[jj]].zas;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_z[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_z[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus - zaschita.to;\
		pk2_zas=0;\
		samoe_ono.to= pk2_to;\
		samoe_ono.price=-1;\
		samoe_ono.zas=pk2_zas;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				zan = summa_ochkov(t_nab.bonus, zaschita.navyki);\
				komp_zas[nabory[ii]][jj] = zan;\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_z[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs_z, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_r();\
};\
";

pk2_code += "\
pk2_vybzap_r = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		if (((irabota>132)||(!ezda))&&(irabota!=141))\
		    continue;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota!=141)&&(!resultaty[irabota])){\
		    resultaty_r[irabota]=null;\
		    continue;\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_r[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_r[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_r[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka_r[pk2_types[ii]].simple.n = 1;\
			vyborka_r[pk2_types[ii]].simple.spisok[0] = {bon:0, ride:0, speed:1.0, price:0, tid:0};\
		}\
		if ((irabota==141)||(resultaty[irabota].to > 0)){\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			ride = summa_ochkov3(vesch.bonus, 'ride');\
			speed = (vesch.speed)?vesch.speed:1.0;\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_r[ctype][vesch.set.key]={bon:ochki, ride:ride, speed:speed, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(ride > 0)||(speed<1.0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_r[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_r[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_r[ctype].simple.spisok[kk].ride < ride) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].ride > ride) {im++}}\
			        if (vyborka_r[ctype].simple.spisok[kk].speed > speed) {ib++}\
			        else {if (vyborka_r[ctype].simple.spisok[kk].speed < speed) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka_r[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_r[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_r[ctype].simple.n;\
					vyborka_r[ctype].simple.spisok[nn] = {};\
    				vyborka_r[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_r[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_r[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_r[ctype].simple.spisok[nn].ride = ride;\
		    		vyborka_r[ctype].simple.spisok[nn].speed = speed;\
					vyborka_r[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_r[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_r[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_r[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_r[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_r[ctype].simple.spisok[kk].bon = vyborka_r[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_r[ctype].simple.spisok[kk].price = vyborka_r[ctype].simple.spisok[kk+1].price;\
				            	vyborka_r[ctype].simple.spisok[kk].tid = vyborka_r[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_r[ctype].simple.spisok[kk].ride = vyborka_r[ctype].simple.spisok[kk+1].ride;\
				            	vyborka_r[ctype].simple.spisok[kk].speed = vyborka_r[ctype].simple.spisok[kk+1].speed;\
	        			    }\
			        		kk = vyborka_r[ctype].simple.n - 1;\
        					vyborka_r[ctype].simple.spisok[kk].bon = null;\
                			vyborka_r[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].ride = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].speed = null;\
	        		    	vyborka_r[ctype].simple.spisok[kk] = null;\
			        	    vyborka_r[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_r[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_r[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_r[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_r[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_r[pk2_types[ii]].simple.n;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].bon = vyborka_r[pk2_types[ii]][nabory[jj]].bon;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].price = vyborka_r[pk2_types[ii]][nabory[jj]].price;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].tid = vyborka_r[pk2_types[ii]][nabory[jj]].tid;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].ride = vyborka_r[pk2_types[ii]][nabory[jj]].ride;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].speed = vyborka_r[pk2_types[ii]][nabory[jj]].speed;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_r[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_r[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus;\
		pk2_ride=0;\
		pk2_speed=1.0;\
		samoe_ono.to= pk2_to;\
		samoe_ono.price=-1;\
		samoe_ono.ride=pk2_ride;\
		samoe_ono.speed=100.0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				komp_skor[nabory[ii]][jj] = {};\
				komp_skor[nabory[ii]][jj].ride = summa_ochkov3(t_nab.bonus, 'ride');\
				komp_skor[nabory[ii]][jj].speed = t_nab.speed?t_nab.speed:1.0;\
				\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_r[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs_r, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_f();\
};\
";



pk2_code += "\
pk2_rekurs = function (){\
    nn = pk2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Trwa pobieranie ekwipunku, poz '+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
                pk2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[pk2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			pk2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_obj[ii].bon;\
		    if (++ii == nn){\
    			ton = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]]\
				    }\
    			pk2_to += ton;\
	    		if (samoe_ono.to < pk2_to) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = ton;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
                pk2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
		resultaty[irabota] = {};\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = samoe_ono.ton;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
	if (samoe_ono.price >= 0) {\
		for (i = 0; i < pk2_types.length; ++i) {\
			vvv = vyborka[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = vvv.bon;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
	}\
	else{\
		for (i = 0; i < pk2_types.length; ++i) {\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = 0;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = 0;\
		}\
	}\
            rabnavyki[irabota]={};\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
            }\
    pk2_vybzap();\
};\
";


pk2_code += "\
pk2_rekurs_z = function (){\
    nn = pk2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Trwa pobieranie ekwipunku, poz '+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_z, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_z[pk2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			pk2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_objr[ii].bon;\
		    pk2_zas += ic_objr[ii].zas;\
		    if (++ii == nn){\
    			ton = 0;\
    			zan = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
			    		zan += komp_zas[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
				    }\
    			pk2_to += ton;\
    			pk2_zas += zan;\
	    		if ((samoe_ono.zas < pk2_zas)&&(pk2_to >= 0)) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = ton;\
                    samoe_ono.zas = pk2_zas;\
                    samoe_ono.zan = zan;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    pk2_zas -= zan;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
		resultaty_z[irabota] = {};\
		resultaty_z[irabota].to = samoe_ono.to+zaschita.to;\
		resultaty_z[irabota].ton = samoe_ono.ton;\
		resultaty_z[irabota].price = samoe_ono.price;\
		resultaty_z[irabota].zas = samoe_ono.zas;\
		resultaty_z[irabota].zan = samoe_ono.zan;\
		resultaty_z[irabota].items = [];\
		for (i = 0; i < pk2_types.length; ++i) {\
			vvv = vyborka_z[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			resultaty_z[irabota].items[i] = {};\
			resultaty_z[irabota].items[i].tid = vvv.tid;\
			resultaty_z[irabota].items[i].bon = vvv.bon;\
			resultaty_z[irabota].items[i].price = vvv.price;\
			resultaty_z[irabota].items[i].zas = vvv.zas;\
		}\
            rabnavyki_z[irabota]={};\
            for (num_index in zaschita.navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty_z[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki_z[irabota][num_index]={};\
                rabnavyki_z[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki_z[irabota][num_index].znach = val;\
                rabnavyki_z[irabota][num_index].mul = zaschita.navyki[num_index];\
            }\
	}\
	else{\
		resultaty_z[irabota] = null;\
	}\
    pk2_vybzap_z();\
};\
";

pk2_code += "\
pk2_rekurs_r = function (){\
    nn = pk2_types.length;\
    rr = 8;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Trwa pobieranie ekwipunku, poz '+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_r, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_r[pk2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			pk2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_objr[ii].bon;\
		    pk2_ride += ic_objr[ii].ride;\
		    if (++ii == nn){\
    			ton = 0;\
    			rin = 0;\
    			speen = 1.0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
			    		rin += komp_skor[nabory[inabor]][pk2_predmetov[nabory[inabor]]].ride;\
			    		speen *= komp_skor[nabory[inabor]][pk2_predmetov[nabory[inabor]]].speed;\
				    }\
    			pk2_to += ton;\
    			pk2_ride += rin;\
    			pk2_speed = 100;\
    			if (ic_objr[rr].speed < 1.0){\
    			    pk2_speed = 100.0 / ic_objr[rr].speed + pk2_ride;\
    			}\
    			pk2_speed /= speen;\
    			pk2_speed /= pers.default_speed;\
	    		if ((samoe_ono.speed < pk2_speed)&&(pk2_to > 0)) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = speen;\
                    samoe_ono.ride = pk2_ride;\
                    samoe_ono.speed = pk2_speed;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    pk2_ride -= rin;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
        if (irabota==141){\
    		resultaty[irabota] = {};\
	    	resultaty[irabota].to = Math.round(samoe_ono.speed);\
		    resultaty[irabota].ton = (1.0/samoe_ono.ton).toFixed(2);\
		    resultaty[irabota].price = samoe_ono.price;\
		    resultaty[irabota].items = [];\
    		for (i = 0; i < pk2_types.length; ++i) {\
	    		vvv = vyborka_r[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
		    	resultaty[irabota].items[i] = {};\
			    resultaty[irabota].items[i].tid = vvv.tid;\
    			resultaty[irabota].items[i].bon = vvv.ride;\
	    		resultaty[irabota].items[i].price = vvv.price;\
		    }\
            rabnavyki[irabota]={};\
            rabnavyki[irabota].ride={};\
            rabnavyki[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki[irabota].ride.mul = 1.0;\
            resultaty_r[irabota] = null;\
            rabnavyki_r[irabota] = null;\
        }\
        else{\
		    resultaty_r[irabota] = {};\
		    resultaty_r[irabota].to = samoe_ono.to;\
		    resultaty_r[irabota].ton = samoe_ono.ton;\
		    resultaty_r[irabota].price = samoe_ono.price;\
		    resultaty_r[irabota].ride = samoe_ono.ride;\
		    resultaty_r[irabota].speed = samoe_ono.speed;\
		    resultaty_r[irabota].items = [];\
		    for (i = 0; i < pk2_types.length; ++i) {\
			    vvv = vyborka_r[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			    resultaty_r[irabota].items[i] = {};\
			    resultaty_r[irabota].items[i].tid = vvv.tid;\
			    resultaty_r[irabota].items[i].bon = vvv.bon;\
			    resultaty_r[irabota].items[i].price = vvv.price;\
			    resultaty_r[irabota].items[i].ride = vvv.ride;\
			    resultaty_r[irabota].items[i].speed = vvv.speed;\
		    }\
            rabnavyki_r[irabota]={};\
            rabnavyki_r[irabota].ride={};\
            rabnavyki_r[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki_r[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki_r[irabota].ride.mul = 1.0;\
		}\
	}\
	else{\
		resultaty_r[irabota] = null;\
	}\
    pk2_vybzap_r();\
};\
";
	
pk2_code +="\
pk2_auto_odev = function(va, rab){\
	pk2_odev_type=0;\
	pk2_odev_var=va;\
	pk2_odev_count=0;\
	pk2_odev_rab=rab;\
	pk2_odev_stat=true;\
	zz = document.getElementById('current_task_box_text');\
	zz.innerHTML='Ubieram się';\
	pk2_odev_window();\
};\
\
pk2_odev_add = function(va, irab){\
	if (va==='n')\
		{rrab = resultaty[irab];index=raboty[irab].rus_name;\
		new HumanMessage('zestaw: '+index+' został dopisany!', {type: 'success'});}\
	else if (va==='z')\
		{rrab = resultaty_z[irab];index=raboty[irab].rus_name+'_(obrona)';\
		new HumanMessage('zestaw: '+index+'_(obrona) został dopisany!', {type: 'success'});}\
	else if (va==='r')\
		{rrab = resultaty_r[irab];index=raboty[irab].rus_name+'_(ruch)';\
		new HumanMessage('zestaw: '+index+'_(ruch) został dopisany!', {type: 'success'});}\
	if (!rrab||!rrab.items) return false;\
	for (ee = 0; ee < pk2_types.length; ++ee){\
		if (rrab.items[ee]&&rrab.items[ee].tid){\
			if (!pk2_odev_list[index]) pk2_odev_list[index]={};\
			pk2_odev_list[index][pk2_types[ee]] = rrab.items[ee].tid;\
		}\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_remove = function(va, irab){\
	if (va==='n')\
		{index=raboty[irab].rus_name;}\
	else if (va==='z')\
		{index=raboty[irab].rus_name+'_(obrona)'}\
	else if (va==='r')\
		{index=raboty[irab].rus_name+'_(ruch)'}\
	if (pk2_odev_list[index]){\
		delete pk2_odev_list[index];\
		new HumanMessage('zestaw: '+index+' został usunięty!', {type: 'success'});\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_save_list = function(){\
	tempo = 'pk2_odev_list={';\
	for (ii in pk2_odev_list){\
		tempo+='\"'+ii+'\":';\
		tids = pk2_odev_list[ii];\
		tmp = '{';\
		for (ee = 0; ee < pk2_types.length; ++ee){\
			if (tids[pk2_types[ee]]){\
				tmp+=pk2_types[ee]+':'+tids[pk2_types[ee]]+', ';\
			}\
		}\
		tmp += '}';\
		tmp = tmp.replace(', }','}');\
		tempo+=tmp+', ';\
	};\
	tempo+='}';\
	tempo = tempo.replace(', }','}');\
	pk2_setValue(pk2_pre+'odev_list',tempo);\
};\
\
pk2_odev_spam_option = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	if (!equip_select) return;\
	equip_select.innerHTML='<option value=\"0\">Zapisane zestawy</option>';\
	arra={};\
	jj=0;\
	for (ii in pk2_odev_list) {arra[jj++]={ves:ii};}\
	qsort(arra,0,jj);\
	for (i=0;i<jj;++i){\
		ii=arra[i].ves;\
		t_op = document.createElement('option');\
		t_op.textContent = ii;\
		t_op.setAttribute('value',ii);\
		equip_select.appendChild(t_op);\
	}\
};\
\
pk2_odev_spam_go = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	irab=777;\
	resultaty[irab]={};\
	resultaty[irab].items={};\
	for (ee=0;ee<pk2_types.length;++ee){\
		resultaty[irab].items[ee] = {};\
		if (pk2_odev_list[name][pk2_types[ee]]){\
			resultaty[irab].items[ee].tid = pk2_odev_list[name][pk2_types[ee]];\
		}\
	}\
	pk2_auto_odev('n',irab);\
};\
\
pk2_odev_spam_rewrite = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	spam_value = document.getElementById('pk2_spam_new');\
	name2 = spam_value.value;\
	if (pk2_odev_list[name]){\
		pk2_odev_list[name2]=pk2_odev_list[name];\
		delete pk2_odev_list[name];\
		pk2_odev_save_list();\
		pk2_odev_spam_option();\
	}\
};\
\
pk2_odev_spam_del = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	if (pk2_odev_list[name]){\
		delete pk2_odev_list[name];\
		alert('zestaw: '+name+' został usunięty!');\
		pk2_odev_save_list();\
		pk2_odev_spam_option();\
	}\
};\
\
pk2_odev_spam_save = function(){\
	spam_value = document.getElementById('pk2_spam_new');\
	name = spam_value.value;\
	if (pk2_odev_list[name]){\
		gu_gu = confirm('Nadpisać zestaw: '+name+' ?');\
		if (!gu_gu) return;\
	}\
	if (!Wear||!Wear.wear) return;\
	pk2_odev_list[name]={};\
	for (ee=0;ee<pk2_types.length;++ee){\
		if (Wear.wear[pk2_types[ee]]){\
			pk2_odev_list[name][pk2_types[ee]] = Wear.wear[pk2_types[ee]].obj.item_id;\
		}\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_spam = function(){\
	if (!pk2_odevalo4ka) return;\
	wear_div = document.getElementById('window_inventory_content');\
	if (!wear_div) {setTimeout(pk2_odev_spam,2000);return}\
 ww=wear_div.getElementById('char_head');\
 if (!ww) {setTimeout(pk2_odev_spam,2000);return}\
 if (document.getElementById('pk2_wear_spam')) {setTimeout(pk2_odev_spam,5000);return};\
        qwe=document.getElementById('window_inventory_title');\
	qwe.innerHTML=qwe.innerHTML.replace('Przechowalnia','');\
 var wear_spam = document.createElement('div');\
 wear_spam.setAttribute('id', 'pk2_wear_spam');\
 wear_spam.setAttribute('style', 'position: absolute; top: 1px; left: 5px; padding: 3px; margin: 0px;font-size:75%;');\
 var wear_spam2 = document.createElement('div');\
 wear_spam2.setAttribute('id', 'pk2_wear_spam2');\
 wear_spam2.setAttribute('style', 'position: absolute; top: 1px; left: 140px; padding: 3px; margin: 0px;font-size:75%;');\
 wear_div.parentNode.insertBefore(wear_spam,wear_div);\
 wear_div.parentNode.insertBefore(wear_spam2,wear_div);\
	var store_set_link = document.createElement('a');\
	store_set_link.setAttribute('href', '#');\
	store_set_link.setAttribute('title', 'Dopisz aktualny zestaw do listy');\
	store_set_link.setAttribute('onclick', 'pk2_odev_spam_save(); return false;');\
 store_set_link.setAttribute('style', 'color: white');\
	store_set_link.textContent = 'Nowy';\
	wear_spam.appendChild(store_set_link);\
	var store_set_value = document.createElement('input');\
	store_set_value.setAttribute('id','pk2_spam_new');\
	store_set_value.setAttribute('type','text');\
	store_set_value.setAttribute('size','20');\
	store_set_value.setAttribute('value','Nazwa nowego zestawu...');\
	store_set_value.setAttribute('class','pk2_sel');\
	store_set_value.setAttribute('style','-moz-user-select: text; margin: 0px 3px;font-size:100%;');\
	store_set_value.setAttribute('onClick','this.value=\"\"');\
	store_set_value.setAttribute('onblur','this.value=!this.value?\"Nazwa nowego zestawu...\":this.value;');\
	wear_spam.appendChild(store_set_value);\
	var br_br = document.createElement('br');\
	var store_rewrite_link = document.createElement('a');\
	store_rewrite_link.setAttribute('href', '#');\
	store_rewrite_link.setAttribute('title', 'Zmiana nazwy zestawu');\
	store_rewrite_link.setAttribute('onclick', 'pk2_odev_spam_rewrite(); return false;');\
 store_rewrite_link.setAttribute('style', 'color: white; margin: 0px 3px');\
	store_rewrite_link.textContent = 'Zmień nazwe.';\
	wear_spam2.appendChild(store_rewrite_link);\
	var delete_link = document.createElement('a');\
	delete_link.setAttribute('href', '#');\
	delete_link.setAttribute('title', 'Usunięcie zestawu');\
	delete_link.setAttribute('style', 'margin-right: 7px');\
	delete_link.setAttribute('onclick', 'confirm (\"Usunąć zestaw?\")?pk2_odev_spam_del():void(0); return false;');\
 delete_link.setAttribute('style', 'color: white');\
	delete_link.textContent = 'Usuń';\
	wear_spam2.appendChild(delete_link);\
	var equip_select = document.createElement('select');\
	equip_select.setAttribute('id', 'pk2_spam_select');\
	equip_select.setAttribute('class','pk2_sel');\
	equip_select.setAttribute('style', 'width: 130px; max-width: 135px; margin: 0px 5px 0px 220px;font-size:100%;');\
	wear_spam2.appendChild(equip_select);\
	pk2_odev_spam_option();\
	var equip_link = document.createElement('a');\
	equip_link.setAttribute('href', '#');\
	equip_link.setAttribute('id', 'equip_link');\
	equip_link.setAttribute('onclick', 'pk2_odev_spam_go(); return false;');\
	equip_link.setAttribute('title', 'Spowoduje ubranie się w wybrany zestaw');\
 equip_link.setAttribute('style', 'color: white');\
	equip_link.textContent = 'Ubierz się';\
	wear_spam2.appendChild(equip_link);\
	setTimeout(pk2_odev_spam,5000);\
};\
\
\
pk2_odev_window = function(){\
	if (!AjaxWindow.windows['inventory']){\
		if (pk2_odev_count++===0){\
			AjaxWindow.show('inventory');\
			setTimeout(pk2_odev_window, pk2_odev_time);\
			return;\
		}\
		else{\
			if(pk2_odev_count<pk2_odev_rep*5){\
				setTimeout(pk2_odev_window, pk2_odev_time);\
				return;\
			}\
		}\
	}\
	else{\
		if (!AjaxWindow.windows['inventory'].isReady){\
			if(pk2_odev_count++<pk2_odev_rep*5){\
				setTimeout(pk2_odev_window, pk2_odev_time);\
				return;\
			}\
		}\
	}\
	pk2_odev_count=0;\
	pk2_odevalka();\
};\
\
pk2_odev_zapusk = function(){\
	pk2_odev_type++;pk2_odev_count=0;\
	pk2_odevalka();\
\
};\
\
pk2_odev_control = function(typ, id){\
	zz = Wear.wear[pk2_types[pk2_odev_type]];\
	if (zz&&(zz.obj.item_id!=pk2_odev_item)){\
		if(pk2_odev_count++ <= pk2_odev_rep){\
			setTimeout(pk2_odev_control,pk2_odev_time);\
			return;\
		}\
		else{\
			pk2_odev_stat=false;\
		}\
	}\
	pk2_odev_zapusk();\
};\
\
pk2_odevalka = function(){\
	ee = pk2_odev_type;\
	irab=pk2_odev_rab;\
	if (ee >= pk2_types.length){\
		if (pk2_odev_stat) {document.getElementById('current_task_box_text').innerHTML='Jestem ubrany'}\
		else {document.getElementById('current_task_box_text').innerHTML='Ups! Jestem półnagi :]'}\
		return;\
	}\
	if (pk2_odev_var==='n')\
		sid = resultaty[irab].items[ee].tid;\
	else if (pk2_odev_var==='z')\
		sid = resultaty_z[irab].items[ee].tid;\
	else if (pk2_odev_var==='r')\
		sid = resultaty_r[irab].items[ee].tid;\
	if (sid){\
		if (Wear.wear[pk2_types[ee]]&&(Wear.wear[pk2_types[ee]].obj.item_id===sid)){\
			pk2_odev_zapusk();\
			return;\
		}\
		var inv = Bag.getInstance().items;\
		for (vv in inv){\
			if (inv[vv].obj.item_id===sid){\
				Bag.getInstance().carry(vv);\
				pk2_odev_item=sid;\
				pk2_odev_control();\
				return;\
			}\
		}\
		pk2_odev_zapusk();return;\
	}\
	else{\
		pk2_odev_zapusk();\
		return;\
	}\
\
};\
";


aWindow.pk2_setValue = function(key,value) {
//	window.setTimeout(GM_setValue, 1, key, value);
	window.setTimeout(function() {GM_setValue(key,value)}, 0);
};
// Work arounds to be able to use the GM_getValue functions in the normal code. Note that this function is 'asynchronous',
//  so any following code has to be called with a delay, to have AEG.equipItems set.
aWindow.pk2_getValue = function(key) {
	window.setTimeout(function() {	aWindow.pk2_abyrvalg = GM_getValue(key);}, 1 );
};


pk2_code +="\
pk2_worker = function(schet){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(schet);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		if (schet) {setTimeout(pk2_worker4,1000)}else{setTimeout(pk2_worker3,1000)}} \
	else {pk2_count_inv=0;pk2_worker2(schet)}\
}\
;";

pk2_code +="\
pk2_worker3 = function(){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(false);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		setTimeout(pk2_worker3,1000)} \
	else {pk2_count_inv=0;pk2_worker2(false)}\
}\
;";

pk2_code +="\
pk2_worker4 = function(){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(true);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		setTimeout(pk2_worker4,1000)} \
	else {pk2_count_inv=0;pk2_worker2(true)}\
}\
;";

aWindow.pk2_worker2 = function(schet){
    aWindow.pk2_process=true;
    aWindow.resultaty=[];
    aWindow.resultaty_z=[];
    aWindow.resultaty_r=[];
    aWindow.zaschita=null;
    aWindow.ezda = false;
    aWindow.rabnavyki=[];
    aWindow.rabnavyki_z=[];
    aWindow.pk2_khochuka = [];
	aWindow.pers = aWindow.Character;

	vse_vse = document.getElementById('pk2_skol_rabot_v').checked;
	vse_rab = document.getElementById('pk2_skol_rabot_r').checked;
	nesk_rab = document.getElementById('pk2_skol_rabot_n').checked;
	skil_rab = document.getElementById('pk2_skol_rabot_s').checked;
	item_rab = document.getElementById('pk2_skol_rabot_i').checked;
	aWindow.pk2_vse_raboty = vse_vse||vse_rab;
	vyb_rab = document.getElementById('pk2_rabota');
	aWindow.porabotaj=null;
	aWindow.porabotaj=[];
	if (vse_vse){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<=141))
				aWindow.porabotaj[r]=true;
		}
	}
	else if (vse_rab){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<126))
				aWindow.porabotaj[r]=true;
		}
	     }
             else if (skil_rab){
		    ns = document.getElementById('pk2_rabota20');
                    var ss='';
                    for (s in ns.options){
			if (ns.options[s].selected)
				if (ns.options[s].value > 0)
					ss=ns.options[s].value-1;
                    }
		    ss = aWindow.pk2_vse_navyki[ss];
                    for (r in aWindow.raboty){
			if ((r>0)&&(r<126)){
				for (jj in aWindow.raboty[r].navyki)
					if (ss == jj)
						aWindow.porabotaj[r]=true;
			}
                    }
                  }
                  else if (item_rab){
                         is = document.getElementById('pk2_rabota99');
                         var ii=0;
                         for (i in is.options)
			if (is.options[i].selected)
				if (is.options[i].value > 0){
					ii=is.options[i].value;
				}
		for (r in aWindow.raboty){
			if ((r>0)&&(r<130)){
				for (jj in aWindow.raboty[r].resultaty.produkty)
					if (ii==jj)
						aWindow.porabotaj[r]=true;
			}
		}
	}
	else{
		for (r in vyb_rab.options){
			if (vyb_rab.options[r].selected){
				if (vyb_rab.options[r].value > 0) {
					aWindow.porabotaj[vyb_rab.options[r].value] = true;
				}
			}
		}
	}
	min_hp=parseInt(document.getElementById('pk2_fort_hp').value,10);
	aWindow.pk2_zdorov = (min_hp-100-(aWindow.pers.level-1)*aWindow.pers.lifePointPerHealthSkill)/(aWindow.pers.lifePointPerHealthSkill+aWindow.pers.lifePointPerHealthSkillBonus);
	test_vesch = document.getElementById('pk2_khochuka').checked;
	test_svoi_magaziny = document.getElementById('pk2_smo_mag').checked;
	if (test_vesch){
	    vyb_vesch = document.getElementById('pk2_dobavim_veschi');
	    for (v in vyb_vesch.options){
	        if (vyb_vesch.options[v].selected){
	            if (vyb_vesch.options[v].value > 0){
	                aWindow.pk2_khochuka[vyb_vesch.options[v].value] = true;
	            }
	        }
	    }
	}
	aWindow.pk2_khlam = document.getElementById('pk2_khlam').checked;
	iz_magazinov = document.getElementById('pk2_pokupka').checked;
	vse_veschi= document.getElementById('pk2_vse_vse').checked;
	aWindow.bablo = parseInt(document.getElementById('pk2_bablo').value,10);
	aWindow.pk2_millioner = document.getElementById('pk2_milion').checked;
	if (aWindow.pk2_millioner)
	    aWindow.bablo=1000000;
	plus_level = parseInt(document.getElementById('pk2_uroven').value,10);
	aWindow.ezda = document.getElementById('pk2_skorost').checked
	s_zaschitoj=document.getElementById('pk2_zaschita').checked;
	e_nov_rabota=document.getElementById('pk2_navyki').checked;
	nov_index=aWindow.raboty.length;
	if (e_nov_rabota){
		nr_malus = parseInt(document.getElementById('pk2_malus').value,10);
		nov_rabota={};
		nr_rabota_res=null;
		
		nvn_build=parseFloat(document.getElementById('pk2_build').value);
		nvn_punch=parseFloat(document.getElementById('pk2_punch').value);
		nvn_tough=parseFloat(document.getElementById('pk2_tough').value);
		nvn_endurance=parseFloat(document.getElementById('pk2_endurance').value);
		nvn_health=parseFloat(document.getElementById('pk2_health').value);
		nvn_ride=parseFloat(document.getElementById('pk2_ride').value);
		nvn_reflex=parseFloat(document.getElementById('pk2_reflex').value);
		nvn_dodge=parseFloat(document.getElementById('pk2_dodge').value);
		nvn_hide=parseFloat(document.getElementById('pk2_hide').value);
		nvn_swim=parseFloat(document.getElementById('pk2_swim').value);
		nvn_aim=parseFloat(document.getElementById('pk2_aim').value);
		nvn_shot=parseFloat(document.getElementById('pk2_shot').value);
		nvn_pitfall=parseFloat(document.getElementById('pk2_pitfall').value);
		nvn_finger_dexterity=parseFloat(document.getElementById('pk2_finger_dexterity').value);
		nvn_repair=parseFloat(document.getElementById('pk2_repair').value);
		nvn_leadership=parseFloat(document.getElementById('pk2_leadership').value);
		nvn_tactic=parseFloat(document.getElementById('pk2_tactic').value);
		nvn_trade=parseFloat(document.getElementById('pk2_trade').value);
		nvn_animal=parseFloat(document.getElementById('pk2_animali').value);
		nvn_appearance=parseFloat(document.getElementById('pk2_appearance').value);
		aWindow.raboty[nov_index] = {rus_name:'Konfigurator', name:'constructor', malus:nr_malus, navyki:{build:nvn_build, punch:nvn_punch, tough:nvn_tough, endurance:nvn_endurance, health:nvn_health, ride:nvn_ride, reflex:nvn_reflex, dodge:nvn_dodge, hide:nvn_hide, swim:nvn_swim, aim:nvn_aim, shot:nvn_shot, pitfall:nvn_pitfall, finger_dexterity:nvn_finger_dexterity, repair:nvn_repair, leadership:nvn_leadership, tactic:nvn_tactic, trade:nvn_trade, animal:nvn_animal, appearance:nvn_appearance}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, producty:null}};
	}
	if (s_zaschitoj){
		aWindow.zaschita=null;
		aWindow.zaschita={};
		aWindow.zaschita.to = parseInt(document.getElementById('pk2_zaschitato').value,10);
		if (document.getElementById('pk2_zaschita_vm').checked){
			aWindow.zaschita.navyki={punch:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vr').checked){
			aWindow.zaschita.navyki={shot:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vd').checked){
			aWindow.zaschita.navyki={tough:0.5,health:1,reflex:0.5,dodge:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vk').checked){
			aWindow.zaschita.navyki=aWindow.raboty[nov_index].navyki;
			e_nov_rabota=false;
		}
		else{
			aWindow.zaschita.navyki={dodge:1};
		}
	}
	else{
		aWindow.zaschita=null;
	}
	if (e_nov_rabota){
		if (vse_vse || vse_rab || nesk_rab) {
			aWindow.porabotaj[nov_index] = true;
		}
		else{
			aWindow.porabotaj=[];
			aWindow.porabotaj[nov_index] = true;
		}
	}

	sslot=document.getElementById('pk2_sloty').checked;
	if (sslot){
		aWindow.pk2_slots={};
		aWindow.pk2_slots.flag=true;
		aWindow.pk2_slots.head =document.getElementById('pk2_head').checked;
		aWindow.pk2_slots.body =document.getElementById('pk2_body').checked;
		aWindow.pk2_slots.belt =document.getElementById('pk2_belt').checked;
		aWindow.pk2_slots.pants =document.getElementById('pk2_pants').checked;
		aWindow.pk2_slots.foot =document.getElementById('pk2_foot').checked;
		aWindow.pk2_slots.neck =document.getElementById('pk2_neck').checked;
		aWindow.pk2_slots.right_arm =document.getElementById('pk2_right_arm').checked;
		aWindow.pk2_slots.left_arm =document.getElementById('pk2_left_arm').checked;
		aWindow.pk2_slots.yield =document.getElementById('pk2_yield').checked;
		aWindow.pk2_slots.animal =document.getElementById('pk2_animal').checked;
	}
	else{
		aWindow.pk2_slots=null;
	}
	// if (!aWindow.pk2_inv_imported){ sprawdzic
	    aWindow.pk2_iimport();
	    if (!aWindow.pk2_inv_imported){
	        new aWindow.HumanMessage('Otwórz ekwipunek. Poczekaj aż załaduje się strona z ekwipunkiem.<br />Teraz możesz zminimalizować lub zamknąc.');
	        aWindow.pk2_process=false;
	        return;
	    }
//	}
	if (test_vesch&&test_svoi_magaziny){
	    aWindow.pk2_mimport();
	}
	
	if (aWindow.pk2_inv_imported)
	{
//        aWindow.pk2_podschet(vse_veschi, iz_magazinov, test_svoi_magaziny, plus_level, aWindow.pers);
        aWindow.pk2_podschet(vse_veschi, iz_magazinov, plus_level, aWindow.pers);
    }
       
    if (aWindow.einfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.einfo+'\n'+aWindow.winfo);
    }
    else if (aWindow.winfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.winfo);
    }
    
    aWindow.all_def={navyki:{}};
	if (aWindow.zaschita){
		for (z in aWindow.zaschita.navyki) aWindow.all_def.navyki[z]=aWindow.zaschita.navyki[z];
	}
	else	aWindow.all_def.navyki = {aim:2,dodge:2,tactic:2,tough:1,reflex:1,health:1};
	if (schet){
	    aWindow.rekurs_time = 50000;
	    aWindow.rekurs_step = 0;
        aWindow.pk2_vybzap();
    }
    else{
        aWindow.pk2_vybvesch();
    }
}

pk2_code+="\
my_name_is = function (){\
	if (Character&&Character.name){\
		pk2_pre = location.host.substr(0,4)+Character.name;\
		pk2_getValue(pk2_pre+'odev_list');\
		setTimeout(function() {if (pk2_abyrvalg.indexOf('aWindow.')==0) {pk2_abyrvalg=pk2_abyrvalg.slice(8)};eval(pk2_abyrvalg)},500);\
	}\
	else{\
		setTimeout(my_name_is,500);\
	}\
};\
";

aWindow.pk2_simselect='<select class=\"pk2_sel\" style=\"width:99%\" id=\"pk2_rabota\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_o\').checked=true;\">';
aWindow.pk2_mulselect='<select title=\"Wybieranie wielu obiektów &mdash; zaznaczamy z wciśniętym klawiszem Ctrl\" class=\"pk2_sel\" style=\"width:99%\" multiple=\"multiple\" id=\"pk2_rabota\" size=\"15\" onchange=\"javascript:$(\'pk2_skol_rabot_n\').checked=true;\">';
aWindow.pk2_conselect='\
<option value=\"0\">	\u25BC Wybierz co chcesz robić: \u25BC	</option>\
<option value=\"141\">	\u25BA Przemieszczanie się \u25C0	</option>\
<option value=\"131\">	\u25BA Rozbudowa miasta/fortu \u25C0	</option>\
<option value=\"130\">	\u25BA Życie \u25C0	</option>\
<option value=\"0\">	--------------------	</option>\
<option value=\"73\">	Ambush	</option>\
<option value=\"74\">	Ambush stagecoach	</option>\
<option value=\"75\">	Bounty hunter	</option>\
<option value=\"29\">	Branding cattle	</option>\
<option value=\"121\">	Break up gangs	</option>\
<option value=\"118\">	Budowa domu misyjnego	</option>\
<option value=\"119\">	Budowa kasyna	</option>\
<option value=\"47\">	Budowa mostów	</option>\
<option value=\"53\">	Budowa posiadłości	</option>\
<option value=\"84\">	Budowa Rancza	</option>\
<option value=\"43\">	Budowa stacji kolejowej	</option>\
<option value=\"49\">	Budowa trumien	</option>\
<option value=\"28\">	Budowa urządzeń nawadniających	</option>\
<option value=\"44\">	Budowa wiatraków	</option>\
<option value=\"31\">	Burzenie tamy	</option>\
<option value=\"93\">	Czyszczenie butów	</option>\
<option value=\"94\">	Darn socks	</option>\
<option value=\"41\">	Drukowanie gazet	</option>\
<option value=\"45\">	Eksploracja kontynentu	</option>\
<option value=\"96\">	Feed the animals	</option>\
<option value=\"17\">	Garbowanie	</option>\
<option value=\"90\">	Gaszenie pożaru	</option>\
<option value=\"16\">	Guarding the fort	</option>\
<option value=\"36\">	Handel	</option>\
<option value=\"54\">	Handlowanie z Indianami	</option>\
<option value=\"107\">	Hazardzista w trasie	</option>\
<option value=\"22\">	Hodowla krów	</option>\
<option value=\"58\">	Hunting wolves	</option>\
<option value=\"25\">	Kamieniołom	</option>\
<option value=\"55\">	Karczowanie lasu	</option>\
<option value=\"19\">	Kopanie grobów	</option>\
<option value=\"109\">	Kopanie saletry	</option>\
<option value=\"12\">	Koszenie pastwiska	</option>\
<option value=\"48\">	Łapanie koni	</option>\
<option value=\"13\">	Milling grains	</option>\
<option value=\"62\">	Misjonarze	</option>\
<option value=\"122\">	Napad na bank	</option>\
<option value=\"77\">	Napad na pociąg	</option>\
<option value=\"34\">	Naprawa wozów osadników	</option>\
<option value=\"23\">	Naprawianie płotów	</option>\
<option value=\"57\">	Ochrona powozu pocztowego	</option>\
<option value=\"59\">	Ochrona wozu osadników	</option>\
<option value=\"70\">	Okradanie ludzi	</option>\
<option value=\"113\">	Oszust matrymonialny	</option>\
<option value=\"80\">	Peace negotiations	</option>\
<option value=\"9\">	Picking berries	</option>\
<option value=\"4\">	Picking tobacco	</option>\
<option value=\"1\">	Pilnowanie świń	</option>\
<option value=\"82\">	Pilotowanie Parowców Kołowych	</option>\
<option value=\"65\">	Plądrowanie zwłok	</option>\
<option value=\"88\">	Podkuwanie koni	</option>\
<option value=\"52\">	Polowanie na bizony	</option>\
<option value=\"39\">	Polowanie na bobry	</option>\
<option value=\"66\">	Polowanie na Grizzly	</option>\
<option value=\"108\">	Polowanie na grzechotniki	</option>\
<option value=\"20\">	Polowanie na indyki	</option>\
<option value=\"51\">	Polowanie na kojoty	</option>\
<option value=\"114\">	Polowanie na pumy	</option>\
<option value=\"102\">	Połów krabów	</option>\
<option value=\"42\">	Połów ryb	</option>\
<option value=\"63\">	Pony-Express	</option>\
<option value=\"32\">	Poszukiwanie kamieni szlachetnych	</option>\
<option value=\"117\">	Poszukiwanie rzadkich kamieni	</option>\
<option value=\"68\">	Poszukiwanie skarbu	</option>\
<option value=\"120\">	Pracuj jako Marshall	</option>\
<option value=\"79\">	Pracuj jako konował	</option>\
<option value=\"104\">	Pracuj jako szeryf	</option>\
<option value=\"71\">	Pracuj jako żołdak	</option>\
<option value=\"83\">	Przemyt	</option>\
<option value=\"3\">	Putting up posters	</option>\
<option value=\"111\">	Rodeo	</option>\
<option value=\"21\">	Rozkładanie torów	</option>\
<option value=\"99\">	Sadzenie drzew	</option>\
<option value=\"24\">	Sawing wood	</option>\
<option value=\"2\">	Scare birds off the field	</option>\
<option value=\"56\">	Silver mining	</option>\
<option value=\"69\">	Służba w armii	</option>\
<option value=\"46\">	Spław drewna	</option>\
<option value=\"106\">	Spław rwącą rzeką	</option>\
<option value=\"92\">	Sprzątanie stajni	</option>\
<option value=\"64\">	Sprzedaż broni Indianom	</option>\
<option value=\"11\">	Sprzedaż gazet	</option>\
<option value=\"37\">	Stawianie masztów telegraficznych	</option>\
<option value=\"60\">	Stealing Horses	</option>\
<option value=\"61\">	Strażnik więzienia	</option>\
<option value=\"72\">	Ściganie bandytów	</option>\
<option value=\"103\">	Teach	</option>\
<option value=\"115\">	Transport alkoholu	</option>\
<option value=\"110\">	Transport koni	</option>\
<option value=\"76\">	Transport więźniów	</option>\
<option value=\"50\">	Transportowanie amunicji	</option>\
<option value=\"35\">	Ujeżdżanie koni	</option>\
<option value=\"33\">	Ustanowienie prawa własności	</option>\
<option value=\"123\">	Uwalnianie niewolników	</option>\
<option value=\"38\">	Well drilling	</option>\
<option value=\"7\">	Wędkowanie	</option>\
<option value=\"112\">	Wędrowny handlarz	</option>\
<option value=\"78\">	Włamanie	</option>\
<option value=\"27\">	Wycinka drzew	</option>\
<option value=\"67\">	Wydobycie ropy	</option>\
<option value=\"105\">	Wydobycie siarki	</option>\
<option value=\"116\">	Wydobycie ołowiu	</option>\
<option value=\"40\">	Wydobycie węgla	</option>\
<option value=\"18\">	Wydobycie złota	</option>\
<option value=\"85\">	Wydobycie żelaza	</option>\
<option value=\"95\">	Wykopki	</option>\
<option value=\"10\">	Wypasanie owiec	</option>\
<option value=\"26\">	Wyrównywanie koryta rzeki	</option>\
<option value=\"124\">	Występ z Buffalo Billem	</option>\
<option value=\"30\">	Zakładanie ogrodzenia z drutu kolczastego	</option>\
<option value=\"86\">	Zbieranie Agawy	</option>\
<option value=\"98\">	Zbieranie borówek	</option>\
<option value=\"97\">	Zbieranie dyń	</option>\
<option value=\"15\">	Zbieranie fasoli	</option>\
<option value=\"14\">	Zbieranie kukurydzy	</option>\
<option value=\"101\">	Zbieranie kwiatów lotosu	</option>\
<option value=\"100\">	Zbieranie orlich piór	</option>\
<option value=\"91\">	Zbieranie pomarańczy	</option>\
<option value=\"87\">	Zbieranie pomidorów	</option>\
<option value=\"8\">	Zbieranie zboża	</option>\
<option value=\"5\">	Zbiór bawełny	</option>\
<option value=\"6\">	Zrywanie trzciny cukrowej	</option>\
<option value=\"0\">	--------------------	</option>\
<option value=\"151\" style=\"border-top:1px black solid; background-color:#2A79F9\">	Strzelec vs strzelec	</option>\
<option value=\"155\" style=\"background-color:#2A79F9\">	Strzelec vs siepacz	</option>\
<option value=\"153\" style=\"background-color:#2A79F9\">	Strzelec ochrona Strzelec	</option>\
<option value=\"157\" style=\"background-color:#2A79F9\">	Strzelec ochrona Siepacz	</option>\
<option value=\"159\" style=\"background-color:#2A79F9\">	Strzelec ochrona każdy	</option>\
<option value=\"161\" style=\"background-color:#2A79F9\">	Strzelec vs strzelec + PŻ	</option>\
<option value=\"165\" style=\"background-color:#2A79F9\">	Strzelec vs siepacz + PŻ	</option>\
<option value=\"163\" style=\"background-color:#2A79F9\">	Strzelec ochrona Strzelec + PŻ	</option>\
<option value=\"167\" style=\"background-color:#2A79F9\">	Strzelec ochrona Siepacz + PŻ	</option>\
<option value=\"169\" style=\"background-color:#2A79F9\">	Strzelec ochrona każdy + PŻ	</option>\
<option value=\"152\" style=\"background-color:#D65353\">	Siepacz vs strzelec	</option>\
<option value=\"156\" style=\"background-color:#D65353\">	Siepacz vs siepacz	</option>\
<option value=\"154\" style=\"background-color:#D65353\">	Siepacz ochrona strzelec	</option>\
<option value=\"158\" style=\"background-color:#D65353\">	Siepacz ochrona siepacz	</option>\
<option value=\"160\" style=\"background-color:#D65353\">	Siepacz ochrona każdy	</option>\
<option value=\"162\" style=\"background-color:#D65353\">	Siepacz vs strzelac + PŻ	</option>\
<option value=\"166\" style=\"background-color:#D65353\">	Siepacz vs siepacz + PŻ	</option>\
<option value=\"164\" style=\"background-color:#D65353\">	Siepacz ochrona strzelec + PŻ	</option>\
<option value=\"168\" style=\"background-color:#D65353">	Siepacz ochrona siepacz + PŻ	</option>\
<option value=\"170\" style=\"background-color:#D65353\">	Siepacz ochrona każdy + PŻ	</option>\
<option>======================== * Fort * ========================</option>\
<option value=\"201\" style=\"background-color:red\">	\u25A2 Atak na fort bonusy	</option>\
<option value=\"202\" style=\"background-color:red\">	\u25A2 Atak na fort	bonusy \u2665	</option>\
<option value=\"203\" style=\"background-color:red\">	\u25A2 Atak na fort celność	</option>\
<option value=\"204\" style=\"background-color:red\">	\u25A2 Atak na fort celność \u2665	</option>\
<option value=\"205\" style=\"background-color:red\">	\u25A2 Atak na fort unik	</option>\
<option value=\"206\" style=\"background-color:red\">	\u25A2 Atak na fort unik \u2665	</option>\
<option value=\"207\" style=\"background-color:red\">	\u25A2 Atak na fort \u2665	</option>\
<option value=\"211\" style=\"background-color:green\">	\u25A2 Obrona fort bonusy	</option>\
<option value=\"212\" style=\"background-color:green\">	\u25A2 Obrona fort bonusy \u2665	</option>\
<option value=\"213\" style=\"background-color:green\">	\u25A2 Obrona fort celność	</option>\
<option value=\"214\" style=\"background-color:green\">	\u25A2 Obrona fort celność \u2665	</option>\
<option value=\"215\" style=\"background-color:green\">	\u25A2 Obrona fort unik	</option>\
<option value=\"216\" style=\"background-color:green\">	\u25A2 Obrona fort unik \u2665	</option>\
<option value=\"217\" style=\"background-color:green\">	\u25A2 Obrona fort \u2665	</option>\
</select>\
';

aWindow.pk2_slot_selector = function(v_slot){
	document.getElementById('pk2_head').checked = (v_slot=='head');
	document.getElementById('pk2_body').checked = (v_slot=='body');
	document.getElementById('pk2_belt').checked = (v_slot=='belt');
	document.getElementById('pk2_pants').checked = (v_slot=='pants');
	document.getElementById('pk2_foot').checked = (v_slot=='foot');
	document.getElementById('pk2_neck').checked = (v_slot=='neck');
	document.getElementById('pk2_right_arm').checked = (v_slot=='right_arm');
	document.getElementById('pk2_left_arm').checked = (v_slot=='left_arm');
	document.getElementById('pk2_yield').checked = (v_slot=='yield');
	document.getElementById('pk2_animal').checked = (v_slot=='animal');
};

aWindow.pk2_ovselect = function(){
    vyb_vesch_options = document.getElementById('pk2_dobavim_veschi').options;
    for (v in vyb_vesch_options){
        vyb_vesch_options[v].selected = false;
    }
}

aWindow.pk2_show_shmot = function(irab){
    vv = null;
    if (aWindow.resultaty_r[irab]){
        vv = aWindow.resultaty_r[irab];
    }
    else if (aWindow.resultaty_z[irab]){
        vv = aWindow.resultaty_z[irab];
    }
    else if (aWindow.resultaty[irab]){
        vv = aWindow.resultaty[irab];
    }
    if (!vv) return;
    hti = '<table style=\"background-color:black;\">';
    for (ii = 0; ii < vv.items.length; ++ii){
        sid = vv.items[ii].tid;
        if (sid){
            vesch = aWindow.items[sid];
            hti+='<tr><td><a class=\"tt2\" href=\"#\" ><span><strong>'+vesch.name+'</strong>';
            if (vesch.set.key){
                hti += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                hti += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                hti += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            hti += '</span>';
            hti+='<div class=\"bag_item\" ><img src=\"'+ vesch.image_mini +'\" /></div>';
            hti+='</a></td></tr>';
        }
    }
    hti += '</table>';

    pk2_shmot_old = document.getElementById('pk2_shmot');
    pk2_shmot = null;
    html2='';
    
    if (!pk2_shmot){
		html2 += '<div id=\"pk2_shmo2\" style=\"width:' + 90 + 'px;\">\n';
        html2 += '<div style=\"background-color:#302010; text-align:center; font-weight:bold; color:red;\">';
		html2 += '<span>';
		html2 += '<a href=\"javascript:pk2_close_shmot();\"' + aWindow.pk2_tlink + ' title=\"Zamknij okno\">&nbsp;X&nbsp;</a>&nbsp;';
		html2 += '</span>';
		html2 += '<span id=\"pk2_shmot_cap\">Zestaw</span>';
		html2 += '</div>'
		html2 += '<div id=\"pk2_shmot_content\">';

        html2 += hti;
        html2 += '</div>'        		
        
		html2 += '</div>';
		pk2_shmot = document.createElement('div');
		pk2_shmot.id = 'pk2_shmot';
		pk2_shmot.innerHTML = html2;
		pk2_shmot.setAttribute('style', 'position: absolute; right: ' + 20 + 'px; top: ' + 10 + 'px; z-index:251');
	}
	if (pk2_shmot_old)
	    document.body.replaceChild(pk2_shmot, pk2_shmot_old);
	else
	    document.body.appendChild(pk2_shmot);
	pk2_shmot.style.display = 'block';

}

aWindow.pk2_show_panel = function(){
	pk2_title = document.getElementById('pk2_title');
	html0 = '';
	
	if (!pk2_title) {
		html0 += '<div id=\"pk2_form0\" style=\"width:' + aWindow.pk2_w0 + 'px; text-align:left;\">\n';
		html0 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
		html0 += '<tr>';
		html0 += '<td class=\"gran_vl\" />\n';
		html0 += '<td class=\"gran_v\" />\n';
		html0 += '<td class=\"gran_vp\" />\n';
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html0 += '<span>';
		html0 += '<a href=\"javascript:pk2_minimize_title();\"' + aWindow.pk2_tlink + ' title=\"Zminimalizuj okno\">&nbsp;_&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:pk2_stretch_title();\"' + aWindow.pk2_tlink + ' title=\"Zmień wielkość okna\">&nbsp;+&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:pk2_close_title();\"' + aWindow.pk2_tlink + ' title=\"Zamknij okno\">&nbsp;X&nbsp;</a>&nbsp;';
		html0 += '</span>';
		html0 += '<span id=\"pk2_title_cap\" style=\"font-size:11px;\">Poszukiwanie&nbsp;&laquo;najlepszego&raquo;&nbsp;ekwipunku&nbsp;&nbsp;<font style="color:yellow;">'+PrzVer+'</font></span>';
		html0 += '<input type=\"button\" value=\"Dalej\" style=\"float:right; font-weight:bold\" onclick=\"javascript:pk2_worker(true)\"/>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr id=\"pk2_title_content_row\">\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td id=\"pk2_title_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.pk2_w0 - 12) + 'px;\" >';
		html0 += '<div id=\"pk2_title_content\" style=\"overflow: auto; height: ' + aWindow.pk2_title_h_mid + 'px;\">';
		
		html0 += '\
<form id=\"pk2_form\">\
	<div id=\"pk2_vselect\">';
		html0 += aWindow.pk2_simselect;
		html0 += aWindow.pk2_conselect;
		
		html0 += '</div>\
	<div' + aWindow.pk2_vblock + '>\
	<div style=\"float:right;\" >Punkty&nbsp;(fort)&nbsp;&nbsp;<input id=\"pk2_fort_hp\" name=\"pk2_fort_hp\ type=\"text\" value=\"0\" size=\"4\">&nbsp;</div>\
	<input type= \"button\" title=\"Pokazuje, nie więcej niż siedem elementów każdego typu (posiadanych w plecaku)<br />o największych współczynnikach, z wyłączeniem zestawów (kompletów).\" value=\"Przedmioty z PP\" style=\"float:right; clear:right;\" onclick=\"javascript:pk2_worker(false)\"/>\
	<input id=\"pk2_skol_rabot_v\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"v\" style=\"visibility:hidden; margin:auto 5px;\" /><!--Wszystko//-->\
	<input id=\"pk2_skol_rabot_r\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"r\" style=\"margin:auto 5px;\" />Wszystkie&nbsp;prace<br />\
	<input id=\"pk2_skol_rabot_o\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"o\" checked=\"checked\" style=\"margin:auto 5px;\" onchange=\"javascript:pk2_vselect(false);void(0)\" />Jedna&nbsp;praca<br />\
	<input id=\"pk2_skol_rabot_n\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"n\" style=\"margin:auto 5px;\" onchange=\"javascript:pk2_vselect(true);void(0)\" />Wybrane&nbsp;prace<br />\
	<input id=\"pk2_skol_rabot_s\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"s\" style=\"margin:auto 5px;\" />Umiejętności&nbsp;&nbsp;';

		html0 +='<select class=\"pk2_sel\" id=\"pk2_rabota20\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_s\').checked=true;\">\
	<option value=\"0\">\u25BC wybierz umiejętność \u25BC</option>';
	for (ii=0;ii<aWindow.pk2_vse_navyki.length;++ii)
	{
		html0 += '<option value=\"'+(ii+1)+'\">	'+ aWindow.Character.skill_titles[aWindow.pk2_vse_navyki[ii]]+'</option>';
	};
		html0 += '\
	</select><br />\
	<input id=\"pk2_skol_rabot_i\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"i\" style\"margin:auto 5px;\" />Produkt&nbsp;&nbsp;';

	
		html0 +='\
	<select class=\"pk2_sel\" id=\"pk2_rabota99\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_i\').checked=true;\">\
	<option value=\"0\">\u25BC wybierz produkt \u25BC</option>';
	var tmp=[];
	for (ii=700;ii<1850;++ii){
		tmp[ii]={};
		tmp[ii].ves = aWindow.items[ii] ? aWindow.items[ii].name : '-';
		tmp[ii].id = ii;

if (tmp[ii].ves!='-')
if (aWindow.items[ii].type !='yield')
tmp[ii].ves = '-';
else if (aWindow.items[ii].shop != 'drop')
tmp[ii].ves = '-';
;
;
	}
	aWindow.qsort(tmp,700,1849);
	for (ii=700;ii<1850;++ii)
	{
		if (tmp[ii].ves !== '-')
			html0 += '<option value=\"'+tmp[ii].id+'\">	'+ tmp[ii].ves+'</option>';
	};

		html0 += '\
	</select><br />\
	\
	</div>\
	<div' + aWindow.pk2_vblock + '>\
		<span title=\"Po wybraniu wszystkich prac, skrypt może wykryć rzeczy, które są niepotrzebne<br />i obliczyć cenę sprzedaży tych rzeczy (w tej wersji nadal słabo działa).<br />Jeśli nie ma wystarczających środków, te przedmioty można śmiało sprzedawać.\"><input id=\"pk2_khlam\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />\
		Wyszykaj niepotrzebny ekwipunek<br /></span>\
	</div>\
	<div' + aWindow.pk2_vblock + '>\
		<span title=\"Dodatkowo jest wyszukiwany zestaw z maksymalną prędkością oraz dostępnością przedmiotów.<br />Przydatne do dalekiego przemieszczania się, a następnie ubraniu w normalne rzeczy.\">\
		<input id=\"pk2_skorost\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />\
		Uwzględnić&nbsp;szybkość&nbsp;do&nbsp;pracy?<br /></span>\
	</div>\
	<div' + aWindow.pk2_vblock + '>\
		<span id=\"sp_tst_st3456\" title=\"Chcesz pracować jednak brakuje Tobie parę punktów PP?<br />Skrypt pomoże Tobie dobrać odpowiedni ekwipunek.\">\
		<input id=\"pk2_pokupka\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_bablo\').style.display=\'block\'}else{$(\'pk2_ukr_bablo\').style.display=\'none\'};void(0)\" />\
		Chcesz kupić ekwipunek?<br /></span>\
		<div id=\"pk2_ukr_bablo\" style=\"display:none;\">\
		<span title=\"Zaznaczenie tej opcji powoduje, że skrypt będzie poszukiwał ekwipunku tylko w sklepie, który jest w Twoim mieście. Wyłaczenie tej opcji, skrypt będzie szukał we wszystkich sklepach (ceny będą 4 x wyższe). Działa tylko jak należysz do jakiegoś miasta i była otwarta zawartość sklepu.\">\
		<input id=\"pk2_smo_mag\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" >Tylko z &laquo;Twojego&raquo; sklepu.</span><br />\
		<span title=\"Podaj ile pieniędzy zamierzasz przeznaczyć na zakupy.\">\
		<input id=\"pk2_bablo\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />\
		&nbsp;Przeznaczone&nbsp;pieniądze&nbsp;na&nbsp;zakupy<br /></span>\
		<span title=\"Jesteś gotów wydać i poświęcają każdą kwotę na kupienie ulubionego przedmiotu.<br />Skrypt pomoże, a ta opcja przyspieszy poszukiwania potrzebnej &laquo;lepszej&raquo; rzeczy.\">\
		<input id=\"pk2_milion\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />Pieniądze&nbsp;nie&nbsp;mają&nbsp;znaczenia <strong>:)</strong><br /></span>\
		</div>\
	</div>\
	<div' + aWindow.pk2_vblock + '>\
		<span title=\"Przeszukuje przedmioty, które będą najlepszymi do wykonywanej pracy.<br />Nie ważne czy je posiadasz czy też ich nie masz. Skrypt poszuka i poda te najodpowiedniejsze.\">\
		<input id=\"pk2_vse_vse\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />Chcesz&nbsp;znaleźć&nbsp;najlepsze&nbsp;przedmioty&nbsp;do&nbsp;pracy?</span>\
	</div>\
		<div' + aWindow.pk2_vblock + '>\
		<span title=\"Tutaj możesz wybrać niektóre przedmioty (rzeczy) i sprawdzić, ile i czy będzie on używany w pracach.\">\
		<input id=\"pk2_khochuka\" type=\"checkbox\" style=\"margin:auto 23px auto 27px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_khochuka\').style.display=\'block\'}else{$(\'pk2_ukr_khochuka\').style.display=\'none\';pk2_ovselect();};void(0)\" />Przydatność brakujących elementów</span>\
		<div id=\"pk2_ukr_khochuka\" style=\"display:none;\">\
		<span title=\"Po wybraniu tej pozycji należy wziąć pod uwagę<br />wszystkie rzeczy widzialne wcześniej otwartych sklepach\">\
		<input id=\"pk2_smo_mag\" type=\"checkbox\" style=\"margin:auto 23px auto 27px;\" >Import pozycji ze sklepu (ów).</span>\
		<select title=\"Wybieranie wielu obiektów &mdash; zaznaczamy z wciśniętym klawiszem Ctrl\" class=\"pk2_sel\" multiple=\"multiple\" id=\"pk2_dobavim_veschi\" size=\"10\">;';
		
    for (vv = 1; vv < 11200; ++vv){
        if ((vv >= 100)&&(vv < 200)) continue;
        if ((vv >= 700)&&(vv < 800)) continue;
        if ((vv >= 900)&&(vv < 10000)) continue;
        if ((vv >= 10200)&&(vv < 11000)) continue;
        if (vv == 1) {html0+='<optgroup title=\"Biała broń\" label=\"Biała broń\">'}
        if (vv == 200) {html0+='<optgroup title=\"Nakrycie głowy\" label=\"Nakrycie głowy\">'}
        if (vv == 300) {html0+='<optgroup title=\"Odzież\" label=\"Odzież\">'}
        if (vv == 400) {html0+='<optgroup title=\"Buty\" label=\"Buty\">'}
        if (vv == 500) {html0+='<optgroup title=\"Naszyjniki\" label=\"Naszyjniki\">'}
        if (vv == 600) {html0+='<optgroup title=\"Jazda konna\" label=\"Jazda konna\">'}
        if (vv == 800) {html0+='<optgroup title=\"Broń strzelecka\" label=\"Broń strzelecka\">'}
        if (vv == 10000) {html0+='<optgroup title=\"Spodnie\" label=\"Spodnie\">'}
        if (vv == 11000) {html0+='<optgroup title=\"Paski\" label=\"Paski\">'}
        if (aWindow.items[vv]){
            html0 +='<option value=\"'+vv+'\">	'+aWindow.items[vv].name+'	</option>';
        }
    }
    html0 += '</optgroup><optgroup title=\"Pozostałe zestawy\" label=\"Pozostałe zestawy\">';
    // dodatkowe przedmioty
    html0 += '<option value=\"792\">	'+aWindow.items[792].name+'	</option>';
    html0 += '<option value=\"794\">	'+aWindow.items[794].name+'	</option>';
    html0 += '<option value=\"797\">	'+aWindow.items[797].name+'	</option>';
    html0 += '<option value=\"768\">	'+aWindow.items[768].name+'	</option>';
    html0 += '<option value=\"723\">	'+aWindow.items[723].name+'	</option>';
    html0 += '<option value=\"1715\">	'+aWindow.items[1715].name+'	</option>';
    html0 += '<option value=\"854\">	'+aWindow.items[854].name+'	</option>';		
    html0 += '</optgroup>';
html0 += '</select></div></div>\
		<div' + aWindow.pk2_vblock + '>\
		<span title=\"Zaznaczenie tej opcji i wpisaniu cyfry od 1 do 5. Spowoduje że możesz sprawdzić przedmioty,<br />które możesz użyć za 1-5 poziomów.<br />Nie zmienia cech ani umiejek tylko umożliwia założenie przedmiotów,<br />których przy obecnym poziomie nie moższ użyć.\"><input id=\"pk2_uroven\" type=\"text\" value=\"0\" size=\"1\" onchange=\"javascript:value = parseInt(value,10);if(isNaN(value))value=0;void(0)\" style=\"height:13px; margin:auto 3px auto 16px; vertical-align: middle; text-align: center;\" />\
		&nbsp;&laquo;wyższy&raquo;&nbsp;poziom</span>\
	</div>\
	<div' + aWindow.pk2_vblock + '>\
		<span title=\"Po zaznaczeniu tego pola, skrypt nie dobiera ekwipunku do max PP.<br />Tylko ustawia minimum na PP a resztę na umiejętności obronne.\"><input id=\"pk2_zaschita\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_zaschita\').style.display=\'block\'}else{$(\'pk2_ukr_zaschita\').style.display=\'none\'};void(0)\" />Obrona&nbsp;przed&nbsp;napastnikiem?</span>\
	<div id=\"pk2_ukr_zaschita\" style=\"display:none;\">\
		<span title=\"Umiejętności brane pod uwagę: siła udarzenia, celowanie, unik, taktyka, życie<br />(1/2 refleks i odporność)\"><input id=\"pk2_zaschita_vm\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"m\" style\"margin:auto 5px;\" />&nbsp;Siepacz&nbsp;</span>\
		<span title=\"Umiejętności brane pod uwagę: strzelanie, celowanie, unik, taktyka, życie<br />(1/2 refleks i odporność)\"><input id=\"pk2_zaschita_vr\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"r\" style\"margin:auto 5px;\" />&nbsp;Strzelec&nbsp;</span>\
		<span title=\"Umiejętności brane pod uwagę: unik, taktyka, życie<br />(1/2 refleks i odporność)\"><input id=\"pk2_zaschita_vd\" name=\"pk2_zaschita_v\" type=\"radio\" checked=\"checked\" value=\"d\" style\"margin:auto 5px;\" />&nbsp;&laquo;Każdy&nbsp;napastnik&raquo;<br /></span>\
		<span title=\"Umiejętności brane pod uwagę: Zaznacz opcję (Ustalanie dowolnych umiejętności), wszystkie umiejętności wybrane poniżej, zostaną uwzględnione\"><input id=\"pk2_zaschita_vk\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"k\" style\"margin:auto 5px;\" />&nbsp;Projektant&nbsp;umiejętności<br /></span>\
		<span title=\"Dla wybranej pracy, PP(Punkty Pracy) zostaną przydzielone o wybraną minimalną wartość.<br />Cała &laquo;nadwyżka&raquo; zoastanie przydzielona na ewentualny pojedynek.\"><input id=\"pk2_zaschitato\" type=\"text\" value=\"' +
		aWindow.pk2_zaschitato +
		'\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />&nbsp;Minimalne&nbsp;PP&nbsp;(punkty pracy)&nbsp;<br /></span>\
		</div></div>\
		\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<span title=\"Tutaj możesz wybrać typy (część ciała), które zostaną pobrane.<br />Skrypt nie będzie pobierać tych typów przedmiotów<br />(ubierać się), które zostały zaznaczone.\"><input id=\"pk2_sloty\" value=\"pk2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'pk2_sloty_content\').style.display=\'block\'}else{$(\'pk2_sloty_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 21px auto 27px;\" />Typy ekwipunku:<br /></span>\
		<div id=\"pk2_sloty_content\" style=\"display:none; \">\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'head\');void(0);\"/>\
		<input id=\"pk2_head\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"pomijaj Nakrycia głowy\" />Nakrycia głowy<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'neck\');void(0);\"/>\
		<input id=\"pk2_neck\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"pomijaj Naszyjniki\" />Naszyjniki<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'body\');void(0);\"/>\
		<input id=\"pk2_body\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"pomijaj Odzież\" />Odzież<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'belt\');void(0);\"/>\
		<input id=\"pk2_belt\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"pomijaj Paski\" />Paski<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'pants\');void(0);\"/>\
		<input id=\"pk2_pants\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"pomijaj Spodnie\" />Spodnie<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'right_arm\');void(0);\"/>\
		<input id=\"pk2_right_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"pomijaj Bronie pojedynkowe\" />Broń pojedynkowe<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'left_arm\');void(0);\"/>\
		<input id=\"pk2_left_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"pomijaj Bronie fortowe\" />Broń fortowa<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'foot\');void(0);\"/>\
		<input id=\"pk2_foot\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"pomijaj Obuwie\" />Obuwie<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'animal\');void(0);\"/>\
		<input id=\"pk2_animal\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"pomijaj Jazde konną\" />Jazda konna<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'yield\');void(0);\"/>\
		<input id=\"pk2_yield\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"pomijaj Produkty\" />Produkt<br />\
		</div></div></div>\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<span title=\"Tutaj możesz zrobić dowolną (pracę/zadanie) ustawienie złożoność pracy<br />i wszystkie umiejętności niezbędne do wykonania pracy.<br />Można ustawić liczbę dla danej umiejętności od 0 do 5<br />(dozwolone sąrównież liczby ułamkowe w postaci 1.375).<br />Korzystanie z kreatora umożliwi dobranie przedmiotów pod konkretne umiejętności.<br />Jeśli zaznaczymy opcje <b>ochrona</b> z pod opcją <i>Projektant umiejętności</i>,<br />To te ustawienia zostaną wyliczonę z pozostałych PP."><input id=\"pk2_navyki\" value=\"pk2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'pk2_navyki_content\').style.display=\'block\'}else{$(\'pk2_navyki_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 21px auto 27px;\" />\
		Ustalanie&nbsp;dowolnych&nbsp;umiejętności<br /></span>\
		<div id=\"pk2_navyki_content\" style=\"display:none; \">\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<input id=\"pk2_malus\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value< -32767)||(value>32767)||isNaN(value))value=0;void(0)\" />&nbsp;&laquo;Trudność&raquo;<br />\
	<div style=\"color:red; font-weight:bold;\">\
		<input id=\"pk2_build\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Budowanie<br />\
		<input id=\"pk2_punch\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Siła&nbsp;uderzenia<br />\
		<input id=\"pk2_tough\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Odporność<br />\
		<input id=\"pk2_endurance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Wytrzymałość<br />\
		<input id=\"pk2_health\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Punkty&nbsp;życia<br />\
	</div><div style=\"color:green; font-weight:bold;\">\
		<input id=\"pk2_ride\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Jazda&nbsp;konna<br />\
		<input id=\"pk2_reflex\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Reflaks<br />\
		<input id=\"pk2_dodge\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Unik<br />\
		<input id=\"pk2_hide\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Chowanie&nbsp;się<br />\
		<input id=\"pk2_swim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Pływanie<br />\
	</div><div style=\"color:blue; font-weight:bold;\">\
		<input id=\"pk2_aim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Celowanie<br />\
		<input id=\"pk2_shot\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Strzelanie<br />\
		<input id=\"pk2_pitfall\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Zakładanie&nbsp;pułapek<br />\
		<input id=\"pk2_finger_dexterity\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Sprawność&nbsp;manualna<br />\
		<input id=\"pk2_repair\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Naprawa<br />\
	</div><div style=\"color:#960; font-weight:bold;\">\
		<input id=\"pk2_leadership\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Dowodzenie<br />\
		<input id=\"pk2_tactic\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Taktyka<br />\
		<input id=\"pk2_trade\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Handel<br />\
		<input id=\"pk2_animali\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Obchodzenie&nbsp;się&nbsp;ze&nbsp;zwierętami<br />\
		<input id=\"pk2_appearance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Zaskoczenie<br />\
	</div>\
		</div></div></div>\
	</div>\
</form>';
		
		html0 += '</div>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_nl\" />\n';
		html0 += '<td class=\"gran_n\" />\n';
		html0 += '<td class=\"gran_np\" />\n';
		html0 += '</tr></tbody>\n';
		html0 += '</table>\n';
		html0 += '</div>';
		
		pk2_title = document.createElement('div');
		pk2_title.id = 'pk2_title';
		pk2_title.innerHTML = html0;
		
		pk2_title.setAttribute('style', 'position: absolute; left: ' + aWindow.pk2_l0 + 'px; top: ' + aWindow.pk2_t0 + 'px; z-index:202');
		document.body.appendChild(pk2_title);
		}
	pk2_title.style.display = 'block';
		
}



var pk2_body, pk2_script, pk2_style, pk2_head; 
pk2_body = document.getElementsByTagName('body')[0];

pk2_script = document.createElement('script');
pk2_script.type = 'text/javascript';
pk2_script.innerHTML = pk2_code;
pk2_body.appendChild(pk2_script);

pk2_stext=''
pk2_stext+='.tt:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:10px;\n';
pk2_stext+='left:15px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:20;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2 span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:40px;\n';
pk2_stext+='left:-70px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:21;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='font-weight:normal;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3 span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:40px;\n';
pk2_stext+='left:-100px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:21;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='}\n';

pk2_stext +='\
.pk2_sel {\
    background-color: rgb(232, 218, 179);\
    font-size: 13px;\
}\
.pk2_sel optgroup {\
    background-color:#443;\
    color:white;\
}\
.pk2_sel optgroup option {\
    background-color: rgb(232, 218, 179);\
    color:black;\
}\n';

pk2_stext+='\
.jy_bi {\
	width:43px;\
	height:43px;\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 11px;\
	font-weight: bold;\
	font-style: normal;\
	background-image:url(../images/inventory/yield.png);\
	background-repeat: no-repeat;\
}';
pk2_stext+='\
.jy_bi img {\
	width:43px;\
	height:43px;\
}';
pk2_stext+='\
.jy_pk2 {\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 10px;\
	font-weight: bold;\
	text-align: center;\
	font-style: normal;\
}';

pk2_stext+='\
.gran_vl {\
    background: transparent url(images/border/edge_tl_small.png) no-repeat scroll 0% 0%; height: 6px; padding:0;\
}';
pk2_stext+='\
.gran_v {\
    background: transparent url(images/border/border_t.png) repeat-x scroll 0% 0%; padding:0;\
}';
pk2_stext+='\
.gran_vp {\
    background: transparent url(images/border/edge_tr_small.png) no-repeat scroll 0% 0%; padding:0; width: 6px; height: 6px;\
}';
pk2_stext+='\
.gran_l {\
    background: transparent url(images/border/border_l.png) repeat-y scroll 0% 0%; width: 6px; padding:0;\
}';
pk2_stext+='\
.gran_p {\
    background: transparent url(images/border/border_r.png) repeat-y scroll right center; padding:0; width: 6px;\
}';
pk2_stext+='\
.gran_nl {\
    background: transparent url(images/border/edge_bl.png) no-repeat scroll 0% 0%; height: 6px; width: 6px; padding:0;\
}';
pk2_stext+='\
.gran_n {\
    background: transparent url(images/border/border_b.png) repeat-x scroll 0% 0%; padding:0;\
}';
pk2_stext+='\
.gran_np {\
    background: transparent url(images/border/edge_br.png) no-repeat scroll 0% 0%; padding:0; height: 6px; width: 6px;\
}';



pk2_head = document.getElementsByTagName('head')[0];
pk2_style = document.createElement('style');
pk2_style.type = 'text/css';
if (pk2_style.styleSheet) {
     pk2_style.styleSheet.cssText = pk2_stext;
} else {
    if (pk2_style.innerText == '') {
	pk2_style.innerText = pk2_stext;
    } else {
	pk2_style.innerHTML = pk2_stext;
    }
}
pk2_head.appendChild(pk2_style);


//aWindow.pk2_getValue(aWindow.pk2_pre+'odev_list');
//aWindow.setTimeout(function() {eval(aWindow.pk2_abyrvalg)},500);
aWindow.my_name_is();



aWindow.pk2_odev_spam();


//prosto_veschi_max=7;\
/*    else if (aWindow.winfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.winfo);
    }
*/

// ================== TABELA WYNIKÓW == START ==================
// nagłówek tabeli, sortowanie
aWindow.pk2_reporter2 = function(){
    grgr = '';
    aWindow.pk2_process=false;
    new aWindow.HumanMessage('Trwa generowanie listy wyników, proszę czekać...', {type: 'success'});
// sortowanie
    grsort = '<table style="position:absolute; top:28px; z-index:10; background-color:#D3C5AD; width:' + (aWindow.pk2_w1 - 52) + 'px; border-bottom:2px solid; height:25px;" cellpadding="0" cellspacing="0"><tbody>'; // (czerwony) bgcolor="#f15959"
		grsort += '<tr>';
		grsort += '<td style=\"vertical-align:middle; padding:5px; text-align:center; \"><strong>Sortowanie: </strong></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:5px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'name\', pk2_bezto);\">Nazwa</a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding2; text-align:center;\"><a href=\"javascript:pk2_sortir(\'malus\', pk2_bezto);\"><img src=\"images/task_points/minus.png\" width="20" height="20" title=\"Trudność\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'to\', pk2_bezto);\"><img src=\"images/task_points/equal.png\" width="20" height="20" title=\"Punkty Pracy\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'d0\', pk2_bezto);\"><img src=\"images/job/dollar.png\" width="20" height="20" title=\"Zarobek\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'o0\', pk2_bezto);\"><img src=\"images/job/experience.png\" width="20" height="20" title=\"Doświadczenie\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
        grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'v0\', pk2_bezto);\"><img src=\"images/job/luck.png\" width="20" height="20" title=\"Szczęście\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
        grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'boom\', pk2_bezto);\"><img src=\"images/job/danger.png\" width="20" height="20" title=\"Niebezpieczeństwo\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a title=\"Zarobk z PP\" href=\"javascript:pk2_sortir(\'dt\', pk2_bezto);\"><img style=\"width:20px; height:20px;\" src=\"images/job/dollar_bonus.png\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a title=\"Zarobek i doświadczenie\" href=\"javascript:pk2_sortir(\'do\', pk2_bezto);\"><img style=\"width:20px; height:20px;\" src=\"images/job/dollar.png\" /><img style=\"width:20px; height:20px; margin-left:-5px;\" src=\"images/job/experience.png\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a title=\"Zarobek i szczęscie\" href=\"javascript:pk2_sortir(\'dv\', pk2_bezto);\"><img style=\"width:20px; height:20px;\" src=\"images/job/dollar.png\" /><img style=\"width:20px; height:20px; margin-left:-5px;\" src=\"images/job/luck.png\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a title=\"Szczęscie i doświadczenie\" href=\"javascript:pk2_sortir(\'ov\', pk2_bezto);\"><img style=\"width:20px; height:20px;\" src=\"images/job/luck.png\" /><img style=\"width:20px; height:20px; margin-left:-5px;\" src=\"images/job/experience.png\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a title=\"Zarobek, szczęscie i doświadczenie\" href=\"javascript:pk2_sortir(\'dov\', pk2_bezto);\"><img style=\"width:20px; height:20px;\" src=\"images/job/dollar.png\" /><img style=\"width:20px; height:20px; margin-left:-5px;\" src=\"images/job/luck.png\" /><img style=\"width:20px; height:20px; margin-left:-5px;\" src=\"images/job/experience.png\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
        grsort += '<td style=\"vertical-align:middle; padding:0px; text-align:center; \"><span title=\"Filtr. Po wpisaniu liczby, a następnie kliknięciu któregoś z sortowania zostaną dodane(usunięte) prace o daną liczbę PP.<br />Oznacza to, że jeżeli wpiszemy liczbę dodatnia. Zostaną dopisane prace, które możemy wykonać jeżeli dołożymy punkty pracy. Analogicznie jeżeli wpiszemy liczbę ujemną, zostaną usunięte prace, które mają mniej PP niż wpisana liczba ujemna)\"><input type=\"text\" size=\"4\" value=\"'+aWindow.pk2_bezto+'\" ';
        grsort += 'onchange=\"javascript:pk2_bezto=parseInt(value, 10);\">&laquo;PP&raquo;</span></td>';
      grsort += '</tr>';
    grsort += '</tbody></table>';
    grgr += grsort;
    // /sortowanie
    grgr +='<table style=\"width:100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>';
      // lista prac i ekwipunku
      if (aWindow.pk2_khochuka.length > 0){
        grgr += '<tr><td colspan="2">';
        grgr += '<a href=\"javascript:pk2_hideraboty(0);\">Powrót do wszystkich prac</a><br />';
        if (aWindow.pk2_khochuka.length > 1){
            grgr += '<select title=\"Wybierz przedmiot i spradz co wnosi do danej pracy (jeżeli wnosi)\" class=\"pk2_sel" onchange=\"javascript:pk2_vesch_polezna(value);\">';
            grgr += '<option value=\"0\">Wybierz przedmiot z listy</option>'
            for (kh in aWindow.pk2_khochuka){
                grgr += '<option value=\"'+kh+'\">'+aWindow.items[kh].name+'</option>';
            }
            grgr += '</select>';
        }
        for (kh in aWindow.pk2_khochuka){
        if (aWindow.pk2_khochuka[kh]){
            grgr += '<table cellpadding=\"2\" cellspacing=\"2\"><tr><td>';
            grgr+='<div style=\"display:inline; float:left;\">';
            vesch = aWindow.items[kh];
            grgr+='<a class=\"tt2\" href=\"javascript:pk2_hideraboty('+kh+');\" ><span><b>'+vesch.name+':</b>';
            if (vesch.set.key){
                grgr += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a>'
            grgr +='</div>';
            rere = ((kh < 400) || (kh >= 500)) ? '&raquo; użyto ' : '&raquo; wybrano ';
            grgr +='W dostępnych pracach:' + aWindow.chislo_rabot_to + '; &laquo;'+vesch.name+rere+ aWindow.khoroshi_to[kh] +' razy.<br />';
            grgr +='We wszystkich pracach:' + aWindow.chislo_rabot + '; &laquo;'+vesch.name+rere+ aWindow.khoroshi[kh] +' razy.';
            grgr += '</td></tr></table>';
        }}
        grgr += '<hr>';
        grgr += '</td></tr>';
      }
      // определённая вещь конец
      for (ii = 0; ii < aWindow.pk2_sortrab.length; ++ii){                 // вывод нескольких работ начало
          if (!aWindow.pk2_hiderab[aWindow.pk2_sortrab[ii].index]){
              grgr += aWindow.pk2_htmlrab[aWindow.pk2_sortrab[ii].index];
        grgr += '<tr><td colspan="2"><hr></td></tr>';
          }
      }                                                                    // вывод нескольких работ конец
    grgr += '</tbody></table>'; // (розовый)
    // niepotrzebny ekwipunek
    if (aWindow.pk2_khlam){
      grgr+='<hr>';
        grgr+='<table bgcolor="#87bee5" style="width:100%"><tbody><tr><th colspan="8" style=\"text-align:center;\">Do tych prac(-y), te przedmioty nie są potrzebne.<br />Można je sprzedać jeśli potrzebujesz pieniędzy</th></tr>';
        grgr+='<tr>';
        babosy=0;
        tdcount=0;
        for (tid in aWindow.pk2_nenuzhnoe){
            grgr+='<td>';
            vesch = aWindow.items[tid];
            grgr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+'</b>';
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" style="margin-right:0px; margin-left:0px; margin-top:0px; margin-bottom:0px;"><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a></td>';
            if (++tdcount==8){
                grgr+='</tr><tr>';
                tdcount=0;
            }
            babosy += vesch.price;
        }
        grgr+='</tr><tr><th colspan=\"8\" style=\"text-align:center;\">';
        grgr +='Wartość sprzedaży u handlarza: '+babosy / 2+'$';
        grgr+='</th></tr></tbody></table>';
    }
    // лишние вещи конец
    document.getElementById('pk2_window_content').innerHTML=grgr;
    aWindow.pk2_process=false;
}

// Wyświetla kistę przedmiotów
aWindow.pk2_res2html = function (){
    count_rab=0;
    aWindow.pk2_htmlrab=[];
    while (count_rab < 255){
        if (!(aWindow.porabotaj[count_rab]&&aWindow.resultaty[count_rab])){
            ++count_rab;
            continue;
        }
        // вторая строка после заголовка начало
        ihtm = '';
          rabota = aWindow.raboty[count_rab];
          ihtm+='<tr>';
          ihtm += '<tr><td colspan="3"><strong>'+rabota.rus_name+'</strong></td></tr>'; // tytuł pracy
          ihtm+='</tr><tr>';
          ihtm+='<td>'; // начало работы!!!!
            // работы описание начало
            ihtm += '<table width="172"><tbody>'; // картинка название работы и продукты начало (морской) bgcolor="#43a990"
              // картинка названия работы   
              ihtm += '<tr><td width="65">';
              if ((count_rab > 150)&&(count_rab <= 170)){
                  // "vs"
                  ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                  ihtm += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
              }
              // всё кроме "vs"
              else if (count_rab == 141){
                       // "Передвижение"
                       ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                       ihtm += '<img src=\"images/fingerboard/fingerboard.png\" width="63" height="63"';
                       ihtm += ' alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
                   }
                   // "все работы" "Строительство" "СОН-жизнь" "форты"
                   else{
                       ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                       ihtm += '<img src=\"';
                       if (count_rab<=131){
                           // "все работы" "Строительство" "СОН-жизнь"
                           ihtm += 'images/jobs/';
                       }
                       // "forty"
					   //else if (count_rab>132 && count_rab<141){
                       else if (count_rab>200){
                           ihtm += 'images/fort/battle/button_';
                       }
                       ihtm +=rabota.name+'.png\" width="63" height="63" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
                   };
              ihtm += '</td>';
              // produkty
              ihtm += '<td>';
              rres = rabota.resultaty;
              for (ri in rres.produkty){
                ihtm+='<div style=\"display:inline; float:left; margin: 1px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
                ihtm+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
                ihtm+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_pk2\">'+rres.produkty[ri]+'%</div>';
                ihtm+='</div>';
              }
              ihtm += '</td></tr>';
            ihtm += '</tbody></table>'; // название работы и продукты конец (морской)
            // работы описание конец
          ihtm += '<td>'; // характеристики и вещи начало
            ihtm += '<table><tbody>'; // характеристики и вещи начало (оранжевый) bgcolor="#e59d2b"
              ihtm += '<tr>'; // характеристики начало
                ihtm += '<td width="220">'; // ТО начало
                  // все работы, сон, строительство, война (кроме форта и передвижения)
                  if ((count_rab<=131)||(count_rab>141)){
                    ihtm += '<span title=\"Punkty umiejętności\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value" style="text-align:center;">';
                    ihtm += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
                    ihtm += '<span title=\"Punkty z zestawów\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
                    ihtm += '<span title=\"Trudność pracy\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
                    ihtm += '<span title=\"Punkty Pracy\" class="calculation_visualisation img_equal" style="margin-right:0px; margin-left:0px;">';
                    ihtm += '<span class="skill_box_value" style="text-align:center; color:';
                    ihtm += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
                    ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
                  }
                  // fort
                  else if (count_rab!=141){
                         ihtm += '<span title=\"Bonus celności\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         ihtm += '<span class="skill_box_value red_text" style="text-align:center;">';
                         var vvv = aWindow.resultaty[count_rab].to-aWindow.resultaty[count_rab].ton;
                         vvv = Math.round(vvv*10)/10;
                         ihtm += vvv+'</span></span>';
                         ihtm += '<span title=\"Bonus uniku\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
                         ihtm += '<span title=\"Suma bonusów\" class="calculation_visualisation img_equal" style="margin-right:0px; margin-left:0px;">';
                         ihtm += '<span class="skill_box_value" style="text-align:center; color:rgb(255,255,255)';
                         ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
                       }
                       // przemieszczanie się
                       else{
                         //ihtm += '<span title=\"Bonus szybkości\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         //ihtm += '<span class="skill_box_value green_text" style="text-align:center;">х'+aWindow.resultaty[count_rab].ton+'</span></span>';
                         ihtm += '<span title=\"Szybkość\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
                         ihtm += '<span class="skill_box_value" style="text-align:center; ">'+Math.round(aWindow.resultaty[count_rab].to)+'%</span></span>';
                       }
                ihtm += '</td>'; // ТО конец
                ihtm += '<td>'; // НАВЫКИ начало
                  brbr = 0;
                  for (jj in aWindow.rabnavyki[count_rab]){
                    for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                      //if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                      ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                      ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: 0px; margin-top: 0px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                      ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                      ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                      ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                      ihtm += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                      ihtm += '</a>';
                    }
                  }
                ihtm += '</td>'; // НАВЫКИ конец
              ihtm += '</tr>'; // характеристики конец
            ihtm += '</tbody></table>'; // характеристики и вещи конец  (оранжевый)
          ihtm += '</td>'; // характеристики и вещи конец
//===================
              ihtm += '<tr>'; // характеристики работы начало
              ihtm += '<td colspan="2">';
                ihtm += '<table><tbody>'; //(голубой) bgcolor="#D3EDF6"
                  barWidth = 75; // ширина бара
                ihtm += '<tr>';
                      ihtm += '<td>'; // кнопки начало
                        ihtm += '<div style=\"display:inline; float:left;\"><table>'; // (жёлтый) bgcolor="#d3d45c"
                        ihtm += '<td><a href="javascript:pk2_auto_odev(\'n\','+count_rab+');void(0);" title="Ubierz się w wybrane ubrania" >';
                        ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -104px -51px" >';
                        ihtm += '</a></td>';
                        ihtm += '<td><a href="javascript:pk2_odev_add(\'n\','+count_rab+');void(0);" title="Dopisz zestaw do szafy" >';
                        ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -104px -126px" >';
                        ihtm += '</a></td>';
                        ihtm += '<td><a href="javascript:pk2_odev_remove(\'n\','+count_rab+');void(0);" title="Usuń zestaw z szafy" >';
                        ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -129px -101px" >';
                        ihtm += '</a></td>';
                        ihtm += '</table></div>';
                      ihtm += '</td>'; // кнопки конец
                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/dollar.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.dengi*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.dengi+'%</div></div>';
                    ihtm += '<span>Zarobek:'+rres.dengi+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Zarobek
                  var pk2_Do = 0;
                  if ((count_rab<=124)&&(aWindow.resultaty[count_rab].to > 0)){
                    pk2_Do = (180*rres.dengi/100+10)*Math.pow(aWindow.resultaty[count_rab].to,0.2);
                    pk2_Do = Math.round(pk2_Do);
                  }
                  ihtm += '<td width="45">';
                    ihtm += '<b>'+pk2_Do + ' $</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/experience.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.opyt*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.opyt+'%</div></div>';
                    ihtm += '<span>Doświadczenie:'+rres.opyt+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Doświadczenie
                  var pk2_XP = rres.opyt*120/60;
                  pk2_XP = Math.round(pk2_XP);
                  ihtm += '<td width="45">';
                    ihtm += '<b>'+pk2_XP + ' XP</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/luck.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.vezenie+'%</div></div>';
                    ihtm += '<span>Szczęscie:'+rres.vezenie+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Szczęscie
                  var pk2_Ud = 0;
                  if ((count_rab<=124)&&(aWindow.resultaty[count_rab].to > 0)){
                    pk2_Ud = (1350*rres.vezenie/100+75)*Math.pow(aWindow.resultaty[count_rab].to,0.2);
                    //pk2_Ud = Math.floor(pk2_Ud);
                  }
                  ihtm += '<td width="100">';
                    ihtm += '<b>'+Math.floor(pk2_Ud/3) + '-' + Math.floor(pk2_Ud) + ' ($)</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/danger.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_brown" style="width: '+Math.round(rres.boom*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.boom+'%</div></div>';
                    ihtm += '<span>Niebezpieczeństwo:'+rres.boom+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Niebezpieczeństwo
                  ihtm += '<td width="45">';
                    ihtm += '  ';
                  ihtm += '</td>';

                ihtm += '</tr>';
                ihtm += '</tbody></table>'; //(голубой)
              ihtm += '</td>';
              ihtm += '</tr>'; // характеристики работы конец
//===================
              ihtm += '<tr>'; // вещи начало
                ihtm += '<td colspan="2">';
                  ihtm += '<table><tbody>'; // кнопки и вещи начало (салатовый) bgcolor="#6ad45c"
                    ihtm += '<tr>';
                      ihtm += '<td>'; // вещи начало
					  sumprice = 0;
                        for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                          sid = aWindow.resultaty[count_rab].items[ee].tid;
                          if (sid){
                            // подсказка вещи
                            ihtm+='<div style=\"display:inline; float:left;\">';
                            vesch = aWindow.items[sid];
                            ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty[count_rab].items[ee].bon;
                            if (vesch.set.key){
                              ihtm += '<br /><em>'+vesch.set.name+'</em>';
                            }
                            for (ind in vesch.bonus.attributes){
                              ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                            }
                            for (ind in vesch.bonus.skills){
                              ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                            }
                            if (aWindow.resultaty[count_rab].items[ee].price > 0){
                              ihtm += aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$';
                            }
                            ihtm += '</span>'
                            // вещь
                            if (aWindow.resultaty[count_rab].items[ee].price > 0){
							  
                              ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                              ihtm+='<div class="bag_item_count"><p style="text-align:center; color:red;">'+aWindow.resultaty[count_rab].items[ee].bon+'</p></div><p style="text-align: center; border: 1px solid black; background-color: gray; margin: 0pt 5px; color: blue;">'+aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$</p></div>'
							  price = aWindow.resultaty[count_rab].items[ee].price;
							  sumprice = sumprice + price;
                              ihtm+='</a>'
                            }
                            else {
                              ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                              ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty[count_rab].items[ee].bon+'</p></div></div>'
                              ihtm+='</a>'
                            }
                            // цена вещи подписать под вещью
                            //if (aWindow.resultaty[count_rab].items[ee].price > 0){
                            //    ihtm+='<br />';
                            //    ihtm +='<span style=\"text-align:center; color:red\">'+aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$</span>';
                            //}
                            ihtm +='</div>';
                            //ihtm +='';
                          }
                        }
					  if (sumprice>0){
					    ihtm += '<div style="font-weight: bold; font-size: large; float: right;">'+sumprice+'&nbsp;$</div>';
						}
					  ihtm += '</td>'; // вещи конец
                    ihtm += '</tr>';
                  ihtm += '</tbody></table>'; // кнопки и вещи конец (салатовый)
                ihtm += '</td>';
              ihtm += '</tr>'; // вещи конец
//===================
          ihtm+='</td></tr>'; // конец работы!!!!

// закомментил, сам не знаю что это такое, но вроде пока всё работает (похоже как на недоделанный расчёт передвижения и фортов) НАЧАЛО
/*

        if (aWindow.resultaty_z[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+bonusy\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_z[count_rab].zas+'</span></span>';
    		ihtm += '<span title=\"PP\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (aWindow.resultaty_z[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+aWindow.resultaty_z[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in aWindow.rabnavyki_z[count_rab]){
                for (aa = aWindow.rabnavyki_z[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki_z[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_z[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr><tr><td colspan=\"2\">';

		ihtm += '<div style=\"display:inline; float:left;\"><table>';
		ihtm += '<tr><td><a href="javascript:pk2_auto_odev(\'z\','+count_rab+');void(0);" title="Одеваемся" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -105px -52px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:pk2_odev_add(\'z\','+count_rab+');void(0);" title="Сохранить" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -105px -127px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:pk2_odev_remove(\'z\','+count_rab+');void(0);" title="Удалить" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -130px -102px" >';
		ihtm += '</a></td></tr>';
		ihtm += '</table></div>';

            for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                sid = aWindow.resultaty_z[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_z[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty_z[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (aWindow.resultaty_z[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty_z[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }
        
        if (aWindow.resultaty_r[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+навыки\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_r[count_rab].speed+'%</span></span>';
    		ihtm += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (aWindow.resultaty_r[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+aWindow.resultaty_r[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in aWindow.rabnavyki_r[count_rab]){
                for (aa = aWindow.rabnavyki_r[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki_r[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_r[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr>';

     // кнопки тут были уже перенесли!!!!
                      ihtm += '<td width="25">'; // кнопки начало
                        ihtm += '<div style=\"display:inline; float:left;\"><table>';
                        ihtm += '<tr><td><a href="javascript:pk2_auto_odev(\'r\','+count_rab+');void(0);" title="Одеваемся" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -103px -50px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '<tr><td><a href="javascript:pk2_odev_add(\'r\','+count_rab+');void(0);" title="Сохранить" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -103px -125px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '<tr><td><a href="javascript:pk2_odev_remove(\'r\','+count_rab+');void(0);" title="Удалить" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -128px -100px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '</table></div>'; // (жёлтый)
                      ihtm += '</td>'; // кнопки конец
     // кнопки тут были уже перенесли!!!!

            for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                sid = aWindow.resultaty_r[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_r[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty_r[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (aWindow.resultaty_r[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty_r[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }
*/        
// закомментил, сам не знаю что это такое, но вроде пока всё работает (похоже как на недоделанный расчёт передвижения и фортов) КОНЕЦ

        aWindow.pk2_htmlrab[count_rab]=ihtm;
        ++count_rab;
    }
}

//=====
// свернуть "Окно настроек"
aWindow.pk2_minimize_title = function(){
	if (aWindow.pk2_title_flag2 == 1) {
    	aWindow.pk2_title_flag2 = 0;
		document.getElementById('pk2_title_content_row').style.display = 'none';
		document.getElementById('pk2_title_cap').style.display = 'none';
		document.getElementById('pk2_form0').style.width = '200px';
	}
	else {
		aWindow.pk2_title_flag2 = 1;
		document.getElementById('pk2_title_content_row').style.display = 'table-row';
		document.getElementById('pk2_title_cap').style.display = 'inline';
		document.getElementById('pk2_form0').style.width = aWindow.pk2_w0+'px';
	}
}

// Закрыть "Окно настроек"
aWindow.pk2_close_title = function(){
	document.getElementById('pk2_title').style.display='none';
}

//===
aWindow.pk2_stretch_title = function(){
    var nv;
    if (aWindow.pk2_title_flag == 1) {
        aWindow.pk2_title_flag = 0;
        nv = aWindow.pk2_title_h_mid + 'px';
    }
    else {
        aWindow.pk2_title_flag = 1
        nv = aWindow.pk2_title_h_max + 'px';
    }
    document.getElementById('pk2_title_content').style.height = nv;
}

//===
aWindow.pk2_close_shmot = function(){
    rm = document.getElementById('pk2_shmot');
    document.body.removeChild(rm);
}

//===
aWindow.pk2_vselect = function (chk){
	if (chk) {
		document.getElementById('pk2_vselect').innerHTML=aWindow.pk2_mulselect+aWindow.pk2_conselect;
		/*document.getElementById('pk2_sk_rabot').innerHTML='Несколько работ';*/
	}
	else{
		document.getElementById('pk2_vselect').innerHTML=aWindow.pk2_simselect+aWindow.pk2_conselect;
		/*document.getElementById('pk2_sk_rabot').innerHTML='Одна работа&nbsp;&nbsp;&nbsp;&nbsp;';*/
	}
}

// свернуть "Окно данных"
aWindow.pk2_minimize_window = function(){
	if (aWindow.pk2_window_flag2 == 1) {
		aWindow.pk2_window_flag2 = 0;
		document.getElementById('pk2_window_content_row').style.display = 'none';
		document.getElementById('pk2_window_bottom').style.display = 'none';
		document.getElementById('pk2_window_cap').style.display = 'none'
		document.getElementById('pk2_win1').style.width = '100px';
	}
	else {
		aWindow.pk2_window_flag2 = 1;
		document.getElementById('pk2_win1').style.width = aWindow.pk2_w1+'px';
		document.getElementById('pk2_window_bottom').style.display = 'table-row';
		document.getElementById('pk2_window_content_row').style.display = 'table-row';
		document.getElementById('pk2_window_cap').style.display = 'inline';
	}
}

// Закрыть "Окно данных"
aWindow.pk2_close_window = function(){
	document.getElementById('pk2_window').style.display='none';
}

// Окно "нехватки предмета в базе данных"
aWindow.pk2_error_window = function(err){
	document.getElementById('pk2_window_content').style.height = parseInt((aWindow.pk2_window_h_max*3)/5, 10) + 'px';
	pk2_err = document.getElementById('pk2_window_error');
	pk2_err.style.height = parseInt((aWindow.pk2_window_h_max*2)/7, 10) + 'px';
	pk2_err.style.display='block';
	htm = '<hr><div style=\"font-weight:bold; color:black; text-align:center;\" >Dane te należy przesłać do: '+przy_link+'<br />'; 
	htm += '<textarea style=\"margin: 5px;\" readonly=\"readonly\" cols=\"90\" rows=\"7\">';
	htm += err;
	htm += '</textarea></div>';
	pk2_err.innerHTML = htm;
}

// функция создания "Окно данных"
aWindow.pk2_show_window = function(){
    pk2_window = document.getElementById('pk2_window');
    html1='';
    if (!pk2_window){
	html1 += '<div id=\"pk2_win1\" style=\"width:' + aWindow.pk2_w1 + 'px; text-align:left;\">\n';
	html1 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
	html1 += '<tr>';
	html1 += '<td class=\"gran_vl\" />\n';
	html1 += '<td class=\"gran_v\" />\n';
	html1 += '<td class=\"gran_vp\" />\n';
	html1 += '</tr><tr>\n';
	html1 += '<td class=\"gran_l\" />\n';
	html1 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
	html1 += '<span>';
	html1 += '<a href=\"javascript:pk2_minimize_window();\"' + aWindow.pk2_tlink + ' title=\"Minimalizuj okno\">&nbsp;_&nbsp;</a>&nbsp;';
	html1 += '&nbsp;&nbsp;&nbsp;&nbsp;';
	html1 += '<a href=\"javascript:pk2_close_window();\"' + aWindow.pk2_tlink + ' title=\"Zamknij okno\">&nbsp;X&nbsp;</a>&nbsp;';
	html1 += '</span>';
		html1 += '<span id=\"pk2_window_cap\">Wyniki</span>';
		html1 += '</td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr id=\"pk2_window_content_row\">\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td id=\"pk2_window_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.pk2_w1 - 12) + 'px;\" >';
		html1 += '<div id=\"pk2_window_content\" style=\"overflow: auto; height: ' + aWindow.pk2_window_h_max + 'px; width' + (aWindow.pk2_w1 - 40) + 'px; margin-top:27px; margin-left:20px; margin-right:20px;\">';
		html1 += '</div><div id=\"pk2_window_error\" style=\"border: 2px; overflow: auto; display: none; \">';
		html1 += '</div></td><td class=\"gran_p\" />\n';
		html1 += '</tr><tr id=\"pk2_window_bottom\">\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td style=\"background-color:#D3C5AE; text-align:center\">\n';
		html1 += '<span style=\"\">Uważasz że warto mi postawić piwo lub kawę, kliknij przycisk. </span>\n';
		html1 += '<form action=\"https://www.paypal.com/cgi-bin/webscr\" method=\"post\">\n';
		html1 += '<input type=\"hidden\" name=\"cmd\" value=\"_s-xclick\" />\n';
		html1 += '<input type=\"hidden\" name=\"hosted_button_id\" value=\"WTP9QLYFZPMU8\" />\n';
		html1 += '<input type=\"image\" src=\"https://www.paypal.com/pl_PL/PL/i/btn/btn_donate_SM.gif\" border=\"0\" name=\"submit\" alt=\"PayPal — Płać wygodnie i bezpiecznie\" />\n';
		html1 += '<img alt=\"\" border=\"0\" src=\"https://www.paypal.com/pl_PL/i/scr/pixel.gif\" width=\"1\" height=\"1\" />\n';
		html1 += '</form>\n';
		html1 += '</td>\n';
		html1 += '<td class=\"gran_p\" />\n';
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_nl\" />\n';
		html1 += '<td class=\"gran_n\" />\n';
		html1 += '<td class=\"gran_np\" />\n';
		html1 += '</tr></tbody>\n';
		html1 += '</table>\n';
		html1 += '</div>';
		pk2_window = document.createElement('div');
		pk2_window.id = 'pk2_window';
		pk2_window.innerHTML = html1;
		pk2_window.setAttribute('style', 'position: absolute; left: ' + aWindow.pk2_l1 + 'px; top: ' + aWindow.pk2_t1 + 'px; z-index:250');
		document.body.appendChild(pk2_window);
	}
	pk2_window.style.display = 'block';
	if (aWindow.pk2_window_flag2 == 0){
	    aWindow.pk2_minimize_window();
	}
}