// ==UserScript==
// @name          Mental health through ignorance
// @description   Hides any bloglines entry that includes chosen strings with 'view at your own risk' link that can be clicked to view ent\ry
// @namespace     http://deftcode.com/greasemonkey
// @include       http://www.bloglines.com/myblogs_display*

// All the clever stuff stolen directly from: http://sharedobject.org/greasemonkey/michaeljackson.reuters.user.js
// Blame for everything broken: Bill Stilwell (bill@marginalia.org)

// ==/UserScript==

(function() {
  // edit the following line to add/remove any strings that you would like ignored.
  // case will be ignored
  // you can be as fancy as you want to be if you're a regexp monkey
  var toMatch = ["michael jackson", "scott peterson"];
  var regexps = [];
  for(var i = 0; i < toMatch.length; i++) {
    regexps[i] = new RegExp(toMatch[i], "i");
    regexps[i].compile;
  }
  var divs = document.getElementsByTagName("div");
  for(var i = 0; i < divs.length; i++) {
    if(divs[i].id.match(/(siteItem\.\d+\.\d+)/)) {
      for(var j = 0; j < regexps.length; j++) {
	var match = regexps[j].exec(divs[i].innerHTML);
        if(match) {
          // uncomment the following line and comment the following two if you'd rather just hide entries entirely.
          // divs[i].style["display"] = "none";
          var orig = divs[i].innerHTML;
          divs[i].innerHTML = "<div><a onclick=\"javascript:document.getElementById('_gmHidden" + i + "').style.display = 'block'\">view '" + match[0] + "' at your own risk</a><div style=\"display: none\" id=\"_gmHidden" + i  +"\">" + orig + "</div></div>";
          break;
          }
      }
    }
  }
})();