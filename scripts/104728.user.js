// ==UserScript==
// @id             moreHelpfulLinks@amoe-tools
// @name           AMOE: More Helpful LInks
// @namespace      amoe-tools
// @author         Erik Vold <erikvvold@gmail.com> http://erikvold.com/
// @version        0.1.1
// @description    Adds even more helpful links
// @homepageURL    http://userscripts.org/scripts/show/104728
// @include        https://addons.mozilla.org/en-US/editors/queue/*
// @run-at         window-load
// ==/UserScript==

var bugsLink = "https://bugzilla.mozilla.org/buglist.cgi?list_id=488180&resolution=---&resolution=DUPLICATE&query_based_on=amo-editor-open&query_format=advanced&bug_status=UNCONFIRMED&bug_status=NEW&bug_status=ASSIGNED&bug_status=REOPENED&bug_status=VERIFIED&component=Admin%2FEditor%20Tools&product=addons.mozilla.org&known_name=amo-editor-open";
var creditsLink = "https://addons.mozilla.org/en-US/firefox/pages/credits";

(function() {
  var helpfulLinks = document.getElementById("helpfulLinks");
  if (!helpfulLinks) return;
  helpfulLinks.innerHTML += [
    '',
    '<a href="' + bugsLink + '">Bugs</a>',
    '<a href="' + creditsLink + '">Credits</a>'
  ].join(" | ");
})();
