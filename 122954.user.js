// ==UserScript==
// @author         Afroks/mVeliki
// @name           FinishTest
// @description    Mislim da ce ovako da radi
// ==/UserScript==
var SOPFunkcija = function($, window, undefined) {
	function KopceFunkcija(){
	    var Subjekt = 'neki glupi subjekt';
	    var Poruka = 'neka glupa poruka';
	    PanelHTML = '<div id="mVPanel" style="position:fixed;top:0;right:0;padding:2px 8px;border:2px solid lightgreen;background-color:green;color:white;z-index:100000"><button id="mV_BtnStart" type="button" style="font-size:90%" onclick="PutPoruka();">Unesi</button></div>'; $j('#mVPanel').remove(); $j(PanelHTML).appendTo('body'); 
        function PutPoruka() { $j('#citizen_subject').val(Subjekt); $j('#citizen_message').val(Poruka); }
	}
	$(document).ready(function(){
	    KopceFunkcija();
}

// Script Insert
var script = document.createElement('script');
script.textContent = '(' + SOPFunkcija + ')(jQuery, window);';
document.body.appendChild(script);