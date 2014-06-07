// ==UserScript==
// @name           4chan GET Modified
// @namespace      HERPDERP
// @include        http*://boards.4chan.org/*
// @version        0.9.2
// @updateURL      http://userscripts.org/scripts/source/117715.user.js
// @homepage       http://userscripts.org/scripts/show/117715
// ==/UserScript==
var first = true, n = 0, l = 0, m = 0;
var offset = 1; //how early it starts posting (default is 1, or 1 post before)
var sticky = true; //posting box follows you as you scroll down the page
var postrange = 20; //number of posts to use for post rate calc

function verbose() {
    if (document.getElementsByName("getstatus")[0].innerHTML == "Waiting for: " + n + "...")
        document.getElementsByName("getstatus")[0].innerHTML = "Waiting for: " + n + ".";
    else if (document.getElementsByName("getstatus")[0].innerHTML == "Waiting for: " + n + ".")
        document.getElementsByName("getstatus")[0].innerHTML = "Waiting for: " + n + "..";
    else
        document.getElementsByName("getstatus")[0].innerHTML = "Waiting for: " + n + "...";
    }

function qrcheck() {
    if (n == 0) return;
    verbose();
    var k = first ? n : (n-offset);
    GM_xmlhttpRequest({
        method: "HEAD",
        url: "http://sys.4chan.org" + location.pathname.match(/\/[^\/]+\//)[0] + "imgboard.php?res=" + k,
        onload: function(response) {
            if (n == 0) return;
            if (response.status == 200) {
                if (first) {
                    alert(n + " passed");
                    document.getElementsByName("txtpostnumber")[0].value = n;
                    document.getElementsByName("txtpostnumber")[0].focus();
                    document.getElementsByName("getstatus")[0].innerHTML = "Ready...";
                    n = 0;
                } else {
                    document.getElementsByName("qrsubmit")[0].click();
                    document.getElementsByName("getstatus")[0].innerHTML = "Ready...";
                    document.getElementsByName("txtpostnumber")[0].value = "";
                }
            } else {
                first = false;
                qrcheck();
            }
        }
    });
}

function postrates() {
    if (n == 0) return;
    verbose();
    GM_xmlhttpRequest({
        method: "HEAD",
        url: "http://sys.4chan.org" + location.pathname.match(/\/[^\/]+\//)[0] + "imgboard.php?res=" + n,
        onload: function(response) {
            if (n == 0) return;
            if (response.status == 200) {
                if (first) {
                    alert(n + " passed");
                    document.getElementsByName("txtpostnumber")[0].value = n;
                    document.getElementsByName("txtpostnumber")[0].focus();
                    document.getElementsByName("getstatus")[0].innerHTML = "Ready...";
                    n = 0;
                } else {
                    if (l == 0) {
                        l = (new Date()).getTime() / 1000;
                        n = (n + postrange);
                        document.getElementsByName("getstatus")[0].innerHTML = "Waiting for: " + n + "...";
                        postrates();
                    }
                    else {
                    m = Math.round((new Date()).getTime() / 1000 - l);
                    alert(postrange + " posts in " + m + " seconds. Average post time: " + Math.round((postrange / m)*100)/100 + "/s");
                    document.getElementsByName("getstatus")[0].innerHTML = "Ready...";
                    }
                }
            } else {
                first = false;
                postrates();
            }
        }
    });
}

function setup() {
getbox = window.document.createElement('div');
getbox.innerHTML = "<html> <head> <title></title> </head> <body> <table border='0' cellpadding='0' cellspacing='1' id='getbox' style='width: 200px;'> <tbody> <tr> <td colspan='2'> <label name='getstatus'>Ready...</label></td> </tr> <tr> <td colspan='2' style='text-align: center;'> <input name='txtpostnumber' size='24' style='width: 100%' type='text' /></td> </tr> <tr> <td style='text-align: center; width: 32%;'> <input name='btqrpost' style='width: 100%' type='button' value='Post' /></td> <td style='text-align: center; width: 36%;'> <input name='btpostrate' style='width: 100%' type='button' value='Post Rate' /></td> </tr> </tbody> </table> <p> &nbsp;</p> </body> </html>";
if (sticky == true) {
    getbox.style.position = "fixed";
}
else {
    getbox.style.position = "absolute";
}
getbox.style.right = "20px";
getbox.style.top = "39px";
window.document.getElementsByTagName("body")[0].appendChild(getbox);

document.getElementsByName("btqrpost")[0].addEventListener("click", function(e) {
    if (document.getElementById("qr")) {
        var inputs = document.getElementsByTagName('input');
            for (var j=0; j < inputs.length; j++)
            {
                inp = inputs[j];
                if (inp.getAttribute('type') == 'submit' && inp.getAttribute('value') == "Submit" && inp.getAttribute('id') != "com_submit")
                {
                   inputs[j].name = "qr­submit"
                }
            }
        first = true;
        document.getElementsByName("txtpostnumber")[0].value = document.getElementsByName("txtpostnumber")[0].value.replace(/[^0123456789]/g, "");
        n = parseInt(document.getElementsByName("txtpostnumber")[0].value);
        if (!isNaN(n)) {
            document.getElementsByName("getstatus")[0].innerHTML = "Waiting for: " + n + "...";
            qrcheck();
        }
        else
            alert("Invalid Number");
    }
    else
        alert("Quick Reply is not Open");
}, false);

document.getElementsByName("btpostrate")[0].addEventListener("click", function(e) {
    document.getElementsByName("txtpostnumber")[0].value = document.getElementsByName("txtpostnumber")[0].value.replace(/[^0123456789]/g, "");
    n = parseInt(document.getElementsByName("txtpostnumber")[0].value);
    if (!isNaN(n)) {
        document.getElementsByName("txtpostnumber")[0].value = "";
        document.getElementsByName("getstatus")[0].innerHTML = "Waiting for: " + n + "...";
        l = 0;
        postrates();
    }
    else
        alert("Invalid Number");
}, false);

}

setup();