// ==UserScript==
// @name            Items Finder
// @namespace       http://www.heymexa.ru/
// @description     Ищет предметы на ДО
// @include         http://ganjawars.ru/*
// @include         http://*.ganjawars.ru/*
// @grant           none
// @version         0.1
// @author          W_or_M
// ==/UserScript==

(function () {
    var itemFinder = {

        /**
         * @constructor
         */
        init: function () {
            if (!document.querySelector) {
                alert('Старая версия браузера.');
                return;
            }
            this.storageKey = 'item-finder';
            this.storage = window.localStorage;

            this._initCSS();
            this._initMenu();
            this._initSetup();
            this._initSearchResults();
            this._initBlacker();
        },

        /**
         * Инициализация blacker
         */
        _initBlacker: function() {
            this.blacker = document.createElement('div');
            this.blacker.className = 'blacker';
            this.blacker.onclick = function() {
                this.blacker.style.display = 'none';
                this.results.style.display = 'none';
                this.setup.style.display = 'none';
            }.bind(this);
            document.body.appendChild(this.blacker);
        },

        /**
         * Инициализация CSS
         * @private
         */
        _initCSS: function () {
            var head = document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                text = '.item-finder-setup { \
                    position: fixed; \
                    width: 600px; \
                    margin-left: -300px; \
                    top: 50%; \
                    left: 50%;\
                    margin-top: -200px;\
                    background: #f5fff5;\
                    display: none;\
                    border: 1px #003300 solid;\
                    z-index: 1000;\
                    }\
                    .item-finder__search-results {\
                        position: fixed; \
                        width: 800px; \
                        margin-left: -400px; \
                        top: 50%; \
                        left: 50%;\
                        margin-top: -200px;\
                        background: #f5fff5;\
                        display: none;\
                        max-height: 400px;\
                        border: 1px #003300 solid;\
                        overflow-y: auto;\
                        overflow-x: hidden;\
                        z-index: 1000;\
                    }\
                    .item-finder__alert {\
                        margin: 20px;\
                    }\
                    .item-finder__itemid {\
                        width: 170px;\
                    }\
                    .item-finder__mods {\
                        width: 120px;\
                    }\
                    .item-finder__durability,\
                    .item-finder__cost{\
                        width: 60px;\
                    }\
                    .item-finder__items-list {\
                        width: 100%;\
                        height: 300px;\
                        border: none;\
                        overflow-y: auto;\
                        overflow-x: hidden;\
                    }\
                    .item-finder__items-title {\
                        padding: 3px;\
                        border-bottom: 1px solid #339933;\
                        color: #990000;\
                        font-weight: bold;\
                        text-align: center;\
                        background: #d0eed0;\
                    }\
                    .item-finder__items-holder {\
                        padding: 10px;\
                    }\
                    \
                    .item-finder-add-item {\
                        \
                    }\
                    .item-finder__table {\
                        border-collapse: collapse;\
                        width: 100%;\
                        overflow: auto;\
                    }\
                    .item-finder__table th {\
                        background: #d0eed0;\
                        border-bottom: 1px solid #003300; \
                        color: #990000; \
                        font-size: 12px; \
                        padding: 3px; \
                        text-align: center; \
                    }\
                    .item-finder__table td {\
                        text-align: center;\
                    }\
                    .item-finder__table tr.colspan th {\
                        font-weight: normal;\
                        border-right: 1px solid #003300;\
                    }\
                    .item-finder__table th.item {\
                        width: 150px;\
                    }\
                    .blacker {\
                        position: fixed;\
                        height: 100%;\
                        width: 100%;\
                        opacity: 0.8;\
                        top: 0;\
                        left: 0;\
                        z-index: 100;\
                        background: #000;\
                        display: none;\
                    }\
                    .item-finder__search-results-close {\
                        float: right;\
                        font-weight: normal;\
                        text-decoration: none;\
                    }\
                    .item-finder__table th.mods {\
                        width: 100px;\
                    .item-finder__table th.dur {\
                        width: 100px;\
                    .item-finder__table th.cost {\
                        width: 100px;\
                    }\
                    ';
            style.type = "text/css";
            style.innerHTML = text;
            head.appendChild(style);
        },

        /**
         * Инициализация меню
         * @private
         */
        _initMenu: function () {
            this.menu = new Menu();
            this.menu.addSeparator();
            this.menu.add('Найти предметы', this.find.bind(this))
            this.menu.add(' <img src="http://images.ganjawars.ru/i/home/properties.gif" title="Настройки" />',
                this.showSetup.bind(this));
        },

        /**
         * Инициализация окна с результами поиска
         * @private
         */
        _initSearchResults: function() {
            var html = '\
                    <table class="item-finder__table">\
                        <thead>\
                            <tr><th colspan="6">Результаты поиска <a href="#" class="item-finder__search-results-close">закрыть</span></th></tr>\
                            <tr class="colspan">\
                                <th class="item">Предмет</th>\
                                <th class="item">Цена</th>\
                                <th class="mods">Прочность</th>\
                                <th class="dur">Мод</th>\
                                <th class="cost">Isl</th>\
                                <th>Владелец</th>\
                            </tr>\
                        </thead>\
                        <tbody class="item-finder__search-results-holder">\
                        </tbody>\
                    </table>\
                ';
            this.results = document.createElement('div');
            this.results.className = 'item-finder__search-results';
            this.results.innerHTML = html;
            this.resultsHolder = this.results.querySelector('.item-finder__search-results-holder');
            this.results.querySelector('.item-finder__search-results-close').onclick = this.closeSearch.bind(this);
            document.body.appendChild(this.results);
        },

        /**
         * Инициализация окна настроек
         * @private
         */
        _initSetup: function () {
            var html = '\
                    <div class="item-finder__items-list">\
                        <table class="item-finder__table">\
                            <thead>\
                                <tr><th colspan="5">Предметы</th></tr>\
                                <tr class="colspan">\
                                    <th class="item">Предмет</th>\
                                    <th class="mods">Моды</th>\
                                    <th class="dur">Прочка</th>\
                                    <th class="cost">Стоимость</th>\
                                    <th></th>\
                                </tr>\
                            </thead>\
                            <tbody class="item-finder__items-holder">\
                            </tbody>\
                        </table>\
                    </div>\
                    <div class="item-finder-controls">\
                        <input type="text" class="item-finder__itemid" title="id предмета" placeholder="id предмета" value="" /> \
                        <input type="text" class="item-finder__mods" title="моды" placeholder="моды" value="" /> \
                        <input type="text" class="item-finder__durability" title="мининимальная прочность" placeholder="мин. прочка" value="" /> \
                        <input type="text" class="item-finder__cost" title="максимальная стоимость" placeholder="макс. стоимость" value="" /> \
                        \
                        <input type="button" class="item-finder-add" value="Добавить" />\
                        <input type="button" class="item-finder-close" value="Закрыть" />\
                    </div>\
                    \
                ';
            this.setup = document.createElement('div');
            this.setup.className = 'item-finder-setup';
            this.setup.innerHTML = html;
            this.setup.querySelector('.item-finder-add').onclick = this.addItem.bind(this);
            this.setup.querySelector('.item-finder-close').onclick = this.close.bind(this);
            this.setupItemsList = this.setup.querySelector('.item-finder__items-holder');
            this.setupItem = {
                id: this.setup.querySelector('.item-finder__itemid'),
                name: this.setup.querySelector('.item-finder__itemid'),
                mods: this.setup.querySelector('.item-finder__mods'),
                dur: this.setup.querySelector('.item-finder__durability'),
                cost: this.setup.querySelector('.item-finder__cost')
            }
            document.body.appendChild(this.setup);
        },

        /**
         * Добавление предмета в список поиска
         */
        addItem: function() {
            var item = this._getSetupItem();
            if (item.id == '') {
                alert('Введите id предмета.')
                this.setupItem.id.focus();
                return;
            }
            ajaxQuery('/item.php?item_id='+ item.id, 'GET', '', true,
                function(xhr) {
                    var div = document.createElement('div');
                    div.innerHTML = xhr.responseText;
                    try {
                        var name = div.querySelector('td.txt b font').textContent.substr(2);
                        item.name = name;
                        this.save(item);
                        this.clearSetupItem();
                        this.print();
                    } catch (e) {};
                }.bind(this)
                ,function() {
                    this.save(item);
                    this.clearSetupItem();
                    this.print();
                }.bind(this));
        },

        /**
         * Выводит список предметов в окне настроек
         */
        print: function() {
            this.setupItemsList.innerHTML = '';
            var items = this.getAllItems();
            items.forEach(function(item, i) {
                this.printItem(item, i);
            }.bind(this));
        },

        /**
         * Добавляет в список предметов
         * @param {Object} item
         * @param {Integer} i
         */
        printItem: function(item, i) {
            var tr = document.createElement('tr'),
                html = '<td class="wb"><b><a href="http://www.ganjawars.ru/item.php?item_id='+ item.id +'" target="_blank">'+ item.name +'</a></b></td> \
                    <td class="wb">'+ item.mods +'</td>\
                    <td class="wb">'+ item.dur +'</td>\
                    <td class="wb">'+ item.cost +'</td>\
                    <td class="wb"><a data-id="'+ i +'" href="#" class="item-finder__delete">удалить</a></td>';
            tr.innerHTML = html;
            tr.querySelector('.item-finder__delete').onclick = this.delete.bind(this);
            this.setupItemsList.appendChild(tr);
        },

        /**
         * Удаляет элемент из списка
         * @param {Event|String} el
         */
        delete: function(el) {
            if (el.currentTarget) {
                el = el.currentTarget.getAttribute('data-id');
            }
            var items = this.getAllItems();
            items.forEach(function(item, i) {
                if (i == el) {
                    items.splice(i, 1);
                }
            }.bind(this));
            this.items = items;
            this.save();
            this.print();
        },

        /**
         * Возвращает массив сохраненный предметов
         * @return {Array}
         */
        getAllItems: function() {
            var items = this.storage.getItem(this.storageKey);
            this.items = items ? JSON.parse(items) : [];
            return this.items;
        },

        /**
         * Сохраняет предмет(-ы)
         * @param {Object} [item]
         */
        save: function(item) {
            if (item) {
                this.items.push(item);
            }
            this.storage.setItem(this.storageKey, JSON.stringify(this.items));
        },

        /**
         * Возвращает свойства нового предмета из настроек добавления
         * @private
         * @return {Object} item
         */
        _getSetupItem: function() {
            var item = {
                id: this.setupItem.id.value,
                name: this.setupItem.id.value,
                mods: this.setupItem.mods.value,
                dur: this.setupItem.dur.value.replace(/[\.\,]/g, '') | 0,
                cost: this.setupItem.cost.value.replace(/[\.\,]/g, '') | 0
            }
            return item;
        },

        /**
         * Очищает поля настроек
         */
        clearSetupItem: function() {
            for (var i in this.setupItem) {
                this.setupItem[i].value = '';
            }
        },

        /**
         * Закрытие окна поиска
         */
        closeSearch: function(e) {
            e.preventDefault();
            this.results.style.display = 'none';
            this.blacker.style.display = 'none';
        },

        /**
         * Закрытие окна настроек
         */
        close: function(e) {
            e.preventDefault();
            this.blacker.style.display = 'none';
            this.setup.style.display = 'none';
        },

        /**
         * ИСКАТЬ!!!!
         */
        find: function (e) {
            e.preventDefault();

            var items = this.getAllItems();
            if (!items.length) {
                alert('Список предметов пуст. Для начала нужно добавить предметы через окно настроек.')
                return;
            }
            this.resultsHolder.innerHTML = '';
            this.results.style.display = 'block';
            this.blacker.style.display = 'block';
            items.forEach(function(item, i) {
                this.searchItem(item);
            }.bind(this));
        },

        /**
         * Ищет предмет и добавляет результат на доску
         * @param {Object} item
         */
        searchItem: function(item) {
            var self = this,
                page = 0;
            var url = '/market.php?stage=2&item_id='+ item.id +'&action_id=1&island=-1';
            var request = function(url) {
                ajaxQuery(url, 'GET', '', true, function(xhr) {
                    var div = document.createElement('div'),
                        elems, pages;
                    div.innerHTML = xhr.responseText;
                    elems = div.querySelectorAll('table.wb tr');
                    pages = div.querySelectorAll('br ~ center b a');
                    if (pages.length > 1 && page < pages.length - 1) {
                        for (var i = 1, l = pages.length; i < l; i++) {
                            request(pages[i].href);
                            ++page;
                        }
                    }

                    for (var i = 3, l = elems.length; i < l; i++) {
                        var td = elems[i].getElementsByTagName('td'),
                            cost = td[0].textContent.replace(/[\$\,]/g,'') | 0,
                            dur = /(\d+)\/(\d+)/.exec(td[1].textContent)[2] | 0,
                            mod = td[2].textContent.replace(/[\[\]]+/g, '');

                        if (mod == '-') continue;
                        if (item.cost > 0 && item.cost < cost) continue;
                        if (item.dur > 0 && item.dur > dur) continue;
                        if (item.mods != '' && item.mods.indexOf(mod) === -1) continue;

                        var itemLink = document.createElement('td');
                        itemLink.innerHTML = self.getItemLink(item);
                        itemLink.className = 'wb';
                        elems[i].insertBefore(itemLink, td[0]);
                        self.resultsHolder.appendChild(elems[i]);

                    }
                })
            }
            request(url)
        },

        /**
         * Возвращает ссылку на предмет
         * @param {object} item
         * @returns {string}
         */
        getItemLink: function(item) {
            return '<b><a href="http://www.ganjawars.ru/item.php?item_id='+ item.id +'">'+ item.name +'</a></b>';
        },

        /**
         * Показывает окно настроек
         */
        showSetup: function (e) {
            e.preventDefault();
            this.print();
            this.setup.querySelector('.item-finder__itemid').value = this.getItemIdByURL();
            this.blacker.style.display = 'block';
            this.setup.style.display = 'block';


        },

        /**
         * Возвращает id предмета, если находимся на странице инфы предмета
         * @returns {string}
         */
        getItemIdByURL: function() {
            try {
                return /(?:\?|\&)item_id=(.*?)(?:\&|$)/.exec(document.location.search)[1];
            } catch (e) {
                return '';
            };
        }
    };

    /**
     * Класс для добавления пунктов в главное в меню
     * @class Menu
     * @constructor
     */
    function Menu() {
        this._getHolder();
    }

    Menu.prototype = {
        /**
         * Получение menu holder
         * @private
         */
        _getHolder: function () {
            var chat = document.querySelector('a[href="http://chat.ganjawars.ru"]');
            this.holder = chat.parentNode;
        },

        /**
         * Добавление пункта меню
         * @param {String} html Html
         * @param {Function} [callback] Callback-функция, сработает при клике по пункту меню
         */
        add: function (html, callback) {
            var el = document.createElement('a');
            el.innerHTML = html;
            el.href = '#';
            el.style.textDecoration = 'none';
            el.onclick = callback;
            this.holder.appendChild(el);
        },
        /**
         * Добавление сепарататора | в меню
         */
        addSeparator: function () {
            var el = document.createTextNode(' | ');
            this.holder.appendChild(el);
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

    itemFinder.init();
})();
