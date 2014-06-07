// ==UserScript==
// @name TWeaker Hu translation
// @description TWeaker
// @author Vbyec
// @license MIT
// @version 0.1.3
// @nocompat Chrome
// @grant none
// @include http://*.the-west.*/game.php*
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

exec(function () {
    // Show advance information about player
    FortBattle.getCharDataSheetOrigin = FortBattle.getCharDataSheet;
    FortBattle.getCharDataSheet = function (data) {
        return FortBattle.getCharDataSheetOrigin(data) + "<br/><div class='total_damage'>Összes sebzés:<strong>%totalDmg%</strong> </div>" +
            "<div class='last_damage'>Utolsó sebzés: <strong>%lastDmg%</strong></div>";
    }

    FortBattle.flashShowCharacterInfoOrigin = FortBattle.flashShowCharacterInfo;
    FortBattle.flashShowCharacterInfo = function (fortId, playerId, healthNow, healthMax, totalDmg, lastDmg, shotat, bonusdata) {
        //Kill shot
        lastDmg = lastDmg < 15000 ? lastDmg : 'Eszméletlen';
        FortBattle.flashShowCharacterInfoOrigin(fortId, playerId, healthNow, healthMax, totalDmg, lastDmg, shotat, bonusdata);
        FortBattle.flashShowCharacterInfoEl(fortId, playerId, healthNow, healthMax, totalDmg, lastDmg, shotat, bonusdata);
    };
    //@todo work with uncached players
    FortBattle.flashShowCharacterInfoEl = function (fortId, playerId, healthNow, healthMax, totalDmg, lastDmg, shotat, bonusdata) {
        if (parseInt(Chat.MyId.split('_')[1]) === playerId)
            return;
        setTimeout(function () {
            document['onkeyup'] = null;
        }, 2500);
        document['onkeyup'] = function (e) {
            e = e || window.event;
            e.preventDefault();

            console.log(new Date().getTime());
            var cacheKey = fortId + ':' + playerId;
            if (FortBattle.characterCache.hasOwnProperty(cacheKey)) {
                var nick = $(FortBattle.characterCache[cacheKey])[0].textContent;
                var active_chat_input = $('input.message:visible');
                var keyCode = e.keyCode ? e.keyCode : e.charCode;

                switch (keyCode) {
                    case 16:
                        /* shift */
                        active_chat_input.val(active_chat_input.val() + "*" + nick + "* csere  ");
                        break
                    case 17:
                        /* ctrl */
                        active_chat_input.val(active_chat_input.val() + "*" + nick + "* ");
                        active_chat_input.focus();
                        break
                    case 8:
                        /* backspace */
                        var client = Chat.Resource.Manager.getClient('client_' + playerId);
                        var room = Chat.Resource.Manager.acquireRoom(client);
                        if (room)
                            room.openClick();
                        break
                    default:
                        break
                }
            }
            document['onkeyup'] = null;
            /*smth*/
        };
    };

    EventHandler.listen('chat_init', function () {
        for (var room in  Chat.Resource.Manager.getRooms()) {
            if (room.indexOf('room_town') === 0) {
                $("<p style='left: 50%; position: absolute; top: 44px; margin-left: -305px; color: white; font-weight: bolder; font-size: 18px;'>" + Chat.Resource.Manager.getRooms()[room].topic + "</p>").appendTo("#ui_topbar");
            }
        }
    });
});