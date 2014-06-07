// ==UserScript==
// @name            phpBB (Morpheus) signature remover
// @description     Remove signatures from phpBB forums using a Morpheus based theme
// @include         http*://*/viewtopic.php*
// ==/UserScript==


// remove signatures
get_sigs = document.evaluate("//span[@class='signature']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < get_sigs.snapshotLength; i++) {
   current_sig = get_sigs.snapshotItem(i);
   current_sig.parentNode.removeChild(current_sig);
}
