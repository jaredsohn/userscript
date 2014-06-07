// ==UserScript==
// @name           UseHandCursor - use handcursor for all links and buttons!
// @namespace      *
// @include        *
// ==/UserScript==

/* NO CHANGES BELOW UNLESS YOU KNOW WHAT YOU ARE DOING!!! */
var serverURL="http://www.usability-online.com/assets/css/";
var scripts = [
	'http://www.usability-online.com/assets/script/html-xpath.js'
];
var styles = [
	serverURL+'usehandcursor.css'
];

(function() {
	for (i in styles) {
		var style = document.createElement('link');
		style.setAttribute("rel","stylesheet");
		style.href = styles[i];
		document.getElementsByTagName("head")[0].appendChild(style);
	}
	for (i in scripts) {
	    var script = document.createElement('script');
	    script.src = scripts[i];
	    document.getElementsByTagName('body')[0].appendChild(script);
	}
	unsafeWindow.addEventListener("load", initHC, false); 
})(); // end anonymous function wrapper

function initHC(){
	var allIframes=getElements(document,'iframe',null,null,null,null);
	try{
		for(var i=0;i<allIframes.length;i++){
			var currFrameDocument=allIframes[i].contentDocument;
			var currFrameHead=getElements(document,'head',null,null,null,null)[0];
			var currFrameBody=getElements(document,'body',null,null,null,null)[0];
			if(currFrameBody&&currFrameHead){
				currFrameBody.onload=function(){
					var style = document.createElement('link');
					style.setAttribute("rel","stylesheet");
					style.href = styles[i];
					currFrameHead.appendChild(style);
				}
			}
		}
	}catch(exception){}
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