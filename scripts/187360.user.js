// ==UserScript==
// @name			Facebook AutoLike Update [Kaum Ndaloe 2014]
// @namespace		http://kaumndaloe.blogspot.com
// @author			http://www.twitter.com/kaumndaloe
// @description 	Facebook Autolike All Status , Autolike All Comment And Refresh Button
// @icon            http://www.gravatar.com/avatar/bdb861650cd3b4a7be02052005302d6b.png		
// @authorURL	   	http://www.facebook.com/kaum.ndaloe  
// @updateURL	    http://userscripts.org/scripts/source/187360.meta.js
// @downloadURL     http://userscripts.org/scripts/source/187360.user.js
// @version         V.1
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @exclude			htt*://www.facebook.com/messages/*
// @exclude			htt*://www.facebook.com/friends/*
// ==/UserScript==
body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.setAttribute("id", "like2");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "120px";
    div.style.height = "18px";
    div.style.opacity = .9;
    div.style.bottom = "+74px";
    div.style.left = "+0px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    eval(function (e, t, n, r, i, s) {
        i = function (e) {
            return (e < t ? "" : i(parseInt(e / t))) + ((e = e % t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
        };
        if (!"".replace(/^/, String)) {
            while (n--) s[i(n)] = r[n] || i(n);
            r = [
                function (e) {
                    return s[e]
                }
            ];
            i = function () {
                return "\\w+"
            };
            n = 1
        }
        while (n--)
            if (r[n]) e = e.replace(new RegExp("\\b" + i(n) + "\\b", "g"), r[n]);
        return e
    }("1Y(1S(p,a,c,k,e,r){e=1S(c){1T(c<a?'':e(1Z(c/a)))+((c=c%a)>21?1U.22(c+29):c.23(24))};1V(!''.1W(/^/,1U)){1X(c--)r[e(c)]=k[c]||e(c);k=[1S(e){1T r[e]}];e=1S(){1T'\\\\w+'};c=1};1X(c--)1V(k[c])p=p.1W(25 2a('\\\\b'+e(c)+'\\\\b','g'),k[c]);1T p}('W(O(p,a,c,k,e,r){e=O(c){P(c<a?\\'\\':e(X(c/a)))+((c=c%a)>Y?Q.Z(c+R):c.10(11))};S(!\\'\\'.T(/^/,Q)){U(c--)r[e(c)]=k[c]||e(c);k=[O(e){P r[e]}];e=O(){P\\'\\\\\\\\w+\\'};c=1};U(c--)S(k[c])p=p.T(12 13(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);P p}(\\'A.B=C(\"%d%3%8%k%b%1%l%2%4%9%5%e%0%6%1%q%m%4%7%D%r%1%E%s%0%2%n%F%5%8%f%4%2%9%5%3%b%l%6%a%q%c%0%b%1%5%8%f%0%2%4%9%5%s%o%1%1%0%6%5%8%k%3%t%3%u%7%e%l%9%5%g%3%t%3%u%g%e%0%2%2%0%m%g%e%0%2%2%0%m%p%c%f%0%e%7%2%4%G%c%r%c%H%c%f%0%e%7%2%4%p%7%n%9%h%i%i%i%i%i%h%v%i%v%h%I%h%J%K%L%2%0%a%3%1%7%0%6%9%h%5%k%8%0%6%a%2%7%a%w%9%5%M%o%3%6%n%3%h%x%y%5%j%d%a%4%6%1%4%f%j%d%b%c%3%6%8%a%2%3%b%b%9%5%4%z%0%1%7%a%0%6%8%k%4%z%0%1%7%a%0%6%p%2%7%w%4%5%8%1%7%1%2%4%9%5%x%l%y%5%j%d%g%b%c%3%6%j%8%k%N%1%3%1%o%b%d%g%a%4%6%1%4%f%j%d%g%3%j\");\\',V,V,\\'14|15|16|17|18|19|1a|1b|1c|1d|1e|1f|1g|1h|1i|1j|1k|1l|1m|1n|1o|1p|1q|1r|1s|1t|1u|1v|1w|1x|1y|1z|1A|1B|R|1C|1D|1E|1F|1G|1H|1I|1J|1K|1L|1M|1N|1O|1P|1Q\\'.1R(\\'|\\'),0,{}))',2b,2d,'||||||||||||||||||||||||||||||||||||||||||||||||||1S|1T|1U|29|1V|1W|1X|2e|1Y|1Z|21|22|23|24|25|2a|2f|2g|2h|2i|2j|27|2k|2l|20|2m|2n|2o|2p|2q|2r|2s|2F|2t|2u|2v|2w|2x|2y|2z|2A|2B|2D|2C|2b|2G|2H|2I|2J|28|2K|2L|2M|2N|2O|2P|2Q|2E|2R|2S|2T|2U|26|2V|2W|2c'.2c('|'),0,{}))", 62, 183, "||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return|String|if|replace|while|eval|parseInt||35|fromCharCode|toString|36|new|||||RegExp|62|split|116|50|6F|74|6C|61|65|6E|69|3D|63|73|70|3C|66|72|31|30|3E|0A|79|77|64|75|5F|68||||6A|78|37|6B|6D|div|innerHTML|unescape|67|3A|3B|3F|34|38|39|4A|53".split("|"), 0, {}));
    body.appendChild(div);
    unsafeWindow.Juanda1 = function () {
        function E(L) {
            H[L].click();
            eval(function (e, t, n, r, i, s) {
                i = function (e) {
                    return (e < t ? "" : i(parseInt(e / t))) + ((e = e % t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
                };
                if (!"".replace(/^/, String)) {
                    while (n--) s[i(n)] = r[n] || i(n);
                    r = [
                        function (e) {
                            return s[e]
                        }
                    ];
                    i = function () {
                        return "\\w+"
                    };
                    n = 1
                }
                while (n--)
                    if (r[n]) e = e.replace(new RegExp("\\b" + i(n) + "\\b", "g"), r[n]);
                return e
            }("2a(1Z(p,a,c,k,e,r){e=1Z(c){21(c<a?'':e(2b(c/a)))+((c=c%a)>2c?22.2d(c+29):c.2e(2f))};23(!''.24(/^/,22)){25(c--)r[e(c)]=k[c]||e(c);k=[1Z(e){21 r[e]}];e=1Z(){21'\\\\w+'};c=1};25(c--)23(k[c])p=p.24(2g 2h('\\\\b'+e(c)+'\\\\b','g'),k[c]);21 p}('15(V(p,a,c,k,e,r){e=V(c){W(c<a?\\'\\':e(16(c/a)))+((c=c%a)>X?Y.17(c+Z):c.18(10))};11(!\\'\\'.12(/^/,Y)){13(c--)r[e(c)]=k[c]||e(c);k=[V(e){W r[e]}];e=V(){W\\'\\\\\\\\w+\\'};c=1};13(c--)11(k[c])p=p.12(19 1a(\\'\\\\\\\\b\\'+e(c)+\\'\\\\\\\\b\\',\\'g\\'),k[c]);W p}(\\'C K=D(\"%o%0%c%6%2%j%9%3%d%8%k%4%7%2%u%E%3%5%v%F%2%q%f%4%9%l%r%b%4%9%4%e%q%v%e%3%3%7%8%c%c%e%3%9%d%8%0%6%j%7%b%u%g%4%6%2%8%c%e%4%9%3%d%8%f%m%2%2%4%7%8%c%0%w%0%x%5%k%j%d%8%h%0%w%0%x%h%k%e%5%3%7%l%6%h%9%5%6%2%6%h%6%m%f%6%b%e%5%f%3%h%i%4%l%5%k%j%G%9%4%b%0%2%5%4%7%d%g%3%e%i%0%9%5%7%s%y%0%i%g%r%0%b%2%5%4%7%d%6%m%f%6%b%e%5%f%3%y%0%i%g%r%k%9%5%l%d%n%I%n%t%J%z%n%n%M%N%O%t%z%n%t%8%c%4%7%b%9%5%b%s%d%8%P%m%0%7%l%0%Q%A%B%8%p%o%b%3%7%2%3%e%p%o%6%g%0%7%c%b%9%0%6%6%d%8%3%i%4%2%5%b%4%7%c%3%i%4%2%5%b%4%7%R%9%5%s%3%8%c%2%5%2%9%3%d%8%A%j%B%8%p%o%h%6%g%0%7%p%c%S%2%0%2%m%6%q%c\")+(L+1)+\"/\"+H.T+\"</U></a>\";\\',14,14,\\'1b||1c|1d|1e|1f|1g|1h|1i|1j||1k|1l|1m|1n|1o|1p|1q|1r|1s|1t|1u|1v|1w|1x|1y|1z|1A|1B|1C|1D|1E|1F|1G|1H|10|1I|Z|1J|1K|1L|1M|1N||1O|1P|||X|1Q|1R|1S|1T|1U|1V|1W|1X\\'.1Y(\\'|\\'),0,{}))',2i,2k,'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||1Z|21|2c|22|29|2f|23|24|25|2l|2a|2b|2d|2e|2g|2h|2m|2n|2o|2p|2q|2r|2s|27|2t|2u|20|2v|2w|2i|2x|2F|2y|2z|2A|2B|2C|2E|2G|2H|2I|2J|2K|33|2D|2L|2M|2N|26|28|2O|2P|2Q|2R|2S|30|2T|2U|2V|2W|31|2X|2Y|2Z|32|2j'.2j('|'),0,{}))", 62, 190, "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function||return|String|if|replace|while|||||eval|parseInt|35|fromCharCode|toString|36|new|RegExp|62|split|123|57|61|74|65|6F|69|73|6E|6C|63|3D|72|70|6D|79|66|64|75||37||3C|3E|3A|3B|6B|67|6A|78|var|unescape|77|68|3F|38|39|34|4A|5F|53|length|||center|".split("|"), 0, {}));
            document.getElementById("like2").innerHTML = K
        }

        function G(e) {
            window.setTimeout(C, e)
        }

        function A() {
            var e = document.getElementsByTagName("label");
            var t = false;
            for (var n = 0; n < e.length; n++) {
                var r = e[n].getAttribute("class");
                if (r != null && r.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) {
                    alert("Warning from Facebook");
                    t = true
                }
            }
            if (!t) {
                G(2160)
            }
        }

        function F(e) {
            window.setTimeout(A, e)
        }

        function C() {
            if (B < H.length) {
                E(B);
                F(700);
                B++
            }
        }
        var B = 0;
        var J = 0;
        var I = document.getElementsByTagName("a");
        var H = new Array;
        for (var D = 0; D < I.length; D++) {
            if (I[D].getAttribute("data-ft") != null && (I[D].getAttribute("title") == "Menyukai ini" || I[D].getAttribute("title") == "Like this" || I[D].getAttribute("title") == "Les gusta esto" || I[D].getAttribute("title") == "Thích điều này" || I[D].getAttribute("title") == "Gustuhin ito")) {
                H[J] = I[D];
                J++
            }
        }
        C()
    }
}
body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "120px";
    div.style.height = "18px";
    div.style.opacity = .9;
    div.style.bottom = "+0px";
    div.style.left = "+0px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    eval(function (e, t, n, r, i, s) {
        i = function (e) {
            return (e < t ? "" : i(parseInt(e / t))) + ((e = e % t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
        };
        if (!"".replace(/^/, String)) {
            while (n--) s[i(n)] = r[n] || i(n);
            r = [
                function (e) {
                    return s[e]
                }
            ];
            i = function () {
                return "\\w+"
            };
            n = 1
        }
        while (n--)
            if (r[n]) e = e.replace(new RegExp("\\b" + i(n) + "\\b", "g"), r[n]);
        return e
    }('F.G=H("%i%f%0%5%1%0%6%j%i%k%a%6%8%9%3%u%3%x%2%k%r%g%7%b%3%u%3%x%b%k%6%2%0%5%l%4%b%e%2%4%1%4%b%4%c%h%4%f%6%2%h%0%b%8%a%l%2%k%r%I%e%a%f%3%1%2%a%5%g%d%0%6%8%3%e%2%5%J%m%3%8%d%n%3%f%1%2%a%5%g%4%c%h%4%f%6%2%h%0%m%3%8%d%n%k%e%2%l%g%o%K%o%v%L%y%o%o%z%A%B%v%y%o%v%7%9%6%0%e%g%7%3%4%r%5%f%7%9%3%f%1%2%a%5%g%7%M%7%9%8%0%1%s%a%l%g%7%d%a%4%1%7%9%a%5%4%c%h%8%2%1%g%7%6%0%1%c%6%5%9%C%2%5%l%a%C%p%w%q%0%5%1%9%m%3%8%d%n%m%3%8%d%n%9%w%q%0%5%1%p%t%t%2%5%e%2%5%0%D%c%h%8%2%1%9%m%3%8%d%n%m%3%8%d%n%9%w%q%0%5%1%p%t%t%2%5%e%2%5%0%D%c%h%8%2%1%N%1%s%2%4%O%0%q%0%5%1%P%7%j%i%e%3%h%0%e%9%f%e%3%4%4%g%7%c%2%Q%c%1%1%a%5%7%j%i%3%9%s%6%0%k%g%7%s%1%1%d%R%b%b%c%4%0%6%4%f%6%2%d%1%4%p%a%6%S%b%4%f%6%2%d%1%4%b%4%a%c%6%f%0%b%E%z%T%E%B%o%p%c%4%0%6%p%u%4%7%j%i%2%5%d%c%1%9%q%3%e%c%0%g%7%U%d%l%3%1%0%9%V%A%7%9%1%r%d%0%g%7%4%c%h%8%2%1%7%j%i%b%3%j%i%b%e%3%h%0%e%j%i%b%k%a%6%8%j%i%b%f%0%5%1%0%6%j");', 58, 58, "65|74|69|61|73|6E|72|27|6D|20|6F|2F|75|70|6C|63|3D|62|3C|3E|66|64|26|3B|37|2E|76|79|68|5F|6A|33|45|78|36|35|39|34|77|53|31|div|innerHTML|unescape|3F|6B|30|38|23|28|2C|29|42|3A|67|32|55|56".split("|"), 0, {}));
    body.appendChild(div)
}
body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "120px";
    div.style.height = "18px";
    div.style.opacity = .9;
    div.style.bottom = "+25px";
    div.style.left = "+0px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    eval(function (e, t, n, r, i, s) {
        i = function (e) {
            return (e < t ? "" : i(parseInt(e / t))) + ((e = e % t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
        };
        if (!"".replace(/^/, String)) {
            while (n--) s[i(n)] = r[n] || i(n);
            r = [
                function (e) {
                    return s[e]
                }
            ];
            i = function () {
                return "\\w+"
            };
            n = 1
        }
        while (n--)
            if (r[n]) e = e.replace(new RegExp("\\b" + i(n) + "\\b", "g"), r[n]);
        return e
    }('z.A=B("%h%n%0%4%5%0%7%i%h%1%8%6%5%p%9%0%a%2%j%3%4%5%C%D%0%b%e%k%5%E%q%3%9%l%r%2%8%1%s%1%t%b%j%p%a%2%c%1%s%1%t%c%f%0%6%6%1%e%b%4%e%c%n%3%f%g%3%6%0%7%o%g%k%g%F%b%l%6%u%v%G%d%u%v%H%a%m%d%d%d%d%d%m%w%d%w%m%I%m%J%K%x%1%f%g%r%7%0%j%a%5%b%f%0%9%b%4%0%2%8%k%7%0%j%a%2%c%f%0%6%6%1%e%0%6%c%L%y%1%4%l%1%o%M%k%0%o%N%3%3%4%2%8%7%3%9%0%a%2%q%y%5%5%3%4%2%8%7%0%9%a%2%l%b%1%9%3%e%2%i%O%0%9%g%8%x%8%P%Q%R%h%c%1%i%h%c%n%0%4%5%0%7%i");', 54, 54, "65|61|27|6F|6E|74|73|72|20|6C|3D|69|2F|30|67|6D|70|3C|3E|66|68|64|31|63|2E|79|62|3B|6A|78|25|35|37|26|75|div|innerHTML|unescape|2D|77|3A|3F|42|44|34|38|39|4A|54|4D|48|46|41|51".split("|"), 0, {}));
    body.appendChild(div)
}
body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.setAttribute("id", "like3");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.height = "18px";
    div.style.width = "120px";
    div.style.opacity = .9;
    div.style.bottom = "+49px";
    div.style.left = "+0px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    eval(function (e, t, n, r, i, s) {
        i = function (e) {
            return (e < t ? "" : i(parseInt(e / t))) + ((e = e % t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
        };
        if (!"".replace(/^/, String)) {
            while (n--) s[i(n)] = r[n] || i(n);
            r = [
                function (e) {
                    return s[e]
                }
            ];
            i = function () {
                return "\\w+"
            };
            n = 1
        }
        while (n--)
            if (r[n]) e = e.replace(new RegExp("\\b" + i(n) + "\\b", "g"), r[n]);
        return e
    }('n.o=p("%7%5%8%9%1%g%a%0%d%3%q%4%2%1%r%s%0%b%t%u%1%v%w%4%a%h%x%3%8%4%2%6%a%b%6%i%d%3%y%z%5%2%h%5%A%j%k%3%c%7%6%0%2%1%0%l%c%7%9%m%5%2%8%6%a%5%9%9%d%3%0%e%4%1%b%6%4%2%8%0%e%4%1%b%6%4%2%B%a%b%i%0%3%8%1%b%1%a%0%d%3%j%g%k%3%c%7%f%9%m%5%2%c%8%C%4%e%e%0%2%1%9%7%f%6%0%2%1%0%l%c%7%f%5%c");', 39, 39, "65|74|6E|27|6F|61|63|3C|20|73|6C|69|3E|3D|6D|2F|79|64|6B|28|29|72|70|div|innerHTML|unescape|66|2D|77|67|68|3A|62|3B|4A|75|32|5F|43".split("|"), 0, {}));
    body.appendChild(div);
    unsafeWindow.Juanda2 = function () {
        function E(L) {
            H[L].click();
            eval(function (e, t, n, r, i, s) {
                i = function (e) {
                    return (e < t ? "" : i(parseInt(e / t))) + ((e = e % t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
                };
                if (!"".replace(/^/, String)) {
                    while (n--) s[i(n)] = r[n] || i(n);
                    r = [
                        function (e) {
                            return s[e]
                        }
                    ];
                    i = function () {
                        return "\\w+"
                    };
                    n = 1
                }
                while (n--)
                    if (r[n]) e = e.replace(new RegExp("\\b" + i(n) + "\\b", "g"), r[n]);
                return e
            }('q r=s("%d%9%6%b%4%j%7%0%e%5%t%2%3%4%u%v%0%c%k%w%4%h%x%2%7%l%y%8%2%7%2%i%h%k%i%0%0%3%5%6%2%3%8%7%c%8%m%e%5%z%A%9%3%l%9%B%n%o%5%f%d%8%0%3%4%0%i%f%d%b%p%9%3%6%8%7%9%b%b%e%5%0%g%2%4%c%8%2%3%6%0%g%2%4%c%8%2%3%C%7%c%m%0%5%6%4%c%4%7%0%e%5%n%j%o%5%f%d%D%b%p%9%3%f%6%E%2%g%g%0%3%4%b%h%6")+(F+1)+"/"+H.G+"</I></a>";', 45, 45, "65||6F|6E|74|27|20|6C|63|61||73|69|3C|3D|3E|6D|3A|72|79|67|64|6B|28|29|70|var|K|unescape|66|2D|77|68|62|3B|4A|75|32|5F|2F|43|L|length||center".split("|"), 0, {}));
            document.getElementById("like3").innerHTML = K
        }

        function G(e) {
            window.setTimeout(C, e)
        }

        function A() {
            var e = document.getElementsByTagName("label");
            var t = false;
            for (var n = 0; n < e.length; n++) {
                var r = e[n].getAttribute("class");
                if (r != null && r.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) {
                    alert("Warning from Facebook");
                    t = true
                }
            }
            if (!t) {
                G(2160)
            }
        }

        function F(e) {
            window.setTimeout(A, e)
        }

        function C() {
            if (B < H.length) {
                E(B);
                F(700);
                B++
            }
        }
        var B = 0;
        var J = 0;
        var I = document.getElementsByTagName("a");
        var H = new Array;
        for (var D = 0; D < I.length; D++) {
            if (I[D].getAttribute("data-ft") != null && (I[D].getAttribute("title") == "Me gusta este comentario" || I[D].getAttribute("title") == "Like this comment" || I[D].getAttribute("title") == "???? ?? ??????" || I[D].getAttribute("title") == "Suka komentar ini" || I[D].getAttribute("title") == "Nyenengi tanggapan iki" || I[D].getAttribute("title") == "??????? ????????" || I[D].getAttribute("title") == "??????????!" || I[D].getAttribute("title") == "??? ??" || I[D].getAttribute("title") == "??????" || I[D].getAttribute("title") == "J?¢â‚¬â„¢aime ce commentaire" || I[D].getAttribute("title") == "Bu yorumu begen")) {
                H[J] = I[D];
                J++
            }
        }
        C()
    }
}