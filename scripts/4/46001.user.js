// ==UserScript==
// @name           Ocado: no confirmation
// @namespace      http://raines.me.uk/
// @description    This script removes confirmation popups when changing or cancelling deliveries on ocado.com.
// @include        http://www.ocado.com/webshop/validateSlotChange.do*
// @include        http://www.ocado.com/webshop/displayDeliveryDetails.do*
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; ++i) {
    var link = links.item(i);
    link.href = link.href.replace(/javascript:confirmShowChangeConfirmDialog\('([^']+)'\)/, "$1");
    link.href = link.href.replace(/javascript:confirmShowCancelConfirmDialog\('[^']+'\)/, "/webshop/expireSlot.do");
}
