// ==UserScript==
// @name         LeakForums Rank Wrapper
// @namespace    http://www.leakforums.org/
// @description  Finds all of the rank images on leakforums.org and wraps them with a clickable link to their group.
// @include      http://*.leakforums.org/*
// @include      http://leakforums.org/*
// @author       Zakar Smith
// ==/UserScript==

var jQuery = unsafeWindow.jQuery || function(fn){ setTimeout(fn, 250); };

jQuery(function(){
    var images = document.images;

    function wrap(img, exp, dest){
        if(img.src.toLowerCase().indexOf("/"+exp+".png") >= 0){
            var parent = img.parentNode, image = null;
            for(var n = 0; n < parent.childNodes.length; n++){
                var el = parent.childNodes[n];
                if(el.src === img.src){
                    image = el;
                    break;
                }
            }
            var anchor = document.createElement("a");
            anchor.href = "#";
            if(dest){
                anchor.href = "/forumdisplay.php?fid="+dest;
            }
            anchor.appendChild(image.cloneNode(true));
            parent.replaceChild(anchor, image);
            return true;
        }
        return false;
    }

    var ranks = {
        "awesome5": 86,
        "elite5": 121,
        "sl": 234,
        "reliance": 181,
        "pirates": 157,
        "anime1": 240,
        "writers": 158,
        "whitetigersalpha": 178,
        "virtue": 187,
        "graphicmasters": 238,
        "admin6": 235,
        "orgxalpha": 232,
        "sponsor":  249,
        "staff5":  117,
        "support5": 117
    }

    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        for(var rank in ranks){
            var dest = ranks[rank];
            if(wrap(img, rank, dest)) break;
        }
    }
});