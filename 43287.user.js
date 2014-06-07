// ==UserScript==
// @name           Reddit Safe Comment Links
// @namespace      http://diehealthy.org/
// @description    Add a [domain.tld] link after links in comments.
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
  var IDed = $('.usertext-body');
  for (var i = 0; i < IDed.length; i++)
  {
    // get each usertext-body's anchors
    var anchorlist = IDed[i].getElementsByTagName("a");
    for (var j = 0; j < anchorlist.length; j++)
    {
      var current = anchorlist[j++];
      if (current.id.match("more") ||
          current.parentNode.className == "deepthread" ||
          current.href.match("mailto:"))
        continue;
      var domain = current.href;
      domain = domain.split("/");
//      domain = domain[0] + domain[1] + domain[2];
      var lbrack = document.createTextNode(' [');
      var rbrack = document.createTextNode('] ');
      var newanchor = document.createElement('a');
      newanchor.innerHTML = domain[2];
      newanchor.href = domain[0] + "//" + domain[2] + "/";
      newanchor.target = current.target;
      newanchor.className = 'safelink';
      current.parentNode.insertBefore(rbrack, current.nextSibling);
      current.parentNode.insertBefore(newanchor, rbrack);
      current.parentNode.insertBefore(lbrack, newanchor);
    }
  }
}
