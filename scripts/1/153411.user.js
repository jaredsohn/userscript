// ==UserScript==
// @name          LoL spam bot
// @namespace     NOU.com
// @include       https://docs.google.com/spreadsheet/*
// ==/UserScript==

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
			}
		}
	}
	return arrReturnElements;
}
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var rand = Math.floor((Math.random()*35)+1);
    for( var i=0; i < rand; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function Bot()
{
	if(window.location.toString().toLowerCase().indexOf("https://docs.google.com/spreadsheet/viewform?formkey=dHY1alFBSHlRZ1NMZmxJaUZ3V21CcGc6MQ".toLowerCase()) != -1)
	{
		if(getElementsByAttribute(document, "*", "value", "Submit") == undefined)
		{
			window.location = "https://docs.google.com/spreadsheet/viewform?formkey=dHY1alFBSHlRZ1NMZmxJaUZ3V21CcGc6MQ";
		}
		var rand = Math.floor((Math.random()*16)+1);
			document.getElementById("group_0_"+rand).click();
			
		rand = Math.floor((Math.random()*10)+1);
			document.getElementById("group_1_"+rand).click();
			
			rand = Math.floor((Math.random()*10)+1);
			document.getElementById("group_3_"+rand).click();
			
			rand = Math.floor((Math.random()*5)+1);
			document.getElementById("group_5_"+rand).click();
			
			rand = Math.floor((Math.random()*4)+1);
			document.getElementById("group_6_"+rand).click();
			
				rand = Math.floor((Math.random()*10)+1);
			document.getElementById("group_8_"+rand).click();
			
				rand = Math.floor((Math.random()*10)+1);
			document.getElementById("group_9_"+rand).click();
			
				rand = Math.floor((Math.random()*2)+1);
			document.getElementById("group_11_"+rand).click();
			
					rand = Math.floor((Math.random()*2)+1);
			document.getElementById("group_12_"+rand).click();
			document.getElementById("entry_13").value= makeid();
			
			
			getElementsByAttribute(document, "*", "value", "Submit")[0].click();
	}
	else if(window.location.toString().toLowerCase().indexOf("https://docs.google.com/spreadsheet/formResponse?formkey=dHY1alFBSHlRZ1NMZmxJaUZ3V21CcGc6MQ".toLowerCase()) != -1)
	{
		document.getElementsByClassName("ss-actions-link")[0].click();
	}
}

 (document.onload = function Loop() {
        var rand = Math.floor((Math.random()*100)+ 200);
        setTimeout(function() {
                Bot();
                Loop();  
        }, rand);
    }());