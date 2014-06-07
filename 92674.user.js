// ==UserScript==
// @name          Animated Letters ver2.0 For Orkut by Preeya
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
	smileyarr["a1"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaJ0tGmjFI/AAAAAAAAAUc/oB1Xv0sIbB4/a.png";
	smileyarr["a2"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TQaJ05DDf1I/AAAAAAAAAUg/VSjYlLlTGDg/b.png";
	smileyarr["a3"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TQaJ1MmLq4I/AAAAAAAAAUk/3s_NkuhICAo/c.png";
	smileyarr["a4"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TQaJ1eXeEWI/AAAAAAAAAUo/pQbYqlgpNpk/d.png";
	smileyarr["a5"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TQaJ1ZRUTdI/AAAAAAAAAUs/W7f00RcO9EE/e.png";
	smileyarr["a6"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TQaKAIABxdI/AAAAAAAAAUw/07lKVij9Pyk/f.png";
	smileyarr["a7"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TQaKAc4dF5I/AAAAAAAAAU0/pRxS0bfXCO8/g.png";
	smileyarr["a8"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TQaKAvaFuTI/AAAAAAAAAU4/8C7V4dK3CP0/h.png";
	smileyarr["a9"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaKAyix5aI/AAAAAAAAAU8/0tNl6zq2__c/i.png";
	smileyarr["a10"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaKBPL80gI/AAAAAAAAAVA/zNUC0FvpC1U/j.png";
	smileyarr["a11"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaKVgiy0YI/AAAAAAAAAVI/gsKQTu-4B2s/k.png";
	smileyarr["a12"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaKV0s518I/AAAAAAAAAVM/2dwSo0ss3PA/l.png";
	smileyarr["a13"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TQaKWJn76kI/AAAAAAAAAVQ/t_ybpIJtrAI/m.png";
	smileyarr["a14"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaKWbffeEI/AAAAAAAAAVU/nUFv76QLDbM/n.png";
	smileyarr["a15"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TQaKjkilp5I/AAAAAAAAAVY/vfQqQLkMw9k/o.png";
	smileyarr["a16"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TQaKjgpcg0I/AAAAAAAAAVc/5sHosGMDk0M/p.png";
	smileyarr["a17"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TQaKj6QbLyI/AAAAAAAAAVg/3SnFi9n5cLo/q.png";
	smileyarr["a18"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaKkJ1k2LI/AAAAAAAAAVk/KgJ3DS6lgHo/r.png";
	smileyarr["a19"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TQaKkmhBYGI/AAAAAAAAAVo/oUTDwqDYjRE/s.png";
	smileyarr["a20"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaLIyNJG_I/AAAAAAAAAV8/iJmidi_Ye58/t.png";
	smileyarr["a21"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaLJJJg0fI/AAAAAAAAAWA/C9EiBGhgCOQ/u.png";
	smileyarr["a22"]="http://lh6.ggpht.com/_Gb9BpeKB0l0/TQaLJUK6C4I/AAAAAAAAAWE/RcyuD9psHV0/v.png";
	smileyarr["a23"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaK8g8OBKI/AAAAAAAAAVs/BX3Lb-0r-6I/w.png";
	smileyarr["a24"]="http://lh4.ggpht.com/_Gb9BpeKB0l0/TQaK89d-7QI/AAAAAAAAAVw/cQ0kv45Xe6M/x.png";
	smileyarr["a25"]="http://lh3.ggpht.com/_Gb9BpeKB0l0/TQaK9LCEZzI/AAAAAAAAAV0/w-7AwUBQuiI/y.png";
	smileyarr["a26"]="http://lh5.ggpht.com/_Gb9BpeKB0l0/TQaK9VGZ_sI/AAAAAAAAAV4/20GUpqXur-s/z.png";

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