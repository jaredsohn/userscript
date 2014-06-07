// ==UserScript==
// @name           Buzzed Smileys for Orkut by Subedaar
// @namespace     http://www.orkut.co.in/Main#Profile?uid=172310625596695735
// @author	Subedaar
// @description   Buzzed Smileys for Orkut. Just Made for Fun.
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
	smileyarr["strive"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1x0ZH1aVOI/AAAAAAAABeA/MvnxTg8KuhQ/%E5%8A%AA%E5%8A%9Bstrive.jpg";
	smileyarr["cry"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1x0ZM1KxEI/AAAAAAAABeE/PytTKNM_0iI/%E5%93%ADcry.jpg";
	smileyarr["puzzled"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1x0ZdlzAdI/AAAAAAAABeI/h0pAYFo6RFE/%E5%9B%B0%E6%83%91puzzled.jpg";
	smileyarr["grin"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1x0ZT9RiPI/AAAAAAAABeM/PNaZytSVuWY/%E5%9D%8F%E7%AC%91grin.jpg";
	smileyarr["rage"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1x0ZuKiyMI/AAAAAAAABeQ/P89wuxbHLzI/%E5%A4%A7%E6%80%92rage.jpg";
	smileyarr["laugh"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1x0p-C0O3I/AAAAAAAABeU/vE-B0Yq54Q8/%E5%A4%A7%E7%AC%91laugh.jpg";	
	smileyarr["sad"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1x0qEjE8BI/AAAAAAAABeY/gPKqeZGNz1o/%E5%A7%94%E5%B1%88sad.jpg";
	
	smileyarr["shy"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1x0qND3V9I/AAAAAAAABec/FOyfJmjcE3w/%E5%AE%B3%E7%BE%9Eshy.jpg";
	smileyarr["pleasantSurprise"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1x0qJymrlI/AAAAAAAABeg/XXYz30yVJhI/%E6%83%8A%E5%96%9Cpleasantsuprise.jpg";
	smileyarr["scared"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1x0qJqcLcI/AAAAAAAABek/h0MGlLDyvuE/%E6%83%8A%E6%81%90scared.jpg";
	smileyarr["sorry"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1x0zMwfYaI/AAAAAAAABeo/ATHceVnf0bw/%E6%8A%B1%E6%AD%89sorry.jpg";
	smileyarr["impatient"]="http://lh4.ggpht.com/_EM7uwS4HSZU/S1x0zEW_L7I/AAAAAAAABes/JO6zKoa-cqg/%E6%97%A0%E5%A5%88impatient.jpg";
	smileyarr["faint"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1x0zciRmjI/AAAAAAAABew/Yw9xkUkt-5c/%E6%99%95faint.jpg";
	smileyarr["angry"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S1x0zYgEeBI/AAAAAAAABe0/u-KUeUcNUMY/%E7%94%9F%E6%B0%94angry.jpg";
	smileyarr["painful"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1x0zlCK1FI/AAAAAAAABe4/krBQR_-XVTA/%E7%96%BCpainful.jpg";
	smileyarr["amative"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1x06kwWNbI/AAAAAAAABe8/EfhvqtlSqQY/%E8%89%B2amative.jpg";
	smileyarr["despise"]="http://lh3.ggpht.com/_EM7uwS4HSZU/S1x06gLccPI/AAAAAAAABfA/IOUkiBjuDTE/%E9%84%99%E8%A7%86despise.jpg";
	smileyarr["asleep"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S1x06pBzA7I/AAAAAAAABfE/QktrMgmWU0Y/%E9%85%A3%E7%9D%A1asleep.jpg";
	smileyarr["happy"]="http://lh5.ggpht.com/_EM7uwS4HSZU/S1x06xldYcI/AAAAAAAABfI/PYY4Rur7Ceo/%E9%AB%98%E5%85%B4happy.jpg";
	
	smileyarr["bother"]="http://lh6.ggpht.com/_EM7uwS4HSZU/S1x063BiicI/AAAAAAAABfM/LujeP4_TDqY/%E9%BA%BB%E7%83%A6%E4%BA%86bother.jpg";




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

// Subedaar's script