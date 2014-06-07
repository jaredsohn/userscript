// ==UserScript==
// @name        google-desmartify
// @include     https://*.google.*/search?q=*
// @include     https://*.google.*/#q=*
// @author      siikamiika
// @description Prevent Google from rearranging Image, Shopping, Maps etc. links based on the search
// @version     1
// ==/UserScript==

//only works when directly accessing the search page from omnibox or firefox search
//Order: web images maps videos (more)

var q = document.URL.match(/q=([^&]*)/)[1];

var replacement = '';
var web='';var img='';var vid='';

if (document.URL.match(/tbm=isch/))
    img = ' hdtb_msel';
else if (document.URL.match(/tbm=vid/))
    vid = ' hdtb_msel';
else
    web = ' hdtb_msel';

replacement += '<div class="hdtb_mitem'+web+'"><a class="q qs" href="/search?q='+q+'">Web</a></div>'
replacement += '<div class="hdtb_mitem'+img+'"><a class="q qs" href="/search?q='+q+'&amp;tbm=isch">Images</a></div>'
replacement += '<div class="hdtb_mitem"><a class="q qs" href="https://maps.google.com/maps?q='+q+'">Maps</a></div>'
replacement += '<div class="hdtb_mitem'+vid+'"><a class="q qs" href="/search?q='+q+'&amp;tbm=vid">Videos</a></div>'
replacement += '<a aria-label="More" id="hdtb_more" role="menu" tabindex="0"><span class="mn-hd-txt">More</span><span class="mn-dwn-arw"></span></a>'
replacement += '<div aria-expanded="false" id="hdtb_more_mn" class="hdtb-mn-c">'
replacement += '<div class="hdtb_mitem"><a class="q qs" href="/search?q='+q+'&amp;tbm=shop">Shopping</a></div>'
replacement += '<div class="hdtb_mitem"><a class="q qs" href="/search?q='+q+'&amp;tbm=nws">News</a></div>'
replacement += '<div class="hdtb_mitem"><a class="q qs" href="/search?q='+q+'&amp;tbm=bks">Books</a></div>'
replacement += '<div class="hdtb_mitem"><a class="q qs" href="https://www.google.com/flights/gwsredirect?q='+q+'&amp;tbm=flm">Flights</a></div>'
replacement += '<div class="hdtb_mitem"><a class="q qs" href="/search?q='+q+'&amp;tbm=app">Apps</a></div>'
replacement += '</div>'
replacement += '<a id="hdtb_tls" class="hdtb-tl" role="button" tabindex="0">Search tools</a>'

document.getElementById('hdtb_msb').innerHTML = replacement;
