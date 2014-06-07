// ==UserScript==
// @name        queue
// @namespace   http://www.lategenius.com
// @description fills phantom
// @include     // @include     https://211sandiego.communityos.org/cms/
// @include     // @include     https://211sandiego.communityos.org/zf/client/render/-1
// @include     // @include     https://211sandiego.communityos.org/*
// @include     // @include     https://211c2c.communityos.org/zf/client/render/-1
// @include     // @include     https://211sandiego.communityos.org/zf/client/save
// @include     // @include     https://211c2c.communityos.org/zf/client/save
// @include     // @include     https://211c2c.communityos.org/*
// @include     // @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include     // @version     1
// @version     1
// ==/UserScript==
var targChkBox = $("label:contains('Call was disconnected')").prev ("input");
targChBox.change(function(){
    if (this.checked) {
        var matchingOption = $("option:contains('General')";
        var targValue = matchingOption.prop("value");
        Var TargSelect = matchingOption.parents("select.required_field"):
            targSelect.val(targValue); //--Select the desired option.
    }});