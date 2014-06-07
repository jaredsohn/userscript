// ==UserScript==
// @name        WordpressComDownloadMediaLibrary
// @namespace   wordpress.com
// @description Creates a direct link to the images in the Media Library at Wordpress.com
// @include     http://*.wordpress.com/wp-admin/upload.php*
// @include     https://*.wordpress.com/wp-admin/upload.php*
// @version     1.0
// @grant       none
// ==/UserScript==

/* ================================
  This script allows a quick download of images and videos in
  a Wordpress.com Media Library: WordPress.com doesn't allow a
  quick download of media library, for a local backup, and this
  script provides a workaround for it.
  
  The script uses JQuery to iterate on all <tr> tags that
  contain media objects and adds a "High Res" link to the 
  actions for the picture pointing directly to the image.
  
  Ideally, the files should be downloaded in a ZIP, and only the
  selected files should be downloaded. It is quite complex to generate
  a ZIP from JavaScript (could be done with JSZIP, but this has
  problems with the file name).
  
  NOTE: to download pages in DownThemAll!, set up in the "Links" tab:
     - Renaming Mask: *name*.*ext*
     - Fast Filtering: 
     - Filter: images; videos
  
================================ */

jQuery(document).ready(function(){
    jQuery("tr[id^='post-']").each(function(i,el){
       var sUrl = jQuery(".attachment-80x60",el).attr("src").toString();
       sUrl = sUrl.substr(0,sUrl.lastIndexOf("?")); // remove the command to generate the thumbnail
       jQuery(".row-actions",el).append('&nbsp;|&nbsp;<span><a href="'+ sUrl +'">High-Res</a></span>');
    });
}); // document.ready