// ==UserScript==
// @name         Gossamer Forum Profile In Reply
// @namespace    tag:Eule@dropzone.com,2006-08-05:greasemonkey-scripts
// @description  Adds link to original author's profile when replying to posts.
// @include      http://*.dropzone.com/*
// ==/UserScript==

// v0.1   2006-08-06
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

  var gossamerForumAddProfileLink =
    {
    addLink: function(mainURL)
      {
      // look for the Subject: text box
      var subjectbox = selectAllNodes(document, document.body,
        "//input[contains(@name, 'post_subject')]");
      // GM_log("found " + subjectbox.length + " subject boxes\n");

      // for each Subject box...
      for (var x=0; x<subjectbox.length; x++)
        {
        // skip non-subject boxes (rare, but possible?)
        if(!subjectbox[x].value.match("Re: [[]"))
          {
          continue;
          }

        // GM_log("subject box text '" + subjectbox[x].value + "'\n");

        // use text of subject box to build profile link
        var nameplustrash = subjectbox[x].value.split("[")[1];
        var name = nameplustrash.split("]")[0];
        var profileurl = mainURL + "?username=" + name + ";";
        // GM_log("built profile URL '" + profileurl + "'\n");

        // create the <a> for the profileurl link
        var newa = document.createElement('a');
        newa.setAttribute("href", profileurl);
        newa.setAttribute("target", "_blank");
        newa.setAttribute("style", "color: white");
        var newtext = document.createTextNode("(Profile for " + name + ")");
        newa.appendChild(newtext);

        // insert the <a> into the document
        var parent = subjectbox[x].parentNode;
        parent.insertBefore(newa, subjectbox[x].nextSibling);

        // insert a separator into the document
        var separator = document.createTextNode(' ');
        parent.insertBefore(separator, subjectbox[x].nextSibling);

        // GM_log("appended a\n");
        }
      }
    }

  // Only do this when replying
  var href = window.location.href;

  if (href.match(/gforum\.cgi\?do=post_reply_write/))
    {
    // Pass in the base URL
    gossamerForumAddProfileLink.addLink(href.split("?")[0]);
    }
  }
)();
