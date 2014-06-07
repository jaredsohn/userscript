// ==UserScript==
// @name        Locationbar2-like url segments navigator
// @version     1.0
// @date        2008-06-15
// @author      Artemy Tregubenko <me@arty.name>
// ==/UserScript==

function(){
var container;
document.addEventListener('keyup', function(event){
        if (container) container.style.display = 'none';
}, false);
document.addEventListener('keydown', function(event){
        if (event.keyCode != 17) return;

        var parts = window.location.pathname.substring(1).split('/');
        var last = parts.pop();
        var links = [link(location.host, location.host)];
        for (var index = 0; index < parts.length; ++index) {
                links.push(link(location.host + '/' + parts.slice(0, index + 1).join('/') + '/', parts[index]));
        }
        if (last) links.push(link(location.host + location.pathname, last));

        if (!container) {
                container = document.body.appendChild(document.createElement('span'));
                container.style.cssText = 'position: fixed; top: 0px; left: 0px; opacity: .7; background: white; color: black; font-size: 16px; font-family: sans-serif; z-index: 100000;';
        } else {
                container.style.display = '';
        }
        container.innerHTML = links.join('/');

        function link(href, name){
                return '<a style="color: blue;" href="' + location.protocol+ '//' + href+ '">' + name + '</a>';
        }
}, false);
}();
