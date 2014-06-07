// RememberTheMilk RTL support
// Copyright, chophe, 2010
//
// This script based on (twitter RTL Support - http://userscripts.org/scripts/show/48270)
// written by: benleevolk
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// ==UserScript==
// @name           RTM RTL
// @namespace      http://userscripts.org/scripts/show/85190
// @include        http://rememberthemilk.com/*
// @include        https://rememberthemilk.com/*
// @include        https://*.rememberthemilk.com/*
// @include        http://*.rememberthemilk.com/*
// ==/UserScript==

var rtmRTL = {
    tasksCount: 0,
    taskTDClassName: "xtd xtd_text",

    alignRTLLanguages: function () {
        var isThereRTLChars = /.*[\u0600-\u06ff]+.*|.*[\u0590-\u05ff]+.*/;
        var tasks = document.getElementsByClassName(this.taskTDClassName);
        this.tasksCount = tasks.length;
        for (i = 0; i < this.tasksCount; i++) {
            if (isThereRTLChars.test(tasks[i].innerHTML)) {
                tasks[i].style.direction = "rtl";
                tasks[i].style.textAlign = "right";
                tasks[i].style.fontFamily = "Tahoma";
            }
        }
    },

    alignPrintRTLLanguages: function () {
        var isThereRTLChars = /.*[\u0600-\u06ff]+.*|.*[\u0590-\u05ff]+.*/;
        var content = document.getElementById("content");
        var uls = content.getElementsByTagName("ul");
        //uls[0].setAttribute("style", uls[0].getAttribute("style") + "; float:left; ");
        var tasks = document.getElementsByTagName("li");
        this.tasksCount = tasks.length;
        for (i = 0; i < this.tasksCount; i++) {
            if (isThereRTLChars.test(tasks[i].innerHTML)) {
                tasks[i].style.direction = "rtl";
                tasks[i].style.fontFamily = "Tahoma";
            }
        }
    },

    monitorChanges: function () {
        var printPagehref = new String(window.parent.location.href);
        if (document.getElementsByClassName(this.taskTDClassName).length != this.tasksCount) {
            rtmRTL.alignRTLLanguages();
            rtmRTL.alignPrintRTLLanguages();

        }
        setTimeout(rtmRTL.monitorChanges, 300);
    }
}

setTimeout(rtmRTL.monitorChanges, 200);