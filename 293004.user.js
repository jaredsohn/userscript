// ==UserScript==
// @name        iinfo.cz - pruhledne placene clanky v kolotoci
// @namespace   monnef.tk
// @include     http://www.lupa.cz/*
// @include     http://www.digizone.cz/*
// @include     http://www.root.cz/*
// @include     http://www.mesec.cz/*
// @include     http://www.podnikatel.cz/*
// @include     http://www.vitalia.cz/*
// @include     http://www.topdrive.cz/*
// @include     http://www.slunecnice.cz/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

// mam minimalni zkusenosti s JavaScriptem a jQuery,
// takze pokud odhalite chyby nebo vykonostni nedostatky,
// prosim napiste mi :)

function log(a){
	if(debug) console.log("[OPO] " + a);
}

log("started");

var debug=false;
var makeTransparent = function(t){
	t.hover(
		function() {
			$(this).stop().animate({"opacity": "0.95"}, "slow");
		},
    	function() {
			$(this).stop().animate({"opacity": "0.1"}, "slow");
	});
}

this.$ = this.jQuery = jQuery.noConflict(true);

$("#promo-footerPromo > .item, #servers-promo > .item").each(function(){
	if(debug) $(this).css("border", "dotted 1px green");
	var link = $("a.link-img", this);
	if(debug) link.css("border", "solid 1px red");
	log("sending request: " + link.html() + " >>> " + link.prop('href'));
	var url = link.prop('href');
	var q = encodeURIComponent('select * from html where url="'+url+'"');
	var yql = 'http://query.yahooapis.com/v1/public/yql?q='+q;
	$.ajax({
		type: "GET",
		url: yql,
		dataType: "html",
		success: function (data) {
			log("got response for: "+link.html());
			if(data.indexOf("paymentRequest")>=0){
				link.parent().css("opacity", "0.1");
				makeTransparent(link.parent());
			}else{
				if(debug){
					var a=$("h3 a", link.parent());
					a.html("[fine] "+a.html());
				}
			}
		}
	});
});

