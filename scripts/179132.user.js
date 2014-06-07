// ==UserScript==
// @name         hdfs-username-hack
// @version      0.1
// @description  Overrides the username to allow you to view HDFS files and directories from the NameNode web interface that aren't world readable
// @author       Keegan Witt
// @include      */browseDirectory.jsp*
// @include      */browseBlock.jsp*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  if (window.location.pathname.indexOf("/browseBlock.jsp") >= 0) {
    // override username when browsing files
    var username = window.location.href.split("%2Fuser%2F")[1].split("%2F")[0];
    if (window.location.href.indexOf("&user.name=" + username) < 0) {
      window.location.replace(window.location.href + '&user.name=' + username);
    }
  } else {
    // override username when browing directories
    var table = $("table > tbody").first();
    var rows = table.children();
    for (var i = 0, row; row = rows[i]; i++) {
      var username = $("b", $("td", row)[7]);
      var link = $("b > a", $("td", row)[0]);
      if (username.length > 0 && link.length > 0) {
        var _href = link.attr("href");
        link.attr("href", _href + '&user.name=' + username.text());
      }
    }
  }
}

// load jQuery and execute the main function
addJQuery(main);
