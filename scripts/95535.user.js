// ==UserScript==
// @name           LeBonCoin

// @namespace      LeBonCoin
// @description    Pour ajouter une option de recherche sur leboncoin
// @include        http://www.leboncoin.fr/annonces/*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
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

// All your GM code must be inside this function
    function letsJQuery() {
	

	// J'ajoute les champs prix minimum et prix maximum
	$("#zipcode").append("<br /><input type='text' id='minPrice' value='Prix minimum' /><input type='text' id='maxPrice' value='Prix maximum' /><input type='button' id='priceValid' value='Appliquer' /><br /> <input type='checkbox' id='hideNullPrice' value='true' /><label for='hideNullPrice'>Cacher les prix non renseignés</label>");
	
	// J'efface le contenu de ces champs lorsqu'on clique dessus
	$("[id $= 'Price']").click(function(){
		$(this).val('');
	});

	// En cas de clic sur le bouton, on définit le prix minimum et prix maximum, on cache le tout et on ré-affiche ce qui est bon
	$("#priceValid").click(function(){
		prixMinimum = $("#minPrice").val() != "Prix minimum" && $("#minPrice").val() != "" ? $("#minPrice").val() : 0 ;
		prixMaximum = $("#maxPrice").val() != "Prix maximum" && $("#maxPrice").val() != "" ? $("#maxPrice").val() : 100000000 ;
	$("tr td[nowrap='nowrap']:nth-child(3)").each(function(){
/* 		$(this).append("salut"); */
		contenu = $(this).html();
		/* $(this).parent().fadeOut(); */
		var tab = contenu.match(/.*\s([0-9]*)&nbsp.*/)
	    	if (tab) {
				prix = parseInt(tab[1]);
				if (prix >= prixMinimum && prix <= prixMaximum) {
					$(this).parent().fadeIn(500);
				}
				else {
				$(this).parent().fadeOut(500);
				}
			}
			else {
				if ($("#hideNullPrice").is(':checked')){
					$(this).parent().fadeOut(500);
				}
				else {
					$(this).parent().fadeIn(500);
				}
			}
	});
	
	});
	

    }
    
