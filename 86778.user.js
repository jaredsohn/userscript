// ==UserScript==
// @name           CrackDB Iframer
// @description    Adds an iframe of the post-download page directly into the pre-download page. Use with LoadCrack auto-downloader.
// @author         -brycco
// @include        http://crackdb.com/*
// @include        http://www.crackdb.com/*
// @include        http://crackdb.cd/*
// @include        http://www.crackdb.cd/*
// @include        http://crackdb.org/*
// @include        http://www.crackdb.org/*
// @include        http://crackdbs.com/*
// @include        http://www.crackdbs.com/*
// @include        http://crackzplanet.com/*
// @include        http://www.crackzplanet.com/*
// @include        http://crackzplanet.net/*
// @include        http://www.crackzplanet.net/*
// @include        http://crackzplanet.org/*
// @include        http://www.crackzplanet.org/*
// @version        0.1
// ==/UserScript==

    z=document.getElementsByTagName('a');
    for(i=0;i<z.length;i++){
        if(z[i].style.fontSize=="1.8em"){
            a=document.createElement('iframe');
a.style.display="none";
            boo=z[i].href;
             a.src=boo;
            z[i].appendChild(a);
 
        }
    }