// ==UserScript==
// @name       Enable Right Click For Any Site 
// @namespace  http://facebook.com/shivesh96
// @version    0.1
// @description  This script Remove Right click Restriction From All sites.
// @match      https://*/*
// @include    http://*/*
// @copyright  2013+, Shivesh96
// ==/UserScript==
function RRclick(){
    void(document.oncontextmenu=null);
}
RRclick();