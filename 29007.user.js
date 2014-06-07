// ==UserScript==
// @name        YourTwitterClient
// @namespace   http:/yatil.de/userscripts
// @description Builds an 
// @include     https://twitter.com/home
// @author      Eric Eggert http://yatil.de
// ==/UserScript==      



/* === GETELEMENTSBYCLASSNAME ===
   Developed by Robert Nyman, http://www.robertnyman.com
   Code/licensing: http://code.google.com/p/getelementsbyclassname/
   ============================== */


var getElementsByClassName = function(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function(className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
            nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
            returnElements = [],
            current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = "",
            xhtmlNamespace = "http://www.w3.org/1999/xhtml",
            namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace: null,
            returnElements = [],
            elements,
            node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch(e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = [],
            elements = (tag === "*" && elm.all) ? elm.all: elm.getElementsByTagName(tag),
            current,
            returnElements = [],
            match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};

/* === //GETELEMENTSBYCLASSNAME === */

   

/* === GETCOOKIE, SETCOOKIE and DELETECOOKIE ===
   Wanted to use GM_setValue and GM_getValue but both didn’t work with
   GreaseKit. So I had to use cookies which fortunately worked.
   Those tree functions were found at dustindiaz.com:
   http://www.dustindiaz.com/top-ten-javascript/
   ============================== */

function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(';', len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + '=' + escape(value) +
    ((expires) ? ';expires=' + expires_date.toGMTString() : '') +
    //expires.toGMTString()
    ((path) ? ';path=' + path: '') +
    ((domain) ? ';domain=' + domain: '') +
    ((secure) ? ';secure': '');
}

function deleteCookie(name, path, domain) {
    if (getCookie(name)) document.cookie = name + '=' +
    ((path) ? ';path=' + path: '') +
    ((domain) ? ';domain=' + domain: '') +
    ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}


 (function() {
    if (window.fluid) {

        lastone = getCookie("lastid");


        if (lastone == null) {
            lastone = 0;
        }

       	thisuser = document.getElementById("side_base").getElementsByTagName('a')[0].getAttribute("href").replace('https://twitter.com/', '');                                                     

        var tmpElm = document.createElement("style");
        tmpElm.setAttribute("type", "text/css");
        tmpElm.appendChild(document.createTextNode('#navigation,#footer,#side_base, .bar,.yellow-box,.tabMenu{display:none !important;}#container,#content{width:100% !important;margin:0 !important;padding:0 !important;}#doingForm,fieldset,.info{width:100% !important;margin:0 !important;padding:0 !important;ovverflow:hidden !important;}#status{width:85% !important;font-size:12px !important;line-height:1.5 !important;}.content{font-size:12px !important;line-height:1.5 !important;}.vcard,.vcard img{width:30px !important;}td{vertical-align:top !important;text-align:right !important;}td.content .entry-content,td.content strong{display:block !important;text-align:left !important;margin-left:.8em !important;}td.content img{float:left !important;margin-top:-1.4em !important;}.bar h3{font-size:14px !important;}strong#status-field-char-counter{position:absolute !important;top:0 !important;right:.5em !important;font-size:20px !important;}#logo img {width:105px !important; height:25px !important;}.tab{overflow-y:scroll !important; width: 100% !important; height:300px !important; margin-top:10px !important;}#wrapper{padding:0 !important;}body{overflow:hidden !important;}'));
        document.getElementsByTagName('head')[0].appendChild(tmpElm);

        var logo = document.getElementsByTagName('img');
        logo[1].style.width = '105px';
        logo[1].style.height = '25px';
        logo[1].style.padding = '20px 0 0 20px';

        var contents = getElementsByClassName('content');

        var firstcontentid = contents[0].parentNode.getAttribute('id').replace('status_', '');
        setCookie("lastid", firstcontentid);


        var badgecount = 0;

        for (var i = 0; i <= contents.length; i++) {
            var thiscontent = contents[i];
            var currentid = thiscontent.parentNode.getAttribute('id').replace('status_', '');

            if (currentid > lastone) {
                if (window.fluid.dockBadge) {
                    window.fluid.dockBadge = parseInt(window.fluid.dockBadge, 10) + 1;
                } else {
                    window.fluid.dockBadge = 1;
                }

                var thistitle = thiscontent.getElementsByTagName('strong')[0].firstChild.innerHTML;
                var thisbody = thiscontent.getElementsByTagName('span')[0].innerText;
                var thisicon = thiscontent.parentNode.getElementsByTagName('img')[0].getAttribute('src');
				var thispriority = (thisbody.indexOf(thisuser) == -1) ? 0 : 1;

                window.fluid.showGrowlNotification({
                    title: thistitle,
                    description: thisbody,
                    priority: thispriority,
                    sticky: false,
                    identifier: "yatweet" + currentid,
                    icon: thisicon
                });
            }
        }      


    }
})();