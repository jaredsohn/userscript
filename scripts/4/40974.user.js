// ==UserScript==
// @name           Unhide me!
// @description    makes hidden stuff visible, take google as a example. it has aloot of hidden stuff - not anymore
// @keywords           Unhide, visible, Show
// @resource      css http://www.hotlinkfiles.com/files/2283469_woakz/unhidemecss.css
// @include        *

// ==/UserScript==



var limited;
limited=document.evaluate(
'//input[@type="hidden"]',
document, 
null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0; i<limited.snapshotLength; i++)
limited.snapshotItem(i).setAttribute('type', 'visible');  


var limited;
limited=document.evaluate(
'//input[@"style", "display:none"]',
document, 
null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i=0; i<limited.snapshotLength; i++)
limited.snapshotItem(i).setAttribute("style", "display:all") ;  

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'html, body  {Display: all;}' +
'a, div  {Display: all;}' +
'head {Display: all;}' );