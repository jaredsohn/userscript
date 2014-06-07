// ==UserScript==
// @name          Animated Letters For Orkut by Preeya
// @namespace     http://www.orkut.co.in/Main#Home
// @author		  Preeya
// @description   Animated Letters for Orkut
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
	smileyarr["1"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TMnbGvf1osI/AAAAAAAAAC4/x0RS5oYldwQ/a.png";
	smileyarr["2"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TMnbGSUWFKI/AAAAAAAAACw/QylzBSy_8WA/b.png";
	smileyarr["3"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TMnbhkd0SWI/AAAAAAAAADI/RIC8vfvcZeY/c.png";
	smileyarr["4"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TMnbFlVPd5I/AAAAAAAAACo/0bSoVSbIqF0/d.png";
	smileyarr["5"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TMnbh8bYrZI/AAAAAAAAADM/X3Hn8179SWY/e.png";
	smileyarr["6"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TMnb9wxuM0I/AAAAAAAAADQ/0eHcTm-OyZo/f.gif";
	smileyarr["7"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TMnb94wFLhI/AAAAAAAAADU/X4d3NikpgoI/g.png";
	smileyarr["8"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TMnb-PK_ZlI/AAAAAAAAADY/FcGNYRvyRvU/h.png";
	smileyarr["9"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TMnbFxZ1szI/AAAAAAAAACs/NtV2S9z7BsU/i.png";
	smileyarr["10"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TMnb-lP9RSI/AAAAAAAAADc/C8SDsx2vf5k/j.png";
	smileyarr["11"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TMnb-jM_VxI/AAAAAAAAADg/8WeIwE_tsz4/k.png";
	smileyarr["12"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TMncu6VGLoI/AAAAAAAAADk/DkReS-WY4C0/l.png";
	smileyarr["13"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TMncvMD85PI/AAAAAAAAADo/X02calYD7Mw/m.png";
	smileyarr["14"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TMncv3_nldI/AAAAAAAAADs/E9bVxbYPAqU/n.png";
	smileyarr["15"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TMncwN6HgzI/AAAAAAAAADw/M1wXNRj1nso/o.png";
	smileyarr["16"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TMnbgvNPdGI/AAAAAAAAAC8/aGS2DPqcPT4/p.png";
	smileyarr["17"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TMncwYee3NI/AAAAAAAAAD0/eK8_vQJB098/q.png";
	smileyarr["18"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TMnbg5eoIyI/AAAAAAAAADA/jFNuuI4xIWc/r.png";
	smileyarr["19"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TMnbhBwEfbI/AAAAAAAAADE/Bb2RFNqnRq0/s.png";
	smileyarr["20"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TMndhQayltI/AAAAAAAAAD4/AhtkjtEihz8/t.png";
	smileyarr["21"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TMndhz4yYmI/AAAAAAAAAD8/VuAkuMnYSe4/u.png";
	smileyarr["22"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TMndh_JrFqI/AAAAAAAAAEA/ao379kYO-2A/v.png";
	smileyarr["23"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TMndiy6xxKI/AAAAAAAAAEE/1MKO2LsXtZk/w.png";
	smileyarr["24"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TMndi_f_5bI/AAAAAAAAAEI/NiZOtyo2w50/x.png";
	smileyarr["25"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TMnbGQy_h5I/AAAAAAAAAC0/bBJB0GGik6c/y.png";
	smileyarr["26"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TMndraqP8xI/AAAAAAAAAEM/onPQfidN6I4/z.png";

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