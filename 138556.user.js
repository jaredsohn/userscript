// ==UserScript==
// @name           Reddit Hide Siblings
// @namespace      Misael.K
// @include        http://www.reddit.com/*/comments/*
// @description    Adds a new "Hide Siblings" button next to each "Collapse comment" button in the Reddit comments.
// @grant          none
// ==/UserScript==

// Content Script Injection
// http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
    // Check for function input.
    if ('function' == typeof source) {
        // Execute this function with no arguments, by adding parentheses.
        // One set around the function, required for valid syntax, and a
        // second empty set calls the surrounded function.
        source = '(' + source + ')();'
    }

    // Create a script node holding this source code.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.
    document.body.appendChild(script);
    document.body.removeChild(script);
}

contentEval(function() {

    // creates a callable function, which will be called by the expand button
    window.hideSiblings = function(comment) {
        // hides all the comment siblings, using dispatchEvent instead of
        // the jQuery trigger method to make sure that any handler attached
        // to the element also gets fired
        $(comment).closest(".thing").prevAll().each(function() {
            $(this).find(".noncollapsed .expand").eq(0).each(function() {
                var clickEvent = document.createEvent("HTMLEvents");
                clickEvent.initEvent("click", true, true);
                this.dispatchEvent(clickEvent);
            });
        });

        // traverses up the DOM to find the parent
        var parent = $(comment).closest('.child').closest('.thing');

        var windowHeight = $(window).height() / 3;

        // If the parent is a comment (could be the window object),
        // scroll and draw attention to it.
        // Otherwise, scroll to the clicked comment
        if ($(parent).offset()) {
            var parentTop = $(parent).offset().top + 0;

            try {
                $(window).scrollTop(parentTop - windowHeight);
            } catch(err) {
                console.log(err.name, err.message);
            }
            
            var parentText = $(parent).find(".entry:first");
            $(parentText)
                .css("position", "relative")
                .animate({
                    left:"10px"
                }, 200)
                .animate({
                    left:"0"
                }, 200);
        } else {
            var commentTop = $(comment).offset().top + 0;

            try {
                $(window).scrollTop(commentTop - windowHeight);
            } catch(err) {
                console.log(err.name, err.message);
            }
        }

    }

    // adds the new expand button
    var s = '<a class="expand hideSiblings" onclick="hideSiblings(this); return false" href="#" title="Hide Siblings">[-^]</a>';
    $(".noncollapsed a.expand").after(s);
});