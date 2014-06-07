// ==UserScript==
// @name stadtteile wechsler von ueberall version mit vorherschennder banden anzeige by basti1012 
// @namespace basti1012   http://pennerhack.foren-city.de
// @description   ermoeglicht die stadtteile von jeder seite aus zu wechseln man sieht sofort wer vorherschende bande ist 
// @include *pennergame.de*
// @exclude *dossergame.co.uk*
// @exclude *menelgame.pl*
// @exclude *clodogame.fr*
// @exclude *berlin.pennergame.de*
// ==/UserScript==
//   hier duerft ihr endern ohne angst zu haben das was falsch gemacht wird-------------------

var VonOben1 =54; //px
var VonRechts =0; //px

// anfang des scriptes ab hier nix mehr andernh nur wer weisss was er tut
// Pennergame seite ermitteln
if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
	var pgurl = 'http://www.berlin.pennergame.de/';
}else if(document.location.href.indexOf('pennergame.de/')>=0) {
	var pgurl = 'http://www.pennergame.de/';
}else if(document.location.href.indexOf('menelgame.pl/')>=0) {
	var pgurl = 'http://menelgame.pl/';
}else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
	var pgurl = 'http://dossergame.co.uk/';
}else if(document.location.href.indexOf('clodogame.fr/')>=0) {
	var pgurl = 'http://clodogame.fr/';
};


GM_xmlhttpRequest(
   {
  	method: 'GET',
   	url: ''+pgurl+'/city/',
        onload: function(responseDetails) 
		{
        	var content = responseDetails.responseText;

		var stadt = content.split('Vorherrschende Bande in ')[1];
		var stadt2 = stadt.split('</h3>')[0];
GM_setValue("stadt2" , stadt2);

try{
	if(content.match(/Vorherrschende/)){
		var text1 = content.split('<a href="/profil/bande:')[2];
		var text2 = text1.split('</strong>')[0];
}
		var text3 = '<a href="/profil/bande:'+text2+'</strong></a>';
GM_setValue("text3" , text3);

}catch(e){
                var text3 = '<a href="http://pennerhack.foren-city.de/"><strong>Keine Vorherschende Bande(go to basti1012)</strong></a>';
GM_setValue("text3" , text3);
                     }
         }
});



var Plunder = ''
+'<font color=\"blue\"><h2>Stadtteil wechseln </h2></font></color>'
+'<select id="stadtbutton" size="1"'
+'<option value="" ></option>'
	+'<option value="72" >Allermöhe</option>'
		+'<option value="41" >Alsterdorf</option>'
			+'<option value="73" >Altengamme</option>'
				+'<option value="85" >Altenwerder</option>'
			+'<option value="12" >Altona Altstadt</option>'
		+'<option value="13" >Altona Nord</option>'
	+'<option value="19" >Altstadt</option>'
+'<option value="8" >Bahrenfeld</option>'
	+'<option value="42" >Barmbek-Nord</option>'
		+'<option value="43" >Barmbek-Süd</option>'
	+'<option value="74" >Bergedorf</option>'
+'<option value="54" >Bergstedt</option>'
+'<option value="20" >Billbrook</option>'
+'<option value="103" >Billstedt</option>'
+'<option value="75" >Billwerder</option>'
+'<option value="3" >Blankenese</option>'
+'<option value="21" >Borgfelde</option>'
+'<option value="55" >Bramfeld</option>'
+'<option value="86" >Cranz</option>'
+'<option value="76" >Curslack</option>'
+'<option value="44" >Dulsberg</option>'
+'<option value="56" >Duvenstedt</option>'
+'<option value="30" >Eidelstedt</option>'
+'<option value="57" >Eilbek</option>'
+'<option value="33" >Eimsbüttel</option>'
+'<option value="87" >Eißendorf</option>'
+'<option value="45" >Eppendorf</option>'
+'<option value="58" >Farmsen-Berne</option>'
+'<option value="14" >Finkenwerder</option>'
+'<option value="88" >Francop</option>'
+'<option value="46" >Fuhlsbüttel</option>'
+'<option value="47" >Groß Borstel</option>'
+'<option value="9" >Groß Flottbek</option>'
+'<option value="89" >Gut Moor</option>'
+'<option value="28" >HafenCity</option>'
+'<option value="23" >Hamm-Mitte</option>'
+'<option value="24" >Hamm-Nord</option>'
+'<option value="25" >Hamm-Süd</option>'
+'<option value="22" >Hammerbrook</option>'
+'<option value="90" >Harburg</option>'
+'<option value="34" >Harvestehude</option>'
+'<option value="91" >Hausbruch</option>'
+'<option value="92" >Heimfeld</option>'
+'<option value="48" >Hoheluft-Ost</option>'
+'<option value="35" >Hoheluft-West</option>'
+'<option value="49" >Hohenfelde</option>'
+'<option value="26" >Horn</option>'
+'<option value="59" >Hummelsbuettel</option>'
+'<option value="4" >Iserbrook</option>'
+'<option value="60" >Jenfeld</option>'
+'<option value="77" >Kirchwerder</option>'
+'<option value="27" >Kleiner Grasbrook</option>'
+'<option value="93" >Langenbek</option>'
+'<option value="50" >Langenhorn</option>'
+'<option value="61" >Lemsahl-Mellingstedt</option>'
+'<option value="78" >Lohbrügge</option>'
+'<option value="36" >Lokstedt</option>'
+'<option value="7" >Lurup</option>          '
+'<option value="62" >Marienthal</option>        '
+'<option value="94" >Marmstorf</option>        '
+'<option value="95" >Moorburg</option>        '
+'<option value="79" >Moorfleet</option>        '
+'<option value="96" >Neuenfelde</option>        '
+'<option value="80" >Neuengamme</option>        '
+'<option value="98" >Neugraben-Fischbek</option>    '    
+'<option value="97" >Neuland</option>        '
+'<option value="18" >Neustadt</option>       ' 
+'<option value="37" >Niendorf</option>'
+'<option value="5" >Nienstedten</option>'
+'<option value="81" >Ochsenwerder</option>'
+'<option value="51" >Ohlsdorf</option>'
+'<option value="6" >Osdorf</option>        '
+'<option value="10" >Othmarschen</option>    '    
+'<option value="11" >Ottensen</option>       ' 
+'<option value="63" >Poppenbuettel</option>  '      
+'<option value="64" >Rahlstedt</option>      '              
+'<option value="82" >Reitbrook</option>      '  
+'<option value="1" >Rissen</option>        '
+'<option value="99" >Rönneburg</option>       ' 
+'<option value="29" >Rothenburgsort</option> '       
+'<option value="38" >Rotherbaum</option>     '   
+'<option value="65" >Sasel</option>        '
+'<option value="39" >Schnelsen</option>    '    
+'<option value="100" >Sinstorf</option>    '    
+'<option value="83" >Spadenland</option>   '     
+'<option value="31" >St. Georg</option>    '    
+'<option value="17" >St.Pauli</option>     '   
+'<option value="66" >Steilshoop</option>    '    
+'<option value="16" >Steinwerder</option>  '      
+'<option value="40" >Stellingen</option>   '     
+'<option value="2" >Sülldorf</option>      '  
+'<option value="84" >Tatenberg</option>      '  
+'<option value="67" >Tonndorf</option>     '   
+'<option value="52" >Uhlenhorst</option>   '     
+'<option value="32" >Veddel</option>    '    
+'<option value="68" >Volksdorf</option> '       
+'<option value="15" >Waltershof</option>'        
+'<option value="69" >Wandsbek</option> '       
+'<option value="70" >Wellingsbüttel</option>'        
+'<option value="101" >Wilhelmsburg</option>'        
+'<option value="102" >Wilstorf</option>'  
+'<option value="53" >Winterhude</option>'  
+'<option value="71" >Wohldorf-Ohlstedt</option>'
+'</select><input id="stadtspringen" type="button" value="Stadt Wechseln"></form>'
+'<font color=\"blue\"><h2>Du bist in '+GM_getValue("stadt2")+'</h2></font></color>'
+'<font color=\"red\"><h2>Vorherschende bande<br>'+GM_getValue("text3")+'</h2></font></color>';

var Plundera = '<div class="tieritemA" style="width: 200px; position: relative; left:-35px;"><link href="http://media.pennergame.de/styles/plunder.css" rel="stylesheet" type="text/css" /><b>Stadtteile Wechseln</b><div class="tooltip" style="display:block; position: relative;">'+Plunder+'</form></div>';

document.getElementById('navigation').innerHTML += '<div style="z-index:32767;right:'+VonRechts+'px;top:'+VonOben1+'px;position:absolute;border:0px solid #000000;" >'
+'<'+Plundera+'</div>';


document.getElementById('stadtspringen').addEventListener('click', function bstdtspringen () {
document.getElementById('stadtspringen').disabled= "disabled";
var welchestadt = document.getElementById('stadtbutton').value;

	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+pgurl+'/city/district/buy/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('id='+welchestadt+'&submitForm=Einziehen'),
		onload: function(responseDetails)

     	{
	location.reload();
	}
  	});	

},false); 

// Copyright by basti1012