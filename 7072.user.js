// title: Search Userscript.org
// version: .5
// created: 2006-01-12
// license: [url=GPL license]http://www.gnu.org/copyleft/gpl.html[/url]
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name          Search Userscript.org
// @namespace     http://www.bobpaul.org/userScripts/
// @include       http://*userscripts.org/*
// @description	  Adds dynamic search to all userscript.org pages.
// ==/UserScript==

// TODO: Use another insertation method so script can work on the "All" page
// TODO: Use own CSS so not dependant on Userscript.org styles
// TODO: Add an "X" to hide search results easily


(
   function () 
   {
    var searchExists = document.getElementById('search_div');
    if (searchExists) return; //there's already a search bar on this page

    if (location == "http://userscripts.org/scripts/list") return; //doesn't work on this page

    var mainContent = document.getElementById('content');
    if (!mainContent ) return;

    var newdiv = document.createElement('div');
    newdiv.setAttribute('id', 'search_div');

    newdiv.innerHTML = 
  '<div id="search_div">'+
  '<b>Search Scripts (live)</b>'+
  '<form action="/home/boring_search" id="search_form" method="get">'+
   '<span><input type="text" name="search" id="search" size="15" value="" /><img id="spinner" style="display:none" src="http://static.userscripts.org/images/spinner.gif" /></span>'+
  "</form>"+
  '<div id="search_results"></div>'+
   '<script type="text/javascript">'+
    "new Form.Element.Observer('search', 2, function(element, value) {new Ajax.Updater('search_results', '/home/search', {asynchronous:true, evalScripts:true, onComplete:function(request){document.getElementById('spinner').style.display='none'}, onLoading:function(request){document.getElementById('spinner').style.display='inline'}, parameters:value})})"+
   '</script>'+
  '</div>';

  var leftdiv = document.createElement('div');
  var rightdiv = document.createElement('div');
  rightdiv.setAttribute('id', 'right');
  leftdiv.setAttribute('id', 'left');

  var tempNodes=mainContent.childNodes;

  for(var i=0;i<tempNodes.length;i++)
  { 
    mainContent.removeChild(tempNodes[i]);
    leftdiv.appendChild(tempNodes[i]);
  }

  rightdiv.appendChild(newdiv);
  mainContent.appendChild(rightdiv);
  mainContent.appendChild(leftdiv);


  //mainContent.insertBefore(rightdiv, mainContent.firstChild);

  }
)();
