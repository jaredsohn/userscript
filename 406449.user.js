// ==UserScript==
// @name         Protect the Console!
// @namespace    chris-l
// @version      0.2
// @description  Protect the console from facebook and the likes who try to disable it
// @include      http://*
// @include      https://*
// @run-at document-start
// ==/UserScript==

// pastebin with the code facebook and netflix are using to block the console:
// http://pastebin.com/Lx5gjXsA
// And this script does what that pastebin recommend; using Object.defineProperty to protect the console BEFORE a website tries to hijack it.
// (Btw, I don't have netflix, so I'm not sure how good it works there)

// Now, just using the line pastebin had was not enough (at least for me) to protect the console under facebook.
// I had to protect explictly _commandLineAPI
// writable:true was required for the dev tools functions like debug, undebug, etc.

Object.defineProperty(window.console, '_commandLineAPI', {configurable: false, writable: true });
