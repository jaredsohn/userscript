// ==UserScript==
// @name TWeaker
// @description TWeaker
// @author Vbyec
// @license MIT
// @version 0.1.6
// @nocompat Chrome
// @grant none
// @include http://*.the-west.*/game.php*
// @history		0.1.4 Add Kick-o-matic autoload
// @history		0.1.5 Add English
// @history		0.1.6 Add Items controls and search
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

exec(function() {

    Tweaker = {
        "scriptName": "Tweaker",
        "scriptId": "409876",
        "version": '0.1.4'
    };
    Tweaker.langs = {
        "ru_RU": {
            "TotalDamage": "Урона за бой",
            "LastHit": "Последний выстрел",
            "KillShot": "Скальп",
            "ChangeWith": "смена с"
        },
        "en_US": {
            "TotalDamage": "Total damage",
            "LastHit": "Last hit",
            "KillShot": "Kill shot",
            "ChangeWith": "change with"
        }
    };

    Tweaker.getLang = function() {
        return Tweaker.langs.hasOwnProperty(Tweaker.getLocale()) ? Game.locale : "en_US";
    };
    Tweaker.getLocale = function() {
        return Game.locale;
    };

    var lang = Tweaker.getLang();
    Tweaker.lang = Tweaker.langs[lang];

    //add Auto load Kick-o-matic
    if (localStorage.hasOwnProperty("AutoLoad_Kick-o-matic")) {
        if (localStorage["AutoLoad_Kick-o-matic"]) {
            var MyScript = TheWestApi.register('Kick-o-matic', 'Kick-o-matic', '2.08', '2.09', 'Macabre2077', 'http://userscripts.org/scripts/show/96262');
            MyScript.loadScript('http://Vbyec.ru/96262.user.js');
        }
    } else {
        localStorage.setItem('AutoLoad_Kick-o-matic', 1);
    }

    // local DataBase of items.
    window.Items = {
        room: '',
        add_item: function(id, name) {
            localStorage.setItem("ItemId_" + id, name);
            return true;
        },
        get_name: function(id) {
            return localStorage.getItem("ItemId_" + id);
        },
        search: function(query) {
            localStorage.getItem("Item_count") ? "" : Items.init();
            for (var key in localStorage) {
                if (typeof key === 'string' && key.indexOf('ItemId') === 0) {
                    var index = key.split('_')[1];
                    if (Items.get_name(index).toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                        Items.show_in_chat('item=' + index + " : " + '[item=' + index + ']');
                    }
                }
            }
        },
        check: function() {
            var count = 0;
            for (var i = 0; i < 999999; i++) {
                var item = ItemManager.get(i);
                if (item !== undefined) {
                    count++;
                }
            }
            var prev_count = localStorage.getItem("Item_count") === null ? 0 : localStorage.getItem("Item_count");
            if (prev_count < count) {
                new UserMessage("Похоже появились новые шмотки", UserMessage.HINT).show();
                Items.show_new();
            }
            else {
                Items.show_in_chat('No new items');
            }
        },
        show_new: function() {
            for (var i = 0; i < 999999; i++) {
                var item = ItemManager.get(i);
                if (item !== undefined && Items.get_name(item.item_id) === null) {
                    Items.show_in_chat('item=' + item.item_id + " : " + '[item=' + item.item_id + ']');
                }
            }
        },
        init: function() {
            if (localStorage.getItem("Item_count") === null) {
                Items.add_all();
            }
            else {
                Items.check();
            }
        },
        add_all: function() {
            var count = 0;
            for (var i = 0; i < 999999; i++) {
                var item = ItemManager.get(i);
                if (item !== undefined && Items.get_name(item.item_id) === null) {
                    Items.add_item(item.item_id, item.name);
                    count++;
                }
            }
            if (count > 0) {
                var prev_count = localStorage.getItem("Item_count") === null ? 0 : localStorage.getItem("Item_count");
                localStorage.setItem("Item_count", parseInt(prev_count) + count);
                Items.show_in_chat("Items added:" + count);
            }
            else {
                Items.show_in_chat("No item to add");
            }
        },
        show_in_chat: function(text) {
            Items.room.addMessage(Game.TextHandler.parse(text) + '<br/>');
        }};
    Chat.Operations["^\/items$"] = {
        cmd: "items",
        shorthelp: "Первичная настрока локального хранилища вещей.",
        help: "Первичная настрока локального хранилища вещей, если хранилище уже существует- проверка на появление новых вещей",
        usage: "/Items",
        func: function(room, msg) {
            Items.room = room;
            Items.init();
        }};
    Chat.Operations["^\/items\.s (.+)$"] = {
        cmd: "items.s",
        shorthelp: "Поиск по названию предмета",
        help: "Поиск по части названия предмета. Регистронезависимый.",
        usage: "/items.s часть названия",
        func: function(room, msg, search) {
            Items.room = room;
            Items.search(search[1]);
        }};
    Chat.Operations["^\/items\.add$"] = {
        cmd: "items.add",
        shorthelp: "Добавить новые предметы в локальную базу",
        help: "Добавить все новые предметы в локальную базу, чтобы они не показывали при check",
        usage: "/items.add",
        func: function(room, msg) {
            Items.room = room;
            Items.add_all();
        }};

    FortBattleWindow.showBattleOrigin = FortBattleWindow.showBattle;
    FortBattleWindow.showBattle = function(response) {
        FortBattle.cacheAll(response);
        FortBattleWindow.showBattleOrigin.call(this, response);
    };

// Add players on fort to localStorage
    //rewrite by  while
    //@todo get fort position
    FortBattle.cacheAll = function(resp) {
        Ajax.remoteCallMode('players', 'get_data', {x: Character.position.x, y: Character.position.y, page: 0}, function(data) {
            data.players.forEach(function(player) {
                if (!localStorage.hasOwnProperty("PlayerId_" + player.player_id)) {
                    localStorage.setItem("PlayerId_" + player.player_id, player.name);
                }
            });
            var count = data.pages;
            for (var i = 1; i < count; i++) {
                Ajax.remoteCallMode('players', 'get_data', {x: Character.position.x, y: Character.position.y, page: i}, function(data) {
                    data.players.forEach(function(player) {
                        if (!localStorage.hasOwnProperty("PlayerId_" + player.player_id)) {
                            localStorage.setItem("PlayerId_" + player.player_id, player.name);
                        }
                    });
                });
            }
        });
    };

    // Show advance information about player
    FortBattle.getCharDataSheetOrigin = FortBattle.getCharDataSheet;
    FortBattle.getCharDataSheet = function(data) {
        return FortBattle.getCharDataSheetOrigin(data) + "<br/><div class='total_damage'>" + Tweaker.lang.TotalDamage + ":<strong>%totalDmg%</strong> </div>" +
                "<div class='last_damage'>" + Tweaker.lang.LastHit + ": <strong>%lastDmg%</strong></div>";
    };

    FortBattle.flashShowCharacterInfoOrigin = FortBattle.flashShowCharacterInfo;
    FortBattle.flashShowCharacterInfo = function(fortId, playerId, healthNow, healthMax, totalDmg, lastDmg, shotat, bonusdata, resp) {
        //Kill shot
        lastDmg = lastDmg < 15000 ? lastDmg : Tweaker.lang.KillShot;
        FortBattle.flashShowCharacterInfoOrigin(fortId, playerId, healthNow, healthMax, totalDmg, lastDmg, shotat, bonusdata);
        FortBattle.flashShowCharacterInfoEl(playerId);
    };

    FortBattle.flashShowCharacterInfoEl = function(playerId) {
        if (parseInt(Chat.MyId.split('_')[1]) === playerId)
            return;
        setTimeout(function() {
            document['onkeyup'] = null;
        }, 2500);
        document['onkeyup'] = function(e) {
            e = e || window.event;
            e.preventDefault();
            var active_chat_input = $('input.message:visible');
            var keyCode = e.keyCode ? e.keyCode : e.charCode;
            var nick = localStorage.getItem('PlayerId_' + playerId);
            switch (keyCode) {
                case 16:
                    /* shift */
                    if (!nick)
                        return;
                    active_chat_input.val(active_chat_input.val() + "*" + nick + "* " + Tweaker.lang.ChangeWith + "  ");
                    break
                case 17:
                    /* ctrl */
                    if (!nick)
                        return;
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
            document['onkeyup'] = null;
            /*smth*/
        };
    };

    EventHandler.listen('chat_init', function() {
        for (var room in  Chat.Resource.Manager.getRooms()) {
            if (room.indexOf('room_town') === 0) {
                $("<p style='left: 50%; position: absolute; top: 44px; margin-left: -305px; color: white; font-weight: bolder; font-size: 18px;'>" + Chat.Resource.Manager.getRooms()[room].topic + "</p>").appendTo("#ui_topbar");
            }
        }
    });
})
        ;