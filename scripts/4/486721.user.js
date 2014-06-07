// ==UserScript==
// @name        Add <kbd> Button to StackExchange Toolbar (tweak of CoDEmanx's updated script)
// @namespace   http://blender.org
// @include     *.stackexchange.com/questions/*
// @include     http://stackoverflow.com/*
// @version     4
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
        //li.appendTo(buttonRow);
        li.insertAfter("#wmd-image-button");
        
                
        //new version of icon with alpha, but still not very good. Perhaps should be a capital A?
        var img = $("<img/>").appendTo(li);
        img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABm\
JLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gUFBzA2D\
m0dUgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACD0lEQVQ4y6\
2Uv2vbUBDHv3dPiowc6lFgijqkmAzZ%2FAdkCARPoSF%2FQ4ZQ0FpMpk7dOoQUDAlk89bBUyu\
KpowZOsUOxgRcQpaATWMVS3rSuw4NJUv9ix686b37cHff7zsCwAAQBIG9s7Pj5HmOZcKyLERR\
lJ6cnGgAoCdgOQzDD77vvy2KAkS0EExEoJTCcDj81Gg0mgB%2BIQgCJwzD0%2FF4LCJiZPkwo\
9FIwjA8DYLAoU6n86JWq%2F3c3NwUYwwZY5ZqmZnBzHJzc0P9fr9i5XmOoigAgIwx0Fov1bJt\
22BmKooCeZ7%2FEeQ5YFHYv%2FIY%2FzmseQ%2FSNEWSJBAROI6DUqk0swtrHqzVauH6%2Bhp\
ra2uoVCo4Pj6G67qrV1itVrG3twdmxtHREZIkmQnkeZYolUq4vLzE%2Ff09lFJzRZtZYRzHaL\
fbOD8%2FhzHmr01mFjHr0nVd1Ot1HB4e4uzsDL7v4%2BLiYnVRHMdBs9mEUgrGGDAziqKA1np\
1UbTWyLJsYcNbzwYtRETMy3n9ea5SCtZgMNCe532N47ixvr4uSila8nPIZDKhx8fHL7e3txkB4\
HK5%2FDKKoo%2Be5x0YY%2BRpTy4EY2Z6eHj4vL29%2FX46nXYVANrf39e9Xq%2Fved4r27Zfp2\
mKRU6WZXR3d%2Fdtd3f3XZIkP4goswDg6upqKiLfNzY23mxtbdmL7kRmRrfb1UmSZEQkIoLfcL40lptZnh8AAAAASUVORK5CYII%3D');
       
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
        
        var wasSpace = 0; //used to detect multiple spaces in a row
        for (var char = 0; char < sel.length; char++) {
            if (sel[char] == " ") {
                if (wasSpace == 0 && char != 0) {
                    //make sure last char was not a space, and that this is not the first char
                    
                    sel.splice(char, 1, '</kbd><kbd>');
                    added += 10;
                    wasSpace = 1;
               }
               else {
                   sel.splice(char, 1, ''); //remove extra space
                   if (sel[char + 1] != " ") {wasSpace = 0}; //make sure we don't have yet another space. 
                   //increment char because we just removed an item from the array
            }
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

//using jquery before jquery is added breaks it on chrome :/
//$(document).ready(function(){
    addJQuery(main);
//});
