// ==UserScript==
// @name          Explode Thumbs
// @description   Shows the full sized image for every thumbnail in a page.
// @include       *
// ==/UserScript==

const AutoscrollStepDelay = 50;

// We get all images inside links for now. We check if they really
// are thumbnails later.
var allThumbs;
allThumbs = document.evaluate(
    '//a[@href]/img[@src]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
);

// overlayHtml also works as a flag. If there is any constructed HTML
// it means we found at least one thumbnail.
var overlayHtml = '';
for (var i = 0; i < allThumbs.snapshotLength; i++) {
    var thumb = allThumbs.snapshotItem(i);
    var thumbImage = thumb.src;
    var parentLink = thumb.parentNode;
    var linkHref = parentLink.href;

    // Every link that is an image and points to another image is
    // considered a thumbnail. I wish there was a better way to know
    // if a URL is an image, but I think this will work for most cases.
    if (/[.](bmp|gif|jpe?g|png|svg)$/.test(linkHref)) {
        overlayHtml +=
            '<p style="margin: 0.5em 0.1em"><img src="'
            + linkHref + '" /></p>'
        ;
    }
}

if (overlayHtml) {
    var overlay = document.createElement('div');
    with (overlay.style) {
        padding = '0em 0.5em';
        borderRight = 'dashed #999 2px';
        borderBottom = 'dashed #999 2px';
        background = 'white';
        position = 'absolute';
        top = '0';
        left = '0';

        // Some sites use some weird complex layout, so we put
        // our overlay right in front of everyone to make sure it
        // does not get covered.
        zIndex = '10000';
    }
    document.body.insertBefore(overlay, document.body.firstChild);

    overlayHtml =
        '<div style="position: fixed; background: #eee; top: 0;'
        + ' left: 0; padding: 0.5em 0.5em;'
        + 'border-bottom: solid #ccc 1px">'
            + '<div style="float: left">'
                + '<button>Autoscroll</button>'
                + ' <select>'
                    + '<option value="1">1 second/image</option>'
                    + '<option value="5">5 seconds/image</option>'
                    + '<option value="10">10 seconds/image</option>'
                    + '<option value="15">15 seconds/image</option>'
                    + '<option value="20">20 seconds/image</option>'
                + '</select>'
                + ' <button disabled="yes">Stop</button>'
            + '</div>'
            + '<div style="text-align: right">'
                + '<button>Hide</button>'
                + ' <button disabled="yes">Show</button>'
                //+ '<button>&#x2227;</button>'
                //+ ' <button disabled="yes">&#x2228;</button>'
                + '&nbsp; <button>Close</button>'
            + '</div>'
        + '</div>'
        + '<div style="margin-top: 3.2em">' + overlayHtml + '</div>'
    ;
    overlay.innerHTML = overlayHtml;

    var toolbarDiv = overlay.firstChild;
    window.addEventListener(
        'load',
        function() {
            toolbarDiv.style.width = getComputedStyle(overlay, '').width;
        },
        true
    );
    var imagesDiv = overlay.childNodes.item(1);

    var leftButtons = toolbarDiv.firstChild;
    var autoscrollButton = leftButtons.childNodes.item(0);
    var autoscrollDelay = leftButtons.childNodes.item(2);
    var stopButton = leftButtons.childNodes.item(4);

    var rightButtons = toolbarDiv.childNodes.item(1);
    var hideButton = rightButtons.firstChild;
    var showButton = rightButtons.childNodes.item(2);
    var closeButton = rightButtons.childNodes.item(4);

    autoscrollDelay.value =
        GM_getValue('autoscroll.delay', 10).toString()
    ;

    // timeoutId is used to cancel the autoscroll function so
    // we leave it out here where it can be seen by the Stop button
    // onclick handler.
    var timeoutId = null;

    function autoScroll(position, deltaY, steps) {
        if (steps) {
            position += deltaY;
            window.scrollTo(0, position);
            timeoutId = window.setTimeout(
                function() { autoScroll(position, deltaY, steps - 1); },
                AutoscrollStepDelay
            );
        } else {
            autoscrollButton.disabled = false;
            autoscrollDelay.disabled = false;
            stopButton.disabled = true;
            hideButton.disabled = false;
        }
    }

    // Some magic is used here to set the onclick handler of the
    // created controls. It seems that this must be used to set
    // any event handler from GreaseMonkey scripts. The call to
    // event.preventDefault avoids bubbling of the click event.
    autoscrollButton.addEventListener(
        'click',
        function(event) {
            autoscrollButton.disabled = true;
            autoscrollDelay.disabled = true;
            stopButton.disabled = false;
            hideButton.disabled = true;

            var expandedImages = overlay.getElementsByTagName('img');
            var imageCount = expandedImages.length;
            var expandedTop = expandedImages[0].offsetTop;

            var availableHeight = window.innerHeight - toolbarDiv.offsetHeight;
            var lastImage = expandedImages[imageCount - 1];
            var totalDelta =
                lastImage.offsetTop
                + lastImage.offsetHeight
                - expandedTop
            ;
            var offscreenDelta = Math.max(
                0, totalDelta - availableHeight
            );

            var totalTime =
                parseInt(autoscrollDelay.value) * 1000 * imageCount
            ;
            var steps = totalTime / AutoscrollStepDelay;
            var deltaY = offscreenDelta / steps;

            var firstPosition = expandedTop - toolbarDiv.offsetHeight;
            window.scrollTo(0, firstPosition);

            timeoutId = window.setTimeout(
                function() { autoScroll(firstPosition, deltaY, steps); },
                AutoscrollStepDelay
            );

            event.preventDefault();
        },
        true
    );

    autoscrollDelay.addEventListener(
        'change',
        function(event) {
            GM_setValue(
                'autoscroll.delay',
                parseInt(autoscrollDelay.value)
            );
            event.preventDefault();
        },
        true
    );

    stopButton.addEventListener(
        'click',
        function(event) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
            autoscrollButton.disabled = false;
            autoscrollDelay.disabled = false;
            stopButton.disabled = true;
            hideButton.disabled = false;
            event.preventDefault();
        },
        true
    );

    hideButton.addEventListener(
        'click',
        function(event) {
            autoscrollButton.disabled = true;
            autoscrollDelay.disabled = true;
            hideButton.disabled = true;
            showButton.disabled = false;
            imagesDiv.style.visibility = 'hidden';
            var toolbarDivStyle = getComputedStyle(toolbarDiv, '');
            overlay.style.height =
                parseInt(toolbarDivStyle.height)
                + parseInt(toolbarDivStyle.paddingTop)
                + parseInt(toolbarDivStyle.paddingBottom)
                + 'px'
            ;
            overlay.style.position = 'fixed';
            overlay.style.opacity = '0.75';
            event.preventDefault();
        },
        true
    );

    showButton.addEventListener(
        'click',
        function(event) {
            autoscrollButton.disabled = false;
            autoscrollDelay.disabled = false;
            hideButton.disabled = false;
            showButton.disabled = true;
            imagesDiv.style.visibility = 'visible';
            overlay.style.height = 'auto';
            overlay.style.position = 'absolute';
            overlay.style.opacity = '1';
            event.preventDefault();
        },
        true
    );

    closeButton.addEventListener(
        'click',
        function(event) {
            if (timeoutId != null) {
                window.clearTimeout(timeoutId);
            }
            overlay.parentNode.removeChild(overlay);
            event.preventDefault();
        },
        true
    );
}
