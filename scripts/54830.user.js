// ==UserScript==
// @name           RT - Back to Top
// @namespace      rtb2t@kwierso.com
// @description    Adds a "Back to Top" button at the bottom of the page.
// @include        http://roosterteeth.com/*
// @include        http://*.roosterteeth.com/*
// @include        http://strangerhood.com/*
// @include        http://achievementhunter.com/*
// @include        http://redvsblue.com/*
// @include        http://roosterteethcomics.com/*
// ==/UserScript==

(function() {
    var placetostickit = document.getElementsByTagName("td");
    for(i in placetostickit) {
        if(placetostickit[i].className == "footerBlack") {
            placetostickit = placetostickit[i];
            break;
        }
    }
    placetostickit = placetostickit.getElementsByTagName("div")[0].
                        getElementsByTagName("img")[0].parentNode.parentNode;
    var link = document.createElement("a");
    link.href = "#top";
    link.style.paddingLeft = "5px";

    var image = document.createElement("img");
    image.src = "http://images.roosterteeth.com/assets/style/images/v1/upRightWhite.gif";
    image.style.cssFloat = "none";

    link.appendChild(image);
    placetostickit.appendChild(link);
})();