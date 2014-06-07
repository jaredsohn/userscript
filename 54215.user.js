// ==UserScript==
// @name           OpenLayers API Browser
// @namespace      http://onebrightspace.com
// @include        http://dev.openlayers.org/releases/OpenLayers-2.8/doc/*
// @include        http://trac.openlayers.org/browser/trunk/openlayers/lib/OpenLayers/*
// ==/UserScript==

var olab = {

    links: [],

    addGlobalStyle: function (css) {
        var head, style;
        head = document.getElementsByTagName("head")[0];
        if (!!head) {
            style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = css;
            head.appendChild(style);
        }
    },

    exec: function () {

        var div, desc;

        this.addGlobalStyle(
            "#linkBar {" +
                "  position: fixed;" +
                "  right: 0;" +
                "  top: 0;" +
                "  color: white;" +
                "  margin: 0;" +
                "  padding: 5px;" +
            "}"
        );

        this.addGlobalStyle(
            "#linkBar a:link {" +
                "color: white;" +
            "}"
        );

        this.addGlobalStyle(
            "#linkBar a:visited {" +
                "color: white;" +
            "}"
        );

        if (document.location.pathname.indexOf("devdocs") > 0) {
            this.links.push("<a href=\"" + document.location.href.replace("devdocs", "apidocs") + "\">apiDocs</a>");
            this.links.push("<a href=\"" + "http://trac.openlayers.org/browser/trunk/openlayers/lib" + document.location.href.split("docs/files")[1].split("#")[0].replace("-js.html", ".js") + "\">src</a>");
        } else if (document.location.pathname.indexOf("apidocs") > 0) {
            this.links.push("<a href=\"" + document.location.href.replace("apidocs", "devdocs") + "\">devDocs</a>");
            this.links.push("<a href=\"" + "http://trac.openlayers.org/browser/trunk/openlayers/lib" + document.location.href.split("docs/files")[1].split("#")[0].replace("-js.html", ".js") + "\">src</a>");
        } else if (document.location.hostname.indexOf("trac") >= 0) {
            this.links.push("<a href=\"" + "http://dev.openlayers.org/releases/OpenLayers-2.8/doc/devdocs/files" + document.location.href.split("lib")[1].replace(".js", "-js.html") + "\">devDocs</a>");
            this.links.push("<a href=\"" + "http://dev.openlayers.org/releases/OpenLayers-2.8/doc/apidocs/files" + document.location.href.split("lib")[1].replace(".js", "-js.html") + "\">apiDocs</a>");
        }

        div = document.createElement("div");
        div.id = "linkBar";
        desc = "<div>" + this.links.join(" | ") + "</div>";
        div.innerHTML = desc;
        document.body.style.paddingBottom = "4em";
        document.body.appendChild(div);
    }

};

window.addEventListener("load", function () {
    olab.exec();
}, true);

