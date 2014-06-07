// ==UserScript==
// @name           Nightly Build Thread Enhancements
// @namespace      http://pile0nades.wordpress.com/
// @description    Adds previous and next thread links to the nightly build threads
// @include        http://forums.mozillazine.org/viewtopic.php*
// ==/UserScript==


// page nav widget
var pageNav = get("//td[@id='main']/table[1]/tbody/tr[2]/td[@class='nav' and 2]/b");

// Is this the first page of a build thread?
if(
  document.title.indexOf("The Official Win32") == 0 &&
  (!pageNav.length || pageNav[0].innerHTML == "1")
) {
  // what type of thread is this?
  var thread = "trunk";

  // xPaths; x prefix means an xPath string
  var xPost = "//td[@id='main']/table[2]/tbody/tr[2]/td[@class='row1' and 2]/div[@class='postbody']";
  var xNextLink = "//div[@class='postbody']//a[contains(., 'This thread is closed, please use the')]";
  var xLastPage = "//td[@id='main']/table[1]/tbody/tr[2]/td[@class='nav' and 2]/a[contains(.,'Next')]";
  var xBugLists = xPost + "/span[@class='postbody']/span/ol";

  // section for prev/next links
  var links = document.createElement("div");
  links.style.display = "table";
  links.style.width = "100%";
  links.innerHTML = 
    "<div style='display: table-cell; text-align: left;'></div>" + 
    "<div style='display: table-cell; text-align: right;'></div>";
  var post = get(xPost)[0];
  post.insertBefore(links, post.firstChild);
  
  // previous thread link; there's not one currently
  links.firstChild.innerHTML = "&#171; no previous thread link"
  
  
  function addNextThreadLink(url) {
    links.lastChild.innerHTML = "<a href='" + url + "'><b>Next " + thread + " thread &#187;</b></a>";
  }
  
  // next thread link
  if(
    document.title.indexOf("is out") != -1 ||
    document.title.indexOf("won't be out") != -1
  ) {
    // look for the next thread link on this page, then the last page
    var nextLink = get(xNextLink);
    if(nextLink.length) {
      addNextThreadLink(nextLink[0].href);
    }
    else if(pageNav.length != 0) {
      var lastPageURL = get(xLastPage)[0].previousSibling.previousSibling.href;
      GM_xmlhttpRequest({
        method: 'GET', url: lastPageURL,
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/xml',
        },
        onload: function(responseDetails) {
          console.log(responseDetails.responseText);
          addNextThreadLink(responseDetails.responseText.split(/href=(?:"|')(.*?)(?:"|').*This thread is closed, please use the/i)[1]);
        }
      });
    }
  }
  else {
    // build not yet out
    links.lastChild.innerHTML = "build not yet out &#187;";
  }
  
  /***************************************************************/
  
  // make the rss feed link direct :)
  var rss = get(xPost + "//a[@href='http://pvanderwoude.com/feeds/rss_link.html']")[0];
  rss.href = "http://pvanderwoude.com/feeds/firefoxfeed.xml";

  /***************************************************************/

  // sort bug lists by component
  for(var i = 0, lists = get(xBugLists); i < lists.length; i++) {
    var bugs = [], list = lists[i].childNodes;
    for(var j = 0; j < list.length; j++) {
      if(!list[j].tagName || list[j].tagName.toLowerCase() != "li") continue;
      bugs.push(list[j]);
    }
    
    bugs.sort(function(a, b) {
      a = a.childNodes[1].nodeValue.replace(/^\s+|\s+$/, "").match(/^\[(.*?)\]-.*/)[1];
      b = b.childNodes[1].nodeValue.replace(/^\s+|\s+$/, "").match(/^\[(.*?)\]-.*/)[1];
      return a < b ? -1 : 1;
    });
    
    lists[i].innerHTML = "";
    for(var j = 0; j < bugs.length; j++) {
      lists[i].appendChild(bugs[j]);
    }
    
  }
}




// XPath function
function get(query) {
  var result = document.evaluate(query, document, null, 7, null);
  for(var i = 0, array = []; i < result.snapshotLength; i++) {
    array.push(result.snapshotItem(i));
  }
  return array;
}
