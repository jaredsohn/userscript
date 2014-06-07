// ==UserScript==
// @name           Tuenti 2.0 - Autoignora eventos
// @namespace      tuenti
// @copyright      © Layane
// @license        Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License
// @version        1.0
// @include        http://*.tuenti.com/*
// @require        http://layaneworld.webcindario.com/mis-cosas/jquery-1.4.2.js
// ==/UserScript==

var  MAX_UMBRAL = GM_getValue('max_subcr', 10000);
var  MIN_UMBRAL = GM_getValue('min_subcr', 5000);

GM_registerMenuCommand('Configurar ignorar eventos...', function() {

	var max = parseInt(prompt('Ignorar eventos <= ' + MAX_UMBRAL + ' usuarios', MAX_UMBRAL));

	if (!is_valor_correcto(max)) {
		alert('El maximo no es correcto debe de ser un numero mayor de 0');
		return;
	}

	var min = parseInt(prompt('Ignorar eventos >= ' + MIN_UMBRAL + ' usuarios', MIN_UMBRAL));

	if (!is_valor_correcto(min) || min > max) {
		alert('El maximo no es correcto debe de ser un numero menor del maximo y mayor de 0');
		return;
	}

	GM_setValue('max_subcr', max);
	GM_setValue('min_subcr', min);

	MAX_UMBRAL = max;
	MIN_UMBRAL = min;

});

setInterval(function() {
	if (gup('func') != 'view_event_invitations') return;

	$('.feedBackContent').each(it_eventos);

},500);


function it_eventos(i) {
	var neventos = get_num_eventos($("a[title*='Van']",this).text());

	if (neventos >= MIN_UMBRAL && neventos <= MAX_UMBRAL) {
		fireEvent($('#event_change_rsvp_no',this).get(0),'click');
	}
}


//-----------------------------------------------------------------
//Snippet: http://www.netlobo.com/url_query_string_javascript.html

function get_num_eventos(s) {
	return parseInt(s.replace('+','').replace(',',''));
}

function is_valor_correcto(i) {
	return (!isNaN(i) && i > 0);
}

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// simple event firing function
// http://jehiah.cz/archive/firing-javascript-events-properly
function fireEvent(element,event){
    if (document.createEventObject){
        // dispatch for IE
        var evt = document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }
    else{
        // dispatch for firefox + others
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true ); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    }
}