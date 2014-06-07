// ==UserScript==
// @name           twitvetica
// @namespace      twitvetica
// @description    Removes Helvetica from Twitter's CSS font stack, which might break the rendering on Windows PCs.
// @include        https://twitter.com/
// ==/UserScript==

(function(){

    //object constructor
    function example(){

        // modify the stylesheet
        this.append_stylesheet('body, #search-query, textarea { font-family: Arial, sans-serif !important;}');

    };

    //create a stylesheet
    example.prototype.append_stylesheet = function(css){

        var styletag = document.createElement("style");
        styletag.setAttribute('type', 'text/css');
        styletag.setAttribute('media', 'screen');
        styletag.appendChild(document.createTextNode(css));

        document.getElementsByTagName('head')[0].appendChild(styletag);

    };

    //instantiate and run 
    var example = new example();


})();