/*

Searchlite v 0.1.1 User Script Port

Copyright (C) 2005, Tony Pisarra
http://sophiaknows.com/extensions/greasemonkey


This program is free software; it may be redistributed and/or modified under
the terms of the GNU General Public License as published by the Free Software
Foundation in either version 2 of the License, or, at the user's option, any later
published version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; including implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details.

BUGS:

    Fix conflict w/ inline JavaScripts whose source contains on or more of
    the searched term(s)

WISHLIST:

    Enable optional search statistics/navigation pallette

*/

// ==UserScript==
// @name          Searchlite
// @namespace     http://sophiaknows.com/extensions/userscripts
// @description   Adds coded highlighting to instances of searched terms found in a page accessed via search engines and site search utilities 
// @include       *
// @exclude       http://www.google.com/*
// @exclude       http://images.google.com/*
// @exclude       http://www.yahoo.com/*
// @exclude       http://search.msn.com/*
// @exclude       http://search.aol.com/*
// ==/UserScript==
// Notes:
// Created:   2005-06-15
// Issued:    2005-06-15
// Modified:  2005-06-26

(function() {
    window.addEventListener("load", function(e) {
        var bgcolors=new Array("#fcc","#ffc","#cff","#ddd");
        var pnames=new Array("q","p","query");
        var params=new Array();
        var swords=new Array();
        var swordstr='';
        var bstring=document.body.innerHTML;
        xtags=bstring.match(/<[^>]+>/g);
        bstring=bstring.replace(/<[^>]+>/g,'{T4G}');
        qparams=unescape(document.referrer).replace(/\+/g,' ').replace(/^.+\?/,'').replace(/ ?site: [^ ]+/g,"").split('&');
        for(i=0;i<qparams.length;i++) {
            k=qparams[i].split('=');
            params[k[0]]=k[1];
            }
        for(p=0;p<pnames.length;p++) { if(params[pnames[p]]) swordstr=params[pnames[p]]; }
        if(swordstr) {
            frases=swordstr.match(/\"([^\"]+)\"/g);
            swordstr=swordstr.replace(/\"[^\"]+\"/g,"");
            swords=swordstr.split(' ')
            if(frases) for(f=0;f<frases.length;f++) {swords[swords.length]=frases[f].replace(/\"/g,"");}
            for (i=0;i<swords.length;i++) {
                anchor="<span style=background:"+bgcolors[(29+i)%bgcolors.length]+">"+swords[i].toUpperCase()+"<\/span>";
                exp=eval("/"+swords[i]+"/ig");
                bstring=bstring.replace(exp,anchor);
                } 
            for(h=0;h<xtags.length;h++) {
                bstring=bstring.replace("{T4G}",xtags[h]);            
                }
            document.body.innerHTML=bstring;
            document.close();
            }  }, false);
    })();
