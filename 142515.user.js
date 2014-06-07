// ==UserScript==
// @name       Unsafe Message Removal
// @namespace  ap/unsafemsg
// @version    1.0
// @description  Removes the following message "We are having some issues being marked as unsafe from browsers and Google search. You can read more about it HERE."
// @match          *://*.hackforums.net*
// @copyright  2012, Ap
// ==/UserScript==

var classToRemove="pm_alert";

var xp=document.evaluate("//*[@class='"+classToRemove+"']",document,null,6,null);

 var cur=xp.snapshotItem(0);
 cur.parentNode.removeChild(cur);
