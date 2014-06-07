// ==UserScript==
// @name         Gossamer Forum Kill File
// @namespace    tag:Eule@dropzone.com,2006-09-20:greasemonkey-scripts
// @description  Don't display posts from certain users.
// @include      http://*.dropzone.com/*
// ==/UserScript==

// v0.1  2006-09-20
// First public version.  NO WARRANTY.  If it breaks you get to keep
// all the pieces.  Tested on dropzone.com and gossamer-threads.com .

(function()
  {
  // *****************************************
  // *** USER SERVICEABLE PARTS START HERE ***
  // *****************************************

  // This array contains the names of people whose posts you don't want
  // to see.  Note that names are case sensitive; "user1" and "User1" are
  // two different users.  The array can be as long as you like.  You can
  // give all the names on one line:
  //
  // var stfu = new Array("user1", "user2", "user3", "user4", "user5");
  //
  // or split the names up over several lines:
  //
  // var stfu = new Array("user1", "user2",
  //   "user3",
  //   "user4", "user5");
  //
  // Don't forget to enclose each name in quotes and to put commas
  // between the quoted names.

  var stfu = new Array("someuser", "someotheruser", "YetAnotherUser");

  // ***************************************
  // *** USER SERVICEABLE PARTS END HERE ***
  // ***************************************

  var selectAllNodes = function(doc, context, xpath)
    {
    var nodes = doc.evaluate(xpath, context, null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var result = new Array( nodes.snapshotLength );
    for(var x=0; x<result.length; x++)
      {
      result[x] = nodes.snapshotItem(x);
      }
    return result;
    }

  var gossamerForumKillFile =
    {
    Kill: function()
      {
      // look for tables with each post's content
      var posttables = selectAllNodes(document, document.body,
        "//table[@border='0' and @cellspacing='0' and @cellpadding='4' and " +
        "@width='100%' and contains(@style, 'border: 1px solid')]");
      // GM_log("found " + posttables.length + " tables with post content\n");

      // look for the profile links for each post's author
      // (named users have links containing "username=someuser";
      //  anonymous users have links containing "user=12345")
      var authors = selectAllNodes(document, document.body,
        "//a[contains(@href, 'gforum.cgi\?username=') or " +
        "    contains(@href, 'gforum.cgi\?user=')]");
      // GM_log("found " + authors.length + " authors\n");

      // for each author...
      for(var x=0; x<authors.length; x++)
        {
        // extract author's name from profile link
        // (split on '=' to catch both 'username=' and 'user=')
        var nameplustrash = authors[x].href.split("=")[1];
        var name = nameplustrash.split(";")[0];

        var killedauthor = "no";

        // compare name to list of killed names (linear search);
        // stop on match
        for(var y=0; y<stfu.length; y++)
          {
          if(name == stfu[y])
            {
            // GM_log("post " + x + " is by killed author " + stfu[y] + "\n");
            killedauthor = "yes";
            break;
            }
          }

        // if post should be killed, replace that post's table with
        // a notice that the post has been killed
        if(killedauthor == "yes")
          {
          var killednotice = document.createTextNode("Killed post by " + name);
          posttables[x].parentNode.replaceChild(killednotice, posttables[x]);
          }
        }
      }
    }

  // Only do this when reading posts
  var href = window.location.href;

  if( href.match(/gforum\.cgi\?post=/) ||
      href.match(/gforum\.cgi\?do=post_view_/) )
    {
    gossamerForumKillFile.Kill();
    }
  }
)();
