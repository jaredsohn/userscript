// ==UserScript==
// @name          22
// @author	      Teodorak Moderador T.O.H.
// @description   Usar antigos emoticons do orkut
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
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
	
        smileyarr["xxt"]="http://lh3.ggpht.com/_MLY4q3hCpTc/S-T6efgJ6fI/AAAAAAAAAPU/5XQnEUCUk1Y/73.gif";        
        smileyarr["breja"]="http://lh6.ggpht.com/_rApd6q8vOqs/S-UBkclnIvI/AAAAAAAAAHw/FD1jO6gaw6s/beerchug.gif";
        smileyarr["dj"]="http://lh4.ggpht.com/_rApd6q8vOqs/S-UBksTwdeI/AAAAAAAAAH0/xt3hjSuS50Q/dj.gif";
        smileyarr["toma"]="http://lh5.ggpht.com/_rApd6q8vOqs/S-UBkyH4nnI/AAAAAAAAAH4/oVMpFnYerP0/cannon.gif";
        smileyarr["redprayou"]="http://lh6.ggpht.com/_rApd6q8vOqs/S-UBlMaQqlI/AAAAAAAAAH8/JH62yFqgp7M/gifs-orkut-3d-09.gif";
        smileyarr["rei"]="http://lh4.ggpht.com/_rApd6q8vOqs/S-UBlNEGoYI/AAAAAAAAAIA/qKF13rkStYQ/gifs-para-orkut-emoticons-62.gif";


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

//