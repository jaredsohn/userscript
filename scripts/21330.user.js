// ==UserScript==
// @name           Highlight Scolling
// @namespace      
// @description    Highlight previous part of document when scrolling
// @include        *
// ==/UserScript==

window.CC_div = null;
window.CC_oldtop = 0;
window.CC_count = 0;

window.CC_click = function(){
    window.CC_div.style.display = "none";
}
window.CC_init = function() {
    window.CC_oldtop = window.pageYOffset;
    window.CC_div = document.createElement('div');
    window.CC_div.style.backgroundColor = "#eeeeaa";
    window.CC_div.style.MozOpacity = 0.1;
    window.CC_div.style.position = "absolute";
    window.CC_div.style.left = "0px";
    window.CC_div.style.top = "100px";
    window.CC_div.style.width = "100%";
    window.CC_div.style.height = "100px";
    window.CC_div.style.display = "none";
    window.CC_div.style.borderTop = "1px solid #000000";
    window.CC_div.style.borderBottom = "1px solid #000000";
    document.body.appendChild(window.CC_div);
    window.CC_div.addEventListener('click', window.CC_click, false);
}
window.CC_checkScroll = function() {
    if(window.CC_div == null)
        window.CC_init();
        
    if(window.CC_oldtop != window.pageYOffset && window.CC_div.style.display == "none")
    {
        window.CC_div.style.top = window.CC_oldtop + "px";
        window.CC_div.style.height = window.innerHeight;
        window.CC_div.style.height = "100%";        
        window.CC_div.style.display = "block";
    }
    else if(window.CC_oldtop == window.pageYOffset && window.CC_div.style.display == "block" && window.CC_count == 0)
    {
        window.CC_count = 20;
    }
    else if(window.CC_count > 0)
    {
        if(window.CC_count == 1)
        {
	    window.CC_div.style.display = "none";
        }
        if(window.CC_oldtop == window.pageYOffset)
            window.CC_count--;
        else
            window.CC_count = 20;
    }
    window.CC_oldtop = window.pageYOffset;
}

window.setInterval(window.CC_checkScroll, 200);