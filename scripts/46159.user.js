// ==UserScript==
// @name          Rename Mal Titles
// @author	  Sajal Kr Basu 
// @namespace     
// @description   Remove Mal Titles Based on customizable mal keywords
// @include       *
// ==/UserScript==


var MalWordsList=GM_getValue("MalWordsList","porn");


var docTitle = document.title ;
var MalWordsArr = MalWordsList.split(",");
for(i = 0; i < MalWordsArr.length; i++){
	docTitle = docTitle.replace(new RegExp(MalWordsArr[i], "gi"), "");
}
document.title = docTitle ;






function gmMalWordsEdit ()
        {
			var name = prompt("Enter the words/phrase separated by comma\n eg. porn,xxx",MalWordsList);
			GM_setValue("MalWordsList",name);
        }
        
GM_registerMenuCommand("Edit Mal Words", gmMalWordsEdit);
