// ==UserScript==
// @name           sportsmansguide per round
// @namespace      http://jobson.us/
// @description    Calculates the per-round cost for ammo at the sportsmans guide.
// @include        http://www.sportsmansguide.com/net/browse/browseammo.aspx*
// ==/UserScript==

var t = document.getElementById('ctl00_cphMain_ucBrowseCategoryLinkList_ucBrowseItems_dtlItemsImage');

var items = document.getElementsByTagName('table');

var re = new RegExp('(\\d*,{0,1}\\d+)\\s{0,1}-*\\s*(rds|RNDS)','i');

for (var i=0;i<items.length;i++) {
	if (items[i].getElementsByTagName('tr').length!=9) continue;
	var desc = items[i].getElementsByTagName('a')[1].innerHTML;
	if (!re.test(desc)) continue;
	var rnds = parseFloat(desc.match(re)[1].replace(/,/g,''));
	var stPr = parseFloat(items[i].getElementsByTagName('span')[0].innerHTML.split('$')[1]);
	var clPr = parseFloat(items[i].getElementsByTagName('span')[1].innerHTML.split('$')[1]);
	
	var stPr = ' <span style="font-size:8px;">('+ Math.round(stPr/rnds*1000)/10 +'\u00A2)</span>';
	var clPr = ' <span style="font-size:8px; color: magenta;">('+ Math.round(clPr/rnds*1000)/10 +'\u00A2)</span>';
	
	items[i].getElementsByTagName('span')[0].innerHTML += stPr;
	items[i].getElementsByTagName('span')[2].innerHTML += clPr;
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
