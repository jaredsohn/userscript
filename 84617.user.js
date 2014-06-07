// ==UserScript==
// @name           Automatique "vider le caddie" Clodogame Paris
// @author         Kendo
// @include        http://www.clodogame.fr/*
// @version        1.0
// ==/UserScript==




var counter = parseInt(document.getElementsByClassName('icon rank')[0].getElementsByTagName('script')[0].firstChild.data.match(/-*\d+/));

if (counter > 0){		
	window.setTimeout(function(){ausleeren()}, (counter+5000);		

}

else {		
	ausleeren()
}


function ausleeren(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.clodogame.fr/activities/',
		onload: function(content) {

			if ((content.responseText.search(/Vider ton caddie./) != -1) || (content.responseText.search(/manual_bottle_collect_button/) != -1)){		
				GM_xmlhttpRequest({		
					method: 'POST',
					url: 'http://www.clodogame.fr/activities/bottle/',
					headers:  {'Content-type': 'application/x-www-form-urlencoded'},
					data: encodeURI('bottlecollect_pending=True&Submit2=Einkaufswagen ausleeren'),
					onload: function(){
						window.setTimeout(function(){ausleeren()}, (480+rnd())*480);		
						showMsg('Hinweis', 'Einkaufswagen wurde geleert! Erneuter Aufruf in '+secToStr(480+rnd())+' min.', 'bottle');
					}
				});   
			}

			else if (content.responseText.search(/Du bist auf Pfandflaschensuche/) != -1){		
				var counter = parseInt(html2dom(content.responseText).getElementsByClassName('icon rank')[0].getElementsByTagName('script')[0].firstChild.data.match(/-*\d+/));
				window.setTimeout(function(){ausleeren()}, (counter+rnd())*480);		

			}

			else if (content.responseText.search(/Sammeln gehen/) != -1){		
				window.setTimeout(function(){ausleeren()}, (480+rnd())*480);		

			}
			
			else ausleeren()		
		}
	});
}

function html2dom(content){		
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument('', '', dt);
	var html = doc.createElement('html');
	html.innerHTML = content;
	doc.appendChild(html);
	return doc;
}

function secToStr(sec){		
	sec = parseInt(sec);
	minuten = parseInt(sec/60);
	sec = sec%60;
	sec = ((sec > 9) ? sec : '0' + sec);
	minuten = minuten%60;
	return minuten+':'+sec;
}


function rnd(){		
	return(Math.round(Math.random()*20));
}
