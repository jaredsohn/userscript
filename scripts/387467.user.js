// ==UserScript==
// @name        Gameblog Power Up Light - Firefox
// @namespace   gbpulight
// @description Customisation et amélioration de la partie Communauté de Gameblog.fr
// @include     http://www.gameblog.fr/communaute.php
// @version     1.1
// @grant       none
// @require     https://userscripts.org/scripts/source/145813.user.js

// ==/UserScript==

function GM_wait(){"undefined"==typeof unsafeWindow.jQuery?window.setTimeout(GM_wait,100):(jq=unsafeWindow.jQuery.noConflict(!0),letsJQuery())}function letsJQuery(){function t(){var t=GM_getValue("gb_hide_twitter",!1),i=jq("h2.rubrique").eq(2),n="#00ACEE";"true"==t&&(n="#C3C3C3");var o='&nbsp;<a style="text-decoration:none;" id="gbc_toogle_twitter"><span gbtitle="via Twitter" data-icon="t" style="cursor:pointer; color: '+n+'" title="Afficher les messages twitter"></span></a>';i.append(o),e(t)}function e(t){var e=jq(".statut");e.each(function(e){var i=jq(".statut").eq(e);t&&-1!=i.html().indexOf('<a href="http://www.twitter.com/')&&-1!=i.html().indexOf("@")||-1!=i.html().indexOf('<a href="http://search.twitter.com/')&&-1!=i.html().indexOf("@")||-1!=i.html().indexOf('<a href="http://www.twitter.com/')&&-1!=i.html().indexOf("#")||-1!=i.html().indexOf('<a href="http://search.twitter.com/')&&-1!=i.html().indexOf("#")?jq(".statut").eq(e).hide():jq(".statut").eq(e).show()})}t(),jq("#gbc_toogle_twitter").on("click",function(){"true"==GM_getValue("gb_hide_twitter",!1)?(console.log("ici"),GM_setValue("gb_hide_twitter",!1),jq("#gbc_toogle_twitter").find("span").css("color","#00ACEE"),e(!1,GM_getValue("gb_show_smiley",!1))):(console.log("là"),GM_setValue("gb_hide_twitter",!0),jq("#gbc_toogle_twitter").find("span").css("color","#C3C3C3"),e(!0,GM_getValue("gb_show_smiley",!1)))})}var jq,GM_JQ=document.createElement("script"),pendingRequests=0,worksPerPage=20;GM_JQ.src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js",GM_JQ.type="text/javascript",document.getElementsByTagName("head")[0].appendChild(GM_JQ),GM_wait();