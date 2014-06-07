// ==UserScript==
// @name         AutoTOC
// @namespace    http://runeskaug.com/greasemonkey
// @description  Automatically creates a table of contents for all HTML-headers on a web page.
// @author       Rune Skaug (greasemonkey@runeskaug.com)
// @include      http://*
// @include      https://*
// @version      1.7.65
// @released     2005-07-06
// @updated      2006-12-25
// @compatible   Greasemonkey, Opera 8/9
//
// Change history (main changes):
//
// 1.0 - Basic version
// 1.1 - Adds Hide TOC button
// 1.2 - Only show visible headings (Firefox)
//     - Work around Firefox rendering bugs
//     - Adds Menu item: AutoTOC: Toggle display (Firefox)
// 1.3 - Sets a session cookie for TOC hiding (per domain)
// 1.4 - Disables adding of menu item.
//     - Choose your own string pattern to match (RXmatch)
// 1.5 - Minor adjustments for GM 0.6/FF1.5
//     - Moved closebutton to the left
//     - Flash on select
// 1.6 - Xpath search replaces treewalker, FF1,1.5,Opera9
// 1.7 - Minor fixes, screen-only stylesheet
// 
// @ujs:category browser: enhancements
// @ujs:published 2005-07-06 13:03
// @ujs:modified 2005-07-06 17:31
// @ujs:documentation http://userjs.org/scripts/browser/enhancements/auto-toc 
// @ujs:download http://userjs.org/scripts/download/browser/enhancements/auto-toc.user.js 
// @ujs:download.gm http://userjs.org/scripts/download/browser/enhancements/auto-toc.user.js
// ==/UserScript==


/* 
 * Creative Commons Attribution License
 * http://creativecommons.org/licenses/by/2.5/
 */

(function() {
  // text constants
  var fullTOCText = "Table of Contents";
  var hideBtnText = "\u00a0X\u00a0";
  var RXmatch = /^h[1-4]$/i; // regexp
  var XPmatch = "//h1|//h2|//h3|//h4"; // xpath
  //set the optional behaviour of the TOC box
  // if true, resets it to its initial state after you have selected a header - false does not reset it
  var resetSelect = true;
  // if true, shows a "Hide TOC"/close button on the left side of the bar
  var showHide = true;
  // if true, hides the TOC for all pages on current site
  var useCookie = true;
  // if true, adds menu item (Toggle TOC)
  var addMenuItem = true;

  function f() {
    //only on (X)HTML pages containing at least one heading - excludes XML files, text files, plugins and images (displayed using minimal HTML)
    if (document.getElementsByTagName("html").length && ( document.getElementsByTagName('h1').length || 
                                                          document.getElementsByTagName('h2').length || 
                                                          document.getElementsByTagName('h3').length || 
                                                          document.getElementsByTagName('h4').length ) 
                                                     && (!useCookie || (useCookie && getCookie('autotoc_hide')!='true'))) {
      var aHs = getHTMLHeadings();
      if (aHs.length>1) { // HTML document, more than one heading.
        var body = document.getElementsByTagName('body')[0];
        body.style.marginBottom = "24px !important";
        addCSS(
          '@media print { #js-toc {display: none; visibility: hidden; }}\n'+
          '@media screen { #js-toc {position: fixed; left: 0; right: 0; top: auto; bottom: 0; width: 100%; display: block; border-top: 1px solid #777; background: #ddd; margin: 0; padding: 3px; z-index: 9999; }\n'+
          '#js-toc select { font: 8pt verdana, sans-serif; margin: 0; margin-left:5px; background: #fff; color: #000; float: left; padding: 0; vertical-align: bottom;}\n'+
          '#js-toc option { font: 8pt verdana, sans-serif; color: #000; }\n'+
          '#js-toc .hideBtn { font: bold 8pt verdana, sans-serif !important; float: left; margin-left: 2px; margin-right: 2px; padding: 1px; border: 1px solid #999; background: #e7e7e7; }\n'+
          '#js-toc .hideBtn a { color: #333; text-decoration: none; background: transparent;} #js-toc .hideBtn a:hover { color: #333; text-decoration: none; background: transparent;} }'
        );
        // Browser sniff++ - due to rendering bug(s) in FF1.0
        var toc = document.createElement(window.opera||showHide?'tocdiv':'div');
        toc.id = 'js-toc';
        if (showHide) {
          var hideDiv = document.createElement('div');
          hideDiv.setAttribute('class','hideBtn');
          var hideLink = document.createElement('a');
          hideLink.setAttribute("href","#");
          hideLink.setAttribute("onclick",useCookie?"document.getElementById('js-toc').style.display = 'none'; document.cookie = 'autotoc_hide=true; path=/'; return false;":"document.getElementById('js-toc').style.display = 'none';");
          hideLink.appendChild(document.createTextNode(hideBtnText));
          hideDiv.appendChild(hideLink);
          toc.appendChild(hideDiv);
        }
        tocSelect = document.createElement('select');
        tocSelect.setAttribute("onchange", "if(this.value){function flash(rep,delay) { for (var i=rep;i>0;i--) {window.setTimeout('el.style.background=\"#ff7\";',delay*i*2);window.setTimeout('el.style.background=elbg',delay*((i*2)+1));};}; elid = this.value; el=document.getElementById(elid); elbg=el.style.background; location.href='#'+elid; flash(5,100);"+(resetSelect?"this.selectedIndex=0;}":"}"));
        tocSelect.id = 'toc-select';
        tocEmptyOption = document.createElement('option');
        tocEmptyOption.setAttribute('value','');
        tocEmptyOption.appendChild(document.createTextNode(fullTOCText));
        tocSelect.appendChild(tocEmptyOption);
        toc.appendChild(tocSelect);
        document.body.appendChild(toc);  
        for (var i=0,aH;aH=aHs[i];i++) {
          if (aH.offsetWidth) {
            op  = document.createElement("option");
            op.appendChild(document.createTextNode(gs(aH.tagName)+getInnerText(aH).substring(0,100)));
            var refID = aH.id ? aH.id : aH.tagName+'-'+(i*1+1);
            op.setAttribute("value", refID);
            document.getElementById("toc-select").appendChild(op);
            aH.id = refID;
          }
        }
      }
    }
  };
  
  function autoTOC_toggleDisplay() {
    if (document.getElementById('js-toc')) {
      // toc-bar exists
      if (document.getElementById('js-toc').style.display == 'none') {
        document.getElementById('js-toc').style.display = 'block'; 
        if (useCookie) {document.cookie = 'autotoc_hide=; path=/';}
      }
      else {
        document.getElementById('js-toc').style.display = 'none'; 
        if (useCookie) {document.cookie = 'autotoc_hide=true; path=/';}
      };
    } else {
      // toc-bar not created yet, clear hide-cookie and run main script
      if (useCookie) {document.cookie = 'autotoc_hide=; path=/';}
      f();
    }
  }
  
  function getHTMLHeadings() {
    function acceptNode(node) {
      if (node.tagName.match(RXmatch)) { if (node.value+''!='') { return NodeFilter.FILTER_ACCEPT; } }
      return NodeFilter.FILTER_SKIP;
    }
    outArray = new Array();
    // XPath
    if (document.evaluate) {
      var nodes = document.evaluate(XPmatch, document, null, XPathResult.ANY_TYPE, null);
      var thisHeading = nodes.iterateNext();
      var j = 0;
      while (thisHeading) {
        if (thisHeading.textContent+''!='') {
          outArray[j++] = thisHeading;
        }
        thisHeading = nodes.iterateNext();
      }
    }
    // document.getElementsByTagName - slow! :)
    else {
      var els = document.getElementsByTagName("*");
      var j = 0;
      for (var i=0,el;el=els[i];i++) {
        if (el.tagName.match(RXmatch)) outArray[j++] = el;
      }
    }
    return outArray;
  }
  function addCSS(css) {
      var head, styleLink;
      head = document.getElementsByTagName('head')[0];
      if (!head) { return; }
      styleLink = document.createElement('link');
      styleLink.setAttribute('rel','stylesheet');
      styleLink.setAttribute('type','text/css');
      styleLink.setAttribute('href','data:text/css,'+escape(css));
      head.appendChild(styleLink);
  }
  function gs(s){
    s = s.toLowerCase();
    var ret = "";
    for (var i=1; i<(s.substring(1)*1);i++) {
      ret = ret + "\u00a0 \u00a0 ";
    }
    return ret;
  }
  function getInnerText(el) {
    var s='';
    for (var i=0,node; node=el.childNodes[i]; i++) {
      if (node.nodeType == 1) s += getInnerText(node); 
      else if (node.nodeType == 3) s += node.nodeValue;
    }
    return s;
  }
  function getCookie(cname)
  {
  	var namesep = cname + "=";
  	var ca = document.cookie.split(';');
  	for(var i=0, c; c=ca[i]; i++)
  	{
  		c = c.replace(/^\s*|\s*$/g,"");
  		if (c.indexOf(namesep) == 0) {
    		return c.substring(namesep.length,c.length);
  		}
  	}
  	return null;
  }
  // main()
  if (!window.opera && addMenuItem) { 
    GM_registerMenuCommand('AutoTOC: Toggle display', autoTOC_toggleDisplay); 
  }
  f();
})();