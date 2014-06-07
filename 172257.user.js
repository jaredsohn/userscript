// ==UserScript==
// @name        MixCrate Downloader
// @namespace   djsosofresh
// @description Allows you to download mixes on mixcrate.com
// @include     https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
// @include     http://www.mixcrate.com/*
// @include     https://www.mixcrate.com/*
// @version     1.0
// ==/UserScript==

// get the head element
head = document.getElementsByTagName('head')[0].innerHTML;

// find all the script tags inside the head
scripts = document.getElementsByTagName('head')[0].getElementsByTagName('script');

// loop through all the script tags
for (var i =scripts.length-1; i >=0; i--) {
    if(scripts[i].outerHTML.search('MC.pageData = ') != -1) {
        s = scripts[i].outerHTML;

        // find the json element indices
        beg_index = s.search('MC.pageData = ');
        end_index = s.search(';</script');
        
        // extract the json
        substring = s.substring(beg_index + 'MC.pageData = '.length,end_index);

        // parse the json info for the track
        json = JSON.parse(substring);
        
        du = window.atob(json.Mix.au);
        
        // if a download button doesn't already exist on the page
        if($("li.btn-download").length == 0) {
            $("ul.sharing-internal").append('<li class="btn dark sharing-control btn-download"><a class="sprite-global download" href="'+du +'">Download via Mixcrate Downloader</a></li>');
        }
        break;
    }


}
