// ==UserScript==
// @name           MyEpisodes2PirateBay
// @namespace      http://userscripts.org/people/35269
// @description    Scripts adds a link on MyEpisodes.com to download from BTJunkie
// @include        http://www.myepisodes.com/myshows.php*
// ==/UserScript==

var elements=document.getElementsByTagName('table'); 
  var i=0;
  while (elements[i]){
	//Find the correct table we need to iterrate on
	if (elements[i].cellPadding.match("7")) {
		var theRows = elements[i].rows;
		//Go through all the rows of the table
		for (j=1;j<theRows.length;j++){
			//The cell with the name of the show
			var theTD = theRows[j].cells[1];
		
			var newButton=document.createElement('span');
			var theTarget = "http://thepiratebay.se/search/";
			theTarget = theTarget + theTD.childNodes[1].textContent;
                        theTarget = theTarget + "/0/7/0";
			//theTarget = theTarget + "/seeds";
			newButton.innerHTML='<a href="'+theTarget+'">PirateBay</a>';
			//theTD.insertBefore(newButton,elements[i]);
			theTD.appendChild(newButton);
		}
	}
	i++; 
  }