// ==UserScript==
// @name        Region Magnification
// @description Adds click event handlers to regions that follow the Mobi 8 region magnification guideline.  Requires jQuery 1.6.1.
// @version     20110713
// @namespace   amazon.com
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @include     *
// ==/UserScript==

/* JSLint Options */
/*jslint white: true, debug: true, undef: true, eqeqeq: true, newcap: true, immed: true */
/*global
    $
*/


var onClickShowMag = function (event) {
    var el, targetEl, htmlSourceEl, id;
    el = $(this);
    targetEl = $(event.data.targetElement);
    htmlSourceEl = $(event.data.sourceElement);

    try {
        if (targetEl.html().indexOf(htmlSourceEl.html()) === -1) {
            targetEl.append('<p>' + htmlSourceEl.html() + '</p>');
        }
    }
    catch (e) {
        alert(e);
    }

    targetEl.css('display', 'block');
    targetEl.css('opacity', 1);

    /*
    // Add an outline around the active region, if one doesn't already exist.
    if ($(el[0].parentElement)[0].id.indexOf("temporary") === -1) {
        id = "temporary" + String(Math.floor(Math.random() * 99999));
        el.before('<div style="border: 2px dotted white"><div id="' + id + '" style="border: 2px dotted black"></div></div>');
        el.appendTo('#' + id);
    }
    */

    // For unknown reasons, this animation isn't playing well with greasemonkey...
    //targetEl.stop().animate({opacity: 1}, "slow");  // Partial transparency lessens the impact of the border.
    
    // To fully simulate the experience, we'd hide the original text.  During QA, it's useful to understand where the 
    // original text was located, to verify alignments are correct.
    //el.css('display', 'none'); // Hide the original active text
};

var onClickCloseMag = function (event) {
    var el, originalActiveEl;
    el = $(this);

    // Show the original text block again
    originalActiveEl = $(event.data.originalActiveElement);
    originalActiveEl.css('display', 'block');

    /*
    // Fade out the magnified region, and remove it from display all together
    el.stop().animate(
        {opacity: 0},
        'slow',
        'linear',
        function() { el.css('display', 'none'); });
    */
    el.css('display', 'none');
};

try {
    // Sanity check that this is probably a Mobi 8 File:
    if ( $('div.fs').length >= 1) {
        // Show active regions & outline book
        $("<style type='text/css'>div.target-mag { display: block } </style>").appendTo("head");
        $('div.fs').css('border', '3px solid Fuchsia');

	    // find active areas & their related targets
        var activeElements, magnifiedElements;
        activeElements = $(".app-amzn-magnify");
        magnifiedElements = $(".target-mag");
        if (activeElements.length !== magnifiedElements.length) {
            alert("ERROR: The number of magnified elements MUST equal the number of target elements");
        }
        else if (activeElements.length === 0) {
            alert("NOTE: No active elements are defined for this page");
        }
        else {
            var i;
            for(i = 0; i < activeElements.length; i++) {
                var activeEl = $(activeElements[i]);

                var targetEl = $('#' + activeEl.data("app-amzn-magnify").targetId);
                var sourceEl = $('#' + activeEl.data("app-amzn-magnify").sourceId);

                ////////////////
                // Verify page structure
                //
                if (targetEl.length === 0) {
                    var o = i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th";
                    alert('ERROR: the targetId "' + activeEl.data("app-amzn-magnify").targetId + '" associated with ' + String(i+1) + o + ' active area was not found.\n\n' +
                        'To fix this error, please ensure the specified targetId exists.');
                    break;
                }

                if (sourceEl.length === 0) {
                    var o = i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th";
                    alert('ERROR: the sourceId "' + activeEl.data("app-amzn-magnify").sourceId + '" associated with ' + String(i+1) + o + ' active area was not found.\n\n' +
                        'To fix this error, please ensure the specified sourceId exists.');
                    break;
                }

                // Verify the source is within the active area.  Else strange things occur.
                if (sourceEl.html().indexOf(activeEl.html()) >= 0) {
                    var o = i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th";
                    var html = [];
                    html.push("<" + sourceEl[0].tagName);
                    html.push(" id=\"" + sourceEl[0].id + "\">");
                    html.push("<" + activeEl[0].tagName);
                    html.push(" id=\"" + activeEl[0].id + "\">...</" + activeEl[0].tagName + ">");
                    html.push("</" + sourceEl[0].tagName + ">");
                    alert('ERROR: the active area element exists within the source for the magnified region; the html structure is wrong (effectively inside-out):\n' +
                        html.join('') + "\n\n" +
                        "To fix this error, it's likley that the anchor for the magnified region should be surrounding the text element, not inside of it."  );
                }

                // Add click event handler with pointers to the target and source elements
                activeEl.click({targetElement: targetEl, sourceElement: sourceEl}, onClickShowMag);
            }

            for (i = 0; i < magnifiedElements.length; i++) {
                var magEl = $(magnifiedElements[i]);
                var originalActiveEl = $(activeElements[i]);

                // Click event handler, with pointer to the originally linked active area
                magEl.click({originalActiveElement: originalActiveEl}, onClickCloseMag);
            }
        }
    }
} catch (e) {
	alert('ERROR: ' + e);
}
