// ==UserScript==
// @name           fpinfo
// @namespace      http://www.fotka.pl/profil/suchar/
// @include        http://www.fotka.pl/profil/*
// @copyright      2012+, suchar
// @version        2.5
// ==/UserScript==
var u = unsafeWindow;
var $ = u.$;
//u.onerror = null;
//klasa tablicy asocjacyjnej. (c) Bozar 2010.
function AssocArray() {
    var keyNames = new Array();
    var values = new Array();

    this.setItem = function (newKey, newValue) {
        var keyFoundAt;
        for (keyFoundAt = 0; keyFoundAt < keyNames.length; keyFoundAt++) { //sprawdzamy czy dany klucz już istnieje w tablicy kluczy
            if (keyNames[keyFoundAt] == newKey) break;
        }

        keyNames[keyFoundAt] = newKey;
        values[keyFoundAt] = newValue;
    }

    this.getItem = function (keyName) {
        var keyFoundAt;
        for (keyFoundAt = 0; keyFoundAt < keyNames.length; keyFoundAt++) {
            if (keyNames[keyFoundAt] == keyName) break;
        }
        return values[keyFoundAt];
    }

    this.getLength = function () {
        return keyNames.length;
    }

    this.getKey = function (n) {
        return keyNames[n];
    }
}
//var banInHours = 24;
const action_orig = u.action;
var p2;
p2 = document.createElement("div");
p2.className = "Box BoxShadow profile-box";
p2.innerHTML = "Pobieranie informacji o banach...<br/><br/>";
p2.style.color = "#CCCCCC";
p2.style.backgroundColor = "transparent";
u.$("#user-dane-podstawowe").before(p2);

function setInfoText(n) {
    p2.innerHTML = "<u>Sugerowana długość bana:</u><br/>Na zdjęcia: " + calculateBanText(n["photo"]);
    p2.innerHTML += "<br/>Na komentarze: " + calculateBanText(n["comment"]);
    p2.innerHTML += "<br/>Na PW: " + calculateBanText(n["pw"]);
    p2.innerHTML += "<br/>Na czat: " + calculateBanText(n["czat"]);
    p2.style.color = ((n["photo"] + n["comment"] + n["other"] + n["pw"] + n["czat"]) > 0) ? "#CC0000" : "#CCCCCC";
    p2.style.backgroundColor = ((n["photo"] + n["comment"] + n["other"] + n["pw"] + n["czat"]) > 0) ? "white" : "transparent";
}

function calculateBanText(n) {
    if (n == 0) return "1 dzień";
    if (n == 1) return "3 dni";
    if (n == 2) return "7 dni";
    if (n == 3) return "14 dni";
    if (n >= 4 && n <= 7) return "1 miesiąc";
    if (n > 7) return "na zawsze";
    return n;
}

function calculateBanHours(n) {
    if (n == 0) return 24;
    if (n == 1) return 3 * 24;
    if (n == 2) return 7 * 24;
    if (n == 3) return 14 * 24;
    if (n >= 4) return 30 * 24;
    return n;
}

function processResponse(html) {
    var banCounts = new Object();
    banCounts["photo"] = banCounts["comment"] = banCounts["other"] = banCounts["pw"] = banCounts["czat"] = 0;

    var infoFrame1 = document.createElement("div");
    var pos1 = html.indexOf("Operacje moderacji tego profilu:");
    if (pos1 > 0) {
        var pos2 = html.indexOf("<table", pos1);
        var pos3 = html.indexOf(">", pos2) + 1; // A
        var pos4 = html.indexOf("</table>", pos3) + "</table>".length; // B
        infoFrame1.innerHTML = html.substring(pos2, pos4);
        var commentDates = new AssocArray();
        var photoDates = new AssocArray();
        // var otherDates = new AssocArray();    
        var rows = infoFrame1.firstChild.firstChild.childNodes;
        for (var i = 1; i < rows.length; i++) {
            var date = rows[i].childNodes[1].innerHTML;
            var reason = rows[i].lastChild.firstChild.textContent.split(" ", 2).join(" ");

            if (reason == "usunięcie zdjęcia") {
                if (photoDates.getItem(date) == undefined) photoDates.setItem(date, 0);
                photoDates.setItem(date, photoDates.getItem(date) + 1);
            } else if (reason == "usunięcie komentarza") {
                if (commentDates.getItem(date) == undefined) commentDates.setItem(date, 0);
                commentDates.setItem(date, commentDates.getItem(date) + 1);
            } else {
                // if(otherDates.getItem(date) == undefined) otherDates.setItem(date, 0);
                // otherDates.setItem(date, otherDates.getItem(date) + 1);
            }
        }

        banCounts["photo"] = photoDates.getLength();
        banCounts["comment"] = commentDates.getLength();
        // for(var i=0; i<otherDates.getLength(); i++) banCounts["other"] = otherDates.getLength();
    }

    var infoFrame2 = document.createElement("div");
    var pos1 = html.indexOf("Bany");
    if (pos1 > 0) {
        var pos2 = html.indexOf("<table", pos1);
        var pos3 = html.indexOf(">", pos2) + 1; // A
        var pos4 = html.indexOf("</table>", pos3) + "</table>".length; // B
        infoFrame2.innerHTML = html.substring(pos2, pos4);
        var czatDates = new AssocArray();
        var pwDates = new AssocArray();
        // var otherDates = new AssocArray();    
        var rows = infoFrame2.firstChild.firstChild.childNodes;
        for (var i = 1; i < rows.length; i++) {
            var date = rows[i].childNodes[0].innerHTML;
            var reason = rows[i].lastChild.firstChild.textContent.split(" ", 1).join();

            if (reason == "PW") {
                if (pwDates.getItem(date) == undefined) pwDates.setItem(date, 0);
                pwDates.setItem(date, pwDates.getItem(date) + 1);
            } else if (reason == "Czat") {
                if (czatDates.getItem(date) == undefined) czatDates.setItem(date, 0);
                czatDates.setItem(date, czatDates.getItem(date) + 1);
            } else {
                // if(otherDates.getItem(date) == undefined) otherDates.setItem(date, 0);
                // otherDates.setItem(date, otherDates.getItem(date) + 1);
            }
        }

        banCounts["pw"] = pwDates.getLength();
        banCounts["czat"] = czatDates.getLength();
        // for(var i=0; i<otherDates.getLength(); i++) banCounts["other"] = otherDates.getLength();
    }

    setInfoText(banCounts);

    var banInHours = calculateBanHours(banCounts["photo"]);
    var firstTime = true;
    var completed = false;
    u.action = function (type, data, js) {
        //console.log(firstTime + " " + banInHours + " " + data.powod + " " + type);
        if (firstTime && banInHours > 24 && data.powod != 14 && type == 'moderate_photos') {
            firstTime = false;
            if (confirm("Nadać bana na zdjęcia o sugerowanej długości " + banInHours / 24 + " dni?\nAnuluj, aby skorzsytać z domyślnego zachowanie systemu")) {
                setTimeout(function () {
                    //action_orig(type, data, js);
                    //alert("ban z automatu");

                    GM_xmlhttpRequest({
                        method: "POST",
                        url: "http://www.fotka.pl/ajax/info_operacje.php",
                        data: 'val=[' + u.id + ',5,"ban",' + banInHours + ']',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        onload: function (resp) {
                            //console.log(resp.responseText);
                            //setTimeout(function(){
                            completed = true;
                            action_orig(type, data); // poczekajmy jeszcze moment przed wysłanie zapytania dającego bana
                            //}, 3000);
                            //alert("ban z palca");
                        }
                    });
                }, 0);
                //console.log('val=['+u.id+',5,"ban",'+banInHours+']');
            } else {
                action_orig(type, data, js);
            }
        } else {
            action_orig(type, data, js);
        }
    }
    //console.log(JSON.stringify(banCounts));
}
GM_xmlhttpRequest({
    method: "GET",
    url: "http://www.fotka.pl/out/users_info.php?user_id=" + u.id,
    onload: function (resp) {
        processResponse(resp.responseText)
    }
});