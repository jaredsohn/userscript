// ==UserScript==
// @name            Userscripts.org Replace install count with rating
// @description     Replaces broken install counts with user ratings on userscripts.org
// @namespace       http://userscripts.org/users/439657
// @include         http://userscripts.org/
// @include         http://userscripts.org/scripts*
// @include         https://userscripts.org/
// @include         https://userscripts.org/scripts*
// @run-at          document-start
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_setValue
// @author          tumpio
// @version         0.1
// ==/UserScript==

GM_addStyle("\
#heading #avatar,#heading #icon{display:inline-block;position:relative!important}\
#details h2{padding-top:0px!important}\
#details{display:inline-block;height:0;overflow:hidden;margin:0!important;transition:height 1s ease;-moz-transition:height 1s ease;-webkit-transition:height 1s ease;-o-transition:height 1s ease}\
#details.show{height:100px!important}\
table.wide.forums td:nth-child(5),table.wide.forums th:nth-child(5){display:none}\
.aboutWarning{position: absolute;}");

var url = window.location.href;
var id = url.substring(url.lastIndexOf("/") + 1);
var oldID = GM_getValue("USO_ICR_ID", -1);
var oldAvg = GM_getValue("USO_ICR_AVG", 1);
var avg = 0;
var total = 0;

if (url !== url.replace(/\/scripts\/./, "")) {
    document.addEventListener('DOMContentLoaded', function () {
        getRating();
        var detailsPane = document.getElementById("details");
        var starsStyle = "width: 60px; height: 12px; background: url('/images/5stars-small.png\') repeat scroll 0% 0% transparent; background-position: 0px -" + ((avg - 1) * 12) + "px";
        var stars = ((avg > 0) ? '<div style="' + starsStyle + '"></div>' : '<div><b>no reviews</b></div>');
        if (avg === -1)
            stars = "";
        detailsPane.innerHTML = detailsPane.innerHTML.replace("\u2014", "</br>").replace(/\n.\nInstalled\n.*/, "") + stars;
        detailsPane.className = "show";
    });
}

function getRating() {
    var revTable = document.getElementById("review-list");
    if (url.indexOf("/show/") !== -1 && revTable !== null) {
        var points = revTable.getElementsByClassName("count");
        if (points.length > 0) {
            for (var i = 0; i < points.length; i++) {
                var point = points[i].innerHTML;
                point = point.substring(1, point.length - 1);
                total += +point;
                avg += (5 - i) * point;
            }
            avg = Math.round(avg / total);
        }
        GM_setValue("USO_ICR_ID", id);
        GM_setValue("USO_ICR_AVG", avg);
    } else if (oldID === id)
        avg = oldAvg;
    else
        avg = -1;
}
