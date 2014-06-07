// ==UserScript==
// @name           edarling
// @namespace      edarling.de
// @include        https://www.edarling.de/*
// ==/UserScript==

var allDivs, i, rawhtml, myobj;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.relationsList > .shadowBox {height: 192px !important; margin-bottom: 5px !important;}');
addGlobalStyle('.pa-card-user-infos {padding-left: 100px !important; width: 330px !important;}');

if (location.href.indexOf("matches") != -1)
{
	addGlobalStyle('.pa-card-cstat-title {margin: 10px 0 0 -37px;}');
	addGlobalStyle('.pa-card-cstat-progress {margin: 0 0 0 -37px !important;}');
	addGlobalStyle('.pa-card-cstat-date {margin: 0 0 0 -37px;}');
}
else
{
	addGlobalStyle('.pa-card-cstat-title {margin: 10px 0 0 -42px;}');
	addGlobalStyle('.pa-card-cstat-progress {margin: 0 0 0 -42px !important;}');
	addGlobalStyle('.pa-card-cstat-date {margin: 0 0 0 -42px;}');

}

addGlobalStyle('');

allDivs = document.evaluate(
    "//a[@class='jPreventClickForwading']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	
for (i = 0; i < allDivs.snapshotLength; i++) {

	rawhtml = allDivs.snapshotItem(i).innerHTML.toString();
	myobj = allDivs.snapshotItem(i);
	
	if ((rawhtml.match(/background-image/g) != null) && rawhtml.match(/silhouettes/g) == null ) {

		rawhtml = rawhtml.replace("width:44px;height:53px;", "width:148px;height:178px;");
		myobj.innerHTML = rawhtml.replace("/0/9/", "/0/3/");
	}
	

}
