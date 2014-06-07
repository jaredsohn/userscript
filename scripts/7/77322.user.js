// ==UserScript==
// @name           Chess Tactics Server FEN
// @namespace      hirak99
// @description    Chess Tactics Server - View FEN
// @include        http://chess.emrald.net/psolution.php?Pos=*
// @version        1.00
// ==/UserScript==

function BoardToFen(board) {
	var pieces=board.split(' ')[0];
	var toplay=board.split(' ')[1];
	var result='';
	for (var i=0; i<8; ++i) {
		var empty=0;
		for (var j=0; j<8; ++j) {
			if (pieces[i*8+j]=='x') ++empty;
			else {
				if (empty>0) {result+=empty; empty=0;}
				result+=pieces[i*8+j];
			}
		}
		if (empty>0) result+=empty;
		if (i<7) result+='/';
	}
	return result+' '+toplay+' - - 0 1';
}


document.getElementsByClassName('header')[0].innerHTML+="<br><span style='font-size: 12px'>FEN: "+BoardToFen(unsafeWindow.Boards[0])+"</small>";
