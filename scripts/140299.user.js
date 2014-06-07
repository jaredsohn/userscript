// ==UserScript==
// @name           GitHub Right Notification
// @description    Let the notification button of github move to right.
// @version        1.0.1
// @namespace      GitHubRightNotification
// @include        http://github.com/*
// @include        https://github.com/*
// @run-at	   document-end
// ==/UserScript==
var appendScript = function(scriptFunction) {
    var script = document.createElement("script");
    script.textContent = "(" + scriptFunction.toString() + ")();";
    document.body.appendChild(script);
}
appendScript(function(){
    $(function(){
        $('.notification-indicator').insertAfter($('#userbox #user')).css({'margin': '2px 0 2px 20px'});
        $('#user-links').css({'margin-left': '5px'});
    });
});
