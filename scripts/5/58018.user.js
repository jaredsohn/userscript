// ==UserScript==
// @name           vBulletin forum open all spoilers
// @namespace      open_all_spoilers
// @description    Opens all spoilers in a forum. Requires special HTML code for spoiler (in comment in script source)
// @include        http://forum.the-west.sk*
// @author         Shulík
// ==/UserScript==

/*THE HTML CODE*/
/*Replace BB-code for spoiler with this HTML code:
<div class="spoiler"><input type="button" value="Open spoiler!" style="width:100px;font-size:12px;margin:10px;padding:0px;" onclick="var el=this.parentNode.getElementsByTagName('div');var display=(el[0].style.display=='none') ? 'block' : 'none'; el[0].style.display=display;var ibv=(display=='block') ? 'Close spoiler' : 'Open spoiler'; this.value=ibv;" />
<div class="spoiler_show" style="display: none; background-color:transparent; background-repeat:repeat; margin: 0px;border-style:solid;border-width:1px; padding: 4px; width:98%">
{param}</div></div> 
*/
/*Works in vBulletin, for another forums maybe has to be a bit edited.*/

var s=document.getElementsByClassName('spoiler');
for(var i in s){
var a=s[i];
if(typeof a=="object"){
a.getElementsByClassName('spoiler_show')[0].style.display="none";
a.childNodes[0].click();
}
}