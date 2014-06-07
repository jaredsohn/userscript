// ==UserScript==
// @name       Linkbucks Blocker
// @namespace  http://www.ydkfblog.com/
// @version    0.7
// @description  Block Linkbucks ads
// @match      http://www.yyv.co/*
// @match	http://www.allanalpass.com/*
// @copyright  2012+, NightCoffee
// @run-at document-end
// ==/UserScript==


(function(){
    var Token;
    var AuthKey;
    var tags = document.getElementsByTagName("script");
    for(var tag in tags){
        var inner = tags[tag]["innerHTML"];
        if(typeof(inner) === "string" && inner.indexOf("Token") > 0) 
        {
            inner = "window.initLbjs = function (authKey, params) { if (typeof(authKey) !== 'string') {return;} Token = params.Token; AuthKey = params.AuthKey;};" + inner;
            eval(inner);
        }
    }
    window.stop();
    document.body.innerHTML = '<h3 id="countdown" href="about:blank"></a>';
    var x = document.createElement('script');
    x.type = 'text/javascript';
    x.innerHTML = 'onbeforeunload = function() {};';
    document.body.appendChild(x);
    var countlab = document.getElementById("countdown");
    var CountTime = 5;
    if (!window.JSON) {
        window.JSON = {
            parse: function (sJson) { return eval("(" + sJson + ")"); }
        };
    }
    var browser = function () {
        var n = navigator.userAgent.toLowerCase();
        var b = {
            webkit: /webkit/.test(n),
            mozilla: (/mozilla/.test(n)) && (!/(compatible|webkit)/.test(n)),
            chrome: /chrome/.test(n),
            msie: (/msie/.test(n)) && (!/opera/.test(n)),
            firefox: /firefox/.test(n),
            safari: (/safari/.test(n) && !(/chrome/.test(n))),
            opera: /opera/.test(n)
        };
        b.version = (b.safari) ? (n.match(/.+(?:ri)[\/: ]([\d.]+)/) || [])[1] : (n.match(/.+(?:ox|me|ra|ie)[\/: ]([\d.]+)/) || [])[1];
        
        b.getXmlHttp = function() {
            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(E) {
                    xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
                xmlhttp = new XMLHttpRequest();
            }
            return xmlhttp;
        };
        
        return b;
    }();
    function Timer() {
        countlab.innerHTML = "Please wait..." + CountTime;
        
        if (--CountTime >= 0) {
            setTimeout(function() { Timer(); }, 1000);
        } else {
            //Load Real URL
            var request = browser.getXmlHttp();
            request.open('GET', '/intermission/loadTargetUrl?t=' + Token + '&ak=' + AuthKey, false);
            request.send(null);
            
            if (request.status === 200) {
                var response = JSON.parse(request.responseText);
                if (response.Success == true) {
                    if (response.AdBlockSpotted == true) {
                        countlab.innerHTML = "Sorry, Ad Block";
                    } else {
                        countlab.innerHTML = response.Url;
                        document.location = response.Url;
                    }
                } else if (typeof (response.Errors) !== "undefined" && response.Errors.length > 0) {
                    countlab.innerHTML = "Sorry, Error";
                }
                    }
        }
    }
    Timer();
})();