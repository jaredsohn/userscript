// ==UserScript==
// @name        Lift prop button click
// @namespace   userscript.org
// @description Click the prop buttons on every page if they are not active
// @include     http://lift.do/*
// @version     1
// ==/UserScript==

function toggleProps() {
    $ = unsafeWindow.jQuery;
    $(".action-button.prop-button").each(function() {
        if (!$(this).hasClass("active")) {
            $(this).click();
        }
    });
}

function addPropsButton() {
    $ = unsafeWindow.jQuery;
    $("#add-habit").parent().prepend('<a href="#props" class="btn btn-large btn-info" id="click-prop" rel="nofollow">Props</a>');
    $("#click-prop").bind("click", toggleProps);
}

addPropsButton();