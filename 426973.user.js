// ==UserScript==
// @name        Amazon Cloud Player unchain download button
// @namespace   http://sebastian.gellweiler.net
// @version     1.0.2
// @grant       none
//
// @downloadURL https://userscripts.org/scripts/source/426973.user.js
// @updateURL https://userscripts.org/scripts/source/426973.meta.js
//
// @include https://www.amazon.*/gp/dmusic/mp3/player*
// @include http://www.amazon.*/gp/dmusic/mp3/player*
//
// ==/UserScript==
(function () {
    
    // Hide annoying cloud player advertisments on windows
    // and hide download button.
    jQuery(document).ready(function () {
jQuery('<style type="text/css">' +
    '#messageBanner, #cloudPlayerOverlay, .downloadButton' + "\n" +
    '{display: none !important; }' + "\n" +
'</style>').appendTo("head");
    });
    
    function bypassDownloader() {
        // Remove annoying popups and overlay.
        jQuery('.ap_popover').hide();
        jQuery('#ap_overlay').hide();

        // Submit download form.
        jQuery('#downloader').submit();       
    }

    /**
     * Replace old download links with new ones.
     */
    function downloadLinks() {
        // Try to replace download button in toolbar.
        // Ignore buttons that have been already replaced.
        var db = jQuery('.downloadButton:not(".replacedByNew")');
        db
        .addClass('replacedByNew')
        .after(
            jQuery('<a>', {                    
                html: '<span class="decoration left"></span>' +
                '<span class="decoration buttonCenter">' + db.text() + '</span>' +
                '<span class="decoration right"></span>',
                class: 'buttons primary newDownloadButton',
                
                click: function () {
                    // Click on the old download button
                    // to submit the download form.
                    db.click();
                    // Only workaround amazon downloader if multiple songs are selected.
                    if (jQuery('input[itemtype=song]:checked').length > 1) {
                        bypassDownloader();
                    }
                }
            })
        );
        
        // Skip stupid installing cloud player advertisment on windows
        // when downloading single tracks.
        jQuery('.skipInstall').click();
        
        // Hide download album links because they do not work.
        jQuery('[href^="#download\/album"]').hide();
    }

    // @require http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
    jQuery.noConflict();

    // Constantly check if downloads links are replaced on the pages.
    setInterval(function () {
        downloadLinks();
    }, 1000);
}());
