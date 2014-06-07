// ==UserScript==
// @name		RK Plus
// @namespace		http://lesroyaumes.com
// @version		0.1 BETA
// @descriptcion	Some tools to help with the Renaissance Kingdoms game
// @copyright		2010, Muskalek (muskalek@op.pl)
// @include		http://*/EcranPrincipal.php*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require		http://www.sunsean.com/idTabs/jquery.idTabs.min.js
// @resource		CSS http://muskasha.xtreemhost.com/RK_tools/styles.css
// ==/UserScript==

//Language tables
lang_ini = new Array();
lang_ini["pl"] = new Array();
	lang_ini["pl"]["url"] = "krolestwa";
	lang_ini["pl"]["beg"] = "Witaj ";
	lang_ini["pl"]["menu"] = new Array();
			lang_ini["pl"]["menu"][1] = "Mapy";
			lang_ini["pl"]["menu"][2] = "Zakupy PLUS"
			lang_ini["pl"]["menu"][3] = "Ożyw linki"
	lang_ini["pl"]["map"] = new Array();
		lang_ini["pl"]["map"]["world"] = "Mapa &#347;wiata";
		lang_ini["pl"]["map"]["poli"] = "Mapa polityczna";
		lang_ini["pl"]["map"]["nav"] = "Mapa nawigacyjna";
		lang_ini["pl"]["map"]["rel"] = "Mapa religii";
	lang_ini["pl"]["calc"] = new Array();
	lang_ini["pl"]["job"] = new Array();
		lang_ini["pl"]["job"]["bch"] = "Rze&#378;nik";
		lang_ini["pl"]["job"]["bkr"] = "Piekarz";
		lang_ini["pl"]["job"]["blk"] = "Kowal";
		lang_ini["pl"]["job"]["mil"] = "M&#322;ynarz";
		lang_ini["pl"]["job"]["wev"] = "Krawiec";
		lang_ini["pl"]["job"]["car"] = "Stolarz";

//New functions definitions

    //Autolink
jQuery.fn.autolink = function () {
	return this.each( function(){
		var re = /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
		$(this).html( $(this).html().replace(re, '<a href="$1" target="_blank">$1</a> ') );
	});
}

//Appending styles
GM_addStyle(GM_getResourceText("CSS"));

//Gettig language
url = location.href;
for(var i in lang_ini){
	if(url.indexOf(lang_ini[i]["url"]) != -1){
		lg = i;
		break;
	}
	else{
		lg = "en";
	}
}
//Language helpers
lang = lang_ini[lg];
	menu = lang["menu"];
	map = lang["map"]
	calc = lang["calc"];
	job = lang["job"];

//Getting nick
title = document.title;
end = ",";
beg = lang["beg"];
end = title.indexOf(end);
beg = title.indexOf(beg) + beg.length;
nick = title.substring(beg, end);

//Removing ads
$(".zonePubDroite").remove();
$(".espace_pub_contenu_2").remove();

//Divs manipolations
$(".cadre_interieur_centre_pub").addClass("cadre_interieur_centre_nonpub").removeClass("cadre_interieur_centre_pub");
$(".bas_site").removeClass("nonNoble");
$(".ensemble").append("<div id='plus_container'><div id='plus_container_top' /><div id='plus_container_middle' /><div id='plus_container_bottom' /></div>");
$(".cadre_bas_raccord").remove();

//PLUS main anchor
$("#plus_container_top").append("<a id='plus_toggler' class='menus'>RK Plus</a>");

//PLUS menu
$("#plus_container_middle").append("<a class='plus_popuper menus' id='plus_menu_map'>"+menu[1]+"</a>");
$("#plus_container_middle").append("<a class='menus' id='plus_menu_market'>"+menu[2]+"</a>");
$("#plus_container_middle").append("<a class='menus' id='plus_menu_links'>"+menu[3]+"</a>");

//Functionalities
$("#plus_toggler").toggle(function(){
		$("#plus_container_middle").slideDown();
		return false;
	},function(){
		$("#plus_container_middle").slideUp();
		popup_remove();
		return false;
});
$(".plus_popuper").click(function(){
	switch($(this).attr("id")){
		case("plus_menu_map"): toOpen = popup_map; break;
		case("plus_menu_calc"): toOpen = popup_calc; break;
	}
	if(!$("#plus_popup")[0]){
		popup(toOpen);
	}else{
		popup_remove();
	}
	return false;
});

//Popup functions
function popup(content){
	$(".zone_onglets").hide();
	$(".ensemble").prepend("<div id='plus_popup'><div class='pseudo_popup_fond' /><div class='zone_onglets' id='plus_popup_tabs' style='z-index: 1001;'/><div id='plus_popup_cont' class='pseudo_popup' /></div>");
	$("#chaineNavigation").hide();
	tabs = $("#plus_popup_tabs");
	tabs_cont = $("#plus_popup_cont");
	content();
	iniTabs(); 
}
function popup_remove(){
	$("#plus_popup").remove();
	$("#chaineNavigation").show();
	$(".zone_onglets").show();
}
function iniTabs(){
	$(".tab").click(function(){
		$(".tab_content").hide();
		$($(this).attr("href")).show();
		$(".onglets_actifs").addClass("onglets_inactifs").removeClass("onglets_actifs");
		$(this).addClass("onglets_actifs").removeClass("onglets_inactifs");
		return false;
	});
}

//Market
$("#plus_menu_market").click(function(){
    //Quantity
    $("select[name='quantite']").replaceWith("<input type='text' size='2' onchange='document.nom2.submit()' name='quantite'");
    
    //Prices
    $("select[name='prix']").replaceWith("<input type='text' size='3' onchange='document.nom2.submit()' name='prix'");
    $("select[name='centimes']").replaceWith("<input type='text' size='2' onchange='document.nom2.submit()' name='centimes'");
});

//Autolinks
$("#plus_menu_links").click(function(){
    $(".zone_texte").autolink();
});

//Maps
function popup_map(){
	tabs.append("<a class='onglets_actifs tab' href='#plus_map_world'>"+map["world"]+"</a>");
	tabs.append("<a class='onglets_inactifs tab' href='#plus_map_poli'>"+map['poli']+"</a>");
	tabs.append("<a class='onglets_inactifs tab' href='#plus_map_nav'>"+map['nav']+"</a>");
	tabs.append("<a class='onglets_inactifs tab' href='#plus_map_rel'>"+map['rel']+"</a>");
	tabs_cont.append("<iframe id='plus_map_world' class='tab_content' style='display: block' src='http://www.le317.fr/cartes/monde.html' />");
	tabs_cont.append("<iframe id='plus_map_poli' class='tab_content' src='http://www.le317.fr/cartes/politique.html'");
	tabs_cont.append("<iframe id='plus_map_nav' class='tab_content' src='http://www.le317.fr/cartes/navigation.html'");
	tabs_cont.append("<iframe id='plus_map_rel' class='tab_content' src='http://www.le317.fr/cartes/religion.html'");
}

//Calc
function JobItem(name, quantity, days, elems){
	this.name = name;
	this.quantity = quantity;
	this.days = days;
	this.elems = elems;
}
