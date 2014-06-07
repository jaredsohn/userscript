// ==UserScript==
// @name			Explio  antwoord
// @namespace		antwoord
// @description		Helps 
// @version			0.1
// @include			http://ace.explio.com/*
// @include			https://ace.explio.com/*
// @include			http://*.explio.com*
// @include			https://*.explio.com*
// @copyright		 2010 Copyrighted parts may not be reproduced without written consent
// ==/UserScript==
function TEST(){
	//window.addEventListener("mousemove",runTest);
	var oStyle = document.createElement('script');
	oStyle.type = "text/javascript";
	oStyle.innerHTML = ' function TextItemSetFinal(finalText) '+
		'{ // if (this.displayAnswer != "true")    { '+
       	'finalText = encrypt(( (finalText != "") ? "&nbsp;[" + finalText + "]" : "")); '+
		'document.write(finalText);'+
    	'}(this.isLetterGap) ? HTMLChildNodesItem(this,0).innerHTML = boxfinalText : HTMLChildNodesItem(this,1).innerHTML = finalText;';
	document.getElementsByTagName('head')[0].appendChild(oStyle);
	document.body.appendChild(oStyle);
	
	
	//setTimeout(TEST2,2000);
	
}
function check(item){
	try{
		if(item){
		item.innerHTML = "OK";
		}
	return true;
	}
	catch (e){
		return false;
	}
}
	
function TEST2()
{
	
	// exlude = maps item id's to spans = each item
	// in there, is NOT considered as being a potential
	// candidate to be solved with the value.
	
	// returns true if all text items that have this value as final
	// or correct alternative,
	// are locked (in which case the value may be
	// striked through in the word list)
	var items = document.getElementsByTagName("INPUT");
	if(items.length!=0){
	  for(i = 0; i < items.length; i++) {
		  if(!check(items.item(i))){
			  alert("FOUT");
		  }
	  }
	}else{
	//alert("GEEN elementen:" + items.length);	
	}
	 
	//alert(decrypt("%26ACGz%5BeTRJP%3BzhhruroeLuwxJ6q%3B7OXf%5D%26odBr/"));

	//var items	= TkExerciseItems();
	
	for (var i = 0; i < items.length; i++)
	{
		alert(i);
		var item	= items[i];
		var input	= HTMLChildNodesItem(item,0);
		var c		= HTMLChildNodesItem(item,1);
		input.innerHTML = decrypt(c.innerHTML) 
	}
	//alert("EINDE");
}
window.addEventListener("load" ,TEST ,false);