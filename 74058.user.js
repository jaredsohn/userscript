// ==UserScript==
// @name           DataStorage
// @namespace      sa'saren
// @description    Allows for easy storage of any data through eval. All credits for the actual code to James Campos.
// @include        *
// @require        http://userscripts.org/scripts/source/57756.user.js
// @history        0.0.1 Fixed storage objects so that they use eval as well.
// @history        0.0.0 Created
// @version        0.0.1
// ==/UserScript==
/*global ScriptUpdater,uneval,localStorage,GM_deleteValue,GM_setValue,GM_getValue */

ScriptUpdater.check(74058, "0.0.1")

// localStorage code from http://userscripts.org/topics/41177
// @copyright      2009, James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/

//if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {

var saveData = function(name, value, useStorage ) {
	var storage = useStorage;
	if ( !storage ) { storage = localStorage; }
	if ( GM_setValue && ( !useStorage ) ) {
		GM_setValue(name, uneval(value));
	} else if ( storage ) {
		//value = (typeof value)[0] + value;
		storage.setItem(name, uneval(value));
	} else {
		return false;
	}
	return true;
};

var deleteData = function (name, useStorage) {
	var storage = useStorage;
	if ( !storage ) { storage = localStorage; }
	if ( GM_deleteValue && ( !useStorage ) ) {
		GM_deleteValue(name);
	} else if ( storage ) {
		storage.removeItem(name);
	} else {
		return false;
	}
	return true;
};

var loadData = function(name, defaultValue, useStorage) {
	var storage = useStorage;
	if ( !storage ) { storage = localStorage; }
	if ( GM_getValue && ( !useStorage ) ) {
		var storedValue = GM_getValue(name);
		if (storedValue) {
			storedValue = eval(storedValue);
		} else {
			storedValue = defaultValue;
		}
		return defaultValue;
	} else if ( storage ) {
		var value = storage.getItem(name);
		if (!value) {
			return defaultValue;
		}
		return eval(value);
		/*
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
		*/
	}
};