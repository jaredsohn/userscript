// ==UserScript==
// @name       Torrent2Magnet for DMHY
// @version    1.0
// @description Convert DMHY's torrent links to magnet links.
// @match      http://share.dmhy.org/*
// @author     Sol Lee <u103133.u103135 AT gmail.com>
// @license    GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src', '//code.jquery.com/jquery-latest.min.js');
    script.addEventListener('load', function() {
        var script = document.createElement('script');
        script.textContent = 'window.jQ=jQuery.noConflict(true);(' + callback.toString() + ')();';
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
 
addJQuery(function() {
    var link;
    if($(".download-arrow").length > 0){
        link = $(".download-arrow");
    }
    link.each(function(){
        ori_link = $(this).attr("href");
        hash = ori_link.split("/").pop();
        magnet = "magnet:?xt=urn:btih:" + hash;
        $(this).attr("href",magnet);
    });
});
