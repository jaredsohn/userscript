// ==UserScript==
// @name          Funky Leaf Smileys by swαтι..
// @namespace     http://www.orkut.co.in/Profile?uid=15147230465059278431
// @author	  swati..
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
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
	smileyarr["hie"]="http://lh6.ggpht.com/_2D983UpPeSc/TJVGt8cpq1I/AAAAAAAAAfI/C48swKeGrAU/1%20-%20hie.gif";
        smileyarr["hehe"]="http://lh5.ggpht.com/_2D983UpPeSc/TJVGuXnKd5I/AAAAAAAAAfM/MNPk8uCJJvk/2%20-%20hehe.gif";
        smileyarr["haha"]="http://lh5.ggpht.com/_2D983UpPeSc/TJVGuTjKR5I/AAAAAAAAAfQ/XHP74X5O4Jg/3%20-%20haha.gif";
        smileyarr["cry"]="http://lh5.ggpht.com/_2D983UpPeSc/TJVGukulxXI/AAAAAAAAAfU/hI4baJMYgRo/4%20-%20cry.gif";
        smileyarr["cry out loud'"]="http://lh4.ggpht.com/_2D983UpPeSc/TJVGu14nCpI/AAAAAAAAAfY/Eprz--iJxo8/5%20-%20cry%20out%20loud.gif";
        smileyarr["omg"]="http://lh3.ggpht.com/_2D983UpPeSc/TJVG8YEUJpI/AAAAAAAAAfc/yotv9eOuYgk/6%20-%20omg.gif";
        smileyarr["excited"]="http://lh4.ggpht.com/_2D983UpPeSc/TJVG8fIhNKI/AAAAAAAAAfg/SaHbTgaoHMs/7%20-%20excited.gif";
        smileyarr["luv u"]="http://lh6.ggpht.com/_2D983UpPeSc/TJVG8nHqdxI/AAAAAAAAAfk/k9fVQ_1JJF0/8%20-%20luv%20u.gif";
        smileyarr["luv struck"]="http://lh3.ggpht.com/_2D983UpPeSc/TJVG8prH67I/AAAAAAAAAfo/WlCK0dgogEI/9%20-%20luv%20struck.gif";
        smileyarr["confused"]="http://lh6.ggpht.com/_2D983UpPeSc/TJVG81SZdJI/AAAAAAAAAfs/2ostRZP6tq8/10%20-%20confused.gif";



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

// swati's script