// ==UserScript==
// @name           YouTube default upload unlisted
// @namespace      guy
// @include        http*://www.youtube.com/my_videos_upload
// ==/UserScript==

function updatePrivacy() {
    var checkboxes = document.evaluate( '//input[@name="privacy" and @value="unlisted"]', 
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 

    for (var i = 0; i < checkboxes.snapshotLength; i++) {
        if (!checkboxes.snapshotItem(i).checked) {
            checkboxes.snapshotItem(i).click()
            }
    }
	window.setTimeout(updatePrivacy, 5000);
}

updatePrivacy()