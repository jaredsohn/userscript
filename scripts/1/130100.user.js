// ==UserScript==
// @name          Redirect unicom dns error page, for Jiangsu Unicom 3G.
// @namespace     z7z8th 
// @description   Redirect the dns error page(full of ads: http://nfdnserror[0-9]*.wo.com.cn:8080/*) which has been redirected by Jiangsu Unicom 3G, and search the domain in google, please modify it to suit your condition.
// @include       http://nfdnserror*.wo.com.cn:8080/*
// ==/UserScript==

var redirect_to_google = 'http://www.google.com';
var host_pattern = /nfdnserror[0-9]*.wo.com.cn:8080/i;
var wrong_dns_pattern = /^HOST=/;
var wrong_dns_domain;

if( host_pattern.test( document.location.host ) )
{
    var search_str = document.location.search;
    var get_opts =search_str.substring(1).split( '&' );
    for( var i in get_opts )
    {
        if( wrong_dns_pattern.test( get_opts[i] ) )
        {
            wrong_dns_domain = get_opts[i].substring( wrong_dns_pattern.source.length - 1);
            break;
        }
    }
    if( !wrong_dns_domain ) 
    {
        wrong_dns_domain = 'Oops! null domain name!';
    }
    //alert( wrong_dns_domain );
    document.location.replace( redirect_to_google + '/search?q=' + wrong_dns_domain );
}


