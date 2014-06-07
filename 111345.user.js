// ==UserScript==
// @name			mememoticons
// @namespace		MemEmoticons
// @version			1.0
// @description		Convierte textos en imagenes de memes en Taringa.net
// @include			http://www.taringa.net*
// @website			http://www.patolin.com.ar/~andres/mememoticons
// @author			Andrés Torres
// @contact			andres@taringa.net
// ==/UserScript==

(function(document) {	
	
	var b = document.body,
		s = 'width:50px;height:50px;border-radius:10px',
		k = {
			
			/* 4chan */
			'awwyeah' :				{ 's' : '05' , 'i' : '7187C9C8E' , 'e' : 'gif' },
			'betterthanexpected' :	{ 's' : '03' , 'i' : 'A4D50B92B' , 'e' : 'gif' },
			'cerealguy' :			{ 's' : '04' , 'i' : '079388105' , 'e' : 'gif' },
			'challengeaccepted' :	{ 's' : '05' , 'i' : '76BBC4C13' , 'e' : 'gif' },
			'felllikeaninja' :		{ 's' : '08' , 'i' : '8206F24EB' , 'e' : 'gif' },
			'felllikeasir' :		{ 's' : '18' , 'i' : '916C40849' , 'e' : 'gif' },
			'fap' :					{ 's' : '09' , 'i' : '4566FF50A' , 'e' : 'gif' },
			'foreveralone' :		{ 's' : '07' , 'i' : '5D7E3C3B0' , 'e' : 'gif' },
			'fuckyeah' :			{ 's' : '01' , 'i' : '6D92E272D' , 'e' : 'gif' },
			'fuuu' :				{ 's' : '07' , 'i' : '703507D88' , 'e' : 'gif' },
			'gordogranudo' :		{ 's' : '05' , 'i' : '19BD72567' , 'e' : 'gif' },
			'megusta' :				{ 's' : '19' , 'i' : '11F202A9E' , 'e' : 'gif' },
			'inglip' :				{ 's' : '07' , 'i' : '465C5C7DB' , 'e' : 'gif' },
			'itsfree' :				{ 's' : '09' , 'i' : 'C96ABF467' , 'e' : 'gif' },
			'itssomething' :		{ 's' : '14' , 'i' : 'AC10576B5' , 'e' : 'gif' },
			'kiddingme' :			{ 's' : '09' , 'i' : 'D33582436' , 'e' : 'gif' },
			'liar' :				{ 's' : '13' , 'i' : '0CC2869F7' , 'e' : 'gif' },
			'lolface' :				{ 's' : '03' , 'i' : 'C19590313' , 'e' : 'gif' },
			'motherofgod' :			{ 's' : '20' , 'i' : '5C94F2345' , 'e' : 'gif' },
			'yaoming' :		{ 's' : '15' , 'i' : '0BF7E96AA' , 'e' : 'gif' },
			'pokerface' :			{ 's' : '03' , 'i' : '6CB2C4C3E' , 'e' : 'gif' },
			'thatssuspicious' :		{ 's' : '12' , 'i' : '40A7D4BBA' , 'e' : 'gif' },
			'trolldad' :			{ 's' : '01' , 'i' : '13ED2119D' , 'e' : 'gif' },
			'trollface' :			{ 's' : '06' , 'i' : '91F3D8CDC' , 'e' : 'gif' },
			'whativedone' :			{ 's' : '16' , 'i' : 'DD8234453' , 'e' : 'gif' },
			'whynot' : 				{ 's' : '02' , 'i' : 'AD96EC1AF' , 'e' : 'gif' },
			'yuno' :				{ 's' : '04' , 'i' : 'F07B7418A' , 'e' : 'gif' },
			
			/* taringa */
			'cuentanosmas' :		{ 's' : '09' , 'i' : 'A10CF8796' , 'e' : 'png' },
			'milhouse' :			{ 's' : '18' , 'i' : '2CF628A55' , 'e' : 'png' },
			'granulin' :			{ 's' : '18' , 'i' : '94BB1D7E2' , 'e' : 'png' },
			'peluchin' :			{ 's' : '16' , 'i' : '9F4A621DC' , 'e' : 'png' },
			
		};
		
	b.innerHTML = b.innerHTML.replace ( /(\:[a-z]+\:)(?!([^<]+)?>)/ig , function(m) {
		
		var c = m.substring(1,m.length-1),
			d = k[c];
			
		return d ? '<img style="'+s+'" src="http://k'+d.s+'.kn3.net/'+d.i+'.'+d.e+'" alt="'+c+'" title="'+c+'" />' : m ;
			
	});
	
})(document);