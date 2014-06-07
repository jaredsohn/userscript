// ==UserScript==
// @name           Userscripts.org Remove Spam Scripts
// @namespace      http://userscripts.org/users/23652
// @description    Removes the userscripts that there are too many of. Keywords option inside the script source
// @include        http://userscripts.org/
// @include        http://userscripts.org/tags/*
// @include        http://userscripts.org/scripts
// @include        http://userscripts.org/scripts*?*=*
// @include        http://userscripts.org/users/*/scripts*
// @include        https://userscripts.org/
// @include        https://userscripts.org/tags/*
// @include        https://userscripts.org/scripts
// @include        https://userscripts.org/scripts*?*=*
// @include        https://userscripts.org/users/*/scripts*
// @copyright      JoeSimmons
// @version        1.1.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @require        https://raw.github.com/joesimmons/jsl/master/jsl.user.js?name=JoeSimmonsLibrary
// @require        http://usocheckup.dune.net/34652.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_xmlhttpRequest
// ==/UserScript==

/* CHANGLEOG

1.1.1 (9/26/2013)
    - started this changelog
    - updated the code a little. now using JSL for dealing with elements
        and I've removed the extended Array methods

*/

+function () {

    // partInArray by JoeSimmons
    function partInArray(array, passedValue) {
        var returnValue = false;

        array.forEach(function (value) {
            if (passedValue.toLowerCase().indexOf( value.toLowerCase() ) !== -1) {
                returnValue = true;
                return;
            }
        });

        return returnValue;
    }

    function addKeyword() {
        var k = prompt('Keyword to block'),
            keywords = GM_getValue('keywords','');

        if (typeof k === 'string' && k.trim() !== '') {
            k = k.replace(/,/g, '').toLowerCase();

            if (!keywords.split(',').indexOf(k) !== -1) {
                GM_setValue('keywords', keywords !== '' ? keywords + ',' + k : k);
                main();

                if ( confirm('Add another?') ) {
                    addKeyword();
                } else {
                    main();
                }
            } else {
                alert('Keyword already exists');
            }
        }

        main();
    }

    function removeKeyword() {
        var keywords = GM_getValue('keywords', ''),
            ob = /^,|,$|^\w*,$/g,
            k;

        alert('The current keywords are...\n\n'+keywords.replace(/,/g, '\n'));
        k = prompt('Keyword to remove?');

        if (typeof k === 'string' && k.trim() !== '') {
            k = k.replace(/,/g, '').toLowerCase();

            if (keywords.split(',').indexOf(k) !== -1) {
                keywords = keywords.replace(k, '').replace(/,{2,}/g, ',');
                if ( ob.test(keywords) ) {
                    keywords=keywords.replace(ob, '');
                }
                GM_setValue('keywords', keywords);
                main();

                if ( confirm('Remove another?') ) {
                    removeKeyword();
                } else {
                    main();
                }
            } else {
                alert('Keyword doesn\'t exist.');
            }
        }

        main();
    }

    function resetKeywords() {
        if ( confirm('Are you sure you want to reset the keywords?') ) {
            GM_setValue('keywords', '');
        }
    }

    function main() {
        var keysArr = GM_getValue('keywords', '').split(','),
            scriptLinks = JSL('//td[@class="script-meat"]/a[contains(@href, "/scripts/show/")]'),
            scriptNum =/scripts\/show\/(\d+)/,
            text, id;

        if (keysArr.length === 1 && keysArr[0].trim() === '') return;

        scriptLinks.each(function (thisLink) {
            text = JSL(thisLink.parentNode).text().trim();
            [, id] = thisLink.href.match(scriptNum);
            if ( partInArray(keysArr, text) ) {
                //alert('Removing: #scripts-' + id + '\n\nHref: ' + thisLink.href + '\n\nText: ' + text);
                JSL('#scripts-' + id).remove();
            }
        });
    }

    if (typeof GM_registerMenuCommand === 'function') {
        GM_registerMenuCommand('Add a keyword to block', addKeyword);
        GM_registerMenuCommand('Remove a blocked keyword', removeKeyword);
        GM_registerMenuCommand('Reset blocked keywords', resetKeywords);
    }

    JSL.runAt('end', main);

}();