// ==UserScript==
// @name          BT Monkey Format
// @namespace     http://www.ts0.com/
// @description   Add microformats to the BT directory searches
// @include       http://*.thephonebook.bt.com/*
// ==/UserScript==



records = getElementsByClassName(document,"div","record")

searchHeader = document.getElementById("SearchHeaderOptions");

var type = "";

if(searchHeader)
{
    switch (searchHeader.getElementsByTagName("strong")[0].textContent)
    {
        case "Business type":
        case "Business name":
            type = "business";
            break;
        case "Residential name":
            type = "residential";
            break;
    }
}

if(type!="")
{

for(x in records)
{
    record=records[x];
    
    record.className += " vcard";
    
    if(type=="business")
        nameClasses = " org fn";
    else
        nameClasses = " fn";
    
    getElementsByClassName(record,"div","recordTitle")[0].className += nameClasses;
    
    elTel = getElementsByClassName(record,"span","phone")[0];
    elTel.innerHTML = "Tel: <span class=\"tel\">"+elTel.textContent.substring(elTel.textContent.indexOf(":")+1)+"</span>";
    
    insideDivs = record.getElementsByTagName("div");
    elAddress = insideDivs[insideDivs.length-1];
    
    mapLink = elAddress.innerHTML.split(" - ")[1];
   
    strAddress = elAddress.textContent.substring(0,elAddress.textContent.length-6).replace(/\. /g,", ")
    aryAddress = strAddress.split(", ")
    
    recordTitles = getElementsByClassName(record,"div","recordTitle");
    if (recordTitles.length > 1)
    {
        aryAddress.unshift(recordTitles[1].textContent);
        recordTitles[1].parentNode.removeChild(recordTitles[1])
    }
    
    newAdd = document.createElement('div');
    
    if(aryAddress.length == 2)
    {
        newAdd.innerHTML += "<span class=\"street-address\">"+aryAddress[0]+"</span>, ";
        newAdd.innerHTML += "<span class=\"postal-code\">"+aryAddress[1]+"</span>";
    }
    else
    {
        newAdd.innerHTML += "<span class=\"street-address\">"+aryAddress.slice(0,aryAddress.length-2).join(", ")+"</span>, ";
        newAdd.innerHTML += "<span class=\"locality\">"+aryAddress[aryAddress.length-2]+"</span>, ";
        newAdd.innerHTML += "<span class=\"postal-code\">"+aryAddress[aryAddress.length-1]+"</span>";
    }
    
    newAdd.innerHTML += " - "+mapLink;
    
    newAdd.className = "adr";
    
    elAddress.parentNode.replaceChild(newAdd, elAddress);
}
}


function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}


