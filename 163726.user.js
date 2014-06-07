/* Okoun.cz Favourites - 1
Created 01/03/2006, Last Changed 04/01/2009
Copyright (c) 2006, Released under the GPL http://www.gnu.org/copyleft/gpl.html
Created by crudo, <crudo@crudo.cz>

This is a Greasemonkey user script, see http://greasemonkey.mozdev.org/.

// ==UserScript==
// @name          Okoun.cz Favourites 1
// @namespace     http://crudo.cz
// @description	  Zjednodusi vypis oblibenych klubu. A uprednostni nektere kluby.
// @include       http://*okoun.cz/favourites*
// ==/UserScript==


	/* prvni je boardID (najdes v hlavicce klubu) a druhy je nazev klubu */

// seznam klubu
var superBoards = new Array();

superBoards[0] = [4852,2574, 221, 203, 3681, 18, 282, 3358, 3677, 1, 2, 1177, 3239, 2501, 1743, 4235, 4226, 3876, 1900, 3635, 2568, 4202, 4256, 2998,2750,3374, 3935];  // superoblibene
superBoards[1] = [153, 2819, 72, 2521, 5, 2577, 990, 2670, 150, 87, 550, 11, 2700, 265,415]; // filmy
superBoards[2] = [4385, 4105, 3163, 4549, 3529, 1364,225,4367,1558,3610,4016,146,3828,957,3220, 22]; // okoun a spol
superBoards[3] = [716, 3920, 278, 3454, 3268]; // jidlo
superBoards[4] = [197, 898, 4005, 1827, 3670]; // deti
superBoards[5] = [4738, 2474, 4243, 1922, 1642, 32, 3653, 1960, 2079, 1722, 1067, 3731, 2356, 3686, 3037, 1757, 4036, 4261, 2593, 718, 2090, 3586, 1827, 2596, 2957, 3132]; // ukaz pribuzne a spol
superBoards[6] = [4522, 4267, 4167, 2308, 212, 2012, 1078, 2335, 1148, 2243, 2075, 1382, 3887, 2322, 2109, 1625, 470, 1092, 2002, 2182, 4239, 1627,4567];  // slecny
superBoards[7] = [1738, 2615, 1232, 3563, 3216, 213, 881, 67, 228, 1185, 314, 105, 269, 2592, 4194, 376, 272,4542]; // programy, net

// barva linky mezi oblibenymi kluby
var lineColor = "#ccc";

// o kolik % bude vetsi pismo v jednotlivych skupinach
var biggerFont = 3;

/* konec nastaveni */
//

function renderOtherView(){
	var startElement = document.body;
	
	var forms = document.getElementsByTagName('form');	
	for(i=0; i<forms.length; i++){
		if(forms[i].name === "markFavouriteBoardsForm") startElement = forms[i];
	}
	
	// schova temata
	var h3s = startElement.getElementsByTagName('h3');
	for(i=0; i<h3s.length; i++){
		h3s[i].style.display = "none";
	}
		
	var boardsItems = getElementsByClass('item', startElement);
	for(i=0; i<boardsItems.length; i++){
				
		// schova input
		var inputs = boardsItems[i].getElementsByTagName('input');
		for(j=0; j<inputs.length; j++){
			inputs[j].style.display = "none";
		}
		
		var as = boardsItems[i].getElementsByTagName('a');
		for(j=0; j<as.length; j++){
			if( as[j].href.match(/\?f=/) ){
				as[0].href = as[j].href;
			}
		}

		// schova popis
		var divs = boardsItems[i].getElementsByTagName('div');
		divs[0].style.display = "none";
		
		// orizne zobrazeni detailu
		
		boardsItems[i].innerHTML = boardsItems[i].innerHTML.replace(/\((\d+)\/<[B,b]><[A,a][^>]+>(\d+)?(.*)<\/[A,a]><\/[B,b]>\s+\/([^\)]+)\)/g,' <small> +$2</small>');
	}
	sortBoards();
}	

function sortBoards(){
	var startElement = document.body;
		
	var forms = document.getElementsByTagName('form');	
	for(i=0; i<forms.length; i++){
		if(forms[i].name === "markFavouriteBoardsForm") startElement = forms[i];
	}
	
	var u = 0;
	var boards = new Array();
	var higherBoards=new Array();	
	for(s = 0; s < superBoards.length;s++){	
		higherBoards[s] = new Array();	
	}
	
	var inputs = [];
	
	var superBoardsLength=superBoards.length;
	var boardsItems = getElementsByClass('item', startElement);
		
	for(i=0; i<boardsItems.length; i++){
		var as = boardsItems[i].getElementsByTagName('a');
		for(l=0; l<as.length; l++){
			if(as[l].className === "name") boardTitle = as[l].innerHTML;				
		}	
		
		// naplni pole s ostatnima klubama
		boards[i] = Array(boardTitle.toLowerCase(),boardsItems[i].innerHTML);
		
		// najde favorizovane kluby
		for(s=0;s<superBoards.length;s++){			
			for(f=0;f<superBoards[s].length;f++){
				inputs = boardsItems[i].getElementsByTagName('input');
				if(inputs[0] && inputs[0].id === "favouriteBoardId-"+superBoards[s][f]){
					var as = boardsItems[i].getElementsByTagName('a');
					for(l=0; l<as.length; l++){
						// zvyrazni nazev klubu
						if(as[l].className === "name") as[l].style.fontSize = 100+((superBoardsLength-s+1)*biggerFont)+"%";	
					}
					// naplni pole specialnich klubu
					higherBoards[s][u++] = Array(boardTitle.toLowerCase(),boardsItems[i].innerHTML);
					boards[i] = "";
				}
			}
		}		
	}
	
	// procisti puvodni vystup klubu
	for(i=0; i<boardsItems.length; i++){
		boardsItems[i].parentNode.removeChild(boardsItems[i]);
	}
	
	// seradi kluby podle nazvu
	boards = boards.sort(); 
		
	for(h=0; h<higherBoards.length;h++){
		higherBoards[h] = higherBoards[h].sort();
	}
	
	var div = document.createElement('DIV');
	startElement.appendChild(div);
	div.style.marginTop = "1em";
	
	var html = [];
	for(h=0; h<higherBoards.length;h++){	
		for(v=0; v<higherBoards[h].length;v++){
			if(higherBoards[h][v] != undefined) html.push('<div class="item">' + higherBoards[h][v][1] + '</div>');					
		}	
		// vypise caru pod skupinou klubu
		if(higherBoards[h].length > 0) html.push('<div style="margin: 1em; line-height: 1px; background: '+lineColor+';">&nbsp;</div>');
	}	
	for(v=0; v<boards.length;v++){
		if(boards[v][1] != undefined) html.push('<div class="item">' + boards[v][1] + '</div>');		
	}	
	div.innerHTML = html.join('');
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

renderOtherView();