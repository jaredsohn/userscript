// ==UserScript==
// @name @rd
// @namespace http://others.com/
// @version 1.4
// @description Remove ads in weibo.com
// @downloadURL http://others.com/js/redky.user.js
// @updateURL http://others.com/js/redky.user.meta.js
// @exclude
// @include /^(http(s)?:\/\/(www)?)?weibo\.com\/?/
// @match https://www.weibo.com/*
// @require http://others.com/js/redky.user.require.js
// @resource logo http://others.com/logo/11.jpg
// @run-at document-end
// @grant
// @icon http://others.com/logo/1.jpg?size=32x32
// ==/UserScript==



var selectors = {
    '#pl_content_biztips': 'none',
    '.footer_adv': 'none'
    '#pl_rightmod_ads35': function ( element ) {
        element.style.display = 'none';
    }
};

var doc = document;
var systemMap = {
    none: function ( element ) {
        element.style.display = 'none';
    }
};

var foreach = function ( elements, fn ) {
    Array.prototype.forEach.call( elements, function ( element ) {
        fn.call( null, element );
    });
}

for ( var selector in selectors ) {
    var value = selectors[ selector ];
    var sysFunc = systemMap[ value ];
    var elements = doc.querySelectorAll( selector );
    sysFunc && foreach( elements, sysFunc );
    typeof value === 'function' && foreach( elements, value );
}



