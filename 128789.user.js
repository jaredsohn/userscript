/*

Following code belongs to Avatars Plus! and More for Google+.
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
// @id             AvatarsPlusnMore
// @name         Avatars Plus! and More for Google+
// @version        5.26.3
// @namespace      gplus.avatarsPlus
// @author         Jackson Tan and Simon Chan
// @description    Google+ is now lively and fun! No more small, static and low resolution avatars, also restore In Your Circles section. Other cool features are waiting for you to discover!
// @include        https://plus.google.com/*
// @exclude        /https://plus\.google\.com(/u/\d+)?/?stream/circles/.+/i
// @exclude	       /https://plus\.google\.com(/u/\d+)?/?b/.+/i
// @run-at         document-end
// @grant          GM_xmlhttpRequest
// ==/UserScript==

GM_addStyle = function (css) {
    var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
    if (!head) { return }
    style.type = 'text/css';
    try { style.innerHTML = css } catch (x) { style.innerText = css }
    head.appendChild(style);
}

if (localStorage["IYC_Display"] == 'undefined' || localStorage["IYC_Display"] == undefined)
    localStorage["IYC_Display"] = 'Display';
if (localStorage["WallofAvatars"] == 'undefined' || localStorage["WallofAvatars"] == undefined)
    localStorage["WallofAvatars"] = '400';
if (localStorage["IYC_Num"] == 'undefined' || localStorage["IYC_Num"] == undefined)
    localStorage["IYC_Num"] = '30';
if (localStorage["IYC_Size"] == 'undefined' || localStorage["IYC_Size"] == undefined)
    localStorage["IYC_Size"] = '62';
if (localStorage["GIF_Avatars"] == 'undefined' || localStorage["GIF_Avatars"] == undefined)
    localStorage["GIF_Avatars"] = 'Enabled';
if (localStorage["IYC_Animations"] == 'undefined' || localStorage["IYC_Animations"] == undefined)
    localStorage["IYC_Animations"] = 'Disabled';
if (localStorage["Scaling_Animations"] == 'undefined' || localStorage["Scaling_Animations"] == undefined)
    localStorage["Scaling_Animations"] = 'Enabled';
if (localStorage["NotiWin_Animations"] == 'undefined' || localStorage["NotiWin_Animations"] == undefined)
    localStorage["NotiWin_Animations"] = 'Enabled';
if (localStorage["CmtBox_Animations"] == 'undefined' || localStorage["CmtBox_Animations"] == undefined)
    localStorage["CmtBox_Animations"] = 'Enabled';
if (localStorage["ShareBox_Animations"] == 'undefined' || localStorage["ShareBox_Animations"] == undefined)
    localStorage["ShareBox_Animations"] = 'Enabled';
if (localStorage["Btn_Animations"] == 'undefined' || localStorage["Btn_Animations"] == undefined)
    localStorage["Btn_Animations"] = 'Enabled';
if (localStorage["Clock_Fonts"] == 'undefined' || localStorage["Clock_Fonts"] == undefined)
    localStorage["Clock_Fonts"] = 'Segoe UI Mono';
if (localStorage["Clock_Font_Size"] == 'undefined' || localStorage["Clock_Font_Size"] == undefined)
    localStorage["Clock_Font_Size"] = '32';
if (localStorage["Clock_TS"] == 'undefined' || localStorage["Clock_TS"] == undefined)
    localStorage["Clock_TS"] = 'Enabled';
if (localStorage["Clock_Day_Indctr"] == 'undefined' || localStorage["Clock_Day_Indctr"] == undefined)
    localStorage["Clock_Day_Indctr"] = '☼';
if (localStorage["Clock_Night_Indctr"] == 'undefined' || localStorage["Clock_Night_Indctr"] == undefined)
    localStorage["Clock_Night_Indctr"] = '☪';
if (localStorage["Clock_Show"] == 'undefined' || localStorage["Clock_Show"] == undefined)
    localStorage["Clock_Show"] = 'Show';
if (localStorage["Remove_Borders"] == 'undefined' || localStorage["Remove_Borders"] == undefined)
    localStorage["Remove_Borders"] = 'Enabled';
if (localStorage["Remove_Gaps"] == 'undefined' || localStorage["Remove_Gaps"] == undefined)
    localStorage["Remove_Gaps"] = 'Enabled';
if (localStorage["Resize_NotiWindow"] == 'undefined' || localStorage["Resize_NotiWindow"] == undefined)
    localStorage["Resize_NotiWindow"] = 'Default';
if (localStorage["Background_Content_Type"] == 'undefined' || localStorage["Background_Content_Type"] == undefined)
    localStorage["Background_Content_Type"] = 'Default';
if (localStorage["Background_URL"] == 'undefined' || localStorage["Background_URL"] == undefined)
    localStorage["Background_URL"] = 'None';
if (localStorage["Background_Opacity"] == 'undefined' || localStorage["Background_Opacity"] == undefined)
    localStorage["Background_Opacity"] = '1';
if (localStorage["Posts_Opacity"] == 'undefined' || localStorage["Posts_Opacity"] == undefined)
    localStorage["Posts_Opacity"] = '0.8';
if (localStorage["Background_Display"] == 'undefined' || localStorage["Background_Display"] == undefined)
    localStorage["Background_Display"] = 'Tile';
if (localStorage["Background_Color"] == 'undefined' || localStorage["Background_Color"] == undefined)
    localStorage["Background_Color"] = '#F1F1F1';
if (localStorage["currentLatitude"] == 'undefined' || localStorage["currentLatitude"] == undefined)
    localStorage["currentLatitude"] = 'undefined';
if (localStorage["currentLongitude"] == 'undefined' || localStorage["currentLongitude"] == undefined)
    localStorage["currentLongitude"] = 'undefined';
if (localStorage["cityName1033"] == 'undefined' || localStorage["cityName1033"] == undefined)
    localStorage["cityName1033"] = 'undefined';
if (localStorage["countryName"] == 'undefined' || localStorage["countryName"] == undefined)
    localStorage["countryName"] = 'undefined';
if (localStorage["cityNameLocalized"] == 'undefined' || localStorage["cityNameLocalized"] == undefined)
    localStorage["cityNameLocalized"] = 'undefined';

function onLoad() {
    var languagePairs = {
        '首页': { language: 'zh-CN' },
        '主頁': { language: 'zh-HK' },
        '首頁': { language: 'zh-TW' },
        'ホーム': { language: 'ja' },
        'Default': { language: 'en-US' }
    }

    var matchPair;
    if (document.getElementsByClassName("lCd Hyc fJb").length > 0) {
        matchPair = languagePairs[document.getElementsByClassName("lCd Hyc fJb")[0].textContent];
        if (!matchPair)
            matchPair = languagePairs['Default'];
    }
    else
        matchPair = languagePairs['Default'];
    var language = matchPair.language;

    var currentLocation;
    if (currentLocation == undefined) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentLocation = position;
            console.log(position);
        }, function (positionError) {
            console.error(positionError);
        });
    }

    if (localStorage["currentLatitude"] != currentLocation.coords.latitude || localStorage["currentLongitude"] != currentLocation.coords.longitude) {
        localStorage["currentLatitude"] = currentLocation.coords.latitude;
        localStorage["currentLongitude"] = currentLocation.coords.longitude;
    }

    var cityName1033Original = localStorage["cityName1033"];

    var ajaxFetch = new XMLHttpRequest();
    ajaxFetch.onreadystatechange = function () {
        if (ajaxFetch.readyState == 4 && ajaxFetch.status == 200) {
            var locationResponseXML = ajaxFetch.responseXML;
            for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                if (locationResponseXML.getElementsByTagName('type')[i].textContent == "locality") {
                    localStorage["cityName1033"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                    break;
                }
            }
            if (localStorage["cityName1033"] == "undefined" || localStorage["cityName1033"] == undefined || localStorage["cityName1033"] == null || localStorage["cityName1033"] == "") {
                for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                    if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_3") {
                        localStorage["cityName1033"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                        break;
                    }
                }
            }
            if (localStorage["cityName1033"] == "undefined" || localStorage["cityName1033"] == undefined || localStorage["cityName1033"] == null || localStorage["cityName1033"] == "") {
                for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                    if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_2") {
                        localStorage["cityName1033"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                        break;
                    }
                }
            }
            if (localStorage["cityName1033"] == "undefined" || localStorage["cityName1033"] == undefined || localStorage["cityName1033"] == null || localStorage["cityName1033"] == "") {
                for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                    if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_1") {
                        localStorage["cityName1033"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                        break;
                    }
                }
            }
            localStorage["countryName"] = locationResponseXML.getElementsByTagName('result')[5].getElementsByTagName('long_name')[1].textContent;
        }
    };
    ajaxFetch.open('GET', 'https://maps.googleapis.com/maps/api/geocode/xml?language=en-US&&latlng=' + localStorage["currentLatitude"] + ',' + localStorage["currentLongitude"] + '&&sensor=false&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j', true);
    ajaxFetch.send();

    var ajaxSecondFetch = new XMLHttpRequest();
    ajaxSecondFetch.onreadystatechange = function () {
        if (ajaxSecondFetch.readyState == 4 && ajaxSecondFetch.status == 200) {
            var locationResponseXML = ajaxSecondFetch.responseXML;
            for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                if (locationResponseXML.getElementsByTagName('type')[i].textContent == "locality") {
                    localStorage["cityNameLocalized"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                    break;
                }
            }
            if (localStorage["cityNameLocalized"] == "undefined" || localStorage["cityNameLocalized"] == undefined || localStorage["cityNameLocalized"] == null || localStorage["cityNameLocalized"] == "") {
                for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                    if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_3") {
                        localStorage["cityNameLocalized"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                        break;
                    }
                }
            }
            if (localStorage["cityNameLocalized"] == "undefined" || localStorage["cityNameLocalized"] == undefined || localStorage["cityNameLocalized"] == null || localStorage["cityNameLocalized"] == "") {
                for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                    if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_2") {
                        localStorage["cityNameLocalized"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                        break;
                    }
                }
            }
            if (localStorage["cityNameLocalized"] == "undefined" || localStorage["cityNameLocalized"] == undefined || localStorage["cityNameLocalized"] == null || localStorage["cityNameLocalized"] == "") {
                for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                    if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_1") {
                        localStorage["cityNameLocalized"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                        break;
                    }
                }
            }
        }
    };
    ajaxSecondFetch.open('GET', 'https://maps.googleapis.com/maps/api/geocode/xml?language=' + language + '&&latlng=' + localStorage["currentLatitude"] + ',' + localStorage["currentLongitude"] + '&&sensor=false&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j', true);
    ajaxSecondFetch.send();
}

setTimeout(onLoad, 10000);

var IYC_Display = localStorage["IYC_Display"];
var WallofAvatars = localStorage["WallofAvatars"];
var IYC_Num = localStorage["IYC_Num"];
var IYC_Size = localStorage["IYC_Size"];
var GIF_Avatars = localStorage["GIF_Avatars"];
var IYC_Animations = localStorage["IYC_Animations"];
var Scaling_Animations = localStorage["Scaling_Animations"];
var NotiWin_Animations = localStorage["NotiWin_Animations"];
var CmtBox_Animations = localStorage["CmtBox_Animations"];
var ShareBox_Animations = localStorage["ShareBox_Animations"];
var Btn_Animations = localStorage["Btn_Animations"];
var Clock_Fonts = localStorage["Clock_Fonts"];
var Clock_Font_Size = localStorage["Clock_Font_Size"];
var Clock_TS = localStorage["Clock_TS"];
var Clock_Day_Indctr = localStorage["Clock_Day_Indctr"];
var Clock_Night_Indctr = localStorage["Clock_Night_Indctr"];
var Clock_Show = localStorage["Clock_Show"];
var Remove_Borders = localStorage["Remove_Borders"];
var Remove_Gaps = localStorage["Remove_Gaps"];
var Resize_NotiWindow = localStorage["Resize_NotiWindow"];
var Resize_NotiWindow_Actual_Size = Resize_NotiWindow - 30;
var Resize_NotiWindow_Post_Text_Size = Resize_NotiWindow - 50;
var Background_Content_Type = localStorage["Background_Content_Type"];
var Background_URL = localStorage["Background_URL"];
var Background_Opacity = localStorage["Background_Opacity"];
var Posts_Opacity = localStorage["Posts_Opacity"];
var Background_Display = localStorage["Background_Display"];
var Background_Color = localStorage["Background_Color"];

function getIYC() {
    var languagePairs = {
        '首页': { head: '人在您的圈子中', weather: '天气', middle: '更新排名', foot: '查看全部', loading: '正在载入天气信息...' },
        '主頁': { head: '人在你的社交圈中', weather: '天氣', middle: '更新排名', foot: '檢視全部', loading: '正在載入天氣信息...' },
        '首頁': { head: '人在你的社交圈中', weather: '天氣', middle: '更新排名', foot: '檢視全部', loading: '正在載入天氣信息...' },
        'ホーム': { head: '人をサークルに追加', weather: '天気', middle: 'アップデート', foot: 'すべて表示', loading: '気象情報読み込み中...' },
        'Default': { head: 'In your circles', weather: 'Weather', middle: 'Update', foot: 'View all', loading: 'Loading weather...' }
    }

    var languagePairsThin = {
        '首页': { head: '人在 </br> 您的圈子中', weather: '天气', middle: '更新排名', foot: '查看全部', loading: '正在载入天气信息...' },
        '主頁': { head: '人在你的 </br> 社交圈中', weather: '天氣', middle: '更新排名', foot: '檢視全部', loading: '正在載入天氣信息...' },
        '首頁': { head: '人在你的 </br> 社交圈中', weather: '天氣', middle: '更新排名', foot: '檢視全部', loading: '正在載入天氣信息...' },
        'ホーム': { head: '人を </br> サークルに追加', weather: '天気', middle: 'アップデート', foot: 'すべて表示', loading: '気象情報読み込み中...' },
        'Default': { head: 'In </br> your circles', weather: 'Weather', middle: 'Update', foot: 'View all', loading: 'Loading weather...' }
    }

    if (document.URL.match(/https:\/\/plus\.google\.com(\/u\/\d)?/)) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var arr = eval('//' + ajax.responseText);
                var userptr = arr[0][1][2];
                var userRanksArr = new Array();
                var userRankUpdateDate = new Array();
                localStorage.setItem('IYC_Data', ajax.responseText);
                var IYC_Data = localStorage["IYC_Data"];

                var matchPair;
                if (document.getElementsByClassName("lCd Hyc fJb").length > 0) {
                    if (document.getElementsByClassName("Ypa jw Yc am").length > 0 && document.getElementsByClassName("Ypa jw Yc am")[0].clientWidth >= 400) {
                        matchPair = languagePairs[document.getElementsByClassName("lCd Hyc fJb")[0].textContent];
                        if (!matchPair)
                            matchPair = languagePairs['Default'];
                    }
                    else {
                        matchPair = languagePairsThin[document.getElementsByClassName("lCd Hyc fJb")[0].textContent];
                        if (!matchPair)
                            matchPair = languagePairsThin['Default'];
                    }
                }
                else
                    matchPair = languagePairs['Default'];

                var container;
                if (document.getElementsByClassName('ona Fdb bsa')[0] != undefined) {
                    if (document.getElementsByClassName('ona Fdb bsa')[0].clientWidth >= 1080)
                        container = document.getElementsByClassName('Ypa jw Yc am')[2];
                    else if (document.getElementsByClassName('ona Fdb bsa')[0].clientWidth >= 720)
                        container = document.getElementsByClassName('Ypa jw Yc am')[1];
                }
                var html = '<div class="B3 Kg"><ul class="Bx wg"><li class="Zz fj c7c" rowindex="0"><div class="N5 Mq"><div><div class="Sla">';
                for (var i = 0; i < Math.min(userptr.length, WallofAvatars) ; i++) {
                    userRanksArr[i] = new Array(13);
                    if (userptr[i] != undefined && userptr[i] != null) {
                        if (userptr[i][0] != undefined && userptr[i][2] != undefined && userptr[i][0] != null && userptr[i][2] != null) {
                            if (userptr[i][0][2] != undefined && userptr[i][2][0] != undefined && userptr[i][0][2] != null && userptr[i][2][0] != null) {
                                var userid = userptr[i][0][2];
                                var username = userptr[i][2][0];
                                var relevance, userimg;
                                if (userptr[i][2][3] != undefined && userptr[i][2][3] != null)
                                    relevance = userptr[i][2][3];
                                else
                                    relevance = 0.0;
                                var relevanceAprox = userptr[i][2][19];
                                var usermail = userptr[i][0][0];
                                if (userptr[i][0][0] == undefined)
                                    usermail = 'N\/A';
                                if (userptr[i][2][8] != undefined && userptr[i][2][8] != null)
                                    userimg = userptr[i][2][8];
                                else
                                    userimg = "ssl.gstatic.com/s2/profiles/images/silhouette64.png";
                                var imgid = 'gbimg' + i
                                userimg = userimg.replace('/photo.jpg', '/s' + 2 * IYC_Size + '-c-k/photo.jpg');
                                var tmp1 = '<div class="w0a d-k-l qgc o-U-s" colindex="' + i + '" style="float: left;"><div class="gbrlvc">' + '' + '</div><a href="./' + userid + '" class="ob Jk" oid="' + userid + '"><img src="' + userimg + '" width="' + IYC_Size + 'px" height="' + IYC_Size + 'px" alt="' + username + '" class="ho rgc" id="' + imgid + '" oid="' + userid + '" title="' + userid + ' ' + username + ' ' + relevance + ' ' + usermail + '"></a></div>';
                                if (i < Math.min(userptr.length, IYC_Num))
                                    html += tmp1;
                                userRanksArr[i][0] = userid;
                                userRanksArr[i][1] = username;
                                userRanksArr[i][2] = relevance;
                                userRanksArr[i][3] = relevanceAprox;
                                userRanksArr[i][7] = username;
                                userRanksArr[i][10] = userimg;
                            }
                        }
                    }
                }
                Date.prototype.getDOY = function () {
                    var onejan = new Date(this.getFullYear(), 0, 1);
                    return Math.ceil((this - onejan) / 86400000);
                }
                function commafy(num) {
                    var str = num.toString().split('.');
                    if (str[0].length >= 4) {
                        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                    }
                    if (str[1] && str[1].length >= 4) {
                        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
                    }
                    return str.join('.');
                }
                if (localStorage["userRankArrPresent"] == undefined || localStorage["userRankArrPresent"] == "") {
                    userRankUpdateDate[0] = new Date().getFullYear();
                    userRankUpdateDate[1] = new Date().getMonth();
                    userRankUpdateDate[2] = new Date().getDate();
                    for (var i = 0; i < userRanksArr.length; i++) {
                        if (userRanksArr[i] != undefined) {
                            userRanksArr[i][6] = true;
                            userRanksArr[i][8] = false;
                            userRanksArr[i][11] = false;
                        }
                    }
                    localStorage["userRankArrPresent"] = JSON.stringify(userRanksArr);
                    localStorage["userRankUpdateDate"] = JSON.stringify(userRankUpdateDate);
                }
                if (localStorage["userRankUpdateDate"] == undefined) {
                    userRankUpdateDate[0] = new Date().getFullYear();
                    userRankUpdateDate[1] = new Date().getMonth();
                    userRankUpdateDate[2] = new Date().getDate();
                    localStorage["userRankUpdateDate"] = JSON.stringify(userRankUpdateDate);
                }
                else if (JSON.stringify(userRanksArr) != localStorage["userRankArrPresent"]) {
                    var storedUserRankArr = JSON.parse(localStorage["userRankArrPresent"]);
                    var storedUpdateDateArr = JSON.parse(localStorage["userRankUpdateDate"]);
                    var storedUpdateDate = new Date(storedUpdateDateArr[0], storedUpdateDateArr[1], storedUpdateDateArr[2]);
                    if ((storedUpdateDateArr[0] == new Date().getFullYear() && new Date().getDOY() - storedUpdateDate.getDOY() > 1) || (storedUpdateDateArr[0] < new Date().getFullYear())) {
                        var rankDifference;
                        var relevanceDifference;
                        for (var j = 0; j < userRanksArr.length; j++) {
                            var searchUIDTarget = storedUserRankArr[j][0];
                            for (k = 0; k < userRanksArr.length; k++) {
                                if (userRanksArr[k] != undefined) {
                                    if (userRanksArr[k][0] == searchUIDTarget) {
                                        rankDifference = j - k;
                                        relevanceDifference = (storedUserRankArr[k][2] * 100 - userRanksArr[j][2] * 100).toFixed(1);
                                        userRanksArr[k][4] = rankDifference;
                                        userRanksArr[k][5] = relevanceDifference;
                                        if (j > IYC_Num - 1 && k <= IYC_Num - 1) {
                                            userRanksArr[k][6] = true;
                                        }
                                        else if (j == k) {
                                            userRanksArr[k][6] = false;
                                        }
                                        else if (j < IYC_Num - 1 && k <= IYC_Num - 1) {
                                            userRanksArr[k][6] = false;
                                        }
                                        if (userRanksArr[k][9] == null) {
                                            userRanksArr[k][9] = userRanksArr[k][7];
                                        }
                                        if (storedUserRankArr[k][7] == userRanksArr[k][7]) {
                                            userRanksArr[k][8] = false;
                                            userRanksArr[k][9] = userRanksArr[k][7];
                                        }
                                        else if (storedUserRankArr[k][7] != userRanksArr[k][7]) {
                                            userRanksArr[k][8] = true;
                                        }
                                        if (userRanksArr[k][12] == null) {
                                            userRanksArr[k][12] = userRanksArr[k][10];
                                        }
                                        if (storedUserRankArr[k][10] == userRanksArr[k][10]) {
                                            userRanksArr[k][11] = false;
                                            userRanksArr[k][12] = userRanksArr[k][10];
                                        }
                                        else if (storedUserRankArr[k][9] != userRanksArr[k][9]) {
                                            userRanksArr[k][11] = true;
                                        }
                                    }
                                }
                            }
                        }
                        localStorage["userRankArrPresent"] = JSON.stringify(userRanksArr);
                        userRankUpdateDate[0] = new Date().getFullYear();
                        userRankUpdateDate[1] = new Date().getMonth();
                        userRankUpdateDate[2] = new Date().getDate();
                        localStorage["userRankUpdateDate"] = JSON.stringify(userRankUpdateDate);
                    }
                }
                else {
                    var storedUserRankArr = JSON.parse(localStorage["userRankArrPresent"]);
                    var storedUpdateDateArr = JSON.parse(localStorage["userRankUpdateDate"]);
                    var storedUpdateDate = new Date(storedUpdateDateArr[0], storedUpdateDateArr[1], storedUpdateDateArr[2]);
                    if ((storedUpdateDateArr[0] == new Date().getFullYear() && new Date().getDOY() - storedUpdateDate.getDOY() > 1) || (storedUpdateDateArr[0] < new Date().getFullYear())) {
                        if (JSON.stringify(userRanksArr) == localStorage["userRankArrPresent"]) {
                            for (var j = 0; j < userRanksArr.length; j++) {
                                if (userRanksArr[j] != undefined) {
                                    userRanksArr[j][4] = 0;
                                    userRanksArr[j][6] = false;
                                    userRanksArr[j][8] = false;
                                    userRanksArr[j][11] = false;
                                }
                            }
                            localStorage["userRankArrPresent"] = JSON.stringify(userRanksArr);
                            userRankUpdateDate[0] = new Date().getFullYear();
                            userRankUpdateDate[1] = new Date().getMonth();
                            userRankUpdateDate[2] = new Date().getDate();
                            localStorage["userRankUpdateDate"] = JSON.stringify(userRankUpdateDate);
                        }
                    }
                }
                html += '</div></div></div><div class="Xp"></li></ul></div></div>';
                var nav_wrap = document.createElement('div');
                //var linkOptions = "chrome-extension://" + extid + "/avatarsWall.html";
                //var linkOptions2 = "'" + linkOptions + "'";
                var linkOptions2 = "'" + "https://plus.google.com/circles" + "'";
                nav_wrap.innerHTML += '<div class="Tr TA" componentid="6"><div class="card"><div class="Ee fP Ue front"><div class="a5 Gi"><h3 class="EY Ni zj"><span>' + commafy(userptr.length) + '&nbsp;' + matchPair.head + '</span></h3><span role="button" class="d-s Hy Xc" id="gbweather" title="Flip to local weather card" tabindex="0" style="right: 135px;">' + matchPair.weather + '</span><span role="button" class="d-s Hy Xc" id="gbaupdt" title="Update circle ranks"tabindex="0" style="right: 65px;">' + matchPair.middle + '</span><span role="button" class="d-s Hy Xc" id="gbabtn" title="View all" tabindex="0" onclick="javascript:window.open(' + linkOptions2 + ')">' + matchPair.foot + '</span></div>' + html + '<div class="Ee fP back" style="display: none;"><font style="font-weight: bold;text-transform: uppercase;font-size: 26px;">' + matchPair.loading + '</font></div></div></div></div>';
                function flip() {
                    if (document.getElementsByClassName('card')[0].childNodes[0].style.display != 'none') {
                        document.getElementsByClassName('card')[0].className = 'card flipped';
                        setTimeout(function () { document.getElementsByClassName('card')[0].childNodes[1].style.display = ''; document.getElementsByClassName('card')[0].childNodes[0].style.display = 'none'; }, 200);
                    }
                    else if (document.getElementsByClassName('card')[0].childNodes[0].style.display == 'none') {
                        document.getElementsByClassName('card')[0].className = 'card';
                        setTimeout(function () { document.getElementsByClassName('card')[0].childNodes[0].style.display = ''; document.getElementsByClassName('card')[0].childNodes[1].style.display = 'none'; }, 200);
                    }
                }

                setInterval(function () {
                    if (document.getElementsByClassName('Sla').length == 0) {
                        var container;
                        if (document.getElementsByClassName('ona Fdb bsa')[0] != undefined) {
                            if (document.getElementsByClassName('ona Fdb bsa')[0].clientWidth >= 1080)
                                container = document.getElementsByClassName('Ypa jw Yc am')[2];
                            else if (document.getElementsByClassName('ona Fdb bsa')[0].clientWidth >= 720)
                                container = document.getElementsByClassName('Ypa jw Yc am')[1];
                        }
                        if (typeof (container) == 'undefined')
                            return;
                        container.insertBefore(nav_wrap, container.childNodes[0]);
                        for (var i = 0; i < userRanksArr.length; i++) {
                            var storedUserRankArr = JSON.parse(localStorage["userRankArrPresent"]);
                            var rankChangeText, relevanceChangeText, debutText;
                            var nameChangeText, avatarChangeHTML;
                            if (storedUserRankArr[i][4] != null && storedUserRankArr[i][4] != undefined) {
                                if (storedUserRankArr[i][4] > 0)
                                    rankChangeText = "▲" + storedUserRankArr[i][4] + " ";
                                else if (storedUserRankArr[i][4] == 0)
                                    rankChangeText = "〓 " + " ";
                                else if (storedUserRankArr[i][4] < 0)
                                    rankChangeText = "▼" + -storedUserRankArr[i][4] + " ";
                            }
                            else
                                rankChangeText = "N/A ";
                            if (storedUserRankArr[i][5] != null && storedUserRankArr[i][5] != undefined) {
                                if (storedUserRankArr[i][5] > 0)
                                    relevanceChangeText = "(+" + storedUserRankArr[i][5] + ") ";
                                else if (storedUserRankArr[i][5] == 0)
                                    relevanceChangeText = "";
                                else if (storedUserRankArr[i][5] < 0)
                                    relevanceChangeText = "(" + storedUserRankArr[i][5] + ") ";
                            }
                            else
                                relevanceChangeText = "(N/A) ";
                            if (storedUserRankArr[i][6] == true)
                                debutText = "DEBUT!";
                            else
                                debutText = "";
                            if (storedUserRankArr[i][8] == true) {
                                nameChangeText = storedUserRankArr[i][9];
                            }
                            else if (storedUserRankArr[i][8] == false) {
                                nameChangeText = "";
                            }
                            if (storedUserRankArr[i][11] == true) {
                                avatarChangeHTML = "<img src='https://" + storedUserRankArr[i][12] + " width='32px' height='32px' class='ho rgc'>";
                            }
                            else if (storedUserRankArr[i][11] == false) {
                                avatarChangeHTML = "";
                            }
                            document.getElementsByClassName("gbrlvc")[i].innerText = rankChangeText + relevanceChangeText + debutText;
                            if (storedUserRankArr[i][4] > 0)
                                document.getElementsByClassName("gbrlvc")[i].style.color = "rgba(61, 255, 0, 0.9)";
                            else if (storedUserRankArr[i][4] == 0) {
                                document.getElementsByClassName("gbrlvc")[i].style.color = "#999";
                                document.getElementsByClassName("gbrlvc")[i].style.display = "none";
                            }
                            else if (storedUserRankArr[i][4] < 0 || storedUserRankArr[i][4] < 0)
                                document.getElementsByClassName("gbrlvc")[i].style.color = "rgba(255, 10, 0, 0.9)";
                            else
                                document.getElementsByClassName("gbrlvc")[i].style.color = "gold";
                            if (storedUserRankArr[i][12] == "ssl.gstatic.com/s2/profiles/images/silhouette64.png") {
                                document.getElementsByClassName("gbrlvc")[i].innerHTML = "PROFILE DELETED!!";
                                document.getElementsByClassName("gbrlvc")[i].style.color = "rgba(255, 10, 0, 0.9)";
                                document.getElementsByClassName("gbrlvc")[i].style.opacity = "1";
                            }
                            document.getElementById("gbaupdt").addEventListener('click', updateManually);
                        }
                    }
                    else if (document.getElementsByClassName('ona Fdb bsa')[0] != undefined) {
                        if (document.getElementsByClassName('ona Fdb bsa')[0].clientWidth >= 1080) {
                            if (document.getElementsByClassName('Ypa jw Yc am')[2].childNodes[0].childNodes[0].className != "Tr TA") {
                                document.getElementsByClassName("Ypa jw Yc am")[2].insertBefore(document.getElementsByClassName("Tr TA")[0], document.getElementsByClassName("Ypa jw Yc am")[2].firstChild);
                            }
                        }
                        else if (document.getElementsByClassName('ona Fdb bsa')[0].clientWidth >= 720) {
                            if (document.getElementsByClassName('Ypa jw Yc am')[1].childNodes[0].childNodes[0].className != "Tr TA") {
                                document.getElementsByClassName("Ypa jw Yc am")[1].insertBefore(document.getElementsByClassName("Tr TA")[0], document.getElementsByClassName("Ypa jw Yc am")[1].firstChild);
                            }
                        }
                    }
                    if (document.getElementById('gbweather') != undefined && document.getElementsByClassName("Ee fP back")[0] != undefined) {
                        document.getElementById('gbweather').removeEventListener('click', flip, false);
                        document.getElementsByClassName("Ee fP back")[0].removeEventListener('click', flip, false);
                        document.getElementById('gbweather').addEventListener('click', flip, false);
                        document.getElementsByClassName("Ee fP back")[0].addEventListener('click', flip, false);
                    }
                }, 3000);
            }
        };
        ajax.open('GET', document.URL.match(/https:\/\/plus\.google\.com(\/b\/\d+)/) != undefined ? document.URL.match(/https:\/\/plus\.google\.com(\/b\/\d+)/)[0] + '/_/socialgraph/lookup/circles/?ct=2&m=true&tag=fg&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j' : document.URL.match(/https:\/\/plus\.google\.com(\/u\/\d)?/)[0] + '/_/socialgraph/lookup/circles/?ct=2&m=true&tag=fg&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j', true);
        ajax.send();
    }
}

function updateManually() {
    var languagePairs = {
        '首页': { head: '人在您的圈子中', weather: '天气', middle: '更新排名', foot: '查看全部', loading: '正在载入天气信息...' },
        '主頁': { head: '人在你的社交圈中', weather: '天氣', middle: '更新排名', foot: '檢視全部', loading: '正在載入天氣信息...' },
        '首頁': { head: '人在你的社交圈中', weather: '天氣', middle: '更新排名', foot: '檢視全部', loading: '正在載入天氣信息...' },
        'ホーム': { head: '人をサークルに追加', weather: '天気', middle: 'アップデート', foot: 'すべて表示', loading: '気象情報読み込み中...' },
        'Default': { head: 'In your circles', weather: 'Weather', middle: 'Update', foot: 'View all', loading: 'Loading weather...' }
    }

    var languagePairsThin = {
        '首页': { head: '人在 </br> 您的圈子中', weather: '天气', middle: '更新排名', foot: '查看全部', loading: '正在载入天气信息...' },
        '主頁': { head: '人在你的 </br> 社交圈中', weather: '天氣', middle: '更新排名', foot: '檢視全部', loading: '正在載入天氣信息...' },
        '首頁': { head: '人在你的 </br> 社交圈中', weather: '天氣', middle: '更新排名', foot: '檢視全部', loading: '正在載入天氣信息...' },
        'ホーム': { head: '人を </br> サークルに追加', weather: '天気', middle: 'アップデート', foot: 'すべて表示', loading: '気象情報読み込み中...' },
        'Default': { head: 'In </br> your circles', weather: 'Weather', middle: 'Update', foot: 'View all', loading: 'Loading weather...' }
    }

    if (document.URL.match(/https:\/\/plus\.google\.com(\/u\/\d)?/)) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var arr = eval('//' + ajax.responseText);
                var userptr = arr[0][1][2];
                var userRanksArr = new Array();
                var userRankUpdateDate = new Array();
                localStorage.setItem('IYC_Data', ajax.responseText);
                var IYC_Data = localStorage["IYC_Data"];

                var matchPair;
                if (document.getElementsByClassName("lCd Hyc fJb").length > 0) {
                    if (document.getElementsByClassName("Ypa jw Yc am").length > 0 && document.getElementsByClassName("Ypa jw Yc am")[0].clientWidth >= 400) {
                        matchPair = languagePairs[document.getElementsByClassName("lCd Hyc fJb")[0].textContent];
                        if (!matchPair)
                            matchPair = languagePairs['Default'];
                    }
                    else {
                        matchPair = languagePairsThin[document.getElementsByClassName("lCd Hyc fJb")[0].textContent];
                        if (!matchPair)
                            matchPair = languagePairsThin['Default'];
                    }
                }
                else
                    matchPair = languagePairs['Default'];

                var container;
                if (document.getElementsByClassName('ona Fdb bsa')[0] != undefined) {
                    if (document.getElementsByClassName('ona Fdb bsa')[0].clientWidth >= 1080)
                        container = document.getElementsByClassName('Ypa jw Yc am')[2];
                    else if (document.getElementsByClassName('ona Fdb bsa')[0].clientWidth >= 720)
                        container = document.getElementsByClassName('Ypa jw Yc am')[1];
                }
                var html = '<div class="B3 Kg"><ul class="Bx wg"><li class="Zz fj c7c" rowindex="0"><div class="N5 Mq"><div><div class="Sla">';
                for (var i = 0; i < Math.min(userptr.length, WallofAvatars) ; i++) {
                    userRanksArr[i] = new Array(13);
                    if (userptr[i] != undefined && userptr[i] != null) {
                        if (userptr[i][0] != undefined && userptr[i][2] != undefined && userptr[i][0] != null && userptr[i][2] != null) {
                            if (userptr[i][0][2] != undefined && userptr[i][2][0] != undefined && userptr[i][0][2] != null && userptr[i][2][0] != null) {
                                var userid = userptr[i][0][2];
                                var username = userptr[i][2][0];
                                var relevance, userimg;
                                if (userptr[i][2][3] != undefined && userptr[i][2][3] != null)
                                    relevance = userptr[i][2][3];
                                else
                                    relevance = 0.0;
                                var relevanceAprox = userptr[i][2][19];
                                var usermail = userptr[i][0][0];
                                if (userptr[i][0][0] == undefined)
                                    usermail = 'N\/A';
                                if (userptr[i][2][8] != undefined && userptr[i][2][8] != null)
                                    userimg = userptr[i][2][8];
                                else
                                    userimg = "ssl.gstatic.com/s2/profiles/images/silhouette64.png";
                                var imgid = 'gbimg' + i
                                userimg = userimg.replace('/photo.jpg', '/s' + 2 * IYC_Size + '-c-k/photo.jpg');
                                var tmp1 = '<div class="w0a d-k-l qgc o-U-s" colindex="' + i + '" style="float: left;"><div class="gbrlvc">' + '' + '</div><a href="./' + userid + '" class="ob Jk" oid="' + userid + '"><img src="' + userimg + '" width="' + IYC_Size + 'px" height="' + IYC_Size + 'px" alt="' + username + '" class="ho rgc" id="' + imgid + '" oid="' + userid + '" title="' + userid + ' ' + username + ' ' + relevance + ' ' + usermail + '"></a></div>';
                                if (i < Math.min(userptr.length, IYC_Num))
                                    html += tmp1;
                                userRanksArr[i][0] = userid;
                                userRanksArr[i][1] = username;
                                userRanksArr[i][2] = relevance;
                                userRanksArr[i][3] = relevanceAprox;
                                userRanksArr[i][7] = username;
                                userRanksArr[i][10] = userimg;
                            }
                        }
                    }
                }
                Date.prototype.getDOY = function () {
                    var onejan = new Date(this.getFullYear(), 0, 1);
                    return Math.ceil((this - onejan) / 86400000);
                }
                function commafy(num) {
                    var str = num.toString().split('.');
                    if (str[0].length >= 4) {
                        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                    }
                    if (str[1] && str[1].length >= 4) {
                        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
                    }
                    return str.join('.');
                }
                if (localStorage["userRankArrPresent"] == undefined || localStorage["userRankArrPresent"] == "") {
                    userRankUpdateDate[0] = new Date().getFullYear();
                    userRankUpdateDate[1] = new Date().getMonth();
                    userRankUpdateDate[2] = new Date().getDate();
                    for (var i = 0; i < userRanksArr.length; i++) {
                        if (userRanksArr[i] != undefined) {
                            userRanksArr[i][6] = true;
                            userRanksArr[i][8] = false;
                            userRanksArr[i][11] = false;
                        }
                    }
                    localStorage["userRankArrPresent"] = JSON.stringify(userRanksArr);
                    localStorage["userRankUpdateDate"] = JSON.stringify(userRankUpdateDate);
                }
                if (localStorage["userRankUpdateDate"] == undefined) {
                    userRankUpdateDate[0] = new Date().getFullYear();
                    userRankUpdateDate[1] = new Date().getMonth();
                    userRankUpdateDate[2] = new Date().getDate();
                    localStorage["userRankUpdateDate"] = JSON.stringify(userRankUpdateDate);
                }
                else if (JSON.stringify(userRanksArr) != localStorage["userRankArrPresent"]) {
                    var storedUserRankArr = JSON.parse(localStorage["userRankArrPresent"]);
                    var storedUpdateDateArr = JSON.parse(localStorage["userRankUpdateDate"]);
                    var storedUpdateDate = new Date(storedUpdateDateArr[0], storedUpdateDateArr[1], storedUpdateDateArr[2]);
                    var rankDifference;
                    var relevanceDifference;
                    for (var j = 0; j < userRanksArr.length; j++) {
                        var searchUIDTarget = storedUserRankArr[j][0];
                        for (k = 0; k < userRanksArr.length; k++) {
                            if (userRanksArr[k] != undefined) {
                                if (userRanksArr[k][0] == searchUIDTarget) {
                                    rankDifference = j - k;
                                    relevanceDifference = (storedUserRankArr[k][2] * 100 - userRanksArr[j][2] * 100).toFixed(1);
                                    userRanksArr[k][4] = rankDifference;
                                    userRanksArr[k][5] = relevanceDifference;
                                    if (j > IYC_Num - 1 && k <= IYC_Num - 1) {
                                        userRanksArr[k][6] = true;
                                    }
                                    else if (j == k) {
                                        userRanksArr[k][6] = false;
                                    }
                                    else if (j < IYC_Num - 1 && k <= IYC_Num - 1) {
                                        userRanksArr[k][6] = false;
                                    }
                                    if (userRanksArr[k][9] == null) {
                                        userRanksArr[k][9] = userRanksArr[k][7];
                                    }
                                    if (storedUserRankArr[k][7] == userRanksArr[k][7]) {
                                        userRanksArr[k][8] = false;
                                        userRanksArr[k][9] = userRanksArr[k][7];
                                    }
                                    else if (storedUserRankArr[k][7] != userRanksArr[k][7]) {
                                        userRanksArr[k][8] = true;
                                    }
                                    if (userRanksArr[k][12] == null) {
                                        userRanksArr[k][12] = userRanksArr[k][10];
                                    }
                                    if (storedUserRankArr[k][10] == userRanksArr[k][10]) {
                                        userRanksArr[k][11] = false;
                                        userRanksArr[k][12] = userRanksArr[k][10];
                                    }
                                    else if (storedUserRankArr[k][9] != userRanksArr[k][9]) {
                                        userRanksArr[k][11] = true;
                                    }
                                }
                            }
                        }
                    }
                    localStorage["userRankArrPresent"] = JSON.stringify(userRanksArr);
                    userRankUpdateDate[0] = new Date().getFullYear();
                    userRankUpdateDate[1] = new Date().getMonth();
                    userRankUpdateDate[2] = new Date().getDate();
                    localStorage["userRankUpdateDate"] = JSON.stringify(userRankUpdateDate);
                }
                else {
                    var storedUserRankArr = JSON.parse(localStorage["userRankArrPresent"]);
                    var storedUpdateDateArr = JSON.parse(localStorage["userRankUpdateDate"]);
                    var storedUpdateDate = new Date(storedUpdateDateArr[0], storedUpdateDateArr[1], storedUpdateDateArr[2]);
                    if ((storedUpdateDateArr[0] == new Date().getFullYear() && new Date().getDOY() - storedUpdateDate.getDOY() > 1) || (storedUpdateDateArr[0] < new Date().getFullYear())) {
                        if (JSON.stringify(userRanksArr) == localStorage["userRankArrPresent"]) {
                            for (var j = 0; j < userRanksArr.length; j++) {
                                if (userRanksArr[j] != undefined) {
                                    userRanksArr[j][4] = 0;
                                    userRanksArr[j][6] = false;
                                    userRanksArr[j][8] = false;
                                    userRanksArr[j][11] = false;
                                }
                            }
                            localStorage["userRankArrPresent"] = JSON.stringify(userRanksArr);
                            userRankUpdateDate[0] = new Date().getFullYear();
                            userRankUpdateDate[1] = new Date().getMonth();
                            userRankUpdateDate[2] = new Date().getDate();
                            localStorage["userRankUpdateDate"] = JSON.stringify(userRankUpdateDate);
                        }
                    }
                }
                html += '</div></div></div><div class="Xp"></li></ul></div></div>';
                var nav_wrap = document.createElement('div');
                //var linkOptions = "chrome-extension://" + extid + "/avatarsWall.html";
                //var linkOptions2 = "'" + linkOptions + "'";
                var linkOptions2 = "'" + "https://plus.google.com/circles" + "'";
                nav_wrap.innerHTML += '<div class="Tr TA" componentid="6"><div class="card"><div class="Ee fP Ue front"><div class="a5 Gi"><h3 class="EY Ni zj"><span>' + commafy(userptr.length) + '&nbsp;' + matchPair.head + '</span></h3><span role="button" class="d-s Hy Xc" id="gbweather" title="Flip to local weather card" tabindex="0" style="right: 135px;">' + matchPair.weather + '</span><span role="button" class="d-s Hy Xc" id="gbaupdt" title="Update circle ranks"tabindex="0" style="right: 65px;">' + matchPair.middle + '</span><span role="button" class="d-s Hy Xc" id="gbabtn" title="View all" tabindex="0" onclick="javascript:window.open(' + linkOptions2 + ')">' + matchPair.foot + '</span></div>' + html + '<div class="Ee fP back" style="display: none;"><font style="font-weight: bold;text-transform: uppercase;font-size: 26px;">' + matchPair.loading + '</font></div></div></div></div>';
                if (document.getElementsByClassName('Ypa jw Yc am')[2] != undefined) {
                    document.getElementsByClassName('Ypa jw Yc am')[2].firstChild.innerHTML = nav_wrap.innerHTML;
                    for (var i = 0; i < userRanksArr.length; i++) {
                        var storedUserRankArr = JSON.parse(localStorage["userRankArrPresent"]);
                        var rankChangeText, relevanceChangeText, debutText;
                        var nameChangeText, avatarChangeHTML;
                        if (storedUserRankArr[i][4] != null && storedUserRankArr[i][4] != undefined) {
                            if (storedUserRankArr[i][4] > 0)
                                rankChangeText = "▲" + storedUserRankArr[i][4] + " ";
                            else if (storedUserRankArr[i][4] == 0)
                                rankChangeText = "〓 " + " ";
                            else if (storedUserRankArr[i][4] < 0)
                                rankChangeText = "▼" + -storedUserRankArr[i][4] + " ";
                        }
                        else
                            rankChangeText = "N/A ";
                        if (storedUserRankArr[i][5] != null && storedUserRankArr[i][5] != undefined) {
                            if (storedUserRankArr[i][5] > 0)
                                relevanceChangeText = "(+" + storedUserRankArr[i][5] + ") ";
                            else if (storedUserRankArr[i][5] == 0)
                                relevanceChangeText = "";
                            else if (storedUserRankArr[i][5] < 0)
                                relevanceChangeText = "(" + storedUserRankArr[i][5] + ") ";
                        }
                        else
                            relevanceChangeText = "(N/A) ";
                        if (storedUserRankArr[i][6] == true)
                            debutText = "DEBUT!";
                        else
                            debutText = "";
                        if (storedUserRankArr[i][8] == true) {
                            nameChangeText = storedUserRankArr[i][9];
                        }
                        else if (storedUserRankArr[i][8] == false) {
                            nameChangeText = "";
                        }
                        if (storedUserRankArr[i][11] == true) {
                            avatarChangeHTML = "<img src='https://" + storedUserRankArr[i][12] + " width='32px' height='32px' class='ho rgc'>";
                        }
                        else if (storedUserRankArr[i][11] == false) {
                            avatarChangeHTML = "";
                        }
                        document.getElementsByClassName("gbrlvc")[i].innerText = rankChangeText + relevanceChangeText + debutText;
                        if (storedUserRankArr[i][4] > 0)
                            document.getElementsByClassName("gbrlvc")[i].style.color = "rgba(61, 255, 0, 0.9)";
                        else if (storedUserRankArr[i][4] == 0) {
                            document.getElementsByClassName("gbrlvc")[i].style.color = "#999";
                        }
                        else if (storedUserRankArr[i][4] < 0 || storedUserRankArr[i][4] < 0)
                            document.getElementsByClassName("gbrlvc")[i].style.color = "rgba(255, 10, 0, 0.9)";
                        else
                            document.getElementsByClassName("gbrlvc")[i].style.color = "gold";
                        if (storedUserRankArr[i][12] == "ssl.gstatic.com/s2/profiles/images/silhouette64.png") {
                            document.getElementsByClassName("gbrlvc")[i].innerHTML = "PROFILE DELETED!!";
                            document.getElementsByClassName("gbrlvc")[i].style.color = "rgba(255, 10, 0, 0.9)";
                            document.getElementsByClassName("gbrlvc")[i].style.opacity = "1";
                        }
                        document.getElementById("gbaupdt").addEventListener('click', updateManually);
                    }
                }
                else if (document.getElementsByClassName('Ypa jw Yc am')[1] != undefined) {
                    document.getElementsByClassName('Ypa jw Yc am')[1].firstChild.innerHTML = nav_wrap.innerHTML;
                    for (var i = 0; i < userRanksArr.length; i++) {
                        var storedUserRankArr = JSON.parse(localStorage["userRankArrPresent"]);
                        var rankChangeText, relevanceChangeText, debutText;
                        var nameChangeText, avatarChangeHTML;
                        if (storedUserRankArr[i][4] != null && storedUserRankArr[i][4] != undefined) {
                            if (storedUserRankArr[i][4] > 0)
                                rankChangeText = "▲" + storedUserRankArr[i][4] + " ";
                            else if (storedUserRankArr[i][4] == 0)
                                rankChangeText = "〓 " + " ";
                            else if (storedUserRankArr[i][4] < 0)
                                rankChangeText = "▼" + -storedUserRankArr[i][4] + " ";
                        }
                        else
                            rankChangeText = "N/A ";
                        if (storedUserRankArr[i][5] != null && storedUserRankArr[i][5] != undefined) {
                            if (storedUserRankArr[i][5] > 0)
                                relevanceChangeText = "(+" + storedUserRankArr[i][5] + ") ";
                            else if (storedUserRankArr[i][5] == 0)
                                relevanceChangeText = "";
                            else if (storedUserRankArr[i][5] < 0)
                                relevanceChangeText = "(" + storedUserRankArr[i][5] + ") ";
                        }
                        else
                            relevanceChangeText = "(N/A) ";
                        if (storedUserRankArr[i][6] == true)
                            debutText = "DEBUT!";
                        else
                            debutText = "";
                        if (storedUserRankArr[i][8] == true) {
                            nameChangeText = storedUserRankArr[i][9];
                        }
                        else if (storedUserRankArr[i][8] == false) {
                            nameChangeText = "";
                        }
                        if (storedUserRankArr[i][11] == true) {
                            avatarChangeHTML = "<img src='https://" + storedUserRankArr[i][12] + " width='32px' height='32px' class='ho rgc'>";
                        }
                        else if (storedUserRankArr[i][11] == false) {
                            avatarChangeHTML = "";
                        }
                        document.getElementsByClassName("gbrlvc")[i].innerText = rankChangeText + relevanceChangeText + debutText;
                        if (storedUserRankArr[i][4] > 0)
                            document.getElementsByClassName("gbrlvc")[i].style.color = "rgba(61, 255, 0, 0.9)";
                        else if (storedUserRankArr[i][4] == 0) {
                            document.getElementsByClassName("gbrlvc")[i].style.color = "#999";
                        }
                        else if (storedUserRankArr[i][4] < 0 || storedUserRankArr[i][4] < 0)
                            document.getElementsByClassName("gbrlvc")[i].style.color = "rgba(255, 10, 0, 0.9)";
                        else
                            document.getElementsByClassName("gbrlvc")[i].style.color = "gold";
                        if (storedUserRankArr[i][12] == "ssl.gstatic.com/s2/profiles/images/silhouette64.png") {
                            document.getElementsByClassName("gbrlvc")[i].innerHTML = "PROFILE DELETED!!";
                            document.getElementsByClassName("gbrlvc")[i].style.color = "rgba(255, 10, 0, 0.9)";
                            document.getElementsByClassName("gbrlvc")[i].style.opacity = "1";
                        }
                        document.getElementById("gbaupdt").addEventListener('click', updateManually);
                    }
                }
            }
        };
        ajax.open('GET', document.URL.match(/https:\/\/plus\.google\.com(\/b\/\d+)/) != undefined ? document.URL.match(/https:\/\/plus\.google\.com(\/b\/\d+)/)[0] + '/_/socialgraph/lookup/circles/?ct=2&m=true&tag=fg&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j' : document.URL.match(/https:\/\/plus\.google\.com(\/u\/\d)?/)[0] + '/_/socialgraph/lookup/circles/?ct=2&m=true&tag=fg&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j', true);
        ajax.send();
    }
}

if (IYC_Display == 'Display') {
    getIYC();
}

var css_Stream_Profile_Photo = ".Uk.wi.hE {\nheight: 64px !important;\nmargin-top: 10px !important;\nwidth: 64px !important;\n}\n\n.Ol.Rf, .fK {\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\n}\n\n.Ol.Rf:hover {\n-webkit-transform:scale(1.5);\n-moz-transform:scale(1.5);\n-o-transform:scale(1.5);\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\n}\n}";

var css_Profile_Photo_Animations = ".Ol.Rf:hover, .fK:hover, .Ut:hover {\n-webkit-transform:scale(1.5);\n-moz-transform:scale(1.5);\n-o-transform:scale(1.5);\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\n}\n}";

var css_Upper_Right = ".hp, .qu {\nbackground-color: transparent !important;\n}\n\n.Om {\nwidth: 275px !important;\n}\n\n.bja {\nwidth: auto;\n}\n\n.TA {\npadding-top: 0px !important;\n}\n\n.ag, .fK, .Zb {\nheight: 48px !important;\nwidth: 48px !important;\n}\n\n#gbimg0, #gbimg1 {\nwidth: 128px;\nheight: 128px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n-webkit-transform:rotate(0deg);\n-moz-transform:rotate(0deg);\n-o-transform:rotate(0deg);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg0:hover, #gbimg1:hover {\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n-webkit-transform:rotate(360deg);\n-moz-transform:rotate(360deg);\n-o-transform:rotate(360deg);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg2, #gbimg3, #gbimg4 {\nwidth: 85.33px;\nheight: 85.33px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n-webkit-transform:rotate(0deg);\n-moz-transform:rotate(0deg);\n-o-transform:rotate(0deg);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg2:hover, #gbimg3:hover, #gbimg4:hover {\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n-webkit-transform:rotate(360deg);\n-moz-transform:rotate(360deg);\n-o-transform:rotate(360deg);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg5, #gbimg6, #gbimg7, #gbimg8 {\nwidth: 64px;\nheight: 64px;\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n-webkit-transform:rotate(0deg);\n-moz-transform:rotate(0deg);\n-o-transform:rotate(0deg);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg5:hover, #gbimg6:hover, #gbimg7:hover, #gbimg8:hover {\n-webkit-transform:scale(1);\n-moz-transform:scale(1);\n-o-transform:scale(1);\n-webkit-transform:rotate(360deg);\n-moz-transform:rotate(360deg);\n-o-transform:rotate(360deg);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg9, #gbimg10, #gbimg11, #gbimg12, #gbimg13 {\nwidth: 51.2px;\nheight: 51.2px;\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg9:hover, #gbimg10:hover, #gbimg11:hover, #gbimg12:hover, #gbimg13:hover {\n-webkit-transform:scale(3);\n-moz-transform:scale(3);\n-o-transform:scale(3);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg14, #gbimg15, #gbimg16, #gbimg17, #gbimg18, #gbimg19 {\nwidth: 42.66px;\nheight: 42.66px;\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg14:hover, #gbimg15:hover, #gbimg16:hover, #gbimg17:hover, #gbimg18:hover, #gbimg19:hover {\n-webkit-transform:scale(3);\n-moz-transform:scale(3);\n-o-transform:scale(3);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg20, #gbimg21, #gbimg22, #gbimg23, #gbimg24, #gbimg25, #gbimg26 {\nwidth: 36.57px;\nheight: 36.57px;\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg20:hover, #gbimg21:hover, #gbimg22:hover, #gbimg23:hover, #gbimg24:hover, #gbimg25:hover, #gbimg26:hover {\n-webkit-transform:scale(3);\n-moz-transform:scale(3);\n-o-transform:scale(3);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg27, #gbimg28, #gbimg29, #gbimg30, #gbimg31, #gbimg32, #gbimg33, #gbimg34 {\nwidth: 32px;\nheight: 32px;\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg27:hover, #gbimg28:hover, #gbimg29:hover, #gbimg30:hover, #gbimg31:hover, #gbimg32:hover, #gbimg33:hover, #gbimg34:hover {\n-webkit-transform:scale(3);\n-moz-transform:scale(3);\n-o-transform:scale(3);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg35, #gbimg36, #gbimg37, #gbimg38, #gbimg39, #gbimg40, #gbimg41, #gbimg42, #gbimg43 {\nwidth: 28.44px;\nheight: 28.44px;\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg35:hover, #gbimg36:hover, #gbimg37:hover, #gbimg38:hover, #gbimg39:hover, #gbimg40:hover, #gbimg41:hover, #gbimg42:hover, #gbimg43:hover {\n-webkit-transform:scale(3);\n-moz-transform:scale(3);\n-o-transform:scale(3);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg44, #gbimg45, #gbimg46, #gbimg47, #gbimg48, #gbimg49, #gbimg50, #gbimg51, #gbimg52, #gbimg53 {\nwidth: 25.6px;\nheight: 25.6px;\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n\n#gbimg44:hover, #gbimg45:hover, #gbimg46:hover, #gbimg47:hover, #gbimg48:hover, #gbimg49:hover, #gbimg50:hover, #gbimg51:hover, #gbimg52:hover, #gbimg53:hover {\n-webkit-transform:scale(3);\n-moz-transform:scale(3);\n-o-transform:scale(3);\n-webkit-transition:all 1s ease;\n-moz-transition:all 1s ease;\n-o-transition:all 1s ease;\n}\n}";

var css_Icons = ".hp, .qu {\nbackground-color: transparent !important;\n}\n\n.bja {\nwidth: auto;\n}\n\n.Ala {\npadding-top: 20px !important;\nmargin-top: 0px !important;\ntop: initial !important;\n}\n\n.go {\nheight: 48px !important;\nwidth: 48px !important;\n}\n\n.go {\nborder-radius: 50% !important;\n}\n\n.roster_row>button>img, .ho {\nborder-radius: 50% !important;\n}\n\n.co {\nborder-radius: 50% !important;\n}\n\n.om {\nborder-radius: 50% !important;\n}.Wh {\nmargin: 0 0 0 -52px !important;\n}\n\n.oBNzfb {\npadding-left: 0 !important;\n}\n}";

var css_Settings_Card_Your_Photo = "#gbmpi {\nheight: 128px !important;\nwidth: 128px !important;\n}\n}";

var css_Mention_List = ".t-C-J {\nheight: 48px !important;\nwidth: 48px !important;\n}\n}";

var css_Notification_Photos_and_Border = ".om {\nborder: 0px solid #444 !important;\nheight: 56px !important;\nwidth: 56px !important;\nmargin-top: -6px !important;\n}\n\n.Lv {\nheight: 56px !important;\nwidth: 56px !important;\n}\n\n.Kaa {\nborder: 0px solid black !important;\ntop: -4px !important;\nleft: 2px !important;\n}\n\n.Jaa {\nborder: 0px solid #3D3D3D !important;\ntop: -2px !important;\nleft: 4px !important;\n}\n\n.Gf.Lu {\nheight: 56px !important;\nwidth: 56px !important;\nmargin-top: -6px !important;\n}\n\n.WtbUqb.Wm.F76eVc {\nborder: 0px solid black !important;\ntop: -2px !important;\nleft: 4px !important;\n}\n\n.WtbUqb.Wm.G31rIe {\nborder: 0px solid #3D3D3D !important;top: -4px !important;\nleft: 2px !important;\n}\n\n.wE.dPbJNd.iK.ek {\nwidth: 56px !important;\nheight: 56px !important;\n}\n\n.dPbJNd.iK.ek.Lu {\nwidth: 56px !important;\nheight: 56px !important;\n}\n\nspan.Xm, img.Xm {\nborder: 0px solid #444 !important;\n}\n\ndiv.Gf.no {\nheight: 52px !important;\nwidth: 52px !important;\n}\n}";

var css_Notifications_Animations = ".Jc.yl.jfa.en:hover {\n background-color: red;\n -webkit-transition: background-color 1s linear, color 1s linear, width 1s linear;\n -moz-transition: background-color 1s linear, color 1s linear, width 1s linear;\n -o-transition: background-color 1s linear, color 1s linear, width 1s linear;\n-webkit-transition-duration:1s;\n-moz-transition-duration:1s;\n-o-transition-duration:1s;\n}\n\n.Jc.yl.jfa.mfa:hover {\n background-color: aqua;\n -webkit-transition: background-color 1s linear, color 1s linear, width 1s linear;\n -moz-transition: background-color 1s linear, color 1s linear, width 1s linear;\n -o-transition: background-color 1s linear, color 1s linear, width 1s linear;\n-webkit-transition-duration:1s;\n-moz-transition-duration:1s;\n-o-transition-duration:1s;\n}\n}";

var css_Buttons_Animations = ".d-k-l.b-c:hover {\n-webkit-transform: scale(1.2);\n-moz-transform: scale(1.2);\n-o-transform: scale(1.2);\n-webkit-transition-duration:.0s;\n-moz-transition-duration:.0s;\n-o-transition-duration:.0s;\n}\n}";

var css_Share_Box_Animations = ".Ff {\nbackground: white;\n-webkit-transition: background-color 1s linear, color 1s linear, width 1s linear !important;\n-moz-transition: background-color 1s linear, color 1s linear, width 1s linear !important;\n-o-transition: background-color 1s linear, color 1s linear, width 1s linear !important;\n}\n\n.Ff:hover {\nbackground: aqua;\n-webkit-transition: background-color 1s linear, color 1s linear, width 1s linear;\n-moz-transition: background-color 1s linear, color 1s linear, width 1s linear;\n-o-transition: background-color 1s linear, color 1s linear, width 1s linear;\n}\n}";

var css_Notifications_Resize_Arrangement = "#gbwc {\nwidth: " + Resize_NotiWindow + "px !important;\n}\n\n#gbsf {\nwidth: " + Resize_NotiWindow + "px !important;\n}\n\n#gbd1 {\nwidth: " + Resize_NotiWindow + "px !important;\n}\n\n.lfa {\nwidth: " + Resize_NotiWindow_Post_Text_Size + "px !important;\n}\n\n.Laa {\nmax-height: 64px !important;\n}.Yy>.Tg.Sb {\nwidth: auto !important;\n}\n\n.Yy.oeIGR {\nwidth: auto !important;\n}\n\n.ws .Yy {\npadding-bottom: 0 !important;\npadding-top: 0 !important;\n}\n\n.zl .ws {\npadding-left: 0 !important;\npadding-right: 0 !important;\n}\n\n.gbmwc.gbmwca.gbem, .gbmwc.gbmwca.gbexxl {\nright: 0 !important;\n}\n}";

var css_Notifications_Fix = ".wm.VC {\npadding-left: 0px !important;\n}\n}";

var css_Remove_Photos_Border = ".Fg {\nbackground-color: white !important;\n}\n\n.Km, .Lm, .Jt, .It {border-left: 0px solid transparent !important;\nborder-right: 0px solid transparent !important;\nborder-top: 0px solid transparent !important;\nborder-bottom: 0px solid transparent !important;}\n\n\n}";

var css_Comment_Box_Animations = ".Tt.bj {\nheight: 30px;\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\n}\n\n.Tt.bj:hover {\nheight: 58px;\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\n}\n}";

var css_Suggestions_Text_Arrangement = ".ala {\nmargin-left: 20px !important;\n}\n\n.QK {\nmargin-top: 20px !important;\n}\n}";

var css_Photo_Wall = ".yp {\nmin-height: 180px !important;\nwidth: 940px !important;\n}\n\n.uc {\nheight: 180px !important;\nwidth: 180px !important;\nmargin: 0px !important;\n}\n\n.fz {\nheight: 180px !important;\nwidth: 180px !important;\n}\n\n.aq {\nmargin-top: 0px !important;\n}\n\n.GT {\nwidth: 0px !important;\n}.Vt {\n-webkit-box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1) !important;\n-moz-box-shadow: 0px 0px 0px rgba(0,0,0,0.1) !important;\nbox-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1) !important;\nbackground-color: transparent !important;\nborder: 0px solid #E3E3E3 !important;\n}\n\n.lCa {\nbackground-color: transparent !important;\n}\n\n.vCa {\n-webkit-box-shadow: 0 0 0 rgba(0, 0, 0, .1) !important;\n-moz-box-shadow: 0 0 0 rgba(0,0,0,.1) !important;\nbox-shadow: 0 0 0 rgba(0, 0, 0, .1) !important;\nbackground-color: transparent !important;\nborder: 0px solid #CCC !important;\n}\n\n.g-oa-Sa-R-ca {\nbackground-color: transparent !important;\n}\n\n.Oka {\nborder-right: 0px solid #CCC !important;\nborder-left: 0px solid #CCC !important;\nborder-bottom: 0px solid #CCC !important;\nmargin: -5px 3px 0 5px !important;\nwidth: 250px !important;\n}\n\n.KC {\npadding: 10px 0px 5px 15px !important;\n}\n\n.Xt {\nbackground-color: transparent !important;\nborder: 0px solid #DDD !important;\n}\n}";

var css_Background_Image_Norm = ".CF.he {\nbackground: no-repeat url(" + Background_URL + ");\nposition: fixed;\nopacity: " + Background_Opacity + ";\n}\n\n#contentPane {\nbackground: no-repeat url(" + Background_URL + ");\nposition: fixed;\nopacity: " + Background_Opacity + ";\n}\n}";

var css_Background_Image_Tile = ".CF.he {\nbackground: url(" + Background_URL + ");\nposition: fixed;\nopacity: " + Background_Opacity + ";\n}\n\n#contentPane {\nbackground: url(" + Background_URL + ");\nposition: fixed;\nopacity: " + Background_Opacity + ";\n}\n}";

var css_Background_Color = "#contentPane {\nbackground: " + Background_Color + ";\n}\n\n.Vra {\nbackground: " + Background_Color + " !important;\n}\n}";

var css_Posts_Opacity = ".Sb, .Pvkdsd, .kJHn5, .Fg, .Hw, .bI, .ii, .Je, .EyKftc.HWTYYe .Ng, #sync_container, .Um8btf, .RWa.KiWa0b .Teb, .xWa, .ZX, .cuuzrf {\nbackground-color: transparent !important;\n}\n\n.r6Rtbe, .Om, .On, .EyKftc {\nbackground-color: rgba(245,245,245," + Posts_Opacity + ") !important;\n-webkit-border-radius: 0px !important;\nborder-radius: 0px !important;\n}\n\n.ZuZuKf, .xe, .i-j-h-tb-x, .Od.esw, .dk, .iYjCM, .wH3YRe, .c-b-T, .Rm {\nbackground-color: rgba(245,245,245," + Posts_Opacity + ") !important;\n}\n\n.a-q, .u8yTrb {\nbackground-color: rgba(255,255,255," + Posts_Opacity + ") !important;\n}\n.dJa, .Yo, .Bb, .Xp, .YA {\nbackground-color: transparent !important;\n}\n\n.Xb {\nbackground-color: rgba(245,245,245," + Posts_Opacity + ") !important;\n}\n\n.Teb, .gbnotify, .jt {\nbackground-color: rgba(245, 245, 245, " + Posts_Opacity + ") !important;\n}\n\n.woHNpb {\nopacity: 0 !important;\n}\n}";

//var css_Relevance_Aprox = ".gbrlvc {\nopacity: 0;\ntext-align: right;\nposition: absolute;\ncolor: #DD4B39;\nbackground-color: rgba(0, 0, 0, 0.6);\n-webkit-border-radius: 16px;\n-moz-border-radius: 16px;\nborder-radius: 16px;\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\nz-index: 1;\n}\n\n.gbrlvc:hover {\nopacity: 1;\ntext-align: right;\nposition: absolute;\ncolor: #DD4B39;\nbackground-color: rgba(0, 0, 0, 0.6);\n-webkit-border-radius: 16px;\n-moz-border-radius: 16px;\nborder-radius: 16px;\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\nz-index: 1;\n}\n}";

var css_Relevance_Aprox = ".gbrlvc {\nopacity: 0.8;\nposition: absolute;\nbackground-color: rgba(0, 0, 0, 0.6);\nborder-radius: 25%;\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\nz-index: 1;\nfont-weight: bold;\nfont-size: 12px !important;\n}\n\n.gbrlvc:hover {\nopacity: 1;\nposition: absolute;\n-webkit-transition:all .5s ease;\n-moz-transition:all .5s ease;\n-o-transition:all .5s ease;\nz-index: 1;\nfont-weight: bold;\n}\n\n.t1a {\nmargin-right: 4px !important;\nmargin-bottom: 2px !important;\nfont-size: initial !important;\n}\n\n.DYa.d-k-l.jec.o-T-s {\nfont-size: 12px !important;\n}\n}";

var css_Time_Div = ".Yc {font: 11px arial,sans-serif;margin-top: -7px;position: relative;-webkit-transition: opacity .218s;-moz-transition: opacity .218s;-o-transition: opacity .218s;transition: opacity .218s;filter: alpha(opacity=0);opacity: 0;}.Yc:hover {font: 11px arial,sans-serif;margin-top: -7px;position: relative;-webkit-transition: opacity .218s;-moz-transition: opacity .218s;-o-transition: opacity .218s;transition: opacity .218s;filter: alpha(opacity=1);opacity: 1;}";

var css_Time_Text = ".time {\n-webkit-transition:all 2s ease;\n-moz-transition:all 2s ease;\n-o-transition:all 2s ease;\nmax-height: 300px;\n}\n\n.time_Text{\nborder-radius: 16px;\nline-height: 32px;\nmargin-right: 6px;\n}\n}";

//var css_Auto_Refresh = ".pdsQUd.vqlG {\nvisibility: hidden;\n}\n\n.pdsQUd.vqlG.WrxPu.CVep0d {\nvisibility: visible !important;\n}\n}";

var css_Flip_Cards = ".Tr.TA {\n-webkit-perspective: 800;\npadding-top: 0px !important;\n}\n\n.Tr.TA .card.flipped {\n-webkit-transform: rotatey(180deg);\n}\n\n.Tr.TA .card {\n-webkit-transform-style: preserve-3d;\n-webkit-transition: 0.8s;\n}\n\n.Tr.TA .card .ge.lO {\nz-index: 2;\n}\n.Tr.TA .card .front {\nz-index: 1;\ncursor: pointer;\n}\n\n.Tr.TA .card .back {\n-webkit-transform: rotatey(180deg);\ncursor: pointer;\nheight: auto;\nwidth: auto;\n}\n\n.On {\nbackground-color: #fff;\nwidth: auto;\nmargin: 10px 0 20px 0;\n}\n}";

//var css_post_Animation = ".Sb {\n-webkit-transition: opacity ease 0.8s;\n}\n}";

var css_Weather_Now = ".content-box {\nborder-radius:3px;\nbox-shadow: rgba(0, 0, 0, 0.2) 0px 2px 2px, rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px;\ndisplay: -webkit-box;\ncolor: #666;\n}\n\n.content-box h2 {\nfont-size: 22px;\nfont-weight: normal;\n}\n\n#box-weather {\n-webkit-box-orient: vertical;\npadding: 20px;\n}\n\n#box-weather h2 {\nmargin: 0px;\n}\n\n#weather-date {\nfont-size: 16px;\n}\n#weather-current {\n-webkit-box-align: center;\n-webkit-box-orient: horizontal;\ndisplay: -webkit-box;\npadding-top: 10px;\nwidth: 300px;\n}\n\n#weather-current-box {\n-webkit-box-orient: vertical;\ndisplay: -webkit-box;\nfont-size: 16px;\npadding-left: 10px;\nwidth: 140px;\n}\n\n#weather-current-icon {\nwidth: 96px;\nheight: 96px;\n}\n\n#weather-current-temperature {\n-webkit-box-align: start;\n-webkit-box-orient: horizontal;\ndisplay: -webkit-box;\n}\n\n#weather-temperature {\ncolor: #666;\ndisplay: -webkit-box;\nfont-size: 96px;\npadding-left: 20px;\n}\n\n#celsius {\ndisplay: -webkit-box;\nposition: relative;\ntop: 10px;\n}\n\n#weather-forecast-box {\n-webkit-box-orient: horizontal;\n-webkit-box-pack: justify;\ndisplay: -webkit-box;\npadding: 15px 0px 0 8px;\n}\n\n.weather-forecast div {\ncolor: #666;\nfont-size: 14px;\ntext-align: center;\ntext-transform: uppercase;\n}\n\n.weather-forecast img {\nwidth: 64px;\nheight: 64px;\n}\n\n.temperature-high {\ncolor: #666;\n}\n\n.temperature-low {\ncolor: #AAA;\n}\n\n#weather-geolocation-permission {\ndisplay: -webkit-box;\noverflow: hidden;\npadding-top: 16px;\n-webkit-transition: height 200ms;\n}\n\n#weather-geolocation-permission.hidden {\nheight: 0;\n}\n\n#weather-geolocation-permission a:hover {\ncolor: #000;\ntext-decoration: none;\n}\n\n.weather-forecast {\nborder-right: 2px solid #DDD;\npadding-right: 20px;\n}\n\n#weather-condition {\ntext-transform: uppercase;\n}\n\n.weather-forecast.last-forecast {\nborder: none;\n}\n}";

var css_Posts_Overflow = ".ee3yFe>.ChZ7Rc {\noverflow-x: hidden;\n}\n}";

GM_addStyle(css_Stream_Profile_Photo);
GM_addStyle(css_Profile_Photo_Animations);
//GM_addStyle(css_Auto_Refresh);
GM_addStyle(css_Flip_Cards);
//GM_addStyle(css_post_Animation);
GM_addStyle(css_Weather_Now);
GM_addStyle(css_Posts_Overflow);
if (IYC_Animations == "Enabled")
    GM_addStyle(css_Upper_Right);
else
    GM_addStyle(css_Icons);
GM_addStyle(css_Settings_Card_Your_Photo);
GM_addStyle(css_Mention_List);
if (Remove_Borders == "Enabled")
    GM_addStyle(css_Notification_Photos_and_Border);
if (NotiWin_Animations == "Enabled")
    GM_addStyle(css_Notifications_Animations);
if (Btn_Animations == "Enabled")
    GM_addStyle(css_Buttons_Animations);
if (ShareBox_Animations == "Enabled")
    GM_addStyle(css_Share_Box_Animations);
if (Resize_NotiWindow !== "Default")
    GM_addStyle(css_Notifications_Resize_Arrangement);
GM_addStyle(css_Notifications_Fix);
if (Remove_Borders == "Enabled")
    GM_addStyle(css_Remove_Photos_Border);
if (CmtBox_Animations == "Enabled")
    GM_addStyle(css_Comment_Box_Animations);
GM_addStyle(css_Suggestions_Text_Arrangement);
//if (Remove_Gaps == "Enabled")
//GM_addStyle(css_Photo_Wall);
if (Background_Content_Type == "Image" && Background_Display == "Tile") {
    GM_addStyle(css_Background_Image_Tile);
    GM_addStyle(css_Posts_Opacity);
}
else if (Background_Content_Type == "Image" && Background_Display == "Normal") {
    GM_addStyle(css_Background_Image_Norm);
    GM_addStyle(css_Posts_Opacity);
}
else if (Background_Content_Type == "Color") {
    GM_addStyle(css_Background_Color);
};
GM_addStyle(css_Relevance_Aprox);
if (Clock_Show == 'Show') {
    //GM_addStyle(css_Time_Div);
    GM_addStyle(css_Time_Text);
}

if (GIF_Avatars == "Enabled") {
    function replaceImg(target) {
        if (target && target.src) {
            var distHeight = target.clientHeight != 0 ? target.clientHeight * 2 : 64;
            target.src = target.src.replace(/s\d{2,}-c-k/g, 's' + distHeight + '-c')
                .replace('photo.jpg', 'photo.gif')
                .replace(/\?sz=\d{2,}/, '');
            return target.src;
        }
    }

    function batchReplace(targets) {
        if (targets && targets.length)
            for (var i = 0; i < targets.length ; i++)
                replaceImg(targets[i]);
    }

    //Speacial preprocessing for Webkit Browsers.
    batchReplace(document.body.getElementsByClassName('hE')); // Your Stream Profile Photo
    //batchReplace(document.body.getElementsByClassName('Ep')); // Others Stream Profile Photo
    batchReplace(document.body.getElementsByClassName('ho')); // Profile Photo in In Your Circles
    batchReplace(document.body.getElementsByClassName('go')); // Profile Photo in Comments
    //batchReplace(document.body.getElementsByClassName('Zb')); // In Your Circles Profile Page Photos
    //batchReplace(document.body.getElementsByClassName('l-tk')); // Large Profile Photo in Settings

    document.body.addEventListener('DOMNodeInserted', function (e) {
        if (e.target.nodeType != 3 && e.target.tagName == 'DIV') {
            batchReplace(e.target.getElementsByClassName('hE')); // Your Stream Profile Photo
            //batchReplace(e.target.getElementsByClassName('rs Hk')); // Reshare Box Your Stream Profile Photo
            //batchReplace(e.target.getElementsByClassName('Ep')); // Others Stream Profile Photo
            batchReplace(e.target.getElementsByClassName('ho')); // Profile Photo in In Your Circles
            batchReplace(e.target.getElementsByClassName('go')); // Profile Photo in Comments
            batchReplace(e.target.getElementsByClassName('we')); // Profile Photo in Hover Card
            batchReplace(e.target.getElementsByClassName('e4a')); // Notifications Profile Photos
            //batchReplace(e.target.getElementsByClassName('l-tk')); // Your Large Profile Photo in Profile Page
            batchReplace(e.target.getElementsByClassName('t-C-J')); // Profile Photos in Mention List
            //batchReplace(e.target.getElementsByClassName('HPb')); // In Your Circles Profile Photos
            //batchReplace(e.target.getElementsByClassName('Zb')); // Profile Photos of Hang out
            //batchReplace(e.target.getElementsByClassName('L6')); // Sharebox Profile Photo
        }
    }, false);
};

function fillZero(v) {
    if (v < 10) {
        v = '0' + v;
    }
    return v;
}

function currentWeather() {
    var languagePairs = {
        '首页': { language: 'zh-CN' },
        '主頁': { language: 'zh-HK' },
        '首頁': { language: 'zh-TW' },
        'ホーム': { language: 'ja' },
        'Default': { language: 'en-US' }
    }

    var currentCondition, currentTempF, currentTempC, currentTemp, humidityChance, currentWind, highToday, lowToday, unitSystem, unitIndicator;
    var todayWeatherImage, forecastDay0, forecastDay0Low, forecastDay0High, forecastDay0Condition, forecastDay0Image, forecastDay1, forecastDay1Low, forecastDay1High, forecastDay1Condition, forecastDay1Image, forecastDay2, forecastDay2Low, forecastDay2High, forecastDay2Condition, forecastDay2Image, forecastDay3, forecastDay3Low, forecastDay3High, forecastDay3Condition, forecastDay3Image;

    var matchPair;
    if (document.getElementsByClassName("lCd Hyc fJb").length > 0) {
        matchPair = languagePairs[document.getElementsByClassName("lCd Hyc fJb")[0].textContent];
        if (!matchPair)
            matchPair = languagePairs['Default'];
    }
    else
        matchPair = languagePairs['Default'];
    var language = matchPair.language;

    var fetchWeather = setInterval(function () {
        if (localStorage["currentLatitude"] == "undefined" || localStorage["currentLatitude"] == undefined || localStorage["currentLongitude"] == "undefined" || localStorage["currentLongitude"] == undefined) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position);
                localStorage["currentLatitude"] = position.coords.latitude;
                localStorage["currentLongitude"] = position.coords.longitude;
            }, function (positionError) {
                console.error(positionError);
            });
        }

        if (localStorage["cityNameLocalized"] == "undefined" || localStorage["cityNameLocalized"] == undefined) {
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    var locationResponseXML = ajax.responseXML;
                    for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                        if (locationResponseXML.getElementsByTagName('type')[i].textContent == "locality") {
                            localStorage["cityNameLocalized"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                            break;
                        }
                    }
                    if (localStorage["cityNameLocalized"] == "undefined" || localStorage["cityNameLocalized"] == undefined || localStorage["cityNameLocalized"] == null || localStorage["cityNameLocalized"] == "") {
                        for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                            if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_3") {
                                localStorage["cityNameLocalized"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                                break;
                            }
                        }
                    }
                    if (localStorage["cityNameLocalized"] == "undefined" || localStorage["cityNameLocalized"] == undefined || localStorage["cityNameLocalized"] == null || localStorage["cityNameLocalized"] == "") {
                        for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                            if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_2") {
                                localStorage["cityNameLocalized"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                                break;
                            }
                        }
                    }
                    if (localStorage["cityNameLocalized"] == "undefined" || localStorage["cityNameLocalized"] == undefined || localStorage["cityNameLocalized"] == null || localStorage["cityNameLocalized"] == "") {
                        for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                            if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_1") {
                                localStorage["cityNameLocalized"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                                break;
                            }
                        }
                    }
                }
            };
            ajax.open('GET', 'https://maps.googleapis.com/maps/api/geocode/xml?language=' + language + '&&latlng=' + localStorage["currentLatitude"] + ',' + localStorage["currentLongitude"] + '&&sensor=false&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j', true);
            ajax.send();
        }
        var currentDate = new Date();


        GM_xmlhttpRequest({
            method: "GET",
            url: 'https://www.google.com/ig/api?hl=' + language + '&weather=' + localStorage["cityName1033"] + '&expflags=Dispatchers__force_signed_weather_api%3Afalse&oauth_signature=en&referrer=igoogle&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j',
            headers: {
                "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
                "Accept": "text/xml"            // If not specified, browser defaults will be used.
            },
            onload: function (response) {
                var responseXML = null;
                // Inject responseXML into existing Object (only appropriate for XML content).
                if (!response.responseXML) {
                    responseXML = new DOMParser()
                      .parseFromString(response.responseText, "text/xml");
                }
                if (localStorage["cityName1033"] == "undefined" || localStorage["cityName1033"] == undefined) {
                    var ajaxSecondFetch = new XMLHttpRequest();
                    ajaxSecondFetch.onreadystatechange = function () {
                        if (ajaxSecondFetch.readyState == 4 && ajaxSecondFetch.status == 200) {
                            var locationResponseXML = ajaxSecondFetch.responseXML;
                            for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                                if (locationResponseXML.getElementsByTagName('type')[i].textContent == "locality") {
                                    localStorage["cityName1033"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                                    break;
                                }
                            }
                            if (localStorage["cityName1033"] == "undefined" || localStorage["cityName1033"] == undefined || localStorage["cityName1033"] == null || localStorage["cityName1033"] == "") {
                                for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                                    if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_3") {
                                        localStorage["cityName1033"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                                        break;
                                    }
                                }
                            }
                            if (localStorage["cityName1033"] == "undefined" || localStorage["cityName1033"] == undefined || localStorage["cityName1033"] == null || localStorage["cityName1033"] == "") {
                                for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                                    if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_2") {
                                        localStorage["cityName1033"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                                        break;
                                    }
                                }
                            }
                            if (localStorage["cityName1033"] == "undefined" || localStorage["cityName1033"] == undefined || localStorage["cityName1033"] == null || localStorage["cityName1033"] == "") {
                                for (var i = 0; i < locationResponseXML.getElementsByTagName('type').length; i++) {
                                    if (locationResponseXML.getElementsByTagName('type')[i].textContent == "administrative_area_level_1") {
                                        localStorage["cityName1033"] = locationResponseXML.getElementsByTagName('type')[i].parentNode.getElementsByTagName("short_name")[0].textContent;
                                        break;
                                    }
                                }
                            }
                            localStorage["countryName"] = locationResponseXML.getElementsByTagName('result')[5].getElementsByTagName('long_name')[1].textContent;
                        }
                    };
                    ajaxSecondFetch.open('GET', 'https://maps.googleapis.com/maps/api/geocode/xml?language=en-US&latlng=' + localStorage["currentLatitude"] + ',' + localStorage["currentLongitude"] + '&&sensor=false&_reqid=' + (new Date().getTime() % 1000000) + '&rt=j', true);
                    ajaxSecondFetch.send();
                }
                else {
                    currentCondition = responseXML.getElementsByTagName("current_conditions")[0].childNodes[0].getAttribute("data");
                    currentTempF = responseXML.getElementsByTagName("current_conditions")[0].childNodes[1].getAttribute("data");
                    currentTempC = responseXML.getElementsByTagName("current_conditions")[0].childNodes[2].getAttribute("data");
                    humidityChance = responseXML.getElementsByTagName("current_conditions")[0].childNodes[3].getAttribute("data");
                    currentWind = responseXML.getElementsByTagName("current_conditions")[0].childNodes[5].getAttribute("data");
                    highToday = responseXML.getElementsByTagName("forecast_conditions")[0].childNodes[2].getAttribute("data");
                    lowToday = responseXML.getElementsByTagName("forecast_conditions")[0].childNodes[1].getAttribute("data");
                    unitSystem = responseXML.getElementsByTagName("forecast_information")[0].childNodes[6].getAttribute("data");
                    forecastDay0 = responseXML.getElementsByTagName("forecast_conditions")[0].childNodes[0].getAttribute("data");
                    forecastDay0Low = responseXML.getElementsByTagName("forecast_conditions")[0].childNodes[1].getAttribute("data");
                    forecastDay0High = responseXML.getElementsByTagName("forecast_conditions")[0].childNodes[2].getAttribute("data");
                    forecastDay0Condition = responseXML.getElementsByTagName("forecast_conditions")[0].childNodes[4].getAttribute("data");
                    forecastDay1 = responseXML.getElementsByTagName("forecast_conditions")[1].childNodes[0].getAttribute("data");
                    forecastDay1Low = responseXML.getElementsByTagName("forecast_conditions")[1].childNodes[1].getAttribute("data");
                    forecastDay1High = responseXML.getElementsByTagName("forecast_conditions")[1].childNodes[2].getAttribute("data");
                    forecastDay1Condition = responseXML.getElementsByTagName("forecast_conditions")[1].childNodes[4].getAttribute("data");
                    forecastDay2 = responseXML.getElementsByTagName("forecast_conditions")[2].childNodes[0].getAttribute("data");
                    forecastDay2Low = responseXML.getElementsByTagName("forecast_conditions")[2].childNodes[1].getAttribute("data");
                    forecastDay2High = responseXML.getElementsByTagName("forecast_conditions")[2].childNodes[2].getAttribute("data");
                    forecastDay2Condition = responseXML.getElementsByTagName("forecast_conditions")[2].childNodes[4].getAttribute("data");
                    forecastDay3 = responseXML.getElementsByTagName("forecast_conditions")[3].childNodes[0].getAttribute("data");
                    forecastDay3Low = responseXML.getElementsByTagName("forecast_conditions")[3].childNodes[1].getAttribute("data");
                    forecastDay3High = responseXML.getElementsByTagName("forecast_conditions")[3].childNodes[2].getAttribute("data");
                    forecastDay3Condition = responseXML.getElementsByTagName("forecast_conditions")[3].childNodes[4].getAttribute("data");
                    if (localStorage["countryName"] != 'United States' && language == 'en-US') {
                        if (document.getElementsByClassName("Tr TA").length > 0 && document.getElementsByClassName("Tr TA")[0].clientWidth >= 420) {
                            currentTemp = ((parseInt(currentTempF) - 32) / 9 * 5).toFixed(1);
                            highToday = ((parseInt(highToday) - 32) / 9 * 5).toFixed(1);
                            lowToday = ((parseInt(lowToday) - 32) / 9 * 5).toFixed(1);
                            forecastDay0High = ((parseInt(forecastDay0High) - 32) / 9 * 5).toFixed(1);
                            forecastDay0Low = ((parseInt(forecastDay0Low) - 32) / 9 * 5).toFixed(1);
                            forecastDay1High = ((parseInt(forecastDay1High) - 32) / 9 * 5).toFixed(1);
                            forecastDay1Low = ((parseInt(forecastDay1Low) - 32) / 9 * 5).toFixed(1);
                            forecastDay2High = ((parseInt(forecastDay2High) - 32) / 9 * 5).toFixed(1);
                            forecastDay2Low = ((parseInt(forecastDay2Low) - 32) / 9 * 5).toFixed(1);
                            forecastDay3High = ((parseInt(forecastDay3High) - 32) / 9 * 5).toFixed(1);
                            forecastDay3Low = ((parseInt(forecastDay3Low) - 32) / 9 * 5).toFixed(1);
                        }
                        else {
                            currentTemp = currentTempC;
                            highToday = Math.round((parseInt(highToday) - 32) / 9 * 5);
                            lowToday = Math.round((parseInt(lowToday) - 32) / 9 * 5);
                            forecastDay0High = Math.round((parseInt(forecastDay0High) - 32) / 9 * 5);
                            forecastDay0Low = Math.round((parseInt(forecastDay0Low) - 32) / 9 * 5);
                            forecastDay1High = Math.round((parseInt(forecastDay1High) - 32) / 9 * 5);
                            forecastDay1Low = Math.round((parseInt(forecastDay1Low) - 32) / 9 * 5);
                            forecastDay2High = Math.round((parseInt(forecastDay2High) - 32) / 9 * 5);
                            forecastDay2Low = Math.round((parseInt(forecastDay2Low) - 32) / 9 * 5);
                            forecastDay3High = Math.round((parseInt(forecastDay3High) - 32) / 9 * 5);
                            forecastDay3Low = Math.round((parseInt(forecastDay3Low) - 32) / 9 * 5);
                        }
                        unitIndicator = "C";
                    }
                    else if ((localStorage["countryName"] == 'United States' && language == 'en-US')) {
                        currentTemp = currentTempF;
                        unitIndicator = "F";
                    }
                    else {
                        if (document.getElementsByClassName("Tr TA").length > 0 && document.getElementsByClassName("Tr TA")[0].clientWidth >= 420)
                            currentTemp = ((parseInt(currentTempF) - 32) / 9 * 5).toFixed(1);
                        else
                            currentTemp = currentTempC;
                        unitIndicator = "C";
                    }
                }

                GM_log([
                  response.status,
                  response.statusText,
                  response.readyState,
                  response.responseHeaders,
                  response.responseText,
                  response.finalUrl,
                  responseXML
                ].join("\n"));
            }
        });
        if (currentCondition != undefined) {
            if (document.getElementsByClassName("Ee fP back")[0] != undefined) {
                if (currentCondition.match(/Partly Cloudy|Mostly Cloudy|局部多云|局部有雲|ところにより曇り/gi)) {
                    todayWeatherImage = "https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png";
                }
                else if (currentCondition.match(/Thunderstorm|storm|雷|激しい風雨/gi)) {
                    todayWeatherImage = "https://ssl.gstatic.com/onebox/weather/128/rain_s_cloudy.png";
                }
                else if (currentCondition.match(/rain|drizzle|showers|雨/gi)) {
                    todayWeatherImage = "https://ssl.gstatic.com/onebox/weather/128/rain.png";
                }
                else if (currentCondition.match(/cloudy|overcast|云|雲|阴|陰|曇り/gi)) {
                    todayWeatherImage = "https://ssl.gstatic.com/onebox/weather/128/cloudy.png";
                }
                else if (currentCondition.match(/fog|haze|hazy|雾|霧|曇/gi)) {
                    todayWeatherImage = "https://ssl.gstatic.com/onebox/weather/128/fog.png";
                }
                else if (currentCondition.match(/Partly Sunny|Mostly Sunny|晴间多云|多雲時晴|ところにより晴れ/gi)) {
                    todayWeatherImage = "https://ssl.gstatic.com/onebox/weather/128/partly_cloudy.png";
                }
                else if (currentCondition.match(/clear|晴/gi)) {
                    todayWeatherImage = "https://ssl.gstatic.com/onebox/weather/128/sunny.png";
                }
                if (forecastDay0Condition.match(/Partly Cloudy|Mostly Cloudy|局部多云|局部有雲|ところにより曇り/gi)) {
                    forecastDay0Image = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
                }
                else if (forecastDay0Condition.match(/Thunderstorm|storm|雷|激しい風雨/gi)) {
                    forecastDay0Image = "https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png";
                }
                else if (forecastDay0Condition.match(/rain|drizzle|showers|雨/gi)) {
                    forecastDay0Image = "https://ssl.gstatic.com/onebox/weather/64/rain.png";
                }
                else if (forecastDay0Condition.match(/cloudy|overcast|云|雲|阴|陰|曇り/gi)) {
                    forecastDay0Image = "https://ssl.gstatic.com/onebox/weather/64/cloudy.png";
                }
                else if (forecastDay0Condition.match(/fog|haze|hazy|雾|霧|曇/gi)) {
                    forecastDay0Image = "https://ssl.gstatic.com/onebox/weather/64/fog.png";
                }
                else if (forecastDay0Condition.match(/Partly Sunny|Mostly Sunny|晴间多云|多雲時晴|ところにより晴れ/gi)) {
                    forecastDay0Image = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
                }
                else if (forecastDay0Condition.match(/clear|晴/gi)) {
                    forecastDay0Image = "https://ssl.gstatic.com/onebox/weather/64/sunny.png";
                }
                if (forecastDay1Condition.match(/Partly Cloudy|Mostly Cloudy|局部多云|局部有雲|ところにより曇り/gi)) {
                    forecastDay1Image = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
                }
                else if (forecastDay1Condition.match(/Thunderstorm|storm|雷|激しい風雨/gi)) {
                    forecastDay1Image = "https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png";
                }
                else if (forecastDay1Condition.match(/rain|drizzle|showers|雨/gi)) {
                    forecastDay1Image = "https://ssl.gstatic.com/onebox/weather/64/rain.png";
                }
                else if (forecastDay1Condition.match(/cloudy|overcast|云|雲|阴|陰|曇り/gi)) {
                    forecastDay1Image = "https://ssl.gstatic.com/onebox/weather/64/cloudy.png";
                }
                else if (forecastDay1Condition.match(/fog|haze|hazy|雾|霧|曇/gi)) {
                    forecastDay1Image = "https://ssl.gstatic.com/onebox/weather/64/fog.png";
                }
                else if (forecastDay1Condition.match(/Partly Sunny|Mostly Sunny|晴间多云|多雲時晴|ところにより晴れ/gi)) {
                    forecastDay1Image = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
                }
                else if (forecastDay1Condition.match(/clear|晴/gi)) {
                    forecastDay1Image = "https://ssl.gstatic.com/onebox/weather/64/sunny.png";
                }
                if (forecastDay2Condition.match(/Partly Cloudy|Mostly Cloudy|局部多云|局部有雲|ところにより曇り/gi)) {
                    forecastDay2Image = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
                }
                else if (forecastDay2Condition.match(/Thunderstorm|storm|雷|激しい風雨/gi)) {
                    forecastDay2Image = "https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png";
                }
                else if (forecastDay2Condition.match(/rain|drizzle|showers|雨/gi)) {
                    forecastDay2Image = "https://ssl.gstatic.com/onebox/weather/64/rain.png";
                }
                else if (forecastDay2Condition.match(/cloudy|overcast|云|雲|阴|陰|曇り/gi)) {
                    forecastDay2Image = "https://ssl.gstatic.com/onebox/weather/64/cloudy.png";
                }
                else if (forecastDay2Condition.match(/fog|haze|hazy|雾|霧|曇/gi)) {
                    forecastDay2Image = "https://ssl.gstatic.com/onebox/weather/64/fog.png";
                }
                else if (forecastDay2Condition.match(/Partly Sunny|Mostly Sunny|晴间多云|多雲時晴|ところにより晴れ/gi)) {
                    forecastDay2Image = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
                }
                else if (forecastDay2Condition.match(/clear|晴/gi)) {
                    forecastDay2Image = "https://ssl.gstatic.com/onebox/weather/64/sunny.png";
                }
                if (forecastDay3Condition.match(/Partly Cloudy|Mostly Cloudy|局部多云|局部有雲|ところにより曇り/gi)) {
                    forecastDay3Image = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
                }
                else if (forecastDay3Condition.match(/Thunderstorm|storm|雷|激しい風雨/gi)) {
                    forecastDay3Image = "https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png";
                }
                else if (forecastDay3Condition.match(/rain|drizzle|showers|雨/gi)) {
                    forecastDay3Image = "https://ssl.gstatic.com/onebox/weather/64/rain.png";
                }
                else if (forecastDay3Condition.match(/cloudy|overcast|云|雲|阴|陰|曇り/gi)) {
                    forecastDay3Image = "https://ssl.gstatic.com/onebox/weather/64/cloudy.png";
                }
                else if (forecastDay3Condition.match(/fog|haze|hazy|雾|霧|曇/gi)) {
                    forecastDay3Image = "https://ssl.gstatic.com/onebox/weather/64/fog.png";
                }
                else if (forecastDay3Condition.match(/Partly Sunny|Mostly Sunny|晴间多云|多雲時晴|ところにより晴れ/gi)) {
                    forecastDay3Image = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
                }
                else if (forecastDay3Condition.match(/clear|晴/gi)) {
                    forecastDay3Image = "https://ssl.gstatic.com/onebox/weather/64/sunny.png";
                }
            }
        }
        var text = '<div class="content-box" id="box-weather"><h2>' + localStorage["cityNameLocalized"] + '</h2><div id="weather-date">' + new Date().toLocaleString().replace(new Date().toLocaleString().match(/\d+:\d{2}:\d{2}\s*\w*/), new Date().toLocaleString().match(/(\d+:\d{2}):\d{2}(\s*\w*)/)[1] + new Date().toLocaleString().match(/(\d+:\d{2}):\d{2}(\s*\w*)/)[2]) + '</div><div id="weather-current"><div><img id="weather-current-icon" src="' + todayWeatherImage + '" title="' + currentCondition + '"><div id="weather-current-box"><div id="weather-condition">' + currentCondition + '</div><div id="weather-wind">' + currentWind + '</div><div id="weather-humidity">' + humidityChance + '</div></div></div><div id="weather-current-temperature"><div id="weather-temperature">' + currentTemp + '°</div></div></div><div id="weather-forecast-box"><div class="weather-forecast"><div>' + forecastDay0 + '</div><img src="' + forecastDay0Image + '" title="' + forecastDay0Condition + '"><div><span class="temperature-high">' + forecastDay0High + '°</span><br><span class="temperature-low">' + forecastDay0Low + '°</span></div></div><div class="weather-forecast"><div>' + forecastDay1 + '</div><img src="' + forecastDay1Image + '" title="' + forecastDay1Condition + '"><div><span class="temperature-high">' + forecastDay1High + '°</span><br><span class="temperature-low">' + forecastDay1Low + '°</span></div></div><div class="weather-forecast"><div>' + forecastDay2 + '</div><img src="' + forecastDay2Image + '" title="' + forecastDay2Condition + '"><div><span class="temperature-high">' + forecastDay2High + '°</span><br><span class="temperature-low">' + forecastDay2Low + '°</span></div></div><div class="weather-forecast last-forecast"><div>' + forecastDay3 + '</div><img src="' + forecastDay3Image + '" title="' + forecastDay3Condition + '"><div><span class="temperature-high">' + forecastDay3High + '°</span><br><span class="temperature-low">' + forecastDay3Low + '°</span></div></div></div><div id="weather-geolocation-permission" class="hidden">Using current location.</div></div>';
        if (currentTemp != undefined) {
            if (document.getElementsByClassName('Ee fP back')[0] != undefined)
                document.getElementsByClassName("Ee fP back")[0].innerHTML = text;
        }
    }, 10000);
}

currentWeather();