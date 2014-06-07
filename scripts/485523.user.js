// ==UserScript==
// @name       		Au revoir Yanwang
// @namespace  	http://riseoflods.com
// @version    		1.0
// @description  	Au revoir Yanwang
// @match      		http://www.riseoflords.com/jeu.php?p=main/forum*
// @copyright  		2014+, dragonsniper
// @require      	http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

$('a[href="?p=main/fiche&voirpseudo=yanwang"]').each(function() {
   var el = $(this).parent().parent();
    
    if(el.prop('tagName') == 'TD') {
        el = el.parent();
        var isTrollMessage = el.attr('bgcolor');
        if(isTrollMessage != '#EE0000')
    		el.css('display', 'none');
    }
    else {
        var isTrollMessage = el.find('> table tr:first-of-type td:nth-of-type(2)').attr('bgcolor');
        if(isTrollMessage != '#EE0000') {
        	el.parent().prev().css('display', 'none');
            el.css('display', 'none');
        }
    }
    
});