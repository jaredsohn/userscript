// ==UserScript==
// @name        ReadTheDocs print view
// @namespace   None
// @description Adds a 'Print View' link to the documentation pages. 
// @include     /^https?://[^/]*.readthedocs.org/
// @version     2
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

function togglePrintView()
{
	$('body').toggleClass('print-view');
}

function addPrintViewLink()
{
    $('.related ul').each(function() {
        $(this).append(
            $('<li class="right"><a>Print View</a></li>').click(togglePrintView)
        );
    });
}


GM_addStyle(
	'.print-view {background-color: #fff;}' +
	'.print-view .related, .print-view .sphinxsidebar, .print-view .footer, .print-view .rtd_doc_footer {display: none;}' +
	'.print-view .bodywrapper {margin-left: 0; border: none;}'
);

this.$ = this.jQuery = jQuery.noConflict(true);

addPrintViewLink();
GM_registerMenuCommand('Toggle Print View', togglePrintView, 'p');
