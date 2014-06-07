// ==UserScript==
// @name           Bing Image Link
// @include        http://www.bing.com/images/*
// @description    Bing Direct Link
// ==/UserScript==

function main()
{
    unsafeWindow._processCaptionSection = unsafeWindow.processCaptionSection;
    unsafeWindow.processCaptionSection = function(l,e,p,a)
    {
        var val = unsafeWindow._processCaptionSection(l,e,p,a);
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = val;
 
        var target_node = tempDiv.firstChild.firstChild.childNodes[1];
        var link_content = document.createTextNode(target_node.childNodes[2].innerHTML);
        
        var imglink = document.createElement('a');
        
        imglink.setAttribute('href', a.imgurl);
        imglink.appendChild(link_content);
        
        var span = document.createElement('span');
        span.appendChild(imglink);
        target_node.replaceChild(span, target_node.childNodes[2]);
       
        return tempDiv.innerHTML;
    }
}

main();
