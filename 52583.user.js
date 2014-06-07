// ==UserScript==
// @name           Menelgame Sprzedawacz 2
// @namespace      http://ego-shooters.foren-city.de/
// @namespace 	   Orginal von NewMan
// @namespace      tlumaczony przez Oxymona
// @description    Pl
// @include        http://*menelgame.pl/stock/plunder/*
// @exclude        http://menelgame.pl/stock/plunder/craft/*
// ==/UserScript==

if(GM_getValue('plunderberechnen') == true){
	if(GM_getValue('plunderanzahl') >= 1){
		var Ziel = GM_getValue('plunderziel');
		GM_setValue('plunderanzahl', GM_getValue('plunderanzahl')-1);
		window.location.href = Ziel;
	} else{
		GM_setValue('plunderberechnen', false);
		plunder_table();
	}
} else{
	plunder_table();
}

function plunder_table(){
	var table_messageslist = document.getElementById('messageslist');
	var tr_msglist = table_messageslist.getElementsByClassName('msglist');
	var newtd_1 = document.createElement('td');
	newtd_1.setAttribute('bgcolor', "#272727");
	newtd_1.style.verticalAlign = "middle";
	newtd_1.innerHTML = '<strong>Sprzedac</strong>';
	table_messageslist.getElementsByTagName('tr')[0].insertBefore(newtd_1, table_messageslist.getElementsByTagName('tr')[0].getElementsByTagName('td')[3]);
	table_messageslist.getElementsByTagName('tr')[0].getElementsByTagName('td')[4].innerHTML = "";
	var newtd_2 = document.createElement('td');
	newtd_2.setAttribute('bgcolor', "#272727");
	table_messageslist.getElementsByTagName('tr')[tr_msglist.length+1].insertBefore(newtd_2, table_messageslist.getElementsByTagName('tr')[tr_msglist.length+1].getElementsByTagName('td')[3]);
	for(x=0; x<=tr_msglist.length-1;x++){
		plunder_function(x, tr_msglist);
	}
}
function plunder_function(x, tr_msglist){
	var newtd = new Array();
	var show_wmtt = tr_msglist[x].getElementsByTagName('td')[1].getAttribute('onmouseover', false);
	tr_msglist[x].getElementsByTagName('td')[3].style.borderRight = "";
	var plunder_id = show_wmtt.split('showWMTT(\'')[1].split('\')')[0];
	newtd[x] = document.createElement('td');
	newtd[x].style.borderRight = '1px solid rgb(39, 39, 39)';
	newtd[x].style.borderBottom = '1px solid rgb(39, 39, 39)';
	newtd[x].innerHTML = '<input name="plunderv'+x+'" type="text" size="2" maxlength="4"> <input type="button" name="sell'+x+'" value="Sprzedac">';
	tr_msglist[x].appendChild(newtd[x]);
	tr_msglist[x].getElementsByTagName('td')[2].setAttribute('onmouseover', show_wmtt);
	tr_msglist[x].getElementsByTagName('td')[2].setAttribute('onmouseout', 'hideWMTT()');
	tr_msglist[x].getElementsByTagName('td')[3].setAttribute('onmouseover', show_wmtt);
	tr_msglist[x].getElementsByTagName('td')[3].setAttribute('onmouseout', 'hideWMTT()');
	
	document.getElementsByName('sell'+x)[0].addEventListener('click', function plunder_v(){

			if (parseInt(document.getElementsByName('plunderv'+x)[0].value) <= parseInt(tr_msglist[x].getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerHTML) && parseInt(document.getElementsByName('plunderv'+x)[0].value) > 0){
				var Ziel = 'http://www.menelgame.pl/stock/plunder/sell/'+ plunder_id +'/';
				GM_setValue('plunderberechnen', true);
				GM_setValue('plunderziel', Ziel);
				GM_setValue('plunderanzahl', Number(document.getElementsByName('plunderv'+x)[0].value)-1);
				window.location.href = Ziel;
			} else{
				alert('Fehler:\nEntweder war Ihre Eingabe keine Zahl oder sie war größer als der Lagerbestand bzw 0.');
			}
	},false); 
}
	
var tabelle = document.getElementById('messageslist').getElementsByTagName('tr');
var ids = document.getElementById('f_plunder').getElementsByTagName('option');
for(var i = 0;i <= ids.length;i++){
	var id = ids[i].value;	
	var Plundertooltip = document.getElementById(id).innerHTML;
	
	var leiste = '';
	
	var eigenschaft = Plundertooltip.match(/<div id="item_stats">(.+)<\/div>/gi);
	if(eigenschaft){
		for (var x = 0; x < eigenschaft.length; x++){
			leiste += eigenschaft[x];
		};
	};
	var zweigenschaft = Plundertooltip.match(/<div id="item_add">(.+)<\/div>/gi);
	if(zweigenschaft){
		for (var y = 0; y < zweigenschaft.length; y++){
			leiste += zweigenschaft[y];
		};
	};
	tabelle[i+1].getElementsByTagName("td")[1].removeAttribute("onmouseover");
	tabelle[i+1].getElementsByTagName('td')[1].innerHTML += '<br/>'+leiste;
	var divs = tabelle[i+1].getElementsByTagName('td')[1].getElementsByTagName('div');
	if(divs){
		for(var j = 0; j < divs.length; j++){
			divs[j].style.display = 'inline-block';
		};
	};
};
//load_aktion();
//Script von NewMan im Penergame unter NewMan01 zu finden.