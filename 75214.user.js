// ==UserScript==

// @name	ORKUT MOST COOLEST 40 PNG SMILEY BY GENX
// @version	5.00
// @author	HOD
// @namespace	GENX
// @description	Use most coolest smiley in your ScrapBook and HTML community Forums. Just click on a smiley to insert. Enjoy guyss.
// @include     http*://*.orkut.*/*
// @exclude     http://*.orkut.*/Main#*
// @exclude     http://*.orkut.gmodules.*


// ==/UserScript==

/************************************
 
 Script Template by Hod [Team GENX]

  Original Base script by HOD

**************************************/

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
smileyarr["cool"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PZfcl4ooI/AAAAAAAAAH8/swxhHBy-MyA/cool.png";
smileyarr["crazy"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9PZfuiNKGI/AAAAAAAAAIA/El7d71EhQ-o/crazy.png";
smileyarr["crying"]="http://lh6.ggpht.com/_y-pCIzNwXfE/S9PZfmbAThI/AAAAAAAAAIE/HpxiiqbCwHM/crying.png";
smileyarr["damn"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9PZfiO9mdI/AAAAAAAAAII/_pFsbIcH0CU/damn.png";
smileyarr["dont say dat"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9PZf72giQI/AAAAAAAAAIM/7lkaGQuE9Us/dont%20say%20dat.png";
smileyarr["evil plan"]="http://lh4.ggpht.com/_y-pCIzNwXfE/S9PZn4TlcDI/AAAAAAAAAIQ/sYD3ccceKGg/evil%20plan.png";
smileyarr["fantasy dreams"]="http://lh6.ggpht.com/_y-pCIzNwXfE/S9PZn5O3GpI/AAAAAAAAAIU/3xW-CIAnWnY/fantasy%20dreams.png";
smileyarr["geek"]="http://lh4.ggpht.com/_y-pCIzNwXfE/S9PZn-rBzSI/AAAAAAAAAIY/MYidJVynLP8/geek.png";
smileyarr["glad"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PZoPWN_4I/AAAAAAAAAIc/OUASidC7LaQ/glad.png";
smileyarr["gotcha"]="http://lh6.ggpht.com/_y-pCIzNwXfE/S9PZoTA1VOI/AAAAAAAAAIg/1w18d5LySrg/gotcha.png";
smileyarr["ha-ha"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PZyLRViBI/AAAAAAAAAIk/JdgD4ftLip8/ha-ha.png";
smileyarr["heyyyy"]="http://lh4.ggpht.com/_y-pCIzNwXfE/S9PZyH4opyI/AAAAAAAAAIo/I2aKtUFhnPY/heyyyyy.png";
smileyarr["hi"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PZyEOZi9I/AAAAAAAAAIs/TYEJubcNcEA/hi.png";
smileyarr["hohoho"]="http://lh6.ggpht.com/_y-pCIzNwXfE/S9PZynU0SDI/AAAAAAAAAIw/Jw5SrhrS1u4/ho%20ho%20ho.png";
smileyarr["huh"]="http://lh6.ggpht.com/_y-pCIzNwXfE/S9PZy0BXFeI/AAAAAAAAAI0/8PILb_nHQrc/huh.png";
smileyarr["idiotic smile"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PZ_ue_ASI/AAAAAAAAAI4/NAeteth65r8/idiotic%20smile.png";
smileyarr["indecentlove"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PZ_pMrObI/AAAAAAAAAI8/Og9u3uUibpM/indecent%20love.png";
smileyarr["kiss"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9PZ_v3hmII/AAAAAAAAAJA/VIKQbA9HtKE/kiss.png";
smileyarr["lol"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9PZ_0CIUVI/AAAAAAAAAJE/s_Rvrp0E6EA/lol.png";
smileyarr["love"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PZ_4lyfaI/AAAAAAAAAJI/M7qfFT96eIg/love.png";
smileyarr["mad"]="http://lh4.ggpht.com/_y-pCIzNwXfE/S9PaJCzQmQI/AAAAAAAAAJM/fI9uPWQwWMw/mad.png";
smileyarr["mmmm"]="http://lh4.ggpht.com/_y-pCIzNwXfE/S9PaJHhI2jI/AAAAAAAAAJQ/7tkwGtBVuUo/mmmmm.png";
smileyarr["muhaa"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9PaJY7m2kI/AAAAAAAAAJU/X3bKMDQhPzA/muhaa.png";
smileyarr["offended"]="http://lh4.ggpht.com/_y-pCIzNwXfE/S9PaJivaa9I/AAAAAAAAAJY/mlGqhCALfbI/offended.png";
smileyarr["omg"]="http://lh4.ggpht.com/_y-pCIzNwXfE/S9PaJmh-ELI/AAAAAAAAAJc/ZvvBzm0MGFQ/omg.png";
smileyarr["oopsy"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9PaTHJvcuI/AAAAAAAAAJg/Hkl8oFJ-gZM/oopsy.png";
smileyarr["ouch"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9PaTTluWGI/AAAAAAAAAJk/x74WftkBUiY/ouch.png";
smileyarr["owshh"]="http://lh6.ggpht.com/_y-pCIzNwXfE/S9PaTbU9YDI/AAAAAAAAAJo/19lCN-aLrxA/ow%20sh....png";
smileyarr[":p"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PaTRp4xqI/AAAAAAAAAJs/LnWJ9YKQDI8/p.png";
smileyarr["sarcastic sadness"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PaTtmTPvI/AAAAAAAAAJw/UVT3uZOfLdo/sarcastic%20sadness.png";
smileyarr["scared"]="http://lh4.ggpht.com/_y-pCIzNwXfE/S9PaaoiefqI/AAAAAAAAAJ0/TDHdQ_HI1L0/scared.png";
smileyarr["sincere sadness"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9PaaoBRD6I/AAAAAAAAAJ4/IcywxgEkqx0/sincere%20sadness.png";
smileyarr["stay away"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PaapwjvBI/AAAAAAAAAJ8/ldhfJOd_7PQ/STAY%20AWAY.png";
smileyarr["stupid idea"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9Paa_wQimI/AAAAAAAAAKA/71VWgLj28G8/stupid%20idea.png";
smileyarr["sparata"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9Paa9vm_oI/AAAAAAAAAKE/MoGCaZiUDgg/THIS%20IS%20SPARATA.png";
smileyarr["very evil plan"]="http://lh4.ggpht.com/_y-pCIzNwXfE/S9PalknyqZI/AAAAAAAAAKI/OH3t1PQY-mo/very%20evil%20plan.png";
smileyarr["wink"]="http://lh6.ggpht.com/_y-pCIzNwXfE/S9Pal327qbI/AAAAAAAAAKM/3RS8eace1Iw/wink.png";
smileyarr["woh noo"]="http://lh4.ggpht.com/_y-pCIzNwXfE/S9Pal0pVoRI/AAAAAAAAAKQ/e1s0b-ogvMs/woh%20noo%21%21.png";
smileyarr["wow dude"]="http://lh5.ggpht.com/_y-pCIzNwXfE/S9PamPyhS7I/AAAAAAAAAKU/JbsqNuB02O4/wow%20dude.png";
smileyarr["WTF"]="http://lh3.ggpht.com/_y-pCIzNwXfE/S9PamGMX3hI/AAAAAAAAAKY/JHVKIxUJFu4/WTF%21%21.png";

	

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


// Visit our official website www.odpe.webs.com.
//~~Happy Orkutting~~
// Regards--- GENX