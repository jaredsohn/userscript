// ==UserScript==
// @id			hilitelinks
// @name		hilitelinks
// @version		1.0
// @author		Maija
// @namespace
// @description		adds a background hilite on html anchor elements. it's a basic test script that's all.
// @include		*
// ==/UserScript==

	
var l = document.getElementsByTagName('a');
for (var i=0; l[i]; i++){
	l[i].style.cssText = 'background-color:#0f0; color:#000; padding:2px;';
}
