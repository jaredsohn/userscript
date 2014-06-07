// ==UserScript==
// @name            HWM Object Offers
// @description     Автоматическое заключение сделок.
// @version         1.6.0
// @namespace       heroeswm
// @include         http://www.heroeswm.ru/home.php
// @include         http://www.heroeswm.ru/object-info.php?id=*
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




/** Библиотека случайных чисел
*
* Реализует некоторые распределения случайных величин.
* @file lib_random.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

function DistUniform(min, max) {

    this.min = min;
    this.max = max;

}

DistUniform.prototype.genValue = function() {
    return Math.random() * (this.max - this.min) + this.min;
}


function DistNormal(mu, sigma) {

    this.mu = mu;
    this.sigma = sigma;

}

DistNormal.prototype.genValue12 = function() {
    var xi = 0;
    for (var i = 0; i < 12; i++)
        xi += Math.random();
    return (this.sigma * (xi - 6)) + this.mu;
}

DistNormal.prototype.genValue48 = function() {
    var xi = 0;
    for (var i = 0; i < 48; i++)
        xi += Math.random();
    return (this.sigma * (xi - 24) / 2) + this.mu;
}

DistNormal.prototype.genValueException = function() {
    var pi = Math.PI;
    var g = Math.sqrt(pi / 2);
    do {
        var gamma1 = Math.random();
        var gamma2 = Math.random();
        var xi = Math.tan(pi * (gamma1 - 1 / 2));
        var eta = (gamma2 * g / pi) * Math.sin(pi * gamma1);
    } while (
        eta > 1 / Math.sqrt(2 * pi) * Math.exp(-Math.sqrt(xi) / 2)
    );
    return this.sigma * xi + this.mu;
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
* @file class_art.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Артефакт
* @param Game game
* @param String category 
* @param Number id 
* @param String name 
* @param String title 
* @param Number cost 
*/
function Art(game, category, id, name, title, cost) {
    
    this.constructor.parent.prototype.constructor.apply(this, arguments);
    this.game = game;
    this.category = category;
    this.id = id;
    this.name = name;
    this.title = ustring(title);
    this.cost = cost;
    this.icon = null;
    this.level = null;
    this.points = null;
    this.cond = null;
    this.repairCost = null;

}

// Класс Art является наследником класса Item
Art.extends(Item);

/** Представление в строке
*/
Art.prototype.toString = function() {
    return this.title;
}

/** Стоимость боя
* @param Number def
*/
Art.prototype.fightCost = function(def) {
    if ((this.cost === undefined) || (this.cond === undefined))
        return def;
    var result = Math.floor(this.cost / this.cond);
    if ((this.cost % this.cond) == 0)
        return result;
    return result + 1;
}

/** URL иконки
*/
Art.prototype.iconURL = function() {
    if (this.icon === undefined)
        return null;
    return "http://im.heroeswm.ru/i/artifacts/" + this.icon + ".jpg";
}

/** URL аукциона
* @param Number sort Сортировка
* @param Boolean sbn Купить сразу
* @param Boolean sau Торги
* @param Boolean snew Только целые
*
* sort:
*   0 - По умолчанию
*   1 - Время: Завершающиеся
*   2 - Время: Новые предложения
*   3 - Цена: По убыванию
*   4 - Цена: По возрастанию
*/
Art.prototype.auctionURL = function(sort, sbn, sau, snew) {
    var baseURL = "http://www.heroeswm.ru/auction.php";
    var params = [];
    if (this.category === undefined) return null; else params[params.length] = "cat=" + this.category;
    if (this.name === undefined) return null; else params[params.length] = "art_type=" + this.name;
    if (sort === undefined) params[params.length] = "sort=0"; else params[params.length] = "sort=" + sort;
    if (sbn === true) params[params.length] = "sbn=1";
    if (sbn === false) params[params.length] = "sbn=0";
    if (sau === true) params[params.length] = "sau=1";
    if (sau === false) params[params.length] = "sau=0";
    if (snew === true) params[params.length] = "snew=1";
    var result = baseURL;
    for (var i = 0; i < params.length; i++)
        if (i === 0) result += "?" + params[i]; else result += "&" + params[i];
    return result;
}
    
/** Загрузка базы данных артефактов
* @param Game game
*/
Art.load = function(game) {
    
    function create(category, id, name, title, icon, level, points, cond, cost, repairCost) {
        var art = new Art(game, category, id, name, title, cost);
        art.icon = icon;
        art.level = level;
        art.points = points;
        art.cond = cond;
        art.repairCost = repairCost;
        return game.appendItem(art);
    }

    // Головные уборы
    create("helm", undefined, "leatherhat", "Кожаная шляпа", "leatherhat_s", 1, 1, 12, 500, 200);
    create("helm", 18, "leather_helm", "Кожаный шлем", "leatherhelmet_s", 3, 1, 30, 1500 + 2 * 180, 744);
    create("helm", 33, "wizard_cap", "Колпак мага", "magehat_s", 5, 2, 35, 3000 + 5 * 360, 1920);
    create("helm", 32, "chain_coif", "Кольчужный шлем", "chaincoif_s", 5, 2, 40, 3000 + 5 * 180 + 2 * 360, 1848);
    create("helm", undefined, "xymhelmet15", "Корона пламенного чародея", "xymhelmet15_s", 15, 7, 70, 10500 + 2 * 7 * 360 + 2 * 6 * 360, 7944);
    create("helm", undefined, "mhelmetzh13", "Корона чернокнижника", "mhelmetzh13_s", 13, 6, 70, 12000 + 4 * 5 * 360, 7680);
    create("helm", undefined, "hunter_roga1", "Костяной шлем мастера-охотника", "hunter_roga1_s", 4, 2, 10, 100, 800);
    create("helm", 71, "mif_lhelmet", "Лёгкий мифриловый шлем", "mif_lhelmet_s", 9, 5, 70, 10000 + 2 * 8 * 180 + 4 * 2 * 360, 6304);
    create("helm", undefined, "zxhelmet13", "Обсидиановый шлем", "zxhelmet13_s", 13, 6, 70, 12000 + 2 * 4 * 180 + 4 * 4 * 360, 7680);
    create("helm", 51, "steel_helmet", "Стальной шлем", "steel_helmet_s", 7, 3, 70, 6000 + 8 * 180 + 8 * 360 + 2 * 380, 4416);
    create("helm", 72, "mif_hhelmet", "Тяжёлый мифриловый шлем", "mif_hhelmet_s", 11, 5, 70, 11000 + 2 * 10 * 180 + 4 * 3 * 360, 7568);
    create("helm", undefined, "gm_hat", "Шлем великого охотника", "gm_hat_s", 7, 4, 10, 200, 1200);
    create("helm", undefined, "sh_helmet", "Шлем зверобоя", "sh_helmet_s", 10, 6, 15, 400, 2400);
    create("helm", 52, "mage_helm", "Шлем мага", "mage_helm_s", 7, 4, 50, 10000 + 4 * 5 * 360, 6880);
    create("helm", undefined, "hunter_helm", "Шлем мастера-охотника", "hunter_helm_s", 5, 2, 10, 100, 800);
    create("helm", undefined, "myhelmet15", "Шлем пламени", "myhelmet15_s", 15, 7, 70, 9000 + 2 * 10 * 180 + 4 * 5 * 360, 7920);
    create("helm", 27, "knowledge_hat", "Шляпа знаний", "knowlengehat_s", 5, 2, 25, 4000 + 5 * 360, 2320);
    create("helm", undefined, "hunter_hat1", "Шляпа охотника", "hunter_hat1_s", 2, 1, 10, 50, 400);

    // Предметы на шею
    create("necklace", 12, "amulet_of_luck", "Амулет удачи", "lucknecklace_s", 3, 2, 25, 2500 + 1 * 360, 1144);
    create("necklace", 61, "warrior_pendant", "Кулон воина", "warrior_pendant_s", 10, 8, 50, 17000 + 2 * 20 * 180, 9680);
    create("necklace", 56, "power_pendant", "Кулон отчаяния", "power_pendant_s", 7, 7, 15000 + 4 * 5 * 360, 8880);
    create("necklace", undefined, "hunter_pendant1", "Кулон охотника", "hunter_pendant1_s", 2, 1, 10, 50, 400);
    create("necklace", 62, "magic_amulet", "Магический амулет", "magic_amulet_s", 10, 7, 50, 18000 + 2 * 10 * 360, 10080);
    create("necklace", 14, "bravery_medal", "Медаль отваги", "braverymedal_s", 2, 2, 25, 1300 + 1 * 360, 664);
    
    // Броня
    create("cuirass", 23, "hauberk", "Боевая кольчуга", "chainarmor_s", 5, 3, 40, 7140, 2752);
    create("cuirass", 65, undefined, "Роба чародея", undefined);
    create("cuirass", 69, undefined, "Лёгкая мифриловая кираса", undefined);
    create("cuirass", 53, undefined, "Одеяние мага", undefined);
    create("cuirass", 47, undefined, "Стальная кираса", undefined);
    create("cuirass", 63, undefined, "Стальные доспехи", undefined);
    create("cuirass", 31, undefined, "Халат ветров", undefined);
    create("cuirass", 60, undefined, "Халат магической защиты", undefined);
    create("cuirass", undefined, "leatherplate", "Кожаные доспехи", "leatherplate_s", 3, 2, 30, 4080, 1632);
    create("cuirass", undefined, "leather_shiled", "Кожаная броня", "leathershield_s", 1, 1, 18, 780, 312);
    
    // Плащи
    create("cloack", 54, "powercape", "Плащ магической силы", "powercape_s", 8, 4, 40, 10000 + 40 * 360, 9760);
    create("", 24, "soul_cape", "Накидка духов", "soulcape_s", 5, 2, 30, 3580, 1432);
    
    // Оружие
    create("weapon", 26, "staff", "Боевой посох", "staff_s", 5, 6, 40, 9040, 3616);
    create("weapon", 58, "long_bow", "Длинный лук", "long_bow_s", 6, 4, 50, 19000, 7600);
    create("weapon", 35, "dagger", "Кинжал мести", "dagger_s", 3, 1, 30, 2800, 1088);
    create("", 13, "gnome_hammer", "Легкий топорик", "onehandaxe_s", 2, 2, 25, 1060, 344);
    create("", 48, "power_sword", "Меч власти", "power_sword_s", 7, 8, 80, 29400, 11760);
    create("", 25, "requital_sword", "Меч возмездия", "requitalsword_s", 5, 5, 7600, 3040);
    create("", 30, "broad_sword", "Меч равновесия", "broadsword_s", 6, 6, 60, 14640, 5680);
    create("", 34, "def_sword", "Меч расправы", "def_sword_s", 3, 3, 40, 3860, 1544);
    create("", 74, undefined, "Мифриловый меч", undefined);
    create("", 75, undefined, "Мифриловый посох", undefined);
    create("", 57, undefined, "Посох могущества", undefined);
    create("", 68, undefined, "Составной лук", undefined);
    create("", undefined, "wood_sword", "Деревянный меч", "woodensword_s", 1, 1, 7, 400, 160);
    create("", 16, "steel_blade", "Стальной клинок", "steelsword_s", 3, 2, 30, 1380, 552);
    
    // Щиты
    create("shield", 66, "large_shield", "Башенный щит", "large_shield_s", 10, 6, 70, 28800, 11520);
    create("", 49, undefined, "Щит драконов", undefined);
    create("", 17, "defender_shield", "Щит хранителя", "protectshield_s", 4, 3, 40, 3500, 1360);
    create("", undefined, "s_shield", "Стальной щит", "s_shield_s", 2, 2, 15, 800, 320);
    
    // Обувь
    create("boots", 20, "hunter_boots", "Кожаные сапоги", "hunterboots_s", 4, 1, 30, 2780, 1088);
    create("", 70, undefined, "Лёгкие мифриловые сапоги", undefined);
    create("", 50, undefined, "Стальные сапоги", undefined);
    create("", 28, "shoe_of_initiative", "Туфли стремления", "initboots_s", 5, 3, 7160, 2864);
    create("", 73, undefined, "Тяжёлые мифриловые сапоги", undefined);
    create("", undefined, "boots2", "Боевые сапоги", "boots2_s", 5, 2, 35, 3080, 1232);
    
    // Кольца
    create("ring", 76, "warriorring", "Кольцо воина", "warriorring_s", 10, 5, 40, 15000 + 5 * 180 + 20 * 360, 9240);
    create("ring", 36, "circ_ring", "Кольцо отречения", "circ_ring_s", 6, 4, 50, 12000 + 7 * 3 * 360, 7824);
    create("ring", 59, "powerring", "Кольцо пророка", "powerring_s", 7, 4, 40, 14000 + 5 * 4 * 360, 8480);
    create("ring", 21, "doubt_ring", "Кольцо сомнений", "necroring_s", 4, 2, 12, 5000 + 2 * 360, 2288);
    create("ring", 29, "rashness_ring", "Кольцо стремительности", "hastering_s", 5, 2, 30, 4000 + 5 * 360, 2320);
    create("ring", 67, "darkring", "Кольцо теней", "darkring_s", 10, 5, 50, 18000 + 2 * 10 * 360, 10080);
    create("", 19, undefined, "Перстень вдохновения", undefined);
    create("", undefined, "i_ring", "Кольцо ловкости", "i_ring_s", 2, 1, 10, 500, 200);
    
    // Снадобья
    create("potions", 22, "mana_tube", "Пробирка маны", "smallmana_s", 3, undefined, 1, 200 + 1 * 360);

    // Другое
    create("other", undefined, "hunter_gloves1", "Перчатка охотника", "hunter_gloves1_s", 3, 1, 10, 50, 400);

    // ?
    create(undefined, 64, undefined, "Свиток энергии", undefined);
    
}




/**
* @file class_creature.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Существо
* @param Game game
* @param Number id
* @param String name
* @param String title
*/
function Creature(game, id, name, title) {

    this.game = game;
    this.id = id;
    this.name = name;
    this.title = ustring(title.replace(/^\s*/g, "").replace(/\s*$/g, ""));
    
    this.race = null;
    this.level = null;
    this.attack = null;
    this.defence = null;
    this.dmgMin = null;
    this.dmgMax = null;
    this.hpMax = null;
    this.speed = null;
    this.init = null;
    
}

/** Имеет ли существо указанное имя
* @param String name
*/
Creature.prototype.hasName = function(name) {
    if (this.name === name)
        return true;
    return false;
}

/** Имеет ли существо указанный заголовок
* @param String title
*/
Creature.prototype.hasTitle = function(title) {
    title = ustring(title.replace(/^\s*/g, "").replace(/\s*$/g, ""));
    if (this.title.toLowerCase() === title.toLowerCase())
        return true;
    return false;
}

/** Представление в строке
*/
Creature.prototype.toString = function() {
    return this.title;
}

/** URL информации о существе
*/
Creature.prototype.getInfoURL = function() {
    if (this.name !== undefined)
        return "http://www.heroeswm.ru/army_info.php?name=" + this.name;
    return null;
}

/** Загрузка базы данных существ
* @param Game game
*/
Creature.load = function(game) {

    function create(id, name, title, raceTitle, level, attack, defence, dmgMin, dmgMax, hpMax, speed, init) {
        var creature = new Creature(game, id, name, title);
        if (raceTitle !== undefined)
            creature.race = game.getRaceByTitle(raceTitle);
        creature.level = level;
        creature.attack = attack;
        creature.defence = defence;
        creature.dmgMin = dmgMin;
        creature.dmgMax = dmgMax;
        creature.hpMax = hpMax;
        creature.speed = speed;
        creature.init = init;
        return game.appendCreature(creature);
    }

    create(undefined, "blackdragon", "Чёрные драконы", undefined, 7, 30, 30, 45, 70, 240, 9, 10);
    create(undefined, "titan", "Титаны", undefined, 7, 30, 30, 40, 70, 190, 6, 10);
    create(undefined, "emeralddragon", "Изумрудные драконы", undefined, 7, 31, 27, 33, 57, 200, 9, 14);
    create(undefined, "ancientbehemoth", "Древние бегемоты", "Варвар", 7, 33, 25, 30, 50, 250, 5, 9);
    create(undefined, "archangel", "Архангелы", undefined, 7, 31, 31, 50, 50, 220, 8, 11);
    create(undefined, "greendragon", "Зелёные драконы", undefined, 7, 27, 25, 30, 50, 200, 8, 12);
    create(undefined, "colossus", "Колоссы", undefined, 7, 27, 27, 40, 70, 175, 6, 10);
    create(undefined, "behemoth", "Бегемоты", "Варвар", 7, 30, 22, 30, 50, 210, 5, 9);
    create(undefined, "shadowdragon", "Сумеречные драконы", undefined, 7, 25, 24, 45, 70, 200, 9, 10);
    create(undefined, "angel", "Ангелы", undefined, 7, 27, 27, 45, 45, 180, 6, 11);
    
    create(undefined, "goblin", "Гоблины", "Варвар", 1, 3, 1, 1, 2, 3, 5, 10);
    create(undefined, "hobgoblin", "Хобгоблины", "Варвар", 1, 4, 3, 2, 2, 4, 5, 10);
    create(undefined, "wolfrider", "Наездники на волках", "Варвар", 2, 5, 1, 2, 3, 10, 6, 11);
    create(undefined, "wolfraider", "Налётчики на волках", "Варвар", 2, 7, 3, 2, 3, 12, 6, 11);
    create(undefined, "orc", "Орки", "Варвар", 3, 6, 1, 3, 4, 12, 4, 11);
    create(undefined, "orcchief", "Орки вожди", "Варвар", 3, 9, 4, 4, 6, 18, 5, 11);
    create(undefined, "ogre", "Огры", "Варвар", 4, 10, 5, 5, 10, 50, 4, 8);
    create(undefined, "ogremagi", "Огры маги", "Варвар", 4, 11, 6, 5, 12, 65, 5, 8);
    create(undefined, "rocbird", "Роки", "Варвар", 5, 16, 8, 11, 15, 55, 8, 12);
    create(undefined, "thunderbird", "Птицы грома", "Варвар", 5, 20, 10, 11, 15, 65, 9, 12);
    create(undefined, "cyclop", "Циклопы", "Варвар", 6, 20, 15, 18, 26, 85, 4, 10);
    create(undefined, "cyclopking", "Циклопы короли", "Варвар", 6, 23, 18, 19, 28, 95, 5, 10);
    
}




/**
* @file class_game.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Игра
*/
function Game() {

    this.time = new Date();
    this.items = [];
    this.regions = [];
    this.talents = [];
    this.races = [];
    this.creatures = [];

}

/** Представление в строке
*/
Game.prototype.toString = function() {
    return "Game";
}

/** Возвращает предмет по номеру
* @param Number id
*/
Game.prototype.getItemById = function(id) {
    for (var i = 0; i < this.items.length; i++) 
        if (this.items[i].id == id)
            return this.items[i];
    throw new Error(ustring("Ошибка!\nПредмет не найден по номеру: " + id));
}

/** Возвращает предмет по имени
* @param String name
*/
Game.prototype.getItemByName = function(name) {
    for (var i = 0; i < this.items.length; i++) 
        if (this.items[i].hasName(name) === true)
            return this.items[i];
    throw new Error(ustring("Ошибка!\nПредмет не найден по имени: \"" + name + "\""));
}

/** Возвращает предмет по заголовку
* @param String title
*/
Game.prototype.getItemByTitle = function(title) {
    for (var i = 0; i < this.items.length; i++) 
        if (this.items[i].hasTitle(title) === true)
            return this.items[i];
    throw new Error(ustring("Ошибка!\nПредмет не найден по заголовку: \"" + title + "\""));
}

// getRegion
Game.prototype.getRegionById = function(id) {
    for (var i = 0; i < this.regions.length; i++)
        if (this.regions[i].id == id)
            return this.regions[i];
    throw new Error(ustring("Ошибка!\nРегион не найден по номеру: " + id));
}

Game.prototype.getRegionByXY = function(x, y) {
    for (var i = 0; i < this.regions.length; i++)
        if ((this.regions[i].x == x) && (this.regions[i].y == y))
            return this.regions[i];
    throw new Error(ustring("Ошибка!\nРегион не найден по координатам: " + x + ", " + y));
}

Game.prototype.getRegionByName = function(name) {
    for (var i = 0; i < this.regions.length; i++) 
        if (this.regions[i].hasName(name) === true)
            return this.regions[i];
    throw new Error(ustring("Ошибка!\nРегион не найден по имени: \"" + name + "\""));
}

Game.prototype.getRegionByTitle = function(title) {
    for (var i = 0; i < this.regions.length; i++) 
        if (this.regions[i].hasTitle(title) === true)
            return this.regions[i];
    throw new Error(ustring("Ошибка!\nРегион не найден по заголовку: \"" + title + "\""));
}

// getTalent
Game.prototype.getTalentById = function(id) {
    for (var i = 0; i < this.talents.length; i++) 
        if (this.talents[i].id == id)
            return this.talents[i];
    throw new Error(ustring("Ошибка!\nНавык не найден по номеру: " + id));
}

Game.prototype.getTalentByName = function(name) {
    for (var i = 0; i < this.talents.length; i++) 
        if (this.talents[i].hasName(name) === true)
            return this.talents[i];
    throw new Error(ustring("Ошибка!\nНавык не найден по имени: \"" + name + "\""));
}

Game.prototype.getTalentByTitle = function(title) {
    for (var i = 0; i < this.talents.length; i++) 
        if (this.talents[i].hasTitle(title) === true)
            return this.talents[i];
    throw new Error(ustring("Ошибка!\nНавык не найден по заголовку: \"" + title + "\""));
}

// getRace
Game.prototype.getRaceById = function(id) {
    for (var i = 0; i < this.races.length; i++) 
        if (this.races[i].id == id)
            return this.races[i];
    throw new Error(ustring("Ошибка!\nФракция не найдена по номеру: " + id));
}

Game.prototype.getRaceByName = function(name) {
    for (var i = 0; i < this.races.length; i++) 
        if (this.races[i].hasName(name) === true)
            return this.races[i];
    throw new Error(ustring("Ошибка!\nФракция не найдена по имени: \"" + name + "\""));
}

Game.prototype.getRaceByTitle = function(title) {
    for (var i = 0; i < this.races.length; i++) 
        if (this.races[i].hasTitle(title) === true)
            return this.races[i];
    throw new Error(ustring("Ошибка!\nФракция не найдена по заголовку: \"" + title + "\""));
}

// getCreature
Game.prototype.getCreatureById = function(id) {
    for (var i = 0; i < this.creatures.length; i++) 
        if (this.creatures[i].id == id)
            return this.creatures[i];
    throw new Error(ustring("Ошибка!\nСущество не найдено по номеру: " + id));
}

Game.prototype.getCreatureByName = function(name) {
    for (var i = 0; i < this.creatures.length; i++) 
        if (this.creatures[i].hasName(name) === true)
            return this.creatures[i];
    throw new Error(ustring("Ошибка!\nСущество не найдено по имени: \"" + name + "\""));
}

Game.prototype.getCreatureByTitle = function(title) {
    for (var i = 0; i < this.creatures.length; i++) 
        if (this.creatures[i].hasTitle(title) === true)
            return this.creatures[i];
    throw new Error(ustring("Ошибка!\nСущество не найдено по заголовку: \"" + title + "\""));
}

// getObject
Game.prototype.getObjectById = function(id) {
    for (var i = 0; i < this.regions.length; i++) 
        for (var j = 0; j < this.regions[i].objects.length; j++)
            if (this.regions[i].objects[j].id == id)
                return this.regions[i].objects[j];
    throw new Error(ustring("Ошибка!\nОбъект не найден по номеру: " + id));
}

// append
Game.prototype.appendItem = function(item) {
    return this.items[this.items.length] = item;
}

Game.prototype.appendRegion = function(region) {
    return this.regions[this.regions.length] = region;
}

Game.prototype.appendTalent = function(talent) {
    return this.talents[this.talents.length] = talent;
}

Game.prototype.appendRace = function(race) {
    return this.races[this.races.length] = race;
}

Game.prototype.appendCreature = function(creature) {
    return this.creatures[this.creatures.length] = creature;
}


Game.load = function(game) {

    Item.load(game);
    Art.load(game);
    Region.load(game);
    Talent.load(game);
    Race.load(game);
    Creature.load(game);

}




/**
* @file class_hero.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Герой
* @param Game game
* @param Number id 
* @param String title
*/
function Hero(game, id, title) {

    this.game = game;
    this.id = id;
    this.title = ustring(title);
    this.balance = new Price(this.game);
    
    this.level = null;
    this.exp = null;
    this.hp = null;
    this.hpMax = 100;
    this.mp = null;
    this.mpMax = null;
    this.region = null;
    this.race = null;
    this.talents = [];
    this.army = [];
    this.equipment = [];
    
}

Hero.prototype.toString = function() {
    return "Hero(" + this.id + ")";
}

Hero.prototype.loadBalance = function() {
    for (var i = 0; i < this.game.items.length; i++) {
        var id = this.game.items[i].id;
        this.loadItemCountById(id);
        this.loadItemCountMinById(id);
        this.loadItemCountMaxById(id);
    }
}

Hero.prototype.loadItemCountById = function(id) {
    var result = this.balance.getCountById(id);
    if (result === undefined) {
        var key = "hero_" + this.id + "_item_" + id + "_count";
        result = GM_getValue(key, 0);
        this.saveItemCountById(id, result);
    }
    return Number(result);
}

Hero.prototype.loadItemCountMinById = function(id) {
    var result = this.balance.getCountMinById(id);
    if (result === undefined) {
        var key = "hero_" + this.id + "_item_" + id + "_count_min";
        result = GM_getValue(key, -1);
        this.saveItemCountMinById(id, result);
    }
    return Number(result);
}

Hero.prototype.loadItemCountMaxById = function(id) {
    var result = this.balance.getCountMaxById(id);
    if (result === undefined) {
        var key = "hero_" + this.id + "_item_" + id + "_count_max";
        result = GM_getValue(key, -1);
        this.saveItemCountMaxById(id, result);
    }
    return Number(result);
}

Hero.prototype.saveItemCountById = function(id, count) {
    this.balance.setCountById(id, count);
    var key = "hero_" + this.id + "_item_" + id + "_count";
    GM_setValue(key, count);
}

Hero.prototype.saveItemCountMinById = function(id, count) {
    this.balance.setCountMinById(id, count);
    var key = "hero_" + this.id + "_item_" + id + "_count_min";
    GM_setValue(key, count);
}

Hero.prototype.saveItemCountMaxById = function(id, count) {
    this.balance.setCountMaxById(id, count);
    var key = "hero_" + this.id + "_item_" + id + "_count_max";
    GM_setValue(key, count);
}

Hero.prototype.changeItemCountById = function(id, count) {
    this.saveItemCountById(id, this.loadItemCountById(id) + Number(count));
}




/**
* @file class_item.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Предмет
* @param Game game
* @param String category
* @param Number id
* @param String name
* @param String title
* @param Number cost
*/
function Item(game, category, id, name, title, cost) {

    this.game = game;
    this.category = category;
    this.id = id;
    this.name = name;
    this.title = ustring(title.replace(/^\s*/g, "").replace(/\s*$/g, ""));
    this.cost = cost;
    this.icon = null;

}

Item.prototype.hasName = function(name) {
    if (this.name === name)
        return true;
    return false;
}

Item.prototype.hasTitle = function(title) {
    title = ustring(title.replace(/^\s\t*/g, "").replace(/\s\t*$/g, ""));
    if (this.title.toLowerCase() === title.toLowerCase())
        return true;
    return false;
}

Item.prototype.toString = function() {
    return this.title;
}

Item.prototype.getCost = function(def) {
    def = (def === undefined) ? 0 : def;
    if (this.cost === undefined)
        return def;
    return Number(this.cost);
}

Item.prototype.iconURL = function() {
    if (this.icon === undefined)
        return null;
    return "http://im.heroeswm.ru/i/" + this.icon + ".gif";
}

/*
    sort - Сортировать по
        0 - По умолчанию
        1 - Время: Завершающиеся
        2 - Время: Новые предложения
        3 - Цена: По убыванию
        4 - Цена: По возрастанию
    sbn - Купить сразу
    sau - Торги
*/
Item.prototype.auctionURL = function(sort, sbn, sau) {
    var baseURL = "http://www.heroeswm.ru/auction.php";
    var params = [];
    if (this.category === undefined) return null; else params[params.length] = "cat=" + this.category;
    if (this.name === undefined) return null; else params[params.length] = "art_type=" + this.name;
    if (sort === undefined) params[params.length] = "sort=0"; else params[params.length] = "sort=" + sort;
    if (sbn === true) params[params.length] = "sbn=1";
    if (sbn === false) params[params.length] = "sbn=0";
    if (sau === true) params[params.length] = "sau=1";
    if (sau === false) params[params.length] = "sau=0";
    var result = baseURL;
    for (var i = 0; i < params.length; i++)
        if (i === 0) result += "?" + params[i]; else result += "&" + params[i];
    return result;
}

Item.load = function(game) {

    function create(category, id, name, title, cost, icon) {
        var item = new Item(game, category, id, name, title, cost);
        if (icon !== undefined)
            item.icon = icon;
        return game.appendItem(item);
    }
    
    create(undefined, 0, undefined, "Золото", 1, "gold");
    create("res", 1, undefined, "Древесина", 180, "wood");
    create("res", 2, undefined, "Руда", 180, "ore");
    create("res", 3, undefined, "Ртуть", 360, "mercury");
    create("res", 4, undefined, "Сера", 360, "sulphur");
    create("res", 5, undefined, "Кристаллы", 360, "crystal");
    create("res", 6, undefined, "Самоцветы", 360, "gem");
    create(undefined, 8,  undefined, "Кожа", 180);
    create(undefined, 9,  undefined, "Сталь", 760);
    create(undefined, 10, undefined, "Никель", 1700);
    create(undefined, 11, undefined, "Волшебный порошок", 2075);
    create(undefined, 55, undefined, "Мифрил", 3325);
    create(undefined, 77, undefined, "Мифриловая руда", 460);
    create(undefined, 79, undefined, "Бриллиант", 15000, "b_diamond");
    create(undefined, 80, undefined, "Обсидиан", 2000);
    create(undefined, 81, undefined, "Орихалк", 11000);

}




/**
* @file class_object.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Объект
* @param Region region
* @param Number id
*/
function Object(region, id) {

    this.region = region;
    this.id = id;
    this.type = null;
    this.changeTime = null;
    this.placesBusy = null;
    this.placesFree = null;
    this.balance = null;
    this.payment = null;
    this.offers = [];

}

Object.prototype.toString = function() {
    var result = "Объект";
    result += "\nТип: " + this.type;
    result += "\nРайон: " + this.region;
    result += "\nБаланс: " + this.balance;
    result += "\nЗарплата: " + this.payment;
    if (this.changeTime instanceof Date)
        result += "\nОкончание смены: " + this.changeTime.toLocaleTimeString();
    result += "\nСвободных мест: " + this.placesFree;
    result += "\nПредложения: ";
    if (this.offers.length > 0)
        for (var i = 0; i < this.offers.length; i++)
            result += "\n\t" + this.offers[i];
    return ustring(result);
}

Object.prototype.placesTotal = function(def) {
    if ((this.placesBusy !== null) && (this.placesFree !== null)) 
        return this.placesBusy + this.placesFree;
    if (this.placesBusy !== null)
        return this.placesBusy;
    if (this.placesFree !== null)
        return this.placesFree;
    return def;
}

Object.prototype.appendOffer = function(offer) {
    this.offers[this.offers.length] = offer;
    return this.offers[this.offers.length - 1];
}

Object.prototype.removeOffers = function() {
    this.offers = [];
}




/**
* @file class_offer.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Сделка
*/
function Offer() {

    this.item = null;
    this.count = null;
    this.price = null;

}

Offer.prototype.toString = function() {
    var result = this.count + " " + this.item + ", " + this.price + " за 1 шт.";
    return ustring(result);
}




/**
* @file class_object_offer.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Сделка объекта
* @param Object object
*/
function ObjectOffer(object) {
    
    this.object = object;
    this.form = null;
    this.row = null;
    this.count = null;
    this.price = null;

}

ObjectOffer.extends(Offer);

/** Активно ли предложение
*/
ObjectOffer.prototype.isActive = function() {
    if (this.form !== null)
        if (this.form.elements.length > 0)
            return true;
    return false;
}

/** Представление в строке
*/
ObjectOffer.prototype.toString = function() {
    var result = this.item + " за " + this.price;
    return ustring(result);
}

/** Чтение разрешения пользователя
* @param Boolean def
*/
ObjectOffer.prototype.loadIsEnabled = function(def) {
    /*
    if (def === undefined)
        if (this instanceof ObjectOfferBuy)
            def = true;
        else
            def = false;
    var key = "object_" + this.object.id + "_item_" + this.item.id + "_enabled";
    return Boolean(GM_getValue(key, def));
    */
    return true;
}

/** Запись разрешения пользователя
* @param Boolean val
*/
ObjectOffer.prototype.saveIsEnabled = function(val) {
    var key = "object_" + this.object.id + "_item_" + this.item.id + "_enabled";
    GM_setValue(key, val);
}

/** Чтение количества реализованного товара
*/
ObjectOffer.prototype.loadCount = function() {
    var key = "object_" + this.object.id + "_item_" + this.item.id + "_count";
    return Number(GM_getValue(key, 0));
}

/** Запись количества реализованного товара
* @param Number count
*/
ObjectOffer.prototype.saveCount = function(count) {
    var key = "object_" + this.object.id + "_item_" + this.item.id + "_count";
    GM_setValue(key, count);
}

/** Изменение количества реализованного товара
* @param Number count
*/
ObjectOffer.prototype.changeCount = function(count) {
    var key = "object_" + this.object.id + "_item_" + this.item.id + "_count";
    this.saveCount(this.loadCount() + Number(count));
}

/** Количество подлежащего реализации товара
* @param Price heroBalance
*/
ObjectOffer.prototype.getCount = function(heroBalance) {
    return this.count;
}




/**
* @file class_object_offer_buy.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Сделка объекта о покупке
* @param Object object
*/
function ObjectOfferBuy(object) {

    this.constructor.parent.prototype.constructor.apply(this, arguments);
    this.object = object;
    this.rate = null;
    this.countHero = null;

}

ObjectOfferBuy.extends(ObjectOffer);

/** Представление в строке
*/
ObjectOfferBuy.prototype.toString = function() {
    var result = this.item + " за " + this.price + " (" + this.count.toFixed(0) + " требуется, " + this.countHero.toFixed(0) + " в наличии)";
    if (this.isActive())
        return ustring("Продажа: " + result);
    return ustring("Продажа недоступна: " + result);
}





/**
* @file class_object_offer_sell.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Сделка объекта о продаже
* @param Object object
*/
function ObjectOfferSell(object) {
    
    this.constructor.parent.prototype.constructor.apply(this, arguments);
    this.object = object;
    
}

ObjectOfferSell.extends(ObjectOffer);

/** Представление в строке
*/
ObjectOfferSell.prototype.toString = function() {
    var result = this.item + " за " + this.price + " (" + this.count.toFixed(0) + " в наличии)";
    if (this.isActive())
        return ustring("Покупка: " + result);
    return ustring("Покупка недоступна: " + result);
}

/** Количество подлежащего реализации товара
* @param Price heroBalance
*/
ObjectOfferSell.prototype.getCount = function(heroBalance) {
    
    function toMax(maxCount) {
        var count = Math.max(0, Math.min(offerCount, maxCount - heroCount));
        var count = Math.min(count, Math.floor(Math.max(0, heroGold - heroGoldMin) / cost));
        return count;
    }
    
    var offerCount = this.count;
    var heroCount = heroBalance.getCountById(this.item.id);
    var itemId = this.item.id;
    var cost = this.price.getCost();
    var heroGold = heroBalance.getCountById(0);
    var heroGoldMin = Number(GM_getValue("hero_gold_min", 0));
    
    switch (itemId) {
        
        // Древесина
        case 1:
            if (cost <= 180) return toMax(100);
            if (cost <= 181) return toMax(25);
            if (cost <= 182) return toMax(5);
            return toMax(0);
            
        // Руда
        case 2:
            if (cost <= 180) return toMax(100);
            if (cost <= 181) return toMax(5);
            return toMax(0);

        // Ртуть
        case 3:
            if (cost <= 359) return toMax(50);
            if (cost <= 360) return toMax(10);
            if (cost <= 361) return toMax(5);
            return toMax(0);
            

        // Сера
        case 4:
            if (cost <= 359) return toMax(50);
            if (cost <= 360) return toMax(10);
            if (cost <= 361) return toMax(5);
            return toMax(0);
            
        // Кристаллы
        case 5:
            if (cost <= 359) return toMax(50);
            if (cost <= 360) return toMax(10);
            if (cost <= 361) return toMax(5);
            return toMax(0);
            
        // Самоцветы
        case 6:
            if (cost <= 359) return toMax(50);
            if (cost <= 360) return toMax(10);
            if (cost <= 361) return toMax(5);
            return toMax(0);
            
        // Кожа
        case 8:
            if (cost <= 179) return toMax(25);
            if (cost <= 180) return toMax(5);
            return toMax(0);
            
        // Сталь
        case 9:
            if (cost <= 755) return toMax(25);
            if (cost <= 760) return toMax(5);
            return toMax(0);
            
        // Никель
        case 10:
            if (cost <= 1696) return toMax(10);
            if (cost <= 1697) return toMax(5);
            if (cost <= 1700) return toMax(1);
            return toMax(0);
            
        // Волшебный порошок
        case 11:
            if (cost <= 2073) return toMax(5);
            if (cost <= 2075) return toMax(2);
            return toMax(0);
            
        // Мифрил
        case 55:
            if (cost <= 3325) return toMax(2);
            return toMax(0);

        // Мифриловая руда
        case 77:
            if (cost <= 460) return toMax(5);
            return toMax(0);
            
        // Default
        default:
            return toMax(0);

    }
    
}




/**
* @file class_talent.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Способность
* @param Game game
* @param Number id
* @param String name
* @param String title
*/
function Talent(game, id, name, title) {

    this.game = game;
    this.id = id;
    this.name = name;
    this.title = ustring(title.replace(/^\s*/g, "").replace(/\s*$/g, ""));

}

Talent.prototype.hasName = function(name) {
    if (this.name === name)
        return true;
    return false;
}

Talent.prototype.hasTitle = function(title) {
    title = ustring(title.replace(/^\s*/g, "").replace(/\s*$/g, ""));
    if (this.title.toLowerCase() === title.toLowerCase())
        return true;
    return false;
}

Talent.prototype.toString = function() {
    return this.title;
}


Talent.load = function(game) {

    function create(id, name, title) {
        var talent = new Talent(game, id, name, title);
        return game.appendTalent(talent);
    }

    // race
    create(undefined, "barb_skill", "Пробивающая мощь");
    create(undefined, "knight_mark", "Надзор");
    create(undefined, "necr_soul", "Духовная связь");
    create(undefined, "runeadv", "Дополнительные руны");
    
    // attack
    create(undefined, "attack1", "Основы нападения");
    create(undefined, "attack2", "Развитое нападение");
    create(undefined, "attack3", "Искусное нападение");
    create(undefined, "battle_frenzy", "Боевое безумие");
    create(undefined, "archery", "Стрельба");
    create(undefined, "cold_steel", "Холодная сталь");
    create(undefined, "tactics", "Тактика");
    create(undefined, "retribution", "Воздаяние");
    create(undefined, "power_of_speed", "Мастерство скорости");
    
    // defense
    create(undefined, "defense1", "Основы защиты");
    create(undefined, "defense2", "Развитая защита");
    create(undefined, "defense3", "Искусная защита");
    create(undefined, "vitality", "Стойкость");
    create(undefined, "evasion", "Уклонение");
    create(undefined, "last_stand", "Битва до последнего");
    create(undefined, "protection", "Сопротивление магии");
    
    // luck
    create(undefined, "luck1", "Призрачная удача");
    create(undefined, "luck2", "Большая удача");
    create(undefined, "luck3", "Постоянная удача");
    create(undefined, "soldier_luck", "Солдатская удача");
    
    // leadership
    create(undefined, "leadership1", "Основы лидерства");
    create(undefined, "leadership2", "Развитое лидерство");
    create(undefined, "leadership3", "Искусное лидерство");
    create(undefined, "recruitment", "Сбор войск");
    create(undefined, "divine_guidance", "Воодушевление");
    create(undefined, "aura_of_swiftness", "Аура скорости");
    
    // enlightenment
    create(undefined, "enlightenment1", "Начальное образование");
    create(undefined, "enlightenment2", "Среднее образование");
    create(undefined, "enlightenment3", "Высшее образование");
    create(undefined, "intelligence", "Притяжение маны");
    
    // sorcery
    create(undefined, "sorcery1", "Основы чародейства");
    create(undefined, "sorcery3", "Искусное чародейство");
    create(undefined, "mana_regeneration", "Восполнение маны");
    create(undefined, "arcane_training", "Тайные знания");
    create(undefined, "arcane_excellence", "Тайное преимущество");
    
    // summon
    create(undefined, "summon1", "Основы магии Природы");
    create(undefined, "summon3", "Искусная магия Природы");
    
    // destructive
    create(undefined, "destructive3", "Искусная магия Хаоса");
    
    // light
    create(undefined, "light3", "Искусная магия Света");
    create(undefined, "master_of_blessings", "Дарующий благословение");
    create(undefined, "master_of_abjuration", "Дарующий защиту");
    create(undefined, "master_of_wrath", "Повелитель ярости");
    
    // dark
    create(undefined, "dark1", "Основы магии Тьмы");
    create(undefined, "dark3", "Искусная магия Тьмы");
    create(undefined, "master_of_pain", "Повелитель боли");
    create(undefined, "master_of_mind", "Повелитель разума");
    
}




/**
* @file class_price.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Цена
* 
* Цена как требуемое количество ресурсов.
* @param Game game
*/
function Price(game) {

    this.game = game;
    this.resources = [];
    
}

Price.prototype.toString = function() {
    var s = "";
    for (var i = 0; i < this.resources.length; i++)
        s += this.resources[i] + ", ";
    return s.substr(0, s.length - 2);
}

Price.prototype.getCost = function(def) {
    def = (def === undefined) ? 0 : def;
    var result = 0;
    for (var i = 0; i < this.resources.length; i++)
        result += this.resources[i].getCost();
    return result;
}

Price.prototype.appendResource = function(resource) {
    this.resources[this.resources.length] = resource;
}

Price.prototype.getResourceById = function(id) {
    for (var i = 0; i < this.resources.length; i++)
        if (this.resources[i].item.id == id)
            return this.resources[i];
    return undefined;
}

Price.prototype.getResourceByTitle = function(title) {
    return this.getResourceById(this.game.getItemByTitle(title).id);
}

Price.prototype.getCountById = function(id, def) {
    var resource = this.getResourceById(id);
    if (resource == undefined)
        return def;
    return resource.getCount(def);
}

Price.prototype.getCountByTitle = function(title, def) {
    return this.getCountById(this.game.getItemByTitle(title).id, def);
}

Price.prototype.getCountMinById = function(id, def) {
    var resource = this.getResourceById(id);
    if (resource == undefined)
        return def;
    return resource.getCountMin(def);
}

Price.prototype.getCountMinByTitle = function(title, def) {
    return this.getCountMinById(this.game.getItemByTitle(title).id, def);
}

Price.prototype.getCountMaxById = function(id, def) {
    var resource = this.getResourceById(id);
    if (resource == undefined)
        return def;
    return resource.getCountMax(def);
}

Price.prototype.getCountMaxByTitle = function(title, def) {
    return this.getCountMaxById(this.game.getItemByTitle(title).id, def);
}

Price.prototype.getCountToMinById = function(id, def) {
    var resource = this.getResourceById(id);
    if (resource == undefined) 
        return def;
    return resource.getCountToMin(def);
}

Price.prototype.getCountToMinByTitle = function(title, def) {
    return this.getCountToMinById(this.game.getItemByTitle(title).id, def);
}

Price.prototype.getCountToMaxById = function(id, def) {
    var resource = this.getResourceById(id);
    if (resource == undefined) 
        return def;
    return resource.getCountToMax(def);
}

Price.prototype.getCountToMaxByTitle = function(title, def) {
    return this.getCountToMaxById(this.game.getItemByTitle(title).id, def);
}

Price.prototype.setCountById = function(id, count) {
    var resource = this.getResourceById(id);
    if (resource != undefined) {
        resource.setCount(count);
    } else {
        var item = this.game.getItemById(id);
        this.appendResource(new Resource(item, count));
    }
}

Price.prototype.setCountByTitle = function(title, count) {
    this.setCountById(this.game.getItemByTitle(title).id, count);
}

Price.prototype.setCountMinById = function(id, count) {
    var resource = this.getResourceById(id);
    if (resource != undefined) {
        resource.setCountMin(count);
    } else {
        var item = this.game.getItemById(id);
        this.appendResource(new Resource(item, undefined, count, undefined));
    }
}

Price.prototype.setCountMinByTitle = function(title, count) {
    this.setCountMinById(this.game.getItemByTitle(title).id, count);
}

Price.prototype.setCountMaxById = function(id, count) {
    var resource = this.getResourceById(id);
    if (resource != undefined) {
        resource.setCountMax(count);
    } else {
        var item = this.game.getItemById(id);
        this.appendResource(new Resource(item, undefined, undefined, count));
    }
}

Price.prototype.setCountMaxByTitle = function(title, count) {
    this.setCountMaxById(this.game.getItemByTitle(title).id, count);
}

Price.clone = function(price) {
    var result = new Price(price.game);
    for (var i = 0; i < price.resources.length; i++)
        result.appendResource(
            Resource.clone(price.resources[i])
        );
    return result;
}


Price.sum = function(price1, price2) {
    var result = Price.clone(price1);
    for (var i = 0; i < price2.resources.length; i++) {
        var id = price2.resources[i].item.id;
        result.setCountById(
            id,
            Number(result.getCountById(id, 0)) + 
            Number(price2.getCountById(id, 0))
        );
    }
    return result;
}


Price.inc = function(price, count) {
    var result = Price.clone(price);
    for (var i = 0; i < result.resources.length; i++)
        result.resources[i].count = result.resources[i].count * count;
    return result;
}


Price.fromNode = function(game, node) {
    var result = new Price(game);
    
    var cells = node.getElementsByTagName("td");
    if (cells.length > 0) {
        for (var i = 0; i < cells.length; i = i + 2) {
            var title = cells[i].getElementsByTagName("img")[0].title;
            var item = game.getItemByTitle(title);
            var count = Number(cells[i + 1].innerHTML.replace(/\D/g, ""));
            result.appendResource(new Resource(item, count));
        }
        return result;
    }
    
    var item = game.getItemByTitle(ustring("Золото"));
    var count = Number(node.textContent.match(/\d+/)[0]);
    result.appendResource(new Resource(item, count));
    return result;
    
}


Price.updateNode = function(price, node) {
    var cells = node.getElementsByTagName("td");
    if (cells.length > 0) {
        for (var i = 0; i < cells.length; i += 2) {
            
            var title = cells[i].getElementsByTagName("img")[0].title;
            var count = price.getCountByTitle(title);
            if (count === undefined)
                continue;
            
            var j = 0;
            count = String(count);
            while (count.length > 3 + j * (1 + 3)) {
                var left = count.substr(0, count.length - 3 - j * (1 + 3));
                var right = count.substr(-3 - j * (1 + 3));
                count = left + "," + right;
                j++;
            }
            
            cells[i + 1].textContent = count;
            
        }
    }
}




/**
* @file class_race.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Фракция
* @param Game game
*/
function Race(game, id, name, title, icon) {

    this.game = game;
    this.id = id;
    this.name = name;
    this.title = ustring(title.replace(/^\s*/g, "").replace(/\s*$/g, ""));
    this.icon = icon;
    this.talents = [];

}

Race.prototype.hasName = function(name) {
    if (this.name === name)
        return true;
    return false;
}

Race.prototype.hasTitle = function(title) {
    title = ustring(title.replace(/^\s*/g, "").replace(/\s*$/g, ""));
    if (this.title.toLowerCase() === title.toLowerCase())
        return true;
    return false;
}

Race.prototype.toString = function() {
    return this.title;
}

Race.prototype.appendTalent = function(talent, cost) {
    var result = {talent: talent, cost: cost};
    this.talents[this.talents.length] = result;
    return result;
}

Race.load = function(game) {

    function create(id, name, title, icon, talents) {
        var race = new Race(game, id, name, title, icon);
        for (var i = 0; i < talents.length; i++) {
            race.appendTalent(
                game.getTalentByTitle(talents[i].title),
                talents[i].cost
            );
        }
        return game.appendRace(race);
    }

    create(1, "Knight", "Рыцарь", "r1", []);
    
    create(2, "Necromancer", "Некромант", "r2", []);
    
    create(3, "Wizard", "Маг", "r3", []);
    
    create(4, "Elf", "Эльф", "r4", []);
    
    create(5, "Barbarian", "Варвар", "r5", 
        [
            {title: "Основы нападения", cost: 7}, 
            {title: "Пробивающая мощь", cost: 7}
        ]
    );
    
    create(6, "Dark elf", "Темный эльф", "r6", []);
    
    create(7, "Demon", "Демон", "r7", []);
    
    create(8, "Gnome", "Гном", "r8", []);

}




/**
* @file class_region.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Регион
* @param Game game
*/
function Region(game, id, x, y, name, title) {

    this.game = game;
    this.id = id;
    this.x = x;
    this.y = y;
    this.name = name;
    this.title = ustring(title.replace(/^\s*/g, "").replace(/\s*$/g, ""));
    this.objects = [];

}

Region.prototype.hasName = function(name) {
    if (this.name === name)
        return true;
    return false;
}

Region.prototype.hasTitle = function(title) {
    title = ustring(title.replace(/^\s*/g, "").replace(/\s*$/g, ""));
    if (this.title.toLowerCase() === title.toLowerCase())
        return true;
    return false;
}

Region.prototype.toString = function() {
    return this.title;
}

Region.prototype.appendObject = function(object) {
    this.objects[this.objects.length] = object;
}

Region.prototype.getObjectById = function(id) {
    for (var i = 0; i < this.objects.length; i++)
        if (this.objects[i].id == id)
            return this.objects[i];
    throw new Error(ustring("Ошибка!\nОбъект не найден по номеру: " + id));
}
    

Region.load = function(game) {
    
    function create(id, x, y, name, title, objects) {
        var region = new Region(game, id, x, y, name, title);
        for (var i = 0; i < objects.length; i++)
            region.appendObject(
                new Object(region, objects[i])
            );
        return game.appendRegion(region);
    }
    
    create(undefined, 48, 49, "Sunny City", "Солнечный Город", [103, 104, 105, 106, 107, 115, 116]);
    create(12, 49, 49, "Shining Spring", "Сияющий Родник", [108, 109, 110, 111, 112, 113, 114, 117]);
    create(1, 50, 50, "Empire Capital", "Столица Империи", [3, 4, 5, 6, 7, 8, 9, 10, 11, 12,32, 34, 38, 165]);
    create(8, 49, 50, "Green Wood", "Зелёный Лес", [69, 70, 72, 67, 68, 71, 76, 77, 81, 88]);
    create(undefined, 49, 51, "Lizard's Lowland", "Равнина Ящеров", [56, 57, 58, 59, 60, 61, 63, 64, 80, 83]);
    create(undefined, 50, 51, "Wolf's Dale", "Долина Волков", [43, 44, 45, 46, 47, 48, 74, 85, 86]);
    create(undefined, 50, 52, "Portal's Ruins", "Руины Портала", [92, 93, 99, 100, 102, 118, 163]);
    create(undefined, 51, 50, "East River", "Восточная Река", [23, 24, 25, 26, 28, 33, 36, 75, 87, 89]);
    create(undefined, 52, 50, "Magma Mines", "Магма Шахты", [121, 122, 135, 142, 143, 144, 145, 164]);
    create(17, 53, 50, "Port City", "Портовый Город", [131, 132, 133, 158, 159, 160, 161, 162]);
    create(undefined, 53, 49, "Mythril Coast", "Мифриловый Берег", [128, 129, 130, 137, 138, 154, 155, 156, 157]);
    create(15, 52, 49, "Bear Mountain", "Медвежья Гора", [123, 124, 125, 136, 146, 147, 148, 149]);
    create(undefined, 52, 48, "Fairy Trees", "Магический Лес", [126, 127, 134, 150, 151, 152, 153]);
    create(4, 51, 49, "Rogue's Wood", "Лес Разбойников", [18, 19, 20, 21, 22, 30, 37, 78, 90]);
    create(3, 50, 49, "Tiger's Lake", "Тигриное Озеро", [13, 14, 15, 16, 27, 31, 35, 39, 84]);
    create(undefined, 50, 48, "Peaceful Camp", "Мирный Лагерь", [49, 50, 51, 52, 53, 54, 55, 73, 79, 82, 141]);
    create(9, 49, 48, "Eagle's Nest", "Орлиное Гнездо", [94, 95, 97, 98, 101, 119, 120, 139, 140]);
    create(undefined, 52, 53, "Fishing village", "Рыбачье Село", [166]);
    create(undefined, 52, 54, "Kingdom Castle", "Замок Королевства", []);
    create(undefined, 51, 53, "Titans' Valley", "Равнина Титанов", []);
    create(undefined, 51, 52, "Great Wall", "Великая Стена", []);
    create(undefined, 51, 51, "Dragons's caves", "Пещеры Драконов", []);
    create(undefined, 51, 48, "Crystal Garden", "Кристальный сад", [367, 368, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394]);

}




/**
* @file class_resource.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Ресурс
*
* Ресурс как количество предметов.
* @param Item item
* @param Number count
* @param Number countMin
* @param Number countMax
*/
function Resource(item, count, countMin, countMax) {

    this.item = item;
    this.setCount(count);
    this.setCountMin(countMin);
    this.setCountMax(countMax);
    
}

Resource.prototype.toString = function() {
    return this.count + " " + this.item.title;
}

Resource.prototype.getCount = function(def) {
    if (this.count == undefined)
        return def;
    return Number(this.count);
}

Resource.prototype.getCost = function(def) {
    def = (def === undefined) ? 0 : def;
    var cost = this.item.getCost();
    var count = this.getCount();
    if (cost === undefined)
        return def;
    if (count === undefined)
        return def;
    return Number(cost * count);
}

Resource.prototype.getCountMin = function(def) {
    if (this.countMin === undefined)
        return def;
    return Number(this.countMin);
}

Resource.prototype.getCountMax = function(def) {
    if (this.countMax === undefined)
        return def;
    return Number(this.countMax);
}

Resource.prototype.getCountToMin = function(def) {
    if (this.countMin === undefined)
        return def;
    return this.getCount(0) - Number(this.countMin);
}

Resource.prototype.getCountToMax = function(def) {
    if (this.countMax === undefined)
        return def;
    return Number(this.countMax) - this.getCount(0);
}

Resource.prototype.setCount = function(count) {
    this.count = count;
}

Resource.prototype.setCountMin = function(count) {
    if (Number(count) >= 0)
        this.countMin = Number(count);
    else
        this.countMin = undefined;
}

Resource.prototype.setCountMax = function(count) {
    if (Number(count) >= 0)
        this.countMax = Number(count);
    else
        this.countMax = undefined;
}

Resource.clone = function(resource) {
    return new Resource(
        resource.item, 
        resource.count, 
        resource.countMin, 
        resource.countMax
    );
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
* @file page_home.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Домашняя страница
* @param Document doc
* @param Game game
* @link http://www.heroeswm.ru/home.php
*/
function PageHome(doc, game) {

    this.constructor.parent.prototype.constructor.apply(this, arguments);
    
    this.heroId = null;

    this.nodes.content = null;
    this.nodes.tableHome = null;
    this.nodes.tableBase = null;

}

PageHome.extends(Page);

/** Парсинг
*/
PageHome.prototype.parse = function() {

    if (!this.constructor.parent.prototype.parse.apply(this, arguments))
        return false;

    try {
    
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

/** Парсинг содержимого
*/
PageHome.prototype.parseContent = function() {
    try {
    
        var xpath = "/html/body/center/table/tbody/tr/td";
        var xpathRes = this.doc.evaluate(xpath, this.doc, null, XPathResult.ANY_TYPE, null);
        var node = xpathRes.iterateNext();
        if (node == null) throw new Error(ustring("Узел по пути '" + xpath + "' не найден"));
        this.nodes.content = node;
        
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
        
        // Первой и единственной должна идти домашняя таблица
        if (!this.parseTableHome(tables[i]))
            throw new Error(ustring("Домашняя таблица не найдена"));
        i++;
    
    } catch (e) {
        
        GM_log(
            this + ".parseContent" + "\n" +
            (new Date()).toLocaleTimeString() + "\n" +
            e
        );
        return false;
        
    }
    
    return true;
}

/** Парсинг домашней таблицы
* @param Node table
*/
PageHome.prototype.parseTableHome = function(table) {
    
    if (table.rows.length === 0)
        return false;
    
    var table = table.rows[1].cells[0].getElementsByTagName("TABLE")[0];
    if (!this.parseTableBase(table))
        return false;
    
    this.nodes.tableHome = table;
    return true;
}

/** Парсинг базовой таблицы
*
* То есть таблицы с имненем героя, его ровнем, умениями и рейтингами в гильдиях.
* @param Node table
*/
PageHome.prototype.parseTableBase = function(table) {
    
    try {
    
        var ref = table.rows[0].cells[0].getElementsByTagName("CENTER")[0].getElementsByTagName("A")[0];
        var ref = Page.parsePlayerURL(ref.href);
        if (ref === null)
            throw new Error(ustring("Не могу найти имя игрока"));
        this.heroId = ref.id;
        if (this.hero !== undefined)
            this.hero.id = this.heroId;
        
        this.nodes.tableBase = table;
        return true;
    
    } catch (e) {
        
        GM_log(this + "\n" + e);
        return false;
    
    }
}

/** Представление в строке
*/
PageHome.prototype.toString = function() {
    return "PageHome()";
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
* @file engine_object_offers.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/

/** Движок для автоматического заключения сделок
* @param Game game
* @param Page page
*/
function EngineObjectOffers(game, page) {

    this.id = EngineObjectOffers.id++;
    this.game = game;
    this.page = page;
    
    this.randTimeDist = new DistNormal(60, 5);
    this.lastTimeBuy = new Date(Number(GM_getValue("lastTimeBuy", 0)) * 1000);
    this.lastTimeSell = new Date(Number(GM_getValue("lastTimeSell", 0)) * 1000);
    
    this.batchDeal = Boolean(GM_getValue("batchDeal", true));
    this.sortDeal = Boolean(GM_getValue("sortDeal", false));
    this.timeMod = Number(GM_getValue("timeMod", 1.0));
    this.waitHeroResource = Number(GM_getValue("waitHeroResource", 5.0));
    this.waitHeroBalance = Number(GM_getValue("waitHeroBalance", 10.0));
    this.waitHeroPlaces = Number(GM_getValue("waitHeroPlaces", 10.0));
    this.waitObjectBalance = Number(GM_getValue("waitObjectBalance", 5.0));
    this.waitObjectPlaces = Number(GM_getValue("waitObjectPlaces", 0.01));
    this.waitChange = Number(GM_getValue("waitChange", 0.1));
    this.waitOfferDisabled = Number(GM_getValue("waitOfferDisabled", 0.1));
    this.waitTimeBuy = Number(GM_getValue("waitTimeBuy", 10.0));
    this.waitTimeSell = Number(GM_getValue("waitTimeSell", 10.0));
    
}

EngineObjectOffers.id = 0;

EngineObjectOffers.prototype.randomTime = function() {
    var result = this.randTimeDist.genValue12() * 1000 * this.timeMod;
    if (result < 1)
        result = 1;
    return result;
}

EngineObjectOffers.prototype.timeStr = function(time) {
    if (time instanceof Date)
        return time.toLocaleTimeString();
    return ustring("Неизвестно");
}

EngineObjectOffers.prototype.deal = function(offer, count) {

    if (this.page.deal(offer, count) === false) {
    
        this.page.setReloadDelay(
            this, 
            this.waitOfferDisabled * this.randomTime(), 
            offer + "\n" + "Сделка недоступна"
        );
        
        return false;
    
    }
    
    var seconds = Math.floor((new Date()).getTime() / 1000);
    
    if (offer instanceof ObjectOfferSell)
        GM_setValue("lastTimeBuy", seconds);
    
    if (offer instanceof ObjectOfferBuy)
        GM_setValue("lastTimeSell", seconds);
    
    GM_log(
        this + "\n" + 
        this.timeStr(new Date()) + ", " +
        this.timeStr(this.page.object.changeTime) + ", " +
        this.page.object.balance + ", " + 
        this.page.objectPlacesBusy + "/" + this.page.objectPlacesTotal(0) + "\n" +
        offer + "\n" + 
        "Реализуется: " + count
    );
    
    return true;
        
}

/** Проверка истечения таймаута для покупки
* @param ObjectOffer offer
*/
EngineObjectOffers.prototype.checkTimeBuy = function(offer) {

    if ((new Date()).getTime() + this.waitTimeBuy * 1000 >= this.lastTimeBuy.getTime()) 
        return {delay: 0};

    return {
        delay: this.lastTimeBuy.getTime() + this.waitTimeBuy * 1000,
        reason: "Герой ждет окончания таймаута совершения сделки"
    }

}

/** Проверка истечения таймаута для продажи
* @param ObjectOffer offer
*/
EngineObjectOffers.prototype.checkTimeSell = function(offer) {

    if ((new Date()).getTime() + this.waitTimeSell * 1000 >= this.lastTimeSell.getTime()) 
        return {delay: 0};

    return {
        delay: this.lastTimeSell.getTime() + this.waitTimeSell * 1000,
        reason: "Герой ждет окончания таймаута совершения сделки"
    }

}

/** Проверка наличия на складе героя для продажи
* @param ObjectOffer offer
*/
EngineObjectOffers.prototype.checkHeroCount = function(offer) {

    if (offer.countHero >= 1) 
        return {delay: 0};
    
    return {
        delay: this.waitHeroResource * this.randomTime(), 
        reason: "Герой ждет появления товара на своем складе"
    };
    
}

/** Проверка баланса предприятия для продажи
* @param ObjectOffer offer
*/
EngineObjectOffers.prototype.checkObjectPrice = function(offer) {

    if (offer.object.balance.getCost() > offer.price.getCost())
        return {delay: 0};

    return {
        delay: this.waitObjectBalance * this.randomTime(),
        reason: "Герой ждет пополнения баланса объекта"
    };
    
}
    
/** Проверка склада предприятия для продажи
* @param ObjectOffer offer
*/
EngineObjectOffers.prototype.checkObjectCountMax = function(offer) {
    
    if (offer.count >= 1)
        return {delay: 0};
    
    var randomTime = this.randomTime();
    var currentTime = new Date();
    var changeTime = offer.object.changeTime;
    if (changeTime === null)
        changeTime = currentTime;
    
    // Если предприятие не может расплатиться за работу и товар
    if (offer.object.balance.getCost() < (offer.price.getCost() + offer.object.payment.getCost()))
        return {
            delay: randomTime * this.waitObjectBalance, 
            reason: "Герой ждет пополнения баланса объекта"
            //+ " (предприятие не может расплатиться за работу и товар)"
            + " (" + offer.object.balance.getCost() + " > " + offer.price.getCost() + " + " + offer.object.payment.getCost() + ")"
        };

    // Если на предприятии нет мест
    if (offer.object.placesFree == 0)
        return {
            delay: Math.max(changeTime.getTime() - currentTime.getTime(), randomTime * this.waitChange),
            reason: "Герой ждет окончания смены (для продажи)"
        };

    // Если предприятие набирает рабочих
    return {
        delay: this.waitObjectPlaces * (10000 / this.page.online) * randomTime,
        reason: "Герой ждет устройства рабочих"
    }
    
}

/** Проверка склада предприятия для покупки
* @param ObjectOffer offer
*/
EngineObjectOffers.prototype.checkObjectCount = function(offer) {

    if (offer.count >= 1)
        return {delay: 0};
    
    var currentTime = new Date();
    var changeTime = offer.object.changeTime;
    if (changeTime === null)
        changeTime = currentTime;
    var randomTime = this.randomTime();
    
    return {
        delay: Math.max(changeTime.getTime() - currentTime.getTime(), randomTime * this.waitChange),
        reason: "Герой ждет окончания смены (для покупки)"
    };
    
}

/** Проверка заинтересованности героя
* @param ObjectOffer offer
*/
EngineObjectOffers.prototype.checkHeroBalance = function(offer) {

    if (this.page.hero.balance.getCost() > offer.price.getCost())
        return {delay: 0};
    
    return {
        delay: this.waitHeroBalance * this.randomTime(),
        reason: "Герой ждет пополнения своего баланса"
            + " (" + this.page.hero.balance.getCost() + " <= " + offer.price.getCost() + ")"
    };
    
}
    
// Если склад героя переполнен
EngineObjectOffers.prototype.checkHeroCountMax = function(offer) {

    if (offer.getCount(this.page.hero.balance) >= 1)
        return {delay: 0};
    
    return {
        delay: this.waitHeroPlaces * this.randomTime(),
        reason: "Герой ждет освобождения своего склада"
    };
    
}

// Если сделка просто недоступна
EngineObjectOffers.prototype.checkDisabled = function(offer) {

    if (offer.isActive() === true)
        return {delay: 0};
    
    return {
        delay: this.waitOfferDisabled * this.randomTime(),
        reason: "Сделка недоступна"
    };
    
}

EngineObjectOffers.prototype.run = function() {

    var offers = [];
    for (var i = 0; i < this.page.object.offers.length; i++) {
        var offer = this.page.object.offers[i];
        
        if (offer instanceof ObjectOfferBuy)
            this.page.hero.saveItemCountById(offer.item.id, offer.countHero);
        
        if (offer.loadIsEnabled() === false)
            continue;
            
        // Перебираем препятствия для продажи
        var checks = [];
        
        if (offer instanceof ObjectOfferSell) {
            checks[checks.length] = this.checkTimeBuy(offer);
            checks[checks.length] = this.checkObjectCount(offer);
            checks[checks.length] = this.checkHeroBalance(offer);
            checks[checks.length] = this.checkHeroCountMax(offer);
        }
        
        if (offer instanceof ObjectOfferBuy) {
            checks[checks.length] = this.checkTimeSell(offer);
            checks[checks.length] = this.checkHeroCount(offer);
            checks[checks.length] = this.checkObjectPrice(offer);
            checks[checks.length] = this.checkObjectCountMax(offer);
        }
        
        // Выбираем максимальный таймаут
        var k = 0;
        for (var j = 1; j < checks.length; j++)
            if (checks[j].delay > checks[k].delay)
                k = j;
        if (checks[k].delay > 0) {
            this.page.setReloadDelay(this, checks[k].delay, offer + "\n" + checks[k].reason);
            continue;
        }
        
        // Если сделка недоступна по какой-то не предусмортенной причине
        check = this.checkDisabled(offer);
        if (check.delay > 0) {
            this.page.setReloadDelay(this, check.delay, offer + "\n" + check.reason);
            continue;
        }
        
        
        var count = offer.getCount(this.page.hero.balance);
        if (offer instanceof ObjectOfferSell) {
            if (offer.item instanceof Art)
                // Максимум за раз можно купить 1 арт
                count = Math.min(1, count);
            else
                // Максимум за раз можно купить 20 единиц ресурса
                count = Math.min(20, count);
        }
        
        if (count === 0) {
            throw new Error(
                this + "\n" +
                this.timeStr(new Date()) + ", " +
                this.timeStr(this.page.object.changeTime) + ", " +
                this.page.object.balance + ", " + 
                this.page.objectPlacesBusy + "/" + this.page.objectPlacesTotal(0) + "\n" +
                offer + "\n" + 
                "Отменена сделка на 0 единиц товара" + "\n\n" +
                this.page.hero.balance + "\n\n" +
                offer.object + "\n\n" +
                checks[0].delay + " - " + checks[0].reason + "\n" +
                checks[1].delay + " - " + checks[1].reason + "\n" +
                checks[2].delay + " - " + checks[2].reason + "\n" +
                checks[3].delay + " - " + checks[3].reason
            );
            continue;
        }
    
        if (this.sortDeal === true) {
        
            offers[offers.length] = {
                offer: offer, 
                count: count,
                cost: Price.inc(offer.price, count).getCost(0)
            };
        
        } else {
        
            // Совершаем сделку
            this.deal(offer, count);
            
            if (this.batchDeal === false)
                return true;
        
        }
        
    }
    
    if (this.sortDeal === true) {
    
        // Сортируем список по общей стоимости
        for (var i = 0; i < offers.length; i++)
            for (var j = offers.length - 1; j > i; j--)
                if (offers[j].cost > offers[j - 1].cost) {
                    var t = offers[j];
                    offers[j] = offers[j - 1];
                    offers[j - 1] = t;
                } 
                
        // Сортируем список по количеству
        for (var i = 0; i < offers.length; i++)
            for (var j = offers.length - 1; j > i; j--)
                if (offers[j].count > offers[j - 1].count) {
                    var t = offers[j];
                    offers[j] = offers[j - 1];
                    offers[j - 1] = t;
                } 
        
        if (offers.length > 1) {
            var list = "";
            for (var i = 0; i < offers.length; i++) {
                var str = offers[i].offer.item + ": " + offers[i].count + " x " + offers[i].offer.price.getCost() + " = " + offers[i].cost;
                if (offers[i].offer instanceof ObjectOfferBuy)
                    list = list + "    (Продажа) " + str + " (" + offers[i].offer.countHero + " у Вас)" + "\n";
                else
                    list = list + "    (Покупка) " + str + "\n";
            }
            GM_log(
                this + "\n" +
                this.timeStr(new Date()) + ", " +
                this.timeStr(this.page.object.changeTime) + ", " +
                this.page.object.balance + ", " + 
                this.page.objectPlacesBusy + "/" + this.page.objectPlacesTotal(0) + "\n" +
                list
            );
        }
        
        // Совершаем сделки
        for (var i = 0; i < offers.length; i++) {
            
            this.deal(offers[i].offer, offers[i].count);
            
            if (this.batchDeal === false)
                return true;
            
        }
    
    }
    
}

EngineObjectOffers.prototype.restart = function() {

    if (
        (this.page.object === null) ||
        (this.page.object.balance === null) ||
        (this.page.object.payment === null)
    ) return false

    this.page.unsetReload();
    this.run();
    
    if (this.page.reloadTime instanceof Date)
        GM_log(
            this + "\n" +
            this.timeStr(new Date()) + ", " +
            this.timeStr(this.page.object.changeTime) + ", " +
            this.page.object.balance + ", " + 
            this.page.objectPlacesBusy + "/" + this.page.objectPlacesTotal(0) + "\n" +
            this.page.reloadReason + " " + 
            Number(this.page.reloadDelay / 1000).toFixed(1) + ustring(" сек.")
        );
        
    return true;

}

EngineObjectOffers.prototype.toString = function() {
    var result = "EngineObjectOffers(" + this.id + ", " + this.page.object.id + ", " + this.page.object.type + ")";
    return ustring(result);
}



function run(doc, game) {

    function planeFrame(objectId, delay) {
        setTimeout(function() {appendFrame(objectId);}, delay);
    }
    
    function appendFrame(objectId) {
        var href = "http://www.heroeswm.ru/object-info.php?id=" + objectId;
        var iframe = framesContainer.appendChild(doc.createElement("iframe"));
        iframe.src = href;
        iframe.id = "object_offers_object_" + objectId;
        Event.add(iframe, "load", function() {onFrameLoad(iframe, objectId);});
    }
    
    function onFrameLoad(iframe, objectId) {
        // Если пока фрейм грузился (обновлялся) егоу уже удалили - не выполняем обработчик
        if (iframe.parentNode !== framesContainer)
            return false;
            
        var page = new PageObjectInfo(iframe.contentDocument, game);
        page.parse();
        
        // Особая функция перезагрузки нужна если игра перенаправит на на другой URL
        page.reloadFunction = function() {
        
            try {
            
                if (iframe.contentDocument === null) {
                
                    // Если документ уже успел обновиться - удаляем все что можем
                    delete this.doc;
                    delete this.reloadSender;
                    delete this;
                    return false;
                
                }
                
                // Обновляем документ
                var loc = iframe.contentDocument.location;
                var href = iframe.src;
                if (loc.href == href)
                    loc.reload(true);
                else
                    loc.replace(href);
            
            } catch (e) {

                GM_log("reloadFunction" + "\n" + e);
            
            }
        
        }
        
        // OK
        if (page.state === 1) {
        
            homePage.setBalance(page.hero.balance);
            
            if (page.checkRegion() === true) {
            
                //GM_log(page.object);
                var engine = new EngineObjectOffers(game, page);
                engine.restart();
                return true;
                
            } 
        
        } else {
        
            // Если герой дерется, играет в карты, путешествует - прибиваем все фреймы чтобы не долбились зря
            if (
                (page.state === 2) || // Игра остановлена
                (page.state === 4) || // Вы не авторизированы
                (page.state === 5) || // Герой находится в битве
                (page.state === 6) || // Герой находится за карточным столом
                (page.state === 7)    // Герой путешествует
            ) {
            
                var frames = framesContainer.getElementsByTagName("IFRAME");
                for (var i = 0; i < frames.length; i++)
                    if (/object_offers_object_(\d+)/.test(frames[i].id)) {
                        //GM_log("delete frame " + frames[i].id);
                        delete framesContainer.removeChild(frames[i]);
                    }
            
            } else {
                
                // При любой другой проблеме назначаем перезагрузку по таймауту
                var sender = "Supervisor";
                var delay = 1000 * 15 * GM_getValue("timeMod", 1.0);
                var reason = "Ошибка распознавания страницы";
                page.setReloadDelay(sender, delay, reason);
                GM_log(
                    "\n" + (new Date()).toLocaleTimeString() + ", " + reason + "\n" +
                    ustring("Страница будет перезагружена через ") + 
                    Number(delay/1000).toFixed(1) + 
                    ustring(" сек.")
                );                
            
            }
        
        }
        
    }
    
    function onMapFrameLoad(iframe) {
        var page = new PageMap(iframe.contentDocument, game);
        page.parse();
        
        if (page.state === 1) {
        
            for (var i = 0; i < page.region.objects.length; i++) {
                var objectId = page.region.objects[i].id;
                var frame = doc.getElementById("object_offers_object_" + objectId);
                if (frame === null)
                    planeFrame(objectId, 1000 * 1 * i);
            }
        
        } else {
        
            var frames = framesContainer.getElementsByTagName("IFRAME");
            for (var i = 0; i < frames.length; i++)
                if (/object_offers_object_(\d+)/.test(frames[i].id)) {
                    //GM_log("delete frame " + frames[i].id);
                    delete framesContainer.removeChild(frames[i]);
                }
        
        }
    }
    
    function onHeroFrameLoad(iframe) {
        
        function formString(text, length, right) {
            if (right === undefined)
                right = true;
            var result = text.toString();
            while (result.length < length)
                if (right)
                    result = " " + result;
                else
                    result = result + " ";
            return ustring(result);
        }
        
        var page = new PagePlayerInfo(iframe.contentDocument, game);
        page.parse();
        
        if (page.state === 1) {
        
            page.parsePlayerResources();
            var resources = page.player.balance.resources;
            var itemLenght = 0;
            var countLenght = 0;
            var costLenght = 0;
            var sumLenght = 0;
            for (var i = 0; i < resources.length; i++) {
                page.hero.saveItemCountById(resources[i].item.id, resources[i].count);
                itemLenght = Math.max(itemLenght, resources[i].item.toString().length);
                countLenght = Math.max(countLenght, resources[i].count.toString().length);
                costLenght = Math.max(costLenght, resources[i].item.getCost().toString().length);
                sumLenght = Math.max(sumLenght, resources[i].getCost().toString().length);
            }
            
            var str = "";
            for (var i = 0; i < resources.length; i++)
                str += "\n" + "    " + 
                    formString(resources[i].item, itemLenght) + "   " + 
                    formString(resources[i].item.getCost(), costLenght) + " x " + 
                    formString(resources[i].count, countLenght) + " = " + 
                    formString(resources[i].getCost(), sumLenght);
            str += "\n" + "    " + 
                    formString("Итого", itemLenght) + "   " + 
                    formString("", costLenght) + "   " + 
                    formString("", countLenght) + "   " + 
                    formString(page.player.balance.getCost(), sumLenght);

            GM_log((new Date()).toLocaleTimeString() + ustring(", Активы:") + str);
        
        }
    }
    
    var framesContainer = doc.createElement("block");
    framesContainer.style.display = "none";
    framesContainer.id = "object_offers";
    doc.body.appendChild(framesContainer);
    
    var iframeMap = framesContainer.appendChild(doc.createElement("iframe"));
    iframeMap.src = "http://www.heroeswm.ru/map.php";
    iframeMap.id = "object_offers_map";
    Event.add(iframeMap, "load", function() {onMapFrameLoad(iframeMap);});

    var iframeHero = framesContainer.appendChild(doc.createElement("iframe"));
    iframeHero.src = "http://www.heroeswm.ru/pl_info.php?id=" + homePage.heroId;
    iframeHero.id = "object_offers_hero";
    Event.add(iframeHero, "load", function() {onHeroFrameLoad(iframeHero);});
    
    // Регулярно проверяем карту
    setInterval(
        function() {
            var loc = iframeMap.contentDocument.location;
            var href = iframeMap.src;
            if (loc.href == href)
                loc.reload(true);
            else
                loc.replace(href);
        },
        1000 * 60 * 1 * GM_getValue("timeMod", 1.0)
    );
    
    // Менее регулярно проверяем героя
    setInterval(
        function() {
            var loc = iframeHero.contentDocument.location;
            var href = iframeHero.src;
            if (loc.href == href)
                loc.reload(true);
            else
                loc.replace(href);
        },
        1000 * 60 * 5 * GM_getValue("timeMod", 1.0)
    );
    
}


if (Page.isHomeURL(document.location.href)) {

    var game = new Game();
    Game.load(game);
    
    var homePage = new PageHome(document, game);
    homePage.parse();
    
    if (homePage.state === 1) {
    
        run(document, game);
    
    }
    
}


GM_setValue('hero_gold_min', 10 * 1000); // Минимальное количество золота героя
GM_setValue('lastTimeBuy', 0); // Время последней покупки (меняется автоматом)
GM_setValue('lastTimeSell', 0); // Время последней продажи (меняется автоматом)
GM_setValue('batchDeal', false); // Выполнять все сделки за раз
GM_setValue('sortDeal', true); // Сортировать сделки
GM_setValue('timeMod', '10.0'); // Общий модификатор времени
GM_setValue('waitHeroResource', '5.0'); // Модификатор ожидания ресурсов героя
GM_setValue('waitHeroBalance', '10.0'); // Модификатор ожидания баланса героя
GM_setValue('waitHeroPlaces', '10.0'); // Модификатор ожидания мест на складе героя
GM_setValue('waitObjectBalance', '5.0'); // Модификатор ожидания баланса объекта
GM_setValue('waitObjectPlaces', '0.01'); // Модификатор ожидания мест на складе объекта
GM_setValue('waitChange', '0.1'); // Модификатор ожидания пересменки
GM_setValue('waitOfferDisabled', '0.1'); // Сколько ждать если сделка заблокирована (по непонятной причине)
GM_setValue('waitTimeBuy', '10.0'); // Сколько ждать после покупки
GM_setValue('waitTimeSell', '10.0'); // Сколько ждать после продажи
