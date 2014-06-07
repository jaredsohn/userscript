// ==UserScript==
// @name          Number_Underliner
// @namespace     http://vamshi.org
// @description   Underline the numbers for sudoku in orkut
// @include       http://*.orkut.*/*CommMsgPost*cmm=1046782&tid=5477677748881324139
// ==/UserScript==

var currentTextArea=document.getElementsByTagName('textarea')[0];

var butt = document.createElement('BUTTON');
var buttext = document.createTextNode('Underline numbers');
butt.appendChild(buttext);
butt.onclick=colorItVam();
currentTextArea.parentNode.insertBefore(butt,currentTextArea);

function colorItVam(){
	var textIn = currentTextArea.value;
	var intIndexOfMatch=0 ;
	for(i = 1 ; i<10; i++){
		intIndexOfMatch= textIn.indexOf( "_"+i+"_" );
		while(parseInt(intIndexOfMatch) != -1){
			textIn = textIn.replace("_"+i+"_","_[u]"+i+"[/u]_");
			intIndexOfMatch = textIn.indexOf( "_"+i+"_" );
		}
	}
	currentTextArea.value = textIn;	
}


