// PumaPics! example user script
// version 0.1 BETA!
// 2011-10-17
// Copyright (c) 2011, Lucca
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
// 
// 
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name PumaPics
// @namespace http://diveintogreasemonkey.org/download/
// @description PumaPics!" on every page
// @include http://www.shop.puma.co.uk/*
// @include http://*.shop.puma.co.uk/*
// @exclude http://diveintogreasemonkey.org/*
// @exclude http://www.diveintogreasemonkey.org/*



// ==/UserScript================================

//===================Predefined functions================================
 function _returnElemsByClass (elem,atthtml,cl)
    {
        var allDivs, thisDiv;
        var att = "//"+elem+"[@"+atthtml+"='"+cl+"']";
        allDivs = document.evaluate(att,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i = 0; i < allDivs.snapshotLength; i++) 
        {
        thisDiv = allDivs.snapshotItem(i);
        // do something with thisDiv
        return (thisDiv);
        
        }
    }

//=======================================================================
 //main Div for the content
 function create_div_dynamic_mainbox()
    {
        _mainbox = document.createElement('div'); // create dynamically div tag
        _mainbox.setAttribute('id',"mainbox");       //give id to it
        
        _mainbox.style.position="absolute";
        _mainbox.style.left= 20 + "px";
        _mainbox.style.top= 200 + "px";
        _mainbox.style.width = 240 + "px";
        _mainbox.style.height = 440 + "px";
        
        var _body = document.getElementsByTagName('body') [0];
        _body.appendChild(_mainbox);
    }

    
    
    
    
    
    
    var refNode = _returnElemsByClass ("div","class","productthumbnails");
    if (refNode != null)
    {
        
        var refNode_childs = refNode.childNodes;
        refNode_childs[3].setAttribute("id", "searchedul");
        
        var ulnodeid = document.getElementById("searchedul");
        var ulnodes = ulnodeid.childNodes;
        if (ulnodeid != null)
        {
          
           
        try
        {
           var links_output = "";
           var aLinks=new Array();
           var a=1;
           var i=1;
           for (i=0;i<=ulnodes.length;i++)
           {
                    //alert (ulnodes[i].tagName);
                    if (ulnodes[i].tagName == "LI")
                    {
                        myatt = "searched"+a;
                        ulnodes[i].setAttribute("id", myatt);
                        
                        aLinks[a] = document.getElementById(myatt).getAttribute("data-detailurl");
                        picDirectUrl_split = aLinks[a].split( '.jpg' );
                        aLinks[a] = picDirectUrl_split[0] + ".jpg";
                        links_output += " <h2> <a href= \" " + aLinks[a] + " \"> ViewPic" + a + "  </a></h2>" + "<br>";
                        
                        a++;
                    }
           }
        }
        catch(err)
          {
          //empty
          }
                
        }
            
            create_div_dynamic_mainbox()
            var link_cont = document.getElementById("mainbox");
            
            link_cont.innerHTML = links_output;       
            
            
        }
        
       
            

    