// ==UserScript==
// @name        ekons.usr.scr
// @namespace   http://userscripts.org/scripts/show/155060
// @include     http://userscripts.org/scripts/show/155060
// @version     1
// ==/UserScript==
console.log('### script start ###');
console.log('### title ' + document.title);

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);

    document.body.appendChild(script);
}

// the guts of this userscript

function main() {
    var iframes = $('iframe');
    for (i = 0; i < iframes.length; ++i) {
        if (iframes[i].src.indexOf('http://www.youtube.com') !== -1) {
            console.log('# src ' + iframes[i].src);
            var iframeUrl = iframes[i].src;
            iframeUrl = iframeUrl.replace("http://www.youtube.com/", "http://www.yt.g00p.com/");
            iframes[i].src = iframeUrl;
        }
    }
}


// load jQuery and execute the main function

addJQuery(main);

console.log('### script end ###');

