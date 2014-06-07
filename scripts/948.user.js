// Fix Blockbuster Links
// version 0.1
// by: Mike E
// June 8, 2005
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
// select "Fix Blockbuster Links", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Blockbuster as of June 2005, uses <label></label> tags with javascript onclick events to handle navigation.
// This script replaces some crummy psuedo-anchor tags with true-anchor tags to enable user to view movie details in new tabs/windows.
// More info at http://www.geocities.com/myidiusetologintohere/greasemonkey/fixblockbuster
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Fix Blockbuster Links
// @namespace     http://www.geocities.com/myidiusetologintohere/greasemonkey/fixblockbuster
// @description	  Replaces some, but not all, navigational label-links with true anchor on Blockbuster.com to facilitate right-clicking and opening links in new windows/tabs.
//
// @include         http://*blockbuster.com/*
// ==/UserScript==

// todo: Fix the CSS class re-assignment since it doesn't seem to work.
// todo: Make it work with more types of flaky blockbuster links.


(function() {
//redo major worthless lable nav links and replace with anchors
var t=document.getElementsByTagName("label");
var IsReplaced = false;
var x = 0;
var numberOfLabelTags = t.length;
while(x <= numberOfLabelTags) 
{
	//alert(t.getAttribute("onclick"));
    //alert("x: " + x.toString() + " numberOfLabelTags: " + numberOfLabelTags.toString());
    try
    {
    
        var ele = t[x];
        
        if (!ele) 
        {
            break;
        }
        var a = document.createElement("a");    
        //a.className = ele.className;
        a.setAttribute("class",ele.getAttribute("class")); //this doesn't work for some reason. Don't care.
        a.innerHTML = ele.innerHTML;
        
        //alert(ele.innerHTML);
        
        var l = ele.getAttribute("onclick");        
    
        if (l)
        {
            if (l.indexOf("LoadMovieDetail")>0 || l.indexOf("MoreMovieDetails")>0)
                {
                    //link directly to the movie detail page
                    var movArry=l.split(",");
                    var movID = movArry[4].toString();
                    var startPoint = movID.indexOf("'")+1;
                    movID = parseInt(movID.substr(startPoint,100));
                    //alert(movID);
                    a.href="/catalog/DisplayMoreMovieProductDetails.action?movieID=" + movID.toString() + "&channel=Movies&subChannel=sub";            
                    IsReplaced = true;
                }
                else if (l.indexOf("href")>0)
                {
                    //fix a miscellaneous link
                    a.href=l.substr(15,l.length-17);            
                    IsReplaced = true;
                }    
        }

        if (IsReplaced)
        {
            //do the magic replace
            ele.parentNode.replaceChild(a,ele);
            IsReplaced = false;               
            numberOfLabelTags--; //we've got one less bad label
        }
        else
        {
            x++; //we've checked another label
        }

    }
    catch(e)
    {
        //alert("err " + t.id);
        x++;
    }
}

if (1==0)
{
    //remove the Movie Queue
    t=document.getElementsByTagName("img");
    x = 0;
    numTags = t.length;
    while(x <= numTags) 
    {
        var ele = t[x];
        
        if (!ele) 
        {
            //alert("broken");
            break;
        }
        
        //alert(ele.src);
        
        if (ele.src.indexOf("miniQ_top.jpg")>0)
        {
            //alert("found trash");
            //alert(ele.parentNode.parentNode.tagName);
            QueueTableNode = ele.parentNode.parentNode.parentNode.parentNode;
            QueueTableNode.style.display = "none";
            //alert(ele.parentNode.parentNode.parentNode.parentNode.tagName);        
            break;
        }
        x++;
    }
}


})
();
