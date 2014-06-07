// Hello World! example user script
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name kaskus jumlah postingan New Kaskus by sandi_okta
// @namespace http://diveintogreasemonkey.org/download/
// @description kaskus jumlah postingan New Kaskus by sandi_okta
// @include http://livebeta.kaskus.co.id/reputation/*
// ==/UserScript==

//- */
var uid = document.getElementsByTagName("a")[10];

parsingurl(uid.href);

function parsingurl(the_ID){
	if( window.XMLHttpRequest ) {
		api_xml_http = new XMLHttpRequest();
	}
	else if( window.ActiveXObject ) {
		api_xml_http = new ActiveXObject( "MSXML2.XMLHTTP.3.0" );
	}
    	var kata_kedua = '';
		var urlposting=the_ID;

		api_xml_http.open("GET",urlposting,true);
		api_xml_http.send(null);

		api_xml_http.onreadystatechange=function() {

			if(api_xml_http.readyState==4){
				if (api_xml_http.status==200) {


					var awal_i = api_xml_http.responseText.indexOf('<div>Total posts: <b>')  + 21;
					for (var i=(awal_i);i<(awal_i+8);i++){
						kata_kedua = kata_kedua +""+ api_xml_http.responseText.charAt(i);
					}

  				        kata_kedua = kata_kedua.replace(',','');

					kata_kedua = parseInt(kata_kedua);

				var rep_IMG = '';
				if (api_xml_http.responseText.match("reputation_pos.gif")){
					rep_IMG = "<img src='http://static.kaskus.co.id/images/reputation/reputation_pos.gif'>";
				}else if (api_xml_http.responseText.match("reputation_neg.gif")){
					rep_IMG = "<img src='http://static.kaskus.co.id/images/reputation/reputation_neg.gif'>";
				}else if (api_xml_http.responseText.match("reputation_balance.gif")){
					rep_IMG = "<img src='http://static.kaskus.co.id/images/reputation/reputation_balance.gif'>";
				}

					document.getElementsByTagName("h2")[0].innerHTML = document.getElementsByTagName("h2")[0].innerHTML + " | Jumlah Postingan Anda: " + kata_kedua + " | " + rep_IMG;
				}
			}
		}
}
