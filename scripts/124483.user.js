/*

This is the source code of Pause Your Stream for Google+ Extension
Copyright (C) 2012 Simon Chan - Main JavaScript Code
Copyright (C) 2012 Jackson Tan - CSS and Notifications

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @id             PauseStreamGPlus
// @name           Pause Your Stream for Google+
// @version        1.5.1
// @namespace
// @author         Jackson Tan and Simon Chan
// @description    Pause your Google+ stream, enjoy what you like and then display them later.
// @include        https://plus.google.com/*
// @exclude        /https:\/\/plus\.google\.com\/(u/d/)?/d{21}\/.*/
// @run-at         document-end
// ==/UserScript==

if (!self.frameElement) {

    var pausedCount = 0;
    var css = ".pauseStreamBox\n{\n    position: fixed !important;\n    top: auto !important;\n    right: -118px !important;\n    bottom: 50px !important;\n}\n\n    .pauseStreamBox:hover\n    {\n        right: 0px !important;\n    }\n\n.pauseStreamInfo\n{\n    background-image: -webkit-linear-gradient(top,#F8F8F8,#ECECEC) !important;\n    background-image: -moz-linear-gradient(top,#F8F8F8,#ECECEC) !important;\n    color: #999;\n    font-size: 14px !important;\n    text-shadow: 0 1px rgba(0,0,0,.1);\n    min-width: 27px !important;\n    margin-right: 8px !important;\n    padding: 0px !important;\n}\n\n    .pauseStreamInfo.full\n    {\n        background-image: -webkit-linear-gradient(top,#DD4B39,#D14836) !important;\n        background-image: -moz-linear-gradient(top,#DD4B39,#D14836) !important;\n        color: #FFF !important;\n    }\n\n.pauseStreamCtrl\n{\n    cursor: pointer !important;\n    width: 90px;\n    margin: 0 !important;\n}";
    var css2 = ".pauseStreamCtrl {\nbackground-image: -webkit-linear-gradient(top,#3D9400,#398A00) !important;\nborder: 1px solid #29691D !important;\ncolor: white !important;\n}";
    var css3 = ".pauseStreamCtrl {\nbackground-image: -webkit-linear-gradient(top,whiteSmoke,#F1F1F1) !important;\nborder: 1px solid rgba(0, 0, 0, 0.1) !important;\ncolor: #444 !important;\n}";

    GM_addStyle(css);

    var infoBox = document.createElement('div');
    infoBox.className = 'nJ pauseStreamBox';
    var info = document.createElement('span');
    info.className = 'c-wa-Da b-a b-a-G pauseStreamInfo';
    info.innerHTML = '0';
    infoBox.appendChild(info);
    var ctrl = document.createElement('span');
    ctrl.className = 'c-wa-Da b-a b-a-G pauseStreamCtrl';
    ctrl.innerHTML = '\u258C\u258C Pause';
    ctrl.onclick = function (e) {
        if (infoBox.classList.contains('paused')) {
            infoBox.className = 'nJ pauseStreamBox';
            info.className = 'c-wa-Da b-a b-a-G pauseStreamInfo';
            info.innerHTML = '0';
            ctrl.innerHTML = '\u258C\u258C Pause';
            posts = document.getElementsByClassName('Wbhcze');
            GM_addStyle(css3);
            var div = document.createElement('div');
            div.className = 'CgSUh';
            div.innerHTML = infoBox.title;
            posts[pausedCount].parentNode.insertBefore(div, posts[pausedCount]);

            infoBox.title = '';
            for (var i = 0; i < pausedCount; i++)
                posts[i].removeAttribute('style');
            posts[pausedCount].scrollIntoView();
        }
        else {
            infoBox.className += ' paused';
            pausedCount = 0;
            info.textContent = '0';
            ctrl.innerHTML = '\u25BA Restore';
            var nowTime = new Date();
            infoBox.title = '\u258C\u258C Stream paused at ' + nowTime.toLocaleTimeString() + ' ' + nowTime.toLocaleDateString();
        }
    };
    infoBox.appendChild(ctrl);
    document.body.appendChild(infoBox);

    document.getElementsByClassName('lzqA1d')[0].addEventListener('DOMNodeInserted', function (e) {
        if (infoBox.classList.contains('paused') && e.target.classList.contains('Wbhcze')) {
            info.className = 'c-wa-Da b-a b-a-G pauseStreamInfo full';
            info.innerHTML = ++pausedCount > 99 ? '99+' : pausedCount;
            GM_addStyle(css2);
            ctrl.innerHTML = '\u25BA Display Posts';
            e.target.style.display = 'none';
        }
    }, false);
}