// ==UserScript==
// @name           My Toodledo
// @namespace      1
// @description    open note link in new page
// @include        http://www.toodledo.com/*
// ==/UserScript==

document.getElementsByClassName = function(cl) 
{
    var retnode = [];
    var myclass = new RegExp('\\b'+cl+'\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) 
    {
        var classes = elem[i].className;
        if (myclass.test(classes)) 
            retnode.push(elem[i]);
    }
    return retnode;
}; 

//Let all links in note will open in new tab/page.
cls = document.getElementsByClassName('note');
for (i =0;i<cls.length;i++) 
{ 
    links= cls[i].getElementsByTagName('a');
    for(j=0;j<links.length;j++) 
    { 
        links[j].target='_blank'; 
    } 
}