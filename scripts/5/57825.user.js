// ==UserScript==
// @name           Facebook | Reorder Sidebar
// @namespace      http://www.trelsdomain.org
// @description    Additional Reordering of Sidebar Home Items
// @include        http://*facebook.com/home.php*
// ==/UserScript==

// Based off the events on top


//Put Pokes above Suggestions (or if failing, above highlights)
if ((right=document.getElementById('home_sidebar')) && (events=document.getElementsByClassName('UIPokes')[0])) {
	if (placement=document.getElementsByClassName('pymk')[0])
	{
		placement=placement.parentNode.parentNode;
	}
	else
	{
    placement=document.getElementsByClassName('UIHotStream UIStream')[0];
  }
	
	//They seem to always break this, so I'm leaving both here and will switch as needed
	//right.insertBefore(events.parentNode.parentNode,placement.parentNode.parentNode);
	right.insertBefore(events.parentNode.parentNode,placement.parentNode);
}