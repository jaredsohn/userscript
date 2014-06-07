// ==UserScript==
// @name         34 Smiley By Zombie
// @namespace    Zombie
// @author	 Zombie
// @description  Click on The Smiley to Insert!Enjoy!
// @include        http://*.orkut.*/*
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
	smileyarr["Zombie"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/have-a-nice-day-icon.png";
smileyarr["Zombie111"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/grin-icon.png";
smileyarr["Zombie222"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/hope-my-fake-smile-works-again-icon.png";
	smileyarr["Zombie1"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/enjoying-mah-playlist-icon.png";
	smileyarr["Zombie2"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/evilish-icon.png";
	smileyarr["Zombie3"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/hope-my-fake-smile-works-again-icon.png";
	smileyarr["Zombie4"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/secret-laugh-icon.png";
	smileyarr["Zombie5"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/XD-icon.png";
	smileyarr["Zombie6"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/TT-TT-icon.png";
	smileyarr["Zombie7"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/ouch-it-hurts-icon.png";
	smileyarr["Zombie8"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/brains-icon.png";
	smileyarr["Zombie9"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/chinese-icon.png";
	smileyarr["Zombie11"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/on-fire-icon.png";
	smileyarr["Zombie12"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/omg-icon.png";
	smileyarr["Zombie13"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/O-O-icon.png";
	smileyarr["Zombie14"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/sick-icon.png";
	smileyarr["Zombie15"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/serious-business-icon.png";
	smileyarr["Zombie16"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/yuush-icon.png";
	smileyarr["Zombie17"]="http://icons.iconarchive.com/icons/bad-blood/yolks/128/in-love-icon.png";
	smileyarr["Zombie19"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/beaten-icon.png";
	smileyarr["Zombie20"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/burnt-icon.png";
	smileyarr["Zombie21"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/gangs-icon.png";
	smileyarr["Zombie22"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/innocent-icon.png";
	smileyarr["Zombie23"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/nose-pick-icon.png";
	smileyarr["Zombie24"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/oh-noes-icon.png";
	smileyarr["Zombie25"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/psychotic-icon.png";
	smileyarr["Zombie26"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/secret-laugh-icon.png";
	smileyarr["Zombie27"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/shy-icon.png";
	smileyarr["Zombie28"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/teeth-brushing-icon.png";
	smileyarr["Zombie29"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/whisper-icon.png";
	smileyarr["Zombie30"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/yum-icon.png";
	smileyarr["Zombie31"]="http://icons.iconarchive.com/icons/bad-blood/yolks-2/128/you-seem-to-be-serious-icon.png";

	


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