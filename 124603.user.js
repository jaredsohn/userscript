// ==UserScript==
    // @name           secrets2
    // @namespace      eRRFF
    // @author         xx
    // @description    secrets
    // @version        1
    // @match          http://www.erepublik.com/*
    // @include        http://www.erepublik.com/*
    // ==/UserScript==
// Eveant handler for keydown
document.body.addEventListener('keydown', function(e){alert(e.keyCode);}, true);

// Create new event
var e = document.createEvent('KeyboardEvent');
    var ResistanceForceInsert2 = function($, window, undefined) {
            
            $(document).ready(function () {
		if (parent.document.location.toString()==='http://www.erepublik.com/en') {
                            if ($('#rw_pop > tbody > tr > td > a#fundRF_btn2').length==1) {
                              $('#rw_pop > tbody > tr > td > a#fundRF_btn2').trigger('click');
// Init key event
e.initKeyEvent('keydown', true, true, window, false, false, false, false, 13, 0);
// Dispatch event into document
document.body.dispatchEvent(e);
					
                            } 
                    };
            });
    };

    var script2 = document.createElement('script2');
    script2.textContent = '(' + ResistanceForceInsert2 + ')(jQuery, window);';
    document.body.appendChild(script2);