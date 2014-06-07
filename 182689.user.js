
// ==UserScript==
// @name       Covoiturage.fr en moins relou
// @namespace  charcuterie
// @version    2.0
// @description  nettoie et améliore les pages de résultats
// @match     http://www.covoiturage.fr/recherche?fc=*
// based on http://userscripts.org/scripts/source/173120.user.js
// ==/UserScript==

/*SIMPLIFY GUI*/
$('#header').hide();
$('#page').css({'margin-top': 0, 'border-radius': 0, 'padding-top': 5});
$('.comuto_alert_content').hide();
var jmailAlert = $('<input type="button" value="Alertes mails" class="jmail tip comuto_rss_link comuto_button_small"></input>');
$('.comuto_rss_link').parent().append(jmailAlert);
jmailAlert.css({'margin-right': '10px'});
jmailAlert.click(function(){
	$('.comuto_alert_content').toggle();
});

/*APPEND SORT BAR*/
$('.search-results').first().prepend('<div class="jbar">\
<input id="yautoroute" name="yautoroute" checked="true" type="checkbox">\
<img src="/static/images/pictos/freeway_18x18.png" width="18" height="18" alt="Par la route" title="Par l`\'autoroute" class="tip">\
<input id="nautoroute" name="nautoroute" checked="true" type="checkbox">\
<img src="/static/images/pictos/freeway_no_18x18.png" width="18" height="18" alt="Par la route" title="Par la route" class="tip">\
<input id="yillico" name="yillico" type="checkbox" checked="true" class="jspacer">\
<img src="/static/images/booking/illico.png" alt="" width="45" height="13">\
<input id="nillico" name="nillico" checked="true" type="checkbox">\
<span>No Illico</span>\
<!--<input id="exactplace" name="exactplace" class="jspacer" checked="true" type="checkbox">\
<span>Lieu départ exact</span>\
<span class="jspacer">|</span>\
<span class="jspacer">Tri: </span>\
<span class="jspacer">⋀ pr</span><span>ix ⋁</span>\
<span class="jspacer">⋀ heu</span><span>re ⋁</span>\
<span class="jspacer">⋀ pla</span><span>ces ⋁</span>-->\
</div>');
$('.jspacer').css({'margin-left': '30px'});
$('.jbar').css({'padding':'5px', 'padding-left': '10px', 'padding-right': '10px', 'border': 'solid 1px #CCC', 'border-radius': '5px', 'background-color': 'rgb(250, 248, 245)', 'margin-top': '10px', 'margin-bottom': '10px'});
$('.search-results').css({'margin': 0, 'border-radius': 0});

//FILTERING FEATURES
var yautoroute = 1, nautoroute = 1, yillico = 1, nillico = 1;

function updateVisibility(){
    //quick & dirty: display all, then mask the unwanted items:
    $('.icon-highway[src*="freeway_18x18.png"]').parent().parent().parent().show();
    $('.icon-highway[src*="freeway_no_18x18.png"]').parent().parent().parent().show();
    $('.nbseats-booking-illico').parent().parent().parent().show();
    $('.nbseats-booking-manual').parent().parent().parent().show();
    //
    if (!yautoroute) {
        $('.icon-highway[src*="freeway_18x18.png"]').parent().parent().parent().hide();
    }
    if (!nautoroute) {
        $('.icon-highway[src*="freeway_no_18x18.png"]').parent().parent().parent().hide();
    }
    if (!yillico) {
        $('.nbseats-booking-auto').parent().parent().parent().hide();
    }
    if (!nillico) {
	    $('.nbseats-booking-manual').parent().parent().parent().hide();
    }
}

$('#yautoroute').change(function(){
    yautoroute = $(this).is(':checked');
    updateVisibility();
});

$('#nautoroute').change(function(){
    nautoroute = $(this).is(':checked');
    updateVisibility();
});

$('#yillico').change(function(){
    yillico = $(this).is(':checked');
    updateVisibility();
});

$('#nillico').change(function(){
    nillico = $(this).is(':checked');
    updateVisibility();
});

/*
SORTING:
$('td').sortElements(comparator, function(){
	return this.parentNode;
    })
*/


var nbComplets = 0;
var titreVoyage = $('.comuto-results-info-title').html();

function retirerDoublons(){
    //var trips = $('.one-trip');
    //var doublons = $('.one-trip').length;
 
    //doublons = doublons - $('.one-trip').length;
    //alert(doublons + ' doublons retirés');
    
    //trips = $.unique(trips);
    
    /*var seen = {};
    $('a').each(function() {
        var txt = $(this).text();
        if (seen[txt])
            $(this).remove();
        else
            seen[txt] = true;
    });*/
}

function nettoyage()
{
    nbComplets +=  $('.one-trip-no-seat-available').size();
    $('.search-results-club').remove(); //remove duplicates from prenium users (club)
    $('.one-trip-no-seat-available').remove();
    $('.comuto-results-info-title').html(titreVoyage+' dont '+$('.one-trip-info').size()+' disponibles et '+nbComplets+' complets.');
    $('.one-trip-info').find('.date').each(function()
                                           {
                                               var date = $(this).text().replace(/\n/ig,'');
                                               var horaire = date.split(' ')[date.split(' ').length-1];
                                               var heure_depart = horaire.split('h')[0];
                                               var minute_depart = horaire.split('h')[1];
                                               var date_actuelle = new Date();	
                                               var heure_actuelle = date_actuelle.getHours(); 
                                               var minute_actuelle = date_actuelle.getMinutes(); 
                                               if ((date.indexOf('Aujourd')!==-1 && heure_depart<heure_actuelle) || (heure_depart==heure_actuelle && minute_depart<minute_actuelle)){
                                                   $(this).parent().parent().parent().remove();
                                               }
                                           });
    retirerDoublons();
    $('.search-results').css({'border':0});
    $('.search-results').css({'margin': 0, 'border-radius': 0});

}

retirerDoublons();
nettoyage();

$('#comuto_pagination').find('a').each(function()
                                       {
                                           var nb = $(this).html();
                                           var href = $(this).attr('href');
                                           if (!isNaN(nb) && nb!=1)
                                           {
                                               /* Original method:
                                               $('.search-results:eq('+($('.search-results').size()-1)+')').append('<div id="ajax_resultats_page_'+nb+'"></div>');
                                               $('#ajax_resultats_page_'+nb).load(href+' .search-results',function(){ 
                                                   nettoyage(); 
                                               });
                                               */
                                               //Jeff way (no pages in DOM)
                                               $('.search-results:eq('+($('.search-results').size()-1)+')').append('<div id="ajax_resultats_page_'+nb+'"></div>');
                                               $('#ajax_resultats_page_'+nb).load(href+' .search-results',function(nb){ 
                                                   nettoyage();
                                                   //$('#ajax_resultats_page_'+nb).unwrap();
                                               });
                                           }
                                       });

$('#comuto_pagination').remove();

/*Load jQuery.fn.sortElements to enable sorting by price, date...*/

/**
 * jQuery.fn.sortElements
 * --------------
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 18-MAR-2010
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){
    
    var sort = [].sort;
    
    return function(comparator, getSortable) {
        
        getSortable = getSortable || function(){return this;};
        
        var placements = this.map(function(){
            
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                
                // Since the element itself will change position, we have
                // to have some way of storing it's original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
            
            return function() {
                
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
                
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
                
            };
            
        });
       
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
        
    };
    
}());