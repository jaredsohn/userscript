// ==UserScript==
// @name           stacks
// @namespace      a
// @description    Zeigt die aktuellen Kurse des FAZ-Boersenspiels an
// @include        http://*
// ==/UserScript==


var showNewsBar = 0;

function show(){
 document.getElementById("stacks_greaseMonkey_div").style.visibility = "visible";
}

function hide(){
 document.getElementById("stacks_greaseMonkey_div").style.visibility = "hidden";
}

rtKURS="&nbsp;";
rtPERF="&nbsp;";

function getRT(ISIN,i){

	var rt = new Array(2);		
	


	GM_xmlhttpRequest({
    		method: 'GET',
	    	url: 'http://de.finsearch.yahoo.com/de/?s=de_sort&tp=S&nm='+ISIN,
    		headers: {
        	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	'Accept': 'application/atom+xml,application/xml,text/xml',
    	},
    	onload: function(responseDetails) {
		var tDiv = document.createElement('div');
     		tDiv.setAttribute('id', 'gmTopicList2');
     		tDiv.setAttribute('name', 'gmTopicList2');
     		tDiv.innerHTML = responseDetails.responseText;


		var table = tDiv.getElementsByTagName('table')[11];

		var lines = table.getElementsByTagName('tr');

		for each (var line in lines){
			if(line.innerHTML.substring(2,5) != "<th"){
				var boerse = line.getElementsByTagName('td')[3].innerHTML.toLowerCase();

				//alert(boerse.substr(3,5));

				if(boerse.substr(3,5) == "rankf"){
					rtKURS = line.getElementsByTagName('td')[5].getElementsByTagName('b')[0].innerHTML;
					rtPERF = line.getElementsByTagName('td')[6].getElementsByTagName('b')[0].innerHTML;	
					break;
				}
			}
		}

		document.getElementById(ISIN+i+'rtKURS').innerHTML = rtKURS;
		document.getElementById(ISIN+i+'rtPERF').innerHTML = rtPERF;

		table = null;
	}
	});

}

document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + 
	"<div id='gm_button_av' style='position: fixed; top:10px; right: 10px; border: 5px solid #FFFFFF; -moz-opacity:0.9; background-color:#000000; font-family: Verdana; color:#FFFFFF; font-size:10px; width:50px; height:30px;'><center><a href='#' id='gm_show_button' style='color: #ff9900; font-decoration:none; font-weight:bold'>show</a></center></div>"+
	"<div id=\"stacks_greaseMonkey_div\" style='z-index=9999; font-family:verdana; font-size:13px; text-align:left; color:#ff9900;height:600px; width:850px; border:20px solid #FFFFFF; padding:5px; margin:0px; -moz-opacity:0.9; position:fixed; top:50%; left:50%; margin-left:-425px; margin-top:-350px; background-color:#000000;'>"+
	"<a href=\"#\" id=\"greasemonkey_hide\"><img src='http://www.saladinundsaladin.ch/index/close_button.png' border=0 style='position:absolute; top:-18px; right:-18px;'></a>"+
	"<br><center><div id='lalilu'>"+
	"</div></center>"+
	"</div><div id=\"stacks_greaseMonkey_lnk\" style='width:800px; font-family:verdana; height: 25px; font-size:12px; text-align:left; color:#ffffff; border:10px solid #FFFFFF; padding:5px; -moz-opacity:0.9; position:fixed; bottom:0px; background-color:#000000; margin-left:-400px; left:50%; padding-top:11px;'><marquee><div id='marquee_line_GM'>&nbsp;</div></marquee></div></center>";

function update(){


GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://boersenspiel.faz.net/a/depot.cgi',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var oDiv = document.createElement('div');
     	oDiv.setAttribute('id', 'gmTopicList');
     	oDiv.setAttribute('name', 'gmTopicList');
     	oDiv.innerHTML = responseDetails.responseText;

	//oDiv.getElementsByTagName('table')[2].getElementsByTagName('tr')[0].innerHTML="<td>Stueck</td><td>Name</td><td>Kurs Kauf</td><Kurs FAZ</td><td>Kurs RT</td><td>%</td><td>Gewinn</td>";
	
	var trs = oDiv.getElementsByTagName('table')[2].getElementsByTagName('tr');

	var anzahl = new Array(100);
	var aktiennamen = new Array(100);
	var ISINs = new Array(100);
	var kaufkurse = new Array(100);
	var fazkurse = new Array(100);
	var fazaenderung = new Array(100);
	var verkauflinks = new Array(100);
	var bargeld;
	var gesamtvermoegen;

	var i = 0;
	var j = 0;

	for each (var tr in trs){
		

		if(i > 1 && i < trs.length-5 && i%2==0){
			anzahl[j] = tr.getElementsByTagName('td')[0].innerHTML;
			aktiennamen[j] = tr.getElementsByTagName('td')[1].innerHTML.substring(0,tr.getElementsByTagName('td')[1].innerHTML.indexOf('<br>'));
			ISINs[j] = tr.getElementsByTagName('td')[1].innerHTML.substring(tr.getElementsByTagName('td')[1].innerHTML.indexOf('<br>')+4,tr.getElementsByTagName('td')[1].innerHTML.length);
			kaufkurse[j] = tr.getElementsByTagName('td')[3].innerHTML;
			fazkurse[j] = tr.getElementsByTagName('td')[4].innerHTML;
			fazaenderung[j] = tr.getElementsByTagName('td')[5].innerHTML;

			var lnk = tr.getElementsByTagName('td')[7].getElementsByTagName('a')[1].href;

			lnk = lnk.substring(lnk.indexOf("/a/show_sell.cgi"),lnk.length);

			verkauflinks[j] = "http://boersenspiel.faz.net"+lnk;

			j++;
		}else if(i == trs.length-3){
			bargeld = tr.getElementsByTagName('b')[1].innerHTML;
		}else if(i == trs.length-1){
			gesamtvermoegen = tr.getElementsByTagName('b')[1].innerHTML;
		}

		i=i+1;

	}


	var datum = new Date();
	
	var minuten = "0"+datum.getMinutes();
	minuten = minuten.substr(1,2);

	var zeit = datum.getHours()+":"+minuten;
	
	var tabelle = 	"<div style='float:right; margin-top:-15px; font-size:10px;'>Letzte Aktualisierung: "+zeit+"</div><br clear=all> <b>Gesamtvermoegen: "+gesamtvermoegen+" | Bargeld: "+bargeld+"</b><br>"+
			"<table border=0 cellspacing=0 width=800px class='lalilu' style='border: 0px solid #FFFFFF; padding:15px; font-family:verdana; color:#fff; font-size:11px;'>"+
			"<tr><td  style='border: 1px solid #FFFFFF; font-weight: bold; padding:10px;' width=9%>Stueck</td>"+
			"<td  style='border: 1px solid #FFFFFF; font-weight: bold; padding:10px;' width=30%>Aktie</td>"+
			"<td  style='border: 1px solid #FFFFFF; font-weight: bold; padding:10px;' width=9%>Kauf Kurs</td>"+
			"<td  style='border: 1px solid #FFFFFF; font-weight: bold; padding:10px;' width=9%>% Heute</td>"+
			"<td  style='border: 1px solid #FFFFFF; font-weight: bold; padding:10px;' width=9%>Kurs RT</td>"+
			"<td  style='border: 1px solid #FFFFFF; font-weight: bold; padding:10px;' width=9%>% RT</td>"+
			"<td  style='border: 1px solid #FFFFFF; font-weight: bold; padding:10px;' width=9%>Kurs FAZ</td>"+
			"<td  style='border: 1px solid #FFFFFF; font-weight: bold; padding:10px;' width=9%>% FAZ</td>"+
			"<td  style='border: 1px solid #FFFFFF; font-weight: bold; padding:10px;' width=*>Links</td></tr>";

	i = 0;

	var stack = "";

	for(i = 0; i < j; i++){

		tabelle = tabelle + "<tr><td style='border: 1px solid #FFFFFF; padding:10px;'>"+anzahl[i]+"</td>";
		tabelle = tabelle + "<td style='border: 1px solid #FFFFFF; padding:10px;'>"+aktiennamen[i]+"<br>"+ISINs[i]+"</td>";
		tabelle = tabelle + "<td style='border: 1px solid #FFFFFF; padding:10px;'>"+kaufkurse[i]+"</td>";
		tabelle = tabelle + "<td style='border: 1px solid #FFFFFF; padding:10px;'><div id="+ISINs[i]+i+"rtPERF>&nbsp;</div></td>";
		tabelle = tabelle + "<td style='border: 1px solid #FFFFFF; padding:10px;'><div id="+ISINs[i]+i+"rtKURS>&nbsp;</div></td>";
		tabelle = tabelle + "<td style='border: 1px solid #FFFFFF; padding:10px;'>COMING SOON</td>";
		tabelle = tabelle + "<td style='border: 1px solid #FFFFFF; padding:10px;'>"+fazkurse[i]+"</td>";
		tabelle = tabelle + "<td style='border: 1px solid #FFFFFF; padding:10px;'>"+fazaenderung[i]+"</td>";
		tabelle = tabelle + "<td style='border: 1px solid #FFFFFF; padding:10px;'><a style='color: #ff9900; font-decoration:none; font-weight:bold' href="+verkauflinks[i]+">sell</a></td></tr>";

		stack = stack + aktiennamen[i]+": DP | ";

		getRT(ISINs[i],i);
		
	}


	tabelle = tabelle + 	"</table>"+
				"<br>"+
				"<a style='color: #ff9900; font-decoration:none; font-weight:bold' href='http://boersenspiel.faz.net/a/depot.cgi'>zum Depot</a> | "+
				"<a style='color: #ff9900; font-decoration:none; font-weight:bold' href='http://boersenspiel.faz.net/a/show_buy.cgi'>Aktien kaufen</a> | "+
				"<a style='color: #ff9900; font-decoration:none; font-weight:bold' href='http://boersenspiel.faz.net/a/topten.cgi/'>Top Ten</a>";


	document.getElementById('lalilu').innerHTML = tabelle;

	//var stacks = "<div id=\"stacks_greaseMonkey_lnk\" style='width:800px; font-family:verdana; height: 25px; font-size:12px; text-align:left; color:#ff9900; border:10px solid #FFFFFF; padding:5px; -moz-opacity:0.9; position:fixed; bottom:0px; background-color:#000000; margin-left:-400px; left:50%; padding-top:11px;'>"+stack+"</div></center>";


	document.getElementById('marquee_line_GM').innerHTML = "<marquee>" + stack + "</marquee>";

	oDiv = null;
	
    }
});
}

document.getElementById("stacks_greaseMonkey_lnk").addEventListener('click', function(){show()},false);
document.getElementById("greasemonkey_hide").addEventListener('click', function(){hide()},false);
document.getElementById("gm_show_button").addEventListener('click', function(){show()},false);
document.getElementsByTagName("html")[0].style.paddingBottom = "40px";


if(showNewsBar == 1){

	document.getElementById("stacks_greaseMonkey_lnk").style.visibility = "visible";
	document.getElementById("gm_button_av").style.visibility = "hidden";

}else{

	document.getElementById("stacks_greaseMonkey_lnk").style.visibility = "hidden";
	document.getElementById("gm_button_av").style.visibility = "visible";
}

update();

hide();
 
var aktiv = setInterval(update,60000);