// ==UserScript==
// @name           DX Post-Office Link Swapper by Williantg
// @namespace      http://www.multitralhas.net
// @description    Swaps the Hong Kong Post Office by brazilian post office link
// @include http://www.dealextreme.com/*
// @include http://dealextreme.com/*
// @include https://www.dealextreme.com/*
// @include https://dealextreme.com/*
// @include http://www1.dealextreme.com/*
// @include https://www1.dealextreme.com/*
// @include http://www2.dealextreme.com/*
// @include https://www2.dealextreme.com/* 
// ==/UserScript==



var as,i,islink,newlink,icone;

newlink='http://websro.correios.com.br/sro_bin/txect01$.QueryList?P_LINGUA=001&P_TIPO=001&P_COD_UNI=';
icone='http://www.brasil.gov.br/favicon.ico';

// grab all links, and loop over them
as=document.getElementsByTagName('a');
for(i=0;i<as.length;i++)
{
// take the link's href
islink=as[i].href;

// check if is a valid HK link and adjust to new P.O. link
if(islink.indexOf('http://app3.hongkongpost.com/CGI/mt/genresult.jsp?tracknbr=R')>-1)
{
as[i].href=islink.replace('http://app3.hongkongpost.com/CGI/mt/genresult.jsp?tracknbr=',newlink);
as[i].innerHTML=as[i].innerHTML+'&nbsp<img width=10 border=0 src='+icone+'>';
}

// check if is a valid CN link and adjust to new P.O. link
if(islink.indexOf('http://intmail.183.com.cn/item/itemStatusQuery.do')>-1)
{
as[i].href=islink.replace('http://intmail.183.com.cn/item/itemStatusQuery.do',newlink+as[i].innerHTML);
as[i].innerHTML=as[i].innerHTML+'&nbsp<img width=10 border=0 src='+icone+'>';
}

// check if is a valid DX link and adjust to new P.O. link
if(islink.indexOf('http://www.dealextreme.com/accounts/TrackingRedirect.dx/TrackingNumber.')>-1)
{
as[i].href=islink.replace('http://www.dealextreme.com/accounts/TrackingRedirect.dx/TrackingNumber.',newlink);
as[i].innerHTML=as[i].innerHTML+'&nbsp<img width=10 border=0 src='+icone+'>';
}

}