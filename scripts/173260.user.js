// ==UserScript==
// @name        Block HKGolden Anti-ADBlock
// @namespace   hkgolden
// @version 1
// @description Block HKGolden Anti-ADBlock by Akito
// @include     http://forum*.hkgolden.com/*
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

function overwrite(a) {
    if (Object.defineProperty) {
        Object.defineProperty(unsafeWindow, a, {
            value: function () {},
            writable: false,
            configurable: false
        })
    } else {
        unsafeWindow.__defineGetter__(a, function () {
            return function () {}
        })
    }
}

overwrite("blockAdblockUser");