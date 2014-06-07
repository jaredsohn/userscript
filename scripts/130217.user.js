// ==UserScript==
// @name          Google Plus for Lithium Forum
// @namespace     http://allise.net/
// @version       0.1
// @copyright     2012+, Remedy Memory (aka Lady R or llfezll)
// @require https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include       http://community.eu.playstation.com/*
// ==/UserScript==

 
$("head").append("<style type='text/css'>.gplus iframe { margin-top: -13px !important; }</style><script type=\"text/javascript\">  window.___gcfg = {lang: 'it'};(function() { var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;po.src = 'https://apis.google.com/js/plusone.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);})();</script>");


$('.messageShare').each(function() {
    
    var share_url = $(this).find('[name="fb_share"]').attr('share_url');
    $(this).append("<span class='gplus'><g:plusone href='" + share_url + "' size='medium' annotation='none'></g:plusone><span>");
});