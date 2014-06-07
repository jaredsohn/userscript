// ==UserScript==
// @name WikiHelp
// @namespace http://web.iiit.ac.in/~akash.sinhaug08/wikihelp
// @description show help text for wiki links
// @include *.wikipedia.org/*
// ==/UserScript== 


function wikiHelp() {
    var whXhr = null;
    var helpTime = null;
    var whWidth = 420;

    function showHelp(query) {
        var terms = query.split("/");
        var term = terms[terms.length - 1];
        document.getElementById("whOverlay")
            .style.display = "block";
        var whContent = document.getElementById("whContent");
        var whHidden = document.getElementById("whHidden");
        whContent.innerHTML = "Loading..";
        whXhr = new XMLHttpRequest();
        whXhr.onreadystatechange = function () {
            if (whXhr.readyState == 4 && whXhr.status == 200) {
                whHidden.innerHTML = whXhr.responseText;
                if (term.indexOf('#') > 0) {
                    var qTerms = term.split('#');
                    secId = qTerms[1];
                    className = "mw-headline";
                    var spContainers = whHidden.getElementsByClassName(className);
                    for (i = 0; i < spContainers.length; i++) {
                        if (spContainers[i].id == secId) {
                            var parSpContainer = spContainers[i].parentNode;
                            var Container = parSpContainer.nextSibling;
                            Container = Container.nextSibling;
                            var helpText = "<h4>" + secId.replace("_", " ") + "</h4>" + Container.textContent;
                        }
                    }
                } else {
                    className = document.getElementById("mw-content-text")
                        .className;
                    className = className ? className : "mw-content-ltr";
                    var Container = whHidden.getElementsByClassName(className)[0];
                    var containerNodes = Container.childNodes;
                    for (i = 0; i < containerNodes.length; i++) {
                        if (containerNodes[i].nodeName.toLowerCase() == "p") {
                            var helpText = containerNodes[i].textContent;
                            break;
                        }
                    }
                }
                whContent.innerHTML = helpText;
                whHidden.innerHTMl = " ";
            }
        }
        whXhr.open("GET", query, true);
        whXhr.send();
    }

    function getWhOffset(element) {
        var wh_x = 0;
        var wh_y = 0;
        while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
            wh_x += element.offsetLeft - element.scrollLeft;
            wh_y += element.offsetTop - element.scrollTop;
            element = element.offsetParent;
        }
        return {
            top: wh_y,
            left: wh_x
        };
    }
    var qfunc = function (event) {
        if (whXhr && whXhr.readystate != 4) {
            whXhr.abort();
        }
        var element = event.target;
        var query = element.getAttribute("href");
        element.removeAttribute("title");
        var offset = getWhOffset(element);
        var wh_left = offset.left;
        var wh_top = offset.top;
        wh_top = wh_top + 20;
        var whOverlay = document.getElementById("whOverlay");
        whOverlay.style.top = wh_top + "px";
        var scWidth = document.body.clientWidth;
        if (wh_left + whWidth > scWidth) {
            wh_left = scWidth - whWidth;
        }
        whOverlay.style.left = wh_left + "px";
        if (query) {
            helpTime = setTimeout(showHelp, 250, query);
        }
    }
    var dfunc = function (event) {
        var whOverlay = document.getElementById("whOverlay");
        whOverlay.style.display = "none";
        if (helpTime) {
            clearTimeout(helpTime);
        }
        if (whXhr && whXhr.readystate != 4) {
            whXhr.abort();
        }
    }

        function whInit() {
            var whOverlay = document.createElement("div");
            whOverlay.id = "whOverlay";
            whOverlay.setAttribute("style", "display: none;font-family: Arial, serif;width: 400px;font-size:11pt;position: absolute;background: rgba(95, 95, 95, 0.7); padding: 10px 6px; box-shadow: 0 0 3px #E5E5E5; border-radius: 4px;top:0;left:0;");
            var whContent = document.createElement("div");
            whContent.id = "whContent";
            whContent.setAttribute("style", "max-height: 200px; padding: 3px; overflow: hidden; background: #FFFFFF;");
            var whHidden = document.createElement("div");
            whHidden.id = "whHidden";
            whHidden.setAttribute("style", "display: none; height: 0;width:0;");
            document.body.appendChild(whOverlay);
            whOverlay.appendChild(whContent);
            whOverlay.appendChild(whHidden);
            var contentArea = document.getElementById("mw-content-text");
            var links = contentArea.getElementsByTagName("a");
            for (i = 0; i < links.length; i++) {
                var linkHref = links[i].getAttribute("href");
                if (linkHref.indexOf("wiki") > 0) {
                    links[i].addEventListener("mouseover", qfunc, false);
                    links[i].addEventListener("mouseout", dfunc, false);
                }
            }
        }
    whInit();
}
wikiHelp();


