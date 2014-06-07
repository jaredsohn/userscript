// ==UserScript==
// @name          HWM_Adv_DD_Menu
// @description   HWM mod - Advanced Drop-Down Menu
// @include        http://www.heroeswm.ru/*
// @exclude       http://www.heroeswm.ru/warlog.php*
// @exclude       http://www.heroeswm.ru/war.php*
// @exclude       http://www.heroeswm.ru/brd.php
// @exclude       http://www.heroeswm.ru/rightcol.php
// @exclude       http://www.heroeswm.ru/ch_box.php
// @exclude       http://www.heroeswm.ru/chatonline.php*
// @exclude       http://www.heroeswm.ru/chat_line.php*
// @exclude       http://www.heroeswm.ru/chatpost.php*
// @exclude       http://www.heroeswm.ru/chat.php*
// @exclude       http://www.heroeswm.ru/ticker.php*
// ==/UserScript==

// === v 0.2 ========


// =================== PERSONAL LINKS (replaces Chat menu) =================================
var replace_chat = false;
//replace_chat = true; // uncomment this line to have chat replaced
//
//
var my_links = []; // REPLACE CHAT MENU.
// Insert ANY number of your links below
// better to write them in english or in "translit"
// russian letters must be converted to unicode codes. Here's an utility: 
// http://static.bobrdobr.ru/store/spuntik/cache/1785ad2ca55f214df4bb297318b250bd.html
//
my_links.push('<a href="http://www.heroeswm.ru/home.php">Link_1</a>');  // 
my_links.push('<a href="http://www.heroeswm.ru/home.php">Link_2</a>');  // 
my_links.push('<a href="http://www.heroeswm.ru/home.php">Link_3</a>');  // 
my_links.push('<a href="http://www.heroeswm.ru/home.php">Link_4</a>');  // 
my_links.push('<a href="http://www.heroeswm.ru/home.php">Link_5</a>');  // 


// ====================================================


// =================== USER VARIABLES =================================
var pers_market = []; // insert after Market in Pers.
pers_market.push('<a href="http://www.heroeswm.ru/auction.php?cat=res&sort=0&type=1">&nbsp;__&nbsp;\u0414\u0435\u0440\u0435\u0432\u043E</a>');  //wood
pers_market.push('<a href="http://www.heroeswm.ru/auction.php?cat=res&sort=0&type=2">&nbsp;__&nbsp;\u0420\u0443\u0434\u0430</a>');  // ore
pers_market.push('<a href="http://www.heroeswm.ru/auction.php?cat=res&sort=0&type=3">&nbsp;__&nbsp;\u0420\u0442\u0443\u0442\u044C</a>');  // mercury
pers_market.push('<a href="http://www.heroeswm.ru/auction.php?cat=res&sort=0&type=4">&nbsp;__&nbsp;\u0421\u0435\u0440\u0430</a>');  // sulf
pers_market.push('<a href="http://www.heroeswm.ru/auction.php?cat=res&sort=0&type=5">&nbsp;__&nbsp;\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u043B\u044B</a>');  //cryst
pers_market.push('<a href="http://www.heroeswm.ru/auction.php?cat=res&sort=0&type=6">&nbsp;__&nbsp;\u0421\u0430\u043C\u043E\u0446\u0432\u0435\u0442\u044B</a>');  // gems
pers_market.push('<a href="http://www.heroeswm.ru/auction.php?cat=my&sort=0">_MyLots_</a>');  // MyLots
pers_market.push('<a href="http://www.heroeswm.ru/ecostat.php">_EcoStat_</a>');  // ecostat


var pers_last = []; // insert after ALL in Pers.
pers_last.push('<hr>');  
pers_last.push('<a href="http://www.heroeswm.ru/pl_warlog.php?id=XXX_XXX">&nbsp;__&nbsp;\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u0431\u043E\u0435\u0432</a>');  // battl log
pers_last.push('<a href="http://www.heroeswm.ru/pl_transfers.php?id=XXX_XXX">&nbsp;__&nbsp;\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u043F\u0435\u0440\u0435\u0434\u0430\u0447</a>'); // transfers 



var forum_sect = []; // insert after existing forum sections
forum_sect.push('<hr>');  
forum_sect.push('<a href="http://www.heroeswm.ru/forum_thread.php?id=3">\u0418\u0434\u0435\u0438 \u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F</a>');  
forum_sect.push('<a href="http://www.heroeswm.ru/forum_thread.php?id=16">\u0422\u0432\u043E\u0440\u0447\u0435\u0441\u0442\u0432\u043E</a>');  

// ===================  =================================


var url_cur = location.href ;

//alert("HWM_Adv_DD_Menu");	

// ============
var all_li_subnav = document.evaluate("//li[@class='subnav']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


// =====	
addMenuElements();

replaceChatMenu();

	
// ==


function addMenuElements(){ //
	//alert("addMenuElements");
	
	var my_li;
	var elm;
	var prev_elm;
	
	// get player ID
	my_li = all_li_subnav.snapshotItem(5);
	prev_elm = my_li.childNodes[1].childNodes[1];
		//alert("Player ID = \n" +prev_elm.innerHTML);
	//
	var ptrn = /<a href="pl_hunter_stat\.php\?id=(.*)">(.*)<\/a>/;
	var player_id = prev_elm.innerHTML.replace(ptrn, "$1")
		//alert("player_id = "+player_id);
	//
	//
	// pers - market
	my_li = all_li_subnav.snapshotItem(0);
	prev_elm = my_li.childNodes[1].childNodes[2];
		//alert("market = \n" +prev_elm.innerHTML);
	pers_market.reverse();
	for (var i = 0; i < pers_market.length; i++) {
		elm = document.createElement('li');
		elm.innerHTML = pers_market[i]; 
		prev_elm.parentNode.insertBefore(elm, prev_elm.nextSibling);
	
	}
	//
	// pers - after all
	my_li = all_li_subnav.snapshotItem(0);
	prev_elm = my_li.childNodes[1].childNodes[8+pers_market.length];
	pers_last.reverse();
	for (var i = 0; i < pers_last.length; i++) {
		elm = document.createElement('li');
		elm.innerHTML = pers_last[i].split("XXX_XXX").join(player_id); 
		prev_elm.parentNode.insertBefore(elm, prev_elm.nextSibling);
	
	}
	//
	//
	// forum_sect
	my_li = all_li_subnav.snapshotItem(6);
	prev_elm = my_li.childNodes[1].childNodes[2];
		//alert("forum_ = \n" +prev_elm.innerHTML);
	forum_sect.reverse();
	for (var i = 0; i < forum_sect.length; i++) {
		elm = document.createElement('li');
		elm.innerHTML = forum_sect[i]; 
		prev_elm.parentNode.insertBefore(elm, prev_elm.nextSibling);
	
	}
	

}



function replaceChatMenu(){ //
	if(!replace_chat){ return; }
	//
		//alert("replaceChatMenu");
	var my_li;
	var elm;
	var prev_elm;	
	var new_line ;
	// 
	my_li = all_li_subnav.snapshotItem(7); // chat, last  submenu...
	var chat_items = my_li.childNodes[1].childNodes;
		//alert("chat_ = \n" +chat_items[2].innerHTML);
	//
	var len = Math.max(chat_items.length, my_links.length);
		//alert("len = "+len);
	
	for (var i = 0; i < len; i++) {
		new_line = (i<my_links.length)? my_links[i] : "--------"; 
		
		if(i < chat_items.length){ // replace chat line
			elm = chat_items[i];
			elm.innerHTML = new_line; 
			
		}else{
			elm = document.createElement('li');
			elm.innerHTML = new_line; 
			prev_elm = chat_items[i-1];
			prev_elm.parentNode.insertBefore(elm, prev_elm.nextSibling);
		}
	
	}		

}


//



