// ==UserScript==
// @name        Simplistic userscript.org spam reducer
// @namespace   http://whatever.you.know
// @description Simplistic userscript spam reducer.  Removes some obvious spam from main scripts pages.  Moves on to next page if everything is spam. Yes, this is an impossible way to fight asswipes, but for the moment it is useful.
// @include     http://userscripts.org/scripts*
// @version     1
// @grant       none
//
// Removes rows with certain keywords including Russian film related keywords (prefix only). Feel free to update to your own needs.
// Unicode to javascript done with http://rishida.net/tools/conversion/
//
// ==/UserScript== 
excl = new Array();
excl.push("download|key|call of|poke|codes|dofus|paypal|1080|720|Prescription|RX");
excl.push("watch");
excl.push("movie");
excl.push("online");
excl.push("free");
excl.push("gratuit");
excl.push("survey");
excl.push("cheap");
excl.push("buy");
excl.push("how to");
excl.push("order");
excl.push("hack");
excl.push("crack");
excl.push("xbox");
excl.push("nintend");
excl.push("ps3");
excl.push("ps4");
excl.push("playst");
excl.push("game boy");
excl.push("gameboy");
excl.push("keygen");
excl.push("cheats");
excl.push("generat");
excl.push("credit");
excl.push("money");
excl.push("HD");
excl.push("film");
excl.push("cash");
excl.push("\u0442\u0430\u0431\u043B"); // tabl  (tablet?)
excl.push("\u0441\u043C\u043E\u0442\u0440"); // watch
excl.push("\u0444\u0438\u043B\u044C"); // film
excl.push("G\u00E9n\u00E9r"); // gener
function removecrap() {
    var count = 0;
    var lis = document.getElementsByTagName('tr');
    for (li = 0; li < lis.length; li++) {
        ih = lis[li].innerHTML.toString();
        if (ih.match(new RegExp(excl.join("|"), "i"))) {
            count++;
            lis[li].style.display = "none";
        } else {
            td = lis[li].getElementsByTagName("td")[0];
            if (td) {
                if (td.childNodes.length > 2) {
                    a = td.getElementsByTagName("A")[0];
                    p = td.getElementsByTagName("P")[0];
                    if (a && p) {
                        if ((p.innerHTML == "") || (a.innerHTML == p.innerHTML) || (a.innerHTML.indexOf(p.innerHTML) == 0)) {
                            count++;
                            lis[li].style.display = "none";
                        }
                    }
                }
            }
        }
    }
    if (count == 25) { // everything is gone
        if (location.href.indexOf("page=") < 1) u = 1;
        else {
            var u = location.href.split('page=');
            u = parseInt(u[u.length - 1]);
            if (u == 0)
                u = 1;
        }

        //alert("Everything is spam on page " + u + " is Spam.");
        document.body.innerHTML = "<center><p>&nbsp;<p><b style='font-size:30pt'>Everything is spam on page " + u + ".<p>Moving on...</b></center>";
        location.href = "http://userscripts.org/scripts?page=" + (u + 1);
    }
}
try {
    removecrap();
} catch (e) {
    alert(e.message);
}