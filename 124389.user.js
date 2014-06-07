// ==UserScript==
// @name          Wikimedia+ for Chrome (localStorage)
// @description   Add History box at wikimedia's leftmost column
// @include       http://*.wikipedia.org/*
// @include       http://*.wikimedia.org/wiki/*
// @include       http://ssdl-wiki.cs.technion.ac.il/wiki/*
// @include       http://wiki.greasespot.net/*
// @include       *wiki*
// ==/UserScript==

/*
 * Original: http://userscripts.org/scripts/show/7877
*/

// Release notes
// =============
//        2011: Implemented GM_set/getValue for Chrome using localStorage (joey)
// 21-Mar-2007: Multiple occurrences of the same page (&edit, #section) eliminated
// 22-Mar-2007: Multiple occurrences due to a printable version of the page eliminated
// 24-Mar-2007: If no left column is present, exit quietly
// 31-May-2008: 
//    (a) Firefox 3.0 compatibility 
//    (b) Removed the edit links that were (by definition) part of the history
//    (c) Renamed the new box to "Wikimedia+"
// 19-Nov-2010: Updates to wikipedia's css style.

// BUG TODO: appears as a portal, but collapsing does not work
// DONE: ok added manual collapsing, but still some of the formatting looks different

// Fix for Chrome
// Check if GM_getValue is missing, OR is Chrome's "not supported" function.
var GM_test;
try {
	GM_test = ""+this.GM_getValue;
} catch (e) {
	// Greasemonkey: can't convert this.GM_getValue to primitive type
	// because: this.GM_getValue.toString is not a function
	// GM_log("Getting GM_test: "+e);
}
if (typeof GM_getValue !== 'function' || (""+GM_test).indexOf("not supported")>=0) {
	GM_log("[Wikimedia+] Adding localStorage implementation of GMget/setValue for Chrome.");
	if (localStorage) {
		this.GM_getValue=function (key,def) {
			return localStorage.getItem(key) || def;
		};
		this.GM_setValue=function (key,value) {
			localStorage.setItem(key, value);
			return value;
		};
	}
}

setTimeout(function()
{    
   var pref = "userscripts.org.wikimediaplus.history";
   var titleKey = pref + ".title.";
   var urlKey = pref + ".url.";
   var limit = 12;
   var read = function()
   {
      var r = new Array();
      for(var i = 0; i < limit; ++i)
      {
         var o = new Object();
         o.title = GM_getValue(titleKey + i, null);
         o.url = GM_getValue(urlKey + i, null);
         if(o.title == null || o.url == null)
            continue;
         if(o.title.length == 0 || o.url.length == 0)
            continue;
         r.push(o);
      }
      return r;
   };
   var store = function(a)
   {
      for(var i = 0; i < limit; ++i)
      {
         var o = a[i];
         if(!o)
         {
            o = new Object();
            o.title = "";
            o.url = "";
         }
         GM_setValue(titleKey + i, o.title);
         GM_setValue(urlKey + i, o.url);            
      }
   };
   var addHist = function(url, title, a)
   {         
      var o = new Object();
      o.url = url;
      o.title = title;
      a.unshift(o);
      var b = new Array();
      for(var i in a)
      {
         var o = a[i];
         var found = false;
         for(var j in b)
         {
            var p = b[j];
            if(p.url == o.url)
               found = true;
         }
         if(!found)
            b.push(o);
      }
      return b;         
   };
   var strValue = function(o) 
   {
      if(o)
        return o.toString();
      return "";
   }
   var normalizeUrl = function(loc) 
   {      
      return strValue(loc.protocol) + "//" + strValue(loc.hostname) 
         + strValue(loc.port) + strValue(loc.pathname) + strValue(loc.search);
   };
   var titleStr = document.title;
   var dash = titleStr.indexOf (' - ');
   titleStr = titleStr.substring(0,dash);
   var newHistoryItem = normalizeUrl(document.location);
   // Fix for when running alongside Joey's Reclaim CPU
   titleStr = titleStr.replace(/^[*#+.?] /,'');
   var hist = read();
   // GM_log("[Wikimedia+] Got "+hist.length+" recent entries.");
   if(document.location.search.indexOf("&action=edit") < 0 && document.location.search.indexOf("&printable=yes") < 0)
      hist = addHist(newHistoryItem, titleStr, hist);
   store(hist);
   function myEscape(str) {
      return str.replace('"','&quot;','g').replace('<','&lt;','g').replace('>','&gt;','g');
   }
   var listItem = function(href,name) { return '<li><a href="' + myEscape(href) + '">' + myEscape(name) + '</a></li>\n'; }
   var s = '<div class="portlet"><h5>Recent Pages</h5><div class="pBody"><ul>';
   for(var x in hist)
   {
      var o = hist[x];
      s += listItem(o.url, o.title);
   }
   s += '</ul></div></div>';
   var indentLaterLines = 'padding-left: 1.5em; text-indent: -1.5em;';
   var reduceSidebarFontSize = 'div#mw-panel div.portal div.body ul li { font-size: 0.8em; }';
   s += '<style type="text/css"> .pBody { font-size: 0.7em; } div.pBody li { list-style-image: none; list-style-type: none; list-style-position: outside; '+indentLaterLines+' } '+reduceSidebarFontSize+' </style>';
   var e = document.createElement ("div");
   e.innerHTML = s;
   e.id = "p-history";
   e.className = "portal expanded";
   var panel = document.getElementById("mw-panel") ||
      document.getElementById("column-one") || document.getElementById("panel")
      || document.getElementById("jq-interiorNavigation");
   if (panel) {
      panel.insertBefore(e,panel.getElementsByClassName("portal")[1]);
      e.getElementsByTagName("h5")[0].addEventListener("click",function(e){
            document.getElementsByClassName("pBody")[0].style.display = ( document.getElementsByClassName("pBody")[0].style.display ? '' : 'none' );
      },true);
   } else {
      GM_log("Found no sidebar to write to.");
   }
   // Uncomment next three lines if you want to remove the copy warning message from the bottom of the edit page
   // var warn = document.getElementById("editpage-copywarn");
   // if(warn) 
   //   warn.parentNode.removeChild(warn);

   function AppendCategoryTreeToSidebar() {
       try {
           var node = document.getElementById( "p-tb" )
                              .getElementsByTagName('div')[0]
                              .getElementsByTagName('ul')[0];

           var aNode = document.createElement( 'a' );
           var liNode = document.createElement( 'li' );

           aNode.appendChild( document.createTextNode( 'CategoryTree' ) );
           aNode.setAttribute( 'href' , 'http://en.wikipedia.org/wiki/Special:CategoryTree' );
           liNode.appendChild( aNode );
           liNode.className = 'plainlinks';
           node.appendChild( liNode );
           GM_log("AppendCategoryTreeToSidebar(): Added "+liNode+" to "+node);
       } catch(e) {
           // lets just ignore what's happened
          GM_log("Error in AppendCategoryTreeToSidebar(): "+e);
           return;
       }
   }

   AppendCategoryTreeToSidebar();

},2200);


