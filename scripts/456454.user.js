// ==UserScript==
//
// @name       Enhance TFS Defect Display
//
// @description  Gets rid of the annoying autoposts by ServiceONLINEBUILD, highlights sev1 & sev2 defects in query listings of defects
//
// @namespace  COMDSPDSA
//
// @author         Winkyboy
//
// @license        none
//
// @version        1.0
//
// @include    */tfs/*/_workitems*
//
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @//require			https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js
//
// @history        1.0 first version
//
// ==/UserScript==



var TIMEOUT = 250;
var MAXTIMEOUT = 5000;
var highlightMax = MAXTIMEOUT / TIMEOUT;
var scrollMax = MAXTIMEOUT / TIMEOUT;
var eraseMax = MAXTIMEOUT / TIMEOUT;

setTimeout(highlight, TIMEOUT);
setTimeout(scrollight, TIMEOUT);
setTimeout(erase, TIMEOUT);

function highlight()
{
    highlightMax--;
    var items = document.getElementsByClassName('grid-row');
    if (items.length == 0 && highlightMax > 0)
        setTimeout(highlight, TIMEOUT);
    else
    {
        $(".grid-row:contains('Sev 1')").css('font-weight', 'bold').css('color', 'red');    
        $(".grid-row:contains('Sev 2')").css('font-weight', 'bold');
        $(".grid-row:contains('Sev 3') > .grid-cell[title='1']").parent().css('color', 'blue');
        //$(".grid-cell[title='Need More Information']").parent().css('color', '#888888');
        //$(".grid-cell[title='Fixing']").parent().css('color', '#888888');
        $(".grid-row > .grid-cell[title='Yes']").css('font-weight', 'bold').css('color', 'red');
        
        $(".grid-row:contains('Resolved'):contains('Fixed')").css('color', '#506F3B');
		$( ".grid-row > .grid-cell:contains('The Fixed In field was updated as part of associating work items with the build.')" ).text('...');

        $('.richeditor-container').eq(0).css("height", $(window).height() - 580 + "px"); // maximize repro steps text area on defect pages
    }
}

function scrollight()
{
    scrollMax--;
    var items = document.getElementsByClassName('grid-canvas');
    if (items.length == 0 && scrollMax > 0)
        setTimeout(scrollight, TIMEOUT);
    else
    {
        $('.grid-canvas').scroll(function() {
        	setTimeout(highlight, TIMEOUT);
        });
    }
}

function erase()
{
    eraseMax--;
    var items = document.getElementsByClassName('message-row');
    if (items.length == 0 && eraseMax > 0)
        setTimeout(erase, TIMEOUT);
    else
    {
        $(".message-row:contains('ServiceONLINEBUILD')").hide();
        $(".tfs-collapsible-header:contains('ServiceONLINEBUILD')").hide();
    }
}

window.onpopstate = function(event) {
    highlightMax = MAXTIMEOUT / TIMEOUT;
    scrollMax = MAXTIMEOUT / TIMEOUT;
    eraseMax = MAXTIMEOUT / TIMEOUT;
    
    clearTimeout(highlight);
    clearTimeout(scrollight);
    clearTimeout(erase);
    
    setTimeout(highlight, 1000); // stupid hack
    setTimeout(scrollight, TIMEOUT);
    setTimeout(erase, TIMEOUT);
};
