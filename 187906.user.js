// ==UserScript==
// @name        Page title Fixer
// @namespace   http://ajorpheus.com
// @version     0.1
// @description Removes Special characters from page title
// @include     *
// @copyright   2013+, ajorpheus
// @grant       GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var myObserver       = new MutationObserver (titleChangeDetector);
var obsConfig        = {
    //-- Subtree needed.
    childList: true, characterData: true, subtree: true
};

myObserver.observe (document, obsConfig);

function titleChangeHandler () {
    this.weInitiatedChange      = this.weInitiatedChange || false;
    if (this.weInitiatedChange) {
        this.weInitiatedChange  = false;
        //-- No further action needed
    }
    else {
        this.weInitiatedChange  = true;
        document.title = document.title.replace (/[^a-zA-Z0-9_-]/g,'_');
    }
}

function titleChangeDetector (mutationRecords) {

    mutationRecords.forEach ( function (mutation) {
        //-- Sensible, Firefox
        if (    mutation.type                       == "childList"
            &&  mutation.target.nodeName            == "TITLE"
        ) {
            titleChangeHandler ();
        }
        //-- WTF, Chrome
        else if (mutation.type                      == "characterData"
            &&  mutation.target.parentNode.nodeName == "TITLE"
        ) {
            titleChangeHandler ();
        }
    } );
}

//-- Probably best to wait for first title change, but uncomment the next line if desired.
titleChangeHandler ();

