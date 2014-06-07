// ShoryuenPostHider! example user script
// version 0.1 BETA!
// 2011-10-18
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
// @name ShoryuenPostHider
// @namespace http://diveintogreasemonkey.org/download/
// @description PumaPics!" on every page
// @include http://www.shoryuken.com/forum/index.php?threads/*
// @include http://*.shoryuken.com/forum/index.php?threads/*
// @include http://shoryuken.com/forum/index.php?threads/*
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
        
        _inputbox = document.createElement('input');
        _inputbox.setAttribute('id',"inputbox1");
        _inputbox.style.width = 150 + "px";
        
        _button = document.createElement('button');
        _button.setAttribute('id',"button1");
        _button.style.width = 100 + "px";
        _button.style.height = 30 + "px";
        
        document.getElementById("mainbox").appendChild(_inputbox);
        document.getElementById("mainbox").appendChild(_button);
    }

    create_div_dynamic_mainbox()
    document.getElementById("button1").innerHTML = "Hide";
    
    
    function fHidePostsof ()
    {
        var e=document.getElementsByTagName("li");
        var cnt =1;
        var sPostid=new Array();
        var sPostAuthor=new Array(); 
    
        for(var i=0;i<e.length;i++)
        {
            var tmp = e[i].getAttribute("id");
            var tmp1 = e[i].getAttribute("data-author");
            if (tmp != null)
            {
                sPostid [i] = tmp;
                sPostAuthor [i] = tmp1;
                var output = output + "i - "+tmp+ "-" + tmp1+"<br>";
                cnt++;
            }
        
        }
        
        postcnt = cnt;
        var sName = document.getElementById("inputbox1").value; //name to hide
        if (sName != "")
        {
                for(var i=1;i<postcnt;i++)
                {
                   if (sPostAuthor [i] == sName)
                   {
                        var idElemtohide = document.getElementById(sPostid [i]);
                        idElemtohide.style.visibility = 'hidden';
                   }   
                }
        }
        
    }
    
    //setting listening for onClick
    window.addEvent = function(event, target, method) 
    {
    	if (target.addEventListener) {
    		target.addEventListener(event, method, false);
    	} else if (target.attachEvent) {
    		target.attachEvent("on" + event, method);
    	}
    }
    
    var eleid_listn = document.getElementById("button1");
    addEvent("click",eleid_listn,fHidePostsof)