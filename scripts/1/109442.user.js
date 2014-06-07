http://*.skybyen.no/index.php*option=com_usersearch*

//GreaseMonkey-tags:
// ==UserScript==
// @name			Skybyll
// @namespace		Sky
// @include			http://*.skybyen.no/index.php*option=com_usersearch*  http://*.skybyen.no/index.php*view=users*task=search*		// Skriptet skal kjøre på alle sider på formen som vises til venstre. * betyr at det kan være hva som helst.
// @require			http://code.jquery.com/jquery-1.3.2.min.js					// Hent denne filen og kjør den. Den inneholder jQuery
// @require			#Link#/skybyll/update.js			// Hent denne filen også, og kjør den. Den inneholder en mulighet for meg å si fra om at det har kommet en ny oppdatering. Den setter to variabler - 'update' og 'size'
// ==/UserScript==

	
$(document).ready(function(){		// Så snart DOM (Document Object Model) er klar for å bli endret på, kjør denne funksjonen som defineres akkurat nå:
	if ( update == 1 ) {			// Dersom variablen update har blitt satt lik 1 i filen over...
		if( size = 'minor' ) {		// ...og size er satt til 'minor':
			var updatemsg = '<div style="position: absolute;">...</div>'; // lagre en oppdateringsmelding i en ny variabel
		} else if( size == 'major' ) { //...og size er satt til 'major':
			var updatemsg = '<div style="position: absolute;"> ...</div>'; // lagre en oppdateringsmelding i en ny variabel
		} else {					//
			var updatemsg = '<div style="position: absolute;">...</div>'; // lagre en liten hilsen i en ny variabel
		}
		$('body').append(updatemsg); // legg den nye variablen til helt til slutt i body-elementet
	}
	
	if( parseInt($("select[name='limit'] option:selected").attr('value')) > 0 ) {	// Dersom søkeresultatet er satt til å vise mellom 1 og 100 resultater...
		$("select[name='limit'] option:selected").removeAttr('selected');		// ...ta vekk valget av et tall mellom 1 og 100...
		$('#limit option:last-child').attr('selected', 'selected');					// ...og sett den nederste (0 / alle) til valgt...
		$('#userForm').submit();											// ...og send inn skjemaet. I så fall, kjøres denne sjekken på nytt. 
	}
	
	var i = 0;				// sett variabel i (en teller) lik 0. Akkurat her er jeg litt ustødig på hvordan JavaScript håndterer bruk av variabler innenfor funksjoner sammen med variabler utenfor funksjoner
	setInterval(visit, 5000);	// kjør funksjonen som defineres under hvert femte sekund

	function visit() {			// definér funksjonen som skal kjøres hvert femte sekund (legg merke til at jeg definerer en funksjon i en funksjon, TROLOLOLOL)
		var profile = $('.miniProfile').eq(i++);			// bruk jquery-selektorer (som for øvrig er identiske med CSS-selektorer) for å finne listen av objekter som har klassen .miniProfile, og for hver gjennomkjøring, øk i med en. eq-funksjonen gjør at jeg velger et bestemt objekt i en liste av objekter. omtrent som profile[i++], dersom profile hadde vært et array som holdt alle profil-objektene
		$.get($('a:first', profile).attr('href'));			// bruk jquery-funksjonen get for å sende en forespørsel til URLen (href) som ligger i den første lenken i objektet vi definerte på linjen over
		$(profile).css('background-color', '#c0c0c0');	// endre bakgrunnsfargen til denne bestemte profilen til grå, slik at folk skjønner at det har skjedd noe (sannsynligvis kan jeg kommentere ut linjen over, uten å få en eneste klage. folk elsker visuelle effekter, selv om de er stygge)
	}	// avslutt funksjonen
});		// avslutt LINJEN som startet med $(document).ready(function(){ :D
// Og nå, for deg som har lest helt hit: #Link#/skybyll <3