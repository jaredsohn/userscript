// ==UserScript==
// @name        Moyenne but Soccerway
// @namespace   http://fr.soccerway.com
// @include     http://fr.soccerway.com/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

// Add jQuery
var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.9.1.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// Click by JoeSimmons
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
if(!e && typeof e=='string') e=document.getElementById(e);
if(!e) {return;}
var evObj = document.createEvent('MouseEvents');
evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
e.dispatchEvent(evObj);
}

// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();

        var loop = 1;
        
        var nbJour = 6;
        
        var totalBut = 0;
        var totalButEncaisse = 0;
    
        
        linkForme = jQuery('#page_competition_1_block_competition_tables_8_1_4');
        function go() {
            table = jQuery('.block_competition_form_table table');
            if (table.length > 0) {
                var nbEquipe = parseInt(table.find('tr.team_rank').length);
                        var totalBut = 0;
        var totalButEncaisse = 0;
                table.find('tr').each(function() {
                    nbBut = jQuery(this).find('.total_gf').html();
                    if (parseInt(nbBut) > 0) {
                        totalBut = parseInt(nbBut) + totalBut;
                    }
                    
                    nbBut = jQuery(this).find('.total_ga').html();
                    if (parseInt(nbBut) > 0) {
                        totalButEncaisse = parseInt(nbBut) + totalButEncaisse;
                    }
                });
                
                var moyenneBut = totalBut/((nbEquipe/2)*nbJour);
                var moyenneButEncaisse = totalButEncaisse/((nbEquipe/2)*nbJour);
                
                var message = 'STATS (6journées et ' + nbEquipe + ' clubs) : \n';
                message += 'Nombre de but : ' + totalBut + ' \nNombre de but encaisse : ' + totalButEncaisse;
                message += '\n\nMoyenne de but : ' + moyenneBut.toFixed(4) + ' \nMoyenne de but encaisse : ' + moyenneButEncaisse.toFixed(4);
                
                alert(message);
                loop = 0;
            }
        }
    
        function goLeague() {
            table = jQuery('.block_competition_league_table table');
            var totalMatch = 0;
                    var totalBut = 0;
        var totalButEncaisse = 0;
            if (table.length > 0) {
                var nbEquipe = parseInt(table.find('tr.team_rank').length);
                table.find('tr').each(function() {
                    nbMatch = jQuery(this).find('.mp').html();
                    if (parseInt(nbMatch) > 0) {
                        totalMatch = parseInt(nbMatch) + totalMatch;
                    }
                
                    nbBut = jQuery(this).find('.total_gf').html();
                    if (parseInt(nbBut) > 0) {
                        totalBut = parseInt(nbBut) + totalBut;
                    }
                    
                    nbBut = jQuery(this).find('.total_ga').html();
                    if (parseInt(nbBut) > 0) {
                        totalButEncaisse = parseInt(nbBut) + totalButEncaisse;
                    }
                });
   
                var moyenneMatch = totalMatch / nbEquipe;
                
                var moyenneBut = totalBut/(moyenneMatch*(nbEquipe/2));
                var moyenneButEncaisse = totalButEncaisse/(moyenneMatch*(nbEquipe/2));
                
                var message = 'STATS ('+ moyenneMatch.toFixed(2) +' journées et ' + nbEquipe + ' clubs) : \n';
                message += 'Nombre de but : ' + totalBut + ' \nNombre de but encaisse : ' + totalButEncaisse;
                message += '\n\nMoyenne de but : ' + moyenneBut.toFixed(4) + ' \nMoyenne de but encaisse : ' + moyenneButEncaisse.toFixed(4);
                
                alert(message);
         
            }
        }
    
        if (linkForme.length > 0) {
            goLeague();
            setInterval(function() {
                if (loop==1) {
                    go();
                }
            }, 2000);
        }



}, false);


