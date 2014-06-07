// ==UserScript==
// @name           reddit.com - Lots More Children
// @include        *reddit.com/r/*/comments/*
// @include        *reddit.com/comments/*
// ==/UserScript==

function main(){
    $('.commentarea').prepend('<label for="amc" style=\"float:right\">autoload comments <input type=\"checkbox\" id=\"amc\" '+(localStorage.getItem('amc')=='true'?'checked ':'')+'/></label>');
    var w=window,r=w.rate_limit,c=$('#amc').click(function(){localStorage.setItem('amc',this.checked)})[0];
    w.rate_limit=function(a){if(a=='morechildren')return!1;return r(a)};
    $(w).scroll(function(){if(c.checked)var m=document.querySelectorAll('.morecomments>.button'),y=w.pageYOffset,h=w.innerHeight;for(i in m)if(y+h>m[i].offsetTop&&y<m[i].offsetTop)$(m[i]).click().removeClass('button')}).scroll()
}

var s=document.createElement('script');s.textContent="("+main.toString()+')()';document.head.appendChild(s);