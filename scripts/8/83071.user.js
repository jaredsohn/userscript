// ==UserScript==
// @name          GMail Character Counter
// @namespace     http://userscripts.org/users/202605
// @description   Counts and displays the number of characters in GMail message composition
// @include       http*://mail.google.com/*
// ==/UserScript==

if(document.querySelector('body.editable.LW-yrriRe').id){
    var textID = document.querySelector('body.editable.LW-yrriRe').id; //ID for the text message using className as identifier
    var plainTextButton = parent.document.querySelector('span.eo.el'); //The button for "« Plain Text" using className as identifier

    var charDisp = createSpan();  //This is a span element
    updateCount();
    document.getElementById(textID).addEventListener("DOMCharacterDataModified", updateCount, false);	
    
}
function updateCount(){
    var num = document.getElementById(textID).textContent.length;
    if(document.getElementById(textID).textContent.indexOf("\n")==-1){
        charDisp.innerHTML=num;
        if(160<num) charDisp.className = "eo ew";
        else charDisp.className = "eo";
    }else{
        charDisp.innerHTML= num-1;
        if(160 < num-1) charDisp.className = "eo ew";
        else charDisp.className = "eo";
    }
}

function createSpan(){
   	var spanTag = document.createElement("span");
	spanTag.innerHTML = "Character Counter:";
	spanTag.className = "eo";
	
    plainTextButton.parentNode.appendChild(spanTag);
    
   	var spanTag2 = document.createElement("span");
   	
    return spanTag.parentNode.appendChild(spanTag2);
}

