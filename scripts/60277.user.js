// ==UserScript==
// @name           Looki-Forum Script
// @namespace      http://beeger.name
// @description    Packt Avatare Benutzernamen usw wieder neben die Posts, vergrÃ¶ÃŸert das Eingabefeld und macht das Forum wieder breit.
// @include       http://looki.de/forum/*
// @include       http://www.looki.de/forum/*
// ==/UserScript==
function xpath(expr){
	var res = document.evaluate(expr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return res;
}
var xExp = "/html/body/div[@id='Seite']/div/div/div/form[@id='inlinemodform']/div[@id='posts']/div/table[@class='tborder']/tbody";
var alltd = xpath(xExp+"/tr/td[@class='thead']");
for(var i = 0;i < alltd.snapshotLength ; i++){
	tmp = alltd.snapshotItem(i);
	tmp.setAttribute("colspan",2);
}
alltd = xpath(xExp+"/tr/td[@class='alt2']");
for(var i = 0;i < alltd.snapshotLength ; i++){
	tmp = alltd.snapshotItem(i);
	//RauslÃ¶schen
	var tmp2 = tmp.parentNode;
	td2 = tmp2.removeChild(tmp);
	td2.innerHTML = td2.innerHTML.replace(/<td width=.{1}100.{2}>&nbsp;<.{1}td>/ ,"</tr><tr>").replace(/nowrap=.{1}nowrap.{1}/ ,"");
	td2.innerHTML = td2.innerHTML.replace(/><.{1}a><.{1}td>[ \t\n\r]+<td>[ \t\n\r]+<div id=.{1}postmenu_/ ,"></a></td></tr><tr><td><div id=\"postmenu_");
	td2.setAttribute("width","180px");
	//td mit dem Post holen
	var zieltr = tmp2.nextSibling.nextSibling;
	//und da einfÃ¼gen
	zieltr.insertBefore(td2,zieltr.firstChild);
}
//GrÃ¶ÃŸeres Eingabefeld
table = document.getElementById('vB_Editor_001');
if(table != null){
table.setAttribute('style','position:absolute;left: 5%; width:90%');
mainTable= table.parentNode.parentNode.parentNode;
mainTable.setAttribute('style','height:550px;');
smilies = document.getElementById('vB_Editor_001_smiliebox').parentNode;
smilies.setAttribute('style','width:100px;');
textarea = document.getElementById('vB_Editor_001_textarea');
textarea.removeAttribute('cols',0);
textarea.setAttribute('style','display: block; width: 100%;height:500px');
}

var css = "";
if (false || (document.location.href.indexOf("http://looki.de/forum/") == 0))
	css += "div#cr { \n  display: none !important;\n}\n\ndiv#cl { \n  width: 100% !important;\n}\n\n.tborder { \n  width: 99% !important;\n}\n\ndiv#Seite { \n  width: 97% !important;\n}";
if (false || (document.location.href.indexOf("http://www.looki.de/forum/") == 0))
	css += "div#cr { \n  display: none !important;\n}\n\ndiv#cl { \n  width: 100% !important;\n}\n\n.tborder { \n  width: 99% !important;\n}\n\ndiv#Seite { \n  width: 97% !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
	}
}