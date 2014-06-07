// ==UserScript==
// @name           Yahoo & mSN Smilies in Orkut! now with reply scraps ENABLED
// @namespace    donno :p
// @author	 pata nahin :p
// @description    Use Yahoo! n msn!Smilies for Orkut! nd no need 2fill capcthas :P nd works with reply boxes
// @include        http://www.orkut.com/Scrapbook.aspx*
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
	smileyarr["smile"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/1.gif";
	smileyarr["sad"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/2.gif";
	smileyarr["angry"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/14.gif";
	smileyarr["bsmile"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/4.gif";
	smileyarr["funny"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/10.gif";
	smileyarr["surprise"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/13.gif";
	smileyarr["wink"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/3.gif";
	smileyarr["cool"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/16.gif";
	smileyarr["confuse"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/7.gif";
	smileyarr["hug"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/6.gif";
	smileyarr["heart"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/8.gif";
	smileyarr["kiss"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/11.gif";
	smileyarr["laugh"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/21.gif";
	smileyarr["drool"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/38.gif";
	smileyarr["doubt"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/23.gif";
	smileyarr["blush"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/9.gif";
	smileyarr["devil"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/19.gif";
	smileyarr["angel"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/25.gif";
	smileyarr["roll"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/24.gif";
	smileyarr["sleep"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/28.gif";
	smileyarr["notalk"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/33.gif";
	smileyarr["worried"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/17.gif";
	smileyarr["wait"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/45.gif";
	smileyarr["applause"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/41.gif";
	smileyarr["straight"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/22.gif";
	smileyarr["silly"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/35.gif";
	smileyarr["smug"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/15.gif";
	smileyarr["sick"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/31.gif";
	smileyarr["party"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/36.gif";
	smileyarr["dream"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/105.gif";
	smileyarr["irritated"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/102.gif";
	smileyarr["eyelash"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/104.gif";
	smileyarr["whew"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/18.gif";
	smileyarr["nerd"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/26.gif";
	smileyarr["phbbt"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/47.gif";
	smileyarr["hypno"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/43.gif";
	smileyarr["yawn"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/37.gif";
	smileyarr["sigh"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/46.gif";
	smileyarr["clown"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/34.gif";
	smileyarr["bye"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/103.gif";
	smileyarr["bringiton"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/70.gif";
	smileyarr["peace"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/67.gif";
	smileyarr["dancing"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/69.gif";
	smileyarr["worthy"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/77.gif";
	smileyarr["money"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/64.gif";
	smileyarr["pray"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/63.gif";
	smileyarr["chatter"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/76.gif";
	smileyarr["whistle"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/65.gif";
	smileyarr["puppy"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/108.gif";
	smileyarr["pig"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/49.gif";
	smileyarr["cow"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/50.gif";
	smileyarr["monkey"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/51.gif";
	smileyarr["chick"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/52.gif";
	smileyarr["rose"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/53.gif";
	smileyarr["cafe"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/57.gif";
	smileyarr["skull"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/59.gif";
	smileyarr["star"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/79.gif";
	smileyarr["ying"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/75.gif";
	smileyarr["boy"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/72.gif";
	smileyarr["girl"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/74.gif";
	smileyarr["msn1"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/lcheln.gif";
	smileyarr["msn2"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-traurig.gif";
	smileyarr["msn3"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley_wtend.gif";
	smileyarr["msn4"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-zunge.gif";
	smileyarr["msn5"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-lachen.gif";
	smileyarr["msn6"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-erstaunt.gif";
	smileyarr["msn7"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/zwinkern.gif";
	smileyarr["msn8"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-cool.gif";
	smileyarr["msn9"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-grbeln.gif";
	smileyarr["msn10"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/Herz.gif";
	smileyarr["msn11"]="http://i214.photobucket.com/albums/cc149/abujug/vampire.gif";
	smileyarr["msn12"]="http://i214.photobucket.com/albums/cc149/abujug/emb.gif";
	smileyarr["msn13"]="http://i189.photobucket.com/albums/z154/Danteez/Smileys/nono.gif";
	smileyarr["msn14"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-Smiley_heulen.gif";
	smileyarr["msn15"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/emsteufel.gif";
	smileyarr["msn16"]="http://i123.photobucket.com/albums/o313/elecmx/msn_angel.gif";
	smileyarr["msn17"]="http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_rolleyes.gif";
	smileyarr["msn18"]="http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_sleepy.gif";
	smileyarr["msn19"]="http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_lipssealed.gif";
	smileyarr["msn20"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-daumenhoch.gif";
	smileyarr["msn21"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/ms-daumenrunter.gif";
	smileyarr["msn22"]="http://i123.photobucket.com/albums/o313/elecmx/msn_beer.gif";
	smileyarr["msn23"]="http://i123.photobucket.com/albums/o313/elecmx/msn_cake.gif";
	smileyarr["msn24"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Martini.gif";
	smileyarr["msn25"]="http://i123.photobucket.com/albums/o313/elecmx/msn_sick.gif";
	smileyarr["msn26"]="http://i123.photobucket.com/albums/o313/elecmx/msn_party.gif";
	smileyarr["msn27"]="http://i214.photobucket.com/albums/cc149/abujug/what_smile.gif";
	smileyarr["msn28"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-Kuss.gif";
	smileyarr["msn29"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-geschenk.gif";
	smileyarr["msn30"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-Rose.gif";
	smileyarr["msn31"]="http://i189.photobucket.com/albums/z154/Danteez/Smileys/nerd.gif";
	smileyarr["msn32"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Guy.gif";
	smileyarr["msn33"]="http://i96.photobucket.com/albums/l192/myshenty/MSN/girl.gif";
	smileyarr["msn34"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/WiltedRose.gif";
	smileyarr["msn35"]="http://i96.photobucket.com/albums/l192/myshenty/MSN/camera.gif";
	smileyarr["msn36"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Film.gif";
	smileyarr["msn37"]="http://i96.photobucket.com/albums/l192/myshenty/MSN/cat.gif";
	smileyarr["msn38"]="http://i96.photobucket.com/albums/l192/myshenty/MSN/dog.gif";
	smileyarr["msn39"]="http://i96.photobucket.com/albums/l192/myshenty/MSN/moon.gif";
	smileyarr["msn40"]="http://i123.photobucket.com/albums/o313/elecmx/msn_pizza.gif";
	smileyarr["msn41"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Fotball.gif";
	smileyarr["msn42"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Car.gif";
	smileyarr["msn43"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Island.gif";
	smileyarr["msn44"]="http://i123.photobucket.com/albums/o313/elecmx/msn_sheep.gif";
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