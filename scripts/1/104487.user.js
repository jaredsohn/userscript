// ==UserScript==
// @name           NationStates Random Number Gods
// @version        1.3
// @namespace      http://code.drostie.org/
// @include        http://*.nationstates.net/page=show_dilemma/dilemma=*
// ==/UserScript==

/* This user script for nationstates.net was written by Chris Drost of 
 * drostie.org in the year 2011. To the extent possible by law, I hereby waive
 * all copyright and any related rights to this code under the Creative Commons
 * Zero waiver/license, which you may read online at:
 *
 *     http://creativecommons.org/publicdomain/zero/1.0/legalcode
 *
 * This means that you may copy, distribute, modify, and use my code without 
 * any fear of lawsuits from me. As it says at the above URL, my code is 
 * provided with NO WARRANTIES OF ANY KIND. I do humbly request that you 
 * provide me some sort of attribution or credit if you use it; but I leave 
 * that decision up to you. 
 */

/* PRELUDE: Contains a bunch of utilities to help with debugging. */

var script_name = "NationStates Random Number Gods";

var running = true, 
    storage = window.localStorage;

function storage_test() {
    storage.storage_test = 123;
    storage.storage_test += 1;
    delete storage.storage_test;
}
try {
    storage_test();
} catch (e) {
    if (typeof unsafeWindow !== "undefined") {
        storage = unsafeWindow.localStorage;
    }
    try {
        storage_test();
    } catch (e2) {
        storage = {
            ns_rng_seed: "9jhCRZl1j2wZXi8tJowqAFYHnth4ZpMNnm-0FwkG|" +
                navigator.userAgent
        };
    }
}
function sandbox(section, f) {
    "use strict";
    try { 
        if (running) {
            return f();
        }
    } catch (e) {
        running = false;
        alert("The '" + script_name + "' script generated an error:" + 
            "\nSection: " + section +
            "\nError: " + e
        );
    }
}

/* The Keccak hash function is a public-domain SHA-3 candidate algorithm by 
 * Bertoni, Daemen, Peeters, and van Assche; this is a public-domain 
 * implementation of the 32-bit version proposed in their paper.
 */
var keccak32;
sandbox("set up keccak", function () {
    "use strict";
    keccak32 = (function () {
        function hexify(arr) { 
            function hex(n) {
                return ("00" + n.toString(16)).slice(-2);
            }
            return arr.map(function (n) {
                return hex(n & 255) + hex(n >>> 8) + hex(n >>> 16) + hex(n >>> 24);
            }).join("");
        }
        var permute, RC, r, circ, output_fn;
        permute = [0, 10, 20, 5, 15, 16, 1, 11, 21, 6, 7, 17, 2, 12, 22, 23, 8, 18, 3, 13, 14, 24, 9, 19, 4];
        RC = [1, 32898, 32906, 2147516416, 32907, 2147483649, 2147516545, 32777, 138, 136, 2147516425, 2147483658, 2147516555, 139, 32905, 32771, 32770, 128, 32778, 2147483658, 2147516545, 32896];
        r = [0, 1, 30, 28, 27, 4, 12, 6, 23, 20, 3, 10, 11, 25, 7, 9, 13, 15, 21, 8, 18, 2, 29, 24, 14];
        circ = function (s, n) {
            return (s << n) | (s >>> (32 - n));
        };
        output_fn = function (n) {
            return n >= 0 ? n : n + Math.pow(2, 32); // unsigns the ints.
        };
        return function (m, raw) {
            var i, b, k, x, y, C, D, round, next, state;
            state = [];
            for (i = 0; i < 25; i += 1) {
                state[i] = 0;
            }
            C = [];
            D = [];
            next = [];
            m += "\u0001\u0120";
            while (m.length % 16 !== 0) {
                m += "\u0000";
            }
            for (b = 0; b < m.length; b += 16) {
                for (k = 0; k < 16; k += 2) {
                    state[k / 2] ^= m.charCodeAt(b + k) + m.charCodeAt(b + k + 1) * 65536;
                }
                for (round = 0; round < 22; round += 1) {
                    for (x = 0; x < 5; x += 1) {
                        C[x] = state[x] ^ state[x + 5] ^ state[x + 10] ^ state[x + 15] ^ state[x + 20]; 
                    }
                    for (x = 0; x < 5; x += 1) {
                        D[x] = C[(x + 4) % 5] ^ circ(C[(x + 1) % 5], 1);
                    }
                    for (i = 0; i < 25; i += 1) {
                        next[permute[i]] = circ(state[i] ^ D[i % 5], r[i]);
                    }
                    for (x = 0; x < 5; x += 1) {
                        for (y = 0; y < 25; y += 5) {
                            state[y + x] = next[y + x] ^ ((~ next[y + (x + 1) % 5]) & (next[y + (x + 2) % 5]));
                        }
                    }
                    state[0] ^= RC[round];
                }
            }
            state = state.slice(0, 8).map(output_fn);
            return raw ? state : hexify(state);
        };
    }());
});

/* SCRIPT: the remainder of this can be scanned with JSLint. */

/*jslint white: false, onevar: true, undef: true, nomen: true, regexp: true, plusplus: true, bitwise: true, newcap: false, strict: true */
/*global storage: true, document, decodeURIComponent, sandbox, navigator, keccak32, window */

var random_int, tags;

sandbox("set up base functions", function () {
    "use strict";
    function rand_string(seed) {
        return keccak32(
            [
                new Date().getTime(), Math.random(), Math.random(), 
                Math.random(), Math.random(), seed, navigator.userAgent
            ].join(",")
        );
    }
    if (typeof storage.ns_rng_seed !== 'string') {
        storage.ns_rng_seed =
            rand_string("F7UCDQhnlqutzJQRQ-B9UydF1k9ddJGbtH1zlzha") +
            rand_string("xOwoS0d7fos_yOOJ4pceLZ-M4FeuBLhmB_IB3JoR") +
            rand_string("BlvLxwG02oAqNXIKdaUGnXn46utw6sMVWYX1OLTz") +
            rand_string("LoQyQReVRHXAdiPUb1rusp2JKzQDAwF1slwITlHA");
    }
    random_int = function (a, b) {
        var date = new Date(),
            day = Math.floor(
                (date.getTime() / 60000 - date.getTimezoneOffset()) / 1440
            ),
            seed = [storage.ns_rng_seed, day, window.location].join("|"),
            nums = keccak32(seed, true),
            two32 = Math.pow(2, 32),
            rand = nums[0] / two32 + nums[1] / (two32 * two32);
        return a + Math.floor((b - a) * rand);
    };
    
    function make_array(list) {
        return Array.prototype.slice.call(list, 0);
    }
    tags = function (name, context) {
        if (context === undefined) {
            context = document;
        }
        return make_array(context.getElementsByTagName(name));
    };
});

sandbox("main body", function () {
    "use strict";
    var options = tags("li", tags("ol")[0]),
        choice = random_int(0, options.length + 1), 
        base = "<strong>The random number gods smile upon the above option.</strong>",
        ref, bq;

    if (choice === options.length) {
        ref = document.getElementsByName("choice--1");
        if (ref.length === 0) {
            ref = document.getElementsByTagName("h5")[2];
            ref = ref.nextSibling.nextSibling;
        } else {
            ref = ref[0].parentNode;
        }
        bq = document.createElement("blockquote");
        bq.innerHTML += "<strong>The random number gods smile upon the status quo.</strong>";
        ref.parentNode.insertBefore(bq, ref.nextSibling);
    } else {
        // the last option has no <br><br> at the end of it, to pad it.
        options[choice].innerHTML += (choice === options.length - 1) ?
            "<br><br>" + base : base + "<br><br>";
    }
});