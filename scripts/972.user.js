/*
SourcePlease -- download from SourceForge without going through
                mirror selector pages
0.1
2005-03-16
Copyright (c) 2005, Rich Lafferty <rich+sourceplease@lafferty.ca>
Released under the BSD license
http://www.opensource.org/licenses/bsd-license.php

-----------------------------------------------------------------------

This is a Greasemonkey user script.

To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts, select "SourcePlease",
and click Uninstall.

I've only tested on URLs like
 
 http://prdownloads.sourceforge.net/project/filename.tar.gz
 http://prdownloads.sourceforge.net/project/filename.tar.gz?download
 http://prdownloads.sourceforge.net/project/filename.tar.gz?use_mirror=easynews

which rewrite to something like 

 http://internap.dl.sourceforge.net/sourceforge/project/filename.tar.gz

because that's all the prdownloads links I remember seeing. Please let
me know if there are URL forms I've missed, or if this catches things it
shouldn't.

It may be necessary to use an extension like refspoof or a proxy
like Privoxy to make Firefox stop sending referer, since SourceForge
refuses direct downloads unless the referer is in sourceforge.net.

*/


// ==UserScript==
// @name        SourcePlease
// @namespace   http://www.lafferty.ca/software/greasemonkey/
// @description Rewrites SourceForge download links to direct downloads
// @include     *
// ==/UserScript==

// http://internap.dl.sourceforge.net/sourceforge/project/filename.tar.gz

(function() {

    // try to play friendly by grabbing a random US/EU mirror
    var mirrors = new Array("belnet", "switch", "voxel", "ovh", "easynews",
                            "heanet", "internap", "cogent", "mesh", "unc", "kent");
    var thisMirror = mirrors[Math.floor(Math.random() * mirrors.length)];

    var xpath = "//a[starts-with(@href,'http://prdownloads.sourceforge.net/')]";
    var res = document.evaluate(xpath, document, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var i, link;
    for (i = 0; link = res.snapshotItem(i); i++) {
        link.href = unescape(link.href);
        link.href = link.href.replace(
                      /^http:\/\/prdownloads\.sourceforge\.net\/(.*)\?use_mirror=(.*)$/i,
                      "http://$2.dl.sourceforge.net/sourceforge/$1"
                    );
        link.href = link.href.replace(
                      /^http:\/\/prdownloads\.sourceforge\.net\/([^?]+).*$/i,
                      "http://" + thisMirror + ".dl.sourceforge.net/sourceforge/$1"
                    );
    } 

})();
