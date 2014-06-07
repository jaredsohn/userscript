// ==UserScript==
// @name           FreeMobile TinyAuth
// @namespace      freemobile
// @description    Retour à l'ancien mode d'identification sur FreeMobile.
// @include        https://mobile.free.fr/*
// @updateURL      http://ilatumi.org/126488.meta.js
// @version        2.7
// @grant          none
// @run-at         document-start
// ==/UserScript==
(function () {

var version = 2.7;

var debug = false;
var imgs = [];
var isOpera = false;

var options = {
    timer: 0,
    timerSubmit : 2000
}
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

var convert_color = function (image_data) {
    for (var x = 0; x < image_data.width; x++) {
        for (var y = 0; y < image_data.height; y++) {
            var i = x*4+y*4*image_data.width;
            var luma = Math.floor(image_data.data[i] * 299/1000 +
            image_data.data[i+1] * 587/1000 +
            image_data.data[i+2] * 114/1000);

            image_data.data[i] = luma;
            image_data.data[i+1] = luma;
            image_data.data[i+2] = luma;
            image_data.data[i+3] = 255;
            if (image_data.data[i] > 200 || image_data.data[i+3] == 0) {
                image_data.data[i] = 255;
                image_data.data[i+1] = 255;
                image_data.data[i+2] = 255;
                image_data.data[i+3] = 0;
            }
        }
    }
};

if (debug) {
    var testDecode = function () {
        console.log("Start test ...");
        var canvas, ctx, imageData;
        var debugCanvas, debugCtx;
        var number, numbers = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
        var debugCanvas = document.createElement("canvas");
        debugCanvas.setAttribute("width", 10*10);
        debugCanvas.setAttribute("height", 16);
        form.appendChild(debugCanvas);
        var debugCtx = debugCanvas.getContext('2d');
        canvas = document.createElement("canvas");
        canvas.setAttribute("width", 10);
        canvas.setAttribute("height", 16);
        ctx = canvas.getContext('2d');
        for (var i = 0; i < 10; i++) {
            var img = imgs[i];
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(0,0,10,16);
            ctx.drawImage(img, 14, 12, 10, 16, 0, 0, 10, 16);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            number = get_numberV2(imageData);
            console.log(number, imageData);
            ctx.putImageData(imageData, 0, 0);
            debugCtx.drawImage(canvas, 0, 0, 10, 16, 10*i, 0, 10, 16);
        }
        console.log("Done.");
    };
}

var get_numberV1 = function(image_data) {
    convert_color(image_data);
    var idx = 34;
    var test = 0;
    for (var i = 0; i < 10; i++) {
        if (image_data.data[(idx+i*10)*4+3] > 0) {
            break;
        }
    }
    if (i == 10) { // 0
        return 0;
    }
    var idx = 6;
    for (var i = 0; i < 15; i++) {
        if (image_data.data[(idx+i*10)*4+3] == 0) {
            break;
        }
    }
    if (i == 15) { // 1 3 4 8 9
        idx = 103; // 4
        if (image_data.data[idx*4+3] > 0 && image_data.data[(idx+2)*4+3] > 0) {
            return 4;
        }
        idx = 34; // 1
        if (image_data.data[idx*4+3] > 0) {
            return 1;
        }
        idx = 102; // 9
        if (image_data.data[idx*4+3] == 0 && image_data.data[(idx+1)*4+3] == 0) {
            return 9;
        }
        idx = 92; // 3
        if (image_data.data[idx*4+3] == 0) {
            return 3;
        }
        return 8;
    }
    if (image_data.data[72*4+3] > 0 && image_data.data[92*4+3] == 0) { // 5
        return 5;
    }
    if (image_data.data[88*4+3] > 0) { // 6
        return 6;
    }
    if (image_data.data[42*4+3] > 0) {
        return 2;
    }
    return 7;
};

var get_numberV2 = function(image_data) {
    convert_color(image_data);
    var idx = 34;
    var test = 0;
    for (var i = 0; i < 10; i++) {
        if (image_data.data[(idx+i*10)*4+3] > 0) {
            break;
        }
    }
    if (i == 10) { // 0
        return 0;
    }
    var idx = 6;
    for (var i = 0; i < 15; i++) {
        if (image_data.data[(idx+i*10)*4+3] == 0) {
            break;
        }
    }
    if (i == 15) { // 1 3 4
        idx = 103; // 4
        if (image_data.data[idx*4+3] > 0 && image_data.data[(idx+2)*4+3] > 0) {
            return 4;
        }
        idx = 34; // 1
        if (image_data.data[idx*4+3] > 0) {
            return 1;
        }
        idx = 92; // 3
        if (image_data.data[idx*4+3] == 0) {
            return 3;
        }
    }
    if (image_data.data[72*4+3] > 0 && image_data.data[92*4+3] == 0) { // 5
        return 5;
    }
    if (image_data.data[88*4+3] > 0) { // 6 8 9
        if (image_data.data[61*4+3] == 0) {
            return 8;
        }
        if (image_data.data[101*4+3] == 0) {
            return 9;
        }
        return 6;
    }
    if (image_data.data[42*4+3] > 0) {
        return 2;
    }
    return 7;
};

var decodeV1 = function () {
    if (debug) {
        console.log("Decodeur V1");
    }
    var canvas, ctx, imageData;
    var debugCanvas, debugCtx;
    var number, numbers = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    // start debug
    if (debug) {
        var debugCanvas = document.createElement("canvas");
        debugCanvas.setAttribute("width", 10*10);
        debugCanvas.setAttribute("height", 16);
        form.appendChild(debugCanvas);
        var debugCtx = debugCanvas.getContext('2d');
    }
    // end debug
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", 10);
    canvas.setAttribute("height", 16);
    ctx = canvas.getContext('2d');
    for (var i = 0; i < 10; i++) {
        var img = imgs[i];
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(0,0,10,16);
        ctx.drawImage(img, 14, 12, 10, 16, 0, 0, 10, 16);
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        number = get_numberV1(imageData);
        // start debug
        if (debug) {
            console.log(number);
            ctx.putImageData(imageData, 0, 0);
            debugCtx.drawImage(canvas, 0, 0, 10, 16, 10*i, 0, 10, 16);
        }
        // end debug
        if (number < 0 || number > 9 || numbers[number] != -1) {
            throw new Error("Décodage échoué.");
        }
        if (number != undefined) {
            numbers[number] = i;
        }
    }
    return numbers;
};

var decodeV2 = function () {
    if (debug) {
        console.log("Decodeur V2");
    }
    var canvas, ctx, imageData;
    var debugCanvas, debugCtx;
    var number, numbers = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    // start debug
    if (debug) {
        var debugCanvas = document.createElement("canvas");
        debugCanvas.setAttribute("width", 10*10);
        debugCanvas.setAttribute("height", 16);
        form.appendChild(debugCanvas);
        var debugCtx = debugCanvas.getContext('2d');
    }
    // end debug
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", 10);
    canvas.setAttribute("height", 16);
    ctx = canvas.getContext('2d');
    for (var i = 0; i < 10; i++) {
        var img = imgs[i];
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(0,0,10,16);
        ctx.drawImage(img, 14, 12, 10, 16, 0, 0, 10, 16);
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        number = get_numberV2(imageData);
        // start debug
        if (debug) {
            console.log(number);
            ctx.putImageData(imageData, 0, 0);
            debugCtx.drawImage(canvas, 0, 0, 10, 16, 10*i, 0, 10, 16);
        }
        // end debug
        else if (number < 0 || number > 9 || numbers[number] != -1) {
            throw new Error("Décodage échoué.");
        }
        if (number != undefined) {
            numbers[number] = i;
        }
    }
    return numbers;
};

var decodeSND = function () {
    if (debug) {
        console.log("Decodeur via le son");
    }
    var number, numbers = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    var map = {
        "17135": 0,
        "9825":  1,
        "15045": 2,
        "16299_3": 3,
        "16299_4": 4,
        "18807": 5,
        "18389": 6,
        "17971": 7,
        "16717": 8,
        "17553": 9
    };
    var soundManager = unsafeWindow.soundManager;
    if (undefined == soundManager) {
        throw new Error("Décodage échoué.");
    }
    for (var i = 0; i < 10; i++) {
        if (!soundManager.getSoundById("sound"+i)) {
            throw new Error("Décodage échoué.");
        }
        var bytes = soundManager.getSoundById("sound"+i).bytesTotal;
        if (bytes == 16299) {
            if (numbers[3] > -1) {
                number = 4;
            } else if (numbers[4] > -1) {
                number = 3;
            } else {
                canvas = document.createElement("canvas");
                canvas.setAttribute("width", 10);
                canvas.setAttribute("height", 16);
                ctx = canvas.getContext('2d');
                var img = imgs[i];
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.fillRect(0,0,10,16);
                ctx.drawImage(img, 14, 12, 10, 16, 0, 0, 10, 16);
                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                number = get_numberV2(imageData);
            }
        } else {
            number = map[bytes];
        }
        if (number < 0 || number > 9 || numbers[number] != -1) {
            throw new Error("Décodage échoué.");
        }
        if (debug) {
            console.log("Sound "+i+" => "+number);
        }
        numbers[number] = i;
    }
    return numbers;
};

var decode = function () {
    var numbers;
    var ok = false;
    try {
        numbers = decodeV2();
        ok = true;
    } catch (e) {}
    if (!ok) {
        try {
            numbers = decodeV1();
            ok = true;
        } catch (e) {}
    }
    if (!ok) {
        try {
            numbers = decodeSND();
            ok = true;
        } catch (e) {}
    }
    if (!ok) {
        throw new Error("Décodage échoué.");
    }
    return numbers;
};

var form;
var hiddePanel = function () {
    form.addEventListener("submit", sendForm, true);
    var els = form.querySelectorAll("*");
    for (var j = 1; j < els.length; j++) {
        if (form == els[j].parentNode || els[j].tagName == "SPAN") {
            els[j].oldDisplay = els[j].style.display;
            els[j].style.display = "none";
        }
    }
    var label = document.querySelector("#content>span");
    if (label) {
        label.style.display = "none";
    }
    var buttonsContainer = document.querySelector(".ident_chiffre2");
    if (buttonsContainer) {
        buttonsContainer.style.display = "none";
    }
    var submit = document.querySelectorAll("form button[type=submit]")[0];
    if (submit) {
        submit.parentNode.style.display = "block";
    }
};

var displayPanel = function () {
    form.removeEventListener("submit", sendForm, true);
    var els = form.querySelectorAll("*");
    for (var j = 1; j < els.length; j++) {
        if (form == els[j].parentNode || els[j].tagName == "SPAN") {
            els[j].style.display = "block";
        }
    }
    var label = document.querySelector("#content>span");
    if (label) {
        label.style.display = "block";
    }
    var buttonsContainer = document.querySelector(".ident_chiffre2");
    if (buttonsContainer) {
        buttonsContainer.style.display = "block";
    }
};

var count = 0;
var timerSubmit = function () {
    var realTimer = parseInt(options.timerSubmit) + 500;
    if (options.timer == 0) {
        document.getElementById("msgSubmit").innerHTML = "Connexion en cours (normalement) ...";
        return;
    }
    if (count >= realTimer) {
        count = 0;
        document.getElementById("msgSubmit").innerHTML = "Connexion en cours (normalement) ...";
        return;
    }
    count += 1000;
    if (count > realTimer) {
        count = realTimer;
    }
    document.getElementById("msgSubmit").innerHTML = "Connexion dans "+parseInt((realTimer - count) / 1000)+" secondes ...";
    setTimeout(timerSubmit, 1000);
};

var ready = 0;
var timerImagesSmall = function (numbers) {
    ready = 0;
    var id = document.getElementById("ident_login").value.split("");
    document.getElementById("msgSubmit").style.display = "block";
    timerSubmit();
    var fnReady = function () {
        ready += 1;
        if (ready == 9) {
            document.getElementById("msgSubmit").style.display = "block";
            form.submit();
        } else if (ready < 9) {
            if (options.timer == 1) {
                setTimeout(loadNext, 500);
            }
        }
    };
    var cursor = 0;
    var loadNext = function () {
        var img = document.createElement("img");
        img.onload = fnReady;
        img.src = "chiffre.php?pos="+numbers[id[cursor]]+"&small=1";
        img.style.visibility = "hidden";
        document.body.appendChild(img, document.getElementById("ident_login"));
        cursor++;
    };
    if (options.timer == 0) {
        for (var j = 0; j < 10; j++) {
            loadNext();
        }
    } else {
        loadNext();
    }
};

var sendForm = function (e) {
    if (debug || ready < 8) {
        e.preventDefault();
    }
    if (ready == 8) {
        return;
    }
    var newInput = document.getElementById("ident_login");
    var numbers;
    try {
        numbers = decode();
    } catch(e) {
        displayPanel();
        var span = document.createElement("span");
        span.innerHTML = 'Détection automatique impossible : <a href="http://userscripts.org/scripts/show/126488">surveillez les mises à jour</a>.';
        span.style.fontWeight = "bold";
        document.getElementById("ident_blocd").insertBefore(span,
            document.getElementById("ident_div_ident"));
        newInput.parentNode.removeChild(newInput);
        return;
    }
    var ident = "";
    var n, id = newInput.value.split("");
    
    for (var j = 0; j < id.length; j++) {
        n = parseInt(id[j]);
        if (n >= 0 && n <= 9) {
            ident += numbers[n];
        }
    }
    timerImagesSmall(numbers);
    newInput.setAttribute("name", "");
    document.getElementById("ident_pos").value = ident;
};

var drawScriptPanel = function () {
    isOpera = window.navigator.appName.match("Opera");
    // custom CSS
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML  = "<!-- ";
    style.innerHTML += " .tinyAuthContainer {position: absolute; top: 0; right: 20px; text-align: center; ";
    style.innerHTML += " padding: 5px 20px; background: #F5F5F5; border: 2px solid #DDDDDD; box-shadow: 0 0 5px #CCC; }";
    style.innerHTML += " .tinyAuthContainer a:link, .tinyAuthContainer a:hover, .tinyAuthContainer a:active, .tinyAuthContainer a:visited {";
    style.innerHTML += " color: #333333; font-weight: bold;}";
    style.innerHTML += " .tinyAuthContainer span.title { font-weight: bold; color: #EF0000; }";
    style.innerHTML += " .tinyAuthContainer div.infos input { background: #F0F0F0; border: 1px solid #E5E5E5; color: #333333; border-radius: 4px; font-size: 9px; cursor: pointer; }";
    style.innerHTML += " .tinyAuthContainer .options {text-align: left; ";
    style.innerHTML += " padding: 5px 20px; background: #FFFFFF; border: 2px solid #DDDDDD; display: none; }";
    style.innerHTML += " -->";
    document.head.appendChild(style);
    
    var url = isOpera?"http://ilatumi.org/FreeMobile_TinyAuth.oex":"http://userscripts.org/scripts/source/126488.user.js";
    var container = document.createElement("div");
    container.setAttribute("class", "tinyAuthContainer");
    var contentHTML = "";
    contentHTML += '<span class="title">TinyAuth '+version+'</span> : <a href="http://userscripts.org/scripts/show/126488">Home</a> | ';
    contentHTML += '<a href="'+url+'">';
    contentHTML += '<img src="http://ilatumi.org/tinyauth-freemobile/version.php?v='+version+'" alt="Test de version en cours …" style="vertical-align: middle;" /></a>';
    contentHTML += '<div class="infos">';
    contentHTML += '    <input type="button" value="Afficher le pavé numérique" id="togglePanel" />';
    contentHTML += '    <input type="button" value="+ options" id="tinyAuthtoggleOptions" />';
    contentHTML += '</div>';
    contentHTML += '<div class="options" id="tinyAuthOptionsContainer">';
    contentHTML += '<label><input type="checkbox" name="timer" id="tinyAuth-active-timer" value="1" class="clickclick" /> activer le temps d\'attente avant connexion</label>';
    contentHTML += '<p style="text-align: center; margin:0;"><input type="button" id="tinyAuth-closeoptions" value="OK" />';
    contentHTML += '</div>';
    container.innerHTML = contentHTML;
    var header = document.getElementById("header");
    if (!header) {
        header = document.head;
    } else {
        header.style.position = "relative";
    }
    document.getElementById("header").appendChild(container);
    document.getElementById("togglePanel").addEventListener("click", function () {
        if (form.querySelectorAll("span.red")[0].style.display == "none") {
            this.value = "Masquer le pavé numérique";
            displayPanel();
        } else {
            this.value = "Afficher le pavé numérique";
            hiddePanel();
        }
    }, false);
    var toggleOptions = function () {
        if (document.getElementById("tinyAuthOptionsContainer").style.display != "block") {
            document.getElementById("tinyAuthOptionsContainer").style.display = "block";
        } else {
            document.getElementById("tinyAuthOptionsContainer").style.display = "none";
        }
    };
    document.getElementById("tinyAuthtoggleOptions").addEventListener("click", toggleOptions, false);
    document.getElementById("tinyAuth-closeoptions").addEventListener("click", toggleOptions, false);
    var els = container.querySelectorAll(".clickclick");
    for (var i = 0; i < els.length; i++) {
        els[i].addEventListener("click", function (e) {
            var type = this.getAttribute("type");
            if (type == "checkbox") {
                options[this.getAttribute("name")] = this.checked?1:0;
            }
            saveOptions();
        }, false);
    }
    for (option in options) {
        var el = container.querySelectorAll("*[name="+option+"]");
        if (el.length) {
            var type = el[0].getAttribute("type");
            if (type == "checkbox") {
                el[0].checked = options[option] != 0?"checked":"";
            }
        }
    }
};
var start = function () {
    if (!document.getElementById("ident_pos")) {
        return;
    }
    //~ document.body.appendChild(customForm);
    drawScriptPanel();
    var forms = document.getElementsByTagName("form");
    if (forms.length > 0) {
        for (var k = 0; k < forms.length; k++) {
            var submit = forms[k].querySelectorAll("form button[type=submit]")[0];
            if (forms[k].style.display != "none" && submit && submit.style.display != "none") {
                form = forms[k];
            }
        }
    }
    var imgsEl = document.querySelectorAll(".ident_chiffre2 li img");
    for (var i = 0; i < imgsEl.length; i++) {
        var attr = imgsEl[i].getAttribute("onmouseover");
        if (attr && false != attr.indexOf("getVoiceStatus")) {
            imgs.push(imgsEl[i]);
        }
    }
    var identPos = document.getElementById("ident_pos");
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "ident_login");
    newInput.setAttribute("autocomplete", "On");
    newInput.setAttribute("name", "ident_login");
    identPos.parentNode.appendChild(newInput);
    var msgSubmit = document.createElement("p");
    msgSubmit.setAttribute("id", "msgSubmit");
    msgSubmit.style.display = "none";
    msgSubmit.style.fontWeight = "bold";
    msgSubmit.style.textAlign = "right";
    msgSubmit.style.clear = "both";
    form.appendChild(msgSubmit);
    hiddePanel();
};

if (typeof unsafeWindow != "undefined") {
    document.addEventListener ("readystatechange", function () {
        if (document.readyState == "interactive") {
            start();
        }
    }, true);
} else {
    document.addEventListener("DOMContentLoaded", start, false);
}

})();

