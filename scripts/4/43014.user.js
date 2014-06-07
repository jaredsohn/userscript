// ==UserScript==
// @name Fold Google
// @namespace http://d.hatena.ne.jp/mollifier/
// @description enable to fold search results in Google
// @include http://www.google.com/search?*
// @include http://www.google.co.jp/search?*
// ==/UserScript==

(function() {
    window.addEventListener("load", function() {
        // create radio buttons
        var radioFactory = function() {
            var elem = document.createElement("input");
            elem.type = "radio";
            elem.name = "foldGoogleButton";

            return elem;
        };

        var enableButton = radioFactory();
        enableButton.checked = "checked";
        var disableButton = radioFactory();

        // create function which sets display style
        var displayFuncFactory = function(dispType) {
            return function() {
                var searchResults = document.evaluate(
                   "//li[contains(@class, 'g')]/div[contains(@class, 's')]",
                    document, null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

                for (var i = 0; i < searchResults.snapshotLength; i++) {
                    searchResults.snapshotItem(i).style.display = dispType;
                }
            };
        };

        enableButton.addEventListener(
            "click", displayFuncFactory(""), false);
        disableButton.addEventListener(
            "click", displayFuncFactory("none"), false);

        var f = document.createDocumentFragment();
        f.appendChild(enableButton);
        f.appendChild(document.createTextNode("show"));
        f.appendChild(disableButton);
        f.appendChild(document.createTextNode("hide"));

        // add radio buttons to div element
        var buttonContainer = document.createElement("div");
        buttonContainer.style.position = "fixed";
        buttonContainer.style.top = "22px";
        buttonContainer.style.right = "120px";
        buttonContainer.style.backgroundColor = "#ffffff";
        buttonContainer.appendChild(f);

        document.getElementsByTagName("body")[0].appendChild(buttonContainer);
    }, false);
})();

