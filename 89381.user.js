// ==UserScript==
// @name           Lepszy ekwipunek by Darius II( traduzido por : SatanicK)
// @namespace      www.gotowe-esklepy.pl
// @description    Skrypt pomaga dopasować ekwipunek, do konkretnych zadań, prac itp.
// @version        2.82
// @include        *.the-west.*
// @exclude        www.the-west.*
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/67096.meta.js?interval=1&show
// ==/UserScript==

// source luchshie veshi - ver2 by Storan
function getMoCheckVersion() {
	return "2.82";
}

function getAuthor() {
	var hrefStr = '';
	switch(window.location.hostname.substr(0,window.location.hostname.search(/\./))) {
		case 'pl1':
		case 'pl9':
		case 'pl10':
		case 'pl11':
		case 'pl12':
		case 'pl13':
		case 'pl14':
			hrefStr = 'javascript:AjaxWindow.show(\'profile\',{char_id:845806},\'845806\');';
			win_op = '';
			break;
		case 'w1':
			hrefStr = 'javascript:AjaxWindow.show(\'profile\',{char_id:8580},\'8580\');';
			win_op = '';
			break;
		default:
			hrefStr = 'http://userscripts.org/users/128276';
			win_op = 'target=\'_blank\'';
	}
	return '&nbsp;<a href=\"' + hrefStr + '\" style=\"color:yellow\"' + win_op + '>Darius II</a>';
}

function getUser() {
	var users = '';
	var thisuser = Character.playerId;
	alert(thisuser);
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


aWindow = (unsafeWindow) ? unsafeWindow : window;

//szerokość okien
aWindow.bi2_w0=400;
aWindow.bi2_w1=900;
// dla szerokości okna, 1024  
/*
bi2_l0=322; bi2_t0=-14;
*/


aWindow.bi2_l0 = (window.innerWidth) ? (window.innerWidth-aWindow.bi2_w0)/2 : (1024-aWindow.bi2_w0) /2 ;
aWindow.bi2_t0=-5;
aWindow.bi2_l1 = (window.innerWidth) ? (window.innerWidth-aWindow.bi2_w1)/2 : (1024-aWindow.bi2_w1) /2 ;
aWindow.bi2_t1=25;


//wysokość okien
aWindow.bi2_title_h_min=25;
aWindow.bi2_title_h_mid=70;
aWindow.bi2_title_h_max=375;
aWindow.bi2_window_h_min=25;
aWindow.bi2_window_h_max= (window.innerHeight-100);



aWindow.bi2_tlink=' style=\"color:white; display:block; width:25px; height:20px; float:left;\" ';
aWindow.bi2_vblock=' style=\"border:1px solid black; padding:1px; marging:1px;\" ';
aWindow.bi2_title_flag=0;
aWindow.bi2_title_flag2=1;
aWindow.bi2_window_flag2=1;
aWindow.bi2_odevalo4ka = true;

bi2_code='';



bi2_code += "\n\
bi2_zaschitato=1;\n\
bi2_import=false;\n\
bi2_khlam=false;\n\
ezda=false;\n\
zaschita=null;\n\
bi2_millioner=false;\n\
bi2_process=false;\n\
bi2_zdorov=0;\n\
bi2_count_inv=0;\n\
bi2_odev_count=0;\n\
bi2_odev_id=0;\n\
bi2_odev_type=0;\n\
bi2_odev_time=500;\n\
bi2_odev_rep=20;\n\
bi2_odev_var='n';\n\
bi2_odev_rab=0;\n\
bi2_odev_item=0;\n\
bi2_odev_list={};\n\
bi2_odev_stat=true;\n\
bi2_loc = location.host.substr(0,2);\n\
\n\
einfo='';\n\
winfo='';\n\
\n\
bi2_types=['right_arm', 'left_arm', 'head', 'body', 'foot', 'neck', 'animal', 'yield'];\n\
nabory=['set_farmer', 'set_mexican', 'set_indian', 'set_quackery', 'set_pilgrim_male', 'set_pilgrim_female', 'set_gentleman', 'set_dancer', 'fireworker_set', 'gold_set'];\n\
\n\
bi2_predmetov = {};\n\
bi2_uchet=[];\n\
bi2_uchet_shop=[];\n\
bi2_aktiv=[];\n\
bi2_nenuzhnoe=[];\n\
irabota=0;\n\
bi2_inv_imported=false;\n\
bi2_slots={};\n\
bi2_equipment={};\n\
for (ii=0;ii<bi2_types.length;++ii) {bi2_equipment[bi2_types[ii]]=0};\n\
";



bi2_code += "\n\
items=[];\n\
\n\
items[0] = {item_id:0, nshort:'nothing', name:'заглушка', type:'yield', level:0, price:0, image:'images/items/right_arm/right_arm_blank.png?1', image_mini:'images/items/right_arm/mini/right_arm_blank.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};\n\
\n\
items[1] = {item_id:1, nshort:'clayjug', name:'Rozbity dzban', type:'right_arm', level:2, price:16, image:'images/items/right_arm/clayjug.png?1', image_mini:'images/items/right_arm/mini/clayjug.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[2] = {item_id:2, nshort:'winebottle', name:'Rozbita butelka po winie', type:'right_arm', level:5, price:26, image:'images/items/right_arm/winebottle.png?1', image_mini:'images/items/right_arm/mini/winebottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[3] = {item_id:3, nshort:'whiskeybottle', name:'Rozbita butelka po whisky', type:'right_arm', level:7, price:40, image:'images/items/right_arm/whiskeybottle.png?1', image_mini:'images/items/right_arm/mini/whiskeybottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[4] = {item_id:4, nshort:'rotty_club', name:'Złamany kij', type:'right_arm', level:7, price:26, image:'images/items/right_arm/rotty_club.png?1', image_mini:'images/items/right_arm/mini/rotty_club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[5] = {item_id:5, nshort:'club', name:'Kij', type:'right_arm', level:10, price:63, image:'images/items/right_arm/club.png?1', image_mini:'images/items/right_arm/mini/club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[6] = {item_id:6, nshort:'nail_club', name:'Kij z gwoździem', type:'right_arm', level:13, price:125, image:'images/items/right_arm/nail_club.png?1', image_mini:'images/items/right_arm/mini/nail_club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[7] = {item_id:7, nshort:'rusty_razor', name:'Rdzawa brzytwa', type:'right_arm', level:12, price:64, image:'images/items/right_arm/rusty_razor.png?1', image_mini:'images/items/right_arm/mini/rusty_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[8] = {item_id:8, nshort:'razor', name:'Brzytwa', type:'right_arm', level:15, price:146, image:'images/items/right_arm/razor.png?1', image_mini:'images/items/right_arm/mini/razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[9] = {item_id:9, nshort:'sharp_razor', name:'Ostra brzytwa', type:'right_arm', level:18, price:354, image:'images/items/right_arm/sharp_razor.png?1', image_mini:'images/items/right_arm/mini/sharp_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10] = {item_id:10, nshort:'figaros_razor', name:'Brzytwa Figara', type:'right_arm', level:25, price:1740, image:'images/items/right_arm/figaros_razor.png?1', image_mini:'images/items/right_arm/mini/figaros_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, aim:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[11] = {item_id:11, nshort:'rusty_skewer', name:'Rdzawy sztylet', type:'right_arm', level:17, price:122, image:'images/items/right_arm/rusty_skewer.png?1', image_mini:'images/items/right_arm/mini/rusty_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[12] = {item_id:12, nshort:'skewer', name:'Sztylet', type:'right_arm', level:20, price:384, image:'images/items/right_arm/skewer.png?1', image_mini:'images/items/right_arm/mini/skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[13] = {item_id:13, nshort:'sharp_skewer', name:'Ostry sztylet', type:'right_arm', level:23, price:554, image:'images/items/right_arm/sharp_skewer.png?1', image_mini:'images/items/right_arm/mini/sharp_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[14] = {item_id:14, nshort:'codys_skewer', name:'Sztylet Cody`ego', type:'right_arm', level:30, price:2600, image:'images/items/right_arm/codys_skewer.png?1', image_mini:'images/items/right_arm/mini/codys_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:4, punch:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[15] = {item_id:15, nshort:'rusty_bowie', name:'Zardzewiała finka', type:'right_arm', level:27, price:450, image:'images/items/right_arm/rusty_bowie.png?1', image_mini:'images/items/right_arm/mini/rusty_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[16] = {item_id:16, nshort:'bowie', name:'Finka', type:'right_arm', level:30, price:850, image:'images/items/right_arm/bowie.png?1', image_mini:'images/items/right_arm/mini/bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[17] = {item_id:17, nshort:'sharp_bowie', name:'Ostra finka', type:'right_arm', level:33, price:1220, image:'images/items/right_arm/sharp_bowie.png?1', image_mini:'images/items/right_arm/mini/sharp_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[18] = {item_id:18, nshort:'bowies_knife', name:'Nóż Bowie`ego', type:'right_arm', level:40, price:4600, image:'images/items/right_arm/bowies_knife.png?1', image_mini:'images/items/right_arm/mini/bowies_knife.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[19] = {item_id:19, nshort:'rusty_foil', name:'Rdzawy floret', type:'right_arm', level:32, price:730, image:'images/items/right_arm/rusty_foil.png?1', image_mini:'images/items/right_arm/mini/rusty_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[20] = {item_id:20, nshort:'foil', name:'Floret', type:'right_arm', level:35, price:1134, image:'images/items/right_arm/foil.png?1', image_mini:'images/items/right_arm/mini/foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[21] = {item_id:21, nshort:'sharp_foil', name:'Ostry floret', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/sharp_foil.png?1', image_mini:'images/items/right_arm/mini/sharp_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[22] = {item_id:22, nshort:'sharp_foil', name:'Floret Athosa', type:'right_arm', level:45, price:5774, image:'images/items/right_arm/athos_foil.png?1', image_mini:'images/items/right_arm/mini/athos_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:6, finger_dexterity:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[23] = {item_id:23, nshort:'rusty_machete', name:'Rdzawa maczeta', type:'right_arm', level:37, price:940, image:'images/items/right_arm/rusty_machete.png?1', image_mini:'images/items/right_arm/mini/rusty_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[24] = {item_id:24, nshort:'machete', name:'Maczeta', type:'right_arm', level:40, price:1560, image:'images/items/right_arm/machete.png?1', image_mini:'images/items/right_arm/mini/machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[25] = {item_id:25, nshort:'sharp_machete', name:'Ostra maczeta', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/sharp_machete.png?1', image_mini:'images/items/right_arm/mini/sharp_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[26] = {item_id:26, nshort:'nats_machete', name:'Maczeta Nata', type:'right_arm', level:50, price:6750, image:'images/items/right_arm/nats_machete.png?1', image_mini:'images/items/right_arm/mini/nats_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, leadership:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[27] = {item_id:27, nshort:'rusty_conquistador', name:'Rdzawy miecz konkwisty', type:'right_arm', level:47, price:1710, image:'images/items/right_arm/rusty_conquistador.png?1', image_mini:'images/items/right_arm/mini/rusty_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[28] = {item_id:28, nshort:'conquistador', name:'Miecz konkwisty', type:'right_arm', level:50, price:2560, image:'images/items/right_arm/conquistador.png?1', image_mini:'images/items/right_arm/mini/conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[29] = {item_id:29, nshort:'sharp_conquistador', name:'Ostry miecz konkwisty', type:'right_arm', level:53, price:3370, image:'images/items/right_arm/sharp_conquistador.png?1', image_mini:'images/items/right_arm/mini/sharp_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[30] = {item_id:30, nshort:'henandos_conquistador', name:'Miecz Hernanda de Soto', type:'right_arm', level:50, price:8700, image:'images/items/right_arm/henandos_conquistador.png?1', image_mini:'images/items/right_arm/mini/henandos_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[31] = {item_id:31, nshort:'rusty_tomahawk', name:'Rdzawy tomahawk', type:'right_arm', level:57, price:2900, image:'images/items/right_arm/rusty_tomahawk.png?1', image_mini:'images/items/right_arm/mini/rusty_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[32] = {item_id:32, nshort:'tomahawk', name:'Tomahawk', type:'right_arm', level:60, price:3800, image:'images/items/right_arm/tomahawk.png?1', image_mini:'images/items/right_arm/mini/tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[33] = {item_id:33, nshort:'sharp_tomahawk', name:'Ostry tomahawk', type:'right_arm', level:63, price:4900, image:'images/items/right_arm/sharp_tomahawk.png?1', image_mini:'images/items/right_arm/mini/sharp_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[34] = {item_id:34, nshort:'taschunkas_tomahawk', name:'Tomahawk Tashunka', type:'right_arm', level:70, price:10100, image:'images/items/right_arm/taschunkas_tomahawk.png?1', image_mini:'images/items/right_arm/mini/taschunkas_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5, hide:3, swim:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[35] = {item_id:35, nshort:'rusty_axe', name:'Zardzewiała siekiera drwala', type:'right_arm', level:62, price:3400, image:'images/items/right_arm/rusty_axe.png?1', image_mini:'images/items/right_arm/mini/rusty_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[36] = {item_id:36, nshort:'axe', name:'Siekiera drwala', type:'right_arm', level:65, price:4400, image:'images/items/right_arm/axe.png?1', image_mini:'images/items/right_arm/mini/axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[37] = {item_id:37, nshort:'sharp_axe', name:'Ostra siekiera drwala', type:'right_arm', level:68, price:5600, image:'images/items/right_arm/sharp_axe.png?1', image_mini:'images/items/right_arm/mini/sharp_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[38] = {item_id:38, nshort:'boones_axe', name:'Siekiera Boone', type:'right_arm', level:75, price:10200, image:'images/items/right_arm/boones_axe.png?1', image_mini:'images/items/right_arm/mini/boones_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, build:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[39] = {item_id:39, nshort:'rusty_sabre', name:'Zardzewiała szabla kawaleryjska', type:'right_arm', level:67, price:4200, image:'images/items/right_arm/rusty_sabre.png?1', image_mini:'images/items/right_arm/mini/rusty_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[40] = {item_id:40, nshort:'sabre', name:'Szabla kawaleryjska', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/sabre.png?1', image_mini:'images/items/right_arm/mini/sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[41] = {item_id:41, nshort:'sharp_sabre', name:'Ostra szabla kawaleryjska', type:'right_arm', level:73, price:6350, image:'images/items/right_arm/sharp_sabre.png?1', image_mini:'images/items/right_arm/mini/sharp_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[42] = {item_id:42, nshort:'grants_sabre', name:'Szabla Generała Granta', type:'right_arm', level:80, price:10800, image:'images/items/right_arm/grants_sabre.png?1', image_mini:'images/items/right_arm/mini/grants_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:9}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[43] = {item_id:43, nshort:'screwdriver', name:'Śrubokręt', type:'right_arm', level:10, price:114, image:'images/items/right_arm/screwdriver.png?1', image_mini:'images/items/right_arm/mini/screwdriver.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[44] = {item_id:44, nshort:'spanner', name:'Klucz płaski', type:'right_arm', level:21, price:628, image:'images/items/right_arm/spanner.png?1', image_mini:'images/items/right_arm/mini/spanner.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{build:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[45] = {item_id:45, nshort:'crowbar', name:'Łom', type:'right_arm', level:36, price:1594, image:'images/items/right_arm/crowbar.png?1', image_mini:'images/items/right_arm/mini/crowbar.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[46] = {item_id:46, nshort:'whips', name:'Bicz', type:'right_arm', level:30, price:594, image:'images/items/right_arm/whips.png?1', image_mini:'images/items/right_arm/mini/whips.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[47] = {item_id:47, nshort:'pillow', name:'Pillow', type:'right_arm', level:45, price:450, image:'images/items/right_arm/pillow.png?1', image_mini:'images/items/right_arm/mini/pillow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, shop:'drop'};\n\
\n\
items[50] = {item_id:50, nshort:'goldensable', name:'Złota szabla', type:'right_arm', level:70, price:22500, image:'images/items/right_arm/goldensable.png?1', image_mini:'images/items/right_arm/mini/goldensable.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, punch:8}, attributes:{}}, set:{key:'gold_set', name:'Złoty komplet'}, shop:'drop'};\n\
\n\
items[101] = {item_id:101, nshort:'bow_rusty', name:'Zbutwiały łuk', type:'left_arm', level:5, price:400, image:'images/items/left_arm/bow_rusty.png?1', image_mini:'images/items/left_arm/mini/bow_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[102] = {item_id:102, nshort:'bow_normal', name:'Łuk', type:'left_arm', level:10, price:650, image:'images/items/left_arm/bow_normal.png?1', image_mini:'images/items/left_arm/mini/bow_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[103] = {item_id:103, nshort:'bow_best', name:'Precyzyjny łuk', type:'left_arm', level:13, price:1275, image:'images/items/left_arm/bow_best.png?1', image_mini:'images/items/left_arm/mini/bow_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[104] = {item_id:104, nshort:'crossbow_rusty', name:'Zbutwiała kusza', type:'left_arm', level:10, price:520, image:'images/items/left_arm/crossbow_rusty.png?1', image_mini:'images/items/left_arm/mini/crossbow_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[105] = {item_id:105, nshort:'crossbow_normal', name:'Kusza', type:'left_arm', level:20, price:755, image:'images/items/left_arm/crossbow_normal.png?1', image_mini:'images/items/left_arm/mini/crossbow_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[106] = {item_id:106, nshort:'crossbow_best', name:'Precyzyjna kusza', type:'left_arm', level:23, price:1600, image:'images/items/left_arm/crossbow_best.png?1', image_mini:'images/items/left_arm/mini/crossbow_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[107] = {item_id:107, nshort:'arkebuse_rusty', name:'Zardzewiały arkebuz', type:'left_arm', level:18, price:684, image:'images/items/left_arm/arkebuse_rusty.png?1', image_mini:'images/items/left_arm/mini/arkebuse_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[108] = {item_id:108, nshort:'arkebuse_normal', name:'Arkebuz', type:'left_arm', level:30, price:1070, image:'images/items/left_arm/arkebuse_normal.png?1', image_mini:'images/items/left_arm/mini/arkebuse_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[109] = {item_id:109, nshort:'arkebuse_best', name:'Precyzyjny arkebuz', type:'left_arm', level:33, price:2444, image:'images/items/left_arm/arkebuse_best.png?1', image_mini:'images/items/left_arm/mini/arkebuse_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[110] = {item_id:110, nshort:'blunderbuss_rusty', name:'Zardzewiała strzelba', type:'left_arm', level:20, price:775, image:'images/items/left_arm/blunderbuss_rusty.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[111] = {item_id:111, nshort:'blunderbuss_normal', name:'Puszka', type:'left_arm', level:35, price:1300, image:'images/items/left_arm/blunderbuss_normal.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[112] = {item_id:112, nshort:'blunderbuss_best', name:'Precyzyjna strzelba', type:'left_arm', level:38, price:2950, image:'images/items/left_arm/blunderbuss_best.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[113] = {item_id:113, nshort:'musket_rusty', name:'Zardzewiały muszkiet', type:'left_arm', level:25, price:920, image:'images/items/left_arm/musket_rusty.png?1', image_mini:'images/items/left_arm/mini/musket_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[114] = {item_id:114, nshort:'musket_normal', name:'Muszkiet', type:'left_arm', level:40, price:1580, image:'images/items/left_arm/musket_normal.png?1', image_mini:'images/items/left_arm/mini/musket_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[115] = {item_id:115, nshort:'musket_best', name:'Precyzyjny muszkiet', type:'left_arm', level:43, price:3850, image:'images/items/left_arm/musket_best.png?1', image_mini:'images/items/left_arm/mini/musket_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[116] = {item_id:116, nshort:'flint_rusty', name:'Zardzewiała flinta', type:'left_arm', level:35, price:1350, image:'images/items/left_arm/flint_rusty.png?1', image_mini:'images/items/left_arm/mini/flint_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[117] = {item_id:117, nshort:'flint_normal', name:'Flinta', type:'left_arm', level:50, price:2440, image:'images/items/left_arm/flint_normal.png?1', image_mini:'images/items/left_arm/mini/flint_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[118] = {item_id:118, nshort:'flint_best', name:'Precyzyjna flinta', type:'left_arm', level:53, price:6300, image:'images/items/left_arm/flint_best.png?1', image_mini:'images/items/left_arm/mini/flint_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[119] = {item_id:119, nshort:'shotgun_rusty', name:'Zardzewiała broń śrutowa', type:'left_arm', level:40, price:1600, image:'images/items/left_arm/shotgun_rusty.png?1', image_mini:'images/items/left_arm/mini/shotgun_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[120] = {item_id:120, nshort:'shotgun_normal', name:'Pistolet śrutowy', type:'left_arm', level:55, price:3000, image:'images/items/left_arm/shotgun_normal.png?1', image_mini:'images/items/left_arm/mini/shotgun_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[121] = {item_id:121, nshort:'shotgun_best', name:'Precyzyjna broń śrutowa', type:'left_arm', level:58, price:7000, image:'images/items/left_arm/shotgun_best.png?1', image_mini:'images/items/left_arm/mini/shotgun_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[122] = {item_id:122, nshort:'percussion_rusty', name:'Zardzewiały Karabin Sharpsa', type:'left_arm', level:45, price:2000, image:'images/items/left_arm/percussion_rusty.png?1', image_mini:'images/items/left_arm/mini/percussion_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[123] = {item_id:123, nshort:'percussion_normal', name:'Karabin Sharpsa', type:'left_arm', level:60, price:3800, image:'images/items/left_arm/percussion_normal.png?1', image_mini:'images/items/left_arm/mini/percussion_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[124] = {item_id:124, nshort:'percussion_best', name:'Precyzyjny Karabin Sharpsa', type:'left_arm', level:63, price:8800, image:'images/items/left_arm/percussion_best.png?1', image_mini:'images/items/left_arm/mini/percussion_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[125] = {item_id:125, nshort:'breechloader_rusty', name:'Zardzewiała odtylcówka', type:'left_arm', level:55, price:3150, image:'images/items/left_arm/breechloader_rusty.png?1', image_mini:'images/items/left_arm/mini/breechloader_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[126] = {item_id:126, nshort:'breechloader_normal', name:'Karabin łamany', type:'left_arm', level:70, price:6000, image:'images/items/left_arm/breechloader_normal.png?1', image_mini:'images/items/left_arm/mini/breechloader_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[127] = {item_id:127, nshort:'breechloader_best', name:'Precyzyjna odtylcówka', type:'left_arm', level:73, price:12600, image:'images/items/left_arm/breechloader_best.png?1', image_mini:'images/items/left_arm/mini/breechloader_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[128] = {item_id:128, nshort:'winchester_rusty', name:'Zardzewiały Winchester', type:'left_arm', level:60, price:3900, image:'images/items/left_arm/winchester_rusty.png?1', image_mini:'images/items/left_arm/mini/winchester_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[129] = {item_id:129, nshort:'winchester_normal', name:'Winchester', type:'left_arm', level:75, price:7600, image:'images/items/left_arm/winchester_normal.png?1', image_mini:'images/items/left_arm/mini/winchester_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[130] = {item_id:130, nshort:'winchester_best', name:'Precyzyjny Winchester', type:'left_arm', level:78, price:15400, image:'images/items/left_arm/winchester_best.png?1', image_mini:'images/items/left_arm/mini/winchester_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
\n\
items[132] = {item_id:132, nshort:'bear', name:'Niedźwiedź', type:'left_arm', level:45, price:2600, image:'images/items/left_arm/bear.png?1', image_mini:'images/items/left_arm/mini/bear.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, shop:'drop'};\n\
items[133] = {item_id:133, nshort:'muzzleloader_bowie', name:'Pistolet odprzodowy Bowiego', type:'left_arm', level:30, price:1480, image:'images/items/left_arm/muzzleloader_bowie.png?1', image_mini:'images/items/left_arm/mini/muzzleloader_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
\n\
items[135] = {item_id:135, nshort:'elephantgun', name:'Strzelba na słonie', type:'left_arm', level:40, price:12480, image:'images/items/left_arm/elephantgun.png?1', image_mini:'images/items/left_arm/mini/elephantgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
\n\
items[137] = {item_id:137, nshort:'deathsythe', name:'Kosa śmierci', type:'left_arm', level:50, price:17400, image:'images/items/left_arm/deathsythe.png?1', image_mini:'images/items/left_arm/mini/deathsythe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:'season_set', name:'Zestaw świąteczny'}, shop:'quest'};\n\
\n\
items[200] = {item_id:200, nshort:'band_red', name:'Czerwona chustka na szyję', type:'head', level:1, price:4, image:'images/items/head/band_red.png?1', image_mini:'images/items/head/mini/band_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[201] = {item_id:201, nshort:'band_green', name:'Zielona chustka na szyję', type:'head', level:2, price:4, image:'images/items/head/band_green.png?1', image_mini:'images/items/head/mini/band_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, dodge:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[202] = {item_id:202, nshort:'band_blue', name:'Niebieska opaska na czoło', type:'head', level:2, price:4, image:'images/items/head/band_blue.png?1', image_mini:'images/items/head/mini/band_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[203] = {item_id:203, nshort:'band_yellow', name:'Żółta opaska na czoło', type:'head', level:2, price:4, image:'images/items/head/band_yellow.png?1', image_mini:'images/items/head/mini/band_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[204] = {item_id:204, nshort:'band_brown', name:'Brązowa opaska na czoło', type:'head', level:3, price:18, image:'images/items/head/band_brown.png?1', image_mini:'images/items/head/mini/band_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, health:2, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[205] = {item_id:205, nshort:'band_black', name:'Czarna opaska na czoło', type:'head', level:3, price:18, image:'images/items/head/band_black.png?1', image_mini:'images/items/head/mini/band_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2, repair:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[206] = {item_id:206, nshort:'slouch_cap_grey', name:'Szara czapeczka z daszkiem', type:'head', level:3, price:46, image:'images/items/head/slouch_cap_grey.png?1', image_mini:'images/items/head/mini/slouch_cap_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[207] = {item_id:207, nshort:'slouch_cap_brown', name:'Brązowa czapeczka z daszkiem', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_brown.png?1', image_mini:'images/items/head/mini/slouch_cap_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[208] = {item_id:208, nshort:'slouch_cap_black', name:'Czarna czapeczka z daszkiem', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_black.png?1', image_mini:'images/items/head/mini/slouch_cap_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3, pitfall:3, leadership:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[209] = {item_id:209, nshort:'slouch_cap_fine', name:'Szlachecka czapeczka z daszkiem', type:'head', level:6, price:520, image:'images/items/head/slouch_cap_fine.png?1', image_mini:'images/items/head/mini/slouch_cap_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, aim:4, tactic:4, reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[210] = {item_id:210, nshort:'cap_grey', name:'Szara czapka', type:'head', level:4, price:90, image:'images/items/head/cap_grey.png?1', image_mini:'images/items/head/mini/cap_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[211] = {item_id:211, nshort:'cap_red', name:'Czerwona czapka', type:'head', level:5, price:175, image:'images/items/head/cap_red.png?1', image_mini:'images/items/head/mini/cap_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[212] = {item_id:212, nshort:'cap_green', name:'Zielona czapka', type:'head', level:5, price:175, image:'images/items/head/cap_green.png?1', image_mini:'images/items/head/mini/cap_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[213] = {item_id:213, nshort:'cap_blue', name:'Niebieska czapka', type:'head', level:5, price:175, image:'images/items/head/cap_blue.png?1', image_mini:'images/items/head/mini/cap_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[214] = {item_id:214, nshort:'cap_yellow', name:'Żółta czapka', type:'head', level:5, price:175, image:'images/items/head/cap_yellow.png?1', image_mini:'images/items/head/mini/cap_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[215] = {item_id:215, nshort:'cap_brown', name:'Brązowa czapka', type:'head', level:6, price:300, image:'images/items/head/cap_brown.png?1', image_mini:'images/items/head/mini/cap_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[216] = {item_id:216, nshort:'cap_black', name:'Czarna czapka', type:'head', level:6, price:300, image:'images/items/head/cap_black.png?1', image_mini:'images/items/head/mini/cap_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, tactic:4, finger_dexterity:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[217] = {item_id:217, nshort:'cap_fine', name:'Szlachecka czapka', type:'head', level:8, price:1100, image:'images/items/head/cap_fine.png?1', image_mini:'images/items/head/mini/cap_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, shot:5, animal:5, tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[218] = {item_id:218, nshort:'slouch_hat_grey', name:'Szary Kapelusz', type:'head', level:7, price:220, image:'images/items/head/slouch_hat_grey.png?1', image_mini:'images/items/head/mini/slouch_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[219] = {item_id:219, nshort:'slouch_hat_brown', name:'Brązowy Kapelusz', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_brown.png?1', image_mini:'images/items/head/mini/slouch_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, punch:5, dodge:4}, attributes:{}}, set:{key:'set_farmer', name:'Komplet Farmera'}, shop:'shop'};\n\
items[220] = {item_id:220, nshort:'slouch_hat_black', name:'Czarny Kapelusz', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_black.png?1', image_mini:'images/items/head/mini/slouch_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, tactic:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[221] = {item_id:221, nshort:'slouch_hat_fine', name:'Szlachecki Kapelusz', type:'head', level:12, price:1920, image:'images/items/head/slouch_hat_fine.png?1', image_mini:'images/items/head/mini/slouch_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, endurance:6, leadership:6, reflex:6}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[222] = {item_id:222, nshort:'bowler_grey', name:'Szary melonik', type:'head', level:10, price:420, image:'images/items/head/bowler_grey.png?1', image_mini:'images/items/head/mini/bowler_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[223] = {item_id:223, nshort:'bowler_brown', name:'Brązowy melonik', type:'head', level:12, price:808, image:'images/items/head/bowler_brown.png?1', image_mini:'images/items/head/mini/bowler_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, build:6, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[224] = {item_id:224, nshort:'bowler_black', name:'Czarny melonik', type:'head', level:12, price:808, image:'images/items/head/bowler_black.png?1', image_mini:'images/items/head/mini/bowler_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, shot:6}, attributes:{charisma:1}}, set:{key:'set_quackery', name:'Komplet Konowała'}, shop:'shop'};\n\
items[225] = {item_id:225, nshort:'bowler_fine', name:'Szlachecki melonik', type:'head', level:15, price:1850, image:'images/items/head/bowler_fine.png?1', image_mini:'images/items/head/mini/bowler_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, tough:6, repair:5, ride:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[226] = {item_id:226, nshort:'cloth_hat_grey', name:'Szary materiałowy Kapelusz', type:'head', level:14, price:655, image:'images/items/head/cloth_hat_grey.png?1', image_mini:'images/items/head/mini/cloth_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:10, aim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[227] = {item_id:227, nshort:'cloth_hat_brown', name:'Brązowy materiałowy Kapelusz', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_brown.png?1', image_mini:'images/items/head/mini/cloth_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:13, aim:7, swim:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[228] = {item_id:228, nshort:'cloth_hat_black', name:'Czarny materiałowy Kapelusz', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_black.png?1', image_mini:'images/items/head/mini/cloth_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:7, aim:13, appearance:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[229] = {item_id:229, nshort:'cloth_hat_fine', name:'Szlachecki materiałowy Kapelusz', type:'head', level:22, price:3900, image:'images/items/head/cloth_hat_fine.png?1', image_mini:'images/items/head/mini/cloth_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:9, aim:9, dodge:8, tactic:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[230] = {item_id:230, nshort:'cylinder_grey', name:'Szary cylinder', type:'head', level:18, price:1270, image:'images/items/head/cylinder_grey.png?1', image_mini:'images/items/head/mini/cylinder_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:14, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[231] = {item_id:231, nshort:'cylinder_red', name:'Czerwony cylinder', type:'head', level:24, price:1900, image:'images/items/head/cylinder_red.png?1', image_mini:'images/items/head/mini/cylinder_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, leadership:10, finger_dexterity:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[232] = {item_id:232, nshort:'cylinder_green', name:'Zielony cylinder', type:'head', level:24, price:1900, image:'images/items/head/cylinder_green.png?1', image_mini:'images/items/head/mini/cylinder_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, leadership:10, finger_dexterity:9}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[233] = {item_id:233, nshort:'cylinder_blue', name:'Niebieski cylinder', type:'head', level:24, price:1900, image:'images/items/head/cylinder_blue.png?1', image_mini:'images/items/head/mini/cylinder_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[234] = {item_id:234, nshort:'cylinder_yellow', name:'Żółty cylinder', type:'head', level:24, price:1900, image:'images/items/head/cylinder_yellow.png?1', image_mini:'images/items/head/mini/cylinder_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:9}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[235] = {item_id:235, nshort:'cylinder_brown', name:'Brązowy cylinder', type:'head', level:25, price:2700, image:'images/items/head/cylinder_brown.png?1', image_mini:'images/items/head/mini/cylinder_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:9, ride:9, health:8}, attributes:{}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, shop:'shop'};\n\
items[236] = {item_id:236, nshort:'cylinder_black', name:'Czarny cylinder', type:'head', level:25, price:2700, image:'images/items/head/cylinder_black.png?1', image_mini:'images/items/head/mini/cylinder_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[237] = {item_id:237, nshort:'cylinder_fine', name:'Cylinder Lincolna', type:'head', level:27, price:5400, image:'images/items/head/cylinder_fine.png?1', image_mini:'images/items/head/mini/cylinder_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:12, build:9, ride:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[238] = {item_id:238, nshort:'leather_hat_grey', name:'Szary skórzany Kapelusz', type:'head', level:24, price:2000, image:'images/items/head/leather_hat_grey.png?1', image_mini:'images/items/head/mini/leather_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[239] = {item_id:239, nshort:'leather_hat_brown', name:'Brązowy skórzany Kapelusz', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_brown.png?1', image_mini:'images/items/head/mini/leather_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, punch:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[240] = {item_id:240, nshort:'leather_hat_black', name:'Czarny skórzany Kapelusz', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_black.png?1', image_mini:'images/items/head/mini/leather_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, repair:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[241] = {item_id:241, nshort:'leather_hat_fine', name:'Szlachecki skórzany Kapelusz', type:'head', level:30, price:4100, image:'images/items/head/leather_hat_fine.png?1', image_mini:'images/items/head/mini/leather_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:15, animal:14, tough:9, aim:8}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[242] = {item_id:242, nshort:'stetson_grey', name:'Szary Stetson', type:'head', level:30, price:2555, image:'images/items/head/stetson_grey.png?1', image_mini:'images/items/head/mini/stetson_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, health:13}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[243] = {item_id:243, nshort:'stetson_brown', name:'Brązowy Stetson', type:'head', level:33, price:4500, image:'images/items/head/stetson_brown.png?1', image_mini:'images/items/head/mini/stetson_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, dodge:12}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[244] = {item_id:244, nshort:'stetson_black', name:'Czarny Stetson', type:'head', level:33, price:4500, image:'images/items/head/stetson_black.png?1', image_mini:'images/items/head/mini/stetson_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, leadership:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[245] = {item_id:245, nshort:'stetson_fine', name:'Szlachecki Stetson', type:'head', level:36, price:7100, image:'images/items/head/stetson_fine.png?1', image_mini:'images/items/head/mini/stetson_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:16, health:16, trade:9, swim:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[246] = {item_id:246, nshort:'xmas_hat', name:'Czapka bożonarodzeniowa', type:'head', level:1, price:50, image:'images/items/head/xmas_hat.png?1', image_mini:'images/items/head/mini/xmas_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[247] = {item_id:247, nshort:'southcap', name:'Czapka armii', type:'head', level:20, price:800, image:'images/items/head/southcap.png?1', image_mini:'images/items/head/mini/southcap.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{punch:11, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[248] = {item_id:248, nshort:'adventurerhat', name:'Kapelusz poszukiwacza przygód', type:'head', level:22, price:2980, image:'images/items/head/adventurerhat.png?1', image_mini:'images/items/head/mini/adventurerhat.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:6, ride:8, tough:10}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'quest'};\n\
items[249] = {item_id:249, nshort:'fedora_black', name:'Czarny Kapelusz filcowy', type:'head', level:22, price:1700, image:'images/items/head/fedora_black.png?1', image_mini:'images/items/head/mini/fedora_black.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:10, aim:6}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\n\
items[250] = {item_id:250, nshort:'feather_hat_brown', name:'Brązowy Kapelusz z piór', type:'head', level:18, price:1460, image:'images/items/head/feather_hat_brown.png?1', image_mini:'images/items/head/mini/feather_hat_brown.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4, endurance:3, tough:2}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
\n\
items[253] = {item_id:253, nshort:'indian_hat', name:'Indiański pióropusz', type:'head', level:51, price:3200, image:'images/items/head/indian_hat.png?1', image_mini:'images/items/head/mini/indian_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, appearance:11}, attributes:{charisma:2}}, set:{key:'set_indian', name:'Komplet Indianina'}, shop:'shop'};\n\
items[254] = {item_id:254, nshort:'mexican_sombrero', name:'Sombrero', type:'head', level:30, price:1270, image:'images/items/head/mexican_sombrero.png?1', image_mini:'images/items/head/mini/mexican_sombrero.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, health:6, shot:6}, attributes:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, shop:'shop'};\n\
\n\
items[256] = {item_id:256, nshort:'pilger_cap', name:'Czapka pielgrzyma', type:'head', level:37, price:1270, image:'images/items/head/pilger_cap.png?1', image_mini:'images/items/head/mini/pilger_cap.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:10, leadership:6, repair:6}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, shop:'shop'};\n\
items[257] = {item_id:257, nshort:'pilger_hat', name:'Kapelusz pielgrzyma', type:'head', level:37, price:1270, image:'images/items/head/pilger_hat.png?1', image_mini:'images/items/head/mini/pilger_hat.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{trade:6, repair:6, health:10}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, shop:'shop'};\n\
items[258] = {item_id:258, nshort:'cylinder_xmas', name:'Kapelusz bałwana', type:'head', level:30, price:2412, image:'images/items/head/cylinder_xmas.png?1', image_mini:'images/items/head/mini/cylinder_xmas.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Komplet Świąteczny'}, shop:'quest'}; \n\
items[259] = {item_id:259, nshort:'dancer_hat', name:'Pióro we włosach', type:'head', level:42, price:2500, image:'images/items/head/dancer_hat.png?1', image_mini:'images/items/head/mini/dancer_hat.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{pitfall:8, tactic:10, aim:9}, attributes:{flexibility:1}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, shop:'shop'};\n\
\n\
items[261] = {item_id:261, nshort:'sleep_cap', name:'Śpioszek', type:'head', level:45, price:1200, image:'images/items/head/sleep_cap.png?1', image_mini:'images/items/head/mini/sleep_cap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, shop:'drop'};\n\
\n\
\n\
items[299] = {item_id:299, nshort:'band_grey', name:'Szara opaska na czoło', type:'head', level:1, price:2, image:'images/items/head/band_grey.png?1', image_mini:'images/items/head/mini/band_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[300] = {item_id:300, nshort:'tatter_grey', name:'Szara koszula', type:'body', level:1, price:2, image:'images/items/body/tatter_grey.png?1', image_mini:'images/items/body/mini/tatter_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[301] = {item_id:301, nshort:'tatter_red', name:'Czerwona koszula', type:'body', level:1, price:12, image:'images/items/body/tatter_red.png?1', image_mini:'images/items/body/mini/tatter_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, build:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[302] = {item_id:302, nshort:'tatter_green', name:'Zielona koszula', type:'body', level:1, price:12, image:'images/items/body/tatter_green.png?1', image_mini:'images/items/body/mini/tatter_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[303] = {item_id:303, nshort:'tatter_blue', name:'Niebieska koszula', type:'body', level:1, price:12, image:'images/items/body/tatter_blue.png?1', image_mini:'images/items/body/mini/tatter_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[304] = {item_id:304, nshort:'tatter_yellow', name:'Żółta koszula', type:'body', level:1, price:12, image:'images/items/body/tatter_yellow.png?1', image_mini:'images/items/body/mini/tatter_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, leadership:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[305] = {item_id:305, nshort:'tatter_brown', name:'Brązowa koszula', type:'body', level:2, price:38, image:'images/items/body/tatter_brown.png?1', image_mini:'images/items/body/mini/tatter_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, reflex:2, punch:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[306] = {item_id:306, nshort:'tatter_black', name:'Czarna koszula', type:'body', level:2, price:38, image:'images/items/body/tatter_black.png?1', image_mini:'images/items/body/mini/tatter_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3, tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[307] = {item_id:307, nshort:'poncho_grey', name:'Szare poncho', type:'body', level:3, price:38, image:'images/items/body/poncho_grey.png?1', image_mini:'images/items/body/mini/poncho_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[308] = {item_id:308, nshort:'poncho_red', name:'Czerwone poncho', type:'body', level:4, price:80, image:'images/items/body/poncho_red.png?1', image_mini:'images/items/body/mini/poncho_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[309] = {item_id:309, nshort:'poncho_green', name:'Zielone poncho', type:'body', level:4, price:80, image:'images/items/body/poncho_green.png?1', image_mini:'images/items/body/mini/poncho_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[310] = {item_id:310, nshort:'poncho_blue', name:'Niebieskie poncho', type:'body', level:4, price:80, image:'images/items/body/poncho_blue.png?1', image_mini:'images/items/body/mini/poncho_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, aim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[311] = {item_id:311, nshort:'poncho_yellow', name:'Żółte poncho', type:'body', level:4, price:80, image:'images/items/body/poncho_yellow.png?1', image_mini:'images/items/body/mini/poncho_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[312] = {item_id:312, nshort:'poncho_brown', name:'Brązowe poncho', type:'body', level:5, price:174, image:'images/items/body/poncho_brown.png?1', image_mini:'images/items/body/mini/poncho_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:6, endurance:4}, attributes:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, shop:'shop'};\n\
items[313] = {item_id:313, nshort:'poncho_black', name:'Czarne poncho', type:'body', level:5, price:174, image:'images/items/body/poncho_black.png?1', image_mini:'images/items/body/mini/poncho_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, animal:4, shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[314] = {item_id:314, nshort:'poncho_fine', name:'Poncho Clinta', type:'body', level:6, price:800, image:'images/items/body/poncho_fine.png?1', image_mini:'images/items/body/mini/poncho_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7, build:5, pitfall:4, appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[315] = {item_id:315, nshort:'clothes_grey', name:'Szare ubranie', type:'body', level:7, price:138, image:'images/items/body/clothes_grey.png?1', image_mini:'images/items/body/mini/clothes_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[316] = {item_id:316, nshort:'clothes_red', name:'Czerwone ubranie', type:'body', level:8, price:260, image:'images/items/body/clothes_red.png?1', image_mini:'images/items/body/mini/clothes_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[317] = {item_id:317, nshort:'clothes_green', name:'Zielone ubranie', type:'body', level:14, price:260, image:'images/items/body/clothes_green.png?1', image_mini:'images/items/body/mini/clothes_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, hide:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[318] = {item_id:318, nshort:'clothes_blue', name:'Niebieskie ubranie', type:'body', level:8, price:260, image:'images/items/body/clothes_blue.png?1', image_mini:'images/items/body/mini/clothes_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, finger_dexterity:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[319] = {item_id:319, nshort:'clothes_yellow', name:'Żółte ubranie', type:'body', level:8, price:260, image:'images/items/body/clothes_yellow.png?1', image_mini:'images/items/body/mini/clothes_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[320] = {item_id:320, nshort:'clothes_brown', name:'Brązowe ubranie', type:'body', level:8, price:425, image:'images/items/body/clothes_brown.png?1', image_mini:'images/items/body/mini/clothes_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, swim:5, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[321] = {item_id:321, nshort:'clothes_black', name:'Czarne ubranie', type:'body', level:8, price:425, image:'images/items/body/clothes_black.png?1', image_mini:'images/items/body/mini/clothes_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:5}, attributes:{}}, set:{key:'set_farmer', name:'Komplet Farmera'}, shop:'shop'};\n\
items[322] = {item_id:322, nshort:'clothes_fine', name:'Ubranie świąteczne', type:'body', level:10, price:1650, image:'images/items/body/clothes_fine.png?1', image_mini:'images/items/body/mini/clothes_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, endurance:6, reflex:6, finger_dexterity:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[323] = {item_id:323, nshort:'shirt_grey', name:'Rozpinana Szara Koszula', type:'body', level:12, price:310, image:'images/items/body/shirt_grey.png?1', image_mini:'images/items/body/mini/shirt_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[324] = {item_id:324, nshort:'shirt_red', name:'Rozpinana Czerwona Koszula', type:'body', level:13, price:560, image:'images/items/body/shirt_red.png?1', image_mini:'images/items/body/mini/shirt_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[325] = {item_id:325, nshort:'shirt_green', name:'Rozpinana Zielona Koszula', type:'body', level:13, price:560, image:'images/items/body/shirt_green.png?1', image_mini:'images/items/body/mini/shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, ride:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[326] = {item_id:326, nshort:'shirt_blue', name:'Rozpinana Niebieska Koszula', type:'body', level:13, price:560, image:'images/items/body/shirt_blue.png?1', image_mini:'images/items/body/mini/shirt_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, aim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[327] = {item_id:327, nshort:'shirt_yellow', name:'Rozpinana Żółta Koszula', type:'body', level:13, price:560, image:'images/items/body/shirt_yellow.png?1', image_mini:'images/items/body/mini/shirt_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[328] = {item_id:328, nshort:'shirt_brown', name:'Rozpinana Brązowa Koszula', type:'body', level:14, price:800, image:'images/items/body/shirt_brown.png?1', image_mini:'images/items/body/mini/shirt_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, reflex:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[329] = {item_id:329, nshort:'shirt_black', name:'Rozpinana Czarna Koszula', type:'body', level:14, price:800, image:'images/items/body/shirt_black.png?1', image_mini:'images/items/body/mini/shirt_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, pitfall:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[330] = {item_id:330, nshort:'shirt_fine', name:'Szlachecka Koszula', type:'body', level:15, price:1305, image:'images/items/body/shirt_fine.png?1', image_mini:'images/items/body/mini/shirt_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:7, ride:7, punch:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[331] = {item_id:331, nshort:'plaid_shirt_grey', name:'Szara koszula w kratę', type:'body', level:15, price:560, image:'images/items/body/plaid_shirt_grey.png?1', image_mini:'images/items/body/mini/plaid_shirt_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[332] = {item_id:332, nshort:'plaid_shirt_red', name:'Czerwona koszula w kratę', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_red.png?1', image_mini:'images/items/body/mini/plaid_shirt_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[333] = {item_id:333, nshort:'plaid_shirt_green', name:'Zielona koszula w kratę', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_green.png?1', image_mini:'images/items/body/mini/plaid_shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, swim:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[334] = {item_id:334, nshort:'plaid_shirt_blue', name:'Niebieska koszula w kratę', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_blue.png?1', image_mini:'images/items/body/mini/plaid_shirt_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[335] = {item_id:335, nshort:'plaid_shirt_yellow', name:'Żółta koszula w kratę', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_yellow.png?1', image_mini:'images/items/body/mini/plaid_shirt_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[336] = {item_id:336, nshort:'plaid_shirt_brown', name:'Brązowa koszula w kratę', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_brown.png?1', image_mini:'images/items/body/mini/plaid_shirt_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12, ride:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[337] = {item_id:337, nshort:'plaid_shirt_black', name:'Czarna koszula w kratę', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_black.png?1', image_mini:'images/items/body/mini/plaid_shirt_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:7, repair:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[338] = {item_id:338, nshort:'plaid_shirt_fine', name:'Koszula drwala', type:'body', level:19, price:3900, image:'images/items/body/plaid_shirt_fine.png?1', image_mini:'images/items/body/mini/plaid_shirt_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:13, animal:8, hide:8, pitfall:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[339] = {item_id:339, nshort:'vest_grey', name:'Szara kamizelka', type:'body', level:16, price:900, image:'images/items/body/vest_grey.png?1', image_mini:'images/items/body/mini/vest_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:11, shot:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[340] = {item_id:340, nshort:'vest_brown', name:'Brązowa kamizelka', type:'body', level:20, price:1800, image:'images/items/body/vest_brown.png?1', image_mini:'images/items/body/mini/vest_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:9, shot:7, health:8}, attributes:{flexibility:1}}, set:{key:'set_quackery', name:'Komplet Konowała'}, shop:'shop'};\n\
items[341] = {item_id:341, nshort:'vest_black', name:'Czarna kamizelka', type:'body', level:20, price:1800, image:'images/items/body/vest_black.png?1', image_mini:'images/items/body/mini/vest_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7, shot:9, leadership:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[342] = {item_id:342, nshort:'vest_fine', name:'Szlachecka kamizelka', type:'body', level:20, price:5200, image:'images/items/body/vest_fine.png?1', image_mini:'images/items/body/mini/vest_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:10, shot:10, endurance:9, trade:8}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[343] = {item_id:343, nshort:'coat_grey', name:'Szara kurtka z materiału', type:'body', level:20, price:1300, image:'images/items/body/coat_grey.png?1', image_mini:'images/items/body/mini/coat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13, pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[344] = {item_id:344, nshort:'coat_red', name:'Czerwona kurtka z materiału', type:'body', level:20, price:2000, image:'images/items/body/coat_red.png?1', image_mini:'images/items/body/mini/coat_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[345] = {item_id:345, nshort:'coat_green', name:'Zielona kurtka z materiału', type:'body', level:20, price:2000, image:'images/items/body/coat_green.png?1', image_mini:'images/items/body/mini/coat_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, hide:8}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[346] = {item_id:346, nshort:'coat_blue', name:'Niebieska kurtka z materiału', type:'body', level:20, price:2000, image:'images/items/body/coat_blue.png?1', image_mini:'images/items/body/mini/coat_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[347] = {item_id:347, nshort:'coat_yellow', name:'Żółta kurtka z materiału', type:'body', level:20, price:2000, image:'images/items/body/coat_yellow.png?1', image_mini:'images/items/body/mini/coat_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, leadership:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[348] = {item_id:348, nshort:'coat_brown', name:'Brązowa kurtka z materiału', type:'body', level:21, price:2500, image:'images/items/body/coat_brown.png?1', image_mini:'images/items/body/mini/coat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8, swim:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[349] = {item_id:349, nshort:'coat_black', name:'Czarna kurtka z materiału', type:'body', level:21, price:2500, image:'images/items/body/coat_black.png?1', image_mini:'images/items/body/mini/coat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11, animal:9}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[350] = {item_id:350, nshort:'coat_fine', name:'Szlachecka kurtka z materiału', type:'body', level:22, price:6300, image:'images/items/body/coat_fine.png?1', image_mini:'images/items/body/mini/coat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:11, appearance:9, dodge:9}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[351] = {item_id:351, nshort:'jacket_grey', name:'Szary żakiet', type:'body', level:20, price:1850, image:'images/items/body/jacket_grey.png?1', image_mini:'images/items/body/mini/jacket_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[352] = {item_id:352, nshort:'jacket_brown', name:'Brązowy żakiet', type:'body', level:25, price:3500, image:'images/items/body/jacket_brown.png?1', image_mini:'images/items/body/mini/jacket_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, tough:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[353] = {item_id:353, nshort:'jacket_black', name:'Czarny żakiet', type:'body', level:25, price:3500, image:'images/items/body/jacket_black.png?1', image_mini:'images/items/body/mini/jacket_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, aim:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[354] = {item_id:354, nshort:'jacket_fine', name:'Szlachecki żakiet', type:'body', level:27, price:7200, image:'images/items/body/jacket_fine.png?1', image_mini:'images/items/body/mini/jacket_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:13, reflex:13, punch:9, aim:9}, attributes:{charisma:1, flexibility:1}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, shop:'shop'};\n\
items[355] = {item_id:355, nshort:'leather_coat_grey', name:'Szara skórzana kurtka', type:'body', level:25, price:2700, image:'images/items/body/leather_coat_grey.png?1', image_mini:'images/items/body/mini/leather_coat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:12}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[356] = {item_id:356, nshort:'leather_coat_brown', name:'Brązowa skórzana kurtka', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_brown.png?1', image_mini:'images/items/body/mini/leather_coat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:13}, attributes:{strength:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[357] = {item_id:357, nshort:'leather_coat_black', name:'Czarna skórzana kurtka', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_black.png?1', image_mini:'images/items/body/mini/leather_coat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:12, hide:11, repair:12, leadership:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[358] = {item_id:358, nshort:'leather_coat_fine', name:'Szlachecka skórzana kurtka', type:'body', level:30, price:9000, image:'images/items/body/leather_coat_fine.png?1', image_mini:'images/items/body/mini/leather_coat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:16, hide:15, finger_dexterity:9, appearance:10}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[359] = {item_id:359, nshort:'greatcoat_grey', name:'Szary płaszcz', type:'body', level:33, price:3500, image:'images/items/body/greatcoat_grey.png?1', image_mini:'images/items/body/mini/greatcoat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:14}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[360] = {item_id:360, nshort:'greatcoat_brown', name:'Brązowe płaszcz', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_brown.png?1', image_mini:'images/items/body/mini/greatcoat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:13, shot:13, ride:13, health:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[361] = {item_id:361, nshort:'greatcoat_fine', name:'Szlachecki płaszcz', type:'body', level:45, price:9500, image:'images/items/body/greatcoat_fine.png?1', image_mini:'images/items/body/mini/greatcoat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, shot:16, endurance:9, ride:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[362] = {item_id:362, nshort:'uniform', name:'Mundur', type:'body', level:20, price:800, image:'images/items/body/uniform.png?1', image_mini:'images/items/body/mini/uniform.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{hide:4, appearance:2}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\n\
items[363] = {item_id:363, nshort:'uniform_burned', name:'Spalony mundur', type:'body', level:20, price:80, image:'images/items/body/uniform_burned.png?1', image_mini:'images/items/body/mini/uniform_burned.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:-2, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\n\
items[364] = {item_id:364, nshort:'greatcoat_black', name:'Czarny płaszcz', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_black.png?1', image_mini:'images/items/body/mini/greatcoat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:16, shot:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[365] = {item_id:365, nshort:'adventurerjacket', name:'Kurtka poszukiwacza przygód', type:'body', level:40, price:1100, image:'images/items/body/adventurerjacket.png?1', image_mini:'images/items/body/mini/adventurerjacket.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:4, ride:10, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[366] = {item_id:366, nshort:'vest_leather_brown', name:'Brązowa skórzana kamizelka', type:'body', level:14, price:800, image:'images/items/body/vest_leather_brown.png?1', image_mini:'images/items/body/mini/vest_leather_brown.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{dodge:8, reflex:7, punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[367] = {item_id:367, nshort:'shirt_canvas', name:'Lniana koszula', type:'body', level:8, price:425, image:'images/items/body/shirt_canvas.png?1', image_mini:'images/items/body/mini/shirt_canvas.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{animal:3, dodge:2}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\n\
items[368] = {item_id:368, nshort:'dancer_dress', name:'Sukienka tancerki', type:'body', level:45, price:7500, image:'images/items/body/dancer_dress.png?1', image_mini:'images/items/body/mini/dancer_dress.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:8, shot:8, finger_dexterity:11, animal:10}, attributes:{charisma:2}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, shop:'shop'};\n\
items[369] = {item_id:369, nshort:'indian_jacket', name:'Indiańskie ubranie', type:'body', level:55, price:7500, image:'images/items/body/indian_jacket.png?1', image_mini:'images/items/body/mini/indian_jacket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, hide:9, pitfall:8}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_indian', name:'Komplet Indianina'}, shop:'shop'};\n\
\n\
items[372] = {item_id:372, nshort:'pilger_dress', name:'Szata pielgrzyma', type:'body', level:38, price:2500, image:'images/items/body/pilger_dress.png?1', image_mini:'images/items/body/mini/pilger_dress.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{dodge:10, build:8}, attributes:{strength:2}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, shop:'shop'};\n\
items[373] = {item_id:373, nshort:'pilger_jacket', name:'Koszula pielgrzyma', type:'body', level:38, price:2500, image:'images/items/body/pilger_jacket.png?1', image_mini:'images/items/body/mini/pilger_jacket.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{hide:10, build:8}, attributes:{dexterity:2}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, shop:'shop'};\n\
\n\
items[375] = {item_id:375, nshort:'night_shirt', name:'Koszula nocna', type:'body', level:45, price:1500, image:'images/items/body/night_shirt.png?1', image_mini:'images/items/body/mini/night_shirt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, shop:'drop'};\n\
\n\
\n\
items[400] = {item_id:400, nshort:'ripped_shoes_grey', name:'Szare zniszczone buty', type:'foot', level:1, price:4, image:'images/items/foot/ripped_shoes_grey.png?1', image_mini:'images/items/foot/mini/ripped_shoes_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[401] = {item_id:401, nshort:'ripped_shoes_brown', name:'Brązowe zniszczone buty', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_brown.png?1', image_mini:'images/items/foot/mini/ripped_shoes_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[402] = {item_id:402, nshort:'ripped_shoes_black', name:'Czarne zniszczone buty', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_black.png?1', image_mini:'images/items/foot/mini/ripped_shoes_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, leadership:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[403] = {item_id:403, nshort:'light_grey', name:'Szare buty materiałowe', type:'foot', level:5, price:70, image:'images/items/foot/light_grey.png?1', image_mini:'images/items/foot/mini/light_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[404] = {item_id:404, nshort:'light_brown', name:'Brązowe buty materiałowe', type:'foot', level:9, price:170, image:'images/items/foot/light_brown.png?1', image_mini:'images/items/foot/mini/light_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, hide:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[405] = {item_id:405, nshort:'light_black', name:'Czarne buty materiałowe', type:'foot', level:9, price:170, image:'images/items/foot/light_black.png?1', image_mini:'images/items/foot/mini/light_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, trade:5, shot:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[406] = {item_id:406, nshort:'light_fine', name:'Szlacheckie buty materiałowe', type:'foot', level:11, price:1500, image:'images/items/foot/light_fine.png?1', image_mini:'images/items/foot/mini/light_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:4, appearance:6, reflex:6, pitfall:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[407] = {item_id:407, nshort:'working_grey', name:'Szare buty robocze', type:'foot', level:9, price:660, image:'images/items/foot/working_grey.png?1', image_mini:'images/items/foot/mini/working_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[408] = {item_id:408, nshort:'working_brown', name:'Brązowe buty robocze', type:'foot', level:13, price:1200, image:'images/items/foot/working_brown.png?1', image_mini:'images/items/foot/mini/working_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, endurance:7, ride:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[409] = {item_id:409, nshort:'working_black', name:'Czarne buty robocze', type:'foot', level:13, price:1200, image:'images/items/foot/working_black.png?1', image_mini:'images/items/foot/mini/working_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, tactic:7}, attributes:{dexterity:1}}, set:{key:'set_farmer', name:'Komplet Farmera'}, shop:'shop'};\n\
items[410] = {item_id:410, nshort:'working_fine', name:'Szlacheckie buty robocze', type:'foot', level:15, price:4300, image:'images/items/foot/working_fine.png?1', image_mini:'images/items/foot/mini/working_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:11, trade:8, dodge:8, punch:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[411] = {item_id:411, nshort:'spur_grey', name:'Szare buty skórzane', type:'foot', level:14, price:1400, image:'images/items/foot/spur_grey.png?1', image_mini:'images/items/foot/mini/spur_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:7}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[412] = {item_id:412, nshort:'spur_brown', name:'Brązowe buty skórzane', type:'foot', level:17, price:2450, image:'images/items/foot/spur_brown.png?1', image_mini:'images/items/foot/mini/spur_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:6, reflex:9, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[413] = {item_id:413, nshort:'spur_black', name:'Czarne buty skórzane', type:'foot', level:17, price:2450, image:'images/items/foot/spur_black.png?1', image_mini:'images/items/foot/mini/spur_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, shot:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[414] = {item_id:414, nshort:'spur_fine', name:'Szlacheckie buty skórzane', type:'foot', level:20, price:6230, image:'images/items/foot/spur_fine.png?1', image_mini:'images/items/foot/mini/spur_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:11, shot:10, health:8, swim:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[415] = {item_id:415, nshort:'boots_grey', name:'Szare kozaki', type:'foot', level:16, price:3000, image:'images/items/foot/boots_grey.png?1', image_mini:'images/items/foot/mini/boots_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[416] = {item_id:416, nshort:'boots_brown', name:'Brązowe kozaki', type:'foot', level:20, price:5100, image:'images/items/foot/boots_brown.png?1', image_mini:'images/items/foot/mini/boots_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, tough:12, dodge:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[417] = {item_id:417, nshort:'boots_black', name:'Czarne kozaki', type:'foot', level:20, price:5100, image:'images/items/foot/boots_black.png?1', image_mini:'images/items/foot/mini/boots_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:11}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[418] = {item_id:418, nshort:'boots_fine', name:'Szlacheckie kozaki', type:'foot', level:22, price:8870, image:'images/items/foot/boots_fine.png?1', image_mini:'images/items/foot/mini/boots_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, endurance:8, hide:8}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[419] = {item_id:419, nshort:'rider_grey', name:'Szare kozaki jeździeckie', type:'foot', level:30, price:2600, image:'images/items/foot/rider_grey.png?1', image_mini:'images/items/foot/mini/rider_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:14}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[420] = {item_id:420, nshort:'rider_brown', name:'Brązowe kozaki jeździeckie', type:'foot', level:33, price:6200, image:'images/items/foot/rider_brown.png?1', image_mini:'images/items/foot/mini/rider_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:14, punch:13}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[421] = {item_id:421, nshort:'rider_black', name:'Czarne kozaki jeździeckie', type:'foot', level:33, price:6200, image:'images/items/foot/rider_black.png?1', image_mini:'images/items/foot/mini/rider_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:13, animal:14}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[422] = {item_id:422, nshort:'rider_fine', name:'Szlacheckie kozaki jeździeckie', type:'foot', level:35, price:9500, image:'images/items/foot/rider_fine.png?1', image_mini:'images/items/foot/mini/rider_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:11, punch:10, appearance:8, aim:8}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[423] = {item_id:423, nshort:'soldier_boots', name:'Buty żołnierskie', type:'foot', level:30, price:5500, image:'images/items/foot/soldier_boots.png?1', image_mini:'images/items/foot/mini/soldier_boots.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:12, health:12, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[425] = {item_id:425, nshort:'lace-up_shoes_brown', name:'Brązowe buty sznurowane', type:'foot', level:13, price:1290, image:'images/items/foot/lace-up_shoes_brown.png?1', image_mini:'images/items/foot/mini/lace-up_shoes_brown.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:4, shot:4, aim:5}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'quest'};\n\
items[426] = {item_id:426, nshort:'pilgrim_shoes_brown', name:'Brązowe buty pielgrzyma', type:'foot', level:15, price:1530, image:'images/items/foot/pilgrim_shoes_brown.png?1', image_mini:'images/items/foot/mini/pilgrim_shoes_brown.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:6, punch:6, build:4}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\n\
items[427] = {item_id:427, nshort:'gentleman_shoes', name:'Buty szlacheckie', type:'foot', level:45, price:5600, image:'images/items/foot/gentleman_shoes.png?1', image_mini:'images/items/foot/mini/gentleman_shoes.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{appearance:8, reflex:9}, attributes:{dexterity:2, strength:2}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, shop:'shop'};\n\
items[428] = {item_id:428, nshort:'mexican_shoes', name:'Sandały', type:'foot', level:28, price:2650, image:'images/items/foot/mexican_shoes.png?1', image_mini:'images/items/foot/mini/mexican_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, aim:6, dodge:8, health:8}, attributes:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, shop:'shop'};\n\
items[429] = {item_id:429, nshort:'mokassins', name:'Mokasyny', type:'foot', level:45, price:5600, image:'images/items/foot/mokassins.png?1', image_mini:'images/items/foot/mini/mokassins.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, endurance:9, hide:9}, attributes:{flexibility:2}}, set:{key:'set_indian', name:'Komplet Indianina'}, shop:'shop'};\n\
\n\
items[431] = {item_id:431, nshort:'pilger_boots', name:'Buty pielgrzyma(damskie)', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_boots.png?1', image_mini:'images/items/foot/mini/pilger_boots.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{build:7, hide:6, finger_dexterity:8, shot:8}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, shop:'shop'};\n\
items[432] = {item_id:432, nshort:'pilger_shoes', name:'Buty pielgrzyma', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_shoes.png?1', image_mini:'images/items/foot/mini/pilger_shoes.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{build:7, tough:6, leadership:8, reflex:8}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, shop:'shop'};\n\
items[433] = {item_id:433, nshort:'dancer_boots', name:'Buty na obcasie', type:'foot', level:41, price:4000, image:'images/items/foot/dancer_boots.png?1', image_mini:'images/items/foot/mini/dancer_boots.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{repair:8, aim:9}, attributes:{charisma:1, dexterity:2}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, shop:'shop'};\n\
\n\
items[435] = {item_id:435, nshort:'quackery_shoes', name:'Buty konowała', type:'foot', level:45, price:5600, image:'images/items/foot/quackery_shoes.png?1', image_mini:'images/items/foot/mini/quackery_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:9, swim:9, ride:9}, attributes:{flexibility:2}}, set:{key:'set_quackery', name:'Komplet Konowała'}, shop:'shop'};\n\
items[436] = {item_id:436, nshort:'slippers', name:'Pantofle', type:'foot', level:45, price:2000, image:'images/items/foot/slippers.png?1', image_mini:'images/items/foot/mini/slippers.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, shop:'shop'};\n\
\n\
items[500] = {item_id:500, nshort:'neckband_grey', name:'Szara chustka na szyję', type:'neck', level:null, price:10, image:'images/items/neck/neckband_grey.png?1', image_mini:'images/items/neck/neckband_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[501] = {item_id:501, nshort:'neckband_red', name:'Czerwona chustka na szyję', type:'neck', level:null, price:14, image:'images/items/neck/neckband_red.png?1', image_mini:'images/items/neck/neckband_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[502] = {item_id:502, nshort:'neckband_green', name:'Zielona chustka na szyję', type:'neck', level:null, price:14, image:'images/items/neck/neckband_green.png?1', image_mini:'images/items/neck/neckband_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[503] = {item_id:503, nshort:'neckband_blue', name:'Niebieska chustka na szyję', type:'neck', level:null, price:14, image:'images/items/neck/neckband_blue.png?1', image_mini:'images/items/neck/neckband_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[504] = {item_id:504, nshort:'neckband_yellow', name:'Żółta chustka na szyję', type:'neck', level:null, price:14, image:'images/items/neck/neckband_yellow.png?1', image_mini:'images/items/neck/neckband_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[505] = {item_id:505, nshort:'neckband_brown', name:'Brązowa chustka na szyję', type:'neck', level:null, price:20, image:'images/items/neck/neckband_brown.png?1', image_mini:'images/items/neck/neckband_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[506] = {item_id:506, nshort:'neckband_black', name:'Czarna chustka na szyję', type:'neck', level:null, price:20, image:'images/items/neck/neckband_black.png?1', image_mini:'images/items/neck/neckband_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, tactic:1, shot:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[507] = {item_id:507, nshort:'indian_chain_grey', name:'Szary naszyjnik indiański', type:'neck', level:null, price:35, image:'images/items/neck/indian_chain_grey.png?1', image_mini:'images/items/neck/indian_chain_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[508] = {item_id:508, nshort:'indian_chain_red', name:'Czerwony naszyjnik indiański', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_red.png?1', image_mini:'images/items/neck/indian_chain_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, endurance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[509] = {item_id:509, nshort:'indian_chain_green', name:'Zielony naszyjnik indiański', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_green.png?1', image_mini:'images/items/neck/indian_chain_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[510] = {item_id:510, nshort:'indian_chain_blue', name:'Niebieski naszyjnik indiański', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_blue.png?1', image_mini:'images/items/neck/indian_chain_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, finger_dexterity:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[511] = {item_id:511, nshort:'indian_chain_yellow', name:'Żółty naszyjnik indiański', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_yellow.png?1', image_mini:'images/items/neck/indian_chain_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[512] = {item_id:512, nshort:'indian_chain_fine', name:'Złoty naszyjnik indiański', type:'neck', level:null, price:660, image:'images/items/neck/indian_chain_fine.png?1', image_mini:'images/items/neck/indian_chain_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, hide:4, punch:4, pitfall:3}, attributes:{}}, set:{key:'set_indian', name:'Komplet Indianina'}, shop:'shop'};\n\
items[513] = {item_id:513, nshort:'loop_grey', name:'Szara opaska', type:'neck', level:null, price:125, image:'images/items/neck/loop_grey.png?1', image_mini:'images/items/neck/loop_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[514] = {item_id:514, nshort:'loop_red', name:'Czerwona opaska', type:'neck', level:null, price:240, image:'images/items/neck/loop_red.png?1', image_mini:'images/items/neck/loop_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[515] = {item_id:515, nshort:'loop_green', name:'Zielona opaska', type:'neck', level:null, price:240, image:'images/items/neck/loop_green.png?1', image_mini:'images/items/neck/loop_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[516] = {item_id:516, nshort:'loop_blue', name:'Niebieska opaska', type:'neck', level:null, price:240, image:'images/items/neck/loop_blue.png?1', image_mini:'images/items/neck/loop_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[517] = {item_id:517, nshort:'loop_yellow', name:'Żółta opaska', type:'neck', level:null, price:240, image:'images/items/neck/loop_yellow.png?1', image_mini:'images/items/neck/loop_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[518] = {item_id:518, nshort:'loop_brown', name:'Brązowa opaska', type:'neck', level:null, price:385, image:'images/items/neck/loop_brown.png?1', image_mini:'images/items/neck/loop_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, dodge:4, endurance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[519] = {item_id:519, nshort:'loop_black', name:'Czarna opaska', type:'neck', level:null, price:385, image:'images/items/neck/loop_black.png?1', image_mini:'images/items/neck/loop_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, appearance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[520] = {item_id:520, nshort:'fly_grey', name:'Szara muszka', type:'neck', level:null, price:282, image:'images/items/neck/fly_grey.png?1', image_mini:'images/items/neck/fly_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[521] = {item_id:521, nshort:'fly_red', name:'Czerwona muszka', type:'neck', level:null, price:446, image:'images/items/neck/fly_red.png?1', image_mini:'images/items/neck/fly_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[522] = {item_id:522, nshort:'fly_green', name:'Zielona muszka', type:'neck', level:null, price:446, image:'images/items/neck/fly_green.png?1', image_mini:'images/items/neck/fly_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[523] = {item_id:523, nshort:'fly_blue', name:'Niebieska muszka', type:'neck', level:null, price:446, image:'images/items/neck/fly_blue.png?1', image_mini:'images/items/neck/fly_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, aim:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[524] = {item_id:524, nshort:'fly_yellow', name:'Żółta muszka', type:'neck', level:null, price:446, image:'images/items/neck/fly_yellow.png?1', image_mini:'images/items/neck/fly_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, animal:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[525] = {item_id:525, nshort:'fly_brown', name:'Brązowa muszka', type:'neck', level:null, price:650, image:'images/items/neck/fly_brown.png?1', image_mini:'images/items/neck/fly_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:10, hide:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[526] = {item_id:526, nshort:'fly_black', name:'Czarna muszka', type:'neck', level:null, price:650, image:'images/items/neck/fly_black.png?1', image_mini:'images/items/neck/fly_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, trade:4, pitfall:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[527] = {item_id:527, nshort:'fly_fine', name:'Szlachecka muszka', type:'neck', level:null, price:2200, image:'images/items/neck/fly_fine.png?1', image_mini:'images/items/neck/fly_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, repair:6, dodge:6, tactic:5}, attributes:{strength:1}}, set:{key:'set_quackery', name:'Komplet Konowała'}, shop:'shop'};\n\
items[528] = {item_id:528, nshort:'cross_bronze', name:'Metalowy krzyżyk', type:'neck', level:null, price:730, image:'images/items/neck/cross_bronze.png?1', image_mini:'images/items/neck/cross_bronze.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:1, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, shop:'shop'};\n\
items[529] = {item_id:529, nshort:'cross_silver', name:'Srebny krzyżyk', type:'neck', level:null, price:1200, image:'images/items/neck/cross_silver.png?1', image_mini:'images/items/neck/cross_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:2, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, shop:'shop'};\n\
items[530] = {item_id:530, nshort:'cross_gold', name:'Złoty krzyżyk', type:'neck', level:null, price:3400, image:'images/items/neck/cross_gold.png?1', image_mini:'images/items/neck/cross_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[531] = {item_id:531, nshort:'cravat_grey', name:'Szary krawat', type:'neck', level:null, price:820, image:'images/items/neck/cravat_grey.png?1', image_mini:'images/items/neck/cravat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:11, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[532] = {item_id:532, nshort:'cravat_red', name:'Czerwony krawat', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_red.png?1', image_mini:'images/items/neck/cravat_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:7}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[533] = {item_id:533, nshort:'cravat_green', name:'Zielony krawat', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_green.png?1', image_mini:'images/items/neck/cravat_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, reflex:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[534] = {item_id:534, nshort:'cravat_blue', name:'Niebieski krawat', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_blue.png?1', image_mini:'images/items/neck/cravat_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[535] = {item_id:535, nshort:'cravat_yellow', name:'Żółty krawat', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_yellow.png?1', image_mini:'images/items/neck/cravat_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[536] = {item_id:536, nshort:'cravat_brown', name:'Brązowy krawat', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_brown.png?1', image_mini:'images/items/neck/cravat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:9, dodge:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[537] = {item_id:537, nshort:'cravat_black', name:'Czarny krawat', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_black.png?1', image_mini:'images/items/neck/cravat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9, health:8, finger_dexterity:6}, attributes:{charisma:1}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, shop:'shop'};\n\
items[538] = {item_id:538, nshort:'cravat_fine', name:'Szlachecki krawat', type:'neck', level:null, price:4400, image:'images/items/neck/cravat_fine.png?1', image_mini:'images/items/neck/cravat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, health:10, swim:8, pitfall:7}, attributes:{strength:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[539] = {item_id:539, nshort:'bullet_metal', name:'Metalowa Kula', type:'neck', level:null, price:1800, image:'images/items/neck/bullet_metal.png?1', image_mini:'images/items/neck/bullet_metal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[540] = {item_id:540, nshort:'bullet_silver', name:'Srebna Kula', type:'neck', level:null, price:3350, image:'images/items/neck/bullet_silver.png?1', image_mini:'images/items/neck/bullet_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[541] = {item_id:541, nshort:'bullet_gold', name:'Złota Kula', type:'neck', level:null, price:6750, image:'images/items/neck/bullet_gold.png?1', image_mini:'images/items/neck/bullet_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[542] = {item_id:542, nshort:'kerchief_grey', name:'Szara chustka', type:'neck', level:null, price:2500, image:'images/items/neck/kerchief_grey.png?1', image_mini:'images/items/neck/kerchief_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[543] = {item_id:543, nshort:'kerchief_red', name:'Czerwona chustka', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_red.png?1', image_mini:'images/items/neck/kerchief_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, build:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[544] = {item_id:544, nshort:'kerchief_green', name:'Zielona chustka', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_green.png?1', image_mini:'images/items/neck/kerchief_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, ride:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[545] = {item_id:545, nshort:'kerchief_blue', name:'Niebieska chustka', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_blue.png?1', image_mini:'images/items/neck/kerchief_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, appearance:13}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'shop'};\n\
items[546] = {item_id:546, nshort:'kerchief_yellow', name:'Żółta chustka', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_yellow.png?1', image_mini:'images/items/neck/kerchief_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\n\
items[547] = {item_id:547, nshort:'kerchief_brown', name:'Brązowa chustka', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_brown.png?1', image_mini:'images/items/neck/kerchief_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, punch:10, hide:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[548] = {item_id:548, nshort:'kerchief_black', name:'Czarna chustka', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_black.png?1', image_mini:'images/items/neck/kerchief_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[549] = {item_id:549, nshort:'bullchain_metal', name:'Metalowy Bawół', type:'neck', level:null, price:2400, image:'images/items/neck/bullchain_metal.png?1', image_mini:'images/items/neck/bullchain_metal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[550] = {item_id:550, nshort:'bullchain_silver', name:'Srebny Bawół', type:'neck', level:null, price:4490, image:'images/items/neck/bullchain_silver.png?1', image_mini:'images/items/neck/bullchain_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\n\
items[551] = {item_id:551, nshort:'bullchain_gold', name:'Złoty Bawół', type:'neck', level:null, price:8300, image:'images/items/neck/bullchain_gold.png?1', image_mini:'images/items/neck/bullchain_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\n\
items[552] = {item_id:552, nshort:'talisman', name:'Talizman', type:'neck', level:null, price:1000, image:'images/items/neck/talisman.png?1', image_mini:'images/items/neck/talisman.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'unk'};\n\
items[553] = {item_id:553, nshort:'stonechain', name:'Kamienny łańcuch', type:'neck', level:null, price:1000, image:'images/items/neck/stonechain.png?1', image_mini:'images/items/neck/stonechain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[554] = {item_id:554, nshort:'southcross', name:'Medal waleczności', type:'neck', level:null, price:650, image:'images/items/neck/southcross.png?1', image_mini:'images/items/neck/southcross.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:8, appearance:7, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[555] = {item_id:555, nshort:'aztecchains', name:'Naszyjnik Azteków', type:'neck', level:null, price:1200, image:'images/items/neck/aztecchains.png?1', image_mini:'images/items/neck/aztecchains.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:9, ride:10, tough:8}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[556] = {item_id:556, nshort:'arrowhead', name:'Grot', type:'neck', level:null, price:1150, image:'images/items/neck/arrowhead.png?1', image_mini:'images/items/neck/arrowhead.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:7, aim:7}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[557] = {item_id:557, nshort:'bone_necklace', name:'Naszyjnik z kości', type:'neck', level:null, price:1700, image:'images/items/neck/bone_necklace.png?1', image_mini:'images/items/neck/bone_necklace.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{appearance:3}, attributes:{strength:5}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[561] = {item_id:561, nshort:'mexican_neck', name:'Meksykańska chustka na szyję', type:'neck', level:28, price:600, image:'images/items/neck/mexican_neck.png?1', image_mini:'images/items/neck/mexican_neck.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:17}, attributes:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, shop:'shop'};\n\
items[566] = {item_id:566, nshort:'dancer_chain', name:'Perłowy naszyjnik', type:'neck', level:43, price:1800, image:'images/items/neck/dancer_chain.png?1', image_mini:'images/items/neck/dancer_chain.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:9, leadership:8, pitfall:6}, attributes:{charisma:1}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, shop:'drop'};\n\
items[567] = {item_id:567, nshort:'amulett', name:'Naszyjnik miłości', type:'neck', level:30, price:2412, image:'images/items/neck/amulett.png?1', image_mini:'images/items/neck/amulett.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, animal:15, trade:15, leadership:15}, attributes:{}}, set:{key:'season_set', name:'Zestaw świąteczny'}, shop:'quest'};\n\
items[568] = {item_id:568, nshort:'teethchain', name:'Talizman odstraszający duchy', type:'neck', level:40, price:2012, image:'images/items/neck/teethchain.png?1', image_mini:'images/items/neck/teethchain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:4, leadership:8, hide:4}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
\n\
items[600] = {item_id:600, nshort:'donkey', name:'Osioł', type:'animal', level:1, price:250, image:'images/items/animal/donkey.png?1', image_mini:'images/items/animal/mini/donkey.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, shop:'shop'};\n\
items[601] = {item_id:601, nshort:'pony', name:'Kucyk', type:'animal', level:1, price:500, image:'images/items/animal/pony.png?1', image_mini:'images/items/animal/mini/pony.png?1', characterClass:null, characterSex:null, speed:0.666, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[602] = {item_id:602, nshort:'mustang', name:'Mustang', type:'animal', level:1, price:850, image:'images/items/animal/mustang.png?1', image_mini:'images/items/animal/mini/mustang.png?1', characterClass:null, characterSex:null, speed:0.571, bonus:{skills:{}, attributes:{}}, set:{key:'set_indian', name:'Komplet Indianina'}, shop:'shop'};\n\
items[603] = {item_id:603, nshort:'berber', name:'Biały koń', type:'animal', level:1, price:1250, image:'images/items/animal/berber.png?1', image_mini:'images/items/animal/mini/berber.png?1', characterClass:null, characterSex:null, speed:0.5, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[604] = {item_id:604, nshort:'araber', name:'Arab', type:'animal', level:1, price:2000, image:'images/items/animal/araber.png?1', image_mini:'images/items/animal/mini/araber.png?1', characterClass:null, characterSex:null, speed:0.444, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[605] = {item_id:605, nshort:'quarter', name:'Kłusak', type:'animal', level:1, price:2800, image:'images/items/animal/quarter.png?1', image_mini:'images/items/animal/mini/quarter.png?1', characterClass:null, characterSex:null, speed:0.4, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[606] = {item_id:606, nshort:'charriot', name:'Wóz do zaprzężenia woła', type:'animal', level:1, price:1500, image:'images/items/animal/charriot.png?1', image_mini:'images/items/animal/mini/charriot.png?1', characterClass:null, characterSex:null, speed:0.909, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
\n\
items[700] = {item_id:700, nshort:'ham', name:'Presunto', type:'yield', level:null, price:10, image:'images/items/yield/ham.png?1', image_mini:'images/items/yield/ham.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[701] = {item_id:701, nshort:'cereals', name:'Zboże', type:'yield', level:null, price:3, image:'images/items/yield/cereals.png?1', image_mini:'images/items/yield/cereals.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[702] = {item_id:702, nshort:'tabacco', name:'Liście tytoniu', type:'yield', level:null, price:5, image:'images/items/yield/tabacco.png?1', image_mini:'images/items/yield/tabacco.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[703] = {item_id:703, nshort:'sugar', name:'Cukier', type:'yield', level:null, price:8, image:'images/items/yield/sugar.png?1', image_mini:'images/items/yield/sugar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[704] = {item_id:704, nshort:'cotton', name:'Bawełna', type:'yield', level:null, price:6, image:'images/items/yield/cotton.png?1', image_mini:'images/items/yield/cotton.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[705] = {item_id:705, nshort:'trout', name:'Pstrąg', type:'yield', level:null, price:4, image:'images/items/yield/trout.png?1', image_mini:'images/items/yield/trout.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[706] = {item_id:706, nshort:'berrys', name:'Jagody', type:'yield', level:null, price:4, image:'images/items/yield/berrys.png?1', image_mini:'images/items/yield/berrys.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[707] = {item_id:707, nshort:'shearings', name:'Wełna', type:'yield', level:null, price:8, image:'images/items/yield/shearings.png?1', image_mini:'images/items/yield/shearings.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[708] = {item_id:708, nshort:'copper_pyrites', name:'Piryt', type:'yield', level:null, price:16, image:'images/items/yield/copper_pyrites.png?1', image_mini:'images/items/yield/copper_pyrites.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[709] = {item_id:709, nshort:'turkey', name:'Indyk', type:'yield', level:null, price:14, image:'images/items/yield/turkey.png?1', image_mini:'images/items/yield/turkey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[710] = {item_id:710, nshort:'beef', name:'Stek', type:'yield', level:null, price:24, image:'images/items/yield/beef.png?1', image_mini:'images/items/yield/beef.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[711] = {item_id:711, nshort:'planks', name:'Drewno', type:'yield', level:null, price:16, image:'images/items/yield/planks.png?1', image_mini:'images/items/yield/planks.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[712] = {item_id:712, nshort:'leather', name:'Skóra', type:'yield', level:null, price:16, image:'images/items/yield/leather.png?1', image_mini:'images/items/yield/leather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
items[714] = {item_id:714, nshort:'beaver', name:'Skóra z bobra', type:'yield', level:null, price:36, image:'images/items/yield/beaver.png?1', image_mini:'images/items/yield/beaver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[715] = {item_id:715, nshort:'fabric', name:'Sukno', type:'yield', level:null, price:22, image:'images/items/yield/fabric.png?1', image_mini:'images/items/yield/fabric.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[716] = {item_id:716, nshort:'stone', name:'Kamienie', type:'yield', level:null, price:10, image:'images/items/yield/stone.png?1', image_mini:'images/items/yield/stone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[717] = {item_id:717, nshort:'grund', name:'Łosoś', type:'yield', level:null, price:14, image:'images/items/yield/grund.png?1', image_mini:'images/items/yield/grund.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[718] = {item_id:718, nshort:'coyote', name:'Ząb kojota', type:'yield', level:null, price:42, image:'images/items/yield/coyote.png?1', image_mini:'images/items/yield/coyote.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[719] = {item_id:719, nshort:'cigar', name:'Cygaro', type:'yield', level:null, price:24, image:'images/items/yield/cigar.png?1', image_mini:'images/items/yield/cigar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[720] = {item_id:720, nshort:'gems', name:'Kamienie szlachetne', type:'yield', level:null, price:70, image:'images/items/yield/gems.png?1', image_mini:'images/items/yield/gems.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[721] = {item_id:721, nshort:'coal', name:'Węgiel', type:'yield', level:null, price:20, image:'images/items/yield/coal.png?1', image_mini:'images/items/yield/coal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[722] = {item_id:722, nshort:'meal', name:'Ciepły posiłek', type:'yield', level:null, price:14, image:'images/items/yield/meal.png?1', image_mini:'images/items/yield/meal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[723] = {item_id:723, nshort:'ring', name:'Pierścionek', type:'yield', level:null, price:160, image:'images/items/yield/ring.png?1', image_mini:'images/items/yield/ring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Komplet Pielgrzyma(damski)'}, shop:'drop'};\n\
items[724] = {item_id:724, nshort:'buffalo', name:'Skóra z bizona', type:'yield', level:null, price:40, image:'images/items/yield/buffalo.png?1', image_mini:'images/items/yield/buffalo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[725] = {item_id:725, nshort:'silver', name:'Srebro', type:'yield', level:null, price:200, image:'images/items/yield/silver.png?1', image_mini:'images/items/yield/silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[726] = {item_id:726, nshort:'indiangold', name:'Złoto Azteków', type:'yield', level:null, price:290, image:'images/items/yield/indiangold.png?1', image_mini:'images/items/yield/indiangold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[727] = {item_id:727, nshort:'medal', name:'Medal zasłużonych', type:'yield', level:null, price:500, image:'images/items/yield/medal.png?1', image_mini:'images/items/yield/medal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[728] = {item_id:728, nshort:'watch', name:'Zegarek kieszonkowy', type:'yield', level:null, price:210, image:'images/items/yield/watch.png?1', image_mini:'images/items/yield/watch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[729] = {item_id:729, nshort:'stolen_goods', name:'Towar przemycany', type:'yield', level:null, price:110, image:'images/items/yield/stolen_goods.png?1', image_mini:'images/items/yield/stolen_goods.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[730] = {item_id:730, nshort:'necklet', name:'Biżuteria damska', type:'yield', level:null, price:230, image:'images/items/yield/necklet.png?1', image_mini:'images/items/yield/necklet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[731] = {item_id:731, nshort:'grizzly', name:'Trofeum', type:'yield', level:null, price:150, image:'images/items/yield/grizzly.png?1', image_mini:'images/items/yield/grizzly.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
items[733] = {item_id:733, nshort:'packet', name:'Paczka', type:'yield', level:null, price:32, image:'images/items/yield/packet.png?1', image_mini:'images/items/yield/packet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[734] = {item_id:734, nshort:'slicer', name:'Hebel', type:'yield', level:null, price:44, image:'images/items/yield/slicer.png?1', image_mini:'images/items/yield/slicer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
items[736] = {item_id:736, nshort:'spade', name:'Łopata', type:'yield', level:null, price:40, image:'images/items/yield/spade.png?1', image_mini:'images/items/yield/spade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[737] = {item_id:737, nshort:'dynamite', name:'Dynamit', type:'yield', level:null, price:80, image:'images/items/yield/dynamite.png?1', image_mini:'images/items/yield/dynamite.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
items[739] = {item_id:739, nshort:'fence', name:'Drut kolczasty', type:'yield', level:null, price:36, image:'images/items/yield/fence.png?1', image_mini:'images/items/yield/fence.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[740] = {item_id:740, nshort:'horn', name:'Krowi róg', type:'yield', level:null, price:78, image:'images/items/yield/horn.png?1', image_mini:'images/items/yield/horn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[741] = {item_id:741, nshort:'pitcher', name:'Dzban', type:'yield', level:null, price:24, image:'images/items/yield/pitcher.png?1', image_mini:'images/items/yield/pitcher.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[742] = {item_id:742, nshort:'saw', name:'Piła', type:'yield', level:null, price:40, image:'images/items/yield/saw.png?1', image_mini:'images/items/yield/saw.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[743] = {item_id:743, nshort:'poster', name:'Plakat', type:'yield', level:null, price:4, image:'images/items/yield/poster.png?1', image_mini:'images/items/yield/poster.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[744] = {item_id:744, nshort:'newspaper', name:'Gazeta \"Echo The West\"', type:'yield', level:null, price:6, image:'images/items/yield/newspaper.png?1', image_mini:'images/items/yield/newspaper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[745] = {item_id:745, nshort:'flour', name:'Mąka', type:'yield', level:null, price:5, image:'images/items/yield/flour.png?1', image_mini:'images/items/yield/flour.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[746] = {item_id:746, nshort:'beans', name:'Fasola', type:'yield', level:null, price:6, image:'images/items/yield/beans.png?1', image_mini:'images/items/yield/beans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[747] = {item_id:747, nshort:'hammer', name:'Młotek', type:'yield', level:null, price:22, image:'images/items/yield/hammer.png?1', image_mini:'images/items/yield/hammer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[748] = {item_id:748, nshort:'corn', name:'Kukurydza', type:'yield', level:null, price:4, image:'images/items/yield/corn.png?1', image_mini:'images/items/yield/corn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[749] = {item_id:749, nshort:'rope', name:'Lasso', type:'yield', level:null, price:32, image:'images/items/yield/rope.png?1', image_mini:'images/items/yield/rope.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[750] = {item_id:750, nshort:'nippers', name:'Kajdanki', type:'yield', level:null, price:58, image:'images/items/yield/nippers.png?1', image_mini:'images/items/yield/nippers.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[751] = {item_id:751, nshort:'pipe', name:'Fajka pokoju', type:'yield', level:null, price:72, image:'images/items/yield/pipe.png?1', image_mini:'images/items/yield/pipe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[752] = {item_id:752, nshort:'oil', name:'Olej', type:'yield', level:null, price:76, image:'images/items/yield/oil.png?1', image_mini:'images/items/yield/oil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[753] = {item_id:753, nshort:'pick', name:'Kilof', type:'yield', level:null, price:44, image:'images/items/yield/pick.png?1', image_mini:'images/items/yield/pick.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[754] = {item_id:754, nshort:'horseshoe', name:'Podkowa', type:'yield', level:null, price:30, image:'images/items/yield/horseshoe.png?1', image_mini:'images/items/yield/horseshoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[755] = {item_id:755, nshort:'flag', name:'Chorągiewka', type:'yield', level:null, price:32, image:'images/items/yield/flag.png?1', image_mini:'images/items/yield/flag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[756] = {item_id:756, nshort:'toolbox', name:'Skrzynka z narzędziami', type:'yield', level:null, price:110, image:'images/items/yield/toolbox.png?1', image_mini:'images/items/yield/toolbox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[757] = {item_id:757, nshort:'feather', name:'Pióro kruka', type:'yield', level:null, price:8, image:'images/items/yield/feather.png?1', image_mini:'images/items/yield/feather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[758] = {item_id:758, nshort:'flag_north', name:'Flaga Stanów Północnych', type:'yield', level:null, price:86, image:'images/items/yield/flag_north.png?1', image_mini:'images/items/yield/flag_north.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[759] = {item_id:759, nshort:'ticket', name:'Bilet', type:'yield', level:null, price:34, image:'images/items/yield/ticket.png?1', image_mini:'images/items/yield/ticket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[760] = {item_id:760, nshort:'map', name:'Mapa', type:'yield', level:null, price:32, image:'images/items/yield/map.png?1', image_mini:'images/items/yield/map.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[761] = {item_id:761, nshort:'sledgehammer', name:'Młot kowalski', type:'yield', level:null, price:52, image:'images/items/yield/sledgehammer.png?1', image_mini:'images/items/yield/sledgehammer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[762] = {item_id:762, nshort:'flag_south', name:'Flaga Stanów Południowych', type:'yield', level:null, price:86, image:'images/items/yield/flag_south.png?1', image_mini:'images/items/yield/flag_south.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[763] = {item_id:763, nshort:'wolf', name:'Bransoleta z zębem', type:'yield', level:null, price:44, image:'images/items/yield/wolf.png?1', image_mini:'images/items/yield/wolf.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[764] = {item_id:764, nshort:'shackle', name:'Okowy', type:'yield', level:null, price:62, image:'images/items/yield/shackle.png?1', image_mini:'images/items/yield/shackle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[765] = {item_id:765, nshort:'sickle', name:'Sierp', type:'yield', level:null, price:44, image:'images/items/yield/sickle.png?1', image_mini:'images/items/yield/sickle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[766] = {item_id:766, nshort:'water', name:'Szklanka wody', type:'yield', level:null, price:6, image:'images/items/yield/water.png?1', image_mini:'images/items/yield/water.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[767] = {item_id:767, nshort:'string', name:'Szpulka drutu', type:'yield', level:null, price:34, image:'images/items/yield/string.png?1', image_mini:'images/items/yield/string.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[768] = {item_id:768, nshort:'hymnal', name:'Śpiewnik', type:'yield', level:null, price:48, image:'images/items/yield/hymnal.png?1', image_mini:'images/items/yield/hymnal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Komplet Pielgrzyma'}, shop:'drop'};\n\
items[769] = {item_id:769, nshort:'empty_bottle', name:'Pusta butelka', type:'yield', level:null, price:2, image:'images/items/yield/empty_bottle.png?1', image_mini:'images/items/yield/empty_bottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[770] = {item_id:770, nshort:'beer', name:'Piwo', type:'yield', level:null, price:0, image:'images/items/yield/beer.png?1', image_mini:'images/items/yield/beer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[771] = {item_id:771, nshort:'trap', name:'Pułapka na bobry', type:'yield', level:null, price:50, image:'images/items/yield/trap.png?1', image_mini:'images/items/yield/trap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[772] = {item_id:772, nshort:'falcon', name:'Złoty Sokół', type:'yield', level:null, price:0, image:'images/items/yield/falcon.png?1', image_mini:'images/items/yield/falcon.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[773] = {item_id:773, nshort:'paper1', name:'Kawałek kartki (część 1)', type:'yield', level:null, price:1400, image:'images/items/yield/paper1.png?1', image_mini:'images/items/yield/paper1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[774] = {item_id:774, nshort:'paper2', name:'Kawałek kartki (część 2)', type:'yield', level:null, price:590, image:'images/items/yield/paper2.png?1', image_mini:'images/items/yield/paper2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[775] = {item_id:775, nshort:'paper3', name:'Kawałek kartki (część 3)', type:'yield', level:null, price:590, image:'images/items/yield/paper3.png?1', image_mini:'images/items/yield/paper3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[776] = {item_id:776, nshort:'kates_ring', name:'Pierścień Kate', type:'yield', level:null, price:1000, image:'images/items/yield/kates_ring.png?1', image_mini:'images/items/yield/kates_ring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[778] = {item_id:778, nshort:'cooking_pot', name:'Garnek do gotowania', type:'yield', level:null, price:22, image:'images/items/yield/cooking_pot.png?1', image_mini:'images/items/yield/cooking_pot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[779] = {item_id:779, nshort:'post_horn', name:'Trąbka pocztyliona', type:'yield', level:null, price:60, image:'images/items/yield/post_horn.png?1', image_mini:'images/items/yield/post_horn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[780] = {item_id:780, nshort:'rounds', name:'Naboje', type:'yield', level:null, price:50, image:'images/items/yield/rounds.png?1', image_mini:'images/items/yield/rounds.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[781] = {item_id:781, nshort:'documents', name:'Dokumenty', type:'yield', level:null, price:120, image:'images/items/yield/documents.png?1', image_mini:'images/items/yield/documents.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[782] = {item_id:782, nshort:'angle', name:'Wędka', type:'yield', level:null, price:42, image:'images/items/yield/angle.png?1', image_mini:'images/items/yield/angle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[783] = {item_id:783, nshort:'gold_sculpture', name:'Złota figura', type:'yield', level:null, price:144, image:'images/items/yield/gold_sculpture.png?1', image_mini:'images/items/yield/gold_sculpture.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[784] = {item_id:784, nshort:'nails', name:'Gwoździe', type:'yield', level:null, price:8, image:'images/items/yield/nails.png?1', image_mini:'images/items/yield/nails.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
items[786] = {item_id:786, nshort:'picture', name:'Obraz', type:'yield', level:null, price:340, image:'images/items/yield/picture.png?1', image_mini:'images/items/yield/picture.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[787] = {item_id:787, nshort:'saddle', name:'Siodło', type:'yield', level:null, price:80, image:'images/items/yield/saddle.png?1', image_mini:'images/items/yield/saddle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[788] = {item_id:788, nshort:'bell', name:'Dzwon okrętowy', type:'yield', level:null, price:130, image:'images/items/yield/bell.png?1', image_mini:'images/items/yield/bell.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[789] = {item_id:789, nshort:'coin', name:'Ćwierćdolarówka', type:'yield', level:null, price:2, image:'images/items/yield/coin.png?1', image_mini:'images/items/yield/coin.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[790] = {item_id:790, nshort:'iron', name:'Pręty metalowe', type:'yield', level:null, price:36, image:'images/items/yield/iron.png?1', image_mini:'images/items/yield/iron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[791] = {item_id:791, nshort:'orange', name:'Pomarańcza', type:'yield', level:null, price:8, image:'images/items/yield/orange.png?1', image_mini:'images/items/yield/orange.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[792] = {item_id:792, nshort:'tequila', name:'Tequila', type:'yield', level:null, price:24, image:'images/items/yield/tequila.png?1', image_mini:'images/items/yield/tequila.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Komplet Meksykanina'}, shop:'drop'};\n\
items[793] = {item_id:793, nshort:'tomato', name:'Pomidor', type:'yield', level:null, price:6, image:'images/items/yield/tomato.png?1', image_mini:'images/items/yield/tomato.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[794] = {item_id:794, nshort:'potion', name:'Eliksir', type:'yield', level:null, price:360, image:'images/items/yield/potion.png?1', image_mini:'images/items/yield/potion.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_quackery', name:'Komplet Konowała'}, shop:'drop'};\n\
items[795] = {item_id:795, nshort:'peg', name:'Pal drewniany', type:'yield', level:null, price:15, image:'images/items/yield/peg.png?1', image_mini:'images/items/yield/peg.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
items[797] = {item_id:797, nshort:'pitchfork', name:'Widły', type:'yield', level:null, price:32, image:'images/items/yield/pitchfork.png?1', image_mini:'images/items/yield/pitchfork.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_farmer', name:'Komplet Farmera'}, shop:'drop'};\n\
\n\
\n\
items[800] = {item_id:800, nshort:'stone_pebble', name:'Krzemień', type:'right_arm', level:2, price:15, image:'images/items/right_arm/stone_pebble.png?1', image_mini:'images/items/right_arm/mini/stone_pebble.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[801] = {item_id:801, nshort:'stone_flint', name:'Wzbogacony Krzemień', type:'right_arm', level:5, price:26, image:'images/items/right_arm/stone_flint.png?1', image_mini:'images/items/right_arm/mini/stone_flint.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[802] = {item_id:802, nshort:'stone_granite', name:'Granit', type:'right_arm', level:8, price:46, image:'images/items/right_arm/stone_granite.png?1', image_mini:'images/items/right_arm/mini/stone_granite.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[803] = {item_id:803, nshort:'crutch_rusty', name:'Wytarta proca', type:'right_arm', level:7, price:26, image:'images/items/right_arm/crutch_rusty.png?1', image_mini:'images/items/right_arm/mini/crutch_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[804] = {item_id:804, nshort:'crutch', name:'Proca', type:'right_arm', level:10, price:63, image:'images/items/right_arm/crutch.png?1', image_mini:'images/items/right_arm/mini/crutch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[805] = {item_id:805, nshort:'crutch_accurate', name:'Precyzyjna proca', type:'right_arm', level:13, price:148, image:'images/items/right_arm/crutch_accurate.png?1', image_mini:'images/items/right_arm/mini/crutch_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[806] = {item_id:806, nshort:'crutch_huckeberry', name:'Proca Huckleberry\\'ego', type:'right_arm', level:20, price:1360, image:'images/items/right_arm/crutch_huckeberry.png?1', image_mini:'images/items/right_arm/mini/crutch_huckeberry.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[807] = {item_id:807, nshort:'leadshot_rusty', name:'Zardzewiała broń śrutowa', type:'right_arm', level:17, price:124, image:'images/items/right_arm/leadshot_rusty.png?1', image_mini:'images/items/right_arm/mini/leadshot_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[808] = {item_id:808, nshort:'leadshot', name:'Pistolet śrutowy', type:'right_arm', level:20, price:384, image:'images/items/right_arm/leadshot.png?1', image_mini:'images/items/right_arm/mini/leadshot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[809] = {item_id:809, nshort:'leadshot_accurate', name:'Precyzyjna broń śrutowa', type:'right_arm', level:23, price:550, image:'images/items/right_arm/leadshot_accurate.png?1', image_mini:'images/items/right_arm/mini/leadshot_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[810] = {item_id:810, nshort:'leadshot_granmonts', name:'Pistolet Granmonta', type:'right_arm', level:30, price:2680, image:'images/items/right_arm/leadshot_granmonts.png?1', image_mini:'images/items/right_arm/mini/leadshot_granmonts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:4, tough:3}, attributes:{}}, set:{key:null, name:null}, drop:'drop'};\n\
items[811] = {item_id:811, nshort:'muzzleloader_rusty', name:'Zardzewiała broń odprzodowa', type:'right_arm', level:22, price:326, image:'images/items/right_arm/muzzleloader_rusty.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[812] = {item_id:812, nshort:'muzzleloader', name:'Broń odprzodowa', type:'right_arm', level:25, price:545, image:'images/items/right_arm/muzzleloader.png?1', image_mini:'images/items/right_arm/mini/muzzleloader.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[813] = {item_id:813, nshort:'muzzleloader_accurate', name:'Precyzyjna broń odprzodowa', type:'right_arm', level:28, price:940, image:'images/items/right_arm/muzzleloader_accurate.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[814] = {item_id:814, nshort:'muzzleloader_drake', name:'Pistolet odprzodowy Francisa Drake\\'a', type:'right_arm', level:35, price:3580, image:'images/items/right_arm/muzzleloader_drake.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_drake.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[815] = {item_id:815, nshort:'deringer_rusty', name:'Rdzawy Deringer', type:'right_arm', level:32, price:730, image:'images/items/right_arm/deringer_rusty.png?1', image_mini:'images/items/right_arm/mini/deringer_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[816] = {item_id:816, nshort:'deringer', name:'Deringer', type:'right_arm', level:35, price:1280, image:'images/items/right_arm/deringer.png?1', image_mini:'images/items/right_arm/mini/deringer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[817] = {item_id:817, nshort:'deringer_accurate', name:'Precyzyjny Deringer', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/deringer_accurate.png?1', image_mini:'images/items/right_arm/mini/deringer_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\items[818] = {item_id:818, nshort:'deringer_bellestar', name:'Deringer Belle Starr', type:'right_arm', level:45, price:5500, image:'images/items/right_arm/deringer_bellestar.png?1', image_mini:'images/items/right_arm/mini/deringer_bellestar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:4, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[818] = {item_id:818, nshort:'deringer_bellestar', name:'Deringer Belle Starr', type:'right_arm', level:45, price:5500, image:'images/items/right_arm/deringer_bellestar.png?1', image_mini:'images/items/right_arm/mini/deringer_bellestar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:4, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[819] = {item_id:819, nshort:'pepperbox_rusty', name:'Zardzewiały rewolwer wiązkowy', type:'right_arm', level:37, price:940, image:'images/items/right_arm/pepperbox_rusty.png?1', image_mini:'images/items/right_arm/mini/pepperbox_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[820] = {item_id:820, nshort:'pepperbox', name:'Rewolwer wiązkowy', type:'right_arm', level:40, price:1440, image:'images/items/right_arm/pepperbox.png?1', image_mini:'images/items/right_arm/mini/pepperbox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[821] = {item_id:821, nshort:'pepperbox_accurate', name:'Precyzyjny rewolwer wiązkowy', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/pepperbox_accurate.png?1', image_mini:'images/items/right_arm/mini/pepperbox_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[822] = {item_id:822, nshort:'pepperbox_allen', name:'Rewolwer wiązkowy Allena', type:'right_arm', level:50, price:6850, image:'images/items/right_arm/pepperbox_allen.png?1', image_mini:'images/items/right_arm/mini/pepperbox_allen.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:5, dodge:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[823] = {item_id:823, nshort:'smith_rusty', name:'Zardzewiały Smith & Wesson Model 1', type:'right_arm', level:47, price:1650, image:'images/items/right_arm/smith_rusty.png?1', image_mini:'images/items/right_arm/mini/smith_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[824] = {item_id:824, nshort:'smith', name:'Smith & Wesson Model 1', type:'right_arm', level:50, price:2350, image:'images/items/right_arm/smith.png?1', image_mini:'images/items/right_arm/mini/smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[825] = {item_id:825, nshort:'smith_accurate', name:'Precyzyjny Smith & Wesson Model 1', type:'right_arm', level:53, price:3180, image:'images/items/right_arm/smith_accurate.png?1', image_mini:'images/items/right_arm/mini/smith_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[826] = {item_id:826, nshort:'smith_younger', name:'Revolver Youngers', type:'right_arm', level:60, price:8700, image:'images/items/right_arm/smith_younger.png?1', image_mini:'images/items/right_arm/mini/smith_younger.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:6, pitfall:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[827] = {item_id:827, nshort:'remington_rusty', name:'Zardzewiały Remington', type:'right_arm', level:52, price:2150, image:'images/items/right_arm/remington_rusty.png?1', image_mini:'images/items/right_arm/mini/remington_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[828] = {item_id:828, nshort:'remington', name:'Remington', type:'right_arm', level:55, price:2950, image:'images/items/right_arm/remington.png?1', image_mini:'images/items/right_arm/mini/remington.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[829] = {item_id:829, nshort:'remington_accurate', name:'Precyzyjny Remington', type:'right_arm', level:58, price:3940, image:'images/items/right_arm/remington_accurate.png?1', image_mini:'images/items/right_arm/mini/remington_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[830] = {item_id:830, nshort:'remington_ike', name:'Rewolwer Ike\\'a', type:'right_arm', level:65, price:3940, image:'images/items/right_arm/remington_ike.png?1', image_mini:'images/items/right_arm/mini/remington_ike.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:7, endurance:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[831] = {item_id:831, nshort:'peacemaker_rusty', name:'Zardzewiały Colt Peacemaker', type:'right_arm', level:62, price:3380, image:'images/items/right_arm/peacemaker_rusty.png?1', image_mini:'images/items/right_arm/mini/peacemaker_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[832] = {item_id:832, nshort:'peacemaker', name:'Colt Peacemaker', type:'right_arm', level:65, price:4570, image:'images/items/right_arm/peacemaker.png?1', image_mini:'images/items/right_arm/mini/peacemaker.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[833] = {item_id:833, nshort:'peacemaker_accurate', name:'Precyzyjny Colt Peacemaker', type:'right_arm', level:68, price:5400, image:'images/items/right_arm/peacemaker_accurate.png?1', image_mini:'images/items/right_arm/mini/peacemaker_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[834] = {item_id:834, nshort:'peacemaker_billy', name:'Colt Peacemaker Billa', type:'right_arm', level:75, price:10300, image:'images/items/right_arm/peacemaker_billy.png?1', image_mini:'images/items/right_arm/mini/peacemaker_billy.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[835] = {item_id:835, nshort:'schofield_rusty', name:'Zardzewiały Smith & Wesson Schofield', type:'right_arm', level:67, price:4250, image:'images/items/right_arm/schofield_rusty.png?1', image_mini:'images/items/right_arm/mini/schofield_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[836] = {item_id:836, nshort:'schofield', name:'Smith & Wesson Schofield', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/schofield.png?1', image_mini:'images/items/right_arm/mini/schofield.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[837] = {item_id:837, nshort:'schofield_accurate', name:'Precyzyjny Smith & Wesson Schofield', type:'right_arm', level:73, price:6400, image:'images/items/right_arm/schofield_accurate.png?1', image_mini:'images/items/right_arm/mini/schofield_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[838] = {item_id:838, nshort:'schofield_jessejames', name:'Smith & Wesson Schofield Jesseiego James\\'a', type:'right_arm', level:80, price:10600, image:'images/items/right_arm/schofield_jessejames.png?1', image_mini:'images/items/right_arm/mini/schofield_jessejames.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:8, trade:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[839] = {item_id:839, nshort:'buntline_rusty', name:'Zardzewiały Colt Buntline', type:'right_arm', level:72, price:5375, image:'images/items/right_arm/buntline_rusty.png?1', image_mini:'images/items/right_arm/mini/buntline_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[840] = {item_id:840, nshort:'buntline', name:'Colt Buntline', type:'right_arm', level:75, price:6250, image:'images/items/right_arm/buntline.png?1', image_mini:'images/items/right_arm/mini/buntline.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[841] = {item_id:841, nshort:'buntline_accurate', name:'Precyzyjny Colt Buntline', type:'right_arm', level:78, price:7250, image:'images/items/right_arm/buntline_accurate.png?1', image_mini:'images/items/right_arm/mini/buntline_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[842] = {item_id:842, nshort:'buntline_wyattearp', name:'Wyatt Earp\\'s Colt Buntline', type:'right_arm', level:85, price:11200, image:'images/items/right_arm/buntline_wyattearp.png?1', image_mini:'images/items/right_arm/mini/buntline_wyattearp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, aim:4, reflex:4, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[843] = {item_id:843, nshort:'boomerang', name:'Bumerang', type:'right_arm', level:8, price:126, image:'images/items/right_arm/boomerang.png?1', image_mini:'images/items/right_arm/mini/boomerang.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{reflex:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[844] = {item_id:844, nshort:'throwing_knives', name:'Nóż do rzucania', type:'right_arm', level:33, price:1152, image:'images/items/right_arm/throwing_knives.png?1', image_mini:'images/items/right_arm/mini/throwing_knives.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[845] = {item_id:845, nshort:'sawed_off', name:'Krótka śrutówka', type:'right_arm', level:51, price:2940, image:'images/items/right_arm/sawed_off.png?1', image_mini:'images/items/right_arm/mini/sawed_off.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:3, shot:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[846] = {item_id:846, nshort:'trompet', name:'Trąbka', type:'right_arm', level:20, price:1200, image:'images/items/right_arm/trompet.png?1', image_mini:'images/items/right_arm/mini/trompet.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[854] = {item_id:854, nshort:'elixier', name:'Żrący kwas', type:'right_arm', level:42, price:1500, image:'images/items/right_arm/elixier.png?1', image_mini:'images/items/right_arm/mini/elixier.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:'set_quackery', name:'Komplet Konowała'}, shop:'shop'};\n\
\n\
items[856] = {item_id:856, nshort:'smells_like_eggspirit', name:'Zgniłe jajka', type:'right_arm', level:45, price:2500, image:'images/items/right_arm/smells_like_eggspirit.png?1', image_mini:'images/items/right_arm/mini/smells_like_eggspirit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'season_set', name:'Zestaw świąteczny'}, shop:'quest'};\n\
\n\
items[1364] = {item_id:1364, nshort:'uniform_perfect', name:'Mundur', type:'body', level:20, price:800, image:'images/items/body/uniform_perfect.png?1', image_mini:'images/items/body/mini/uniform_perfect.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:3, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[1702] = {item_id:1702, nshort:'compass', name:'Kompas', type:'yield', level:null, price:380, image:'images/items/yield/compass.png?1', image_mini:'images/items/yield/compass.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1703] = {item_id:1703, nshort:'lamp', name:'Lampa', type:'yield', level:null, price:80, image:'images/items/yield/lamp.png?1', image_mini:'images/items/yield/lamp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1706] = {item_id:1706, nshort:'letter', name:'List', type:'yield', level:null, price:1, image:'images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1708] = {item_id:1708, nshort:'whiskey', name:'Whiskey', type:'yield', level:null, price:10, image:'images/items/yield/whiskey.png?1', image_mini:'images/items/yield/whiskey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1709] = {item_id:1709, nshort:'gold', name:'Skarb Indian', type:'yield', level:null, price:26000, image:'images/items/yield/gold.png?1', image_mini:'images/items/yield/gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1710] = {item_id:1710, nshort:'key1', name:'Stary klucz', type:'yield', level:null, price:42, image:'images/items/yield/key1.png?1', image_mini:'images/items/yield/key1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1711] = {item_id:1711, nshort:'key2', name:'Stary klucz', type:'yield', level:null, price:46, image:'images/items/yield/key2.png?1', image_mini:'images/items/yield/key2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1713] = {item_id:1713, nshort:'easteregg', name:'Jajko wielkanocne', type:'yield', level:null, price:20, image:'images/items/yield/easteregg.png?1', image_mini:'images/items/yield/easteregg.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[1715] = {item_id:1715, nshort:'cane', name:'Laska', type:'yield', level:42, price:2800, image:'images/items/yield/cane.png?1', image_mini:'images/items/yield/cane.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{}, attributes:{charisma:2}}, set:{key:'set_gentleman', name:'Komplet Dżentelmena'}, shop:'quest'};\n\
items[1716] = {item_id:1716, nshort:'letter', name:'List polecający', type:'yield', level:null, price:2, image:'images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1717] = {item_id:1717, nshort:'chamber_pot', name:'Nocnik', type:'yield', level:null, price:750, image:'images/items/yield/chamber_pot.png?1', image_mini:'images/items/yield/chamber_pot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Śpioszek'}, shop:'drop'};\n\
items[1733] = {item_id:1733, nshort:'henrys_packet', name:'Polecenie Henrego', type:'yield', level:null, price:32, image:'images/items/yield/henrys_packet.png?1', image_mini:'images/items/yield/henrys_packet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[1750] = {item_id:1750, nshort:'ponytail', name:'Warkocz', type:'yield', level:null, price:66, image:'images/items/yield/ponytail.png?1', image_mini:'images/items/yield/ponytail.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[1751] = {item_id:1751, nshort:'ruby', name:'Rubin', type:'yield', level:null, price:66, image:'images/items/yield/ruby.png?1', image_mini:'images/items/yield/ruby.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1752] = {item_id:1752, nshort:'egg1', name:'1. jajko wielkanocne', type:'yield', level:null, price:4, image:'images/items/yield/egg1.png?1', image_mini:'images/items/yield/egg1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1753] = {item_id:1753, nshort:'egg2', name:'2. jajko wielkanocne', type:'yield', level:null, price:4, image:'images/items/yield/egg2.png?1', image_mini:'images/items/yield/egg2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1754] = {item_id:1754, nshort:'egg3', name:'3. jajko wielkanocne', type:'yield', level:null, price:4, image:'images/items/yield/egg3.png?1', image_mini:'images/items/yield/egg3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1755] = {item_id:1755, nshort:'bag', name:'Torba z łupami', type:'yield', level:null, price:2000, image:'images/items/yield/bag.png?1', image_mini:'images/items/yield/bag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1756] = {item_id:1756, nshort:'mask', name:'Maska', type:'yield', level:null, price:200, image:'images/items/yield/mask.png?1', image_mini:'images/items/yield/mask.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1757] = {item_id:1757, nshort:'dfprocket1', name:'Prototyp', type:'yield', level:null, price:1, image:'images/items/yield/dfprocket1.png?1', image_mini:'images/items/yield/dfprocket1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'guest'};\n\
items[1758] = {item_id:1758, nshort:'hgfrocket2', name:'Niewypał', type:'yield', level:null, price:1, image:'images/items/yield/hgfrocket2.png?1', image_mini:'images/items/yield/hgfrocket2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1759] = {item_id:1759, nshort:'dfgrocket1a', name:'Rakieta', type:'yield', level:null, price:2700, image:'images/items/yield/dfgrocket1a.png?1', image_mini:'images/items/yield/dfgrocket1a.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Zestaw świąteczny'}, shop:'shop'};\n\
items[1760] = {item_id:1760, nshort:'bucket', name:'Puste wiadro', type:'yield', level:null, price:20, image:'images/items/yield/bucket.png?1', image_mini:'images/items/yield/bucket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1761] = {item_id:1761, nshort:'bucket_full', name:'Pełne wiadro', type:'yield', level:null, price:21, image:'images/items/yield/bucket_full.png?1', image_mini:'images/items/yield/bucket_full.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1762] = {item_id:1762, nshort:'bucket_fire', name:'Wiadro do gaszenia', type:'yield', level:null, price:25, image:'images/items/yield/bucket_fire.png?1', image_mini:'images/items/yield/bucket_fire.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'fireworker_set', name:'Komplet strażaka'}, shop:'quest'};\n\
\n\
items[1766] = {item_id:1766, nshort:'mudball', name:'Dziwna gruda ziemi', type:'yield', level:null, price:1, image:'images/items/yield/mudball.png?1', image_mini:'images/items/yield/mudball.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1767] = {item_id:1767, nshort:'muditem', name:'Zabrudzony przedmiot', type:'yield', level:null, price:10, image:'images/items/yield/muditem.png?1', image_mini:'images/items/yield/muditem.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1768] = {item_id:1768, nshort:'dustgun', name:'Zakurzony rewolwer', type:'yield', level:null, price:100, image:'images/items/yield/dustgun.png?1', image_mini:'images/items/yield/dustgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1769] = {item_id:1769, nshort:'goldgun', name:'Złoty rewolwer', type:'yield', level:null, price:100, image:'images/items/yield/goldgun.png?1', image_mini:'images/items/yield/goldgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1770] = {item_id:1770, nshort:'bloodycloth', name:'Zakrwawiony kawałek materiału', type:'yield', level:null, price:1, image:'images/items/yield/bloodycloth.png?1', image_mini:'images/items/yield/bloodycloth.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1771] = {item_id:1771, nshort:'photo', name:'Stara fotografia', type:'yield', level:null, price:1, image:'images/items/yield/photo.png?1', image_mini:'images/items/yield/photo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'guest'};\n\
items[1772] = {item_id:1772, nshort:'umbrella', name:'Parasol Kudrama', type:'yield', level:42, price:2800, image:'images/items/yield/umbrella.png?1', image_mini:'images/items/yield/umbrella.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:8, finger_dexterity:6, endurance:10}, attributes:{strength:1}}, set:{key:'set_dancer', name:'Komplet Tancerki'}, shop:'guest'};\n\
items[1773] = {item_id:1773, nshort:'testament', name:'Testament', type:'yield', level:null, price:1, image:'images/items/yield/testament.png?1', image_mini:'images/items/yield/testament.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1774] = {item_id:1774, nshort:'engagementring', name:'Pierścionek zaręczynowy', type:'yield', level:null, price:1, image:'images/items/yield/engagementring.png?1', image_mini:'images/items/yield/engagementring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1775] = {item_id:1775, nshort:'birthcertificate', name:'Świadectwo urodzenia', type:'yield', level:null, price:1, image:'images/items/yield/birthcertificate.png?1', image_mini:'images/items/yield/birthcertificate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1776] = {item_id:1776, nshort:'darkplans', name:'Niecne plany', type:'yield', level:null, price:1, image:'images/items/yield/darkplans.png?1', image_mini:'images/items/yield/darkplans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1777] = {item_id:1777, nshort:'docreport', name:'Diagnoza lekarska', type:'yield', level:null, price:1, image:'images/items/yield/docreport.png?1', image_mini:'images/items/yield/docreport.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1778] = {item_id:1778, nshort:'brandingiron', name:'Pogięty stempel do znakowania', type:'yield', level:null, price:1, image:'images/items/yield/brandingiron.png?1', image_mini:'images/items/yield/brandingiron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1779] = {item_id:1779, nshort:'cardpiece1', name:'1. kawałek mapy', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece1.png?1', image_mini:'images/items/yield/cardpiece1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1779] = {item_id:1779, nshort:'cardpiece1', name:'1. kawałek mapy', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece1.png?1', image_mini:'images/items/yield/cardpiece1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1780] = {item_id:1780, nshort:'cardpiece2', name:'2. kawałek mapy', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece2.png?1', image_mini:'images/items/yield/cardpiece2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1781] = {item_id:1781, nshort:'cardpiece3', name:'3. kawałek mapy', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece3.png?1', image_mini:'images/items/yield/cardpiece3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1782] = {item_id:1782, nshort:'cardpiece4', name:'4. kawałek mapy', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece4.png?1', image_mini:'images/items/yield/cardpiece4.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1783] = {item_id:1783, nshort:'cardcomplete', name:'Kompletna mapa', type:'yield', level:null, price:1, image:'images/items/yield/cardcomplete.png?1', image_mini:'images/items/yield/cardcomplete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1784] = {item_id:1784, nshort:'itemlist', name:'Lista przedmiotów', type:'yield', level:null, price:1, image:'images/items/yield/itemlist.png?1', image_mini:'images/items/yield/itemlist.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1785] = {item_id:1785, nshort:'torch', name:'Pochodnia', type:'yield', level:null, price:1, image:'images/items/yield/torch.png?1', image_mini:'images/items/yield/torch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1786] = {item_id:1786, nshort:'bagpack', name:'Plecak', type:'yield', level:null, price:1, image:'images/items/yield/bagpack.png?1', image_mini:'images/items/yield/bagpack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1787] = {item_id:1787, nshort:'ashes', name:'Popiół', type:'yield', level:null, price:1, image:'images/items/yield/ashes.png?1', image_mini:'images/items/yield/ashes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1788] = {item_id:1788, nshort:'gravel', name:'Krzemienie', type:'yield', level:null, price:10, image:'images/items/yield/gravel.png?1', image_mini:'images/items/yield/gravel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1789] = {item_id:1789, nshort:'brokenshovel', name:'Złamana łopata', type:'yield', level:null, price:50, image:'images/items/yield/brokenshovel.png?1', image_mini:'images/items/yield/brokenshovel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1790] = {item_id:1790, nshort:'treeboat', name:'Wydrążony pień drzewa', type:'yield', level:null, price:50, image:'images/items/yield/treeboat.png?1', image_mini:'images/items/yield/treeboat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1791] = {item_id:1791, nshort:'golddust', name:'Złoty pył', type:'yield', level:null, price:100, image:'images/items/yield/golddust.png?1', image_mini:'images/items/yield/golddust.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1792] = {item_id:1792, nshort:'goldnugget', name:'Bryłka złota', type:'yield', level:null, price:5000, image:'images/items/yield/goldnugget.png?1', image_mini:'images/items/yield/goldnugget.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1793] = {item_id:1793, nshort:'bendmetall', name:'Zabrudzony, wygięty kawał metalu', type:'yield', level:null, price:1, image:'images/items/yield/bendmetall.png?1', image_mini:'images/items/yield/bendmetall.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1794] = {item_id:1794, nshort:'dirtymetall', name:'Zabrudzony kawał metalu', type:'yield', level:null, price:10, image:'images/items/yield/dirtymetall.png?1', image_mini:'images/items/yield/dirtymetall.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1795] = {item_id:1795, nshort:'goldblade', name:'Czyste złote ostrze', type:'yield', level:null, price:100, image:'images/items/yield/goldblade.png?1', image_mini:'images/items/yield/goldblade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1796] = {item_id:1796, nshort:'sharpgoldblade', name:'Ostre złote ostrze', type:'yield', level:null, price:100, image:'images/items/yield/sharpgoldblade.png?1', image_mini:'images/items/yield/sharpgoldblade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1797] = {item_id:1797, nshort:'sheriffpaper', name:'Raport szeryfa', type:'yield', level:null, price:10, image:'images/items/yield/sheriffpaper.png?1', image_mini:'images/items/yield/sheriffpaper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[1799] = {item_id:1799, nshort:'crystallball', name:'Kryształowa kula', type:'yield', level:null, price:10000, image:'images/items/yield/crystallball.png?1', image_mini:'images/items/yield/crystallball.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1800] = {item_id:1800, nshort:'toadblood', name:'Krew ropuchy', type:'yield', level:null, price:10, image:'images/items/yield/toadblood.png?1', image_mini:'images/items/yield/toadblood.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1801] = {item_id:1801, nshort:'coyoteheart', name:'Serce kojota', type:'yield', level:null, price:10, image:'images/items/yield/coyoteheart.png?1', image_mini:'images/items/yield/coyoteheart.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1802] = {item_id:1802, nshort:'phantomdrawing', name:'Portret pamięciowy', type:'yield', level:null, price:10, image:'images/items/yield/phantomdrawing.png?1', image_mini:'images/items/yield/phantomdrawing.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1803] = {item_id:1803, nshort:'candyorange', name:'Kandyzowana pomarańcza', type:'yield', level:null, price:10, image:'images/items/yield/candyorange.png?1', image_mini:'images/items/yield/candyorange.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1804] = {item_id:1804, nshort:'smellingfish', name:'Śmierdząca ryba', type:'yield', level:null, price:10, image:'images/items/yield/smellingfish.png?1', image_mini:'images/items/yield/smellingfish.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
";


bi2_code += "\n\
raboty = [];\n\
raboty[1] = {rus_name:'Pilnowanie świń', name:'swine', malus:1, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:1, vezenie:0, boom:1, produkty:{700:20}}};\n\
raboty[2] = {rus_name:'Przepędzanie ptaków z pola', name:'scarecrow', malus:0, navyki:{build:1,shot:1,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:1, opyt:3, vezenie:2, boom:20, produkty:{757:20}}};\n\
raboty[3] = {rus_name:'Rozwieszanie plakatów', name:'wanted', malus:0, navyki:{endurance:1,ride:1,hide:1,finger_dexterity:1,pitfall:1}, resultaty:{dengi:2, opyt:3, vezenie:0, boom:10, produkty:{743:40}}};\n\
raboty[4] = {rus_name:'Zrywanie liści tytoniu', name:'tabacco', malus:0, navyki:{tough:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:2, produkty:{702:100}}};\n\
raboty[5] = {rus_name:'Zbiór bawełny', name:'cotton', malus:1, navyki:{tough:1,endurance:1,finger_dexterity:1,leadership:1,trade:1}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:3, produkty:{704:50}}};\n\
raboty[6] = {rus_name:'Zrywanie trzciny cukrowej', name:'sugar', malus:3, navyki:{punch:1,tough:1,finger_dexterity:1,repair:1,trade:1}, resultaty:{dengi:5, opyt:2, vezenie:4, boom:1, produkty:{703:100}}};\n\
raboty[7] = {rus_name:'Wędkowanie', name:'angle', malus:2, navyki:{hide:1,swim:3,repair:1}, resultaty:{dengi:1, opyt:0, vezenie:6, boom:2, produkty:{705:60, 782:3}}};\n\
raboty[8] = {rus_name:'Zbieranie zboża', name:'cereal', malus:10, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:2, opyt:6, vezenie:2, boom:4, produkty:{701:55}}};\n\
raboty[9] = {rus_name:'Zbieranie jagód', name:'berry', malus:15, navyki:{tough:2,hide:1,finger_dexterity:2}, resultaty:{dengi:2, opyt:6, vezenie:5, boom:6, produkty:{706:45}}};\n\
raboty[10] = {rus_name:'Wypasanie owiec', name:'sheeps', malus:11, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:5, vezenie:0, boom:2, produkty:{707:25}}};\n\
raboty[11] = {rus_name:'Sprzedaż gazet', name:'newspaper', malus:9, navyki:{ride:2,trade:2,appearance:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:1, produkty:{744:60}}};\n\
raboty[12] = {rus_name:'Koszenie pastwiska', name:'cut', malus:22, navyki:{punch:1,ride:1,finger_dexterity:1,animal:2}, resultaty:{dengi:5, opyt:7, vezenie:3, boom:3, produkty:{765:5}}};\n\
raboty[13] = {rus_name:'Mielenie zboża', name:'grinding', malus:25, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:11, opyt:7, vezenie:0, boom:5, produkty:{745:40}}};\n\
raboty[14] = {rus_name:'Zbieranie kukurydzy', name:'corn', malus:23, navyki:{finger_dexterity:1,tactic:1,trade:1,animal:1,appearance:1}, resultaty:{dengi:4, opyt:7, vezenie:8, boom:5, produkty:{748:25}}};\n\
raboty[15] = {rus_name:'Zbieranie fasoli', name:'beans', malus:23, navyki:{endurance:1,finger_dexterity:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:9, opyt:7, vezenie:4, boom:5, produkty:{746:40}}};\n\
raboty[16] = {rus_name:'Obserwacja fortecy', name:'fort_guard', malus:25, navyki:{reflex:1,shot:1,leadership:1,appearance:2}, resultaty:{dengi:3, opyt:9, vezenie:2, boom:7, produkty:{758:2}}};\n\
raboty[17] = {rus_name:'Garbowanie', name:'tanning', malus:40, navyki:{tough:1,endurance:1,swim:1,finger_dexterity:1,trade:1}, resultaty:{dengi:12, opyt:15, vezenie:5, boom:18, produkty:{712:15}}};\n\
raboty[18] = {rus_name:'Wydobycie złota', name:'digging', malus:31, navyki:{tough:1,reflex:1,swim:1,trade:2}, resultaty:{dengi:11, opyt:3, vezenie:5, boom:7, produkty:{708:17}}};\n\
raboty[19] = {rus_name:'Kopanie grobów', name:'grave', malus:76, navyki:{build:1,punch:1,tough:1,endurance:1,ride:1}, resultaty:{dengi:16, opyt:12, vezenie:22, boom:9, produkty:{736:8}}};\n\
raboty[20] = {rus_name:'Polowanie na indyki', name:'turkey', malus:43, navyki:{reflex:1,hide:2,shot:1,pitfall:1}, resultaty:{dengi:3, opyt:14, vezenie:7, boom:21, produkty:{709:13}}};\n\
raboty[21] = {rus_name:'Rozkładanie torów', name:'rail', malus:45, navyki:{build:2,endurance:1,repair:1,leadership:1}, resultaty:{dengi:10, opyt:18, vezenie:5, boom:10, produkty:{766:25}}};\n\
raboty[22] = {rus_name:'Hodowla krów', name:'cow', malus:39, navyki:{ride:2,reflex:1,tactic:1,animal:1}, resultaty:{dengi:5, opyt:17, vezenie:0, boom:11, produkty:{710:15}}};\n\
raboty[23] = {rus_name:'Naprawianie płotów', name:'fence', malus:36, navyki:{finger_dexterity:1,repair:2,animal:2}, resultaty:{dengi:7, opyt:11, vezenie:5, boom:6, produkty:{747:11}}};\n\
raboty[24] = {rus_name:'Tartak', name:'saw', malus:64, navyki:{reflex:2,finger_dexterity:2,trade:1}, resultaty:{dengi:23, opyt:12, vezenie:6, boom:32, produkty:{742:10}}};\n\
raboty[25] = {rus_name:'Kamieniołom', name:'stone', malus:53, navyki:{punch:3,endurance:1,reflex:1}, resultaty:{dengi:17, opyt:8, vezenie:9, boom:33, produkty:{716:22}}};\n\
raboty[26] = {rus_name:'Wyrównywanie koryta rzeki', name:'straighten', malus:85, navyki:{build:1,swim:3,tactic:1}, resultaty:{dengi:8, opyt:22, vezenie:15, boom:12, produkty:{795:5}}};\n\
raboty[27] = {rus_name:'Wycinka drzew', name:'wood', malus:48, navyki:{punch:2,endurance:1,reflex:1,appearance:1}, resultaty:{dengi:18, opyt:5, vezenie:2, boom:21, produkty:{711:25}}};\n\
raboty[28] = {rus_name:'Budowa urządzeń nawadniających', name:'irrigation', malus:45, navyki:{build:1,ride:1,repair:1,leadership:1,tactic:1}, resultaty:{dengi:7, opyt:13, vezenie:15, boom:6, produkty:{736:6}}};\n\
raboty[29] = {rus_name:'Znakowanie bydła', name:'brand', malus:50, navyki:{ride:1,reflex:1,pitfall:1,animal:2}, resultaty:{dengi:8, opyt:25, vezenie:0, boom:35, produkty:{740:13}}};\n\
raboty[30] = {rus_name:'Zakładanie ogrodzenia z drutu kolczastego', name:'wire', malus:58, navyki:{build:1,finger_dexterity:2,pitfall:1,animal:1}, resultaty:{dengi:17, opyt:13, vezenie:6, boom:0, produkty:{739:10}}};\n\
raboty[31] = {rus_name:'Burzenie tamy', name:'dam', malus:54, navyki:{swim:2,tactic:2,animal:1}, resultaty:{dengi:4, opyt:18, vezenie:9, boom:41, produkty:{714:5}}};\n\
raboty[32] = {rus_name:'Poszukiwanie kamieni szlachetnych', name:'gems', malus:75, navyki:{swim:2,finger_dexterity:1,trade:2}, resultaty:{dengi:25, opyt:7, vezenie:8, boom:4, produkty:{720:8}}};\n\
raboty[33] = {rus_name:'Ustanowienie prawa własności', name:'claim', malus:57, navyki:{build:1,endurance:1,swim:1,trade:1,appearance:1}, resultaty:{dengi:31, opyt:4, vezenie:4, boom:29, produkty:{755:25}}};\n\
raboty[34] = {rus_name:'Naprawa wozów osadników', name:'chuck_wagon', malus:134, navyki:{ride:1,repair:2,leadership:1,trade:1}, resultaty:{dengi:5, opyt:23, vezenie:42, boom:11, produkty:{722:15}}};\n\
raboty[35] = {rus_name:'Ujeżdżanie koni', name:'break_in', malus:72, navyki:{ride:2,reflex:1,pitfall:1,animal:1}, resultaty:{dengi:13, opyt:32, vezenie:10, boom:52, produkty:{787:5}}};\n\
raboty[36] = {rus_name:'Handel', name:'trade', malus:85, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:15, opyt:3, vezenie:25, boom:12, produkty:{715:13, 774:1}}};\n\
raboty[37] = {rus_name:'Stawianie masztów telegraficznych', name:'mast', malus:75, navyki:{build:2,punch:1,swim:1,repair:1}, resultaty:{dengi:21, opyt:25, vezenie:3, boom:14, produkty:{767:14}}};\n\
raboty[38] = {rus_name:'Kopanie studni', name:'spring', malus:103, navyki:{build:1,endurance:1,swim:1,leadership:1,tactic:1}, resultaty:{dengi:9, opyt:33, vezenie:23, boom:19, produkty:{741:10}}};\n\
raboty[39] = {rus_name:'Polowanie na bobry', name:'beaver', malus:120, navyki:{hide:2,pitfall:3}, resultaty:{dengi:32, opyt:17, vezenie:6, boom:21, produkty:{714:17, 771:13}}};\n\
raboty[40] = {rus_name:'Wydobycie węgla', name:'coal', malus:86, navyki:{punch:2,reflex:1,finger_dexterity:1,trade:1}, resultaty:{dengi:30, opyt:14, vezenie:0, boom:13, produkty:{721:37}}};\n\
raboty[41] = {rus_name:'Drukowanie gazet', name:'print', malus:83, navyki:{tough:1,endurance:1,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:30, opyt:20, vezenie:5, boom:7, produkty:{744:40}}};\n\
raboty[42] = {rus_name:'Połów ryb', name:'fishing', malus:91, navyki:{swim:2,pitfall:2,leadership:1}, resultaty:{dengi:6, opyt:23, vezenie:23, boom:38, produkty:{717:15, 705:5}}};\n\
raboty[43] = {rus_name:'Budowa stacji kolejowej', name:'trainstation', malus:113, navyki:{build:2,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:12, opyt:47, vezenie:7, boom:15, produkty:{759:7}}};\n\
raboty[44] = {rus_name:'Budowa wiatraków', name:'windmeel', malus:164, navyki:{build:1,endurance:1,ride:1,leadership:1,tactic:1}, resultaty:{dengi:42, opyt:43, vezenie:6, boom:18, produkty:{756:5}}};\n\
raboty[45] = {rus_name:'Eksploracja kontynentu', name:'explore', malus:112, navyki:{endurance:1,shot:1,ride:1,swim:1,leadership:1}, resultaty:{dengi:1, opyt:45, vezenie:22, boom:37, produkty:{760:15}}};\n\
raboty[46] = {rus_name:'Spław drewna', name:'float', malus:138, navyki:{reflex:1,swim:3,tactic:1}, resultaty:{dengi:23, opyt:45, vezenie:0, boom:52, produkty:{711:30}}};\n\
raboty[47] = {rus_name:'Budowa mostów', name:'bridge', malus:108, navyki:{build:1,endurance:1,swim:2,repair:1}, resultaty:{dengi:17, opyt:33, vezenie:18, boom:53, produkty:{761:8}}};\n\
raboty[48] = {rus_name:'Łapanie koni', name:'springe', malus:135, navyki:{endurance:1,ride:2,animal:2}, resultaty:{dengi:29, opyt:45, vezenie:0, boom:42, produkty:{749:22}}};\n\
raboty[49] = {rus_name:'Budowa trumien', name:'coffin', malus:119, navyki:{build:1,reflex:1,repair:2,appearance:1}, resultaty:{dengi:42, opyt:8, vezenie:15, boom:20, produkty:{734:25}}};\n\
raboty[50] = {rus_name:'Transportowanie amunicji', name:'dynamite', malus:145, navyki:{ride:1,reflex:1,shot:1,finger_dexterity:1,appearance:1}, resultaty:{dengi:23, opyt:12, vezenie:64, boom:93, produkty:{737:5}}};\n\
raboty[51] = {rus_name:'Polowanie na kojoty', name:'coyote', malus:141, navyki:{endurance:2,shot:1,pitfall:1,hide:1}, resultaty:{dengi:15, opyt:43, vezenie:26, boom:45, produkty:{718:6}}};\n\
raboty[52] = {rus_name:'Polowanie na bizony', name:'buffalo', malus:179, navyki:{ride:1,pitfall:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:24, opyt:62, vezenie:0, boom:72, produkty:{724:14}}};\n\
raboty[53] = {rus_name:'Budowa posiadłości', name:'fort', malus:225, navyki:{build:1,pitfall:1,repair:1,leadership:2}, resultaty:{dengi:33, opyt:71, vezenie:17, boom:35, produkty:{762:3}}};\n\
raboty[54] = {rus_name:'Handlowanie z Indianami', name:'indians', malus:224, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:11, opyt:14, vezenie:63, boom:34, produkty:{719:13}}};\n\
raboty[55] = {rus_name:'Karczowanie lasu', name:'clearing', malus:179, navyki:{punch:2,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:62, opyt:8, vezenie:9, boom:16, produkty:{711:65}}};\n\
raboty[56] = {rus_name:'Wydobycie srebra', name:'silver', malus:194, navyki:{punch:1,tough:1,finger_dexterity:1,trade:2}, resultaty:{dengi:76, opyt:8, vezenie:0, boom:32, produkty:{725:17}}};\n\
raboty[57] = {rus_name:'Ochrona powozu pocztowego', name:'diligence_guard', malus:404, navyki:{ride:1,shot:1,repair:1,leadership:2}, resultaty:{dengi:34, opyt:77, vezenie:45, boom:43, produkty:{780:12}}};\n\
raboty[58] = {rus_name:'Polowanie na wilki', name:'wolf', malus:208, navyki:{hide:2,pitfall:2,animal:1}, resultaty:{dengi:21, opyt:63, vezenie:15, boom:67, produkty:{763:11}}};\n\
raboty[59] = {rus_name:'Ochrona wozu osadników', name:'track', malus:213, navyki:{hide:2,leadership:2,tactic:1}, resultaty:{dengi:10, opyt:60, vezenie:30, boom:33, produkty:{778:12}}};\n\
raboty[60] = {rus_name:'Kradzież koni', name:'ox', malus:238, navyki:{reflex:1,hide:1,pitfall:2,animal:1}, resultaty:{dengi:64, opyt:34, vezenie:18, boom:43, produkty:{787:13}}};\n\
raboty[61] = {rus_name:'Strażnik więzienia', name:'guard', malus:222, navyki:{punch:1,reflex:1,shot:1,appearance:2}, resultaty:{dengi:25, opyt:35, vezenie:38, boom:4, produkty:{750:1}}};\n\
raboty[62] = {rus_name:'Misjonarze', name:'bible', malus:236, navyki:{tough:1,ride:1,trade:1,appearance:2}, resultaty:{dengi:5, opyt:61, vezenie:52, boom:77, produkty:{768:9}}};\n\
raboty[63] = {rus_name:'Pony-Express', name:'ponyexpress', malus:226, navyki:{endurance:1,ride:2,shot:1,animal:1}, resultaty:{dengi:15, opyt:45, vezenie:51, boom:44, produkty:{779:5}}};\n\
raboty[64] = {rus_name:'Sprzedaż broni Indianom', name:'weapons', malus:258, navyki:{hide:1,shot:1,repair:1,trade:2}, resultaty:{dengi:15, opyt:35, vezenie:72, boom:82, produkty:{783:4}}};\n\
raboty[65] = {rus_name:'Plądrowanie zwłok', name:'dead', malus:266, navyki:{tough:1,hide:1,finger_dexterity:2,repair:1}, resultaty:{dengi:14, opyt:14, vezenie:90, boom:34, produkty:{774:1,723:1}}};\n\
raboty[66] = {rus_name:'Polowanie na Grizzly', name:'grizzly', malus:281, navyki:{hide:1,shot:1,pitfall:2,animal:1}, resultaty:{dengi:25, opyt:78, vezenie:35, boom:71, produkty:{731:3}}};\n\
raboty[67] = {rus_name:'Wydobycie ropy', name:'oil', malus:295, navyki:{build:1,tough:1,endurance:1,leadership:1,trade:1}, resultaty:{dengi:83, opyt:25, vezenie:20, boom:7, produkty:{752:25}}};\n\
raboty[68] = {rus_name:'Poszukiwanie skarbu', name:'treasure_hunting', malus:294, navyki:{hide:2,repair:2,tactic:1}, resultaty:{dengi:20, opyt:20, vezenie:83, boom:24, produkty:{726:1}}};\n\
raboty[69] = {rus_name:'Służba w armii', name:'army', malus:299, navyki:{endurance:1,swim:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:55, opyt:76, vezenie:17, boom:35, produkty:{727:2}}};\n\
raboty[70] = {rus_name:'Okradanie ludzi', name:'steal', malus:372, navyki:{reflex:1,hide:1,shot:1,pitfall:1,finger_dexterity:1}, resultaty:{dengi:48, opyt:50, vezenie:74, boom:66, produkty:{728:4}}};\n\
raboty[71] = {rus_name:'Pracuj jako żołdak', name:'mercenary', malus:332, navyki:{tough:1,swim:1,shot:1,repair:1,appearance:1}, resultaty:{dengi:92, opyt:52, vezenie:23, boom:65, produkty:{1708:85}}};\n\
raboty[72] = {rus_name:'Ściganie bandytów', name:'bandits', malus:385, navyki:{tough:1,endurance:1,hide:1,leadership:1,tactic:1}, resultaty:{dengi:28, opyt:75, vezenie:85, boom:83, produkty:{729:5}}};\n\
raboty[73] = {rus_name:'Napad', name:'aggression', malus:422, navyki:{hide:2,pitfall:1,tactic:1,appearance:1}, resultaty:{dengi:78, opyt:27, vezenie:78, boom:86, produkty:{730:13,774:1}}};\n\
raboty[74] = {rus_name:'Napad na powóz pocztowy', name:'diligence_aggression', malus:476, navyki:{shot:1,pitfall:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:43, opyt:73, vezenie:95, boom:67, produkty:{733:15}}};\n\
raboty[75] = {rus_name:'Łowca nagród', name:'bounty', malus:426, navyki:{punch:1,endurance:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:92, opyt:32, vezenie:79, boom:72, produkty:{}}};\n\
raboty[76] = {rus_name:'Transport więźniów', name:'captured', malus:438, navyki:{endurance:1,reflex:1,hide:1,tactic:2}, resultaty:{dengi:23, opyt:69, vezenie:85, boom:44, produkty:{764:4}}};\n\
raboty[77] = {rus_name:'Napad na pociąg', name:'train', malus:506, navyki:{endurance:1,hide:1,shot:1,pitfall:1,trade:1}, resultaty:{dengi:67, opyt:87, vezenie:92, boom:96, produkty:{}}};\n\
raboty[78] = {rus_name:'Włamanie', name:'burglary', malus:518, navyki:{endurance:1,hide:2,tactic:1,trade:1}, resultaty:{dengi:80, opyt:34, vezenie:81, boom:26, produkty:{786:12}}};\n\
raboty[79] = {rus_name:'Pracuj jako konował', name:'quackery', malus:316, navyki:{hide:1,shot:1,pitfall:1,trade:1,appearance:1}, resultaty:{dengi:65, opyt:50, vezenie:52, boom:67, produkty:{794:9}}};\n\
raboty[80] = {rus_name:'Rokowania pokojowe', name:'peace', malus:367, navyki:{endurance:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:33, opyt:68, vezenie:76, boom:44, produkty:{751:8}}};\n\
raboty[82] = {rus_name:'Pilotowanie Parowców Kołowych', name:'ship', malus:348, navyki:{punch:1,swim:2,leadership:2}, resultaty:{dengi:82, opyt:35, vezenie:15, boom:14, produkty:{788:12}}};\n\
raboty[83] = {rus_name:'Przemyt', name:'smuggle', malus:411, navyki:{hide:1,swim:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:62, opyt:45, vezenie:83, boom:56, produkty:{729:22}}};\n\
raboty[84] = {rus_name:'Budowa Rancza', name:'ranch', malus:221, navyki:{build:2,endurance:1,ride:1,animal:1}, resultaty:{dengi:28, opyt:61, vezenie:17, boom:24, produkty:{784:45}}};\n\
raboty[85] = {rus_name:'Wydobycie żelaza', name:'iron', malus:177, navyki:{build:1,punch:1,reflex:1,finger_dexterity:1,repair:1}, resultaty:{dengi:52, opyt:32, vezenie:15, boom:29, produkty:{790:38, 753:2}}};\n\
raboty[86] = {rus_name:'Zbieranie Agawy', name:'agave', malus:153, navyki:{punch:1,tough:2,endurance:1,finger_dexterity:1}, resultaty:{dengi:25, opyt:42, vezenie:12, boom:27, produkty:{792:12}}};\n\
raboty[87] = {rus_name:'Zbieranie pomidorów', name:'tomato', malus:43, navyki:{ride:1,finger_dexterity:1,leadership:1,tactic:1,trade:1}, resultaty:{dengi:13, opyt:12, vezenie:7, boom:11, produkty:{793:33}}};\n\
raboty[88] = {rus_name:'Podkuwanie koni', name:'horseshoe', malus:93, navyki:{punch:1,ride:2,animal:2}, resultaty:{dengi:14, opyt:28, vezenie:9, boom:23, produkty:{754:22}}};\n\
raboty[90] = {rus_name:'Gaszenie pożaru', name:'fire', malus:229, navyki:{build:1,tough:1,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:15, opyt:41, vezenie:65, boom:45, produkty:{781:2}}};\n\
raboty[91] = {rus_name:'Zbieranie pomarańczy', name:'orange', malus:67, navyki:{endurance:1,reflex:1,pitfall:1,repair:1,tactic:1}, resultaty:{dengi:14, opyt:25, vezenie:10, boom:21, produkty:{791:25}}};\n\
raboty[92] = {rus_name:'Sprzątanie stajni', name:'muck_out', malus:8, navyki:{tough:1,ride:1,repair:1,animal:2}, resultaty:{dengi:4, opyt:5, vezenie:2, boom:6, produkty:{797:5}}};\n\
raboty[93] = {rus_name:'Czyszczenie butów', name:'shoes', malus:1, navyki:{hide:1,pitfall:1,finger_dexterity:1,trade:1,appearance:1}, resultaty:{dengi:3, opyt:2, vezenie:3, boom:2, produkty:{789:35}}};\n\
\n\
raboty[101] = {rus_name:'Rozbudowa miasta/fortu', name:'build', malus:0, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\n\
\n\
raboty[103] = {rus_name:'Atak na fort', name:'attack', malus:0, navyki:{aim:.5,dodge:.5,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[104] = {rus_name:'Atak na fort (celność)', name:'attack', malus:0, navyki:{aim:1,dodge:.001,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[105] = {rus_name:'Atak na fort (unik)', name:'attack', malus:0, navyki:{aim:.001,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[106] = {rus_name:'Obrona fortu', name:'defend', malus:0, navyki:{aim:.5,dodge:.5,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\n\
raboty[107] = {rus_name:'Obrona fortu (celność)', name:'defend', malus:0, navyki:{aim:1,dodge:.001,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\n\
raboty[108] = {rus_name:'Obrona fortu (unik)', name:'defend', malus:0, navyki:{aim:.001,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\n\
raboty[109] = {rus_name:'Atak na fort (życie)', name:'attack', malus:0, navyki:{aim:.001,dodge:.001,endurance:.001,leadership:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[110] = {rus_name:'Obrona fortu (życie)', name:'defend', malus:0, navyki:{aim:.001,dodge:.001,hide:.001,leadership:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\n\
\n\
raboty[111] = {rus_name:'Przemieszczanie się', name:'moving', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\n\
\n\
raboty[121] = {rus_name:'Strzelec vs strzelec', name:'sh_vs_sh_at', malus:0, navyki:{aim:1,shot:1,dodge:1,reflex:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[122] = {rus_name:'Siepacz vs strzelec', name:'me_vs_sh_at', malus:0, navyki:{aim:1,punch:1,dodge:1,reflex:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[123] = {rus_name:'Strzelec vs ochrona przed siepaczem', name:'sh_vs_sh_de', malus:0, navyki:{aim:1,shot:1,dodge:1,tough:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[124] = {rus_name:'Siepacz vs ochrona siepaczem', name:'me_vs_sh_de', malus:0, navyki:{aim:1,punch:1,dodge:1,tough:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[125] = {rus_name:'Strzelec vs siepacz', name:'sh_vs_me_at', malus:0, navyki:{aim:1,shot:1,dodge:1,tough:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[126] = {rus_name:'Siepacz vs siepacz', name:'me_vs_me_at', malus:0, navyki:{aim:1,punch:1,dodge:1,tough:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[127] = {rus_name:'Strzelec vs ochrona przed strzelcem', name:'sh_vs_me_de', malus:0, navyki:{aim:1,shot:1,dodge:1,reflex:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[128] = {rus_name:'Siepacz vs ochrona przed strzelcem', name:'me_vs_me_de', malus:0, navyki:{aim:1,punch:1,dodge:1,reflex:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[129] = {rus_name:'Strzelec vs cała obrona', name:'sh_vs_al_de', malus:0, navyki:{aim:1,shot:1,dodge:1,reflex:1,tough:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[130] = {rus_name:'Siepacz vs cała obrona', name:'me_vs_al_de', malus:0, navyki:{aim:1,punch:1,dodge:1,reflex:1,tough:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[131] = {rus_name:'Strzelec vs strzelec + życie', name:'sh_vs2_sh_at', malus:0, navyki:{aim:1,shot:1,dodge:1,reflex:1,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[132] = {rus_name:'Siepacz vs strzelec + życie', name:'me_vs2_sh_at', malus:0, navyki:{aim:1,punch:1,dodge:1,reflex:1,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[133] = {rus_name:'Strzelec vs ochrona przed siepaczem + życie', name:'sh_vs2_sh_de', malus:0, navyki:{aim:1,shot:1,dodge:1,tough:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[134] = {rus_name:'Siepacz vs ochrona przed siepaczem + życie', name:'me_vs2_sh_de', malus:0, navyki:{aim:1,punch:1,dodge:1,tough:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[135] = {rus_name:'Strzelec vs siepacz + życie', name:'sh_vs2_me_at', malus:0, navyki:{aim:1,shot:1,dodge:1,tough:1,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[136] = {rus_name:'Siepacz vs siepacz + życie', name:'me_vs2_me_at', malus:0, navyki:{aim:1,punch:1,dodge:1,tough:1,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[137] = {rus_name:'Strzelec vs ochrona przed strzelcem + życie', name:'sh_vs2_me_de', malus:0, navyki:{aim:1,shot:1,dodge:1,reflex:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[138] = {rus_name:'Siepacz vs ochrona przed strzelcem + życie', name:'me_vs2_me_de', malus:0, navyki:{aim:1,punch:1,dodge:1,reflex:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[139] = {rus_name:'Strzelec vs cała obrona + życie', name:'sh_vs2_al_de', malus:0, navyki:{aim:1,shot:1,dodge:1,reflex:1,tough:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[140] = {rus_name:'Siepacz vs cała obrona + życie', name:'me_vs2_al_de', malus:0, navyki:{aim:1,punch:1,dodge:1,reflex:1,tough:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
\n\
raboty[150] = {rus_name:'Życie', name:'quackery', malus:0, navyki:{health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\n\
raboty[151] = {rus_name:'Regeneracja', name:'regeneration', malus:0, navyki:{health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\n\
";



bi2_code += "\n\
komplekty={};\n\
\n\
komplekty.set_farmer=[];\n\
komplekty.set_farmer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_farmer[2] = {bonus:{attributes:{flexibility:1, strength:1}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_farmer[2].raboty[8]=10;komplekty.set_farmer[2].raboty[12]=10;komplekty.set_farmer[2].raboty[13]=10;\n\
komplekty.set_farmer[3] = {bonus:{attributes:{flexibility:1, strength:1, dexterity:1, charisma:1}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_farmer[3].raboty[8]=10;komplekty.set_farmer[3].raboty[12]=10;komplekty.set_farmer[3].raboty[13]=10;\n\
komplekty.set_farmer[3].raboty[88]=20;komplekty.set_farmer[3].raboty[30]=20;komplekty.set_farmer[3].raboty[22]=20;\n\
komplekty.set_farmer[4] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_farmer[4].raboty[8]=10;komplekty.set_farmer[4].raboty[12]=10;komplekty.set_farmer[4].raboty[13]=10;\n\
komplekty.set_farmer[4].raboty[88]=20;komplekty.set_farmer[4].raboty[30]=20;komplekty.set_farmer[4].raboty[22]=20;\n\
komplekty.set_farmer[4].raboty[48]=40;komplekty.set_farmer[4].raboty[84]=40;komplekty.set_farmer[4].raboty[44]=40;\n\
komplekty.set_farmer[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_farmer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
\n\
komplekty.set_indian=[];\n\
komplekty.set_indian[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_indian[2] = {bonus:{attributes:{flexibility:2}, skills:{hide:8}}, speed:0.8696, raboty:[]};\n\
komplekty.set_indian[2].raboty[51]=30;\n\
komplekty.set_indian[3] = {bonus:{attributes:{flexibility:5}, skills:{hide:8, swim:8}}, speed:0.7692, raboty:[]};\n\
komplekty.set_indian[3].raboty[51]=30;komplekty.set_indian[3].raboty[52]=40;\n\
komplekty.set_indian[4] = {bonus:{attributes:{flexibility:8}, skills:{hide:8, swim:8, pitfall:8}}, speed:0.6944, raboty:[]};\n\
komplekty.set_indian[4].raboty[51]=30;komplekty.set_indian[4].raboty[52]=40;komplekty.set_indian[4].raboty[58]=50;\n\
komplekty.set_indian[5] = {bonus:{attributes:{flexibility:12}, skills:{hide:8, swim:8, pitfall:8, animal:8}}, speed:0.625, raboty:[]};\n\
komplekty.set_indian[5].raboty[51]=30;komplekty.set_indian[5].raboty[52]=40;komplekty.set_indian[5].raboty[58]=50;;komplekty.set_indian[5].raboty[66]=60;\n\
komplekty.set_indian[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
\n\
komplekty.set_mexican=[];\n\
komplekty.set_mexican[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_mexican[2] = {bonus:{attributes:{strength:1}, skills:{}}, speed:0.8929, raboty:[]};\n\
komplekty.set_mexican[3] = {bonus:{attributes:{strength:2}, skills:{}}, speed:0.8065, raboty:[]};\n\
komplekty.set_mexican[3].raboty[86]=60;\n\
komplekty.set_mexican[4] = {bonus:{attributes:{strength:4}, skills:{}}, speed:0.7353, raboty:[]};\n\
komplekty.set_mexican[4].raboty[86]=60;komplekty.set_mexican[4].raboty[67]=70;\n\
komplekty.set_mexican[5] = {bonus:{attributes:{strength:6}, skills:{}}, speed:0.6757, raboty:[]};\n\
komplekty.set_mexican[5].raboty[86]=60;komplekty.set_mexican[5].raboty[67]=70;komplekty.set_mexican[5].raboty[83]=80;\n\
komplekty.set_mexican[6] = {bonus:{attributes:{strength:9}, skills:{}}, speed:0.625, raboty:[]};\n\
komplekty.set_mexican[6].raboty[86]=60;komplekty.set_mexican[6].raboty[67]=70;komplekty.set_mexican[6].raboty[83]=80;komplekty.set_mexican[6].raboty[50]=90;\n\
\n\
komplekty.set_quackery=[];\n\
komplekty.set_quackery[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_quackery[2] = {bonus:{attributes:{dexterity:1}, skills:{endurance:5, trade:5}}, speed:null, raboty:[]};\n\
komplekty.set_quackery[2].raboty[79]=30;\n\
komplekty.set_quackery[3] = {bonus:{attributes:{dexterity:2}, skills:{endurance:10, trade:10}}, speed:null, raboty:[]};\n\
komplekty.set_quackery[3].raboty[79]=60;\n\
komplekty.set_quackery[4] = {bonus:{attributes:{dexterity:4}, skills:{endurance:15, trade:15}}, speed:null, raboty:[]};\n\
komplekty.set_quackery[4].raboty[79]=90;\n\
komplekty.set_quackery[5] = {bonus:{attributes:{dexterity:6}, skills:{endurance:20, trade:20}}, speed:null, raboty:[]};\n\
komplekty.set_quackery[5].raboty[79]=120;\n\
komplekty.set_quackery[6] = {bonus:{attributes:{dexterity:9}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18}}, speed:null, raboty:[]};\n\
komplekty.set_quackery[6].raboty[79]=120;\n\
\n\
komplekty.set_pilgrim_male=[];\n\
komplekty.set_pilgrim_male[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_pilgrim_male[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_pilgrim_male[2].raboty[101]=5;\n\
komplekty.set_pilgrim_male[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_pilgrim_male[3].raboty[101]=15;\n\
komplekty.set_pilgrim_male[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_pilgrim_male[4].raboty[101]=30;\n\
komplekty.set_pilgrim_male[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_pilgrim_male[5].raboty[101]=50;komplekty.set_pilgrim_male[5].raboty[62]=150;\n\
komplekty.set_pilgrim_male[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
\n\
komplekty.set_pilgrim_female=[];\n\
komplekty.set_pilgrim_female[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_pilgrim_female[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_pilgrim_female[2].raboty[101]=5;\n\
komplekty.set_pilgrim_female[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_pilgrim_female[3].raboty[101]=15;\n\
komplekty.set_pilgrim_female[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_pilgrim_female[4].raboty[101]=30;\n\
komplekty.set_pilgrim_female[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_pilgrim_female[5].raboty[101]=50;komplekty.set_pilgrim_female[5].raboty[62]=150;\n\
komplekty.set_pilgrim_female[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
\n\
komplekty.set_gentleman=[];\n\
komplekty.set_gentleman[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_gentleman[2] = {bonus:{attributes:{charisma:1}, skills:{appearance:8}}, speed:null, raboty:[]};\n\
for (i=1;i<94;++i) {komplekty.set_gentleman[2].raboty[i]=5};komplekty.set_gentleman[2].raboty[101]=5;\n\
komplekty.set_gentleman[3] = {bonus:{attributes:{charisma:3}, skills:{appearance:8, leadership:8}}, speed:null, raboty:[]};\n\
for (i=1;i<94;++i) {komplekty.set_gentleman[3].raboty[i]=15};komplekty.set_gentleman[3].raboty[101]=15;\n\
komplekty.set_gentleman[4] = {bonus:{attributes:{charisma:6}, skills:{appearance:8, leadership:8, trade:8}}, speed:null, raboty:[]};\n\
for (i=1;i<94;++i) {komplekty.set_gentleman[4].raboty[i]=30};komplekty.set_gentleman[4].raboty[101]=30;\n\
komplekty.set_gentleman[5] = {bonus:{attributes:{charisma:10}, skills:{appearance:16, leadership:8, trade:8}}, speed:null, raboty:[]};\n\
for (i=1;i<94;++i) {komplekty.set_gentleman[5].raboty[i]=50};komplekty.set_gentleman[5].raboty[101]=50;\n\
komplekty.set_gentleman[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
\n\
komplekty.set_dancer=[];\n\
komplekty.set_dancer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.set_dancer[2] = {bonus:{attributes:{charisma:2}, skills:{appearance:10}}, speed:null, raboty:[]};\n\
for (i=1;i<94;++i) {komplekty.set_dancer[2].raboty[i]=5};komplekty.set_dancer[2].raboty[101]=5;\n\
komplekty.set_dancer[3] = {bonus:{attributes:{charisma:5}, skills:{appearance:10, animal:10}}, speed:null, raboty:[]};\n\
for (i=1;i<94;++i) {komplekty.set_dancer[3].raboty[i]=15};komplekty.set_dancer[3].raboty[101]=15;\n\
komplekty.set_dancer[4] = {bonus:{attributes:{charisma:9}, skills:{appearance:10, animal:10, finger_dexterity:12}}, speed:null, raboty:[]};\n\
for (i=1;i<94;++i) {komplekty.set_dancer[4].raboty[i]=30};komplekty.set_dancer[4].raboty[101]=30;\n\
komplekty.set_dancer[5] = {bonus:{attributes:{charisma:11}, skills:{appearance:16, animal:10, finger_dexterity:12, endurance:6}}, speed:null, raboty:[]};\n\
for (i=1;i<94;++i) {komplekty.set_dancer[5].raboty[i]=50};komplekty.set_dancer[5].raboty[101]=50;\n\
komplekty.set_dancer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
\n\
komplekty.fireworker_set=[];\n\
komplekty.fireworker_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.fireworker_set[1].raboty[90]=15;\n\
komplekty.fireworker_set[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.fireworker_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.fireworker_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.fireworker_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.fireworker_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
\n\
komplekty.gold_set=[];\n\
komplekty.gold_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.gold_set[2] = {bonus:{attributes:{}, skills:{health:10}}, speed:0.8333, raboty:[]};\n\
for (i=1;i<94;++i) {komplekty.gold_set[2].raboty[i]=25};komplekty.gold_set[2].raboty[101]=25;\n\
komplekty.gold_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.gold_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.gold_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
komplekty.gold_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\n\
\n\
";



bi2_code += "\n\
bi2_vse_navyki=['build' ,'punch' ,'tough' ,'endurance' ,'health' ,'ride' ,'reflex' ,'dodge' ,'hide' ,'swim' ,'aim' ,'shot' ,'pitfall' ,'finger_dexterity' ,'repair' ,'leadership' ,'tactic' ,'trade' ,'animal' ,'appearance'];\n\
bi2_vse_kharakteristiki=['strength', 'flexibility', 'dexterity', 'charisma'];\n\
";
aWindow.assign_citem = function (tid, obj){
	aWindow.items[tid] = {item_id:tid, nshort:obj.short, name:obj.name, type:obj.type, level:obj.level, price:obj.price, image:obj.image, image_mini:obj.image_mini, characterClass:obj.characterClass, characterSex:obj.characterSex, speed:obj.speed, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};
    for (zz = aWindow.bi2_vse_navyki.length-1;zz >=0;--zz){
        ss = aWindow.bi2_vse_navyki[zz];
	    if (obj.bonus.skills[ss])
	        aWindow.items[tid].bonus.skills[ss]=obj.bonus.skills[ss];
	}
    for (zz = aWindow.bi2_vse_kharakteristiki.length-1;zz >=0;--zz){
        aa = aWindow.bi2_vse_kharakteristiki[zz];
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
    
    for (zz = aWindow.bi2_vse_navyki.length-1;zz >=0;--zz){
        num_index = aWindow.bi2_vse_navyki[zz];
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
    for (zz = aWindow.bi2_vse_kharakteristiki.length-1;zz >=0;--zz){
        num_index = aWindow.bi2_vse_kharakteristiki[zz];
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
	if (aWindow.bi2_loc!='ru') soft=true;
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
		for (zz = aWindow.bi2_vse_navyki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.skills[aWindow.bi2_vse_navyki[zz]]) {
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.bi2_vse_navyki[zz] + ':' + aWindow.items[tid].bonus.skills[aWindow.bi2_vse_navyki[zz]];
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
		for (zz = aWindow.bi2_vse_kharakteristiki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.attributes[aWindow.bi2_vse_kharakteristiki[zz]]){
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.bi2_vse_kharakteristiki[zz] + ':' + aWindow.items[tid].bonus.attributes[aWindow.bi2_vse_kharakteristiki[zz]];
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

bi2_code += "\n\
komp_rab = {};\n\
komp_zas = {};\n\
komp_skor = {};\n\
komp_fort = {};\n\
for (i=0;i < nabory.length;++i){\n\
	komp_rab[nabory[i]] = [];\n\
	komp_zas[nabory[i]] = [];\n\
	komp_skor[nabory[i]]= [];\n\
	komp_fort[nabory[i]]= [];\n\
};\n\
\n\
vyborka={};\n\
vyborka_z={};\n\
vyborka_r={};\n\
prosto_veschi=[];\n\
prosto_veschi_max=7;\n\
for (ii = bi2_types.length; ii >= 0; --ii) {\n\
	vyborka[bi2_types[ii]] = {};\n\
	vyborka[bi2_types[ii]].simple = {};\n\
	vyborka[bi2_types[ii]].simple.spisok = [];\n\
	vyborka_z[bi2_types[ii]] = {};\n\
	vyborka_z[bi2_types[ii]].simple = {};\n\
	vyborka_z[bi2_types[ii]].simple.spisok = [];\n\
	vyborka_r[bi2_types[ii]] = {};\n\
	vyborka_r[bi2_types[ii]].simple = {};\n\
	vyborka_r[bi2_types[ii]].simple.spisok = [];\n\
	prosto_veschi[bi2_types[ii]]={};\n\
};\n\
\n\
resultaty=[];\n\
resultaty_z=[];\n\
resultaty_r=[];\n\
zaschita=null;\n\
ezda = false;\n\
rabnavyki=[];\n\
rabnavyki_z=[];\n\
rabnavyki_r=[];\n\
\n\
bi2_htmlrab=[];\n\
bi2_sortrab=[];\n\
bi2_hiderab=[];\n\
bi2_bezto=0;\n\
\n\
bi2_predmetov = {};\n\
bi2_khochuka = [];\n\
bi2_uchet=[];\n\
bi2_aktiv=[];\n\
porabotaj=[];\n\
bi2_slots={};\n\
for (i=0;i<bi2_types.length;++i){\n\
	bi2_slots[bi2_types[i]]=true;\n\
};\n\
irabota=0;\n\
samoe_ono={};\n\
deneg_ushlo = 0;\n\
bablo = 0;\n\
\n\
i_slot_max=[];\n\
i_slot=[];\n\
\n\
ic_obj = [];\n\
ic_objr = [];\n\
ic_objr = [];\n\
ii_rekur=0;\n\
rekurs_delay = 100;\n\
rekurs_step = 0;\n\
rekurs_time = 25000;\n\
rekurs_up = true;\n\
bi2_to=0;\n\
bi2_zas=0;\n\
bi2_ride=0; \n\
pers={};\n\
bi2_speed=1.0;\n\
ezda=false;\n\
bi2_onesk_rabot = false;\n\
chislo_rabot = 0;\n\
chislo_rabot_to = 0;\n\
khoroshi = [];\n\
khoroshi_to = [];\n\
";



aWindow.bi2_iimport = function(){
	bagazh=aWindow.Bag.getInstance();
	odezhda=aWindow.Wear.wear;
	for(vv in bagazh.items){
	aWindow.bi2_inv_imported=true;
		cobj = bagazh.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.bi2_uchet[tid]){
			aWindow.bi2_uchet[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Niektóre dane nt przedmiotu mogą być nieprawdziwe:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Brak tłumaczenia:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Заглушка', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Brak opisu przedmiotu:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
	}
	for(vv in aWindow.Wear.wear){
		if (!aWindow.Wear.wear[vv])
			continue;
		cobj = aWindow.Wear.wear[vv].obj;
		tid = cobj.item_id;
		aWindow.bi2_equipment[vv]=tid;
		if (!aWindow.bi2_uchet[tid]){
			aWindow.bi2_uchet[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Błędne dane o przedmiocie:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Brak tłumaczenia:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Nakrycie głowy', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Brak opisu przedmiotu:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
	}
}

aWindow.bi2_mimport = function(){
	magaz=aWindow.TraderInventory.getInstance('bi2',0);
	if (!magaz) return;
	for(vv in magaz.items){
		cobj = magaz.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.bi2_uchet_shop[tid]){
			aWindow.bi2_uchet_shop[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				/*
				if (!cres.h)	{
					aWindow.einfo+='Niektóre dane nt przedmiotu mogą być nieprawdziwe:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				
				else*/ if(!cres.s){
					aWindow.winfo+='Brak tłumaczenia:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Nakrycie głowy', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Brak opisu przedmiotu:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
	}
}


aWindow.bi2_podschet = function  (vse_veschi, iz_magazinov, otkrytye_magaziny, plus_level, pers){
	aWindow.bi2_aktiv=null;
	aWindow.bi2_aktiv=[];
	for (vv in aWindow.items){
		if (isNaN(vv)) continue;
		vesch=aWindow.items[vv];
		check=true;
		if (vesch.characterSex&&(vesch.characterSex!=pers.characterSex)) check=false;
		if (vesch.characterClass&&(vesch.characterClass!=pers.characterClass)) check=false;
		if (!aWindow.bi2_uchet[vesch.item_id]&&!aWindow.bi2_khochuka[vesch.item_id])
		{
			if (!vse_veschi){
				if (!iz_magazinov)
					check=false;
				else{
					if(vesch.shop!='shop'){
						check=false;
					}
					if (otkrytye_magaziny&&!aWindow.bi2_uchet_shop[vesch.item_id])
						check=false;
				}
			}
			if ((vesch.shop=='shop')&&(vesch.price > aWindow.bablo)) check=false;
		}
		lit = pers.level+ plus_level+parseInt(pers.itemLevelRequirementDecrease[vesch.type],10)+pers.itemLevelRequirementDecrease.all;
		if (vesch.level > lit) check=false;
		if (aWindow.bi2_slots && aWindow.bi2_slots[vesch.type]&&!(aWindow.bi2_equipment[vesch.type]==vv)) check=false;
		if (check) aWindow.bi2_aktiv.push(vesch.item_id);
	}
}

aWindow.bi2_ocenka_khlama = function(){
    aWindow.bi2_nenuzhnoe=[];
    if (!aWindow.bi2_khlam)
        return;
    ispolz=[];
    for (irab=200; irab>0;irab--){
        if (aWindow.raboty[irab]){
            if (aWindow.resultaty[irab]){
                for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
                    sid = aWindow.resultaty[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_z[irab]){
                for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
                    sid = aWindow.resultaty_z[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_r[irab]){
                for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
                    sid = aWindow.resultaty_r[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
        }
    }
    
    for (tid in aWindow.bi2_uchet){
        if ((tid < 600)&&(tid >=200)&&(!ispolz[tid])){
            aWindow.bi2_nenuzhnoe[tid]=true;
        }
    }
}

aWindow.bi2_res2html = function (){
    count_rab=0;
    aWindow.bi2_htmlrab=[];
    while (count_rab < 255){
        if (!(aWindow.porabotaj[count_rab]&&aWindow.resultaty[count_rab])){
            ++count_rab;
            continue;
        }
        ihtm = '';
        ihtm += '<tr>';
        rabota = aWindow.raboty[count_rab];
        ihtm += '<td rowspan=\"6\">';
        ihtm += '<table><tbody><tr><th>'+rabota.rus_name+'</th></tr>';
        if ((count_rab > 120)&&(count_rab <= 140)){
            ihtm += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            ihtm += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
        }
        else if (count_rab == 111){
            ihtm += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            ihtm += '<img style=\"float:left; width:63px; height:63px;\" src=\"images/fingerboard/fingerboard.png\"';
            ihtm += ' alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        }
        else{
            ihtm += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            ihtm += '<img style=\"float:left;\" src=\"';
            if (count_rab<=101){
                ihtm += 'images/jobs/';
            }
            else if (count_rab<111){
                ihtm += 'images/fort/battle/button_';
            }
            else if (count_rab==150){
                ihtm += 'images/jobs/';
            }
            ihtm +=rabota.name+'.png\" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        };
        rres = rabota.resultaty;
        for (ri in rres.produkty){
            ihtm+='<div style=\"display:inline; float:left; margin: 8px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
            ihtm+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
            ihtm+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_bi2\">'+rres.produkty[ri]+'%</div>';
            ihtm+='</div>';
        }
        ihtm += '</td></tr>';
        ihtm += '<tr><td>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/dollar.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.dengi*3/2)+'px;"></div><div class="bar_perc">'+rres.dengi+'%</div></div>';
        ihtm += '<span>Zarobek:'+rres.dengi+'</span></td></tr></table></a>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/experience.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.opyt*3/2)+'px;"></div><div class="bar_perc">'+rres.opyt+'%</div></div>';
        ihtm += '<span>Doświadczenie:'+rres.opyt+'</span></td></tr></table></a>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/luck.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*3/2)+'px;"></div><div class="bar_perc">'+rres.vezenie+'%</div></div>';
        ihtm += '<span>Szczęście:'+rres.vezenie+'</span></td></tr></table></a>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/danger.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_brown" style="width: '+Math.round(rres.boom*3/2)+'px;"></div><div class="bar_perc">'+rres.boom+'%</div></div>';
        ihtm += '<span>Niebezpieczeństwo:'+rres.boom+'</span></td></tr></table></a>';
        ihtm += '</td></tr></tbody></table>';

        ihtm += '</td><td>';

        if ((count_rab<=101)||(count_rab>111)){
            ihtm += '<span title=\"Punkty umiejętności\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
            ihtm += '<span title=\"Punkty z zestawów\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
		    ihtm += '<span title=\"Trudność\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
    		ihtm += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
	    	ihtm += '<span title=\"Punkty pracy\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    ihtm += '<span class="skill_box_value" style="text-align:center; color:';
    		ihtm += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
	    	ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
	    }
        else if (count_rab!=111){
            ihtm += '<span title=\"Bonus skuteczności\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value red_text" style="text-align:center;">';
			var vvv = aWindow.resultaty[count_rab].to-aWindow.resultaty[count_rab].ton;
			vvv = Math.round(vvv*10)/10;
		    ihtm += vvv+'</span></span>';
            ihtm += '<span title=\"Bonus uniku\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
	    	ihtm += '<span title=\"Średni bonus\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    ihtm += '<span class="skill_box_value" style="text-align:center; color:rgb(255,255,255)';
	    	ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
	    }
	    else{
		//ihtm += '<span title=\"Скорость от комплектов\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	//ihtm += '<span class="skill_box_value green_text" style="text-align:center;">х'+aWindow.resultaty[count_rab].ton+'</span></span>';
	    	ihtm += '<span title=\"Szybkość\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		ihtm += '<span class="skill_box_value" style="text-align:center; ">'+Math.round(aWindow.resultaty[count_rab].to)+'%</span></span>';
	    }
        ihtm += '</td><td>';
            

        brbr = 0;
        ihtm += '<table><tbody><tr>';
        for (jj in aWindow.rabnavyki[count_rab]){
            for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                ihtm += '<td><a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+aWindow.bi2_s2a[jj];
                ihtm += '.png) repeat scroll '+aWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                ihtm += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                ihtm += '</a></td>';
            }
        }
        ihtm += '</tr></tbody></table>';
        ihtm += '</td></tr><tr><td colspan=\"2\">';
        
        ihtm += '<div style=\"display:inline; float:left;\"><table>';
	ihtm += '<tr><td><a href="javascript:bi2_auto_odev(\'n\','+count_rab+');void(0);" title="Ubierz się" >';
	ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -51px" >';
	ihtm += '</a></td></tr>';
	ihtm += '<tr><td><a href="javascript:bi2_odev_add(\'n\','+count_rab+');void(0);" title="Adicionar à lista" >';
	ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -126px" >';
	ihtm += '</a></td></tr>';
	ihtm += '<tr><td><a href="javascript:bi2_odev_remove(\'n\','+count_rab+');void(0);" title="Usuń z listy" >';
	ihtm += '<img src="images/transparent.png" style="width :24px; height : 24px; background:url(../img.php?type=menu&dummy) -129px -101px" >';
	ihtm += '</a></td></tr>';
	ihtm += '</table></div>';

	for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
            sid = aWindow.resultaty[count_rab].items[ee].tid;
            if (sid){
                ihtm+='<div style=\"display:inline; float:left;\">';
                vesch = aWindow.items[sid];
                ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty[count_rab].items[ee].bon;
                if (vesch.set.key){
                    ihtm += '<br /><em>'+vesch.set.name+'</em>';
                }
                for (ind in vesch.bonus.attributes){
                    ihtm += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                }
                for (ind in vesch.bonus.skills){
                    ihtm += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
                }
				if (aWindow.resultaty[count_rab].items[ee].price > 0){
                    ihtm += '<strong style="font-size:1.1em">cena: '+aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$</strong>';
                }
                ihtm += '</span>'
                ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty[count_rab].items[ee].bon+'</p></div></div>'
                ihtm+='</a>'
                if (aWindow.resultaty[count_rab].items[ee].price > 0){
                    ihtm+='<br />';
                    ihtm +='<span style=\"text-align:center;font-size:1.1em\">'+aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$</span>';
                }
                ihtm +='</div>';
            }
        }
        ihtm += '</td></tr>';
        
        if (aWindow.resultaty_z[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+навыки\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_z[count_rab].zas+'</span></span>';
    		ihtm += '<span title=\"Punkty pracy\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
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
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+aWindow.bi2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_z[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr><tr><td colspan=\"2\">';

		ihtm += '<div style=\"display:inline; float:left;\"><table>';
		ihtm += '<tr><td><a href="javascript:bi2_auto_odev(\'z\','+count_rab+');void(0);" title="Ubierz się" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -51px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:bi2_odev_add(\'z\','+count_rab+');void(0);" title="Adicionar à lista" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -126px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:bi2_odev_remove(\'z\','+count_rab+');void(0);" title="Usuń z listy" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 24px; background:url(../img.php?type=menu&dummy) -129px -101px" >';
		ihtm += '</a></td></tr>';
		ihtm += '</table></div>';

            for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
                sid = aWindow.resultaty_z[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_z[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
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
    		ihtm += '<span title=\"PP\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
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
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+aWindow.bi2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_r[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr><tr><td colspan=\"2\">';

		ihtm += '<div style=\"display:inline; float:left;\"><table>';
		ihtm += '<tr><td><a href="javascript:bi2_auto_odev(\'r\','+count_rab+');void(0);" title="Ubierz się" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -51px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:bi2_odev_add(\'r\','+count_rab+');void(0);" title="Adicionar à lista" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 25px; background:url(../img.php?type=menu&dummy) -104px -126px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:bi2_odev_remove(\'r\','+count_rab+');void(0);" title="Удалить" >';
		ihtm += '<img src="images/transparent.png" style="width :24px; height : 24px; background:url(../img.php?type=menu&dummy) -129px -101px" >';
		ihtm += '</a></td></tr>';
		ihtm += '</table></div>';

            for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
                sid = aWindow.resultaty_r[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_r[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
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

        
        aWindow.bi2_htmlrab[count_rab]=ihtm;
        ++count_rab;
    }
}

aWindow.bi2_sortir = function (tip, minto){
    ind_arr = 0;
    aWindow.bi2_sortrab = [];
    for (irab in aWindow.bi2_htmlrab){
        if (aWindow.bi2_vse_raboty&&(aWindow.resultaty[irab].to <= -minto))
            continue;
        aWindow.bi2_sortrab[ind_arr] = {};
        aWindow.bi2_sortrab[ind_arr].index = irab;
        switch (tip){
        case 'd0':
            aWindow.bi2_sortrab[ind_arr].ves = -aWindow.raboty[irab].resultaty.dengi;
            break;
        case 'o0':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'v0':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'boom':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.boom;
            break;
        case 'name':
            aWindow.bi2_sortrab[ind_arr].ves= (irab > 100) ? 'я ' : '';
            aWindow.bi2_sortrab[ind_arr].ves += aWindow.raboty[irab].rus_name;
            break;
        case 'malus':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].malus;
            break;
        case 'to':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.resultaty[irab].to;
            break;
        case 'dt':
		dt = aWindow.resultaty[irab].to;
		if (dt){
			tmp = (1-.5/dt) * (1+dt/256);
			aWindow.bi2_sortrab[ind_arr].ves = 0 - aWindow.raboty[irab].resultaty.dengi*tmp;
		}
		else
			aWindow.bi2_sortrab[ind_arr].ves = 0;
		for (cid in aWindow.raboty[irab].resultaty.produkty){
			pr = aWindow.raboty[irab].resultaty.produkty[cid];
			aWindow.bi2_sortrab[ind_arr].ves -= aWindow.items[cid].price * pr * 0.005;
		}
            break;
        case 'do':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dv':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'ov':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dov':
            aWindow.bi2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt - aWindow.raboty[irab].resultaty.vezenie;
            break;
        default:
            aWindow.bi2_sortrab[ind_arr].ves = irab;
        }
        ++ind_arr;
    }
    aWindow.qsort(aWindow.bi2_sortrab,0,ind_arr);
    aWindow.bi2_reporter2();
}

//aWindow.bi2_setbezto = function(checked){
    //aWindow.bi2_bezto = !checked;
//}

aWindow.bi2_vesch_polezna = function(value){
    for (kh in aWindow.bi2_khochuka)
        aWindow.bi2_khochuka[kh] = false;
    if (value > 0)
        aWindow.bi2_khochuka[value] = true;
    aWindow.bi2_hideraboty(value);
}

aWindow.bi2_reporter2 = function(){
    grgr = '';
    aWindow.bi2_process=false;
    //new aWindow.HumanMessage('Начинаем вывод данных', {type: 'success'});



    grsort = '<table style="position:absolute; top:26px; z-index:10; background-color:#D3C5AD; width:' + (aWindow.bi2_w1 - 12) + 'px; border-bottom:2px solid" cellpadding="0" cellspacing="0"><tbody><tr>';
    grsort += '<td style=\"vertical-align:middle; padding:5px; text-align:center; \"><strong>Sortowanie: </strong></td>';
//    grsort += '<td style=\"width:10px; vertical-align:middle; padding:5px; \" />';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:5px; text-align:center; \"><a href=\"javascript:bi2_sortir(\'name\', bi2_bezto);\" title=\"po nazwie\">Nazwa</a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding2; text-align:center; \"><a href=\"javascript:bi2_sortir(\'malus\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/task_points/minus.png\" title=\"wg trudności\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center; \"><a href=\"javascript:bi2_sortir(\'to\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/task_points/equal.png\" title=\"wg PP, Punktów pracy\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center; \"><a href=\"javascript:bi2_sortir(\'d0\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" title=\"wg zarobku\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center; \"><a href=\"javascript:bi2_sortir(\'o0\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/experience.png\" title=\"wg doświadczenia\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center; \"><a href=\"javascript:bi2_sortir(\'v0\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/luck.png\" title=\"wg szczęścia\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center; \"><a href=\"javascript:bi2_sortir(\'boom\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/danger.png\" title=\"wg niebezpieczeństwa\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center; \"><a title=\"wg zarobku z PP\" href=\"javascript:bi2_sortir(\'dt\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar_bonus.png\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center; \"><a title=\"wg sumy zarobku i doświadczenia\" href=\"javascript:bi2_sortir(\'do\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" /><img style=\"width:23px; height:23px; margin-left:-5px;\" src=\"images/job/experience.png\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center; \"><a title=\"wg zarobeku i szczęścia\" href=\"javascript:bi2_sortir(\'dv\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" /><img style=\"width:23px; height:23px; margin-left:-5px;\" src=\"images/job/luck.png\"" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center; \"><a title=\"wg doświadczenia i szczęścia\" href=\"javascript:bi2_sortir(\'ov\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/experience.png\" /><img style=\"width:23px; height:23px;\" src=\"images/job/luck.png\"" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center; \"><a title=\"wg zarobku, doświadczenia i szczęścia\" href=\"javascript:bi2_sortir(\'dov\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" /><img style=\"width:23px; height:23px; margin-left:-5px;\" src=\"images/job/experience.png\" /><img style=\"width:23px; height:23px;\" src=\"images/job/luck.png\"" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td style=\"vertical-align:middle; padding:0px; text-align:center; \"><span title=\"Filtr. Po wpisaniu liczby, a następnie kliknięciu któregoś z sortowania zostaną dodane(usunięte prace) o daną liczbę PP. Oznacza to, że jeżeli wpiszemy liczbę dodatnia. Zostaną dopisane prace, które możemy wykonać jeżeli dołożymy punkty pracy. Analogicznie jeżeli wpiszemy liczbę ujemną, zostaną usunięte prace, które mają mniej PP niż wpisana liczba ujemna)\"><input type=\"text\" size=\"4\" value=\"'+aWindow.bi2_bezto+'\" ';
    grsort += 'onchange=\"javascript:bi2_bezto=parseInt(value, 10);\"> &laquo;PP&raquo;</span></td>';

    grsort += '</tr></tbody></table>';
    grgr += grsort;

 
    grgr +='<table style="margin-top:35px">';

    if (aWindow.bi2_khochuka.length > 0){
        grgr += '<tr><td colspan=\"3\">';
        grgr += '<a href=\"javascript:bi2_hideraboty(0);\">Pokaż prace</a><br />';
        if (aWindow.bi2_khochuka.length > 1){
            grgr += '<select title=\"Wybierz coś, aby zobaczyć w ilu (i które) pracach, jest używany\" class=\"bi2_sel" onchange=\"javascript:bi2_vesch_polezna(value);\">';
            grgr += '<option value=\"0\">Wybierz niezbędne rzeczy</option>'
            for (kh in aWindow.bi2_khochuka){
                grgr += '<option value=\"'+kh+'\">'+aWindow.items[kh].name+'</option>';
            }
            grgr += '</select>';
        }
        for (kh in aWindow.bi2_khochuka){
        if (aWindow.bi2_khochuka[kh]){
            grgr += '<table><tr><td>';
            grgr+='<div style=\"display:inline; float:left;\">';
            vesch = aWindow.items[kh];
            grgr+='<a class=\"tt2\" href=\"javascript:bi2_hideraboty('+kh+');\" ><span><b>'+vesch.name+':</b>';
            if (vesch.set.key){
                grgr += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a>'
            grgr +='</div>';
            rere = ((kh < 400) || (kh >= 500)) ? '&raquo; użyto ' : '&raquo; wybrano ';
            grgr +='Wszystkie dostępne prace:' + aWindow.chislo_rabot_to + '; &laquo;'+vesch.name+rere+ aWindow.khoroshi_to[kh] +' razy.<br />';
            grgr +='Wszystkie prace:' + aWindow.chislo_rabot + '; &laquo;'+vesch.name+rere+ aWindow.khoroshi[kh] +' razy.';
            grgr += '</td></tr></table>';
        }}
        grgr += '<hr>';
        grgr += '</td></tr>';
    }

    for (ii = 0; ii < aWindow.bi2_sortrab.length; ++ii){
        if (!aWindow.bi2_hiderab[aWindow.bi2_sortrab[ii].index]){
            if (ii>0) grgr+='<tr><td colspan=\"3\"><hr></td></tr>';
            grgr += aWindow.bi2_htmlrab[aWindow.bi2_sortrab[ii].index];
        }
    }
    grgr += '</table>';

    if (aWindow.bi2_khlam){
        grgr+='<hr><table><tbody><tr><th colspan=\"8\" style=\"text-align:center;\">Itens que podem ser vendidos. Esses itens não são usados ou outros itens adequados para o trabalho siębardziej Przedmioty, które można sprzedać. Te przedmioty nie są wykorzystane lub inne przedmioty nadają siębardziej do prac</th></tr><tr>';
        babosy=0;
        tdcount=0;
        for (tid in aWindow.bi2_nenuzhnoe){
            grgr+='<td>';
            vesch = aWindow.items[tid];
            grgr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+'</b>';
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" style="margin-right:30px;"><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a></td>';
            if (++tdcount==8){
                grgr+='</tr><tr>';
                tdcount=0;
            }
            babosy += vesch.price;
        }
        grgr+='</tr><tr><th colspan=\"8\" style=\"text-align:center;\">';
        grgr +='Wartośc przedmiotów: '+babosy / 2+'$';
        grgr+='</th></tr></tbody></table>';
    }
    document.getElementById('bi2_window_content').innerHTML=grgr;
    aWindow.bi2_process=false;
}

aWindow.bi2_vreporter = function () {
    aWindow.bi2_show_window();
    vrvr = '<table>';
    for (count_rab in aWindow.porabotaj){
        if (!aWindow.prosto_veschi[count_rab])
            continue;
        vrvr += '<tr>';
        rabota = aWindow.raboty[count_rab];
        vrvr += '<td rowspan=\"2\">';
        vrvr += '<table><tbody><tr><th>'+rabota.rus_name+'</th></tr>';
        if ((count_rab > 120)&&(count_rab <= 140)){
            vrvr += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            vrvr += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
        }
        else if ((count_rab > 102)&&(count_rab <= 120)){
            
        }
        else{
            vrvr += '<tr><td><a href=\"javascript:bi2_show_shmot2('+ count_rab +');\" >';
            vrvr += '<img style=\"float:left;\" src=\"';
            if (count_rab<=101){
                vrvr += 'images/jobs/';
            }
            vrvr +=rabota.name+'.png\" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        };

        rres = rabota.resultaty;
        for (ri in rres.produkty){
            vrvr+='<div style=\"display:inline; float:left; margin: 8px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
            vrvr+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
            vrvr+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_bi2\">'+rres.produkty[ri]+'%</div>';
            vrvr+='</div>';
        }
        vrvr += '</td></tr>';
        vrvr += '<tr><td>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/dollar.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.dengi*3/2)+'px;"></div><div class="bar_perc">'+rres.dengi+'%</div></div>';
        vrvr += '<span>Zarobek:'+rres.dengi+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/experience.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.opyt*3/2)+'px;"></div><div class="bar_perc">'+rres.opyt+'%</div></div>';
        vrvr += '<span>Doświadczenie:'+rres.opyt+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/luck.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*3/2)+'px;"></div><div class="bar_perc">'+rres.vezenie+'%</div></div>';
        vrvr += '<span>Szczęście:'+rres.vezenie+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/danger.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_brown" style="width: '+Math.round(rres.boom*3/2)+'px;"></div><div class="bar_perc">'+rres.boom+'%</div></div>';
        vrvr += '<span>Опасность:'+rres.boom+'</span></td></tr></table></a>';
        vrvr += '</td></tr></tbody></table>';

        vrvr += '</td><td>';

        if (count_rab!=111){
            vrvr += '<span title=\"Очки от навыков\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value" style="text-align:center;">';
		    vrvr += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
            vrvr += '<span title=\"Очки от комплектов\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
		    vrvr += '<span title=\"Сложность работы\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
    		vrvr += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
	    	vrvr += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
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
                vrvr += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+aWindow.bi2_s2a[jj];
                vrvr += '.png) repeat scroll '+aWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                vrvr += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                vrvr += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                vrvr += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                vrvr += '</a></td>';
            }
        }
        vrvr += '</tr></tbody></table>';
        vrvr += '</td></tr><tr><td colspan=\"2\"><table>';
        
        for (ee = 0; ee < aWindow.bi2_types.length; ++ee){
            ctype = aWindow.bi2_types[ee];
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
                    vrvr += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                }
                for (ind in vesch.bonus.skills){
                    vrvr += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
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
    document.getElementById('bi2_window_content').innerHTML=vrvr;
}

aWindow.bi2_reporter = function () {
//    new aWindow.HumanMessage('Начинаем вывод полученных данных', {type: 'success'});
    grgr='';
    aWindow.bi2_ocenka_khlama();
    count_rab=0;
    aWindow.bi2_show_window();
    aWindow.bi2_res2html();
    
    if (aWindow.bi2_khochuka.length > 0){
        aWindow.chislo_rabot = 0;
        aWindow.chislo_rabot_to = 0;
        aWindow.khoroshi = [];
        aWindow.khoroshi_to = [];
        for (kh in aWindow.bi2_khochuka){
            aWindow.khoroshi[kh] = 0;
            aWindow.khoroshi_to[kh] = 0;
            aWindow.bi2_khochuka[kh]=false;
        }
        aWindow.bi2_khochuka[kh]=true; // last item;
        for (rr in aWindow.porabotaj){
            if(aWindow.resultaty[rr]){
                ++aWindow.chislo_rabot;
                if (aWindow.resultaty[rr].to > 0) ++aWindow.chislo_rabot_to;
                for (ii = aWindow.bi2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.bi2_khochuka){
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
                for (ii = aWindow.bi2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.bi2_khochuka){
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
                for (ii = aWindow.bi2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.bi2_khochuka){
                        if (aWindow.resultaty_r[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
        }
    }
    aWindow.bi2_process=false;
    aWindow.bi2_sortir('name', aWindow.bi2_bezto);
}


bi2_code += "\n\
bi2_s2a =\n\
{build:'strength', punch:'strength', tough:'strength', endurance:'strength', health:'strength',\n\
ride:'flexibility', reflex:'flexibility', dodge:'flexibility', hide:'flexibility', swim:'flexibility',\n\
aim:'dexterity', shot:'dexterity', pitfall:'dexterity', finger_dexterity:'dexterity', repair:'dexterity',\n\
leadership:'charisma', tactic:'charisma', trade:'charisma', animal:'charisma', appearance:'charisma'};\n\
";

bi2_code += "\n\
bi2_s2px =\n\
{build:0, punch:220, tough:165, endurance:110, health:55,\n\
ride:0, reflex:220, dodge:165, hide:110, swim:55,\n\
aim:0, shot:220, pitfall:165, finger_dexterity:110, repair:55,\n\
leadership:0, tactic:220, trade:165, animal:110, appearance:55};\n\
";

bi2_code += "\n\
bi2_s2f_bonus2 = function (value){\n\
    if (isNaN(value)) return 0;\n\
    if (value < 1) return 0;\n\
    if (value < 3) return 1;\n\
    if (value < 10) return 2;\n\
    if (value < 23) return 3;\n\
    if (value < 43) return 4;\n\
    if (value < 71) return 5;\n\
    if (value < 108) return 6;\n\
    if (value < 155) return 7;\n\
    if (value < 211) return 8;\n\
    return 9;\n\
};\n\
";

bi2_code += "\n\
bi2_s2f_bonus = function (value){\n\
    if (isNaN(value)) return 0;\n\
    if (value < 1) return 0;\n\
    if (value < 3) return 1+(value-1)/2;\n\
    if (value < 10) return 2+(value-3)/7;\n\
    if (value < 23) return 3+(value-10)/13;\n\
    if (value < 43) return 4+(value-23)/20;\n\
    if (value < 71) return 5+(value-43)/28;\n\
    if (value < 108) return 6+(value-71)/37;\n\
    if (value < 155) return 7+(value-108)/47;\n\
    if (value < 211) return 8+(value-155)/56;\n\
    return 9;\n\
};\n\
";


aWindow.bi2_hideraboty = function(tid){
    aWindow.bi2_hiderab=[];
    vtype = aWindow.items[tid].type;
    kk = 0;
    for (; vtype != aWindow.bi2_types[kk]; ++kk) {};
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
            aWindow.bi2_hiderab[irab]=true;
        }
    }
    aWindow.bi2_reporter2();
}


aWindow.bi2_s_print = function(nav, val){
    /*
    kha = aWindow.bi2_s2a[nav];
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
aWindow.bi2_a_print = function(kha, val){
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

bi2_code += "\n\
qsort = function (ar, li, ri){\n\
	if ((li+1)>=ri) return;\n\
	var tmp;\n\
	if (ri-li<10){\n\
		for (ii=li;ii<ri-1;++ii)\n\
			for (jj=ii+1;jj<ri;++jj)\n\
				if(ar[ii].ves>ar[jj].ves){\n\
					tmp=ar[ii];\n\
					ar[ii]=ar[jj];\n\
					ar[jj]=tmp;\n\
				}\n\
	}\n\
	else{\n\
		mi=parseInt((li+ri)/2,10);\n\
		if (ar[li].ves>ar[ri-1].ves){\n\
			tmp=ar[li];\n\
			ar[li]=ar[ri-1];\n\
			ar[ri-1]=tmp;\n\
		}\n\
		if (ar[li].ves>ar[mi].ves){\n\
			tmp=ar[li];\n\
			ar[li]=ar[mi];\n\
			ar[mi]=tmp;\n\
		}\n\
		if (ar[mi].ves>ar[ri-1].ves){\n\
			tmp=ar[mi];\n\
			ar[mi]=ar[ri-1];\n\
			ar[ri-1]=tmp;\n\
		}\n\
		em=ar[mi].ves;\n\
		cl=li;\n\
		cr=ri-1;\n\
		while(cl<cr){\n\
			while((cl<ri)&&(ar[cl].ves<=em)) ++cl;\n\
			while((cr>li)&&(ar[cr].ves>=em)) --cr;\n\
			if (cl<cr){\n\
				tmp=ar[cl];\n\
				ar[cl]=ar[cr];\n\
				ar[cr]=tmp;\n\
			}\n\
		}\n\
		if (cr < ri -1)\n\
		    qsort(ar,li,cr+1);\n\
		qsort(ar,cl,ri);\n\
	}\n\
};\n\
";


bi2_code += "\n\
summa_ochkov = function (bonus, nuzhnye_navyki){\n\
	och=0;\n\
	for (num_index in nuzhnye_navyki){\n\
		if(bonus.skills[num_index]){\n\
			och+=bonus.skills[num_index]*nuzhnye_navyki[num_index];\n\
		}\n\
		if(bonus.attributes[bi2_s2a[num_index]]){\n\
			och+=bonus.attributes[bi2_s2a[num_index]]*nuzhnye_navyki[num_index];\n\
		}\n\
	}\n\
	return och;\n\
};\n\
";

bi2_code += "\n\
summa_ochkov2 = function (skills, nuzhnye_navyki){\n\
	och=0;\n\
	for (num_index in nuzhnye_navyki){\n\
		if(skills[num_index]){\n\
			och+=skills[num_index]*nuzhnye_navyki[num_index];\n\
		}\n\
	}\n\
	return och;\n\
};\n\
";

bi2_code += "\n\
summa_ochkov3 = function (bonus, ind_navyk){\n\
	och=0;\n\
	if(bonus.skills[ind_navyk]){\n\
		och+=bonus.skills[ind_navyk];\n\
	}\n\
	if(bonus.attributes[bi2_s2a[ind_navyk]]){\n\
		och+=bonus.attributes[bi2_s2a[ind_navyk]];\n\
	}\n\
	return och;\n\
};\n\
";


bi2_code += "\n\
bi2_vybvesch = function () {\n\
	for (irabota in porabotaj) {\n\
		if (porabotaj[irabota]==false)\n\
		    continue;\n\
		porabotaj[irabota]=false;\n\
		rabota=raboty[irabota];\n\
		if (!rabota)\n\
			{continue; }\
		if ((irabota>102)&&(irabota<120))\n\
		    continue;\n\
		prosto_veschi[irabota]={};\n\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\n\
			prosto_veschi[irabota][bi2_types[ii]]=[];\n\
		}\n\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\n\
			rekurs_time-=50;\n\
			cid = bi2_aktiv[i];\n\
			vesch = items[cid];\n\
			ctype = vesch.type;\n\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\n\
			tsena = (bi2_uchet[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\n\
    		if (ochki > 0){\n\
				mv = -1;\n\
    			for (kk = 0; kk < prosto_veschi[irabota][ctype].length; ++kk) {\n\
    			    if ((prosto_veschi[irabota][ctype][kk].bon < ochki)||((prosto_veschi[irabota][ctype][kk].bon == ochki)&&(prosto_veschi[irabota][ctype][kk].price > tsena))){\n\
    			        mv = kk;\n\
    			    }\n\
    			    else{\n\
    			        break;\n\
    			    }\n\
    			}\n\
    			if (prosto_veschi[irabota][ctype].length < prosto_veschi_max){\n\
    			    for (kk = prosto_veschi[irabota][ctype].length-1; kk > mv; --kk){\n\
    			        prosto_veschi[irabota][ctype][kk+1]={bon:prosto_veschi[irabota][ctype][kk].bon, price:prosto_veschi[irabota][ctype][kk].price, tid:prosto_veschi[irabota][ctype][kk].tid}\n\
    			    }\n\
    			    prosto_veschi[irabota][ctype][mv+1]={bon:ochki, price:tsena, tid:cid};\n\
    			}\n\
    			else{\n\
    			    for (kk = 0; kk < mv; ++kk){\n\
    			        prosto_veschi[irabota][ctype][kk]={bon:prosto_veschi[irabota][ctype][kk+1].bon, price:prosto_veschi[irabota][ctype][kk+1].price, tid:prosto_veschi[irabota][ctype][kk+1].tid}\n\
    			    }\n\
    			    prosto_veschi[irabota][ctype][mv]={bon:ochki, price:tsena, tid:cid};\n\
    			}\n\
			}\n\
		}\n\
		resultaty[irabota] = {};\n\
		resultaty[irabota].to = summa_ochkov2(pers.skills, rabota.navyki)-raboty[irabota].malus;\n\
		resultaty[irabota].ton = 0;\n\
        rabnavyki[irabota]={};\n\
        for (num_index in raboty[irabota].navyki){\n\
            temp_n = {};\n\
            temp_n[num_index]=1;\n\
            val=summa_ochkov2(pers.skills,temp_n);\n\
            rabnavyki[irabota][num_index]={};\n\
            rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\n\
            rabnavyki[irabota][num_index].znach = val;\n\
            rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index] ? raboty[irabota].navyki[num_index] : 0;\n\
        }\n\
    }\n\
	for (irabota in porabotaj) {\n\
		if (porabotaj[irabota] == false) \n\
			porabotaj[irabota] = true;\n\
	}\n\
	bi2_vreporter();\n\
};\n\
";




bi2_code += "\n\
bi2_vybzap_f = function () {\n\
	for (irabota in porabotaj) {\n\
		if ((irabota <= 102)||(irabota > 110))\n\
		    continue;\n\
		if (porabotaj[irabota]==false)\n\
		    continue;\n\
		porabotaj[irabota]=false;\n\
		rabota=raboty[irabota];\n\
		if (!rabota)\n\
			{continue; }\n\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\n\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\n\
				vyborka[bi2_types[ii]][nabory[jj]]=null;\n\
			}\n\
			for (jj=vyborka[bi2_types[ii]].simple.n-1;jj>=0;--jj)\n\
				vyborka[bi2_types[ii]].simple.spisok[jj]=null;\n\
			vyborka[bi2_types[ii]].simple.n = 1;\n\
			vyborka[bi2_types[ii]].simple.spisok[0] = {price:0, tid:0, navyki:{}, health:0};\n\
			for (oo in rabota.navyki){\n\
			    vyborka[bi2_types[ii]].simple.spisok[0].navyki[oo] = 0;\n\
			}\n\
		}\n\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\n\
			rekurs_time-=50;\n\
			cid = bi2_aktiv[i];\n\
			vesch = items[cid];\n\
			ctype = vesch.type;\n\
			ochki = 0;\n\
			cnavyki = {};\n\
			for (oo in rabota.navyki){\n\
			    cnavyki[oo] = summa_ochkov3(vesch.bonus, oo);\n\
			    ochki += cnavyki[oo];\n\
			}\n\
			chealth = summa_ochkov3(vesch.bonus, 'health');\n\
			ochki += chealth;\n\
			tsena = (bi2_uchet[cid]|| bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\n\
			if (vesch.set.key) {\n\
				vyborka[ctype][vesch.set.key]={navyki:{}, price:tsena, tid:cid, health:chealth};\n\
    			for (oo in rabota.navyki){\n\
	    		    vyborka[ctype][vesch.set.key].navyki[oo] = cnavyki[oo];\n\
			    }\n\
			}\n\
    		if (ochki > 0){\n\
				hm = []; iz=true;\n\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\n\
	    			im = 0;\n\
		    		ib = 0;\n\
			    	for (oo in rabota.navyki){\n\
    			    	if (vyborka[ctype].simple.spisok[kk].navyki[oo] < cnavyki[oo]) {ib++}\n\
	    			    else {if (vyborka[ctype].simple.spisok[kk].navyki[oo] > cnavyki[oo]) {im++}};\n\
			    	}\n\
			    	if (vyborka[ctype].simple.spisok[kk].health < chealth) {ib++}\n\
    			    else {if (vyborka[ctype].simple.spisok[kk].health > chealth) {im++}};\n\
    			    \n\
				    if (!bi2_millioner){\n\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\n\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\n\
				    }\n\
				    if (ib==0) {iz=false}\n\
				    else if (im==0){hm.push(kk)}\n\
			    }\n\
			    if (iz) {\n\
				    nn = vyborka[ctype].simple.n;\n\
					vyborka[ctype].simple.spisok[nn] = {};\n\
    				vyborka[ctype].simple.spisok[nn].health = chealth;\n\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\n\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\n\
		    		vyborka[ctype].simple.spisok[nn].navyki={};\n\
		    		for (oo in rabota.navyki){\n\
		    		    vyborka[ctype].simple.spisok[nn].navyki[oo] = cnavyki[oo];\n\
		    		}\n\
					vyborka[ctype].simple.n += 1;\n\
    				while (hm.length > 0){\n\
    				    zh = hm.pop();\n\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\n\
    				}\n\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\n\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\n\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\n\
	        	    			vyborka[ctype].simple.spisok[kk].health = vyborka[ctype].simple.spisok[kk+1].health;\n\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\n\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\n\
				            	vyborka[ctype].simple.spisok[kk].navyki={};\n\
            		    		for (oo in rabota.navyki){\n\
		                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = vyborka[ctype].simple.spisok[kk+1].navyki[oo];\n\
		                		}\n\
	        			    }\n\
			        		kk = vyborka[ctype].simple.n - 1;\n\
        					vyborka[ctype].simple.spisok[kk].health = null;\n\
                			vyborka[ctype].simple.spisok[kk].price = null;\n\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\n\
           		    		for (oo in rabota.navyki){\n\
	                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = null;\n\
	                		}\n\
	    		    	    vyborka[ctype].simple.spisok[kk].navyki = null;\n\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\n\
			        	    vyborka[ctype].simple.n -= 1;\n\
			            }\n\
			            else{\n\
			                --ll;\n\
			            }\n\
			        }\n\
			    }\n\
		    }\n\
		}\n\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\n\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\n\
				if (vyborka[bi2_types[ii]][nabory[jj]]){\n\
					dvazhdy = -1;\n\
					sid = vyborka[bi2_types[ii]][nabory[jj]].tid;\n\
					for (kk = vyborka[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\n\
						if (vyborka[bi2_types[ii]].simple.spisok[kk].tid == sid)\n\
							dvazhdy = kk;\n\
					if (dvazhdy < 0) {\n\
						nn = vyborka[bi2_types[ii]].simple.n;\n\
						vyborka[bi2_types[ii]].simple.spisok[nn] = {};\n\
						vyborka[bi2_types[ii]].simple.spisok[nn].health = vyborka[bi2_types[ii]][nabory[jj]].health;\n\
						vyborka[bi2_types[ii]].simple.spisok[nn].price = vyborka[bi2_types[ii]][nabory[jj]].price;\n\
						vyborka[bi2_types[ii]].simple.spisok[nn].tid = vyborka[bi2_types[ii]][nabory[jj]].tid;\n\
						vyborka[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\n\
						vyborka[bi2_types[ii]].simple.spisok[nn].navyki = {};\n\
       		    		for (oo in rabota.navyki){\n\
                		    vyborka[bi2_types[ii]].simple.spisok[nn].navyki[oo] = vyborka[bi2_types[ii]][nabory[jj]].navyki[oo];\n\
                 		}\n\
						vyborka[bi2_types[ii]].simple.n += 1;\n\
					}\n\
					else {\n\
						vyborka[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\n\
					}\n\
				}\n\
			}\n\
		}\n\
        for (ii=bi2_types.length-1; ii>=0; --ii){\n\
            i_slot[ii]=0;\n\
            i_slot_max[ii] = vyborka[bi2_types[ii]].simple.n;\n\
        }\n\
		samoe_ono = {};\n\
		deneg_ushlo = 0;\n\
		for (ii = 0; ii < nabory.length; ++ii)\n\
			bi2_predmetov[nabory[ii]] = 0;\n\
		bi2_tonavyki = {};\n\
		for (oo in rabota.navyki){\n\
			bi2_tonavyki[oo] = pers.skills[oo];\n\
		}\n\
		bi2_tohealth = pers.skills.health;\n\
		samoe_ono.to = 0;\n\
		samoe_ono.price=-1;\n\
		samoe_ono.health = 0;\n\
		for (ii = nabory.length-1; ii >= 0; --ii) {\n\
			for (jj = 6; jj > 0; --jj) {\n\
				t_nab = komplekty[nabory[ii]][jj];\n\
				komp_fort[nabory[ii]][jj] = {};\n\
				komp_fort[nabory[ii]][jj].navyki={};\n\
				for (oo in rabota.navyki){\n\
				    komp_fort[nabory[ii]][jj].navyki[oo] = summa_ochkov3(t_nab.bonus, oo);\n\
				}\n\
				komp_fort[nabory[ii]][jj].health = summa_ochkov3(t_nab.bonus, 'health');\n\
			}\n\
		}\n\
		rekurs_time-=500;\n\
		ii_rekur=0;\n\
		window.setTimeout(bi2_rekurs_f, rekurs_delay/5);\n\
		return;\n\
    }\n\
	for (irabota in porabotaj) {\n\
		if (porabotaj[irabota] == false)\n\
			porabotaj[irabota] = true;\n\
	}\n\
    bi2_reporter();\n\
};\n\
";



bi2_code += "\n\
bi2_rekurs_f = function (){\n\
    if (rekurs_time>15000) rekurs_time=10000;\n\
    nn = bi2_types.length;\n\
    rabota=raboty[irabota];\n\
    for (ii = ii_rekur; ii >= 0; )\n\
    {\n\
        if (--rekurs_time <= 0){\n\
            ii_rekur = ii;\n\
            rekurs_time = 20000;\n\
            ++rekurs_step;\n\
           	new HumanMessage('Trwa pobieranie ekwipunku, poz '+rekurs_step, {type: 'success'});\n\
            window.setTimeout(bi2_rekurs_f, rekurs_delay);\n\
            return 1;\n\
        }\n\
        if (i_slot[ii] >= i_slot_max[ii]){\n\
            if (--ii >= 0){\n\
                deneg_ushlo -= ic_obj[ii].price;\n\
           		for (oo in rabota.navyki){\n\
    	            bi2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\n\
		        }\n\
                bi2_tohealth -= ic_obj[ii].health;\n\
    	    	if (ic_obj[ii].nabor) {\n\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\n\
	    	    }\n\
	    	    i_slot[ii]+=1;\n\
            }\n\
    	    continue;\n\
        }\n\
        deb_v = vyborka[bi2_types[ii]].simple.spisok;\n\
        ic_obj[ii] = deb_v[i_slot[ii]];\n\
        deneg_ushlo += ic_obj[ii].price;\n\
        if (deneg_ushlo <= bablo)\n\
        {\n\
			if (ic_obj[ii].nabor) {\n\
    			bi2_predmetov[ic_obj[ii].nabor] += 1;\n\
	    	}\n\
 		    bi2_tohealth += ic_obj[ii].health;\n\
       		for (oo in rabota.navyki){\n\
	            bi2_tonavyki[oo] += ic_obj[ii].navyki[oo];\n\
	        }\n\
		    if (++ii == nn){\n\
    			ton = {};\n\
    			ton.navyki={};\n\
    			ton.health=0;\n\
    			for (oo in rabota.navyki){\n\
    			    ton.navyki[oo]=0;\n\
    			}\n\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \n\
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\n\
			    		ton.health += komp_fort[nabory[inabor]][bi2_predmetov[nabory[inabor]]].health;\n\
			    		for (oo in rabota.navyki){\n\
			    		    ton.navyki[oo] += komp_fort[nabory[inabor]][bi2_predmetov[nabory[inabor]]].navyki[oo];\n\
			    		}\n\
				    }\n\
    			\n\
    			bi2_tohealth += ton.health;\n\
    			for (oo in rabota.navyki){\n\
    			    bi2_tonavyki[oo] += ton.navyki[oo]\n\
    			}\n\
    			cto = 0;\n\
    			for (oo in rabota.navyki){\n\
    			    cto += bi2_s2f_bonus(bi2_tonavyki[oo])*rabota.navyki[oo];\n\
    			}\n\
			if (bi2_tohealth >= bi2_zdorov)\n\
	    		if ((samoe_ono.to < cto)||((samoe_ono.to == cto)&&(samoe_ono.health<bi2_tohealth))) {\n\
		    		samoe_ono.to = cto;\n\
				    samoe_ono.price=deneg_ushlo;\n\
				    samoe_ono.health = bi2_tohealth;\n\
				    for (jj = nn - 1; jj >= 0; --jj) {\n\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\n\
				    }\n\
    			}\n\
			\n\
    			bi2_tohealth -= ton.health;\n\
    			for (oo in rabota.navyki){\n\
    			    bi2_tonavyki[oo] -= ton.navyki[oo]\n\
    			}\n\
			    --ii;\n\
                deneg_ushlo -= ic_obj[ii].price;\n\
           		for (oo in rabota.navyki){\n\
    	            bi2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\n\
		        }\n\
                bi2_tohealth -= ic_obj[ii].health;\n\
    	    	if (ic_obj[ii].nabor) {\n\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\n\
	    	    }\n\
	    	    i_slot[ii]+=1;\n\
                continue;\n\
		    }\n\
		    else{\n\
		        i_slot[ii]=0;\n\
		        continue;\n\
		    }\n\
        }\n\
        else{\n\
            deneg_ushlo -= ic_obj[ii].price;\n\
            i_slot[ii]+=1;\n\
            continue;\n\
        }\n\
    }\n\
\n\
		resultaty[irabota] = {};\n\
		samoe_ono.to=Math.round(samoe_ono.to*10)/10;\n\
		resultaty[irabota].to = samoe_ono.to;\n\
		resultaty[irabota].ton = 0;\n\
		resultaty[irabota].price = samoe_ono.price;\n\
		resultaty[irabota].items = [];\n\
		for (i = 0; i < bi2_types.length; ++i) {\n\
		if (samoe_ono.price >= 0) {\n\
			vvv = vyborka[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\n\
		}else{vvv = 0};\n\
			resultaty[irabota].items[i] = {};\n\
			resultaty[irabota].items[i].tid = vvv.tid;\n\
			resultaty[irabota].items[i].bon = 0;\n\
			resultaty[irabota].items[i].price = vvv.price;\n\
		}\n\
            rabnavyki[irabota]={};\n\
		resultaty[irabota].to=0;\n\
		resultaty[irabota].ton=0;\n\
            for (num_index in raboty[irabota].navyki){\n\
                temp_n = {};\n\
                temp_n[num_index]=1;\n\
                val=summa_ochkov2(pers.skills,temp_n);\n\
                temp_u = {};\n\
                for (ee = bi2_types.length-1;ee>=0;--ee){\n\
                    sid = resultaty[irabota].items[ee].tid;\n\
                    if (sid > 0){\n\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\n\
                        temp_k = items[sid].set.key;\n\
                        if (temp_k){\n\
                            if (temp_u[temp_k])\n\
                                temp_u[temp_k]+=1;\n\
                            else\n\
                                temp_u[temp_k]=1;\n\
                        }\n\
                    }\n\
                } \n\
                for (uu = nabory.length - 1; uu>=0; --uu){\n\
                    if (temp_u[nabory[uu]]>1){\n\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\n\
                        val+=summa_ochkov(bn,temp_n);\
                    }\n\
                }\n\
                rabnavyki[irabota][num_index]={};\n\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\n\
                rabnavyki[irabota][num_index].znach = val;\n\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\n\
		vvv = bi2_s2f_bonus(val);\n\
		if (num_index!='aim') {resultaty[irabota].ton+=vvv};\n\
		if (num_index!='dodge') {resultaty[irabota].to+=vvv};\n\
            }\n\
		resultaty[irabota].ton = Math.round(resultaty[irabota].ton*10)/10;\n\
		resultaty[irabota].to = Math.round(resultaty[irabota].to*10+resultaty[irabota].ton*10)/10;\n\
            temp_n = {};\n\
            temp_n.health=1;\n\
            val=summa_ochkov2(pers.skills,temp_n);\n\
            temp_u = {};\n\
            for (ee = bi2_types.length-1;ee>=0;--ee){\n\
                sid = resultaty[irabota].items[ee].tid;\n\
                if (sid > 0){\n\
                    val+=summa_ochkov(items[sid].bonus,temp_n);\n\
                    temp_k = items[sid].set.key;\n\
                    if (temp_k){\n\
                        if (temp_u[temp_k])\n\
                            temp_u[temp_k]+=1;\n\
                        else\n\
                            temp_u[temp_k]=1;\n\
                    }\n\
                }\n\
            } \n\
            for (uu = nabory.length - 1; uu>=0; --uu){\n\
                if (temp_u[nabory[uu]]>1){\n\
                    bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\n\
                    val+=summa_ochkov(bn,temp_n);\n\
                }\n\
            }\n\
            rabnavyki[irabota].health={};\n\
            rabnavyki[irabota].health.name=pers.skill_titles.health;\n\
            rabnavyki[irabota].health.znach = val;\n\
            rabnavyki[irabota].health.mul = 1;\n\
    bi2_vybzap_f();\n\
};\n\
";


bi2_code += "\n\
bi2_vybzap = function () {\n\
	for (irabota in porabotaj) {\n\
		if (porabotaj[irabota]==false)\n\
		    continue;\n\
		porabotaj[irabota]=false;\n\
		rabota=raboty[irabota];\n\
		if (!rabota)\n\
			{continue; }\n\
		if ((irabota>102)&&(irabota<120))\n\
		    continue;\n\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\n\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\n\
				vyborka[bi2_types[ii]][nabory[jj]]=null;\n\
			}\n\
			for (jj=vyborka[bi2_types[ii]].simple.n-1;jj>=0;--jj)\n\
				vyborka[bi2_types[ii]].simple.spisok[jj]=null;\n\
			vyborka[bi2_types[ii]].simple.n = 1;\n\
			vyborka[bi2_types[ii]].simple.spisok[0] = {bon:0, price:0, tid:0};\n\
		}\n\
		\n\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\n\
			rekurs_time-=50;\n\
			cid = bi2_aktiv[i];\n\
			vesch = items[cid];\n\
			ctype = vesch.type;\n\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\n\
			tsena = (bi2_uchet[cid] || bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\n\
			if (vesch.set.key) {\n\
				vyborka[ctype][vesch.set.key]={bon:ochki, price:tsena, tid:cid};\n\
			}\n\
    		if (ochki > 0){\n\
				hm = []; iz=true;\n\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\n\
	    			im = 0;\n\
		    		ib = 0;\n\
			    	if (vyborka[ctype].simple.spisok[kk].bon < ochki) {ib++}\n\
				    else {if (vyborka[ctype].simple.spisok[kk].bon > ochki) {im++}}\n\
				    if (!bi2_millioner){\n\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\n\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\n\
				    }\n\
				    if ((im==0)&&(ib==0)){\n\
						v2=items[vyborka[ctype].simple.spisok[kk].tid];\n\
						def2=summa_ochkov(v2.bonus, all_def.navyki);\n\
						def1=summa_ochkov(vesch.bonus, all_def.navyki);\n\
						if (def1>def2) ++ib;\n\
				    }\n\
				    if (ib==0) {iz=false}\n\
				    else if (im==0){hm.push(kk)}\n\
			    }\n\
			    if (iz) {\n\
				    nn = vyborka[ctype].simple.n;\n\
					vyborka[ctype].simple.spisok[nn] = {};\n\
    				vyborka[ctype].simple.spisok[nn].bon = ochki;\n\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\n\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\n\
					vyborka[ctype].simple.n += 1;\n\
    				while (hm.length > 0){\n\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\n\
    				}\n\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\n\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\n\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\n\
	        	    			vyborka[ctype].simple.spisok[kk].bon = vyborka[ctype].simple.spisok[kk+1].bon;\n\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\n\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\n\
	        			    }\n\
			        		kk = vyborka[ctype].simple.n - 1;\n\
        					vyborka[ctype].simple.spisok[kk].bon = null;\n\
                			vyborka[ctype].simple.spisok[kk].price = null;\n\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\n\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\n\
			        	    vyborka[ctype].simple.n -= 1;\n\
			            }\n\
			            else{\n\
			                --ll;\n\
			            }\n\
			        }\n\
			    }\n\
		    }\n\
		}\n\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\n\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\n\
				if (vyborka[bi2_types[ii]][nabory[jj]]) {\n\
					dvazhdy = -1;\n\
					sid = vyborka[bi2_types[ii]][nabory[jj]].tid;\n\
					for (kk = vyborka[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\n\
						if (vyborka[bi2_types[ii]].simple.spisok[kk].tid == sid)\n\
							dvazhdy = kk;\n\
					if (dvazhdy < 0) {\n\
						nn = vyborka[bi2_types[ii]].simple.n;\n\
						vyborka[bi2_types[ii]].simple.spisok[nn] = {};\n\
						vyborka[bi2_types[ii]].simple.spisok[nn].bon = vyborka[bi2_types[ii]][nabory[jj]].bon;\n\
						vyborka[bi2_types[ii]].simple.spisok[nn].price = vyborka[bi2_types[ii]][nabory[jj]].price;\n\
						vyborka[bi2_types[ii]].simple.spisok[nn].tid = vyborka[bi2_types[ii]][nabory[jj]].tid;\n\
						vyborka[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\n\
						vyborka[bi2_types[ii]].simple.n += 1;\n\
					}\n\
					else {\n\
						vyborka[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\n\
					}\n\
				}\n\
			}\n\
		}\n\
		samoe_ono = {};\n\
		deneg_ushlo = 0;\n\
		for (ii = 0; ii < nabory.length; ++ii) \n\
			bi2_predmetov[nabory[ii]] = 0;\n\
		psk = summa_ochkov2(pers.skills, rabota.navyki);\n\
		if (isNaN(psk)) psk=0;\n\
		bi2_to= psk - rabota.malus;\n\
		samoe_ono.to= bi2_to;\n\
		samoe_ono.ton=0;\n\
		samoe_ono.price=-1;\n\
		for (ii = nabory.length-1; ii >= 0; --ii) {\n\
			for (jj = 6; jj > 0; --jj) {\n\
				t_nab = komplekty[nabory[ii]][jj];\n\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\n\
				if (t_nab.raboty[irabota]) \n\
					ton += t_nab.raboty[irabota];\n\
				komp_rab[nabory[ii]][jj] = ton;\n\
			}\n\
		}\n\
        for (ii=bi2_types.length-1; ii>=0; --ii){\n\
            i_slot[ii]=0;\n\
            i_slot_max[ii] = vyborka[bi2_types[ii]].simple.n;\n\
        }\n\
        rekurs_time-=500;\n\
        ii_rekur=0;\n\
		window.setTimeout(bi2_rekurs, rekurs_delay/5);\n\
		return;\n\
    }\n\
	for (irabota in porabotaj) {\n\
		if (porabotaj[irabota] == false) \n\
			porabotaj[irabota] = true;\n\
	}\n\
    bi2_vybzap_z();\n\
};\n\
";


bi2_code += "\n\
bi2_vybzap_z = function () {\n\
	for (irabota in porabotaj) {\n\
	    if (!zaschita)  continue;\n\
		if (porabotaj[irabota]==false)\n\
		    continue;\n\
		porabotaj[irabota]=false;\n\
		rabota=raboty[irabota];\n\
		if (!rabota)\n\
			{continue;}\n\
		if ((irabota>102)&&(irabota<120))\n\
		    continue;\n\
		if (!resultaty[irabota]){\n\
		    resultaty_z[irabota]=null;\n\
		    continue;\n\
		}\n\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\n\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\n\
				vyborka_z[bi2_types[ii]][nabory[jj]]=null;\n\
			}\n\
			for (jj=vyborka_z[bi2_types[ii]].simple.n-1;jj>=0;--jj)\n\
				vyborka_z[bi2_types[ii]].simple.spisok[jj]=null;\n\
			vyborka_z[bi2_types[ii]].simple.n = 1;\n\
			vyborka_z[bi2_types[ii]].simple.spisok[0] = {bon:0, zas:0, price:0, tid:0};\n\
		}\n\
		if (resultaty[irabota].to >= zaschita.to){\n\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\n\
			rekurs_time-=50;\n\
			cid = bi2_aktiv[i];\n\
			vesch = items[cid];\n\
			ctype = vesch.type;\n\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\n\
			zas = summa_ochkov(vesch.bonus, zaschita.navyki);\n\
			tsena = (bi2_uchet[cid] || bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\n\
			if (vesch.set.key) {\n\
				vyborka_z[ctype][vesch.set.key]={bon:ochki, zas:zas, price:tsena, tid:cid};\n\
			}\n\
    		if ((ochki > 0)||(zas > 0)){\n\
				hm = []; iz=true;\n\
    			for (kk = vyborka_z[ctype].simple.n-1; kk >= 0; --kk) {\n\
	    			im = 0;\n\
		    		ib = 0;\n\
			    	if (vyborka_z[ctype].simple.spisok[kk].bon < ochki) {ib++}\n\
				    else {if (vyborka_z[ctype].simple.spisok[kk].bon > ochki) {im++}}\n\
			    	if (vyborka_z[ctype].simple.spisok[kk].zas < zas) {ib++}\n\
				    else {if (vyborka_z[ctype].simple.spisok[kk].zas > zas) {im++}}\n\
				    if (!bi2_millioner){\n\
				        if (vyborka_z[ctype].simple.spisok[kk].price > tsena) {ib++}\n\
				        else {if (vyborka_z[ctype].simple.spisok[kk].price < tsena) {im++}}\n\
				    }\n\
				    if (ib==0) {iz=false}\n\
				    else if (im==0){hm.push(kk)}\n\
			    }\n\
			    if (iz) {\n\
				    nn = vyborka_z[ctype].simple.n;\n\
					vyborka_z[ctype].simple.spisok[nn] = {};\n\
    				vyborka_z[ctype].simple.spisok[nn].bon = ochki;\n\
	    			vyborka_z[ctype].simple.spisok[nn].price = tsena;\n\
		    		vyborka_z[ctype].simple.spisok[nn].tid = cid;\n\
		    		vyborka_z[ctype].simple.spisok[nn].zas = zas;\n\
					vyborka_z[ctype].simple.n += 1;\n\
    				while (hm.length > 0){\n\
    				    zh = hm.pop();\n\
    				    vyborka_z[ctype].simple.spisok[zh].tid = -1;\n\
    				}\n\
			        for (ll = vyborka_z[ctype].simple.n-1;ll>=0; ){\n\
			            if (vyborka_z[ctype].simple.spisok[ll].tid== -1){\n\
    		    			for (kk = ll; kk < vyborka_z[ctype].simple.n - 1; ++kk) {\n\
	        	    			vyborka_z[ctype].simple.spisok[kk].bon = vyborka_z[ctype].simple.spisok[kk+1].bon;\n\
			            		vyborka_z[ctype].simple.spisok[kk].price = vyborka_z[ctype].simple.spisok[kk+1].price;\n\
				            	vyborka_z[ctype].simple.spisok[kk].tid = vyborka_z[ctype].simple.spisok[kk+1].tid;\n\
				            	vyborka_z[ctype].simple.spisok[kk].zas = vyborka_z[ctype].simple.spisok[kk+1].zas;\n\
	        			    }\n\
			        		kk = vyborka_z[ctype].simple.n - 1;\n\
        					vyborka_z[ctype].simple.spisok[kk].bon = null;\n\
                			vyborka_z[ctype].simple.spisok[kk].price = null;\n\
	    		    	    vyborka_z[ctype].simple.spisok[kk].tid = null;\n\
	    		    	    vyborka_z[ctype].simple.spisok[kk].zas = null;\n\
	        		    	vyborka_z[ctype].simple.spisok[kk] = null;\n\
			        	    vyborka_z[ctype].simple.n -= 1;\n\
			            }\n\
			            else{\n\
			                --ll;\n\
			            }\n\
			        }\n\
			    }\n\
		    }\n\
		}}\n\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\n\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\n\
				if (vyborka_z[bi2_types[ii]][nabory[jj]]) {\n\
					dvazhdy = -1;\n\
					sid = vyborka_z[bi2_types[ii]][nabory[jj]].tid;\n\
					for (kk = vyborka_z[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\n\
						if (vyborka_z[bi2_types[ii]].simple.spisok[kk].tid == sid)\n\
							dvazhdy = kk;\n\
					if (dvazhdy < 0) {\n\
						nn = vyborka_z[bi2_types[ii]].simple.n;\n\
						vyborka_z[bi2_types[ii]].simple.spisok[nn] = {};\n\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].bon = vyborka_z[bi2_types[ii]][nabory[jj]].bon;\n\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].price = vyborka_z[bi2_types[ii]][nabory[jj]].price;\n\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].tid = vyborka_z[bi2_types[ii]][nabory[jj]].tid;\n\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].zas = vyborka_z[bi2_types[ii]][nabory[jj]].zas;\n\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\n\
						vyborka_z[bi2_types[ii]].simple.n += 1;\n\
					}\n\
					else {\n\
						vyborka_z[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\n\
					}\n\
				}\n\
			}\n\
		}\n\
		samoe_ono = {};\n\
		deneg_ushlo = 0;\n\
		for (ii = 0; ii < nabory.length; ++ii) \n\
			bi2_predmetov[nabory[ii]] = 0;\n\
		bi2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus - zaschita.to;\n\
		bi2_zas=0;\n\
		samoe_ono.to= bi2_to;\n\
		samoe_ono.price=-1;\n\
		samoe_ono.zas=bi2_zas;\n\
		for (ii = nabory.length-1; ii >= 0; --ii) {\n\
			for (jj = 6; jj > 0; --jj) {\n\
				t_nab = komplekty[nabory[ii]][jj];\n\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\n\
				if (t_nab.raboty[irabota]) \n\
					ton += t_nab.raboty[irabota];\n\
				komp_rab[nabory[ii]][jj] = ton;\n\
				zan = summa_ochkov(t_nab.bonus, zaschita.navyki);\n\
				komp_zas[nabory[ii]][jj] = zan;\n\
			}\n\
		}\n\
        for (ii=bi2_types.length-1; ii>=0; --ii){\n\
            i_slot[ii]=0;\n\
            i_slot_max[ii] = vyborka_z[bi2_types[ii]].simple.n;\n\
        }\n\
        rekurs_time-=500;\n\
        ii_rekur=0;\n\
		window.setTimeout(bi2_rekurs_z, rekurs_delay/5);\n\
		return;\n\
    }\n\
	for (irabota in porabotaj) {\n\
		if (porabotaj[irabota] == false) \n\
			porabotaj[irabota] = true;\n\
	}\n\
    bi2_vybzap_r();\n\
};\n\
";

bi2_code += "\n\
bi2_vybzap_r = function () {\n\
	for (irabota in porabotaj) {\n\
		if (porabotaj[irabota]==false)\n\
		    continue;\n\
		porabotaj[irabota]=false;\n\
		if (((irabota>102)||(!ezda))&&(irabota!=111))\n\
		    continue;\n\
		rabota=raboty[irabota];\n\
		if (!rabota)\n\
			{continue;}\n\
		if ((irabota!=111)&&(!resultaty[irabota])){\n\
		    resultaty_r[irabota]=null;\n\
		    continue;\n\
		}\n\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\n\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\n\
				vyborka_r[bi2_types[ii]][nabory[jj]]=null;\n\
			}\n\
			for (jj=vyborka_r[bi2_types[ii]].simple.n-1;jj>=0;--jj)\n\
				vyborka_r[bi2_types[ii]].simple.spisok[jj]=null;\n\
			vyborka_r[bi2_types[ii]].simple.n = 1;\n\
			vyborka_r[bi2_types[ii]].simple.spisok[0] = {bon:0, ride:0, speed:1.0, price:0, tid:0};\n\
		}\n\
		if ((irabota==111)||(resultaty[irabota].to > 0)){\n\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\n\
			rekurs_time-=50;\n\
			cid = bi2_aktiv[i];\n\
			vesch = items[cid];\n\
			ctype = vesch.type;\n\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\n\
			ride = summa_ochkov3(vesch.bonus, 'ride');\n\
			speed = (vesch.speed)?vesch.speed:1.0;\n\
			tsena = (bi2_uchet[cid] || bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\n\
			if (vesch.set.key) {\n\
				vyborka_r[ctype][vesch.set.key]={bon:ochki, ride:ride, speed:speed, price:tsena, tid:cid};\n\
			}\n\
    		if ((ochki > 0)||(ride > 0)||(speed<1.0)){\n\
				hm = []; iz=true;\n\
    			for (kk = vyborka_r[ctype].simple.n-1; kk >= 0; --kk) {\n\
	    			im = 0;\n\
		    		ib = 0;\n\
			    	if (vyborka_r[ctype].simple.spisok[kk].bon < ochki) {ib++}\n\
				    else {if (vyborka_r[ctype].simple.spisok[kk].bon > ochki) {im++}}\n\
			    	if (vyborka_r[ctype].simple.spisok[kk].ride < ride) {ib++}\n\
				    else {if (vyborka_r[ctype].simple.spisok[kk].ride > ride) {im++}}\n\
			        if (vyborka_r[ctype].simple.spisok[kk].speed > speed) {ib++}\n\
			        else {if (vyborka_r[ctype].simple.spisok[kk].speed < speed) {im++}}\n\
				    if (!bi2_millioner){\n\
				        if (vyborka_r[ctype].simple.spisok[kk].price > tsena) {ib++}\n\
				        else {if (vyborka_r[ctype].simple.spisok[kk].price < tsena) {im++}}\n\
				    }\n\
				    if (ib==0) {iz=false}\n\
				    else if (im==0){hm.push(kk)}\n\
			    }\n\
			    if (iz) {\n\
				    nn = vyborka_r[ctype].simple.n;\n\
					vyborka_r[ctype].simple.spisok[nn] = {};\n\
    				vyborka_r[ctype].simple.spisok[nn].bon = ochki;\n\
	    			vyborka_r[ctype].simple.spisok[nn].price = tsena;\n\
		    		vyborka_r[ctype].simple.spisok[nn].tid = cid;\n\
		    		vyborka_r[ctype].simple.spisok[nn].ride = ride;\n\
		    		vyborka_r[ctype].simple.spisok[nn].speed = speed;\n\
					vyborka_r[ctype].simple.n += 1;\n\
    				while (hm.length > 0){\n\
    				    zh = hm.pop();\n\
    				    vyborka_r[ctype].simple.spisok[zh].tid = -1;\n\
    				}\n\
			        for (ll = vyborka_r[ctype].simple.n-1;ll>=0; ){\n\
			            if (vyborka_r[ctype].simple.spisok[ll].tid== -1){\n\
    		    			for (kk = ll; kk < vyborka_r[ctype].simple.n - 1; ++kk) {\n\
	        	    			vyborka_r[ctype].simple.spisok[kk].bon = vyborka_r[ctype].simple.spisok[kk+1].bon;\n\
			            		vyborka_r[ctype].simple.spisok[kk].price = vyborka_r[ctype].simple.spisok[kk+1].price;\n\
				            	vyborka_r[ctype].simple.spisok[kk].tid = vyborka_r[ctype].simple.spisok[kk+1].tid;\n\
				            	vyborka_r[ctype].simple.spisok[kk].ride = vyborka_r[ctype].simple.spisok[kk+1].ride;\n\
				            	vyborka_r[ctype].simple.spisok[kk].speed = vyborka_r[ctype].simple.spisok[kk+1].speed;\n\
	        			    }\n\
			        		kk = vyborka_r[ctype].simple.n - 1;\n\
        					vyborka_r[ctype].simple.spisok[kk].bon = null;\n\
                			vyborka_r[ctype].simple.spisok[kk].price = null;\n\
	    		    	    vyborka_r[ctype].simple.spisok[kk].tid = null;\n\
	    		    	    vyborka_r[ctype].simple.spisok[kk].ride = null;\n\
	    		    	    vyborka_r[ctype].simple.spisok[kk].speed = null;\n\
	        		    	vyborka_r[ctype].simple.spisok[kk] = null;\n\
			        	    vyborka_r[ctype].simple.n -= 1;\n\
			            }\n\
			            else{\n\
			                --ll;\n\
			            }\n\
			        }\n\
			    }\n\
		    }\n\
		}}\n\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\n\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\n\
				if (vyborka_r[bi2_types[ii]][nabory[jj]]) {\n\
					dvazhdy = -1;\n\
					sid = vyborka_r[bi2_types[ii]][nabory[jj]].tid;\n\
					for (kk = vyborka_r[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\n\
						if (vyborka_r[bi2_types[ii]].simple.spisok[kk].tid == sid)\n\
							dvazhdy = kk;\n\
					if (dvazhdy < 0) {\n\
						nn = vyborka_r[bi2_types[ii]].simple.n;\n\
						vyborka_r[bi2_types[ii]].simple.spisok[nn] = {};\n\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].bon = vyborka_r[bi2_types[ii]][nabory[jj]].bon;\n\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].price = vyborka_r[bi2_types[ii]][nabory[jj]].price;\n\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].tid = vyborka_r[bi2_types[ii]][nabory[jj]].tid;\n\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].ride = vyborka_r[bi2_types[ii]][nabory[jj]].ride;\n\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].speed = vyborka_r[bi2_types[ii]][nabory[jj]].speed;\n\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\n\
						vyborka_r[bi2_types[ii]].simple.n += 1;\n\
					}\n\
					else {\n\
						vyborka_r[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\n\
					}\n\
				}\n\
			}\n\
		}\n\
		samoe_ono = {};\n\
		deneg_ushlo = 0;\n\
		for (ii = 0; ii < nabory.length; ++ii) \n\
			bi2_predmetov[nabory[ii]] = 0;\n\
		bi2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus;\n\
		bi2_ride=0;\n\
		bi2_speed=1.0;\n\
		samoe_ono.to= bi2_to;\n\
		samoe_ono.price=-1;\n\
		samoe_ono.ride=bi2_ride;\n\
		samoe_ono.speed=100.0;\n\
		for (ii = nabory.length-1; ii >= 0; --ii) {\n\
			for (jj = 6; jj > 0; --jj) {\n\
				t_nab = komplekty[nabory[ii]][jj];\n\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\n\
				if (t_nab.raboty[irabota]) \n\
					ton += t_nab.raboty[irabota];\n\
				komp_rab[nabory[ii]][jj] = ton;\n\
				komp_skor[nabory[ii]][jj] = {};\n\
				komp_skor[nabory[ii]][jj].ride = summa_ochkov3(t_nab.bonus, 'ride');\n\
				komp_skor[nabory[ii]][jj].speed = t_nab.speed?t_nab.speed:1.0;\n\
				\n\
			}\n\
		}\n\
        for (ii=bi2_types.length-1; ii>=0; --ii){\n\
            i_slot[ii]=0;\n\
            i_slot_max[ii] = vyborka_r[bi2_types[ii]].simple.n;\n\
        }\n\
        rekurs_time-=500;\n\
        ii_rekur=0;\n\
		window.setTimeout(bi2_rekurs_r, rekurs_delay/5);\n\
		return;\n\
    }\n\
	for (irabota in porabotaj) {\n\
		if (porabotaj[irabota] == false) \n\
			porabotaj[irabota] = true;\n\
	}\n\
    bi2_vybzap_f();\n\
};\n\
";



bi2_code += "\n\
bi2_rekurs = function (){\n\
    nn = bi2_types.length;\n\
    for (ii = ii_rekur; ii >= 0; )\n\
    {\n\
        if (--rekurs_time <= 0){\n\
            ii_rekur = ii;\n\
            rekurs_time = 50000;\n\
            ++rekurs_step;\n\
           	new HumanMessage('Trwa pobieranie ekwipunku, poz '+rekurs_step, {type: 'success'});\n\
            window.setTimeout(bi2_rekurs, rekurs_delay);\n\
            return 1;\n\
        }\n\
        if (i_slot[ii] >= i_slot_max[ii]){\n\
            if (--ii >= 0){\n\
                deneg_ushlo -= ic_obj[ii].price;\n\
                bi2_to -= ic_obj[ii].bon;\n\
    	    	if (ic_obj[ii].nabor) {\n\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\n\
	    	    }\n\
	    	    i_slot[ii]+=1;\n\
            }\n\
    	    continue;\n\
        }\n\
        deb_v = vyborka[bi2_types[ii]].simple.spisok;\n\
        ic_obj[ii] = deb_v[i_slot[ii]];\n\
        deneg_ushlo += ic_obj[ii].price;\n\
        if (deneg_ushlo <= bablo)\n\
        {\n\
			if (ic_obj[ii].nabor) {\n\
    			bi2_predmetov[ic_obj[ii].nabor] += 1;\n\
	    	}\n\
		    bi2_to += ic_obj[ii].bon;\n\
		    if (++ii == nn){\n\
    			ton = 0;\n\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \n\
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\n\
			    		ton += komp_rab[nabory[inabor]][bi2_predmetov[nabory[inabor]]]\n\
				    }\n\
    			bi2_to += ton;\n\
	    		if (samoe_ono.to < bi2_to) {\n\
		    		samoe_ono.to = bi2_to;\n\
			    	samoe_ono.ton = ton;\n\
				    samoe_ono.price=deneg_ushlo;\n\
				    for (jj = nn - 1; jj >= 0; --jj) {\n\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\n\
				    }\n\
    			}\n\
			    bi2_to -= ton;\n\
			    --ii;\n\
                deneg_ushlo -= ic_obj[ii].price;\n\
                bi2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\n\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\n\
	    	    }\n\
	    	    i_slot[ii]+=1;\n\
                continue;\n\
		    }\n\
		    else{\n\
		        i_slot[ii]=0;\n\
		        continue;\n\
		    }\n\
        }\n\
        else{\n\
            deneg_ushlo -= ic_obj[ii].price;\n\
            i_slot[ii]+=1;\n\
            continue;\n\
        }\n\
    }\n\
\n\
		if (irabota < 100){\n\
			samoe_ono.to *= Character.taskPointModifier.job\n\
		}\n\
		else if (irabota==101){\n\
			samoe_ono.to = Math.round(samoe_ono.to * Character.taskPointModifier.build);\n\
		}\n\
		resultaty[irabota] = {};\n\
		resultaty[irabota].to = samoe_ono.to;\n\
		resultaty[irabota].ton = samoe_ono.ton;\n\
		resultaty[irabota].price = samoe_ono.price;\n\
		resultaty[irabota].items = [];\n\
	if (samoe_ono.price >= 0) {\n\
		for (i = 0; i < bi2_types.length; ++i) {\n\
			vvv = vyborka[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\n\
			resultaty[irabota].items[i] = {};\n\
			resultaty[irabota].items[i].tid = vvv.tid;\n\
			resultaty[irabota].items[i].bon = vvv.bon;\n\
			resultaty[irabota].items[i].price = vvv.price;\n\
		}\n\
	}\n\
	else{\n\
		for (i = 0; i < bi2_types.length; ++i) {\n\
			resultaty[irabota].items[i] = {};\n\
			resultaty[irabota].items[i].tid = 0;\n\
			resultaty[irabota].items[i].bon = 0;\n\
			resultaty[irabota].items[i].price = 0;\n\
		}\n\
	}\n\
            rabnavyki[irabota]={};\n\
            for (num_index in raboty[irabota].navyki){\n\
                temp_n = {};\n\
                temp_n[num_index]=1;\n\
                val=summa_ochkov2(pers.skills,temp_n);\n\
                temp_u = {};\n\
                for (ee = bi2_types.length-1;ee>=0;--ee){\n\
                    sid = resultaty[irabota].items[ee].tid;\n\
                    if (sid > 0){\n\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\n\
                        temp_k = items[sid].set.key;\n\
                        if (temp_k){\n\
                            if (temp_u[temp_k])\n\
                                temp_u[temp_k]+=1;\n\
                            else\n\
                                temp_u[temp_k]=1;\n\
                        }\n\
                    }\n\
                } \n\
                for (uu = nabory.length - 1; uu>=0; --uu){\n\
                    if (temp_u[nabory[uu]]>1){\n\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\n\
                        val+=summa_ochkov(bn,temp_n);\n\
                    }\n\
                }\n\
                rabnavyki[irabota][num_index]={};\n\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\n\
                rabnavyki[irabota][num_index].znach = val;\n\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\n\
            }\n\
    bi2_vybzap();\n\
};\n\
";


bi2_code += "\n\
bi2_rekurs_z = function (){\n\
    nn = bi2_types.length;\n\
    for (ii = ii_rekur; ii >= 0; )\n\
    {\n\
        if (--rekurs_time <= 0){\n\
            ii_rekur = ii;\n\
            rekurs_time = 50000;\n\
            ++rekurs_step;\n\
           	new HumanMessage('Trwa pobieranie ekwipunku, poz '+rekurs_step, {type: 'success'});\n\
            window.setTimeout(bi2_rekurs_z, rekurs_delay);\n\
            return 1;\n\
        }\n\
        if (i_slot[ii] >= i_slot_max[ii]){\n\
            if (--ii >= 0){\n\
                deneg_ushlo -= ic_objr[ii].price;\n\
                bi2_to -= ic_objr[ii].bon;\n\
                bi2_zas -= ic_objr[ii].zas;\n\
    	    	if (ic_objr[ii].nabor) {\n\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\n\
	    	    }\n\
	    	    i_slot[ii]+=1;\n\
            }\n\
    	    continue;\n\
        }\n\
        deb_v = vyborka_z[bi2_types[ii]].simple.spisok;\n\
        ic_objr[ii] = deb_v[i_slot[ii]];\n\
        deneg_ushlo += ic_objr[ii].price;\n\
        if (deneg_ushlo <= bablo)\n\
        {\n\
			if (ic_objr[ii].nabor) {\n\
    			bi2_predmetov[ic_objr[ii].nabor] += 1;\n\
	    	}\n\
		    bi2_to += ic_objr[ii].bon;\n\
		    bi2_zas += ic_objr[ii].zas;\n\
		    if (++ii == nn){\n\
    			ton = 0;\n\
    			zan = 0;\n\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \n\
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\n\
			    		ton += komp_rab[nabory[inabor]][bi2_predmetov[nabory[inabor]]];\n\
			    		zan += komp_zas[nabory[inabor]][bi2_predmetov[nabory[inabor]]];\n\
				    }\n\
    			bi2_to += ton;\n\
    			bi2_zas += zan;\n\
	    		if ((samoe_ono.zas < bi2_zas)&&(bi2_to >= 0)) {\n\
		    		samoe_ono.to = bi2_to;\n\
			    	samoe_ono.ton = ton;\n\
                    samoe_ono.zas = bi2_zas;\n\
                    samoe_ono.zan = zan;\n\
				    samoe_ono.price=deneg_ushlo;\n\
				    for (jj = nn - 1; jj >= 0; --jj) {\n\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\n\
				    }\n\
    			}\n\
			    bi2_to -= ton;\n\
			    bi2_zas -= zan;\n\
			    --ii;\n\
                deneg_ushlo -= ic_objr[ii].price;\n\
                bi2_to -= ic_objr[ii].bon;\n\
                bi2_zas -= ic_objr[ii].zas;\n\
    	    	if (ic_objr[ii].nabor) {\n\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\n\
	    	    }\n\
	    	    i_slot[ii]+=1;\n\
                continue;\n\
		    }\n\
		    else{\n\
		        i_slot[ii]=0;\n\
		        continue;\n\
		    }\n\
        }\n\
        else{\n\
            deneg_ushlo -= ic_objr[ii].price;\n\
            i_slot[ii]+=1;\n\
            continue;\n\
        }\n\
    }\n\
\n\
	if (samoe_ono.price >= 0) {\n\
		resultaty_z[irabota] = {};\n\
		resultaty_z[irabota].to = samoe_ono.to+zaschita.to;\n\
		resultaty_z[irabota].ton = samoe_ono.ton;\n\
		resultaty_z[irabota].price = samoe_ono.price;\n\
		resultaty_z[irabota].zas = samoe_ono.zas;\n\
		resultaty_z[irabota].zan = samoe_ono.zan;\n\
		resultaty_z[irabota].items = [];\n\
		for (i = 0; i < bi2_types.length; ++i) {\n\
			vvv = vyborka_z[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\n\
			resultaty_z[irabota].items[i] = {};\n\
			resultaty_z[irabota].items[i].tid = vvv.tid;\n\
			resultaty_z[irabota].items[i].bon = vvv.bon;\n\
			resultaty_z[irabota].items[i].price = vvv.price;\n\
			resultaty_z[irabota].items[i].zas = vvv.zas;\n\
		}\n\
            rabnavyki_z[irabota]={};\n\
            for (num_index in zaschita.navyki){\n\
                temp_n = {};\n\
                temp_n[num_index]=1;\n\
                val=summa_ochkov2(pers.skills,temp_n);\n\
                temp_u = {};\n\
                for (ee = bi2_types.length-1;ee>=0;--ee){\n\
                    sid = resultaty_z[irabota].items[ee].tid;\n\
                    if (sid > 0){\n\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\n\
                        temp_k = items[sid].set.key;\n\
                        if (temp_k){\n\
                            if (temp_u[temp_k])\n\
                                temp_u[temp_k]+=1;\n\
                            else\n\
                                temp_u[temp_k]=1;\n\
                        }\n\
                    }\n\
                } \n\
                for (uu = nabory.length - 1; uu>=0; --uu){\n\
                    if (temp_u[nabory[uu]]>1){\n\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\n\
                        val+=summa_ochkov(bn,temp_n);\n\
                    }\n\
                }\n\
                rabnavyki_z[irabota][num_index]={};\n\
                rabnavyki_z[irabota][num_index].name=pers.skill_titles[num_index];\n\
                rabnavyki_z[irabota][num_index].znach = val;\n\
                rabnavyki_z[irabota][num_index].mul = zaschita.navyki[num_index];\n\
            }\n\
	}\n\
	else{\n\
		resultaty_z[irabota] = null;\n\
	}\n\
    bi2_vybzap_z();\n\
};\n\
";

bi2_code += "\n\
bi2_rekurs_r = function (){\n\
    nn = bi2_types.length;\n\
    rr = 6;\n\
    for (ii = ii_rekur; ii >= 0; )\n\
    {\n\
        if (--rekurs_time <= 0){\n\
            ii_rekur = ii;\n\
            rekurs_time = 50000;\n\
            ++rekurs_step;\n\
           	new HumanMessage('Trwa pobieranie ekwipunku, poz '+rekurs_step, {type: 'success'});\n\
            window.setTimeout(bi2_rekurs_r, rekurs_delay);\n\
            return 1;\n\
        }\n\
        if (i_slot[ii] >= i_slot_max[ii]){\n\
            if (--ii >= 0){\n\
                deneg_ushlo -= ic_objr[ii].price;\n\
                bi2_to -= ic_objr[ii].bon;\n\
                bi2_ride -= ic_objr[ii].ride;\n\
    	    	if (ic_objr[ii].nabor) {\n\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\n\
	    	    }\n\
	    	    i_slot[ii]+=1;\n\
            }\n\
    	    continue;\n\
        }\n\
        deb_v = vyborka_r[bi2_types[ii]].simple.spisok;\n\
        ic_objr[ii] = deb_v[i_slot[ii]];\n\
        deneg_ushlo += ic_objr[ii].price;\n\
        if (deneg_ushlo <= bablo)\n\
        {\n\
			if (ic_objr[ii].nabor) {\n\
    			bi2_predmetov[ic_objr[ii].nabor] += 1;\n\
	    	}\n\
		    bi2_to += ic_objr[ii].bon;\n\
		    bi2_ride += ic_objr[ii].ride;\n\
		    if (++ii == nn){\n\
    			ton = 0;\n\
    			rin = 0;\n\
    			speen = 1.0;\n\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \n\
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\n\
			    		ton += komp_rab[nabory[inabor]][bi2_predmetov[nabory[inabor]]];\n\
			    		rin += komp_skor[nabory[inabor]][bi2_predmetov[nabory[inabor]]].ride;\n\
					spn = komp_skor[nabory[inabor]][bi2_predmetov[nabory[inabor]]].speed;\n\
			    		speen += (1.0 / spn) - 1.0;\n\
				    }\n\
			speen = 1.0 / speen;\n\
    			bi2_to += ton;\n\
    			bi2_ride += rin;\n\
    			bi2_speed = 100;\n\
    			if (ic_objr[rr].speed < 1.0){\n\
    			    bi2_speed = 100.0 / ic_objr[rr].speed + bi2_ride;\n\
    			}\n\
    			bi2_speed /= speen;\n\
    			bi2_speed /= pers.default_speed;\n\
	    		if ((samoe_ono.speed < bi2_speed)&&(bi2_to > 0)) {\n\
		    		samoe_ono.to = bi2_to;\n\
			    	samoe_ono.ton = speen;\n\
                    samoe_ono.ride = bi2_ride;\n\
                    samoe_ono.speed = bi2_speed;\n\
				    samoe_ono.price=deneg_ushlo;\n\
				    for (jj = nn - 1; jj >= 0; --jj) {\n\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\n\
				    }\n\
    			}\n\
			    bi2_to -= ton;\n\
			    bi2_ride -= rin;\n\
			    --ii;\n\
                deneg_ushlo -= ic_objr[ii].price;\n\
                bi2_to -= ic_objr[ii].bon;\n\
                bi2_ride -= ic_objr[ii].ride;\n\
    	    	if (ic_objr[ii].nabor) {\n\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\n\
	    	    }\n\
	    	    i_slot[ii]+=1;\n\
                continue;\n\
		    }\n\
		    else{\n\
		        i_slot[ii]=0;\n\
		        continue;\n\
		    }\n\
        }\n\
        else{\n\
            deneg_ushlo -= ic_objr[ii].price;\n\
            i_slot[ii]+=1;\n\
            continue;\n\
        }\n\
    }\n\
\n\
	if (samoe_ono.price >= 0) {\n\
        if (irabota==111){\n\
    		resultaty[irabota] = {};\n\
	    	resultaty[irabota].to = Math.round(samoe_ono.speed);\n\
		    resultaty[irabota].ton = (1.0/samoe_ono.ton).toFixed(2);\n\
		    resultaty[irabota].price = samoe_ono.price;\n\
		    resultaty[irabota].items = [];\n\
    		for (i = 0; i < bi2_types.length; ++i) {\n\
	    		vvv = vyborka_r[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\n\
		    	resultaty[irabota].items[i] = {};\n\
			    resultaty[irabota].items[i].tid = vvv.tid;\n\
    			resultaty[irabota].items[i].bon = vvv.ride;\n\
	    		resultaty[irabota].items[i].price = vvv.price;\n\
		    }\n\
            rabnavyki[irabota]={};\n\
            rabnavyki[irabota].ride={};\n\
            rabnavyki[irabota].ride.name=pers.skill_titles.ride;\n\
            rabnavyki[irabota].ride.znach = samoe_ono.ride;\n\
            rabnavyki[irabota].ride.mul = 1.0;\n\
            resultaty_r[irabota] = null;\n\
            rabnavyki_r[irabota] = null;\n\
        }\n\
        else{\n\
		    resultaty_r[irabota] = {};\n\
		    resultaty_r[irabota].to = samoe_ono.to;\n\
		    resultaty_r[irabota].ton = samoe_ono.ton;\n\
		    resultaty_r[irabota].price = samoe_ono.price;\n\
		    resultaty_r[irabota].ride = samoe_ono.ride;\n\
		    resultaty_r[irabota].speed = samoe_ono.speed;\n\
		    resultaty_r[irabota].items = [];\n\
		    for (i = 0; i < bi2_types.length; ++i) {\n\
			    vvv = vyborka_r[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\n\
			    resultaty_r[irabota].items[i] = {};\n\
			    resultaty_r[irabota].items[i].tid = vvv.tid;\n\
			    resultaty_r[irabota].items[i].bon = vvv.bon;\n\
			    resultaty_r[irabota].items[i].price = vvv.price;\n\
			    resultaty_r[irabota].items[i].ride = vvv.ride;\n\
			    resultaty_r[irabota].items[i].speed = vvv.speed;\n\
		    }\n\
            rabnavyki_r[irabota]={};\n\
            rabnavyki_r[irabota].ride={};\n\
            rabnavyki_r[irabota].ride.name=pers.skill_titles.ride;\n\
            rabnavyki_r[irabota].ride.znach = samoe_ono.ride;\n\
            rabnavyki_r[irabota].ride.mul = 1.0;\n\
		}\n\
	}\n\
	else{\n\
		resultaty_r[irabota] = null;\n\
	}\n\
    bi2_vybzap_r();\n\
};\n\
";
	

aWindow.bi2_minimize_title = function(){
	if (aWindow.bi2_title_flag2 == 1) {
    	aWindow.bi2_title_flag2 = 0;
		document.getElementById('bi2_title_content_row').style.display = 'none';
		document.getElementById('bi2_title_cap').style.display = 'none';
		document.getElementById('bi2_form0').style.width = '100px';
	}
	else {
		aWindow.bi2_title_flag2 = 1;
		document.getElementById('bi2_title_content_row').style.display = 'table-row';
		document.getElementById('bi2_title_cap').style.display = 'inline';
		document.getElementById('bi2_form0').style.width = aWindow.bi2_w0+'px';
	}
}

aWindow.bi2_stretch_title = function(){
    var nv;
    if (aWindow.bi2_title_flag == 1) {
        aWindow.bi2_title_flag = 0;
        nv = aWindow.bi2_title_h_mid + 'px';
    }
    else {
        aWindow.bi2_title_flag = 1
        nv = aWindow.bi2_title_h_max + 'px';
    }
    document.getElementById('bi2_title_content').style.height = nv;
}


aWindow.bi2_close_title = function(){
	document.getElementById('bi2_title').style.display='none';
}

aWindow.bi2_close_shmot = function(){
    rm = document.getElementById('bi2_shmot');
    document.body.removeChild(rm);
}

aWindow.bi2_vselect = function (chk){
	if (chk) {
		document.getElementById('bi2_vselect').innerHTML=aWindow.bi2_mulselect+aWindow.bi2_conselect;
		/*document.getElementById('bi2_sk_rabot').innerHTML='Несколько работ';*/
	}
	else{
		document.getElementById('bi2_vselect').innerHTML=aWindow.bi2_simselect+aWindow.bi2_conselect;
		/*document.getElementById('bi2_sk_rabot').innerHTML='Одна работа&nbsp;&nbsp;&nbsp;&nbsp;';*/
	}
}

aWindow.bi2_minimize_window = function(){
	if (aWindow.bi2_window_flag2 == 1) {
		aWindow.bi2_window_flag2 = 0;
		document.getElementById('bi2_window_content_row').style.display = 'none';
		document.getElementById('bi2_window_cap').style.display = 'none'
		document.getElementById('bi2_win1').style.width = '100px';
	}
	else {
		aWindow.bi2_window_flag2 = 1;
		document.getElementById('bi2_win1').style.width = aWindow.bi2_w1+'px';
		document.getElementById('bi2_window_content_row').style.display = 'table-row';
		document.getElementById('bi2_window_cap').style.display = 'inline';
	}
}

aWindow.bi2_close_window = function(){
	document.getElementById('bi2_window').style.display='none';
}

aWindow.bi2_error_window = function(err){
	document.getElementById('bi2_window_content').style.height = parseInt((aWindow.bi2_window_h_max*3)/5, 10) + 'px';
	bi2_err = document.getElementById('bi2_window_error');
	bi2_err.style.height = parseInt((aWindow.bi2_window_h_max*2)/5, 10) + 'px';
	bi2_err.style.display='block';
	htm = '<hr><div style=\"font-weight:bold; color:black; text-align:center;\" >Dane te należy przesłać do: '+getAuthor()+'<br />'; 
	htm += '<textarea style=\"margin: 5px;\" readonly=\"readonly\" onclick=\"javascript:select()\" cols=\"96\" rows=\"6\">';
	htm += err;
	htm += '</textarea></div>';
	bi2_err.innerHTML = htm;
}

bi2_code +="\n\
bi2_auto_odev = function(va, rab){\n\
	bi2_odev_type=0;\n\
	bi2_odev_var=va;\n\
	bi2_odev_count=0;\n\
	bi2_odev_rab=rab;\n\
	bi2_odev_stat=true;\n\
	zz = document.getElementById('current_task_box_text');\n\
	zz.innerHTML='Ubierasz się';\n\
	bi2_odev_window();\n\
};\n\
\n\
bi2_odev_add = function(va, irab){\n\
	if (va=='n')\n\
		{rrab = resultaty[irab];index=raboty[irab].rus_name;}\n\
	else if (va=='z')\n\
		{rrab = resultaty_z[irab];index=raboty[irab].rus_name+'_(ochrona)'}\n\
	else if (va=='r')\n\
		{rrab = resultaty_r[irab];index=raboty[irab].rus_name+'_(ruch)'}\n\
	if (!rrab||!rrab.items) return false;\n\
	for (ee = 0; ee < bi2_types.length; ++ee){\n\
		if (rrab.items[ee]&&rrab.items[ee].tid){\n\
			if (!bi2_odev_list[index]) bi2_odev_list[index]={};\n\
			bi2_odev_list[index][bi2_types[ee]] = rrab.items[ee].tid;\n\
		}\n\
	}\n\
	alert('Dopisano do listy: '+index+'!')\n\
	bi2_odev_save_list();\n\
	bi2_odev_spam_option();\n\
};\n\
\n\
bi2_odev_remove = function(va, irab){\n\
	if (va=='n')\n\
		{index=raboty[irab].rus_name;}\n\
	else if (va=='z')\n\
		{index=raboty[irab].rus_name+'_(ochrona)'}\n\
	else if (va=='r')\n\
		{index=raboty[irab].rus_name+'_(ruch)'}\n\
	if (bi2_odev_list[index]){\n\
		delete bi2_odev_list[index];\n\
		alert('Usunięto z listy: '+index+'!')\n\
	}\n\
	bi2_odev_save_list();\n\
	bi2_odev_spam_option();\n\
};\n\
\n\
bi2_odev_save_list = function(){\n\
	tempo = 'bi2_odev_list={';\n\
	for (ii in bi2_odev_list){\n\
		tempo+='\"'+ii+'\":';\n\
		tids = bi2_odev_list[ii];\n\
		tmp = '{';\n\
		for (ee = 0; ee < bi2_types.length; ++ee){\n\
			if (tids[bi2_types[ee]]){\n\
				tmp+=bi2_types[ee]+':'+tids[bi2_types[ee]]+', ';\n\
			}\n\
		}\n\
		tmp += '}';\n\
		tmp = tmp.replace(', }','}');\n\
		tempo+=tmp+', ';\n\
	};\n\
	tempo+='}';\n\
	tempo = tempo.replace(', }','}');\n\
	bi2_setValue(bi2_pre+'odev_list',tempo);\n\
};\n\
\n\
bi2_odev_spam_option = function(){\n\
	equip_select = document.getElementById('bi2_spam_select');\n\
	if (!equip_select) return;\n\
	equip_select.innerHTML='<option value=\"0\">Equipamento guardado...</option>';\n\
	arra={};\n\
	jj=0;\n\
	for (ii in bi2_odev_list) {arra[jj++]={ves:ii};}\n\
	qsort(arra,0,jj);\n\
	for (i=0;i<jj;++i){\n\
		ii=arra[i].ves;\n\
		t_op = document.createElement('option');\n\
		t_op.textContent = ii;\n\
		t_op.setAttribute('value',ii);\n\
		equip_select.appendChild(t_op);\n\
	}\n\
};\n\
\n\
bi2_odev_spam_go = function(){\n\
	equip_select = document.getElementById('bi2_spam_select');\n\
	name = equip_select.options[equip_select.selectedIndex].value;\n\
	irab=777;\n\
	resultaty[irab]={};\n\
	resultaty[irab].items={};\n\
	for (ee=0;ee<bi2_types.length;++ee){\n\
		resultaty[irab].items[ee] = {};\n\
		if (bi2_odev_list[name][bi2_types[ee]]){\n\
			resultaty[irab].items[ee].tid = bi2_odev_list[name][bi2_types[ee]];\n\
		}\n\
	}\n\
	bi2_auto_odev('n',irab);\n\
};\n\
\n\
bi2_odev_spam_rewrite = function(){\n\
	equip_select = document.getElementById('bi2_spam_select');\n\
	name = equip_select.options[equip_select.selectedIndex].value;\n\
	spam_value = document.getElementById('bi2_spam_new');\n\
	name2 = spam_value.value;\n\
	if (bi2_odev_list[name]){\n\
		bi2_odev_list[name2]=bi2_odev_list[name];\n\
		delete bi2_odev_list[name];\n\
		bi2_odev_save_list();\n\
		bi2_odev_spam_option();\n\
	}\n\
};\n\
\n\
bi2_odev_spam_del = function(){\n\
	equip_select = document.getElementById('bi2_spam_select');\n\
	name = equip_select.options[equip_select.selectedIndex].value;\n\
	if (bi2_odev_list[name]){\n\
		delete bi2_odev_list[name];\n\
		alert(name+' usunięto!');\n\
		bi2_odev_save_list();\n\
		bi2_odev_spam_option();\n\
	}\n\
};\n\
\n\
bi2_odev_spam_save = function(){\n\
	spam_value = document.getElementById('bi2_spam_new');\n\
	name = spam_value.value;\n\
	if (bi2_odev_list[name]){\n\
		gu_gu = confirm('Zastąp zestaw '+name+' ?');\n\
		if (!gu_gu) return;\n\
	}\n\
	if (!Wear||!Wear.wear) return;\n\
	bi2_odev_list[name]={};\n\
	for (ee=0;ee<bi2_types.length;++ee){\n\
		if (Wear.wear[bi2_types[ee]]){\n\
			bi2_odev_list[name][bi2_types[ee]] = Wear.wear[bi2_types[ee]].obj.item_id;\n\
		}\n\
	}\n\
	bi2_odev_save_list();\n\
	bi2_odev_spam_option();\n\
};\n\
\n\
bi2_odev_spam = function(){\n\
	if (!bi2_odevalo4ka) return;\n\
	wear_div = document.getElementById('window_inventory_content');\n\
	if (!wear_div) {setTimeout(bi2_odev_spam,2000);return}\n\
	ww=wear_div.getElementById('wear');\n\
	if (!ww) {setTimeout(bi2_odev_spam,2000);return}\n\
	if (document.getElementById('bi2_wear_spam2')) {setTimeout(bi2_odev_spam,5000);return};\n\
	reopen = document.getElementById('bi2_wear_spam') ? true : false;\n\
	if (!reopen){\n\
		var wear_spam = document.createElement('div');\n\
		wear_spam.setAttribute('id', 'bi2_wear_spam');\n\
		wear_spam.setAttribute('style', 'position: absolute; top: 5px; left: 20px; padding: 3px; margin: 0px;');\n\
		wear_div.parentNode.insertBefore(wear_spam,wear_div);\n\
		var store_set_link = document.createElement('a');\n\
		store_set_link.setAttribute('href', '#');\n\
		store_set_link.setAttribute('title', 'Zapisz aktualny zestaw wyposarzenia');\n\
		store_set_link.setAttribute('onclick', 'bi2_odev_spam_save(); return false;');\n\
		store_set_link.textContent = 'Adicionar à lista';\n\
		wear_spam.appendChild(store_set_link);\n\
		var store_set_value = document.createElement('input');\n\
		store_set_value.setAttribute('id','bi2_spam_new');\n\
		store_set_value.setAttribute('type','text');\n\
		store_set_value.setAttribute('size','28');\n\
		store_set_value.setAttribute('value','Nome do novo equipamento ...');\n\
		store_set_value.setAttribute('class','bi2_sel');\n\
		store_set_value.setAttribute('style', '-moz-user-select: text;');\n\
		store_set_value.setAttribute('onfocus', 'if (this.value==\"Nome do novo equipamento ...\") { this.value=\"\"; }');\n\
		store_set_value.setAttribute('onblur', 'if (this.value==\"\") { this.value=\"Nome do novo equipamento ...\"; }');\n\
		wear_spam.appendChild(store_set_value);\n\
	}\n\
	var wear_spam2 = document.createElement('div');\n\
	wear_spam2.setAttribute('id', 'bi2_wear_spam2');\n\
	wear_spam2.setAttribute('style', 'position: absolute; top: 5px; left: 10px; padding: 3px; margin: 0px;');\n\
	ww.parentNode.insertBefore(wear_spam2,ww);\n\
	var br_br = document.createElement('br');\n\
	var store_rewrite_link = document.createElement('a');\n\
	store_rewrite_link.setAttribute('href', '#');\n\
	store_rewrite_link.setAttribute('title', 'Renomear conjunto selecionado');\n\
	store_rewrite_link.setAttribute('onclick', 'bi2_odev_spam_rewrite(); return false;');\n\
	store_rewrite_link.textContent = 'Renomear';\n\
	wear_spam2.appendChild(store_rewrite_link);\n\
	var equip_select = document.createElement('select');\n\
	equip_select.setAttribute('id', 'bi2_spam_select');\n\
	equip_select.setAttribute('class','bi2_sel');\n\
	equip_select.setAttribute('style', 'width: 160px; max-width: 165px; margin: 0px 5px;');\n\
	wear_spam2.appendChild(equip_select);\n\
	bi2_odev_spam_option();\n\
	var delete_link = document.createElement('a');\n\
	delete_link.setAttribute('href', '#');\n\
	delete_link.setAttribute('title', 'Usuń wybrany zestaw');\n\
	delete_link.setAttribute('style', 'margin-right: 7px');\n\
	delete_link.setAttribute('onclick', 'confirm (\"Usunąć zestaw?\")?bi2_odev_spam_del():void(0); return false;');\n\
	delete_link.textContent = '×';\n\
	wear_spam2.appendChild(delete_link);\n\
	var equip_link = document.createElement('a');\n\
	equip_link.setAttribute('href', '#');\n\
	equip_link.setAttribute('id', 'equip_link');\n\
	equip_link.setAttribute('onclick', 'bi2_odev_spam_go(); return false;');\n\
	equip_link.setAttribute('title', 'Ubieranie wybranego zestawu');\n\
	equip_link.textContent = 'Inserir';\n\
	wear_spam2.appendChild(equip_link);\n\
	setTimeout(bi2_odev_spam,5000);\n\
};\n\
\n\
\
bi2_odev_window = function(){\n\
	if (!AjaxWindow.windows['inventory']){\n\
		if (bi2_odev_count++==0){\n\
			AjaxWindow.show('inventory');\n\
			setTimeout(bi2_odev_window, bi2_odev_time);\n\
			return;\n\
		}\n\
		else{\n\
			if(bi2_odev_count<bi2_odev_rep*5){\n\
				setTimeout(bi2_odev_window, bi2_odev_time);\n\
				return;\n\
			}\n\
		}\n\
	}\n\
	else{\n\
		if (!AjaxWindow.windows['inventory'].isReady){\n\
			if(bi2_odev_count++<bi2_odev_rep*5){\n\
				setTimeout(bi2_odev_window, bi2_odev_time);\n\
				return;\n\
			}\n\
		}\n\
	}\n\
	bi2_odev_count=0;\n\
	bi2_odevalka();\n\
};\n\
\n\
bi2_odev_zapusk = function(){\n\
	bi2_odev_type++;bi2_odev_count=0;\n\
	bi2_odevalka();\n\
\n\
};\n\
\n\
bi2_odev_control = function(typ, id){\n\
	zz = Wear.wear[bi2_types[bi2_odev_type]];\n\
	if (zz&&(zz.obj.item_id!=bi2_odev_item)){\n\
		if(bi2_odev_count++ <= bi2_odev_rep){\n\
			setTimeout(bi2_odev_control,bi2_odev_time);\n\
			return;\n\
		}\n\
		else{\n\
			bi2_odev_stat=false;\n\
		}\n\
	}\n\
	bi2_odev_zapusk();\n\
};\n\
\n\
bi2_odevalka = function(){\n\
	ee = bi2_odev_type;\n\
	irab=bi2_odev_rab;\n\
	if (ee >= bi2_types.length){\n\
		if (bi2_odev_stat) {document.getElementById('current_task_box_text').innerHTML='<a href=\"javascript:WMap.scroll_map_to_char()\">Jesteś ubrany!</a>'}\n\
		else {document.getElementById('current_task_box_text').innerHTML='<a href=\"javascript:WMap.scroll_map_to_char()\">Ups! Jestem półnagi</a>'}\n\
		return;\
	}\n\
	if (bi2_odev_var=='n')\n\
		sid = resultaty[irab].items[ee].tid;\n\
	else if (bi2_odev_var=='z')\n\
		sid = resultaty_z[irab].items[ee].tid;\n\
	else if (bi2_odev_var=='r')\n\
		sid = resultaty_r[irab].items[ee].tid;\n\
	if (sid){\n\
		if (Wear.wear[bi2_types[ee]]&&(Wear.wear[bi2_types[ee]].obj.item_id==sid)){\n\
			bi2_odev_zapusk();\n\
			return;\n\
		}\n\
		var inv = Bag.getInstance().items;\n\
		for (vv in inv){\n\
			if (inv[vv].obj.item_id==sid){\n\
				Bag.getInstance().carry(vv);\n\
				bi2_odev_item=sid;\n\
				bi2_odev_control();\n\
				return;\n\
			}\n\
		}\n\
		bi2_odev_zapusk();return;\n\
	}\n\
	else{\n\
		bi2_odev_zapusk();\n\
		return;\n\
	}\n\
\n\
};\n\
";


aWindow.bi2_setValue = function(key,value) {
//	window.setTimeout(GM_setValue, 1, key, value);
	window.setTimeout(function() {GM_setValue(key,value)}, 0);
};
// Work arounds to be able to use the GM_getValue functions in the normal code. Note that this function is 'asynchronous',
//  so any following code has to be called with a delay, to have AEG.equipItems set.
aWindow.bi2_getValue = function(key) {
	window.setTimeout(function() {	aWindow.bi2_abyrvalg = GM_getValue(key);}, 1 );
};


bi2_code +="\n\
bi2_worker = function(schet){\n\
	for (vv in Bag.getInstance().items){\n\
		bi2_worker2(schet);\n\
		return;\n\
	}\n\
	if (!bi2_count_inv) AjaxWindow.show('inventory');\n\
	if (++bi2_count_inv < 15){\n\
		if (schet) {setTimeout(bi2_worker4,1000)}else{setTimeout(bi2_worker3,1000)}} \n\
	else {bi2_count_inv=0;bi2_worker2(schet)}\n\
}\n\
;";

bi2_code +="\n\
bi2_worker3 = function(){\n\
	for (vv in Bag.getInstance().items){\n\
		bi2_worker2(false);\n\
		return;\n\
	}\n\
	if (!bi2_count_inv) AjaxWindow.show('inventory');\n\
	if (++bi2_count_inv < 15){\n\
		setTimeout(bi2_worker3,1000)} \n\
	else {bi2_count_inv=0;bi2_worker2(false)}\n\
}\n\
;";

bi2_code +="\n\
bi2_worker4 = function(){\n\
	for (vv in Bag.getInstance().items){\n\
		bi2_worker2(true);\n\
		return;\n\
	}\n\
	if (!bi2_count_inv) AjaxWindow.show('inventory');\n\
	if (++bi2_count_inv < 15){\n\
		setTimeout(bi2_worker4,1000)} \n\
	else {bi2_count_inv=0;bi2_worker2(true)}\n\
}\n\
;";

aWindow.bi2_worker2 = function(schet){
	aWindow.bi2_process=true;
	aWindow.resultaty=[];
	aWindow.resultaty_z=[];
	aWindow.resultaty_r=[];
	aWindow.zaschita=null;
	aWindow.ezda = false;
	aWindow.rabnavyki=[];
	aWindow.rabnavyki_z=[];
	aWindow.bi2_khochuka = [];
	aWindow.pers = aWindow.Character;

	vse_vse = document.getElementById('bi2_skol_rabot_v').checked;
	vse_rab = document.getElementById('bi2_skol_rabot_r').checked;
	nesk_rab = document.getElementById('bi2_skol_rabot_n').checked;
	skil_rab = document.getElementById('bi2_skol_rabot_s').checked;
	item_rab = document.getElementById('bi2_skol_rabot_i').checked;
	aWindow.bi2_vse_raboty = vse_vse||vse_rab;
	vyb_rab = document.getElementById('bi2_rabota');
	aWindow.porabotaj=null;
	aWindow.porabotaj=[];
	if (vse_vse){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<=111))
				aWindow.porabotaj[r]=true;
		}
	}
	else if (vse_rab){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<100))
				aWindow.porabotaj[r]=true;
		}
	}
	else if (skil_rab){
		ns = document.getElementById('bi2_rabota20');
		var ss='';
		for (s in ns.options){
			if (ns.options[s].selected)
				if (ns.options[s].value > 0)
					ss=ns.options[s].value-1;
		}
		ss = aWindow.bi2_vse_navyki[ss];
		for (r in aWindow.raboty){
			if ((r>0)&&(r<100)){
				for (jj in aWindow.raboty[r].navyki)
					if (ss == jj)
						aWindow.porabotaj[r]=true;
			}
		}
	}
	else if (item_rab){
		is = document.getElementById('bi2_rabota99');
		var ii=0;
		for (i in is.options)
			if (is.options[i].selected)
				if (is.options[i].value > 0){
					ii=is.options[i].value;
				}
		for (r in aWindow.raboty){
			if ((r>0)&&(r<100)){
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
	min_hp=parseInt(document.getElementById('bi2_fort_hp').value,10);
	aWindow.bi2_zdorov = (min_hp-100-(aWindow.pers.level-1)*aWindow.pers.lifePointPerHealthSkill)/(aWindow.pers.lifePointPerHealthSkill+aWindow.pers.lifePointPerHealthSkillBonus);
	test_vesch = document.getElementById('bi2_khochuka').checked;
	if (test_vesch){
		vyb_vesch = document.getElementById('bi2_dobavim_veschi');
		for (v in vyb_vesch.options){
			if (vyb_vesch.options[v].selected){
				if (vyb_vesch.options[v].value > 0){
				aWindow.bi2_khochuka[vyb_vesch.options[v].value] = true;
				}
			}
		}
	}
	aWindow.bi2_khlam = document.getElementById('bi2_khlam').checked;
	iz_magazinov = document.getElementById('bi2_pokupka').checked;
	test_svoi_magaziny = document.getElementById('bi2_smo_mag').checked;
	vse_veschi= document.getElementById('bi2_vse_vse').checked;
	aWindow.bablo = parseInt(document.getElementById('bi2_bablo').value,10);
	aWindow.bi2_millioner = document.getElementById('bi2_milion').checked;
	if (aWindow.bi2_millioner)
	    aWindow.bablo=1000000;
	plus_level = parseInt(document.getElementById('bi2_uroven').value,10);
	aWindow.ezda = document.getElementById('bi2_skorost').checked
	s_zaschitoj=document.getElementById('bi2_zaschita').checked;
	e_nov_rabota=document.getElementById('bi2_navyki').checked;
	nov_index=aWindow.raboty.length;
	if (e_nov_rabota){
		nr_malus = parseInt(document.getElementById('bi2_malus').value,10);
		nov_rabota={};
		nr_rabota_res=null;
		
		nvn_build=parseFloat(document.getElementById('bi2_build').value);
		nvn_punch=parseFloat(document.getElementById('bi2_punch').value);
		nvn_tough=parseFloat(document.getElementById('bi2_tough').value);
		nvn_endurance=parseFloat(document.getElementById('bi2_endurance').value);
		nvn_health=parseFloat(document.getElementById('bi2_health').value);
		nvn_ride=parseFloat(document.getElementById('bi2_ride').value);
		nvn_reflex=parseFloat(document.getElementById('bi2_reflex').value);
		nvn_dodge=parseFloat(document.getElementById('bi2_dodge').value);
		nvn_hide=parseFloat(document.getElementById('bi2_hide').value);
		nvn_swim=parseFloat(document.getElementById('bi2_swim').value);
		nvn_aim=parseFloat(document.getElementById('bi2_aim').value);
		nvn_shot=parseFloat(document.getElementById('bi2_shot').value);
		nvn_pitfall=parseFloat(document.getElementById('bi2_pitfall').value);
		nvn_finger_dexterity=parseFloat(document.getElementById('bi2_finger_dexterity').value);
		nvn_repair=parseFloat(document.getElementById('bi2_repair').value);
		nvn_leadership=parseFloat(document.getElementById('bi2_leadership').value);
		nvn_tactic=parseFloat(document.getElementById('bi2_tactic').value);
		nvn_trade=parseFloat(document.getElementById('bi2_trade').value);
		nvn_animal=parseFloat(document.getElementById('bi2_animali').value);
		nvn_appearance=parseFloat(document.getElementById('bi2_appearance').value);
		aWindow.raboty[nov_index] = {rus_name:'Konstruktor', name:'constructor', malus:nr_malus, navyki:{build:nvn_build, punch:nvn_punch, tough:nvn_tough, endurance:nvn_endurance, health:nvn_health, ride:nvn_ride, reflex:nvn_reflex, dodge:nvn_dodge, hide:nvn_hide, swim:nvn_swim, aim:nvn_aim, shot:nvn_shot, pitfall:nvn_pitfall, finger_dexterity:nvn_finger_dexterity, repair:nvn_repair, leadership:nvn_leadership, tactic:nvn_tactic, trade:nvn_trade, animal:nvn_animal, appearance:nvn_appearance}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, producty:null}};
	}
	if (s_zaschitoj){
		aWindow.zaschita=null;
		aWindow.zaschita={};
		aWindow.zaschita.to = parseInt(document.getElementById('bi2_zaschitato').value,10);
		if (document.getElementById('bi2_zaschita_vm').checked){
			aWindow.zaschita.navyki={punch:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('bi2_zaschita_vr').checked){
			aWindow.zaschita.navyki={shot:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('bi2_zaschita_vd').checked){
			aWindow.zaschita.navyki={tough:0.5,health:1,reflex:0.5,dodge:1,tactic:1};
		}
		else if (document.getElementById('bi2_zaschita_vk').checked){
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

	sslot=document.getElementById('bi2_sloty').checked;
	if (sslot){
		aWindow.bi2_slots={};
		aWindow.bi2_slots.flag=true;
		aWindow.bi2_slots.head =document.getElementById('bi2_head').checked;
		aWindow.bi2_slots.body =document.getElementById('bi2_body').checked;
		aWindow.bi2_slots.foot =document.getElementById('bi2_foot').checked;
		aWindow.bi2_slots.neck =document.getElementById('bi2_neck').checked;
		aWindow.bi2_slots.right_arm =document.getElementById('bi2_right_arm').checked;
		aWindow.bi2_slots.left_arm =document.getElementById('bi2_left_arm').checked;
		aWindow.bi2_slots.yield =document.getElementById('bi2_yield').checked;
		aWindow.bi2_slots.animal =document.getElementById('bi2_animal').checked;
	}
	else{
		aWindow.bi2_slots=null;
	}
	//if (!aWindow.bi2_inv_imported){
	aWindow.bi2_iimport();
	if (!aWindow.bi2_inv_imported){
		new aWindow.HumanMessage('Najpierw należy zaimportować ekwipunek. Otworz ekwipunek i poczekaj aż sięzaładuje. <br />Po załadowaniu, można zamknąc lub zminimalizować okno ekwipunku.');
		aWindow.bi2_process=false;
		return;
	}
	//}
	if (test_svoi_magaziny){
		aWindow.bi2_mimport();
	}
	
	if (aWindow.bi2_inv_imported)
	{
		aWindow.bi2_podschet(vse_veschi, iz_magazinov, test_svoi_magaziny, plus_level, aWindow.pers);
	}
       
    if (aWindow.einfo!=''){
        aWindow.bi2_show_window();
        aWindow.bi2_error_window(aWindow.einfo+'\n'+aWindow.winfo);
    }
    else if (aWindow.winfo!=''){
        aWindow.bi2_show_window();
        aWindow.bi2_error_window(aWindow.winfo);
    }
    
    aWindow.all_def={navyki:{}};
	if (aWindow.zaschita){
		for (z in aWindow.zaschita.navyki) aWindow.all_def.navyki[z]=aWindow.zaschita.navyki[z];
	}
	else	aWindow.all_def.navyki = {aim:2,dodge:2,tactic:2,tough:1,reflex:1,health:1};
	if (schet){
	    aWindow.rekurs_time = 50000;
	    aWindow.rekurs_step = 0;
        aWindow.bi2_vybzap();
    }
    else{
        aWindow.bi2_vybvesch();
    }
}

bi2_code+="\n\
my_name_is = function (){\n\
	if (Character&&Character.name){\n\
		bi2_pre = location.host.substr(0,4)+Character.name;\n\
		bi2_getValue(bi2_pre+'odev_list');\n\
		setTimeout(function() {if (bi2_abyrvalg.indexOf('aWindow.')==0) {bi2_abyrvalg=bi2_abyrvalg.slice(8)};eval(bi2_abyrvalg)},500);\n\
	}\n\
	else{\n\
		setTimeout(my_name_is,500);\n\
	}\n\
};\n\
";
bi2_code+="\n\
bi2_map_load = function(){\n\
	var x = WMap.mapX;\n\
	var y = WMap.mapY;\n\
	WMap.mapData.checkReload(x-50,y-50,100,100);\n\
};\n\
";

aWindow.bi2_simselect='<select class=\"bi2_sel\" id=\"bi2_rabota\" size=\"1\" onchange=\"javascript:$(\'bi2_skol_rabot_o\').checked=true;\">';
aWindow.bi2_mulselect='<select title=\"Wybór kilku robót &mdash; zaznaczasz z wciśniętym klawiszem Ctrl\" class=\"bi2_sel\" multiple=\"multiple\" id=\"bi2_rabota\" size=\"8\" onchange=\"javascript:$(\'bi2_skol_rabot_n\').checked=true;\">';
aWindow.bi2_conselect='\n\
<option value=\"0\">	Wybierz co chcesz robić:	</option>\n\
<option value=\"43\">	Budowa stacji kolejowej	</option>\n\
<option value=\"47\">	Budowa mostów	</option>\n\
<option value=\"53\">	Budowa posiadłości	</option>\n\
<option value=\"84\">	Budowa Rancza	</option>\n\
<option value=\"49\">	Budowa trumien	</option>\n\
<option value=\"28\">	Budowa urządzeń nawadniających	</option>\n\
<option value=\"44\">	Budowa wiatraków	</option>\n\
<option value=\"31\">	Burzenie tamy	</option>\n\
<option value=\"93\">	Czyszczenie butów	</option>\n\
<option value=\"41\">	Drukowanie gazet	</option>\n\
<option value=\"45\">	Eksploracja kontynentu	</option>\n\
<option value=\"17\">	Garbowanie	</option>\n\
<option value=\"90\">	Gaszenie pożaru	</option>\n\
<option value=\"54\">	Handlowanie z Indianami	</option>\n\
<option value=\"36\">	Handel	</option>\n\
<option value=\"22\">	Hodowla krów	</option>\n\
<option value=\"25\">	Kamieniołom	</option>\n\
<option value=\"55\">	Karczowanie lasu	</option>\n\
<option value=\"19\">	Kopanie grobów	</option>\n\
<option value=\"38\">	Kopanie studni	</option>\n\
<option value=\"12\">	Koszenie pastwiska	</option>\n\
<option value=\"60\">	Kradzież koni	</option>\n\
<option value=\"48\">	Łapanie koni	</option>\n\
<option value=\"75\">	Łowca nagród	</option>\n\
<option value=\"13\">	Mielenie zboża	</option>\n\
<option value=\"62\">	Misjonarze	</option>\n\
<option value=\"73\">	Napad	</option>\n\
<option value=\"77\">	Napad na pociąg	</option>\n\
<option value=\"74\">	Napad na powóz pocztowy	</option>\n\
<option value=\"34\">	Naprawa wozów osadników	</option>\n\
<option value=\"23\">	Naprawianie płotów	</option>\n\
<option value=\"16\">	Obserwacja fortecy	</option>\n\
<option value=\"57\">	Ochrona powozu pocztowego	</option>\n\
<option value=\"59\">	Ochrona wozu osadników	</option>\n\
<option value=\"70\">	Okradanie ludzi	</option>\n\
<option value=\"1\">	Pilnowanie świń	</option>\n\
<option value=\"82\">	Pilotowanie Parowców Kołowych	</option>\n\
<option value=\"65\">	Plądrowanie zwłok	</option>\n\
<option value=\"88\">	Podkuwanie koni	</option>\n\
<option value=\"52\">	Polowanie na bizony	</option>\n\
<option value=\"39\">	Polowanie na bobry	</option>\n\
<option value=\"66\">	Polowanie na Grizzly	</option>\n\
<option value=\"20\">	Polowanie na indyki	</option>\n\
<option value=\"51\">	Polowanie na kojoty	</option>\n\
<option value=\"58\">	Polowanie na wilki	</option>\n\
<option value=\"63\">	Pony-Express	</option>\n\
<option value=\"32\">	Poszukiwanie kamieni szlachetnych	</option>\n\
<option value=\"68\">	Poszukiwanie skarbu	</option>\n\
<option value=\"42\">	Połów ryb	</option>\n\
<option value=\"79\">	Pracuj jako konował	</option>\n\
<option value=\"71\">	Pracuj jako żołdak	</option>\n\
<option value=\"83\">	Przemyt	</option>\n\
<option value=\"2\">	Przepędzanie ptaków z pola	</option>\n\
<option value=\"80\">	Rokowania pokojowe	</option>\n\
<option value=\"21\">	Rozkładanie torów	</option>\n\
<option value=\"3\">	Rozwieszanie plakatów	</option>\n\
<option value=\"69\">	Służba w armii	</option>\n\
<option value=\"46\">	Spław drewna	</option>\n\
<option value=\"64\">	Sprzedaż broni Indianom	</option>\n\
<option value=\"11\">	Sprzedaż gazet	</option>\n\
<option value=\"92\">	Sprzątanie stajni	</option>\n\
<option value=\"37\">	Stawianie masztów telegraficznych	</option>\n\
<option value=\"61\">	Strażnik więzienia	</option>\n\
<option value=\"72\">	Ściganie bandytów	</option>\n\
<option value=\"24\">	Tartak	</option>\n\
<option value=\"76\">	Transport więźniów	</option>\n\
<option value=\"50\">	Transportowanie amunicji	</option>\n\
<option value=\"35\">	Ujeżdżanie koni	</option>\n\
<option value=\"33\">	Ustanowienie prawa własności	</option>\n\
<option value=\"7\">	Wędkowanie	</option>\n\
<option value=\"78\">	Włamanie	</option>\n\
<option value=\"27\">	Wycinka drzew	</option>\n\
<option value=\"67\">	Wydobycie ropy	</option>\n\
<option value=\"56\">	Wydobycie srebra	</option>\n\
<option value=\"40\">	Wydobycie węgla	</option>\n\
<option value=\"18\">	Wydobycie złota	</option>\n\
<option value=\"85\">	Wydobycie żelaza	</option>\n\
<option value=\"10\">	Wypasanie owiec	</option>\n\
<option value=\"26\">	Wyrównywanie koryta rzeki	</option>\n\
<option value=\"30\">	Zakładanie ogrodzenia z drutu kolczastego	</option>\n\
<option value=\"86\">	Zbieranie Agawy	</option>\n\
<option value=\"15\">	Zbieranie fasoli	</option>\n\
<option value=\"14\">	Zbieranie kukurydzy	</option>\n\
<option value=\"9\">	Zbieranie jagód	</option>\n\
<option value=\"91\">	Zbieranie pomarańczy	</option>\n\
<option value=\"87\">	Zbieranie pomidorów	</option>\n\
<option value=\"8\">	Zbieranie zboża	</option>\n\
<option value=\"5\">	Zbiór bawełny	</option>\n\
<option value=\"29\">	Znakowanie bydła	</option>\n\
<option value=\"4\">	Zrywanie liści tytoniu	</option>\n\
<option value=\"6\">	Zrywanie trzciny cukrowej	</option>\n\
<option>-------------------------------------------------------------------</option>\n\
<option value=\"101\" style=\"background-color:#FFEC8B\">	Rozbudowa miasta/fortu	</option>\n\
<option value=\"111\" style=\"background-color:#54FF9F\">	Przemieszczanie się	</option>\n\
<option value=\"150\" style=\"background-color:blue;color:white\">	Życie	</option>\n\
<option>-------------------------------------------------------------------</option>\n\
<option value=\"103\" style=\"background-color:red\">	Atak na fort	</option>\n\
<option value=\"104\" style=\"background-color:red\">	Atak na fort (celność)	</option>\n\
<option value=\"105\" style=\"background-color:red\">	Atak na fort (chowanie się)	</option>\n\
<option value=\"109\" style=\"background-color:red\">	Atak na fort (życie)	</option>\n\
<option value=\"106\" style=\"background-color:green;color:white\">	Obrona fortu	</option>\n\
<option value=\"107\" style=\"background-color:green;color:white\">	Obrona fortu (celność)	</option>\n\
<option value=\"108\" style=\"background-color:green;color:white\">	Obrona fortu (chowanie się)	</option>\n\
<option value=\"110\" style=\"background-color:green;color:white\">	Obrona fortu (życie)	</option>\n\
<option>-------------------------------------------------------------------</option>\n\
<option value=\"121\" style=\"background-color:brown;color:white\">	Strzelec vs strzelec	</option>\n\
<option value=\"125\" style=\"background-color:brown;color:white\">	Strzelec vs siepacz	</option>\n\
<option value=\"123\" style=\"background-color:brown;color:white\">	Strzelec vs ochrona przed siepaczem	</option>\n\
<option value=\"127\" style=\"background-color:brown;color:white\">	Strzelec vs ochrona przed strzelcem	</option>\n\
<option value=\"129\" style=\"background-color:brown;color:white\">	Strzelec vs cała obrona	</option>\n\
<option value=\"131\" style=\"background-color:brown;color:white\">	Strzelec vs strzelec + życie	</option>\n\
<option value=\"135\" style=\"background-color:brown;color:white\">	Strzelec vs siepacz + życie	</option>\n\
<option value=\"133\" style=\"background-color:brown;color:white\">	Strzelec vs ochrona przed siepaczem + życie	</option>\n\
<option value=\"137\" style=\"background-color:brown;color:white\">	Strzelec vs ochrona przed strzelcem + życie	</option>\n\
<option value=\"139\" style=\"background-color:brown;color:white\">	Strzelec vs cała obrona + życie	</option>\n\
<option value=\"122\" style=\"background-color:DarkViolet;color:white\">	Siepacz vs strzelec	</option>\n\
<option value=\"126\" style=\"background-color:DarkViolet;color:white\">	Siepacz vs siepacz	</option>\n\
<option value=\"124\" style=\"background-color:DarkViolet;color:white\">	Siepacz vs ochrona przed siepaczem	</option>\n\
<option value=\"128\" style=\"background-color:DarkViolet;color:white\">	Siepacz vs ochrona przed strzelcem	</option>\n\
<option value=\"130\" style=\"background-color:DarkViolet;color:white\">	Siepacz vs cała obrona	</option>\n\
<option value=\"132\" style=\"background-color:DarkViolet;color:white\">	Siepacz vs strzelec + życie	</option>\
<option value=\"136\" style=\"background-color:DarkViolet;color:white\">	Siepacz vs siepacz + życie	</option>\n\
<option value=\"134\" style=\"background-color:DarkViolet;color:white\">	Siepacz vs ochrona przed siepaczem + życie	</option>\n\
<option value=\"138\" style=\"background-color:DarkViolet;color:white\">	Siepacz vs ochrona przed strzelcem + życie	</option>\n\
<option value=\"140\" style=\"background-color:DarkViolet;color:white\">	Siepacz vs cała obrona + życie	</option>\n\
</select>\n\
';

aWindow.bi2_slot_selector = function(v_slot){
	document.getElementById('bi2_head').checked = (v_slot=='head');
	document.getElementById('bi2_body').checked = (v_slot=='body');
	document.getElementById('bi2_foot').checked = (v_slot=='foot');
	document.getElementById('bi2_neck').checked = (v_slot=='neck');
	document.getElementById('bi2_right_arm').checked = (v_slot=='right_arm');
	document.getElementById('bi2_left_arm').checked = (v_slot=='left_arm');
	document.getElementById('bi2_yield').checked = (v_slot=='yield');
	document.getElementById('bi2_animal').checked = (v_slot=='animal');
};

aWindow.bi2_ovselect = function(){
    vyb_vesch_options = document.getElementById('bi2_dobavim_veschi').options;
    for (v in vyb_vesch_options){
        vyb_vesch_options[v].selected = false;
    }
}

aWindow.bi2_show_shmot = function(irab){
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
    hti = '<table>';
    for (ii = 0; ii < vv.items.length; ++ii){
        sid = vv.items[ii].tid;
        if (sid){
            vesch = aWindow.items[sid];
            hti+='<tr><td><a class=\"tt2\" href=\"#\" ><span><strong>'+vesch.name+'</strong>';
            if (vesch.set.key){
                hti += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                hti += aWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                hti += aWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
            }
            hti += '</span>';
            hti+='<div class=\"bag_item\" ><img src=\"'+ vesch.image_mini +'\" /></div>';
            hti+='</a></td></tr>';
        }
    }
    hti += '</table>';

    bi2_shmot_old = document.getElementById('bi2_shmot');
    bi2_shmot = null;
    html2='';
    
    // podgląd listy przedmiotów
    if (!bi2_shmot){
		html2 += '<div id=\"bi2_shmo2\" style=\"width:' + 90 + 'px;\">\n';
        html2 += '<div style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html2 += '<span>';
		html2 += '<a href=\"javascript:bi2_close_shmot();\"' + aWindow.bi2_tlink + ' title=\"Zamknij\">&nbsp;*&nbsp;</a>&nbsp;';
		html2 += '</span>';
		html2 += '<span id=\"bi2_shmot_cap\">Schowek</span>';
		html2 += '</div>'
		html2 += '<div id=\"bi2_shmot_content\" style=\"background-color:#D3C5AD; border:1px solid #302010;\">';

        html2 += hti;
        html2 += '</div>'        		
        
		html2 += '</div>';
		bi2_shmot = document.createElement('div');
		bi2_shmot.id = 'bi2_shmot';
		bi2_shmot.innerHTML = html2;
		bi2_shmot.setAttribute('style', 'position: absolute; right: ' + 20 + 'px; top: ' + 10 + 'px; z-index:251');
	}
	if (bi2_shmot_old)
	    document.body.replaceChild(bi2_shmot, bi2_shmot_old);
	else
	    document.body.appendChild(bi2_shmot);
	bi2_shmot.style.display = 'block';

}

aWindow.bi2_show_window = function(){
    bi2_window = document.getElementById('bi2_window');
    html1='';
    
    if (!bi2_window){
		html1 += '<div id=\"bi2_win1\" style=\"width:' + aWindow.bi2_w1 + 'px; text-align:left;\">\n';
		html1 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
		html1 += '<tr>';
		html1 += '<td class=\"gran_vl\" />\n';
		html1 += '<td class=\"gran_v\" />\n';
		html1 += '<td class=\"gran_vp\" />\n';
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html1 += '<span>';
		html1 += '<a href=\"javascript:bi2_minimize_window();\"' + aWindow.bi2_tlink + ' title=\"Minimalizuj\">&nbsp;_&nbsp;</a>&nbsp;';
		html1 += '<a href=\"javascript:bi2_close_window();\"' + aWindow.bi2_tlink + ' title=\"Zamknij\">&nbsp;*&nbsp;</a>&nbsp;';
		html1 += '</span>';
		html1 += '<span id=\"bi2_window_cap\">Wyniki</span>';
		html1 += '</td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr id=\"bi2_window_content_row\">\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td id=\"bi2_window_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.bi2_w1 - 12) + 'px; padding-top:30px; \" >';
		html1 += '<div id=\"bi2_window_content\" style=\"overflow: auto; height: ' + (aWindow.bi2_window_h_max - 50) + 'px; padding-bottom:30px; \">';
		
		html1 += '</div><div id=\"bi2_window_error\" style=\"border: 2px; overflow: auto; display: none; \">';
		html1 += '</div>\n'
		html1 += '<div style=\"position:relative; margin:5px 20px; float:right; width:90%\" >\n';
		html1 += '<span style=\"float:left\">Uważasz że warto mi postawić piwo lub kawę, kliknij przycisk. </span>\n';
		html1 += '<form action=\"https://www.paypal.com/cgi-bin/webscr\" method=\"post\">\n';
		html1 += '<input type=\"hidden\" name=\"cmd\" value=\"_s-xclick\" />\n';
		html1 += '<input type=\"hidden\" name=\"hosted_button_id\" value=\"WTP9QLYFZPMU8\" />\n';
		html1 += '<input type=\"image\" src=\"https://www.paypal.com/pl_PL/PL/i/btn/btn_donate_SM.gif\" border=\"0\" name=\"submit\" alt=\"PayPal — Płać wygodnie i bezpiecznie\" />\n';
		html1 += '<img alt=\"\" border=\"0\" src=\"https://www.paypal.com/pl_PL/i/scr/pixel.gif\" width=\"1\" height=\"1\" />\n';
		html1 += '</form>\n';
		html1 += '</div></td><td class=\"gran_p\" />\n';
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_nl\" />\n';
		html1 += '<td class=\"gran_n\" >\n';
		html1 += '<td class=\"gran_np\" />\n'
		html1 += '</tr><tr></tbody>\n';
		html1 += '</table>\n';
		html1 += '</div>';
		bi2_window = document.createElement('div');
		bi2_window.id = 'bi2_window';
		bi2_window.innerHTML = html1;
		
		bi2_window.setAttribute('style', 'position: absolute; left: ' + aWindow.bi2_l1 + 'px; top: ' + aWindow.bi2_t1 + 'px; z-index:250');
		document.body.appendChild(bi2_window);
	}
	bi2_window.style.display = 'block';
	if (aWindow.bi2_window_flag2 == 0){
	    aWindow.bi2_minimize_window();
	}
}

aWindow.bi2_show_panel = function(){
	bi2_title = document.getElementById('bi2_title');
	html0 = '';
	
	if (!bi2_title) {
		html0 += '<div id=\"bi2_form0\" style=\"width:' + aWindow.bi2_w0 + 'px; text-align:left;\">\n';
		html0 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
		html0 += '<tr>';
		html0 += '<td class=\"gran_vl\" />\n';
		html0 += '<td class=\"gran_v\" />\n';
		html0 += '<td class=\"gran_vp\" />\n';
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html0 += '<span>';
		html0 += '<a href=\"javascript:bi2_minimize_title();\"' + aWindow.bi2_tlink + ' title=\"Minimalizuj\">&nbsp;_&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:bi2_stretch_title();\"' + aWindow.bi2_tlink + ' title=\"Powiększ\">&nbsp;^&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:bi2_close_title();\"' + aWindow.bi2_tlink + ' title=\"Zamknij\">&nbsp;*&nbsp;</a>&nbsp;';
		html0 += '</span>';
		html0 += '<span id=\"bi2_title_cap\" style=\"font-size:11px;\">Wyszukaj&nbsp;&laquo;najlepsze&raquo;&nbsp;przedmioty</span>';
		html0 += '<input type=\"button\" value=\"Seguinte\" style=\"float:right; font-weight:bold\" onclick=\"javascript:bi2_worker(true)\"/>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr id=\"bi2_title_content_row\">\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td id=\"bi2_title_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.bi2_w0 - 12) + 'px;\" >';
		html0 += '<div id=\"bi2_title_content\" style=\"overflow: auto; height: ' + aWindow.bi2_title_h_mid + 'px;\">';
		
		html0 += '\n\
<form id=\"bi2_form\">\n\
	<div id=\"bi2_vselect\">';
		html0 += aWindow.bi2_simselect;
		html0 += aWindow.bi2_conselect;
		
		html0 += '</div>\n\
	<div' + aWindow.bi2_vblock + '>\n\
	<div style=\"float:right;display:none\" >Punkty&nbsp;(fort)&nbsp;&nbsp;<input id=\"bi2_fort_hp\" name=\"bi2_fort_hp\ type=\"text\" value=\"0\" size=\"4\">&nbsp;</div>\n\
	<input type= \"button\" title=\"Pokazuje, nie więcej niż siedem elementów każdego typu (posiadanych w plecaku) o największych współczynnikach, z wyłączeniem zestawów (kompletów).\" value=\"Sujeitos a PP\" style=\"float:right\" onclick=\"javascript:bi2_worker(false)\"/>\n\
	<div style=\"float:right; clear:right; font-size: 11px\" >&nbsp;Autor:&nbsp;' + getAuthor() + '&nbsp;w:'+getMoCheckVersion()+'&nbsp;</div>\n\
	<input id=\"bi2_skol_rabot_v\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"v\" style=\"margin:auto 5px;\" />Todos\n\
	<input id=\"bi2_skol_rabot_r\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"r\" style=\"margin:auto 5px;\" />Todo&nbsp;trabalho<br />\n\
	<input id=\"bi2_skol_rabot_o\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"o\" checked=\"checked\" style=\"margin:auto 5px;\" onchange=\"javascript:bi2_vselect(false);void(0)\" />Um&nbsp;trabalho\n\
	<input id=\"bi2_skol_rabot_n\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"n\" style=\"margin:auto 5px;\" onchange=\"javascript:bi2_vselect(true);void(0)\" />Trabalho&nbsp;selecionado<br /><br />\n\
	<input id=\"bi2_skol_rabot_s\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"s\" style=\"margin:auto 5px;\" />Habilidade&nbsp;&nbsp;';

		html0 +='<select class=\"bi2_sel\" id=\"bi2_rabota20\" size=\"1\" onchange=\"javascript:$(\'bi2_skol_rabot_s\').checked=true;\">\n\
	<option value=\"0\">-</option>';
	for (ii=0;ii<aWindow.bi2_vse_navyki.length;++ii)
	{
		html0 += '<option value=\"'+(ii+1)+'\">	'+ aWindow.Character.skill_titles[aWindow.bi2_vse_navyki[ii]]+'</option>';
	};
		html0 += '\n\
	</select><br />\n\
	<input id=\"bi2_skol_rabot_i\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"i\" style\"margin:auto 5px;\" />Produkt&nbsp;&nbsp;';

	
		html0 +='\n\
	<select class=\"bi2_sel\" id=\"bi2_rabota99\" size=\"1\" onchange=\"javascript:$(\'bi2_skol_rabot_i\').checked=true;\">\n\
	<option value=\"0\">-</option>';
	var tmp=[];
	for (ii=700;ii<800;++ii){
		tmp[ii]={};
		tmp[ii].ves = aWindow.items[ii] ? aWindow.items[ii].name : '-';
		tmp[ii].id = ii;
	}
	for (ii=700;ii<800;++ii){
		if (tmp[ii].ves=='-'){
			tmp[ii].ves=aWindow.items[1708].name;
			tmp[ii].id=1708;
			break;
		}
	}
	aWindow.qsort(tmp,700,799);
	for (ii=700;ii<800;++ii)
	{
		if (tmp[ii].ves != '-')
			html0 += '<option value=\"'+tmp[ii].id+'\">	'+ tmp[ii].ves+'</option>';
	};

		html0 += '\n\
	</select><br />\n\
	\n\
	</div>\n\
	<!--<div style=\"text-align:left; font-weigth:normal; color:#b8a080; background-color:black; padding-left: 30px;\">Todo&nbsp;trabalho</div>-->\n\
		<span title=\"Depois de classificar todos os trabalhos, o script pode detectar coisas que não são usados e calcular o preço de venda destas coisas (nesta versão ainda está correndo mal.) Se você não tiver recursos suficientes, estas coisas podem ser vendidas com segurança.\"><input id=\"bi2_khlam\" type=\"checkbox\" style=\"margin:auto 24px auto 27px;\" />\n\
		Venda de equipamentos desnecessários<br /></span>\n\
	<!--<div style=\"text-align:left; font-weigth:normal; color:#b8a080; background-color:black; padding-left: 30px;\"><span id=\"bi2_sk_rabot\">Одна&nbsp;работа&nbsp;&nbsp;&nbsp;&nbsp;</span>\n\
	</div>-->\n\
		<span title=\"Além disso, a pesquisa é definir a velocidade máxima ea disponibilidade dos itens. Úteis para o envio de comprimento, logo em seguida vestindo coisas normais.\">\n\
		<input id=\"bi2_skorost\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />\n\
		Ver&nbsp;velocidade&nbsp;do&nbsp;trabalho?<br /></span>\n\
	<div' + aWindow.bi2_vblock + '>\n\
		<span id=\"sp_tst_st3456\" style=\"display:block; background-color:#CFB98E; width:100%\" title=\"Você gostaria de trabalhar, mas está faltando alguns pontos PP? O script irá ajudar você a escolher o equipamento certo.\">\n\
		<input id=\"bi2_pokupka\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" onchange=\"javascript:if (checked) {$(\'bi2_ukr_bablo\').style.display=\'block\'}else{$(\'bi2_ukr_bablo\').style.display=\'none\'};void(0)\" />&nbsp;Quer comprar o equipamento?<br /></span>\n\
		<div id=\"bi2_ukr_bablo\" style=\"display:none; background-color:#CFB98E;\">\n\
		<span title=\"Zaznaczenie tej opcji powoduje, że skrypt będzie poszukiwał ekwipunku tylko w sklepie, który jest w Twoim mieście. Wyłaczenie tej opcji, skrypt będzie szukał we wszystkich sklepach (ceny będą 4 x wyższe). Działa tylko jak należysz do jakiegoś miasta i była otwarta zawartość sklepu.\">\n\
		<input id=\"bi2_smo_mag\" type=\"checkbox\" style=\"margin:auto 25px auto 25px;\" >Tylko z &laquo;Twojego&raquo; sklepu.</span><br />\n\
		<span title=\"Podaj ile pieniędzy zamierzasz przeznaczyć na zakupy.\">\n\
		<input id=\"bi2_bablo\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />\n\
		&nbsp;Przeznaczone&nbsp;pieniądze&nbsp;na&nbsp;zakupy<br /></span>\n\
		<span title=\"Jesteś skłonny/-a wydać każde pieniądze na ulubioną pracę. ;) Skrypt pomoże znajeźć &laquo;najlepsze&raquo; przedmioty.\">\n\
		<input id=\"bi2_milion\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" />&nbsp;Pieniądze&nbsp;nie&nbsp;mają&nbsp;znaczenia <strong>:)</strong><br /></span>\n\
		</div>\n\
		<span title=\"Pesquisas dos itens que será melhor para o trabalho. Não importa se você tê-los ou não tê-los. O script irá procurar e fornecer as mais adequadas. \">\n\
		<input id=\"bi2_vse_vse\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" />&nbsp;Quer&nbsp;encontrar;melhor;&nbsp;objecto&nbsp;do&nbsp;trabalho?<br /></span>\n\
		<div' + aWindow.bi2_vblock + '>\n\
		<span style=\"display:block; background-color:#CFB98E;width:100%\" title=\"Aqui você pode selecionar alguns objetos (coisas) e ver o quanto e se ele será usado no trabalho.\">\n\
		<input id=\"bi2_khochuka\" type=\"checkbox\" style=\"margin:auto 23px auto 23px;\" onchange=\"javascript:if (checked) {$(\'bi2_ukr_khochuka\').style.display=\'block\'}else{$(\'bi2_ukr_khochuka\').style.display=\'none\';bi2_ovselect();};void(0)\" />Utilidade dos elementos em falta</span>\n\
		<div id=\"bi2_ukr_khochuka\" style=\"display:none; background-color:#CFB98E;\">\n\
		<select title=\"Wybieranie wielu obiektów &mdash; zaznaczamy z wciśniętym klawiszem Ctrl\" class=\"bi2_sel\" multiple=\"multiple\" id=\"bi2_dobavim_veschi\" size=\"10\">;';
		
    for (vv = 1; vv < 900; ++vv){
		styl='';
        if ((vv >= 100)&&(vv < 200)) continue;
        if ((vv >= 700)&&(vv < 800)) continue;
        if (vv == 1) {html0+='<optgroup title=\"Biała broń\" label=\"Biała broń\">'}
		if (vv >= 100 && vv <200) {styl='background-color:#FFCFCF'}
        if (vv == 200) {html0+='<optgroup title=\"Nakrycie głowy\" label=\"Nakrycie głowy\">'}
		if (vv >= 200 && vv <300) {styl='background-color:#FFCA6F'}
        if (vv == 300) {html0+='<optgroup title=\"Odzież\" label=\"Odzież\">'}
		if (vv >= 300 && vv <400) {styl='background-color:#91AF6'}
        if (vv == 400) {html0+='<optgroup title=\"Buty\" label=\"Buty\">'}
		if (vv >= 400 && vv <500) {styl='background-color:#BFBFBF'}
        if (vv == 500) {html0+='<optgroup title=\"Naszyjniki\" label=\"Naszyjniki\">'}
		if (vv >= 500 && vv <600) {styl='background-color:#FEFFBF'}
        if (vv == 600) {html0+='<optgroup title=\"Jazda konna\" label=\"Jazda konna\">'}
		if (vv >= 600 && vv <800) {styl='background-color:#AFDFA7'}
        if (vv == 800) {html0+='<optgroup title=\"Broń\" label=\"Broń\">'}
		if (vv >= 800 && vv <1000) {styl='background-color:#D4CFFF'}
        if (aWindow.items[vv]){
            html0 +='<option value=\"'+vv+'\" style=\"'+styl+'\">'+vv+' - '+aWindow.items[vv].name+'	</option>';
        }
    }
    html0 += '</optgroup><optgroup title=\"Pozostaje zestawy\" label=\"Pozostaje zestawy\">';
	styl='background-color:#CFB5CE';
    // добавим сетовых ручками    #CFB5CE   #E8DAB3
    html0 += '<option value=\"792\" style=\"'+styl+'\">'+vv+' - '+aWindow.items[792].name+'	</option>';
    html0 += '<option value=\"794\" style=\"'+styl+'\">'+vv+' - '+aWindow.items[794].name+'	</option>';
    html0 += '<option value=\"797\" style=\"'+styl+'\">'+vv+' - '+aWindow.items[797].name+'	</option>';
    html0 += '<option value=\"768\" style=\"'+styl+'\">'+vv+' - '+aWindow.items[768].name+'	</option>';
    html0 += '<option value=\"723\" style=\"'+styl+'\">'+vv+' - '+aWindow.items[723].name+'	</option>';
    html0 += '<option value=\"1715\" style=\"'+styl+'\">'+vv+' - '+aWindow.items[1715].name+'	</option>';
    html0 += '<option value=\"854\" style=\"'+styl+'\">'+vv+' - '+aWindow.items[854].name+'	</option>';
    html0 += '<option value=\"1772\" style=\"'+styl+'\">'+vv+' - '+aWindow.items[1772].name+'	</option>';
    html0 += '<option value=\"1762\" style=\"'+styl+'\">'+vv+' - '+aWindow.items[1762].name+'	</option>';
    html0 += '</optgroup>';
html0 += '</select></div></div>\n\
		<span title=\"Selecionar esta opção e digite os números 1-5 Significa que você pode verificar os itens que você pode usar para 1-5 níveis. Ela não altera as características ou umiejek só permite que a lista pressuposto, que no nível atual Você não pode fazer uso.\"><input id=\"bi2_uroven\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if(isNaN(value))value=0;void(0)\" />\n\
		&nbsp;&laquo;Nivel&raquo;&nbsp;Superior<br /></span>\n\
	<div' +
		aWindow.bi2_vblock +
		'>\n\
		<span title=\"Marque esta caixa, o script não faz o equipamento ao máximo PP. Apenas estabelece um mínimo sobre o PP eo resto das habilidades defensivas.\"><input id=\"bi2_zaschita\" type=\"checkbox\" style=\"margin:auto 21px auto 23px;\" onchange=\"javascript:if (checked) {$(\'bi2_ukr_zaschita\').style.display=\'block\'}else{$(\'bi2_ukr_zaschita\').style.display=\'none\'};void(0)\" />&nbsp;Defesa&nbsp;contra&nbsp;opressor<br /></span>\n\
	<div id=\"bi2_ukr_zaschita\" style=\"display:none;\">\n\
		<span title=\"Umiejętności brane pod uwagę: siła udarzenia, celowanie, unik, taktyka, życie (1/2 refleks i odporność)\"><input id=\"bi2_zaschita_vm\" name=\"bi2_zaschita_v\" type=\"radio\" value=\"m\" style\"margin:auto 5px;\" />&nbsp;Siepacz&nbsp;</span>\n\
		<span title=\"Umiejętności brane pod uwagę: strzelanie, celowanie, unik, taktyka, życie (1/2 refleks i odporność)\"><input id=\"bi2_zaschita_vr\" name=\"bi2_zaschita_v\" type=\"radio\" value=\"r\" style\"margin:auto 5px;\" />&nbsp;Strzelec&nbsp;</span>\n\
		<span title=\"Umiejętności brane pod uwagę: unik, taktyka, życie (1/2 refleks i odporność)\"><input id=\"bi2_zaschita_vd\" name=\"bi2_zaschita_v\" type=\"radio\" checked=\"checked\" value=\"d\" style\"margin:auto 5px;\" />&nbsp;&laquo;Każdy&nbsp;napastnik&raquo;<br /></span>\n\
		<span title=\"Umiejętności brane pod uwagę: Zaznacz opcję (Ustalanie dowolnych umiejętności), wszystkie umiejętności wybrane poniżej, zostaną uwzględnione\"><input id=\"bi2_zaschita_vk\" name=\"bi2_zaschita_v\" type=\"radio\" value=\"k\" style\"margin:auto 5px;\" />&nbsp;Projektant&nbsp;umiejętności<br /></span>\n\
		<span title=\"Dla wybranej pracy, PP(Punkty Pracy) zostaną przydzielone o wybraną minimalną wartość. Cała &laquo;nadwyżka&raquo; zoastanie przydzielona na ewentualny pojedynek.\"><input id=\"bi2_zaschitato\" type=\"text\" value=\"' +
		aWindow.bi2_zaschitato +
		'\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />&nbsp;Minimalne&nbsp;PP&nbsp;(punkty pracy)&nbsp;<br /></span>\n\
		</div></div>\n\
		\n\
	<div' +
		aWindow.bi2_vblock +
		'>\n\
		<span title=\"Aqui você pode escolher os tipos de (parte do corpo), a ser recolhida. O script não irá recolher esses tipos de itens (vestir-se), que foram marcados.Habilidades consideradas: Select (Determinação de qualquer habilidade), mas todos os escolhida abaixo será incluído\"><input id=\"bi2_sloty\" value=\"bi2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'bi2_sloty_content\').style.display=\'block\'}else{$(\'bi2_sloty_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 23px auto 23px;\" />Tipos de equipamento:<br /></span>\n\
		<div id=\"bi2_sloty_content\" style=\"display:none; \">\n\
	<div' +
		aWindow.bi2_vblock +
		'>\n\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'head\');void(0);\"/>\n\
		<input id=\"bi2_head\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Nakrycia głowy<br />\n\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'neck\');void(0);\"/>\n\
		<input id=\"bi2_neck\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Naszyjniki<br />\n\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'body\');void(0);\"/>\n\
		<input id=\"bi2_body\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Odzież<br />\n\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'right_arm\');void(0);\"/>\n\
		<input id=\"bi2_right_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Broń pojedynkowa<br />\n\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'left_arm\');void(0);\"/>\n\
		<input id=\"bi2_left_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Broń fortowa<br />\n\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'foot\');void(0);\"/>\n\
		<input id=\"bi2_foot\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Obuwie<br />\n\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'animal\');void(0);\"/>\n\
		<input id=\"bi2_animal\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Jazda konna<br />\n\
		<input name=\"bi2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:bi2_slot_selector(\'yield\');void(0);\"/>\n\
		<input id=\"bi2_yield\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Total<br />\n\
		</div></div></div>\n\
	<div' +
		aWindow.bi2_vblock +
		'>\n\
		<span title=\"/* przetłumaczyć */ Здесь можно составить произвольную &laquo;работу&raquo; задав сложность работы, и любые необходимые навыки с &laquo;силой&raquo; от 0 до 5 (можно применять дробные числа вида 1.375).\n Используя ограничение по слотам и выбранный навык с весом 1 можно подбирать вещи для квестов вида {меткость = 27 с бонусом, приходи в чёрных лохмотьях и серых ботинках}.\n Либо если задействована защита и соответствующий выбор конструктора - данные навыки рассматриваются как боевые и заменяют предустановки"><input id=\"bi2_navyki\" value=\"bi2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'bi2_navyki_content\').style.display=\'block\'}else{$(\'bi2_navyki_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 21px auto 23px;\" />\n\
		Determina&nbsp;qualquer&nbsp;habilidade<br /></span>\n\
		<div id=\"bi2_navyki_content\" style=\"display:none; \">\n\
	<div' +
		aWindow.bi2_vblock +
		'>\n\
		<input id=\"bi2_malus\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value< -32767)||(value>32767)||isNaN(value))value=0;void(0)\" />&nbsp;&laquo;Trudność&raquo;<br />\n\
	<div style=\"color:red; font-weight:bold;\">\n\
		<input id=\"bi2_build\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Budowanie<br />\n\
		<input id=\"bi2_punch\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Siła&nbsp;uderzenia<br />\n\
		<input id=\"bi2_tough\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Odporność<br />\n\
		<input id=\"bi2_endurance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Wytrzymałość<br />\n\
		<input id=\"bi2_health\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Punkty&nbsp;życia<br />\
	</div><div style=\"color:green; font-weight:bold;\">\n\
		<input id=\"bi2_ride\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Jazda&nbsp;konna<br />\n\
		<input id=\"bi2_reflex\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Reflaks<br />\n\
		<input id=\"bi2_dodge\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Unik<br />\n\
		<input id=\"bi2_hide\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Chowanie&nbsp;się<br />\n\
		<input id=\"bi2_swim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Pływanie<br />\
	</div><div style=\"color:blue; font-weight:bold;\">\n\
		<input id=\"bi2_aim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Celowanie<br />\n\
		<input id=\"bi2_shot\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Strzelanie<br />\n\
		<input id=\"bi2_pitfall\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Zakładanie&nbsp;pułapek<br />\n\
		<input id=\"bi2_finger_dexterity\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Sprawność&nbsp;manualna<br />\n\
		<input id=\"bi2_repair\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Naprawa<br />\n\
	</div><div style=\"color:#960; font-weight:bold;\">\n\
		<input id=\"bi2_leadership\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Dowodzenie<br />\n\
		<input id=\"bi2_tactic\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Taktyka<br />\n\
		<input id=\"bi2_trade\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Handel<br />\n\
		<input id=\"bi2_animali\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Obchodzenie&nbsp;się&nbsp;ze&nbsp;zwierętami<br />\n\
		<input id=\"bi2_appearance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Zaskoczenie<br />\n\
	</div>\n\
		</div></div></div>\n\
	</div>\n\
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
		
		bi2_title = document.createElement('div');
		bi2_title.id = 'bi2_title';
		bi2_title.innerHTML = html0;
		
		bi2_title.setAttribute('style', 'position: fixed; left: ' + aWindow.bi2_l0 + 'px; top: ' + aWindow.bi2_t0 + 'px; z-index:202');
		document.body.appendChild(bi2_title);
		}
	bi2_title.style.display = 'block';
		
};

bi2_code+="\
my_name_is();\
bi2_odev_spam();\n\
";



var bi2_body, bi2_script, bi2_style, bi2_head; 
bi2_body = document.getElementsByTagName('body')[0];

bi2_script = document.createElement('script');
bi2_script.type = 'text/javascript';
bi2_script.innerHTML = bi2_code;
bi2_body.appendChild(bi2_script);

bi2_stext=''
bi2_stext+='.tt:hover{\n';
bi2_stext+='position:relative;\n';
bi2_stext+='z-index:23;\n';
bi2_stext+='}\n';
bi2_stext+='.tt span{\n';
bi2_stext+='display:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt:hover span{\n';
bi2_stext+='display:block;\n';
bi2_stext+='position:absolute;\n';
bi2_stext+='top:10px;\n';
bi2_stext+='left:15px;\n';
bi2_stext+='background:#b6ab92;\n';
bi2_stext+='border:2px solid #000;\n';
bi2_stext+='color:#000;\n';
bi2_stext+='opacity:0.8;\n';
bi2_stext+='z-index:20;\n';
bi2_stext+='padding:5px;\n';
bi2_stext+='font-size:12px;\n';
bi2_stext+='cursor:pointer;\n';
bi2_stext+='text-decoration:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt2:hover{\n';
bi2_stext+='position:relative;\n';
bi2_stext+='z-index:23;\n';
bi2_stext+='}\n';
bi2_stext+='.tt2 span{\n';
bi2_stext+='display:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt2:hover span{\n';
bi2_stext+='display:block;\n';
bi2_stext+='position:absolute;\n';
bi2_stext+='top:40px;\n';
bi2_stext+='left:-70px;\n';
bi2_stext+='background:#b6ab92;\n';
bi2_stext+='border:2px solid #000;\n';
bi2_stext+='color:#000;\n';
bi2_stext+='opacity:0.8;\n';
bi2_stext+='z-index:21;\n';
bi2_stext+='padding:5px;\n';
bi2_stext+='font-size:12px;\n';
bi2_stext+='cursor:pointer;\n';
bi2_stext+='text-decoration:none;\n';
bi2_stext+='font-weight:normal;\n';
bi2_stext+='}\n';
bi2_stext+='.tt3:hover{\n';
bi2_stext+='position:relative;\n';
bi2_stext+='z-index:23;\n';
bi2_stext+='}\n';
bi2_stext+='.tt3 span{\n';
bi2_stext+='display:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt3:hover span{\n';
bi2_stext+='display:block;\n';
bi2_stext+='position:absolute;\n';
bi2_stext+='top:40px;\n';
bi2_stext+='left:-100px;\n';
bi2_stext+='background:#b6ab92;\n';
bi2_stext+='border:2px solid #000;\n';
bi2_stext+='color:#000;\n';
bi2_stext+='opacity:0.8;\n';
bi2_stext+='z-index:21;\n';
bi2_stext+='padding:5px;\n';
bi2_stext+='font-size:12px;\n';
bi2_stext+='cursor:pointer;\n';
bi2_stext+='text-decoration:none;\n';
bi2_stext+='}\n';

bi2_stext +='\n\
.bi2_sel {\n\
    background-color: rgb(232, 218, 179);\n\
    font-size: 13px;\n\
}\n\
.bi2_sel optgroup {\n\
    background-color:#443;\n\
    color:white;\n\
}\n\
.bi2_sel optgroup option {\n\
    background-color: rgb(232, 218, 179);\n\
    color:black;\n\
}\n';

bi2_stext+='\n\
.jy_bi {\n\
	width:43px;\n\
	height:43px;\n\
	margin:0px;\n\
	padding:0px;\n\
	text-align: center;\n\
	font-size: 11px;\n\
	font-weight: bold;\n\
	font-style: normal;\n\
	background-image:url(../images/inventory/yield.png);\n\
	background-repeat: no-repeat;\n\
}';
bi2_stext+='\n\
.jy_bi img {\n\
	width:43px;\n\
	height:43px;\n\
}';
bi2_stext+='\n\
.jy_bi2 {\n\
	margin:0px;\n\
	padding:0px;\n\
	text-align: center;\n\
	font-size: 10px;\n\
	font-weight: bold;\n\
	text-align: center;\n\
	font-style: normal;\n\
}';

bi2_stext+='\n\
.gran_vl {\n\
    background: transparent url(images/border/edge_tl_small.png) no-repeat scroll 0% 0%; height: 6px; padding:0;\n\
}';
bi2_stext+='\n\
.gran_v {\n\
    background: transparent url(images/border/border_t.png) repeat-x scroll 0% 0%; padding:0;\n\
}';
bi2_stext+='\n\
.gran_vp {\n\
    background: transparent url(images/border/edge_tr_small.png) no-repeat scroll 0% 0%; padding:0; width: 6px; height: 6px;\n\
}';
bi2_stext+='\n\
.gran_l {\n\
    background: transparent url(images/border/border_l.png) repeat-y scroll 0% 0%; width: 6px; padding:0;\n\
}';
bi2_stext+='\n\
.gran_p {\n\
    background: transparent url(images/border/border_r.png) repeat-y scroll right center; padding:0; width: 6px;\n\
}';
bi2_stext+='\n\
.gran_nl {\n\
    background: transparent url(images/border/edge_bl.png) no-repeat scroll 0% 0%; height: 6px; width: 6px; padding:0;\n\
}';
bi2_stext+='\n\
.gran_n {\n\
    background: transparent url(images/border/border_b.png) repeat-x scroll 0% 0%; padding:0;\n\
}';
bi2_stext+='\n\
.gran_np {\n\
    background: transparent url(images/border/edge_br.png) no-repeat scroll 0% 0%; padding:0; height: 6px; width: 6px;\n\
}';



bi2_head = document.getElementsByTagName('head')[0];
bi2_style = document.createElement('style');
bi2_style.type = 'text/css';
if (bi2_style.styleSheet) {
     bi2_style.styleSheet.cssText = bi2_stext;
} else {
    if (bi2_style.innerText == '') {
	bi2_style.innerText = bi2_stext;
    } else {
	bi2_style.innerHTML = bi2_stext;
    }
}
bi2_head.appendChild(bi2_style);




$=aWindow.$;



add_bi2_footer_link = function(){
	var bi2_fml = document.getElementById('footer_minimap_icon');
	if (bi2_fml) bi2_fml=bi2_fml.parentNode;
	if (bi2_fml) bi2_fml=bi2_fml.parentNode;

	if (bi2_fml) {
		var bi2_link = document.createElement('a');
		bi2_link.setAttribute('href', 'javascript:bi2_show_panel();void(0)');
		bi2_link.innerHTML = '<img id=\"bi2_footer_link\" src=\"images/transparent.png\"/ style=\"width:37px; height:37px; background-position: 0px 0px 0px 0px; background-image:url(http://i757.photobucket.com/albums/xx211/Darius_II/tw/small_przybornik.png);\">';
		bi2_fml.appendChild(bi2_link);
		setTimeout(function(){if ($('bi2_footer_link')) $('bi2_footer_link').addMousePopup('<b>Dopasowywanie ekwipunku</b>')},2500);
		return;
	}
	setTimeout(add_bi2_footer_link, 2000);
};


add_bi2_menu_link = function(){
	var bi2_menu_inv = document.getElementById('menu_inventory');
	if (bi2_menu_inv) {
		var bi2_link2 = document.createElement('div');
		bi2_link2.id = "menu_przybornik";
		bi2_link2.innerHTML = '<a id=\"przybornik_link\" href=\"javascript:bi2_show_panel();void(0);\"><img id=\"' + 'przybornik_link2' + '\" src=\"images/transparent.png\"/ style=\"width:128px; height:25px; background-position: 0px 0px 0px 0px;\" title=\"Kliknij przycisk, aby rozpocząć poszukiwania przydatnych przedmiotów\"><span>Przybornik</span></a>';
		addGlobalStyle('#menu_przybornik {background:url(http://i757.photobucket.com/albums/xx211/Darius_II/tw/przybornik.png); }');
		var bi2_workbar_left = document.getElementById('workbar_left');
		if (bi2_workbar_left) { bi2_workbar_left.style.marginTop = '26px'; }
		bi2_menu_inv.parentNode.insertBefore(bi2_link2,bi2_menu_inv.nextSibling);
		setTimeout(function(){if ($('przybornik_link2')) $('przybornik_link2').addMousePopup('<b>Dopasowywanie ekwipunku</b>')},2500);
		return;
	}
	setTimeout(add_bi2_menu_link,2000);
}

add_bi2_footer_link();
add_bi2_menu_link();
