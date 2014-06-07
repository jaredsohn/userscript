// ==UserScript==
// @name         Gossamer Forum Direct Post Links
// @namespace    tag:Eule@dropzone.com,2006-08-05:greasemonkey-scripts
// @description  Adds direct links to each post in a Gossamer Forum web forum.
// @include      http://*.dropzone.com/*
// ==/UserScript==

// v0.1  2006-08-06
// First public version.  NO WARRANTY.  If it breaks you get to keep
// all the pieces.  Tested on dropzone.com and gossamer-threads.com .

(function()
  {
  var selectAllNodes = function(doc, context, xpath)
    {
    var nodes = doc.evaluate(xpath, context, null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var result = new Array( nodes.snapshotLength );
    for (var x=0; x<result.length; x++)
      {
      result[x] = nodes.snapshotItem(x);
      }
    return result;
    }

  var gossamerForumDirectLinkToPost =
    {
    addLinks: function()
      {
      // look for "Quote" links
      var quotelinks = selectAllNodes(document, document.body,
        "//a[contains(@href, 'gforum.cgi\?do=post_reply_write;quote=1;parent_post_id=')]");
      // GM_log("found " + quotelinks.length + " quote links\n");

      // for each quote link...
      for (var x=0; x<quotelinks.length; x++)
        {
        // use quote link URL to build direct link
        var numberplustrash = quotelinks[x].href.split("parent_post_id=")[1];
        var postnumber = numberplustrash.split(";")[0];

        var directurl = "http://" + quotelinks[x].host +
          quotelinks[x].pathname + "?post=" + postnumber + ";#" + postnumber;
        // GM_log("built direct URL '" + directurl + "'\n");

        // create the <a> for the direct link
        var newa = document.createElement('a');
        newa.setAttribute("href", directurl);
        var newtext = document.createTextNode('Direct Link');
        newa.appendChild(newtext);

        // insert the <a> into the document
        var parent = quotelinks[x].parentNode;
        parent.insertBefore(newa, quotelinks[x]);

        // insert the separator bar into the document
        var separator = document.createTextNode(' | ');
        parent.insertBefore(separator, quotelinks[x]);

        // GM_log("appended a\n");
        }
      }
    }

  gossamerForumDirectLinkToPost.addLinks();
  }
)();
