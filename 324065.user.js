// ==UserScript==
// @name        KG_SaveGameResult
// @namespace   http://klavogonki.alexzh.ru
// @description Добавляет ссылку на сохранение результатов заезда в JSON формате
// @author      voidmain
// @license     MIT
// @version     1.9
// @include     http://klavogonki.ru/g/*
// @grant       none
// @run-at      document-end
// ==/UserScript==


function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
}



function main() {
    function getGameData() {
        var playersList = angular.element('#players').scope().PlayersList;
        var gameData = {
            'id': game.id,
            'beginTime': game.begintimeServer*1000, 
            'gameInfo': {
                'type': game.params.gametype,
                'levelFrom': game.params.level_from,
                'levelTo': game.params.level_to,
                'timeout': game.params.timeout,
                'isPremiumAbra': game.params.premium_abra == true,
                'isQualification': game.params.qual == 'on',
                'mode': game.params.type,
                'vocInfo': game.params.voc ? {
                    'id': game.params.voc.id,
                    'name': game.params.voc.name,
                    'description': game.params.voc.description,
                    'type': game.params.voc.type,
                    'authorId': game.params.voc.user_id,
                    'public': game.params.voc.public == "public",
                    'rating': game.params.voc.rating,
                    'rows': game.params.voc.rows
                } : null
            },
            'places': game.places,        
            'players': game.players.map(function(p) {
                var playerData = {
                    'result': p.info.finished ? {
                        'isRecord': p.info.user ? (playersList.records[p.info.user.id] !== undefined) : false,
                        'isAchievement': p.info.user ? (playersList.achieves[p.info.user.id] !== undefined) : false,
                        'finishedTime': p.info.finished,
                        'charsTotal': game.params.mode == 'marathon' ? p.info.charsTotal : game.charsTotal,
                        'errorsCount': p.info.errors
                    } : null,
                    'user': p.info.user ? {
                        'id': p.info.user.id,
                        'login': p.info.user.login,
                        'level': p.info.user.level,
                        'registered': p.info.user.registered,
                        'startDate': p.info.user.startdate,
                        'numRaces': p.info.user.num_races,
                        'avgSpeed': p.info.user.avg_speed,
                        'bestSpeed': p.info.user.best_speed,
                        'avgError': p.info.user.avg_error,
                        'totalTime': p.info.user.haul ? p.info.user.haul.total : 0,
                        'qual': p.info.user.qual,
                        'car': {
                            'type': p.info.user.car,
                            'color': p.info.user.color,
                            'tuning': p.info.user.tuning,
                            'aeroUrl': /'(.+?)'/.test(p.info.user.background) ? /'(.+?)'/.exec(p.info.user.background)[1] : null
                        }
                    } : null
                };
                if(playerData.result) {
                    playerData.result.speed = Math.round(playerData.result.charsTotal*60000/(playerData.result.finishedTime - game.begintimeServer*1000));
                    playerData.result.errorsPercent = Math.round(playerData.result.errorsCount*10000/playerData.result.charsTotal)/100;
                }
                
                return playerData;
            }),
            'textInfo': {
                'author': game.textinfo.author || null,
                'name': game.textinfo.name || null,
                'text': game.textinfo.text || null,
                'length': game.textinfo.length
            },
            'exportScriptVersion': '1.9'
        };

        for(var i = gameData.places.length - 1; i >= 0; i--) {
            if(!gameData.players[gameData.places[i]].result) {
                gameData.places.splice(i, 1);
            }
        }
        
        return gameData;
    }

    var $gameResultLink = $$$('<a href="#" title="Сохранить результаты заезда"></a>').appendTo('body').on('click', function() {
        $$$(this).attr( {
            'href': 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(getGameData())),
            'download': 'game_' + game.begintimeServer + '.json'
        });
    });

    $$$('#status .gametype-sign').wrap($gameResultLink);
}

window.addEventListener("load", function() {
    exec(main);
}, false);