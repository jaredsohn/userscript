// ==UserScript==
// @name           CoH Sticky Fix
// @namespace      http://dotfour.net/
// @description    Removes the word "Sticky" and moves the thumbnail to its spot
// @include        http://boards.cityofheroes.com/forumdisplay.php*
// @exclude        http://boards.cityofvillains.com/forumdisplay.php*
// ==/UserScript==

function fixStickies(){
	var imgTest = /title="Sticky Thread"/;
	var imgTextCoH = "<img title=\"Sticky Thread\" class=\"inlineimg\" src=\"styles/CoH/misc/sticky.gif\" alt=\"Sticky Thread\">";
	var imgTextCoV = "<img title=\"Sticky Thread\" class=\"inlineimg\" src=\"styles/CoV/misc/sticky.gif\" alt=\"Sticky Thread\">";
	var imgTextCoH_New = imgTextCoH;
	var imgTextCoV_New = imgTextCoV;
	var td_title = /td_threadtitle_*/i;
	try{
		var table = document.getElementById('threadslist');
		var cells = table.getElementsByTagName('td');
		for(var j=0; j<cells.length; j++){
			if(td_title.test(cells[j].id) && imgTest.test(cells[j].innerHTML)){
				if(cells[j].innerHTML.replace(imgTextCoH,"") != cells[j].innerHTML) {
					cells[j].innerHTML= cells[j].innerHTML.replace(imgTextCoH,"").replace(/Sticky:/,imgTextCoH_New);
				} else {
					cells[j].innerHTML= cells[j].innerHTML.replace(imgTextCoV,"").replace(/Sticky:/,imgTextCoV_New);
				}
			}
		}
	} catch(error){
		console.log(error);
	}
}

if(!window.console) { window.console = new function() { this.log = function(str) {}; }; }
fixStickies();
