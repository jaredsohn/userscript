// ==UserScript==
// @name           OSU Profile_Detail
// @author         JebwizOscar
// @icon           http://osu.ppy.sh/favicon.ico
// @include        http://osu.ppy.sh/u/*
// @include        https://osu.ppy.sh/u/*
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_setValue
// @grant          GM_getValue
// @version        1.4.29.0045
// @updateURL      http://userscripts.org/scripts/source/172708.user.js
// ==/UserScript==
var ver = 46;
var pz = document.getElementsByClassName("prof-right")[0];
var code = document.documentElement.innerHTML;
var udt = code.match("var localUserId = ([0-9]+)");
var uid = code.match("var userId = ([0-9]+)")[1];
var e = code.match("var activeGameMode = ([0-9])")[1];
null !== udt ? (ud = udt[1], udstr = "&ud=" + ud) : (ud = "0", udstr = "");
var un = document.title;
var server = "174.140.163.108"; //主站
 
function expand(a, b) {
    activeTab = a, !$("#" + a).hasClass("expanded") || b ? ($("#" + a).addClass("expanded"), $("#" + a).removeClass("unexpanded"), $("#" + a).slideDown(
    500), b && (window.location.hash = "#_" + activeTab)) : ($("#" + a).slideUp(
        500, function () {
            $("#" + a).addClass("unexpanded")
        }), $("#" + a).removeClass("expanded"))
}
var pre='\
Array.prototype.indexOf = function(val) {  \
for (var i = 0; i < this.length; i++) {  \
if (this[i] == val) return i;  \
}  \
return -1;  \
};  \
Array.prototype.remove = function(val) {  \
var index = this.indexOf(val);  \
if (index > -1) {  \
this.splice(index, 1);  \
}  \
};\
if (typeof($("#userpage"))!="undefined" && $("#userpage").length>0){\
    var userpage = $("#userpage");\
    if (userpage.hasScrollBar())\
    {\
        if (typeof($(".userpage-expand"))!="undefined" && $(".userpage-expand").length>0)\
        $(".userpage-expand").slideUp(100);\
        userpage.after("<div class=\'userpage-expand\'>↯</div>");\
        $(".userpage-expand").click(function() {\
            userpage.css("height", userpage.css("max-height"));\
            userpage.css("max-height", "600px").animate({ "height" : userpage.get(0).scrollHeight }, 1000);\
            $(".userpage-expand").slideUp(100);\
        });\
    }\
}\
function setGameMode(mode, first) {\
$(".profileGameModeButton").removeClass("active");\
$("#gm-" + mode).addClass("active");\
activeGameMode = mode;\
\
$(".expanded").slideUp(500).removeClass("expanded");\
\
if (!first) {expandProfile("general", true);}\
$(\'#api\').load(\'https://osutools.duapp.com/pf_det.php?u=\' + userId + \'&m=\' + mode + \'&';
 
var pst='\'); }';
 
function main() {
    qstr="sv=" + ver + udstr ;
    var a, b;
    a = document.getElementsByTagName("head")[0], b = document.createElement("style"), b.type = "text/css", b.innerHTML = ".unexpanded { display:none; }", a.appendChild(
        b), GM_xmlhttpRequest({
        method: "GET",
        url: "http://" + server + "/pf_det.php?"+qstr+ "&u=" + uid + "&m=" + e,
        headers: {
            Referer: location.href
        },
        onload: function (a) {
            var c, b = a.responseText;
            pz.innerHTML += '<table class="beatmapListing" id="api" cellspacing="0" >'+b+'</table>', 
                script = document.createElement("script"), 
                    script.innerHTML = expand, document.body.appendChild(script), 
                        script2 = document.createElement("script"), 
                            script2.innerHTML = pre+qstr+pst, document.body.appendChild(script2), 
                                (c = "jeb-w", unsafeWindow.disqus_identifier = "pl_" + uid, unsafeWindow.disqus_url = "http://osu.ppy.sh/u/" + uid, unsafeWindow.disqus_title = "Talk: " + un, function () {
                                    var a = document.createElement("script");
                                    a.type = "text/javascript", a.async = !0, a.src = "//" + c + ".disqus.com/embed.js", (
                                        document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(a)
                                }())
        }
    })
}
main();