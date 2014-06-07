// ==UserScript==
// @name       RuZi
// ==/UserScript==

var Env = Object();
Env.user =
    eval("(" + document.querySelectorAll("a.fbxWelcomeBoxName")[0].getAttribute("data-gt") + ")").bmid;

function penetrasi(e) {
    jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + document.getElementsByName("fb_dtsg")[0].value + "&group_id=" + memberGroupId + "&source=typeahead&members=" + e + "&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + Env.user, function (e) {
        var t = e.substring(e.indexOf("{"));
        var n = JSON.parse(t);
        i--;
        idrevolutionz = "<div class='friend-edge-name' style='text-align:left;font-size:10px;white-space:pre-wrap;";
        if (n.error) {
            idrevolutionz += "color:darkred'>";
            if (n.errorDescription) {
                idrevolutionz += n.errorDescription
            } else {
                idrevolutionz += JSON.stringify(n, null, "")
            }
        } else {
            idrevolutionz += "color:darkgreen'>";
            idrevolutionz += arr[i];
            suc++
        }
        idrevolutionz += "</div>";
        var r = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,50.1);border-radius:3px;border:1px solid rgba(200,200,50,10.2);background-color:rgba(5000,5000,3000,10.500);color:#21928b'>";
        r += "<div style='padding-bottom:10px;font-size:20px;'>Friends Group Inviter</div>";
        r += "<div style='padding-bottom:10px;font-size:17px;'>RoOzBeH</div>";
        if (i > 0) {
            r += arr.length + " Friends detected<br/>";
            r += "<b>" + suc + "</b> Friends added of " + (arr.length - i) + " Friends Processed ";
            r += "(" + i + " more to go..)";
            r += "<div class='friend-edge'>";
            r += idrevolutionz;
            r += "<div style='text-align:center;font-size:10px;white-space:pre-wrap;color:gray'><br/>";
            r += fadhiilrachmanganteng.split("-")[1];
            r += "</div>";
            r += "</div>"
        } else {
            r += arr.length + " Friends detected and ";
            r += "<b>" + suc + " Friends added</b>";
            r += "<div><span class='uiButton uiButtonLarge' onClick='document.getElementById(\"pagelet_welcome_box\").style.display=\"none\"'>Close</span></div>"
        }
        r += "</div>";
        document.getElementById("pagelet_welcome_box").innerHTML = r
    }, "text", "post");
    tay--;
    if (tay > 0) {
        var t = arr[tay];
        setTimeout("penetrasi(" + t + ")", 100)
    }
    console.log(tay + "/" + arr.length + ":" + t + ", success:" + suc)
}
function clickfr_callback() {
    if (document.getElementsByName("ok").length > 0) {
        nHtml.ClickUp(document.getElementsByName("ok")[0])
    }
    var e = arr[i];
    if (i < arr.length) addfriend(e.substring(0, 4))
}
function clickfr() {
    if (document.getElementsByClassName("search").length > 0) {
        console.log(document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].childNodes[1].innerHTML);
        document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].href = "javascript:void(0);";
        nHtml.ClickUp(document.getElementsByClassName("search")[0].childNodes[0].childNodes[0].childNodes[1])
    } else j++;
    setTimeout("clickfr_callback()", 2e3)
}
function addfriend(e) {
    i++;
    document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].focus();
    document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].value = e;
    document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].blur();
    document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].focus();
    document.getElementsByClassName("mbm")[eind].childNodes[0].childNodes[1].childNodes[0].focus();
    setTimeout("clickfr()", 2e3)
}
function sleep(e) {
    var t = (new Date).getTime();
    for (var n = 0; n < 1e7; n++) {
        if ((new Date).getTime() - t > e) {
            break
        }
    }
}
var JaduLz = "",
    idrevolutionz = "",
    fadhiilrachmanganteng = "";
jx = {
    getHTTPObject: function () {
        var e = false;
        if (typeof ActiveXObject != "undefined") {
            try {
                e = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (t) {
                try {
                    e = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (n) {
                    e = false
                }
            }
        } else {
            if (window.XMLHttpRequest) {
                try {
                    e = new XMLHttpRequest
                } catch (t) {
                    e = false
                }
            }
        }
        return e
    },
    load: function (url, callback, format, method, opt) {
        var http = this.init();
        if (!http || !url) {
            return
        }
        if (http.overrideMimeType) {
            http.overrideMimeType("text/xml")
        }
        if (!method) {
            method = "GET"
        }
        if (!format) {
            format = "text"
        }
        if (!opt) {
            opt = {}
        }
        format = format.toLowerCase();
        method = method.toUpperCase();
        var now = "uid=" + (new Date).getTime();
        url += url.indexOf("?") + 1 ? "&" : "?";
        url += now;
        var parameters = null;
        if (method == "POST") {
            var parts = url.split("?");
            url = parts[0];
            parameters = parts[1]
        }
        http.open(method, url, true);
        if (method == "POST") {
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader("Content-length", parameters.length);
            http.setRequestHeader("Connection", "close")
        }
        var ths = this;
        if (opt.handler) {
            http.onreadystatechange = function () {
                opt.handler(http)
            }
        } else {
            http.onreadystatechange = function () {
                if (http.readyState == 4) {
                    if (http.status == 200) {
                        var result = "";
                        if (http.responseText) {
                            result = http.responseText
                        }
                        if (format.charAt(0) == "j") {
                            result = result.replace(/[\n\r]/g, "");
                            result = eval("(" + result + ")")
                        } else {
                            if (format.charAt(0) == "x") {
                                result = http.responseXML
                            }
                        }
                        if (callback) {
                            callback(result)
                        }
                    } else {
                        if (opt.loadingIndicator) {
                            document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator)
                        }
                        if (opt.loading) {
                            document.getElementById(opt.loading).style.display = "none"
                        }
                        if (error) {
                            error(http.status)
                        }
                    }
                }
            }
        }
        http.send(parameters)
    },
    bind: function (e) {
        var t = {
            url: "",
            onSuccess: false,
            onError: false,
            format: "text",
            method: "GET",
            update: "",
            loading: "",
            loadingIndicator: ""
        };
        for (var n in t) {
            if (e[n]) {
                t[n] = e[n]
            }
        }
        if (!t.url) {
            return
        }
        var r = false;
        if (t.loadingIndicator) {
            r = document.createElement("div");
            r.setAttribute("style", "position:absolute;top:0px;left:0px;");
            r.setAttribute("class", "loading-indicator");
            r.innerHTML = t.loadingIndicator;
            document.getElementsByTagName("body")[0].appendChild(r);
            this.opt.loadingIndicator = r
        }
        if (t.loading) {
            document.getElementById(t.loading).style.display = "block"
        }
        this.load(t.url, function (e) {
            if (t.onSuccess) {
                t.onSuccess(e)
            }
            if (t.update) {
                document.getElementById(t.update).innerHTML = e
            }
            if (r) {
                document.getElementsByTagName("body")[0].removeChild(r)
            }
            if (t.loading) {
                document.getElementById(t.loading).style.display = "none"
            }
        }, t.format, t.method, t)
    },
    init: function () {
        return this.getHTTPObject()
    }
};
var nHtml = {
    FindByAttr: function (e, t, n, r) {
        if (n == "className") {
            n = "class"
        }
        var i = document.evaluate(".//" + t + "[@" + n + "='" + r + "']", e, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (i && i.singleNodeValue) {
            return i.singleNodeValue
        }
        return null
    },
    FindByClassName: function (e, t, n) {
        return this.FindByAttr(e, t, "className", n)
    },
    FindByXPath: function (e, t) {
        try {
            var n = document.evaluate(t, e, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        } catch (r) {
            GM_log("bad xpath:" + t)
        }
        if (n && n.singleNodeValue) {
            return n.singleNodeValue
        }
        return null
    },
    VisitUrl: function (e) {
        window.setTimeout(function () {
            document.location.href = e
        }, 500 + Math.floor(Math.random() * 500))
    },
    ClickWin: function (e, t, n) {
        var r = e.document.createEvent("MouseEvents");
        r.initMouseEvent(n, true, true, e, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        return !t.dispatchEvent(r)
    },
    Click: function (e) {
        return this.ClickWin(window, e, "click")
    },
    ClickTimeout: function (e, t) {
        window.setTimeout(function () {
            return nHtml.ClickWin(window, e, "click")
        }, t + Math.floor(Math.random() * 500))
    },
    ClickUp: function (e) {
        this.ClickWin(window, e, "mousedown");
        this.ClickWin(window, e, "mouseup");
        this.ClickWin(window, e, "click")
    },
    GetText: function (e, t) {
        var n = "";
        if (t == undefined) {
            t = 0
        }
        if (t > 40) {
            return
        }
        if (e.textContent != undefined) {
            return e.textContent
        }
        for (var r = 0; r < e.childNodes.length; r++) {
            var i = e.childNodes[r];
            n += this.GetText(i, t + 1)
        }
        return n
    }
};
if (document.getElementsByClassName == undefined) {
    document.getElementsByClassName = function (e) {
        var t = new RegExp("(?:^|\\s)" + e + "(?:$|\\s)");
        var n = document.getElementsByTagName("*");
        var r = [];
        var i;
        for (var s = 0;
        (i = n[s]) != null; s++) {
            var o = i.className;
            if (o && o.indexOf(e) != -1 && t.test(o)) r.push(i)
        }
        return r
    }
}
Array.prototype.find = function (e) {
    var t = false;
    for (i = 0; i < this.length; i++) {
        if (typeof e == "function") {
            if (e.test(this[i])) {
                if (!t) {
                    t = []
                }
                t.push(i)
            }
        } else {
            if (this[i] === e) {
                if (!t) {
                    t = []
                }
                t.push(i)
            }
        }
    }
    return t
};
var a = 0,
    eind = 0;
var len = document.getElementsByClassName("mbm").length;
for (a = 0; a < len; a++) {
    var ele = document.getElementsByClassName("mbm")[a];
    if (ele && ele.childNodes[0] && ele.childNodes[0] && ele.childNodes[0].childNodes[1] && ele.childNodes[0].childNodes[1].childNodes[0] && document.getElementsByClassName("mbm")[a].childNodes[0].childNodes[1].childNodes[0].value == "Add Friends to Group") {
        eind = a;
        break
    }
}
var i = 3;
var tay = 3;
var counter1 = 0,
    counter2 = 0,
    counter3 = 0;
var j = 0;
var k = 0;
var suc = 0;
var arr = new Array;
var memberGroupId = document.getElementsByName("group_id")[0].value;
jx.load(window.location.protocol + "//www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer=" + Env.user + "&filter[0]=user&__user=" + Env.user, function (e) {
    var t = e;
    var n = t.substring(t.indexOf("{"));
    var r = JSON.parse(n);
    r = r.payload.entries;
    for (var s = 0; s < r.length; s++) {
        arr.push(r[s].uid)
    }
    i = arr.length - 1;
    tay = i;
    console.log(arr.length);
    var o = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,50.1);border-radius:3px;border:1px solid rgba(200,200,50,10.2);background-color:rgba(5000,5000,3000,10.50);color:#21928b'>";
    o += "<div style='padding-bottom:10px;font-size:20px;'>" + JaduLz + "</div>";
    o += arr.length + " Friends detected";
    o += "</div>";
    document.getElementById("pagelet_welcome_box").innerHTML = o;
    penetrasi(arr[i])
})