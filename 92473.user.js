// ==UserScript==
// @name           instant download for nexus-sites
// @namespace      http://userscripts.org/users/gensmeta/
// @description    Removes the wait timer for downloads on newvegasnexus.com, fallout3nexus.com, tesnexus.com and dragonagenexus.com
// @include        http://*.newvegasnexus.com/*
// @include        http://newvegasnexus.com/*
// @include        http://*.dragonagenexus.com/*
// @include        http://dragonagenexus.com/*
// @include        http://*.fallout3nexus.com/*
// @include        http://fallout3nexus.com/*
// @include        http://*.tesnexus.com/*
// @include        http://tesnexus.com/*
// @exclude        */download.php?file=*&dl=1
// ==/UserScript==


if(window.location.href.search("download.php")>=0){

    var dl_server=3; // fs=fs3
    if(window.location.href.search("id=")>=0){
            window.location=document.getElementsByTagName('a')[dl_server+1].href+"&dl=1";
    } else {
            window.location=window.location+"&dl=1";
    }
}