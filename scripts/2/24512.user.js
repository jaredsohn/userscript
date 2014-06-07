// ==UserScript== 
// @name		Web Form Data Analyzer
// @author     	Jake Kasprzak
// @namespace	http://www.jake.kasprzak.ca
// @description	Modifies the forms on web pages so that after data is submitted through a form, information about all data sent to the web server through the form is displayed.
// @include	* 
// ==/UserScript== 

forms = document.getElementsByTagName("form");

for (i=0; i<forms.length; i++) {

	forms[i].action = "http://www.schrenk.com/nostarch/webbots/form_analyzer.php";
	
}