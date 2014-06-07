// ==UserScript==
// @name           inboxRefresh
// @namespace      tf
// @include        https://*/owa/?ae=Folder&t=IPF.Note
// ==/UserScript==


var time= 5*60* 1000;
var timeout=0;
var reload = function()
{
    
    window.location=window.location;
}
timeout= window.setTimeout(reload,time);
