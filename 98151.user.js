// ==UserScript==
// @name           matchesSelector
// @namespace      Kambfhase
// @include        https://www.mozilla.org/*
// ==/UserScript==

var arr =[
    unsafeWindow.document.createElement('div').mozMatchesSelector('div'), // true
    unsafeWindow.document.documentElement.mozMatchesSelector.call( 
      unsafeWindow.document.createElement('div'), 'div'), // false, should be true
    window.document.documentElement.mozMatchesSelector.call( 
      window.document.createElement('div'), 'div'), // false
    window.document.documentElement.mozMatchesSelector.apply( 
      window.document.createElement('div'), ['div'])]; // false
    
unsafeWindow.console && unsafeWindow.console.log ? unsafeWindow.console.log( arr) : GM_log( arr);