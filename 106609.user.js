// ==UserScript==
// @name           File.Ya1.Ru Download Button Clicker
// @namespace      File.Ya1.Ru@Cujoko
// @description    Click the download button.
// @include        http://file.ya1.ru/*
// @include        http://files.ya1.ru/*
// ==/UserScript==

var center = document.body.getElementsByTagName('center')[0];
var form = center.getElementsByTagName('form')[0];
var input = form.getElementsByTagName('input')[1];
input.click();