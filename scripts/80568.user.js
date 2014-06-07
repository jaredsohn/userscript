// ==UserScript==
// @name           Thumbnail Preview
// @namespace      http://www.puremango.co.uk
// @include        http://*.reddit.com/*
// ==/UserScript==

function valid_extension(filename) {
    var exts = filename.toLowerCase().split(".");
    var ext = exts[exts.length-1];
    return (ext in {"jpg":'',"gif":'',"png":'',"bmp":''});
}

function Myload() {
    for(var i in document.images) {
        var linkHref = document.images[i].parentNode.href;
        if(linkHref) {
            if(linkHref.indexOf("imgur")!=-1 && !valid_extension(linkHref)) {
                linkHref += ".jpg";
                document.images[i].parentNode.href = linkHref;
            }
            if(valid_extension(linkHref)) {
                document.images[i].addEventListener("mouseover", function(e) {
                    var origSrc = this.src;
                    var origWidth = this.width;
                    var origParentWidth = this.parentNode.style.width;
                    this.src = this.parentNode.href;
                    this.parentNode.style.width = "500px";
                    this.width = 500;
                    this.addEventListener("mouseout", function () {
                        this.src=origSrc;
                        this.width=origWidth;
                        this.parentNode.style.width=origParentWidth;
                    },false);
                },false);
            }
        }
    }
}

// attach to load event preserving any existing onloads.
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", Myload, false);
}