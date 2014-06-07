// ==UserScript==
// @name           	Serebii Page Titles
// @tag             serebii
// @description   	Removes "Serebii.net " from all page titles on Serebii.
// @include        	http://www.serebii.net/*
// @author			Matthew Ammann
// @version			1.0
// @date 			04/18/11
// ==/UserScript==

document.title = document.title.replace("Serebii.net ", "");
