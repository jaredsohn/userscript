// ==UserScript==
// @name           sudoku solver getter
// @namespace      mdlamar
// @description    gets the input field values from the sudoku solver app on facebook
// @include        http://apps.facebook.com/sudokusolver/*
// ==/UserScript==

function alertPuzzle(){
    var id = "app9034849299_";
    var answer = "";
    var puzzle = "";
    var inc = 0;
    for(var i=1;i<10;i++){
	for(var j=1;j<10;j++){
	    puzzle += "tile_"+inc+"="+document.getElementById(id+"r"+i+"c"+j).value+"&";
	    inc++;
	}	
    }
    cheatbutton = document.createElement('input');
    cheatbutton.type="button";
    cheatbutton.onclick=function(){
	$.get("http://www.sudokusolution.info/jsonanswer.php", puzzle, function(data) { alert("Data received: "+data); });
	/* function(data){//javascript fill in the elements} */
    }
    document.getElementById(id+"textafterform").appendChild(cheatbutton);
}

//$(document).ready(function() {
   alertPuzzle();
//});
