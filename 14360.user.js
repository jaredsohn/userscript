// ==UserScript==
// @name          Endless Danbooru Pages
// @namespace     namespace-20071209
// @description   Makes danbooru pages infinitely long instead of limited to 20 posts per page by loading more when you scroll to near the bottom of the page.
// @author        ttfn
// @include       http://danbooru.donmai.us/post*
// ==/UserScript==
// Version 8

var mainTable = null;

var before_id = null;
var page_count = 0; 

var tagSearch = null;     // tags being searched for
var danbooruURL = "http://" + window.location.host + "/post";
var danbooruQuery = "/index.json?";
var pending = false;

var danbooruLogin = document.cookie.search("login=(.+?)(;|$)") != -1 ? document.cookie.match("login=(.+?)(;|$)")[1] : "";
var danbooruPasswordHash = document.cookie.search("pass_hash=(.+?)(;|$)") != -1 ? document.cookie.match("pass_hash=(.+?)(;|$)")[1] : "";

if (danbooruLogin && danbooruPasswordHash) {
  window.addEventListener("load", init, false);

  // check the scroll position when the window is scrolled
  window.addEventListener("scroll", testScrollPosition, false);

  // check position every 5 seconds
  setInterval(testScrollPosition, 5000);
}

function init() {
  mainTable = findMainTable(document);
  tagSearch = document.getElementById("tags").value;

  // paginator after 1000 pages becomes 
  //   « Previous Next »  
  // and switches to using the before_id= syntax (you give it an id number and
  // it gives you the twenty posts before that one, not including the id
  // number specified.

  // check for the presence of a next paginator (either ">>" or "Next »"
  // If it's there find the id of the last post on the page

  if ((document.evaluate("//div[@id='paginator']/div[@class='pagination']/a[text()='>>']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
      || (document.evaluate("//div[@id='paginator']/a[text()='Next »']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)) {
      before_id = Number(document.evaluate("//span[@class='thumb'][last()]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.id.replace(/^p/,""));
  }

  testScrollPosition();
}

function testScrollPosition() {
  if ((!pending) && ((window.innerHeight + window.scrollMaxY) - window.pageYOffset < 3.5 * window.innerHeight)) {
    // We're near the bottom of the page; one press of pgdn could get close to the bottom of the page.
    // (At about 1.9 * window.innerHeight, one press of pgdn would actually hit the bottom of the page.)
    pullMore();
  }
}

function pullMore() {
  GM_xmlhttpRequest ({
    method: "GET",
    url: danbooruURL + danbooruQuery + ((tagSearch != "") ? "tags=" + escape(tagSearch) + "&" : "") + "before_id=" + before_id + "&login=" + danbooruLogin + "&password_hash=" + danbooruPasswordHash,
    onload: function(responseDetails) {
      var result = eval("(" + responseDetails.responseText+ ")");

      if (result["success"]==false) {
        console.debug(result["reason"]);
        return;
      }

      // if a query returns 0 results we leave pending set to true, to stop any more requests going to the server.
      if (result.length > 0) {
        pending = false;
        page_count += 1;
      }

      for ( var i = 0; i<result.length; ++i ) {
        // check thumb isn't already displayed
        if (!document.getElementById("p" + String( result[i]["id"] ))) {
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
            imgTag.className = "preview flagged";
            break;

            case "pending":
            imgTag.className = "preview pending";
            break;

            case "deleted":
            imgTag.className = "preview deleted";
            break;

            default:
            imgTag.className = "preview";
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
          aTag.setAttribute("onclick", "return PostModeMenu.click(" + result[i]["id"] + ")" );

          spanTag = document.createElement("span");
          spanTag.className = "thumb rating-" + result[i]["rating"];
          spanTag.id = "p" + result[i]["id"];

          aTag.appendChild(imgTag);
          spanTag.appendChild(aTag);
          mainTable.appendChild(spanTag);

          // before_id will be the id of the last thumb added to the page.
          before_id = result[i]["id"];

          // add details to existing danbooru data structures and rerun blacklist
          unsafeWindow.Post.register( result[i] );
        }
      }
      // apply blacklists
      unsafeWindow.Post.apply_blacklists();

      // add a HR and page number every 200 thumbs (10 pages)
      if ((page_count % 10) == 0) {
        console.log("hr");
        var hrTag = null, hTag = null, a2Tag = null;

        hrTag = document.createElement("hr");
        hrTag.style.clear = "both";
        hTag = document.createElement("h2");
        a2Tag = document.createElement("a");
        a2Tag.href = danbooruURL + "?" + ((tagSearch != "") ? "tags=" + escape(tagSearch) + "&" : "") + "before_id=" + before_id;
        a2Tag.textContent = "Page " + String(page_count);

        mainTable.appendChild(hrTag);
        hTag.appendChild(a2Tag);
        mainTable.appendChild(hTag);
      }

      // call testScrollPosition again in case one page's worth of thumbs are not enough.
      testScrollPosition();
    },
    onreadtstatechange: function(responseDetails) {
    },
    onerror: function(responseDetails) {
      pending = false;
      console.debug(responseDetails);
    }
  });
  pending = true;

//  nextPage += 1;
}

function findMainTable(doc) {
  return doc.evaluate("//div[@id='post-list']/div[@class='content']/div[span[@class='thumb']]", doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}
