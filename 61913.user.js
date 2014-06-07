// ==UserScript==
// @name         weiterbildungsende basti version hamburg berlin 4.0
// @namespace     basti1012 http://pennerhack.foren-city.de
// @description  zeigt das Ende der 1 weiterbildung an und das ende der tier weiter bildung fest verankert oben in der leiste
// @version	 1.1.1
// @include      *pennergame.de/*
// @exclude	 http://newboard.pennergame.de
// @exclude      http://change.pennergame.de/*
// @exclude      http://*.pennergame.de/redirect/?site=*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://www")>=0) {
	var gamelink = "http://www.pennergame.de"
	var medialink = "http://media.pennergame.de"
}

if (url.indexOf("http://berlin")>=0) {
	var gamelink = "http://berlin.pennergame.de"
	var medialink = "http://media.pennergame.de"
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div.prozentbalken_1{background-repeat: repeat-x; border:none;border-right:1px solid #000;padding-left:3px;background:url(http://media.pennergame.de/img/processbar.jpg);font:9px Verdana,Arial,Helvetica,sans-serif;position:relative;height:12px;z-index:1;}')
addGlobalStyle('div.prozentbalken_2{background-repeat: repeat-x; border:none;border-right:1px solid #000;padding-left:3px;background:url(http://media.pennergame.de/img/processbar.jpg);font:9px Verdana,Arial,Helvetica,sans-serif;position:relative;height:12px;z-index:1;}')

GM_xmlhttpRequest({
	method: 'GET',
	url: ""+gamelink+"/skills/",
		onload: function(response) {
		var content = response.responseText;

		//function test11(){
			try{	
				var w_end_wait0 = content.split('Eine weitere Bildung ist in der Warteschlange')[1];
				var w_end_wait = w_end_wait0.split('<span class="style_skill">')[1].split('</span>')[0];
				var date_wait = content.split('<span class="style_skill">')[1].split('</span>')[0];
				
				var start_time = content.split('var start = ')[1].split(';')[0];
				var end_time = content.split('var end = ')[1].split(';')[0];
				var timestamp_w = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
				var end_date1 = new Date();
				end_date1.setTime(end_time * 1000);
	
				w_end_time = 
				((end_date1.getHours()<10)?'0'+end_date1.getHours():
				end_date1.getHours())+':'+((end_date1.getMinutes()<10)?'0'+end_date1.getMinutes():
				end_date1.getMinutes());

				w_end_day = 
				((end_date1.getDate()<10)?'0'+end_date1.getDate():
				end_date1.getDate())+'.'+(((end_date1.getMonth()+1)<10)?'0'+(end_date1.getMonth()+1):
				(end_date1.getMonth()+1))+'.'+end_date1.getFullYear();
				
				gesammt = end_time - start_time;
				bisher = timestamp_w - start_time;
				perc0 = (bisher / gesammt) * 100;

				if(perc0 > 0  && perc0 < 100) {
				width_balken0 = Math.round(perc0*5)/5;  
				percger0 = Math.round(perc0*10)/10; }

				if(perc0 < 0) {
				width_balken0 = 0;	
				percger0 = "keine weiterbildung an laufen"; }

				if(perc0 > 100) {
				width_balken0 = 100; 
				percger0 = 'Warte auf fertigstellung 100 % erreicht';}

				if (!width_balken0) {
				width_balken0 = 0; }

				var weiterbildung_0_2 = ''+date_wait+'<div class="prozentbalken_1"  style=\"width:'+width_balken0+'px;>'+percger0+'&#37;(Penner)</div></div>'

				}catch(err){}

GM_xmlhttpRequest({
	method: 'GET',
	url: ""+gamelink+"/skills/pet/",
		onload: function(response) {
			var content = response.responseText;

					try{	
						var w_end_wait0 = content.split('uft bereits eine Weiterbildung')[1];
						var w_end_wait = w_end_wait0.split('<span class="style_skill">')[1].split('</span>')[0];
						var date_wait = content.split('<span class="style_skill">')[1].split('</span>')[0];

						var start_time = content.split('var start = ')[1].split(';')[0];
						var end_time = content.split('var end = ')[1].split(';')[0];
						var timestamp_w = content.split('<input id="now_timestamp" type="hidden" value="')[1].split('">')[0];
						var end_date1 = new Date();
						end_date1.setTime(end_time * 1000);
	
						w_end_time = 
						((end_date1.getHours()<10)?'0'+end_date1.getHours():
						end_date1.getHours())+':'+((end_date1.getMinutes()<10)?'0'+end_date1.getMinutes():
						end_date1.getMinutes());

						w_end_day = 
						((end_date1.getDate()<10)?'0'+end_date1.getDate():
						end_date1.getDate())+'.'+(((end_date1.getMonth()+1)<10)?'0'+(end_date1.getMonth()+1):
						(end_date1.getMonth()+1))+'.'+end_date1.getFullYear();
				
						gesammt = end_time - start_time;
						bisher = timestamp_w - start_time;
						perc0 = (bisher / gesammt) * 100;

						if(perc0 > 0  && perc0 < 100) {
						width_balken0 = Math.round(perc0*5)/5;  
						percger0 = Math.round(perc0*10)/10; }

						if(perc0 < 0) {
						width_balken0 = 0;	
						percger0 = "keine weiterbildung an laufen"; }

						if(perc0 > 100) {
						width_balken0 = 100; 
						percger0 = 'Warte auf fertigstellung 100 % erreicht';}

						if (!width_balken0) {
						width_balken0 = 0; }
		
						var weiterbildung_0_1 = ''+date_wait+'<div class="prozentbalken_2"  style=\"width:'+width_balken0+'px;>'+percger0+'&#37;(Tier)</div></div>'
						}catch(err){}

						var li = document.getElementsByTagName('li')[4];
						li.innerHTML = weiterbildung_0_1;		

						var li = document.getElementsByTagName('li')[4];
						li.innerHTML += weiterbildung_0_2;		
		//}
		//window.setInterval(test11, 2000);
}});
}});



