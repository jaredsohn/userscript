// ==UserScript==
// @author          Extremist
// @name            eRepublik Federalist Pony Express
// @namespace       Newspaper Article Revival
// @description     Announce Federalist Members Newspapers so interested parties may vote, subscribe, and Comment.
// @version         09.01.11
// @include        http://*.erepublik.com/*
// @include        http://dennis.peterson.users.wdoemail.com/*

// ==/UserScript==

var contentDiv = document.getElementById('articles');
Function Add_Feds_News ()
{
	//Add Federalist mbutton
	var news = document.evaluate("id('articles')/div[3]/div[4]/div[2]/div[2]/div[2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var Fed_mbutton = document.insertElement("div");
			'</a>
				<a href="http://federalistparty.forumotion.com/f62-fed-pony-express" class="mbutton">
				<img src="http://i49.servimg.com/u/f49/14/99/32/35/fedpar11.png" alt="">
				<span>Federalist Newspapers</span>';
}