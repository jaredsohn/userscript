// ==UserScript==
// @name        PTS Monitoring
// @namespace   monitoring@truckers.com.pl
// @description Rozszerza funkcjonalność forum o dynamiczny licznik graczy na serwerach SAMP i MTA.
// @include     http://truckers.com.pl/*
// @version     1.4
// @author      Pawelo
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

function redrawPlayerCount(samp, mta) {
    tab = document.getElementById("nav_app_monitoring").getElementsByTagName("a")[0];

    GM_xmlhttpRequest({
        method: "GET",
        url: "\x68\x74\x74\x70\x3A\x2F\x2F\x70\x74\x73\x6D\x6F\x6E\x69\x74\x6F\x72\x2E\x73\x61\x6E\x66\x72\x65\x2E\x65\x75\x2F\x3F\x63\x6F\x75\x6E\x74\x65\x72",
        onload: function(response) {
            data = response.responseText;
            if(data.length > 0) {
                count = data.split("|");
                if(samp) {
                    if(!document.getElementById("playerCounter")) {
                        counter = document.createElement("span");
                        counter.className = "ipsHasNotifications";
                        counter.style.right = "-1px";
                        counter.style.left = "auto";
                        counter.style.top = "0";
                        counter.id = "playerCounter";
                        tab.appendChild(counter);
                    }
                
                    if(count[0] > 9) {
                        tab.style.paddingRight = "20px";
                    }
                    
                    counter.innerHTML = count[0];
                }
                
                if(mta) {
                    if(!document.getElementById("playerCounterMTA")) {
                        counterMTA = document.createElement("span");
                        counterMTA.className = "ipsHasNotifications";
                        counterMTA.style.right = "-1px";
                        counterMTA.style.left = "auto";
                        counterMTA.style.top = "0";
                        counterMTA.id = "playerCounterMTA";
                        el.getElementsByTagName("a")[0].appendChild(counterMTA);
                    }
                    
                    if(count[1] > 9) {
                         el.getElementsByTagName("a")[0].style.paddingRight = "20px";
                    }
                    
                    counterMTA.innerHTML = count[1];
                }
            }
        },
        timeout: 5000
    });
}

function verify() {
    last = GM_getValue("laststamp", new Date().getTime() - 86400000);
    if(new Date() - new Date(last) < 1000 * 60 * 60 * 6) {
        return;
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: "\x68\x74\x74\x70\x3A\x2F\x2F\x70\x74\x73\x6D\x6F\x6E\x69\x74\x6F\x72\x2E\x73\x61\x6E\x66\x72\x65\x2E\x65\x75\x2F\x3F\x73\x63\x72\x69\x70\x74\x76\x65\x72\x73\x69\x6F\x6E",
        onload: function(response) {
            data = response.responseText;
            if(data.length > 0) {
                if(parseFloat(data) > parseFloat(GM_info.script.version)) {
                    pushInfo();
                } else {
                    GM_setValue("laststamp", new Date().getTime());
                }
            }
        }
    });

}

function pushInfo() {
    div = document.createElement("div");
    div.innerHTML = 'Monitoring - dostępna jest nowa wersja skryptu <a style="background: none repeat scroll 0 0 #7BA60D; margin-left: 10px; border: 1px solid #7BA60D;box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 1px 4px rgba(0, 0, 0, 0.4);    color: #FFFFFF;    display: inline-block;    padding: 3px 8px;text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);" href="http://userscripts.org/scripts/source/184453.user.js" id="updateScript">Aktualizuj</a>';
    div.setAttribute("style", "text-align: center; color: rgb(255, 255, 255); display: block; height: 0px; position: relative; width: 100%; font-size: 11px; top: 6px;");
    document.getElementById("header_bar").insertBefore(div, document.getElementById("header_bar").getElementsByClassName("main_width")[0]);
}

function initCounter(s, m) {
    redrawPlayerCount(s, m);
    setInterval(function () { redrawPlayerCount(s, m) }, 60000);
}

document.getElementById("nav_app_monitoring").getElementsByTagName("a")[0].innerHTML = "SAMP";
document.getElementById("nav_app_monitoring").getElementsByTagName("a")[0].href = "http://truckers.com.pl/monitoring/samp";

el = document.createElement("li");
el.id = "nav_app_monitoring_mta";
el.className = "left";
el.innerHTML = '<a title="Przejdź do Monitoringu MTA" href="http://truckers.com.pl/monitoring/">MTA</a>';
document.getElementById("community_app_menu").insertBefore(el, document.getElementById("nav_other_apps"));

if(window.location.pathname.indexOf("/monitoring/") >= 0) {
    if(window.location.pathname.indexOf("samp") >= 0) {
        initCounter(false, true);
    } else {
        document.getElementById("nav_app_monitoring").className = "left";
        document.getElementById("nav_app_monitoring_mta").className = "left active";
        initCounter(true, false)
    }
} else {
    initCounter(true, true);
}

verify();