// ==UserScript==
// @name            HWM Map Objects
// @description     Отображение всех объектов в регионе на одной странице. Предпросмотр объектов.
// @version         1.5.2
// @namespace       heroeswm
// @include         http://www.heroeswm.ru/home.php
// @include         http://www.heroeswm.ru/map.php*
// @include         http://www.heroeswm.ru/object-info.php?id=*
// @include         http://www.heroeswm.ru/ecostat_details.php?id=*
// ==/UserScript==



/** Библиотека юникода
*
* Реализует функции работы с юникодом.
* @file lib_unicode.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

function uchar(s) {
    switch (s[0]) {
        case "А": return "\u0410";
        case "Б": return "\u0411";
        case "В": return "\u0412";
        case "Г": return "\u0413";
        case "Д": return "\u0414";
        case "Е": return "\u0415";
        case "Ж": return "\u0416";
        case "З": return "\u0417";
        case "И": return "\u0418";
        case "Й": return "\u0419";
        case "К": return "\u041a";
        case "Л": return "\u041b";
        case "М": return "\u041c";
        case "Н": return "\u041d";
        case "О": return "\u041e";
        case "П": return "\u041f";
        case "Р": return "\u0420";
        case "С": return "\u0421";
        case "Т": return "\u0422";
        case "У": return "\u0423";
        case "Ф": return "\u0424";
        case "Х": return "\u0425";
        case "Ц": return "\u0426";
        case "Ч": return "\u0427";
        case "Ш": return "\u0428";
        case "Щ": return "\u0429";
        case "Ъ": return "\u042a";
        case "Ы": return "\u042b";
        case "Ь": return "\u042c";
        case "Э": return "\u042d";
        case "Ю": return "\u042e";
        case "Я": return "\u042f";
        case "а": return "\u0430";
        case "б": return "\u0431";
        case "в": return "\u0432";
        case "г": return "\u0433";
        case "д": return "\u0434";
        case "е": return "\u0435";
        case "ж": return "\u0436";
        case "з": return "\u0437";
        case "и": return "\u0438";
        case "й": return "\u0439";
        case "к": return "\u043a";
        case "л": return "\u043b";
        case "м": return "\u043c";
        case "н": return "\u043d";
        case "о": return "\u043e";
        case "п": return "\u043f";
        case "р": return "\u0440";
        case "с": return "\u0441";
        case "т": return "\u0442";
        case "у": return "\u0443";
        case "ф": return "\u0444";
        case "х": return "\u0445";
        case "ц": return "\u0446";
        case "ч": return "\u0447";
        case "ш": return "\u0448";
        case "щ": return "\u0449";
        case "ъ": return "\u044a";
        case "ы": return "\u044b";
        case "ь": return "\u044c";
        case "э": return "\u044d";
        case "ю": return "\u044e";
        case "я": return "\u044f";
        case "Ё": return "\u0401";
        case "ё": return "\u0451";
        default: return s[0];
    }
}

function ustring(s) {
    s = String(s);
    var result = "";
    for (var i = 0; i < s.length; i++)
        result += uchar(s[i]);
    return result;
}




/** Библиотека событий
*
* Реализует кроссбраузерный механизм работы с событиями.
* @file lib_event.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Событие
* 
* Реализация кроссбраузерного механизма работы с событиями.
* @link http://javascript.ru/tutorial/events/crossbrowser
*/
Event = (function() {
    var guid = 0;
        
    function fixEvent(event) {
        event = event || window.event;
        
        if (event.isFixed)
            return event;
        event.isFixed = true;
        
        event.preventDefault = event.preventDefault || function() {this.returnValue = false;};
        event.stopPropagation = event.stopPropagaton || function() {this.cancelBubble = true;};
        
        if (!event.target)
            event.target = event.srcElement;
        
        if (!event.relatedTarget && event.fromElement)
            event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
        
        if (event.pageX == null && event.clientX != null) {
            var html = document.documentElement, body = document.body;
            event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
            event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
        }
        
        if (!event.which && event.button)
            event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
        
        return event
    }    
    
    /* Вызывается в контексте элемента всегда this = element */
    function commonHandle(event) {
        event = fixEvent(event);
        
        var handlers = this.events[event.type];
        for (var g in handlers) {
            var handler = handlers[g];
            var ret = handler.call(this, event);
            if (ret === false) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
    
    return {
        add: function(elem, type, handler) {
            if (elem.setInterval && (elem != window && !elem.frameElement)) {
                elem = window;
            }
            
            if (!handler.guid) {
                handler.guid = ++guid;
            }
            
            if (!elem.events) {
                elem.events = {};
		elem.handle = function(event) {
		    if (typeof Event !== "undefined") {
			return commonHandle.call(elem, event)
		    }
                }
            }
	    
            if (!elem.events[type]) {
                elem.events[type] = {}                
            
                if (elem.addEventListener)
		    elem.addEventListener(type, elem.handle, false)
		else if (elem.attachEvent)
                    elem.attachEvent("on" + type, elem.handle)
            }
            
            elem.events[type][handler.guid] = handler
        },
        
        remove: function(elem, type, handler) {
            var handlers = elem.events && elem.events[type]
            
            if (!handlers) return
            
            delete handlers[handler.guid]
            
            for(var any in handlers) return 
	    if (elem.removeEventListener)
		elem.removeEventListener(type, elem.handle, false)
	    else if (elem.detachEvent)
		elem.detachEvent("on" + type, elem.handle)
		
	    delete elem.events[type]
	
	    
	    for (var any in elem.events) return
	    try {
	        delete elem.handle
	        delete elem.events 
	    } catch(e) { // IE
	        elem.removeAttribute("handle")
	        elem.removeAttribute("events")
	    }
        } 
    }
}())




/** Библиотека смещений
*
* Реализует механизм смещений.
* @file lib_offset.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem);
    } else {
        return getOffsetSum(elem);
    }
}


function setOffset(elem, offset, base) {
    var coords = getOffset(base);
    elem.style.top = coords.top + offset.top;
    elem.style.left = coords.left + offset.left;
}


function getOffsetSum(elem) {
    var top=0, left=0;
    while(elem) {
        top = top + parseInt(elem.offsetTop);
        left = left + parseInt(elem.offsetLeft);
        elem = elem.offsetParent;
    }
    return {
        top: top, 
        left: left
    };
}


function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return {
        top: Math.round(top), 
        left: Math.round(left) 
    };
}




/** Библиотека наследования
*
* Реализует механизм наследования.
* @file lib_extend.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

Function.prototype.extends = function(parent) {
    var Inheritance = function(){};
    Inheritance.prototype = parent.prototype;
    this.prototype = new Inheritance();
    this.prototype.constructor = this;
    this.prototype.parent = parent;
    this.parent = parent;
}




/** 
* @file page.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Страница
* @param Document doc 
* @param Game game
* @link http://heroeswm.ru/*
*/
function Page(doc, game) {

    this.doc = doc;
    this.game = game;

    this.nodes = {
        balance: null,
        time: null,
        online: null,
        buttons: null
    };

    this.state = 0;
    this.time = new Date();
    this.online = null;
    this.hero = null;
    this.heroHP = null;
    this.heroMP = null;
    this.heroMPMax = null;
    if (this.game !== undefined)
        this.hero = new Hero(this.game);
        
    this.groupJoinHunt = false;

    this.reloadSender = null;
    this.reloadTime = null;
    this.reloadDelay = null;
    this.reloadReason = null;
    this.reloadTimer = null;
    
}

/** Урезание страницы
* @return Boolean Результат
*/
Page.prototype.truncate = function() {
    
    try {
    
        // Удаляем верхний колонтитул
        var xpath = "/html/body/table";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node === null)
            throw new Error(ustring("Не могу найти верхний колонтитул для урезания"));
        delete node.parentNode.removeChild(node);
        
        // Удаляем пользовательские ссылки
        var xpath = "/html/body/center/center";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node === null)
            throw new Error(ustring("Не могу найти пользовательские ссылки для урезания"));
        delete node.parentNode.removeChild(node);
    
    } catch (e) {
        
        GM_log(this + "\n" + (new Date()).toLocaleTimeString() + "\n" + e);
        return false;
    
    }
    
    return true;
    
}

/** Парсинг страницы
* @return Boolean Результат
*/
Page.prototype.parse = function() {

    if ((this.doc.body === null) || (this.doc.body.textContent === "")) {
        GM_log(
            this + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            ustring("Тело документа отсутствует") + "\n" +
            this.doc.location.href
        );
        this.state = -1;
        return false;
    }
    
    if (this.parseGameStopped()) {
        GM_log(
            this + "\n" + 
            (new Date()).toLocaleTimeString() + "\n" +
            ustring("Игра остановлена")
        );
        this.state = 2;
        return false;
    }
    
    if (this.parseQRATOR500()) {
        GM_log(
            this + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            "QRATOR HTTP 500"
        );
        this.state = 3;
        return false;
    }

    if (this.parseQRATOR503()) {
        GM_log(
            this + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            "QRATOR HTTP 503"
        );
        this.state = 3;
        return false;
    }

    if (this.parseLogin()) {
        GM_log(
            this + "\n" + 
            (new Date()).toLocaleTimeString() + "\n" +
            ustring("Вы не авторизированы")
        );
        this.state = 4;
        return false;
    }
    
    if (this.parseBattle()) {
        GM_log(
            this + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            ustring("Герой находится в битве")
        );
        this.state = 5;
        return false;
    }
    
    if (this.parseCardGame()) {
        GM_log(
            this + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            ustring("Герой находится за карточным столом")
        );
        this.state = 6;
        return false;
    }
    
    if (this.parseTravel()) {
        GM_log(
            this + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            ustring("Герой путешествует")
        );
        this.state = 7;
        return false;
    }
    
    if (this.parseBattleFinished()) {
        GM_log(
            this + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            ustring("Страница обращается к уже законченной битве")
        );
        this.state = 8;
        return false;
    }
    
    try {

        if (!this.parseHP())
            throw new Error(ustring("Ошибка распознавания здоровья"));
        
        if (!this.parseMP())
            throw new Error(ustring("Ошибка распознавания маны"));
            
        if (!this.parseBalance())
            throw new Error(ustring("Ошибка распознавания баланса"));
        
        if (!this.parseTime())
            throw new Error(ustring("Ошибка распознавания времени"));
        
        if (!this.parseOnline())
            throw new Error(ustring("Ошибка распознавания онлайна"));
    
        if (!this.parseButtons())
            throw new Error(ustring("Ошибка распознавания кнопок"));
    
    } catch (e) {
    
        GM_log(
            this + "\n" + 
            (new Date()).toLocaleTimeString() + "\n" +
            e + "\n" + 
            this.doc.location.href
        );
        this.state = -1;
        return false;
    
    }
    
    this.state = 1;
    return true;
    
}

/** Проверяет адрес текущего документа
* @param String addr Адрес для сравнения
* @return Boolean Результат
* 
* Пример: 
*     if (page.parseURLAddr("http://www.heroeswm.ru/home.php") === true) {
*         \\ Do something
*     }
*/
Page.prototype.parseURLAddr = function(addr) {
    pattern = "^" + addr.replace("/", "\\/").replace(".", "\\.");
    var re = new RegExp(pattern, "i");
    if (re.test(this.doc.location.href))
        return true;
    return false;
}

/** Проверяет параметр текущего документа
* @param String namePattern Шаблон имени параметра
* @param String valuePattern Шаблон значения параметра
* @param String type Тип параметра
* @return Object Значение параметра
* 
* Пример: 
*     if (page.parseURLParam("id", "\d+", "Number") === true) {
*         \\ Do something
*     }
*/
Page.prototype.parseURLParam = function(namePattern, valuePattern, type) {
    pattern = "(\\?|&)" + namePattern + "=(" + valuePattern + ")(&|$)";
    var re = new RegExp(pattern, "ig");
    var matches = re.exec(this.doc.location.href);
    if (matches !== null)
        switch (type) {
            case "Number": return Number(matches[2]);
            case "Boolean": return Boolean(matches[2]);
            case "String": return String(matches[2]);
            default: return matches[2];
        }
    return null;
}

/** Парсит страницу на предмет сообщения об остановленной игре
* @return Boolean Резльтат
*/
Page.prototype.parseGameStopped = function() {
    var re = new RegExp("Извините, страница недоступна\. Игра остановлена\.");
    if (re.test(this.doc.body.innerHTML))
        return true;
    return false;
}

/** Парсит страницу на предмет сообщения QRATOR HTTP 500
* @return Boolean Резльтат
*/
Page.prototype.parseQRATOR500 = function() {
    var re = new RegExp("QRATOR HTTP 500");
    if (re.test(this.doc.body.innerHTML))
        return true;
    return false;
}

/** Парсит страницу на предмет сообщения QRATOR HTTP 503
* @return Boolean Резльтат
*/
Page.prototype.parseQRATOR503 = function() {
    var re = new RegExp("QRATOR HTTP 503");
    if (re.test(this.doc.body.innerHTML))
        return true;
    return false;
}

/** Парсит страницу на предмет отсутствия авторизации
* @return Boolean Резльтат
*/
Page.prototype.parseLogin = function() {
    var re = /^http:\/\/www\.heroeswm\.ru\/$/;
    if (re.test(this.doc.location.href))
        return true;
    return false;
}

/** Парсит страницу на предмет битвы
* @return Boolean Резльтат
*/
Page.prototype.parseBattle = function() {
    var re = /^http:\/\/www\.heroeswm\.ru\/war\.php\?warid\=(\d+)/;
    if (re.test(this.doc.location.href))
        return true;
    return false;
}

/** Парсит страницу на предмет карточной игры
* @return Boolean Резльтат
*/
Page.prototype.parseCardGame = function() {
    var re = /^http:\/\/www\.heroeswm\.ru\/war\.php\?cgame\=(\d+)/;
    if (re.test(this.doc.location.href))
        return true;
    return false;
}

/** Парсит страницу на предмет путешествия
* @return Boolean Резльтат
*/
Page.prototype.parseTravel = function() {
    var xpath = "/html/body/center/table/tbody/tr/td/center";
    var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
    var node = xpathRes.iterateNext();
    if (node === null)
        return false;
    var re = new RegExp(ustring("Во время пути Вам доступны"));
    if (re.test(node.textContent))
        return true;
    return false;
}

/** Парсит страницу на предмет завершенной битвы
* @return Boolean Резльтат
*/
Page.prototype.parseBattleFinished = function() {
    var re = /^http:\/\/www\.heroeswm\.ru\/war\.php/;
    if (re.test(this.doc.location.href))
        return true;
    return false;
}

/** Парсинг баланса героя
*/
Page.prototype.parseBalance = function() {

    try {
    
        var xpath = "/html/body/table/tbody/tr/td/table/tbody/tr/td[6]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node == null) throw new Error(ustring("Узел по пути '" + xpath + "' не найден"));
        this.nodes.balance = node;
        
        if (this.game !== undefined) {
            this.hero.balance = Price.fromNode(this.game, this.nodes.balance);
            this.hero.loadBalance();
        }
    
    } catch (e) {
    
        GM_log(
            this + ".parseBalance" + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            e
        );
        return false;
    
    }
    
    return true;
    
}

/** Парсинг времени
*/
Page.prototype.parseTime = function() {

    try {
    
        var xpath = "/html/body/table/tbody/tr/td/table/tbody/tr/td[9]/table/tbody/tr/td";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node == null) throw new Error(ustring("Узел по пути '" + xpath + "' не найден"));
        this.nodes.time = node;
        
        var matches = /(\d+):(\d+)/g.exec(this.nodes.time.textContent);
        if (matches !== null)
            this.time.setHours(matches[1], matches[2]);
        
        
    } catch (e) {
    
        GM_log(
            this + ".parseTime" + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            e
        );
        return false;
    
    }
    
    return true;

}

/** Парсинг онлайна
*/
Page.prototype.parseOnline = function() {

    try {
    
        var xpath = "/html/body/table/tbody/tr/td/table/tbody/tr/td[9]/table/tbody/tr/td";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node == null) throw new Error(ustring("Узел по пути '" + xpath + "' не найден"));
        this.nodes.online = node;
        
        var matches = /(\d+):(\d+),\s*(\d+)\s*online/g.exec(this.nodes.online.textContent);
        if (matches !== null)
            this.online = Number(matches[3]);
        
    } catch (e) {
    
        GM_log(
            this + ".parseOnline" + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            e
        );
        return false;
    
    }
    
    return true;

}


/** Парсинг HP
*/
Page.prototype.parseHP = function() {
    
    try {
        
        var xpath = '//*[@id="heart"]';
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node == null) throw new Error(ustring("Узел по пути '" + xpath + "' не найден"));
        
        //GM_log(node.innerHTML);
        var params = node.getElementsByTagName("PARAM");
        for (var i = 0; i < params.length; i++) {
            var value = params[i].getAttribute("value");
            // <param value="param=100|900|100|Evernight|" name="FlashVars">
            var matches = /param=(\d+(\.\d+)?)\|\d+\|\d+\|.+\|/ig.exec(value);
            if (matches === null)
                continue;
            //GM_log(matches[1]);
            this.heroHP = Number(matches[1]);
            if (this.hero !== null)
                this.hero.hp = this.heroHP;
            break;
        }

        if (this.heroHP == null)
            throw new Error(ustring("Значение не найдено"));
        
        this.nodes.hp = node;
        
    } catch (e) {
    
        GM_log(
            this + ".parseHP" + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            e
        );
        return false;
        
    }
    
    return true;
    
}


/** Парсинг MP
*/
Page.prototype.parseMP = function() {
    
    try {
        
        var xpath = '//*[@id="mana"]';
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node == null) throw new Error(ustring("Узел по пути '" + xpath + "' не найден"));
        
        //GM_log(node.innerHTML);
        var params = node.getElementsByTagName("PARAM");
        for (var i = 0; i < params.length; i++) {
            var value = params[i].getAttribute("value");
            // <param value="param=100|9000|0||" name="FlashVars">
            var matches = /param=(\d+(\.\d+)?)\|\d+\|(\d+)\|.*\|/ig.exec(value);
            if (matches === null)
                continue;
            //GM_log(matches[1] + ", " + matches[2] + ", " + matches[3]);
            this.heroMP = Number(matches[1]);
            this.heroMPMax = Number(matches[3]);
            if (this.hero !== null) {
                this.hero.mp = this.heroMP;
                this.hero.mpMax = this.heroMPMax;
            }
            break;
        }

        if (this.heroMP == null)
            throw new Error(ustring("Значение не найдено"));
        
        this.nodes.mp = node;
        
    } catch (e) {
    
        GM_log(
            this + ".parseMP" + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            e
        );
        return false;
        
    }
    
    return true;
    
}


/** Парсинг кнопок
*
* Кнопки "Персонаж", "Битвы" и т.д. вверху каждой страницы.
*/
Page.prototype.parseButtons = function() {
    
    try {
        
        var xpath = "/html/body/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td[4]/table";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node == null) throw new Error(ustring("Узел по пути '" + xpath + "' не найден"));
        
        var cellHunt = node.rows[0].cells[4];
        var refs = cellHunt.getElementsByTagName("A");
        for (var i = 0; i < refs.length; i++)
            if (Page.isGroupWarsHuntURL(refs[i].href))
                this.groupJoinHunt = true;
        
        this.nodes.buttons = node;
        
    } catch (e) {
    
        GM_log(
            this + ".parseButtons" + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            e
        );
        return false;
    
    }
    
    return true;
    
}

/** Задание времени обновления
*/
Page.prototype.setReloadTime = function(sender, time, reason) {

    var delay = time.getTime() - (new Date()).getTime();
    this.setReloadDelay(sender, delay, reason);

}

/** Задание задержки перед обновлением
*/
Page.prototype.setReloadDelay = function(sender, delay, reason) {

    if (reason === undefined)
        reason = "Неизвестно";

    var reloadTime = new Date((new Date()).getTime() + delay);
    
    if (
        (this.reloadTime != null) && 
        (this.reloadTime < reloadTime)
    ) {
        // К этому моменту страница уже будет перезагружена
        return false;
    }

    // Удаляем старый таймер перезагрузки
    if (this.reloadTimer != null)
        this.unsetReload();

    // Устанавливаем новый таймер перезагрузки
    var page = this;
    this.reloadSender = sender;
    this.reloadTime = reloadTime;
    this.reloadDelay = delay;
    this.reloadReason = ustring(reason);
    this.reloadTimer = setTimeout(function() {page.reloadFunction();}, delay);

}

/** Отмена обновления
*/
Page.prototype.unsetReload = function() {

    clearTimeout(this.reloadTimer);
    this.reloadSender = null; 
    this.reloadTime = null;
    this.reloadDelay = null;
    this.reloadReason = null; 
    this.reloadTimer = null;

}

/** Функция обновления
*/
Page.prototype.reloadFunction = function reloadFunction() {
    if (this.doc.location === null) {
        // Do nothing
    } else {
        this.doc.location.reload(true);
    }
}

/** Задание баланса героя
*
* Изменение отображаемых 7 ресурсов сверху на любой странице.
* @param Price balance Баланс
*/
Page.prototype.setBalance = function(balance) {

    Price.updateNode(balance, this.nodes.balance);
    if (this.hero !== null)
        this.hero.balance = balance;

}

/** Представление в строке
*/
Page.prototype.toString = function() {
    return "Page(" + this.doc.location.href + ")";
}

/** Парсинг URL игрока
*
* http://www.heroeswm.ru/pl_info.php?id=2861211
* @param String url
* @return Object|null
*/
Page.parsePlayerURL = function(url) {
    var matches = url.match(/^http:\/\/www\.heroeswm\.ru\/pl_info\.php\?id=(\d+)/);
    if (matches === null)
        return null;
    return {id: matches[1]};
}

// http://www.heroeswm.ru/war.php?warid=33037391
Page.isBattleURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/war\.php/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/cgame.php?gameid=33037391
Page.isCardGameURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/cgame\.php/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/group_join.php?wrid=15692877
Page.isBattleGroupJoinURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/group\_join\.php/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/
Page.isLoginURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/$/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/home.php
Page.isHomeURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/home\.php/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/group_wars.php
Page.isGroupWarsURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/group_wars\.php/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/group_wars.php?filter=hunt
Page.isGroupWarsHuntURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/group_wars\.php\?filter=hunt/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/warlog.php?warid=334352419
Page.isBattleLogURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/war\.php/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/object-info.php?id=51
Page.isObjectInfoURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/object-info\.php/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/object_do.php*
Page.isObjectDoURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/object_do\.php/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/ecostat_details.php?id=9
Page.isEcostatDetailsURL = function(url) {
    var re = /http:\/\/www\.heroeswm\.ru\/ecostat_details\.php/;
    if (re.test(url))
        return true;
    return false;
}

// http://www.heroeswm.ru/pl_info.php?id=2861211
Page.isPlayerInfoURL = function(url) {
    var re = /^http:\/\/www\.heroeswm\.ru\/pl_info\.php/;
    if (re.test(url))
        return true;
    return false;
}





/** 
* @file page_map.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Страница карты
* @param Document doc
* @param Game game
* @link http://www.heroeswm.ru/map.php
*/
function PageMap(doc, game) {

    this.constructor.parent.prototype.constructor.apply(this, arguments);
    
    this.region = null;
    this.regionName = null;
    this.divisions = null;
    
    this.nodes.content = null;
    this.nodes.map = null;
    this.nodes.region = null;
    this.nodes.divisions = null;
    this.nodes.hunt = null;
    this.nodes.contest = null;
    this.nodes.mercenary = null;
    this.nodes.objects = null;
    this.nodes.houses = null;

}


PageMap.extends(Page);


PageMap.prototype.parse = function() {

    // Парсим как страницу вообще
    if (!this.constructor.parent.prototype.parse.apply(this, arguments))
        return false;

    try {
    
        if (!this.parseContent())
            throw new Error(ustring("Ошибка распознавания содержимого"));
    
    } catch (e) {
    
        GM_log(
            this + "\n" + 
            (new Date()).toLocaleTimeString() + "\n" +
            e + "\n" + 
            this.doc.location.href
        );
        this.state = -1;
        return false;
    
    }
    
    this.state = 1;
    return true;
    
}


PageMap.prototype.parseContent = function() {
    var xpath = "/html/body/center/table/tbody/tr/td/table";
    var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
    var table = xpathRes.iterateNext();
    if (table === null)
        return false;
        
    // left
    var cell = table.rows[0].cells[0];
    
    if (!this.parseMap(cell))
        return false;

    // right
    var cell = table.rows[0].cells[1];
    
    if (!this.parseRegion(cell))
        return false;

    if (!this.parseDivisions(cell))
        return false;
        
    if (!this.parseObjects(cell))
        return false;
        
    this.parseHunt(cell);
    this.parseContest(cell);
        
    this.nodes.content = table;
    return true;
}


PageMap.prototype.parseMap = function(cell) {
    try {
    
        this.nodes.map = cell.getElementsByTagName("object")[0];
        return true;
    
    } catch (e) {
        
        GM_log(this + ".parseMap" + "\n" + e);
        return false;
    
    }
}


/** Парсинг района
*/
PageMap.prototype.parseRegion = function(cell) {
    try {
    
        var node = cell.firstChild;
        var re = new RegExp(ustring("Район"));
        if (!re.test(node.textContent))
            return false;
        
        var a = node.nextSibling.firstChild;
        var name = a.textContent;
        this.regionName = ustring(name.replace(/^\s*/g, "").replace(/\s*$/g, ""));
        if (this.game !== undefined) {
            
            this.region = this.game.getRegionByName(this.regionName);
            
        }
        
        this.nodes.region = node;
        return true;
    
    } catch (e) {
        
        GM_log(this + ".parseRegion" + "\n" + e);
        return false;
    
    }
}


PageMap.prototype.parseDivisions = function(cell) {
    try {
    
        // map.php?cx=49&cy=49&st=mn
        var hrefs = cell.getElementsByTagName("a");
        var divisions = [];
        for (var i = 0; i < hrefs.length; i++) {
            var re = /map\.php\?cx=(\d+)\&cy=(\d+)\&st=(\w+)/;
            var matches = re.exec(hrefs[i].href);
            if (matches === null)
                continue;
        
            divisions[divisions.length] = {
                node: hrefs[i],
                href: hrefs[i].href,
                x: matches[1],
                y: matches[2],
                type: matches[3],
                current: false
            };
        }
        if (divisions.length === 0)
            throw new Error(ustring("Ни одна ссылка не найдена"));
            
        for (var i = 0; i < divisions.length; i++)
            if (divisions[i].node.getElementsByTagName("b").length > 0) {
                divisions[i].current = true;
                break;
            }
        
        this.divisions = divisions;
        this.nodes.divisions = divisions[0].node.previousSibling;
        return true;
    
    } catch (e) {
        
        GM_log(this + ".parseRegion" + "\n" + e);
        return false;
    
    }
}

PageMap.prototype.parseObjects = function(cell) {
    try {
    
        var tables = cell.getElementsByTagName("table");
        for (var i = 0; i < tables.length; i++) 
            try {
                var re = new RegExp(ustring("Тип"));
                if (!re.test(tables[i].rows[0].cells[0].innerHTML))
                    continue;
                var table = tables[i];
                break;
            } catch (e) {
                // Do nothing
            }
        if (table === undefined)
            throw new Error(ustring("Таблица не найдена"));
        
        this.nodes.objects = table;
        return true;
    
    } catch (e) {
        
        GM_log(this + ".parseObjects" + "\n" + e);
        return false;
    
    }
}


PageMap.prototype.parseHunt = function(cell) {
    // map.php?action=attack
    // Напасть
    try {
    
        var tables = cell.getElementsByTagName("table");
        for (var i = 0; i < table.length; i++) 
            try {
                var re = new RegExp(ustring("Напасть"));
                if (!re.test(tables[i].rows[1].cells[0].innerHTML))
                    continue;
                var table = tables[i];
                break;
            } catch (e) {
                // Do nothing
            }
        if (table === undefined)
            throw new Error(ustring("Таблица не найдена"));
        
        this.nodes.hunt = table;
        return true;
    
    } catch (e) {
        
        //GM_log(this + ".parseHunt" + "\n" + e);
        return false;
    
    }
}


PageMap.prototype.parseContest = function(cell) {
    try {
    
        var tables = cell.getElementsByTagName("table");
        for (var i = 0; i < table.length; i++) 
            try {
                var re = new RegExp(ustring("Площадка состязаний"));
                if (!re.test(tables[i].rows[0].cells[0].innerHTML))
                    continue;
                var table = tables[i];
                break;
            } catch (e) {
                // Do nothing
            }
        if (table === undefined)
            throw new Error(ustring("Таблица не найдена"));
        
        this.nodes.contest = table;
        return true;
    
    } catch (e) {
        
        //GM_log(this + ".parseContest" + "\n" + e);
        return false;
    
    }
}


PageMap.prototype.toString = function() {
    return "PageMap(" + this.regionName + ")";
}


PageMap.prototype.currentDivision = function() {
    if (this.divisions === null)
        return null;
    
    for (var i = 0; i < this.divisions.length; i++)
        if (this.divisions[i].current)
            return this.divisions[i];
    
    return null;
}





/** 
* @file page_object_info.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Страница информации об объекте
* @param Document doc
* @param Game game
* @link http://www.heroeswm.ru/object-info.php?id=*
*/
function PageObjectInfo(doc, game) {

    this.constructor.parent.prototype.constructor.apply(this, arguments);
    
    this.object = null;
    this.objectId = null;
    this.objectType = null;
    this.objectHasCaptcha = null;
    this.objectResume = null;
    this.objectBalance = null;
    this.objectPayment = null;
    this.objectRegion = null;
    this.objectPlacesBusy = null;
    this.objectPlacesFree = null;
    if (this.game !== undefined)
        this.object = new Object(this.game);

    this.nodes.content = null;
    this.nodes.objectData = null;
    this.nodes.objectType = null;
    this.nodes.objectRegion = null;
    this.nodes.objectBalance = null;
    this.nodes.objectPayment = null;
    this.nodes.objectChangeTime = null;
    this.nodes.placesBusy = null;
    this.nodes.placesFree = null;
    this.nodes.objectOffersSell = null;
    this.nodes.objectOffersBuy = null;
    this.nodes.objectCaptcha = null;
    this.nodes.objectResume = null;
    this.nodes.mercenary = null;

}

PageObjectInfo.extends(Page);

PageObjectInfo.prototype.truncate = function() {

    if (!this.constructor.parent.prototype.truncate.apply(this, arguments))
        return false;

    if (!this.truncateContent())
        return false;
        
    return true;
    
}

PageObjectInfo.prototype.truncateContent = function() {

    try {
    
        // Удаляем верхний колонтитул содержимого
        var node = this.nodes.content.firstChild;
        for (var i = 0; i < 2; i++) {
            var nextNode = node.nextSibling;
            delete node.parentNode.removeChild(node);
            node = nextNode;
        }
        
        if (
            (this.nodes.objectResume !== null) || (this.nodes.objectCaptcha !== null)
        ) {
        
            // Удаляем нижний колонтитул содержимого
            var node = this.nodes.content.lastChild;
            for (var i = 0; i < 10; i++) {
                var nextNode = node.previousSibling;
                delete node.parentNode.removeChild(node);
                node = nextNode;
            }
        
        }
        
        // Удаляем район
        var node = this.nodes.objectRegion;
        while (node.tagName != "BR") {
            node = node.nextSibling;
            delete node.parentNode.removeChild(node.previousSibling);
        }
        delete node.parentNode.removeChild(node);
        
        if (this.nodes.objectBalance !== null) {
        
            // Удаляем отступ перед балансом
            var node = this.nodes.objectBalance.previousSibling;
            delete node.parentNode.removeChild(node);

            // Удаляем площадь
            var node = this.nodes.objectBalance.nextSibling;
            while (node.tagName != "TABLE") {
                node = node.nextSibling;
                delete node.parentNode.removeChild(node.previousSibling);
            }
            
        }

        // Добавляем общее количество мест
        var busy = this.objectPlacesBusy;
        var free = this.objectPlacesFree;
        if ((busy !== null) && (free !== null)) {
            var text = ustring("Рабочие места: " + busy + "/" + (busy + free));
            var node = this.nodes.objectData.rows[0].cells[0];
            node.appendChild(page.doc.createElement("BR"));
            node.appendChild(page.doc.createTextNode(text));
        }
        
        if (this.nodes.placesBusy !== null) {

            // Удаляем количество мест
            var node = this.nodes.placesBusy;
            while (node.tagName != "BR") {
                node = node.nextSibling;
                delete node.parentNode.removeChild(node.previousSibling);
            }
            
        }

        if (this.nodes.placesFree !== null) {
        
            // Удаляем количество свободных мест
            var node = this.nodes.placesFree;
            while (node.tagName != "BR") {
                node = node.nextSibling;
                delete node.parentNode.removeChild(node.previousSibling);
            }
        
        }
        
        // Удаляем двойные переносы строки
        var brs = this.nodes.content.getElementsByTagName("BR");
        for (var i = 0; i < brs.length; i++) {
            if (brs[i].previousSibling !== null)
                if (brs[i].previousSibling.tagName == "TABLE") {
                    brs[i].parentNode.removeChild(brs[i]);
                    continue;
                }
            if (brs[i].nextSibling !== null)
                if (brs[i].nextSibling.tagName == "BR") {
                    brs[i].parentNode.removeChild(brs[i]);
                    continue;
                }
        }
        
        // Урезаем ширину таблиц
        var node = this.nodes.content;
        while (node !== null) {
            if (node.tagName == "TABLE")
                node.removeAttribute("width");
            node = node.parentNode;
        }
        
        // Добавляем рамку картинке
        var imgs = this.nodes.objectData.rows[0].cells[1].getElementsByTagName("IMG");
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.borderStyle = "solid";
            imgs[i].style.borderWidth = "1px";
            imgs[i].style.borderColor = "#999999";
        }
        
    } catch (e) {
    
        GM_log(this + ".truncateContent" + "\n" + e);
        return false;
    
    }
    
    return true;

}

/** Парсинг страницы
*/
PageObjectInfo.prototype.parse = function() {
    
    // Парсим как страницу вообще
    if (!this.constructor.parent.prototype.parse.apply(this, arguments))
        return false;

    try {
    
        if (!this.parseURL())
            throw new Error(ustring("Ошибка распознавания URL"));
            
        if (!this.parseContent())
            throw new Error(ustring("Ошибка распознавания содержимого"));
        
    } catch (e) {
    
        GM_log(
            this + "\n" + 
            (new Date()).toLocaleTimeString() + "\n" +
            e + "\n" + 
            this.doc.location.href
        );
        this.state = -1;
        return false;
    
    }
    
    this.state = 1;
    return true;
    
}

/** Парсинг адреса
*/
PageObjectInfo.prototype.parseURL = function() {
    if (!this.parseURLAddr("http://www.heroeswm.ru/object-info.php"))
        return false;
    
    this.objectId = this.parseURLParam("id", "\\d+", "Number");
    if (this.objectId === null)
        return false;
    
    if (this.game !== undefined) {
        this.object = game.getObjectById(this.objectId);
        this.object.removeOffers();
    }
    
    return true;
}

/** Парсинг содержимого
*/
PageObjectInfo.prototype.parseContent = function() {
    
    try {
    
        var xpath = "/html/body/center/table/tbody/tr/td/table/tbody/tr/td";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        this.nodes.content = xpathRes.iterateNext();
        if (this.nodes.content === null)
            return false;
        
        var nodes = this.nodes.content.childNodes;
        for (var i = 0; i < nodes.length; i++) {

            if (this.nodes.mercenary === null)
                if (this.parseMercenary(nodes[i]))
                    continue;

            if (this.nodes.objectData === null)
                if (this.parseData(nodes[i]))
                    continue;
                    
            if (this.nodes.placesBusy === null)
                if (this.parsePlacesBusy(nodes[i]))
                    continue;

            if (this.nodes.placesFree === null)
                if (this.parsePlacesFree(nodes[i]))
                    continue;

            if (this.nodes.objectOffersSell === null)
                if (this.parseObjectOffersSell(nodes[i]))
                    continue;

            if (this.nodes.objectOffersBuy === null)
                if (this.parseObjectOffersBuy(nodes[i]))
                    continue;
                
            if (this.nodes.objectResume === null)
                if (this.parseObjectResume(nodes[i]))
                    continue;
                    
            if (this.nodes.objectCaptcha === null)
                if (this.parseObjectCaptcha(nodes[i]))
                    continue;
                    
        }

        if (this.nodes.objectType === null)
            throw new Error(
                ustring("Не найден элемент с указанием типа объекта") + "\n" +
                this.doc.body.innerHTML
            );
            
        return true;
        
    } catch (e) {
    
        GM_log(this + ".parseContent" + "\n" + e)
        return false;
        
    }
    
}

/** Парсинг данных
*/
PageObjectInfo.prototype.parseData = function(node) {
    try {

        if (node.tagName !== "TABLE")
            return false;
        
        var nodes = node.rows[0].cells[0].childNodes;
        for (var i = 0; i < nodes.length; i++) {
            
            if (this.nodes.objectType === null)
                if (this.parseObjectType(nodes[i]))
                    continue;
            
            if (this.nodes.objectRegion === null)
                if (this.parseObjectRegion(nodes[i]))
                    continue;
            
            if (this.nodes.objectBalance === null)
                if (this.parseObjectBalance(nodes[i]))
                    continue;
                    
            if (this.nodes.objectPayment === null)
                if (this.parseObjectPayment(nodes[i]))
                    continue;

            if (this.nodes.objectChangeTime === null)
                if (this.parseObjectChangeTime(nodes[i]))
                    continue;

        }

        if (this.nodes.objectType === null)
            throw new Error(ustring("Не найден элемент с указанием типа объекта"));
            
        this.nodes.objectData = node;
        return true;
        
    } catch (e) {
    
        GM_log(this + ".parseData" + "\n" + e)
        return false;
        
    }
}

/** парсинг задания гильдии наемников
*/
PageObjectInfo.prototype.parseMercenary = function(table) {
    /*
        <tbody><tr><td><center><b>Задание от <a href="mercenary_guild.php">гильдии наемников</a></b></center><br>&nbsp;<a href="/object-info.php?action=accept_merc_task5" onclick="javascript: return (confirm('Вы уверены?'));">Приступить к выполнению задания</a></td></tr></tbody>
    */
    try {
        
        if (table.tagName != "TABLE")
            return false;
            
        var refs = table.getElementsByTagName("A");
        if (!/mercenary_guild\.php/.test(refs[0].href))
            return false;
            
        this.nodes.mercenary = table;
        return true;
    
    } catch (e) {
        
        //GM_log(this + ".parseMercenary" + "\n" + e);
        return false;
    
    }
}

PageObjectInfo.prototype.parseObjectType = function(node) {
    if (node.nodeType !== 3)
        return false;
    var re = new RegExp(ustring("Тип: (.+)"));
    var matches = re.exec(node.textContent);
    if (matches === null)
        return false;
    this.nodes.objectType = node;
    this.objectType = matches[1];
    if (this.game !== undefined)
        this.object.type = this.objectType;
    return true;
}

PageObjectInfo.prototype.parseObjectRegion = function(node) {
    if (node.nodeType !== 3)
        return false;
    var re = new RegExp(ustring("Район:"));
    var matches = re.exec(node.textContent);
    if (matches === null)
        return false;
    var re = /map\.php\?cx=(\d+)&cy=(\d+)/;
    var matches = re.exec(node.nextSibling.href);
    if (matches === null)
        return false;
    this.nodes.objectRegion = node;
    var str =  node.nextSibling.firstChild.textContent;
    str = str.substr(0, str.length - 1);
    this.objectRegion = str;
    if (this.game !== undefined)
        this.object.region = this.game.getRegionByXY(matches[1], matches[2]);
    return true;
}

PageObjectInfo.prototype.parseObjectBalance = function(node) {
    if (node.tagName !== "TABLE")
        return false;
    var re = new RegExp(ustring("Баланс:"));
    var matches = re.exec(node.rows[0].cells[0].textContent);
    if (matches === null)
        return false;
    this.nodes.objectBalance = node;
    var cell = node.rows[0].cells[1].getElementsByTagName("table")[0].rows[0].cells[1];
    this.objectBalance = Number(cell.firstChild.textContent.replace(/\D/g, ""));
    if (this.game !== undefined)
        this.object.balance = Price.fromNode(this.game, node.rows[0].cells[1]);
    return true;
}

PageObjectInfo.prototype.parseObjectPayment = function(node) {
    if (node.tagName !== "TABLE")
        return false;
    var re = new RegExp(ustring("Зарплата:"));
    var matches = re.exec(node.rows[0].cells[0].textContent);
    if (matches === null)
        return false;
    this.nodes.objectPayment = node;
    var cell = node.rows[0].cells[1].getElementsByTagName("table")[0].rows[0].cells[1];
    this.objectPayment = Number(cell.firstChild.textContent.replace(/\D/g, ""));
    if (this.game !== undefined)
        this.object.payment = Price.fromNode(this.game, node.rows[0].cells[1]);
    return true;
}

PageObjectInfo.prototype.parseObjectChangeTime = function(node) {
    if (node.nodeType !== 3)
        return false;
    var re = new RegExp(ustring("Окончание смены"));
    if (!re.test(node.textContent)) 
        return false;
    var matches = /(\d+):(\d+)/g.exec(node.textContent);
    if (matches === null)
        return false;
    this.nodes.objectChangeTime = node;
    if (this.game !== undefined) {
        this.object.changeTime = new Date();
        this.object.changeTime.setHours(matches[1], matches[2], 0);
        // Если идет смена суток
        if ((Number(matches[1]) === 0) && ((new Date()).getHours() === 23))
            this.object.changeTime = new Date(this.object.changeTime.getTime() + 1000 * 60 * 60 * 24);
    }
    return true;
}

PageObjectInfo.prototype.parseObjectOffersSell = function(node) {
    if (node.tagName !== "B")
        return false;
    var re = new RegExp(ustring("Произведено:"));
    var matches = re.exec(node.firstChild.textContent);
    if (matches === null)
        return false;
    this.nodes.objectOffersSell = node;
    if (this.game !== undefined) {
        var table = node.nextSibling.nextSibling;
        for (var i = 1; i < table.rows.length; i++) {
            var row = table.rows[i];
            var offer = this.object.appendOffer(
                new ObjectOfferSell(this.object)
            );
            offer.row = row;
            offer.item = this.game.getItemByTitle(row.cells[0].textContent);
            offer.count = Number(row.cells[2].textContent.match(/\d+/)[0]);
            offer.price = Price.fromNode(this.game, row.cells[3]);
            forms = table.getElementsByTagName("form");
            if (forms.length > 0)
                offer.form = forms[0];
        }
    }
    return true;
}

PageObjectInfo.prototype.parseObjectOffersBuy = function(node) {
    if (node.tagName !== "B")
        return false;
    var re = new RegExp(ustring("Для производства требуется:"));
    var matches = re.exec(node.firstChild.textContent);
    if (matches === null)
        return false;
    this.nodes.objectOffersBuy = node;
    if (this.game !== undefined) {
        var table = node.nextSibling;
        for (var i = 2; i < table.rows.length; i++) {
            try {
                var row = table.rows[i];
                var item = this.game.getItemByTitle(row.cells[0].textContent);
                var offer = this.object.appendOffer(
                    new ObjectOfferBuy(this.object)
                );
                offer.row = row;
                offer.item = item;
                offer.rate = Number(row.cells[1].textContent.match(/\d+/)[0]);
                var matches = /(\d+(\.\d+)?)\s*\/\s*(\d+)/g.exec(row.cells[3].textContent);
                offer.count = Math.floor(Number(matches[3]) - Number(matches[1]));
                offer.countHero = Number(row.cells[5].textContent.match(/\d+/)[0]);
                offer.price = Price.fromNode(this.game, row.cells[2]);
                forms = row.getElementsByTagName("form");
                if (forms.length > 0)
                    offer.form = forms[0];
            } catch (e) {
                // do nothing
            }
        }
    }
    return true;
}

PageObjectInfo.prototype.parsePlacesBusy = function(node) {
    if (node.nodeType !== 3)
        return false;
    var re = new RegExp(ustring("Список рабочих"));
    if (!re.test(node.textContent)) 
        return false;
    var matches = /\s+\((\d+)\):\s+/g.exec(node.textContent);
    if (matches === null)
        return false;
    this.nodes.placesBusy = node;
    this.objectPlacesBusy = Number(matches[1]);
    if (this.game !== undefined)
        this.object.placesBusy = this.objectPlacesBusy;
    return true;
}

PageObjectInfo.prototype.parsePlacesFree = function(node) {
    if (node.nodeType !== 3)
        return false;
    var re = new RegExp(ustring("Свободных мест"));
    if (!re.test(node.textContent)) 
        return false;
    this.nodes.placesFree = node;
    this.objectPlacesFree = Number(node.nextSibling.textContent);
    if (this.game !== undefined)
        this.object.placesFree = this.objectPlacesFree;
    return true;
}

PageObjectInfo.prototype.parseObjectResume = function(node) {
    if (node.nodeType !== 3)
        return false;
    var nextNode = node.nextSibling;
    if ((nextNode == null) || (nextNode.tagName != "BR")) 
        return false;
    nextNode = nextNode.nextSibling;
    if ((nextNode == null) || (nextNode.tagName != "BR")) 
        return false;
    nextNode = nextNode.nextSibling;
    if ((nextNode == null) || (nextNode.tagName != "BR")) 
        return false;
    this.nodes.objectResume = node;
    this.objectResume = node.textContent;
    return true;
}

PageObjectInfo.prototype.parseObjectCaptcha = function(node) {
    if (node.tagName !== "FORM")
        return false;
    var re = new RegExp(ustring("Устройство на работу"));
    var table = node.getElementsByTagName("table")[0];
    var matches = re.exec(table.rows[0].cells[0].textContent);
    if (matches === null)
        return false;
    this.nodes.objectCaptcha = node;
    return true;
}

PageObjectInfo.prototype.deal = function(offer, count) {
    if (offer.isActive() == false)
        return false;
    
    offer.changeCount(count);
    offer.form.elements.namedItem("count").value = count;
    offer.form.submit();
    
    if (offer instanceof ObjectOfferBuy)
        this.hero.changeItemCountById(offer.item.id, -count);
    if (offer instanceof ObjectOfferSell)
        this.hero.changeItemCountById(offer.item.id, count);
    this.unsetReload();
    return true;
}

PageObjectInfo.prototype.checkRegion = function() {
    var re = new RegExp(ustring("Вы находитесь в другом секторе"));
    if (re.test(this.objectResume))
        return false;
    return true;
}

PageObjectInfo.prototype.objectPlacesTotal = function(def) {
    if ((this.objectPlacesBusy !== null) && (this.objectPlacesFree !== null)) 
        return this.objectPlacesBusy + this.objectPlacesFree;
    if (this.objectPlacesBusy !== null)
        return this.objectPlacesBusy;
    if (this.objectPlacesFree !== null)
        return this.objectPlacesFree;
    return def;
}

PageObjectInfo.prototype.toString = function() {
    return "PageObjectInfo(" + this.objectId + ", " + this.objectType + ")";
}





/** 
* @file page_ecostat_details.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Страница детальной экономической статистики
* @param Document doc 
* @param Game game
* @link http://www.heroeswm.ru/ecostat_details.php?id=*
*/
function PageEcostatDetails(doc, game) {

    this.constructor.parent.prototype.constructor.apply(this, arguments);
    
    this.item = null;
    this.itemId = null;
    
    this.nodes.content = null;
    this.nodes.tableSell = null;
    this.nodes.tableBuy = null;

}

PageEcostatDetails.extends(Page);

PageEcostatDetails.prototype.truncate = function() {
    
    if (!this.constructor.parent.prototype.truncate.apply(this, arguments))
        return false;

    if (!this.truncateContent())
        return false;
        
    return true;
    
}

PageEcostatDetails.prototype.truncateContent = function() {

    try {
    
        // Do something
        
    } catch (e) {
    
        GM_log(this + ".truncateContent" + "\n" + e);
        return false;
    
    }
    
    return true;

}

PageEcostatDetails.prototype.parse = function() {

    if (!this.constructor.parent.prototype.parse.apply(this, arguments))
        return false;

    try {
    
        if (!this.parseURL())
            throw new Error(ustring("Ошибка распознавания URL"));
            
        try {
        
            if (!this.parseContent())
                throw new Error(ustring("Ошибка распознавания содержимого"));
        
        } catch (e) {
        
            if (this.parseWrongCaptcha()) {
                this.state = 10 + 1;
                return true;
            }

            if (this.parseAcceptedCaptcha()) {
                this.state = 10 + 2;
                return true;
            }
            
            throw e;
        
        }
    
    } catch (e) {
    
        GM_log(this + ".parse" + "\n" + e);
        this.state = -1;
        return false;
    
    }
    
    this.state = 1;
    return true;
    
}

PageEcostatDetails.prototype.parseURL = function() {
    var matches = /\?id=(\d+)/.exec(this.doc.location.href);
    if (matches === null)
        return false;
    this.itemId = Number(matches[1]);
    if (this.game !== undefined)
        this.item = game.getItemById(this.itemId);
    return true;
}

PageEcostatDetails.prototype.parseContent = function() {
    
    try {
    
        var xpath = "/html/body/center/table";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node === null)
            return false;
        
        if (!this.parseTableSell())
            return false;

        if (!this.parseTableBuy())
            return false;
            
        this.nodes.content = node;
        return true;
        
    } catch (e) {
    
        GM_log(this + ".parseContent" + "\n" + e)
        return false;
        
    }
    
}

PageEcostatDetails.prototype.parseTableSell = function() {

    try {
    
        var xpath = "/html/body/center/table/tbody/tr/td/table/tbody/tr/td";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node === null)
            return false;
        
        var re = new RegExp(ustring("Продажа"));
        if (!re.test(node.firstChild.textContent))
            return false;
            
        this.nodes.tableSell = node.getElementsByTagName("table")[0];
        return true;
        
    } catch (e) {
    
        GM_log(this + ".parseTableSell" + "\n" + e)
        return false;
        
    }

}

PageEcostatDetails.prototype.parseTableBuy = function() {

    try {
    
        var xpath = "/html/body/center/table/tbody/tr/td/table/tbody/tr/td[2]";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node === null)
            return false;
        
        var re = new RegExp(ustring("Скупка"));
        if (!re.test(node.firstChild.textContent))
            return false;
            
        this.nodes.tableBuy = node.getElementsByTagName("table")[0];
        return true;
        
    } catch (e) {
    
        GM_log(this + ".parseTableSell" + "\n" + e)
        return false;
        
    }

}

PageEcostatDetails.prototype.toString = function() {
    return "PageEcostatDetails(" + this.itemId + ")";
}





/** 
* @file ui_conf.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Интерфейс конфигурации скрипта
* @param Document doc
*/
function UIConf(doc) {

    this.doc = doc;
    
    // this.node
    this.node = this.doc.createElement("div");
    this.node.style.display = "block";
    this.node.style.position = "fixed";
    this.node.style.backgroundColor = "#ffffff";
    this.node.style.borderStyle = "solid";
    this.node.style.borderWidth = "1px";
    this.node.style.borderColor = "#999999";
    this.node.style.width = "auto";
    this.node.style.height = "auto";
    this.node.style.margin = "0px";
    this.node.style.padding = "25px";
    
    this.nodeTitle = this.doc.createElement("div");
    this.nodeTitle.style.margin = "0px";
    this.nodeTitle.style.marginBottom = "10px";
    this.nodeTitle.style.padding = "0px";
    this.nodeTitle.style.fontSize = "18px";
    this.nodeTitle.style.color = "#000000";
    this.nodeTitle.style.textAlign = "center";

    this.nodeControls = this.doc.createElement("div");
    this.nodeControls.style.margin = "0px";
    this.nodeControls.style.padding = "0px";
    
    this.node.appendChild(this.nodeTitle);
    this.node.appendChild(this.nodeControls);
    this.doc.body.appendChild(this.node);
    
    // this.nodeAbout
    this.nodeAbout = this.doc.createElement("div");
    this.nodeAbout.style.display = "block";
    this.nodeAbout.style.position = "fixed";
    this.nodeAbout.style.backgroundColor = "#ffffff";
    this.nodeAbout.style.borderStyle = "solid";
    this.nodeAbout.style.borderWidth = "1px";
    this.nodeAbout.style.borderColor = "#999999";
    this.nodeAbout.style.margin = "0px";
    this.nodeAbout.style.padding = "10px";
    this.nodeAbout.style.width = "auto";
    this.nodeAbout.style.height = "auto";

    this.nodeAboutTitle = this.doc.createElement("div");
    this.nodeAboutTitle.style.margin = "0px";
    this.nodeAboutTitle.style.marginBottom = "10px";
    this.nodeAboutTitle.style.padding = "0px";
    this.nodeAboutTitle.style.fontSize = "18px";
    this.nodeAboutTitle.style.color = "#000000";
    this.nodeAboutTitle.style.textAlign = "center";
    this.nodeAboutTitle.textControls = ustring("О программе");

    this.nodeAboutContent = this.doc.createElement("div");
    this.nodeAboutContent.style.margin = "10px";
    this.nodeAboutContent.style.padding = "0px";
    this.nodeAboutContent.style.fontSize = "12px";
    this.nodeAboutContent.style.color = "#000000";
    this.nodeAboutContent.style.width = "320px";
    this.nodeAboutContent.style.height = "240px";
    this.nodeAboutContent.style.maxHeight = "480px";
    this.nodeAboutContent.style.overflow = "auto";
    
    this.nodeAboutControls = this.doc.createElement("div");
    this.nodeAboutControls.style.margin = "0px";
    this.nodeAboutControls.style.padding = "0px";
    
    this.nodeAbout.appendChild(this.nodeAboutTitle);
    this.nodeAbout.appendChild(this.nodeAboutContent);
    this.nodeAbout.appendChild(this.nodeAboutControls);
    this.node.appendChild(this.nodeAbout);
    
    this.setTitle("Конфигурация");
    this.hide();
    this.hideAbout();
    
    var ui = this;
    ui.appendButton("О программе", function() {ui.showAbout();});
    ui.appendAboutButton("Закрыть", function() {ui.hideAbout();});
    ui.appendButton("Закрыть меню", function() {ui.hide();});
    
}

UIConf.prototype.toString = function() {
    return "UIConf(" + this.doc.location.href + ")";
}

UIConf.prototype.show = function() {
    this.node.style.display = "block";
    this.node.style.top = "120px";
    this.node.style.left = (this.doc.documentElement.clientWidth - this.node.clientWidth) / 2;
}

UIConf.prototype.hide = function() {
    this.node.style.display = "none";
}

UIConf.prototype.showAbout = function() {
    this.nodeAbout.style.display = "block";
    this.nodeAbout.style.top = "240px";
    this.nodeAbout.style.left = (this.doc.documentElement.clientWidth - this.nodeAbout.clientWidth) / 2;
}

UIConf.prototype.hideAbout = function() {
    this.nodeAbout.style.display = "none";
}

UIConf.prototype.createButton = function(title, handler) {
    var button = this.doc.createElement("input");
    button.style.display = "block";
    button.style.margin = "5px";
    button.style.marginLeft = "auto";
    button.style.marginRight = "auto";
    button.style.padding = "1px";
    button.style.paddingLeft = "5px";
    button.style.paddingRight = "5px";
    button.style.borderStyle = "solid";
    button.style.borderWidth = "1px";
    button.style.borderColor = "#999999";
    button.style.fontSize = "12px";
    button.style.cursor = "pointer";
    button.type = "button";
    button.value = ustring(title);
    if (handler !== undefined)
        Event.add(button, "click", handler);
    return button;
}

UIConf.prototype.createGreaseMonkeyOption = function(name, def, title, desc) {
    
    var node = this.doc.createElement("block");
    node.style.display = "block";
    node.style.backgroundColor = "transparent";
    node.style.margin = "5px";
    node.style.marginLeft = "auto";
    node.style.marginRight = "auto";
    node.style.padding = "1px";
    
    var p = this.doc.createElement("p");
    p.style.display = "block";
    p.style.textAlign = "center";
    p.style.fontSize = "12px";
    p.style.margin = "0px";
    p.style.padding = "0px";
    p.style.color = "#000000";
    p.style.fontWeight = "bold";

    var edit = this.doc.createElement("input");
    edit.style.display = "inline";
    edit.style.margin = "2px";
    edit.style.padding = "1px";
    edit.style.paddingLeft = "5px";
    edit.style.paddingRight = "5px";
    edit.style.borderStyle = "solid";
    edit.style.borderWidth = "1px";
    edit.style.borderColor = "#999999";
    edit.style.fontSize = "12px";
    edit.style.width = "120px";
    
    var button = this.doc.createElement("input");
    button.style.display = "inline";
    button.style.margin = "2px";
    button.style.padding = "1px";
    button.style.paddingLeft = "5px";
    button.style.paddingRight = "5px";
    button.style.borderStyle = "solid";
    button.style.borderWidth = "1px";
    button.style.borderColor = "#999999";
    button.style.fontSize = "12px";
    button.style.cursor = "pointer";
    button.style.width = "80px";

    node.appendChild(p);
    node.appendChild(edit);
    node.appendChild(button);
    
    p.textContent = ustring(name);
    if (title !== undefined)
        p.textContent = ustring(title);
    if (desc !== undefined)
        node.title = ustring(desc);
    edit.type = "text";
    edit.value = GM_getValue(name, def);
    button.type = "button";
    button.value = ustring("Изменить");
    Event.add(button, "click", function() {GM_setValue(name, edit.value);});
    
    return node;
}

UIConf.prototype.createGreaseMonkeyBoolOption = function(name, def, title, desc) {
    
    var node = this.doc.createElement("block");
    node.style.display = "block";
    node.style.backgroundColor = "transparent";
    node.style.margin = "5px";
    node.style.marginLeft = "auto";
    node.style.marginRight = "auto";
    node.style.padding = "1px";
    
    var p = this.doc.createElement("p");
    p.style.display = "block";
    p.style.textAlign = "center";
    p.style.fontSize = "12px";
    p.style.margin = "0px";
    p.style.padding = "0px";
    p.style.color = "#000000";
    p.style.fontWeight = "bold";

    var edit = this.doc.createElement("input");
    edit.style.display = "inline";
    edit.style.margin = "2px";
    edit.style.padding = "1px";
    edit.style.paddingLeft = "5px";
    edit.style.paddingRight = "5px";
    edit.style.borderStyle = "none";
    edit.style.backgroundColor = "transparent";
    edit.style.fontSize = "12px";
    edit.style.fontWeight = "bold";
    edit.style.textAlign = "center";
    edit.style.width = "120px";
    
    var button = this.doc.createElement("input");
    button.style.display = "inline";
    button.style.margin = "2px";
    button.style.padding = "1px";
    button.style.paddingLeft = "5px";
    button.style.paddingRight = "5px";
    button.style.borderStyle = "solid";
    button.style.borderWidth = "1px";
    button.style.borderColor = "#999999";
    button.style.fontSize = "12px";
    button.style.cursor = "pointer";
    button.style.width = "80px";

    node.appendChild(p);
    node.appendChild(edit);
    node.appendChild(button);
    
    value = Boolean(GM_getValue(name, Boolean(def)));
    p.textContent = ustring(name);
    if (title !== undefined)
        p.textContent = ustring(title);
    if (desc !== undefined)
        node.title = ustring(desc);
    edit.type = "text";
    edit.value = value;
    edit.disabled = true;
    button.type = "button";
    button.value = ustring("Изменить");
    Event.add(
        button, 
        "click", 
        function() {
            value = !value;
            edit.disabled = false;
            edit.value = value;
            edit.disabled = true;
            GM_setValue(name, value);
        }
    );
    
    return node;
}

UIConf.prototype.appendButton = function(title, handler) {
    var button = this.createButton(title, handler);
    button.style.width = "95%";
    this.nodeControls.appendChild(button);
    return button;
}

UIConf.prototype.appendGMOption = function(name, def, title, desc) {
    var option = this.createGreaseMonkeyOption(name, def, title, desc);
    this.nodeControls.appendChild(option);
    return option;
}

UIConf.prototype.appendGMBoolOption = function(name, def, title, desc) {
    var option = this.createGreaseMonkeyBoolOption(name, def, title, desc);
    this.nodeControls.appendChild(option);
    return option;
}

UIConf.prototype.insertButton = function(title, handler, position) {
    if (position === undefined)
        position = 0;
    var button = this.createButton(title, handler);
    button.style.width = "95%";
    this.nodeControls.insertBefore(button, this.nodeControls.childNodes[position]);
    return button;
}

UIConf.prototype.insertGMOption = function(name, def, title, desc, position) {
    if (position === undefined)
        position = 0;
    var option = this.createGreaseMonkeyOption(name, def, title, desc);
    this.nodeControls.insertBefore(option, this.nodeControls.childNodes[position]);
    return option;
}

UIConf.prototype.insertGMBoolOption = function(name, def, title, desc, position) {
    if (position === undefined)
        position = 0;
    var option = this.createGreaseMonkeyBoolOption(name, def, title, desc);
    this.nodeControls.insertBefore(option, this.nodeControls.childNodes[position]);
    return option;
}

UIConf.prototype.appendAboutButton = function(title, handler) {
    var button = this.createButton(title, handler);
    button.style.width = "120px";
    this.nodeAboutControls.appendChild(button);
    return button;
}

UIConf.prototype.insertAboutButton = function(title, handler, position) {
    if (position === undefined)
        position = 0;
    var button = this.createButton(title, handler);
    button.style.width = "120px";
    this.nodeAboutControls.insertBefore(button, this.nodeAboutControls.childNodes[position]);
    return button;
}

UIConf.prototype.setTitle = function(title) {
    this.nodeTitle.textContent = ustring(title);
}

UIConf.prototype.setAbout = function(text) {
    this.nodeAboutContent.innerHTML = ustring(text);
}





/** 
* @file ui_object_preview.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Интерфейс предпросмотра объекта
* @param String ref
* @param Boolean autoclose
*/
function UIObjectPreview(ref, autoclose) {

    function togglePreview(refNode, objectId) {

        function previewIsVisible(block) {
            if (block.style.display == "none")
                return false;
            return true;
        }
        
        function previewSetOffset(block, refNode) {
            var divContent = block.childNodes[1];
            if (divContent.childNodes.length > 1)
                setOffset(block, {left: 5, top: 15}, refNode);
            else
                setOffset(block, {left: -1, top: refNode.parentNode.clientHeight}, refNode.parentNode);
        }
        
        function previewShow(block) {
            if (autoclose) {
                var nodes = container.childNodes;
                for (var i = 0; i < nodes.length; i++)
                    nodes[i].style.display = "none";
            }
            block.style.display = "block";
        }
        
        function previewHide(block) {
            block.style.display = "none";
        }
        
        function previewCreate(refNode, objectId) {
            
            function onFrameLoad(frameDoc, block, refNode) {
                var divCtrls = block.childNodes[0];
                var divContent = block.childNodes[1];
            
                var page = new PageObjectInfo(frameDoc);
                page.parse();
                
                if (page.state === 1) {
                
                    page.truncateContent();
                    
                    var contentNode = ref.ownerDocument.importNode(page.nodes.content, true);
                    contentNode.style.backgroundColor = "#ffffff";
                    contentNode.style.width = "640px";
                    
                    divCtrls.style.display = "block";
                    divContent.appendChild(contentNode);
                    delete divContent.removeChild(divContent.firstChild);
                    delete divContent.removeChild(divContent.firstChild);
                    
                    if (previewIsVisible(block)) {
                        previewHide(block);
                        previewSetOffset(block, refNode);
                        previewShow(block);
                    }
                
                } else {
                
                    divCtrls.style.display = "none";
                    divContent.childNodes[0].textContent = ustring("Ошибка.");
                    divContent.childNodes[0].style.display = "block";
                    divContent.childNodes[1].style.display = "none";
                
                }
                
            }
            
            function createPopup(target) {
                var result = ref.ownerDocument.createElement("div");
                result.style.display = "block";
                result.style.position = "absolute";
                return container.appendChild(result);
            }
            
            function createCtrlRefresh() {
                var result = ref.ownerDocument.createElement("i");
                result.style.cursor = "pointer";
                result.style.marginRight = "10px";
                result.textContent = ustring("Обновить");
                Event.add(
                    result, "click", 
                    function() {
                        delete block.parentNode.removeChild(block);
                        togglePreview(refNode, objectId);
                    }
                );
                return result;
            }
            
            function createCtrlClose() {
                var result = ref.ownerDocument.createElement("i");
                result.style.cursor = "pointer";
                result.textContent = ustring("Закрыть");
                Event.add(
                    result, "click", 
                    function() {
                        togglePreview(refNode, objectId);
                    }
                );
                return result;
            }
            
            var block = createPopup(refNode);
            block.id = "popup_object_id_" + objectId;
            block.style.borderStyle = "solid";
            block.style.borderWidth = "1px";
            block.style.borderColor = "#666666";
            block.style.backgroundColor = "#ffffff";
            block.style.overflow = "auto";
            block.style.display = "none";
            
            var divCtrls = ref.ownerDocument.createElement("div");
            divCtrls.style.display = "none";
            divCtrls.style.padding = "2px";
            divCtrls.style.textAlign = "right";
            divCtrls.appendChild(createCtrlRefresh());
            divCtrls.appendChild(createCtrlClose());
        
            var divContent = ref.ownerDocument.createElement("div");
            divContent.style.padding = "5px";
            
            var p = ref.ownerDocument.createElement("p");
            p.style.margin = "0pt";
            p.style.padding = "0pt";
            p.style.paddingLeft = "10px";
            p.style.paddingRight = "10px";
            p.textContent = ustring("Загрузка...");
            
            var iframe = ref.ownerDocument.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = "http://www.heroeswm.ru/object-info.php?id=" + objectId;
            
            divContent.appendChild(p);
            divContent.appendChild(iframe);
        
            block.appendChild(divCtrls);
            block.appendChild(divContent);
            
            Event.add(
                iframe, "load", 
                function() {
                    setTimeout(
                        function() {onFrameLoad(iframe.contentDocument, block, refNode);},
                        0.1 * 1000
                    )
                }
            );
            
            togglePreview(refNode, objectId);
        }
    
        var id = "popup_object_id_" + objectId;
        var block = ref.ownerDocument.getElementById(id);
        
        if (block) {
            if (previewIsVisible(block)) {
                previewHide(block);
            } else {
                previewSetOffset(block, refNode);
                previewShow(block);
            }
        } else {
            previewCreate(refNode, objectId);
        }
        
    }
    
    
    function attachPreview(refNode, objectId) {
        Event.add(refNode, "click", function() {togglePreview(refNode, objectId);});
    }
    
    
    if (autoclose === undefined)
        autoclose = true;
    
    
    var container = ref.ownerDocument.getElementById("object_preview");
    if (container === null) {
        container = ref.ownerDocument.createElement("div");
        container.id = "object_preview";
        ref.ownerDocument.body.appendChild(container);
    }

    
    var re = /http:\/\/www\.heroeswm\.ru\/object-info\.php\?id=(\d+)/ig;
    var matches = re.exec(ref.href);
    if (matches !== null) {

        if (ref.style.textDecoration != "none") {

            ref.style.textDecoration = "none";
            var sup = ref.ownerDocument.createElement("sup");
            sup.style.cursor = "pointer";
            sup.title = ustring("Предпросмотр");
            var img = ref.ownerDocument.createElement("img");
            img.src = "http://im.heroeswm.ru/i/top/line/pismo.gif";
            sup.appendChild(img);
            ref.parentNode.insertBefore(sup, ref.nextSibling);
            var objectId = Number(matches[1]);
            attachPreview(sup, objectId);

        }
    
    }
    
}



var enableSort = GM_getValue("enableSort", true);
var enablePreview = GM_getValue("enablePreview", true);
var enableEcostat = GM_getValue("enableEcostat", true);
var enableAutoclose = GM_getValue("enableAutoclose", true);
var showChangeTime = GM_getValue("showChangeTime", true);
var showBalance = GM_getValue("showBalance", true);
var showRegion = GM_getValue("showRegion", true);


function getChangeTime(page, objectId) {
    var minutes = Number(GM_getValue("object_" + objectId + "_change_time_minutes", -1));
    var hours = Number(GM_getValue("object_" + objectId + "_change_time_hours", -1));
    if ((minutes < 0) || (hours < 0))
        return "";
    if (page.time.getHours() !== hours)
        hours = page.time.getHours();
    if ((page.time.getHours() == hours) && (page.time.getMinutes() > minutes)) 
        hours++;
    if (hours === 24)
        hours = 0;
    hours = String(hours);
    minutes = String(minutes);
    if (hours.length < 2)
        hours = "0" + hours;
    if (minutes.length < 2)
        minutes = "0" + minutes;
    return hours + ":" + minutes;
}


function getBalance(page, objectId) {
    var balance = Number(GM_getValue("object_" + objectId + "_balance", -1));
    if (balance < 0)
        return "";
    var j = 0;
    var str = String(balance);
    while (str.length > 3 + j * (1 + 3)) {
        var left = str.substr(0, str.length - 3 - j * (1 + 3));
        var right = str.substr(-3 - j * (1 + 3));
        str = left + "," + right;
        j++;
    }
    return str;
}


function updateMapTable(page) {

    function updateChangeTime(table) {
        
        table.rows[0].cells[1].firstChild.textContent = ustring("Смена");
        for (var i = 1; i < table.rows.length; i++) {
            var ref = table.rows[i].cells[0].getElementsByTagName("a")[0];
            var objectId = Number(/http\:\/\/www\.heroeswm\.ru\/object\-info\.php\?id\=(\d+)/.exec(ref.href)[1]);
            var cell = table.rows[i].cells[1];
            while (cell.childNodes.length > 0)
                delete cell.removeChild(cell.firstChild);
            cell.setAttribute("align", "center");
            cell.textContent = getChangeTime(page, objectId);
        }
        
    }
    
    
    function updateBalance(table) {
        
        table.rows[0].cells[3].firstChild.textContent = ustring('Баланс');
        for (var i = 1; i < table.rows.length; i++) {
            var ref = table.rows[i].cells[0].getElementsByTagName('A')[0];
            var objectId = Number(/http\:\/\/www\.heroeswm\.ru\/object\-info\.php\?id\=(\d+)/.exec(ref.href)[1]);
            var cell = table.rows[i].cells[3];
            while (cell.childNodes.length > 0)
                delete cell.removeChild(cell.firstChild);
            cell.style.textAlign = 'center';
            cell.textContent = getBalance(page, objectId);
        }
        
    }
    
    
    function sortRows(table) {
        
        for (var i = 1; i < table.rows.length; i++)
            for (var j = table.rows.length - 1; j > i; j--) {
                var payment1 = Number(table.rows[i].cells[4].getElementsByTagName("b")[0].textContent);
                var payment2 = Number(table.rows[j].cells[4].getElementsByTagName("b")[0].textContent);
                var text1 = table.rows[i].cells[5].getElementsByTagName("a")[0].textContent;
                var text2 = table.rows[j].cells[5].getElementsByTagName("a")[0].textContent;
                if (
                    (payment2 > payment1) ||
                    ((payment2 == payment1) && (text2.length > text1.length))
                )
                    table.rows[i].parentNode.insertBefore(
                        table.rows[j].parentNode.removeChild(table.rows[j]), 
                        table.rows[i]
                    );
            }
            
    }

    var table = page.nodes.objects;
    
    if (enableSort)
        sortRows(table);
    
    if (showChangeTime) 
        updateChangeTime(table);

    if (showBalance) 
        updateBalance(table);

    if (enablePreview) {
        var refs = table.getElementsByTagName("a");
        for (var i = 0; i < refs.length; i++)
            new UIObjectPreview(refs[i], enableAutoclose);
    }
        
}


function updateEcostatDetailsTableSell(page) {

    function updateRegion(table) {
        for (var i = 1; i< table.rows.length; i++) {
            var cell = table.rows[i].cells[0];
            while (cell.childNodes.length > 3)
                delete cell.removeChild(cell.childNodes[2]);
            var ref = cell.childNodes[1];
            var objectId = Number(/object\-info\.php\?id\=(\d+)/.exec(ref.href)[1]);
            var region = String(GM_getValue("object_" + objectId + "_region", ""));
            if (region.length === 0)
                continue;
            cell.insertBefore(
                cell.ownerDocument.createTextNode(", " + region), 
                cell.lastChild
            );
        }
    }
    
    function updateChangeTime(table) {
        var cell = table.rows[0].insertCell(2);
        cell.setAttribute("class", "wbcapt");
        cell.setAttribute("align", "center");
        var b = page.doc.createElement("b");
        b.textContent = ustring("Смена");
        cell.appendChild(b);
        for (var i = 1; i< table.rows.length; i++) {
            var ref = table.rows[i].cells[0].getElementsByTagName("a")[0];
            var objectId = Number(/object\-info\.php\?id\=(\d+)/.exec(ref.href)[1]);
            var cell = table.rows[i].insertCell(2);
            cell.setAttribute("class", "wblight");
            cell.setAttribute("align", "center");
            cell.textContent = getChangeTime(page, objectId);
        }
    }
    
    var table = page.nodes.tableSell;
    
    // Удалем ширину ячеек
    for (var i = 0; i< table.rows.length; i++) {
        var cell = table.rows[i].cells[0];
        cell.removeAttribute("width");
    }
    table.rows[0].cells[1].firstChild.textContent = ustring("Ресурс");
    
    // Удалем ширину ячеек
    for (var i = 0; i< table.rows.length; i++) {
        var cell = table.rows[i].cells[0];
        cell.removeAttribute("width");
    }
    
    // Добавляем регион
    if (showRegion)
        updateRegion(table);
    
    // Добавляем смену
    if (showChangeTime) 
        updateChangeTime(table);
    
    // Добавляем предпросмотр
    if (enablePreview) {
        var refs = table.getElementsByTagName("a");
        for (var i = 0; i < refs.length; i++)
            new UIObjectPreview(refs[i], enableAutoclose);
    }

}


function updateEcostatDetailsTableBuy(page) {

    function updateRegion(table) {
        for (var i = 1; i< table.rows.length; i++) {
            var cell = table.rows[i].cells[0];
            while (cell.childNodes.length > 3)
                delete cell.removeChild(cell.childNodes[2]);
            var ref = cell.childNodes[1];
            var objectId = Number(/object\-info\.php\?id\=(\d+)/.exec(ref.href)[1]);
            var region = String(GM_getValue("object_" + objectId + "_region", ""));
            if (region.length === 0)
                continue;
            cell.insertBefore(
                cell.ownerDocument.createTextNode(", " + region), 
                cell.lastChild
            );
        }
    }
    
    function updateChangeTime(table) {
        var cell = table.rows[0].insertCell(2);
        cell.setAttribute("class", "wbcapt");
        cell.setAttribute("align", "center");
        var b = page.doc.createElement("b");
        b.textContent = ustring("Смена");
        cell.appendChild(b);
        for (var i = 1; i< table.rows.length; i++) {
            var ref = table.rows[i].cells[0].getElementsByTagName("a")[0];
            var objectId = Number(/object\-info\.php\?id\=(\d+)/.exec(ref.href)[1]);
            var cell = table.rows[i].insertCell(2);
            cell.setAttribute("class", "wblight");
            cell.setAttribute("align", "center");
            cell.textContent = getChangeTime(page, objectId);
        }
    }
    
    function updateBalance(table) {
        var cell = table.rows[0].cells[1];
        cell.firstChild.textContent = ustring("Баланс");
        for (var i = 1; i < table.rows.length; i++) {
            var ref = table.rows[i].cells[0].getElementsByTagName("a")[0];
            var objectId = Number(/object\-info\.php\?id\=(\d+)/.exec(ref.href)[1]);
            var cell = table.rows[i].cells[1];
            while (cell.childNodes.length > 0)
                delete cell.removeChild(cell.firstChild);
            cell.style.textAlign = "center";
            cell.textContent = getBalance(page, objectId);
        }
    }

    var table = page.nodes.tableBuy;

    // Удалем ширину ячеек
    for (var i = 0; i< table.rows.length; i++) {
        var cell = table.rows[i].cells[0];
        cell.removeAttribute("width");
    }
    
    // Добавляем регион
    if (showRegion)
        updateRegion(table);
    
    // Добавляем смену
    if (showChangeTime) 
        updateChangeTime(table);
    
    // Добавляем баланс
    if (showBalance)
        updateBalance(table);
    
    // Добавляем предпросмотр
    if (enablePreview) {
        var refs = table.getElementsByTagName("a");
        for (var i = 0; i < refs.length; i++)
            new UIObjectPreview(refs[i], enableAutoclose);
    }

}


function updateMap(page) {

    function appendFrame(division) {
        var iframe = page.doc.createElement("iframe");
        iframe.src = division.href;
        iframe.id = "map_" + division.type;
        container.appendChild(iframe);
        Event.add(iframe, "load", function() {onFrameLoad(iframe);});
    }
    
    
    function onFrameLoad(iframe) {
        
        var subPage = new PageMap(iframe.contentDocument);
        subPage.parse();
        
        // Работаем только с нормальной страницей
        if (subPage.state === 1) {
        
            var rows = subPage.nodes.objects.rows;
            for (var i = 1; i < rows.length; i++)
                page.nodes.objects.appendChild(
                    page.doc.importNode(rows[i], true)
                );
                
            updateMapTable(page);
                
        }
        
        delete iframe.parentNode.removeChild(iframe);
    
    }

    // Не работаем с домами
    if (page.currentDivision().type != "hs") {
    
        updateMapTable(page);
    
        var container = page.doc.createElement("div");
        container.style.display = "none";
        container.id = "map_all_objects";
        page.doc.body.appendChild(container);
        
        for (i = 0; i < page.divisions.length - 1; i++)
            if (!page.divisions[i].current)
                appendFrame(page.divisions[i]);
    
    }

}


function updateObjectDetails(page) {

    if (page.objectRegion !== null) {
        
        GM_setValue("object_" + page.objectId + "_region", page.objectRegion);
    
    } else {
    
        GM_deleteValue("object_" + page.objectId + "_region");
    
    }
    
    if (page.objectBalance !== null) {
        
        GM_setValue("object_" + page.objectId + "_balance", page.objectBalance);
    
    } else {
    
        GM_deleteValue("object_" + page.objectId + "_balance");
    
    }
    
    if (page.nodes.objectChangeTime !== null) {

        var showChangeTime = page.nodes.objectChangeTime.textContent;
        var matches = /.*:\s*(\d+):(\d+)/.exec(showChangeTime);
        var hours = Number(matches[1]);
        var minutes = Number(matches[2]);

        GM_setValue("object_" + page.objectId + "_change_time_hours", hours);
        GM_setValue("object_" + page.objectId + "_change_time_minutes", minutes);
        
    } else {

        if (page.objectBalance > page.objectPayment) {
        
            var hours = (new Date()).getHours();
            var minutes = (new Date()).getMinutes();
            minutes = 5 * Math.floor(minutes / 5);
            if (minutes % 5 > 0)
                minutes += 5;
            if (minutes == 60) {
                hours++;
                minutes = 0;
            }
            if (hours == 24)
                hours = 0;
        
            GM_setValue("object_" + page.objectId + "_change_time_hours", hours);
            GM_setValue("object_" + page.objectId + "_change_time_minutes", minutes);
        
        } else {

            GM_deleteValue("object_" + page.objectId + "_change_time_hours");
            GM_deleteValue("object_" + page.objectId + "_change_time_minutes");
        
        }
    
    }

}


if (Page.isHomeURL(document.location.href)) {

    var uiConf = new UIConf(document);
    uiConf.setTitle("HWM Map Objects");
    uiConf.setAbout(
        "<b>Скрипт</b>" +
        "<br>HWM Map Objects<br><br>" +
        "<b>Версия</b>" +
        "<br>1.4.0<br><br>" +
        "<b>Описание</b>" + 
        "<br>Отображает все объекты на карте. Опционально делает предпросмотр объектов. Опционально отображает время смены объектов.<br><br>" + 
        "<b>Разработчики</b>" + 
        "<br><a href=\"http://www.heroeswm.ru/pl_info.php?id=2863825\">DrunkenStranger</a>, <a href=\"http://www.heroeswm.ru/pl_info.php?id=2937977\">Evernight</a>.<br><br>" + 
        "<b>Обсуждение</b>" + 
        "<br><a href=\"http://forum.heroeswm.info/forum_messages.pl?id=588\">http://forum.heroeswm.info/forum.pl</a><br><br>"
    );
    
    var i = 0;
    uiConf.insertGMBoolOption("enableSort", true, undefined, "Сортировка объектов.", i++);
    uiConf.insertGMBoolOption("enablePreview", true, undefined, "Предпросмотр объектов с карты.", i++);
    uiConf.insertGMBoolOption("enableEcostat", true, undefined, "Изменение страницы детальной статистики.", i++);
    uiConf.insertGMBoolOption("enableAutoclose", true, undefined, "Автозакрытие блоков предпросмотра.", i++);
    uiConf.insertGMBoolOption("showChangeTime", true, undefined, "Отображение времени смены.", i++);
    uiConf.insertGMBoolOption("showBalance", true, undefined, "Отображение баланса.", i++);
    uiConf.insertGMBoolOption("showRegion", true, undefined, "Отображение региона (страница детальной статистики).", i++);
    GM_registerMenuCommand(ustring("HWM Map Objects: Конфигурация"), function() {uiConf.show();});

} else {

    if (Page.isObjectInfoURL(document.location.href)) {

        if (showChangeTime || showBalance || enableEcostat) {
        
            var page = new PageObjectInfo(document);
            page.parse();
            
            if (page.state === 1) {
            
                updateObjectDetails(page);
            
            }
            
        }
    
    } else {
    
        if (Page.isEcostatDetailsURL(document.location.href)) {
        
            // Если разраешено обновление деталей экономической статистики
            if (enableEcostat) {
            
                var page = new PageEcostatDetails(document);
                page.parse();
                
                if (page.state === 1) {
                
                    updateEcostatDetailsTableSell(page);
                    updateEcostatDetailsTableBuy(page);
                    
                }
            
            }
        
        } else {

            // Не работаем во фрейме
            if (parent === window) {
            
                var page = new PageMap(document);
                page.parse();
                
                // Работаем только с нормальной страницей
                if (page.state === 1) {
                
                    updateMap(page);
                
                }
            
            }
        
        }

    }

}