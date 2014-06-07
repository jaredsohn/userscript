// ==UserScript==
// @name        Imos Redmine Page Timer
// @namespace   tag://imos
// @description Ein Timer der anzeigt wie lange man sich auf der aktuellen Redmine Seite befindet.
// @author      Endlessdeath
// @date        23.10.2013
// @exclude     *
// @version     0.2.0
// @require     https://raw.github.com/odyniec/jQuery-tinyTimer/master/jquery.tinytimer.min.js
// @grant       none
// ==/UserScript==

jQuery('#top-menu').append('<div style="float: right; margin-right: 0.5em; font-weight: bold; color: yellow;">Time on Page: <span id="timer1"></span></div>');
jQuery('#time_entry_hours').parent('p').append('<div style="display: inline; margin-left: 0.5em; font-weight: bold; color: #505050;">(Time on Page: <span id="timer2"></span>)</div>');

jQuery('#timer1, #timer2').tinyTimer({
    from: Date.now(),
});