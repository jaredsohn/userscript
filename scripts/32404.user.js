// ==UserScript==
// @name           Hacker News Filter
// @namespace      http:/adityamukherjee.com/geekaholic 
// @description    Filter "Hacker News" items by site slugs
// @include        http://news.ycombinator.com/*
// ==/UserScript==

window.addEventListener('load', function(){

list = ['techcrunch','gigaom', 'arstechnica']; /* EDIT LIST HERE */

/* DON'T CHANGE ANYTHING BELOW THIS UNLESS YOU KNOW WHAT YOU'RE DOING */
d = document.getElementsByTagName('span');
comhead = new Array();
for(i=0;i<d.length;i++){
    if(d[i].getAttribute('class') == 'comhead')
        comhead.push(d[i]);
}
for(i=0;i<comhead.length;i++){
    for(l=0;l<list.length;l++){
    console.log(list[l]);
        if(comhead[i].innerHTML.match(list[l])){
            a = comhead[i].parentNode.parentNode;
            a2 = a.nextSibling;
            a.parentNode.removeChild(a);
            a2.parentNode.removeChild(a2);
        }
    }
}

}, true);