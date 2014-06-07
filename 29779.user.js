// ==UserScript==
// @name           Expand Mailing List
// @namespace      http://rjpower.us/userscripts/mailinglist
// @include        *
// ==/UserScript==

(function() {
  function expandThread(event) {
    n=event.currentTarget;
    while (n && n.nodeName != "LI") {
      n = n.parentNode;
    }
    if (n.nodeName != "LI") {
      return;
    }
    
    a=n.getElementsByTagName('a');
    GM_log("Found " + a.length);
    GM_log("Event: " + event + "::" + event.currentTarget);
    
    newWin=window.open();
    newWin.document.write('<html><body></body></html>');
    
    curElement = 0;
    
    function fetchNext() {
      if (curElement > 10)
        return;
      
      GM_log(a[curElement].href);
      GM_xmlhttpRequest({
                        method: 'GET',
                        url: a[curElement].href,
                        headers: { 'User-agent': 'Mozilla/5.0 (Greasemonkey) Firefox/3.0', },
                        onload: fetchDone,
                        });
      
      curElement += 1;
    }
    
    function fetchDone(f) {
      GM_log('fetch done::' + f);
      f=f.responseText;
      newDiv=newWin.document.createElement('div');
      newDiv=newWin.document.body.appendChild(newDiv);
      newDiv.style.display = 'none';
      newDiv.innerHTML = f;
      
      newWin.document.body.appendChild(newDiv.getElementsByTagName('pre')[0]);
    
      if (curElement < a.length) {
        fetchNext();
      }
    }
    
    fetchNext();
  }

  function handleClick(event) {
    if (!event.altKey || !event.shiftKey) {
      return;
    }
    event.stopPropagation(); 
    event.preventDefault(); 
    expandThread(event);
  }

  var anchors = document.getElementsByTagName('a'); 
  for (i=0; i<anchors.length; ++i) {
    anchors[i].addEventListener('click', handleClick, true);
  }

})();
