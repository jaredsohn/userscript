// ==UserScript==
// @name              Faviconek
// @namespace         http://kamdz.pl
// @description       Skrypt zmienia favicon wykopu gdy dostaniemy powiadomienie w tle.
// @author            Kamil "kamdz" Dzwonkowski 
// @version           1.0
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () {
    var head = document.getElementsByTagName("head")[0];
    var change = function(iconURL) {
        var link = document.createElement("link");
        link.type = "image/png";
        link.rel = "icon";
        link.href = iconURL;
        clear();
        head.appendChild(link);
    };
    var clear = function() {
        var links = head.getElementsByTagName("link");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (link.type == "image/png" && link.rel == "icon") {
                head.removeChild(link);
                break;
            }
        };
    };
    var notify = "http://i.imgur.com/IETnn.png";
    var normal, changed = false;
    var links = head.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
	if (link.type == "image/png" && link.rel == "icon") {
            normal = link.href;
            break;
	}
    }
    setInterval(function(){	
        if (!changed && document.title.charAt(0) == "(") {
            change(notify);
            changed = true;
        } else if (changed && document.title.charAt(0) != "(") {
            change(normal);
            changed = false;
        }
    }, 1000);
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);