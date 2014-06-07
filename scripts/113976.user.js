// ==UserScript==
// @name          DoubleRecallAway!
// @namespace     http://andraz.eu/DoubleRecallAway/
// @author        orig author: andrazk | burjast mod
// @description   Remove doublerecallaway onthefly
// @run-at        document-end
// @include       http://www.playboy.si/*
// @include       http://www.finance.si/*
// @include       http://*dnevnik.si/*
// @include       http://www.medicina-danes.si/*
// @include       http://www.cosmopolitan.si/*
// @include       http://www.elle.si/*
// @include       http://www.aktivni.si/*
// @include       http://tecemo.aktivna.si/*
// @include       http://www.kickr.si/*
// @include       http://www.sensa.si/*
// @include       http://govori.se/*
// @include       http://www.connect.si/*
// @include       http://www.moto-magazin.si/*
// @include       http://www.pozareport.si/*
// ==/UserScript==

/* config ends, code below */
(function () {
    var DR_remover = function () {
            return {
                latestVersion: function () {
                    return "0.14"
                },
                removeDR: function (a) {
                    if (DRjQuery) {
                        var b = DRjQuery("#dr_link span").map(function () {
                            return $(this).text()
                        }).get().join(" ");
                        DRjQuery("input#dr_field").val(b);
                        DRjQuery("input#dr_submit").trigger("click")
                    }
                    jQuery("#dr_assist").remove();
                    jQuery("form#dr").remove();
                    jQuery("div#dr").remove();
                    jQuery("div#dr_container").remove();
                    jQuery("#drtakeover").remove();
                    jQuery(".dr_article").show();
                    jQuery("#dr_article").show()
                }
            }
        }();
    var w = window,
        ub = 'http://andraz.eu/DoubleRecallAway/';
    u = ub + 'recipes.js', jq = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js', d = w.document, s = d.createElement('script'), x = 'undefined';
    curVer = "0.14";

    function g() {
        if (d.readyState && d.readyState != 'complete') {
            setTimeout(g, 200)
        } else {
            if (typeof DR_remover == x) {
                s.setAttribute('src', u);
                d.body.appendChild(s);
                if (typeof jQuery == x) {
                    s = d.createElement('script');
                    s.setAttribute('src', jq);
                    d.body.appendChild(s)
                }
            }
            function f() {
                if (typeof DR_remover == x) {
                    setTimeout(f, 200)
                } else {
                    DR_remover.removeDR(w.location);
                    if (curVer != DR_remover.latestVersion()) {
                        if (confirm('New version of DoubleRecallAway bookmarklet is out!\n\nConfirm to go to ' + ub)) {
                            w.location = ub
                        }
                    }
                }
            }
            f()
        }
    }
    g()
})();