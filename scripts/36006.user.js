// ==UserScript==
// @name URL Elongator
// @author arty <me@arty.name>
// @namespace http://arty.name/
// @version 1.0
// @description  Expands urls shortened with tinyurl.com etc.
// @include *
// ==/UserScript==

(function(){

function hover(event) {
    var script, name, target = event.target;    

    target.removeEventListener('mouseover', hover, false);
    target.removeEventListener('focus', hover, false);

    name = 'c' + Math.random().toString().substring(2);
    (typeof unsafeWindow != 'undefined' ? unsafeWindow : window)[name] = function(data){
        if (data.error) return;
        target.href = data.result;
        target.innerHTML = data.result;
    }

    script = document.createElement('script');
    script.src = 'http://url-elongator.appspot.com/?url=' + encodeURIComponent(target.href) + '&callback=' + name;
    document.body.appendChild(script);
}

function attach(){
    for (var index = 0; index < document.links.length; index++) {
        var link = document.links[index],
    	    href = link.getAttribute('href');
        if (href && link.host != location.host && link.pathname.match(/^\/?\w+$/) && href.length < 30) {
    	    link.addEventListener('mouseover', hover, false);
    	    link.addEventListener('focus', hover, false);
    	}
    }
}

attach();
document.addEventListener('DOMNodeInserted', attach, false);

})();
