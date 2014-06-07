// ==UserScript==
// @name           tw_affiche_duel
// @include         http://*.the-west.*/game.php*
// ==/UserScript==


var twAD_version = "0.5";

var insertBeforeElement = document.getElementById('left_top');
	var newScriptElement = document.createElement('script');
	newScriptElement.setAttribute('type', 'text/javascript');
	var myScript = "var twAD_version = '"+twAD_version+"';";
	
	myScript =  myScript +   "function parcourir_rapport() 									"+
							" { 															"+
							"	 var noeuds = document.getElementsByClassName('chat_text'); "+
							"  for(var i=0; i<noeuds.length; i++) { 						"+
							"	  var Stext = noeuds[i].firstChild.nodeValue; 				"+
							"	  if (Stext != null && est_rapport(Stext))  					"+
							"			{													"+
							"				eval(transforme(Stext));							"+
							"			} }													"+
							"  																"+
							"} 																"+
							"																"+
							" function text_rapport()										"+
							" {  															"+
							"		var Stext = getSelectedText();  						"+
							"																"+
							"		if (Stext != null && est_rapport(Stext))  				"+
							"			{													"+
							"				eval(transforme(Stext));							"+
							"			}else{alert(\"Ceci n'est pas un rapport valide\"); }								"+
							" } 															"+
							" 																"+
							" function est_rapport(Stext)									"+
							" {																"+				
							"	var bool = true;											"+
							"															"+
							"	if ((\"\"+Stext+\"\").indexOf(\"[report=\", 0) == -1) {bool = false};	"+
							"	if ((\"\"+Stext+\"\").indexOf(\"[/report]\", 0) == -1) {bool = false};	"+
							"																"+
							"	return bool;												"+
							"																"+
							" }																"+
							"  																"+
							"function transforme(OLD_rapport)								"+
							"{																"+
							"																"+
							"	var deb = (\"\"+OLD_rapport+\"\").indexOf(\"[report=\", 0);				"+
							"	var fin = (\"\"+OLD_rapport+\"\").indexOf(\"]\", 0);					"+
							"																			"+
							"	var num = (\"\"+OLD_rapport+\"\").substring(deb+8, fin-10);			"+
							"	var hash= (\"\"+OLD_rapport+\"\").substring(fin-10, fin);				"+
							"															"+
							"																"+
							"	var rapport = \"Reports.show(\"+num+\",'\"+hash+\"');\";	"+
							"																"+
							"	return rapport;												"+
							"}																"+
							" function getSelectedText(){ 									"+
							"    if (window.getSelection){ 									"+
							"       var str = window.getSelection(); 						"+
							"    }else if (document.getSelection){ 							"+
							"       var str = document.getSelection(); 						"+
							"    }else { 													"+
							"       var str = document.selection.createRange().text;		"+
							"    } 															"+
							"    return str; 												"+
							" } 															";
							
														

					
							
							

	
	
	newScriptElement.innerHTML = myScript;
	insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);

	
function affiche()
{

	var nwlien = document.createElement('div');
	var parentDiv = document.getElementById('chatwindow_channelselect').parentNode;
	var pparentDiv = parentDiv.parentNode;
	pparentDiv.insertBefore(nwlien, parentDiv);
	 
	nwlien.innerHTML = '<a href="javascript:" onclick="text_rapport();">  <img title="" alt="Voir le rapport" src="/images/icons/eye.png" class=""> </a>';
}







affiche();