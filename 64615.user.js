// ==UserScript==
// @name           No Monkey Talk!
// @namespace      blurg!
// @description    removes all posts that mention greasemonkey or whirlpool plus
// @include        http://forums.whirlpool.net.au/forum-replies.cfm?t=*
// ==/UserScript==

var trs=document.querySelectorAll('#replies>table>tbody>tr');
for(var i=0;i<trs.length;i++){
    var tcL=trs[i].textContent;
	var reginald= new RegExp(/Grease Monkey|Whirlpool plus|GreaseMonkey|Whirlpoolplus|wp+/gi);
    if(tcL.match(reginald)){
        trs[i].setAttribute('style','display:none;')
    }
}