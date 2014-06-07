// ==UserScript==
// @name       Hyperlink selection
// @namespace  about:blank
// @version    0.1.2
// @description  enter something useful
// @include    http://*/*
// @copyright  2011+, MPGek
// ==/UserScript==

var removeHref = function(el) {
    if (el.tagName && el.tagName.toLowerCase() == 'a' && el.getAttribute('href')) 
    {
        var href = el.getAttribute('href');
        el.removeAttribute('href');
        el.onmouseout = function(e) 
        {
            var target = e.relatedTarget;
            while (target) 
            {
                if (target == this) 
                {
                    return false;
                }
                target = target.parentNode;
            }
            this.setAttribute('href', href);
            this.onmouseout = null;
        };
    }
    if (el.parentNode) 
    {
        removeHref(el.parentNode);
    }
};
document.onmouseover = function(e) 
{
    if (e.altKey)// && e.ctrlKey)
    {
        removeHref(e.target);
//        alert('The city of ');
    }
};