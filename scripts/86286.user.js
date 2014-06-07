// ==UserScript==
// @name           CFB logos wanted
// @namespace      http://gbacon.blogspot.com/greasemonkey/cfb-logos-wanted
// @description    Check team-logo page for unaffiliated users
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.reddit.com/r/CFB/comments/dahaz/get_your_team_logo_here_with_rules/
// ==/UserScript==

var abort = function(msg) {
  GM_log("Aborting: " + msg);
  alert(msg);
  throw msg;
};

var hasLogo = new Object();
var known = 0;
for (var i = 0; i < document.styleSheets.length; i++) {
  var href = document.styleSheets[i].href || "";
  if (href.indexOf("http://www.reddit.com/r/CFB/stylesheet.css") == 0) {
    var rs = document.styleSheets[i].cssRules;

    for (var j = 0; j < rs.length; j++) {
      var re = /\.author\[href\$="([^"]+)"\]/g;
      var match;
      while (match = re.exec(rs[j].selectorText)) {
        hasLogo[match[1]] = 1;
        ++known;
      }
    }
  }
}

if (known == 0)
  abort("can't read stylesheet!");

var missing = $("p.tagline a.author").map(function(i) {
  var name = this.innerHTML;
  if (!hasLogo.hasOwnProperty(name))
    return "<li><b>" + name + "</b></li>";
}).get().join("");

if (missing == "")
  missing = "<li><em>none!</em></li>";

$("#siteTable .usertext .usertext-body .md")
  .append("<p>TODO:<ul>" + missing + "</ul></p>");
