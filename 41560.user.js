// ==UserScript==
// @name           Super Navigation
// @namespace      supernav
// @include        *
// ==/UserScript==

var SuperNav = {
    anchoredURL: "",
    captures: []
};
function generateLink(captureIndex, up) {
    return SuperNav.anchoredURL.replace(/__([0-9]+)__/g, 
                    function (zero, one) {
                        var index = parseInt(one, 10);
                        if (index != captureIndex) {
                            return SuperNav.captures[index];
                        }
                        var value = SuperNav.captures[index];
                        var numberValue = parseInt(value, 10);
                        var result = (up ? numberValue + 1 : value - 1);
                        if (value.charAt(0) == '0') {
                            result = "000000000" + result;
                            result = result.substring(result.length - value.length);
                        }
                        
                        return result;
                    });
}
function capture() {
    SuperNav.count = 0;
    SuperNav.anchoredURL = window.location.href.replace(/([0-9]+)/g,
                            function (zero, one) {
                                SuperNav.captures[SuperNav.count] = one;
                                var text = "__" + SuperNav.count + "__";
                                SuperNav.count ++;
                                
                                return text;
                            });
}
function navify() {
    capture();
    if (SuperNav.captures.length == 0) return;
    
    var html = SuperNav.anchoredURL.replace(/__([0-9]+)__/g, 
                    function (zero, one) {
                        var index = parseInt(one, 10);
                        return "<span><a class=\"Up\" href=\"" + 
                                generateLink(index, true) + "\">▲</a><span class=\"Original\">" + 
                                SuperNav.captures[index] + "</span><a class=\"Down\" href=\"" + 
                                generateLink(index, false) + "\">▼</a></span>";
                    }) +
                    "<style> div.SuperNav {color: #000; position: fixed; top: 2em; right: 1em; background: #fff; opacityx: .3;}" +
                    "div.SuperNav:hover {opacity: 1;}" + 
                    "div.SuperNav > span {position: relative;}" + 
                    "div.SuperNav > span > a {font-size: 1.4em; position: absolute; left: 50%; margin-left: -0.7em}" + 
                    "div.SuperNav > span > a.Up {top: -1.4em}" + 
                    "div.SuperNav > span > a.Down {top: 1em}" + 
                    "</style>";

    var div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = html;
    div.addEventListener("click", function (event) {
        event.stopPropagation();
    }, false);
    
    div.className = "SuperNav";
}
navify();
