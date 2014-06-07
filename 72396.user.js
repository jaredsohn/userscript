// --------------------------------------------------------------------
// Se precisar me contactar use: ****************
// --------------------------------------------------------------------

// ==UserScript==
// @name           DX Post-Office Link Swapper by Williantg(canadian version by acidica)
// @namespace      *******************
// @description    Swaps the Hong Kong Post Office by canadian post office link
// @include        http://www.dealextreme.com/*
// @include        http://dealextreme.com/*
// @include        https://www.dealextreme.com/*
// @include        https://dealextreme.com/*
// @include        http://www1.dealextreme.com/*
// @include        https://www1.dealextreme.com/*
// @include        http://www2.dealextreme.com/*
// @include        https://www2.dealextreme.com/*
// ==/UserScript==



var as,i,islink,newlink,icone;

newlink='http://canadapost.ca/cpotools/apps/track/personal/findByTrackNumber?trackingNumber=';
icone='http://canada.gc.ca/favicon.ico';

// grab all links, and loop over them
as=document.getElementsByTagName('a');
for(i=0;i<as.length;i++)
{
// take the link's href
islink=as[i].href;

// check if is a valid link and adjust to new P.O. link
if(islink.indexOf('http://app3.hongkongpost.com/CGI/mt/genresult.jsp?tracknbr=R')>-1)
{
as[i].href=islink.replace('http://app3.hongkongpost.com/CGI/mt/genresult.jsp?tracknbr=',newlink);
as[i].innerHTML=as[i].innerHTML+'&nbsp<img width=10 border=0 src='+icone+'>';
}
}