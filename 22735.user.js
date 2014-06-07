// ==UserScript==
// @name           ibdof author_series search
// @namespace      http://www.ibdof.com/
// @description    find  [author||series] enter (part of) name instead of letter choice & paging
// @include        http://www.ibdof.com/IBDOF-authorlist.php*
// @include        http://www.ibdof.com/IBDOF-serieslist.php*
// ==/UserScript==

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

  if (!document.getElementById('search_box')) {
    var n = document.getElementsByTagName('table')[2].getElementsByTagName('td')[0];
    n.style.display = 'none';
    var inp = n.appendChild(document.createElement('input'));
    inp.id = 'search_box';
    n.appendChild(n.getElementsByTagName('br')[0]);
    inp.size = '25';
    inp.style.marginLeft = '20px';
    n.style.display = 'block';

    addEvent(inp, "keydown", 
      function(e)	{
        if ( (e && e.keyCode == 13) || (window.event && window.event.keyCode == 13) ) {
          var targ = eventTarget(e);
          document.location = document.location.href.replace(/^(.*?\=).*/, '$1' + targ.value);
          if (e && e.preventDefault) e.preventDefault();
          else window.event.returnValue = false;
        }
    }, false);
  }
  
})();