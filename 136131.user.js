/*

Following code belongs to Stream Lite for Google+.
Copyright (C) 2013 Jackson Tan
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
// @id             SLG
// @name         Feather for Google+
// @version        0.2.16
// @namespace      gplus.streamlite
// @author         Jackson Tan
// @description    Keep your Google+ page fast and fluid, remove old posts automatically.
// @include        https://plus.google.com/*
// @run-at         document-end
// ==/UserScript==

var postsInStream = 20; //Posts remains in your stream after removing old posts.
var timeInterval = 60000; //Time interval for each check.


function compare(a, b) {
    if (a[0] > b[0])
        return 1;
    else if (a[0] < b[0])
        return -1;
    else if (a[0] == b[0] && a[1] > b[1])
        return 1;
    else if (a[0] == b[0] && a[1] < b[1])
        return -1;
    else if (a[0] == b[0] && a[1] == b[1] && a[2] > b[2])
        return 1;
    else if (a[0] == b[0] && a[1] == b[1] && a[2] < b[2])
        return -1;
    else if (a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] > b[3])
        return 1;
    else if (a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] < b[3])
        return -1;
    else if (a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3] && a[4] > b[4])
        return 1;
    else if (a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3] && a[4] < b[4])
        return -1;
    else if (a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3] && a[4] == b[4] && a[5] > b[5])
        return 1;
    else if (a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3] && a[4] == b[4] && a[5] < b[5])
        return -1;
    return 0;
}

setInterval(function () {
    if (document.querySelectorAll('div[id^=update]').length > postsInStream) {
        if (document.getElementsByClassName('ona Fdb')[0].clientWidth > 800) {
            if (document.getElementsByClassName("uv PL").length > postsInStream) {
                var postArr = new Array(document.getElementsByClassName("uv PL").length);
                for (var n = 0; n < postArr.length; n++) {
                    postArr[n] = new Array(7);
                }
                for (var i = 0; i < document.getElementsByClassName("uv PL").length; i++) {
                    var postTimePre = document.getElementsByClassName("uv PL")[i].childNodes[0].title;
                    var postTime;
                    if (postTimePre == undefined)
                        postTime = null;
                    else {
                        postTime = document.getElementsByClassName("uv PL")[i].childNodes[0].title.match(/(\w+)\s+(\d+),\s+(\d{4}),\s+(\d+):(\d{2}):(\d{2})\s+([\w]M)/);
                        if (postTime == null)
                            postTime = document.getElementsByClassName("uv PL")[i].childNodes[0].title.match(/(\d{4})\/(\d+)\/(\d+)\s+(\d+):(\d{2}):(\d{2})/);
                    }
                    if (postTime != null) {
                        postArr[i][6] = i;
                        var month;
                        var date=1;
                        var year=2013;
                        var hour=0;
                        var minute=0;
                        var second=0;
                        if (postTime[7] != undefined) {
                            month = postTime[1];
                            date = parseInt(postTime[2]);
                            year = parseInt(postTime[3]);
                            hour = parseInt(postTime[4]);
                            minute = parseInt(postTime[5]);
                            second = parseInt(postTime[6]);
                            var AMPM = postTime[7];
                            if (AMPM == 'PM')
                                hour = parseInt(hour)+12;
                            switch (month) {
                                case "Jan":
                                    month = 1;
                                    break;
                                case "Feb":
                                    month = 2;
                                    break;
                                case "Mar":
                                    month = 3;
                                    break;
                                case "Apr":
                                    month = 4;
                                    break;
                                case "May":
                                    month = 5;
                                    break;
                                case "Jun":
                                    month = 6;
                                    break;
                                case "Jul":
                                    month = 7;
                                    break;
                                case "Aug":
                                    month = 8;
                                    break;
                                case "Sep":
                                    month = 9;
                                    break;
                                case "Oct":
                                    month = 10;
                                    break;
                                case "Nov":
                                    month = 11;
                                    break;
                                case "Dec":
                                    month = 12;
                                    break;
                            }
                        }
                        else {
                            month = parseInt(postTime[2]);
                            date = parseInt(postTime[3]);
                            year = parseInt(postTime[1]);
                            hour = parseInt(postTime[4]);
                            minute = parseInt(postTime[5]);
                            second = parseInt(postTime[6]);
                        }
                        postArr[i][0] = year;
                        postArr[i][1] = month;
                        postArr[i][2] = date;
                        postArr[i][3] = hour;
                        postArr[i][4] = minute;
                        postArr[i][5] = second;
                    }
                    else if (postTime == null) {
                        var postTimePre = document.getElementsByClassName("uv PL")[i].innerText;
                        var postTimeShort = postTimePre.match(/(\d+):(\d{2})\s+([\w]M)/);
                        if (postTimeShort == null)
                            postTimeShort = postTimePre.match(/(\d+):(\d{2})/);
                        postArr[i][6] = i;
                        var year = new Date().getFullYear();
                        var month = new Date().getMonth() + 1;
                        var date = new Date().getDate();
                        var hour = parseInt(postTimeShort[1]);
                        var minute = parseInt(postTimeShort[2]);
                        var second = 59;
                        var AMPM = postTimeShort[3];
                        if (AMPM == 'PM')
                            hour = parseInt(hour)+12;
                        if (postTimePre.match(/Yesterday|昨天|昨日/)) {
                            if (date == 1 && month == 1) {
                                year--;
                                month = 12;
                                date = 31;
                            }
                            else if (date == 1 && month != 1) {
                                month--;
                                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
                                    date = 31;
                                else if (month == 4 || month == 6 || month == 9 || month == 11)
                                    date = 30;
                                else if (month == 2) {
                                    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
                                        date = 29;
                                    else
                                        date = 28;
                                }
                            }
                        }
                        postArr[i][0] = year;
                        postArr[i][1] = month;
                        postArr[i][2] = date;
                        postArr[i][3] = hour;
                        postArr[i][4] = minute;
                        postArr[i][5] = second;
                    }
                }
                postArr = postArr.sort(compare);
                var j = postArr.length;
                for (var k = 0; k < j - postsInStream; k++) {
                    if (document.getElementsByClassName("uv PL")[postArr[k][6]] != undefined)
                        document.getElementsByClassName("uv PL")[postArr[k][6]].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(document.getElementsByClassName("uv PL")[postArr[k][6]].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
                }
            }
        }
        else {
            for (var k = 0; k < document.querySelectorAll('div[id^=update]').length - postsInStream; k++) {
                document.querySelectorAll('div[id^=update]')[document.querySelectorAll('div[id^=update]').length - 1].parentNode.removeChild(document.querySelectorAll('div[id^=update]')[document.querySelectorAll('div[id^=update]').length - 1]);
            }
        }
    }
}, timeInterval);