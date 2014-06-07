// ==UserScript==
// @name        Add <kbd> Button to StackExchange Toolbar
// @namespace   http://blender.org
// @include     *.stackexchange.com/questions/*
// @include     http://stackoverflow.com/*
// @version     3
// @grant       none
// ==/UserScript==


// Get jQuery on Chrome, thanks to this SO post:
// http://stackoverflow.com/a/3550261/2730823
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
    
    function startInjection() {
        var style = $("<style type='text/css'/>").appendTo('head');
        style.html('\
            .wmd-kbd-buttons { \
                font-size: 9pt; left: 400px; \
            } \
            .wmd-kbd-buttons:hover { \
                background-color: #deedff; \
            } \
            .wmd-kbd-buttons span { \
                background-image: none; \
            } \
        ');
        
        $(document).on('click', 'a.edit-post', injectButtonEdit);
        
        //define keyboard shortcut even handler (Ctrl+Y)
        $(document).on('keydown', "textarea.wmd-input", function(e) {
            if (e.ctrlKey && (e.which === 89)) {
                insertKbdTag(this);
            }
        });
        
        var href = $(location).attr('href');
        if (href.indexOf("/posts/") > -1) {
            waitForButtonRow(getNumberFromURL(href));
        } else {
            waitForButtonRow();
        }
    }

    function waitForButtonRow(id) {
        buttonRowId = "#wmd-button-row";
        if ("undefined" != typeof id) {
            buttonRowId += ("-" + id);
        }
        
        var buttonRow = $(buttonRowId);
        if (buttonRow.length > 0) {
            injectButton(buttonRow, id);
        } else {
            window.setTimeout(function(){
                waitForButtonRow(id);
            }, 500);
        }
    }

    function getNumberFromURL(str) {
        return str.match("/[0-9]+/")[0].slice(1,-1);
    }

    function injectButtonEdit(event) {
        var pathname = event.target.pathname;
        if ("undefined" !== typeof pathname) {
            var id = getNumberFromURL(pathname);
            waitForButtonRow(id);
        }
    }

    function injectButton(buttonRow, id) {

        var kbdButtonId = 'wmd-kbd-button';
        if ("undefined" !== typeof id) {
            kbdButtonId += ("-" + id);
        }
        
        var li = $("<li/>");
        li.attr('id', kbdButtonId)
        li.attr('title', 'Keyboard Shortcut <kbd> Ctrl+Y')
        li.addClass('wmd-button wmd-kbd-buttons');
        li.click(function() {
            insertKbdTag($(this).parents("div[class='wmd-container']").find("textarea").first()[0]);
        });
        li.appendTo(buttonRow);
        
        //$("<span>kbd</span>").appendTo(li);
        
        //new version of icon with alpha, but still not very good
        var img = $("<img/>").appendTo(li);
        img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAA\
    DX9CSSAAAAUVBMVEUAAAD////MzMzQ0NAAAACjo6P39/cAAAAAAAAAAAD6+vr+/v5jY2MzMzOqqqp2dna6urp\
    JSUmRkZHa2trg4OA7OzvY2Nj29vafn5/q6upWVlamRW72AAAACnRSTlMC////EzL/IQMqw9ijKAAAAHJJREFU\
    KM+90TkWgCAMRVElaiQgg4qo+1+oaZHQWPjKe9LA75rNCKoMcGbHjfqy6UB2mPp3BOyKD4r4Tv3o4Y7xFNw6s\
    yfBSTm/CO59uCRPO4Ul1+6iXe1aOxlDhr6/C0j+Z9yyuMsg7Kg7btRQpnnfVg8ibAiVxUdJFQAAAABJRU5ErkJggg==');

    }

    function insertKbdTag(txta) {

        if (txta.selectionStart == null) return;
        
        var start = txta.selectionStart;
        var end = txta.selectionEnd;
        var added = 0;
        var chars = txta.value.split("");

        //separate selection from rest of body
        var pre = chars.slice(0, start);
        var post = chars.slice(end);
        var sel = chars.slice(start, end);

        //replace spaces in selection with </kbd><kbd>
        for (var char = 0; char < sel.length; char++) {
            if (sel[char] == " ") {
                sel.splice(char, 1, '</kbd><kbd>');
                added += 10;
            }
        }

        //put everything back together again
        txta.value = pre.join("") + "<kbd>" + sel.join("") + "</kbd>" + post.join("");
        added += 11;

        txta.selectionStart = txta.selectionEnd = end + ((start == end) ? 5 : added);
        $(txta).focus();

        updateMarkdownPreview(txta);

        /*
        // jQuery-way doesn't work :(
        var evt = $.Event('keydown');
        evt.which = 17;
        evt.keyCode = 17; // Ctrl
        $(txta).trigger(e);
        
        // another failing attempt
        $(txta).trigger({
            type: "keydown",
            which : 17
        });
        */
    }

    function updateMarkdownPreview(element) {

        var keyboardEvent = document.createEvent("KeyboardEvent");
        var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

        keyboardEvent[initMethod](
                       "keydown", // event type : keydown, keyup, keypress
                        true, // bubbles
                        true, // cancelable
                        window, // viewArg: should be window
                        false, // ctrlKeyArg
                        false, // altKeyArg
                        false, // shiftKeyArg
                        false, // metaKeyArg
                        17, // keyCodeArg : unsigned long the virtual key code, else 0
                        0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
        );
        element.dispatchEvent(keyboardEvent);
        
    }
    
    startInjection();

}

$(document).ready(function(){
    addJQuery(main);
});
