// ==UserScript==
// @name        SWLE AutoClicker
// @namespace   SWLE
// @include     http://swle.yarold.eu/main.php
// @include     http://swle.yarold.eu/dynasty_ex.php
// @include     http://swle.yarold.eu/history.php
// @include     http://swle.yarold.eu/history.php#*
// @version     1
// @grant       none
// ==/UserScript==
window.timeoutCounter = 10;
window.timeoutCounter2 = 1200;
window.checkFin = function() {
    if(window.currentCount == 0) {
        window.mainResult.innerHTML = "Reload in " + (window.timeoutCounter / 10) + ".0 Sekunden";
        window.resetIt = setInterval(function() {
            if(window.timeoutCounter == 0) {
                clearInterval(window.resetIt);
                window.history.go(0);
            }else{
                window.timeoutCounter -= 1;
            }
            if(window.timeoutCounter / 10 == Math.floor(window.timeoutCounter / 10)) {
                window.mainResult.innerHTML = "Reload in " + (window.timeoutCounter / 10) + ".0 Sekunden";
            }else{
                window.mainResult.innerHTML = "Reload in " + (window.timeoutCounter / 10) + " Sekunden";
            }
        },100);
    }
}
window.ReloadAfter = function() {
        window.mainResult.innerHTML = "Reload in " + (window.timeoutCounter2 / 10) + ".0 Sekunden";
        window.resetIt = setInterval(function() {
            if(window.timeoutCounter2 == 0) {
                clearInterval(window.resetIt);
                window.history.go(0);
            }else{
                window.timeoutCounter2 -= 1;
            }
            if(window.timeoutCounter2 / 10 == Math.floor(window.timeoutCounter2 / 10)) {
                window.mainResult.innerHTML = "Reload in " + (window.timeoutCounter2 / 10) + ".0 Sekunden";
            }else{
                window.mainResult.innerHTML = "Reload in " + (window.timeoutCounter2 / 10) + " Sekunden";
            }
        },100);
}
window.onload = function() {
    window.mainResult = document.createElement("div");
    window.mainResult.style.position = "absolute";
    window.mainResult.style.top = "80px";
    window.mainResult.style.left = "30px";
    window.currentCount = 0;
    window.mainResult.innerHTML = window.currentCount;
    window.document.body.appendChild(window.mainResult);
    var links = document.getElementsByTagName("a");
    var ev = function(elm) {
        var self = this;
        this.elm = elm;
        this.target_url = this.elm.href;
        this.elm.href = "javascript:void(0)";
        this.elm.target = "";
        this.elm.onclick = function() {
            if(self.elm.href.indexOf("Loading") == 0) {
                alert("Lädt gerade");
            }else if(self.elm.getAttribute("tag").trim() == "") {
                self.initialize();
            }
        }
        this.initialize = function() {
            self.elm.innerHTML = "Loading";
            self.elm.style.color = "red";
            self.elm.style.fontWeight = "bold";
            self.elm.style.fontSize = "12px";
            self.elm.style.fontFamily = "Arial";
            self.http = null;
            if (window.XMLHttpRequest) {
                self.http = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                self.http = new ActiveXObject("Microsoft.XMLHTTP");
            }
            if (self.http != null) {
                window.currentCount -= -1;
                window.mainResult.innerHTML = "Offene Klicks: " + window.currentCount;
                self.http.open("GET", self.target_url, true);
                self.http.onreadystatechange = self.finished;
                self.http.send();
            }
        }
        this.finished = function() {
            if(self.http.readyState == 4) {
                self.elm.innerHTML = "DONE";
                self.elm.tag = "DONE";
                self.elm.style.color = "green";
                window.currentCount -= 1;
                window.mainResult.innerHTML = "Offene Klicks: " + window.currentCount;
                window.checkFin();
            }
        }
        this.initialize();
    }
    for(var t in links) {
        var i = links[t];
        if(typeof i.href != "undefined" && i.href.indexOf("click.php?") > -1) {
            var t = new ev(i);
        }
    }
    if(window.currentCount == 0) {
        window.ReloadAfter()
    }
}