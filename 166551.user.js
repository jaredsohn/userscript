// ==UserScript==
// @name        Bear411 Search Enhancement
// @namespace   http://userscripts.org/users/parolles/
// @description Remembers your last search criteria for quicker searching.
// @include     http://www.bear411.com/*
// @version     2
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
if(window.location.search == "?searchon=1") {
    var fields = [ "scountry", "sstate", "scity", "sphonecode1",
        "sphonecode2", "sphonecode3", "sphonecode4", "snick",
        "semail", "smeeting", "sname", "skeyword", "ssex",
        "sagefrom", "sageto" ];
        
    var radios = [ "sbearorcub", "sloveorsex" ];

    function elem(e) {
        return document.getElementsByName(e)[0];
    }
    
    document.forms[0].onsubmit = function() {
        for(var f in fields) {
            GM_setValue(fields[f], elem(fields[f]).value);
        }
        
        for(var r in radios) {
            var eles = document.getElementsByName(radios[r]);
            for(var e in eles) {
                if(eles[e].checked) {
                    GM_setValue(radios[r], e);
                }
            }
        }
        
        GM_setValue("onlineonly", elem("onlineonly").checked);
    };
    
    for(var f in fields) {
        var v = GM_getValue(fields[f]);
        if(v) {
            elem(fields[f]).value = v;
        }
    }
    
    for(var r in radios) {
        var e = GM_getValue(radios[r]);
        if(e != undefined) {
            document.getElementsByName(radios[r])[e].checked = true;
        }
    }
        
    if(GM_getValue("onlineonly")) {
        elem("onlineonly").checked = true;
    }
}