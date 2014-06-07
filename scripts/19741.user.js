// ==UserScript==
// @name UseGoogleWebHistory
// @author mallowlabs
// @namespace http://mallowlabs.s206.xrea.com/
// @version 0.0.2
// @license public domain
// @description : Use Google Web History Without Installing Google Toolbar
// @published 2007-01-05
// @modified 2006-01-05
// @include *
// ==/UserScript==

// see also
// http://www.scss.com.au/family/andrew/opera/panels/pagerank/
// http://d.hatena.ne.jp/amatanoyo/20080104/1199450996
// =========================================
(function(){

    // avoid frame
    if (window.self != window.parent) return;

    var r=function(x,y){
        return Math.floor((x/y-Math.floor(x/y))*y+.1);
    },
    ch=function(url){
        url='info:'+url;
        var c=[0x9E3779B9,0x9E3779B9,0xE6359A60],i,j,k=0,l,f=Math.floor,
        m=function(c){
            var i,j,s=[13,8,13,12,16,5,3,10,15];
            for(i=0;i<9;i+=1){
                j=c[r(i+2,3)];
                c[r(i,3)]=(c[r(i,3)]-c[r(i+1,3)]-j)^(r(i,3)==1?j<<s[i]:j>>>s[i]);
            }
        };
        for(l=url.length;l>=12;l-=12){
            for(i=0;i<16;i+=1){
                j=k+i;c[f(i/4)]+=url.charCodeAt(j)<<(r(j,4)*8);
            }
            m(c);
            k+=12;
        }
        c[2]+=url.length;
        for(i=l;i>0;i--)
            c[f((i-1)/4)]+=url.charCodeAt(k+i-1)<<(r(i-1,4)+(i>8?1:0))*8;
        m(c);
        return'6'+c[2];
    };
    var url=document.location;

    /* create image element */
    new Image().src = 'http://www.google.com/search?client=navclient-auto&ch='+ch(url)+'&features=Rank&q=info:'+escape(url);
})();

