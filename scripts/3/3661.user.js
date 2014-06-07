// ==UserScript==
// @name            PHPClasses fix
// @author          Jonas John
// @namespace       http://www.jonasjohn.de/
// @description     Replaces download links with direct links.
// @include         http://www.phpclasses.org/browse/package/*
// @license         Public Domain
// @version	        0.2
// @released        2006-03-26
// @updated         2006-04-13
// @compatible      Greasemonkey
// ==/UserScript==

// This file is a Greasemonkey user script. To install it, 
// you need the Firefox plugin Greasemonkey (http://greasemonkey.mozdev.org/)
// After you installed the extension, restart Firefox and revisit this script.
// In your tools menu you will see a new menu item "Install User Script" 
//
// To uninstall this script, go to Tools/Manage User Scripts,
// select "PHPClasses fix", and click Uninstall. Have fun ;-)s

(function(){

    function pcf_init(){
        
        // find the right position for the button:
        var xpath  = "//a[@name='download']";
        var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        
        var dl_link_zip = result.snapshotItem(0).parentNode.getElementsByTagName('a')[1];
        var dl_link_tgz = result.snapshotItem(0).parentNode.getElementsByTagName('a')[2];
        
        var class_id = dl_link_zip.href.split('package/')[1].split('/download')[0];
            
        // generate link:
        var url_zip = 'http://www.phpclasses.org/browse/download/zip/package/'+class_id+'/name/' + dl_link_zip.innerHTML;
        
        // replace link
        dl_link_zip.href = url_zip;
        
        
        // generate link:
        var url_tgz = 'http://www.phpclasses.org/browse/download/targz/package/'+class_id+'/name/' + dl_link_tgz.innerHTML;
        
        // replace link:
        dl_link_tgz.href = url_tgz;
        
    }
    
    pcf_init();
  
}) ();

