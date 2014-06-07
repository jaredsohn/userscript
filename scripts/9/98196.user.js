// ==UserScript==
// @name           jGoBoard for DGS
// @description    Uses the jGoBoard widget instead of the default DGS board.
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// @require http://softwareslave.com/jgo/jgoboard.js
// @resource jgoboardcss http://softwareslave.com/jgo/jgoboard.css
// @include        http://www.dragongoserver.net/game.php?*
// ==/UserScript==

var css = GM_getResourceText("jgoboardcss")
GM_addStyle(css);

function getParam(param) {
	var query = window.location.search.substring(1); 
  	var vars = query.split("&"); 
  	for (var i=0;i<vars.length;i++) { 
    	var pair = vars[i].split("="); 
    	if (pair[0] == param) { 
      	return pair[1]; 
    }
  } 
}

function boardClick(coord) {
	var dgsCoord = coord.sgfCoord();
	var gid = getParam('gid');
	window.location.href = '/game.php?g='+gid+'&a=domove&c='+dgsCoord;
}

function getBoardSize() {
	// jGoBoard only works with 19x19 right now.
	return 19;
}

function getMyColor() {
	//TODO
	return JGO_BLACK;
}

function getLastColor() {
	if($('#lastMove').attr('src').match(/bm.gif/)) {
		return JGO_BLACK;
	} else {
		return JGO_WHITE;
	}
}

function getCellColor(cell) {
	var $cell=$(cell);
	var alt = $cell.attr('alt');
	var my_color = getMyColor();

	if(alt == "X" || alt == "#") { 
		return JGO_BLACK;
	} else if (alt == "O" || alt == "@") {
		return JGO_WHITE;
	}
	return JGO_CLEAR;
}
function copyGoban($goban, board) {
	var alphas = "ABCDEFGHJKLMNOPQRST";
	var boardsize = getBoardSize();
	console.log(boardsize);
	var cells = $goban.find('td.brdx img');
	for(var y = 0; y< boardsize; y++) {
		for(var x = 0; x < boardsize; x++ ) {
			var color = getCellColor(cells[(y*19)+x]);
			var coord = new JGOCoordinate(alphas[x]+(y+1));
			board.set(coord, color);
		}
	}
}

function isGameOver() {
	if( $('.Goban:has(img.brdx[alt="-"])')[0] || $('.Goban:has(img.brdx[alt="+"])')[0]) {
		return true;
	}
	return false;
	
}

function addAttribution() {
	$('body').append("The 'DGS jGoBoard' script uses jGoBoard:<br/>");
	$('body').append('<div xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/" about="http://www.jgoboard.com/"><span property="dct:title">jGoBoard</span> (<a rel="cc:attributionURL" property="cc:attributionName" href="http://joonaspihlajamaa.com/about.html">Joonas Pihlajamaa</a>) / <a rel="license" href="http://creativecommons.org/licenses/by-nc/3.0/">CC BY-NC 3.0</a></div>');
		
	
}

if(!isGameOver()) {
var $goban = $('.Goban');
	$('<table class="jgo_board" id="jgoboard"></table>').insertBefore($goban);
	var board = jgo_generateBoard($("#jgoboard"));
	board.click = boardClick;
	copyGoban($goban, board);
	$goban.remove();
	addAttribution();
}
