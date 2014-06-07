// ==UserScript==
// @name           bt
// @description    Notified about attack using HTML5 notifier
// @author         min
// @namespace      yk_notifier
// @include        https://apps.facebook.com/lookandroll/*
// @include 	   https://jocfb.looktv.ro/*
// @include		   https://apps.facebook.com/starbt_game/*
// @version        0.1
// @grant 			
// ==/UserScript==
//
//

var items = new Array();
var itemClicked;

window.onload=function()
{
	console.log("LOAD COMPLETE");

	var elJ = document.getElementsByClassName("block");
    for (var i=0;i<elJ.length;i++) 
    {
        elJ[i].addEventListener('click', onItemsClick,false);
       
    }
}

function onItemsClick(e)
{
	console.log("ON ITEM CLICK: " + e.target.innerHTML);

	if(itemClicked && e.target.innerHTML == itemClicked.value)
	{
		itemClicked = null;
		console.log("click din interior!!!")
		return;
	}

	if(chechIfSame2Opened())
	{
		console.log("SAME OPENED!!!");
		return;
	} 

	var ok = true;
	for(i = 0; i<items.length; i++)
 	{
 		if(items[i].id == e.target.style.background-position && items[i].value == e.target.innerHTML)
 		{
 			ok = false;
 			console.log("ITEM ALREADY IN ITEMS: " + items[i].value + " : " + items.length);
 		}
 	}

 	if(ok) items.push({item : e.target, id : e.target.style.background-position, value : e.target.innerHTML, event : e});
	
	
	checkMatching();
}

function checkMatching()
{
 	for(i = 0; i < items.length - 1; i++)
 	{
 		for(k = i + 1; k < items.length; k++)
		{
		 	if(items[i].id == items[k].id)
		 	{
		 		if(k<i)	simulateClick(k);
		 		if(i<k) simulateClick(i);
		 		return;
		 	}
		}
 	}
}

function checkIf2Opened()
{
	var ok = 0;

	var elJ = document.getElementsByClassName("block");
    for (var i=0;i<elJ.length;i++) 
    {
        if(elJ[i].style != "")
        {
        	ok++;
        } 
    }

    if(ok == 2)
    {
		console.log("two opened");
		return true;
	}

	console.log("one opened");
    return false;
}

/**
*/
function chechIfSame2Opened()
{
	var elJ = document.getElementsByClassName("block");
    for(i = 0; i < elJ.length - 1; i++)
 	{
 		for(k = i + 1; k < elJ.length; k++)
		{
		 	if(elJ[i].styl != "" && elJ[i].style.background-position == elJ[k].style.background-position && elJ[i].style.background-position != "")
		 	{
		 		return true;
		 	}
		}
 	}

    return false;
}

function removeItemAndCorespondentFromItems(item)
{
	console.log("remove1: " + items.length);
	for(i = 0; i<items.length; i++)
 	{
 		if(item.id == items[i].id)
 		{
 			items.splice(i, 1);
 		}
 	}
 	console.log("removed: " + items.length);
}

function simulateClick(val1)
{
	setTimeout(clickitem, 50, val1);
}

function clickitem(e)
{
	if(checkIf2Opened()) 
	{
		console.log("111: " + items[e].id);
		//items[e].item.style.background = items[e].id;
		items[e].item.style.opacity = 0.3;
	}else
	{
		itemClicked = items[e];

		console.log("222");
		var evt = document.createEvent("MouseEvents"); 
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
		items[e].item.dispatchEvent(evt);

		removeItemAndCorespondentFromItems(items[e]);
	}
}




