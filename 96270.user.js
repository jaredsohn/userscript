// roller.ru ignore script 4 subsilver theme
// version 0.1.5
// Copyright (c) 2010, Arthur Zalevsky, NickOne
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// -----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Roller.ru User Ignore", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Roller.ru User Ignore 
// @description   Ignore comments from certain users on roller.ru forum
// @include       http://*roller.ru/*
// ==/UserScript==

//TODO: option to ignore quoted posts by a user as well
//TODO: hide certain individual posts rather than just by user
//TODO: hide themes


// CP1251 to UTF8
// from http://www.snippy.ru/snippet/1141-perekodirovka-iz-windows-1251-i-koi-8-v-yunikod-javascript/

function win2unicode(str) {  
    var charmap   = unescape(  
       
"%u0402%u0403%u201A%u0453%u201E%u2026%u2020%u2021%u20AC%u2030%u0409%u2039%u040A%u040C%u040B%u040F"+ 
"%u0452%u2018%u2019%u201C%u201D%u2022%u2013%u2014%u0000%u2122%u0459%u203A%u045A%u045C%u045B%u045F"+  
"%u00A0%u040E%u045E%u0408%u00A4%u0490%u00A6%u00A7%u0401%u00A9%u0404%u00AB%u00AC%u00AD%u00AE%u0407"+  
"%u00B0%u00B1%u0406%u0456%u0491%u00B5%u00B6%u00B7%u0451%u2116%u0454%u00BB%u0458%u0405%u0455%u0457")  
    var code2char = function(code) {  
                if(code >= 0xC0 && code <= 0xFF) return String.fromCharCode(code - 0xC0 + 0x0410)  
                if(code >= 0x80 && code <= 0xBF) return charmap.charAt(code - 0x80)  
                return String.fromCharCode(code)  
             }  
    var res = ""  
    for(var i = 0; i < str.length; i++) res = res + code2char(str.charCodeAt(i))  
    return res  
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}  

//Get all messages
var elem = getElementsByClass("name", null, "span") ; 
//Users to ignore
var igList = new Array( "User1", "User2"  ) ;

//first table inludes all the page, so skip it
for ( var i=0; i < elem.length; i++ )
{
        var Nick = elem[i].innerHTML ;
        for ( var c=0; c < igList.length; c++ )
        {
		if (Nick.match(win2unicode(igList [c])))  
        	{
			var nodeToRemove = elem[i].parentNode.parentNode;
                        nodeToRemove.parentNode.removeChild(nodeToRemove.nextSibling.nextSibling) ;
                        nodeToRemove.parentNode.removeChild(nodeToRemove.nextSibling.nextSibling.nextSibling);
			nodeToRemove.parentNode.removeChild(nodeToRemove) ;
        	}
        }
}

//Get all messages
elem = document.getElementsByTagName('table') ; 
//first table inludes all the page, so skip it
for ( var i=1; i < elem.length; i++ )
{
        //nickname is located in [0;0] position
        var Nick = elem[i].rows[0].cells[0].innerHTML ;
        for ( var c=0; c < igList.length; c++ )
        {
		if ( !Nick.match('table') && (Nick.match('genmed') ) && Nick.match( win2unicode(igList[c]) ) )  
        	{
        		elem[i].parentNode.removeChild(elem[i]) ;
        	}
        }
}



