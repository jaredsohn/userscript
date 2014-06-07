// ==UserScript==
// @name           Plunder anzeige ueberall pennergame 4.0 by basti1012
// @author         basti1012 http://pennerhack.foren-city.de
// @namespace      basti1012 
// @description    es wird oben in der leiste ein plunderbild angezeigt immer das was gerade angelgt wurde und mit mausovger werden noch de plunder infos angezeigt
// @include *pennergame.de*
// @exclude *berlin*
// ==/UserScript==

var MenueTop =  '130';
var MenueLeft = '600';


GM_xmlhttpRequest({
  	method: 'GET',
   	url: "http://www.pennergame.de/stock/plunder/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table = acontent.split('<h3>Angelegt</h3>')[1];			
			var table2 = table.split('class="submenu">')[0];								
			var table3 = table2.split('src="')[1];					
			var table4 = table3.split('"')[0];	
			var was1 = table2.split('>')[2];					
			var was2 = was1.split('<')[0];

var text = table2.split('<ul class="zclear">')[1];
var text2 = text.split('</ul>')[0];
var bild ='<img src="'+table4+'" width="30" height="30"</img>';
document.getElementById("notificationscreen").innerHTML += '<span name="PlunderInfoScreen" style="position:absolute;top:'+MenueTop+'px;left:'+MenueLeft+'px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;">&nbsp;&nbsp;<span style=" color:#FFFFFF">'+bild+'<br><a class="tooltip" href="http://www.pennergame.de/stock/plunder/">'+was2+'<span>'+text2+'</span></a></span></span>';
}});

