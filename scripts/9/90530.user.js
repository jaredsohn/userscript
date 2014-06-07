// ==UserScript==
// @name          Vista Chess Emo by Preeya
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Preeya
// @description   Vista Chess Emo for Orkut
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
// All credits to Original script writer. I hope u all enjoy the script! ;)
*********************************************************/

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();
	smileyarr["king_yellow"]="http://lh5.ggpht.com/_ngZFXcntcRY/TON5YZXoJ2I/AAAAAAAAACQ/SzaVNlBtIm0/KingYellow.png";
	smileyarr["queen_yellow"]="http://lh4.ggpht.com/_ngZFXcntcRY/TON5YhZC3wI/AAAAAAAAACY/1DTF7Em-z4c/QueenYellow.png";
	smileyarr["bishop_yellow"]="http://lh5.ggpht.com/_ngZFXcntcRY/TON5YObBwmI/AAAAAAAAACM/li8fXfRLuqw/BishopYellow.png";
	smileyarr["knight_yellow"]="http://lh4.ggpht.com/_ngZFXcntcRY/TON5Ya9jXGI/AAAAAAAAACU/RK-LK1kxTRY/KnightYellow.png";
	smileyarr["pawn_yellow"]="http://lh4.ggpht.com/_ngZFXcntcRY/TON5Yj66YiI/AAAAAAAAACc/e48Rg_Lrx9U/PawnYellow.png";
	smileyarr["rook_yellow"]="http://lh4.ggpht.com/_ngZFXcntcRY/TON5qyel-6I/AAAAAAAAACk/kVd8KmPOn-s/RookYellow.png";
	smileyarr["king"]="http://lh4.ggpht.com/_ngZFXcntcRY/TON44y814DI/AAAAAAAAAB8/BPi5uI7lrr8/King_Blue.png";
	smileyarr["queen"]="http://lh5.ggpht.com/_ngZFXcntcRY/TON45KA9Y4I/AAAAAAAAACI/46TI8lzz88g/Queen_Blue.png";
	smileyarr["bishop"]="http://lh3.ggpht.com/_ngZFXcntcRY/TON447r0guI/AAAAAAAAAB4/GWYEmn4VmVk/Bishop_Blue.png";
	smileyarr["knight"]="http://lh4.ggpht.com/_ngZFXcntcRY/TON45MFUBgI/AAAAAAAAACA/4LYJILCZQ6Y/Knight_Blue.png";
	smileyarr["pawn"]="http://lh6.ggpht.com/_ngZFXcntcRY/TON45JQGMkI/AAAAAAAAACE/Kq3m5o96Siw/Pawn_Blue.png";
	smileyarr["rook"]="http://lh5.ggpht.com/_ngZFXcntcRY/TON5qtpvcXI/AAAAAAAAACg/0v8BSWcFtYQ/Rook_Blue.png";
	smileyarr["sp"]="http://lh5.ggpht.com/_ABzDy_tMAGI/TODDmuMyzEI/AAAAAAAAANU/PYK46uV6bYA/sp.png";
	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

// Preeya's script