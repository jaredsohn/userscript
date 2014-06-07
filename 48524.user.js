// ==UserScript==
// @name           DeStupifyNewsSites
// @namespace      http://twitter.com/catearcher
// @include        http://*derstandard.at*
// @include        http://*diepresse.com*
// @include        http://*orf.at*
// @description    Entfernt die Commentbereiche von einigen Nachrichtenseiten.

// ==/UserScript==

function getElementsByClassName(className, elementType) {
  var output = new Array();
  var elements = document.getElementsByTagName(elementType);
  
  for(i = 0; i < elements.length; i++) {
    if( elements[i].getAttribute("class") == className ) {
      output.push(elements[i]);
    }
  }
  
  return output;
}

function deStupifyStandard() {
	var bloed = getElementsByClassName("communityCanvas", "div")[0];

	if(bloed != undefined) {
		bloed.parentNode.removeChild(bloed);
	}
}

function deStupifyPresse() {
	var commentForm = document.getElementById("newcommentform");
	var commentBox = document.getElementById("commentbox");


	if(commentForm != undefined) {
		commentForm.parentNode.removeChild(commentForm);
	}

	if(commentBox != undefined) {
		commentBox.parentNode.removeChild(commentBox);
	}
}

function deStupifyOrf() {
	var einstieg = getElementsByClassName("rightCol infoboxPad disclaimer", "td");
	
	if(einstieg != undefined) {
		var mainTable = einstieg[0].parentNode.parentNode;
		
		if(mainTable != undefined && mainTable.childNodes.length > 35) {			
			for(i = 0; i < 18; i++) {
				mainTable.removeChild(mainTable.lastChild);
			}
		}
	}
}

if( window.location.href.search(/derstandard[.]at/) > -1 ) {
	deStupifyStandard();
} else if( window.location.href.search(/diepresse[.]com/) > -1 ) {
	deStupifyPresse(); 
} else if( window.location.href.search(/orf[.]at/) > -1 ) {
	deStupifyOrf();
}