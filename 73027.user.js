// ==UserScript==
// @name           websudoku answer filler
// @namespace      mdlamar
// @description    enters the sudoku answer on www.websudoku.com
// @include        http://www.websudoku.com/?level=*
// @include        http://show.websudoku.com/?level=*
// ==/UserScript==
var answer = window.frames[0].document.getElementById("cheat");
var cheat = answer.value;
var inc = 0;
for(var i=0;i<9;i++){
	for(var j=0;j<9;j++){
		document.getElementById("f"+j+i).value = cheat.substring(inc, inc + 1);
		inc++;
	}	
}
