// ==UserScript==
// @name           Profile Card Hover
// @namespace      http://userscripts.org/users/99461
// @description    Shows Profile Cards when hovering over user names on IP.Board v3 forums.
// @include        http://*thenexusforums.com*
// @include        http://forums.bethsoft.com*
// ==/UserScript==

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function createElement(type, attributes){
	var node = document.createElement(type);
		for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
		node.setAttribute(attr, attributes[attr]);
	}
	return node;
}

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements;
}

function next(elem) {
    do {
        elem = elem.nextSibling
    } while (elem && elem.nodeType != 1);
    return elem
}

embedFunction("function next(elem){do{elem=elem.nextSibling}while(elem&&elem.nodeType!=1);return elem}var hoverT;var hoverID;function vcardDelayShow(e){hoverID=e.id;hoverT=setTimeout('vcardShow(hoverID)',650)}function vcardShow(e){var ev=document.createEvent('MouseEvents');ev.initEvent('click',true,true);var n=next(document.getElementById(e));n.dispatchEvent(ev)}function vcardDelayHide(e){clearTimeout(hoverT);hoverID=e.id;hoverT=setTimeout('vcardHide(hoverID)',300);}function vcardHide(e){var ev=document.createEvent('MouseEvents');ev.initEvent('click',true,true);document.body.dispatchEvent(ev)}");


var a = document.getElementsByTagName('a');
for (var i = 0; i < a.length; i++){
	var n = next(a[i]);
	if(n && n.className.match(/.*user.*/)){
		//a[i].style.backgroundColor = "#8C0073";
		//a[i].style.color = "#6F80DE";
		a[i].id = a[i].href.match(/\d+/) + "_" + i;
		a[i].parentNode.innerHTML = a[i].parentNode.innerHTML.replace(/">/m, "\" onmouseover='vcardDelayShow(this)' onmouseout='vcardDelayHide(this)'>");
	}
}
