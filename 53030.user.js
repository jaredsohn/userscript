// ==UserScript==
// @author         Peter Adrianov
// @version        1
// @name           Auto reload missing images
// @namespace      internets
// @description    If an image is not loaded, the script retries loading several times. It is useful for unstable internet connections.
// @include        http://*
// @include        https://*
// ==/UserScript==

// if the image node has its own onerror event, do not overwrite it
var imgs = document.evaluate("//img[@src and not(@onerror)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < imgs.snapshotLength; i++) {
	imgs.snapshotItem(i).setAttribute('onerror', 'if (typeof this.reloads == "undefined") this.reloads = 0; this.reloads++; if (this.reloads <= 5) this.src = this.src;');
}
