// Infojobs Date Tracker
// Version 0.1 12/10/2009
//
// Copyright (c) 2009, Ldt
//
// Released under the GPL v2 licence
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------------
//
// Este es un script de Greasemonkey.
//
// Para instalarlo, necesitas Firefox 3.5 y la extensión Greasemonkey:
// http://www.greasespot.net/ .
//
// Este script mira los ofertas en InfoJobs (busqueda_ofertas_resultados.cfm) y
// añade la fecha que viste la oferta por la primera vez.
//
// También marca las ofertas con un color, el color cambia en función de la
// fecha que las viste la primera vez:
//     - Blanco:   < 2 días
//     - Verde:    2-4 días
//     - Amarillo: 4-6 días
//     - Rojo:     > 6 días
//
// Este script utiliza localStorage. Para borrar los datos de tu perfil, haz
// clic en el botón 'borrar registros' que aparece encima del logotipo de
// InfoJobs en la página busqueda_ofertas_resultados.cfm. ¡Cuidado, no pide
// confirmación!
// 
// Espero que encuentres útil este script y que tengas suerte con tu búsqueda
// de trabajo.
//
// ----------------------------------------------------------------------------
//
// ==UserScript==
// @name           InfoJobs Date Tracker
// @namespace      http://localhost/infojobs-date-tracker
// @description    Tracks the date that job announcements were first seen.
// @include        http://www.infojobs.net/busqueda_ofertas_resultados.cfm
// @include        https://www.infojobs.net/busqueda_ofertas_resultados.cfm
// ==/UserScript==


// Global Variables

var myLocalStorage = localStorage;


// Functions

function infojobs_date_tracker()
	{
	// Get current date, remove hour/minute/second/milliseconds
	var currentDate = new Date();
	currentDate.setHours(0);
	currentDate.setMinutes(0);
	currentDate.setSeconds(0);
	currentDate.setMilliseconds(0);

	// Add delete button
	divHd = document.getElementsByClassName('hd')[0];
	if( divHd != null )
		divHd.innerHTML = "<p align='right'><form><input type='button' value='Borrar registros' onclick='localStorage.clear()'></form></p>" + divHd.innerHTML;

	// Find results in page
	var divResults = document.getElementById('div_results');
	if( divResults == null )
		return;

	// Find table row
	var divResultsTr = divResults.getElementsByTagName('tr');
	for( var ii=0; ii<divResultsTr.length; ii++)
		{
		// Find columns in row
		var divResultsTrTd = divResultsTr[ii].getElementsByTagName('td');
		if( divResultsTrTd.length == 5 )
			{
			// Find job date element in table row
			var divResultsTrTdFechaSpan = divResultsTrTd[1].getElementsByTagName('span')[0];

			// Get date of job in string format, convert to date format
			var divResultsTrTdFechaSpanText = divResultsTrTdFechaSpan.textContent;
			jobDateText = divResultsTrTdFechaSpanText.split( '/', 2 )
			jobDateDay = jobDateText[0];
			jobDateMonth = jobDateText[1] - 1;
			if( currentDate.getMonth() < jobDateMonth )
				jobDate = new Date( currentDate.getFullYear() - 1, jobDateMonth, jobDateDay );
			else
				jobDate = new Date( currentDate.getFullYear(), jobDateMonth, jobDateDay );

			// Get address of job announcement, strip off protocol and domain.
			var divResultsTrTdPuestoAHref = divResultsTrTd[2].getElementsByTagName('a')[0].href;
			if ( divResultsTrTdPuestoAHref.substring(4,5) == 's' )
				divResultsTrTdPuestoAHref = divResultsTrTdPuestoAHref.substring( 25 );
			else
				divResultsTrTdPuestoAHref = divResultsTrTdPuestoAHref.substring( 24 );

			// If the address doesn't already exist then store it with the current date
			var marker = '';
			var myLocalStorageTime = myLocalStorage.getItem( divResultsTrTdPuestoAHref );
			if( myLocalStorageTime == null )
			{
				myLocalStorageTime = jobDate.getTime();
				myLocalStorage.setItem( divResultsTrTdPuestoAHref, myLocalStorageTime );
				marker = ' *';
			}

			// Edit job date element to include date the job was first seen 
			var myLocalStorageDate = new Date( myLocalStorageTime - 0  );
			divResultsTrTdFechaSpan.innerHTML = divResultsTrTdFechaSpan.innerHTML + '<br><b>(' + myLocalStorageDate.getDate() + '/' + ( myLocalStorageDate.getMonth() + 1 ) + ')' + marker + '</b>';

			// Edit table row to include a colour
			// White: Seen in the last two days
			// Green: Seen between 2-4 days ago
			// Yellow: Seen between 4-6 days ago
			// Red: Seen 6 days ago or more
			switch( ( currentDate.getTime() - myLocalStorageTime ) / 86400000 )
				{
				case 0:
				case 1:
					break;
				case 2:
				case 3:
					divResultsTr[ii].bgColor = '#9DCD6E'; // Green
					break;
				case 4:
				case 5:
					divResultsTr[ii].bgColor = '#D1A85D'; // Yellow
					break;
				default:
					divResultsTr[ii].bgColor = '#C36061'; // Red
				}
			}
		}
	}

infojobs_date_tracker();
