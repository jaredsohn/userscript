// ==UserScript==
// @name        CLARA_Vykaz
// @namespace   https://clara.csin.cz
// @description CA Clarity PPM :: Pracovní výkaz
// @include     https://clara.csin.cz/niku/nu*
// @version     1.2
// @grant       none
// @website     http://userscripts.org/scripts/show/167658
// @downloadURL http://userscripts.org/scripts/source/167658.user.js
// @updateURL   http://userscripts.org/scripts/source/167658.meta.js
// ==/UserScript==

(function () {
    var svatky = {
        "1": [1],
        "5": [1, 8],
        "7": [5, 6],
        "9": [28],
        "10": [28],
        "11": [17],
        "12": [24, 25, 26]
    };

    function jeSvatek(day, month) {
        var list = svatky[month] || [];
        return list.indexOf(parseInt(day)) > -1;
    }

    // Enhancements
    function enhanceTimeSheet() {
        console.log("Initializing CLARA TimeSheet Enhancements");

        jQuery('input[name="actuals_hours"]:not(".modified")').addClass("modified").each(function () {
            var title = this.getAttribute("title") || "";
            var etc = (title.match(/ETC:\s*(\d+,?\d*)/) || [])[1] || "";
            var date = (title.match(/^\S+,\s*(\d+)\.(\d+)/)) || [];

            jQuery('<span style="font-size: 0.8em;">ETC: ' + etc + '</span>').insertAfter(this);
            this.setAttribute("ETC", etc);

            if (/^(So|Ne)/i.test(title) || jeSvatek(date[1], date[2])) {
                this.style.backgroundColor = '#ECFCFF';
            }
        });


        if (!document.getElementById('enh_enh')) {
            jQuery('span[title="Pracovní výkaz"]').attr("style", "float:left;");

            jQuery('<button id="enh_vyplnit" class="ppm_button button" type="button" style="float:right;margin:2px;">Vyplnit</button>')
                .insertAfter('span[title="Pracovní výkaz"]')
                .click(function () {
                    jQuery('input[name="actuals_hours"]').each(function () {
                        if (this.getAttribute("ETC")) {
                            this.value = this.getAttribute("ETC");
                        }
                    });
                });
        }

        if (!document.getElementById('enh_doplnit')) {
            jQuery('<button id="enh_doplnit" class="ppm_button button" type="button" style="float:right;margin:2px;">Doplnit</button>')
                .insertAfter('span[title="Pracovní výkaz"]')
                .click(function () {
                    jQuery('input[name="actuals_hours"]').each(function () {
                        if (this.value == "" && this.getAttribute("ETC")) {
                            this.value = this.getAttribute("ETC");
                        }
                    });
                });
        }
    }

    // Ajax Injection
    var target = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
        // Handle repeated calls
        if (!this.__hacked) {
            // Hack handler
            var hacked = this.__hacked = this.onreadystatechange;
            this.onreadystatechange = function () {
                // Call original handler
                hacked.apply(this, [].slice.call(arguments));

                // On DONE state call our handler
                if (this.readyState == 4) {
                    enhanceTimeSheet();
                }
            }
        }

        // Call proxied send method
        return target.apply(this, [].slice.call(arguments));
    };

    // Other cases (lazy)
    jQuery(document).ready(function () {
        var submitForm = window.submitForm;
        window.submitForm = function () {
            submitForm.apply(this, arguments);
            setTimeout(enhanceTimeSheet, 1000);
        }
    });
})();
