// ==UserScript==
// @name           Facebook App Nuker
// @author         smb
// @namespace      www.gordonmurphy.co.uk
// @description    Nukes news feed stories about friends adding or removing applications.
// @include        http://*.facebook.com/home.php*
// ==/UserScript==

(function(){
  var offenders = document.evaluate("//div[contains(@class, 'app_install_story')]", document,
                    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if(offenders.snapshotLength > 0) {
    for(var i = 0; i < offenders.snapshotLength; i++) {
      var offender = offenders.snapshotItem(i);
      offender.parentNode.removeChild(offender);
    }
  }
})();