// ==UserScript==
// @name        Bing Images - Direct Link
// @namespace   discon-ns/
// @description Replaces the intermediary bing page with the direct link to the image. Enjoy.
// @include     http://*.bing.com/images/search?q=*
// @version     2
// @grant       none
// ==/UserScript==
function fixOne(el)
{
    var m = el.getAttribute("m");
    if (!m) return;

    // Can't use JSON, property names aren't quoted
    m = m.match(/imgurl:"([^"]+)"/);
    if (!m || m.length < 2) return;
    m = m[1];

    el.href = m;
    if ("dataset" in el)
        el.dataset["directlink"] = m;
    el.removeAttribute("onclick");
}

function nlwalk(nl, fn)
{
    var i, l = nl.length;
    for (i=0; i<l; i++)
        fn(nl[i]);
}

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mut) {
        if (mut.addedNodes) {
            nlwalk(mut.addedNodes, function(page) {
                nlwalk(page.querySelectorAll("* > div > .dg_u > a"), fixOne);
            });
        }
    });
});

function hook()
{
    var target = document.querySelector("#dg_c");
    if (target) {
        var nodes = target.querySelectorAll("* > .dg_b > div > .dg_u > a");
        nlwalk(nodes, fixOne);

        observer.observe(target, { childList: true });
        return true;
    }
    return false;
}

hook();
