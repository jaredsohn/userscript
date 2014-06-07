// ==UserScript==
// @name        Phabricator Task Keyboard Shortcuts
// @namespace   http://userscripts.org/users/579539
// @include     https://phab.example.com/T*
// @version     1
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @grant       none
// ==/UserScript==

$(function() {

    function setPriorityShortcuts() {

        var keys = {
            1: 100,  // unbreak_now
            2: 90,   // needs_triage
            3: 80,   // high
            4: 50,   // normal
            5: 25,   // low
            6: 0     // wishlist
        }

        function setPriority(priority) {
            $("#transaction-action [value=priority]").prop('selected', 'selected');
            $("#priority [value=" + priority + "]").prop('selected', 'selected');
            $("form[action='/maniphest/transaction/save/']").submit();
        }

        for (var shortcut in keys) {
            var level = keys[shortcut];

            var handler = function (priority) {
                return function () { setPriority(priority); };
            }(level)

            new JX.KeyboardShortcut(shortcut, "Change priority to " + level).setHandler(handler).register();
        }

    }

    function setCloseTaskShortcuts() {

        function closeTask() {
            var reason = 1;
            $("#transaction-action [value=status]").prop('selected', 'selected');
            $("#resolution [value=" + reason + "]").prop('selected', 'selected');
            $("form[action='/maniphest/transaction/save/']").submit();
        }

        new JX.KeyboardShortcut('.', "Close task because " + "resolved").setHandler(closeTask).register();
    }

    setPriorityShortcuts();
    setCloseTaskShortcuts();

});
