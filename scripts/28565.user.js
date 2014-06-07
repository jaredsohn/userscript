// ==UserScript==
// @name           HWM_use_kb
// @namespace      http://diveintogreasemonkey.org/download/
// @description    HWM_use_kb
// @version    		0.2.1
//
// @include       http://www.heroeswm.ru/home.php*
// @include       http://www.heroeswm.ru/inventory.php*
// @include       http://www.heroeswm.ru/mercenary_guild.php*
// @include       http://www.heroeswm.ru/shop.php*
// @include       http://www.heroeswm.ru/forum_thread.php*
// @include       http://www.heroeswm.ru/map.php*
// @include       http://www.heroeswm.ru/castle.php*
// @include       http://www.heroeswm.ru/bselect.php*
// @include       http://www.heroeswm.ru/help.php*
//
// @include       http://www.heroeswm.ru/ecostat.php*
// @include       http://www.heroeswm.ru/ecostat_details.php*
// @include       http://www.heroeswm.ru/inforoul.php*
// @include       http://www.heroeswm.ru/allroul.php*
// @include       http://www.heroeswm.ru/object_do.php*
// @include       http://www.heroeswm.ru/auction_lot_protocol.php*
// @include       http://www.heroeswm.ru/objectworkers.php*
//
// @include       http://www.heroeswm.ru/plstats.php*
// @include       http://www.heroeswm.ru/plstats_hunters.php*
// @include       http://www.heroeswm.ru/pl_hunter_stat.php*
//
// @include       http://www.heroeswm.ru/pl_info.php*
// @include       http://www.heroeswm.ru/pl_warlog.php*
// @include       http://www.heroeswm.ru/pl_transfers.php*
// @include       http://www.heroeswm.ru/pl_cardlog.php*
//
// @include       http://www.heroeswm.ru/clan_info.php*
//
// 
// ==/UserScript==

// ========================================================
//
// ==================== User's Hotkeys ====================================
// numeric buttons above letter keys... and also with NumLock on.
// array, 0-number on key, 1-url
var my_hotkeys = [];
my_hotkeys.push([0,'http://www.heroeswm.ru/home.php']);  // "0" key
my_hotkeys.push([1,'http://www.heroeswm.ru/inventory.php?all_on=1']);  // "1" key
my_hotkeys.push([2,'http://www.heroeswm.ru/inventory.php?all_on=2']);  // "2" key
my_hotkeys.push([3,'http://www.heroeswm.ru/home.php']);  // "3" key
my_hotkeys.push([4,'http://www.heroeswm.ru/home.php']);  // "4" key
my_hotkeys.push([5,'http://www.heroeswm.ru/home.php']);  // "5" key
my_hotkeys.push([6,'http://www.heroeswm.ru/home.php']);  // "6" key
my_hotkeys.push([7,'http://www.heroeswm.ru/home.php']);  // "7" key
my_hotkeys.push([8,'http://www.heroeswm.ru/home.php']);  // "8" key
my_hotkeys.push([9,'http://www.heroeswm.ru/home.php']);  // "9" key

// ========================================================================
//
//
// ============
var all_li_subnav = document.evaluate("//li[@class='subnav']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// get player ID
var my_li = all_li_subnav.snapshotItem(5);
var prev_elm = my_li.childNodes[1].childNodes[1];
	//alert("Player ID = \n" +prev_elm.innerHTML);
//
var ptrn = /<a href="pl_hunter_stat\.php\?id=(.*)">(.*)<\/a>/;
var player_id = prev_elm.innerHTML.replace(ptrn, "$1")
	//alert("player_id = "+player_id);

// ========================== Standard Addresses ==============================
// array, 0-eng, 1-rus, 2-url
var std_hotkeys = [];
std_hotkeys.push([104,1088,'http://www.heroeswm.ru/home.php']);  // "H" for home
std_hotkeys.push([103,1087,'http://www.heroeswm.ru/mercenary_guild.php']); // "G" for GN
std_hotkeys.push([101,1091,'http://www.heroeswm.ru/sms.php']); // "E" for Mail
std_hotkeys.push([97,1092,'http://www.heroeswm.ru/auction.php']); // "A" for Market/Auction 
std_hotkeys.push([109,1100,'http://www.heroeswm.ru/map.php']); // "M" for Map
std_hotkeys.push([112,1079,'http://www.heroeswm.ru/pl_info.php?id='+player_id]); // "P" for Profile
std_hotkeys.push([98,1080,'http://www.heroeswm.ru/group_wars.php']); // "B" for Battles (group)
std_hotkeys.push([118,1084,'http://www.heroeswm.ru/group_wars.php?filter=hunt']); // "V" for Hunt 

std_hotkeys.push([102,1072,'http://www.heroeswm.ru/forum.php']); // "F" for Forum 
std_hotkeys.push([116,1077,'http://www.heroeswm.ru/transfer.php']); // "T" for Transfer 
std_hotkeys.push([99,1089,'http://www.heroeswm.ru/castle.php']); // "C" for Castle 
std_hotkeys.push([105,1096,'http://www.heroeswm.ru/inventory.php']); // "I" for Inventory 
std_hotkeys.push([115,1099,'http://www.heroeswm.ru/shop.php']); // "S" for Shop 

std_hotkeys.push([107,1083,'http://www.heroeswm.ru/skillwheel.php']); // "K" for SkillWheel 
std_hotkeys.push([119,1094,'http://www.heroeswm.ru/mod_workbench.php']); // "W" for WorkShop
std_hotkeys.push([108,1076,'http://www.heroeswm.ru/pl_warlog.php?id='+player_id]); // "L" for Your Battle Log
std_hotkeys.push([111,1097,'http://www.heroeswm.ru/pl_transfers.php?id='+player_id]); // "O" for Your Transfers Log
std_hotkeys.push([114,1082,'http://www.heroeswm.ru/army.php']); // "R" for Recruiting (army)

std_hotkeys.push([100,1074,'http://www.heroeswm.ru/inventory.php?all_on=1']); // "D" for Dress (arts on)
std_hotkeys.push([117,1075,'http://www.heroeswm.ru/inventory.php?all_off=1']); // "U" for Un-Dress (arts off)



// ============================================================================
//
//
//
//alert("HWM_use_kb");
var url_cur = location.href ;
//
//
//
document.addEventListener( "keypress", handleKeys , false );

document.addEventListener( "keydown", handleKeyDown , false );
document.addEventListener( "keyup", handleKeyUp , false );

var isCtrl = false;
function handleKeyDown(e){
	if(e.which == 17) isCtrl=true;
}

function handleKeyUp(e){
    var evt = (e) ? e : window.event;   
	var c = (evt.charCode) ? evt.charCode : evt.keyCode;
	if(e.which == 17) isCtrl=false;
}

function handleKeys(e){
	//alert("handleKeys");
    var evt = (e) ? e : window.event;       //IE reports window.event not arg
	
	var c = (evt.charCode) ? evt.charCode : evt.keyCode;
	if(c == 17) {
		isCtrl=true;
		return;
	}
	
	handleChar(c);               //
	
}

function handleChar(c) {
	//alert("handleChar,  c = "+c + ",   isCtrl = "+isCtrl);
	
	if (c <= 46 || isCtrl) { return; }		 // special keys  (shift is 16 btw)
	//
	//alert("handleChar 2,  c = "+c);
	
	// check standard keys
	for(var i=0; i<std_hotkeys.length; i++){
		if(c==std_hotkeys[i][0] || c==std_hotkeys[i][1]){
			window.location = std_hotkeys[i][2];
		}
	}
	//
	// check user's keys
	for(i=0; i<my_hotkeys.length; i++){
		if(c==my_hotkeys[i][0]+48 ){
			window.location = my_hotkeys[i][1];
		}
	}
	
	
}


// === show note :-)
var d = document.createElement( 'div' );
d.innerHTML = '<div style="border:1px solid #999; background-color:#6c6; width:30; height:12; '+
	'position:absolute; top:5px; left:5px; font-size:10px;"  ><b>_KB</b></div>';
document.body.appendChild( d ) ;


// ========================================================