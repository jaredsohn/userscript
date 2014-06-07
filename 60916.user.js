// ==UserScript==
// @name           Check the highest oil amount by default
// @namespace      http://www.rivality.se
// @description    Check the highest oil amount by default
// @include        http://www.rivality.se/Index.asp?p=building&id=4
// ==/UserScript==

var inputs = document.getElementsByTagName('input');
var pageDefault = 60;
var maxValue = 60;
var sixtyNode = null;
var maxNode = null;

	//loop the first time to get the max oil I can sell and bookmark the two nodes.
for(i = 0 ; i < inputs.length ; i++ ){
	if(inputs[i].type=='radio' && !inputs[i].disabled){
		if(inputs[i].value==pageDefault){
	  		sixtyNode = inputs[i];
	  	}
		if(inputs[i].value>maxValue){
	  		maxValue = inputs[i].value;
	  		maxNode = inputs[i];
	  	}
	}
}
	// if sixtynode is null, I can't sell any oil
	// if maxNode is null, then I can only sell 60 barrels
	// in either case, don't do anything.
if(sixtyNode!=null && maxNode!=null){
		// then change the checked state
	sixtyNode.checked=false;
	maxNode.checked=true;
}