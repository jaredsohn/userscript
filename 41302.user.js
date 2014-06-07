// ==UserScript==
// @name           RTM Cleanup
// @namespace      http://the-blair.com/greasemonkey
// @description    Cleans up the RTM interface bit by removing the cow logo, removing the online help box, and moving the status bar to the bottom of the page.
// @include        http://www.rememberthemilk.com/home/*
// @include        https://www.rememberthemilk.com/home/*
// ==/UserScript==

// Remove the RTM logo
var node = document.getElementById('appheaderlogo');
if(node)
{
   node = node.parentNode;
   node.parentNode.removeChild(node);
}

// Move the navigation links to the left
node = document.getElementById('topnav');
if(node)
{
   node.style.cssFloat = 'left';
}

// Remove the online help box
node = document.getElementById('onlinehelpwrap');
if(node)
{
   node.parentNode.removeChild(node);
}

// Remove padding at the top of the datetime
node = document.getElementById('datetime');
if(node)
{
   node.parentNode.style.paddingTop = '0 px';
}

// Move the status box to the bottom of the page
node = document.getElementById('statusbox');
if(node)
{
   node.parentNode.removeChild(node);
   var newParent = document.getElementById('content');
   newParent.appendChild(node);
}