// ==UserScript==
// @name           Facebook Chat Rage Faces
// @namespace      https://github.com/josephoenix
// @description    Inserts the rage faces from reddit.com/r/fffffffuuuuuuuuuuuu into facebook chat
// @include     http*://*.facebook.tld/* 
// @exclude     http*://*.facebook.tld/plugins/*
// @exclude     http*://*.facebook.tld/widgets/*
// @exclude     http*://*.facebook.tld/iframe/*
// @exclude     http*://*.channel.facebook.tld/*
// @exclude     http*://*.facebook.tld/ai.php*
// ==/UserScript==


var cssLive = "http://www.reddit.com/r/fffffffuuuuuuuuuuuu/stylesheet.css";

function RAGEbuildSelector(kw) {
    return "a[href=\"http://rage.fu/" + kw + "\"]";
}

function RAGEinjectCSS(styleScript) {
    var rageStyles = "";
    var rageIndex = styleScript.indexOf("a[href=");
    var keyWords = new Array();
    while (rageIndex < styleScript.length)
    {
        // Copy all a[href styles, until the ending bracket.
        if (styleScript.substring(rageIndex, rageIndex+7) == "a[href=")
        {
            var theseKeywords = new Array();
            while (rageIndex < styleScript.length && styleScript.charAt(rageIndex) != '{') {
                
                if (styleScript.substring(rageIndex, rageIndex+7) != "a[href=") {
                    rageStyles = rageStyles + styleScript.charAt(rageIndex);
                    rageIndex = rageIndex + 1;
                } else {
                    var keyword = "";
                    rageIndex = rageIndex + 9;
                    while (rageIndex < styleScript.length && styleScript.charAt(rageIndex) != '"') {
                        keyword = keyword + styleScript.charAt(rageIndex);
                        rageIndex = rageIndex + 1;
                    }
                    theseKeywords.push(keyword);
                    
                    rageIndex = rageIndex + 2; // '"]'
                    rageStyles = rageStyles + RAGEbuildSelector(keyword);
                    console.log("a[href*=\"/" + keyword + "\"]");
                }
            }
            
            if (theseKeywords.length > 1) {
                theseKeywords.forEach(function append(item) {
                    keyWords.push(item);
                });
            }
            // Rageface, copy to <style> while not }
            while (rageIndex < styleScript.length && styleScript.charAt(rageIndex) != '}')
            {
              rageStyles = rageStyles + styleScript.charAt(rageIndex);
              rageIndex = rageIndex + 1;
            }
            rageStyles = rageStyles + '} ';
            rageIndex = rageIndex + 1;
        }
        else
        {
            // Not a rage face, find one!
            rageIndex = rageIndex + 1;
        }
    }
    
    var allRageSelector = "";
    
    keyWords.forEach(function (kw) {
        allRageSelector = allRageSelector + RAGEbuildSelector(kw) + ", ";
    });
    
    console.log(allRageSelector.slice(0, allRageSelector.length - 2));
    
    rageStyles = rageStyles + "\n" + allRageSelector.slice(0, allRageSelector.length - 2) + "{\n" +
    
                 "font-size: 0%;\n" +
                 "color: white;\n" +
                "}";
    
    // End this with </style>
    // rageStyles = rageStyles + " </style>";
    // document.head.innerHTML = document.head.innerHTML + rageStyles;
    //                 console.log(keyWords);
    var styles = document.createElement("style");
    styles.setAttribute("type", "text/css");
    styles.setAttribute("title", "ragefaces");
    styles.innerHTML = rageStyles;
    var headNode = document.getElementsByTagName("head")[0];
    headNode.appendChild(styles);
    // Whew, done!
}

GM_xmlhttpRequest({
  method: "GET",
  url: cssLive,
  onload: function(response) {
    RAGEinjectCSS(response.responseText);
  }
});

console.log("Greasemonkey script loaded");