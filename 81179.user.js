// ==UserScript==
// @name           GaiaOnline - Total Wishlist Cost
// @namespace      http://userscripts.org/users/126924
// @description    Calculates total cost of all items on wishlist
// @include        http://www.gaiaonline.com/profiles/*
// @include        http://gaiaonline.com/profiles/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function getCost(){
	var numitems = $("#id_wishlist .item").length;
	var checked = 0;
	var cost = 0;
	lightbox($("<img src=\"http://imgur.com/iuV4k.gif\" />"));
	if( numitems == 0 ) displayCost("No items found.");
	$("#id_wishlist .item a").each(function(){
		$.get("http://www.gaiaonline.com/equip/id/"+$(this).attr("id").substr(1),function(data){
			iteminfo = eval(data);
			iteminfo.averages = parseInt(iteminfo.averages.replace(/,/,""));
			itemcost = iteminfo.store_id == "0" ? iteminfo.averages : Math.min(iteminfo.averages,iteminfo.price);
			cost += itemcost;
			if( checkDone( ++checked, numitems ) ) displayCost( cost );
		});
	});
}

function lightbox(inside){
	$("body").append("<div id=\"fullouter\"><div id=\"fullinner\"></div></div>");
	$("#fullouter").css({
		display: "table",
		position: "fixed",
		top: "0px",
		left: "0px",
		bottom: "0px",
		right: "0px",
		width: "100%",
		zIndex: "1000"
	});
	$("#fullinner").css({
		width: "100%",
		background: "rgba(0,0,0,0.75)",
		color: "white",
		display: "table-cell",
		verticalAlign: "middle",
		textAlign: "center"
	});
	$("#fullinner").append(inside);
}

function checkDone(checked,expected){
	if( checked==expected ) return true;
	return false;
}

function displayCost(cost){ 
	$("#fullinner").html("Total cost of items: "+cost);
	$("#fullouter").click(function(){$(this).fadeOut(function(){$(this).remove();})});
}

GM_registerMenuCommand("Get Wishlist Cost",getCost);