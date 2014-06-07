// ==UserScript==
// @name           Digg Inversion 1.0
// @namespace      http://diggrocksdon.tyouknow.yeah/woot
// @description    Invert everyone's diggs! If you are feeling down, lonley or unwanted, this lets you think that everyone is giving you the thumb up!
// @include        *digg.com/*
// ==/UserScript==

var myScript = function(){
	var xpathResult = document.evaluate('//div[@class = "c-diggs"]/span', document, null, 0, null);
	var outArray = new Array();
		while ((outArray[outArray.length] = xpathResult.iterateNext())) {
	}
	var i=0;var j=outArray.length;
	for(i=0;i<j;++i){
		if(outArray[i].id!=""){
			switch(outArray[i].innerHTML[0]){
			case "+":
				outArray[i].innerHTML="-"+outArray[i].innerHTML.split("+")[1];
				break;
			case "-":
				outArray[i].innerHTML="+"+outArray[i].innerHTML.split("-")[1];
				break;
			};
		}
	}
}
myScript();