// Created by: KingRufus
// ==UserScript==
// @name            Joystiq Cleaner
// @namespace       
// @description     Removes Joystiq ad blocks
// @include         http://*joystiq*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

(function() {

        els = document.getElementsByTagName( "div" );
        var i;
        for( i = 0 ; i < els.length ; i ++ )
        {
                if ( (els[i].getAttribute("id") == "linkscol") || (els[i].getAttribute("id") == "statscol") || (els[i].getAttribute("id") == "grid") || (els[i].getAttribute("id") == "outerslice") || (els[i].getAttribute("id") == "subcontent") ) 
                {
					els[i].parentNode.removeChild(els[i]);
					i--;
                }
        }

        els = document.getElementsByTagName( "iframe" );
        var i;
        for( i = 0 ; i < els.length ; i ++ )
        {
                if ( (els[i].getAttribute("class") == "medrect") || (els[i].getAttribute("class") == "bottomleader") || (els[i].getAttribute("class") == "topleader") || (els[i].src.indexOf("a.joystiq.com") >= 0) || (els[i].src.indexOf(".googlesyndication.com") >= 0) )
                {
					els[i].parentNode.removeChild(els[i]);
					i--;
                }
        }
	
addGlobalStyle('#container { min-width: 890px ! important; width: 95% ! important; background: #fff ! important; }');
addGlobalStyle('#content { width: 90% ! important; }');

})();

