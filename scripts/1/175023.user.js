// ==UserScript==
// @name            Chipsets [GW]
// @namespace       http://www.heymexa.ru/
// @description     Облегчает выбор чипсета в синд магазе
// @include         http://www.ganjawars.ru/sshop.php?tshop=chipsets
// @include         http://ganjawars.ru/sshop.php?tshop=chipsets
// @grant           none
// @version         1.0
// @author          W_or_M
// ==/UserScript==

// >(o)__
//  (_~_/ — это талисман защиты от банов! скопируй его себе в скрипт на удачу.
(function () {

    // прозрачность
    // 0 - если подсветка не нужна
    var OPACITY = 0.6;

    var RANKS_INFO = {
        0: {name: 'Private'},
        1: {name: 'Lieutenant'},
        2: {name: 'Captain'},
        3: {name: 'Major'},
        4: {name: 'Colonel'},
        5: {name: 'Brigadier'},
        6: {name: 'Major General'},
        7: {name: 'Lieutenant General'},
        8: {name: 'Colonel General'},
        9: {name: 'Syndicate General'}
    };

    // чипсеты
    var CHIPSETS_INFO = {
        'chip_armour': { rank: 4},
        'chip_armour1': { rank: 1},
        'chip_armour2': { rank: 2},
        'chip_armour3': { rank: 5},
        'chipset_bonus1': { rank: 1},
        'chipset_bonus2': { rank: 1},
        'chipset_bonus3': { rank: 1},
        'chipset_bonus4': { rank: 2},
        'chip_explosives': { rank: 3},
        'chipset_bonus5': { rank: 4},
        'chipset_bonus6': { rank: 7},
        'chipset_bonus7': { rank: 3},
        'chip_attack': { rank: 7}
    };

    /**
     * @class
     * @constructor
     */
    var Chipsets = function () {
        var userId = this.getUserId();
        if (!userId) {
            return;
        }
        this.getUserRank(userId, this.init);
    };

    Chipsets.prototype = {/** @lends Chipsets */

        /**
         * Инициализация
         * @param {number} rank
         */
        init: function (rank) {
            var anchors = document.getElementsByTagName('a');
            for (var i = 0, l = anchors.length; i < l; i++) {
                var cid = /item\.php\?item_id=([\w\d_]+)/.exec(anchors[i].href);
                if (cid) {
                    var chipset = CHIPSETS_INFO[cid[1]];
                    if (chipset) {
                        var img = document.createElement('img'),
                            parent = anchors[i].parentNode;
                        img.src = 'http://images.ganjawars.ru/img/rank'+ chipset.rank +'.gif';
                        img.title = RANKS_INFO[chipset.rank].name;
                        img.style.marginTop = '5px';

                        parent.style.textAlign = 'center';
                        parent.appendChild(document.createElement('br'));
                        parent.appendChild(img);
                        if (chipset.rank > rank && OPACITY > 0) {
                            anchors[i].parentNode.parentNode.style.opacity = OPACITY;
                        }
                    }
                }
            }
        },

        /**
         * Возвращает id персонажа
         * @return {number}
         */
        getUserId: function () {
            var a = document.querySelector('a[href*="info.php"]');
            try {
                return /info\.php\?id=(\d+)/.exec(a.href)[1];
            } catch (e) {
                return false;
            }
        },

        /**
         * @param {number} userId
         * @param {function} callback
         */
        getUserRank: function (userId, callback) {
            var url = 'http://www.ganjawars.ru/info.php?id=' + userId;
            ajaxQuery(url, 'GET', '', true, function (request) {
                    var container = document.createElement('div');
                    container.innerHTML = request.responseText;
                    var imgRank = container.querySelector('img[src*="rank"]');
                    if (imgRank) {
                        try {
                            var rankId = /rank(\d+)\.gif/.exec(imgRank.src)[1];
                            callback(rankId);
                        } catch (e) {
                            console.log('error script init');
                        }
                    } else {
                        console.log('no img rank');
                    }
                },
                function () {
                    console.log('cannot get user rank')
                });
        }
    };

    /**
     * AJAX-запрос
     * @param url
     * @param rmethod
     * @param param
     * @param async
     * @param onsuccess
     * @param onfailure
     */
    function ajaxQuery(url, rmethod, param, async, onsuccess, onfailure) {
        var xmlHttpRequest = new XMLHttpRequest();
        if (async == true) {
            xmlHttpRequest.onreadystatechange = function () {
                if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200 && typeof onsuccess != 'undefined') onsuccess(xmlHttpRequest);
                else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200 && typeof onfailure != 'undefined') onfailure(xmlHttpRequest);
            }
        }
        if (rmethod == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlHttpRequest.open(rmethod, url, async);
        xmlHttpRequest.send(param);
        if (async == false) {
            if (xmlHttpRequest.status == 200 && typeof onsuccess != 'undefined') onsuccess(xmlHttpRequest);
            else if (xmlHttpRequest.status != 200 && typeof onfailure != 'undefined') onfailure(xmlHttpRequest);
        }
    }

    new Chipsets();
})();