// ==UserScript==
// @name           BM Report Popup Closer
// @namespace      BM
// @description    BM Report Popup Closer
// @include        http://www.basilmarket.com/window-report.php*
// ==/UserScript==

if (document.body.textContent.match(/Thank you for reporting, we will look into this shortly. Thank you for taking the time to report, this helps to make BasilMarket a better place for everyone./)) {
    window.location.href = 'javascript:window.close()';
    window.location.href = 'javascript:history.go(-2)';
}
