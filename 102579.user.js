// ==UserScript==
// @name           KayakoTicketByTicketWalker
// @namespace      http://yperevoznikov.com
// @include        http://*.kayako.com/staff/*
// @author         Yuri Perevoznikov <yuriless@gmail.com>
// ==/UserScript==

if (typeof($)==="undefined") $=unsafeWindow.$;

$(".ticketworkflowitem:contains('Close Ticket')").live('click', function(event){
	unsafeWindow.justClosed = 1;
});

unsafeWindow.justClosed = 0;

unsafeWindow.loadViewportData = function(_url, _argumentIndexCounter, _prefixBaseName) {
    unsafeWindow._isViewportRequestActive = true;
    unsafeWindow._incomingRequestHistoryChunk = "";

    if (undefined != unsafeWindow._viewportAjaxRequest && unsafeWindow._viewportAjaxRequest != false) {
        unsafeWindow._viewportAjaxRequest.abort();
    }
    var _finalURL = unsafeWindow.HandleBeforeAJAXDispatch(_url, _argumentIndexCounter, _prefixBaseName);
    unsafeWindow._lastUsedURL = _finalURL;
    unsafeWindow.HideHeaderURL();
    window._viewportAjaxRequest = $.get(_finalURL, function (responseText) {
		$("#cpmenu").html(responseText);
		unsafeWindow.reParseDoc();
		if (1 == unsafeWindow.justClosed) { // we are in just closed ticket
			unsafeWindow.loadViewportData('http://' + document.domain + '/staff/Tickets/Manage/Index');
			unsafeWindow.justClosed = 2;
		} else if (2 == unsafeWindow.justClosed) { // we are in inbox page	
			unsafeWindow.justClosed = 0;
			$('.gridlayoutborder table tr td[align=left] a:first').click();
		}
	});
};