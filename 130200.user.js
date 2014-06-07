// ==UserScript==
// @name           oaNoBlock
// @namespace      com.koalawang.oablock
// @include        *
// ==/UserScript==
if (typeof unsafeWindow.f_10VisitSubmit === 'function' && typeof unsafeWindow.f_30VisitSubmit === 'function' ) {
	unsafeWindow.f_10VisitSubmit();
}