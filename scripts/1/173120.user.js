// ==UserScript==
// @name       Covoiturage.fr : masquer les trajets complets
// @namespace  http://www.arkanite.com
// @version    1.0
// @description  Masquer les trajets complets lors d'une recherche sur le site Covoiturage.fr de BlaBlaCar.
// @match     http://www.covoiturage.fr/recherche?fc=*
// @copyright  2012+, rAthur
// ==/UserScript==
var nbComplets = 0;
var titreVoyage = $('.comuto-results-info-title').html();
function nettoyage()
{
    nbComplets +=  $('.one-trip-no-seat-available').size();
    $('.one-trip-no-seat-available').remove();
    $('.comuto-results-info-title').html(titreVoyage+' dont '+$('.one-trip-info').size()+' disponibles et '+nbComplets+' complets.')
    $('.one-trip-info').find('.date').each(function()
    {
        var date = $(this).text().replace(/\n/ig,'');
        var horaire = date.split(' ')[date.split(' ').length-1];
        var heure_depart = horaire.split('h')[0]*1;
        var minute_depart = horaire.split('h')[1]*1;
        var date_actuelle = new Date();	
        var heure_actuelle = date_actuelle.getHours(); 
        var minute_actuelle = date_actuelle.getMinutes(); 
        if (date.indexOf('Aujourd')!==-1 && heure_depart<heure_actuelle || (heure_depart==heure_actuelle && minute_depart<minute_actuelle))
            $(this).parent().parent().parent().remove();
    });
}
nettoyage();
$('#comuto_pagination').find('a').each(function()
{
    var nb = $(this).html();
    var href = $(this).attr('href');
    if (!isNaN(nb) && nb*1!=1)
    {
        $('.search-results:eq('+($('.search-results').size()-1)+')').append('<div id="ajax_resultats_page_'+nb+'"></div>')
        $('#ajax_resultats_page_'+nb+'').load(href+' .search-results',function(){ nettoyage(); })
    }
});
$('#comuto_pagination').remove();