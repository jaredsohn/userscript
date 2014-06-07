// ==UserScript==
// @name           Replace RT comic thumbnail
// @namespace      rrtct@kwierso.com
// @description    Replace the thumbnailed comic with the full-sized one.
// @include        http://redvsblue.com/home.php*
// @include        https://redvsblue.com/home.php*
// @include        http://redvsblue.com/
// @include        https://redvsblue.com/*
// @include        http://achievementhunter.com/home.php*
// @include        https://achievementhunter.com/home.php*
// @include        http://achievementhunter.com/
// @include        https://achievementhunter.com/*
// @include        http://roosterteethcomics.com/home.php*
// @include        https://roosterteethcomics.com/home.php*
// @include        http://roosterteethcomics.com/
// @include        https://roosterteethcomics.com/*
// @include        http://*.roosterteeth.com/home.php*
// @include        https://*.roosterteeth.com/home.php*
// @include        http://*.roosterteeth.com/
// @include        https://*.roosterteeth.com/*
// @include        http://roosterteeth.com/home.php*
// @include        https://roosterteeth.com/home.php*
// @include        http://roosterteeth.com/
// @include        https://roosterteeth.com/*
// ==/UserScript==

(function() {
    var allNewsLinks = getElementsByClass(document);
})();

function getElementsByClass(doc) {
    var allTD = doc.getElementById("pageContent").getElementsByTagName("td");
    var allnews = [];
    var allImg = [];

    for(i in allTD) {
        if(allTD[i].className == "newsimgInherit") {
            allnews.push(allTD[i]);
        }
    }

    for(i in allnews) {
        if(allnews[i].getElementsByTagName("img").length > 0)
            allImg.push(allnews[i].getElementsByTagName("img"));
    }

    for(i in allImg) {
        if(allImg[i][0].parentNode.href.match("comics/strip.php")){
            allImg[i][0].addEventListener("mouseover", function() {
                                                        this.src = this.src.replace("t.jpg", ".jpg");
                                                       }, false);
            allImg[i][0].addEventListener("mouseout", function() {
                                                        this.src = this.src.replace(".jpg", "t.jpg");
                                                      }, false);
        }
    }
}
