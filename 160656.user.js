// ==UserScript==
// @name       Giallozafferano video hider
// @namespace  http://www.darklan.net/
// @version    1
// @description  Nasconde le vidoricette che partono in automatico su giallozafferano
// @match      http://ricette.giallozafferano.it/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==

var div = $($('#theboxes div')[0]);
if (!div.hasClass('contenitore-testoealtro'))
    div.hide();