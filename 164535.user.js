// ==UserScript==
// @name           Klavogonki qualificaton error fixer
// @version        0.05
// @namespace      klavogonki
// @author         Silly_Sergio
// @description    Automatically corrects errors. New button will appear.
// @include        http://klavogonki.ru/g/*
// @grant          none
// ==/UserScript==

function embed() {
var BUTTON_ID = "##correctErrorsButton";

// Check, if button is already present
var buttonPresent = document.getElementById(BUTTON_ID);
if (null != buttonPresent) {
    return;
}

var correctButton = document.createElement("button");
    correctButton.id = BUTTON_ID;
    correctButton.innerHTML = "Correct Errors";
    correctButton.title = "Click to correct errors";
    correctButton.setAttribute("style",
            "background-color: rgb(248, 244, 230);" +
            "border: 1px solid #E8E4E6;" +
            "border-radius: 5px 5px 5px 5px;" +
            "color: black;" +
            "cursor: pointer;" +
            "font: 11px tahoma;" +
            "outline: medium none;" +
            "padding: 5px 4px 4px;");

    // Add click event for a button
    correctButton.onclick = function () {
        var inputTag = document.getElementsByClassName("correct_errors_text errors_text");
		
        if (inputTag[0] == null) {
            return;
        }
		
        var inputContent= inputTag[0].innerHTML;
        var regex = /(<([^>]+)>)/ig;
        var correctText = inputContent.replace(regex, "");

        outputTag = document.getElementById('inputtext');
        outputTag.value = correctText;
        outputTag.focus();
    };

    // Insert button in the bottom of right section
    var buttonControlPanel = document.getElementById('play-right');
    buttonControlPanel.appendChild(correctButton);
}

var injectButton = document.createElement("script");

injectButton.setAttribute("type", "text/javascript");
injectButton.appendChild(document.createTextNode("(" + embed + ")()"));
document.body.appendChild(injectButton);
window.onload(embed());