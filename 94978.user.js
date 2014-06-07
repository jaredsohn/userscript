// ==UserScript==
// @name           P2YT Cheap Ads Auto Clicker by NagaSux
// @namespace      www.dollarz.cz.cc
// @description    Just One click for all your P2TY Cheap Ads
// @include        *paid2youtube*
// @include        *24.255.10.108:800*
// @include        *p2yt.dyndns.info:800*

// @copyright      www.dollarz.cz.cc
// ==/UserScript==

var force_referal_to = "admin";

waiting_time = 30;

var range_to = 50;
var strip = function (s) {
    var a = String(s).split("</td>").join("\r"),
        reg = /<td\s*width=['"]?100\%['"]?\s*>([^\r]+)\r/,
        match = a.match(reg),
        search = a.search(reg),
        out = [],
        i = 0,
        tmp;
    while (match) {
        a = a.substr(search + match[0].length, a.length);
        out[i] = match[1].replace(/\s*<script[^>]+>[\S\s]+<\/script>\s*/, "");
        out[i] = out[i].replace(/<img[^>]+>/, "");
        i++;
        match = a.match(reg);
        search = a.search(reg)
    };
    return (out.length ? "<table><tr><td>" + out.join("</td><td>") + "</td></tr></table>" : "NO MATCH")
},
    autosurf = false;

if(window.location.href.search('/cheap_ads') > 0 || window.location.href.search('/w') > 0) {
    var waiting_time = 5;
}

if (window.location.href.search('/cheap_ads') > 0 || window.location.href.search('/w') > 0) {
    if (1) {
        var A = document.getElementsByTagName("a"),
            i, html = "",
            //change the table node number
            timer, table = document.getElementsByTagName('table')[1],
            robot = document.createElement('div'),
            urls = [],
            current = 0,
            msg, tmr, load = function () {
                clearInterval(timer);
                timer = null;
                if (!urls[current]) {
                    if (typeof autosurf == 'function') autosurf();
                    return
                };
                var g = new XMLHttpRequest();
                g.onreadystatechange = function () {
                    try {
                        if (g.readyState == 4) {
                            if (g.status == 200) {
                                if (String(g.responseText).match(/You have already viewed this advertisement/)) {
                                    msg.innerHTML = "Advertise is already open, is placed another advertisement ...";
                                    urls[current].parentNode.parentNode.parentNode.innerHTML = "OPENED";
                                    current++;
                                    timer = setInterval(load, 1000)
                                } else {
                                    var b = String(g.responseText);
                                    var c = String(b.match(/code = "[\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w][\w]"/));
                                    var d = String(b.match(/ad= "[\w][\w][\w][\w][\w]"/));
                                    d = d.split(' ').join('');
                                    d = d.split('"').join('');
                                    c = c.split(' ').join('');
                                    c = c.split('"').join('');
                                    var f = ['success4?', d, '&', c, '&verify=1'].join('');
                                    var j = waiting_time,
                                        validate = function () {
                                            var a = new XMLHttpRequest();
                                            a.onreadystatechange = function () {
                                                try {
                                                    if (a.readyState == 4) {
                                                        if (a.status == 200) {
                                                            msg.innerHTML = "Advertise confirmed loading another advertisement ...";
                                                            urls[current].parentNode.parentNode.innerHTML = "VALIDATED";
                                                            current++;
                                                            timer = setInterval(load, 1000)
                                                        } else {
                                                            msg.innerHTML = "Connection error, try again ...";
                                                            validate()
                                                        }
                                                    }
                                                } catch (e) {
                                                    msg.innerHTML = "Verification error, try again ...";
                                                    validate()
                                                }
                                            };
                                            msg.innerHTML = "Confirm that...";
                                            a.open("GET", f, true);
                                            a.send(null)
                                        };
                                    tmr = setInterval(function () {
                                        if (j < 0) {
                                            validate();
                                            clearInterval(tmr);
                                            tmr = null;
                                            return
                                        };
                                        msg.innerHTML = "Advertising Close handled, left to wait " + j + " seconds...";
                                        j--
                                    }, 1000)
                                }
                            } else {
                                msg.innerHTML = "Loading error, try again ...";
                                g.abort();
                                timer = setInterval(load, 1000)
                            }
                        }
                    } catch (e) {
                        msg.innerHTML = "Loading error, try again ...";
                        g.abort();
                        timer = setInterval(load, 1000)
                    }
                };
                msg.innerHTML = "Loading Advertisment <b id='JustOneClick-current'>\"" + (urls[current].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML) + "\"</b>...<br /><div id='JustOneClick-loading'></div>";
                g.open("GET", urls[current].href, true);
                g.send(null)
            };
        for (i = 0; i < A.length; i++) {
            try {
                if (A[i].href.search('/view4') > 0 && A[i].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML.replace(/^\s*(.*?)\s*$/,"$1").length > 6) urls[urls.length] = A[i]
            } catch (e) {}
        };
        robot.id = "JustOneClick-container";
        robot.align = "center";
        html = "<style>";
        html += "#JustOneClick-container *{font-family:arial;color:black;font-weight:bold;text-decoration:none}";
        html += "#JustOneClick-container{display:block}";
        html += "#JustOneClick,#JustOneClick-title,#JustOneClick-container a.button{-moz-border-radius:3px;-webkit-border-radius:3px;-khtml-border-radius:3px;border-radius:3px;border: 1px solid #888}";
        html += "#JustOneClick-container a.button{padding:10px;color:#000;background:#ccc}";
        html += "#JustOneClick-container a.button:hover{color:#fff;background:#333}";
        html += "#JustOneClick{padding:2px;display:block;width:600px;background:#fff;text-align:left}";
        html += "#JustOneClick-title{display:block;padding:5px;background:#666;color:#fff}";
        html += "#JustOneClick-msg{line-height:2em}";
        html += "</style>";
        html += "<div id='JustOneClick'><div id='JustOneClick-title'>eXtreme Paid2YouTube Cheap Ads Hack by NagaSux</div><br /><div id='JustOneClick-msg' align=center>";
        html += "<b style='font-size:15px'>Warning / Disclaimer</b><br />This program is meant for Educational Purposes Only. We do not take responsibility of what you do with it. By using this program you agree to abide to this.<br>Donate the developer of this script by joining the sponsored sites at www.dollarz.cz.cc. This will help developer to continue his work.<br><a href='http://www.dollarz.cz.cc' target='_blank'>&copy; www.dollarz.cz.cc</a>";
        html += "</div><br />";
        html += "<center>" + (urls.length ? "<a href='javascript:;' class='button' id='adsclick'>Open All Ads (" + urls.length + ")</a>" : "<a href='javascript:;' class='button'>No Advertisments</a>") + "&nbsp;<a href='javascript:;' class='button' id='silversurfer'>Auto Surf</a>&nbsp;<a href='javascript:;' class='button' id='whatsnew'>Whats New?</a></center><br />";
        html += "</div></div>";
        robot.innerHTML = html;
if(urls.length > 0)
{
        table.parentNode.insertBefore(robot, table);
}
        msg = document.getElementById("JustOneClick-msg");
        if (urls.length) {
            document.getElementById("adsclick").addEventListener('click', function () {
                autosurf = function () {
                    msg.innerHTML = "Done !";
                    //alert(msg.innerHTML)
			window.location.reload();
                };
                this.parentNode.style.display = 'none';
                timer = setInterval(load, 1000)
            }, false)
        };
        document.getElementById('whatsnew').addEventListener('click', function () {
            var a = "* Improved auto click and approval\n";
            a += "* Auto surf mode\n";
            a += "* Cheat Check Skipped\n";
            a += "* Third Release";
            alert(a)
        }, false);
        document.getElementById('silversurfer').addEventListener('click', function () {
            this.parentNode.style.display = 'none';
            msg.innerHTML = "Auto Surf mode activated...";
            var b = document.createElement('div');
            document.body.appendChild(b);
            b.style.display = 'none';
            autosurf = function () {
                urls = [];
                current = 0;
                msg.innerHTML = "Check for New Ads...";
                var a = Math.ceil(Math.random() * range_to * 60),
                    j = a,
                    tm, ajx, reloadads = function () {
                        msg.innerHTML = "Check to see if there is any new ad...";
                        ajx = new XMLHttpRequest();
                        ajx.onreadystatechange = function () {
                            try {
                                if (ajx.readyState == 4) {
                                    if (ajx.status == 200) {
                                        msg.innerHTML = "Check to see if there is any new ad...";
                                        b.innerHTML = strip(ajx.responseText);
                                        A = b.getElementsByTagName('a');
                                        for (i = 0; i < A.length; i++) {
                                            try {
                                                if (A[i].href.match(/cks\.php\?k\=[0-9A-F]+\&cdk\=flase/) && A[i].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].className == 'azul') urls[urls.length] = A[i]
                                            } catch (e) {}
                                        };
                                        if (urls.length) {
                                            msg.innerHTML = urls.length + " advertisment";
                                            timer = setInterval(load, 1000)
                                        } else {
                                            msg.innerHTML = "Advertisments found";
                                            autosurf()
                                        }
                                    } else {
                                        msg.innerHTML = "Loading error, try again ...";
                                        reloadads()
                                    }
                                }
                            } catch (e) {
                                msg.innerHTML = "Loading error, try again ...";
                                reloadads()
                            }
                        };
                        ajx.open('GET', 'e.php', true);
                        ajx.send(null)
                    };
                tm = setInterval(function () {
                    if (j < 0) {
                        clearInterval(tm);
                        tm = null;
                        msg.innerHTML = "Completed Time and Learning, donor ...";
                        reloadads()
                    } else {
                        msg.innerHTML = "Please wait " + j + " for checking...";
                        j--
                    }
                }, 1000)
            };
            if (urls.length) timer = setInterval(load, 1000)
            else autosurf()
        }, false)
    }
};