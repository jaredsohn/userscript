(function() {

// ==UserScript==
// @name          usoCheckup - Otto Show Theme
// @namespace     http://userscripts.org/users/37004
// @description   Theme for usoCheckup that has no confirmation prompts and opens the script homepage on update
// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       0.0.9
// @exclude *
// ==/UserScript==

  if (typeof usoCheckup != "undefined")
    usoCheckup.widgets("alert", function(details) {
      var remoteVersion = parseInt(usoCheckup.lastValueOf("version", details.remoteMeta["uso"]));
      var localVersion = parseInt(usoCheckup.lastValueOf("version", usoCheckup.localMeta["uso"]));

      if (remoteVersion > localVersion)
        if (!details.mismatched && !details.unlisted)
          usoCheckup.openUrl(usoCheckup.updateUrl["show"]);
    });

})();
