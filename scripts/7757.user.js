// ==UserScript==
// @name		  OGame MyGalaxyTool
// @namespace	 OGame MyGalaxyTool
// @description   UserScript for send the Galaxy to OgameSchool GalaxyParser.
// @include	   http://ogame399.de/game/galaxy.php?session=*
// @include	   http://ogame399.de/game/messages.php?session=*
// @include	   http://ogame399.de/game/bericht.php?session=*
// @include	   http://ogame399.de/game/stat.php?session=*
// @include	   http://ogame399.de/game/phalanx.php?session=*
// @include	   http://ogame353.de/game/flottenversand.php?session=*
// @include	   http://ogame353.de/game/flotten2.php?session=*
// @exclude	   
// ==/UserScript==    

// @ include	   http://*/game/galaxy.php?session=*


	function MyOgameGalaxyViewer() {

		// ** obtenemos session
		var Session = document.body.innerHTML.substr(document.body.innerHTML.indexOf("session=") + 8,12);
	
		var formulario = document.createElement("form");
		formulario.setAttribute( "action", "http://ogameschool.dnsalias.com/parsers/parsegalaxy.php" );
		formulario.setAttribute( "method", "post" );
		formulario.setAttribute( "target", "iframe_oculto" );
		var input = document.createElement("input");
		input.setAttribute( "name", "contingut" );
		input.setAttribute( "type", "hidden" );
//		input.value = document.body.innerHTML;
		input.value = document.body.textContent;
		formulario.appendChild(input);
		var input = document.createElement("input");
		input.setAttribute( "name", "contingutHTML" );
		input.setAttribute( "type", "hidden" );
		input.value = document.body.innerHTML;
		formulario.appendChild(input);
		var input = document.createElement("input");
		input.setAttribute( "name", "contingut2" );
		input.setAttribute( "type", "hidden" );
		input.value = Session;
		formulario.appendChild(input);
		var input = document.createElement("input");
		input.setAttribute( "name", "urlparent" );
		input.setAttribute( "type", "hidden" );
		input.value = document.location;
		formulario.appendChild(input);

		var iframe = document.createElement("iframe");
		iframe.setAttribute( "name", "iframe_oculto" );
		iframe.setAttribute( "id", "iframe_oculto" );
		iframe.setAttribute( "style", "visibility:hidden;height:1px;width:1px;" );
//		iframe.setAttribute( "style", "visibility:visible;height:100px;width:100px;" );
	
	
//		var forms = document.getElementsByTagName('form');
//		forms[0].parentNode.appendChild(formulario);
//		forms[0].parentNode.appendChild(iframe);
		document.body.appendChild(formulario);
		document.body.appendChild(iframe);

		formulario.submit();

	}
	
	document.body.onload = MyOgameGalaxyViewer();
