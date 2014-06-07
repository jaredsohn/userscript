// ==UserScript==
// @id             shutterstock-history
// @name           MarkDownloaded for Shutterstock Lightboxes
// @author         Jigyasa Makkar
// @version        0.0.1
// @description    If you are an active ShutterStock (www.shutterstock.com) user, then like most people you may have created 'Lightboxes' (ShutterStock's version of User Collections). Everytime you go back to your Lightbox however, Shutterstock gives you no way of knowing which items/images you have already downloaded. This script reads from your Download history and visually marks any items that it finds you have already downloaded, so you can spend your time on the yet to be downloaded images. This addresses a very common complaint for most ShutterStock users.
// @include        http://www.shutterstock.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

if(jQuery('#main-lightbox-cell').size() != 0){
  conf = confirm("MarkDownloaded plugin for Shutterstock\n\nDo you want to mark the - Already Downloaded - Items on this page?\n\n(Please wait a few moments after clicking Okay for the plugin to read your download history..)");
  if (conf == true){
    var history_url = "http://www.shutterstock.com/download_history.mhtml?license=all&page=";
    var total_pages = 0;
    var downloaded = [];
    GM_xmlhttpRequest({
      method: "GET",
      url: history_url + "1",
      onload: function(response) {
        var elt = jQuery(response.responseText).find('.dh_pager.paginator')[0];
        var lightbox_elts = jQuery('#lightbox-contents-table').find('div[id^="lightbox-photo-"]');
        var lightbox_ids = jQuery.map(lightbox_elts, function(elt, i){ return jQuery(elt).attr('id').match(/\d+/); });
        total_pages = jQuery(elt).text().trim().match(/\d+/g).pop();
        alert("MarkDownloaded plugin for Shutterstock \n\nThe plugin will now search for any - Already Downloaded - items present on this page and grey them out. Please wait a few moments...");
        jQuery.each(Array(total_pages-1), function(i) {
          GM_xmlhttpRequest({
            method: "GET",
            url: history_url + (i+1),
            onload: function(response) {
              var elt = jQuery(response.responseText).find('.hd_cell_content .dh_secondary_link');
              downloaded = jQuery.map(jQuery(elt), function(id, i){return id.text});
              var to_highlight = jQuery(lightbox_ids).filter(downloaded).get();
              var filter = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale")';
              jQuery.each(to_highlight, function(i, id){ jQuery('#lightbox-photo-'+id+' .thumb_image_container').css('filter', filter).css('opacity', 0.1).css('-webkit-filter', 'grayscale(100%)'); });
            }
          });

        });
      }
    });
  }
}