// ==UserScript==
// @name           DB neue Anfrage
// @namespace      *
// @include        http://reiseauskunft.bahn.de/bin/query.exe/*
// ==/UserScript==
unsafeWindow.onload=function(){
	var neueAnfrageLink="http://reiseauskunft.bahn.de/bin/query.exe/dn?rt=1";
	var neueAnfrage=getElements(document,"td","class","hafasContent","p[3]","Code: F1",null);
	var neueAnfrageButton=getElements(document,"a","href",neueAnfrageLink,null,null,null);
	if(neueAnfrage[0]&&neueAnfrageButton[0]){
		unsafeWindow.location=neueAnfrageLink;
	}
}


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