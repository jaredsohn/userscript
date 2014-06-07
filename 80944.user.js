// ==UserScript==
// @name           Ebuyer Cart to Forums
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
document.getElementById("promoCode").innerHTML = "<textarea rows=\"5\" cols=\"50\">Please wait while the data loads. If you have a lot of items in your cart this may take some time.</textarea>";
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
if (items.length > 8) {
    bbcode = "<textarea rows=\""+(items.length+6)+"\" cols=\"50\">[code][B][SIZE=\"5\"][url=http://userscripts.org/scripts/show/80944]Ebuyer Cart to Forums Script[/url][/SIZE][/B]\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\r\n[b]QTY	PRICE	TOTAL	QF	PRODUCT[/b]\r\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\r\n";
} else {
    bbcode = "<textarea rows=\"5\" cols=\"50\">[url=\"http://userscripts.org/scripts/show/80944\"][img]http://wispinternet.com/topbar.png[/img][/url]\r\n";
}
var count = 0;
var total = 0.0;
for (i in items) {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://wispinternet.com/ebuyerdetails.php?id=" + items[i][0] + "&price=" + items[i][1] + "&qt=" + items[i][2],
        onload: function (response) {
            reply = response.responseText.split("---");
            if (items.length > 8) {
                bbcode += "[url=http://www.ebuyer.com/product/" + reply[3] + "]" + reply[2] + "	" + reply[1] + "	" + reply[2] * reply[1] + "	" + reply[3] + "	" + reply[0] + "[/url]\r\n";
            } else {
                bbcode += "[url=http://www.ebuyer.com/product/" + reply[3] + "][img]http://wispinternet.com/ebuyeritem.php?qf=" + reply[3] + "&price=" + reply[1] + "&qt=" + reply[2] + "&desc=" + reply[0] + "[/img][/url]\r\n";
            }
            count++;
            total += reply[2] * reply[1];
            if (count == items.length) {
                if (items.length > 8) {
                    bbcode += "\r\n[b]Grand Total = £" + total + "[/b][/code]</textarea>";
                } else {
                    bbcode += "[img]http://wispinternet.com/ebuyeritem.php?action=total&total=" + total + "[/img]</textarea>";
                }
                document.getElementById("promoCode").innerHTML = bbcode;
            }
        }
    });
}