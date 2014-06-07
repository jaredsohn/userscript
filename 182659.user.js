/*

TradeMe Clothing

A quick and dirty fix to show the clothing attributes


*/

// ==UserScript==
// @name           TradeMe Clothing
// @namespace      http://www.samkelly.co.nz/
// @include        http://www.trademe.co.nz/*
// @description    Shows clothing attributes
// @grant metadata
// ==/UserScript==


//The prototype for the callback function that allows me to remember what link I was loading!
Function.prototype.bind = function( thisObject ) {
	var method = this;
	var oldargs = [].slice.call( arguments, 1 );
	return function () {
		var newargs = [].slice.call( arguments );
		return method.apply( thisObject, oldargs.concat( newargs ));
	};
}

var allImgs, thisImg;

//First we load all the images of that little camera
allImgs = document.evaluate(
	"//div[@class='listingTitle']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);	    
	    
   
//Then we go through them one-by-one
for (var i = 0; i < allImgs.snapshotLength; i++) {
	thisImg = allImgs.snapshotItem(i);
	
	if (thisImg.childNodes[1].href.indexOf("clothing")>-1) {	
	
	var oReq = new XMLHttpRequest();
	
	
    //oReq.open("GET","http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22"+ thisImg.childNodes[1].href +"%22%20and%20xpath%3D'%2F%2Ftable'",true);

	oReq.open("GET", thisImg.childNodes[1].href);
	oReq.addEventListener("load", addAttr.bind({myNode:thisImg.parentNode.parentNode}), false);

	oReq.send();
	
	}
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}


//Get the attributes
function addAttr(rD) {

	var itemDetailsPage = document.createElement('div');
	itemDetailsPage.innerHTML = rD.target.responseText;
	
	var sizeCloth = itemDetailsPage.getElementsByTagName('table');
	
	if (sizeCloth.length>0){
	var valSizeC = 0
	
	while (valSizeC<sizeCloth.length && sizeCloth[valSizeC].id!="ListingAttributes"){
	valSizeC++;
	};
	
	
	if (valSizeC<sizeCloth.length){
	
    	var newNode = document.createElement('div');
	
	//var attr1 = sizeCloth[valSizeC].childNodes[1].childNodes[0].childNodes[3].childNodes[1].innerHTML
	var attr1 = sizeCloth[valSizeC].childNodes[1].childNodes[0].childNodes[3].innerHTML
	newNode.innerHTML = "<br/><br/>"+attr1
		
		
	if (sizeCloth[valSizeC].childNodes[1].childNodes[2]!=null){
    	//var attr2 = sizeCloth[valSizeC].childNodes[1].childNodes[2].childNodes[3].childNodes[1].innerHTML
    	var attr2 = sizeCloth[valSizeC].childNodes[1].childNodes[2].childNodes[3].innerHTML
    	newNode.innerHTML = newNode.innerHTML.trim()+", "+attr2
    }
		
		
newNode.style.fontWeight = "bold"
newNode.style.marginTop = "0.5em"

this.myNode.childNodes[3].appendChild(newNode)
}
}

}
