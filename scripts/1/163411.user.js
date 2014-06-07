// ==UserScript==
// @name       SMTJ Admin login
// @namespace  http://fl.raphael-go.com
// @version    0.1
// @description  enter something useful
// @match      http://smtj.mofcom.gov.cn/manager/login.do?l=50&p_index=310000
// @copyright  2012+, Speed Lao
// ==/UserScript==


var delegatioinVC = null;

function strip(s)
{
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

function checkDelegation()
{
    console.log(delegationVC.document);
    var ret = delegationVC.document.body.innerHTML;
    console.log("Checking delegation window...");
    console.log(ret);
    if (ret.length) {
        console.log("Result detected.");
    }
    else {
        setTimeout(checkDelegation, 500);
    }
}

function fetchVC()
{
    var param = [], url, arg;
    var cookies = document.cookie.split(";");
    for (var n=0; n<cookies.length; n++) {
        if (cookies[n].indexOf("JSESSIONID")!=-1 || cookies[n].indexOf("BIGipServershangmaotongji")!=-1) {
            param.push(strip(cookies[n]));
        }
    }
    url = "http://192.168.2.39/smtj2/vc.py?" + param.join("&");

    var djs = document.createElement("script");
    djs.type = "text/javascript";
    djs.src = url;
    document.getElementsByTagName("head")[0].appendChild(djs);
}

window.addEventListener("load", function() {
    document.getElementById("password").value = "";
    fetchVC();
}, false);