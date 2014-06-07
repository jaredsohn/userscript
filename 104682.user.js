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
// @name kaskus jumlah postingan by sandi_okta
// @namespace http://diveintogreasemonkey.org/download/
// @description example script to alert "Hello world!" on every page
// @include http://www.kaskus.co.id/reputation.php?*
// ==/UserScript==


//-var allDivs, thisDiv;
//-allDivs = document.evaluate(
//-    "//td[@id='InfoTablle03']",
//-    document,
//-    null,
//-    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
//-    null);
//-for (var i = 0; i < allDivs.snapshotLength; i++) {
//-    thisDiv = allDivs.snapshotItem(i);
//-    // do something with thisDiv
//-
//-	var span_posting  = document.createElement('span');
//-//-		 span_posting 	= document.createTextNode("posts: "+jml_posting);
//-		 span_posting.setAttribute('id','span_postingan');
//-
//-	thisDiv.parentNode.appendChild(span_posting);
//-}

var uid = document.getElementsByTagName("a")[0];

var the_ID = uid.href.split("=");
the_ID = the_ID[1];

parsingurl(the_ID);

function parsingurl(the_ID){
	if( window.XMLHttpRequest ) {
		api_xml_http = new XMLHttpRequest();
	}
	else if( window.ActiveXObject ) {
		api_xml_http = new ActiveXObject( "MSXML2.XMLHTTP.3.0" );
	}
    	var kata_kedua = '';
		var urlposting="http://www.kaskus.co.id/member.php?u="+the_ID+"";

		api_xml_http.open("GET",urlposting,true);
		api_xml_http.send(null);

		api_xml_http.onreadystatechange=function() {

			if(api_xml_http.readyState==4){
				if (api_xml_http.status==200) {
					var awal_i = api_xml_http.responseText.indexOf('<dt class="shade">Total Posts</dt>') + 44;

					for (var i=(awal_i);i<(awal_i+5);i++){
						kata_kedua = kata_kedua +""+ api_xml_http.responseText.charAt(i);
					}

				var rep_IMG = '';
				if (api_xml_http.responseText.match("reputation_pos.gif")){
					rep_IMG = "<img src='http://static.kaskus.co.id/images/reputation/reputation_pos.gif'>";
				}else if (api_xml_http.responseText.match("reputation_neg.gif")){
					rep_IMG = "<img src='http://static.kaskus.co.id/images/reputation/reputation_neg.gif'>";
				}else if (api_xml_http.responseText.match("reputation_balance.gif")){
					rep_IMG = "<img src='http://static.kaskus.co.id/images/reputation/reputation_balance.gif'>";
				}

					document.getElementById("header_nav").innerHTML = "<center><b>Jumlah Postingan: "+kata_kedua+"</b> &nbsp;&nbsp; "+rep_IMG+"</center>";
				}
			}
		}
}