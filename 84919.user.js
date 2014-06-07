// ==UserScript==
// @name           Fix RT's podcasts
// @namespace      kwierso@kwiersoisawesome.com
// @include        http://roosterteeth.com/podcast/episode.php?id=*
// ==/UserScript==

(function() {
    let audio = document.getElementsByTagName("audio")[0];
    let source = audio.src;
    let object = "<object type='audio/x-mpeg' data='" + source + "' width='200px' height='40px' autoplay='true'" +
                 "style='color:red!important;width:200px!important;height:40px!important' />"

    audio.parentNode.innerHTML = object;
})();