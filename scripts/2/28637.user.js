// ==UserScript==
// @name           hatenaGraphSearch
// @namespace      jp.co.gara
// @include        http://graph.hatena.ne.jp/*/
// ==/UserScript==
(function () {

	document.getElementsByClassName = function (className) {
	    var i, j, eltClass;
	    var objAll = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all;
	    var objCN = new Array();
	    for (i = 0; i < objAll.length; i++) {
	        eltClass = objAll[i].className.split(/\s+/);
	        for (j = 0; j < eltClass.length; j++) {
	            if (eltClass[j] == className) {
	                objCN.push(objAll[i]);
	                break;
	            }
	        }
	    }
	    return objCN;
	}

	var prototype_js = document.createElement("script");
	prototype_js.type = "text/javascript";
	prototype_js.src = "http://b.hatena.ne.jp/js/prototype-1.4.0.js";

	var gara_js = document.createElement("script");
	gara_js.type = "text/javascript";
	gara_js.innerHTML= " var di = document.getElementsByClassName(\'smallgraph\');\n"
	 + " execSearch = function (target) {"
	 + "	var graMain = document.getElementById(\'graphmain\');"
	 + "	while ( graMain.hasChildNodes() ) {"
	 + "		graMain.removeChild(graMain.firstChild);"
	 + "	}"
	 + " "
	 + "	target=document.getElementById(\'keyword\');"
	 + " "
	 + "	for (var i=0; i<di.length; i++) {"
	 + "		var name = di[i].childNodes[1].childNodes[0].innerHTML;"
	 + "		var reg = RegExp(target);"
	 + "		if (name.match(reg)) {"
	 + "			graMain.appendChild(di[i]);"
	 + "		}"
	 + "	}"
	 + " }\n"
     ;

	var head = document.getElementsByTagName("head")[0];
	head.appendChild(prototype_js);
	head.appendChild(gara_js);

	//初期のグラフ全取得。
	var di = document.getElementsByClassName('smallgraph');

	//検索ボタンの追加
	var addPoint = document.getElementById('breadcrumbs');

	addPoint.innerHTML = addPoint.innerHTML + 'Search<input type="text" id="keyword" onkeyup='
	 + '"var graMain = document.getElementById(\'graphmain\');'
	 + ' while(graMain.hasChildNodes()) { '
	 + '    graMain.removeChild(graMain.firstChild);'
	 + ' } '
	 + ' for (var i=0; i<di.length; i++) { '
	 + ' 	var name = di[i].childNodes[1].childNodes[0].innerHTML;'
	 + ' 	var reg = RegExp(this.value);'
	 + ' 	if (name.match(reg)) { graMain.appendChild(di[i]);}'
	 + ' }" />';

})();
