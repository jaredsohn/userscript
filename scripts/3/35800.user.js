// Based on Bez Thomas' "Del.icio.us: Bundle sorter"

// ==UserScript==

// @name           Delicious.com - Unbundled To Top
// @namespace      http://murklins.talkoncorners.net
// @description    Changes the tag bundle edit page to show unbundled tags at the top of the list. Also, when you hover over an unbundled tag, shows most recent link that has that tag.
// @include        https://secure.delicious.com/settings/tags/bundle/edit*
// ==/UserScript==

// get the current account name
var scope = document.getElementById("currscope");
scope = scope.innerHTML;

// Get all the bundled tags
var bundledTags = new Object();
var bundledTagsNode = document.getElementById('tagsInOtherBundles');
var bundledTags = bundledTagsNode.value;

// Grab the tag list and move the unbundled tags to the top of the alphalist
if (bundledTags != "") {	
	bundledTags = " " + bundledTags + " ";
	var tagDiv = document.getElementById("alphacloud");
	var tags = document.evaluate("ul/li", tagDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var firstBundled;
	for (var i = 0; i < tags.snapshotLength; i++) {
		var li = tags.snapshotItem(i);
		var tagValue = li.firstChild.childNodes[0].nodeValue;
		if (bundledTags.indexOf(" " + tagValue.toLowerCase()) != -1) {
			if (firstBundled == null) {
				firstBundled = li;
			}
		}
		else {	
			if (firstBundled != null) {
				var ul = li.parentNode;
				ul.removeChild(li);
				ul.insertBefore(li, firstBundled);
			}
			// all unbundled tags should react to mouseover events by displaying the most recent public link they are associated with
			addHover(li, tagValue.substr(0, tagValue.length - 1));
		}
	}
}

// add a display of the most recent link tagged with this tag when you hover over the unbundled tag
function addHover(li, tag) {
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://feeds.delicious.com/v2/json/" + scope + "/" + encodeURIComponent(tag) + "?count=1",
    onload: function(details) {
      // Set up a <div> element to put the link in
      var linkDiv = document.createElement("div");
      linkDiv.setAttribute("id", "unbundledtotop-" + tag.toLowerCase());
      linkDiv.setAttribute("style",
                            "position: fixed; width: 400px; " +
                            "right: 10px; top: 10px; z-index: 9999; " +
                            "color:  #0a0a0a; background-color: #ffffcc;" +
                            "padding: 10px; text-align: left; " +
                            "border: thin solid black; display: none; " +
                            "-moz-border-radius: 5px;");
                      
      var posts;
      try{
       posts = eval(details.responseText);
      }
      catch(er) {
      	GM_log(er);
      }
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

      li.addEventListener("mouseover", 
        function(event) {
        	var tagName = this.id.substr("input-".length);
          var div = document.getElementById("unbundledtotop-" + tagName);
          div.style.display = "block";
        },
        false
      );

      li.addEventListener("mouseout", 
        function(event) {
        	var tagName = this.id.substr("input-".length);
          var div = document.getElementById("unbundledtotop-" + tagName);
          div.style.display = "none";
        },
        false
      );
    }
  });
}