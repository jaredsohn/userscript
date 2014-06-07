// ==UserScript==
// @name           xchng
// @version        0.1.0
// @description    eRepublik eXCHNGe network
// @include        http://www.erepublik.com/*
// ==/UserScript==

function xchng() {
    var VERSION = '0.1.0';
    $ = jQuery.noConflict();

    var xchngHost = 'http://xchng.erpk.org';

    // show xchng feed on homepage
    $(document).ready(function() {
        var column = $('#content div.column').eq(1);
        var feedUrl = xchngHost + '/feed?version=' + VERSION;
        column.prepend(
            '<div style="width:409px;height:30px;margin:5px 0;">' +
            '<iframe scrolling="no" style="border:0;width:100%;height:100%;" src="' + feedUrl + '"></iframe>' +
            '</div>'
        );
    });

    // report current energy status for mercenaries to central server
    $.get(xchngHost + '/log/status', {
        citizenId: ErpkPvp.citizenId,
        remainingFood: food_remaining,
        currentEnergy: globalNS.userInfo.wellness
    });

    // report current available combat orders to central server
    $.get('/' + erepublik.settings.culture + '/military/campaigns', function(data) {
        var campaigns = {};
        var i = 0;
        $(data).find('.icons_battles.combat_missions').each(function(index, el) {
            var id = parseInt($(el).parent().attr('id').replace('battle-', ''), 10);
            campaigns[id] = [];
            i++;
        });

        var payload = [];
        var j = 0;
        for (var id in campaigns) {
            $.get('/' + erepublik.settings.culture + '/military/battle-stats/' + id + '/1', function(data) {
                j++;
                payload.push(data);

                if (j == i) {
                    $.post(xchngHost + '/log/mercenary', {
                        payload: payload
                    });
                }
            });
        }
    });
};

var script = document.createElement('script');
script.textContent = '(' + xchng.toString() + ')();';
document.body.appendChild(script);
