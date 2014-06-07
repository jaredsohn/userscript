// ==UserScript==
// @name          LiveJournal preview images from inside cuts
// @namespace     http://henrik.nyh.se
// @description   Displays a preview of images within each LJ-cut in post lists on LiveJournal. The images get a dashed border to make it obvious that they are previews. Using the Tools > User Script Commands menu, two things can be toggled: previewing just the first image (default), or every image within the cut; and not previewing if the cut is preceded by images (default), or previewing always. Previews are reduced in size if necessary. Should work with most layouts.
// @include       http://*.livejournal.com/*
// ==/UserScript==


// Toggle this on to log some details to the console
const DEBUG = false;

// LJ-cut links
const xpCuts = '//a[contains(@href, "#cutid")]';

// How to get from a LJ-cut link to the element containing the post contents
// Hopefully this works for most layouts (among them S2 Generator)
const xpCutToPost = 'ancestor::*[name()="DIV" or name()="TD"][1]';

// .GM_cutPreview img is any preview image; .GM_cutPreviewMany img is only a multi_preview image
GM_addStyle(
    " p.GM_cutPreview img { max-width:580px; max-height:500px; border: 2px dashed #000; } " +
    " p.GM_cutPreviewMany img { max-width:100px; max-height:100px; margin:5px; } " +
    " p.GM_cutPreview img:hover { border-color:#FFF; } "
);


// Menu items

makeMenuToggle("multi_preview", false, "Show all images from cut", "Show only the first image from cut", "LJ");
makeMenuToggle("image_outside_blocks", true, "Don't preview if images precede cut", "Preview even if images precede cut", "LJ");


// Loop over LJ cuts and do some magic

$x(xpCuts).forEach(function(cut) {

    var cutIndex = parseInt(cut.href.match(/\d+$/)[0]);
    
    debug("Processing cut %o (%o)", cut.href, cutIndex);
    
    if (image_outside_blocks) {  // If we should ignore cuts preceded by images

        // Get contents preceding the cut (and after any previous cut)
    
        var entry = $x(xpCutToPost, cut)[0];
        if (!entry) return;  // = continue with next iteration

        var entryBody = entry.innerHTML;
    
        var entryParts = entryBody.split('#cutid');    
        var entryPrecedingCut = entryParts[cutIndex-1];

        // Get non-system images in this content; bail if there were any

        var imagesPrecedingCut = getRealImages(entryPrecedingCut);
        debug("Images pre-cut: %o", imagesPrecedingCut);
        if (imagesPrecedingCut.length) return;  // = continue with next iteration
    }
        
    // Look inside the cut, pull stuff out

    (function(cut, cutIndex) {  // Closure!
        get(cut.href, function(contents) {
    
            // Get the content following this cut (and before any following cut)
            var xhrParts = contents.split(/<a name="cutid\d+"><\/a>|<hr width='100%' size='2' align='center' \/>/m);
            var cutDemesne = xhrParts[cutIndex];
    
            // Get the non-system images in this content (if any) and put them outside the cut
            var images = getRealImages(cutDemesne);
    
            if (images[0]) {
        
                var b = $x("ancestor::b", cut)[0];
                var p = document.createElement("P");
                p.className = "GM_cutPreview";
                if (multi_preview)
                    p.className += " GM_cutPreviewMany";
        
                var iterations = (multi_preview ? images.length : 1);
            
                for (var n = 0; n < iterations; n++) {
            
                    var a = document.createElement("A");
                    a.href = cut.href;
            
                    var img = document.createElement("IMG");
                    img.src = images[n];

                    a.appendChild(img);
                    p.appendChild(a);
                }

                b.parentNode.appendChild(p);
                b.parentNode.insertBefore(p, b);
            }
    
        });  // end get/callback

    })(cut, cutIndex);  // end closure
});  // end cut loop


/* Specific functions */

function getRealImages(data) {
    var images = [], systemImages = /^http:\/\/(userpic|stat)\.livejournal\.com\//;
    
    var m, re = /src="(.*?)"/img;
    while (m = re.exec(data))
        if (!m[1].match(systemImages))
            images.push(m[1]);

    return images;
}


/* Staple functions */

function debug() { if (DEBUG && console) console.log.apply(this, arguments); };

function $(id) { return document.getElementById(id); }

function $x(path, root) {
    if (!root) root = document;
    var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

function get(url, cb) {
    GM_xmlhttpRequest({method: "GET", url: url, onload: function(xhr) { cb(xhr.responseText); } });
}

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
    window[key] = GM_getValue(key, defaultValue);
    GM_registerMenuCommand((prefix ? prefix+': ' : '') + (window[key] ? toggleOff : toggleOn), function() {
        GM_setValue(key, !window[key]);
        location.reload();
    });
}
