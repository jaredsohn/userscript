/* -*- javascript -*-
   Add a context-sensitive Google search box to Webmaster World.

   c. 2005 Jason Kirtland <lmnop@discorporate.us>
   (Perl) Artistic License / GPL dual license.  Go nutty.
   Version: 0.2 <2005-04-12>
*/
// ==UserScript==
// @name          Webmaster World Search Box
// @namespace     http://discorporate.us/gms
// @description	  
// @include       http://www.webmasterworld.com/forum*
// ==/UserScript==
(function() {
  var Util = { DEBUG : false, msgs: [] };
  Util.xpOne = function (path, context) {
    var root = context.document ? context.document : document;
    var res = null;
    try {
      res = root.evaluate(path, context, null,
                          XPathResult.FIRST_ORDERED_NODE_TYPE,
                          null);
      return res.singleNodeValue;
    }
    catch (e) {
      if (Util.DEBUG) {
        alert('error: xpOne(' + path + "):\n" + e.toString());
        throw e;
      }
    }
    return res ? res.singleNodeValue : null;
  };
  Util.addCSSRule = function(rule) {
    var css;
    if (! document.styleSheets.length) {
      css = document.createelement('style');
      css.type = 'text/css';
      css.media = 'all';
      document.getElementsByTagName('head')[0].appendChild(css);
    } else {
      css = document.styleSheets[document.styleSheets.length - 1];
    }
    css.insertRule(rule, css.cssRules.length - 1);
  };


  if (document.location.href.match(/forum=?78/))
    return;

  var searchBar = Util.xpOne('//center[2]//td[1]//tr[1]', document);
  if (! searchBar) return;

  Util.addCSSRule('.gmSearch form { display: inline; } ');
  Util.addCSSRule('.gmSearch input { opacity: 0.7; }');
  Util.addCSSRule('.gmSearch input:focus, .gmSearch input:hover { ' +
                  '  opacity: 1; } ');
  Util.addCSSRule('.gmSearch input[type=text] { font-size: 0.9em; ' +
                  '  border: solid #ccc 1px; padding: 0.1em;} ');
  Util.addCSSRule('.gmSearch label { font-size: smaller; ' +
                  '  white-space: nowrap; ' +
                  '  padding: 0 0.1em;} ');

  document.gmSearchBoxSubmit = function(form) {
    var q = 'site:webmasterworld.com ';

    var inputs = form.getElementsByTagName('INPUT');

    var inurl = 'forum';
    if (inputs.item(1).checked && 
        document.location.href.match(/forum=?(\d+)/))
      inurl += RegExp.$1;

    q += 'inurl:' + inurl + ' ';

    q += inputs.item(0).value;

    inputs.item(0).name = '';
    inputs.item(3).value = q;
    
    return true;
  };

  var buddy = document.createElement('td');
  buddy.className = 'gmSearch';
  buddy.vAlign = 'middle';
  buddy.align = 'right';

  buddy.innerHTML =
    '<form method="get" action="http://www.google.com/search" ' +
    '  onsubmit="return document.gmSearchBoxSubmit(this)">' +
     '<label>Search: ' +
       '<input type="text" size="26" name="qb"> ' +
      '</label>' + 
      '<label>' + 
      '<input type="radio" name="_t" value="f" checked="checked">' +
      '  This Forum' + 
      '</label> ' +
      '<label>' + 
      '<input type="radio" name="_t" value="a">' +
      ' All Forums' + 
      '</label>' +
      '<input type="hidden" name="q">' +
    '</form>';

    searchBar.appendChild(buddy);
})();
