// ==UserScript==
// @name           PassThePopcorn - thanks button
// @namespace      http://notsecret.dyndns.org
// @description    Add a thanks button to a page that automatically fills in the comment box with a customizeable message
// @author         p4lindromica
// @include	       http://*passthepopcorn.me/torrents.php?id=*
// @include        https://*passthepopcorn.me/torrents.php?id=*
//
// @date          07/25/2009
// @version       0.3
// @since         07/25/2009
// ==/UserScript==
//
// CHANGELOG
// 0.3 - 07/25/2009 - if not auto submit, jump to comment box on btn press
// 0.2 - 07/25/2009 - added option to auto-submit comment on pushing thanks btn
// 0.1 - 07/25/2009 - first version of script

GM_addStyle('#thxbtn {position: fixed; bottom: 10px; right: 10px; z-index: 1000;}');

// utility fn
function insertAfter(newElement,targetElement) {
  //target is what you want it to go after. Look for this elements parent.
  var parent = targetElement.parentNode;
  
  //if the parents lastchild is the targetElement...
  if(parent.lastchild == targetElement) {
    //add the newElement after the target element.
    parent.appendChild(newElement);
    } else {
    // else the target has siblings, insert the new element between the target and it's next sibling.
    parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

GM_registerMenuCommand('thx: Set Message', setVal);
GM_registerMenuCommand('thx: Set Auto-submit', setAuto);

function setVal() {
  GM_setValue('msg', prompt('Enter a message to be generated when clicking the thanks button'))
  location.reload(true);
}

function setAuto() {
  GM_setValue('autosubmit', confirm('Automatically submit comment upon pushing thanks button?'))
  location.reload(true);
}

var btn = document.createElement('div');
btn.id = "thxbtn";
// insert new div into DOM
insertAfter(btn, document.getElementById('quickpostform'));
// insert anchor
var anchor = document.createElement('a')
anchor.name='comment';
document.getElementById('quickpostform').parentNode.insertBefore(anchor, document.getElementById('quickpostform'))

var auto = '';

if (GM_getValue('autosubmit', false))
  auto = 'document.getElementById(\'quickpostform\').submit();'
else
  auto = 'window.location.hash=\'comment\'; '

btn.innerHTML = '<input value="Thanks!" type="button" onclick="document.getElementById(\'quickpost\').value=\''+
                GM_getValue('msg', 'Thanks for the upload!')+'\';'+auto+'">';
