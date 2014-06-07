// ==UserScript==
// @name           Estiah - Mind Tricks
// @namespace      SwataScripts
// @description    Collection of various extensions
// @include        http://www.estiah.com/*
// @exclude        http://www.estiah.com/
// @author         swata
// @version        111218.2
// ==/UserScript==

// TODO:
// - methods as camelCase
// - cardframe according to charm availability
// - buy directly
// - items needed for craft summary
// ? rewrite crafthelper to work on separate pages
// - track items from gathering
// - track items from fights
// - stars to event shops
// - stats gold/ap for dungeons/events/..

var dataVersion = '110301'; // before increasing this version, finish implementing Settings.Import
var debug = false;

/////////////////////////////
// general purpose classes //
/////////////////////////////

// storage

Storage = {};
Storage.LS = {};
Storage.LS.get = function (key) {
    return localStorage.getItem(Storage.LS._getStorageKey(key));
}

Storage.LS.set = function (key, value) {
    localStorage.setItem(Storage.LS._getStorageKey(key), value);
}

Storage.LS.remove = function (key) {
    localStorage.removeItem(Storage.LS._getStorageKey(key));
}

Storage.LS.list = function () {
    var ret = new Array();
    var length = unsafeWindow.localStorage.length - 1;
    for (i = 0; i <= length; i++) {
        var key = localStorage.key(i);
        if (key.indexOf(Storage.LS._keyPrefix) == 0)
            ret.push(Storage.LS._getInnerKey(key));
    }
    return ret;
}

Storage.LS._keyPrefix = "Mind_Tricks_";

Storage.LS._getStorageKey = function (key) {
    return Storage.LS._keyPrefix + key;
}

Storage.LS._getInnerKey = function (storageKey) {
    return storageKey.substr(Storage.LS._keyPrefix.length);
}

Storage.GM = {};
Storage.GM.get = GM_getValue;
Storage.GM.set = GM_setValue;
Storage.GM.remove = GM_deleteValue;
Storage.GM.list = GM_listValues;

Storage.useLS = function () {
    Storage.get = Storage.LS.get;
    Storage.set = Storage.LS.set;
    Storage.remove = Storage.LS.remove;
    Storage.list = Storage.LS.list;
    Storage.usingLS = true;
}

Storage.useGM = function () {
    Storage.get = Storage.GM.get;
    Storage.set = Storage.GM.set;
    Storage.remove = Storage.GM.remove;
    Storage.list = Storage.GM.list;
    Storage.usingLS = false;
}

Storage.foreach = function (callback) {
    var keys = Storage.list();
    for (var i = 0; i < keys.length; i++) {
        callback(keys[i]);
    }
}

Storage.switchToLS = function () {
    Storage.useLS();
    var keys = Storage.GM.list();
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        Storage.set(key, Storage.GM.get(key));
        Storage.GM.remove(key);
    }
}

Storage.switchToGM = function () {
    Storage.useGM();
    var keys = Storage.LS.list();
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        Storage.set(key, Storage.LS.get(key));
        Storage.LS.remove(key);
    }
}

Storage.init = function () {
    Storage.canUseLS = (typeof (localStorage) != 'undefined');
    Storage.canUseGM = (typeof (GM_listValues) != 'undefined');
    if (!Storage.canUseLS || (Storage.canUseGM && (Storage.GM.list().length > 0)))
        Storage.useGM();
    else
        Storage.useLS();
}

Storage.init();

// List

function List(init) {
    if (init == undefined || (init.length < 2))
	    this.array = new Array();
    else
	    this.array = init.split(this.separator);
}

List.prototype.separator = ',';

List.prototype.add = function(item) { 
	var add = !this.contains(item);
	if (add)
		this.array.push(item);
	//GM_log(item + ' ' + add);
	return add;
}
	
List.prototype.contains = function(item) {
    return this.array.indexOf(item) > -1; 
}

List.prototype.remove = function(item) { 
	var removed = this.array.splice(this.array.indexOf(item), 1);
	return removed != undefined;
}

List.prototype.toString = function() {
	//GM_log('save! ' + this.array.join(this.separator));
	return this.array.join(this.separator);
}

List.prototype.foreach = function (callback) {
    for (var key = 0; key < this.array.length; key++) {
        callback(this.array[key]);
    }
}

List.prototype.count = function() {
    return this.array.length;
}

// Map (acts as multimap too - just use add() instead of insert() and remove(x,y) instead of remove(x))

function Map(init, mainSeparator, semiSeparator) {
    this.container = new Object();
    if (mainSeparator != undefined)
        this.mainSeparator = mainSeparator;
    if (semiSeparator != undefined)
        this.semiSeparator = semiSeparator;
    if (init != undefined) {
	    if (init.length < 2)
		    return;
	    var pairs = init.split(this.mainSeparator);
	    for (var key = 0; key < pairs.length; key++ ) {
	        var items = pairs[key].split(this.semiSeparator);
	        this.container[items[0]] = items.slice(1);
	    }
    }
}

Map.prototype.mainSeparator = ',,';
Map.prototype.semiSeparator = ';;';

Map.prototype.insert = function (val1, val2, val3, val4) {
    var val = null;
    if ((val3 == undefined || val3 === '') && (val4 == undefined || val4 === ''))
        val = [val2];
    else
        if (val4 == undefined || val4 === '')
            val = [val2, val3];
        else
            val = [val2, val3, val4];
        if (this.container[val1] == val)
        return false;
    this.container[val1] = val;
    return true;
}

Map.prototype.add = function(val1, val2) {
    if (val1 == undefined || val2 == undefined || val1 == '' || val2 == '')
        return false;
	if (this.container[val1] == undefined) {
		this.container[val1] = [val2];
		return true;
	}
	if (this.container[val1].indexOf(val2) > -1)
		return false;	// already there
	this.container[val1].push(val2);
	return true;
}

Map.prototype.contains = function(val1, val2) {
	var values = this.container[val1];
	if (values == undefined)
		return false;
	if (val2 == undefined)
		return true;
	return (values.indexOf(val2)>-1);
}
	
Map.prototype.remove = function(val1, val2) {
	var values = this.container[val1];
	if (values == undefined)
		return false;
	if (val2 == undefined) {
		delete this.container[val1];
		return true;
	}
	var i = values.indexOf(val2);
	if (i == -1)
		return false;
	if (values.length == 1)	// last - delete whole item
		delete this.container[val1];
	else
		values.splice(i, 1);
	return true;			
}
	
Map.prototype.get = function(val1) {
	var ret = this.container[val1];
	if (ret == undefined)
		return [];
	return ret;
}

//Map.prototype.GetKeys

Map.prototype.toString = function()	{
	var res = new Array();
	for ( var key in this.container) {
		res.push(key + this.semiSeparator + this.container[key].join(this.semiSeparator));
	}
	return res.join(this.mainSeparator); 
}
	
Map.prototype.foreach = function(callback) {
	for (var key in this.container)
		callback(key, this.container[key]);
}


///////////////////////////////////////////////
// Containers around value stored in browser //
///////////////////////////////////////////////

// GMList

function GMList(gmName, autoupdate, clear) {
    this.name = gmName;
    this.autoupdate = (autoupdate != undefined) && autoupdate;
    if ((clear != undefined) && clear)
	    this.list = new List();
    else
	    this.list = new List(Storage.get(gmName));
}

GMList.prototype.add = function(val) {
	var added = this.list.add(val);
	if (added && this.autoupdate)
		this.save();
	return added;
}

GMList.prototype.contains = function(val) {
    return this.list.contains(val);
}

GMList.prototype.remove = function(val) { 
	var removed = this.list.remove(val); 
	if (removed && this.autoupdate)
		this.save();
	return removed;
}

GMList.prototype.save = function() {
	Storage.set(this.name, this.list.toString()); 
}
	
GMList.prototype.foreach = function(callback) {
	this.list.foreach(callback);
}

GMList.prototype.count = function() {
    return this.list.count();
}

// GMMap

function GMMap(gmName, autoupdate, clear) {
	this.name = gmName;
	this.autoupdate = (autoupdate != undefined) && autoupdate;
	if ((clear != undefined) && clear)
		this.map = new Map(undefined);
	else
		this.map = new Map(Storage.get(gmName));
}

GMMap.prototype.insert = function(val1, val2, val3, val4) {
	var added = this.map.insert(val1, val2, val3, val4);
	if (added && this.autoupdate)
		this.save();
	return added;
}

GMMap.prototype.add = function(val1, val2) {
	var added = this.map.add(val1, val2);
	if (added && this.autoupdate)
		this.save();
	return added;
}

GMMap.prototype.remove = function(val1, val2) { 
	var removed = this.map.remove(val1, val2);
	if (removed && this.autoupdate)
		this.save();
	return removed;
}
	
GMMap.prototype.contains = function(val1, val2) {
	return this.map.contains(val1, val2);
}

GMMap.prototype.get = function(val1) {
	return this.map.get(val1);
}

GMMap.prototype.save = function() {
	Storage.set(this.name, this.map.toString());
}
	
GMMap.prototype.foreach = function(callback) {
	this.map.foreach(callback);
}

///////////////////////////////////////////////
// General web-manipulating helper functions //
///////////////////////////////////////////////

Web = {};
Web.HttpRequest = function (url, onLoad) {
    if (debug)
        GM_log('fetching "' + url + '"');
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
            var parser = new DOMParser();
            var responseXML = parser.parseFromString(Web.SanitizeResponse(responseDetails.responseText), "text/xml");
            if (debug) {
                var title = responseXML.getElementsByTagName('title')[0];
                GM_log('url "' + url + '" loaded with ' + responseDetails.responseText.length + ' characters, title "' + title.innerHTML + '"');
            }
            onLoad(responseXML, url);
            Launcher.NewPageFetched(url, responseXML);
        }
    });
}

Web.SanitizeResponse = function (text) {
    return text
		.replace(/></g, '> <')			// auto closing tags
		.replace(' & ', ' and ')		// Hack & Slash not encoded
        .replace(new RegExp('<strong>([0-9]+)</span> </strong>', 'g'), '<strong>$1</strong> </span>');    // switch </span and </strong>
}

Web.SwitchVisibility = function(showClass, hide) {
	var show = hide.parentNode.getElementsByClassName(showClass);
	for (var d = 0; d < show.length; d++)
		show[d].style.display = '';
	hide.style.display = 'none';
}

Web.CreateElement = function(type, className, parent) {
	//GM_log('Web.CreateElement' + type + ' ' + className + ' ' + parent);
	var element = document.createElement(type);
	if (className != undefined)
		element.setAttribute('class', className);
	if (parent != undefined)
		parent.appendChild(element);
	return element;
}

Web.appendText = function (text, parent) {
    parent.appendChild(document.createTextNode(text));
}

Web.AddButton = function(label, href, type, func, root, decision) {
	var c = 'button button_c' + type;
	if (decision == true)
		c += ' decision';
	var div = Web.CreateElement('div', c, root);
	Web.AddInnerLink(label, href, 'button_inner button_ic' + type, func, div);
	return div;
}

Web.AddInnerLink = function (label, href, className, func, root) {
    var a = Web.CreateElement('a', className, root);
    Web.appendText(label, a);
    a.setAttribute('href', href);
    a.setAttribute('onclick', 'return false;');
    a.addEventListener('click', func, true);
    return a;
}

Web.CreatePageTitle = function (title, desc, wireFrame, page) {
    var titleFrame = Web.CreateElement('div', 'wireframe_' + wireFrame + ' common_content common_wl', page);
    var titleEl = Web.CreateElement('div', 'section_title c2', titleFrame);
    titleEl.innerHTML = title;
    var descEl = Web.CreateElement('div', 'section_text', titleFrame);
    if (desc != undefined)
        Web.appendText(desc, descEl);
    return titleFrame;
}

Web.CreatePage = function(title, desc, wireFrame, className, cloneClass) {
	var cloneFrom = document.getElementsByClassName(cloneClass)[0];
	var page = cloneFrom.cloneNode(false);
	cloneFrom.parentNode.appendChild(page);
	Web.CreatePageTitle(title, desc, wireFrame, page);
	page.setAttribute('class', cloneClass + ' ' + className);
	page.style.display = 'none';
	return page;
}

Web.removeNode = function(node) {
	node.parentNode.removeChild(node);
}

Web.AddAsFirstChild = function(what, parent) {
	parent.insertBefore(what, parent.firstChild);
}

Web.MouseClick = function(element) {
    var evt = element.ownerDocument.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, element.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(evt);
}

Web.CreateMouseClickFunction = function(element) {
    return function() {
        Web.MouseClick(element);
    };
}

Web.FindBrAfter = function(element) {
    return Web.FindTagAfter(element, 'BR');
}

Web.FindTagAfter = function(element, tagname) {
    var el = element.nextSibling;
    while (el != undefined && el.tagName != tagname)
        el = el.nextSibling;
    return el;
}

Web.GetLastPartOfHref = function(a) {
    return a.href.substring(a.href.lastIndexOf('/') + 1);
}

Web.SanitizeXpathName = function (inp) {
    if (inp.indexOf('"') > -1) {
        var inParts = inp.split('"');
        var outParts = [];
        for (var i = 0; i < inParts.length; i++) {
            if (inParts[i] != '')
                outParts.push('"' + inParts[i] + '"');
            if (i < inParts.length - 1)
                outParts.push("'" + '"' + "'");
        }
        return 'concat(' + outParts.join(',') + ')';
    }
    else
        return '"' + inp + '"';
}

///////////////////////////////////////
// Functions related to Estiah pages //
///////////////////////////////////////

Estiah = {};
Estiah.GetCityName = function() {
	var cityElement = document.evaluate(
		'//a[@href="/city" and contains(@class, "nolink")]', 
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (cityElement == null) return null;
	return cityElement.innerHTML.substring(5,8);	// return abbreviation
}

Estiah.CurrentCity = Estiah.GetCityName();

Estiah.GetPlayerId = function() {
	var archievementsElement = document.evaluate(
        '//div[contains(@class, "wireframe_menu")]//a[contains(@href, "/character/achievement/index/id/")]', 
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (archievementsElement == null) return null;
	return archievementsElement.getAttribute("href").substring(32);
}

Estiah.GetPlayerLevel = function () {
    var level = document.getElementsByClassName('PT_update_level');
    if (level.length > 0)
        return parseInt(level[0].innerHTML);
    return 1;
}

Estiah.Player = {};

Estiah.Player.Id = Estiah.GetPlayerId();

Estiah.Player.Level = Estiah.GetPlayerLevel();

Estiah.GetShopIdFromUrl = function(url) { 
	var id = url.substring(url.indexOf('/shop/') + 6); 
	if (id.indexOf('/')>-1) {
		var start = id.indexOf('/') + 1;
		id = id.substring(start, id.indexOf('/', start));
	}
	return id;
}

Estiah.GetItemId = function(item) {
	return item.getAttribute('href').substring(6);	// href="/item/xxxx"
}

Estiah.IsShopUrl = function(url) {
	return url.indexOf('/shop/')>-1;
}

Estiah.IsItemShopUrl = function(url) {
    if (!Estiah.IsShopUrl(url))
        return false;
    var shopType = Estiah.GetShopIdFromUrl(url)[0];
    return (shopType == '1' || shopType == '2');
}

Estiah.IsVendorShopUrl = function(url) {
    if (!Estiah.IsShopUrl(url))
        return false;
    var shopType = Estiah.GetShopIdFromUrl(url)[0];
    return shopType == '3';
}

Estiah.IsCraftShopUrl = function(url) {
    if (!Estiah.IsShopUrl(url))
        return false;
    var shop = Estiah.GetShopIdFromUrl(url);
    return (shop[0] == '4' || shop[0] == '5' || shop[0] == '6' || shop == 'tracked');
}

Estiah.Market = {};

Estiah.Market.AddShopGroup = function (ico, text, root) {
    var label = Web.CreateElement('div', 'stand_type lhp', root);
    var labelFloat = Web.CreateElement('div', 'floating', label);
    var icon = Web.CreateElement('div', 'icon icon_' + ico, labelFloat);
    Web.appendText(text, label);
    var standList = Web.CreateElement('div', 'standlist', root);
    return standList;
}

Estiah.Market.AddShop = function (shopId, className, shopName, shopDesc, action, root) {
    var stand = Web.CreateElement('div', 'stand', root);
    var name = Web.CreateElement('div', 'name bd1', stand);
    Web.AddInnerLink(shopName, '/shop/' + shopId, className, action, name);
    var desc = Web.CreateElement('div', 'description', stand);
    Web.appendText(shopDesc, desc);
    return stand;
}

Estiah.Fetcher = {};

Estiah.Fetcher._cache = function(key, callback, getValue) {
    //GM_log('getting ' + key);
    if (Estiah.Fetcher[key] != undefined)
        Estiah.Fetcher._runCallback(key, callback);
    else {
        var callbackKey = key + '_callback';
        if (Estiah.Fetcher[callbackKey] != undefined)
            Estiah.Fetcher[callbackKey].push(callback);
        else {
            Estiah.Fetcher[callbackKey] = new Array();
            Estiah.Fetcher[callbackKey].push(callback);
            getValue(function() {
                //GM_log('actually retrieving ' + key);
                Estiah.Fetcher[key] = arguments;
                Estiah.Fetcher._runCallbacks(key);
            });            
        }
    }
}

Estiah.Fetcher._runCallbacks = function(key) {
    var callbackArray = Estiah.Fetcher[key + '_callback'];
    while (callbackArray.length > 0)
        Estiah.Fetcher._runCallback(key, callbackArray.pop());
}

Estiah.Fetcher._runCallback = function(key, callback) {
    var args = Estiah.Fetcher[key];
    callback(args[0], args[1]);
}

Estiah.Fetcher.SynchronizeCallbacks = function(syncKey, callback, func1, func2) {
    func1(function(data) {
        Estiah.Fetcher[syncKey + '_data1'] = data;
        Estiah.Fetcher._checkFinished(syncKey, callback);
    });
    func2(function(data) {
        Estiah.Fetcher[syncKey + '_data2'] = data;
        Estiah.Fetcher._checkFinished(syncKey, callback);
    });
}

Estiah.Fetcher._checkFinished = function(syncKey, callback) {
    if (Estiah.Fetcher[syncKey + '_data1'] != undefined && Estiah.Fetcher[syncKey + '_data2'] != undefined)
        callback(Estiah.Fetcher[syncKey + '_data1'], Estiah.Fetcher[syncKey + '_data2']);
}

Estiah.Fetcher.FetchItemAndCharmCount = function(callback) {
    var key = '_ItemCountAndCharmCount';
    Estiah.Fetcher._cache(
        key, 
        callback, 
        function(innerCallback) {
            Estiah.Fetcher.SynchronizeCallbacks(
                key, 
                innerCallback, 
                Estiah.Inventory.FetchItemCounts,
                Estiah.Charms.FetchCharmCounts);
        });
}

Estiah.Inventory = {};

Estiah.Inventory.UrlTest = function (url) {
    return Launcher.UrlTest.EndsWith('/character/inventory')(url)
        || Launcher.UrlTest.Contains('/character/inventory/index/sort/')(url);
}

Estiah.Inventory.FetchItemCounts = function(callback) {
	Web.HttpRequest('http://www.estiah.com/character/inventory', function(doc) {
        callback(Estiah.Inventory._getItemCounts(doc));
    });
}

Estiah.Inventory._getItemCounts = function(doc) {
	var map = new Object();
	var items = doc.evaluate('//*[starts-with(@id,"StorageItemCount")]',
		doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<items.snapshotLength; i++)
		map[items.snapshotItem(i).id.substring(16)] = parseInt(items.snapshotItem(i).innerHTML);

	items = doc.evaluate('//*[starts-with(@id,"InventoryItemCount")]',
		doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<items.snapshotLength; i++) {
		var id = items.snapshotItem(i).id.substring(18);
		if (map[id] != undefined)
			map[id] = map[id] + parseInt(items.snapshotItem(i).innerHTML);
		else
			map[id] = parseInt(items.snapshotItem(i).innerHTML);
	}
	return  map;
}

Estiah.Charms = {};

Estiah.Charms.FetchCharmCounts = function(callback) {
    Estiah.Fetcher.SynchronizeCallbacks(
        '_CharmCount',
        function(map1, map2) {
            for (var i in map2)
                map1[i]=map2[i];
            callback(map1);
        },
        Estiah.Charms._fetchCharmCounts('http://www.estiah.com/character/card'),
        Estiah.Charms._fetchCharmCounts('http://www.estiah.com/character/card/index/collection/archive'));
}

Estiah.Charms._fetchCharmCounts = function(url) {
    return function(callback) {
        Web.HttpRequest(url, function(doc) {
            callback(Estiah.Charms._getCharmCounts(doc));
        });
    };
}

Estiah.Charms._getCharmCounts = function (doc) {
    var map = new Object();
    var counts = doc.getElementsByClassName('count');
    for (var c = 0; c < counts.length; c++) {
        var charmId = Estiah.Charms._getCharmIdFromCountEl(counts[c]);
        map[charmId] = counts[c].innerHTML; // not a problem - charm is either in one or in other collection
    }
    return map;
}

Estiah.Charms.GetCharmId = function(dom) {
	var counts = dom.getElementsByClassName('count');
    if (counts.length == 0)
        return undefined;
    return Estiah.Charms._getCharmIdFromCountEl(counts[0]);
}

Estiah.Charms._getCharmIdFromCountEl = function(el) {
    var cl = el.getAttribute('class');   // 'count PT_update_count_t1i547'
    return cl.substr(cl.indexOf('PT_update_count_t1i') + 19);
}

//////////////
// Launcher //
//////////////

Launcher = {};
Launcher.read = new Array();
Launcher.modify = new Array();
Launcher.Registrator = function(id) {
	this.id = id;
}
Launcher.Registrator.prototype.Read = function(checkfunc, runfunc) {
	Launcher.read.push([this.id, checkfunc, runfunc]);
	return this;
}
Launcher.Registrator.prototype.Modify = function(checkfunc, runfunc) {
	Launcher.modify.push([this.id, checkfunc, runfunc]);
	return this;
}
Launcher.Registrator.prototype.UpdateData = function(version, runfunc) {
    DataUpdate.UpdateData(version, runfunc);
}
Launcher.Register = function(id, text) {
	Settings.texts.insert(id, text);
	return new Launcher.Registrator(id);
}

Launcher.UrlTest = {};
Launcher.UrlTest.EndsWith = function(suffix) {
    return function(url) {
        return url.substr(-suffix.length) == suffix;
    }
}
Launcher.UrlTest.Contains = function(str) {
    return function(url) {
        return url.indexOf(str) >= 0;
    }
}
Launcher.UrlTest.EveryPage = function (url, doc) {
    return doc.URL !== undefined && !Launcher.UrlTest.LogIn(url);
}
Launcher.UrlTest.LogIn = function (url) {
    return Launcher.UrlTest.Contains('user/auth')(url);
}

Launcher.Run = function (array, url, doc) {
    for (var key = 0; key < array.length; key++ ) {
        // do something
        if (Settings.IsEnabled(array[key][0]) && array[key][1](url, doc))
            array[key][2](doc, url);
    }
}

Launcher.NewPageFetched = function(url, doc) {
    Launcher.Run(Launcher.read, url, doc);
}

Launcher.NewPageCreated = function(url, doc) {
    Launcher.Run(Launcher.modify, url, doc);
}

// run it after everything is registered
Launcher.Launch = function() {
    DataUpdate.SetDataVersion();
    Launcher.NewPageFetched(document.URL, document);
    Settings.Attach();
    Launcher.NewPageCreated(document.URL, document);
}

/////////////////
// Data Update //
/////////////////

DataUpdate = {};
DataUpdate.SetDataVersion = function() {
    Storage.set('DataVersion', dataVersion);
}

DataUpdate.UpdateData = function(version, runfunc) {
    var dataver = Storage.get('DataVersion');
    if (dataver == undefined || dataver < version)
        runfunc();
}

DataUpdate.RemoveEmptyValues = function () {
    GM_log('running empty values check ..');
    Storage.foreach(function (sKey) {
        if (sKey.substr(0, 9) == 'NewCharms')
            return;
        var map = new GMMap(sKey);
        map.foreach(function (key, valueArray) {
            while (valueArray.indexOf('') != -1) {
                GM_log('removing empty value in map ' + sKey + ', key ' + key + ', data ' + valueArray);
                valueArray.splice(valueArray.indexOf(''), 1);
            }
            if (valueArray.length == 0)
                map.remove(key);
        });
        var newValue = map.map.toString();
        var oldValue = Storage.get(sKey);
        if (newValue != oldValue) {
            GM_log('replacing value of ' + sKey);
            GM_log('old: ' + oldValue);
            GM_log('new: ' + newValue);
            map.save();
        }
    });
}

DataUpdate.UpdateData('100927', DataUpdate.RemoveEmptyValues);

//////////////
// Settings //
//////////////

Settings = {};
Settings.Addons = new GMMap('Addons', true);
Settings.IsEnabled = function(addon) {
	return Settings.Addons.get(addon).length > 0;
}
Settings.texts = new Map();

Settings.SettingsShopName = "Swata's Mind Tricks";
Settings.SettingsShopDesc = 'Young man is showing off wonderful mind tricks. Maybe you can learn few of them too ..';
Settings.ImportShopName = "Soul Harvester's Tent";
Settings.ImportShopDesc = 'This strange man can store your memory into a crystal or back. Be aware, it hurts ..';

Settings.AlterMarket = function (doc) {
    var shopRoots = doc.evaluate(
        '//div[contains(@class, "wireframe_market")]/div[contains(@class, "format") and contains(@class, "section_text")]',
        doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < shopRoots.snapshotLength; i++) {
        var shopRoot = shopRoots.snapshotItem(i);
        var shopGroup = Estiah.Market.AddShopGroup('staff', 'Dark corner', shopRoot);
        Estiah.Market.AddShop('settings', 'item', Settings.SettingsShopName, Settings.SettingsShopDesc, Settings.ShowSettings, shopGroup);
        Estiah.Market.AddShop('import', 'item', Settings.ImportShopName, Settings.ImportShopDesc, Settings.ShowImport, shopGroup);
    }
    var cityShops = doc.getElementsByClassName('wireframe_2')[0];
    cityShops.setAttribute('class', cityShops.getAttribute('class') + ' CityShops');
}

Settings.BackToMarket = function() {
    var settings = this.parentNode.parentNode.parentNode.parentNode;
    Web.SwitchVisibility('CityShops', settings);
    settings.parentNode.removeChild(settings);
    scroll(0, 0);
}

Settings.ShowSettings = function() {
    var thisPage = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var shopsRoot = thisPage.parentNode;
    Settings.CreateSettingsPage();
    Web.SwitchVisibility('Settings', thisPage);
    scroll(0, 0);
}

Settings.CreateSettingsPage = function () {
    var settingsPage = Web.CreatePage(Settings.SettingsShopName, Settings.SettingsShopDesc, 'market', 'Settings', 'wireframe_2');
    var ao;
    if (Storage.canUseLS && Storage.canUseGM) {
        ao = Web.CreateElement('div', 'wireframe_market common_content common_wl', settingsPage);
        var aoTitle = Web.CreateElement('div', 'paragraph_title c2', ao);
        Web.appendText('Data in:\u00A0', aoTitle);
        var storage = Web.CreateElement('span', '', aoTitle);
        storage.id = 'storage';
        var href = '/settings/' + 'DataStorage';
        var aoUseLS = Web.AddButton('Use localStorage', href, 3, Settings.UseLS, ao);
        var aoUseGM = Web.AddButton('Use greasemonkeyStorage', href, 3, Settings.UseGM, ao);
        if (Storage.usingLS) {
            storage.innerHTML = 'localStorage';
            aoUseLS.style.display = 'none';
        } else {
            storage.innerHTML = 'greasemonkeyStorage';
            aoUseGM.style.display = 'none';
        }
        Web.appendText('\u00A0', aoTitle);
        var aoDesc = Web.CreateElement('div', 'paragraph_text', ao);
        Web.appendText('Here you can change where the data is stored. It may take a while to transfer all the data. Do not click if you do not know what you are doing.', aoDesc);
    }
    Settings.texts.foreach(function (addonName, addonDesc) {
        ao = Web.CreateElement('div', 'wireframe_market common_content common_wl', settingsPage);
        var aoTitle = Web.CreateElement('div', 'paragraph_title c2', ao);
        Web.appendText(addonName + '\u00A0', aoTitle);
        var href = '/settings/' + addonName;
        var aoEnable = Web.AddButton('Enable', href, 2, Settings.Enable, ao);
        var aoDisable = Web.AddButton('Disable', href, 3, Settings.Disable, ao);
        if (Settings.IsEnabled(addonName))
            aoEnable.style.display = 'none';
        else
            aoDisable.style.display = 'none';
        var aoDesc = Web.CreateElement('div', 'paragraph_text', ao);
        Web.appendText(addonDesc[0], aoDesc);
    });

    var buttonsRoot = Web.CreateElement('div', 'section_text', ao);
    Web.AddButton('Back to city shops', '/market', 5, Settings.BackToMarket, buttonsRoot);
}

Settings.Enable = function() {
    var addon = Web.GetLastPartOfHref(this);
    Settings.Addons.insert(addon, 1);
    Web.SwitchVisibility('button_c3', this.parentNode);
}

Settings.Disable = function() {
    var addon = Web.GetLastPartOfHref(this);
    Settings.Addons.remove(addon);
    Web.SwitchVisibility('button_c2', this.parentNode);
}

Settings.UseLS = function () {
    Storage.switchToLS();
    Web.SwitchVisibility('button_c3', this.parentNode);
    document.getElementById('storage').innerHTML = 'localStorage';
}

Settings.UseGM = function () {
    Storage.switchToGM();
    Web.SwitchVisibility('button_c3', this.parentNode);
    document.getElementById('storage').innerHTML = 'greasemonkeyStorage';
}

Settings.ShowImport = function () {
    var thisPage = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var shopsRoot = thisPage.parentNode;
    Settings.CreateImportPage();
    Web.SwitchVisibility('ImportExport', thisPage);
    scroll(0, 0);
}

Settings.CreateImportPage = function () {
    var page = Web.CreatePage(Settings.ImportShopName, Settings.ImportShopDesc, 'market', 'ImportExport', 'wireframe_2');
    var ie = Web.CreateElement('div', 'wireframe_market common_content common_wl', page);
    var ieTitle = Web.CreateElement('div', 'paragraph_title c2', ie);
    Web.appendText('Import / Export', ieTitle);

    var exportSelector = Web.CreateElement('div', 'paragraph_text', ie);
    Web.appendText('Export: ', exportSelector);
    var select = Web.CreateElement('select', 'select', exportSelector);
    select.setAttribute('id', 'export-selector');
    Web.CreateElement('option', undefined, select)
        .appendChild(document.createTextNode('--Everything--'));
    Web.CreateElement('option', undefined, select)
        .appendChild(document.createTextNode('--Static data--'));
    Web.CreateElement('option', undefined, select)
        .appendChild(document.createTextNode('--Personal data--'));
    Storage.foreach(function (key) {
        Web.CreateElement('option', undefined, select)
            .appendChild(document.createTextNode(key));
    });

    var ieTextArea = Web.CreateElement('textarea', 'c2 bd1 textarea', ie);
    ieTextArea.setAttribute('cols', '90');
    ieTextArea.setAttribute('rows', '10');

    var ieButtonsRoot = Web.CreateElement('div', 'section_text', ie);
    Web.AddButton('Import', '/market/import', 5, Settings.Import, ieButtonsRoot, true);
    Web.AddButton('Export', '/market/export', 5, Settings.Export, ieButtonsRoot, true);
    Web.AddButton('Wipe', '/market/wipe', 5, Settings.Wipe, ieButtonsRoot, true);

    var buttonsRoot = Web.CreateElement('div', 'section_text', ie);
    Web.AddButton('Back to city shops', '/market', 5, Settings.BackToMarket, buttonsRoot);
}

Settings.Export = function () {
    var container = new Map(undefined, ',,,', ';;;');
    var select = document.getElementById('export-selector');
    switch (select.value) {
        case '--Everything--':
            Settings.ExportVariables(container, function () { return true; })
            break;
        case '--Static data--':
            Settings.ExportVariables(container, Settings.IsStaticVariableName);
            break;
        case '--Personal data--':
            Settings.ExportVariables(container, function (name) { return !Settings.IsStaticVariableName(name); });
            break;
        default:
            container.insert(select.value, Storage.get(select.value));
    }
    container.insert('DataVersion', Storage.get('DataVersion'));
    document.getElementsByTagName('textarea')[0].value = container.toString();
}

Settings.ExportVariables = function (container, include) {
    Storage.foreach(function (key) {
        console.log(key + ':' + include(key));
        if (include(key))
            container.insert(key, Storage.get(key));
    });
}

Settings.IsStaticVariableName = function (name) {
    return (name == 'ShopNames'
        || name == 'Items'
        || name == 'CraftShops'
        || name == 'ItemShops'
        || name.indexOf('Shop_') == 0);
}

Settings.Wipe = function () {
    var keys = Storage.list();
    for (var key = 0; key < keys.length; key++ ) {
        var value = keys[key];
        Storage.remove(value);
    }
}

Settings.Import = function () {
    var container = new Map(document.getElementsByTagName('textarea')[0].value, ',,,', ';;;');
    var containerVersion = container.get('DataVersion')[0];
    if (containerVersion == undefined) {
        if (!confirm('You are trying to import data from an unknown version. Are you sure you do want to continue?'))
            return;
        containerVersion = '110301'; // assume it is from the version just before implementing this
    }
    if (containerVersion < dataVersion) {
        // TODO: update data first
        // - do backup, clear, import, update, export, import backup, import
        // OR run backup on container - another implementation of Storage

        if (!confirm('You are trying to import data from version ' + containerVersion + ' but you have version ' + dataVersion + '. There probably were some updates in data structure in the meantime. Do you want to try your luck and import it anyway?'))
            return;
        container.remove('DataVersion');
    }
    if (containerVersion > dataVersion) {
        alert('Imported data are from newer version of this script. Please update it first.');
        return;
    }

    container.foreach(function (key, values) {
        Storage.set(key, values[0]);
    });
}

Settings.Attach = function() {
    if (Launcher.UrlTest.EndsWith('/market')(document.URL))
        Settings.AlterMarket(document);
}

///////////////////////
// Item availability //
///////////////////////

ItemAvailability = {};

ItemAvailability.Items = function() {
    this.gmmap = new GMMap('Items', false, false);
}
ItemAvailability.Items.prototype.add = function(itemId, shopId) {
    return this.gmmap.add(itemId, shopId);
}
ItemAvailability.Items.prototype.getShops = function(itemId) {
    return this.gmmap.get(itemId);
}
ItemAvailability.Items.prototype.save = function() {
    this.gmmap.save();
}

ItemAvailability.ItemsInstance = null;
ItemAvailability.getItems = function() {
    if (ItemAvailability.ItemsInstance == null) {
        ItemAvailability.ItemsInstance = new ItemAvailability.Items();
    }
    return ItemAvailability.ItemsInstance;
}

ItemAvailability.ItemShops = function() {
    this.gmmap = new GMMap('ItemShops', false, false);
}
ItemAvailability.ItemShops.prototype.add = function(shopId, cityId) {
    return this.gmmap.add(shopId, cityId);
}
ItemAvailability.ItemShops.prototype.getCitiesWithShop = function(shopId) {
    return this.gmmap.get(shopId);
}
ItemAvailability.ItemShops.prototype.save = function() {
    this.gmmap.save();
}

ItemAvailability.ItemShopsInstance = null;
ItemAvailability.getItemShops = function() {
    if (ItemAvailability.ItemShopsInstance == null) {
        ItemAvailability.ItemShopsInstance = new ItemAvailability.ItemShops();
    }
    return ItemAvailability.ItemShopsInstance;
}


ItemAvailability.IsItemShop = function(shopType) {
	return (shopType[0] == '1' || shopType[0] == '2');
}

ItemAvailability.GetShopIdFromName = function(name) {
	return name.substring(5);
}

ItemAvailability.GetCitiesSellingItem = function (itemId) {
    this.cities = new Array();
    this.shopInThisCity = null;
    var items = ItemAvailability.getItems();
    var shops = items.getShops(itemId);
    for (var shop = 0; shop < shops.length; shop++) {
        var shopId = shops[shop];

        var cityIds = ItemAvailability.getItemShops().getCitiesWithShop(shopId);
        for (var cKey = 0; cKey < cityIds.length; cKey++ ) {
            var cityId = cityIds[cKey];
            if (this.cities.indexOf(cityId) == -1)
                this.cities.push(cityId); // avoid duplicities
            if (cityId == Estiah.CurrentCity) {
                this.shopInThisCity = shopId;
            }
        }
    }
    //GM_log(itemId + ' is in ' + this.cities.length + ' cities: ' + this.cities.join(',')); 
    return (this);
}

ItemAvailability.LoadItemShop = function(doc, shopId) {
    var itemsList = ItemAvailability.getItems();
	var items = doc.getElementsByClassName('itreasure BV_system_file');	// grey excluded
	for (var i = 0; i < items.length; i++) {
		var itemId = Estiah.GetItemId(items[i]);
		//GM_log(itemId);
		itemsList.add(itemId, shopId);
	}
	itemsList.save();
    var itemShops = ItemAvailability.getItemShops();
    itemShops.add(shopId, Estiah.CurrentCity);
    itemShops.save();
}

ItemAvailability.ShowCities = function() {
	Web.SwitchVisibility('cities', this.parentNode);
}

ItemAvailability.ShowBuy = function() {
	Web.SwitchVisibility('buy', this);
}

ItemAvailability.AlterCraftShops = function(root) {
    var shops = root.getElementsByClassName('wireframe_craft common_content common_wl');
    if (shops.lenght == 0)
        ItemAvailability.AlterCraftShop(root);
    else
        for (var i=0; i<shops.length; i++) {
            var shopCities = shops[i].getElementsByClassName('shop-city');
            var shopCity = (shopCities.length > 0) ? shopCities[0].innerHTML : undefined;
            ItemAvailability.AlterCraftShop(shops[i], shopCity);
        }
}

ItemAvailability.AlterCraftShop = function (root, shopCity) {
    var items = root.getElementsByClassName('nolink itreasure BV_system_file'); // removed 'mat '
    for (var i = 0; i < items.length; i++) {
        var itemId = Estiah.GetItemId(items[i]);
        var itemInfo = ItemAvailability.GetCitiesSellingItem(itemId);
        var cities = itemInfo.cities;
        if (cities.length > 0) {
            var insertPlaceholder = document.createElement('span');
            items[i].parentNode.insertBefore(insertPlaceholder, Web.FindBrAfter(items[i]));
            Web.appendText(' ', insertPlaceholder);

            // show
            var citiesSpan = document.createElement('span');
            citiesSpan.setAttribute('class', 'cities');

            var outerspan;
            for (var cityIt = 0; cityIt < cities.length; cityIt++) {
                if ((cityIt % 2) == 0) {
                    outerSpan = document.createElement('span');
                    outerSpan.style.display = 'inline-block';
                    outerSpan.style.padding = '1px';
                    outerSpan.style.verticalAlign = 'middle';
                    outerSpan.style.fontSize = '6pt';
                    citiesSpan.appendChild(outerSpan);
                }
                else
                    outerSpan.appendChild(document.createElement('br'));
                var innerSpan = document.createElement('span');
                if (cities[cityIt] == Estiah.CurrentCity)
                    innerSpan.style.color = '#F6BA68';
                Web.appendText(cities[cityIt], innerSpan);
                outerSpan.appendChild(innerSpan);
            }

            insertPlaceholder.appendChild(citiesSpan);
            if (itemInfo.shopInThisCity != null) {
                // [Buy]
                var buySpan = document.createElement('span');
                buySpan.setAttribute('class', 'buy');
                var a = document.createElement('a');
                a.style.color = '#F6BA68';
                a.setAttribute('href', '/shop/' + itemInfo.shopInThisCity);
                Web.appendText('[Buy]', a);
                buySpan.appendChild(a);
                // alternate
                var alt = document.createElement('span');
                Web.appendText(' [A]', alt);
                buySpan.appendChild(alt);
                alt.addEventListener("click", ItemAvailability.ShowCities, true);

                insertPlaceholder.appendChild(buySpan);

                citiesSpan.setAttribute('style', 'display:none');
                citiesSpan.addEventListener("click", ItemAvailability.ShowBuy, true);
            }

            // hide ingredients from crafting place
            if (cities.indexOf(shopCity) != -1) {
                var span = document.createElement('span');
                var element = items[i];
                var br = Web.FindBrAfter(element);
                var parent = element.parentNode;
                while (element != br) {
                    var next = element.nextSibling;
                    span.appendChild(element);
                    element = next;
                }
                span.style.opacity = 0.5;
                parent.insertBefore(span, br);
            }
        }
    }
}

ItemAvailability.AlterInventory = function (doc) {
    var items = doc.getElementsByClassName('common_file floating opacity bd1');
    for (var i = 0; i < items.length; i++) {
        var itemId = items[i].id.substr(14);
        var cities = ItemAvailability.GetCitiesSellingItem(itemId).cities;
        if (cities.length == 0)
            continue;
        var desc = items[i].getElementsByClassName('description')[0];
        desc.appendChild(document.createElement('br'));
        desc.appendChild(document.createElement('br'));
        Web.appendText('Can be bought in: ', desc);
        Web.appendText(cities.join(', '), Web.CreateElement('span', 'c2', desc));
    }
}

Launcher.Register('ItemAvailability', 'Shows in which cities you can buy an item.')
	.Read(
        Estiah.IsItemShopUrl,
		function(doc, url) {
			ItemAvailability.LoadItemShop(doc, Estiah.GetShopIdFromUrl(url));
		})
	.Modify(
        Estiah.IsCraftShopUrl,
		ItemAvailability.AlterCraftShops)
    .Modify(
        Launcher.UrlTest.EndsWith('/guild'),
		ItemAvailability.AlterCraftShop)
    .Modify(
        Estiah.Inventory.UrlTest,
        ItemAvailability.AlterInventory);

/////////////////
// CraftHelper //
/////////////////

CraftHelper = {};

// CharmShop //
CraftHelper.CharmShop = function(shopId, clear) {
	this.gmmap = new GMMap('Shop_' + shopId, false/*, clear*/);
}
CraftHelper.CharmShop.prototype.addCharm = function(charmId, html) {
	return this.gmmap.insert(charmId, html);
}
CraftHelper.CharmShop.prototype.save = function() {
	this.gmmap.save(); 
}
CraftHelper.CharmShop.prototype.foreach = function(callback) {
	this.gmmap.foreach(callback);
}
CraftHelper.CharmShop.prototype.getCharm = function(charmId) {
	return this.gmmap.get(charmId)[0];
}

// CharmTracker //
CraftHelper.CharmTracker = function() {
	this.gmmap = new GMMap('CharmTracker_' + Estiah.Player.Id, true);
}
CraftHelper.CharmTracker.prototype.contains = function(shopId, charmId)	{
	return this.gmmap.contains(shopId, charmId);
}
CraftHelper.CharmTracker.prototype.track = function(shopId, charmId) {
	return this.gmmap.add(shopId, charmId);
}
CraftHelper.CharmTracker.prototype.untrack = function(shopId, charmId) {
	return this.gmmap.remove(shopId, charmId);
}
CraftHelper.CharmTracker.prototype.foreach = function(callback) {
	return this.gmmap.foreach(callback);
}

CraftHelper.CharmTrackerInstance = null;
CraftHelper.getCharmTracker = function() {
    if (CraftHelper.CharmTrackerInstance == null)
        CraftHelper.CharmTrackerInstance = new CraftHelper.CharmTracker();
    return CraftHelper.CharmTrackerInstance;
}

// CraftShops //
CraftHelper.CraftShops = function() {
    this.gmmap = new GMMap('CraftShops', true);
}
CraftHelper.CraftShops.prototype.addCityShop = function(cityId, shopId) {
	return this.gmmap.add(shopId, cityId);
}
CraftHelper.CraftShops.prototype.getCitiesWithShop = function(shopId) {
	return this.gmmap.get(shopId);
}

CraftHelper.CraftShopsInstance = null;
CraftHelper.getCraftShops = function() {
    if (CraftHelper.CraftShopsInstance == null) {
        CraftHelper.CraftShopsInstance = new CraftHelper.CraftShops();
    }
    return CraftHelper.CraftShopsInstance;
}


// ShopNames //
CraftHelper.ShopNames = function() {
    this.gmmap = new GMMap('ShopNames', true);
}
CraftHelper.ShopNames.prototype.addShop = function(shopId, name, desc) {
    return this.gmmap.insert(shopId, name, desc);
}
CraftHelper.ShopNames.prototype.foreach = function(callback) {
    this.gmmap.foreach(callback);
}
CraftHelper.ShopNames.prototype.getShopName = function(shopId) {
    return this.gmmap.get(shopId);
}
CraftHelper.ShopNamesInstance = null;
CraftHelper.GetShopNames = function() {
    if (CraftHelper.ShopNamesInstance == null)
        CraftHelper.ShopNamesInstance = new CraftHelper.ShopNames();
    return CraftHelper.ShopNamesInstance;
}

CraftHelper.UpdateCharmAndItemCounts = function (root, doneCallback) {
    Estiah.Fetcher.FetchItemAndCharmCount(function (itemCounts, charmCounts) {
        var counts = root.getElementsByClassName('count');
        for (var c = 0; c < counts.length; c++) {
            var count = charmCounts[Estiah.Charms._getCharmIdFromCountEl(counts[c])];
            counts[c].innerHTML = (count == undefined) ? '0' : count;
        }

        var items = root.getElementsByClassName('mat nolink BV_system_file');
        for (var key = 0; key < items.length; key++) {
            var item = items[key];
            var itemId = item.href.substring(item.href.lastIndexOf('/') + 1);

            var count = itemCounts[itemId];

            var toUpdate = item.parentNode.getElementsByClassName('PT_update_count_t0i' + itemId);
            for (var uKey = 0; uKey < toUpdate.length; uKey++) {
                toUpdate[uKey].innerHTML = (count == undefined) ? '0' : count;
            }
        }
        if (doneCallback != undefined)
            doneCallback();
    });
}

CraftHelper.LoadVendorShop = function(doc, shopId) {	// 3
	CraftHelper.LoadCharmShop(doc, shopId, 'cardframe_lr', 9);
}

CraftHelper.LoadCraftShop = function(doc, shopId) {		// 4, 6
	CraftHelper.LoadCharmShop(doc, shopId, 'craft', 5);
}

CraftHelper.LoadCharmShop = function(doc, shopId, className, charmIdOffset) {
    CraftHelper.getCraftShops().addCityShop(Estiah.CurrentCity, shopId);
	var charmMap = new CraftHelper.CharmShop(shopId, true);
	var charms = doc.getElementsByClassName(className);
	for (var i = 0; i < charms.length; i++) {
		var charmId = charms[i].id.substring(charmIdOffset);
		charmMap.addCharm(charmId, charms[i].innerHTML);
	}
	charmMap.save();
}

CraftHelper.AlterMarket = function(doc) {
	var backButton = doc.getElementsByClassName('button button_c5')[0];
    backButton.setAttribute('class', backButton.getAttribute('class') + ' decision');
	Web.AddButton('Show all shops', '/market/all', 5, CraftHelper.ShowAllShops, backButton.parentNode, true);
}

CraftHelper.AlterCraftShop = function(doc, url) {
    var shopId = Estiah.GetShopIdFromUrl(url);
    //GM_log(shopId);
    if (shopId == 'tracked')
        return;
    var charms = doc.getElementsByClassName('craft');
    for (var i = 0; i < charms.length; i++) {
        CraftHelper.AddTrackButton(charms[i], shopId);
    }
}

CraftHelper.CreateAllShopsPage = function() {
	var allShops = Web.CreatePage('All shops', 'Shops from all visited cities', 'market', 'AllShops', 'wireframe_2');

	var shopsFrame = Web.CreateElement('div', 'wireframe_market common_content common_wl', allShops);
	var shopRoot = Web.CreateElement('div', 'section_text format', shopsFrame);

	var tracking = Estiah.Market.AddShopGroup('bread', 'Interesting Stuff', shopRoot);
	CraftHelper.AddTrackingShop(tracking);

	var vendor = null;
	var craft = null;
	var pvp = null;
	var event = null;
	CraftHelper.GetShopNames().foreach(function(shopId, info) {
		switch (shopId[0])
			{
			case '3':
                if (vendor == null)
                    vendor = Estiah.Market.AddShopGroup('staff', 'Vendor Shops', shopRoot);
				CraftHelper.AddShop(shopId, 'cvendor', info[0], info[1], vendor);
				break;
			case '4':
                if (craft == null)
                    craft = Estiah.Market.AddShopGroup('anvil', 'Craft Shops', shopRoot);
				CraftHelper.AddShop(shopId, 'ccraft', info[0], info[1], craft);
				break;
			case '5':
                if (event == null)
                    event = Estiah.Market.AddShopGroup('axe', 'Event Shops', shopRoot);
				CraftHelper.AddShop(shopId, 'item', info[0], '', event);
				break;
			case '6':
                if (pvp == null)
                    pvp = Estiah.Market.AddShopGroup('crosssword', 'Pvp Shops', shopRoot);
				CraftHelper.AddShop(shopId, 'ipvp', info[0], info[1], pvp);
				break;
			default:
				break;
		};
	});

	var buttonsRoot = Web.CreateElement('div', 'section_text', shopsFrame);
	Web.AddButton('Back to city shops', '/market', 5, CraftHelper.ShowCityShops, buttonsRoot);
}

CraftHelper.AddShop = function (shopId, className, shopName, shopDesc, root) {
    var shop = Estiah.Market.AddShop(shopId, className, shopName, shopDesc, CraftHelper.ShowShop, root);

    var cities = CraftHelper.getCraftShops().getCitiesWithShop(shopId);
    var desc = shop.getElementsByClassName('description');
    for (var i = 0; i < desc.length; i++) {
        var citiesEl = Web.CreateElement('span', 'dex', desc[i]);
        Web.appendText(' (' + cities.join(', ') + ')', citiesEl);
    }
}

CraftHelper.AddTrackingShop = function(root) {
    Estiah.Market.AddShop('tracked', 'item', 'Tracked Charms', 'Charms you have had marked for tracking', CraftHelper.CreateAndShowTracked, root);
}

CraftHelper.ShowAllShops = function() {
	var thisPage = this.parentNode.parentNode.parentNode.parentNode;
	var shopsRoot = thisPage.parentNode;
	if (shopsRoot.getElementsByClassName('AllShops').length == 0)
		CraftHelper.CreateAllShopsPage();
	Web.SwitchVisibility('AllShops', thisPage);
	scroll(0, 0);
}

CraftHelper.ShowCityShops = function() {
	Web.SwitchVisibility('CityShops', this.parentNode.parentNode.parentNode.parentNode);
	scroll(0, 0);
}

CraftHelper.ShowShop = function() {
	CraftHelper.ScrollTop = document.documentElement.scrollTop;
	var shopId = this.href.substring(this.href.lastIndexOf('/') + 1);
	var cityShops = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var info = CraftHelper.GetShopNames().getShopName(shopId);
	var shop;
	switch (shopId[0]) {
		case '3':
			shop = CraftHelper.CreateVendorShopPage(shopId, info[0], info[1]);
			break;
		case '4':
		case '5':
		case '6':
			shop = CraftHelper.CreateCraftShopPage(shopId, info[0], info[1]);
			break;
		default:
			return;
	};
	CraftHelper.PostprocessShop(shopId, shop);
	Web.SwitchVisibility('Shop' + shopId, cityShops);
}

CraftHelper.PostprocessShop = function (shopId, shop) {
    CraftHelper.UpdateCharmAndItemCounts(shop, function () {
        scroll(0, 0);
        Launcher.NewPageCreated('/shop/' + shopId, shop);
    });
}

CraftHelper.BackFromShop = function() {
	var thisPage = this.parentNode.parentNode.parentNode.parentNode.parentNode;
	Web.SwitchVisibility('AllShops', thisPage);
	// delete it
	thisPage.parentNode.removeChild(thisPage);
	scroll(0, CraftHelper.ScrollTop);
}

CraftHelper.CreateAndShowTracked = function () {
    CraftHelper.ScrollTop = document.documentElement.scrollTop;
    var allShops = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

    var page = Web.CreatePage('Tracked Charms', 'Charms you have had marked for tracking', 'craft', 'tracked', 'wireframe_2');
    page.id = 'trackingShop';
    var crafts = null;
    CraftHelper.getCharmTracker().foreach(function (shopId, charmIds) {
        var shop = new CraftHelper.CharmShop(shopId);

        shopDesc = CraftHelper.GetShopNames().getShopName(shopId);
        var title = Web.CreatePageTitle(shopDesc[0] + CraftHelper.GetCitiesWithShopHtml(shopId), shopDesc[1], 'craft', page);
        crafts = Web.CreateElement('div', 'craftlist format log', title);
        var craftSection;
        var i = 0;
        for (var key = 0; key < charmIds.length; key++ ) {
            var charmId = charmIds[key];
            if (i++ % 3 == 0)
                craftSection = Web.CreateElement('div', 'section_text', crafts);
            var div = Web.CreateElement('div', 'craft', craftSection);
            div.id = 'Craft' + charmId;
            div.innerHTML = shop.getCharm(charmId);
            CraftHelper.ClearCraftFunctions(div);
            CraftHelper.AddTrackButton(div, shopId);
        }
    });
    if (crafts == null) {
        var title = Web.CreatePageTitle('No tracked charms yet', '', 'craft', page);
        crafts = Web.CreateElement('div', 'craftlist format log', title);
    }
    var buttonsRoot = Web.CreateElement('div', 'section_text', crafts);
    Web.AddButton('Back to market', '/market/all', 5, CraftHelper.BackFromShop, buttonsRoot);

    CraftHelper.PostprocessShop('tracked', page);
    Web.SwitchVisibility('tracked', allShops);
}

CraftHelper.GetCitiesWithShopHtml = function(shopId) {
	var cities = CraftHelper.getCraftShops().getCitiesWithShop(shopId);
    var html = ' (';
    for (var i=0; i<cities.length; i++) {
        // note: interaction with ItemAvailability
        if (html.length>5)
            html += ', ';
        html += '<span class="shop-city c2">' + cities[i] + '</span>';
    }
    return html + ')';
}

CraftHelper.CreateCraftShopPage = function(shopId, shopName, shopDesc) {
	//GM_log(shopId);
	var shop = new CraftHelper.CharmShop(shopId);
	var page = Web.CreatePage(shopName + CraftHelper.GetCitiesWithShopHtml(shopId), shopDesc, 'craft', 'Shop' + shopId, 'wireframe_2');
	var crafts = Web.CreateElement('div', 'craftlist format log', page.firstChild);
	var craftSection;
	var i=0;
	shop.foreach(function(charmId, charmHTML) {
		if (charmHTML == undefined)
			return;
		if (i++ % 3 == 0)
			craftSection = Web.CreateElement('div', 'section_text', crafts);
		var div = Web.CreateElement('div', 'craft', craftSection);
		div.id = 'Craft' + charmId;
		div.innerHTML = charmHTML;
        CraftHelper.ClearCraftFunctions(div);
	});
	var buttonsRoot = Web.CreateElement('div', 'section_text', crafts);
	Web.AddButton('Back to market', '/market/all', 5, CraftHelper.BackFromShop, buttonsRoot);
	return page;
}

CraftHelper.CreateVendorShopPage = function (shopId, shopName, shopDesc) {
    //GM_log(shopId);
    var shop = new CraftHelper.CharmShop(shopId);
    var page = Web.CreatePage(shopName + CraftHelper.GetCitiesWithShopHtml(shopId), shopDesc, 'shop', 'Shop' + shopId, 'wireframe_2');
    var items = Web.CreateElement('div', 'inventory shop format log', page.firstChild);
    var goodsSection = Web.CreateElement('div', 'goodslist c2', items);
    var i = 0;
    shop.foreach(function (charmId, charmHTML) {
        var div = Web.CreateElement('div', 'cardframe_lr cardbg_lr_common', goodsSection);
        div.id = 'ShopGoods' + charmId;
        div.innerHTML = charmHTML;
        var buys = div.getElementsByClassName('BV_shop_buy');
        for (var buy = 0; buy < buys.length; buy++ )
            Web.removeNode(buys[buy]);
    });
    var buttonsRoot = Web.CreateElement('div', 'section_text format', items);
    Web.AddButton('Back to market', '/market/all', 5, CraftHelper.BackFromShop, buttonsRoot);
    return page;
}

CraftHelper.ClearCraftFunctions = function (craft) {
    var functions = craft.getElementsByClassName('functions');
    for (var buttons = 0; buttons < functions.length; buttons++ )
        Web.removeNode(functions[buttons]);
}

CraftHelper.AddTrackButton = function(craft, shopId) {
	var functions = craft.getElementsByClassName('functions');
	var functs = null;
    if (functions.length>0)
        functs = functions[0];
    else {
	    var contents = craft.getElementsByClassName('content');
        if (contents.length == 0)
            return;
		functs = Web.CreateElement('div', 'functions');
		Web.AddAsFirstChild(functs, contents[0]);
    }
	var craftId = craft.id.substring(5);
	var href = shopId + '/' + craftId;
	var track = Web.AddInnerLink('[Track]', href, 'nolink track', CraftHelper.TrackCharm, functs);
	var untrack = Web.AddInnerLink('[Untrack]', href, 'nolink untrack', CraftHelper.UntrackCharm, functs);
	if (CraftHelper.getCharmTracker().contains(shopId, craftId))
		track.style.display = 'none';
	else
		untrack.style.display = 'none';
}

CraftHelper.TrackCharm = function() {
	var ids = this.href.split('/');
	CraftHelper.getCharmTracker().track(ids[ids.length-2], ids[ids.length-1]);
	Web.SwitchVisibility('untrack', this);
}

CraftHelper.UntrackCharm = function() {
	var ids = this.href.split('/');
	CraftHelper.getCharmTracker().untrack(ids[ids.length-2], ids[ids.length-1]);
	Web.SwitchVisibility('track', this);
}

CraftHelper.ReadShopNamesFromCity = function (doc) {
    var eventShops = doc.evaluate(
	    '//div[@class="site"]//div[@class="functions"]/a[. = "[Shop]"]',
	    doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < eventShops.snapshotLength; i++) {
        var shopId = Estiah.GetShopIdFromUrl(eventShops.snapshotItem(i).href);
        var names = eventShops.snapshotItem(i).parentNode.parentNode.getElementsByClassName('lhp');
        for (var name = 0; name < names.length; name++ )
            CraftHelper.GetShopNames().addShop(shopId, names[name].innerHTML);
    }
}

CraftHelper.ReadShopNamesFromMarket = function (doc) {
    var Shops = doc.evaluate(
		"//*[@class='stand']/*[@class='name bd1']/*", // shops
		doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < Shops.snapshotLength; i++) {
        var shopId = Estiah.GetShopIdFromUrl(String(Shops.snapshotItem(i)));
        // no item shops
        if (shopId[0] == '1' || shopId[0] == '2')
            continue;
        var descriptions = Shops.snapshotItem(i).parentNode.parentNode.getElementsByClassName('description');
        for (var desc = 0; desc < descriptions.length; desc++ )
            CraftHelper.GetShopNames().addShop(shopId, Shops.snapshotItem(i).innerHTML, descriptions[desc].innerHTML);
    }
}

CraftHelper.AlterInventory = function (doc) {
    Estiah.Charms.FetchCharmCounts(function (charmCounts) {
        var itemNames = new Object();
        var receipts = new Object();
        var itemUsageCh = new Map();
        var itemUsageI = new Map();

        // parse charm data
        var temp = document.createElement('div');
        CraftHelper.GetShopNames().foreach(function (shopId, info) {
            var shop = new CraftHelper.CharmShop(shopId);
            shop.foreach(function (craftId, craftHTML) {
                temp.innerHTML = craftHTML;
                var title = temp.getElementsByClassName('recipe outline c2');
                if (title.length == 0)
                    return;
                var receipt = new Object();
                receipt.craftName = title[0].innerHTML;
                receipt.shopId = shopId;
                var charmId = Estiah.Charms.GetCharmId(temp);
                if (charmId != undefined) {
                    receipt.charmId = charmId;
                } else {
                    // item
                    var itemLink = temp.querySelector('.list + .list a');
                    receipt.itemId = Web.GetLastPartOfHref(itemLink);
                    // console.log(shopId + '/' + receipt.itemId + ' ' + receipt.craftName);
                }
                var ingredients = temp.querySelectorAll('.recipe + .list .content > a');
                //GM_log('ingredients of ' + receipt.craftName + ' (' + charmId + ')');
                for (var i = 0; i < ingredients.length; i++) {
                    var itemName = ingredients[i].innerHTML;
                    var itemId = Web.GetLastPartOfHref(ingredients[i]);
                    var itemCount = Web.FindTagAfter(ingredients[i], 'SPAN').innerHTML.substr(1);

                    //GM_log(itemName + ' (' + itemId + ') x ' + itemCount);
                    itemNames[itemId] = itemName;
                    receipt[itemId] = itemCount;
                    if (charmId == undefined)
                        itemUsageI.add(itemId, craftId);
                    else
                        itemUsageCh.add(itemId, craftId);
                }
                receipts[craftId] = receipt;
            });
        });

        var inventoryItemCounts = Estiah.Inventory._getItemCounts(doc);

        var items = doc.getElementsByClassName('common_file floating opacity bd1');
        for (var i = 0; i < items.length; i++) {
            var itemId = items[i].id.substr(14);
            var usageCh = itemUsageCh.get(itemId);
            var usageI = itemUsageI.get(itemId);
            if (usageCh.length == 0 && usageI.length == 0)
                continue;
            var desc = items[i].querySelector('.description');
            desc.appendChild(document.createElement('br'));
            desc.appendChild(document.createElement('br'));
            Web.appendText('Useful in following crafts:', desc);
            if (usageCh.length > 0) {
                for (var j = 0; j < usageCh.length; j++) {
                    var craftId = usageCh[j];
                    CraftHelper.AddInventoryTooltipItem(desc, itemId, craftId, receipts[craftId], charmCounts);
                }
            }
            if (usageI.length > 0) {
                if (usageCh.length > 0)
                    desc.appendChild(document.createElement('br'));
                for (var j = 0; j < usageI.length; j++) {
                    desc.appendChild(document.createElement('br'));
                    var craftId = usageI[j];
                    var craftName = receipts[craftId].craftName;
                    var itemCount = receipts[craftId][itemId];
                    var resultItemId = receipts[craftId].itemId;
                    var resultItemCount = inventoryItemCounts[resultItemId];
                    if (resultItemCount == undefined)
                        resultItemCount = 0;
                    var craftDesc = Web.CreateElement('span', 'craft', desc);
                    Web.appendText('x' + itemCount + ' in ', craftDesc);
                    var color = CraftHelper.getCharmTracker().contains(receipts[craftId].shopId, craftId) ? 'iepic' : 'c2';
                    Web.appendText(craftName, Web.CreateElement('span', color, craftDesc));
                    Web.appendText(' (' + resultItemCount + ')', craftDesc);

                    var resultInCharms = itemUsageCh.get(resultItemId);
                    var needed = true;
                    if (resultInCharms.length > 0) {
                        needed = false;
                        for (var k = 0; k < resultInCharms.length; k++) {
                            var chCraftId = resultInCharms[k];
                            needed |= CraftHelper.AddInventoryTooltipItem(desc, resultItemId, chCraftId, receipts[chCraftId], charmCounts, '- ');
                        }
                    }
                    if (!needed)
                        craftDesc.style.opacity = 0.5;
                }
            }
        }
    });
}

CraftHelper.AddInventoryTooltipItem = function (desc, itemId, craftId, receipt, charmCounts, prefix) {
    desc.appendChild(document.createElement('br'));
    var charmId = receipt.charmId;
    var charmName = receipt.craftName;
    var itemCount = receipt[itemId];
    var charmCount = charmCounts[charmId];
    if (charmCount == undefined)
        charmCount = 0;
    var craftDesc = Web.CreateElement('span', 'craft', desc);
    if (prefix != undefined)
        Web.appendText(prefix, craftDesc);
    Web.appendText('x' + itemCount + ' in ', craftDesc);
    var color = CraftHelper.getCharmTracker().contains(receipt.shopId, craftId) ? 'iepic' : 'c2';
    Web.appendText(charmName, Web.CreateElement('span', color, craftDesc));
    Web.appendText(' (' + charmCount + ')', craftDesc);
    if (charmCount == 5) {
        craftDesc.style.opacity = 0.5;
        return false;
    }
    return true;
}

Launcher.Register('CraftHelper', 'Remembers all charms you could want to craft. Also allows to track interesting ones.')
    .Read(
        Estiah.IsVendorShopUrl,
        function(doc, url) {
            CraftHelper.LoadVendorShop(doc, Estiah.GetShopIdFromUrl(url));
        })
    .Read(
        Estiah.IsCraftShopUrl,
        function(doc, url) {
            CraftHelper.LoadCraftShop(doc, Estiah.GetShopIdFromUrl(url));
        })
    .Modify(
        Estiah.IsCraftShopUrl,
        CraftHelper.AlterCraftShop)
    .Read(
        Launcher.UrlTest.EndsWith('/city'),
        CraftHelper.ReadShopNamesFromCity)
    .Read(
        Launcher.UrlTest.EndsWith('/market'),
        CraftHelper.ReadShopNamesFromMarket)
    .Modify(
        Launcher.UrlTest.EndsWith('/market'),
        CraftHelper.AlterMarket)
    .Modify(
        Estiah.Inventory.UrlTest,
        CraftHelper.AlterInventory);


/////////////////////////////////////
// Item availability & Marketplace //
/////////////////////////////////////

CityLoader = {};

CityLoader.LoadCity = function (doc) {
    //GM_log('loading city ' + Estiah.CurrentCity);
    // loading shops is connected to web.httprequest function, it will be handled automatically - therefore empty success functions

    var eventShops = doc.evaluate(
	    '//div[@class="site"]//div[@class="functions"]/a[. = "[Shop]"]',
	    doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < eventShops.snapshotLength; i++) {
        Web.HttpRequest(eventShops.snapshotItem(i).getAttribute('href'), function () { });
    }

    Web.HttpRequest('http://www.estiah.com/market', function (response) {
        var Shops = response.evaluate(
		    "//*[@class='stand']/*[@class='name bd1']/*", // shops
		    response, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < Shops.snapshotLength; i++) {
            Web.HttpRequest(Shops.snapshotItem(i).getAttribute('href'), function () { });
        }
    });
}

Launcher.Register('CityLoader', 'When you enter the city, this loads all city shops for you. Useful with ItemAvailability and CraftHelper.')
    .Read(
        Launcher.UrlTest.EndsWith('/city'),
        CityLoader.LoadCity);

///////////////////
// AutoSelectPet //
///////////////////

AutoSelectPet = {};
AutoSelectPet.ClickByClassName = function(doc, className) {
    var pets = doc.getElementsByClassName(className);
    if (pets.length == 0)
        return;
    Web.MouseClick(pets[0]);
}
AutoSelectPet.Race = function(doc) {
    AutoSelectPet.ClickByClassName(doc, 'BV_race_choose');
}
AutoSelectPet.Fight = function(doc) {
    AutoSelectPet.ClickByClassName(doc, 'BV_admission_choose');
}

Launcher.Register('AutoSelectPet', 'Preselects your first pet for a race / fight.')
    .Modify(
        Launcher.UrlTest.EndsWith('/city/race'),
        AutoSelectPet.Race)
    .Modify(
        Launcher.UrlTest.EndsWith('/city/fight'),
        AutoSelectPet.Fight);

///////////////
// NewCharms //
///////////////

NewCharms = {};
NewCharms.SeenCards = function() {
    this.gmlist = new GMList("NewCharms_SeenCards_" + Estiah.Player.Id, true);
}
NewCharms.SeenCards.prototype.Add = function(cardId) {
    return this.gmlist.add(cardId);
}
NewCharms.SeenCards.prototype.Contains = function(cardId) {
    return this.gmlist.contains(cardId);
}
NewCharms.SeenCards.prototype.IsEmpty = function() {
    return this.gmlist.count() == 0;
}

NewCharms.SeenCardsInstance = null;

NewCharms.AlterDeckPage = function(doc) {
    NewCharms.SeenCardsInstance = new NewCharms.SeenCards();
    var cards = doc.getElementsByClassName('card PT_picker_all');
    var firstRun = NewCharms.SeenCardsInstance.IsEmpty();
    var placeholder = null;
    for (var i=0; i<cards.length; i++) {
        var card = cards[i];
        var cardId = card.id.substr('CollectionCard'.length);
        if (firstRun) {
            NewCharms.SeenCardsInstance.Add(cardId);
            continue;
        }
        if (!NewCharms.SeenCardsInstance.Contains(cardId)) {
            if (placeholder == null) {
                placeholder = document.createElement('div');
                placeholder.setAttribute('class', 'cardlist active');
                Web.AddAsFirstChild(placeholder, doc.getElementsByClassName('z2 format')[0]);

                Web.appendText('New Charms', Web.CreateElement('div', 'title', placeholder));

                var info = Web.CreateElement('div', 'info highlight', placeholder);
                Web.appendText('You can use new charms!', Web.CreateElement('div', 'total', info));
                var funcs = Web.CreateElement('div', 'functions', info);
                Web.AddInnerLink('[Hide all]', 'card/hide/all', '', NewCharms.HideAllEvent, funcs);
            }
            var cardDiv = Web.CreateElement('div', 'card', placeholder);
            var plusA = card.getElementsByClassName('BV_deck_add')[0];
            Web.AddInnerLink('[+]', '/card/' + cardId, 'func_tier', Web.CreateMouseClickFunction(plusA), cardDiv);
            var nameDiv = Web.CreateElement('div', 'name', cardDiv);
            var nameA = card.getElementsByClassName('BV_system_file')[0];
            var cloneA = nameA.cloneNode(true);
            cloneA.removeAttribute('id');
            nameDiv.appendChild(cloneA);
            var funcs = Web.CreateElement('div', 'functions', cardDiv);
            Web.AddInnerLink('[Hide]', 'card/hide/' + cardId, 'func_sec lhp', NewCharms.HideEvent, funcs);
        }
    }
    // connect events (tooltips with charm descriptions)
    if (unsafeWindow.System != undefined)
	    unsafeWindow.System.register(unsafeWindow.System.rules);	
}

NewCharms.HideAllEvent = function() {
    var cardlist = this.parentNode.parentNode.parentNode;
    var cards = cardlist.getElementsByClassName('func_sec lhp');
    for (var i = 0; i < cards.length; i++) {
        var cardId = Web.GetLastPartOfHref(cards[i]);
        NewCharms.SeenCardsInstance.Add(cardId);
    }
    cardlist.style.display = 'none';
}

NewCharms.HideEvent = function() {
    var cardId = Web.GetLastPartOfHref(this);
    NewCharms.SeenCardsInstance.Add(cardId);
    this.parentNode.parentNode.style.display = 'none';
}

Launcher.Register('NewCharms', 'Point out that there are new charms you can use.')
    .Modify(
        Launcher.UrlTest.Contains('/character/deck'),
        NewCharms.AlterDeckPage);

///////////////////////
// Penetrated damage //
///////////////////////

String.getTextBetween = function (str, startText, endText) {
    if (str == undefined)
        return undefined;
    var start = str.indexOf(startText);
    var end = str.indexOf(endText, start);
    if (start < 0 || end < 0)
        return undefined;
    start += startText.length;
    return str.substring(start, end);

}

PenetratedDmg = {};
PenetratedDmg.PenetratedDmg = function(root, type) {
    var descs = root.getElementsByClassName(type);
    var penetratedDmg = 0;
    for (var i=0; i<descs.length; i++) {
        var str = descs[i].innerHTML;
        var times = 1;
        var dmg = String.getTextBetween(str, '<strong>', '</strong>');
        if (dmg == undefined) {
            dmg = String.getTextBetween(str, '', ' ');
            if (descs[i].nextSibling != null) {
                var textAfter = descs[i].nextSibling.nodeValue;
                var timesText = String.getTextBetween(textAfter, 'during ', ' turns');
                if (timesText != undefined)
                    times = parseInt(timesText);
            }
        }
        var penetration = String.getTextBetween(str, '(', '%');
        if (dmg == undefined || penetration == undefined)
            continue;
        penetratedDmg += Math.floor(parseInt(dmg) * parseInt(penetration) / 100) * times;
        //descs[i].innerHTML = str.replace(')', ' = ' + penetratedDmg + ')');
    }
    if (penetratedDmg > 0) {
        Web.CreateElement('br', undefined, root);
        Web.CreateElement('br', undefined, root);
        Web.appendText('Penetrated ' + type + ' ' + penetratedDmg, Web.CreateElement('span', type, root));
    }
}
PenetratedDmg.AlterDeckPage = function(doc) {
    var descriptions = doc.getElementsByClassName('description');
    for (var i = 0; i < descriptions.length; i++) {
        var desc = descriptions[i];
        PenetratedDmg.PenetratedDmg(desc, 'melee');
        PenetratedDmg.PenetratedDmg(desc, 'magic');
        PenetratedDmg.PenetratedDmg(desc, 'special');
    }
}

Launcher.Register('PenetratedDmg', 'Did you ever wondered how many damage will this charm do to heavely armored opponent?')
    .Modify(
        Launcher.UrlTest.Contains('/character/deck'),
        PenetratedDmg.AlterDeckPage);

////////////////////////
// Hide used receipts //
////////////////////////

HideUsedReceipts = {};

HideUsedReceipts.AlterShopPage = function (root) {
    var crafts = root.getElementsByClassName('craft');
    for (var c = 0; c < crafts.length; c++) {
        var craft = crafts[c];
        var counts = craft.getElementsByClassName('count');
        if ((counts.length == 1) && (counts[0].innerHTML == 5))
            craft.style.opacity = 0.3;
    }
}

Launcher.Register('HideUsedReceipts', 'Hides receipts of charms you have already five of.')
    .Modify(
        Estiah.IsCraftShopUrl,
        HideUsedReceipts.AlterShopPage)
    .Modify(
        Launcher.UrlTest.EndsWith('guild/showcase'),
        HideUsedReceipts.AlterShopPage);

/////////////////////////////
// Hide low level bounties //
/////////////////////////////

HideLowLevelBounties = {};
HideLowLevelBounties.TypeSelect = null;

HideLowLevelBounties.AlterPvPPage = function (doc) {
    HideLowLevelBounties.TypeSelect = document.getElementsByName('type')[0];
    var moblist = doc.getElementsByClassName('moblist')[0];
    var players = moblist.getElementsByClassName('mob');
    for (var p = 0; p < players.length; p++)
        HideLowLevelBounties.AlterPlayer(players[p]);
    moblist.addEventListener('DOMNodeInserted', HideLowLevelBounties.SomethingInserted, false);
}

HideLowLevelBounties.SomethingInserted = function (event) {
    var cl = event.target.getAttribute('class');
    if (cl == undefined || cl.indexOf('mob') == -1)
        return;
    HideLowLevelBounties.AlterPlayer(event.target);
}

HideLowLevelBounties.AlterPlayer = function (player) {
    if (HideLowLevelBounties.TypeSelect.value != 'bounty')
        return;
    var info = document.evaluate(
        'div[contains(@class, "info")]/strong',
        player, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (info == null)
        return;
    var level = info.innerHTML;

    if (Estiah.Player.Level - level > 1)
        player.style.opacity = 0.3;
}

Launcher.Register('HideLowLevelBounties', 'Hides players among players with bounty with lower level than yours -1.')
    .Modify(
        Launcher.UrlTest.EndsWith('pvp'),
        HideLowLevelBounties.AlterPvPPage);

///////////////////
// Items counter //
///////////////////

ItemsCounter = {};

ItemsCounter.AlterInventoryPage = function (doc) {
    var counts = Estiah.Inventory._getItemCounts(doc);
    for (var itemId in counts) {
        var tooltip = doc.getElementById('SystemInfoItem' + itemId);
        var title = tooltip.getElementsByClassName('title')[0];
        Web.appendText(' (x' + counts[itemId] + ')', title);
    }
}

Launcher.Register('ItemsCounter', 'Shows sum of inventory and storage item counts in inventory tooltip.')
    .Modify(
        Estiah.Inventory.UrlTest,
        ItemsCounter.AlterInventoryPage);


//////////////////////////
// Storage item watcher //
//////////////////////////

StorageItemsWatcher = {};

StorageItemsWatcher.getItems = function() {
    return new GMMap('ExpiringItems_' + Estiah.Player.Id, false, false);
}

StorageItemsWatcher.getLastChecked = function () {
    var check = Storage.get('ExpiringItems_LastChecked_' + Estiah.Player.Id);
    return (check == null) ? 0 : check;
}

StorageItemsWatcher.setLastChecked = function () {
    Storage.set('ExpiringItems_LastChecked_' + Estiah.Player.Id, new Date().getTime().toString());
}

StorageItemsWatcher.doNotRepeatYourself = false;

StorageItemsWatcher.Update = function (doc) {
    if (StorageItemsWatcher.doNotRepeatYourself) return;    // called both from Check callback and Launcher / Read

    var expiring = doc.getElementsByClassName('clock_c2');
    // console.log(expiring.length + ' items expiring');
    var storedItems = StorageItemsWatcher.getItems();

    var toRemove = [];
    // console.log(doc.querySelectorAll('div.name a'));
    storedItems.foreach(function (name) {
        var item = doc.evaluate(
		    '//*[@class="name" and *[text()=' + Web.SanitizeXpathName(name) + ']]/*[contains(@class, "clock")]',
		    doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        // console.log(item);
        if (item == null || item.getAttribute('class').indexOf('clock_c2') < 0) {
            toRemove.push(name);
        }
    });
    // console.log(toRemove);
    for (var r = 0; r < toRemove.length; r++) {
        // console.log('removing ' + toRemove[r]);
        storedItems.remove(toRemove[r]);
    }

    var lastChecked = StorageItemsWatcher.getLastChecked();
    for (var e = 0; e < expiring.length; e++) {
        var item = expiring[e].parentNode.parentNode;
        var nameEl = item.getElementsByClassName('BV_system_file')[0];
        var name = nameEl.innerHTML;
        if (!storedItems.contains(name)) {
            var rarity = nameEl.getAttribute('class').split(' ', 1);
            var count = item.querySelector('div.count strong').innerHTML;
            // console.log(name + ' ' + rarity + ' ' + count + ' ' + lastChecked);
            storedItems.insert(name, rarity, count, lastChecked);
        }
    }
    storedItems.save();
    StorageItemsWatcher.setLastChecked();
    StorageItemsWatcher.doNotRepeatYourself = true;
}

StorageItemsWatcher.CheckAndAlterPage = function (doc) {
    var lastChecked = StorageItemsWatcher.getLastChecked();
    if (new Date().getTime() - lastChecked > 1000 * 60 * 30 /* 30 minutes */) {
        Web.HttpRequest('http://www.estiah.com/character/inventory', function (inv) {
            StorageItemsWatcher.Update(inv);
            StorageItemsWatcher.AlterPage(doc);
        });
    } else
        StorageItemsWatcher.AlterPage(doc);
}

StorageItemsWatcher.AlterPage = function (doc) {
    var storedItems = StorageItemsWatcher.getItems();
    var count = 0;
    for (k in storedItems.map.container)
        count++;
    if (count > 0) {
        var menu = doc.getElementsByClassName('wireframe_menu')[0];
        Web.CreateElement('div', 'separatorh bd1', menu);
        var entry = Web.CreateElement('div', 'entry BV_menu_dropdown', menu);
        Web.CreateElement('a', 'nolink disabled', entry).innerHTML = 'Expiring (' + count + ')';
        var items = Web.CreateElement('div', 'bd1 bg1 dropdown floating', entry);
        items.style.display = 'none';

        var now = new Date().getTime();
        storedItems.foreach(function (name, info) {
            var row = Web.CreateElement('div', 'left', Web.CreateElement('div', 'row', items));
            Web.CreateElement('span', info[0], row).innerHTML = name;
            Web.appendText(' (' + info[1] + ') ', row);
            var timeRemaining = Math.floor((24 - (now - info[2]) / 1000 / 60 / 60) * 10) / 10;
            Web.CreateElement('span', 'disabled', row).innerHTML = (timeRemaining >= 0) ? timeRemaining + '+h' : '?';
        });
        if (unsafeWindow.System != undefined)
            unsafeWindow.System.register(unsafeWindow.Menu.rules);
    }
}

StorageItemsWatcher.MakeItAltFriendly = function () {
    var items = Storage.get('ExpiringItems');
    if (items != null)
        Storage.set('ExpiringItems_' + Estiah.Player.Id, items);
    var checked = Storage.get('ExpiringItems_LastChecked');
    if (checked != null)
        Storage.set('ExpiringItems_LastChecked_' + Estiah.Player.Id, checked);
    Storage.remove('ExpiringItems');
    Storage.remove('ExpiringItems_LastChecked');
}

Launcher.Register('StorageItemsWatcher', 'Watches for items that will expire soon. Check is performed once per 1/2h or by visiting inventory.')
    .Read(
        Estiah.Inventory.UrlTest,
        StorageItemsWatcher.Update)
    .Modify(
        Launcher.UrlTest.EveryPage,
        StorageItemsWatcher.CheckAndAlterPage)
    .UpdateData(
        '110301',
        StorageItemsWatcher.MakeItAltFriendly);


//////////////////
// Auto relogin //
//////////////////

AutoRelogin = {};

AutoRelogin.TryLogIn = null;
AutoRelogin.LogIn = function (doc) {
    var inputs = doc.querySelectorAll('#AuthForm .input');

    AutoRelogin.TryLogIn = function () {
        var filled = true;
        for (var i = 0; i < inputs.length; i++) {
            if (!inputs[i].value.length)
                filled = false;
        }
        if (filled) {
            // console.log(inputs[0].value + ':' + inputs[1].value);
            Web.MouseClick(doc.querySelector('#AuthSubmit a'));
        }
        else
            setTimeout(AutoRelogin.TryLogIn, 100);
    }

    AutoRelogin.TryLogIn();
}

Launcher.Register('AutoRelogin', 'If you have set autofill login/pass, it will refresh your lost session.')
    .Modify(
        Launcher.UrlTest.LogIn,
        AutoRelogin.LogIn);

////////////
////////////
/// Body ///
////////////
////////////

if (document.URL.indexOf('/rebuild')>-1)
{
    DataUpdate.RemoveEmptyValues();
}

Launcher.Launch();
