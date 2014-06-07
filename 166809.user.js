// ==UserScript==
// @name                Selfish Youtube
// @version             2013-05-06
// @namespace           https://github.com/ASzc/selfish-youtube
// @description         On the watch page, remove the share panel.
// @include             http://youtube.com/watch*
// @include             http://*.youtube.com/watch*
// @include             https://youtube.com/watch*
// @include             https://*.youtube.com/watch*
// @grant               none
// ==/UserScript==

var panelName = "action-panel-share";

// Remove panel
var actionPanelShare = document.getElementById(panelName);
actionPanelShare.parentNode.removeChild(actionPanelShare);

// Remove buttons targeting the panel
var buttons = document.body.getElementsByTagName("button");
if (buttons != null) {
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var buttonDTF = button.getAttribute("data-trigger-for");
        if (buttonDTF != null && buttonDTF == panelName) {
            button.parentNode.removeChild(button);
        }
    }
}
