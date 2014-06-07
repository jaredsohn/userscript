// ==UserScript==
// @name		  OGame Phalanx Time
// @namespace	 OGame Phalanx Time
// @description   UserScript for who don't have Foxgame.
// @include	   http://ogame399.de/game/phalanx.php?session=*
// @include	   http://87.106.16.11/game/phalanx.php?session=*
// @exclude	   
// ==/UserScript==    


	FechaPhalanx( );
	function FechaPhalanx( ) {
	var tag_id, pos, pos1, html_tmp, fecha, fecha_str, gfecha;
	var html = document.body.innerHTML;
	var ardivs = document.getElementsByTagName('div');
	
		for( var i=0; i< ardivs.length; i++ ) {
			if ( ardivs[i].id.substr(0, 3) == 'bxx') {
				tag_id = ardivs[i].id;
				pos = html.indexOf( tag_id );
				html_tmp = html.substr( pos );
				pos = html_tmp.indexOf( 'star' );
				html_tmp = html_tmp.substr( pos );
				pos = html_tmp.indexOf( '"' );
				html_tmp = html_tmp.substr( pos+1 );
				pos1 = html_tmp.indexOf( '"' );
				html_tmp = html_tmp.substr( 0, pos1 );	// ** Hora inicial
	
				p = ardivs[i].parentNode;
				p.setAttribute( "noWrap", "true" );
				html_tmp = parseInt(html_tmp + '000', 10);
				fecha = new Date();
				fecha.setTime( parseInt(html_tmp, 10) + parseInt(ardivs[i].title + '000', 10) );
				
				fecha_str = fecha.toLocaleString();
				pos = fecha_str.indexOf( ',' );
				fecha_str = fecha_str.substr( pos + 2 );
				
				p.innerHTML = p.innerHTML + fecha_str + "<br>";
	
				gfecha = new Date();
				gfecha.setTime( html_tmp );
			}
		}
	
	var artd = document.getElementsByTagName('td');
	var pos, fecha_str;
		for( var i=0; i< artd.length; i++ ) {
			pos = artd[i].textContent.indexOf( "eporte del sensor de la luna en" );
			if ( pos > 0 ) {
				fecha_str = gfecha.toLocaleString();
				pos = fecha_str.indexOf( ',' );
				fecha_str = fecha_str.substr( pos + 2 );
	
				artd[i].innerHTML = "Hora phalanx: " + fecha_str + "<br>"+ artd[i].innerHTML;
			}
		}


		var table = document.createElement("table");
		table.setAttribute( "align", "center" );
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.innerHTML = "<br>Document Source";
		tr.appendChild(td);
		table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var input = document.createElement("textarea");
		input.setAttribute( "name", "prova" );
		input.setAttribute( "rows", "20" );
		input.setAttribute( "cols", "70" );
		input.value = document.body.innerHTML;
		td.appendChild(input);
		tr.appendChild(td);
		table.appendChild(tr);

		document.body.appendChild(table);
		
	}
