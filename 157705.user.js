// ==UserScript==
// @id             720p.eztv@bernstein.users.userscripts.org
// @name           eztv.it - Search torrentz.eu for 720p version
// @author         bernstein
// @description    Inserts a link triggering a torrentz.eu search for all non 720p episodes
// @homepage       https://userscripts.org/scripts/show/157705
// @updateURL      https://userscripts.org/scripts/source/157705.user.js
// @version        1.0
// @domain         eztv.it
// @include        http*://eztv.it/
// @include        http*://eztv.it/page_*
// @run-at         document-end
// @namespace      org.userscripts.users.bernstein
// @grant          GM_addStyle
// ==/UserScript==

GM_addStyle(".search720p :not(:first-child) { display: block; float: right; width: 16px; height: 14px; background: rgba(15, 127, 240,0.5); color: white; font-size: 90%; padding: 1px 1px 1px 2px; }"
        +   ".search720p :not(:first-child):hover { text-decoration: none; background: rgba(15, 127, 240,0.7); }"
        +   ".search720p :first-child { width: calc(100% - 20px); }");

let regex720p = new RegExp('.+720p.+','gi');
let regexName = new RegExp('(.+)(\\d\\d?x\\d\\d|S\\d\\dE\\d\\d).+','gi');
var nodes = document.querySelectorAll('table:nth-of-type(7) td:nth-child(2) a');

for(var i=0; i<nodes.length; i++)
{
    let n = nodes[i];
    
    if (n.textContent.match(regex720p)) continue;
    
    regexName.lastIndex = 0;
    let r = regexName.exec(n.textContent);
    if (r)
    {
        let e = document.createElement('a');
        e.setAttribute('href','https://torrentz.eu/search?f=720p+'+r[1]+'+'+r[2]);
        e.setAttribute('target','_self');
        e.textContent = "HD";
        n.parentNode.classList.add('search720p');
        n.parentNode.appendChild(e);
    }
}