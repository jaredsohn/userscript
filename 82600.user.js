// ==UserScript==
// @name           Starfleet Cargo Gauger
// @namespace      http://bergfall.no
// @description    Shows amount of needed cargo ships to ship your stash AND auto-marks messages for deleting
// @include        http://playstarfleetextreme.com/*
// @include        http://playstarfleet.com/*
// ==/UserScript==
(function () {

    //boilerplate greasemonkey to wait until jQuery is defined...
    function GM_wait() {
        if (typeof unsafeWindow.$$ == 'undefined')
            window.setTimeout(GM_wait, 100);
        else
            letsJQuery(unsafeWindow.$$);
    }
    GM_wait();

    function letsJQuery($$) {

        if (document.location.href.indexOf("messages") > -1) {
            $$('#messages tr.message').each(function (e, i) {
                GM_log(e);
                if (e.textContent.indexOf("Report") == 31) {
                    e.firstElementChild.firstElementChild.checked = true;
                    //e.hide();
                }
            });
            unsafeWindow.Ajax.Responders.register({
                onComplete: function () {
                    $$('#messages tr.message').each(function (e, i) {
                        if (e.textContent.indexOf("Report") == 31) {
                            e.firstElementChild.firstElementChild.checked = true;
                            //e.hide();
                        }
                    });
                }
            });
        }
        var amount = 0;
        var resources = $$('.resources .amount');

        for (var i = 0; i < 3; i++) {
            var resource = resources[i];
            amount += parseInt(resource.innerHTML.replace(/,/g, ''));
        }
        var replacement_html = $$('.resources')[0].innerHTML.replace(/(.*)(<tr\Wclass=.merchant.>.*)/, "$1<tr><td>Atl / Herc</td><td style='text-align:right'>" + Math.ceil(amount / 5000) + " / " + Math.ceil(amount / 25000) + "</td></tr>$2")
        $$('.resources')[0].innerHTML = replacement_html;
        $$('.resources')[0].style.height = "auto";
        unsafeWindow.Ajax.Responders.register({
            onComplete: function () {
                if ($$('.resources')[0].innerHTML.indexOf("Atl") == -1) {
                    var amount = 0;
                    var resources = $$('.resources .amount');

                    for (var i = 0; i < 3; i++) {
                        var resource = resources[i];
                        amount += parseInt(resource.innerHTML.replace(/,/g, ''));
                    }
                    var replacement_html = $$('.resources')[0].innerHTML.replace(/(.*)(<tr\Wclass=.merchant.>.*)/, "$1<tr><td>Atl / Herc</td><td style='text-align:right'>" + Math.ceil(amount / 5000) + " / " + Math.ceil(amount / 25000) + "</td></tr>$2")
                    $$('.resources')[0].innerHTML = replacement_html;
                    $$('.resources')[0].style.height = "auto";
                }
            }
        });


    }
})();
