// version 0.1
// 26 Feb 2007
// Copyright (c) 2007, Guillermo Gutierrez
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name Enlace-ogame
// @namespace http://eldaimon.blogspot.com/
// @author Guillermo Gutierrez
// @description  Quita el enlace a los oficiales y cambia el enlace al foro del uni11
// @include     http://ogame132.de/game/leftmenu.php*
// ==/UserScript==

//Get all the td fron left panel
var html = document.getElementsByTagName('td');
var strLine; 
	for (var i = 0; i <= html.length - 1; i++) {
		strLine = html[i].innerHTML;
		if (strLine.search('offiziere.php') == -1) {
			//If officials page not found 
			if (strLine.search('board.ogame') == -1) {
				//If forum link not found 
				html[i].innerHTML = strLine;	
			}
			else {
				//Replace the forum url
				html[i].innerHTML = '<div align="center"><font color="#FFFFFF"><a href="http://foro.thedarkforces.net/" target="_blank" accesskey="1" >Foro</a><!-- external link to board --></font></div>';
		}
		}
		else {
			//Delete officers link
			html[i].innerHTML = '';
		}
		
	}

