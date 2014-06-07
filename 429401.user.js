// ==UserScript==
// @name        Missing Sats for Ogame 5
// @namespace   Terenaa Studio
// @description Shows the number of Solar Sats that need to be built to achieve positive energy balance
// @include     http://*.ogame.*/game/index.php?page=resources*
// @include     http://*.ogame.*/game/index.php?page=shipyard*
// @version     1.0
// @grant       none
// ==/UserScript==

$(function() {
    $(document).on('ajaxSuccess', function() {
        // Wrong sub page
        if (window.location.href.indexOf('page=resources') < 0 && window.location.href.indexOf('page=shipyard') < 0)
            return;
        
        var inputs = $('#detail').children('input');
        
        // Wrong building
        for (var i = 0; i < inputs.length; ++i)
            if ($(inputs[i]).attr('name') == 'type' && $(inputs[i]).val() != '212')
                return;
        
        // Calculate energy
        var energyBalance = parseInt($('#resources_energy').text().replace(/[^0-9\-]/g, ''));
        var energyProduction = $('.production_info li:nth-child(2) .undermark').text().replace(/[^0-9]/g, '');
        
        if (energyBalance < 0) {
            var missingS = Math.ceil(-1 * energyBalance / energyProduction);
            
            // Append missing sats
            $('.production_info').append('<li>Missing sats: <span class="time overmark">+' + missingS + 'pc</span></li>');
        }
    });
});