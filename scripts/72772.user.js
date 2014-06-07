// ==UserScript==
// @name         prince smily v3.0 
// @namespace    Prince
// @description  Use Latest Amazing smiley !Click on The Smiley to Insert!Enjoy!
// @include      *CommMsgPost*
// @require http://sizzlemctwizzle.com/updater.php?id=72772&days=2
// ==/UserScript==


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

smileyarr["smiley_446"]="http://lh6.ggpht.com/_166f0hN42fs/S6_7EgwkoCI/AAAAAAAAAKs/yISHwkCSDqA/s400/1%20%281%29.png";
smileyarr["smiley_447"]="http://lh6.ggpht.com/_x6Nx_p3kOw0/S7ACqscnOiI/AAAAAAAAASE/i-S9U_7nrMg/s400/20.png";
smileyarr["smiley_448"]="http://lh6.ggpht.com/_x6Nx_p3kOw0/S6_-j1onNuI/AAAAAAAAARc/_CByJoniGTg/s400/2.png";
smileyarr["smiley_449"]="http://lh5.ggpht.com/_x6Nx_p3kOw0/S6_9sIIJabI/AAAAAAAAARM/tGoty4tBS3M/s400/1.png";
smileyarr["smiley_450"]="http://lh3.ggpht.com/_x6Nx_p3kOw0/S6_8KTPqVqI/AAAAAAAAAQ8/GoNjUoV8htc/s400/1%20%283%29.png";
smileyarr["smiley_451"]="http://lh3.ggpht.com/_KWcDIHdVvnA/S160zFYAIPI/AAAAAAAAABQ/WdnCj-MUpWk/s400/emdonaldduck001rs3.png";
smileyarr["smiley_452"]="http://lh3.ggpht.com/_166f0hN42fs/S6_nRf32YAI/AAAAAAAAAI0/84V-qy3M_W8/s400/2%20%281%29.png";
smileyarr["smiley_453"]="http://lh3.ggpht.com/_166f0hN42fs/S6_noJHL2kI/AAAAAAAAAJk/qS5sHC4RNUc/s400/2%20%286%29.png";
smileyarr["smiley_454"]="http://lh3.ggpht.com/_166f0hN42fs/S6_nqv_R31I/AAAAAAAAAJs/gW6xaX20h2k/s400/2%20%287%29.png";
smileyarr["smiley_455"]="http://lh5.ggpht.com/_166f0hN42fs/S6_ntKTFc4I/AAAAAAAAAJ0/dIQ6GOdSeJI/s400/2%20%288%29.png";
smileyarr["smiley_456"]="http://lh6.ggpht.com/_166f0hN42fs/S6_nvm980cI/AAAAAAAAAJ8/Jue596ATGUI/s400/2%20%2810%29.png";
smileyarr["smiley_457"]="http://lh3.ggpht.com/_166f0hN42fs/S6_kGTJWsbI/AAAAAAAAACE/ij1Z0FR3QOs/s400/1%20%287%29.png";
smileyarr["smiley_458"]="http://lh3.ggpht.com/_166f0hN42fs/S6_n07JgJpI/AAAAAAAAAKE/tcRq0JUkTZA/s400/2%20%2811%29.png";
smileyarr["smiley_459"]="http://lh6.ggpht.com/_166f0hN42fs/S6_n6VetcaI/AAAAAAAAAKM/PMQ0RfWonRs/s400/2%20%2812%29.png";
smileyarr["smiley_460"]="http://lh4.ggpht.com/_166f0hN42fs/S6_n9NdcZzI/AAAAAAAAAKU/ApaH3KJip0o/s400/2%20%2813%29.png";
smileyarr["smiley_461"]="http://lh5.ggpht.com/_166f0hN42fs/S6_oAqCzB0I/AAAAAAAAAKc/lpHiKgl5kR8/s400/2%20%2814%29.png";
smileyarr["smiley_462"]="http://lh6.ggpht.com/_x6Nx_p3kOw0/S7ACsqiL25I/AAAAAAAAASM/9y6Qb_X-04I/s400/17.png";
smileyarr["smiley_463"]="http://lh3.ggpht.com/_x6Nx_p3kOw0/S7ACkzO7UXI/AAAAAAAAAR0/jkoOCYy5yDI/s400/16.png";
smileyarr["smiley_464"]="http://lh3.ggpht.com/_x6Nx_p3kOw0/S7ACiVvxAjI/AAAAAAAAARs/6ml-k20r5xY/s400/15.png";
smileyarr["smiley_465"]="http://lh6.ggpht.com/_x6Nx_p3kOw0/S7ACn3rq-ZI/AAAAAAAAAR8/JVCQLM2f9As/s400/18.png";
smileyarr["smiley_466"]="http://lh5.ggpht.com/_166f0hN42fs/S6_j9gTbK7I/AAAAAAAAABk/hUDaSOCNiLI/s400/1%20%285%29.png";
smileyarr["smiley_467"]="http://lh5.ggpht.com/_166f0hN42fs/S6_kDMwVQ7I/AAAAAAAAAB0/lDxH_RHUgp8/s400/1%20%286%29.png";
smileyarr["smiley_468"]="http://lh3.ggpht.com/_166f0hN42fs/S6_oC5bUHRI/AAAAAAAAAKk/TZlYwE1eRl8/s400/2%20%2815%29.png";



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