// ==UserScript==
// @name           LeBonCoin Add-on
// @namespace      leboncoin
// @version        1.5.2
// @include        http://www.leboncoin.fr/*
// @include        http://www*.leboncoin.fr/*
// @include        http://mobile.leboncoin.fr/*
// @run-at         document-start
// ==/UserScript==

(function () {

var version = "1.5.2";

var debug = false;

var baselink = 'http://alerte-leboncoin.ilatumi.org';
var isOpera = false;
var isMobile = -1 != document.location.href.indexOf("mobile.leboncoin.fr");
var options = {
    timer: 0
};

try {
    if (!console || !console.log) {
        if (unsafeWindow && unsafeWindow.console) {
            var console = {};
            console.log = unsafeWindow.console.log;
        } 
    }
    if (!unsafeWindow) {
        unsafeWindow = window;
    }
} catch (e) {}

if (GM_getValue == undefined && window.localStorage != undefined) {
    var GM_getValue = function (name) {
        if (name in options) {
            var v = window.localStorage.getItem(name);
            if (v != null) {
                return v;
            }
            return options[name];
        }
        return null;
    };
}
if (GM_setValue == undefined && window.localStorage != undefined) {
    var GM_setValue = function (name, value) {
        if (name in options) {
            return window.localStorage.setItem(name, value);
        }
    };
}

var saveOptions = function () {
    for (option in options) {
        GM_setValue(option, options[option]);
    }
};
var loadOptions = function () {
    for (option in options) {
        options[option] = GM_getValue(option);
    }
};
loadOptions();

var start = function() {
    isOpera = window.navigator.appName.match("Opera");
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML  = "<!-- ";
    style.innerHTML += "#hl { width: 690px !important; }";
    style.innerHTML += " #tabarea { position: relative; overflow: visible; }";
    //~ style.innerHTML += " .ilaToolsTd {width: 50px;}";
    style.innerHTML += " .ilaToolsDiv {width: 50px; padding: 40px 5px 5px 5px; overflow: visible;}";
    style.innerHTML += " ul#ilaTools { display: block !important; list-style: none; margin: 0; padding: 0; }";
    style.innerHTML += " ul#ilaTools li {float: left; background: #F0F0F0; margin: 5px 10px 0 0; padding: 2px; border: 1px solid #AAA; }";
    style.innerHTML += " ul#ilaTools img {display: block;margin: 0 auto;}";
    style.innerHTML += " .ilaToolsDiv ul#ilaTools {width: auto;margin: 0;}";
    style.innerHTML += " .ilaToolsDiv ul#ilaTools li {display: inline-block;margin-right: 10px;}";
    style.innerHTML += " #ilaConfig { display: none; position: absolute; background: #F5F5F5; border: 5px solid #999999; padding: 5px 10px; top: 0; left: 0;";
    style.innerHTML += " #noResultFound {width: auto;}";
    style.innerHTML += " #noResultFound ul#ilaTools {width: auto;}";
    style.innerHTML += " #noResultFound #ilaConfig {position: static;left: auto;}";
    /* Version mobile */
    style.innerHTML += " #list_mobile div.ilaToolsDiv {width: auto;padding: 0;}";
    style.innerHTML += " #list_mobile ul#ilaTools {width: auto;}";
    style.innerHTML += " #list_mobile #ilaConfig {position: static;left: auto;}";
    style.innerHTML += " -->";
    document.head.appendChild(style);
    
    addGoogleMap();
    displayMenu();

    // page annonce
    if (document.location.href.match(/.*\/[0-9]+\.htm.*/gi)) {
        replacePhoneNumber();
    }
};

window.addEventListener("load", function (e) {
    initBackupSystem();
}, false);

/**
 * Transforme le numéro de téléphone en texte
 */
var getPixel = function(image_data, x, y) {
    var idx = (y * 4 * image_data.width) + x*4;
    return [image_data.data[idx], image_data.data[idx+1],
        image_data.data[idx+2], image_data.data[idx+3]];
};
var decodePhoneNumber = {
    split: function (img)
    {
        var canvas, ctx, imageData;
        canvas = document.createElement("canvas");
        canvas.setAttribute("width", img.width);
        canvas.setAttribute("height", img.height);
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var image_data = ctx.getImageData(0, 0, img.width, img.height);

        var canvasImg, ctxImg, imgSplited;
        var imgs = [];
        var i, j, str;
        var start = 0;
        for (i = 0; i < image_data.width; i++) {
            if (image_data.data[i*4] == 0) {
                for (j = 1; j < image_data.height; j++) {
                    if (image_data.data[(j * 4 * image_data.width) + i*4]  != 0) {
                        break;
                    }
                }
                if (j == canvas.height || (i-start) == 7) {
                    if ((i-start) > 1) {
                        canvasImg = document.createElement("canvas");
                        canvasImg.setAttribute("width", 15);
                        canvasImg.setAttribute("height", 15);
                        ctxImg = canvasImg.getContext('2d');
                        ctxImg.drawImage(img, start, 0, i-start, image_data.height, 0, 0, i-start, image_data.height);
                        imgs.push(ctxImg.getImageData(0, 0, canvasImg.width, canvasImg.height));
                    }
                    start = i+1;
                }
            }
        }
        return imgs;
    },

    decode: function (img)
    {
        var canvas, ctx, imageData;
        var debugCanvas, debugCtx;
        var number, numbers = [];
        var img, imgs = decodePhoneNumber.split(img);
        for (var i = 0; i < imgs.length; i++) {
            img = imgs[i];
            imageData = imgs[i];
            number = decodePhoneNumber.getNumber(imageData);
            if (number != undefined) {
                numbers.push(number);
            }
        }
        return numbers;
    },

    getNumber: function(image_data) {
        var i, j;
        var idx = 34;
        var test = 0;
        for (i = 3; i < 5; i++) {
            for (j = 2; j < 7; j++) {
                if (getPixel(image_data, i, j)[3] == 0) {
                    test++;
                }
            }
        }
        if (test == 10) { // 0 1
            if (getPixel(image_data, 0, 0)[3] == 0) {
                return 0;
            }
            return 1;
        }

        test = 0;
        for (j = 0; j < image_data.height; j++) {
            if (getPixel(image_data, 5, j)[3] != 0) {
                test++;
            }
        }
        if (test == 9) { // 3 4 8 9
            if (getPixel(image_data, 1, 0)[3] != 0) {
                if (getPixel(image_data, 0, 2)[3] == 0) {
                    return 3;
                }
                if (getPixel(image_data, 1, 6)[3] == 0) {
                    return 9;
                }
                if (getPixel(image_data, 0, 0)[3] == 0) {
                    return 8;
                }
            }
            return 4;
            return 3;
        }

        if (getPixel(image_data, 0, 0)[3] != 0 && getPixel(image_data, 0, 8)[3] != 0) { // 2 5 7
            if (getPixel(image_data, 0, 2)[3] == 0 && getPixel(image_data, 0, 1)[3] != 0) {
                return 2;
            }
            if (getPixel(image_data, 5, 8)[3] == 0) {
                return 7;
            }
            return 5;
        }

        if (getPixel(image_data, 0, 0)[3] == 0 && getPixel(image_data, 6, 8)[3] != 0) { // 6
            return 6;
        }

        return undefined;
    }
};
var replacePhoneNumber = function () {
    var element = document.querySelector("#phoneNumber a");
    unsafeWindow.getPhoneNumber_cb = function (a) {
        if (a == "") {
            return;
        }
        if (typeof a != "object") {
            j = JSON.parse(a);
        } else {
            j = a;
        }
        if (!j.error && j.phoneUrl) {
            var element = document.createElement("img");
            element.className = "AdPhonenum";
            element.onload = replaceImage;
            element.src = j.phoneUrl;
            document.getElementById("phoneNumber").innerHTML = "";
            document.getElementById("phoneNumber").appendChild(element);
        }
    };
    if (element) {
        document.location.href = element.href;
        var replaceImage = function () {
            var numbers = decodePhoneNumber.decode(document.querySelector("#phoneNumber img"));
            var a = document.createElement("a");
            a.href = "tel:"+numbers.join("");
            a.innerHTML = numbers.join("");
            document.getElementById("phoneNumber").appendChild(a);
        };
    }
};

/**
 * Ouvre une nouvelle fenètre Google Map
 */
var gotoGoogleMap = function(event) {
    event.preventDefault();
    var address;
    try {
        if (window.localStorage.getItem('addressValue')) {
            address = window.localStorage.getItem('addressValue');
        }
    } catch (e) {}

    if (!address) {
        alert('Aucune adresse de départ spéciée.');
        return;
    }
    
    window.open('http://maps.google.fr/maps?daddr=' +this.title+'&saddr='+address);
};

/**
 * Ajout un lien sur les localisations avec image pour itinéraire.
 */
var addGoogleMap = function () {
    var placements = document.querySelectorAll(".list-ads .ad-lbc .placement");
    if (placements.length > 0) {
        for (var i = 0; i < placements.length; i++) {
            var text = placements[i].textContent.replace(/\s+/g, " ");
            var link = document.createElement('a');
            link.href = "http://maps.google.fr/?z=9&q=" + text.replace(" / ", " ");
            link.target = "_blank";
            link.title = "Localiser « "+text+" » sur Google Map";
            link.innerHTML = text;

            var linkIti = document.createElement('a');
            linkIti.href = '#';
            linkIti.title = text;
            var imgIti = document.createElement('img');
            imgIti.setAttribute('src', baselink+'/images/icons/28x28/map.png');
            imgIti.setAttribute('alt', 'Itinéraire');
            imgIti.setAttribute('style', 'margin-left: 5px; vertical-align: middle;');
            linkIti.appendChild(imgIti);

            placements[i].innerHTML = "";
            placements[i].appendChild(link);
            placements[i].appendChild(linkIti);
            linkIti.addEventListener('click', gotoGoogleMap, false);
        }
        return;
    }

    // on va voir si on est sur une page d'une annonce
    var labels = document.querySelectorAll(".lbcParams th");
    if (labels.length > 0) {
        for (var j = 0; j < labels.length; j++) {
            var text = labels[j].textContent;
            if (!text.match(/Ville|Code postal/)) {
                continue;
            }
            var el = labels[j].parentNode.querySelector("td");
            text = el.textContent;
            link = document.createElement("a");
            link.href = "http://maps.google.fr/?z=9&q=" + text.trim();
            link.target = "_blank";
            link.title = "Localiser « "+text+" » sur Google Map";
            link.innerHTML = text;

            linkIti = document.createElement("a");
            linkIti.href = "#";
            linkIti.title = text.trim();
            imgIti = document.createElement("img");
            imgIti.setAttribute("src", baselink+"/images/icons/20x20/map.png");
            imgIti.setAttribute("alt", "Itinéraire");
            imgIti.setAttribute("style", "margin-left: 5px; vertical-align: middle;");
            linkIti.appendChild(imgIti);

            el.innerHTML = "";
            el.appendChild(link);
            el.appendChild(linkIti);
            linkIti.addEventListener("click", gotoGoogleMap, false);
        }
    }
};



var displayMenu = function () {
    var container = document.getElementById("search_form");
    if (!container) {
        container = document.querySelector(".mobile_search_form");
        if (!container) {
            return;
        }
    }

    var li;
    var ul = document.createElement("ul");
    ul.setAttribute("id", "ilaTools");
    ul.style.display = "none";
    
    // Config
    var elConfig = document.createElement('a');
    elConfig.setAttribute('href', "#");
    elConfig.setAttribute('title', 'Configurer les préférences du script.');
    var configImage = document.createElement('img');
    configImage.setAttribute('src', baselink + '/images/greasemonkey.png');
    configImage.setAttribute('alt', 'Config');
    elConfig.appendChild(configImage);
    li = document.createElement('li');
    li.appendChild(elConfig);
    ul.appendChild(li);
    
    // Flux RSS
    var elLink = document.createElement('a');
    elLink.setAttribute('href', baselink + '/feed/creer?link=' + Base64.encode(document.location.href));
    elLink.setAttribute('target', '_blank');
    elLink.setAttribute('title', 'Générer un flux RSS à partir de cette recherche.');
    var rssImage = document.createElement('img');
    rssImage.setAttribute('src', baselink + '/images/rss.png');
    rssImage.setAttribute('alt', 'RSS');
    elLink.appendChild(rssImage);
    li = document.createElement('li');
    li.appendChild(elLink);
    ul.appendChild(li);
    
    // Alert Mail
    var elLinkAlertMail = document.createElement('a');
    elLinkAlertMail.setAttribute('href', baselink + '/api/compte/mes-alertes?prelink=' + encodeURIComponent(document.location.href));
    elLinkAlertMail.setAttribute('target', '_blank');
    elLinkAlertMail.setAttribute('title', 'Créer une alerte mail à partir de cette recherche.');
    var alertMailImage = document.createElement('img');
    alertMailImage.setAttribute('src', baselink + '/images/alert-mail.png');
    alertMailImage.setAttribute('alt', 'Alert Mail');
    elLinkAlertMail.appendChild(alertMailImage);
    li = document.createElement('li');
    li.appendChild(elLinkAlertMail);
    ul.appendChild(li);
    
    // Export CSV
    var elLinkCsv = document.createElement('a');
    elLinkCsv.setAttribute('href', baselink + '/api/csv/export?link=' + Base64.encode(document.location.href));
    elLinkCsv.setAttribute('target', '_blank');
    elLinkCsv.setAttribute('title', 'Exporter la liste des annonces sur cette page dans un fichier CSV.');
    var csvImage = document.createElement('img');
    csvImage.setAttribute('src', baselink + '/images/csv.png');
    csvImage.setAttribute('alt', 'Export CSV');
    elLinkCsv.appendChild(csvImage);
    li = document.createElement('li');
    li.appendChild(elLinkCsv);
    ul.appendChild(li);
    container.appendChild(ul);

    var update = document.createElement("div");
    update.style.clear = "both";
    var url = isOpera?"http://ilatumi.org/LeBonCoin_Add-on.oex":"http://userscripts.org/scripts/source/101151.user.js";
    update.innerHTML = '<a href="'+url+'"><img src="http://ilatumi.org/LeBonCoin_Add-on/version.php?v='+version+
        '" alt="Test de version en cours …" style="vertical-align: middle;" /></a>';
    container.appendChild(update);
    
    var divConfig = document.createElement("div");
    divConfig.setAttribute('id', 'ilaConfig');
    container.appendChild(divConfig);
    var form = document.createElement("form");
    form.setAttribute("id", "ilaConfigForm");
    form.setAttribute("action", "");
    form.setAttribute("method", "post");
    form.innerHTML = '<h2>Configuration de vos préférences.</h2>\
        <fieldset>\
            <legend>Itinéraire Google Map.</legend>\
            <p>Pour utiliser la fonction d\'itinéraire, vous devez configurer\
                une adresse de départ.</p>\
            <p>\
                <label for="adress-iti">\
                    Spécifiez votre adresse :\
                    <textarea id="adress-iti" cols="30" rows="4"></textarea>\
                </label>\
            </p>\
        </fieldset>\
        <p>\
            <input type="submit" value="Sauvegarder" />\
            <input id="ilaConfigClose" type="button" value="Fermer" />\
        </p>';
    divConfig.appendChild(form);
    if (window.localStorage.getItem('addressValue')) {
        document.getElementById("adress-iti").value = window.localStorage.getItem('addressValue');
    }
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        window.localStorage.setItem('addressValue', document.getElementById("adress-iti").value.replace("\n", " "));
        divConfig.style.display = "none";
    }, false);
    document.getElementById("ilaConfigClose").addEventListener("click", function (e) {
        e.preventDefault();
        divConfig.style.display = "none";
    }, false);
    elConfig.addEventListener("click", function (e) {
        e.preventDefault();
        divConfig.style.display = "block";
    }, false);
}




/**
 * Sauvegarde des informations entrées dans les champs
 * de création d'annonce
 */
var fields = [
    "region", "dpt_code", "zipcode", "category",
    "private_ad_id", "company_ad_id", "rs", "rk",
    "name", "phone", "phone_hidden", "body", "subject",
    "price", "real_estate_type", "energy_rate", "ges",
    "square", "rooms", "capacity", "regdate", "fuel",
    "mileage", "gearbox", "cubic_capacity", "clothing_type",
    "tattooed_animal", "tattooed_animal", "vaccinated_animal",
    "animal_chips", "siren", "body"
];
var saveDatas = function () {
    items = {};
    var el, type, tag;
    for (var i = 0; i < fields.length; i++) {
        el = document.getElementById(fields[i]);
        if (!el) {
            el = document.querySelector("*[name="+fields[i]+"]");
            if (!el) {
                console.log(fields[i]);
                continue;
            }
        }
        tag = el.tagName.toLowerCase();
        type = el.type;
        if (tag == "select" || type == "text") {
            items[fields[i]] = el.value;
        } else if (type == "radio" || type == "checkbox") {
            items[fields[i]] = el.checked;
        }
    }
    window.localStorage.setItem('form-datas', JSON.stringify(items));
};
var loadDatas = function () {
    var el, type, tag;
    try {
        items = window.localStorage.getItem("form-datas");
    } catch (e) {}
    items = JSON.parse(items);
    if (!items) {
        items = {};
    }
    for (var i = 0; i < fields.length; i++) {
        if (undefined == items[fields[i]]) {
            continue;
        }
        el = document.getElementById(fields[i]);
        if (!el) {
            el = document.querySelector("*[name="+fields[i]+"]");
            if (!el) {
                continue;
            }
        }
        tag = el.tagName.toLowerCase();
        type = el.type;
        if (tag == "select" || type == "text") {
            el.value = items[fields[i]];
            if (el.onchange) {
                el.onchange();
            }
            if (el.onclick) {
                el.onclick();
            }
        } else if (type == "radio" || type == "checkbox") {
            el.checked = items[fields[i]];
            if (el.onchange) {
                el.onchange();
            }
            if (el.onclick) {
                el.onclick();
            }
        }
    }
};
var initBackupSystem = function () {
    var validateInput = document.querySelector("input[name=validate]");
    if (!validateInput) {
        return;
    }
    loadDatas();
    
    /**
     * Efface la sauvegarde
     */
    var resetDatas = function (event) {
        window.localStorage.removeItem('form-datas');
        alert('Données effacées du cache');
    };
    
    var buttonSave = document.createElement('input');
    buttonSave.setAttribute('type', 'button');
    buttonSave.setAttribute('value', 'Sauvegarder (*)');
    buttonSave.setAttribute('style', 'margin-left: 50px;');
    validateInput.parentNode.appendChild(buttonSave);
    buttonSave.addEventListener('click', saveDatas, false);
    
    var buttonReset = document.createElement('input');
    buttonReset.setAttribute('type', 'button');
    buttonReset.setAttribute('value', 'Effacer la sauvegarde');
    validateInput.parentNode.appendChild(buttonReset);
    buttonReset.addEventListener('click', resetDatas, false);
    
    var helpBackup = document.createElement('p');
    helpBackup.innerHTML = '* sauvegarde dans le navigateur les données du formulaire. Ces données seront restaurées au prochain chargement de la page, même après redémarrage du navigateur.<br />' +
        '<strong>si vous êtes sur un ordinateur public, n\'utilisez pas cette fonction.</strong>';
    validateInput.parentNode.appendChild(helpBackup);
};



/**
 * Functions
 */


/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = {
 
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
 
        input = Base64._utf8_encode(input);
 
        while (i < input.length) {
 
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
 
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
 
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
 
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
        }
 
        return output;
    },
 
    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
 
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
        while (i < input.length) {
 
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
 
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
 
            output = output + String.fromCharCode(chr1);
 
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
 
        }
 
        output = Base64._utf8_decode(output);
 
        return output;
 
    },
 
    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;
    },
 
    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
 
        while ( i < utftext.length ) {
 
            c = utftext.charCodeAt(i);
 
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
 
        }
 
        return string;
    }
 
}



// run
document.addEventListener("DOMContentLoaded", start, false);

})();