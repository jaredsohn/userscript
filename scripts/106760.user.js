// ==UserScript==
// @name            HWM Battles Hero Preview
// @description     Предпросмотр параметров героя, его артефактов и армии перед вступлением в битву.
// @version         2.0.0
// @namespace       heroeswm
// @include         http://www.heroeswm.ru/home.php
// @include         http://www.heroeswm.ru/group_wars.php*
// @include         http://www.heroeswm.ru/one_to_one.php*
// @include         http://www.heroeswm.ru/pl_warlog.php*
// @include         http://www.heroeswm.ru/clan_info.php* 
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
* @file page_player_info.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Страница информации об игроке
* @param Document doc
* @param Game game
* @link http://www.heroeswm.ru/pl_info.php?id=*
*/
function PagePlayerInfo(doc, game) {

    this.constructor.parent.prototype.constructor.apply(this, arguments);
    
    this.player = null;
    this.playerId = null;
    if (this.game !== undefined)
        this.player = new Hero(this.game);

    this.nodes.content = null;
    this.nodes.tableBase = null;
    this.nodes.tableStats = null;
    this.nodes.tableClans = null;
    this.nodes.tableSkills = null;
    this.nodes.tableAwards = null;
    this.nodes.tableInfo = null;
    
    this.nodes.playerName = null;
    this.nodes.playerBalance = null;
    this.nodes.playerFamily = null;
    this.nodes.playerChat = null;
    this.nodes.playerForum = null;
    this.nodes.playerResources = null;
    this.nodes.playerSkills = null;
    this.nodes.playerTalents = null;

}

PagePlayerInfo.extends(Page);

/** Урезание содержимого
*/
PagePlayerInfo.prototype.truncate = function() {

    if (!this.constructor.parent.prototype.truncate.apply(this, arguments))
        return false;
        
    try {
        
        if (this.nodes.content === null)
            throw new Error(ustring("Не могу найти содержимое для урезания"));
        
        // Удаляем верхний колонтитул содержимого
        var node = this.nodes.content.firstChild;
        for (var i = 0; i < 1; i++) {
            var nextNode = node.nextSibling;
            delete node.parentNode.removeChild(node);
            node = nextNode;
        }
        
        // Удаляем нижний колонтитул содержимого
        var node = this.nodes.content.lastChild;
        for (var i = 0; i < 1; i++) {
            var nextNode = node.previousSibling;
            delete node.parentNode.removeChild(node);
            node = nextNode;
        }
        
        // Урезаем ширину таблиц
        var node = this.nodes.content;
        while (node !== null) {
            if (node.tagName == "TABLE")
                node.removeAttribute("width");
            node = node.parentNode;
        }
    
    } catch (e) {
        
        GM_log(this + "\n" + e);
        return false;
    
    }
    
    return true;
    
}

/** Парсинг
*/
PagePlayerInfo.prototype.parse = function() {

    if (!this.constructor.parent.prototype.parse.apply(this, arguments))
        return false;

    try {
    
        if (!this.parseURL())
            throw new Error(ustring("Ошибка распознавания URL"));
            
        if (!this.parseContent())
            throw new Error(ustring("Ошибка распознавания содержимого"));
    
    } catch (e) {
    
        GM_log(this + "\n" + e);
        this.state = -1;
        return false;
    
    }
    
    this.state = 1;
    return true;
    
}

/** Парсинг URL
*/
PagePlayerInfo.prototype.parseURL = function() {
    var matches = this.doc.URL.match(/\?id=(\d+)/);
    if (matches === null)
        return false;
    this.playerId = matches[1];
    if (this.game !== undefined)
        this.player.id = this.playerId;
    return true;
}

/** Парсинг содержимого
*/
PagePlayerInfo.prototype.parseContent = function() {
    var xpath = "/html/body/center/table/tbody/tr/td";
    var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
    this.nodes.content = xpathRes.iterateNext();
    if (this.nodes.content === null)
        return false;
    
    // Создаем список таблиц контента
    var tables = [];
    var nodes = this.nodes.content.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].tagName !== "TABLE")
            continue;
        tables[tables.length] = nodes[i];
    }
    
    // Поочередно распознаем таблицы
    var i = 0;
    
    // Первой должна идти базовая информация об игроке
    if (!this.parseTableBase(tables[i]))
        return false;
    i++;
    
    // Следующей должна идти статистика и логи игрока
    if (!this.parseTableStats(tables[i]))
        return false;
    i++;

    // Следующей может идти таблица кланов
    if (this.parseTableClans(tables[i]))
        i++;
        
    // Следующей должна идти таблица умений
    if (!this.parseTableSkills(tables[i]))
        return false;
    i++;

    // Следующей может идти таблица достижений
    if (this.parseTableAwards(tables[i]))
        i++;
        
    // Последней должна идти таблица личной информации
    if (!this.parseTableInfo(tables[i]))
        return false;
    
    return true;
}

/** Парсинг таблицы базовой информации
* @param Node table
*/
PagePlayerInfo.prototype.parseTableBase = function(table) {
    
    // Ищем имя игрока
    this.nodes.playerName = table.rows[0].cells[0].firstChild;
    
    // Ищем баланс игрока
    this.nodes.playerBalance = table.rows[0].cells[1].firstChild;
    
    // Семья, чат, форум
    for (var i = 1; i < table.rows.length - 2; i++) {
        var cell = table.rows[i].cells[0];
        if (cell.firstChild.type !== 3)
            break;
            
        // Семья
        var re = new RegExp(ustring("Семья:"));
        if (re.test(cell.firstChild.textContent)) {
            this.nodes.playerFamily = cell;
            continue;
        }

        // Чат
        var re = new RegExp(ustring("Чат:"));
        if (re.test(cell.firstChild.textContent)) {
            this.nodes.playerChat = cell;
            continue;
        }

        // Форум
        var re = new RegExp(ustring("Форум:"));
        if (re.test(cell.firstChild.textContent)) {
            this.nodes.playerForum = cell;
            continue;
        }
        
    }
    
    // Навыки, снаряжение
    this.nodes.playerParams = table.rows[table.rows.length - 2].cells[0];
    this.nodes.playerEquipment = table.rows[table.rows.length - 2].cells[1];
    
    // Армия
    var cell = table.rows[table.rows.length - 2].cells[2].firstChild.rows[2].cells[0];
    this.nodes.playerArmy = cell.lastChild;        
    
    this.nodes.tableBase = table;
    return true;
}

/** Парсинг таблицы статистики
* @param Node table
*/
PagePlayerInfo.prototype.parseTableStats = function(table) {
    this.nodes.tableStats = table;
    return true;
}

/** Парсинг таблицы кланов
* @param Node table
*/
PagePlayerInfo.prototype.parseTableClans = function(table) {
    try {
    
        var re = new RegExp(ustring("Кланы"));
        if (!re.test(table.rows[0].cells[0].firstChild.textContent))
            return false;
        
        this.nodes.tableClans = table;
        return true;
    
    } catch (e) {
        
        return false;
    
    }
}

/** Парсинг таблицы умений
* @param Node table
*/
PagePlayerInfo.prototype.parseTableSkills = function(table) {
    try {
    
        var re = new RegExp(ustring("Ресурсы"));
        if (!re.test(table.rows[0].cells[0].firstChild.textContent))
            return false;
            
        this.nodes.playerResources = table.rows[1].cells[0];
        this.nodes.playerSkills = table.rows[1].cells[1];
        this.nodes.playerTalents = table.rows[1].cells[2];
        this.nodes.tableSkills = table;
        return true;
    
    } catch (e) {
    
        return false;
    
    }
}

/** Парсинг таблицы наград
* @param Node table
*/
PagePlayerInfo.prototype.parseTableAwards = function(table) {
    try {
    
        var re = new RegExp(ustring("Достижения"));
        if (!re.test(table.rows[0].cells[0].firstChild.textContent))
            return false;
        
        this.nodes.tableAwards = table;
        return true;
    
    } catch (e) {
    
        return false;
    
    }
}

/** Парсинг таблицы личной информации
* @param Node table
*/
PagePlayerInfo.prototype.parseTableInfo = function(table) {
    try {
    
        var re = new RegExp(ustring("Личная информация"));
        if (!re.test(table.rows[0].cells[0].firstChild.textContent))
            return false;
        
        this.nodes.tableInfo = table;
        return true;
    
    } catch (e) {
    
        return false;
    
    }
}

/** Парсинг ресурсов игрока
*/
PagePlayerInfo.prototype.parsePlayerResources = function() {
    try {
    
        // Если игрок не задан, то и парсить ресурсы не для кого
        if (this.player === undefined)
            return null;
        // Если найдена ячейка с первичными ресурсами
        if (this.nodes.playerBalance !== undefined)
            this.player.balance = Price.fromNode(this.game, this.nodes.playerBalance);
        // Если найдена ячейка с элементами ГН
        if (this.nodes.playerResources !== undefined) {
            var nodes = this.nodes.playerResources.childNodes;
            for (var i = 0; i < nodes.length; i++)
                if (nodes[i].tagName === "B")
                    try {
                        var title = nodes[i].textContent;
                        var count = nodes[i + 1].textContent.match(/:\s+(\d+)/)[1];
                        var item = this.game.getItemByTitle(title);
                        this.player.balance.setCountById(item.id, count);
                    } catch (e) {
                        // Do nothing
                    }
        }
        
    } catch (e) {
    
        GM_log(
            this + "\n" + 
            ustring("Ошибка распознования баланса игрока") + "\n" +
            e
        );
    
    }
}

/** Представление в строке
*/
PagePlayerInfo.prototype.toString = function() {
    return "PagePlayerInfo(" + this.playerId + ")";
}





var modeMouseOver = GM_getValue("modeMouseOver", true);
var showTalents = GM_getValue("showTalents", true);
var showSkills = GM_getValue("showSkills", true);


function onFrameLoad(doc, block) {
    
    var divCtrls = block.childNodes[0];
    var divContent = block.childNodes[1];
    
    var page = new PagePlayerInfo(doc);
    page.parse();
    
    if (page.state === 1) {
        var i = 0;
    
        var table = document.createElement("table");
        var row = table.insertRow(i++);
        var cell = row.appendChild(document.importNode(page.nodes.playerName.parentNode, true));
        cell.setAttribute("colspan", 2);
        
        var row = table.insertRow(i++);
        var cell = row.appendChild(document.importNode(page.nodes.playerParams, true));
        var cell = row.appendChild(document.importNode(page.nodes.playerEquipment, true));

        var row = table.insertRow(i++);
        var cell = row.insertCell(0);
        cell.setAttribute("colspan", 2);
        var node = cell.appendChild(document.importNode(page.nodes.playerArmy, true));
        node = node.getElementsByTagName("embed")[0];
        node.width = "100%";
        node.style.margin = "0px";
        node.style.padding = "0px";

        if (showTalents) {
            var row = table.insertRow(i++);
            var cell = row.appendChild(document.importNode(page.nodes.playerTalents, true));
            cell.setAttribute("colspan", 2);
        }

        if (showSkills) {
            var row = table.insertRow(i++);
            var cell = row.appendChild(document.importNode(page.nodes.playerSkills, true));
            cell.setAttribute("colspan", 2);
            cell.style.textAlign = "center";
            while (cell.childNodes.length > (8 * 3 + 1))
                delete cell.removeChild(cell.lastChild);
        }
        
        divContent.appendChild(table);
        if (!modeMouseOver)
            divCtrls.style.display = "block";
        table.style.width = "auto";
        table.style.borderStyle = "none";
        var cells = table.getElementsByTagName("td");
        for (var i = 0; i < cells.length; i++)
            cells[i].style.borderStyle = "none";
        
        delete divContent.removeChild(divContent.firstChild);
        delete divContent.removeChild(divContent.firstChild);
    
    } else {
    
        divContent.firstChild.textContent = ustring("Ошибка.");
    
    }
    
}


function createPopup(target) {
    var result = document.createElement("div");
    result.style.display = "block";
    result.style.position = "absolute";
    return document.body.appendChild(result);
}


function togglePreview(node, heroId, heroNick) {
    if (heroId !== undefined)
        var id = "popup_hero_id_" + heroId;
    else
        var id = "popup_hero_nick_" + heroNick;
    var block = document.getElementById(id);
    var offset = {left: 5, top: 15};
    
    if (block) {
        if (block.style.display == "none") {
            setOffset(block, offset, node);
            block.style.display = "block";
        } else
            block.style.display = "none";
        return true;
    }

    var block = createPopup(node);
    block.id = id;
    block.style.borderStyle = "solid";
    block.style.borderWidth = "1px";
    block.style.borderColor = "#666666";
    block.style.backgroundColor = "#ffffff";
    block.style.overflow = "auto";
    setOffset(block, offset, node);
    
    var divCtrls = document.createElement("div");
    divCtrls.style.display = "none";
    divCtrls.style.padding = "2px";
    divCtrls.style.textAlign = "right";
    
    
    var i = document.createElement("i");
    i.style.cursor = "pointer";
    i.textContent = ustring("Закрыть");
    divCtrls.appendChild(i);
    Event.add(i, "click", function() {togglePreview(node, heroId, heroNick);});
    
    var divContent = document.createElement("div");
    divContent.style.padding = "5px";
    
    var p = document.createElement("p");
    p.style.margin = "0pt";
    p.style.padding = "0pt";
    p.style.paddingLeft = "10px";
    p.style.paddingRight = "10px";
    p.textContent = ustring("Загрузка...");
    
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    if (heroId !== undefined)
        iframe.src = "http://www.heroeswm.ru/pl_info.php?id=" + heroId;
    else
        iframe.src = "http://www.heroeswm.ru/pl_info.php?nick=" + heroNick;
    
    divContent.appendChild(p);
    divContent.appendChild(iframe);

    block.appendChild(divCtrls);
    block.appendChild(divContent);
    
    Event.add(
        iframe, "load", 
        function() {
            // Таймает нужен под хромом чтобы успели отработать скрипты на странице
            setTimeout(function() {onFrameLoad(iframe.contentDocument, block);}, 0.1 * 1000);
        }
    );
    
}


function attachPreview(node, heroId, heroNick) {
    if (modeMouseOver) {
        Event.add(node, "mouseover", function() {togglePreview(this, heroId, heroNick);});
        Event.add(node, "mouseout", function() {togglePreview(this, heroId, heroNick);});
    } else
        Event.add(node, "click", function() {togglePreview(this, heroId, heroNick);});
}


if (Page.isHomeURL(document.location.href)) {

    var uiConf = new UIConf(document);
    uiConf.setTitle("HWM Battles Hero Preview");
    uiConf.setAbout(
        "<b>Скрипт</b>" +
        "<br>HWM Battles Hero Preview<br><br>" +
        "<b>Версия</b>" +
        "<br>2.0.0<br><br>" +
        "<b>Описание</b>" + 
        "<br>Предоставляет возможность смотреть параметры героев перед битвой не уходя со страницы.<br><br>" + 
        "<b>Разработчики</b>" + 
        "<br><a href=\"http://www.heroeswm.ru/pl_info.php?id=2863825\">DrunkenStranger</a>, <a href=\"http://www.heroeswm.ru/pl_info.php?id=2937977\">Evernight</a>.<br><br>" + 
        "<b>Обсуждение</b>" + 
        "<br><a href=\"http://forum.heroeswm.info/forum_messages.pl?id=494\">http://forum.heroeswm.info/forum.pl</a><br><br>"
    );
    
    var i = 0;
    uiConf.insertGMBoolOption("modeMouseOver", true, undefined, "Переменная modeMouseOver отвечает за то, по какому событию будет подгружаться всплывающее окно (true - по наведению мышью на ник, false - по клику на уровень).", i++);
    uiConf.insertGMBoolOption("showTalents", true, undefined, "Переменная showTalents отвечает за отображение талантов (true - отображаются, false - нет).", i++);
    uiConf.insertGMBoolOption("showSkills", true, undefined, "Переменная showSkills отвечает за отображение умений (true - отображаются, false - нет).", i++);
    GM_registerMenuCommand(ustring("HWM Battles Hero Preview: Конфигурация"), function() {uiConf.show();});

} else {

    var refs = document.getElementsByTagName("a");
    for (var i = 0; i < refs.length; i++) {
        var heroId = undefined;
        var heroNick = undefined;
    
        var re = /http:\/\/www\.heroeswm\.ru\/pl_info\.php\?id=(\d+)/ig;
        var matches = re.exec(refs[i].href);
        if (matches === null) {
            var re = /http:\/\/www\.heroeswm\.ru\/pl_info\.php\?nick=(.+)/ig;
            var matches = re.exec(refs[i].href);
            if (matches === null)
                continue;
            else
                heroNick = String(matches[1]);
        } else
            heroId = Number(matches[1]);
        
        if (modeMouseOver) {
            attachPreview(refs[i], heroId, heroNick);
            continue;
        }
        
        var node = refs[i].firstChild;
        if (node.nodeType !== 3)
            node = node.firstChild;
        var matches = /([.\S]+)\s*(\[\d+\])/.exec(node.textContent);
        if (matches !== null) {
            node.textContent = matches[1];
            node = document.createTextNode(matches[2]);
            refs[i].parentNode.insertBefore(node, refs[i].nextSibling);
        } else {
            try {
                node = refs[i].nextSibling;
                if (node.nodeType !== 3)
                    node = node.firstChild;
                node.textContent = /\[\d+\]/.exec(node.textContent)[0];
            } catch (e) {
                continue;
            }
        }
        
        var sup = document.createElement("sup");
        node.parentNode.insertBefore(sup, node);
        node.parentNode.removeChild(node);
        sup.appendChild(node);
    
        attachPreview(sup, heroId, heroNick);
        sup.style.cursor = "pointer";
        sup.title = ustring("Предпросмотр");
        
    }

}