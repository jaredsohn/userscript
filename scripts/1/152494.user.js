// ==UserScript==
// @name            localStorage-block
// @description     Redirect localStorage to sessionStorage and blocks Web SQL Database
// @version         20130324192841
// @author          opsomh
// @namespace       http://userscripts.org/users/465520/scripts
// @downloadURL     http://userscripts.org/scripts/source/152494.user.js
// @updateURL       http://userscripts.org/scripts/source/152494.meta.js
// @grant           none
// @run-at          document-start
// @include         http://*
// ==/UserScript==

//interface Storage {
//    readonly attribute unsigned long length;
//    DOMString? key(unsigned long index);
//    getter DOMString getItem(DOMString key);
//    setter creator void setItem(DOMString key, DOMString value);
//    deleter void removeItem(DOMString key);
//    void clear();
//};

////1:
//Storage.prototype.setItem = function(k, v){throw 'QuotaExceededError';};

////2:
//Object.defineProperty(window.localStorage, 'length', {
//    get: function() {
//        return window.sessionStorage.length;
//    }
//});
//Storage.prototype._key = Storage.prototype.key;
//Storage.prototype.key = function(k){
//    return window.sessionStorage._key(k);
//};
//Storage.prototype._getItem = Storage.prototype.getItem;
//Storage.prototype.getItem = function(k){
//    return window.sessionStorage._getItem(k);
//};
//Storage.prototype._setItem = Storage.prototype.setItem;
//Storage.prototype.setItem = function(k, v){
//    window.sessionStorage._setItem(k, v);
//};
//Storage.prototype._removeItem = Storage.prototype.removeItem;
//Storage.prototype.removeItem = function(k){
//    window.sessionStorage._removeItem(k);
//};
//Storage.prototype._clear = Storage.prototype.clear;
//Storage.prototype.clear = function(){
//    window.sessionStorage._clear();
//};
////4(2):
Object.defineProperty(window, 'localStorage', {
    get: function sessionStorage() {
        return window.sessionStorage;
    }
});

////3:
//Object.defineProperty(window, "localStorage", new (function () {//new hidding Object
//    Object.defineProperty(this, "getItem", {
//        value: function (sKey) { return window.sessionStorage.getItem(sKey); },
//        writable: false,
//        configurable: false,
//        enumerable: false
//    });
//    Object.defineProperty(this, "key", {
//        value: function (nKeyId) { return window.sessionStorage.key(nKeyId); },
//        writable: false,
//        configurable: false,
//        enumerable: false
//    });
//    Object.defineProperty(this, "setItem", {
//        value: function (sKey, sValue) { window.sessionStorage.setItem(sKey, sValue); },
//        writable: false,
//        configurable: false,
//        enumerable: false
//    });
//    Object.defineProperty(this, "length", {
//        get: function () { return window.sessionStorage.length; },
//        configurable: false,
//        enumerable: false
//    });
//    Object.defineProperty(this, "removeItem", {
//        value: function (sKey) { window.sessionStorage.removeItem(sKey); },
//        writable: false,
//        configurable: false,
//        enumerable: false
//    });
//    this.get = function () {
//        return window.sessionStorage;
//    };
//    this.configurable = false;
//    this.enumerable = true;
//})());

Object.defineProperty(window, 'openDatabase', {
    get: function sessionStorage() {
        return true;//if undefined then not supported by browser
    }
});
