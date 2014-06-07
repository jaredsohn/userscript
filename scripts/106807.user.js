// ==UserScript==
// @name          My Script
// @namespace     http://www.example.com/gmscripts
// @description   Scripting is fun
// @include       http://www.example.com/*
// @include       http://www.example.org/*
// @exclude       http://www.example.org/foo
// @require       foo.js
// @resource      resourceName1 resource1.png
// @resource      resourceName2 http://www.example.com/resource2.png
// @version       1.0
// @icon          http://www.example.net/icon.png
// ==/UserScript==

$("#contentHeading tr th:nth-child(2)").append('<input id="checkAll" type="checkbox" value="1" name="checkAll">');
$('#checkAll').click(function(){
 $("input:checkbox[name=cUpdate]").attr('checked', ($('#checkAll').is(':checked') ? true : false));
});
