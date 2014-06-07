// ==UserScript==
// @name           Remove Google Knowledge Graph
// @version        1.1
// @description    Remove the Google Knowledge Graph
// @author         WayneXuan
// @copyright      2013+,WayneXuan
// @include        http?://www.google.*/*&q=*
// @include        http?://www.google.*/*?q=*
// ==/UserScript==

(function(gkgId){
    var gkg=document.getElementById(gkgId);
    if(gkg){
        gkg.parentNode.removeChild(gkg);
    }
}("rhs_block"));
