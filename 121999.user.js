// ==UserScript==
// @name           LSFLSF
// @namespace      LSF-Tools
// @description    Zweiter Versuch sich das Leben einfacher zu machen
// @include        https://lsf.uni-heidelberg.de/*
// ==/UserScript==
var $;

// Jquery aktivieren
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || 				document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
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
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this functio
    function letsJQuery() {
	createOptionsMenu();
	pressthatButton();
    }

function selectCheckboxfromLabel (label) 
{
	// Aktiviert die Checkbox über den Umweg des Vater DIV's der
	// Klasse ".kleinPlatz"
	var es = label.parent()
	var unten = es.children(":checkbox");
	unten.prop("checked",true);
	
}


function createOptionsMenu() {
	// Erstellen des Optionen Menus
	var htmlstring = "";
	$('body').append('<div id="greaseblende" style="display:none;position:fixed;top:0px;left:0px;width:100%;height:100%;background-color:#000000;opacity:0.8;z-index:809;font-style:sans-serif;"></div>' + 
	'<div id="greasemenu" style="display:none;position:fixed;top:27px;left:0px;width:400px;height:400px;background-color:#ffffff;z-index:900;padding:13px;">' + 
	'<input id="seminarselect" type="text" style="width:13px;" value="I"> Bitte Seminargruppe in römischen Zahlen eintragen <br />' +
	'<input id="praktikumselect" type="text" style="width:13px;" value="A"> Bitte Praktikumsgruppe (Großbuchstaben) eintragen <br /><br />' +
	'<input type="button" id="greasecheck" value="Ankreuzen"><br/><br />'+
	'<p> <b> WICHTIG! Um alle Termine eines Semesters vorzumerken, bitte zu erst im Vorlesungsverzeichnis (während man in der kurzen oder mittleren Ansicht ist) mit einem Klick auf das Plus-Zeichen vor 1. ( respektive 2.,3.,..) Studienjahr alle Termine aufblättern. Dann auf die "Lang" Ansicht wechseln und das Skript starten. Nach dem erfolgreichen Beenden des Skriptes erscheint eine Bilanz neben dem "Öffne mich" Knopf, danach keinesfalls vergessen auf "Die Termine vormerken" zu klicken und den Stundenplan zu speichern!</b> </p>' +
	'</br><p> Das Ankreuzen ist sehr rechenintensiv! Sollte auf älteren Rechnern ein PopUp mit der Frage nach dem Ausführen des Skriptes auftauchen, bitte mit einem Klick auf <b>"Weiter ausführen"</b> bestätigen.</p>' +
	'Bei Verbesserungswünschen und -vorschlägen bitte eine Email an:<br /> <b>jhnnsrs@gmail.com</b><br><br> Haut rein! </div>');
	$('#greasecheck').bind("click", function(){ pageChecker(getGroups()); });

}

function getGroups () {

	// Seminargruppen Auslesen
	seminargruppe = $("#seminarselect").val().toUpperCase();
	praktikumsgruppe = $("#praktikumselect").val().toUpperCase();

	var groups = new Array();
	groups[0] = seminargruppe;
	groups[1] = praktikumsgruppe;

	return groups;

}

function pageChecker (groups) {

	// Kern des Skriptes
	var seminargruppe = groups[0];
	var praktikumsgruppe = groups[1];
	var vorheriges = "";
	var x = 0;
	var z = 1;
	var zählpraktikum = 0;
	var zählseminar = 0;
	var zählalles = 0;
	var hannes = $('.kleinPlatz > label');
	while (x <= hannes.length)
	{
		var peter = $('.kleinPlatz > label').eq(x);
		var kartoffel = $('.kleinPlatz > label').eq(x).text();
		if (kartoffel.indexOf("Termin") != -1)
		{ 
		    var petersvater = peter.parent();
		    var petersopa = petersvater.parent();
		    var peterstante = petersopa.children("div");
		    var textchen= peterstante.text();
		    if ( kartoffel.indexOf("Gruppe") != -1) {
		      if ( textchen.indexOf("Seminar") != -1) 
		          {
			      if ( kartoffel.indexOf(" " + seminargruppe + " ") != -1)
			         {
					  selectCheckboxfromLabel(peter);
					  zählalles++;
					  zählseminar++;
				      }
			      }
			  if ( textchen.indexOf("Objektseminar") != -1) 
		          {
			      if ( kartoffel.indexOf(" " + seminargruppe + " ") != -1)
			         {
					  selectCheckboxfromLabel(peter);
					  zählalles++;
					  zählseminar++;
				      }
			      }
			  if ( textchen.indexOf("Praktikum") != -1) 
			     {
    			  if (kartoffel.indexOf(" " + praktikumsgruppe + " ") != -1)
    			  {
				    selectCheckboxfromLabel(peter);
				    zählalles++;
				    zählpraktikum++;
				   }
		          }
		      if ( textchen.indexOf("Einzeltermin") != -1)
		          {
		             if ( kartoffel.indexOf(" " + seminargruppe + " ") != -1)
			             {
					     selectCheckboxfromLabel(peter);
					     zählalles++;
					     zählseminar++;
				         }
			         if (kartoffel.indexOf(" " + praktikumsgruppe + " ") != -1)
				        {
				        selectCheckboxfromLabel(peter);
				        zählalles++;
				        zählpraktikum++;
				        }
			         
			      }
			}
			else {
			
			if ( textchen.indexOf("Einzeltermin") != -1) {
		    
					selectCheckboxfromLabel(peter);
					zählalles++;
			}
			
			if ( textchen.indexOf("Vorlesung") != -1) {
		    
					selectCheckboxfromLabel(peter);
					zählalles++;
			}
			
			if ( textchen.indexOf("Prüfung") != -1) {
		    
					selectCheckboxfromLabel(peter);
					zählalles++;
			}
			}
		}
		else 
			{
			// Do nothing
			}
		
		x++;
	}
	$('#greasecheck').val("Alle Veranstaltungen erfolgreich angekreuzt");
	$('#hannes').html(' Du hast insgesamt <b>' + zählalles + '</b> Termine vorgemerkt. Darunter <b>' + zählpraktikum + '</b> Praktikumstermine (Gruppe ' + praktikumsgruppe + ' )  und <b>' + zählseminar + '</b> Seminartermine (Gruppe ' +seminargruppe + ' )');
}

function pressthatButton () {
	// Benachrichtigungsleiste und Knopf Aktivation
	$('body').append('<div id="toptoptop" style="position:fixed;display: none;top:0px;left:0px;z-index:999;width:100%;height:30px;background-color:#990000;font-color:#FFFFFF;padding-top:2px;"><input type="button" id="startlsf" value="Drück Mich""><span id="hannes" style="color:#ffffff;"> <b>LSFLSF</b> ist jetzt aktiv.</span></div>');
	$('#toptoptop').show("slow");
	$("#startlsf").toggle(function(){ 
	$('#greaseblende,#greasemenu').show("fast");
	$("#startlsf").val("Schließ Mich");
	 },function(){ 
	 $('#greaseblende,#greasemenu').hide("fast");
	 $("#startlsf").val("Öffne mich");
	 });


}

// Palaver Palaver Stinkeschwein
