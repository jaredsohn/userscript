// ==UserScript==

// @name           Delicious.com - Show Unbundled
// @namespace      http://murklins.talkoncorners.net
// @description    On the page where you pick a bundle to edit, show the unbundled tags so you know what bundle to choose. Also, when you hover over an unbundled tag, show most recent link that has that tag.
// @include        https://secure.delicious.com/settings/tags/bundle
// ==/UserScript==

var tagcolor = "#1462C1";

// get the current account name
var scope = document.getElementById("currscope");
scope = scope.innerHTML;
fetchTags();
addGlobalStyle('#showunbundled_tagsdiv a {color:' + tagcolor + ';}');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function fetchTags() {
  GM_xmlhttpRequest({
    method: "GET",
    url: "https://secure.delicious.com/settings/tags/bundle/edit",
    onload: function(details) {
      
      // get the list of unbundled tags
      var bundled = "";
      var arr;
      var bundledRegex = new RegExp("<input type=\"hidden\" id=\"tagsInOtherBundles\" name=\"tagsInOtherBundles\" value=\"(.*?)\">","g");
      arr = bundledRegex.exec(details.responseText);
      if (arr) {
        bundled = arr[1];
      }
      
      // go through each tag and check to see if it is in a bundle already
      if (bundled != "") {
        bundled = " " + bundled + " ";
      }
      var tagsRegex = new RegExp("<div class=\"tagList\" id=\"alphacloud\">\\s*?<ul>([\\s\\S]*?)</ul>\\s*?</div>","g");
      var liTags = "";
      var tags = new Array();
      arr = tagsRegex.exec(details.responseText);
      if (arr) { 
        var count = 0;
        liTags = arr[1]; 
        var tagnameRegex = new RegExp("<label [\\s\\S]*?title=\"(.*?)\"[\\s\\S]*?>", "g");
        while(arr = tagnameRegex.exec(liTags)) {
          if (bundled.indexOf(" " + arr[1].toLowerCase() + " ") == -1) {
            tags[count] = arr[1];
            count++;
          }
        }
      }
      
      // insert the tags into a div in the page so we can preview what needs bundling
      if (tags && tags.length != 0) {
        var bundleList = document.getElementById("manageBundle");
        if (bundleList) {
          var p = bundleList.parentNode;
          var unbundledDiv = document.createElement("div");
          unbundledDiv.id = "showunbundled_tagsdiv";
          for (var i = 0; i < tags.length; i++) {
		        var a = document.createElement("a");
            a.innerHTML = tags[i];
            a.href = "http://delicious.com/" + scope + "/" + encodeURIComponent(tags[i]);
            a.id = i;
            unbundledDiv.appendChild(a);
            unbundledDiv.appendChild(document.createTextNode(" "));
            addHover(a, tags[i], i);
          }
          unbundledDiv.style.marginTop = "5px";
          unbundledDiv.style.textAlign = "justify";
          var h = document.createElement("h4");
          h.class = "editBundleTitle";
          h.innerHTML = "Unbundled Tags";
          h.style.paddingTop = "20px";
          h.style.clear = "both";
          p.insertBefore(unbundledDiv, bundleList.nextSibling);
          p.insertBefore(h, bundleList.nextSibling);
        }
      }
    }
  });
}

// add a display of the most recent link tagged with this tag when you hover over the tag link
function addHover(a, tag, count) {
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://feeds.delicious.com/v2/json/" + scope + "/" + encodeURIComponent(tag) + "?count=1",
    onload: function(details) {
      // Set up a <div> element to put the link in
      var linkDiv = document.createElement("div");
      linkDiv.setAttribute("id", "showunbundled_" + count);
      linkDiv.setAttribute("style",
                            "position: fixed; width: 400px; " +
                            "right: 10px; top: 10px; z-index: 9999; " +
                            "color:  #0a0a0a; background-color: #ffffcc;" +
                            "padding: 10px; text-align: left; " +
                            "border: thin solid black; display: none; " +
                            "-moz-border-radius: 5px;");
                      
      var posts = eval(details.responseText);
      var txt = document.createElement('p');
      if (details.responseText != "[]") {
        for (var i = 0, post; post = posts[i]; i++) {
          var tags = post.t.join(" ");
          tags = (tags) ? " (" + tags + ")" : "";
          var notes = (post.n) ? " - " + post.n : "";
          txt.innerHTML = "<b>" + post.d + "</b>" + notes + tags;
        }
      }
      else {
        txt.innerHTML = "No public posts.";
      }
      linkDiv.appendChild(txt);
      
      // Attach to the main document <body>
      var body = document.getElementsByTagName("body");
      body[0].appendChild(linkDiv);

      a.addEventListener("mouseover", 
        function(event) {
          var div = document.getElementById("showunbundled_" + this.id);
          div.style.display = "block";
        },
        false
      );

      a.addEventListener("mouseout", 
        function(event) {
          var div = document.getElementById("showunbundled_" + this.id);
          div.style.display = "none";
        },
        false
      );
    }
  });
}