// ==UserScript==
// @name        Green Monster User Blocker
// @namespace   github.com/vernon-
// @version     0.1
// @description The selected users' comments won't appear in the forum threads of magiccafe.com .
// @include     http://www.themagiccafe.com/forums/viewtopic.php*
// @include     http://themagiccafe.com/forums/viewtopic.php*
// @copyright   2013
// ==/UserScript==

var peopleToBlock=["Harry Lorayne",
                   "Vlad77",
                   "Glenn Bishop"];

//takes down spaces in front and back of a string
String.prototype.killWS = function() {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

var fonts = document.getElementsByTagName("font");
for(var i = 0; i < fonts.length; i++) {
    for(var j = 0; j < peopleToBlock.length; i++){
    	if( fonts[i].innerHTML.killWS()==peopleToBlock[j].bold() )
    	{
       		toDelete=fonts[i].parentNode.parentNode;
        	toDelete.parentNode.removeChild(toDelete);
    	}
    }	
}