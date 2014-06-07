// ==UserScript==
// @name           Ebuyer Cart to Forums [Chrome]
// @namespace      http://userscripts.org/users/189070
// @description    Allows users of Ebuyer.com to create a quick screenshot of their cart for use on the forums.
// @include        http://orders.ebuyer.com/customer/shopping/index.html* 
// ==/UserScript==
var getElementsByClassName = function (className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
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
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = "",
                xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                returnElements = [],
                elements, node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = [],
                elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                current, returnElements = [],
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
scriptList = document.getElementsByTagName("script");
cartScript = scriptList.item(scriptList.length - 1).childNodes[0].nodeValue;
itemList = cartScript.match(/<div class=\\"ctoParams\\">(.)*<\\\/div>/m)[0].slice(25, -7).split("&").slice(2);
var items = new Array();
for (i = 0; i <= itemList.length - 1; i++) {
    value = itemList[i];
    val = value.split("=");
    if (i % 3 == 0) {
        var item = new Array();
    }
    item.push(val[1]);
    if ((i + 1) % 3 == 0) {
        items.push(item)
    }
}
bbcode = "<textarea rows=\""+(items.length+6)+"\" cols=\"50\">[code][B][SIZE=\"5\"][url=http://userscripts.org/scripts/show/80944]Ebuyer Cart to Forums Script[/url][/SIZE][/B]\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\r\n[b]QTY	PRICE	TOTAL	QF[/b]\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\r\n";
var count = 0;
var total = 0.0;
for (i in items) {
    bbcode += "[url=http://www.ebuyer.com/product/" + items[i][0] + "]" + items[i][2] + "	" + items[i][1] + "	" + items[i][2] * items[i][1] + "	" + items[i][0] + "[/url]\r\n";
    count++;
    total += items[i][2] * items[i][1];
    if (count == items.length) {
        bbcode += "\r\n[b]Grand Total = £" + total + "[/b][/code]</textarea>";
        document.getElementById("promoCode").innerHTML = bbcode;
    }
}