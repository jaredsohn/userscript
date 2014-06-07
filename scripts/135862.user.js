//
// ==UserScript==
// @name          HWM Marvel Hero Image
// @description   HWM mod - Marvel Hero Image
// @version       1
// @include       http://www.heroeswm.ru/inventory.php
// @include       http://www.heroeswm.ru/pl_info.php*
// ==/UserScript==


//alert("HWM mod - Marvel Hero Image");	

var url_cur = location.href ;
var player_id = getPlayerId();
	//alert("player_id = "+player_id);

var isMyProfile = (url_cur.indexOf("pl_info.php")!=-1 && (getPlayerId()==getUrlParam("id")) );
var isInventory = (url_cur.indexOf("inventory.php")!=-1);
	//alert("isMyProfile = "+isMyProfile+"\n isInventory = "+isInventory);

	
function getPlayerId(){
	var all_li_subnav = document.evaluate("//li[@class='subnav']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var my_li;
	var elm;
	var prev_elm;
	
	// get player ID
	my_li = all_li_subnav.snapshotItem(5);
	prev_elm = my_li.childNodes[1].childNodes[1];
		//alert("Player ID = \n" +prev_elm.innerHTML);
	//
	var ptrn = /<a href="pl_hunter_stat\.php\?id=(.*)">(.*)<\/a>/;
	var pid = prev_elm.innerHTML.replace(ptrn, "$1")
	
	return pid;
}

function makeCustomDoll(){	
	
	var tables = document.getElementsByTagName('table');
	var tbl;
	var bg;
	
	var k_regexp = /i\/kukla\/new\/(kukla\d+\w*\.jpg)/ ;
	
	for( var i = 0; i < tables.length; i++ ){
	  tbl = tables[i];
	  bg = tbl.getAttribute("background") ; 	
		
		if( bg && bg.match( /i\/kukla/ ) ) {
		
			var k_name = k_regexp.exec(bg)[1];
				//alert("tbl.bg = "+bg+"\n k_name = "+k_name);
			
			if(use_my_pers_kukla && (isMyProfile || isInventory) ){ // special case for owner's profile and inventory
				tbl.style.background = "url("+k_my_pers+")";
			
			}else if(k_name=="kukla1.jpg"){ // knights
				tbl.style.background = "url("+k_knight_m1+")";
			}else if(k_name=="kukla1w.jpg"){
				tbl.style.background = "url("+k_knight_f1+")";
			
			}else if(k_name=="kukla2.jpg"){   // necros
				tbl.style.background = "url("+k_necro_m1+")";				
			}else if(k_name=="kukla2w.jpg"){
				tbl.style.background = "url("+k_necro_f1+")";
				
			}else if(k_name=="kukla3.jpg"){   // mages
				tbl.style.background = "url("+k_mage_m1+")";				
			}else if(k_name=="kukla3w.jpg"){
				tbl.style.background = "url("+k_mage_f1+")";
				
			}else if(k_name=="kukla4.jpg"){   // elves
				tbl.style.background = "url("+k_elf_m1+")";					
			}else if(k_name=="kukla4w.jpg"){
				tbl.style.background = "url("+k_elf_f1+")";
				
			}else if(k_name=="kukla5.jpg"){ // barbarians
				tbl.style.background = "url("+k_barb_m2+")";
			}else if(k_name=="kukla5w.jpg"){
				tbl.style.background = "url("+k_barb_f1+")";
				
			}else if(k_name=="kukla6.jpg"){ // dark elves
				tbl.style.background = "url("+k_dark_elf_m1+")";
			}else if(k_name=="kukla6w.jpg"){
				tbl.style.background = "url("+k_dark_elf_f2+")";
				
			}else if(k_name=="kukla7.jpg"){ // demons
				tbl.style.background = "url("+k_demon_m1+")";
			}else if(k_name=="kukla7w.jpg"){
				tbl.style.background = "url("+k_demon_f1+")";

			}else if(k_name=="kukla8.jpg"){ // dwarf
				tbl.style.background = "url("+k_dwarf_m1+")";
			}else if(k_name=="kukla8w.jpg"){
				tbl.style.background = "url("+k_dwarf_f1+")";
			}
			
			
			
			break;
		}
	}

}

function getUrlParam( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Pictures below are encoded as data:image (See RFC 2387 and GreaseMonkey manual :-)


// ==================================================================================================================
// == YOUR personal Kukla image to be shown in your profile and Inventory pages
//use_my_pers_kukla = false;
use_my_pers_kukla = true; //  uncomment to enable your image
k_my_pers = '';

// ==================================================================================================================


// ==================================================================================================================
// ==================================================================================================================
// == Barb Girl DAZ Studio 3D
k_barb_f1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/333.jpg';

// ==================================================================================================================
// == Elf Girl 3D #1
k_elf_f1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/332.jpg';

// ==================================================================================================================
// == Elf Man 3D #1
k_elf_m1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/332.jpg';

// ==================================================================================================================
// == Dark Elf Man 1 DAZ Studio 3D
k_dark_elf_m1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/334.jpg';

// ==================================================================================================================
// == Dark Elf Girl 3D Rend
k_dark_elf_f2 = 'http://photo.heroeswm.ru/photo-catalog/0000962/334.jpg';

// ==================================================================================================================
// == Barb Man  3D DAZ
k_barb_m2 = 'http://photo.heroeswm.ru/photo-catalog/0000962/333.jpg';

// ==================================================================================================================
// == Demon Man 1 DAZ Studio 3D
k_demon_m1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/335.jpg';

// ==================================================================================================================
// == Demon Girl 1 Matthew W Gonzales
k_demon_f1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/335.jpg'; 

// ==================================================================================================================
// == Knight Man 1 DAZ Studio 3D
k_knight_m1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/306.jpg';

// ==================================================================================================================
// == Knight Girl 1 DAZ Studio 3D
k_knight_f1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/306.jpg';

// ==================================================================================================================
// == Necro Man GW
k_necro_m1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/330.jpg';

// ==================================================================================================================
// == Necro Girl GW
k_necro_f1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/330.jpg';

// ==================================================================================================================
// == Mage Girl 3D Rend
k_mage_f1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/331.jpg';

// ==================================================================================================================
// == Mage Man 3D Rend
k_mage_m1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/331.jpg';


// ==================================================================================================================
// == Dwarf Girl 
k_dwarf_f1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/336.jpg';

// ==================================================================================================================
// == Dwarf Man
k_dwarf_m1 = 'http://photo.heroeswm.ru/photo-catalog/0000962/336.jpg';

// =========

// ====================================== Function Call Below ================================================
makeCustomDoll();


// == end of script