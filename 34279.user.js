// ==UserScript==
// @name	Altera o layout do Forum MacPress
// @namespace	http://macpress.uol.com.br/forum
// @author	Stealer
// @description	Altera o layout do Forum MacPress
// @include	http://*macpress.uol.com.br/forum*
// ==/UserScript==

(function() {

	var eliminaEstilos = function() {
		estilos = document.getElementsByTagName('style');
		totalEstilos = estilos.length;
		for(i=0; i < totalEstilos; i++) {
			estilos[i].innerHTML = '';
		}
	}

	var eliminaTagDeLink = function () {
		links = document.getElementsByTagName('link');
		totalLinks = links.length;
		for(i=0; i < totalLinks; i++) {
			links[i].setAttribute("href", "");
		}
	}
	
	var eliminaUolBar = function () {
		try {
			uolbar = document.getElementById('uolbar');
			uolbar.innerHTML = '';
		} catch (er) {}
	}
	
	var eliminaAtributo = function (varTag, varAttribute) {

		tds = document.getElementsByTagName(varTag);
		totalTds = tds.length;
		for(i=0; i < totalTds; i++) {
			tds[i].removeAttribute(varAttribute);
		}
	}

	var criaZebraStripes = function (varTag, varDe, varAte) {
		trs = document.getElementsByTagName('tr');
		totalTrs = trs.length;
		for(i=varDe; i < totalTrs && i < varAte; i++) {
			if ((i % 2) == 0) {
				trs[i].setAttribute("class", "row1");
			} else {
				trs[i].setAttribute("class", "row2");
			}
		}
	}
	
	var defineTagClass = function (varTag, varPosition, varClass)  {
		var varObject = document.getElementsByTagName(varTag)[varPosition];
		if (varObject) {
		varObject.setAttribute("class", varClass);
		
		return varObject;
		} else { return;}
		
	}

	eliminaEstilos();
	eliminaTagDeLink();	
	eliminaUolBar();	

	eliminaAtributo("td", "class");
	eliminaAtributo("td", "height");
	eliminaAtributo("td", "width");

	criaZebraStripes('tr', 5, 80);

	tableHeader       = defineTagClass("table", 02, "tableHeader");
	tableBackground   = defineTagClass("table", 03, "tableBackground");
	tableTopicos 	  = defineTagClass("table", 04, "tableTopicos");
	tableCorpoTopicos = defineTagClass("table", 10, "tableCorpoTopicos");
	tableTItens  	  = defineTagClass("table", 06, "tableTItens");
	tableAdAbaixoMenu = defineTagClass("table", 07, "tableAdAbaixoMenu");
	tableAdAbaixoMenu.innerHTML = "";
	
	menuForum         = defineTagClass("table", 09, "menuForum");
	tabletopicosH     = defineTagClass("table", 11, "tabletopicosH");

	tablefinal   	  = defineTagClass("table", 13, "tablefinal");

	if ( document.URL.indexOf('viewtopic') == -1 ) {

	} else if ( document.URL.indexOf('newposts') > 0 ) {

	}

	tableCorpoTopicosCorpo = tableCorpoTopicos.childNodes[1].childNodes[0].childNodes[0];
	tableCorpoTopicosCorpo.setAttribute("class", "tableCorpoTopicosCorpo");

try {
	tableTItens[0] = tableTItens.childNodes[1].childNodes[0].childNodes[2].innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
	tableTItens[1] = tableTItens.childNodes[1].childNodes[0].childNodes[6].innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
	tableTItens[2] = tableTItens.childNodes[1].childNodes[0].childNodes[10].innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
	tableTItens[3] = tableTItens.childNodes[1].childNodes[0].childNodes[14].innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
	tableTItens[4] = tableTItens.childNodes[1].childNodes[0].childNodes[18].innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
	tableTItens[5] = tableTItens.childNodes[1].childNodes[0].childNodes[22].innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
	tableTItens[6] = tableTItens.childNodes[1].childNodes[0].childNodes[26].innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
	tableTItens[7] = tableTItens.childNodes[1].childNodes[0].childNodes[30].innerHTML.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
} catch(er) {}

tableTopicos.innerHTML = "<div id='menu'><ul>\n";
for(i=0;i<8;i++) {
	if (tableTItens[i]) {
		tableTopicos.innerHTML = tableTopicos.innerHTML + "	<li class='topicItem'>" + tableTItens[i] + "</li>\n";
	}
}
tableTopicos.innerHTML = tableTopicos.innerHTML + "</div></ul>\n";


head = document.getElementsByTagName('head')[0];
	if (head)
	{
		style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML =
	
			'* { font-size: 12px; font-family: "Lucida Grande",Geneva,Arial,Verdana,sans-serif; }\n' +
			'body { margin: 0px 30px 0px 30px; background: #3D3D3D repeat-x url("http://macpress.uol.com.br/forum/album_pic.php?pic_id=1720"); background-position: 0 -23px; } ' +
			'a       {color: black;}' + 
			'a:hover {color: red; text-decoration: underline;}' +
			'#uolbar {display: none;}' +
			'.subtitle { color: #6688aa; font-size: 22px; } ' +
			'.small { color: #6688aa; font-size: 12px; }' +
			'img { border: none; }' +
			'table { width: 100%; padding: 0px; margin: 0px; border: 0px; border-collapse: collapse;}\n' +
			'.tableHeader { background-color: white; }\n' +
			'.tabletopicosH { margin-bottom: 5px; color: silver; background:#f3f3f3; }\n' +
			'.tabletopicosH a { color: silver; }\n' +
			'.tabletopicosH a:hover { color: gray;}\n' +
			'.tabletopicosH .row1 { background:black; }\n' +
			'.tabletopicosH .row2 { background:black; }\n' +
			'.topicItem { list-style-type: none; float: left; padding: 0px 10px 10px 10px; }' +
			'.topicItem a { padding: 10px 5px 10px 5px; }' +
			'.topicItem a:hover { width: 30px; background:black; color: white; margin: 0px; padding: 10px 5px 10px 5px; }' +
			'.tableBackground { border-bottom: solid gray 1px; border-right: solid gray 1px; border-left: solid gray 1px; background: #000000 no-repeat url("http://macpress.uol.com.br/forum/album_pic.php?pic_id=1727"); background-position: 0px 0px; }\n' +
			'.tableBackground { color: white; }' +
			'.tableBackground a { color: white; }' +
			'.tableBackground a:hover { color: silver; }' +

			'.tableCorpoTopicos td { color: white; }' +
			'.tableCorpoTopicos td a { color: white; }' +
			'.tableCorpoTopicos td a:hover { color: silver; }' +
			'.tableCorpoTopicosCorpo { color:black; padding: 2px 15px 13px 15px; }' +
		
//			'.tableCorpoTopicos tr .row1 { background:#f3f3f3; }\n' +
//			'.tableCorpoTopicos tr .row2 { background:white; }\n' +

//			'.myTd { color: red; background:maroon; }\n' +
//			'.row1 { background:#f3f3f3; }\n' +
//			'.row2 { background:white; }\n' +

			'.menuForum { background: #CF9BBF;  }\n' +
			'.menuForum td { background: #CF9BBF;  }\n' +
			'.maintitle a { color: #6688aa; font-size: 22px; background: black; padding: 10px; margin: 0px; width: 100%; }\n' +
			'.maintitle a:hover { color: #354A5F; }\n' +

			'.tablebanner { background: red; } ' +

			'.forumline { color: white; background: white; }\n' +
			'.forumline th { padding: 5px; background: #5C2F4E; }\n' +
			'.forumline td { color: black; }\n' +
			'.forumline td a { color: black	; }\n' +
			'.forumline td a:hover { color: gray; }\n' +
			
			'.tablefinal { color: gray; }\n' +
			'.tablefinal a { color: gray; }\n' +
			'.tablefinal a:hover { color: silver; }\n' +			
			
			'.tabletopicos { padding: 10px 0px 10px 0px; background: black no-repeat url("http://macpress.uol.com.br/forum/album_pic.php?pic_id=1727");  }\n';
			
		head.appendChild(style)
	}
})();