// ==UserScript==
// @name		  OGame Parse Spy Reports
// @namespace	 OGame Parse Spy Reports
// @description   UserScript for parse Spy Reports.
// @include	   http://ogame399.de/game/messages.php?session=*
// @include	   http://87.106.16.11/game/messages.php?session=*
// @exclude	   
// ==/UserScript==    

	function QEspionatge(texto) {
	var pos = 0;
		
		pos = texto.indexOf( 'Recursos en' );	
		if ( pos < 0 ) return false;
		pos = texto.indexOf( 'Metal' );	
		if ( pos < 0 ) return false;
		pos = texto.indexOf( 'Cristal' );	
		if ( pos < 0 ) return false;
		pos = texto.indexOf( 'Deuterio' );	
		if ( pos < 0 ) return false;
		pos = texto.indexOf( 'Oportunidad para defenderse del espionaje:' );	
		if ( pos < 0 ) return false;

		return true;	
	}

	function TrobarTaulaGeneral() {
	var arch = document.getElementsByTagName( 'input' );
	var table = null;
	
		for( var i=0; i<arch.length; i++ ) {
			if ( arch[i].name.substr( 0, 6 ) == 'delmes' ) {
				table = arch[i].parentNode.parentNode.parentNode.parentNode;
				break;
			}
		}
		
		return table;
	}

	function TrobarEspionatges( table ) {
	var ar = new Array();
		var artd = table.getElementsByTagName( 'td' )
		for( var i=0; i<artd.length; i++ ) {
			if ( QEspionatge(artd[i].textContent) ) {
				ar[ ar.length ] = artd[i];
			}
		}
		
		return ar;
	}

	function SeccionsEspionatge(html) {
	var ar = new Array();
		ar['Recursos'] = null; ar['Flotes'] = null;	ar['Defenses'] = null;	ar['Edificis'] = null; ar['Investigacions'] = null;
	
		var artable = html.getElementsByTagName( 'table' )
		for( var i=0; i<artable.length; i++ ) {
			if ( QSeccioRecursos(artable[i].textContent) ) ar['Recursos'] = artable[i];
			else if ( QSeccioX(artable[i], 'Flotas') ) ar['Flotes'] = artable[i];
			else if ( QSeccioX(artable[i], 'Defensa') ) ar['Defenses'] = artable[i];
			else if ( QSeccioX(artable[i], 'Edificios') ) ar['Edificis'] = artable[i];
			else if ( QSeccioX(artable[i], 'Investigación' ) ) ar['Investigacions'] = artable[i];
		}
		
		return ar;
	}
	
	function QSeccioRecursos(texto) {
		pos = texto.indexOf( 'Recursos en' );	
		if ( pos < 0 ) return false;
		pos = texto.indexOf( 'Metal' );	
		if ( pos < 0 ) return false;
		pos = texto.indexOf( 'Cristal' );	
		if ( pos < 0 ) return false;
		pos = texto.indexOf( 'Deuterio' );	
		if ( pos < 0 ) return false;
		
		return true;
	}

	function QSeccioX(table, texto) {
	var ar = table.getElementsByTagName('td');
		
		for( var i=0; i<ar.length; i++ ) {
			if ( mytrim(ar[i].textContent) == texto ) { return true; }
		}
				
		return false;
	}

	function mytrim(s) {
		return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
	}

	function parseSeccio(html) {
	var txt = "";
	var separador = "";
	
		if ( html == null ) return txt;
	
		ar = html.getElementsByTagName('td');
		for( var i=0; i<ar.length; i++ ) {
			txt += separador + mytrim(ar[i].textContent);
			separador = ";";
		} 
		
		return txt;
	}

	function parseEspionatge(html) {
	var txt = "";
		arSeccions = SeccionsEspionatge(html);
		
		txt = "Recursos:"+parseSeccio(arSeccions['Recursos']);
		txt += "|Flotes:"+parseSeccio(arSeccions['Flotes']);
		txt += "|Defenses:"+parseSeccio(arSeccions['Defenses']);
		txt += "|Edificis:"+parseSeccio(arSeccions['Edificis']);
		txt += "|Investigacions:"+parseSeccio(arSeccions['Investigacions']);

		return txt;
	}
	

	function GeneraFormulari() {

		var iframe = document.createElement("iframe");
		iframe.setAttribute( "name", "iframe_oculto" );
		iframe.setAttribute( "style", "position:absolute; top:1px; left:1px; visibility:hidden;height:1px;width:1px;" );

		var formulari = document.createElement("form");
		formulari.setAttribute( "action", "http://starpeople.web1000.com/parsers/parseEspionatges.php" );
		formulari.setAttribute( "method", "post" );
		formulari.setAttribute( "target", "iframe_oculto" );


		document.body.appendChild(formulari);
		document.body.appendChild(iframe);
		
		return formulari;
	}

	function GeneraInput( formulari, num, txt ) {
		var input = document.createElement("input");
		input.setAttribute( "name", "Espionatge"+num );
		input.setAttribute( "type", "hidden" );
		input.value = txt;
		formulari.appendChild(input);
	}



	var formulari = GeneraFormulari();
	var table = TrobarTaulaGeneral();
	var arEspionatges = TrobarEspionatges( table );
	var txt;

	for( var i=0; i< arEspionatges.length; i++ ) {
		txt = parseEspionatge(arEspionatges[i]);
		GeneraInput( formulari, i, txt );
	}
	
	formulari.submit();
