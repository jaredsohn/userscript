// ==UserScript==
// @name      Youtube HQ Thumbnail
// @namespace youtubehqthumb
// @include   http://*.youtube.com/*
// @include   https://*.youtube.com/*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @version   1.01
// ==/UserScript==
// @require   https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js

jq203 = jQuery.noConflict(true);

function thumb_replace(jNode){
  
  if ( jNode.attr('data-thumb') !== undefined ) {
    jNode.attr('data-thumb', jNode.attr('data-thumb').replace("mqdefault", "hqdefault"));
    jNode.attr('src', jNode.attr('data-thumb').replace("mqdefault", "hqdefault"));
  }
  else {
    jNode.attr('src', jNode.attr('src').replace("mqdefault", "hqdefault"));
  }
  
}

function waitForKeyElements ( selectorTxt, actionFunction, bWaitOnce, iframeSelector ) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = jq203(selectorTxt);
    else
        targetNodes     = jq203(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        targetNodes.each ( function () {
            var jThis        = jq203(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}

waitForKeyElements(".yt-lockup-thumbnail span.video-thumb span.yt-thumb-clip > img", thumb_replace, false)


