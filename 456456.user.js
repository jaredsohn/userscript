// ==UserScript==
// @name       TFS Layout Enhancements
// @version    1.0
// @description  Layout Fixes for TFS
// @include    http://*/tfs/*/TaskBoard*
// @include    */tfs/*/_workitems*
// @include    */tfs/*/_backlogs*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.ui-corner-top { float: left; }');
addGlobalStyle('.content .column { padding-right: 1em; }');

var TIMEOUT = 500;
var MAXTIMEOUT = 5000;
var resizeDefectMax = MAXTIMEOUT / TIMEOUT;
var resizeModalDefMax = MAXTIMEOUT / TIMEOUT;
var resizeRequirementMax = MAXTIMEOUT / TIMEOUT;
//var modalDefectFix = 850;
//var modalRequirementFix = 650;

setTimeout(resizeDefect, TIMEOUT);
setTimeout(resizeModalDef, TIMEOUT);
setTimeout(resizeRequirement, TIMEOUT);


$('.search-box').on( "click", function() {
    processMouseClick();
});

/* none of these work; probably a 'not created yet' issue...
$('.tbTile').on( "click", function() {
    processMouseClick();
});

$('.witTitle').on( "click", function() {
    processMouseClick();
});

$('.grid-row').on( "click", function() {
    processMouseClick();
});

$('.headers > li a').on('click', function() { 
    processMouseClick();
});
*/

function processMouseClick() {
	clearTimeout(resizeDefect);
	clearTimeout(resizeModalDef);
	clearTimeout(resizeRequirement);

	setTimeout(resizeDefect, TIMEOUT);
	setTimeout(resizeModalDef, TIMEOUT);
	setTimeout(resizeRequirement, TIMEOUT);
}

function resizeDefect()
{
    resizeDefectMax--;
    var items = document.getElementsByClassName('richeditor-container');
    if (items.length == 0 && resizeDefectMax > 0) {
        setTimeout(resizeDefect, TIMEOUT);
	}
    else {
        
        if ($('.richeditor-editarea').eq(0)) {
			$('.richeditor-editarea').each(function( index ) {
				$(this).parent().css('height', $(window).height() - $(this).offset().top + 'px');
			});
        }
    }
}

function resizeModalDef()
{
    resizeModalDefMax--;
    var items = document.getElementsByClassName('ui-dialog')
    if (items.length == 0 && resizeModalDefMax > 0) {
        setTimeout(resizeModalDef, TIMEOUT);
	}
    else {
    	resizeModal();
        $('.ui-dialog .richeditor-container').css("height", $(window).height() - $('.ui-dialog .richeditor-container').offset().top + "px"); // maximize detail text area (for defects) on modals
    }
}

function resizeRequirement()
{
	resizeRequirementMax--;
    var items = document.getElementsByClassName('plaintextcontrol');
    if (items.length == 0 && resizeRequirementMax > 0) {
        setTimeout(resizeRequirement, TIMEOUT);
	}
    else {
    	resizeModal();
        if ($('.plaintextcontrol')) {
            $('.plaintextcontrol').css("height", $(window).height() - $('.plaintextcontrol').offset().top + "px"); // maximize detail text area (for requirements) on modals
        }
    }
}

function resizeModal() {
	$('.dialog').parent().css('left', '5%');
    $('.dialog').parent().css('width', '90%');
    $('.work-item-form').parent().css('width', '100%');    
}