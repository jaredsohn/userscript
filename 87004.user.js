// ==UserScript==
// @name           Open Yabage
// @namespace      https://id.mixi.jp/asannou
// @include        http://yahoo-mbga.jp/game/*
// @include        http://*.app.mbga-platform.jp/gadgets/ifr?*
// ==/UserScript==

function parseHTML(text) {

    var createHTMLDocument = function() {
        var xsl = (new DOMParser()).parseFromString(
            ['<?xml version="1.0"?>',
             '<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">',
             '<output method="html"/>',
             '</stylesheet>'].join("\n"), "text/xml");

        var xsltp = new XSLTProcessor();
        xsltp.importStylesheet(xsl);
        var doc = xsltp.transformToDocument(
            document.implementation.createDocument("", "", null));
        return doc;
    };

    var doc = createHTMLDocument();
    var range = doc.createRange();
    doc.appendChild(doc.createElement("html"));
    range.selectNodeContents(doc.documentElement);
    doc.documentElement.appendChild(
        range.createContextualFragment(text));
    return doc;

}

var ymbga_app = document.getElementById("ymbga_app");

if (ymbga_app) {

    var url = ymbga_app.src;
    url = url.replace(/url=[^&#]+/, "");
    ymbga_app.src = url;
    document.getElementById("secound-footer-sec").style.display = "none";

    var gadgets = window.wrappedJSObject.gadgets;
    gadgets.rpc.register('set_title', function(title) {
        document.title = [title, document.title.split(" - ").pop()].join(" - ");
    });

} else if (location.hostname.match(/\.app\.mbga-platform\.jp$/)) {

    var ifr = [];
    var head = document.getElementsByTagName('head')[0];
    var body = document.body;
    body.innerHTML = "";

    var parseGadget = function (response) {

        head.appendChild(ifr[0]);
        var s;
        for (var i = 1; i < ifr.length - 1; i++) {
            s = document.createElement('script');
            if (ifr[i].src) {
                s.src = ifr[i].src;
            } else {
                s.innerHTML = ifr[i].innerHTML;
            }
            head.appendChild(s);
        }

        var gadget = (new DOMParser()).parseFromString(response.responseText, "application/xml");
        gadget.getElementsByXPath = function (expression, parentElement) {
            var r = [];
            var x = gadget.evaluate(expression, parentElement || gadget, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0, l = x.snapshotLength; i < l; i++) {
                r.push(x.snapshotItem(i));
            }
            return r;
        };

        var canvas = gadget.getElementsByXPath("//Content[@view='canvas']")[0];
        var doc = parseHTML(canvas.textContent);

        var html = doc.getElementsByTagName("html")[0];
        var e;
        while (e = html.firstChild) {
            html.removeChild(e);
            if (e.nodeName.toLowerCase() == "script") {
                s = document.createElement('script');
                if (e.src) {
                    s.src = e.src;
                    head.appendChild(s);
                } else {
                    s.innerHTML = e.innerHTML;
                    body.appendChild(s);
                }
            } else if (e.nodeName.toLowerCase() == "link") {
                head.appendChild(e);
            } else {
                body.appendChild(e);
            }
        }

        s = document.createElement('script');
        s.innerHTML = ifr[ifr.length - 1].innerHTML;
        body.appendChild(s);

        var prefs = gadget.getElementsByXPath("//ModulePrefs")[0];
        var title = prefs.getAttribute("title");

        s = document.createElement('script');
        s.innerHTML = "gadgets.rpc.call(null, 'set_title', null, '" + title + "');"
        body.appendChild(s);

    };

    var parseIframe = function (response) {

        var doc = parseHTML(response.responseText);
        var script = doc.getElementsByTagName("script");
        ifr.push(doc.getElementsByTagName("style")[0]);
        ifr.push(script[0]);
        ifr.push(script[1]);
        ifr.push(script[2]);
        ifr.push(script[script.length - 1]);

        var params = location.search.match(/view-params=([^&]*)/) || [];
        var url;
        if (params[1]) {
            params = JSON.parse(decodeURIComponent(params[1]));
            url = params["__gadget_xml"];
            setTimeout(function () {
                GM_setValue("gadget_xml:" + location.hostname, url);
            }, 0);
        } else {
            url = GM_getValue("gadget_xml:" + location.hostname);
        }

        if (url) {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: parseGadget
            });
        } else {
            alert("no gadget xml");
        }

    };

    GM_xmlhttpRequest({
        method: "GET",
        url: "http://8f929579721339add42f7a924135a3dd8d03cafe.app.mbga-platform.jp/gadgets/ifr?country=JP&parent=dummy&lang=ja&view=canvas&url=http%3A%2F%2Fha-ybga.jp.crowdstar.com%2Fgadget_ybga.xml.php",
        onload: parseIframe
    });

}

// http://yahoo-mbga.jp/game/12002040?appParams=%7B%22__gadget_xml%22%3A%22http%3A%2F%2Fido.nu%2Fayaya%2Fmarimo.xml%22%7D

