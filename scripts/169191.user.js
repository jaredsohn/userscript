// ==UserScript==
// @name        Unixy : bouton planète suivante et précédente
// @version    	1.0
// @description Ajoute des boutons de chaque côté du menu déroulant de planètes
// @include		unixy.fr
// @include     www.unixy.fr
// @include		*.unixy.fr/index.php*
// @require		http://code.jquery.com/jquery-1.10.0.min.js
// @copyright  	2013+, You-
// ==/UserScript==

$('select[name=change_planete]').parent().parent().parent().css({'position':'relative','top':'17px'});
$('select[name=change_planete]').parent().parent().css({'position':'relative','bottom':'17px'});

var prev = $('select.tour_1 option:selected').prev().val();
var done = false;
if(prev != undefined) {
    $('select[name=change_planete]').before('<input type="button" class="previous_button" value="<-" style="position:relative;top:19px;right:90px; z-index:1000"/>');
    $('input.previous_button').click(function(){        
        window.location.href = prev;
    });    
} else {
    $('select[name=change_planete]').css({'position':'relative','top':'17px'});
    $('select[name=change_planete]').after('<input type="button" class="next_button" value="->" style="position:relative;left:90px; z-index:1000"/>');
    done = true;
}

var next = $('select.tour_1 option:selected').next().val();
if(next != undefined) {
    if(!done) {
        $('select[name=change_planete]').after('<input type="button" class="next_button" value="->" style="position:relative;bottom:19px;left:90px; z-index:1000"/>');
    }
    $('input.next_button').click(function(){        
        window.location.href = next;
    });
}
