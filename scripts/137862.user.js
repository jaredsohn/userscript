// ==UserScript==
// @name        PhantomAgeFill
// @namespace   http://www.lategenius.com
// @description Automatically selects "Declined to State" when "Dropped Call (Phantom Call)" is checked.
// @include     https://211sandiego.communityos.org/zf/client/render/-1
// @include     https://211sandiego.communityos.org/cms/
// @include     https://211sandiego.communityos.org/*
// @include     https://211c2c.communityos.org/zf/client/render/-1
// @include     https://211sandiego.communityos.org/zf/client/save
// @include     https://211c2c.communityos.org/zf/client/save
// @include     https://211c2c.communityos.org/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==

var targChkBox = $("label:contains('Dropped Call')").prev ("input");
targChkBox.change(function() {
    if (this.checked) {
        var matchingOption = $("option:contains('Declined to State')");
        var targValue = matchingOption.prop("value");
        var targSelect = matchingOption.parents("select.required_field");
        targSelect.val(targValue); //-- Select the desired option.
    }
});