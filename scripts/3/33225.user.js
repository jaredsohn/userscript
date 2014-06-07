// MonkeyChord
// version 0.1
// 06-09-2008
// Copyright (c) 2008, Spyros Vasileiadis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MonkeyChord
// @namespace     http://coderado/projects/monkeychord
// @description   allows you to rock better by transposing chords inside a webpage according to the transposement you choose
// @include       *
// @include       
// ==/UserScript==

	/*
	function retone(transpose){
	if (transpose == 0){ 
		return false;
	}
 

    var notes1 = new Array( "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B");
	var notes2 = new Array( "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B");
	var transposed_note = "";
	transpose = parseInt(transpose);
	var note = "";
	
	
	var current_note_index=0;
	
	

	if (transpose < 0){ 
		transpose = 12 + transpose;
	}

	var text_array = document.body.innerHTML.split('');
	var current_note = "";
	
	for (var index = 0, len = text_array.length; index < len; ++index) {
		note=text_array[index];	
			
		if((notes1.indexOf(text_array[index]) > -1) && (text_array[index+1].match(/[qwertyuiopfghjklzxcvn]/) == null )){	
			if(text_array[index+1]=="#"){
				note = note+text_array[index+1]; //add trail
     			transposed_note	= notes1[notes1.indexOf(note) + transpose]+" "; 
				
				temp = transposed_note.split(''); 
				text_array[index] = temp [0];
			
				text_array[index+1] = temp [1]; 
			
			}
			else if(text_array[index+1]=="b" ){
				note = note+text_array[index+1]; //add trail
     			transposed_note	= notes2[notes2.indexOf(note) + transpose]+" "; 
				
				temp = transposed_note.split('');
				text_array[index] = temp [0];
				text_array[index+1] = temp [1];			
			}
			else if(text_array[index+1]==" " ){
				
				text_array[index] = notes1[notes1.indexOf(note) + transpose]; 
			}
			else {
				
				text_array[index] = notes1[notes1.indexOf(note) + transpose]; 
			}
		}
	}
    document.body.innerHTML = text_array.join("");
 
  }*/




document.body.appendChild(document.createElement('script')).innerHTML= "function retone(transpose){if (transpose == 0){ return false; } var notes1 = new Array( 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'); var notes2 = new Array( 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'); var transposed_note = ''; transpose = parseInt(transpose); var note = ''; var current_note_index=0; if (transpose < 0){ transpose = 12 + transpose; } var text_array = document.body.innerHTML.split(''); var current_note = ''; for (var index = 0, len = text_array.length; index < len; ++index) { note=text_array[index]; if((notes1.indexOf(text_array[index]) > -1) && (text_array[index+1].match(/[qwertyuiopfghjklzxcvn]/) == null )){ if(text_array[index+1]=='#'){ note = note+text_array[index+1]; transposed_note = notes1[notes1.indexOf(note) + transpose]+' '; temp = transposed_note.split(''); text_array[index] = temp [0]; text_array[index+1] = temp [1]; } else if(text_array[index+1]=='b' ){ note = note+text_array[index+1]; transposed_note = notes2[notes2.indexOf(note) + transpose]+' '; temp = transposed_note.split(''); text_array[index] = temp [0]; text_array[index+1] = temp [1]; } else if(text_array[index+1]==' ' ){ text_array[index] = notes1[notes1.indexOf(note) + transpose]; } else { text_array[index] = notes1[notes1.indexOf(note) + transpose]; } } } document.body.innerHTML = text_array.join('');};function rmv(){document.body.removeChild(document.getElementById(\'coderado_monkeychord_html\'));document.body.removeChild(document.getElementById(\'coderado_monkeychord_script\')); };";


document.body.lastChild.id="coderado_monkeychord_script"

document.body.innerHTML= "<div id=\'coderado_monkeychord_html\' style='color:#0038B9;position: fixed;	top: 2;left:2;z-index:9999;font-family:arial,sans-serif; font-size:11px; width:200px;background-color:#FFFE9C;border:#DBF9FF solid 7px;' align=center><a href=\'#\' style='float:right;' onclick=\"rmv();\">- X -</a>MonkeyChord by <a href='http://coderado.com/projects/monkeychord'>Coderado</a><br>select transposition<select id='tone' style='left: 50%; top: 0px;' onchange=\"javascript:void(retone(this.value));\"><option>-6</option><option>-5</option><option>-4</option><option>-3</option><option>-2</option><option>-1</option><option selected='selected'>0</option><option>+1</option><option>+2</option><option>+3</option><option>+4</option><option>+5</option><option>+6</option></select></div>"+document.body.innerHTML;