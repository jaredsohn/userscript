// Copyright (C) 2008 Manuel W.
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// ==UserScript==
// @name           SchuelerVZ - RemoveAdBlocks...
// @description    Entfernt alle Elemente, auf die man gerne verzichten würde...
// @include        http://www.schuelervz.net/*
// @include        http://www.studivz.net/*
// ==/UserScript==

/* get elements to manipulate*/
var elements = new Array(
	getElements(document,"div","class","floatR","h2/span","Telegramm",null),
	getElements(document,"div","class","floatR","h2/span","Neuigkeiten",null),
	getElements(document,"div","class","floatR","h2/span","Schaufenster",null),
	getElements(document,"div","class","floatR","h2/span","Für alle, die nicht (mehr) studieren",null),
	getElements(document,"div","class","floatL",null),
	getElements(document,"div","id","startRight",null,null,null),
	getElements(document,"div","id","startLeft",null,null,null),
	getElements(document,"div","id","masterRight",null,null,null),
	getElements(document,"div","id","masterLeft",null,null,null),
	getElements(document,"input","id","name",null,null,null),
	getElements(document,"div","id","Welcome",null,null,null),
	getElements(document,"div","id","Visitors",null,null,null),
	getElements(document,"div","id","pageHeader",null,null,null),
	getElements(document,"div","id","topHeader",null,null,null),
	getElements(document,"div","id","logo",null,null,null),
	getElements(document,"div","id","leftSideBox",null,null,null),
	getElements(document,"div","id","leftAds",null,null,"/div[starts-with(@id,'ad')]"),
	getElements(document,"div","id","GruschelnAd",null,null,null),	// Gruschelwerbung
	getElements(document,"div","id","pageFooter",null,null,null),	// Untere Leiste
	getElements(document,"li",null,null,"a","boutique",null),		// mainnav "boutique"
	getElements(document,"li",null,null,"a","einstieg",null),		// mainnav "einstieg"
	getElements(document,"div","id","ShopLink",null,null,null),
	getElements(document,"div","id","rightAds",null,null,null),	// werbung rechts
	getElements(document,"object","id","FLASH_AD",null,null,null)	//  FLASH AD links
     );

/* do the processing... */
(function () {
	while (elements.length>0){	// while there are snapshot elements...
	    for (var i = 0; i < elements[0].length; i++) {
		if(elements[0])
			removeNode(elements[0][i]);	// hide it!
	    }
	    elements.shift();	// remove the element just processed!
	}	/* auto-click back-button after poke */
	if(window.location=="http://www.studivz.net/Gruscheln/Status/"){
		var backBtn=getElements(document,"input","class","fieldBtnSubmit",null,null,null)[0];
		var statusParagraph=getElements(document,"div","id","content",null,null,"/div/p")[0];
		if(statusParagraph)
			statusParagraph.innerHTML="Herzlichen Glückwunsch, das Gruscheln war erfolgreich!";
		if(backBtn)
			backBtn.click();
	}
})();

/* Function removeNode():void
  * @param elem:DOM-Element (required) - that's the node you want to get rid off!
  */
function removeNode(elem){
	elem.parentNode.removeChild(elem);
}

/* Function getElements():ORDERED_NODE_SNAPSHOT
  * @param scope:DOM-Element (required) - that's the context Node (e.g. document, iFrame where you want to look for your specific node
  * @param nodeName:String (required) - the nodeName (e.g. "div", "span" etc.) of the node you want to take care of
  * @params attType:String, attName:String (optional) - attribute-type (e.g. "id", "class") and attribute-content
  * @param xPathExpr1:String, strToFind:String (optional) - xPathExpr1 is where you want to find strToFind
  * @param xPathExprSuffix:String (optional) - suffix expression...
  * @returns Array filled with DOM-nodes
  */
function getElements(scope,nodeName,attType,attName,xPathExpr1,strToFind,xPathExprSuffix){
	var xPathExpr="//";
	if(nodeName)xPathExpr+=nodeName;
	if(attType&&attName)
		xPathExpr+="[starts-with(@"+attType+",'"+attName+"')]";
	if(xPathExpr1&&strToFind)
		xPathExpr+="[contains("+xPathExpr1+",'"+strToFind+"')]";
	if(xPathExprSuffix)
		xPathExpr+=xPathExprSuffix;
	var xPathEval=document.evaluate(xPathExpr, scope, null,
   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var result=new Array;
	for (var i = 0; i < xPathEval.snapshotLength; i++) {
		result.push(xPathEval.snapshotItem(i));	// push it!
	}
	return result;
}