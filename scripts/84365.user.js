// ==UserScript==
// @name           EmbedAll
// @namespace      Magistream
// @description    Display all Tabs at once for Magistreams "embed Multiple"
// @include        http://magistream.com/embedmore
// ==/UserScript==


//breedable
var showAll = document.createElement("input");
showAll.type = "button";
showAll.value = "Show All tabs";

var borderDiv = document.body.getElementsByClassName('inner')[2];

function showAllTabs(){
	var tabs  = document.body.getElementsByClassName('tabbysection');
	for(var i=0; i<tabs.length; i++){
		tabs[i].style.display = "block";
	}
}


showAll.addEventListener('click', function(){showAllTabs();}, true);
//showAll.addEventListener('click', function(){alert("test");}, true);

var marker = borderDiv.firstChild;
borderDiv.insertBefore(showAll, marker);