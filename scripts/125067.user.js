// ==UserScript==
// @name           SASS_Reg
// @namespace      BioRobots
// @include        http://sass.m35.coreserver.jp/addngid.html#*
// ==/UserScript==

var a = document.evaluate( "//input[@name='ngid']", document, null, 7, null );
var s= location.hash.match(/^#(?:ID:)?([\w+/]{8}[OPQiIo0])$/i);
if( s ){
	a.snapshotItem(0).value=s[1];
	////alert(s[1]);
	a.snapshotItem(0).parentNode.submit();
}else{
	alert(location.hash);
}


