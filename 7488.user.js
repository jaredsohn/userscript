// ==UserScript==
// @namespace     http://t3knomanser.livejournal.com/fark/adfree
// @name          Ad Free Fark
// @description   This gets rid of the ugly sidebars full of stuff I don't care about and makes them go away. If you use TotalFark, this script as written will make some links go away.
// @include       http://*.fark.com
// ==/UserScript==
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

var adBars = getElementsByClassName(document, "td", "newtoolbar");
for (i = 0; i < adBars.length; i++)
{
	adBars[i].parentNode.removeChild(adBars[i]);
}
//.user.js