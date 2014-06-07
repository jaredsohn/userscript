// ==UserScript==
// @name            Todoist: Misc
// @description     Automatically save/close the task item editor when clicking elsewhere.
// @author          Chris H (Zren / Shade)
// @icon            https://todoist.com/favicon.ico
// @homepageURL     http://userscripts.org/scripts/show/166585
// @downloadURL     http://userscripts.org/scripts/source/166585.user.js
// @updateURL       http://userscripts.org/scripts/source/166585.meta.js
// @namespace       http://xshade.ca
// @version         1.1
// @require         https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @match           http*://todoist.com/app*
// ==/UserScript==

//--- Utils
function isDescendant(parent, child) {
    if (parent == child)
        return true;
    
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

//---
function main() {
    // Auto save todo_item if clicked outside of box.
    document.addEventListener('click', function(e) {
        // Make sure we're not clicking on the calendar popup.
        var calendars = document.getElementsByClassName('dp_container');
        for (var i = 0; i < calendars.length; i++) {
            var calendar = calendars[i];
            console.log(calendar);
            if (isDescendant(calendar, e.target))
                return;
        }
        
        var manager = document.getElementsByClassName('manager');
        if (manager && manager.length > 0) {
            manager = manager[0];
            
            if (!isDescendant(manager, e.target)) {
                var button_class = "";
                var text_box = manager.getElementsByClassName('text_box')[0];
                if (text_box.value) {
                    button_class = "submit_btn";
                    
                } else {
                    button_class = "cancel";
                }
                var btn = manager.getElementsByClassName(button_class)[0];
                btn.click();   
            }
        }
    }, true); // true = run callback first (before the 'Add task' etc generates the input fields)
}

main();