// ==UserScript==
// @name       MeFi Hover Favorites
// @namespace  http://www.roufa.com/
// @version    0.15
// @description  Show who favorited a comment by hovering over it
// @match      http://*.metafilter.com/*/*
// @resource   jquicss   http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @require    http://code.jquery.com/ui/1.10.3/jquery-ui.js
// ==/UserScript==

$(function() {
    var newCSS = GM_getResourceText ("jquicss");
    GM_addStyle (newCSS);
    GM_addStyle (".ui-tooltip {font-size:10pt;font-family:Calibri;}");

    var titles = {};
    $('div#page').on('mouseover', 'span[id^="favcnt"] a', function(evt) {
    	var link = evt.target;
        var href = link.href;
        if (titles[href]) return;
        link.title = '';
        titles[href]=true;
        $.get(href, null, function(d) {
        	var output = '';
            $('a', '<div>' + d.split('<div class="copy">')[1].split('</div>')[0] + '</div>').each(function(ix, el) { output += el.innerText + ', '; });
            output = output.substr(0, output.length-2);
            link.title = output;
            $(link).tooltip({content: output});
            $(link).tooltip("open");
        });
    });
    
    // [Add to] / [remove from] favorites (main post)
    $('div.copy').on('click', 'span[id^="fav"] a:eq(0)', function(evt){ // need to use the first one as there's no id or class for the add-to-favorites link (until AFTER it's been clicked once)
        var href = $('div.copy span[id^="favcnt"] a').attr('href');
        titles[href] = false;
    });

    // +/- button for comments
    $('div#page').on('click', 'a[id^="plusminus"]', function(evt){
        var favcntid = 'favcnt' + evt.target.id.split('plusminus')[1];
        var ancs = $('span#' + favcntid + ' a');
        if (ancs[0]) {
        	titles[ancs[0].href] = false;
        }
    });
});