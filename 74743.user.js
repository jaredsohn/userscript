// ==UserScript==
// @name           GC PocketQuery Menulink
// @namespace      Geocaching
// @description    V1.0.190410 - Adds "Your Pocket Queries" Link to Top-Menu
// @include        http://www.geocaching.com/my/*
// ==/UserScript==

//var pqml_memberStatus = document.getElementById('memberStatus');
//var pqml_isPremium = pqml_memberStatus.innerHTML.indexOf('Premium') > -1;

//alert("isPremium = " + pqml_isPremium);
//if (pqml_isPremium) {
  //alert("in IF");
	var pqml_contentdiv = document.getElementById('Content');
	//alert("contentDiv = " + pqml_contentdiv);
	var pqml_menudiv = pqml_contentdiv.getElementsByTagName("div")[2];
	//alert("menudiv = " + pqml_menudiv);
	var pqml_menup = pqml_menudiv.getElementsByTagName("p")[0];
	//alert("menu_p = " + pqml_menup.innerHTML);
	
	var pqml_menuspacer = document.createTextNode(" | ");
	var pqml_pocketquerylink = document.createElement("a");
	var pqml_linktext = document.createTextNode("Your Pocket Queries");

	pqml_pocketquerylink.href="/pocket/default.aspx";
	pqml_pocketquerylink.title="Your Pocket Queries";
	//pqml_pocketquerylink.value="My Pocket Queries";
	pqml_pocketquerylink.appendChild(pqml_linktext);
	
	pqml_menup.appendChild(pqml_menuspacer);
	pqml_menup.appendChild(pqml_pocketquerylink);
	//alert("QueryLink = " + pqml_pocketquerylink);
	//alert("done");
	
//}