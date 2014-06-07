// ==UserScript==
// @name           auto-disassemble
// @namespace      http://userscripts.org/users/110369
// @include        http://www.twilightheroes.com/use.php?which=314*
// @include        http://www.twilightheroes.com/use.php?which=390*
// @include        http://www.twilightheroes.com/use.php*
// ==/UserScript==

if((String(self.location).toUpperCase().indexOf("WHICH=314") > -1)||
   (String(self.location).toUpperCase().indexOf("WHICH=390") > -1)){
	var a=document.getElementsByTagName('option');
	var b=document.getElementsByName('choice')[0];
	for(b.selectedIndex=0;(b.selectedIndex<a.length);b.selectedIndex++)
		if(b.selectedIndex.value==86)break;
	if(b.selectedIndex.value==86)
		document.getElementsByTagName('form')[0].submit();}
