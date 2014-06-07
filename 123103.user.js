// ==UserScript==
// @name        Travian hero auction harvester
// @version     1.0.0
// @author      mikrop
// @namespace   T4
// @description
// @include 	http://*.travian.cz/hero_auction.php?action=buy&filter=*
// @include 	http://*.travian*.*/hero_auction.php?page=*&filter=*&a=*&z=*
// @require     http://code.jquery.com/jquery-1.7.1.min.js
// @exclude 	http://*.travian*.*/
// ==/UserScript==

D = {
	en: {
		maxbid : "Max bid"
	},
	cs: {
		maxbid : "Maximální nabídka"
    }
}

/**
 * Z definovaneho slovniku {@link #D} vybere prelozenou hodnotu pozadovaneho klice.
 *
 * @param key ktery hledame
 */
function D_Text(key) {
    var language = window.navigator.language,
    entxt = typeof D["en"][key] == "undefined" ? "Error" : D["en"][key];
    if (typeof D[language] == "undefined") return entxt;
    if (typeof D[language][key] != "undefined") entxt = D[language][key];
    return entxt;
}

/**
 * Nastavi coockie predaneho jmena na predanou hodnotu.
 *
 * @param c_name retezec reprezentujici jmeno cookie
 * @param value hodnota na kterou bude cookie nastetovana
 * @param exdays datum expirace
 */
function SET_Cookie(c_name, value, exdays) {

    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;

}

/**
 * Ziska cookie predaneho jmena, pokud ne, vraci hodnotu druheho parametu.
 *
 * @param c_name retezec reprezentujici jmeno cookie
 * @param def hodnota vracena, pokud nebude cookie podle predaneho jmena nalezena
 */
function GET_Cookie(c_name, def) {

    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(c_name + "=");
        if (start != -1) {
            start = start + c_name.length + 1;
            end = document.cookie.indexOf(";", start);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(start, end));
        }
    }
    return def;

}

/**
 * Vraci hodnotu pozadovaneho GET_ parametru.
 *
 * @param vars jmeno parametru
 */
function GET_Vars(vars) {

    var $_GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });
    return $_GET[vars];

}

function GM_ready() {

    $(document).ready(function() {

        var silver = $('div[class="silver"]');
        silver.css("cursor", "pointer")
        .bind("click", function() {

                var c_name = "auction-harvester-filter-" + GET_Vars("filter"),
                value = prompt(D_Text("maxbid"), GET_Cookie(c_name, 1))
//                ,text = $.trim(silver.text())
                    ;

                SET_Cookie(c_name, parseInt(value, 10), 1);
                console.log(GET_Cookie(c_name, 1));

        });

    });

}

function GM_wait() {
    if (typeof unsafeWindow.jQuery == "undefined") {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        GM_ready();
    }
}

function GM_include(src){
    var GM_Head = document.getElementsByTagName("head")[0] || document.documentElement,
        GM_JQ = document.createElement("script");

    GM_JQ.src = src;
    GM_JQ.type = "text/javascript";
    GM_JQ.async = true;

    GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
}

(function() {
    if (typeof unsafeWindow.jQuery == "undefined") {
        GM_include("http://code.jquery.com/jquery-1.7.1.min.js");
    }
    GM_wait();
})();
