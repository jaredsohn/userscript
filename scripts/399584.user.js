// ==UserScript==
// @name        Stack Exchange: Confirm Review Approval
// @namespace   http://vyznev.net
// @description Pops up a confirmation dialog when you click "Approve" in suggested edit review
// @match       *://*.stackexchange.com/review/suggested-edits*
// @match       *://*.stackoverflow.com/review/suggested-edits*
// @match       *://*.superuser.com/review/suggested-edits*
// @match       *://*.serverfault.com/review/suggested-edits*
// @match       *://*.stackapps.com/review/suggested-edits*
// @match       *://*.mathoverflow.net/review/suggested-edits*
// @match       *://*.askubuntu.com/review/suggested-edits*
// @version     1.2
// @grant       none
// ==/UserScript==

// constants accessible both here and in injected code
var getConstants = function () {
    var constants = {};
    constants.className  = 'userscript-confirm-review-approval',
    constants.selector   = '.review-actions input[data-result-type="2"]:not(.' + constants.className + ')';
    constants.errorStyle = 'color: red; border: 1px solid red !important';
    return constants;
};
var constants = getConstants();
    
// code injected into the page context
var injected = function ( constants ) {  
    function addConfirmDialog () {
        var n = $( constants.selector ).click( function () {
            return confirm( "Are you sure you want to approve this edit?" );
        } ).addClass( constants.className ).length;
        // console.log( 'added confirmation dialog to ' + n + ' button(s)' );
    }

    // add the confirmation handler after a new review task is loaded    
    $( document ).ajaxComplete( function( event, xhr, settings ) {
        if ( settings.url != '/review/next-task' ) return;
        setTimeout( addConfirmDialog, 10 );
    } );
    
    // XXX: if the ajaxComplete() hook fails for some reason, this should do it
    setInterval( addConfirmDialog, 500 );
    // and if that's not enough, this'll give us one last chance to fix it
    $( '.review-actions' ).on( 'mouseover', constants.selector, addConfirmDialog );
};

// inject code
var script = document.createElement('script');
script.type = 'text/javascript';
script.textContent = '(' + injected + ')( (' + getConstants + ')() );';
document.body.appendChild(script);

// inject style
var style = document.createElement('style');
style.type = 'text/css';
style.textContent = constants.selector + ' { ' + constants.errorStyle + ' }';
document.head.appendChild(style);
