// ==UserScript==
// @name            HWM Tavern Hero Preview
// @description     Предпросмотр истории игр героя перед вступлением в карточную игру.
// @version         1.2.0
// @namespace       heroeswm
// @include         http://www.heroeswm.ru/home.php
// @include         http://www.heroeswm.ru/tavern.php*
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





var modeMouseOver = GM_getValue("modeMouseOver", true);


function onFrameLoad(doc, block) {
    var xpath = "/html/body/center/table/tbody/tr/td/table";
    var xpathRes = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);
    var table = xpathRes.iterateNext();
    
    var divCtrls = block.childNodes[0];
    var divContent = block.childNodes[1];
    divContent.appendChild(document.importNode(table, true));
    
    if (!modeMouseOver)
        divCtrls.style.display = "block";
    divContent.style.width = "320pt";
    divContent.style.height = "240pt";
    delete divContent.removeChild(divContent.firstChild);
    delete divContent.removeChild(divContent.firstChild);
}


function createPopup(target) {
    var result = document.createElement("div");
    result.style.display = "block";
    result.style.position = "absolute";
    return document.body.appendChild(result);
}


function togglePreview(node, heroId) {
    var id = "popup_hero_id_" + heroId;
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
    setOffset(block, offset, node);
    
    var divCtrls = document.createElement("div");
    divCtrls.style.display = "none";
    divCtrls.style.padding = "2px";
    divCtrls.style.textAlign = "right";
    
    var i = document.createElement("i");
    i.style.cursor = "pointer";
    i.textContent = ustring("Закрыть");
    divCtrls.appendChild(i);
    Event.add(i, "click", function() {togglePreview(node, heroId);});
    
    var divContent = document.createElement("div");
    divContent.style.padding = "5px";
    divContent.style.overflow = "auto";
    
    var p = document.createElement("p");
    p.style.margin = "0pt";
    p.style.padding = "0pt";
    p.style.paddingLeft = "10pt";
    p.style.paddingRight = "10pt";
    p.textContent = ustring("Загрузка...");
    
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = "http://www.heroeswm.ru/pl_cardlog.php?id=" + heroId;
    
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


function attachPreview(node, heroId) {
    if (modeMouseOver) {
        Event.add(node, "mouseover", function() {togglePreview(this, heroId);});
        Event.add(node, "mouseout", function() {togglePreview(this, heroId);});
    } else
        Event.add(node, "click", function() {togglePreview(this, heroId);});
}


if (document.location.href === "http://www.heroeswm.ru/home.php") {

    var uiConf = new UIConf(document);
    uiConf.setTitle("HWM Tavern Hero Preview");
    uiConf.setAbout(
        "<b>Скрипт</b>" +
        "<br>HWM Tavern Hero Preview<br><br>" +
        "<b>Версия</b>" +
        "<br>1.1.0<br><br>" +
        "<b>Разработчики</b>" + 
        "<br><a href=\"http://www.heroeswm.ru/pl_info.php?id=2863825\">DrunkenStranger</a>, <a href=\"http://www.heroeswm.ru/pl_info.php?id=2937977\">Evernight</a>.<br><br>"
    );
    
    var i = 0;
    uiConf.insertGMBoolOption("modeMouseOver", true, undefined, "Переменная modeMouseOver отвечает за то, по какому событию будет подгружаться всплывающее окно (true - по наведению мышью на ник, false - по клику на уровень).", i++);
    GM_registerMenuCommand(ustring("HWM Tavern Hero Preview: Конфигурация"), function() {uiConf.show();});

} else {

    var refs = document.getElementsByTagName("a");
    for (var i = 0; i < refs.length; i++) {
        var re = /http:\/\/www\.heroeswm\.ru\/pl_info\.php\?id=(\d+)/ig;
        var matches = re.exec(refs[i].href);
        if (matches === null)
            continue;
            
        var heroId = Number(matches[1]);
        
        if (modeMouseOver) {
            attachPreview(refs[i], heroId);
            continue;
        }
            
        var node = refs[i].nextSibling.nextSibling;
        node.title = "";
        
        var sup = document.createElement("sup");
        node.parentNode.removeChild(node.previousSibling);
        node.parentNode.insertBefore(sup, node);
        node.parentNode.removeChild(node);
        sup.appendChild(node);
        
        attachPreview(sup, heroId);
        sup.style.cursor = "pointer";
        sup.title = ustring("Предпросмотр");
    }

}