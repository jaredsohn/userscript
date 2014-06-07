// ==UserScript==
// @name           ReplaceTextAnywhere
// @namespace      faleijTest
// @description    Replace Text Anywhere by selecting it and Pressing Shift+X
// @include        *
// ==/UserScript==
function getSelText()
{
    var txt = "";
     if (window.getSelection)
    {
        txt = window.getSelection();
             }
    else if (document.getSelection)
    {
        txt = document.getSelection();
            }
    else if (document.selection)
    {
        txt = document.selection.createRange().text;
    }
    else return;
	return txt;
}

function replaceText(){
	var text = getSelText(); //get selection
	var nodeText = text.focusNode.textContent; //get node and its text node of selection
	var replaceText = prompt("Rewrite the text below",text); //prompt for new text
	if(replaceText)
    	text.focusNode.textContent = nodeText.replace(text,replaceText); //Replace selections text content with our replaceText, we can't use "nodeText =" for some reason
}


//registrer hotkey
var isShit=false;
document.onkeyup=function(e) {
    if(e.which == 16)
        isShift=false;
}

document.onkeydown=function(e){
    if(e.which == 16)
        isShift=true;
    if(e.which == 88 && isShift == true) {
         replaceText();
         return false;
    }
}