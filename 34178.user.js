// ==UserScript==
// @name           Danbooru Show Child Thumbnails
// @namespace      2345-Namespace
// @description    Show thumbnails of child posts
// @include        http://danbooru.donmai.us/post/show/*
// ==/UserScript==

/*
 * See if page has a .status-notice indicating child posts.
 * query API for children of the current post.
 * Add thumbnails to the status box for each child (excluding the parent post)
 *
 * Limitation - only the first 20 children are shown.
 *
 ****************************************************************************/

var danbooruURL = "http://" + window.location.host + "/post";
var danbooruQuery = "/index.json?";

var danbooruLogin = document.cookie.search("login=(.+?)(;|$)") != -1 ? document.cookie.match("login=(.+?)(;|$)")[1] : "";
var danbooruPasswordHash = document.cookie.search("pass_hash=(.+?)(;|$)") != -1 ? document.cookie.match("pass_hash=(.+?)(;|$)")[1] : "";

// Change this to true to show the child thumbnails by default.
var showThumbs = false;
var postID = document.location.pathname.match(/\/(\d+)\/?/)[1];

if (danbooruLogin && danbooruPasswordHash) {
  var statusNotice = null;
  statusNotice = document.evaluate('//div[@class="status-notice"][contains(., "This post has child posts.")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  if ( statusNotice && (statusNotice.textContent.indexOf("This post has child posts.")) ) {

    var showThumbsToggle = document.createElement("a");
    showThumbsToggle.textContent = showThumbs ? "Hide Tumbnails" : "Show Thumbnails";
    showThumbsToggle.href = "#";
    showThumbsToggle.addEventListener("click", function() {
        var childThumbs = document.getElementById("childThumbs")
        if (showThumbs && childThumbs) {
          // thumbs are currently displayed so hide them.
          childThumbs.style.display = "none";
          showThumbsToggle.textContent = "Show Thumbnails";
          showThumbs = !showThumbs;
        } else {
          if (childThumbs) {
            // if childThumbs already exists just display it.
            childThumbs.style.display = "block";
          } else {
            // childThumbs has not yet been created
            createChildThumbnails();
          }
          showThumbsToggle.textContent = "Hide Thumbnails";
          showThumbs = !showThumbs;
        }
      }, false);
    showThumbsToggle.style.display = "inline-block";
    statusNotice.appendChild(showThumbsToggle);
    if (showThumbs) {
      createChildThumbnails();
    }
  }
}

function createChildThumbnails() {
  var childThumbs = document.createElement("div");
  childThumbs.id = "childThumbs";
//  childThumbs.style.marginTop = "1em";
  statusNotice.appendChild(childThumbs);
  GM_xmlhttpRequest ({
    method: "GET",
    url: danbooruURL + danbooruQuery + "tags=parent:" + postID + "&login=" + danbooruLogin + "&password_hash=" + danbooruPasswordHash,
    onload: function(responseDetails) {
      var result = eval("(" + responseDetails.responseText+ ")");

      if (result["success"]==false) {
        console.debug(result["reason"]);
        return;
      }
      for ( var i=0; i<result.length; ++i ) {
        if (result[i].id == postID) {
        } else {
          var imgTag=null, aTag=null, spanTag=null;

          imgTag = document.createElement("img");
          imgTag.src = result[i]["preview_url"];
          imgTag.title = result[i]["tags"];
          switch (result[i]["rating"]) {
            case "s":
              imgTag.title += " Rating: Safe";
              break;
            case "q":
              imgTag.title += " Rating: Questionable";
              break;
            case "e":
              imgTag.title += " Rating: Explicit";
              break;
            default:
              break;
          }
          imgTag.title += " Score: " + result[i]["score"];
          imgTag.alt = imgTag.title;
          switch (result[i]["status"]) {
            case "flagged":
            imgTag.className = "preview flagged"
            break;

            case "pending":
            imgTag.className = "preview pending"
            break;

            case "deleted":
            imgTag.className = "preview deleted"
            break;

            default:
            imgTag.className = "preview"
            break;
          }
          if (result[i]["has_children"] === true) {
            imgTag.className += " has-children";
          }
          if (result[i]["parent_id"] !== null) {
            imgTag.className += " has-parent";
          }
          if (result[i]["preview_height"]) {
            imgTag.height = result[i]["preview_height"];
          }
          if (result[i]["preview_width"]) {
            imgTag.width = result[i]["preview_width"];
          }

          aTag = document.createElement("a");
          aTag.href = danbooruURL + "/show/" + result[i]["id"];

          spanTag = document.createElement("span");
          spanTag.className = "thumb rating-" + result[i]["rating"];
          spanTag.id = "p" + result[i]["id"];
          spanTag.style.height = "auto";
          spanTag.style.marginTop = "1em";

          aTag.appendChild(imgTag);
          spanTag.appendChild(aTag);
          childThumbs.appendChild(spanTag);
        }
      }
      var clearBreak = document.createElement("div");
      clearBreak.style.clear = "both";
      childThumbs.appendChild(clearBreak)
    },
    onreadtstatechange: function(responseDetails) {
    },
    onerror: function(responseDetails) {
      pending = false;
      console.debug(responseDetails);
    }
  });

}

function checkTagPresent(tag) {
  tag = tag.replace(/_/g, " ");
  tag = tag.replace(/'/g, "&apos;");
  tag = tag.replace(/"/g, "&quot;");
  return document.evaluate("//ul[@id='tag-sidebar']/li/a[text()='"+tag+"']", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
}
