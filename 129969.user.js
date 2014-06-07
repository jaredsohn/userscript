// ==UserScript==
// @name           HobbyKing Post-Office Link Swapper by Williantg
// @namespace      http://www.multitralhas.net
// @description    Swaps the original post office link by brazilian post office link
// @include http://www.hobbyking.com/*
// @include http://hobbyking.com/*
// @include https://www.hobbyking.com/*
// @include https://hobbyking.com/*
// @include http://www1.hobbyking.com/*
// @include https://www1.hobbyking.com/*
// @include http://www2.hobbyking.com/*
// @include https://www2.hobbyking.com/* 
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
if(islink.indexOf('hongkongpost.com/CGI/mt/genresult.jsp')>-1)
{
as[i].href=islink.replace('http://app3.hongkongpost.com/CGI/mt/genresult.jsp?tracknbr=',newlink+as[i].innerHTML);
as[i].innerHTML=as[i].innerHTML+'&nbsp<img width=10 border=0 src='+icone+'>';
}
if(islink.indexOf('hongkongpost.com/CGI/mt/enquiry.jsp')>-1)
{
as[i].href=islink.replace('http://app3.hongkongpost.com/CGI/mt/enquiry.jsp',newlink+as[i].innerHTML);
as[i].innerHTML=as[i].innerHTML+'&nbsp<img width=10 border=0 src='+icone+'>';
}

// check if is a valid CH link and adjust to new P.O. link
if(islink.indexOf('post.ch')>-1)
{
as[i].href=islink.replace('http://www.post.ch/en/post-startseite/post-privatkunden/post-versenden/post-track-and-trace-uebersicht-pk/post-track-and-trace.htm',newlink+as[i].innerHTML);
as[i].innerHTML=as[i].innerHTML+'&nbsp<img width=10 border=0 src='+icone+'>';
}

}