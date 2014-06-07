//
// ==UserScript==
// @name          HWM_Fine_Hero_Image neo_king
// @description   HWM mod - neo_king
// @version       1
// @icon           data:image/png;base64,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
// @include       http://www.heroeswm.ru/inventory.php
// @include       http://www.heroeswm.ru/pl_info.php*
// ==/UserScript==



//alert("HWM mod - Fine_Hero_Image");	

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
				
			}else if(k_name=="kukla8.jpg"){ // gnom
				tbl.style.background = "url("+k_gnom_m1+")";
			}else if(k_name=="kukla8w.jpg"){
				tbl.style.background = "url("+k_gnom_f1+")";
				
			}else if(k_name=="kukla9.jpg"){ // Varvar
				tbl.style.background = "url("+k_Varvar_m1+")";
			}else if(k_name=="kukla9w.jpg"){
				tbl.style.background = "url("+k_Varvar_f1+")";
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
use_my_pers_kukla = true;
//use_my_pers_kukla = true; //  uncomment to enable your image
k_my_pers = 'http://neostudio.ucoz.com/_ph/4/2/479948182.gif';

// ==================================================================================================================


// ==================================================================================================================
// ==================================================================================================================
// == Barb Girl DAZ Studio 3D
k_barb_f1 = 'http://legenda-tabl.clan.su/skript3/kukla5w.png';


// ==================================================================================================================
// == Elf Girl 3D #1
k_elf_f1 = 'http://legenda-tabl.clan.su/skript3/kukla4w.png';

// ==================================================================================================================
// == Elf Man 3D #1
k_elf_m1 = 'http://legenda-tabl.clan.su/skript3/kukla4.png';

// ==================================================================================================================
// == Dark Elf Man 1 DAZ Studio 3D
k_dark_elf_m1 = 'http://legenda-tabl.clan.su/skript3/kukla6.png';


// ==================================================================================================================
// == Dark Elf Girl 3D Rend
k_dark_elf_f2 = 'http://legenda-tabl.clan.su/skript3/kukla6w.png';

// ==================================================================================================================
// == Barb Man  3D DAZ
k_barb_m2 = 'http://legenda-tabl.clan.su/skript3/kukla5.png';

// ==================================================================================================================
// == Demon Man 1 DAZ Studio 3D
k_demon_m1 = 'http://legenda-tabl.clan.su/skript3/kukla7.png';

// ==================================================================================================================
// == Demon Girl 1 Matthew W Gonzales
k_demon_f1 = 'http://legenda-tabl.clan.su/skript3/kukla7w.png';


// ==================================================================================================================
// == Knight Man 1 DAZ Studio 3D
k_knight_m1 = 'http://legenda-tabl.clan.su/skript3/kukla1.png';

// ==================================================================================================================
// == Knight Girl 1 DAZ Studio 3D
k_knight_f1 = 'http://legenda-tabl.clan.su/skript3/kukla1w.png';

// ==================================================================================================================
// == Necro Man GW
k_necro_m1 = 'http://legenda-tabl.clan.su/skript3/kukla2.png';

// ==================================================================================================================
// == Necro Girl GW
k_necro_f1 = 'http://legenda-tabl.clan.su/skript3/kukla2w.png';

// ==================================================================================================================
// == Mage Girl 3D Rend
k_mage_f1 = 'http://legenda-tabl.clan.su/skript3/kukla3w.png';

// ==================================================================================================================
// == Mage Man 3D Rend
k_mage_m1 = 'http://legenda-tabl.clan.su/skript3/kukla3.png';

// ==================================================================================================================
// == Gnom Man 3D Rend
k_gnom_m1 = 'http://legenda-tabl.clan.su/skript3/kukla8.png';

// ==================================================================================================================
// == Gnom Girl 3D Rend
k_gnom_f1 = 'http://legenda-tabl.clan.su/skript3/kukla8w.png';

// ==================================================================================================================
// == SV Man 3D Rend
k_Varvar_m1 = 'http://legenda-tabl.clan.su/skript3/kukla9.png';

// ==================================================================================================================
// == Gnom Girl 3D Rend
k_Varvar_f1 = 'http://legenda-tabl.clan.su/skript3/kukla9w.png';





// ====================================== Function Call Below ================================================
makeCustomDoll();


// == end of script


