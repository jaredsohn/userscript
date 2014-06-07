// ==UserScript==
// @name           iblist search4data
// @namespace      http://www.ibdof.com/
// @description    adds input boxes to nav links Author(Name), Book(Title||Author), Series(Name). Enter search term & press RETURN or CLICK nav link to go to "starting with" search results.
// @include        http://www.iblist.com/*
// ==/UserScript==

/**
CHANGELOG
  2008-01-30
    New:
      Now cross-browser - Tested in FF & IE7
      Added input size change when under focus
  2008-02-12
    Some code optimisation's
    Added Opera to browsers tested
  2008-06-23
    Increased font-size. FF3 too small
*/

(function() {

  /* x-browser event register */
  function addEvent(elm, evType, fn, useCapture) {
	if (elm.addEventListener) { elm.addEventListener(evType, fn, useCapture); return true; }
	else if (elm.attachEvent) { var r = elm.attachEvent('on' + evType, fn); return r; }
	else { elm['on' + evType] = fn; }
  }

  /* x-browser detection of event target */
  function eventTarget(e) {
    var targ;
    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug (from ppk) 
    return targ;
  }

  /* gets next Element node - ignores whitespace text nodes */
  function nextElement(node) {
    if(!node) { return null; }
    do { node = node.nextSibling; } while(node && node.nodeType != 1);
    return node;
  }

  /* gets previous Element node - ignores whitespace text nodes */
  function prevElement(node) {
    if(!node) { return null; }
    do { node = node.previousSibling; } while(node && node.nodeType != 1);
    return node;
 	}
  
  var a = document.getElementById('navigation').getElementsByTagName('a');
  for (var i = 0; i < a.length; i++) {
    if (a[i].href.match("list.php\\?type=(author|book|series)$")) {
      a[i].parentNode.style.lineHeight = '140%';
      var inp = a[i].parentNode.appendChild(document.createElement('input'));
      inp.size = '6';
      if (inp.addEventListener && !window.opera) {
        inp.style.fontSize = '11px';
        inp.style.height = '13px';
      } else {
        inp.style.fontSize = '9px';
        inp.style.height = '11px';
      }
      inp.style.position = 'absolute';
      inp.style.left = '85px';
      inp.style.verticalAlign = 'top';

      addEvent(inp, "focus", 
        function(e)	{
          eventTarget(e).size = '18';
      }, false);
      addEvent(inp, "blur", 
        function(e)	{
          eventTarget(e).size = '6';
      }, false);
      addEvent(inp, "keydown", 
        function(e)	{
          if ( (e && e.keyCode == 13) || (window.event && window.event.keyCode == 13) ) {
            var targ = eventTarget(e);
            var lnk = prevElement(targ);
            document.location = lnk.href + "&by=&genre=-1&key=" + targ.value;
          }
      }, false);
      addEvent(a[i], "click", 
        function(e) {
          var targ = eventTarget(e);
          var inp = nextElement(targ);
          if (inp.value > "")	{
            targ.href += "&by=&genre=-1&key=" + inp.value;
          }
      }, false);
    }
  }
})();