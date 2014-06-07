// ==UserScript==
// @name           DataLife Spam
// @description    Comment spam in DLE
// @author         Godina Nicolae
// @include        http://*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version        1.0
// ==/UserScript==

function SetCookie(e, t, n) {
    var r = new Date;
    var i = new Date;
    if (n == null || n == 0) n = 1;
    i.setTime(r.getTime() + 36e5 * 1 * n);
    document.cookie = e + "=" + escape(t) + ";expires=" + i.toGMTString()
}
function getCookie(e) {
    var t, n, r, i = document.cookie.split(";");
    for (t = 0; t < i.length; t++) {
        n = i[t].substr(0, i[t].indexOf("="));
        r = i[t].substr(i[t].indexOf("=") + 1);
        n = n.replace(/^\s+|\s+$/g, "");
        if (n == e) {
            return unescape(r)
        }
    }
}
function randomString() {
    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var t = 8;
    var n = "";
    for (var r = 0; r < t; r++) {
        var i = Math.floor(Math.random() * e.length);
        n += e.substring(i, i + 1)
    }
    return n
}
function Complete(e) {
    $("#name").val("U" + e);
    $('input[name="password1"]').val("P" + e);
    $('input[name="password2"]').val("P" + e);
    $('input[name="email"]').val(e + "@gmail.com")
}
function EsteLogat() {
    var e = $('a[href="http://' + window.location.host + '/index.php?action=logout"]').html();
    console.log(e);
    return !(typeof e == "undefined" || e === null)
}
function Register() {
    if (window.location.search != "?do=register") {
        window.location.href = "/index.php?do=register"
    } else switch (getCookie("SPM")) {
        case "1":
            $.post("/index.php?do=register", {
                "do": "register",
                dle_rules_accept: "yes"
            }, function (e) {
                SetCookie("SPM", "2", 1);
                window.location.reload()
            });
            break;
        case "2":
            Complete(randomString());
            SetCookie("SPM", "3", 1);
            alert("Completeaza CAPCHA si apasa SUBMIT/ENTER");
            break;
        case "3":
            SetCookie("SPM", "4", 1);
            window.location.reload();
            break;
        default:
            console.log("Final Step!");
            break
    }
}
function CautaUrl() {
    var e;
    $('#dle-content a[href*="' + window.location.host + '"]').each(function (t) {
        var n = $(this).attr("href").match(/[\/](\d+)[-]/);
        var r = $(this).attr("href").match(/[newsid=](\d+)/);
        if (n) {
            e = n[1];
            return false
        }
        if (r) {
            e = r[1];
            return false
        }
    });
    return e
}
function StartSP() {
    if (start == "true") {
        SetCookie("SPMS", "false", 1)
    } else {
        SetCookie("SPMS", "true", 1);
        var e = prompt("Introduceti mesajul pentru spam", "");
        if (e != null && e.length > 15) {
            SetCookie("SPMESSAGE", e, 1)
        } else {
            alert("Lungimea minima 15 caractere!");
            StartSP()
        }
    }
    SetCookie("SPM", "1", 1);
    window.location.reload()
}
function Run() {
    start = getCookie("SPMS");
    if (start == "true") {
        $("#SPS").text("Startat!");
        $("#SPS").css("color", "green");
        $("#SPO").text("STOP")
    } else {
        $("#SPS").text("Oprit!");
        $("#SPS").css("color", "red");
        $("#SPO").text("START if is DLE")
    }
    if (start == "true") if (EsteLogat()) {
        if (window.location.search.match(/[newsid=](\d+)/)) {
            Post()
        } else {
            var e = CautaUrl();
            SetCookie("SPMURL", e, 1);
            window.location.href = "/index.php?newsid=" + e
        }
    } else {
        Register()
    }
}
function ToNextPage() {
    var e = parseInt(getCookie("SPMURL")) - 1;
    if (e > 0) {
        SetCookie("SPMURL", e, 1);
        window.location.href = "/index.php?newsid=" + e
    } else {
        alert("Final!");
        start = false;
        SetCookie("SPMS", "false", 1)
    }
}
function Post() {
    $('textarea[name="comments"]').text(getCookie("SPMESSAGE"));
    $('button[name="submit"]').click();
    $('form[name="dle-comments-form"] input[name="submit"]').click();
    setTimeout(function () {
        ToNextPage()
    }, 3e4)
}
jQuery(document).ready(function (e) {
    e("body").prepend('<div id="SP"><style></style><center><b>DLE SPAM v1.0</b></br><span id="SPS"> </span><br/><button id="SPO"></button></center></div>');
    e("#SP style").text("#SP { position:fixed; z-index:9999; bottom:10px; right:10px; background:white; border:1px #888 solid; padding:5px; width:130px;height:60px;}");
    e("#SPO").click(function () {
        StartSP()
    });
    var t;
    Run()
})