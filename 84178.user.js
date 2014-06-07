// ==UserScript==
// @name OGameBoards Verbesserungen
// @namespace Un1matr1x
// @include http://board.ogame.*
// @include http://board.origin.ogame.*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
function letsJQuery() {
	$(document).ready(function() {
		headerLink();
		pageOptions();
		breadCrumbs();
		pilloryLink();
		moveLogin();
		
		$('p.info').remove(); 
	});

	function moveLogin() {
		if ($('div#customBox211').length <= 0){
			$('form#loginForm').clone().insertAfter('div#mainMenu ul');
			$('div.containerContent form#loginForm').remove();
			$('div#main div.mainHeadline div.headlineContainer form#loginForm').remove();
		}
	}

	function headerLink() {
		$('div#header a.pageLogo').removeAttr('href').attr('href', './index.php?page=Index');
	}

	function pilloryLink() {
		$('li#mainMenuItem9 a').removeAttr('href').attr('href', '/index.php?page=Pillory&sortField=time&sortOrder=DESC');
	}

	function pageOptions(){
		if ($('ul.breadCrumbs').length > 0){
			$('div.pageOptions').clone().insertBefore('ul.breadCrumbs:first');
		} else {
			$('<div></div>').css({'min-height':'30px'}).insertAfter('div.mainHeadline');
			$('div.pageOptions').clone().insertAfter('div.mainHeadline');
		}
		$('#threadRatingSpan:first').remove();
	}

	function breadCrumbs(){
		$('ul.breadCrumbs:first').clone().insertBefore('div#main form.quickJump');
	}
}