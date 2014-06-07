// ==UserScript==
// @name          Bankmanagergame - Aktienhistorie
// @namespace     http://scripte.georglink.de/
// @description	  Zeigt die Aktienentwicklung des Tages.
// @author        Georg J.P. Link
// @include       http://bankmanagergame.de/index.php?section=aktien*
// @include       http://www.bankmanagergame.de/index.php?section=aktien*
// ==/UserScript==




var $1;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$1 = unsafeWindow.jQuery;
		aktienauswertung();
	 }
}




function Trenner(number) {
	number = '' + number;
	teile = number.split(".");
	ganze = teile[0];
	if (teile[1]){
		komma = teile[1];
	} else {
		komma = "00";
	}
	while(komma.length <2) {
		komma += "0";
	}
	komma = komma.substr(0,2);
	if (ganze.length > 3) {
		var mod = ganze.length % 3;
		var output = (mod > 0 ? (ganze.substring(0,mod)) : '');
		for (i=0 ; i < Math.floor(ganze.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += ganze.substring(mod+ 3 * i, mod + 3 * i + 3);
			else
				// hier wird das Trennzeichen festgelegt mit '.'
				output+= '.' + ganze.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output+','+komma);
	}
	else return teile[0]+','+komma;
}


function aktienauswertung() {
 // alert(GM_listValues());
	i=1;
	aktienuebersicht = "<table width='100%' style='border-collapse:collapse;margin:0px auto;'>";
	aktienkursdaten="";
	// berechne fuer jedes Konto-Angebot
	$1('table.none tbody').each(function ( ) {
		$1(this).children(":first").prepend('<a name="aktie'+i+'" id="aktie'+i+'" ></a>');
		aktienuebersicht += "<tr><td style='padding:0 1px;' align=right>"+ i +"</td>";
		extrakt = $1(this).text();
		//alert(extrakt);
		bankname = $1(this).children(':first').text();
		aktienuebersicht += "<td style='padding:0 1px;'><a href='#aktie"+i+"'>"+bankname+"</a></td>";
		var kursaktuell_regex1 = /aktuell:([0-9]*,[0-9]*)/;
		kursaktuell = extrakt.match(kursaktuell_regex1)[1];		
		aktienuebersicht+='<td style="padding:0 1px;" align=right><span id="aktkurs'+i+'">'+kursaktuell+"</span></td></tr>\n";
		kursaktuell = parseInt(Math.round(parseFloat(kursaktuell.replace(/,/, ".")) * 100));
		// aktienkursdaten+=i+'b'+kursaktuell+'a';
		aktienkursdaten+=kursaktuell+';';
		$1(this).append('<tr><td colspan="2" style="padding:0px;"><div id="aktienkurs'+i+'">Historische Aktienwerte '+i+'</div></td></tr>')
		i++;
	 });
	 
	 
	//Allgemeine Daten, Max-Tresorlimit, Max-Kredite
	var all_content = $1('#content').text();
	// Aktueller Geldbestand
	var geldaktuell_regex1 = /[0-9]{1,3}(\.[0-9]{3})*,[0-9]{2}/;
	if (geldaktuell_regex1.test(all_content)){
		var geldaktuell_1 = all_content.match(geldaktuell_regex1)[0] + '';		
		geldaktuell = parseFloat(geldaktuell_1.replace(/\./g, "").replace(/,/, "."));
	} else {
		geldaktuell = -1;
	}
	 
		aktienuebersicht += '<tr><td colspan="3" style="border-top:1px solid #000000;">Geld: <span style="float:right" class="greeng">'+Trenner(geldaktuell)+' &euro;</span></td></tr></td>';
	 
		aktienuebersicht += '<tr><td colspan="3" align="right"><a id="aktienreloadlink" style="float:left;text-decoration:none;cursor:pointer;"><span id="aktienreloadtimer" class="greeng">reload Sek.</span> <span id="aktienreloadx">(X)</span></a><a id="hideuebersicht" style="cursor:pointer;">(Ausblenden)</a></td></tr></td>';
	 
	jetzt = Objektname = new Date();
	var Jahr = jetzt.getFullYear();
	var Monat = jetzt.getMonth()+1;
	var aMonat = ''+Monat;
	if (aMonat.length <2) {
		aMonat = "0"+Monat;
	}
	var Tag = ''+ jetzt.getDate();
	if (Tag.length <2) {
		Tag = "0"+Tag;
	}
	var Std = ''+ jetzt.getHours();
	if (Std.length <2) {
		Std = "0"+Std;
	}
	
	var Min = ''+ jetzt.getMinutes();
	if (Min < 15) {
		Viertelstunde = '00'
	} else if(Min < 30) { 
		Viertelstunde = '15'
	} else if (Min < 45) {
		Viertelstunde = '30'
	} else {
		Viertelstunde = '45'
	}
	if (Min.length <2) {
		Min = "0"+Min;
	}
		
	// if(Std < 8) {
		// Std = '07';
		// Viertelstunde = '45';
	// } 
	// else if( Std < 10 ) {
		// Std = '0' + Std;
	// }
	// if( Min < 10 ) {
		// Min = '0' + Min;
	// }
	
	Zeitpunkt = ''+Jahr+aMonat+Tag+Std+Min	 
	
	 // Ausgabe
	$1('#content').append('<div id="aktienuebersicht" style="position:fixed; top:20px; right:20px; width:160px;  overflow:auto; display:none; z-index:999;">'+aktienuebersicht+'</div>');
	$1('#content div.indent-box').prepend('<a id="showuebersicht">(Einblenden)</a>&nbsp;&nbsp;&nbsp;');
	$1('#content div.indent-box br:first').before('<span style="float:right;" class="greeng">'+Std+':'+Min+'</span>');
	 

	// alert(aktienkursdaten);

	
function hideUebersicht(){
	$1('#aktienuebersicht').slideUp('slow');
	GM_setValue('hideinguebersicht',true);
}

function showUebersicht(){
	$1('#aktienuebersicht').slideDown('slow');
	GM_setValue('hideinguebersicht',false);
}



function addButtonListener(){
  var button = document.getElementById("hideuebersicht");
  button.addEventListener('click',hideUebersicht,true);
  var button = document.getElementById("showuebersicht");
  button.addEventListener('click',showUebersicht,true);
}

// $1('#content div.indent-box').prepend(aktienkursdaten+Zeitpunkt+'<br>');
	
		GM_xmlhttpRequest({
		  method: "GET",
		  url: "http://scripte.georglink.de/aktienkurseserver.php?aktienkurse="+aktienkursdaten+Zeitpunkt,
		  onload: function(response) {
		    // alert(response.responseText);
			//historische Werte
			var hw=JSON.parse(response.responseText);
			$1.each(hw, function(key,value){
			aj=0;
			countvalues = value.length-1;
			
			anzvstd = parseInt(Viertelstunde);
			anzstd = Std;
			hwtabelle = "<table width='75%' style='border-collapse:collapse;margin:0px auto;'>";
			while (value[aj]){
				var farbe = ((aj<countvalues) && (value[aj].kurs > value[aj+1].kurs)) ? "green" : "red";
				var farbe = ((aj<countvalues) && (value[aj].kurs == value[aj+1].kurs)) ? "black" : farbe;
				var farbe = ((aj==countvalues)) ? "black" : farbe;
				hwkurs = value[aj].kurs.substr(0,value[aj].kurs.length-2)+'.'+value[aj].kurs.substr(value[aj].kurs.length-2)
				
				hwvstd = value[aj].zeit.substr(14,2);
				hwstd = value[aj].zeit.substr(11,2);
				while( (anzstd > hwstd) || ((anzstd == hwstd) && (anzvstd > hwvstd )) ){
					anzstd += '';
					if (anzstd.length < 2) { anz1std = '0'+anzstd;}else{anz1std=anzstd};
					if(anzvstd==0){anz1vstd='00';}else{anz1vstd=anzvstd;}
					hwtabelle += "<tr><td>"+value[aj].zeit.substr(0,11)+anz1std+':'+anz1vstd+':00'+"</td>";
					hwtabelle += "<td align=right>-</td></tr>";
					
					anzvstd -= 15;
					if (anzvstd < 0) {
						anzvstd = 45;
						anzstd -= 1;				
					}
				}
				hwtabelle += "<tr><td>"+value[aj].zeit+"</td>";
				hwtabelle += "<td align=right><span style='color:"+farbe+"'>"+Trenner(hwkurs)+"</span></td></tr>";
				
				anzvstd -= 15;
				if (anzvstd < 0) {
					anzvstd = 45;
					anzstd -= 1;				
				}
				
				if (aj==0){
					$1('#aktkurs'+key).attr('style','color:'+farbe+';');
				}
				aj++;
			}
			hwtabelle += "</table>";
            $1("#aktienkurs"+key).html(hwtabelle);
          });

			hideinguebersicht = GM_getValue('hideinguebersicht',false);
			//alert(hideinguebersicht);
			if(!hideinguebersicht){
				showUebersicht();
			}
			
addButtonListener(); 
		  }
		});
		
 	
}