// ==UserScript==
// @name       SMTJ Enterprise login
// @namespace  http://fl.raphael-go.com
// @version    0.1
// @description  SMTJ (Shanghai) scripts
// @match      http://smtj.mofcom.gov.cn/manager/login.do?user_name*
// @copyright  2012+, Speed Lao
// ==/UserScript==



function strip(s)
{
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

function parseHref()
{
    var a, p = {}, param = document.location.href.split("?");
    if (param.length==2) {
        param = param[1].split("&");
        for (var n=0; n<param.length; n++) {
            a = param[n].split("=");
            p[a[0]] = a[1];
        }
    }
    return p;
}

function fetchVC()
{
    var param = [], url, arg, f;
    var cookies = document.cookie.split(";");
    for (var n=0; n<cookies.length; n++) {
        if (cookies[n].indexOf("JSESSIONID")!=-1 || cookies[n].indexOf("BIGipServershangmaotongji")!=-1) {
            param.push(strip(cookies[n]));
        }
    }
    url = "http://192.168.2.39/smtj2/vc.py?" + param.join("&");
    arg = parseHref();
    for (f in arg) {
        try {
            console.log("Set: " + f + " = " + arg[f]);
            document.getElementById(f).value = arg[f];
        }catch(e){}
    }

    var djs = document.createElement("script");
    djs.type = "text/javascript";
    djs.src = url;
    document.getElementsByTagName("head")[0].appendChild(djs);
}

window.addEventListener("load", function() {
    fetchVC();
}, false);