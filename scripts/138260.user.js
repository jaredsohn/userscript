// Google Analytics Fullscreen Reports
// version 0.2 BETA!
// 2009-03-31
// Copyright (c) 2009, New Media Gateway
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Google Analytics Sort Custom Segments
// @namespace      tysonkirksey.com
// @description    Sorts the custom segments list for ease-of-use
// @include        http://www.google.com/analytics/*
// @include        https://www.google.com/analytics/*
// ==/UserScript==

//window.setTimeout(sortList, 3000);
window.addEventListener("load", bindnode, false);

window.setInterval(function(){
  var ul = bindnode();
	sortList(ul);
}, 5000);



//window.addEventListener("DOMSubtreeModified", bindnode);

bind_set = 0;
oUl = 0;


function swapNodes(item1,item2)
{
    var itemtmp = item1.cloneNode(1);
    var parent = item1.parentNode;
    item2 = parent.replaceChild(itemtmp,item2);
    parent.replaceChild(item2,item1);
    parent.replaceChild(item1,itemtmp);
    itemtmp = null;
		
		//console.log('swapping');
}

function bindnode()
{
    try
		{
		  test2 = document.evaluate('//*[text()="Custom Segments"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
			
  	  if(test2) 
  		{
  			oUl = test2.parentNode.children[1]; 
				return oU1;
  		}
		}
		catch(err)
		{
		  //bind_set = 0;
		}
}


function sortList(oUl)
{
  // Get the ul object
  //var nodeList = document.querySelectorAll(".D7");
  //var oUl = nodeList[1].getElementsByTagName("ul")[0];
	
	//var test2 = document.evaluate('//*[text()="Custom Segments"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
	
	if(test2)
	{
  	var oUl = test2.parentNode.children[1];
    
    /* Perform a Bubble Sort on the list items */ 
    for (var i=0 ; i<oUl.childNodes.length - 1 ; i++)
    {
       for (var j=i+1 ; j < oUl.childNodes.length ; j++)  
       {
         var x = oUl.childNodes[i];
         var y = oUl.childNodes[j];
  
				 
				 //textContent is a Firefox specific attribute that Chrome also supports
				 if( (x.textContent != 'undefined') && (y.textContent != 'undefined')  && (x.textContent>y.textContent))
         {
           swapNodes(oUl.childNodes[j],oUl.childNodes[i]);
				 }
       }
    }
	}
}



