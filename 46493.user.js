// HWM_Clan_Icon_STD
// (c) 2009, LazyGreg
//
// ==UserScript==
// @name          HWM_Clan_Icon_STD
// @version       0.1
// @description   HWM_Clan_Icon_STD
// @include       http://www.heroeswm.ru/*
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


//alert("HWM_Clan_Icon_STD ");

var good_clans = [99999] ;

//var replace_img = "i/s_defence.gif";
var replace_img = "i/s_attack.gif";

var all_img = document.getElementsByTagName('img');

//alert("found "+all_img.length+" images");

var my_img;
var ts = "";
/*  */
for (var i = 0; i < all_img.length; i++) {
	var my_img = all_img[i];
	if(my_img.src.indexOf("i_clans/l_")==-1){continue;} // not a clan icon
	
	for (var j = 0; j < good_clans.length; j++) {
		ts  = "i_clans/l_"+ good_clans[j] +".gif";
		if(my_img.src.indexOf(ts)==-1){
			my_img.src = replace_img;
		}
		//my_img.src = my_img.src.replace(ts, replace_img);		
	}	
}



// ===== END ==============