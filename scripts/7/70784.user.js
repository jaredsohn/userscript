// ==UserScript==
// @name			Extra Emoitions For Arlong Park (Opera and Chrome Version)
// @namespace		http://www.apforums.net/member.php?u=15390
// @author			Fire-Fist 
// @description   	Use extra emotions for Apforums. Special Thanks to Chrissie
// @include       	http://*apforums.net/newreply.php?*
// @include       	http://*apforums.net/newthread.php?*
// @include       	http://*forums.arlongpark.net/newreply.php?*
// @include       	http://*forums.arlongpark.net/newthread.php?*
// ==/UserScript==
// THIS IS ONLY FOR OPERA and CHROME not FIREFOX!!!!
/********************************************************************************\
|Special thanks Chrissie for awesome emotions                               	 |
|																				 |
|if you have any comments/ suggestions or bugs to report do it in thread on AP	 |
|and to Ankit deep for allowing to use his exsiting list of emotions ^_^ 		 | 
\********************************************************************************/

if( document.title.indexOf("Arlong Park Forums")>-1)
{
	function StartChrissie() {
		var Chrissie = new Array();	
		
		//Insert your emotions here.
		// partern is Chrissie["<Name here>"]="<link here>";
		// to remove any.. locate its link and delete that line :)
		
		
		Chrissie["Pirate"]="http://i47.tinypic.com/2ibgpb7.jpg";
		Chrissie["WB"]="http://i38.tinypic.com/16k3qex.gif";
		Chrissie["Roger"]="http://i47.tinypic.com/2v8jyas.jpg";
		Chrissie["Pirate2"]="http://i49.tinypic.com/2vjreis.gif";
		Chrissie["Luffy"]="http://i46.tinypic.com/2afejro.jpg";
		Chrissie["sanji"]="http://i49.tinypic.com/123kr42.jpg";
		Chrissie["nami"]="http://i47.tinypic.com/afdhm9.jpg";
		Chrissie["chapapapa"]="http://i48.tinypic.com/2yuzvjo.jpg";
		Chrissie["smile"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/1.gif";
		Chrissie["sad"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/2.gif";
		Chrissie["angry"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/14.gif";
		Chrissie["bsmile"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/4.gif";
		Chrissie["funny"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/10.gif";
		Chrissie["surprise"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/13.gif";
		Chrissie["wink"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/3.gif";
		Chrissie["cool"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/16.gif";
		Chrissie["confuse"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/7.gif";
		Chrissie["hug"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/6.gif";
		Chrissie["heart"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/8.gif";
		Chrissie["kiss"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/11.gif";
		Chrissie["laugh"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/21.gif";
		Chrissie["drool"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/38.gif";
		Chrissie["doubt"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/23.gif";
		Chrissie["blush"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/9.gif";
		Chrissie["devil"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/19.gif";
		Chrissie["angel"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/25.gif";
		Chrissie["roll"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/24.gif";
		Chrissie["sleep"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/28.gif";
		Chrissie["notalk"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/33.gif";
		Chrissie["worried"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/17.gif";
		Chrissie["wait"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/45.gif";
		Chrissie["applause"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/41.gif";
		Chrissie["straight"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/22.gif";
		Chrissie["silly"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/35.gif";
		Chrissie["smug"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/15.gif";
		Chrissie["sick"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/31.gif";
		Chrissie["party"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/36.gif";
		Chrissie["dream"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/105.gif";
		Chrissie["irritated"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/102.gif";
		Chrissie["eyelash"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/104.gif";
		Chrissie["whew"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/18.gif";
		Chrissie["nerd"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/26.gif";
		Chrissie["phbbt"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/47.gif";
		Chrissie["hypno"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/43.gif";
		Chrissie["yawn"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/37.gif";
		Chrissie["sigh"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/46.gif";
		Chrissie["clown"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/34.gif";
		Chrissie["bye"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/103.gif";
		Chrissie["bringiton"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/70.gif";
		Chrissie["peace"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/67.gif";
		Chrissie["dancing"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/69.gif";
		Chrissie["worthy"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/77.gif";
		Chrissie["money"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/64.gif";
		Chrissie["pray"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/63.gif";
		Chrissie["chatter"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/76.gif";
		Chrissie["whistle"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/65.gif";
		Chrissie["puppy"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/108.gif";
		Chrissie["pig"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/49.gif";
		Chrissie["cow"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/50.gif";
		Chrissie["monkey"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/51.gif";
		Chrissie["chick"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/52.gif";
		Chrissie["rose"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/53.gif";
		Chrissie["cafe"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/57.gif";
		Chrissie["skull"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/59.gif";
		Chrissie["star"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/79.gif";
		Chrissie["ying"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/75.gif";
		Chrissie["boy"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/72.gif";
		Chrissie["girl"]="http://i242.photobucket.com/albums/ff6/yahoo-emotions/74.gif";
		Chrissie["msn1"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/lcheln.gif";
		Chrissie["msn2"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-traurig.gif";
		Chrissie["msn3"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley_wtend.gif";
		Chrissie["msn4"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-zunge.gif";
		Chrissie["msn5"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-lachen.gif";
		Chrissie["msn6"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-erstaunt.gif";
		Chrissie["msn7"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/zwinkern.gif";
		Chrissie["msn8"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-cool.gif";
		Chrissie["msn9"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-grbeln.gif";
		Chrissie["msn10"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/Herz.gif";
		Chrissie["msn11"]="http://i214.photobucket.com/albums/cc149/abujug/vampire.gif";
		Chrissie["msn12"]="http://i214.photobucket.com/albums/cc149/abujug/emb.gif";
		Chrissie["msn13"]="http://i189.photobucket.com/albums/z154/Danteez/Smileys/nono.gif";
		Chrissie["msn14"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-Smiley_heulen.gif";
		Chrissie["msn16"]="http://i123.photobucket.com/albums/o313/elecmx/msn_angel.gif";
		Chrissie["msn17"]="http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_rolleyes.gif";
		Chrissie["msn18"]="http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_sleepy.gif";
		Chrissie["msn19"]="http://i103.photobucket.com/albums/m126/step666/MSN%20smilies/msn_lipssealed.gif";
		Chrissie["msn20"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-daumenhoch.gif";
		Chrissie["msn21"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/ms-daumenrunter.gif";
		Chrissie["msn22"]="http://i123.photobucket.com/albums/o313/elecmx/msn_beer.gif";
		Chrissie["msn23"]="http://i123.photobucket.com/albums/o313/elecmx/msn_cake.gif";
		Chrissie["msn24"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Martini.gif";
		Chrissie["msn25"]="http://i123.photobucket.com/albums/o313/elecmx/msn_sick.gif";
		Chrissie["msn26"]="http://i123.photobucket.com/albums/o313/elecmx/msn_party.gif";
		Chrissie["msn27"]="http://i214.photobucket.com/albums/cc149/abujug/what_smile.gif";
		Chrissie["msn28"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-Kuss.gif";
		Chrissie["msn29"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/msn-geschenk.gif";
		Chrissie["msn30"]="http://i172.photobucket.com/albums/w23/Hoelderlin/MSN-smileys/MSN-smiley-Rose.gif";
		Chrissie["msn31"]="http://i189.photobucket.com/albums/z154/Danteez/Smileys/nerd.gif";
		Chrissie["msn32"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Guy.gif";
		Chrissie["msn33"]="http://i96.photobucket.com/albums/l192/myshenty/MSN/girl.gif";
		Chrissie["msn34"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/WiltedRose.gif";
		Chrissie["msn35"]="http://i96.photobucket.com/albums/l192/myshenty/MSN/camera.gif";
		Chrissie["msn36"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Film.gif";
		Chrissie["msn37"]="http://i96.photobucket.com/albums/l192/myshenty/MSN/cat.gif";
		Chrissie["msn38"]="http://i96.photobucket.com/albums/l192/myshenty/MSN/dog.gif";
		Chrissie["msn39"]="http://i96.photobucket.com/albums/l192/myshenty/MSN/moon.gif";
		Chrissie["msn40"]="http://i123.photobucket.com/albums/o313/elecmx/msn_pizza.gif";
		Chrissie["msn41"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Fotball.gif";
		Chrissie["msn42"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Car.gif";
		Chrissie["msn43"]="http://i19.photobucket.com/albums/b196/theyellowducky/Smilies/MSN/Island.gif";
		Chrissie["msn44"]="http://i123.photobucket.com/albums/o313/elecmx/msn_sheep.gif";
		
		
		
		// DO NOT EDIT BLOW THIS LINE
		//================================================================\\
		var location = document.getElementsByTagName('textarea');
		text=location[0];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");d.className="sims";d.align="left";d.style.marginTop="10px";c.appendChild(d);
		
		for(title in Chrissie){
			emotion=document.createElement("a");emotion.href="javascript:;";emotion.setAttribute("gult",0);emotion.innerHTML="<img src='"+Chrissie[title]+"' title='"+title+"'>";emotion.addEventListener("click", insertChrissie, true);d.appendChild(emotion);
		}
		
	}
	function insertChrissie(){
/*		var str1=window[0].document.body.innerHTML;
		var str2=str1.substring(str1.length-5, str1.length);
		var str3=str1.substring(0,str1.length-5);

		if(str2.indexOf("<br>")>-1)
		{
			window[0].document.body.innerHTML=str3;
		}
		*/
		
		var image = this.getElementsByTagName('img')[0].getAttribute("src");
		document.getElementById("vB_Editor_001_textarea").value+="[img]"+image+"[/img]";
	}
	
	StartChrissie();
}