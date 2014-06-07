// ==UserScript==
// @name           Allow Browser To Save Outlook Web Access Password
// @namespace      http://userscripts.org/users/79816
// @description    Disables the "autocomplete=off" attribute of the logon form to allow the browser to store the logon credentials
// @version        1.0.6
// @copyright      2012, ulrichb
// @include        http://*/CookieAuth.dll?GetLogon?*
// @include        https://*/CookieAuth.dll?GetLogon?*
// @include        http://*/exchweb/bin/auth/owalogon.asp*
// @include        https://*/exchweb/bin/auth/owalogon.asp*
// @include        http://*/owa/auth/logon.aspx*
// @include        https://*/owa/auth/logon.aspx*
// ==/UserScript==

(function () {
  function selectNodes(contextNode, xpathExpression) {
    var nodes = document.evaluate(xpathExpression, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var nodeArray = new Array(nodes.snapshotLength);
    
    for (var i = 0; i < nodeArray.length; i++)
      nodeArray[i] = nodes.snapshotItem(i);
    
    return nodeArray;
  }
  
  var xpath = "//input[(@autocomplete = 'OFF') or (@autocomplete = 'off')] | //form[(@autocomplete = 'OFF') or (@autocomplete = 'off')]";
  var nodes = selectNodes(document, xpath);
  
  for (var i = 0; i < nodes.length; i++) {
    //console.log('i:', i, 'elem:', nodes[i])
    nodes[i].setAttribute("autocomplete", "on");
  }
})();
