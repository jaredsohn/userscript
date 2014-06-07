// Youjizz Cleaner 0.1 (Beta)!
// version 0.1 BETA!
// 2011-10-11
// Copyright (c) 2011, Scu
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Youjizz Cleaner 0.1 (Beta)", and click Uninstall.
//
// Tested with: FireFox (+GreaseMonkey) / Chrome
//
// Features:
// 1) Removing banners and ads
// 2) Adding link for downloading video
//
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name YoujizzCleaner
// @description	Removing banners and ads; Adding download link at the video page
// @namespace http://diveintogreasemonkey.org/download/
// @include       http://*.youjizz.com/
// @include       http://*.youjizz.com/*
// @include       http://*.youjizz.com/videos/*
// @exclude http://diveintogreasemonkey.org/*
// @exclude http://www.diveintogreasemonkey.org/*



// ==/UserScript================================


    function hideElemsByClass (elem,atthtml,cl)
    {
        var allDivs, thisDiv;
        var att = "//"+elem+"[@"+atthtml+"='"+cl+"']";
        allDivs = document.evaluate(att,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i = 0; i < allDivs.snapshotLength; i++) 
        {
        thisDiv = allDivs.snapshotItem(i);
        // do something with thisDiv
        thisDiv.innerHTML = "";
        thisDiv.style.visibility = 'hidden';
        
        }
    }
    
    function AddIdElemsByClass (elem,atthtml,cl)
    {
        var allDivs, thisDiv;
        var att = "//"+elem+"[@"+atthtml+"='"+cl+"']";
        allDivs = document.evaluate(att,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i = 0; i < allDivs.snapshotLength; i++) 
        {
        thisDiv = allDivs.snapshotItem(i);
        // do something with thisDiv
        var myatt = "elem" + cl + i;
        thisDiv.setAttribute('id',myatt);
        
        }
    }
    
    function modifyElemsByClass (elem,atthtml,cl)
    {
        var allDivs, thisDiv;
        var att = "//"+elem+"[@"+atthtml+"='"+cl+"']";
        allDivs = document.evaluate(att,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i = 0; i < allDivs.snapshotLength; i++) 
        {
        thisDiv = allDivs.snapshotItem(i);
        // do something with thisDiv
        
        
        }
    }
    
    
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
    
    function removeChildElements (elemId)
    {
                var cell = document.getElementById(elemId);
        
            if (cell != null)
            {
                if ( cell.hasChildNodes() )
                {
                    while ( cell.childNodes.length >= 1 )
                    {
                        cell.removeChild( cell.firstChild );       
                    } 
                }
            }
            
    }

//===================End of Predefined functions===============================================================================================

//Appending style sheet ************************************************************************************************
    function appendStyle(styles) {
    var css = document.createElement('style');
    css.type = 'text/css';

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));

    document.getElementsByTagName("head")[0].appendChild(css);
    }
    //*********************************************************************************************************************

//hiding the unwanted elements on the page
    var no_of_elems=10;
    var sElemId=new Array();
            sElemId[1] = "baner_top";
            sElemId[2] = "pageflip-111";
            sElemId[3] = "right-ad111";
            sElemId[4] = "right11";
            sElemId[5] = "wrap";
            sElemId[6] = "fotter1111";
            sElemId[7] = "fotter2-111";
            sElemId[8] = "tbFrame";
            sElemId[9] = "closeArea-111";
            sElemId[10] = "smimad";
            sElemId[10] = "chatWindow111";
            sElemId[11] = "taskbar";
    var i=0;
    while(i<12){
    
        var target_elem =  document.getElementById(sElemId[i]);
        if (target_elem!= null)
        {
            target_elem.style.visibility = 'hidden';
        }
        i++;
    }
    //removing content of the divs
    //1 footer
    var searched_elem = document.getElementById("fotter");
           if (searched_elem != null)
           {
                removeChildElements ("fotter");
           }
    //2top
     var searched_elem = document.getElementById("top");
           if (searched_elem != null)
           {
                removeChildElements ("top");
                searched_elem.style.height = 0 +"px";
           }
    //3chatwindow
     var searched_elem = document.getElementById("chatWindow");
           if (searched_elem != null)
           {
                removeChildElements ("chatWindow");
                searched_elem.style.height = 0 +"px";
                searched_elem.style.width = 0 +"px";
           }
    //4taskbar
    var searched_elem = document.getElementById("taskbar");
           if (searched_elem != null)
           {
                removeChildElements ("taskbar");
                searched_elem.style.height = 0 +"px";
                searched_elem.style.width = 0 +"px";
           }
    //5taskbar
    var searched_elem = document.getElementById("closeChatArea");
           if (searched_elem != null)
           {
                removeChildElements ("closeChatArea");
                searched_elem.style.height = 0 +"px";
                searched_elem.style.width = 0 +"px";
           }
     //6fotter2
    var searched_elem = document.getElementById("fotter2");
           if (searched_elem != null)
           {
                removeChildElements ("fotter2");
                searched_elem.style.height = 0 +"px";
                searched_elem.style.width = 0 +"px";
           }
     //7pageflip
    var searched_elem = document.getElementById("pageflip");
           if (searched_elem != null)
           {
                removeChildElements ("pageflip");
           }
     //8closeArea
    var searched_elem = document.getElementById("closeArea");
           if (searched_elem != null)
           {
                removeChildElements ("closeArea");
                searched_elem.style.height = 0 +"px";
                searched_elem.style.width = 0 +"px";
           }
    
    //marking second part of main table    
    //removing all the data from the 2nd td
    if (document.getElementsByTagName("table")[0] != null)
    {
        document.getElementsByTagName("table")[0].setAttribute("id","maintable");
        
        var table = document.getElementById("maintable");   
        var cells = table.getElementsByTagName("td"); 
        
        //alert (cells[1]); 
        if (cells[1] != null)
        {
            cells[1].setAttribute("id","searchedtd");
            
            removeChildElements ("searchedtd");
            document.getElementById("searchedtd").setAttribute("width","0");
        } 
    }

//executing if at the videopage

    //checing the url of the page 
    pathArray1 = window.location.pathname.split( '/' );
    if (pathArray1[1] == "videos")
    {    
           AddIdElemsByClass ("div","class","row");
           var elem1 = document.getElementById("elemrow0");
           if (elem1 != null)
           {
                removeChildElements ("elemrow0");
                elem1.setAttribute("class", "null");
                elem1.style.margin = 0+"px";
                elem1.style.visibility = 'hideen';
           }
           
           var elem1a = document.getElementById("elemrow1");
           if (elem1a != null)
           {
                removeChildElements ("elemrow1");
                elem1a.setAttribute("class", "null");
                elem1a.style.margin = 0+"px";
                elem1a.style.visibility = 'hideen';
           }
           
           AddIdElemsByClass ("div","class","contener");
           var elem2 = document.getElementById("elemcontener1");
           if (elem2 != null)
           {
                removeChildElements ("elemcontener1");
           }
           
           
            // -id opis -> removing iframe + preparing container for link
            var searched_elem = document.getElementById("opis");
           if (searched_elem != null)
           {
                var myid = "r1";
                searched_elem.childNodes[1].setAttribute('id',myid);
                searched_elem.removeChild(document.getElementById("r1"));
                
                
                searched_elem.style.height = 55 +"px";
                searched_elem.style.width = 704 +"px";
                
                var cont_to_write = document.getElementById("video_text");
                
                dv = document.createElement('div'); // create dynamically div tag
                dv.setAttribute('id',"span_link");       //give id to it
                dv.className="span_link"; 
                cont_to_write.appendChild(dv);
                
           }
           
           //player settings and downloadlink
           var player = document.getElementById("xmoov-flv-player");
           
           var player_sett = player.getAttribute("flashvars");
           var aPosition = player_sett.indexOf("http://media");
           var movie_link = player_sett.substring(aPosition);
           
           var link_cont = document.getElementById("span_link");
           link_cont.innerHTML = " <h2> <a href= \" " + movie_link + " \"> Download Video  </a></h2>";
           //alert (movie_link);
     
     
            // ****** Setting styles
            var styles = ' .span_link { color: #ffffff;width: 200px;height:70px;text-align: left;float:left;margin-left:30px;}';
            //styles += ' .span_link { color: #333; text-align: left; }';
     
           //setting listening for onClick
            window.addEvent = function(event, target, method) 
            {
            	if (target.addEventListener) {
            		target.addEventListener(event, method, false);
            	} else if (target.attachEvent) {
            		target.attachEvent("on" + event, method);
            	}
            }
            
            addEvent("load",window,appendStyle(styles));          
    }