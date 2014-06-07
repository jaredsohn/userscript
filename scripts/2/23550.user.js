// ==UserScript==
// @version 1
// @name Orkut community Go to Last Page on Reply
// @author  http://www.orkut.com/Profile.aspx?uid=8086585426266322848
// @namespace
// @description Navigates to last page by default when u reply on communities
// @include http://www.orkut.com/CommMsgs.aspx*&na=4
// ==/UserScript==

window.location.href = window.location.href.replace(/na=4/, 'na=2');
/********************************************************************
The script simply checks for na=4 at the end of url which is the default when u reply on a community. 
I didnt see any occasions where it is at the end.
It had some other variables appended after na=4 in other cases.
So i safely assume the include takes care of the urls and the script is fired only when u reply on the community.

********************************************************************/