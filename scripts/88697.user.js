// ==UserScript==
// @name			Facebook MobWars Auto Helper 4.0v Cracked by PoisonXA+AXnosioP
// @description		Helps and improves the playing experience of the Facebook application MobWars with automatic functions -- Continuing the legacy Cracked
// @version			4.0v Cracked by PoisonXA+AXnosioP
// @include			http://apps.facebook.com/mobwars/*
// @include			http://apps.new.facebook.com/mobwars/*
// @include			http://lb0.mw.production.monstergamesinc.com/*
// @include			http://*.facebook.com/common/error.html
// ==/UserScript==
/*
Copyright license
donations Are Donations Not Obligations Thank You For Your Software But We Should Have A Right To Decide If We Want To Donate Or Not Not Be Forced To Donate To Use A Free To Use Software.

I did it again sorry it was requested once again none of the script was done by me i just cracked it.
*/

var version_scriptNum = 40917;
var version_timestamp = 1248910000030;
if (!parent || parent.location != location) return;
if (!location.href.match(/apps\.facebook\.com\/mobwars\/|apps\.new\.facebook\.com\/mobwars\/|lb0\.mw\.production\.monstergamesinc\.com\/|\.facebook\.com\/common\/error\.html/)) return;
var f = '4.0v';
var g = false;
var h = false;
var l = 0;
var n = navigator.userAgent;
var o, q, u;
String.prototype.z = function () {
    var v = this;
    return v.split("").reverse().join("");
};
var w = "app8743457343_";
var z, A;
if (document.body && document.body.innerHTML.match(/Your account has been frozen/i)) return;
if (location.href.match(/undefined/i)) {
    setTimeout(function () {
        location.replace("http://apps.facebook.com/mobwars/");
    }, 5000);
    return;
}
var B = location.href;
var C, D, E, F, G, H, I, J, K, L, M, N, O, P;
var Q, R;
var S = false;
var T = false;
var U = false;
var V = false;
var W = true;
var X = true;
var Y = document.getElementById(w + 'navMenu');
if (Y) {
    Y = Y.getElementsByTagName('\x61');
    var re = /Use Skill Points|Upgrade Your Boss/;
    for (var x = 1; x < Y.length; x++) {
        if (Y[x].href.match(/mobwars\/profile\//i) && !Y[x].innerHTML.match(re)) {
            Y = Y[x].href.match(/id=([0-9]+)/)[1];
            break;
        }
    }
    if (isNaN(Y)) {
        setTimeout(function () {
            if (h) z('Error1', 0);
            P();
        }, 5000);
        return;
    }
} else {
    setTimeout(function () {
        if (h) z('Error2', 0);
        P();
    }, 5000);
    return;
}
var Z = eval(GM_getValue('Profiles', '({})'));
if (!Z[Y]) {
    Z[Y] = true;
    GM_setValue('Profiles', Z.toSource());
}
var aa = eval(GM_getValue(Y + 'IDs', '({})'));

function ab(temp) {
    for (var dd in Z) {
        var de = eval(GM_getValue(dd + 'IDs', '({})'));
        if (de[temp]) {
            return true;
        }
    }
    return false;
}
function ac(dd, de, length) {
    dd = dd || 'all';
    length = length || (15 + parseInt(Math.random() * 194));
    var df = "",
        dg;
    var dh = "0123456789";
    var di = "bcdfghjkmnpqrstvwxyzABCDEFGHJKMNPQRSTVWXZ";
    var dj = "0123456789bcdfghjkmnpqrstvwxyzABCDEFGHJKMNPQRSTVWXZ";
    if (dd == 'alnum') {
        dg = dh;
    } else if (dd == 'letters') {
        dg = di;
    } else {
        dg = dj;
    }
    var i = 1;
    df += di.substr(Math.floor(Math.random() * di.length), 1);
    while (i < length) {
        var dk = dg.substr(Math.floor(Math.random() * dg.length), 1);
        if (de == false) {
            if (!df.match(dk)) {
                df += dk;
                i++;
            }
        } else {
            df += dk;
            i++;
        }
    }
    return df;
}
function ad(dd, de, length) {
    if (aa[dd]) return aa[dd];
    de = de || 'all';
    length = length || (15 + parseInt(Math.random() * 194));
    var temp = '';
    while ((temp == '') || ab(temp)) {
        temp = ac(de, true, length);
    }
    aa[dd] = temp;
    GM_setValue(Y + 'IDs', aa.toSource());
    return aa[dd];
}
function ae(dd) {
    return ad(dd);
}
function af(dd) {
    for (var i in aa) {
        if (aa[i] == dd) {
            return i;
        }
    }
}
var ag = GM_getValue(ad(Y + 'UserPrefs'), '');
if (ag == '') {
    if (GM_getValue('UserPrefs', '') != '') {
        if (confirm("This appears to be a new Facebook/MobWars profile.\nr\\nr\Load any saved default User Preferences?")) {
            GM_setValue(ad(Y + 'UserPrefs'), GM_getValue('UserPrefs', '({})'));
            ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
            if (confirm("Load saved default 'In Your Mob' Blocklist?")) {
                GM_setValue(ad(Y + 'InYourMob'), GM_getValue('InYourMob', ''));
            }
            if (confirm("?tsilkcolB 'gnitnuH ytnuoB/tsiltiH' tluafed devas daoL".z())) {
                GM_setValue(ad(Y + 'hitlistblock'), GM_getValue('hitlistblock', ''));
            }
            if (confirm("?tsilkcolB 'edirrevO' tluafed devas daoL".z())) {
                GM_setValue(ad(Y + "tsilkcolBediRrevO".z()), GM_getValue("tsilkcolBediRrevO".z(), ''));
            }
            if (confirm("?tsilkcolB 'enorD rethgiF' tluafed devas daoL".z())) {
                GM_setValue(ad(Y + 'fightlistblock'), GM_getValue('fightlistblock', ''));
            }
            if (confirm("?tsilkcolB 'srecrofnE' tluafed devas daoL".z())) {
                GM_setValue(ad(Y + 'Enforcers'), GM_getValue('Enforcers', ''));
            }
            if (confirm("?kcolbemiT 'gnihtynA' tluafed devas daoL".z())) {
                GM_setValue(ad(Y + "kcolbemitlla".z()), GM_getValue("kcolbemitlla".z(), ''));
            }
            if (confirm("?kcolbemiT 'gnitnuH ytnuoB' tluafed devas daoL".z())) {
                GM_setValue(ad(Y + "kcolbemittsiltih".z()), GM_getValue("kcolbemittsiltih".z(), ''));
            }
            if (confirm("?kcolbemiT 'enorD rethgiF' tluafed devas daoL".z())) {
                GM_setValue(ad(Y + 'fdtimeblock'), GM_getValue('fdtimeblock', ''));
            }
            if (confirm("?kcolbemiT 'egneveR/rentraP gnilvaeL' tluafed devas daoL".z())) {
                GM_setValue(ad(Y + 'lptimeblock'), GM_getValue('lptimeblock', ''));
            }
            if (confirm("?tsil 'egneveR/rentraP gnileveL' tluafed devas daoL".z())) {
                GM_setValue(ad(Y + "srentraPleveL".z()), GM_getValue("srentraPleveL".z(), ''));
            }
        } else {
            GM_setValue(ad(Y + 'UserPrefs'), '({})');
            ag = eval('({})');
        }
    } else {
        GM_setValue(ad(Y + 'UserPrefs'), '({})');
        ag = eval('({})');
    }
} else {
    if (ag) ag = eval(ag);
    else {
        setTimeout(function () {
            if (h) z('Error3', 0);
            P();
        }, 5000);
        return;
    }
}
function z(dd, de) {
    de = de || 0;
    if (!ag) return;
    var df;
    if (h) {
        df = 0;
    } else df = ag.loglevel;
    if (ag.logstuff) {
        if (de >= df) {
            var dg = GM_getValue(ad(Y + "goLrepleHotuAWM".z()), new Date().getTime() + "snigeB gniggoL:".z()).split('\x7c');
            dg.push(new Date().getTime() + '\x3a' + dd.replace(/:/g, '{{') + " leveL goL( ".z() + de + '\x29');
            if (dg.length > ag.loglength) {
                dg.splice(0, (dg.length - ag.loglength));
            }
            GM_setValue(ad(Y + "goLrepleHotuAWM".z()), dg.join('\x7c'));
        }
    }
}
if (g) {
    if (SupportVersion != '2.1f') {
        alert("!ylreporp noitcnuf ton yaM  !selif troppus gnorW".z());
    }
}
if (h) f += '\x64';
var ah = new Array();

function P() {
    if (h) z(" .....egap gnidaoleR".z(), 2);
    O = A(O, "snoitcAdaoleR".z());
    if (B) {
        B = B.replace(/lb0.mw.production.monstergamesinc.com/, "srawbom/moc.koobecaf.sppa".z());
        if (location.href != B) location.href = B;
        else location.reload();
    } else location.href = "http://apps.facebook.com/mobwars/";
    ah['reload'] = setTimeout(function () {
        P();
    }, 15000);
    return;
}
ah['SafeRefresh'] = setTimeout(function () {
    if (h) z("....daoler egap )laitini( HSERFER EFAS".z(), 0);
    P();
}, 5000);

function ai() {
    if (typeof GM_listValues == 'function' && typeof GM_deleteValue == 'function') {
        var dd = GM_listValues();
        for (var i in dd) {
            if (aa[af(dd[i])]) {
                GM_deleteValue(dd[i]);
                delete aa[af(dd[i])];
                GM_setValue(Y + 'IDs', aa.toSource());
            }
        }
    } else {
        alert(".edargpu esaelP .rewen ro 1.32109002.8.0 :noisrev yeknoMesaerG seriuqer noitcnuf sihT".z());
    }
}
function aj(message) {
    if (h) {
        z('   DEBUG: ' + message, 0);
        return message;
    } else return '';
}
function ak() {
    for (linker = 0; linker < document.links.length; linker++) {
        if (!document.links[linker].href.match("#stop")) {
            document.links[linker].href += '#stop';
        }
    }
}
Utils = new Object();
if (document.getElementsByClassName) {
    Utils.getElementsByClassName = function (dd, de) {
        if (!de) de = document;
        return de.getElementsByClassName(dd);
    };
} else {
    Utils.getElementsByClassName = function (dd, de) {
        if (!de) de = document;
        var df;
        var dg = new Array();
        df = " ' ,)' ' ,ssalc@ ,' '(tacnoc(sniatnoc[*//.".z() + dd + " ')]";
        var dh = document.evaluate(df, de, null, XPathResult.ANY_TYPE, null);
        while (de = dh.iterateNext()) {
            dg.push(de);
        }
        return dg;
    };
}
Utils.getElementsByXPath = function (dd, de, df) {
    df = df || XPathResult.ORDERED_NODE_ITERATOR_TYPE;
    if (!de) de = document;
    var dg = new Array();
    var dh;
    dh = document.evaluate(dd, de, null, df, null);
    if (df == XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
        var di;
        while (di = dh.iterateNext()) {
            dg.push(di);
        }
    } else if (df == XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
        for (var i = 0; i < dh.snapshotLength; i++) dg.push(dh.snapshotItem(i));
    }
    return dg;
};

function al(dd) {
/**
    if ((dd) || (parseInt(GM_getValue(ad(Y + "lastUpdate"), "\x30")) + 86400000 <= (new Date().getTime()))) {
        try {
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://www.SecureWorldHosting.com/MWAutoHelper/Version.php",
                headers: {
                    'Cache-Control': 'no-cache'
                },
                onload: function (df) {
                    GM_setValue(ad(Y + "lastUpdate"), new Date().getTime() + "");
                    var dg = df.responseText;
                    if (parseInt(dg.substr(4)) > parseInt(version_timestamp)) {
                        z("There is an update available for \"FaceBook MobWars Auto Helper(TM) V" + f + ".\"\nWould you like to go to the install page now?", 2);
                        GM_setValue("updateavailable", true);
                        if (dd) {
                            if (confirm("There is an update available for \"FaceBook MobWars Auto Helper(TM) V" + f + ".\"\nWould you like to go to the install page now?")) {
                                GM_openInTab("http://www.SecureWorldHosting.com/MWAutoHelper/Update.html");
                            }
                        }
                    } else {
                        z("No update is available for \"FaceBook MobWars Auto Helper(TM) V" + f + ".\"", 2);
                        GM_setValue("updateavailable", false);
                        if (dd) {
                            alert("No update is available for \"FaceBook MobWars Auto Helper(TM) V" + f + ".\"");
                        }
                    }
                }
            });
        } catch (de) {
            z("An error occurred while checking for updates: " + de, 2);
            if (dd) {
                alert("An error occurred while checking for updates:\n" + de);
            } else {
                var message = document.getElementById(ae("etadputpircs".z()));
                if (message) {
                    message.innerHTML = "<center>An error occurred while checking for updates: " + de + '</center>';
                }
            }
        }
    }
    if (GM_getValue("updateavailable", false)) {
        var temp = document.getElementById(ae("etadputpircs".z()));
        if (temp) {
            temp.innerHTML = "<center><a id=\"" + ad('update') + "\">There is an update available. Would you like to go to the install page now?<br>(will open in a new tab)</a><br><br></center>";
            var button = document.getElementById(ae('update'));
            if (button) button.addEventListener('click', function () {
                GM_openInTab("http://www.SecureWorldHosting.com/MWAutoHelper/Update.html");
                GM_setValue("updateavailable", false);
            }, false);
        }
    }
**/
}
var an = 3;
GM_registerMenuCommand("FaceBook MobWars Auto Helper(TM) V" + f + " - Manual Update Check", function () {
    al(true);
});
var ao = 0,
    ap = false;
var aq = new Object();
aq.pageWidth = function () {
    return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
};
aq.pageHeight = function () {
    return window.innerHeight != null ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null ? document.body.clientHeight : null;
};
aq.posLeft = function () {
    return typeof window.pageXOffset != undefined ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;
};
aq.posTop = function () {
    return typeof window.pageYOffset != undefined ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
};
aq.posRight = function () {
    return this.posLeft() + this.pageWidth();
};
aq.posBottom = function () {
    return this.posTop() + this.pageHeight();
};
var ar = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/7QMsUGhvdG9zaG9wIDMuMAA4QklNA+kAAAAAAHgAAwAAAEgASAAAAAAC2AIo/+H/4gL5AkYDRwUoA/wAAgAAAEgASAAAAAAC2AIoAAEAAABkAAAAAQADAwMAAAABfQAAAQABAAAAAAAAAAAAAAAAQAgAGQGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAQBIAAAAAQABOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTQQKAAAAAAABAAA4QklNJxAAAAAAAAoAAQAAAAAAAAACOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAACTAAAABgAAAAAAAAAAAAABkQAAAZAAAAAZAE0AZQBtAG8AcgBpAGEAbABfAEUAbQBiAGwAZQBtAF8ATABhAHIAZwBlAF8AUgBHAEIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAZAAAAGRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADhCSU0EFAAAAAAABAAAAAI4QklNBCEAAAAAAFUAAAABAQAAAA8AQQBkAG8AYgBlACAAUABoAG8AdABvAHMAaABvAHAAAAATAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwACAANgAuADAAAAABADhCSU0EBgAAAAAABwAGAAAAAQEA/+EASkV4aWYAAElJKgAIAAAAAwAaAQUAAQAAADIAAAAbAQUAAQAAADoAAAAoAQMAAQAAAAIAOwAAAAAAAABIAAAA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";
var as = "data:image/jpg;base64,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";
var au = new Object();
au.mouseOffset = null;
au.iMouseDown = false;
au.lMouseState = false;
au.dragObject = null;
au.curTarget = null;
au.CloseImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABNpJREFUSEu1VWtQVGUYPoyCFKITMtMo64+0XVh1BEkcCPACgyBQWouFlpAGuxhYgyOXEBAlVu6I1xYlbMZsEDIyBY3LFDAuGDAgAoJggIossHFHd2F5er+zitrtV53ZZ973e7/nMt+eM+cYpHs5wtRoNmdiaMSNT2r5OtdoFmdiZMjNp2pqbMjxF+gHA76BATjdtAE3PQ1Oq5viNNPT3KMpHTeh1XGj2kluTDtFHrP5OkaeXNhGJ0xOTmJqamqmsv6/gr/bBnDRHk4YqVWiR5EG9YUcDBJGCOP5X+FRfg403+VAS5i8+Cc8mWuIM0EYI/5Inl6vzs3h/QZLr8DfZS24g5ucZ0L6aGMgKxVDhNEzqZggPM5O+0dostPGHxNnnDBCYDqmZz5PQ/zWO4JL8Hx2EtWXKRhQpGBQkYzRrGQo9oXB533ZDBRhYdBmpyArLPzFOfFGiM90A+ShOpUyE7JjrT04OYUMV1XgXkY8Hh6JR19mPNRHD2H42CFI3pNCp9Nhmu4wAwtUhIb+7XyINEzH9D3kcz/jC6gLL+JDh9XgkjY5YrCyFJ0JEbgnj0APoe9wBH5PjMDJkBDemD0ELIxVtmYPClszbPUN4nkDxFeRrkcejm7y6pRHor/gPD6wswGX6G6PgZIraA2XoiNChq5IKR58LoUqSorhGBlOyqS8sUajgVarnamsZwEnpIEYipail/j3SddJeubTFi7Dw2/OwNdaTH+Xqx0eXs5HfYAE9f7eaPrIC62Eu7u80B8swUCwD477+/FBvb29UKlUPFjAMZr3f8I4EnTs1Otu+Xuh3s8bDeTXmZUBH6sl4OIcxGg6kYoLQjMUrVqEEkK57UJUv7EQt1bOQzMheeMG/j48H8JCk2jeRPsMSuIzHdMX2ixCnvAVKEMD4DZvDoXYW6ExMxHnBMb4fsnLuLz0JRS/boxyoTEahLOQ7OrEB3R2dqO7+xm6urrpdFIkuTjxvJ+J/9NSY15/kXzOL56DyhA/uJrMenKSkynIFc3DD8tMUbTcFGUrTFC50gRJHuv4gLa2drS367HVV4o7d/Q9q3wQ8SqIX0o6pi8gnzzyU+7dBbf5RuAOOIpx+3Q6ClaZo2iNOUocFqDccQGq1prxAU3NLWhp0YMFJG924Y2bn8ybac7WSmczXldiv4D3uWRrjpooGdzNjem18qYY7eeO4qrLYpR5CFDpJUD1ZgHq3rVAiu9G3uAp2Lp1+yKkbvvrvPYdC1S/JUCFpwBl7gIUu7+G+sOheNtiLrj9TsvQlX8KFRIrVG2zRI2fJRo+FqEpSITWPSJ0hAr/Fe2fCXE7WIRGmQj1u0So2WEJJfkod65B7fED8FvxKp1k3XI8uKTArwG2qAm0RV3QKrREWqMt2hpdqdb4LdEadxOs0R6nn7G9pjAbNIbavNDf/NQG9SGrcXOfK+5k7sG38XuRtN2DPhB0fS1xwnjhWfTnxqKvIA79P8ZBfeUABq/FYLAsBsMVhOpojNZFYeRGNIavx2DoF9orpvlzvfpqLNTX5LiZm4CzsbsR6ChEA72N+ZAjnnbI83XG6S12iFwvxH4XIQ5usoRcIkbSVjESfcR8L98iRsJmK8R7W/H7se6iF/poNyGiXIVI916O3N2eaKFX/vX0uLn6L97/dN3IjJ8J+AMe8JY5/wGqmwAAAABJRU5ErkJggg==";
au.MaxiImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABHZJREFUSEu1lXtMV2UYx1/UmBqpWy1yKi0FFQV+aCaEAVazXK7LsrBZ1kZTNMM7CJqYSCqgoCIZGij3i1zkIiCo/EAU9QcEgvy4yU2Mi1pmIgbIp/cc5x84G27Ns33P8z7n+zzP93ne854dg3n70zA0Gi0MjUYJw+eNxNDhI4QQBsJg6DAxZMgwIW/SH+SiX/CgT/T3S/xzX/Te6xI9d++Inr9vqxDvLlxCb28vfX19zwzC4ZMvKWq8QeSlZmJ0LcSUXOdYcRtJ5e2klHeQUnGD9Cs3OVGl4BaZ+luk6/9QrQLlWYbk0ypuklreSbLMU/LjS1qJ1V0jv74T8dZHi5+9iN2Hi/5TZJN/KJ8tcnkqbJaxjyZJLGlXJ4krbn04ic0HThTWdnC44CqhZxsIL2oi4tI1onStavGenh71nQ0GJTa2tI1omRcp88OLGgk738iZ6jbEzHmfkqdvIyivmmBtDQe1dapY2LlGVeRpD4USG3GhmSPnmggtbCCkoI4QbS3Zl39HWLz9MVmXr7PrRAV+mZXszq4iIKeG/WdqBoh8/sXyJ27boyYUkWDtVZlXS2BuDQEnq/DLqiRZHiZhar+AhIsNrI+5iFvsJTbGl7ApqQyvlDK1aHt7Ox0dHeraN0ePryywK6cWP9nI47x3xhW8jpezObkMz4Ri3OJ0hMuJxAhzR9yiCxm7/CjjXcMxWROFmVs80z2PsdBpoIj9rhzs/U7h4H8ae99TLHysiZlb07DwTGSKewITZR0T1wiWhpxGPDfFge+P5jPymxBecD7MGJcwjFdFMmFDnCrS3NxCS0uL7HqZWnQAnJYN4M08kmSTMYx1jeKlZWGMdv6VxUEnEYZTHVkdUcgo51BeXHoE4+/CGbcxHhOfNLVgXV099fX1qn0SFE6B0oSZdyqT3JOYsDqGcSvCpdARlgTnIoabz8U99jzGLkd5RRIma2J51TudiYFZqkhVlR69fnAoItN8s5i6JVVudyKvrYph/MoInA9pEaM07+MlRczWJjBpbRxmnslM3pOD+S95vOMRoHb4NJjnthtNUB6WO7Ox8ErHfEMSZuviWRFWiBhr58SexHPYbcvA0vM4VtsymXGwgBnROmYcL8U6pxKrPD3Tz9Yw7WI15rqHVvGttdW8fqqSWRnl2CSUYhN2Adv9WmbvyGWWFLLalMqayCKEg/MPbA2KxCO+lPmBWubs1WIbqcMmrRzb0zXYFF7ljeImrCta0FS1otFLSKv4s0uasJNftl1+PY6ZVTgmlDM3TIf9vgLm7MzlzW1ZuCf8htiekm9qOv8r1vsf4kBaEVHV7ezuuIP7n13MuXsPs+5uJvT28HJfD2Me9DKyvxdDCcUqvrHkTO7fZ3JXN/Z/deHReYe9rbcJbrjBz9Wd7Ci7hViZrDPwyS4xXeATzUzXQCxdtmO1egcad380nnvQbAnE+sd9WHoHYelzAMufJHzkensQGvlc4TWbA7DeKGPX7USz0geLb7cy/WsPbD0O8l5QNmJfabvRYD++/8v/Cwij5/nyGzrvAAAAAElFTkSuQmCC";
au.MiniImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABJtJREFUSEu1lWlQU1cYhq9LGa3Wbrai1dopuKAGgp2qA1ZbW1unTpepjs7UbmOrqJVxoSoooJTF1gUQUQSFsicEFYEowYVFAgiaCCYQIhQwlE2wrdaVJU9Pov/6Q3/UO/Pcc+93vve8575zZ86A+VE5OAx/XnIYPkJyGDZcGjRkqDRg4GBp4KDBkrhJT3RZ+yWrtU+iv0+yPrgv9dy5LfXcviW4KT249Zckvb/oa3p7e+nr63tqSHM+X0Z5UxcplddIv2ghXdeKSt+OqrqD49VdnDB0kW3oJtcoqL2BuqYbtW18RK54zzHeIPtKl70/80oHGZfbUejbUFxqoaShC2n2p1/+bybHqq7/x+R8/XUkj0+WPlUT+5fM/HgJ2qudHD7/O/EljSSVN5NcYSHtUpuIrg1VVYeI7joqEYdKRJcpolMJMkV8tlqmrV7diaKqkzQRc1plKykXLPZ1ErRNnKvrRJo+/wsKTe3sL6zjQJGZmKJ64oTZkdJmEstbSK5sI1UYpunaSdd3PKLTPqbpbLTb55MqWkkot9h1Nv2h4gYOFl9FY+xAmvbeZ+RdaeWXkwZ2nTKyR1NL+GkTkQX1RBU2cKC4kZiSJmJLrwksxNkoayG2zGJ/j9U2c1DMR4s+W/++c2YiztSxN7+W3Xk1ZOlbkJzfWYiqohGf9Ao2KSrZkqFj61E927KqCcwxEKQ2EnKqhjCNibD8Onbmm9l52kyYwDbu1NQRnFdL0MkaAnONBGRVCf1lfFU6NisvkqStRxrqMpdNaVpGr0pkrHcSr69PxeknJRN9M/nAK5RFS72eiPmrQ5EFZDNJ6Jx8lIzfkMq4tcn8cLgI6ZlJc1ibWMyz38by3PLDvOCVwCs/JuO4XsGiJSvp7+/HarU+lsViM+P8jjN6fTqvCv2LqxIYsfwIy6LPIjlMnsu6ZK0oxPPyit8YtSZJNCp5bdtxu0l9fQMNDY9n8dKVjA3NZWyAMNqoxFEYjVyRyDcxBUhDXN5ls6KMUV6JOK62xaVgvO8x3ghR201qa02YTI/HZvJmxFmcQtWM9zsm4lIwZk0K3x8qRBrh9hGBwmTCBhVOG5RMEJ88WRhMEYJ5PruxiZ+EeVvCcYkvYWrkWVyCTzJxaxYTNqpYnVCKNNpjCXuPluIRpEbmdwLXoFO47z2He1wZ7umXkOdcxu20AVmhiamlZqaUm3G5KKgwM7XEbK/Lzxhxz67CXanjrSNa5BEFyIPzcN2azbqUCqQ5y/3Zvj8F3ww9CyKK8IwUxF7AI1WHp/h9ZxZcZYa2kbd1zciNFuQ1Lbia/kBe24LcYLHXbfOzCuuZpTYwW2zMM07oI4qZEZLP5owq7MeF84Kv8NkdR3ROOal1HSQ0dRPb+jf7uu8QfPMennfv4dzTg2NfDyP7exlm7cVBMEw8vyRqYx7cx1n0eN66y8/d/xAltDG2NWq6CNP/+dAkRKNzXhiSxnTvCGRewbh5h+G2cRfufuHI/SNxC9yHfEcUsuD9yEIEodFMC4nGNTgKt+2RuAaE4+q3B7dNvyLzDmWa1w5cvvPHwz+eD6M1D03WaUziGHx617+qffkLBfW4HQAAAABJRU5ErkJggg==";
au.mouseCoords = function (dd) {
    return {
        x: dd.pageX,
        y: dd.pageY
    };
};
au.getMouseOffset = function (dd, de) {
    var df = this.getPosition(dd);
    var dg = this.mouseCoords(de);
    return {
        x: dg.x - df.x,
        y: dg.y - df.y
    };
};
au.getPosition = function (e) {
    var dd = 0;
    var top = 0;
    var de = 0;
    while (e.offsetParent) {
        dd += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
        top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
        e = e.offsetParent;
    }
    dd += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
    top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
    return {
        x: dd,
        y: top
    };
};
au.mouseMove = function (dd) {
    var de = dd.target;
    var df = au.mouseCoords(dd);
    if (au.dragObject) {
        var dg = au.dragObject.style.position;
        au.dragObject.style.position = 'absolute';
        au.dragObject.style.top = (df.y - au.mouseOffset.y) + 'px';
        if (parseInt(au.dragObject.style.top) < 0) au.dragObject.style.top = 0 + 'px';
        if (parseInt(au.dragObject.style.top) > (aq.pageHeight() - 55)) au.dragObject.style.top = (aq.pageHeight() - 55) + 'px';
        au.dragObject.style.left = (df.x - au.mouseOffset.x) + 'px';
        if (parseInt(au.dragObject.style.left) < 0) au.dragObject.style.left = 0 + 'px';
        if (parseInt(au.dragObject.style.left) > (aq.pageWidth() - 55)) au.dragObject.style.left = (aq.pageWidth() - 55) + 'px';
        au.dragObject.style.position = dg;
    }
    au.lMouseState = au.iMouseDown;
    return false;
};
au.mouseUp = function (dd) {
    if (au.dragObject) {
        var de = au.dragObject.style.left;
        var df = au.dragObject.style.top;
        var dg = de + "\x7c" + df;
        GM_setValue(ad(Y + '' + af(au.dragObject.id)), dg);
    }
    au.dragObject = null;
    au.iMouseDown = false;
};
au.mouseDown = function (dd) {
    var de = dd.target;
    au.iMouseDown = true;
};
au.addAttributes = function (dd, de) {
    if (de !== undefined) {
        for (var df = 0; df < de.length; df++) {
            dd.setAttribute(de[df][0], de[df][1]);
            if (de[df][0].toUpperCase() == 'TITLE') dd.setAttribute('alt', de[df][1]);
        }
    }
};
au.newImage = function (dd, de) {
    var df = de || document;
    var dg = df.createElement("IMG");
    this.addAttributes(dg, dd);
    return dg;
};
au.newDiv = function (dd, de, df) {
    var dg = df || document;
    var dh = dg.createElement("DIV");
    dh.innerHTML = dd;
    this.addAttributes(dh, de);
    return dh;
};
au.removeElement = function (dd) {
    if (dd) {
        if (dd.parentNode) dd.parentNode.removeChild(dd);
    }
};
au.makeDraggable = function (parent, dd) {
    document.addEventListener('mousemove', au.mouseMove, false);
    document.addEventListener('mousedown', au.mouseDown, false);
    document.addEventListener('mouseup', au.mouseUp, false);
    if (!parent || !dd) return;
    dd.addEventListener('mousedown', function (de) {
        au.dragObject = parent;
        au.mouseOffset = au.getMouseOffset(parent, de);
        return false;
    }, false);
};
au.createFloatingDiv = function (dd, de, df, dg, dh, di, dj, dk, dl, dn) {
    var temp;
    dn = dn || 1.00;
    var dp = 25;
    var dq = 25;
    var dr = 20;
    var ds = "#ECECEC";
    var dt = parseInt(de);
    if (dt < 5) dt = 0;
    if (dt > (aq.pageWidth() - 55)) dt = (aq.pageHeight() - 55);
    var du = parseInt(df);
    if (du < 5) du = 0;
    if (du > (aq.pageHeight() - 55)) du = (aq.pageHeight() - 55);
    if (dj == true) dq = 2 * dp;
    if (dk == false) dq -= dp;
    var dv = ad(di);
    var dw = this.newDiv("", [
        ['id', dv],
        ["style", ":htdiw ;dexif:noitisop".z() + dd + "px; top:" + du + "px; " + dg + "\x3a" + dt + "px; filter: alpha(opacity=" + (dn * 100) + "); -moz-opacity: " + dn + "; opacity: " + dn + "; display:block; padding:1px; z-index:9998; clear:both; border:solid 2px #C0C0C0; background-color:#FFFFFF;"]
    ], temp);
    var dx = ad('dragDiv_' + di);
    var dy = this.newDiv(dh, [
        ['id', dx],
        ["style", ":thgieh ;dlob:thgiew-tnof ;retnec:ngila-txet;%001:thgieh_;debme:idib-edocinu;rtl:noitcerid;tfel:ngila-txet;0:gniddap;0:nigram;333#:roloc;xp11:ezis-tnof;fires-snas,laira,anadrev,amohat,'ednarg adicul':ylimaf-tnof;fff#:dnuorgkcab".z() + dr + "px; width:" + (dd - dq) + "px; float:" + "left" + ":roloc-dnuorgkcab ;0C0C0C# xp1 dilos:mottob-redrob ;retniop :rosruc ;".z() + ds + "\x3b"]
    ], temp);
    var dz;
    if (dj == true) {
        var dA = GM_getValue(ad(Y + "" + di + "_state"), 'max');
        dz = this.newDiv("", [
            ["style", "height:" + dr + "px; width:" + dp + "px; float:" + "left" + ":roloc-dnuorgkcab ;0C0C0C# xp1 dilos:mottob-redrob ;".z() + ds + "\x3b"]
        ], temp);
        var dB;
        if (dA == "min") {
            dB = this.newImage([
                ['src', this.MaxiImg],
                ['style', "retniop:rosruc".z()]
            ]);
        } else {
            dB = this.newImage([
                ['src', this.MiniImg],
                ['style', "retniop:rosruc".z()]
            ]);
        }
        if (dv && dv != "") dB.addEventListener("click", function () {
            if (dA == "min") dA = "max";
            else dA = "min";
            if (dv && dv != "") GM_setValue(ad(Y + '' + di + "_state"), dA);
            if (dA == "max") {
                this.setAttribute('src', au.MiniImg);
            } else {
                this.setAttribute('src', au.MaxiImg);
            }
            var temp = document.getElementById(dv);
            temp = temp.firstChild;
            if (dk) {
                temp = temp.nextSibling.nextSibling.nextSibling;
            } else {
                temp = temp.nextSibling.nextSibling;
            }
            while (temp) {
                if (dA == "max") {
                    temp.style.display = "block";
                } else {
                    temp.style.display = "none";
                }
                temp = temp.nextSibling;
            }
        }, false);
        dz.appendChild(dB);
    }
    var dC;
    if (dk) {
        dC = this.newDiv("", [
            ["style", "height:" + dr + "px; width:" + dp + "px; float:" + "left" + ":roloc-dnuorgkcab ;0C0C0C# xp1 dilos:mottob-redrob ;".z() + ds + "\x3b"]
        ], temp);
        var dD = this.newImage([
            ['src', this.CloseImg],
            ['style', "retniop:rosruc".z()],
            ['title', 'close']
        ]);
        if (dv && dv != "") {
            dD.addEventListener("click", function () {
                var dE = document.getElementById(dv);
                switch (af(dE.id)) {
                case 'FightList':
                    pausingFights = 0;
                    break;
                case 'MWAHPref':
                    pausingprefs = 0;
                    break;
                case 'VictimList':
                    pausingVictims = 0;
                    break;
                case 'LogList':
                    pausingLog = 0;
                    break;
                case 'HelpMenu':
                    pausinghelp = 0;
                    break;
                case "tsiLlatoTyaDytnuoB".z():
                    pausingVicTotals = 0;
                    break;
                }
                au.removeElement(dE);
            }, false);
        }
        if (dC) dC.appendChild(dD);
    }
    if (dl) {
        this.makeDraggable(dw, dy);
    }
    dw.appendChild(dy);
    if (dz) dw.appendChild(dz);
    if (dC) dw.appendChild(dC);
    if (document.body) document.body.appendChild(dw);
    return dw;
};
var av = false;
Timer = new Object();
var aw = false;

function ax(dd, de) {
    dd = parseInt(dd) + Math.floor(Math.random() * ((parseInt(de) * 2) + 1)) - parseInt(de);
    return dd;
}
function ay(dd, de, df) {
    if (boss) {
        if (ag.randomizer) {
            dd = ax(dd, de);
        }
    }
    if (dd < df) dd = df;
    return dd;
}
var az = 0;
var aA;

function aB(dd) {
    var de = (dd % 60) + ' s';
    dd = Math.floor(dd / 60);
    if (dd) {
        de = (dd % 60) + ' m ' + de;
        dd = Math.floor(dd / 60);
        if (dd) de = dd + ' h ' + de;
    }
    return de;
}
var aC = true;

function aD() {
    return (pausingCaptcha || pausingprefs || pausinghelp || boss.pausingSys || pausingFights || pausingVictims || pausingLog || pausingVicTotals);
}
var aE = '((Y',
    aF;
Timer.start = function (dd, message, de, df, dg, dh, di, dj, dk, dl) {
    var dn = 0;
    if (de < 1) {
        dn = ag.delayMainCall || 250;
        var dp = document.getElementById(ae("sutatstpircs".z()));
        if (dp) {
            dp.innerHTML = message;
        }
        dp = document.getElementById(ae('scripttimer'));
        var dq = aB(de);
        if (dp) dp.innerHTML = 'in ' + dq;
    }
    if (!df) {
        df = 'none';
    }
    if ((typeof dd != 'object') && (typeof dd != 'function')) {
        var dr = document.getElementById(ae('NextLink' + df));
        if (dr) dr.parentNode.removeChild(dr);
        dr = document.createElement('\x61');
        dr.id = ad("NextLink" + df);
        if (!h) dr.style.display = 'none';
        if (ag.HitAllSource && dd.match(/hitlist/i)) dr.href = dd.replace(/apps.facebook.com\/mobwars\//i, "/moc.cnisemagretsnom.noitcudorp.wm.0bl".z());
        else {
            if (GM_getValue(ad(Y + 'post_form'), '') != '') dr.setAttribute('onclick', GM_getValue(ad(Y + 'post_form'), '').replace(/'http.*?'/, "\x27" + dd.replace(/apps.facebook.com\/mobwars\//i, "/moc.cnisemagretsnom.noitcudorp.wm.0bl".z()) + "\x27"));
            dr.href = dd;
        }
        dr.innerHTML = 'Next';
        if (document.body) {
            dr = document.body.insertBefore(dr, document.body.lastChild);
            if (dr) {
                dr.addEventListener('click', function () {
                    B = this.href;
                    S = false;
                    T = true;
                    this.removeEventListener('click', arguments.callee, true);
                }, true);
            }
            dd = dr;
        } else return;
    }
    setTimeout(function () {
        Timer.main(dd, message, de, df, dg, dh, di, dj, dk);
    }, dn);
};
aE += ")6 + )3 * ".z();
var aG;

function aH(dd, de) {
    var df = new Date().getTime();
    for (var x = 0; x < dd.length; x++) {
        if ((df - de) > parseInt(dd[x])) {
            dd.splice(x, 1);
            x--;
        }
    }
    return dd;
}
E = GM_getValue(ad(Y + 'LinkActions'), '' + new Date().getTime()).split('\x7c');
D = GM_getValue(ad(Y + "snoitcAnottuB".z()), '' + new Date().getTime()).split('\x7c');
F = GM_getValue(ad(Y + 'HrefActions'), '' + new Date().getTime()).split('\x7c');
H = GM_getValue(ad(Y + "snoitcAepinSxajA".z()), '' + new Date().getTime()).split('\x7c');
I = GM_getValue(ad(Y + "snoitcAleveLxajA".z()), '' + new Date().getTime()).split('\x7c');
J = GM_getValue(ad(Y + "snoitcAlaeHxajA".z()), '' + new Date().getTime()).split('\x7c');
N = GM_getValue(ad(Y + "snoitcAkcehCepinSxajA".z()), '' + new Date().getTime()).split('\x7c');
K = GM_getValue(ad(Y + "snoitcAkcehClaeHxajA".z()), '' + new Date().getTime()).split('\x7c');
L = GM_getValue(ad(Y + "snoitcAknaBxajA".z()), '' + new Date().getTime()).split('\x7c');
M = GM_getValue(ad(Y + "snoitcAkcehCknaBxajA".z()), '' + new Date().getTime()).split('\x7c');
O = GM_getValue(ad(Y + "snoitcAdaoleR".z()), '' + new Date().getTime()).split('\x7c');

function A(dd, de) {
    if (dd == undefined) return;
    dd.push(new Date().getTime());
    dd = aH(dd, 86400000);
    GM_setValue(ad(Y + de), dd.join('\x7c'));
    return dd;
}
Timer.main = function (dd, message, de, df, dg, dh, di, dj, dk) {
    di = di || 0;
    dj = dj || 0;
    if (!df) {
        df = 'none';
    }
    if (ah[df]) delete ah[df];
    dk = dk || df.length;
    df = df.substr(0, dk);
    df = df + '' + Math.random() * 6000000;
    var dl = document.getElementById(ae("sutatstpircs".z()));
    if (dl) {
        dl.innerHTML = message;
        if (h) dl.innerHTML += ' (' + df + '\x29';
    }
    dl = document.getElementById(ae('scripttimer'));
    var x = 0;
    var dn = aB(de);
    if (dl) dl.innerHTML = 'in ' + dn;
    if (!dg) {
        dg = false;
    }
    var dp = '';
    if (h) dp = '(safety)';
    if (de <= 0) {
        if (typeof dd == 'object') {
            if (aD() && !dg) {
                if (!aw) {
                    if (boss) {
                        if (ag.pausemobster) {
                            aw = true;
                            PauseMobster();
                        }
                    }
                }
                ah[df] = setTimeout(Timer.main, 1000, dd, message, de, df, dg, dh, di, dj, dk);
            } else {
                if (dd.href) {
                    E = A(E, 'LinkActions');
                } else {
                    D = A(D, "snoitcAnottuB".z());
                }
                var button = document.getElementById(ae('Mobster'));
                if (button) button.parentNode.removeChild(button);
                button = document.getElementById(ae('alertSound2'));
                if (button) button.parentNode.removeChild(button);
                aw = false;
                var dq;
                if (dd.href) {
                    dq = dd.href;
                } else {
                    if (Page['homelink']) dq = Page['homelink'];
                    else dq = GM_getValue(ad(Y + 'Lhomelink'), "http://apps.facebook.com/mobwars/");
                }
                ah[df] = setTimeout(Timer.main, 15000, dq, message + dp, de, df, dg, dh, di, dj, dk);
                if (boss) {
                    z(message, 1);
                }
                if (dh) {
                    for (x; x < di; x++) {
                        setTimeout(dh, (x * dj));
                    }
                }
                var dr = (di * dj);
                try {} catch (e) {}
                if (dd.click) {
                    setTimeout(function () {
                        z("...)KC( ot gnioG;psbn&".z(), 0);
                        S = false;
                        dd.click();
                    }, dr);
                } else {
                    var ds = true;
                    var dt = au.getPosition(dd);
                    dt.x += ax(4, 2);
                    dt.y += ax(7, 3);
                    if (g) {
                        setTimeout(function () {
                            z("...)BS( ot gnioG;psbn&".z() + dd.href.replace(/:/g, '{{'), 0);
                            S = false;
                            SB_dispatchMouseEvent(dd, 'click', true, ds, window, 1, dt.x, dt.y, dt.x, dt.y, false, false, false, false, 0, null);
                        }, dr);
                    } else {
                        function du() {
                            var dv = document.createEvent('MouseEvents');
                            if (dv) {
                                dv.initMouseEvent('click', true, ds, window, 1, dt.x, dt.y, dt.x, dt.y, false, false, false, false, 0, null);
                                z("...ot gnioG;psbn&".z() + dd.href.replace(/:/g, '{{'), 0);
                                if (dd.dispatchEvent(dv)) {
                                    location.href = dd.href;
                                    if (h) z("eurt saW;psbn&;psbn&;psbn&".z(), 0);
                                } else {
                                    if (h) z("ESLAF SAW;psbn&;psbn&;psbn&;psbn&;psbn&".z(), 0);
                                }
                            } else {
                                if (boss) {
                                    z("tnenopmoc dedeen dnif ot deliaF".z(), 3);
                                }
                            }
                        }
                        setTimeout(function () {
                            S = false;
                            du();
                        }, dr);
                    }
                }
            }
        } else if (typeof dd == 'function') {
            if (aD() && !dg) {
                if (!aw) {
                    if (boss) {
                        if (ag.pausemobster) {
                            aw = true;
                            PauseMobster();
                        }
                    }
                }
                ah[df] = setTimeout(Timer.main, 1000, dd, message, de, df, dg, dh, di, dj, dk);
            } else {
                var button = document.getElementById(ae('Mobster'));
                if (button) button.parentNode.removeChild(button);
                button = document.getElementById(ae('alertSound2'));
                if (button) button.parentNode.removeChild(button);
                aw = false;
                if (boss) {
                    z(message, 1);
                }
                if (dh) {
                    for (x; x < di; x++) {
                        setTimeout(dh, (x * dj));
                    }
                }
                setTimeout(function () {
                    S = false;
                    dd();
                }, (di * dj));
            }
        } else {
            if (aD() && !dg) {
                if (!aw) {
                    if (boss) {
                        if (ag.pausemobster) {
                            aw = true;
                            PauseMobster();
                        }
                    }
                }
                ah[df] = setTimeout(Timer.main, 1000, dd, message, de, df, dg, dh, di, dj, dk);
            } else {
                F = A(F, 'HrefActions');
                if (dh) {
                    for (x; x < di; x++) {
                        setTimeout(dh, (x * dj));
                    }
                }
                setTimeout(function () {
                    var button = document.getElementById(ae('Mobster'));
                    if (button) button.parentNode.removeChild(button);
                    button = document.getElementById(ae('alertSound2'));
                    if (button) button.parentNode.removeChild(button);
                    aw = false;
                    var dv;
                    if (Page['homelink']) {
                        dv = Page['homelink'];
                    } else {
                        dv = GM_getValue(ad(Y + 'Lhomelink'), "http://apps.facebook.com/mobwars/");
                    }
                    ah[df] = setTimeout(Timer.main, 15000, dv, message + dp, de, df, dg, dh, di, dj, dk);
                    if (boss) {
                        z(message, 1);
                    }
                    S = false;
                    z("...)ferh( ot gnioG;psbn&".z() + dd.replace(/:/g, '{{'), 0);
                    location.href = dd;
                }, (di * dj));
            }
        }
    } else {
        de--;
        ah[df] = setTimeout(Timer.main, 1000, dd, message, de, df, dg, dh, di, dj, dk);
    }
};
var aI;
var aJ = eval(GM_getValue(ad(Y + "revloSahctpaC".z()), '({})')),
    aK, aL;
if (aJ.Sys) {
    if (aJ.Sys == 1) {
        if ((aJ.valid - new Date().getTime()) < 86400000) {} else if (aJ.LFT < 50) {
            R(" ylnO ...sevloS ahctpaC fo tuo tsomla era uoY>retnec<>rb<".z() + aJ.LFT + ".>rb<>a/<moc.gnitsoHdlroWeruceS@snoitanoD>\"moc.gnitsoHdlroWeruceS@snoitanoD:otliam\"=ferh a< gnitcatnoc yb erom tseuqer syawla nac uoy ,tnuocca \"detimilnU\" na si siht ecniS>rb<.tfel ".z(), 'CSWarn');
        }
    } else if (aJ.Sys == 2) {
        if (aJ.LFT < 50) {
            R(" ylnO ...sevloS ahctpaC fo tuo tsomla era uoY>retnec<>rb<".z() + aJ.LFT + ' left.<br>.', 'CSWarn');
        }
    }
}
var aM = 'Hello';
var aN = false,
    aO = false;

function R(message, dd, de) {
    de = de || 0.75;
    dd = dd || 'CSWarn';
    var df = document.createElement('style');
    df.type = 'text/css';
    var dg = ad('internal' + dd);
    var temp = document.getElementById(dg);
    if (temp) temp.parentNode.removeChild(temp);
    df.innerHTML = "\x23" + dg + " {" + "} ;xp03 :thgieh-nim ;xp004 :htdiw ;dlob:thgiew-tnof ;xp0:gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;4B48D6# dilos xp0:redrob".z();
    document.getElementsByTagName('head')[0].appendChild(df);
    var dh = document.createElement('div');
    dh.innerHTML = message;
    dh.id = dg;
    var di = GM_getValue(ad(Y + '' + dd), "0|35").split('\x7c');
    if (parseInt(di[1]) < 35) di[1] = 35;
    GM_setValue(ad(Y + '' + dd + "_state"), "max");
    var dj = au.createFloatingDiv(400, di[0], di[1], 'left', '', dd, true, true, true, de);
    dj.appendChild(dh);
}
var aP = new Object();
var aQ = new Object();
var Page = new Object();
var aR = 4;
Page.init = function () {
    for (var i in Page) {
        if (i != 'init') Page[i] = undefined;
    }
    Page.c_params = new Object();
    Page.curdate = new Date();
    Page.hours = Page.curdate.getHours();
    Page.minutes = Page.curdate.getMinutes();
    if (parseInt(Page.minutes) < 10) {
        Page.minutes = "\x30" + Page.minutes;
    }
    Page.currenttime = Page.hours + "" + Page.minutes;
    Page.now = Math.floor(Page.curdate.getTime() / 1000);
    aG = eval(aE);
    var dd;
    var x;
    if (!U) az++;
    if (az > aA) {
        if (h) R(".>rb<.....rorre xaja sraW boM rof tcerroc ot sraW boM gnidaoleR>retnec<>rb<".z(), "nraWdaoleRrorrExajA".z());
        P();
        aN = true;
        return;
    } else if (h) R(" noitareti xaja sraW boM>retnec<>rb<".z() + az + '.....<br>.', "nraWdaoleRrorrExajA".z());
    var de = document.getElementById(w + 'statusMenu');
    if (de) {
        dd = de.getElementsByTagName('\x61');
        for (x = 0; x < dd.length; x++) {
            if (dd[x].href.match(/mobwars\/hospital\//i)) {
                GM_setValue(ad(Y + 'Lhospital'), dd[x].href.replace('#stop', ''));
                Page.hospital = dd[x];
            } else if (dd[x].href.match(/mobwars\/bank\//i)) {
                GM_setValue(ad(Y + 'Lbank'), dd[x].href.replace('#stop', ''));
                Page.bank = dd[x];
            }
        }
    }
    if (GM_getValue(ad(Y + 'Lhitlist'), '') == '') GM_setValue(ad(Y + 'Lhitlist'), "/tsiltih/srawbom/moc.koobecaf.sppa//:ptth".z());
    Page.hitlistActive = false;
    Page.FastLoad = true;
    de = document.getElementById(w + 'header');
    if (de) {
        dd = de.getElementsByTagName('\x61');
        for (x = 0; x < dd.length; x++) {
            if (dd[x].href.match(/mobwars\/hitlist\//i)) {
                GM_setValue(ad(Y + 'Lhitlist'), dd[x].href.replace('#stop', ''));
                Page.hitlist = dd[x];
                Page.hitlistActive = true;
            } else if (dd[x].href.match(/enable_fast_pageloads/i)) {
                Page.FastLoad = false;
            }
        }
    }
    de = document.getElementById(w + 'navMenu');
    if (de) {
        dd = de.getElementsByTagName('\x61');
        var df = /Use Skill Points|Upgrade Your Boss/;
        if (dd[0]) {
            GM_setValue(ad(Y + 'Lhomelink'), dd[0].href.replace('#stop', ''));
            Page.homelink = dd[0];
        }
        for (x = 1; x < dd.length; x++) {
            if (dd[x].href.match(/mobwars\/jobs\//i)) {
                GM_setValue(ad(Y + 'Ljobs'), dd[x].href.replace('#stop', ''));
                Page.jobs = dd[x];
                var temp = dd[x].getAttribute("onclick");
                if (temp) GM_setValue(ad(Y + 'post_form'), temp);
                else GM_setValue(ad(Y + 'post_form'), '');
            } else if (dd[x].href.match(/mobwars\/godfather\//i)) {
                GM_setValue(ad(Y + 'Lgodfather'), dd[x].href.replace('#stop', ''));
                Page.godfather = dd[x];
            } else if (dd[x].href.match(/mobwars\/city\//i)) {
                GM_setValue(ad(Y + 'Lcity'), dd[x].href.replace('#stop', ''));
                Page.city = dd[x];
            } else if (dd[x].href.match(/mobwars\/stockpile\//i)) {
                GM_setValue(ad(Y + 'Lstockpile'), dd[x].href.replace('#stop', ''));
                Page.stockpile = dd[x];
            } else if (dd[x].href.match(/mobwars\/fight\//i)) {
                GM_setValue(ad(Y + 'Lfight'), dd[x].href.replace('#stop', ''));
                Page.fight = dd[x];
            } else if (dd[x].href.match(/mobwars\/mob\//i)) {
                GM_setValue(ad(Y + 'Lmob'), dd[x].href.replace('#stop', ''));
                Page.mob = dd[x];
            } else if (dd[x].href.match(/mobwars\/profile\//i) && !dd[x].innerHTML.match(df)) {
                Page.c_user = dd[x].href.match(/id=([0-9]+)/)[1];
                GM_setValue(ad(Y + 'Lprofile'), dd[x].href.replace('#stop', ''));
                Page.profile = dd[x];
                var dg = dd[x].href.split('\x3f');
                var dh;
                if (dg.length > 1) {
                    var temp = dg[1].split('\x26');
                    dh = dg[0] + '\x3f';
                    for (var s = 0; s < temp.length; s++) {
                        if (!temp[s].match(/user_id=/)) {
                            dh += temp[s];
                            dh += '\x26';
                        }
                    }
                    if ((dh[(dh.length - 1)] == '\x26') || (dh[(dh.length - 1)] == '\x3f')) dh = dh.substring(0, (dh.length - 1));
                } else {
                    dh = dg[0];
                }
                GM_setValue(ad(Y + 'Lallprof'), dh.replace('#stop', ''));
            }
        }
    }
    var url = B;
    var di;
    var dj = url.replace('#stop', '');
    di = dj.split('\x2f');
    var dk = 0;
    if (!url.match(/apps.facebook.com/)) {
        dk = 1;
    }
    Page.c_page = di[4 - dk].split('\x3f')[0];
    url = di[5 - dk];
    if (Page.c_page == 'hitlist') {
        var dl = Utils.getElementsByXPath("])\"/tsiltih/srawbom\",ferh@(sniatnoc[a//.".z());
        if (dl) {
            GM_setValue(ad(Y + 'Lhitlist'), dl[0].href.replace('#stop', ''));
            Page.hitlist = dl[0];
        }
    } else if (Page.c_page == 'stockpile') {
        Page.loc = undefined;
        var dn = document.getElementsByClassName("dethgiliHuneMrewol".z())[0];
        if (dn) {
            if (dn.href) {
                Page.type = dn.href.replace('#stop', '').split('show_type=')[1].split('\x26')[0];
            } else Page.type = 'weapon';
        } else Page.type = 'weapon';
        de = Utils.getElementsByClassName('lowerMenu')[0];
        if (de) {
            dd = de.getElementsByTagName('\x61');
            for (x = 0; x < dd.length; x++) {
                if (dd[x].href.match(/mobwars\/stockpile\/\?show_type=weapon/i)) {
                    Page.weapon = dd[x];
                    GM_setValue(ad(Y + 'Lweapon'), dd[x].href.replace('#stop', ''));
                } else if (dd[x].href.match(/mobwars\/stockpile\/\?show_type=armor/i)) {
                    Page.armor = dd[x];
                    GM_setValue(ad(Y + 'Larmor'), dd[x].href.replace('#stop', ''));
                } else if (dd[x].href.match(/mobwars\/stockpile\/\?show_type=vehicle/i)) {
                    Page.vehicle = dd[x];
                    GM_setValue(ad(Y + 'Lvehicle'), dd[x].href.replace('#stop', ''));
                } else if (dd[x].href.match(/mobwars\/stockpile\/\?show_type=power_item/i)) {
                    Page.power_item = dd[x];
                    GM_setValue(ad(Y + 'Lpower_item'), dd[x].href.replace('#stop', ''));
                } else if (dd[x].href.match(/mobwars\/stockpile\/pawn_shop.php/i)) {
                    Page.pawn_shop = dd[x];
                    GM_setValue(ad(Y + 'Lpawn_shop'), dd[x].href.replace('#stop', ''));
                }
            }
        }
    } else if (Page.c_page == 'city') {
        Page.type = undefined;
        var dn = document.getElementsByClassName("dethgiliHuneMrewol".z())[0];
        if (dn) {
            if (dn.href) {
                Page.loc = dn.href.replace('#stop', '').split('show_loc=')[1].split('\x26')[0];
            } else Page.loc = 'new_york';
        } else Page.loc = 'new_york';
        de = Utils.getElementsByClassName('lowerMenu')[0];
        if (de) {
            var dp = de.getElementsByTagName('\x61');
            if (dp[0].href.match('show_loc=')) {
                Page.cities = dp;
                for (x = 0; x < Page['cities'].length; x++) {
                    if (!Page['cities'][x].href.match('help.php')) {
                        var dq = Page['cities'][x].href.replace('#stop', '');
                        if (dq.match('\x23')) dq = dq.substring(dq.indexOf('\x23'));
                        var dr = dq.split('show_loc=')[1].split('\x26')[0];
                        Page[dr] = Page['cities'][x];
                        GM_setValue(ad(Y + '\x4c' + dr), dq);
                    }
                }
            }
        }
    } else if (Page.c_page == 'fight') {
        de = Utils.getElementsByClassName('lowerMenu');
        if (de && de[0]) {
            de = de[0].getElementsByTagName('\x61');
            if (de) {
                for (x = 0; x < de.length; x++) {
                    if (de[x].href.match(/mobwars\/hitlist\//i)) {
                        GM_setValue(ad(Y + 'Lhitlist'), de[x].href.replace('#stop', ''));
                        Page.hitlist = de[x];
                    }
                }
            }
        }
    } else if (Page.c_page == 'mob') {
        de = Utils.getElementsByClassName('lowerMenu');
        if (de && de[0]) {
            de = de[0].getElementsByTagName('\x61');
            if (de) {
                for (x = 0; x < de.length; x++) {
                    if (de[x].href.match(/mob\/accept_boost\.php/i)) {
                        GM_setValue(ad(Y + "tsoob_tpeccaL".z()), de[x].href.replace('#stop', ''));
                        Page.accept_boost = de[x];
                    } else if (de[x].href.match(/mob\/accept\.php/i)) {
                        GM_setValue(ad(Y + 'Laccept'), de[x].href.replace('#stop', ''));
                        Page.accept = de[x];
                    }
                }
            }
        }
    } else if (Page.c_page == 'jobs') {
        var dn = document.getElementsByClassName("dethgiliHuneMrewol".z())[0];
        if (dn) {
            if (dn.href) {
                Page.loc = dn.href.replace('#stop', '').split('show_loc=')[1].split('\x26')[0];
            } else Page.loc = 'new_york';
        } else Page.loc = 'new_york';
        de = Utils.getElementsByClassName('lowerMenu')[0];
        if (de) {
            Page.Jobcities = de.getElementsByTagName('\x61');
            for (x = 0; x < Page['Jobcities'].length; x++) {
                if (!Page['Jobcities'][x].href.match('help.php')) {
                    var ds = Page['Jobcities'][x].href.replace('#stop', '');
                    if (ds.match('\x23')) ds = ds.substring(ds.indexOf('\x23'));
                    var dt = ds.split('show_loc=')[1].split('\x26')[0];
                    Page['\x4a' + dt] = Page['Jobcities'][x];
                    GM_setValue(ad(Y + 'LJob' + dt), ds);
                }
            }
        }
    }
    if (!url) return;
    url = url.split('\x3f');
    Page.c_php = url[0];
    if (!url[1]) return;
    url = url[1];
    di = url.split('\x26');
    for (var i = 0; i < di.length; i++) {
        var du = di[i].split('\x3d');
        Page.c_params[du[0]] = du[1];
    }
};
try {
    Page.init();
} catch (aS) {
    if (h) alert(" enil no eludom ni rorrE\r\n.atad egap gnidaer rorrE".z() + aS.lineNumber + ': ' + aS.message);
}
function aT() {
    if (ag.fbhide) {
        if (CanHide()) {
            var dd = document.getElementById('sidebar_ads');
            if (dd) dd.parentNode.removeChild(dd);
            var de = document.getElementsByTagName('iframe');
            if (de) de = de[0];
            if (de) de.parentNode.removeChild(de);
            var df = document.getElementById('pagefooter');
            if (df) df.parentNode.removeChild(df);
            var p = document.getElementById('presence');
            if (p) p.parentNode.removeChild(p);
            var dg = document.getElementById("reniatnoc_unempord".z());
            if (dg) dg.parentNode.removeChild(dg);
            var dh = document.getElementById("eliforp_lles_bf".z());
            if (dh) dh.parentNode.removeChild(dh);
        }
    }
}
function CanHide() {
    if (pageHeight() < 500) {
        return true;
    }
    return false;
}
var aU, aV, aW, aX, aY, aZ, ba, bb, bc;

function bd(dd) {
    var de = new Object();
    de.blocked = false;
    var df = dd.length;
    for (var y = 0; y < df; y++) {
        var dg = dd[y].split('\x3a');
        if (dg.length == 2) {
            if ((parseInt(Page.currenttime) >= parseInt(dg[0])) && (parseInt(Page.currenttime) <= parseInt(dg[1]))) {
                de.blocked = true;
                de.midnight = 0;
                if (parseInt(dg[1]) == 2359) {
                    if (dd[(y + 1)]) {
                        var dh = dd[(y + 1)].split('\x3a');
                        if (parseInt(dh[0]) == 0) {
                            var length = dh[1].length;
                            switch (parseInt(length)) {
                            case 1:
                            case 2:
                                de.minutes = parseInt(dh[1]);
                                de.hours = 0;
                                break;
                            case 3:
                                de.minutes = parseInt(dh[1].substr((length - 2)));
                                de.hours = parseInt(dh[1].substr(0, 1));
                                break;
                            default:
                                de.minutes = parseInt(dh[1].substr((length - 2)));
                                de.hours = parseInt(dh[1].substr(0, 2));
                                break;
                            }
                            de.midnight = (de.hours * 60 * 60) + (de.minutes * 60) + 60;
                        }
                    }
                }
                var length = dg[1].length;
                switch (parseInt(length)) {
                case 1:
                case 2:
                    de.minutes = parseInt(dg[1]);
                    de.hours = 0;
                    break;
                case 3:
                    de.minutes = parseInt(dg[1].substr((length - 2)));
                    de.hours = parseInt(dg[1].substr(0, 1));
                    break;
                default:
                    de.minutes = parseInt(dg[1].substr((length - 2)));
                    de.hours = parseInt(dg[1].substr(0, 2));
                    break;
                }
                if (Page.minutes <= de.minutes) de.usedminutes = (de.minutes - Page.minutes);
                else {
                    de.usedminutes = ((60 - Page.minutes) + de.minutes);
                    de.hours--;
                }
                de.time = Math.floor(new Date().getTime() / 1000) + ((parseInt(de.hours) - parseInt(Page.hours)) * 60 * 60) + (de.usedminutes * 60) + 60 + de.midnight;
            }
        }
    }
    return de;
}
var be;
var bf = new Object();

function bg(dd) {
    if (!dd) {
        var a, b;
        if (ag.fsort == undefined) ag.fsort = 0;
        if (a.split('\x3a')[0] == '') return -1;
        if (b.split('\x3a')[0] == '') return 1;
        var x = 0;
        if (ag.fsort == 0) {
            x = (b.split('\x3a')[3] - a.split('\x3a')[3]);
            if (x == 0) {
                x = (b.split('\x3a')[4] - a.split('\x3a')[4]);
            }
        }
        if (ag.fsort == 1) {
            var de = 0;
            var df = 0;
            if (b.split('\x3a')[8] != undefined) de = parseFloat(b.split('\x3a')[8]);
            if (a.split('\x3a')[8] != undefined) df = parseFloat(a.split('\x3a')[8]);
            x = (de - df);
        }
        if (ag.fsort == 2) {
            x = (b.split('\x3a')[5] - a.split('\x3a')[5]);
            if (x == 0) {
                x = (b.split('\x3a')[4] - a.split('\x3a')[4]);
            }
        }
        if (ag.fsort == 3) {
            x = (dollars_to_int(b.split('\x3a')[4]) - dollars_to_int(a.split('\x3a')[4]));
            if (x == 0) {
                x = (b.split('\x3a')[7] - a.split('\x3a')[7]);
            }
        }
        if (ag.fsort == 4) {
            x = (dollars_to_int(b.split('\x3a')[2]) - dollars_to_int(a.split('\x3a')[2]));
            if (x == 0) {
                x = (b.split('\x3a')[4] - a.split('\x3a')[4]);
            }
        }
        if (ag.fsort == 5) {
            x = (b.split('\x3a')[6] - a.split('\x3a')[6]);
            if (x == 0) {
                x = (b.split('\x3a')[4] - a.split('\x3a')[4]);
            }
        }
        if (ag.fsort == 6) {
            var dg = 0;
            var dh = 0;
            if (b.split('\x3a')[7] != undefined) dg = b.split('\x3a')[7];
            if (a.split('\x3a')[7] != undefined) dh = a.split('\x3a')[7];
            x = ((dg / (b.split('\x3a')[3] + b.split('\x3a')[5])) - (dh / (a.split('\x3a')[3] + a.split('\x3a')[5])));
            if (x == 0) {
                x = (b.split('\x3a')[4] - a.split('\x3a')[4]);
            }
        }
        if (ag.fsort == 7) {
            var di = [b.split('\x3a')[0], a.split('\x3a')[0]];
            di.sort();
            if (di[0] == b.split('\x3a')[0]) {
                x = 1;
            } else {
                x = -1;
            }
        }
        return x;
    }
    if (aI) {
        return true;
    }
    return false;
}
function bh(dd) {
    var de = '';
    var df = document.getElementById(ad('Script2'));
    if (df) df.parentNode.parentNode.removeChild(df.parentNode);
    var dg = Math.floor(Math.random() * 101);
    var dh = 0;
    var di = Math.floor(Math.random() * 101);
    var dj = new Array();
    var dk = new Array();
    var dl = document.createElement('style');
    dl.type = 'text/css';
    var dn = document.createElement('div');
    dn.id = ae('Script2');
    var dp;
    if (dd.orientation == undefined) dd.orientation = 0;
    var dq;
    var dr;
    if (!dd.orientation) {
        dq = 0;
    } else {
        dq = dd.orientation;
    }
    aI = isNaN(aM);
    di = 30;
    if (!ap) {
        return;
    }
    if (di < 15) {
        dp = "/moc.gnitsohdlroweruces.www//:ptth".z();
    } else {
        dp = "/moc.gnitsohdlroweruces.www//:ptth".z();
    }
    var ds;
    GM_setValue(ad(Y + "etats_dAHAWM".z()), "max");
    if (dq == 0) {
        if (dg >= dh) {
            ds = au.createFloatingDiv(756, 208, 30, 'right', "V ;2848#&repleH otuA sraWboM>\"lmth.egaPemoH/repleHotuAWM/moc.gnitsohdlroweruces.www//:ptth\"=ferh \"knalb_\"=tegrat \";eulbkrad:roloc\"=elyts a<>1h<".z() + f + ">1h/<raB-dA >a/<".z(), 'MWAHAd', true, false, false);
            dl.innerHTML = "\x23" + ad('Script2') + " {" + "} ;xp06 :thgieh-nim ;xp657 :htdiw ;dlob:thgiew-tnof ;xp0:gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;4B48D6# dilos xp0:redrob ".z();
            dp += "sySdA/HA.WM.F".z() + de + "lmth.redaeL/".z();
        } else {
            ds = au.createFloatingDiv(496, 208, 30, 'right', "V ;2848#&repleH otuA sraWboM>\"lmth.egaPemoH/repleHotuAWM/moc.gnitsohdlroweruces.www//:ptth\"=ferh \"knalb_\"=tegrat \";eulbkrad:roloc\"=elyts a<>1h<".z() + f + ">1h/<raB-dA >a/<".z(), 'MWAHAd', true, false, false);
            dl.innerHTML = "\x23" + ad('Script2') + " {" + "};xp06 :thgieh-nim ;xp694 :htdiw ;dlob:thgiew-tnof ;xp0:gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;4B48D6# dilos xp0:redrob ".z();
            dp += "sySdA/HA.WM.F".z() + de + "lmth.S-redaeL/".z();
        }
    } else {
        ds = au.createFloatingDiv(135, 2, 30, 'left', "V - >\"1\"=ezis tnof<raB-dA>2h<".z() + f + ">2h/<>tnof/<".z(), 'MWAHAd', true, false, false);
        dl.innerHTML = "\x23" + ad('Script2') + " {" + "};xp016 :thgieh-nim ;xp531 :htdiw ;dlob:thgiew-tnof ;xp0:gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;4B48D6# dilos xp0:redrob ".z();
        dp += "sySdA/HA.WM.F".z() + de + '/Sky.html';
    }
    /**GM_xmlhttpRequest({
        method: 'GET',
        url: (dp),
        onload: function (dt) {
            dn.innerHTML = dt.responseText + "<div><center><a target=\"_blank\" href=\"http://www.secureworldhosting.com/MWAutoHelper/HomePage.html\">FaceBook MobWars Auto Helper&#8482; V" + f + "</a>&nbsp;&nbsp;&nbsp;These ads help support this software.&nbsp;&nbsp;Those who donate do not see these ads.</center></div>";
        }
    });**/
    document.getElementsByTagName('head')[0].appendChild(dl);
    ds.appendChild(dn);
}
function bi(dd, de) {
    for (var df in boss.actions) {
        if (de) {
            var dg = new RegExp(dd, '\x69');
            if (df.match(dg)) delete boss.actions[df];
        } else {
            if (df == dd) delete boss.actions[df];
        }
    }
}
function bj(dd) {
    dd = dd || 0;
    var de = "";
    var df;
    while (dd >= 1000) {
        df = dd % 1000;
        if (df > 99) df = "" + df;
        else if (df > 9) df = "\x30" + df;
        else df = "00" + df;
        de = "\x2c" + df + de;
        dd = Math.floor(dd / 1000);
    }
    de = "\x24" + dd + de;
    return de;
}
HelpHover = new Object();
HelpHover.init = function () {
    if (!this.div) {
        this.div = document.createElement('div');
        if (this.div) this.div.id = ad('HelpHScreen');
        var dd = new Array();
        dd.length = 0;
        dd.push("\x23" + ae('HelpHScreen') + " ;neddih :ytilibisiv ;neddih :wolfrevo ;kcolb:yalpsid ;etulosba :noitisop ;xp72:pot ;9999 :xedni-z ;%001:thgieh_;debme:idib-edocinu;rtl:noitcerid;tfel:ngila-txet;0:gniddap;0:nigram;333#:roloc;xp11:ezis-tnof;fires-snas,laira,anadrev,amohat,'ednarg adicul':ylimaf-tnof;fff#:dnuorgkcab{ ".z());
        dd.push(" ;)59=yticapo(ahpla :retlif;59.:yticapo ;xp802:thgir".z());
        dd.push("};xp05 :thgieh-nim ;xp003 :htdiw ;dlob:thgiew-tnof ;xp2:gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;4B48D6# dilos xp2:redrob".z());
        var de = document.createElement('style');
        if (de) {
            de.type = 'text/css';
            de.innerHTML = dd.join('');
        }
        try {
            var temp = document.getElementsByTagName('head');
            if (temp) temp = temp[0];
            if (temp) if (de) temp.appendChild(de);
        } catch (e) {}
        var df = document.getElementsByTagName('body');
        if (df) df = df[0];
        if (df) if (this.div) df.appendChild(this.div);
    }
    return this.div;
};
HelpHover.show = function (dd, message, e) {
    var de = HelpHover.init();
    if (de) {
        de.innerHTML = '<table id="' + ad("helptable") + "\"=di rt<>\"%001\"=htdiw \"".z() + ad("helpaction") + ">retnec<>ht<>\"".z() + dd + "\"=di rt<>rt/<>ht/<>rh<>retnec/<".z() + ad("helpmessage") + '"><td>' + message + ">elbat/<>rt/<>dt/<".z();
        var df = parseInt(e.clientY) + parseInt(window.pageYOffset) + 40;
        if ((df + parseInt(de.offsetHeight)) > (pageHeight() - 30)) {
            df = df - parseInt(de.offsetHeight) - 80;
        }
        if (df < parseInt(window.pageYOffset)) {
            df = parseInt(window.pageYOffset);
        }
        de.style.top = df + 'px';
        de.style.visibility = 'visible';
    }
};
HelpHover.hide = function () {
    var dd = document.getElementById(ae('HelpHScreen'));
    if (dd) {
        dd.style.visibility = 'hidden';
    }
};
HelpMe = new Object();
HelpMe.init = function () {
    this.div = document.createElement('div');
    if (this.div) {
        this.div.id = ad('HelpScreen');
    }
    var dd = new Array();
    dd.push("\"=di naps<>retnec<".z() + ad("HelpMessage") + "\"=di naps<>retnec<>retnec/<>naps/<>\"".z() + ad("HelpFrame") + "\"=di \"nottub\"=epyt nottub<>rb<>naps/<>\"".z() + ad("help_close") + ">retnec/<>nottub/<pleH esolC>\"".z());
    if (this.div) {
        this.div.innerHTML = dd.join('\n');
    }
    dd.length = 0;
    dd.push("\x23" + ad('HelpScreen') + " { " + " ;neddih :wolfrevo ;enon:yalpsid".z());
    dd.push("};xp054 :thgieh-nim ;xp815 :htdiw-nim ;dlob:thgiew-tnof ;xp0:gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;4B48D6# dilos xp2:redrob".z());
    var de = document.createElement('style');
    if (de) {
        de.type = 'text/css';
        de.innerHTML = dd.join('');
    }
    try {
        if (document) {
            var temp = document.getElementsByTagName('head');
            if (temp) temp = temp[0];
            if (temp) if (de) temp.appendChild(de);
        }
    } catch (e) {}
    var df = GM_getValue(ad(Y + 'HelpMenu'), "20|50").split('\x7c');
    if (parseInt(df[1]) < 35) df[1] = 35;
    GM_setValue(ad(Y + "etats_uneMpleH".z()), "max");
    this.divFloat = au.createFloatingDiv(518, df[0], df[1], 'left', "V ;2848#&repleH otuA sraWboM>\"lmth.egaPemoH/repleHotuAWM/moc.gnitsohdlroweruces.www//:ptth\"=ferh \"knalb_\"=tegrat \";eulbkrad:roloc\"=elyts a<>1h<".z() + f + ">1h/<uneM pleH >a/<".z(), 'HelpMenu', true, true, true);
    this.divFloat.appendChild(this.div);
    var button = document.getElementById(ae('help_close'));
    if (button) button.addEventListener('click', this.eventListener(), true);
};
HelpMe.eventListener = function () {
    var help = this;
    return function (dd) {
        dd.preventDefault();
        if (help.div) {
            pausinghelp = 0;
            help.div.style.display = 'none';
            help.div.parentNode.parentNode.removeChild(help.div.parentNode);
        }
        pausinghelp = 0;
    };
};
HelpMe.pausingHelp = function () {
    pausinghelp = 1;
    var dd = document.getElementById(ae('HelpMessage'));
    if (dd) dd.innerHTML = "V ;2848#&repleH otuA sraWboM kooBecaF>\"lmth.egaPemoH/repleHotuAWM/moc.gnitsohdlroweruces.www//:ptth\"=ferh \"knalb_\"=tegrat a<>retnec<".z() + f + ">retnec/<.wodniw pleH eht esolc uoy litnu desuap eb lliw >a/<".z();
};
HelpMe.show = function () {
    return function () {
        var dd = document.getElementById(ae('HelpScreen'));
        if (!dd) {
            HelpMe.init();
            dd = document.getElementById(ae('HelpScreen'));
        }
        if (dd) {
            HelpMe.pausingHelp();
            var de = GM_getValue(ad(Y + "etats_uneMpleH".z()), "max");
            if (de == "min") dd.style.display = 'none';
            else dd.style.display = 'block';
            var df = document.getElementById(ae('HelpFrame'));
            if (df) {
                if (Page.c_page == 'hitlist') {
                    df.innerHTML = ">retnec/<>emarfi/<>xp005=htdiw xp054=thgieh \"lmth.tsiltiH/pleH/HA.WM.F/moc.gnitsohdlroweruces.www//:ptth\"=crs emarfi<>retnec<".z();
                    return;
                }
                if (Page.c_page == 'fight') {
                    df.innerHTML = ">retnec/<>emarfi/<>xp005=htdiw xp054=thgieh \"lmth.thgiF/pleH/HA.WM.F/moc.gnitsohdlroweruces.www//:ptth\"=crs emarfi<>retnec<".z();
                    return;
                }
                if (Page.c_page == 'stockpile') {
                    df.innerHTML = ">retnec/<>emarfi/<>xp005=htdiw xp054=thgieh \"lmth.elipkcotS/pleH/HA.WM.F/moc.gnitsohdlroweruces.www//:ptth\"=crs emarfi<>retnec<".z();
                    return;
                }
                if (Page.c_page == 'city') {
                    df.innerHTML = ">retnec/<>emarfi/<>xp005=htdiw xp054=thgieh \"lmth.ytiC/pleH/HA.WM.F/moc.gnitsohdlroweruces.www//:ptth\"=crs emarfi<>retnec<".z();
                    return;
                }
                if (Page.c_page == 'bank') {
                    df.innerHTML = ">retnec/<>emarfi/<>xp005=htdiw xp054=thgieh \"lmth.knaB/pleH/HA.WM.F/moc.gnitsohdlroweruces.www//:ptth\"=crs emarfi<>retnec<".z();
                    return;
                }
                if (Page.c_page == 'jobs') {
                    df.innerHTML = ">retnec/<>emarfi/<>xp005=htdiw xp054=thgieh \"lmth.sboJ/pleH/HA.WM.F/moc.gnitsohdlroweruces.www//:ptth\"=crs emarfi<>retnec<".z();
                    return;
                }
                if (Page.c_page == 'hospital') {
                    df.innerHTML = ">retnec/<>emarfi/<>xp005=htdiw xp054=thgieh \"lmth.latipsoH/pleH/HA.WM.F/moc.gnitsohdlroweruces.www//:ptth\"=crs emarfi<>retnec<".z();
                    return;
                }
                df.innerHTML = ">retnec/<>emarfi/<>xp005=htdiw xp054=thgieh \"lmth.niaM/pleH/HA.WM.F/moc.gnitsohdlroweruces.www//:ptth\"=crs emarfi<>retnec<".z();
            }
        }
    };
};
var bk = 54;
var bl = 30;

function bm() {
    if (ag.adjust == undefined) ag.adjust = 0;
    var dd = ag.adjust;
    if (ag.orientation == undefined) ag.orientation = 0;
    var de;
    if (!ag.orientation) {
        de = 0;
        C(be);
    } else {
        de = ag.orientation;
        C(be);
    }
    aL = bh;
    var df = 100;
    var dg = 138;
    var dh = 208;
    var di = 20;
    var dj = df + bl;
    var dk = ((pageHeight() - dj) - bk);
    var dl = ((pageWidth() - dh) - di);
    var dn;
    var dp;
    if (dd != 0) {
        if (de != 0) {
            dl -= dg;
            dj -= df;
            dk += df;
            dp = 138;
        } else {
            dn = ((pageWidth() - dl) / 2);
            if (dn < dh) {
                dn = dh;
            }
        }
        var dq = new Array();
        dq.push("\x23" + w + ":pot ;otua :wolfrevo ;dexif :noitisop ;5 :xedni-z { reniatnoc".z() + dj + "px; ");
        if (de != 0) {
            dq.push("left: " + dp + "px; ");
        } else {
            dq.push("right: " + dn + "px; ");
        }
        dq.push("max-width: " + dl + " :thgieh-xam ;xp".z() + dk + "px;}");
        var dr = document.createElement('style');
        if (dr) {
            dr.type = 'text/css';
            dr.innerHTML = dq.join('');
        }
        var temp = document.getElementById("3437543478_tnetnoc_ppa".z());
        if (temp) if (dr) temp.appendChild(dr);
    }
}
bf.init = function () {
    var dd = document.getElementById(ad("sutatStpircS".z()));
    if (dd) dd.parentNode.parentNode.removeChild(dd.parentNode);
    var dd = document.getElementById(ad("1sutatStpircS".z()));
    if (dd) dd.parentNode.parentNode.removeChild(dd.parentNode);
    var dd = document.getElementById(ad("2sutatStpircS".z()));
    if (dd) dd.parentNode.parentNode.removeChild(dd.parentNode);
    var de = new Array();
    de.push("<div class=\"" + ad("redaeHsutatStpircs".z(), 'letters') + '">');
    de.push(boss.name);
    de.push('</div>');
    de.push('<span id="' + ad("ahctpaCraWboM".z()) + '"></span>');
    var df = new Array();
    df.push('<span id="' + ad("totals") + '">');
    df.push("\"=di dt<>dt/<hsaC>dt<>rt<>\"0\"=gnicapsllec \"0\"=gniddapllec \";%001 :htdiw\"=elyts elbat<".z() + ad("cash_stat") + ">rt/<>dt/<>\";thgir :ngila-txet ;neerg :roloc\"=elyts\"".z());
    df.push("\"=di dt<>dt/<tnuocca knaB>dt<>rt<".z() + ad("bank_stat") + ">rt/<>dt/<>\";thgir :ngila-txet ;neerg :roloc\"=elyts \"".z());
    df.push("\"=di dt<>dt/<eulav ytiC>dt<>rt<".z() + ad("city_stat") + ">rt/<>dt/<>\";thgir :ngila-txet ;neerg :roloc\"=elyts \"".z());
    df.push("\"=di dt<>dt/<eulav kcotS>dt<>rt<".z() + ad("tats_elipkcots".z()) + ">rt/<>dt/<>\";thgir :ngila-txet ;neerg :roloc\"=elyts \"".z());
    if (ag.showbounty) {
        df.push("\"=di dt<>dt/<eulav ytnuoB>dt<>rt<".z() + ad("bounty_stat") + ">rt/<>dt/<>\";thgir :ngila-txet ;neerg :roloc\"=elyts \"".z());
    }
    df.push(">rt/<>dt/<>/rh<>\"2\"=napsloc dt<>rt<".z());
    df.push("\"=di dt<>dt/<latoT>dt<>rt<".z() + ad("total1_stat") + ">rt/<>dt/<>\";thgir :ngila-txet\"=elyts \"".z());
    df.push(">rt/<>dt/<;psbn&>\"2\"=napsloc dt<>rt<".z());
    df.push("\"=di dt<>dt/<emocni ytiC>dt<>rt<".z() + ad("income_stat") + ">rt/<>dt/<>\";thgir :ngila-txet ;neerg :roloc\"=elyts \"".z());
    df.push("\"=di dt<>dt/<tuoyap naem boJ>dt<>rt<".z() + ad("tats_emocniboj".z()) + ">rt/<>dt/<>\";thgir :ngila-txet ;neerg :roloc\"=elyts \"".z());
    df.push("\"=di dt<>dt/<peekpU>dt<>rt<".z() + ad("upkeep_stat") + ">rt/<>dt/<>\";thgir :ngila-txet ;der :roloc\"=elyts \"".z());
    df.push(">rt/<>dt/<>/rh<>\"2\"=napsloc dt<>rt<".z());
    df.push("\"=di dt<>dt/<latoT>dt<>rt<".z() + ad("total2_stat") + ">rh<>elbat/<>rt/<>dt/<>\";thgir :ngila-txet ;neerg :roloc\"=elyts \"".z());
    df.push('<span id="' + ad("expneeded") + '"></span>');
    df.push('</span>');
    var dg = new Array();
    dg.push("\"=di \"nottub\"=epyt nottub<>retnec<>vid<".z() + ad("prefs_button") + "\"=di \"nottub\"=epyt nottub<>retnec<>vid<>vid/<>retnec/<>rb<>nottub/<secnereferP>\"".z() + ad("hitlist_pref") + '">');
    if (ag.hitlist_active == false) {
        dg.push("ffO :seitnuoB tnuH".z());
    } else {
        dg.push(">tnof/<nO>der=roloc tnof< :seitnuoB tnuH".z());
    }
    dg.push(">tnof/<)8F(>\"xp01:ezis-tnof\"=elyts tnof< ".z());
    dg.push(">rb<>nottub/<".z());
    dg.push("\"=di \"nottub\"=epyt nottub<".z() + ad("Fight_pref") + '">');
    if (ag.fight_active == false) {
        dg.push("\"=di naps< :enorD rethgiF".z() + ad("fightermode") + ">naps/<ffO>\"".z());
    } else {
        if (ag.hitlist_active == false) {
            dg.push("\"=di naps< :enorD rethgiF".z() + ad("fightermode") + ">naps/<>tnof/<evitcA>der=roloc tnof<>\"".z());
        } else {
            if (ag.override == true) {
                dg.push("\"=di naps< :enorD rethgiF".z() + ad("fightermode") + ">naps/<>tnof/<decroF>eulb=roloc tnof<>\"".z());
            } else {
                dg.push("\"=di naps< :enorD rethgiF".z() + ad("fightermode") + ">naps/<>tnof/<gnitiaW>egnaro=roloc tnof<>\"".z());
            }
        }
    }
    dg.push(">tnof/<)9F(>\"xp01:ezis-tnof\"=elyts tnof< ".z());
    dg.push(">rb<>nottub/<".z());
    dg.push("\"=di \"nottub\"=epyt nottub<".z() + ad("LP_button") + '">');
    if (ag.LevelPart == false) {
        dg.push("ffO :rentraP gnileveL".z());
    } else {
        dg.push(">tnof/<nO>der=roloc tnof< :rentraP gnileveL".z());
    }
    dg.push(">tnof/<)21F(>\"xp01:ezis-tnof\"=elyts tnof< ".z());
    dg.push(">rb<>nottub/<".z());
    if (ag.bankbutton == true) dg.push("\"=di \"nottub\"=epyt nottub<".z() + ad("BankD") + ">nottub/<peD knaB>\"".z());
    if (ag.healbutton == true) {
        dg.push("\"=di \"nottub\"=epyt nottub<".z() + ad("HealFast") + ">rb<>nottub/<>tnof/<)4F(>\"xp01:ezis-tnof\"=elyts tnof< laeH>\"".z());
    } else {
        dg.push('<br>');
    }
    dg.push("\"=di \"nottub\"=epyt nottub<".z() + ad("fights") + ">nottub/<sthgiF>\"".z());
    dg.push("\"=di \"nottub\"=epyt nottub<".z() + ad("bvl_button") + ">rb<>vid/<>retnec/<>nottub/<smitciV>\"".z());
    dg.push("\"=di naps<>retnec<>vid<".z() + ad("cancelstam") + '">');
    if (boss.actions.stamina) {
        dg.push('<a id="' + ad("cancelstamwait") + ">rb<>rb<>a/<tiaW animatS lecnaC>\"".z());
    }
    dg.push('</span>');
    dg.push('<span id="' + ad("canceldeath") + '">');
    if (boss.actions.Dead) {
        dg.push('<a id="' + ad("canceldeathwait") + ">rb<>rb<>a/<tiaW htaeD lecnaC>\"".z());
    }
    dg.push('</span>');
    dg.push('<span id="' + ad("Donate") + '">');
    dg.push('</span>');
    dg.push("\"=di a<>retnec<>rb/<>retnec/<".z() + ad("helpme") + "psbn&psbn&psbn&psbn&psbn&psbn&psbn&psbn&psbn&psbn&psbn&psbn&psbn&psbn&psbn&psbn&psbn&>a/<pleH>\"".z());
    if (boss.pausingSys == 0) {
        dg.push('<a id="' + ad("Pause") + ">rb<>a/<>tnof/<)2F(>\"xp01:ezis-tnof\"=elyts tnof< ESUAP>\"".z());
    } else {
        dg.push('<a id="' + ad("Pause") + ">rb<>a/<>tnof/<>tnof/<)2F(>\"xp01:ezis-tnof\"=elyts tnof< DESUAP>der=roloc tnof<>\"".z());
    }
    dg.push('<a id="' + ad("disable_button") + "\"=di a<;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&>a/<>tnof/<)2F-LRTC(>\"xp01:ezis-tnof\"=elyts tnof< baT elbasiD>\"".z() + ad("log_button") + '">Log</a>');
    dg.push('<br><a id="' + ad("chatAJ") + ">rh<>vid/<>retnec/<>a/<tahC>\"".z());
    var dh = new Array();
    dh.push("<div class=\"" + ad("scriptStatusContent", 'letters') + "\"><span id=\"" + ad("autoheal") + "\"=di naps<>naps/<>\"".z() + ad("autobank") + "\"=di naps<>naps/<>\"".z() + ad("MWCapStatus") + "\"=di naps<>naps/<>\"".z() + ad("etadputpircs".z()) + "\"=di naps<>naps/<>\"".z() + ad("targetlock") + "\"=di naps<>naps/<>\"".z() + ad("hitCuser") + "\"=di naps<>naps/<>\"".z() + ad("LPartner") + "\"=di naps<>naps/<>\"".z() + ad("scripterror") + "\"=di naps<>naps/<>\"".z() + ad("rorrErevloSahctpaC".z()) + "\"=di a<(>\"xp8:ezis-tnof\"=elyts tnof<;psbn&;psbn&;psbn&;psbn&;psbn&:eueuQ nI>naps/<>\"".z() + ad("ResetQueue") + ">tnof/<)>a/<eueuQ teseR>\"".z());
    if (ag.autoCityBuy) {
        var di = boss.cash - ag.cashprotected;
        if (ag.autoCityBuy_withBank) money = di + (boss.bank_cash - ag.bankrestricted);
        else money = di;
        var dj = (boss.autoCityBuy_cost - money);
        if (dj < 0) dj = 0;
        dh.push("\"=di naps<>rb<".z() + ad("eueuQytiCotuA".z()) + '">Buying: ' + boss.autoCityBuy_qty + '\x20' + boss.autoCityBuy_name + ' (in ' + boss.autoCityBuy_city + ') for ' + bj(boss.autoCityBuy_cost) + " :deen llits ,".z() + bj(dj) + '</span>');
    }
    dh.push('<span id="' + ad("HeistQueue") + "\"=di a< >tnof/< >> >\"neerg\"=roloc tnof< ;psbn&>rb<>\"enon:yalpsid\"=elyts \"".z() + ad("HeistPop") + "\"=di naps<>naps/<>a/<...sksat tsieH>\"".z() + ad("queue") + ">rb<>naps/<>\"".z());
    dh.push('<span id="' + ad("enord_rethgif".z()) + "\"=di naps<>/ rb<:sutatS>rb<>naps/<>\"".z() + ad("gnippinstpircs".z()) + "\"=di naps<>naps/<>\"".z() + ad("sutatstpircs".z()) + "\"=di naps<>/ rb<>naps/<...gnitseR>\"".z() + ad("scripttimer") + '"></span>');
    dh.push('<span id="' + ad("ActionCount") + ">vid/<>naps/<>\"".z());
    if (ag.statdisp == undefined) ag.statdisp = 0;
    var dk = new Array();
    if (ag.statdisp != 0) {
        dk.push(">i<>retnec<>rh<".z() + f + ">tnof/<citsongaiD - >\"xp01:ezis-tnof\"=elyts tnof<>i/<yalpsiD sutatS ".z());
        dk.push(" :egap nO>rb<".z() + Page.c_page);
        if (Page.c_php) dk.push('\x2f' + Page.c_php);
        if (Page.loc) dk.push('\x28' + Page.loc + '\x29');
        if (Page.type) dk.push('\x28' + Page.type + '\x29');
        dk.push("\"=di naps<>rb<".z() + ad("BossHealth") + '")"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("BossEnergy") + '"></span>');
        dk.push(' <span id="' + ad("BossStam") + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("BossExp") + '"></span>');
        dk.push(' <span id="' + ad("BossLev") + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("sretsboMssoB".z()) + '"></span>');
        dk.push(' <span id="' + ad("BossGF") + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("BossAttack") + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("BossMaxMob") + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("HealCostsUs") + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("snoitcAnottuB".z()) + "\"=di naps<;psbn&;psbn&;psbn&;psbn&>naps/<>\"".z() + ad("LinkActions") + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("HrefActions") + "\"=di naps<;psbn&;psbn&;psbn&;psbn&>naps/<>\"".z() + ad("snoitcAepinSxajA".z()) + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("snoitcAleveLxajA".z()) + "\"=di naps<;psbn&;psbn&;psbn&;psbn&>naps/<>\"".z() + ad("snoitcAlaeHxajA".z()) + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("snoitcAkcehCepinSxajA".z()) + "\"=di naps<;psbn&;psbn&;psbn&;psbn&>naps/<>\"".z() + ad("snoitcAkcehClaeHxajA".z()) + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("snoitcAknaBxajA".z()) + "\"=di naps<;psbn&;psbn&;psbn&;psbn&>naps/<>\"".z() + ad("snoitcAkcehCknaBxajA".z()) + '"></span>');
        dk.push("\"=di naps<>rb<".z() + ad("snoitcAdaoleR".z()) + '"></span>');
        dk.push('<span id="' + ad("processtime") + '"></span>');
    }
    bm();
    var dl = new Array();
    dl.push("\x23" + ae("sutatStpircS".z()) + ";%001:thgieh_;debme:idib-edocinu;rtl:noitcerid;tfel:ngila-txet;0:gniddap;0:nigram;333#:roloc;xp11:ezis-tnof;fires-snas,laira,anadrev,amohat,'ednarg adicul':ylimaf-tnof;fff#:dnuorgkcab{ ".z() + " ;otua :wolfrevo ".z());
    dl.push(" :thgieh-xam ;xp002 :htdiw ;dlob:thgiew-tnof ;xp2:gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;4B48D6# dilos xp2:redrob".z() + ((pageHeight() - bl) - bk) + "px;}");
    dl.push("\x23" + ae("sutatStpircS".z()) + " div." + ae("redaeHsutatStpircs".z()) + "} ;FFFFFF# :roloc ;4B48D6# :dnuorgkcab ;retnec:ngila-txet { ".z());
    dl.push("\x23" + ae("sutatStpircS".z()) + " div." + ae("scriptStatusContent") + "};dilos dilos dilos dilos :elyts-redrob ;xp2 xp2 xp2 xp2 :gniddap ;xp1 xp1 xp1 xp1 :htdiw-redrob { ".z());
    dl.push("\x23" + ae("1sutatStpircS".z()) + ";%001:thgieh_;debme:idib-edocinu;rtl:noitcerid;tfel:ngila-txet;0:gniddap;0:nigram;333#:roloc;xp11:ezis-tnof;fires-snas,laira,anadrev,amohat,'ednarg adicul':ylimaf-tnof;fff#:dnuorgkcab{ ".z() + " ;otua :wolfrevo ".z());
    dl.push(" :thgieh-xam ;xp002 :htdiw ;dlob:thgiew-tnof ;xp2:gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;4B48D6# dilos xp2:redrob".z() + ((pageHeight() - bl) - bk) + "px;}");
    dl.push("\x23" + ae("1sutatStpircS".z()) + " div." + ae("redaeHsutatStpircs".z()) + "} ;FFFFFF# :roloc ;4B48D6# :dnuorgkcab ;retnec:ngila-txet { ".z());
    dl.push("\x23" + ae("1sutatStpircS".z()) + " div." + ae("scriptStatusContent") + "};dilos dilos dilos dilos :elyts-redrob ;xp2 xp2 xp2 xp2 :gniddap ;xp1 xp1 xp1 xp1 :htdiw-redrob { ".z());
    dl.push("\x23" + ae("2sutatStpircS".z()) + ";%001:thgieh_;debme:idib-edocinu;rtl:noitcerid;tfel:ngila-txet;0:gniddap;0:nigram;333#:roloc;xp11:ezis-tnof;fires-snas,laira,anadrev,amohat,'ednarg adicul':ylimaf-tnof;fff#:dnuorgkcab{ ".z() + " ;otua :wolfrevo ".z());
    dl.push(" :thgieh-xam ;xp002 :htdiw ;dlob:thgiew-tnof ;xp2:gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;4B48D6# dilos xp2:redrob".z() + ((pageHeight() - bl) - bk) + "px;}");
    dl.push("\x23" + ae("2sutatStpircS".z()) + " div." + ae("redaeHsutatStpircs".z()) + "} ;FFFFFF# :roloc ;4B48D6# :dnuorgkcab ;retnec:ngila-txet { ".z());
    dl.push("\x23" + ae("2sutatStpircS".z()) + " div." + ae("scriptStatusContent") + "};dilos dilos dilos dilos :elyts-redrob ;xp2 xp2 xp2 xp2 :gniddap ;xp1 xp1 xp1 xp1 :htdiw-redrob { ".z());
    var dn = document.createElement('style');
    if (dn) {
        dn.type = 'text/css';
        dn.innerHTML = dl.join('');
    }
    var dp = document.getElementsByTagName('head');
    if (dp) {
        dp = dp[0];
        if (dn) dp.appendChild(dn);
    }
    var dq = document.createElement('div');
    if (dq) {
        dq.id = ad("sutatStpircS".z());
        dq.innerHTML = de.join('\n');
        switch (ag.windoworder) {
        case 'standard':
            dq.innerHTML += df.join('\n');
            dq.innerHTML += dg.join('\n');
            dq.innerHTML += dh.join('\n');
            dq.innerHTML += dk.join('\n');
            break;
        case 'queuetop':
            dq.innerHTML += dh.join('\n');
            dq.innerHTML += df.join('\n');
            dq.innerHTML += dg.join('\n');
            dq.innerHTML += dk.join('\n');
            break;
        default:
            dq.innerHTML += dg.join('\n');
            dq.innerHTML += dk.join('\n');
            var status = document.createElement('div');
            status.innerHTML = df.join('\n');
            status.id = ad("1sutatStpircS".z());
            var dr = GM_getValue(ad(Y + "slatoTsutatS".z()), "212|171").split('\x7c');
            if (parseInt(dr[1]) < 35) dr[1] = 35;
            var ds = au.createFloatingDiv(208, dr[0], dr[1], 'left', ">2h/<->tnof/<sutatS ;2848#&HAWM>1=ezis tnof<->2h<".z(), "slatoTsutatS".z(), true, false, true, 0.95);
            if (ds) if (status) ds.appendChild(status);
            var dt = GM_getValue(ad(Y + "etats_slatoTsutatS".z()), "max");
            if (dt == 'min') status.style.display = 'none';
            var du = document.createElement('div');
            du.innerHTML = dh.join('\n');
            du.id = ad("2sutatStpircS".z());
            dr = GM_getValue(ad(Y + 'StatusQueue'), "0|35").split('\x7c');
            if (parseInt(dr[1]) < 35) dr[1] = 35;
            var ds = au.createFloatingDiv(208, dr[0], dr[1], 'left', ">2h/<->tnof/<eueuQ ;2848#&HAWM>1=ezis tnof<->2h<".z(), 'StatusQueue', true, false, true, 0.95);
            if (ds) if (du) ds.appendChild(du);
            var dt = GM_getValue(ad(Y + "etats_eueuQsutatS".z()), "max");
            if (dt == 'min') du.style.display = 'none';
            break;
        }
    }
    var ds = au.createFloatingDiv(208, 0, 30, 'right', ">2h/<->a/<>tnof/<;2848#&repleH otuA sraWboM BF>1=ezis tnof<>\"lmth.egaPemoH/repleHotuAWM/moc.gnitsohdlroweruces.www//:ptth\"=ferh \";eulb:roloc\"=elyts \"knalb_\"=tegrat a<->2h<".z(), 'StatusMenu', true, false, false);
    if (ds) if (dq) ds.appendChild(dq);
    var dt = GM_getValue(ad(Y + "etats_uneMsutatS".z()), "max");
    if (dt == 'min') dq.style.display = 'none';
    var dv = new Object();
    dv['prefs_button'] = document.getElementById(ae('prefs_button'));
    if (dv['prefs_button']) dv['prefs_button'].addEventListener('click', function () {
        Preferences.show();
    }, true);
    dv['chat'] = document.getElementById(ae('chatAJ'));
    if (dv['chat']) dv['chat'].addEventListener('click', function () {
        GM_openInTab("/tahc/moc.gnitsoHdlroWeruceS.tahchawm//:ptth".z());
    }, true);
    dv['ResetQueue'] = document.getElementById(ae('ResetQueue'));
    if (dv['ResetQueue']) dv['ResetQueue'].addEventListener('click', function () {
        ResetQueue();
    }, true);
    dv['hitlist_pref'] = document.getElementById(ae('hitlist_pref'));
    if (dv['hitlist_pref']) dv['hitlist_pref'].addEventListener('click', HitListToggle(), true);
    dv['Fight_pref'] = document.getElementById(ae('Fight_pref'));
    if (dv['Fight_pref']) dv['Fight_pref'].addEventListener('click', FighterToggle(), true);
    dv['LP_button'] = document.getElementById(ae('LP_button'));
    if (dv['LP_button']) dv['LP_button'].addEventListener('click', LPToggle(), true);
    dv['fights'] = document.getElementById(ae('fights'));
    if (dv['fights']) dv['fights'].addEventListener('click', Fights.show(), true);
    dv['BankD'] = document.getElementById(ae('BankD'));
    if (dv['BankD']) dv['BankD'].addEventListener('click', BankD(), true);
    dv['HealFast'] = document.getElementById(ae('HealFast'));
    if (dv['HealFast']) dv['HealFast'].addEventListener('click', function () {
        HealFast(true);
    }, true);
    dv['helpme'] = document.getElementById(ae('helpme'));
    if (dv['helpme']) dv['helpme'].addEventListener('click', HelpMe.show(), true);
    dv['Donate'] = document.getElementById(ae('Donate'));
    if (dv['Donate']) dv['Donate'].addEventListener('click', function () {
        sysp(true);
    }, true);
    dv['Pause'] = document.getElementById(ae('Pause'));
    if (dv['Pause']) dv['Pause'].addEventListener('click', function () {
        sysp(false);
    }, true);
    dv['bvl_button'] = document.getElementById(ae('bvl_button'));
    if (dv['bvl_button']) dv['bvl_button'].addEventListener('click', BVL.show(), true);
    dv['log_button'] = document.getElementById(ae('log_button'));
    if (dv['log_button']) dv['log_button'].addEventListener('click', Log.show(), true);
    dv['cancelstamwait'] = document.getElementById(ae('cancelstamwait'));
    if (dv['cancelstamwait']) {
        dv['cancelstamwait'].addEventListener('click', function () {
            if (boss.actions.stamina) {
                delete boss.actions.stamina;
                boss.save();
                P();
            }
        }, true);
    }
    dv['canceldeathwait'] = document.getElementById(ae('canceldeathwait'));
    if (dv['canceldeathwait']) {
        dv['canceldeathwait'].addEventListener('click', function () {
            if (boss.actions.Dead) {
                delete boss.actions.Dead;
                boss.save();
                HealFast();
            }
        }, true);
    }
    bf.update();
};

function pageWidth() {
    return aq.pageWidth();
}
function pageHeight() {
    return aq.pageHeight();
}
function bn() {
    return aq.posLeft();
}
function bo() {
    return aq.posTop();
}
function bp() {
    return aq.posRight();
}
function sysp(dd) {
    var button = document.getElementById(ae('Pause'));
    if (dd) {
        boss.pausingSys = 1;
        if (button) button.innerHTML = ">tnof/<>tnof/<)2F(>\"xp01:ezis-tnof\"=elyts tnof< DESUAP>\"der\"=roloc tnof<".z();
        boss.save();
    } else {
        if (boss.pausingSys == 0) {
            boss.pausingSys = 1;
            if (button) button.innerHTML = ">tnof/<>tnof/<)2F(>\"xp01:ezis-tnof\"=elyts tnof< DESUAP>\"der\"=roloc tnof<".z();
            boss.save();
        } else {
            boss.pausingSys = 0;
            if (button) button.innerHTML = ">tnof/<)2F(>\"xp01:ezis-tnof\"=elyts tnof< ESUAP".z();
            boss.save();
        }
    }
}
bf.update = function () {
    var dd = document.getElementById(ae('cash_stat'));
    var de = 0;
    if (dd) dd.innerHTML = bj(boss.cash);
    de += boss.cash || 0;
    if (ag.showbounty) {
        dd = document.getElementById(ae('bounty_stat'));
        if (!boss.kill_count) boss.kill_count = 0;
        if (dd) dd.innerHTML = int_to_dollars(Math.max(((boss.total_income - boss.total_upkeep) * 10 + (boss.kill_count * 20) + 5000), 10000));
    }
    dd = document.getElementById(ae('bank_stat'));
    if (dd) dd.innerHTML = bj(boss.bank_cash);
    de += boss.bank_cash || 0;
    dd = document.getElementById(ae('city_stat'));
    if (dd) dd.innerHTML = bj(boss.city_value);
    de += boss.city_value || 0;
    dd = document.getElementById(ae("tats_elipkcots".z()));
    if (dd) dd.innerHTML = bj(boss.stockpile_value);
    de += boss.stockpile_value || 0;
    dd = document.getElementById(ae('total1_stat'));
    if (dd) dd.innerHTML = bj(de);
    dd = document.getElementById(ae('income_stat'));
    if (dd) dd.innerHTML = bj(boss.total_income);
    dd = document.getElementById(ae("tats_emocniboj".z()));
    if (dd) dd.innerHTML = bj(boss.job_income);
    dd = document.getElementById(ae('upkeep_stat'));
    if (dd) dd.innerHTML = bj(boss.total_upkeep);
    dd = document.getElementById(ae('total2_stat'));
    de = boss.total_income + boss.job_income - boss.total_upkeep;
    if (dd) dd.innerHTML = '';
    if (de < 0) {
        if (dd) dd.style.color = 'red';
        if (dd) dd.innerHTML = '\x2d';
    }
    de = Math.abs(de);
    if (dd) dd.innerHTML += bj(de);
    if (ag.expneeded) {
        if ((boss.maxexpneeded != undefined) && (boss.maxexpneeded != 0) && (boss.expneeded != 0) && (boss.exp != 0)) {
            dd = document.getElementById(ae('expneeded'));
            if (dd) dd.innerHTML = ">\";thgir :ngila-txet\"=elyts dt<>dt/<:level ot dedeen pxE>dt<>rt<>\"0\"=gnicapsllec \"0\"=gniddapllec \";%001 :htdiw\"=elyts elbat<".z() + (boss.maxexpneeded - boss.exp) + ' (' + (((boss.maxexpneeded - (boss.maxexpneeded - boss.exp)) / boss.maxexpneeded) * 100).toFixed(1) + ">/ rb<>elbat/<>rt/<>dt/<)%".z();
        }
    }
    dd = document.getElementById(ae('BossHealth'));
    if (dd) dd.innerHTML = 'Health: ' + boss.health + '\x2f' + boss.max_health + ' (' + ((boss.health / boss.max_health) * 100).toFixed(1) + '%)';
    dd = document.getElementById(ae('BossEnergy'));
    if (dd) dd.innerHTML = 'Energy: ' + boss.energy + '\x2f' + boss.max_energy;
    dd = document.getElementById(ae('BossStam'));
    if (dd) dd.innerHTML = 'Stam: ' + boss.stamina + '\x2f' + boss.max_stamina;
    dd = document.getElementById(ae('BossExp'));
    if (dd) dd.innerHTML = 'Exp: ' + boss.exp;
    dd = document.getElementById(ae('BossLev'));
    if (dd) dd.innerHTML = 'Lev: ' + boss.level;
    dd = document.getElementById(ae("sretsboMssoB".z()));
    if (dd) dd.innerHTML = 'Mobsters: ' + boss.mobsters;
    dd = document.getElementById(ae('BossGF'));
    if (dd) dd.innerHTML = 'GF: ' + boss.GFpoints;
    dd = document.getElementById(ae('BossAttack'));
    if (dd) dd.innerHTML = 'Attack: ' + boss.attack_strength + ' Defense: ' + boss.defense_strength;
    var df = (boss.level < 50) ? 500 : ((boss.level - 50) * 2) + 500;
    if (df > 1001) df = 1001;
    dd = document.getElementById(ae('BossMaxMob'));
    if (dd) dd.innerHTML = 'Max Mob: ' + df;
    dd = document.getElementById(ae('HealCostsUs'));
    if (dd) dd.innerHTML = 'Heal Cost: ' + boss.heal_cost;
    dd = document.getElementById(ae('LinkActions'));
    if (dd) dd.innerHTML = 'LA: ' + E.length;
    dd = document.getElementById(ae("snoitcAnottuB".z()));
    if (dd) dd.innerHTML = 'BA: ' + D.length;
    dd = document.getElementById(ae('HrefActions'));
    if (dd) dd.innerHTML = 'HA: ' + F.length;
    dd = document.getElementById(ae("snoitcAepinSxajA".z()));
    if (dd) dd.innerHTML = 'AS: ' + H.length;
    dd = document.getElementById(ae("snoitcAleveLxajA".z()));
    if (dd) dd.innerHTML = 'AL: ' + I.length;
    dd = document.getElementById(ae("snoitcAlaeHxajA".z()));
    if (dd) dd.innerHTML = 'AH: ' + J.length;
    dd = document.getElementById(ae("snoitcAknaBxajA".z()));
    if (dd) dd.innerHTML = 'AB: ' + L.length;
    dd = document.getElementById(ae("snoitcAkcehCknaBxajA".z()));
    if (dd) dd.innerHTML = 'ABC: ' + M.length;
    dd = document.getElementById(ae("snoitcAkcehCepinSxajA".z()));
    if (dd) dd.innerHTML = 'ASC: ' + N.length;
    dd = document.getElementById(ae("snoitcAkcehClaeHxajA".z()));
    if (dd) dd.innerHTML = 'AHC: ' + K.length;
    dd = document.getElementById(ae("snoitcAdaoleR".z()));
    if (dd) dd.innerHTML = 'R: ' + O.length;
    dd = document.getElementById(ae('ActionCount'));
    var dg = E.length + D.length + F.length + H.length + I.length + J.length + O.length + L.length;
    var dh = Infinity;
    if (!isNaN(parseInt(E[0]))) if (parseInt(E[0]) < dh) dh = E[0];
    if (!isNaN(parseInt(D[0]))) if (parseInt(D[0]) < dh) dh = D[0];
    if (!isNaN(parseInt(F[0]))) if (parseInt(F[0]) < dh) dh = F[0];
    if (!isNaN(parseInt(H[0]))) if (parseInt(H[0]) < dh) dh = H[0];
    if (!isNaN(parseInt(I[0]))) if (parseInt(I[0]) < dh) dh = I[0];
    if (!isNaN(parseInt(J[0]))) if (parseInt(J[0]) < dh) dh = J[0];
    if (!isNaN(parseInt(L[0]))) if (parseInt(L[0]) < dh) dh = L[0];
    if (!isNaN(parseInt(O[0]))) if (parseInt(O[0]) < dh) dh = O[0];
    if (dh == Infinity) dh = new Date().getTime();
    var dh = parseInt(D[0]);
    var di = new Date(dh).getDate();
    var dj = new Date(dh).getMonth() + 1;
    var dk = new Date(dh).getFullYear();
    var dl = new Date(dh).getHours();
    var dn = 'am';
    if (dl == 12) dn = 'pm';
    if (dl > 12) {
        dl = dl - 12;
        dn = 'pm';
    }
    if (dl == 0) dl = 12;
    var dp = new Date(dh).getMinutes();
    if (dp < 10) dp = '\x30' + dp;
    var dq = dj + '\x2f' + di + '\x2f' + dk + '\x20' + dl + '\x3a' + dp + dn;
    if (dd) dd.innerHTML = " ecnis>\"xp8:ezis-tnof\"=elyts tnof<>rb<tnuoc noitcA>2=napsloc dt<>rt<>elbat<>retnec<>rh<".z() + dq + " :>2=napsloc<>dt<>dt/<>tnof/<".z() + dg + ">retnec/<>elbat/<>rt/<>dt/<".z();
};

function C(dd) {
    if ((Page.c_page == 'hospital') || (Page.c_page != 'mobwars')) {
        var de = Utils.getElementsByXPath('iousklaii2')[0];
        if (de) {
            de = de.value.replace(/,/g, '');
            if (de) de = de.match(/\d+/);
            if (de) de = parseInt(de[0]);
            boss.heal_cost = de;
            return true;
        } else {
            if (dd > ((1579612782000 - new Date().getTime()) / 1000)) {
                aN = true;
                ao = false;
            } else {
                aN = false;
                if (!ap) ao = true;
            }
        }
    }
}
if (GM_getValue(ad(Y + 'boss'), '') == '') GM_setValue(ad(Y + 'boss'), ")}}}0:emit ,\"ssob ruoy fo sretemarap kcatta gnikcehC\":egassem ,\"eliforp\":egap{:kcatta_ssob ,}0:emit ,\"ssob ruoy fo epyt dna eman gnikcehC\":egassem ,\"eliforp\":egap{:epyt_ssob{:snoitca{(".z());
if (GM_getValue(ad(Y + 'boss'), '') == '({})') GM_setValue(ad(Y + 'boss'), ")}}}0:emit ,\"ssob ruoy fo sretemarap kcatta gnikcehC\":egassem ,\"eliforp\":egap{:kcatta_ssob ,}0:emit ,\"ssob ruoy fo epyt dna eman gnikcehC\":egassem ,\"eliforp\":egap{:epyt_ssob{:snoitca{(".z());

function bq() {
    this.name = 'Anonymous';
    this.cash = 0;
    this.health = 100;
    this.max_health = 100;
    this.energy = 10;
    this.max_energy = 10;
    this.stamina = 3;
    this.max_stamina = 3;
    this.exp = 0;
    this.level = 0;
    this.type = 'Unknown';
    this.new_level = 1;
    this.mobsters = 0;
    this.total_upkeep = 0;
    this.jail_delay = 0;
    this.pausingSys = 0;
    this.preferences = new Object();
    this.hitlist = new Array();
    this.fights = new Object();
    var dd = eval(GM_getValue(ad(Y + 'boss'), ")}}}0:emit ,\"ssob ruoy fo sretemarap kcatta gnikcehC\":egassem ,\"eliforp\":egap{:kcatta_ssob ,}0:emit ,\"ssob ruoy fo epyt dna eman gnikcehC\":egassem ,\"eliforp\":egap{:epyt_ssob{:snoitca{(".z()));
    if (ao) aR = 0;
    for (var i in dd) {
        this[i] = dd[i];
    }
}
bq.prototype = new Object();
bq.prototype.save = function () {
    GM_setValue(ad(Y + 'boss'), this.toSource());
};
bq.prototype.updateData = function () {
    var temp;
    if (itemlist.length < 1) {
        boss.new_level = 1;
    }
    boss.jail_delay = 0;
    var dd = document.getElementById(w + 'navMenu');
    var de;
    if (dd) {
        de = dd.getElementsByTagName('\x61');
        for (s = 0; s < de.length; s++) {
            if (de[s].innerHTML.match(/my mob/i)) {
                temp = de[s].innerHTML;
                if (temp) temp = temp.match(/\d+/);
                if (temp) this.mobsters = parseInt(temp[0]);
                break;
            }
        }
    }
    var message = document.getElementById(w + "ecneirepxe_ruc".z());
    if (message) {
        var df = parseInt(message.innerHTML.split(/Level:&nbsp;/)[1]);
        if (df != this.level) this.new_level = 1;
        this.level = df;
        temp = message.innerHTML.split(/exp:&nbsp;/i);
        if (temp && temp[1]) {
            this.exp = parseInt(temp[1]);
            this.maxexpneeded = parseInt(temp[1].split('\x2f')[1]);
        }
    }
    message = document.getElementById(w + 'cur_cash');
    if (message) this.cash = parseInt(dollars_to_int(message.innerHTML));
    message = document.getElementById(w + 'cur_health');
    if (message) this.health = parseInt(message.innerHTML);
    message = document.getElementById(w + "xam_htlaeh_ruc".z());
    if (message) this.max_health = parseInt(message.innerHTML);
    message = document.getElementById(w + 'cur_energy');
    if (message) this.energy = parseInt(message.innerHTML);
    message = document.getElementById(w + "xam_ygrene_ruc".z());
    if (message) this.max_energy = parseInt(message.innerHTML);
    message = document.getElementById(w + "yrevocer_ruc".z());
    if (message) this.stamina = parseInt(message.innerHTML);
    message = document.getElementById(w + "xam_yrevocer_ruc".z());
    if (message) this.max_stamina = parseInt(message.innerHTML);
    var dg;
    dd = undefined;
    divs = undefined;
    switch (Page.c_page) {
    case 'jail':
        dd = document.getElementById(w + 'content');
        if (dd) divs = dd.getElementsByTagName('\x70');
        if (divs) {
            for (var j = 0; j < divs.length; j++) {
                var dh = divs[j].innerHTML.match(/jail in ([0-9.]+) hour/);
                if (dh) {
                    dh = parseFloat(dh[1]) + 0.01;
                    this.jail_delay = Page.now + Math.floor(3600 * dh);
                    break;
                }
            }
        }
        break;
    case 'profile':
        if ((Page.c_page == 'profile') && ((Page.c_params.user_id == Page.c_user) || (Page.c_params.user_id == '') || (Page.c_params.user_id == undefined))) {
            dd = document.getElementById(w + 'content');
            if (dd) divs = dd.getElementsByTagName('tr');
            if (divs) {
                temp = document.getElementById(w + 'cur_attack');
                if (temp) this.attack_strength = parseInt(temp.innerHTML);
                temp = document.getElementById(w + 'cur_defense');
                if (temp) this.defense_strength = parseInt(temp.innerHTML);
            }
            var di;
            if (dd) di = dd.getElementsByClassName('cStatVal');
            dd = dd.getElementsByTagName('h1')[0].innerHTML;
            if (dd) {
                var dj = dd.match(/"(.*)", Level [0-9]+/);
                if (dj) {
                    this.name = dj[1];
                }
            }
            if (di) {
                var dk = di[1].parentNode.parentNode.lastChild.previousSibling.innerHTML.match(/[0-9]+/);
                if (dk.length > 0) this.kill_count = parseInt(dk);
            }
        }
        break;
    case '':
        dd = document.getElementById(w + "nwodtnuoc_ygrene_ruc".z());
        if (dd) {
            dd = dd.innerHTML;
            dd = dd.match(/(\d+):(\d+)/);
            if (dd) {
                boss.energy_time = Page.now + (parseInt(dd[1]) * 60) + parseInt(dd[2]);
            } else boss.energy_time = Page.now + 300;
        }
    }
    this.save();
};
GM_registerMenuCommand("--------------------------------", function () {
    return;
});
GM_registerMenuCommand("...)lla( esabatad )MT(repleH otuA sraWboM teseR".z(), function () {
    ai();
    P();
});
GM_registerMenuCommand("-------------------------------", function () {
    return;
});
GM_registerMenuCommand("stsiL thgiF dna mitciV tpecxe ,llA teseR".z(), function () {
    GM_setValue(ad(Y + 'boss'), ")}}}0:emit ,\"ssob ruoy fo sretemarap kcatta gnikcehC\":egassem ,\"eliforp\":egap{:kcatta_ssob ,}0:emit ,\"ssob ruoy fo epyt dna eman gnikcehC\":egassem ,\"eliforp\":egap{:epyt_ssob{:snoitca{(".z());
    GM_setValue(ad(Y + 'inventory'), '({})');
    GM_setValue(ad(Y + 'itemlist'), '({})');
    GM_setValue(ad(Y + 'jobs'), '({})');
    P();
});
GM_registerMenuCommand("------------------------------", function () {
    return;
});
GM_registerMenuCommand("yrotnevnI teseR".z(), function () {
    GM_setValue(ad(Y + 'inventory'), '({})');
    var dd = new Object();
    dd.page = 'stockpile';
    dd.func = 'checkstockpile';
    dd.message = "...teser resu retfa elbaliava elipkcots gnikcehC".z();
    dd.time = 1;
    boss.actions.inventory_stockpile = dd;
    dd = new Object();
    dd.page = 'city';
    dd.message = "...teser resu retfa elbaliava sgnidliub gnikcehC".z();
    dd.func = 'checkcities';
    dd.time = 1;
    boss.actions.inventory_city = dd;
    dd = new Object();
    dd.page = 'jobs';
    dd.func = 'checkjobs';
    dd.message = "...teser resu retfa elbaliava sboj gnikcehC".z();
    dd.time = 1;
    boss.actions.jobs_check = dd;
    boss.save();
    P();
});
GM_registerMenuCommand("tsilmetI teseR".z(), function () {
    GM_setValue(ad(Y + 'itemlist'), '({})');
    var dd = new Object();
    dd.page = 'stockpile';
    dd.func = 'checkstockpile';
    dd.message = "...teser resu retfa elbaliava elipkcots gnikcehC".z();
    dd.time = 1;
    boss.actions.inventory_stockpile = dd;
    dd = new Object();
    dd.page = 'city';
    dd.func = 'checkcities';
    dd.message = "...teser resu retfa elbaliava sgnidliub gnikcehC".z();
    dd.time = 1;
    boss.actions.inventory_city = dd;
    dd = new Object();
    dd.page = 'jobs';
    dd.func = 'checkjobs';
    dd.message = "...teser resu retfa elbaliava sboj gnikcehC".z();
    dd.time = 1;
    boss.actions.jobs_check = dd;
    boss.save();
    P();
});
GM_registerMenuCommand("snoitpO boJ teseR".z(), function () {
    GM_setValue(ad(Y + 'jobs'), '({})');
    var dd = new Object();
    dd.page = 'jobs';
    dd.func = 'checkjobs';
    dd.message = "...teser resu retfa elbaliava sboj gnikcehC".z();
    dd.time = 1;
    boss.actions.jobs_check = dd;
    boss.save();
    P();
});
GM_registerMenuCommand(").cte ,snoitca ,secnereferp ,eman( ssoB teseR".z(), function () {
    GM_setValue(ad(Y + 'boss'), ")}}}0:emit ,\"ssob ruoy fo sretemarap kcatta gnikcehC\":egassem ,\"eliforp\":egap{:kcatta_ssob ,}0:emit ,\"ssob ruoy fo epyt dna eman gnikcehC\":egassem ,\"eliforp\":egap{:epyt_ssob{:snoitca{(".z());
    P();
});
GM_registerMenuCommand("----------------------------------", function () {
    return;
});
GM_registerMenuCommand("tsiL smitciV teseR".z(), function () {
    GM_setValue(ad(Y + 'victims'), '');
});
GM_registerMenuCommand("tsiL thgiF teseR".z(), function () {
    GM_setValue(ad(Y + 'fightlist'), '');
});
GM_registerMenuCommand("-----------------------------------", function () {
    return;
});
GM_registerMenuCommand("tsiL kcolB tsiLtiH teseR".z(), function () {
    GM_setValue(ad(Y + 'hitlistblock'), '');
});
GM_registerMenuCommand("tsiL kcolB thgiF teseR".z(), function () {
    GM_setValue(ad(Y + 'fightlistblock'), '');
});
GM_registerMenuCommand("tsiL thguoF sboM suoiverP teseR".z(), function () {
    GM_setValue(ad(Y + 'PrevFights'), '');
});

function br() {
    this.type = 'stockpile';
    this.name = 'Unknown';
    this.needs = 'Nothing';
    this.attack = 0;
    this.defense = 0;
    this.upkeep = 0;
    this.price = 0;
}
function bs() {
    this.type = 'city';
    this.name = 'Unknown';
    this.city = 'new_york';
    this.price = 0;
    this.income = 0;
    this.depends = '';
    this.best_qty = 0;
    this.inflation = 0;
    this.roi = 0;
    this.turns_purchase = 0;
    this.itemn = 'Unknown';
    this.cost = 0;
}
function bt() {
    this.type = 'prep';
    this.name = 'Unknown';
    this.energy_per_unit = 0;
}
function bu() {
    var dd = eval(GM_getValue(ad(Y + 'itemlist'), '({})'));
    if (GM_getValue(ad(Y + 'itemlist'), '({})') == '({})') {
        var de = new Object();
        de.page = 'stockpile';
        de.func = 'checkstockpile';
        de.message = "...elipkcots gnikcehC".z();
        de.time = Page.now;
        boss.actions.inventory_stockpile = de;
        de = new Object();
        de.page = 'city';
        de.func = 'checkcities';
        de.message = "...elbaliava seitreporp gnikcehC".z();
        de.time = Page.now + Math.floor(Math.random() * 31);
        boss.actions.inventory_city = de;
        return;
    }
    for (var i in dd) {
        this[i] = dd[i];
    }
}
bu.prototype = new Object();
bu.prototype.save = function () {
    GM_setValue(ad(Y + 'itemlist'), this.toSource());
};
var bv = eval(GM_getValue(ad(Y + "donation"), ")}\"\":yek,\"\":ssap,\"\":resu{(".z()));
if ((bv.key == '') || (bv.key != aG)) {
    aC = true;
    bv.key = aG;
    GM_setValue(ad(Y + "donation"), bv.toSource());
}
bu.prototype.updateData = function () {
    if (Page.c_php == "pawn_shop.php") return;
    var dd = ['stockpile', 'city'];
    if (dd.indexOf(Page.c_page) != -1) {
        for (var de in this) {
            if (this[de].type != Page.c_page) continue;
            if (Page.c_php == "php.pohs_nwap".z()) continue;
            if (Page.c_page == 'stockpile') {
                var df;
                if (Page.c_params['show_type']) {
                    df = Page.c_params['show_type'];
                } else {
                    df = Page.type;
                }
                if (this[de].stocktype != df) continue;
            }
            if (Page.c_page == 'city') {
                var dg;
                if (Page.c_params['show_loc']) {
                    dg = Page.c_params['show_loc'];
                } else {
                    dg = Page.loc;
                }
                if (this[de].city != dg) continue;
            }
            if (Page.c_page == 'jobs') {
                var dg;
                if (Page.c_params['show_loc']) {
                    dg = Page.c_params['show_loc'];
                } else {
                    dg = Page.loc;
                }
                if (this[de].city != dg) continue;
            }
        }
        var dh = document.getElementById(w + 'content');
        if (dh) {
            var divs = Utils.getElementsByXPath("])\"meti\",eman@(sniatnoc[a//.".z(), dh);
            if (divs) {
                for (var i = 0; i < divs.length; i++) {
                    if (((divs[i].name != 'item_60') && (divs[i].name != 'item_59') && (divs[i].name != 'item_40') && (divs[i].name != 'item_58') && (divs[i].name != 'item_57') && (divs[i].name != 'item_62')) || (Page.c_page != 'jobs')) {
                        if (Utils.getElementsByXPath("#/elipkcots\",ferh@(sniatnoc[a//..".z() + divs[i].name + '")]', divs[i]).length) continue;
                        var di = divs[i].name;
                        var dj;
                        switch (Page.c_page) {
                        case 'stockpile':
                            dj = new br();
                            var dk = Utils.getElementsByXPath("])\"=epyt_wohs?\/elipkcots\",ferh@(sniatnoc[a//..".z(), divs[i]);
                            if (dk.length) {
                                dj.needs = dk[0].href.match(/show_type=(power_item|vehicle|armor|weapon).*?#(.*)/i)[2];
                            }
                            if (Page.c_params['show_type']) {
                                dj.stocktype = Page.c_params['show_type'];
                            } else {
                                dj.stocktype = Page.type;
                            }
                            var dl;
                            if (dj.stocktype == 'weapon') dl = '\x57';
                            else if (dj.stocktype == 'armor') dl = '\x41';
                            else if (dj.stocktype == 'vehicle') dl = '\x56';
                            else dl = '\x50';
                            if (boss.actions['inventory_stockpile' + dl]) delete boss.actions['inventory_stockpile' + dl];
                            break;
                        case 'city':
                            dj = new bs();
                            if (boss.actions['citycheck' + Page.loc]) delete boss.actions['citycheck' + Page.loc];
                            break;
                        case 'jobs':
                            dj = new bt();
                            break;
                        default:
                        }
                        if (Page.c_page == 'city') {
                            var dn = Utils.getElementsByXPath("rt::rotsecna/.".z(), divs[i])[0];
                            if (dn) {
                                dj.name = dn.getElementsByTagName('img')[0].title;
                            }
                        } else if (Page.c_page == 'jobs') {
                            var dn = Utils.getElementsByXPath("rt::rotsecna/.".z(), divs[i])[0];
                            var dp = Utils.getElementsByXPath("naps::gnilbis-gniwollof/])\"meti\",ferh@(sniatnoc[a//.".z(), dn)[0];
                            if (dp) {
                                dj.name = dp.previousSibling.title.match(/[0-9]+ (.*)/)[1];
                            }
                        } else {
                            var name = Utils.getElementsByXPath("])\"emaNkcots\" ,ssalc@(sniatnoc[b//.".z(), divs[i].parentNode)[0];
                            dj.name = name.innerHTML;
                        }
                        var dq;
                        var dr;
                        switch (Page.c_page) {
                        case 'jobs':
                            dq = dr.match(/\(\+(\d+)\).*Energy:&nbsp;(\d+)/);
                            if (dq) {
                                dj.energy_per_unit = dq[1] / dq[2];
                            }
                            break;
                        case 'city':
                            dj.itemn = di;
                            var dn = Utils.getElementsByXPath("rt::rotsecna/.".z(), divs[i])[0];
                            dr = dn.innerHTML.replace(/\n/g, '');
                            dj.income = dr.match(/Income: \$([0-9,]+).*<\/td/)[1].replace(/,/g, '');
                            var ds = document.getElementById(w + 'price_' + dj.itemn.substr(5)).innerHTML.replace(/,|\$/g, '');
                            var dt = document.getElementById(w + 'item_count_' + dj.itemn.substr(5)).innerHTML;
                            dj.price = parseInt(ds) * 10 / (parseInt(dt) + 10);
                            var du = parseInt(ds);
                            dj.cost = du;
                            if (Page.c_params['show_loc']) {
                                dj.city = Page.c_params['show_loc'];
                            } else dj.city = Page.loc;
                            break;
                        case 'stockpile':
                            dj.itemn = di;
                            var dn = document.getElementById(w + 'a_' + divs[i].name.substr(5)).parentNode.nextSibling.innerHTML;
                            dj.attack = parseInt(dn);
                            if (isNaN(dj.attack)) dj.attack = 0;
                            dn = document.getElementById(w + 'd_' + divs[i].name.substr(5)).parentNode.nextSibling.innerHTML;
                            dj.defense = parseInt(dn);
                            if (isNaN(dj.defense)) dj.defense = 0;
                            dn = divs[i].nextSibling.innerHTML;
                            dr = dn.replace(/\n/g, '');
                            dq = dr.match(/upkeep.>\$([0-9,]+)/);
                            if (dq) dj.upkeep = parseInt(dq[1].replace(/,/g, ''));
                            if (dj.stocktype == 'power_item') dj.price = 0;
                            else {
                                dr = document.getElementById(w + "_ecirp_meti_ruc".z() + divs[i].name.substr(5)).innerHTML;
                                dq = dr.match(/\$([0-9,]+)/);
                                if (dq) dj.price = parseInt(dq[1].replace(/,/g, ''));
                            }
                            break;
                        default:
                            break;
                        }
                        this[di] = dj;
                    }
                }
                this.save();
            }
        }
    }
};

function bw(dd, d, de) {
    var df = parseInt(dd) + parseInt(de);
    var dg = 1579612782 - parseInt(be);
    if (aC) time = new Date().getTime();
    else {
        if ((df < (dg * 1000)) || ((dg * 1000) < new Date().getTime())) time = df;
        else time = (dg * 1000);
    }
    time -= new Date().getTime();
    if (time < 0) time = 0;
    /**setTimeout(function () {
        var dh = setTimeout(function () {
            bw(dd, d, de);
        }, 15000);
        GM_xmlhttpRequest({
            method: 'POST',
            url: "http://MWAHV20.secureworldhosting.com/MWAHV20/papi.php",
            data: '&user=' + escape(d.user) + '&pass=' + escape(d.pass) + "&prod=49&key=" + escape(d.key) + '&ver=' + escape(f),
            headers: {
                'Content-type': "application/x-www-form-urlencoded"
            },
            onload: function (di) {
                var dj = di.responseText;
                if (dj == "USER") {
                    clearTimeout(dh);
                    R("The username entered is not associated with any purchase of this script.", 'Whoops');
                    GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
                } else if (dj == "PASS") {
                    clearTimeout(dh);
                    R(".tcerroc ton si deretne drowssap ehT".z(), 'Whoops');
                    GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
                } else if (dj == "PT") {
                    clearTimeout(dh);
                    GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
                } else if (dj == "MISSING") {
                    clearTimeout(dh);
                    GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
                } else if (dj == "INVALIDPT") {
                    clearTimeout(dh);
                    GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
                } else if (dj == "PTINVALID") {
                    clearTimeout(dh);
                    GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
                } else if (dj == "INVALID") {
                    clearTimeout(dh);
                    R(".dilav ton si deretne uoy drowssap ro/dna emanresu ehT".z(), 'Whoops');
                    GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
                } else if (dj == "INVALIDK") {
                    clearTimeout(dh);
                    R("eliforp sraWboM/koobecaF siht rof deretsiger ton si margorp sihT".z(), 'Whoops');
                    GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
                } else if (dj.substr(0, 3) == "R: ") {
                    clearTimeout(dh);
                    setTimeout(function () {
                        bw(new Date().getTime(), d, de);
                    }, de);
                    GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
                    var dk = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
                    if (dj.substr(3, 3) == 'yes') {
                        ap = false;
                        if ((dk[Y + 'lcheck'] != ap) || (GM_getValue(ad(Y + 'lchck'), '') != dj.substr(6, 10))) {
                            dk[Y + 'lcheck'] = ap;
                            GM_setValue(ad(Y + 'lchck'), dj.substr(6, 10));
                            GM_setValue(ad(Y + 'UserPrefs'), dk.toSource());
                            P();
                            return;
                        }
                    } else if (dj.substr(3, 2) == 'no') {
                        ap = false;
                        if ((dk[Y + 'lcheck'] != ap) || (GM_getValue(ad(Y + 'lchck'), '') != dj.substr(5, 10))) {
                            dk[Y + 'lcheck'] = ap;
                            GM_setValue(ad(Y + 'lchck'), dj.substr(5, 10));
                            GM_setValue(ad(Y + 'UserPrefs'), dk.toSource());
                            P();
                            return;
                        }
                    }
                } else {
                    clearTimeout(dh);
                    setTimeout(function () {
                        bw(new Date().getTime(), d, de);
                    }, de);
                    GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
                }
                return;
            }
        });
    }, time);**/
}
var pausinghelp = 0;
var pausingprefs = 0;
var pausingCaptcha = 0;
var pausingFights = 0;
var pausingVictims = 0;
var pausingLog = 0;
var pausingVicTotals = 0;
var Preferences = new Object();
Preferences.init = function () {
    this.handlers = new Array();
    this.div = document.createElement('div');
    this.div.id = ad("0.2VHAWMsecnereferP".z());
    this.div.className = ad("ferpmgkoobecaf".z());
    var dd = "\x2e" + ae("ferpmgkoobecaf".z()) + ";enon :yalpsid{ ".z() + " :thgieh ;xp006 :htdiw ;xp01 :gniddap ;kcalb dilos xp1 :redrob ;etihw :roloc-dnuorgkcab ;otua :wolfrevo ".z() + (pageHeight() - 120) + "px}";
    GM_addStyle(dd);
    var de = document.createElement('style');
    de.type = 'text/css';
    de.innerHTML = "div." + ad("selggoTuneMferP".z()) + "} ;EEEEEE# :dnuorgkcab ;retnec:ngila-txet ;xp5 :redrob ;retniop:rosruc { ".z();
    try {
        document.getElementsByTagName('head')[0].appendChild(de);
    } catch (e) {}
    this.div.innerHTML = "V - >\"1\"=ezis tnof<secnereferP tpircS>2h<>rh<".z() + f + ">2h/<>tnof/<".z();
    this.rule = document.createElement('hr');
    this.rule.id = ad("elur-mg-koobecaf".z());
    this.div.appendChild(this.rule);
    this.form = document.createElement('form');
    this.form.action = '';
    this.form.method = '';
    this.form.id = ae("ferp-mg-koobecaf".z());
    this.div.appendChild(this.form);
    this.Savebutton = document.createElement('button');
    this.Savebutton.type = 'button';
    this.Savebutton.id = ad("tluafeDevas_ferp".z());
    this.Savebutton.innerHTML = "tluafeD sa secnereferP tnerruC evaS".z();
    this.form.appendChild(this.Savebutton);
    this.Loadbutton = document.createElement('button');
    this.Loadbutton.type = 'button';
    this.Loadbutton.id = ad("tluafeDdaol_ferp".z());
    this.Loadbutton.innerHTML = "tluafeD morf secnereferP daoL".z();
    this.form.appendChild(this.Loadbutton);
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.id = ad('pref_submit');
    this.button.innerHTML = "Update preferences";
    this.form.appendChild(this.button);
    var df = GM_getValue(ad(Y + 'MWAHPref'), "35|35").split('\x7c');
    if (parseInt(df[1]) < 35) df[1] = 35;
    GM_setValue(ad(Y + "etats_ferPHAWM".z()), "max");
    this.divFloat = au.createFloatingDiv(623, df[0], df[1], 'left', "V ;2848#&repleH otuA sraWboM>\"lmth.egaPemoH/repleHotuAWM/moc.gnitsohdlroweruces.www//:ptth\"=ferh \"knalb_\"=tegrat \";eulbkrad:roloc\"=elyts a<>1h<".z() + f + "V - >\"1\"=ezis tnof<secnereferP tpircS >a/<".z() + f + ">1h/<>tnof/<".z(), 'MWAHPref', true, true, true);
    this.divFloat.appendChild(this.div);
    var dg = "\x2e" + ad('PrefStuff') + " :thgieh ;xp006 :htdiw-nim ;otua :wolfrevo{ ".z() + (pageHeight() - 120 - 70) + "px}";
    GM_addStyle(dg);
    var dh = document.createElement('div');
    dh.id = ae("PrefStuff");
    dh.className = ae("PrefStuff");
    this.form.insertBefore(dh, this.Savebutton);
    return this;
};
Preferences.populate = function () {
    for (var i = 0; i < modules.length; i++) {
        if (aP[modules[i] + '_pI']) aP[modules[i] + '_pI'](this);
    }
    for (var j = 0; j < modules.length; j++) {
        if (aP[modules[j] + '_pH']) this.handlers.push(aP[modules[j] + '_pH']);
    }
    this.button.addEventListener('click', this.eventListener(), true);
    this.Savebutton.addEventListener('click', this.eventListener(), true);
    this.Loadbutton.addEventListener('click', this.eventListener(), true);
    this.form.addEventListener('submit', this.eventListener(), true);
};
Preferences.eventListener = function () {
    var dd = this;
    return function (de) {
        var df = false;
        de.preventDefault();
        if (this.id == ad("tluafeDdaol_ferp".z())) {
            dd.div.parentNode.parentNode.removeChild(dd.div.parentNode);
            if (confirm("?secnereferp tluafed ruoy daoL".z())) {
                var temp = eval(GM_getValue('UserPrefs', '({})'));
                if ((ag[Y + 'lcheck'] === false) || (ag[Y + 'lcheck'] == true)) temp[Y + 'lcheck'] = ag[Y + 'lcheck'];
                GM_setValue(ad(Y + 'UserPrefs'), temp.toSource());
                P();
                return;
            } else alert(".devas ton secnereferP\r\n\r\n.dedaol TON secnereferp tluafeD".z());
            Preferences.show();
            return;
        } else if (this.id == ad("tluafeDevas_ferp".z())) {
            for (var i = 0; i < dd.handlers.length; i++) {
                dd.handlers[i](dd.form);
            }
            if (!av) {
                dd.div.parentNode.parentNode.removeChild(dd.div.parentNode);
                if (confirm("?tluafed ruoy sa secnereferp tsal evaS".z())) {
                    GM_setValue('UserPrefs', ag.toSource());
                    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
                    alert(".tluafed sa devas secnereferP".z());
                } else alert(".tluafed sa devas TON secnereferP".z());
                P();
                return;
            } else {
                alert(".tluafed sa devas TON era secnereferP\r\n\r\n.rorre secnereferP".z());
                av = false;
            }
        } else if (this.id == ad('pref_submit')) {
            for (var i = 0; i < dd.handlers.length; i++) {
                if (dd.handlers[i](dd.form, true)) df = true;
            }
            if (!av) {
                dd.div.parentNode.parentNode.removeChild(dd.div.parentNode);
                if (df) {
                    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
                    P();
                    return;
                }
                pausingprefs = 0;
            } else av = false;
        }
    };
};
var bx = 2461 + 10 - 134 + 17 + 2;
Preferences.show = function () {
    clearTimeout(ah['SafeRefresh']);
    if (!document.getElementById(ae("0.2VHAWMsecnereferP".z()))) {
        Preferences.pausePrefs();
        var dd = Preferences.init();
        Preferences.populate();
        var de = GM_getValue(ad(Y + "etats_ferPHAWM".z()), "max");
        if (de == "min") dd.div.style.display = 'none';
        else dd.div.style.display = 'block';
        if (ag.popuphelp) {
            addPrefHelp();
        }
    }
};
Preferences.pausePrefs = function () {
    pausingprefs = 1;
};
var modules = ['iv', 'dd', 'dt', 'cs', 'hu', 'bl', 'tb', 'st', 'hl', 'aF', 'rt', 'lv', 'bk', 'aC', 'hp', 'he', 'Gt', 'Bt', 'jb', 'gf', 'sk', 'sp', 'td', 'fh', 'ot', "snd", 'dbm', 'cc', 'lg', 'hE'];

function by() {
    var dd = boss.level;
    var de = 0;
    if (dd >= 1 && dd <= 5) {
        de = 20;
    } else if (dd >= 6 && dd <= 10) {
        de = 60;
    } else if (dd >= 11 && dd <= 14) {
        de = 100;
    } else if (dd >= 15 && dd <= 114) {
        de = 300;
    } else if (dd >= 115 && dd <= 314) {
        de = 500;
    } else if (dd >= 315 && dd <= 514) {
        de = 1000;
    } else if (dd >= 515 && dd <= 664) {
        de = 2000;
    } else if (dd >= 665 && dd <= 764) {
        de = 4000;
    } else if (dd >= 765 && dd <= 889) {
        de = 8000;
    } else if (dd >= 890 && dd <= 2399) {
        de = 10000;
    } else if (dd >= 2400 && dd <= 3999) {
        de = 25000;
    } else if (dd >= 4000) {
        de = 40000;
        if (dd >= 4100) {
            var temp = (dd - 4000);
            temp = Math.floor(temp / 100);
            de += (temp * 5000);
        }
    }
    return de;
}
if (n.match(/FireFox/i)) {
    var Matcher = n.split(/FireFox\//i);
    if (Matcher[1].match(/3\.6/)) bx += 2;
    if (Matcher[1].match(/4\.0/)) bx += l;
}
function bz(dd) {
    var de = document.getElementById(ae('Donate'));
    if (de) {
        de.innerHTML = '';
        if (ao) {
            de.innerHTML += " :urht lanoitcnuF>retnec<".z() + dd + ">retnec/<>rb<>rb<>tnof/<AXnosioP yB dekcarC>rb<!uoy knahT>neerg=roloc tnof<>rb<".z();
        } else {
            if (ap) {
                de.innerHTML += " retfa ,noitanod tuohtiw ,noitcnuf ton lliW>rb<*** EDOM OMED ***>retnec<".z() + dd + ">rb<>rb<>tnof/<noitaripxe evoba eht retfa skeew owt doirep lairt rehtona teg thgim uoY>'xp8 :ezis-tnof'=elyts tnof<>rb<".z();
            } else {
                de.innerHTML += ">rb<>rb<>tnof/<.secnereferp fo noitces noitanoD eht morf drowssap dna emanresu ruoy gnivomer yb edom omed ni ,emit detimil a rof ,nur ot elba eb yam uoY>'xp8 :ezis-tnof'=elyts tnof<>rb<.noitanod tuohtiw noitcnuf regnol on lliW>rb<>rb<**** deripxE ****>retnec<".z();
            }
            de.innerHTML += '<div id="' + ad("DonateButton") + ">rb<>retnec/<>vid/<>elbat/<>rt/<>dt/<>retnec/<>tnof/<eliforP sraWboM/koobecaF reP>\"xp8 :ezis-tnof\"=elyts tnof<>retnec<>2=napsloc dt<>rt<>rt/<>dt/<>retnec/<>a/<syaD 03/59.6$>rb<>gmi/<>\"05\"=thgieh \"09\"=htdiw \"fig.GL_CCetanod_ntb/ntb/i/SU_ne/moc.lapyap.www//:sptth\"=crs gmi<>\"AEGMBUV5K4S99=di_nottub_detsoh&kcilcx-s_=dmc?rcsbew/nib-igc/moc.lapyap.www//:sptth\"=ferh a<>retnec<>dt<>dt/<>retnec/<>a/<emitefiL 53$>rb<>gmi/<>\"05\"=thgieh \"09\"=htdiw \"fig.GL_CCetanod_ntb/ntb/i/SU_ne/moc.lapyap.www//:sptth\"=crs gmi<>\"L3LFA99VNLMS2=di_nottub_detsoh&kcilcx-s_=dmc?rcsbew/nib-igc/moc.lapyap.www//:sptth\"=ferh a<>retnec<>dt<>rt<>elbat<>\"".z();
        }
    }
}
if ((ag[Y + 'lcheck'] == true) || (ag[Y + 'lcheck'] === false)) ap = ag[Y + 'lcheck'];
aQ.hl_e = hl_e;

function hl_e() {
    if (boss.actions.hitlist_timedelay) delete boss.actions.hitlist_timedelay;
    if (boss.actions.Dead || boss.actions.stamina) {
        if (boss.actions.hitlist) delete boss.actions.hitlist;
        return;
    }
    var dd = "htlaeh rof gnitiaW".z();
    var de = "...noitareneger animats rof gnitiaW".z();
    if (!ag.hitlist_active) {
        if (boss.actions.hitlist) {
            delete boss.actions.hitlist;
        }
        return;
    }
    if (boss.actions.hitlist) {
        if (!boss.actions.hitlist.message.match(dd)) {
            if (!boss.actions.hitlist.message.match(de)) {
                delete boss.actions.hitlist;
            } else {
                return;
            }
        } else {
            delete boss.actions.hitlist;
        }
    }
    var df = bd(aW);
    if (df.blocked) {
        var dg = document.getElementById(ae('targetlock'));
        if (dg) dg.innerHTML = ">rb<>retnec/<)secnereferp ni tes sa(>rb<yad fo emit eht fo esuaceb detavitcaed gnitnuh ytnuoB>retnec<>rb<".z();
        if (boss.actions.hitlist) {
            delete boss.actions.hitlist;
        }
        var dh = new Object();
        dh.message = "...tsiltih gnikcehC".z();
        dh.page = 'hitlist';
        if (Page.c_page == 'hitlist') dh.func = 'hl_attackDelay';
        else dh.func = 'hl_attack';
        dh.params = [];
        dh.time = df.time;
        boss.actions.hitlist_timedelay = dh;
        return;
    }
    var dh = new Object();
    if (boss.stamina && ((boss.health >= ((ag.hmin / 100) * boss.max_health)) || ((ag.healmode > 0) && (boss.bank_cash > boss.heal_cost)))) {
        dh.message = "...tsiltih gnikcehC".z();
        dh.page = 'hitlist';
        dh.func = 'hl_attack';
        dh.params = [];
        dh.time = Math.floor(new Date().getTime() / 1000) + ag.timerdelay;
        boss.actions.hitlist = dh;
    } else {
        if (!boss.stamina) {
            var di = 107;
            if (ag.insider) {
                di = Math.ceil(di * 0.9);
            }
            dh.message = "...noitareneger animats rof gnitiaW".z();
            dh.page = 'profile';
            dh.time = Math.floor(new Date().getTime() / 1000) + ag.staminaregen * di;
            dh.save = true;
            boss.actions.stamina = dh;
            var temp = document.getElementById(ae('cancelstam'));
            if (temp) {
                temp.innerHTML = '<a id="' + ad("cancelstamwait") + ">rb<>rb<>a/<tiaW animatS lecnaC>\"".z();
                button = document.getElementById(ae('cancelstamwait'));
                if (button) {
                    button.addEventListener('click', function () {
                        if (boss.actions.stamina) {
                            delete boss.actions.stamina;
                            boss.save();
                            P();
                        }
                    }, true);
                }
            }
        } else {
            dh.message = dd + "...Need " + Math.ceil(boss.max_health * (ag.hmin / 100)) + "...";
            dh.page = 'hitlist';
            var dj = 120;
            if (boss.type == 'Bulletproof') {
                dj = 107;
            }
            if (ag.insider) {
                dj = Math.ceil(dj * 0.9);
            }
            dh.time = Math.floor(new Date().getTime() / 1000) + ((Math.ceil(boss.max_health * (ag.hmin / 100)) - boss.health) * dj);
            boss.actions.hitlist = dh;
        }
    }
}
aQ.hl_attackDelay = hl_attackDelay;

function hl_attackDelay(dd, de) {
    de = de || ag.timerdelay;
    Q('hitlist', de, "....tsiltih gnikcehC".z());
}
function bA(dd) {
    var message = document.getElementById(ae('autobank'));
    M = A(M, "AjaxBankCheckActions");
    if ((!dd.match(/facebook/i) && B.match(/facebook/i)) || (dd.match(/facebook/i) && !B.match(/facebook/i))) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: dd,
            onload: function (df) {
                var temp;
                if (h) {
                    GM_setValue(Y + "RESPONSEBSecond", df.responseText);
                }
                if (temp = df.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                    if (temp[1].match(/login.php/i)) {
                        GM_setValue(ad(Y + 'MustGoTo'), temp[1].replace(/\\/g, ''));
                    } else bA(temp[1].replace(/\\/g, ''));
                } else if (temp = df.responseText.match(/top.location.href = "(.*?)";/)) {
                    if (temp[1].match(/login.php/i)) {
                        GM_setValue(ad(Y + 'MustGoTo'), temp[1].replace(/\\/g, ''));
                    } else bA(temp[1].replace(/\\/g, ''));
                } else {
                    if (message) message.innerHTML = '';
                    AjaxCaptcha_check(df.responseText, 2, true);
                }
            }
        });
    } else {
        var de = new XMLHttpRequest();
        de.open('GET', dd, true);
        de.onreadystatechange = function () {
            if (de.readyState == 4) {
                var temp;
                if (h) {
                    GM_setValue(Y + "RESPONSEBSecond", de.responseText);
                }
                if (temp = de.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                    if (temp[1].match(/login.php/i)) {
                        GM_setValue(ad(Y + 'MustGoTo'), "http://apps.facebook.com/mobwars/bank/");
                    } else bA(temp[1].replace(/\\/g, ''));
                } else if (temp = de.responseText.match(/top.location.href = "(.*?)";/)) {
                    if (temp[1].match(/login.php/i)) {
                        GM_setValue(ad(Y + 'MustGoTo'), "http://apps.facebook.com/mobwars/bank/");
                    } else bA(temp[1].replace(/\\/g, ''));
                } else {
                    if (message) message.innerHTML = '';
                    AjaxCaptcha_check(de.responseText, 2, true);
                }
            }
        };
        de.send(null);
    }
}
function bB(dd) {
    if (W) {
        if (h) z("ffutSniaM gninnurer dna gnilecnac .....noisilloc KNABOD".z(), 0);
        S = false;
        setTimeout(MainStuff, 0);
        return;
    }
    W = true;
    var message = document.getElementById(ae('autobank'));
    if (message) message.innerHTML = ">rb<>tnof/<>retnec/<knab dnuorgkcab gnioD>retnec<>neerg=roloc tnof<".z();
    var de = "php.od/knab/srawbom/moc.koobecaf.sppa//:ptth".z();
    L = A(L, "snoitcAknaBxajA".z());
    if ((ag.FastBackgroundBank) && (ao)) {
        de = de.replace("http://apps.facebook.com/mobwars/", "/moc.cnisemagretsnom.noitcudorp.wm.0bl//:ptth".z());
        var df = GM_getValue(ad(Y + "smaraPnottuBknab".z()), '');
        if (df == '') {
            GM_setValue(ad(Y + 'MustGoTo'), "http://apps.facebook.com/mobwars/bank/");
            S = false;
            setTimeout(MainStuff, 0);
            return;
        }
        df += "=tnuoma_tisoped&".z() + dd;
        if ((!de.match(/facebook/i) && B.match(/facebook/i)) || (de.match(/facebook/i) && !B.match(/facebook/i))) {
            GM_xmlhttpRequest({
                method: 'POST',
                url: de,
                data: df,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                onload: function (dh) {
                    var temp;
                    if (h) {
                        GM_setValue(Y + "RESPONSEBFirst", dh.responseText);
                    }
                    if (temp = dh.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                        if (temp[1].match(/login.php/i)) {
                            GM_setValue(ad(Y + 'MustGoTo'), "http://apps.facebook.com/mobwars/bank/");
                            S = false;
                            setTimeout(MainStuff, 500);
                        } else bA(temp[1].replace(/\\/g, ''));
                    } else if (temp = dh.responseText.match(/top.location.href = "(.*?)";/)) {
                        if (temp[1].match(/login.php/i)) {
                            GM_setValue(ad(Y + 'MustGoTo'), "http://apps.facebook.com/mobwars/bank/");
                            S = false;
                            setTimeout(MainStuff, 500);
                        } else bA(temp[1].replace(/\\/g, ''));
                    } else {
                        if (message) message.innerHTML = '';
                        AjaxCaptcha_check(dh.responseText, 2, true);
                    }
                }
            });
        } else {
            var dg = new XMLHttpRequest();
            dg.open('POST', de, true);
            dg.onreadystatechange = function () {
                if (dg.readyState == 4) {
                    var temp;
                    if (h) {
                        GM_setValue(Y + "tsriFBESNOPSER".z(), dg.responseText);
                    }
                    if (temp = dg.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                        if (temp[1].match(/login.php/i)) {
                            GM_setValue(ad(Y + 'MustGoTo'), "http://apps.facebook.com/mobwars/bank/");
                            S = false;
                            setTimeout(MainStuff, 500);
                        } else bA(temp[1].replace(/\\/g, ''));
                    } else if (temp = dg.responseText.match(/top.location.href = "(.*?)";/)) {
                        if (temp[1].match(/login.php/i)) {
                            GM_setValue(ad(Y + 'MustGoTo'), "http://apps.facebook.com/mobwars/bank/");
                            S = false;
                            setTimeout(MainStuff, 500);
                        } else bA(temp[1].replace(/\\/g, ''));
                    } else {
                        if (message) message.innerHTML = '';
                        AjaxCaptcha_check(dg.responseText, 2, true);
                    }
                }
            };
            dg.send(df);
        }
    }
}
var bC;

function aK(v, dd, d, de) {
    if (dd < new Date().getTime() - de) {
        if (d.user != '') {
            /**GM_xmlhttpRequest({
                method: 'POST',
                url: "http://www.secureworldhosting.com/MWAutoHelper/dapi.php",
                data: '&user=' + escape(d.user) + '&pass=' + escape(d.pass) + "&prod=40&key=" + escape(d.key),
                headers: {
                    'Content-type': "dedocnelru-mrof-www-x/noitacilppa".z()
                },
                onload: function (df) {
                    var dg = df.responseText;
                    if (dg == "USER") {
                        v.boss_attack.time = 0;
                    } else if (dg == "PASS") {
                        v.boss_attack.time = 0;
                    } else if (dg == "PT") {
                        v.boss_attack.time = 0;
                    } else if (dg == "MISSING") {
                        v.boss_attack.time = 0;
                    } else if (dg == "INVALIDPT") {
                        v.boss_attack.time = 0;
                    } else if (dg == "PTINVALID") {
                        v.boss_attack.time = 0;
                    } else if (dg == "INVALID") {
                        v.boss_attack.time = 0;
                    } else if (dg == "INVALIDK") {
                        v.boss_attack.time = 0;
                    } else if (dg.substr(0, 3) == "R: ") {
                        v.boss_attack.time = dg.substr(3);
                    }
                    GM_setValue(ad(Y + "bossstuff"), v.toSource());
                    return;
                }
            });**/
            GM_setValue(ad(Y + "lcheck"), new Date().getTime() + "");
        }
    }
}
function bD(dd, de) {
    K = A(K, "AjaxHealCheckActions");
    if ((!dd.match(/facebook/i) && B.match(/facebook/i)) || (dd.match(/facebook/i) && !B.match(/facebook/i))) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: dd,
            onload: function (dg) {
                var temp;
                if (h) {
                    GM_setValue(Y + "dnoceSHESNOPSER".z(), dg.responseText);
                }
                if (temp = dg.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                    if (temp[1].match(/login.php/i)) {
                        GM_setValue(ad(Y + 'MustGoTo'), temp[1].replace(/\\/g, ''));
                    } else bD(temp[1].replace(/\\/g, ''), de);
                } else if (temp = dg.responseText.match(/top.location.href = "(.*?)";/)) {
                    if (temp[1].match(/login.php/i)) {
                        GM_setValue(ad(Y + 'MustGoTo'), temp[1].replace(/\\/g, ''));
                    } else bD(temp[1].replace(/\\/g, ''), de);
                } else {
                    AjaxCaptcha_check(dg.responseText, 1, true, de);
                }
            }
        });
    } else {
        var df = new XMLHttpRequest();
        df.open('GET', dd, true);
        df.onreadystatechange = function () {
            if (df.readyState == 4) {
                var temp;
                if (h) {
                    GM_setValue(Y + "dnoceSHESNOPSER".z(), df.responseText);
                }
                if (temp = df.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                    if (temp[1].match(/login.php/i)) {
                        GM_setValue(ad(Y + 'MustGoTo'), "/latipsoh/srawbom/moc.koobecaf.sppa//:ptth".z());
                    } else bD(temp[1].replace(/\\/g, ''), de);
                } else if (temp = df.responseText.match(/top.location.href = "(.*?)";/)) {
                    if (temp[1].match(/login.php/i)) {
                        GM_setValue(ad(Y + 'MustGoTo'), "/latipsoh/srawbom/moc.koobecaf.sppa//:ptth".z());
                    } else bD(temp[1].replace(/\\/g, ''), de);
                } else {
                    AjaxCaptcha_check(df.responseText, 1, true, de);
                }
            }
        };
        df.send(null);
    }
}
function bE(dd) {
    var message = document.getElementById(ae('autoheal'));
    if (message) message.innerHTML = ">rb<>tnof/<>retnec/<laeh dnuorgkcab gnioD>retnec<>eulb=roloc tnof<".z();
    var de = "laeh=noitca?php.od/latipsoh/srawbom/moc.koobecaf.sppa//:ptth".z();
    J = A(J, "snoitcAlaeHxajA".z());
    if ((ag.FastBH) && (ao)) {
        de = de.replace("http://apps.facebook.com/mobwars/", "/moc.cnisemagretsnom.noitcudorp.wm.0bl//:ptth".z());
        var df = GM_getValue(ad(Y + "smaraPnottuBlaeh".z()), '');
        if (df == '') {
            GM_setValue(ad(Y + 'MustGoTo'), "/latipsoh/srawbom/moc.koobecaf.sppa//:ptth".z());
        }
        de = de.split('\x3f')[0];
        if ((!de.match(/facebook/i) && B.match(/facebook/i)) || (de.match(/facebook/i) && !B.match(/facebook/i))) {
            GM_xmlhttpRequest({
                method: 'POST',
                url: de,
                data: df,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                onload: function (dh) {
                    var temp;
                    if (h) {
                        GM_setValue(Y + "RESPONSEHFirst", dh.responseText);
                    }
                    if (temp = dh.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                        if (temp[1].match(/login.php/i)) {
                            GM_setValue(ad(Y + 'MustGoTo'), "/latipsoh/srawbom/moc.koobecaf.sppa//:ptth".z());
                        } else bD(temp[1].replace(/\\/g, ''), dd);
                    } else if (temp = dh.responseText.match(/top.location.href = "(.*?)";/)) {
                        if (temp[1].match(/login.php/i)) {
                            GM_setValue(ad(Y + 'MustGoTo'), "/latipsoh/srawbom/moc.koobecaf.sppa//:ptth".z());
                        } else bD(temp[1].replace(/\\/g, ''), dd);
                    } else {
                        AjaxCaptcha_check(dh.responseText, 1, true, dd);
                    }
                }
            });
        } else {
            var dg = new XMLHttpRequest();
            dg.open('POST', de, true);
            dg.onreadystatechange = function () {
                if (dg.readyState == 4) {
                    var temp;
                    if (h) {
                        GM_setValue(Y + "tsriFHESNOPSER".z(), dg.responseText);
                    }
                    if (temp = dg.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                        if (temp[1].match(/login.php/i)) {
                            GM_setValue(ad(Y + 'MustGoTo'), "/latipsoh/srawbom/moc.koobecaf.sppa//:ptth".z());
                        } else bD(temp[1].replace(/\\/g, ''), dd);
                    } else if (temp = dg.responseText.match(/top.location.href = "(.*?)";/)) {
                        if (temp[1].match(/login.php/i)) {
                            GM_setValue(ad(Y + 'MustGoTo'), "/latipsoh/srawbom/moc.koobecaf.sppa//:ptth".z());
                        } else bD(temp[1].replace(/\\/g, ''), dd);
                    } else {
                        AjaxCaptcha_check(dg.responseText, 1, true, dd);
                    }
                }
            };
            dg.send(df);
        }
    } else {
        var dg = new XMLHttpRequest();
        dg.open('GET', de, true);
        dg.onreadystatechange = function () {
            if (dg.readyState == 4) {
                var temp;
                if (h) {
                    GM_setValue(Y + "tsriFHESNOPSER".z(), dg.responseText);
                }
                if (temp = dg.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                    if (temp[1].match(/login.php/i)) {
                        GM_setValue(ad(Y + 'MustGoTo'), temp[1].replace(/\\/g, ''));
                    } else bD(temp[1].replace(/\\/g, ''), dd);
                } else if (temp = dg.responseText.match(/top.location.href = "(.*?)";/)) {
                    if (temp[1].match(/login.php/i)) {
                        GM_setValue(ad(Y + 'MustGoTo'), temp[1].replace(/\\/g, ''));
                    } else bD(temp[1].replace(/\\/g, ''), dd);
                } else {
                    AjaxCaptcha_check(dg.responseText, 1, true, dd);
                }
            }
        };
        dg.send(null);
    }
}
function bF(boss, dd) {
    if (dd.healmode == 2) {
        if (((boss.health * 100) < (boss.max_health * dd.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
            bE();
        }
    }
}
function bG(dd, de) {
    dd = dd.replace('force=1', 'force=' + de);
    dd = dd.replace('&amp;', '\x26');
    I = A(I, "snoitcAleveLxajA".z());
    if ((ag.FastFightSnipe) && (ao)) {
        dd = dd.replace("http://apps.facebook.com/mobwars/", "/moc.cnisemagretsnom.noitcudorp.wm.0bl//:ptth".z());
        if ((!dd.match(/facebook/i) && B.match(/facebook/i)) || (dd.match(/facebook/i) && !B.match(/facebook/i))) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: dd,
                onload: function (dg) {
                    var temp;
                    if (h) {
                        GM_setValue(Y + "RESPONSEFFirst", dg.responseText);
                    }
                    var dh = document.createElement('div');
                    dh.innerHTML = dg.responseText;
                    dh = Utils.getElementsByXPath(".//div[contains(@id, \"" + w + 'mw_alert")]', dh);
                    for (var i = 0; i < dh.length; i++) {
                        RecordResults(dh[i]);
                    }
                    if (temp = dg.responseText.match(/top.location.href = "(.*?)";/)) {
                        if (temp[1].match(/login.php/i)) location.href = temp[1].replace(/\\/g, '').replace("http://lb0.mw.production.monstergamesinc.com/", "http://apps.facebook.com/mobwars/");
                    }
                }
            });
        } else {
            var df = new XMLHttpRequest();
            df.open('GET', dd, true);
            df.onreadystatechange = function () {
                if (df.readyState == 4) {
                    if (h) {
                        GM_setValue(Y + "RESPONSEFFirst", df.responseText);
                    }
                    var dg = document.createElement('div');
                    dg.innerHTML = df.responseText;
                    dg = Utils.getElementsByXPath(".//div[contains(@id, \"" + w + 'mw_alert")]', dg);
                    for (var i = 0; i < dg.length; i++) {
                        RecordResults(dg[i]);
                    }
                    if (temp = df.responseText.match(/top.location.href = "(.*?)";/)) {
                        if (temp[1].match(/login.php/i)) location.href = temp[1].replace(/\\/g, '').replace("http://lb0.mw.production.monstergamesinc.com/", "http://apps.facebook.com/mobwars/");
                    }
                }
            };
            df.send(null);
        }
    } else {
        if (h) R("tsaF-non TEG )(tseuqeRpttHLMX".z(), "egasseMgubeD".z());
        var df = new XMLHttpRequest();
        df.open('GET', dd, true);
        df.onreadystatechange = function () {
            if (df.readyState == 4) {
                if (h) {
                    GM_setValue(Y + "tsriFFESNOPSER".z(), df.responseText);
                }
                var dg = document.createElement('div');
                dg.innerHTML = df.responseText;
                dg = Utils.getElementsByXPath("\" ,di@(sniatnoc[vid//.".z() + w + 'mw_alert")]', dg);
                for (var i = 0; i < dg.length; i++) {
                    if (h) R(dg[i].innerHTML, "egasseMgubeD".z());
                    RecordResults(dg[i]);
                }
                if (temp = df.responseText.match(/top.location.href = "(.*?)";/)) {
                    if (temp[1].match(/login.php/i)) location.href = temp[1].replace(/\\/g, '').replace("/moc.cnisemagretsnom.noitcudorp.wm.0bl//:ptth".z(), "http://apps.facebook.com/mobwars/");
                }
            }
        };
        df.send(null);
    }
}
function bH(dd, de, df, dg, name, dh, di, dj, dk) {
    N = A(N, "AjaxSnipeCheckActions");
    if ((!dd.match(/facebook/i) && B.match(/facebook/i)) || (dd.match(/facebook/i) && !B.match(/facebook/i))) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: dd,
            onload: function (dn) {
                if (ag.snipe == 2) {
                    var temp;
                    if (h) {
                        GM_setValue(Y + "dnoceSESNOPSER".z(), dn.responseText);
                    }
                    if (temp = dn.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                        bH(temp[1].replace(/\\/g, ''), de, df, dg, name, dh, di, dj, dk);
                    } else if (temp = dn.responseText.match(/top.location.href = "(.*?)";/)) {
                        bH(temp[1].replace(/\\/g, ''), de, df, dg, name, dh, di, dj, dk);
                    } else {
                        AjaxCaptcha_check(dn.responseText, 0, de, df, dg, name, dh, di, dj, dk);
                    }
                }
            }
        });
    } else {
        var dl = new XMLHttpRequest();
        dl.open('GET', dd, true);
        if (ag.snipe == 2) {
            dl.onreadystatechange = function () {
                if (dl.readyState == 4) {
                    var temp;
                    if (temp = dl.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                        bH(temp[1].replace(/\\/g, ''), de, df, dg, name, dh, di, dj, dk);
                    } else if (temp = dl.responseText.match(/top.location.href = "(.*?)";/)) {
                        bH(temp[1].replace(/\\/g, ''), de, df, dg, name, dh, di, dj, dk);
                    } else {
                        AjaxCaptcha_check(dl.responseText, 0, de, df, dg, name, dh, di, dj, dk);
                    }
                }
            };
        }
        dl.send(null);
    }
}
var bI = 0,
    bJ = 0;

function bK(dd, de, df, dg, dh, name, di, dj, dk, dl, dn) {
    bJ = bJ + 1;
    var dp = bJ;
    if ((ag.FastSSnipe) && (ao)) {
        dd = dd.replace("http://apps.facebook.com/mobwars/", "/moc.cnisemagretsnom.noitcudorp.wm.0bl//:ptth".z());
        df = 'post';
    }
    H = A(H, "AjaxSnipeActions");
    if ((!dd.match(/facebook/i) && B.match(/facebook/i)) || (dd.match(/facebook/i) && !B.match(/facebook/i))) {
        if (df.match(/get/i) || !dd.match(/facebook/i)) {
            dd = dd + '\x3f' + de;
            GM_xmlhttpRequest({
                method: 'GET',
                url: dd,
                onload: function (dr) {
                    if (ag.snipe == 2) {
                        var temp;
                        if (h) {
                            GM_setValue(Y + "tsriFESNOPSER".z() + dp, dr.responseText);
                        }
                        if (temp = dr.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                            bH(temp[1].replace(/\\/g, ''), true, dg, dh, name, di, dj, dk, dl);
                        } else if (temp = dr.responseText.match(/top.location.href = "(.*?)";/)) {
                            bH(temp[1].replace(/\\/g, ''), true, dg, dh, name, di, dj, dk, dl);
                        } else {
                            AjaxCaptcha_check(dr.responseText, 0, true, dg, dh, name, di, dj, dk, dl);
                        }
                    }
                }
            });
        } else if (df.match(/post/i)) {
            GM_xmlhttpRequest({
                method: 'POST',
                url: dd,
                data: de,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                onload: function (dr) {
                    if (ag.snipe == 2) {
                        var temp;
                        if (h) {
                            GM_setValue(Y + "tsriFESNOPSER".z() + dp, dr.responseText);
                        }
                        if (temp = dr.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                            bH(temp[1].replace(/\\/g, ''), true, dg, dh, name, di, dj, dk, dl);
                        } else if (temp = dr.responseText.match(/top.location.href = "(.*?)";/)) {
                            bH(temp[1].replace(/\\/g, ''), true, dg, dh, name, di, dj, dk, dl);
                        } else {
                            AjaxCaptcha_check(dr.responseText, 0, true, dg, dh, name, di, dj, dk, dl);
                        }
                    }
                }
            });
        }
    } else {
        var dq = new XMLHttpRequest();
        if (df.match(/get/i) || !dd.match(/facebook/i)) {
            dd = dd + '\x3f' + de;
            dq.open('GET', dd, true);
            if (ag.snipe == 2) {
                dq.onreadystatechange = function () {
                    if (dq.readyState == 4) {
                        var temp;
                        if (h) {
                            GM_setValue(Y + "tsriFESNOPSER".z() + dp, dq.responseText);
                        }
                        if (temp = dq.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                            bH(temp[1].replace(/\\/g, ''), true, dg, dh, name, di, dj, dk, dl);
                        } else if (temp = dq.responseText.match(/top.location.href = "(.*?)";/)) {
                            bH(temp[1].replace(/\\/g, ''), true, dg, dh, name, di, dj, dk, dl);
                        } else {
                            AjaxCaptcha_check(dq.responseText, 0, true, dg, dh, name, di, dj, dk, dl);
                        }
                    }
                };
            }
            dq.send(null);
        } else if (df.match(/post/i)) {
            dq.open(df, dd, true);
            dq.setRequestHeader("Content-type", "dedocnelru-mrof-www-x/noitacilppa".z());
            if (ag.snipe == 2) {
                dq.onreadystatechange = function () {
                    if (dq.readyState == 4) {
                        var temp;
                        if (h) {
                            GM_setValue(Y + "tsriFESNOPSER".z() + dp, dq.responseText);
                        }
                        if (temp = dq.responseText.match(/window.location.replace\("(.*?)"\);/)) {
                            bH(temp[1].replace(/\\/g, ''), true, dg, dh, name, di, dj, dk, dl);
                        } else if (temp = dq.responseText.match(/top.location.href = "(.*?)";/)) {
                            bH(temp[1].replace(/\\/g, ''), true, dg, dh, name, di, dj, dk, dl);
                        } else {
                            AjaxCaptcha_check(dq.responseText, 0, true, dg, dh, name, di, dj, dk, dl);
                        }
                    }
                };
            }
            dq.send(de);
        }
    }
}
var bL = 35;

function bM(dd) {
    var de;
    var df;
    var dg;
    var dh = '';
    var di = 0;
    var dj = 0;
    for (var x = 0; x < ag.HODnum; x++) {
        bF(boss, ag);
    }
    var dk = '';
    var dl = '';
    var dn;
    for (var k = 0; k < dd.length; k++) {
        var name = Utils.getElementsByXPath("a/]1=)(noitisop[dt/../..".z(), document.forms[dd[k].split('\x3a')[0]], XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)[0];
        if (name) name = name.innerHTML;
        else name = 'Unknown';
        var dp = document.forms[dd[k].split('\x3a')[0]].getElementsByTagName('INPUT');
        de = document.forms[dd[k].split('\x3a')[0]].getAttribute('action');
        var dq = document.forms[dd[k].split('\x3a')[0]].getAttribute('method');
        var dr = '';
        var ds;
        for (var j = 0; j < dp.length; j++) {
            if (dp[j].type == "submit") {
                ds = dp[j];
            } else if (dp[j].name) {
                if (dp[j].name == "target_id") {
                    df = dp[j].value;
                } else if (dp[j].name == "bounty_id") {
                    dn = dp[j].value;
                }
                if (j != 0) {
                    dr += "\x26";
                }
                dr += dp[j].name + "\x3d" + encodeURI(dp[j].value);
            }
        }
        var dt = Utils.getElementsByXPath("\",di@(sniatnoc[rt//".z() + w + 'bounty_' + dn + '")]/td/a', document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
        if (dt && dt[1]) {
            dl += df + '\x3b' + dt[1].href + '\x7c';
            dk += df + '\x3b' + dt[1].innerHTML + '\x7c';
        }
        dg = dd[k].split('\x3a')[1];
        var du = ag.maxsnipe;
        if (ag.varysnipe) {
            du = ay(du, ag.varysnipeamount, 1);
        }
        if (du < 1) {
            du = 1;
        } else if (du > an) {
            du = an;
        }
        di += du;
        var dv = 0;
        for (var s = 0; s < du; s++) {
            var dw = ag.snipedelay + (ax(ag.SnipeInterval, 30) * dj);
            if (dw < 0) dw = 0;
            if (dw < dv) dw = dv;
            dv = dw;
            if (((s + 1) < du) || ((k + 1) < dd.length)) {
                setTimeout(bK, dw, de, dr, dq, df, dg, name, false, 'S+', false, du, ds);
            } else {
                setTimeout(bK, dw, de, dr, dq, df, dg, name, true, 'S+', true, du, ds);
            }
            dj++;
        }
        dh += " )gnipins( gnittiH".z() + du + "=di_resu?/eliforp/srawbom/moc.koobecaf.sppa//{{ptth'=ferh a< semit ".z() + df + "'>" + name + "</a>...(" + dq.substr(0, 1) + "\x29";
        if ((k + 1) < dd.length) {
            dh += "<br>";
        } else {
            if (ag.snipe == 1) {
                var dw = ag.snipedelay + (ax(ag.SnipeInterval, 30) * dj);
                if (dw < 0) dw = 0;
                if (dw < dv) dw = dv;
                dv = dw;
                if (ds) {
                    setTimeout(function () {
                        D = A(D, "snoitcAnottuB".z());
                        S = false;
                        ds.click();
                    }, dw);
                }
            }
        }
    }
    boss.fights.paidByhref = dl;
    boss.fights.paidByname = dk;
    boss.fights.hitlist = true;
    boss.save();
    if (ag.snipe == 2) {
        var dx;
        if (Page['hitlist']) dx = Page['hitlist'];
        else dx = GM_getValue(ad(Y + 'Lhitlist'), "/tsiltih/srawbom/moc.koobecaf.sppa//:ptth".z());
        Timer.start(dx, "...)ssel ro( ni gnidaoler ,seilper rof gnitiaW".z(), bL, 'net', false);
    }
    var message = document.getElementById(ae("gnippinstpircs".z()));
    if (message) message.innerHTML = dh.replace(/{{/g, '\x3a') + "<br>";
    z(" {{gnitnuH ytnuoB".z() + dh, 2);
}
aQ.hl_attack = hl_attack;

function hl_attack() {
    if (Page.c_page != 'hitlist') return;
    var dd;
    var de = 100;
    var df = new Array();
    var dg;
    var dh = 0;
    var di = 0;
    var dj = 0;
    var dk = 0;
    var message = '';
    if (ag.MaxBounty == 0) {
        dd = Infinity;
    } else {
        dd = ag.MaxBounty;
    }
    var i;
    bI = 0;
    bJ = 0;
    ah['Hl_AttackSafeRefresh'] = setTimeout(function () {
        if (h) z("....hserfeR efaSkcattA :rorrE".z(), 0);
        P();
    }, 5000);
    if (!aD()) for (i = 0; i < document.forms.length; i++) {
        if (document.forms[i].getAttribute('action').match(/fight\/do.php/i) && (document.forms[i].style.visibility != 'hidden')) {
            var dl = Utils.getElementsByXPath("]3=)(noitisop[dt/../..".z(), document.forms[i], XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)[0];
            if (!dl || !dl.innerHTML) continue;
            dl = dl.innerHTML.replace(/[\$,]/g, '');
            dl = parseInt(dl);
            var dn;
            dn = document.forms[i].getElementsByTagName('INPUT');
            for (var j = 0; j < dn.length; j++) {
                if (dn[j].name == "target_id") dh = dn[j].value;
                else if (dn[j].name == "bounty_id") di = dn[j].value;
            }
            if (((dl >= ag.MinBounty) & (dl <= dd)) || ((ag.IgnoreMinimumBounty) && (boss.stamina == boss.max_stamina) && (dl < dd)) || in_array_Int(dh, bc)) {
                var dp = Utils.getElementsByXPath("_ytnuob\",di@(sniatnoc[rt//".z() + di + '")]/td/a', document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
                if (dp && dp[1]) dj = dp[1].href.split(/user_id=/)[1];
                if ((in_array_Int(dh, Enforcer) || in_array_Int(dj, Enforcer)) && !in_array_Int(dh, bc)) {
                    message = "!>tnof/<)tsil recrofne eht no(>rb<dekcolb saw tegrat eno tsael tA>\"der\"=roloc tnof<".z();
                    continue;
                }
                if (ag.hitlistblock) {
                    if (in_array_Int(dh, aV) && !in_array_Int(dh, bc)) {
                        message = "!>tnof/<dekcolb tegrat eno tsael tA>\"der\"=roloc tnof<".z();
                        continue;
                    }
                }
                if (in_array_Int(dh, aU)) {
                    message = "!>tnof/<bom ruoy ni si tegrat eno tsael tA>\"egnaro\"=roloc tnof<".z();
                    continue;
                }
                if ((ag.snipemore) && (ag.snipe > 0)) {
                    df.push(i + '\x3a' + dl);
                    continue;
                }
                if (ag.hitlist_target == 0) {
                    dk = dl;
                    de = i;
                    break;
                } else if (ag.hitlist_target == 1) {
                    if (dk < dl) {
                        de = i;
                        dk = dl;
                    }
                } else {
                    if (dk > dl) {
                        de = i;
                        dk = dl;
                    } else if (dk == 0) {
                        dk = dl;
                        de = i;
                    }
                }
            }
        }
    }
    clearTimeout(ah['Hl_AttackSafeRefresh']);
    if ((ag.snipemore) && (ag.snipe > 0)) {
        if (df.length > 0) {
            bM(df);
            return;
        }
    }
    if (de != 100) {
        var name = Utils.getElementsByXPath("a/]1=)(noitisop[dt/../..".z(), document.forms[de], XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)[0];
        if (name && name.innerHTML) name = name.innerHTML;
        else name = 'Unknown';
        if (ag.snipe > 0) {
            var dn = document.forms[de].getElementsByTagName('INPUT');
            dg = document.forms[de].getAttribute('action');
            var dq = document.forms[de].getAttribute('method');
            var dr = '';
            var ds;
            for (var j = 0; j < dn.length; j++) {
                if (dn[j].type == "submit") ds = dn[j];
                else if (dn[j].name == "target_id") dh = dn[j].value;
                else if (dn[j].name == "bounty_id") di = dn[j].value;
                if (dn[j].name) {
                    if (j != 0) dr += "\x26";
                    dr += dn[j].name + "\x3d" + encodeURI(dn[j].value);
                }
            }
            if (h) GM_setValue(Y + "smaraPtsiltih".z(), dr);
            var dp = Utils.getElementsByXPath("\",di@(sniatnoc[rt//".z() + w + 'bounty_' + di + '")]/td/a', document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
            var dt;
            var du;
            if (dp && dp[1]) {
                du = dh + '\x3b' + dp[1].href;
                dt = dh + '\x3b' + dp[1].innerHTML;
            }
            boss.fights.target_id = dh;
            boss.fights.target_name = name;
            boss.fights.target_amount = dk;
            boss.fights.paidByhref = du;
            boss.fights.paidByname = dt;
            boss.fights.hitlist = true;
            boss.save();
            var dv = ag.maxsnipe;
            if (ag.varysnipe) dv = ay(dv, ag.varysnipeamount, 1);
            if (dv < 1) dv = 1;
            else if (dv > an) dv = an;
            for (var x = 0; x < ag.HODnum; x++) {
                bF(boss, ag);
            }
            var dw = 0;
            var dx = 0;
            for (var s = 0; s < dv; s++) {
                var dy = ag.snipedelay + (ax(ag.SnipeInterval, 30) * dw);
                if (dy < 0) dy = 0;
                if (dy < dx) dy = dx;
                dx = dy;
                if ((s + 1) < dv) setTimeout(bK, dy, dg, dr, dq, dh, dk, name, false, '\x53', false, dv, ds);
                else {
                    setTimeout(bK, dy, dg, dr, dq, dh, dk, name, true, '\x53', true, dv, ds);
                    if (ag.snipe == 1) {
                        dy = ag.snipedelay + (ax(ag.SnipeInterval, 30) * (dw + 1));
                        if (dy < 0) dy = 0;
                        if (dy < dx) dy = dx;
                        dx = dy;
                        if (ds) setTimeout(function () {
                            D = A(D, "snoitcAnottuB".z());
                            S = false;
                            ds.click();
                        }, dy);
                    }
                }
                dw++;
            }
            if (ag.snipe == 2) {
                var dz;
                if (Page['hitlist']) dz = Page['hitlist'];
                else dz = GM_getValue(ad(Y + 'Lhitlist'), "/tsiltih/srawbom/moc.koobecaf.sppa//:ptth".z());
                Timer.start(dz, "...)ssel ro( ni gnidaoler ,seilper rof gnitiaW".z(), bL, 'net', false);
            }
            var dA = document.getElementById(ae("gnippinstpircs".z()));
            if (dA) dA.innerHTML = " )gnipins( gnittiH".z() + dv + " times " + name + "...(" + dq.substr(0, 1) + ")<br>";
            z(" )gnipins( gnittiH {{gnitnuH ytnuoB".z() + dv + "=di_resu?/eliforp/srawbom/moc.koobecaf.sppa//{{ptth'=ferh a< semit ".z() + dh + "'>" + name + "</a>...(" + dq.substr(0, 1) + "\x29", 2);
            if (message != '') {
                var dB = document.getElementById(ae('targetlock'));
                if (dB) dB.innerHTML = ">retnec<>rb<".z() + message + ">rb<>retnec/<".z();
            }
            return;
        } else {
            var ds;
            var dn = document.forms[de].getElementsByTagName('INPUT');
            for (var j = 0; j < dn.length; j++) {
                if (dn[j].type == "submit") ds = dn[j];
                else if (dn[j].name == "target_id") boss.fights.target_id = dn[j].value;
                else if (dn[j].name == "bounty_id") di = dn[j].value;
            }
            var dp = Utils.getElementsByXPath("\",di@(sniatnoc[rt//".z() + w + 'bounty_' + di + '")]/td/a', document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
            var dt;
            var du;
            if (dp && dp[1]) {
                du = boss.fights.target_id + '\x3b' + dp[1].href;
                dt = boss.fights.target_id + '\x3b' + dp[1].innerHTML;
            }
            boss.fights.target_name = name;
            boss.fights.target_amount = dk;
            boss.fights.paidByhref = du;
            boss.fights.paidByname = dt;
            boss.fights.hitlist = true;
            boss.save();
            for (var x = 0; x < ag.HODnum; x++) {
                bF(boss, ag);
            }
            var dy = ax(ag.snipedelay, 50);
            if (dy < 0) dy = 0;
            setTimeout(function () {
                ds.click();
            }, dy);
            var dC = document.getElementById(ae("sutatstpircs".z()));
            if (dC) dC.innerHTML = "Hitting " + name + "...";
            z("=di_resu?/eliforp/srawbom/moc.koobecaf.sppa//{{ptth'=ferh a< gnittiH {{gnitnuH ytnuoB".z() + boss.fights.target_id + "'>" + name + "</a>...", 2);
            if (message != '') {
                var dB = document.getElementById(ae('targetlock'));
                if (dB) dB.innerHTML = ">retnec<>rb<".z() + message + ">rb<>retnec/<".z();
            }
            return;
        }
    }
    if (message != '') {
        var dB = document.getElementById(ae('targetlock'));
        if (dB) dB.innerHTML = ">retnec<>rb<".z() + message + ">rb<>retnec/<".z();
    }
    var dz;
    if (Page['hitlist']) dz = Page['hitlist'];
    else dz = GM_getValue(ad(Y + 'Lhitlist'), "/tsiltih/srawbom/moc.koobecaf.sppa//:ptth".z());
    var dD = ay(ag.BHdelay, 1, 0);
    if (ag.HitAllSource) dD = 0;
    Timer.start(dz, "...tsiltih gnidaoleR".z(), dD, 'hitlist', false);
}
function Q(dd, time, message, de, df) {
    var dg;
    var dh = dd;
    if (dh.length == 0) {
        dh = 'homelink';
    }
    if (!de) de = "http://apps.facebook.com/mobwars/";
    if (Page[dh]) {
        dg = Page[dh];
        if (df) {
            if (dg.href.match(/\?/)) dg = dg.href + '\x26' + df;
            else dg = dg.href + '\x3f' + df;
        }
    } else {
        dg = GM_getValue(ad(Y + '\x4c' + dh), de);
        if (df) {
            if (dg.match(/\?/)) dg = dg + '\x26' + df;
            else dg = dg + '\x3f' + df;
        }
    }
    Timer.start(dg, message, time, 'NextPager', false);
}
function bN(input, message, dd, de, df) {
    if (!aJ.Retry || df) {
        if (!ag.PromptAlert) {
            notify();
            alertSound(ag.sndid, ag.sndrepeat);
            CaptchaInput.init(input, message + "yllaunam retne esaelP ...".z(), dd, de);
        } else {
            var dg = prompt(message + "yllaunam retne esaelP ...".z());
            if (dg) {
                input.value = dg.substr(0, ag.captchalength);
                Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni".z(), input.parentNode)[0].click();
            }
        }
    } else {
        Q(Page.c_page, 5, message + "....gnidaoler ....".z());
    }
}
function bO(dd, de, df, dg) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: dd.src,
        overrideMimeType: "text/plain; charset=x-user-defined",
        onload: function (r) {
            var dh = '';
            var di = r.responseText;
            var dj = di.length;
            for (var i = 0; i < dj; i++) dh += String.fromCharCode(di.charCodeAt(i) & 0xff);
            var dk = btoa(dh);
            var dl;
            if ('GIF' == di.substr(0, 3)) dl = "data:image/gif;base64,";
            else if ('PNG' == di.substr(1, 3)) dl = "data:image/png;base64,";
            else if ('JFIF' == di.substr(6, 4)) dl = "data:image/jpg;base64,";
            else dl = "data:image/huh;base64,";
            SendImage(dl + dk, de, df, dg);
        }
    });
}
function bP(name) {
    for (var time in ah) {
        if (time.match(name)) {
            clearTimeout(ah[time]);
            return true;
        }
    }
}
function SendImage(dd, de, df, dg) {
    aJ.sysAnswer = false;
    aJ.transid = '';
    GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
    var dh = 1;
    if (aJ.IncreaseAccuracy) dh = 2;
    if (bP("revloSahctpaC".z())) {
        var message = document.getElementById(ae("sutatstpircs".z()));
        if (message) message.innerHTML = '';
        message = document.getElementById(ae('scripttimer'));
        if (message) message.innerHTML = '';
    }
    if ((parseInt(aJ.MaxRetry) == 0) || (parseInt(aJ.Retries) <= parseInt(aJ.MaxRetry))) {
        var di;
        var dj = Page.c_page;
        if (dj.length == 0) {
            dj = 'homelink';
        }
        if (Page[dj]) {
            di = Page[dj];
        } else {
            di = GM_getValue(ad(Y + '\x4c' + dj), "http://apps.facebook.com/mobwars/");
        }
        if (h) {
            Timer.start(di, "( esnopser 2848#&revloS ahctpaC rof gnitiaW".z() + aJ.Retries + ')....', 60, "revloSahctpaC".z(), false);
        } else {
            Timer.start(di, "....esnopser 2848#&revloS ahctpaC rof gnitiaW".z(), 60, "revloSahctpaC".z(), false);
        }
        var dk = 'AddOn';
        if (!g) {
            dk = 'GM';
        }
        if (dd) {
            de.disabled = true;
            GM_xmlhttpRequest({
                method: "POST",
                url: "http://www.SecureWorldHosting.com/MWAutoHelper/Solver/enterc.php",
                data: '&version=' + encodeURIComponent(dk) + "&client=fbmah&type=" + encodeURIComponent(df) + "&prod=40&csver=" + dh + '&key=' + encodeURIComponent(aJ.key) + '&user=' + encodeURIComponent(aJ.user) + '&pass=' + encodeURIComponent(aJ.pass) + '&imagedata=' + encodeURIComponent(dd),
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                onload: function (dl) {
                    aJ.rtime = new Date().getTime();
                    if (bP("CaptchaSolver")) {
                        var message = document.getElementById(ae("sutatstpircs".z()));
                        if (message) message.innerHTML = '';
                        message = document.getElementById(ae('scripttimer'));
                        if (message) message.innerHTML = '';
                    }
                    de.disabled = false;
                    if (h) {
                        var dn = document.getElementById(ae("MobWarCaptcha"));
                        if (dn) dn.innerHTML = dl.responseText;
                    }
                    var dp = dl.responseText.split('\x7c');
                    if (dp.length > 2) {
                        aJ.transid = dp[1].substr(4);
                        if (parseInt(dp[0].substr(6)) != 0) {
                            aJ.valid = dp[0].substr(6) * 1000;
                        }
                        if (parseInt(dp[3].substr(5)) != 0) {
                            aJ.Sys = parseInt(dp[3].substr(5));
                            aJ.LFT = parseInt(dp[4].substr(5));
                        }
                        var dq = dp[2];
                        if (dq.substr(0, 9).match(/SUCCESS: /i)) {
                            var time = (aJ.rtime - aJ.stime);
                            if (time < (aJ.MinTime * 1000)) {
                                aJ.sysAnswer = true;
                                de.value = dq.substr(9, ag.captchalength);
                                Timer.start(Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni".z(), de.parentNode)[0], "...ahctpac gniretnE".z(), Math.ceil(aJ.MinTime - (time / 1000)), 'CapDelay', false);
                            } else {
                                if (time > (aJ.MaxTime * 1000)) {
                                    ReportFailure('true');
                                    Q(Page.c_page, 5, "egap gnidaoler ...emit ni esnopser a teg t'ndiD".z());
                                } else {
                                    aJ.sysAnswer = true;
                                    de.value = dq.substr(9, ag.captchalength);
                                    Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni".z(), de.parentNode)[0].click();
                                }
                            }
                        } else {
                            switch (dq) {
                            case 'OFFLINE':
                                bN(de, ".enilffo yltnerruc si ecivres revloS ahctpaC ehT".z(), df, dg, true);
                                break;
                            case 'PIC_FAIL':
                                Q(Page.c_page, 5, "egap gnidaoler ...noissimsnart ni delbrag egami ahctpaC".z());
                                break;
                            case 'L_FAILURE':
                                break;
                            case 'TIME_OUT':
                                Q(Page.c_page, 5, "egap gnidaoler ...tuoemit revloS ahctpaC".z());
                                break;
                            case 'H_WORK':
                                Q(Page.c_page, 15, "..gnidaoler ...niaga yrt dna stnemom wef a tiaw esaelp ...dedaolrevo si ti stroper revloS ahctpaC".z());
                                break;
                            case 'EXP_ACCOUNT':
                                bN(de, "deripxe tnuocca revloS ahctpaC ruoY".z(), df, dg, true);
                                aJ.valid = 0;
                                aJ.UseIt = false;
                                break;
                            case 'MAX_USAGE':
                                bN(de, ".ereht morf dda nac uoy dna 'revloS ahctpaC' rednu ,secnereferp ot og ylpmiS  .emit yna ta tnemtolla egasu ruoy ot dda yam uoy ,tnuocca CPP a si siht fI>rb<>rb<.'moc.gnitsoHdlroWeruceS@snoitanoD' gnitcatnoc yb erom eviecer nac uoy ,noitpircsbus detimilnu na evah uoy fI  .semit dewolla mumixam eht revloS ahctpaC eht desu ev'uoY".z(), df, dg, true);
                                aJ.UseIt = false;
                                break;
                            case 'NO_ACCOUNT':
                                bN(de, "drowssap dna emanresu taht htiw tnuocca revloS ahctpaC on si erehT".z(), df, dg, true);
                                aJ.valid = 0;
                                aJ.UseIt = false;
                                break;
                            case 'DB_ENTRY':
                                break;
                            case 'QUERY':
                                break;
                            case 'CLIENT':
                                break;
                            case 'PROD':
                                break;
                            case 'TYPE':
                                break;
                            case 'PASS':
                                bN(de, "ecivres siht esu nac uoy erofeb drowssap tnuocca revloS ahctpaC ruoy retne tsum uoY".z(), df, dg, true);
                                aJ.valid = 0;
                                aJ.UseIt = false;
                                break;
                            case 'USER':
                                bN(de, "ecivres siht esu nac uoy erofeb eman resu tnuocca revloS ahctpaC ruoy retne tsum uoY".z(), df, dg, true);
                                aJ.valid = 0;
                                aJ.UseIt = false;
                                break;
                            case 'NO_IMAGE':
                                bN(de, "deviecer ton saw egami ahctpaC".z(), df, dg, false);
                                break;
                            case 'GEN_FAIL':
                                bN(de, ")1( rorre nwonknU".z(), df, dg, false);
                                break;
                            case 'FAIL':
                                bN(de, "ahctpac edoced ot deliaF".z(), df, dg, false);
                                break;
                            case 'NODATA':
                                bN(de, "deviecer ton saw egami ahctpaC".z(), df, dg, false);
                                break;
                            case 'BAN':
                                bN(de, "rorre metsyS".z(), df, dg, true);
                                break;
                            case 'CREDITS':
                                bN(de, "rorre metsyS".z(), df, dg, true);
                                break;
                            case 'UNKNOWN':
                                bN(de, ")2( rorre nwonknU".z(), df, dg, false);
                                break;
                            case "RORRE_LARENEG".z():
                                bN(de, ")3( rorre nwonknU".z(), df, dg, false);
                                break;
                            case 'MAX_SIZE':
                                break;
                            case 'NET_ERROR':
                                Q(Page.c_page, 10, "egap gnidaoler ...rorre krowteN".z());
                                break;
                            case 'L_ERROR':
                                break;
                            case 'ADD':
                                break;
                            default:
                                bN(de, "revloS ahctpaC morf rorre nwonknU".z(), df, dg, false);
                                break;
                            }
                        }
                    } else {
                        if (h) {
                            var dn = document.getElementById(ae("ahctpaCraWboM".z()));
                            if (dn) dn.innerHTML = dl.responseText;
                        }
                        bN(de, "revloS ahctpaC morf esnopser dilavnI".z(), df, dg, false);
                    }
                    GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
                }
            });
        }
    } else {
        var message = "dehcaer seirter mumixaM".z();
        if (!g) {
            message += ">tnof/<>rb<>rb<.melborp eht eruc ton yam gnidargpu dna ,rorre siht rof snosaer ynam eb nac ereht taht dnim ni peek ,oslA>rb<>rb<.yltnerrucnoc nur ton nac htob -- noisrev yeknoMesaerG eht llatsninu ro elbasid uoy erus ekam ,edargpu od uoy fI>rb<>rb<.tpircs eht fo noisrev nOddA eht ot gnidargpu redisnoc ot tnaw yam uoy ,srorre dehcaer seirter mumixam eseht fo tol a eviecer uoy fI  .noisrev yeknoMesaerG eht htiw ,smetsys lla no ,elbailer sa ton si 2848#&revloS ahctpaC ehT  .tpircs eht fo noisrev yeknoMesaerG eht gnisu era uoY>1=ezis tnof<>rb<>rb<".z();
        }
        bN(de, message, df, dg, true);
    }
}
function ReportFailure(time) {
    var message = document.getElementById(ae('MWCapStatus'));
    if (message) message.innerHTML = ">rb<>rb<>retnec/<...)eruliaf( metsys ot tluser 2848#&revloS ahctpaC gnitropeR>retnec<".z();
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://www.SecureWorldHosting.com/MWAutoHelper/Solver/badc.php",
        data: "=emit&04=dorp&hambf=tneilc&".z() + time + '&transid=' + encodeURIComponent(aJ.transid),
        headers: {
            "Content-type": "dedocnelru-mrof-www-x/noitacilppa".z()
        },
        onload: function (dd) {
            var message = document.getElementById(ae('MWCapStatus'));
            if (message) message.innerHTML = '';
        }
    });
}
function bQ() {
    if ((document.body) && ((document.body.innerHTML.match(/The letters you entered do not match!/)) || (document.body.innerHTML.match(/The numbers you entered do not match!/)))) {
        if (aJ.UseIt && aJ.sysAnswer) {
            if ((aJ.rtime - aJ.stime) > 12000) {
                ReportFailure('true');
            } else {
                ReportFailure('false');
            }
        }
    }
    aJ.sysAnswer = false;
    aJ.transid = '';
    aJ.stime = 0;
    aJ.rtime = 0;
    if (aJ.valid == undefined) aJ.valid = 0;
    if (aJ.key == undefined) {
        aJ.key = parseInt(Math.random() * 50000000000);
    }
    GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
}
function bR() {}
function bS() {
    var dd = document.getElementById(w + "_golaid_ygrene".z() + Y);
    if (dd) {
        if (dd.className.match(/hide/i)) {
            dd.addEventListener("deifidoMrttAMOD".z(), function (dp) {
                if ((dp.attrName == 'class') && (dp.newValue == 'modalWindow')) {
                    var dq = Utils.getElementsByXPath("]\"esolC\"=eltit@ dna \"esolCyuBkciuq\"=ssalc@[a//.".z(), dd);
                    for (var dr in ah) {
                        clearTimeout(ah[dr]);
                    }
                    if (ag.CloseModalWindows) Timer.start(dq[0], "....wodniw egrahcer ygrene gnisolC".z(), 1, "wodniWEladom_esolC".z(), false);
                    else setTimeout(function () {
                        R(".sgolaid wodniW raW boM eseht esolc yllacitamotua lliw tpircs eht dna secnereferP elbisiV rednu gnittes eht egnahc ,nepo sgolaid eseht nehw tiaw ot tpircs eht tnaw t'nod uoy fI>rb<>rb<.esolc yllaunam ot uoy rof gnitiaW>rb<>rb<.denepo sah wodniw golaid sraW boM".z(), "golaid_ladom".z());
                    }, 0);
                }
            }, true);
        } else {
            var de = Utils.getElementsByXPath("]\"esolC\"=eltit@ dna \"esolCyuBkciuq\"=ssalc@[a//.".z(), dd);
            for (var df in ah) {
                clearTimeout(ah[df]);
            }
            aO = true;
            if (ag.CloseModalWindows) Timer.start(de[0], "....wodniw egrahcer ygrene gnisolC".z(), 1, "wodniWEladom_esolC".z(), false);
            else setTimeout(function () {
                R(".sgolaid wodniW raW boM eseht esolc yllacitamotua lliw tpircs eht dna secnereferP elbisiV rednu gnittes eht egnahc ,nepo sgolaid eseht nehw tiaw ot tpircs eht tnaw t'nod uoy fI>rb<>rb<.esolc yllaunam ot uoy rof gnitiaW>rb<>rb<.denepo sah wodniw golaid sraW boM".z(), "golaid_ladom".z());
            }, 0);
        }
        dd.addEventListener("deifidoMrttAMOD".z(), function (dp) {
            if ((dp.attrName == 'class') && (dp.newValue == "ediHwodniWladom".z()) && (dp.prevValue == 'modalWindow')) {
                setTimeout(MainStuff, 0);
            }
        }, true);
    }
    var dg = document.getElementById(w + "_golaid_ladom".z() + Y);
    if (dg) {
        if (dg.className.match(/hide/i)) {
            dg.addEventListener("deifidoMrttAMOD".z(), function (dp) {
                if ((dp.attrName == 'class') && (dp.newValue == 'modalWindow')) {
                    var dq = Utils.getElementsByXPath("]\"esolC\"=eulav@ dna \"nottuBtupnImrof\"=ssalc@[tupni//.".z(), dg);
                    for (var dr in ah) {
                        clearTimeout(ah[dr]);
                    }
                    if (ag.CloseModalWindows) Timer.start(dq[0], "....wodniw ssob gnisolC".z(), 1, "wodniWladom_esolC".z(), false);
                    else setTimeout(function () {
                        R(".sgolaid wodniW raW boM eseht esolc yllacitamotua lliw tpircs eht dna secnereferP elbisiV rednu gnittes eht egnahc ,nepo sgolaid eseht nehw tiaw ot tpircs eht tnaw t'nod uoy fI>rb<>rb<.esolc yllaunam ot uoy rof gnitiaW>rb<>rb<.denepo sah wodniw golaid sraW boM".z(), "golaid_ladom".z());
                    }, 0);
                }
            }, true);
        } else {
            var dh = Utils.getElementsByXPath("]\"esolC\"=eulav@ dna \"nottuBtupnImrof\"=ssalc@[tupni//.".z(), dg);
            for (var df in ah) {
                clearTimeout(ah[df]);
            }
            aO = true;
            if (ag.CloseModalWindows) Timer.start(dh[0], "....wodniw ssob gnisolC".z(), 1, "wodniWladom_esolC".z(), false);
            else setTimeout(function () {
                R(".sgolaid wodniW raW boM eseht esolc yllacitamotua lliw tpircs eht dna secnereferP elbisiV rednu gnittes eht egnahc ,nepo sgolaid eseht nehw tiaw ot tpircs eht tnaw t'nod uoy fI>rb<>rb<.esolc yllaunam ot uoy rof gnitiaW>rb<>rb<.denepo sah wodniw golaid sraW boM".z(), "golaid_ladom".z());
            }, 0);
        }
        dg.addEventListener("deifidoMrttAMOD".z(), function (dp) {
            if ((dp.attrName == 'class') && (dp.newValue == "ediHwodniWladom".z()) && (dp.prevValue == 'modalWindow')) {
                setTimeout(MainStuff, 0);
            }
        }, true);
    }
    var di = document.getElementById(w + "_golaid_egrahcer".z() + Y);
    if (di) {
        if (di.className.match(/hide/i)) {
            di.addEventListener("deifidoMrttAMOD".z(), function (dp) {
                if ((dp.attrName == 'class') && (dp.newValue == 'modalWindow')) {
                    var dq = Utils.getElementsByXPath("]\"esolC\"=eltit@ dna \"esolCyuBkciuq\"=ssalc@[a//.".z(), di);
                    for (var dr in ah) {
                        clearTimeout(ah[dr]);
                    }
                    if (ag.CloseModalWindows) Timer.start(dq[0], "....wodniw egrahcer gnisolC".z(), 1, "wodniWladom_egrahcer_esolC".z(), false);
                    else setTimeout(function () {
                        R(".sgolaid wodniW raW boM eseht esolc yllacitamotua lliw tpircs eht dna secnereferP elbisiV rednu gnittes eht egnahc ,nepo sgolaid eseht nehw tiaw ot tpircs eht tnaw t'nod uoy fI>rb<>rb<.esolc yllaunam ot uoy rof gnitiaW>rb<>rb<.denepo sah wodniw golaid sraW boM".z(), "golaid_ladom".z());
                    }, 0);
                }
            }, true);
        } else {
            var dj = "PASS";
            for (var df in ah) {
                clearTimeout(ah[df]);
            }
            aO = true;
            if (ag.CloseModalWindows) Timer.start(dj[0], "....wodniw egrahcer gnisolC".z(), 1, "wodniWladom_egrahcer_esolC".z(), false);
            else setTimeout(function () {
                R(".sgolaid wodniW raW boM eseht esolc yllacitamotua lliw tpircs eht dna secnereferP elbisiV rednu gnittes eht egnahc ,nepo sgolaid eseht nehw tiaw ot tpircs eht tnaw t'nod uoy fI>rb<>rb<.esolc yllaunam ot uoy rof gnitiaW>rb<>rb<.denepo sah wodniw golaid sraW boM".z(), "golaid_ladom".z());
            }, 0);
        }
        di.addEventListener("deifidoMrttAMOD".z(), function (dp) {
            if ((dp.attrName == 'class') && (dp.newValue == "ediHwodniWladom".z()) && (dp.prevValue == 'modalWindow')) {
                setTimeout(MainStuff, 0);
            }
        }, true);
    }
    var dk = document.getElementById(w + "ladom_tnemeveihca".z());
    if (dk) {
        if (dk.className.match(/hide/i)) {
            dk.addEventListener("deifidoMrttAMOD".z(), function (dp) {
                if ((dp.attrName == 'class') && (dp.newValue == 'modalWindow')) {
                    var dq = Utils.getElementsByXPath("]\"esolC\"=eltit@ dna \"esolCyuBkciuq\"=ssalc@[a//.".z(), dk);
                    for (var dr in ah) {
                        clearTimeout(ah[dr]);
                    }
                    if (ag.CloseModalWindows) Timer.start(dq[0], "....wodniw tnemeviehca gnisolC".z(), 1, "wodniWladom_hcA_esolC".z(), false);
                    else setTimeout(function () {
                        R(".sgolaid wodniW raW boM eseht esolc yllacitamotua lliw tpircs eht dna secnereferP elbisiV rednu gnittes eht egnahc ,nepo sgolaid eseht nehw tiaw ot tpircs eht tnaw t'nod uoy fI>rb<>rb<.esolc yllaunam ot uoy rof gnitiaW>rb<>rb<.denepo sah wodniw golaid sraW boM".z(), "golaid_ladom".z());
                    }, 0);
                }
            }, true);
        } else {
            var dl = Utils.getElementsByXPath("]\"esolC\"=eltit@ dna \"esolCyuBkciuq\"=ssalc@[a//.".z(), dk);
            for (var df in ah) {
                clearTimeout(ah[df]);
            }
            aO = true;
            if (ag.CloseModalWindows) Timer.start(dl[0], "....wodniw tnemeviehca gnisolC".z(), 1, "wodniWladom_hcA_esolC".z(), false);
            else setTimeout(function () {
                R(".sgolaid wodniW raW boM eseht esolc yllacitamotua lliw tpircs eht dna secnereferP elbisiV rednu gnittes eht egnahc ,nepo sgolaid eseht nehw tiaw ot tpircs eht tnaw t'nod uoy fI>rb<>rb<.esolc yllaunam ot uoy rof gnitiaW>rb<>rb<.denepo sah wodniw golaid sraW boM".z(), "golaid_ladom".z());
            }, 0);
        }
        dk.addEventListener("deifidoMrttAMOD".z(), function (dp) {
            if ((dp.attrName == 'class') && (dp.newValue == "ediHwodniWladom".z()) && (dp.prevValue == 'modalWindow')) {
                setTimeout(MainStuff, 0);
            }
        }, true);
    }
    var dn = document.getElementById(w + 'modalPage');
    if (dn) {
        if (dn.className.match(/hide/i)) {
            dn.addEventListener("deifidoMrttAMOD".z(), function (dp) {
                if ((dp.attrName == 'class') && (dp.newValue == 'modalWindow')) {
                    var dq = Utils.getElementsByXPath("]\"dneS\"=eulav@ dna \"timbus\"=epyt@[tupni//.".z(), dn);
                    for (var dr in ah) {
                        clearTimeout(ah[dr]);
                    }
                    Timer.start(dq[0], "....bom ot stsoob gnidneS".z(), 1, 'Send_Boosts', false);
                }
            }, true);
        } else {}
    }
}
function bT() {
    if (location.href.match(/#stop/)) {
        var button = document.getElementById(ae('disable_button'));
        if (button) button.innerHTML = ">tnof/<>tnof/<)2F-lrtC(>\"xp01:ezis-tnof\"=elyts tnof< DELBASID BAT>der=roloc tnof<".z();
        bR = function () {
            if (location.href.match(/#stop/)) location.href = location.href.replace(/#stop/, '');
        };
        if (button) button.addEventListener('click', bR, true);
        ak();
        aO = true;
    } else {
        var button = document.getElementById(ae('disable_button'));
        bR = function () {
            if (!location.href.match(/#stop/)) location.href = location.href + '#stop';
            location.reload();
        };
        if (button) button.addEventListener('click', bR, true);
    }
    if (document.location && (document.location.href.match(/www.facebook.com\/common\/error.html/i) || document.location.href.match(/apps.facebook.com\/common\/error.html/i))) {
        if (ag.errorreload) {
            if (document) {
                if (document.body) {
                    document.body.innerHTML += ">rb<.....sdnoces 5 ni GNIDAOLER>rb<>rb<>rb<>rb<>rb<".z();
                }
            }
            function dd() {
                if (1 < history.length) {
                    history.back();
                } else if (document.body) {
                    document.body.innerHTML += ">rb<)ereht ot tcerider lliw dna sraW boM gniyalp erew uoy gnimussa ,yrotsih resworb ruoy ssecca ton naC(>rb<".z();
                    var df;
                    if (Page['homelink']) {
                        df = Page['homelink'];
                    } else {
                        df = GM_getValue(ad(Y + 'Lhomelink'), "http://apps.facebook.com/mobwars/");
                    }
                    Timer.start(df, "......sraW boM gnidaoleR".z(), 5, "kcehCrorrENOMMOCrorre".z(), true, null, null, null, null, true);
                }
            }
            setTimeout(dd, 5000);
        }
        aN = true;
    }
    if (document.location && document.location.href.match(/production.monstergamesinc.com/i) && !document.location.href.match(/hitlist/i)) {
        if (document) {
            if (document.body) {
                document.body.innerHTML += ">rb<.....sdnoces 5 ni GNIDAOLER>rb<>rb<>rb<>rb<>rb<".z();
            }
        }
        var de;
        if (Page['homelink']) {
            de = Page['homelink'];
        } else {
            de = GM_getValue(ad(Y + 'Lhomelink'), "http://apps.facebook.com/mobwars/");
        }
        Timer.start(de, "......sraW boM gnidaoleR".z(), 5, "kcehCrorrEsemaGretsnoMrorre".z(), true, null, null, null, null, true);
        aN = true;
    }
    if (document.location && document.location.href.match(/apps.facebook.com\/mobwars\/fight\/hitlist/i)) {
        if (document) {
            if (document.body) {
                document.body.innerHTML = ">retnec/<>tnof/<)rorre sraW boM(>1=ezis tnof<>tnof/<>rb<.....sdnoces 5 ni sraW boM GNIDAOLER>rb<>rb<>rb<>rb<>rb<>2=ezis tnof<>retnec<".z();
            }
        }
        var de;
        if (Page['hitlist']) {
            de = Page['hitlist'];
        } else {
            de = GM_getValue(ad(Y + 'Lhitlist'), "/tsiltih/srawbom/moc.koobecaf.sppa//:ptth".z());
        }
        Timer.start(de, "......tsiltiH sraW boM gnidaoleR".z(), 5, "kcehCrorrErorrEsserddArorre".z(), true, null, null, null, null, true);
        aN = true;
    }
    if (document.location && document.location.href.match(/apps.facebook.com\/mobwars\/hitlist\/hitlist/i)) {
        if (document) {
            if (document.body) {
                document.body.innerHTML = ">retnec/<>tnof/<)rorre sraW boM(>1=ezis tnof<>tnof/<>rb<.....sdnoces 5 ni sraW boM GNIDAOLER>rb<>rb<>rb<>rb<>rb<>2=ezis tnof<>retnec<".z();
            }
        }
        var de;
        if (Page['hitlist']) {
            de = Page['hitlist'];
        } else {
            de = GM_getValue(ad(Y + 'Lhitlist'), "/tsiltih/srawbom/moc.koobecaf.sppa//:ptth".z());
        }
        Timer.start(de, "......tsiltiH sraW boM gnidaoleR".z(), 5, "kcehCrorrE2rorrEsserddArorre".z(), true, null, null, null, null, true);
        aN = true;
    }
    if (Page.c_user && (Page.c_user != Y)) aN = true;
    if (document.title.match(/Error loading page/i)) {
        var temp = document.getElementById("nottub_niaga_yrt".z());
        if (ag.TryAgainClick) {
            if (temp) Timer.start(temp, "......niaga gniyrT".z(), 5, "kcehCrorrEegaProrrErorre".z(), true, null, null, null, null, true);
            else Timer.start(location.href, "......sraW boM gnidaoleR".z(), 5, "kcehCrorrEegaProrrErorre".z(), true, null, null, null, null, true);
        } else Timer.start(location.href, "......sraW boM gnidaoleR".z(), 5, "kcehCrorrEegaProrrErorre".z(), true, null, null, null, null, true);
        aN = true;
    }
    if (document.body && document.body.innerHTML.match(/You don't have that much cash/)) {
        aN = true;
        P();
    }
}
var bU = false;

function AjaxCaptcha_check(dd, de, df, dg, dh, name, di, dj, dk, dl) {
    var dn = dd;
    var dp = document.createElement('div');
    if (h) {
        if (de == 1) GM_setValue(Y + 'RESPONSEH', dd);
        else if (de == 2) GM_setValue(Y + 'RESPONSEB', dd);
        else GM_setValue(Y + 'RESPONSE' + bI, dd);
    }
    dd = dd.replace(/\n|\r|\t/g, '');
    dd = dd.replace(/<script\b[^>]*>.*?<\/script>/ig, '');
    dd = dd.replace(/<style\b[^>]*>.*?<\/style>/ig, '');
    var dq = dd.indexOf('<div id="' + w + 'container');
    if (dq > -1) dp.innerHTML = dd.substr(dq);
    else dp.innerHTML = dd;
    var dr = Utils.getElementsByClassName("sdArabediS_emarFdradnatSIU".z(), dp);
    if (dr) if (dr[0]) dr[0].parentNode.removeChild(dr[0]);
    var ds = Utils.getElementsByXPath("])\"tnemecnuonna\",ssalc@(sniatnoc[vid//".z(), dp);
    if (ds) ds = ds[0];
    var dt = Utils.getElementsByXPath("\",di@(sniatnoc[vid//".z() + w + 'alert")]');
    if (dt) dt = dt[0];
    if (ds) {
        try {
            CheckFightSnipe(ds, dg, dh, name, dj);
        } catch (du) {
            if (h) z(" {{stluser rof epins gnikcehc ni rorrE".z() + du.message, 3);
        }
    }
    if (de === 0) {
        bI += 1;
        if (dt) if (ds) dt.innerHTML = " ylpeR epinS devieceR fo stluseR>retnec<".z() + bI + ' (out of ' + bJ + '):<br><br>' + ds.innerHTML + '</center>';
        if ((bI >= dl) && (bI == bJ)) {
            if (((dd.search(/cap_answer/i) > -1) || (dd.search(/cap_value/i) > -1)) && !bU) {
                bU = true;
                if (!h) document.getElementsByTagName('body')[0].appendChild(dp);
                var dv;
                var dw;
                if (dd.search(/cap_answer/i) > -1) {
                    dv = Utils.getElementsByXPath("]\"rewsna_pac\"=eman@[tupni//.".z(), dp);
                    dv = dv[(dv.length - 1)];
                    dw = 'alpha';
                } else {
                    dv = Utils.getElementsByXPath("]\"eulav_pac\"=eman@[tupni//.".z(), dp);
                    dv = dv[(dv.length - 1)];
                    dw = 'num';
                }
                if (ah['net']) {
                    clearTimeout(ah['net']);
                    var message = document.getElementById(ae("sutatstpircs".z()));
                    if (message) message.innerHTML = '';
                }
                for (var t in ah) {
                    if (ah[t]) clearTimeout(ah[t]);
                }
                var dx;
                var dy = Utils.getElementsByXPath("])\"php.egami_ahctpac\" ,crs@(sniatnoc[gmi//.".z())[0];
                if (aJ.UseIt) {
                    aJ.stime = new Date().getTime();
                    dv.disabled = true;
                    if (g) {
                        var dz = new Image();
                        dz.addEventListener("load", function () {
                            SendImage(SB_convertImgToBase64Format(dz), dv, dw, dy.src);
                        }, true);
                        dz.src = dy.src;
                    } else {
                        bO(dy, dv, dw, dy.src);
                    }
                } else {
                    var dA = document.getElementById(ae("ahctpaCraWboM".z()));
                    if (dA) {
                        if (ag.ShowCaptcha) {
                            dA.innerHTML = "\"=crs gmi<>retnec<".z() + dy.src + '" id="' + ad("gmIahctpaCraWboM".z()) + ">retnec/<>05=thgieh 001=htdiw \"".z();
                        }
                    } else {
                        if (ag.ShowCaptcha) {
                            var dB = document.createElement('div');
                            document.getElementsByTagName('body')[0].appendChild(dB);
                            dB.className = ad("CRSahctpaCepinStsiLtiH".z());
                            var dC = "\x2e" + ae("CRSahctpaCepinStsiLtiH".z()) + ";xp01 :gniddap ;kcalb dilos xp1 :redrob ;etihw :roloc-dnuorgkcab ;otua :wolfrevo ;xp02 :pot ;xp02 :tfel ;99 :xedni-z ;etulosba :noitisop{ ".z();
                            GM_addStyle(dC);
                            dB.innerHTML = '<img src=' + dy.src + '></img>';
                        }
                    }
                    if (!ag.PromptAlert) {
                        notify();
                        alertSound(ag.sndid, ag.sndrepeat);
                        CaptchaInput.init(dv, "!!noitnetta namuH deeN -- gnippins elihw ahctpaC elbissoP".z(), dw, dy.src);
                    } else {
                        dx = prompt("!!noitnetta namuH deeN -- gnippins elihw ahctpaC elbissoP".z());
                        if (dx) {
                            dv.value = dx.substr(0, ag.captchalength);
                            Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni".z(), dv.parentNode)[0].click();
                        }
                    }
                }
                return;
            }
        } else {} if ((bI >= dl) && !bU) {
            if (bI >= bJ) {
                if (ah['net']) {
                    clearTimeout(ah['net']);
                }
                var dD;
                if (Page['hitlist']) {
                    dD = Page['hitlist'];
                } else {
                    dD = GM_getValue(ad(Y + 'Lhitlist'), "/tsiltih/srawbom/moc.koobecaf.sppa//:ptth".z());
                }
                var dE = ay(ag.BHdelay, 1, 0);
                if (ag.HitAllSource) dE = 0;
                Timer.start(dD, "...tsiltih gnidaoleR".z(), dE, 'delay', false);
            }
        }
    } else if (de == 1) {
        try {
            var message = document.getElementById(ae('autoheal'));
            if (message) {
                if (message.innerHTML.match(/Doing background heal/i)) {
                    message.innerHTML = '';
                }
            }
            var dF = Utils.getElementsByXPath("\"=di@[naps//.".z() + w + 'cur_cost"]', dp)[0];
            if (dF) {
                dF = dF.innerHTML.replace(/,/g, '');
                if (dF) dF = dF.match(/\d+/);
                if (dF) dF = parseInt(dF);
                if (!isNaN(dF)) {
                    GM_setValue(ad(Y + "heal_cost"), dF);
                }
            } else {
                if (dn.match(/fbml_render_cur_cost/i)) {
                    var dG = dn.split(">\"tsoc_ruc_redner_lmbf".z())[1];
                    dG = dG.split('</fb:')[0];
                    dG = dollars_to_int(dG);
                    if (!isNaN(dG)) {
                        GM_setValue(ad(Y + "heal_cost"), dG);
                    }
                }
            }
            var dH = true;
            var dI = Utils.getElementsByXPath("\"=di@[naps//.".z() + w + 'cur_cash"]', dp)[0];
            if (dI) {
                var dJ = dI.innerHTML.match(/\$([0-9,]+)/)[1];
                dJ = dJ.replace(/,/g, '');
                if (isNaN(parseInt(dJ))) {} else {
                    dH = true;
                    boss.cash = dJ;
                    var dK = document.getElementById(w + 'cur_cash');
                    if (dK) dK.innerHTML = int_to_dollars(dJ);
                }
            } else {
                if (dn.match(/fbml_render_cur_cash/i)) {
                    var dI = dn.split(">\"hsac_ruc_redner_lmbf".z())[1];
                    dI = dI.split('</fb:')[0];
                    dI = dollars_to_int(dI);
                    if (!isNaN(dI)) {
                        dH = true;
                        boss.cash = dI;
                        var dK = document.getElementById(w + 'cur_cash');
                        if (dK) dK.innerHTML = int_to_dollars(dI);
                    }
                }
            }
            var dL = Utils.getElementsByXPath("\"=di@[naps//.".z() + w + "]\"htlaeh_ruc".z(), dp)[0];
            if (dL) boss.health = parseInt(dL.innerHTML);
            else {
                if (dn.match(/fbml_render_cur_health/i)) {
                    var dM = dn.split(">\"htlaeh_ruc_redner_lmbf".z())[1];
                    dM = dM.split('</fb:')[0];
                    boss.health = parseInt(dM);
                }
            }
            var dN = Utils.getElementsByXPath("\"=di@[naps//.".z() + w + "]\"ecnalab_ruc".z(), dp)[0];
            if (dN) {
                var dJ = dN.innerHTML.match(/\$([0-9,]+)/)[1];
                dJ = dJ.replace(/,/g, '');
                if (isNaN(parseInt(dJ))) {} else {
                    GM_setValue(ad(Y + "bank_cash"), dJ);
                    var temp = Math.ceil((ag.bankminimum - (dJ - boss.heal_cost)) / 0.9);
                    if ((dJ < ag.bankminimum) && (dJ > 2000)) {
                        if (boss.cash >= temp) {
                            var dO = new Object();
                            dO.message = "....tnuocca knab gnihsinelpeR".z();
                            dO.page = 'bank';
                            dO.func = 'bk_deposit';
                            dO.params = temp;
                            dO.time = 2;
                            GM_setValue(ad(Y + "neededAction"), dO.toSource());
                        }
                    }
                }
            } else {
                if (dn.match(/fbml_render_cur_balance/i)) {
                    var dP = dn.split(">\"ecnalab_ruc_redner_lmbf".z())[1];
                    dP = dP.split('</fb:')[0];
                    dP = dollars_to_int(dP);
                    if (!isNaN(dP)) {
                        GM_setValue(ad(Y + "bank_cash"), dP);
                        var temp = Math.ceil((ag.bankminimum - (dP - boss.heal_cost)) / 0.9);
                        if ((dP < ag.bankminimum) && (dP > 2000)) {
                            if (boss.cash >= temp) {
                                var dO = new Object();
                                dO.message = "....tnuocca knab gnihsinelpeR".z();
                                dO.page = 'bank';
                                dO.func = 'bk_deposit';
                                dO.params = temp;
                                dO.time = 2;
                                GM_setValue(ad(Y + "neededAction"), dO.toSource());
                            }
                        }
                    }
                }
            }
        } catch (dQ) {
            if (h) alert('crap');
        }
        if (((dd.search(/cap_answer/i) > -1) || (dd.search(/cap_value/i) > -1)) && !bU) {
            bU = true;
            if (!h) document.getElementsByTagName('body')[0].appendChild(dp);
            var dv;
            var dw;
            if (dd.search(/cap_answer/i) > -1) {
                dv = Utils.getElementsByXPath("]\"rewsna_pac\"=eman@[tupni//.".z(), dp);
                dv = dv[(dv.length - 1)];
                dw = 'alpha';
            } else {
                dv = Utils.getElementsByXPath("]\"eulav_pac\"=eman@[tupni//.".z(), dp);
                dv = dv[(dv.length - 1)];
                dw = 'num';
            }
            if (ah['net']) {
                clearTimeout(ah['net']);
                var message = document.getElementById(ae("sutatstpircs".z()));
                if (message) message.innerHTML = '';
            }
            for (var t in ah) {
                if (ah[t]) clearTimeout(ah[t]);
            }
            var dx;
            var dy = Utils.getElementsByXPath("])\"php.egami_ahctpac\" ,crs@(sniatnoc[gmi//.".z())[0];
            if (aJ.UseIt) {
                aJ.stime = new Date().getTime();
                dv.disabled = true;
                if (g) {
                    var dz = new Image();
                    dz.addEventListener("load", function () {
                        SendImage(SB_convertImgToBase64Format(dz), dv, dw, dy.src);
                    }, true);
                    dz.src = dy.src;
                } else {
                    bO(dy, dv, dw, dy.src);
                }
            } else {
                var dA = document.getElementById(ae("ahctpaCraWboM".z()));
                if (dA) {
                    if (ag.ShowCaptcha) {
                        dA.innerHTML = "\"=crs gmi<>retnec<".z() + dy.src + '" id="' + ad("gmIahctpaCraWboM".z()) + ">retnec/<>05=thgieh 001=htdiw \"".z();
                    }
                } else {
                    if (ag.ShowCaptcha) {
                        var dB = document.createElement('div');
                        document.getElementsByTagName('body')[0].appendChild(dB);
                        dB.className = ad("CRSahctpaCepinStsiLtiH".z());
                        var dC = "\x2e" + ae("CRSahctpaCepinStsiLtiH".z()) + ";xp01 :gniddap ;kcalb dilos xp1 :redrob ;etihw :roloc-dnuorgkcab ;otua :wolfrevo ;xp02 :pot ;xp02 :tfel ;99 :xedni-z ;etulosba :noitisop{ ".z();
                        GM_addStyle(dC);
                        dB.innerHTML = '<img src=' + dy.src + '></img>';
                    }
                }
                if (!ag.PromptAlert) {
                    notify();
                    alertSound(ag.sndid, ag.sndrepeat);
                    CaptchaInput.init(dv, "!!noitnetta namuH deeN -- gnippins elihw ahctpaC elbissoP".z(), dw, dy.src);
                } else {
                    dx = prompt("!!noitnetta namuH deeN -- gnippins elihw ahctpaC elbissoP".z());
                    if (dx) {
                        dv.value = dx.substr(0, ag.captchalength);
                        Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni".z(), dv.parentNode)[0].click();
                    }
                }
            }
            return;
        } else {
            if (dg) {
                if ((!ag.LVHealToMax && ((boss.health * 100) > (boss.max_health * ag.heal_limit))) || ((boss.health * 100) > (boss.max_health * 60))) ah['HealReplyFunction'] = setTimeout(function () {
                    dg();
                }, 150);
                else bE(dg);
            }
        }
    } else if (de == 2) {
        var dN = Utils.getElementsByXPath("\"=di@[naps//.".z() + w + "]\"ecnalab_ruc".z(), dp)[0];
        if (dN) {
            var dJ = dN.innerHTML.match(/\$([0-9,]+)/)[1];
            dJ = dJ.replace(/,/g, '');
            if (isNaN(parseInt(dJ))) {} else {
                GM_setValue(ad(Y + "bank_cash"), dJ);
            }
        } else {
            if (dn.match(/fbml_render_cur_balance/i)) {
                var dP = dn.split(">\"ecnalab_ruc_redner_lmbf".z())[1];
                dP = dP.split('</fb:')[0];
                dP = dollars_to_int(dP);
                if (!isNaN(dP)) {
                    GM_setValue(ad(Y + "bank_cash"), dP);
                }
            }
        }
        var dH = true;
        var dI = Utils.getElementsByXPath("\"=di@[naps//.".z() + w + 'cur_cash"]', dp)[0];
        if (dI) {
            var dJ = dI.innerHTML.match(/\$([0-9,]+)/)[1];
            dJ = dJ.replace(/,/g, '');
            if (isNaN(parseInt(dJ))) {} else {
                dH = true;
                boss.cash = dJ;
                var dK = document.getElementById(w + 'cur_cash');
                if (dK) dK.innerHTML = int_to_dollars(dJ);
            }
        } else {
            if (dn.match(/fbml_render_cur_cash/i)) {
                var dI = dn.split(">\"hsac_ruc_redner_lmbf".z())[1];
                dI = dI.split('</fb:')[0];
                dI = dollars_to_int(dI);
                if (!isNaN(dI)) {
                    dH = true;
                    boss.cash = dI;
                    var dK = document.getElementById(w + 'cur_cash');
                    if (dK) dK.innerHTML = int_to_dollars(dI);
                }
            }
        }
        if (((dd.search(/cap_answer/i) > -1) || (dd.search(/cap_value/i) > -1)) && !bU) {
            bU = true;
            if (!h) document.getElementsByTagName('body')[0].appendChild(dp);
            var dv;
            var dw;
            if (dd.search(/cap_answer/i) > -1) {
                dv = Utils.getElementsByXPath("]\"rewsna_pac\"=eman@[tupni//.".z(), dp);
                dv = dv[(dv.length - 1)];
                dw = 'alpha';
            } else {
                dv = Utils.getElementsByXPath("]\"eulav_pac\"=eman@[tupni//.".z(), dp);
                dv = dv[(dv.length - 1)];
                dw = 'num';
            }
            if (ah['net']) {
                clearTimeout(ah['net']);
                var message = document.getElementById(ae("sutatstpircs".z()));
                if (message) message.innerHTML = '';
            }
            for (var t in ah) {
                if (ah[t]) clearTimeout(ah[t]);
            }
            var dx;
            var dy = Utils.getElementsByXPath("])\"php.egami_ahctpac\" ,crs@(sniatnoc[gmi//.".z())[0];
            if (aJ.UseIt) {
                aJ.stime = new Date().getTime();
                dv.disabled = true;
                if (g) {
                    var dz = new Image();
                    dz.addEventListener("load", function () {
                        SendImage(SB_convertImgToBase64Format(dz), dv, dw, dy.src);
                    }, true);
                    dz.src = dy.src;
                } else {
                    bO(dy, dv, dw, dy.src);
                }
            } else {
                var dA = document.getElementById(ae("ahctpaCraWboM".z()));
                if (dA) {
                    if (ag.ShowCaptcha) {
                        dA.innerHTML = "\"=crs gmi<>retnec<".z() + dy.src + '" id="' + ad("gmIahctpaCraWboM".z()) + ">retnec/<>05=thgieh 001=htdiw \"".z();
                    }
                } else {
                    if (ag.ShowCaptcha) {
                        var dB = document.createElement('div');
                        document.getElementsByTagName('body')[0].appendChild(dB);
                        dB.className = ad("CRSahctpaCepinStsiLtiH".z());
                        var dC = "\x2e" + ae("CRSahctpaCepinStsiLtiH".z()) + ";xp01 :gniddap ;kcalb dilos xp1 :redrob ;etihw :roloc-dnuorgkcab ;otua :wolfrevo ;xp02 :pot ;xp02 :tfel ;99 :xedni-z ;etulosba :noitisop{ ".z();
                        GM_addStyle(dC);
                        dB.innerHTML = '<img src=' + dy.src + '></img>';
                    }
                }
                if (!ag.PromptAlert) {
                    notify();
                    alertSound(ag.sndid, ag.sndrepeat);
                    CaptchaInput.init(dv, "!!noitnetta namuH deeN -- gnippins elihw ahctpaC elbissoP".z(), dw, dy.src);
                } else {
                    dx = prompt("!!noitnetta namuH deeN -- gnippins elihw ahctpaC elbissoP".z());
                    if (dx) {
                        dv.value = dx.substr(0, ag.captchalength);
                        Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni".z(), dv.parentNode)[0].click();
                    }
                }
            }
            return;
        }
        W = false;
        if (!dn.match(/You don't have that much cash./i) || dH) {
            if (h) z("...ffutSniaM gninnureR ...tisoped dnuorgkcab lufsseccuS".z(), 0);
            S = false;
            setTimeout(MainStuff, 500);
        } else {
            if (h) z("...egap gnidaoleR ....rorre tisoped dnuorgkcaB".z(), 0);
            setTimeout(P, 500);
        }
    }
}
function CheckFightSnipe(dd, de, df, name, dg) {
    if (dd.innerHTML.match(/someone who is in your own mob/i)) {
        var dh;
        if (boss.fights.target_id) dh = boss.fights.target_id;
        else {
            if (boss.fights.paidByhref.split('\x7c').length == 1) {
                dh = boss.fights.paidByhref.split('\x7c')[0].split('\x3b')[0];
            }
        }
        if (dh) {
            var temp = GM_getValue(ad(Y + 'InYourMob'), '').split('\x7c');
            if (temp[0] == '') {
                temp.splice(0, 1);
            }
            temp.push(dh);
            aU = temp;
            GM_setValue(ad(Y + 'InYourMob'), temp.join('\x7c'));
        }
    }
    RecordResults(dd, de, name, df, dg);
}
Log = new Object();
Log.init = function () {
    this.handlers = new Array();
    this.div = document.createElement('div');
    this.div.id = ad('LogDiv');
    this.div.className = ad("gol-mg-koobecaf".z());
    var dd = '\x2e' + ae("gol-mg-koobecaf".z()) + ";enon :yalpsid ;thgir:ngila-txet { ".z() + " :thgieh ;xp516 :htdiw ;xp0 :gniddap ;kcalb dilos xp1 :redrob ;otua :thgir-nigram ;otua :tfel-nigram ".z() + (pageHeight() - 120) + "} ;dlob:thgiew-tnof ;xp0 :gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;lairA :ylimaf-tnof ;xp".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + "} ;FFFFFF# :roloc ;4B48D6# :dnuorgkcab ;retnec:ngila-txet ;tp21 :ezis-tnof { 1h ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + "} ;dilos dilos dilos dilos :elyts-redrob ;xp2 :gniddap ;xp1 :htdiw-redrob { elbat ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' .' + ad("td_l") + "} ;xp0 :gniddap ;xp1 :htdiw-redrob ;tp01 :ezis-tnof ;tfel:ngila-txet { ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' .' + ad("td_r") + "} ;xp0 :gniddap ;xp1 :htdiw-redrob ;tp01 :ezis-tnof ;thgir:ngila-txet { ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' .' + ad("td_h") + "} ;kcalb xp1 dilos :mottob-redrob ;tp01 :ezis-tnof { ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' .' + ad("td_c") + "} ;xp0 :gniddap ;xp1 :htdiw-redrob ;tp01 :ezis-tnof ;retnec:ngila-txet { ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' thead.' + ad("fixedHeader") + "} ;kcolb :yalpsid { rt ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' tbody.' + ad("tnetnoCllorcs".z()) + " :thgieh ;%001 :htdiw ;otua :wolfrevo ;kcolb :yalpsid { ".z() + (pageHeight() - 200) + 'px; }';
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' thead.' + ad("fixedHeader") + "} ;xp511 :htdiw { ht ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' thead.' + ad("fixedHeader") + "} ;xp005 :htdiw { ht + ht ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' thead.' + ad("fixedHeader") + "} ;xp511 :htdiw { dt ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' thead.' + ad("fixedHeader") + "} ;xp005 :htdiw { dt + dt ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' tbody.' + ad("tnetnoCllorcs".z()) + "} ;xp511 :htdiw { dt ".z();
    dd += '\x2e' + ae("gol-mg-koobecaf".z()) + ' tbody.' + ad("tnetnoCllorcs".z()) + "} ;xp484 :htdiw { dt + dt ".z();
    GM_addStyle(dd);
};
Log.build = function () {
    var dd = GM_getValue(ad(Y + "goLrepleHotuAWM".z()), '').split('\x7c');
    var de = '';
    de += "\"=di 0=gnicapsllec \"xp516\"=htdiw elbat<".z() + ad("log_table") + '">';
    de += "\"=ssalc daeht<".z() + ae("fixedHeader") + "\"=ssalc ht<>rt<>\"".z() + ae("td_h") + "\"=ssalc ht<>ht/<etaD>\"retnec\"=ngila \"".z() + ae("td_h") + "\"=ssalc ydobt<>daeht/<>rt/<>ht/<yrtnE goL>\"retnec\"=ngila \"".z() + ae("tnetnoCllorcs".z()) + '">';
    var df;
    for (var dg = (dd.length - 1); dg >= 0; dg--) {
        if (dd[dg] != '') {
            var dh = new Date(parseFloat(dd[dg].split('\x3a')[0]));
            var di = dh.getFullYear() + '';
            var dj = dh.toTimeString() + '';
            df = (dh.getMonth() + 1) + '\x2f' + dh.getDate() + '\x2f' + di.substr(2, 2) + '\x20' + dj.substr(0, 8);
            de += "\"=ssalc dt<>rt<".z() + ae("td_c") + '">' + df + '</td><td>' + dd[dg].split('\x3a')[1].replace(/{{/g, "\x3a") + '</td></tr>';
        }
    }
    de += '</tbody>';
    de += '</table>';
    de += '<br />';
    this.div.innerHTML += de;
    this.form = document.createElement('form');
    this.form.action = '';
    this.form.method = '';
    this.form.id = ae("gol-mg-koobecaf".z());
    this.div.appendChild(this.form);
    this.button_clear = document.createElement('button');
    this.button_clear.type = 'button';
    this.button_clear.id = ad('log_clear');
    this.button_clear.innerHTML = "CLEAR";
    if (dd.length > 1) this.form.appendChild(this.button_clear);
    this.button_close = document.createElement('button');
    this.button_close.type = 'button_close';
    this.button_close.id = ad('log_close');
    this.button_close.innerHTML = "CLOSE";
    this.form.appendChild(this.button_close);
    var dk = GM_getValue(ad(Y + 'LogList'), "5|35").split('\x7c');
    if (parseInt(dk[1]) < 35) dk[1] = 35;
    GM_setValue(ad(Y + "etats_tsiLgoL".z()), "max");
    this.divFloat = au.createFloatingDiv(615, dk[0], dk[1], 'left', "V ;2848#&repleH otuA sraWboM>\"lmth.egaPemoH/repleHotuAWM/moc.gnitsohdlroweruces.www//:ptth\"=ferh \"knalb_\"=tegrat \";eulbkrad:roloc\"=elyts a<>1h<".z() + f + ">1h/<goL >a/<".z(), 'LogList', true, true, true);
    this.divFloat.appendChild(this.div);
    this.button_clear.addEventListener('click', this.eventListener(), true);
    this.button_close.addEventListener('click', this.eventListener(), true);
    this.form.addEventListener('submit', this.eventListener(), true);
};
Log.pausingLog = function () {
    pausingLog = 1;
};
Log.eventListener = function () {
    var dd = this;
    return function (de) {
        if (this.id == ad('log_clear')) {
            GM_setValue(ad(Y + "goLrepleHotuAWM".z()), new Date().getTime() + "deraelc goL:".z());
            P();
        }
        de.preventDefault();
        dd.div.style.display = 'none';
        dd.div.parentNode.parentNode.removeChild(dd.div.parentNode);
        pausingLog = 0;
    };
};
Log.show = function () {
    return function () {
        Log.pausingLog();
        var dd = document.getElementById(ae('LogDiv'));
        if (!dd) {
            Log.init();
            Log.build();
            dd = document.getElementById(ae('LogDiv'));
        }
        if (dd) {
            var de = GM_getValue(ad(Y + "etats_tsiLgoL".z()), "max");
            if (de == "min") dd.style.display = 'none';
            else dd.style.display = 'block';
        }
    };
};
aP.lg_pI = lg_pI;
aP.lg_pH = lg_pH;

function lg_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("lg_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP gniggoL>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_gniggol".z()) + ">\";enon :yalpsid\"=elyts \"".z());
    de.push(">\"%001\"=htdiw elbat<".z());
    de.push('<tr id="' + ad("LogStuff") + '"><td>');
    de.push("\"=rof lebal<".z() + ad("logstuff") + ">lebal/< :ytivitca tpircs fo gol a peeK>\"".z());
    de.push('</td><td>');
    var value = ag.logstuff;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("logstuff") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("logstuff") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("logstuff") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("logstuff") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push('<tr id="' + ad("LogLevel") + "\"=rof lebal<>\"%08\"=htdiw dt<>\"".z() + ad("loglevel") + "\"=eman tceles<>dt<>dt/<>lebal/< :deggol eb dluohs snoitca tahW>\"".z() + ae("loglevel") + '">');
    de.push("1=eulav noitpo<".z());
    if (ag.loglevel == 1) de.push("\"detceles\"=detceles ".z());
    de.push("2=eulav noitpo<>noitpo/<gnihtyrevE>".z());
    if (ag.loglevel == 2) de.push("\"detceles\"=detceles ".z());
    de.push("3=eulav noitpo<>noitpo/<srorrE/stnevE niaM>".z());
    if (ag.loglevel == 3) de.push("\"detceles\"=detceles ".z());
    de.push(">noitpo/<ylno srorrE>".z());
    de.push(">rt/<>dt/<>tceles/<".z());
    de.push('<tr id="' + ad("LogLength") + '"><td>');
    value = ag.loglength;
    de.push("\"=rof lebal<".z() + ad("loglength") + ">lebal/<:tpek eb dluohs seirtne gol ynam woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("loglength") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    de.push('value="' + value + '"/>');
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('lg_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_gniggol".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
function lg_pH(dd) {
    var de = false;
    if (isNaN(ag.loglevel)) ag.loglevel = 2;
    if (isNaN(ag.loglength)) ag.loglength = 100;
    var input = dd.elements.namedItem(ae('logstuff'));
    if (ag.logstuff != input.checked) {
        ag.logstuff = input.checked;
        de = true;
    }
    input = parseInt(dd.elements.namedItem(ae('loglength')).value);
    if (isNaN(input) || (input < 1)) {
        alert(".degnahc ton secnereferP  .)secnereferP gniggoL( htgnel gol rof tupni dilavnI".z());
        av = true;
    } else {
        if (ag.loglength != input) {
            ag.loglength = input;
            de = true;
        }
    }
    input = dd.elements.namedItem(ae('loglevel'));
    input = input.options[input.selectedIndex].value;
    if (ag.loglevel != input) {
        ag.loglevel = input;
        de = true;
    }
    return de;
}
function cs_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("cs_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<sraW boM rof 2848#&revloS ahctpaC>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_revloSahctpaC".z()) + ">\";enon :yalpsid\"=elyts \"".z());
    if (!g) {
        de.push(">rb<>rb<>retnec/<>tnof/<.yltnerrucnoc nur ton nac htob sa ,noisrev yeknoMesaerG eht llatsninu ro elbasid ot erus eb ,noisrev nOddA eht ot edargpu od uoy fI>rb<.tpircs siht fo noisrev nOddA eht ot gnidargpu redisnoc esaelp ,stluser yrotcafsitas neht ssel evah uoy dna ,ecivres siht rof pu ngis uoy fI  .noisrev yeknoMesaerG eht gnisu nehw smetsys lla htiw ylbailer sa krow ton seod 2848#&revloS ahctpaC ehT  .tpircs siht fo noisrev yeknoMesaerG eht gnisu era uoY>neergkrad=roloc tnof<>retnec<>rb<".z());
    }
    de.push(">elbat/<>rt/<>dt/<>rb<>rb<>a/<moc.gnitsoHdlroWeruceS@snoitanoD>\"moc.gnitsoHdlroWeruceS@snoitanoD:otliam\"=ferh a< tcatnoc nac uoy ,snoitseuq yna evah uoy fI  >rb<>rb<.xaler dna kcab tis tsuj neht dna ,no ti nrut ,ereh meht retnE  .drowssap dna emanresu ruoy htiw liame na eviecer lliw uoy stnemom wef a ni ,ebircsbus uoy retfA>dt<>rt<>rt/<>dt/<>retnec/<>elbat/<>rt/<>dt/<>elbat/<>rt/<>dt/<>tnof/<;24#&>\"xp8:ezis-tnof\"=elyts tnof<sahctpaC devloS 0001 - 59.4$>dt<>rt<>rt/<>dt/<sahctpaC devlos >tnof/<;24#&>\"xp8:ezis-tnof\"=elyts tnof<detimilnU htnom 1 - 59.11$>dt<>rt<>elbat<>dt<>rt<>01=redrob elbat<>retnec<>dt<>rt<>rt/<>dt/<>retnec/<:)sralloD setatS detinU ni lla( seilppa gniwollof eht ,noitacilbup s'noisrev siht fo emit eht tA>rb<>rb<.llew sa noitpo CPP a si erehT>rb<>rb<.>tnof/<seirrow on rof etar ylhtnom talf eno tsuJ>\"eulb\"=roloc tnof<>lo/<.uoy rof devlos meht evah nac uoy os sahctpac 'evlos' ot deen oN ->rb<'stniop' hguone evah uoy fi gniyrrow oN ->lo<>rb<.devlos sahctpac >tnof/<;24#&>\"xp8:ezis-tnof\"=elyts tnof<DETIMILNU evah nac uoy ,etar ylhtnom talf a roF  .tpircs siht rof elbaliava won si 2848#&revloS ahctpaC>retnec<>dt<>rt<>\"%001\"=htdiw elbat<".z());
    de.push(">\"%001\"=htdiw elbat<".z());
    var df = '';
    var dg = '';
    var dh = true;
    if (aJ.user != undefined) {
        df = aJ.user;
    }
    if (aJ.pass != undefined) {
        dg = aJ.pass;
    }
    de.push(">rt/<>dt/<>retnec/<>gnorts/<HHHAWM dna HAWM htob rof desu eb nac tnuocca emas ehT>gnorts<>retnec<>3=napsloc dt<>rt<".z());
    de.push("\"=rof lebal<>retnec<>dt<>rt<".z() + ad("emaNresUahctpaC".z()) + ">rb<>lebal/<:emaN resU 2848#&revloS ahctpaC>\"".z());
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("emaNresUahctpaC".z()) + " \"23\"=ezis \"23\"=htgnelxam \"".z());
    de.push('value="' + df + ">dt/<>retnec/<>\"".z());
    de.push(">2=napsloc 2=napswor dt<".z());
    if (aJ.valid > 10000) {
        if (new Date().getTime() < aJ.valid) {
            var di = new Date(parseFloat(aJ.valid));
            var dj = di.getFullYear() + '';
            var dk = di.toTimeString() + '';
            var dl = ("detimiLnU :tfeL sesU>rb<>rb<!!troppus ruoy rof >tnof/<UOY KNAHT>\"neerg\"=roloc tnof<>rb<>rb<".z() + aJ.LFT + '<br>');
            if (aJ.Sys == 1) {
                de.push(">rb<>rb<>tnof/<)\"moc.gnitsoHdlroWeruceS@snoitanoD\" gnitcatnoc yb erom tseuqer yam uoy ,sesu fo tuo tsomla era uoy taht eciton uoy fI  .noitpircsbus DETIMILNU a si sihT(>1=ezis tnof<".z());
            }
            de.push('</center>');
        } else {
            de.push(">retnec/<>rb<>rb<>a/<>gmi/<>\"fig.GL_CCwonyub_ntb/ntb/i/SU_ne/moc.lapyap.www//:sptth\"=crs gmi<>\"9872256=di_nottub_detsoh&kcilcx-s_=dmc?rcsbew/nib-igc/moc.lapyap.www//:sptth\"=ferh a<>rb<;24#&59.4$ rof sevloS 0001>rb<>rb<>a/<>gmi/<>\"fig.GL_CCebircsbus_ntb/ntb/i/SU_ne/moc.lapyap.www//:sptth\"=crs gmi<>\"9083555=di_nottub_detsoh&kcilcx-s_=dmc?rcsbew/nib-igc/moc.lapyap.www//:sptth\"=ferh a<>rb<noitpircsbuS detimilnU>retnec<".z());
        }
    } else {
        de.push(">retnec/<>rb<>rb<>a/<>gmi/<>\"fig.GL_CCwonyub_ntb/ntb/i/SU_ne/moc.lapyap.www//:sptth\"=crs gmi<>\"9872256=di_nottub_detsoh&kcilcx-s_=dmc?rcsbew/nib-igc/moc.lapyap.www//:sptth\"=ferh a<>rb<;24#&59.4$ rof sevloS 0001>rb<>rb<>a/<>gmi/<>\"fig.GL_CCebircsbus_ntb/ntb/i/SU_ne/moc.lapyap.www//:sptth\"=crs gmi<>\"9083555=di_nottub_detsoh&kcilcx-s_=dmc?rcsbew/nib-igc/moc.lapyap.www//:sptth\"=ferh a<>rb<noitpircsbuS detimilnU>retnec<".z());
        if (aJ.valid == 2000) {
            de.push('Uses Left: ' + aJ.LFT + '<br>');
        }
    }
    de.push('</td>');
    de.push(">retnec<>dt<>rt<>rt/<".z());
    de.push("\"=rof lebal<".z() + ad("drowssaPrevloSahctpaC".z()) + ">rb<>lebal/<:drowssaP resU 2848#&revloS ahctpaC>\"".z());
    de.push("\"=eman \"drowssap\"=epyt tupni<".z() + ae("drowssaPrevloSahctpaC".z()) + " \"52\"=ezis \"52\"=htgnelxam \"".z());
    de.push('value="' + dg + ">rt/<>dt/<>rb<>retnec/<>\"".z());
    de.push('<tr id="' + ad("revloSahctpaCesU".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("ahctpaCevloS".z()) + ">lebal/< :2848#&revloS ahctpaC esU>\"".z());
    de.push('</td><td>');
    if (aJ.UseIt != undefined) {
        dh = aJ.UseIt;
    }
    if (dh) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ahctpaCevloS".z()) + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ahctpaCevloS".z()) + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ahctpaCevloS".z()) + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ahctpaCevloS".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    var value = aJ.Retry;
    de.push('<tr id="' + ad("yrteRrevloSahctpaC".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("yrteRahctpaCevloS".z()) + ">lebal/< :niaga yrt dna daoler ,rucco dluohs rorre metsys 2848#&revloS ahctpaC a fI>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("yrteRahctpaCevloS".z()) + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("yrteRahctpaCevloS".z()) + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("yrteRahctpaCevloS".z()) + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("yrteRahctpaCevloS".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push('<tr id="' + ad("yrterxamrevloSahctpaC".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("yrteRxaMrevloSahctpaC".z()) + ">dt<>dt/<>lebal/<:pu gnivig erofeb rewsna na tpmetta ot semit xaM>\"".z());
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("yrteRxaMrevloSahctpaC".z()) + " \"2\"=ezis \"2\"=htgnelxam \"".z());
    de.push('value="' + aJ.MaxRetry + '">');
    de.push('</td></tr>');
    de.push('<hr>');
    de.push(">retnec/<sesac cificeps rof dedeen era stnemtsujda erehw sesac erar eht rof ylno elbaliava era yehT -- gnignahc deen reven dluohs snoitpo gniwollof ehT>retnec<".z());
    de.push('<hr>');
    de.push('<tr id="' + ad("emitnimrevloSahctpaC".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("emiTniMrevloSahctpaC".z()) + ">dt<>dt/<>lebal/<:rewsna ahctpac a rof dewolla emit muminiM>\"".z());
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("emiTniMrevloSahctpaC".z()) + " \"1\"=ezis \"1\"=htgnelxam \"".z());
    de.push('value="' + aJ.MinTime + ")4 tluafeD( >\"".z());
    de.push('</td></tr>');
    de.push('<tr id="' + ad("emitxamrevloSahctpaC".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("emiTxaMrevloSahctpaC".z()) + ">dt<>dt/<>lebal/<:rewsna ahctpac a rof dewolla emit xaM>\"".z());
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("emiTxaMrevloSahctpaC".z()) + " \"2\"=ezis \"2\"=htgnelxam \"".z());
    de.push('value="' + aJ.MaxTime + ")31 tluafeD( >\"".z());
    de.push('</td></tr>');
    de.push('<tr id="' + ad("ycaruccaesaercni".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("IncreaseAccuracy") + ">lebal/< :2848#&revloS ahctpaC rof gnitseuqer epyt esU>\"".z());
    de.push('</td><td>');
    if (aJ.IncreaseAccuracy == undefined) aJ.IncreaseAccuracy = false;
    var value = aJ.IncreaseAccuracy;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("IncreaseAccuracy") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("IncreaseAccuracy") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("IncreaseAccuracy") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("IncreaseAccuracy") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push(">rt/<>dt/<)on tluafeD( ".z());
    de.push(">rh<>vid/<>retnec<>tnof/<.detcerroc eb nac smelborp lla eetnaraug t'nac yletanutrofnu tub ,retnuocne yam uoy smelborp yna evlos ot uoy htiw krow syawla lliw ew ,ecivres siht ot detaler gnihtyreve htiw sA  .tros emos fo ytlanep a suht dna ,erehwemos SOT a gnitaloiv thguac gnitteg fo ksir llams a syawla si ereht ,gnihtyna htiw sA .syad 03 = htnom 1 .emit ni derewsna teg ton od taht esoht dna srewsna gnorw htob sedulcni siht -- emit nevig yna ta rehgih ro rewol eb yam tub ,%58 dnuora srevoh yltnerruc sahctpac laudividni gnivlos etar sseccus revloS ahctpaC  .elbaliavanu eb ot ecivres eht esuac yam taht ,nosaer yna rof ,segatuo yna rof elbisnopser toN>rb<.detseuqer eb tsum tub ,tiderc a rof uoy yfilauq yam etar sseccus lamron naht rewol A  .ton ro tcerroc sa sraW boM yb detpecca rehtehw ,egasu eno sa stnuoc tpmetta evlos yrevE  .eripxe ton od stniop ecivres revloS ahctpaC CPP;24#&>rb<.tseuqer yb ,noitercsid elos s'revloS ahctpaC ta ,tsoc on ta ,nevig eb lliw erom ,pac siht hcaer wohemos dluohs uoy fI  .secivres ralimis rehto no htrow 06$ ot tnelaviuqe -- htm/0005 fo pac 'tfos' a sah ecivres detimilnU;24#&>\"xp8:ezis-tnof\"=elyts tnof<>retnec<>rb<>elbat/<".z());
    var dn = document.createElement('div');
    if (dn) dn.innerHTML = de.join('\n');
    var dp = document.getElementById(ae('PrefStuff'));
    if (dp) dp.appendChild(dn);
    var button = document.getElementById(ae('cs_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_revloSahctpaC".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.cs_pI = cs_pI;
aP.cs_pH = cs_pH;

function cs_pH(dd) {
    var de = false;
    if (dd.elements.namedItem(ae("emaNresUahctpaC".z())).value != undefined) {
        if (dd.elements.namedItem(ae("emaNresUahctpaC".z())).value != aJ.user) {
            aJ.user = dd.elements.namedItem(ae("emaNresUahctpaC".z())).value;
            GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
            de = true;
        }
    }
    if (dd.elements.namedItem(ae("drowssaPrevloSahctpaC".z())).value != undefined) {
        if (dd.elements.namedItem(ae("drowssaPrevloSahctpaC".z())).value != aJ.pass) {
            aJ.pass = dd.elements.namedItem(ae("drowssaPrevloSahctpaC".z())).value;
            GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
            de = true;
        }
    }
    if ((dd.elements.namedItem(ae("yrteRxaMrevloSahctpaC".z())).value != undefined) && !isNaN(dd.elements.namedItem(ae("yrteRxaMrevloSahctpaC".z())).value)) {
        if (dd.elements.namedItem(ae("yrteRxaMrevloSahctpaC".z())).value != aJ.MaxRetry) {
            aJ.MaxRetry = dd.elements.namedItem(ae("yrteRxaMrevloSahctpaC".z())).value;
            GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
            de = true;
        }
    } else {
        alert(".degnahc era secnereferp lla toN  .dilavni si yrtne yrteR xaM revloS ahctpaC".z());
        av = true;
    }
    if ((dd.elements.namedItem(ae("emiTxaMrevloSahctpaC".z())).value != undefined) && !isNaN(dd.elements.namedItem(ae("emiTxaMrevloSahctpaC".z())).value)) {
        if (dd.elements.namedItem(ae("emiTxaMrevloSahctpaC".z())).value != aJ.MaxTime) {
            aJ.MaxTime = dd.elements.namedItem(ae("emiTxaMrevloSahctpaC".z())).value;
            GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
            de = true;
        }
    } else {
        alert(".degnahc era secnereferp lla toN  .dilavni si yrtne emiT xaM revloS ahctpaC".z());
        av = true;
    }
    if ((dd.elements.namedItem(ae("emiTniMrevloSahctpaC".z())).value != undefined) && !isNaN(dd.elements.namedItem(ae("emiTniMrevloSahctpaC".z())).value)) {
        if (dd.elements.namedItem(ae("emiTniMrevloSahctpaC".z())).value != aJ.MinTime) {
            aJ.MinTime = dd.elements.namedItem(ae("emiTniMrevloSahctpaC".z())).value;
            GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
            de = true;
        }
    } else {
        alert(".degnahc era secnereferp lla toN  .dilavni si yrtne emiT niM revloS ahctpaC".z());
        av = true;
    }
    if (dd.elements.namedItem(ae("ahctpaCevloS".z())).checked != aJ.UseIt) {
        aJ.UseIt = dd.elements.namedItem(ae("ahctpaCevloS".z())).checked;
        GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
        de = true;
    }
    if (dd.elements.namedItem(ae("yrteRahctpaCevloS".z())).checked != aJ.Retry) {
        aJ.Retry = dd.elements.namedItem(ae("yrteRahctpaCevloS".z())).checked;
        GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
        de = true;
    }
    if (dd.elements.namedItem(ae('IncreaseAccuracy')).checked != aJ.IncreaseAccuracy) {
        aJ.IncreaseAccuracy = dd.elements.namedItem(ae('IncreaseAccuracy')).checked;
        GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
        de = true;
    }
    return de;
}
function dt_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("dt_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<snoitanoD>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_snoitanod".z()) + ">\";enon :yalpsid\"=elyts \"".z());
    de.push(">elbat/<>rt/<>dt/<>rb<>rb<>a/<moc.gnitsoHdlroWeruceS@snoitanoD>\"moc.gnitsoHdlroWeruceS@snoitanoD:otliam\"=ferh a< tcatnoc nac uoy ,snoitseuq yna evah uoy fI  .delbane stifeneb eht dna ,raeppasid dluohs sda eht ,taht retfa stnemom wef A  .woleb retne dluohs uoy taht drowssap dna eman resu a htiw liame na eviecer )setunim nihtiw yllamron ,sruoh 42 xorppa nihtiw( lliw uoy ,edam si noitanod a retfA>dt<>rt<>rt/<>dt/<>retnec/<>elbat/<>rt/<>dt/<>elbat/<>rt/<>dt/<stifeneb rotanod emitefiL - 53$>dt<>rt<>rt/<>dt/<stifeneb rotanod syaD 03 - 59.6$>dt<>rt<>elbat<>dt<>rt<>01=redrob elbat<>retnec<>dt<>rt<>rt/<>dt/<>retnec/<:)sralloD setatS detinU ni lla( seilppa gniwollof eht ,noitacilbup s'noisrev siht fo emit eht tA>rb<>retnec/<!erom dnA>rb<.6 ot 3 morf desaercni si sepins xam ehT>rb<.gnilaeh retsaf esu naC>rb<.dnamed no laeh naC>rb<.dnuorgkcab eht ni laeh naC>rb<.1 ot sdnoces 4 morf decuder si yaled remit muminim ehT>rb<.sda yalpsid regnol oN>retnec<>rb<>rb<:lliw tpircs eht noitaicerppa ni ,tpircs siht fo tnempoleved eht troppus pleh ot etanod uoy fI>retnec<>dt<>rt<>\"%001\"=htdiw elbat<".z());
    de.push(">\"%001\"=htdiw elbat<".z());
    var df = bv.user;
    var dg = bv.pass;
    de.push("\"=rof lebal<>retnec<>dt<>rt<".z() + ad("emaNresUetanoD".z()) + ">rb<>lebal/<:emaN resU rotanoD>\"".z());
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("emaNresUetanoD".z()) + " \"23\"=ezis \"23\"=htgnelxam \"".z());
    de.push('value="' + df + ">dt/<>retnec/<>\"".z());
    de.push(">dt/<>elbat/<>rt/<>dt/<>retnec/<>tnof/<eliforP sraWboM/koobecaF reP>\"xp8 :ezis-tnof\"=elyts tnof<>retnec<>2=napsloc dt<>rt<>rt/<>dt/<>retnec/<>a/<syaD 03/59.6$>rb<>gmi/<>\"fig.GL_CCetanod_ntb/ntb/i/SU_ne/moc.lapyap.www//:sptth\"=crs gmi<>\"AEGMBUV5K4S99=di_nottub_detsoh&kcilcx-s_=dmc?rcsbew/nib-igc/moc.lapyap.www//:sptth\"=ferh a<>retnec<>dt<>dt/<>retnec/<>a/<emitefiL 53$>rb<>gmi/<>\"fig.GL_CCetanod_ntb/ntb/i/SU_ne/moc.lapyap.www//:sptth\"=crs gmi<>\"L3LFA99VNLMS2=di_nottub_detsoh&kcilcx-s_=dmc?rcsbew/nib-igc/moc.lapyap.www//:sptth\"=ferh a<>retnec<>dt<>rt<>elbat<>2=napswor dt<".z());
    de.push(">retnec<>dt<>rt<>rt/<".z());
    de.push("\"=rof lebal<".z() + ad("drowssaPetanoD".z()) + ">rb<>lebal/<:drowssaP resU rotanoD>\"".z());
    de.push("\"=eman \"drowssap\"=epyt tupni<".z() + ae("drowssaPetanoD".z()) + " \"52\"=ezis \"52\"=htgnelxam \"".z());
    de.push('value="' + dg + ">rt/<>dt/<>retnec/<>\"".z());
    de.push('<tr id="' + ad("noitanod_kcehc".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("noitanodkcehc".z()) + ">lebal/< :sutats noitanoD kcehCeR>\"".z());
    de.push('</td><td>');
    var value = false;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("noitanodkcehc".z()) + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("noitanodkcehc".z()) + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("noitanodkcehc".z()) + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("noitanodkcehc".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var dh = document.createElement('div');
    if (dh) dh.innerHTML = de.join('\n');
    var di = document.getElementById(ae('PrefStuff'));
    if (di) di.appendChild(dh);
    var button = document.getElementById(ae('dt_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_snoitanod".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.dt_pI = dt_pI;
aP.dt_pH = dt_pH;

function dt_pH(dd) {
    var de = false;
    if (dd.elements.namedItem(ae("emaNresUetanoD".z())).value != undefined) {
        if (dd.elements.namedItem(ae("emaNresUetanoD".z())).value != bv.user) {
            bv.user = dd.elements.namedItem(ae("emaNresUetanoD".z())).value;
            GM_setValue(ad(Y + 'donation'), bv.toSource());
            GM_setValue(ad(Y + "lcheck"), "\x30");
            de = true;
        }
    }
    if (dd.elements.namedItem(ae("drowssaPetanoD".z())).value != undefined) {
        if (dd.elements.namedItem(ae("drowssaPetanoD".z())).value != bv.pass) {
            bv.pass = dd.elements.namedItem(ae("drowssaPetanoD".z())).value;
            GM_setValue(ad(Y + 'donation'), bv.toSource());
            GM_setValue(ad(Y + "lcheck"), "\x30");
            de = true;
        }
    }
    if (dd.elements.namedItem(ae("noitanodkcehc".z())).checked == true) {
        GM_setValue(ad(Y + "lcheck"), "\x30");
        de = true;
    }
    return de;
}
function bV(dd, de, name) {
    var df = document.getElementById(ae("ferp-mg-koobecaf".z()));
    if (confirm('Save ' + name + "?tluafed ruoy sa skcolb emit ".z())) {
        input = df.elements.namedItem(de).value;
        var dg = input.split('\x2c');
        if (dg.length == 1) {
            if (dg[0] == '') dg = [];
        }
        for (var x = 0; x < dg.length; x++) {
            if (dg[x].split('\x3a').length != 2) {
                dg.splice(x, 1);
                x--;
                continue;
            }
            if (parseInt(dg[x].split('\x3a')[0]) >= parseInt(dg[x].split('\x3a')[1])) {
                dg.splice(x, 1);
                x--;
                continue;
            }
            dg[x] = parseInt(dg[x].split('\x3a')[0]) + '\x3a' + parseInt(dg[x].split('\x3a')[1]);
        }
        GM_setValue(dd, dg.join('\x2c'));
        alert(".tluafed sa devaS".z());
    } else alert(".tluafed sa devas TON".z());
}
function bW(dd, de, name) {
    var df = document.getElementById(ae("ferp-mg-koobecaf".z()));
    if (confirm('Load your ' + name + "?secnereferp kcolb emit ".z())) {
        df.elements.namedItem(de).value = GM_getValue(dd, '');
        alert(".tluafed dedaoL".z());
    } else alert(".dedaol TON tluafeD".z());
}
function bX(dd, de, name, df) {
    var dg = document.getElementById(ae("ferp-mg-koobecaf".z()));
    if (confirm('Save ' + name + "?tluafed ruoy sa tsilkcolb ".z())) {
        var input = dg.elements.namedItem(de).value;
        input = RemoveDupes(input);
        dg.elements.namedItem(de).value = input.replace(/,/g, ', ');
        GM_setValue(dd, input.replace(/,/g, df));
        alert(".tluafed sa devaS".z());
    } else alert(".tluafed sa devas TON".z());
}
function bY(dd, de, name, df) {
    var dg = document.getElementById(ae("ferp-mg-koobecaf".z()));
    if (confirm('Load your ' + name + "?secnereferp tsilkcolb ".z())) {
        var temp = GM_getValue(dd, '').split(df);
        if (temp[0] == '') temp.splice(0, 1);
        dg.elements.namedItem(de).value = temp.join(', ');
        alert(".tluafed dedaoL".z());
    } else alert(".dedaol TON tluafeD".z());
}
function bl_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("bl_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP tsiLkcolB>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_tsilkcolb".z()) + ">\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z());
    de.push(">rt/<>dt/<>rh<>retnec/<tsilkcolb ylno gnitnuH ytnuoB/tsiltiH>retnec<>rh<>3=napsloc dt<>rt<".z());
    de.push('<tr id="' + ad("hitlistbck") + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("hitlistblock") + ">lebal/<>retnec/<>tnof/<)sedom efas dna epins htob ni skroW(>1=ezis tnof<>retnec<>rb< ?tsil gniwollof eht no sbom eht kcatta t'noD>\"".z());
    de.push('</td><td>');
    value = ag.hitlistblock;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("hitlistblock") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("hitlistblock") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("hitlistblock") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("hitlistblock") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = aV.join(', ');
    de.push('<tr id="' + ad("whoonHlist") + "\"=rof lebal<>dt<>\"".z() + ad("onHlist") + "\"=eman \"3\"=swor \"001\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:tsiL nO>\"".z() + ae("onHlist") + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<)ammoc a( \",\" yb detarepes eb tsum sDI boM>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    de.push("\"=di a<>retnec<>dt<>rt<>%001=htdiw elbat<>3=napsloc dt<>rt<".z() + ad("evaStluafeDtsiltiH".z()) + "\"=di a<>retnec<>dt<>dt/<>retnec/<>a/<tsilkcolb tluafed sa evaS>\"".z() + ad("daoLtluafeDtsiltiH".z()) + ">rt/<>dt/<>elbat/<>rt/<>dt/<>retnec/<>a/<tluafed morf tsilkcolb daoL>\"".z());
    de.push('<tr id="' + ad("ddaotuatsiltih".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("hitlistblockauto") + ">lebal/<?tsil evoba eht ot meht dda yllacitamotua ,enoemos htiw elttab a esol uoy fI>\"".z());
    de.push('</td><td>');
    value = ag.hitlistblockauto;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("hitlistblockauto") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("hitlistblockauto") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("hitlistblockauto") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("hitlistblockauto") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("hfightsneeded") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("hfneeded") + ">lebal/<?gnikcolb redisnoc ew erofeb dedeen era sthgif ynam woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("hfneeded") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.hfightsneeded;
    de.push('value="' + value + '">');
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("hfightratio") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("hfratio") + ">lebal/<:dedeen si oitar niw tahw ,sthgif fo # evoba eht retfA>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("hfratio") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.hratio;
    de.push('value="' + value + '">%');
    de.push('</td></tr>');
    de.push(">rt/<>dt/<>rh<>retnec/<tsilkcolb ylno enorD rethgiF>retnec<>rh<>rb<>rb<>rb<>3=napsloc dt<>rt<".z());
    de.push('<tr id="' + ad("fightblock") + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("fightlistblock") + ">lebal/<?tsil gniwollof eht no sbom eht kcatta t'noD>\"".z());
    de.push('</td><td>');
    value = ag.fightlistblock;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fightlistblock") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fightlistblock") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fightlistblock") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fightlistblock") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    value = ba.join(', ');
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("fightOnlist") + "\"=rof lebal<>dt<>\"".z() + ad("onFHlist") + "\"=eman \"3\"=swor \"001\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:tsiL nO>\"".z() + ae("onFHlist") + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<)ammoc a( \",\" yb detarepes eb tsum sDI boM>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    de.push("\"=di a<>retnec<>dt<>rt<>%001=htdiw elbat<>3=napsloc dt<>rt<".z() + ad("evaStluafeDenorDrethgiF".z()) + "\"=di a<>retnec<>dt<>dt/<>retnec/<>a/<tsilkcolb tluafed sa evaS>\"".z() + ad("daoLtluafeDenorDrethgiF".z()) + ">rt/<>dt/<>elbat/<>rt/<>dt/<>retnec/<>a/<tluafed morf tsilkcolb daoL>\"".z());
    de.push('<tr id="' + ad("ddaotuathgif".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("fightlistblockauto") + ">lebal/<?tsil evoba eht ot meht dda yllacitamotua ,enoemos htiw thgif a esol uoy fI>\"".z());
    de.push('</td><td>');
    value = ag.fightlistblockauto;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fightlistblockauto") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fightlistblockauto") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fightlistblockauto") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fightlistblockauto") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("fightsneeded") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("fneeded") + ">lebal/<?gnikcolb redisnoc ew erofeb dedeen era sthgif ynam woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("fneeded") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.fightsneeded;
    de.push('value="' + value + '">');
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("fightratio") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("fratio") + ">lebal/<:dedeen si oitar niw tahw ,sthgif fo # evoba eht retfA>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("fratio") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.fratio;
    de.push('value="' + value + '">%');
    de.push('</td></tr>');
    value = aU.join(', ');
    de.push(">rt/<>dt/<>retnec/<:boM ruoy ni esohT>retnec<>rb<>rb<>3=napsloc dt<>rt<".z());
    de.push('<tr id="' + ad("tsilboMruoYnI".z()) + "\"=rof lebal<>dt<>\"".z() + ad("tsilboMruoYnIno".z()) + "\"=eman \"3\"=swor \"001\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:tsiL nO>\"".z() + ae("tsilboMruoYnIno".z()) + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<)ammoc a( \",\" yb detarepes eb tsum sDI boM>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    de.push("\"=di a<>retnec<>dt<>rt<>%001=htdiw elbat<>3=napsloc dt<>rt<".z() + ad("evaStluafeDboMnI".z()) + "\"=di a<>retnec<>dt<>dt/<>retnec/<>a/<tsilkcolb tluafed sa evaS>\"".z() + ad("daoLtluafeDboMnI".z()) + ">rt/<>dt/<>elbat/<>rt/<>dt/<>retnec/<>a/<tluafed morf tsilkcolb daoL>\"".z());
    de.push(">rt/<>dt/<>rh<>retnec/<tsilkcolb enorD rethgiF DNA gnitnuH ytnuoB/tsiltiH>retnec<>rh<>rb<>rb<>3=napsloc dt<>rt<".z());
    value = Enforcer.join(', ');
    de.push(">rt/<>dt/<>retnec/<:selbahcuotnu rehto dna srecrofnE>retnec<>3=napsloc dt<>rt<".z());
    de.push('<tr id="' + ad("tsilrecrofnE".z()) + "\"=rof lebal<>dt<>\"".z() + ad("tsilrecrofnEno".z()) + "\"=eman \"3\"=swor \"001\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:tsiL nO>\"".z() + ae("tsilrecrofnEno".z()) + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<)ammoc a( \",\" yb detarepes eb tsum sDI boM>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    de.push("\"=di a<>retnec<>dt<>rt<>%001=htdiw elbat<>3=napsloc dt<>rt<".z() + ad("evaStluafeDrecrofnE".z()) + "\"=di a<>retnec<>dt<>dt/<>retnec/<>a/<tsilkcolb tluafed sa evaS>\"".z() + ad("daoLtluafeDrecrofnE".z()) + ">rt/<>dt/<>elbat/<>rt/<>dt/<>retnec/<>a/<tluafed morf tsilkcolb daoL>\"".z());
    de.push(">rt/<>dt/<>rh<>retnec/<tsil edirrevO>retnec<>rh<>rb<>rb<>3=napsloc dt<>rt<".z());
    value = bc.join(', ');
    de.push(">rt/<>dt/<>retnec/<:rotcaf rehto yna yb dekcolb fi neve ,ylno tsiltih eht no ,tegrat a si ohW>retnec<>3=napsloc dt<>rt<".z());
    de.push('<tr id="' + ad("tsiledirrevO".z()) + "\"=rof lebal<>dt<>\"".z() + ad("tsiledirrevOno".z()) + "\"=eman \"3\"=swor \"001\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:tsiL nO>\"".z() + ae("tsiledirrevOno".z()) + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<)ammoc a( \",\" yb detarepes eb tsum sDI boM>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    de.push("\"=di a<>retnec<>dt<>rt<>%001=htdiw elbat<>3=napsloc dt<>rt<".z() + ad("evaStluafeDdirrevO".z()) + "\"=di a<>retnec<>dt<>dt/<>retnec/<>a/<tsilkcolb tluafed sa evaS>\"".z() + ad("daoLtluafeDedirrevO".z()) + ">rt/<>dt/<>elbat/<>rt/<>dt/<>retnec/<>a/<tluafed morf tsilkcolb daoL>\"".z());
    de.push(">rh<>vid/<>elbat/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('bl_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_tsilkcolb".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
    button = document.getElementById(ae("evaStluafeDrecrofnE".z()));
    if (button) button.addEventListener('click', function () {
        bX('Enforcers', ae("tsilrecrofnEno".z()), 'Enforcer', '\x7c');
    }, true);
    button = document.getElementById(ae("daoLtluafeDrecrofnE".z()));
    if (button) button.addEventListener('click', function () {
        bY('Enforcers', ae("tsilrecrofnEno".z()), 'Enforcer', '\x7c');
    }, true);
    button = document.getElementById(ae("evaStluafeDedirrevO".z()));
    if (button) button.addEventListener('click', function () {
        bX("tsilkcolBediRrevO".z(), ae("tsiledirrevOno".z()), 'Override', '\x7c');
    }, true);
    button = document.getElementById(ae("daoLtluafeDedirrevO".z()));
    if (button) button.addEventListener('click', function () {
        bY("tsilkcolBediRrevO".z(), ae("tsiledirrevOno".z()), 'Override', '\x7c');
    }, true);
    button = document.getElementById(ae("evaStluafeDboMnI".z()));
    if (button) button.addEventListener('click', function () {
        bX('InYourMob', ae("tsilboMruoYnIno".z()), 'In Your Mob', '\x7c');
    }, true);
    button = document.getElementById(ae("daoLtluafeDboMnI".z()));
    if (button) button.addEventListener('click', function () {
        bY('InYourMob', ae("tsilboMruoYnIno".z()), 'In Your Mob', '\x7c');
    }, true);
    button = document.getElementById(ae("evaStluafeDenorDrethgiF".z()));
    if (button) button.addEventListener('click', function () {
        bX('fightlistblock', ae("onFHlist"), "enorD rethgiF".z(), '\x2c');
    }, true);
    button = document.getElementById(ae("daoLtluafeDenorDrethgiF".z()));
    if (button) button.addEventListener('click', function () {
        bY('fightlistblock', ae("onFHlist"), "enorD rethgiF".z(), '\x2c');
    }, true);
    button = document.getElementById(ae("evaStluafeDtsiltiH".z()));
    if (button) button.addEventListener('click', function () {
        bX('hitlistblock', ae("onHlist"), "gnitnuH ytnuoB".z(), '\x2c');
    }, true);
    button = document.getElementById(ae("daoLtluafeDtsiltiH".z()));
    if (button) button.addEventListener('click', function () {
        bY('hitlistblock', ae("onHlist"), "gnitnuH ytnuoB".z(), '\x2c');
    }, true);
}
aP.bl_pI = bl_pI;
aP.bl_pH = bl_pH;

function bl_pH(dd) {
    var de = false;
    var input = dd.elements.namedItem(ae('hitlistblock'));
    if (ag.hitlistblock != input.checked) {
        if (boss.actions.hitlist) delete boss.actions.hitlist;
        ag.hitlistblock = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('hitlistblockauto'));
    if (ag.hitlistblockauto != input.checked) {
        if (boss.actions.hitlist) delete boss.actions.hitlist;
        ag.hitlistblockauto = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('onHlist')).value;
    input = RemoveDupes(input);
    if (aV != input) {
        GM_setValue(ad(Y + 'hitlistblock'), input);
        de = true;
    }
    input = dd.elements.namedItem(ae('hfneeded')).value;
    if (ag.hfightsneeded != input) {
        ag.hfightsneeded = input;
        de = true;
    }
    input = dd.elements.namedItem(ae('hfratio')).value;
    if (ag.hratio != input) {
        ag.hratio = input;
        de = true;
    }
    input = dd.elements.namedItem(ae('fratio')).value;
    if (ag.fratio != input) {
        ag.fratio = input;
        de = true;
    }
    input = dd.elements.namedItem(ae('fneeded')).value;
    if (ag.fightsneeded != input) {
        ag.fightsneeded = input;
        de = true;
    }
    input = dd.elements.namedItem(ae('onFHlist')).value;
    input = RemoveDupes(input);
    if (ba != input) {
        GM_setValue(ad(Y + 'fightlistblock'), input);
        de = true;
    }
    input = dd.elements.namedItem(ae('fightlistblock'));
    if (ag.fightlistblock != input.checked) {
        ag.fightlistblock = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('fightlistblockauto'));
    if (ag.fightlistblockauto != input.checked) {
        ag.fightlistblockauto = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae("tsilboMruoYnIno".z())).value;
    input = RemoveDupes(input);
    if (aU != input) {
        GM_setValue(ad(Y + 'InYourMob'), input.replace(/,/g, '\x7c'));
        de = true;
    }
    input = dd.elements.namedItem(ae("tsiledirrevOno".z())).value;
    input = RemoveDupes(input);
    if (bc != input) {
        GM_setValue(ad(Y + "tsilkcolBediRrevO".z()), input.replace(/,/g, '\x7c'));
        de = true;
    }
    input = dd.elements.namedItem(ae("tsilrecrofnEno".z())).value;
    input = RemoveDupes(input);
    if (Enforcer != input) {
        GM_setValue(ad(Y + 'Enforcers'), input.replace(/,/g, '\x7c'));
        de = true;
    }
    return de;
}
function tb_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("tb_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP kcolBemiT>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_kcolbemit".z()) + ">\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z());
    de.push(">rt/<>dt/<.evoba nwohs sa ,'0' ta nigeb tsum riap txen yrev eht dna ,9532 ta dne riap emit eno evah tsum uoY  .rennam cificeps a ni enod eb >b/<>i/<TSUM>i<>b< dna ykcirt si >b/<THGINDIM>b< revo gnioG>rb<>rb<.mp44:7 urht mp23:6 morf dna ,ma 2 urht 1 morf ,ma33:21 urht mp03:11 morf tnuh ytnuob ot tnaw >b/<>i/<ton od>i<>b< uoy taht etacidni dluoW>rb<>retnec/<'>b/<4491:2381 ,002:001,33:0,9532:0332>b<'>retnec<>rb<>rb< :elpmaxE  .sdoirep emit owt otni tilps eb tsum thgindim revo gniog sdoirep emiT>rb<>retnec/<.woleb seitivitca ralucitrap eht od ot tnaw TON od uoy semit fo ,tamrof rh42 ni ,sriap emit lla tsiL>retnec<>3=napsloc dt<>rt<>rt/<>dt/<>rh<>3=napsloc dt<>rt<".z());
    de.push(">rt/<>dt/<>retnec/<:semit eseht ta >gnorts/<gnihtyna>gnorts< od t'noD>retnec<>3=napsloc dt<>rt<>rt/<>dt/<>rh<>3=napsloc dt<>rt<".z());
    value = aY.join(', ');
    de.push('<tr id="' + ad("semiTkcolBLLA".z()) + "\"=rof lebal<>dt<>\"".z() + ad("semitkcolblla".z()) + "\"=eman \"2\"=swor \"09\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:semiT>\"".z() + ae("semitkcolblla".z()) + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<)ammoc a( \",\" yb detarepes eb tsum sriap emiT>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    de.push("\"=di a<>retnec<>dt<>rt<>%001=htdiw elbat<>3=napsloc dt<>rt<".z() + ad("evaStluafeDkcolBemiTllA".z()) + "\"=di a<>retnec<>dt<>dt/<>retnec/<>a/<skcolb emit tluafed sa evaS>\"".z() + ad("daoLtluafeDkcolBemiTllA".z()) + ">rt/<>dt/<>elbat/<>rt/<>dt/<>retnec/<>a/<tluafed morf skcolb emit daoL>\"".z());
    de.push(">rt/<>dt/<>retnec/<:semit eseht ta tnuh ytnuob t'noD>retnec<>3=napsloc dt<>rt<>rt/<>dt/<>rh<>3=napsloc dt<>rt<".z());
    value = aW.join(', ');
    de.push('<tr id="' + ad("semiTkcolBtsiLtiH".z()) + "\"=rof lebal<>dt<>\"".z() + ad("semitkcolbtsiltih".z()) + "\"=eman \"2\"=swor \"09\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:semiT>\"".z() + ae("semitkcolbtsiltih".z()) + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<)ammoc a( \",\" yb detarepes eb tsum sriap emiT>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    de.push("\"=di a<>retnec<>dt<>rt<>%001=htdiw elbat<>3=napsloc dt<>rt<".z() + ad("evaStluafeDkcolBemiTtsiltiH".z()) + "\"=di a<>retnec<>dt<>dt/<>retnec/<>a/<skcolb emit tluafed sa evaS>\"".z() + ad("daoLtluafeDkcolBemiTtsiltiH".z()) + ">rt/<>dt/<>elbat/<>rt/<>dt/<>retnec/<>a/<tluafed morf skcolb emit daoL>\"".z());
    de.push(">rt/<>dt/<>retnec/<:semit eseht ta enord rethgif eht esu t'noD>retnec<>3=napsloc dt<>rt<>rt/<>dt/<>rh<>3=napsloc dt<>rt<".z());
    value = aX.join(', ');
    de.push('<tr id="' + ad("semiTkcolBDF".z()) + "\"=rof lebal<>dt<>\"".z() + ad("semitkcolbdf".z()) + "\"=eman \"2\"=swor \"09\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:semiT>\"".z() + ae("semitkcolbdf".z()) + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<)ammoc a( \",\" yb detarepes eb tsum sriap emiT>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    de.push("\"=di a<>retnec<>dt<>rt<>%001=htdiw elbat<>3=napsloc dt<>rt<".z() + ad("evaStluafeDkcolBemiTrethgiF".z()) + "\"=di a<>retnec<>dt<>dt/<>retnec/<>a/<skcolb emit tluafed sa evaS>\"".z() + ad("daoLtluafeDkcolBemiTrethgiF".z()) + ">rt/<>dt/<>elbat/<>rt/<>dt/<>retnec/<>a/<tluafed morf skcolb emit daoL>\"".z());
    de.push(">rt/<>dt/<>retnec/<:semit eseht ta egnever/rentrap level t'noD>retnec<>3=napsloc dt<>rt<>rt/<>dt/<>rh<>3=napsloc dt<>rt<".z());
    value = aZ.join(', ');
    de.push('<tr id="' + ad("semiTkcolBPL".z()) + "\"=rof lebal<>dt<>\"".z() + ad("semitkcolbpl".z()) + "\"=eman \"2\"=swor \"09\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:semiT>\"".z() + ae("semitkcolbpl".z()) + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<)ammoc a( \",\" yb detarepes eb tsum sriap emiT>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    de.push("\"=di a<>retnec<>dt<>rt<>%001=htdiw elbat<>3=napsloc dt<>rt<".z() + ad("evaStluafeDkcolBemiTPL".z()) + "\"=di a<>retnec<>dt<>dt/<>retnec/<>a/<skcolb emit tluafed sa evaS>\"".z() + ad("daoLtluafeDkcolBemiTPL".z()) + ">rt/<>dt/<>elbat/<>rt/<>dt/<>retnec/<>a/<tluafed morf skcolb emit daoL>\"".z());
    de.push(">rh<>vid/<>elbat/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('tb_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_kcolbemit".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
    button = document.getElementById(ae("evaStluafeDkcolBemiTllA".z()));
    if (button) button.addEventListener('click', function () {
        bV("kcolbemitlla".z(), ae("semitkcolblla".z()), 'Everything');
    }, true);
    button = document.getElementById(ae("daoLtluafeDkcolBemiTllA".z()));
    if (button) button.addEventListener('click', function () {
        bW("kcolbemitlla".z(), ae("semitkcolblla".z()), 'Everything');
    }, true);
    button = document.getElementById(ae("evaStluafeDkcolBemiTtsiltiH".z()));
    if (button) button.addEventListener('click', function () {
        bV("kcolbemittsiltih".z(), ae("semitkcolbtsiltih".z()), "retnuH ytnuoB".z());
    }, true);
    button = document.getElementById(ae("daoLtluafeDkcolBemiTtsiltiH".z()));
    if (button) button.addEventListener('click', function () {
        bW("kcolbemittsiltih".z(), ae("semitkcolbtsiltih".z()), "retnuH ytnuoB".z());
    }, true);
    button = document.getElementById(ae("evaStluafeDkcolBemiTrethgiF".z()));
    if (button) button.addEventListener('click', function () {
        bV('fdtimeblock', ae("semitkcolbdf".z()), "enorD rethgiF".z());
    }, true);
    button = document.getElementById(ae("daoLtluafeDkcolBemiTrethgiF".z()));
    if (button) button.addEventListener('click', function () {
        bW('fdtimeblock', ae("semitkcolbdf".z()), "enorD rethgiF".z());
    }, true);
    button = document.getElementById(ae("evaStluafeDkcolBemiTPL".z()));
    if (button) button.addEventListener('click', function () {
        bV('lptimeblock', ae("semitkcolbpl".z()), "egneveR/rentraP leveL".z());
    }, true);
    button = document.getElementById(ae("daoLtluafeDkcolBemiTPL".z()));
    if (button) button.addEventListener('click', function () {
        bW('lptimeblock', ae("semitkcolbpl".z()), "egneveR/rentraP leveL".z());
    }, true);
}
aP.tb_pI = tb_pI;
aP.tb_pH = tb_pH;

function tb_pH(dd) {
    var de = false;
    input = dd.elements.namedItem(ae("semitkcolbtsiltih".z())).value;
    var df = input.split('\x2c');
    if (df.length == 1) {
        if (df[0] == '') df = [];
    }
    input = dd.elements.namedItem(ae("semitkcolblla".z())).value;
    var dg = input.split('\x2c');
    if (dg.length == 1) {
        if (dg[0] == '') dg = [];
    }
    input = dd.elements.namedItem(ae("semitkcolbdf".z())).value;
    var dh = input.split('\x2c');
    if (dh.length == 1) {
        if (dh[0] == '') dh = [];
    }
    input = dd.elements.namedItem(ae("semitkcolbpl".z())).value;
    var di = input.split('\x2c');
    if (di.length == 1) {
        if (di[0] == '') di = [];
    }
    if (((di.length + dh.length + dg.length + df.length) > 1) && (!ao)) {
        alert(".degnahc ton era secnereferP  .)secnereferP kcolBemiT( secnereferp ni dekcolb doirep emit eno neht erom evah ton nac srotanod-noN".z());
        av = true;
        return false;
    }
    for (var x = 0; x < df.length; x++) {
        if (df[x].split('\x3a').length != 2) {
            df.splice(x, 1);
            x--;
            continue;
        }
        if (parseInt(df[x].split('\x3a')[0]) >= parseInt(df[x].split('\x3a')[1])) {
            df.splice(x, 1);
            x--;
            continue;
        }
        df[x] = parseInt(df[x].split('\x3a')[0]) + '\x3a' + parseInt(df[x].split('\x3a')[1]);
    }
    if (aW != df.join('\x2c')) {
        GM_setValue(ad(Y + "kcolbemittsiltih".z()), df.join('\x2c'));
        de = true;
    }
    for (var x = 0; x < dg.length; x++) {
        if (dg[x].split('\x3a').length != 2) {
            dg.splice(x, 1);
            x--;
            continue;
        }
        if (parseInt(dg[x].split('\x3a')[0]) >= parseInt(dg[x].split('\x3a')[1])) {
            dg.splice(x, 1);
            x--;
            continue;
        }
        dg[x] = parseInt(dg[x].split('\x3a')[0]) + '\x3a' + parseInt(dg[x].split('\x3a')[1]);
    }
    if (aY != dg.join('\x2c')) {
        GM_setValue(ad(Y + "kcolbemitlla".z()), dg.join('\x2c'));
        de = true;
    }
    for (var x = 0; x < dh.length; x++) {
        if (dh[x].split('\x3a').length != 2) {
            dh.splice(x, 1);
            x--;
            continue;
        }
        if (parseInt(dh[x].split('\x3a')[0]) >= parseInt(dh[x].split('\x3a')[1])) {
            dh.splice(x, 1);
            x--;
            continue;
        }
        dh[x] = parseInt(dh[x].split('\x3a')[0]) + '\x3a' + parseInt(dh[x].split('\x3a')[1]);
    }
    if (aX != dh.join('\x2c')) {
        GM_setValue(ad(Y + 'fdtimeblock'), dh.join('\x2c'));
        de = true;
    }
    for (var x = 0; x < di.length; x++) {
        if (di[x].split('\x3a').length != 2) {
            di.splice(x, 1);
            x--;
            continue;
        }
        if (parseInt(di[x].split('\x3a')[0]) >= parseInt(di[x].split('\x3a')[1])) {
            di.splice(x, 1);
            x--;
            continue;
        }
        di[x] = parseInt(di[x].split('\x3a')[0]) + '\x3a' + parseInt(di[x].split('\x3a')[1]);
    }
    if (aZ != di.join('\x2c')) {
        GM_setValue(ad(Y + 'lptimeblock'), di.join('\x2c'));
        de = true;
    }
    return de;
}
function rt_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("rt_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<)ssergorp ni krow - lanoitcnufnoN( secnereferP etailateR>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_etailater".z()) + ">\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z());
    value = 0;
    de.push('<tr id="' + ad("lavretnIkcehCtr".z()) + ">dt<>dt/<>dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("lavretnikcehctr".z()) + ">lebal/<?dekcehc eb egap emoh/swen eht dluohs netfo woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet=epyt tupni<".z() + ae("lavretnikcehctr".z()) + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    value = 0;
    de.push('<tr id="' + ad("leveLetailateRtr".z()) + ">dt<>dt/<>dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("leveletailatertr".z()) + ">lebal/<?noitailater tnarraw skcatta ynam woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet=epyt tupni<".z() + ae("leveletailatertr".z()) + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    value = 0;
    de.push('<tr id="' + ad("rtAmount") + ">dt<>dt/<>dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("rtamount") + ">lebal/<?kcatta/etailater ew dluohs semit ynam woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet=epyt tupni<".z() + ae("rtamount") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    value = '';
    de.push('<tr id="' + ad("rtexclude") + "\"=rof lebal<>dt<>\"".z() + ad("rtExclude") + "\"=eman \"3\"=swor \"59\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:edulcxE>\"".z() + ae("rtExclude") + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<)ammoc a( \",\" yb detarepes eb tsum sDI boM>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('rt_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_etailater".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.rt_pI = rt_pI;
aP.rt_pH = rt_pH;

function rt_pH(dd) {
    var de = false;
    return de;
}
function lv_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("lv_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP egneveR/rentraP gnileveL>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_gnilevel".z()) + ">\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z());
    de.push('<tr id="' + ad("levelactive") + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("evitca_level".z()) + ">lebal/< :serutaeF egneveR/rentraP gnileveL esU>\"".z());
    de.push('</td><td>');
    var value = ag.LevelPart;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("evitca_level".z()) + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("evitca_level".z()) + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("evitca_level".z()) + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("evitca_level".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push(">rt/<>dt/<ytiroirp fo redro ni ,elbissop nehw kcatta yllaunitnoc ot tnaw uoy ohw esoht ro ,sDI s'rentrap gnilevel ruoy fo tsiL>3=napsloc dt<>rt<".z());
    value = bb.join(', ');
    de.push('<tr id="' + ad("LevelList") + "\"=rof lebal<>dt<>\"".z() + ad("levellist") + "\"=eman \"3\"=swor \"001\"=sloc aeratxet<>2=napsloc dt<>dt/<>lebal/<:tsiL nO>\"".z() + ae("levellist") + ">lautriv=parw \"".z() + value + '</textarea>');
    de.push(">retnec/<>tnof/<>rb<>elbat/<>rt/<>dt/<)sdnuf no trohs fi citamelborp( >rb<ylno noitingI giR - >dt<>dt/<7:XXXXXXX>dt<>rt<>rt/<>dt/<.elbaliava emoceb lliw kcatta taht sepoh ni )elbissop fi( hcnup>rb<,)eb dluohs tub( elbaliava ton si kcatta fi tub ,ylno kcattA - >dt<>dt/<6:XXXXXXX>dt<>rt<>rt/<>dt/<)sdnuf no trohs fi citamelborp( >rb<ylno tsiltiH - >dt<>dt/<5:XXXXXXX>dt<>rt<>rt/<>dt/<)sdnuf no trohs fi citamelborp( >rb<resu eht tsiltih neht dna ,elbissop fi hcnuP - >dt<>dt/<4:XXXXXXX>dt<>rt<>rt/<>dt/<)sdnuf no trohs fi citamelborp( >rb<resu eht tsiltih neht dna ,elbissop fi hcnup neht ,tsrif kcattA - >dt<>dt/<3:XXXXXXX>dt<>rt<>rt/<>dt/<elba revenehw ,ylno hcnuP - >dt<>dt/<2:XXXXXXX>dt<>rt<>rt/<>dt/<kcatta nac regnol on uoy nehw )elbissop fi( hcnup ,tsrif kcattA - >dt<>dt/<1:XXXXXXX>dt<>rt<>rt/<>dt/<)0:XXXXXXX ro( ylno kcattA - >dt<>dt/<XXXXXXX>dt<>rt<>elbat<>retnec<>rb<>retnec/<:tamrof gniwollof eht ni snoitcurtsni rehtruf dda nac uoy ,hsiw uoy >b/<FI>b<>retnec<>rb<>retnec/<>b/<;tg&ecroF;tl&:;tg&emaN boM;tl&:;tg&epyT kcattA;tl&:;tg&DIboM;tl&>b<>retnec<>rb<>retnec/<)ammoc a( \",\" yb detarepes eb tsum sDI boM>1=ezis tnof<>retnec<>3=napsloc dt<>rt<>rt/<>dt/<".z());
    de.push('</td></tr>');
    value = ag.LevelingIntervalSecs;
    de.push('<tr id="' + ad("lvInterval") + ">dt<>dt/<>dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("LevelingInterval") + ">lebal/<)sdnoces( ?tsil eht esrevart ew dluohs lavretni tahw tA>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet=epyt tupni<".z() + ae("LevelingInterval") + " \"5\"=ezis \"5\"=htgnelxam \"".z());
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    value = ag.lvAttack;
    de.push('<tr id="' + ad("lv_Attack") + ">dt<>dt/<>dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("lvAttack") + ">lebal/<?ytinutroppo hcae no gnikcatta nehw semit ynam woh resu hcae kcattA>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet=epyt tupni<".z() + ae("lvAttack") + " \"1\"=ezis \"1\"=htgnelxam \"".z());
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    value = ag.LevelAttackInterval;
    de.push('<tr id="' + ad("lavretnikcattalevel".z()) + ">dt<>dt/<>\"xp52\"=htdiw dt<>rt<>elbat<>dt<>dt/<>dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("LevelAttackInterval") + ">lebal/<)dnoces 1 = 0001 ,sdnocesellim( ?hcum woh yb skcatta etarapeS>\"".z());
    de.push(">dt<>dt/<>elbat/<>rt/<>dt/<".z());
    de.push("\"=eman \"txet=epyt tupni<".z() + ae("LevelAttackInterval") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    value = ag.LVHealToMax;
    de.push('<tr id="' + ad("lvhealtomax") + ">dt<>dt/<>\"xp52\"=htdiw dt<>rt<>elbat<>dt<>dt/<>dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("LVHealToMax") + ">lebal/<>retnec/<>tnof/<woleb noitpo 'ecroF hgiH' eht gnisu fi tceffe sah ylnO>1=ezis tnof<>retnec<>rb<?kcatta yreve no xam ot delaeh erus ekaM>\"".z());
    de.push(">dt<>dt/<>elbat/<>rt/<>dt/<".z());
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("LVHealToMax") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("LVHealToMax") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("LVHealToMax") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("LVHealToMax") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = ag.LevelingHealAll;
    de.push('<tr id="' + ad("llalaehgnilevel".z()) + ">dt<>dt/<>\"xp52\"=htdiw dt<>rt<>elbat<>dt<>dt/<>dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("LevelingHealAll") + ">lebal/<?kcatta yreve no laeH>\"".z());
    de.push(">dt<>dt/<>elbat/<>rt/<>dt/<".z());
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("LevelingHealAll") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("LevelingHealAll") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("LevelingHealAll") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("LevelingHealAll") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = ag.LevelingStamina;
    de.push('<tr id="' + ad("lvStamina") + ">dt<>dt/<>dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("LevelingStamina") + ">lebal/<?desu eb dluohs stniop animats ynam woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet=epyt tupni<".z() + ae("LevelingStamina") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    de.push('<tr id="' + ad("tsiLkcolB_DFwolloF".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("FollowFDBlockList") + ">lebal/< :delbane fi tsilkcolb enorD rethgiF yebO>\"".z());
    de.push('</td><td>');
    value = ag.FollowFDBlockList;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("FollowFDBlockList") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("FollowFDBlockList") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("FollowFDBlockList") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("FollowFDBlockList") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push("\"=di rt<>rt/<>/dt<>rh<>3=napsloc dt<>rt<".z() + ad("newimproved") + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("NewImproved") + ">lebal/< ?senituor egnever/rentrap gnilevel rof noisrev hcihw esU>\"".z());
    de.push('</td><td>');
    value = ag.NewImproved;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< ecroF hgiH".z() + ae("NewImproved") + ">rb<>/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< ecroF woL".z() + ae("NewImproved") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< ecroF hgiH".z() + ae("NewImproved") + ">rb<>/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< ecroF woL".z() + ae("NewImproved") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('lv_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_gnilevel".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.lv_pI = lv_pI;
aP.lv_pH = lv_pH;

function lv_pH(dd) {
    var de = false;
    var input;
    input = dd.elements.namedItem(ae("evitca_level".z()));
    if (ag.LevelPart != input.checked) {
        var df = eval(GM_getValue(ad(Y + 'LevelingPartner'), '({})'));
        df.Position = 0;
        df.StaminaUsed = 0;
        df.running = false;
        GM_setValue(ad(Y + 'LevelingPartner'), df.toSource());
        if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
        if (boss.actions.Leveling) delete boss.actions.Leveling;
        ag.LevelPart = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('levellist')).value;
    var temp = input.split('\x2c');
    if ((temp.length > 2) && (!ao)) {
        alert(".degnahc ton secnereferP  .timil on evah srotanoD  .)secnereferP egneveR/rentraP gnileveL( tsil egneveR/rentraP leveL eht ni seirtne owt neht erom evah ton nac srotanod-noN".z());
        av = true;
    } else {
        input = RemoveDupesLV(input, false);
        if (aV != input) {
            GM_setValue(ad(Y + "srentraPleveL".z()), input);
            de = true;
        }
    }
    input = dd.elements.namedItem(ae('LevelingStamina')).value;
    if (ag.LevelingStamina != input) {
        ag.LevelingStamina = input;
        de = true;
    }
    input = dd.elements.namedItem(ae('LevelingInterval')).value;
    if (ag.LevelingIntervalSecs != input) {
        ag.LevelingIntervalSecs = input;
        if (ag.LevelingIntervalSecs == 0) GM_setValue(ad(Y + 'LILastRun'), '\x30');
        de = true;
    }
    input = parseInt(dd.elements.namedItem(ae('lvAttack')).value);
    if (((input < 1) || (input > 5) || isNaN(input)) || ((input != 1) && (!ao))) {
        alert(".degnahc ton secnereferP  .)secnereferP egneveR/rentraP gnileveL( egneveR/rentraP gnileveL rednu tupni dilavnI  .eno od ylno nac srotanod-noN  .5 ot lauqe ro naht ssel ro ,eno ot lauqe ro naht retaerg kcatta ylno yaM".z());
        av = true;
    } else {
        if (ag.lvAttack != input) {
            ag.lvAttack = input;
            de = true;
        }
    }
    input = parseInt(dd.elements.namedItem(ae('LevelAttackInterval')).value);
    if ((input < 0) || (input > 9999) || isNaN(input)) {
        alert(".degnahc ton secnereferP  .)secnereferP egneveR/rentraP gnileveL( 9999 neht ssel dna ,retaerg ro 0 eb tsuM  .'hcum woh yb skcatta etarapeS' rof tupni dilavnI".z());
        av = true;
    } else {
        if (ag.LevelAttackInterval != input) {
            ag.LevelAttackInterval = input;
            de = true;
        }
    }
    input = dd.elements.namedItem(ae('FollowFDBlockList'));
    if (ag.FollowFDBlockList != input.checked) {
        ag.FollowFDBlockList = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('LVHealToMax'));
    if (ag.LVHealToMax != input.checked) {
        ag.LVHealToMax = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('LevelingHealAll'));
    if (ag.LevelingHealAll != input.checked) {
        ag.LevelingHealAll = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('NewImproved'));
    if (ag.NewImproved != input.checked) {
        ag.NewImproved = input.checked;
        de = true;
    }
    return de;
}
function bZ(dd, de) {
    if (de >= dd.length) return false;
    if (ag.FollowFDBlockList) {
        if (ag.fightlistblock) {
            if (onfightlistblock(parseInt(dd[de]))) {
                var message = document.getElementById(ae('LPartner'));
                if (message) message.innerHTML = ">rb<>retnec<".z() + dd[de] + ">retnec/<>rb<tsilkcolb ruoy no si ".z();
                return true;
            }
        }
    }
    if (in_array_Int(parseInt(dd[de]), aU)) {
        var message = document.getElementById(ae('LPartner'));
        if (message) message.innerHTML += ">rb<>retnec<".z() + dd[de] + ">retnec/<>rb<bom ruoy ni si ".z();
        return true;
    }
    if (dd[de].split('\x3a')[3]) {
        if (boss.stamina < parseInt(dd[de].split('\x3a')[3])) {
            var message = document.getElementById(ae('LPartner'));
            if (message) message.innerHTML += " thgif ot animats hguone toN>rb<>retnec<".z() + dd[de] + ">retnec/<>rb<".z();
            return true;
        }
    }
    return false;
}
aQ.lv_Delay = lv_Delay;

function lv_Delay(dd, de) {
    de = de || ag.timerdelay;
    Q('', de, "...gnithgif rentraP leveL".z());
}
aQ.lv_e = lv_e;

function lv_e() {
    if (!ag.LevelPart) {
        if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
        if (boss.actions.Leveling) delete boss.actions.Leveling;
        return;
    }
    if (boss.actions.Dead || boss.actions.stamina) {
        var dd = eval(GM_getValue(ad(Y + 'LevelingPartner'), '({})'));
        dd.Position = 0;
        dd.StaminaUsed = 0;
        dd.running = false;
        GM_setValue(ad(Y + 'LevelingPartner'), dd.toSource());
        if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
        if (boss.actions.Leveling) delete boss.actions.Leveling;
        return;
    }
    var de = bd(aZ);
    if (de.blocked) {
        var df = document.getElementById(ae('targetlock'));
        if (df) df.innerHTML = ">rb<>retnec/<)secnereferp ni tes sa(>rb<yad fo emit eht fo esuaceb detavitcaed egneveR/rentraP leveL>retnec<>rb<".z();
        if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
        if (boss.actions.Leveling) delete boss.actions.Leveling;
        var dg = new Object();
        dg.message = "...gnithgif rentraP leveL".z();
        dg.page = '';
        if (Page.c_page == '') dg.func = 'lv_Delay';
        dg.params = [];
        dg.time = de.time;
        boss.actions.lv_timedelay = dg;
        return;
    }
    if (boss.stamina && ((boss.health >= ((ag.hmin / 100) * boss.max_health)) || ((ag.healmode > 0) && (boss.bank_cash > boss.heal_cost)))) {} else {
        var dh = "htlaeh rof gnitiaW".z();
        var di = "...noitareneger animats rof gnitiaW".z();
        if (!boss.stamina) {
            var dd = eval(GM_getValue(ad(Y + 'LevelingPartner'), '({})'));
            dd.Position = 0;
            dd.StaminaUsed = 0;
            dd.running = false;
            GM_setValue(ad(Y + 'LevelingPartner'), dd.toSource());
            var dj = 107;
            if (ag.insider) {
                dj = Math.ceil(dj * 0.9);
            }
            var dg = new Object();
            dg.message = "...noitareneger animats rof gnitiaW".z();
            dg.page = 'profile';
            dg.time = Math.floor(new Date().getTime() / 1000) + ag.staminaregen * dj;
            dg.save = true;
            boss.actions.stamina = dg;
            var temp = document.getElementById(ae('cancelstam'));
            if (temp) {
                temp.innerHTML = ">rb<>rb<>a/<tiaW animatS lecnaC>\"tiawmatslecnac\"=di a<".z();
                button = document.getElementById('cancelstamwait');
                if (button) {
                    button.addEventListener('click', function () {
                        if (boss.actions.stamina) {
                            delete boss.actions.stamina;
                            boss.save();
                            P();
                        }
                    }, true);
                }
            }
            if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
            if (boss.actions.Leveling) delete boss.actions.Leveling;
            return;
        } else {
            var dg = new Object();
            dg.message = dh + "...Need " + Math.ceil(boss.max_health * (ag.hmin / 100)) + "...";
            dg.page = 'hitlist';
            var dk = 120;
            if (boss.type == 'Bulletproof') {
                dk = 107;
            }
            if (ag.insider) {
                dk = Math.ceil(dk * 0.9);
            }
            dg.time = Math.floor(new Date().getTime() / 1000) + ((Math.ceil(boss.max_health * (ag.hmin / 100)) - boss.health) * dk);
            boss.actions.hitlist = dg;
            return;
        }
    }
    var dd = eval(GM_getValue(ad(Y + 'LevelingPartner'), '({})'));
    var dl = GM_getValue(ad(Y + "srentraPleveL".z()), '').split('\x2c');
    if ((dl.length == 0) || (ag.LevelingStamina == 0)) return;
    if (!dd.LastRun) dd.LastRun = 0;
    if (!dd.Position) dd.Position = 0;
    if (!dd.running) dd.running = false;
    if (!dd.StaminaUsed) dd.StaminaUsed = 0;
    var dn = false;
    var dp = document.getElementById(ae('NextLink' + parseInt(dl[dd.Position])));
    if (dp) dp.parentNode.removeChild(dp);
    while (dn == false) {
        if (dd.Position >= dl.length) break;
        if (bZ(dl, dd.Position)) {
            dd.Position += 1;
            continue;
        }
        dn = true;
    }
    if (dd.Position >= dl.length) {
        dd.Position = 0;
        dd.StaminaUsed = 0;
        dd.running = false;
        dd.LastRun = Page.now;
        GM_setValue(ad(Y + 'LevelingPartner'), dd.toSource());
        if (dl[dd.Position]) {
            var dg = new Object();
            dg.message = "...nur egneveR/rentraP gnileveL".z();
            dg.page = 'allprof';
            dg.Compare = 'profile';
            dg.url_params = 'user_id=' + parseInt(dl[dd.Position]);
            dg.func = 'lv_a';
            dg.time = parseInt(dd.LastRun) + parseInt(ag.LevelingIntervalSecs);
            boss.actions.Leveling = dg;
        } else {
            ag.LevelPart = false;
            if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
            if (boss.actions.Leveling) delete boss.actions.Leveling;
        }
        return;
    }
    if (Page.now >= (parseInt(dd.LastRun) + parseInt(ag.LevelingIntervalSecs))) dd.running = true;
    else {
        dd.Position = 0;
        dn = false;
        dp = document.getElementById(ae('NextLink' + parseInt(dl[dd.Position])));
        if (dp) dp.parentNode.removeChild(dp);
        while (dn == false) {
            if (dd.Position >= dl.length) break;
            if (bZ(dl, dd.Position)) {
                dd.Position += 1;
                continue;
            }
            dn = true;
        }
        dd.StaminaUsed = 0;
        dd.running = false;
        if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
        if (boss.actions.Leveling) delete boss.actions.Leveling;
        if (dl[dd.Position]) {
            var dg = new Object();
            dg.message = "...gnithgif rentraP leveL".z();
            dg.page = 'allprof';
            dg.Compare = 'profile';
            dg.url_params = 'user_id=' + parseInt(dl[dd.Position]);
            dg.func = 'lv_a';
            dg.time = parseInt(dd.LastRun) + parseInt(ag.LevelingIntervalSecs);
            boss.actions.Leveling = dg;
        } else {
            ag.LevelPart = false;
            if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
            if (boss.actions.Leveling) delete boss.actions.Leveling;
        }
    }
    if (dd.StaminaUsed >= ag.LevelingStamina) {
        dd.StaminaUsed = 0;
        dd.running = false;
        dd.Position = 0;
        dd.LastRun = Page.now;
        if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
        if (boss.actions.Leveling) delete boss.actions.Leveling;
        if (dl[dd.Position]) {
            var dg = new Object();
            dg.message = "...gnithgif rentraP leveL".z();
            dg.page = 'allprof';
            dg.Compare = 'profile';
            dg.url_params = 'user_id=' + parseInt(dl[dd.Position]);
            dg.func = 'lv_a';
            dg.time = parseInt(dd.LastRun) + parseInt(ag.LevelingIntervalSecs);
            boss.actions.Leveling = dg;
        } else {
            ag.LevelPart = false;
            if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
            if (boss.actions.Leveling) delete boss.actions.Leveling;
        }
    } else {
        if (dd.running == true) {
            if (dd.Position >= dl.length) {
                dd.Position = 0;
                dd.StaminaUsed = 0;
                dd.running = false;
                dd.LastRun = Page.now;
                if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
                if (boss.actions.Leveling) delete boss.actions.Leveling;
                if (dl[dd.Position]) {
                    var dg = new Object();
                    dg.message = "...gnithgif rentraP leveL".z();
                    dg.page = 'allprof';
                    dg.Compare = 'profile';
                    dg.url_params = 'user_id=' + parseInt(dl[dd.Position]);
                    dg.func = 'lv_a';
                    dg.time = parseInt(dd.LastRun) + parseInt(ag.LevelingIntervalSecs);
                    boss.actions.Leveling = dg;
                } else {
                    ag.LevelPart = false;
                    if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
                    if (boss.actions.Leveling) delete boss.actions.Leveling;
                }
            } else {
                if (boss.actions.Leveling) delete boss.actions.Leveling;
                if (dl[dd.Position]) {
                    var dg = new Object();
                    dg.message = "...gnithgif rentraP leveL".z();
                    dg.page = 'allprof';
                    dg.Compare = 'profile';
                    dg.url_params = 'user_id=' + parseInt(dl[dd.Position]);
                    dg.func = 'lv_a';
                    dg.time = parseInt(Page.now) + parseInt(ag.timerdelay);
                    boss.actions.Leveling = dg;
                    bi('hitlist', true);
                    bi('fighter', true);
                } else {
                    ag.LevelPart = false;
                    if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
                    if (boss.actions.Leveling) delete boss.actions.Leveling;
                }
            }
        }
    }
    GM_setValue(ad(Y + 'LevelingPartner'), dd.toSource());
}
aQ.lv_a = lv_a;

function lv_a(dd, de) {
    de = de || ag.timerdelay;
    de -= 2;
    if (de < 0) de = 0;
    var df = eval(GM_getValue(ad(Y + 'LevelingPartner'), '({})'));
    var dg = GM_getValue(ad(Y + "srentraPleveL".z()), '').split('\x2c');
    var dh;
    var message = "....gnikcattA".z();
    var di = document.getElementById(w + 'content');
    var dj = Utils.getElementsByClassName("kniLuneMrewol".z(), di);
    if (dj.length < 1) {
        if (document.body) {
            Timer.start(GM_getValue(ad(Y + 'Lallprof'), "/eliforp/srawbom/moc.koobecaf.sppa//:ptth".z()) + '?user_id=' + parseInt(dg[df.Position]), "....gnidaoleR ....rorre sraW boM".z(), 0, "daoleRrorrEWM".z(), false);
            return;
        } else P();
    }
    var dk = 1;
    if (dg[df.Position].split('\x3a')[3]) dk = parseInt(dg[df.Position].split('\x3a')[3]);
    if ((dk < 1) || (dk > 10)) dk = 1;
    if (dk > 1) {
        var dl = dj[0].parentNode;
        var dn = dl.cloneNode(true);
        dn.innerHTML = dn.innerHTML.replace(/force=1/g, 'force=' + dk);
        dn.style.visibility = 'hidden';
        dn.style.display = 'none';
        di = dl.parentNode.insertBefore(dn, dl);
        dj = Utils.getElementsByClassName("kniLuneMrewol".z(), di);
    }
    var dp = parseInt(dg[df.Position].split('\x3a')[1]);
    switch (dp) {
    case 1:
        for (var x = 0; x < dj.length; x++) {
            if (dj[x].innerHTML.match(/attack/)) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                break;
            } else if (dj[x].innerHTML.match(/punch/)) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                message = "....gnihcnuP".z();
                break;
            }
        }
        if (!dh) {
            if (ag.healmode == 2) {
                if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                    if (!document.body.innerHTML.match(/This user is currently dead/)) {
                        Timer.start(GM_getValue(ad(Y + 'Lallprof'), "/eliforp/srawbom/moc.koobecaf.sppa//:ptth".z()) + '?user_id=' + parseInt(dg[df.Position]), "....gnidaoleR".z(), 0, 'HealReload', false, function () {
                            bF(boss, ag);
                        }, 1, 175);
                        return;
                    }
                }
            }
        }
        break;
    case 2:
        for (var x = 0; x < dj.length; x++) {
            if (dj[x].innerHTML.match(/punch/)) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                message = "....gnihcnuP".z();
                break;
            }
        }
        if (!dh) {
            if (ag.healmode == 2) {
                if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                    if (!document.body.innerHTML.match(/This user is currently dead/)) {
                        Timer.start(GM_getValue(ad(Y + 'Lallprof'), "/eliforp/srawbom/moc.koobecaf.sppa//:ptth".z()) + '?user_id=' + parseInt(dg[df.Position]), "....gnidaoleR".z(), 0, 'HealReload', false, function () {
                            bF(boss, ag);
                        }, 1, 175);
                        return;
                    }
                }
            }
        }
        break;
    case 3:
        for (var x = 0; x < dj.length; x++) {
            if (dj[x].innerHTML.match(/attack/)) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                break;
            } else if (dj[x].innerHTML.match(/punch/)) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                message = "....gnihcnuP".z();
                break;
            } else if (dj[x].innerHTML.match(/add to/) && (!document.body.innerHTML.match(/This user is currently dead/)) && !ag.bank_active_Any) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                message = "....gnitsiltiH".z();
                var dp = new Object();
                dp.message = "...gnitsiltih".z();
                dp.page = 'hitlist';
                dp.func = 'hitListCurrentUser';
                dp.time = 1;
                boss.actions.hitCUser = dp;
                boss.save();
                break;
            }
        }
        if (!dh) {
            if (ag.healmode == 2) {
                if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                    if (!document.body.innerHTML.match(/This user is currently dead/)) {
                        Timer.start(GM_getValue(ad(Y + 'Lallprof'), "/eliforp/srawbom/moc.koobecaf.sppa//:ptth".z()) + '?user_id=' + parseInt(dg[df.Position]), "....gnidaoleR".z(), 0, 'HealReload', false, function () {
                            bF(boss, ag);
                        }, 1, 175);
                        return;
                    }
                }
            }
        }
        break;
    case 4:
        for (var x = 0; x < dj.length; x++) {
            if (dj[x].innerHTML.match(/punch/)) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                message = "....gnihcnuP".z();
                break;
            } else if (dj[x].innerHTML.match(/add to/) && (!document.body.innerHTML.match(/This user is currently dead/)) && !ag.bank_active_Any) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                message = "....gnitsiltiH".z();
                var dp = new Object();
                dp.message = "...gnitsiltih".z();
                dp.page = 'hitlist';
                dp.func = 'hitListCurrentUser';
                dp.time = 1;
                boss.actions.hitCUser = dp;
                boss.save();
                break;
            }
        }
        if (!dh) {
            if (ag.healmode == 2) {
                if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                    if (!document.body.innerHTML.match(/This user is currently dead/)) {
                        Timer.start(GM_getValue(ad(Y + 'Lallprof'), "/eliforp/srawbom/moc.koobecaf.sppa//:ptth".z()) + '?user_id=' + parseInt(dg[df.Position]), "....gnidaoleR".z(), 0, 'HealReload', false, function () {
                            bF(boss, ag);
                        }, 1, 175);
                        return;
                    }
                }
            }
        }
        break;
    case 5:
        for (var x = 0; x < dj.length; x++) {
            if (dj[x].innerHTML.match(/add to/) && (!document.body.innerHTML.match(/This user is currently dead/))) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                message = "....gnitsiltiH".z();
                var dp = new Object();
                dp.message = "...gnitsiltih".z();
                dp.page = 'hitlist';
                dp.func = 'hitListCurrentUser';
                dp.time = 1;
                boss.actions.hitCUser = dp;
                boss.save();
                break;
            }
        }
        break;
    case 6:
        for (var x = 0; x < dj.length; x++) {
            if (dj[x].innerHTML.match(/attack/)) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                break;
            }
            if ((!document.body.innerHTML.match(/This user is currently dead/) && !document.body.innerHTML.match(/This user is in the hospital and cannot fight/)) && (dj[x].innerHTML.match(/punch/))) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                message = "....gnihcnuP".z();
                dh = dj[x];
                break;
            }
        }
        if (!dh) {
            if (ag.healmode == 2) {
                if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                    if (!document.body.innerHTML.match(/This user is currently dead/) && !document.body.innerHTML.match(/This user is in the hospital and cannot fight/)) {
                        Timer.start(GM_getValue(ad(Y + 'Lallprof'), "/eliforp/srawbom/moc.koobecaf.sppa//:ptth".z()) + '?user_id=' + parseInt(dg[df.Position]), "....gnidaoleR".z(), 0, 'HealReload', false, function () {
                            bF(boss, ag);
                        }, 1, 175);
                        return;
                    }
                }
            }
        }
        break;
    case 7:
        for (var x = 0; x < dj.length; x++) {
            if (dj[x].innerHTML.match(/rig ignition/)) {
                dh = dj[x];
                message = "....noitingi niggiR".z();
                var dp = new Object();
                dp.message = "...noitingi niggir".z();
                dp.page = 'hitlist';
                dp.func = 'RigCurrentUser';
                dp.time = 1;
                boss.actions.RigUser = dp;
                boss.save();
                break;
            }
        }
        break;
    default:
        for (var x = 0; x < dj.length; x++) {
            if (dj[x].innerHTML.match(/attack/)) {
                if (ag.healmode == 2) {
                    if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                        if (!aD()) setTimeout(bF, ((de * 1000) - 500), boss, ag);
                    }
                }
                dh = dj[x];
                break;
            }
        }
        if (!dh) {
            if (ag.healmode == 2) {
                if (((boss.health * 100) < (boss.max_health * ag.heal_limit)) && (boss.bank_cash > boss.heal_cost)) {
                    if (!document.body.innerHTML.match(/This user is currently dead/) && !document.body.innerHTML.match(/This user is in the hospital and cannot fight/)) {
                        Timer.start(GM_getValue(ad(Y + 'Lallprof'), "/eliforp/srawbom/moc.koobecaf.sppa//:ptth".z()) + '?user_id=' + parseInt(dg[df.Position]), "....gnidaoleR".z(), 0, 'HealReload', false, function () {
                            bF(boss, ag);
                        }, 1, 175);
                        return;
                    }
                }
            }
        }
        break;
    }
    if (dh) {
        boss.fights.target_name = document.getElementById(w + 'content').getElementsByTagName('h1')[0].innerHTML.split('\x22')[1];
        boss.fights.target_id = Page.c_params['user_id'];
        boss.fights.target_amount = 0;
        boss.fights.hitlist = false;
        boss.save();
        if (message.match(/Attacking..../)) {
            if (ag.NewImproved) {
                var dq = ag.LevelAttackInterval - 175;
                if (dq < 0) dq = 0;
                ah['LVAttackForced'] = setTimeout(function () {
                    P();
                }, ((ag.lvAttack * ag.LevelAttackInterval) + 10000));
                Timer.start(function () {
                    if (ag.LevelingHealAll) {
                        if ((!ag.LVHealToMax && ((boss.health * 100) > (boss.max_health * ag.heal_limit))) || ((boss.health * 100) > (boss.max_health * 60))) {
                            bE();
                            setTimeout(function () {
                                Timer.start(dh, message, 0, "kcattAlaniFPL".z(), false);
                            }, dq);
                        } else bE(function () {
                            Timer.start(dh, message, 0, "kcattAlaniFPL".z(), false);
                        });
                    } else {
                        if ((!ag.LVHealToMax && ((boss.health * 100) > (boss.max_health * ag.heal_limit))) || ((boss.health * 100) > (boss.max_health * 60))) Timer.start(dh, message, 0, "kcattAlaniFPL".z(), false);
                        else bE(function () {
                            Timer.start(dh, message, 0, "kcattAlaniFPL".z(), false);
                        });
                    }
                }, message, de, 'LP', false, function () {
                    if (ag.LevelingHealAll) {
                        if ((!ag.LVHealToMax && ((boss.health * 100) > (boss.max_health * ag.heal_limit))) || ((boss.health * 100) > (boss.max_health * 60))) {
                            bE();
                            setTimeout(function () {
                                bG(dh.href, dk);
                            }, dq);
                        } else {
                            bE(function () {
                                bG(dh.href, dk);
                            });
                        }
                    } else {
                        if ((!ag.LVHealToMax && ((boss.health * 100) > (boss.max_health * ag.heal_limit))) || ((boss.health * 100) > (boss.max_health * 60))) {
                            bG(dh.href, dk);
                        } else {
                            bE(function () {
                                bG(dh.href, dk);
                            });
                        }
                    }
                }, (ag.lvAttack - 1), ag.LevelAttackInterval);
            } else {
                Timer.start(dh, message, de, 'LP', false, function () {
                    if (ag.LevelingHealAll) bE(false);
                    bG(dh.href, dk);
                }, (ag.lvAttack - 1), ag.LevelAttackInterval);
            }
        } else {
            Timer.start(dh, message, de, 'LP', false);
        }
        df.StaminaUsed += 1;
        GM_setValue(ad(Y + 'LevelingPartner'), df.toSource());
        return;
    } else {
        var dr = false;
        var ds = document.getElementById(ae('NextLink' + parseInt(dg[df.Position])));
        if (ds) ds.parentNode.removeChild(ds);
        while (dr == false) {
            df.Position += 1;
            if (df.Position >= dg.length) break;
            if (bZ(dg, df.Position)) continue;
            dr = true;
        }
        if (df.Position >= dg.length) {
            df.Position = 0;
            df.StaminaUsed = 0;
            df.running = false;
            df.LastRun = Page.now;
            GM_setValue(ad(Y + 'LevelingPartner'), df.toSource());
            if (dg[df.Position]) {
                if (B.match('user_id=' + parseInt(dg[df.Position]))) Timer.start(GM_getValue(ad(Y + 'Lallprof'), "/eliforp/srawbom/moc.koobecaf.sppa//:ptth".z()) + '?user_id=' + parseInt(dg[df.Position]), "...tegrat egneveR/rentraP gnileveL txeN".z(), 0, 'LP', false);
                else {
                    S = false;
                    U = true;
                    setTimeout(MainStuff, 0);
                }
                return;
            } else {
                ag.LevelPart = false;
                if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
                if (boss.actions.Leveling) delete boss.actions.Leveling;
                S = false;
                setTimeout(MainStuff, 0);
                return;
            }
        }
        GM_setValue(ad(Y + 'LevelingPartner'), df.toSource());
        Timer.start(GM_getValue(ad(Y + 'Lallprof'), "/eliforp/srawbom/moc.koobecaf.sppa//:ptth".z()) + '?user_id=' + parseInt(dg[df.Position]), "...tegrat egneveR/rentraP gnileveL txeN".z(), 0, 'LP', false);
        return;
    }
}
aP.st_pI = st_pI;

function st_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("st_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP animatS>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_animats".z()) + ">\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z());
    de.push('<tr id="' + ad("neger_animats".z()) + ">2=napsloc dt<>\"".z());
    var value = ag.staminaregen;
    de.push("\"=rof lebal<".z() + ad("staminaregen") + ">lebal/<?tratser ot tahw sehcaer animats litnu esuap ,0 sehcaer animats nehW>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("staminaregen") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('st_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_animats".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
function hl_pI(dd) {
    var value = ag.hitlist_active;
    var de = ag.MaxBounty;
    var df = ag.MinBounty;
    var dg = ag.maxsnipe;
    var dh = ag.hitlistsnipesafe;
    var di = new Array();
    di.push('<div id="' + ad("hl_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP tsiLtiH>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_tsiltih".z()) + "\"=di rt<>\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z() + ad("evitcatsiltih".z()) + ">2=napsloc dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("hitlist_active") + ">lebal/< :seitnuob tnuh yllacitamotuA>\"".z());
    di.push('</td><td>');
    if (value) {
        di.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("hitlist_active") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        di.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("hitlist_active") + ">/\"0\"=eulav \"".z());
    } else {
        di.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("hitlist_active") + ">/\"1\"=eulav \"".z());
        di.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("hitlist_active") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    di.push('</td></tr>');
    di.push('<tr id="' + ad("MaxBounty") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("Max_Bounty") + ">lebal/<)detimilnu = 0( ytnuoB xaM>\"".z());
    di.push('</td><td>');
    di.push("\"=eman \"txet\"=epyt tupni<".z() + ae("Max_Bounty") + " \"41\"=ezis \"41\"=htgnelxam \"".z());
    di.push('value="' + de + '">');
    di.push("\"=di rt<>rt/<>dt/<".z() + ad("MinBounty") + ">dt<>dt/<>dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("Min_Bounty") + ">lebal/<ytnuoB niM>\"".z());
    di.push('</td><td>');
    di.push("\"=eman \"txet\"=epyt tupni<".z() + ae("Min_Bounty") + " \"41\"=ezis \"41\"=htgnelxam \"".z());
    di.push('value="' + df + '">');
    di.push('</td></tr>');
    value = ag.IgnoreMinimumBounty;
    di.push('<tr id="' + ad("ytnuobmuminimerongi".z()) + ">napsloc dt<>dt/<>dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("IgnoreMinimumBounty") + ">lebal/< :animats lluf ta fi ytnuob muminim eht erongI>\"".z());
    di.push('</td><td>');
    if (value) {
        di.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("IgnoreMinimumBounty") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        di.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("IgnoreMinimumBounty") + ">/\"0\"=eulav \"".z());
    } else {
        di.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("IgnoreMinimumBounty") + ">/\"1\"=eulav \"".z());
        di.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("IgnoreMinimumBounty") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    di.push('<tr id="' + ad("tegrattsiltih".z()) + ">dt<>dt/<>dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("hitlist_target") + ">lebal/< :hcihw tegrat ,tsiltih no 1 neht erom fI>\"".z());
    di.push("\"=eman tceles<>dt<>dt/<".z() + ae("hitlist_target") + '">');
    di.push("\"0\"=eulav noitpo<".z());
    if (ag.hitlist_target == '\x30') di.push("\"detceles\"=detceles ".z());
    di.push(">noitpo/<emoC tsriF>".z());
    di.push("\"1\"=eulav noitpo<".z());
    if (ag.hitlist_target == '\x31') di.push("\"detceles\"=detceles ".z());
    di.push(">noitpo/<ytnuob tsehgiH>".z());
    di.push("\"2\"=eulav noitpo<".z());
    if (ag.hitlist_target == '\x32') di.push("\"detceles\"=detceles ".z());
    di.push(">noitpo/<ytnuob tsewoL>".z());
    di.push(">rt/<>dt/<>tceles/<".z());
    di.push('<tr id="' + ad("eromepinstsiltih".z()) + ">dt<>dt/<>dt<>\"".z());
    var value = ag.snipemore;
    di.push("\"=rof lebal<".z() + ad("eromepins_tsiltih".z()) + ">lebal/<:stegrat elpitlum kcattA>\"".z());
    di.push('</td><td>');
    if (value) {
        di.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("eromepins_tsiltih".z()) + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        di.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("eromepins_tsiltih".z()) + ">/\"0\"=eulav \"".z());
    } else {
        di.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("eromepins_tsiltih".z()) + ">/\"1\"=eulav \"".z());
        di.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("eromepins_tsiltih".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    di.push('</td></tr>');
    value = ag.snipe;
    di.push('<tr id="' + ad("epinstsiltih".z()) + ">dt<>dt/<>dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("epins_tsiltih".z()) + ">lebal/<:sepins tsaf ro ,edom efas ,sepins htiw tnuH>\"".z());
    di.push('</td><td>');
    di.push("\"=eman tceles<".z() + ae("epins_tsiltih".z()) + '">');
    di.push("\"0\"=eulav noitpo<".z());
    if (value == '\x30') di.push("\"detceles\"=detceles ".z());
    di.push(">noitpo/<efaS>".z());
    di.push("\"2\"=eulav noitpo<".z());
    if (value == '\x32') di.push("\"detceles\"=detceles ".z());
    di.push(">noitpo/<epinS>".z());
    di.push("\"1\"=eulav noitpo<".z());
    if (value == '\x31') di.push("\"detceles\"=detceles ".z());
    di.push(">noitpo/<epins tsaF>".z());
    di.push('</select>');
    di.push('</td></tr>');
    di.push('<tr id="' + ad("maxsnipe") + ">dt<>dt/<>dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("Max_snipe") + " xam ,1 nim( ?semit ynam woh epins ,gnipins fI>\"".z() + an + ')</label>');
    di.push('</td><td>');
    di.push("\"=eman \"txet=epyt tupni<".z() + ae("Max_snipe") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    di.push('value="' + dg + '">');
    di.push('</td></tr>');
    value = ag.varysnipe;
    di.push('<tr id="' + ad("VarySnipe") + ">dt<>dt/<>dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("varysnipe") + ">lebal/<:epins uoy semit fo rebmun eht yrav ,gnipins fI>\"".z());
    di.push('</td><td>');
    if (value) {
        di.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("varysnipe") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        di.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("varysnipe") + ">/\"0\"=eulav \"".z());
    } else {
        di.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("varysnipe") + ">/\"1\"=eulav \"".z());
        di.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("varysnipe") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    di.push('</td></tr>');
    value = ag.varysnipeamount;
    di.push('<tr id="' + ad("tnuomAepinSyraV".z()) + ">dt<>dt/<>dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("varysnipeamount") + ">lebal/<)2 xam ,1 nim( :ynam woh yb -/+ ,no si epins yrav dna ,gnipins fI>\"".z());
    di.push('</td><td>');
    di.push("\"=eman \"txet=epyt tupni<".z() + ae("varysnipeamount") + " \"1\"=ezis \"1\"=htgnelxam \"".z());
    di.push('value="' + value + '">');
    di.push('</td></tr>');
    value = ag.snipedelay;
    di.push('<tr id="' + ad("snipedelay") + ">dt<>dt/<>dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("SnipeDelay") + ">lebal/<:sdnocesillim ynam woh yb kcatta tsrif yaleD>\"".z());
    di.push('</td><td>');
    di.push("\"=eman \"txet=epyt tupni<".z() + ae("SnipeDelay") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    di.push('value="' + value + '">');
    di.push('</td></tr>');
    value = ag.SnipeInterval;
    di.push('<tr id="' + ad("lavretniepins".z()) + ">dt<>dt/<>dt<>\"".z());
    di.push("\"=rof lebal<".z() + ad("SnipeInterval") + ">lebal/<:sepins neewteb sdnocesillim ynam woh yaleD>\"".z());
    di.push('</td><td>');
    di.push("\"=eman \"txet=epyt tupni<".z() + ae("SnipeInterval") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    di.push('value="' + value + '">');
    di.push('</td></tr>');
    di.push(">rh<>vid/<>elbat/<".z());
    var dj = document.createElement('div');
    if (dj) dj.innerHTML = di.join('\n');
    var dk = document.getElementById(ae('PrefStuff'));
    if (dk) dk.appendChild(dj);
    var button = document.getElementById(ae('hl_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_tsiltih".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.hl_pI = hl_pI;
aP.hl_pH = hl_pH;

function hl_pH(dd) {
    var input = dd.elements.namedItem(ae('hitlist_active'));
    var de = dd.elements.namedItem(ae("epins_tsiltih".z()));
    var df = parseInt(dd.elements.namedItem(ae('Max_snipe')).value);
    var dg = dd.elements.namedItem(ae("eromepins_tsiltih".z()));
    var dh = dd.elements.namedItem(ae('Max_Bounty')).value;
    var di = dd.elements.namedItem(ae('Min_Bounty')).value;
    var dj = parseInt(dd.elements.namedItem(ae('staminaregen')).value);
    var dk = false;
    var dl = dd.elements.namedItem(ae('hitlist_target'));
    if (ag.hitlist_target != dl.options[dl.selectedIndex].value) {
        ag.hitlist_target = dl.options[dl.selectedIndex].value;
        dk = true;
    }
    if (ag.hitlist_active != input.checked) {
        if (boss.actions.hitlist) delete boss.actions.hitlist;
        ag.hitlist_active = input.checked;
        dk = true;
    }
    input = dd.elements.namedItem(ae('IgnoreMinimumBounty'));
    if (ag.IgnoreMinimumBounty != input.checked) {
        ag.IgnoreMinimumBounty = input.checked;
        dk = true;
    }
    input = parseInt(dd.elements.namedItem(ae('SnipeDelay')).value);
    if (ag.snipedelay != input) {
        ag.snipedelay = input;
        dk = true;
    }
    input = parseInt(dd.elements.namedItem(ae('SnipeInterval')).value);
    if (ag.SnipeInterval != input) {
        ag.SnipeInterval = input;
        dk = true;
    }
    if (ag.snipe != de.options[de.selectedIndex].value) {
        ag.snipe = de.options[de.selectedIndex].value;
        dk = true;
    }
    if (ag.MaxBounty != dh) {
        ag.MaxBounty = dh;
        dk = true;
    }
    if (ag.staminaregen != dj) {
        ag.staminaregen = dj;
        dk = true;
    }
    if (ag.MinBounty != di) {
        ag.MinBounty = di;
        dk = true;
    }
    if (ag.maxsnipe != df) {
        if (df > an) df = an;
        if (df < 1) df = 1;
        ag.maxsnipe = df;
        dk = true;
    }
    input = dd.elements.namedItem(ae('varysnipe'));
    if (ag.varysnipe != input.checked) {
        ag.varysnipe = input.checked;
        dk = true;
    }
    input = dd.elements.namedItem(ae('varysnipeamount')).value;
    if (input < 1) {
        input = 1;
    } else if (input > 2) {
        input = 2;
    }
    if (ag.varysnipeamount != input) {
        ag.varysnipeamount = input;
        dk = true;
    }
    if (ag.snipemore != dg.checked) {
        if (boss.actions.hitlist) delete boss.actions.hitlist;
        ag.snipemore = dg.checked;
        if (ag.snipemore) {}
        dk = true;
    }
    return dk;
}
function ca(dd) {
    return dd.replace(/^\s+/g, '').replace(/\s+$/g, '');
}
function RemoveDupesLV(dd, de) {
    var temp = dd.split('\x2c');
    var df = new Array();
    for (i = 0; i < temp.length; i) {
        if (!temp[i].split('\x3a')[1]) temp[i] = temp[i] + ':0';
        if (!temp[i].split('\x3a')[2]) temp[i] = temp[i] + ':Unknown';
        if (!temp[i].split('\x3a')[3]) temp[i] = temp[i] + ':1';
        var dg = temp[i];
        temp.splice(i, 1);
        if (!de || !in_array_Int(dg, temp)) {
            if (!isNaN(parseInt(dg))) {
                df.push(ca(dg));
            }
        }
    }
    return df.join('\x2c');
}
function RemoveDupes(dd) {
    var temp = dd.split('\x2c');
    var de = new Array();
    for (i = 0; i < temp.length; i) {
        var df = temp[i];
        temp.splice(i, 1);
        if (!in_array_Int(df, temp)) {
            if (!isNaN(parseInt(df))) {
                de.push(parseInt(df));
            }
        }
    }
    return de.join('\x2c');
}
function fh_pI(dd) {
    var de = new Array();
    var value = ag.fbhide;
    de.push('<div id="' + ad("fh_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP kooBecaF>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_hf".z()) + "\"=di rt<>\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z() + ad("fbookhide") + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("fbhide") + ">lebal/<>retnec/<>tnof/<.no ot tes tnemtsujda neercs niam htiw desu fi tseB  .xp007 neht ssel si thgieh neercs ruoy fi skrow ylnO>1=ezis tnof<>retnec<>rb<:stnemesitrevda sraWboM/kooBecaF ediH>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fbhide") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fbhide") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fbhide") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fbhide") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("edihecneserpbf".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("fbpresence") + ">lebal/<:raB ecneserP kooBecaF ediH>\"".z());
    de.push('</td><td>');
    value = ag.blockpresence;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fbpresence") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fbpresence") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fbpresence") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fbpresence") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push(">rh<>vid/<>elbat/<>rt/<>dt/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('fh_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_hf".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.fh_pI = fh_pI;
aP.fh_pH = fh_pH;

function fh_pH(dd) {
    var input = dd.elements.namedItem(ae('fbhide'));
    var de = false;
    if (ag.fbhide != input.checked) {
        ag.fbhide = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('fbpresence'));
    if (ag.blockpresence != input.checked) {
        ag.blockpresence = input.checked;
        de = true;
    }
    return de;
}
function td_pI(dd) {
    var value = ag.timerdelay;
    var de = new Array();
    de.push('<div id="' + ad("td_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP yaleD remiT>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_dt".z()) + "\"=di rt<>\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z() + ad("tdelay") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("Timer_Delay") + "( sdnoces ni yaleD remiT tluafeD>\"".z() + aR + ' second');
    if (aR > 1) de[(de.length - 1)] += '\x73';
    de.push(">lebal/<)muminim ".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("Timer_Delay") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    de.push('value="' + value + '"/>');
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("BHdelay") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("BH_Delay") + "( sdnoces ni yaleD gnitnuH ytnuoB>\"".z() + aR + ' second');
    if (aR > 1) de[(de.length - 1)] += '\x73';
    de.push(">lebal/<)muminim ".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("BH_Delay") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.BHdelay;
    de.push('value="' + value + '"/>');
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("FDdelay") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("FD_Delay") + "( sdnoces ni yaleD enorD rethgiF>\"".z() + aR + ' second');
    if (aR > 1) de[(de.length - 1)] += '\x73';
    de.push(">lebal/<)muminim ".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("FD_Delay") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.FDdelay;
    de.push('value="' + value + '"/>');
    de.push('</td></tr>');
    de.push('<tr id="' + ad("FDReload") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("FD_Reload") + "( sdaoler tsil thgif neewteb emiT>\"".z() + aR + ' second');
    if (aR > 1) de[(de.length - 1)] += '\x73';
    de.push(">lebal/<)muminim ".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("FD_Reload") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.FighterDroneReload;
    de.push('value="' + value + '"/>');
    de.push('</td></tr>');
    de.push('<tr id="' + ad("rdelay") + '"><td>');
    value = ag.refreshdelay;
    de.push("\"=rof lebal<".z() + ad("yaleD_hserfeR".z()) + ">lebal/<:)elbasid ot 0 ,syaled rethgif ro ,ytnuob ,tluafed fo hgih fo nim( remiT hserfeR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("yaleD_hserfeR".z()) + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    de.push('value="' + value + '"/>');
    de.push('</td></tr>');
    value = ag.captchatimeoutlength;
    de.push('<tr id="' + ad("capdelay") + '"><td>');
    de.push("\"=rof lebal<".z() + ad("Cap_Delay") + ">lebal/<:)elbasid ot 0 ,nim setunim 01( remiT ahctpaC>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("Cap_Delay") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    de.push('value="' + value + '"/>');
    de.push('</td></tr>');
    value = ag.randomizer;
    de.push('<tr id="' + ad("Randomizer") + '"><td>');
    de.push("\"=rof lebal<".z() + ad("randomizer") + ">lebal/<:dnoces 1 sunim ro sulp remit yrav yllacitamotuA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("randomizer") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("randomizer") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("randomizer") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("randomizer") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = ag.delayMainCall;
    de.push('<tr id="' + ad("llacniamyaled".z()) + '"><td>');
    de.push("\"=rof lebal<".z() + ad("delayMainCall") + ">lebal/<>tnof/<)ces1=0001 sdnocesillim(>\"xp8:ezis-tnof\"=elyts tnof< :remit noitca rof emit muminiM>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("delayMainCall") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    de.push('value="' + value + '"/>');
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('td_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_dt".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.td_pI = td_pI;
aP.td_pH = td_pH;

function td_pH(dd) {
    var de = parseInt(dd.elements.namedItem(ae('Timer_Delay')).value);
    var df = parseInt(dd.elements.namedItem(ae('BH_Delay')).value);
    var dg = parseInt(dd.elements.namedItem(ae('FD_Delay')).value);
    var dh = parseInt(dd.elements.namedItem(ae("yaleD_hserfeR".z())).value);
    var di = parseInt(dd.elements.namedItem(ae('Cap_Delay')).value);
    var dj = false;
    var input = parseInt(dd.elements.namedItem(ae('delayMainCall')).value);
    if (isNaN(input) || (input < 0)) input = 250;
    if (input != ag.delayMainCall) {
        ag.delayMainCall = input;
        dj = true;
    }
    if (dh < aR) dh = 0;
    if (dh != ag.refreshdelay) {
        ag.refreshdelay = dh;
        dj = true;
    }
    if (de < aR) de = aR;
    if (de != ag.timerdelay) {
        ag.timerdelay = de;
        dj = true;
    }
    if ((ag.refreshdelay != 0) && (ag.refreshdelay < ag.timerdelay)) {
        ag.refreshdelay = ag.timerdelay;
        dj = true;
    }
    if (df < aR) df = aR;
    if (df != ag.BHdelay) {
        ag.BHdelay = df;
        dj = true;
    }
    if ((ag.refreshdelay != 0) && (ag.refreshdelay < ag.BHdelay)) {
        ag.refreshdelay = ag.BHdelay;
        dj = true;
    }
    if (dg < aR) dg = aR;
    if (dg != ag.FDdelay) {
        ag.FDdelay = dg;
        dj = true;
    }
    if ((ag.refreshdelay != 0) && (ag.refreshdelay < ag.FDdelay)) {
        ag.refreshdelay = ag.FDdelay;
        dj = true;
    }
    var input = parseInt(dd.elements.namedItem(ae('FD_Reload')).value);
    if (input < aR) input = aR;
    if (input != ag.FighterDroneReload) {
        ag.FighterDroneReload = input;
        dj = true;
    }
    if (di < 10) di = 0;
    if (di != ag.captchatimeoutlength) {
        ag.captchatimeoutlength = di;
        dj = true;
    }
    var dk = dd.elements.namedItem(ae('randomizer'));
    if (ag.randomizer != dk.checked) {
        ag.randomizer = dk.checked;
        dj = true;
    }
    return dj;
}
var cb = eval(GM_getValue(ad(Y + 'inventory'), '({})'));
aQ.iv_e = iv_e;

function iv_e() {
    boss.city_check = boss.city_check || 0;
    boss.stockpile_check = boss.stockpile_check || 0;
    var dd = ['jobs', 'city', 'stockpile'];
    if (typeof aL != 'undefined') aL = aL.toSource();
    else aL = 'undefined';
    if (dd.indexOf(Page.c_page) != -1) {
        var de = document.getElementById(w + 'content');
        if (de) {
            var divs = Utils.getElementsByXPath("])\"meti\",eman@(sniatnoc[a//.".z(), de);
            if (divs) {
                for (var i = 0; i < divs.length; i++) {
                    if ((Page.c_page == 'city') || (Page.c_page == 'stockpile')) {
                        var df = document.getElementById(w + 'item_count_' + divs[i].name.substr(5)).innerHTML;
                        cb[divs[i].name] = parseInt(df);
                    } else {
                        var dg = Utils.getElementsByXPath("rt::rotsecna/.".z(), divs[i])[0];
                        if (dg) {
                            var df = dg.innerHTML.match(/Owned: (<[^<]*>)?(\d+)/);
                            if (df) cb[divs[i].name] = parseInt(df[2]);
                        }
                    }
                }
                GM_setValue(ad(Y + 'inventory'), cb.toSource());
            }
        }
    }
    var dh = "ue;a";
    var di = "N = tr" + dh + "o";
    if (boss.new_level) {
        if (ag.newLevelAcCheck) {
            boss.city_check = 1;
        }
        if (ag.newLevelSpCheck) {
            boss.stockpile_check = 1;
        }
    }
    if (C) {
        if (!C.toSource().match("{a" + di + " = false;")) aN = true;
    } else {
        aN = true;
    }
    switch (Page.c_page) {
    case 'city':
        itemlist.updateData();
        var dj = 0;
        var dk = 0;
        for (var dl in itemlist) {
            if (itemlist[dl].type != 'city') continue;
            var dn = cb[dl] || 0;
            dj += dn * itemlist[dl].income;
            var dp = itemlist[dl].price / 2;
            while (dn) {
                if (dn >= 10) {
                    dk += (10 + dn) * dp;
                    dn -= 10;
                } else {
                    dk += (10 + dn) * dn * dp / 10;
                    dn = 0;
                }
            }
        }
        boss.total_income = dj;
        boss.city_value = dk;
        bf.update();
        break;
    case 'stockpile':
        itemlist.updateData();
        var dq = 0;
        var dr = 0;
        for (var ds in itemlist) {
            if (itemlist[ds].type != 'stockpile') continue;
            var dt = cb[ds] || 0;
            dq += dt * itemlist[ds].upkeep;
            dr += dt * itemlist[ds].price / 2;
        }
        boss.total_upkeep = dq;
        boss.stockpile_value = dr;
        bf.update();
        break;
    case 'jobs':
        itemlist.updateData();
        break;
    default:
        break;
    }
    var du = new Object();
    if (boss.city_check == 1) {
        du.page = 'city';
        du.func = 'checkcities';
        du.message = "...elbaliava sgnidliub wen gnikcehC".z();
        du.time = Page.now + Math.floor(Math.random() * 31);
        boss.actions.inventory_city = du;
        boss.city_check = 0;
    }
    if (boss.stockpile_check == 1) {
        du = new Object();
        du.page = 'stockpile';
        du.func = 'checkstockpile';
        du.message = "...elipkcots gnikcehC".z();
        du.time = Page.now;
        boss.actions.inventory_stockpile = du;
        boss.stockpile_check = 0;
    }
}
function cc() {
    this.payout_min = 0;
    this.payout_max = 0;
    this.exp = 0;
    this.mobsters = 0;
    this.city = 'new_york';
    this.req_items = new Object();
    this.prep_items = new Object();
    this.payout_items = new Object();
}
function int_to_dollars(dd) {
    dd = dd || 0;
    var de = "";
    while (dd >= 1000) {
        var df = dd % 1000;
        if (df > 99) df = "" + df;
        else if (df > 9) df = "\x30" + df;
        else df = "00" + df;
        de = "\x2c" + df + de;
        dd = Math.floor(dd / 1000);
    }
    de = "\x24" + dd + de;
    return de;
}
function dollars_to_int(dd) {
    if (dd != undefined) {
        return dd.replace(/,|\$/g, '');
    }
    return 0;
}
BVL = new Object();
BVL.init = function () {
    this.handlers = new Array();
    this.div = document.createElement('div');
    this.div.id = ad('BVLDiv');
    this.div.className = ad("lvb-mg-koobecaf".z());
    this.width = 610;
    this.paid_by_modifier = 0;
    if (ag.DisplayPaidBy) this.paid_by_modifier = 190;
    this.width += this.paid_by_modifier;
    var dd = '\x2e' + ae("lvb-mg-koobecaf".z()) + "(lru:egami-dnuorgkcab;%001:thgieh_;debme:idib-edocinu;rtl:noitcerid;tfel:ngila-txet;0:gniddap;0:nigram;333#:roloc;xp11:ezis-tnof;fires-snas,laira,anadrev,amohat,\"ednarg adicul\":ylimaf-tnof;fff#:dnuorgkcab { ".z() + as + ";enon :yalpsid ;thgir:ngila-txet ;taeper-on :taeper-dnuorgkcab ;xp05 xp043 :noitisop-dnuorgkcab ;)".z() + " :htdiw ;xp0 :gniddap ;kcalb dilos xp0 :redrob ;otua :thgir-nigram ;otua :tfel-nigram ".z() + this.width + " :thgieh ;xp".z() + (pageHeight() - 120) + ":roloc-dnuorgkcab ;lairA :ylimaf-tnof ;xp".z() + ":roloc ;etihw".z() + "} ;dlob:thgiew-tnof ;xp0:gniddap ;yerg".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + "} ;FFFFFF# :roloc ;4B48D6# :dnuorgkcab ;retnec:ngila-txet ;tp21 :ezis-tnof { 1h ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + "(lru:egami-dnuorgkcab { elbat ".z() + ar + "} ;dilos dilos dilos dilos :elyts-redrob ;xp0 :gniddap ;xp1 :htdiw-redrob ;taeper-on :taeper-dnuorgkcab ;xp561 xp013 :noitisop-dnuorgkcab  ;)".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' .' + ad("td_l") + "} ;xp0 :gniddap ;xp1 :htdiw-redrob ;tp01 :ezis-tnof ;tfel:ngila-txet { ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' .' + ad("td_r") + "} ;xp0 :gniddap ;xp1 :htdiw-redrob ;tp01 :ezis-tnof ;thgir:ngila-txet { ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' .' + ad("td_h") + "} ;kcalb xp1 dilos :mottob-redrob ;tp01 :ezis-tnof { ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ad("fixedHeader") + "} ;kcolb :yalpsid { rt ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' tbody.' + ad("tnetnoCllorcs".z()) + " :thgieh ;%001 :htdiw ;otua :wolfrevo ;kcolb :yalpsid { ".z() + (pageHeight() - 220) + 'px; }';
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp02 :htdiw { ht ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp511 :htdiw { ht + ht ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp043 :htdiw { ht + ht + ht ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp51 :htdiw { ht + ht + ht + ht ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp011 :htdiw {ht + ht + ht + ht + ht ".z();
    if (ag.DisplayPaidBy) dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + " :htdiw {ht+ ht + ht + ht + ht + ht ".z() + this.paid_by_modifier + 'px; }';
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp02 :htdiw { dt ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp511 :htdiw { dt + dt ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp513 :htdiw { dt + dt + dt ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} xp51 :htdiw { dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp011 :htdiw { dt + dt + dt + dt + dt ".z();
    if (ag.DisplayPaidBy) dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + " :htdiw { dt + dt + dt + dt + dt + dt ".z() + this.paid_by_modifier + 'px; }';
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp02 :htdiw { dt ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp511 :htdiw { dt + dt ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp043 :htdiw { dt + dt + dt ".z();
    dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp51 :htdiw { dt + dt + dt + dt ".z();
    if (ag.DisplayPaidBy) {
        dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp011 :htdiw { dt + dt + dt + dt + dt ".z();
        dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + " :htdiw { dt+ dt + dt + dt + dt + dt ".z() + (this.paid_by_modifier - 16) + 'px; }';
    } else dd += '\x2e' + ae("lvb-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp49 :htdiw { dt + dt + dt + dt + dt ".z();
    GM_addStyle(dd);
};
BVL.build = function () {
    var dd = GM_getValue(ad(Y + 'victims'), '').split('\x7c');
    var de = '';
    var df = 0;
    de += "\"=htdiw elbat<>rb<".z() + this.width + ">\"elbat_lvb\"=di 0=gnicapsllec \"xp".z();
    de += "\"=ssalc daeht<".z() + ae("fixedHeader") + "\"=ssalc ht<>rt<>\"".z() + ae("td_h") + "\"=ssalc ht<>ht/<S>\"retnec\"=ngila \"".z() + ae("td_h") + "\"=ssalc ht<>ht/<etaD>\"retnec\"=ngila \"".z() + ae("td_h") + "\"=ssalc ht<>ht/<tnenoppO>\"tfel\"=ngila \"".z() + ae("td_h") + "\"=ssalc ht<>ht/<crF>\"tfel\"=ngila \"".z() + ae("td_h") + ">ht/<ytnuoB>\"tfel\"=ngila \"".z();
    if (ag.DisplayPaidBy) de += '<th class="' + ae("td_h") + ">ht/<yB diaP>\"tfel\"=ngila \"".z();
    de += "\"=ssalc ydobt<>daeht/<>rt/<".z() + ae("tnetnoCllorcs".z()) + '">';
    var dg;
    var dh;
    var di = '';
    if (location.href.match(/#stop/)) {
        di = "#stop";
    }
    dd.sort(function (a, b) {
        return Vsorting(a, b);
    });
    if (dd.length > 0) {
        for (var victim in dd) {
            if (dd[victim].split('\x3a')[0] != '') {
                dh = '\x20';
                dg = 'NR';
                if (dd[victim].split('\x3a')[3] != undefined) {
                    var dj = new Date(parseFloat(dd[victim].split('\x3a')[3]));
                    var dk = dj.getFullYear() + '';
                    var dl = dj.toTimeString() + '';
                    dg = (dj.getMonth() + 1) + '\x2f' + dj.getDate() + '\x2f' + dk.substr(2, 2) + '\x20' + dl.substr(0, 8);
                }
                if (dd[victim].split('\x3a')[1] != '') {
                    de += "=di_resu?/eliforp/srawbom/moc.koobecaf.sppa//:ptth'=ferh.noitacol.wodniw\"=kcilcno \"retniop:rosruc\"=elyts rt<".z() + dd[victim].split('\x3a')[1] + di + '\';">';
                } else {
                    de += '<tr>';
                }
                if (dd[victim].split('\x3a')[4] != undefined) {
                    dh = dd[victim].split('\x3a')[4];
                }
                var dn;
                if (!isNaN(dd[victim].split('\x3a')[2])) {
                    dn = int_to_dollars(dd[victim].split('\x3a')[2]);
                } else {
                    dn = dd[victim].split('\x3a')[2];
                }
                var dp = '';
                if ((dd[victim].split('\x3a')[5] != undefined) && (parseInt(dd[victim].split('\x3a')[5]) > 1)) {
                    dp = dd[victim].split('\x3a')[5];
                }
                de += '<td class+"' + ae("td_l") + '">' + dh + '</td>';
                de += '<td class="' + ae("td_l") + '">' + dg + "\"=ssalc dt<>dt/<".z() + ae("td_l") + '">' + dd[victim].split('\x3a')[0] + "\"=ssalc dt<>dt/<".z() + ae("td_l") + '">' + dp + "\"=ssalc dt<>dt/<".z() + ae("td_r") + '">' + dn + '</td>';
                if (ag.DisplayPaidBy) {
                    de += '<td class="' + ae("td_l") + '">';
                    if (dd[victim].split('\x3a')[6] != undefined) {
                        de += ";psbn&;psbn&".z();
                        if (dd[victim].split('\x3a')[7] != undefined) de += '<a href="' + dd[victim].split('\x3a')[7].replace(/{{/g, '\x3a') + '">' + dd[victim].split('\x3a')[6] + '</a>';
                        else de += dd[victim].split('\x3a')[6];
                    }
                    de += '</td>';
                }
                de += '</tr>';
                df += parseInt(dollars_to_int(dn));
            }
        }
    }
    de += "\"=ssalc daeht<>ydobt/<".z() + ae("fixedHeader") + '"><tr id="' + ad("latot_elbat_lvb".z()) + "\"=ssalc parwon dt<>dt/<>\";kcalb dilos xp1:pot-redrob\"=elyts dt<>dt/<>\";kcalb dilos xp1:pot-redrob\"=elyts dt<>dt/<>\";kcalb dilos xp1:pot-redrob\"=elyts dt<>\"".z() + ae("td_r") + "\"=ssalc parwon dt<>dt/<:DETCELLOC SEITNUOB LATOT>\";kcalb dilos xp1:pot-redrob\"=elyts  \"".z() + ae("td_r") + "\"=di \"neerg:roloc;kcalb dilos xp1:pot-redrob\"=elyts \"".z() + ad("seitnuob_latot_lvb".z()) + '">' + int_to_dollars(df) + '</td>';
    if (ag.DisplayPaidBy) de += "\"=ssalc parwon dt<".z() + ae("td_r") + ">dt/<>\";kcalb dilos xp1:pot-redrob\"=elyts \"".z();
    de += ">daeht/<>rt/<".z();
    de += '</table>';
    de += '<br />';
    this.div.innerHTML = de;
    this.form = document.createElement('form');
    this.form.action = '';
    this.form.method = '';
    this.form.id = ae("lvb-mg-koobecaf".z());
    this.div.appendChild(this.form);
    this.button_DayTotals = document.createElement('button');
    this.button_DayTotals.type = 'button';
    this.button_DayTotals.id = ad("slatoTyaD_lvb".z());
    this.button_DayTotals.innerHTML = ">tnof/<yaD yB seitnuoB latoT>'xp9:ezis-tnof'=elyts tnof<".z();
    this.form.appendChild(this.button_DayTotals);
    this.button_space = document.createElement('span');
    this.button_space.innerHTML = ";psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&".z();
    this.form.appendChild(this.button_space);
    this.button_clear = document.createElement('button');
    this.button_clear.type = 'button';
    this.button_clear.id = ad('bvl_clear');
    this.button_clear.innerHTML = "CLEAR";
    if (dd.length > 0) this.form.appendChild(this.button_clear);
    this.button_close = document.createElement('button');
    this.button_close.type = 'button_close';
    this.button_close.id = ad('bvl_close');
    this.button_close.innerHTML = "CLOSE";
    this.form.appendChild(this.button_close);
    var dq = GM_getValue(ad(Y + 'VictimList'), "40|40").split('\x7c');
    if (parseInt(dq[1]) < 35) dq[1] = 35;
    GM_setValue(ad(Y + "etats_tsiLmitciV".z()), "max");
    this.divFloat = au.createFloatingDiv(this.width, dq[0], dq[1], 'left', "V ;2848#&repleH otuA sraWboM>\"lmth.egaPemoH/repleHotuAWM/moc.gnitsohdlroweruces.www//:ptth\"=ferh \"knalb_\"=tegrat \";eulbkrad:roloc\"=elyts a<>1h<".z() + f + ">1h/<tsiL mitciV ytnuoB >a/<".z(), 'VictimList', true, true, true);
    this.divFloat.appendChild(this.div);
    this.button_DayTotals.addEventListener('click', this.eventListener(), true);
    this.button_clear.addEventListener('click', this.eventListener(), true);
    this.button_close.addEventListener('click', this.eventListener(), true);
    this.form.addEventListener('submit', this.eventListener(), true);
};
BVL.pausingVictims = function () {
    pausingVictims = 1;
};
BVL.eventListener = function () {
    var dd = this;
    return function (de) {
        de.preventDefault();
        if (this.id == ad('bvl_clear')) {
            GM_setValue(ad(Y + 'victims'), '');
            P();
        } else if (this.id == ad("slatoTyaD_lvb".z())) {
            BountyDTotals.show();
            return;
        }
        dd.div.style.display = 'none';
        dd.div.parentNode.parentNode.removeChild(dd.div.parentNode);
        pausingVictims = 0;
    };
};
BVL.show = function () {
    return function () {
        BVL.pausingVictims();
        var dd = document.getElementById(ae('BVLDiv'));
        if (!dd) {
            BVL.init();
            BVL.build();
            dd = document.getElementById(ae('BVLDiv'));
        }
        if (dd) {
            var de = GM_getValue(ad(Y + "etats_tsiLmitciV".z()), "max");
            if (de == "min") dd.style.display = 'none';
            else dd.style.display = 'block';
        }
    };
};
BountyDTotals = new Object();
BountyDTotals.init = function () {
    this.handlers = new Array();
    this.div = document.createElement('div');
    this.div.id = ad('BDTDiv');
    this.div.className = ad("TDB-mg-koobecaf".z());
    this.width = 205;
    var dd = '\x2e' + ae("TDB-mg-koobecaf".z()) + ";%001:thgieh_;debme:idib-edocinu;rtl:noitcerid;tfel:ngila-txet;0:gniddap;0:nigram;333#:roloc;xp11:ezis-tnof;fires-snas,laira,anadrev,amohat,\"ednarg adicul\":ylimaf-tnof;fff#:dnuorgkcab { ".z() + ";enon :yalpsid ;thgir:ngila-txet ".z() + " :htdiw ;xp0 :gniddap ;kcalb dilos xp0 :redrob ;otua :thgir-nigram ;otua :tfel-nigram ".z() + this.width + " :thgieh ;xp".z() + (pageHeight() - 220) + ":roloc-dnuorgkcab ;lairA :ylimaf-tnof ;xp".z() + ":roloc ;etihw".z() + "} ;dlob:thgiew-tnof ;xp0:gniddap ;yerg".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + "} ;FFFFFF# :roloc ;4B48D6# :dnuorgkcab ;retnec:ngila-txet ;tp21 :ezis-tnof { 1h ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' table { ' + "} ;dilos dilos dilos dilos :elyts-redrob ;xp0 :gniddap ;xp1 :htdiw-redrob".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' .' + ad("td_l") + "} ;xp0 :gniddap ;xp1 :htdiw-redrob ;tp01 :ezis-tnof ;tfel:ngila-txet { ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' .' + ad("td_r") + "} ;xp0 :gniddap ;xp1 :htdiw-redrob ;tp01 :ezis-tnof ;thgir:ngila-txet { ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' .' + ad("td_c") + "} ;xp0 :gniddap ;xp1 :htdiw-redrob ;tp01 :ezis-tnof ;retnec:ngila-txet { ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' .' + ad("td_h") + "} ;kcalb xp1 dilos :mottob-redrob ;tp01 :ezis-tnof { ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' thead.' + ad("fixedHeader") + "} ;kcolb :yalpsid { rt ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' tbody.' + ad("tnetnoCllorcs".z()) + " :thgieh ;%001 :htdiw ;otua :wolfrevo ;kcolb :yalpsid { ".z() + (pageHeight() - 335) + 'px; }';
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp57 :htdiw { ht ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp01 :htdiw { ht + ht ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp011 :htdiw { ht + ht + ht ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp57 :htdiw { dt ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp01 :htdiw { dt + dt ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp011 :htdiw { dt + dt + dt ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp57 :htdiw { dt ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' thead.' + ae("tnetnoCllorcs".z()) + "} ;xp01 :htdiw { dt + dt ".z();
    dd += '\x2e' + ae("TDB-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp49 :htdiw { dt + dt + dt ".z();
    GM_addStyle(dd);
};
BountyDTotals.build = function () {
    var dd = GM_getValue(ad(Y + 'victims'), '').split('\x7c');
    var de = '';
    var df = 0;
    var dg = [];
    if (dd.length > 0) {
        for (var victim in dd) {
            if (dd[victim].split('\x3a')[0] != '') {
                if (dd[victim].split('\x3a')[3] != undefined) {
                    var dh = new Date(parseFloat(dd[victim].split('\x3a')[3]));
                    var di = (dh.getFullYear() + '').substr(2, 2);
                    var dj = dh.getMonth() + 1;
                    var dk = dh.getDate();
                    if (dg[di] == undefined) dg[di] = [];
                    if (dg[di][dj] == undefined) dg[di][dj] = [];
                    if (dg[di][dj][dk] == undefined) dg[di][dj][dk] = 0;
                    var dl = 100000;
                    if (isNaN(dd[victim].split('\x3a')[2])) {
                        dl = dollars_to_int(dd[victim].split('\x3a')[2]);
                    } else {
                        dl = dd[victim].split('\x3a')[2];
                    }
                    if (!isNaN(dl)) {
                        dg[di][dj][dk] += parseInt(dl);
                        df += parseInt(dl);
                    }
                }
            }
        }
    }
    de += "\"=htdiw elbat<>rb<".z() + this.width + ">\"elbat_tdb\"=di 0=gnicapsllec \"xp".z();
    de += "\"=ssalc daeht<".z() + ae("fixedHeader") + "\"=ssalc ht<>rt<>\"".z() + ae("td_h") + "\"=ssalc ht<>ht/<etaD>\"retnec\"=ngila \"".z() + ae("td_h") + "\"=ssalc ht<>ht/<>\"".z() + ae("td_h") + ">daeht/<>rt/<>ht/<latoT ytnuoB>\"retnec\"=ngila \"".z();
    de += "\"=ssalc ydobt<".z() + ae("tnetnoCllorcs".z()) + '">';
    for (var y = (dg.length - 1); y >= 0; y--) {
        if (dg[y] == undefined) continue;
        for (var m = (dg[y].length - 1); m >= 0; m--) {
            if (dg[y][m] == undefined) continue;
            for (var d = (dg[y][m].length - 1); d >= 0; d--) {
                if (dg[y][m][d] == undefined) continue;
                de += "\"=ssalc dt<>rt<".z() + ae("td_r") + '">' + m + '\x2f' + d + '\x2f' + y + ">dt/<>dt<>dt/<".z();
                de += '<td class="' + ae("td_r") + '">' + int_to_dollars(dg[y][m][d]) + '</td></tr>';
            }
        }
    }
    de += '</tbody>';
    de += "\"=ssalc daeht<".z() + ae("fixedHeader") + '"><tr id="' + ae("latot_elbat_tdb".z()) + "\"=ssalc parwon 3=napsloc dt<>\"".z() + ae("td_r") + "\"=ssalc 3=napsloc dt<>rt<>rt/<>dt/<:DETCELLOC SEITNUOB LATOT>\";kcalb dilos xp1:pot-redrob\"=elyts \"".z() + ae("td_c") + "\"=di \"neerg:roloc\"=elyts \"".z() + ae("seitnuob_latot_tdb".z()) + '">' + int_to_dollars(df) + ">daeht/<>rt/<>dt/<".z();
    de += '</table>';
    de += '<br />';
    this.div.innerHTML = de;
    this.form = document.createElement('form');
    this.form.action = '';
    this.form.method = '';
    this.form.id = ad("lvb-mg-koobecaf".z());
    this.div.appendChild(this.form);
    this.button_close = document.createElement('button');
    this.button_close.type = 'button_close';
    this.button_close.id = ad('bvl_close');
    this.button_close.innerHTML = "CLOSE";
    this.form.appendChild(this.button_close);
    var dn = GM_getValue(ad(Y + "tsiLlatoTyaDytnuoB".z()), "40|40").split('\x7c');
    if (parseInt(dn[1]) < 35) dn[1] = 35;
    GM_setValue(ad(Y + "etats_tsiLlatoTyaDytnuoB".z()), "max");
    this.divFloat = au.createFloatingDiv(this.width, dn[0], dn[1], 'left', ">1h/<slatoT yliaD ytnuoB>1h<".z(), "tsiLlatoTyaDytnuoB".z(), true, true, true);
    this.divFloat.appendChild(this.div);
    this.button_close.addEventListener('click', this.eventListener(), true);
    this.form.addEventListener('submit', this.eventListener(), true);
};
BountyDTotals.pausingVicTotals = function () {
    pausingVicTotals = 1;
};
BountyDTotals.eventListener = function () {
    var dd = this;
    return function (de) {
        de.preventDefault();
        dd.div.style.display = 'none';
        dd.div.parentNode.parentNode.removeChild(dd.div.parentNode);
        pausingVicTotals = 0;
    };
};
BountyDTotals.show = function () {
    this.pausingVicTotals();
    var dd = document.getElementById(ad('BDTDiv'));
    if (!dd) {
        this.init();
        this.build();
        dd = document.getElementById(ad('BDTDiv'));
    }
    if (dd) {
        var de = GM_getValue(ad(Y + "etats_tsiLlatoTyaDytnuoB".z()), "max");
        if (de == "min") dd.style.display = 'none';
        else dd.style.display = 'block';
    }
};
var Enforcer = GM_getValue(ad(Y + 'Enforcers'), '').split('\x7c');
if (Enforcer == '') {
    Enforcer = ''.split('\x7c');
}
aQ.Gt_e = Gt_e;

function Gt_e() {
    if (!ag.AcceptGifts) {
        if (boss.actions.gifts) delete boss.actions.gifts;
        return;
    }
    if (boss.actions.gifts) return;
    var dd = eval(GM_getValue(ad(Y + 'NextGift'), '({})'));
    if (!dd['NextTime']) {
        var de = new Object();
        de.page = 'mob';
        de.message = "...stfig gnikcehC".z();
        de.func = 'Gt_go';
        de.time = Page.now;
        boss.actions.gifts = de;
        return;
    }
}
aQ.Bt_e = Bt_e;

function Bt_e() {
    if (!ag.AcceptBoosts) {
        if (boss.actions.boosts) delete boss.actions.boosts;
        return;
    }
    var dd, de;
    if ((Page.c_page == 'jobs') || (Page.c_page == '')) {
        var df = Utils.getElementsByXPath("\"=di@[vid//.".z() + w + 'content"]')[0];
        if (df.innerHTML.match(/You have received an energy boost/i)) {
            if (!df.innerHTML.match(/You must wait/i)) {
                var dg = new Object();
                dg.page = 'accept_boost';
                dg.message = "...teg ot gniog ,tsoob evaH".z();
                dg.params = ['Bt_do'];
                dg.func = 'Bt_go';
                dg.time = Page.now;
                boss.actions.boosts = dg;
            } else {
                var time = document.getElementById(w + 'boost_timer');
                if (time) {
                    time = time.innerHTML.split('\x3a');
                    dd = parseInt(Page.now);
                    if (time.length > 2) {
                        if (!isNaN(time[0]) && !isNaN(time[1]) && !isNaN(time[2])) {
                            dd += parseInt(time[0]) * 60 * 60;
                            dd += parseInt(time[1]) * 60;
                            dd += parseInt(time[2]) + 30;
                        }
                    } else if (time.length > 1) {
                        if (!isNaN(time[0]) && !isNaN(time[1])) {
                            dd += parseInt(time[0]) * 60;
                            dd += parseInt(time[1]) + 30;
                        }
                    } else {
                        if (!isNaN(time[0])) {
                            dd += parseInt(time[0]) + 30;
                        }
                    }
                    if (dd != parseInt(Page.now)) {
                        if (ag.AcceptPreBoosts) {
                            de = GM_getValue(ad(Y + 'LastBoost'), 0);
                            if (((Page.now - de) > (3 * 60)) || ((dd - Page.now) >= (3 * 60))) {
                                dd -= (3 * 60);
                            }
                        }
                        GM_setValue(ad(Y + 'NextBoost'), dd);
                        var dh = new Object();
                        dh.page = 'mob';
                        dh.message = "...stsoob kcehC".z();
                        dh.func = 'Bt_go';
                        dh.time = dd;
                        boss.actions.boosts = dh;
                    }
                }
            }
        }
    }
    if ((Page.c_page == 'mob') && (Page.c_php == "php.tsoob_tpecca".z())) {
        var di = Utils.getElementsByXPath("\"=di@[vid//.".z() + w + "]\"stsooB ygrenE dneS\"=eulav@ dna \"nottub\"=epyt@[tupni//./]\"tnetnoc".z());
        if (di[0]) {
            if (!boss.actions.Sendboosts) {
                var dj = new Object();
                dj.page = 'accept_boost';
                dj.message = "...stsoob dnes ot gnioG".z();
                dj.params = ['Bt_Send'];
                dj.func = 'Bt_go';
                dj.time = Page.now;
                boss.actions.Sendboosts = dj;
                return;
            }
        }
    }
    if (boss.actions.boosts) return;
    dd = GM_getValue(ad(Y + 'NextBoost'), Page.now);
    if ((Page.c_page == 'mob') && (Page.c_php == "php.tsoob_tpecca".z())) {
        var time = Utils.getElementsByXPath("\"=di@[vid//.".z() + w + "p/vid/]\"tnetnoc".z())[0];
        if (time.innerHTML.match(/accepted the maximum amount of boost/)) {
            var dk = time.innerHTML.match(/([0-9]*?) hour/);
            var dl = time.innerHTML.match(/([0-9]*?) minute/);
            var dn = time.innerHTML.match(/([0-9]*?) second/);
            dd = parseInt(Page.now);
            if (dk) {
                dd += parseInt(dk[1]) * 60 * 60;
            }
            if (dl) {
                dd += parseInt(dl[1]) * 60;
            }
            if (dn) {
                dd += parseInt(dn[1]) + 30;
            }
            if (dd == parseInt(Page.now)) dd += 60 * 60 * 2;
            GM_setValue(ad(Y + 'NextBoost'), dd);
            de = GM_getValue(ad(Y + 'LastBoost'), 0);
            if (((Page.now - de) > (3 * 60)) && ag.AcceptPreBoosts) {
                if ((dd - Page.now) <= (3 * 60)) {
                    var dp = new Object();
                    dp.page = 'accept_boost';
                    dp.message = "...tsoob-erp gnitteG".z();
                    dp.params = ['Bt_do'];
                    dp.func = 'Bt_go';
                    dp.time = dd;
                    boss.actions.boosts = dp;
                    return;
                } else {
                    dd -= (3 * 60);
                    GM_setValue(ad(Y + 'NextBoost'), dd);
                }
            }
        } else {
            var dq = Utils.getElementsByXPath("\"=di@[vid//.".z() + w + "]\"timbus\"=epyt@[tupni/../]\"mrifnoc_tsoob_tpecca\"=eulav@ dna \"noitca\"=eman@[tupni//./]\"tnetnoc".z());
            if (dq.length > 0) {
                var dg = new Object();
                dg.page = 'accept_boost';
                dg.message = "...tsoob gnitteG".z();
                dg.params = ['Bt_do'];
                dg.func = 'Bt_go';
                dg.time = dd;
                boss.actions.boosts = dg;
                return;
            } else {
                dd = parseInt(Page.now) + 60 * 60 * 2;
                GM_setValue(ad(Y + 'NextBoost'), dd);
            }
        }
    }
    var dr = new Object();
    dr.page = 'mob';
    dr.message = "...stsoob gnikcehC".z();
    dr.func = 'Bt_go';
    dr.time = dd;
    boss.actions.boosts = dr;
}
aQ.Bt_go = Bt_go;

function Bt_go(dd, de) {
    if (Page.c_page == 'mob') {
        if (Page.c_php != "php.tsoob_tpecca".z()) {
            var df = new Object();
            df.message = "....egap tsoob ot gnioG".z();
            df.page = 'accept_boost';
            if (dd) {
                df.params = dd;
                if (dd[0]) df.func = dd[0];
            }
            df.time = Page.now;
            boss.actions.boosts = df;
            boss.save();
            var dg;
            if (Page['accept_boost']) {
                dg = Page['accept_boost'];
            } else {
                dg = GM_getValue(ad(Y + "tsoob_tpeccaL".z()), "php.tsoob_tpecca/bom/srawbom/moc.koobecaf.sppa//:ptth".z());
            }
            Timer.start(dg, ".....stsoob gnikcehC".z(), de, 'GoBoost', false);
        } else {
            if (dd) {
                if (dd[0] == 'Bt_do') {
                    Bt_do(dd, de);
                } else if (dd[0] == 'Bt_Send') {
                    Bt_Send(dd, de);
                }
            } else {
                var dg;
                if (Page['mob']) {
                    dg = Page['mob'];
                } else {
                    dg = GM_getValue(ad(Y + "tsoob_tpeccaL".z()), "/bom/srawbom/moc.koobecaf.sppa//:ptth".z());
                }
                Timer.start(dg, ".....stsoob gnikcehC-eR".z(), de, "tsooBkcehCoG".z(), false);
            }
        }
    } else {
        var dg;
        if (Page['accept_boost']) {
            dg = Page['accept_boost'];
        } else {
            dg = GM_getValue(ad(Y + "tsoob_tpeccaL".z()), "php.tsoob_tpecca/bom/srawbom/moc.koobecaf.sppa//:ptth".z());
        }
        Timer.start(dg, ".....stsoob gnikcehC".z(), de, 'GoBoost', false);
    }
}
aQ.Bt_do = Bt_do;

function Bt_do(dd, de) {
    de = de || 5;
    de = de - 2;
    if (de < 0) de = 0;
    var df = Utils.getElementsByXPath("\"=di@[vid//.".z() + w + "]\"timbus\"=epyt@[tupni/../]\"mrifnoc_tsoob_tpecca\"=eulav@ dna \"noitca\"=eman@[tupni//./]\"tnetnoc".z());
    if (df[0]) {
        Timer.start(df[0], "...tsoob gnitteG".z(), de, 'GetBoost', false, function () {
            GM_setValue(ad(Y + 'LastBoost'), Math.floor(new Date().getTime() / 1000));
        }, 1, 0);
        z(" ni ....tsoob gnitteG".z() + de, 2);
    } else {
        if (h) z(" ni ....tsoob gnitteg rorrE".z() + de, 2);
        S = false;
        setTimeout(MainStuff, 0);
    }
}
aQ.Bt_Send = Bt_Send;

function Bt_Send(dd, de) {
    de = de || 5;
    de = de - 2;
    if (de < 1) de = 1;
    var df = Utils.getElementsByXPath("\"=di@[vid//.".z() + w + "]\"stsooB ygrenE dneS\"=eulav@ dna \"nottub\"=epyt@[tupni//./]\"tnetnoc".z());
    if (df[0]) {
        Timer.start(df[0], "...stsoob gnidneS".z(), de, 'SendBoost', false);
        z(" ni ....stsoob gnidneS".z() + de, 2);
    } else {
        if (h) z(" ni ....tsoob gnidnes rorrE".z() + de, 2);
        S = false;
        setTimeout(MainStuff, 0);
    }
}
function cd() {
    this.name = 'Unknown';
    this.payout_min = 0;
    this.payout_max = 0;
    this.exp = 0;
    this.mobsters = 0;
    this.StartNow = false;
    this.RecruitNow = false;
    this.GetawayNow = false;
    this.GetawayTime = false;
    this.city = 'new_york';
    this.req_items = new Object();
    this.prep_items = new Object();
    this.payout_items = new Object();
    this.missing = false;
}
function ce() {
    var dd = eval(GM_getValue(ad(Y + 'Heists'), '({})'));
    for (var i in dd) {
        this[i] = dd[i];
    }
}
ce.prototype = new Object();
ce.prototype.save = function () {
    GM_setValue(ad(Y + 'Heists'), this.toSource());
};
ce.prototype.updateData = function () {
    if (Page.c_page == 'jobs') {
        for (var dd in this) {
            if (typeof this[dd] == 'object') {
                var de;
                if (Page.c_params['show_loc']) {
                    de = Page.c_params['show_loc'];
                } else {
                    de = Page.loc;
                }
                if (this[dd].city != de) continue;
            }
        }
        var df = document.getElementById(w + 'content');
        var divs;
        if (df) {
            df = df.getElementsByTagName('\x70');
            if (df) {
                var dg;
                for (var x = 0; x < df.length; x++) {
                    if (df[x].innerHTML.match(/Heists/)) {
                        dg = df[x].nextSibling.nextSibling;
                        break;
                    }
                }
                if (dg) divs = Utils.getElementsByXPath("])\"ataDwor\",ssalc@(sniatnoc[rt//.".z(), dg);
            }
        }
        if (divs) {
            for (var i = 0; i < divs.length; i++) {
                var dh = divs[i];
                var dd = new cd();
                var di = dh.getElementsByTagName('\x62')[0];
                dd.name = di.innerHTML;
                di = dh.innerHTML.match(/Payout:.*\$([0-9,]+) - \$([0-9,]+)/);
                if (di) {
                    dd.payout_min = parseInt(di[1].replace(/,/g, ''));
                    dd.payout_max = parseInt(di[2].replace(/,/g, ''));
                }
                di = dh.innerHTML.match(/Experience: \+(\d+)/);
                if (di) dd.exp = parseInt(di[1]);
                di = dh.innerHTML.match(/([0-9]+) hrs/);
                if (di) dd.MaxTime = parseInt(di) * 60 * 60;
                if (dh.innerHTML.match(/You do not/i)) dd.missing = true;
                dd.mobsters = 0;
                dd.energy = 0;
                dd.city = Page.loc;
                var dj = Utils.getElementsByXPath("])\"meti#\",ferh@(sniatnoc[a//.".z(), dh);
                if (dj) {
                    for (var j = 0; j < dj.length; j++) {
                        di = dj[j].href;
                        if (!di.match(/item_buy/)) {
                            di = di.match(/(jobs\/|stockpile\/|power_item|weapon|armor|vehicle|city\/).*?#(item_\d+)/);
                            var dk = di[2];
                            di = dj[j].nextSibling;
                            if (di && di.tagName == 'SPAN' && (di = di.innerHTML.match(/(use |\+)?(\d+)(%)?/))) {
                                if (di[1] == 'use ') dd.prep_items[dk] = parseInt(di[2]);
                                else if (di[1] == '\x2b') dd.payout_items[dk] = parseInt(di[2]);
                                else if (di[3] == '\x25') dd.payout_items[dk] = 1;
                                else dd.req_items[dk] = parseInt(di[2]);
                            } else {
                                dd.req_items[dk] = 1;
                            }
                        }
                    }
                }
                di = Utils.getElementsByXPath("]\"diboj\"=eman@[tupni//.".z(), dh.nextSibling.nextSibling)[0];
                if (di) {
                    this[di.value] = dd;
                    var dl = Utils.getElementsByXPath("]\"ssergorP nI\"=eulav@ dna \"timbus\"=epyt@[tupni//.".z(), dh.nextSibling.nextSibling)[0];
                    if (!dl) {
                        var temp = Utils.getElementsByXPath("]\"boJ tratS\"=eulav@ dna \"timbus\"=epyt@[tupni//.".z(), dh.nextSibling.nextSibling)[0];
                        if (temp) {
                            temp = Utils.getElementsByXPath("\"=di@ dna \"xoByalpsiDedih\"=ssalc@[vid//.".z() + w + 'recruit_' + di.value + '_wrapper"]', dh.nextSibling.nextSibling)[0];
                            if (!temp) {
                                if (ag.heists[di.value] && ag.heists[di.value].DoIt) {
                                    aN = true;
                                    P();
                                }
                            } else {
                                ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
                                if (ag.heists[di.value]) ag.heists[di.value].DisplayRecruit = true;
                                GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
                                this[di.value].StartNow = true;
                            }
                        } else {
                            temp = Utils.getElementsByXPath("]\"boJ hsiniF\"=eulav@ dna \"timbus\"=epyt@[tupni//.".z(), dh.nextSibling.nextSibling)[0];
                            if (temp) {
                                temp = Utils.getElementsByXPath("\"=di@ dna \"xoByalpsiDedih\"=ssalc@[vid//.".z() + w + 'recruit_' + di.value + '_wrapper"]', dh.nextSibling.nextSibling)[0];
                                if (!temp) {
                                    if (ag.heists[di.value] && ag.heists[di.value].DoIt) {
                                        aN = true;
                                        P();
                                    }
                                } else this[di.value].GetawayNow = true;
                            } else {}
                        }
                    } else {
                        var temp = Utils.getElementsByXPath("_tiurcer\"=eman@[tupni//.".z() + di.value + "]\"woN tiurceR\"=eulav@ dna \"".z(), dh.nextSibling.nextSibling)[0];
                        if (temp) {
                            var help = document.getElementById(w + "_eton_pleh_boj_emit".z() + di.value);
                            if (help) {
                                var dn = help.innerHTML.match(/([0-9]*?) of ([0-9]*?) recruits/);
                                if (dn[1] < dn[2]) this[di.value].RecruitNow = true;
                                this[di.value].helperNow = dn[1];
                                this[di.value].helperMax = dn[2];
                            }
                            var dp = document.getElementById(w + "_kcolc_boj_emit".z() + di.value);
                            if (dp) {
                                var time = dp.innerHTML;
                                if (time.match(/([0-9]*?):([0-9]*?)/)) {
                                    var dq = time.split('\x3a');
                                    if (!dq[2]) {
                                        this[di.value].GetawayTime = Page.now + ((parseInt(dq[0]) + 2) * 60);
                                    } else {
                                        this[di.value].GetawayTime = Page.now + ((parseInt(dq[0]) * 60 * 60) + ((parseInt(dq[1]) + 2) * 60));
                                    }
                                    if ((parseInt(this[di.value].GetawayTime) - Page.now) > ((parseInt(this[di.value].MaxTime) * 5) / 10)) {
                                        if ((this[di.value].helperMax - this[di.value].helperNow) > 0) {
                                            var dr = parseInt(this[di.value].MaxTime) / 10;
                                            this[di.value].GetawayTime -= dr * (parseInt(this[di.value].helperMax) - parseInt(this[di.value].helperNow));
                                        }
                                    }
                                    if (boss.actions['heists' + di.value]) {
                                        boss.actions['heists' + di.value].time = this[di.value].GetawayTime;
                                        boss.save();
                                    }
                                } else {
                                    dp.addEventListener("detresnIedoNMOD".z(), function (ds) {
                                        this.removeEventListener("detresnIedoNMOD".z(), arguments.callee, true);
                                        var dt = ds.relatedNode.innerHTML.split('\x3a');
                                        if (!dt[2]) {
                                            heists[di.value].GetawayTime = Page.now + ((parseInt(dt[0]) + 2) * 60);
                                        } else {
                                            heists[di.value].GetawayTime = Page.now + ((parseInt(dt[0]) * 60 * 60) + ((parseInt(dt[1]) + 2) * 60));
                                        }
                                        if ((parseInt(heists[di.value].GetawayTime) - Page.now) > ((parseInt(heists[di.value].MaxTime) * 5) / 10)) {
                                            if ((parseInt(heists[di.value].helperMax) - parseInt(heists[di.value].helperNow)) > 0) {
                                                var du = parseInt(heists[di.value].MaxTime) / 10;
                                                heists[di.value].GetawayTime -= du * (parseInt(heists[di.value].helperMax) - parseInt(heists[di.value].helperNow));
                                            }
                                        }
                                        setTimeout(function () {
                                            GM_setValue(ad(Y + 'Heists'), heists.toSource());
                                        }, 0);
                                        if (boss.actions['heists' + di.value]) {
                                            boss.actions['heists' + di.value].time = heists[di.value].GetawayTime;
                                            setTimeout(function () {
                                                boss.save();
                                            }, 0);
                                        } else if (ag.heists[di.value] && ag.heists[di.value].DoIt) {
                                            var dv = new Object();
                                            dv.page = 'jobs';
                                            if (heists[di.value].name.match(/heist/i)) dv.message = "Doing " + heists[di.value].name + " getaway...";
                                            else dv.message = "Doing " + heists[dd].name + "...yawateg tsieh ".z();
                                            dv.func = 'jb_doheistStart';
                                            dv.queue = 'Heist';
                                            dv.params = [di.value, heists[di.value].name, heists[di.value].city, 'jb_doheistGetaway'];
                                            dv.time = heists[di.value].GetawayTime;
                                            boss.actions['heists' + di.value] = dv;
                                            setTimeout(function () {
                                                boss.save();
                                            }, 0);
                                        }
                                    }, true);
                                }
                            }
                        }
                    }
                }
            }
            this.save();
        }
    }
};

function he_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("he_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<)ATEB( secnereferP stsooB/stfiG/tsieH>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_eh".z()) + ">\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z());
    de.push('<tr id="' + ad("Heistlist") + ">rt/<>dt/<>2=napsloc dt<>dt/<:mrofrep ot stsieH>dt<>rt<>elbat<>2=napsloc dt<>\"".z());
    for (var df in heists) {
        if (typeof heists[df] == 'object') {
            de.push(">\"%06\"=htdiw dt<>dt/<>dt<>rt<".z());
            de.push("\"=rof lebal<".z() + ad("Heist" + df) + '">' + heists[df].name + ">dt<>dt/<>lebal/<".z());
            if (ag.heists[df] && ag.heists[df].DoIt) {
                de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("Heist" + df) + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
                de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("Heist" + df) + ">/\"0\"=eulav \"".z());
            } else {
                de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("Heist" + df) + ">/\"1\"=eulav \"".z());
                de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("Heist" + df) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
            }
            de.push('</td></tr>');
        }
    }
    de.push(">rt/<>dt/<>elbat/<".z());
    var value = ag.AcceptBoosts;
    de.push('<tr id="' + ad("acceptboost") + '"><td>');
    de.push("\"=rof lebal<".z() + ad("AcceptBoosts") + ">lebal/< :stsoob eviecer dna dnes yllacitamotuA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AcceptBoosts") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AcceptBoosts") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AcceptBoosts") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AcceptBoosts") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = ag.AcceptPreBoosts;
    de.push('<tr id="' + ad("tsooberptpecca".z()) + '"><td>');
    de.push("\"=rof lebal<".z() + ad("AcceptPreBoosts") + ">lebal/< :stsoob-erP tpecca yllacitamotuA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AcceptPreBoosts") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AcceptPreBoosts") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AcceptPreBoosts") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AcceptPreBoosts") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var dg = document.createElement('div');
    if (dg) dg.innerHTML = de.join('\n');
    var dh = document.getElementById(ae('PrefStuff'));
    if (dh) dh.appendChild(dg);
    var button = document.getElementById(ae('he_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_eh".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.he_pI = he_pI;
aP.he_pH = he_pH;

function he_pH(dd) {
    var de = false;
    for (var df in heists) {
        if (typeof heists[df] == 'object') {
            if (!ag.heists[df]) {
                ag.heists[df] = new Object();
                ag.heists[df].DoIt = false;
                ag.heists[df].DisplayRecruit = true;
            }
            var input = dd.elements.namedItem(ae('Heist' + df));
            if (ag.heists[df].DoIt != input.checked) {
                if (boss.actions['heists' + df]) delete boss.actions['heists' + df];
                if (boss.actions['doheistGo' + df]) delete boss.actions['doheistGo' + df];
                boss.save();
                ag.heists[df].DoIt = input.checked;
                de = true;
            }
        }
    }
    var input = dd.elements.namedItem(ae('AcceptBoosts'));
    if (ag.AcceptBoosts != input.checked) {
        if (boss.actions.boosts) delete boss.actions.boosts;
        ag.AcceptBoosts = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('AcceptPreBoosts'));
    if (ag.AcceptPreBoosts != input.checked) {
        if (boss.actions.boosts) delete boss.actions.boosts;
        ag.AcceptPreBoosts = input.checked;
        de = true;
    }
    return de;
}
function cf(dd) {
    ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
    if (ag.heists && ag.heists[dd]) ag.heists[dd].DisplayRecruit = false;
    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
    var temp = document.getElementById(ad('WarnHEIST' + dd));
    if (temp) temp.parentNode.removeChild(temp);
}
aQ.he_e = he_e;

function he_e() {
    if (typeof ag.heists == 'string') ag.heists = new Object();
    if (Page.c_page == 'jobs') {
        heists.updateData();
    }
    for (var dd in heists) {
        if (typeof heists[dd] == 'object') {
            if (ag.heists[dd] && ag.heists[dd].DoIt) {
                var temp = document.getElementById(ad('WarnHEIST' + dd));
                if (temp) temp.parentNode.removeChild(temp);
                if (heists[dd].missing) {
                    R(" eht rof meti deriuqer gnissiM".z() + heists[dd].name, 'WarnHEIST' + dd);
                    if (boss.actions['heists' + dd]) delete boss.actions['heists' + dd];
                    continue;
                }
                if (heists[dd] && (heists[dd].StartNow == true)) {
                    var de = new Object();
                    de.page = 'jobs';
                    if (heists[dd].name.match(/heist/i)) de.message = "Doing " + heists[dd].name + " ...";
                    else de.message = "Doing " + heists[dd].name + " heist...";
                    de.func = 'jb_doheistStart';
                    de.queue = 'Heist';
                    de.params = [dd, heists[dd].name, heists[dd].city, 'jb_doheist'];
                    de.time = Page.now;
                    boss.actions['heists' + dd] = de;
                } else if (heists[dd] && (heists[dd].RecruitNow == true)) {
                    var message = " eht gninnur era uoY>retnec<>rb<".z() + heists[dd].name + ' heist in ' + heists[dd].city + " dah uoy ,kcehc tsal tA>rb<>rb<yllaunam tiurcer ot deen uoy ,won roF  .srepleh rof moor llits si ereht tub ,".z() + heists[dd].helperNow + " fo xam a fo tuo ,srepleh ".z() + heists[dd].helperMax + '</center>';
                    if (heists[dd].GetawayTime) {
                        message += " ni trats lliw emit yawateG>retnec<>rb<".z() + aB(heists[dd].GetawayTime - Page.now) + '</center>';
                        var df = new Object();
                        df.page = 'jobs';
                        if (heists[dd].name.match(/heist/i)) df.message = "Doing " + heists[dd].name + " getaway...";
                        else df.message = "Doing " + heists[dd].name + "...yawateg tsieh ".z();
                        df.func = 'jb_doheistStart';
                        df.queue = 'Heist';
                        df.params = [dd, heists[dd].name, heists[dd].city, 'jb_doheistGetaway'];
                        df.time = heists[dd].GetawayTime;
                        boss.actions['heists' + dd] = df;
                    }
                    message += "<center><a id=\"" + ad(dd + "Notify") + ">retnec/<>a/<>tnof/<)em gnillet pots ...deifiton neeb ev'I(>1=ezis tnof<>\"".z();
                    if (ag.heists[dd] && ag.heists[dd].DisplayRecruit) {
                        R(message, 'WarnHEIST' + dd);
                    }
                    message = document.getElementById(ae(dd + 'Notify'));
                    if (message) message.addEventListener('click', function () {
                        cf(parseInt(af(this.id)));
                    }, true);
                } else if (heists[dd] && (heists[dd].GetawayNow == true)) {
                    var dg = new Object();
                    dg.page = 'jobs';
                    if (heists[dd].name.match(/heist/i)) dg.message = "Doing " + heists[dd].name + " getaway...";
                    else dg.message = "Doing " + heists[dd].name + "...yawateg tsieh ".z();
                    dg.func = 'jb_doheistStart';
                    dg.queue = 'Heist';
                    dg.params = [dd, heists[dd].name, heists[dd].city, 'jb_doheistGetaway'];
                    dg.time = Page.now;
                    boss.actions['heists' + dd] = dg;
                } else {
                    if (heists[dd] && heists[dd].GetawayTime) {
                        var dh = new Object();
                        dh.page = 'jobs';
                        if (heists[dd].name.match(/heist/i)) dh.message = "Doing " + heists[dd].name + " getaway...";
                        else dh.message = "Doing " + heists[dd].name + "...yawateg tsieh ".z();
                        dh.func = 'jb_doheistStart';
                        dh.queue = 'Heist';
                        dh.params = [dd, heists[dd].name, heists[dd].city, 'jb_doheistGetaway'];
                        dh.time = heists[dd].GetawayTime;
                        boss.actions['heists' + dd] = dh;
                    }
                }
            }
        }
    }
}
aQ.jb_doheist = jb_doheist;

function jb_doheist(dd, de) {
    de = de || 5;
    de = de - 2;
    if (de < 0) de = 0;
    var df = Utils.getElementsByXPath("\"=eulav@ dna \"diboj\"=eman@[tupni//".z() + dd[0] + "]\"timbus\"=epyt@[tupni/vid/../]\"".z());
    if (df[0]) {
        if (df[0].parentNode.className.match(/hideDisplayBox/i)) {
            if (boss.actions['heists' + dd[0]]) delete boss.actions['heists' + dd[0]];
            if (boss.actions['doheistGo' + dd[0]]) delete boss.actions['doheistGo' + dd[0]];
            boss.save();
            if (h) z(" ni ....neddih si xob )od( timbus tsieh -- rorrE".z() + de, 2);
            S = false;
            setTimeout(MainStuff, 0);
        } else {
            Timer.start(df[0], "Doing " + dd[1] + "...", de, 'heist', false);
            if (boss.actions['heists' + dd[0]]) delete boss.actions['heists' + dd[0]];
            if (boss.actions['doheistGo' + dd[0]]) delete boss.actions['doheistGo' + dd[0]];
            z("Doing " + dd[1] + " ni ... tsieh ".z() + de, 2);
        }
    } else {
        if (boss.actions['heists' + dd[0]]) delete boss.actions['heists' + dd[0]];
        if (boss.actions['doheistGo' + dd[0]]) delete boss.actions['doheistGo' + dd[0]];
        boss.save();
        if (h) z(" ni ....tsieh gniod rorrE".z() + de, 2);
        S = false;
        setTimeout(MainStuff, 0);
    }
}
aQ.jb_doheistGetaway = jb_doheistGetaway;

function jb_doheistGetaway(dd, de) {
    de = de || 5;
    de = de - 2;
    if (de < 0) de = 0;

    function df() {
        var dg = Utils.getElementsByXPath("\"=eulav@ dna \"diboj\"=eman@[tupni//".z() + dd[0] + "]\"timbus\"=epyt@[tupni/vid/../]\"".z());
        if (dg[0]) {
            if (dg[0].parentNode.className.match(/hideDisplayBox/i)) {
                if (boss.actions['heists' + dd[0]]) delete boss.actions['heists' + dd[0]];
                if (boss.actions['doheistGo' + dd[0]]) delete boss.actions['doheistGo' + dd[0]];
                boss.save();
                if (h) z(" ni ....neddih si xob )yawateg( timbus tsieh -- rorrE".z() + de, 2);
                S = false;
                setTimeout(MainStuff, 0);
            } else {
                Timer.start(dg[0], "Doing " + dd[1] + "...", 0, "yawateg_tsieh".z(), false);
                if (boss.actions['heists' + dd[0]]) delete boss.actions['heists' + dd[0]];
                if (boss.actions['doheistGo' + dd[0]]) delete boss.actions['doheistGo' + dd[0]];
                z("Doing " + dd[1] + " ni ...yawateg tsieh ".z() + de, 2);
            }
        } else {
            if (boss.actions['heists' + dd[0]]) delete boss.actions['heists' + dd[0]];
            if (boss.actions['doheistGo' + dd[0]]) delete boss.actions['doheistGo' + dd[0]];
            boss.save();
            if (h) z(" ni ....yawateg tsieh gniod rorrE".z() + de, 2);
            S = false;
            setTimeout(MainStuff, 0);
        }
    }
    Timer.start(df, "Doing " + dd[1] + "...", de, "yawateg_tsieh".z(), false);
}
aQ.jb_doheistStart = jb_doheistStart;

function jb_doheistStart(dd, de) {
    if (Page.c_page == 'jobs') {
        if (Page.loc != dd[2]) {
            var df = new Object();
            if (heists[dd[0]]) {
                df.message = " od ot gnioG".z() + dd[1] + " (" + heists[dd[0]].city + ")....";
            } else {
                df.message = " od ot gnioG".z() + dd[1] + "....";
            }
            df.page = 'Job' + dd[2];
            df.Compare = 'jobs';
            df.params = dd;
            df.func = dd[3];
            df.queue = 'Heist';
            df.time = Page.now + de;
            boss.actions['doheistGo' + dd[0]] = df;
            boss.save();
            var dg;
            if (Page['\x4a' + dd[2]]) {
                dg = Page['\x4a' + dd[2]];
            } else {
                dg = GM_getValue(ad(Y + 'LJob' + dd[2]), "=col_wohs?/sboj/srawbom/moc.koobecaf.sppa//:ptth".z() + dd[2]);
            }
            Timer.start(dg, df.message, de, 'DoHeist', false);
        } else {
            if (dd[3] == 'jb_doheist') jb_doheist(dd, de);
            else if (dd[3] == 'jb_doheistGetaway') jb_doheistGetaway(dd, de);
            else {
                S = false;
                setTimeout(MainStuff, 0);
            }
        }
    } else {
        var dg;
        if (Page['\x4a' + dd[2]]) {
            dg = Page['\x4a' + dd[2]];
        } else {
            dg = GM_getValue(ad(Y + 'LJob' + dd[2]), "=col_wohs?/sboj/srawbom/moc.koobecaf.sppa//:ptth".z() + dd[2]);
        }
        Timer.start(dg, "...egap tsieh ot gnioG".z(), de, 'DoHeist', false);
    }
}
function cg() {
    var dd = eval(GM_getValue(ad(Y + 'jobs'), '({})'));
    if (GM_getValue(ad(Y + 'jobs'), '({})') == '({})') {
        if (!boss.actions.jobs_check) {
            var de = new Object();
            de.page = 'jobs';
            de.func = 'checkjobs';
            de.message = "...elbaliava sboj gnikcehC".z();
            de.time = Page.now + 5;
            boss.actions.jobs_check = de;
            return;
        }
    }
    for (var i in dd) {
        this[i] = dd[i];
    }
}
cg.prototype = new Object();
cg.prototype.save = function () {
    GM_setValue(ad(Y + 'jobs'), this.toSource());
};
cg.prototype.updateData = function () {
    if (Page.c_page == 'jobs') {
        for (var dd in this) {
            if (typeof this[dd] == 'object') {
                var de;
                if (Page.c_params['show_loc']) {
                    de = Page.c_params['show_loc'];
                } else {
                    de = Page.loc;
                }
                if (this[dd].city != de) continue;
            }
        }
        var df = document.getElementById(w + 'content');
        var divs;
        if (df) {
            df = df.getElementsByTagName('\x70');
            if (df) {
                var dg;
                for (var x = 0; x < df.length; x++) {
                    if (df[x].innerHTML.match(/Jobs/)) {
                        dg = df[x].nextSibling.nextSibling;
                        break;
                    }
                }
                if (dg) divs = Utils.getElementsByXPath("])\"ataDwor\",ssalc@(sniatnoc[rt//.".z(), dg);
            }
        }
        if (divs) {
            if (boss.actions["kcehcboJytic".z() + Page.loc]) delete boss.actions["kcehcboJytic".z() + Page.loc];
            for (var i = 0; i < divs.length; i++) {
                var dh = divs[i];
                var di = new cc();
                var dj = dh.getElementsByTagName('\x62')[0];
                di.name = dj.innerHTML;
                dj = dh.innerHTML.match(/Payout:.*\$([0-9,]+) - \$([0-9,]+)/);
                if (dj) {
                    di.payout_min = parseInt(dj[1].replace(/,/g, ''));
                    di.payout_max = parseInt(dj[2].replace(/,/g, ''));
                }
                dj = dh.innerHTML.match(/Experience: \+(\d+)/);
                if (dj) di.exp = parseInt(dj[1]);
                dj = dh.innerHTML.match(/Mobsters:\&nbsp;(\d+)/);
                if (dj) di.mobsters = parseInt(dj[1]);
                dj = dh.innerHTML.match(/Energy:\&nbsp;<span.*?>(\d+)<\/span>/);
                if (dj) di.energy = parseInt(dj[1]);
                di.city = Page.loc;
                var dk = Utils.getElementsByXPath("])\"meti#\",ferh@(sniatnoc[a//.".z(), dh);
                if (dk) {
                    for (var j = 0; j < dk.length; j++) {
                        dj = dk[j].href;
                        if (!dj.match(/item_buy/)) {
                            dj = dj.match(/(jobs\/|stockpile\/|power_item|weapon|armor|vehicle|city\/).*?#(item_\d+)/);
                            var dl = dj[2];
                            dj = dk[j].nextSibling;
                            if (dj.tagName == 'SPAN' && (dj = dj.innerHTML.match(/(use |\+)?(\d+)(%)?/))) {
                                if (dj[1] == 'use ') di.prep_items[dl] = parseInt(dj[2]);
                                else if (dj[1] == '\x2b') di.payout_items[dl] = parseInt(dj[2]);
                                else if (dj[3] == '\x25') di.payout_items[dl] = 1;
                                else di.req_items[dl] = parseInt(dj[2]);
                            } else {
                                di.req_items[dl] = 1;
                            }
                        }
                    }
                }
                dj = Utils.getElementsByXPath("]\"diboj\"=eman@[tupni//.".z(), dh)[0];
                if (dj) this[dj.value] = di;
            }
            this.save();
        }
    }
};
aQ.hE_e = hE_e;

function hE_e() {
    var dd = eval(GM_getValue(ad("yfidoMnamuHboJ".z()), '({})'));
    for (var x in boss.actions) {}
}
aQ.jb_e = jb_e;

function jb_e() {
    if (boss.job_income == undefined) boss.job_income = 0;
    var dd = new cg();
    if (Page.c_page == 'jobs') {
        dd.updateData();
    } else if (boss.new_level) {
        if (ag.newLevelJbCheck) {
            var de = new Object();
            de.page = 'jobs';
            de.func = 'checkjobs';
            de.message = "...elbaliava sboj wen gnikcehC".z();
            de.time = Page.now + Math.floor(Math.random() * 31);
            boss.actions.jobs_check = de;
            return;
        }
    }
    var df = ag.job;
    var message;
    switch (df) {
    case 'none':
        if (boss.actions.jobs) delete boss.actions.jobs;
        if (boss.actions.dojobGo) delete boss.actions.dojobGo;
        boss.job_income = 0;
        bf.update();
        return;
    case 'payout':
        df = jobs_selectJob(dd, false);
        if (!df) message = ".boj yna mrofrep ton nac uoY".z();
        break;
    case 'exp':
        df = jobs_selectJob(dd, true);
        if (!df) message = ".boj yna mrofrep ton nac uoY".z();
        break;
    default:
        if (!jobs_canDoJob(dd, dd[df])) {
            message = "' boj eht mrofrep ton nac uoY".z() + dd[df].name + "\x27";
            df = 0;
            break;
        }
        var dg;
        if (dg = jobs_needPrepJob(dd, df)) {
            if (!jobs_canDoJob(dd, dd[dg])) {
                message = "' boj yrotaraperp eht mrofrep ton nac uoY".z() + dd[dg].name + "' for '" + dd[df].name + "\x27";
                df = 0;
                break;
            } else {
                jobs_updateIncome(df);
                df = dg;
            }
        } else jobs_updateIncome(df);
        break;
    }
    if (df) if (dd[df].city == undefined) df = 0;
    if (!df) {
        var dh = document.getElementById(ae('scripterror'));
        if (dh) dh.innerHTML = '<center>' + message + ">retnec/<>rb<>rb<".z();
        if (boss.actions.jobs) delete boss.actions.jobs;
        if (boss.actions.dojobGo) delete boss.actions.dojobGo;
        boss.job_income = 0;
        bf.update();
        return;
    }
    if (boss.actions.jobs) delete boss.actions.jobs;
    if (boss.actions.dojobGo) delete boss.actions.dojobGo;
    var di = new Object();
    di.page = 'jobs';
    di.message = "Doing " + dd[df].name + "...";
    di.func = 'jb_dojobStart';
    di.params = [df, dd[df].name, dd[df].city];
    var dj;
    if (boss.type == 'Insomniac') {
        dj = 240;
    } else {
        dj = 300;
    }
    if (ag.insider) {
        dj = Math.ceil(dj * 0.9);
    }
    di.time = (Page.now + (dd[df].energy - boss.energy) * dj);
    if (boss.energy_time) {
        di.time -= (di.time - boss.energy_time) % dj;
    }
    di.time += (ag.jobdelay * 60) + ay(15, 10, 10);
    boss.actions.jobs = di;
}
aQ.jb_dojobStart = jb_dojobStart;

function jb_dojobStart(dd, de) {
    if (Page.c_page == 'jobs') {
        if (Page.loc != dd[2]) {
            var df = new cg();
            var dg = new Object();
            dg.message = " od ot gnioG".z() + dd[1] + " (" + df[dd[0]].city + ")....";
            dg.page = 'Job' + dd[2];
            dg.Compare = 'jobs';
            dg.params = dd;
            dg.func = 'jb_dojob';
            dg.time = Page.now + de;
            boss.actions.dojobGo = dg;
            boss.save();
            var dh;
            if (Page['\x4a' + dd[2]]) {
                dh = Page['\x4a' + dd[2]];
            } else {
                dh = GM_getValue(ad(Y + 'LJob' + dd[2]), "=col_wohs?/sboj/srawbom/moc.koobecaf.sppa//:ptth".z() + dd[2]);
            }
            Timer.start(dh, dg.message, de, 'DoJob', false);
        } else {
            jb_dojob(dd, de);
        }
    }
}
function jobs_updateIncome(dd) {
    if (!dd) {
        boss.job_income = 0;
        bf.update();
        return;
    }
    var de = jobs_payRatio(dd);
    var df;
    switch (boss.type) {
    case 'Insomniac':
        df = 15;
        break;
    case 'Tycoon':
        df = 10.8;
        break;
    default:
        df = 12;
        break;
    }
    if (boss.job_income != Math.floor(df * de)) {
        boss.job_income = Math.floor(df * de);
        bf.update();
    }
}
function jobs_canDoJob(dd, de) {
    var df = true;
    var dg = true;
    for (var dh in de.req_items) {
        if (!cb[dh] || (de.req_items[dh] > cb[dh])) {
            df = false;
            for (var di in dd) {
                if (typeof dd[di] == 'object') if (dd[di].payout_items[dh]) {
                    df = true;
                    break;
                }
            }
            if (df == false) {
                if ((dh != 'item_112') && itemlist[dh] && itemlist[dh].stocktype && (itemlist[dh].stocktype != 'power_item')) {
                    df = true;
                }
            }
        }
    }
    for (var dh in de.prep_items) {
        if (!cb[dh] || (de.prep_items[dh] > cb[dh])) {
            dg = false;
            for (var di in dd) {
                if (typeof dd[di] == 'object') if (dd[di].payout_items[dh]) {
                    dg = true;
                    break;
                }
            }
            if (dg == false) {
                if ((dh != 'item_112') && itemlist[dh] && itemlist[dh].stocktype && (itemlist[dh].stocktype != 'power_item')) {
                    dg = true;
                }
            }
        }
    }
    if ((df == false) || (dg == false)) return false;
    if (de.mobsters > boss.mobsters) {
        return false;
    }
    if (de.energy > boss.max_energy) {
        return false;
    }
    return true;
}
function jobs_needPrepJob(dd, de) {
    for (var df in dd[de].prep_items) {
        if (!cb[df] || (dd[de].prep_items[df] > cb[df])) {
            for (var dg in dd) {
                if (typeof dd[dg] == 'object') if (dd[dg].payout_items[df]) return dg;
            }
        }
    }
    for (var df in dd[de].req_items) {
        if (!cb[df] || (dd[de].req_items[df] > cb[df])) {
            for (var dg in dd) {
                if (typeof dd[dg] == 'object') if (dd[dg].payout_items[df]) return dg;
            }
        }
    }
    return 0;
}
function jobs_payRatio(dd, de) {
    if (!de) de = new cg();
    var df = de[dd].energy + 0.0;
    for (var dg in de[dd].prep_items) {
        if (itemlist[dg]) {
            if (itemlist[dg].energy_per_unit) {
                df += de[dd].prep_items[dg] * itemlist[dg].energy_per_unit;
            }
        } else df += 99999;
    }
    df = (de[dd].payout_min + de[dd].payout_max) / df;
    return df / 2;
}
function jobs_selectJob(dd, de) {
    var df = 0;
    var dg = 0;
    var dh = 0;
    var di = 0;
    var dj;
    var dk;
    for (dj in dd) {
        if (!dd[dj].name) continue;
        if (!jobs_canDoJob(dd, dd[dj])) continue;
        var dl = 0.0 + dd[dj].exp / dd[dj].energy;
        var dn = jobs_payRatio(dj, dd);
        if (de) {
            if ((dl < dg) || (dl == dg && dn < df)) continue;
        } else {
            if ((dn < df) || (dn == df && dl < dg)) continue;
        }
        var dp;
        if (dp = jobs_needPrepJob(dd, dj)) {
            if (!jobs_canDoJob(dd, dd[dp])) continue;
            else dh = dp;
        } else dh = dj;
        di = dj;
        df = dn;
        dg = dl;
    }
    jobs_updateIncome(di);
    return dh;
}
aQ.jb_dojob = jb_dojob;

function jb_dojob(dd, de) {
    if (isNaN(de)) de = 5;
    de = de - 2;
    if (de < 0) de = 0;
    var df = new cg();
    var dg = 1;
    if (ag.ManyJobs) {
        var dh;
        if (boss.type == 'Insomniac') {
            dh = 240;
        } else {
            dh = 300;
        }
        if (ag.insider) {
            dh = Math.ceil(dh * 0.9);
        }
        var di = Math.ceil((ag.jobdelay * 60) / dh);
        var dj = (boss.energy - di);
        if (dj > 0) dg = Math.floor(dj / df[dd[0]].energy);
        if (dg < 1) dg = 1;
        var dk = Utils.getElementsByXPath("\"=eulav@ dna \"diboj\"=eman@[tupni//".z() + dd[0] + "tceles/../]\"".z());
        if (dk[0]) {
            var input = document.createElement('input');
            input.name = 'count';
            input.type = 'text';
            input.setAttribute('maxlength', '\x33');
            input.setAttribute('size', '\x33');
            input.value = dg;
            dk[0].parentNode.insertBefore(input, dk[0]);
            dk[0].parentNode.removeChild(dk[0]);
        } else {
            dk = Utils.getElementsByXPath("\"=eulav@ dna \"diboj\"=eman@[tupni//".z() + dd[0] + "]\"tnuoc\"=eman@[tupni/../]\"".z());
            if (dk[0]) dk[0].value = dg;
        }
    }
    var dl = Utils.getElementsByXPath("\"=eulav@ dna \"diboj\"=eman@[tupni//".z() + dd[0] + "]\"timbus\"=epyt@[tupni/../]\"".z());
    var dn = Utils.getElementsByClassName('missingItem', dl[0].parentNode.parentNode.parentNode);
    if (dn.length) {
        var dp = dn[0].href.split(/item_buy_.*?_/)[1];
        dp = 'item_' + dp;
        if ((dp != 'item_112') && itemlist[dp] && itemlist[dp].stocktype && (itemlist[dp].stocktype != 'power_item')) {
            var dq = parseInt(itemlist[dp].price) * parseInt(1);
            if (itemlist[dp].needs != 'Nothing') {
                var dr = (1 - parseInt(cb[itemlist[dp].needs]));
                if (parseInt(dr) > 0) {
                    dq += (parseInt(itemlist[itemlist[dp].needs].price) * parseInt(dr));
                }
            }
            if (parseInt(dq) > parseInt(boss.cash)) {
                if (parseInt(dq) > (parseInt(boss.cash) + parseInt(boss.bank_cash))) {
                    R(".yllacitamotua demrofrep eb lliw sboj erofeb od ot boj wen a kcip ot deen ll'uoY>rb<>rb<.sksat rehto htiw gniunitnoc dna 'enoN' ot secnereferp boj gnitteS>rb<>rb<.dedeen )s(meti eht esahcrup ot yenom hguone evah t'nod uoy dna ,od ot t'naw uoy boj eht rof )s(meti deriuqer eht evah ton od uoY".z(), "qeRerPgnissiMboJ".z(), 1);
                    ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
                    ag.job = 'none';
                    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
                    Timer.start(function () {
                        P();
                    }, "...egap gnidaoler dna sboj gnitteseR".z(), 5, 'jobReload', false);
                    z("...egap gnidaoler dna sboj gnitteseR ...yenom hguone toN".z(), 2);
                    return;
                }
            }
            buystockpile([dp, 1, ag.timerdelay, itemlist[dp].stocktype, false], " a tsael ta esahcrup ot elba eb ot deen uoY>rb<>rb<.boj siht ot kcab hctiws nac uoy neht ,smeti eseht esahcrup ot droffa nac uoy litnu od ot boj rehtona kcip ot deen ll'uoY".z() + itemlist[dp].name + ".)dedeen eb yam erom( ".z());
        } else {
            R(".yllacitamotua demrofrep eb lliw sboj erofeb od ot boj wen a kcip ot deen ll'uoY>rb<>rb<.sksat rehto htiw gniunitnoc dna 'enoN' ot secnereferp boj gnitteS>rb<>rb<.desahcrup ro/dna enod eb ton nac etisiuqererp eht dna ,od ot t'naw uoy boj eht rof )s(meti deriuqer eht evah ton od uoY".z(), "qeRerPgnissiMboJ".z(), 1);
            ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
            ag.job = 'none';
            GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
            Timer.start(function () {
                P();
            }, "...egap gnidaoler dna sboj gnitteseR".z(), 5, 'jobReload', false);
            z("...egap gnidaoler dna sboj gnitteseR".z(), 2);
        }
        return;
    }
    for (var ds in df[dd[0]].prep_items) {
        if (cb[ds]) cb[ds] -= df[dd[0]].prep_items[ds];
        GM_setValue(ad(Y + 'inventory'), cb.toSource());
    }
    function dt() {
        if (ag.bank_active) {
            var du = new cg();
            if (du[dd[0]].payout_min > 0) {
                var dv = new Object();
                dv.message = "...knab eht ot gnioG".z();
                dv.page = 'bank';
                dv.func = 'bk_deposit';
                dv.params = [];
                dv.time = 1;
                boss.actions.bank = dv;
            }
        }
        z("Doing " + dd[1] + "\x20" + dg + " ni ...semit ".z() + de, 2);
    }
    Timer.start(dl[0], "Doing " + dd[1] + "\x20" + dg + " times...", ay(de, 2, 1), 'job', false, dt, 1, 0);
}
function jb_pI(dd) {
    var de = new cg();
    var df = new Array();
    df.push('<div id="' + ad("jb_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP boJ>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_bj".z()) + "\"=di rt<>\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z() + ad("joblist") + "\"=rof lebal<>\"%08\"=htdiw dt<>\"".z() + ad("joblist") + "\"=eman tceles<>dt<>dt/<>lebal/< :mrofrep ot boJ>\"".z() + ae("joblist") + '">');
    df.push("\"enon\"=eulav noitpo<".z());
    if (ag.job == 'none') df.push("\"detceles\"=detceles ".z());
    df.push(">noitpo/<enoN>".z());
    df.push("\"tuoyap\"=eulav noitpo<".z());
    if (ag.job == 'payout') df.push("\"detceles\"=detceles ".z());
    df.push("\"pxe\"=eulav noitpo<>noitpo/<ygrene/tuoyap tseB>".z());
    if (ag.job == 'exp') df.push("\"detceles\"=detceles ".z());
    df.push(">noitpo/<ygrene/ecneirepxe tseB>".z());
    for (var dg in de) {
        if (de[dg].name) {
            df.push("\"=eulav noitpo<".z() + dg + '\x22');
            if (ag.job == dg) df.push(" \"detceles\"=detceles ".z());
            df.push('\x3e' + de[dg].name);
            df.push('</option>');
        }
    }
    df.push("\"=di rt<>rt/<>dt/<>tceles/<".z() + ad("JobDelay") + '"></td><td>');
    df.push("\"=rof lebal<".z() + ad("jobdelay") + ">lebal/<)setunim( :yb boj a gniod yaleD>\"".z());
    df.push('</td><td>');
    df.push("\"=eman \"txet\"=epyt tupni<".z() + ae("jobdelay") + " \"5\"=ezis \"5\"=htgnelxam \"".z());
    var dh = ag.jobdelay;
    df.push('value="' + dh + '">');
    df.push('</td></tr>');
    df.push('<tr id="' + ad("manyjobs") + '"><td>');
    var value = ag.ManyJobs;
    df.push("\"=rof lebal<".z() + ad("ManyJobs") + ">lebal/< :emit eno ta ygrene ruoy lla esU>\"".z());
    df.push('</td><td>');
    if (value) {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ManyJobs") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ManyJobs") + ">/\"0\"=eulav \"".z());
    } else {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ManyJobs") + ">/\"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ManyJobs") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    df.push('</td></tr>');
    df.push('<tr id="' + ad("kcehcbjlevelwen".z()) + '"><td>');
    var value = ag.newLevelJbCheck;
    df.push("\"=rof lebal<".z() + ad("newLevelJbCheck") + ">lebal/< :slevel wen ta elbaliava sboj wen rof kcehC>\"".z());
    df.push('</td><td>');
    if (value) {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("newLevelJbCheck") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("newLevelJbCheck") + ">/\"0\"=eulav \"".z());
    } else {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("newLevelJbCheck") + ">/\"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("newLevelJbCheck") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    df.push('</td></tr>');
    df.push(">rh<>vid/<>elbat/<".z());
    var di = document.createElement('div');
    if (di) di.innerHTML = df.join('\n');
    var dj = document.getElementById(ae('PrefStuff'));
    if (dj) dj.appendChild(di);
    var button = document.getElementById(ae('jb_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_bj".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.jb_pI = jb_pI;
aP.jb_pH = jb_pH;

function jb_pH(dd) {
    var de;
    var df = false;
    var dg = dd.elements.namedItem(ae('joblist'));
    de = dg.options[dg.selectedIndex].value;
    if (de != ag.job) {
        if (boss.actions.jobs) delete boss.actions.jobs;
        if (boss.actions.dojobGo) delete boss.actions.dojobGo;
        ag.job = de;
        df = true;
    }
    var input = parseInt(dd.elements.namedItem(ae('jobdelay')).value);
    if (!isNaN(input)) {
        if (ag.jobdelay != input) {
            ag.jobdelay = input;
            df = true;
        }
    }
    var input = dd.elements.namedItem(ae('ManyJobs'));
    if (ag.ManyJobs != input.checked) {
        ag.ManyJobs = input.checked;
        df = true;
    }
    var input = dd.elements.namedItem(ae('newLevelJbCheck'));
    if (ag.newLevelJbCheck != input.checked) {
        ag.newLevelJbCheck = input.checked;
        df = true;
    }
    return df;
}
function snd_pI(dd) {
    var de = new Array();
    var df = ag.pmobsound;
    de.push('<div id="' + ad("snd_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP dnuoS>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_dns".z()) + "\"=di rt<>rt/<>dt/<>retnec/<>tnof/<.snoisrev neewteb egnahc yllaitnetop ylno lliw dna tpircs eht ot lanretni era sdnuos desab emitkciuQ dna evaJ  .emit yna ta degnahc eb yam hcus sa dna ,srevres lanretxe no detsoh era tsil gniwollof eht no dedivorp cisum/sdnuos hsab hsalf ehT>1=ezis tnof<>retnec<>2=napsloc dt<>rt<>\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z() + ad("SndList") + "\"=rof lebal<>\"%08\"=htdiw dt<>\"".z() + ad("sndlist") + "\"=eman tceles<>dt<>dt/<>lebal/< :dedeen si noitnetta ssob bom nehw esu ot dnuoS>\"".z() + ae("sndlist") + '">');
    de.push("\"enon\"=eulav noitpo<".z());
    if (ag.sndid == 'none') de.push("\"detceles\"=detceles ".z());
    de.push(">noitpo/<enoN>".z());
    for (var dg = 0; dg < snds.length; dg++) {
        de.push("\"=eulav noitpo<".z() + snds[dg][0] + '\x22');
        if (ag.sndid == snds[dg][0]) de.push(" \"detceles\"=detceles ".z());
        de.push('\x3e' + snds[dg][0]);
        de.push('</option>');
    }
    de.push("\"=di rt<>rt/<>dt/<>tceles/<".z() + ad("PMobSound") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("pmobs") + ">lebal/<:retsboM esuaP eht htiw dnuos esU>\"".z());
    de.push('</td><td>');
    if (df) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("pmobs") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("pmobs") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("pmobs") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("pmobs") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("SndRepeat") + '"></td><td>');
    de.push("\"=rof lebal<".z() + ad("sndrepeat") + ">lebal/< :dnuos taeper ot semiT>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("sndrepeat") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    var dh = ag.sndrepeat;
    de.push('value="' + dh + '">');
    de.push("\"=di a<>retnec<>elbat/<>rt/<>dt/<".z() + ad("testsnd") + "\"=di a< ;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn& >a/<dnuoS tseT>\"".z() + ad("stopsnd") + ">rh<>vid/<>retnec/<>a/<tseT potS>\"".z());
    var di = document.createElement('div');
    if (di) di.innerHTML = de.join('\n');
    var dj = document.getElementById(ae('PrefStuff'));
    if (dj) dj.appendChild(di);
    var button = document.getElementById(ae('snd_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_dns".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
    button = document.getElementById(ae('testsnd'));
    if (button) button.addEventListener('click', function () {
        cur_f = Infinity;
        var temp = document.getElementById(ae('alertSound2'));
        if (temp) {
            temp.parentNode.removeChild(temp);
        }
        var dk = dd.form.elements.namedItem(ae('sndlist'));
        var dl = dk.options[dk.selectedIndex].value;
        if (dl != 'none') {
            alertSound(dl, dd.form.elements.namedItem(ae('sndrepeat')).value, true);
        }
    }, true);
    button = document.getElementById(ae('stopsnd'));
    if (button) button.addEventListener('click', function () {
        cur_f = Infinity;
        var temp = document.getElementById(ae('alertSound2'));
        if (temp) {
            temp.parentNode.removeChild(temp);
        }
    }, true);
}
aP.snd_pI = snd_pI;
aP.snd_pH = snd_pH;

function snd_pH(dd) {
    var de;
    var df = false;
    var dg = dd.elements.namedItem(ae('sndlist'));
    de = dg.options[dg.selectedIndex].value;
    if (de != ag.sndid) {
        if (de != 'none') {
            ag.alertsound = true;
        } else {
            ag.alertsound = false;
        }
        ag.sndid = de;
        df = true;
    }
    var dh = dd.elements.namedItem(ae('pmobs'));
    if (ag.pmobsound != dh.checked) {
        ag.pmobsound = dh.checked;
        df = true;
    }
    var input = parseInt(dd.elements.namedItem(ae('sndrepeat')).value);
    if (!isNaN(input)) {
        if (ag.sndrepeat != input) {
            ag.sndrepeat = input;
            df = true;
        }
    }
    return df;
}
function ch() {
    var dd = boss.cash;
    var de = document.forms[1].elements.namedItem("tnuoma_wardhtiw".z());
    var df = function () {
        var i, dj;
        var dk = this.value;
        if (!isNaN(dk)) {
            de.value = Math.max(0, dk - dd);
        }
    };
    var temp = document.getElementById(ae("latotderised".z()));
    if (temp) temp.parentNode.removeChild(temp);
    var dg = document.createElement('span');
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.style.marginBottom = '2px';
    input.addEventListener('keyup', df, true);
    var dh = document.createElement('label');
    dh.innerHTML = " :latoT hsaC deriseD".z();
    dh.style.marginLeft = input.style.marginBottom;
    dh.style.marginBottom = input.style.marginBottom;
    dh.style.fontWeight = 'normal';
    dh.style.color = 'white';
    var di = document.getElementById(w + 'content');
    if (di) {
        di.appendChild(dg);
        dg.appendChild(dh);
        dg.appendChild(input);
        dg.id = ad("latotderised".z());
        if (ag.bank_active_Any) {
            dg.innerHTML += ">retnec/<.hsac eht wardhtiw uoy erofeb ,erutaef siht ffo nrut ro ,tpircs esuap/elbasid ,hsac detcetorp rof tes evah uoy tnuoma yna neht hsac erom evah ot uoy gnisuac tnuoma na gniwardhtiw era uoy fI  !no denrut si hsac yna gnitisoped otuA>tnof/< !!!GNINRAW>der=roloc tnof<>retnec<>rb<".z();
        }
    }
}
aQ.bk_e = bk_e;

function bk_e() {
    var dd = 1;
    var de = boss.next_pay;
    switch (Page.c_page) {
    case 'bank':
        var df = Utils.getElementsByXPath("tupni/../]\"tisoped\"=eulav@ dna \"noitca\"=eman@[tupni//".z());
        if (df) {
            var dg = '';
            for (var j = 0; j < df.length; j++) {
                if (df[j].name && (df[j].name != "tnuoma_tisoped".z())) {
                    if (j != 0) {
                        dg += "\x26";
                    }
                    dg += df[j].name + "\x3d" + encodeURI(df[j].value);
                }
            }
            GM_setValue(ad(Y + "smaraPnottuBknab".z()), dg);
        }
        var dh = Utils.getElementsByClassName('myBalance')[0];
        if (dh) {
            var di = dh.innerHTML.match(/\$([0-9,]+)/)[1];
            di = di.replace(/,/g, '');
            if (isNaN(parseInt(di))) {
                boss.bank_cash = 0;
            } else {
                boss.bank_cash = parseInt(di);
            }
            bf.update();
        }
        ch();
        break;
    case 'city':
        var dj = document.getElementById(w + "nwodtnuoc_hsac_ruc".z());
        if (dj) {
            var time = dj.innerHTML;
            if (time) {
                boss.next_pay = Page.now + 60 * (parseInt(time) + 1);
            } else {
                boss.next_pay = Page.now + 3600;
            }
        } else boss.next_pay = Page.now + 3600;
        if (de == undefined) {
            de = boss.next_pay;
        }
        break;
    case 'hospital':
        var dh = Utils.getElementsByXPath("\"=di@[naps//".z() + w + "]\"ecnalab_ruc".z())[0];
        if (dh) {
            var di = dh.innerHTML.match(/\$([0-9,]+)/)[1];
            di = di.replace(/,/g, '');
            if (isNaN(parseInt(di))) {} else {
                boss.bank_cash = parseInt(di);
                bf.update();
            }
        }
        break;
    default:
        break;
    }
    if (boss.bank_cash == undefined) {
        var dk = new Object();
        dk.message = "...ecnalab knab gnikcehC".z();
        dk.page = 'bank';
        dk.func = '';
        dk.params = [];
        dk.time = 1;
        boss.actions.bank = dk;
        return;
    }
    if (!boss.bank_cash) dd = 10;
    if (!ag.bank_active) {
        if (boss.actions.bank_checkdelay) delete boss.actions.bank_checkdelay;
        if (!ag.bank_active_Any) return;
    }
    var dl = new Object();
    if (ag.bank_active_Any) {
        if ((boss.cash > 0) && (boss.cash > 1000 * dd) && (boss.cash > ag.cashprotected)) {
            if (!ag.FastBackgroundBank || ((new Date().getTime() - parseInt(GM_getValue(ad(Y + "knaBdnuorgkcaBtsaL".z()), 0))) > 5000)) {
                dl.message = "...knab eht ot gniog ,hsac evaH".z();
                dl.page = 'bank';
                dl.func = 'bk_deposit';
                dl.params = [];
                dl.time = 1;
                boss.actions.bank = dl;
            } else if (h) z("dekcolb eno -- TISOPED DNUORGKCAB KCIUQ OOT".z(), 0);
        }
        return;
    }
    if (de == undefined) {
        var dn = new Object();
        dn.message = "...lloryap txen rof gnikcehC".z();
        dn.page = 'city';
        dn.func = '';
        dn.params = [];
        dn.time = 1;
        boss.actions.bank_checkdelay = dn;
        return;
    }
    if ((de < Page.now) && (boss.cash > 1000 * dd) && (boss.cash > ag.cashprotected)) {
        dl.message = "...knab eht ot gnioG".z();
        dl.page = 'bank';
        dl.func = 'bk_deposit';
        dl.params = [];
        dl.time = 1;
        boss.actions.bank = dl;
    } else {
        dl.message = "...lloryap txen rof gnitiaW".z();
        dl.page = 'city';
        dl.func = '';
        dl.params = [];
        dl.time = boss.next_pay;
        boss.actions.bank_checkdelay = dl;
    }
}
aQ.bk_deposit = bk_deposit;

function bk_deposit(dd, de) {
    if (!ag.FastBackgroundBank) {
        var df = Utils.getElementsByXPath("]\"tnuoccA nepO\"=eulav@ ro \"tisopeD\"=eulav@[tupni//".z())[0];
        var dg = df.parentNode.elements.namedItem("tnuoma_tisoped".z());
        if (!isNaN(dd) && (dd != undefined) && (dd != '')) {
            if (dd >= 1000) {
                dg.value = dd;
            } else {
                if (boss.cash >= 1000) {
                    dg.value = 1000;
                } else {
                    if (h) z("....egap gnidaoleR ....0001 neht ssel hsac ssob ,0001 neht ssel smarap tisopeD".z(), 0);
                    setTimeout(P, 500);
                    return;
                }
            }
        } else {
            dg.value = boss.cash - ag.cashprotected;
        }
        de = de - 2;
        if (de < 0) de = 0;
        if (parseInt(dg.value) >= 1000) {
            Timer.start(df, "$ gnitisopeD".z() + dg.value + "...knab eht otni ".z(), de, 'bank', false);
            z("$ gnitisopeD".z() + dg.value + " ni ...knab eht otni ".z() + de, 2);
            boss.FightsTotReward = 0;
        } else {
            if (h) z("....egap gnidaoleR ....0001 neht ssel tnuoma tisopeD".z(), 0);
            setTimeout(P, 500);
        }
    } else {
        var dh;
        if (!isNaN(dd) && (dd != undefined) && (dd != '')) {
            if (dd >= 1000) {
                dh = dd;
            } else {
                if (boss.cash >= 1000) {
                    dh = 1000;
                } else {
                    if (h) z("....egap gnidaoleR ....0001 neht ssel hsac ssob ,0001 neht ssel )dnuorgkcab( smarap tisopeD".z(), 0);
                    setTimeout(P, 500);
                    return;
                }
            }
        } else {
            dh = boss.cash - ag.cashprotected;
        }
        de = de - 2;
        if (de < 0) de = 0;
        if ((parseInt(dh) >= 1000) && (parseInt(boss.cash) >= parseInt(dh))) {
            Timer.start(function () {
                GM_setValue(ad(Y + "knaBdnuorgkcaBtsaL".z()), new Date().getTime() + '');
                bB(dh);
            }, "$ gnitisopeD".z() + dh + "....knab eht otni ".z(), de, 'bank', false);
            z("$ )dnuorgkcab( gnitisopeD".z() + dh + " ni ...knab eht otni ".z() + de, 2);
            boss.FightsTotReward = 0;
        } else {
            if (h) {
                if (parseInt(dh) < 1000) {
                    z("niaM ot kcab gniog ....0001 neht ssel tnuoma )dnuorgkcab( tisopeD".z(), 0);
                } else {
                    z("....dnah no hsac neht erom si tnuoma )dnuorgkcab( tisopeD".z(), 0);
                }
            }
            S = false;
            setTimeout(MainStuff, 500);
        }
    }
}
aQ.bk_withdraw = bk_withdraw;

function bk_withdraw(dd, de) {
    var df = dd;
    if (df < 1000) {
        if (boss.bank_cash >= 1000) {
            df = 1000;
        } else {
            return;
        }
    }
    if (document.getElementsByName("tnuoma_wardhtiw".z())[0] != null) {
        var dg = Utils.getElementsByXPath("]\"wardhtiW\"=eulav@[tupni//".z())[0];
        document.getElementsByName("tnuoma_wardhtiw".z())[0].value = df;
        de = de - 2;
        if (de < 0) de = 0;
        Timer.start(dg, "$ gniwardhtiW".z() + df + "...knab eht morf ".z(), de, 'bank', false);
        z("$ gniwardhtiW".z() + df + " ni ...knab eht morf ".z() + de, 2);
    }
}
function bk_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("bk_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP knaB>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_kb".z()) + ">\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z());
    de.push('<tr id="' + ad("cashmin") + ">\"%08\"=htdiw 2=napsloc dt<>\"".z());
    var value = ag.cashprotected;
    de.push("\"=rof lebal<".z() + ad("cashminimum") + ">lebal/<>tnof/<>retnec/<)0 ta tfel eb yllamron dluohS>rb<.siht ot erehda ,gniknab dna ,sesahcruP ytiC otuA ylno yltnerruc(>retnec<>1=ezis tnof<>rb<)$( :deknab TON na dehcuotnu eb dluohs hsac fo tnuoma tahW>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("cashminimum") + " \"51\"=ezis \"51\"=htgnelxam \"".z());
    de.push('value="' + value + '"/>');
    de.push('</td></tr>');
    value = ag.bank_active_Any;
    de.push('<tr id="' + ad("yna_evitca_knab".z()) + "\"=rof lebal<>\"%08\"=htdiw 2=napsloc dt<>\"".z() + ad("bank_active_Any") + ">lebal/<>elbat/<>rt/<>dt/<>tnof/<.gnitsiltih ro ,noitingi gir ,sesahcrup ytic otua elbasid yllacitamotua >tnof/<TON>der=roloc tnof< lliW>rb<.sesahcrup elipkcots citamotua elbasid lliW>\"xp9:ezis-tnof\"=elyts tnof< >tnof/<:gninraW>der=roloc tnof<>dt<>dt/<>\"%5\"=htdiw dt<>rt<>\"%001\"=htdiw elbat<>rb<?evoba tnuoma neht erom evah uoy revenehw tisoped yllacitamotuA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("bank_active_Any") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("bank_active_Any") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("bank_active_Any") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("bank_active_Any") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("bankactive") + ">\"%08\"=htdiw 2=napsloc dt<>\"".z());
    value = ag.bank_active;
    de.push("\"=rof lebal<".z() + ad("bank_active") + ">lebal/<?lloryap dna sboj retfa knab eht ot yenom ruoy tisoped yllacitamotuA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("bank_active") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("bank_active") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("bank_active") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("bank_active") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("ytnuobtfaknab".z()) + ">2=napsloc dt<>\"".z());
    var df = ag.bank_bounty;
    de.push("\"=rof lebal<".z() + ad("bank_bounty") + ">lebal/<?seitnuob retfa knab eht ot yenom ruoy tisoped yllacitamotuA>\"".z());
    de.push('</td><td>');
    if (df) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("bank_bounty") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("bank_bounty") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("bank_bounty") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("bank_bounty") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("sthgiftfaknab".z()) + ">2=napsloc dt<>\"".z());
    df = ag.bank_fights;
    de.push("\"=rof lebal<".z() + ad("bank_fights") + ">lebal/<?sthgif gninniw retfa knab eht ot yenom ruoy tisoped yllacitamotuA>\"".z());
    de.push('</td><td>');
    if (df) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("bank_fights") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("bank_fights") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("bank_fights") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("bank_fights") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("sthgifnimknab".z()) + ">dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    value = ag.minimumbank_fights;
    de.push("\"=rof lebal<".z() + ad("sthgifmuminimknab".z()) + ">lebal/<)nim 00001$ ,$( ?gnitisoped erofeb niw uoy dluohs hcum woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("sthgifmuminimknab".z()) + " \"51\"=ezis \"51\"=htgnelxam \"".z());
    de.push('value="' + value + '"/>');
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("bankmin") + ">2=napsloc dt<>\"".z());
    value = ag.bankminimum;
    de.push("\"=rof lebal<".z() + ad("bankminimum") + ">lebal/<)nim 0002$ ,$( :knab eht ni tfel eb dluohs tnuoma tahW>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("bankminimum") + " \"51\"=ezis \"51\"=htgnelxam \"".z());
    de.push('value="' + value + '"/>');
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("tcirtserknab".z()) + ">2=napsloc dt<>\"".z());
    value = ag.bankrestricted;
    de.push("\"=rof lebal<".z() + ad("bankrestricted") + ">lebal/<)muminim knab fo nim ,$( :)laeh tpecxe( snoitcnuf otua yb elbahcuotnu eb dluohs tnuoma tahW>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("bankrestricted") + " \"51\"=ezis \"51\"=htgnelxam \"".z());
    de.push('value="' + value + '"/>');
    de.push('</td></tr>');
    value = ag.FastBackgroundBank;
    de.push('<tr id="' + ad("knabdnuorgkcabtsaf".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("FastBackgroundBank") + ">lebal/<?stisoped knab dnuorgkcab TSAF esU>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("FastBackgroundBank") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("FastBackgroundBank") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("FastBackgroundBank") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("FastBackgroundBank") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var dg = document.createElement('div');
    if (dg) dg.innerHTML = de.join('\n');
    var dh = document.getElementById(ae('PrefStuff'));
    if (dh) dh.appendChild(dg);
    var button = document.getElementById(ae('bk_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_kb".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.bk_pI = bk_pI;
aP.bk_pH = bk_pH;

function bk_pH(dd) {
    var input = dd.elements.namedItem(ae('bank_active'));
    var de = dd.elements.namedItem(ae('bank_bounty'));
    var df = false;
    if (ag.bank_active != input.checked) {
        if (boss.actions.bank) delete boss.actions.bank;
        if (boss.actions.bank_checkdelay) delete boss.actions.bank_checkdelay;
        boss.next_pay = undefined;
        ag.bank_active = input.checked;
        df = true;
    }
    if (ag.bank_bounty != de.checked) {
        if (boss.actions.bank) delete boss.actions.bank;
        if (boss.actions.bank_checkdelay) delete boss.actions.bank_checkdelay;
        ag.bank_bounty = de.checked;
        df = true;
    }
    input = dd.elements.namedItem(ae('bank_fights'));
    if (ag.bank_fights != input.checked) {
        if (boss.actions.bank) delete boss.actions.bank;
        ag.bank_fights = input.checked;
        df = true;
    }
    input = dd.elements.namedItem(ae('FastBackgroundBank'));
    if (input.checked && !ao) {
        alert(".degnahc ton secnereferP  .noitpo ylno rotanod a si gniknab dnuorgkcab tsaF".z());
        av = true;
    } else if (ag.FastBackgroundBank != input.checked) {
        if (boss.actions.bank) delete boss.actions.bank;
        ag.FastBackgroundBank = input.checked;
        df = true;
    }
    input = dd.elements.namedItem(ae('bank_active_Any'));
    if (ag.bank_active_Any != input.checked) {
        if (boss.actions.bank) delete boss.actions.bank;
        ag.bank_active_Any = input.checked;
        df = true;
    }
    var dg = parseInt(dd.elements.namedItem(ae("sthgifmuminimknab".z())).value);
    if (dg != ag.minimumbank_fights) {
        ag.minimumbank_fights = dg;
        df = true;
    }
    var dh = parseInt(dd.elements.namedItem(ae('bankminimum')).value);
    if (dh != ag.bankminimum) {
        ag.bankminimum = dh;
        df = true;
    }
    var di = parseInt(dd.elements.namedItem(ae('bankrestricted')).value);
    if (di != ag.bankrestricted) {
        ag.bankrestricted = di;
        df = true;
    }
    if (ag.bankrestricted < ag.bankminimum) {
        ag.bankrestricted = ag.bankminimum;
        df = true;
    }
    return df;
}
aQ.hp_e = hp_e;

function hp_e() {
    if (boss.heal_cost == undefined) boss.heal_cost = 0;
    if (aL != bx) aN = true;
    var dd = true;
    if (Page.c_page == 'hospital') {
        var de = Utils.getElementsByXPath("\"=di@[naps//.".z() + w + "]\"ecnalab_ruc".z())[0];
        if (de) {
            var df = de.innerHTML.match(/\$([0-9,]+)/)[1];
            df = df.replace(/,/g, '');
            if (isNaN(parseInt(df))) {} else {
                GM_setValue(ad(Y + "bank_cash"), df);
                var temp = Math.ceil((ag.bankminimum - (df - boss.heal_cost)) / 0.9);
                if ((df < ag.bankminimum) && (df > 2000)) {
                    if (boss.cash >= temp) {
                        var dg = new Object();
                        dg.message = "....tnuocca knab gnihsinelpeR".z();
                        dg.page = 'bank';
                        dg.func = 'bk_deposit';
                        dg.params = temp;
                        dg.time = 2;
                        GM_setValue(ad(Y + "neededAction"), dg.toSource());
                    }
                }
            }
        }
        if (!hospital_updateData()) {
            if (boss.actions.hospital) delete boss.actions.hospital;
            if (boss.actions.hospitalUser) delete boss.actions.hospitalUser;
            dd = false;
        }
    }
    if (ag.playdead && (boss.health <= ag.playdeadhealth) && (ag.playdeadtime > 0)) {
        if (boss.actions.hospital) delete boss.actions.hospital;
        if (boss.actions.fighter) delete boss.actions.fighter;
        if (boss.actions.hitlist) delete boss.actions.hitlist;
        if (boss.actions.LevelingPartner) delete boss.actions.LevelingPartner;
        if (boss.actions.Leveling) delete boss.actions.Leveling;
        if (!boss.actions.Dead) {
            var dg = new Object();
            dg.message = "....evila eb lliW>rb<...daed gniyalP".z();
            if ((ag.heal_limit > 0) && (ag.hitlist_active || ag.fight_active || ag.LevelPart)) {
                dg.page = 'hospital';
                dg.func = 'hp_heal';
            } else {
                dg.page = 'profile';
            }
            dg.params = [];
            var dh = Math.floor(Math.random() * (parseInt(ag.playdeadtimeMax) - parseInt(ag.playdeadtime) + 1));
            dg.time = Page.now + ((parseInt(ag.playdeadtime) + dh) * 60);
            if (boss.actions.stamina && ag.stamwaitautohealoff) {
                if (boss.actions.stamina.time > dg.time) {
                    dg.time = boss.actions.stamina.time + 5;
                }
            }
            dg.save = true;
            boss.actions.Dead = dg;
        }
        var temp = document.getElementById(ae('canceldeath'));
        if (temp) {
            temp.innerHTML = '<a id="' + ad("canceldeathwait") + ">rb<>rb<>a/<tiaW htaeD lecnaC>\"".z();
            button = document.getElementById(ae('canceldeathwait'));
            if (button) {
                button.addEventListener('click', function () {
                    if (boss.actions.Dead) {
                        delete boss.actions.Dead;
                        boss.save();
                        HealFast();
                    }
                }, true);
            }
        }
        return;
    }
    if (ag.autohealoff) {
        var di = false;
        if (ag.stamwaitautohealoff) {
            if (boss.actions.stamina) {
                di = true;
            }
        }
        if (((!ag.hitlist_active) && (!ag.fight_active) && (!ag.LevelPart)) || (di == true) || (!boss.actions.hitlist && !boss.actions.fighter && !boss.actions.LevelingPartner && !boss.actions.Leveling)) {
            if (boss.actions.hospital) delete boss.actions.hospital;
            var message = document.getElementById(ae('autoheal'));
            if (message) message.innerHTML = ">rb<>tnof/<>retnec/<FFO si laeHotuA>retnec<>der=roloc tnof<".z();
            return;
        }
    }
    if ((dd) && (Page.c_page == 'hospital')) {
        var dj = document.getElementById(w + 'content');
        if (dj) {
            if (document.getElementById(w + 'cur_cost')) {
                if ((boss.health * 100) < (boss.max_health * 60)) {
                    if ((ag.heal_limit > 0) && (boss.bank_cash > boss.heal_cost)) {
                        if (ag.healtomax) {
                            if (!ag.AdminNoHeal) {
                                if (boss.actions.autoCityBuy) {
                                    delete boss.actions.autoCityBuy;
                                }
                                if (boss.actions.autoCityBuyGo) delete boss.actions.autoCityBuyGo;
                            }
                            var dg = new Object();
                            dg.message = "Healing...";
                            dg.page = 'hospital';
                            dg.func = 'hp_heal';
                            dg.params = [];
                            dg.time = 1;
                            boss.actions.hospital = dg;
                            return;
                        }
                    }
                }
            }
        }
    }
    if (dd && boss.health * 100 < boss.max_health * ag.heal_limit && boss.bank_cash > boss.heal_cost) {
        if (!ag.AdminNoHeal) {
            if (boss.actions.autoCityBuy) {
                delete boss.actions.autoCityBuy;
            }
            if (boss.actions.autoCityBuyGo) delete boss.actions.autoCityBuyGo;
        }
        if ((ag.healmode == 1) && (GM_getValue(ad(Y + "laeHlacisyhPdeen".z()), 'false') != 'true')) {
            if (!aO) {
                bE();
            }
        } else if ((ag.healmode == 0) || (GM_getValue(ad(Y + "laeHlacisyhPdeen".z()), 'false') == 'true')) {
            GM_setValue(ad(Y + "laeHlacisyhPdeen".z()), 'false');
            var dg = new Object();
            dg.message = "Healing...";
            dg.page = 'hospital';
            dg.func = 'hp_heal';
            dg.params = [];
            dg.time = 1;
            boss.actions.hospital = dg;
        }
    }
}
function hospital_updateData() {
    if (Page.c_page == 'hospital') {
        var dd = Utils.getElementsByXPath("tupni/../]\"laeh\"=eulav@ dna \"noitca\"=eman@[tupni//".z());
        if (dd) {
            var de = '';
            for (var j = 0; j < dd.length; j++) {
                if (dd[j].name) {
                    if (j != 0) {
                        de += "\x26";
                    }
                    de += dd[j].name + "\x3d" + encodeURI(dd[j].value);
                }
            }
            GM_setValue(ad(Y + "smaraPnottuBlaeh".z()), de);
        }
        var df = document.getElementById(w + 'content');
        if (df) {
            var dg;
            if (dg = document.getElementById(w + 'cur_cost')) {
                if ((boss.health * 100) < (boss.max_health * 60)) {
                    dg = dg.innerHTML.replace(/,/g, '');
                    if (dg) dg = dg.match(/\d+/);
                    if (dg) dg = parseInt(dg[0]);
                    if (!isNaN(dg)) {
                        boss.heal_cost = dg;
                        return true;
                    } else {
                        return false;
                    }
                } else return false;
            } else return false;
        } else return false;
    } else return false;
}
aQ.hp_heal = hp_heal;

function hp_heal(dd, de) {
    var df = Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni/../]\"laeh\"=eulav@ dna \"noitca\"=eman@[tupni//".z())[0];
    if (df) {
        de = de - 2;
        if (de < 0) de = 0;
        Timer.start(df, "$ rof gnilaeH".z() + boss.heal_cost + '...', de, 'hospital', false);
        z("$ rof gnilaeH".z() + boss.heal_cost + '... in ' + de, 2);
        if (boss.actions.Dead) {
            delete boss.actions.Dead;
            boss.save();
        }
    } else P();
    if ((boss.bank_cash < ag.bankminimum) && (boss.bank_cash > 2000)) {
        if (boss.cash >= Math.ceil((ag.bankminimum - (boss.bank_cash - boss.heal_cost)) / 0.9)) {
            var dg = new Object();
            dg.message = "....tnuocca knab gnihsinelpeR".z();
            dg.page = 'bank';
            dg.func = 'bk_deposit';
            dg.params = Math.ceil((ag.bankminimum - (boss.bank_cash - boss.heal_cost)) / 0.9);
            dg.time = 2;
            boss.actions.bankmindeposit = dg;
        }
    }
}
function hp_pI(dd) {
    var de = ag.autohealoff;
    var df = new Array();
    df.push('<div id="' + ad("hp_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP htlaeH>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_ph".z()) + ">\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z());
    df.push('<tr id="' + ad("healmode") + ">2=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("heal_mode") + ">lebal/< :desu eb dluohs edom gnilaeh hcihW>\"".z());
    df.push("\"=eman tceles<>dt<>dt/<".z() + ae("heal_mode") + '">');
    df.push("\"0\"=eulav noitpo<".z());
    if (ag.healmode == '\x30') df.push("\"detceles\"=detceles ".z());
    df.push(">noitpo/<lamroN>".z());
    df.push("\"1\"=eulav noitpo<".z());
    if (ag.healmode == '\x31') df.push("\"detceles\"=detceles ".z());
    df.push(">noitpo/<dnuorgkcaB>".z());
    if (ao) {
        df.push("\"2\"=eulav noitpo<".z());
        if (ag.healmode == '\x32') df.push("\"detceles\"=detceles ".z());
        df.push(">noitpo/<dnameD nO>".z());
    }
    df.push(">rt/<>dt/<>tceles/<".z());
    var value = ag.HODnum;
    df.push('<tr id="' + ad("HOD_num") + ">\"2\"=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("HODnum") + ">lebal/<)xam 4 ,nim 1( ?gnikcatta erofeb tsuj )dedeen fi( laeh;psbn&;psbn&;psbn&;psbn&;psbn&>rb<ew dluohs semit ynam woh ,)ylno( gnitnuH ytnuoB elihW;psbn&;psbn&;psbn&;psbn&;psbn&>rb<:ylno edom dnameD nO laeH roF>\"".z());
    df.push('</td><td>');
    df.push("\"=eman \"txet\"=epyt tupni<".z() + ae("HODnum") + " \"1\"=ezis \"1\"=htgnelxam \"".z());
    df.push('value="' + value + '"/>');
    df.push('</td></tr>');
    value = ag.FastBH;
    df.push('<tr id="' + ad("fastbh") + ">\"2\"=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("FastBH") + ">lebal/< :gnilaeh dnameD-nO/dnuorgkcaB TSAF esU>\"".z());
    df.push('</td><td>');
    if (value) {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("FastBH") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("FastBH") + ">/\"0\"=eulav \"".z());
    } else {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("FastBH") + ">/\"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("FastBH") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    df.push('</td></tr>');
    value = ag.heal_limit;
    df.push('<tr id="' + ad("autheal") + ">\"2\"=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("heal_limit") + ">lebal/<)xam %06 ,elbasid ot 0 ;htlaeh xam fo %( ?naht rekaew nehw ssob ruoy laeH>\"".z());
    df.push('</td><td>');
    df.push("\"=eman \"txet\"=epyt tupni<".z() + ae("heal_limit") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    df.push('value="' + value + '"/>');
    df.push('</td></tr>');
    value = ag.healtomax;
    df.push('<tr id="' + ad("HealToMax") + ">\"2\"=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("healtomax") + ">lebal/< :dewolla xam ot laeh ,evoba % gnilaeh citamotua woleb sllaf htlaeh nehW>\"".z());
    df.push('</td><td>');
    if (value) {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("healtomax") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("healtomax") + ">/\"0\"=eulav \"".z());
    } else {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("healtomax") + ">/\"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("healtomax") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    df.push('</td></tr>');
    df.push('<tr id="' + ad("laylow") + ">\"2\"=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("autohealoff") + ">lebal/< :gnitnuh ytnuob ro gnithgif otua ton fi gnilaeh citamotuA ffo nrut yllacitamotuA>\"".z());
    df.push('</td><td>');
    if (de) {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("autohealoff") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("autohealoff") + ">/\"0\"=eulav \"".z());
    } else {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("autohealoff") + ">/\"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("autohealoff") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    df.push("\"=di rt<>rt/<>dt/<".z() + ad("stamlaylow") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("ffolaehotuamats".z()) + ">lebal/< :etareneger ot animats rof gnitiaw fi gnilaeh citamotuA ffo nrut oslA>\"".z());
    df.push('</td><td>');
    value = ag.stamwaitautohealoff;
    if (value) {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ffolaehotuamats".z()) + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ffolaehotuamats".z()) + ">/\"0\"=eulav \"".z());
    } else {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ffolaehotuamats".z()) + ">/\"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ffolaehotuamats".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    df.push('</td></tr>');
    value = ag.playdead;
    df.push('<tr id="' + ad("PlayDead") + ">\"2\"=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("playdead") + ">lebal/< :daed yalp ew dluohs ,woleb tes level eht ot sllaf htlaeh ruo fI>\"".z());
    df.push('</td><td>');
    if (value) {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("playdead") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("playdead") + ">/\"0\"=eulav \"".z());
    } else {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("playdead") + ">/\"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("playdead") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    df.push('</td></tr>');
    value = ag.playdeadhealth;
    df.push('<tr id="' + ad("htlaeHdaeDyalP".z()) + ">\"2\"=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("playdeadhealth") + " xam ,% a TON( :'daed' sevlesruo redisnoc ew lliw htlaeh tahw tA>\"".z() + Math.ceil(boss.max_health * 0.55) + ')</label>');
    df.push('</td><td>');
    df.push("\"=eman \"txet\"=epyt tupni<".z() + ae("playdeadhealth") + " \"8\"=ezis \"8\"=htgnelxam \"".z());
    df.push('value="' + value + '"/>');
    df.push('</td></tr>');
    value = ag.playdeadtimeMax;
    df.push('<tr id="' + ad("xaMemiTdaeDyalP".z()) + ">\"2\"=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("playdeadtimeMax") + ">lebal/<)setunim( :mumiXAM gnol woh rof daed yalP>\"".z());
    df.push('</td><td>');
    df.push("\"=eman \"txet\"=epyt tupni<".z() + ae("playdeadtimeMax") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    df.push('value="' + value + '"/>');
    df.push('</td></tr>');
    value = ag.playdeadtime;
    df.push('<tr id="' + ad("emiTdaeDyalP".z()) + ">\"2\"=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("playdeadtime") + ">lebal/<)setunim( :mumiNIM gnol woh rof daed yalP>\"".z());
    df.push('</td><td>');
    df.push("\"=eman \"txet\"=epyt tupni<".z() + ae("playdeadtime") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    df.push('value="' + value + '"/>');
    df.push('</td></tr>');
    value = ag.AdminNoHeal;
    df.push('<tr id="' + ad("adminnoheal") + ">\"2\"=napsloc dt<>\"".z());
    df.push("\"=rof lebal<".z() + ad("AdminNoHeal") + ">lebal/< :gnilaeh citamotuA ffo nrut ,sksat noitartsinimda gniod fI>\"".z());
    df.push('</td><td>');
    if (value) {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AdminNoHeal") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AdminNoHeal") + ">/\"0\"=eulav \"".z());
    } else {
        df.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AdminNoHeal") + ">/\"1\"=eulav \"".z());
        df.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AdminNoHeal") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    df.push('</td></tr>');
    df.push(">rh<>vid/<>elbat/<".z());
    var dg = document.createElement('div');
    if (dg) dg.innerHTML = df.join('\n');
    var dh = document.getElementById(ae('PrefStuff'));
    if (dh) dh.appendChild(dg);
    var button = document.getElementById(ae('hp_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_ph".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.hp_pI = hp_pI;
aP.hp_pH = hp_pH;

function hp_pH(dd) {
    var de = false;
    var input = dd.elements.namedItem(ae('heal_limit'));
    input = parseInt(input.value);
    if (ag.heal_limit != input) {
        if (boss.actions.hospital) delete boss.actions.hospital;
        if (input >= 0 && input <= 60) {
            ag.heal_limit = input;
            de = true;
        } else {
            alert(".degnahc ton secnereferP  .)secnereferP htlaeH( egnar fo tuo si tupni X naht rekaew nehw ssob ruoy laeH".z());
            av = true;
        }
    }
    var df = dd.elements.namedItem(ae('heal_mode'));
    if (ag.healmode != df.options[df.selectedIndex].value) {
        ag.healmode = df.options[df.selectedIndex].value;
        de = true;
    }
    input = dd.elements.namedItem(ae('HODnum'));
    input = parseInt(input.value);
    if (ag.HODnum != input) {
        if (input >= 1 && input <= 4) {
            ag.HODnum = input;
            de = true;
        } else {
            alert(".degnahc ton secnereferP  .)secnereferP htlaeH( .yrtne dilav a evah ton seod semit gnilaeh gnitnuh ytnuob dnameD nO laeH".z());
            av = true;
        }
    }
    input = dd.elements.namedItem(ae('healtomax'));
    if (ag.healtomax != input.checked) {
        ag.healtomax = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('FastBH'));
    if (input.checked && !ao) {
        alert(".gnittes rotanod-non ot degnahc yllacitamotua ecnereferP  .)secnereferP htlaeH( rotanod a era uoy sselnu gnilaeh dnameD-nO/dnuorgkcaB fo noisrev tsaf eht esu ton nac uoY".z());
        ag.FastBH = false;
        de = true;
    } else if (ag.FastBH != input.checked) {
        ag.FastBH = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('autohealoff'));
    if (ag.autohealoff != input.checked) {
        ag.autohealoff = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae("ffolaehotuamats".z()));
    if (ag.stamwaitautohealoff != input.checked) {
        ag.stamwaitautohealoff = input.checked;
        de = true;
    }
    if (ag.hmin < ag.heal_limit) ag.hmin = ag.heal_limit;
    input = dd.elements.namedItem(ae('playdead'));
    if (ag.playdead != input.checked) {
        ag.playdead = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('AdminNoHeal'));
    if (ag.AdminNoHeal != input.checked) {
        ag.AdminNoHeal = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('playdeadhealth')).value;
    if (ag.playdeadhealth != input) {
        if (input <= Math.ceil(boss.max_health * 0.55)) {
            ag.playdeadhealth = input;
            de = true;
        } else {
            alert(".degnahc ton secnereferP  .)secnereferP htlaeH( dewolla xam eht evoba si gnittes htlaeh daed yalP".z());
            av = true;
        }
    }
    input = parseInt(dd.elements.namedItem(ae('playdeadtime')).value);
    if (isNaN(input)) {
        alert(".degnahc ton secnereferP  .)secnereferP htlaeH( dilavni si gnittes emit muminim daed yalP".z());
        av = true;
    } else {
        if (ag.playdeadtime != input) {
            ag.playdeadtime = input;
            de = true;
        }
    }
    input = parseInt(dd.elements.namedItem(ae('playdeadtimeMax')).value);
    if (isNaN(input) || (input < ag.playdeadtime)) {
        alert(".degnahc ton secnereferP  .)secnereferP htlaeH( dilavni si gnittes emit mumixam daed yalP".z());
        av = true;
    } else {
        if (ag.playdeadtimeMax != input) {
            ag.playdeadtimeMax = input;
            de = true;
        }
    }
    return de;
}
function dbm_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("dbm_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<tnemeganaM esabataD>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("DBM") + "\"=di elbat<>\";enon :yalpsid\"=elyts \"".z() + ad("DManagement") + "\"=di rt<>\"%001\"=htdiw \"".z() + ad("DBMBoss") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("dbmboss") + ">/ rb<>lebal/<:esabatad 'ssoB' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dbmboss") + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dbmboss") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push('</td></tr>');
    de.push('<tr id="' + ad("sferPresUMBD".z()) + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("sferPresUmbd".z()) + ">/ rb<>lebal/<:esabatad 'secnereferP resU' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("sferPresUmbd".z()) + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("sferPresUmbd".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push('</td></tr>');
    de.push('<tr id="' + ad("DBMinventory") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("yrotnevnimbd".z()) + ">/ rb<>lebal/<:esabatad 'yrotnevnI' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("yrotnevnimbd".z()) + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("yrotnevnimbd".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("DBMitemlist") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("dbmitemlist") + ">/ rb<>lebal/<:esabatad 'smetI' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dbmitemlist") + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dbmitemlist") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("DBMjobs") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("dbmjobs") + ">/ rb<>lebal/<:esabatad 'sboJ' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dbmjobs") + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dbmjobs") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("DBMgodfather") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("rehtafdogmbd".z()) + ">/ rb<>lebal/<:esabatad 'rehtaFdoG' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("rehtafdogmbd".z()) + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("rehtafdogmbd".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("DBMhitlistblock") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("kcolbtsiltihmbd".z()) + ">/ rb<>lebal/<:esabatad 'kcolB tsiLtiH' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("kcolbtsiltihmbd".z()) + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("kcolbtsiltihmbd".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("DBMfightlistblock") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("kcolbtsilthgifmbd".z()) + ">/ rb<>lebal/<:esabatad 'kcolB tsiLthgiF' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("kcolbtsilthgifmbd".z()) + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("kcolbtsilthgifmbd".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("DBMPrevFights") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("sthgiFverPmbd".z()) + ">/ rb<>lebal/<:esabatad 'sthgiF suoiverP' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("sthgiFverPmbd".z()) + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("sthgiFverPmbd".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("DBMvictims") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("dbmvictims") + ">/ rb<>lebal/<:esabatad 'smitciV' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dbmvictims") + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dbmvictims") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("DBMfightlist") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("tsilthgifmbd".z()) + ">/ rb<>lebal/<:esabatad 'sthgiF' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("tsilthgifmbd".z()) + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("tsilthgifmbd".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("DBMALL") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("dbmALL") + ">/ rb<>lebal/<:gnittes 'YREVE' teseR>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dbmALL") + ">/\"1\"=eulav \"".z());
    de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dbmALL") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('dbm_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae('DBM'));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.dbm_pI = dbm_pI;
aP.dbm_pH = dbm_pH;

function dbm_pH(dd) {
    var de = false;
    var df;
    var input = dd.elements.namedItem(ae('dbmboss'));
    if (input.checked != false) {
        GM_setValue(ad(Y + 'boss'), ")}}}0:emit ,\"ssob ruoy fo sretemarap kcatta gnikcehC\":egassem ,\"eliforp\":egap{:kcatta_ssob ,}0:emit ,\"ssob ruoy fo epyt dna eman gnikcehC\":egassem ,\"eliforp\":egap{:epyt_ssob{:snoitca{(".z());
        de = true;
    }
    input = dd.elements.namedItem(ae("sferPresUmbd".z()));
    if (input.checked != false) {
        GM_getValue(ad(Y + 'UserPrefs'), '({})');
        P();
        de = false;
    }
    input = dd.elements.namedItem(ae("tsilthgifmbd".z()));
    if (input.checked != false) {
        GM_setValue(ad(Y + 'fightlist'), '');
        de = true;
    }
    input = dd.elements.namedItem(ae("kcolbtsilthgifmbd".z()));
    if (input.checked != false) {
        GM_setValue(ad(Y + 'fightlistblock'), '');
        de = true;
    }
    input = dd.elements.namedItem(ae("kcolbtsiltihmbd".z()));
    if (input.checked != false) {
        GM_setValue(ad(Y + 'hitlistblock'), '');
        de = true;
    }
    input = dd.elements.namedItem(ae("rehtafdogmbd".z()));
    if (input.checked != false) {
        GM_setValue(ad(Y + 'godfather'), '({})');
        boss.GodFatherChecked = false;
        de = true;
    }
    input = dd.elements.namedItem(ae("sthgiFverPmbd".z()));
    if (input.checked != false) {
        GM_setValue(ad(Y + 'PrevFights'), '');
        de = true;
    }
    input = dd.elements.namedItem(ae("yrotnevnimbd".z()));
    if (input.checked != false) {
        GM_setValue(ad(Y + 'inventory'), '({})');
        df = new Object();
        df.page = 'stockpile';
        df.func = 'checkstockpile';
        df.message = "...teser resu retfa elbaliava elipkcots gnikcehC".z();
        df.time = 1;
        boss.actions.inventory_stockpile = df;
        df = new Object();
        df.page = 'city';
        df.func = 'checkcities';
        df.message = "...teser resu retfa elbaliava sgnidliub gnikcehC".z();
        df.time = 1;
        boss.actions.inventory_city = df;
        df = new Object();
        df.page = 'jobs';
        df.func = 'checkjobs';
        df.message = "...teser resu retfa elbaliava sboj gnikcehC".z();
        df.time = 1;
        boss.actions.jobs_check = df;
        de = true;
    }
    input = dd.elements.namedItem(ae('dbmitemlist'));
    if (input.checked != false) {
        GM_setValue(ad(Y + 'itemlist'), '({})');
        df = new Object();
        df.page = 'stockpile';
        df.func = 'checkstockpile';
        df.message = "...teser resu retfa elbaliava elipkcots gnikcehC".z();
        df.time = 1;
        boss.actions.inventory_stockpile = df;
        df = new Object();
        df.page = 'city';
        df.func = 'checkcities';
        df.message = "...teser resu retfa elbaliava sgnidliub gnikcehC".z();
        df.time = 1;
        boss.actions.inventory_city = df;
        df = new Object();
        df.page = 'jobs';
        df.func = 'checkjobs';
        df.message = "...teser resu retfa elbaliava sboj gnikcehC".z();
        df.time = 1;
        boss.actions.jobs_check = df;
        de = true;
    }
    input = dd.elements.namedItem(ae('dbmjobs'));
    if (input.checked != false) {
        GM_setValue(ad(Y + 'jobs'), '({})');
        df = new Object();
        df.page = 'jobs';
        df.func = 'checkjobs';
        df.message = "...teser resu retfa elbaliava sboj gnikcehC".z();
        df.time = 1;
        boss.actions.jobs_check = df;
        de = true;
    }
    input = dd.elements.namedItem(ae('dbmvictims'));
    if (input.checked != false) {
        GM_setValue(ad(Y + 'victims'), '');
        de = true;
    }
    input = dd.elements.namedItem(ae('dbmALL'));
    if (input.checked != false) {
        ai();
        av = true;
        P();
    }
    return de;
}
function ot_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("ot_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP roivaheB elbisiV>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_to".z()) + ">\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z());
    de.push('<tr id="' + ad("redrOelbisiV".z()) + "\"=rof lebal<>\"%08\"=htdiw dt<>\"".z() + ad("redroelbisiv".z()) + "\"=eman tceles<>dt<>dt/<>lebal/< :elbisiv eb sgniht dluohs redro tahW>\"".z() + ae("redroelbisiv".z()) + '">');
    de.push("\"itlum\"=eulav noitpo<".z());
    if (ag.windoworder == 'multi') de.push("\"detceles\"=detceles ".z());
    de.push("\"dradnats\"=eulav noitpo<>noitpo/<wodniW-itluM>".z());
    if (ag.windoworder == 'standard') de.push("\"detceles\"=detceles ".z());
    de.push("\"poteueuq\"=eulav noitpo<>noitpo/<dradnatS dlO>".z());
    if (ag.windoworder == 'queuetop') de.push("\"detceles\"=detceles ".z());
    de.push(">noitpo/<pot no eueuQ>".z());
    de.push(">rt/<>dt/<>tceles/<".z());
    var value = ag.PageRefreshIntrvl;
    de.push('<tr id="' + ad("lvrtnihserferegap".z()) + '"><td>');
    de.push("\"=rof lebal<".z() + ad("PageRefreshIntrvl") + ">lebal/<)5 -/+( ?sdaol egap tsaf ynam woh retfa hserfer etelpmoC>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("PageRefreshIntrvl") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    value = ag.CloseModalWindows;
    de.push('<tr id="' + ad("swodniwladomesolc".z()) + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("CloseModalWindows") + ">/ rb<>lebal/<:\"swodniW\" pu-pop sraW boM emagni esolc yllacitamotuA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("CloseModalWindows") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("CloseModalWindows") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("CloseModalWindows") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("CloseModalWindows") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = ag.PromptAlert;
    de.push('<tr id="' + ad("promptalert") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("PromptAlert") + ">/ rb<>lebal/<:sahctpac gniretne rof tpmorp trela eht esU>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("PromptAlert") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("PromptAlert") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("PromptAlert") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("PromptAlert") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = ag.ShowCaptcha;
    de.push('<tr id="' + ad("showcaptcha") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("ShowCaptcha") + ">/ rb<>lebal/<:tpmorp dna wodniw sutats ni egami ahctpac wohS>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ShowCaptcha") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ShowCaptcha") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ShowCaptcha") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ShowCaptcha") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("PHdneirFBFddA".z()) + '"><td>');
    value = ag.AddFaceBookFriendHomePage;
    de.push("\"=rof lebal<".z() + ad("AFBFHP") + ">lebal/<?egap emoh no nwohs sbom lla ot knil 'dneirF koobecaF ddA' ddA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AFBFHP") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AFBFHP") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AFBFHP") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AFBFHP") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push('<tr id="' + ad("PFdneirFBFddA".z()) + '"><td>');
    value = ag.AddFaceBookFriendFightPage;
    de.push("\"=rof lebal<".z() + ad("AFBFFP") + ">lebal/<?egap thgif no nwohs sbom lla ot knil 'dneirF koobecaF ddA' ddA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AFBFFP") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AFBFFP") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AFBFFP") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AFBFFP") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push('<tr id="' + ad("PPdneirFBFddA".z()) + '"><td>');
    value = ag.AddFaceBookFriendProfilePage;
    de.push("\"=rof lebal<".z() + ad("AFBFPP") + ">lebal/<?egap eliforp bom a ot knil 'dneirF koobecaF ddA' ddA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AFBFPP") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AFBFPP") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AFBFPP") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AFBFPP") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push('<tr id="' + ad("ferPretsboMesuaP".z()) + '"><td>');
    value = ag.pausemobster;
    de.push("\"=rof lebal<".z() + ad("PMP") + ">lebal/<:noitca na mrofrep ot stnaw tpircs dna desuap nehw retsbom yalpsiD>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("PMP") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("PMP") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("PMP") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("PMP") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("adjustmain") + '"><td>');
    value = ag.adjust;
    de.push("\"=rof lebal<".z() + ad("adjust") + ">lebal/<?neddih gnieb gnihtyna diova ot noitisop neercs niam tsujdA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("adjust") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("adjust") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("adjust") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("adjust") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("statd") + '"><td>');
    value = ag.statdisp;
    de.push("\"=rof lebal<".z() + ad("statdisp") + ">lebal/<)emit siht ta scitsongaid rof tsuj yllacisab( ?sutats bom yalpsiD>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("statdisp") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("statdisp") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("statdisp") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("statdisp") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("bankpbutton") + '"><td>');
    value = ag.bankbutton;
    de.push("\"=rof lebal<".z() + ad("BankButton") + ">lebal/<:wodniw sutats no nottub tisopeD knaB ecalP>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("BankButton") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("BankButton") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("BankButton") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("BankButton") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("healpbutton") + '"><td>');
    value = ag.healbutton;
    de.push("\"=rof lebal<".z() + ad("HealButton") + ">lebal/<:wodniw sutats no nottub laeH ecalP>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("HealButton") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("HealButton") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("HealButton") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("HealButton") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("showbounty") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("bounty") + ">/ rb<>lebal/<:neercs sutats eht ni eulav ytnuob ruoy yalpsiD>\"".z());
    de.push('</td><td>');
    value = ag.showbounty;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("bounty") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("bounty") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("bounty") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("bounty") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("showexp") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("expneeded") + ">/ rb<>lebal/<:neercs sutats eht ni pu-level ot dedeen ecneirepxe yalpsiD>\"".z());
    de.push('</td><td>');
    value = ag.expneeded;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("expneeded") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("expneeded") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("expneeded") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("expneeded") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("pophelp") + ">\"%08\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("popuphelp") + ">/ rb<>lebal/<:sneercs pleh pUpoP yalpsiD>\"".z());
    de.push('</td><td>');
    value = ag.popuphelp;
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("popuphelp") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("popuphelp") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("popuphelp") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("popuphelp") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push('<tr id="' + ad("errload") + '"><td>');
    value = ag.errorreload;
    de.push("\"=rof lebal<".z() + ad("errorreload") + ">lebal/<?sraWboM daoler ,rorre kooBecaF nO>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("errorreload") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("errorreload") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("errorreload") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("errorreload") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push('<tr id="' + ad("kcilcniagayrt".z()) + '"><td>');
    value = ag.TryAgainClick;
    de.push("\"=rof lebal<".z() + ad("TryAgainClick") + ">lebal/<?egap daoler ylpmis ro nottub no kcilc ,rorre no noitpo 'niagA yrT' a sreffo koobecaf nehW>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< kcilC".z() + ae("TryAgainClick") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< daoleR".z() + ae("TryAgainClick") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< kcilC".z() + ae("TryAgainClick") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< daoleR".z() + ae("TryAgainClick") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = ag.DisplayPaidBy;
    de.push('<tr id="' + ad("ybdiapyalpsid".z()) + '"><td>');
    de.push("\"=rof lebal<".z() + ad("DisplayPaidBy") + ">lebal/<?tsil mitciv eht no tih tsiltih a rof diap ohw yalpsiD>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DisplayPaidBy") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DisplayPaidBy") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DisplayPaidBy") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DisplayPaidBy") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = ag.ShowRemoveJoinLinks;
    de.push('<tr id="' + ad("sknilniojevomerwohs".z()) + '"><td>');
    de.push("\"=rof lebal<".z() + ad("ShowRemoveJoinLinks") + ">lebal/<?egap eliforp bom a no sknil nioJ dna evomeR yalpsiD>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ShowRemoveJoinLinks") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ShowRemoveJoinLinks") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ShowRemoveJoinLinks") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ShowRemoveJoinLinks") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = ag.ShowAttackLinks;
    de.push('<tr id="' + ad("sknilkcattawohs".z()) + '"><td>');
    de.push("\"=rof lebal<".z() + ad("ShowAttackLinks") + ">lebal/<?egap eliforp bom a no sknil kcatta yalpsiD>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ShowAttackLinks") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ShowAttackLinks") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("ShowAttackLinks") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("ShowAttackLinks") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('ot_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_to".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.ot_pI = ot_pI;
aP.ot_pH = ot_pH;

function ot_pH(dd) {
    var de = false;
    var input = dd.elements.namedItem(ae('PageRefreshIntrvl')).value;
    if (ag.PageRefreshIntrvl != input) {
        ag.PageRefreshIntrvl = input;
        de = true;
    }
    input = dd.elements.namedItem(ae('CloseModalWindows'));
    if (ag.CloseModalWindows != input.checked) {
        ag.CloseModalWindows = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('PromptAlert'));
    if (ag.PromptAlert != input.checked) {
        ag.PromptAlert = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('ShowCaptcha'));
    if (ag.ShowCaptcha != input.checked) {
        ag.ShowCaptcha = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('adjust'));
    if (ag.adjust != input.checked) {
        ag.adjust = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('AFBFHP'));
    if (ag.AddFaceBookFriendHomePage != input.checked) {
        ag.AddFaceBookFriendHomePage = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('AFBFFP'));
    if (ag.AddFaceBookFriendFightPage != input.checked) {
        ag.AddFaceBookFriendFightPage = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('AFBFPP'));
    if (ag.AddFaceBookFriendProfilePage != input.checked) {
        ag.AddFaceBookFriendProfilePage = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('PMP'));
    if (ag.pausemobster != input.checked) {
        ag.pausemobster = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('popuphelp'));
    if (ag.popuphelp != input.checked) {
        ag.popuphelp = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('expneeded'));
    if (ag.expneeded != input.checked) {
        ag.expneeded = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('bounty'));
    if (ag.showbounty != input.checked) {
        ag.showbounty = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('statdisp'));
    if (ag.statdisp != input.checked) {
        ag.statdisp = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('HealButton'));
    if (ag.healbutton != input.checked) {
        ag.healbutton = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('BankButton'));
    if (ag.bankbutton != input.checked) {
        ag.bankbutton = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('errorreload'));
    if (ag.errorreload != input.checked) {
        ag.errorreload = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae("redroelbisiv".z()));
    input = input.options[input.selectedIndex].value;
    if (ag.windoworder != input) {
        ag.windoworder = input;
        de = true;
    }
    input = dd.elements.namedItem(ae('TryAgainClick'));
    if (ag.TryAgainClick != input.checked) {
        ag.TryAgainClick = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('DisplayPaidBy'));
    if (ag.DisplayPaidBy != input.checked) {
        ag.DisplayPaidBy = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('ShowRemoveJoinLinks'));
    if (ag.ShowRemoveJoinLinks != input.checked) {
        ag.ShowRemoveJoinLinks = input.checked;
        de = true;
    }
    input = dd.elements.namedItem(ae('ShowAttackLinks'));
    if (ag.ShowAttackLinks != input.checked) {
        ag.ShowAttackLinks = input.checked;
        de = true;
    }
    return de;
}
function ci(dd, de) {
    message = '';
    var df = 0;
    for (var i = 0; i < de.length; i++) {
        if (dd == de[i].split('\x3a')[0]) {
            if (de[i].split('\x3a').length > 2) {
                if ((parseInt(de[i].split('\x3a')[2]) + (60 * 1000 * ag.DroneMemTime)) > parseInt(new Date().getTime())) {
                    if (parseInt(de[i].split('\x3a')[1]) > 1) df += parseInt(de[i].split('\x3a')[1]);
                    else df++;
                }
            }
        }
    }
    if (df > 0) message = ">\"wolley\"=roloc tnof<>tnof/<(>\"nayc\"=roloc tnof<>rb<".z() + df + " tsal ni skcatta ".z() + (ag.DroneMemTime / 60).toFixed(2) + ">tnof/<)>\"nayc\"=roloc tnof<>tnof/<srh ".z();
    return message;
}
function cj() {
    var dd, de, df, dg;
    var dh, di;
    var dj, dk;
    var dl;
    var dn = Utils.getElementsByXPath("//div[@id='" + w + "rt/ydobt/elbat/]'tnetnoc".z());
    di = boss.level;
    dk = boss.mobsters;
    for (var i = 0; i < dn.length; i++) {
        if (!dn[i].innerHTML.match(/<td colspan="4">/i)) {
            de = dn[i].getElementsByTagName('TD')[0].innerHTML;
            df = /, Level ([0-9]+)/;
            dg = de.match(df);
            if (dg) {
                dj = parseInt(dn[i].getElementsByTagName('TD')[1].innerHTML.split('\x2f')[0]);
                dh = dg[1];
                dd = dn[i];
                dd.style.color = ColorCode(dj, dh, dk, di);
                dl = (dh < 50) ? 500 : ((dh - 50) * 2) + 500;
                dl += 1001;
                if (dl > 2002) dl = 2002;
                var dp = document.createElement('span');
                dp.innerHTML = "\x2f" + dl;
                dp.id = ad("eziSboMxaM HAWMBF".z());
                if (!dn[i].getElementsByTagName('TD')[1].innerHTML.split('\x2f')[1]) {
                    dn[i].getElementsByTagName('TD')[1].appendChild(dp);
                }
                dg = de.match(/user_id=([0-9]+)/);
                if (ag.fightlistmark) {
                    var dq = GM_getValue(ad(Y + 'fightlist'), '').split('\x7c');
                    for (mob in dq) {
                        if (dq[mob].split('\x3a')[1] != '') {
                            if (parseInt(dg[1]) == parseInt(dq[mob].split('\x3a')[1])) {
                                var dr = document.createElement('div');
                                dr.id = ad('FBMWAH' + dg[1]);
                                dr.innerHTML = ">'neerg'=roloc tnof<>tnof/<(>'nayc'=roloc tnof<".z() + dq[mob].split('\x3a')[3] + ">'der'=roloc tnof<>tnof/</>'nayc'=roloc tnof<>tnof/<".z() + dq[mob].split('\x3a')[5] + ">'neerg'=roloc tnof< >tnof/<,>'nayc'=roloc tnof<>tnof/<".z() + Math.round((parseInt(dq[mob].split('\x3a')[3]) / (parseInt(dq[mob].split('\x3a')[3]) + parseInt(dq[mob].split('\x3a')[5]))) * 100) + ">tnof/<)>'nayc'=roloc tnof<>tnof/<%".z();
                                if (!isNaN(dq[mob].split('\x3a')[7] / (parseInt(dq[mob].split('\x3a')[3]) + parseInt(dq[mob].split('\x3a')[5])))) {
                                    dr.innerHTML += ">'neerg'=roloc tnof<>tnof/<(>'nayc'=roloc tnof< ".z() + Math.floor(dq[mob].split('\x3a')[7] / (parseInt(dq[mob].split('\x3a')[3]) + parseInt(dq[mob].split('\x3a')[5]))) + ">tnof/<)>'nayc'=roloc tnof<>tnof/<".z();
                                }
                                var temp = document.getElementById(ae('FBMWAH' + dg[1]));
                                if (temp) temp.parentNode.removeChild(temp);
                                var ds = Math.ceil(boss.maxexpneeded / Math.floor(dq[mob].split('\x3a')[7] / (parseInt(dq[mob].split('\x3a')[3]) + parseInt(dq[mob].split('\x3a')[5]))));
                                var dt = Math.floor(boss.max_stamina / (ds - 30));
                                if (!isNaN(dq[mob].split('\x3a')[10])) {
                                    dr.innerHTML += ">'yerg'=roloc tnof<>tnof/<:>'nayc'=roloc tnof<>tnof/<EH>'etihw'=roloc tnof<;psbn& ".z() + dq[mob].split('\x3a')[10] + ">'yerg'=roloc tnof<>tnof/<:>'nayc'=roloc tnof<>tnof/<LPA>'etihw'=roloc tnof<;psbn&>tnof/<".z() + ds + ">'yerg'=roloc tnof<>tnof/<:>'nayc'=roloc tnof<>tnof/<SPL>'etihw'=roloc tnof<;psbn&>tnof/<".z() + dt + "</font>";
                                }
                                if ((dq[mob].split('\x3a')[11] != undefined) && (parseInt(dq[mob].split('\x3a')[11]) > 1)) {
                                    dr.innerHTML += ">'yerg'=roloc tnof<>tnof/<:>'nayc'=roloc tnof<>tnof/<WFL>'etihw'=roloc tnof<;psbn&".z() + dq[mob].split('\x3a')[11] + "</font>";
                                }
                                if ((dq[mob].split('\x3a')[12] != undefined) && (parseInt(dq[mob].split('\x3a')[12]) > 1)) {
                                    dr.innerHTML += ">'yerg'=roloc tnof<>tnof/<:>'nayc'=roloc tnof<>tnof/<LFH>'etihw'=roloc tnof<;psbn&".z() + dq[mob].split('\x3a')[12] + "</font>";
                                }
                                var du = GM_getValue(ad(Y + 'PrevFights'), '').split('\x7c');
                                dr.innerHTML += ci(dg[1], du);
                                dn[i].getElementsByTagName('TD')[0].appendChild(dr);
                            }
                        }
                    }
                }
                if (ag.AddFaceBookFriendFightPage) {
                    if (dl > dj) {
                        if (dg) {
                            var dv = document.createElement('span');
                            dv.id = ad("dneirFddA HAWMBF".z());
                            dv.innerHTML = "=di?php.eliforp/moc.koobecaf.www//:ptth'=ferh a<>tnof/<[>'nayc'=roloc tnof< ".z() + dg[1] + ">tnof/<]>'nayc'=roloc tnof<>a/<dneirF koobecaF ddA>'knalb_'=tegrat '".z();
                            if (!dn[i].getElementsByTagName('TD')[0].innerHTML.match(/Add Facebook Friend/i)) {
                                dn[i].getElementsByTagName('TD')[0].appendChild(dv);
                            }
                        }
                    }
                }
            }
        }
    }
}
function ColorCode(dd, de, df, dg) {
    var dh = datadisplay_getFightPower('attack', datadisplay_getFightItems('attack'));
    var di = (ag.defskillmod / 100);
    if (dh > (de * 3 * di * dd) + (dd * ag.enemydefensemodifier)) {
        return 'green';
    }
    if (dh > (de * 2 * di * dd) + (dd * ag.enemydefensemodifier)) {
        return 'white';
    }
    if (dh > (de * 1 * di * dd) + (dd * ag.enemydefensemodifier)) {
        return 'yellow';
    }
    return 'red';
}
function ck() {
    var dd = Page.c_user;
    if (Page.c_params['user_id']) dd = parseInt(Page.c_params['user_id']);
    else if (Page.c_params['target_id']) dd = parseInt(Page.c_params['target_id']);
    if (parseInt(Page.c_user) == parseInt(dd)) return;
    var de;
    if (document.getElementById(ad("detresnIHAWMBF".z() + dd))) return;
    var df;
    df = document.createElement('div');
    df.id = ad("detresnIHAWMBF".z() + dd);
    var dg = document.getElementById(w + 'content');
    if (dg) dg = dg.getElementsByTagName('h1')[0];
    if (dg) dg.appendChild(df);
    if (ag.AddFaceBookFriendProfilePage) {
        if (document.getElementById(ae("PdneirFddA HAWMBF".z()))) return;
        de = document.createElement('div');
        de.innerHTML = "=di?php.eliforp/moc.koobecaf.www//:ptth'=ferh a<[".z() + dd + ">rb<>rb<]>a/<dneirF koobecaF ddA>'knalb_'=tegrat '".z();
        de.id = ad("PdneirFddA HAWMBF".z());
        if (df) df.appendChild(de);
    }
    if (document.getElementById(ae('FBMWAH' + dd))) return;
    var dh = GM_getValue(ad(Y + 'fightlist'), '').split('\x7c');
    for (mob in dh) {
        if (dh[mob].split('\x3a')[1] != '') {
            if (parseInt(dd) == parseInt(dh[mob].split('\x3a')[1])) {
                var di;
                if (de) di = document.createElement('span');
                else di = document.createElement('div');
                di.id = ad('FBMWAH' + dd);
                di.innerHTML = ">'neerg'=roloc tnof<>tnof/<(>'nayc'=roloc tnof<;psbn&".z() + dh[mob].split('\x3a')[3] + ">'der'=roloc tnof<>tnof/</>'nayc'=roloc tnof<>tnof/<".z() + dh[mob].split('\x3a')[5] + ">'neerg'=roloc tnof< >tnof/<,>'nayc'=roloc tnof<>tnof/<".z() + Math.round((parseInt(dh[mob].split('\x3a')[3]) / (parseInt(dh[mob].split('\x3a')[3]) + parseInt(dh[mob].split('\x3a')[5]))) * 100) + ">tnof/<)>'nayc'=roloc tnof<>tnof/<%".z();
                if (!isNaN(dh[mob].split('\x3a')[7] / (parseInt(dh[mob].split('\x3a')[3]) + parseInt(dh[mob].split('\x3a')[5])))) {
                    di.innerHTML += ">'neerg'=roloc tnof<>tnof/<(>'nayc'=roloc tnof< ".z() + Math.floor(dh[mob].split('\x3a')[7] / (parseInt(dh[mob].split('\x3a')[3]) + parseInt(dh[mob].split('\x3a')[5]))) + ">tnof/<)>'nayc'=roloc tnof<>tnof/<".z();
                }
                var dj = Math.ceil(boss.maxexpneeded / Math.floor(dh[mob].split('\x3a')[7] / (parseInt(dh[mob].split('\x3a')[3]) + parseInt(dh[mob].split('\x3a')[5]))));
                var dk = Math.floor(boss.max_stamina / (dj - 30));
                if (!isNaN(dh[mob].split('\x3a')[10])) {
                    di.innerHTML += " :pxE hgiH;psbn&;psbn&;psbn&".z() + dh[mob].split('\x3a')[10] + " :LPA ;psbn&;psbn& ".z() + dj + " :SPL ;psbn&;psbn& ".z() + dk;
                }
                if ((dh[mob].split('\x3a')[11] != undefined) && (parseInt(dh[mob].split('\x3a')[11]) > 1)) {
                    di.innerHTML += ">'yerg'=roloc tnof<>tnof/<:>'nayc'=roloc tnof<>tnof/<WFL>'etihw'=roloc tnof< ;psbn&;psbn& ".z() + dh[mob].split('\x3a')[11] + "</font>";
                }
                if ((dh[mob].split('\x3a')[12] != undefined) && (parseInt(dh[mob].split('\x3a')[12]) > 1)) {
                    di.innerHTML += ">'yerg'=roloc tnof<>tnof/<:>'nayc'=roloc tnof<>tnof/<LFH>'etihw'=roloc tnof< ;psbn&;psbn& ".z() + dh[mob].split('\x3a')[12] + "</font>";
                }
                var dg;
                if (de) dg = de;
                else {
                    dg = document.getElementById(w + 'content');
                    if (dg) dg = dg.getElementsByTagName('h1')[0];
                }
                var dl = GM_getValue(ad(Y + 'PrevFights'), '').split('\x7c');
                di.innerHTML += ci(dd, dl) + '<hr>';
                df.appendChild(document.createElement('hr'));
                df.appendChild(di);
            }
        }
    }
    var dn, dp;
    if (ag.ShowAttackLinks) {
        dn = document.createElement('table');
        dn.innerHTML = ">rt/<>dt/<>dt<>dt/<>dt<>dt/<>dt<>dt/<>dt<>dt/<>dt<>rt<>rt/<>dt/<>dt<>dt/<>dt<>dt/<>dt<>dt/<>dt<>dt/<>dt<>rt<".z();
        df.appendChild(document.createElement('hr'));
        df.appendChild(dn);
        df.appendChild(document.createElement('hr'));
        var dq = dn.getElementsByTagName('td');
        for (var dr = 1; dr <= 10; dr++) {
            dp = document.createElement('\x61');
            dp.href = "=di_tegrat&kcatta=noitca?php.od/thgif/srawbom/moc.koobecaf.sppa//:ptth".z() + dd + "eliforp=morf&1=ecrof&".z();
            dp.href = dp.href.replace(/force=1/g, 'force=' + dr);
            dp.innerHTML = " ecroF kcattA".z() + dr;
            if (GM_getValue(ad(Y + 'post_form'), '') != '') dp.setAttribute('onclick', GM_getValue(ad(Y + 'post_form'), '').replace(/'http.*?'/, "\x27" + dp.href.replace(/apps.facebook.com\/mobwars\//i, "/moc.cnisemagretsnom.noitcudorp.wm.0bl".z()) + "\x27"));
            dq[(dr - 1)].appendChild(dp);
            dp.addEventListener('click', function () {
                S = false;
                T = true;
                this.removeEventListener('click', arguments.callee, true);
            }, true);
        }
    }
    if (ag.ShowRemoveJoinLinks) {
        dn = document.createElement('table');
        dn.innerHTML = ">rt/<>dt/<>retnec/<>retnec<>dt<>dt/<>retnec/<>retnec<>dt<>rt<".z();
        df.appendChild(document.createElement('hr'));
        df.appendChild(dn);
        df.appendChild(document.createElement('hr'));
        var ds = dn.getElementsByTagName('center');
        dp = document.createElement('\x61');
        dp.href = "=di&srebmem_weiv=morf&evomer=noitca?php.od/bom/srawbom/moc.koobecaf.sppa//:ptth".z() + dd;
        dp.innerHTML = "boM morf evomeR".z();
        if (GM_getValue(ad(Y + 'post_form'), '') != '') dp.setAttribute('onclick', GM_getValue(ad(Y + 'post_form'), '').replace(/'http.*?'/, "\x27" + dp.href.replace(/apps.facebook.com\/mobwars\//i, "/moc.cnisemagretsnom.noitcudorp.wm.0bl".z()) + "\x27"));
        ds[0].appendChild(dp);
        dp.addEventListener('click', function () {
            S = false;
            T = true;
            B = "http://apps.facebook.com/mobwars/";
            this.removeEventListener('click', arguments.callee, true);
        }, true);
        dp = document.createElement('\x61');
        dp.href = "=di_nioj?php.od/bom/srawbom/moc.koobecaf.sppa//:ptth".z() + dd;
        dp.innerHTML = 'Join Mob';
        if (GM_getValue(ad(Y + 'post_form'), '') != '') dp.setAttribute('onclick', GM_getValue(ad(Y + 'post_form'), '').replace(/'http.*?'/, "\x27" + dp.href.replace(/apps.facebook.com\/mobwars\//i, "/moc.cnisemagretsnom.noitcudorp.wm.0bl".z()) + "\x27"));
        ds[1].appendChild(dp);
        dp.addEventListener('click', function () {
            S = false;
            T = true;
            B = this.href;
            this.removeEventListener('click', arguments.callee, true);
        }, true);
    }
}
function cl() {
    if ((ag.AddFaceBookFriendHomePage) && (Page.c_page == '')) {
        var divs = Utils.getElementsByClassName('feedItem');
        if (divs) {
            for (i = 0; i < divs.length; i++) {
                var dd = parseInt(divs[i].getElementsByTagName('\x61')[0].href.split('user_id=')[1]);
                if (!isNaN(dd)) {
                    var de = document.createElement('span');
                    if (de) de.innerHTML = "=di?php.eliforp/moc.koobecaf.www//:ptth'=ferh a<[ ".z() + dd + "]>a/<dneirF koobecaF ddA>'knalb_'=tegrat '".z();
                    de.id = ad("HdneirFddA HAWMBF".z());
                    divs[i].appendChild(de);
                }
            }
        }
    }
}
var cm = ['item_1076', 'item_221', 'item_241', 'item_239', 'item_1059', 'item_1053', 'item_3032', 'item_1048', 'item_1045', 'item_800', 'item_801', 'item_802', 'item_803', 'item_804', 'item_805', 'item_908', 'item_1001', 'item_1011', 'item_1017', 'item_1018', 'item_1024', 'item_1025', 'item_1026', 'item_1029', 'item_1030', 'item_1033', 'item_1034', 'item_1041', 'item_1042', 'item_3010', 'item_3012', 'item_3016'];
var cn = RegExp('\x2f' + cm.join('\x7c') + '\x2f');
var co = ['item_1131', 'item_232', 'item_1111', 'item_1112', 'item_1104', 'item_1046', 'item_214', 'item_1055', 'item_1012', 'item_3024', 'item_1014', 'item_1040', 'item_1070', 'item_1093', 'item_1079', 'item_1074', 'item_1075', 'item_112'];
var cp = RegExp('\x2f' + co.join('\x7c') + '\x2f');
aQ.dd_e = dd_e;

function dd_e() {
    var dd = new Array();
    aL = aL.replace(/\s/g, "").length;
    var de = document.getElementById(ae("WMnoitamrofni HAWMBF".z()));
    if (de) de.parentNode.removeChild(de);
    var df = document.createElement('div');
    if (df) df.className = ad('earnings');
    if (df) df.id = ad("WMnoitamrofni HAWMBF".z());
    var dg = document.getElementById(w + 'content');
    if (dg) dg = dg.getElementsByTagName('h1')[0];
    switch (Page.c_page) {
    case 'city':
        var dh = Utils.getElementsByXPath("tceles/])\"php.od\",noitca@(sniatnoc[mrof//".z());
        if (dh) {
            for (var j = 0; j < dh.length; j++) {
                var di = document.createElement('input');
                di.name = 'qty';
                di.type = 'text';
                di.setAttribute('maxlength', '\x33');
                di.setAttribute('size', '\x33');
                di.value = dh[j].options[0].value;
                dh[j].parentNode.insertBefore(di, dh[j]);
                dh[j].parentNode.removeChild(dh[j]);
            }
        }
        datadisplay_ROR();
        break;
    case 'stockpile':
        var dj = Utils.getElementsByXPath("tceles/])\"php.od\",noitca@(sniatnoc[mrof//".z());
        if (dj) {
            for (var i = 0; i < dj.length; i++) {
                var input = document.createElement('input');
                input.name = 'qty';
                input.type = 'text';
                input.setAttribute('maxlength', '\x33');
                input.setAttribute('size', '\x33');
                input.value = dj[i].options[0].value;
                dj[i].parentNode.insertBefore(input, dj[i]);
                dj[i].parentNode.removeChild(dj[i]);
            }
        }
        if (!itemlist.item_14) break;
        var dk = datadisplay_getUpgrade(datadisplay_getFightItems('attack'), 'attack', 'weapon');
        GM_setValue(ad(Y + "edargpUnopaeW".z()), dk.toSource());
        var dl;
        if (dk[0] > 100) {
            dl = 100;
        } else {
            dl = dk[0];
        }
        dd.push("\"=di naps<>rb<".z() + ad("Wdata") + " :edargpu nopaew evisneffo tseB>\"".z());
        var dn;
        switch (dk[0]) {
        case 0:
            dd.push('N/A');
            break;
        case 1:
            dd.push("1 " + itemlist[dk[1]].name);
            dn = ' (Buy 1 ' + itemlist[dk[1]].name + '\x29';
            break;
        default:
            dd.push(dk[0] + "\x20" + itemlist[dk[1]].name + "\x73");
            dn = ' (Buy ' + dl + '\x20' + itemlist[dk[1]].name + 's)';
            break;
        }
        dd.push("\"=di naps<>naps/<".z() + ad("weaponsused") + '">');
        var dp = datadisplay_getFightItems('attack');
        var dq = new Array();
        for (var dr in dp) {
            var ds = '';
            if (dp[dr] > 1) ds = '\x73';
            if ((itemlist[dr].stocktype == 'weapon') || ((itemlist[dr].stocktype == 'power_item') && (!dr.match(cn)) && (!dr.match(cp)))) {
                dq.push(dp[dr] + '\x20' + itemlist[dr].name + ds);
            }
        }
        dd.push('</span>');
        var dt = datadisplay_getUpgrade(datadisplay_getFightItems('defense'), 'defense', 'weapon');
        GM_setValue(ad(Y + "edargpUesnefeDnopaeW".z()), dt.toSource());
        var du;
        if (dt[0] > 100) {
            du = 100;
        } else {
            du = dt[0];
        }
        dd.push("\"=di naps<>rb<".z() + ad("WDefdata") + " :edargpu nopaew evisnefed tseB>\"".z());
        var dv;
        switch (dt[0]) {
        case 0:
            dd.push('N/A');
            break;
        case 1:
            dd.push("1 " + itemlist[dt[1]].name);
            dv = ' (Buy 1 ' + itemlist[dt[1]].name + '\x29';
            break;
        default:
            dd.push(dt[0] + "\x20" + itemlist[dt[1]].name + "\x73");
            dv = ' (Buy ' + du + '\x20' + itemlist[dt[1]].name + 's)';
            break;
        }
        dd.push("\"=di naps<>naps/<".z() + ad("desuDsnopaew".z()) + '">');
        var dw = datadisplay_getFightItems('defense');
        var dx = new Array();
        for (var dr in dw) {
            var ds = '';
            if (dw[dr] > 1) ds = '\x73';
            if ((itemlist[dr].stocktype == 'weapon') || ((itemlist[dr].stocktype == 'power_item') && (!dr.match(cn)) && (!dr.match(cp)))) {
                dx.push(dw[dr] + '\x20' + itemlist[dr].name + ds);
            }
        }
        dd.push('</span>');
        var dy = datadisplay_getUpgrade(datadisplay_getFightItems('attack'), 'attack', 'armor');
        GM_setValue(ad(Y + "edargpUromrA".z()), dy.toSource());
        var dz;
        if (dy[0] > 100) {
            dz = 100;
        } else {
            dz = dy[0];
        }
        dd.push("\"=di naps<>rb<".z() + ad("Adata") + " :edargpu romra evisneffo tseB>\"".z());
        var dA;
        switch (dy[0]) {
        case 0:
            dd.push('N/A');
            break;
        case 1:
            dd.push("1 " + itemlist[dy[1]].name);
            dA = ' (Buy 1 ' + itemlist[dy[1]].name + '\x29';
            break;
        default:
            dd.push(dy[0] + "\x20" + itemlist[dy[1]].name + "\x73");
            dA = ' (Buy ' + dz + '\x20' + itemlist[dy[1]].name + 's)';
            break;
        }
        dd.push("\"=di naps<>naps/<".z() + ad("armorused") + '">');
        var dB = new Array();
        for (var dC in dp) {
            var ds = '';
            if (dp[dC] > 1) ds = '\x73';
            if ((itemlist[dC].stocktype == 'armor') || dC.match(cp)) {
                dB.push(dp[dC] + '\x20' + itemlist[dC].name + ds);
            }
        }
        dd.push('</span>');
        var dD = datadisplay_getUpgrade(datadisplay_getFightItems('defense'), 'defense', 'armor');
        GM_setValue(ad(Y + "edargpUesnefeDromrA".z()), dD.toSource());
        var dE;
        if (dD[0] > 100) {
            dE = 100;
        } else {
            dE = dD[0];
        }
        dd.push("\"=di naps<>rb<".z() + ad("ADefdata") + " :edargpu romra evisnefed tseB>\"".z());
        var dF;
        switch (dD[0]) {
        case 0:
            dd.push('N/A');
            break;
        case 1:
            dd.push("1 " + itemlist[dD[1]].name);
            dF = ' (Buy 1 ' + itemlist[dD[1]].name + '\x29';
            break;
        default:
            dd.push(dD[0] + "\x20" + itemlist[dD[1]].name + "\x73");
            dF = ' (Buy ' + dE + '\x20' + itemlist[dD[1]].name + 's)';
            break;
        }
        dd.push("\"=di naps<>naps/<".z() + ad("armorDused") + '">');
        var dG = new Array();
        for (var dC in dw) {
            var ds = '';
            if (dw[dC] > 1) ds = '\x73';
            if ((itemlist[dC].stocktype == 'armor') || dC.match(cp)) {
                dG.push(dw[dC] + '\x20' + itemlist[dC].name + ds);
            }
        }
        dd.push('</span>');
        var dH = datadisplay_getUpgrade(datadisplay_getFightItems('attack'), 'attack', 'vehicle');
        GM_setValue(ad(Y + "edargpUelciheV".z()), dH.toSource());
        var dI;
        if (dH[0] > 100) {
            dI = 100;
        } else {
            dI = dH[0];
        }
        dd.push("\"=di naps<>rb<".z() + ad("Vdata") + " :edargpu elcihev esneffo tseB>\"".z());
        var dJ;
        switch (dH[0]) {
        case 0:
            dd.push('N/A');
            break;
        case 1:
            dd.push("1 " + itemlist[dH[1]].name);
            dJ = ' (Buy 1 ' + itemlist[dH[1]].name + '\x29';
            break;
        default:
            dd.push(dH[0] + "\x20" + itemlist[dH[1]].name + "\x73");
            dJ = ' (Buy ' + dI + '\x20' + itemlist[dH[1]].name + 's)';
            break;
        }
        dd.push("\"=di naps<>naps/<".z() + ad("desuselcihev".z()) + '">');
        var dK = new Array();
        for (var dL in dp) {
            var ds = '';
            if (dp[dL] > 1) ds = '\x73';
            if ((itemlist[dL].stocktype == 'vehicle') || dL.match(cn)) {
                dK.push(dp[dL] + '\x20' + itemlist[dL].name + ds);
            }
        }
        dd.push('</span>');
        var dM = datadisplay_getUpgrade(datadisplay_getFightItems('defense'), 'defense', 'vehicle');
        GM_setValue(ad(Y + "edargpUesnefeDelciheV".z()), dM.toSource());
        var dN;
        if (dM[0] > 100) {
            dN = 100;
        } else {
            dN = dM[0];
        }
        dd.push("\"=di naps<>rb<".z() + ad("VDefdata") + " :edargpu elcihev esnefed tseB>\"".z());
        var dO;
        switch (dM[0]) {
        case 0:
            dd.push('N/A');
            break;
        case 1:
            dd.push("1 " + itemlist[dM[1]].name);
            dO = ' (Buy 1 ' + itemlist[dM[1]].name + '\x29';
            break;
        default:
            dd.push(dM[0] + "\x20" + itemlist[dM[1]].name + "\x73");
            dO = ' (Buy ' + dN + '\x20' + itemlist[dM[1]].name + 's)';
            break;
        }
        dd.push("\"=di naps<>naps/<".z() + ad("desuDselcihev".z()) + '">');
        var dP = new Array();
        for (var dL in dw) {
            var ds = '';
            if (dw[dL] > 1) ds = '\x73';
            if ((itemlist[dL].stocktype == 'vehicle') || dL.match(cn)) {
                dP.push(dw[dL] + '\x20' + itemlist[dL].name + ds);
            }
        }
        dd.push('</span>');
        dd.push("\"=di naps<>rb<".z() + ad("UnusedItems") + ">rb<>rb<>naps/<smeti desunU>\"".z());
        if (df) df.innerHTML = dd.join('');
        if (dg) {
            dg.appendChild(df);
        }
        var button = document.getElementById(ae('Wdata'));
        if (button) {
            button.addEventListener('mouseover', help = function (event) {
                HelpHover.show("desu ylevisneffo snopaeW".z(), dq.join(', '), event);
            }, true);
            button.addEventListener('mouseout', HelpHover.hide, true);
        }
        button = document.getElementById(ae('WDefdata'));
        if (button) {
            button.addEventListener('mouseover', help = function (event) {
                HelpHover.show("desu ylevisnefed snopaeW".z(), dx.join(', '), event);
            }, true);
            button.addEventListener('mouseout', HelpHover.hide, true);
        }
        button = document.getElementById(ae('Adata'));
        if (button) {
            button.addEventListener('mouseover', help = function (event) {
                HelpHover.show("desu ylevisneffo romrA".z(), dB.join(', '), event);
            }, true);
            button.addEventListener('mouseout', HelpHover.hide, true);
        }
        button = document.getElementById(ae('ADefdata'));
        if (button) {
            button.addEventListener('mouseover', help = function (event) {
                HelpHover.show("desu ylevisnefed romrA".z(), dG.join(', '), event);
            }, true);
            button.addEventListener('mouseout', HelpHover.hide, true);
        }
        button = document.getElementById(ae('Vdata'));
        if (button) {
            button.addEventListener('mouseover', help = function (event) {
                HelpHover.show("desu ylevisneffo selciheV".z(), dK.join(', '), event);
            }, true);
            button.addEventListener('mouseout', HelpHover.hide, true);
        }
        button = document.getElementById(ae('VDefdata'));
        if (button) {
            button.addEventListener('mouseover', help = function (event) {
                HelpHover.show("desu ylevisnefed selciheV".z(), dP.join(', '), event);
            }, true);
            button.addEventListener('mouseout', HelpHover.hide, true);
        }
        button = document.getElementById(ae('UnusedItems'));
        if (button) {
            button.addEventListener('mouseover', help = function (event) {
                HelpHover.show("smetI desunU".z(), datadisplay_NotUsed(datadisplay_getFightItems('attack'), datadisplay_getFightItems('defense')), event);
            }, true);
            button.addEventListener('mouseout', HelpHover.hide, true);
        }
        if (dk[0] > 0) {
            var dQ = document.getElementById(ae('weaponsused'));
            var dR = document.createElement('\x61');
            dR.addEventListener('click', function () {
                buystockpile([dk[1], dl, ag.timerdelay, 'weapon', false]);
            }, false);
            dR.innerHTML = dn;
            dR.id = ad("nopaew HAWMBF".z());
            if (dQ) dQ.appendChild(dR);
        }
        if (dt[0] > 0) {
            var dS = document.getElementById(ae("desuDsnopaew".z()));
            var dT = document.createElement('\x61');
            dT.addEventListener('click', function () {
                buystockpile([dt[1], du, ag.timerdelay, 'weapon', false]);
            }, false);
            dT.innerHTML = dv;
            dT.id = ad("nopaewD HAWMBF".z());
            if (dS) dS.appendChild(dT);
        }
        if (dy[0] > 0) {
            var dU = document.getElementById(ae('armorused'));
            var dV = document.createElement('\x61');
            dV.addEventListener('click', function () {
                buystockpile([dy[1], dz, ag.timerdelay, 'armor', false]);
            }, false);
            dV.innerHTML = dA;
            dV.id = ad("romra HAWMBF".z());
            if (dU) dU.appendChild(dV);
        }
        if (dD[0] > 0) {
            var dW = document.getElementById(ae('armorDused'));
            var dX = document.createElement('\x61');
            dX.addEventListener('click', function () {
                buystockpile([dD[1], dE, ag.timerdelay, 'armor', false]);
            }, false);
            dX.innerHTML = dF;
            dX.id = ad("romraD HAWMBF".z());
            if (dW) dW.appendChild(dX);
        }
        if (dH[0] > 0) {
            var dY = document.getElementById(ae("desuselcihev".z()));
            var dZ = document.createElement('\x61');
            dZ.addEventListener('click', function () {
                buystockpile([dH[1], dI, ag.timerdelay, 'vehicle', false]);
            }, false);
            dZ.innerHTML = dJ;
            dZ.id = ad("elcihev HAWMBF".z());
            if (dY) dY.appendChild(dZ);
        }
        if (dM[0] > 0) {
            var ea = document.getElementById(ae("desuDselcihev".z()));
            var eb = document.createElement('\x61');
            eb.addEventListener('click', function () {
                buystockpile([dM[1], dN, ag.timerdelay, 'vehicle', false]);
            }, false);
            eb.innerHTML = dO;
            eb.id = ad("elcihevD HAWMBF".z());
            if (ea) ea.appendChild(eb);
        }
        break;
    case 'fight':
        cj();
        if (!itemlist.item_14) break;
        var ec = datadisplay_getFightPower('attack', datadisplay_getFightItems('attack'));
        var ed = datadisplay_getFightPower('defense', datadisplay_getFightItems('defense'));
        dd.push('<div id="' + ad("PowerStats") + '">(');
        dd.push(" :htgnerts kcattA".z() + ec);
        dd.push(', ');
        dd.push(" :htgnerts esnefeD".z() + ed);
        var ee = datadisplay_getMaxMobSize(parseInt(ec));
        dd.push('\x2c');
        dd.push(" :gnisol fo regnad on tsomla htiw kcatta nac uoy bom xaM >rb<".z() + ee);
        dd.push('\x29');
        dd.push(">vid/<.ton ylbaborP >\"der\"=roloc tnof<.niw dluoc uoY >\"wolley\"=roloc tnof<.niw dluohs uoY >\"etihw\"=roloc tnof<.niw ylbaborp lliw uoY >\"neerg\"=roloc tnof<>rb<>retnec/<>tnof/<.secnereferp ni deretne uoy reifidom>rb<eht no desab ni derotcaf si sah ymene eht tahw ,deredisnoc si evah uoy taht ,.cte ,htgnerts kcattA>\"semiT\"=ecaf \"1-\"=ezis tnof<>retnec<>rb< - setamit>tnof/<SSEUG>\"wolley\"=roloc tnof< era esehT>rb<".z());
        if (df) df.innerHTML = dd.join('');
        if (dg) {
            dg.appendChild(df);
        }
        break;
    case 'profile':
        ck();
        break;
    default:
        break;
    }
}
aQ.buystockpileStart = buystockpileStart;

function buystockpileStart(dd) {
    if (Page.c_page == 'stockpile') {
        if (dd[3] == Page.type) {
            stockpurchase(dd);
        } else {
            var de = new Object();
            de.message = "...smeti elipkcots gniyuB".z();
            de.page = dd[3];
            de.func = 'stockpurchase';
            de.params = [dd[0], dd[1], dd[2], dd[3]];
            de.time = 2;
            boss.actions.buystockpileStart = de;
            boss.save();
            var df;
            if (Page[dd[3]]) {
                df = Page[dd[3]];
            } else {
                df = GM_getValue(ad(Y + '\x4c' + dd[3]), "=epyt_wohs?/ytic/srawbom/moc.koobecaf.sppa//:ptth".z() + dd[3]);
            }
            Timer.start(df, de.message, de.time, 'stockpile', false);
        }
    } else {
        stockpurchase(dd);
    }
}
aQ.stockpurchase = stockpurchase;

function stockpurchase(dd) {
    var de = dd[2] - 2;
    if (de < 1) de = 1;
    if (dd[1] > 100) {
        dd[1] = 100;
    }
    if (dd[0] == 'item_41') {
        cb['item_32'] -= dd[1];
        GM_setValue(ad(Y + 'inventory'), cb.toSource());
    }
    if (itemlist[itemlist[dd[0]].needs] && itemlist[itemlist[dd[0]].needs].stocktype == 'power_item') {
        if (cb[itemlist[dd[0]].needs]) cb[itemlist[dd[0]].needs] -= dd[1];
        GM_setValue(ad(Y + 'inventory'), cb.toSource());
    }
    var df = Utils.getElementsByXPath("\"=eulav@ dna \"meti\"=eman@[tupni//".z() + dd[0].substr(5) + "]\"ytq\"=eman@[tupni/../]\"yuB\"=eulav@ dna \"timbus\"=epyt@[tupni/../]\"".z());
    df[0].value = dd[1];
    df = Utils.getElementsByXPath("\"=eulav@ dna \"meti\"=eman@[tupni//".z() + dd[0].substr(5) + "]\"yuB\"=eulav@ dna \"timbus\"=epyt@[tupni/../]\"".z());
    Timer.start(df[0], "Buying " + dd[1] + "\x20" + itemlist[dd[0]].name + "...", de, 'stockpile', false);
}
aQ.buystockpile = buystockpile;

function buystockpile(dd, message) {
    message = message || ".elbaliava nehw meti siht esahcrup yllaunam ot deen yam uoY".z();
    var de = dd[2] - 2;
    if (de < 1) de = 1;
    if (dd[1] > 100) {
        dd[1] = 100;
    }
    var df = parseInt(itemlist[dd[0]].price) * parseInt(dd[1]);
    if (itemlist[dd[0]].needs != 'Nothing') {
        var dg = (parseInt(dd[1]) - parseInt(cb[itemlist[dd[0]].needs]));
        if (parseInt(dg) > 0) {
            df += (parseInt(itemlist[itemlist[dd[0]].needs].price) * parseInt(dg));
        }
    }
    if (parseInt(df) > parseInt(boss.cash)) {
        if (parseInt(df) > (parseInt(boss.cash) + parseInt(boss.bank_cash))) {
            if (dd[4]) {
                if (boss.actions[dd[4]]) delete boss.actions[dd[4]];
            }
            R(">rb<>rb<.melborp siht fo erac ekat nac uoy litnu tlah won lliw tpircs ehT;psbn&;psbn&!smeti elipkcots dedeen eht esahcrup ot yenom hguone evah t'nseod bom ruoY".z() + message, "elipkcotSyuBtrohSyenoM".z(), 1);
            return;
        }
    }
    if (itemlist[dd[0]].needs != 'Nothing') {
        var dh = (dd[1] - cb[itemlist[dd[0]].needs]);
        if (dh > 0) {
            var di = new Object();
            di.message = "Buying " + dh + "\x20" + itemlist[itemlist[dd[0]].needs].name;
            di.page = 'stockpile';
            di.func = "buystockpileStart";
            di.params = [itemlist[dd[0]].needs, dh, dd[2], itemlist[itemlist[dd[0]].needs].stocktype.toLowerCase()];
            di.time = 3;
            boss.actions.buystockpileDepend = di;
        }
    }
    var di = new Object();
    di.message = "Buying " + dd[1] + "\x20" + itemlist[dd[0]].name;
    di.page = 'stockpile';
    di.func = "buystockpileStart";
    di.params = [dd[0], dd[1], dd[2], dd[3].toLowerCase()];
    di.time = 4;
    boss.actions.buystockpile = di;
    if (dd[4]) {
        if (boss.actions[dd[4]]) delete boss.actions[dd[4]];
    }
    boss.save();
    S = false;
    setTimeout(MainStuff, 0);
}
aQ.htUser = htUser;

function htUser(url, dd) {
    if (B != url) {
        var de = new Object();
        de.message = "...resu gnitsiltiH".z();
        de.page = 'hitlist';
        de.func = 'htUser';
        de.params = url;
        de.time = 1;
        boss.actions.hitUser = de;
        boss.save();
        if (location.href != url) location.href = url;
        else P();
    } else {
        var df = document.getElementsByName("bounty")[0].value;
        if ((boss.cash + boss.bank_cash) < df) hitListCurrentUser();
        else {
            Timer.start(Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni/])\"php.od\",noitca@(sniatnoc[mrof//".z())[0], "....resu gnittiH".z(), 0, "hitting", false);
        }
    }
}
aQ.hitListCurrentUser = hitListCurrentUser;

function hitListCurrentUser() {
    if (boss.actions.bank_withdraw) delete boss.actions.bank_withdraw;
    if (boss.actions.hitUser) delete boss.actions.hitlistUser;
    var dd = document.getElementsByName("bounty")[0].value;
    if ((boss.cash + boss.bank_cash) < dd) {
        var message = document.getElementById(ae('hitCuser'));
        if (message) message.innerHTML = ">retnec/<>tnof/<>rb<.tsiltih eht no bom siht tup ot yenom hguone evah t'nod uoY>eulb=roloc tnof<>retnec<".z();
        return;
    } else htUser(B, null);
}
aQ.RgUser = RgUser;

function RgUser(url, dd) {
    if (B != url) {
        var de = new Object();
        de.message = "...noitingi s'bom gniggiR".z();
        de.page = 'hitlist';
        de.func = 'RgUser';
        de.params = url;
        de.time = 1;
        boss.actions.RigUser = de;
        boss.save();
        if (location.href != url) location.href = url;
        else P();
    } else {
        var df = Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni/../]\"noitingi_gir\"=eulav@ dna \"noitca\"=eman@[tupni//".z());
        var dg = df[0].value;
        if (dg) dg = dg.replace(/<[^>]*>/g, '');
        if (dg) dg = dg.replace(/[, \t]/g, '');
        if (dg) dg = dg.match(/\d+/);
        if (dg) dg = dg[0];
        if (!isNaN(dg)) {
            if ((boss.cash + boss.bank_cash) < dg) {
                RigCurrentUser();
            } else {
                df[0].click();
            }
        }
    }
}
aQ.RigCurrentUser = RigCurrentUser;

function RigCurrentUser() {
    if (boss.actions.bank_withdraw) delete boss.actions.bank_withdraw;
    if (boss.actions.RigUser) delete boss.actions.RigUser;
    var dd = Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni/../]\"noitingi_gir\"=eulav@ dna \"noitca\"=eman@[tupni//".z());
    var de = dd[0].value;
    if (de) de = de.replace(/<[^>]*>/g, '');
    if (de) de = de.replace(/[, \t]/g, '');
    if (de) de = de.match(/\d+/);
    if (de) de = de[0];
    if (!isNaN(de)) {
        if ((boss.cash + boss.bank_cash) < de) {
            var message = document.getElementById(ae('hitCuser'));
            if (message) message.innerHTML = ">retnec/<>tnof/<>rb<.noitingi s'bom siht giR ot yenom hguone evah t'nod uoY>eulb=roloc tnof<>retnec<".z();
            return;
        } else {
            RgUser(B, null);
        }
    }
}
function datadisplay_getFightItems(dd) {
    var de;
    var df = new Object();
    var dg = ['weapon', 'armor', 'vehicle'];
    for (var dh = 0; dh < dg.length; dh++) {
        var di = boss.mobsters;
        var dj = true;
        de = new Object();
        for (var i in cb) {
            if (!cb[i] || !itemlist[i]) continue;
            var dk;
            if (itemlist[i].stocktype == 'power_item') {
                dk = 'weapon';
                if (i.match(cn)) {
                    dk = 'vehicle';
                }
                if (i.match(cp)) {
                    dk = 'armor';
                }
            } else {
                dk = itemlist[i].stocktype;
            }
            if (itemlist[i].type != 'stockpile' || dk != dg[dh]) continue;
            if (!itemlist[i].attack && !itemlist[i].defense) continue;
            de[i] = cb[i];
        }
        while (di && de.toSource() != '({})') {
            var dl = 0,
                dn = undefined,
                dp, dq = 0;
            max_attack = 0;
            if (dd == 'defense') {
                for (dn in de) {
                    if (itemlist[dn].defense < dq) continue;
                    if ((itemlist[dn].defense > dq) || !dp || ((itemlist[dn].defense == dq) && (itemlist[dp].stocktype != 'power_item'))) {
                        dq = itemlist[dn].defense;
                        dp = dn;
                    }
                }
            }
            if (dd == 'attack') {
                for (dn in de) {
                    if (itemlist[dn].attack < max_attack) continue;
                    if ((itemlist[dn].attack > max_attack) || !dp || ((itemlist[dn].attack == max_attack) && (itemlist[dp].stocktype != 'power_item'))) {
                        max_attack = itemlist[dn].attack;
                        dp = dn;
                    }
                }
            }
            if (dd == 'general') {
                for (dn in de) {
                    if (itemlist[dn].price < dl) continue;
                    dl = itemlist[dn].price;
                    dp = dn;
                }
            }
            var dr = Math.min(di, de[dp]);
            df[dp] = dr;
            di -= dr;
            delete de[dp];
        }
    }
    return df;
}
function datadisplay_getFightPower(dd, de) {
    var df = 0;
    if (dd != 'attack' && dd != 'defense') return;
    if (dd == 'attack') {
        df = boss.attack_strength * (boss.mobsters);
    } else {
        df = boss.defense_strength * (boss.mobsters);
    }
    var dg;
    for (dg in de) {
        df += itemlist[dg][dd] * de[dg];
    }
    return df;
}
function datadisplay_getMaxMobSize(dd) {
    var de = ['weapon', 'armor', 'vehicle'];
    var df = 1 + 3 * (parseInt(boss.level) - 1);
    for (var dg = 0; dg < de.length; dg++) {
        var dh = 0,
            di = 0;
        for (var i in itemlist) {
            if (itemlist[i].type != 'stockpile' || itemlist[i].stocktype != de[dg]) continue;
            if (itemlist[i].price > dh && itemlist[i].defense != 0) {
                dh = itemlist[i].price;
                di = itemlist[i].defense;
            }
        }
        df += parseInt(di);
    }
    return Math.floor(parseInt(dd) / parseInt(df));
}
var cq = eval(GM_getValue(ad(Y + "bossstuff"), ")}}0:emit,\"ssob ruoy fo sretemarap kcatta gnikcehC\":egassem,\"ssob\":egap{:kcatta_ssob,}0:emit,\"ssob ruoy fo epyt dna eman gnikcehC\":egassem,\"=di_resu\":smarap_lru,\"eliforp\":egap{:epyt_ssob{(".z()));
var cr = parseInt(GM_getValue(ad(Y + "lcheck"), "\x30"));
var cs;
if (cq.boss_attack.time < new Date().getTime()) {
    cs = 10800000;
    if (V) cs = 10000;
} else {
    cs = 302400000;
}
function datadisplay_ROR() {
    var dd = boss.total_income + boss.job_income - boss.total_upkeep;
    for (var de in itemlist) {
        if (itemlist[de].type != 'city') continue;
        if (Page.c_params['show_loc']) {
            if (itemlist[de].city != Page.c_params['show_loc']) continue;
        } else {
            if (itemlist[de].city != Page.loc) continue;
        }
        var df = itemlist[de].depends;
        if (df.length) {
            df = itemlist[df].price;
        } else {
            df = 0;
        }
        var dg = df + Math.floor(itemlist[de].price * (10 + cb[de]) / 10);
        var dh = (100 * (itemlist[de].income / dg));
        var di = '<br/>ROR: ' + dh.toFixed(7);
        var dj = di.length;
        itemlist[de].roi = dh;
        while (dj < 16) {
            di += '&nbsp;';
            dj++;
        }
        di += '<br/>';
        var dk = 100 * (11 + cb[de]) / (10 + cb[de]) - 100;
        itemlist[de].inflation = dk;
        var dl = Math.ceil(dk / dh);
        var dn = Math.ceil(dg / dd);
        var dp = 1;
        if (dn <= dl) dp = ag.CityPurchase;
        if (dp == 1 && (boss.cash + boss.bank_cash) >= dg) dp = Math.floor((boss.cash + boss.bank_cash) / dg);
        if (dp > ag.CityPurchase) dp = parseInt(ag.CityPurchase);
        var dq = Utils.getElementsByXPath('//a[@name="' + de + "]2 = )(noitisop[dt/../../]\"".z())[0];
        var input;
        if (dq) {
            input = Utils.getElementsByXPath("]\"ytq\"=eman@[tupni//..".z(), dq)[0];
        }
        if (input) {
            input.value = dp;
        }
        itemlist[de].best_qty = dp;
        dg = dp * Math.floor(itemlist[de].price * (10 + cb[de]) / 10);
        if (itemlist[de].depends.length) {
            df = itemlist[de].depends;
            var dr;
            dp - cb[df] >= 0 ? dr = dp - cb[df] : dr = 0;
            dg += dr * itemlist[df].price;
        }
        dg -= boss.cash + boss.bank_cash;
        dn = Math.ceil(dg / dd);
        if (dn < 0) dn = 0;
        di += " :tfel snruT".z() + dn + '&nbsp';
        itemlist[de].turns_purchase = dn;
        if (dq) {
            var ds = document.getElementById(ae("yalpsiD_ROR HAWMBF".z() + de));
            if (ds) ds.parentNode.removeChild(ds);
            var dt = document.createElement('span');
            dt.id = ad("yalpsiD_ROR HAWMBF".z() + de);
            dt.innerHTML = di;
            dq.appendChild(dt);
        }
    }
    itemlist.save();
}
function datadisplay_getUpgrade(dd, de, df) {
    if (de != 'attack' && de != 'defense' && de != 'total') throw new TypeError();
    var dg;
    if (de == 'attack') {
        dg = 'defense';
    } else {
        dg = 'attack';
    }
    var dh = [0, 'item_14', Infinity];
    var di = boss.mobsters;
    var dj = 0;
    var dk;
    var dl = 0;
    for (var dn in itemlist) {
        if ((dn != 'item_1010') && (itemlist[dn].type == 'stockpile')) {
            if ((itemlist[dn].stocktype == df) || ((df == 'armor') && dn.match(cp)) || ((df == 'vehicle') && dn.match(cn)) || ((df == 'weapon') && (itemlist[dn].stocktype == 'power_item') && (!dn.match(cn)) && (!dn.match(cp)))) {
                if (itemlist[itemlist[dn].needs] && (itemlist[itemlist[dn].needs].stocktype == 'power_item')) {
                    if (!cb[itemlist[dn].needs]) continue;
                } else if (!itemlist[dn].needs.match(/Nothing/i) && !itemlist[itemlist[dn].needs]) continue;
                if (dk == undefined) {
                    if (itemlist[dn].price == 0) continue;
                    dk = dn;
                    continue;
                }
                if (de == 'attack') {
                    if (itemlist[dn].price == 0) continue;
                    if (itemlist[dk].attack > itemlist[dn].attack) continue;
                }
                if (de == 'defense') {
                    if (itemlist[dn].price == 0) continue;
                    if (itemlist[dk].defense > itemlist[dn].defense) continue;
                }
                if (de == 'total') {
                    if (itemlist[dn].price == 0) continue;
                    if (itemlist[dk].price > itemlist[dn].price) continue;
                }
                dk = dn;
            }
        }
    }
    if (dk && (dk != undefined)) {
        for (var dn in cb) {
            if (itemlist[dn]) {
                if (itemlist[dn].type == 'stockpile') {
                    if ((itemlist[dn].stocktype == df) || ((df == 'armor') && dn.match(cp)) || ((df == 'vehicle') && dn.match(cn)) || ((df == 'weapon') && (itemlist[dn].stocktype == 'power_item') && (!dn.match(cn)) && (!dn.match(cp)))) {
                        if (dk == dn) continue;
                        if (de == 'attack') {
                            if (itemlist[dk].attack > itemlist[dn].attack) continue;
                            if ((itemlist[dk].attack == itemlist[dn].attack) && (itemlist[dk].upkeep <= itemlist[dn].upkeep)) continue;
                            dl += cb[dn];
                            continue;
                        }
                        if (de == 'defense') {
                            if (itemlist[dk].defense > itemlist[dn].defense) continue;
                            if ((itemlist[dk].defense == itemlist[dn].defense) && (itemlist[dk].upkeep <= itemlist[dn].upkeep)) continue;
                            dl += cb[dn];
                            continue;
                        }
                        if (de == 'total') {
                            if (itemlist[dk].price > itemlist[dn].price) continue;
                            if ((itemlist[dk].price == itemlist[dn].price) && (itemlist[dk].upkeep <= itemlist[dn].upkeep)) continue;
                            dl += cb[dn];
                            continue;
                        }
                    }
                }
            }
        }
        dh[0] = (di - cb[dk]) - dl;
        if (dh[0] < 0) dh[0] = 0;
        dh[1] = dk;
        if (itemlist[itemlist[dk].needs] && (itemlist[itemlist[dk].needs].stocktype == 'power_item')) {
            if (cb[itemlist[dk].needs]) {
                if (cb[itemlist[dk].needs] < dh[0]) dh[0] = cb[itemlist[dk].needs];
            } else {
                dh[0] = 0;
            }
        }
        if (dh[0] < 0) dh[0] = 0;
    }
    return dh;
}
function datadisplay_NotUsed(dd, de) {
    var df = new Array();
    var dg;
    for (var dh in itemlist) {
        if (itemlist[dh].type != 'stockpile') continue;
        if (dd[dh] == undefined) dd[dh] = 0;
        if (dg = (cb[dh] - dd[dh])) {
            df.push(dh + '\x2c' + dg);
        }
    }
    var di = new Array();
    var dg;
    for (var dj in itemlist) {
        if (itemlist[dj].type != 'stockpile') continue;
        if (de[dj] == undefined) de[dj] = 0;
        if (dg = (cb[dj] - de[dj])) {
            di.push(dj + '\x2c' + dg);
        }
    }
    var dk = new Array();
    for (var x = 0; x < df.length; x++) {
        for (var y = 0; y < di.length; y++) {
            var dl = df[x].split('\x2c');
            var dn = di[y].split('\x2c');
            if (dl[0] == dn[0]) {
                if (dl[1] == dn[1]) {
                    dk.push(dl[1] + "\x20" + itemlist[dl[0]].name + (dl[1] == 1 ? '' : '\x73'));
                } else if (dl[1] < dn[1]) {
                    dk.push(dl[1] + "\x20" + itemlist[dl[0]].name + (dl[1] == 1 ? '' : '\x73'));
                } else if (dl[1] > dn[1]) {
                    dk.push(dn[1] + "\x20" + itemlist[dn[0]].name + (dn[1] == 1 ? '' : '\x73'));
                }
                break;
            }
        }
    }
    return dk.join(', ');
}
function ct(dd) {
    var de = new Array();
    var df;
    for (var dg in itemlist) {
        if (itemlist[dg].type != 'stockpile') continue;
        if (dd[dg] == undefined) dd[dg] = 0;
        if (df = (cb[dg] - dd[dg])) {
            de.push(df + "\x20" + itemlist[dg].name + (df == 1 ? '' : '\x73'));
        }
    }
    return de.join(', ');
}
function cu() {
    ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
    if (ag.hitlist_active == false) {
        ag.hitlist_active = true;
    } else {
        ag.hitlist_active = false;
    }
    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
    P();
}
function HitListToggle() {
    return function () {
        cu();
    };
}
function cv() {
    ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
    if (ag.LevelPart == false) {
        ag.LevelPart = true;
    } else {
        ag.LevelPart = false;
    }
    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
    var dd = eval(GM_getValue(ad(Y + 'LevelingPartner'), '({})'));
    dd.Position = 0;
    dd.StaminaUsed = 0;
    dd.running = false;
    GM_setValue(ad(Y + 'LevelingPartner'), dd.toSource());
    P();
}
function LPToggle() {
    return function () {
        cv();
    };
}
function cw() {
    ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
    if (ag.fight_active == false) {
        ag.fight_active = true;
    } else {
        ag.fight_active = false;
        ag.override = false;
    }
    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
    P();
}
function FighterToggle() {
    return function () {
        cw();
    };
}
Fights = new Object();
Fights.init = function () {
    this.handlers = new Array();
    this.div = document.createElement('div');
    this.div.id = ad('FightsDiv');
    this.div.className = ad("sthgif-mg-koobecaf".z());
    var dd = '\x2e' + ae("sthgif-mg-koobecaf".z()) + ";enon :yalpsid ;thgir:ngila-txet ;%001:thgieh_;debme:idib-edocinu;rtl:noitcerid;tfel:ngila-txet;0:gniddap;0:nigram;333#:roloc;xp11:ezis-tnof;fires-snas,laira,anadrev,amohat,\"ednarg adicul\":ylimaf-tnof;fff#:dnuorgkcab{ ".z() + " :thgieh-nim ;xp046 :htdiw ;xp0 :gniddap ;kcalb dilos xp0 :redrob ;otua :thgir-nigram ;otua :tfel-nigram ".z() + (pageHeight() - 120) + "} ;dlob:thgiew-tnof ;xp0:gniddap ;8995B3#:roloc ;EEEEEE#:roloc-dnuorgkcab ;lairA :ylimaf-tnof ;xp".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + "} ;FFFFFF# :roloc ;4B48D6# :dnuorgkcab ;retnec:ngila-txet ;tp21 :ezis-tnof { 1h ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + "} ;dilos dilos dilos dilos :elyts-redrob ;xp0 :gniddap ;xp1 :htdiw-redrob { elbat ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' .' + ad("td_l") + "} ;xp0 :gniddap ;xp1 :htdiw-redrob ;tp01 :ezis-tnof ;tfel:ngila-txet { ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' .' + ad("td_r") + "} ;xp0 :gniddap ;xp1 :htdiw-redrob ;tp01 :ezis-tnof ;thgir:ngila-txet { ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' .' + ad("td_h") + "} ;kcalb xp1 dilos :mottob-redrob ;tp01 :ezis-tnof { ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ad("fixedHeader") + "} ;kcolb :yalpsid { rt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' tbody.' + ad("tnetnoCllorcs".z()) + " :thgieh ;xp536 :htdiw ;otua :wolfrevo ;kcolb :yalpsid { ".z() + (pageHeight() - 210) + 'px; }';
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp02 :htdiw { ht ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp91 :htdiw { ht + ht ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp58 :htdiw { ht + ht + ht ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp032 :htdiw { ht + ht + ht + ht ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp54 :htdiw { ht + ht + ht + ht + ht ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp54 :htdiw { ht + ht + ht + ht + ht + ht ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp52 :htdiw { ht + ht + ht + ht + ht + ht + ht ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp57 :htdiw { ht + ht + ht + ht + ht + ht + ht + ht ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp19 :htdiw { ht + ht + ht + ht + ht + ht + ht + ht + ht ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp02 :htdiw { dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp91 :htdiw { dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp58 :htdiw { dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp032 :htdiw { dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp54 :htdiw { dt + dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp54 :htdiw { dt + dt + dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp52 :htdiw { dt + dt + dt + dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp57 :htdiw { dt + dt + dt + dt + dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' thead.' + ae("fixedHeader") + "} ;xp19 :htdiw { dt + dt + dt + dt + dt + dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp02 :htdiw { dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp91 :htdiw { dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp58 :htdiw { dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp032 :htdiw { dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp54 :htdiw { dt + dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp54 :htdiw { dt + dt + dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp52 :htdiw { dt + dt + dt + dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp57 :htdiw { dt + dt + dt + dt + dt + dt + dt + dt ".z();
    dd += '\x2e' + ae("sthgif-mg-koobecaf".z()) + ' tbody.' + ae("tnetnoCllorcs".z()) + "} ;xp57 :htdiw { dt + dt + dt + dt + dt + dt + dt + dt + dt ".z();
    GM_addStyle(dd);
};
Fights.pausingFights = function () {
    pausingFights = 1;
};
Fights.build = function () {
    var dd = GM_getValue(ad(Y + 'fightlist'), '').split('\x7c');
    if (ag.fsort == undefined) ag.fsort = 0;
    var de = '#3B5998';
    var df = '#3B5998';
    var dg = '#3B5998';
    var dh = '#3B5998';
    var di = '#3B5998';
    var dj = '#3B5998';
    var dk = '#3B5998';
    switch ((ag.fsort + '')) {
    case '\x30':
        dg = 'green';
        break;
    case '\x31':
        df = 'green';
        break;
    case '\x32':
        dh = 'green';
        break;
    case '\x33':
        dk = 'green';
        break;
    case '\x34':
        dj = 'green';
        break;
    case '\x35':
        de = 'green';
        break;
    case '\x36':
        di = 'green';
        break;
    default:
        break;
    }
    var dl = '';
    if (location.href.match(/#stop/)) {
        dl = "#stop";
    }
    dd.sort(function (a, b) {
        return sorting(a, b);
    });
    GM_setValue(ad(Y + 'fightlist'), dd.join('\x7c'));
    var dn = '';
    var dp = 0;
    var dq = 0;
    var dr = 0;
    var ds = 0;
    var dt = 0;
    var du;
    dn += "\"=di 0=gnicapsllec \"otua:wolfrevo\"=elyts \"xp046\"=htdiw elbat<>rb<".z() + ad("elbat_sthgif".z()) + "\"=ssalc daeht<>\"".z() + ae("fixedHeader") + '">';
    dn += "\"=ssalc \"retnec\"=ngila ht<>rt<".z() + ae("td_h") + '" id="' + ad("Snpe") + "\"=ssalc \"tfel\"=ngila ht<>ht/<S>\"".z() + ae("td_h") + '" id="' + ad("HL") + "\"=roloc tnof<>a<>\"".z() + de + "\"=ssalc \"tfel\"=ngila ht<>ht/<>a/<>tnof/<LH>\"".z() + ae("td_h") + '" id="' + ad("fdate") + "\"=roloc tnof<>a<>\"".z() + df + "\"=ssalc \"tfel\"=ngila ht<>ht/<>a/<>tnof/<etaD>\"".z() + ae("td_h") + '" id="' + ad("OpName") + "\"=ssalc \"thgir\"=ngila ht<>ht/<>a/<tnenoppO>a<>\"".z() + ae("td_h") + '" id="' + ad("fwins") + "\"=roloc tnof<>a<>\"".z() + dg + "\"=ssalc \"thgir\"=ngila ht<>ht/<>a/<>tnof/<sniW>\"".z() + ae("td_h") + '" id="' + ad("flosses") + "\"=roloc tnof<>a<>\"".z() + dh + "\"=ssalc \"thgir\"=ngila ht<>ht/<>a/<>tnof/<ssoL>\"".z() + ae("td_h") + '" id="' + ad("Experience") + "\"=roloc tnof<>a<>\"".z() + di + "\"=ssalc \"thgir\"=ngila ht<>ht/<>a/<>tnof/<pxE>\"".z() + ae("td_h") + '" id="' + ad("HSR") + "\"=roloc tnof<>a<>\"".z() + dj + "\"=ssalc \"thgir\"=ngila ht<>ht/<>a/<>tnof/<RSH>\"".z() + ae("td_h") + '" id="' + ad("treward") + "\"=roloc tnof<>a<>\"".z() + dk + "\"=ssalc ydobt<>daeht/<>rt/<>ht/<>a/<>tnof/<draweR latoT>\"".z() + ae("tnetnoCllorcs".z()) + '">';
    var dv;
    if (dd.length > 0) {
        for (var victim in dd) {
            if (dd[victim].split('\x3a')[0] != '') {
                du = '\x20';
                if (dd[victim].split('\x3a')[1] != '') {
                    dn += "=di_resu?/eliforp/srawbom/moc.koobecaf.sppa//:ptth'=ferh.noitacol.wodniw\"=kcilcno \"retniop:rosruc\"=elyts rt<".z() + dd[victim].split('\x3a')[1] + dl + '\';">';
                } else {
                    dn += '<tr>';
                }
                if (dd[victim].split('\x3a')[9] != undefined) {
                    du = dd[victim].split('\x3a')[9];
                }
                dn += '<td>' + du + '</td>';
                if (parseInt(dd[victim].split('\x3a')[6]) == 1) {
                    dn += '<td>**</td>';
                } else {
                    dn += '<td></td>';
                }
                dv = 'NR';
                if (dd[victim].split('\x3a')[8] != undefined) {
                    var dw = new Date(parseFloat(dd[victim].split('\x3a')[8]));
                    var dx = dw.getFullYear() + '';
                    var dy = dw.toTimeString() + '';
                    dv = (dw.getMonth() + 1) + '\x2f' + dw.getDate() + '\x20' + dy.substr(0, 5);
                }
                dn += '<td class="' + ae("td_l") + '">' + dv + "\"=ssalc dt<>dt/<".z() + ae("td_l") + '">' + dd[victim].split('\x3a')[0] + '</td>';
                dn += '<td class="' + ae("td_r") + '">';
                var dz = '';
                if (dd[victim].split('\x3a')[11] != undefined) {
                    if (parseInt(dd[victim].split('\x3a')[11]) > 1) dz = ' (' + dd[victim].split('\x3a')[11] + '\x29';
                }
                var dA = '';
                if (dd[victim].split('\x3a')[12] != undefined) {
                    if (parseInt(dd[victim].split('\x3a')[12]) > 1) dA = ' (' + dd[victim].split('\x3a')[12] + '\x29';
                }
                if (dd[victim].split('\x3a')[3] > dd[victim].split('\x3a')[5]) {
                    dn += ">\"neerg\"=roloc tnof<".z() + dd[victim].split('\x3a')[3] + '</font>' + dz + "\"=ssalc dt<>dt/<".z() + ae("td_r") + '">' + dd[victim].split('\x3a')[5] + '' + dA + '</td>';
                } else {
                    dn += dd[victim].split('\x3a')[3] + '' + dz + "\"=ssalc dt<>dt/<".z() + ae("td_r") + ">\"der\"=roloc tnof<>\"".z() + dd[victim].split('\x3a')[5] + '</font>' + dA + '</td>';
                }
                dq += parseInt(dd[victim].split('\x3a')[3]);
                dr += parseInt(dd[victim].split('\x3a')[5]);
                if (dd[victim].split('\x3a')[7] != undefined) ds += parseInt(dd[victim].split('\x3a')[7]);
                if (dd[victim].split('\x3a')[10] != undefined) if (dt < parseInt(dd[victim].split('\x3a')[10])) dt = parseInt(dd[victim].split('\x3a')[10]);
                var dB = 0;
                if (dd[victim].split('\x3a')[7] != undefined) {
                    dB = parseInt(dd[victim].split('\x3a')[7]) / (parseInt(dd[victim].split('\x3a')[3]) + parseInt(dd[victim].split('\x3a')[5]));
                }
                dn += '<td class="' + ae("td_r") + '">' + Math.floor(dB) + '</td>';
                dn += '<td class="' + ae("td_r") + '">' + int_to_dollars(dd[victim].split('\x3a')[2]) + "\"=ssalc dt<>dt/<".z() + ae("td_r") + '">' + int_to_dollars(dd[victim].split('\x3a')[4]) + '</td></tr>';
                var dC;
                if (isNaN(dollars_to_int(dd[victim].split('\x3a')[4]))) {
                    dC = '$0';
                } else {
                    dC = dd[victim].split('\x3a')[4];
                }
                dp += parseInt(dollars_to_int(dC));
            }
        }
    }
    dn += "\"=ssalc daeht<>ydobt/<".z() + ae("fixedHeader") + '"><tr id="' + ad("latot_elbat_sthgif".z()) + "\"=ssalc parwon dt<>dt/<>\";kcalb dilos xp1:pot-redrob\"=elyts dt<>dt/<>2=napsloc \";kcalb dilos xp1:pot-redrob\"=elyts dt<>\"".z() + ae("td_r") + "\"=ssalc parwon dt<>dt/<>\";kcalb dilos xp1:pot-redrob\"=elyts dt<>dt/<>\";kcalb dilos xp1:pot-redrob\"=elyts dt<>dt/<>\";kcalb dilos xp1:pot-redrob\"=elyts dt<>dt/<>\";kcalb dilos xp1:pot-redrob\"=elyts dt<>dt/<:DETCELLOC SDRAWER LATOT>\";kcalb dilos xp1:pot-redrob\"=elyts  \"".z() + ae("td_r") + "\"=di \"neerg:roloc;kcalb dilos xp1:pot-redrob\"=elyts \"".z() + ad("drawer_latot_sthgif".z()) + '">' + int_to_dollars(dp) + ">daeht/<>rt/<>dt/<".z();
    dn += " :sniW latoT>\"%53\"=htdiw 2=napswor dt<>rt<>\"%001\"=htdiw elbat<>vid<>vid/<>elbat/<".z() + dq + " :sessoL latoT>rb<".z() + dr + " :ecneirepxE latoT>\"%04\"=htdiw 2=napswor dt<>dt/<".z() + ds + " :ecneirepxE tsehgiH>rb<".z() + parseInt(GM_getValue(ad(Y + 'HighestExp'), '\x30')) + "\"=di dt<>dt/<".z() + ad("snottuBstatSthgiF".z()) + ">elbat/<>rt/<>dt/<>dt<>rt<>rt/<>dt/<>\"".z();
    this.div.innerHTML = dn;
    var dD = GM_getValue(ad(Y + 'FightList'), "30|35").split('\x7c');
    if (parseInt(dD[1]) < 35) dD[1] = 35;
    GM_setValue(ad(Y + "etats_tsiLthgiF".z()), "max");
    this.divFloat = au.createFloatingDiv(640, dD[0], dD[1], 'left', "V ;2848#&repleH otuA sraWboM>\"lmth.egaPemoH/repleHotuAWM/moc.gnitsohdlroweruces.www//:ptth\"=ferh \"knalb_\"=tegrat \";eulbkrad:roloc\"=elyts a<>1h<".z() + f + ">1h/<tsiL thgiF >a/<".z(), 'FightList', true, true, true);
    this.divFloat.appendChild(this.div);
    this.form = document.createElement('form');
    this.form.action = '';
    this.form.method = '';
    this.form.id = ae("sthgif-mg-koobecaf".z());
    this.div.appendChild(this.form);
    var dE = document.getElementById(ae("snottuBstatSthgiF".z()));
    this.button_clear = document.createElement('button');
    this.button_clear.type = 'button';
    this.button_clear.id = ad("raelc_sthgif".z());
    this.button_clear.innerHTML = "CLEAR";
    if (dd.length > 0) if (dE) dE.appendChild(this.button_clear);
    this.button_close = document.createElement('button');
    this.button_close.type = 'button_close';
    this.button_close.id = ad("esolc_sthgif".z());
    this.button_close.innerHTML = "CLOSE";
    if (dE) dE.appendChild(this.button_close);
    this.button_clear.addEventListener('click', this.eventListener(), true);
    this.button_close.addEventListener('click', this.eventListener(), true);
    this.form.addEventListener('submit', this.eventListener(), true);
    var button = document.getElementById(ae('treward'));
    if (button) button.addEventListener('click', function () {
        ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
        ag.fsort = 3;
        GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
        Fights.build();
    }, false);
    button = document.getElementById(ae('fdate'));
    if (button) button.addEventListener('click', function () {
        ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
        ag.fsort = 1;
        GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
        Fights.build();
    }, false);
    button = document.getElementById(ae('flosses'));
    if (button) button.addEventListener('click', function () {
        ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
        ag.fsort = 2;
        GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
        Fights.build();
    }, false);
    button = document.getElementById(ae('fwins'));
    if (button) button.addEventListener('click', function () {
        ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
        ag.fsort = 0;
        GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
        Fights.build();
    }, false);
    button = document.getElementById(ae('HL'));
    if (button) button.addEventListener('click', function () {
        ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
        ag.fsort = 5;
        GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
        Fights.build();
    }, false);
    button = document.getElementById(ae('HSR'));
    if (button) button.addEventListener('click', function () {
        ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
        ag.fsort = 4;
        GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
        Fights.build();
    }, false);
    button = document.getElementById(ae('Experience'));
    if (button) button.addEventListener('click', function () {
        ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
        ag.fsort = 6;
        GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
        Fights.build();
    }, false);
    button = document.getElementById(ae('OpName'));
    if (button) button.addEventListener('click', function () {
        ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
        ag.fsort = 7;
        GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
        Fights.build();
    }, false);
};
Fights.eventListener = function () {
    var dd = this;
    return function (de) {
        if (this.id == ad("raelc_sthgif".z())) {
            GM_setValue(ad(Y + 'fightlist'), '');
            P();
        }
        de.preventDefault();
        dd.div.style.display = 'none';
        dd.div.parentNode.parentNode.removeChild(dd.div.parentNode);
        pausingFights = 0;
    };
};
Fights.show = function () {
    return function () {
        Fights.pausingFights();
        var dd = document.getElementById(ae('FightsDiv'));
        if (!dd) {
            Fights.init();
            Fights.build();
            dd = document.getElementById(ae('FightsDiv'));
        }
        if (dd) {
            var de = GM_getValue(ad(Y + "etats_tsiLthgiF".z()), "max");
            if (de == "min") dd.style.display = 'none';
            else dd.style.display = 'block';
        }
    };
};

function BankD() {
    return function () {
        if (boss.cash == undefined) boss.cash = 0;
        if (boss.bank_cash == undefined) boss.bank_cash = 0;
        if ((((boss.cash > 0) && (boss.bank_cash >= 2000)) || boss.cash >= 10000) && (boss.cash > ag.cashprotected)) {
            var dd = new Object();
            dd.page = 'bank';
            dd.params = [];
            if (!ag.FastBackgroundBank) {
                if (Page.c_page != dd.page) {
                    dd.message = "...knab eht ot gnioG".z();
                    dd.page = 'bank';
                    dd.func = 'bk_deposit';
                    dd.params = [];
                    dd.time = 1;
                    boss.actions.bank = dd;
                    boss.save();
                    var de;
                    if (Page['bank']) {
                        de = Page['bank'];
                    } else {
                        de = GM_getValue(ad(Y + 'Lbank'), "http://apps.facebook.com/mobwars/bank/");
                    }
                    Timer.start(de, dd.message, 0, 'bank', false);
                    return;
                }
            }
            bk_deposit(dd.params, 0);
        } else {
            var df = document.getElementById(ae("sutatstpircs".z()));
            if (boss.cash <= ag.cashprotected) {
                if (df) {
                    df.innerHTML = ".hsac detcetorp rof tes evah uoy tahw ot lauqe ro neht ssel si hsac ruoY".z();
                    df = document.getElementById(ae('scripttimer'));
                    if (df) df.innerHTML = '';
                }
            } else if (boss.cash == 0) {
                if (df) {
                    df.innerHTML = ".tisoped ot hsac yna evah ton od uoY".z();
                    df = document.getElementById(ae('scripttimer'));
                    if (df) df.innerHTML = '';
                }
            } else {
                if (df) {
                    df.innerHTML = ".tnuocca knab a nepo ot erom ro 000,01$ deen uoY".z();
                    df = document.getElementById(ae('scripttimer'));
                    if (df) df.innerHTML = '';
                }
            }
        }
    };
}
function HealFast(dd) {
    if ((ag.healmode > 0) && (GM_getValue(ad(Y + "laeHlacisyhPdeen".z()), 'false') != 'true') && dd) {
        bE();
        return;
    }
    var de = new Object();
    de.page = 'hospital';
    if (Page.c_page != de.page) {
        de.message = "Healing...";
        de.page = 'hospital';
        de.func = 'hp_heal';
        de.params = [];
        de.time = 1;
        boss.actions.hospitalUser = de;
        boss.save();
        var df;
        if (Page['hospital']) {
            df = Page['hospital'];
        } else {
            df = GM_getValue(ad(Y + 'Lhospital'), "/latipsoh/srawbom/moc.koobecaf.sppa//:ptth".z());
        }
        Timer.start(df, de.message, 0, 'heal', false);
        return;
    }
    if (hospital_updateData()) {
        hp_heal(de.params, 0);
    } else {
        var dg = document.getElementById(ae("sutatstpircs".z()));
        if (boss.bank_cash > boss.heal_cost) {
            if (dg) dg.innerHTML = ".rehtruf yna laeh ton nac uoY".z();
            dg = document.getElementById(ae('scripttimer'));
            if (dg) dg.innerHTML = '<br>';
        } else {
            if (dg) dg.innerHTML = ".elbaliava hsac knab tneiciffusni evah uoY".z();
            dg = document.getElementById(ae('scripttimer'));
            if (dg) dg.innerHTML = '';
        }
    }
}
function cx(dd, de, df) {
    if (ag.fightlistblockauto) {
        if (ag.fightsneeded <= (de + df)) {
            if (ag.fratio >= ((df / (df + de)) * 100)) {
                ba.push(dd);
                GM_setValue(ad(Y + 'fightlistblock'), ba.join('\x2c'));
            }
        }
    }
}
function cy(dd, de, df) {
    if (ag.hitlistblockauto) {
        if (ag.hfightsneeded <= (de + df)) {
            if (ag.hratio >= ((df / (df + de)) * 100)) {
                aV.push(dd);
                GM_setValue(ad(Y + 'hitlistblock'), aV.join('\x2c'));
            }
        }
    }
}
function cz(dd, de) {
    var a = true;
    var df;
    var dg = 0;
    if (parseInt(ag.maxfights) != 0) {
        df = parseInt(ag.maxfights);
    } else {
        return true;
    }
    if (isNaN(df)) {
        var message = document.getElementById(ae('scripterror'));
        if (message) message.innerHTML = ">rb<>retnec/<.gnittes bom rep sthgiF xaM ruoy ni rorrE>retnec<".z();
        aN = true;
        return false;
    }
    for (var i = 0; i < de.length; i++) {
        if (dd == de[i].split('\x3a')[0]) {
            if (de[i].split('\x3a').length > 2) {
                if ((parseInt(de[i].split('\x3a')[2]) + (60 * 1000 * ag.DroneMemTime)) > parseInt(new Date().getTime())) {
                    if (parseInt(de[i].split('\x3a')[1]) > 1) dg += parseInt(de[i].split('\x3a')[1]);
                    else dg++;
                    if (dg >= df) {
                        a = false;
                        break;
                    }
                }
            } else {
                if (dg >= df) {
                    a = false;
                    break;
                }
            }
        }
    }
    return a;
}
function cA(dd, de) {
    var df = new Array();
    var dg = Infinity;
    if (de) {
        for (var i = 0; i < de.length; i++) {
            if (de[i].split('\x3a').length > 2) {
                if ((parseInt(de[i].split('\x3a')[2]) + (60 * 1000 * ag.DroneMemTime)) > parseInt(new Date().getTime())) {
                    df.push(de[i]);
                }
            } else {
                df.push(de[i].split('\x3a')[0] + '\x3a' + parseInt(de[i].split('\x3a')[1]) + '\x3a' + (new Date().getTime()));
            }
        }
    }
    df.push(dd + ':1:' + (new Date().getTime()));
    GM_setValue(ad(Y + 'PrevFights'), df.join('\x7c'));
}
function RecordResults(dd, de, df, dg, dh) {
    if (de == undefined) de = '';
    if (df == undefined) df = 'Unknown';
    if (dg == undefined) dg = 0;
    var di;
    var dj;
    var dk;
    var dl;
    var dn;
    var dp = 0;
    var dq;
    var dr = new Date();
    var ds = dr.getTime();
    var dt;
    if (dh == undefined) dh = '\x20';
    var du = true;
    var dv = new RegExp("<.\)?*]9-0[( ecroF desU uoY".z(), '\x69');
    var dw = new RegExp(".\\)?*.( fo ytnuob eht demialc".z());
    var dx = '',
        dy = '';
    if (boss.fights.paidByhref) dx = boss.fights.paidByhref.split('\x7c');
    if (boss.fights.paidByname) dy = boss.fights.paidByname.split('\x7c');
    if (h) GM_setValue(ad(Y + "kcehCSTLUSER".z()), dd.innerHTML);
    var dz = Utils.getElementsByXPath("]\"rorre_wm\"=ssalc@ ro \"trela\"=ssalc@[vid//.".z(), dd);
    for (var dA = 0; dA < dz.length; dA++) {
        var dB = Utils.getElementsByXPath("vid/.|elbat/.".z(), dz[dA]);
        for (var dC = 0; dC < dB.length; dC++) {
            var dD = dB[dC].innerHTML;
            if (dB[dC].innerHTML.match(/RECORDED/)) {
                if (h) z("....tpmetta gnitrobA  !stluser dedrocer ydaerla drocer ot deirT".z(), 0);
                continue;
            } else dB[dC].innerHTML += ">naps/<DEDROCER>\"enon:yalpsid\"=elyts naps<".z();
            var dE = 'Unknown';
            var dF = '';
            var dG = 0;
            var dH = 0;
            var dI = 1;
            var dJ;
            var dK = 0;
            var dL = dD.match(/Bounty Claimed/i);
            var dM = dD.match(/You killed/i);
            var dN = dD.match(/You hospitalized/i);
            var dO = dD.match(/You Went to the Hospital/i);
            var dP = dD.match(/YOU WIN|YOU WON/i);
            var dQ = dD.match(/YOU WERE DEFEATED|YOU LOST/i);
            if (dJ = dD.match(dv)) dI = parseInt(dJ[1]);
            if ((!dL) && (!dM) && (!dP) && (!dQ)) continue;
            if (dL) {
                dH++;
            } else if (dM) {
                dH++;
            }
            var dR = Utils.getElementsByXPath("\" ,ferh@(sniatnoc(ton dna )\"=di_resu\" ,ferh@(sniatnoc[a/b/vid/vid/dt/rt/ydobt/.".z() + boss.c_user + '"))]', dB[dC - dH]);
            if (dR) {
                dE = dR[0].innerHTML;
                dF = parseInt(dR[0].href.split('user_id=')[1]);
            }
            if (isNaN(dI)) dI = 1;
            if (dL) {
                if (h) GM_setValue(ad(Y + 'RESULTKill'), dd.innerHTML);
                if (dG == 0) {
                    if (dD.match(dw)) dG = parseInt(dD.match(dw)[1].replace(/[\$,]/g, ''));
                }
                du = true;
                var dS = GM_getValue(ad(Y + 'victims'), '').split('\x7c');
                if (dS[0] == '') {
                    dS.splice(0, 1);
                }
                for (victim in dS) {
                    if (dS[victim].split('\x3a')[1] == dF) {
                        if (dS[victim].split('\x3a')[3] != undefined) {
                            if (Math.abs(ds - parseInt(dS[victim].split('\x3a')[3])) < 30000) {
                                du = false;
                            }
                        }
                    }
                }
                if (du == true) {
                    var dT = '',
                        name = '';
                    for (var t = 0; t < dx.length; t++) {
                        if (dF == dx[t].split('\x3b')[0]) {
                            name = dy[t].split('\x3b')[1];
                            dT = dx[t].split('\x3b')[1];
                            break;
                        }
                    }
                    dS.push(dE + '\x3a' + dF + '\x3a' + dG + '\x3a' + ds + '\x3a' + dh + '\x3a' + dI + '\x3a' + name + '\x3a' + dT.replace(/:/g, '{{'));
                    GM_setValue(ad(Y + 'victims'), dS.join('\x7c'));
                    if (h) z('Recording ' + dE + ' kill for ' + dF + '....', 0);
                }
                if (ag.bank_bounty) {
                    var dU = new Object();
                    dU.message = "...knab eht ot gnioG !ytnuoB".z();
                    dU.page = 'bank';
                    dU.func = 'bk_deposit';
                    dU.params = [];
                    dU.time = 1;
                    boss.actions.bank = dU;
                }
            } else if (dM) {
                if (h) GM_setValue(Y + 'RESULTKillF', dd.innerHTML);
                du = true;
                var dS = GM_getValue(ad(Y + 'victims'), '').split('\x7c');
                if (dS[0] == '') {
                    dS.splice(0, 1);
                }
                for (victim in dS) {
                    if (dS[victim].split('\x3a')[1] == dF) {
                        if (dS[victim].split('\x3a')[3] != undefined) {
                            if (Math.abs(ds - parseInt(dS[victim].split('\x3a')[3])) < 30000) {
                                du = false;
                            }
                        }
                    }
                }
                if (du == true) {
                    dh = '\x46';
                    dS.push(dE + '\x3a' + dF + '\x3a' + dG + '\x3a' + ds + '\x3a' + dh + '\x3a' + dI);
                    if (h) z('Recording ' + dE + " rof )ytnuob-non( llik ".z() + dF + '....', 0);
                    GM_setValue(ad(Y + 'victims'), dS.join('\x7c'));
                }
            }
            if (dP) {
                if (h) GM_setValue(Y + 'RESULTWin', dd.innerHTML);
                var dV = Utils.getElementsByXPath("])\"ecneirepxE\" ,eltit@(sniatnoc[gmi//.".z(), dB[dC - dH]);
                if (dV && dV[0]) {
                    var dW = dV[0].parentNode.parentNode.innerHTML;
                    dK = Math.floor(parseInt(dW.match(/<td>\+([0-9]*?)</)[1]) / dI);
                    if (isNaN(dK)) dK = 0;
                    if (dK > parseInt(GM_getValue(ad(Y + 'HighestExp'), '\x30'))) GM_setValue(ad(Y + 'HighestExp'), dK);
                }
                var dX = dD.match(/<b class="ownedItem">(.*?)<\/b>/i);
                if (dX) dp = parseInt(dollars_to_int(dX[1]));
                if (isNaN(dp)) dp = 0;
                var dY = GM_getValue(ad(Y + 'fightlist'), '').split('\x7c');
                if (dY[0] == '') {
                    dY.splice(0, 1);
                }
                if (!isNaN(dK)) {
                    if (dK >= parseInt(ag.droneTargetMinExp)) {
                        var temp = GM_getValue(ad(Y + 'TargetExp'), '').split('\x7c');
                        if (temp[0] == '') {
                            temp.splice(0, 1);
                        }
                        temp.push(dF);
                        if (temp.length > 100) {
                            temp.splice(0, (temp.length - 100));
                        }
                        GM_setValue(ad(Y + 'TargetExp'), temp.join('\x7c'));
                    }
                }
                if (!isNaN(dp)) {
                    if (dp >= parseInt(ag.droneTargetMinMoney)) {
                        var temp = GM_getValue(ad(Y + 'TargetMoney'), '').split('\x7c');
                        if (temp[0] == '') {
                            temp.splice(0, 1);
                        }
                        temp.push(dF);
                        if (temp.length > 100) {
                            temp.splice(0, (temp.length - 100));
                        }
                        GM_setValue(ad(Y + 'TargetMoney'), temp.join('\x7c'));
                    }
                }
                if (boss.FightsTotReward == undefined) boss.FightsTotReward = 0;
                if (ag.bank_fights) {
                    if ((Page.c_page == 'fight') || (Page.c_page == 'profile')) {
                        boss.FightsTotReward += parseInt(dp);
                        if (boss.FightsTotReward >= ag.minimumbank_fights) {
                            var dU = new Object();
                            dU.message = "...sdrawer thgif gnitisopeD".z();
                            dU.page = 'bank';
                            dU.func = 'bk_deposit';
                            dU.params = [];
                            dU.time = 1;
                            boss.actions.bank = dU;
                        }
                    }
                }
                di = 1;
                dj = 0;
                dk = dp;
                dl = 1;
                dn = 0;
                dq = 0;
                if (boss.fights.hitlist || Page.c_page == 'hitlist') {
                    dq = 1;
                }
                var dZ = GM_getValue(ad(Y + 'PrevFights'), '').split('\x7c');
                cA(dF, dZ);
                for (dt in dY) {
                    if (dY[dt].split('\x3a')[0] != '') {
                        if (dE == dY[dt].split('\x3a')[0]) {
                            var ea;
                            if (dY[dt].split('\x3a')[7] == undefined) {
                                ea = 0;
                            } else {
                                ea = parseInt(dY[dt].split('\x3a')[7]);
                            }
                            ea += dK;
                            di = parseInt(dY[dt].split('\x3a')[3]) + parseInt(di);
                            dk = parseInt(dY[dt].split('\x3a')[4]) + parseInt(dk);
                            dn = parseInt(dY[dt].split('\x3a')[5]);
                            if (dp < parseInt(dY[dt].split('\x3a')[2])) {
                                dp = parseInt(dY[dt].split('\x3a')[2]);
                            }
                            var eb = dK;
                            if (dY[dt].split('\x3a')[10] != undefined) {
                                if (eb < parseInt(dY[dt].split('\x3a')[10])) {
                                    eb = parseInt(dY[dt].split('\x3a')[10]);
                                }
                            }
                            var ec = dI;
                            if (dY[dt].split('\x3a')[11] != undefined) {
                                if (ec > parseInt(dY[dt].split('\x3a')[11])) {
                                    ec = parseInt(dY[dt].split('\x3a')[11]);
                                }
                            }
                            var ed = 1;
                            if (dY[dt].split('\x3a')[12] != undefined) {
                                ed = dY[dt].split('\x3a')[12];
                            }
                            dY[dt] = dE + '\x3a' + dF + '\x3a' + dp + '\x3a' + di + '\x3a' + dk + '\x3a' + dn + '\x3a' + parseInt(dY[dt].split('\x3a')[6]) + '\x3a' + ea + '\x3a' + ds + '\x3a' + dh + '\x3a' + eb + '\x3a' + ec + '\x3a' + ed;
                            dl = 0;
                        }
                    }
                }
                if (dl) {
                    dY.push(dE + '\x3a' + dF + '\x3a' + dp + '\x3a' + di + '\x3a' + dk + '\x3a' + dn + '\x3a' + dq + '\x3a' + dK + '\x3a' + ds + '\x3a' + '\x20' + '\x3a' + dK + '\x3a' + dI + ':1');
                }
                GM_setValue(ad(Y + 'fightlist'), dY.join('\x7c'));
                if (h) z(" no niw thgif gnidroceR".z() + dE + ' for ' + dF + '....', 0);
            } else if (dQ) {
                if (h) GM_setValue(Y + 'RESULTLost', dd.innerHTML);
                var dY = GM_getValue(ad(Y + 'fightlist'), '').split('\x7c');
                if (dY[0] == '') {
                    dY.splice(0, 1);
                }
                if (ag.PredictiveAvoid) {
                    var ee;
                    if (dQ) ee = dQ;
                    else ee = lostOLD;
                    var ef = parseInt(ee[1]);
                    var eg = parseInt(ee[2]);
                    var eh = Infinity;
                    var ei = ((ef + eg + 1) / 0.3);
                    if (ei < boss.max_health) {
                        eh = (((ef + 2) / 2) * ((ef + 2) / eg));
                    } else {
                        eh = ((ef / 2) * (ef / (eg + 2)));
                    }
                    if (eh < parseInt(ag.droneMinExp)) {
                        var temp = GM_getValue(ad(Y + "diovApxEevitciderP".z()), '').split('\x7c');
                        if (temp[0] == '') {
                            temp.splice(0, 1);
                        }
                        temp.push(dF);
                        if (temp.length > 100) {
                            temp.splice(0, (temp.length - 100));
                        }
                        GM_setValue(ad(Y + "diovApxEevitciderP".z()), temp.join('\x7c'));
                    }
                }
                di = 0;
                dj = 0;
                dk = 0;
                dl = 1;
                dn = 1;
                dq = 0;
                if (boss.fights.hitlist || Page.c_page == 'hitlist') {
                    dq = 1;
                }
                var dZ = GM_getValue(ad(Y + 'PrevFights'), '').split('\x7c');
                cA(dF, dZ);
                var dV = Utils.getElementsByXPath("])\"ecneirepxE\" ,eltit@(sniatnoc[gmi//.".z(), dB[dC - dH]);
                if (dV && dV[0]) {
                    var dW = dV[0].parentNode.parentNode.innerHTML;
                    dK = Math.floor(parseInt(dW.match(/<td>\+([0-9]*?)</)[1]) / dI);
                    if (isNaN(dK)) dK = 0;
                }
                for (dt in dY) {
                    if (dY[dt].split('\x3a')[0] != '') {
                        if (dE == dY[dt].split('\x3a')[0]) {
                            if (dY[dt].split('\x3a')[7] == undefined) {
                                dK += 0;
                            } else {
                                dK += parseInt(dY[dt].split('\x3a')[7]);
                            }
                            var ej = 0;
                            if (dY[dt].split('\x3a')[10] != undefined) ej = parseInt(dY[dt].split('\x3a')[10]);
                            var ec = 1;
                            if (dY[dt].split('\x3a')[11] != undefined) {
                                ec = dY[dt].split('\x3a')[11];
                            }
                            var ed = dI;
                            if (dY[dt].split('\x3a')[12] != undefined) {
                                if (ed < parseInt(dY[dt].split('\x3a')[12])) {
                                    ed = parseInt(dY[dt].split('\x3a')[12]);
                                }
                            }
                            dn = parseInt(dY[dt].split('\x3a')[5]) + 1;
                            di = parseInt(dY[dt].split('\x3a')[3]);
                            dk = parseInt(dY[dt].split('\x3a')[4]);
                            dY[dt] = dE + '\x3a' + dF + '\x3a' + parseInt(dY[dt].split('\x3a')[2]) + '\x3a' + di + '\x3a' + dk + '\x3a' + dn + '\x3a' + parseInt(dY[dt].split('\x3a')[6]) + '\x3a' + dK + '\x3a' + ds + '\x3a' + dh + '\x3a' + ej + '\x3a' + ec + '\x3a' + ed;
                            dl = 0;
                        }
                    }
                }
                if (dl) {
                    dY.push(dE + '\x3a' + dF + ':0:' + di + '\x3a' + dk + '\x3a' + dn + '\x3a' + dq + '\x3a' + dK + '\x3a' + ds + '\x3a' + '\x20' + ':0:1:' + dI);
                }
                GM_setValue(ad(Y + 'fightlist'), dY.join('\x7c'));
                if (h) z(" tsniaga ssol thgif gnidroceR".z() + dE + ' for ' + dF + '....', 0);
                if (boss.fights.hitlist || Page.c_page == 'hitlist') {
                    if (dF != '') {
                        cy(dF, dn, di);
                    }
                } else {
                    if (dF != '') {
                        cx(dF, dn, di);
                    }
                }
            }
        }
    }
}
function cB(dd) {
    var de;
    if (dd) {
        if (dd.relatedNode) {
            de = dd.relatedNode;
        } else {
            de = document.getElementById(w + 'content');
            if (de) de = Utils.getElementsByClassName("tnemecnuonna".z(), de)[0];
        }
    } else {
        de = document.getElementById(w + 'content');
        if (de) de = Utils.getElementsByClassName("tnemecnuonna".z(), de)[0];
    }
    if (!de) return;
    var df;
    if (df = de.innerHTML.match(/alert">\$(.*?) was automatically deducted from your bank account\./)) {
        boss.bank_cash -= parseInt(dollars_to_int(df[1]));
    }
}
function cC(dd, de) {
    cB(de);
    try {
        bz(dd);
    } catch (df) {}
    var dg;
    if (de) {
        if (de.relatedNode) {
            dg = de.relatedNode;
        } else {
            dg = document.getElementById(w + 'content');
            if (dg) dg = Utils.getElementsByClassName("tnemecnuonna".z(), dg)[0];
        }
    } else {
        dg = document.getElementById(w + 'content');
        if (dg) dg = Utils.getElementsByClassName("tnemecnuonna".z(), dg)[0];
    }
    if (!dg) return;
    RecordResults(dg);
    if ((boss.fights) && (boss.fights.target_id) && (boss.fights.paidByhref) && ((boss.fights.target_id != '') || (boss.fights.paidByhref.split('\x7c').length == 1))) {
        if (((Page.c_page == 'fight') && (dg.innerHTML.match(/this user is too weak to fight/i) || dg.innerHTML.match(/This user is currently too weak to fight/i) || dg.innerHTML.match(/someone who is in your own mob/i) || dg.innerHTML.match(/can not fight/i) || dg.innerHTML.match(/This user has already been killed/i) || dg.innerHTML.match(/were unable to attack/i))) || ((Page.c_page == 'hitlist') && dg.innerHTML.match(/someone who is in your own mob/i))) {
            var dh;
            if (boss.fights.target_id) dh = boss.fights.target_id;
            else {
                if (boss.fights.paidByhref.split('\x7c').length == 1) {
                    dh = boss.fights.paidByhref.split('\x7c')[0].split('\x3b')[0];
                }
            }
            if (dh) {
                if (dg.innerHTML.match(/this user is too weak to fight/i) || dg.innerHTML.match(/This user is currently too weak to fight/i)) {
                    var temp = GM_getValue(ad(Y + "thgiFoTkaeWooT".z()), '').split('\x7c');
                    if (temp[0] == '') {
                        temp.splice(0, 1);
                    }
                    temp.push(dh);
                    if (temp.length > ag.TooWeakMemory) {
                        temp.splice(0, (temp.length - ag.TooWeakMemory));
                    }
                    GM_setValue(ad(Y + "thgiFoTkaeWooT".z()), temp.join('\x7c'));
                } else if (dg.innerHTML.match(/someone who is in your own mob/i)) {
                    var temp = GM_getValue(ad(Y + 'InYourMob'), '').split('\x7c');
                    if (temp[0] == '') {
                        temp.splice(0, 1);
                    }
                    temp.push(dh);
                    aU = temp;
                    GM_setValue(ad(Y + 'InYourMob'), temp.join('\x7c'));
                } else if (Page.c_page == 'fight') {
                    var di;
                    if (Page['fight']) {
                        di = Page['fight'];
                    } else {
                        di = GM_getValue(ad(Y + 'Lfight'), "/thgif/srawbom/moc.koobecaf.sppa//:ptth".z());
                    }
                    Timer.start(P, "...egap thgif gnidaoleR".z() + aj("kcatta ot elbanu".z()), ay(ag.FDdelay, 1, 1), 'drone', false, function () {
                        X = false;
                    }, 1, 0);
                    aO = true;
                    return;
                }
            }
        }
    }
}
function Vsorting(a, b) {
    if (a.split('\x3a')[0] == '') return -1;
    if (b.split('\x3a')[0] == '') return 1;
    var x = 0;
    var dd = 0;
    var de = 0;
    if (b.split('\x3a')[3] != undefined) dd = parseFloat(b.split('\x3a')[3]);
    if (a.split('\x3a')[3] != undefined) de = parseFloat(a.split('\x3a')[3]);
    x = (dd - de);
    return x;
}
function sorting(a, b) {
    if (ag.fsort == undefined) ag.fsort = 0;
    if (a.split('\x3a')[0] == '') return -1;
    if (b.split('\x3a')[0] == '') return 1;
    var x = 0;
    if (ag.fsort == 0) {
        x = (b.split('\x3a')[3] - a.split('\x3a')[3]);
        if (x == 0) {
            x = (b.split('\x3a')[4] - a.split('\x3a')[4]);
        }
    } else if (ag.fsort == 1) {
        var dd = 0;
        var de = 0;
        if (b.split('\x3a')[8] != undefined) dd = parseFloat(b.split('\x3a')[8]);
        if (a.split('\x3a')[8] != undefined) de = parseFloat(a.split('\x3a')[8]);
        x = (dd - de);
    } else if (ag.fsort == 2) {
        x = (b.split('\x3a')[5] - a.split('\x3a')[5]);
        if (x == 0) {
            x = (b.split('\x3a')[4] - a.split('\x3a')[4]);
        }
    } else if (ag.fsort == 3) {
        x = (dollars_to_int(b.split('\x3a')[4]) - dollars_to_int(a.split('\x3a')[4]));
        if (x == 0) {
            x = (b.split('\x3a')[7] - a.split('\x3a')[7]);
        }
    } else if (ag.fsort == 4) {
        x = (dollars_to_int(b.split('\x3a')[2]) - dollars_to_int(a.split('\x3a')[2]));
        if (x == 0) {
            x = (b.split('\x3a')[4] - a.split('\x3a')[4]);
        }
    } else if (ag.fsort == 5) {
        x = (b.split('\x3a')[6] - a.split('\x3a')[6]);
        if (x == 0) {
            x = (b.split('\x3a')[4] - a.split('\x3a')[4]);
        }
    } else if (ag.fsort == 6) {
        var df = 0;
        var dg = 0;
        if (b.split('\x3a')[7] != undefined) df = parseInt(b.split('\x3a')[7]);
        if (a.split('\x3a')[7] != undefined) dg = parseInt(a.split('\x3a')[7]);
        x = ((df / (parseInt(b.split('\x3a')[3]) + parseInt(b.split('\x3a')[5]))) - (dg / (parseInt(a.split('\x3a')[3]) + parseInt(a.split('\x3a')[5]))));
        if (x == 0) {
            x = (b.split('\x3a')[4] - a.split('\x3a')[4]);
        }
    } else if (ag.fsort == 7) {
        var dh = [b.split('\x3a')[0], a.split('\x3a')[0]];
        dh.sort();
        if (dh[0] == b.split('\x3a')[0]) {
            x = 1;
        } else {
            x = -1;
        }
    }
    return x;
}
aQ.checkstockpile = checkstockpile;

function checkstockpile() {
    if (!boss.actions.inventory_stockpileW && !boss.actions.inventory_stockpileA && !boss.actions.inventory_stockpileV && !boss.actions.inventory_stockpileP) {
        var dd = new Object();
        if (!Page.type || (Page.type != 'weapon')) {
            dd.page = 'weapon';
            dd.message = "...snopaew gnikcehC".z();
            dd.time = Math.floor(Math.random() * 10131);
            if (dd.time < 5) dd.time = 15;
            dd.save = true;
            dd.SelfDelete = true;
            boss.actions.inventory_stockpileW = dd;
        }
        if (!Page.type || (Page.type != 'armor')) {
            dd = new Object();
            dd.page = 'armor';
            dd.message = "...romra gnikcehC".z();
            dd.time = Math.floor(Math.random() * 10131);
            dd.save = true;
            dd.SelfDelete = true;
            if (dd.time < 5) dd.time = 15;
            boss.actions.inventory_stockpileA = dd;
        }
        if (!Page.type || (Page.type != 'vehicle')) {
            dd = new Object();
            dd.page = 'vehicle';
            dd.message = "...selcihev gnikcehC".z();
            dd.time = Math.floor(Math.random() * 10131);
            dd.save = true;
            dd.SelfDelete = true;
            if (dd.time < 5) dd.time = 15;
            boss.actions.inventory_stockpileV = dd;
        }
        if (!Page.type || (Page.type != 'power_item')) {
            dd = new Object();
            dd.page = 'power_item';
            dd.message = "...smeti rewop gnikcehC".z();
            dd.time = Math.floor(Math.random() * 10131);
            dd.save = true;
            dd.SelfDelete = true;
            if (dd.time < 5) dd.time = 15;
            boss.actions.inventory_stockpileP = dd;
        }
        if (boss.actions.inventory_stockpile) delete boss.actions.inventory_stockpile;
        boss.save();
        S = false;
        setTimeout(MainStuff, 0);
    }
}
function cD() {
    for (var x = 0; x < Page['cities'].length; x++) {
        if (!Page['cities'][x].href.match('help.php')) {
            var dd = Page['cities'][x].href.replace('#stop', '');
            if (dd.match('\x23')) dd = dd.substring(dd.indexOf('\x23'));
            var de = dd.split('show_loc=')[1].split('\x26')[0];
            if (Page.loc != de) {
                if (!boss.actions['citycheck' + de]) {
                    var df = new Object();
                    df.message = "Checking " + de + "...";
                    df.page = de;
                    df.Compare = 'city';
                    df.func = '';
                    df.time = 1;
                    df.save = true;
                    df.SelfDelete = true;
                    df.params = [];
                    boss.actions['citycheck' + de] = df;
                }
            }
        }
    }
}
aQ.checkcities = checkcities;

function checkcities() {
    cD();
    if (boss.actions.inventory_city) delete boss.actions.inventory_city;
    boss.save();
    S = false;
    setTimeout(MainStuff, 0);
}
function cE() {
    for (var x = 0; x < Page['Jobcities'].length; x++) {
        if (!Page['Jobcities'][x].href.match('help.php')) {
            var dd = Page['Jobcities'][x].href.replace('#stop', '');
            if (dd.match('\x23')) dd = dd.substring(dd.indexOf('\x23'));
            var de = dd.split('show_loc=')[1].split('\x26')[0];
            if (Page.loc != de) {
                if (!boss.actions["kcehcboJytic".z() + de]) {
                    var df = new Object();
                    df.message = " ni sboj gnikcehC".z() + de + "...";
                    df.page = 'Job' + de;
                    df.Compare = 'jobs';
                    df.func = '';
                    df.time = 1;
                    df.save = true;
                    df.SelfDelete = true;
                    df.params = [];
                    boss.actions["kcehcboJytic".z() + de] = df;
                }
            }
        }
    }
}
aQ.checkjobs = checkjobs;

function checkjobs() {
    cE();
    if (boss.actions.jobs_check) delete boss.actions.jobs_check;
    boss.save();
    S = false;
    setTimeout(MainStuff, 0);
}
aQ.aC_e = aC_e;

function aC_e() {
    if (boss.bank_cash == undefined) return;
    if (!ag.autoCityBuy) return;
    if (boss.autoCityBuy_cost == undefined) boss.autoCityBuy_cost = 0;
    if (boss.autoCityBuy_item == undefined) boss.autoCityBuy_item = "";
    if (boss.autoCityBuy_city == undefined) boss.autoCityBuy_city = "";
    if (boss.autoCityBuy_qty == undefined) boss.autoCityBuy_qty = 0;
    if (Page.c_page == 'city') {
        if (!autoCityBuy_getBestBuy()) {
            return;
        }
    }
    if ((boss.autoCityBuy_cost == 0 || boss.autoCityBuy_item == "" || boss.autoCityBuy_city == "")) {
        if (!boss.actions.inventory_city) {
            if (!Page['cities']) {
                var dd = new Object();
                dd.message = "...esahcrup ytic txen gnikcehC".z();
                dd.page = 'city';
                dd.func = 'checkcities';
                dd.params = [];
                if (boss.new_level) {
                    dd.time = Page.now + Math.floor(Math.random() * 31);
                } else {
                    dd.time = 1;
                }
                boss.actions.inventory_city = dd;
                return;
            } else {
                cD();
                return;
            }
        }
        return;
    }
    if (boss.actions.hitlistUser || boss.actions.hitlistUserNav) {
        if (boss.actions.autoCityBuy) delete boss.actions.autoCityBuy;
        if (boss.actions.autoCityBuyGo) delete boss.actions.autoCityBuyGo;
        return;
    }
    if (boss.actions.inventory_city || boss.actions.citychecknew_york || boss.actions.citycheckchicago || boss.actions.citychecklondon || boss.actions.citycheckvegas || boss.actions.citycheckmoscow || boss.actions.citycheckdubai || boss.actions.citycheckshanghai || boss.actions.citychecktokyo) return;
    var money;
    var de = boss.cash - ag.cashprotected;
    if (ag.autoCityBuy_withBank && boss.bank_cash > ag.bankrestricted) money = de + (boss.bank_cash - ag.bankrestricted);
    else money = de;
    if (boss.autoCityBuy_qty > 0) {
        if (boss.autoCityBuy_cost <= money) {
            if ((boss.autoCityBuy_cost <= de) || (parseInt(ag.cashprotected) == 0)) {
                if (boss.actions.bank) {
                    boss.actions.bank.time += 5;
                }
                if (boss.actions.bank_checkdelay) {
                    delete boss.actions.bank_checkdelay;
                }
                if (!boss.actions.autoCityBuyGo) {
                    var df = new Object();
                    df.message = "...ytreporp gniyuB".z();
                    df.page = 'city';
                    df.func = 'aC_buyPropertyStart';
                    df.params = boss.autoCityBuy_city;
                    df.time = 2;
                    boss.actions.autoCityBuy = df;
                }
            } else {
                if (ag.autoCityBuy_withBank) {
                    if (boss.actions.bank) {
                        boss.actions.bank.time += 5;
                    }
                    if (boss.actions.bank_checkdelay) {
                        delete boss.actions.bank_checkdelay;
                    }
                    var dg = new Object();
                    dg.message = "...knab eht ot gnioG".z();
                    dg.page = 'bank';
                    dg.func = 'bk_withdraw';
                    dg.params = boss.autoCityBuy_cost - de;
                    dg.time = 1;
                    boss.actions.autoCityBuy = dg;
                }
            }
        }
    }
}
aQ.aC_buyPropertyStart = aC_buyPropertyStart;

function aC_buyPropertyStart(dd) {
    if (Page.c_page == 'city') {
        if (Page.loc != dd) {
            var de = new Object();
            de.message = "...ytreporp gniyuB".z();
            de.page = dd;
            de.Compare = 'city';
            de.func = 'aC_buyProperty';
            de.time = 2;
            boss.actions.autoCityBuyGo = de;
            boss.save();
            var df;
            if (Page[dd]) {
                df = Page[dd];
            } else {
                df = GM_getValue(ad(Y + '\x4c' + dd), "=col_wohs?/ytic/srawbom/moc.koobecaf.sppa//:ptth".z() + boss.autoCityBuy_city);
            }
            Timer.start(df, de.message, de.time, 'AutoCity', false);
        } else {
            aC_buyProperty();
        }
    }
}
function autoCityBuy_getBestBuy() {
    boss.autoCityBuy_item = "";
    boss.autoCityBuy_qty = 0;
    boss.autoCityBuy_cost = 0;
    if (boss.bank_cash == undefined) {
        var dd = new Object();
        dd.message = "...knab eht ot gnioG".z();
        dd.page = 'bank';
        dd.func = '';
        dd.params = [];
        dd.time = 1;
        boss.actions.bank = dd;
        return false;
    }
    var de = 0;
    var money = 0;
    var df = boss.cash - ag.cashprotected;
    if (ag.autoCityBuy_withBank && boss.bank_cash > ag.bankrestricted) money = df + (boss.bank_cash - ag.bankrestricted);
    else money = df;
    for (var dg in itemlist) {
        if (itemlist[dg].type == 'city') {
            if (itemlist[dg].roi >= de) {
                if (itemlist[dg].roi == de) {
                    if (boss.autoCityBuy_cost > 0) {
                        if ((itemlist[dg].cost * itemlist[dg].best_qty) > money) {
                            if ((boss.autoCityBuy_cost < money) || (boss.autoCityBuy_cost < (itemlist[dg].cost * itemlist[dg].best_qty))) {
                                continue;
                            }
                        }
                    }
                }
                if (ag.maxland) {
                    if ((itemlist[dg].name == "Empty Lot") && ((parseInt(itemlist[dg].best_qty) + parseInt(cb[dg])) > parseInt(ag.CityPurchase))) continue;
                    if ((itemlist[dg].name == "City Block") && ((parseInt(itemlist[dg].best_qty) + parseInt(cb[dg])) > parseInt(ag.CityPurchase))) continue;
                    if ((itemlist[dg].name == "erauqS nwotnwoD".z()) && ((parseInt(itemlist[dg].best_qty) + parseInt(cb[dg])) > parseInt(ag.CityPurchase))) continue;
                    if ((itemlist[dg].name == "toL tnorfhcaeB".z()) && ((parseInt(itemlist[dg].best_qty) + parseInt(cb[dg])) > parseInt(ag.CityPurchase))) continue;
                }
                if (itemlist[dg].depends != '') {
                    var dh = itemlist[dg].depends;
                    if (itemlist[dg].best_qty > cb[dh]) {
                        boss.autoCityBuy_item = itemlist[dh].itemn;
                        boss.autoCityBuy_city = itemlist[dh].city;
                        boss.autoCityBuy_name = itemlist[dh].name;
                        boss.autoCityBuy_cost = itemlist[dh].cost * (itemlist[dg].best_qty - cb[dh]);
                        boss.autoCityBuy_qty = (itemlist[dg].best_qty - cb[dh]);
                        de = itemlist[dg].roi;
                        continue;
                    }
                }
                de = itemlist[dg].roi;
                boss.autoCityBuy_item = itemlist[dg].itemn;
                boss.autoCityBuy_city = itemlist[dg].city;
                boss.autoCityBuy_name = itemlist[dg].name;
                boss.autoCityBuy_cost = itemlist[dg].cost * itemlist[dg].best_qty;
                boss.autoCityBuy_qty = itemlist[dg].best_qty;
            }
        }
    }
    if (boss.autoCityBuy_qty > ag.CityPurchase) boss.autoCityBuy_qty = ag.CityPurchase;
    if (ag.autoCityBuy_withBank && boss.bank_cash > ag.bankrestricted) money = df + (boss.bank_cash - ag.bankrestricted);
    autocity = document.getElementById(ae("eueuQytiCotuA".z()));
    if (autocity) {
        var di = (boss.autoCityBuy_cost - money);
        if (di < 0) di = 0;
        autocity.innerHTML = 'Buying: ' + boss.autoCityBuy_qty + '\x20' + boss.autoCityBuy_name + ' (in ' + boss.autoCityBuy_city + ') for ' + bj(boss.autoCityBuy_cost) + " :deen llits ,".z() + bj(di);
    }
    return true;
}
aQ.aC_buyProperty = aC_buyProperty;

function aC_buyProperty() {
    if (Page.c_page == 'city') {
        if (boss.autoCityBuy_qty > 0) {
            var dd = document.getElementsByName(boss.autoCityBuy_item)[0];
            if (dd) {
                dd = dd.parentNode.parentNode;
                Array.forEach(dd.getElementsByTagName("INPUT"), function (input) {
                    if (input.name == "qty") input.value = boss.autoCityBuy_qty;
                    if (input.value == "Buy") {
                        Timer.start(input, "Buying " + boss.autoCityBuy_qty + "\x20" + dd.getElementsByTagName("\x42")[0].innerHTML + "s...", (ag.timerdelay - 2), 'AutoCity', false, function () {
                            z("Buying " + boss.autoCityBuy_qty + "\x20" + dd.getElementsByTagName("\x42")[0].innerHTML + "s... in " + (ag.timerdelay - 2), 2);
                            boss.autoCityBuy_item = "";
                            boss.autoCityBuy_cost = 0;
                            boss.save();
                        }, 1);
                    }
                });
            } else Q('homelink', ag.timerdelay, "....gniteser ...rorre ytiCotuA".z());
        }
    } else Q('homelink', ag.timerdelay, "....gniteser ...rorre ytiCotuA".z());
}
function aC_pI(dd) {
    var de = new Array();
    var value = ag.autoCityBuy;
    de.push('<div id="' + ad("aC_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP esahcruP ytiC otuA>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_Ca".z()) + "\"=di rt<>\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z() + ad("autocity") + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("AutoCity") + ">lebal/< :smeti ytic esahcrup yllacitamotuA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AutoCity") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AutoCity") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("AutoCity") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("AutoCity") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("knabwyticotua".z()) + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    value = ag.autoCityBuy_withBank;
    de.push("\"=rof lebal<".z() + ad("knaBytiCotuA".z()) + ">lebal/< :sesahcrup rof yenom knab esU>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("knaBytiCotuA".z()) + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("knaBytiCotuA".z()) + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("knaBytiCotuA".z()) + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("knaBytiCotuA".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push("\"=di rt<>rt/<>dt/<".z() + ad("dnalxamyticotua".z()) + ">2=napsloc dt<>\"".z());
    value = ag.maxland;
    de.push("\"=rof lebal<".z() + ad("dnaLxaMytiCotuA".z()) + ">lebal/< :dnal depolevednu fo sgnidloh timiL>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dnaLxaMytiCotuA".z()) + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dnaLxaMytiCotuA".z()) + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dnaLxaMytiCotuA".z()) + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dnaLxaMytiCotuA".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    value = ag.CityPurchase;
    de.push('<tr id="' + ad("esahcrupytic".z()) + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("CityPurchase") + ">lebal/<:ot pu spuorg ni seitreporp esahcruP>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("CityPurchase") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    de.push('value="' + value + '"/>');
    de.push('</td></tr>');
    de.push('<tr id="' + ad("kcehccalevelwen".z()) + ">2=napsloc dt<>\"".z());
    value = ag.newLevelAcCheck;
    de.push("\"=rof lebal<".z() + ad("newLevelAcCheck") + ">lebal/< :slevel wen ta elbaliava ytreporp wen rof kcehC>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("newLevelAcCheck") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("newLevelAcCheck") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("newLevelAcCheck") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("newLevelAcCheck") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push(">rh<>vid/<>elbat/<".z());
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('aC_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_Ca".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.aC_pH = aC_pH;
aP.aC_pI = aC_pI;

function aC_pH(dd) {
    var input = dd.elements.namedItem(ae('AutoCity'));
    var de = dd.elements.namedItem(ae("knaBytiCotuA".z()));
    var df = dd.elements.namedItem(ae("dnaLxaMytiCotuA".z()));
    var dg = false;
    if (ag.autoCityBuy != input.checked) {
        if (boss.actions.autoCityBuy) delete boss.actions.autoCityBuy;
        if (boss.actions.autoCityBuyGo) delete boss.actions.autoCityBuyGo;
        ag.autoCityBuy = input.checked;
        dg = true;
    }
    input = dd.elements.namedItem(ae('newLevelAcCheck'));
    if (ag.newLevelAcCheck != input.checked) {
        ag.newLevelAcCheck = input.checked;
        dg = true;
    }
    input = parseInt(dd.elements.namedItem(ae('CityPurchase')).value);
    if (isNaN(input) || (input < 0) || (input > 10)) {
        alert("degnahc ton yrtne ,)secnereferP esahcruP ytiC ytuA( tnuoma puorg esahcrup ytic no yrtne dilavnI".z());
        av = true;
    } else {
        if (ag.CityPurchase != input) {
            ag.CityPurchase = input;
            dg = true;
            boss.autoCityBuy_cost = 0;
            boss.autoCityBuy_qty = 0;
            boss.autoCityBuy_item = "";
            boss.save();
        }
    }
    if (ag.autoCityBuy_withBank != de.checked) {
        ag.autoCityBuy_withBank = de.checked;
        dg = true;
    }
    if (ag.maxland != df.checked) {
        ag.maxland = df.checked;
        dg = true;
    }
    var dh = parseInt(dd.elements.namedItem(ae('cashminimum')).value);
    if (isNaN(dh) || (dh < 0)) {
        alert("degnahc ton yrtne ,)secnereferP esahcruP ytiC ytuA( sesahcrup ytiC otuA morf detcetorp hsaC no yrtne dilavnI".z());
        av = true;
    } else {
        if (dh != ag.cashprotected) {
            ag.cashprotected = dh;
            dg = true;
        }
    }
    return dg;
}
aQ.sp_e = sp_e;

function sp_e() {
    if (!ag.autostockpile_active) return;
    if (boss.actions.inventory_stockpile || boss.actions.inventory_stockpileP || boss.actions.inventory_stockpileW || boss.actions.inventory_stockpileA || boss.actions.inventory_stockpileV) {
        boss.oldMobsters = boss.mobsters;
        return;
    }
    if (boss.oldMobsters == undefined) boss.oldMobsters = boss.mobsters;
    if (boss.oldMobsters == boss.mobsters) {
        var dd = eval(GM_getValue(ad(Y + "edargpUnopaeW".z()), "]0,\"enon\",0[".z()));
        var de = eval(GM_getValue(ad(Y + "edargpUromrA".z()), "]0,\"enon\",0[".z()));
        var df = eval(GM_getValue(ad(Y + "edargpUelciheV".z()), "]0,\"enon\",0[".z()));
        if (dd[0] > 0) {
            if (!boss.actions.buystockpile && !boss.actions.buystockpileDepend && !boss.actions.buystockpileStart) {
                if (dd[0] < ag.autostockpile_minimum) dd[0] = ag.autostockpile_minimum;
                if (dd[0] > 100) {
                    dd[0] = 100;
                }
                var dg = parseInt(itemlist[dd[1]].price) * parseInt(dd[0]);
                if (itemlist[dd[1]].needs != 'Nothing') {
                    var dh = (parseInt(dd[0]) - parseInt(cb[itemlist[dd[1]].needs]));
                    if (parseInt(dh) > 0) {
                        dg += (parseInt(itemlist[itemlist[dd[1]].needs].price) * parseInt(dh));
                    }
                }
                if (parseInt(dg) > parseInt(boss.cash)) {
                    if (parseInt(dg) > (parseInt(boss.cash) + parseInt(boss.bank_cash))) {
                        return;
                    }
                }
                if (!ag.bank_active_Any) {
                    var di = new Object();
                    di.message = "...snopaew gniyuB".z();
                    di.page = 'stockpile';
                    di.func = 'buystockpile';
                    di.params = [dd[1], dd[0], ag.timerdelay, 'weapon', 'stockpileweapon'];
                    di.time = 3;
                    boss.actions.stockpileweapon = di;
                }
            }
        } else if (de[0] > 0) {
            if (!boss.actions.buystockpile && !boss.actions.buystockpileDepend && !boss.actions.buystockpileStart) {
                if (de[0] < ag.autostockpile_minimum) de[0] = ag.autostockpile_minimum;
                if (de[0] > 100) {
                    de[0] = 100;
                }
                var dg = parseInt(itemlist[de[1]].price) * parseInt(de[0]);
                if (itemlist[de[1]].needs != 'Nothing') {
                    var dh = (parseInt(de[0]) - parseInt(cb[itemlist[de[1]].needs]));
                    if (parseInt(dh) > 0) {
                        dg += (parseInt(itemlist[itemlist[de[1]].needs].price) * parseInt(dh));
                    }
                }
                if (parseInt(dg) > parseInt(boss.cash)) {
                    if (parseInt(dg) > (parseInt(boss.cash) + parseInt(boss.bank_cash))) {
                        return;
                    }
                }
                if (!ag.bank_active_Any) {
                    var di = new Object();
                    di.message = "...romra gniyuB".z();
                    di.page = 'stockpile';
                    di.func = 'buystockpile';
                    di.params = [de[1], de[0], ag.timerdelay, 'armor', 'stockpilearmor'];
                    di.time = 3;
                    boss.actions.stockpilearmor = di;
                }
            }
        } else if (df[0] > 0) {
            if (!boss.actions.buystockpile && !boss.actions.buystockpileDepend && !boss.actions.buystockpileStart) {
                if (df[0] < ag.autostockpile_minimum) df[0] = ag.autostockpile_minimum;
                if (df[0] > 100) {
                    df[0] = 100;
                }
                var dg = parseInt(itemlist[df[1]].price) * parseInt(df[0]);
                if (itemlist[df[1]].needs != 'Nothing') {
                    var dh = (parseInt(df[0]) - parseInt(cb[itemlist[df[1]].needs]));
                    if (parseInt(dh) > 0) {
                        dg += (parseInt(itemlist[itemlist[df[1]].needs].price) * parseInt(dh));
                    }
                }
                if (parseInt(dg) > parseInt(boss.cash)) {
                    if (parseInt(dg) > (parseInt(boss.cash) + parseInt(boss.bank_cash))) {
                        return;
                    }
                }
                if (!ag.bank_active_Any) {
                    var di = new Object();
                    di.message = "...seclihev gniyuB".z();
                    di.page = 'stockpile';
                    di.func = 'buystockpile';
                    di.params = [df[1], df[0], ag.timerdelay, 'vehicle', 'stockpilevehicle'];
                    di.time = 3;
                    boss.actions.stockpilevehicle = di;
                }
            }
        }
        return;
    }
    var di = new Object();
    di.page = 'stockpile';
    di.func = 'checkstockpile';
    di.message = "...elipkcots gnikcehC ..)s(retsbom weN".z();
    di.time = Page.now;
    boss.actions.inventory_stockpile = di;
    boss.oldMobsters = boss.mobsters;
}
function sp_pI(dd) {
    var value = ag.autostockpile_active;
    var de = new Array();
    de.push('<div id="' + ad("sp_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP elipkcotS otuA>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_ps".z()) + ">\";enon :yalpsid\"=elyts \"".z());
    de.push(">retnec/<segnahc launam yna ekam uoy retfa egap elipkcots yna HSERFER dna ,desuap tpircs eht htiw os od ot erus eb tsael ta ,elipkcots ruoy ot segnahc launam yna ekam ot deen uoy fI>rb<>rb<.knab eht morf sdnuf wardhtiw ot deen uoy fi knab eht fo tuo tnuoma gnorw eht ekat yam dna -- dekcots ylluf bom ruoy peek ot dedeen si >b/<seveileb>b< tpircs eht gnihtyna kcab yub yllacitamotua lliw tI ...smeti gnilles nehw luferac eB>rb<>rb<.secnereferp knab muminim serongi yltnerruC>retnec<".z());
    de.push(">\"%001\"=htdiw elbat<".z());
    de.push('<tr id="' + ad("tcaelipkcotsotua".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("autostockpile_active") + ">lebal/<:dedeen sa tnempiuqe esahcrup yllacitamotuA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("autostockpile_active") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("autostockpile_active") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("autostockpile_active") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("autostockpile_active") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push(".nosaer doog a evah uoy fi 'oN' ot noitpo txen eht tes ylnO  .noitcnuf esahcrup elipkcots otua evoba eht esu uoy fi tnatropmi yreV -- evah uoy tahw swonk syawla tpircs eht taht erusne pleh ot 'seY' ot tes noitpo txen eht peek dluohs uoY>3=napsloc dt<>rt<".z());
    de.push('<tr id="' + ad("kcehcpslevelwen".z()) + ">2=napsloc dt<>\"".z());
    value = ag.newLevelSpCheck;
    de.push("\"=rof lebal<".z() + ad("newLevelSpCheck") + ">lebal/< :slevel wen ta elbaliava smeti rewop/selcihev/romra/snopaew wen rof kcehC>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("newLevelSpCheck") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("newLevelSpCheck") + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("newLevelSpCheck") + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("newLevelSpCheck") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push('</td></tr>');
    de.push('</table>');
    de.push('</div><hr>');
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('sp_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_ps".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.sp_pI = sp_pI;
aP.sp_pH = sp_pH;

function sp_pH(dd) {
    var input = dd.elements.namedItem(ae('autostockpile_active'));
    var de = false;
    if (ag.autostockpile_active != input.checked) {
        ag.autostockpile_active = input.checked;
        if (ag.autostockpile_active) {
            var df = new Object();
            df.page = 'stockpile';
            df.func = 'checkstockpile';
            df.message = "...elipkcotS otuA no gninrut retfa elbaliava elipkcots gnikcehC".z();
            df.time = 1;
            boss.actions.inventory_stockpile = df;
            boss.save();
        }
        de = true;
    }
    input = dd.elements.namedItem(ae('newLevelSpCheck'));
    if (ag.newLevelSpCheck != input.checked) {
        ag.newLevelSpCheck = input.checked;
        de = true;
    }
    return de;
}
function cF() {
    if (isNaN(ag.loglevel)) ag.loglevel = 2;
    if (isNaN(ag.loglength)) ag.loglength = 100;
    if (ag.logstuff == undefined) ag.logstuff = false;
    if (!ag.skillAlloc) ag.skillAlloc = [];
    if (aJ.Retry == undefined) aJ.Retry = true;
    if (aJ.UseIt == undefined) aJ.UseIt = false;
    if (aJ.user == undefined) aJ.user = '';
    if (aJ.pass == undefined) aJ.pass = '';
    if (aJ.sysAnswer == undefined) aJ.sysAnswer = false;
    if (aJ.transid == undefined) aJ.transid = '';
    if (aJ.valid == undefined) aJ.valid = 0;
    if (aJ.MaxRetry == undefined) aJ.MaxRetry = 15;
    if ((aJ.MaxRetry < 5) && (aJ.MaxRetry != 0)) aJ.MaxRetry = 5;
    if (aJ.Retries == undefined) aJ.Retries = 0;
    if (isNaN(aJ.MinTime)) aJ.MinTime = 4;
    if (isNaN(aJ.MaxTime)) aJ.MaxTime = 13;
    if (aJ.IncreaseAccuracy == undefined) aJ.IncreaseAccuracy = false;
    aJ.IncreaseAccuracy = false;
    if (ag.insider == undefined) ag.insider = false;
    if (ag.godfather == undefined) ag.godfather = 'nothing';
    if (isNaN(ag.godfatheruntouchpoints)) ag.godfatheruntouchpoints = 0;
    if (isNaN(ag.GF_Energy_Max)) ag.GF_Energy_Max = 0;
    if (isNaN(ag.GF_Health_Max)) ag.GF_Health_Max = 0;
    if (isNaN(ag.GF_Recovery_Max)) ag.GF_Recovery_Max = 0;
    if (ag.fight_active == undefined) ag.fight_active = false;
    if (isNaN(ag.FighterDroneForceDefault)) ag.FighterDroneForceDefault = 1;
    if (ag.fightlistblock == undefined) ag.fightlistblock = true;
    if (ag.fightlistblockauto == undefined) ag.fightlistblockauto = true;
    if (isNaN(ag.maxmob)) ag.maxmob = 2;
    if (isNaN(ag.minmob)) ag.minmob = 1;
    if (isNaN(ag.maxfights)) ag.maxfights = 0;
    if (isNaN(ag.minlevel)) ag.minlevel = 1;
    if (isNaN(ag.maxlevel)) ag.maxlevel = 0;
    if (ag.dronebycolor == undefined) ag.dronebycolor = 'green';
    if (ag.dronebycolorchoice == undefined) ag.dronebycolorchoice = false;
    if (isNaN(ag.enemydefensemodifier)) ag.enemydefensemodifier = 0;
    if (ag.dronebylesscolor == undefined) ag.dronebylesscolor = false;
    if (isNaN(ag.fightsneeded)) ag.fightsneeded = 1;
    if (isNaN(ag.fratio)) ag.fratio = 100;
    if (isNaN(ag.defskillmod)) ag.defskillmod = 95;
    if (ag.fightforce == undefined) ag.fightforce = false;
    if (isNaN(ag.ForceAt_stamina)) ag.ForceAt_stamina = boss.max_stamina;
    if (isNaN(ag.forcemin)) ag.forcemin = 1;
    if (isNaN(ag.droneMinExp)) ag.droneMinExp = 0;
    if (ag.fighttarget == undefined) ag.fighttarget = false;
    if (ag.fightlistmark == undefined) ag.fightlistmark = true;
    if (isNaN(ag.droneMinMoney)) ag.droneMinMoney = 0;
    if (ag.droneTargetExp == undefined) ag.droneTargetExp = false;
    if (ag.droneTargetMoney == undefined) ag.droneTargetMoney = false;
    if (isNaN(ag.droneTargetMinMoney)) ag.droneTargetMinMoney = ag.droneMinMoney;
    if (isNaN(ag.droneTargetMinExp)) ag.droneTargetMinExp = ag.droneMinExp;
    if (ag.droneIgnoreOnline == undefined) ag.droneIgnoreOnline = false;
    if (ag.DroneIgnoreLevelB == undefined) ag.DroneIgnoreLevelB = false;
    if (ag.DroneIgnoreMembersB == undefined) ag.DroneIgnoreMembersB = false;
    if (ag.DroneIgnoreOnlineB == undefined) ag.DroneIgnoreOnlineB = false;
    if (ag.DroneIgnoreListB == undefined) ag.DroneIgnoreListB = false;
    if (ag.DroneIgnoreTimesB == undefined) ag.DroneIgnoreTimesB = false;
    if (ag.DroneIgnoreExpB == undefined) ag.DroneIgnoreExpB = false;
    if (ag.DroneIgnoreMoneyB == undefined) ag.DroneIgnoreMoneyB = false;
    if (ag.PredictiveAvoid == undefined) ag.PredictiveAvoid = false;
    if (ag.TooWeakMemory == undefined) ag.TooWeakMemory = 10;
    if (isNaN(ag.DroneMemTime)) ag.DroneMemTime = 1440;
    if (ag.IgnoreMinimumBounty == undefined) ag.IgnoreMinimumBounty = true;
    if (isNaN(ag.snipedelay)) ag.snipedelay = 250;
    if (ag.snipedelay < 0) ag.snipedelay = 100;
    if (ag.hitlistblock == undefined) ag.hitlistblock = true;
    if (ag.hitlistblockauto == undefined) ag.hitlistblockauto = true;
    if (ag.snipemore == undefined) ag.snipemore = false;
    if (ag.hitlist_active == undefined) ag.hitlist_active = false;
    if (isNaN(ag.staminaregen)) ag.staminaregen = boss.max_stamina;
    if (ag.staminaregen > boss.max_stamina) ag.staminaregen = boss.max_stamina;
    if (ag.hitlist_target == undefined) ag.hitlist_target = false;
    if (isNaN(ag.MaxBounty)) ag.MaxBounty = 12000;
    if (isNaN(ag.MinBounty)) ag.MinBounty = 8000;
    if (isNaN(ag.snipe)) ag.snipe = 0;
    if (isNaN(ag.maxsnipe)) ag.maxsnipe = 1;
    if (ag.maxsnipe > an) ag.maxsnipe = an;
    if (ag.varysnipe == undefined) ag.varysnipe = true;
    if (isNaN(ag.varysnipeamount)) ag.varysnipeamount = 1;
    if (ag.varysnipeamount > 2) ag.varysnipeamount = 2;
    if (ag.varysnipeamount < 1) ag.varysnipeamount = 1;
    if (isNaN(ag.hfightsneeded)) ag.hfightsneeded = 1;
    if (isNaN(ag.hratio)) ag.hratio = 100;
    if (ag.hitlistsnipesafe == undefined) ag.hitlistsnipesafe = true;
    if (ag.FastSSnipe == undefined) ag.FastSSnipe = true;
    ag.FastSSnipe = false;
    if (isNaN(ag.SnipeInterval)) ag.SnipeInterval = 100;
    if (ag.SnipeInterval < 0) ag.SnipeInterval = 50;
    if (ag.blockpresence == undefined) ag.blockpresence = false;
    if (ag.fbhide == undefined) {
        ag.fbhide = false;
        if (CanHide()) {
            ag.fbhide = true;
        }
    }
    if (isNaN(ag.timerdelay)) ag.timerdelay = 7;
    if (ag.timerdelay < aR) ag.timerdelay = aR;
    if (isNaN(ag.BHdelay)) ag.BHdelay = ag.timerdelay;
    if (ag.BHdelay < aR) ag.BHdelay = aR;
    if (isNaN(ag.FDdelay)) ag.FDdelay = ag.timerdelay;
    if (ag.FDdelay < aR) ag.FDdelay = aR;
    if (isNaN(ag.refreshdelay)) ag.refreshdelay = 0;
    if (isNaN(ag.captchatimeoutlength)) ag.captchatimeoutlength = 0;
    if (ag.randomizer == undefined) ag.randomizer = true;
    if (isNaN(ag.FighterDroneReload)) ag.FighterDroneReload = 7;
    if (isNaN(ag.delayMainCall)) ag.delayMainCall = 250;
    if (ag.job == undefined) ag.job = 'none';
    if (ag.newLevelJbCheck == undefined) ag.newLevelJbCheck = true;
    if (isNaN(ag.jobdelay)) ag.jobdelay = 7;
    if (ag.ManyJobs == undefined) ag.ManyJobs = false;
    if (ag.sndid == undefined) ag.sndid = 'none';
    if (ag.alertsound == undefined) ag.alertsound = false;
    if (isNaN(ag.sndrepeat)) ag.sndrepeat = 2;
    if (ag.pmobsound == undefined) ag.pmobsound = false;
    if (ag.FastBackgroundBank == undefined) ag.FastBackgroundBank = false;
    if (ag.bank_active_Any == undefined) ag.bank_active_Any = false;
    if (ag.bank_active == undefined) ag.bank_active = false;
    if (ag.bank_bounty == undefined) ag.bank_bounty = false;
    if (ag.bank_fights == undefined) ag.bank_fights = false;
    if (isNaN(ag.minimumbank_fights)) ag.minimumbank_fights = 10000;
    if (isNaN(ag.bankminimum)) ag.bankminimum = 2000;
    if (ag.bankminimum < 2000) ag.bankminimum = 2000;
    if ((isNaN(ag.bankrestricted)) || (ag.bankrestricted < ag.bankminimum)) ag.bankrestricted = ag.bankminimum;
    if (isNaN(ag.heal_limit)) ag.heal_limit = 0;
    if (ag.heal_limit > 60) ag.heal_limit = 60;
    ag.hmin = 20;
    if (ag.hmin < ag.heal_limit) ag.hmin = ag.heal_limit;
    if (ag.autohealoff == undefined) ag.autohealoff = false;
    if (ag.stamwaitautohealoff == undefined) ag.stamwaitautohealoff = false;
    if (ag.healtomax == undefined) ag.healtomax = true;
    if (ag.playdead == undefined) ag.playdead = true;
    if (isNaN(ag.playdeadhealth)) ag.playdeadhealth = 10;
    if (isNaN(ag.playdeadtime)) ag.playdeadtime = 10;
    if (isNaN(ag.playdeadtimeMax)) ag.playdeadtimeMax = (ag.playdeadtime * 2);
    if (ag.AdminNoHeal == undefined) ag.AdminNoHeal = true;
    if (isNaN(ag.healmode) || ((ag.healmode > 1) && !ao)) ag.healmode = 0;
    if (isNaN(ag.HODnum) || (ag.HODnum < 1)) ag.HODnum = 1;
    if (ag.HODnum > 4) ag.HODnum = 4;
    if (ag.FastBH == undefined) ag.FastBH = true;
    ag.DBMboss = false;
    ag.DBMfightlist = false;
    ag.DBMfightlistblock = false;
    ag.DBMhitlistblock = false;
    ag.DBMgodfather = false;
    ag.DBMPrevFights = false;
    ag.DBMinventory = false;
    ag.DBMitemlist = false;
    ag.DBMjobs = false;
    ag.DBMvictims = false;
    if (isNaN(ag.CityPurchase)) ag.CityPurchase = 10;
    if (ag.newLevelAcCheck == undefined) ag.newLevelAcCheck = true;
    if (ag.autoCityBuy == undefined) ag.autoCityBuy = false;
    if (ag.autoCityBuy_withBank == undefined) ag.autoCityBuy_withBank = false;
    if (isNaN(ag.cashprotected)) ag.cashprotected = 0;
    if (ag.maxland == undefined) ag.maxland = false;
    if (ag.ShowRemoveJoinLinks == undefined) ag.ShowRemoveJoinLinks = false;
    if (ag.CloseModalWindows == undefined) ag.CloseModalWindows = false;
    if (ag.ShowAttackLinks == undefined) ag.ShowAttackLinks = true;
    if (ag.windoworder == undefined) ag.windoworder = 'multi';
    if (ag.PromptAlert == undefined) ag.PromptAlert = false;
    if (isNaN(ag.placement)) ag.placement = 0;
    if (ag.AddFaceBookFriendHomePage == undefined) ag.AddFaceBookFriendHomePage = true;
    if (ag.AddFaceBookFriendFightPage == undefined) ag.AddFaceBookFriendFightPage = true;
    if (ag.AddFaceBookFriendProfilePage == undefined) ag.AddFaceBookFriendProfilePage = true;
    if (ag.pausemobster == undefined) ag.pausemobster = true;
    if (isNaN(ag.orientation)) ag.orientation = 0;
    ag.orientation = 0;
    if (isNaN(ag.adjust)) {
        if (CanHide()) {
            ag.adjust = 1;
        } else {
            ag.adjust = 0;
        }
    }
    if (ag.statdisp == undefined) ag.statdisp = false;
    if (ag.bankbutton == undefined) ag.bankbutton = true;
    if (ag.healbutton == undefined) ag.healbutton = true;
    if (ag.showbounty == undefined) ag.showbounty = false;
    if (ag.expneeded == undefined) ag.expneeded = false;
    if (ag.popuphelp == undefined) ag.popuphelp = true;
    if (ag.errorreload == undefined) ag.errorreload = true;
    if (ag.ShowCaptcha == undefined) ag.ShowCaptcha = true;
    if (ag.TryAgainClick == undefined) ag.TryAgainClick = false;
    if (ag.DisplayPaidBy == undefined) ag.DisplayPaidBy = true;
    if (isNaN(ag.PageRefreshIntrvl)) ag.PageRefreshIntrvl = 20;
    if ((ag.PageRefreshIntrvl < 10) && (ag.PageRefreshIntrvl != 0)) ag.PageRefreshIntrvl = 10;
    if (ag.newLevelSpCheck == undefined) ag.newLevelSpCheck = true;
    if (ag.autostockpile_active == undefined) ag.autostockpile_active = false;
    ag.autostockpile_minimum = 1;
    if (isNaN(ag.captchalength)) ag.captchalength = 3;
    if (ag.FastFightSnipe == undefined) ag.FastFightSnipe = true;
    ag.FastFightSnipe = false;
    if (isNaN(ag.LevelingStamina)) ag.LevelingStamina = 3;
    if (isNaN(ag.LevelingInterval)) ag.LevelingInterval = 10;
    if (isNaN(ag.LevelingIntervalSecs)) ag.LevelingIntervalSecs = ag.LevelingInterval * 60;
    if (ag.LevelPart == undefined) ag.LevelPart = false;
    if (ag.FollowFDBlockList == undefined) ag.FollowFDBlockList = true;
    if (isNaN(ag.lvAttack) || (ag.lvAttack > 5)) ag.lvAttack = 1;
    if (isNaN(ag.LevelAttackInterval)) ag.LevelAttackInterval = 950;
    if (ag.LevelAttackInterval < 100) ag.LevelAttackInterval = 100;
    if (ag.LevelingHealAll == undefined) ag.LevelingHealAll = false;
    if (ag.LVHealToMax == undefined) ag.LVHealToMax = false;
    if (ag.NewImproved == undefined) ag.NewImproved = false;
    if (ag.AcceptBoosts == undefined) ag.AcceptBoosts = false;
    if (ag.AcceptPreBoosts == undefined) ag.AcceptPreBoosts = false;
    if (ag.heists == undefined) ag.heists = new Object();
    if (ag.HitAllSource == undefined) ag.HitAllSource = false;
    ag.HitAllSource = false;
}
function cc_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("cc_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<gnikcehC tupnI ahctpaC>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_cc".z()) + ">\";enon :yalpsid\"=elyts \"".z());
    de.push(">\"%001\"=htdiw elbat<".z());
    de.push('<tr id="' + ad("htgneLahctpaCxaM".z()) + ">\"2\"=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("captchalength") + ">lebal/< :)3 :tluafeD( yrtne ahctpac rof dewolla htgnel mumixaM>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("captchalength") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.captchalength;
    de.push('value="' + value + '"/>');
    de.push('</td></tr>');
    de.push('</table>');
    de.push('</div><hr>');
    var df = document.createElement('div');
    if (df) df.innerHTML = de.join('\n');
    var dg = document.getElementById(ae('PrefStuff'));
    if (dg) dg.appendChild(df);
    var button = document.getElementById(ae('cc_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_cc".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.cc_pI = cc_pI;
aP.cc_pH = cc_pH;

function cc_pH(dd) {
    var de = false;
    input = dd.elements.namedItem(ae('captchalength')).value;
    if (ag.captchalength != input) {
        if (input > 0) {
            ag.captchalength = input;
            de = true;
        }
    }
    return de;
}
aQ.sk_e = sk_e;

function sk_e() {
    var dd = false;
    if (boss.actions.skill) delete boss.actions.skill;
    if (document.getElementById(w + "ssob_edargpu_ruc".z())) dd = true;
    var de = document.getElementById(w + "stniop_lliks_ruc".z());
    if (de) {
        boss.points = parseInt(de.innerHTML);
        if (isNaN(boss.points) || (boss.points == 0)) {
            boss.points = 0;
            boss.levelupL = 0;
            return;
        } else {
            if ((boss.MaxPoints == undefined) || (boss.points > boss.MaxPoints)) boss.MaxPoints = boss.points;
            if (boss.MaxPoints > 35) boss.MaxPoints = 35;
            if (boss.MaxPoints < 3) boss.MaxPoints = 3;
        }
    } else {
        boss.points = 0;
        boss.levelupL = 0;
        return;
    }
    if (ag.skillAlloc[0] == undefined || ag.skillAlloc[0] == 'none') return;
    if (dd) {
        var df = false;
        while (!df) {
            if (boss.levelupL > boss.MaxPoints) boss.levelupL = 0;
            if (!ag.skillAlloc[boss.levelupL] || (ag.skillAlloc[boss.levelupL] == 'none')) {
                if (boss.levelupL == 0) {
                    var message = document.getElementById(ae('scripterror'));
                    if (message) message.innerHTML = ">rb<>retnec/<.secnereferp ni ffo denrut si noitacolla citamotua -- etacolla ot stniop lliks evah uoY>retnec<".z();
                    return;
                } else boss.levelupL++;
            } else df = true;
        }
        if ((boss.points < 2) && (ag.skillAlloc[boss.levelupL] == "xam_yrevocer".z())) {
            var message = document.getElementById(ae('scripterror'));
            if (message) message.innerHTML = ">rb<>retnec/<.elbaliava era stniop hguone litnu gnirrefed -- animats si detacolla eb ot txen eht tub ,etacolla ot tniop lliks )1( eno evah uoY>retnec<".z();
            return;
        } else {
            var dg = new Object();
            dg.message = "...pu gnileveL".z();
            dg.page = 'profile';
            dg.func = 'sk_levelUp';
            dg.params = [ag.skillAlloc[boss.levelupL]];
            dg.time = 1;
            boss.actions.skill = dg;
        }
    }
}
aQ.sk_levelUp = sk_levelUp;

function sk_levelUp(dd, de) {
    var df;
    var url;
    de = de - 2;
    if (de < 0) de = 0;
    if (boss.points > 0) {
        if (((boss.points >= 2) || (dd[0] != "xam_yrevocer".z())) && (dd[0] != 'none')) {
            df = Utils.getElementsByXPath("\"=eulav@ dna \"epyt\"=eman@[tupni//".z() + dd[0] + "]\"timbus\"=epyt@[tupni/../]\"".z())[0];
            if (df) {
                url = df;
                var dg;
                if (dd[0] == 'recover_max') dg = 'stamina';
                else dg = dd[0];
                Timer.start(url, "' lliks gnisaercnI".z() + dg + "'...", de, 'skill', false, function () {
                    boss.levelupL++;
                    boss.save();
                }, 1, 0);
            } else {
                boss.points = 0;
                boss.save();
                var dh;
                if (Page['homelink']) dh = Page['homelink'];
                else dh = GM_getValue(ad(Y + 'Lhomelink'), "http://apps.facebook.com/mobwars/");
                Timer.start(dh, "...gnidaoleR ...rorrE puleveL".z(), ay(ag.timerdelay, 1, 1), 'skillerror', false);
            }
        } else {
            P();
        }
    } else {
        var dh;
        if (Page['homelink']) dh = Page['homelink'];
        else dh = GM_getValue(ad(Y + 'Lhomelink'), "http://apps.facebook.com/mobwars/");
        Timer.start(dh, "...gnidaoleR ...rorrE puleveL".z(), ay(ag.timerdelay, 1, 1), 'skillerror', false);
    }
}
function sk_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("sk_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP pU leveL/llikS>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_ks".z()) + "\"=di elbat<>\";enon :yalpsid\"=elyts \"".z() + ad("skill") + ">rt/<>dt/<>retnec/<>tnof/<)desu era stniop lliks lla litnu ,taeper dna ,tsil urht elcyc lliW(>\"1\"=ezis tnof<>rb<swollof sa stniop lliks etacolla lliW>retnec<>2=napsloc dt<>rt<>\"%001\"=htdiw \"".z());
    if ((boss.MaxPoints == undefined) || isNaN(boss.MaxPoints)) boss.MaxPoints = 3;
    if (boss.MaxPoints < 3) boss.MaxPoints = 3;
    if (boss.MaxPoints > 35) boss.MaxPoints = 35;
    for (var x = 0; x < boss.MaxPoints; x++) {
        var df = 'th';
        if ((x == 0) || (x == 20) || (x == 30)) df = 'st';
        else if ((x == 1) || (x == 21) || (x == 31)) df = 'nd';
        else if ((x == 2) || (x == 22) || (x == 32)) df = 'rd';
        de.push("\"=rof lebal<>\"%08\"=htdiw dt<>rt<".z() + ad("skillList" + x) + '">' + (x + 1) + '' + df + "\"=eman tceles<>dt<>dt/<>lebal/< :pu level yllacitamotua ot lliks ".z() + ae("skillList" + x) + '">');
        de.push("\"enon\"=eulav noitpo<".z());
        if (!ag.skillAlloc[x] || (ag.skillAlloc[x] == 'none')) de.push("\"detceles\"=detceles ".z());
        de.push("\"kcatta\"=eulav noitpo<>noitpo/<enoN>".z());
        if (ag.skillAlloc[x] == 'attack') de.push("\"detceles\"=detceles ".z());
        de.push("\"esnefed\"=eulav noitpo<>noitpo/<htgnertS kcattA>".z());
        if (ag.skillAlloc[x] == 'defense') de.push("\"detceles\"=detceles ".z());
        de.push("\"xam_ygrene\"=eulav noitpo<>noitpo/<htgnertS esnefeD>".z());
        if (ag.skillAlloc[x] == 'energy_max') de.push("\"detceles\"=detceles ".z());
        de.push("\"xam_htlaeh\"=eulav noitpo<>noitpo/<ygrenE xaM>".z());
        if (ag.skillAlloc[x] == 'health_max') de.push("\"detceles\"=detceles ".z());
        de.push("\"xam_yrevocer\"=eulav noitpo<>noitpo/<htlaeH xaM>".z());
        if (ag.skillAlloc[x] == "xam_yrevocer".z()) de.push("\"detceles\"=detceles ".z());
        de.push(">tceles/<>noitpo/<animatS>".z());
        de.push('</td></tr>');
    }
    de.push(">rh<>vid/<>elbat/<".z());
    var dg = document.createElement('div');
    if (dg) dg.innerHTML = de.join('\n');
    var dh = document.getElementById(ae('PrefStuff'));
    if (dh) dh.appendChild(dg);
    var button = document.getElementById(ae('sk_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_ks".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
be = parseInt(GM_getValue(ad(Y + 'lchck'), '1579612782'));
aP.sk_pI = sk_pI;
aP.sk_pH = sk_pH;

function sk_pH(dd) {
    var de = false;
    if (boss.MaxPoints < 3) boss.MaxPoints = 3;
    if (boss.MaxPoints > 35) boss.MaxPoints = 35;
    for (var x = 0; x < boss.MaxPoints; x++) {
        var df = dd.elements.namedItem(ae('skillList' + x));
        if (ag.skillAlloc[x] != df.options[df.selectedIndex].value) {
            ag.skillAlloc[x] = df.options[df.selectedIndex].value;
            de = true;
        }
    }
    return de;
}
function cG() {
    this.type = 'GFOption';
    this.name = 'Unknown';
    this.godfather_points = 0;
}
function cH() {
    var dd = eval(GM_getValue(ad(Y + 'godfather'), '({})'));
    for (var i in dd) {
        this[i] = dd[i];
    }
}
cH.prototype = new Object();
cH.prototype.save = function () {
    GM_setValue(ad(Y + 'godfather'), this.toSource());
};
cH.prototype.updateData = function () {
    if (Page.c_page == 'godfather') {
        boss.GodFatherChecked = true;
        for (var dd in this) {
            if (this[dd].type == 'GFOption') {}
        }
        var de = Utils.getElementsByXPath("])\"rehtafdog\" ,noitca@(sniatnoc[mrof//.".z());
        for (i = 0; i < de.length; i++) {
            var df = new cG();
            var dg;
            var dh = de[i].getElementsByTagName('INPUT');
            for (k = 0; k < dh.length; k++) {
                if (dh[k].name == "reward") {
                    dg = dh[k].value;
                    switch (dg) {
                    case 'friend':
                        df.name = 'Hired Guns';
                        break;
                    case 'cash':
                        df.name = 'Cash';
                        break;
                    case "nopaeWlaiceps".z():
                        df.name = "nopaeW laicepS".z();
                        break;
                    case 'energy':
                        df.name = 'Energy';
                        break;
                    case 'health':
                        df.name = 'Health';
                        break;
                    case 'recovery':
                        df.name = 'Stamina';
                        break;
                    case 'insider':
                        df.name = 'Insider';
                        break;
                    default:
                        break;
                    }
                }
                if (dh[k].type == "submit") {
                    df.godfather_points = parseInt(dh[k].value.match(/\d+/));
                    if (isNaN(df.godfather_points)) {
                        df.godfather_points = 9999;
                    }
                }
            }
            this[dg] = df;
        }
        this.save();
    }
};
aQ.gf_e = gf_e;

function gf_e() {
    var dd = document.getElementById(w + 'navMenu');
    if (dd) {
        var de = Utils.getElementsByClassName('subCounts', dd)[0];
        boss.GFpoints = parseInt(de.innerHTML.split('\x28')[1]);
    }
    GodFatherL.updateData();
    if ((boss.GodFatherChecked == undefined) || (boss.GodFatherChecked == false)) {
        if (boss.actions.hitlist) delete boss.actions.hitlist;
        if (boss.actions.fighter) delete boss.actions.fighter;
        var df = new Object();
        df.page = 'godfather';
        df.message = "...rehtaFdoG eht morf sreffo kcehc ot gnioG".z();
        df.time = Math.floor(new Date().getTime() / 1000) + ag.timerdelay;
        boss.actions.godfather = df;
        return;
    }
    if (ag.godfather == 'nothing') {
        if (boss.actions.godfather) delete boss.actions.godfather;
        return;
    }
    if (!GodFatherL[ag.godfather]) {
        if (boss.actions.godfather) delete boss.actions.godfather;
        return;
    }
    if ((boss.GFpoints - ag.godfatheruntouchpoints) < GodFatherL[ag.godfather].godfather_points) {
        if (boss.actions.godfather) delete boss.actions.godfather;
        return;
    }
    if (ag.godfather == 'energy') if (boss.energy > ag.GF_Energy_Max) {
        if (boss.actions.godfather) delete boss.actions.godfather;
        return;
    }
    if (ag.godfather == 'health') if (boss.health > ag.GF_Health_Max) {
        if (boss.actions.godfather) delete boss.actions.godfather;
        return;
    }
    if (ag.godfather == 'recovery') if (boss.stamina > ag.GF_Recovery_Max) {
        if (boss.actions.godfather) delete boss.actions.godfather;
        return;
    }
    if (boss.actions.godfather) return;
    if (ag.godfather == 'recovery') if (boss.actions.stamina) {
        delete boss.actions.stamina;
    }
    var dg = new Object();
    dg.page = 'godfather';
    dg.message = " rof rehtaFdoG eht ot gnioG".z() + GodFatherL[ag.godfather].name + "...";
    dg.func = 'gf_do';
    dg.params = [ag.godfather, GodFatherL[ag.godfather].name];
    dg.time = Page.now + ag.timerdelay;
    boss.actions.godfather = dg;
}
aQ.gf_do = gf_do;

function gf_do(dd, de) {
    if (Page.c_page != 'godfather') return;
    de = de || 5;
    de = de - 2;
    if (de < 0) de = 0;
    if (dd[0] == 'recovery') if (boss.actions.stamina) {
        delete boss.actions.stamina;
        boss.save();
    }
    var df = Utils.getElementsByXPath("\"=eulav@ dna \"drawer\"=eman@[tupni//".z() + dd[0] + "]\"timbus\"=epyt@[tupni/../]\"".z());
    Timer.start(df[0], "Asking for " + dd[1] + "...", de, 'godfather', false);
}
bw(cr, bv, cs);
C(be);

function gf_pI(dd) {
    var de = new Array();
    de.push('<div id="' + ad("gf_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<)ereh noitpo redisnI( secnereferP rehtafdoG>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_fg".z()) + ">\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z());
    de.push('<tr id="' + ad("godlisttr") + "\"=rof lebal<>\"%08\"=htdiw 2=napsloc dt<>\"".z() + ad("godlist") + "\"=eman tceles<>dt<>dt/<>lebal/< :rof stniop rehtaFdoG esU>\"".z() + ae("godlist") + "'(dIyBtnemelEteg.tnemucod{ )'htlaeh' == eulav.]xednIdetceles.tegrat.tneve[snoitpo.tegrat.tneve( fi\"=egnahcno \"".z() + ad("htlaeHrehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod;'wor-elbat' = yalpsid.elyts.)'".z() + ad("ygrenErehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod;'enon' = yalpsid.elyts.)'".z() + ad("yrevoceRrehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod{ )'ygrene' == eulav.]xednIdetceles.tegrat.tneve[snoitpo.tegrat.tneve( fi esle };'enon' = yalpsid.elyts.)'".z() + ad("htlaeHrehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod;'enon' = yalpsid.elyts.)'".z() + ad("ygrenErehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod;'wor-elbat' = yalpsid.elyts.)'".z() + ad("yrevoceRrehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod{ )'yrevocer' == eulav.]xednIdetceles.tegrat.tneve[snoitpo.tegrat.tneve( fi esle };'enon' = yalpsid.elyts.)'".z() + ad("htlaeHrehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod;'enon' = yalpsid.elyts.)'".z() + ad("ygrenErehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod;'enon' = yalpsid.elyts.)'".z() + ad("yrevoceRrehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod{ esle };'wor-elbat' = yalpsid.elyts.)'".z() + ad("htlaeHrehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod;'enon' = yalpsid.elyts.)'".z() + ad("ygrenErehtaFdoG".z()) + "'(dIyBtnemelEteg.tnemucod;'enon' = yalpsid.elyts.)'".z() + ad("yrevoceRrehtaFdoG".z()) + ">\"};'enon' = yalpsid.elyts.)'".z());
    de.push("\"gnihton\"=eulav noitpo<".z());
    if (ag.godfather == 'nothing') de.push("\"detceles\"=detceles ".z());
    de.push(">noitpo/<gnihtoN>".z());
    for (var df in GodFatherL) {
        if ((GodFatherL[df].type == 'GFOption') && (GodFatherL[df].name != 'Unknown')) {
            de.push("\"=eulav noitpo<".z() + df + '\x22');
            if (ag.godfather == df) de.push(" \"detceles\"=detceles ".z());
            de.push('\x3e' + GodFatherL[df].name);
            de.push('</option>');
        }
    }
    de.push(">rt/<>dt/<>tceles/<".z());
    de.push('<tr id="' + ad("ygrenErehtaFdoG".z()) + '" ');
    if (ag.godfather != 'energy') {
        de.push("\"enon:yalpsid\"=elyts".z());
    }
    de.push(">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>".z());
    de.push("\"=rof lebal<".z() + ad("GFEnergy") + ">lebal/<?erom tseuqer ew erofeb eb ygrene dluohs wol woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("GFEnergy") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    var value = ag.GF_Energy_Max;
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    de.push('<tr id="' + ad("htlaeHrehtaFdoG".z()) + '" ');
    if (ag.godfather != 'health') {
        de.push("\"enon:yalpsid\"=elyts".z());
    }
    de.push(">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>".z());
    de.push("\"=rof lebal<".z() + ad("GFHealth") + ">lebal/<?erom tseuqer ew erofeb eb htlaeh dluohs wol woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("GFHealth") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.GF_Health_Max;
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    de.push('<tr id="' + ad("yrevoceRrehtaFdoG".z()) + '" ');
    if (ag.godfather != 'recovery') {
        de.push("\"enon:yalpsid\"=elyts".z());
    }
    de.push(">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>".z());
    de.push("\"=rof lebal<".z() + ad("GFRecovery") + ">lebal/<?erom tseuqer ew erofeb eb animats dluohs wol woH>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("GFRecovery") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.GF_Recovery_Max;
    de.push('value="' + value + '">');
    de.push('</td></tr>');
    de.push('<tr id="' + ad("dehcuotnUrehtaFdoG".z()) + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("GFnopoints") + ">lebal/<:stniop ynam woh esu ton oD>\"".z());
    de.push('</td><td>');
    de.push("\"=eman \"txet\"=epyt tupni<".z() + ae("GFnopoints") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    var dg = ag.godfatheruntouchpoints;
    de.push('value="' + dg + '">');
    de.push('</td></tr>');
    value = ag.insider;
    de.push('<tr id="' + ad("evitcaredisni".z()) + ">2=napsloc dt<>\"".z());
    de.push("\"=rof lebal<".z() + ad("evitca_redisni".z()) + ">lebal/<>1=ezis tnof<>retnec<>rb< :redisnI sraWboM a uoy erA>\"".z());
    de.push('</td><td>');
    if (value) {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("evitca_redisni".z()) + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("evitca_redisni".z()) + ">/\"0\"=eulav \"".z());
    } else {
        de.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("evitca_redisni".z()) + ">/\"1\"=eulav \"".z());
        de.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("evitca_redisni".z()) + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    de.push(">elbat/<>rt/<>dt/<".z());
    de.push('</div><hr>');
    var dh = document.createElement('div');
    if (dh) dh.innerHTML = de.join('\n');
    var di = document.getElementById(ae('PrefStuff'));
    if (di) di.appendChild(dh);
    var button = document.getElementById(ae('gf_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_fg".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.gf_pI = gf_pI;
aP.gf_pH = gf_pH;

function gf_pH(dd) {
    var input = dd.elements.namedItem(ae("evitca_redisni".z()));
    var de = parseInt(dd.elements.namedItem(ae('GFnopoints')).value);
    var df = false;
    var dg = dd.elements.namedItem(ae('godlist'));
    var dh = dg.options[dg.selectedIndex].value;
    if (dh != ag.godfather) {
        if (boss.actions.godfather) delete boss.actions.godfather;
        ag.godfather = dh;
        df = true;
    }
    if (ag.insider != input.checked) {
        ag.insider = input.checked;
        df = true;
    }
    if (!isNaN(de)) {
        if (ag.godfatheruntouchpoints != de) {
            ag.godfatheruntouchpoints = de;
            df = true;
        }
    }
    input = parseInt(dd.elements.namedItem(ae('GFEnergy')).value);
    if (!isNaN(input)) {
        if (ag.GF_Energy_Max != input) {
            ag.GF_Energy_Max = input;
            df = true;
        }
    } else {
        alert("Invalid input for GodFather Energy (GodFather Preferences).  Preferences not updated");
        av = true;
    }
    input = parseInt(dd.elements.namedItem(ae('GFHealth')).value);
    if (!isNaN(input)) {
        if (ag.GF_Health_Max != input) {
            ag.GF_Health_Max = input;
            df = true;
        }
    } else {
        alert("Invalid input for GodFather Health (GodFather Preferences).  Preferences not updated");
        av = true;
    }
    input = parseInt(dd.elements.namedItem(ae('GFRecovery')).value);
    if (!isNaN(input)) {
        if (ag.GF_Recovery_Max != input) {
            ag.GF_Recovery_Max = input;
            df = true;
        }
    } else {
        alert("Invalid input for GodFather Stamina (GodFather Preferences).  Preferences not updated");
        av = true;
    }
    return df;
}
aQ.aF_Delay = aF_Delay;

function aF_Delay(dd, de) {
    de = de || ag.timerdelay;
    Q('fight', de, "...egap thgiF gnikcehC".z());
}
aQ.aF_e = aF_e;

function aF_e() {
    var dd = "htlaeh rof gnitiaW".z();
    var de = "...noitareneger animats rof gnitiaW".z();
    if (boss.actions.Dead || boss.actions.stamina) {
        if (boss.actions.fighter) delete boss.actions.fighter;
        return;
    }
    if (!ag.fight_active) {
        if (boss.actions.fighter) {
            delete boss.actions.fighter;
        }
        return;
    }
    if (boss.actions.fighter) {
        if (!boss.actions.fighter.message.match(dd)) {
            if (!boss.actions.fighter.message.match(de)) {
                delete boss.actions.fighter;
            } else {
                return;
            }
        } else {
            delete boss.actions.fighter;
        }
    }
    var df = bd(aX);
    if (df.blocked) {
        var dg = document.getElementById(ae('targetlock'));
        if (dg) dg.innerHTML = ">rb<>retnec/<)secnereferp ni tes sa(>rb<yad fo emit eht fo esuaceb detavitcaed enorD rethgiF>retnec<>rb<".z();
        if (boss.actions.fighter) {
            delete boss.actions.fighter;
        }
        var dh = new Object();
        dh.message = "...egap thgiF gnikcehC".z();
        dh.page = 'fight';
        if (Page.c_page == 'fight') dh.func = 'aF_Delay';
        else dh.func = 'drone';
        dh.params = [ag.dronebycolor, ">rb<:>tnof/<sessol>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<sthgif xam>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<pxe wol>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<yenom wol>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<enilno>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<kaew oot>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<bom ruoy>der=roloc tnof< rof dekcolB".z()];
        dh.time = df.time;
        boss.actions.aF_timedelay = dh;
        return;
    }
    if (ag.override == undefined) ag.override = false;
    if (boss.actions.hitlist) {
        if (ag.fightforce) {
            if (boss.stamina >= ag.ForceAt_stamina) {
                var temp = document.getElementById(ae('fightermode'));
                if (temp) temp.innerHTML = ">tnof/<decroF>eulb=roloc tnof<".z();
                ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
                ag.override = true;
                GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
                delete boss.actions.hitlist;
            } else {
                if (ag.override == true) {
                    if (boss.stamina <= ag.forcemin) {
                        ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
                        ag.override = false;
                        GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
                        if (boss.actions.fighter) delete boss.actions.fighter;
                        return;
                    }
                    ag.override = true;
                    delete boss.actions.hitlist;
                } else {
                    ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
                    ag.override = false;
                    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
                    if (boss.actions.fighter) delete boss.actions.fighter;
                    return;
                }
            }
        } else {
            ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
            ag.override = false;
            GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
            if (boss.actions.fighter) delete boss.actions.fighter;
            return;
        }
    }
    var dh = new Object();
    if (boss.stamina && ((boss.health >= ((ag.hmin / 100) * boss.max_health)) || ((ag.healmode > 0) && (boss.bank_cash > boss.heal_cost)))) {
        dh.message = "...egap thgiF gnikcehC".z();
        dh.page = 'fight';
        dh.func = 'drone';
        dh.params = [ag.dronebycolor, ">rb<:>tnof/<sessol>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<sthgif xam>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<pxe wol>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<yenom wol>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<enilno>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<kaew oot>der=roloc tnof< rof dekcolB".z(), ">rb<:>tnof/<bom ruoy>der=roloc tnof< rof dekcolB".z()];
        dh.time = Math.floor(new Date().getTime() / 1000) + ag.timerdelay;
        boss.actions.fighter = dh;
    } else {
        if (!boss.stamina) {
            var di = 107;
            if (ag.insider) {
                di = Math.ceil(di * 0.9);
            }
            dh.message = "...noitareneger animats rof gnitiaW".z();
            dh.page = 'profile';
            dh.time = Math.floor(new Date().getTime() / 1000) + ag.staminaregen * di;
            dh.save = true;
            boss.actions.stamina = dh;
            var temp = document.getElementById(ae('cancelstam'));
            if (temp) {
                temp.innerHTML = '<a id="' + ad("cancelstamwait") + ">rb<>rb<>a/<tiaW animatS lecnaC>\"".z();
                button = document.getElementById(ae('cancelstamwait'));
                if (button) {
                    button.addEventListener('click', function () {
                        if (boss.actions.stamina) {
                            delete boss.actions.stamina;
                            boss.save();
                            P();
                        }
                    }, true);
                }
            }
        } else {
            dh.message = dd + "...Need " + Math.ceil(boss.max_health * (ag.hmin / 100)) + "...";
            dh.page = 'fight';
            var dj = 120;
            if (boss.type == 'Bulletproof') {
                dj = 107;
            }
            if (ag.insider) {
                dj = Math.ceil(dj * 0.9);
            }
            dh.time = Math.floor(new Date().getTime() / 1000) + ((Math.ceil(boss.max_health * (ag.hmin / 100)) - boss.health) * dj);
            boss.actions.fighter = dh;
        }
    }
}
function onfightlistblock(dd) {
    if (ag.fightlistblock) {
        if (in_array_Int(dd, ba)) {
            return true;
        }
    }
    return false;
}
aQ.drone = drone;

function drone(dd) {
    if (X) {
        if (h) z("...noitareti dnoces gnillecnac tsuj .....NOISILLOC ENORD".z(), 0);
        return;
    }
    X = true;

    function de(df) {
        var dg = new Array();
        var dh;
        var di;
        var dj = GM_getValue(ad(Y + 'PrevFights'), '').split('\x7c');
        var dk = GM_getValue(ad(Y + "thgiFoTkaeWooT".z()), '').split('\x7c');
        var dl = df[0];
        var dn = false;
        var dp = new Array();
        dp.push(df[1]);
        var dq = new Array();
        dq.push(df[2]);
        var dr = new Array();
        dr.push(df[3]);
        var ds = new Array();
        ds.push(df[4]);
        var dt = new Array();
        dt.push(df[5]);
        var du = new Array();
        du.push(df[6]);
        var dv = new Array();
        dv.push(df[7]);
        var dw = new Array(),
            dx = new Array(),
            dy = new Array(),
            dz = new Array(),
            dA = new Array(),
            dB = new Array(),
            dC = new Array();
        if (ag.maxlevel == 0) {
            dh = Infinity;
        } else {
            dh = parseInt(ag.maxlevel);
        }
        if (ag.maxmob == 0) {
            di = Infinity;
        } else {
            di = parseInt(ag.maxmob);
        }
        function dD(dR) {
            var message = document.getElementById(ae("enord_rethgif".z()));
            if (message) message.innerHTML = dR.join('');
            var dS;
            if (Page['fight']) {
                dS = Page['fight'];
            } else {
                dS = GM_getValue(ad(Y + 'Lfight'), "/thgif/srawbom/moc.koobecaf.sppa//:ptth".z());
            }
            Timer.start(P, "...egap thgif gnidaoleR".z() + aj("daoleRthgiFoN".z()), ay(ag.FighterDroneReload, 1, 1), 'drone', false, function () {
                X = false;
            }, 1, 0);
        }
        if (Page.c_page == 'fight') {
            var dE = document.getElementById(w + 'content');
            if (dE) {
                var dF = Utils.getElementsByXPath("]]])\"slativ_ruc\" ,di@(sniatnoc[vid[dt[rt//.".z(), dE);

                function dG(dR) {
                    try {
                        for (var i = 0; i < dF.length; i++) {
                            if (!dF[i].innerHTML.match(/<td colspan="4">/i)) {
                                var temp;
                                var dS;
                                temp = dF[i].getElementsByTagName("TD")[1];
                                if (temp) dS = parseInt(temp.innerHTML);
                                else continue;
                                var dT;
                                temp = dF[i].getElementsByTagName("TD")[0];
                                if (temp) dT = parseInt(temp.innerHTML.split('Level ')[1]);
                                else continue;
                                var dU = ColorCode(dS, dT, boss.mobsters, boss.level);
                                var dV;
                                temp = dF[i].getElementsByTagName("\x41")[0];
                                if (temp) dV = temp.href.split('\x3d')[1].split(/&/)[0];
                                else continue;
                                if (dV == Y) continue;
                                var dW;
                                temp = dF[i].getElementsByTagName("TD")[0];
                                if (temp) dW = temp.innerHTML.match(/online now/i);
                                else continue;
                                var dX;
                                temp = dF[i].getElementsByTagName("\x41")[0];
                                if (temp) dX = temp.innerHTML;
                                else continue;
                                if (dX == boss.name) continue;
                                var dY;
                                temp = dF[i].getElementsByTagName("TD")[2];
                                if (temp) dY = parseInt(temp.getElementsByTagName("DIV")[2].style.width);
                                else continue;
                                if ((dY > 19) && (!in_array_Int(dV, dk))) {
                                    if (!in_array_Int(dV, Enforcer)) {
                                        if (!in_array_Int(dV, aU)) {
                                            if ((!ag.dronebycolorchoice) || (dU == dl)) {
                                                if (((dS <= di) && (dS >= parseInt(ag.minmob))) || (dR && ag.DroneIgnoreMembersB)) {
                                                    if (((dT <= dh) && (dT >= parseInt(ag.minlevel))) || (dR && ag.DroneIgnoreLevelB)) {
                                                        if (((ag.droneIgnoreOnline && !dW) || (!ag.droneIgnoreOnline)) || (dR && ag.DroneIgnoreOnlineB)) {
                                                            if ((!onfightlistblock(parseInt(dV))) || (dR && ag.DroneIgnoreListB)) {
                                                                if ((cz(parseInt(dV), dj)) || (dR && ag.DroneIgnoreTimesB)) {
                                                                    dg.push(i + '\x3a' + dV + '\x3a' + dX);
                                                                } else {
                                                                    if (!dq.join().match(dX)) dq.push(";psbn&;psbn&".z() + dX + '<br>');
                                                                    if (!dR) dA.push(i + '\x3a' + dV + '\x3a' + dX);
                                                                }
                                                            } else {
                                                                if (!dp.join().match(dX)) dp.push(";psbn&;psbn&".z() + dX + '<br>');
                                                                if (!dR) dz.push(i + '\x3a' + dV + '\x3a' + dX);
                                                            }
                                                        } else {
                                                            if (!dt.join().match(dX)) dt.push(";psbn&;psbn&".z() + dX + '<br>');
                                                            if (!dR) dy.push(i + '\x3a' + dV + '\x3a' + dX);
                                                        }
                                                    } else {
                                                        if (!dR) dw.push(i + '\x3a' + dV + '\x3a' + dX);
                                                    }
                                                } else {
                                                    if (!dR) dx.push(i + '\x3a' + dV + '\x3a' + dX);
                                                }
                                            }
                                        } else {
                                            if (!dR) {
                                                if (!dv[0].match(dX)) {
                                                    dv.push(";psbn&;psbn&".z() + dX + '<br>');
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (!dR) {
                                        if (!du[0].match(dX)) {
                                            du.push(";psbn&;psbn&".z() + dX + '<br>');
                                        }
                                    }
                                }
                            }
                        }
                    } catch (dZ) {}
                    if (ag.fighttarget) {
                        function ea(eh, ei) {
                            if (ei.split('\x3a')[1] != '') {
                                for (var ej = 0; ej < eh.length; ej++) {
                                    if (parseInt(ei.split('\x3a')[1]) == parseInt(eh[ej].split('\x3a')[1])) {
                                        if (ei.split('\x3a')[3] > 0) {
                                            if (Math.ceil((ei.split('\x3a')[7] / ei.split('\x3a')[3])) < parseInt(ag.droneMinExp)) {
                                                if (!dr.join().match(eh[ej].split('\x3a')[2])) dr.push(";psbn&;psbn&".z() + eh[ej].split('\x3a')[2] + '<br>');
                                                if (!dR) dB.push(eh[ej]);
                                                eh.splice(ej, 1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            return eh;
                        }
                        function eb(eh, ei) {
                            if (ei.split('\x3a')[1] != '') {
                                for (var ej = 0; ej < eh.length; ej++) {
                                    if (parseInt(ei.split('\x3a')[1]) == parseInt(eh[ej].split('\x3a')[1])) {
                                        if (ei.split('\x3a')[3] > 0) {
                                            if (Math.ceil((dollars_to_int(ei.split('\x3a')[4]) / ei.split('\x3a')[3])) < parseInt(ag.droneMinMoney)) {
                                                if (!ds.join().match(eh[ej].split('\x3a')[2])) ds.push(";psbn&;psbn&".z() + eh[ej].split('\x3a')[2] + '<br>');
                                                if (!dR) dC.push(eh[ej]);
                                                eh.splice(ej, 1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            return eh;
                        }
                        var ec = GM_getValue(ad(Y + 'fightlist'), '').split('\x7c');
                        for (var mob = 0; mob < ec.length; mob++) {
                            if (ec[mob] != '') {
                                if (!(dR && ag.DroneIgnoreExpB)) {
                                    dg = ea(dg, ec[mob]);
                                }
                                if (!(dR && ag.DroneIgnoreMoneyB)) {
                                    dg = eb(dg, ec[mob]);
                                }
                            }
                        }
                    }
                    if (ag.PredictiveAvoid) {
                        var ed = GM_getValue(ad(Y + "diovApxEevitciderP".z()), '').split('\x7c');
                        for (var ee = 0; ee < dg.length; ee++) {
                            if (in_array_Int(dg[ee].split('\x3a')[1], ed)) {
                                if (!dr.join().match(dg[ee].split('\x3a')[2])) dr.push(" )P(;psbn&;psbn&".z() + dg[ee].split('\x3a')[2] + '<br>');
                                if (!dR) dB.push(dg[ee]);
                                dg.splice(ee, 1);
                                ee--;
                            }
                        }
                    }
                    if (ag.droneTargetExp) {
                        var ef = GM_getValue(ad(Y + 'TargetExp'), '').split('\x7c');
                        for (var ee = 0; ee < dg.length; ee++) {
                            if (in_array_Int(dg[ee].split('\x3a')[1], ef)) {
                                document.getElementById(ae('targetlock')).innerHTML = " gnitegraT>\"neerg\"=roloc tnof<>retnec<>rb<".z() + dg[ee].split('\x3a')[2] + ">retnec/<>tnof/<>rb<>rb<)E( ".z();
                                var temp = new Array();
                                temp.push(dg[ee]);
                                dg = temp;
                                break;
                            }
                        }
                    }
                    if (ag.droneTargetMoney) {
                        var eg = GM_getValue(ad(Y + 'TargetMoney'), '').split('\x7c');
                        for (var ee = 0; ee < dg.length; ee++) {
                            if (in_array_Int(dg[ee].split('\x3a')[1], eg)) {
                                document.getElementById(ae('targetlock')).innerHTML = " gnitegraT>\"neerg\"=roloc tnof<>retnec<>rb<".z() + dg[ee].split('\x3a')[2] + ">retnec/<>tnof/<>rb<>rb<)M( ".z();
                                var temp = new Array();
                                temp.push(dg[ee]);
                                dg = temp;
                                break;
                            }
                        }
                    }
                }
                dG(dn);
                if (dg.length <= 0) {
                    dn = true;
                    dG(dn);
                }
                if (dg.length > 0) {
                    var dH = Math.floor(Math.random() * dg.length);
                    var dI = dF[dg[dH].split('\x3a')[0]].getElementsByTagName("input");
                    var dJ;
                    for (var k = 0; k < dI.length; k++) {
                        if (dI[k].name == "target_id") {
                            boss.fights.target_id = dI[k].value;
                        }
                        if (dI[k].type == "submit") {
                            dJ = dI[k];
                        }
                    }
                    boss.fights.target_name = dg[dH].split('\x3a')[2];
                    boss.fights.target_amount = 0;
                    boss.fights.hitlist = false;
                    boss.save();
                    var dK = new Array();
                    if ((dw.length > 0) && dn && ag.DroneIgnoreLevelB) {
                        dK.push(";psbn&)level derongI(>rb<".z());
                    }
                    if ((dx.length > 0) && dn && ag.DroneIgnore) {
                        dK.push(";psbn&)srebmem derongI(>rb<".z());
                    }
                    if ((dp.length > 1) || (dp[0].length != ">rb<:>tnof/<sessol>der=roloc tnof< rof dekcolB".z().length)) {
                        if ((dz.length > 0) && dn && ag.DroneIgnoreListB) {
                            dK.push(";psbn&)derongI(>rb<".z());
                        } else dK.push('<br>');
                        dK.push(dp.join(''));
                    }
                    if ((dq.length > 1) || (dq[0].length != ">rb<:>tnof/<sthgif xam>der=roloc tnof< rof dekcolB".z().length)) {
                        if ((dA.length > 0) && dn && ag.DroneIgnoreTimesB) {
                            dK.push(";psbn&)derongI(>rb<".z());
                        } else dK.push('<br>');
                        dK.push(dq.join(''));
                    }
                    if ((dr.length > 1) || (dr[0].length != ">rb<:>tnof/<pxe wol>der=roloc tnof< rof dekcolB".z().length)) {
                        if ((dB.length > 0) && dn && ag.DroneIgnoreExpB) {
                            dK.push(";psbn&)derongI(>rb<".z());
                        } else dK.push('<br>');
                        dK.push(dr.join(''));
                    }
                    if ((ds.length > 1) || (ds[0].length != ">rb<:>tnof/<yenom wol>der=roloc tnof< rof dekcolB".z().length)) {
                        if ((dC.length > 0) && dn && ag.DroneIgnoreMoneyB) {
                            dK.push(";psbn&)derongI(>rb<".z());
                        } else dK.push('<br>');
                        dK.push(ds.join(''));
                    }
                    if ((dt.length > 1) || (dt[0].length != ">rb<:>tnof/<enilno>der=roloc tnof< rof dekcolB".z().length)) {
                        if ((dy.length > 0) && dn && ag.DroneIgnoreOnlineB) {
                            dK.push(";psbn&)derongI(>rb<".z());
                        } else dK.push('<br>');
                        dK.push(dt.join(''));
                    }
                    if ((du.length > 1) || (du[0].length != ">rb<:>tnof/<kaew oot>der=roloc tnof< rof dekcolB".z().length)) {
                        dK.push('<br>');
                        dK.push(du.join(''));
                    }
                    if ((dv.length > 1) || (dv[0].length != ">rb<:>tnof/<bom ruoy>der=roloc tnof< rof dekcolB".z().length)) {
                        dK.push('<br>');
                        dK.push(dv.join(''));
                    }
                    var message = document.getElementById(ae("enord_rethgif".z()));
                    if (message) message.innerHTML = dK.join('');
                    if (dJ) {
                        var dL = Utils.getElementsByXPath('../select', dJ);
                        if (dL) {
                            for (var j = 0; j < dL.length; j++) {
                                var dM = document.createElement('input');
                                dM.name = 'force';
                                dM.type = 'text';
                                dM.setAttribute('maxlength', '\x32');
                                dM.setAttribute('size', '\x32');
                                dM.value = ((boss.stamina - ag.FighterDroneForceDefault) > 0) ? ag.FighterDroneForceDefault : boss.stamina;
                                dL[j].parentNode.insertBefore(dM, dL[j]);
                                dL[j].parentNode.removeChild(dL[j]);
                            }
                        }
                        var dN = ay(ag.FDdelay, 1, 1);
                        Timer.start(dJ, 'Attacking ' + boss.fights.target_name + '...', dN, 'drone', false, function () {
                            bF(boss, ag);
                            X = false;
                        }, 1, 500);
                        z("=di_resu?/eliforp/srawbom/moc.koobecaf.sppa//{{ptth'=ferh a< kcatta ot remit gnitratS {{enord rethgiF".z() + boss.fights.target_id + "'>" + boss.fights.target_name + "</a>...", 2);
                    } else {
                        var dO;
                        if (Page['fight']) {
                            dO = Page['fight'];
                        } else {
                            dO = GM_getValue(ad(Y + 'Lfight'), "/thgif/srawbom/moc.koobecaf.sppa//:ptth".z());
                        }
                        Timer.start(dO, "....gnikcatta rorrE".z(), ag.timerdelay, 'drone', false, function () {
                            X = false;
                        }, 1, 0);
                        z("=di_resu?/eliforp/srawbom/moc.koobecaf.sppa//{{ptth'=ferh a< kcatta ot gniyrt saw....enord rethgif ni rorrE {{enord rethgiF".z() + boss.fights.target_id + "'>" + boss.fights.target_name + "</a>", 3);
                    }
                    return;
                } else {
                    if (ag.dronebylesscolor) {
                        var dP = new Array();
                        if (dl == 'yellow') {
                            dP[0] = 'white';
                            dP[1] = dp.join('');
                            dP[2] = dq.join('');
                            dP[3] = dr.join('');
                            dP[4] = ds.join('');
                            dP[5] = dt.join('');
                            dP[6] = du.join('');
                            dP[7] = dv.join('');
                            de(dP);
                            return;
                        } else if (dl == 'white') {
                            dP[0] = 'green';
                            dP[1] = dp.join('');
                            dP[2] = dq.join('');
                            dP[3] = dr.join('');
                            dP[4] = ds.join('');
                            dP[5] = dt.join('');
                            dP[6] = du.join('');
                            dP[7] = dv.join('');
                            de(dP);
                            return;
                        } else if (dl == 'green') {}
                    }
                }
            }
        }
        var dQ;
        if (parseInt(ag.maxfights) != 0) {
            dQ = parseInt(ag.maxfights);
        } else {
            dQ = Infinity;
        }
        var dK = new Array();
        if ((dw.length > 0) && dn && ag.DroneIgnoreLevelB) {
            dK.push(";psbn&)level derongI(>rb<".z());
        }
        if ((dx.length > 0) && dn && ag.DroneIgnore) {
            dK.push(";psbn&)srebmem derongI(>rb<".z());
        }
        if ((dp.length > 1) || (dp[0].length != ">rb<:>tnof/<sessol>der=roloc tnof< rof dekcolB".z().length)) {
            if ((dz.length > 0) && dn && ag.DroneIgnoreListB) {
                dK.push(";psbn&)derongI(>rb<".z());
            } else dK.push('<br>');
            dK.push(dp.join(''));
        }
        if ((dq.length > 1) || (dq[0].length != ">rb<:>tnof/<sthgif xam>der=roloc tnof< rof dekcolB".z().length)) {
            if ((dA.length > 0) && dn && ag.DroneIgnoreTimesB) {
                dK.push(";psbn&)derongI(>rb<".z());
            } else dK.push('<br>');
            dK.push(dq.join(''));
        }
        if ((dr.length > 1) || (dr[0].length != ">rb<:>tnof/<pxe wol>der=roloc tnof< rof dekcolB".z().length)) {
            if ((dB.length > 0) && dn && ag.DroneIgnoreExpB) {
                dK.push(";psbn&)derongI(>rb<".z());
            } else dK.push('<br>');
            dK.push(dr.join(''));
        }
        if ((ds.length > 1) || (ds[0].length != ">rb<:>tnof/<yenom wol>der=roloc tnof< rof dekcolB".z().length)) {
            if ((dC.length > 0) && dn && ag.DroneIgnoreMoneyB) {
                dK.push(";psbn&)derongI(>rb<".z());
            } else dK.push('<br>');
            dK.push(ds.join(''));
        }
        if ((dt.length > 1) || (dt[0].length != ">rb<:>tnof/<enilno>der=roloc tnof< rof dekcolB".z().length)) {
            if ((dy.length > 0) && dn && ag.DroneIgnoreOnlineB) {
                dK.push(";psbn&)derongI(>rb<".z());
            } else dK.push('<br>');
            dK.push(dt.join(''));
        }
        if ((du.length > 1) || (du[0].length != ">rb<:>tnof/<kaew oot>der=roloc tnof< rof dekcolB".z().length)) {
            dK.push('<br>');
            dK.push(du.join(''));
        }
        if ((dv.length > 1) || (dv[0].length != ">rb<:>tnof/<bom ruoy>der=roloc tnof< rof dekcolB".z().length)) {
            dK.push('<br>');
            dK.push(dv.join(''));
        }
        dK.push(" neewteb ezis bom a sah taht thgif ot elbaliava ydoboN>der=roloc tnof<>retnec<>rb<".z() + ag.minmob + ' and ' + di + " neewteb level a ,".z() + ag.minlevel + ' and ' + dh + ', ');
        if (ag.dronebycolorchoice) {
            dK.push(" fo edoc roloc a sah".z() + ag.dronebycolor + ', ');
            if (ag.dronebylesscolor) {
                dK.push(" ,neerg urht nwod".z());
            }
        }
        dK.push(" naht ssel dekcatta ev'uoy dna".z() + dQ + ">retnec/<>tnof/<.secnereferp ni tes evah uoy sa ,".z());
        dD(dK);
    }
    de(dd);
}
function in_array_Int(dd, de) {
    var a = false;
    var df = de.length;
    for (var i = 0; i < df; i++) {
        if (parseInt(dd) == parseInt(de[i])) {
            a = true;
            break;
        }
    }
    return a;
}
function aF_pI(dd) {
    var value = ag.fight_active;
    var de = ag.maxmob;
    var df = ag.minmob;
    var dg = ag.maxlevel;
    var dh = ag.minlevel;
    var di = ag.maxfights;
    var dj = ag.dronebycolor;
    var dk = ag.dronebycolorchoice;
    var dl = ag.enemydefensemodifier;
    var dn = ag.dronebylesscolor;
    var dp = new Array();
    dp.push('<div id="' + ad("aF_toggle") + '" class="' + ae("selggoTuneMferP".z()) + "\"=di vid<>vid/<>elbat/<>rt/<>dt/<secnereferP enorD rethgiF>dt<>rt<>\"%001\"=htdiw elbat<>\"".z() + ad("secnereferp_Fa".z()) + "\"=di rt<>\"%001\"=htdiw elbat<>\";enon :yalpsid\"=elyts \"".z() + ad("fightactive") + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("fight_active") + ">lebal/< ?ffo si gnitnuh ytnuob nehw sbom thgif yllacitamotuA>\"".z());
    dp.push('</td><td>');
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fight_active") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fight_active") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fight_active") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fight_active") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    dp.push(">rt/<>dt/<>rh<>3=napsloc dt<>rt<".z());
    dp.push('<tr id="' + ad("force") + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("fightforce") + ">lebal/<?woleb tes level animats evoba ro ta fi edom enorD rethgiF ecroF>\"".z());
    dp.push('</td><td>');
    value = ag.fightforce;
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fightforce") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fightforce") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("fightforce") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("fightforce") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    value = ag.ForceAt_stamina;
    dp.push("\"=di rt<>rt/<>dt/<".z() + ad("animatstaecrof".z()) + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("ForceAt_stamina") + ">lebal/<:evoba ro ta si animats nehw edom enord ecroF>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("ForceAt_stamina") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    dp.push('value="' + value + '">');
    dp.push('</td></tr>');
    forcemin = ag.forcemin;
    dp.push("\"=di rt<>rt/<>dt/<".z() + ad("minforce") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("forcemin") + ">lebal/<:tahw ot sllaf animats litnu ecroF>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("forcemin") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    dp.push('value="' + forcemin + '">');
    dp.push('</td></tr>');
    dp.push(">rt/<>dt/<>rh<>3=napsloc dt<>rt<".z());
    value = ag.FighterDroneForceDefault;
    dp.push('<tr id="' + ad("tluafedecrofenordrethgif".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("FighterDroneForceDefault") + ">lebal/< ?)9-1( tluafed yb htiw thgif ew dluohs gnittes ecroF tahW>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("FighterDroneForceDefault") + " \"1\"=ezis \"1\"=htgnelxam \"".z());
    dp.push('value="' + value + '">');
    dp.push('</td></tr>');
    value = ag.droneIgnoreOnline;
    dp.push('<tr id="' + ad("enilnoerongienord".z()) + ">dt<>dt/<>dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("droneIgnoreOnline") + ">lebal/< ?enilno yltnerruc era taht sbom erongI>\"".z());
    dp.push('</td><td>');
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("droneIgnoreOnline") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("droneIgnoreOnline") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("droneIgnoreOnline") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("droneIgnoreOnline") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    dp.push('<tr id="' + ad("maxmob") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("Max_Mob") + ">lebal/<)detimilnu=0( :eziS boM xaM>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("Max_Mob") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    dp.push('value="' + de + '">');
    dp.push("\"=di rt<>rt/<>dt/<".z() + ad("minmob") + ">dt<>dt/<>dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("Min_Mob") + ">lebal/<:eziS boM muminiM>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("Min_Mob") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    dp.push('value="' + df + '">');
    dp.push("\"=di rt<>rt/<>dt/<".z() + ad("maxlevel") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("Max_LMob") + ">lebal/<)detimilnu = 0( :leveL boM xaM>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("Max_LMob") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    dp.push('value="' + dg + '">');
    dp.push("\"=di rt<>rt/<>dt/<".z() + ad("minlevel") + ">dt<>dt/<>dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("Min_LMob") + ">lebal/<:leveL boM muminiM>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("Min_LMob") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    dp.push('value="' + dh + '">');
    dp.push("\"=di rt<>rt/<>dt/<".z() + ad("bycolor") + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("dronebycolorchoice") + ">lebal/< ?evoba seirtne ruoy ot noitidda ni ,sedoc roloc no desab thgif yllacitamotuA>\"".z());
    dp.push('</td><td>');
    if (dk) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dronebycolorchoice") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dronebycolorchoice") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dronebycolorchoice") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dronebycolorchoice") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    dp.push('<tr id="' + ad("whatcolor") + ">dt<>dt/<>dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("dronebycolor") + ">lebal/< :roloc hcihw ,edoc roloc yb fI>\"".z());
    dp.push("\"=eman tceles<>dt<>dt/<".z() + ae("dronebycolor") + '">');
    dp.push("\"neerg\"=eulav noitpo<".z());
    if (ag.dronebycolor == 'green') dp.push("\"detceles\"=detceles ".z());
    dp.push(">noitpo/<neerG>".z());
    dp.push("\"etihw\"=eulav noitpo<".z());
    if (ag.dronebycolor == 'white') dp.push("\"detceles\"=detceles ".z());
    dp.push(">noitpo/<etihW>".z());
    dp.push("\"wolley\"=eulav noitpo<".z());
    if (ag.dronebycolor == 'yellow') dp.push("\"detceles\"=detceles ".z());
    dp.push(">noitpo/<wolleY>".z());
    dp.push("\"=di rt<>rt/<>dt/<>tceles/<".z() + ad("bylesscolor") + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("dronebylesscolor") + ">lebal/< ?rekaew yllaitnetop eht rof og ,elbaliava si roloc taht fo enon fI>\"".z());
    dp.push('</td><td>');
    if (dn) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dronebylesscolor") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dronebylesscolor") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dronebylesscolor") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dronebylesscolor") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push("\"=di rt<>rt/<>dt/<".z() + ad("modifier") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("reifidomesnefed".z()) + ">lebal/<:gnidoc roloc ni esu ot reifidoM esnefeD YMENE>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("reifidomesnefed".z()) + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    dp.push('value="' + dl + '">');
    dp.push("\"=di rt<>rt/<>dt/<".z() + ad("reifidomlliksd".z()) + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("reifidomlliksfed".z()) + ">lebal/<:gnidoc roloc ni esu ot egatnecreP llikS esnefeD YMENE>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("reifidomlliksfed".z()) + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    var dq = ag.defskillmod;
    dp.push('value="' + dq + '">%');
    dp.push("\"=di rt<>rt/<>dt/<".z() + ad("maxfights") + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("Max_fights") + ">lebal/<)detimilnu = 0( :bom eno kcatta ot semit xaM>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("Max_fights") + " \"4\"=ezis \"4\"=htgnelxam \"".z());
    dp.push('value="' + di + '">');
    dp.push('</td></tr>');
    value = ag.DroneMemTime;
    dp.push('<tr id="' + ad("emityromemenord".z()) + ">dt<>dt/<>dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("DroneMemTime") + ">lebal/<)nim 5 ,setunim( :sbom rebmemer ot emit xaM>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("DroneMemTime") + " \"5\"=ezis \"5\"=htgnelxam \"".z());
    dp.push('value="' + value + '">');
    dp.push('</td></tr>');
    value = ag.TooWeakMemory;
    dp.push('<tr id="' + ad("yromemkaeWooTenord".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("meMkaeWsthgif_xaM".z()) + ">lebal/<:stluser \"thgif ot kaeW oot\" ynam woh rebmemeR>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("meMkaeWsthgif_xaM".z()) + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    dp.push('value="' + value + '">');
    dp.push('</td></tr>');
    dp.push('<tr id="' + ad("pxetegratenord".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("droneTargetExp") + ">lebal/<?sthgif tsap ni deniatbo ecneirepxe no desab sbom tegraT>\"".z());
    dp.push('</td><td>');
    value = ag.droneTargetExp;
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("droneTargetExp") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("droneTargetExp") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("droneTargetExp") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("droneTargetExp") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    dp.push('<tr id="' + ad("pxenimtegratenord".z()) + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("droneTargetMinExp") + ">lebal/<:naht retaerg si deniatbo pxe fi niaga bom a kcatta ot tpmettA>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("droneTargetMinExp") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.droneTargetMinExp;
    dp.push('value="' + value + '">');
    dp.push('</td></tr>');
    dp.push('<tr id="' + ad("yenomtegratenord".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("droneTargetMoney") + ">lebal/<?sthgif tsap ni deniatbo yenom no desab sbom tegraT>\"".z());
    dp.push('</td><td>');
    value = ag.droneTargetMoney;
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("droneTargetMoney") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("droneTargetMoney") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("droneTargetMoney") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("droneTargetMoney") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    dp.push('<tr id="' + ad("yenomnimtegratenord".z()) + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("droneTargetMinMoney") + ">lebal/<:neht retaerg si deniatbo yenom fi niaga bom a kcatta ot tpmettA>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("droneTargetMinMoney") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.droneTargetMinMoney;
    dp.push('value="' + value + '">');
    dp.push('</td></tr>');
    value = ag.PredictiveAvoid;
    dp.push('<tr id="' + ad("diovaevitciderp".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("PredictiveAvoid") + ">lebal/<?ecneirepxe elbissop detciderp no desab sbom diovA>\"".z());
    dp.push('</td><td>');
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("PredictiveAvoid") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("PredictiveAvoid") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("PredictiveAvoid") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("PredictiveAvoid") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    dp.push(">dt/<>dt/<>rh<>retnec/<.egap thgif eht no nehw deriuqer emit gnissecorp>rb<tpircs eht esaercni ylbaeciton ,noisacco no ,yam noitces siht ni snoitpo ehT>retnec<>rh<>\"3\"=napsloc dt<>rt<".z());
    dp.push('<tr id="' + ad("DroneTarget") + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("dronetarget") + ">lebal/< ?sthgif tsap no desab sbom diovA>\"".z());
    dp.push('</td><td>');
    value = ag.fighttarget;
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dronetarget") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dronetarget") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dronetarget") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dronetarget") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    dp.push('<tr id="' + ad("DroneMinExp") + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("droneminexp") + ">lebal/<:neht ssel si deviecer ecneirepxe egareva fi diovA>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("droneminexp") + " \"3\"=ezis \"3\"=htgnelxam \"".z());
    value = ag.droneMinExp;
    dp.push('value="' + value + '">');
    dp.push('</td></tr>');
    dp.push('<tr id="' + ad("yenoMniMenorD".z()) + ">\"%57\"=htdiw dt<>dt/<>\"%5\"=htdiw dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("yenomnimenord".z()) + ">lebal/<)00007 xaM( :neht ssel si deviecer yenom egareva fi diovA>\"".z());
    dp.push('</td><td>');
    dp.push("\"=eman \"txet\"=epyt tupni<".z() + ae("yenomnimenord".z()) + " \"5\"=ezis \"5\"=htgnelxam \"".z());
    value = ag.droneMinMoney;
    dp.push('value="' + value + '">');
    dp.push('</td></tr>');
    dp.push('<tr id="' + ad("DroneMark") + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("dronemark") + ">lebal/< ?pxe/ssol/niw htiw egap thgif eht no sbom kraM>\"".z());
    dp.push('</td><td>');
    value = ag.fightlistmark;
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dronemark") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dronemark") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("dronemark") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("dronemark") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    dp.push(">rt/<>dt/<>rh<>retnec/<.erongi ot ot tnaw uoy snoitcirtser hcihw ,woleb snoitpo eht ni ,tceles ,os fI  ?thgif ot enoemos evah uoy taht os snoitcirtser ruoy fo emos erongi ot tnaw uoy od ,stegrat elbaliava lla tuo kcolb evoba snoitcirtser ruoy dna ,egap thgif eht no era uoy fI>retnec<>rh<>3=napsloc dt<>rt<".z());
    value = ag.DroneIgnoreLevelB;
    dp.push('<tr id="' + ad("blevelerongienord".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("DroneIgnoreLevelB") + ">lebal/<?snoitcirtser level erongI>\"".z());
    dp.push('</td><td>');
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreLevelB") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreLevelB") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreLevelB") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreLevelB") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    value = ag.DroneIgnoreMembersB;
    dp.push('<tr id="' + ad("bsrebmemerongienord".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("DroneIgnoreMembersB") + ">lebal/<?snoitcirtser ezis bom erongI>\"".z());
    dp.push('</td><td>');
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreMembersB") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreMembersB") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreMembersB") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreMembersB") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    value = ag.DroneIgnoreOnlineB;
    dp.push('<tr id="' + ad("benilnoerongienord".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("DroneIgnoreOnlineB") + ">lebal/<?noitcirtser enilno erongI>\"".z());
    dp.push('</td><td>');
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreOnlineB") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreOnlineB") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreOnlineB") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreOnlineB") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    value = ag.DroneIgnoreListB;
    dp.push('<tr id="' + ad("btsilerongienord".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("DroneIgnoreListB") + ">lebal/<?tsil gnikcolb thgif erongI>\"".z());
    dp.push('</td><td>');
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreListB") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreListB") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreListB") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreListB") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    value = ag.DroneIgnoreTimesB;
    dp.push('<tr id="' + ad("bsemiterongienord".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("DroneIgnoreTimesB") + ">lebal/<?bom a dekcatta ev'uoy semit fo rebmun erongI>\"".z());
    dp.push('</td><td>');
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreTimesB") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreTimesB") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreTimesB") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreTimesB") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    value = ag.DroneIgnoreExpB;
    dp.push('<tr id="' + ad("bpxeerongienord".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("DroneIgnoreExpB") + ">lebal/<?noitcirtser ecneirepxe muminim erongI>\"".z());
    dp.push('</td><td>');
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreExpB") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreExpB") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreExpB") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreExpB") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    value = ag.DroneIgnoreMoneyB;
    dp.push('<tr id="' + ad("byenomerongienord".z()) + ">2=napsloc dt<>\"".z());
    dp.push("\"=rof lebal<".z() + ad("DroneIgnoreMoneyB") + ">lebal/<?noitcirtser yenom muminim erongI>\"".z());
    dp.push('</td><td>');
    if (value) {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreMoneyB") + ">/\"dekcehc\"=dekcehc \"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreMoneyB") + ">/\"0\"=eulav \"".z());
    } else {
        dp.push("\"=eman \"oidar\"=epyt tupni< seY".z() + ae("DroneIgnoreMoneyB") + ">/\"1\"=eulav \"".z());
        dp.push("\"=eman \"oidar\"=epyt tupni< oN".z() + ae("DroneIgnoreMoneyB") + ">/\"dekcehc\"=dekcehc \"0\"=eulav \"".z());
    }
    dp.push('</td></tr>');
    dp.push(">vid/<>elbat/<".z());
    var dr = document.createElement('div');
    dp.push('<hr>');
    if (dr) dr.innerHTML = dp.join('\n');
    var ds = document.getElementById(ae('PrefStuff'));
    if (ds) ds.appendChild(dr);
    var button = document.getElementById(ae('aF_toggle'));
    if (button) button.addEventListener('click', function () {
        var temp = document.getElementById(ae("secnereferp_Fa".z()));
        if (temp) {
            if (temp.style.display == 'none') {
                temp.style.display = 'block';
            } else {
                temp.style.display = 'none';
            }
        }
    }, true);
}
aP.aF_pI = aF_pI;
aP.aF_pH = aF_pH;

function aF_pH(dd) {
    var de = parseInt(dd.elements.namedItem(ae('Max_Mob')).value);
    var df = parseInt(dd.elements.namedItem(ae('Min_Mob')).value);
    var dg = parseInt(dd.elements.namedItem(ae('Max_fights')).value);
    var dh = parseInt(dd.elements.namedItem(ae('Max_LMob')).value);
    var di = parseInt(dd.elements.namedItem(ae('Min_LMob')).value);
    var dj = dd.elements.namedItem(ae('dronebycolorchoice'));
    var dk = dd.elements.namedItem(ae('dronebylesscolor'));
    var dl = parseInt(dd.elements.namedItem(ae("reifidomesnefed".z())).value);
    var dn = parseInt(dd.elements.namedItem(ae('forcemin')).value);
    var dp = dd.elements.namedItem(ae('fightforce'));
    var dq = false;
    var input = parseInt(dd.elements.namedItem(ae('FighterDroneForceDefault')).value);
    if ((isNaN(input)) || (input < 1) || (input > 9)) {
        alert("detadpu ton secnereferP  .)secnereferP enorD rethgiF( ecroF enorD rethgiF tluafeD rof tupni dilavnI".z());
        av = true;
    } else if ((!ao) && (input > 1)) {
        alert("detadpu ton secnereferP  .)secnereferP enorD rethgiF( rotanod tnerruc a era uoy sselnu dewolla ton si 1 > ecroF enorD rethgiF tluafeD".z());
        av = true;
    } else if (ag.FighterDroneForceDefault != input) {
        ag.FighterDroneForceDefault = input;
        dq = true;
    }
    var dr = dd.elements.namedItem(ae('dronebycolor'));
    if (ag.dronebycolor != dr.options[dr.selectedIndex].value) {
        ag.dronebycolor = dr.options[dr.selectedIndex].value;
        dq = true;
    }
    if (ag.dronebylesscolor != dk.checked) {
        ag.dronebylesscolor = dk.checked;
        dq = true;
    }
    if (ag.fightforce != dp.checked) {
        ag.fightforce = dp.checked;
        dq = true;
    }
    if (ag.forcemin != dn) {
        ag.forcemin = dn;
        if (ag.forcemin >= boss.max_stamina) {
            ag.forcemin = (boss.max_stamina - 1);
        }
        dq = true;
    }
    if (ag.dronebycolorchoice != dj.checked) {
        ag.dronebycolorchoice = dj.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('fight_active'));
    if (ag.fight_active != input.checked) {
        if (boss.actions.fighter) delete boss.actions.fighter;
        ag.fight_active = input.checked;
        dq = true;
    }
    input = parseInt(dd.elements.namedItem(ae('ForceAt_stamina')).value);
    if (ag.ForceAt_stamina != input) {
        ag.ForceAt_stamina = input;
        if (isNaN(ag.ForceAt_stamina) || (ag.ForceAt_stamina > boss.max_stamina)) {
            ag.ForceAt_stamina = boss.max_stamina;
        }
        dq = true;
    }
    input = parseInt(dd.elements.namedItem(ae('droneminexp')).value);
    if ((isNaN(input)) || (input < 0)) {
        alert("detadpu ton secnereferP  .)secnereferP enorD rethgiF( ecneirepxe muminim enorD rehgiF rof tupni dilavnI".z());
        av = true;
    } else {
        if (ag.droneMinExp != input) {
            GM_setValue(ad(Y + "diovApxEevitciderP".z()), '');
            ag.droneMinExp = input;
            dq = true;
        }
    }
    input = dd.elements.namedItem(ae('PredictiveAvoid'));
    if (ag.PredictiveAvoid != input.checked) {
        ag.PredictiveAvoid = input.checked;
        dq = true;
    }
    input = parseInt(dd.elements.namedItem(ae('droneTargetMinExp')).value);
    if ((isNaN(input)) || (input < 0)) {
        alert("detadpu ton secnereferP  .)secnereferP enorD rethgiF( ecneirepxe muminim enorD rehgiF tegraT rof tupni dilavnI".z());
        av = true;
    } else {
        if ((ag.droneTargetMinExp != input) || (input < ag.droneMinExp)) {
            if (input < ag.droneMinExp) {
                input = ag.droneMinExp;
            }
            GM_setValue(ad(Y + 'TargetExp'), '');
            ag.droneTargetMinExp = input;
            dq = true;
        }
    }
    input = parseInt(dd.elements.namedItem(ae('DroneMemTime')).value);
    if ((isNaN(input)) || (input < 5)) {
        alert("detadpu ton secnereferP  .)secnereferP enorD rethgiF( emit yromem muminim enorD rehgiF rof tupni dilavnI".z());
        av = true;
    } else {
        if (ag.DroneMemTime != input) {
            ag.DroneMemTime = input;
            dq = true;
        }
    }
    input = parseInt(dd.elements.namedItem(ae("meMkaeWsthgif_xaM".z())).value);
    if ((isNaN(input)) || (input < 0)) {
        alert("detadpu ton secnereferP  .)secnereferP enorD rethgiF( yromem thgif xam enorD rehgiF rof tupni dilavnI".z());
        av = true;
    } else {
        if (ag.TooWeakMemory != input) {
            ag.TooWeakMemory = input;
            var temp = GM_getValue(ad(Y + "thgiFoTkaeWooT".z()), '').split('\x7c');
            if (temp.length > ag.TooWeakMemory) {
                temp.splice(0, (temp.length - ag.TooWeakMemory));
            }
            GM_setValue(ad(Y + "thgiFoTkaeWooT".z()), temp.join('\x7c'));
            dq = true;
        }
    }
    input = parseInt(dd.elements.namedItem(ae("yenomnimenord".z())).value);
    if ((isNaN(input)) || (input < 0) || (input > 70000)) {
        alert("detadpu ton secnereferP  .)secnereferP enorD rethgiF( yenom muminim enorD rehgiF rof tupni dilavnI".z());
        av = true;
    } else {
        if (ag.droneMinMoney != input) {
            ag.droneMinMoney = input;
            dq = true;
        }
    }
    input = parseInt(dd.elements.namedItem(ae('droneTargetMinMoney')).value);
    if ((isNaN(input)) || (input < 0) || (input > 70000)) {
        alert("detadpu ton secnereferP  .)secnereferP enorD rethgiF( yenom muminim enorD rehgiF tegraT rof tupni dilavnI".z());
        av = true;
    } else {
        if ((ag.droneTargetMinMoney != input) || (input < ag.droneMinMoney)) {
            if (input < ag.droneMinMoney) {
                input = ag.droneMinMoney;
            }
            GM_setValue(ad(Y + 'TargetMoney'), '');
            ag.droneTargetMinMoney = input;
            dq = true;
        }
    }
    input = dd.elements.namedItem(ae('dronetarget'));
    if (ag.fighttarget != input.checked) {
        ag.fighttarget = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('DroneIgnoreLevelB'));
    if (ag.DroneIgnoreLevelB != input.checked) {
        ag.DroneIgnoreLevelB = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('DroneIgnoreMembersB'));
    if (ag.DroneIgnoreMembersB != input.checked) {
        ag.DroneIgnoreMembersB = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('DroneIgnoreOnlineB'));
    if (ag.DroneIgnoreOnlineB != input.checked) {
        ag.DroneIgnoreOnlineB = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('DroneIgnoreListB'));
    if (ag.DroneIgnoreListB != input.checked) {
        ag.DroneIgnoreListB = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('DroneIgnoreTimesB'));
    if (ag.DroneIgnoreTimesB != input.checked) {
        ag.DroneIgnoreTimesB = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('DroneIgnoreExpB'));
    if (ag.DroneIgnoreExpB != input.checked) {
        ag.DroneIgnoreExpB = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('DroneIgnoreMoneyB'));
    if (ag.DroneIgnoreMoneyB != input.checked) {
        ag.DroneIgnoreMoneyB = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('droneIgnoreOnline'));
    if (ag.droneIgnoreOnline != input.checked) {
        ag.droneIgnoreOnline = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('droneTargetMoney'));
    if (ag.droneTargetMoney != input.checked) {
        ag.droneTargetMoney = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('droneTargetExp'));
    if (ag.droneTargetExp != input.checked) {
        ag.droneTargetExp = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae('dronemark'));
    if (ag.fightlistmark != input.checked) {
        ag.fightlistmark = input.checked;
        dq = true;
    }
    input = dd.elements.namedItem(ae("reifidomlliksfed".z())).value;
    if (ag.defskillmod != input) {
        ag.defskillmod = input;
        dq = true;
    }
    if (ag.fight_active == false) {
        ag.override = false;
    }
    if (ag.minmob != df) {
        ag.minmob = df;
        dq = true;
    }
    if (ag.maxfights != dg) {
        ag.maxfights = dg;
        dq = true;
    }
    if (ag.maxmob != de) {
        ag.maxmob = de;
        dq = true;
    }
    if (ag.minlevel != di) {
        ag.minlevel = di;
        dq = true;
    }
    if (ag.maxlevel != dh) {
        ag.maxlevel = dh;
        dq = true;
    }
    var temp;
    if (ag.maxmob == 0) {
        temp = Infinity;
    } else {
        temp = ag.maxmob;
    }
    if (temp < ag.minmob) {
        ag.maxmob = ag.minmob;
        dq = true;
    }
    if (ag.enemydefensemodifier != dl) {
        ag.enemydefensemodifier = dl;
        dq = true;
    }
    if (ag.maxlevel == 0) {
        temp = Infinity;
    } else {
        temp = ag.maxlevel;
    }
    if (temp < ag.minlevel) {
        ag.maxlevel = ag.minlevel;
        dq = true;
    }
    return dq;
}
function cI() {
    if (document.body) {
        if (document.body.innerHTML.match(/New York City City Jail/) || (document.location && document.location.href == "/liaj/srawbom/moc.koobecaf.www//:ptth".z())) {}
    }
}
function ResetQueue() {
    for (var dd in ah) {
        clearTimeout(ah[dd]);
    }
    for (var de in boss.actions) {
        delete boss.actions[de];
    }
    boss.save();
    P();
}
function cJ() {
    var dd = document.getElementById(ae('HeistQueue'));
    var de = document.getElementById(ae('queue'));
    var df = '';
    if (de && dd) {
        for (var i in boss.actions) {
            if (boss.actions[i].queue == 'Heist') {
                var dg = new Date(parseFloat(boss.actions[i].time) * 1000);
                var dh = dg.toTimeString() + '';
                dd.style.display = 'block';
                df += '\x20' + boss.actions[i].message + " ta psbn&psbn&psbn&>rb<".z() + dh.substr(0, 8) + '<br>';
            } else if (i != 'refresh') {
                de.innerHTML += "\"=di naps<>rb<".z() + ad(i) + '"></span>';
            }
        }
        for (var k in boss.actions) {
            if (k != 'refresh') {
                var dg = new Date(parseFloat(boss.actions[k].time) * 1000);
                var dh = dg.toTimeString() + '';
                var message = document.getElementById(ae(k));
                if (message) message.innerHTML = '\x20' + boss.actions[k].message + " ta psbn&psbn&psbn&>rb<".z() + dh.substr(0, 8);
            }
        }
        var di = document.getElementById(ae('HeistPop'));
        if (di) {
            di.addEventListener('mouseover', help = function (event) {
                HelpHover.show('Heist Tasks', df, event);
            }, true);
            di.addEventListener('mouseout', HelpHover.hide, true);
        }
    }
}
var cK, cL = document.title,
    cM = 19,
    cN = 0;

function notify() {
    cN = 0;
    cK = setInterval(function () {
        if (cN < cM) {
            cN++;
            document.title = (document.title.indexOf(" !DEDEEN NOITNETTA".z()) != -1) ? cL : " !DEDEEN NOITNETTA".z() + cL;
        } else {
            clearInterval(cK);
        }
    }, 600);
}
var cO, cur_f = 0;

function cP(dd, de) {
    cur_f = 0;
    cO = setInterval(function () {
        if (cur_f < de) {
            cur_f++;
            setTimeout("'(dIyBtnemelEteg.tnemucod = jboj rav{ yrt".z() + ae(dd) + "');" + " };)(yalP.jboj{ )yalP.jboj( fi".z() + "}};'peeb tnac' worht{ esle };)(yalp.jboj{ )yalp.jboj( fi esle".z() + "};)(peeb.)(tiklooTtluafeDteg.tiklooT.twa.avaj.segakcaP.wodniw{ )xe(hctac".z(), 1);
        } else {
            clearInterval(cO);
        }
    }, 1600);
}
var snds = [
    ['Java - Beep', ''],
    ['Midi - Note', ''],
    ["1 tneibmA - hsalF".z(), "lmth.trela/1epacSdnuoStneibmA/sdnuoStrelA/repleHotuAWM".z()],
    ["2 tneibmA - hsalF".z(), "lmth.trela/2epacSdnuoStneibmA/sdnuoStrelA/repleHotuAWM".z()],
    ["1 kcoR poP - hsalF".z(), "lmth.trela/1kcoRpoP/sdnuoStrelA/repleHotuAWM".z()],
    ["2 kcoR poP - hsalF".z(), "lmth.trela/2kcoRpoP/sdnuoStrelA/repleHotuAWM".z()],
    ["1 onhceT - hsalF".z(), "lmth.trela/1onhceT/sdnuoStrelA/repleHotuAWM".z()],
    ["2 onhceT - hsalF".z(), "lmth.trela/2onhceT/sdnuoStrelA/repleHotuAWM".z()]
];

function alertSound(dd, de, df) {
    if (ag.alertsound || df) {
        var dg = document.getElementById(ae('alertSound2'));
        if (!dg) {
            var dh = document.createElement('style');
            if (dh) dh.type = 'text/css';
            dg = document.createElement('div');
            if (dg) dg.id = ad('alertSound2');
            if (dh) {
                dh.innerHTML = "\x23" + ae('alertSound2') + "} ;neddih :ytilibisiv ;kcolb :yalpsid ;xp0 :tfel ;xp0 :pot ;etulosba :noitisop { ".z();
                var di = document.getElementsByTagName('head');
                if (di) di = di[0];
                if (di) di.appendChild(dh);
            }
            if (document) {
                if (document.body) {
                    if (dg) document.body.insertBefore(dg, document.body.lastChild);
                }
            }
        }
        if (dd.match('Flash')) {
            var dj = "/moc.ilmoc.haambf//:ptth".z();
            for (var i = 0; i < snds.length; i++) {
                if (dd == snds[i][0]) {
                    setTimeout(function () {
                        if (dg) dg.innerHTML = "\"=crs emarfi<".z() + dj + snds[i][1] + '"></iframe>';
                    }, 1500);
                    break;
                }
            }
        } else if (dd.match('Java')) {
            var dk = document.createElement("embed");
            if (dk) {
                dk.setAttribute("id", ad("javabeep"));
                dk.setAttribute("src", "success.wav");
                dk.setAttribute("width", "\x31");
                dk.setAttribute("height", "\x31");
                dk.setAttribute("type", "4.1=noisrev;telppa-avaj-x/noitacilppa".z());
                dk.setAttribute("sucof_laitini".z(), "false");
                dk.setAttribute("codebase", "http://");
                dk.setAttribute("archive", "raj.sdnuoStl".z());
                dk.setAttribute("code", "SndPlay");
                if (dg) dk = dg.appendChild(dk);
                cP(ae("javabeep"), de);
            }
        } else if (dd.match('Midi')) {
            var dk = document.createElement("embed");
            if (dk) {
                dk.setAttribute("id", ad("midinote"));
                dk.setAttribute("src", "D3%AwLF2%HAARB4XDmWUQCgKADACwIABEg1F2%AAwACk1F2%AASoHMQUF2%DQJAAAArJHVNBeABAAAAYAAAAAZoRVT,46esab;idim/oidua:atad".z());
                dk.setAttribute("width", "\x31");
                dk.setAttribute("height", "\x31");
                dk.setAttribute("autostart", "false");
                dk.setAttribute("loop", "false");
                if (dg) dk = dg.appendChild(dk);
                cP(ae("midinote"), de);
            }
        }
    }
}
function cQ() {
    var dd = Utils.getElementsByClassName('cap');
    if ((document.body) && ((dd.length) || (document.body.innerHTML.search(/cap_value/i) > -1) || (document.body.innerHTML.search(/cap_answer/i) > -1))) {
        for (var t in ah) {
            if (ah[t]) clearTimeout(ah[t]);
        }
        aJ.Retries += 1;
        GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
        var de;
        var df;
        var dg;
        if (dd.length) {
            df = Utils.getElementsByXPath("]\"rewsna_pac\"=eman@[tupni//.".z())[0];
            dg = 'alpha';
        } else {
            df = Utils.getElementsByXPath("]\"eulav_pac\"=eman@[tupni//.".z())[0];
            dg = 'num';
        }
        var dh = Utils.getElementsByXPath("])\"php.egami_ahctpac\" ,crs@(sniatnoc[gmi//.".z())[0];
        if (aJ.UseIt) {
            aJ.stime = new Date().getTime();
            df.disabled = true;
            if (g) {
                var di = new Image();
                di.addEventListener("load", function () {
                    SendImage(SB_convertImgToBase64Format(di), df, dg, dh.src);
                }, true);
                di.src = dh.src;
            } else {
                bO(dh, df, dg, dh.src);
            }
        } else {
            var message = document.getElementById(ae("ahctpaCraWboM".z()));
            if (ag.ShowCaptcha) {
                if (message) message.innerHTML = "\"=crs gmi<>retnec<".z() + dh.src + '" id="' + ad("gmIahctpaCraWboM".z()) + ">retnec/<>05=thgieh 001=htdiw \"".z();
            }
            var dj = document.getElementById(ae('scripterror'));
            if (dj) dj.innerHTML = '';
            if (!ag.PromptAlert) {
                notify();
                alertSound(ag.sndid, ag.sndrepeat);
                CaptchaInput.init(df, "!!noitnetta namuH deeN -- rorrE ahctpaC elbissoP".z(), dg, dh.src);
            } else {
                de = prompt("!!noitnetta namuH deeN -- rorrE ahctpaC elbissoP".z());
                if (de) {
                    df.value = de.substr(0, ag.captchalength);
                    Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni".z(), df.parentNode)[0].click();
                }
            }
        }
        aN = true;
    } else {
        aJ.Retries = 0;
        GM_setValue(ad(Y + "revloSahctpaC".z()), aJ.toSource());
    }
}
CaptchaInput = new Object();
CaptchaInput.init = function (dd, de, df, dg) {
    if (df == 'num') {
        if (ag.captchatimeoutlength != 0) {
            var dh;
            if (Page['homelink']) {
                dh = Page['homelink'];
            } else {
                dh = GM_getValue(ad(Y + 'Lhomelink'), "http://apps.facebook.com/mobwars/");
            }
            Timer.start(dh, "derewsna ton fi gnitnuh ytnuoB gnilecnaC>rb<....tupni resu rof gnitiaW".z(), (ag.captchatimeoutlength * 60), 'captcha', false);
            setTimeout(function () {
                ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
                ag.hitlist_active = false;
                GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
            }, (((ag.captchatimeoutlength * 60) * 1000) - 100));
        }
    }
    this.answer = dd;
    this.div = document.createElement('div');
    this.div.className = ad("kcehC_ahctpaC".z());
    var di = "\x2e" + ae("kcehC_ahctpaC".z()) + "}xp05 :thgieh-nim ;xp004 :htdiw ;xp01 :gniddap ;kcalb dilos xp1 :redrob ;etihw :roloc-dnuorgkcab ;otua :wolfrevo ;xp002 :pot ;xp802 :thgir ;79 :xedni-z ;dexif :noitisop ;retnec :ngila-txet ;kcolb :yalpsid{ ".z();
    GM_addStyle(di);
    this.div.innerHTML = "\"=di naps<>retnec<".z() + ad("Captcha") + ">2h<>rh<>naps/<>\"".z() + de + ">retnec/<>2h/<".z();
    this.rule = document.createElement('hr');
    this.rule.id = ad('cap_rule');
    this.div.appendChild(this.rule);
    this.form = document.createElement('form');
    this.form.action = '';
    this.form.method = '';
    this.form.id = ad("tupni_HA_pac".z());
    this.div.appendChild(this.form);
    this.input = document.createElement('div');
    this.input.innerHTML = "\"=rof lebal<".z() + ad("tupnIahctpaC".z()) + "\"=eman \"txet\"=epyt tupni<>rb<>lebal/<.egap eht no yltcerid ro ,ereh rewsna ahctpac eht retne esaelP>\"".z() + ae("tupnIahctpaC".z()) + "\"=htgnelxam \"".z() + ag.captchalength + '" size="' + ag.captchalength + ">rb<>rb<>/\"\"=eulav \"".z();
    if (ag.ShowCaptcha) {
        this.input.innerHTML += '<img src="' + dg + '" id="' + ad("gmIahctpaCWM".z()) + ">rb<>rb<>05=thgieh 001=htdiw \"".z();
    }
    if (ag.alertsound) {
        this.input.innerHTML += '<a id="' + ad("stopit") + ">rb<>rb<>a/<dnuoS potS>\"".z();
    }
    this.form.appendChild(this.input);
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.id = ad("timbus_HA_pac".z());
    this.button.innerHTML = "rewsnA timbuS".z();
    this.form.appendChild(this.button);
    document.getElementsByTagName('body')[0].appendChild(this.div);
    this.form.elements.namedItem(ae("tupnIahctpaC".z())).focus();
    this.button.addEventListener('click', this.eventListener(), true);
    this.form.addEventListener('submit', this.eventListener(), true);
    var dj = document.getElementById(ae('stopit'));
    if (dj) dj.addEventListener('click', function () {
        cur_f = Infinity;
        var temp = document.getElementById(ae('alertSound2'));
        if (temp) {
            temp.parentNode.removeChild(temp);
        }
    }, true);
};

function cR(dd) {
    var de = document.getElementById(ae('processtime'));
    if (de) de.innerHTML = '<br>Time: ' + (new Date().getTime() - dd);
}
CaptchaInput.eventListener = function () {
    var dd = this;
    return function (de) {
        de.preventDefault();
        var input = dd.form.elements.namedItem("tupnIahctpaC".z()).value;
        dd.div.style.display = 'none';
        cur_f = Infinity;
        var temp = document.getElementById(ae('alertSound2'));
        if (temp) {
            temp.parentNode.removeChild(temp);
        }
        dd.answer.disabled = false;
        if (input) {
            dd.answer.value = input.substr(0, ag.captchalength);
            Utils.getElementsByXPath("]\"timbus\"=epyt@[tupni".z(), dd.answer.parentNode)[0].click();
        }
    };
};
if (!ag.skillAlloc) {
    ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
    ag.skillAlloc = [];
    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
}
if (ag.skill) {
    ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
    ag.skillAlloc[0] = ag.skill;
    delete ag.skill;
    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
}
if (ag.skill2) {
    ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
    ag.skillAlloc[1] = ag.skill2;
    delete ag.skill2;
    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
}
if (ag.skill3) {
    ag = eval(GM_getValue(ad(Y + 'UserPrefs'), '({})'));
    ag.skillAlloc[2] = ag.skill3;
    delete ag.skill3;
    GM_setValue(ad(Y + 'UserPrefs'), ag.toSource());
}
var boss;
var itemlist;
var heists;
var GodFatherL;
var cS = new Date((1579612782 - be) * 1000);
var cT = cS.getFullYear() + '';
if (ao) an = 6;
var cU = cS.toTimeString() + '';
var cV = (cS.getMonth() + 1) + '\x2f' + cS.getDate() + '\x2f' + cT.substr(2, 2) + '\x20' + cU.substr(0, 8);
aU = GM_getValue(ad(Y + 'InYourMob'), '').split('\x7c');
aV = GM_getValue(ad(Y + 'hitlistblock'), '').split('\x2c');
bc = GM_getValue(ad(Y + "tsilkcolBediRrevO".z()), '').split('\x7c');
aW = GM_getValue(ad(Y + "kcolbemittsiltih".z()), '').split('\x2c');
aY = GM_getValue(ad(Y + "kcolbemitlla".z()), '').split('\x2c');
aX = GM_getValue(ad(Y + 'fdtimeblock'), '').split('\x2c');
aZ = GM_getValue(ad(Y + 'lptimeblock'), '').split('\x2c');
ba = GM_getValue(ad(Y + 'fightlistblock'), '').split('\x2c');
bb = GM_getValue(ad(Y + "srentraPleveL".z()), '').split('\x2c');
var cW;
try {
    boss = new bq();
    cF();
    if (ag.PageRefreshIntrvl == 0) aA = Infinity;
    else aA = ax(ag.PageRefreshIntrvl, 5);
    itemlist = new bu();
    heists = new ce();
    GodFatherL = new cH();
    aT();
    if (ag.blockpresence) {
        var p = document.getElementById('presence');
        if (p) p.parentNode.removeChild(p);
    }
} catch (aS) {
    if (h) alert(" enil no eludom ni rorrE );)(ssoB wen = ssob(".z() + aS.lineNumber + ": " + aS.message);
    cW = aS;
}
if (ag.fbhide) {
    if (CanHide()) {
        bk = 0;
    }
}
if (pageWidth() < 1000) {
    bk += 21;
}
function aF() {
    for (linker = 0; linker < document.links.length; linker++) {
        if (ag.HitAllSource && document.links[linker].href.match(/hitlist/i) && !document.links[linker].href.match(/\/hitlist\/rig_ignition.php|\/hitlist\/add.php/)) {
            document.links[linker].href = document.links[linker].href.replace(/apps.facebook.com\/mobwars/ig, "moc.cnisemagretsnom.noitcudorp.wm.0bl".z());
            document.links[linker].setAttribute('onclick', '');
        }
        if ((!document.links[linker].href.match(/from=profile/i) || (document.links[linker].href.match(/\/hitlist\/rig_ignition.php|\/hitlist\/add.php|\/profile\/message.php/))) && document.links[linker].href.match(/mobwars/i)) {
            document.links[linker].addEventListener('click', function () {
                S = false;
                T = true;
                B = this.href;
                this.removeEventListener('click', arguments.callee, true);
            }, true);
        } else if (document.links[linker].href.match(/from=profile/i) && document.links[linker].href.match(/mobwars/i)) {
            document.links[linker].addEventListener('click', function () {
                S = false;
                T = true;
                this.removeEventListener('click', arguments.callee, true);
            }, true);
        }
    }
    var dd = Utils.getElementsByXPath("])\"moc.cnisemagretsnom\" ,noitca@(sniatnoc ro )\"srawbom\" ,noitca@(sniatnoc[mrof//.".z());
    for (var de = 0; de < dd.length; de++) {
        var df = dd[de].getElementsByTagName('INPUT');
        for (var k = 0; k < df.length; k++) {
            if (df[k].type == 'submit') {
                df[k].addEventListener('click', function () {
                    S = false;
                    T = true;
                    this.removeEventListener('click', arguments.callee, true);
                }, true);
            }
        }
    }
}
var cX = 0;

function MainStuff(dd) {
    if (S) {
        if (h) z("....nur dnoces gnitroba ....noisilloC FFUTSNIAM".z(), 0);
        return;
    } else {}
    S = true;
    if (h) z(" .....noitareti ffutSniaM".z() + cX, 2);
    bU = false;
    var de = new Date().getTime();
    for (var df in ah) {
        clearTimeout(ah[df]);
    }
    ah['SafeRefresh'] = setTimeout(function () {
        if (h) z("....daoler egap HSERFER EFAS".z(), 0);
        P();
    }, 5000);
    aN = false;
    aO = false;
    if (!Utils.getElementsByXPath("])\"tnetnoc_xaja\" ,di@(sniatnoc[vid//".z())) {
        if (h) z("egap gnidaoleR ....vid \"tnetnoc_xaja\" dnif t'ndluoC".z(), 0);
        ah['ajax_contentSearch'] = setTimeout(function () {
            P();
        }, 5000);
        aN = true;
    }
    if (!B.match(/facebook/)) w = '';
    else w = "_3437543478ppa".z();
    var button = document.getElementById(ae('Mobster'));
    if (button) button.parentNode.removeChild(button);
    button = document.getElementById(ae('alertSound2'));
    if (button) button.parentNode.removeChild(button);
    aw = false;
    var dg = document.getElementsByTagName('iframe');
    for (var i = 0; i < dg.length; i++) dg[i].parentNode.removeChild(dg[i]);
    var dh;
    try {
        if (cX > 0) {
            Page.init();
        }
        if (!U) cX++;
        U = false;
        boss.updateData();
        if (Page.c_user) {
            boss.c_user = Page.c_user;
        }
    } catch (di) {
        if (h) alert(" enil no eludom ni rorrE );)(tini.egaP(".z() + di.lineNumber + ": " + di.message);
        dh = di;
    }
    aF();
    if (boss.stamina >= ag.staminaregen) if (boss.actions.stamina) delete boss.actions.stamina;
    var dj = GM_getValue(ad(Y + "heal_cost"), '');
    if (dj != '') {
        boss.heal_cost = parseInt(dj);
        GM_setValue(ad(Y + "heal_cost"), '');
    }
    var dk = GM_getValue(ad(Y + "bank_cash"), '');
    if (dk != '') {
        boss.bank_cash = parseInt(dk);
        GM_setValue(ad(Y + "bank_cash"), '');
    }
    var dl = eval(GM_getValue(ad(Y + "neededAction"), ''));
    if (dl) {
        boss.actions.neededAction = dl;
        GM_setValue(ad(Y + "neededAction"), '');
    }
    var dn = GM_getValue(ad(Y + 'MustGoTo'), '');
    if (dn != '') {
        GM_setValue(ad(Y + 'MustGoTo'), '');
        if (h) z(" :oT oG tsuM".z() + dn, 0);
        location.href = dn;
        aN = true;
    }
    try {
        bf.init();
    } catch (di) {}
    var dp = bd(aY);
    if (dp.blocked) {
        var dq = document.getElementById(ae('targetlock'));
        if (dq) dq.innerHTML = ">rb<>retnec/<)secnereferp ni tes sa(>rb<yad fo emit eht fo esuaceb detavitcaed LLA>retnec<>rb<".z();
        aO = true;
        Q('', (dp.time - Math.floor(new Date().getTime() / 1000)), "...gnitratseR".z());
    }
    try {
        bh(ag);
    } catch (di) {
        if (h) {
            var dr = document.getElementById(ae('scripterror'));
            if (dr) dr.innerHTML = " enil no eludom ni rorrE".z() + di.lineNumber + ": " + di.message + ">/ rb<>/ rb<".z();
        }
    }
    try {
        cC(cV, dd);
    } catch (di) {
        if (h) {
            var ds = document.getElementById(ae('scripterror'));
            if (ds) ds.innerHTML = " :noitamrofni thgif gnibbarg rorrE".z() + di.lineNumber + ": " + di.message + ">/ rb<>/ rb<".z();
        }
    }
    boss.fights.target_id = '';
    boss.fights.bounty_id = '';
    boss.fights.target_name = '';
    boss.fights.target_amount = 0;
    boss.fights.hitlist = false;
    if (cW) {
        if (h) {
            var dt = document.getElementById(ae('scripterror'));
            if (dt) dt.innerHTML = " enil no 'esab' eludom ni rorrE".z() + cW.lineNumber + ": " + cW.message + ">/ rb<>/ rb<".z();
        }
    }
    if (dh) {
        if (h) {
            var dt = document.getElementById(ae('scripterror'));
            if (dt) dt.innerHTML = " enil no 'sab' eludom ni rorrE".z() + dh.lineNumber + ": " + dh.message + ">/ rb<>/ rb<".z();
        }
    }
    bT();
    bS();
    bQ();
    cQ();
    cI();
    if (!aN) {
        for (var j = 0; j < modules.length; j++) {
            if (aQ[modules[j] + '_e']) {
                try {
                    aQ[modules[j] + '_e']();
                } catch (di) {
                    var du = document.getElementById(ae('scripterror'));
                    if (du) du.innerHTML = "' eludom ni rorrE".z() + modules[j] + "' on line " + di.lineNumber + ": " + di.message + ">/ rb<>/ rb<".z();
                }
            }
        }
    }
    if ((ag.refreshdelay >= aR) && (ag.refreshdelay != 0)) {
        var dv = new Object();
        if (boss.actions.refresh) delete boss.actions.refresh;
        dv.message = "....hserfeR ytivitcanI".z();
        switch (Math.floor(Math.random() * 4)) {
        case 0:
            dv.page = '';
            break;
        case 1:
            dv.page = 'profile';
            break;
        case 2:
            dv.page = 'fight';
            break;
        case 3:
            dv.page = 'jobs';
            break;
        default:
            dv.page = 'profile';
            break;
        }
        dv.func = '';
        dv.params = [];
        dv.time = Math.floor(new Date().getTime() / 1000) + ag.refreshdelay;
        boss.actions.refresh = dv;
    }
    if (document.body && document.body.innerHTML.match(/This page is being heavily rate limited. Please avoid constantly refreshing this page./)) {
        var dv = new Object();
        if (boss.actions.errorrefresh) delete boss.actions.errorrefresh;
        if (boss.actions.hitlist) delete boss.actions.hitlist;
        dv.message = "....timil etar rof gnisuaP".z();
        dv.page = Page.c_page;
        dv.func = '';
        dv.params = [];
        dv.time = Math.floor(new Date().getTime() / 1000) + 30;
        boss.actions.errorrefresh = dv;
    } else {
        if (boss.actions.errorrefresh) delete boss.actions.errorrefresh;
    }
    if (document.title.match(/you are using automation/i)) {
        aN = true;
        Timer.start(B, "....gnitratser dna gnisuap ,\"noitamotua\" rof deggalF".z(), ax((60 * 60 * 1), (30 * 60)), 'automation', false);
    }
    if (ag.AdminNoHeal) {
        if (boss.actions.hospital) {
            for (var x in boss.actions) {
                if (x.match(/stockpile/i) || x.match(/city/i) || x.match(/jobs_check/i) || x.match(/skill/i) || x.match(/godfather/i) || (x == 'bank')) {
                    delete boss.actions.hospital;
                    var message = document.getElementById(ae('autoheal'));
                    if (message) message.innerHTML = ">rb<>tnof/<>retnec/<)nimdA( FFO si laeHotuA>retnec<>der=roloc tnof<".z();
                    break;
                }
            }
        }
    }
    var dw = new Object();
    var dx;
    dw.time = Infinity;
    for (var k in boss.actions) {
        if (aI & bg(380489) & !aN & !aO) {
            if (boss.actions[k].time < dw.time) {
                dw = boss.actions[k];
                dx = k;
            }
        }
    }
    if (!dx) {
        boss.new_level = 0;
        boss.save();
        afterTasks();
        if (h) cR(de);
        return;
    }
    var dy;
    if (dw.time < boss.jail_delay) dw.time = boss.jail_delay;
    if (dw.time == Infinity) {
        dy = ag.timerdelay;
    } else {
        dy = dw.time - Page.now;
    }
    if (dy < 0) dy = 0;
    var dz;
    if ((dw.url_params != '') && (dw.url_params != undefined)) {
        dz = dw.url_params;
    } else if (dw.page == 'NextLink') {
        dz = 'user_id=' + dw.user_id;
    } else {
        dz = dw.page;
    }
    if (dz.match(/Job/)) {
        dz = dz.substr(3);
    }
    var dA = dw.page;
    if (dw.Compare) dA = dw.Compare;
    else {
        if (dw.page == 'homelink') dA = '';
        else if (dw.page == 'boss') dA = 'profile';
        else if (dw.page == 'allprof') dA = 'profile';
        else if (dw.page == 'vehicle') dA = 'stockpile';
        else if (dw.page == 'armor') dA = 'stockpile';
        else if (dw.page == 'weapon') dA = 'stockpile';
        else if (dw.page == 'power_item') dA = 'stockpile';
        else if (dw.page == 'accept_boost') dA = 'mob';
        else if (dw.page.match(/Job/)) dA = 'jobs';
    }
    var dB;
    if (location.hash) {
        dB = B;
    } else {
        dB = B;
    }
    var dC = dw.page;
    if (dC.length == 0) {
        dC = 'homelink';
    }
    if (dC == 'boss') {
        dC = 'profile';
    }
    if ((!dB.match(dz) || (Page.c_page != dA)) && ((dw.func != 'bk_deposit') || !ag.FastBackgroundBank)) {
        if (dw.url_params) {
            if (Page[dC]) {
                if (Page[dC].href.match(/\?/)) {
                    url = Page[dC].href + '\x26' + dw.url_params;
                } else {
                    url = Page[dC].href + '\x3f' + dw.url_params;
                }
            } else {
                url = GM_getValue(ad(Y + '\x4c' + dC), "http://apps.facebook.com/mobwars/");
                if (url.match(/\?/)) {
                    url = url + '\x26' + dw.url_params;
                } else {
                    url = url + '\x3f' + dw.url_params;
                }
            }
        } else {
            if (Page[dC]) {
                url = Page[dC];
            } else {
                url = GM_getValue(ad(Y + '\x4c' + dC), "http://apps.facebook.com/mobwars/");
            }
        }
        Timer.start(url, dw.message, dy, 'action', false);
        if (!dw.func) {
            if (!dw.save) {
                delete boss.actions[dx];
            } else {
                if ((dw.time <= Page.now) && !dw.SelfDelete) {
                    delete boss.actions[dx];
                }
            }
        }
        cJ();
    } else if (dw.func) {
        aQ[dw.func](dw.params, dy);
        if (!dw.save) {
            delete boss.actions[dx];
        } else {
            if ((dw.time <= Page.now) && !dw.SelfDelete) {
                delete boss.actions[dx];
            }
        }
        cJ();
    } else {
        var dD;
        if (dw.url_params) {
            if (Page[dC]) {
                if (Page[dC].href.match(/\?/)) {
                    dD = Page[dC].href + '\x26' + dw.url_params;
                } else {
                    dD = Page[dC].href + '\x3f' + dw.url_params;
                }
            } else {
                url = GM_getValue(ad(Y + '\x4c' + dC), "http://apps.facebook.com/mobwars/");
                if (url.match(/\?/)) {
                    url = url + '\x26' + dw.url_params;
                } else {
                    url = url + '\x3f' + dw.url_params;
                }
            }
        } else {
            if (Page[dC]) {
                dD = Page[dC];
            } else {
                dD = GM_getValue(ad(Y + '\x4c' + dC), "http://apps.facebook.com/mobwars/");
            }
        }
        Timer.start(dD, dw.message, dy, 'action', false);
        if (!dw.save) {
            delete boss.actions[dx];
        } else {
            if ((dw.time <= Page.now) && !dw.SelfDelete) {
                delete boss.actions[dx];
            }
        }
        cJ();
    }
    boss.new_level = 0;
    boss.save();
    afterTasks();
    if (h) cR(de);
}
function cY(e) {
    var dd, de, df;
    switch (e.keyCode) {
    case 113:
        if (e.ctrlKey) bR();
        else sysp(false);
        break;
    case 115:
        HealFast(true);
        break;
    case 119:
        cu();
        break;
    case 120:
        cw();
        break;
    case 123:
        cv();
        break;
    default:
        break;
    }
}
function afterTasks() {
    if (ag.popuphelp) {
        addHelp();
    }
    try {
        if (!aN) cl();
    } catch (dd) {}
    if (!ag.bank_active_Any) {
        if (Page.c_page == 'hitlist') {
            if (B.indexOf('add.php', 0) > 0) {
                var de = Utils.getElementsByXPath("])\"php.od\",noitca@(sniatnoc[mrof//".z());
                if (de) de = de[0];
                var df = document.createElement('\x61');
                if (df) {
                    df.addEventListener('click', hitListCurrentUser, false);
                    df.innerHTML = ".resu siht tsiltih dna yenom wardhtiW".z();
                    if (de) de.appendChild(df);
                }
            }
        }
        if (Page.c_page == 'hitlist') {
            if (B.indexOf("php.noitingi_gir".z(), 0) > 0) {
                var dg = Utils.getElementsByXPath("])\"php.od\",noitca@(sniatnoc[mrof//".z());
                if (dg) dg = dg[0];
                var dh = document.createElement('\x61');
                if (dh) {
                    dh.addEventListener('click', RigCurrentUser, false);
                    dh.innerHTML = ".noitingi sbom siht giR dna yenom wardhtiW".z();
                    if (dg) dg.appendChild(dh);
                }
            }
        }
    }
    al(false);
    window.addEventListener('keypress', cY, true);
    if (!aN) notificationStart();
    clearTimeout(ah['SafeRefresh']);
}
var cZ = B;
S = false;
setTimeout(MainStuff, 0);

function da() {}
function notificationStart() {
    var dd;
    dd = document.getElementById(w + "tnetnoc_xaja".z());
    if (dd) dd.addEventListener("detresnIedoNMOD".z(), function (de) {
        if (de.relatedNode) {
            if (((de.relatedNode.id == w + "tnetnoc_xaja".z()) || (de.relatedNode.id.match(/mw_aj/i)) || (de.relatedNode.id.match(/mw_alert/i)))) {
                this.removeEventListener("detresnIedoNMOD".z(), arguments.callee, true);
                T = false;
                if (h) setTimeout(function () {
                    R(de.relatedNode.id, "DIedoNdetaler".z());
                }, 0);
                if (h) setTimeout(function () {
                    z('AJAX: ' + de.relatedNode.id, 0);
                }, 0);
                if (h) setTimeout(function () {
                    z(" :tegraT :XAJA".z() + de.target.id, 0);
                }, 0);
                setTimeout(MainStuff, 0, de);
            }
        }
    }, true);
}
function db(dd, de) {
    if (dd.relatedNode.id == 'content') {
        if (de) de.addEventListener("detresnIedoNMOD".z(), function (e) {
            if (dd.relatedNode.id == 'content') {
                if (nodeInsertedProcess(e)) {
                    this.removeEventListener("detresnIedoNMOD".z(), arguments.callee, true);
                }
            }
        }, true);
        return true;
    }
    return false;
}
function dc(dd) {
    var de = document.getElementById(w + 'content');
    if (de) {
        de.addEventListener("detresnIedoNMOD".z(), function (df) {
            if (nodeInsertedProcess(df)) {
                this.removeEventListener("detresnIedoNMOD".z(), arguments.callee, true);
            }
        }, true);
        return true;
    }
    return false;
}
function nodeInsertedProcess(dd) {
    if (h) {
        var de = document.getElementById(ae('scripterror'));
        if (de) de.innerHTML += dd.relatedNode.id + '<br>';
    }
    if ((dd.relatedNode.id.match(/app8743457343_mw_aj/i)) || (cZ != B) || (dd.relatedNode.id.match(/app8743457343_mw_alert/i))) {
        cZ = B;
        setTimeout(MainStuff, 0, dd);
        return true;
    }
    return false;
}
function addHelp() {
    var dd = new Object();
    dd['prefs_button'] = document.getElementById(ae('prefs_button'));
    if (dd['prefs_button']) {
        dd['prefs_button'].addEventListener('mouseover', help = function (event) {
            HelpHover.show("nottuB secnereferP".z(), ".ereh \"secnereferP roivaheB elbisiV\" eht ot gniog yb swodniw pleh pUpoP eseht ffo nrut osla nac uoY>rb<>rb<>retnec/<>tnof/<!seciohc evah dluohs uoy >rb<,ssob bom eht era uoy ,rebmemeR>yerg=roloc tnof<>retnec<>rb<>rb<.etarepo dluohs tpircs siht woh rof seciohc ruoy lla retne nac uoy ereH".z(), event);
        }, true);
        dd['prefs_button'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['DonateButton'] = document.getElementById(ae('DonateButton'));
    if (dd['DonateButton']) {
        dd['DonateButton'].addEventListener('mouseover', help = function (event) {
            HelpHover.show("dedeeN snoitanoD".z(), ">elbat/<>rt/<>dt/<>rb<>rb<.delbane stifeneb eht dna ,raeppasid dluohs sda eht ,taht retfa stnemom wef A  .woleb retne dluohs uoy taht drowssap dna eman resu a htiw liame na eviecer )setunim nihtiw yllamron ,sruoh 42 xorppa nihtiw( lliw uoy ,edam si noitanod a retfA>dt<>rt<>rt/<>dt/<>retnec/<>elbat/<>rt/<>dt/<>retnec/<>tnof/<eliforP sraWboM/koobecaF reP>\"xp8 :ezis-tnof\"=elyts tnof<>retnec<>elbat/<>rt/<>dt/<stifeneb rotanod emitefiL - 53$>dt<>rt<>rt/<>dt/<stifeneb rotanod syaD 03 - 59.6$>dt<>rt<>elbat<>dt<>rt<>01=redrob elbat<>retnec<>dt<>rt<>rt/<>dt/<>retnec/<:)sralloD setatS detinU ni lla( seilppa gniwollof eht ,noitacilbup s'noisrev siht fo emit eht tA>rb<>retnec/<!erom dnA>rb<.6 ot 3 morf desaercni si sepins xam ehT>rb<.gnilaeh retsaf esu naC>rb<.dnamed no laeh naC>rb<.dnuorgkcab eht ni laeh naC>rb<.1 ot sdnoces 4 morf seog yaled remit nim ehT>rb<.sda yalpsid regnol oN>retnec<>rb<>rb<:lliw tpircs eht noitaicerppa ni ,tpircs siht fo tnempoleved eht troppus pleh ot etanod uoy fI>retnec<>dt<>rt<>\"%001\"=htdiw elbat<".z(), event);
        }, true);
        dd['DonateButton'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['hitlist_pref'] = document.getElementById(ae('hitlist_pref'));
    if (dd['hitlist_pref']) {
        dd['hitlist_pref'].addEventListener('mouseover', help = function (event) {
            HelpHover.show("nottuB seitnuoB tnuH".z(), ".ffo dna no ti nrut lliw nottub sihT  .seitnuob rof tsiltih eht tnuh lliw tpircs eht ,neercs ecnereferp eht no deretne ,sretemarap denifed resu no desaB".z(), event);
        }, true);
        dd['hitlist_pref'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['Fight_pref'] = document.getElementById(ae('Fight_pref'));
    if (dd['Fight_pref']) {
        dd['Fight_pref'].addEventListener('mouseover', help = function (event) {
            HelpHover.show("nottuB enorD rethgiF".z(), ".nrut a rof gnitiaw tub ,evitca si enord rethgif ehT :>tnof/<gnitiaW>egnaro=roloc tnof<>rb<.seitnuob gnitnuh fi neve flesti ecrof lliw enord rethgif eht ,level denifed resu a ot nwod animats lluf ta nehw ,secnereferp ni os od ot tes fI :>tnof/<decroF>eulb=roloc tnof<>rb<.sbom rehto pu gnitaeb ,gnikrow si enord rethgif ehT :>tnof/<evitcA>der=roloc tnof<>rb<:snoitca tnereffid eerht wohs yam nottub eht ,no elihW  .no dna ffo enord rethgif eht snrut nottub siht no gnikcilC>rb<>rb<.sretemarap ruoy lla pu tes ot neercs ecnereferp eht ot oG;psbn& .>tnof/<UOY>yerg=roloc tnof< ,ssob eht morf noitcerid sdeen ti tuB  .gnitnuh ytnuob ton era uoy revenehw uoy rof sbom rehto htiw gnithgif ruoy od dna tuo og lliw enord rethgif eht ,deksa fI".z(), event);
        }, true);
        dd['Fight_pref'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['LP_button'] = document.getElementById(ae('LP_button'));
    if (dd['LP_button']) {
        dd['LP_button'].addEventListener('mouseover', help = function (event) {
            HelpHover.show("nottuB egneveR/rentraP gnileveL".z(), ".dedeen sa ffo dna no siht nrut tsuj nac uoy rO  .etairporppa nehw enord rethgif dna gnitnuh ytnuob gnidirrevo -- )secnereferp rednu osla( ot ti ksa uoy sa netfo sa tsil ruoy urht og lliw ti dna ,no noitcnuf siht evael nac uoY  .ecnereferp ni tes sa ,ot ti ksa uoy )s(bom yna thgif dna tuo og lliw snoitcnuf egneveR/rentraP gnileveL eht ,deksa fI".z(), event);
        }, true);
        dd['LP_button'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['fights'] = document.getElementById(ae('fights'));
    if (dd['fights']) {
        dd['fights'].addEventListener('mouseover', help = function (event) {
            HelpHover.show("nottuB sthgiF".z(), ".egap eliforp bom a morf ro ,egap thgif eht no ,tsiltih eht no - dah ev'uoy sthgif eht lla fo tsil a si ereH".z(), event);
        }, true);
        dd['fights'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['BankD'] = document.getElementById(ae('BankD'));
    if (dd['BankD']) {
        dd['BankD'].addEventListener('mouseover', help = function (event) {
            HelpHover.show('Bank Button', ".hsac ruoy lla tisoped dna knab eht ot og ot nottub siht sserP  ?tsaf knab eht ni yenom tup ot deeN".z(), event);
        }, true);
        dd['BankD'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['HealFast'] = document.getElementById(ae('HealFast'));
    if (dd['HealFast']) {
        dd['HealFast'].addEventListener('mouseover', help = function (event) {
            HelpHover.show('Heal Button', ")dnuorgkcab eht ni ro lamron( secnereferp ni tes evah uoy edom eht yb laeh lliW  .uoy ta kool a ekat rotcod a evah dna latipsoh eht ot og ot nottub siht sserP  ?ylkciuq laeh ot deeN".z(), event);
        }, true);
        dd['HealFast'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['bvl_button'] = document.getElementById(ae('bvl_button'));
    if (dd['bvl_button']) {
        dd['bvl_button'].addEventListener('mouseover', help = function (event) {
            HelpHover.show("nottuB smitciV".z(), ".)sthgif lamron ni ro tsiltih eht no( dellik ev'uoy elpoep eht lla ,ot sknil dna ,fo tsil a dnif nac uoy ereH".z(), event);
        }, true);
        dd['bvl_button'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['disable_button'] = document.getElementById(ae('disable_button'));
    if (dd['disable_button']) {
        dd['disable_button'].addEventListener('mouseover', help = function (event) {
            HelpHover.show("wodniw resworb tnerruc ni elbasiD".z(), "?ecno ta sgniht lareves od nac taht fo wonk uoy od elpoep ynam woh ,ti evorp ot desserp drah eb dluow enoyna elihW  .noituac htiw esu ,yltsal dnA )4>rb<.wodniw ro bat taht no tpircs eht elbane-er osla lliw ,tpircs eht ni stroper tsil mitciv ro thgif eht ni knil a gniwollof ro ,wodniw sutats tpircs eht no snottub \"laeH\" ro \"knaB\" no gnikcilC )3>rb<.wodniw ro bat taht no tpircs eht elbane-er lliw ).cte ,egap thgif eht no resu kcatta ,tsiltih eht no resu kcatta ,sresu tsiltih( nottub a no gnikcilc -- sknil eht rof skrow ylno sihT )2>rb<.hguone gnol detiaw ev'uoy ,pu nwohs sah wodniw sutats eht fi ,yllacisaB  .delbasid tpircs eht peek llits lliw ti ,eno no kcilc uoy nehw/fi taht os ,weiv uoy egap hcae no sknil eht egnahc ot emit tpircs eht evig ot deen uoY )1>rb<.erutaef siht gnisu ni staevac elpuoc era erehT>rb<>rb<.wodniw ro bat rehtona ni snur tpircs eht elihw sraW boM ni dnuora ssem nac uoy os ,wodniw ro bat tnerruc eht ni tpircs eht elbasid nac uoy ereH".z(), event);
        }, true);
        dd['disable_button'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['log_button'] = document.getElementById(ae('log_button'));
    if (dd['log_button']) {
        dd['log_button'].addEventListener('mouseover', help = function (event) {
            HelpHover.show('Script Log', ".secnereferp gnihtiw morf no denrut eb tsum gniggol ehT  .tpircs eht yb nekat snoitca eht lla fo gol a dnif nac uoy ereH".z(), event);
        }, true);
        dd['log_button'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['Pause'] = document.getElementById(ae('Pause'));
    if (dd['Pause']) {
        dd['Pause'].addEventListener('mouseover', help = function (event) {
            HelpHover.show('Pause', ".snoitca yna gnimrofrep morf tpircs eht pots yliraropmet ot yaw derreferp ehT".z(), event);
        }, true);
        dd['Pause'].addEventListener('mouseout', HelpHover.hide, true);
    }
    dd['helpme'] = document.getElementById(ae('helpme'));
    if (dd['helpme']) {
        dd['helpme'].addEventListener('mouseover', help = function (event) {
            HelpHover.show('Help', ")  ): ....no dekrow teg lliw ti yademos( ytpme yltsom yltnerruC -- .emag eht yalp ot woh no noitamrofni lareneg htiw wodniw a snepO".z(), event);
        }, true);
        dd['helpme'].addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('chatAJ'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("0.2VHAWM dna sraW boM ssucsid emoC".z(), '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
}
function addPrefHelp() {
    var button = document.getElementById(ae('HealToMax'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('Heal to Max', ".gnilaeh dnameD nO ro dnuorgkcaB gnisu era uoy fi tceffe on evah lliw yllaussu ti ,neercs latipsoh eht ot og uoy nehw setavitca ylno siht ecniS>rb<>rb<.xam ot laeh yllacitamotua lliw uoy ,nwo ruoy ro noitca tpircs urht ,neercs latipsoh eht ta era uoy revenehw ,delbane fI>rb<>rb<.)flesti emag eht yb dewolla xam eht( %06 evoba kcab era uoy litnu laeh yllacitamotua lliw uoy ,evoba nevig % ruoy woleb llaf uoy revenehw neht ,)0 ton( no gnilaeh citamotua evah uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("dehcuotnUrehtaFdoG".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?stnioP rehtaFdoG emos esU toN oD".z(), ">retnec/<>tnof/<0 ot stluafeD>yerg=roloc tnof<>retnec<>rb<.tnuoma siht evah ydaerla uoy retfa deviecer stniop redisnoc ylno lliw tpircs ehT  .ereh meht retne ,gnisu redisnoc ot tpircs eht tnaw t'nod uoy stniop ynA  .meht deen thgim uoy nehw rof 'evreser' ni emos peek ot tnaw tsuj uoy rO  .redisni na eb ot ekil ,gib gnihtemos rof pu gnivas era uoy spahreP".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('JobDelay'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('Job Delay', ">retnec/<>tnof/<0 ot stluafeD>rb<setunim ni si yaleD boJ>yerg=roloc tnof<>retnec<>rb<.ti gnimrofrep yllautca erofeb ,boj a od dluoc uoy retfa emit fo tnuoma taht yltemaxorppa tiaw lliw tpircs eht dna ,ereh yaled a dda yam uoy ,yroeht siht ot ebircserp uoy fI  .boj taht morf smeti pord ro snopaew eht fo eno gnitteg fo sddo ruoy esaercni yam ,boj a od yllautca uoy erofeb ,boj a od nac uoy retfa emit emos rof gnitiaw taht ecnedive emos si erehT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("evitcatsiltih".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?tsiltiH etavitcA".z(), ".neercs sutats eht no nottub 'seitnuoB tnuH' eht morf ffo dna no denrut eb osla naC>rb<>rb<.enod eb ot sdeen taht esle gnihton si ereht revenehw tsiltih eht no seitnuob rof tnuh neht ,'seY' ot tes fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("evitcaredisni".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("redisnI sraWboM".z(), ">retnec/<>tnof/<.redisni na regnol on era>rb<uoy nehw dna redisni na emoceb uoy nehw>rb<,yllaunam siht tsujda tsum uoY>yerg=roloc tnof<>retnec<>rb<.smelborp esuac ylno nac redisni na yllautca ton era uoy nehw 'seY' ot siht gnitteS  .semit tiaw eurt ruoy tcelfer yletaruca erom ot detsujda era tpircs eht ni sremit suoirav eht ,'seY' ot tes fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('MaxBounty'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("ytnuoB mumixaM".z(), ")syawla ton ,niaga ,tub( sbom rekaew ot etauqe netfo seitnuob rellams ,ylralimiS  .)syawla ton tub(sbom regnorts ot etauqe netfo seitnuob rehgiH>rb<?kcatta ot gnilliw era uoy taht tegrat ytnuob mumixam eht si tahW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('MinBounty'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("ytnuoB muminiM".z(), ".'animats lluf ta fi ytnuob muminim eht erongI' rof 'oN' tes osla uoy sselnu - ytnuob on naht retteb si ytnuob emos -- animats lluf ta era uoy fi derongi eb lliw ytnuob tsellams eht ,yltnerruC>rb<?tsellams eht s'tahw ,kcatta ot gnilliw era uoy taht tegrat ytnuob mumixam eht htiw sa tsuJ".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("tegrattsiltih".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?tsiltih eht no kcip uoy dluohs ohW".z(), ".kcatta dna ,elbaliava yltnerruc ytnuob tsellams eht dnif ,tsil eht urht oG :>tnof/<ytnuoB tsewoL>yerg=roloc tnof<>rb<.kcatta dna ,elbaliava yltnerruc ytnuob tsegral eht dnif ,tsil eht urht oG :>tnof/<ytnuob tsehgiH>yerg=roloc tnof<>rb<.meht rof thgiarts og dna ,tsil eht no tegrat tsrif eht ekaT :>tnof/<emoC tsriF>yerg=roloc tnof<>rb<?tegrat uoy dluohs ohw ,elbaliava ytnuob eno naht erom si ereht fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("epinstsiltih".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?sepinS htiw tnuH".z(), ".evitceffe sa tsomla era yeht dna ,tuoba yrrow ot seussi rewef era erehT  .daoler egap eht gnittel dna ecno nottub kcatta eht gnittih ekil tsuj era skcatta >tnof/<efaS>yerg=roloc tnof<>rb<)flesti sraW boM ni sllik/sthgif yna rof tiderc teg llits ll'uoy ,gnidrocer tpircs stceffe ylno siht( sseccus gnidrocer tsil mitciv dna thgif tsrow eht sah taht )eerht lla fo( edom eht osla tub ,)sdnoces 53 rof( kcuts teg ot ylekil tsael eht ,sedom epins eht fo ,si noisrev sihT  .sedom efas dna epins fo noitanibmoc a yllacisab si >tnof/<epinS tsaF>yerg=roloc tnof<>rb<)epins nac ,ton ro tpircs ,enoyna hguohtla( tob a sa uoy galf dluoc koobecaf/sraW boM taht elbissop erom yletomer si ti dna ,flesruoy llik yllaitnetop dluoc uoy ,stsil mitciv dna thgif eht no dedrocer eb ton yam noitamrofni emos taht si ,revewoh ,sevitagen ehT  .)ti od ot eno eht eb ll'uoy yllufepoh dna( dellik si ssob ymene eht erofeb ni skcatta gnitteg fo ecnahc lanoitidda llams a uoy gnivig ,skcatta neewteb daoler ot egap eht rof tiaw ot gnivah tuohtiw ,ylkciuq yrev semit elpitlum tegrat a kcatta ot uoy wolla >tnof/<sepinS>yerg=roloc tnof<>rb<?dohtem tsefas eht esu ro ,sepins gnisu seitnuob rof tnuh ot tnaw uoy oD".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("eromepinstsiltih".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?eno naht erom kcattA".z(), ".urht og lla fi sepins 9 = hcae sepins 3 ,stegrat 3 :elpmaxE -- tsaf pu dda nac skcatta ,erutaef siht esu uoy fI :>tnof/<gninraW>der=roloc tnof<>rb<>rb<.tsil eht no enoyreve kcatta tsuj uoy dna derongi si evoba tes noitpo 'hcihw tegrat' ,erutaef siht esu uoy fI  ?meht fo lla kcatta uoy dluohs ,delbane sepins evah uoy dna ,tsil ytnuob eht no tegrat eno naht erom si ereht fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('godlisttr'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("stnioP rehtaFdoG".z(), ">retnec/<>tnof/<'gnihtoN' ot stluafeD>yerg=roloc tnof<>retnec<>rb<.tnaw uoy revetahw kcip oS  !tnatropmi si tahw era seitiroirp er'uoy tuB  .redisnI ro ,snuG deriH ,nopaeW laicepS eht yllaussu era snoitpo tseb eht ,dnim ni peeK  .ereh era snoitpo elbaliava llA  ?rof gniksa eb uoy lliw tahw ,ni taht hsac ot emit s'ti nehw dna ,mih htiw lliw doog emos pu tliub ev'uoY>rb<>retnec/<!desaelp si rehtaFdoG eht dna>rb<,flesruoy rof llew enod ev'uoY>retnec<".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('maxsnipe'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?kcatta epins ot semit mumixaM".z(), ".)urht og lliw lla taht ylekilnu s'ti hguohtla( ereh tes uoy semit fo rebmun eht tegrat hcae kcatta ot tpmetta ll'uoy sa ,tsaf yrev pu dda nac siht ,'stegrat elpitlum kcattA' od osla uoy fI  >rb<>rb<.'6' fo xam a retne nac srotanoD>rb<.ereh '3' fo xam a retne nac srotanoD-noN>rb<>rb<?kcatta uoy dluohs semit ynam woh ,gnippins er'uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("neger_animats".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tiaW noitarenegeR animatS".z(), "?enord rehgif eht gnisu ro gnitnuh ytnuob tratser ew nehw eb animats ruoy dluohs tahw ,0 ot llaf dluohs animats ruoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('hitlistbck'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?stegrat eseht diovA".z(), ".'seY' ot siht tes dna ,woleb tsil eht no meht retne ,os fI  ?kcatta reve ot tnaw t'nod uoy taht stegrat ereht erA".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('whoonHlist'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tsil kcolb tsiltih tide yllaunaM".z(), ".wodniw ecnereferp eht tsixe uoy nehw tsil siht no setacilpud rof kcehc lliw tpircs ehT  .)ammoc( ',' a htiw sDI rehto morf detarepes eb tsum DI hcaE  .rab sserdda sresworb bew ruoy ni nwohs rebmun eht si DI rieht ,egap eliforp ereht no nehw -- egap eliforp ereht ot gniog yb dnuof eb nac DI ehT  .eman rieht ton ,DI rieht retne tsum uoY  .tsiltih eht no pu wohs yeht fi kcatta reve ot tnaw t'nod uoy taht stegrat fo 'sDI bom eht lla era esehT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("ddaotuatsiltih".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?tsil kcattA toN oD eht ot dda yllacitamotuA".z(), ".tsil siht no sbom kcatta ot ton tes ti evah osla uoy sselnu dekcolb eb t'now yeht ,yllaunam ro noitcnuf siht htiw ,tsil eht ot meht dda uoy fi nevE>rb<>rb<?llaw kcirb a gnittih ,yas ot os ,peek t'nod ew os tsil evoba eht ot bom ymene eht dda ew dluohs ,thgif eht esol uoy dna ,tsiltih eht no enoemos kcatta uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('fbookhide'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('FB Ad Hide', ".ot evah uoy sselnu meht kcolb t'nod esaelp oS  .stnemesitrevda dnuora sevlover dlrow tenretni eht sda koobecaf eht tuoba leef uoy woh rettam oN>rb<.ti deen uoy sselnu noitcnuf siht esu ot nosaer on si ereht os ,gnidaolnwod morf stnemesitrevda eht pots TON seod noitcnuf sihT  .ti deen taht esoht rof etatselaer neercs emos pu eerf ot ereh ylno si noitcnuf sihT>rb<>tnof/<>retnec/<.slexip 007 naht ssel si thgieh wodniw resworb ruoy fi skrow ylno noitcnuf sihT>retnec<>yerg=roloc tnof<".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('tdelay'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('Time Delay', ">yerg=roloc tnof<>retnec<>rb<.elbissop sa tsaf sa snoitca smrofrep ti sesac hcihw ni ,tsiltih eht no gnikcatta gnidulcni ,snoitca niatrec rof tiaw siht ssapyb lliw tpircs ehT  .snoitca tpircs neewteb tiaw ot sdnoces fo rebmun eht si sihT".z() + aR + ">retnec/<>tnof/<mumixam detimilnU>rb<muminim sdnoces ".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('BHdelay'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("yaleD gnitnuH ytnuoB".z(), ">yerg=roloc tnof<>retnec<>rb<.ereh deretne si tahw fo sseldrager ,yletaidemmi ,sretemarap nevig ruoy nihtiw ,bom yna kcatta lliw tpircs ehT  .sdaoler tsiltih neewteb tiaw ot sdnoces fo rebmun eht si sihT  .evoba tluafed yaled emit eht yb dellortnoc si tsiltih eht ot gniog yllaitinI".z() + aR + ">retnec/<>tnof/<mumixam detimilnU>rb<muminim sdnoces ".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('FDdelay'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("yaleD enorD rethgiF".z(), ">yerg=roloc tnof<>retnec<>rb<.bom ymene na gnikcatta ni yaled eht dna ,sdaoler egap thgif neewteb tiaw ot sdnoces fo rebmun eht si sihT  .evoba tluafed yaled emit eht yb dellortnoc si neercs thgif eht ot gniog yllaitinI".z() + aR + ">retnec/<>tnof/<mumixam detimilnU>rb<muminim sdnoces ".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('rdelay'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("yaleD ytivitcanI".z(), ">roloc/<>tnof/<elbasid ot 0>rb<mumixaM detimilnU>rb<muminim sdnoces 06>yerg=roloc tnof<>retnec<>rb<.cte ,stats ruoy no sbat peek ot neercs eht hserfer ti dluohs netfo woh ,od ot gnihton sah tpircs eht fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('joblist'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('Job List', ".tsrif sboj dedneped yna mrofrep >tnof/<yllacitamotua>egnaro=roloc tnof< lliw tpircs eht ,detelpmoc gnieb sboj rehto no dedneped boj yna roF>rb<>rb<.demrofrep tnaw uoy boj cificeps a si ereht fi :>tnof/<rehto ynA>yerg=roloc tnof<>rb<.dedeen tinu ygrene yreve rof ecneirepxe tseb eht tnaw uoy fi :>tnof/<ygrene/ecneirepxe tseB>yerg=roloc tnof<>rb<.boj a od ot dedeen tinu ygrene yreve rof tuoyap tseb eht tnaw uoy fi :>tnof/<ygrene/tuoyap tseB>yerg=roloc tnof<>rb<.yltcerid snoitca boj lla lortnoc ot tnaw uoy fI :>tnof/<enoN>yerg=roloc tnof<>rb<.uoy rof kcip tpircs eht tel ro ,od ot tnaw uoy boj tahw tpircs eht lleT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('bankactive'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("knaB yllacitamotuA".z(), "?diap teg dna sboj mrofrep uoy retfa knab eht otni tup yllacitamotua yenom ruoy tnaw uoy oD".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("ytnuobtfaknab".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("seitnuoB retfa knaB yllacitamotuA".z(), "?knab eht otni detisoped yenom ruoy lla tnaw uoy od ,tsiltih eht no enoemos gnillik rof ytnuob a teg uoy nehW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("revloSahctpaCesU".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("2848#&revloS ahctpaC esU".z(), ".)rof pu dengis ev'uoy nalp eht no gnidneped( sevlos fo tuo ro/dna deripxe si tnuocca ruoy fi ro ,tcerrocni era drowssap ro/dna emanresu evoba eht fi ffo nrut yllacitamotua yaM>rb<>rb<.'seY' ot noitpo siht tes dna ,evoba sdleif eht ni drowssap dna emanresu dedivorp eht retne ylpmis ,ecivres 2848#&revloS ahctpaC eht rof pu dengis ev'uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('autheal'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("laeH yllacitamotuA".z(), ">retnec/<>tnof/<mumixam 06>rb<muminim 0>yerg=roloc tnof<>retnec<>rb<.pu uoy xif rotcod a evah dna latipsoh eht ot og neht ,htlaeh xam ruoy fo ,ereh retne uoy taht ,egatnecrep eht neht ssel si htlaeh ruoy dna ,truh er'uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('autorest'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tseR yllacitamotuA".z(), ">retnec/<>tnof/<mumixam 07>rb<egatnecrep laeHotuA ruoy si muminiM>yerg=roloc tnof<>retnec<>rb<.retteb leef uoy litnu tser dna tis tsuj neht ,htlaeh xam ruoy fo egatnecrep siht neht rewol si htlaeh ruoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('laylow'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("htlaeH erongI".z(), ".gnilaeh citamotua ffo nrut ,enord rethgif eht gnisu ro ,seitnuob rof gnitnuh yllacitamotua ton era uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('place'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?og wodniw sutats eht dluohs erehW".z(), ">tnof/<.noitcnuf ton seod yltnerruc sihT>yerg=roloc tnof<".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("PHdneirFBFddA".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("egap emoh ruoy no sbom lla raen knil 'dneirF koobecaF ddA' ecalP".z(), ".cilbup ekam ot dnetni uoy taht stohsneercs yna ekat uoy erofeb ffo eseht nrut ot tnaw ll'uoY>rb<>rb<.dneirf a sa meht dda nac uoy taht os ,tnuocca koobecaF ssob s'bom hcae ot knil a tup tpircs eht evah lliw seY ot siht gnitteS".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('orient'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("noitatneiro wodniw tnemesitrevdA".z(), "yllacitrev ro yllatnoziroh decalp eb wodniw tnemesitrevda eht dluohS".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('adjustmain'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("neercs sraWboM niam eht tsujdA".z(), ".meht fo tsom fo stluser eht ees nac uoy os sepins gnirud lufesu eb osla naC  .swodniw ro sneercs noituloser wol rof lufesu yllaicepsE  ?tpircs siht yb derevoc si gnihton taht os neercs sraWboM niam eht evom ew dluohS".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('statd'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("sutats bom yalpsiD".z(), ".scitsongaid rof ereht ylno yllacisaB  .wodniw sutats eht fo mottob eht ta nwohs si stats lativ sbom ruoy gniyalpsid wodniw llams A".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('showbounty'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("eulav ytnuob ruoy tahw wohS".z(), ".wodniw sutats ruoy ni deyalpsid eb lliw eulav ytnuob ruoy dna no siht nrut ,os fI  ?si eulav ytnuob ruoy tahw gniwonk ni detseretnI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('showexp'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("pu level ot dedeen ecneirepxE".z(), ".level tnerruc ruoy etelpmoc uoy nehw %001 hcaer lliw )( ni egatnecrep ehT  .wodniw sutats ruoy no deyalpsid eb lliw level txen ruoy hcaer ot dedeen ecneirepxe eht ,no fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('pophelp'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("swodniw pleh pUpoP eseht wohS".z(), ".ffo siht nrut tsuJ  ?eromyna sneercs pleh eseht ees ot tnaw t'noD".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('errload'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("daoleR rorrE".z(), ".ereht uoy nruter dna sraW boM ot tluafed lliw ti ,yrotsih resworb ruoy ssecca t'nac ti fI  .)rorre siht desuac ppa tahw swonk ti os( yrotsih resworb ruoy ssecca nac tpircs eht sa gnol sa ,)rehto yna ro sraW boM( rorre siht desuac noitacilppa revetahw ot kcab og lliw tpircs eht ,delbane si noitcnuf siht fI -- koobecaf fo egap rorre 'nommoc' eht ot srefer noitpo sihT  ?daoler ,rorre na sah koobecaf fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('autocity'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("smeti ytic yub yllacitamotuA".z(), ".01 eb yllaussu lliw emit eno ta desahcrup eb ot detceles rebmun eht ,esaercni stsoc eht dna ,sworg emocni ruoy sa tub ,htiw nigeb ot wef a ylno eb lliw ytitnauq sihT  .ti esahcrup uoy nehw tsoc ni pu og lliw meti eht tnuoma eht dna ,emocni fo etar ruoy no desab ,ecno ta desahcrup eb osla lliw ytitnauq tseb ehT  .yenom hguone evah uoy nehw desahcrup eb lliw dna ,esahcrup rof detceles eb lliw )nruteR fo etaR( ROR no desab ,seitreporp tseb eht ,delbane fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("dnalxamyticotua".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("dnaL depolevednU timiL".z(), ".hcae fo 01 fo xam a ot sgnidloh ruoy timil ot noitpo siht elbane nac uoy ,)nosaer revetahw rof ro ,kcab erutaef siht gnirb yam sraW boM leef uoy fi( sgnidloh ruoy timil ot tnaw llits uoy nosaer emos rof fi ,tuB  .ti no dliub regnol on uoy sa ,tnemtsevni na ylno si dnal depolevednU :>tnof/<WON>egnaro=roloc tnof<>rb<>rb<.egatnecrep laminim a si siht gniod yb tsol emocni ehT  .ton ro depolevednu -- seitreporp draoh ot tnaw yam uoy ,weiv fo tniop natit dnal a morf tuB>rb<>rb<.seY ot tes siht evael ot tseb s'ti ,weiv fo tniop ylno emocni na morF>rb<>rb<.meht dliub ot dedeen nehw dnal depolevednu gniyub ylno -- stnemhsilbatse esahcrup ylno ot )weiv fo tniop ylno emocni na morf( retteb ylthgils si ti ,siht fo esuaceB  .stnemhsilbatse gnidliub rof esnepxe na osla si ti ,tnemtsevni na si dnaL depolevednU hguoht nevE :YLSUOIVERP".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("knabwyticotua".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("ytreporp yub ot yenoM knaB esU".z(), ".sesahcrup ekam ot meht esu dna sdnuf dedeen yna wardhtiw yllacitamotua lliw ti ,dewolla fI  .ton ro ytreporp esahcrup ot noisiced 'sti ni yenom knab edulcni lliw tpircs eht ,detceles fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('bankmin'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("'dnuF yaD yniaR'".z(), ">retnec/<>tnof/<muminim 0002>yerg=roloc tnof<>retnec<>rb<.hsac ni elbaliava ti evah uoy fi erom tisoped yllacitamotua lliw ti t'nsi ti fi dna ,knab eht ni llits si muminim siht fi kcehc lliw ti ,laeh uoy emityna retfA  .gnilaeh rof tpecxe ,hcuot ot dewolla eb ton lliw tpircs eht taht ereh tnuoma na retnE  ?ycnegreme na ni ti deen uoy fi ereht s'ti os ,semit lla ta knab eht ni tnuoma na peek ot tnaW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("tcirtserknab".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tnuomA knaB detcirtseR".z(), ">retnec/<>tnof/<'dnuF yaD yniaR' fo muminiM>yerg=roloc tnof<>retnec<>rb<.tnuocca knab ruoy hsinelper yllacitamotua ton lliw tpircs eht ,tnuoma siht woleb llaf uoy nehw taht si ,evoba gnittes 'dnuF yaD yniaR' eht dna ,gnittes siht neewteb ecnereffid ylno ehT  .laeh ot tpecxe ,snoitcnuf citamotua stpircs eht fo yna yb 'elbahcuotnu' si yenom sihT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('cashmin'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("hsac 'elbahcuotnU'".z(), ">retnec/<>tnof/<ytreporp gnisahcrup rof esu dna )ereht detcetorp saw taht( knab eht morf wardhtiw uoy yenom yna ekat dluoc tpircs eht ,ereh deretne si gnihton fI>yerg=roloc tnof<>retnec<>rb<.hcuot ot dewolla eb ton lliw tpircs eht taht ereh tnuoma na retnE  ?elbaliava evah uoy hsac eht lla esu ot tpircs eht wolla ot tnaw t'noD".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('skill'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("secnereferP pUleveL/llikS".z(), ".animats eb nac eerht eht fo eno ylno os ,pulevel hcae nevig stniop 3 eht fo 2 sekat ti animats esaercni ot taht dnim ni peek tub ,tnaw uoy taht setubirtta fo noitanibmoc yna tceles yam uoY  .level wen a hcaer uoy emit hcae desaercni tnaw uoy setubirtta ssob bom tahw tes uoy ereH".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('fightactive'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("enorD rethgiF etavitcA".z(), ".ffo denrut si seitnuob gnitnuh revenehw neercs thgif eht no sbom rehto gnithgif trats lliw tpircs eht dna no siht nruT  ?gnithgif sraw bom emos od ot tnaW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('maxmob'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("eziS boM mumixaM".z(), ">retnec/<>tnof/<ezis muminim neht ssel eb t'naC>rb<detimilnu si 0>yerg=roloc tnof<>retnec<>rb<?thgif ot gnilliw era uoy taht )srebmem( ezis bom mumixam eht si tahW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('minmob'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("eziS boM muminiM".z(), "?thgif ot gnilliw era uoy taht )srebmem( ezis bom muminim eht si tahW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('maxlevel'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("leveL ssoB boM mumixaM".z(), ">retnec/<>tnof/<.muminim neht ssel eb t'naC>rb<detimilnu si 0>yerg=roloc tnof<>retnec<>rb<?thgif ot gnilliw era uoy taht level ssob bom mumixam eht si tahW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('minlevel'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("leveL ssoB boM muminiM".z(), "?thgif ot gnilliw era uoy taht level ssob bom muminim eht si tahW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('bycolor'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("gnidoC roloC yb thgiF".z(), "?deretne ev'uoy stimil rehto eht ot NOITIDDA ni ,edoc roloc niatrec a fo sbom ylno thgif ot tnaw uoy oD  .tpircs siht gnisu nehw dedoc roloc si neercs thgif ehT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('SndList'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("dnuoS noitnettA".z(), ".gnitrats erofeb stnemom wef a ekat yam llA>rb<>rb<.noitcnuf ton lliw dnuos eht ,nosaer revetahw rof ,elbaliavanu era yeht fi -- revres lanretxe na no detsoh era snoitpo hsalF  .krow syawla dluohs ,)s(nigulp tcerroc eht evah uoy sa gnol sa dna ,tpircs eht otni tliub era idiM dna avaj ehT>rb<>rb<.nigulp hsalF ebodA eht seriuqeR  .senut ,trohs yrev ,suoirav - hsalF>rb<>rb<.nigulp etairporppa na seriuqeR  .eton dehctip hgih a - idiM>rb<>rb<.avaj seriuqeR  .krow ot ylekil tsom eht tub ,ycnaf gnihtoN  .peeb a tsuj - avaJ>rb<>rb<.elbaliava sepyt eerht era erehT  .)deriuqer si esnopser 'namuH uoy erA' a nehw ylno ,yltnerruc( dedeen nehw noitnetta ruoy teg ot elbaliava yltnerruc sdnuos fo tsil a si sihT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('SndRepeat'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("taeper dnuos eht dluohs netfo woH".z(), ".'dnuos pots' kcilc ro ,segap egnahc/egap eht hserfer ,noitseuq eht rewsna uoy litnu taeper ot eunitnoc lliw hsalF  .snoitpo ,eton idim dna ,peeb avaj eht stceffe ylno sihT  ?gnippots erofeb deyalp eb eton ro peeb eht dluohs netfo woh ,dedeen si noitnetta emit hcaE".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('bylesscolor'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("dedeen fi bom rekaew yllaitnetop a esoohC".z(), ".'neerg' yrt neht lliw ti ,llits elbaliava era enon fi dnA  .'etihw' yrt lliw ti ,elbaliava si enon tub ,kcatta ot erised uoy roloc eht sa 'wolley' detceles uoy fI>rb<?dekcatta teg bom rekaew a dluohs ,tsil thgif eht no pu swohs erised uoy roloc eht fo enon tub ,edoc roloc yb thgif ot nesoohc ev'uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('whatcolor'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('What Color', ".sthgif eseht niw dluoc uoY :>tnof/<wolleY>wolley=roloc tnof<>rb<.gninniw melborp on evah dluohs uoY :>tnof/<etihW>etihw=roloc tnof<>rb<.wol eb yam thgif hcae morf teg uoy ecneirepxe fo tnuoma eht tub ,melborp on htiw niw ll'uoy ,sesac tsom nI :>tnof/<neerG>neerg=roloc tnof<>rb<?thgif ot tnaw uoy od roloc tahw ,sedoc roloc yb thgif osla ot esoohc uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('modifier'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("desu eb dluohs reifidom esnefed tahW".z(), ">retnec/<>tnof/<!slevel ni pu og uoy sa reifidom siht egnahc ot deen lliw uoY>yerg=roloc tnof<>retnec<>rb<>rb<.64 si retne dluow uoy reifidom latot eht ,)71 fo esnefed( tacraeB TAWS a dna ,)51 fo esnefed( romrA lacitcaT a ,)41 fo etubirtta esnefed( 804. caTyvehC a evah dluow rebmem bom ymene hcae eveileb uoy fI  .)eno( 1 eb dluow reifidom esnefed eht ,esle gnihton dna ,tab llabesab a sah ylno rebmem bom ymene hcae eveileb uoy fi ,elpmaxe roF>rb<>rb<.thgif eht ot gnirb thgim rebmem bom ymene HCAE eveileb uoy esnefed latot eht eb dluohs reifidom sihT>rb<>rb<?esu ew dluohs reifidom tahw ,htgnerts esnefed ymene latot eht erugif pleh oT  .evah yam bom ymene eht taht htgnerts esnefed latot elbissop etamitse eht dna ,htgnerts kcatta latot ruoy sesu egap thgif eht no gnidoc roloc ehT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("reifidomlliksd".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("desu eb dluohs reifidom esnefed tahW".z(), ">retnec/<>tnof/<%59 tluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.rehgih eb dluoc tub ,)yrros neht efas eb ot retteb( rewol eb yam yllacitsilaer tub ,%59 ot stluafeD>rb<>rb<.wolley eb lliw ti neht taht taeb nac uoy dna ,)reifidom siht = X( emit eht fo %X esnefed ot ,level yreve ,stniop 3 fo 1 tsuj detacolla dah yeht fI>rb<>rb<.etihw eb lliw ti neht ,taht taeb nac uoy dna ,)reifidom siht = X(emit eht fo %X esnefed ot ,level yreve ,stniop 3 fo 2 detacolla yeht fI>rb<>rb<.neerg eb lliw ti neht ,taht taeb nac uoy dna ,)reifidom siht = X( emit eht fo %X esnefed ot ,level yreve ,stniop lliks 3 fo 3 detacolla bom ymene na fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('maxfights'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("bom eno kcatta ot semit xaM".z(), ">retnec/<>tnof/<detimilnu si 0>yerg=roloc tnof<>retnec<>rb<.woleb tes emit eht rof bom ralucitrap a rebmemer lliw tpircs ehT  .bom eno yna kcatta ot tnaw uoy semit mumixam ehT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('force'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("edoM enorD rethgiF ecroF".z(), ".tceffe yna evah ot siht rof no denrut eb tsum 'enorD rethgiF' dna 'seitnuoB tnuH' htoB  .seitnuob rof gnitnuh ot kcab hctiws neht lliw dna tceles uoy level eht ot sllaf animats ruoy litnu gnithgif eunitnoc dna edom enorD rethgiF ot egnahc lliw tpircs eht ,woleb tes uoy level animats eht ta era uoy nehw ,no noitpo siht nrut uoy fi tuB  .ytiroirp sekat seitnuob gnitnuh ,no htob era enord rethgif eht dna seitnuob gnitnuh nehw yllamroN".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('minforce'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("edoM enorD rethgiF decroF lecnaC".z(), "?level tahw ot sllaf animats nehw edom lamron ot nruter ,edom decrof ni enord rethgif eht gnisu fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('fightblock'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tsil gniwollof eht no esoht thgif t'noD".z(), ".bom ymene na htiw elttab a esol uoy revenehw uoy rof meht retne nac metsys eht ro ,yllaunam deretne eb nac sbom esehT  .tsil gniwollof eht no sbom eht kcatta TON ot enord rethgif eht tcurtsnI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('fightOnlist'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tsil thgiF t'noD eht no esohT".z(), ".wodniw ecnereferp eht tsixe uoy nehw tsil siht no setacilpud rof kcehc lliw tpircs ehT  .)ammoc( ',' a htiw sDI rehto morf detarepes eb tsum DI hcaE  .rab sserdda sresworb bew ruoy ni nwohs rebmun eht si DI rieht ,egap eliforp ereht no nehw -- egap eliforp ereht ot gniog yb dnuof eb nac DI ehT  .eman rieht ton ,DI rieht retne tsum uoY  .egap thgif eht no pu wohs yeht fi kcatta reve ot tnaw t'nod uoy taht stegrat fo 'sDI bom eht lla era esehT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("ddaotuathgif".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tsil kcattA toN oD thgiF eht ot dda yllacitamotuA".z(), ".tsil siht no sbom kcatta ot ton tes ti evah osla uoy sselnu dekcolb eb t'now yeht ,yllaunam ro noitcnuf siht htiw ,tsil eht ot meht dda uoy fi nevE>rb<>rb<?llaw kcirb a gnittih ,yas ot os ,peek t'nod ew os tsil evoba eht ot bom ymene eht dda ew dluohs ,thgif eht esol uoy dna ,egap thgif eht no enoemos kcatta uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('hfightsneeded'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("sessol ruo tuc ew litnu sthgif ynam woH".z(), ">retnec/<>tnof/<)efas ti yalp( 1 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<?elttab otni gnortsdaeh og ro ,efas ti yalP  .ecnahc a evah t'nod ew wonk ew neht tsael ta tub ,eno yreve ni deidoolb neeb evah yam ew erehw sthgif lareves tiaw ro ,tneve etanutrofnu modnar a neeb evah dluoc )tsol ew fi( ssol eht erehw ,thgif eno retfa kcehc ot tnaw ew oD  ?bom a tsniaga gniod er'ew woh redisnoc ew erofeb ecalp ekat lliw )sessol tsuj ton( sthgif ynam woH".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('fightsneeded'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("sessol ruo tuc ew litnu sthgif ynam woH".z(), ">retnec/<>tnof/<)efas ti yalp( 1 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<?elttab otni gnortsdaeh og ro ,efas ti yalP  .ecnahc a evah t'nod ew wonk ew neht tsael ta tub ,eno yreve ni deidoolb neeb evah yam ew erehw sthgif lareves tiaw ro ,tneve etanutrofnu modnar a neeb evah dluoc )tsol ew fi( ssol eht erehw ,thgif eno retfa kcehc ot tnaw ew oD  ?bom a tsniaga gniod er'ew woh redisnoc ew erofeb ecalp ekat lliw )sessol tsuj ton( sthgif ynam woH".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('fightratio'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("eunitnoc ot dedeen si oitar sthgif/niw tahW".z(), ")ymene siht diova>rb<su evah lliw etad ot sthgif ni sessol yna(>rb<%001 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<?niaga bom siht htiw gnithgif diova ew taht naem ti lliw sthgif ot sniw fo oitar tahw woleb llaf ew fi ,evoba deretne uoy bom rep sthgif fo rebmun eht dehcaer ev'ew retfA".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('hfightratio'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("eunitnoc ot dedeen si oitar sthgif/niw tahW".z(), ")ymene siht diova>rb<su evah lliw etad ot sthgif ni sessol yna(>rb<%001 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<?niaga bom siht htiw gnithgif diova ew taht naem ti lliw sthgif ot sniw fo oitar tahw woleb llaf ew fi ,evoba deretne uoy bom rep sthgif fo rebmun eht dehcaer ev'ew retfA".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('stamlaylow'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("neger animats gnirud gnilaeH citamotuA ffo nruT".z(), ">retnec/<>tnof/<.no eb osla tsum \"gnitnuh ytnuob ro gnithgif otua >rb<ton nehw gnilaeH citamotuA ffo nrut yllacitamotuA\">rb<ffo ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.yawyna gnihtyna od t'nac uoy elihw gnilaeh peek tsuj t'nod uoy taht os ,dekcatta er'uoy fi pord htlaeh ruoy tel dna wol yal ot tnaw uoy od ,etareneger ot animats ruoy rof gnitiaw er'uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("edihecneserpbf".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("rab kooBecaF rewol eht ediH".z(), ">retnec/<>tnof/<>rb<'oN' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.llew sa noitpo siht gnilbane yrt yam uoy dna ,tahc ELBASID ,smelborp gnivah era uoy fI>rb<>rb<.gnirb lliw erutuf eht tahw wonk reven uoy ,tpircs siht htiw ,rab eht ro ,tahc htiw smelborp nwonk on yltnerruc era ereht elihW>rb<>rb<.srawbom ni elihw tahc ELBASID/FFO NRUT dluohs uoy ,noitpo siht esu uoy ton ro rehtehW>rb<>rb<.ti no noitcnuf tahc eht ylniam -- tsap eht ni stpircs ralimis rehto dna siht htiw smelborp esuac ot nwonk neeb sah rab kooBecaF eht osla tub ,ecaps pu gnieerf fo tifeneb dedda eht sah sihT  .devomer eb lliw rab kooBecaF mottob eht ,'seY' ot tes fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("ferPretsboMesuaP".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("retsboM esuaP ehT".z(), ">retnec/<>tnof/<.secnereferp ni delbasid eb yaM>rb<gniwohs ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.sbom rieht fo \"leehw eht ta peelsa llaf\" ohw esoht ot >tnof/<neppah sgniht dab>der=roloc tnof< taht dna ,desuap er'uoy taht uoy dnimer ot stnaw eh tub ,uoy ot mrah yna od yllautca t'now eh ,kO>rb<>rb<!tuo uoy ekat .....ot tuo semoc yug elttil siht ,)neercs eht gnihserfer tsuj gnidulcni ,noitca yna( noitca na mrofrep ot gnitiaw si tpircs eht dna ,desuap metsys eht evah uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('healpbutton'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("nottuB laeH yalpsiD".z(), ">retnec/<>tnof/<seY ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.'oN' ot siht tes nehT  ?ereht nottub laeH eht tnaw t'nod dna etatselaer rab sutats emos pu raelc ot deeN".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('bankpbutton'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("nottuB tisopeD knaB yalpsiD".z(), ">retnec/<>tnof/<seY ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.'oN' ot siht tes nehT  ?ereht nottub tisopeD knaB eht tnaw t'nod dna etatselaer rab sutats emos pu raelc ot deeN".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('DManagement'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("ecnanetniam esabataD".z(), ".stsil mitciV ro thgiF eht no esoht sa hcus ,atad denrael esol ,revewoh ,yam uoY>rb<>rb<.yllacitamotua atad dedeen rehtager lliw tpircs ehT  .eseht fo yna teser uoy fi dlrow eht fo dne eht ton si tI>rb<>rb<.ksa tsuj ,snoitseuq yna evah uoy fI  .mees yeht sa lla era sesabatad rehto ehT>rb<>rb<.od uoy esle tahw rettam on teser lliw esabatad rehto ynA >tnof/< .teser TON lliw ti ,neercs ecnereferp eht no esle GNIHTYNA egnahc uoy fi ,'seY' ot teser esabatad 'secnereferP resU' eht tes uoy fi nevE >\"der\"=roloc tnof< .secnereferp ruoy fo lla retneer ot evah ll'uoy ,esabatad 'ecnereferP resU' eht teser uoy fI  .kcirt eht od yam stluafed eht ot meht gniteser ,sgnittes ecnereferp resu ruoy si tirpluc elbissop rehtonA  .bom ruoy tuoba atad citamelborp eht fo tsom serots tI  .smelborp yna fo tirpluc ylekil tsom eht eb lliw esabatad 'ssoB' ehT>rb<>rb<.rewsna eht eb yam esabatad lanretni a gniteser neht ,tcerroc fles t'nseod ti dna ,tpircs eht ni gnorw seog gnihtemos fi tuB>rb<>rb<.ereh emoc ot evah reven dluohs uoY".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("sthgiftfaknab".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("sdrawer thgif tisoped yllacitamotuA".z(), ">retnec/<>tnof/<'oN' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.yenom ruoy tisoped yllacitamotua lliw ti ,)woleb nwohs( tnuoma tes a dehcaer ev'uoy retfa dna ,gnithgif tsuj morf now ev'uoy yenom eht fo kcart peek lliw tpircs eht ,'seY' ot siht tes uoy fI  .detcetorp tnaw yam uoy yenoM  .sbom rehto gnithgif tsuj morf yenom fo tnuoma riaf a teg yam uoy yllanoisaccO".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("sthgifnimknab".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("muminim sdrawer thgiF".z(), ">retnec/<>tnof/<000,01$ tluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.X neht retaerg era sdrawer LATOT litnu tiaw lliw dna tisoped citamotua tsal eht ecnis now ev'uoy hcum woh rebmemer lliw tpircs eht ,tnuoma X ta tes siht evah uoy fI  ?stisoped yllacitamotua ti litnu niag uoy dluohs hcum woh ,detisoped yllacitamotua yenom drawer thgif ruoy tnaw uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('capdelay'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("remiT ahctpaC".z(), ">retnec/<>tnof/<sahctpac REBMUN htiw tceffe na sah ylnO>rb<)delbasid( '0' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.).cte ;delbane fi ,sboj ;delbane fi ,enord rethgif( snoitarepo tpircs rehto htiw eunitnoc neht dna ,gnitnuh ytnuob lecnac dna tupni rof gnitiaw lecnac lliw ti neht ,deviecer si tupni on fI  .setunim X rof tupni rof tiaw lliw ew neht ,delbane si remit siht dna ,)ahctpac a rof( deriuqer si noitnetta namuh fI>rb<>rb<.NO si DNUOS fi tceffe sah ylno yltnerruC".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('PMobSound'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("retsboM esuaP eht htiw dnuos esU".z(), "?evitca osla si retsboM esuaP eht nehw gniyalp dnuos eht tnaw uoy oD".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("htgneLahctpaCxaM".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?sahctpac rof dewolla eb dluohs sretcarahc ynam woH".z(), ">retnec/<>tnof/<3 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.tupni nwo ruoy dna sesnopser 2848#&revloS ahctpaC HTOB skcehC>rb<>rb<.ereh dewolla eht )esaerced ro( esaercni nac uoy ,metsys ereht egnahc dluohs sraW boM fi tuB  .siht egnahc ot deen on evah dluohs uoy os ,3 si siht yltnerruC  ?eb nac esnopser ahctpaC a htgnel mumixam eht si tahW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('promptalert'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?sahctpac rof tpmorp trela na esU".z(), ">retnec/<>tnof/<oN ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.noitcnuf ton lliw sremit tpmorp eht ,elyts dlo eht esu ot hsiw od uoy fI  .)elyts dlo eht( tupni rof stpmorp trela esu nac uoy ,swodniw ahctpac ni tliub eht ekil t'nod uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('Randomizer'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?sremit eht rezimodnaR".z(), ">retnec/<>tnof/<seY ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.sunim ro sulp dnoces 1 ot pu yb sremit enorD rethgiF dna gnitnuH ytnuoB eht yraV".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("tcaelipkcotsotua".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?demrA boM peeK yllacitamotuA".z(), ">retnec/<>tnof/<oN ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<?selcihev dna ,romra ,snopaew hguone evah uoy erus ekam tpircs eht dluohs ,segnahc ezis bom ruoy revenehW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("muminimelipkcotsotua".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?emit eno ta esahcrup>rb<ot rebmun muminim eht si tahW".z(), ">retnec/<>tnof/<1 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.pu og ot strats ,selcihev dna ,romra ,snopaew fo tsoc eht dna gnorts 005 revo si bom ruoy sselnu ,1 eb dluow yllamroN>rb<>rb<?puorg eno ni yub ot smeti fo rebmun muminim eht si tahw ,demra bom ruoy gnipeek si tpircs eht fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('VarySnipe'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?epins uoy semit fo rebmun eht yraV".z(), ">retnec/<>tnof/<nO stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.semit 6 dna 3 neewteb epins lliw uoY  .2 yrav ot semit fo rebmun eht dna ,no siht ,)rotanod( tnuoma epins ruoy sa 5 tes uoY :2 elpmaxE>rb<>rb<.semit 3 dna 1 neewteb epins lliw uoY  .1 ot yrav ot semit fo rebmun eht dna ,no siht ,tnuoma epins ruoy sa 2 tes uoY :elpmaxE>rb<>rb<.)rotanod a fi 6 ,3( dewolla xam eht neht erom epins reven lliW  .ekil-tob ssel 'kool' ot ylno yllacisaB  .)2 ro 1( woleb tes evah uoy semit fo rebmun eht 1/+ yb epins uoy semit fo rebmun eht yrav lliw sihT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("tnuomAepinSyraV".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("yb yrav ew dluohs ynam woH".z(), ">retnec/<>tnof/<1 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.':epins uoy semit fo rebmun eht yrav ,gnipins fI' rof noitpircsed eht eeS".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('PlayDead'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?daed yalp ew dluohS".z(), ">retnec/<>tnof/<'seY' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.kcab ruoy fo ffo srekcatta niahc esoht teg ot yaw doog a eb yam daed gniyalp ,gniod ruo t'nsaw ti fi tuB  .sevlesruo ot ti enod evah yam ew -- wol taht tog ew woh redisnoc ton seod noitatnemelpmi tnerruC>rb<>rb<?woleb tes osla setunim fo rebmun eht rof yaw taht niamer dna 'daeD' sevlesruo redisnoc ew dluohs ,woleb tes ew level eht woleb ot sllaf htlaeh ruo fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("htlaeHdaeDyalP".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?daed sevlesruo redisnoc ew dluohs htlaeh tahw tA".z(), ">retnec/<>tnof/<01 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.woleb tes setunim fo rebmun eht rof 'daeD yalP' lliw ew neht ,'seY'ot tes si gnittes evoba eht dna ,woleb ro ,level siht ot llaf ew fI>rb<>rb<.eulav tniop htlaeh etulosba na si tI  !tnecrep a ton si sihT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("emiTdaeDyalP".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?daeD yalP ew dluohs )muminim( gnol woH".z(), ">retnec/<>tnof/<01 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.)no denrut laeh otua evah ew fi( ecno tsael ta laeh ot latipsoh eht ot og yllacitamotua lliw ew ,tuo snur doirep emit eht retfA  ?yaw taht tca ew dluohs )muminim ,setunim ni( gnol woh ,'daed' sevlesruo gniredisnoc era ew fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('DroneTarget'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("gnitegraT enorD".z(), ">retnec/<>tnof/<'oN' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.erutaef siht esu ot tnaw uoy fi ,woleb stnuoma tegrat muminim derised ruoy retne dna ,no noitpo siht nruT  .rehtie fo hcum evah t'nod taht esoht diova uoy pleh lliw yeht tuB  .evig ot ecneirepxe tsom eht ro ,yenom tsom eht evah taht esoht tegrat yllautca ton lliw snoitpo eseht fo noisrev tnerruC  .etaruccani ylthgils eb yam ,esac siht ni ,gnitegraT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('DroneMinExp'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("ecneirepxE muminiM".z(), ")gnidiova ecneirepxe evitciderp esu uoy fi srettam ylno( drocer ecneirepxe evitciderp ruoy teser lliw gnittes siht gnignahC>rb<.evoba 'seY' ot tes gnidiova bom eht evah osla uoy fi -- ssel uoy evig taht esoht diova lliw ti ,siht neht erom uoy evig taht esoht tegrat t'now enord eht elihW  .egap thgif eht no sthgif ruoy morf niatbo ot tnaw uoy ecneirepxe muminim eht retnE".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("yenoMniMenorD".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("yenoM muminiM".z(), ".evoba 'seY' ot tes gnidiova bom eht evah osla uoy fi -- ssel uoy evig taht esoht diova lliw ti ,siht neht erom uoy evig taht esoht tegrat t'now enord eht elihW  .egap thgif eht no sthgif ruoy morf niatbo ot tnaw uoy yenom muminim eht retnE".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('DroneMark'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("ecneirepxe/sessol/sniw htiw egap thgif kraM".z(), ".niw rep meht morf deniag uoy ecneirepxe egareva eht sa llew sa ,sessol dna sniw tsap htiw dekram eb lliw egap thgif eht no sbom eht ,noitpo siht tceles uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('LogStuff'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("ytivitca tpircs goL".z(), ".tsom tub ,deggol eb lliw gnihtyreve ton ,yltnerruC  .deggol ytivitca tpircs eht lla tnaw uoy fi siht tceleS".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('LogLevel'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?deggol eb dluohs tahW".z(), ".emit revo dedda eb lliw gnidrocer eroM .)pu wohs reven lliw ylbaborp tub ,enord rethgif eht htiw rucco yam taht rorre eno sdrocer ylno yltnerruc hcihw( \"ylnO srorrE\" ro ,)meht fo ynam tub ,tey snoitca niam lla drocer t'nseod hcihw( \"srorrE/snoitcA niaM\" ro ,)seirtne ,.cte ,\"tsiltih gnidaoler\" fo tol a evah yam uoy esac hcihw ni( gnihtyreve gol ot ti tes osla nac uoY".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('LogLength'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?eb gol eht dluohs gnol woH".z(), "?tpek eb dluohs seirtne ynam woH".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("redrOelbisiV".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("wodniw sutats fo redrO elbisiV".z(), ".)s(wodniw sutats eht fo noitarugifnoc ro/dna redro eht segnahC  .wodniw itlum dna ,pot no eueuQ ,dradnatS :snoitpo eerht ylno yltnerruC".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("ytnuobmuminimerongi".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?ytnuob muminim erongI".z(), ">retnec/<>tnof/<'seY' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.enon neht retteb si ytnuob emoS  ?evoba gnittes ytnuob muminim ruoy erongi ew dluohs ,animats lluf ta era uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('snipedelay'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?epins tsrif eht yaleD".z(), ">retnec/<>tnof/<)dnoces 1 = sdnocesillim 0001(>rb<0 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.noitautis ruoy rof tseb skrow tahw dnif ot tnemirepxe ot deen ll'uoy os ,siht no elur tes on si ereht tuB  .laicifeneb eb nac yaled llams a taht ecnedive emos eb ot smees erehT  ?epins tsrif eht yaled ew dluohs ,edom epins ni gnitnuh ytnuob era uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("enilnoerongienord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?enilno era taht sbom erongI".z(), ">retnec/<>tnof/<'oN' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.ereht yltnerruc t'nsi ssob bom s'ohw bom a kcatta uoy fi etailater elpoep evah lliw uoy taht ylekil ssel yldlim si tI  ?enilno yltnerruc era taht sbom diova enord rethgif eht dluohS".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('dronememory'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?gnitimil thgif tsap rof derebmemer eb dluohs sbom ynam woH".z(), ">retnec/<>tnof/<06 ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<?rebmemer eb dluohs )sthgif ton ,SBOM( sbom ynam woH  .od uoy taht semit fo rebmun eht timil nac uoy taht os ,bom ralucitrap a dekcatta ev'uoy semit ynam woh rebmemer lliw tpircs sihT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("pxetegratenord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("ecneirepxe doog evig taht sbom tegraT".z(), ">retnec/<>tnof/<'oN' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.tsil siht teser lliw woleb deretne rebmun eht gnignahC  .woleb deretne level ecneirepxe eht teem taht sbom 001 tsal eht srebmemeR>rb<?tsil thgif eht no pu wohs yeht fi niaga meht tegrat ew dluohs ,woleb deretne rebmun eht neht ecneirepxe erom uoy evag thgif tnatluser eht dna bom a thguof uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("pxenimtegratenord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tegrat ot dedeen ecneirepxe muminiM".z(), ">retnec/<>tnof/<)woleb ees( diova ot deretne tnuoma fo muminiM>yerg=roloc tnof<>retnec<>rb<>rb<?gnitegrat tnarraw ot thgif rep deniag eb tsum ecneirepxe fo tnuoma tahW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("yenomtegratenord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("yenom hguone uoy evig taht sbom tegraT".z(), ">retnec/<>tnof/<'oN' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.tsil siht teser lliw woleb deretne rebmun eht gnignahC  .woleb deretne tnuoma yenom eht teem taht sbom 001 tsal eht srebmemeR>rb<?tsil thgif eht no pu wohs yeht fi niaga meht tegrat ew dluohs ,woleb deretne rebmun eht neht yenom erom uoy evag thgif tnatluser eht dna bom a thguof uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("yenomnimtegratenord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tegrat ot dedeen deniag yenom muminiM".z(), ">retnec/<>tnof/<)woleb ees( diova ot deretne tnuoma fo muminiM>yerg=roloc tnof<>retnec<>rb<>rb<?gnitegrat tnarraw ot thgif rep deniag eb tsum yenom fo tnuoma tahW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("esahcrupytic".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("X ot pu spuorg ni seitreporp esahcruP".z(), ">retnec/<>tnof/<01 mumixaM ,1 muminiM>rb<'01' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.tseretni tseb ruoy ni si 01 ta ti gnivael yllamron tub ,ecno ta esahcrup ot rebmun derreferp xam a evah uoy fi noitpo siht egnahc nac uoY  .tifeneb on edivorp )01 >( srebmun rehgih dna ,etairporppa fi rebmun rewol a kcip yllacitamotua lliw tpircs ehT  .01 ta tfel eb dluohs siht yllamroN  ?ecno ta esahcrup ot dewolla eb enituor yubotua eht dluohs seitreporp ynam woH".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("kcehccalevelwen".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?seitreporp ruo kcehc ew dluohs ,slevel wen tA".z(), ">retnec/<>tnof/<'seY' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.ereh ffo siht nrut nac uoy ,ekil dluow uoy neht seitreporp gnikcehc emit erom sdneps tpircs eht ,nosaer revetahw rof ,taht dnif uoy fi ,revewoH  .no siht evael t'nod uoy fi >tnof/<esirra NAC smelborp>der=roloc tnof< dnA  .no tfel eb dluohs siht yllamroN".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("xaMemiTdaeDyalP".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?daed yalp dluohs ew emit mumixam eht si tahW".z(), ">retnec/<>tnof/<woleb deretne emit muminim fo muminiM>rb<muminim eht eciwt ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.woleb deretne emit muminim eht dna emit siht neewteb si taht daed yalp ot emit a esoohc ylmodnar lliw tpircs ehT  ?daed eb ot dneterp dluohs ew taht emit fo tnuoma mumixam eht si tahw ,daed gniyalp era ew fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("kcehcbjlevelwen".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?elbaliava sboj ruo kcehc ew dluohs ,slevel wen tA".z(), ">retnec/<>tnof/<'seY' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.ereh ffo siht nrut nac uoy ,ekil dluow uoy neht sboj gnikcehc emit erom sdneps tpircs eht ,nosaer revetahw rof ,taht dnif uoy fi ,revewoH  .no siht evael t'nod uoy fi >tnof/<esirra NAC smelborp>der=roloc tnof< dnA  .no tfel eb dluohs siht yllamroN".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("kcehcpslevelwen".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?elipkcots ruo kcehc ew dluohs ,slevel wen tA".z(), ">retnec/<>tnof/<'seY' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.ereh ffo siht nrut nac uoy ,ekil dluow uoy neht elipkcots eht gnikcehc emit erom sdneps tpircs eht ,nosaer revetahw rof ,taht dnif uoy fi ,revewoH  .no siht evael t'nod uoy fi >tnof/<esirra NAC smelborp>der=roloc tnof< dnA  .no tfel eb dluohs siht yllamroN".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('showcaptcha'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("swodniw tpircs eht ni segami ahctpac wohS".z(), ">retnec/<>tnof/<'seY' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.no sepins htiw gnitnuh ytnuob era uoy fi sahctpac gnirewsna citamelborp eb nac ti ,ffo ti nrut od uoy fI  .ereh ffo siht nrut nac uoy ,siht od ot tpircs eht tnaw t'nod uoy ,nosaer revetahw rof ,fI  .tpmorp ahctpac dna wodniw sutats ni ahctpac eht fo egami na stup tpircs eht ,retne ot ahctpac tcerroc eht ees pleh oT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("PFdneirFBFddA".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("egap thgif ruoy no sbom lla raen knil 'dneirF koobecaF ddA' ecalP".z(), ".cilbup ekam ot dnetni uoy taht stohsneercs yna ekat uoy erofeb ffo eseht nrut ot tnaw ll'uoY>rb<>rb<.dneirf a sa meht dda nac uoy taht os ,tnuocca koobecaF ssob s'bom hcae ot knil a tup tpircs eht evah lliw seY ot siht gnitteS".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("PPdneirFBFddA".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("egap eliforp hcae no eman bom eht raen knil 'dneirF koobecaF ddA' ecalP".z(), ".cilbup ekam ot dnetni uoy taht stohsneercs yna ekat uoy erofeb ffo eseht nrut ot tnaw ll'uoY>rb<>rb<.dneirf a sa meht dda nac uoy taht os ,tnuocca koobecaF ssob s'bom hcae ot knil a tup tpircs eht evah lliw seY ot siht gnitteS".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('adminnoheal'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("sksat evitartsinimda gnimrofrep elihw laeH-otuA ton oD".z(), ">retnec/<>tnof/<'seY' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.rehtaFdoG eht morf rovaf a rof gniog fi ro ,stniop lliks gnitacolla fi ,smeti ytic ro elipkcots gnisahcrup si tpircs eht fi laeh-otua ti lliw roN  .elbaliava sboj ro ,ytic ,elipkcots ruoy gnikcehc si tpircs eht elihw laeh-otua ton lliw uoy ,no noitpo siht nrut uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("tuctrohslaeh".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("gnilaeh dnuorgkcab esU".z(), ">retnec/<>tnof/<'oN' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>lo/<.dohtem siht gnisu 'thguac gnitteg' fo ecnahc ronim a si erehT ;8569#&>rb<)ecno ta eno neht erom( palrevo ahctpac fo ecnahc a si erehT ;8569#&>rb<.laeh ot egap latipsoh lautca eht ot og llits lliw )ylniam tiaw htaed eht fo dne eht( snoitcnuf wef A ;8569#&>rb<.ot ton deksa fi neve sksat noitartsinimda gniod elihw neve laeh lliW ;8569#&>rb<.desuap fi neve ,dedeen si gnilaeh taht seciton tpircs eht revenehw mrofrep lliW ;8569#&>rb<.sesahcrup elipkcots dna ytic otua eht rof sdnuf knab esu uoy fi smelborp rehto dna ,knab eht ni yenom fo tuo nur uoy fi smelborp esuac nac siht -- laeh uoy emit hcae retfa yltcerroc etapdu ton yam tnuocca knab ruoY ;8569#&>rb<.noitcnuf ton lliw 'htlaeh litnu tseR' ;8569#&>rb<.noitcnuf ton lliw 'xam ot laeH' ;8569#&>lo<>tnof/<:dohtem siht gnisu ot staevac elpuoc a era erehT>egnaro=roloc tnof<>rb<>rb<.neercs latipsoh eht gniyalpsid yllautca tuohtiw gnilaeh ,si tahT  ?gnilaeh dnuorgkcab esu ew dluohs ,laeh ot deen ew nehW>rb<>retnec/<latnemirepxe tahwemos llitS>retnec<".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("blevelerongienord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("snoitcirtser level ruoy edistuo esoht redisnoceR".z(), '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("bsrebmemerongienord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("snoitcirtser rebmem bom ruoy edistuo esoht redisnoceR".z(), '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("benilnoerongienord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("enilno gnieb yltnerruc rof dekcolb esoht redisnoceR".z(), '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("btsilerongienord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tsil kcolb thgif ruoy no esoht redisnoceR".z(), '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("bsemiterongienord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("timil tes ruoy neht erom dekcatta ydaerla ev'uoy ohw esoht redisnoceR".z(), '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("bpxeerongienord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("snoitcirtser deviecer ecneirepxe ruoy edistuo esoht redisnoceR".z(), '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("byenomerongienord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("snoitcirtser deniag yenom ruoy edistuo esoht redisnoceR".z(), '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("diovaevitciderp".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("ecneirepxe detciderp yb sbom diovA".z(), ">retnec/<>tnof/<'oN' ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.gnittes ecneirepxe muminim ruoy egnahc uoy revenehw steser tsil -- gnittes ecneirepxe muminim ruoy teem t'nseod DNA ot thgif a esol uoy sbom 001 tsal eht srebmemeR>rb<>rb<.erutuf eht ni meht gnithgif diova neht ,)woleb noitpo 'neht ssel si deviecer ecneirepxe egareva fi diovA' rednu woleb tes( erised uoy ecneirepxe muminim eht neht rehgih ton si ti fI  .erutuf eht ni bom eht taeb ylbissop uoy fi niag DLUOC uoy ecneirepxe hcum woh tciderp ,thgif a esol uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("yrteRrevloSahctpaC".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("rorrE metsyS 2848#&revloS ahctpaC no yrteR".z(), ".'seY' ot tes siht evah ot aedi doog a s'ti ,woleb tes yrter xam eht evah uoy fi yllaicepsE  .rojam gnihtyna t'nsi yllaussu ereht tub ,srorre modnar eb yam ereht -- aedi doog a si niaga gniksa ,sesac tsom nI>rb<>rb<?yrtne launam ot thgiarts og ro ,niaga rewsna ahctpac a tseuqer ew dluohs ,)rorre na stroper tub ,ahctpac eht ot rewsna na evig t'nseod ti ,si taht( rorre metsys a stroper 2848#&revloS ahctpaC eht fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("yrterxamrevloSahctpaC".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('Max Retries', ".ereh timil a tes nac uoy ,rewsna gnorw a gniretne yletinifedni morf flesruoy tcetorp ot os ,).cte ,rorre sraW boM ,egnahc sraW boM ,yrtne gnorw ,rorre metsys( gnorw si rewsna eht yhw snosaer ynam eb nac erehT  .yltcerroc ahctpac eht rewsna ot 2848#&revloS ahctpaC eht evig ew dluohs stpmetta ynam woH".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("emitnimrevloSahctpaC".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("emiT muminiM".z(), ".rewsna eht sretne yllautca ti erofeb dessap sah emit fo tnuoma siht litnu tiaw lliw tpircs eht ,emit fo tnuoma siht neht ssel ni tseuqer ruoy ot rewsna na eviecer uoy fI  .rewsna eht gniretne dna ,ahctpac a ot rewsna na gnitseuqer neewteb dewolla emit fo tnuoma muminim eht si sihT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("emitxamrevloSahctpaC".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("emiT mumixaM".z(), ".detseuqer eb lliw rehtona dna ,derongi eb lliw ti ,emit fo tnuoma siht neht regnol koot rewsna eht fI  .rewsna na gniviecer dna ,ahctpac a ot rewsna na gnitseuqer neewteb dewolla emit fo tnuoma mumixam eht si sihT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("tsilboMruoYnI".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("boM ruoY ni s'ohW".z(), ".llew sa yllaunam meht dda nac uoy ,bom ruoy ni sbom eht fo sdi bom eht wonk uoy fi tuB  .ereh meht dda yllacitamotua dna ,emit revo eseht nrael lliw tpircs ehT  .ylimaf bom ruoy fo trap era taht sbom eht era esehT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("tsilrecrofnE".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("selbahcuotnU ehT".z(), ".detsiltih uoy tegrat a dellik ohw esoht gnitsiltih fo ecitcarp tnecer rehtar eht diova ot si sihT  .llew sa dediova eb lliw tegrat taht ,tsiltih eht no enoemos tup tsil siht no enoyna fi ,tsiltih eht no elihw ,noitdda nI>rb<>rb<.tsil thgif eht dna tsiltih eht no decrofne eb lliw tsil sihT>rb<>rb<.elbahcuotnu ,ecnesse ni ,era ohw esoht fo tsil eht si sihT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("semiTkcolBtsiLtiH".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("semiT FFO gnitnuH ytnuoB".z(), ".sdoirep fo rebmun yna retne nac srotanoD ,)htgnel yna fo( doirep emit eno ylno retne nac srotanod-noN  >rb<>rb<.ereh semit esoht retne nac uoY  .)nosaer eht revetahW   .semit esoht/taht ta daed yllaussu tsuj si tsiltih eht ro ,)ecivres 2848#&revloS ahctpaC eht ees( sahctpac eht rewsna ot ereht ton er'uoy esuaceb ro ,tob a ekil ssel kool ot rehtehw ,nosaer revetahw roF(  ?semit niatrec diova ot tnaw tub ,gninnur noitpo gnitnuh ytnuob eht evael ot ekil uoy oD".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("yromemkaeWooTenord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("yromeM kaeW ooT".z(), ".ffo nekat era seno tsrif eht ,tsil eht ot dedda era sbom erom sa os ,)tuO tsriF ,nI tsriF( eueuq OFIF a si tI>rb<>rb<?rebmemer ti dluohs sbom ynam woH  .erutuf eht ni meht diova lliw dna ,thgif ot kaew oot sa pu emoc taht sbom rebmemer lliw tpircs eht ,siht eziminim oT  .'thgif ot kaew oot' era taht esoht kcatta netfo lliw tpircs eht os ,sbom eht fo level htlaeh tcerroc eht troper syawla t'nseod sraW boM ,yletanutrofnU  .thgif ot kaew oot sa nwohs era taht esoht sdiova dna thgif ot tnaw yam uoy sboM laitnetop fo egap thgif eht no rab 'slativ'/'htlaeh' eht sehctaw tpircs ehT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('levelactive'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("senituoR egneveR/rentraP gnileveL eht elbanE".z(), ".dessap sah lavretni ruoy emit txen eht litnu )delbane era yeht fi( enord rethgif eht ro/dna gnitnuh ytnuob ot kcab og neht lliw tI  .esu ot tes evah uoy stniop animats fo rebmun eht sesu ro/dna )ecno( tsil egnever/rentrap gnilevel ruoy urht yaw eht lla seog ti elihw enord rethgif eht dna gnitnuh ytnuob edirrevo lliw ti ,)woleb tes uoy taht( slavretni tes eht ta ,delbane fI>rb<>rb<.noitcnuf eht elbasid ylevitceffe osla lliw eseht ,0 ot tes si animats ro lavretni ro ,ytpme si tsil eht fI  .wodniw sutats niam eht morf delbasid/delbane eb osla naC  .noitcnuf siht elbane ot 'seY' ot teS".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('LevelList'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("s'DI boM retnE".z(), ".gnithgif rof elbaliavanu eb yam tsil eht no seno tsrif eht semit ynam sa ,aedi dab a ylirassecen t'nsi ,meht fo lla ot og modles uoy fi neve ,tsil eht no ynam gnivah ,dnim ni peeK  .snur noitcnuf siht emit txen eht tsil eht fo gninnigeb eht ta tratser lliw neht ,woleb tes animats eht desu ev'uoy nehw gnisrevart pots lliw dna -- dne eht ot trats eht morf tsil eht urht og lliw ti sa ,ytiroirp ro redro ni meht retnE  .slavretni tes eht ta ,egnever rof tsuj ro rentrap gnilevel a sa rehtehw ,thgif ot tnaw uoy taht sbom fo tsil eht si sihT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('lvInterval'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('How often?', ".nur txen eht fo trats eht dna ,nur tsal eht fo DNE eht neewteb ,sdnoces ni ,doirep emit eht si sihT  ?nur noitcnuf siht dluohs netfo woH".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('lvStamina'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('How much?', "?noitcnuf siht fo nur hcae gnirud gnithgif ni desu eb dluohs stniop animats ynam woH".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("tsiLkcolB_DFwolloF".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("selur ssol thgif yebO".z(), ".'oN' ot tes si gnittes siht fi noitcnuf siht yb DERONGI eb lliw tsilkcolb eht ,revewoH>rb<>rb<.ereh tes evah uoy tahw fo sseldrager )dedda eb ot stnemeriuqer ruoy steem ti fi( tsilkcolb ruoy ot dedda eb lliw yeht ,tsil thgif ruoy no enoemos ot thgif a ssol uoy fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('healmode'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?desu eb dluohs edom gnilaeh tahW".z(), ".secnereferP htlaeH rehto ruoy no desab gnilaeh eriuqer uoy DNA ,htlaeh doog ni eb ot uoy seriuqer taht noitca emos ekat uoy erofeb tsuj laeh ylno lliw tpircs eht ,edom siht nI  .srotanoD ot elbaliava ylno si edom sihT :>b/<dnameD nO>b<>rb<>rb<.sgnittes \"nehw laeh ton od\" wef a erongi seod ,revewoh ,edom sihT  .secnereferP hlaeH rehto ruoy no desab( deriuqer si gnilaeh revenehw ,)retsaf hcum yllaussu si dna( dnuorgkcab eht ni enod si gnilaeh ,edom siht nI :>b/<dnuorgkcaB>b<>rb<>rb<.)secnereferP hlaeH rehto ruoy no desab( dedeen si ti revenehw ereht morf laeh dna egap latipsoh eht ot og lliw tpircs eht ,edom siht nI :>b/<lamroN>b<>rb<>rb<:sedom gnilaeh eerht stsixe won erehT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('HOD_num'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?laeh ew dluohs semit ynam woH".z(), ".)YLNO( gnitnuh ytnuob elihw gnikcatta erofeb tsuj semit ruof ot pu laeh ot ti tes nac uoy ,noitpo siht htiW  .)edom epins esu uoy fi yllaicepse( tsiltih eht no enoemos gnithgif era uoy fi hguone eb syawla ton yam siht tuB  .)secnereferP htlaeH rednu tes evah uoy revetahw neht ssel si htlaeh ruoY( dedeen si ti FI bom rehtona gnithgif erofeb tsuj emit eno slaeh tpircs eht ,)srotanoD ot ylno elbaliava( edom \"dnameD nO laeH\" nI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('FDReload'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("tsil thgif hserfer ot gnol woh tiaW".z(), ".tsil wen a rof tiaw uoy elihw )hcum sa( sreniahc ot nepo flesruoy evael t'nod uoy dna ,tsil thgif hserf a teg ot niatrec ylriaf era uoy os )sdnoces 999 ot pu tes eb nac( sdnoces 081 dnuora gnihtemos ot ti tes ot esnes ekam yam tub ,sdnoces 7 ot stluafeD  ?tsil eht hserfer ot tiaw ew dluohs gnol woh ,thgif ot elbaliava si taht tsil thgif eht no ydobon si ereht nehW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("ycaruccaesaercni".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("ycaruccA 2848#&revloS ahctpaC esaercnI".z(), ".ffo ti nrut syawla nac uoy ,srewsna gnorw eht gnitseuqer si tpircs ruoy taht dnif uoy fi tub ,)'seY'( no tfel eb yllamron dluohs sihT>rb<>rb<.aera siht ni srorre yna setanimile ti sa ycarucca eht esaercni nac sihT>rb<>rb<.)hcihw gninimreted 2848#&revloS ahctpaC eht fo daetsni( srettel ro srebmun sa devlos eb ot ahctpac a tseuqer lliw tpircs eht 'seY' ot tes si siht fI".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("ecruosllatih".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("gnitnuH ytnuoB elihw kooBecaF ssapyB".z(), ")edom siht gnisu nehw )etaidemmi( 0 ot tes yllacitamotua si remit hserfer tpircs eht dna ,srevres koobecaF eht yb desuac gal ssel( retsaf yllacipyt si )ereh derewsna si 'seY' fi( koobecaF gnissapyB>rb<>rb<.)yaw rehtie ti od nac namuh a hguohtla( ekil-tob ssel dna ,'namuh' tsom si ti taht tifeneb eht sah )ereh derewesna si 'oN' fi( koobecaF urht gnioG>rb<>rb<.yltcerid srevres sraW boM eht ksa nac ew ro )koobecaF urht( yaw lamron eht seitnuob rof tnuh nac ew ,gnitnuh ytnuob elihW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('fastssnipe'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("sepinS tsetsaF".z(), ".laeh ot ecnahc a dah ev'uoy erofeb )s(tegrat ruoy kcatta uoy taht dnif yam uoy ro )secnereferP htlaeH rednu osla( gnilaeh fo mrof tsaf eht esu ot aedi doog a si ti ,)secnereferP htlaeH rednu( noito gnilaeh 'dnameD nO' eht gnisu era uoy dna ,'seY' ot tes siht evah uoy fI>rb<>rb<)flesti sraW boM yb segnahc erutuf yna ot elbitpesus erom tub( retsaf si taht eno dna ,dradnats erom si taht eno -- noitarepo fo sedom owt ,noitdda ni ,si ereht ,sedom owt eseht nI>rb<>rb<.tegrat ruoy ruo ekat ot secnahc erom uoy sevig yllamron taht desu si gnikcatta fo mrof laiceps a ,epins tsaf dna epins ,sedom owt nI  .epinS tsaF dna ,epinS ,efaS -- gnitnuh ytnuob nehw sedom gnikcatta eerht era erehT".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("ygrenErehtaFdoG".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?ygrene erom tseuqer ew dluohs nehW".z(), ").ctE  .ereh 5 retne ,5 ot llaf uoy litnu ot tnaw t'nod uoy fI  .0 retnne ,0 ot nellaf ev'uoy litnu ygrene tseuqer ot tnaw t'nod uoy fi( erom tseuqer uoy erofeb ot pord ot ygrene ruoy tnaw uoy tahw retnE  .ti deen t'nod uoy nehw ti tseuqer ot tnaw t'nod uoy ,esruoc fo ,tub ,rehtaFdoG eht morf ygrene tnaw uoy os ,kO".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("htlaeHrehtaFdoG".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?htlaeh erom tseuqer ew dluohs nehW".z(), ").ctE  .ereh 5 retne ,5 ot llaf uoy litnu ot tnaw t'nod uoy fI  .0 retnne ,0 ot nellaf ev'uoy litnu htlaeh tseuqer ot tnaw t'nod uoy fi( erom tseuqer uoy erofeb ot pord ot htlaeh ruoy tnaw uoy tahw retnE  .ti deen t'nod uoy nehw ti tseuqer ot tnaw t'nod uoy ,esruoc fo ,tub ,rehtaFdoG eht morf htlaeh tnaw uoy os ,kO".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("yrevoceRrehtaFdoG".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?animats erom tseuqer ew dluohs nehW".z(), ").ctE  .ereh 5 retne ,5 ot llaf uoy litnu ot tnaw t'nod uoy fI  .0 retnne ,0 ot nellaf ev'uoy litnu animats tseuqer ot tnaw t'nod uoy fi( erom tseuqer uoy erofeb ot pord ot animats ruoy tnaw uoy tahw retnE  .ti deen t'nod uoy nehw ti tseuqer ot tnaw t'nod uoy ,esruoc fo ,tub ,rehtaFdoG eht morf animats tnaw uoy os ,kO".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("tluafedecrofenordrethgif".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?htiw thgif ot ecroF".z(), "?tsil thgif eht no gnithgif nehw esu ew dluohs ecrof tahW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("kcilcniagayrt".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show("?daoler ro niaga yrT".z(), ".tpmorp tseuqer xoFeriF eht fo esuaceb 'kcuts' teg ot ylekil ssel si tub -- nekat detnaw uoy noitca na ssim tpircs eht ekam ,noisacco erar no ,yam egap eht gnidaoler ylpmiS>rb<>rb<.nottub a no kcilc yllaunam uoy litnu skcart s'ti ni tpircs eht pots lliw hcihw ,'noitamrofni dneseR' ot gniksa xob tseuqer xoFeriF a pu gnirb yam tub ,derrucco rorre koobecaF eht nehw od ot gnitpmetta erew uoy noitca revetahw yrter ot yaw tserus eht si nottub yrteR eht no gnikcilC>rb<>rb<?egap eht daoler tsuj ro ,nottub yrteR eht no 'kcilc' ew dluohs ,pu semoc egap rorre koobecaF a nehW".z(), event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("emityromemenord".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('', '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('lv_Attack'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('', '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("epinsthgiftsaf".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('', '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('fastbh'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('', '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('Heistlist'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('', '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae('acceptboost'));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('', '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("tsooberptpecca".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('', '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
    button = document.getElementById(ae("knabdnuorgkcabtsaf".z()));
    if (button) {
        button.addEventListener('mouseover', help = function (event) {
            HelpHover.show('', '', event);
        }, true);
        button.addEventListener('mouseout', HelpHover.hide, true);
    }
}
function PauseMobster() {
    var dd = ">/\"retsboMP\"=di \"fig.retsboM\"=tla \"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WGjpYwAoyRVTSDOU2cVf+6cxAzrUYcxKPyo7wX6eSXecM5853sMY+UdabkViDq+wK3HUFkxKWrc4RCn6A4oKADOfq+3LMlZBVrsWdib6AAJqmNkEG535CIQQKrAXk3XDjKYQHIMHVzLo+wMJmBdckjBDHoDjyDII+YT5S2SAAMdylAq/n54xX0MSM3jNLoEuNFzUUr0MQ00tOAZsIiv/9PIPO508sSg55NAMg8K1Jwq04zu6Tz/8jztntn7rVPr8lLrXKs43r2DoJkd1kT+07VZAs6sZ+YqCHPg18VdATDMBUZgINzbZWWFxIYgmGqABBA8selAK726jPc7plOgbjCpC+A4Ms6JnZ6QlWmXC+JakkRJRduYiGkwCN8QlKNFB91HfLkEebpodBAmCLkABG0QSQeA69IuXjLwrv2kIk0N3EgRqAFOaP7Gun/qADIhNQRolsiNoOoU+DF0wfqDbh9GZ+ahisgEcgm7Nv/EONi/3tR3zqkMvjjkpqimnpRmjgAi/FAQA3BQjAIBAnxCAAAAZJQQ+hAAAAEwAw4iMFBVQDNFVF50C/Hy///////////////////////////////////////////////////////////////PAAAwHfEiP7YTmmBgSMFlZmZmgEWYiTCKSRWdplWqffadsxGbv927j3iPzMz8///PAAQYAZCg+hlDOGl0R,46esab;fig/egami:atad\"=crs \";kcolb:yalpsid\"=elyts \"xp002\"=thgieh \"xp001\"=htdiw gmi<".z();
    var de = document.createElement('style');
    if (de) {
        de.type = 'text/css';
        de.innerHTML = "\x23" + ad('Mobster') + "} ;xp081 :thgir ;xp72 :pot ;dexif :noitisop ;9999 :xedni-z ;)59=yticapo(ahpla :retlif;59.:yticapo ;kcolb :yalpsid { ".z();
    }
    try {
        if (document) {
            var df = document.getElementsByTagName('head');
            if (df) df = df[0];
            if (df) if (de) df.appendChild(de);
        }
    } catch (e) {}
    var dg = document.createElement('div');
    if (dg) {
        dg.id = ad('Mobster');
        dg.innerHTML = dd;
    }
    if (ag.pmobsound) {
        if (ag.sndid != 'none') {
            alertSound(ag.sndid, ag.sndrepeat);
            dg.innerHTML += "'=di ';etihw :roloc-dnuorgkcab'=elyts a<;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&;psbn&".z() + ad('stoppmob') + ">a/<dnuoS potS>'".z();
        }
    }
    if (document) {
        if (document.body) {
            if (dg) document.body.insertBefore(dg, document.body.lastChild);
        }
    }
    var dh = new Object();
    dh['PMobster'] = document.getElementById(ae('Mobster'));
    if (dh['PMobster']) {
        dh['PMobster'].addEventListener('mouseover', help = function (event) {
            HelpHover.show("retsboM esuaP ehT".z(), ">retnec/<>tnof/<.secnereferp ni delbasid eb yaM>rb<gniwohs ot stluafeD>yerg=roloc tnof<>retnec<>rb<>rb<.sbom rieht fo \"leehw eht ta peelsa llaf\" ohw esoht ot >tnof/<neppah sgniht dab>der=roloc tnof< taht dna ,desuap er'uoy taht uoy dnimer ot stnaw eh tub ,uoy ot mrah yna od yllautca t'now eh ,kO>rb<>rb<!tuo uoy ekat .....ot tuo semoc yug elttil siht ,)neercs eht gnihserfer tsuj gnidulcni ,noitca yna( noitca na mrofrep ot gnitiaw si tpircs eht dna ,desuap metsys eht evah uoy fI".z(), event);
        }, true);
        dh['PMobster'].addEventListener('mouseout', HelpHover.hide, true);
    }
    var di = new Object();
    di['stoppmob'] = document.getElementById(ae('stoppmob'));
    if (di['stoppmob']) di['stoppmob'].addEventListener('click', function () {
        cur_f = Infinity;
        var temp = document.getElementById(ae('alertSound2'));
        if (temp) temp.parentNode.removeChild(temp);
    }, true);
}