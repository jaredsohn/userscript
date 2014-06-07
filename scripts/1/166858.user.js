// ==UserScript==
// @name        I am going to Ente Isla the shit out of you
// @namespace   http://userscripts.org/users/516475
// @description Translated between Ente Isla-speak and English.
// @include     http://boards.4chan.org/a/res/*
// @include     https://boards.4chan.org/a/res/*
// @grant       none
// @version     1
// ==/UserScript==
var alpha_eng = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var alpha_ente = "AZYXEWVTISRQPNOMLKJHUGFDCBazyxewvtisrqpnomlkjhugfdcb";

function tranchar(c_eng){
    var x = alpha_eng.indexOf(c_eng);
    if( x == -1 ){
        c_ente = c_eng;
    }else{
        c_ente = alpha_ente.charAt(x);
    }
    return(c_ente);
}

unsafeWindow.translate = function(qr){
	var targetElement = document.querySelectorAll(qr)[0];
    var eng = getValue(targetElement);
    var ente = "";
    var bracketCount = 0;
	var escapeCount = 0;
	var doChecks = targetElement.type !== "textarea";
    
    for(var i = 0 ; i < eng.length ; i++){
        var inCh = eng.charAt(i);
        
		if (doChecks) {
			if (inCh === "<")
				bracketCount++;
			else if (inCh === ">")
				bracketCount--;
			else if (inCh === "&") {
				var res = eng.substring(i).match(/&[a-z]{2,10};.*/);
				if (res)
					escapeCount++;
			}
			else if (inCh === ";" && escapeCount > 0)
				escapeCount--;
		}
		
		if (bracketCount === 0 && escapeCount === 0)
			ente += tranchar(inCh);
		else
			ente += inCh;    
	}	
    setValue(targetElement,ente);
}

function getValue(targetElement) {
	return (targetElement.type === "textarea") ? targetElement.value : targetElement.innerHTML;
}
function setValue(targetElement, val) {
	if (targetElement.type === "textarea")
		targetElement.value = val;
	else
		targetElement.innerHTML = val;
}

function createButton(targetId){
    var element = document.createElement("a");
    element.setAttribute("class", "translateToEnteIsla");
	element.setAttribute("href","javascript:translate('" + targetId + "');");
	element.innerHTML = "[¤]";
    return element;
}

function keyEvtListMaou(e){
    if(e.altKey && e.keyCode == 88) { // Was Alt + X pressed?
        var txa = document.getElementById("qr").getElementsByTagName("textarea")[0];
        var eng = txa.value;
        var ente = "";
        for(var i = 0 ; i < eng.length ; i++){
            ente += tranchar(eng.charAt(i));
        }
        txa.value = ente;
    }
}

var previousCount = 0;
function addTranslateItemsIfNotPresent() {
	var elements = document.querySelectorAll(".postInfo");
	
	addQuickReplyButton();
	
	if (previousCount === elements.length)
		return;
	else
		previousCount = elements.length;
	
	console.log("aaa");

	for(var i = 0; i < elements.length; i++){
		if (elements[i].querySelectorAll(".translateToEnteIsla").length === 0) {	
			var btn = createButton("#m" + elements[i].getElementsByTagName("input")[0].name);
			btn.setAttribute("style","margin-left:5px;");
			elements[i].appendChild(btn);
		}
	}
}

function addQuickReplyButton() {
	// add translate button for quick reply
	var qrHeader = document.getElementById("qrHeader");
	if (qrHeader == null)
		return;
	if (qrHeader.querySelectorAll(".translateToEnteIsla").length !== 0)
		return;	
	var btn = createButton("#qrForm textarea");
	btn.setAttribute("style","margin-right:5px;");
	qrHeader.insertBefore(btn,qrHeader.firstChild);
}

// add translate buttons for posts
addTranslateItemsIfNotPresent();
document.addEventListener("DOMNodeInserted",function() { addTranslateItemsIfNotPresent() });
