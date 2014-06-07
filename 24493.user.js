// ==UserScript==
// @name          Aldebaran: read offline
// @include       http://lib.aldebaran.ru/author/*/*/*
// ==/UserScript==
// Version: 0.2
// License: GPL
// Written by sdio (http://www.linux.org.ru/whois.jsp?nick=sdio)

//open book's url, for example http://lib.aldebaran.ru/author/dick_philip/dick_philip_a_scanner_darkly/
// click a link "Читать книгу: ", look how many parts are in content, (17 for "scanner_darkly")
// go back, enter 17 in "Num:" field and click "Start".

const TCLEAN  = 15000; // 15 sec
const TIFRAME = 10000; // 10 sec
const TFINISH = 30000; // 30 sec

var ad;
var ap;
var base;
var smaxidx;

if (document.location.href.match("^.*/$")) {
		var read = $xFirst("//td[@class='kol2']//strong[text()='Читать книгу:']");
		read = read.nextSibling;
		while (read.nodeName != 'STRONG') {
			read = read.nextSibling;
		}
		read.id = "urlhere";
		var div = document.createElement("div");
		read.appendChild(div);
		div.innerHTML = 'Num: <input id="innum" size="4" type="text" /> <input type="button" value="Start" onClick="startgrab()" />';
			
} else if (document.location.href.match("^.*\.html$"))  {
	unsafeWindow.setTimeout("cleanup()", TCLEAN);
}

unsafeWindow.startgrab = function(){
		base    = $('urlhere').firstChild.href.replace(/_0\.html$/, '_');
		smaxidx = $('innum').value;
		unsafeWindow.setTimeout("openiframe('" + 0  + "')", 1000);
}

unsafeWindow.openiframe = function(sidx){
		var url = base + sidx + '.html';
		var a = document.createElement("div");
		document.body.appendChild(a);
		a.innerHTML = sidx + ': <iframe id="frame' + sidx + '" width="1000" src="' + url + '">';
		if (smaxidx - sidx) {
			sidx++;
			unsafeWindow.setTimeout("openiframe('" + sidx  + "')", TIFRAME);
		} else {
			unsafeWindow.setTimeout("getalltext('" + smaxidx  + "')", TFINISH);
		}
}

unsafeWindow.getalltext = function(max){
	var af = $x("//div/iframe");
	var str = "";
	if (af.snapshotLength) {
			for (var i=0; i < af.snapshotLength; i++){
				var dv = af.snapshotItem(i).contentDocument.lastChild.lastChild.lastChild;
				str = str + dv.innerHTML;
			}
			document.body.innerHTML = "<div>" + str + "</div>";
	}
}

unsafeWindow.cleanup = function(){
    var dd = $xFirst("//div[@class='read']");
    var ee = $x(".//span[@class='h'] | .//div[@class='content']", dd)
    for (var i=0; i<ee.snapshotLength; i++){
        var e = ee.snapshotItem(i);
        e.parentNode.removeChild(e);
    }
    var str = dd.innerHTML;
    document.body.innerHTML = "<div>" + str + "</div>";
}

// common functions
function $(id) {return document.getElementById(id);}

function $x(xpath, contextNode, resultType) {
    contextNode = contextNode || document.body;
    resultType = resultType || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
    return document.evaluate(xpath, contextNode, null, resultType, null);
}

function $xFirst(xpath, contextNode) {
    var xpr = $x(xpath, contextNode, XPathResult.FIRST_ORDERED_NODE_TYPE);
    return xpr.singleNodeValue;
}

function $xLast(xpath, contextNode) {
    var xpr = $x(xpath, contextNode);
    return xpr.snapshotItem(xpr.snapshotLength - 1);
}

