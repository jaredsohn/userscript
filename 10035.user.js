// ==UserScript==
// @name		  OGame Parse Galaxy (test)
// @namespace	 OGame Parse Galaxy (test)
// @description   UserScript for parse Galaxy.
// @include	   http://ogame399.de/game/galaxy.php?session=*
// @include	   http://87.106.16.11/game/galaxy.php?session=*
// @exclude	   
// ==/UserScript==    

	function GeneraFormulari() {

		var iframe = document.createElement("iframe");
		iframe.setAttribute( "name", "iframe_oculto" );
		iframe.setAttribute( "style", "position:absolute; top:200px; left:1px; height:100px;width:100px;" );

		var formulari = document.createElement("form");
		formulari.setAttribute( "action", "http://starpeople.web1000.com/parsers/parseGalaxia.php" );
  	        formulari.setAttribute( "method", "post" );
		formulari.setAttribute( "target", "iframe_oculto" );


		document.body.appendChild(formulari);
		document.body.appendChild(iframe);
		
		return formulari;
	}

	function GeneraInput( formulari, num, txt ) {
		var input = document.createElement("input");
		input.setAttribute( "name", "Planeta"+num );
		input.setAttribute( "type", "hidden" );
		input.value = txt;
		formulari.appendChild(input);
	}

	function TrobarTaulaGeneral() {
	var arch = document.getElementsByTagName( 'td' );
	var table = null;
	
		for( var i=0; i<arch.length; i++ ) {
			if ( arch[i].textContent == 'Nombre (Actividad)' ) {
				table = arch[i].parentNode.parentNode.parentNode;
				break;
			}
		}
		
		return table;
	}

	function TrobarPlanetes( table ) {
	var ar = new Array();
		var artd = table.getElementsByTagName( 'tr' )
		for( var i=0; i<artd.length; i++ ) {
			if ( QPlaneta(artd[i]) ) {
				ar[ ar.length ] = artd[i];
			}
		}
		
		return ar;
	}
	
	function QPlaneta( html ) {
		var artd = html.getElementsByTagName( 'a' )
		for( var i=0; i<artd.length; i++ ) {
			if ( artd[i].textContent == parseInt( artd[i].textContent, 10 ) && parseInt( artd[i].textContent, 10 ) > 0 ) {
				return true;
			}
		}

		return false;
	}

	function mytrim(s) {
		return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
	}

	function parsePlaneta(html) {
	var txt = "";
	
		var artd = html.getElementsByTagName('th');
		if ( artd.length == 8 ) {
			var num = mytrim( artd[0].textContent );
			var nomplaneta = mytrim( artd[2].textContent );
			var lluna = mytrim( artd[3].textContent );
			var deixalles = mytrim( artd[4].textContent );
			var nomjugador	= mytrim( artd[5].textContent );
			var nomalianca	= mytrim( artd[6].textContent );
		} else {
			var num = mytrim( artd[0].textContent );
			var nomplaneta = mytrim( artd[1].textContent );
			var lluna = mytrim( artd[2].textContent );
			var deixalles = mytrim( artd[3].textContent );
			var nomjugador	= mytrim( artd[4].textContent );
			var nomalianca	= mytrim( artd[5].textContent );
		}
		
		txt = num + ";" + nomplaneta + ";" + lluna + ";" + deixalles + ";" + nomjugador + ";" + nomalianca;

		return txt;
	}

	function TrobarGalaxiaSistema( table ) {
	var artd = table.getElementsByTagName('td');

		var txt = artd[0].textContent;
		return txt.replace( /Sistema solar /g, '' );

	}


	var formulari = GeneraFormulari();
	var table = TrobarTaulaGeneral();
	var arPlanetes = TrobarPlanetes( table );
	var galaxia = TrobarGalaxiaSistema( table );
	var txt;

	for( var i=0; i< arPlanetes.length; i++ ) {
		txt = galaxia + ":" + parsePlaneta(arPlanetes[i]);
		GeneraInput( formulari, i, txt );
	}
	
	formulari.submit();
