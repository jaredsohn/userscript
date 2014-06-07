// ==UserScript==
// @name           next prev colony
// @namespace      durrrrrr.co.us
// @include        *.war-facts.com/view_colony.php*
// ==/UserScript==


	var colonyurl;
	var strQueryString="";

	var hasQueryString = document.URL.indexOf('?'); 
	
	if (hasQueryString != -1) 
	
	{ 
	
		strQueryString = document.URL.substring(hasQueryString+1, document.URL.length);
	
	}
	
	strQueryString = strQueryString.replace(/colony=/, "");
	
	colonyurl = strQueryString;

	var prevcolony;
	var nextcolony;
	var nextset = 0;
	var lastcol;
	var prevset = 0;
	
	var colonies = document.evaluate( "//*[contains(@class,'show')]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
	var colony;
	while( colony = colonies.iterateNext() ) {
		colonyhtml = colony.innerHTML;
		colonylink1 = colonyhtml.indexOf("<a");
		colonylink2 = colonyhtml.indexOf("</a>", colonylink1);
		colonylink = colonyhtml.substring(colonylink1, colonylink2+4);
		colonyid1 = (colonyhtml.indexOf("href=\"")+6);
		colonyid2 = colonyhtml.indexOf("\"", colonyid1);
		colonyid = colonyhtml.substring(colonyid1, colonyid2);
		colonyequal = colonyhtml.indexOf("=", colonyid1);
		colonyno = colonyhtml.substring(colonyequal+1, colonyid2);
		
		if(colonyno == colonyurl && prevset != 1){
			prevset = 1;
			lastcol = prevcolony;
		}
		prevcolony = colonylink;		
		
		if(nextset == 1){
			nextcol = colonylink;
			nextset = 0;
		}
		if(colonyno == colonyurl && nextset != 1){
			nextset = 1;
		}

		
	}
	var wootles = 0;
	var title = document.evaluate("//strong/font", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
		
	if(lastcol == null){
			starthtml = "";
		}
		else{
			starthtml = "<span style=\"font-size: 11px;\"><< "+lastcol+" << </span>";
		}
		colonytitle = title.textContent;
		if(nextcol.indexOf("fleet") == -1){
			endhtml = "<span style=\"font-size: 11px;\"> >> "+nextcol+" >></span>";
		}
		else{
			endhtml = "";
		}
		stickinhtml = starthtml+colonytitle+endhtml;
		title.innerHTML = stickinhtml;
	