// ==UserScript==
// @name Ubuntu-it Ban Helper
// @description Ubuntu-it Ban Helper
// @include http://forum.ubuntu-it.org/mcp.php?i=ban*
// @require http://code.jquery.com/jquery-1.9.1.js
// @require http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @resource customCSS http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css
// ==/UserScript==

var newCSS = GM_getResourceText ("customCSS");
GM_addStyle (newCSS);

var days = $('<select>');
days.append('<option value="" selected disabled>Seleziona il numero di giorni...</option>');
for( var i=2; i<15; i++ ){
    days.append('<option value="'+i+'">'+i+' giorni</option>');
}
days.change(function(){
    var banStops = new Date();
    banStops.setDate( banStops.getDate()+ parseInt($(this).val()) );
    var year = banStops.getFullYear();
    var month = (banStops.getMonth() < 10 ? '0' : '' ) + banStops.getMonth();
    var day = (banStops.getDate() < 10 ? '0' : '' ) + banStops.getDate();
    $('#banlengthother input').val(year + '-' + month + '-' + day);
});

$('#banlengthother').append(days);
$.datepicker.setDefaults( $.datepicker.regional[ "it" ] );
$('#banlengthother input').datepicker({dateFormat:'yy-mm-dd'});
